

var SMB2Message = require('../message')
  , MsErref = require('../tools/ms_erref')
  , bigint = require('../tools/bigint')
  ;


module.exports = {
  generate:function(connection, params){
    var buffer = new Buffer(params.path, 'ucs2');
    return new SMB2Message({
      headers:{
        'Command':'CREATE'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      }
    , request:{
        'Buffer':buffer
      , 'DesiredAccess':0x001701DF
      , 'FileAttributes':0x00000080
      , 'ShareAccess':0x00000000
      , 'CreateDisposition':0x00000005
      , 'CreateOptions':0x00000044
      , 'NameOffset':0x0078
      , 'CreateContextsOffset':0x007A+buffer.length
      }
    })
  }
, parse:function(connection, cb){
    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if(err.code == 'STATUS_SUCCESS'){
        cb && cb(null, response.getResponse());
      } else {
        cb && cb(new Error(MsErref.getErrorMessage(err)));
      }
    }
  }
}

