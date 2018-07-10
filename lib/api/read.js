var assert = require('assert');

var BigInt = require('../tools/bigint');
var request = require('../tools/smb2-forge').request;
var MAX_READ_LENGTH = require('../structures/constants').MAX_READ_LENGTH;

module.exports = function read(file, buffer, offset, length, position, cb) {
  assert(position !== null, 'null position is not supported');

  var fileSize = BigInt.fromBuffer(file.EndofFile);
  var bytesRead = 0;
  var connection = this;

  position = new BigInt(8, position);

  function onRead(err, chunk) {
    if (err != null) {
      return cb(err, buffer, bytesRead);
    }

    chunk.copy(buffer, offset);

    var n = chunk.length;
    bytesRead += n;
    offset += n;
    position = position.add(n);

    readChunk();
  }
  function readChunk() {
    if (bytesRead >= length || position.ge(fileSize)) {
      return cb(null, buffer, bytesRead);
    }
    request(
      'read',
      {
        FileId: file.FileId,
        Length: Math.min(MAX_READ_LENGTH, length - bytesRead),
        Offset: position.toBuffer(),
      },
      connection,
      onRead
    );
  }

  process.nextTick(readChunk);
};
