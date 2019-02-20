var RS = require('readable-stream')
  , SMB2Forge = require('../tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  , SMB2Connection = require('../tools/smb2-connection')
  , bigint = require('../tools/bigint')
  ;

/*
* createReadStream
* ================
*
* Return a read stream for a file on the share
*/
module.exports = function(filename){
  var connection = this
    , file
    , bufferedChunks = []
    , readPending = false
    , opened = false
    , fileLength = 0
    , offset = new bigint(8)
    , stop = false
    , nbRemainingPackets = 0
    , maxPacketSize = 0x00010000
    , readable = new RS.Readable({
        read: function(size) {
          readPending = true;
          if (opened) readNext();
        }
      })
    ;

  var open = SMB2Connection.requireConnect(function(cb) {
    SMB2Request('open', {path:filename}, connection, cb);
  }).bind(this);
  
  open(function(err, openedFile) { 
    file = openedFile;
    opened = true;
    if(err) {
        readable.emit('error', err);
        stop = true;
    }
    else {
      opened = true;
      fileLength = file.EndofFile.readUInt16LE();
      if (readPending) {
        readNext();
      }
    }
  });

 
  function callback(offset) {
    return function(err, content){
      if(stop) return;
      if(err) {
        readable.emit('error', err)
        stop = true;
      } else {
        bufferedChunks.push(content);
        nbRemainingPackets--;
        readNext();
      }
    }
  }

  function readNext() {
    if (!readPending) {
      return;
    }
    while(nbRemainingPackets<connection.packetConcurrency && offset.lt(fileLength)){
      // process packet size
      var rest = offset.sub(fileLength).neg();
      var packetSize = rest.gt(maxPacketSize) ? maxPacketSize : rest.toNumber();
      // generate buffer
      SMB2Request('read', {
        'FileId':file.FileId
      , 'Length':packetSize
      , 'Offset':offset.toBuffer()
      }, connection, callback(offset));
      offset = offset.add(packetSize);
      nbRemainingPackets++;
    }
    
    while(bufferedChunks.length > 0 && readPending) {
      readPending = readable.push(bufferedChunks.shift());

    if (!offset.lt(fileLength) && bufferedChunks.length === 0 &&
      nbRemainingPackets === 0 && readPending) {
        readable.push(null);
      }
    }
  }

  return readable;
}
