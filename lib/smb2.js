

/*
 * CONSTANTS
 */
var shareRegExp = /\\\\([^\\]*)\\([^\\]*)\\?/
  , port = 445
  ;


/*
 * DEPENDENCIES
 */
var net = require('net')
  , bigint = require('./tools/bigint')
  , SMB2Forge = require('./tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  , fs = require('fs')
  ;


/*
 * CONSTRUCTOR
 */
var SMB = module.exports = function(opt){

  opt = opt || {};

  // Parse share-string
  var matches;
  if(!opt.share || !(matches = opt.share.match(shareRegExp))){
    throw new Error('the share is not valid');
  }

  // resolve IP from NetBios
  // this.ip = netBios.resolve(matches[0]);
  this.ip = matches[1];

  // extract share
  this.share = matches[2];

  // save the full path
  this.fullPath = opt.share;

  // packet concurrency default 20
  this.packetConcurrency = opt.packetConcurrency || 20;

  // close timeout default 60s
  this.autoCloseTimeout = opt.autoCloseTimeout || 10000;

  // store authentification
  this.domain   = opt.domain;
  this.username = opt.username;
  this.password = opt.password;

  // set session id
  this.SessionId = 0;

  // create a socket
  this.connected = false;
  this.socket = new net.Socket({
    allowHalfOpen:true
  });

  // attach data events to socket
  this.socket.on('data', SMB2Forge.response(this));
  var connection = this;
  connection.errorHandler = [];
  this.socket.on('error', function(err){
    if(connection.errorHandler.length > 0){
      connection.errorHandler[0].call(null, err)
    }
    if(connection.debug){
      console.log('-- error');
      console.log(arguments);
    }
  });

};


/*
 * PROTOTYPE
 */
var proto = SMB.prototype = {};


/*
 * close
 * =====
 *
 * close your connection to the SMB2 server
 *
 *  - close TCP connection
 *
 */
proto.close = function(){
  clearAutoCloseTimeout(this);
  if(this.connected){
    this.connected = false;
    this.socket.end();
  }
}


/*
 * readdir
 * =======
 *
 * list the file / directory from the path provided:
 *
 *  - open the directory
 *
 *  - query directory content
 *
 *  - close the directory
 *
 */
proto.readdir = function(path, cb){
  var connection = this;

  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    // SMB2 open directory
    else SMB2Request('open', {path:path}, connection, function(err, file){
      if(err) cb && cb(err);
      // SMB2 query directory
      else SMB2Request('query_directory', file, connection, function(err, files){
        if(err) cb && cb(err);
        // SMB2 close directory
        else SMB2Request('close', file, connection, function(err){
          cb && cb(
            null
          , files
              .map(function(v){ return v.Filename }) // get the filename only
              .filter(function(v){ return v!='.' && v!='..' }) // remove '.' and '..' values
          );
        });
      });
    });
  })
  
}


/*
 * readFile
 * ========
 *
 * read the content of a file from the share
 *
 *  - open the file
 *
 *  - read the content
 *
 *  - close the file
 *
 */
proto.readFile = function(filename, options, cb){
  var connection = this;

  if(typeof options == 'function'){
    cb = options;
    options = {};
  }

  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    // SMB2 open file
    else SMB2Request('open', {path:filename}, connection, function(err, file){
      if(err) cb && cb(err);
      // SMB2 read file content
      else {
        var fileLength = 0
          , offset = new bigint(8)
          , stop = false
          , nbRemainingPackets = 0
          , maxPacketSize = 0x00010000
          ;
        // get file length
        for(var i=0;i<file.EndofFile.length;i++){
          fileLength |= file.EndofFile[i] << (i*8);
        }
        var result = new Buffer(fileLength);
        // callback manager
        function callback(offset){
          return function(err, content){
            if(stop) return;
            if(err) {
              cb && cb(err);
              stop = true;
            } else {
              content.copy(result, offset.toNumber());
              nbRemainingPackets--;
              checkDone();
            }
          }
        }
        // callback manager
        function checkDone(){
          if(stop) return;
          createPackets();
          if(nbRemainingPackets==0 && offset.ge(fileLength)) {
            SMB2Request('close', file, connection, function(err){
              if(options.encoding){
                result = result.toString(options.encoding);
              }
              cb && cb(null, result);
            })
          }
        }
        // create packets
        function createPackets(){
          while(nbRemainingPackets<connection.packetConcurrency && offset.lt(fileLength)){
            // process packet size
            var rest = offset.sub(fileLength).neg();
            var packetSize = rest.gt(maxPacketSize) ? maxPacketSize : rest.toNumber();
            // generate buffer
            SMB2Request('read', {
              'FileId':file.FileId
            , 'Length':packetSize
            , 'Offset':offset.toBuffer()
            }, connection, callback(offset));
            offset = offset.add(packetSize);
            nbRemainingPackets++;
          }
        }
        checkDone();
      }
    });
  });
}


/*
 * writeFile
 * =========
 *
 * create and write file on the share
 *
 *  - create the file
 *
 *  - set info of the file
 *
 *  - set content of the file
 *
 *  - close the file
 *
 */
proto.writeFile = function(filename, data, options, cb){

  if(typeof options == 'function'){
    cb = options;
    options = {};
  }

  options.encoding = options.encoding || 'utf8';

  var connection = this
    , file
    , fileContent = Buffer.isBuffer(data) ? data : new Buffer(data, options.encoding)
    , fileLength = new bigint(8, fileContent.length)
    ;

  function createFile(fileCreated){
    SMB2Request('create', {path:filename}, connection, function(err, f){
      if(err) cb && cb(err);
      // SMB2 set file size
      else {
        file = f;
        fileCreated();
      }
    });
  }

  function closeFile(fileClosed){
    SMB2Request('close', file, connection, function(err){
      if(err) cb && cb(err);
      else {
        file = null;
        fileClosed();
      }
    });
  }

  function setFileSize(fileSizeSetted){
    SMB2Request('set_info', {FileId:file.FileId, FileInfoClass:'FileEndOfFileInformation', Buffer:fileLength.toBuffer()}, connection, function(err){
      if(err) cb && cb(err);
      else fileSizeSetted();
    });
  }

  function writeFile(fileWritten){
    var offset = new bigint(8)
      , stop = false
      , nbRemainingPackets = 0
      , maxPacketSize = new bigint(8, 0x00010000 - 0x71)
      ;
    // callback manager
    function callback(offset){
      return function(err){
        if(stop) return;
        if(err) {
          cb && cb(err);
          stop = true;
        } else {
          nbRemainingPackets--;
          checkDone();
        }
      }
    }
    // callback manager
    function checkDone(){
      if(stop) return;
      createPackets();
      if(nbRemainingPackets==0 && offset.ge(fileLength)) {
        fileWritten();
      }
    }
    // create packets
    function createPackets(){
      while(nbRemainingPackets<connection.packetConcurrency && offset.lt(fileLength)){
        // process packet size
        var rest = fileLength.sub(offset);
        var packetSize = rest.gt(maxPacketSize) ? maxPacketSize : rest;
        // generate buffer
        SMB2Request('write', {
          'FileId':file.FileId
        , 'Offset':offset.toBuffer()
        , 'Buffer':fileContent.slice(offset.toNumber(), offset.add(packetSize).toNumber())
        }, connection, callback(offset));
        offset = offset.add(packetSize);
        nbRemainingPackets++;
      }
    }
    checkDone();
  }


  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    else createFile(function(){
      setFileSize(function(){
        writeFile(function(){
          closeFile(cb);
        });
      });
    });
  });

}


/*
 * exists
 * ======
 *
 * test the existence of a file
 *
 *  - try to open the file
 *
 *  - close the file
 *
 */
proto.exists = function(path, cb){

  var connection = this;

  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    else SMB2Request('open', {path:path}, connection, function(err, file){
      if(err) cb && cb(null, false);
      else SMB2Request('close', file, connection, function(err){
        cb && cb(null, true);
      });
    });
  });

}


/*
 * unlink
 * ======
 *
 * remove file:
 *
 *  - open the file
 *
 *  - remove the file
 *
 *  - close the file
 *
 */
proto.unlink = function(path, cb){
  var connection = this;

  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    else connection.exists(path, function(err, exists){

      if(err) cb && cb(err);

      else if(exists){

        // SMB2 open file
        SMB2Request('create', {path:path}, connection, function(err, file){
          if(err) cb && cb(err);
          // SMB2 query directory
          else SMB2Request('set_info', {FileId:file.FileId, FileInfoClass:'FileDispositionInformation',Buffer:(new bigint(1,1)).toBuffer()}, connection, function(err, files){
            if(err) cb && cb(err);
            // SMB2 close directory
            else SMB2Request('close', file, connection, function(err){
              cb && cb(null, files);
            });
          });
        });

      } else {

        cb(new Error('File does not exists'));

      }

    });
  });

}


/*
 * rmdir
 * =====
 *
 * remove directory:
 *
 *  - open the folder
 *
 *  - remove the folder
 *
 *  - close the folder
 *
 */
proto.rmdir = function(path, cb){
  var connection = this;

  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    else connection.exists(path, function(err, exists){

      if(err) cb && cb(err);

      else if(exists){

        // SMB2 open file
        SMB2Request('open_folder', {path:path}, connection, function(err, file){
          if(err) cb && cb(err);
          // SMB2 query directory
          else SMB2Request('set_info', {FileId:file.FileId, FileInfoClass:'FileDispositionInformation',Buffer:(new bigint(1,1)).toBuffer()}, connection, function(err, files){
            if(err) cb && cb(err);
            // SMB2 close directory
            else SMB2Request('close', file, connection, function(err){
              cb && cb(null, files);
            });
          });
        });

      } else {

        cb(new Error('Folder does not exists'));

      }

    });
  });

}


/*
 * mkdir
 * =====
 *
 * create folder:
 *
 *  - create the folder
 *
 *  - close the folder
 *
 */
proto.mkdir = function(path, mode, cb){

  if(typeof mode == 'function'){
    cb = mode;
    mode = '0777';
  }

  var connection = this;

  connect(connection, function(err){
    cb = scheduleAutoClose(connection, cb);
    if(err) cb(err);
    else connection.exists(path, function(err, exists){

      if(err) cb && cb(err);

      else if(!exists){

        // SMB2 open file
        SMB2Request('create_folder', {path:path}, connection, function(err, file){
          if(err) cb && cb(err);
          // SMB2 query directory
          else SMB2Request('close', file, connection, function(err){
            cb && cb(null);
          });
        });

      } else {

        cb(new Error('File/Folder already exists'));

      }

    });
  });

}


/*
 * PRIVATE FUNCTION TO HANDLE CONNECTION
 */
function connect(connection, cb){

  if(connection.connected){
    cb && cb(null);
    return;
  }

  cb = scheduleAutoClose(connection, cb);

  // open TCP socket
  connection.socket.connect(port, connection.ip);

  // SMB2 negotiate connection
  SMB2Request('negotiate', {}, connection, function(err){
    if(err) cb && cb(err);
    // SMB2 setup session / negotiate ntlm
    else SMB2Request('session_setup_step1', {}, connection, function(err){
      if(err) cb && cb(err);
      // SMB2 setup session / autheticate with ntlm
      else SMB2Request('session_setup_step2', {}, connection, function(err){
        if(err) cb && cb(err);
        // SMB2 tree connect
        else SMB2Request('tree_connect', {}, connection, function(err){
          if(err) cb && cb(err);
          else {
            connection.connected = true;
            cb && cb(null);
          }
        });
      });
    });
  });
}


/*
 * PRIVATE FUNCTION TO HANDLE CLOSING THE CONNECTION
 */
function clearAutoCloseTimeout(connection){
  if(connection.scheduledAutoClose){
    clearTimeout(connection.scheduledAutoClose);
    connection.scheduledAutoClose = null;
  }
}
function setAutoCloseTimeout(connection){
  clearAutoCloseTimeout(connection);
  if(connection.autoCloseTimeout != 0){
    connection.scheduledAutoClose = setTimeout(function(){
      connection.close();
    }, connection.autoCloseTimeout);
  }
}
function scheduleAutoClose(connection, cb){
  addErrorListener(connection, cb);
  clearAutoCloseTimeout(connection);
  return function(){
    removeErrorListener(connection);
    setAutoCloseTimeout(connection);
    cb.apply(null, arguments);
  }
}


/*
 * PRIVATE FUNCTIONS TO HANDLE ERRORS
 */
function addErrorListener(connection, callback){
  connection.errorHandler.unshift(callback);
}
function removeErrorListener(connection){
  connection.errorHandler.shift();
}


