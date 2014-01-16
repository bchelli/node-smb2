

module.exports = {

  request:[
    ['StructureSize', 2, 9]
  , ['Reserved', 2, 0]
  , ['PathOffset', 2, 72]
  , ['PathLength', 2]
  , ['Buffer', 'PathLength']
  ]

, response:[
    ['StructureSize', 2]
  , ['ShareType', 1]
  , ['Reserved', 1]
  , ['ShareFlags', 4]
  , ['Capabilities', 4]
  , ['MaximalAccess', 4]
  ]

}

