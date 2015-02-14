

var SMB2Message = require('../tools/smb2-message')
  , message = require('../tools/message')
  ;


module.exports = message({

  generate:function(connection, params){

    return new SMB2Message({
      headers:{
        'Command':'QUERY_DIRECTORY'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      , 'ProcessId':connection.ProcessId
      }
    , request:{
        'FileId':params.FileId
      , 'Buffer':new Buffer('*', 'ucs2')
      }
    });

  }

, parseResponse:function(response){
    return parseFiles(response.getResponse().Buffer);
  }

});






/*
 * HELPERS
 */
function parseFiles(buffer){
  var files = []
    , offset = 0
    , nextFileOffset = -1
    ;
  while(nextFileOffset!=0){
    // extract next file offset
    nextFileOffset = buffer.readUInt32LE(offset);
    // extract the file
    files.push(
      parseFile(
        buffer.slice(offset+4, nextFileOffset ? offset+nextFileOffset : buffer.length)
      )
    );
    // move to nex file
    offset += nextFileOffset;
  }
  return files;
}

function parseFile(buffer){
  var file = {}
    , offset = 0
    ;

  // index
  file.Index = buffer.readUInt32LE(offset);
  offset+=4;

  // CreationTime
  file.CreationTime = buffer.slice(offset, offset+8);
  offset+=8;

  // LastAccessTime
  file.LastAccessTime = buffer.slice(offset, offset+8);
  offset+=8;

  // LastWriteTime
  file.LastWriteTime = buffer.slice(offset, offset+8);
  offset+=8;

  // ChangeTime
  file.ChangeTime = buffer.slice(offset, offset+8);
  offset+=8;

  // EndofFile
  file.EndofFile = buffer.slice(offset, offset+8);
  offset+=8;

  // AllocationSize
  file.AllocationSize = buffer.slice(offset, offset+8);
  offset+=8;

  // FileAttributes
  file.FileAttributes = buffer.readUInt32LE(offset);
  offset+=4;

  // FilenameLength
  file.FilenameLength = buffer.readUInt32LE(offset);
  offset+=4;

  // EASize
  file.EASize = buffer.readUInt32LE(offset);
  offset+=4;

  // ShortNameLength
  file.ShortNameLength = buffer.readUInt8(offset);
  offset+=1;

  // FileId
  file.FileId = buffer.slice(offset, offset+8);
  offset+=8;

  // Reserved
  offset+=27;

  // Filename
  file.Filename = buffer.slice(offset, offset+file.FilenameLength).toString('ucs2');
  offset+=file.FilenameLength;

  return file;
}