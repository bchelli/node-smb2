var SMB2Message = require('../tools/smb2-message')
var message = require('../tools/message')
var FILE_OVERWRITE_IF = require('../structures/constants').FILE_OVERWRITE_IF

module.exports = message({

  generate:function(connection, params){

    var buffer = new Buffer(params.path, 'ucs2');
    var createDisposition = params.createDisposition

    /* See: https://msdn.microsoft.com/en-us/library/cc246502.aspx
       6 values for CreateDisposition. */
    if (!(createDisposition >= 0 && createDisposition <= 5)) {
      createDisposition = FILE_OVERWRITE_IF
    }

    return new SMB2Message({
      headers:{
        'Command':'CREATE'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      , 'ProcessId':connection.ProcessId
      }
    , request:{
        'Buffer':buffer
      , 'DesiredAccess':0x001701DF
      , 'FileAttributes':0x00000080
      , 'ShareAccess':0x00000000
      , 'CreateDisposition': createDisposition
      , 'CreateOptions':0x00000044
      , 'NameOffset':0x0078
      , 'CreateContextsOffset':0x007A+buffer.length
      }
    });

  }

});
