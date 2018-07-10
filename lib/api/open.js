var request = require('../tools/smb2-forge').request;

module.exports = function open(path, cb) {
  request('open', { path: path }, this, cb);
};
