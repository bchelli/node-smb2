var Readable = require('stream').Readable;

var BigInt = require('../tools/bigint');
var request = require('../tools/smb2-forge').request;

// Where does it come from?!
var maxPacketSize = 0x00010000;

module.exports = function createReadStream(path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  } else if (options == null) {
    options = {}
  }

  var connection = this;

  request('open', { path: path }, connection, function(err, file) {
    if (err != null) {
      return cb(err);
    }

    var offset = new BigInt(file.EndofFile.length, options.start || 0);
    var fileSize = BigInt.fromBuffer(file.EndofFile);

    var end = options.end
    if (end != null) {
      end = new BigInt(8, end + 1)
      if (end.gt(fileSize)) {
        fileSize = end
      }
    }

    var close = request.bind(undefined, 'close', file, connection);

    var stream = new Readable();
    stream._destroy = function(err, cb) {
      close(function(err2) {
        if (err != null) {
          return cb(err2);
        }
        cb(err);
      });
    };
    var running = false;
    stream._read = function(size) {
      if (running) {
        return;
      }

      if (offset.ge(fileSize)) {
        return close(function () {
          this.push(null)
        })
      }

      running = true;
      request(
        'read',
        {
          FileId: file.FileId,
          Length: Math.min(maxPacketSize, size),
          Offset: offset.toBuffer(),
        },
        connection,
        function(err, content) {
          try {
            if (err != null) {
              return process.nextTick(stream.emit.bind(stream, 'error', err));
            }

            offset = offset.add(content.length);
            stream.push(content);
          } finally {
            running = false;
          }
        }
      );
    };
    cb(null, stream);
  });
};
