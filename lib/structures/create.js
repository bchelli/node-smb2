

module.exports = {

  request:[

    ['StructureSize', 2, 57]
  , ['SecurityFlags', 1, 0]
  , ['RequestedOplockLevel', 1, 0]
  , ['ImpersonationLevel', 4, 0x00000002]
  , ['SmbCreateFlags', 8, 0]
  , ['Reserved', 8, 0]
  , ['DesiredAccess',     4, 0x00100081]
  , ['FileAttributes',    4, 0x00000000]
  , ['ShareAccess',       4, 0x00000007]
  , ['CreateDisposition', 4, 0x00000001]
  , ['CreateOptions',     4, 0x00000020]
  , ['NameOffset', 2]
  , ['NameLength', 2]
  , ['CreateContextsOffset', 4]
  , ['CreateContextsLength', 4]
  , ['Buffer', 'NameLength']
  , ['Reserved2', 2, 0x4200]
  , ['CreateContexts', 'CreateContextsLength', '']

  ]

, response:[

    ['StructureSize', 2]
  , ['OplockLevel', 1]
  , ['Flags', 1]
  , ['CreateAction', 4]
  , ['CreationTime', 8]
  , ['LastAccessTime', 8]
  , ['LastWriteTime', 8]
  , ['ChangeTime', 8]
  , ['AllocationSize', 8]
  , ['EndofFile', 8]
  , ['FileAttributes', 4]
  , ['Reserved2', 4]
  , ['FileId', 16]
  , ['CreateContextsOffset', 4]
  , ['CreateContextsLength', 4]
  , ['Buffer', 'CreateContextsLength']

  ]

}

