

var SMB2Message = require('../message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection, params){

    return new SMB2Message({
      headers:{
        'Command':'WRITE'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
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
