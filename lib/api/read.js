var assert = require('assert');

var BigInt = require('../tools/bigint');
var request = require('../tools/smb2-forge').request;
var MAX_READ_LENGTH = require('../structures/constants').MAX_READ_LENGTH;

module.exports = function read(file, buffer, offset, length, start, cb) {
  assert(pos !== null, 'null pos is not supported');

  var connection = this;
  var end = Math.min(
    start + length,
    BigInt.fromBuffer(file.EndofFile).toNumber()
  );
  var pos = start;

  function onRead(err, chunk) {
    if (err != null) {
      return cb(err, pos - start, buffer);
    }

    chunk.copy(buffer, offset);

    var n = chunk.length;
    offset += n;
    pos += n;

    readChunk();
  }
  function readChunk() {
    if (pos >= end) {
      return cb(null, pos - start, buffer);
    }
    request(
      'read',
      {
        FileId: file.FileId,
        Length: Math.min(MAX_READ_LENGTH, end - pos),
        Offset: new BigInt(8, pos).toBuffer(),
      },
      connection,
      onRead
    );
  }

  process.nextTick(readChunk);
};
