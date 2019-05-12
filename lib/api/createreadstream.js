var RS = require('readable-stream')
  , SMB2Forge = require('../tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  , bigint = require('../tools/bigint')
  ;

/*
* createReadStream
* ================
*
* Return a read stream for a file on the share
*/
module.exports = function(filename, options){
  options = processOptions(options);

  var connection = this
    , file
    , bufferedChunks = []
    , chunckPushed = 0
    , chunckRequested = 0
    , opened = false
    , fileLength = 0
    , offset = new bigint(8).add(options.start)
    , stop = false
    , nbRemainingPackets = 0
    , maxPacketSize = 0x00010000
    , readable = new RS.Readable({
        read: function(size) {
          if (opened) {
            readNext();
          }
        }
      })
    ;
  
  var close = function () {
    stop = true;
    if (opened) {
      opened = false;
      SMB2Request('close', file, connection, function(err){
        if(err){
          readable.emit('error', err);
        }
      });
    }
  };

  SMB2Request('open', {path:filename}, connection, function(err, openedFile) { 
    file = openedFile;
    opened = true;
    if(err) {
      readable.emit('error', err);
      return close();
    } else {
      fileLength = file.EndofFile.readUInt16LE();
      if(options.start >= fileLength) {
        readable.emit('error', new Error('start (' + options.start + ') is greater equal than file length (' + fileLength + ')!'));
        return close();
      }
      fileLength = Math.min(fileLength, options.end + 1);
      readNext();
    }
  });

 
  function callback(position, offset) {
    return function(err, content){
      if(stop) {
        return close();
      }
      if(err) {
        readable.emit('error', err)
        return close();
      } else {
        bufferedChunks[position] = { loaded: true, content: content };
        if (position === chunckPushed) {
          while (bufferedChunks[chunckPushed] && bufferedChunks[chunckPushed].loaded) {
            readable.push(bufferedChunks[chunckPushed].content);
            delete bufferedChunks[chunckPushed];
            chunckPushed++;
          }
        }
        nbRemainingPackets--;
        readNext();
        if (chunckPushed == chunckRequested && nbRemainingPackets == 0) {
          return close();
        }
      }
    }
  }

  function readNext() {
    while (nbRemainingPackets < connection.packetConcurrency && offset.lt(fileLength)){
      // process packet size
      var rest = offset.sub(fileLength).neg();
      var packetSize = rest.gt(maxPacketSize) ? maxPacketSize : rest.toNumber();
      // generate buffer
      SMB2Request('read', {
        'FileId':file.FileId
      , 'Length':packetSize
      , 'Offset':offset.toBuffer()
      }, connection, callback(chunckRequested, offset));
      offset = offset.add(packetSize);
      chunckRequested++;
      nbRemainingPackets++;
    }
  }

  return readable;
}

function processOptions(options) {

  // create the options object
  if (options === undefined) {
    options = {};
  } else if (typeof options === 'string') {
    options = { encoding: options };
  } else if (typeof options === 'object') {
    // this is a valid options object
  } else {
    throw new TypeError('"options" argument must be a string or an object');
  }

  // check the start option
  if (options.start === undefined) {
    options.start = 0;
  } else if (typeof options.start !== 'number') {
    throw new TypeError('start (' + options.start + ') must be a Number');
  }

  // check the end option
  if (options.end === undefined) {
    options.end = Infinity;
  } else if (typeof options.end !== 'number') {
    throw new TypeError('end (' + options.end + ') must be a Number');
  }

  // check logical values for start and end
  if (options.start > options.end) {
    throw new Error('start (' + options.start + ') must be <= end (' + options.end + ')');
  } else if (options.start < 0) {
    throw new Error('start (' + options.start + ') must be >= zero');
  }

  return options;

}
