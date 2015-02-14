

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection, params){

    return new SMB2Message({
      headers:{
        'Command':'WRITE'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      , 'ProcessId':connection.ProcessId
      }
    , request:{
        'FileId':params.FileId
      , 'Offset':params.Offset
      , 'Buffer':params.Buffer
      }
    });

  }

, parseResponse:function(response){
    return response.getResponse().Buffer;
  }

});
