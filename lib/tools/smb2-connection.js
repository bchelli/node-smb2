
/*
 * DEPENDENCIES
 */
var net = require('net')
  , SMB2Forge = require('./smb2-forge')
  , SMB2Request = SMB2Forge.request
  ;



/*
 * CONNECTION MANAGER
 */
var SMB2Connection = module.exports = {};



/*
 * CLOSE CONNECTION
 */
SMB2Connection.close = function(connection){
  clearAutoCloseTimeout(connection);
  if(connection.connected){
    connection.connected = false;
    connection.socket.end();
  }
}


/*
 * OPEN CONNECTION
 */
SMB2Connection.requireConnect = function(method){
  return function(){
    var connection = this;
    var args = Array.prototype.slice.call(arguments);
    connect(connection, function(err){
      // process the cb
      var cb = args.pop();
      if (typeof cb !== 'function') {
        args.push(cb)
        cb = function (err) {
          if (err) {
            if (!err instanceof Error) {
              err = new Error(String(err))
            }
            throw err
          }
        }
      }
      cb = scheduleAutoClose(connection, cb);
      args.push(cb);

      // manage the connection error
      if(err) cb(err);
      else method.apply(connection, args);
    });
  }
}


/*
 * INIT CONNECTION
 */
SMB2Connection.init = function(connection){
  // create a socket
  connection.connected = false;
  connection.socket = new net.Socket({
    allowHalfOpen:true
  });

  // attach data events to socket
  connection.socket.on('data', SMB2Forge.response(connection));
  connection.errorHandler = [];
  connection.socket.on('error', function(err){
    if(connection.errorHandler.length > 0){
      connection.errorHandler[0].call(null, err)
    }
    if(connection.debug){
      console.log('-- error');
      console.log(arguments);
    }
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
  connection.socket.connect(connection.port, connection.ip);

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


