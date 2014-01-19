

var SMB2Message = require('../message')
  , message = require('../tools/message')
  ;


module.exports = message({

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
      , 'NameOffset':0x0078
      , 'CreateContextsOffset':0x007A+buffer.length
      }
    });

  }

});
