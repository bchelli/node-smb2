

/*
 * CONSTANTS
 */
var shareRegExp = /\\\\([^\\]*)\\([^\\]*)\\?/
  , port = 445
  , packetConcurrency = 20
  , autoCloseTimeout = 10000
  ;


/*
 * DEPENDENCIES
 */
var SMB2Connection = require('./tools/smb2-connection');


/*
 * CONSTRUCTOR
 */
var SMB = module.exports = function(opt){

  opt = opt || {};

  // Parse share-string
  var matches;
  if(!opt.share || !(matches = opt.share.match(shareRegExp))){
    throw new Error('the share is not valid');
  }

  // resolve IP from NetBios
  // this.ip = netBios.resolve(matches[0]);
  this.ip = matches[1];

  // set default port
  this.port = opt.port || port;

  // set message id
  this.messageId = 0;

  // extract share
  this.share = matches[2];

  // save the full path
  this.fullPath = opt.share;

  // packet concurrency default 20
  this.packetConcurrency = opt.packetConcurrency || packetConcurrency;

  // close timeout default 10s
  if (opt.autoCloseTimeout !== undefined) {
    this.autoCloseTimeout = opt.autoCloseTimeout
  } else {
    this.autoCloseTimeout = autoCloseTimeout
  }

  // store authentification
  this.domain   = opt.domain;
  this.username = opt.username;
  this.password = opt.password;

  // set session id
  this.SessionId = Math.floor(Math.random()*256) & 0xFF;

  // set the process id
  // https://msdn.microsoft.com/en-us/library/ff470100.aspx
  this.ProcessId = new Buffer([
    Math.floor(Math.random()*256) & 0xFF,
    Math.floor(Math.random()*256) & 0xFF,
    Math.floor(Math.random()*256) & 0xFF,
    Math.floor(Math.random()*256) & 0xFE
  ]);

  // activate debug mode
  this.debug = opt.debug;

  // init connection (socket)
  SMB2Connection.init(this);
};


/*
 * PROTOTYPE
 */
var proto = SMB.prototype = {};

proto.close = require('./api/close');

proto.exists    = SMB2Connection.requireConnect(require('./api/exists'));

proto.rename    = SMB2Connection.requireConnect(require('./api/rename'));

proto.readFile  = SMB2Connection.requireConnect(require('./api/readfile'));
proto.writeFile = SMB2Connection.requireConnect(require('./api/writefile'));
proto.unlink    = SMB2Connection.requireConnect(require('./api/unlink'));

proto.readdir   = SMB2Connection.requireConnect(require('./api/readdir'));
proto.rmdir     = SMB2Connection.requireConnect(require('./api/rmdir'));
proto.mkdir     = SMB2Connection.requireConnect(require('./api/mkdir'));




