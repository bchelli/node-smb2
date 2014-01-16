

var SMB2Message = require('../message')
  , MsErref = require('../tools/ms_erref')
  , bigint = require('../tools/bigint')
  ;


module.exports = {
  generate:function(connection, file){
    return new SMB2Message({
      headers:{
        'Command':'READ'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      }
    , request:{
        'FileId':file.FileId
      , 'Length':file.Length
      , 'Offset':file.Offset
      }
    })
  }
, parse:function(connection, cb){
    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if (err.code == 'STATUS_SUCCESS'){
        cb && cb(null, response.getResponse().Buffer);
      } else {
        cb && cb(new Error(MsErref.getErrorMessage(err)));
      }
    }
  }
}

