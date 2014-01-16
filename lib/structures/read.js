

module.exports = {

  request:[
    ['StructureSize', 2, 49]
  , ['Padding', 1, 0x50]
  , ['Flags', 1, 0]
  , ['Length', 4]
  , ['Offset', 8]
  , ['FileId', 16]
  , ['MinimumCount', 4, 0]
  , ['Channel', 4, 0]
  , ['RemainingBytes', 4, 0]
  , ['ReadChannelInfoOffset', 2, 0]
  , ['ReadChannelInfoLength', 2, 0]
  , ['Buffer', 1, 0]
  ]

, response:[
    ['StructureSize', 2]
  , ['DataOffset', 1]
  , ['Reserved', 1]
  , ['DataLength', 4]
  , ['DataRemaining', 4]
  , ['Reserved2', 4]
  , ['Buffer', 'DataLength']
  ]

}

