

var bigint = require('../tools/bigint')
  , SMB2Forge = require('../tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  ;

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
module.exports = function(oldPath, newPath, cb){

  var connection = this;

  // SMB2 open the folder / file
  SMB2Request('open_folder', {path:oldPath}, connection, function(err, file){
    if(err) SMB2Request('open', {path:oldPath}, connection, function(err, file){
      if(err) cb && cb(err);
      else rename(connection, file, newPath, cb);
    });
    else rename(connection, file, newPath, cb);
  });

}


function rename (connection, file, newPath, cb) {
  // SMB2 rename
  SMB2Request('set_info', {FileId:file.FileId, FileInfoClass:'FileRenameInformation',Buffer:renameBuffer(newPath)}, connection, function(err){
    if(err) cb && cb(err);
    // SMB2 close file
    else SMB2Request('close', file, connection, function(err){
      cb && cb(null);
    });
  });
}


function renameBuffer (newPath) {

  var filename = new Buffer(newPath, 'ucs2');

  return Buffer.concat([

    // ReplaceIfExists 1 byte
    (new bigint(1,0)).toBuffer()

    // Reserved 7 bytes
  , (new bigint(7,0)).toBuffer()

    // RootDirectory 8 bytes
  , (new bigint(8,0)).toBuffer()

    // FileNameLength 4 bytes
  , (new bigint(4,filename.length)).toBuffer()

    // FileName
  , filename

  ]);

}
