


var SMB2Connection = require('../tools/smb2-connection');


/*
 * close
 * =====
 *
 * close your connection to the SMB2 server
 *
 *  - close TCP connection
 *
 */
module.exports = function(){
  SMB2Connection.close(this);
}


