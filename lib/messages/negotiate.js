

var SMB2Message = require('../message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection){

    return new SMB2Message({
      headers:{
        'Command':'NEGOTIATE'
      }
    });

  }

});
