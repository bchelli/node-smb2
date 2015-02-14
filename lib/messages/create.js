

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection, params){

    var buffer = new Buffer(params.path, 'ucs2');

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
      , 'CreateDisposition':0x00000005
      , 'CreateOptions':0x00000044
      , 'NameOffset':0x0078
      , 'CreateContextsOffset':0x007A+buffer.length
      }
    });

  }

});
