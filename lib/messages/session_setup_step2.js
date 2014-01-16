

var SMB2Message = require('../message')
  , MsErref = require('../tools/ms_erref')
  , bigint = require('../tools/bigint')
  , ntlm = require('ntlm')
  ;


module.exports = {
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
    })
  }
, parse:function(connection, cb){
    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if(       err.code == 'STATUS_LOGON_FAILURE'){
        cb && cb(new Error('Login attempt fail'));
      } else if(err.code == 'STATUS_SUCCESS'){
        cb && cb(null);
      } else {
        cb && cb(new Error(MsErref.getErrorMessage(err)));
      }
    }
  }
}

