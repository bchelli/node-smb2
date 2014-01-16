

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
      }
    , request:{
        'Buffer':ntlm.encodeType1(
          connection.ip
        , connection.domain
        )
      }
    })
  }
, parse:function(connection, cb){
    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if(err.code == 'STATUS_MORE_PROCESSING_REQUIRED'){
        connection.SessionId = h.SessionId;
        connection.nonce = ntlm.decodeType2(response.getResponse().Buffer);
        cb && cb(null);
      } else {
        cb && cb(new Error(MsErref.getErrorMessage(err)));
      }
    }
  }
}

