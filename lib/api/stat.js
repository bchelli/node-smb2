const FileTime = require('win32filetime');
const SMB2Forge = require('../tools/smb2-forge');
const SMB2Request = SMB2Forge.request;

/*
 * stat
 * ======
 *
 * return basic info about a file
 *
 *  - try to open the file
 *
 *  - process the file info
 *
 *  - close the file
 *
 * returns stats in callback in similar format like fs.stat:
 * {
 *   size: number;
 *   atimeMs: number;
 *   mtimeMs: number;
 *   ctimeMs: number;
 *   birthtimeMs: number;
 *   atime: Date;
 *   mtime: Date;
 *   ctime: Date;
 *   birthtime: Date;
 * }
 */
module.exports = function (path, cb) {
  if (!cb || typeof cb !== 'function') {
    throw new Error('Callback must be a function');
  }

  var connection = this;

  SMB2Request('open', { path }, connection, function (err, fileInfo) {
    if (err) cb(err);
    else {
      SMB2Request('close', fileInfo, connection, function (err) {
        if (err) cb(err);
        cb(null, translateResponse(fileInfo));
      });
    }
  });

}

function translateResponse(fileInfo) {
  const atimeMs = convertToUnixTime(fileInfo['LastAccessTime']);
  const mtimeMs = convertToUnixTime(fileInfo['LastWriteTime']);
  const ctimeMs = convertToUnixTime(fileInfo['ChangeTime']);
  const birthtimeMs = convertToUnixTime(fileInfo['CreationTime']);
  return {
    size: fileInfo['EndofFile'].readUInt32LE(),

    atimeMs,
    mtimeMs,
    ctimeMs,
    birthtimeMs,
    atime: new Date(atimeMs),
    mtime: new Date(mtimeMs),
    ctime: new Date(ctimeMs),
    birthtime: new Date(birthtimeMs)
  }
}

function convertToUnixTime(buffer) {
  const low = buffer.readUInt32LE(0);
  const high = buffer.readUInt32LE(4);
  return FileTime.toUnix({ low, high });
}
