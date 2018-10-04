# Releases

## 0.2.11
2018-10-04
- BUG FIX: Fixed bug on open_folder that was not using the right DesiredAccess
- BUG FIX: Use open_folder in readdir, this was preventing from reading the root folder

## 0.2.10
2018-10-04
- Update NTLM to version 0.1.3

## 0.2.9
2018-10-03
- readdir support for large directory

## 0.2.8
2018-07-04
- BUG FIX: Use 'open' before set_info when renaming files
  This fixes an issue where using `smb2Client.rename()` to rename a file
  results in overwriting the file with empty content before renaming.

## 0.2.7
2016-01-28
- BUG FIX: Fixed a bug with 0 autocloseTimeout

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
