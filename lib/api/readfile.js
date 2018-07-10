var SMB2Forge = require('../tools/smb2-forge'),
  SMB2Request = SMB2Forge.request,
  bigint = require('../tools/bigint'),
  MAX_READ_LENGTH = require('../structures/constants').MAX_READ_LENGTH;

/*
 * readFile
 * ========
 *
 * read the content of a file from the share
 *
 *  - open the file
 *
 *  - read the content
 *
 *  - close the file
 *
 */
module.exports = function(filename, options, cb) {
  var connection = this;

  if (typeof options == 'function') {
    cb = options;
    options = {};
  }

  SMB2Request('open', { path: filename }, connection, function(err, file) {
    if (err) cb && cb(err);
    // SMB2 read file content
    else {
      var fileLength = 0,
        offset = new bigint(8),
        stop = false,
        nbRemainingPackets = 0;
      // get file length
      for (var i = 0; i < file.EndofFile.length; i++) {
        fileLength += file.EndofFile[i] * Math.pow(2, i * 8);
      }
      var result = new Buffer(fileLength);
      // callback manager
      var callback = function(offset) {
        return function(err, content) {
          if (stop) return;
          if (err) {
            cb && cb(err);
            stop = true;
          } else {
            content.copy(result, offset.toNumber());
            nbRemainingPackets--;
            checkDone();
          }
        };
      };
      // callback manager
      var checkDone = function() {
        if (stop) return;
        createPackets();
        if (nbRemainingPackets == 0 && offset.ge(fileLength)) {
          SMB2Request('close', file, connection, function() {
            if (options.encoding) {
              result = result.toString(options.encoding);
            }
            cb && cb(null, result);
          });
        }
      };
      // create packets
      var createPackets = function() {
        while (
          nbRemainingPackets < connection.packetConcurrency &&
          offset.lt(fileLength)
        ) {
          // process packet size
          var rest = offset.sub(fileLength).neg();
          var packetSize = rest.gt(MAX_READ_LENGTH)
            ? MAX_READ_LENGTH
            : rest.toNumber();
          // generate buffer
          SMB2Request(
            'read',
            {
              FileId: file.FileId,
              Length: packetSize,
              Offset: offset.toBuffer(),
            },
            connection,
            callback(offset)
          );
          offset = offset.add(packetSize);
          nbRemainingPackets++;
        }
      };
      checkDone();
    }
  });
};
