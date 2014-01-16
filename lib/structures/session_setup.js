

module.exports = {

  request:[
    ['StructureSize', 2, 25]
  , ['Flags', 1, 0]
  , ['SecurityMode', 1, 1]
  , ['Capabilities', 4, 1]
  , ['Channel', 4, 0]
  , ['SecurityBufferOffset', 2, 88]
  , ['SecurityBufferLength', 2]
  , ['PreviousSessionId', 8, 0]
  , ['Buffer','SecurityBufferLength']
  ]

, response:[
    ['StructureSize', 2]
  , ['SessionFlags', 2]
  , ['SecurityBufferOffset', 2]
  , ['SecurityBufferLength', 2]
  , ['Buffer', 'SecurityBufferLength']
  ]

}

