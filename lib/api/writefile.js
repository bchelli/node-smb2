

var SMB2Forge = require('../tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  , bigint = require('../tools/bigint')
  ;

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
module.exports = function(filename, data, options, cb){

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


  createFile(function(){
    setFileSize(function(){
      writeFile(function(){
        closeFile(cb);
      });
    });
  });

}
