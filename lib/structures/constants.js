/* Documentation https://msdn.microsoft.com/en-us/library/cc246497.aspx */

module.exports = {
  /* 2.2.13 SMB2 CREATE Request:
     https://msdn.microsoft.com/en-us/library/cc246502.aspx */
  FILE_SUPERSEDE: 0x00000000,
  FILE_OPEN: 0x00000001,
  FILE_CREATE: 0x00000002,
  FILE_OPEN_IF: 0x00000003,
  FILE_OVERWRITE: 0x00000004,
  FILE_OVERWRITE_IF: 0x00000005
}
