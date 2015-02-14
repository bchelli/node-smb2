

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection, file){

    return new SMB2Message({
      headers:{
        'Command':'READ'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      , 'ProcessId':connection.ProcessId
      }
    , request:{
        'FileId':file.FileId
      , 'Length':file.Length
      , 'Offset':file.Offset
      }
    });

  }

, parseResponse:function(response){
    return response.getResponse().Buffer;
  }

});
