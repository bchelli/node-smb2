# Releases

## 0.2.6
- fs.rename(oldPath, newPath, callback)

## 0.2.5
- BUG FIX: Make MessageId, ProcessId, SessionId unique at the connection level

## 0.2.4
- refactor lib/smb2.js: now every single api is in the lib/api folder, connection and message forging has been also externalized under tools

## 0.2.3
- fs.rmdir(path, callback)

## 0.2.2
- fs.mkdir(path, [mode], callback)

## 0.2.1
- Add connection autoclose
- socket error handling
- API documentation

## 0.2.0
- remove the connect function and make it called implicitly by every single function trying to interact with the share

## 0.1.0
- fs.unlinkFile(path, callback)
- fs.readdir(path, callback)
- fs.readFile(filename, [options], callback)
- fs.writeFile(filename, data, [options], callback)
- fs.exists(path, callback)
