var Writable = require('stream').Writable;

var BigInt = require('../tools/bigint');
var request = require('../tools/smb2-forge').request;
var constants = require('../structures/constants');

// Where does it come from?!
var maxPacketSize = 0x00010000 - 0x71;

module.exports = function createWriteStream(path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var createDisposition;
  var flags = options != null && options.flags;
  if (flags == null) {
  } else if (flags === 'r+') {
    createDisposition = constants.FILE_OPEN;
  } else if (flags === 'w' || flags === 'w+') {
    createDisposition = constants.FILE_OVERWRITE_IF;
  } else if (flags === 'wx' || flags === 'wx+') {
    createDisposition = constants.FILE_CREATE;
  }

  var connection = this;
  request(
    'create',
    { createDisposition: createDisposition, path: path },
    connection,
    function(err, file) {
      if (err != null) {
        return cb(err);
      }

      var offset = new BigInt(8, (options != null && options.start) || 0);

      var close = request.bind(undefined, 'close', file, connection);

      function write(buffer, i, cb) {
        var j = i + maxPacketSize;
        var chunk = buffer.slice(i, j)
        request(
          'write',
          {
            Buffer: chunk,
            FileId: file.FileId,
            Offset: offset.toBuffer(),
          },
          connection,
          function(err, result) {
            if (err != null) {
              return cb(err);
            }
            offset = offset.add(chunk.length)
            if (j < buffer.length) {
              return write(buffer, j, cb);
            }
            cb();
          }
        );
      }

      var stream = new Writable();
      stream._destroy = function(err, cb) {
        close(function(err2) {
          if (err != null) {
            return cb(err2);
          }
          cb(err);
        });
      };
      stream._final = close
      stream._write = function(chunk, encoding, next) {
        write(
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding),
          0,
          next
        );
      };
      cb(null, stream);
    }
  );
};
