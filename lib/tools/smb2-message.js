


/*
 * CONSTANTS
 */
const protocolId = new Buffer([0xFE, 'S'.charCodeAt(0), 'M'.charCodeAt(0), 'B'.charCodeAt(0)])

    , headerTranslates = {
        'Command': {
          'NEGOTIATE': 0x0000
        , 'SESSION_SETUP': 0x0001
        , 'LOGOFF': 0x0002
        , 'TREE_CONNECT': 0x0003
        , 'TREE_DISCONNECT': 0x0004
        , 'CREATE': 0x0005
        , 'CLOSE': 0x0006
        , 'FLUSH': 0x0007
        , 'READ': 0x0008
        , 'WRITE': 0x0009
        , 'LOCK': 0x000A
        , 'IOCTL': 0x000B
        , 'CANCEL': 0x000C
        , 'ECHO': 0x000D
        , 'QUERY_DIRECTORY': 0x000E
        , 'CHANGE_NOTIFY': 0x000F
        , 'QUERY_INFO': 0x0010
        , 'SET_INFO': 0x0011
        , 'OPLOCK_BREAK': 0x0012
        }
      }

    , flags = {
        'SERVER_TO_REDIR': 0x00000001
      , 'ASYNC_COMMAND': 0x00000002
      , 'RELATED_OPERATIONS': 0x00000004
      , 'SIGNED': 0x00000008
      , 'DFS_OPERATIONS': 0x10000000
      , 'REPLAY_OPERATION': 0x20000000
      }

    , headerLength = 64

    , headerSync = function(processId, sessionId) {
        return [
            ['ProtocolId',4,protocolId]
          , ['StructureSize',2,headerLength]
          , ['CreditCharge',2,0]
          , ['Status',4,0]
          , ['Command',2]
          , ['Credit',2,126]
          , ['Flags',4,0]
          , ['NextCommand',4,0]
          , ['MessageId',4]
          , ['MessageIdHigh',4,0]
          , ['ProcessId',4,processId]
          , ['TreeId',4,0]
          , ['SessionId',8,sessionId]
          , ['Signature',16,0]
          ];
      }

    , headerASync = function(processId, sessionId) {
        return [
            ['ProtocolId',4,protocolId]
          , ['StructureSize',2,headerLength]
          , ['CreditCharge',2,0]
          , ['Status',4,0]
          , ['Command',2]
          , ['Credit',2,126]
          , ['Flags',4,0]
          , ['NextCommand',4,0]
          , ['MessageId',4]
          , ['MessageIdHigh',4,0]
          , ['AsyncId',8]
          , ['SessionId',8,sessionId]
          , ['Signature',16,0]
          ];
      }

    ;

/*
 * CONSTRUCTOR
 */
var SMB2Message = module.exports = function(options){

  // INIT HEADERS
  this.headers = {};
  if(options && options.headers){
    this.setHeaders(options.headers);
  }

  // INIT REQUEST
  this.request = {};
  if(options && options.request){
    this.setRequest(options.request);
  }

  // INIT RESPONSE
  this.response = {};

}

var proto = SMB2Message.prototype = {};



proto.setHeaders = function(obj){
  for(var key in obj){
    this.headers[key] = obj[key];
  }
  this.structure = require('../structures/'+this.headers['Command'].toLowerCase());
}

proto.getHeaders = function(){
  return this.headers;
}



proto.setRequest = function(request){
  this.request = request;
}

proto.getResponse = function(){
  return this.response;
}



proto.getBuffer = function(connection){
  var buffer = new Buffer(0xFFFF)
    , length = 0
    ;

  // SET MESSAGE ID
  if(!this.isMessageIdSetted){
    this.isMessageIdSetted = true;
    this.headers['MessageId'] = connection.messageId++;
  }

  // HEADERS
  length += writeHeaders(this, buffer);

  // REQUEST
  length += writeRequest(this, buffer, headerLength)

  // extract the data
  var output = new Buffer(length);
  buffer.copy(output, 0, 0, length);
  return output;
}

proto.parseBuffer = function(buffer){

  // HEADERS
  readHeaders(this, buffer)

  // RESPONSE
  readResponse(this, buffer, headerLength)

}





/*
 * HELPERS
 */
function dataToBuffer(data, length) {

  // buffers will be buffers
  if(Buffer.isBuffer(data)){
    return data;
  }

  // string to buffer
  if(typeof data == 'string'){
    return new Buffer(data);
  }

  // raw data to buffer
  var result = new Buffer(length);
  for(var i=0; i<length;i++){
    result.writeUInt8(
      0xFF & (data >> (i*8))
    , i
    );
  }
  return result;

}
function bufferToData(buffer) {

  // not a buffer go away
  if(!Buffer.isBuffer(buffer)){
    return buffer;
  }

  // raw data to buffer
  var result = 0;
  for(var i=0; i<buffer.length;i++){
    result += buffer.readUInt8(i) << (i*8);
  }
  return result;

}
function writeData(buffer, data, offset, length){
  dataToBuffer(data, length).copy(buffer, offset, 0)
}
function readData(buffer, offset, length){
  return buffer.slice(offset, offset+length);
}
function translate(key, value){
  if(headerTranslates[key] && typeof headerTranslates[key][value] != 'undefined'){
    return headerTranslates[key][value];
  }
  return value;
}
function unTranslate(key, value){
  if(headerTranslates[key]){
    for(var t in headerTranslates[key]){
      if(headerTranslates[key][t] == value){
        return t;
      }
    }
  }
  return null;
}





/*
 * PRIVATE FUNCTIONS
 */
function readHeaders(message, buffer){
  var header = (message.isAsync ? headerASync : headerSync)(message.ProcessId, message.SessionId)
    , offset = 0
    ;
  for(var i in header){
    var key = header[i][0]
      , length = header[i][1]
      ;
    message.headers[key] = readData(
      buffer
    , offset
    , length
    );
    if(length <= 8){
      message.headers[key] = unTranslate(key, bufferToData(message.headers[key])) || message.headers[key];
    }
    offset += length;
  }
  message.structure = require('../structures/'+message.headers['Command'].toLowerCase());
}


function writeHeaders(message, buffer){
  var header = (message.isAsync ? headerASync : headerSync)(message.ProcessId, message.SessionId)
    , offset = 0
    ;
  for(var i in header){
    var key = header[i][0]
      , length = header[i][1]
      , defaultValue = header[i][2] || 0
      ;
    writeData(
      buffer
    , translate(key, message.headers[key] || defaultValue)
    , offset
    , length
    );
    offset += length;
  }
  return offset;
}





function readResponse(message, buffer, offset){
  for(var i in message.structure.response){
    var key = message.structure.response[i][0]
      , length = message.structure.response[i][1] || 1
      ;
    if(typeof length == 'string'){
      length = bufferToData(message.response[length]);
    }
    message.response[key] = readData(buffer, offset, length);
    offset += length;
  }
}


function writeRequest(message, buffer, offset){
  var initOffset = offset
    , needsRewrite = false
    , tmpBuffer = new Buffer(buffer.length)
    ;
  offset = 0;
  for(var i in message.structure.request){
    var key = message.structure.request[i][0]
      , length = message.structure.request[i][1] || 1
      , defaultValue = message.structure.request[i][2] || 0
      ;
    if(typeof length == 'string'){
      message.request[key] = message.request[key] || '';
      if(message.request[length] != message.request[key].length) {
        message.request[length] = message.request[key].length;
        needsRewrite = true;
      }
      length = message.request[key].length;
    } else {
      message.request[key] = message.request[key] || defaultValue;
    }
    writeData(
      tmpBuffer
    , message.request[key]
    , offset
    , length
    );
    offset += length;
  }
  if(needsRewrite){
    writeRequest(message, tmpBuffer, 0);
  }
  tmpBuffer.copy(buffer, initOffset, 0, offset);
  return offset;
}
