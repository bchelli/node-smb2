var bigint = require('../tools/bigint');
var SMB2Request = require('../tools/smb2-forge').request;
var FILE_OPEN_IF = require('../structures/constants').FILE_OPEN_IF;

/*
 * rename
 * ======
 *
 * change the name of a file:
 *
 *  - open the file
 *
 *  - change file name
 *
 *  - close the file
 *
 */
module.exports = function rename(oldPath, newPath, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = {};
  }

  var connection = this;

  // SMB2 open the folder / file
  SMB2Request('open_folder', { path: oldPath }, connection, function(
    err,
    file
  ) {
    if (err)
      SMB2Request(
        'create',
        { path: oldPath, createDisposition: FILE_OPEN_IF },
        connection,
        function(err, file) {
          if (err) cb && cb(err);
          else rename_(connection, file, newPath, options, cb);
        }
      );
    else rename_(connection, file, newPath, options, cb);
  });
};

function rename_(connection, file, newPath, options, cb) {
  // SMB2 rename
  SMB2Request(
    'set_info',
    {
      FileId: file.FileId,
      FileInfoClass: 'FileRenameInformation',
      Buffer: renameBuffer(newPath, options),
    },
    connection,
    function(err) {
      if (err) cb && cb(err);
      // SMB2 close file
      else
        SMB2Request('close', file, connection, function() {
          cb && cb(null);
        });
    }
  );
}

function renameBuffer(newPath, options) {
  var filename = Buffer.from(newPath, 'ucs2');

  return Buffer.concat([
    // ReplaceIfExists 1 byte
    new bigint(1, options.replace ? 1 : 0).toBuffer(),

    // Reserved 7 bytes
    new bigint(7, 0).toBuffer(),

    // RootDirectory 8 bytes
    new bigint(8, 0).toBuffer(),

    // FileNameLength 4 bytes
    new bigint(4, filename.length).toBuffer(),

    // FileName
    filename,
  ]);
}
