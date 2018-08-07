var Readable = require('stream').Readable;

var BigInt = require('../tools/bigint');
var request = require('../tools/smb2-forge').request;
var MAX_READ_LENGTH = require('../structures/constants').MAX_READ_LENGTH;

module.exports = function createReadStream(path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  } else if (options == null) {
    options = {};
  }

  var connection = this;

  request('open', { path: path }, connection, function(err, file) {
    if (err != null) {
      return cb(err);
    }

    var offset = options.start || 0;
    var end = BigInt.fromBuffer(file.EndofFile).toNumber();

    if (options.end < end) {
      end = options.end + 1; // end option is inclusive
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

      if (offset >= end) {
        return close(function() {
          stream.push(null);
        });
      }

      running = true;
      request(
        'read',
        {
          FileId: file.FileId,
          Length: Math.min(MAX_READ_LENGTH, size, end - offset),
          Offset: new BigInt(8, offset).toBuffer(),
        },
        connection,
        function(err, content) {
          running = false;
          if (err != null) {
            return process.nextTick(stream.emit.bind(stream, 'error', err));
          }

          offset += content.length;
          stream.push(content);
        }
      );
    };
    cb(null, stream);
  });
};
