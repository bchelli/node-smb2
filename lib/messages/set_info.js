

var SMB2Message = require('../message')
  , MsErref = require('../tools/ms_erref')
  , bigint = require('../tools/bigint')
  ;


var fileInfoClasses = {
  'FileAllocationInformation': 19
, 'FileBasicInformation': 4
, 'FileDispositionInformation': 13
, 'FileEndOfFileInformation': 20
, 'FileFullEaInformation': 15
, 'FileLinkInformation': 11
, 'FileModeInformation': 16
, 'FilePipeInformation': 23
, 'FilePositionInformation': 14
, 'FileRenameInformation': 10
, 'FileShortNameInformation': 40
, 'FileValidDataLengthInformation': 39
};

module.exports = {
  generate:function(connection, params){
    return new SMB2Message({
      headers:{
        'Command':'SET_INFO'
      , 'SessionId':connection.SessionId
      , 'TreeId':connection.TreeId
      }
    , request:{
        'FileInfoClass':fileInfoClasses[params.FileInfoClass]
      , 'FileId':params.FileId
      , 'Buffer':params.Buffer
      }
    })
  }
, parse:function(connection, cb){
    return function(response){
      var h = response.getHeaders()
        , err = MsErref.getStatus(bigint.fromBuffer(h.Status).toNumber())
        ;
      if(err.code == 'STATUS_SUCCESS'){
        cb && cb(null, response.getResponse());
      } else {
        cb && cb(new Error(MsErref.getErrorMessage(err)));
      }
    }
  }
}

