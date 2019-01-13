var RS = require('readable-stream')
  , SMB2Forge = require('../tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  , SMB2Connection = require('../tools/smb2-connection')
  , bigint = require('../tools/bigint')
  ;

/*
* createWriteStream
* =========
*
* create and return a writeStream to a new file on the share
*
*/

module.exports = function(filename) {
  var connection = this
    , file  
    , currFileLength = new bigint(8, 0)
    , offset = new bigint(8, 0)
    , maxPacketSize = new bigint(8, 0x00010000 - 0x71)
    , nbRemainingPackets = 0
    , chunkOffset = 0
    , writable = new RS.Writable({
      write: write,
      writev: writev,
      final: final
    })
    , pendingError
    , stop = false
    , created = false
    , writePending = false
    , incomingWriteBuffer = []
    , outgoingWriteBuffer = []
    , finalCb = null
    ;

  function write(chunk, encoding, cb) {
    writev([{chunk: chunk, encoding: encoding}], cb);
  }

  function writev(chunks, cb) {
    incomingWriteBuffer.push({ chunks: chunks, cb: cb});
    writePending = true;
    if (pendingError) {
      stop = true;
      cb(pendingError);
    } else {
      if (created) {
        writeNext();
      }
    }
  }

  function final(cb) {
    finalCb = cb;
    writeNext();
  }


  var createFile = SMB2Connection.requireConnect(function(cb) {
    SMB2Request('create', {path:filename}, connection, cb);
  }).bind(this);

  createFile(function(err, f) {
    if(err) {
      if (outgoingWriteBuffer.length > 0) {
        outgoingWriteBuffer[0].cb(err);
        stop = true;
      } else {
        pendingError = err;
      }
    }
    else {
      created = true;
      file = f;
      if (writePending) {
        writeNext();
      }
    }
  });

  function writeNext() {
    if (outgoingWriteBuffer.length !== 0) return;
    outgoingWriteBuffer = incomingWriteBuffer;
    incomingWriteBuffer = [];
    if (outgoingWriteBuffer.length !== 0) startOutgoingBufferWrite();
    if (outgoingWriteBuffer.length === 0 && finalCb) {
      SMB2Request('close', file, connection, function(err){
        if(err) finalCb(err);
        else {
          file = null;
          finalCb();
        }
      });
    }
  }

  function getLengthOfChunksInBuffer(buffer) {
    return buffer.reduce(function(acc, curr) {
        return acc + curr.chunks.reduce(function(acc2, curr2) {
          return acc2 + curr2.chunk.length;
        },0);
      }, 0)
  }

  function startOutgoingBufferWrite() {
    currFileLength = currFileLength.add(getLengthOfChunksInBuffer(outgoingWriteBuffer));
    SMB2Request('set_info', {FileId:file.FileId, FileInfoClass:'FileEndOfFileInformation', Buffer:currFileLength.toBuffer()}, connection, function(err){
      if(err) {
        stop = true;
        outgoingWriteBuffer[0].cb(err);
      }
      else {
        chunkOffset = new bigint(8, 0);
        continueOutgoingBufferWrite();
      }
    });
  }

  function callback(cb) {
    return function(err) {
      if(stop) return;
      if(err) {
        cb(err);
        stop = true;
      } else {
        nbRemainingPackets--;
        continueOutgoingBufferWrite();
      }
    }
  }

  function continueOutgoingBufferWrite() {
    if (stop || outgoingWriteBuffer.length === 0) return;
    var currChunk = outgoingWriteBuffer[0].chunks[0].chunk;
    var currChunkLen = new bigint(8, currChunk.length);
    var currCb = outgoingWriteBuffer[0].cb;
    while(nbRemainingPackets<connection.packetConcurrency && offset.lt(currFileLength)){
      var restOfChunk = new bigint(8, currChunkLen.toNumber() - chunkOffset.toNumber())
      var packetSize = restOfChunk.gt(maxPacketSize) ? maxPacketSize : restOfChunk;
      // generate buffer
      SMB2Request('write', {
        'FileId':file.FileId
      , 'Offset':offset.toBuffer()
      , 'Buffer':currChunk.slice(chunkOffset.toNumber(), chunkOffset.add(packetSize).toNumber())
      }, connection, callback(currCb));
      offset = offset.add(packetSize);
      chunkOffset = chunkOffset.add(packetSize);
      if (chunkOffset.toNumber() >= currChunk.length) {
        outgoingWriteBuffer[0].chunks.shift();
        if (outgoingWriteBuffer[0].chunks.length > 0) {
          chunkOffset = new bigint(8, 0);
          currChunk = outgoingWriteBuffer[0].chunks[0].chunk;
          currChunkLen = new bigint(8, currChunk.length);
        } else {
          outgoingWriteBuffer[0].cb();
          outgoingWriteBuffer.shift();
          if (outgoingWriteBuffer.length > 0) {
            chunkOffset = new bigint(8, 0);
            currChunk = outgoingWriteBuffer[0].chunks[0].chunk;
            currChunkLen = new bigint(8, currChunk.length);
          } else {
            chunkOffset = new bigint(8, 0);
          }
        }
      }
      nbRemainingPackets++;
    }
    writeNext();
  }


  return writable;
};