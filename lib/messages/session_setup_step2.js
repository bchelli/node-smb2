

var SMB2Message = require('../message')
  , message = require('../tools/message')
  , ntlm = require('ntlm')
  ;


module.exports = message({

  generate:function(connection){

    return new SMB2Message({
      headers:{
        'Command':'SESSION_SETUP'
      , 'SessionId':connection.SessionId
      }
    , request:{
        'Buffer':ntlm.encodeType3(
          connection.username
        , connection.ip
        , connection.domain
        , connection.nonce
        , connection.password
        )
      }
    });

  }

});
