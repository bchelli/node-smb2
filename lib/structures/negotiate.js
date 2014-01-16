

module.exports = {

  request:[
    ['StructureSize', 2, 36]
  , ['DialectCount', 2, 2]
  , ['SecurityMode', 2, 1]
  , ['Reserved', 2, 0]
  , ['Capabilities', 4, 0]
  , ['ClientGuid', 16, 0]
  , ['ClientStartTime', 8, 0]
  , ['Dialects', 4, new Buffer([0x02,0x02,0x10,0x02])]
  ]

, response:[
    ['StructureSize', 2]
  , ['SecurityMode', 2]
  , ['DialectRevision', 2]
  , ['Reserved', 2]
  , ['ServerGuid', 16]
  , ['Capabilities', 4]
  , ['MaxTransactSize', 4]
  , ['MaxReadSize', 4]
  , ['MaxWriteSize', 4]
  , ['SystemTime', 8]
  , ['ServerStartTime', 8]
  , ['SecurityBufferOffset', 2]
  , ['SecurityBufferLength', 2]
  , ['Reserved2', 4]
  , ['Buffer', 'SecurityBufferLength']
  ]

}

