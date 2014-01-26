

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection, params){

    return new SMB2Message({
      headers:{
        'Command':'CLOSE'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      }
    , request:{
        'FileId':params.FileId
      }
    });

  }

});
