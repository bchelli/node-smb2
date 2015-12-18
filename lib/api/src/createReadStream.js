import Bigint from '../tools/bigint'
import Bluebird from 'bluebird'
import {Readable} from 'stream'
import {request} from '../tools/smb2-forge'

const requestAsync = Bluebird.promisify(request)

const maxPacketSize = 0x00010000

class SmbReadableStream extends Readable {
  constructor (connection, file, options) {
    super(options)
    this.connection = connection
    this.encoding = options && options.encoding
    this.file = file
    this.offset = new Bigint(8)

    let fileLength = 0
    for (let i = 0; i < file.EndofFile.length; i++) {
      fileLength |= file.EndofFile[i] << (i * 8)
    }
    this.fileLength = fileLength
    this.wait = false
  }

  async _read (size) {
    while (this.offset.lt(this.fileLength)/* && size > 0*/) {
      if (this.wait) {
        return
      }
      const rest = this.offset.sub(this.fileLength).neg()
      const packetSize = Math.min(maxPacketSize, rest.toNumber/*, size*/)

      const offset = new Bigint(this.offset)
      this.wait = true
      let content = await requestAsync('read', {
        FileId: this.file.FileId,
        Length: packetSize,
        Offset: offset.toBuffer()
      }, this.connection)
      this.wait = false

      if (this.encoding) {
        content = content.toString(this.encoding)
      }

      this.offset = this.offset.add(packetSize)
      // size -= packetSize
      if (!this.push(content)) {
        return
      }
    }
    if (this.offset.ge(this.fileLength)) {
      await requestAsync('close', this.file, this.connection)
      this.push(null)
    }
  }
}

export default function (path, options, cb) {
  if(typeof options == 'function'){
    cb = options;
    options = {};
  }
  request('open', {path}, this, (err, file) => {
    if (err) {
      cb(err)
    } else {
      cb(null, new SmbReadableStream(this, file, options))
    }
  })
}
