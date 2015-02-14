

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  , ntlm = require('ntlm')
  ;


module.exports = message({

  generate:function(connection){

    return new SMB2Message({
      headers:{
        'Command':'SESSION_SETUP'
      , 'ProcessId':connection.ProcessId
      }
    , request:{
        'Buffer':ntlm.encodeType1(
          connection.ip
        , connection.domain
        )
      }
    });

  }

, successCode: 'STATUS_MORE_PROCESSING_REQUIRED'

, onSuccess:function(connection, response){
    var h = response.getHeaders();
    connection.SessionId = h.SessionId;
    connection.nonce = ntlm.decodeType2(response.getResponse().Buffer);
  }

});

