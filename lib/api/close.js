var request = require('../tools/smb2-forge').request;

module.exports = function close(file, cb) {
  request('close', file, this, cb);
};
