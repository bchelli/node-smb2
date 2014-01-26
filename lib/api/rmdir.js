

var SMB2Forge = require('../tools/smb2-forge')
  , SMB2Request = SMB2Forge.request
  , bigint = require('../tools/bigint')
  ;

/*
 * rmdir
 * =====
 *
 * remove directory:
 *
 *  - open the folder
 *
 *  - remove the folder
 *
 *  - close the folder
 *
 */
module.exports = function(path, cb){
  var connection = this;

  connection.exists(path, function(err, exists){

    if(err) cb && cb(err);

    else if(exists){

      // SMB2 open file
      SMB2Request('open_folder', {path:path}, connection, function(err, file){
        if(err) cb && cb(err);
        // SMB2 query directory
        else SMB2Request('set_info', {FileId:file.FileId, FileInfoClass:'FileDispositionInformation',Buffer:(new bigint(1,1)).toBuffer()}, connection, function(err, files){
          if(err) cb && cb(err);
          // SMB2 close directory
          else SMB2Request('close', file, connection, function(err){
            cb && cb(null, files);
          });
        });
      });

    } else {

      cb(new Error('Folder does not exists'));

    }

  });

}
