import {request} from '../tools/smb2-forge'

export default function (path, cb) {
  request('open', {path}, this, (err, file) => {
    if (err) {
      if (err.code === 'STATUS_OBJECT_NAME_NOT_FOUND') {
        err.code = 'ENOENT'
      }
      cb(err)
    } else {
      let fileLength = 0
      for (let i = 0; i < file.EndofFile.length; i++) {
        fileLength += file.EndofFile[i] * Math.pow(2, i * 8)
      }
      cb(null, fileLength)
    }
  })
}
