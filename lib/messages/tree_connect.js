

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection){

    return new SMB2Message({
      headers:{
        'Command':'TREE_CONNECT'
      , 'SessionId':connection.SessionId
      , 'ProcessId':connection.ProcessId
      }
    , request:{
        'Buffer':new Buffer(connection.fullPath, 'ucs2')
      }
    });

  }

, onSuccess:function(connection, response){
    var h = response.getHeaders();
    connection.TreeId = h.TreeId;
  }

});

