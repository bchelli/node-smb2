# SMB2 Client for Node.js

## Introduction

This library is a simple implementation of SMB2 for Node.js. It allows you to access a SMB2 share as if you were using the native fs library.

The development is still at an experimental stage and should not be yet considered for production environment.

## Installation

npm install smb2

## Usage

```javascript
// load the library
var SMB2 = require('smb2');

// create an SMB2 instance
var s = new SMB2({
  share:'\\\\000.000.000.000\\c$'
, domain:'DOMAIN'
, username:'username'
, password:'password!'
});

// negotiate the connection with the server
s.connect(function(err){

    // if an error happen => throw it
    if(err) throw err;

    // read the content of the folder
    s.readDir('Windows\\System32', function(err, files){
        
        // if an error happen => throw it
        if(err) throw err;
        
        // display content in the console
        console.log(files);
        
        // close the connection
        s.close();
        
    });

});

```

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