const Stream = require('stream');
const SMB2Forge = require('../tools/smb2-forge')
, SMB2Request = SMB2Forge.request
, bigint = require('../tools/bigint')
;

/*
 * writeFileStream
 * =========
 *
 * create and write file on the share
 *
 *  - create the file
 *
 *  - set info of the file
 *
 *  - pipe contents of the file in multiple Streams
 *
 *  - close the file
 *
 */
module.exports = 
  async function(filename, data, fileLength, options, cb){
  let cbFunc = cb;
  if(typeof options === 'function'){
    cbFunc = options;
  }

  options.encoding = options.encoding || 'utf8';

  let connection = this;

  try {
    let file = await createFile(filename, connection);
    await setFileSize(file, fileLength, connection);
    let writeStream = new SambaWriter(connection, file);
    await new Promise((resolve, reject) => {
      writeStream.on('end', () => {
        resolve();
      });
      writeStream.on('error', (err) => {
        if(err.code !== 'STATUS_PENDING'){
          reject(err);
        }
      });
      data.pipe(writeStream);
    });

    await closeFile(file, connection);
    cbFunc();
  } catch (err) {
    cbFunc(err);
  }
};

class SambaWriter extends Stream.Writable {
  
  constructor(client, file) {
    super();
    this.promises = [];
    this.offset = 0;
    this.maxPacketSize = new bigint(8, 0x00010000 - 0x71).toNumber();
    this.parallelParts = 20;
    this.current = Buffer.alloc(0);
    this.file = file;
    this.client = client;
    this.on('finish', this._finish);
  }

  _finish() {
    if(this.current) {
      this.promises.push(this.writeBuffer(this.current, this.offset, () => {}));
    }
    Promise.all(this.promises)
    .then(() => {
      this.emit('end');
    })
    .catch((err) => {
      this.emit('error', err);
    });
  }

  writeBuffer(chunk, currentOffset, done) {
    let pr = new Promise((resolve, reject) => {
      SMB2Request('write', {
        'FileId': this.file.FileId,
        'Offset': new bigint(8, currentOffset).toBuffer(),
        'Buffer': chunk
        }, 
                  this.client, (err) => {
          if(!err) {
            resolve();
          } else {
            reject(err);
          }
          done(err);
        }
      );
    });
    pr.then(() => {
      let index = this.promises.findIndex(x => x === pr);
      if(index >= 0) {
        this.promises.splice(index, 1);
      }
      return true;
    });

    return pr;
  }

  _write(chunk, encoding, done) {
    if((this.current).length + chunk.length < this.maxPacketSize) {
      this.current = Buffer.concat([this.current, chunk]);
      done();
      return;
    }
    
    let buffer = this.current;
    this.current = chunk;
    let currentOffset = this.offset;
    let pr = this.writeBuffer(buffer, currentOffset, done);
    this.promises.push(pr);
    this.offset += buffer.length;

    if(this.promises.length >= this.parallelParts) {
      this.promises[0]
        .then(() => {
          this.emit('drain');
        })
        .catch((err) => {
          this.emit('error', err);
        });
      return false;
    }
  }
}

function createFile(filename, connection){
  return new Promise((resolve, reject) => {
    SMB2Request('create', {path:filename}, connection, function(err, f){
      if(err) {
        reject(err);
      }
      else {
        resolve(f);
      }
    });  
  });
}

function closeFile(file, connection){
  return new Promise((resolve, reject) => {
    SMB2Request('close', file, connection, function(err){
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });  
  });
}

function setFileSize(file, fileLength, connection){
  return new Promise((resolve, reject) => {
    SMB2Request('set_info', 
                {
                  FileId:file.FileId,
                  FileInfoClass:'FileEndOfFileInformation',
                  Buffer:new bigint(8, fileLength).toBuffer()
                }, 
                connection,
                function(err){
                  if(err){
                    reject(err);
                  }
                  else {
                    resolve();
                  }
                });
  });
}


