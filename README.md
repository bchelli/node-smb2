# SMB2 Client for Node.js

[![NPM version](https://badge.fury.io/js/smb2.svg)](http://badge.fury.io/js/smb2) [![Dependency Status](https://david-dm.org/bchelli/node-smb2.svg?theme=shields.io)](https://david-dm.org/bchelli/node-smb2) [![Code Climate](https://codeclimate.com/github/bchelli/node-smb2.svg)](https://codeclimate.com/github/bchelli/node-smb2)

## Introduction

This library is a simple implementation of SMB2 for Node.js. It allows you to access a SMB2 share as if you were using the native fs library.

The development is still at an experimental stage and should not be yet considered for production environment.

## Installation

```bash
npm install -S smb2
```

## API

### var smb2Client = new SMB2 ( options )
The SMB2 class is the constructor of your SMB2 client.

the parameter ```options``` accepts this list of attributes:

- ```share``` (mandatory): the share you want to access
- ```domain``` (mandatory): the domain of which the user is registred
- ```username``` (mandatory): the username of the user that access the share
- ```password``` (mandatory): the password
- ```port``` (optional): default ```445```, the port of the SMB server
- ```packetConcurrency``` (optional): default ```20```, the number of simulatanous packet when writting / reading data from the share
- ```autoCloseTimeout``` (optional): default ```10000```, the timeout in milliseconds before to close the SMB2 session and the socket, if setted to ```0``` the connection will never be closed unless you do it 

Example:
```javascript
// load the library
var SMB2 = require('smb2');

// create an SMB2 instance
var smb2Client = new SMB2({
  share:'\\\\000.000.000.000\\c$'
, domain:'DOMAIN'
, username:'username'
, password:'password!'
});
```

### smb2Client.readdir ( path, callback )
Asynchronous readdir(3). Reads the contents of a directory. The callback gets two arguments (err, files) where files is an array of the names of the files in the directory excluding '.' and '..'.

Example:
```javascript
smb2Client.readdir('Windows\\System32', function(err, files){
    if(err) throw err;
    console.log(files);
});
```

### smb2Client.readFile ( filename, [options], callback )
- ```filename``` String
- ```options``` Object
    - ```encoding``` String | Null default = null
- ```callback``` Function

Asynchronously reads the entire contents of a file. Example:
```javascript
smb2Client.readFile('path\\to\\my\\file.txt', function(err, data){
    if(err) throw err;
    console.log(data);
});
```
The callback is passed two arguments (err, data), where data is the contents of the file.

If no encoding is specified, then the raw buffer is returned.

### smb2Client.writeFile ( filename, data, [options], callback )
- ```filename``` String
- ```data``` String | Buffer
- ```options``` Object
    - ```encoding``` String | Null default = 'utf8'
- ```callback``` Function

Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.

The encoding option is ignored if data is a buffer. It defaults to 'utf8'.

Example:
```javascript
smb2Client.writeFile('path\\to\\my\\file.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});
```

### smb2Client.mkdir ( path, [mode], callback )
Asynchronous mkdir(2). No arguments other than a possible exception are given to the completion callback. mode defaults to 0777.

Example:
```javascript
smb2Client.mkdir('path\\to\\the\\folder', function (err) {
    if (err) throw err;
    console.log('Folder created!');
});
```

### smb2Client.rmdir ( path, callback )
Asynchronous rmdir(2). No arguments other than a possible exception are given to the completion callback.

Example:
```javascript
smb2Client.rmdir('path\\to\\the\\folder', function (err) {
    if (err) throw err;
    console.log('Folder deleted!');
});
```

### smb2Client.exists ( path, callback )
Test whether or not the given path exists by checking with the file system. Then call the callback argument with either true or false. Example:
```javascript
smb2Client.exists('path\\to\\my\\file.txt', function (err, exists) {
    if (err) throw err;
    console.log(exists ? "it's there" : "it's not there!");
});
```

### smb2Client.unlink ( path, callback )
Asynchronous unlink(2). No arguments other than a possible exception are given to the completion callback.
```javascript
smb2Client.unlink('path\\to\\my\\file.txt', function (err) {
    if (err) throw err;
    console.log("file has been deleted");
});
```

### smb2Client.rename ( oldPath, newPath, callback )
Asynchronous rename(2). No arguments other than a possible exception are given to the completion callback.
```javascript
smb2Client.rename('path\\to\\my\\file.txt', 'new\\path\\to\\my\\new-file-name.txt', function (err) {
    if (err) throw err;
    console.log("file has been renamed");
});
```

### smb2Client.close ( )
This function will close the open connection if opened, it will be called automatically after ```autoCloseTimeout``` ms of no SMB2 call on the server.

## Contributors
- [Benjamin Chelli](https://github.com/bchelli)
- [Fabrice Marsaud](https://github.com/marsaud)
- [Jay McAliley](https://github.com/jaymcaliley)
- [eldrago](https://github.com/eldrago)

## References

    The[MS-SMB2]: Server Message Block (SMB) Protocol Versions 2 and 3
    Copyright (C) 2014 Microsoft
    http://msdn.microsoft.com/en-us/library/cc246482.aspx

## License

(The MIT License)

Copyright (c) 2013-2014 Benjamin Chelli &lt;benjamin@chelli.net&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
