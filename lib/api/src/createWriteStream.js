import Bigint from '../tools/bigint'
import Bluebird from 'bluebird'
import {request} from '../tools/smb2-forge'
import {Writable} from 'stream'

const requestAsync = Bluebird.promisify(request)

const maxPacketSize = new Bigint(8, 0x00010000 - 0x71)

class SmbWritableStream extends Writable {
  constructor (connection, file, options) {
    super(options)
    this.connection = connection
    this.encoding = options.encoding || 'utf8'
    this.file = file
    this.offset = new Bigint(8)
  }

  async _write (chunk, encoding, next) {
    const count = this.count++
    encoding = this.encoding || encoding
    chunk = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk, encoding)

    while(chunk.length > 0) {
      const packetSize = Math.min(maxPacketSize.toNumber(), chunk.length)
      const packet = chunk.slice(0, packetSize)
      chunk = chunk.slice(packetSize)
      const offset = new Bigint(this.offset)
      this.offset = this.offset.add(packetSize)
      await requestAsync('write', {
        FileId: this.file.FileId,
        Offset: offset.toBuffer(),
        Buffer: packet
      }, this.connection)
    }

    next()
  }

  async end (...args) {
    try {
      super.end(...args)
    } finally {
      await requestAsync('close', this.file, this.connection)
    }
  }
}

export default function (path, options, cb) {
  if(typeof options == 'function'){
    cb = options;
    options = {};
  }
  request('create', {path}, this, (err, file) => {
    if (err) {
      cb(err)
    } else {
      cb(null, new SmbWritableStream(this, file, options))
    }
  })
}
