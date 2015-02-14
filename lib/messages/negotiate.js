

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection){

    return new SMB2Message({
      headers:{
        'Command':'NEGOTIATE'
      , 'ProcessId':connection.ProcessId
      }
    });

  }

});
