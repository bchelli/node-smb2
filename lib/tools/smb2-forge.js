/*
 * DEPENDENCIES
 */
var SMB2Message = require('./smb2-message');




/*
 * SMB2 MESSAGE FORGE
 */
var SMB2Forge = module.exports = {};


/*
 * SMB2 MESSAGE FORGE
 */
SMB2Forge.request = function(messageName, params, connection, cb){
  var msg = require('../messages/'+messageName)
    , smbMessage = msg.generate(connection, params)
    ;
  // send
  sendNetBiosMessage(
    connection
  , smbMessage
  );
  // wait for the response
  getResponse(
    connection
  , smbMessage.getHeaders().MessageId
  , msg.parse(connection, cb)
  );
}


/*
 * SMB2 RESPONSE MESSAGE PARSER
 */
SMB2Forge.response = function(c){
  c.responses = {};
  c.responsesCB = {};
  c.responseBuffer = new Buffer(0);
  return function(response){
    // concat new response
    c.responseBuffer = Buffer.concat([c.responseBuffer, response]);
    // extract complete messages
    var extract = true;
    while(extract){
      extract = false;
      // has a message header
      if(c.responseBuffer.length >= 4) {
        // message is complete
        var msgLength = (c.responseBuffer.readUInt8(1) << 16) + c.responseBuffer.readUInt16BE(2);
        if(c.responseBuffer.length >= msgLength + 4) {
          // set the flags
          extract = true;
          // parse message
          var r = c.responseBuffer.slice(4, msgLength+4)
            , message = new SMB2Message()
            ;
          message.parseBuffer(r);
          //debug
          if(c.debug){
            console.log('--response');
            console.log(r.toString('hex'));
          }
          // get the message id
          var mId = message.getHeaders().MessageId.toString('hex');
          // check if the message can be dispatched
          // or store it
          if(c.responsesCB[mId]) {
            c.responsesCB[mId](message);
            delete c.responsesCB[mId];
          } else {
            c.responses[mId] = message;
          }
          // remove from response buffer
          c.responseBuffer = c.responseBuffer.slice(msgLength+4);
        }
      }
    }
  }
}




/*
 * HELPERS
 */
function sendNetBiosMessage(connection, message) {
  var smbRequest = message.getBuffer(connection);

  if(connection.debug){
    console.log('--request');
    console.log(smbRequest.toString('hex'));
  }

  // create NetBios package
  var buffer = new Buffer(smbRequest.length+4);

  // write NetBios cmd
  buffer.writeUInt8(0x00, 0);

  // write message length
  buffer.writeUInt8((0xFF0000 & smbRequest.length) >> 16, 1);
  buffer.writeUInt16BE(0xFFFF & smbRequest.length, 2);

  // write message content
  smbRequest.copy(buffer, 4, 0, smbRequest.length);


  // Send it !!!
  connection.newResponse = false;
  connection.socket.write(buffer);


  return true;
}


function getResponse(c, mId, cb) {
  var messageId = new Buffer(4);
  messageId.writeUInt32LE(mId, 0);
  messageId = messageId.toString('hex');
  if(c.responses[messageId]) {
    cb(c.responses[messageId]);
    delete c.responses[messageId];
  } else {
    c.responsesCB[messageId] = cb;
  }
}
