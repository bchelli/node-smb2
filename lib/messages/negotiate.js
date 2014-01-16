

var SMB2Message = require('../message')
  , MsErref = require('../tools/ms_erref')
  , bigint = require('../tools/bigint')
  ;


module.exports = {
  generate:function(connection){
    return new SMB2Message({
      headers:{
        'Command':'NEGOTIATE'
      }
    })
  }
, parse:function(connection, cb){
    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if(err.code == 'STATUS_SUCCESS'){
        cb && cb(null);
      } else {
        cb && cb(new Error(MsErref.getErrorMessage(err)));
      }
    }
  }
}

