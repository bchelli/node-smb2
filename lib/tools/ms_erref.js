
module.exports = {

  getStatus: function(errorCode){

    var hex = '0x'+('00000000'+errorCode.toString(16)).toUpperCase().substr(-8);
    var err = ntStatus[hex] || win32ErrorCodes[hex] || {
      "code":"ERROR_UNRECOGNIZED"
    , "message":"Unrecognized error"
    };
    err.value = errorCode;
    err.valueHex = hex;

    var facility = (errorCode >> 16) & 0x7FF;
    err.facility = facilities[facility] || {
      "code":"FACILITY_UNRECOGNIZED"
    , "message":"Unrecognized facility"
    };
    err.facility.value = facility;

    var severity = (errorCode >> 30) & 0x03;
    err.severity = severities[severity] || {
      "code":"STATUS_UNRECOGNIZED"
    , "message":"Unrecognized status"
    };
    err.severity.value = severity;

    return err;

  }

, getErrorMessage:function(err){
    return err.code+' ('+err.valueHex+') : '+err.message;
  }

};


var severities = {
  0:{
    "code":"STATUS_SEVERITY_SUCCESS"
  , "message":"Success"
  }
, 1:{
    "code":"STATUS_SEVERITY_INFORMATIONAL"
  , "message":"Informational"
  }
, 2:{
    "code":"STATUS_SEVERITY_WARNING"
  , "message":"Warning"
  }
, 3:{
    "code":"STATUS_SEVERITY_ERROR"
  , "message":"Error"
  }
}

var facilities = {
  0:{
    "code":"FACILITY_NULL"
  , "message":"The default facility code."
  }
, 1:{
    "code":"FACILITY_RPC"
  , "message":"The source of the error code is an RPC subsystem."
  }
, 2:{
    "code":"FACILITY_DISPATCH"
  , "message":"The source of the error code is a COM Dispatch."
  }
, 3:{
    "code":"FACILITY_STORAGE"
  , "message":"The source of the error code is OLE Storage."
  }
, 4:{
    "code":"FACILITY_ITF"
  , "message":"The source of the error code is COM/OLE Interface management."
  }
, 7:{
    "code":"FACILITY_WIN32"
  , "message":"This region is reserved to map undecorated error codes into HRESULTs."
  }
, 8:{
    "code":"FACILITY_WINDOWS"
  , "message":"The source of the error code is the Windows subsystem."
  }
, 9:{
    "code":"FACILITY_SECURITY"
  , "message":"The source of the error code is the Security API layer."
  }
// , 9:{
//     "code":"FACILITY_SSPI"
//   , "message":"The source of the error code is the Security API layer."
//   }
, 10:{
    "code":"FACILITY_CONTROL"
  , "message":"The source of the error code is the control mechanism."
  }
, 11:{
    "code":"FACILITY_CERT"
  , "message":"The source of the error code is a certificate client or server?"
  }
, 12:{
    "code":"FACILITY_INTERNET"
  , "message":"The source of the error code is Wininet related."
  }
, 13:{
    "code":"FACILITY_MEDIASERVER"
  , "message":"The source of the error code is the Windows Media Server."
  }
, 14:{
    "code":"FACILITY_MSMQ"
  , "message":"The source of the error code is the Microsoft Message Queue."
  }
, 15:{
    "code":"FACILITY_SETUPAPI"
  , "message":"The source of the error code is the Setup API."
  }
, 16:{
    "code":"FACILITY_SCARD"
  , "message":"The source of the error code is the Smart-card subsystem."
  }
, 17:{
    "code":"FACILITY_COMPLUS"
  , "message":"The source of the error code is COM+."
  }
, 18:{
    "code":"FACILITY_AAF"
  , "message":"The source of the error code is the Microsoft agent."
  }
, 19:{
    "code":"FACILITY_URT"
  , "message":"The source of the error code is .NET CLR."
  }
, 20:{
    "code":"FACILITY_ACS"
  , "message":"The source of the error code is the audit collection service."
  }
, 21:{
    "code":"FACILITY_DPLAY"
  , "message":"The source of the error code is Direct Play."
  }
, 22:{
    "code":"FACILITY_UMI"
  , "message":"The source of the error code is the ubiquitous memoryintrospection service."
  }
, 23:{
    "code":"FACILITY_SXS"
  , "message":"The source of the error code is Side-by-side servicing."
  }
, 24:{
    "code":"FACILITY_WINDOWS_CE"
  , "message":"The error code is specific to Windows CE."
  }
, 25:{
    "code":"FACILITY_HTTP"
  , "message":"The source of the error code is HTTP support."
  }
, 26:{
    "code":"FACILITY_USERMODE_COMMONLOG"
  , "message":"The source of the error code is common Logging support."
  }
, 31:{
    "code":"FACILITY_USERMODE_FILTER_MANAGER"
  , "message":"The source of the error code is the user mode filter manager."
  }
, 32:{
    "code":"FACILITY_BACKGROUNDCOPY"
  , "message":"The source of the error code is background copy control"
  }
, 33:{
    "code":"FACILITY_CONFIGURATION"
  , "message":"The source of the error code is configuration services."
  }
, 34:{
    "code":"FACILITY_STATE_MANAGEMENT"
  , "message":"The source of the error code is state management services."
  }
, 35:{
    "code":"FACILITY_METADIRECTORY"
  , "message":"The source of the error code is the Microsoft Identity Server."
  }
, 36:{
    "code":"FACILITY_WINDOWSUPDATE"
  , "message":"The source of the error code is a Windows update."
  }
, 37:{
    "code":"FACILITY_DIRECTORYSERVICE"
  , "message":"The source of the error code is Active Directory."
  }
, 38:{
    "code":"FACILITY_GRAPHICS"
  , "message":"The source of the error code is the graphics drivers."
  }
, 39:{
    "code":"FACILITY_SHELL"
  , "message":"The source of the error code is the user Shell."
  }
, 40:{
    "code":"FACILITY_TPM_SERVICES"
  , "message":"The source of the error code is the Trusted Platform Module services."
  }
, 41:{
    "code":"FACILITY_TPM_SOFTWARE"
  , "message":"The source of the error code is the Trusted Platform Module applications."
  }
, 48:{
    "code":"FACILITY_PLA"
  , "message":"The source of the error code is Performance Logs and Alerts"
  }
, 49:{
    "code":"FACILITY_FVE"
  , "message":"The source of the error code is Full volume encryption."
  }
, 50:{
    "code":"FACILITY_FWP"
  , "message":"he source of the error code is the Firewall Platform."
  }
, 51:{
    "code":"FACILITY_WINRM"
  , "message":"The source of the error code is the Windows Resource Manager."
  }
, 52:{
    "code":"FACILITY_NDIS"
  , "message":"The source of the error code is the Network Driver Interface."
  }
, 53:{
    "code":"FACILITY_USERMODE_HYPERVISOR"
  , "message":"The source of the error code is the Usermode Hypervisor components."
  }
, 54:{
    "code":"FACILITY_CMI"
  , "message":"The source of the error code is the Configuration Management Infrastructure."
  }
, 55:{
    "code":"FACILITY_USERMODE_VIRTUALIZATION"
  , "message":"The source of the error code is the user mode virtualization subsystem."
  }
, 56:{
    "code":"FACILITY_USERMODE_VOLMGR"
  , "message":"The source of the error code is the user mode volume manager"
  }
, 57:{
    "code":"FACILITY_BCD"
  , "message":"The source of the error code is the Boot Configuration Database."
  }
, 58:{
    "code":"FACILITY_USERMODE_VHD"
  , "message":"The source of the error code is user mode virtual hard disk support."
  }
, 60:{
    "code":"FACILITY_SDIAG"
  , "message":"The source of the error code is System Diagnostics."
  }
, 61:{
    "code":"FACILITY_WEBSERVICES"
  , "message":"The source of the error code is the Web Services."
  }
, 80:{
    "code":"FACILITY_WINDOWS_DEFENDER"
  , "message":"The source of the error code is a Windows Defender component."
  }
, 81:{
    "code":"FACILITY_OPC"
  , "message":"The source of the error code is the open connectivity service."
  }
}


var ntStatus = {
  "0x00000000":{
    "code":"STATUS_SUCCESS"
  , "message":"The operation completed successfully."
  }
, "0x00000001":{
    "code":"STATUS_WAIT_1"
  , "message":"The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
  }
, "0x00000002":{
    "code":"STATUS_WAIT_2"
  , "message":"The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
  }
, "0x00000003":{
    "code":"STATUS_WAIT_3"
  , "message":"The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
  }
, "0x0000003F":{
    "code":"STATUS_WAIT_63"
  , "message":"The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
  }
, "0x00000080":{
    "code":"STATUS_ABANDONED"
  , "message":"The caller attempted to wait for a mutex that has been abandoned."
  }
// , "0x00000080":{
//     "code":"STATUS_ABANDONED_WAIT_0"
//   , "message":"The caller attempted to wait for a mutex that has been abandoned."
//   }
, "0x000000BF":{
    "code":"STATUS_ABANDONED_WAIT_63"
  , "message":"The caller attempted to wait for a mutex that has been abandoned."
  }
, "0x000000C0":{
    "code":"STATUS_USER_APC"
  , "message":"A user-mode APC was delivered before the given Interval expired."
  }
, "0x00000101":{
    "code":"STATUS_ALERTED"
  , "message":"The delay completed because the thread was alerted."
  }
, "0x00000102":{
    "code":"STATUS_TIMEOUT"
  , "message":"The given Timeout interval expired."
  }
, "0x00000103":{
    "code":"STATUS_PENDING"
  , "message":"The operation that was requested is pending completion."
  }
, "0x00000104":{
    "code":"STATUS_REPARSE"
  , "message":"A reparse should be performed by the Object Manager because the name of the file resulted in a symbolic link."
  }
, "0x00000105":{
    "code":"STATUS_MORE_ENTRIES"
  , "message":"Returned by enumeration APIs to indicate more information is available to successive calls."
  }
, "0x00000106":{
    "code":"STATUS_NOT_ALL_ASSIGNED"
  , "message":"Indicates not all privileges or groups that are referenced are assigned to the caller. This allows, for example, all privileges to be disabled without having to know exactly which privileges are assigned."
  }
, "0x00000107":{
    "code":"STATUS_SOME_NOT_MAPPED"
  , "message":"Some of the information to be translated has not been translated."
  }
, "0x00000108":{
    "code":"STATUS_OPLOCK_BREAK_IN_PROGRESS"
  , "message":"An open/create operation completed while an opportunistic lock (oplock) break is underway."
  }
, "0x00000109":{
    "code":"STATUS_VOLUME_MOUNTED"
  , "message":"A new volume has been mounted by a file system."
  }
, "0x0000010A":{
    "code":"STATUS_RXACT_COMMITTED"
  , "message":"This success level status indicates that the transaction state already exists for the registry subtree but that a transaction commit was previously aborted. The commit has now been completed."
  }
, "0x0000010B":{
    "code":"STATUS_NOTIFY_CLEANUP"
  , "message":"Indicates that a notify change request has been completed due to closing the handle that made the notify change request."
  }
, "0x0000010C":{
    "code":"STATUS_NOTIFY_ENUM_DIR"
  , "message":"Indicates that a notify change request is being completed and that the information is not being returned in the caller\'s buffer. The caller now needs to enumerate the files to find the changes."
  }
, "0x0000010D":{
    "code":"STATUS_NO_QUOTAS_FOR_ACCOUNT"
  , "message":"{No Quotas} No system quota limits are specifically set for this account."
  }
, "0x0000010E":{
    "code":"STATUS_PRIMARY_TRANSPORT_CONNECT_FAILED"
  , "message":"{Connect Failure on Primary Transport} An attempt was made to connect to the remote server %hs on the primary transport, but the connection failed. The computer WAS able to connect on a secondary transport."
  }
, "0x00000110":{
    "code":"STATUS_PAGE_FAULT_TRANSITION"
  , "message":"The page fault was a transition fault."
  }
, "0x00000111":{
    "code":"STATUS_PAGE_FAULT_DEMAND_ZERO"
  , "message":"The page fault was a demand zero fault."
  }
, "0x00000112":{
    "code":"STATUS_PAGE_FAULT_COPY_ON_WRITE"
  , "message":"The page fault was a demand zero fault."
  }
, "0x00000113":{
    "code":"STATUS_PAGE_FAULT_GUARD_PAGE"
  , "message":"The page fault was a demand zero fault."
  }
, "0x00000114":{
    "code":"STATUS_PAGE_FAULT_PAGING_FILE"
  , "message":"The page fault was satisfied by reading from a secondary storage device."
  }
, "0x00000115":{
    "code":"STATUS_CACHE_PAGE_LOCKED"
  , "message":"The cached page was locked during operation."
  }
, "0x00000116":{
    "code":"STATUS_CRASH_DUMP"
  , "message":"The crash dump exists in a paging file."
  }
, "0x00000117":{
    "code":"STATUS_BUFFER_ALL_ZEROS"
  , "message":"The specified buffer contains all zeros."
  }
, "0x00000118":{
    "code":"STATUS_REPARSE_OBJECT"
  , "message":"A reparse should be performed by the Object Manager because the name of the file resulted in a symbolic link."
  }
, "0x00000119":{
    "code":"STATUS_RESOURCE_REQUIREMENTS_CHANGED"
  , "message":"The device has succeeded a query-stop and its resource requirements have changed."
  }
, "0x00000120":{
    "code":"STATUS_TRANSLATION_COMPLETE"
  , "message":"The translator has translated these resources into the global space and no additional translations should be performed."
  }
, "0x00000121":{
    "code":"STATUS_DS_MEMBERSHIP_EVALUATED_LOCALLY"
  , "message":"The directory service evaluated group memberships locally, because it was unable to contact a global catalog server."
  }
, "0x00000122":{
    "code":"STATUS_NOTHING_TO_TERMINATE"
  , "message":"A process being terminated has no threads to terminate."
  }
, "0x00000123":{
    "code":"STATUS_PROCESS_NOT_IN_JOB"
  , "message":"The specified process is not part of a job."
  }
, "0x00000124":{
    "code":"STATUS_PROCESS_IN_JOB"
  , "message":"The specified process is part of a job."
  }
, "0x00000125":{
    "code":"STATUS_VOLSNAP_HIBERNATE_READY"
  , "message":"{Volume Shadow Copy Service} The system is now ready for hibernation."
  }
, "0x00000126":{
    "code":"STATUS_FSFILTER_OP_COMPLETED_SUCCESSFULLY"
  , "message":"A file system or file system filter driver has successfully completed an FsFilter operation."
  }
, "0x00000127":{
    "code":"STATUS_INTERRUPT_VECTOR_ALREADY_CONNECTED"
  , "message":"The specified interrupt vector was already connected."
  }
, "0x00000128":{
    "code":"STATUS_INTERRUPT_STILL_CONNECTED"
  , "message":"The specified interrupt vector is still connected."
  }
, "0x00000129":{
    "code":"STATUS_PROCESS_CLONED"
  , "message":"The current process is a cloned process."
  }
, "0x0000012A":{
    "code":"STATUS_FILE_LOCKED_WITH_ONLY_READERS"
  , "message":"The file was locked and all users of the file can only read."
  }
, "0x0000012B":{
    "code":"STATUS_FILE_LOCKED_WITH_WRITERS"
  , "message":"The file was locked and at least one user of the file can write."
  }
, "0x00000202":{
    "code":"STATUS_RESOURCEMANAGER_READ_ONLY"
  , "message":"The specified ResourceManager made no changes or updates to the resource under this transaction."
  }
, "0x00000367":{
    "code":"STATUS_WAIT_FOR_OPLOCK"
  , "message":"An operation is blocked and waiting for an oplock."
  }
, "0x00010001":{
    "code":"DBG_EXCEPTION_HANDLED"
  , "message":"Debugger handled the exception."
  }
, "0x00010002":{
    "code":"DBG_CONTINUE"
  , "message":"The debugger continued."
  }
, "0x001C0001":{
    "code":"STATUS_FLT_IO_COMPLETE"
  , "message":"The IO was completed by a filter."
  }
, "0xC0000467":{
    "code":"STATUS_FILE_NOT_AVAILABLE"
  , "message":"The file is temporarily unavailable."
  }
, "0xC0000721":{
    "code":"STATUS_CALLBACK_RETURNED_THREAD_AFFINITY"
  , "message":"A threadpool worker thread entered a callback at thread affinity %p and exited at affinity %p.\nThis is unexpected, indicating that the callback missed restoring the priority."
  }
, "0x40000000":{
    "code":"STATUS_OBJECT_NAME_EXISTS"
  , "message":"{Object Exists} An attempt was made to create an object but the object name already exists."
  }
, "0x40000001":{
    "code":"STATUS_THREAD_WAS_SUSPENDED"
  , "message":"{Thread Suspended} A thread termination occurred while the thread was suspended. The thread resumed, and termination proceeded."
  }
, "0x40000002":{
    "code":"STATUS_WORKING_SET_LIMIT_RANGE"
  , "message":"{Working Set Range Error} An attempt was made to set the working set minimum or maximum to values that are outside the allowable range."
  }
, "0x40000003":{
    "code":"STATUS_IMAGE_NOT_AT_BASE"
  , "message":"{Image Relocated} An image file could not be mapped at the address that is specified in the image file. Local fixes must be performed on this image."
  }
, "0x40000004":{
    "code":"STATUS_RXACT_STATE_CREATED"
  , "message":"This informational level status indicates that a specified registry subtree transaction state did not yet exist and had to be created."
  }
, "0x40000005":{
    "code":"STATUS_SEGMENT_NOTIFICATION"
  , "message":"{Segment Load} A virtual DOS machine (VDM) is loading, unloading, or moving an MS-DOS or Win16 program segment image. An exception is raised so that a debugger can load, unload, or track symbols and breakpoints within these 16-bit segments."
  }
, "0x40000006":{
    "code":"STATUS_LOCAL_USER_SESSION_KEY"
  , "message":"{Local Session Key} A user session key was requested for a local remote procedure call (RPC) connection. The session key that is returned is a constant value and not unique to this connection."
  }
, "0x40000007":{
    "code":"STATUS_BAD_CURRENT_DIRECTORY"
  , "message":"{Invalid Current Directory} The process cannot switch to the startup current directory %hs. Select OK to set the current directory to %hs, or select CANCEL to exit."
  }
, "0x40000008":{
    "code":"STATUS_SERIAL_MORE_WRITES"
  , "message":"{Serial IOCTL Complete} A serial I/O operation was completed by another write to a serial port. (The IOCTL_SERIAL_XOFF_COUNTER reached zero.)"
  }
, "0x40000009":{
    "code":"STATUS_REGISTRY_RECOVERED"
  , "message":"{Registry Recovery} One of the files that contains the system registry data had to be recovered by using a log or alternate copy. The recovery was successful."
  }
, "0x4000000A":{
    "code":"STATUS_FT_READ_RECOVERY_FROM_BACKUP"
  , "message":"{Redundant Read} To satisfy a read request, the Windows NT fault-tolerant file system successfully read the requested data from a redundant copy. This was done because the file system encountered a failure on a member of the fault-tolerant volume but was unable to reassign the failing area of the device."
  }
, "0x4000000B":{
    "code":"STATUS_FT_WRITE_RECOVERY"
  , "message":"{Redundant Write} To satisfy a write request, the Windows NT fault-tolerant file system successfully wrote a redundant copy of the information. This was done because the file system encountered a failure on a member of the fault-tolerant volume but was unable to reassign the failing area of the device."
  }
, "0x4000000C":{
    "code":"STATUS_SERIAL_COUNTER_TIMEOUT"
  , "message":"{Serial IOCTL Timeout} A serial I/O operation completed because the time-out period expired. (The IOCTL_SERIAL_XOFF_COUNTER had not reached zero.)"
  }
, "0x4000000D":{
    "code":"STATUS_NULL_LM_PASSWORD"
  , "message":"{Password Too Complex} The Windows password is too complex to be converted to a LAN Manager password. The LAN Manager password that returned is a NULL string."
  }
, "0x4000000E":{
    "code":"STATUS_IMAGE_MACHINE_TYPE_MISMATCH"
  , "message":"{Machine Type Mismatch} The image file %hs is valid but is for a machine type other than the current machine. Select OK to continue, or CANCEL to fail the DLL load."
  }
, "0x4000000F":{
    "code":"STATUS_RECEIVE_PARTIAL"
  , "message":"{Partial Data Received} The network transport returned partial data to its client. The remaining data will be sent later."
  }
, "0x40000010":{
    "code":"STATUS_RECEIVE_EXPEDITED"
  , "message":"{Expedited Data Received} The network transport returned data to its client that was marked as expedited by the remote system."
  }
, "0x40000011":{
    "code":"STATUS_RECEIVE_PARTIAL_EXPEDITED"
  , "message":"{Partial Expedited Data Received} The network transport returned partial data to its client and this data was marked as expedited by the remote system. The remaining data will be sent later."
  }
, "0x40000012":{
    "code":"STATUS_EVENT_DONE"
  , "message":"{TDI Event Done} The TDI indication has completed successfully."
  }
, "0x40000013":{
    "code":"STATUS_EVENT_PENDING"
  , "message":"{TDI Event Pending} The TDI indication has entered the pending state."
  }
, "0x40000014":{
    "code":"STATUS_CHECKING_FILE_SYSTEM"
  , "message":"Checking file system on %wZ."
  }
, "0x40000015":{
    "code":"STATUS_FATAL_APP_EXIT"
  , "message":"{Fatal Application Exit} %hs"
  }
, "0x40000016":{
    "code":"STATUS_PREDEFINED_HANDLE"
  , "message":"The specified registry key is referenced by a predefined handle."
  }
, "0x40000017":{
    "code":"STATUS_WAS_UNLOCKED"
  , "message":"{Page Unlocked} The page protection of a locked page was changed to \'No Access\' and the page was unlocked from memory and from the process."
  }
, "0x40000018":{
    "code":"STATUS_SERVICE_NOTIFICATION"
  , "message":"%hs"
  }
, "0x40000019":{
    "code":"STATUS_WAS_LOCKED"
  , "message":"{Page Locked} One of the pages to lock was already locked."
  }
, "0x4000001A":{
    "code":"STATUS_LOG_HARD_ERROR"
  , "message":"Application popup: %1 : %2"
  }
, "0x4000001B":{
    "code":"STATUS_ALREADY_WIN32"
  , "message":"A Win32 process already exists."
  }
, "0x4000001C":{
    "code":"STATUS_WX86_UNSIMULATE"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x4000001D":{
    "code":"STATUS_WX86_CONTINUE"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x4000001E":{
    "code":"STATUS_WX86_SINGLE_STEP"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x4000001F":{
    "code":"STATUS_WX86_BREAKPOINT"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x40000020":{
    "code":"STATUS_WX86_EXCEPTION_CONTINUE"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x40000021":{
    "code":"STATUS_WX86_EXCEPTION_LASTCHANCE"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x40000022":{
    "code":"STATUS_WX86_EXCEPTION_CHAIN"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x40000023":{
    "code":"STATUS_IMAGE_MACHINE_TYPE_MISMATCH_EXE"
  , "message":"{Machine Type Mismatch} The image file %hs is valid but is for a machine type other than the current machine."
  }
, "0x40000024":{
    "code":"STATUS_NO_YIELD_PERFORMED"
  , "message":"A yield execution was performed and no thread was available to run."
  }
, "0x40000025":{
    "code":"STATUS_TIMER_RESUME_IGNORED"
  , "message":"The resume flag to a timer API was ignored."
  }
, "0x40000026":{
    "code":"STATUS_ARBITRATION_UNHANDLED"
  , "message":"The arbiter has deferred arbitration of these resources to its parent."
  }
, "0x40000027":{
    "code":"STATUS_CARDBUS_NOT_SUPPORTED"
  , "message":"The device has detected a CardBus card in its slot."
  }
, "0x40000028":{
    "code":"STATUS_WX86_CREATEWX86TIB"
  , "message":"An exception status code that is used by the Win32 x86 emulation subsystem."
  }
, "0x40000029":{
    "code":"STATUS_MP_PROCESSOR_MISMATCH"
  , "message":"The CPUs in this multiprocessor system are not all the same revision level. To use all processors, the operating system restricts itself to the features of the least capable processor in the system. If problems occur with this system, contact the CPU manufacturer to see if this mix of processors is supported."
  }
, "0x4000002A":{
    "code":"STATUS_HIBERNATED"
  , "message":"The system was put into hibernation."
  }
, "0x4000002B":{
    "code":"STATUS_RESUME_HIBERNATION"
  , "message":"The system was resumed from hibernation."
  }
, "0x4000002C":{
    "code":"STATUS_FIRMWARE_UPDATED"
  , "message":"Windows has detected that the system firmware (BIOS) was updated [previous firmware date = %2, current firmware date %3]."
  }
, "0x4000002D":{
    "code":"STATUS_DRIVERS_LEAKING_LOCKED_PAGES"
  , "message":"A device driver is leaking locked I/O pages and is causing system degradation. The system has automatically enabled the tracking code to try and catch the culprit."
  }
, "0x4000002E":{
    "code":"STATUS_MESSAGE_RETRIEVED"
  , "message":"The ALPC message being canceled has already been retrieved from the queue on the other side."
  }
, "0x4000002F":{
    "code":"STATUS_SYSTEM_POWERSTATE_TRANSITION"
  , "message":"The system power state is transitioning from %2 to %3."
  }
, "0x40000030":{
    "code":"STATUS_ALPC_CHECK_COMPLETION_LIST"
  , "message":"The receive operation was successful. Check the ALPC completion list for the received message."
  }
, "0x40000031":{
    "code":"STATUS_SYSTEM_POWERSTATE_COMPLEX_TRANSITION"
  , "message":"The system power state is transitioning from %2 to %3 but could enter %4."
  }
, "0x40000032":{
    "code":"STATUS_ACCESS_AUDIT_BY_POLICY"
  , "message":"Access to %1 is monitored by policy rule %2."
  }
, "0x40000033":{
    "code":"STATUS_ABANDON_HIBERFILE"
  , "message":"A valid hibernation file has been invalidated and should be abandoned."
  }
, "0x40000034":{
    "code":"STATUS_BIZRULES_NOT_ENABLED"
  , "message":"Business rule scripts are disabled for the calling application."
  }
, "0x40000294":{
    "code":"STATUS_WAKE_SYSTEM"
  , "message":"The system has awoken."
  }
, "0x40000370":{
    "code":"STATUS_DS_SHUTTING_DOWN"
  , "message":"The directory service is shutting down."
  }
, "0x40010001":{
    "code":"DBG_REPLY_LATER"
  , "message":"Debugger will reply later."
  }
, "0x40010002":{
    "code":"DBG_UNABLE_TO_PROVIDE_HANDLE"
  , "message":"Debugger cannot provide a handle."
  }
, "0x40010003":{
    "code":"DBG_TERMINATE_THREAD"
  , "message":"Debugger terminated the thread."
  }
, "0x40010004":{
    "code":"DBG_TERMINATE_PROCESS"
  , "message":"Debugger terminated the process."
  }
, "0x40010005":{
    "code":"DBG_CONTROL_C"
  , "message":"Debugger obtained control of C."
  }
, "0x40010006":{
    "code":"DBG_PRINTEXCEPTION_C"
  , "message":"Debugger printed an exception on control C."
  }
, "0x40010007":{
    "code":"DBG_RIPEXCEPTION"
  , "message":"Debugger received a RIP exception."
  }
, "0x40010008":{
    "code":"DBG_CONTROL_BREAK"
  , "message":"Debugger received a control break."
  }
, "0x40010009":{
    "code":"DBG_COMMAND_EXCEPTION"
  , "message":"Debugger command communication exception."
  }
, "0x40020056":{
    "code":"RPC_NT_UUID_LOCAL_ONLY"
  , "message":"A UUID that is valid only on this computer has been allocated."
  }
, "0x400200AF":{
    "code":"RPC_NT_SEND_INCOMPLETE"
  , "message":"Some data remains to be sent in the request buffer."
  }
, "0x400A0004":{
    "code":"STATUS_CTX_CDM_CONNECT"
  , "message":"The Client Drive Mapping Service has connected on Terminal Connection."
  }
, "0x400A0005":{
    "code":"STATUS_CTX_CDM_DISCONNECT"
  , "message":"The Client Drive Mapping Service has disconnected on Terminal Connection."
  }
, "0x4015000D":{
    "code":"STATUS_SXS_RELEASE_ACTIVATION_CONTEXT"
  , "message":"A kernel mode component is releasing a reference on an activation context."
  }
, "0x40190034":{
    "code":"STATUS_RECOVERY_NOT_NEEDED"
  , "message":"The transactional resource manager is already consistent. Recovery is not needed."
  }
, "0x40190035":{
    "code":"STATUS_RM_ALREADY_STARTED"
  , "message":"The transactional resource manager has already been started."
  }
, "0x401A000C":{
    "code":"STATUS_LOG_NO_RESTART"
  , "message":"The log service encountered a log stream with no restart area."
  }
, "0x401B00EC":{
    "code":"STATUS_VIDEO_DRIVER_DEBUG_REPORT_REQUEST"
  , "message":"{Display Driver Recovered From Failure} The %hs display driver has detected a failure and recovered from it. Some graphical operations may have failed. The next time you restart the machine, a dialog box appears, giving you an opportunity to upload data about this failure to Microsoft."
  }
, "0x401E000A":{
    "code":"STATUS_GRAPHICS_PARTIAL_DATA_POPULATED"
  , "message":"The specified buffer is not big enough to contain the entire requested dataset. Partial data is populated up to the size of the buffer.\nThe caller needs to provide a buffer of the size as specified in the partially populated buffer\'s content (interface specific)."
  }
, "0x401E0117":{
    "code":"STATUS_GRAPHICS_DRIVER_MISMATCH"
  , "message":"The kernel driver detected a version mismatch between it and the user mode driver."
  }
, "0x401E0307":{
    "code":"STATUS_GRAPHICS_MODE_NOT_PINNED"
  , "message":"No mode is pinned on the specified VidPN source/target."
  }
, "0x401E031E":{
    "code":"STATUS_GRAPHICS_NO_PREFERRED_MODE"
  , "message":"The specified mode set does not specify a preference for one of its modes."
  }
, "0x401E034B":{
    "code":"STATUS_GRAPHICS_DATASET_IS_EMPTY"
  , "message":"The specified dataset (for example, mode set, frequency range set, descriptor set, or topology) is empty."
  }
, "0x401E034C":{
    "code":"STATUS_GRAPHICS_NO_MORE_ELEMENTS_IN_DATASET"
  , "message":"The specified dataset (for example, mode set, frequency range set, descriptor set, or topology) does not contain any more elements."
  }
, "0x401E0351":{
    "code":"STATUS_GRAPHICS_PATH_CONTENT_GEOMETRY_TRANSFORMATION_NOT_PINNED"
  , "message":"The specified content transformation is not pinned on the specified VidPN present path."
  }
, "0x401E042F":{
    "code":"STATUS_GRAPHICS_UNKNOWN_CHILD_STATUS"
  , "message":"The child device presence was not reliably detected."
  }
, "0x401E0437":{
    "code":"STATUS_GRAPHICS_LEADLINK_START_DEFERRED"
  , "message":"Starting the lead adapter in a linked configuration has been temporarily deferred."
  }
, "0x401E0439":{
    "code":"STATUS_GRAPHICS_POLLING_TOO_FREQUENTLY"
  , "message":"The display adapter is being polled for children too frequently at the same polling level."
  }
, "0x401E043A":{
    "code":"STATUS_GRAPHICS_START_DEFERRED"
  , "message":"Starting the adapter has been temporarily deferred."
  }
, "0x40230001":{
    "code":"STATUS_NDIS_INDICATION_REQUIRED"
  , "message":"The request will be completed later by an NDIS status indication."
  }
, "0x80000001":{
    "code":"STATUS_GUARD_PAGE_VIOLATION"
  , "message":"{EXCEPTION} Guard Page Exception A page of memory that marks the end of a data structure, such as a stack or an array, has been accessed."
  }
, "0x80000002":{
    "code":"STATUS_DATATYPE_MISALIGNMENT"
  , "message":"{EXCEPTION} Alignment Fault A data type misalignment was detected in a load or store instruction."
  }
, "0x80000003":{
    "code":"STATUS_BREAKPOINT"
  , "message":"{EXCEPTION} Breakpoint A breakpoint has been reached."
  }
, "0x80000004":{
    "code":"STATUS_SINGLE_STEP"
  , "message":"{EXCEPTION} Single Step A single step or trace operation has just been completed."
  }
, "0x80000005":{
    "code":"STATUS_BUFFER_OVERFLOW"
  , "message":"{Buffer Overflow} The data was too large to fit into the specified buffer."
  }
, "0x80000006":{
    "code":"STATUS_NO_MORE_FILES"
  , "message":"{No More Files} No more files were found which match the file specification."
  }
, "0x80000007":{
    "code":"STATUS_WAKE_SYSTEM_DEBUGGER"
  , "message":"{Kernel Debugger Awakened} The system debugger was awakened by an interrupt."
  }
, "0x8000000A":{
    "code":"STATUS_HANDLES_CLOSED"
  , "message":"{Handles Closed} Handles to objects have been automatically closed because of the requested operation."
  }
, "0x8000000B":{
    "code":"STATUS_NO_INHERITANCE"
  , "message":"{Non-Inheritable ACL} An access control list (ACL) contains no components that can be inherited."
  }
, "0x8000000C":{
    "code":"STATUS_GUID_SUBSTITUTION_MADE"
  , "message":"{GUID Substitution} During the translation of a globally unique identifier (GUID) to a Windows security ID (SID), no administratively defined GUID prefix was found. A substitute prefix was used, which will not compromise system security. However, this may provide a more restrictive access than intended."
  }
, "0x8000000D":{
    "code":"STATUS_PARTIAL_COPY"
  , "message":"Because of protection conflicts, not all the requested bytes could be copied."
  }
, "0x8000000E":{
    "code":"STATUS_DEVICE_PAPER_EMPTY"
  , "message":"{Out of Paper} The printer is out of paper."
  }
, "0x8000000F":{
    "code":"STATUS_DEVICE_POWERED_OFF"
  , "message":"{Device Power Is Off} The printer power has been turned off."
  }
, "0x80000010":{
    "code":"STATUS_DEVICE_OFF_LINE"
  , "message":"{Device Offline} The printer has been taken offline."
  }
, "0x80000011":{
    "code":"STATUS_DEVICE_BUSY"
  , "message":"{Device Busy} The device is currently busy."
  }
, "0x80000012":{
    "code":"STATUS_NO_MORE_EAS"
  , "message":"{No More EAs} No more extended attributes (EAs) were found for the file."
  }
, "0x80000013":{
    "code":"STATUS_INVALID_EA_NAME"
  , "message":"{Illegal EA} The specified extended attribute (EA) name contains at least one illegal character."
  }
, "0x80000014":{
    "code":"STATUS_EA_LIST_INCONSISTENT"
  , "message":"{Inconsistent EA List} The extended attribute (EA) list is inconsistent."
  }
, "0x80000015":{
    "code":"STATUS_INVALID_EA_FLAG"
  , "message":"{Invalid EA Flag} An invalid extended attribute (EA) flag was set."
  }
, "0x80000016":{
    "code":"STATUS_VERIFY_REQUIRED"
  , "message":"{Verifying Disk} The media has changed and a verify operation is in progress; therefore, no reads or writes may be performed to the device, except those that are used in the verify operation."
  }
, "0x80000017":{
    "code":"STATUS_EXTRANEOUS_INFORMATION"
  , "message":"{Too Much Information} The specified access control list (ACL) contained more information than was expected."
  }
, "0x80000018":{
    "code":"STATUS_RXACT_COMMIT_NECESSARY"
  , "message":"This warning level status indicates that the transaction state already exists for the registry subtree, but that a transaction commit was previously aborted. The commit has NOT been completed but has not been rolled back either; therefore, it may still be committed, if needed."
  }
, "0x8000001A":{
    "code":"STATUS_NO_MORE_ENTRIES"
  , "message":"{No More Entries} No more entries are available from an enumeration operation."
  }
, "0x8000001B":{
    "code":"STATUS_FILEMARK_DETECTED"
  , "message":"{Filemark Found} A filemark was detected."
  }
, "0x8000001C":{
    "code":"STATUS_MEDIA_CHANGED"
  , "message":"{Media Changed} The media may have changed."
  }
, "0x8000001D":{
    "code":"STATUS_BUS_RESET"
  , "message":"{I/O Bus Reset} An I/O bus reset was detected."
  }
, "0x8000001E":{
    "code":"STATUS_END_OF_MEDIA"
  , "message":"{End of Media} The end of the media was encountered."
  }
, "0x8000001F":{
    "code":"STATUS_BEGINNING_OF_MEDIA"
  , "message":"The beginning of a tape or partition has been detected."
  }
, "0x80000020":{
    "code":"STATUS_MEDIA_CHECK"
  , "message":"{Media Changed} The media may have changed."
  }
, "0x80000021":{
    "code":"STATUS_SETMARK_DETECTED"
  , "message":"A tape access reached a set mark."
  }
, "0x80000022":{
    "code":"STATUS_NO_DATA_DETECTED"
  , "message":"During a tape access, the end of the data written is reached."
  }
, "0x80000023":{
    "code":"STATUS_REDIRECTOR_HAS_OPEN_HANDLES"
  , "message":"The redirector is in use and cannot be unloaded."
  }
, "0x80000024":{
    "code":"STATUS_SERVER_HAS_OPEN_HANDLES"
  , "message":"The server is in use and cannot be unloaded."
  }
, "0x80000025":{
    "code":"STATUS_ALREADY_DISCONNECTED"
  , "message":"The specified connection has already been disconnected."
  }
, "0x80000026":{
    "code":"STATUS_LONGJUMP"
  , "message":"A long jump has been executed."
  }
, "0x80000027":{
    "code":"STATUS_CLEANER_CARTRIDGE_INSTALLED"
  , "message":"A cleaner cartridge is present in the tape library."
  }
, "0x80000028":{
    "code":"STATUS_PLUGPLAY_QUERY_VETOED"
  , "message":"The Plug and Play query operation was not successful."
  }
, "0x80000029":{
    "code":"STATUS_UNWIND_CONSOLIDATE"
  , "message":"A frame consolidation has been executed."
  }
, "0x8000002A":{
    "code":"STATUS_REGISTRY_HIVE_RECOVERED"
  , "message":"{Registry Hive Recovered} The registry hive (file): %hs was corrupted and it has been recovered. Some data might have been lost."
  }
, "0x8000002B":{
    "code":"STATUS_DLL_MIGHT_BE_INSECURE"
  , "message":"The application is attempting to run executable code from the module %hs. This may be insecure. An alternative, %hs, is available. Should the application use the secure module %hs?"
  }
, "0x8000002C":{
    "code":"STATUS_DLL_MIGHT_BE_INCOMPATIBLE"
  , "message":"The application is loading executable code from the module %hs. This is secure but may be incompatible with previous releases of the operating system. An alternative, %hs, is available. Should the application use the secure module %hs?"
  }
, "0x8000002D":{
    "code":"STATUS_STOPPED_ON_SYMLINK"
  , "message":"The create operation stopped after reaching a symbolic link."
  }
, "0x80000288":{
    "code":"STATUS_DEVICE_REQUIRES_CLEANING"
  , "message":"The device has indicated that cleaning is necessary."
  }
, "0x80000289":{
    "code":"STATUS_DEVICE_DOOR_OPEN"
  , "message":"The device has indicated that its door is open. Further operations require it closed and secured."
  }
, "0x80000803":{
    "code":"STATUS_DATA_LOST_REPAIR"
  , "message":"Windows discovered a corruption in the file %hs. This file has now been repaired. Check if any data in the file was lost because of the corruption."
  }
, "0x80010001":{
    "code":"DBG_EXCEPTION_NOT_HANDLED"
  , "message":"Debugger did not handle the exception."
  }
, "0x80130001":{
    "code":"STATUS_CLUSTER_NODE_ALREADY_UP"
  , "message":"The cluster node is already up."
  }
, "0x80130002":{
    "code":"STATUS_CLUSTER_NODE_ALREADY_DOWN"
  , "message":"The cluster node is already down."
  }
, "0x80130003":{
    "code":"STATUS_CLUSTER_NETWORK_ALREADY_ONLINE"
  , "message":"The cluster network is already online."
  }
, "0x80130004":{
    "code":"STATUS_CLUSTER_NETWORK_ALREADY_OFFLINE"
  , "message":"The cluster network is already offline."
  }
, "0x80130005":{
    "code":"STATUS_CLUSTER_NODE_ALREADY_MEMBER"
  , "message":"The cluster node is already a member of the cluster."
  }
, "0x80190009":{
    "code":"STATUS_COULD_NOT_RESIZE_LOG"
  , "message":"The log could not be set to the requested size."
  }
, "0x80190029":{
    "code":"STATUS_NO_TXF_METADATA"
  , "message":"There is no transaction metadata on the file."
  }
, "0x80190031":{
    "code":"STATUS_CANT_RECOVER_WITH_HANDLE_OPEN"
  , "message":"The file cannot be recovered because there is a handle still open on it."
  }
, "0x80190041":{
    "code":"STATUS_TXF_METADATA_ALREADY_PRESENT"
  , "message":"Transaction metadata is already present on this file and cannot be superseded."
  }
, "0x80190042":{
    "code":"STATUS_TRANSACTION_SCOPE_CALLBACKS_NOT_SET"
  , "message":"A transaction scope could not be entered because the scope handler has not been initialized."
  }
, "0x801B00EB":{
    "code":"STATUS_VIDEO_HUNG_DISPLAY_DRIVER_THREAD_RECOVERED"
  , "message":"{Display Driver Stopped Responding and recovered} The %hs display driver has stopped working normally. The recovery had been performed."
  }
, "0x801C0001":{
    "code":"STATUS_FLT_BUFFER_TOO_SMALL"
  , "message":"{Buffer too small} The buffer is too small to contain the entry. No information has been written to the buffer."
  }
, "0x80210001":{
    "code":"STATUS_FVE_PARTIAL_METADATA"
  , "message":"Volume metadata read or write is incomplete."
  }
, "0x80210002":{
    "code":"STATUS_FVE_TRANSIENT_STATE"
  , "message":"BitLocker encryption keys were ignored because the volume was in a transient state."
  }
, "0xC0000001":{
    "code":"STATUS_UNSUCCESSFUL"
  , "message":"{Operation Failed} The requested operation was unsuccessful."
  }
, "0xC0000002":{
    "code":"STATUS_NOT_IMPLEMENTED"
  , "message":"{Not Implemented} The requested operation is not implemented."
  }
, "0xC0000003":{
    "code":"STATUS_INVALID_INFO_CLASS"
  , "message":"{Invalid Parameter} The specified information class is not a valid information class for the specified object."
  }
, "0xC0000004":{
    "code":"STATUS_INFO_LENGTH_MISMATCH"
  , "message":"The specified information record length does not match the length that is required for the specified information class."
  }
, "0xC0000005":{
    "code":"STATUS_ACCESS_VIOLATION"
  , "message":"The instruction at 0x%08lx referenced memory at 0x%08lx. The memory could not be %s."
  }
, "0xC0000006":{
    "code":"STATUS_IN_PAGE_ERROR"
  , "message":"The instruction at 0x%08lx referenced memory at 0x%08lx. The required data was not placed into memory because of an I/O error status of 0x%08lx."
  }
, "0xC0000007":{
    "code":"STATUS_PAGEFILE_QUOTA"
  , "message":"The page file quota for the process has been exhausted."
  }
, "0xC0000008":{
    "code":"STATUS_INVALID_HANDLE"
  , "message":"An invalid HANDLE was specified."
  }
, "0xC0000009":{
    "code":"STATUS_BAD_INITIAL_STACK"
  , "message":"An invalid initial stack was specified in a call to NtCreateThread."
  }
, "0xC000000A":{
    "code":"STATUS_BAD_INITIAL_PC"
  , "message":"An invalid initial start address was specified in a call to NtCreateThread."
  }
, "0xC000000B":{
    "code":"STATUS_INVALID_CID"
  , "message":"An invalid client ID was specified."
  }
, "0xC000000C":{
    "code":"STATUS_TIMER_NOT_CANCELED"
  , "message":"An attempt was made to cancel or set a timer that has an associated APC and the specified thread is not the thread that originally set the timer with an associated APC routine."
  }
, "0xC000000D":{
    "code":"STATUS_INVALID_PARAMETER"
  , "message":"An invalid parameter was passed to a service or function."
  }
, "0xC000000E":{
    "code":"STATUS_NO_SUCH_DEVICE"
  , "message":"A device that does not exist was specified."
  }
, "0xC000000F":{
    "code":"STATUS_NO_SUCH_FILE"
  , "message":"{File Not Found} The file %hs does not exist."
  }
, "0xC0000010":{
    "code":"STATUS_INVALID_DEVICE_REQUEST"
  , "message":"The specified request is not a valid operation for the target device."
  }
, "0xC0000011":{
    "code":"STATUS_END_OF_FILE"
  , "message":"The end-of-file marker has been reached. There is no valid data in the file beyond this marker."
  }
, "0xC0000012":{
    "code":"STATUS_WRONG_VOLUME"
  , "message":"{Wrong Volume} The wrong volume is in the drive. Insert volume %hs into drive %hs."
  }
, "0xC0000013":{
    "code":"STATUS_NO_MEDIA_IN_DEVICE"
  , "message":"{No Disk} There is no disk in the drive. Insert a disk into drive %hs."
  }
, "0xC0000014":{
    "code":"STATUS_UNRECOGNIZED_MEDIA"
  , "message":"{Unknown Disk Format} The disk in drive %hs is not formatted properly. Check the disk, and reformat it, if needed."
  }
, "0xC0000015":{
    "code":"STATUS_NONEXISTENT_SECTOR"
  , "message":"{Sector Not Found} The specified sector does not exist."
  }
, "0xC0000016":{
    "code":"STATUS_MORE_PROCESSING_REQUIRED"
  , "message":"{Still Busy} The specified I/O request packet (IRP) cannot be disposed of because the I/O operation is not complete."
  }
, "0xC0000017":{
    "code":"STATUS_NO_MEMORY"
  , "message":"{Not Enough Quota} Not enough virtual memory or paging file quota is available to complete the specified operation."
  }
, "0xC0000018":{
    "code":"STATUS_CONFLICTING_ADDRESSES"
  , "message":"{Conflicting Address Range} The specified address range conflicts with the address space."
  }
, "0xC0000019":{
    "code":"STATUS_NOT_MAPPED_VIEW"
  , "message":"The address range to unmap is not a mapped view."
  }
, "0xC000001A":{
    "code":"STATUS_UNABLE_TO_FREE_VM"
  , "message":"The virtual memory cannot be freed."
  }
, "0xC000001B":{
    "code":"STATUS_UNABLE_TO_DELETE_SECTION"
  , "message":"The specified section cannot be deleted."
  }
, "0xC000001C":{
    "code":"STATUS_INVALID_SYSTEM_SERVICE"
  , "message":"An invalid system service was specified in a system service call."
  }
, "0xC000001D":{
    "code":"STATUS_ILLEGAL_INSTRUCTION"
  , "message":"{EXCEPTION} Illegal Instruction An attempt was made to execute an illegal instruction."
  }
, "0xC000001E":{
    "code":"STATUS_INVALID_LOCK_SEQUENCE"
  , "message":"{Invalid Lock Sequence} An attempt was made to execute an invalid lock sequence."
  }
, "0xC000001F":{
    "code":"STATUS_INVALID_VIEW_SIZE"
  , "message":"{Invalid Mapping} An attempt was made to create a view for a section that is bigger than the section."
  }
, "0xC0000020":{
    "code":"STATUS_INVALID_FILE_FOR_SECTION"
  , "message":"{Bad File} The attributes of the specified mapping file for a section of memory cannot be read."
  }
, "0xC0000021":{
    "code":"STATUS_ALREADY_COMMITTED"
  , "message":"{Already Committed} The specified address range is already committed."
  }
, "0xC0000022":{
    "code":"STATUS_ACCESS_DENIED"
  , "message":"{Access Denied} A process has requested access to an object but has not been granted those access rights."
  }
, "0xC0000023":{
    "code":"STATUS_BUFFER_TOO_SMALL"
  , "message":"{Buffer Too Small} The buffer is too small to contain the entry. No information has been written to the buffer."
  }
, "0xC0000024":{
    "code":"STATUS_OBJECT_TYPE_MISMATCH"
  , "message":"{Wrong Type} There is a mismatch between the type of object that is required by the requested operation and the type of object that is specified in the request."
  }
, "0xC0000025":{
    "code":"STATUS_NONCONTINUABLE_EXCEPTION"
  , "message":"{EXCEPTION} Cannot Continue Windows cannot continue from this exception."
  }
, "0xC0000026":{
    "code":"STATUS_INVALID_DISPOSITION"
  , "message":"An invalid exception disposition was returned by an exception handler."
  }
, "0xC0000027":{
    "code":"STATUS_UNWIND"
  , "message":"Unwind exception code."
  }
, "0xC0000028":{
    "code":"STATUS_BAD_STACK"
  , "message":"An invalid or unaligned stack was encountered during an unwind operation."
  }
, "0xC0000029":{
    "code":"STATUS_INVALID_UNWIND_TARGET"
  , "message":"An invalid unwind target was encountered during an unwind operation."
  }
, "0xC000002A":{
    "code":"STATUS_NOT_LOCKED"
  , "message":"An attempt was made to unlock a page of memory that was not locked."
  }
, "0xC000002B":{
    "code":"STATUS_PARITY_ERROR"
  , "message":"A device parity error on an I/O operation."
  }
, "0xC000002C":{
    "code":"STATUS_UNABLE_TO_DECOMMIT_VM"
  , "message":"An attempt was made to decommit uncommitted virtual memory."
  }
, "0xC000002D":{
    "code":"STATUS_NOT_COMMITTED"
  , "message":"An attempt was made to change the attributes on memory that has not been committed."
  }
, "0xC000002E":{
    "code":"STATUS_INVALID_PORT_ATTRIBUTES"
  , "message":"Invalid object attributes specified to NtCreatePort or invalid port attributes specified to NtConnectPort."
  }
, "0xC000002F":{
    "code":"STATUS_PORT_MESSAGE_TOO_LONG"
  , "message":"The length of the message that was passed to NtRequestPort or NtRequestWaitReplyPort is longer than the maximum message that is allowed by the port."
  }
, "0xC0000030":{
    "code":"STATUS_INVALID_PARAMETER_MIX"
  , "message":"An invalid combination of parameters was specified."
  }
, "0xC0000031":{
    "code":"STATUS_INVALID_QUOTA_LOWER"
  , "message":"An attempt was made to lower a quota limit below the current usage."
  }
, "0xC0000032":{
    "code":"STATUS_DISK_CORRUPT_ERROR"
  , "message":"{Corrupt Disk} The file system structure on the disk is corrupt and unusable. Run the Chkdsk utility on the volume %hs."
  }
, "0xC0000033":{
    "code":"STATUS_OBJECT_NAME_INVALID"
  , "message":"The object name is invalid."
  }
, "0xC0000034":{
    "code":"STATUS_OBJECT_NAME_NOT_FOUND"
  , "message":"The object name is not found."
  }
, "0xC0000035":{
    "code":"STATUS_OBJECT_NAME_COLLISION"
  , "message":"The object name already exists."
  }
, "0xC0000037":{
    "code":"STATUS_PORT_DISCONNECTED"
  , "message":"An attempt was made to send a message to a disconnected communication port."
  }
, "0xC0000038":{
    "code":"STATUS_DEVICE_ALREADY_ATTACHED"
  , "message":"An attempt was made to attach to a device that was already attached to another device."
  }
, "0xC0000039":{
    "code":"STATUS_OBJECT_PATH_INVALID"
  , "message":"The object path component was not a directory object."
  }
, "0xC000003A":{
    "code":"STATUS_OBJECT_PATH_NOT_FOUND"
  , "message":"{Path Not Found} The path %hs does not exist."
  }
, "0xC000003B":{
    "code":"STATUS_OBJECT_PATH_SYNTAX_BAD"
  , "message":"The object path component was not a directory object."
  }
, "0xC000003C":{
    "code":"STATUS_DATA_OVERRUN"
  , "message":"{Data Overrun} A data overrun error occurred."
  }
, "0xC000003D":{
    "code":"STATUS_DATA_LATE_ERROR"
  , "message":"{Data Late} A data late error occurred."
  }
, "0xC000003E":{
    "code":"STATUS_DATA_ERROR"
  , "message":"{Data Error} An error occurred in reading or writing data."
  }
, "0xC000003F":{
    "code":"STATUS_CRC_ERROR"
  , "message":"{Bad CRC} A cyclic redundancy check (CRC) checksum error occurred."
  }
, "0xC0000040":{
    "code":"STATUS_SECTION_TOO_BIG"
  , "message":"{Section Too Large} The specified section is too big to map the file."
  }
, "0xC0000041":{
    "code":"STATUS_PORT_CONNECTION_REFUSED"
  , "message":"The NtConnectPort request is refused."
  }
, "0xC0000042":{
    "code":"STATUS_INVALID_PORT_HANDLE"
  , "message":"The type of port handle is invalid for the operation that is requested."
  }
, "0xC0000043":{
    "code":"STATUS_SHARING_VIOLATION"
  , "message":"A file cannot be opened because the share access flags are incompatible."
  }
, "0xC0000044":{
    "code":"STATUS_QUOTA_EXCEEDED"
  , "message":"Insufficient quota exists to complete the operation."
  }
, "0xC0000045":{
    "code":"STATUS_INVALID_PAGE_PROTECTION"
  , "message":"The specified page protection was not valid."
  }
, "0xC0000046":{
    "code":"STATUS_MUTANT_NOT_OWNED"
  , "message":"An attempt to release a mutant object was made by a thread that was not the owner of the mutant object."
  }
, "0xC0000047":{
    "code":"STATUS_SEMAPHORE_LIMIT_EXCEEDED"
  , "message":"An attempt was made to release a semaphore such that its maximum count would have been exceeded."
  }
, "0xC0000048":{
    "code":"STATUS_PORT_ALREADY_SET"
  , "message":"An attempt was made to set the DebugPort or ExceptionPort of a process, but a port already exists in the process, or an attempt was made to set the CompletionPort of a file but a port was already set in the file, or an attempt was made to set the associated completion port of an ALPC port but it is already set."
  }
, "0xC0000049":{
    "code":"STATUS_SECTION_NOT_IMAGE"
  , "message":"An attempt was made to query image information on a section that does not map an image."
  }
, "0xC000004A":{
    "code":"STATUS_SUSPEND_COUNT_EXCEEDED"
  , "message":"An attempt was made to suspend a thread whose suspend count was at its maximum."
  }
, "0xC000004B":{
    "code":"STATUS_THREAD_IS_TERMINATING"
  , "message":"An attempt was made to suspend a thread that has begun termination."
  }
, "0xC000004C":{
    "code":"STATUS_BAD_WORKING_SET_LIMIT"
  , "message":"An attempt was made to set the working set limit to an invalid value (for example, the minimum greater than maximum)."
  }
, "0xC000004D":{
    "code":"STATUS_INCOMPATIBLE_FILE_MAP"
  , "message":"A section was created to map a file that is not compatible with an already existing section that maps the same file."
  }
, "0xC000004E":{
    "code":"STATUS_SECTION_PROTECTION"
  , "message":"A view to a section specifies a protection that is incompatible with the protection of the initial view."
  }
, "0xC000004F":{
    "code":"STATUS_EAS_NOT_SUPPORTED"
  , "message":"An operation involving EAs failed because the file system does not support EAs."
  }
, "0xC0000050":{
    "code":"STATUS_EA_TOO_LARGE"
  , "message":"An EA operation failed because the EA set is too large."
  }
, "0xC0000051":{
    "code":"STATUS_NONEXISTENT_EA_ENTRY"
  , "message":"An EA operation failed because the name or EA index is invalid."
  }
, "0xC0000052":{
    "code":"STATUS_NO_EAS_ON_FILE"
  , "message":"The file for which EAs were requested has no EAs."
  }
, "0xC0000053":{
    "code":"STATUS_EA_CORRUPT_ERROR"
  , "message":"The EA is corrupt and cannot be read."
  }
, "0xC0000054":{
    "code":"STATUS_FILE_LOCK_CONFLICT"
  , "message":"A requested read/write cannot be granted due to a conflicting file lock."
  }
, "0xC0000055":{
    "code":"STATUS_LOCK_NOT_GRANTED"
  , "message":"A requested file lock cannot be granted due to other existing locks."
  }
, "0xC0000056":{
    "code":"STATUS_DELETE_PENDING"
  , "message":"A non-close operation has been requested of a file object that has a delete pending."
  }
, "0xC0000057":{
    "code":"STATUS_CTL_FILE_NOT_SUPPORTED"
  , "message":"An attempt was made to set the control attribute on a file. This attribute is not supported in the destination file system."
  }
, "0xC0000058":{
    "code":"STATUS_UNKNOWN_REVISION"
  , "message":"Indicates a revision number that was encountered or specified is not one that is known by the service. It may be a more recent revision than the service is aware of."
  }
, "0xC0000059":{
    "code":"STATUS_REVISION_MISMATCH"
  , "message":"Indicates that two revision levels are incompatible."
  }
, "0xC000005A":{
    "code":"STATUS_INVALID_OWNER"
  , "message":"Indicates a particular security ID may not be assigned as the owner of an object."
  }
, "0xC000005B":{
    "code":"STATUS_INVALID_PRIMARY_GROUP"
  , "message":"Indicates a particular security ID may not be assigned as the primary group of an object."
  }
, "0xC000005C":{
    "code":"STATUS_NO_IMPERSONATION_TOKEN"
  , "message":"An attempt has been made to operate on an impersonation token by a thread that is not currently impersonating a client."
  }
, "0xC000005D":{
    "code":"STATUS_CANT_DISABLE_MANDATORY"
  , "message":"A mandatory group may not be disabled."
  }
, "0xC000005E":{
    "code":"STATUS_NO_LOGON_SERVERS"
  , "message":"No logon servers are currently available to service the logon request."
  }
, "0xC000005F":{
    "code":"STATUS_NO_SUCH_LOGON_SESSION"
  , "message":"A specified logon session does not exist. It may already have been terminated."
  }
, "0xC0000060":{
    "code":"STATUS_NO_SUCH_PRIVILEGE"
  , "message":"A specified privilege does not exist."
  }
, "0xC0000061":{
    "code":"STATUS_PRIVILEGE_NOT_HELD"
  , "message":"A required privilege is not held by the client."
  }
, "0xC0000062":{
    "code":"STATUS_INVALID_ACCOUNT_NAME"
  , "message":"The name provided is not a properly formed account name."
  }
, "0xC0000063":{
    "code":"STATUS_USER_EXISTS"
  , "message":"The specified account already exists."
  }
, "0xC0000064":{
    "code":"STATUS_NO_SUCH_USER"
  , "message":"The specified account does not exist."
  }
, "0xC0000065":{
    "code":"STATUS_GROUP_EXISTS"
  , "message":"The specified group already exists."
  }
, "0xC0000066":{
    "code":"STATUS_NO_SUCH_GROUP"
  , "message":"The specified group does not exist."
  }
, "0xC0000067":{
    "code":"STATUS_MEMBER_IN_GROUP"
  , "message":"The specified user account is already in the specified group account. Also used to indicate a group cannot be deleted because it contains a member."
  }
, "0xC0000068":{
    "code":"STATUS_MEMBER_NOT_IN_GROUP"
  , "message":"The specified user account is not a member of the specified group account."
  }
, "0xC0000069":{
    "code":"STATUS_LAST_ADMIN"
  , "message":"Indicates the requested operation would disable or delete the last remaining administration account. This is not allowed to prevent creating a situation in which the system cannot be administrated."
  }
, "0xC000006A":{
    "code":"STATUS_WRONG_PASSWORD"
  , "message":"When trying to update a password, this return status indicates that the value provided as the current password is not correct."
  }
, "0xC000006B":{
    "code":"STATUS_ILL_FORMED_PASSWORD"
  , "message":"When trying to update a password, this return status indicates that the value provided for the new password contains values that are not allowed in passwords."
  }
, "0xC000006C":{
    "code":"STATUS_PASSWORD_RESTRICTION"
  , "message":"When trying to update a password, this status indicates that some password update rule has been violated. For example, the password may not meet length criteria."
  }
, "0xC000006D":{
    "code":"STATUS_LOGON_FAILURE"
  , "message":"The attempted logon is invalid. This is either due to a bad username or authentication information."
  }
, "0xC000006E":{
    "code":"STATUS_ACCOUNT_RESTRICTION"
  , "message":"Indicates a referenced user name and authentication information are valid, but some user account restriction has prevented successful authentication (such as time-of-day restrictions)."
  }
, "0xC000006F":{
    "code":"STATUS_INVALID_LOGON_HOURS"
  , "message":"The user account has time restrictions and may not be logged onto at this time."
  }
, "0xC0000070":{
    "code":"STATUS_INVALID_WORKSTATION"
  , "message":"The user account is restricted so that it may not be used to log on from the source workstation."
  }
, "0xC0000071":{
    "code":"STATUS_PASSWORD_EXPIRED"
  , "message":"The user account password has expired."
  }
, "0xC0000072":{
    "code":"STATUS_ACCOUNT_DISABLED"
  , "message":"The referenced account is currently disabled and may not be logged on to."
  }
, "0xC0000073":{
    "code":"STATUS_NONE_MAPPED"
  , "message":"None of the information to be translated has been translated."
  }
, "0xC0000074":{
    "code":"STATUS_TOO_MANY_LUIDS_REQUESTED"
  , "message":"The number of LUIDs requested may not be allocated with a single allocation."
  }
, "0xC0000075":{
    "code":"STATUS_LUIDS_EXHAUSTED"
  , "message":"Indicates there are no more LUIDs to allocate."
  }
, "0xC0000076":{
    "code":"STATUS_INVALID_SUB_AUTHORITY"
  , "message":"Indicates the sub-authority value is invalid for the particular use."
  }
, "0xC0000077":{
    "code":"STATUS_INVALID_ACL"
  , "message":"Indicates the ACL structure is not valid."
  }
, "0xC0000078":{
    "code":"STATUS_INVALID_SID"
  , "message":"Indicates the SID structure is not valid."
  }
, "0xC0000079":{
    "code":"STATUS_INVALID_SECURITY_DESCR"
  , "message":"Indicates the SECURITY_DESCRIPTOR structure is not valid."
  }
, "0xC000007A":{
    "code":"STATUS_PROCEDURE_NOT_FOUND"
  , "message":"Indicates the specified procedure address cannot be found in the DLL."
  }
, "0xC000007B":{
    "code":"STATUS_INVALID_IMAGE_FORMAT"
  , "message":"{Bad Image} %hs is either not designed to run on Windows or it contains an error. Try installing the program again using the original installation media or contact your system administrator or the software vendor for support."
  }
, "0xC000007C":{
    "code":"STATUS_NO_TOKEN"
  , "message":"An attempt was made to reference a token that does not exist. This is typically done by referencing the token that is associated with a thread when the thread is not impersonating a client."
  }
, "0xC000007D":{
    "code":"STATUS_BAD_INHERITANCE_ACL"
  , "message":"Indicates that an attempt to build either an inherited ACL or ACE was not successful. This can be caused by a number of things. One of the more probable causes is the replacement of a CreatorId with a SID that did not fit into the ACE or ACL."
  }
, "0xC000007E":{
    "code":"STATUS_RANGE_NOT_LOCKED"
  , "message":"The range specified in NtUnlockFile was not locked."
  }
, "0xC000007F":{
    "code":"STATUS_DISK_FULL"
  , "message":"An operation failed because the disk was full."
  }
, "0xC0000080":{
    "code":"STATUS_SERVER_DISABLED"
  , "message":"The GUID allocation server is disabled at the moment."
  }
, "0xC0000081":{
    "code":"STATUS_SERVER_NOT_DISABLED"
  , "message":"The GUID allocation server is enabled at the moment."
  }
, "0xC0000082":{
    "code":"STATUS_TOO_MANY_GUIDS_REQUESTED"
  , "message":"Too many GUIDs were requested from the allocation server at once."
  }
, "0xC0000083":{
    "code":"STATUS_GUIDS_EXHAUSTED"
  , "message":"The GUIDs could not be allocated because the Authority Agent was exhausted."
  }
, "0xC0000084":{
    "code":"STATUS_INVALID_ID_AUTHORITY"
  , "message":"The value provided was an invalid value for an identifier authority."
  }
, "0xC0000085":{
    "code":"STATUS_AGENTS_EXHAUSTED"
  , "message":"No more authority agent values are available for the particular identifier authority value."
  }
, "0xC0000086":{
    "code":"STATUS_INVALID_VOLUME_LABEL"
  , "message":"An invalid volume label has been specified."
  }
, "0xC0000087":{
    "code":"STATUS_SECTION_NOT_EXTENDED"
  , "message":"A mapped section could not be extended."
  }
, "0xC0000088":{
    "code":"STATUS_NOT_MAPPED_DATA"
  , "message":"Specified section to flush does not map a data file."
  }
, "0xC0000089":{
    "code":"STATUS_RESOURCE_DATA_NOT_FOUND"
  , "message":"Indicates the specified image file did not contain a resource section."
  }
, "0xC000008A":{
    "code":"STATUS_RESOURCE_TYPE_NOT_FOUND"
  , "message":"Indicates the specified resource type cannot be found in the image file."
  }
, "0xC000008B":{
    "code":"STATUS_RESOURCE_NAME_NOT_FOUND"
  , "message":"Indicates the specified resource name cannot be found in the image file."
  }
, "0xC000008C":{
    "code":"STATUS_ARRAY_BOUNDS_EXCEEDED"
  , "message":"{EXCEPTION} Array bounds exceeded."
  }
, "0xC000008D":{
    "code":"STATUS_FLOAT_DENORMAL_OPERAND"
  , "message":"{EXCEPTION} Floating-point denormal operand."
  }
, "0xC000008E":{
    "code":"STATUS_FLOAT_DIVIDE_BY_ZERO"
  , "message":"{EXCEPTION} Floating-point division by zero."
  }
, "0xC000008F":{
    "code":"STATUS_FLOAT_INEXACT_RESULT"
  , "message":"{EXCEPTION} Floating-point inexact result."
  }
, "0xC0000090":{
    "code":"STATUS_FLOAT_INVALID_OPERATION"
  , "message":"{EXCEPTION} Floating-point invalid operation."
  }
, "0xC0000091":{
    "code":"STATUS_FLOAT_OVERFLOW"
  , "message":"{EXCEPTION} Floating-point overflow."
  }
, "0xC0000092":{
    "code":"STATUS_FLOAT_STACK_CHECK"
  , "message":"{EXCEPTION} Floating-point stack check."
  }
, "0xC0000093":{
    "code":"STATUS_FLOAT_UNDERFLOW"
  , "message":"{EXCEPTION} Floating-point underflow."
  }
, "0xC0000094":{
    "code":"STATUS_INTEGER_DIVIDE_BY_ZERO"
  , "message":"{EXCEPTION} Integer division by zero."
  }
, "0xC0000095":{
    "code":"STATUS_INTEGER_OVERFLOW"
  , "message":"{EXCEPTION} Integer overflow."
  }
, "0xC0000096":{
    "code":"STATUS_PRIVILEGED_INSTRUCTION"
  , "message":"{EXCEPTION} Privileged instruction."
  }
, "0xC0000097":{
    "code":"STATUS_TOO_MANY_PAGING_FILES"
  , "message":"An attempt was made to install more paging files than the system supports."
  }
, "0xC0000098":{
    "code":"STATUS_FILE_INVALID"
  , "message":"The volume for a file has been externally altered such that the opened file is no longer valid."
  }
, "0xC0000099":{
    "code":"STATUS_ALLOTTED_SPACE_EXCEEDED"
  , "message":"When a block of memory is allotted for future updates, such as the memory allocated to hold discretionary access control and primary group information, successive updates may exceed the amount of memory originally allotted. Because a quota may already have been charged to several processes that have handles to the object, it is not reasonable to alter the size of the allocated memory. Instead, a request that requires more memory than has been allotted must fail and the STATUS_ALLOTTED_SPACE_EXCEEDED error returned."
  }
, "0xC000009A":{
    "code":"STATUS_INSUFFICIENT_RESOURCES"
  , "message":"Insufficient system resources exist to complete the API."
  }
, "0xC000009B":{
    "code":"STATUS_DFS_EXIT_PATH_FOUND"
  , "message":"An attempt has been made to open a DFS exit path control file."
  }
, "0xC000009C":{
    "code":"STATUS_DEVICE_DATA_ERROR"
  , "message":"There are bad blocks (sectors) on the hard disk."
  }
, "0xC000009D":{
    "code":"STATUS_DEVICE_NOT_CONNECTED"
  , "message":"There is bad cabling, non-termination, or the controller is not able to obtain access to the hard disk."
  }
, "0xC000009F":{
    "code":"STATUS_FREE_VM_NOT_AT_BASE"
  , "message":"Virtual memory cannot be freed because the base address is not the base of the region and a region size of zero was specified."
  }
, "0xC00000A0":{
    "code":"STATUS_MEMORY_NOT_ALLOCATED"
  , "message":"An attempt was made to free virtual memory that is not allocated."
  }
, "0xC00000A1":{
    "code":"STATUS_WORKING_SET_QUOTA"
  , "message":"The working set is not big enough to allow the requested pages to be locked."
  }
, "0xC00000A2":{
    "code":"STATUS_MEDIA_WRITE_PROTECTED"
  , "message":"{Write Protect Error} The disk cannot be written to because it is write-protected. Remove the write protection from the volume %hs in drive %hs."
  }
, "0xC00000A3":{
    "code":"STATUS_DEVICE_NOT_READY"
  , "message":"{Drive Not Ready} The drive is not ready for use; its door may be open. Check drive %hs and make sure that a disk is inserted and that the drive door is closed."
  }
, "0xC00000A4":{
    "code":"STATUS_INVALID_GROUP_ATTRIBUTES"
  , "message":"The specified attributes are invalid or are incompatible with the attributes for the group as a whole."
  }
, "0xC00000A5":{
    "code":"STATUS_BAD_IMPERSONATION_LEVEL"
  , "message":"A specified impersonation level is invalid. Also used to indicate that a required impersonation level was not provided."
  }
, "0xC00000A6":{
    "code":"STATUS_CANT_OPEN_ANONYMOUS"
  , "message":"An attempt was made to open an anonymous-level token. Anonymous tokens may not be opened."
  }
, "0xC00000A7":{
    "code":"STATUS_BAD_VALIDATION_CLASS"
  , "message":"The validation information class requested was invalid."
  }
, "0xC00000A8":{
    "code":"STATUS_BAD_TOKEN_TYPE"
  , "message":"The type of a token object is inappropriate for its attempted use."
  }
, "0xC00000A9":{
    "code":"STATUS_BAD_MASTER_BOOT_RECORD"
  , "message":"The type of a token object is inappropriate for its attempted use."
  }
, "0xC00000AA":{
    "code":"STATUS_INSTRUCTION_MISALIGNMENT"
  , "message":"An attempt was made to execute an instruction at an unaligned address and the host system does not support unaligned instruction references."
  }
, "0xC00000AB":{
    "code":"STATUS_INSTANCE_NOT_AVAILABLE"
  , "message":"The maximum named pipe instance count has been reached."
  }
, "0xC00000AC":{
    "code":"STATUS_PIPE_NOT_AVAILABLE"
  , "message":"An instance of a named pipe cannot be found in the listening state."
  }
, "0xC00000AD":{
    "code":"STATUS_INVALID_PIPE_STATE"
  , "message":"The named pipe is not in the connected or closing state."
  }
, "0xC00000AE":{
    "code":"STATUS_PIPE_BUSY"
  , "message":"The specified pipe is set to complete operations and there are current I/O operations queued so that it cannot be changed to queue operations."
  }
, "0xC00000AF":{
    "code":"STATUS_ILLEGAL_FUNCTION"
  , "message":"The specified handle is not open to the server end of the named pipe."
  }
, "0xC00000B0":{
    "code":"STATUS_PIPE_DISCONNECTED"
  , "message":"The specified named pipe is in the disconnected state."
  }
, "0xC00000B1":{
    "code":"STATUS_PIPE_CLOSING"
  , "message":"The specified named pipe is in the closing state."
  }
, "0xC00000B2":{
    "code":"STATUS_PIPE_CONNECTED"
  , "message":"The specified named pipe is in the connected state."
  }
, "0xC00000B3":{
    "code":"STATUS_PIPE_LISTENING"
  , "message":"The specified named pipe is in the listening state."
  }
, "0xC00000B4":{
    "code":"STATUS_INVALID_READ_MODE"
  , "message":"The specified named pipe is not in message mode."
  }
, "0xC00000B5":{
    "code":"STATUS_IO_TIMEOUT"
  , "message":"{Device Timeout} The specified I/O operation on %hs was not completed before the time-out period expired."
  }
, "0xC00000B6":{
    "code":"STATUS_FILE_FORCED_CLOSED"
  , "message":"The specified file has been closed by another process."
  }
, "0xC00000B7":{
    "code":"STATUS_PROFILING_NOT_STARTED"
  , "message":"Profiling is not started."
  }
, "0xC00000B8":{
    "code":"STATUS_PROFILING_NOT_STOPPED"
  , "message":"Profiling is not stopped."
  }
, "0xC00000B9":{
    "code":"STATUS_COULD_NOT_INTERPRET"
  , "message":"The passed ACL did not contain the minimum required information."
  }
, "0xC00000BA":{
    "code":"STATUS_FILE_IS_A_DIRECTORY"
  , "message":"The file that was specified as a target is a directory, and the caller specified that it could be anything but a directory."
  }
, "0xC00000BB":{
    "code":"STATUS_NOT_SUPPORTED"
  , "message":"The request is not supported."
  }
, "0xC00000BC":{
    "code":"STATUS_REMOTE_NOT_LISTENING"
  , "message":"This remote computer is not listening."
  }
, "0xC00000BD":{
    "code":"STATUS_DUPLICATE_NAME"
  , "message":"A duplicate name exists on the network."
  }
, "0xC00000BE":{
    "code":"STATUS_BAD_NETWORK_PATH"
  , "message":"The network path cannot be located."
  }
, "0xC00000BF":{
    "code":"STATUS_NETWORK_BUSY"
  , "message":"The network is busy."
  }
, "0xC00000C0":{
    "code":"STATUS_DEVICE_DOES_NOT_EXIST"
  , "message":"This device does not exist."
  }
, "0xC00000C1":{
    "code":"STATUS_TOO_MANY_COMMANDS"
  , "message":"The network BIOS command limit has been reached."
  }
, "0xC00000C2":{
    "code":"STATUS_ADAPTER_HARDWARE_ERROR"
  , "message":"An I/O adapter hardware error has occurred."
  }
, "0xC00000C3":{
    "code":"STATUS_INVALID_NETWORK_RESPONSE"
  , "message":"The network responded incorrectly."
  }
, "0xC00000C4":{
    "code":"STATUS_UNEXPECTED_NETWORK_ERROR"
  , "message":"An unexpected network error occurred."
  }
, "0xC00000C5":{
    "code":"STATUS_BAD_REMOTE_ADAPTER"
  , "message":"The remote adapter is not compatible."
  }
, "0xC00000C6":{
    "code":"STATUS_PRINT_QUEUE_FULL"
  , "message":"The print queue is full."
  }
, "0xC00000C7":{
    "code":"STATUS_NO_SPOOL_SPACE"
  , "message":"Space to store the file that is waiting to be printed is not available on the server."
  }
, "0xC00000C8":{
    "code":"STATUS_PRINT_CANCELLED"
  , "message":"The requested print file has been canceled."
  }
, "0xC00000C9":{
    "code":"STATUS_NETWORK_NAME_DELETED"
  , "message":"The network name was deleted."
  }
, "0xC00000CA":{
    "code":"STATUS_NETWORK_ACCESS_DENIED"
  , "message":"Network access is denied."
  }
, "0xC00000CB":{
    "code":"STATUS_BAD_DEVICE_TYPE"
  , "message":"{Incorrect Network Resource Type} The specified device type (LPT, for example) conflicts with the actual device type on the remote resource."
  }
, "0xC00000CC":{
    "code":"STATUS_BAD_NETWORK_NAME"
  , "message":"{Network Name Not Found} The specified share name cannot be found on the remote server."
  }
, "0xC00000CD":{
    "code":"STATUS_TOO_MANY_NAMES"
  , "message":"The name limit for the network adapter card of the local computer was exceeded."
  }
, "0xC00000CE":{
    "code":"STATUS_TOO_MANY_SESSIONS"
  , "message":"The network BIOS session limit was exceeded."
  }
, "0xC00000CF":{
    "code":"STATUS_SHARING_PAUSED"
  , "message":"File sharing has been temporarily paused."
  }
, "0xC00000D0":{
    "code":"STATUS_REQUEST_NOT_ACCEPTED"
  , "message":"No more connections can be made to this remote computer at this time because the computer has already accepted the maximum number of connections."
  }
, "0xC00000D1":{
    "code":"STATUS_REDIRECTOR_PAUSED"
  , "message":"Print or disk redirection is temporarily paused."
  }
, "0xC00000D2":{
    "code":"STATUS_NET_WRITE_FAULT"
  , "message":"A network data fault occurred."
  }
, "0xC00000D3":{
    "code":"STATUS_PROFILING_AT_LIMIT"
  , "message":"The number of active profiling objects is at the maximum and no more may be started."
  }
, "0xC00000D4":{
    "code":"STATUS_NOT_SAME_DEVICE"
  , "message":"{Incorrect Volume} The destination file of a rename request is located on a different device than the source of the rename request."
  }
, "0xC00000D5":{
    "code":"STATUS_FILE_RENAMED"
  , "message":"The specified file has been renamed and thus cannot be modified."
  }
, "0xC00000D6":{
    "code":"STATUS_VIRTUAL_CIRCUIT_CLOSED"
  , "message":"{Network Request Timeout} The session with a remote server has been disconnected because the time-out interval for a request has expired."
  }
, "0xC00000D7":{
    "code":"STATUS_NO_SECURITY_ON_OBJECT"
  , "message":"Indicates an attempt was made to operate on the security of an object that does not have security associated with it."
  }
, "0xC00000D8":{
    "code":"STATUS_CANT_WAIT"
  , "message":"Used to indicate that an operation cannot continue without blocking for I/O."
  }
, "0xC00000D9":{
    "code":"STATUS_PIPE_EMPTY"
  , "message":"Used to indicate that a read operation was done on an empty pipe."
  }
, "0xC00000DA":{
    "code":"STATUS_CANT_ACCESS_DOMAIN_INFO"
  , "message":"Configuration information could not be read from the domain controller, either because the machine is unavailable or access has been denied."
  }
, "0xC00000DB":{
    "code":"STATUS_CANT_TERMINATE_SELF"
  , "message":"Indicates that a thread attempted to terminate itself by default (called NtTerminateThread with NULL) and it was the last thread in the current process."
  }
, "0xC00000DC":{
    "code":"STATUS_INVALID_SERVER_STATE"
  , "message":"Indicates the Sam Server was in the wrong state to perform the desired operation."
  }
, "0xC00000DD":{
    "code":"STATUS_INVALID_DOMAIN_STATE"
  , "message":"Indicates the domain was in the wrong state to perform the desired operation."
  }
, "0xC00000DE":{
    "code":"STATUS_INVALID_DOMAIN_ROLE"
  , "message":"This operation is only allowed for the primary domain controller of the domain."
  }
, "0xC00000DF":{
    "code":"STATUS_NO_SUCH_DOMAIN"
  , "message":"The specified domain did not exist."
  }
, "0xC00000E0":{
    "code":"STATUS_DOMAIN_EXISTS"
  , "message":"The specified domain already exists."
  }
, "0xC00000E1":{
    "code":"STATUS_DOMAIN_LIMIT_EXCEEDED"
  , "message":"An attempt was made to exceed the limit on the number of domains per server for this release."
  }
, "0xC00000E2":{
    "code":"STATUS_OPLOCK_NOT_GRANTED"
  , "message":"An error status returned when the opportunistic lock (oplock) request is denied."
  }
, "0xC00000E3":{
    "code":"STATUS_INVALID_OPLOCK_PROTOCOL"
  , "message":"An error status returned when an invalid opportunistic lock (oplock) acknowledgment is received by a file system."
  }
, "0xC00000E4":{
    "code":"STATUS_INTERNAL_DB_CORRUPTION"
  , "message":"This error indicates that the requested operation cannot be completed due to a catastrophic media failure or an on-disk data structure corruption."
  }
, "0xC00000E5":{
    "code":"STATUS_INTERNAL_ERROR"
  , "message":"An internal error occurred."
  }
, "0xC00000E6":{
    "code":"STATUS_GENERIC_NOT_MAPPED"
  , "message":"Indicates generic access types were contained in an access mask which should already be mapped to non-generic access types."
  }
, "0xC00000E7":{
    "code":"STATUS_BAD_DESCRIPTOR_FORMAT"
  , "message":"Indicates a security descriptor is not in the necessary format (absolute or self-relative)."
  }
, "0xC00000E8":{
    "code":"STATUS_INVALID_USER_BUFFER"
  , "message":"An access to a user buffer failed at an expected point in time. This code is defined because the caller does not want to accept STATUS_ACCESS_VIOLATION in its filter."
  }
, "0xC00000E9":{
    "code":"STATUS_UNEXPECTED_IO_ERROR"
  , "message":"If an I/O error that is not defined in the standard FsRtl filter is returned, it is converted to the following error, which is guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0xC00000EA":{
    "code":"STATUS_UNEXPECTED_MM_CREATE_ERR"
  , "message":"If an MM error that is not defined in the standard FsRtl filter is returned, it is converted to one of the following errors, which are guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0xC00000EB":{
    "code":"STATUS_UNEXPECTED_MM_MAP_ERROR"
  , "message":"If an MM error that is not defined in the standard FsRtl filter is returned, it is converted to one of the following errors, which are guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0xC00000EC":{
    "code":"STATUS_UNEXPECTED_MM_EXTEND_ERR"
  , "message":"If an MM error that is not defined in the standard FsRtl filter is returned, it is converted to one of the following errors, which are guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0xC00000ED":{
    "code":"STATUS_NOT_LOGON_PROCESS"
  , "message":"The requested action is restricted for use by logon processes only. The calling process has not registered as a logon process."
  }
, "0xC00000EE":{
    "code":"STATUS_LOGON_SESSION_EXISTS"
  , "message":"An attempt has been made to start a new session manager or LSA logon session by using an ID that is already in use."
  }
, "0xC00000EF":{
    "code":"STATUS_INVALID_PARAMETER_1"
  , "message":"An invalid parameter was passed to a service or function as the first argument."
  }
, "0xC00000F0":{
    "code":"STATUS_INVALID_PARAMETER_2"
  , "message":"An invalid parameter was passed to a service or function as the second argument."
  }
, "0xC00000F1":{
    "code":"STATUS_INVALID_PARAMETER_3"
  , "message":"An invalid parameter was passed to a service or function as the third argument."
  }
, "0xC00000F2":{
    "code":"STATUS_INVALID_PARAMETER_4"
  , "message":"An invalid parameter was passed to a service or function as the fourth argument."
  }
, "0xC00000F3":{
    "code":"STATUS_INVALID_PARAMETER_5"
  , "message":"An invalid parameter was passed to a service or function as the fifth argument."
  }
, "0xC00000F4":{
    "code":"STATUS_INVALID_PARAMETER_6"
  , "message":"An invalid parameter was passed to a service or function as the sixth argument."
  }
, "0xC00000F5":{
    "code":"STATUS_INVALID_PARAMETER_7"
  , "message":"An invalid parameter was passed to a service or function as the seventh argument."
  }
, "0xC00000F6":{
    "code":"STATUS_INVALID_PARAMETER_8"
  , "message":"An invalid parameter was passed to a service or function as the eighth argument."
  }
, "0xC00000F7":{
    "code":"STATUS_INVALID_PARAMETER_9"
  , "message":"An invalid parameter was passed to a service or function as the ninth argument."
  }
, "0xC00000F8":{
    "code":"STATUS_INVALID_PARAMETER_10"
  , "message":"An invalid parameter was passed to a service or function as the tenth argument."
  }
, "0xC00000F9":{
    "code":"STATUS_INVALID_PARAMETER_11"
  , "message":"An invalid parameter was passed to a service or function as the eleventh argument."
  }
, "0xC00000FA":{
    "code":"STATUS_INVALID_PARAMETER_12"
  , "message":"An invalid parameter was passed to a service or function as the twelfth argument."
  }
, "0xC00000FB":{
    "code":"STATUS_REDIRECTOR_NOT_STARTED"
  , "message":"An attempt was made to access a network file, but the network software was not yet started."
  }
, "0xC00000FC":{
    "code":"STATUS_REDIRECTOR_STARTED"
  , "message":"An attempt was made to start the redirector, but the redirector has already been started."
  }
, "0xC00000FD":{
    "code":"STATUS_STACK_OVERFLOW"
  , "message":"A new guard page for the stack cannot be created."
  }
, "0xC00000FE":{
    "code":"STATUS_NO_SUCH_PACKAGE"
  , "message":"A specified authentication package is unknown."
  }
, "0xC00000FF":{
    "code":"STATUS_BAD_FUNCTION_TABLE"
  , "message":"A malformed function table was encountered during an unwind operation."
  }
, "0xC0000100":{
    "code":"STATUS_VARIABLE_NOT_FOUND"
  , "message":"Indicates the specified environment variable name was not found in the specified environment block."
  }
, "0xC0000101":{
    "code":"STATUS_DIRECTORY_NOT_EMPTY"
  , "message":"Indicates that the directory trying to be deleted is not empty."
  }
, "0xC0000102":{
    "code":"STATUS_FILE_CORRUPT_ERROR"
  , "message":"{Corrupt File} The file or directory %hs is corrupt and unreadable. Run the Chkdsk utility."
  }
, "0xC0000103":{
    "code":"STATUS_NOT_A_DIRECTORY"
  , "message":"A requested opened file is not a directory."
  }
, "0xC0000104":{
    "code":"STATUS_BAD_LOGON_SESSION_STATE"
  , "message":"The logon session is not in a state that is consistent with the requested operation."
  }
, "0xC0000105":{
    "code":"STATUS_LOGON_SESSION_COLLISION"
  , "message":"An internal LSA error has occurred. An authentication package has requested the creation of a logon session but the ID of an already existing logon session has been specified."
  }
, "0xC0000106":{
    "code":"STATUS_NAME_TOO_LONG"
  , "message":"A specified name string is too long for its intended use."
  }
, "0xC0000107":{
    "code":"STATUS_FILES_OPEN"
  , "message":"The user attempted to force close the files on a redirected drive, but there were opened files on the drive, and the user did not specify a sufficient level of force."
  }
, "0xC0000108":{
    "code":"STATUS_CONNECTION_IN_USE"
  , "message":"The user attempted to force close the files on a redirected drive, but there were opened directories on the drive, and the user did not specify a sufficient level of force."
  }
, "0xC0000109":{
    "code":"STATUS_MESSAGE_NOT_FOUND"
  , "message":"RtlFindMessage could not locate the requested message ID in the message table resource."
  }
, "0xC000010A":{
    "code":"STATUS_PROCESS_IS_TERMINATING"
  , "message":"An attempt was made to duplicate an object handle into or out of an exiting process."
  }
, "0xC000010B":{
    "code":"STATUS_INVALID_LOGON_TYPE"
  , "message":"Indicates an invalid value has been provided for the LogonType requested."
  }
, "0xC000010C":{
    "code":"STATUS_NO_GUID_TRANSLATION"
  , "message":"Indicates that an attempt was made to assign protection to a file system file or directory and one of the SIDs in the security descriptor could not be translated into a GUID that could be stored by the file system. This causes the protection attempt to fail, which may cause a file creation attempt to fail."
  }
, "0xC000010D":{
    "code":"STATUS_CANNOT_IMPERSONATE"
  , "message":"Indicates that an attempt has been made to impersonate via a named pipe that has not yet been read from."
  }
, "0xC000010E":{
    "code":"STATUS_IMAGE_ALREADY_LOADED"
  , "message":"Indicates that the specified image is already loaded."
  }
, "0xC0000117":{
    "code":"STATUS_NO_LDT"
  , "message":"Indicates that an attempt was made to change the size of the LDT for a process that has no LDT."
  }
, "0xC0000118":{
    "code":"STATUS_INVALID_LDT_SIZE"
  , "message":"Indicates that an attempt was made to grow an LDT by setting its size, or that the size was not an even number of selectors."
  }
, "0xC0000119":{
    "code":"STATUS_INVALID_LDT_OFFSET"
  , "message":"Indicates that the starting value for the LDT information was not an integral multiple of the selector size."
  }
, "0xC000011A":{
    "code":"STATUS_INVALID_LDT_DESCRIPTOR"
  , "message":"Indicates that the user supplied an invalid descriptor when trying to set up LDT descriptors."
  }
, "0xC000011B":{
    "code":"STATUS_INVALID_IMAGE_NE_FORMAT"
  , "message":"The specified image file did not have the correct format. It appears to be NE format."
  }
, "0xC000011C":{
    "code":"STATUS_RXACT_INVALID_STATE"
  , "message":"Indicates that the transaction state of a registry subtree is incompatible with the requested operation. For example, a request has been made to start a new transaction with one already in progress, or a request has been made to apply a transaction when one is not currently in progress."
  }
, "0xC000011D":{
    "code":"STATUS_RXACT_COMMIT_FAILURE"
  , "message":"Indicates an error has occurred during a registry transaction commit. The database has been left in an unknown, but probably inconsistent, state. The state of the registry transaction is left as COMMITTING."
  }
, "0xC000011E":{
    "code":"STATUS_MAPPED_FILE_SIZE_ZERO"
  , "message":"An attempt was made to map a file of size zero with the maximum size specified as zero."
  }
, "0xC000011F":{
    "code":"STATUS_TOO_MANY_OPENED_FILES"
  , "message":"Too many files are opened on a remote server. This error should only be returned by the Windows redirector on a remote drive."
  }
, "0xC0000120":{
    "code":"STATUS_CANCELLED"
  , "message":"The I/O request was canceled."
  }
, "0xC0000121":{
    "code":"STATUS_CANNOT_DELETE"
  , "message":"An attempt has been made to remove a file or directory that cannot be deleted."
  }
, "0xC0000122":{
    "code":"STATUS_INVALID_COMPUTER_NAME"
  , "message":"Indicates a name that was specified as a remote computer name is syntactically invalid."
  }
, "0xC0000123":{
    "code":"STATUS_FILE_DELETED"
  , "message":"An I/O request other than close was performed on a file after it was deleted, which can only happen to a request that did not complete before the last handle was closed via NtClose."
  }
, "0xC0000124":{
    "code":"STATUS_SPECIAL_ACCOUNT"
  , "message":"Indicates an operation that is incompatible with built-in accounts has been attempted on a built-in (special) SAM account. For example, built-in accounts cannot be deleted."
  }
, "0xC0000125":{
    "code":"STATUS_SPECIAL_GROUP"
  , "message":"The operation requested may not be performed on the specified group because it is a built-in special group."
  }
, "0xC0000126":{
    "code":"STATUS_SPECIAL_USER"
  , "message":"The operation requested may not be performed on the specified user because it is a built-in special user."
  }
, "0xC0000127":{
    "code":"STATUS_MEMBERS_PRIMARY_GROUP"
  , "message":"Indicates a member cannot be removed from a group because the group is currently the member\'s primary group."
  }
, "0xC0000128":{
    "code":"STATUS_FILE_CLOSED"
  , "message":"An I/O request other than close and several other special case operations was attempted using a file object that had already been closed."
  }
, "0xC0000129":{
    "code":"STATUS_TOO_MANY_THREADS"
  , "message":"Indicates a process has too many threads to perform the requested action. For example, assignment of a primary token may only be performed when a process has zero or one threads."
  }
, "0xC000012A":{
    "code":"STATUS_THREAD_NOT_IN_PROCESS"
  , "message":"An attempt was made to operate on a thread within a specific process, but the specified thread is not in the specified process."
  }
, "0xC000012B":{
    "code":"STATUS_TOKEN_ALREADY_IN_USE"
  , "message":"An attempt was made to establish a token for use as a primary token but the token is already in use. A token can only be the primary token of one process at a time."
  }
, "0xC000012C":{
    "code":"STATUS_PAGEFILE_QUOTA_EXCEEDED"
  , "message":"The page file quota was exceeded."
  }
, "0xC000012D":{
    "code":"STATUS_COMMITMENT_LIMIT"
  , "message":"{Out of Virtual Memory} Your system is low on virtual memory. To ensure that Windows runs correctly, increase the size of your virtual memory paging file. For more information, see Help."
  }
, "0xC000012E":{
    "code":"STATUS_INVALID_IMAGE_LE_FORMAT"
  , "message":"The specified image file did not have the correct format: it appears to be LE format."
  }
, "0xC000012F":{
    "code":"STATUS_INVALID_IMAGE_NOT_MZ"
  , "message":"The specified image file did not have the correct format: it did not have an initial MZ."
  }
, "0xC0000130":{
    "code":"STATUS_INVALID_IMAGE_PROTECT"
  , "message":"The specified image file did not have the correct format: it did not have a proper e_lfarlc in the MZ header."
  }
, "0xC0000131":{
    "code":"STATUS_INVALID_IMAGE_WIN_16"
  , "message":"The specified image file did not have the correct format: it appears to be a 16-bit Windows image."
  }
, "0xC0000132":{
    "code":"STATUS_LOGON_SERVER_CONFLICT"
  , "message":"The Netlogon service cannot start because another Netlogon service running in the domain conflicts with the specified role."
  }
, "0xC0000133":{
    "code":"STATUS_TIME_DIFFERENCE_AT_DC"
  , "message":"The time at the primary domain controller is different from the time at the backup domain controller or member server by too large an amount."
  }
, "0xC0000134":{
    "code":"STATUS_SYNCHRONIZATION_REQUIRED"
  , "message":"The SAM database on a Windows Server is significantly out of synchronization with the copy on the domain controller. A complete synchronization is required."
  }
, "0xC0000135":{
    "code":"STATUS_DLL_NOT_FOUND"
  , "message":"{Unable To Locate Component} This application has failed to start because %hs was not found. Reinstalling the application may fix this problem."
  }
, "0xC0000136":{
    "code":"STATUS_OPEN_FAILED"
  , "message":"The NtCreateFile API failed. This error should never be returned to an application; it is a place holder for the Windows LAN Manager Redirector to use in its internal error-mapping routines."
  }
, "0xC0000137":{
    "code":"STATUS_IO_PRIVILEGE_FAILED"
  , "message":"{Privilege Failed} The I/O permissions for the process could not be changed."
  }
, "0xC0000138":{
    "code":"STATUS_ORDINAL_NOT_FOUND"
  , "message":"{Ordinal Not Found} The ordinal %ld could not be located in the dynamic link library %hs."
  }
, "0xC0000139":{
    "code":"STATUS_ENTRYPOINT_NOT_FOUND"
  , "message":"{Entry Point Not Found} The procedure entry point %hs could not be located in the dynamic link library %hs."
  }
, "0xC000013A":{
    "code":"STATUS_CONTROL_C_EXIT"
  , "message":"{Application Exit by CTRL+C} The application terminated as a result of a CTRL+C."
  }
, "0xC000013B":{
    "code":"STATUS_LOCAL_DISCONNECT"
  , "message":"{Virtual Circuit Closed} The network transport on your computer has closed a network connection. There may or may not be I/O requests outstanding."
  }
, "0xC000013C":{
    "code":"STATUS_REMOTE_DISCONNECT"
  , "message":"{Virtual Circuit Closed} The network transport on a remote computer has closed a network connection. There may or may not be I/O requests outstanding."
  }
, "0xC000013D":{
    "code":"STATUS_REMOTE_RESOURCES"
  , "message":"{Insufficient Resources on Remote Computer} The remote computer has insufficient resources to complete the network request. For example, the remote computer may not have enough available memory to carry out the request at this time."
  }
, "0xC000013E":{
    "code":"STATUS_LINK_FAILED"
  , "message":"{Virtual Circuit Closed} An existing connection (virtual circuit) has been broken at the remote computer. There is probably something wrong with the network software protocol or the network hardware on the remote computer."
  }
, "0xC000013F":{
    "code":"STATUS_LINK_TIMEOUT"
  , "message":"{Virtual Circuit Closed} The network transport on your computer has closed a network connection because it had to wait too long for a response from the remote computer."
  }
, "0xC0000140":{
    "code":"STATUS_INVALID_CONNECTION"
  , "message":"The connection handle that was given to the transport was invalid."
  }
, "0xC0000141":{
    "code":"STATUS_INVALID_ADDRESS"
  , "message":"The address handle that was given to the transport was invalid."
  }
, "0xC0000142":{
    "code":"STATUS_DLL_INIT_FAILED"
  , "message":"{DLL Initialization Failed} Initialization of the dynamic link library %hs failed. The process is terminating abnormally."
  }
, "0xC0000143":{
    "code":"STATUS_MISSING_SYSTEMFILE"
  , "message":"{Missing System File} The required system file %hs is bad or missing."
  }
, "0xC0000144":{
    "code":"STATUS_UNHANDLED_EXCEPTION"
  , "message":"{Application Error} The exception %s (0x%08lx) occurred in the application at location 0x%08lx."
  }
, "0xC0000145":{
    "code":"STATUS_APP_INIT_FAILURE"
  , "message":"{Application Error} The application failed to initialize properly (0x%lx). Click OK to terminate the application."
  }
, "0xC0000146":{
    "code":"STATUS_PAGEFILE_CREATE_FAILED"
  , "message":"{Unable to Create Paging File} The creation of the paging file %hs failed (%lx). The requested size was %ld."
  }
, "0xC0000147":{
    "code":"STATUS_NO_PAGEFILE"
  , "message":"{No Paging File Specified} No paging file was specified in the system configuration."
  }
, "0xC0000148":{
    "code":"STATUS_INVALID_LEVEL"
  , "message":"{Incorrect System Call Level} An invalid level was passed into the specified system call."
  }
, "0xC0000149":{
    "code":"STATUS_WRONG_PASSWORD_CORE"
  , "message":"{Incorrect Password to LAN Manager Server} You specified an incorrect password to a LAN Manager 2.x or MS-NET server."
  }
, "0xC000014A":{
    "code":"STATUS_ILLEGAL_FLOAT_CONTEXT"
  , "message":"{EXCEPTION} A real-mode application issued a floating-point instruction and floating-point hardware is not present."
  }
, "0xC000014B":{
    "code":"STATUS_PIPE_BROKEN"
  , "message":"The pipe operation has failed because the other end of the pipe has been closed."
  }
, "0xC000014C":{
    "code":"STATUS_REGISTRY_CORRUPT"
  , "message":"{The Registry Is Corrupt} The structure of one of the files that contains registry data is corrupt; the image of the file in memory is corrupt; or the file could not be recovered because the alternate copy or log was absent or corrupt."
  }
, "0xC000014D":{
    "code":"STATUS_REGISTRY_IO_FAILED"
  , "message":"An I/O operation initiated by the Registry failed and cannot be recovered. The registry could not read in, write out, or flush one of the files that contain the system\'s image of the registry."
  }
, "0xC000014E":{
    "code":"STATUS_NO_EVENT_PAIR"
  , "message":"An event pair synchronization operation was performed using the thread-specific client/server event pair object, but no event pair object was associated with the thread."
  }
, "0xC000014F":{
    "code":"STATUS_UNRECOGNIZED_VOLUME"
  , "message":"The volume does not contain a recognized file system. Be sure that all required file system drivers are loaded and that the volume is not corrupt."
  }
, "0xC0000150":{
    "code":"STATUS_SERIAL_NO_DEVICE_INITED"
  , "message":"No serial device was successfully initialized. The serial driver will unload."
  }
, "0xC0000151":{
    "code":"STATUS_NO_SUCH_ALIAS"
  , "message":"The specified local group does not exist."
  }
, "0xC0000152":{
    "code":"STATUS_MEMBER_NOT_IN_ALIAS"
  , "message":"The specified account name is not a member of the group."
  }
, "0xC0000153":{
    "code":"STATUS_MEMBER_IN_ALIAS"
  , "message":"The specified account name is already a member of the group."
  }
, "0xC0000154":{
    "code":"STATUS_ALIAS_EXISTS"
  , "message":"The specified local group already exists."
  }
, "0xC0000155":{
    "code":"STATUS_LOGON_NOT_GRANTED"
  , "message":"A requested type of logon (for example, interactive, network, and service) is not granted by the local security policy of the target system. Ask the system administrator to grant the necessary form of logon."
  }
, "0xC0000156":{
    "code":"STATUS_TOO_MANY_SECRETS"
  , "message":"The maximum number of secrets that may be stored in a single system was exceeded. The length and number of secrets is limited to satisfy U.S. State Department export restrictions."
  }
, "0xC0000157":{
    "code":"STATUS_SECRET_TOO_LONG"
  , "message":"The length of a secret exceeds the maximum allowable length. The length and number of secrets is limited to satisfy U.S. State Department export restrictions."
  }
, "0xC0000158":{
    "code":"STATUS_INTERNAL_DB_ERROR"
  , "message":"The local security authority (LSA) database contains an internal inconsistency."
  }
, "0xC0000159":{
    "code":"STATUS_FULLSCREEN_MODE"
  , "message":"The requested operation cannot be performed in full-screen mode."
  }
, "0xC000015A":{
    "code":"STATUS_TOO_MANY_CONTEXT_IDS"
  , "message":"During a logon attempt, the user\'s security context accumulated too many security IDs. This is a very unusual situation. Remove the user from some global or local groups to reduce the number of security IDs to incorporate into the security context."
  }
, "0xC000015B":{
    "code":"STATUS_LOGON_TYPE_NOT_GRANTED"
  , "message":"A user has requested a type of logon (for example, interactive or network) that has not been granted. An administrator has control over who may logon interactively and through the network."
  }
, "0xC000015C":{
    "code":"STATUS_NOT_REGISTRY_FILE"
  , "message":"The system has attempted to load or restore a file into the registry, and the specified file is not in the format of a registry file."
  }
, "0xC000015D":{
    "code":"STATUS_NT_CROSS_ENCRYPTION_REQUIRED"
  , "message":"An attempt was made to change a user password in the security account manager without providing the necessary Windows cross-encrypted password."
  }
, "0xC000015E":{
    "code":"STATUS_DOMAIN_CTRLR_CONFIG_ERROR"
  , "message":"A Windows Server has an incorrect configuration."
  }
, "0xC000015F":{
    "code":"STATUS_FT_MISSING_MEMBER"
  , "message":"An attempt was made to explicitly access the secondary copy of information via a device control to the fault tolerance driver and the secondary copy is not present in the system."
  }
, "0xC0000160":{
    "code":"STATUS_ILL_FORMED_SERVICE_ENTRY"
  , "message":"A configuration registry node that represents a driver service entry was ill-formed and did not contain the required value entries."
  }
, "0xC0000161":{
    "code":"STATUS_ILLEGAL_CHARACTER"
  , "message":"An illegal character was encountered. For a multibyte character set, this includes a lead byte without a succeeding trail byte. For the Unicode character set this includes the characters 0xFFFF and 0xFFFE."
  }
, "0xC0000162":{
    "code":"STATUS_UNMAPPABLE_CHARACTER"
  , "message":"No mapping for the Unicode character exists in the target multibyte code page."
  }
, "0xC0000163":{
    "code":"STATUS_UNDEFINED_CHARACTER"
  , "message":"The Unicode character is not defined in the Unicode character set that is installed on the system."
  }
, "0xC0000164":{
    "code":"STATUS_FLOPPY_VOLUME"
  , "message":"The paging file cannot be created on a floppy disk."
  }
, "0xC0000165":{
    "code":"STATUS_FLOPPY_ID_MARK_NOT_FOUND"
  , "message":"{Floppy Disk Error} While accessing a floppy disk, an ID address mark was not found."
  }
, "0xC0000166":{
    "code":"STATUS_FLOPPY_WRONG_CYLINDER"
  , "message":"{Floppy Disk Error} While accessing a floppy disk, the track address from the sector ID field was found to be different from the track address that is maintained by the controller."
  }
, "0xC0000167":{
    "code":"STATUS_FLOPPY_UNKNOWN_ERROR"
  , "message":"{Floppy Disk Error} The floppy disk controller reported an error that is not recognized by the floppy disk driver."
  }
, "0xC0000168":{
    "code":"STATUS_FLOPPY_BAD_REGISTERS"
  , "message":"{Floppy Disk Error} While accessing a floppy-disk, the controller returned inconsistent results via its registers."
  }
, "0xC0000169":{
    "code":"STATUS_DISK_RECALIBRATE_FAILED"
  , "message":"{Hard Disk Error} While accessing the hard disk, a recalibrate operation failed, even after retries."
  }
, "0xC000016A":{
    "code":"STATUS_DISK_OPERATION_FAILED"
  , "message":"{Hard Disk Error} While accessing the hard disk, a disk operation failed even after retries."
  }
, "0xC000016B":{
    "code":"STATUS_DISK_RESET_FAILED"
  , "message":"{Hard Disk Error} While accessing the hard disk, a disk controller reset was needed, but even that failed."
  }
, "0xC000016C":{
    "code":"STATUS_SHARED_IRQ_BUSY"
  , "message":"An attempt was made to open a device that was sharing an interrupt request (IRQ) with other devices. At least one other device that uses that IRQ was already opened. Two concurrent opens of devices that share an IRQ and only work via interrupts is not supported for the particular bus type that the devices use."
  }
, "0xC000016D":{
    "code":"STATUS_FT_ORPHANING"
  , "message":"{FT Orphaning} A disk that is part of a fault-tolerant volume can no longer be accessed."
  }
, "0xC000016E":{
    "code":"STATUS_BIOS_FAILED_TO_CONNECT_INTERRUPT"
  , "message":"The basic input/output system (BIOS) failed to connect a system interrupt to the device or bus for which the device is connected."
  }
, "0xC0000172":{
    "code":"STATUS_PARTITION_FAILURE"
  , "message":"The tape could not be partitioned."
  }
, "0xC0000173":{
    "code":"STATUS_INVALID_BLOCK_LENGTH"
  , "message":"When accessing a new tape of a multi-volume partition, the current blocksize is incorrect."
  }
, "0xC0000174":{
    "code":"STATUS_DEVICE_NOT_PARTITIONED"
  , "message":"The tape partition information could not be found when loading a tape."
  }
, "0xC0000175":{
    "code":"STATUS_UNABLE_TO_LOCK_MEDIA"
  , "message":"An attempt to lock the eject media mechanism failed."
  }
, "0xC0000176":{
    "code":"STATUS_UNABLE_TO_UNLOAD_MEDIA"
  , "message":"An attempt to unload media failed."
  }
, "0xC0000177":{
    "code":"STATUS_EOM_OVERFLOW"
  , "message":"The physical end of tape was detected."
  }
, "0xC0000178":{
    "code":"STATUS_NO_MEDIA"
  , "message":"{No Media} There is no media in the drive. Insert media into drive %hs."
  }
, "0xC000017A":{
    "code":"STATUS_NO_SUCH_MEMBER"
  , "message":"A member could not be added to or removed from the local group because the member does not exist."
  }
, "0xC000017B":{
    "code":"STATUS_INVALID_MEMBER"
  , "message":"A new member could not be added to a local group because the member has the wrong account type."
  }
, "0xC000017C":{
    "code":"STATUS_KEY_DELETED"
  , "message":"An illegal operation was attempted on a registry key that has been marked for deletion."
  }
, "0xC000017D":{
    "code":"STATUS_NO_LOG_SPACE"
  , "message":"The system could not allocate the required space in a registry log."
  }
, "0xC000017E":{
    "code":"STATUS_TOO_MANY_SIDS"
  , "message":"Too many SIDs have been specified."
  }
, "0xC000017F":{
    "code":"STATUS_LM_CROSS_ENCRYPTION_REQUIRED"
  , "message":"An attempt was made to change a user password in the security account manager without providing the necessary LM cross-encrypted password."
  }
, "0xC0000180":{
    "code":"STATUS_KEY_HAS_CHILDREN"
  , "message":"An attempt was made to create a symbolic link in a registry key that already has subkeys or values."
  }
, "0xC0000181":{
    "code":"STATUS_CHILD_MUST_BE_VOLATILE"
  , "message":"An attempt was made to create a stable subkey under a volatile parent key."
  }
, "0xC0000182":{
    "code":"STATUS_DEVICE_CONFIGURATION_ERROR"
  , "message":"The I/O device is configured incorrectly or the configuration parameters to the driver are incorrect."
  }
, "0xC0000183":{
    "code":"STATUS_DRIVER_INTERNAL_ERROR"
  , "message":"An error was detected between two drivers or within an I/O driver."
  }
, "0xC0000184":{
    "code":"STATUS_INVALID_DEVICE_STATE"
  , "message":"The device is not in a valid state to perform this request."
  }
, "0xC0000185":{
    "code":"STATUS_IO_DEVICE_ERROR"
  , "message":"The I/O device reported an I/O error."
  }
, "0xC0000186":{
    "code":"STATUS_DEVICE_PROTOCOL_ERROR"
  , "message":"A protocol error was detected between the driver and the device."
  }
, "0xC0000187":{
    "code":"STATUS_BACKUP_CONTROLLER"
  , "message":"This operation is only allowed for the primary domain controller of the domain."
  }
, "0xC0000188":{
    "code":"STATUS_LOG_FILE_FULL"
  , "message":"The log file space is insufficient to support this operation."
  }
, "0xC0000189":{
    "code":"STATUS_TOO_LATE"
  , "message":"A write operation was attempted to a volume after it was dismounted."
  }
, "0xC000018A":{
    "code":"STATUS_NO_TRUST_LSA_SECRET"
  , "message":"The workstation does not have a trust secret for the primary domain in the local LSA database."
  }
, "0xC000018B":{
    "code":"STATUS_NO_TRUST_SAM_ACCOUNT"
  , "message":"The SAM database on the Windows Server does not have a computer account for this workstation trust relationship."
  }
, "0xC000018C":{
    "code":"STATUS_TRUSTED_DOMAIN_FAILURE"
  , "message":"The logon request failed because the trust relationship between the primary domain and the trusted domain failed."
  }
, "0xC000018D":{
    "code":"STATUS_TRUSTED_RELATIONSHIP_FAILURE"
  , "message":"The logon request failed because the trust relationship between this workstation and the primary domain failed."
  }
, "0xC000018E":{
    "code":"STATUS_EVENTLOG_FILE_CORRUPT"
  , "message":"The Eventlog log file is corrupt."
  }
, "0xC000018F":{
    "code":"STATUS_EVENTLOG_CANT_START"
  , "message":"No Eventlog log file could be opened. The Eventlog service did not start."
  }
, "0xC0000190":{
    "code":"STATUS_TRUST_FAILURE"
  , "message":"The network logon failed. This may be because the validation authority cannot be reached."
  }
, "0xC0000191":{
    "code":"STATUS_MUTANT_LIMIT_EXCEEDED"
  , "message":"An attempt was made to acquire a mutant such that its maximum count would have been exceeded."
  }
, "0xC0000192":{
    "code":"STATUS_NETLOGON_NOT_STARTED"
  , "message":"An attempt was made to logon, but the NetLogon service was not started."
  }
, "0xC0000193":{
    "code":"STATUS_ACCOUNT_EXPIRED"
  , "message":"The user account has expired."
  }
, "0xC0000194":{
    "code":"STATUS_POSSIBLE_DEADLOCK"
  , "message":"{EXCEPTION} Possible deadlock condition."
  }
, "0xC0000195":{
    "code":"STATUS_NETWORK_CREDENTIAL_CONFLICT"
  , "message":"Multiple connections to a server or shared resource by the same user, using more than one user name, are not allowed. Disconnect all previous connections to the server or shared resource and try again."
  }
, "0xC0000196":{
    "code":"STATUS_REMOTE_SESSION_LIMIT"
  , "message":"An attempt was made to establish a session to a network server, but there are already too many sessions established to that server."
  }
, "0xC0000197":{
    "code":"STATUS_EVENTLOG_FILE_CHANGED"
  , "message":"The log file has changed between reads."
  }
, "0xC0000198":{
    "code":"STATUS_NOLOGON_INTERDOMAIN_TRUST_ACCOUNT"
  , "message":"The account used is an interdomain trust account. Use your global user account or local user account to access this server."
  }
, "0xC0000199":{
    "code":"STATUS_NOLOGON_WORKSTATION_TRUST_ACCOUNT"
  , "message":"The account used is a computer account. Use your global user account or local user account to access this server."
  }
, "0xC000019A":{
    "code":"STATUS_NOLOGON_SERVER_TRUST_ACCOUNT"
  , "message":"The account used is a server trust account. Use your global user account or local user account to access this server."
  }
, "0xC000019B":{
    "code":"STATUS_DOMAIN_TRUST_INCONSISTENT"
  , "message":"The name or SID of the specified domain is inconsistent with the trust information for that domain."
  }
, "0xC000019C":{
    "code":"STATUS_FS_DRIVER_REQUIRED"
  , "message":"A volume has been accessed for which a file system driver is required that has not yet been loaded."
  }
, "0xC000019D":{
    "code":"STATUS_IMAGE_ALREADY_LOADED_AS_DLL"
  , "message":"Indicates that the specified image is already loaded as a DLL."
  }
, "0xC000019E":{
    "code":"STATUS_INCOMPATIBLE_WITH_GLOBAL_SHORT_NAME_REGISTRY_SETTING"
  , "message":"Short name settings may not be changed on this volume due to the global registry setting."
  }
, "0xC000019F":{
    "code":"STATUS_SHORT_NAMES_NOT_ENABLED_ON_VOLUME"
  , "message":"Short names are not enabled on this volume."
  }
, "0xC00001A0":{
    "code":"STATUS_SECURITY_STREAM_IS_INCONSISTENT"
  , "message":"The security stream for the given volume is in an inconsistent state. Please run CHKDSK on the volume."
  }
, "0xC00001A1":{
    "code":"STATUS_INVALID_LOCK_RANGE"
  , "message":"A requested file lock operation cannot be processed due to an invalid byte range."
  }
, "0xC00001A2":{
    "code":"STATUS_INVALID_ACE_CONDITION"
  , "message":"The specified access control entry (ACE) contains an invalid condition."
  }
, "0xC00001A3":{
    "code":"STATUS_IMAGE_SUBSYSTEM_NOT_PRESENT"
  , "message":"The subsystem needed to support the image type is not present."
  }
, "0xC00001A4":{
    "code":"STATUS_NOTIFICATION_GUID_ALREADY_DEFINED"
  , "message":"The specified file already has a notification GUID associated with it."
  }
, "0xC0000201":{
    "code":"STATUS_NETWORK_OPEN_RESTRICTION"
  , "message":"A remote open failed because the network open restrictions were not satisfied."
  }
, "0xC0000202":{
    "code":"STATUS_NO_USER_SESSION_KEY"
  , "message":"There is no user session key for the specified logon session."
  }
, "0xC0000203":{
    "code":"STATUS_USER_SESSION_DELETED"
  , "message":"The remote user session has been deleted."
  }
, "0xC0000204":{
    "code":"STATUS_RESOURCE_LANG_NOT_FOUND"
  , "message":"Indicates the specified resource language ID cannot be found in the image file."
  }
, "0xC0000205":{
    "code":"STATUS_INSUFF_SERVER_RESOURCES"
  , "message":"Insufficient server resources exist to complete the request."
  }
, "0xC0000206":{
    "code":"STATUS_INVALID_BUFFER_SIZE"
  , "message":"The size of the buffer is invalid for the specified operation."
  }
, "0xC0000207":{
    "code":"STATUS_INVALID_ADDRESS_COMPONENT"
  , "message":"The transport rejected the specified network address as invalid."
  }
, "0xC0000208":{
    "code":"STATUS_INVALID_ADDRESS_WILDCARD"
  , "message":"The transport rejected the specified network address due to invalid use of a wildcard."
  }
, "0xC0000209":{
    "code":"STATUS_TOO_MANY_ADDRESSES"
  , "message":"The transport address could not be opened because all the available addresses are in use."
  }
, "0xC000020A":{
    "code":"STATUS_ADDRESS_ALREADY_EXISTS"
  , "message":"The transport address could not be opened because it already exists."
  }
, "0xC000020B":{
    "code":"STATUS_ADDRESS_CLOSED"
  , "message":"The transport address is now closed."
  }
, "0xC000020C":{
    "code":"STATUS_CONNECTION_DISCONNECTED"
  , "message":"The transport connection is now disconnected."
  }
, "0xC000020D":{
    "code":"STATUS_CONNECTION_RESET"
  , "message":"The transport connection has been reset."
  }
, "0xC000020E":{
    "code":"STATUS_TOO_MANY_NODES"
  , "message":"The transport cannot dynamically acquire any more nodes."
  }
, "0xC000020F":{
    "code":"STATUS_TRANSACTION_ABORTED"
  , "message":"The transport aborted a pending transaction."
  }
, "0xC0000210":{
    "code":"STATUS_TRANSACTION_TIMED_OUT"
  , "message":"The transport timed out a request that is waiting for a response."
  }
, "0xC0000211":{
    "code":"STATUS_TRANSACTION_NO_RELEASE"
  , "message":"The transport did not receive a release for a pending response."
  }
, "0xC0000212":{
    "code":"STATUS_TRANSACTION_NO_MATCH"
  , "message":"The transport did not find a transaction that matches the specific token."
  }
, "0xC0000213":{
    "code":"STATUS_TRANSACTION_RESPONDED"
  , "message":"The transport had previously responded to a transaction request."
  }
, "0xC0000214":{
    "code":"STATUS_TRANSACTION_INVALID_ID"
  , "message":"The transport does not recognize the specified transaction request ID."
  }
, "0xC0000215":{
    "code":"STATUS_TRANSACTION_INVALID_TYPE"
  , "message":"The transport does not recognize the specified transaction request type."
  }
, "0xC0000216":{
    "code":"STATUS_NOT_SERVER_SESSION"
  , "message":"The transport can only process the specified request on the server side of a session."
  }
, "0xC0000217":{
    "code":"STATUS_NOT_CLIENT_SESSION"
  , "message":"The transport can only process the specified request on the client side of a session."
  }
, "0xC0000218":{
    "code":"STATUS_CANNOT_LOAD_REGISTRY_FILE"
  , "message":"{Registry File Failure} The registry cannot load the hive (file): %hs or its log or alternate. It is corrupt, absent, or not writable."
  }
, "0xC0000219":{
    "code":"STATUS_DEBUG_ATTACH_FAILED"
  , "message":"{Unexpected Failure in DebugActiveProcess} An unexpected failure occurred while processing a DebugActiveProcess API request. You may choose OK to terminate the process, or Cancel to ignore the error."
  }
, "0xC000021A":{
    "code":"STATUS_SYSTEM_PROCESS_TERMINATED"
  , "message":"{Fatal System Error} The %hs system process terminated unexpectedly with a status of 0x%08x (0x%08x 0x%08x). The system has been shut down."
  }
, "0xC000021B":{
    "code":"STATUS_DATA_NOT_ACCEPTED"
  , "message":"{Data Not Accepted} The TDI client could not handle the data received during an indication."
  }
, "0xC000021C":{
    "code":"STATUS_NO_BROWSER_SERVERS_FOUND"
  , "message":"{Unable to Retrieve Browser Server List} The list of servers for this workgroup is not currently available."
  }
, "0xC000021D":{
    "code":"STATUS_VDM_HARD_ERROR"
  , "message":"NTVDM encountered a hard error."
  }
, "0xC000021E":{
    "code":"STATUS_DRIVER_CANCEL_TIMEOUT"
  , "message":"{Cancel Timeout} The driver %hs failed to complete a canceled I/O request in the allotted time."
  }
, "0xC000021F":{
    "code":"STATUS_REPLY_MESSAGE_MISMATCH"
  , "message":"{Reply Message Mismatch} An attempt was made to reply to an LPC message, but the thread specified by the client ID in the message was not waiting on that message."
  }
, "0xC0000220":{
    "code":"STATUS_MAPPED_ALIGNMENT"
  , "message":"{Mapped View Alignment Incorrect} An attempt was made to map a view of a file, but either the specified base address or the offset into the file were not aligned on the proper allocation granularity."
  }
, "0xC0000221":{
    "code":"STATUS_IMAGE_CHECKSUM_MISMATCH"
  , "message":"{Bad Image Checksum} The image %hs is possibly corrupt. The header checksum does not match the computed checksum."
  }
, "0xC0000222":{
    "code":"STATUS_LOST_WRITEBEHIND_DATA"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs. The data has been lost. This error may be caused by a failure of your computer hardware or network connection. Try to save this file elsewhere."
  }
, "0xC0000223":{
    "code":"STATUS_CLIENT_SERVER_PARAMETERS_INVALID"
  , "message":"The parameters passed to the server in the client/server shared memory window were invalid. Too much data may have been put in the shared memory window."
  }
, "0xC0000224":{
    "code":"STATUS_PASSWORD_MUST_CHANGE"
  , "message":"The user password must be changed before logging on the first time."
  }
, "0xC0000225":{
    "code":"STATUS_NOT_FOUND"
  , "message":"The object was not found."
  }
, "0xC0000226":{
    "code":"STATUS_NOT_TINY_STREAM"
  , "message":"The stream is not a tiny stream."
  }
, "0xC0000227":{
    "code":"STATUS_RECOVERY_FAILURE"
  , "message":"A transaction recovery failed."
  }
, "0xC0000228":{
    "code":"STATUS_STACK_OVERFLOW_READ"
  , "message":"The request must be handled by the stack overflow code."
  }
, "0xC0000229":{
    "code":"STATUS_FAIL_CHECK"
  , "message":"A consistency check failed."
  }
, "0xC000022A":{
    "code":"STATUS_DUPLICATE_OBJECTID"
  , "message":"The attempt to insert the ID in the index failed because the ID is already in the index."
  }
, "0xC000022B":{
    "code":"STATUS_OBJECTID_EXISTS"
  , "message":"The attempt to set the object ID failed because the object already has an ID."
  }
, "0xC000022C":{
    "code":"STATUS_CONVERT_TO_LARGE"
  , "message":"Internal OFS status codes indicating how an allocation operation is handled. Either it is retried after the containing oNode is moved or the extent stream is converted to a large stream."
  }
, "0xC000022D":{
    "code":"STATUS_RETRY"
  , "message":"The request needs to be retried."
  }
, "0xC000022E":{
    "code":"STATUS_FOUND_OUT_OF_SCOPE"
  , "message":"The attempt to find the object found an object on the volume that matches by ID; however, it is out of the scope of the handle that is used for the operation."
  }
, "0xC000022F":{
    "code":"STATUS_ALLOCATE_BUCKET"
  , "message":"The bucket array must be grown. Retry the transaction after doing so."
  }
, "0xC0000230":{
    "code":"STATUS_PROPSET_NOT_FOUND"
  , "message":"The specified property set does not exist on the object."
  }
, "0xC0000231":{
    "code":"STATUS_MARSHALL_OVERFLOW"
  , "message":"The user/kernel marshaling buffer has overflowed."
  }
, "0xC0000232":{
    "code":"STATUS_INVALID_VARIANT"
  , "message":"The supplied variant structure contains invalid data."
  }
, "0xC0000233":{
    "code":"STATUS_DOMAIN_CONTROLLER_NOT_FOUND"
  , "message":"A domain controller for this domain was not found."
  }
, "0xC0000234":{
    "code":"STATUS_ACCOUNT_LOCKED_OUT"
  , "message":"The user account has been automatically locked because too many invalid logon attempts or password change attempts have been requested."
  }
, "0xC0000235":{
    "code":"STATUS_HANDLE_NOT_CLOSABLE"
  , "message":"NtClose was called on a handle that was protected from close via NtSetInformationObject."
  }
, "0xC0000236":{
    "code":"STATUS_CONNECTION_REFUSED"
  , "message":"The transport-connection attempt was refused by the remote system."
  }
, "0xC0000237":{
    "code":"STATUS_GRACEFUL_DISCONNECT"
  , "message":"The transport connection was gracefully closed."
  }
, "0xC0000238":{
    "code":"STATUS_ADDRESS_ALREADY_ASSOCIATED"
  , "message":"The transport endpoint already has an address associated with it."
  }
, "0xC0000239":{
    "code":"STATUS_ADDRESS_NOT_ASSOCIATED"
  , "message":"An address has not yet been associated with the transport endpoint."
  }
, "0xC000023A":{
    "code":"STATUS_CONNECTION_INVALID"
  , "message":"An operation was attempted on a nonexistent transport connection."
  }
, "0xC000023B":{
    "code":"STATUS_CONNECTION_ACTIVE"
  , "message":"An invalid operation was attempted on an active transport connection."
  }
, "0xC000023C":{
    "code":"STATUS_NETWORK_UNREACHABLE"
  , "message":"The remote network is not reachable by the transport."
  }
, "0xC000023D":{
    "code":"STATUS_HOST_UNREACHABLE"
  , "message":"The remote system is not reachable by the transport."
  }
, "0xC000023E":{
    "code":"STATUS_PROTOCOL_UNREACHABLE"
  , "message":"The remote system does not support the transport protocol."
  }
, "0xC000023F":{
    "code":"STATUS_PORT_UNREACHABLE"
  , "message":"No service is operating at the destination port of the transport on the remote system."
  }
, "0xC0000240":{
    "code":"STATUS_REQUEST_ABORTED"
  , "message":"The request was aborted."
  }
, "0xC0000241":{
    "code":"STATUS_CONNECTION_ABORTED"
  , "message":"The transport connection was aborted by the local system."
  }
, "0xC0000242":{
    "code":"STATUS_BAD_COMPRESSION_BUFFER"
  , "message":"The specified buffer contains ill-formed data."
  }
, "0xC0000243":{
    "code":"STATUS_USER_MAPPED_FILE"
  , "message":"The requested operation cannot be performed on a file with a user mapped section open."
  }
, "0xC0000244":{
    "code":"STATUS_AUDIT_FAILED"
  , "message":"{Audit Failed} An attempt to generate a security audit failed."
  }
, "0xC0000245":{
    "code":"STATUS_TIMER_RESOLUTION_NOT_SET"
  , "message":"The timer resolution was not previously set by the current process."
  }
, "0xC0000246":{
    "code":"STATUS_CONNECTION_COUNT_LIMIT"
  , "message":"A connection to the server could not be made because the limit on the number of concurrent connections for this account has been reached."
  }
, "0xC0000247":{
    "code":"STATUS_LOGIN_TIME_RESTRICTION"
  , "message":"Attempting to log on during an unauthorized time of day for this account."
  }
, "0xC0000248":{
    "code":"STATUS_LOGIN_WKSTA_RESTRICTION"
  , "message":"The account is not authorized to log on from this station."
  }
, "0xC0000249":{
    "code":"STATUS_IMAGE_MP_UP_MISMATCH"
  , "message":"{UP/MP Image Mismatch} The image %hs has been modified for use on a uniprocessor system, but you are running it on a multiprocessor machine. Reinstall the image file."
  }
, "0xC0000250":{
    "code":"STATUS_INSUFFICIENT_LOGON_INFO"
  , "message":"There is insufficient account information to log you on."
  }
, "0xC0000251":{
    "code":"STATUS_BAD_DLL_ENTRYPOINT"
  , "message":"{Invalid DLL Entrypoint} The dynamic link library %hs is not written correctly. The stack pointer has been left in an inconsistent state. The entry point should be declared as WINAPI or STDCALL. Select YES to fail the DLL load. Select NO to continue execution. Selecting NO may cause the application to operate incorrectly."
  }
, "0xC0000252":{
    "code":"STATUS_BAD_SERVICE_ENTRYPOINT"
  , "message":"{Invalid Service Callback Entrypoint} The %hs service is not written correctly. The stack pointer has been left in an inconsistent state. The callback entry point should be declared as WINAPI or STDCALL. Selecting OK will cause the service to continue operation. However, the service process may operate incorrectly."
  }
, "0xC0000253":{
    "code":"STATUS_LPC_REPLY_LOST"
  , "message":"The server received the messages but did not send a reply."
  }
, "0xC0000254":{
    "code":"STATUS_IP_ADDRESS_CONFLICT1"
  , "message":"There is an IP address conflict with another system on the network."
  }
, "0xC0000255":{
    "code":"STATUS_IP_ADDRESS_CONFLICT2"
  , "message":"There is an IP address conflict with another system on the network."
  }
, "0xC0000256":{
    "code":"STATUS_REGISTRY_QUOTA_LIMIT"
  , "message":"{Low On Registry Space} The system has reached the maximum size that is allowed for the system part of the registry. Additional storage requests will be ignored."
  }
, "0xC0000257":{
    "code":"STATUS_PATH_NOT_COVERED"
  , "message":"The contacted server does not support the indicated part of the DFS namespace."
  }
, "0xC0000258":{
    "code":"STATUS_NO_CALLBACK_ACTIVE"
  , "message":"A callback return system service cannot be executed when no callback is active."
  }
, "0xC0000259":{
    "code":"STATUS_LICENSE_QUOTA_EXCEEDED"
  , "message":"The service being accessed is licensed for a particular number of connections. No more connections can be made to the service at this time because the service has already accepted the maximum number of connections."
  }
, "0xC000025A":{
    "code":"STATUS_PWD_TOO_SHORT"
  , "message":"The password provided is too short to meet the policy of your user account. Choose a longer password."
  }
, "0xC000025B":{
    "code":"STATUS_PWD_TOO_RECENT"
  , "message":"The policy of your user account does not allow you to change passwords too frequently. This is done to prevent users from changing back to a familiar, but potentially discovered, password. If you feel your password has been compromised, contact your administrator immediately to have a new one assigned."
  }
, "0xC000025C":{
    "code":"STATUS_PWD_HISTORY_CONFLICT"
  , "message":"You have attempted to change your password to one that you have used in the past. The policy of your user account does not allow this. Select a password that you have not previously used."
  }
, "0xC000025E":{
    "code":"STATUS_PLUGPLAY_NO_DEVICE"
  , "message":"You have attempted to load a legacy device driver while its device instance had been disabled."
  }
, "0xC000025F":{
    "code":"STATUS_UNSUPPORTED_COMPRESSION"
  , "message":"The specified compression format is unsupported."
  }
, "0xC0000260":{
    "code":"STATUS_INVALID_HW_PROFILE"
  , "message":"The specified hardware profile configuration is invalid."
  }
, "0xC0000261":{
    "code":"STATUS_INVALID_PLUGPLAY_DEVICE_PATH"
  , "message":"The specified Plug and Play registry device path is invalid."
  }
, "0xC0000262":{
    "code":"STATUS_DRIVER_ORDINAL_NOT_FOUND"
  , "message":"{Driver Entry Point Not Found} The %hs device driver could not locate the ordinal %ld in driver %hs."
  }
, "0xC0000263":{
    "code":"STATUS_DRIVER_ENTRYPOINT_NOT_FOUND"
  , "message":"{Driver Entry Point Not Found} The %hs device driver could not locate the entry point %hs in driver %hs."
  }
, "0xC0000264":{
    "code":"STATUS_RESOURCE_NOT_OWNED"
  , "message":"{Application Error} The application attempted to release a resource it did not own. Click OK to terminate the application."
  }
, "0xC0000265":{
    "code":"STATUS_TOO_MANY_LINKS"
  , "message":"An attempt was made to create more links on a file than the file system supports."
  }
, "0xC0000266":{
    "code":"STATUS_QUOTA_LIST_INCONSISTENT"
  , "message":"The specified quota list is internally inconsistent with its descriptor."
  }
, "0xC0000267":{
    "code":"STATUS_FILE_IS_OFFLINE"
  , "message":"The specified file has been relocated to offline storage."
  }
, "0xC0000268":{
    "code":"STATUS_EVALUATION_EXPIRATION"
  , "message":"{Windows Evaluation Notification} The evaluation period for this installation of Windows has expired. This system will shutdown in 1 hour. To restore access to this installation of Windows, upgrade this installation by using a licensed distribution of this product."
  }
, "0xC0000269":{
    "code":"STATUS_ILLEGAL_DLL_RELOCATION"
  , "message":"{Illegal System DLL Relocation} The system DLL %hs was relocated in memory. The application will not run properly. The relocation occurred because the DLL %hs occupied an address range that is reserved for Windows system DLLs. The vendor supplying the DLL should be contacted for a new DLL."
  }
, "0xC000026A":{
    "code":"STATUS_LICENSE_VIOLATION"
  , "message":"{License Violation} The system has detected tampering with your registered product type. This is a violation of your software license. Tampering with the product type is not permitted."
  }
, "0xC000026B":{
    "code":"STATUS_DLL_INIT_FAILED_LOGOFF"
  , "message":"{DLL Initialization Failed} The application failed to initialize because the window station is shutting down."
  }
, "0xC000026C":{
    "code":"STATUS_DRIVER_UNABLE_TO_LOAD"
  , "message":"{Unable to Load Device Driver} %hs device driver could not be loaded. Error Status was 0x%x."
  }
, "0xC000026D":{
    "code":"STATUS_DFS_UNAVAILABLE"
  , "message":"DFS is unavailable on the contacted server."
  }
, "0xC000026E":{
    "code":"STATUS_VOLUME_DISMOUNTED"
  , "message":"An operation was attempted to a volume after it was dismounted."
  }
, "0xC000026F":{
    "code":"STATUS_WX86_INTERNAL_ERROR"
  , "message":"An internal error occurred in the Win32 x86 emulation subsystem."
  }
, "0xC0000270":{
    "code":"STATUS_WX86_FLOAT_STACK_CHECK"
  , "message":"Win32 x86 emulation subsystem floating-point stack check."
  }
, "0xC0000271":{
    "code":"STATUS_VALIDATE_CONTINUE"
  , "message":"The validation process needs to continue on to the next step."
  }
, "0xC0000272":{
    "code":"STATUS_NO_MATCH"
  , "message":"There was no match for the specified key in the index."
  }
, "0xC0000273":{
    "code":"STATUS_NO_MORE_MATCHES"
  , "message":"There are no more matches for the current index enumeration."
  }
, "0xC0000275":{
    "code":"STATUS_NOT_A_REPARSE_POINT"
  , "message":"The NTFS file or directory is not a reparse point."
  }
, "0xC0000276":{
    "code":"STATUS_IO_REPARSE_TAG_INVALID"
  , "message":"The Windows I/O reparse tag passed for the NTFS reparse point is invalid."
  }
, "0xC0000277":{
    "code":"STATUS_IO_REPARSE_TAG_MISMATCH"
  , "message":"The Windows I/O reparse tag does not match the one that is in the NTFS reparse point."
  }
, "0xC0000278":{
    "code":"STATUS_IO_REPARSE_DATA_INVALID"
  , "message":"The user data passed for the NTFS reparse point is invalid."
  }
, "0xC0000279":{
    "code":"STATUS_IO_REPARSE_TAG_NOT_HANDLED"
  , "message":"The layered file system driver for this I/O tag did not handle it when needed."
  }
, "0xC0000280":{
    "code":"STATUS_REPARSE_POINT_NOT_RESOLVED"
  , "message":"The NTFS symbolic link could not be resolved even though the initial file name is valid."
  }
, "0xC0000281":{
    "code":"STATUS_DIRECTORY_IS_A_REPARSE_POINT"
  , "message":"The NTFS directory is a reparse point."
  }
, "0xC0000282":{
    "code":"STATUS_RANGE_LIST_CONFLICT"
  , "message":"The range could not be added to the range list because of a conflict."
  }
, "0xC0000283":{
    "code":"STATUS_SOURCE_ELEMENT_EMPTY"
  , "message":"The specified medium changer source element contains no media."
  }
, "0xC0000284":{
    "code":"STATUS_DESTINATION_ELEMENT_FULL"
  , "message":"The specified medium changer destination element already contains media."
  }
, "0xC0000285":{
    "code":"STATUS_ILLEGAL_ELEMENT_ADDRESS"
  , "message":"The specified medium changer element does not exist."
  }
, "0xC0000286":{
    "code":"STATUS_MAGAZINE_NOT_PRESENT"
  , "message":"The specified element is contained in a magazine that is no longer present."
  }
, "0xC0000287":{
    "code":"STATUS_REINITIALIZATION_NEEDED"
  , "message":"The device requires re-initialization due to hardware errors."
  }
, "0xC000028A":{
    "code":"STATUS_ENCRYPTION_FAILED"
  , "message":"The file encryption attempt failed."
  }
, "0xC000028B":{
    "code":"STATUS_DECRYPTION_FAILED"
  , "message":"The file decryption attempt failed."
  }
, "0xC000028C":{
    "code":"STATUS_RANGE_NOT_FOUND"
  , "message":"The specified range could not be found in the range list."
  }
, "0xC000028D":{
    "code":"STATUS_NO_RECOVERY_POLICY"
  , "message":"There is no encryption recovery policy configured for this system."
  }
, "0xC000028E":{
    "code":"STATUS_NO_EFS"
  , "message":"The required encryption driver is not loaded for this system."
  }
, "0xC000028F":{
    "code":"STATUS_WRONG_EFS"
  , "message":"The file was encrypted with a different encryption driver than is currently loaded."
  }
, "0xC0000290":{
    "code":"STATUS_NO_USER_KEYS"
  , "message":"There are no EFS keys defined for the user."
  }
, "0xC0000291":{
    "code":"STATUS_FILE_NOT_ENCRYPTED"
  , "message":"The specified file is not encrypted."
  }
, "0xC0000292":{
    "code":"STATUS_NOT_EXPORT_FORMAT"
  , "message":"The specified file is not in the defined EFS export format."
  }
, "0xC0000293":{
    "code":"STATUS_FILE_ENCRYPTED"
  , "message":"The specified file is encrypted and the user does not have the ability to decrypt it."
  }
, "0xC0000295":{
    "code":"STATUS_WMI_GUID_NOT_FOUND"
  , "message":"The GUID passed was not recognized as valid by a WMI data provider."
  }
, "0xC0000296":{
    "code":"STATUS_WMI_INSTANCE_NOT_FOUND"
  , "message":"The instance name passed was not recognized as valid by a WMI data provider."
  }
, "0xC0000297":{
    "code":"STATUS_WMI_ITEMID_NOT_FOUND"
  , "message":"The data item ID passed was not recognized as valid by a WMI data provider."
  }
, "0xC0000298":{
    "code":"STATUS_WMI_TRY_AGAIN"
  , "message":"The WMI request could not be completed and should be retried."
  }
, "0xC0000299":{
    "code":"STATUS_SHARED_POLICY"
  , "message":"The policy object is shared and can only be modified at the root."
  }
, "0xC000029A":{
    "code":"STATUS_POLICY_OBJECT_NOT_FOUND"
  , "message":"The policy object does not exist when it should."
  }
, "0xC000029B":{
    "code":"STATUS_POLICY_ONLY_IN_DS"
  , "message":"The requested policy information only lives in the Ds."
  }
, "0xC000029C":{
    "code":"STATUS_VOLUME_NOT_UPGRADED"
  , "message":"The volume must be upgraded to enable this feature."
  }
, "0xC000029D":{
    "code":"STATUS_REMOTE_STORAGE_NOT_ACTIVE"
  , "message":"The remote storage service is not operational at this time."
  }
, "0xC000029E":{
    "code":"STATUS_REMOTE_STORAGE_MEDIA_ERROR"
  , "message":"The remote storage service encountered a media error."
  }
, "0xC000029F":{
    "code":"STATUS_NO_TRACKING_SERVICE"
  , "message":"The tracking (workstation) service is not running."
  }
, "0xC00002A0":{
    "code":"STATUS_SERVER_SID_MISMATCH"
  , "message":"The server process is running under a SID that is different from the SID that is required by client."
  }
, "0xC00002A1":{
    "code":"STATUS_DS_NO_ATTRIBUTE_OR_VALUE"
  , "message":"The specified directory service attribute or value does not exist."
  }
, "0xC00002A2":{
    "code":"STATUS_DS_INVALID_ATTRIBUTE_SYNTAX"
  , "message":"The attribute syntax specified to the directory service is invalid."
  }
, "0xC00002A3":{
    "code":"STATUS_DS_ATTRIBUTE_TYPE_UNDEFINED"
  , "message":"The attribute type specified to the directory service is not defined."
  }
, "0xC00002A4":{
    "code":"STATUS_DS_ATTRIBUTE_OR_VALUE_EXISTS"
  , "message":"The specified directory service attribute or value already exists."
  }
, "0xC00002A5":{
    "code":"STATUS_DS_BUSY"
  , "message":"The directory service is busy."
  }
, "0xC00002A6":{
    "code":"STATUS_DS_UNAVAILABLE"
  , "message":"The directory service is unavailable."
  }
, "0xC00002A7":{
    "code":"STATUS_DS_NO_RIDS_ALLOCATED"
  , "message":"The directory service was unable to allocate a relative identifier."
  }
, "0xC00002A8":{
    "code":"STATUS_DS_NO_MORE_RIDS"
  , "message":"The directory service has exhausted the pool of relative identifiers."
  }
, "0xC00002A9":{
    "code":"STATUS_DS_INCORRECT_ROLE_OWNER"
  , "message":"The requested operation could not be performed because the directory service is not the master for that type of operation."
  }
, "0xC00002AA":{
    "code":"STATUS_DS_RIDMGR_INIT_ERROR"
  , "message":"The directory service was unable to initialize the subsystem that allocates relative identifiers."
  }
, "0xC00002AB":{
    "code":"STATUS_DS_OBJ_CLASS_VIOLATION"
  , "message":"The requested operation did not satisfy one or more constraints that are associated with the class of the object."
  }
, "0xC00002AC":{
    "code":"STATUS_DS_CANT_ON_NON_LEAF"
  , "message":"The directory service can perform the requested operation only on a leaf object."
  }
, "0xC00002AD":{
    "code":"STATUS_DS_CANT_ON_RDN"
  , "message":"The directory service cannot perform the requested operation on the Relatively Defined Name (RDN) attribute of an object."
  }
, "0xC00002AE":{
    "code":"STATUS_DS_CANT_MOD_OBJ_CLASS"
  , "message":"The directory service detected an attempt to modify the object class of an object."
  }
, "0xC00002AF":{
    "code":"STATUS_DS_CROSS_DOM_MOVE_FAILED"
  , "message":"An error occurred while performing a cross domain move operation."
  }
, "0xC00002B0":{
    "code":"STATUS_DS_GC_NOT_AVAILABLE"
  , "message":"Unable to contact the global catalog server."
  }
, "0xC00002B1":{
    "code":"STATUS_DIRECTORY_SERVICE_REQUIRED"
  , "message":"The requested operation requires a directory service, and none was available."
  }
, "0xC00002B2":{
    "code":"STATUS_REPARSE_ATTRIBUTE_CONFLICT"
  , "message":"The reparse attribute cannot be set because it is incompatible with an existing attribute."
  }
, "0xC00002B3":{
    "code":"STATUS_CANT_ENABLE_DENY_ONLY"
  , "message":"A group marked \"use for deny only\" cannot be enabled."
  }
, "0xC00002B4":{
    "code":"STATUS_FLOAT_MULTIPLE_FAULTS"
  , "message":"{EXCEPTION} Multiple floating-point faults."
  }
, "0xC00002B5":{
    "code":"STATUS_FLOAT_MULTIPLE_TRAPS"
  , "message":"{EXCEPTION} Multiple floating-point traps."
  }
, "0xC00002B6":{
    "code":"STATUS_DEVICE_REMOVED"
  , "message":"The device has been removed."
  }
, "0xC00002B7":{
    "code":"STATUS_JOURNAL_DELETE_IN_PROGRESS"
  , "message":"The volume change journal is being deleted."
  }
, "0xC00002B8":{
    "code":"STATUS_JOURNAL_NOT_ACTIVE"
  , "message":"The volume change journal is not active."
  }
, "0xC00002B9":{
    "code":"STATUS_NOINTERFACE"
  , "message":"The requested interface is not supported."
  }
, "0xC00002C1":{
    "code":"STATUS_DS_ADMIN_LIMIT_EXCEEDED"
  , "message":"A directory service resource limit has been exceeded."
  }
, "0xC00002C2":{
    "code":"STATUS_DRIVER_FAILED_SLEEP"
  , "message":"{System Standby Failed} The driver %hs does not support standby mode. Updating this driver may allow the system to go to standby mode."
  }
, "0xC00002C3":{
    "code":"STATUS_MUTUAL_AUTHENTICATION_FAILED"
  , "message":"Mutual Authentication failed. The server password is out of date at the domain controller."
  }
, "0xC00002C4":{
    "code":"STATUS_CORRUPT_SYSTEM_FILE"
  , "message":"The system file %1 has become corrupt and has been replaced."
  }
, "0xC00002C5":{
    "code":"STATUS_DATATYPE_MISALIGNMENT_ERROR"
  , "message":"{EXCEPTION} Alignment Error A data type misalignment error was detected in a load or store instruction."
  }
, "0xC00002C6":{
    "code":"STATUS_WMI_READ_ONLY"
  , "message":"The WMI data item or data block is read-only."
  }
, "0xC00002C7":{
    "code":"STATUS_WMI_SET_FAILURE"
  , "message":"The WMI data item or data block could not be changed."
  }
, "0xC00002C8":{
    "code":"STATUS_COMMITMENT_MINIMUM"
  , "message":"{Virtual Memory Minimum Too Low} Your system is low on virtual memory. Windows is increasing the size of your virtual memory paging file. During this process, memory requests for some applications may be denied. For more information, see Help."
  }
, "0xC00002C9":{
    "code":"STATUS_REG_NAT_CONSUMPTION"
  , "message":"{EXCEPTION} Register NaT consumption faults. A NaT value is consumed on a non-speculative instruction."
  }
, "0xC00002CA":{
    "code":"STATUS_TRANSPORT_FULL"
  , "message":"The transport element of the medium changer contains media, which is causing the operation to fail."
  }
, "0xC00002CB":{
    "code":"STATUS_DS_SAM_INIT_FAILURE"
  , "message":"Security Accounts Manager initialization failed because of the following error: %hs Error Status: 0x%x. Click OK to shut down this system and restart in Directory Services Restore Mode. Check the event log for more detailed information."
  }
, "0xC00002CC":{
    "code":"STATUS_ONLY_IF_CONNECTED"
  , "message":"This operation is supported only when you are connected to the server."
  }
, "0xC00002CD":{
    "code":"STATUS_DS_SENSITIVE_GROUP_VIOLATION"
  , "message":"Only an administrator can modify the membership list of an administrative group."
  }
, "0xC00002CE":{
    "code":"STATUS_PNP_RESTART_ENUMERATION"
  , "message":"A device was removed so enumeration must be restarted."
  }
, "0xC00002CF":{
    "code":"STATUS_JOURNAL_ENTRY_DELETED"
  , "message":"The journal entry has been deleted from the journal."
  }
, "0xC00002D0":{
    "code":"STATUS_DS_CANT_MOD_PRIMARYGROUPID"
  , "message":"Cannot change the primary group ID of a domain controller account."
  }
, "0xC00002D1":{
    "code":"STATUS_SYSTEM_IMAGE_BAD_SIGNATURE"
  , "message":"{Fatal System Error} The system image %s is not properly signed. The file has been replaced with the signed file. The system has been shut down."
  }
, "0xC00002D2":{
    "code":"STATUS_PNP_REBOOT_REQUIRED"
  , "message":"The device will not start without a reboot."
  }
, "0xC00002D3":{
    "code":"STATUS_POWER_STATE_INVALID"
  , "message":"The power state of the current device cannot support this request."
  }
, "0xC00002D4":{
    "code":"STATUS_DS_INVALID_GROUP_TYPE"
  , "message":"The specified group type is invalid."
  }
, "0xC00002D5":{
    "code":"STATUS_DS_NO_NEST_GLOBALGROUP_IN_MIXEDDOMAIN"
  , "message":"In a mixed domain, no nesting of a global group if the group is security enabled."
  }
, "0xC00002D6":{
    "code":"STATUS_DS_NO_NEST_LOCALGROUP_IN_MIXEDDOMAIN"
  , "message":"In a mixed domain, cannot nest local groups with other local groups, if the group is security enabled."
  }
, "0xC00002D7":{
    "code":"STATUS_DS_GLOBAL_CANT_HAVE_LOCAL_MEMBER"
  , "message":"A global group cannot have a local group as a member."
  }
, "0xC00002D8":{
    "code":"STATUS_DS_GLOBAL_CANT_HAVE_UNIVERSAL_MEMBER"
  , "message":"A global group cannot have a universal group as a member."
  }
, "0xC00002D9":{
    "code":"STATUS_DS_UNIVERSAL_CANT_HAVE_LOCAL_MEMBER"
  , "message":"A universal group cannot have a local group as a member."
  }
, "0xC00002DA":{
    "code":"STATUS_DS_GLOBAL_CANT_HAVE_CROSSDOMAIN_MEMBER"
  , "message":"A global group cannot have a cross-domain member."
  }
, "0xC00002DB":{
    "code":"STATUS_DS_LOCAL_CANT_HAVE_CROSSDOMAIN_LOCAL_MEMBER"
  , "message":"A local group cannot have another cross-domain local group as a member."
  }
, "0xC00002DC":{
    "code":"STATUS_DS_HAVE_PRIMARY_MEMBERS"
  , "message":"Cannot change to a security-disabled group because primary members are in this group."
  }
, "0xC00002DD":{
    "code":"STATUS_WMI_NOT_SUPPORTED"
  , "message":"The WMI operation is not supported by the data block or method."
  }
, "0xC00002DE":{
    "code":"STATUS_INSUFFICIENT_POWER"
  , "message":"There is not enough power to complete the requested operation."
  }
, "0xC00002DF":{
    "code":"STATUS_SAM_NEED_BOOTKEY_PASSWORD"
  , "message":"The Security Accounts Manager needs to get the boot password."
  }
, "0xC00002E0":{
    "code":"STATUS_SAM_NEED_BOOTKEY_FLOPPY"
  , "message":"The Security Accounts Manager needs to get the boot key from the floppy disk."
  }
, "0xC00002E1":{
    "code":"STATUS_DS_CANT_START"
  , "message":"The directory service cannot start."
  }
, "0xC00002E2":{
    "code":"STATUS_DS_INIT_FAILURE"
  , "message":"The directory service could not start because of the following error: %hs Error Status: 0x%x. Click OK to shut down this system and restart in Directory Services Restore Mode. Check the event log for more detailed information."
  }
, "0xC00002E3":{
    "code":"STATUS_SAM_INIT_FAILURE"
  , "message":"The Security Accounts Manager initialization failed because of the following error: %hs Error Status: 0x%x. Click OK to shut down this system and restart in Safe Mode. Check the event log for more detailed information."
  }
, "0xC00002E4":{
    "code":"STATUS_DS_GC_REQUIRED"
  , "message":"The requested operation can be performed only on a global catalog server."
  }
, "0xC00002E5":{
    "code":"STATUS_DS_LOCAL_MEMBER_OF_LOCAL_ONLY"
  , "message":"A local group can only be a member of other local groups in the same domain."
  }
, "0xC00002E6":{
    "code":"STATUS_DS_NO_FPO_IN_UNIVERSAL_GROUPS"
  , "message":"Foreign security principals cannot be members of universal groups."
  }
, "0xC00002E7":{
    "code":"STATUS_DS_MACHINE_ACCOUNT_QUOTA_EXCEEDED"
  , "message":"Your computer could not be joined to the domain. You have exceeded the maximum number of computer accounts you are allowed to create in this domain. Contact your system administrator to have this limit reset or increased."
  }
, "0xC00002E9":{
    "code":"STATUS_CURRENT_DOMAIN_NOT_ALLOWED"
  , "message":"This operation cannot be performed on the current domain."
  }
, "0xC00002EA":{
    "code":"STATUS_CANNOT_MAKE"
  , "message":"The directory or file cannot be created."
  }
, "0xC00002EB":{
    "code":"STATUS_SYSTEM_SHUTDOWN"
  , "message":"The system is in the process of shutting down."
  }
, "0xC00002EC":{
    "code":"STATUS_DS_INIT_FAILURE_CONSOLE"
  , "message":"Directory Services could not start because of the following error: %hs Error Status: 0x%x. Click OK to shut down the system. You can use the recovery console to diagnose the system further."
  }
, "0xC00002ED":{
    "code":"STATUS_DS_SAM_INIT_FAILURE_CONSOLE"
  , "message":"Security Accounts Manager initialization failed because of the following error: %hs Error Status: 0x%x. Click OK to shut down the system. You can use the recovery console to diagnose the system further."
  }
, "0xC00002EE":{
    "code":"STATUS_UNFINISHED_CONTEXT_DELETED"
  , "message":"A security context was deleted before the context was completed. This is considered a logon failure."
  }
, "0xC00002EF":{
    "code":"STATUS_NO_TGT_REPLY"
  , "message":"The client is trying to negotiate a context and the server requires user-to-user but did not send a TGT reply."
  }
, "0xC00002F0":{
    "code":"STATUS_OBJECTID_NOT_FOUND"
  , "message":"An object ID was not found in the file."
  }
, "0xC00002F1":{
    "code":"STATUS_NO_IP_ADDRESSES"
  , "message":"Unable to accomplish the requested task because the local machine does not have any IP addresses."
  }
, "0xC00002F2":{
    "code":"STATUS_WRONG_CREDENTIAL_HANDLE"
  , "message":"The supplied credential handle does not match the credential that is associated with the security context."
  }
, "0xC00002F3":{
    "code":"STATUS_CRYPTO_SYSTEM_INVALID"
  , "message":"The crypto system or checksum function is invalid because a required function is unavailable."
  }
, "0xC00002F4":{
    "code":"STATUS_MAX_REFERRALS_EXCEEDED"
  , "message":"The number of maximum ticket referrals has been exceeded."
  }
, "0xC00002F5":{
    "code":"STATUS_MUST_BE_KDC"
  , "message":"The local machine must be a Kerberos KDC (domain controller) and it is not."
  }
, "0xC00002F6":{
    "code":"STATUS_STRONG_CRYPTO_NOT_SUPPORTED"
  , "message":"The other end of the security negotiation requires strong crypto but it is not supported on the local machine."
  }
, "0xC00002F7":{
    "code":"STATUS_TOO_MANY_PRINCIPALS"
  , "message":"The KDC reply contained more than one principal name."
  }
, "0xC00002F8":{
    "code":"STATUS_NO_PA_DATA"
  , "message":"Expected to find PA data for a hint of what etype to use, but it was not found."
  }
, "0xC00002F9":{
    "code":"STATUS_PKINIT_NAME_MISMATCH"
  , "message":"The client certificate does not contain a valid UPN, or does not match the client name in the logon request. Contact your administrator."
  }
, "0xC00002FA":{
    "code":"STATUS_SMARTCARD_LOGON_REQUIRED"
  , "message":"Smart card logon is required and was not used."
  }
, "0xC00002FB":{
    "code":"STATUS_KDC_INVALID_REQUEST"
  , "message":"An invalid request was sent to the KDC."
  }
, "0xC00002FC":{
    "code":"STATUS_KDC_UNABLE_TO_REFER"
  , "message":"The KDC was unable to generate a referral for the service requested."
  }
, "0xC00002FD":{
    "code":"STATUS_KDC_UNKNOWN_ETYPE"
  , "message":"The encryption type requested is not supported by the KDC."
  }
, "0xC00002FE":{
    "code":"STATUS_SHUTDOWN_IN_PROGRESS"
  , "message":"A system shutdown is in progress."
  }
, "0xC00002FF":{
    "code":"STATUS_SERVER_SHUTDOWN_IN_PROGRESS"
  , "message":"The server machine is shutting down."
  }
, "0xC0000300":{
    "code":"STATUS_NOT_SUPPORTED_ON_SBS"
  , "message":"This operation is not supported on a computer running Windows Server 2003 for Small Business Server."
  }
, "0xC0000301":{
    "code":"STATUS_WMI_GUID_DISCONNECTED"
  , "message":"The WMI GUID is no longer available."
  }
, "0xC0000302":{
    "code":"STATUS_WMI_ALREADY_DISABLED"
  , "message":"Collection or events for the WMI GUID is already disabled."
  }
, "0xC0000303":{
    "code":"STATUS_WMI_ALREADY_ENABLED"
  , "message":"Collection or events for the WMI GUID is already enabled."
  }
, "0xC0000304":{
    "code":"STATUS_MFT_TOO_FRAGMENTED"
  , "message":"The master file table on the volume is too fragmented to complete this operation."
  }
, "0xC0000305":{
    "code":"STATUS_COPY_PROTECTION_FAILURE"
  , "message":"Copy protection failure."
  }
, "0xC0000306":{
    "code":"STATUS_CSS_AUTHENTICATION_FAILURE"
  , "message":"Copy protection error—DVD CSS Authentication failed."
  }
, "0xC0000307":{
    "code":"STATUS_CSS_KEY_NOT_PRESENT"
  , "message":"Copy protection error—The specified sector does not contain a valid key."
  }
, "0xC0000308":{
    "code":"STATUS_CSS_KEY_NOT_ESTABLISHED"
  , "message":"Copy protection error—DVD session key not established."
  }
, "0xC0000309":{
    "code":"STATUS_CSS_SCRAMBLED_SECTOR"
  , "message":"Copy protection error—The read failed because the sector is encrypted."
  }
, "0xC000030A":{
    "code":"STATUS_CSS_REGION_MISMATCH"
  , "message":"Copy protection error—The region of the specified DVD does not correspond to the region setting of the drive."
  }
, "0xC000030B":{
    "code":"STATUS_CSS_RESETS_EXHAUSTED"
  , "message":"Copy protection error—The region setting of the drive may be permanent."
  }
, "0xC0000320":{
    "code":"STATUS_PKINIT_FAILURE"
  , "message":"The Kerberos protocol encountered an error while validating the KDC certificate during smart card logon. There is more information in the system event log."
  }
, "0xC0000321":{
    "code":"STATUS_SMARTCARD_SUBSYSTEM_FAILURE"
  , "message":"The Kerberos protocol encountered an error while attempting to use the smart card subsystem."
  }
, "0xC0000322":{
    "code":"STATUS_NO_KERB_KEY"
  , "message":"The target server does not have acceptable Kerberos credentials."
  }
, "0xC0000350":{
    "code":"STATUS_HOST_DOWN"
  , "message":"The transport determined that the remote system is down."
  }
, "0xC0000351":{
    "code":"STATUS_UNSUPPORTED_PREAUTH"
  , "message":"An unsupported pre-authentication mechanism was presented to the Kerberos package."
  }
, "0xC0000352":{
    "code":"STATUS_EFS_ALG_BLOB_TOO_BIG"
  , "message":"The encryption algorithm that is used on the source file needs a bigger key buffer than the one that is used on the destination file."
  }
, "0xC0000353":{
    "code":"STATUS_PORT_NOT_SET"
  , "message":"An attempt to remove a processes DebugPort was made, but a port was not already associated with the process."
  }
, "0xC0000354":{
    "code":"STATUS_DEBUGGER_INACTIVE"
  , "message":"An attempt to do an operation on a debug port failed because the port is in the process of being deleted."
  }
, "0xC0000355":{
    "code":"STATUS_DS_VERSION_CHECK_FAILURE"
  , "message":"This version of Windows is not compatible with the behavior version of the directory forest, domain, or domain controller."
  }
, "0xC0000356":{
    "code":"STATUS_AUDITING_DISABLED"
  , "message":"The specified event is currently not being audited."
  }
, "0xC0000357":{
    "code":"STATUS_PRENT4_MACHINE_ACCOUNT"
  , "message":"The machine account was created prior to Windows NT 4.0. The account needs to be recreated."
  }
, "0xC0000358":{
    "code":"STATUS_DS_AG_CANT_HAVE_UNIVERSAL_MEMBER"
  , "message":"An account group cannot have a universal group as a member."
  }
, "0xC0000359":{
    "code":"STATUS_INVALID_IMAGE_WIN_32"
  , "message":"The specified image file did not have the correct format; it appears to be a 32-bit Windows image."
  }
, "0xC000035A":{
    "code":"STATUS_INVALID_IMAGE_WIN_64"
  , "message":"The specified image file did not have the correct format; it appears to be a 64-bit Windows image."
  }
, "0xC000035B":{
    "code":"STATUS_BAD_BINDINGS"
  , "message":"The client\'s supplied SSPI channel bindings were incorrect."
  }
, "0xC000035C":{
    "code":"STATUS_NETWORK_SESSION_EXPIRED"
  , "message":"The client session has expired; so the client must re-authenticate to continue accessing the remote resources."
  }
, "0xC000035D":{
    "code":"STATUS_APPHELP_BLOCK"
  , "message":"The AppHelp dialog box canceled; thus preventing the application from starting."
  }
, "0xC000035E":{
    "code":"STATUS_ALL_SIDS_FILTERED"
  , "message":"The SID filtering operation removed all SIDs."
  }
, "0xC000035F":{
    "code":"STATUS_NOT_SAFE_MODE_DRIVER"
  , "message":"The driver was not loaded because the system is starting in safe mode."
  }
, "0xC0000361":{
    "code":"STATUS_ACCESS_DISABLED_BY_POLICY_DEFAULT"
  , "message":"Access to %1 has been restricted by your Administrator by the default software restriction policy level."
  }
, "0xC0000362":{
    "code":"STATUS_ACCESS_DISABLED_BY_POLICY_PATH"
  , "message":"Access to %1 has been restricted by your Administrator by location with policy rule %2 placed on path %3."
  }
, "0xC0000363":{
    "code":"STATUS_ACCESS_DISABLED_BY_POLICY_PUBLISHER"
  , "message":"Access to %1 has been restricted by your Administrator by software publisher policy."
  }
, "0xC0000364":{
    "code":"STATUS_ACCESS_DISABLED_BY_POLICY_OTHER"
  , "message":"Access to %1 has been restricted by your Administrator by policy rule %2."
  }
, "0xC0000365":{
    "code":"STATUS_FAILED_DRIVER_ENTRY"
  , "message":"The driver was not loaded because it failed its initialization call."
  }
, "0xC0000366":{
    "code":"STATUS_DEVICE_ENUMERATION_ERROR"
  , "message":"The device encountered an error while applying power or reading the device configuration. This may be caused by a failure of your hardware or by a poor connection."
  }
, "0xC0000368":{
    "code":"STATUS_MOUNT_POINT_NOT_RESOLVED"
  , "message":"The create operation failed because the name contained at least one mount point that resolves to a volume to which the specified device object is not attached."
  }
, "0xC0000369":{
    "code":"STATUS_INVALID_DEVICE_OBJECT_PARAMETER"
  , "message":"The device object parameter is either not a valid device object or is not attached to the volume that is specified by the file name."
  }
, "0xC000036A":{
    "code":"STATUS_MCA_OCCURED"
  , "message":"A machine check error has occurred. Check the system event log for additional information."
  }
, "0xC000036B":{
    "code":"STATUS_DRIVER_BLOCKED_CRITICAL"
  , "message":"Driver %2 has been blocked from loading."
  }
, "0xC000036C":{
    "code":"STATUS_DRIVER_BLOCKED"
  , "message":"Driver %2 has been blocked from loading."
  }
, "0xC000036D":{
    "code":"STATUS_DRIVER_DATABASE_ERROR"
  , "message":"There was error [%2] processing the driver database."
  }
, "0xC000036E":{
    "code":"STATUS_SYSTEM_HIVE_TOO_LARGE"
  , "message":"System hive size has exceeded its limit."
  }
, "0xC000036F":{
    "code":"STATUS_INVALID_IMPORT_OF_NON_DLL"
  , "message":"A dynamic link library (DLL) referenced a module that was neither a DLL nor the process\'s executable image."
  }
, "0xC0000371":{
    "code":"STATUS_NO_SECRETS"
  , "message":"The local account store does not contain secret material for the specified account."
  }
, "0xC0000372":{
    "code":"STATUS_ACCESS_DISABLED_NO_SAFER_UI_BY_POLICY"
  , "message":"Access to %1 has been restricted by your Administrator by policy rule %2."
  }
, "0xC0000373":{
    "code":"STATUS_FAILED_STACK_SWITCH"
  , "message":"The system was not able to allocate enough memory to perform a stack switch."
  }
, "0xC0000374":{
    "code":"STATUS_HEAP_CORRUPTION"
  , "message":"A heap has been corrupted."
  }
, "0xC0000380":{
    "code":"STATUS_SMARTCARD_WRONG_PIN"
  , "message":"An incorrect PIN was presented to the smart card."
  }
, "0xC0000381":{
    "code":"STATUS_SMARTCARD_CARD_BLOCKED"
  , "message":"The smart card is blocked."
  }
, "0xC0000382":{
    "code":"STATUS_SMARTCARD_CARD_NOT_AUTHENTICATED"
  , "message":"No PIN was presented to the smart card."
  }
, "0xC0000383":{
    "code":"STATUS_SMARTCARD_NO_CARD"
  , "message":"No smart card is available."
  }
, "0xC0000384":{
    "code":"STATUS_SMARTCARD_NO_KEY_CONTAINER"
  , "message":"The requested key container does not exist on the smart card."
  }
, "0xC0000385":{
    "code":"STATUS_SMARTCARD_NO_CERTIFICATE"
  , "message":"The requested certificate does not exist on the smart card."
  }
, "0xC0000386":{
    "code":"STATUS_SMARTCARD_NO_KEYSET"
  , "message":"The requested keyset does not exist."
  }
, "0xC0000387":{
    "code":"STATUS_SMARTCARD_IO_ERROR"
  , "message":"A communication error with the smart card has been detected."
  }
, "0xC0000388":{
    "code":"STATUS_DOWNGRADE_DETECTED"
  , "message":"The system detected a possible attempt to compromise security. Ensure that you can contact the server that authenticated you."
  }
, "0xC0000389":{
    "code":"STATUS_SMARTCARD_CERT_REVOKED"
  , "message":"The smart card certificate used for authentication has been revoked. Contact your system administrator. There may be additional information in the event log."
  }
, "0xC000038A":{
    "code":"STATUS_ISSUING_CA_UNTRUSTED"
  , "message":"An untrusted certificate authority was detected while processing the smart card certificate that is used for authentication. Contact your system administrator."
  }
, "0xC000038B":{
    "code":"STATUS_REVOCATION_OFFLINE_C"
  , "message":"The revocation status of the smart card certificate that is used for authentication could not be determined. Contact your system administrator."
  }
, "0xC000038C":{
    "code":"STATUS_PKINIT_CLIENT_FAILURE"
  , "message":"The smart card certificate used for authentication was not trusted. Contact your system administrator."
  }
, "0xC000038D":{
    "code":"STATUS_SMARTCARD_CERT_EXPIRED"
  , "message":"The smart card certificate used for authentication has expired. Contact your system administrator."
  }
, "0xC000038E":{
    "code":"STATUS_DRIVER_FAILED_PRIOR_UNLOAD"
  , "message":"The driver could not be loaded because a previous version of the driver is still in memory."
  }
, "0xC000038F":{
    "code":"STATUS_SMARTCARD_SILENT_CONTEXT"
  , "message":"The smart card provider could not perform the action because the context was acquired as silent."
  }
, "0xC0000401":{
    "code":"STATUS_PER_USER_TRUST_QUOTA_EXCEEDED"
  , "message":"The delegated trust creation quota of the current user has been exceeded."
  }
, "0xC0000402":{
    "code":"STATUS_ALL_USER_TRUST_QUOTA_EXCEEDED"
  , "message":"The total delegated trust creation quota has been exceeded."
  }
, "0xC0000403":{
    "code":"STATUS_USER_DELETE_TRUST_QUOTA_EXCEEDED"
  , "message":"The delegated trust deletion quota of the current user has been exceeded."
  }
, "0xC0000404":{
    "code":"STATUS_DS_NAME_NOT_UNIQUE"
  , "message":"The requested name already exists as a unique identifier."
  }
, "0xC0000405":{
    "code":"STATUS_DS_DUPLICATE_ID_FOUND"
  , "message":"The requested object has a non-unique identifier and cannot be retrieved."
  }
, "0xC0000406":{
    "code":"STATUS_DS_GROUP_CONVERSION_ERROR"
  , "message":"The group cannot be converted due to attribute restrictions on the requested group type."
  }
, "0xC0000407":{
    "code":"STATUS_VOLSNAP_PREPARE_HIBERNATE"
  , "message":"{Volume Shadow Copy Service} Wait while the Volume Shadow Copy Service prepares volume %hs for hibernation."
  }
, "0xC0000408":{
    "code":"STATUS_USER2USER_REQUIRED"
  , "message":"Kerberos sub-protocol User2User is required."
  }
, "0xC0000409":{
    "code":"STATUS_STACK_BUFFER_OVERRUN"
  , "message":"The system detected an overrun of a stack-based buffer in this application. This overrun could potentially allow a malicious user to gain control of this application."
  }
, "0xC000040A":{
    "code":"STATUS_NO_S4U_PROT_SUPPORT"
  , "message":"The Kerberos subsystem encountered an error. A service for user protocol request was made against a domain controller which does not support service for user."
  }
, "0xC000040B":{
    "code":"STATUS_CROSSREALM_DELEGATION_FAILURE"
  , "message":"An attempt was made by this server to make a Kerberos constrained delegation request for a target that is outside the server realm. This action is not supported and the resulting error indicates a misconfiguration on the allowed-to-delegate-to list for this server. Contact your administrator."
  }
, "0xC000040C":{
    "code":"STATUS_REVOCATION_OFFLINE_KDC"
  , "message":"The revocation status of the domain controller certificate used for smart card authentication could not be determined. There is additional information in the system event log. Contact your system administrator."
  }
, "0xC000040D":{
    "code":"STATUS_ISSUING_CA_UNTRUSTED_KDC"
  , "message":"An untrusted certificate authority was detected while processing the domain controller certificate used for authentication. There is additional information in the system event log. Contact your system administrator."
  }
, "0xC000040E":{
    "code":"STATUS_KDC_CERT_EXPIRED"
  , "message":"The domain controller certificate used for smart card logon has expired. Contact your system administrator with the contents of your system event log."
  }
, "0xC000040F":{
    "code":"STATUS_KDC_CERT_REVOKED"
  , "message":"The domain controller certificate used for smart card logon has been revoked. Contact your system administrator with the contents of your system event log."
  }
, "0xC0000410":{
    "code":"STATUS_PARAMETER_QUOTA_EXCEEDED"
  , "message":"Data present in one of the parameters is more than the function can operate on."
  }
, "0xC0000411":{
    "code":"STATUS_HIBERNATION_FAILURE"
  , "message":"The system has failed to hibernate (The error code is %hs). Hibernation will be disabled until the system is restarted."
  }
, "0xC0000412":{
    "code":"STATUS_DELAY_LOAD_FAILED"
  , "message":"An attempt to delay-load a .dll or get a function address in a delay-loaded .dll failed."
  }
, "0xC0000413":{
    "code":"STATUS_AUTHENTICATION_FIREWALL_FAILED"
  , "message":"Logon Failure: The machine you are logging onto is protected by an authentication firewall. The specified account is not allowed to authenticate to the machine."
  }
, "0xC0000414":{
    "code":"STATUS_VDM_DISALLOWED"
  , "message":"%hs is a 16-bit application. You do not have permissions to execute 16-bit applications. Check your permissions with your system administrator."
  }
, "0xC0000415":{
    "code":"STATUS_HUNG_DISPLAY_DRIVER_THREAD"
  , "message":"{Display Driver Stopped Responding} The %hs display driver has stopped working normally. Save your work and reboot the system to restore full display functionality. The next time you reboot the machine a dialog will be displayed giving you a chance to report this failure to Microsoft."
  }
, "0xC0000416":{
    "code":"STATUS_INSUFFICIENT_RESOURCE_FOR_SPECIFIED_SHARED_SECTION_SIZE"
  , "message":"The Desktop heap encountered an error while allocating session memory. There is more information in the system event log."
  }
, "0xC0000417":{
    "code":"STATUS_INVALID_CRUNTIME_PARAMETER"
  , "message":"An invalid parameter was passed to a C runtime function."
  }
, "0xC0000418":{
    "code":"STATUS_NTLM_BLOCKED"
  , "message":"The authentication failed because NTLM was blocked."
  }
, "0xC0000419":{
    "code":"STATUS_DS_SRC_SID_EXISTS_IN_FOREST"
  , "message":"The source object\'s SID already exists in destination forest."
  }
, "0xC000041A":{
    "code":"STATUS_DS_DOMAIN_NAME_EXISTS_IN_FOREST"
  , "message":"The domain name of the trusted domain already exists in the forest."
  }
, "0xC000041B":{
    "code":"STATUS_DS_FLAT_NAME_EXISTS_IN_FOREST"
  , "message":"The flat name of the trusted domain already exists in the forest."
  }
, "0xC000041C":{
    "code":"STATUS_INVALID_USER_PRINCIPAL_NAME"
  , "message":"The User Principal Name (UPN) is invalid."
  }
, "0xC0000420":{
    "code":"STATUS_ASSERTION_FAILURE"
  , "message":"There has been an assertion failure."
  }
, "0xC0000421":{
    "code":"STATUS_VERIFIER_STOP"
  , "message":"Application verifier has found an error in the current process."
  }
, "0xC0000423":{
    "code":"STATUS_CALLBACK_POP_STACK"
  , "message":"A user mode unwind is in progress."
  }
, "0xC0000424":{
    "code":"STATUS_INCOMPATIBLE_DRIVER_BLOCKED"
  , "message":"%2 has been blocked from loading due to incompatibility with this system. Contact your software vendor for a compatible version of the driver."
  }
, "0xC0000425":{
    "code":"STATUS_HIVE_UNLOADED"
  , "message":"Illegal operation attempted on a registry key which has already been unloaded."
  }
, "0xC0000426":{
    "code":"STATUS_COMPRESSION_DISABLED"
  , "message":"Compression is disabled for this volume."
  }
, "0xC0000427":{
    "code":"STATUS_FILE_SYSTEM_LIMITATION"
  , "message":"The requested operation could not be completed due to a file system limitation."
  }
, "0xC0000428":{
    "code":"STATUS_INVALID_IMAGE_HASH"
  , "message":"The hash for image %hs cannot be found in the system catalogs. The image is likely corrupt or the victim of tampering."
  }
, "0xC0000429":{
    "code":"STATUS_NOT_CAPABLE"
  , "message":"The implementation is not capable of performing the request."
  }
, "0xC000042A":{
    "code":"STATUS_REQUEST_OUT_OF_SEQUENCE"
  , "message":"The requested operation is out of order with respect to other operations."
  }
, "0xC000042B":{
    "code":"STATUS_IMPLEMENTATION_LIMIT"
  , "message":"An operation attempted to exceed an implementation-defined limit."
  }
, "0xC000042C":{
    "code":"STATUS_ELEVATION_REQUIRED"
  , "message":"The requested operation requires elevation."
  }
, "0xC000042D":{
    "code":"STATUS_NO_SECURITY_CONTEXT"
  , "message":"The required security context does not exist."
  }
, "0xC000042E":{
    "code":"STATUS_PKU2U_CERT_FAILURE"
  , "message":"The PKU2U protocol encountered an error while attempting to utilize the associated certificates."
  }
, "0xC0000432":{
    "code":"STATUS_BEYOND_VDL"
  , "message":"The operation was attempted beyond the valid data length of the file."
  }
, "0xC0000433":{
    "code":"STATUS_ENCOUNTERED_WRITE_IN_PROGRESS"
  , "message":"The attempted write operation encountered a write already in progress for some portion of the range."
  }
, "0xC0000434":{
    "code":"STATUS_PTE_CHANGED"
  , "message":"The page fault mappings changed in the middle of processing a fault so the operation must be retried."
  }
, "0xC0000435":{
    "code":"STATUS_PURGE_FAILED"
  , "message":"The attempt to purge this file from memory failed to purge some or all the data from memory."
  }
, "0xC0000440":{
    "code":"STATUS_CRED_REQUIRES_CONFIRMATION"
  , "message":"The requested credential requires confirmation."
  }
, "0xC0000441":{
    "code":"STATUS_CS_ENCRYPTION_INVALID_SERVER_RESPONSE"
  , "message":"The remote server sent an invalid response for a file being opened with Client Side Encryption."
  }
, "0xC0000442":{
    "code":"STATUS_CS_ENCRYPTION_UNSUPPORTED_SERVER"
  , "message":"Client Side Encryption is not supported by the remote server even though it claims to support it."
  }
, "0xC0000443":{
    "code":"STATUS_CS_ENCRYPTION_EXISTING_ENCRYPTED_FILE"
  , "message":"File is encrypted and should be opened in Client Side Encryption mode."
  }
, "0xC0000444":{
    "code":"STATUS_CS_ENCRYPTION_NEW_ENCRYPTED_FILE"
  , "message":"A new encrypted file is being created and a $EFS needs to be provided."
  }
, "0xC0000445":{
    "code":"STATUS_CS_ENCRYPTION_FILE_NOT_CSE"
  , "message":"The SMB client requested a CSE FSCTL on a non-CSE file."
  }
, "0xC0000446":{
    "code":"STATUS_INVALID_LABEL"
  , "message":"Indicates a particular Security ID may not be assigned as the label of an object."
  }
, "0xC0000450":{
    "code":"STATUS_DRIVER_PROCESS_TERMINATED"
  , "message":"The process hosting the driver for this device has terminated."
  }
, "0xC0000451":{
    "code":"STATUS_AMBIGUOUS_SYSTEM_DEVICE"
  , "message":"The requested system device cannot be identified due to multiple indistinguishable devices potentially matching the identification criteria."
  }
, "0xC0000452":{
    "code":"STATUS_SYSTEM_DEVICE_NOT_FOUND"
  , "message":"The requested system device cannot be found."
  }
, "0xC0000453":{
    "code":"STATUS_RESTART_BOOT_APPLICATION"
  , "message":"This boot application must be restarted."
  }
, "0xC0000454":{
    "code":"STATUS_INSUFFICIENT_NVRAM_RESOURCES"
  , "message":"Insufficient NVRAM resources exist to complete the API. A reboot might be required."
  }
, "0xC0000460":{
    "code":"STATUS_NO_RANGES_PROCESSED"
  , "message":"No ranges for the specified operation were able to be processed."
  }
, "0xC0000463":{
    "code":"STATUS_DEVICE_FEATURE_NOT_SUPPORTED"
  , "message":"The storage device does not support Offload Write."
  }
, "0xC0000464":{
    "code":"STATUS_DEVICE_UNREACHABLE"
  , "message":"Data cannot be moved because the source device cannot communicate with the destination device."
  }
, "0xC0000465":{
    "code":"STATUS_INVALID_TOKEN"
  , "message":"The token representing the data is invalid or expired."
  }
, "0xC0000500":{
    "code":"STATUS_INVALID_TASK_NAME"
  , "message":"The specified task name is invalid."
  }
, "0xC0000501":{
    "code":"STATUS_INVALID_TASK_INDEX"
  , "message":"The specified task index is invalid."
  }
, "0xC0000502":{
    "code":"STATUS_THREAD_ALREADY_IN_TASK"
  , "message":"The specified thread is already joining a task."
  }
, "0xC0000503":{
    "code":"STATUS_CALLBACK_BYPASS"
  , "message":"A callback has requested to bypass native code."
  }
, "0xC0000602":{
    "code":"STATUS_FAIL_FAST_EXCEPTION"
  , "message":"A fail fast exception occurred. Exception handlers will not be invoked and the process will be terminated immediately."
  }
, "0xC0000603":{
    "code":"STATUS_IMAGE_CERT_REVOKED"
  , "message":"Windows cannot verify the digital signature for this file. The signing certificate for this file has been revoked."
  }
, "0xC0000700":{
    "code":"STATUS_PORT_CLOSED"
  , "message":"The ALPC port is closed."
  }
, "0xC0000701":{
    "code":"STATUS_MESSAGE_LOST"
  , "message":"The ALPC message requested is no longer available."
  }
, "0xC0000702":{
    "code":"STATUS_INVALID_MESSAGE"
  , "message":"The ALPC message supplied is invalid."
  }
, "0xC0000703":{
    "code":"STATUS_REQUEST_CANCELED"
  , "message":"The ALPC message has been canceled."
  }
, "0xC0000704":{
    "code":"STATUS_RECURSIVE_DISPATCH"
  , "message":"Invalid recursive dispatch attempt."
  }
, "0xC0000705":{
    "code":"STATUS_LPC_RECEIVE_BUFFER_EXPECTED"
  , "message":"No receive buffer has been supplied in a synchronous request."
  }
, "0xC0000706":{
    "code":"STATUS_LPC_INVALID_CONNECTION_USAGE"
  , "message":"The connection port is used in an invalid context."
  }
, "0xC0000707":{
    "code":"STATUS_LPC_REQUESTS_NOT_ALLOWED"
  , "message":"The ALPC port does not accept new request messages."
  }
, "0xC0000708":{
    "code":"STATUS_RESOURCE_IN_USE"
  , "message":"The resource requested is already in use."
  }
, "0xC0000709":{
    "code":"STATUS_HARDWARE_MEMORY_ERROR"
  , "message":"The hardware has reported an uncorrectable memory error."
  }
, "0xC000070A":{
    "code":"STATUS_THREADPOOL_HANDLE_EXCEPTION"
  , "message":"Status 0x%08x was returned, waiting on handle 0x%x for wait 0x%p, in waiter 0x%p."
  }
, "0xC000070B":{
    "code":"STATUS_THREADPOOL_SET_EVENT_ON_COMPLETION_FAILED"
  , "message":"After a callback to 0x%p(0x%p), a completion call to Set event(0x%p) failed with status 0x%08x."
  }
, "0xC000070C":{
    "code":"STATUS_THREADPOOL_RELEASE_SEMAPHORE_ON_COMPLETION_FAILED"
  , "message":"After a callback to 0x%p(0x%p), a completion call to ReleaseSemaphore(0x%p, %d) failed with status 0x%08x."
  }
, "0xC000070D":{
    "code":"STATUS_THREADPOOL_RELEASE_MUTEX_ON_COMPLETION_FAILED"
  , "message":"After a callback to 0x%p(0x%p), a completion call to ReleaseMutex(%p) failed with status 0x%08x."
  }
, "0xC000070E":{
    "code":"STATUS_THREADPOOL_FREE_LIBRARY_ON_COMPLETION_FAILED"
  , "message":"After a callback to 0x%p(0x%p), a completion call to FreeLibrary(%p) failed with status 0x%08x."
  }
, "0xC000070F":{
    "code":"STATUS_THREADPOOL_RELEASED_DURING_OPERATION"
  , "message":"The thread pool 0x%p was released while a thread was posting a callback to 0x%p(0x%p) to it."
  }
, "0xC0000710":{
    "code":"STATUS_CALLBACK_RETURNED_WHILE_IMPERSONATING"
  , "message":"A thread pool worker thread is impersonating a client, after a callback to 0x%p(0x%p). This is unexpected, indicating that the callback is missing a call to revert the impersonation."
  }
, "0xC0000711":{
    "code":"STATUS_APC_RETURNED_WHILE_IMPERSONATING"
  , "message":"A thread pool worker thread is impersonating a client, after executing an APC. This is unexpected, indicating that the APC is missing a call to revert the impersonation."
  }
, "0xC0000712":{
    "code":"STATUS_PROCESS_IS_PROTECTED"
  , "message":"Either the target process, or the target thread\'s containing process, is a protected process."
  }
, "0xC0000713":{
    "code":"STATUS_MCA_EXCEPTION"
  , "message":"A thread is getting dispatched with MCA EXCEPTION because of MCA."
  }
, "0xC0000714":{
    "code":"STATUS_CERTIFICATE_MAPPING_NOT_UNIQUE"
  , "message":"The client certificate account mapping is not unique."
  }
, "0xC0000715":{
    "code":"STATUS_SYMLINK_CLASS_DISABLED"
  , "message":"The symbolic link cannot be followed because its type is disabled."
  }
, "0xC0000716":{
    "code":"STATUS_INVALID_IDN_NORMALIZATION"
  , "message":"Indicates that the specified string is not valid for IDN normalization."
  }
, "0xC0000717":{
    "code":"STATUS_NO_UNICODE_TRANSLATION"
  , "message":"No mapping for the Unicode character exists in the target multi-byte code page."
  }
, "0xC0000718":{
    "code":"STATUS_ALREADY_REGISTERED"
  , "message":"The provided callback is already registered."
  }
, "0xC0000719":{
    "code":"STATUS_CONTEXT_MISMATCH"
  , "message":"The provided context did not match the target."
  }
, "0xC000071A":{
    "code":"STATUS_PORT_ALREADY_HAS_COMPLETION_LIST"
  , "message":"The specified port already has a completion list."
  }
, "0xC000071B":{
    "code":"STATUS_CALLBACK_RETURNED_THREAD_PRIORITY"
  , "message":"A threadpool worker thread entered a callback at thread base priority 0x%x and exited at priority 0x%x.\nThis is unexpected, indicating that the callback missed restoring the priority."
  }
, "0xC000071C":{
    "code":"STATUS_INVALID_THREAD"
  , "message":"An invalid thread, handle %p, is specified for this operation. Possibly, a threadpool worker thread was specified."
  }
, "0xC000071D":{
    "code":"STATUS_CALLBACK_RETURNED_TRANSACTION"
  , "message":"A threadpool worker thread entered a callback, which left transaction state.\nThis is unexpected, indicating that the callback missed clearing the transaction."
  }
, "0xC000071E":{
    "code":"STATUS_CALLBACK_RETURNED_LDR_LOCK"
  , "message":"A threadpool worker thread entered a callback, which left the loader lock held.\nThis is unexpected, indicating that the callback missed releasing the lock."
  }
, "0xC000071F":{
    "code":"STATUS_CALLBACK_RETURNED_LANG"
  , "message":"A threadpool worker thread entered a callback, which left with preferred languages set.\nThis is unexpected, indicating that the callback missed clearing them."
  }
, "0xC0000720":{
    "code":"STATUS_CALLBACK_RETURNED_PRI_BACK"
  , "message":"A threadpool worker thread entered a callback, which left with background priorities set.\nThis is unexpected, indicating that the callback missed restoring the original priorities."
  }
, "0xC0000800":{
    "code":"STATUS_DISK_REPAIR_DISABLED"
  , "message":"The attempted operation required self healing to be enabled."
  }
, "0xC0000801":{
    "code":"STATUS_DS_DOMAIN_RENAME_IN_PROGRESS"
  , "message":"The directory service cannot perform the requested operation because a domain rename operation is in progress."
  }
, "0xC0000802":{
    "code":"STATUS_DISK_QUOTA_EXCEEDED"
  , "message":"An operation failed because the storage quota was exceeded."
  }
, "0xC0000804":{
    "code":"STATUS_CONTENT_BLOCKED"
  , "message":"An operation failed because the content was blocked."
  }
, "0xC0000805":{
    "code":"STATUS_BAD_CLUSTERS"
  , "message":"The operation could not be completed due to bad clusters on disk."
  }
, "0xC0000806":{
    "code":"STATUS_VOLUME_DIRTY"
  , "message":"The operation could not be completed because the volume is dirty. Please run the Chkdsk utility and try again."
  }
, "0xC0000901":{
    "code":"STATUS_FILE_CHECKED_OUT"
  , "message":"This file is checked out or locked for editing by another user."
  }
, "0xC0000902":{
    "code":"STATUS_CHECKOUT_REQUIRED"
  , "message":"The file must be checked out before saving changes."
  }
, "0xC0000903":{
    "code":"STATUS_BAD_FILE_TYPE"
  , "message":"The file type being saved or retrieved has been blocked."
  }
, "0xC0000904":{
    "code":"STATUS_FILE_TOO_LARGE"
  , "message":"The file size exceeds the limit allowed and cannot be saved."
  }
, "0xC0000905":{
    "code":"STATUS_FORMS_AUTH_REQUIRED"
  , "message":"Access Denied. Before opening files in this location, you must first browse to the e.g. site and select the option to log on automatically."
  }
, "0xC0000906":{
    "code":"STATUS_VIRUS_INFECTED"
  , "message":"The operation did not complete successfully because the file contains a virus."
  }
, "0xC0000907":{
    "code":"STATUS_VIRUS_DELETED"
  , "message":"This file contains a virus and cannot be opened. Due to the nature of this virus, the file has been removed from this location."
  }
, "0xC0000908":{
    "code":"STATUS_BAD_MCFG_TABLE"
  , "message":"The resources required for this device conflict with the MCFG table."
  }
, "0xC0000909":{
    "code":"STATUS_CANNOT_BREAK_OPLOCK"
  , "message":"The operation did not complete successfully because it would cause an oplock to be broken. The caller has requested that existing oplocks not be broken."
  }
, "0xC0009898":{
    "code":"STATUS_WOW_ASSERTION"
  , "message":"WOW Assertion Error."
  }
, "0xC000A000":{
    "code":"STATUS_INVALID_SIGNATURE"
  , "message":"The cryptographic signature is invalid."
  }
, "0xC000A001":{
    "code":"STATUS_HMAC_NOT_SUPPORTED"
  , "message":"The cryptographic provider does not support HMAC."
  }
, "0xC000A010":{
    "code":"STATUS_IPSEC_QUEUE_OVERFLOW"
  , "message":"The IPsec queue overflowed."
  }
, "0xC000A011":{
    "code":"STATUS_ND_QUEUE_OVERFLOW"
  , "message":"The neighbor discovery queue overflowed."
  }
, "0xC000A012":{
    "code":"STATUS_HOPLIMIT_EXCEEDED"
  , "message":"An Internet Control Message Protocol (ICMP) hop limit exceeded error was received."
  }
, "0xC000A013":{
    "code":"STATUS_PROTOCOL_NOT_SUPPORTED"
  , "message":"The protocol is not installed on the local machine."
  }
, "0xC000A080":{
    "code":"STATUS_LOST_WRITEBEHIND_DATA_NETWORK_DISCONNECTED"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error may be caused by network connectivity issues. Try to save this file elsewhere."
  }
, "0xC000A081":{
    "code":"STATUS_LOST_WRITEBEHIND_DATA_NETWORK_SERVER_ERROR"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error was returned by the server on which the file exists. Try to save this file elsewhere."
  }
, "0xC000A082":{
    "code":"STATUS_LOST_WRITEBEHIND_DATA_LOCAL_DISK_ERROR"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error may be caused if the device has been removed or the media is write-protected."
  }
, "0xC000A083":{
    "code":"STATUS_XML_PARSE_ERROR"
  , "message":"Windows was unable to parse the requested XML data."
  }
, "0xC000A084":{
    "code":"STATUS_XMLDSIG_ERROR"
  , "message":"An error was encountered while processing an XML digital signature."
  }
, "0xC000A085":{
    "code":"STATUS_WRONG_COMPARTMENT"
  , "message":"This indicates that the caller made the connection request in the wrong routing compartment."
  }
, "0xC000A086":{
    "code":"STATUS_AUTHIP_FAILURE"
  , "message":"This indicates that there was an AuthIP failure when attempting to connect to the remote host."
  }
, "0xC000A087":{
    "code":"STATUS_DS_OID_MAPPED_GROUP_CANT_HAVE_MEMBERS"
  , "message":"OID mapped groups cannot have members."
  }
, "0xC000A088":{
    "code":"STATUS_DS_OID_NOT_FOUND"
  , "message":"The specified OID cannot be found."
  }
, "0xC000A100":{
    "code":"STATUS_HASH_NOT_SUPPORTED"
  , "message":"Hash generation for the specified version and hash type is not enabled on server."
  }
, "0xC000A101":{
    "code":"STATUS_HASH_NOT_PRESENT"
  , "message":"The hash requests is not present or not up to date with the current file contents."
  }
, "0xC000A2A1":{
    "code":"STATUS_OFFLOAD_READ_FLT_NOT_SUPPORTED"
  , "message":"A file system filter on the server has not opted in for Offload Read support."
  }
, "0xC000A2A2":{
    "code":"STATUS_OFFLOAD_WRITE_FLT_NOT_SUPPORTED"
  , "message":"A file system filter on the server has not opted in for Offload Write support."
  }
, "0xC000A2A3":{
    "code":"STATUS_OFFLOAD_READ_FILE_NOT_SUPPORTED"
  , "message":"Offload read operations cannot be performed on:\nCompressed files\nSparse files\nEncrypted files\nFile system metadata files"
  }
, "0xC000A2A4":{
    "code":"STATUS_OFFLOAD_WRITE_FILE_NOT_SUPPORTED"
  , "message":"Offload write operations cannot be performed on:\nCompressed files\nSparse files\nEncrypted files\nFile system metadata files"
  }
, "0xC0010001":{
    "code":"DBG_NO_STATE_CHANGE"
  , "message":"The debugger did not perform a state change."
  }
, "0xC0010002":{
    "code":"DBG_APP_NOT_IDLE"
  , "message":"The debugger found that the application is not idle."
  }
, "0xC0020001":{
    "code":"RPC_NT_INVALID_STRING_BINDING"
  , "message":"The string binding is invalid."
  }
, "0xC0020002":{
    "code":"RPC_NT_WRONG_KIND_OF_BINDING"
  , "message":"The binding handle is not the correct type."
  }
, "0xC0020003":{
    "code":"RPC_NT_INVALID_BINDING"
  , "message":"The binding handle is invalid."
  }
, "0xC0020004":{
    "code":"RPC_NT_PROTSEQ_NOT_SUPPORTED"
  , "message":"The RPC protocol sequence is not supported."
  }
, "0xC0020005":{
    "code":"RPC_NT_INVALID_RPC_PROTSEQ"
  , "message":"The RPC protocol sequence is invalid."
  }
, "0xC0020006":{
    "code":"RPC_NT_INVALID_STRING_UUID"
  , "message":"The string UUID is invalid."
  }
, "0xC0020007":{
    "code":"RPC_NT_INVALID_ENDPOINT_FORMAT"
  , "message":"The endpoint format is invalid."
  }
, "0xC0020008":{
    "code":"RPC_NT_INVALID_NET_ADDR"
  , "message":"The network address is invalid."
  }
, "0xC0020009":{
    "code":"RPC_NT_NO_ENDPOINT_FOUND"
  , "message":"No endpoint was found."
  }
, "0xC002000A":{
    "code":"RPC_NT_INVALID_TIMEOUT"
  , "message":"The time-out value is invalid."
  }
, "0xC002000B":{
    "code":"RPC_NT_OBJECT_NOT_FOUND"
  , "message":"The object UUID was not found."
  }
, "0xC002000C":{
    "code":"RPC_NT_ALREADY_REGISTERED"
  , "message":"The object UUID has already been registered."
  }
, "0xC002000D":{
    "code":"RPC_NT_TYPE_ALREADY_REGISTERED"
  , "message":"The type UUID has already been registered."
  }
, "0xC002000E":{
    "code":"RPC_NT_ALREADY_LISTENING"
  , "message":"The RPC server is already listening."
  }
, "0xC002000F":{
    "code":"RPC_NT_NO_PROTSEQS_REGISTERED"
  , "message":"No protocol sequences have been registered."
  }
, "0xC0020010":{
    "code":"RPC_NT_NOT_LISTENING"
  , "message":"The RPC server is not listening."
  }
, "0xC0020011":{
    "code":"RPC_NT_UNKNOWN_MGR_TYPE"
  , "message":"The manager type is unknown."
  }
, "0xC0020012":{
    "code":"RPC_NT_UNKNOWN_IF"
  , "message":"The interface is unknown."
  }
, "0xC0020013":{
    "code":"RPC_NT_NO_BINDINGS"
  , "message":"There are no bindings."
  }
, "0xC0020014":{
    "code":"RPC_NT_NO_PROTSEQS"
  , "message":"There are no protocol sequences."
  }
, "0xC0020015":{
    "code":"RPC_NT_CANT_CREATE_ENDPOINT"
  , "message":"The endpoint cannot be created."
  }
, "0xC0020016":{
    "code":"RPC_NT_OUT_OF_RESOURCES"
  , "message":"Insufficient resources are available to complete this operation."
  }
, "0xC0020017":{
    "code":"RPC_NT_SERVER_UNAVAILABLE"
  , "message":"The RPC server is unavailable."
  }
, "0xC0020018":{
    "code":"RPC_NT_SERVER_TOO_BUSY"
  , "message":"The RPC server is too busy to complete this operation."
  }
, "0xC0020019":{
    "code":"RPC_NT_INVALID_NETWORK_OPTIONS"
  , "message":"The network options are invalid."
  }
, "0xC002001A":{
    "code":"RPC_NT_NO_CALL_ACTIVE"
  , "message":"No RPCs are active on this thread."
  }
, "0xC002001B":{
    "code":"RPC_NT_CALL_FAILED"
  , "message":"The RPC failed."
  }
, "0xC002001C":{
    "code":"RPC_NT_CALL_FAILED_DNE"
  , "message":"The RPC failed and did not execute."
  }
, "0xC002001D":{
    "code":"RPC_NT_PROTOCOL_ERROR"
  , "message":"An RPC protocol error occurred."
  }
, "0xC002001F":{
    "code":"RPC_NT_UNSUPPORTED_TRANS_SYN"
  , "message":"The RPC server does not support the transfer syntax."
  }
, "0xC0020021":{
    "code":"RPC_NT_UNSUPPORTED_TYPE"
  , "message":"The type UUID is not supported."
  }
, "0xC0020022":{
    "code":"RPC_NT_INVALID_TAG"
  , "message":"The tag is invalid."
  }
, "0xC0020023":{
    "code":"RPC_NT_INVALID_BOUND"
  , "message":"The array bounds are invalid."
  }
, "0xC0020024":{
    "code":"RPC_NT_NO_ENTRY_NAME"
  , "message":"The binding does not contain an entry name."
  }
, "0xC0020025":{
    "code":"RPC_NT_INVALID_NAME_SYNTAX"
  , "message":"The name syntax is invalid."
  }
, "0xC0020026":{
    "code":"RPC_NT_UNSUPPORTED_NAME_SYNTAX"
  , "message":"The name syntax is not supported."
  }
, "0xC0020028":{
    "code":"RPC_NT_UUID_NO_ADDRESS"
  , "message":"No network address is available to construct a UUID."
  }
, "0xC0020029":{
    "code":"RPC_NT_DUPLICATE_ENDPOINT"
  , "message":"The endpoint is a duplicate."
  }
, "0xC002002A":{
    "code":"RPC_NT_UNKNOWN_AUTHN_TYPE"
  , "message":"The authentication type is unknown."
  }
, "0xC002002B":{
    "code":"RPC_NT_MAX_CALLS_TOO_SMALL"
  , "message":"The maximum number of calls is too small."
  }
, "0xC002002C":{
    "code":"RPC_NT_STRING_TOO_LONG"
  , "message":"The string is too long."
  }
, "0xC002002D":{
    "code":"RPC_NT_PROTSEQ_NOT_FOUND"
  , "message":"The RPC protocol sequence was not found."
  }
, "0xC002002E":{
    "code":"RPC_NT_PROCNUM_OUT_OF_RANGE"
  , "message":"The procedure number is out of range."
  }
, "0xC002002F":{
    "code":"RPC_NT_BINDING_HAS_NO_AUTH"
  , "message":"The binding does not contain any authentication information."
  }
, "0xC0020030":{
    "code":"RPC_NT_UNKNOWN_AUTHN_SERVICE"
  , "message":"The authentication service is unknown."
  }
, "0xC0020031":{
    "code":"RPC_NT_UNKNOWN_AUTHN_LEVEL"
  , "message":"The authentication level is unknown."
  }
, "0xC0020032":{
    "code":"RPC_NT_INVALID_AUTH_IDENTITY"
  , "message":"The security context is invalid."
  }
, "0xC0020033":{
    "code":"RPC_NT_UNKNOWN_AUTHZ_SERVICE"
  , "message":"The authorization service is unknown."
  }
, "0xC0020034":{
    "code":"EPT_NT_INVALID_ENTRY"
  , "message":"The entry is invalid."
  }
, "0xC0020035":{
    "code":"EPT_NT_CANT_PERFORM_OP"
  , "message":"The operation cannot be performed."
  }
, "0xC0020036":{
    "code":"EPT_NT_NOT_REGISTERED"
  , "message":"No more endpoints are available from the endpoint mapper."
  }
, "0xC0020037":{
    "code":"RPC_NT_NOTHING_TO_EXPORT"
  , "message":"No interfaces have been exported."
  }
, "0xC0020038":{
    "code":"RPC_NT_INCOMPLETE_NAME"
  , "message":"The entry name is incomplete."
  }
, "0xC0020039":{
    "code":"RPC_NT_INVALID_VERS_OPTION"
  , "message":"The version option is invalid."
  }
, "0xC002003A":{
    "code":"RPC_NT_NO_MORE_MEMBERS"
  , "message":"There are no more members."
  }
, "0xC002003B":{
    "code":"RPC_NT_NOT_ALL_OBJS_UNEXPORTED"
  , "message":"There is nothing to unexport."
  }
, "0xC002003C":{
    "code":"RPC_NT_INTERFACE_NOT_FOUND"
  , "message":"The interface was not found."
  }
, "0xC002003D":{
    "code":"RPC_NT_ENTRY_ALREADY_EXISTS"
  , "message":"The entry already exists."
  }
, "0xC002003E":{
    "code":"RPC_NT_ENTRY_NOT_FOUND"
  , "message":"The entry was not found."
  }
, "0xC002003F":{
    "code":"RPC_NT_NAME_SERVICE_UNAVAILABLE"
  , "message":"The name service is unavailable."
  }
, "0xC0020040":{
    "code":"RPC_NT_INVALID_NAF_ID"
  , "message":"The network address family is invalid."
  }
, "0xC0020041":{
    "code":"RPC_NT_CANNOT_SUPPORT"
  , "message":"The requested operation is not supported."
  }
, "0xC0020042":{
    "code":"RPC_NT_NO_CONTEXT_AVAILABLE"
  , "message":"No security context is available to allow impersonation."
  }
, "0xC0020043":{
    "code":"RPC_NT_INTERNAL_ERROR"
  , "message":"An internal error occurred in the RPC."
  }
, "0xC0020044":{
    "code":"RPC_NT_ZERO_DIVIDE"
  , "message":"The RPC server attempted to divide an integer by zero."
  }
, "0xC0020045":{
    "code":"RPC_NT_ADDRESS_ERROR"
  , "message":"An addressing error occurred in the RPC server."
  }
, "0xC0020046":{
    "code":"RPC_NT_FP_DIV_ZERO"
  , "message":"A floating point operation at the RPC server caused a divide by zero."
  }
, "0xC0020047":{
    "code":"RPC_NT_FP_UNDERFLOW"
  , "message":"A floating point underflow occurred at the RPC server."
  }
, "0xC0020048":{
    "code":"RPC_NT_FP_OVERFLOW"
  , "message":"A floating point overflow occurred at the RPC server."
  }
, "0xC0020049":{
    "code":"RPC_NT_CALL_IN_PROGRESS"
  , "message":"An RPC is already in progress for this thread."
  }
, "0xC002004A":{
    "code":"RPC_NT_NO_MORE_BINDINGS"
  , "message":"There are no more bindings."
  }
, "0xC002004B":{
    "code":"RPC_NT_GROUP_MEMBER_NOT_FOUND"
  , "message":"The group member was not found."
  }
, "0xC002004C":{
    "code":"EPT_NT_CANT_CREATE"
  , "message":"The endpoint mapper database entry could not be created."
  }
, "0xC002004D":{
    "code":"RPC_NT_INVALID_OBJECT"
  , "message":"The object UUID is the nil UUID."
  }
, "0xC002004F":{
    "code":"RPC_NT_NO_INTERFACES"
  , "message":"No interfaces have been registered."
  }
, "0xC0020050":{
    "code":"RPC_NT_CALL_CANCELLED"
  , "message":"The RPC was canceled."
  }
, "0xC0020051":{
    "code":"RPC_NT_BINDING_INCOMPLETE"
  , "message":"The binding handle does not contain all the required information."
  }
, "0xC0020052":{
    "code":"RPC_NT_COMM_FAILURE"
  , "message":"A communications failure occurred during an RPC."
  }
, "0xC0020053":{
    "code":"RPC_NT_UNSUPPORTED_AUTHN_LEVEL"
  , "message":"The requested authentication level is not supported."
  }
, "0xC0020054":{
    "code":"RPC_NT_NO_PRINC_NAME"
  , "message":"No principal name was registered."
  }
, "0xC0020055":{
    "code":"RPC_NT_NOT_RPC_ERROR"
  , "message":"The error specified is not a valid Windows RPC error code."
  }
, "0xC0020057":{
    "code":"RPC_NT_SEC_PKG_ERROR"
  , "message":"A security package-specific error occurred."
  }
, "0xC0020058":{
    "code":"RPC_NT_NOT_CANCELLED"
  , "message":"The thread was not canceled."
  }
, "0xC0020062":{
    "code":"RPC_NT_INVALID_ASYNC_HANDLE"
  , "message":"Invalid asynchronous RPC handle."
  }
, "0xC0020063":{
    "code":"RPC_NT_INVALID_ASYNC_CALL"
  , "message":"Invalid asynchronous RPC call handle for this operation."
  }
, "0xC0020064":{
    "code":"RPC_NT_PROXY_ACCESS_DENIED"
  , "message":"Access to the HTTP proxy is denied."
  }
, "0xC0030001":{
    "code":"RPC_NT_NO_MORE_ENTRIES"
  , "message":"The list of RPC servers available for auto-handle binding has been exhausted."
  }
, "0xC0030002":{
    "code":"RPC_NT_SS_CHAR_TRANS_OPEN_FAIL"
  , "message":"The file designated by DCERPCCHARTRANS cannot be opened."
  }
, "0xC0030003":{
    "code":"RPC_NT_SS_CHAR_TRANS_SHORT_FILE"
  , "message":"The file containing the character translation table has fewer than 512 bytes."
  }
, "0xC0030004":{
    "code":"RPC_NT_SS_IN_NULL_CONTEXT"
  , "message":"A null context handle is passed as an [in] parameter."
  }
, "0xC0030005":{
    "code":"RPC_NT_SS_CONTEXT_MISMATCH"
  , "message":"The context handle does not match any known context handles."
  }
, "0xC0030006":{
    "code":"RPC_NT_SS_CONTEXT_DAMAGED"
  , "message":"The context handle changed during a call."
  }
, "0xC0030007":{
    "code":"RPC_NT_SS_HANDLES_MISMATCH"
  , "message":"The binding handles passed to an RPC do not match."
  }
, "0xC0030008":{
    "code":"RPC_NT_SS_CANNOT_GET_CALL_HANDLE"
  , "message":"The stub is unable to get the call handle."
  }
, "0xC0030009":{
    "code":"RPC_NT_NULL_REF_POINTER"
  , "message":"A null reference pointer was passed to the stub."
  }
, "0xC003000A":{
    "code":"RPC_NT_ENUM_VALUE_OUT_OF_RANGE"
  , "message":"The enumeration value is out of range."
  }
, "0xC003000B":{
    "code":"RPC_NT_BYTE_COUNT_TOO_SMALL"
  , "message":"The byte count is too small."
  }
, "0xC003000C":{
    "code":"RPC_NT_BAD_STUB_DATA"
  , "message":"The stub received bad data."
  }
, "0xC0030059":{
    "code":"RPC_NT_INVALID_ES_ACTION"
  , "message":"Invalid operation on the encoding/decoding handle."
  }
, "0xC003005A":{
    "code":"RPC_NT_WRONG_ES_VERSION"
  , "message":"Incompatible version of the serializing package."
  }
, "0xC003005B":{
    "code":"RPC_NT_WRONG_STUB_VERSION"
  , "message":"Incompatible version of the RPC stub."
  }
, "0xC003005C":{
    "code":"RPC_NT_INVALID_PIPE_OBJECT"
  , "message":"The RPC pipe object is invalid or corrupt."
  }
, "0xC003005D":{
    "code":"RPC_NT_INVALID_PIPE_OPERATION"
  , "message":"An invalid operation was attempted on an RPC pipe object."
  }
, "0xC003005E":{
    "code":"RPC_NT_WRONG_PIPE_VERSION"
  , "message":"Unsupported RPC pipe version."
  }
, "0xC003005F":{
    "code":"RPC_NT_PIPE_CLOSED"
  , "message":"The RPC pipe object has already been closed."
  }
, "0xC0030060":{
    "code":"RPC_NT_PIPE_DISCIPLINE_ERROR"
  , "message":"The RPC call completed before all pipes were processed."
  }
, "0xC0030061":{
    "code":"RPC_NT_PIPE_EMPTY"
  , "message":"No more data is available from the RPC pipe."
  }
, "0xC0040035":{
    "code":"STATUS_PNP_BAD_MPS_TABLE"
  , "message":"A device is missing in the system BIOS MPS table. This device will not be used. Contact your system vendor for a system BIOS update."
  }
, "0xC0040036":{
    "code":"STATUS_PNP_TRANSLATION_FAILED"
  , "message":"A translator failed to translate resources."
  }
, "0xC0040037":{
    "code":"STATUS_PNP_IRQ_TRANSLATION_FAILED"
  , "message":"An IRQ translator failed to translate resources."
  }
, "0xC0040038":{
    "code":"STATUS_PNP_INVALID_ID"
  , "message":"Driver %2 returned an invalid ID for a child device (%3)."
  }
, "0xC0040039":{
    "code":"STATUS_IO_REISSUE_AS_CACHED"
  , "message":"Reissue the given operation as a cached I/O operation"
  }
, "0xC00A0001":{
    "code":"STATUS_CTX_WINSTATION_NAME_INVALID"
  , "message":"Session name %1 is invalid."
  }
, "0xC00A0002":{
    "code":"STATUS_CTX_INVALID_PD"
  , "message":"The protocol driver %1 is invalid."
  }
, "0xC00A0003":{
    "code":"STATUS_CTX_PD_NOT_FOUND"
  , "message":"The protocol driver %1 was not found in the system path."
  }
, "0xC00A0006":{
    "code":"STATUS_CTX_CLOSE_PENDING"
  , "message":"A close operation is pending on the terminal connection."
  }
, "0xC00A0007":{
    "code":"STATUS_CTX_NO_OUTBUF"
  , "message":"No free output buffers are available."
  }
, "0xC00A0008":{
    "code":"STATUS_CTX_MODEM_INF_NOT_FOUND"
  , "message":"The MODEM.INF file was not found."
  }
, "0xC00A0009":{
    "code":"STATUS_CTX_INVALID_MODEMNAME"
  , "message":"The modem (%1) was not found in the MODEM.INF file."
  }
, "0xC00A000A":{
    "code":"STATUS_CTX_RESPONSE_ERROR"
  , "message":"The modem did not accept the command sent to it. Verify that the configured modem name matches the attached modem."
  }
, "0xC00A000B":{
    "code":"STATUS_CTX_MODEM_RESPONSE_TIMEOUT"
  , "message":"The modem did not respond to the command sent to it. Verify that the modem cable is properly attached and the modem is turned on."
  }
, "0xC00A000C":{
    "code":"STATUS_CTX_MODEM_RESPONSE_NO_CARRIER"
  , "message":"Carrier detection has failed or the carrier has been dropped due to disconnection."
  }
, "0xC00A000D":{
    "code":"STATUS_CTX_MODEM_RESPONSE_NO_DIALTONE"
  , "message":"A dial tone was not detected within the required time. Verify that the phone cable is properly attached and functional."
  }
, "0xC00A000E":{
    "code":"STATUS_CTX_MODEM_RESPONSE_BUSY"
  , "message":"A busy signal was detected at a remote site on callback."
  }
, "0xC00A000F":{
    "code":"STATUS_CTX_MODEM_RESPONSE_VOICE"
  , "message":"A voice was detected at a remote site on callback."
  }
, "0xC00A0010":{
    "code":"STATUS_CTX_TD_ERROR"
  , "message":"Transport driver error."
  }
, "0xC00A0012":{
    "code":"STATUS_CTX_LICENSE_CLIENT_INVALID"
  , "message":"The client you are using is not licensed to use this system. Your logon request is denied."
  }
, "0xC00A0013":{
    "code":"STATUS_CTX_LICENSE_NOT_AVAILABLE"
  , "message":"The system has reached its licensed logon limit. Try again later."
  }
, "0xC00A0014":{
    "code":"STATUS_CTX_LICENSE_EXPIRED"
  , "message":"The system license has expired. Your logon request is denied."
  }
, "0xC00A0015":{
    "code":"STATUS_CTX_WINSTATION_NOT_FOUND"
  , "message":"The specified session cannot be found."
  }
, "0xC00A0016":{
    "code":"STATUS_CTX_WINSTATION_NAME_COLLISION"
  , "message":"The specified session name is already in use."
  }
, "0xC00A0017":{
    "code":"STATUS_CTX_WINSTATION_BUSY"
  , "message":"The requested operation cannot be completed because the terminal connection is currently processing a connect, disconnect, reset, or delete operation."
  }
, "0xC00A0018":{
    "code":"STATUS_CTX_BAD_VIDEO_MODE"
  , "message":"An attempt has been made to connect to a session whose video mode is not supported by the current client."
  }
, "0xC00A0022":{
    "code":"STATUS_CTX_GRAPHICS_INVALID"
  , "message":"The application attempted to enable DOS graphics mode. DOS graphics mode is not supported."
  }
, "0xC00A0024":{
    "code":"STATUS_CTX_NOT_CONSOLE"
  , "message":"The requested operation can be performed only on the system console. This is most often the result of a driver or system DLL requiring direct console access."
  }
, "0xC00A0026":{
    "code":"STATUS_CTX_CLIENT_QUERY_TIMEOUT"
  , "message":"The client failed to respond to the server connect message."
  }
, "0xC00A0027":{
    "code":"STATUS_CTX_CONSOLE_DISCONNECT"
  , "message":"Disconnecting the console session is not supported."
  }
, "0xC00A0028":{
    "code":"STATUS_CTX_CONSOLE_CONNECT"
  , "message":"Reconnecting a disconnected session to the console is not supported."
  }
, "0xC00A002A":{
    "code":"STATUS_CTX_SHADOW_DENIED"
  , "message":"The request to control another session remotely was denied."
  }
, "0xC00A002B":{
    "code":"STATUS_CTX_WINSTATION_ACCESS_DENIED"
  , "message":"A process has requested access to a session, but has not been granted those access rights."
  }
, "0xC00A002E":{
    "code":"STATUS_CTX_INVALID_WD"
  , "message":"The terminal connection driver %1 is invalid."
  }
, "0xC00A002F":{
    "code":"STATUS_CTX_WD_NOT_FOUND"
  , "message":"The terminal connection driver %1 was not found in the system path."
  }
, "0xC00A0030":{
    "code":"STATUS_CTX_SHADOW_INVALID"
  , "message":"The requested session cannot be controlled remotely. You cannot control your own session, a session that is trying to control your session, a session that has no user logged on, or other sessions from the console."
  }
, "0xC00A0031":{
    "code":"STATUS_CTX_SHADOW_DISABLED"
  , "message":"The requested session is not configured to allow remote control."
  }
, "0xC00A0032":{
    "code":"STATUS_RDP_PROTOCOL_ERROR"
  , "message":"The RDP protocol component %2 detected an error in the protocol stream and has disconnected the client."
  }
, "0xC00A0033":{
    "code":"STATUS_CTX_CLIENT_LICENSE_NOT_SET"
  , "message":"Your request to connect to this terminal server has been rejected. Your terminal server client license number has not been entered for this copy of the terminal client. Contact your system administrator for help in entering a valid, unique license number for this terminal server client. Click OK to continue."
  }
, "0xC00A0034":{
    "code":"STATUS_CTX_CLIENT_LICENSE_IN_USE"
  , "message":"Your request to connect to this terminal server has been rejected. Your terminal server client license number is currently being used by another user. Contact your system administrator to obtain a new copy of the terminal server client with a valid, unique license number. Click OK to continue."
  }
, "0xC00A0035":{
    "code":"STATUS_CTX_SHADOW_ENDED_BY_MODE_CHANGE"
  , "message":"The remote control of the console was terminated because the display mode was changed. Changing the display mode in a remote control session is not supported."
  }
, "0xC00A0036":{
    "code":"STATUS_CTX_SHADOW_NOT_RUNNING"
  , "message":"Remote control could not be terminated because the specified session is not currently being remotely controlled."
  }
, "0xC00A0037":{
    "code":"STATUS_CTX_LOGON_DISABLED"
  , "message":"Your interactive logon privilege has been disabled. Contact your system administrator."
  }
, "0xC00A0038":{
    "code":"STATUS_CTX_SECURITY_LAYER_ERROR"
  , "message":"The terminal server security layer detected an error in the protocol stream and has disconnected the client."
  }
, "0xC00A0039":{
    "code":"STATUS_TS_INCOMPATIBLE_SESSIONS"
  , "message":"The target session is incompatible with the current session."
  }
, "0xC00B0001":{
    "code":"STATUS_MUI_FILE_NOT_FOUND"
  , "message":"The resource loader failed to find an MUI file."
  }
, "0xC00B0002":{
    "code":"STATUS_MUI_INVALID_FILE"
  , "message":"The resource loader failed to load an MUI file because the file failed to pass validation."
  }
, "0xC00B0003":{
    "code":"STATUS_MUI_INVALID_RC_CONFIG"
  , "message":"The RC manifest is corrupted with garbage data, is an unsupported version, or is missing a required item."
  }
, "0xC00B0004":{
    "code":"STATUS_MUI_INVALID_LOCALE_NAME"
  , "message":"The RC manifest has an invalid culture name."
  }
, "0xC00B0005":{
    "code":"STATUS_MUI_INVALID_ULTIMATEFALLBACK_NAME"
  , "message":"The RC manifest has and invalid ultimate fallback name."
  }
, "0xC00B0006":{
    "code":"STATUS_MUI_FILE_NOT_LOADED"
  , "message":"The resource loader cache does not have a loaded MUI entry."
  }
, "0xC00B0007":{
    "code":"STATUS_RESOURCE_ENUM_USER_STOP"
  , "message":"The user stopped resource enumeration."
  }
, "0xC0130001":{
    "code":"STATUS_CLUSTER_INVALID_NODE"
  , "message":"The cluster node is not valid."
  }
, "0xC0130002":{
    "code":"STATUS_CLUSTER_NODE_EXISTS"
  , "message":"The cluster node already exists."
  }
, "0xC0130003":{
    "code":"STATUS_CLUSTER_JOIN_IN_PROGRESS"
  , "message":"A node is in the process of joining the cluster."
  }
, "0xC0130004":{
    "code":"STATUS_CLUSTER_NODE_NOT_FOUND"
  , "message":"The cluster node was not found."
  }
, "0xC0130005":{
    "code":"STATUS_CLUSTER_LOCAL_NODE_NOT_FOUND"
  , "message":"The cluster local node information was not found."
  }
, "0xC0130006":{
    "code":"STATUS_CLUSTER_NETWORK_EXISTS"
  , "message":"The cluster network already exists."
  }
, "0xC0130007":{
    "code":"STATUS_CLUSTER_NETWORK_NOT_FOUND"
  , "message":"The cluster network was not found."
  }
, "0xC0130008":{
    "code":"STATUS_CLUSTER_NETINTERFACE_EXISTS"
  , "message":"The cluster network interface already exists."
  }
, "0xC0130009":{
    "code":"STATUS_CLUSTER_NETINTERFACE_NOT_FOUND"
  , "message":"The cluster network interface was not found."
  }
, "0xC013000A":{
    "code":"STATUS_CLUSTER_INVALID_REQUEST"
  , "message":"The cluster request is not valid for this object."
  }
, "0xC013000B":{
    "code":"STATUS_CLUSTER_INVALID_NETWORK_PROVIDER"
  , "message":"The cluster network provider is not valid."
  }
, "0xC013000C":{
    "code":"STATUS_CLUSTER_NODE_DOWN"
  , "message":"The cluster node is down."
  }
, "0xC013000D":{
    "code":"STATUS_CLUSTER_NODE_UNREACHABLE"
  , "message":"The cluster node is not reachable."
  }
, "0xC013000E":{
    "code":"STATUS_CLUSTER_NODE_NOT_MEMBER"
  , "message":"The cluster node is not a member of the cluster."
  }
, "0xC013000F":{
    "code":"STATUS_CLUSTER_JOIN_NOT_IN_PROGRESS"
  , "message":"A cluster join operation is not in progress."
  }
, "0xC0130010":{
    "code":"STATUS_CLUSTER_INVALID_NETWORK"
  , "message":"The cluster network is not valid."
  }
, "0xC0130011":{
    "code":"STATUS_CLUSTER_NO_NET_ADAPTERS"
  , "message":"No network adapters are available."
  }
, "0xC0130012":{
    "code":"STATUS_CLUSTER_NODE_UP"
  , "message":"The cluster node is up."
  }
, "0xC0130013":{
    "code":"STATUS_CLUSTER_NODE_PAUSED"
  , "message":"The cluster node is paused."
  }
, "0xC0130014":{
    "code":"STATUS_CLUSTER_NODE_NOT_PAUSED"
  , "message":"The cluster node is not paused."
  }
, "0xC0130015":{
    "code":"STATUS_CLUSTER_NO_SECURITY_CONTEXT"
  , "message":"No cluster security context is available."
  }
, "0xC0130016":{
    "code":"STATUS_CLUSTER_NETWORK_NOT_INTERNAL"
  , "message":"The cluster network is not configured for internal cluster communication."
  }
, "0xC0130017":{
    "code":"STATUS_CLUSTER_POISONED"
  , "message":"The cluster node has been poisoned."
  }
, "0xC0140001":{
    "code":"STATUS_ACPI_INVALID_OPCODE"
  , "message":"An attempt was made to run an invalid AML opcode."
  }
, "0xC0140002":{
    "code":"STATUS_ACPI_STACK_OVERFLOW"
  , "message":"The AML interpreter stack has overflowed."
  }
, "0xC0140003":{
    "code":"STATUS_ACPI_ASSERT_FAILED"
  , "message":"An inconsistent state has occurred."
  }
, "0xC0140004":{
    "code":"STATUS_ACPI_INVALID_INDEX"
  , "message":"An attempt was made to access an array outside its bounds."
  }
, "0xC0140005":{
    "code":"STATUS_ACPI_INVALID_ARGUMENT"
  , "message":"A required argument was not specified."
  }
, "0xC0140006":{
    "code":"STATUS_ACPI_FATAL"
  , "message":"A fatal error has occurred."
  }
, "0xC0140007":{
    "code":"STATUS_ACPI_INVALID_SUPERNAME"
  , "message":"An invalid SuperName was specified."
  }
, "0xC0140008":{
    "code":"STATUS_ACPI_INVALID_ARGTYPE"
  , "message":"An argument with an incorrect type was specified."
  }
, "0xC0140009":{
    "code":"STATUS_ACPI_INVALID_OBJTYPE"
  , "message":"An object with an incorrect type was specified."
  }
, "0xC014000A":{
    "code":"STATUS_ACPI_INVALID_TARGETTYPE"
  , "message":"A target with an incorrect type was specified."
  }
, "0xC014000B":{
    "code":"STATUS_ACPI_INCORRECT_ARGUMENT_COUNT"
  , "message":"An incorrect number of arguments was specified."
  }
, "0xC014000C":{
    "code":"STATUS_ACPI_ADDRESS_NOT_MAPPED"
  , "message":"An address failed to translate."
  }
, "0xC014000D":{
    "code":"STATUS_ACPI_INVALID_EVENTTYPE"
  , "message":"An incorrect event type was specified."
  }
, "0xC014000E":{
    "code":"STATUS_ACPI_HANDLER_COLLISION"
  , "message":"A handler for the target already exists."
  }
, "0xC014000F":{
    "code":"STATUS_ACPI_INVALID_DATA"
  , "message":"Invalid data for the target was specified."
  }
, "0xC0140010":{
    "code":"STATUS_ACPI_INVALID_REGION"
  , "message":"An invalid region for the target was specified."
  }
, "0xC0140011":{
    "code":"STATUS_ACPI_INVALID_ACCESS_SIZE"
  , "message":"An attempt was made to access a field outside the defined range."
  }
, "0xC0140012":{
    "code":"STATUS_ACPI_ACQUIRE_GLOBAL_LOCK"
  , "message":"The global system lock could not be acquired."
  }
, "0xC0140013":{
    "code":"STATUS_ACPI_ALREADY_INITIALIZED"
  , "message":"An attempt was made to reinitialize the ACPI subsystem."
  }
, "0xC0140014":{
    "code":"STATUS_ACPI_NOT_INITIALIZED"
  , "message":"The ACPI subsystem has not been initialized."
  }
, "0xC0140015":{
    "code":"STATUS_ACPI_INVALID_MUTEX_LEVEL"
  , "message":"An incorrect mutex was specified."
  }
, "0xC0140016":{
    "code":"STATUS_ACPI_MUTEX_NOT_OWNED"
  , "message":"The mutex is not currently owned."
  }
, "0xC0140017":{
    "code":"STATUS_ACPI_MUTEX_NOT_OWNER"
  , "message":"An attempt was made to access the mutex by a process that was not the owner."
  }
, "0xC0140018":{
    "code":"STATUS_ACPI_RS_ACCESS"
  , "message":"An error occurred during an access to region space."
  }
, "0xC0140019":{
    "code":"STATUS_ACPI_INVALID_TABLE"
  , "message":"An attempt was made to use an incorrect table."
  }
, "0xC0140020":{
    "code":"STATUS_ACPI_REG_HANDLER_FAILED"
  , "message":"The registration of an ACPI event failed."
  }
, "0xC0140021":{
    "code":"STATUS_ACPI_POWER_REQUEST_FAILED"
  , "message":"An ACPI power object failed to transition state."
  }
, "0xC0150001":{
    "code":"STATUS_SXS_SECTION_NOT_FOUND"
  , "message":"The requested section is not present in the activation context."
  }
, "0xC0150002":{
    "code":"STATUS_SXS_CANT_GEN_ACTCTX"
  , "message":"Windows was unble to process the application binding information. Refer to the system event log for further information."
  }
, "0xC0150003":{
    "code":"STATUS_SXS_INVALID_ACTCTXDATA_FORMAT"
  , "message":"The application binding data format is invalid."
  }
, "0xC0150004":{
    "code":"STATUS_SXS_ASSEMBLY_NOT_FOUND"
  , "message":"The referenced assembly is not installed on the system."
  }
, "0xC0150005":{
    "code":"STATUS_SXS_MANIFEST_FORMAT_ERROR"
  , "message":"The manifest file does not begin with the required tag and format information."
  }
, "0xC0150006":{
    "code":"STATUS_SXS_MANIFEST_PARSE_ERROR"
  , "message":"The manifest file contains one or more syntax errors."
  }
, "0xC0150007":{
    "code":"STATUS_SXS_ACTIVATION_CONTEXT_DISABLED"
  , "message":"The application attempted to activate a disabled activation context."
  }
, "0xC0150008":{
    "code":"STATUS_SXS_KEY_NOT_FOUND"
  , "message":"The requested lookup key was not found in any active activation context."
  }
, "0xC0150009":{
    "code":"STATUS_SXS_VERSION_CONFLICT"
  , "message":"A component version required by the application conflicts with another component version that is already active."
  }
, "0xC015000A":{
    "code":"STATUS_SXS_WRONG_SECTION_TYPE"
  , "message":"The type requested activation context section does not match the query API used."
  }
, "0xC015000B":{
    "code":"STATUS_SXS_THREAD_QUERIES_DISABLED"
  , "message":"Lack of system resources has required isolated activation to be disabled for the current thread of execution."
  }
, "0xC015000C":{
    "code":"STATUS_SXS_ASSEMBLY_MISSING"
  , "message":"The referenced assembly could not be found."
  }
, "0xC015000E":{
    "code":"STATUS_SXS_PROCESS_DEFAULT_ALREADY_SET"
  , "message":"An attempt to set the process default activation context failed because the process default activation context was already set."
  }
, "0xC015000F":{
    "code":"STATUS_SXS_EARLY_DEACTIVATION"
  , "message":"The activation context being deactivated is not the most recently activated one."
  }
, "0xC0150010":{
    "code":"STATUS_SXS_INVALID_DEACTIVATION"
  , "message":"The activation context being deactivated is not active for the current thread of execution."
  }
, "0xC0150011":{
    "code":"STATUS_SXS_MULTIPLE_DEACTIVATION"
  , "message":"The activation context being deactivated has already been deactivated."
  }
, "0xC0150012":{
    "code":"STATUS_SXS_SYSTEM_DEFAULT_ACTIVATION_CONTEXT_EMPTY"
  , "message":"The activation context of the system default assembly could not be generated."
  }
, "0xC0150013":{
    "code":"STATUS_SXS_PROCESS_TERMINATION_REQUESTED"
  , "message":"A component used by the isolation facility has requested that the process be terminated."
  }
, "0xC0150014":{
    "code":"STATUS_SXS_CORRUPT_ACTIVATION_STACK"
  , "message":"The activation context activation stack for the running thread of execution is corrupt."
  }
, "0xC0150015":{
    "code":"STATUS_SXS_CORRUPTION"
  , "message":"The application isolation metadata for this process or thread has become corrupt."
  }
, "0xC0150016":{
    "code":"STATUS_SXS_INVALID_IDENTITY_ATTRIBUTE_VALUE"
  , "message":"The value of an attribute in an identity is not within the legal range."
  }
, "0xC0150017":{
    "code":"STATUS_SXS_INVALID_IDENTITY_ATTRIBUTE_NAME"
  , "message":"The name of an attribute in an identity is not within the legal range."
  }
, "0xC0150018":{
    "code":"STATUS_SXS_IDENTITY_DUPLICATE_ATTRIBUTE"
  , "message":"An identity contains two definitions for the same attribute."
  }
, "0xC0150019":{
    "code":"STATUS_SXS_IDENTITY_PARSE_ERROR"
  , "message":"The identity string is malformed. This may be due to a trailing comma, more than two unnamed attributes, a missing attribute name, or a missing attribute value."
  }
, "0xC015001A":{
    "code":"STATUS_SXS_COMPONENT_STORE_CORRUPT"
  , "message":"The component store has become corrupted."
  }
, "0xC015001B":{
    "code":"STATUS_SXS_FILE_HASH_MISMATCH"
  , "message":"A component\'s file does not match the verification information present in the component manifest."
  }
, "0xC015001C":{
    "code":"STATUS_SXS_MANIFEST_IDENTITY_SAME_BUT_CONTENTS_DIFFERENT"
  , "message":"The identities of the manifests are identical, but their contents are different."
  }
, "0xC015001D":{
    "code":"STATUS_SXS_IDENTITIES_DIFFERENT"
  , "message":"The component identities are different."
  }
, "0xC015001E":{
    "code":"STATUS_SXS_ASSEMBLY_IS_NOT_A_DEPLOYMENT"
  , "message":"The assembly is not a deployment."
  }
, "0xC015001F":{
    "code":"STATUS_SXS_FILE_NOT_PART_OF_ASSEMBLY"
  , "message":"The file is not a part of the assembly."
  }
, "0xC0150020":{
    "code":"STATUS_ADVANCED_INSTALLER_FAILED"
  , "message":"An advanced installer failed during setup or servicing."
  }
, "0xC0150021":{
    "code":"STATUS_XML_ENCODING_MISMATCH"
  , "message":"The character encoding in the XML declaration did not match the encoding used in the document."
  }
, "0xC0150022":{
    "code":"STATUS_SXS_MANIFEST_TOO_BIG"
  , "message":"The size of the manifest exceeds the maximum allowed."
  }
, "0xC0150023":{
    "code":"STATUS_SXS_SETTING_NOT_REGISTERED"
  , "message":"The setting is not registered."
  }
, "0xC0150024":{
    "code":"STATUS_SXS_TRANSACTION_CLOSURE_INCOMPLETE"
  , "message":"One or more required transaction members are not present."
  }
, "0xC0150025":{
    "code":"STATUS_SMI_PRIMITIVE_INSTALLER_FAILED"
  , "message":"The SMI primitive installer failed during setup or servicing."
  }
, "0xC0150026":{
    "code":"STATUS_GENERIC_COMMAND_FAILED"
  , "message":"A generic command executable returned a result that indicates failure."
  }
, "0xC0150027":{
    "code":"STATUS_SXS_FILE_HASH_MISSING"
  , "message":"A component is missing file verification information in its manifest."
  }
, "0xC0190001":{
    "code":"STATUS_TRANSACTIONAL_CONFLICT"
  , "message":"The function attempted to use a name that is reserved for use by another transaction."
  }
, "0xC0190002":{
    "code":"STATUS_INVALID_TRANSACTION"
  , "message":"The transaction handle associated with this operation is invalid."
  }
, "0xC0190003":{
    "code":"STATUS_TRANSACTION_NOT_ACTIVE"
  , "message":"The requested operation was made in the context of a transaction that is no longer active."
  }
, "0xC0190004":{
    "code":"STATUS_TM_INITIALIZATION_FAILED"
  , "message":"The transaction manager was unable to be successfully initialized. Transacted operations are not supported."
  }
, "0xC0190005":{
    "code":"STATUS_RM_NOT_ACTIVE"
  , "message":"Transaction support within the specified file system resource manager was not started or was shut down due to an error."
  }
, "0xC0190006":{
    "code":"STATUS_RM_METADATA_CORRUPT"
  , "message":"The metadata of the resource manager has been corrupted. The resource manager will not function."
  }
, "0xC0190007":{
    "code":"STATUS_TRANSACTION_NOT_JOINED"
  , "message":"The resource manager attempted to prepare a transaction that it has not successfully joined."
  }
, "0xC0190008":{
    "code":"STATUS_DIRECTORY_NOT_RM"
  , "message":"The specified directory does not contain a file system resource manager."
  }
, "0xC019000A":{
    "code":"STATUS_TRANSACTIONS_UNSUPPORTED_REMOTE"
  , "message":"The remote server or share does not support transacted file operations."
  }
, "0xC019000B":{
    "code":"STATUS_LOG_RESIZE_INVALID_SIZE"
  , "message":"The requested log size for the file system resource manager is invalid."
  }
, "0xC019000C":{
    "code":"STATUS_REMOTE_FILE_VERSION_MISMATCH"
  , "message":"The remote server sent mismatching version number or Fid for a file opened with transactions."
  }
, "0xC019000F":{
    "code":"STATUS_CRM_PROTOCOL_ALREADY_EXISTS"
  , "message":"The resource manager tried to register a protocol that already exists."
  }
, "0xC0190010":{
    "code":"STATUS_TRANSACTION_PROPAGATION_FAILED"
  , "message":"The attempt to propagate the transaction failed."
  }
, "0xC0190011":{
    "code":"STATUS_CRM_PROTOCOL_NOT_FOUND"
  , "message":"The requested propagation protocol was not registered as a CRM."
  }
, "0xC0190012":{
    "code":"STATUS_TRANSACTION_SUPERIOR_EXISTS"
  , "message":"The transaction object already has a superior enlistment, and the caller attempted an operation that would have created a new superior. Only a single superior enlistment is allowed."
  }
, "0xC0190013":{
    "code":"STATUS_TRANSACTION_REQUEST_NOT_VALID"
  , "message":"The requested operation is not valid on the transaction object in its current state."
  }
, "0xC0190014":{
    "code":"STATUS_TRANSACTION_NOT_REQUESTED"
  , "message":"The caller has called a response API, but the response is not expected because the transaction manager did not issue the corresponding request to the caller."
  }
, "0xC0190015":{
    "code":"STATUS_TRANSACTION_ALREADY_ABORTED"
  , "message":"It is too late to perform the requested operation, because the transaction has already been aborted."
  }
, "0xC0190016":{
    "code":"STATUS_TRANSACTION_ALREADY_COMMITTED"
  , "message":"It is too late to perform the requested operation, because the transaction has already been committed."
  }
, "0xC0190017":{
    "code":"STATUS_TRANSACTION_INVALID_MARSHALL_BUFFER"
  , "message":"The buffer passed in to NtPushTransaction or NtPullTransaction is not in a valid format."
  }
, "0xC0190018":{
    "code":"STATUS_CURRENT_TRANSACTION_NOT_VALID"
  , "message":"The current transaction context associated with the thread is not a valid handle to a transaction object."
  }
, "0xC0190019":{
    "code":"STATUS_LOG_GROWTH_FAILED"
  , "message":"An attempt to create space in the transactional resource manager\'s log failed. The failure status has been recorded in the event log."
  }
, "0xC0190021":{
    "code":"STATUS_OBJECT_NO_LONGER_EXISTS"
  , "message":"The object (file, stream, or link) that corresponds to the handle has been deleted by a transaction savepoint rollback."
  }
, "0xC0190022":{
    "code":"STATUS_STREAM_MINIVERSION_NOT_FOUND"
  , "message":"The specified file miniversion was not found for this transacted file open."
  }
, "0xC0190023":{
    "code":"STATUS_STREAM_MINIVERSION_NOT_VALID"
  , "message":"The specified file miniversion was found but has been invalidated. The most likely cause is a transaction savepoint rollback."
  }
, "0xC0190024":{
    "code":"STATUS_MINIVERSION_INACCESSIBLE_FROM_SPECIFIED_TRANSACTION"
  , "message":"A miniversion may be opened only in the context of the transaction that created it."
  }
, "0xC0190025":{
    "code":"STATUS_CANT_OPEN_MINIVERSION_WITH_MODIFY_INTENT"
  , "message":"It is not possible to open a miniversion with modify access."
  }
, "0xC0190026":{
    "code":"STATUS_CANT_CREATE_MORE_STREAM_MINIVERSIONS"
  , "message":"It is not possible to create any more miniversions for this stream."
  }
, "0xC0190028":{
    "code":"STATUS_HANDLE_NO_LONGER_VALID"
  , "message":"The handle has been invalidated by a transaction. The most likely cause is the presence of memory mapping on a file or an open handle when the transaction ended or rolled back to savepoint."
  }
, "0xC0190030":{
    "code":"STATUS_LOG_CORRUPTION_DETECTED"
  , "message":"The log data is corrupt."
  }
, "0xC0190032":{
    "code":"STATUS_RM_DISCONNECTED"
  , "message":"The transaction outcome is unavailable because the resource manager responsible for it is disconnected."
  }
, "0xC0190033":{
    "code":"STATUS_ENLISTMENT_NOT_SUPERIOR"
  , "message":"The request was rejected because the enlistment in question is not a superior enlistment."
  }
, "0xC0190036":{
    "code":"STATUS_FILE_IDENTITY_NOT_PERSISTENT"
  , "message":"The file cannot be opened in a transaction because its identity depends on the outcome of an unresolved transaction."
  }
, "0xC0190037":{
    "code":"STATUS_CANT_BREAK_TRANSACTIONAL_DEPENDENCY"
  , "message":"The operation cannot be performed because another transaction is depending on this property not changing."
  }
, "0xC0190038":{
    "code":"STATUS_CANT_CROSS_RM_BOUNDARY"
  , "message":"The operation would involve a single file with two transactional resource managers and is, therefore, not allowed."
  }
, "0xC0190039":{
    "code":"STATUS_TXF_DIR_NOT_EMPTY"
  , "message":"The $Txf directory must be empty for this operation to succeed."
  }
, "0xC019003A":{
    "code":"STATUS_INDOUBT_TRANSACTIONS_EXIST"
  , "message":"The operation would leave a transactional resource manager in an inconsistent state and is therefore not allowed."
  }
, "0xC019003B":{
    "code":"STATUS_TM_VOLATILE"
  , "message":"The operation could not be completed because the transaction manager does not have a log."
  }
, "0xC019003C":{
    "code":"STATUS_ROLLBACK_TIMER_EXPIRED"
  , "message":"A rollback could not be scheduled because a previously scheduled rollback has already executed or been queued for execution."
  }
, "0xC019003D":{
    "code":"STATUS_TXF_ATTRIBUTE_CORRUPT"
  , "message":"The transactional metadata attribute on the file or directory %hs is corrupt and unreadable."
  }
, "0xC019003E":{
    "code":"STATUS_EFS_NOT_ALLOWED_IN_TRANSACTION"
  , "message":"The encryption operation could not be completed because a transaction is active."
  }
, "0xC019003F":{
    "code":"STATUS_TRANSACTIONAL_OPEN_NOT_ALLOWED"
  , "message":"This object is not allowed to be opened in a transaction."
  }
, "0xC0190040":{
    "code":"STATUS_TRANSACTED_MAPPING_UNSUPPORTED_REMOTE"
  , "message":"Memory mapping (creating a mapped section) a remote file under a transaction is not supported."
  }
, "0xC0190043":{
    "code":"STATUS_TRANSACTION_REQUIRED_PROMOTION"
  , "message":"Promotion was required to allow the resource manager to enlist, but the transaction was set to disallow it."
  }
, "0xC0190044":{
    "code":"STATUS_CANNOT_EXECUTE_FILE_IN_TRANSACTION"
  , "message":"This file is open for modification in an unresolved transaction and may be opened for execute only by a transacted reader."
  }
, "0xC0190045":{
    "code":"STATUS_TRANSACTIONS_NOT_FROZEN"
  , "message":"The request to thaw frozen transactions was ignored because transactions were not previously frozen."
  }
, "0xC0190046":{
    "code":"STATUS_TRANSACTION_FREEZE_IN_PROGRESS"
  , "message":"Transactions cannot be frozen because a freeze is already in progress."
  }
, "0xC0190047":{
    "code":"STATUS_NOT_SNAPSHOT_VOLUME"
  , "message":"The target volume is not a snapshot volume. This operation is valid only on a volume mounted as a snapshot."
  }
, "0xC0190048":{
    "code":"STATUS_NO_SAVEPOINT_WITH_OPEN_FILES"
  , "message":"The savepoint operation failed because files are open on the transaction, which is not permitted."
  }
, "0xC0190049":{
    "code":"STATUS_SPARSE_NOT_ALLOWED_IN_TRANSACTION"
  , "message":"The sparse operation could not be completed because a transaction is active on the file."
  }
, "0xC019004A":{
    "code":"STATUS_TM_IDENTITY_MISMATCH"
  , "message":"The call to create a transaction manager object failed because the Tm Identity that is stored in the log file does not match the Tm Identity that was passed in as an argument."
  }
, "0xC019004B":{
    "code":"STATUS_FLOATED_SECTION"
  , "message":"I/O was attempted on a section object that has been floated as a result of a transaction ending. There is no valid data."
  }
, "0xC019004C":{
    "code":"STATUS_CANNOT_ACCEPT_TRANSACTED_WORK"
  , "message":"The transactional resource manager cannot currently accept transacted work due to a transient condition, such as low resources."
  }
, "0xC019004D":{
    "code":"STATUS_CANNOT_ABORT_TRANSACTIONS"
  , "message":"The transactional resource manager had too many transactions outstanding that could not be aborted. The transactional resource manager has been shut down."
  }
, "0xC019004E":{
    "code":"STATUS_TRANSACTION_NOT_FOUND"
  , "message":"The specified transaction was unable to be opened because it was not found."
  }
, "0xC019004F":{
    "code":"STATUS_RESOURCEMANAGER_NOT_FOUND"
  , "message":"The specified resource manager was unable to be opened because it was not found."
  }
, "0xC0190050":{
    "code":"STATUS_ENLISTMENT_NOT_FOUND"
  , "message":"The specified enlistment was unable to be opened because it was not found."
  }
, "0xC0190051":{
    "code":"STATUS_TRANSACTIONMANAGER_NOT_FOUND"
  , "message":"The specified transaction manager was unable to be opened because it was not found."
  }
, "0xC0190052":{
    "code":"STATUS_TRANSACTIONMANAGER_NOT_ONLINE"
  , "message":"The specified resource manager was unable to create an enlistment because its associated transaction manager is not online."
  }
, "0xC0190053":{
    "code":"STATUS_TRANSACTIONMANAGER_RECOVERY_NAME_COLLISION"
  , "message":"The specified transaction manager was unable to create the objects contained in its log file in the Ob namespace. Therefore, the transaction manager was unable to recover."
  }
, "0xC0190054":{
    "code":"STATUS_TRANSACTION_NOT_ROOT"
  , "message":"The call to create a superior enlistment on this transaction object could not be completed because the transaction object specified for the enlistment is a subordinate branch of the transaction. Only the root of the transaction can be enlisted as a superior."
  }
, "0xC0190055":{
    "code":"STATUS_TRANSACTION_OBJECT_EXPIRED"
  , "message":"Because the associated transaction manager or resource manager has been closed, the handle is no longer valid."
  }
, "0xC0190056":{
    "code":"STATUS_COMPRESSION_NOT_ALLOWED_IN_TRANSACTION"
  , "message":"The compression operation could not be completed because a transaction is active on the file."
  }
, "0xC0190057":{
    "code":"STATUS_TRANSACTION_RESPONSE_NOT_ENLISTED"
  , "message":"The specified operation could not be performed on this superior enlistment because the enlistment was not created with the corresponding completion response in the NotificationMask."
  }
, "0xC0190058":{
    "code":"STATUS_TRANSACTION_RECORD_TOO_LONG"
  , "message":"The specified operation could not be performed because the record to be logged was too long. This can occur because either there are too many enlistments on this transaction or the combined RecoveryInformation being logged on behalf of those enlistments is too long."
  }
, "0xC0190059":{
    "code":"STATUS_NO_LINK_TRACKING_IN_TRANSACTION"
  , "message":"The link-tracking operation could not be completed because a transaction is active."
  }
, "0xC019005A":{
    "code":"STATUS_OPERATION_NOT_SUPPORTED_IN_TRANSACTION"
  , "message":"This operation cannot be performed in a transaction."
  }
, "0xC019005B":{
    "code":"STATUS_TRANSACTION_INTEGRITY_VIOLATED"
  , "message":"The kernel transaction manager had to abort or forget the transaction because it blocked forward progress."
  }
, "0xC0190060":{
    "code":"STATUS_EXPIRED_HANDLE"
  , "message":"The handle is no longer properly associated with its transaction. It may have been opened in a transactional resource manager that was subsequently forced to restart. Please close the handle and open a new one."
  }
, "0xC0190061":{
    "code":"STATUS_TRANSACTION_NOT_ENLISTED"
  , "message":"The specified operation could not be performed because the resource manager is not enlisted in the transaction."
  }
, "0xC01A0001":{
    "code":"STATUS_LOG_SECTOR_INVALID"
  , "message":"The log service found an invalid log sector."
  }
, "0xC01A0002":{
    "code":"STATUS_LOG_SECTOR_PARITY_INVALID"
  , "message":"The log service encountered a log sector with invalid block parity."
  }
, "0xC01A0003":{
    "code":"STATUS_LOG_SECTOR_REMAPPED"
  , "message":"The log service encountered a remapped log sector."
  }
, "0xC01A0004":{
    "code":"STATUS_LOG_BLOCK_INCOMPLETE"
  , "message":"The log service encountered a partial or incomplete log block."
  }
, "0xC01A0005":{
    "code":"STATUS_LOG_INVALID_RANGE"
  , "message":"The log service encountered an attempt to access data outside the active log range."
  }
, "0xC01A0006":{
    "code":"STATUS_LOG_BLOCKS_EXHAUSTED"
  , "message":"The log service user-log marshaling buffers are exhausted."
  }
, "0xC01A0007":{
    "code":"STATUS_LOG_READ_CONTEXT_INVALID"
  , "message":"The log service encountered an attempt to read from a marshaling area with an invalid read context."
  }
, "0xC01A0008":{
    "code":"STATUS_LOG_RESTART_INVALID"
  , "message":"The log service encountered an invalid log restart area."
  }
, "0xC01A0009":{
    "code":"STATUS_LOG_BLOCK_VERSION"
  , "message":"The log service encountered an invalid log block version."
  }
, "0xC01A000A":{
    "code":"STATUS_LOG_BLOCK_INVALID"
  , "message":"The log service encountered an invalid log block."
  }
, "0xC01A000B":{
    "code":"STATUS_LOG_READ_MODE_INVALID"
  , "message":"The log service encountered an attempt to read the log with an invalid read mode."
  }
, "0xC01A000D":{
    "code":"STATUS_LOG_METADATA_CORRUPT"
  , "message":"The log service encountered a corrupted metadata file."
  }
, "0xC01A000E":{
    "code":"STATUS_LOG_METADATA_INVALID"
  , "message":"The log service encountered a metadata file that could not be created by the log file system."
  }
, "0xC01A000F":{
    "code":"STATUS_LOG_METADATA_INCONSISTENT"
  , "message":"The log service encountered a metadata file with inconsistent data."
  }
, "0xC01A0010":{
    "code":"STATUS_LOG_RESERVATION_INVALID"
  , "message":"The log service encountered an attempt to erroneously allocate or dispose reservation space."
  }
, "0xC01A0011":{
    "code":"STATUS_LOG_CANT_DELETE"
  , "message":"The log service cannot delete the log file or the file system container."
  }
, "0xC01A0012":{
    "code":"STATUS_LOG_CONTAINER_LIMIT_EXCEEDED"
  , "message":"The log service has reached the maximum allowable containers allocated to a log file."
  }
, "0xC01A0013":{
    "code":"STATUS_LOG_START_OF_LOG"
  , "message":"The log service has attempted to read or write backward past the start of the log."
  }
, "0xC01A0014":{
    "code":"STATUS_LOG_POLICY_ALREADY_INSTALLED"
  , "message":"The log policy could not be installed because a policy of the same type is already present."
  }
, "0xC01A0015":{
    "code":"STATUS_LOG_POLICY_NOT_INSTALLED"
  , "message":"The log policy in question was not installed at the time of the request."
  }
, "0xC01A0016":{
    "code":"STATUS_LOG_POLICY_INVALID"
  , "message":"The installed set of policies on the log is invalid."
  }
, "0xC01A0017":{
    "code":"STATUS_LOG_POLICY_CONFLICT"
  , "message":"A policy on the log in question prevented the operation from completing."
  }
, "0xC01A0018":{
    "code":"STATUS_LOG_PINNED_ARCHIVE_TAIL"
  , "message":"The log space cannot be reclaimed because the log is pinned by the archive tail."
  }
, "0xC01A0019":{
    "code":"STATUS_LOG_RECORD_NONEXISTENT"
  , "message":"The log record is not a record in the log file."
  }
, "0xC01A001A":{
    "code":"STATUS_LOG_RECORDS_RESERVED_INVALID"
  , "message":"The number of reserved log records or the adjustment of the number of reserved log records is invalid."
  }
, "0xC01A001B":{
    "code":"STATUS_LOG_SPACE_RESERVED_INVALID"
  , "message":"The reserved log space or the adjustment of the log space is invalid."
  }
, "0xC01A001C":{
    "code":"STATUS_LOG_TAIL_INVALID"
  , "message":"A new or existing archive tail or the base of the active log is invalid."
  }
, "0xC01A001D":{
    "code":"STATUS_LOG_FULL"
  , "message":"The log space is exhausted."
  }
, "0xC01A001E":{
    "code":"STATUS_LOG_MULTIPLEXED"
  , "message":"The log is multiplexed; no direct writes to the physical log are allowed."
  }
, "0xC01A001F":{
    "code":"STATUS_LOG_DEDICATED"
  , "message":"The operation failed because the log is dedicated."
  }
, "0xC01A0020":{
    "code":"STATUS_LOG_ARCHIVE_NOT_IN_PROGRESS"
  , "message":"The operation requires an archive context."
  }
, "0xC01A0021":{
    "code":"STATUS_LOG_ARCHIVE_IN_PROGRESS"
  , "message":"Log archival is in progress."
  }
, "0xC01A0022":{
    "code":"STATUS_LOG_EPHEMERAL"
  , "message":"The operation requires a nonephemeral log, but the log is ephemeral."
  }
, "0xC01A0023":{
    "code":"STATUS_LOG_NOT_ENOUGH_CONTAINERS"
  , "message":"The log must have at least two containers before it can be read from or written to."
  }
, "0xC01A0024":{
    "code":"STATUS_LOG_CLIENT_ALREADY_REGISTERED"
  , "message":"A log client has already registered on the stream."
  }
, "0xC01A0025":{
    "code":"STATUS_LOG_CLIENT_NOT_REGISTERED"
  , "message":"A log client has not been registered on the stream."
  }
, "0xC01A0026":{
    "code":"STATUS_LOG_FULL_HANDLER_IN_PROGRESS"
  , "message":"A request has already been made to handle the log full condition."
  }
, "0xC01A0027":{
    "code":"STATUS_LOG_CONTAINER_READ_FAILED"
  , "message":"The log service encountered an error when attempting to read from a log container."
  }
, "0xC01A0028":{
    "code":"STATUS_LOG_CONTAINER_WRITE_FAILED"
  , "message":"The log service encountered an error when attempting to write to a log container."
  }
, "0xC01A0029":{
    "code":"STATUS_LOG_CONTAINER_OPEN_FAILED"
  , "message":"The log service encountered an error when attempting to open a log container."
  }
, "0xC01A002A":{
    "code":"STATUS_LOG_CONTAINER_STATE_INVALID"
  , "message":"The log service encountered an invalid container state when attempting a requested action."
  }
, "0xC01A002B":{
    "code":"STATUS_LOG_STATE_INVALID"
  , "message":"The log service is not in the correct state to perform a requested action."
  }
, "0xC01A002C":{
    "code":"STATUS_LOG_PINNED"
  , "message":"The log space cannot be reclaimed because the log is pinned."
  }
, "0xC01A002D":{
    "code":"STATUS_LOG_METADATA_FLUSH_FAILED"
  , "message":"The log metadata flush failed."
  }
, "0xC01A002E":{
    "code":"STATUS_LOG_INCONSISTENT_SECURITY"
  , "message":"Security on the log and its containers is inconsistent."
  }
, "0xC01A002F":{
    "code":"STATUS_LOG_APPENDED_FLUSH_FAILED"
  , "message":"Records were appended to the log or reservation changes were made, but the log could not be flushed."
  }
, "0xC01A0030":{
    "code":"STATUS_LOG_PINNED_RESERVATION"
  , "message":"The log is pinned due to reservation consuming most of the log space. Free some reserved records to make space available."
  }
, "0xC01B00EA":{
    "code":"STATUS_VIDEO_HUNG_DISPLAY_DRIVER_THREAD"
  , "message":"{Display Driver Stopped Responding} The %hs display driver has stopped working normally. Save your work and reboot the system to restore full display functionality. The next time you reboot the computer, a dialog box will allow you to upload data about this failure to Microsoft."
  }
, "0xC01C0001":{
    "code":"STATUS_FLT_NO_HANDLER_DEFINED"
  , "message":"A handler was not defined by the filter for this operation."
  }
, "0xC01C0002":{
    "code":"STATUS_FLT_CONTEXT_ALREADY_DEFINED"
  , "message":"A context is already defined for this object."
  }
, "0xC01C0003":{
    "code":"STATUS_FLT_INVALID_ASYNCHRONOUS_REQUEST"
  , "message":"Asynchronous requests are not valid for this operation."
  }
, "0xC01C0004":{
    "code":"STATUS_FLT_DISALLOW_FAST_IO"
  , "message":"This is an internal error code used by the filter manager to determine if a fast I/O operation should be forced down the input/output request packet (IRP) path. Minifilters should never return this value."
  }
, "0xC01C0005":{
    "code":"STATUS_FLT_INVALID_NAME_REQUEST"
  , "message":"An invalid name request was made. The name requested cannot be retrieved at this time."
  }
, "0xC01C0006":{
    "code":"STATUS_FLT_NOT_SAFE_TO_POST_OPERATION"
  , "message":"Posting this operation to a worker thread for further processing is not safe at this time because it could lead to a system deadlock."
  }
, "0xC01C0007":{
    "code":"STATUS_FLT_NOT_INITIALIZED"
  , "message":"The Filter Manager was not initialized when a filter tried to register. Make sure that the Filter Manager is loaded as a driver."
  }
, "0xC01C0008":{
    "code":"STATUS_FLT_FILTER_NOT_READY"
  , "message":"The filter is not ready for attachment to volumes because it has not finished initializing (FltStartFiltering has not been called)."
  }
, "0xC01C0009":{
    "code":"STATUS_FLT_POST_OPERATION_CLEANUP"
  , "message":"The filter must clean up any operation-specific context at this time because it is being removed from the system before the operation is completed by the lower drivers."
  }
, "0xC01C000A":{
    "code":"STATUS_FLT_INTERNAL_ERROR"
  , "message":"The Filter Manager had an internal error from which it cannot recover; therefore, the operation has failed. This is usually the result of a filter returning an invalid value from a pre-operation callback."
  }
, "0xC01C000B":{
    "code":"STATUS_FLT_DELETING_OBJECT"
  , "message":"The object specified for this action is in the process of being deleted; therefore, the action requested cannot be completed at this time."
  }
, "0xC01C000C":{
    "code":"STATUS_FLT_MUST_BE_NONPAGED_POOL"
  , "message":"A nonpaged pool must be used for this type of context."
  }
, "0xC01C000D":{
    "code":"STATUS_FLT_DUPLICATE_ENTRY"
  , "message":"A duplicate handler definition has been provided for an operation."
  }
, "0xC01C000E":{
    "code":"STATUS_FLT_CBDQ_DISABLED"
  , "message":"The callback data queue has been disabled."
  }
, "0xC01C000F":{
    "code":"STATUS_FLT_DO_NOT_ATTACH"
  , "message":"Do not attach the filter to the volume at this time."
  }
, "0xC01C0010":{
    "code":"STATUS_FLT_DO_NOT_DETACH"
  , "message":"Do not detach the filter from the volume at this time."
  }
, "0xC01C0011":{
    "code":"STATUS_FLT_INSTANCE_ALTITUDE_COLLISION"
  , "message":"An instance already exists at this altitude on the volume specified."
  }
, "0xC01C0012":{
    "code":"STATUS_FLT_INSTANCE_NAME_COLLISION"
  , "message":"An instance already exists with this name on the volume specified."
  }
, "0xC01C0013":{
    "code":"STATUS_FLT_FILTER_NOT_FOUND"
  , "message":"The system could not find the filter specified."
  }
, "0xC01C0014":{
    "code":"STATUS_FLT_VOLUME_NOT_FOUND"
  , "message":"The system could not find the volume specified."
  }
, "0xC01C0015":{
    "code":"STATUS_FLT_INSTANCE_NOT_FOUND"
  , "message":"The system could not find the instance specified."
  }
, "0xC01C0016":{
    "code":"STATUS_FLT_CONTEXT_ALLOCATION_NOT_FOUND"
  , "message":"No registered context allocation definition was found for the given request."
  }
, "0xC01C0017":{
    "code":"STATUS_FLT_INVALID_CONTEXT_REGISTRATION"
  , "message":"An invalid parameter was specified during context registration."
  }
, "0xC01C0018":{
    "code":"STATUS_FLT_NAME_CACHE_MISS"
  , "message":"The name requested was not found in the Filter Manager name cache and could not be retrieved from the file system."
  }
, "0xC01C0019":{
    "code":"STATUS_FLT_NO_DEVICE_OBJECT"
  , "message":"The requested device object does not exist for the given volume."
  }
, "0xC01C001A":{
    "code":"STATUS_FLT_VOLUME_ALREADY_MOUNTED"
  , "message":"The specified volume is already mounted."
  }
, "0xC01C001B":{
    "code":"STATUS_FLT_ALREADY_ENLISTED"
  , "message":"The specified transaction context is already enlisted in a transaction."
  }
, "0xC01C001C":{
    "code":"STATUS_FLT_CONTEXT_ALREADY_LINKED"
  , "message":"The specified context is already attached to another object."
  }
, "0xC01C0020":{
    "code":"STATUS_FLT_NO_WAITER_FOR_REPLY"
  , "message":"No waiter is present for the filter\'s reply to this message."
  }
, "0xC01D0001":{
    "code":"STATUS_MONITOR_NO_DESCRIPTOR"
  , "message":"A monitor descriptor could not be obtained."
  }
, "0xC01D0002":{
    "code":"STATUS_MONITOR_UNKNOWN_DESCRIPTOR_FORMAT"
  , "message":"This release does not support the format of the obtained monitor descriptor."
  }
, "0xC01D0003":{
    "code":"STATUS_MONITOR_INVALID_DESCRIPTOR_CHECKSUM"
  , "message":"The checksum of the obtained monitor descriptor is invalid."
  }
, "0xC01D0004":{
    "code":"STATUS_MONITOR_INVALID_STANDARD_TIMING_BLOCK"
  , "message":"The monitor descriptor contains an invalid standard timing block."
  }
, "0xC01D0005":{
    "code":"STATUS_MONITOR_WMI_DATABLOCK_REGISTRATION_FAILED"
  , "message":"WMI data-block registration failed for one of the MSMonitorClass WMI subclasses."
  }
, "0xC01D0006":{
    "code":"STATUS_MONITOR_INVALID_SERIAL_NUMBER_MONDSC_BLOCK"
  , "message":"The provided monitor descriptor block is either corrupted or does not contain the monitor\'s detailed serial number."
  }
, "0xC01D0007":{
    "code":"STATUS_MONITOR_INVALID_USER_FRIENDLY_MONDSC_BLOCK"
  , "message":"The provided monitor descriptor block is either corrupted or does not contain the monitor\'s user-friendly name."
  }
, "0xC01D0008":{
    "code":"STATUS_MONITOR_NO_MORE_DESCRIPTOR_DATA"
  , "message":"There is no monitor descriptor data at the specified (offset or size) region."
  }
, "0xC01D0009":{
    "code":"STATUS_MONITOR_INVALID_DETAILED_TIMING_BLOCK"
  , "message":"The monitor descriptor contains an invalid detailed timing block."
  }
, "0xC01D000A":{
    "code":"STATUS_MONITOR_INVALID_MANUFACTURE_DATE"
  , "message":"Monitor descriptor contains invalid manufacture date."
  }
, "0xC01E0000":{
    "code":"STATUS_GRAPHICS_NOT_EXCLUSIVE_MODE_OWNER"
  , "message":"Exclusive mode ownership is needed to create an unmanaged primary allocation."
  }
, "0xC01E0001":{
    "code":"STATUS_GRAPHICS_INSUFFICIENT_DMA_BUFFER"
  , "message":"The driver needs more DMA buffer space to complete the requested operation."
  }
, "0xC01E0002":{
    "code":"STATUS_GRAPHICS_INVALID_DISPLAY_ADAPTER"
  , "message":"The specified display adapter handle is invalid."
  }
, "0xC01E0003":{
    "code":"STATUS_GRAPHICS_ADAPTER_WAS_RESET"
  , "message":"The specified display adapter and all of its state have been reset."
  }
, "0xC01E0004":{
    "code":"STATUS_GRAPHICS_INVALID_DRIVER_MODEL"
  , "message":"The driver stack does not match the expected driver model."
  }
, "0xC01E0005":{
    "code":"STATUS_GRAPHICS_PRESENT_MODE_CHANGED"
  , "message":"Present happened but ended up into the changed desktop mode."
  }
, "0xC01E0006":{
    "code":"STATUS_GRAPHICS_PRESENT_OCCLUDED"
  , "message":"Nothing to present due to desktop occlusion."
  }
, "0xC01E0007":{
    "code":"STATUS_GRAPHICS_PRESENT_DENIED"
  , "message":"Not able to present due to denial of desktop access."
  }
, "0xC01E0008":{
    "code":"STATUS_GRAPHICS_CANNOTCOLORCONVERT"
  , "message":"Not able to present with color conversion."
  }
, "0xC01E000B":{
    "code":"STATUS_GRAPHICS_PRESENT_REDIRECTION_DISABLED"
  , "message":"Present redirection is disabled (desktop windowing management subsystem is off)."
  }
, "0xC01E000C":{
    "code":"STATUS_GRAPHICS_PRESENT_UNOCCLUDED"
  , "message":"Previous exclusive VidPn source owner has released its ownership"
  }
, "0xC01E0100":{
    "code":"STATUS_GRAPHICS_NO_VIDEO_MEMORY"
  , "message":"Not enough video memory is available to complete the operation."
  }
, "0xC01E0101":{
    "code":"STATUS_GRAPHICS_CANT_LOCK_MEMORY"
  , "message":"Could not probe and lock the underlying memory of an allocation."
  }
, "0xC01E0102":{
    "code":"STATUS_GRAPHICS_ALLOCATION_BUSY"
  , "message":"The allocation is currently busy."
  }
, "0xC01E0103":{
    "code":"STATUS_GRAPHICS_TOO_MANY_REFERENCES"
  , "message":"An object being referenced has already reached the maximum reference count and cannot be referenced further."
  }
, "0xC01E0104":{
    "code":"STATUS_GRAPHICS_TRY_AGAIN_LATER"
  , "message":"A problem could not be solved due to an existing condition. Try again later."
  }
, "0xC01E0105":{
    "code":"STATUS_GRAPHICS_TRY_AGAIN_NOW"
  , "message":"A problem could not be solved due to an existing condition. Try again now."
  }
, "0xC01E0106":{
    "code":"STATUS_GRAPHICS_ALLOCATION_INVALID"
  , "message":"The allocation is invalid."
  }
, "0xC01E0107":{
    "code":"STATUS_GRAPHICS_UNSWIZZLING_APERTURE_UNAVAILABLE"
  , "message":"No more unswizzling apertures are currently available."
  }
, "0xC01E0108":{
    "code":"STATUS_GRAPHICS_UNSWIZZLING_APERTURE_UNSUPPORTED"
  , "message":"The current allocation cannot be unswizzled by an aperture."
  }
, "0xC01E0109":{
    "code":"STATUS_GRAPHICS_CANT_EVICT_PINNED_ALLOCATION"
  , "message":"The request failed because a pinned allocation cannot be evicted."
  }
, "0xC01E0110":{
    "code":"STATUS_GRAPHICS_INVALID_ALLOCATION_USAGE"
  , "message":"The allocation cannot be used from its current segment location for the specified operation."
  }
, "0xC01E0111":{
    "code":"STATUS_GRAPHICS_CANT_RENDER_LOCKED_ALLOCATION"
  , "message":"A locked allocation cannot be used in the current command buffer."
  }
, "0xC01E0112":{
    "code":"STATUS_GRAPHICS_ALLOCATION_CLOSED"
  , "message":"The allocation being referenced has been closed permanently."
  }
, "0xC01E0113":{
    "code":"STATUS_GRAPHICS_INVALID_ALLOCATION_INSTANCE"
  , "message":"An invalid allocation instance is being referenced."
  }
, "0xC01E0114":{
    "code":"STATUS_GRAPHICS_INVALID_ALLOCATION_HANDLE"
  , "message":"An invalid allocation handle is being referenced."
  }
, "0xC01E0115":{
    "code":"STATUS_GRAPHICS_WRONG_ALLOCATION_DEVICE"
  , "message":"The allocation being referenced does not belong to the current device."
  }
, "0xC01E0116":{
    "code":"STATUS_GRAPHICS_ALLOCATION_CONTENT_LOST"
  , "message":"The specified allocation lost its content."
  }
, "0xC01E0200":{
    "code":"STATUS_GRAPHICS_GPU_EXCEPTION_ON_DEVICE"
  , "message":"A GPU exception was detected on the given device. The device cannot be scheduled."
  }
, "0xC01E0300":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN_TOPOLOGY"
  , "message":"The specified VidPN topology is invalid."
  }
, "0xC01E0301":{
    "code":"STATUS_GRAPHICS_VIDPN_TOPOLOGY_NOT_SUPPORTED"
  , "message":"The specified VidPN topology is valid but is not supported by this model of the display adapter."
  }
, "0xC01E0302":{
    "code":"STATUS_GRAPHICS_VIDPN_TOPOLOGY_CURRENTLY_NOT_SUPPORTED"
  , "message":"The specified VidPN topology is valid but is not currently supported by the display adapter due to allocation of its resources."
  }
, "0xC01E0303":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN"
  , "message":"The specified VidPN handle is invalid."
  }
, "0xC01E0304":{
    "code":"STATUS_GRAPHICS_INVALID_VIDEO_PRESENT_SOURCE"
  , "message":"The specified video present source is invalid."
  }
, "0xC01E0305":{
    "code":"STATUS_GRAPHICS_INVALID_VIDEO_PRESENT_TARGET"
  , "message":"The specified video present target is invalid."
  }
, "0xC01E0306":{
    "code":"STATUS_GRAPHICS_VIDPN_MODALITY_NOT_SUPPORTED"
  , "message":"The specified VidPN modality is not supported (for example, at least two of the pinned modes are not co-functional)."
  }
, "0xC01E0308":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN_SOURCEMODESET"
  , "message":"The specified VidPN source mode set is invalid."
  }
, "0xC01E0309":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN_TARGETMODESET"
  , "message":"The specified VidPN target mode set is invalid."
  }
, "0xC01E030A":{
    "code":"STATUS_GRAPHICS_INVALID_FREQUENCY"
  , "message":"The specified video signal frequency is invalid."
  }
, "0xC01E030B":{
    "code":"STATUS_GRAPHICS_INVALID_ACTIVE_REGION"
  , "message":"The specified video signal active region is invalid."
  }
, "0xC01E030C":{
    "code":"STATUS_GRAPHICS_INVALID_TOTAL_REGION"
  , "message":"The specified video signal total region is invalid."
  }
, "0xC01E0310":{
    "code":"STATUS_GRAPHICS_INVALID_VIDEO_PRESENT_SOURCE_MODE"
  , "message":"The specified video present source mode is invalid."
  }
, "0xC01E0311":{
    "code":"STATUS_GRAPHICS_INVALID_VIDEO_PRESENT_TARGET_MODE"
  , "message":"The specified video present target mode is invalid."
  }
, "0xC01E0312":{
    "code":"STATUS_GRAPHICS_PINNED_MODE_MUST_REMAIN_IN_SET"
  , "message":"The pinned mode must remain in the set on the VidPN\'s co-functional modality enumeration."
  }
, "0xC01E0313":{
    "code":"STATUS_GRAPHICS_PATH_ALREADY_IN_TOPOLOGY"
  , "message":"The specified video present path is already in the VidPN\'s topology."
  }
, "0xC01E0314":{
    "code":"STATUS_GRAPHICS_MODE_ALREADY_IN_MODESET"
  , "message":"The specified mode is already in the mode set."
  }
, "0xC01E0315":{
    "code":"STATUS_GRAPHICS_INVALID_VIDEOPRESENTSOURCESET"
  , "message":"The specified video present source set is invalid."
  }
, "0xC01E0316":{
    "code":"STATUS_GRAPHICS_INVALID_VIDEOPRESENTTARGETSET"
  , "message":"The specified video present target set is invalid."
  }
, "0xC01E0317":{
    "code":"STATUS_GRAPHICS_SOURCE_ALREADY_IN_SET"
  , "message":"The specified video present source is already in the video present source set."
  }
, "0xC01E0318":{
    "code":"STATUS_GRAPHICS_TARGET_ALREADY_IN_SET"
  , "message":"The specified video present target is already in the video present target set."
  }
, "0xC01E0319":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN_PRESENT_PATH"
  , "message":"The specified VidPN present path is invalid."
  }
, "0xC01E031A":{
    "code":"STATUS_GRAPHICS_NO_RECOMMENDED_VIDPN_TOPOLOGY"
  , "message":"The miniport has no recommendation for augmenting the specified VidPN\'s topology."
  }
, "0xC01E031B":{
    "code":"STATUS_GRAPHICS_INVALID_MONITOR_FREQUENCYRANGESET"
  , "message":"The specified monitor frequency range set is invalid."
  }
, "0xC01E031C":{
    "code":"STATUS_GRAPHICS_INVALID_MONITOR_FREQUENCYRANGE"
  , "message":"The specified monitor frequency range is invalid."
  }
, "0xC01E031D":{
    "code":"STATUS_GRAPHICS_FREQUENCYRANGE_NOT_IN_SET"
  , "message":"The specified frequency range is not in the specified monitor frequency range set."
  }
, "0xC01E031F":{
    "code":"STATUS_GRAPHICS_FREQUENCYRANGE_ALREADY_IN_SET"
  , "message":"The specified frequency range is already in the specified monitor frequency range set."
  }
, "0xC01E0320":{
    "code":"STATUS_GRAPHICS_STALE_MODESET"
  , "message":"The specified mode set is stale. Reacquire the new mode set."
  }
, "0xC01E0321":{
    "code":"STATUS_GRAPHICS_INVALID_MONITOR_SOURCEMODESET"
  , "message":"The specified monitor source mode set is invalid."
  }
, "0xC01E0322":{
    "code":"STATUS_GRAPHICS_INVALID_MONITOR_SOURCE_MODE"
  , "message":"The specified monitor source mode is invalid."
  }
, "0xC01E0323":{
    "code":"STATUS_GRAPHICS_NO_RECOMMENDED_FUNCTIONAL_VIDPN"
  , "message":"The miniport does not have a recommendation regarding the request to provide a functional VidPN given the current display adapter configuration."
  }
, "0xC01E0324":{
    "code":"STATUS_GRAPHICS_MODE_ID_MUST_BE_UNIQUE"
  , "message":"The ID of the specified mode is being used by another mode in the set."
  }
, "0xC01E0325":{
    "code":"STATUS_GRAPHICS_EMPTY_ADAPTER_MONITOR_MODE_SUPPORT_INTERSECTION"
  , "message":"The system failed to determine a mode that is supported by both the display adapter and the monitor connected to it."
  }
, "0xC01E0326":{
    "code":"STATUS_GRAPHICS_VIDEO_PRESENT_TARGETS_LESS_THAN_SOURCES"
  , "message":"The number of video present targets must be greater than or equal to the number of video present sources."
  }
, "0xC01E0327":{
    "code":"STATUS_GRAPHICS_PATH_NOT_IN_TOPOLOGY"
  , "message":"The specified present path is not in the VidPN\'s topology."
  }
, "0xC01E0328":{
    "code":"STATUS_GRAPHICS_ADAPTER_MUST_HAVE_AT_LEAST_ONE_SOURCE"
  , "message":"The display adapter must have at least one video present source."
  }
, "0xC01E0329":{
    "code":"STATUS_GRAPHICS_ADAPTER_MUST_HAVE_AT_LEAST_ONE_TARGET"
  , "message":"The display adapter must have at least one video present target."
  }
, "0xC01E032A":{
    "code":"STATUS_GRAPHICS_INVALID_MONITORDESCRIPTORSET"
  , "message":"The specified monitor descriptor set is invalid."
  }
, "0xC01E032B":{
    "code":"STATUS_GRAPHICS_INVALID_MONITORDESCRIPTOR"
  , "message":"The specified monitor descriptor is invalid."
  }
, "0xC01E032C":{
    "code":"STATUS_GRAPHICS_MONITORDESCRIPTOR_NOT_IN_SET"
  , "message":"The specified descriptor is not in the specified monitor descriptor set."
  }
, "0xC01E032D":{
    "code":"STATUS_GRAPHICS_MONITORDESCRIPTOR_ALREADY_IN_SET"
  , "message":"The specified descriptor is already in the specified monitor descriptor set."
  }
, "0xC01E032E":{
    "code":"STATUS_GRAPHICS_MONITORDESCRIPTOR_ID_MUST_BE_UNIQUE"
  , "message":"The ID of the specified monitor descriptor is being used by another descriptor in the set."
  }
, "0xC01E032F":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN_TARGET_SUBSET_TYPE"
  , "message":"The specified video present target subset type is invalid."
  }
, "0xC01E0330":{
    "code":"STATUS_GRAPHICS_RESOURCES_NOT_RELATED"
  , "message":"Two or more of the specified resources are not related to each other, as defined by the interface semantics."
  }
, "0xC01E0331":{
    "code":"STATUS_GRAPHICS_SOURCE_ID_MUST_BE_UNIQUE"
  , "message":"The ID of the specified video present source is being used by another source in the set."
  }
, "0xC01E0332":{
    "code":"STATUS_GRAPHICS_TARGET_ID_MUST_BE_UNIQUE"
  , "message":"The ID of the specified video present target is being used by another target in the set."
  }
, "0xC01E0333":{
    "code":"STATUS_GRAPHICS_NO_AVAILABLE_VIDPN_TARGET"
  , "message":"The specified VidPN source cannot be used because there is no available VidPN target to connect it to."
  }
, "0xC01E0334":{
    "code":"STATUS_GRAPHICS_MONITOR_COULD_NOT_BE_ASSOCIATED_WITH_ADAPTER"
  , "message":"The newly arrived monitor could not be associated with a display adapter."
  }
, "0xC01E0335":{
    "code":"STATUS_GRAPHICS_NO_VIDPNMGR"
  , "message":"The particular display adapter does not have an associated VidPN manager."
  }
, "0xC01E0336":{
    "code":"STATUS_GRAPHICS_NO_ACTIVE_VIDPN"
  , "message":"The VidPN manager of the particular display adapter does not have an active VidPN."
  }
, "0xC01E0337":{
    "code":"STATUS_GRAPHICS_STALE_VIDPN_TOPOLOGY"
  , "message":"The specified VidPN topology is stale; obtain the new topology."
  }
, "0xC01E0338":{
    "code":"STATUS_GRAPHICS_MONITOR_NOT_CONNECTED"
  , "message":"No monitor is connected on the specified video present target."
  }
, "0xC01E0339":{
    "code":"STATUS_GRAPHICS_SOURCE_NOT_IN_TOPOLOGY"
  , "message":"The specified source is not part of the specified VidPN\'s topology."
  }
, "0xC01E033A":{
    "code":"STATUS_GRAPHICS_INVALID_PRIMARYSURFACE_SIZE"
  , "message":"The specified primary surface size is invalid."
  }
, "0xC01E033B":{
    "code":"STATUS_GRAPHICS_INVALID_VISIBLEREGION_SIZE"
  , "message":"The specified visible region size is invalid."
  }
, "0xC01E033C":{
    "code":"STATUS_GRAPHICS_INVALID_STRIDE"
  , "message":"The specified stride is invalid."
  }
, "0xC01E033D":{
    "code":"STATUS_GRAPHICS_INVALID_PIXELFORMAT"
  , "message":"The specified pixel format is invalid."
  }
, "0xC01E033E":{
    "code":"STATUS_GRAPHICS_INVALID_COLORBASIS"
  , "message":"The specified color basis is invalid."
  }
, "0xC01E033F":{
    "code":"STATUS_GRAPHICS_INVALID_PIXELVALUEACCESSMODE"
  , "message":"The specified pixel value access mode is invalid."
  }
, "0xC01E0340":{
    "code":"STATUS_GRAPHICS_TARGET_NOT_IN_TOPOLOGY"
  , "message":"The specified target is not part of the specified VidPN\'s topology."
  }
, "0xC01E0341":{
    "code":"STATUS_GRAPHICS_NO_DISPLAY_MODE_MANAGEMENT_SUPPORT"
  , "message":"Failed to acquire the display mode management interface."
  }
, "0xC01E0342":{
    "code":"STATUS_GRAPHICS_VIDPN_SOURCE_IN_USE"
  , "message":"The specified VidPN source is already owned by a DMM client and cannot be used until that client releases it."
  }
, "0xC01E0343":{
    "code":"STATUS_GRAPHICS_CANT_ACCESS_ACTIVE_VIDPN"
  , "message":"The specified VidPN is active and cannot be accessed."
  }
, "0xC01E0344":{
    "code":"STATUS_GRAPHICS_INVALID_PATH_IMPORTANCE_ORDINAL"
  , "message":"The specified VidPN\'s present path importance ordinal is invalid."
  }
, "0xC01E0345":{
    "code":"STATUS_GRAPHICS_INVALID_PATH_CONTENT_GEOMETRY_TRANSFORMATION"
  , "message":"The specified VidPN\'s present path content geometry transformation is invalid."
  }
, "0xC01E0346":{
    "code":"STATUS_GRAPHICS_PATH_CONTENT_GEOMETRY_TRANSFORMATION_NOT_SUPPORTED"
  , "message":"The specified content geometry transformation is not supported on the respective VidPN present path."
  }
, "0xC01E0347":{
    "code":"STATUS_GRAPHICS_INVALID_GAMMA_RAMP"
  , "message":"The specified gamma ramp is invalid."
  }
, "0xC01E0348":{
    "code":"STATUS_GRAPHICS_GAMMA_RAMP_NOT_SUPPORTED"
  , "message":"The specified gamma ramp is not supported on the respective VidPN present path."
  }
, "0xC01E0349":{
    "code":"STATUS_GRAPHICS_MULTISAMPLING_NOT_SUPPORTED"
  , "message":"Multisampling is not supported on the respective VidPN present path."
  }
, "0xC01E034A":{
    "code":"STATUS_GRAPHICS_MODE_NOT_IN_MODESET"
  , "message":"The specified mode is not in the specified mode set."
  }
, "0xC01E034D":{
    "code":"STATUS_GRAPHICS_INVALID_VIDPN_TOPOLOGY_RECOMMENDATION_REASON"
  , "message":"The specified VidPN topology recommendation reason is invalid."
  }
, "0xC01E034E":{
    "code":"STATUS_GRAPHICS_INVALID_PATH_CONTENT_TYPE"
  , "message":"The specified VidPN present path content type is invalid."
  }
, "0xC01E034F":{
    "code":"STATUS_GRAPHICS_INVALID_COPYPROTECTION_TYPE"
  , "message":"The specified VidPN present path copy protection type is invalid."
  }
, "0xC01E0350":{
    "code":"STATUS_GRAPHICS_UNASSIGNED_MODESET_ALREADY_EXISTS"
  , "message":"Only one unassigned mode set can exist at any one time for a particular VidPN source or target."
  }
, "0xC01E0352":{
    "code":"STATUS_GRAPHICS_INVALID_SCANLINE_ORDERING"
  , "message":"The specified scan line ordering type is invalid."
  }
, "0xC01E0353":{
    "code":"STATUS_GRAPHICS_TOPOLOGY_CHANGES_NOT_ALLOWED"
  , "message":"The topology changes are not allowed for the specified VidPN."
  }
, "0xC01E0354":{
    "code":"STATUS_GRAPHICS_NO_AVAILABLE_IMPORTANCE_ORDINALS"
  , "message":"All available importance ordinals are being used in the specified topology."
  }
, "0xC01E0355":{
    "code":"STATUS_GRAPHICS_INCOMPATIBLE_PRIVATE_FORMAT"
  , "message":"The specified primary surface has a different private-format attribute than the current primary surface."
  }
, "0xC01E0356":{
    "code":"STATUS_GRAPHICS_INVALID_MODE_PRUNING_ALGORITHM"
  , "message":"The specified mode-pruning algorithm is invalid."
  }
, "0xC01E0357":{
    "code":"STATUS_GRAPHICS_INVALID_MONITOR_CAPABILITY_ORIGIN"
  , "message":"The specified monitor-capability origin is invalid."
  }
, "0xC01E0358":{
    "code":"STATUS_GRAPHICS_INVALID_MONITOR_FREQUENCYRANGE_CONSTRAINT"
  , "message":"The specified monitor-frequency range constraint is invalid."
  }
, "0xC01E0359":{
    "code":"STATUS_GRAPHICS_MAX_NUM_PATHS_REACHED"
  , "message":"The maximum supported number of present paths has been reached."
  }
, "0xC01E035A":{
    "code":"STATUS_GRAPHICS_CANCEL_VIDPN_TOPOLOGY_AUGMENTATION"
  , "message":"The miniport requested that augmentation be canceled for the specified source of the specified VidPN\'s topology."
  }
, "0xC01E035B":{
    "code":"STATUS_GRAPHICS_INVALID_CLIENT_TYPE"
  , "message":"The specified client type was not recognized."
  }
, "0xC01E035C":{
    "code":"STATUS_GRAPHICS_CLIENTVIDPN_NOT_SET"
  , "message":"The client VidPN is not set on this adapter (for example, no user mode-initiated mode changes have taken place on this adapter)."
  }
, "0xC01E0400":{
    "code":"STATUS_GRAPHICS_SPECIFIED_CHILD_ALREADY_CONNECTED"
  , "message":"The specified display adapter child device already has an external device connected to it."
  }
, "0xC01E0401":{
    "code":"STATUS_GRAPHICS_CHILD_DESCRIPTOR_NOT_SUPPORTED"
  , "message":"The display adapter child device does not support reporting a descriptor."
  }
, "0xC01E0430":{
    "code":"STATUS_GRAPHICS_NOT_A_LINKED_ADAPTER"
  , "message":"The display adapter is not linked to any other adapters."
  }
, "0xC01E0431":{
    "code":"STATUS_GRAPHICS_LEADLINK_NOT_ENUMERATED"
  , "message":"The lead adapter in a linked configuration was not enumerated yet."
  }
, "0xC01E0432":{
    "code":"STATUS_GRAPHICS_CHAINLINKS_NOT_ENUMERATED"
  , "message":"Some chain adapters in a linked configuration have not yet been enumerated."
  }
, "0xC01E0433":{
    "code":"STATUS_GRAPHICS_ADAPTER_CHAIN_NOT_READY"
  , "message":"The chain of linked adapters is not ready to start because of an unknown failure."
  }
, "0xC01E0434":{
    "code":"STATUS_GRAPHICS_CHAINLINKS_NOT_STARTED"
  , "message":"An attempt was made to start a lead link display adapter when the chain links had not yet started."
  }
, "0xC01E0435":{
    "code":"STATUS_GRAPHICS_CHAINLINKS_NOT_POWERED_ON"
  , "message":"An attempt was made to turn on a lead link display adapter when the chain links were turned off."
  }
, "0xC01E0436":{
    "code":"STATUS_GRAPHICS_INCONSISTENT_DEVICE_LINK_STATE"
  , "message":"The adapter link was found in an inconsistent state. Not all adapters are in an expected PNP/power state."
  }
, "0xC01E0438":{
    "code":"STATUS_GRAPHICS_NOT_POST_DEVICE_DRIVER"
  , "message":"The driver trying to start is not the same as the driver for the posted display adapter."
  }
, "0xC01E043B":{
    "code":"STATUS_GRAPHICS_ADAPTER_ACCESS_NOT_EXCLUDED"
  , "message":"An operation is being attempted that requires the display adapter to be in a quiescent state."
  }
, "0xC01E0500":{
    "code":"STATUS_GRAPHICS_OPM_NOT_SUPPORTED"
  , "message":"The driver does not support OPM."
  }
, "0xC01E0501":{
    "code":"STATUS_GRAPHICS_COPP_NOT_SUPPORTED"
  , "message":"The driver does not support COPP."
  }
, "0xC01E0502":{
    "code":"STATUS_GRAPHICS_UAB_NOT_SUPPORTED"
  , "message":"The driver does not support UAB."
  }
, "0xC01E0503":{
    "code":"STATUS_GRAPHICS_OPM_INVALID_ENCRYPTED_PARAMETERS"
  , "message":"The specified encrypted parameters are invalid."
  }
, "0xC01E0504":{
    "code":"STATUS_GRAPHICS_OPM_PARAMETER_ARRAY_TOO_SMALL"
  , "message":"An array passed to a function cannot hold all of the data that the function wants to put in it."
  }
, "0xC01E0505":{
    "code":"STATUS_GRAPHICS_OPM_NO_PROTECTED_OUTPUTS_EXIST"
  , "message":"The GDI display device passed to this function does not have any active protected outputs."
  }
, "0xC01E0506":{
    "code":"STATUS_GRAPHICS_PVP_NO_DISPLAY_DEVICE_CORRESPONDS_TO_NAME"
  , "message":"The PVP cannot find an actual GDI display device that corresponds to the passed-in GDI display device name."
  }
, "0xC01E0507":{
    "code":"STATUS_GRAPHICS_PVP_DISPLAY_DEVICE_NOT_ATTACHED_TO_DESKTOP"
  , "message":"This function failed because the GDI display device passed to it was not attached to the Windows desktop."
  }
, "0xC01E0508":{
    "code":"STATUS_GRAPHICS_PVP_MIRRORING_DEVICES_NOT_SUPPORTED"
  , "message":"The PVP does not support mirroring display devices because they do not have any protected outputs."
  }
, "0xC01E050A":{
    "code":"STATUS_GRAPHICS_OPM_INVALID_POINTER"
  , "message":"The function failed because an invalid pointer parameter was passed to it. A pointer parameter is invalid if it is null, is not correctly aligned, or it points to an invalid address or a kernel mode address."
  }
, "0xC01E050B":{
    "code":"STATUS_GRAPHICS_OPM_INTERNAL_ERROR"
  , "message":"An internal error caused an operation to fail."
  }
, "0xC01E050C":{
    "code":"STATUS_GRAPHICS_OPM_INVALID_HANDLE"
  , "message":"The function failed because the caller passed in an invalid OPM user-mode handle."
  }
, "0xC01E050D":{
    "code":"STATUS_GRAPHICS_PVP_NO_MONITORS_CORRESPOND_TO_DISPLAY_DEVICE"
  , "message":"This function failed because the GDI device passed to it did not have any monitors associated with it."
  }
, "0xC01E050E":{
    "code":"STATUS_GRAPHICS_PVP_INVALID_CERTIFICATE_LENGTH"
  , "message":"A certificate could not be returned because the certificate buffer passed to the function was too small."
  }
, "0xC01E050F":{
    "code":"STATUS_GRAPHICS_OPM_SPANNING_MODE_ENABLED"
  , "message":"DxgkDdiOpmCreateProtectedOutput() could not create a protected output because the video present yarget is in spanning mode."
  }
, "0xC01E0510":{
    "code":"STATUS_GRAPHICS_OPM_THEATER_MODE_ENABLED"
  , "message":"DxgkDdiOpmCreateProtectedOutput() could not create a protected output because the video present target is in theater mode."
  }
, "0xC01E0511":{
    "code":"STATUS_GRAPHICS_PVP_HFS_FAILED"
  , "message":"The function call failed because the display adapter\'s hardware functionality scan (HFS) failed to validate the graphics hardware."
  }
, "0xC01E0512":{
    "code":"STATUS_GRAPHICS_OPM_INVALID_SRM"
  , "message":"The HDCP SRM passed to this function did not comply with section 5 of the HDCP 1.1 specification."
  }
, "0xC01E0513":{
    "code":"STATUS_GRAPHICS_OPM_OUTPUT_DOES_NOT_SUPPORT_HDCP"
  , "message":"The protected output cannot enable the HDCP system because it does not support it."
  }
, "0xC01E0514":{
    "code":"STATUS_GRAPHICS_OPM_OUTPUT_DOES_NOT_SUPPORT_ACP"
  , "message":"The protected output cannot enable analog copy protection because it does not support it."
  }
, "0xC01E0515":{
    "code":"STATUS_GRAPHICS_OPM_OUTPUT_DOES_NOT_SUPPORT_CGMSA"
  , "message":"The protected output cannot enable the CGMS-A protection technology because it does not support it."
  }
, "0xC01E0516":{
    "code":"STATUS_GRAPHICS_OPM_HDCP_SRM_NEVER_SET"
  , "message":"DxgkDdiOPMGetInformation() cannot return the version of the SRM being used because the application never successfully passed an SRM to the protected output."
  }
, "0xC01E0517":{
    "code":"STATUS_GRAPHICS_OPM_RESOLUTION_TOO_HIGH"
  , "message":"DxgkDdiOPMConfigureProtectedOutput() cannot enable the specified output protection technology because the output\'s screen resolution is too high."
  }
, "0xC01E0518":{
    "code":"STATUS_GRAPHICS_OPM_ALL_HDCP_HARDWARE_ALREADY_IN_USE"
  , "message":"DxgkDdiOPMConfigureProtectedOutput() cannot enable HDCP because other physical outputs are using the display adapter\'s HDCP hardware."
  }
, "0xC01E051A":{
    "code":"STATUS_GRAPHICS_OPM_PROTECTED_OUTPUT_NO_LONGER_EXISTS"
  , "message":"The operating system asynchronously destroyed this OPM-protected output because the operating system state changed. This error typically occurs because the monitor PDO associated with this protected output was removed or stopped, the protected output\'s session became a nonconsole session, or the protected output\'s desktop became inactive."
  }
, "0xC01E051B":{
    "code":"STATUS_GRAPHICS_OPM_SESSION_TYPE_CHANGE_IN_PROGRESS"
  , "message":"OPM functions cannot be called when a session is changing its type. Three types of sessions currently exist: console, disconnected, and remote (RDP or ICA)."
  }
, "0xC01E051C":{
    "code":"STATUS_GRAPHICS_OPM_PROTECTED_OUTPUT_DOES_NOT_HAVE_COPP_SEMANTICS"
  , "message":"The DxgkDdiOPMGetCOPPCompatibleInformation, DxgkDdiOPMGetInformation, or DxgkDdiOPMConfigureProtectedOutput function failed. This error is returned only if a protected output has OPM semantics.\nDxgkDdiOPMGetCOPPCompatibleInformation always returns this error if a protected output has OPM semantics.\nDxgkDdiOPMGetInformation returns this error code if the caller requested COPP-specific information.\nDxgkDdiOPMConfigureProtectedOutput returns this error when the caller tries to use a COPP-specific command."
  }
, "0xC01E051D":{
    "code":"STATUS_GRAPHICS_OPM_INVALID_INFORMATION_REQUEST"
  , "message":"The DxgkDdiOPMGetInformation and DxgkDdiOPMGetCOPPCompatibleInformation functions return this error code if the passed-in sequence number is not the expected sequence number or the passed-in OMAC value is invalid."
  }
, "0xC01E051E":{
    "code":"STATUS_GRAPHICS_OPM_DRIVER_INTERNAL_ERROR"
  , "message":"The function failed because an unexpected error occurred inside a display driver."
  }
, "0xC01E051F":{
    "code":"STATUS_GRAPHICS_OPM_PROTECTED_OUTPUT_DOES_NOT_HAVE_OPM_SEMANTICS"
  , "message":"The DxgkDdiOPMGetCOPPCompatibleInformation, DxgkDdiOPMGetInformation, or DxgkDdiOPMConfigureProtectedOutput function failed. This error is returned only if a protected output has COPP semantics.\nDxgkDdiOPMGetCOPPCompatibleInformation returns this error code if the caller requested OPM-specific information.\nDxgkDdiOPMGetInformation always returns this error if a protected output has COPP semantics.\nDxgkDdiOPMConfigureProtectedOutput returns this error when the caller tries to use an OPM-specific command."
  }
, "0xC01E0520":{
    "code":"STATUS_GRAPHICS_OPM_SIGNALING_NOT_SUPPORTED"
  , "message":"The DxgkDdiOPMGetCOPPCompatibleInformation and DxgkDdiOPMConfigureProtectedOutput functions return this error if the display driver does not support the DXGKMDT_OPM_GET_ACP_AND_CGMSA_SIGNALING and DXGKMDT_OPM_SET_ACP_AND_CGMSA_SIGNALING GUIDs."
  }
, "0xC01E0521":{
    "code":"STATUS_GRAPHICS_OPM_INVALID_CONFIGURATION_REQUEST"
  , "message":"The DxgkDdiOPMConfigureProtectedOutput function returns this error code if the passed-in sequence number is not the expected sequence number or the passed-in OMAC value is invalid."
  }
, "0xC01E0580":{
    "code":"STATUS_GRAPHICS_I2C_NOT_SUPPORTED"
  , "message":"The monitor connected to the specified video output does not have an I2C bus."
  }
, "0xC01E0581":{
    "code":"STATUS_GRAPHICS_I2C_DEVICE_DOES_NOT_EXIST"
  , "message":"No device on the I2C bus has the specified address."
  }
, "0xC01E0582":{
    "code":"STATUS_GRAPHICS_I2C_ERROR_TRANSMITTING_DATA"
  , "message":"An error occurred while transmitting data to the device on the I2C bus."
  }
, "0xC01E0583":{
    "code":"STATUS_GRAPHICS_I2C_ERROR_RECEIVING_DATA"
  , "message":"An error occurred while receiving data from the device on the I2C bus."
  }
, "0xC01E0584":{
    "code":"STATUS_GRAPHICS_DDCCI_VCP_NOT_SUPPORTED"
  , "message":"The monitor does not support the specified VCP code."
  }
, "0xC01E0585":{
    "code":"STATUS_GRAPHICS_DDCCI_INVALID_DATA"
  , "message":"The data received from the monitor is invalid."
  }
, "0xC01E0586":{
    "code":"STATUS_GRAPHICS_DDCCI_MONITOR_RETURNED_INVALID_TIMING_STATUS_BYTE"
  , "message":"A function call failed because a monitor returned an invalid timing status byte when the operating system used the DDC/CI get timing report and timing message command to get a timing report from a monitor."
  }
, "0xC01E0587":{
    "code":"STATUS_GRAPHICS_DDCCI_INVALID_CAPABILITIES_STRING"
  , "message":"A monitor returned a DDC/CI capabilities string that did not comply with the ACCESS.bus 3.0, DDC/CI 1.1, or MCCS 2 Revision 1 specification."
  }
, "0xC01E0588":{
    "code":"STATUS_GRAPHICS_MCA_INTERNAL_ERROR"
  , "message":"An internal error caused an operation to fail."
  }
, "0xC01E0589":{
    "code":"STATUS_GRAPHICS_DDCCI_INVALID_MESSAGE_COMMAND"
  , "message":"An operation failed because a DDC/CI message had an invalid value in its command field."
  }
, "0xC01E058A":{
    "code":"STATUS_GRAPHICS_DDCCI_INVALID_MESSAGE_LENGTH"
  , "message":"This error occurred because a DDC/CI message had an invalid value in its length field."
  }
, "0xC01E058B":{
    "code":"STATUS_GRAPHICS_DDCCI_INVALID_MESSAGE_CHECKSUM"
  , "message":"This error occurred because the value in a DDC/CI message\'s checksum field did not match the message\'s computed checksum value. This error implies that the data was corrupted while it was being transmitted from a monitor to a computer."
  }
, "0xC01E058C":{
    "code":"STATUS_GRAPHICS_INVALID_PHYSICAL_MONITOR_HANDLE"
  , "message":"This function failed because an invalid monitor handle was passed to it."
  }
, "0xC01E058D":{
    "code":"STATUS_GRAPHICS_MONITOR_NO_LONGER_EXISTS"
  , "message":"The operating system asynchronously destroyed the monitor that corresponds to this handle because the operating system\'s state changed. This error typically occurs because the monitor PDO associated with this handle was removed or stopped, or a display mode change occurred. A display mode change occurs when Windows sends a WM_DISPLAYCHANGE message to applications."
  }
, "0xC01E05E0":{
    "code":"STATUS_GRAPHICS_ONLY_CONSOLE_SESSION_SUPPORTED"
  , "message":"This function can be used only if a program is running in the local console session. It cannot be used if a program is running on a remote desktop session or on a terminal server session."
  }
, "0xC01E05E1":{
    "code":"STATUS_GRAPHICS_NO_DISPLAY_DEVICE_CORRESPONDS_TO_NAME"
  , "message":"This function cannot find an actual GDI display device that corresponds to the specified GDI display device name."
  }
, "0xC01E05E2":{
    "code":"STATUS_GRAPHICS_DISPLAY_DEVICE_NOT_ATTACHED_TO_DESKTOP"
  , "message":"The function failed because the specified GDI display device was not attached to the Windows desktop."
  }
, "0xC01E05E3":{
    "code":"STATUS_GRAPHICS_MIRRORING_DEVICES_NOT_SUPPORTED"
  , "message":"This function does not support GDI mirroring display devices because GDI mirroring display devices do not have any physical monitors associated with them."
  }
, "0xC01E05E4":{
    "code":"STATUS_GRAPHICS_INVALID_POINTER"
  , "message":"The function failed because an invalid pointer parameter was passed to it. A pointer parameter is invalid if it is null, is not correctly aligned, or points to an invalid address or to a kernel mode address."
  }
, "0xC01E05E5":{
    "code":"STATUS_GRAPHICS_NO_MONITORS_CORRESPOND_TO_DISPLAY_DEVICE"
  , "message":"This function failed because the GDI device passed to it did not have a monitor associated with it."
  }
, "0xC01E05E6":{
    "code":"STATUS_GRAPHICS_PARAMETER_ARRAY_TOO_SMALL"
  , "message":"An array passed to the function cannot hold all of the data that the function must copy into the array."
  }
, "0xC01E05E7":{
    "code":"STATUS_GRAPHICS_INTERNAL_ERROR"
  , "message":"An internal error caused an operation to fail."
  }
, "0xC01E05E8":{
    "code":"STATUS_GRAPHICS_SESSION_TYPE_CHANGE_IN_PROGRESS"
  , "message":"The function failed because the current session is changing its type. This function cannot be called when the current session is changing its type. Three types of sessions currently exist: console, disconnected, and remote (RDP or ICA)."
  }
, "0xC0210000":{
    "code":"STATUS_FVE_LOCKED_VOLUME"
  , "message":"The volume must be unlocked before it can be used."
  }
, "0xC0210001":{
    "code":"STATUS_FVE_NOT_ENCRYPTED"
  , "message":"The volume is fully decrypted and no key is available."
  }
, "0xC0210002":{
    "code":"STATUS_FVE_BAD_INFORMATION"
  , "message":"The control block for the encrypted volume is not valid."
  }
, "0xC0210003":{
    "code":"STATUS_FVE_TOO_SMALL"
  , "message":"Not enough free space remains on the volume to allow encryption."
  }
, "0xC0210004":{
    "code":"STATUS_FVE_FAILED_WRONG_FS"
  , "message":"The partition cannot be encrypted because the file system is not supported."
  }
, "0xC0210005":{
    "code":"STATUS_FVE_FAILED_BAD_FS"
  , "message":"The file system is inconsistent. Run the Check Disk utility."
  }
, "0xC0210006":{
    "code":"STATUS_FVE_FS_NOT_EXTENDED"
  , "message":"The file system does not extend to the end of the volume."
  }
, "0xC0210007":{
    "code":"STATUS_FVE_FS_MOUNTED"
  , "message":"This operation cannot be performed while a file system is mounted on the volume."
  }
, "0xC0210008":{
    "code":"STATUS_FVE_NO_LICENSE"
  , "message":"BitLocker Drive Encryption is not included with this version of Windows."
  }
, "0xC0210009":{
    "code":"STATUS_FVE_ACTION_NOT_ALLOWED"
  , "message":"The requested action was denied by the FVE control engine."
  }
, "0xC021000A":{
    "code":"STATUS_FVE_BAD_DATA"
  , "message":"The data supplied is malformed."
  }
, "0xC021000B":{
    "code":"STATUS_FVE_VOLUME_NOT_BOUND"
  , "message":"The volume is not bound to the system."
  }
, "0xC021000C":{
    "code":"STATUS_FVE_NOT_DATA_VOLUME"
  , "message":"The volume specified is not a data volume."
  }
, "0xC021000D":{
    "code":"STATUS_FVE_CONV_READ_ERROR"
  , "message":"A read operation failed while converting the volume."
  }
, "0xC021000E":{
    "code":"STATUS_FVE_CONV_WRITE_ERROR"
  , "message":"A write operation failed while converting the volume."
  }
, "0xC021000F":{
    "code":"STATUS_FVE_OVERLAPPED_UPDATE"
  , "message":"The control block for the encrypted volume was updated by another thread. Try again."
  }
, "0xC0210010":{
    "code":"STATUS_FVE_FAILED_SECTOR_SIZE"
  , "message":"The volume encryption algorithm cannot be used on this sector size."
  }
, "0xC0210011":{
    "code":"STATUS_FVE_FAILED_AUTHENTICATION"
  , "message":"BitLocker recovery authentication failed."
  }
, "0xC0210012":{
    "code":"STATUS_FVE_NOT_OS_VOLUME"
  , "message":"The volume specified is not the boot operating system volume."
  }
, "0xC0210013":{
    "code":"STATUS_FVE_KEYFILE_NOT_FOUND"
  , "message":"The BitLocker startup key or recovery password could not be read from external media."
  }
, "0xC0210014":{
    "code":"STATUS_FVE_KEYFILE_INVALID"
  , "message":"The BitLocker startup key or recovery password file is corrupt or invalid."
  }
, "0xC0210015":{
    "code":"STATUS_FVE_KEYFILE_NO_VMK"
  , "message":"The BitLocker encryption key could not be obtained from the startup key or the recovery password."
  }
, "0xC0210016":{
    "code":"STATUS_FVE_TPM_DISABLED"
  , "message":"The TPM is disabled."
  }
, "0xC0210017":{
    "code":"STATUS_FVE_TPM_SRK_AUTH_NOT_ZERO"
  , "message":"The authorization data for the SRK of the TPM is not zero."
  }
, "0xC0210018":{
    "code":"STATUS_FVE_TPM_INVALID_PCR"
  , "message":"The system boot information changed or the TPM locked out access to BitLocker encryption keys until the computer is restarted."
  }
, "0xC0210019":{
    "code":"STATUS_FVE_TPM_NO_VMK"
  , "message":"The BitLocker encryption key could not be obtained from the TPM."
  }
, "0xC021001A":{
    "code":"STATUS_FVE_PIN_INVALID"
  , "message":"The BitLocker encryption key could not be obtained from the TPM and PIN."
  }
, "0xC021001B":{
    "code":"STATUS_FVE_AUTH_INVALID_APPLICATION"
  , "message":"A boot application hash does not match the hash computed when BitLocker was turned on."
  }
, "0xC021001C":{
    "code":"STATUS_FVE_AUTH_INVALID_CONFIG"
  , "message":"The Boot Configuration Data (BCD) settings are not supported or have changed because BitLocker was enabled."
  }
, "0xC021001D":{
    "code":"STATUS_FVE_DEBUGGER_ENABLED"
  , "message":"Boot debugging is enabled. Run Windows Boot Configuration Data Store Editor (bcdedit.exe) to turn it off."
  }
, "0xC021001E":{
    "code":"STATUS_FVE_DRY_RUN_FAILED"
  , "message":"The BitLocker encryption key could not be obtained."
  }
, "0xC021001F":{
    "code":"STATUS_FVE_BAD_METADATA_POINTER"
  , "message":"The metadata disk region pointer is incorrect."
  }
, "0xC0210020":{
    "code":"STATUS_FVE_OLD_METADATA_COPY"
  , "message":"The backup copy of the metadata is out of date."
  }
, "0xC0210021":{
    "code":"STATUS_FVE_REBOOT_REQUIRED"
  , "message":"No action was taken because a system restart is required."
  }
, "0xC0210022":{
    "code":"STATUS_FVE_RAW_ACCESS"
  , "message":"No action was taken because BitLocker Drive Encryption is in RAW access mode."
  }
, "0xC0210023":{
    "code":"STATUS_FVE_RAW_BLOCKED"
  , "message":"BitLocker Drive Encryption cannot enter RAW access mode for this volume."
  }
, "0xC0210026":{
    "code":"STATUS_FVE_NO_FEATURE_LICENSE"
  , "message":"This feature of BitLocker Drive Encryption is not included with this version of Windows."
  }
, "0xC0210027":{
    "code":"STATUS_FVE_POLICY_USER_DISABLE_RDV_NOT_ALLOWED"
  , "message":"Group policy does not permit turning off BitLocker Drive Encryption on roaming data volumes."
  }
, "0xC0210028":{
    "code":"STATUS_FVE_CONV_RECOVERY_FAILED"
  , "message":"Bitlocker Drive Encryption failed to recover from aborted conversion. This could be due to either all conversion logs being corrupted or the media being write-protected."
  }
, "0xC0210029":{
    "code":"STATUS_FVE_VIRTUALIZED_SPACE_TOO_BIG"
  , "message":"The requested virtualization size is too big."
  }
, "0xC0210030":{
    "code":"STATUS_FVE_VOLUME_TOO_SMALL"
  , "message":"The drive is too small to be protected using BitLocker Drive Encryption."
  }
, "0xC0220001":{
    "code":"STATUS_FWP_CALLOUT_NOT_FOUND"
  , "message":"The callout does not exist."
  }
, "0xC0220002":{
    "code":"STATUS_FWP_CONDITION_NOT_FOUND"
  , "message":"The filter condition does not exist."
  }
, "0xC0220003":{
    "code":"STATUS_FWP_FILTER_NOT_FOUND"
  , "message":"The filter does not exist."
  }
, "0xC0220004":{
    "code":"STATUS_FWP_LAYER_NOT_FOUND"
  , "message":"The layer does not exist."
  }
, "0xC0220005":{
    "code":"STATUS_FWP_PROVIDER_NOT_FOUND"
  , "message":"The provider does not exist."
  }
, "0xC0220006":{
    "code":"STATUS_FWP_PROVIDER_CONTEXT_NOT_FOUND"
  , "message":"The provider context does not exist."
  }
, "0xC0220007":{
    "code":"STATUS_FWP_SUBLAYER_NOT_FOUND"
  , "message":"The sublayer does not exist."
  }
, "0xC0220008":{
    "code":"STATUS_FWP_NOT_FOUND"
  , "message":"The object does not exist."
  }
, "0xC0220009":{
    "code":"STATUS_FWP_ALREADY_EXISTS"
  , "message":"An object with that GUID or LUID already exists."
  }
, "0xC022000A":{
    "code":"STATUS_FWP_IN_USE"
  , "message":"The object is referenced by other objects and cannot be deleted."
  }
, "0xC022000B":{
    "code":"STATUS_FWP_DYNAMIC_SESSION_IN_PROGRESS"
  , "message":"The call is not allowed from within a dynamic session."
  }
, "0xC022000C":{
    "code":"STATUS_FWP_WRONG_SESSION"
  , "message":"The call was made from the wrong session and cannot be completed."
  }
, "0xC022000D":{
    "code":"STATUS_FWP_NO_TXN_IN_PROGRESS"
  , "message":"The call must be made from within an explicit transaction."
  }
, "0xC022000E":{
    "code":"STATUS_FWP_TXN_IN_PROGRESS"
  , "message":"The call is not allowed from within an explicit transaction."
  }
, "0xC022000F":{
    "code":"STATUS_FWP_TXN_ABORTED"
  , "message":"The explicit transaction has been forcibly canceled."
  }
, "0xC0220010":{
    "code":"STATUS_FWP_SESSION_ABORTED"
  , "message":"The session has been canceled."
  }
, "0xC0220011":{
    "code":"STATUS_FWP_INCOMPATIBLE_TXN"
  , "message":"The call is not allowed from within a read-only transaction."
  }
, "0xC0220012":{
    "code":"STATUS_FWP_TIMEOUT"
  , "message":"The call timed out while waiting to acquire the transaction lock."
  }
, "0xC0220013":{
    "code":"STATUS_FWP_NET_EVENTS_DISABLED"
  , "message":"The collection of network diagnostic events is disabled."
  }
, "0xC0220014":{
    "code":"STATUS_FWP_INCOMPATIBLE_LAYER"
  , "message":"The operation is not supported by the specified layer."
  }
, "0xC0220015":{
    "code":"STATUS_FWP_KM_CLIENTS_ONLY"
  , "message":"The call is allowed for kernel-mode callers only."
  }
, "0xC0220016":{
    "code":"STATUS_FWP_LIFETIME_MISMATCH"
  , "message":"The call tried to associate two objects with incompatible lifetimes."
  }
, "0xC0220017":{
    "code":"STATUS_FWP_BUILTIN_OBJECT"
  , "message":"The object is built-in and cannot be deleted."
  }
, "0xC0220018":{
    "code":"STATUS_FWP_TOO_MANY_BOOTTIME_FILTERS"
  , "message":"The maximum number of boot-time filters has been reached."
  }
// , "0xC0220018":{
//     "code":"STATUS_FWP_TOO_MANY_CALLOUTS"
//   , "message":"The maximum number of callouts has been reached."
//   }
, "0xC0220019":{
    "code":"STATUS_FWP_NOTIFICATION_DROPPED"
  , "message":"A notification could not be delivered because a message queue has reached maximum capacity."
  }
, "0xC022001A":{
    "code":"STATUS_FWP_TRAFFIC_MISMATCH"
  , "message":"The traffic parameters do not match those for the security association context."
  }
, "0xC022001B":{
    "code":"STATUS_FWP_INCOMPATIBLE_SA_STATE"
  , "message":"The call is not allowed for the current security association state."
  }
, "0xC022001C":{
    "code":"STATUS_FWP_NULL_POINTER"
  , "message":"A required pointer is null."
  }
, "0xC022001D":{
    "code":"STATUS_FWP_INVALID_ENUMERATOR"
  , "message":"An enumerator is not valid."
  }
, "0xC022001E":{
    "code":"STATUS_FWP_INVALID_FLAGS"
  , "message":"The flags field contains an invalid value."
  }
, "0xC022001F":{
    "code":"STATUS_FWP_INVALID_NET_MASK"
  , "message":"A network mask is not valid."
  }
, "0xC0220020":{
    "code":"STATUS_FWP_INVALID_RANGE"
  , "message":"An FWP_RANGE is not valid."
  }
, "0xC0220021":{
    "code":"STATUS_FWP_INVALID_INTERVAL"
  , "message":"The time interval is not valid."
  }
, "0xC0220022":{
    "code":"STATUS_FWP_ZERO_LENGTH_ARRAY"
  , "message":"An array that must contain at least one element has a zero length."
  }
, "0xC0220023":{
    "code":"STATUS_FWP_NULL_DISPLAY_NAME"
  , "message":"The displayData.name field cannot be null."
  }
, "0xC0220024":{
    "code":"STATUS_FWP_INVALID_ACTION_TYPE"
  , "message":"The action type is not one of the allowed action types for a filter."
  }
, "0xC0220025":{
    "code":"STATUS_FWP_INVALID_WEIGHT"
  , "message":"The filter weight is not valid."
  }
, "0xC0220026":{
    "code":"STATUS_FWP_MATCH_TYPE_MISMATCH"
  , "message":"A filter condition contains a match type that is not compatible with the operands."
  }
, "0xC0220027":{
    "code":"STATUS_FWP_TYPE_MISMATCH"
  , "message":"An FWP_VALUE or FWPM_CONDITION_VALUE is of the wrong type."
  }
, "0xC0220028":{
    "code":"STATUS_FWP_OUT_OF_BOUNDS"
  , "message":"An integer value is outside the allowed range."
  }
, "0xC0220029":{
    "code":"STATUS_FWP_RESERVED"
  , "message":"A reserved field is nonzero."
  }
, "0xC022002A":{
    "code":"STATUS_FWP_DUPLICATE_CONDITION"
  , "message":"A filter cannot contain multiple conditions operating on a single field."
  }
, "0xC022002B":{
    "code":"STATUS_FWP_DUPLICATE_KEYMOD"
  , "message":"A policy cannot contain the same keying module more than once."
  }
, "0xC022002C":{
    "code":"STATUS_FWP_ACTION_INCOMPATIBLE_WITH_LAYER"
  , "message":"The action type is not compatible with the layer."
  }
, "0xC022002D":{
    "code":"STATUS_FWP_ACTION_INCOMPATIBLE_WITH_SUBLAYER"
  , "message":"The action type is not compatible with the sublayer."
  }
, "0xC022002E":{
    "code":"STATUS_FWP_CONTEXT_INCOMPATIBLE_WITH_LAYER"
  , "message":"The raw context or the provider context is not compatible with the layer."
  }
, "0xC022002F":{
    "code":"STATUS_FWP_CONTEXT_INCOMPATIBLE_WITH_CALLOUT"
  , "message":"The raw context or the provider context is not compatible with the callout."
  }
, "0xC0220030":{
    "code":"STATUS_FWP_INCOMPATIBLE_AUTH_METHOD"
  , "message":"The authentication method is not compatible with the policy type."
  }
, "0xC0220031":{
    "code":"STATUS_FWP_INCOMPATIBLE_DH_GROUP"
  , "message":"The Diffie-Hellman group is not compatible with the policy type."
  }
, "0xC0220032":{
    "code":"STATUS_FWP_EM_NOT_SUPPORTED"
  , "message":"An IKE policy cannot contain an Extended Mode policy."
  }
, "0xC0220033":{
    "code":"STATUS_FWP_NEVER_MATCH"
  , "message":"The enumeration template or subscription will never match any objects."
  }
, "0xC0220034":{
    "code":"STATUS_FWP_PROVIDER_CONTEXT_MISMATCH"
  , "message":"The provider context is of the wrong type."
  }
, "0xC0220035":{
    "code":"STATUS_FWP_INVALID_PARAMETER"
  , "message":"The parameter is incorrect."
  }
, "0xC0220036":{
    "code":"STATUS_FWP_TOO_MANY_SUBLAYERS"
  , "message":"The maximum number of sublayers has been reached."
  }
, "0xC0220037":{
    "code":"STATUS_FWP_CALLOUT_NOTIFICATION_FAILED"
  , "message":"The notification function for a callout returned an error."
  }
, "0xC0220038":{
    "code":"STATUS_FWP_INCOMPATIBLE_AUTH_CONFIG"
  , "message":"The IPsec authentication configuration is not compatible with the authentication type."
  }
, "0xC0220039":{
    "code":"STATUS_FWP_INCOMPATIBLE_CIPHER_CONFIG"
  , "message":"The IPsec cipher configuration is not compatible with the cipher type."
  }
, "0xC022003C":{
    "code":"STATUS_FWP_DUPLICATE_AUTH_METHOD"
  , "message":"A policy cannot contain the same auth method more than once."
  }
, "0xC0220100":{
    "code":"STATUS_FWP_TCPIP_NOT_READY"
  , "message":"The TCP/IP stack is not ready."
  }
, "0xC0220101":{
    "code":"STATUS_FWP_INJECT_HANDLE_CLOSING"
  , "message":"The injection handle is being closed by another thread."
  }
, "0xC0220102":{
    "code":"STATUS_FWP_INJECT_HANDLE_STALE"
  , "message":"The injection handle is stale."
  }
, "0xC0220103":{
    "code":"STATUS_FWP_CANNOT_PEND"
  , "message":"The classify cannot be pended."
  }
, "0xC0230002":{
    "code":"STATUS_NDIS_CLOSING"
  , "message":"The binding to the network interface is being closed."
  }
, "0xC0230004":{
    "code":"STATUS_NDIS_BAD_VERSION"
  , "message":"An invalid version was specified."
  }
, "0xC0230005":{
    "code":"STATUS_NDIS_BAD_CHARACTERISTICS"
  , "message":"An invalid characteristics table was used."
  }
, "0xC0230006":{
    "code":"STATUS_NDIS_ADAPTER_NOT_FOUND"
  , "message":"Failed to find the network interface or the network interface is not ready."
  }
, "0xC0230007":{
    "code":"STATUS_NDIS_OPEN_FAILED"
  , "message":"Failed to open the network interface."
  }
, "0xC0230008":{
    "code":"STATUS_NDIS_DEVICE_FAILED"
  , "message":"The network interface has encountered an internal unrecoverable failure."
  }
, "0xC0230009":{
    "code":"STATUS_NDIS_MULTICAST_FULL"
  , "message":"The multicast list on the network interface is full."
  }
, "0xC023000A":{
    "code":"STATUS_NDIS_MULTICAST_EXISTS"
  , "message":"An attempt was made to add a duplicate multicast address to the list."
  }
, "0xC023000B":{
    "code":"STATUS_NDIS_MULTICAST_NOT_FOUND"
  , "message":"At attempt was made to remove a multicast address that was never added."
  }
, "0xC023000C":{
    "code":"STATUS_NDIS_REQUEST_ABORTED"
  , "message":"The network interface aborted the request."
  }
, "0xC023000D":{
    "code":"STATUS_NDIS_RESET_IN_PROGRESS"
  , "message":"The network interface cannot process the request because it is being reset."
  }
, "0xC023000F":{
    "code":"STATUS_NDIS_INVALID_PACKET"
  , "message":"An attempt was made to send an invalid packet on a network interface."
  }
, "0xC0230010":{
    "code":"STATUS_NDIS_INVALID_DEVICE_REQUEST"
  , "message":"The specified request is not a valid operation for the target device."
  }
, "0xC0230011":{
    "code":"STATUS_NDIS_ADAPTER_NOT_READY"
  , "message":"The network interface is not ready to complete this operation."
  }
, "0xC0230014":{
    "code":"STATUS_NDIS_INVALID_LENGTH"
  , "message":"The length of the buffer submitted for this operation is not valid."
  }
, "0xC0230015":{
    "code":"STATUS_NDIS_INVALID_DATA"
  , "message":"The data used for this operation is not valid."
  }
, "0xC0230016":{
    "code":"STATUS_NDIS_BUFFER_TOO_SHORT"
  , "message":"The length of the submitted buffer for this operation is too small."
  }
, "0xC0230017":{
    "code":"STATUS_NDIS_INVALID_OID"
  , "message":"The network interface does not support this object identifier."
  }
, "0xC0230018":{
    "code":"STATUS_NDIS_ADAPTER_REMOVED"
  , "message":"The network interface has been removed."
  }
, "0xC0230019":{
    "code":"STATUS_NDIS_UNSUPPORTED_MEDIA"
  , "message":"The network interface does not support this media type."
  }
, "0xC023001A":{
    "code":"STATUS_NDIS_GROUP_ADDRESS_IN_USE"
  , "message":"An attempt was made to remove a token ring group address that is in use by other components."
  }
, "0xC023001B":{
    "code":"STATUS_NDIS_FILE_NOT_FOUND"
  , "message":"An attempt was made to map a file that cannot be found."
  }
, "0xC023001C":{
    "code":"STATUS_NDIS_ERROR_READING_FILE"
  , "message":"An error occurred while NDIS tried to map the file."
  }
, "0xC023001D":{
    "code":"STATUS_NDIS_ALREADY_MAPPED"
  , "message":"An attempt was made to map a file that is already mapped."
  }
, "0xC023001E":{
    "code":"STATUS_NDIS_RESOURCE_CONFLICT"
  , "message":"An attempt to allocate a hardware resource failed because the resource is used by another component."
  }
, "0xC023001F":{
    "code":"STATUS_NDIS_MEDIA_DISCONNECTED"
  , "message":"The I/O operation failed because the network media is disconnected or the wireless access point is out of range."
  }
, "0xC0230022":{
    "code":"STATUS_NDIS_INVALID_ADDRESS"
  , "message":"The network address used in the request is invalid."
  }
, "0xC023002A":{
    "code":"STATUS_NDIS_PAUSED"
  , "message":"The offload operation on the network interface has been paused."
  }
, "0xC023002B":{
    "code":"STATUS_NDIS_INTERFACE_NOT_FOUND"
  , "message":"The network interface was not found."
  }
, "0xC023002C":{
    "code":"STATUS_NDIS_UNSUPPORTED_REVISION"
  , "message":"The revision number specified in the structure is not supported."
  }
, "0xC023002D":{
    "code":"STATUS_NDIS_INVALID_PORT"
  , "message":"The specified port does not exist on this network interface."
  }
, "0xC023002E":{
    "code":"STATUS_NDIS_INVALID_PORT_STATE"
  , "message":"The current state of the specified port on this network interface does not support the requested operation."
  }
, "0xC023002F":{
    "code":"STATUS_NDIS_LOW_POWER_STATE"
  , "message":"The miniport adapter is in a lower power state."
  }
, "0xC02300BB":{
    "code":"STATUS_NDIS_NOT_SUPPORTED"
  , "message":"The network interface does not support this request."
  }
, "0xC023100F":{
    "code":"STATUS_NDIS_OFFLOAD_POLICY"
  , "message":"The TCP connection is not offloadable because of a local policy setting."
  }
, "0xC0231012":{
    "code":"STATUS_NDIS_OFFLOAD_CONNECTION_REJECTED"
  , "message":"The TCP connection is not offloadable by the Chimney offload target."
  }
, "0xC0231013":{
    "code":"STATUS_NDIS_OFFLOAD_PATH_REJECTED"
  , "message":"The IP Path object is not in an offloadable state."
  }
, "0xC0232000":{
    "code":"STATUS_NDIS_DOT11_AUTO_CONFIG_ENABLED"
  , "message":"The wireless LAN interface is in auto-configuration mode and does not support the requested parameter change operation."
  }
, "0xC0232001":{
    "code":"STATUS_NDIS_DOT11_MEDIA_IN_USE"
  , "message":"The wireless LAN interface is busy and cannot perform the requested operation."
  }
, "0xC0232002":{
    "code":"STATUS_NDIS_DOT11_POWER_STATE_INVALID"
  , "message":"The wireless LAN interface is power down and does not support the requested operation."
  }
, "0xC0232003":{
    "code":"STATUS_NDIS_PM_WOL_PATTERN_LIST_FULL"
  , "message":"The list of wake on LAN patterns is full."
  }
, "0xC0232004":{
    "code":"STATUS_NDIS_PM_PROTOCOL_OFFLOAD_LIST_FULL"
  , "message":"The list of low power protocol offloads is full."
  }
, "0xC0360001":{
    "code":"STATUS_IPSEC_BAD_SPI"
  , "message":"The SPI in the packet does not match a valid IPsec SA."
  }
, "0xC0360002":{
    "code":"STATUS_IPSEC_SA_LIFETIME_EXPIRED"
  , "message":"The packet was received on an IPsec SA whose lifetime has expired."
  }
, "0xC0360003":{
    "code":"STATUS_IPSEC_WRONG_SA"
  , "message":"The packet was received on an IPsec SA that does not match the packet characteristics."
  }
, "0xC0360004":{
    "code":"STATUS_IPSEC_REPLAY_CHECK_FAILED"
  , "message":"The packet sequence number replay check failed."
  }
, "0xC0360005":{
    "code":"STATUS_IPSEC_INVALID_PACKET"
  , "message":"The IPsec header and/or trailer in the packet is invalid."
  }
, "0xC0360006":{
    "code":"STATUS_IPSEC_INTEGRITY_CHECK_FAILED"
  , "message":"The IPsec integrity check failed."
  }
, "0xC0360007":{
    "code":"STATUS_IPSEC_CLEAR_TEXT_DROP"
  , "message":"IPsec dropped a clear text packet."
  }
, "0xC0360008":{
    "code":"STATUS_IPSEC_AUTH_FIREWALL_DROP"
  , "message":"IPsec dropped an incoming ESP packet in authenticated firewall mode. This drop is benign."
  }
, "0xC0360009":{
    "code":"STATUS_IPSEC_THROTTLE_DROP"
  , "message":"IPsec dropped a packet due to DOS throttle."
  }
, "0xC0368000":{
    "code":"STATUS_IPSEC_DOSP_BLOCK"
  , "message":"IPsec Dos Protection matched an explicit block rule."
  }
, "0xC0368001":{
    "code":"STATUS_IPSEC_DOSP_RECEIVED_MULTICAST"
  , "message":"IPsec Dos Protection received an IPsec specific multicast packet which is not allowed."
  }
, "0xC0368002":{
    "code":"STATUS_IPSEC_DOSP_INVALID_PACKET"
  , "message":"IPsec Dos Protection received an incorrectly formatted packet."
  }
, "0xC0368003":{
    "code":"STATUS_IPSEC_DOSP_STATE_LOOKUP_FAILED"
  , "message":"IPsec Dos Protection failed to lookup state."
  }
, "0xC0368004":{
    "code":"STATUS_IPSEC_DOSP_MAX_ENTRIES"
  , "message":"IPsec Dos Protection failed to create state because there are already maximum number of entries allowed by policy."
  }
, "0xC0368005":{
    "code":"STATUS_IPSEC_DOSP_KEYMOD_NOT_ALLOWED"
  , "message":"IPsec Dos Protection received an IPsec negotiation packet for a keying module which is not allowed by policy."
  }
, "0xC0368006":{
    "code":"STATUS_IPSEC_DOSP_MAX_PER_IP_RATELIMIT_QUEUES"
  , "message":"IPsec Dos Protection failed to create per internal IP ratelimit queue because there is already maximum number of queues allowed by policy."
  }
, "0xC038005B":{
    "code":"STATUS_VOLMGR_MIRROR_NOT_SUPPORTED"
  , "message":"The system does not support mirrored volumes."
  }
, "0xC038005C":{
    "code":"STATUS_VOLMGR_RAID5_NOT_SUPPORTED"
  , "message":"The system does not support RAID-5 volumes."
  }
, "0xC03A0014":{
    "code":"STATUS_VIRTDISK_PROVIDER_NOT_FOUND"
  , "message":"A virtual disk support provider for the specified file was not found."
  }
, "0xC03A0015":{
    "code":"STATUS_VIRTDISK_NOT_VIRTUAL_DISK"
  , "message":"The specified disk is not a virtual disk."
  }
, "0xC03A0016":{
    "code":"STATUS_VHD_PARENT_VHD_ACCESS_DENIED"
  , "message":"The chain of virtual hard disks is inaccessible. The process has not been granted access rights to the parent virtual hard disk for the differencing disk."
  }
, "0xC03A0017":{
    "code":"STATUS_VHD_CHILD_PARENT_SIZE_MISMATCH"
  , "message":"The chain of virtual hard disks is corrupted. There is a mismatch in the virtual sizes of the parent virtual hard disk and differencing disk."
  }
, "0xC03A0018":{
    "code":"STATUS_VHD_DIFFERENCING_CHAIN_CYCLE_DETECTED"
  , "message":"The chain of virtual hard disks is corrupted. A differencing disk is indicated in its own parent chain."
  }
, "0xC03A0019":{
    "code":"STATUS_VHD_DIFFERENCING_CHAIN_ERROR_IN_PARENT"
  , "message":"The chain of virtual hard disks is inaccessible. There was an error opening a virtual hard disk further up the chain."
  }
};


var win32ErrorCodes = {
  "0x00000000":{
    "code":"ERROR_SUCCESS"
  , "message":"The operation completed successfully."
  }
, "0x00000001":{
    "code":"ERROR_INVALID_FUNCTION"
  , "message":"Incorrect function."
  }
, "0x00000002":{
    "code":"ERROR_FILE_NOT_FOUND"
  , "message":"The system cannot find the file specified."
  }
, "0x00000003":{
    "code":"ERROR_PATH_NOT_FOUND"
  , "message":"The system cannot find the path specified."
  }
, "0x00000004":{
    "code":"ERROR_TOO_MANY_OPEN_FILES"
  , "message":"The system cannot open the file."
  }
, "0x00000005":{
    "code":"ERROR_ACCESS_DENIED"
  , "message":"Access is denied."
  }
, "0x00000006":{
    "code":"ERROR_INVALID_HANDLE"
  , "message":"The handle is invalid."
  }
, "0x00000007":{
    "code":"ERROR_ARENA_TRASHED"
  , "message":"The storage control blocks were destroyed."
  }
, "0x00000008":{
    "code":"ERROR_NOT_ENOUGH_MEMORY"
  , "message":"Not enough storage is available to process this command."
  }
, "0x00000009":{
    "code":"ERROR_INVALID_BLOCK"
  , "message":"The storage control block address is invalid."
  }
, "0x0000000A":{
    "code":"ERROR_BAD_ENVIRONMENT"
  , "message":"The environment is incorrect."
  }
, "0x0000000B":{
    "code":"ERROR_BAD_FORMAT"
  , "message":"An attempt was made to load a program with an incorrect format."
  }
, "0x0000000C":{
    "code":"ERROR_INVALID_ACCESS"
  , "message":"The access code is invalid."
  }
, "0x0000000D":{
    "code":"ERROR_INVALID_DATA"
  , "message":"The data is invalid."
  }
, "0x0000000E":{
    "code":"ERROR_OUTOFMEMORY"
  , "message":"Not enough storage is available to complete this operation."
  }
, "0x0000000F":{
    "code":"ERROR_INVALID_DRIVE"
  , "message":"The system cannot find the drive specified."
  }
, "0x00000010":{
    "code":"ERROR_CURRENT_DIRECTORY"
  , "message":"The directory cannot be removed."
  }
, "0x00000011":{
    "code":"ERROR_NOT_SAME_DEVICE"
  , "message":"The system cannot move the file to a different disk drive."
  }
, "0x00000012":{
    "code":"ERROR_NO_MORE_FILES"
  , "message":"There are no more files."
  }
, "0x00000013":{
    "code":"ERROR_WRITE_PROTECT"
  , "message":"The media is write-protected."
  }
, "0x00000014":{
    "code":"ERROR_BAD_UNIT"
  , "message":"The system cannot find the device specified."
  }
, "0x00000015":{
    "code":"ERROR_NOT_READY"
  , "message":"The device is not ready."
  }
, "0x00000016":{
    "code":"ERROR_BAD_COMMAND"
  , "message":"The device does not recognize the command."
  }
, "0x00000017":{
    "code":"ERROR_CRC"
  , "message":"Data error (cyclic redundancy check)."
  }
, "0x00000018":{
    "code":"ERROR_BAD_LENGTH"
  , "message":"The program issued a command but the command length is incorrect."
  }
, "0x00000019":{
    "code":"ERROR_SEEK"
  , "message":"The drive cannot locate a specific area or track on the disk."
  }
, "0x0000001A":{
    "code":"ERROR_NOT_DOS_DISK"
  , "message":"The specified disk cannot be accessed."
  }
, "0x0000001B":{
    "code":"ERROR_SECTOR_NOT_FOUND"
  , "message":"The drive cannot find the sector requested."
  }
, "0x0000001C":{
    "code":"ERROR_OUT_OF_PAPER"
  , "message":"The printer is out of paper."
  }
, "0x0000001D":{
    "code":"ERROR_WRITE_FAULT"
  , "message":"The system cannot write to the specified device."
  }
, "0x0000001E":{
    "code":"ERROR_READ_FAULT"
  , "message":"The system cannot read from the specified device."
  }
, "0x0000001F":{
    "code":"ERROR_GEN_FAILURE"
  , "message":"A device attached to the system is not functioning."
  }
, "0x00000020":{
    "code":"ERROR_SHARING_VIOLATION"
  , "message":"The process cannot access the file because it is being used by another process."
  }
, "0x00000021":{
    "code":"ERROR_LOCK_VIOLATION"
  , "message":"The process cannot access the file because another process has locked a portion of the file."
  }
, "0x00000022":{
    "code":"ERROR_WRONG_DISK"
  , "message":"The wrong disk is in the drive. Insert %2 (Volume Serial Number: %3) into drive %1."
  }
, "0x00000024":{
    "code":"ERROR_SHARING_BUFFER_EXCEEDED"
  , "message":"Too many files opened for sharing."
  }
, "0x00000026":{
    "code":"ERROR_HANDLE_EOF"
  , "message":"Reached the end of the file."
  }
, "0x00000027":{
    "code":"ERROR_HANDLE_DISK_FULL"
  , "message":"The disk is full."
  }
, "0x00000032":{
    "code":"ERROR_NOT_SUPPORTED"
  , "message":"The request is not supported."
  }
, "0x00000033":{
    "code":"ERROR_REM_NOT_LIST"
  , "message":"Windows cannot find the network path. Verify that the network path is correct and the destination computer is not busy or turned off. If Windows still cannot find the network path, contact your network administrator."
  }
, "0x00000034":{
    "code":"ERROR_DUP_NAME"
  , "message":"You were not connected because a duplicate name exists on the network. Go to System in Control Panel to change the computer name, and then try again."
  }
, "0x00000035":{
    "code":"ERROR_BAD_NETPATH"
  , "message":"The network path was not found."
  }
, "0x00000036":{
    "code":"ERROR_NETWORK_BUSY"
  , "message":"The network is busy."
  }
, "0x00000037":{
    "code":"ERROR_DEV_NOT_EXIST"
  , "message":"The specified network resource or device is no longer available."
  }
, "0x00000038":{
    "code":"ERROR_TOO_MANY_CMDS"
  , "message":"The network BIOS command limit has been reached."
  }
, "0x00000039":{
    "code":"ERROR_ADAP_HDW_ERR"
  , "message":"A network adapter hardware error occurred."
  }
, "0x0000003A":{
    "code":"ERROR_BAD_NET_RESP"
  , "message":"The specified server cannot perform the requested operation."
  }
, "0x0000003B":{
    "code":"ERROR_UNEXP_NET_ERR"
  , "message":"An unexpected network error occurred."
  }
, "0x0000003C":{
    "code":"ERROR_BAD_REM_ADAP"
  , "message":"The remote adapter is not compatible."
  }
, "0x0000003D":{
    "code":"ERROR_PRINTQ_FULL"
  , "message":"The print queue is full."
  }
, "0x0000003E":{
    "code":"ERROR_NO_SPOOL_SPACE"
  , "message":"Space to store the file waiting to be printed is not available on the server."
  }
, "0x0000003F":{
    "code":"ERROR_PRINT_CANCELLED"
  , "message":"Your file waiting to be printed was deleted."
  }
, "0x00000040":{
    "code":"ERROR_NETNAME_DELETED"
  , "message":"The specified network name is no longer available."
  }
, "0x00000041":{
    "code":"ERROR_NETWORK_ACCESS_DENIED"
  , "message":"Network access is denied."
  }
, "0x00000042":{
    "code":"ERROR_BAD_DEV_TYPE"
  , "message":"The network resource type is not correct."
  }
, "0x00000043":{
    "code":"ERROR_BAD_NET_NAME"
  , "message":"The network name cannot be found."
  }
, "0x00000044":{
    "code":"ERROR_TOO_MANY_NAMES"
  , "message":"The name limit for the local computer network adapter card was exceeded."
  }
, "0x00000045":{
    "code":"ERROR_TOO_MANY_SESS"
  , "message":"The network BIOS session limit was exceeded."
  }
, "0x00000046":{
    "code":"ERROR_SHARING_PAUSED"
  , "message":"The remote server has been paused or is in the process of being started."
  }
, "0x00000047":{
    "code":"ERROR_REQ_NOT_ACCEP"
  , "message":"No more connections can be made to this remote computer at this time because the computer has accepted the maximum number of connections."
  }
, "0x00000048":{
    "code":"ERROR_REDIR_PAUSED"
  , "message":"The specified printer or disk device has been paused."
  }
, "0x00000050":{
    "code":"ERROR_FILE_EXISTS"
  , "message":"The file exists."
  }
, "0x00000052":{
    "code":"ERROR_CANNOT_MAKE"
  , "message":"The directory or file cannot be created."
  }
, "0x00000053":{
    "code":"ERROR_FAIL_I24"
  , "message":"Fail on INT 24."
  }
, "0x00000054":{
    "code":"ERROR_OUT_OF_STRUCTURES"
  , "message":"Storage to process this request is not available."
  }
, "0x00000055":{
    "code":"ERROR_ALREADY_ASSIGNED"
  , "message":"The local device name is already in use."
  }
, "0x00000056":{
    "code":"ERROR_INVALID_PASSWORD"
  , "message":"The specified network password is not correct."
  }
, "0x00000057":{
    "code":"ERROR_INVALID_PARAMETER"
  , "message":"The parameter is incorrect."
  }
, "0x00000058":{
    "code":"ERROR_NET_WRITE_FAULT"
  , "message":"A write fault occurred on the network."
  }
, "0x00000059":{
    "code":"ERROR_NO_PROC_SLOTS"
  , "message":"The system cannot start another process at this time."
  }
, "0x00000064":{
    "code":"ERROR_TOO_MANY_SEMAPHORES"
  , "message":"Cannot create another system semaphore."
  }
, "0x00000065":{
    "code":"ERROR_EXCL_SEM_ALREADY_OWNED"
  , "message":"The exclusive semaphore is owned by another process."
  }
, "0x00000066":{
    "code":"ERROR_SEM_IS_SET"
  , "message":"The semaphore is set and cannot be closed."
  }
, "0x00000067":{
    "code":"ERROR_TOO_MANY_SEM_REQUESTS"
  , "message":"The semaphore cannot be set again."
  }
, "0x00000068":{
    "code":"ERROR_INVALID_AT_INTERRUPT_TIME"
  , "message":"Cannot request exclusive semaphores at interrupt time."
  }
, "0x00000069":{
    "code":"ERROR_SEM_OWNER_DIED"
  , "message":"The previous ownership of this semaphore has ended."
  }
, "0x0000006A":{
    "code":"ERROR_SEM_USER_LIMIT"
  , "message":"Insert the disk for drive %1."
  }
, "0x0000006B":{
    "code":"ERROR_DISK_CHANGE"
  , "message":"The program stopped because an alternate disk was not inserted."
  }
, "0x0000006C":{
    "code":"ERROR_DRIVE_LOCKED"
  , "message":"The disk is in use or locked by another process."
  }
, "0x0000006D":{
    "code":"ERROR_BROKEN_PIPE"
  , "message":"The pipe has been ended."
  }
, "0x0000006E":{
    "code":"ERROR_OPEN_FAILED"
  , "message":"The system cannot open the device or file specified."
  }
, "0x0000006F":{
    "code":"ERROR_BUFFER_OVERFLOW"
  , "message":"The file name is too long."
  }
, "0x00000070":{
    "code":"ERROR_DISK_FULL"
  , "message":"There is not enough space on the disk."
  }
, "0x00000071":{
    "code":"ERROR_NO_MORE_SEARCH_HANDLES"
  , "message":"No more internal file identifiers are available."
  }
, "0x00000072":{
    "code":"ERROR_INVALID_TARGET_HANDLE"
  , "message":"The target internal file identifier is incorrect."
  }
, "0x00000075":{
    "code":"ERROR_INVALID_CATEGORY"
  , "message":"The Input Output Control (IOCTL) call made by the application program is not correct."
  }
, "0x00000076":{
    "code":"ERROR_INVALID_VERIFY_SWITCH"
  , "message":"The verify-on-write switch parameter value is not correct."
  }
, "0x00000077":{
    "code":"ERROR_BAD_DRIVER_LEVEL"
  , "message":"The system does not support the command requested."
  }
, "0x00000078":{
    "code":"ERROR_CALL_NOT_IMPLEMENTED"
  , "message":"This function is not supported on this system."
  }
, "0x00000079":{
    "code":"ERROR_SEM_TIMEOUT"
  , "message":"The semaphore time-out period has expired."
  }
, "0x0000007A":{
    "code":"ERROR_INSUFFICIENT_BUFFER"
  , "message":"The data area passed to a system call is too small."
  }
, "0x0000007B":{
    "code":"ERROR_INVALID_NAME"
  , "message":"The file name, directory name, or volume label syntax is incorrect."
  }
, "0x0000007C":{
    "code":"ERROR_INVALID_LEVEL"
  , "message":"The system call level is not correct."
  }
, "0x0000007D":{
    "code":"ERROR_NO_VOLUME_LABEL"
  , "message":"The disk has no volume label."
  }
, "0x0000007E":{
    "code":"ERROR_MOD_NOT_FOUND"
  , "message":"The specified module could not be found."
  }
, "0x0000007F":{
    "code":"ERROR_PROC_NOT_FOUND"
  , "message":"The specified procedure could not be found."
  }
, "0x00000080":{
    "code":"ERROR_WAIT_NO_CHILDREN"
  , "message":"There are no child processes to wait for."
  }
, "0x00000081":{
    "code":"ERROR_CHILD_NOT_COMPLETE"
  , "message":"The %1 application cannot be run in Win32 mode."
  }
, "0x00000082":{
    "code":"ERROR_DIRECT_ACCESS_HANDLE"
  , "message":"Attempt to use a file handle to an open disk partition for an operation other than raw disk I/O."
  }
, "0x00000083":{
    "code":"ERROR_NEGATIVE_SEEK"
  , "message":"An attempt was made to move the file pointer before the beginning of the file."
  }
, "0x00000084":{
    "code":"ERROR_SEEK_ON_DEVICE"
  , "message":"The file pointer cannot be set on the specified device or file."
  }
, "0x00000085":{
    "code":"ERROR_IS_JOIN_TARGET"
  , "message":"A JOIN or SUBST command cannot be used for a drive that contains previously joined drives."
  }
, "0x00000086":{
    "code":"ERROR_IS_JOINED"
  , "message":"An attempt was made to use a JOIN or SUBST command on a drive that has already been joined."
  }
, "0x00000087":{
    "code":"ERROR_IS_SUBSTED"
  , "message":"An attempt was made to use a JOIN or SUBST command on a drive that has already been substituted."
  }
, "0x00000088":{
    "code":"ERROR_NOT_JOINED"
  , "message":"The system tried to delete the JOIN of a drive that is not joined."
  }
, "0x00000089":{
    "code":"ERROR_NOT_SUBSTED"
  , "message":"The system tried to delete the substitution of a drive that is not substituted."
  }
, "0x0000008A":{
    "code":"ERROR_JOIN_TO_JOIN"
  , "message":"The system tried to join a drive to a directory on a joined drive."
  }
, "0x0000008B":{
    "code":"ERROR_SUBST_TO_SUBST"
  , "message":"The system tried to substitute a drive to a directory on a substituted drive."
  }
, "0x0000008C":{
    "code":"ERROR_JOIN_TO_SUBST"
  , "message":"The system tried to join a drive to a directory on a substituted drive."
  }
, "0x0000008D":{
    "code":"ERROR_SUBST_TO_JOIN"
  , "message":"The system tried to SUBST a drive to a directory on a joined drive."
  }
, "0x0000008E":{
    "code":"ERROR_BUSY_DRIVE"
  , "message":"The system cannot perform a JOIN or SUBST at this time."
  }
, "0x0000008F":{
    "code":"ERROR_SAME_DRIVE"
  , "message":"The system cannot join or substitute a drive to or for a directory on the same drive."
  }
, "0x00000090":{
    "code":"ERROR_DIR_NOT_ROOT"
  , "message":"The directory is not a subdirectory of the root directory."
  }
, "0x00000091":{
    "code":"ERROR_DIR_NOT_EMPTY"
  , "message":"The directory is not empty."
  }
, "0x00000092":{
    "code":"ERROR_IS_SUBST_PATH"
  , "message":"The path specified is being used in a substitute."
  }
, "0x00000093":{
    "code":"ERROR_IS_JOIN_PATH"
  , "message":"Not enough resources are available to process this command."
  }
, "0x00000094":{
    "code":"ERROR_PATH_BUSY"
  , "message":"The path specified cannot be used at this time."
  }
, "0x00000095":{
    "code":"ERROR_IS_SUBST_TARGET"
  , "message":"An attempt was made to join or substitute a drive for which a directory on the drive is the target of a previous substitute."
  }
, "0x00000096":{
    "code":"ERROR_SYSTEM_TRACE"
  , "message":"System trace information was not specified in your CONFIG.SYS file, or tracing is disallowed."
  }
, "0x00000097":{
    "code":"ERROR_INVALID_EVENT_COUNT"
  , "message":"The number of specified semaphore events for DosMuxSemWait is not correct."
  }
, "0x00000098":{
    "code":"ERROR_TOO_MANY_MUXWAITERS"
  , "message":"DosMuxSemWait did not execute; too many semaphores are already set."
  }
, "0x00000099":{
    "code":"ERROR_INVALID_LIST_FORMAT"
  , "message":"The DosMuxSemWait list is not correct."
  }
, "0x0000009A":{
    "code":"ERROR_LABEL_TOO_LONG"
  , "message":"The volume label you entered exceeds the label character limit of the destination file system."
  }
, "0x0000009B":{
    "code":"ERROR_TOO_MANY_TCBS"
  , "message":"Cannot create another thread."
  }
, "0x0000009C":{
    "code":"ERROR_SIGNAL_REFUSED"
  , "message":"The recipient process has refused the signal."
  }
, "0x0000009D":{
    "code":"ERROR_DISCARDED"
  , "message":"The segment is already discarded and cannot be locked."
  }
, "0x0000009E":{
    "code":"ERROR_NOT_LOCKED"
  , "message":"The segment is already unlocked."
  }
, "0x0000009F":{
    "code":"ERROR_BAD_THREADID_ADDR"
  , "message":"The address for the thread ID is not correct."
  }
, "0x000000A0":{
    "code":"ERROR_BAD_ARGUMENTS"
  , "message":"One or more arguments are not correct."
  }
, "0x000000A1":{
    "code":"ERROR_BAD_PATHNAME"
  , "message":"The specified path is invalid."
  }
, "0x000000A2":{
    "code":"ERROR_SIGNAL_PENDING"
  , "message":"A signal is already pending."
  }
, "0x000000A4":{
    "code":"ERROR_MAX_THRDS_REACHED"
  , "message":"No more threads can be created in the system."
  }
, "0x000000A7":{
    "code":"ERROR_LOCK_FAILED"
  , "message":"Unable to lock a region of a file."
  }
, "0x000000AA":{
    "code":"ERROR_BUSY"
  , "message":"The requested resource is in use."
  }
, "0x000000AD":{
    "code":"ERROR_CANCEL_VIOLATION"
  , "message":"A lock request was not outstanding for the supplied cancel region."
  }
, "0x000000AE":{
    "code":"ERROR_ATOMIC_LOCKS_NOT_SUPPORTED"
  , "message":"The file system does not support atomic changes to the lock type."
  }
, "0x000000B4":{
    "code":"ERROR_INVALID_SEGMENT_NUMBER"
  , "message":"The system detected a segment number that was not correct."
  }
, "0x000000B6":{
    "code":"ERROR_INVALID_ORDINAL"
  , "message":"The operating system cannot run %1."
  }
, "0x000000B7":{
    "code":"ERROR_ALREADY_EXISTS"
  , "message":"Cannot create a file when that file already exists."
  }
, "0x000000BA":{
    "code":"ERROR_INVALID_FLAG_NUMBER"
  , "message":"The flag passed is not correct."
  }
, "0x000000BB":{
    "code":"ERROR_SEM_NOT_FOUND"
  , "message":"The specified system semaphore name was not found."
  }
, "0x000000BC":{
    "code":"ERROR_INVALID_STARTING_CODESEG"
  , "message":"The operating system cannot run %1."
  }
, "0x000000BD":{
    "code":"ERROR_INVALID_STACKSEG"
  , "message":"The operating system cannot run %1."
  }
, "0x000000BE":{
    "code":"ERROR_INVALID_MODULETYPE"
  , "message":"The operating system cannot run %1."
  }
, "0x000000BF":{
    "code":"ERROR_INVALID_EXE_SIGNATURE"
  , "message":"Cannot run %1 in Win32 mode."
  }
, "0x000000C0":{
    "code":"ERROR_EXE_MARKED_INVALID"
  , "message":"The operating system cannot run %1."
  }
, "0x000000C1":{
    "code":"ERROR_BAD_EXE_FORMAT"
  , "message":"%1 is not a valid Win32 application."
  }
, "0x000000C2":{
    "code":"ERROR_ITERATED_DATA_EXCEEDS_64k"
  , "message":"The operating system cannot run %1."
  }
, "0x000000C3":{
    "code":"ERROR_INVALID_MINALLOCSIZE"
  , "message":"The operating system cannot run %1."
  }
, "0x000000C4":{
    "code":"ERROR_DYNLINK_FROM_INVALID_RING"
  , "message":"The operating system cannot run this application program."
  }
, "0x000000C5":{
    "code":"ERROR_IOPL_NOT_ENABLED"
  , "message":"The operating system is not presently configured to run this application."
  }
, "0x000000C6":{
    "code":"ERROR_INVALID_SEGDPL"
  , "message":"The operating system cannot run %1."
  }
, "0x000000C7":{
    "code":"ERROR_AUTODATASEG_EXCEEDS_64k"
  , "message":"The operating system cannot run this application program."
  }
, "0x000000C8":{
    "code":"ERROR_RING2SEG_MUST_BE_MOVABLE"
  , "message":"The code segment cannot be greater than or equal to 64 KB."
  }
, "0x000000C9":{
    "code":"ERROR_RELOC_CHAIN_XEEDS_SEGLIM"
  , "message":"The operating system cannot run %1."
  }
, "0x000000CA":{
    "code":"ERROR_INFLOOP_IN_RELOC_CHAIN"
  , "message":"The operating system cannot run %1."
  }
, "0x000000CB":{
    "code":"ERROR_ENVVAR_NOT_FOUND"
  , "message":"The system could not find the environment option that was entered."
  }
, "0x000000CD":{
    "code":"ERROR_NO_SIGNAL_SENT"
  , "message":"No process in the command subtree has a signal handler."
  }
, "0x000000CE":{
    "code":"ERROR_FILENAME_EXCED_RANGE"
  , "message":"The file name or extension is too long."
  }
, "0x000000CF":{
    "code":"ERROR_RING2_STACK_IN_USE"
  , "message":"The ring 2 stack is in use."
  }
, "0x000000D0":{
    "code":"ERROR_META_EXPANSION_TOO_LONG"
  , "message":"The asterisk (*) or question mark (?) global file name characters are entered incorrectly, or too many global file name characters are specified."
  }
, "0x000000D1":{
    "code":"ERROR_INVALID_SIGNAL_NUMBER"
  , "message":"The signal being posted is not correct."
  }
, "0x000000D2":{
    "code":"ERROR_THREAD_1_INACTIVE"
  , "message":"The signal handler cannot be set."
  }
, "0x000000D4":{
    "code":"ERROR_LOCKED"
  , "message":"The segment is locked and cannot be reallocated."
  }
, "0x000000D6":{
    "code":"ERROR_TOO_MANY_MODULES"
  , "message":"Too many dynamic-link modules are attached to this program or dynamic-link module."
  }
, "0x000000D7":{
    "code":"ERROR_NESTING_NOT_ALLOWED"
  , "message":"Cannot nest calls to LoadModule."
  }
, "0x000000D8":{
    "code":"ERROR_EXE_MACHINE_TYPE_MISMATCH"
  , "message":"This version of %1 is not compatible with the version of Windows you\'re running. Check your computer\'s system information to see whether you need an x86 (32-bit) or x64 (64-bit) version of the program, and then contact the software publisher."
  }
, "0x000000D9":{
    "code":"ERROR_EXE_CANNOT_MODIFY_SIGNED_BINARY"
  , "message":"The image file %1 is signed, unable to modify."
  }
, "0x000000DA":{
    "code":"ERROR_EXE_CANNOT_MODIFY_STRONG_SIGNED_BINARY"
  , "message":"The image file %1 is strong signed, unable to modify."
  }
, "0x000000DC":{
    "code":"ERROR_FILE_CHECKED_OUT"
  , "message":"This file is checked out or locked for editing by another user."
  }
, "0x000000DD":{
    "code":"ERROR_CHECKOUT_REQUIRED"
  , "message":"The file must be checked out before saving changes."
  }
, "0x000000DE":{
    "code":"ERROR_BAD_FILE_TYPE"
  , "message":"The file type being saved or retrieved has been blocked."
  }
, "0x000000DF":{
    "code":"ERROR_FILE_TOO_LARGE"
  , "message":"The file size exceeds the limit allowed and cannot be saved."
  }
, "0x000000E0":{
    "code":"ERROR_FORMS_AUTH_REQUIRED"
  , "message":"Access denied. Before opening files in this location, you must first browse to the website and select the option to sign in automatically."
  }
, "0x000000E1":{
    "code":"ERROR_VIRUS_INFECTED"
  , "message":"Operation did not complete successfully because the file contains a virus."
  }
, "0x000000E2":{
    "code":"ERROR_VIRUS_DELETED"
  , "message":"This file contains a virus and cannot be opened. Due to the nature of this virus, the file has been removed from this location."
  }
, "0x000000E5":{
    "code":"ERROR_PIPE_LOCAL"
  , "message":"The pipe is local."
  }
, "0x000000E6":{
    "code":"ERROR_BAD_PIPE"
  , "message":"The pipe state is invalid."
  }
, "0x000000E7":{
    "code":"ERROR_PIPE_BUSY"
  , "message":"All pipe instances are busy."
  }
, "0x000000E8":{
    "code":"ERROR_NO_DATA"
  , "message":"The pipe is being closed."
  }
, "0x000000E9":{
    "code":"ERROR_PIPE_NOT_CONNECTED"
  , "message":"No process is on the other end of the pipe."
  }
, "0x000000EA":{
    "code":"ERROR_MORE_DATA"
  , "message":"More data is available."
  }
, "0x000000F0":{
    "code":"ERROR_VC_DISCONNECTED"
  , "message":"The session was canceled."
  }
, "0x000000FE":{
    "code":"ERROR_INVALID_EA_NAME"
  , "message":"The specified extended attribute name was invalid."
  }
, "0x000000FF":{
    "code":"ERROR_EA_LIST_INCONSISTENT"
  , "message":"The extended attributes are inconsistent."
  }
, "0x00000102":{
    "code":"WAIT_TIMEOUT"
  , "message":"The wait operation timed out."
  }
, "0x00000103":{
    "code":"ERROR_NO_MORE_ITEMS"
  , "message":"No more data is available."
  }
, "0x0000010A":{
    "code":"ERROR_CANNOT_COPY"
  , "message":"The copy functions cannot be used."
  }
, "0x0000010B":{
    "code":"ERROR_DIRECTORY"
  , "message":"The directory name is invalid."
  }
, "0x00000113":{
    "code":"ERROR_EAS_DIDNT_FIT"
  , "message":"The extended attributes did not fit in the buffer."
  }
, "0x00000114":{
    "code":"ERROR_EA_FILE_CORRUPT"
  , "message":"The extended attribute file on the mounted file system is corrupt."
  }
, "0x00000115":{
    "code":"ERROR_EA_TABLE_FULL"
  , "message":"The extended attribute table file is full."
  }
, "0x00000116":{
    "code":"ERROR_INVALID_EA_HANDLE"
  , "message":"The specified extended attribute handle is invalid."
  }
, "0x0000011A":{
    "code":"ERROR_EAS_NOT_SUPPORTED"
  , "message":"The mounted file system does not support extended attributes."
  }
, "0x00000120":{
    "code":"ERROR_NOT_OWNER"
  , "message":"Attempt to release mutex not owned by caller."
  }
, "0x0000012A":{
    "code":"ERROR_TOO_MANY_POSTS"
  , "message":"Too many posts were made to a semaphore."
  }
, "0x0000012B":{
    "code":"ERROR_PARTIAL_COPY"
  , "message":"Only part of a ReadProcessMemory or WriteProcessMemory request was completed."
  }
, "0x0000012C":{
    "code":"ERROR_OPLOCK_NOT_GRANTED"
  , "message":"The oplock request is denied."
  }
, "0x0000012D":{
    "code":"ERROR_INVALID_OPLOCK_PROTOCOL"
  , "message":"An invalid oplock acknowledgment was received by the system."
  }
, "0x0000012E":{
    "code":"ERROR_DISK_TOO_FRAGMENTED"
  , "message":"The volume is too fragmented to complete this operation."
  }
, "0x0000012F":{
    "code":"ERROR_DELETE_PENDING"
  , "message":"The file cannot be opened because it is in the process of being deleted."
  }
, "0x0000013D":{
    "code":"ERROR_MR_MID_NOT_FOUND"
  , "message":"The system cannot find message text for message number 0x%1 in the message file for %2."
  }
, "0x0000013E":{
    "code":"ERROR_SCOPE_NOT_FOUND"
  , "message":"The scope specified was not found."
  }
, "0x0000015E":{
    "code":"ERROR_FAIL_NOACTION_REBOOT"
  , "message":"No action was taken because a system reboot is required."
  }
, "0x0000015F":{
    "code":"ERROR_FAIL_SHUTDOWN"
  , "message":"The shutdown operation failed."
  }
, "0x00000160":{
    "code":"ERROR_FAIL_RESTART"
  , "message":"The restart operation failed."
  }
, "0x00000161":{
    "code":"ERROR_MAX_SESSIONS_REACHED"
  , "message":"The maximum number of sessions has been reached."
  }
, "0x00000190":{
    "code":"ERROR_THREAD_MODE_ALREADY_BACKGROUND"
  , "message":"The thread is already in background processing mode."
  }
, "0x00000191":{
    "code":"ERROR_THREAD_MODE_NOT_BACKGROUND"
  , "message":"The thread is not in background processing mode."
  }
, "0x00000192":{
    "code":"ERROR_PROCESS_MODE_ALREADY_BACKGROUND"
  , "message":"The process is already in background processing mode."
  }
, "0x00000193":{
    "code":"ERROR_PROCESS_MODE_NOT_BACKGROUND"
  , "message":"The process is not in background processing mode."
  }
, "0x000001E7":{
    "code":"ERROR_INVALID_ADDRESS"
  , "message":"Attempt to access invalid address."
  }
, "0x000001F4":{
    "code":"ERROR_USER_PROFILE_LOAD"
  , "message":"User profile cannot be loaded."
  }
, "0x00000216":{
    "code":"ERROR_ARITHMETIC_OVERFLOW"
  , "message":"Arithmetic result exceeded 32 bits."
  }
, "0x00000217":{
    "code":"ERROR_PIPE_CONNECTED"
  , "message":"There is a process on the other end of the pipe."
  }
, "0x00000218":{
    "code":"ERROR_PIPE_LISTENING"
  , "message":"Waiting for a process to open the other end of the pipe."
  }
, "0x00000219":{
    "code":"ERROR_VERIFIER_STOP"
  , "message":"Application verifier has found an error in the current process."
  }
, "0x0000021A":{
    "code":"ERROR_ABIOS_ERROR"
  , "message":"An error occurred in the ABIOS subsystem."
  }
, "0x0000021B":{
    "code":"ERROR_WX86_WARNING"
  , "message":"A warning occurred in the WX86 subsystem."
  }
, "0x0000021C":{
    "code":"ERROR_WX86_ERROR"
  , "message":"An error occurred in the WX86 subsystem."
  }
, "0x0000021D":{
    "code":"ERROR_TIMER_NOT_CANCELED"
  , "message":"An attempt was made to cancel or set a timer that has an associated asynchronous procedure call (APC) and the subject thread is not the thread that originally set the timer with an associated APC routine."
  }
, "0x0000021E":{
    "code":"ERROR_UNWIND"
  , "message":"Unwind exception code."
  }
, "0x0000021F":{
    "code":"ERROR_BAD_STACK"
  , "message":"An invalid or unaligned stack was encountered during an unwind operation."
  }
, "0x00000220":{
    "code":"ERROR_INVALID_UNWIND_TARGET"
  , "message":"An invalid unwind target was encountered during an unwind operation."
  }
, "0x00000221":{
    "code":"ERROR_INVALID_PORT_ATTRIBUTES"
  , "message":"Invalid object attributes specified to NtCreatePort or invalid port attributes specified to NtConnectPort."
  }
, "0x00000222":{
    "code":"ERROR_PORT_MESSAGE_TOO_LONG"
  , "message":"Length of message passed to NtRequestPort or NtRequestWaitReplyPort was longer than the maximum message allowed by the port."
  }
, "0x00000223":{
    "code":"ERROR_INVALID_QUOTA_LOWER"
  , "message":"An attempt was made to lower a quota limit below the current usage."
  }
, "0x00000224":{
    "code":"ERROR_DEVICE_ALREADY_ATTACHED"
  , "message":"An attempt was made to attach to a device that was already attached to another device."
  }
, "0x00000225":{
    "code":"ERROR_INSTRUCTION_MISALIGNMENT"
  , "message":"An attempt was made to execute an instruction at an unaligned address, and the host system does not support unaligned instruction references."
  }
, "0x00000226":{
    "code":"ERROR_PROFILING_NOT_STARTED"
  , "message":"Profiling not started."
  }
, "0x00000227":{
    "code":"ERROR_PROFILING_NOT_STOPPED"
  , "message":"Profiling not stopped."
  }
, "0x00000228":{
    "code":"ERROR_COULD_NOT_INTERPRET"
  , "message":"The passed ACL did not contain the minimum required information."
  }
, "0x00000229":{
    "code":"ERROR_PROFILING_AT_LIMIT"
  , "message":"The number of active profiling objects is at the maximum and no more may be started."
  }
, "0x0000022A":{
    "code":"ERROR_CANT_WAIT"
  , "message":"Used to indicate that an operation cannot continue without blocking for I/O."
  }
, "0x0000022B":{
    "code":"ERROR_CANT_TERMINATE_SELF"
  , "message":"Indicates that a thread attempted to terminate itself by default (called NtTerminateThread with NULL) and it was the last thread in the current process."
  }
, "0x0000022C":{
    "code":"ERROR_UNEXPECTED_MM_CREATE_ERR"
  , "message":"If an MM error is returned that is not defined in the standard FsRtl filter, it is converted to one of the following errors that is guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0x0000022D":{
    "code":"ERROR_UNEXPECTED_MM_MAP_ERROR"
  , "message":"If an MM error is returned that is not defined in the standard FsRtl filter, it is converted to one of the following errors that is guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0x0000022E":{
    "code":"ERROR_UNEXPECTED_MM_EXTEND_ERR"
  , "message":"If an MM error is returned that is not defined in the standard FsRtl filter, it is converted to one of the following errors that is guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
  }
, "0x0000022F":{
    "code":"ERROR_BAD_FUNCTION_TABLE"
  , "message":"A malformed function table was encountered during an unwind operation."
  }
, "0x00000230":{
    "code":"ERROR_NO_GUID_TRANSLATION"
  , "message":"Indicates that an attempt was made to assign protection to a file system file or directory and one of the SIDs in the security descriptor could not be translated into a GUID that could be stored by the file system. This causes the protection attempt to fail, which may cause a file creation attempt to fail."
  }
, "0x00000231":{
    "code":"ERROR_INVALID_LDT_SIZE"
  , "message":"Indicates that an attempt was made to grow a local domain table (LDT) by setting its size, or that the size was not an even number of selectors."
  }
, "0x00000233":{
    "code":"ERROR_INVALID_LDT_OFFSET"
  , "message":"Indicates that the starting value for the LDT information was not an integral multiple of the selector size."
  }
, "0x00000234":{
    "code":"ERROR_INVALID_LDT_DESCRIPTOR"
  , "message":"Indicates that the user supplied an invalid descriptor when trying to set up LDT descriptors."
  }
, "0x00000235":{
    "code":"ERROR_TOO_MANY_THREADS"
  , "message":"Indicates a process has too many threads to perform the requested action. For example, assignment of a primary token may only be performed when a process has zero or one threads."
  }
, "0x00000236":{
    "code":"ERROR_THREAD_NOT_IN_PROCESS"
  , "message":"An attempt was made to operate on a thread within a specific process, but the thread specified is not in the process specified."
  }
, "0x00000237":{
    "code":"ERROR_PAGEFILE_QUOTA_EXCEEDED"
  , "message":"Page file quota was exceeded."
  }
, "0x00000238":{
    "code":"ERROR_LOGON_SERVER_CONFLICT"
  , "message":"The Netlogon service cannot start because another Netlogon service running in the domain conflicts with the specified role."
  }
, "0x00000239":{
    "code":"ERROR_SYNCHRONIZATION_REQUIRED"
  , "message":"The Security Accounts Manager (SAM) database on a Windows Server is significantly out of synchronization with the copy on the domain controller. A complete synchronization is required."
  }
, "0x0000023A":{
    "code":"ERROR_NET_OPEN_FAILED"
  , "message":"The NtCreateFile API failed. This error should never be returned to an application, it is a place holder for the Windows LAN Manager Redirector to use in its internal error mapping routines."
  }
, "0x0000023B":{
    "code":"ERROR_IO_PRIVILEGE_FAILED"
  , "message":"{Privilege Failed} The I/O permissions for the process could not be changed."
  }
, "0x0000023C":{
    "code":"ERROR_CONTROL_C_EXIT"
  , "message":"{Application Exit by CTRL+C} The application terminated as a result of a CTRL+C."
  }
, "0x0000023D":{
    "code":"ERROR_MISSING_SYSTEMFILE"
  , "message":"{Missing System File} The required system file %hs is bad or missing."
  }
, "0x0000023E":{
    "code":"ERROR_UNHANDLED_EXCEPTION"
  , "message":"{Application Error} The exception %s (0x%08lx) occurred in the application at location 0x%08lx."
  }
, "0x0000023F":{
    "code":"ERROR_APP_INIT_FAILURE"
  , "message":"{Application Error} The application failed to initialize properly (0x%lx). Click OK to terminate the application."
  }
, "0x00000240":{
    "code":"ERROR_PAGEFILE_CREATE_FAILED"
  , "message":"{Unable to Create Paging File} The creation of the paging file %hs failed (%lx). The requested size was %ld."
  }
, "0x00000241":{
    "code":"ERROR_INVALID_IMAGE_HASH"
  , "message":"The hash for the image cannot be found in the system catalogs. The image is likely corrupt or the victim of tampering."
  }
, "0x00000242":{
    "code":"ERROR_NO_PAGEFILE"
  , "message":"{No Paging File Specified} No paging file was specified in the system configuration."
  }
, "0x00000243":{
    "code":"ERROR_ILLEGAL_FLOAT_CONTEXT"
  , "message":"{EXCEPTION} A real-mode application issued a floating-point instruction, and floating-point hardware is not present."
  }
, "0x00000244":{
    "code":"ERROR_NO_EVENT_PAIR"
  , "message":"An event pair synchronization operation was performed using the thread-specific client/server event pair object, but no event pair object was associated with the thread."
  }
, "0x00000245":{
    "code":"ERROR_DOMAIN_CTRLR_CONFIG_ERROR"
  , "message":"A Windows Server has an incorrect configuration."
  }
, "0x00000246":{
    "code":"ERROR_ILLEGAL_CHARACTER"
  , "message":"An illegal character was encountered. For a multibyte character set, this includes a lead byte without a succeeding trail byte. For the Unicode character set, this includes the characters 0xFFFF and 0xFFFE."
  }
, "0x00000247":{
    "code":"ERROR_UNDEFINED_CHARACTER"
  , "message":"The Unicode character is not defined in the Unicode character set installed on the system."
  }
, "0x00000248":{
    "code":"ERROR_FLOPPY_VOLUME"
  , "message":"The paging file cannot be created on a floppy disk."
  }
, "0x00000249":{
    "code":"ERROR_BIOS_FAILED_TO_CONNECT_INTERRUPT"
  , "message":"The system bios failed to connect a system interrupt to the device or bus for which the device is connected."
  }
, "0x0000024A":{
    "code":"ERROR_BACKUP_CONTROLLER"
  , "message":"This operation is only allowed for the primary domain controller (PDC) of the domain."
  }
, "0x0000024B":{
    "code":"ERROR_MUTANT_LIMIT_EXCEEDED"
  , "message":"An attempt was made to acquire a mutant such that its maximum count would have been exceeded."
  }
, "0x0000024C":{
    "code":"ERROR_FS_DRIVER_REQUIRED"
  , "message":"A volume has been accessed for which a file system driver is required that has not yet been loaded."
  }
, "0x0000024D":{
    "code":"ERROR_CANNOT_LOAD_REGISTRY_FILE"
  , "message":"{Registry File Failure} The registry cannot load the hive (file): %hs or its log or alternate. It is corrupt, absent, or not writable."
  }
, "0x0000024E":{
    "code":"ERROR_DEBUG_ATTACH_FAILED"
  , "message":"{Unexpected Failure in DebugActiveProcess} An unexpected failure occurred while processing a DebugActiveProcess API request. You may choose OK to terminate the process, or Cancel to ignore the error."
  }
, "0x0000024F":{
    "code":"ERROR_SYSTEM_PROCESS_TERMINATED"
  , "message":"{Fatal System Error} The %hs system process terminated unexpectedly with a status of 0x%08x (0x%08x 0x%08x). The system has been shut down."
  }
, "0x00000250":{
    "code":"ERROR_DATA_NOT_ACCEPTED"
  , "message":"{Data Not Accepted} The transport driver interface (TDI) client could not handle the data received during an indication."
  }
, "0x00000251":{
    "code":"ERROR_VDM_HARD_ERROR"
  , "message":"The NT Virtual DOS Machine (NTVDM) encountered a hard error."
  }
, "0x00000252":{
    "code":"ERROR_DRIVER_CANCEL_TIMEOUT"
  , "message":"{Cancel Timeout} The driver %hs failed to complete a canceled I/O request in the allotted time."
  }
, "0x00000253":{
    "code":"ERROR_REPLY_MESSAGE_MISMATCH"
  , "message":"{Reply Message Mismatch} An attempt was made to reply to a local procedure call (LPC) message, but the thread specified by the client ID in the message was not waiting on that message."
  }
, "0x00000254":{
    "code":"ERROR_LOST_WRITEBEHIND_DATA"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs. The data has been lost. This error may be caused by a failure of your computer hardware or network connection. Try to save this file elsewhere."
  }
, "0x00000255":{
    "code":"ERROR_CLIENT_SERVER_PARAMETERS_INVALID"
  , "message":"The parameters passed to the server in the client/server shared memory window were invalid. Too much data may have been put in the shared memory window."
  }
, "0x00000256":{
    "code":"ERROR_NOT_TINY_STREAM"
  , "message":"The stream is not a tiny stream."
  }
, "0x00000257":{
    "code":"ERROR_STACK_OVERFLOW_READ"
  , "message":"The request must be handled by the stack overflow code."
  }
, "0x00000258":{
    "code":"ERROR_CONVERT_TO_LARGE"
  , "message":"Internal OFS status codes indicating how an allocation operation is handled. Either it is retried after the containing onode is moved or the extent stream is converted to a large stream."
  }
, "0x00000259":{
    "code":"ERROR_FOUND_OUT_OF_SCOPE"
  , "message":"The attempt to find the object found an object matching by ID on the volume but it is out of the scope of the handle used for the operation."
  }
, "0x0000025A":{
    "code":"ERROR_ALLOCATE_BUCKET"
  , "message":"The bucket array must be grown. Retry transaction after doing so."
  }
, "0x0000025B":{
    "code":"ERROR_MARSHALL_OVERFLOW"
  , "message":"The user/kernel marshaling buffer has overflowed."
  }
, "0x0000025C":{
    "code":"ERROR_INVALID_VARIANT"
  , "message":"The supplied variant structure contains invalid data."
  }
, "0x0000025D":{
    "code":"ERROR_BAD_COMPRESSION_BUFFER"
  , "message":"The specified buffer contains ill-formed data."
  }
, "0x0000025E":{
    "code":"ERROR_AUDIT_FAILED"
  , "message":"{Audit Failed} An attempt to generate a security audit failed."
  }
, "0x0000025F":{
    "code":"ERROR_TIMER_RESOLUTION_NOT_SET"
  , "message":"The timer resolution was not previously set by the current process."
  }
, "0x00000260":{
    "code":"ERROR_INSUFFICIENT_LOGON_INFO"
  , "message":"There is insufficient account information to log you on."
  }
, "0x00000261":{
    "code":"ERROR_BAD_DLL_ENTRYPOINT"
  , "message":"{Invalid DLL Entrypoint} The dynamic link library %hs is not written correctly. The stack pointer has been left in an inconsistent state. The entry point should be declared as WINAPI or STDCALL. Select YES to fail the DLL load. Select NO to continue execution. Selecting NO may cause the application to operate incorrectly."
  }
, "0x00000262":{
    "code":"ERROR_BAD_SERVICE_ENTRYPOINT"
  , "message":"{Invalid Service Callback Entrypoint} The %hs service is not written correctly. The stack pointer has been left in an inconsistent state. The callback entry point should be declared as WINAPI or STDCALL. Selecting OK will cause the service to continue operation. However, the service process may operate incorrectly."
  }
, "0x00000263":{
    "code":"ERROR_IP_ADDRESS_CONFLICT1"
  , "message":"There is an IP address conflict with another system on the network."
  }
, "0x00000264":{
    "code":"ERROR_IP_ADDRESS_CONFLICT2"
  , "message":"There is an IP address conflict with another system on the network."
  }
, "0x00000265":{
    "code":"ERROR_REGISTRY_QUOTA_LIMIT"
  , "message":"{Low On Registry Space} The system has reached the maximum size allowed for the system part of the registry. Additional storage requests will be ignored."
  }
, "0x00000266":{
    "code":"ERROR_NO_CALLBACK_ACTIVE"
  , "message":"A callback return system service cannot be executed when no callback is active."
  }
, "0x00000267":{
    "code":"ERROR_PWD_TOO_SHORT"
  , "message":"The password provided is too short to meet the policy of your user account. Choose a longer password."
  }
, "0x00000268":{
    "code":"ERROR_PWD_TOO_RECENT"
  , "message":"The policy of your user account does not allow you to change passwords too frequently. This is done to prevent users from changing back to a familiar, but potentially discovered, password. If you feel your password has been compromised, contact your administrator immediately to have a new one assigned."
  }
, "0x00000269":{
    "code":"ERROR_PWD_HISTORY_CONFLICT"
  , "message":"You have attempted to change your password to one that you have used in the past. The policy of your user account does not allow this. Select a password that you have not previously used."
  }
, "0x0000026A":{
    "code":"ERROR_UNSUPPORTED_COMPRESSION"
  , "message":"The specified compression format is unsupported."
  }
, "0x0000026B":{
    "code":"ERROR_INVALID_HW_PROFILE"
  , "message":"The specified hardware profile configuration is invalid."
  }
, "0x0000026C":{
    "code":"ERROR_INVALID_PLUGPLAY_DEVICE_PATH"
  , "message":"The specified Plug and Play registry device path is invalid."
  }
, "0x0000026D":{
    "code":"ERROR_QUOTA_LIST_INCONSISTENT"
  , "message":"The specified quota list is internally inconsistent with its descriptor."
  }
, "0x0000026E":{
    "code":"ERROR_EVALUATION_EXPIRATION"
  , "message":"{Windows Evaluation Notification} The evaluation period for this installation of Windows has expired. This system will shut down in 1 hour. To restore access to this installation of Windows, upgrade this installation using a licensed distribution of this product."
  }
, "0x0000026F":{
    "code":"ERROR_ILLEGAL_DLL_RELOCATION"
  , "message":"{Illegal System DLL Relocation} The system DLL %hs was relocated in memory. The application will not run properly. The relocation occurred because the DLL %hs occupied an address range reserved for Windows system DLLs. The vendor supplying the DLL should be contacted for a new DLL."
  }
, "0x00000270":{
    "code":"ERROR_DLL_INIT_FAILED_LOGOFF"
  , "message":"{DLL Initialization Failed} The application failed to initialize because the window station is shutting down."
  }
, "0x00000271":{
    "code":"ERROR_VALIDATE_CONTINUE"
  , "message":"The validation process needs to continue on to the next step."
  }
, "0x00000272":{
    "code":"ERROR_NO_MORE_MATCHES"
  , "message":"There are no more matches for the current index enumeration."
  }
, "0x00000273":{
    "code":"ERROR_RANGE_LIST_CONFLICT"
  , "message":"The range could not be added to the range list because of a conflict."
  }
, "0x00000274":{
    "code":"ERROR_SERVER_SID_MISMATCH"
  , "message":"The server process is running under a SID different than that required by the client."
  }
, "0x00000275":{
    "code":"ERROR_CANT_ENABLE_DENY_ONLY"
  , "message":"A group marked use for deny only cannot be enabled."
  }
, "0x00000276":{
    "code":"ERROR_FLOAT_MULTIPLE_FAULTS"
  , "message":"{EXCEPTION} Multiple floating point faults."
  }
, "0x00000277":{
    "code":"ERROR_FLOAT_MULTIPLE_TRAPS"
  , "message":"{EXCEPTION} Multiple floating point traps."
  }
, "0x00000278":{
    "code":"ERROR_NOINTERFACE"
  , "message":"The requested interface is not supported."
  }
, "0x00000279":{
    "code":"ERROR_DRIVER_FAILED_SLEEP"
  , "message":"{System Standby Failed} The driver %hs does not support standby mode. Updating this driver may allow the system to go to standby mode."
  }
, "0x0000027A":{
    "code":"ERROR_CORRUPT_SYSTEM_FILE"
  , "message":"The system file %1 has become corrupt and has been replaced."
  }
, "0x0000027B":{
    "code":"ERROR_COMMITMENT_MINIMUM"
  , "message":"{Virtual Memory Minimum Too Low} Your system is low on virtual memory. Windows is increasing the size of your virtual memory paging file. During this process, memory requests for some applications may be denied. For more information, see Help."
  }
, "0x0000027C":{
    "code":"ERROR_PNP_RESTART_ENUMERATION"
  , "message":"A device was removed so enumeration must be restarted."
  }
, "0x0000027D":{
    "code":"ERROR_SYSTEM_IMAGE_BAD_SIGNATURE"
  , "message":"{Fatal System Error} The system image %s is not properly signed. The file has been replaced with the signed file. The system has been shut down."
  }
, "0x0000027E":{
    "code":"ERROR_PNP_REBOOT_REQUIRED"
  , "message":"Device will not start without a reboot."
  }
, "0x0000027F":{
    "code":"ERROR_INSUFFICIENT_POWER"
  , "message":"There is not enough power to complete the requested operation."
  }
, "0x00000281":{
    "code":"ERROR_SYSTEM_SHUTDOWN"
  , "message":"The system is in the process of shutting down."
  }
, "0x00000282":{
    "code":"ERROR_PORT_NOT_SET"
  , "message":"An attempt to remove a process DebugPort was made, but a port was not already associated with the process."
  }
, "0x00000283":{
    "code":"ERROR_DS_VERSION_CHECK_FAILURE"
  , "message":"This version of Windows is not compatible with the behavior version of directory forest, domain, or domain controller."
  }
, "0x00000284":{
    "code":"ERROR_RANGE_NOT_FOUND"
  , "message":"The specified range could not be found in the range list."
  }
, "0x00000286":{
    "code":"ERROR_NOT_SAFE_MODE_DRIVER"
  , "message":"The driver was not loaded because the system is booting into safe mode."
  }
, "0x00000287":{
    "code":"ERROR_FAILED_DRIVER_ENTRY"
  , "message":"The driver was not loaded because it failed its initialization call."
  }
, "0x00000288":{
    "code":"ERROR_DEVICE_ENUMERATION_ERROR"
  , "message":"The device encountered an error while applying power or reading the device configuration. This may be caused by a failure of your hardware or by a poor connection."
  }
, "0x00000289":{
    "code":"ERROR_MOUNT_POINT_NOT_RESOLVED"
  , "message":"The create operation failed because the name contained at least one mount point that resolves to a volume to which the specified device object is not attached."
  }
, "0x0000028A":{
    "code":"ERROR_INVALID_DEVICE_OBJECT_PARAMETER"
  , "message":"The device object parameter is either not a valid device object or is not attached to the volume specified by the file name."
  }
, "0x0000028B":{
    "code":"ERROR_MCA_OCCURED"
  , "message":"A machine check error has occurred. Check the system event log for additional information."
  }
, "0x0000028C":{
    "code":"ERROR_DRIVER_DATABASE_ERROR"
  , "message":"There was an error [%2] processing the driver database."
  }
, "0x0000028D":{
    "code":"ERROR_SYSTEM_HIVE_TOO_LARGE"
  , "message":"The system hive size has exceeded its limit."
  }
, "0x0000028E":{
    "code":"ERROR_DRIVER_FAILED_PRIOR_UNLOAD"
  , "message":"The driver could not be loaded because a previous version of the driver is still in memory."
  }
, "0x0000028F":{
    "code":"ERROR_VOLSNAP_PREPARE_HIBERNATE"
  , "message":"{Volume Shadow Copy Service} Wait while the Volume Shadow Copy Service prepares volume %hs for hibernation."
  }
, "0x00000290":{
    "code":"ERROR_HIBERNATION_FAILURE"
  , "message":"The system has failed to hibernate (the error code is %hs). Hibernation will be disabled until the system is restarted."
  }
, "0x00000299":{
    "code":"ERROR_FILE_SYSTEM_LIMITATION"
  , "message":"The requested operation could not be completed due to a file system limitation."
  }
, "0x0000029C":{
    "code":"ERROR_ASSERTION_FAILURE"
  , "message":"An assertion failure has occurred."
  }
, "0x0000029D":{
    "code":"ERROR_ACPI_ERROR"
  , "message":"An error occurred in the Advanced Configuration and Power Interface (ACPI) subsystem."
  }
, "0x0000029E":{
    "code":"ERROR_WOW_ASSERTION"
  , "message":"WOW assertion error."
  }
, "0x0000029F":{
    "code":"ERROR_PNP_BAD_MPS_TABLE"
  , "message":"A device is missing in the system BIOS MultiProcessor Specification (MPS) table. This device will not be used. Contact your system vendor for system BIOS update."
  }
, "0x000002A0":{
    "code":"ERROR_PNP_TRANSLATION_FAILED"
  , "message":"A translator failed to translate resources."
  }
, "0x000002A1":{
    "code":"ERROR_PNP_IRQ_TRANSLATION_FAILED"
  , "message":"An interrupt request (IRQ) translator failed to translate resources."
  }
, "0x000002A2":{
    "code":"ERROR_PNP_INVALID_ID"
  , "message":"Driver %2 returned invalid ID for a child device (%3)."
  }
, "0x000002A3":{
    "code":"ERROR_WAKE_SYSTEM_DEBUGGER"
  , "message":"{Kernel Debugger Awakened} the system debugger was awakened by an interrupt."
  }
, "0x000002A4":{
    "code":"ERROR_HANDLES_CLOSED"
  , "message":"{Handles Closed} Handles to objects have been automatically closed because of the requested operation."
  }
, "0x000002A5":{
    "code":"ERROR_EXTRANEOUS_INFORMATION"
  , "message":"{Too Much Information} The specified ACL contained more information than was expected."
  }
, "0x000002A6":{
    "code":"ERROR_RXACT_COMMIT_NECESSARY"
  , "message":"This warning level status indicates that the transaction state already exists for the registry subtree, but that a transaction commit was previously aborted. The commit has NOT been completed, but it has not been rolled back either (so it may still be committed if desired)."
  }
, "0x000002A7":{
    "code":"ERROR_MEDIA_CHECK"
  , "message":"{Media Changed} The media may have changed."
  }
, "0x000002A8":{
    "code":"ERROR_GUID_SUBSTITUTION_MADE"
  , "message":"{GUID Substitution} During the translation of a GUID to a Windows SID, no administratively defined GUID prefix was found. A substitute prefix was used, which will not compromise system security. However, this may provide more restrictive access than intended."
  }
, "0x000002A9":{
    "code":"ERROR_STOPPED_ON_SYMLINK"
  , "message":"The create operation stopped after reaching a symbolic link."
  }
, "0x000002AA":{
    "code":"ERROR_LONGJUMP"
  , "message":"A long jump has been executed."
  }
, "0x000002AB":{
    "code":"ERROR_PLUGPLAY_QUERY_VETOED"
  , "message":"The Plug and Play query operation was not successful."
  }
, "0x000002AC":{
    "code":"ERROR_UNWIND_CONSOLIDATE"
  , "message":"A frame consolidation has been executed."
  }
, "0x000002AD":{
    "code":"ERROR_REGISTRY_HIVE_RECOVERED"
  , "message":"{Registry Hive Recovered} Registry hive (file): %hs was corrupted and it has been recovered. Some data might have been lost."
  }
, "0x000002AE":{
    "code":"ERROR_DLL_MIGHT_BE_INSECURE"
  , "message":"The application is attempting to run executable code from the module %hs. This may be insecure. An alternative, %hs, is available. Should the application use the secure module %hs?"
  }
, "0x000002AF":{
    "code":"ERROR_DLL_MIGHT_BE_INCOMPATIBLE"
  , "message":"The application is loading executable code from the module %hs. This is secure, but may be incompatible with previous releases of the operating system. An alternative, %hs, is available. Should the application use the secure module %hs?"
  }
, "0x000002B0":{
    "code":"ERROR_DBG_EXCEPTION_NOT_HANDLED"
  , "message":"Debugger did not handle the exception."
  }
, "0x000002B1":{
    "code":"ERROR_DBG_REPLY_LATER"
  , "message":"Debugger will reply later."
  }
, "0x000002B2":{
    "code":"ERROR_DBG_UNABLE_TO_PROVIDE_HANDLE"
  , "message":"Debugger cannot provide handle."
  }
, "0x000002B3":{
    "code":"ERROR_DBG_TERMINATE_THREAD"
  , "message":"Debugger terminated thread."
  }
, "0x000002B4":{
    "code":"ERROR_DBG_TERMINATE_PROCESS"
  , "message":"Debugger terminated process."
  }
, "0x000002B5":{
    "code":"ERROR_DBG_CONTROL_C"
  , "message":"Debugger got control C."
  }
, "0x000002B6":{
    "code":"ERROR_DBG_PRINTEXCEPTION_C"
  , "message":"Debugger printed exception on control C."
  }
, "0x000002B7":{
    "code":"ERROR_DBG_RIPEXCEPTION"
  , "message":"Debugger received Routing Information Protocol (RIP) exception."
  }
, "0x000002B8":{
    "code":"ERROR_DBG_CONTROL_BREAK"
  , "message":"Debugger received control break."
  }
, "0x000002B9":{
    "code":"ERROR_DBG_COMMAND_EXCEPTION"
  , "message":"Debugger command communication exception."
  }
, "0x000002BA":{
    "code":"ERROR_OBJECT_NAME_EXISTS"
  , "message":"{Object Exists} An attempt was made to create an object and the object name already existed."
  }
, "0x000002BB":{
    "code":"ERROR_THREAD_WAS_SUSPENDED"
  , "message":"{Thread Suspended} A thread termination occurred while the thread was suspended. The thread was resumed and termination proceeded."
  }
, "0x000002BC":{
    "code":"ERROR_IMAGE_NOT_AT_BASE"
  , "message":"{Image Relocated} An image file could not be mapped at the address specified in the image file. Local fixes must be performed on this image."
  }
, "0x000002BD":{
    "code":"ERROR_RXACT_STATE_CREATED"
  , "message":"This informational level status indicates that a specified registry subtree transaction state did not yet exist and had to be created."
  }
, "0x000002BE":{
    "code":"ERROR_SEGMENT_NOTIFICATION"
  , "message":"{Segment Load} A virtual DOS machine (VDM) is loading, unloading, or moving an MS-DOS or Win16 program segment image. An exception is raised so a debugger can load, unload, or track symbols and breakpoints within these 16-bit segments."
  }
, "0x000002BF":{
    "code":"ERROR_BAD_CURRENT_DIRECTORY"
  , "message":"{Invalid Current Directory} The process cannot switch to the startup current directory %hs. Select OK to set current directory to %hs, or select CANCEL to exit."
  }
, "0x000002C0":{
    "code":"ERROR_FT_READ_RECOVERY_FROM_BACKUP"
  , "message":"{Redundant Read} To satisfy a read request, the NT fault-tolerant file system successfully read the requested data from a redundant copy. This was done because the file system encountered a failure on a member of the fault-tolerant volume, but it was unable to reassign the failing area of the device."
  }
, "0x000002C1":{
    "code":"ERROR_FT_WRITE_RECOVERY"
  , "message":"{Redundant Write} To satisfy a write request, the Windows NT fault-tolerant file system successfully wrote a redundant copy of the information. This was done because the file system encountered a failure on a member of the fault-tolerant volume, but it was not able to reassign the failing area of the device."
  }
, "0x000002C2":{
    "code":"ERROR_IMAGE_MACHINE_TYPE_MISMATCH"
  , "message":"{Machine Type Mismatch} The image file %hs is valid, but is for a machine type other than the current machine. Select OK to continue, or CANCEL to fail the DLL load."
  }
, "0x000002C3":{
    "code":"ERROR_RECEIVE_PARTIAL"
  , "message":"{Partial Data Received} The network transport returned partial data to its client. The remaining data will be sent later."
  }
, "0x000002C4":{
    "code":"ERROR_RECEIVE_EXPEDITED"
  , "message":"{Expedited Data Received} The network transport returned data to its client that was marked as expedited by the remote system."
  }
, "0x000002C5":{
    "code":"ERROR_RECEIVE_PARTIAL_EXPEDITED"
  , "message":"{Partial Expedited Data Received} The network transport returned partial data to its client and this data was marked as expedited by the remote system. The remaining data will be sent later."
  }
, "0x000002C6":{
    "code":"ERROR_EVENT_DONE"
  , "message":"{TDI Event Done} The TDI indication has completed successfully."
  }
, "0x000002C7":{
    "code":"ERROR_EVENT_PENDING"
  , "message":"{TDI Event Pending} The TDI indication has entered the pending state."
  }
, "0x000002C8":{
    "code":"ERROR_CHECKING_FILE_SYSTEM"
  , "message":"Checking file system on %wZ."
  }
, "0x000002C9":{
    "code":"ERROR_FATAL_APP_EXIT"
  , "message":"{Fatal Application Exit} %hs."
  }
, "0x000002CA":{
    "code":"ERROR_PREDEFINED_HANDLE"
  , "message":"The specified registry key is referenced by a predefined handle."
  }
, "0x000002CB":{
    "code":"ERROR_WAS_UNLOCKED"
  , "message":"{Page Unlocked} The page protection of a locked page was changed to \'No Access\' and the page was unlocked from memory and from the process."
  }
, "0x000002CD":{
    "code":"ERROR_WAS_LOCKED"
  , "message":"{Page Locked} One of the pages to lock was already locked."
  }
, "0x000002CF":{
    "code":"ERROR_ALREADY_WIN32"
  , "message":"The value already corresponds with a Win 32 error code."
  }
, "0x000002D0":{
    "code":"ERROR_IMAGE_MACHINE_TYPE_MISMATCH_EXE"
  , "message":"{Machine Type Mismatch} The image file %hs is valid, but is for a machine type other than the current machine."
  }
, "0x000002D1":{
    "code":"ERROR_NO_YIELD_PERFORMED"
  , "message":"A yield execution was performed and no thread was available to run."
  }
, "0x000002D2":{
    "code":"ERROR_TIMER_RESUME_IGNORED"
  , "message":"The resume flag to a timer API was ignored."
  }
, "0x000002D3":{
    "code":"ERROR_ARBITRATION_UNHANDLED"
  , "message":"The arbiter has deferred arbitration of these resources to its parent."
  }
, "0x000002D4":{
    "code":"ERROR_CARDBUS_NOT_SUPPORTED"
  , "message":"The inserted CardBus device cannot be started because of a configuration error on %hs\".\""
  }
, "0x000002D5":{
    "code":"ERROR_MP_PROCESSOR_MISMATCH"
  , "message":"The CPUs in this multiprocessor system are not all the same revision level. To use all processors the operating system restricts itself to the features of the least capable processor in the system. If problems occur with this system, contact the CPU manufacturer to see if this mix of processors is supported."
  }
, "0x000002D6":{
    "code":"ERROR_HIBERNATED"
  , "message":"The system was put into hibernation."
  }
, "0x000002D7":{
    "code":"ERROR_RESUME_HIBERNATION"
  , "message":"The system was resumed from hibernation."
  }
, "0x000002D8":{
    "code":"ERROR_FIRMWARE_UPDATED"
  , "message":"Windows has detected that the system firmware (BIOS) was updated (previous firmware date = %2, current firmware date %3)."
  }
, "0x000002D9":{
    "code":"ERROR_DRIVERS_LEAKING_LOCKED_PAGES"
  , "message":"A device driver is leaking locked I/O pages, causing system degradation. The system has automatically enabled a tracking code to try and catch the culprit."
  }
, "0x000002DA":{
    "code":"ERROR_WAKE_SYSTEM"
  , "message":"The system has awoken."
  }
, "0x000002DF":{
    "code":"ERROR_ABANDONED_WAIT_0"
  , "message":"The call failed because the handle associated with it was closed."
  }
, "0x000002E4":{
    "code":"ERROR_ELEVATION_REQUIRED"
  , "message":"The requested operation requires elevation."
  }
, "0x000002E5":{
    "code":"ERROR_REPARSE"
  , "message":"A reparse should be performed by the object manager because the name of the file resulted in a symbolic link."
  }
, "0x000002E6":{
    "code":"ERROR_OPLOCK_BREAK_IN_PROGRESS"
  , "message":"An open/create operation completed while an oplock break is underway."
  }
, "0x000002E7":{
    "code":"ERROR_VOLUME_MOUNTED"
  , "message":"A new volume has been mounted by a file system."
  }
, "0x000002E8":{
    "code":"ERROR_RXACT_COMMITTED"
  , "message":"This success level status indicates that the transaction state already exists for the registry subtree, but that a transaction commit was previously aborted. The commit has now been completed."
  }
, "0x000002E9":{
    "code":"ERROR_NOTIFY_CLEANUP"
  , "message":"This indicates that a notify change request has been completed due to closing the handle which made the notify change request."
  }
, "0x000002EA":{
    "code":"ERROR_PRIMARY_TRANSPORT_CONNECT_FAILED"
  , "message":"{Connect Failure on Primary Transport} An attempt was made to connect to the remote server %hs on the primary transport, but the connection failed. The computer was able to connect on a secondary transport."
  }
, "0x000002EB":{
    "code":"ERROR_PAGE_FAULT_TRANSITION"
  , "message":"Page fault was a transition fault."
  }
, "0x000002EC":{
    "code":"ERROR_PAGE_FAULT_DEMAND_ZERO"
  , "message":"Page fault was a demand zero fault."
  }
, "0x000002ED":{
    "code":"ERROR_PAGE_FAULT_COPY_ON_WRITE"
  , "message":"Page fault was a demand zero fault."
  }
, "0x000002EE":{
    "code":"ERROR_PAGE_FAULT_GUARD_PAGE"
  , "message":"Page fault was a demand zero fault."
  }
, "0x000002EF":{
    "code":"ERROR_PAGE_FAULT_PAGING_FILE"
  , "message":"Page fault was satisfied by reading from a secondary storage device."
  }
, "0x000002F0":{
    "code":"ERROR_CACHE_PAGE_LOCKED"
  , "message":"Cached page was locked during operation."
  }
, "0x000002F1":{
    "code":"ERROR_CRASH_DUMP"
  , "message":"Crash dump exists in paging file."
  }
, "0x000002F2":{
    "code":"ERROR_BUFFER_ALL_ZEROS"
  , "message":"Specified buffer contains all zeros."
  }
, "0x000002F3":{
    "code":"ERROR_REPARSE_OBJECT"
  , "message":"A reparse should be performed by the object manager because the name of the file resulted in a symbolic link."
  }
, "0x000002F4":{
    "code":"ERROR_RESOURCE_REQUIREMENTS_CHANGED"
  , "message":"The device has succeeded a query-stop and its resource requirements have changed."
  }
, "0x000002F5":{
    "code":"ERROR_TRANSLATION_COMPLETE"
  , "message":"The translator has translated these resources into the global space and no further translations should be performed."
  }
, "0x000002F6":{
    "code":"ERROR_NOTHING_TO_TERMINATE"
  , "message":"A process being terminated has no threads to terminate."
  }
, "0x000002F7":{
    "code":"ERROR_PROCESS_NOT_IN_JOB"
  , "message":"The specified process is not part of a job."
  }
, "0x000002F8":{
    "code":"ERROR_PROCESS_IN_JOB"
  , "message":"The specified process is part of a job."
  }
, "0x000002F9":{
    "code":"ERROR_VOLSNAP_HIBERNATE_READY"
  , "message":"{Volume Shadow Copy Service} The system is now ready for hibernation."
  }
, "0x000002FA":{
    "code":"ERROR_FSFILTER_OP_COMPLETED_SUCCESSFULLY"
  , "message":"A file system or file system filter driver has successfully completed an FsFilter operation."
  }
, "0x000002FB":{
    "code":"ERROR_INTERRUPT_VECTOR_ALREADY_CONNECTED"
  , "message":"The specified interrupt vector was already connected."
  }
, "0x000002FC":{
    "code":"ERROR_INTERRUPT_STILL_CONNECTED"
  , "message":"The specified interrupt vector is still connected."
  }
, "0x000002FD":{
    "code":"ERROR_WAIT_FOR_OPLOCK"
  , "message":"An operation is blocked waiting for an oplock."
  }
, "0x000002FE":{
    "code":"ERROR_DBG_EXCEPTION_HANDLED"
  , "message":"Debugger handled exception."
  }
, "0x000002FF":{
    "code":"ERROR_DBG_CONTINUE"
  , "message":"Debugger continued."
  }
, "0x00000300":{
    "code":"ERROR_CALLBACK_POP_STACK"
  , "message":"An exception occurred in a user mode callback and the kernel callback frame should be removed."
  }
, "0x00000301":{
    "code":"ERROR_COMPRESSION_DISABLED"
  , "message":"Compression is disabled for this volume."
  }
, "0x00000302":{
    "code":"ERROR_CANTFETCHBACKWARDS"
  , "message":"The data provider cannot fetch backward through a result set."
  }
, "0x00000303":{
    "code":"ERROR_CANTSCROLLBACKWARDS"
  , "message":"The data provider cannot scroll backward through a result set."
  }
, "0x00000304":{
    "code":"ERROR_ROWSNOTRELEASED"
  , "message":"The data provider requires that previously fetched data is released before asking for more data."
  }
, "0x00000305":{
    "code":"ERROR_BAD_ACCESSOR_FLAGS"
  , "message":"The data provider was not able to interpret the flags set for a column binding in an accessor."
  }
, "0x00000306":{
    "code":"ERROR_ERRORS_ENCOUNTERED"
  , "message":"One or more errors occurred while processing the request."
  }
, "0x00000307":{
    "code":"ERROR_NOT_CAPABLE"
  , "message":"The implementation is not capable of performing the request."
  }
, "0x00000308":{
    "code":"ERROR_REQUEST_OUT_OF_SEQUENCE"
  , "message":"The client of a component requested an operation that is not valid given the state of the component instance."
  }
, "0x00000309":{
    "code":"ERROR_VERSION_PARSE_ERROR"
  , "message":"A version number could not be parsed."
  }
, "0x0000030A":{
    "code":"ERROR_BADSTARTPOSITION"
  , "message":"The iterator\'s start position is invalid."
  }
, "0x0000030B":{
    "code":"ERROR_MEMORY_HARDWARE"
  , "message":"The hardware has reported an uncorrectable memory error."
  }
, "0x0000030C":{
    "code":"ERROR_DISK_REPAIR_DISABLED"
  , "message":"The attempted operation required self-healing to be enabled."
  }
, "0x0000030D":{
    "code":"ERROR_INSUFFICIENT_RESOURCE_FOR_SPECIFIED_SHARED_SECTION_SIZE"
  , "message":"The Desktop heap encountered an error while allocating session memory. There is more information in the system event log."
  }
, "0x0000030E":{
    "code":"ERROR_SYSTEM_POWERSTATE_TRANSITION"
  , "message":"The system power state is transitioning from %2 to %3."
  }
, "0x0000030F":{
    "code":"ERROR_SYSTEM_POWERSTATE_COMPLEX_TRANSITION"
  , "message":"The system power state is transitioning from %2 to %3 but could enter %4."
  }
, "0x00000310":{
    "code":"ERROR_MCA_EXCEPTION"
  , "message":"A thread is getting dispatched with MCA EXCEPTION because of MCA."
  }
, "0x00000311":{
    "code":"ERROR_ACCESS_AUDIT_BY_POLICY"
  , "message":"Access to %1 is monitored by policy rule %2."
  }
, "0x00000312":{
    "code":"ERROR_ACCESS_DISABLED_NO_SAFER_UI_BY_POLICY"
  , "message":"Access to %1 has been restricted by your administrator by policy rule %2."
  }
, "0x00000313":{
    "code":"ERROR_ABANDON_HIBERFILE"
  , "message":"A valid hibernation file has been invalidated and should be abandoned."
  }
, "0x00000314":{
    "code":"ERROR_LOST_WRITEBEHIND_DATA_NETWORK_DISCONNECTED"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error may be caused by network connectivity issues. Try to save this file elsewhere."
  }
, "0x00000315":{
    "code":"ERROR_LOST_WRITEBEHIND_DATA_NETWORK_SERVER_ERROR"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error was returned by the server on which the file exists. Try to save this file elsewhere."
  }
, "0x00000316":{
    "code":"ERROR_LOST_WRITEBEHIND_DATA_LOCAL_DISK_ERROR"
  , "message":"{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error may be caused if the device has been removed or the media is write-protected."
  }
, "0x000003E2":{
    "code":"ERROR_EA_ACCESS_DENIED"
  , "message":"Access to the extended attribute was denied."
  }
, "0x000003E3":{
    "code":"ERROR_OPERATION_ABORTED"
  , "message":"The I/O operation has been aborted because of either a thread exit or an application request."
  }
, "0x000003E4":{
    "code":"ERROR_IO_INCOMPLETE"
  , "message":"Overlapped I/O event is not in a signaled state."
  }
, "0x000003E5":{
    "code":"ERROR_IO_PENDING"
  , "message":"Overlapped I/O operation is in progress."
  }
, "0x000003E6":{
    "code":"ERROR_NOACCESS"
  , "message":"Invalid access to memory location."
  }
, "0x000003E7":{
    "code":"ERROR_SWAPERROR"
  , "message":"Error performing in-page operation."
  }
, "0x000003E9":{
    "code":"ERROR_STACK_OVERFLOW"
  , "message":"Recursion too deep; the stack overflowed."
  }
, "0x000003EA":{
    "code":"ERROR_INVALID_MESSAGE"
  , "message":"The window cannot act on the sent message."
  }
, "0x000003EB":{
    "code":"ERROR_CAN_NOT_COMPLETE"
  , "message":"Cannot complete this function."
  }
, "0x000003EC":{
    "code":"ERROR_INVALID_FLAGS"
  , "message":"Invalid flags."
  }
, "0x000003ED":{
    "code":"ERROR_UNRECOGNIZED_VOLUME"
  , "message":"The volume does not contain a recognized file system. Be sure that all required file system drivers are loaded and that the volume is not corrupted."
  }
, "0x000003EE":{
    "code":"ERROR_FILE_INVALID"
  , "message":"The volume for a file has been externally altered so that the opened file is no longer valid."
  }
, "0x000003EF":{
    "code":"ERROR_FULLSCREEN_MODE"
  , "message":"The requested operation cannot be performed in full-screen mode."
  }
, "0x000003F0":{
    "code":"ERROR_NO_TOKEN"
  , "message":"An attempt was made to reference a token that does not exist."
  }
, "0x000003F1":{
    "code":"ERROR_BADDB"
  , "message":"The configuration registry database is corrupt."
  }
, "0x000003F2":{
    "code":"ERROR_BADKEY"
  , "message":"The configuration registry key is invalid."
  }
, "0x000003F3":{
    "code":"ERROR_CANTOPEN"
  , "message":"The configuration registry key could not be opened."
  }
, "0x000003F4":{
    "code":"ERROR_CANTREAD"
  , "message":"The configuration registry key could not be read."
  }
, "0x000003F5":{
    "code":"ERROR_CANTWRITE"
  , "message":"The configuration registry key could not be written."
  }
, "0x000003F6":{
    "code":"ERROR_REGISTRY_RECOVERED"
  , "message":"One of the files in the registry database had to be recovered by use of a log or alternate copy. The recovery was successful."
  }
, "0x000003F7":{
    "code":"ERROR_REGISTRY_CORRUPT"
  , "message":"The registry is corrupted. The structure of one of the files containing registry data is corrupted, or the system\'s memory image of the file is corrupted, or the file could not be recovered because the alternate copy or log was absent or corrupted."
  }
, "0x000003F8":{
    "code":"ERROR_REGISTRY_IO_FAILED"
  , "message":"An I/O operation initiated by the registry failed and cannot be recovered. The registry could not read in, write out, or flush one of the files that contain the system\'s image of the registry."
  }
, "0x000003F9":{
    "code":"ERROR_NOT_REGISTRY_FILE"
  , "message":"The system attempted to load or restore a file into the registry, but the specified file is not in a registry file format."
  }
, "0x000003FA":{
    "code":"ERROR_KEY_DELETED"
  , "message":"Illegal operation attempted on a registry key that has been marked for deletion."
  }
, "0x000003FB":{
    "code":"ERROR_NO_LOG_SPACE"
  , "message":"System could not allocate the required space in a registry log."
  }
, "0x000003FC":{
    "code":"ERROR_KEY_HAS_CHILDREN"
  , "message":"Cannot create a symbolic link in a registry key that already has subkeys or values."
  }
, "0x000003FD":{
    "code":"ERROR_CHILD_MUST_BE_VOLATILE"
  , "message":"Cannot create a stable subkey under a volatile parent key."
  }
, "0x000003FE":{
    "code":"ERROR_NOTIFY_ENUM_DIR"
  , "message":"A notify change request is being completed and the information is not being returned in the caller\'s buffer. The caller now needs to enumerate the files to find the changes."
  }
, "0x0000041B":{
    "code":"ERROR_DEPENDENT_SERVICES_RUNNING"
  , "message":"A stop control has been sent to a service that other running services are dependent on."
  }
, "0x0000041C":{
    "code":"ERROR_INVALID_SERVICE_CONTROL"
  , "message":"The requested control is not valid for this service."
  }
, "0x0000041D":{
    "code":"ERROR_SERVICE_REQUEST_TIMEOUT"
  , "message":"The service did not respond to the start or control request in a timely fashion."
  }
, "0x0000041E":{
    "code":"ERROR_SERVICE_NO_THREAD"
  , "message":"A thread could not be created for the service."
  }
, "0x0000041F":{
    "code":"ERROR_SERVICE_DATABASE_LOCKED"
  , "message":"The service database is locked."
  }
, "0x00000420":{
    "code":"ERROR_SERVICE_ALREADY_RUNNING"
  , "message":"An instance of the service is already running."
  }
, "0x00000421":{
    "code":"ERROR_INVALID_SERVICE_ACCOUNT"
  , "message":"The account name is invalid or does not exist, or the password is invalid for the account name specified."
  }
, "0x00000422":{
    "code":"ERROR_SERVICE_DISABLED"
  , "message":"The service cannot be started, either because it is disabled or because it has no enabled devices associated with it."
  }
, "0x00000423":{
    "code":"ERROR_CIRCULAR_DEPENDENCY"
  , "message":"Circular service dependency was specified."
  }
, "0x00000424":{
    "code":"ERROR_SERVICE_DOES_NOT_EXIST"
  , "message":"The specified service does not exist as an installed service."
  }
, "0x00000425":{
    "code":"ERROR_SERVICE_CANNOT_ACCEPT_CTRL"
  , "message":"The service cannot accept control messages at this time."
  }
, "0x00000426":{
    "code":"ERROR_SERVICE_NOT_ACTIVE"
  , "message":"The service has not been started."
  }
, "0x00000427":{
    "code":"ERROR_FAILED_SERVICE_CONTROLLER_CONNECT"
  , "message":"The service process could not connect to the service controller."
  }
, "0x00000428":{
    "code":"ERROR_EXCEPTION_IN_SERVICE"
  , "message":"An exception occurred in the service when handling the control request."
  }
, "0x00000429":{
    "code":"ERROR_DATABASE_DOES_NOT_EXIST"
  , "message":"The database specified does not exist."
  }
, "0x0000042A":{
    "code":"ERROR_SERVICE_SPECIFIC_ERROR"
  , "message":"The service has returned a service-specific error code."
  }
, "0x0000042B":{
    "code":"ERROR_PROCESS_ABORTED"
  , "message":"The process terminated unexpectedly."
  }
, "0x0000042C":{
    "code":"ERROR_SERVICE_DEPENDENCY_FAIL"
  , "message":"The dependency service or group failed to start."
  }
, "0x0000042D":{
    "code":"ERROR_SERVICE_LOGON_FAILED"
  , "message":"The service did not start due to a logon failure."
  }
, "0x0000042E":{
    "code":"ERROR_SERVICE_START_HANG"
  , "message":"After starting, the service hung in a start-pending state."
  }
, "0x0000042F":{
    "code":"ERROR_INVALID_SERVICE_LOCK"
  , "message":"The specified service database lock is invalid."
  }
, "0x00000430":{
    "code":"ERROR_SERVICE_MARKED_FOR_DELETE"
  , "message":"The specified service has been marked for deletion."
  }
, "0x00000431":{
    "code":"ERROR_SERVICE_EXISTS"
  , "message":"The specified service already exists."
  }
, "0x00000432":{
    "code":"ERROR_ALREADY_RUNNING_LKG"
  , "message":"The system is currently running with the last-known-good configuration."
  }
, "0x00000433":{
    "code":"ERROR_SERVICE_DEPENDENCY_DELETED"
  , "message":"The dependency service does not exist or has been marked for deletion."
  }
, "0x00000434":{
    "code":"ERROR_BOOT_ALREADY_ACCEPTED"
  , "message":"The current boot has already been accepted for use as the last-known-good control set."
  }
, "0x00000435":{
    "code":"ERROR_SERVICE_NEVER_STARTED"
  , "message":"No attempts to start the service have been made since the last boot."
  }
, "0x00000436":{
    "code":"ERROR_DUPLICATE_SERVICE_NAME"
  , "message":"The name is already in use as either a service name or a service display name."
  }
, "0x00000437":{
    "code":"ERROR_DIFFERENT_SERVICE_ACCOUNT"
  , "message":"The account specified for this service is different from the account specified for other services running in the same process."
  }
, "0x00000438":{
    "code":"ERROR_CANNOT_DETECT_DRIVER_FAILURE"
  , "message":"Failure actions can only be set for Win32 services, not for drivers."
  }
, "0x00000439":{
    "code":"ERROR_CANNOT_DETECT_PROCESS_ABORT"
  , "message":"This service runs in the same process as the service control manager. Therefore, the service control manager cannot take action if this service\'s process terminates unexpectedly."
  }
, "0x0000043A":{
    "code":"ERROR_NO_RECOVERY_PROGRAM"
  , "message":"No recovery program has been configured for this service."
  }
, "0x0000043B":{
    "code":"ERROR_SERVICE_NOT_IN_EXE"
  , "message":"The executable program that this service is configured to run in does not implement the service."
  }
, "0x0000043C":{
    "code":"ERROR_NOT_SAFEBOOT_SERVICE"
  , "message":"This service cannot be started in Safe Mode."
  }
, "0x0000044C":{
    "code":"ERROR_END_OF_MEDIA"
  , "message":"The physical end of the tape has been reached."
  }
, "0x0000044D":{
    "code":"ERROR_FILEMARK_DETECTED"
  , "message":"A tape access reached a filemark."
  }
, "0x0000044E":{
    "code":"ERROR_BEGINNING_OF_MEDIA"
  , "message":"The beginning of the tape or a partition was encountered."
  }
, "0x0000044F":{
    "code":"ERROR_SETMARK_DETECTED"
  , "message":"A tape access reached the end of a set of files."
  }
, "0x00000450":{
    "code":"ERROR_NO_DATA_DETECTED"
  , "message":"No more data is on the tape."
  }
, "0x00000451":{
    "code":"ERROR_PARTITION_FAILURE"
  , "message":"Tape could not be partitioned."
  }
, "0x00000452":{
    "code":"ERROR_INVALID_BLOCK_LENGTH"
  , "message":"When accessing a new tape of a multivolume partition, the current block size is incorrect."
  }
, "0x00000453":{
    "code":"ERROR_DEVICE_NOT_PARTITIONED"
  , "message":"Tape partition information could not be found when loading a tape."
  }
, "0x00000454":{
    "code":"ERROR_UNABLE_TO_LOCK_MEDIA"
  , "message":"Unable to lock the media eject mechanism."
  }
, "0x00000455":{
    "code":"ERROR_UNABLE_TO_UNLOAD_MEDIA"
  , "message":"Unable to unload the media."
  }
, "0x00000456":{
    "code":"ERROR_MEDIA_CHANGED"
  , "message":"The media in the drive may have changed."
  }
, "0x00000457":{
    "code":"ERROR_BUS_RESET"
  , "message":"The I/O bus was reset."
  }
, "0x00000458":{
    "code":"ERROR_NO_MEDIA_IN_DRIVE"
  , "message":"No media in drive."
  }
, "0x00000459":{
    "code":"ERROR_NO_UNICODE_TRANSLATION"
  , "message":"No mapping for the Unicode character exists in the target multibyte code page."
  }
, "0x0000045A":{
    "code":"ERROR_DLL_INIT_FAILED"
  , "message":"A DLL initialization routine failed."
  }
, "0x0000045B":{
    "code":"ERROR_SHUTDOWN_IN_PROGRESS"
  , "message":"A system shutdown is in progress."
  }
, "0x0000045C":{
    "code":"ERROR_NO_SHUTDOWN_IN_PROGRESS"
  , "message":"Unable to abort the system shutdown because no shutdown was in progress."
  }
, "0x0000045D":{
    "code":"ERROR_IO_DEVICE"
  , "message":"The request could not be performed because of an I/O device error."
  }
, "0x0000045E":{
    "code":"ERROR_SERIAL_NO_DEVICE"
  , "message":"No serial device was successfully initialized. The serial driver will unload."
  }
, "0x0000045F":{
    "code":"ERROR_IRQ_BUSY"
  , "message":"Unable to open a device that was sharing an IRQ with other devices. At least one other device that uses that IRQ was already opened."
  }
, "0x00000460":{
    "code":"ERROR_MORE_WRITES"
  , "message":"A serial I/O operation was completed by another write to the serial port. (The IOCTL_SERIAL_XOFF_COUNTER reached zero.)"
  }
, "0x00000461":{
    "code":"ERROR_COUNTER_TIMEOUT"
  , "message":"A serial I/O operation completed because the time-out period expired. (The IOCTL_SERIAL_XOFF_COUNTER did not reach zero.)"
  }
, "0x00000462":{
    "code":"ERROR_FLOPPY_ID_MARK_NOT_FOUND"
  , "message":"No ID address mark was found on the floppy disk."
  }
, "0x00000463":{
    "code":"ERROR_FLOPPY_WRONG_CYLINDER"
  , "message":"Mismatch between the floppy disk sector ID field and the floppy disk controller track address."
  }
, "0x00000464":{
    "code":"ERROR_FLOPPY_UNKNOWN_ERROR"
  , "message":"The floppy disk controller reported an error that is not recognized by the floppy disk driver."
  }
, "0x00000465":{
    "code":"ERROR_FLOPPY_BAD_REGISTERS"
  , "message":"The floppy disk controller returned inconsistent results in its registers."
  }
, "0x00000466":{
    "code":"ERROR_DISK_RECALIBRATE_FAILED"
  , "message":"While accessing the hard disk, a recalibrate operation failed, even after retries."
  }
, "0x00000467":{
    "code":"ERROR_DISK_OPERATION_FAILED"
  , "message":"While accessing the hard disk, a disk operation failed even after retries."
  }
, "0x00000468":{
    "code":"ERROR_DISK_RESET_FAILED"
  , "message":"While accessing the hard disk, a disk controller reset was needed, but that also failed."
  }
, "0x00000469":{
    "code":"ERROR_EOM_OVERFLOW"
  , "message":"Physical end of tape encountered."
  }
, "0x0000046A":{
    "code":"ERROR_NOT_ENOUGH_SERVER_MEMORY"
  , "message":"Not enough server storage is available to process this command."
  }
, "0x0000046B":{
    "code":"ERROR_POSSIBLE_DEADLOCK"
  , "message":"A potential deadlock condition has been detected."
  }
, "0x0000046C":{
    "code":"ERROR_MAPPED_ALIGNMENT"
  , "message":"The base address or the file offset specified does not have the proper alignment."
  }
, "0x00000474":{
    "code":"ERROR_SET_POWER_STATE_VETOED"
  , "message":"An attempt to change the system power state was vetoed by another application or driver."
  }
, "0x00000475":{
    "code":"ERROR_SET_POWER_STATE_FAILED"
  , "message":"The system BIOS failed an attempt to change the system power state."
  }
, "0x00000476":{
    "code":"ERROR_TOO_MANY_LINKS"
  , "message":"An attempt was made to create more links on a file than the file system supports."
  }
, "0x0000047E":{
    "code":"ERROR_OLD_WIN_VERSION"
  , "message":"The specified program requires a newer version of Windows."
  }
, "0x0000047F":{
    "code":"ERROR_APP_WRONG_OS"
  , "message":"The specified program is not a Windows or MS-DOS program."
  }
, "0x00000480":{
    "code":"ERROR_SINGLE_INSTANCE_APP"
  , "message":"Cannot start more than one instance of the specified program."
  }
, "0x00000481":{
    "code":"ERROR_RMODE_APP"
  , "message":"The specified program was written for an earlier version of Windows."
  }
, "0x00000482":{
    "code":"ERROR_INVALID_DLL"
  , "message":"One of the library files needed to run this application is damaged."
  }
, "0x00000483":{
    "code":"ERROR_NO_ASSOCIATION"
  , "message":"No application is associated with the specified file for this operation."
  }
, "0x00000484":{
    "code":"ERROR_DDE_FAIL"
  , "message":"An error occurred in sending the command to the application."
  }
, "0x00000485":{
    "code":"ERROR_DLL_NOT_FOUND"
  , "message":"One of the library files needed to run this application cannot be found."
  }
, "0x00000486":{
    "code":"ERROR_NO_MORE_USER_HANDLES"
  , "message":"The current process has used all of its system allowance of handles for Windows manager objects."
  }
, "0x00000487":{
    "code":"ERROR_MESSAGE_SYNC_ONLY"
  , "message":"The message can be used only with synchronous operations."
  }
, "0x00000488":{
    "code":"ERROR_SOURCE_ELEMENT_EMPTY"
  , "message":"The indicated source element has no media."
  }
, "0x00000489":{
    "code":"ERROR_DESTINATION_ELEMENT_FULL"
  , "message":"The indicated destination element already contains media."
  }
, "0x0000048A":{
    "code":"ERROR_ILLEGAL_ELEMENT_ADDRESS"
  , "message":"The indicated element does not exist."
  }
, "0x0000048B":{
    "code":"ERROR_MAGAZINE_NOT_PRESENT"
  , "message":"The indicated element is part of a magazine that is not present."
  }
, "0x0000048C":{
    "code":"ERROR_DEVICE_REINITIALIZATION_NEEDED"
  , "message":"The indicated device requires re-initialization due to hardware errors."
  }
, "0x0000048D":{
    "code":"ERROR_DEVICE_REQUIRES_CLEANING"
  , "message":"The device has indicated that cleaning is required before further operations are attempted."
  }
, "0x0000048E":{
    "code":"ERROR_DEVICE_DOOR_OPEN"
  , "message":"The device has indicated that its door is open."
  }
, "0x0000048F":{
    "code":"ERROR_DEVICE_NOT_CONNECTED"
  , "message":"The device is not connected."
  }
, "0x00000490":{
    "code":"ERROR_NOT_FOUND"
  , "message":"Element not found."
  }
, "0x00000491":{
    "code":"ERROR_NO_MATCH"
  , "message":"There was no match for the specified key in the index."
  }
, "0x00000492":{
    "code":"ERROR_SET_NOT_FOUND"
  , "message":"The property set specified does not exist on the object."
  }
, "0x00000493":{
    "code":"ERROR_POINT_NOT_FOUND"
  , "message":"The point passed to GetMouseMovePoints is not in the buffer."
  }
, "0x00000494":{
    "code":"ERROR_NO_TRACKING_SERVICE"
  , "message":"The tracking (workstation) service is not running."
  }
, "0x00000495":{
    "code":"ERROR_NO_VOLUME_ID"
  , "message":"The volume ID could not be found."
  }
, "0x00000497":{
    "code":"ERROR_UNABLE_TO_REMOVE_REPLACED"
  , "message":"Unable to remove the file to be replaced."
  }
, "0x00000498":{
    "code":"ERROR_UNABLE_TO_MOVE_REPLACEMENT"
  , "message":"Unable to move the replacement file to the file to be replaced. The file to be replaced has retained its original name."
  }
, "0x00000499":{
    "code":"ERROR_UNABLE_TO_MOVE_REPLACEMENT_2"
  , "message":"Unable to move the replacement file to the file to be replaced. The file to be replaced has been renamed using the backup name."
  }
, "0x0000049A":{
    "code":"ERROR_JOURNAL_DELETE_IN_PROGRESS"
  , "message":"The volume change journal is being deleted."
  }
, "0x0000049B":{
    "code":"ERROR_JOURNAL_NOT_ACTIVE"
  , "message":"The volume change journal is not active."
  }
, "0x0000049C":{
    "code":"ERROR_POTENTIAL_FILE_FOUND"
  , "message":"A file was found, but it may not be the correct file."
  }
, "0x0000049D":{
    "code":"ERROR_JOURNAL_ENTRY_DELETED"
  , "message":"The journal entry has been deleted from the journal."
  }
, "0x000004A6":{
    "code":"ERROR_SHUTDOWN_IS_SCHEDULED"
  , "message":"A system shutdown has already been scheduled."
  }
, "0x000004A7":{
    "code":"ERROR_SHUTDOWN_USERS_LOGGED_ON"
  , "message":"The system shutdown cannot be initiated because there are other users logged on to the computer."
  }
, "0x000004B0":{
    "code":"ERROR_BAD_DEVICE"
  , "message":"The specified device name is invalid."
  }
, "0x000004B1":{
    "code":"ERROR_CONNECTION_UNAVAIL"
  , "message":"The device is not currently connected but it is a remembered connection."
  }
, "0x000004B2":{
    "code":"ERROR_DEVICE_ALREADY_REMEMBERED"
  , "message":"The local device name has a remembered connection to another network resource."
  }
, "0x000004B3":{
    "code":"ERROR_NO_NET_OR_BAD_PATH"
  , "message":"The network path was either typed incorrectly, does not exist, or the network provider is not currently available. Try retyping the path or contact your network administrator."
  }
, "0x000004B4":{
    "code":"ERROR_BAD_PROVIDER"
  , "message":"The specified network provider name is invalid."
  }
, "0x000004B5":{
    "code":"ERROR_CANNOT_OPEN_PROFILE"
  , "message":"Unable to open the network connection profile."
  }
, "0x000004B6":{
    "code":"ERROR_BAD_PROFILE"
  , "message":"The network connection profile is corrupted."
  }
, "0x000004B7":{
    "code":"ERROR_NOT_CONTAINER"
  , "message":"Cannot enumerate a noncontainer."
  }
, "0x000004B8":{
    "code":"ERROR_EXTENDED_ERROR"
  , "message":"An extended error has occurred."
  }
, "0x000004B9":{
    "code":"ERROR_INVALID_GROUPNAME"
  , "message":"The format of the specified group name is invalid."
  }
, "0x000004BA":{
    "code":"ERROR_INVALID_COMPUTERNAME"
  , "message":"The format of the specified computer name is invalid."
  }
, "0x000004BB":{
    "code":"ERROR_INVALID_EVENTNAME"
  , "message":"The format of the specified event name is invalid."
  }
, "0x000004BC":{
    "code":"ERROR_INVALID_DOMAINNAME"
  , "message":"The format of the specified domain name is invalid."
  }
, "0x000004BD":{
    "code":"ERROR_INVALID_SERVICENAME"
  , "message":"The format of the specified service name is invalid."
  }
, "0x000004BE":{
    "code":"ERROR_INVALID_NETNAME"
  , "message":"The format of the specified network name is invalid."
  }
, "0x000004BF":{
    "code":"ERROR_INVALID_SHARENAME"
  , "message":"The format of the specified share name is invalid."
  }
, "0x000004C0":{
    "code":"ERROR_INVALID_PASSWORDNAME"
  , "message":"The format of the specified password is invalid."
  }
, "0x000004C1":{
    "code":"ERROR_INVALID_MESSAGENAME"
  , "message":"The format of the specified message name is invalid."
  }
, "0x000004C2":{
    "code":"ERROR_INVALID_MESSAGEDEST"
  , "message":"The format of the specified message destination is invalid."
  }
, "0x000004C3":{
    "code":"ERROR_SESSION_CREDENTIAL_CONFLICT"
  , "message":"Multiple connections to a server or shared resource by the same user, using more than one user name, are not allowed. Disconnect all previous connections to the server or shared resource and try again."
  }
, "0x000004C4":{
    "code":"ERROR_REMOTE_SESSION_LIMIT_EXCEEDED"
  , "message":"An attempt was made to establish a session to a network server, but there are already too many sessions established to that server."
  }
, "0x000004C5":{
    "code":"ERROR_DUP_DOMAINNAME"
  , "message":"The workgroup or domain name is already in use by another computer on the network."
  }
, "0x000004C6":{
    "code":"ERROR_NO_NETWORK"
  , "message":"The network is not present or not started."
  }
, "0x000004C7":{
    "code":"ERROR_CANCELLED"
  , "message":"The operation was canceled by the user."
  }
, "0x000004C8":{
    "code":"ERROR_USER_MAPPED_FILE"
  , "message":"The requested operation cannot be performed on a file with a user-mapped section open."
  }
, "0x000004C9":{
    "code":"ERROR_CONNECTION_REFUSED"
  , "message":"The remote system refused the network connection."
  }
, "0x000004CA":{
    "code":"ERROR_GRACEFUL_DISCONNECT"
  , "message":"The network connection was gracefully closed."
  }
, "0x000004CB":{
    "code":"ERROR_ADDRESS_ALREADY_ASSOCIATED"
  , "message":"The network transport endpoint already has an address associated with it."
  }
, "0x000004CC":{
    "code":"ERROR_ADDRESS_NOT_ASSOCIATED"
  , "message":"An address has not yet been associated with the network endpoint."
  }
, "0x000004CD":{
    "code":"ERROR_CONNECTION_INVALID"
  , "message":"An operation was attempted on a nonexistent network connection."
  }
, "0x000004CE":{
    "code":"ERROR_CONNECTION_ACTIVE"
  , "message":"An invalid operation was attempted on an active network connection."
  }
, "0x000004CF":{
    "code":"ERROR_NETWORK_UNREACHABLE"
  , "message":"The network location cannot be reached. For information about network troubleshooting, see Windows Help."
  }
, "0x000004D0":{
    "code":"ERROR_HOST_UNREACHABLE"
  , "message":"The network location cannot be reached. For information about network troubleshooting, see Windows Help."
  }
, "0x000004D1":{
    "code":"ERROR_PROTOCOL_UNREACHABLE"
  , "message":"The network location cannot be reached. For information about network troubleshooting, see Windows Help."
  }
, "0x000004D2":{
    "code":"ERROR_PORT_UNREACHABLE"
  , "message":"No service is operating at the destination network endpoint on the remote system."
  }
, "0x000004D3":{
    "code":"ERROR_REQUEST_ABORTED"
  , "message":"The request was aborted."
  }
, "0x000004D4":{
    "code":"ERROR_CONNECTION_ABORTED"
  , "message":"The network connection was aborted by the local system."
  }
, "0x000004D5":{
    "code":"ERROR_RETRY"
  , "message":"The operation could not be completed. A retry should be performed."
  }
, "0x000004D6":{
    "code":"ERROR_CONNECTION_COUNT_LIMIT"
  , "message":"A connection to the server could not be made because the limit on the number of concurrent connections for this account has been reached."
  }
, "0x000004D7":{
    "code":"ERROR_LOGIN_TIME_RESTRICTION"
  , "message":"Attempting to log on during an unauthorized time of day for this account."
  }
, "0x000004D8":{
    "code":"ERROR_LOGIN_WKSTA_RESTRICTION"
  , "message":"The account is not authorized to log on from this station."
  }
, "0x000004D9":{
    "code":"ERROR_INCORRECT_ADDRESS"
  , "message":"The network address could not be used for the operation requested."
  }
, "0x000004DA":{
    "code":"ERROR_ALREADY_REGISTERED"
  , "message":"The service is already registered."
  }
, "0x000004DB":{
    "code":"ERROR_SERVICE_NOT_FOUND"
  , "message":"The specified service does not exist."
  }
, "0x000004DC":{
    "code":"ERROR_NOT_AUTHENTICATED"
  , "message":"The operation being requested was not performed because the user has not been authenticated."
  }
, "0x000004DD":{
    "code":"ERROR_NOT_LOGGED_ON"
  , "message":"The operation being requested was not performed because the user has not logged on to the network. The specified service does not exist."
  }
, "0x000004DE":{
    "code":"ERROR_CONTINUE"
  , "message":"Continue with work in progress."
  }
, "0x000004DF":{
    "code":"ERROR_ALREADY_INITIALIZED"
  , "message":"An attempt was made to perform an initialization operation when initialization has already been completed."
  }
, "0x000004E0":{
    "code":"ERROR_NO_MORE_DEVICES"
  , "message":"No more local devices."
  }
, "0x000004E1":{
    "code":"ERROR_NO_SUCH_SITE"
  , "message":"The specified site does not exist."
  }
, "0x000004E2":{
    "code":"ERROR_DOMAIN_CONTROLLER_EXISTS"
  , "message":"A domain controller with the specified name already exists."
  }
, "0x000004E3":{
    "code":"ERROR_ONLY_IF_CONNECTED"
  , "message":"This operation is supported only when you are connected to the server."
  }
, "0x000004E4":{
    "code":"ERROR_OVERRIDE_NOCHANGES"
  , "message":"The group policy framework should call the extension even if there are no changes."
  }
, "0x000004E5":{
    "code":"ERROR_BAD_USER_PROFILE"
  , "message":"The specified user does not have a valid profile."
  }
, "0x000004E6":{
    "code":"ERROR_NOT_SUPPORTED_ON_SBS"
  , "message":"This operation is not supported on a computer running Windows Server 2003 for Small Business Server."
  }
, "0x000004E7":{
    "code":"ERROR_SERVER_SHUTDOWN_IN_PROGRESS"
  , "message":"The server machine is shutting down."
  }
, "0x000004E8":{
    "code":"ERROR_HOST_DOWN"
  , "message":"The remote system is not available. For information about network troubleshooting, see Windows Help."
  }
, "0x000004E9":{
    "code":"ERROR_NON_ACCOUNT_SID"
  , "message":"The security identifier provided is not from an account domain."
  }
, "0x000004EA":{
    "code":"ERROR_NON_DOMAIN_SID"
  , "message":"The security identifier provided does not have a domain component."
  }
, "0x000004EB":{
    "code":"ERROR_APPHELP_BLOCK"
  , "message":"AppHelp dialog canceled, thus preventing the application from starting."
  }
, "0x000004EC":{
    "code":"ERROR_ACCESS_DISABLED_BY_POLICY"
  , "message":"This program is blocked by Group Policy. For more information, contact your system administrator."
  }
, "0x000004ED":{
    "code":"ERROR_REG_NAT_CONSUMPTION"
  , "message":"A program attempt to use an invalid register value. Normally caused by an uninitialized register. This error is Itanium specific."
  }
, "0x000004EE":{
    "code":"ERROR_CSCSHARE_OFFLINE"
  , "message":"The share is currently offline or does not exist."
  }
, "0x000004EF":{
    "code":"ERROR_PKINIT_FAILURE"
  , "message":"The Kerberos protocol encountered an error while validating the KDC certificate during smartcard logon. There is more information in the system event log."
  }
, "0x000004F0":{
    "code":"ERROR_SMARTCARD_SUBSYSTEM_FAILURE"
  , "message":"The Kerberos protocol encountered an error while attempting to utilize the smartcard subsystem."
  }
, "0x000004F1":{
    "code":"ERROR_DOWNGRADE_DETECTED"
  , "message":"The system detected a possible attempt to compromise security. Ensure that you can contact the server that authenticated you."
  }
, "0x000004F7":{
    "code":"ERROR_MACHINE_LOCKED"
  , "message":"The machine is locked and cannot be shut down without the force option."
  }
, "0x000004F9":{
    "code":"ERROR_CALLBACK_SUPPLIED_INVALID_DATA"
  , "message":"An application-defined callback gave invalid data when called."
  }
, "0x000004FA":{
    "code":"ERROR_SYNC_FOREGROUND_REFRESH_REQUIRED"
  , "message":"The Group Policy framework should call the extension in the synchronous foreground policy refresh."
  }
, "0x000004FB":{
    "code":"ERROR_DRIVER_BLOCKED"
  , "message":"This driver has been blocked from loading."
  }
, "0x000004FC":{
    "code":"ERROR_INVALID_IMPORT_OF_NON_DLL"
  , "message":"A DLL referenced a module that was neither a DLL nor the process\'s executable image."
  }
, "0x000004FD":{
    "code":"ERROR_ACCESS_DISABLED_WEBBLADE"
  , "message":"Windows cannot open this program because it has been disabled."
  }
, "0x000004FE":{
    "code":"ERROR_ACCESS_DISABLED_WEBBLADE_TAMPER"
  , "message":"Windows cannot open this program because the license enforcement system has been tampered with or become corrupted."
  }
, "0x000004FF":{
    "code":"ERROR_RECOVERY_FAILURE"
  , "message":"A transaction recover failed."
  }
, "0x00000500":{
    "code":"ERROR_ALREADY_FIBER"
  , "message":"The current thread has already been converted to a fiber."
  }
, "0x00000501":{
    "code":"ERROR_ALREADY_THREAD"
  , "message":"The current thread has already been converted from a fiber."
  }
, "0x00000502":{
    "code":"ERROR_STACK_BUFFER_OVERRUN"
  , "message":"The system detected an overrun of a stack-based buffer in this application. This overrun could potentially allow a malicious user to gain control of this application."
  }
, "0x00000503":{
    "code":"ERROR_PARAMETER_QUOTA_EXCEEDED"
  , "message":"Data present in one of the parameters is more than the function can operate on."
  }
, "0x00000504":{
    "code":"ERROR_DEBUGGER_INACTIVE"
  , "message":"An attempt to perform an operation on a debug object failed because the object is in the process of being deleted."
  }
, "0x00000505":{
    "code":"ERROR_DELAY_LOAD_FAILED"
  , "message":"An attempt to delay-load a .dll or get a function address in a delay-loaded .dll failed."
  }
, "0x00000506":{
    "code":"ERROR_VDM_DISALLOWED"
  , "message":"%1 is a 16-bit application. You do not have permissions to execute 16-bit applications. Check your permissions with your system administrator."
  }
, "0x00000507":{
    "code":"ERROR_UNIDENTIFIED_ERROR"
  , "message":"Insufficient information exists to identify the cause of failure."
  }
, "0x00000508":{
    "code":"ERROR_INVALID_CRUNTIME_PARAMETER"
  , "message":"The parameter passed to a C runtime function is incorrect."
  }
, "0x00000509":{
    "code":"ERROR_BEYOND_VDL"
  , "message":"The operation occurred beyond the valid data length of the file."
  }
, "0x0000050A":{
    "code":"ERROR_INCOMPATIBLE_SERVICE_SID_TYPE"
  , "message":"The service start failed because one or more services in the same process have an incompatible service SID type setting. A service with a restricted service SID type can only coexist in the same process with other services with a restricted SID type."
  }
, "0x0000050B":{
    "code":"ERROR_DRIVER_PROCESS_TERMINATED"
  , "message":"The process hosting the driver for this device has been terminated."
  }
, "0x0000050C":{
    "code":"ERROR_IMPLEMENTATION_LIMIT"
  , "message":"An operation attempted to exceed an implementation-defined limit."
  }
, "0x0000050D":{
    "code":"ERROR_PROCESS_IS_PROTECTED"
  , "message":"Either the target process, or the target thread\'s containing process, is a protected process."
  }
, "0x0000050E":{
    "code":"ERROR_SERVICE_NOTIFY_CLIENT_LAGGING"
  , "message":"The service notification client is lagging too far behind the current state of services in the machine."
  }
, "0x0000050F":{
    "code":"ERROR_DISK_QUOTA_EXCEEDED"
  , "message":"An operation failed because the storage quota was exceeded."
  }
, "0x00000510":{
    "code":"ERROR_CONTENT_BLOCKED"
  , "message":"An operation failed because the content was blocked."
  }
, "0x00000511":{
    "code":"ERROR_INCOMPATIBLE_SERVICE_PRIVILEGE"
  , "message":"A privilege that the service requires to function properly does not exist in the service account configuration. You may use the Services Microsoft Management Console (MMC) snap-in (Services.msc) and the Local Security Settings MMC snap-in (Secpol.msc) to view the service configuration and the account configuration."
  }
, "0x00000513":{
    "code":"ERROR_INVALID_LABEL"
  , "message":"Indicates a particular SID may not be assigned as the label of an object."
  }
, "0x00000514":{
    "code":"ERROR_NOT_ALL_ASSIGNED"
  , "message":"Not all privileges or groups referenced are assigned to the caller."
  }
, "0x00000515":{
    "code":"ERROR_SOME_NOT_MAPPED"
  , "message":"Some mapping between account names and SIDs was not done."
  }
, "0x00000516":{
    "code":"ERROR_NO_QUOTAS_FOR_ACCOUNT"
  , "message":"No system quota limits are specifically set for this account."
  }
, "0x00000517":{
    "code":"ERROR_LOCAL_USER_SESSION_KEY"
  , "message":"No encryption key is available. A well-known encryption key was returned."
  }
, "0x00000518":{
    "code":"ERROR_NULL_LM_PASSWORD"
  , "message":"The password is too complex to be converted to a LAN Manager password. The LAN Manager password returned is a null string."
  }
, "0x00000519":{
    "code":"ERROR_UNKNOWN_REVISION"
  , "message":"The revision level is unknown."
  }
, "0x0000051A":{
    "code":"ERROR_REVISION_MISMATCH"
  , "message":"Indicates two revision levels are incompatible."
  }
, "0x0000051B":{
    "code":"ERROR_INVALID_OWNER"
  , "message":"This SID may not be assigned as the owner of this object."
  }
, "0x0000051C":{
    "code":"ERROR_INVALID_PRIMARY_GROUP"
  , "message":"This SID may not be assigned as the primary group of an object."
  }
, "0x0000051D":{
    "code":"ERROR_NO_IMPERSONATION_TOKEN"
  , "message":"An attempt has been made to operate on an impersonation token by a thread that is not currently impersonating a client."
  }
, "0x0000051E":{
    "code":"ERROR_CANT_DISABLE_MANDATORY"
  , "message":"The group may not be disabled."
  }
, "0x0000051F":{
    "code":"ERROR_NO_LOGON_SERVERS"
  , "message":"There are currently no logon servers available to service the logon request."
  }
, "0x00000520":{
    "code":"ERROR_NO_SUCH_LOGON_SESSION"
  , "message":"A specified logon session does not exist. It may already have been terminated."
  }
, "0x00000521":{
    "code":"ERROR_NO_SUCH_PRIVILEGE"
  , "message":"A specified privilege does not exist."
  }
, "0x00000522":{
    "code":"ERROR_PRIVILEGE_NOT_HELD"
  , "message":"A required privilege is not held by the client."
  }
, "0x00000523":{
    "code":"ERROR_INVALID_ACCOUNT_NAME"
  , "message":"The name provided is not a properly formed account name."
  }
, "0x00000524":{
    "code":"ERROR_USER_EXISTS"
  , "message":"The specified account already exists."
  }
, "0x00000525":{
    "code":"ERROR_NO_SUCH_USER"
  , "message":"The specified account does not exist."
  }
, "0x00000526":{
    "code":"ERROR_GROUP_EXISTS"
  , "message":"The specified group already exists."
  }
, "0x00000527":{
    "code":"ERROR_NO_SUCH_GROUP"
  , "message":"The specified group does not exist."
  }
, "0x00000528":{
    "code":"ERROR_MEMBER_IN_GROUP"
  , "message":"Either the specified user account is already a member of the specified group, or the specified group cannot be deleted because it contains a member."
  }
, "0x00000529":{
    "code":"ERROR_MEMBER_NOT_IN_GROUP"
  , "message":"The specified user account is not a member of the specified group account."
  }
, "0x0000052A":{
    "code":"ERROR_LAST_ADMIN"
  , "message":"The last remaining administration account cannot be disabled or deleted."
  }
, "0x0000052B":{
    "code":"ERROR_WRONG_PASSWORD"
  , "message":"Unable to update the password. The value provided as the current password is incorrect."
  }
, "0x0000052C":{
    "code":"ERROR_ILL_FORMED_PASSWORD"
  , "message":"Unable to update the password. The value provided for the new password contains values that are not allowed in passwords."
  }
, "0x0000052D":{
    "code":"ERROR_PASSWORD_RESTRICTION"
  , "message":"Unable to update the password. The value provided for the new password does not meet the length, complexity, or history requirements of the domain."
  }
, "0x0000052E":{
    "code":"ERROR_LOGON_FAILURE"
  , "message":"Logon failure: Unknown user name or bad password."
  }
, "0x0000052F":{
    "code":"ERROR_ACCOUNT_RESTRICTION"
  , "message":"Logon failure: User account restriction. Possible reasons are blank passwords not allowed, logon hour restrictions, or a policy restriction has been enforced."
  }
, "0x00000530":{
    "code":"ERROR_INVALID_LOGON_HOURS"
  , "message":"Logon failure: Account logon time restriction violation."
  }
, "0x00000531":{
    "code":"ERROR_INVALID_WORKSTATION"
  , "message":"Logon failure: User not allowed to log on to this computer."
  }
, "0x00000532":{
    "code":"ERROR_PASSWORD_EXPIRED"
  , "message":"Logon failure: The specified account password has expired."
  }
, "0x00000533":{
    "code":"ERROR_ACCOUNT_DISABLED"
  , "message":"Logon failure: Account currently disabled."
  }
, "0x00000534":{
    "code":"ERROR_NONE_MAPPED"
  , "message":"No mapping between account names and SIDs was done."
  }
, "0x00000535":{
    "code":"ERROR_TOO_MANY_LUIDS_REQUESTED"
  , "message":"Too many local user identifiers (LUIDs) were requested at one time."
  }
, "0x00000536":{
    "code":"ERROR_LUIDS_EXHAUSTED"
  , "message":"No more LUIDs are available."
  }
, "0x00000537":{
    "code":"ERROR_INVALID_SUB_AUTHORITY"
  , "message":"The sub-authority part of an SID is invalid for this particular use."
  }
, "0x00000538":{
    "code":"ERROR_INVALID_ACL"
  , "message":"The ACL structure is invalid."
  }
, "0x00000539":{
    "code":"ERROR_INVALID_SID"
  , "message":"The SID structure is invalid."
  }
, "0x0000053A":{
    "code":"ERROR_INVALID_SECURITY_DESCR"
  , "message":"The security descriptor structure is invalid."
  }
, "0x0000053C":{
    "code":"ERROR_BAD_INHERITANCE_ACL"
  , "message":"The inherited ACL or ACE could not be built."
  }
, "0x0000053D":{
    "code":"ERROR_SERVER_DISABLED"
  , "message":"The server is currently disabled."
  }
, "0x0000053E":{
    "code":"ERROR_SERVER_NOT_DISABLED"
  , "message":"The server is currently enabled."
  }
, "0x0000053F":{
    "code":"ERROR_INVALID_ID_AUTHORITY"
  , "message":"The value provided was an invalid value for an identifier authority."
  }
, "0x00000540":{
    "code":"ERROR_ALLOTTED_SPACE_EXCEEDED"
  , "message":"No more memory is available for security information updates."
  }
, "0x00000541":{
    "code":"ERROR_INVALID_GROUP_ATTRIBUTES"
  , "message":"The specified attributes are invalid, or incompatible with the attributes for the group as a whole."
  }
, "0x00000542":{
    "code":"ERROR_BAD_IMPERSONATION_LEVEL"
  , "message":"Either a required impersonation level was not provided, or the provided impersonation level is invalid."
  }
, "0x00000543":{
    "code":"ERROR_CANT_OPEN_ANONYMOUS"
  , "message":"Cannot open an anonymous level security token."
  }
, "0x00000544":{
    "code":"ERROR_BAD_VALIDATION_CLASS"
  , "message":"The validation information class requested was invalid."
  }
, "0x00000545":{
    "code":"ERROR_BAD_TOKEN_TYPE"
  , "message":"The type of the token is inappropriate for its attempted use."
  }
, "0x00000546":{
    "code":"ERROR_NO_SECURITY_ON_OBJECT"
  , "message":"Unable to perform a security operation on an object that has no associated security."
  }
, "0x00000547":{
    "code":"ERROR_CANT_ACCESS_DOMAIN_INFO"
  , "message":"Configuration information could not be read from the domain controller, either because the machine is unavailable, or access has been denied."
  }
, "0x00000548":{
    "code":"ERROR_INVALID_SERVER_STATE"
  , "message":"The SAM or local security authority (LSA) server was in the wrong state to perform the security operation."
  }
, "0x00000549":{
    "code":"ERROR_INVALID_DOMAIN_STATE"
  , "message":"The domain was in the wrong state to perform the security operation."
  }
, "0x0000054A":{
    "code":"ERROR_INVALID_DOMAIN_ROLE"
  , "message":"This operation is only allowed for the PDC of the domain."
  }
, "0x0000054B":{
    "code":"ERROR_NO_SUCH_DOMAIN"
  , "message":"The specified domain either does not exist or could not be contacted."
  }
, "0x0000054C":{
    "code":"ERROR_DOMAIN_EXISTS"
  , "message":"The specified domain already exists."
  }
, "0x0000054D":{
    "code":"ERROR_DOMAIN_LIMIT_EXCEEDED"
  , "message":"An attempt was made to exceed the limit on the number of domains per server."
  }
, "0x0000054E":{
    "code":"ERROR_INTERNAL_DB_CORRUPTION"
  , "message":"Unable to complete the requested operation because of either a catastrophic media failure or a data structure corruption on the disk."
  }
, "0x0000054F":{
    "code":"ERROR_INTERNAL_ERROR"
  , "message":"An internal error occurred."
  }
, "0x00000550":{
    "code":"ERROR_GENERIC_NOT_MAPPED"
  , "message":"Generic access types were contained in an access mask that should already be mapped to nongeneric types."
  }
, "0x00000551":{
    "code":"ERROR_BAD_DESCRIPTOR_FORMAT"
  , "message":"A security descriptor is not in the right format (absolute or self-relative)."
  }
, "0x00000552":{
    "code":"ERROR_NOT_LOGON_PROCESS"
  , "message":"The requested action is restricted for use by logon processes only. The calling process has not registered as a logon process."
  }
, "0x00000553":{
    "code":"ERROR_LOGON_SESSION_EXISTS"
  , "message":"Cannot start a new logon session with an ID that is already in use."
  }
, "0x00000554":{
    "code":"ERROR_NO_SUCH_PACKAGE"
  , "message":"A specified authentication package is unknown."
  }
, "0x00000555":{
    "code":"ERROR_BAD_LOGON_SESSION_STATE"
  , "message":"The logon session is not in a state that is consistent with the requested operation."
  }
, "0x00000556":{
    "code":"ERROR_LOGON_SESSION_COLLISION"
  , "message":"The logon session ID is already in use."
  }
, "0x00000557":{
    "code":"ERROR_INVALID_LOGON_TYPE"
  , "message":"A logon request contained an invalid logon type value."
  }
, "0x00000558":{
    "code":"ERROR_CANNOT_IMPERSONATE"
  , "message":"Unable to impersonate using a named pipe until data has been read from that pipe."
  }
, "0x00000559":{
    "code":"ERROR_RXACT_INVALID_STATE"
  , "message":"The transaction state of a registry subtree is incompatible with the requested operation."
  }
, "0x0000055A":{
    "code":"ERROR_RXACT_COMMIT_FAILURE"
  , "message":"An internal security database corruption has been encountered."
  }
, "0x0000055B":{
    "code":"ERROR_SPECIAL_ACCOUNT"
  , "message":"Cannot perform this operation on built-in accounts."
  }
, "0x0000055C":{
    "code":"ERROR_SPECIAL_GROUP"
  , "message":"Cannot perform this operation on this built-in special group."
  }
, "0x0000055D":{
    "code":"ERROR_SPECIAL_USER"
  , "message":"Cannot perform this operation on this built-in special user."
  }
, "0x0000055E":{
    "code":"ERROR_MEMBERS_PRIMARY_GROUP"
  , "message":"The user cannot be removed from a group because the group is currently the user\'s primary group."
  }
, "0x0000055F":{
    "code":"ERROR_TOKEN_ALREADY_IN_USE"
  , "message":"The token is already in use as a primary token."
  }
, "0x00000560":{
    "code":"ERROR_NO_SUCH_ALIAS"
  , "message":"The specified local group does not exist."
  }
, "0x00000561":{
    "code":"ERROR_MEMBER_NOT_IN_ALIAS"
  , "message":"The specified account name is not a member of the group."
  }
, "0x00000562":{
    "code":"ERROR_MEMBER_IN_ALIAS"
  , "message":"The specified account name is already a member of the group."
  }
, "0x00000563":{
    "code":"ERROR_ALIAS_EXISTS"
  , "message":"The specified local group already exists."
  }
, "0x00000564":{
    "code":"ERROR_LOGON_NOT_GRANTED"
  , "message":"Logon failure: The user has not been granted the requested logon type at this computer."
  }
, "0x00000565":{
    "code":"ERROR_TOO_MANY_SECRETS"
  , "message":"The maximum number of secrets that may be stored in a single system has been exceeded."
  }
, "0x00000566":{
    "code":"ERROR_SECRET_TOO_LONG"
  , "message":"The length of a secret exceeds the maximum length allowed."
  }
, "0x00000567":{
    "code":"ERROR_INTERNAL_DB_ERROR"
  , "message":"The local security authority database contains an internal inconsistency."
  }
, "0x00000568":{
    "code":"ERROR_TOO_MANY_CONTEXT_IDS"
  , "message":"During a logon attempt, the user\'s security context accumulated too many SIDs."
  }
, "0x00000569":{
    "code":"ERROR_LOGON_TYPE_NOT_GRANTED"
  , "message":"Logon failure: The user has not been granted the requested logon type at this computer."
  }
, "0x0000056A":{
    "code":"ERROR_NT_CROSS_ENCRYPTION_REQUIRED"
  , "message":"A cross-encrypted password is necessary to change a user password."
  }
, "0x0000056B":{
    "code":"ERROR_NO_SUCH_MEMBER"
  , "message":"A member could not be added to or removed from the local group because the member does not exist."
  }
, "0x0000056C":{
    "code":"ERROR_INVALID_MEMBER"
  , "message":"A new member could not be added to a local group because the member has the wrong account type."
  }
, "0x0000056D":{
    "code":"ERROR_TOO_MANY_SIDS"
  , "message":"Too many SIDs have been specified."
  }
, "0x0000056E":{
    "code":"ERROR_LM_CROSS_ENCRYPTION_REQUIRED"
  , "message":"A cross-encrypted password is necessary to change this user password."
  }
, "0x0000056F":{
    "code":"ERROR_NO_INHERITANCE"
  , "message":"Indicates an ACL contains no inheritable components."
  }
, "0x00000570":{
    "code":"ERROR_FILE_CORRUPT"
  , "message":"The file or directory is corrupted and unreadable."
  }
, "0x00000571":{
    "code":"ERROR_DISK_CORRUPT"
  , "message":"The disk structure is corrupted and unreadable."
  }
, "0x00000572":{
    "code":"ERROR_NO_USER_SESSION_KEY"
  , "message":"There is no user session key for the specified logon session."
  }
, "0x00000573":{
    "code":"ERROR_LICENSE_QUOTA_EXCEEDED"
  , "message":"The service being accessed is licensed for a particular number of connections. No more connections can be made to the service at this time because the service has accepted the maximum number of connections."
  }
, "0x00000574":{
    "code":"ERROR_WRONG_TARGET_NAME"
  , "message":"Logon failure: The target account name is incorrect."
  }
, "0x00000575":{
    "code":"ERROR_MUTUAL_AUTH_FAILED"
  , "message":"Mutual authentication failed. The server\'s password is out of date at the domain controller."
  }
, "0x00000576":{
    "code":"ERROR_TIME_SKEW"
  , "message":"There is a time and/or date difference between the client and server."
  }
, "0x00000577":{
    "code":"ERROR_CURRENT_DOMAIN_NOT_ALLOWED"
  , "message":"This operation cannot be performed on the current domain."
  }
, "0x00000578":{
    "code":"ERROR_INVALID_WINDOW_HANDLE"
  , "message":"Invalid window handle."
  }
, "0x00000579":{
    "code":"ERROR_INVALID_MENU_HANDLE"
  , "message":"Invalid menu handle."
  }
, "0x0000057A":{
    "code":"ERROR_INVALID_CURSOR_HANDLE"
  , "message":"Invalid cursor handle."
  }
, "0x0000057B":{
    "code":"ERROR_INVALID_ACCEL_HANDLE"
  , "message":"Invalid accelerator table handle."
  }
, "0x0000057C":{
    "code":"ERROR_INVALID_HOOK_HANDLE"
  , "message":"Invalid hook handle."
  }
, "0x0000057D":{
    "code":"ERROR_INVALID_DWP_HANDLE"
  , "message":"Invalid handle to a multiple-window position structure."
  }
, "0x0000057E":{
    "code":"ERROR_TLW_WITH_WSCHILD"
  , "message":"Cannot create a top-level child window."
  }
, "0x0000057F":{
    "code":"ERROR_CANNOT_FIND_WND_CLASS"
  , "message":"Cannot find window class."
  }
, "0x00000580":{
    "code":"ERROR_WINDOW_OF_OTHER_THREAD"
  , "message":"Invalid window; it belongs to other thread."
  }
, "0x00000581":{
    "code":"ERROR_HOTKEY_ALREADY_REGISTERED"
  , "message":"Hot key is already registered."
  }
, "0x00000582":{
    "code":"ERROR_CLASS_ALREADY_EXISTS"
  , "message":"Class already exists."
  }
, "0x00000583":{
    "code":"ERROR_CLASS_DOES_NOT_EXIST"
  , "message":"Class does not exist."
  }
, "0x00000584":{
    "code":"ERROR_CLASS_HAS_WINDOWS"
  , "message":"Class still has open windows."
  }
, "0x00000585":{
    "code":"ERROR_INVALID_INDEX"
  , "message":"Invalid index."
  }
, "0x00000586":{
    "code":"ERROR_INVALID_ICON_HANDLE"
  , "message":"Invalid icon handle."
  }
, "0x00000587":{
    "code":"ERROR_PRIVATE_DIALOG_INDEX"
  , "message":"Using private DIALOG window words."
  }
, "0x00000588":{
    "code":"ERROR_LISTBOX_ID_NOT_FOUND"
  , "message":"The list box identifier was not found."
  }
, "0x00000589":{
    "code":"ERROR_NO_WILDCARD_CHARACTERS"
  , "message":"No wildcards were found."
  }
, "0x0000058A":{
    "code":"ERROR_CLIPBOARD_NOT_OPEN"
  , "message":"Thread does not have a clipboard open."
  }
, "0x0000058B":{
    "code":"ERROR_HOTKEY_NOT_REGISTERED"
  , "message":"Hot key is not registered."
  }
, "0x0000058C":{
    "code":"ERROR_WINDOW_NOT_DIALOG"
  , "message":"The window is not a valid dialog window."
  }
, "0x0000058D":{
    "code":"ERROR_CONTROL_ID_NOT_FOUND"
  , "message":"Control ID not found."
  }
, "0x0000058E":{
    "code":"ERROR_INVALID_COMBOBOX_MESSAGE"
  , "message":"Invalid message for a combo box because it does not have an edit control."
  }
, "0x0000058F":{
    "code":"ERROR_WINDOW_NOT_COMBOBOX"
  , "message":"The window is not a combo box."
  }
, "0x00000590":{
    "code":"ERROR_INVALID_EDIT_HEIGHT"
  , "message":"Height must be less than 256."
  }
, "0x00000591":{
    "code":"ERROR_DC_NOT_FOUND"
  , "message":"Invalid device context (DC) handle."
  }
, "0x00000592":{
    "code":"ERROR_INVALID_HOOK_FILTER"
  , "message":"Invalid hook procedure type."
  }
, "0x00000593":{
    "code":"ERROR_INVALID_FILTER_PROC"
  , "message":"Invalid hook procedure."
  }
, "0x00000594":{
    "code":"ERROR_HOOK_NEEDS_HMOD"
  , "message":"Cannot set nonlocal hook without a module handle."
  }
, "0x00000595":{
    "code":"ERROR_GLOBAL_ONLY_HOOK"
  , "message":"This hook procedure can only be set globally."
  }
, "0x00000596":{
    "code":"ERROR_JOURNAL_HOOK_SET"
  , "message":"The journal hook procedure is already installed."
  }
, "0x00000597":{
    "code":"ERROR_HOOK_NOT_INSTALLED"
  , "message":"The hook procedure is not installed."
  }
, "0x00000598":{
    "code":"ERROR_INVALID_LB_MESSAGE"
  , "message":"Invalid message for single-selection list box."
  }
, "0x00000599":{
    "code":"ERROR_SETCOUNT_ON_BAD_LB"
  , "message":"LB_SETCOUNT sent to non-lazy list box."
  }
, "0x0000059A":{
    "code":"ERROR_LB_WITHOUT_TABSTOPS"
  , "message":"This list box does not support tab stops."
  }
, "0x0000059B":{
    "code":"ERROR_DESTROY_OBJECT_OF_OTHER_THREAD"
  , "message":"Cannot destroy object created by another thread."
  }
, "0x0000059C":{
    "code":"ERROR_CHILD_WINDOW_MENU"
  , "message":"Child windows cannot have menus."
  }
, "0x0000059D":{
    "code":"ERROR_NO_SYSTEM_MENU"
  , "message":"The window does not have a system menu."
  }
, "0x0000059E":{
    "code":"ERROR_INVALID_MSGBOX_STYLE"
  , "message":"Invalid message box style."
  }
, "0x0000059F":{
    "code":"ERROR_INVALID_SPI_VALUE"
  , "message":"Invalid system-wide (SPI_*) parameter."
  }
, "0x000005A0":{
    "code":"ERROR_SCREEN_ALREADY_LOCKED"
  , "message":"Screen already locked."
  }
, "0x000005A1":{
    "code":"ERROR_HWNDS_HAVE_DIFF_PARENT"
  , "message":"All handles to windows in a multiple-window position structure must have the same parent."
  }
, "0x000005A2":{
    "code":"ERROR_NOT_CHILD_WINDOW"
  , "message":"The window is not a child window."
  }
, "0x000005A3":{
    "code":"ERROR_INVALID_GW_COMMAND"
  , "message":"Invalid GW_* command."
  }
, "0x000005A4":{
    "code":"ERROR_INVALID_THREAD_ID"
  , "message":"Invalid thread identifier."
  }
, "0x000005A5":{
    "code":"ERROR_NON_MDICHILD_WINDOW"
  , "message":"Cannot process a message from a window that is not a multiple document interface (MDI) window."
  }
, "0x000005A6":{
    "code":"ERROR_POPUP_ALREADY_ACTIVE"
  , "message":"Pop-up menu already active."
  }
, "0x000005A7":{
    "code":"ERROR_NO_SCROLLBARS"
  , "message":"The window does not have scroll bars."
  }
, "0x000005A8":{
    "code":"ERROR_INVALID_SCROLLBAR_RANGE"
  , "message":"Scroll bar range cannot be greater than MAXLONG."
  }
, "0x000005A9":{
    "code":"ERROR_INVALID_SHOWWIN_COMMAND"
  , "message":"Cannot show or remove the window in the way specified."
  }
, "0x000005AA":{
    "code":"ERROR_NO_SYSTEM_RESOURCES"
  , "message":"Insufficient system resources exist to complete the requested service."
  }
, "0x000005AB":{
    "code":"ERROR_NONPAGED_SYSTEM_RESOURCES"
  , "message":"Insufficient system resources exist to complete the requested service."
  }
, "0x000005AC":{
    "code":"ERROR_PAGED_SYSTEM_RESOURCES"
  , "message":"Insufficient system resources exist to complete the requested service."
  }
, "0x000005AD":{
    "code":"ERROR_WORKING_SET_QUOTA"
  , "message":"Insufficient quota to complete the requested service."
  }
, "0x000005AE":{
    "code":"ERROR_PAGEFILE_QUOTA"
  , "message":"Insufficient quota to complete the requested service."
  }
, "0x000005AF":{
    "code":"ERROR_COMMITMENT_LIMIT"
  , "message":"The paging file is too small for this operation to complete."
  }
, "0x000005B0":{
    "code":"ERROR_MENU_ITEM_NOT_FOUND"
  , "message":"A menu item was not found."
  }
, "0x000005B1":{
    "code":"ERROR_INVALID_KEYBOARD_HANDLE"
  , "message":"Invalid keyboard layout handle."
  }
, "0x000005B2":{
    "code":"ERROR_HOOK_TYPE_NOT_ALLOWED"
  , "message":"Hook type not allowed."
  }
, "0x000005B3":{
    "code":"ERROR_REQUIRES_INTERACTIVE_WINDOWSTATION"
  , "message":"This operation requires an interactive window station."
  }
, "0x000005B4":{
    "code":"ERROR_TIMEOUT"
  , "message":"This operation returned because the time-out period expired."
  }
, "0x000005B5":{
    "code":"ERROR_INVALID_MONITOR_HANDLE"
  , "message":"Invalid monitor handle."
  }
, "0x000005B6":{
    "code":"ERROR_INCORRECT_SIZE"
  , "message":"Incorrect size argument."
  }
, "0x000005B7":{
    "code":"ERROR_SYMLINK_CLASS_DISABLED"
  , "message":"The symbolic link cannot be followed because its type is disabled."
  }
, "0x000005B8":{
    "code":"ERROR_SYMLINK_NOT_SUPPORTED"
  , "message":"This application does not support the current operation on symbolic links."
  }
, "0x000005DC":{
    "code":"ERROR_EVENTLOG_FILE_CORRUPT"
  , "message":"The event log file is corrupted."
  }
, "0x000005DD":{
    "code":"ERROR_EVENTLOG_CANT_START"
  , "message":"No event log file could be opened, so the event logging service did not start."
  }
, "0x000005DE":{
    "code":"ERROR_LOG_FILE_FULL"
  , "message":"The event log file is full."
  }
, "0x000005DF":{
    "code":"ERROR_EVENTLOG_FILE_CHANGED"
  , "message":"The event log file has changed between read operations."
  }
, "0x0000060E":{
    "code":"ERROR_INVALID_TASK_NAME"
  , "message":"The specified task name is invalid."
  }
, "0x0000060F":{
    "code":"ERROR_INVALID_TASK_INDEX"
  , "message":"The specified task index is invalid."
  }
, "0x00000610":{
    "code":"ERROR_THREAD_ALREADY_IN_TASK"
  , "message":"The specified thread is already joining a task."
  }
, "0x00000641":{
    "code":"ERROR_INSTALL_SERVICE_FAILURE"
  , "message":"The Windows Installer service could not be accessed. This can occur if the Windows Installer is not correctly installed. Contact your support personnel for assistance."
  }
, "0x00000642":{
    "code":"ERROR_INSTALL_USEREXIT"
  , "message":"User canceled installation."
  }
, "0x00000643":{
    "code":"ERROR_INSTALL_FAILURE"
  , "message":"Fatal error during installation."
  }
, "0x00000644":{
    "code":"ERROR_INSTALL_SUSPEND"
  , "message":"Installation suspended, incomplete."
  }
, "0x00000645":{
    "code":"ERROR_UNKNOWN_PRODUCT"
  , "message":"This action is valid only for products that are currently installed."
  }
, "0x00000646":{
    "code":"ERROR_UNKNOWN_FEATURE"
  , "message":"Feature ID not registered."
  }
, "0x00000647":{
    "code":"ERROR_UNKNOWN_COMPONENT"
  , "message":"Component ID not registered."
  }
, "0x00000648":{
    "code":"ERROR_UNKNOWN_PROPERTY"
  , "message":"Unknown property."
  }
, "0x00000649":{
    "code":"ERROR_INVALID_HANDLE_STATE"
  , "message":"Handle is in an invalid state."
  }
, "0x0000064A":{
    "code":"ERROR_BAD_CONFIGURATION"
  , "message":"The configuration data for this product is corrupt. Contact your support personnel."
  }
, "0x0000064B":{
    "code":"ERROR_INDEX_ABSENT"
  , "message":"Component qualifier not present."
  }
, "0x0000064C":{
    "code":"ERROR_INSTALL_SOURCE_ABSENT"
  , "message":"The installation source for this product is not available. Verify that the source exists and that you can access it."
  }
, "0x0000064D":{
    "code":"ERROR_INSTALL_PACKAGE_VERSION"
  , "message":"This installation package cannot be installed by the Windows Installer service. You must install a Windows service pack that contains a newer version of the Windows Installer service."
  }
, "0x0000064E":{
    "code":"ERROR_PRODUCT_UNINSTALLED"
  , "message":"Product is uninstalled."
  }
, "0x0000064F":{
    "code":"ERROR_BAD_QUERY_SYNTAX"
  , "message":"SQL query syntax invalid or unsupported."
  }
, "0x00000650":{
    "code":"ERROR_INVALID_FIELD"
  , "message":"Record field does not exist."
  }
, "0x00000651":{
    "code":"ERROR_DEVICE_REMOVED"
  , "message":"The device has been removed."
  }
, "0x00000652":{
    "code":"ERROR_INSTALL_ALREADY_RUNNING"
  , "message":"Another installation is already in progress. Complete that installation before proceeding with this install."
  }
, "0x00000653":{
    "code":"ERROR_INSTALL_PACKAGE_OPEN_FAILED"
  , "message":"This installation package could not be opened. Verify that the package exists and that you can access it, or contact the application vendor to verify that this is a valid Windows Installer package."
  }
, "0x00000654":{
    "code":"ERROR_INSTALL_PACKAGE_INVALID"
  , "message":"This installation package could not be opened. Contact the application vendor to verify that this is a valid Windows Installer package."
  }
, "0x00000655":{
    "code":"ERROR_INSTALL_UI_FAILURE"
  , "message":"There was an error starting the Windows Installer service user interface. Contact your support personnel."
  }
, "0x00000656":{
    "code":"ERROR_INSTALL_LOG_FAILURE"
  , "message":"Error opening installation log file. Verify that the specified log file location exists and that you can write to it."
  }
, "0x00000657":{
    "code":"ERROR_INSTALL_LANGUAGE_UNSUPPORTED"
  , "message":"The language of this installation package is not supported by your system."
  }
, "0x00000658":{
    "code":"ERROR_INSTALL_TRANSFORM_FAILURE"
  , "message":"Error applying transforms. Verify that the specified transform paths are valid."
  }
, "0x00000659":{
    "code":"ERROR_INSTALL_PACKAGE_REJECTED"
  , "message":"This installation is forbidden by system policy. Contact your system administrator."
  }
, "0x0000065A":{
    "code":"ERROR_FUNCTION_NOT_CALLED"
  , "message":"Function could not be executed."
  }
, "0x0000065B":{
    "code":"ERROR_FUNCTION_FAILED"
  , "message":"Function failed during execution."
  }
, "0x0000065C":{
    "code":"ERROR_INVALID_TABLE"
  , "message":"Invalid or unknown table specified."
  }
, "0x0000065D":{
    "code":"ERROR_DATATYPE_MISMATCH"
  , "message":"Data supplied is of wrong type."
  }
, "0x0000065E":{
    "code":"ERROR_UNSUPPORTED_TYPE"
  , "message":"Data of this type is not supported."
  }
, "0x0000065F":{
    "code":"ERROR_CREATE_FAILED"
  , "message":"The Windows Installer service failed to start. Contact your support personnel."
  }
, "0x00000660":{
    "code":"ERROR_INSTALL_TEMP_UNWRITABLE"
  , "message":"The Temp folder is on a drive that is full or is inaccessible. Free up space on the drive or verify that you have write permission on the Temp folder."
  }
, "0x00000661":{
    "code":"ERROR_INSTALL_PLATFORM_UNSUPPORTED"
  , "message":"This installation package is not supported by this processor type. Contact your product vendor."
  }
, "0x00000662":{
    "code":"ERROR_INSTALL_NOTUSED"
  , "message":"Component not used on this computer."
  }
, "0x00000663":{
    "code":"ERROR_PATCH_PACKAGE_OPEN_FAILED"
  , "message":"This update package could not be opened. Verify that the update package exists and that you can access it, or contact the application vendor to verify that this is a valid Windows Installer update package."
  }
, "0x00000664":{
    "code":"ERROR_PATCH_PACKAGE_INVALID"
  , "message":"This update package could not be opened. Contact the application vendor to verify that this is a valid Windows Installer update package."
  }
, "0x00000665":{
    "code":"ERROR_PATCH_PACKAGE_UNSUPPORTED"
  , "message":"This update package cannot be processed by the Windows Installer service. You must install a Windows service pack that contains a newer version of the Windows Installer service."
  }
, "0x00000666":{
    "code":"ERROR_PRODUCT_VERSION"
  , "message":"Another version of this product is already installed. Installation of this version cannot continue. To configure or remove the existing version of this product, use Add/Remove Programs in Control Panel."
  }
, "0x00000667":{
    "code":"ERROR_INVALID_COMMAND_LINE"
  , "message":"Invalid command-line argument. Consult the Windows Installer SDK for detailed command line help."
  }
, "0x00000668":{
    "code":"ERROR_INSTALL_REMOTE_DISALLOWED"
  , "message":"Only administrators have permission to add, remove, or configure server software during a Terminal Services remote session. If you want to install or configure software on the server, contact your network administrator."
  }
, "0x00000669":{
    "code":"ERROR_SUCCESS_REBOOT_INITIATED"
  , "message":"The requested operation completed successfully. The system will be restarted so the changes can take effect."
  }
, "0x0000066A":{
    "code":"ERROR_PATCH_TARGET_NOT_FOUND"
  , "message":"The upgrade cannot be installed by the Windows Installer service because the program to be upgraded may be missing, or the upgrade may update a different version of the program. Verify that the program to be upgraded exists on your computer and that you have the correct upgrade."
  }
, "0x0000066B":{
    "code":"ERROR_PATCH_PACKAGE_REJECTED"
  , "message":"The update package is not permitted by a software restriction policy."
  }
, "0x0000066C":{
    "code":"ERROR_INSTALL_TRANSFORM_REJECTED"
  , "message":"One or more customizations are not permitted by a software restriction policy."
  }
, "0x0000066D":{
    "code":"ERROR_INSTALL_REMOTE_PROHIBITED"
  , "message":"The Windows Installer does not permit installation from a Remote Desktop Connection."
  }
, "0x0000066E":{
    "code":"ERROR_PATCH_REMOVAL_UNSUPPORTED"
  , "message":"Uninstallation of the update package is not supported."
  }
, "0x0000066F":{
    "code":"ERROR_UNKNOWN_PATCH"
  , "message":"The update is not applied to this product."
  }
, "0x00000670":{
    "code":"ERROR_PATCH_NO_SEQUENCE"
  , "message":"No valid sequence could be found for the set of updates."
  }
, "0x00000671":{
    "code":"ERROR_PATCH_REMOVAL_DISALLOWED"
  , "message":"Update removal was disallowed by policy."
  }
, "0x00000672":{
    "code":"ERROR_INVALID_PATCH_XML"
  , "message":"The XML update data is invalid."
  }
, "0x00000673":{
    "code":"ERROR_PATCH_MANAGED_ADVERTISED_PRODUCT"
  , "message":"Windows Installer does not permit updating of managed advertised products. At least one feature of the product must be installed before applying the update."
  }
, "0x00000674":{
    "code":"ERROR_INSTALL_SERVICE_SAFEBOOT"
  , "message":"The Windows Installer service is not accessible in Safe Mode. Try again when your computer is not in Safe Mode or you can use System Restore to return your machine to a previous good state."
  }
, "0x000006A4":{
    "code":"RPC_S_INVALID_STRING_BINDING"
  , "message":"The string binding is invalid."
  }
, "0x000006A5":{
    "code":"RPC_S_WRONG_KIND_OF_BINDING"
  , "message":"The binding handle is not the correct type."
  }
, "0x000006A6":{
    "code":"RPC_S_INVALID_BINDING"
  , "message":"The binding handle is invalid."
  }
, "0x000006A7":{
    "code":"RPC_S_PROTSEQ_NOT_SUPPORTED"
  , "message":"The RPC protocol sequence is not supported."
  }
, "0x000006A8":{
    "code":"RPC_S_INVALID_RPC_PROTSEQ"
  , "message":"The RPC protocol sequence is invalid."
  }
, "0x000006A9":{
    "code":"RPC_S_INVALID_STRING_UUID"
  , "message":"The string UUID is invalid."
  }
, "0x000006AA":{
    "code":"RPC_S_INVALID_ENDPOINT_FORMAT"
  , "message":"The endpoint format is invalid."
  }
, "0x000006AB":{
    "code":"RPC_S_INVALID_NET_ADDR"
  , "message":"The network address is invalid."
  }
, "0x000006AC":{
    "code":"RPC_S_NO_ENDPOINT_FOUND"
  , "message":"No endpoint was found."
  }
, "0x000006AD":{
    "code":"RPC_S_INVALID_TIMEOUT"
  , "message":"The time-out value is invalid."
  }
, "0x000006AE":{
    "code":"RPC_S_OBJECT_NOT_FOUND"
  , "message":"The object UUID) was not found."
  }
, "0x000006AF":{
    "code":"RPC_S_ALREADY_REGISTERED"
  , "message":"The object UUID) has already been registered."
  }
, "0x000006B0":{
    "code":"RPC_S_TYPE_ALREADY_REGISTERED"
  , "message":"The type UUID has already been registered."
  }
, "0x000006B1":{
    "code":"RPC_S_ALREADY_LISTENING"
  , "message":"The RPC server is already listening."
  }
, "0x000006B2":{
    "code":"RPC_S_NO_PROTSEQS_REGISTERED"
  , "message":"No protocol sequences have been registered."
  }
, "0x000006B3":{
    "code":"RPC_S_NOT_LISTENING"
  , "message":"The RPC server is not listening."
  }
, "0x000006B4":{
    "code":"RPC_S_UNKNOWN_MGR_TYPE"
  , "message":"The manager type is unknown."
  }
, "0x000006B5":{
    "code":"RPC_S_UNKNOWN_IF"
  , "message":"The interface is unknown."
  }
, "0x000006B6":{
    "code":"RPC_S_NO_BINDINGS"
  , "message":"There are no bindings."
  }
, "0x000006B7":{
    "code":"RPC_S_NO_PROTSEQS"
  , "message":"There are no protocol sequences."
  }
, "0x000006B8":{
    "code":"RPC_S_CANT_CREATE_ENDPOINT"
  , "message":"The endpoint cannot be created."
  }
, "0x000006B9":{
    "code":"RPC_S_OUT_OF_RESOURCES"
  , "message":"Not enough resources are available to complete this operation."
  }
, "0x000006BA":{
    "code":"RPC_S_SERVER_UNAVAILABLE"
  , "message":"The RPC server is unavailable."
  }
, "0x000006BB":{
    "code":"RPC_S_SERVER_TOO_BUSY"
  , "message":"The RPC server is too busy to complete this operation."
  }
, "0x000006BC":{
    "code":"RPC_S_INVALID_NETWORK_OPTIONS"
  , "message":"The network options are invalid."
  }
, "0x000006BD":{
    "code":"RPC_S_NO_CALL_ACTIVE"
  , "message":"There are no RPCs active on this thread."
  }
, "0x000006BE":{
    "code":"RPC_S_CALL_FAILED"
  , "message":"The RPC failed."
  }
, "0x000006BF":{
    "code":"RPC_S_CALL_FAILED_DNE"
  , "message":"The RPC failed and did not execute."
  }
, "0x000006C0":{
    "code":"RPC_S_PROTOCOL_ERROR"
  , "message":"An RPC protocol error occurred."
  }
, "0x000006C1":{
    "code":"RPC_S_PROXY_ACCESS_DENIED"
  , "message":"Access to the HTTP proxy is denied."
  }
, "0x000006C2":{
    "code":"RPC_S_UNSUPPORTED_TRANS_SYN"
  , "message":"The transfer syntax is not supported by the RPC server."
  }
, "0x000006C4":{
    "code":"RPC_S_UNSUPPORTED_TYPE"
  , "message":"The UUID type is not supported."
  }
, "0x000006C5":{
    "code":"RPC_S_INVALID_TAG"
  , "message":"The tag is invalid."
  }
, "0x000006C6":{
    "code":"RPC_S_INVALID_BOUND"
  , "message":"The array bounds are invalid."
  }
, "0x000006C7":{
    "code":"RPC_S_NO_ENTRY_NAME"
  , "message":"The binding does not contain an entry name."
  }
, "0x000006C8":{
    "code":"RPC_S_INVALID_NAME_SYNTAX"
  , "message":"The name syntax is invalid."
  }
, "0x000006C9":{
    "code":"RPC_S_UNSUPPORTED_NAME_SYNTAX"
  , "message":"The name syntax is not supported."
  }
, "0x000006CB":{
    "code":"RPC_S_UUID_NO_ADDRESS"
  , "message":"No network address is available to use to construct a UUID."
  }
, "0x000006CC":{
    "code":"RPC_S_DUPLICATE_ENDPOINT"
  , "message":"The endpoint is a duplicate."
  }
, "0x000006CD":{
    "code":"RPC_S_UNKNOWN_AUTHN_TYPE"
  , "message":"The authentication type is unknown."
  }
, "0x000006CE":{
    "code":"RPC_S_MAX_CALLS_TOO_SMALL"
  , "message":"The maximum number of calls is too small."
  }
, "0x000006CF":{
    "code":"RPC_S_STRING_TOO_LONG"
  , "message":"The string is too long."
  }
, "0x000006D0":{
    "code":"RPC_S_PROTSEQ_NOT_FOUND"
  , "message":"The RPC protocol sequence was not found."
  }
, "0x000006D1":{
    "code":"RPC_S_PROCNUM_OUT_OF_RANGE"
  , "message":"The procedure number is out of range."
  }
, "0x000006D2":{
    "code":"RPC_S_BINDING_HAS_NO_AUTH"
  , "message":"The binding does not contain any authentication information."
  }
, "0x000006D3":{
    "code":"RPC_S_UNKNOWN_AUTHN_SERVICE"
  , "message":"The authentication service is unknown."
  }
, "0x000006D4":{
    "code":"RPC_S_UNKNOWN_AUTHN_LEVEL"
  , "message":"The authentication level is unknown."
  }
, "0x000006D5":{
    "code":"RPC_S_INVALID_AUTH_IDENTITY"
  , "message":"The security context is invalid."
  }
, "0x000006D6":{
    "code":"RPC_S_UNKNOWN_AUTHZ_SERVICE"
  , "message":"The authorization service is unknown."
  }
, "0x000006D7":{
    "code":"EPT_S_INVALID_ENTRY"
  , "message":"The entry is invalid."
  }
, "0x000006D8":{
    "code":"EPT_S_CANT_PERFORM_OP"
  , "message":"The server endpoint cannot perform the operation."
  }
, "0x000006D9":{
    "code":"EPT_S_NOT_REGISTERED"
  , "message":"There are no more endpoints available from the endpoint mapper."
  }
, "0x000006DA":{
    "code":"RPC_S_NOTHING_TO_EXPORT"
  , "message":"No interfaces have been exported."
  }
, "0x000006DB":{
    "code":"RPC_S_INCOMPLETE_NAME"
  , "message":"The entry name is incomplete."
  }
, "0x000006DC":{
    "code":"RPC_S_INVALID_VERS_OPTION"
  , "message":"The version option is invalid."
  }
, "0x000006DD":{
    "code":"RPC_S_NO_MORE_MEMBERS"
  , "message":"There are no more members."
  }
, "0x000006DE":{
    "code":"RPC_S_NOT_ALL_OBJS_UNEXPORTED"
  , "message":"There is nothing to unexport."
  }
, "0x000006DF":{
    "code":"RPC_S_INTERFACE_NOT_FOUND"
  , "message":"The interface was not found."
  }
, "0x000006E0":{
    "code":"RPC_S_ENTRY_ALREADY_EXISTS"
  , "message":"The entry already exists."
  }
, "0x000006E1":{
    "code":"RPC_S_ENTRY_NOT_FOUND"
  , "message":"The entry is not found."
  }
, "0x000006E2":{
    "code":"RPC_S_NAME_SERVICE_UNAVAILABLE"
  , "message":"The name service is unavailable."
  }
, "0x000006E3":{
    "code":"RPC_S_INVALID_NAF_ID"
  , "message":"The network address family is invalid."
  }
, "0x000006E4":{
    "code":"RPC_S_CANNOT_SUPPORT"
  , "message":"The requested operation is not supported."
  }
, "0x000006E5":{
    "code":"RPC_S_NO_CONTEXT_AVAILABLE"
  , "message":"No security context is available to allow impersonation."
  }
, "0x000006E6":{
    "code":"RPC_S_INTERNAL_ERROR"
  , "message":"An internal error occurred in an RPC."
  }
, "0x000006E7":{
    "code":"RPC_S_ZERO_DIVIDE"
  , "message":"The RPC server attempted an integer division by zero."
  }
, "0x000006E8":{
    "code":"RPC_S_ADDRESS_ERROR"
  , "message":"An addressing error occurred in the RPC server."
  }
, "0x000006E9":{
    "code":"RPC_S_FP_DIV_ZERO"
  , "message":"A floating-point operation at the RPC server caused a division by zero."
  }
, "0x000006EA":{
    "code":"RPC_S_FP_UNDERFLOW"
  , "message":"A floating-point underflow occurred at the RPC server."
  }
, "0x000006EB":{
    "code":"RPC_S_FP_OVERFLOW"
  , "message":"A floating-point overflow occurred at the RPC server."
  }
, "0x000006EC":{
    "code":"RPC_X_NO_MORE_ENTRIES"
  , "message":"The list of RPC servers available for the binding of auto handles has been exhausted."
  }
, "0x000006ED":{
    "code":"RPC_X_SS_CHAR_TRANS_OPEN_FAIL"
  , "message":"Unable to open the character translation table file."
  }
, "0x000006EE":{
    "code":"RPC_X_SS_CHAR_TRANS_SHORT_FILE"
  , "message":"The file containing the character translation table has fewer than 512 bytes."
  }
, "0x000006EF":{
    "code":"RPC_X_SS_IN_NULL_CONTEXT"
  , "message":"A null context handle was passed from the client to the host during an RPC."
  }
, "0x000006F1":{
    "code":"RPC_X_SS_CONTEXT_DAMAGED"
  , "message":"The context handle changed during an RPC."
  }
, "0x000006F2":{
    "code":"RPC_X_SS_HANDLES_MISMATCH"
  , "message":"The binding handles passed to an RPC do not match."
  }
, "0x000006F3":{
    "code":"RPC_X_SS_CANNOT_GET_CALL_HANDLE"
  , "message":"The stub is unable to get the RPC handle."
  }
, "0x000006F4":{
    "code":"RPC_X_NULL_REF_POINTER"
  , "message":"A null reference pointer was passed to the stub."
  }
, "0x000006F5":{
    "code":"RPC_X_ENUM_VALUE_OUT_OF_RANGE"
  , "message":"The enumeration value is out of range."
  }
, "0x000006F6":{
    "code":"RPC_X_BYTE_COUNT_TOO_SMALL"
  , "message":"The byte count is too small."
  }
, "0x000006F7":{
    "code":"RPC_X_BAD_STUB_DATA"
  , "message":"The stub received bad data."
  }
, "0x000006F8":{
    "code":"ERROR_INVALID_USER_BUFFER"
  , "message":"The supplied user buffer is not valid for the requested operation."
  }
, "0x000006F9":{
    "code":"ERROR_UNRECOGNIZED_MEDIA"
  , "message":"The disk media is not recognized. It may not be formatted."
  }
, "0x000006FA":{
    "code":"ERROR_NO_TRUST_LSA_SECRET"
  , "message":"The workstation does not have a trust secret."
  }
, "0x000006FB":{
    "code":"ERROR_NO_TRUST_SAM_ACCOUNT"
  , "message":"The security database on the server does not have a computer account for this workstation trust relationship."
  }
, "0x000006FC":{
    "code":"ERROR_TRUSTED_DOMAIN_FAILURE"
  , "message":"The trust relationship between the primary domain and the trusted domain failed."
  }
, "0x000006FD":{
    "code":"ERROR_TRUSTED_RELATIONSHIP_FAILURE"
  , "message":"The trust relationship between this workstation and the primary domain failed."
  }
, "0x000006FE":{
    "code":"ERROR_TRUST_FAILURE"
  , "message":"The network logon failed."
  }
, "0x000006FF":{
    "code":"RPC_S_CALL_IN_PROGRESS"
  , "message":"An RPC is already in progress for this thread."
  }
, "0x00000700":{
    "code":"ERROR_NETLOGON_NOT_STARTED"
  , "message":"An attempt was made to log on, but the network logon service was not started."
  }
, "0x00000701":{
    "code":"ERROR_ACCOUNT_EXPIRED"
  , "message":"The user\'s account has expired."
  }
, "0x00000702":{
    "code":"ERROR_REDIRECTOR_HAS_OPEN_HANDLES"
  , "message":"The redirector is in use and cannot be unloaded."
  }
, "0x00000703":{
    "code":"ERROR_PRINTER_DRIVER_ALREADY_INSTALLED"
  , "message":"The specified printer driver is already installed."
  }
, "0x00000704":{
    "code":"ERROR_UNKNOWN_PORT"
  , "message":"The specified port is unknown."
  }
, "0x00000705":{
    "code":"ERROR_UNKNOWN_PRINTER_DRIVER"
  , "message":"The printer driver is unknown."
  }
, "0x00000706":{
    "code":"ERROR_UNKNOWN_PRINTPROCESSOR"
  , "message":"The print processor is unknown."
  }
, "0x00000707":{
    "code":"ERROR_INVALID_SEPARATOR_FILE"
  , "message":"The specified separator file is invalid."
  }
, "0x00000708":{
    "code":"ERROR_INVALID_PRIORITY"
  , "message":"The specified priority is invalid."
  }
, "0x00000709":{
    "code":"ERROR_INVALID_PRINTER_NAME"
  , "message":"The printer name is invalid."
  }
, "0x0000070A":{
    "code":"ERROR_PRINTER_ALREADY_EXISTS"
  , "message":"The printer already exists."
  }
, "0x0000070B":{
    "code":"ERROR_INVALID_PRINTER_COMMAND"
  , "message":"The printer command is invalid."
  }
, "0x0000070C":{
    "code":"ERROR_INVALID_DATATYPE"
  , "message":"The specified data type is invalid."
  }
, "0x0000070D":{
    "code":"ERROR_INVALID_ENVIRONMENT"
  , "message":"The environment specified is invalid."
  }
, "0x0000070E":{
    "code":"RPC_S_NO_MORE_BINDINGS"
  , "message":"There are no more bindings."
  }
, "0x0000070F":{
    "code":"ERROR_NOLOGON_INTERDOMAIN_TRUST_ACCOUNT"
  , "message":"The account used is an interdomain trust account. Use your global user account or local user account to access this server."
  }
, "0x00000710":{
    "code":"ERROR_NOLOGON_WORKSTATION_TRUST_ACCOUNT"
  , "message":"The account used is a computer account. Use your global user account or local user account to access this server."
  }
, "0x00000711":{
    "code":"ERROR_NOLOGON_SERVER_TRUST_ACCOUNT"
  , "message":"The account used is a server trust account. Use your global user account or local user account to access this server."
  }
, "0x00000712":{
    "code":"ERROR_DOMAIN_TRUST_INCONSISTENT"
  , "message":"The name or SID of the domain specified is inconsistent with the trust information for that domain."
  }
, "0x00000713":{
    "code":"ERROR_SERVER_HAS_OPEN_HANDLES"
  , "message":"The server is in use and cannot be unloaded."
  }
, "0x00000714":{
    "code":"ERROR_RESOURCE_DATA_NOT_FOUND"
  , "message":"The specified image file did not contain a resource section."
  }
, "0x00000715":{
    "code":"ERROR_RESOURCE_TYPE_NOT_FOUND"
  , "message":"The specified resource type cannot be found in the image file."
  }
, "0x00000716":{
    "code":"ERROR_RESOURCE_NAME_NOT_FOUND"
  , "message":"The specified resource name cannot be found in the image file."
  }
, "0x00000717":{
    "code":"ERROR_RESOURCE_LANG_NOT_FOUND"
  , "message":"The specified resource language ID cannot be found in the image file."
  }
, "0x00000718":{
    "code":"ERROR_NOT_ENOUGH_QUOTA"
  , "message":"Not enough quota is available to process this command."
  }
, "0x00000719":{
    "code":"RPC_S_NO_INTERFACES"
  , "message":"No interfaces have been registered."
  }
, "0x0000071A":{
    "code":"RPC_S_CALL_CANCELLED"
  , "message":"The RPC was canceled."
  }
, "0x0000071B":{
    "code":"RPC_S_BINDING_INCOMPLETE"
  , "message":"The binding handle does not contain all the required information."
  }
, "0x0000071C":{
    "code":"RPC_S_COMM_FAILURE"
  , "message":"A communications failure occurred during an RPC."
  }
, "0x0000071D":{
    "code":"RPC_S_UNSUPPORTED_AUTHN_LEVEL"
  , "message":"The requested authentication level is not supported."
  }
, "0x0000071E":{
    "code":"RPC_S_NO_PRINC_NAME"
  , "message":"No principal name is registered."
  }
, "0x0000071F":{
    "code":"RPC_S_NOT_RPC_ERROR"
  , "message":"The error specified is not a valid Windows RPC error code."
  }
, "0x00000720":{
    "code":"RPC_S_UUID_LOCAL_ONLY"
  , "message":"A UUID that is valid only on this computer has been allocated."
  }
, "0x00000721":{
    "code":"RPC_S_SEC_PKG_ERROR"
  , "message":"A security package-specific error occurred."
  }
, "0x00000722":{
    "code":"RPC_S_NOT_CANCELLED"
  , "message":"The thread is not canceled."
  }
, "0x00000723":{
    "code":"RPC_X_INVALID_ES_ACTION"
  , "message":"Invalid operation on the encoding/decoding handle."
  }
, "0x00000724":{
    "code":"RPC_X_WRONG_ES_VERSION"
  , "message":"Incompatible version of the serializing package."
  }
, "0x00000725":{
    "code":"RPC_X_WRONG_STUB_VERSION"
  , "message":"Incompatible version of the RPC stub."
  }
, "0x00000726":{
    "code":"RPC_X_INVALID_PIPE_OBJECT"
  , "message":"The RPC pipe object is invalid or corrupted."
  }
, "0x00000727":{
    "code":"RPC_X_WRONG_PIPE_ORDER"
  , "message":"An invalid operation was attempted on an RPC pipe object."
  }
, "0x00000728":{
    "code":"RPC_X_WRONG_PIPE_VERSION"
  , "message":"Unsupported RPC pipe version."
  }
, "0x0000076A":{
    "code":"RPC_S_GROUP_MEMBER_NOT_FOUND"
  , "message":"The group member was not found."
  }
, "0x0000076B":{
    "code":"EPT_S_CANT_CREATE"
  , "message":"The endpoint mapper database entry could not be created."
  }
, "0x0000076C":{
    "code":"RPC_S_INVALID_OBJECT"
  , "message":"The object UUID is the nil UUID."
  }
, "0x0000076D":{
    "code":"ERROR_INVALID_TIME"
  , "message":"The specified time is invalid."
  }
, "0x0000076E":{
    "code":"ERROR_INVALID_FORM_NAME"
  , "message":"The specified form name is invalid."
  }
, "0x0000076F":{
    "code":"ERROR_INVALID_FORM_SIZE"
  , "message":"The specified form size is invalid."
  }
, "0x00000770":{
    "code":"ERROR_ALREADY_WAITING"
  , "message":"The specified printer handle is already being waited on."
  }
, "0x00000771":{
    "code":"ERROR_PRINTER_DELETED"
  , "message":"The specified printer has been deleted."
  }
, "0x00000772":{
    "code":"ERROR_INVALID_PRINTER_STATE"
  , "message":"The state of the printer is invalid."
  }
, "0x00000773":{
    "code":"ERROR_PASSWORD_MUST_CHANGE"
  , "message":"The user\'s password must be changed before logging on the first time."
  }
, "0x00000774":{
    "code":"ERROR_DOMAIN_CONTROLLER_NOT_FOUND"
  , "message":"Could not find the domain controller for this domain."
  }
, "0x00000775":{
    "code":"ERROR_ACCOUNT_LOCKED_OUT"
  , "message":"The referenced account is currently locked out and may not be logged on to."
  }
, "0x00000776":{
    "code":"OR_INVALID_OXID"
  , "message":"The object exporter specified was not found."
  }
, "0x00000777":{
    "code":"OR_INVALID_OID"
  , "message":"The object specified was not found."
  }
, "0x00000778":{
    "code":"OR_INVALID_SET"
  , "message":"The object set specified was not found."
  }
, "0x00000779":{
    "code":"RPC_S_SEND_INCOMPLETE"
  , "message":"Some data remains to be sent in the request buffer."
  }
, "0x0000077A":{
    "code":"RPC_S_INVALID_ASYNC_HANDLE"
  , "message":"Invalid asynchronous RPC handle."
  }
, "0x0000077B":{
    "code":"RPC_S_INVALID_ASYNC_CALL"
  , "message":"Invalid asynchronous RPC call handle for this operation."
  }
, "0x0000077C":{
    "code":"RPC_X_PIPE_CLOSED"
  , "message":"The RPC pipe object has already been closed."
  }
, "0x0000077D":{
    "code":"RPC_X_PIPE_DISCIPLINE_ERROR"
  , "message":"The RPC call completed before all pipes were processed."
  }
, "0x0000077E":{
    "code":"RPC_X_PIPE_EMPTY"
  , "message":"No more data is available from the RPC pipe."
  }
, "0x0000077F":{
    "code":"ERROR_NO_SITENAME"
  , "message":"No site name is available for this machine."
  }
, "0x00000780":{
    "code":"ERROR_CANT_ACCESS_FILE"
  , "message":"The file cannot be accessed by the system."
  }
, "0x00000781":{
    "code":"ERROR_CANT_RESOLVE_FILENAME"
  , "message":"The name of the file cannot be resolved by the system."
  }
, "0x00000782":{
    "code":"RPC_S_ENTRY_TYPE_MISMATCH"
  , "message":"The entry is not of the expected type."
  }
, "0x00000783":{
    "code":"RPC_S_NOT_ALL_OBJS_EXPORTED"
  , "message":"Not all object UUIDs could be exported to the specified entry."
  }
, "0x00000784":{
    "code":"RPC_S_INTERFACE_NOT_EXPORTED"
  , "message":"The interface could not be exported to the specified entry."
  }
, "0x00000785":{
    "code":"RPC_S_PROFILE_NOT_ADDED"
  , "message":"The specified profile entry could not be added."
  }
, "0x00000786":{
    "code":"RPC_S_PRF_ELT_NOT_ADDED"
  , "message":"The specified profile element could not be added."
  }
, "0x00000787":{
    "code":"RPC_S_PRF_ELT_NOT_REMOVED"
  , "message":"The specified profile element could not be removed."
  }
, "0x00000788":{
    "code":"RPC_S_GRP_ELT_NOT_ADDED"
  , "message":"The group element could not be added."
  }
, "0x00000789":{
    "code":"RPC_S_GRP_ELT_NOT_REMOVED"
  , "message":"The group element could not be removed."
  }
, "0x0000078A":{
    "code":"ERROR_KM_DRIVER_BLOCKED"
  , "message":"The printer driver is not compatible with a policy enabled on your computer that blocks Windows NT 4.0 drivers."
  }
, "0x0000078B":{
    "code":"ERROR_CONTEXT_EXPIRED"
  , "message":"The context has expired and can no longer be used."
  }
, "0x0000078C":{
    "code":"ERROR_PER_USER_TRUST_QUOTA_EXCEEDED"
  , "message":"The current user\'s delegated trust creation quota has been exceeded."
  }
, "0x0000078D":{
    "code":"ERROR_ALL_USER_TRUST_QUOTA_EXCEEDED"
  , "message":"The total delegated trust creation quota has been exceeded."
  }
, "0x0000078E":{
    "code":"ERROR_USER_DELETE_TRUST_QUOTA_EXCEEDED"
  , "message":"The current user\'s delegated trust deletion quota has been exceeded."
  }
, "0x0000078F":{
    "code":"ERROR_AUTHENTICATION_FIREWALL_FAILED"
  , "message":"Logon failure: The machine you are logging on to is protected by an authentication firewall. The specified account is not allowed to authenticate to the machine."
  }
, "0x00000790":{
    "code":"ERROR_REMOTE_PRINT_CONNECTIONS_BLOCKED"
  , "message":"Remote connections to the Print Spooler are blocked by a policy set on your machine."
  }
, "0x000007D0":{
    "code":"ERROR_INVALID_PIXEL_FORMAT"
  , "message":"The pixel format is invalid."
  }
, "0x000007D1":{
    "code":"ERROR_BAD_DRIVER"
  , "message":"The specified driver is invalid."
  }
, "0x000007D2":{
    "code":"ERROR_INVALID_WINDOW_STYLE"
  , "message":"The window style or class attribute is invalid for this operation."
  }
, "0x000007D3":{
    "code":"ERROR_METAFILE_NOT_SUPPORTED"
  , "message":"The requested metafile operation is not supported."
  }
, "0x000007D4":{
    "code":"ERROR_TRANSFORM_NOT_SUPPORTED"
  , "message":"The requested transformation operation is not supported."
  }
, "0x000007D5":{
    "code":"ERROR_CLIPPING_NOT_SUPPORTED"
  , "message":"The requested clipping operation is not supported."
  }
, "0x000007DA":{
    "code":"ERROR_INVALID_CMM"
  , "message":"The specified color management module is invalid."
  }
, "0x000007DB":{
    "code":"ERROR_INVALID_PROFILE"
  , "message":"The specified color profile is invalid."
  }
, "0x000007DC":{
    "code":"ERROR_TAG_NOT_FOUND"
  , "message":"The specified tag was not found."
  }
, "0x000007DD":{
    "code":"ERROR_TAG_NOT_PRESENT"
  , "message":"A required tag is not present."
  }
, "0x000007DE":{
    "code":"ERROR_DUPLICATE_TAG"
  , "message":"The specified tag is already present."
  }
, "0x000007DF":{
    "code":"ERROR_PROFILE_NOT_ASSOCIATED_WITH_DEVICE"
  , "message":"The specified color profile is not associated with any device."
  }
, "0x000007E0":{
    "code":"ERROR_PROFILE_NOT_FOUND"
  , "message":"The specified color profile was not found."
  }
, "0x000007E1":{
    "code":"ERROR_INVALID_COLORSPACE"
  , "message":"The specified color space is invalid."
  }
, "0x000007E2":{
    "code":"ERROR_ICM_NOT_ENABLED"
  , "message":"Image Color Management is not enabled."
  }
, "0x000007E3":{
    "code":"ERROR_DELETING_ICM_XFORM"
  , "message":"There was an error while deleting the color transform."
  }
, "0x000007E4":{
    "code":"ERROR_INVALID_TRANSFORM"
  , "message":"The specified color transform is invalid."
  }
, "0x000007E5":{
    "code":"ERROR_COLORSPACE_MISMATCH"
  , "message":"The specified transform does not match the bitmap\'s color space."
  }
, "0x000007E6":{
    "code":"ERROR_INVALID_COLORINDEX"
  , "message":"The specified named color index is not present in the profile."
  }
, "0x000007E7":{
    "code":"ERROR_PROFILE_DOES_NOT_MATCH_DEVICE"
  , "message":"The specified profile is intended for a device of a different type than the specified device."
  }
, "0x00000836":{
    "code":"NERR_NetNotStarted"
  , "message":"The workstation driver is not installed."
  }
, "0x00000837":{
    "code":"NERR_UnknownServer"
  , "message":"The server could not be located."
  }
, "0x00000838":{
    "code":"NERR_ShareMem"
  , "message":"An internal error occurred. The network cannot access a shared memory segment."
  }
, "0x00000839":{
    "code":"NERR_NoNetworkResource"
  , "message":"A network resource shortage occurred."
  }
, "0x0000083A":{
    "code":"NERR_RemoteOnly"
  , "message":"This operation is not supported on workstations."
  }
, "0x0000083B":{
    "code":"NERR_DevNotRedirected"
  , "message":"The device is not connected."
  }
, "0x0000083C":{
    "code":"ERROR_CONNECTED_OTHER_PASSWORD"
  , "message":"The network connection was made successfully, but the user had to be prompted for a password other than the one originally specified."
  }
, "0x0000083D":{
    "code":"ERROR_CONNECTED_OTHER_PASSWORD_DEFAULT"
  , "message":"The network connection was made successfully using default credentials."
  }
, "0x00000842":{
    "code":"NERR_ServerNotStarted"
  , "message":"The Server service is not started."
  }
, "0x00000843":{
    "code":"NERR_ItemNotFound"
  , "message":"The queue is empty."
  }
, "0x00000844":{
    "code":"NERR_UnknownDevDir"
  , "message":"The device or directory does not exist."
  }
, "0x00000845":{
    "code":"NERR_RedirectedPath"
  , "message":"The operation is invalid on a redirected resource."
  }
, "0x00000846":{
    "code":"NERR_DuplicateShare"
  , "message":"The name has already been shared."
  }
, "0x00000847":{
    "code":"NERR_NoRoom"
  , "message":"The server is currently out of the requested resource."
  }
, "0x00000849":{
    "code":"NERR_TooManyItems"
  , "message":"Requested addition of items exceeds the maximum allowed."
  }
, "0x0000084A":{
    "code":"NERR_InvalidMaxUsers"
  , "message":"The Peer service supports only two simultaneous users."
  }
, "0x0000084B":{
    "code":"NERR_BufTooSmall"
  , "message":"The API return buffer is too small."
  }
, "0x0000084F":{
    "code":"NERR_RemoteErr"
  , "message":"A remote API error occurred."
  }
, "0x00000853":{
    "code":"NERR_LanmanIniError"
  , "message":"An error occurred when opening or reading the configuration file."
  }
, "0x00000858":{
    "code":"NERR_NetworkError"
  , "message":"A general network error occurred."
  }
, "0x00000859":{
    "code":"NERR_WkstaInconsistentState"
  , "message":"The Workstation service is in an inconsistent state. Restart the computer before restarting the Workstation service."
  }
, "0x0000085A":{
    "code":"NERR_WkstaNotStarted"
  , "message":"The Workstation service has not been started."
  }
, "0x0000085B":{
    "code":"NERR_BrowserNotStarted"
  , "message":"The requested information is not available."
  }
, "0x0000085C":{
    "code":"NERR_InternalError"
  , "message":"An internal error occurred."
  }
, "0x0000085D":{
    "code":"NERR_BadTransactConfig"
  , "message":"The server is not configured for transactions."
  }
, "0x0000085E":{
    "code":"NERR_InvalidAPI"
  , "message":"The requested API is not supported on the remote server."
  }
, "0x0000085F":{
    "code":"NERR_BadEventName"
  , "message":"The event name is invalid."
  }
, "0x00000860":{
    "code":"NERR_DupNameReboot"
  , "message":"The computer name already exists on the network. Change it and reboot the computer."
  }
, "0x00000862":{
    "code":"NERR_CfgCompNotFound"
  , "message":"The specified component could not be found in the configuration information."
  }
, "0x00000863":{
    "code":"NERR_CfgParamNotFound"
  , "message":"The specified parameter could not be found in the configuration information."
  }
, "0x00000865":{
    "code":"NERR_LineTooLong"
  , "message":"A line in the configuration file is too long."
  }
, "0x00000866":{
    "code":"NERR_QNotFound"
  , "message":"The printer does not exist."
  }
, "0x00000867":{
    "code":"NERR_JobNotFound"
  , "message":"The print job does not exist."
  }
, "0x00000868":{
    "code":"NERR_DestNotFound"
  , "message":"The printer destination cannot be found."
  }
, "0x00000869":{
    "code":"NERR_DestExists"
  , "message":"The printer destination already exists."
  }
, "0x0000086A":{
    "code":"NERR_QExists"
  , "message":"The print queue already exists."
  }
, "0x0000086B":{
    "code":"NERR_QNoRoom"
  , "message":"No more printers can be added."
  }
, "0x0000086C":{
    "code":"NERR_JobNoRoom"
  , "message":"No more print jobs can be added."
  }
, "0x0000086D":{
    "code":"NERR_DestNoRoom"
  , "message":"No more printer destinations can be added."
  }
, "0x0000086E":{
    "code":"NERR_DestIdle"
  , "message":"This printer destination is idle and cannot accept control operations."
  }
, "0x0000086F":{
    "code":"NERR_DestInvalidOp"
  , "message":"This printer destination request contains an invalid control function."
  }
, "0x00000870":{
    "code":"NERR_ProcNoRespond"
  , "message":"The print processor is not responding."
  }
, "0x00000871":{
    "code":"NERR_SpoolerNotLoaded"
  , "message":"The spooler is not running."
  }
, "0x00000872":{
    "code":"NERR_DestInvalidState"
  , "message":"This operation cannot be performed on the print destination in its current state."
  }
, "0x00000873":{
    "code":"NERR_QinvalidState"
  , "message":"This operation cannot be performed on the print queue in its current state."
  }
, "0x00000874":{
    "code":"NERR_JobInvalidState"
  , "message":"This operation cannot be performed on the print job in its current state."
  }
, "0x00000875":{
    "code":"NERR_SpoolNoMemory"
  , "message":"A spooler memory allocation failure occurred."
  }
, "0x00000876":{
    "code":"NERR_DriverNotFound"
  , "message":"The device driver does not exist."
  }
, "0x00000877":{
    "code":"NERR_DataTypeInvalid"
  , "message":"The data type is not supported by the print processor."
  }
, "0x00000878":{
    "code":"NERR_ProcNotFound"
  , "message":"The print processor is not installed."
  }
, "0x00000884":{
    "code":"NERR_ServiceTableLocked"
  , "message":"The service database is locked."
  }
, "0x00000885":{
    "code":"NERR_ServiceTableFull"
  , "message":"The service table is full."
  }
, "0x00000886":{
    "code":"NERR_ServiceInstalled"
  , "message":"The requested service has already been started."
  }
, "0x00000887":{
    "code":"NERR_ServiceEntryLocked"
  , "message":"The service does not respond to control actions."
  }
, "0x00000888":{
    "code":"NERR_ServiceNotInstalled"
  , "message":"The service has not been started."
  }
, "0x00000889":{
    "code":"NERR_BadServiceName"
  , "message":"The service name is invalid."
  }
, "0x0000088A":{
    "code":"NERR_ServiceCtlTimeout"
  , "message":"The service is not responding to the control function."
  }
, "0x0000088B":{
    "code":"NERR_ServiceCtlBusy"
  , "message":"The service control is busy."
  }
, "0x0000088C":{
    "code":"NERR_BadServiceProgName"
  , "message":"The configuration file contains an invalid service program name."
  }
, "0x0000088D":{
    "code":"NERR_ServiceNotCtrl"
  , "message":"The service could not be controlled in its present state."
  }
, "0x0000088E":{
    "code":"NERR_ServiceKillProc"
  , "message":"The service ended abnormally."
  }
, "0x0000088F":{
    "code":"NERR_ServiceCtlNotValid"
  , "message":"The requested pause or stop is not valid for this service."
  }
, "0x00000890":{
    "code":"NERR_NotInDispatchTbl"
  , "message":"The service control dispatcher could not find the service name in the dispatch table."
  }
, "0x00000891":{
    "code":"NERR_BadControlRecv"
  , "message":"The service control dispatcher pipe read failed."
  }
, "0x00000892":{
    "code":"NERR_ServiceNotStarting"
  , "message":"A thread for the new service could not be created."
  }
, "0x00000898":{
    "code":"NERR_AlreadyLoggedOn"
  , "message":"This workstation is already logged on to the LAN."
  }
, "0x00000899":{
    "code":"NERR_NotLoggedOn"
  , "message":"The workstation is not logged on to the LAN."
  }
, "0x0000089A":{
    "code":"NERR_BadUsername"
  , "message":"The user name or group name parameter is invalid."
  }
, "0x0000089B":{
    "code":"NERR_BadPassword"
  , "message":"The password parameter is invalid."
  }
, "0x0000089C":{
    "code":"NERR_UnableToAddName_W"
  , "message":"The logon processor did not add the message alias."
  }
, "0x0000089D":{
    "code":"NERR_UnableToAddName_F"
  , "message":"The logon processor did not add the message alias."
  }
, "0x0000089E":{
    "code":"NERR_UnableToDelName_W"
  , "message":"@W The logoff processor did not delete the message alias."
  }
, "0x0000089F":{
    "code":"NERR_UnableToDelName_F"
  , "message":"The logoff processor did not delete the message alias."
  }
, "0x000008A1":{
    "code":"NERR_LogonsPaused"
  , "message":"Network logons are paused."
  }
, "0x000008A2":{
    "code":"NERR_LogonServerConflict"
  , "message":"A centralized logon server conflict occurred."
  }
, "0x000008A3":{
    "code":"NERR_LogonNoUserPath"
  , "message":"The server is configured without a valid user path."
  }
, "0x000008A4":{
    "code":"NERR_LogonScriptError"
  , "message":"An error occurred while loading or running the logon script."
  }
, "0x000008A6":{
    "code":"NERR_StandaloneLogon"
  , "message":"The logon server was not specified. The computer will be logged on as STANDALONE."
  }
, "0x000008A7":{
    "code":"NERR_LogonServerNotFound"
  , "message":"The logon server could not be found."
  }
, "0x000008A8":{
    "code":"NERR_LogonDomainExists"
  , "message":"There is already a logon domain for this computer."
  }
, "0x000008A9":{
    "code":"NERR_NonValidatedLogon"
  , "message":"The logon server could not validate the logon."
  }
, "0x000008AB":{
    "code":"NERR_ACFNotFound"
  , "message":"The security database could not be found."
  }
, "0x000008AC":{
    "code":"NERR_GroupNotFound"
  , "message":"The group name could not be found."
  }
, "0x000008AD":{
    "code":"NERR_UserNotFound"
  , "message":"The user name could not be found."
  }
, "0x000008AE":{
    "code":"NERR_ResourceNotFound"
  , "message":"The resource name could not be found."
  }
, "0x000008AF":{
    "code":"NERR_GroupExists"
  , "message":"The group already exists."
  }
, "0x000008B0":{
    "code":"NERR_UserExists"
  , "message":"The user account already exists."
  }
, "0x000008B1":{
    "code":"NERR_ResourceExists"
  , "message":"The resource permission list already exists."
  }
, "0x000008B2":{
    "code":"NERR_NotPrimary"
  , "message":"This operation is allowed only on the PDC of the domain."
  }
, "0x000008B3":{
    "code":"NERR_ACFNotLoaded"
  , "message":"The security database has not been started."
  }
, "0x000008B4":{
    "code":"NERR_ACFNoRoom"
  , "message":"There are too many names in the user accounts database."
  }
, "0x000008B5":{
    "code":"NERR_ACFFileIOFail"
  , "message":"A disk I/O failure occurred."
  }
, "0x000008B6":{
    "code":"NERR_ACFTooManyLists"
  , "message":"The limit of 64 entries per resource was exceeded."
  }
, "0x000008B7":{
    "code":"NERR_UserLogon"
  , "message":"Deleting a user with a session is not allowed."
  }
, "0x000008B8":{
    "code":"NERR_ACFNoParent"
  , "message":"The parent directory could not be located."
  }
, "0x000008B9":{
    "code":"NERR_CanNotGrowSegment"
  , "message":"Unable to add to the security database session cache segment."
  }
, "0x000008BA":{
    "code":"NERR_SpeGroupOp"
  , "message":"This operation is not allowed on this special group."
  }
, "0x000008BB":{
    "code":"NERR_NotInCache"
  , "message":"This user is not cached in the user accounts database session cache."
  }
, "0x000008BC":{
    "code":"NERR_UserInGroup"
  , "message":"The user already belongs to this group."
  }
, "0x000008BD":{
    "code":"NERR_UserNotInGroup"
  , "message":"The user does not belong to this group."
  }
, "0x000008BE":{
    "code":"NERR_AccountUndefined"
  , "message":"This user account is undefined."
  }
, "0x000008BF":{
    "code":"NERR_AccountExpired"
  , "message":"This user account has expired."
  }
, "0x000008C0":{
    "code":"NERR_InvalidWorkstation"
  , "message":"The user is not allowed to log on from this workstation."
  }
, "0x000008C1":{
    "code":"NERR_InvalidLogonHours"
  , "message":"The user is not allowed to log on at this time."
  }
, "0x000008C2":{
    "code":"NERR_PasswordExpired"
  , "message":"The password of this user has expired."
  }
, "0x000008C3":{
    "code":"NERR_PasswordCantChange"
  , "message":"The password of this user cannot change."
  }
, "0x000008C4":{
    "code":"NERR_PasswordHistConflict"
  , "message":"This password cannot be used now."
  }
, "0x000008C5":{
    "code":"NERR_PasswordTooShort"
  , "message":"The password does not meet the password policy requirements. Check the minimum password length, password complexity, and password history requirements."
  }
, "0x000008C6":{
    "code":"NERR_PasswordTooRecent"
  , "message":"The password of this user is too recent to change."
  }
, "0x000008C7":{
    "code":"NERR_InvalidDatabase"
  , "message":"The security database is corrupted."
  }
, "0x000008C8":{
    "code":"NERR_DatabaseUpToDate"
  , "message":"No updates are necessary to this replicant network or local security database."
  }
, "0x000008C9":{
    "code":"NERR_SyncRequired"
  , "message":"This replicant database is outdated; synchronization is required."
  }
, "0x000008CA":{
    "code":"NERR_UseNotFound"
  , "message":"The network connection could not be found."
  }
, "0x000008CB":{
    "code":"NERR_BadAsgType"
  , "message":"This asg_type is invalid."
  }
, "0x000008CC":{
    "code":"NERR_DeviceIsShared"
  , "message":"This device is currently being shared."
  }
, "0x000008DE":{
    "code":"NERR_NoComputerName"
  , "message":"The computer name could not be added as a message alias. The name may already exist on the network."
  }
, "0x000008DF":{
    "code":"NERR_MsgAlreadyStarted"
  , "message":"The Messenger service is already started."
  }
, "0x000008E0":{
    "code":"NERR_MsgInitFailed"
  , "message":"The Messenger service failed to start."
  }
, "0x000008E1":{
    "code":"NERR_NameNotFound"
  , "message":"The message alias could not be found on the network."
  }
, "0x000008E2":{
    "code":"NERR_AlreadyForwarded"
  , "message":"This message alias has already been forwarded."
  }
, "0x000008E3":{
    "code":"NERR_AddForwarded"
  , "message":"This message alias has been added but is still forwarded."
  }
, "0x000008E4":{
    "code":"NERR_AlreadyExists"
  , "message":"This message alias already exists locally."
  }
, "0x000008E5":{
    "code":"NERR_TooManyNames"
  , "message":"The maximum number of added message aliases has been exceeded."
  }
, "0x000008E6":{
    "code":"NERR_DelComputerName"
  , "message":"The computer name could not be deleted."
  }
, "0x000008E7":{
    "code":"NERR_LocalForward"
  , "message":"Messages cannot be forwarded back to the same workstation."
  }
, "0x000008E8":{
    "code":"NERR_GrpMsgProcessor"
  , "message":"An error occurred in the domain message processor."
  }
, "0x000008E9":{
    "code":"NERR_PausedRemote"
  , "message":"The message was sent, but the recipient has paused the Messenger service."
  }
, "0x000008EA":{
    "code":"NERR_BadReceive"
  , "message":"The message was sent but not received."
  }
, "0x000008EB":{
    "code":"NERR_NameInUse"
  , "message":"The message alias is currently in use. Try again later."
  }
, "0x000008EC":{
    "code":"NERR_MsgNotStarted"
  , "message":"The Messenger service has not been started."
  }
, "0x000008ED":{
    "code":"NERR_NotLocalName"
  , "message":"The name is not on the local computer."
  }
, "0x000008EE":{
    "code":"NERR_NoForwardName"
  , "message":"The forwarded message alias could not be found on the network."
  }
, "0x000008EF":{
    "code":"NERR_RemoteFull"
  , "message":"The message alias table on the remote station is full."
  }
, "0x000008F0":{
    "code":"NERR_NameNotForwarded"
  , "message":"Messages for this alias are not currently being forwarded."
  }
, "0x000008F1":{
    "code":"NERR_TruncatedBroadcast"
  , "message":"The broadcast message was truncated."
  }
, "0x000008F6":{
    "code":"NERR_InvalidDevice"
  , "message":"This is an invalid device name."
  }
, "0x000008F7":{
    "code":"NERR_WriteFault"
  , "message":"A write fault occurred."
  }
, "0x000008F9":{
    "code":"NERR_DuplicateName"
  , "message":"A duplicate message alias exists on the network."
  }
, "0x000008FA":{
    "code":"NERR_DeleteLater"
  , "message":"This message alias will be deleted later."
  }
, "0x000008FB":{
    "code":"NERR_IncompleteDel"
  , "message":"The message alias was not successfully deleted from all networks."
  }
, "0x000008FC":{
    "code":"NERR_MultipleNets"
  , "message":"This operation is not supported on computers with multiple networks."
  }
, "0x00000906":{
    "code":"NERR_NetNameNotFound"
  , "message":"This shared resource does not exist."
  }
, "0x00000907":{
    "code":"NERR_DeviceNotShared"
  , "message":"This device is not shared."
  }
, "0x00000908":{
    "code":"NERR_ClientNameNotFound"
  , "message":"A session does not exist with that computer name."
  }
, "0x0000090A":{
    "code":"NERR_FileIdNotFound"
  , "message":"There is not an open file with that identification number."
  }
, "0x0000090B":{
    "code":"NERR_ExecFailure"
  , "message":"A failure occurred when executing a remote administration command."
  }
, "0x0000090C":{
    "code":"NERR_TmpFile"
  , "message":"A failure occurred when opening a remote temporary file."
  }
, "0x0000090D":{
    "code":"NERR_TooMuchData"
  , "message":"The data returned from a remote administration command has been truncated to 64 KB."
  }
, "0x0000090E":{
    "code":"NERR_DeviceShareConflict"
  , "message":"This device cannot be shared as both a spooled and a nonspooled resource."
  }
, "0x0000090F":{
    "code":"NERR_BrowserTableIncomplete"
  , "message":"The information in the list of servers may be incorrect."
  }
, "0x00000910":{
    "code":"NERR_NotLocalDomain"
  , "message":"The computer is not active in this domain."
  }
, "0x00000911":{
    "code":"NERR_IsDfsShare"
  , "message":"The share must be removed from the Distributed File System (DFS) before it can be deleted."
  }
, "0x0000091B":{
    "code":"NERR_DevInvalidOpCode"
  , "message":"The operation is invalid for this device."
  }
, "0x0000091C":{
    "code":"NERR_DevNotFound"
  , "message":"This device cannot be shared."
  }
, "0x0000091D":{
    "code":"NERR_DevNotOpen"
  , "message":"This device was not open."
  }
, "0x0000091E":{
    "code":"NERR_BadQueueDevString"
  , "message":"This device name list is invalid."
  }
, "0x0000091F":{
    "code":"NERR_BadQueuePriority"
  , "message":"The queue priority is invalid."
  }
, "0x00000921":{
    "code":"NERR_NoCommDevs"
  , "message":"There are no shared communication devices."
  }
, "0x00000922":{
    "code":"NERR_QueueNotFound"
  , "message":"The queue you specified does not exist."
  }
, "0x00000924":{
    "code":"NERR_BadDevString"
  , "message":"This list of devices is invalid."
  }
, "0x00000925":{
    "code":"NERR_BadDev"
  , "message":"The requested device is invalid."
  }
, "0x00000926":{
    "code":"NERR_InUseBySpooler"
  , "message":"This device is already in use by the spooler."
  }
, "0x00000927":{
    "code":"NERR_CommDevInUse"
  , "message":"This device is already in use as a communication device."
  }
, "0x0000092F":{
    "code":"NERR_InvalidComputer"
  , "message":"This computer name is invalid."
  }
, "0x00000932":{
    "code":"NERR_MaxLenExceeded"
  , "message":"The string and prefix specified are too long."
  }
, "0x00000934":{
    "code":"NERR_BadComponent"
  , "message":"This path component is invalid."
  }
, "0x00000935":{
    "code":"NERR_CantType"
  , "message":"Could not determine the type of input."
  }
, "0x0000093A":{
    "code":"NERR_TooManyEntries"
  , "message":"The buffer for types is not big enough."
  }
, "0x00000942":{
    "code":"NERR_ProfileFileTooBig"
  , "message":"Profile files cannot exceed 64 KB."
  }
, "0x00000943":{
    "code":"NERR_ProfileOffset"
  , "message":"The start offset is out of range."
  }
, "0x00000944":{
    "code":"NERR_ProfileCleanup"
  , "message":"The system cannot delete current connections to network resources."
  }
, "0x00000945":{
    "code":"NERR_ProfileUnknownCmd"
  , "message":"The system was unable to parse the command line in this file."
  }
, "0x00000946":{
    "code":"NERR_ProfileLoadErr"
  , "message":"An error occurred while loading the profile file."
  }
, "0x00000947":{
    "code":"NERR_ProfileSaveErr"
  , "message":"Errors occurred while saving the profile file. The profile was partially saved."
  }
, "0x00000949":{
    "code":"NERR_LogOverflow"
  , "message":"Log file %1 is full."
  }
, "0x0000094A":{
    "code":"NERR_LogFileChanged"
  , "message":"This log file has changed between reads."
  }
, "0x0000094B":{
    "code":"NERR_LogFileCorrupt"
  , "message":"Log file %1 is corrupt."
  }
, "0x0000094C":{
    "code":"NERR_SourceIsDir"
  , "message":"The source path cannot be a directory."
  }
, "0x0000094D":{
    "code":"NERR_BadSource"
  , "message":"The source path is illegal."
  }
, "0x0000094E":{
    "code":"NERR_BadDest"
  , "message":"The destination path is illegal."
  }
, "0x0000094F":{
    "code":"NERR_DifferentServers"
  , "message":"The source and destination paths are on different servers."
  }
, "0x00000951":{
    "code":"NERR_RunSrvPaused"
  , "message":"The Run server you requested is paused."
  }
, "0x00000955":{
    "code":"NERR_ErrCommRunSrv"
  , "message":"An error occurred when communicating with a Run server."
  }
, "0x00000957":{
    "code":"NERR_ErrorExecingGhost"
  , "message":"An error occurred when starting a background process."
  }
, "0x00000958":{
    "code":"NERR_ShareNotFound"
  , "message":"The shared resource you are connected to could not be found."
  }
, "0x00000960":{
    "code":"NERR_InvalidLana"
  , "message":"The LAN adapter number is invalid."
  }
, "0x00000961":{
    "code":"NERR_OpenFiles"
  , "message":"There are open files on the connection."
  }
, "0x00000962":{
    "code":"NERR_ActiveConns"
  , "message":"Active connections still exist."
  }
, "0x00000963":{
    "code":"NERR_BadPasswordCore"
  , "message":"This share name or password is invalid."
  }
, "0x00000964":{
    "code":"NERR_DevInUse"
  , "message":"The device is being accessed by an active process."
  }
, "0x00000965":{
    "code":"NERR_LocalDrive"
  , "message":"The drive letter is in use locally."
  }
, "0x0000097E":{
    "code":"NERR_AlertExists"
  , "message":"The specified client is already registered for the specified event."
  }
, "0x0000097F":{
    "code":"NERR_TooManyAlerts"
  , "message":"The alert table is full."
  }
, "0x00000980":{
    "code":"NERR_NoSuchAlert"
  , "message":"An invalid or nonexistent alert name was raised."
  }
, "0x00000981":{
    "code":"NERR_BadRecipient"
  , "message":"The alert recipient is invalid."
  }
, "0x00000982":{
    "code":"NERR_AcctLimitExceeded"
  , "message":"A user\'s session with this server has been deleted."
  }
, "0x00000988":{
    "code":"NERR_InvalidLogSeek"
  , "message":"The log file does not contain the requested record number."
  }
, "0x00000992":{
    "code":"NERR_BadUasConfig"
  , "message":"The user accounts database is not configured correctly."
  }
, "0x00000993":{
    "code":"NERR_InvalidUASOp"
  , "message":"This operation is not permitted when the Net Logon service is running."
  }
, "0x00000994":{
    "code":"NERR_LastAdmin"
  , "message":"This operation is not allowed on the last administrative account."
  }
, "0x00000995":{
    "code":"NERR_DCNotFound"
  , "message":"Could not find the domain controller for this domain."
  }
, "0x00000996":{
    "code":"NERR_LogonTrackingError"
  , "message":"Could not set logon information for this user."
  }
, "0x00000997":{
    "code":"NERR_NetlogonNotStarted"
  , "message":"The Net Logon service has not been started."
  }
, "0x00000998":{
    "code":"NERR_CanNotGrowUASFile"
  , "message":"Unable to add to the user accounts database."
  }
, "0x00000999":{
    "code":"NERR_TimeDiffAtDC"
  , "message":"This server\'s clock is not synchronized with the PDC\'s clock."
  }
, "0x0000099A":{
    "code":"NERR_PasswordMismatch"
  , "message":"A password mismatch has been detected."
  }
, "0x0000099C":{
    "code":"NERR_NoSuchServer"
  , "message":"The server identification does not specify a valid server."
  }
, "0x0000099D":{
    "code":"NERR_NoSuchSession"
  , "message":"The session identification does not specify a valid session."
  }
, "0x0000099E":{
    "code":"NERR_NoSuchConnection"
  , "message":"The connection identification does not specify a valid connection."
  }
, "0x0000099F":{
    "code":"NERR_TooManyServers"
  , "message":"There is no space for another entry in the table of available servers."
  }
, "0x000009A0":{
    "code":"NERR_TooManySessions"
  , "message":"The server has reached the maximum number of sessions it supports."
  }
, "0x000009A1":{
    "code":"NERR_TooManyConnections"
  , "message":"The server has reached the maximum number of connections it supports."
  }
, "0x000009A2":{
    "code":"NERR_TooManyFiles"
  , "message":"The server cannot open more files because it has reached its maximum number."
  }
, "0x000009A3":{
    "code":"NERR_NoAlternateServers"
  , "message":"There are no alternate servers registered on this server."
  }
, "0x000009A6":{
    "code":"NERR_TryDownLevel"
  , "message":"Try the down-level (remote admin protocol) version of API instead."
  }
, "0x000009B0":{
    "code":"NERR_UPSDriverNotStarted"
  , "message":"The uninterruptible power supply (UPS) driver could not be accessed by the UPS service."
  }
, "0x000009B1":{
    "code":"NERR_UPSInvalidConfig"
  , "message":"The UPS service is not configured correctly."
  }
, "0x000009B2":{
    "code":"NERR_UPSInvalidCommPort"
  , "message":"The UPS service could not access the specified Comm Port."
  }
, "0x000009B3":{
    "code":"NERR_UPSSignalAsserted"
  , "message":"The UPS indicated a line fail or low battery situation. Service not started."
  }
, "0x000009B4":{
    "code":"NERR_UPSShutdownFailed"
  , "message":"The UPS service failed to perform a system shut down."
  }
, "0x000009C4":{
    "code":"NERR_BadDosRetCode"
  , "message":"The program below returned an MS-DOS error code."
  }
, "0x000009C5":{
    "code":"NERR_ProgNeedsExtraMem"
  , "message":"The program below needs more memory."
  }
, "0x000009C6":{
    "code":"NERR_BadDosFunction"
  , "message":"The program below called an unsupported MS-DOS function."
  }
, "0x000009C7":{
    "code":"NERR_RemoteBootFailed"
  , "message":"The workstation failed to boot."
  }
, "0x000009C8":{
    "code":"NERR_BadFileCheckSum"
  , "message":"The file below is corrupt."
  }
, "0x000009C9":{
    "code":"NERR_NoRplBootSystem"
  , "message":"No loader is specified in the boot-block definition file."
  }
, "0x000009CA":{
    "code":"NERR_RplLoadrNetBiosErr"
  , "message":"NetBIOS returned an error: The network control blocks (NCBs) and Server Message Block (SMB) are dumped above."
  }
, "0x000009CB":{
    "code":"NERR_RplLoadrDiskErr"
  , "message":"A disk I/O error occurred."
  }
, "0x000009CC":{
    "code":"NERR_ImageParamErr"
  , "message":"Image parameter substitution failed."
  }
, "0x000009CD":{
    "code":"NERR_TooManyImageParams"
  , "message":"Too many image parameters cross disk sector boundaries."
  }
, "0x000009CE":{
    "code":"NERR_NonDosFloppyUsed"
  , "message":"The image was not generated from an MS-DOS disk formatted with /S."
  }
, "0x000009CF":{
    "code":"NERR_RplBootRestart"
  , "message":"Remote boot will be restarted later."
  }
, "0x000009D0":{
    "code":"NERR_RplSrvrCallFailed"
  , "message":"The call to the Remoteboot server failed."
  }
, "0x000009D1":{
    "code":"NERR_CantConnectRplSrvr"
  , "message":"Cannot connect to the Remoteboot server."
  }
, "0x000009D2":{
    "code":"NERR_CantOpenImageFile"
  , "message":"Cannot open image file on the Remoteboot server."
  }
, "0x000009D3":{
    "code":"NERR_CallingRplSrvr"
  , "message":"Connecting to the Remoteboot server."
  }
, "0x000009D4":{
    "code":"NERR_StartingRplBoot"
  , "message":"Connecting to the Remoteboot server."
  }
, "0x000009D5":{
    "code":"NERR_RplBootServiceTerm"
  , "message":"Remote boot service was stopped, check the error log for the cause of the problem."
  }
, "0x000009D6":{
    "code":"NERR_RplBootStartFailed"
  , "message":"Remote boot startup failed; check the error log for the cause of the problem."
  }
, "0x000009D7":{
    "code":"NERR_RPL_CONNECTED"
  , "message":"A second connection to a Remoteboot resource is not allowed."
  }
, "0x000009F6":{
    "code":"NERR_BrowserConfiguredToNotRun"
  , "message":"The browser service was configured with MaintainServerList=No."
  }
, "0x00000A32":{
    "code":"NERR_RplNoAdaptersStarted"
  , "message":"Service failed to start because none of the network adapters started with this service."
  }
, "0x00000A33":{
    "code":"NERR_RplBadRegistry"
  , "message":"Service failed to start due to bad startup information in the registry."
  }
, "0x00000A34":{
    "code":"NERR_RplBadDatabase"
  , "message":"Service failed to start because its database is absent or corrupt."
  }
, "0x00000A35":{
    "code":"NERR_RplRplfilesShare"
  , "message":"Service failed to start because the RPLFILES share is absent."
  }
, "0x00000A36":{
    "code":"NERR_RplNotRplServer"
  , "message":"Service failed to start because the RPLUSER group is absent."
  }
, "0x00000A37":{
    "code":"NERR_RplCannotEnum"
  , "message":"Cannot enumerate service records."
  }
, "0x00000A38":{
    "code":"NERR_RplWkstaInfoCorrupted"
  , "message":"Workstation record information has been corrupted."
  }
, "0x00000A39":{
    "code":"NERR_RplWkstaNotFound"
  , "message":"Workstation record was not found."
  }
, "0x00000A3A":{
    "code":"NERR_RplWkstaNameUnavailable"
  , "message":"Workstation name is in use by some other workstation."
  }
, "0x00000A3B":{
    "code":"NERR_RplProfileInfoCorrupted"
  , "message":"Profile record information has been corrupted."
  }
, "0x00000A3C":{
    "code":"NERR_RplProfileNotFound"
  , "message":"Profile record was not found."
  }
, "0x00000A3D":{
    "code":"NERR_RplProfileNameUnavailable"
  , "message":"Profile name is in use by some other profile."
  }
, "0x00000A3E":{
    "code":"NERR_RplProfileNotEmpty"
  , "message":"There are workstations using this profile."
  }
, "0x00000A3F":{
    "code":"NERR_RplConfigInfoCorrupted"
  , "message":"Configuration record information has been corrupted."
  }
, "0x00000A40":{
    "code":"NERR_RplConfigNotFound"
  , "message":"Configuration record was not found."
  }
, "0x00000A41":{
    "code":"NERR_RplAdapterInfoCorrupted"
  , "message":"Adapter ID record information has been corrupted."
  }
, "0x00000A42":{
    "code":"NERR_RplInternal"
  , "message":"An internal service error has occurred."
  }
, "0x00000A43":{
    "code":"NERR_RplVendorInfoCorrupted"
  , "message":"Vendor ID record information has been corrupted."
  }
, "0x00000A44":{
    "code":"NERR_RplBootInfoCorrupted"
  , "message":"Boot block record information has been corrupted."
  }
, "0x00000A45":{
    "code":"NERR_RplWkstaNeedsUserAcct"
  , "message":"The user account for this workstation record is missing."
  }
, "0x00000A46":{
    "code":"NERR_RplNeedsRPLUSERAcct"
  , "message":"The RPLUSER local group could not be found."
  }
, "0x00000A47":{
    "code":"NERR_RplBootNotFound"
  , "message":"Boot block record was not found."
  }
, "0x00000A48":{
    "code":"NERR_RplIncompatibleProfile"
  , "message":"Chosen profile is incompatible with this workstation."
  }
, "0x00000A49":{
    "code":"NERR_RplAdapterNameUnavailable"
  , "message":"Chosen network adapter ID is in use by some other workstation."
  }
, "0x00000A4A":{
    "code":"NERR_RplConfigNotEmpty"
  , "message":"There are profiles using this configuration."
  }
, "0x00000A4B":{
    "code":"NERR_RplBootInUse"
  , "message":"There are workstations, profiles, or configurations using this boot block."
  }
, "0x00000A4C":{
    "code":"NERR_RplBackupDatabase"
  , "message":"Service failed to back up the Remoteboot database."
  }
, "0x00000A4D":{
    "code":"NERR_RplAdapterNotFound"
  , "message":"Adapter record was not found."
  }
, "0x00000A4E":{
    "code":"NERR_RplVendorNotFound"
  , "message":"Vendor record was not found."
  }
, "0x00000A4F":{
    "code":"NERR_RplVendorNameUnavailable"
  , "message":"Vendor name is in use by some other vendor record."
  }
, "0x00000A50":{
    "code":"NERR_RplBootNameUnavailable"
  , "message":"The boot name or vendor ID is in use by some other boot block record."
  }
, "0x00000A51":{
    "code":"NERR_RplConfigNameUnavailable"
  , "message":"The configuration name is in use by some other configuration."
  }
, "0x00000A64":{
    "code":"NERR_DfsInternalCorruption"
  , "message":"The internal database maintained by the DFS service is corrupt."
  }
, "0x00000A65":{
    "code":"NERR_DfsVolumeDataCorrupt"
  , "message":"One of the records in the internal DFS database is corrupt."
  }
, "0x00000A66":{
    "code":"NERR_DfsNoSuchVolume"
  , "message":"There is no DFS name whose entry path matches the input entry path."
  }
, "0x00000A67":{
    "code":"NERR_DfsVolumeAlreadyExists"
  , "message":"A root or link with the given name already exists."
  }
, "0x00000A68":{
    "code":"NERR_DfsAlreadyShared"
  , "message":"The server share specified is already shared in the DFS."
  }
, "0x00000A69":{
    "code":"NERR_DfsNoSuchShare"
  , "message":"The indicated server share does not support the indicated DFS namespace."
  }
, "0x00000A6A":{
    "code":"NERR_DfsNotALeafVolume"
  , "message":"The operation is not valid in this portion of the namespace."
  }
, "0x00000A6B":{
    "code":"NERR_DfsLeafVolume"
  , "message":"The operation is not valid in this portion of the namespace."
  }
, "0x00000A6C":{
    "code":"NERR_DfsVolumeHasMultipleServers"
  , "message":"The operation is ambiguous because the link has multiple servers."
  }
, "0x00000A6D":{
    "code":"NERR_DfsCantCreateJunctionPoint"
  , "message":"Unable to create a link."
  }
, "0x00000A6E":{
    "code":"NERR_DfsServerNotDfsAware"
  , "message":"The server is not DFS-aware."
  }
, "0x00000A6F":{
    "code":"NERR_DfsBadRenamePath"
  , "message":"The specified rename target path is invalid."
  }
, "0x00000A70":{
    "code":"NERR_DfsVolumeIsOffline"
  , "message":"The specified DFS link is offline."
  }
, "0x00000A71":{
    "code":"NERR_DfsNoSuchServer"
  , "message":"The specified server is not a server for this link."
  }
, "0x00000A72":{
    "code":"NERR_DfsCyclicalName"
  , "message":"A cycle in the DFS name was detected."
  }
, "0x00000A73":{
    "code":"NERR_DfsNotSupportedInServerDfs"
  , "message":"The operation is not supported on a server-based DFS."
  }
, "0x00000A74":{
    "code":"NERR_DfsDuplicateService"
  , "message":"This link is already supported by the specified server share."
  }
, "0x00000A75":{
    "code":"NERR_DfsCantRemoveLastServerShare"
  , "message":"Cannot remove the last server share supporting this root or link."
  }
, "0x00000A76":{
    "code":"NERR_DfsVolumeIsInterDfs"
  , "message":"The operation is not supported for an inter-DFS link."
  }
, "0x00000A77":{
    "code":"NERR_DfsInconsistent"
  , "message":"The internal state of the DFS Service has become inconsistent."
  }
, "0x00000A78":{
    "code":"NERR_DfsServerUpgraded"
  , "message":"The DFS Service has been installed on the specified server."
  }
, "0x00000A79":{
    "code":"NERR_DfsDataIsIdentical"
  , "message":"The DFS data being reconciled is identical."
  }
, "0x00000A7A":{
    "code":"NERR_DfsCantRemoveDfsRoot"
  , "message":"The DFS root cannot be deleted. Uninstall DFS if required."
  }
, "0x00000A7B":{
    "code":"NERR_DfsChildOrParentInDfs"
  , "message":"A child or parent directory of the share is already in a DFS."
  }
, "0x00000A82":{
    "code":"NERR_DfsInternalError"
  , "message":"DFS internal error."
  }
, "0x00000A83":{
    "code":"NERR_SetupAlreadyJoined"
  , "message":"This machine is already joined to a domain."
  }
, "0x00000A84":{
    "code":"NERR_SetupNotJoined"
  , "message":"This machine is not currently joined to a domain."
  }
, "0x00000A85":{
    "code":"NERR_SetupDomainController"
  , "message":"This machine is a domain controller and cannot be unjoined from a domain."
  }
, "0x00000A86":{
    "code":"NERR_DefaultJoinRequired"
  , "message":"The destination domain controller does not support creating machine accounts in organizational units (OUs)."
  }
, "0x00000A87":{
    "code":"NERR_InvalidWorkgroupName"
  , "message":"The specified workgroup name is invalid."
  }
, "0x00000A88":{
    "code":"NERR_NameUsesIncompatibleCodePage"
  , "message":"The specified computer name is incompatible with the default language used on the domain controller."
  }
, "0x00000A89":{
    "code":"NERR_ComputerAccountNotFound"
  , "message":"The specified computer account could not be found."
  }
, "0x00000A8A":{
    "code":"NERR_PersonalSku"
  , "message":"This version of Windows cannot be joined to a domain."
  }
, "0x00000A8D":{
    "code":"NERR_PasswordMustChange"
  , "message":"The password must change at the next logon."
  }
, "0x00000A8E":{
    "code":"NERR_AccountLockedOut"
  , "message":"The account is locked out."
  }
, "0x00000A8F":{
    "code":"NERR_PasswordTooLong"
  , "message":"The password is too long."
  }
, "0x00000A90":{
    "code":"NERR_PasswordNotComplexEnough"
  , "message":"The password does not meet the complexity policy."
  }
, "0x00000A91":{
    "code":"NERR_PasswordFilterError"
  , "message":"The password does not meet the requirements of the password filter DLLs."
  }
, "0x00000BB8":{
    "code":"ERROR_UNKNOWN_PRINT_MONITOR"
  , "message":"The specified print monitor is unknown."
  }
, "0x00000BB9":{
    "code":"ERROR_PRINTER_DRIVER_IN_USE"
  , "message":"The specified printer driver is currently in use."
  }
, "0x00000BBA":{
    "code":"ERROR_SPOOL_FILE_NOT_FOUND"
  , "message":"The spool file was not found."
  }
, "0x00000BBB":{
    "code":"ERROR_SPL_NO_STARTDOC"
  , "message":"A StartDocPrinter call was not issued."
  }
, "0x00000BBC":{
    "code":"ERROR_SPL_NO_ADDJOB"
  , "message":"An AddJob call was not issued."
  }
, "0x00000BBD":{
    "code":"ERROR_PRINT_PROCESSOR_ALREADY_INSTALLED"
  , "message":"The specified print processor has already been installed."
  }
, "0x00000BBE":{
    "code":"ERROR_PRINT_MONITOR_ALREADY_INSTALLED"
  , "message":"The specified print monitor has already been installed."
  }
, "0x00000BBF":{
    "code":"ERROR_INVALID_PRINT_MONITOR"
  , "message":"The specified print monitor does not have the required functions."
  }
, "0x00000BC0":{
    "code":"ERROR_PRINT_MONITOR_IN_USE"
  , "message":"The specified print monitor is currently in use."
  }
, "0x00000BC1":{
    "code":"ERROR_PRINTER_HAS_JOBS_QUEUED"
  , "message":"The requested operation is not allowed when there are jobs queued to the printer."
  }
, "0x00000BC2":{
    "code":"ERROR_SUCCESS_REBOOT_REQUIRED"
  , "message":"The requested operation is successful. Changes will not be effective until the system is rebooted."
  }
, "0x00000BC3":{
    "code":"ERROR_SUCCESS_RESTART_REQUIRED"
  , "message":"The requested operation is successful. Changes will not be effective until the service is restarted."
  }
, "0x00000BC4":{
    "code":"ERROR_PRINTER_NOT_FOUND"
  , "message":"No printers were found."
  }
, "0x00000BC5":{
    "code":"ERROR_PRINTER_DRIVER_WARNED"
  , "message":"The printer driver is known to be unreliable."
  }
, "0x00000BC6":{
    "code":"ERROR_PRINTER_DRIVER_BLOCKED"
  , "message":"The printer driver is known to harm the system."
  }
, "0x00000BC7":{
    "code":"ERROR_PRINTER_DRIVER_PACKAGE_IN_USE"
  , "message":"The specified printer driver package is currently in use."
  }
, "0x00000BC8":{
    "code":"ERROR_CORE_DRIVER_PACKAGE_NOT_FOUND"
  , "message":"Unable to find a core driver package that is required by the printer driver package."
  }
, "0x00000BC9":{
    "code":"ERROR_FAIL_REBOOT_REQUIRED"
  , "message":"The requested operation failed. A system reboot is required to roll back changes made."
  }
, "0x00000BCA":{
    "code":"ERROR_FAIL_REBOOT_INITIATED"
  , "message":"The requested operation failed. A system reboot has been initiated to roll back changes made."
  }
, "0x00000F6E":{
    "code":"ERROR_IO_REISSUE_AS_CACHED"
  , "message":"Reissue the given operation as a cached I/O operation."
  }
, "0x00000FA0":{
    "code":"ERROR_WINS_INTERNAL"
  , "message":"Windows Internet Name Service (WINS) encountered an error while processing the command."
  }
, "0x00000FA1":{
    "code":"ERROR_CAN_NOT_DEL_LOCAL_WINS"
  , "message":"The local WINS cannot be deleted."
  }
, "0x00000FA2":{
    "code":"ERROR_STATIC_INIT"
  , "message":"The importation from the file failed."
  }
, "0x00000FA3":{
    "code":"ERROR_INC_BACKUP"
  , "message":"The backup failed. Was a full backup done before?"
  }
, "0x00000FA4":{
    "code":"ERROR_FULL_BACKUP"
  , "message":"The backup failed. Check the directory to which you are backing the database."
  }
, "0x00000FA5":{
    "code":"ERROR_REC_NON_EXISTENT"
  , "message":"The name does not exist in the WINS database."
  }
, "0x00000FA6":{
    "code":"ERROR_RPL_NOT_ALLOWED"
  , "message":"Replication with a nonconfigured partner is not allowed."
  }
, "0x00000FD2":{
    "code":"PEERDIST_ERROR_CONTENTINFO_VERSION_UNSUPPORTED"
  , "message":"The version of the supplied content information is not supported."
  }
, "0x00000FD3":{
    "code":"PEERDIST_ERROR_CANNOT_PARSE_CONTENTINFO"
  , "message":"The supplied content information is malformed."
  }
, "0x00000FD4":{
    "code":"PEERDIST_ERROR_MISSING_DATA"
  , "message":"The requested data cannot be found in local or peer caches."
  }
, "0x00000FD5":{
    "code":"PEERDIST_ERROR_NO_MORE"
  , "message":"No more data is available or required."
  }
, "0x00000FD6":{
    "code":"PEERDIST_ERROR_NOT_INITIALIZED"
  , "message":"The supplied object has not been initialized."
  }
, "0x00000FD7":{
    "code":"PEERDIST_ERROR_ALREADY_INITIALIZED"
  , "message":"The supplied object has already been initialized."
  }
, "0x00000FD8":{
    "code":"PEERDIST_ERROR_SHUTDOWN_IN_PROGRESS"
  , "message":"A shutdown operation is already in progress."
  }
, "0x00000FD9":{
    "code":"PEERDIST_ERROR_INVALIDATED"
  , "message":"The supplied object has already been invalidated."
  }
, "0x00000FDA":{
    "code":"PEERDIST_ERROR_ALREADY_EXISTS"
  , "message":"An element already exists and was not replaced."
  }
, "0x00000FDB":{
    "code":"PEERDIST_ERROR_OPERATION_NOTFOUND"
  , "message":"Can not cancel the requested operation as it has already been completed."
  }
, "0x00000FDC":{
    "code":"PEERDIST_ERROR_ALREADY_COMPLETED"
  , "message":"Can not perform the reqested operation because it has already been carried out."
  }
, "0x00000FDD":{
    "code":"PEERDIST_ERROR_OUT_OF_BOUNDS"
  , "message":"An operation accessed data beyond the bounds of valid data."
  }
, "0x00000FDE":{
    "code":"PEERDIST_ERROR_VERSION_UNSUPPORTED"
  , "message":"The requested version is not supported."
  }
, "0x00000FDF":{
    "code":"PEERDIST_ERROR_INVALID_CONFIGURATION"
  , "message":"A configuration value is invalid."
  }
, "0x00000FE0":{
    "code":"PEERDIST_ERROR_NOT_LICENSED"
  , "message":"The SKU is not licensed."
  }
, "0x00000FE1":{
    "code":"PEERDIST_ERROR_SERVICE_UNAVAILABLE"
  , "message":"PeerDist Service is still initializing and will be available shortly."
  }
, "0x00001004":{
    "code":"ERROR_DHCP_ADDRESS_CONFLICT"
  , "message":"The Dynamic Host Configuration Protocol (DHCP) client has obtained an IP address that is already in use on the network. The local interface will be disabled until the DHCP client can obtain a new address."
  }
, "0x00001068":{
    "code":"ERROR_WMI_GUID_NOT_FOUND"
  , "message":"The GUID passed was not recognized as valid by a WMI data provider."
  }
, "0x00001069":{
    "code":"ERROR_WMI_INSTANCE_NOT_FOUND"
  , "message":"The instance name passed was not recognized as valid by a WMI data provider."
  }
, "0x0000106A":{
    "code":"ERROR_WMI_ITEMID_NOT_FOUND"
  , "message":"The data item ID passed was not recognized as valid by a WMI data provider."
  }
, "0x0000106B":{
    "code":"ERROR_WMI_TRY_AGAIN"
  , "message":"The WMI request could not be completed and should be retried."
  }
, "0x0000106C":{
    "code":"ERROR_WMI_DP_NOT_FOUND"
  , "message":"The WMI data provider could not be located."
  }
, "0x0000106D":{
    "code":"ERROR_WMI_UNRESOLVED_INSTANCE_REF"
  , "message":"The WMI data provider references an instance set that has not been registered."
  }
, "0x0000106E":{
    "code":"ERROR_WMI_ALREADY_ENABLED"
  , "message":"The WMI data block or event notification has already been enabled."
  }
, "0x0000106F":{
    "code":"ERROR_WMI_GUID_DISCONNECTED"
  , "message":"The WMI data block is no longer available."
  }
, "0x00001070":{
    "code":"ERROR_WMI_SERVER_UNAVAILABLE"
  , "message":"The WMI data service is not available."
  }
, "0x00001071":{
    "code":"ERROR_WMI_DP_FAILED"
  , "message":"The WMI data provider failed to carry out the request."
  }
, "0x00001072":{
    "code":"ERROR_WMI_INVALID_MOF"
  , "message":"The WMI Managed Object Format (MOF) information is not valid."
  }
, "0x00001073":{
    "code":"ERROR_WMI_INVALID_REGINFO"
  , "message":"The WMI registration information is not valid."
  }
, "0x00001074":{
    "code":"ERROR_WMI_ALREADY_DISABLED"
  , "message":"The WMI data block or event notification has already been disabled."
  }
, "0x00001075":{
    "code":"ERROR_WMI_READ_ONLY"
  , "message":"The WMI data item or data block is read-only."
  }
, "0x00001076":{
    "code":"ERROR_WMI_SET_FAILURE"
  , "message":"The WMI data item or data block could not be changed."
  }
, "0x000010CC":{
    "code":"ERROR_INVALID_MEDIA"
  , "message":"The media identifier does not represent a valid medium."
  }
, "0x000010CD":{
    "code":"ERROR_INVALID_LIBRARY"
  , "message":"The library identifier does not represent a valid library."
  }
, "0x000010CE":{
    "code":"ERROR_INVALID_MEDIA_POOL"
  , "message":"The media pool identifier does not represent a valid media pool."
  }
, "0x000010CF":{
    "code":"ERROR_DRIVE_MEDIA_MISMATCH"
  , "message":"The drive and medium are not compatible, or they exist in different libraries."
  }
, "0x000010D0":{
    "code":"ERROR_MEDIA_OFFLINE"
  , "message":"The medium currently exists in an offline library and must be online to perform this operation."
  }
, "0x000010D1":{
    "code":"ERROR_LIBRARY_OFFLINE"
  , "message":"The operation cannot be performed on an offline library."
  }
, "0x000010D2":{
    "code":"ERROR_EMPTY"
  , "message":"The library, drive, or media pool is empty."
  }
, "0x000010D3":{
    "code":"ERROR_NOT_EMPTY"
  , "message":"The library, drive, or media pool must be empty to perform this operation."
  }
, "0x000010D4":{
    "code":"ERROR_MEDIA_UNAVAILABLE"
  , "message":"No media is currently available in this media pool or library."
  }
, "0x000010D5":{
    "code":"ERROR_RESOURCE_DISABLED"
  , "message":"A resource required for this operation is disabled."
  }
, "0x000010D6":{
    "code":"ERROR_INVALID_CLEANER"
  , "message":"The media identifier does not represent a valid cleaner."
  }
, "0x000010D7":{
    "code":"ERROR_UNABLE_TO_CLEAN"
  , "message":"The drive cannot be cleaned or does not support cleaning."
  }
, "0x000010D8":{
    "code":"ERROR_OBJECT_NOT_FOUND"
  , "message":"The object identifier does not represent a valid object."
  }
, "0x000010D9":{
    "code":"ERROR_DATABASE_FAILURE"
  , "message":"Unable to read from or write to the database."
  }
, "0x000010DA":{
    "code":"ERROR_DATABASE_FULL"
  , "message":"The database is full."
  }
, "0x000010DB":{
    "code":"ERROR_MEDIA_INCOMPATIBLE"
  , "message":"The medium is not compatible with the device or media pool."
  }
, "0x000010DC":{
    "code":"ERROR_RESOURCE_NOT_PRESENT"
  , "message":"The resource required for this operation does not exist."
  }
, "0x000010DD":{
    "code":"ERROR_INVALID_OPERATION"
  , "message":"The operation identifier is not valid."
  }
, "0x000010DE":{
    "code":"ERROR_MEDIA_NOT_AVAILABLE"
  , "message":"The media is not mounted or ready for use."
  }
, "0x000010DF":{
    "code":"ERROR_DEVICE_NOT_AVAILABLE"
  , "message":"The device is not ready for use."
  }
, "0x000010E0":{
    "code":"ERROR_REQUEST_REFUSED"
  , "message":"The operator or administrator has refused the request."
  }
, "0x000010E1":{
    "code":"ERROR_INVALID_DRIVE_OBJECT"
  , "message":"The drive identifier does not represent a valid drive."
  }
, "0x000010E2":{
    "code":"ERROR_LIBRARY_FULL"
  , "message":"Library is full. No slot is available for use."
  }
, "0x000010E3":{
    "code":"ERROR_MEDIUM_NOT_ACCESSIBLE"
  , "message":"The transport cannot access the medium."
  }
, "0x000010E4":{
    "code":"ERROR_UNABLE_TO_LOAD_MEDIUM"
  , "message":"Unable to load the medium into the drive."
  }
, "0x000010E5":{
    "code":"ERROR_UNABLE_TO_INVENTORY_DRIVE"
  , "message":"Unable to retrieve the drive status."
  }
, "0x000010E6":{
    "code":"ERROR_UNABLE_TO_INVENTORY_SLOT"
  , "message":"Unable to retrieve the slot status."
  }
, "0x000010E7":{
    "code":"ERROR_UNABLE_TO_INVENTORY_TRANSPORT"
  , "message":"Unable to retrieve status about the transport."
  }
, "0x000010E8":{
    "code":"ERROR_TRANSPORT_FULL"
  , "message":"Cannot use the transport because it is already in use."
  }
, "0x000010E9":{
    "code":"ERROR_CONTROLLING_IEPORT"
  , "message":"Unable to open or close the inject/eject port."
  }
, "0x000010EA":{
    "code":"ERROR_UNABLE_TO_EJECT_MOUNTED_MEDIA"
  , "message":"Unable to eject the medium because it is in a drive."
  }
, "0x000010EB":{
    "code":"ERROR_CLEANER_SLOT_SET"
  , "message":"A cleaner slot is already reserved."
  }
, "0x000010EC":{
    "code":"ERROR_CLEANER_SLOT_NOT_SET"
  , "message":"A cleaner slot is not reserved."
  }
, "0x000010ED":{
    "code":"ERROR_CLEANER_CARTRIDGE_SPENT"
  , "message":"The cleaner cartridge has performed the maximum number of drive cleanings."
  }
, "0x000010EE":{
    "code":"ERROR_UNEXPECTED_OMID"
  , "message":"Unexpected on-medium identifier."
  }
, "0x000010EF":{
    "code":"ERROR_CANT_DELETE_LAST_ITEM"
  , "message":"The last remaining item in this group or resource cannot be deleted."
  }
, "0x000010F0":{
    "code":"ERROR_MESSAGE_EXCEEDS_MAX_SIZE"
  , "message":"The message provided exceeds the maximum size allowed for this parameter."
  }
, "0x000010F1":{
    "code":"ERROR_VOLUME_CONTAINS_SYS_FILES"
  , "message":"The volume contains system or paging files."
  }
, "0x000010F2":{
    "code":"ERROR_INDIGENOUS_TYPE"
  , "message":"The media type cannot be removed from this library because at least one drive in the library reports it can support this media type."
  }
, "0x000010F3":{
    "code":"ERROR_NO_SUPPORTING_DRIVES"
  , "message":"This offline media cannot be mounted on this system because no enabled drives are present that can be used."
  }
, "0x000010F4":{
    "code":"ERROR_CLEANER_CARTRIDGE_INSTALLED"
  , "message":"A cleaner cartridge is present in the tape library."
  }
, "0x000010F5":{
    "code":"ERROR_IEPORT_FULL"
  , "message":"Cannot use the IEport because it is not empty."
  }
, "0x000010FE":{
    "code":"ERROR_FILE_OFFLINE"
  , "message":"The remote storage service was not able to recall the file."
  }
, "0x000010FF":{
    "code":"ERROR_REMOTE_STORAGE_NOT_ACTIVE"
  , "message":"The remote storage service is not operational at this time."
  }
, "0x00001100":{
    "code":"ERROR_REMOTE_STORAGE_MEDIA_ERROR"
  , "message":"The remote storage service encountered a media error."
  }
, "0x00001126":{
    "code":"ERROR_NOT_A_REPARSE_POINT"
  , "message":"The file or directory is not a reparse point."
  }
, "0x00001127":{
    "code":"ERROR_REPARSE_ATTRIBUTE_CONFLICT"
  , "message":"The reparse point attribute cannot be set because it conflicts with an existing attribute."
  }
, "0x00001128":{
    "code":"ERROR_INVALID_REPARSE_DATA"
  , "message":"The data present in the reparse point buffer is invalid."
  }
, "0x00001129":{
    "code":"ERROR_REPARSE_TAG_INVALID"
  , "message":"The tag present in the reparse point buffer is invalid."
  }
, "0x0000112A":{
    "code":"ERROR_REPARSE_TAG_MISMATCH"
  , "message":"There is a mismatch between the tag specified in the request and the tag present in the reparse point."
  }
, "0x00001194":{
    "code":"ERROR_VOLUME_NOT_SIS_ENABLED"
  , "message":"Single Instance Storage (SIS) is not available on this volume."
  }
, "0x00001389":{
    "code":"ERROR_DEPENDENT_RESOURCE_EXISTS"
  , "message":"The operation cannot be completed because other resources depend on this resource."
  }
, "0x0000138A":{
    "code":"ERROR_DEPENDENCY_NOT_FOUND"
  , "message":"The cluster resource dependency cannot be found."
  }
, "0x0000138B":{
    "code":"ERROR_DEPENDENCY_ALREADY_EXISTS"
  , "message":"The cluster resource cannot be made dependent on the specified resource because it is already dependent."
  }
, "0x0000138C":{
    "code":"ERROR_RESOURCE_NOT_ONLINE"
  , "message":"The cluster resource is not online."
  }
, "0x0000138D":{
    "code":"ERROR_HOST_NODE_NOT_AVAILABLE"
  , "message":"A cluster node is not available for this operation."
  }
, "0x0000138E":{
    "code":"ERROR_RESOURCE_NOT_AVAILABLE"
  , "message":"The cluster resource is not available."
  }
, "0x0000138F":{
    "code":"ERROR_RESOURCE_NOT_FOUND"
  , "message":"The cluster resource could not be found."
  }
, "0x00001390":{
    "code":"ERROR_SHUTDOWN_CLUSTER"
  , "message":"The cluster is being shut down."
  }
, "0x00001391":{
    "code":"ERROR_CANT_EVICT_ACTIVE_NODE"
  , "message":"A cluster node cannot be evicted from the cluster unless the node is down or it is the last node."
  }
, "0x00001392":{
    "code":"ERROR_OBJECT_ALREADY_EXISTS"
  , "message":"The object already exists."
  }
, "0x00001393":{
    "code":"ERROR_OBJECT_IN_LIST"
  , "message":"The object is already in the list."
  }
, "0x00001394":{
    "code":"ERROR_GROUP_NOT_AVAILABLE"
  , "message":"The cluster group is not available for any new requests."
  }
, "0x00001395":{
    "code":"ERROR_GROUP_NOT_FOUND"
  , "message":"The cluster group could not be found."
  }
, "0x00001396":{
    "code":"ERROR_GROUP_NOT_ONLINE"
  , "message":"The operation could not be completed because the cluster group is not online."
  }
, "0x00001397":{
    "code":"ERROR_HOST_NODE_NOT_RESOURCE_OWNER"
  , "message":"The operation failed because either the specified cluster node is not the owner of the resource, or the node is not a possible owner of the resource."
  }
, "0x00001398":{
    "code":"ERROR_HOST_NODE_NOT_GROUP_OWNER"
  , "message":"The operation failed because either the specified cluster node is not the owner of the group, or the node is not a possible owner of the group."
  }
, "0x00001399":{
    "code":"ERROR_RESMON_CREATE_FAILED"
  , "message":"The cluster resource could not be created in the specified resource monitor."
  }
, "0x0000139A":{
    "code":"ERROR_RESMON_ONLINE_FAILED"
  , "message":"The cluster resource could not be brought online by the resource monitor."
  }
, "0x0000139B":{
    "code":"ERROR_RESOURCE_ONLINE"
  , "message":"The operation could not be completed because the cluster resource is online."
  }
, "0x0000139C":{
    "code":"ERROR_QUORUM_RESOURCE"
  , "message":"The cluster resource could not be deleted or brought offline because it is the quorum resource."
  }
, "0x0000139D":{
    "code":"ERROR_NOT_QUORUM_CAPABLE"
  , "message":"The cluster could not make the specified resource a quorum resource because it is not capable of being a quorum resource."
  }
, "0x0000139E":{
    "code":"ERROR_CLUSTER_SHUTTING_DOWN"
  , "message":"The cluster software is shutting down."
  }
, "0x0000139F":{
    "code":"ERROR_INVALID_STATE"
  , "message":"The group or resource is not in the correct state to perform the requested operation."
  }
, "0x000013A0":{
    "code":"ERROR_RESOURCE_PROPERTIES_STORED"
  , "message":"The properties were stored but not all changes will take effect until the next time the resource is brought online."
  }
, "0x000013A1":{
    "code":"ERROR_NOT_QUORUM_CLASS"
  , "message":"The cluster could not make the specified resource a quorum resource because it does not belong to a shared storage class."
  }
, "0x000013A2":{
    "code":"ERROR_CORE_RESOURCE"
  , "message":"The cluster resource could not be deleted because it is a core resource."
  }
, "0x000013A3":{
    "code":"ERROR_QUORUM_RESOURCE_ONLINE_FAILED"
  , "message":"The quorum resource failed to come online."
  }
, "0x000013A4":{
    "code":"ERROR_QUORUMLOG_OPEN_FAILED"
  , "message":"The quorum log could not be created or mounted successfully."
  }
, "0x000013A5":{
    "code":"ERROR_CLUSTERLOG_CORRUPT"
  , "message":"The cluster log is corrupt."
  }
, "0x000013A6":{
    "code":"ERROR_CLUSTERLOG_RECORD_EXCEEDS_MAXSIZE"
  , "message":"The record could not be written to the cluster log because it exceeds the maximum size."
  }
, "0x000013A7":{
    "code":"ERROR_CLUSTERLOG_EXCEEDS_MAXSIZE"
  , "message":"The cluster log exceeds its maximum size."
  }
, "0x000013A8":{
    "code":"ERROR_CLUSTERLOG_CHKPOINT_NOT_FOUND"
  , "message":"No checkpoint record was found in the cluster log."
  }
, "0x000013A9":{
    "code":"ERROR_CLUSTERLOG_NOT_ENOUGH_SPACE"
  , "message":"The minimum required disk space needed for logging is not available."
  }
, "0x000013AA":{
    "code":"ERROR_QUORUM_OWNER_ALIVE"
  , "message":"The cluster node failed to take control of the quorum resource because the resource is owned by another active node."
  }
, "0x000013AB":{
    "code":"ERROR_NETWORK_NOT_AVAILABLE"
  , "message":"A cluster network is not available for this operation."
  }
, "0x000013AC":{
    "code":"ERROR_NODE_NOT_AVAILABLE"
  , "message":"A cluster node is not available for this operation."
  }
, "0x000013AD":{
    "code":"ERROR_ALL_NODES_NOT_AVAILABLE"
  , "message":"All cluster nodes must be running to perform this operation."
  }
, "0x000013AE":{
    "code":"ERROR_RESOURCE_FAILED"
  , "message":"A cluster resource failed."
  }
, "0x000013AF":{
    "code":"ERROR_CLUSTER_INVALID_NODE"
  , "message":"The cluster node is not valid."
  }
, "0x000013B0":{
    "code":"ERROR_CLUSTER_NODE_EXISTS"
  , "message":"The cluster node already exists."
  }
, "0x000013B1":{
    "code":"ERROR_CLUSTER_JOIN_IN_PROGRESS"
  , "message":"A node is in the process of joining the cluster."
  }
, "0x000013B2":{
    "code":"ERROR_CLUSTER_NODE_NOT_FOUND"
  , "message":"The cluster node was not found."
  }
, "0x000013B3":{
    "code":"ERROR_CLUSTER_LOCAL_NODE_NOT_FOUND"
  , "message":"The cluster local node information was not found."
  }
, "0x000013B4":{
    "code":"ERROR_CLUSTER_NETWORK_EXISTS"
  , "message":"The cluster network already exists."
  }
, "0x000013B5":{
    "code":"ERROR_CLUSTER_NETWORK_NOT_FOUND"
  , "message":"The cluster network was not found."
  }
, "0x000013B6":{
    "code":"ERROR_CLUSTER_NETINTERFACE_EXISTS"
  , "message":"The cluster network interface already exists."
  }
, "0x000013B7":{
    "code":"ERROR_CLUSTER_NETINTERFACE_NOT_FOUND"
  , "message":"The cluster network interface was not found."
  }
, "0x000013B8":{
    "code":"ERROR_CLUSTER_INVALID_REQUEST"
  , "message":"The cluster request is not valid for this object."
  }
, "0x000013B9":{
    "code":"ERROR_CLUSTER_INVALID_NETWORK_PROVIDER"
  , "message":"The cluster network provider is not valid."
  }
, "0x000013BA":{
    "code":"ERROR_CLUSTER_NODE_DOWN"
  , "message":"The cluster node is down."
  }
, "0x000013BB":{
    "code":"ERROR_CLUSTER_NODE_UNREACHABLE"
  , "message":"The cluster node is not reachable."
  }
, "0x000013BC":{
    "code":"ERROR_CLUSTER_NODE_NOT_MEMBER"
  , "message":"The cluster node is not a member of the cluster."
  }
, "0x000013BD":{
    "code":"ERROR_CLUSTER_JOIN_NOT_IN_PROGRESS"
  , "message":"A cluster join operation is not in progress."
  }
, "0x000013BE":{
    "code":"ERROR_CLUSTER_INVALID_NETWORK"
  , "message":"The cluster network is not valid."
  }
, "0x000013C0":{
    "code":"ERROR_CLUSTER_NODE_UP"
  , "message":"The cluster node is up."
  }
, "0x000013C1":{
    "code":"ERROR_CLUSTER_IPADDR_IN_USE"
  , "message":"The cluster IP address is already in use."
  }
, "0x000013C2":{
    "code":"ERROR_CLUSTER_NODE_NOT_PAUSED"
  , "message":"The cluster node is not paused."
  }
, "0x000013C3":{
    "code":"ERROR_CLUSTER_NO_SECURITY_CONTEXT"
  , "message":"No cluster security context is available."
  }
, "0x000013C4":{
    "code":"ERROR_CLUSTER_NETWORK_NOT_INTERNAL"
  , "message":"The cluster network is not configured for internal cluster communication."
  }
, "0x000013C5":{
    "code":"ERROR_CLUSTER_NODE_ALREADY_UP"
  , "message":"The cluster node is already up."
  }
, "0x000013C6":{
    "code":"ERROR_CLUSTER_NODE_ALREADY_DOWN"
  , "message":"The cluster node is already down."
  }
, "0x000013C7":{
    "code":"ERROR_CLUSTER_NETWORK_ALREADY_ONLINE"
  , "message":"The cluster network is already online."
  }
, "0x000013C8":{
    "code":"ERROR_CLUSTER_NETWORK_ALREADY_OFFLINE"
  , "message":"The cluster network is already offline."
  }
, "0x000013C9":{
    "code":"ERROR_CLUSTER_NODE_ALREADY_MEMBER"
  , "message":"The cluster node is already a member of the cluster."
  }
, "0x000013CA":{
    "code":"ERROR_CLUSTER_LAST_INTERNAL_NETWORK"
  , "message":"The cluster network is the only one configured for internal cluster communication between two or more active cluster nodes. The internal communication capability cannot be removed from the network."
  }
, "0x000013CB":{
    "code":"ERROR_CLUSTER_NETWORK_HAS_DEPENDENTS"
  , "message":"One or more cluster resources depend on the network to provide service to clients. The client access capability cannot be removed from the network."
  }
, "0x000013CC":{
    "code":"ERROR_INVALID_OPERATION_ON_QUORUM"
  , "message":"This operation cannot be performed on the cluster resource because it is the quorum resource. You may not bring the quorum resource offline or modify its possible owners list."
  }
, "0x000013CD":{
    "code":"ERROR_DEPENDENCY_NOT_ALLOWED"
  , "message":"The cluster quorum resource is not allowed to have any dependencies."
  }
, "0x000013CE":{
    "code":"ERROR_CLUSTER_NODE_PAUSED"
  , "message":"The cluster node is paused."
  }
, "0x000013CF":{
    "code":"ERROR_NODE_CANT_HOST_RESOURCE"
  , "message":"The cluster resource cannot be brought online. The owner node cannot run this resource."
  }
, "0x000013D0":{
    "code":"ERROR_CLUSTER_NODE_NOT_READY"
  , "message":"The cluster node is not ready to perform the requested operation."
  }
, "0x000013D1":{
    "code":"ERROR_CLUSTER_NODE_SHUTTING_DOWN"
  , "message":"The cluster node is shutting down."
  }
, "0x000013D2":{
    "code":"ERROR_CLUSTER_JOIN_ABORTED"
  , "message":"The cluster join operation was aborted."
  }
, "0x000013D3":{
    "code":"ERROR_CLUSTER_INCOMPATIBLE_VERSIONS"
  , "message":"The cluster join operation failed due to incompatible software versions between the joining node and its sponsor."
  }
, "0x000013D4":{
    "code":"ERROR_CLUSTER_MAXNUM_OF_RESOURCES_EXCEEDED"
  , "message":"This resource cannot be created because the cluster has reached the limit on the number of resources it can monitor."
  }
, "0x000013D5":{
    "code":"ERROR_CLUSTER_SYSTEM_CONFIG_CHANGED"
  , "message":"The system configuration changed during the cluster join or form operation. The join or form operation was aborted."
  }
, "0x000013D6":{
    "code":"ERROR_CLUSTER_RESOURCE_TYPE_NOT_FOUND"
  , "message":"The specified resource type was not found."
  }
, "0x000013D7":{
    "code":"ERROR_CLUSTER_RESTYPE_NOT_SUPPORTED"
  , "message":"The specified node does not support a resource of this type. This may be due to version inconsistencies or due to the absence of the resource DLL on this node."
  }
, "0x000013D8":{
    "code":"ERROR_CLUSTER_RESNAME_NOT_FOUND"
  , "message":"The specified resource name is not supported by this resource DLL. This may be due to a bad (or changed) name supplied to the resource DLL."
  }
, "0x000013D9":{
    "code":"ERROR_CLUSTER_NO_RPC_PACKAGES_REGISTERED"
  , "message":"No authentication package could be registered with the RPC server."
  }
, "0x000013DA":{
    "code":"ERROR_CLUSTER_OWNER_NOT_IN_PREFLIST"
  , "message":"You cannot bring the group online because the owner of the group is not in the preferred list for the group. To change the owner node for the group, move the group."
  }
, "0x000013DB":{
    "code":"ERROR_CLUSTER_DATABASE_SEQMISMATCH"
  , "message":"The join operation failed because the cluster database sequence number has changed or is incompatible with the locker node. This may happen during a join operation if the cluster database was changing during the join."
  }
, "0x000013DC":{
    "code":"ERROR_RESMON_INVALID_STATE"
  , "message":"The resource monitor will not allow the fail operation to be performed while the resource is in its current state. This may happen if the resource is in a pending state."
  }
, "0x000013DD":{
    "code":"ERROR_CLUSTER_GUM_NOT_LOCKER"
  , "message":"A non-locker code received a request to reserve the lock for making global updates."
  }
, "0x000013DE":{
    "code":"ERROR_QUORUM_DISK_NOT_FOUND"
  , "message":"The quorum disk could not be located by the cluster service."
  }
, "0x000013DF":{
    "code":"ERROR_DATABASE_BACKUP_CORRUPT"
  , "message":"The backed-up cluster database is possibly corrupt."
  }
, "0x000013E0":{
    "code":"ERROR_CLUSTER_NODE_ALREADY_HAS_DFS_ROOT"
  , "message":"A DFS root already exists in this cluster node."
  }
, "0x000013E1":{
    "code":"ERROR_RESOURCE_PROPERTY_UNCHANGEABLE"
  , "message":"An attempt to modify a resource property failed because it conflicts with another existing property."
  }
, "0x00001702":{
    "code":"ERROR_CLUSTER_MEMBERSHIP_INVALID_STATE"
  , "message":"An operation was attempted that is incompatible with the current membership state of the node."
  }
, "0x00001703":{
    "code":"ERROR_CLUSTER_QUORUMLOG_NOT_FOUND"
  , "message":"The quorum resource does not contain the quorum log."
  }
, "0x00001704":{
    "code":"ERROR_CLUSTER_MEMBERSHIP_HALT"
  , "message":"The membership engine requested shutdown of the cluster service on this node."
  }
, "0x00001705":{
    "code":"ERROR_CLUSTER_INSTANCE_ID_MISMATCH"
  , "message":"The join operation failed because the cluster instance ID of the joining node does not match the cluster instance ID of the sponsor node."
  }
, "0x00001706":{
    "code":"ERROR_CLUSTER_NETWORK_NOT_FOUND_FOR_IP"
  , "message":"A matching cluster network for the specified IP address could not be found."
  }
, "0x00001707":{
    "code":"ERROR_CLUSTER_PROPERTY_DATA_TYPE_MISMATCH"
  , "message":"The actual data type of the property did not match the expected data type of the property."
  }
, "0x00001708":{
    "code":"ERROR_CLUSTER_EVICT_WITHOUT_CLEANUP"
  , "message":"The cluster node was evicted from the cluster successfully, but the node was not cleaned up. To determine what clean-up steps failed and how to recover, see the Failover Clustering application event log using Event Viewer."
  }
, "0x00001709":{
    "code":"ERROR_CLUSTER_PARAMETER_MISMATCH"
  , "message":"Two or more parameter values specified for a resource\'s properties are in conflict."
  }
, "0x0000170A":{
    "code":"ERROR_NODE_CANNOT_BE_CLUSTERED"
  , "message":"This computer cannot be made a member of a cluster."
  }
, "0x0000170B":{
    "code":"ERROR_CLUSTER_WRONG_OS_VERSION"
  , "message":"This computer cannot be made a member of a cluster because it does not have the correct version of Windows installed."
  }
, "0x0000170C":{
    "code":"ERROR_CLUSTER_CANT_CREATE_DUP_CLUSTER_NAME"
  , "message":"A cluster cannot be created with the specified cluster name because that cluster name is already in use. Specify a different name for the cluster."
  }
, "0x0000170D":{
    "code":"ERROR_CLUSCFG_ALREADY_COMMITTED"
  , "message":"The cluster configuration action has already been committed."
  }
, "0x0000170E":{
    "code":"ERROR_CLUSCFG_ROLLBACK_FAILED"
  , "message":"The cluster configuration action could not be rolled back."
  }
, "0x0000170F":{
    "code":"ERROR_CLUSCFG_SYSTEM_DISK_DRIVE_LETTER_CONFLICT"
  , "message":"The drive letter assigned to a system disk on one node conflicted with the drive letter assigned to a disk on another node."
  }
, "0x00001710":{
    "code":"ERROR_CLUSTER_OLD_VERSION"
  , "message":"One or more nodes in the cluster are running a version of Windows that does not support this operation."
  }
, "0x00001711":{
    "code":"ERROR_CLUSTER_MISMATCHED_COMPUTER_ACCT_NAME"
  , "message":"The name of the corresponding computer account does not match the network name for this resource."
  }
, "0x00001712":{
    "code":"ERROR_CLUSTER_NO_NET_ADAPTERS"
  , "message":"No network adapters are available."
  }
, "0x00001713":{
    "code":"ERROR_CLUSTER_POISONED"
  , "message":"The cluster node has been poisoned."
  }
, "0x00001714":{
    "code":"ERROR_CLUSTER_GROUP_MOVING"
  , "message":"The group is unable to accept the request because it is moving to another node."
  }
, "0x00001715":{
    "code":"ERROR_CLUSTER_RESOURCE_TYPE_BUSY"
  , "message":"The resource type cannot accept the request because it is too busy performing another operation."
  }
, "0x00001716":{
    "code":"ERROR_RESOURCE_CALL_TIMED_OUT"
  , "message":"The call to the cluster resource DLL timed out."
  }
, "0x00001717":{
    "code":"ERROR_INVALID_CLUSTER_IPV6_ADDRESS"
  , "message":"The address is not valid for an IPv6 Address resource. A global IPv6 address is required, and it must match a cluster network. Compatibility addresses are not permitted."
  }
, "0x00001718":{
    "code":"ERROR_CLUSTER_INTERNAL_INVALID_FUNCTION"
  , "message":"An internal cluster error occurred. A call to an invalid function was attempted."
  }
, "0x00001719":{
    "code":"ERROR_CLUSTER_PARAMETER_OUT_OF_BOUNDS"
  , "message":"A parameter value is out of acceptable range."
  }
, "0x0000171A":{
    "code":"ERROR_CLUSTER_PARTIAL_SEND"
  , "message":"A network error occurred while sending data to another node in the cluster. The number of bytes transmitted was less than required."
  }
, "0x0000171B":{
    "code":"ERROR_CLUSTER_REGISTRY_INVALID_FUNCTION"
  , "message":"An invalid cluster registry operation was attempted."
  }
, "0x0000171C":{
    "code":"ERROR_CLUSTER_INVALID_STRING_TERMINATION"
  , "message":"An input string of characters is not properly terminated."
  }
, "0x0000171D":{
    "code":"ERROR_CLUSTER_INVALID_STRING_FORMAT"
  , "message":"An input string of characters is not in a valid format for the data it represents."
  }
, "0x0000171E":{
    "code":"ERROR_CLUSTER_DATABASE_TRANSACTION_IN_PROGRESS"
  , "message":"An internal cluster error occurred. A cluster database transaction was attempted while a transaction was already in progress."
  }
, "0x0000171F":{
    "code":"ERROR_CLUSTER_DATABASE_TRANSACTION_NOT_IN_PROGRESS"
  , "message":"An internal cluster error occurred. There was an attempt to commit a cluster database transaction while no transaction was in progress."
  }
, "0x00001720":{
    "code":"ERROR_CLUSTER_NULL_DATA"
  , "message":"An internal cluster error occurred. Data was not properly initialized."
  }
, "0x00001721":{
    "code":"ERROR_CLUSTER_PARTIAL_READ"
  , "message":"An error occurred while reading from a stream of data. An unexpected number of bytes was returned."
  }
, "0x00001722":{
    "code":"ERROR_CLUSTER_PARTIAL_WRITE"
  , "message":"An error occurred while writing to a stream of data. The required number of bytes could not be written."
  }
, "0x00001723":{
    "code":"ERROR_CLUSTER_CANT_DESERIALIZE_DATA"
  , "message":"An error occurred while deserializing a stream of cluster data."
  }
, "0x00001724":{
    "code":"ERROR_DEPENDENT_RESOURCE_PROPERTY_CONFLICT"
  , "message":"One or more property values for this resource are in conflict with one or more property values associated with its dependent resources."
  }
, "0x00001725":{
    "code":"ERROR_CLUSTER_NO_QUORUM"
  , "message":"A quorum of cluster nodes was not present to form a cluster."
  }
, "0x00001726":{
    "code":"ERROR_CLUSTER_INVALID_IPV6_NETWORK"
  , "message":"The cluster network is not valid for an IPv6 address resource, or it does not match the configured address."
  }
, "0x00001727":{
    "code":"ERROR_CLUSTER_INVALID_IPV6_TUNNEL_NETWORK"
  , "message":"The cluster network is not valid for an IPv6 tunnel resource. Check the configuration of the IP Address resource on which the IPv6 tunnel resource depends."
  }
, "0x00001728":{
    "code":"ERROR_QUORUM_NOT_ALLOWED_IN_THIS_GROUP"
  , "message":"Quorum resource cannot reside in the available storage group."
  }
, "0x00001770":{
    "code":"ERROR_ENCRYPTION_FAILED"
  , "message":"The specified file could not be encrypted."
  }
, "0x00001771":{
    "code":"ERROR_DECRYPTION_FAILED"
  , "message":"The specified file could not be decrypted."
  }
, "0x00001772":{
    "code":"ERROR_FILE_ENCRYPTED"
  , "message":"The specified file is encrypted and the user does not have the ability to decrypt it."
  }
, "0x00001773":{
    "code":"ERROR_NO_RECOVERY_POLICY"
  , "message":"There is no valid encryption recovery policy configured for this system."
  }
, "0x00001774":{
    "code":"ERROR_NO_EFS"
  , "message":"The required encryption driver is not loaded for this system."
  }
, "0x00001775":{
    "code":"ERROR_WRONG_EFS"
  , "message":"The file was encrypted with a different encryption driver than is currently loaded."
  }
, "0x00001776":{
    "code":"ERROR_NO_USER_KEYS"
  , "message":"There are no Encrypting File System (EFS) keys defined for the user."
  }
, "0x00001777":{
    "code":"ERROR_FILE_NOT_ENCRYPTED"
  , "message":"The specified file is not encrypted."
  }
, "0x00001778":{
    "code":"ERROR_NOT_EXPORT_FORMAT"
  , "message":"The specified file is not in the defined EFS export format."
  }
, "0x00001779":{
    "code":"ERROR_FILE_READ_ONLY"
  , "message":"The specified file is read-only."
  }
, "0x0000177A":{
    "code":"ERROR_DIR_EFS_DISALLOWED"
  , "message":"The directory has been disabled for encryption."
  }
, "0x0000177B":{
    "code":"ERROR_EFS_SERVER_NOT_TRUSTED"
  , "message":"The server is not trusted for remote encryption operation."
  }
, "0x0000177C":{
    "code":"ERROR_BAD_RECOVERY_POLICY"
  , "message":"Recovery policy configured for this system contains invalid recovery certificate."
  }
, "0x0000177D":{
    "code":"ERROR_EFS_ALG_BLOB_TOO_BIG"
  , "message":"The encryption algorithm used on the source file needs a bigger key buffer than the one on the destination file."
  }
, "0x0000177E":{
    "code":"ERROR_VOLUME_NOT_SUPPORT_EFS"
  , "message":"The disk partition does not support file encryption."
  }
, "0x0000177F":{
    "code":"ERROR_EFS_DISABLED"
  , "message":"This machine is disabled for file encryption."
  }
, "0x00001780":{
    "code":"ERROR_EFS_VERSION_NOT_SUPPORT"
  , "message":"A newer system is required to decrypt this encrypted file."
  }
, "0x00001781":{
    "code":"ERROR_CS_ENCRYPTION_INVALID_SERVER_RESPONSE"
  , "message":"The remote server sent an invalid response for a file being opened with client-side encryption."
  }
, "0x00001782":{
    "code":"ERROR_CS_ENCRYPTION_UNSUPPORTED_SERVER"
  , "message":"Client-side encryption is not supported by the remote server even though it claims to support it."
  }
, "0x00001783":{
    "code":"ERROR_CS_ENCRYPTION_EXISTING_ENCRYPTED_FILE"
  , "message":"File is encrypted and should be opened in client-side encryption mode."
  }
, "0x00001784":{
    "code":"ERROR_CS_ENCRYPTION_NEW_ENCRYPTED_FILE"
  , "message":"A new encrypted file is being created and a $EFS needs to be provided."
  }
, "0x00001785":{
    "code":"ERROR_CS_ENCRYPTION_FILE_NOT_CSE"
  , "message":"The SMB client requested a client-side extension (CSE) file system control (FSCTL) on a non-CSE file."
  }
, "0x000017E6":{
    "code":"ERROR_NO_BROWSER_SERVERS_FOUND"
  , "message":"The list of servers for this workgroup is not currently available"
  }
, "0x00001838":{
    "code":"SCHED_E_SERVICE_NOT_LOCALSYSTEM"
  , "message":"The Task Scheduler service must be configured to run in the System account to function properly. Individual tasks may be configured to run in other accounts."
  }
, "0x000019C8":{
    "code":"ERROR_LOG_SECTOR_INVALID"
  , "message":"The log service encountered an invalid log sector."
  }
, "0x000019C9":{
    "code":"ERROR_LOG_SECTOR_PARITY_INVALID"
  , "message":"The log service encountered a log sector with invalid block parity."
  }
, "0x000019CA":{
    "code":"ERROR_LOG_SECTOR_REMAPPED"
  , "message":"The log service encountered a remapped log sector."
  }
, "0x000019CB":{
    "code":"ERROR_LOG_BLOCK_INCOMPLETE"
  , "message":"The log service encountered a partial or incomplete log block."
  }
, "0x000019CC":{
    "code":"ERROR_LOG_INVALID_RANGE"
  , "message":"The log service encountered an attempt to access data outside the active log range."
  }
, "0x000019CD":{
    "code":"ERROR_LOG_BLOCKS_EXHAUSTED"
  , "message":"The log service user marshaling buffers are exhausted."
  }
, "0x000019CE":{
    "code":"ERROR_LOG_READ_CONTEXT_INVALID"
  , "message":"The log service encountered an attempt to read from a marshaling area with an invalid read context."
  }
, "0x000019CF":{
    "code":"ERROR_LOG_RESTART_INVALID"
  , "message":"The log service encountered an invalid log restart area."
  }
, "0x000019D0":{
    "code":"ERROR_LOG_BLOCK_VERSION"
  , "message":"The log service encountered an invalid log block version."
  }
, "0x000019D1":{
    "code":"ERROR_LOG_BLOCK_INVALID"
  , "message":"The log service encountered an invalid log block."
  }
, "0x000019D2":{
    "code":"ERROR_LOG_READ_MODE_INVALID"
  , "message":"The log service encountered an attempt to read the log with an invalid read mode."
  }
, "0x000019D3":{
    "code":"ERROR_LOG_NO_RESTART"
  , "message":"The log service encountered a log stream with no restart area."
  }
, "0x000019D4":{
    "code":"ERROR_LOG_METADATA_CORRUPT"
  , "message":"The log service encountered a corrupted metadata file."
  }
, "0x000019D5":{
    "code":"ERROR_LOG_METADATA_INVALID"
  , "message":"The log service encountered a metadata file that could not be created by the log file system."
  }
, "0x000019D6":{
    "code":"ERROR_LOG_METADATA_INCONSISTENT"
  , "message":"The log service encountered a metadata file with inconsistent data."
  }
, "0x000019D7":{
    "code":"ERROR_LOG_RESERVATION_INVALID"
  , "message":"The log service encountered an attempt to erroneous allocate or dispose reservation space."
  }
, "0x000019D8":{
    "code":"ERROR_LOG_CANT_DELETE"
  , "message":"The log service cannot delete a log file or file system container."
  }
, "0x000019D9":{
    "code":"ERROR_LOG_CONTAINER_LIMIT_EXCEEDED"
  , "message":"The log service has reached the maximum allowable containers allocated to a log file."
  }
, "0x000019DA":{
    "code":"ERROR_LOG_START_OF_LOG"
  , "message":"The log service has attempted to read or write backward past the start of the log."
  }
, "0x000019DB":{
    "code":"ERROR_LOG_POLICY_ALREADY_INSTALLED"
  , "message":"The log policy could not be installed because a policy of the same type is already present."
  }
, "0x000019DC":{
    "code":"ERROR_LOG_POLICY_NOT_INSTALLED"
  , "message":"The log policy in question was not installed at the time of the request."
  }
, "0x000019DD":{
    "code":"ERROR_LOG_POLICY_INVALID"
  , "message":"The installed set of policies on the log is invalid."
  }
, "0x000019DE":{
    "code":"ERROR_LOG_POLICY_CONFLICT"
  , "message":"A policy on the log in question prevented the operation from completing."
  }
, "0x000019DF":{
    "code":"ERROR_LOG_PINNED_ARCHIVE_TAIL"
  , "message":"Log space cannot be reclaimed because the log is pinned by the archive tail."
  }
, "0x000019E0":{
    "code":"ERROR_LOG_RECORD_NONEXISTENT"
  , "message":"The log record is not a record in the log file."
  }
, "0x000019E1":{
    "code":"ERROR_LOG_RECORDS_RESERVED_INVALID"
  , "message":"The number of reserved log records or the adjustment of the number of reserved log records is invalid."
  }
, "0x000019E2":{
    "code":"ERROR_LOG_SPACE_RESERVED_INVALID"
  , "message":"The reserved log space or the adjustment of the log space is invalid."
  }
, "0x000019E3":{
    "code":"ERROR_LOG_TAIL_INVALID"
  , "message":"A new or existing archive tail or base of the active log is invalid."
  }
, "0x000019E4":{
    "code":"ERROR_LOG_FULL"
  , "message":"The log space is exhausted."
  }
, "0x000019E5":{
    "code":"ERROR_COULD_NOT_RESIZE_LOG"
  , "message":"The log could not be set to the requested size."
  }
, "0x000019E6":{
    "code":"ERROR_LOG_MULTIPLEXED"
  , "message":"The log is multiplexed; no direct writes to the physical log are allowed."
  }
, "0x000019E7":{
    "code":"ERROR_LOG_DEDICATED"
  , "message":"The operation failed because the log is a dedicated log."
  }
, "0x000019E8":{
    "code":"ERROR_LOG_ARCHIVE_NOT_IN_PROGRESS"
  , "message":"The operation requires an archive context."
  }
, "0x000019E9":{
    "code":"ERROR_LOG_ARCHIVE_IN_PROGRESS"
  , "message":"Log archival is in progress."
  }
, "0x000019EA":{
    "code":"ERROR_LOG_EPHEMERAL"
  , "message":"The operation requires a non-ephemeral log, but the log is ephemeral."
  }
, "0x000019EB":{
    "code":"ERROR_LOG_NOT_ENOUGH_CONTAINERS"
  , "message":"The log must have at least two containers before it can be read from or written to."
  }
, "0x000019EC":{
    "code":"ERROR_LOG_CLIENT_ALREADY_REGISTERED"
  , "message":"A log client has already registered on the stream."
  }
, "0x000019ED":{
    "code":"ERROR_LOG_CLIENT_NOT_REGISTERED"
  , "message":"A log client has not been registered on the stream."
  }
, "0x000019EE":{
    "code":"ERROR_LOG_FULL_HANDLER_IN_PROGRESS"
  , "message":"A request has already been made to handle the log full condition."
  }
, "0x000019EF":{
    "code":"ERROR_LOG_CONTAINER_READ_FAILED"
  , "message":"The log service encountered an error when attempting to read from a log container."
  }
, "0x000019F0":{
    "code":"ERROR_LOG_CONTAINER_WRITE_FAILED"
  , "message":"The log service encountered an error when attempting to write to a log container."
  }
, "0x000019F1":{
    "code":"ERROR_LOG_CONTAINER_OPEN_FAILED"
  , "message":"The log service encountered an error when attempting to open a log container."
  }
, "0x000019F2":{
    "code":"ERROR_LOG_CONTAINER_STATE_INVALID"
  , "message":"The log service encountered an invalid container state when attempting a requested action."
  }
, "0x000019F3":{
    "code":"ERROR_LOG_STATE_INVALID"
  , "message":"The log service is not in the correct state to perform a requested action."
  }
, "0x000019F4":{
    "code":"ERROR_LOG_PINNED"
  , "message":"The log space cannot be reclaimed because the log is pinned."
  }
, "0x000019F5":{
    "code":"ERROR_LOG_METADATA_FLUSH_FAILED"
  , "message":"The log metadata flush failed."
  }
, "0x000019F6":{
    "code":"ERROR_LOG_INCONSISTENT_SECURITY"
  , "message":"Security on the log and its containers is inconsistent."
  }
, "0x000019F7":{
    "code":"ERROR_LOG_APPENDED_FLUSH_FAILED"
  , "message":"Records were appended to the log or reservation changes were made, but the log could not be flushed."
  }
, "0x000019F8":{
    "code":"ERROR_LOG_PINNED_RESERVATION"
  , "message":"The log is pinned due to reservation consuming most of the log space. Free some reserved records to make space available."
  }
, "0x00001A2C":{
    "code":"ERROR_INVALID_TRANSACTION"
  , "message":"The transaction handle associated with this operation is not valid."
  }
, "0x00001A2D":{
    "code":"ERROR_TRANSACTION_NOT_ACTIVE"
  , "message":"The requested operation was made in the context of a transaction that is no longer active."
  }
, "0x00001A2E":{
    "code":"ERROR_TRANSACTION_REQUEST_NOT_VALID"
  , "message":"The requested operation is not valid on the transaction object in its current state."
  }
, "0x00001A2F":{
    "code":"ERROR_TRANSACTION_NOT_REQUESTED"
  , "message":"The caller has called a response API, but the response is not expected because the transaction manager did not issue the corresponding request to the caller."
  }
, "0x00001A30":{
    "code":"ERROR_TRANSACTION_ALREADY_ABORTED"
  , "message":"It is too late to perform the requested operation because the transaction has already been aborted."
  }
, "0x00001A31":{
    "code":"ERROR_TRANSACTION_ALREADY_COMMITTED"
  , "message":"It is too late to perform the requested operation because the transaction has already been committed."
  }
, "0x00001A32":{
    "code":"ERROR_TM_INITIALIZATION_FAILED"
  , "message":"The transaction manager was unable to be successfully initialized. Transacted operations are not supported."
  }
, "0x00001A33":{
    "code":"ERROR_RESOURCEMANAGER_READ_ONLY"
  , "message":"The specified resource manager made no changes or updates to the resource under this transaction."
  }
, "0x00001A34":{
    "code":"ERROR_TRANSACTION_NOT_JOINED"
  , "message":"The resource manager has attempted to prepare a transaction that it has not successfully joined."
  }
, "0x00001A35":{
    "code":"ERROR_TRANSACTION_SUPERIOR_EXISTS"
  , "message":"The transaction object already has a superior enlistment, and the caller attempted an operation that would have created a new superior. Only a single superior enlistment is allowed."
  }
, "0x00001A36":{
    "code":"ERROR_CRM_PROTOCOL_ALREADY_EXISTS"
  , "message":"The resource manager tried to register a protocol that already exists."
  }
, "0x00001A37":{
    "code":"ERROR_TRANSACTION_PROPAGATION_FAILED"
  , "message":"The attempt to propagate the transaction failed."
  }
, "0x00001A38":{
    "code":"ERROR_CRM_PROTOCOL_NOT_FOUND"
  , "message":"The requested propagation protocol was not registered as a CRM."
  }
, "0x00001A39":{
    "code":"ERROR_TRANSACTION_INVALID_MARSHALL_BUFFER"
  , "message":"The buffer passed in to PushTransaction or PullTransaction is not in a valid format."
  }
, "0x00001A3A":{
    "code":"ERROR_CURRENT_TRANSACTION_NOT_VALID"
  , "message":"The current transaction context associated with the thread is not a valid handle to a transaction object."
  }
, "0x00001A3B":{
    "code":"ERROR_TRANSACTION_NOT_FOUND"
  , "message":"The specified transaction object could not be opened because it was not found."
  }
, "0x00001A3C":{
    "code":"ERROR_RESOURCEMANAGER_NOT_FOUND"
  , "message":"The specified resource manager object could not be opened because it was not found."
  }
, "0x00001A3D":{
    "code":"ERROR_ENLISTMENT_NOT_FOUND"
  , "message":"The specified enlistment object could not be opened because it was not found."
  }
, "0x00001A3E":{
    "code":"ERROR_TRANSACTIONMANAGER_NOT_FOUND"
  , "message":"The specified transaction manager object could not be opened because it was not found."
  }
, "0x00001A3F":{
    "code":"ERROR_TRANSACTIONMANAGER_NOT_ONLINE"
  , "message":"The specified resource manager was unable to create an enlistment because its associated transaction manager is not online."
  }
, "0x00001A40":{
    "code":"ERROR_TRANSACTIONMANAGER_RECOVERY_NAME_COLLISION"
  , "message":"The specified transaction manager was unable to create the objects contained in its log file in the ObjectB namespace. Therefore, the transaction manager was unable to recover."
  }
, "0x00001A90":{
    "code":"ERROR_TRANSACTIONAL_CONFLICT"
  , "message":"The function attempted to use a name that is reserved for use by another transaction."
  }
, "0x00001A91":{
    "code":"ERROR_RM_NOT_ACTIVE"
  , "message":"Transaction support within the specified file system resource manager is not started or was shut down due to an error."
  }
, "0x00001A92":{
    "code":"ERROR_RM_METADATA_CORRUPT"
  , "message":"The metadata of the resource manager has been corrupted. The resource manager will not function."
  }
, "0x00001A93":{
    "code":"ERROR_DIRECTORY_NOT_RM"
  , "message":"The specified directory does not contain a resource manager."
  }
, "0x00001A95":{
    "code":"ERROR_TRANSACTIONS_UNSUPPORTED_REMOTE"
  , "message":"The remote server or share does not support transacted file operations."
  }
, "0x00001A96":{
    "code":"ERROR_LOG_RESIZE_INVALID_SIZE"
  , "message":"The requested log size is invalid."
  }
, "0x00001A97":{
    "code":"ERROR_OBJECT_NO_LONGER_EXISTS"
  , "message":"The object (file, stream, link) corresponding to the handle has been deleted by a transaction savepoint rollback."
  }
, "0x00001A98":{
    "code":"ERROR_STREAM_MINIVERSION_NOT_FOUND"
  , "message":"The specified file miniversion was not found for this transacted file open."
  }
, "0x00001A99":{
    "code":"ERROR_STREAM_MINIVERSION_NOT_VALID"
  , "message":"The specified file miniversion was found but has been invalidated. The most likely cause is a transaction savepoint rollback."
  }
, "0x00001A9A":{
    "code":"ERROR_MINIVERSION_INACCESSIBLE_FROM_SPECIFIED_TRANSACTION"
  , "message":"A miniversion may only be opened in the context of the transaction that created it."
  }
, "0x00001A9B":{
    "code":"ERROR_CANT_OPEN_MINIVERSION_WITH_MODIFY_INTENT"
  , "message":"It is not possible to open a miniversion with modify access."
  }
, "0x00001A9C":{
    "code":"ERROR_CANT_CREATE_MORE_STREAM_MINIVERSIONS"
  , "message":"It is not possible to create any more miniversions for this stream."
  }
, "0x00001A9E":{
    "code":"ERROR_REMOTE_FILE_VERSION_MISMATCH"
  , "message":"The remote server sent mismatching version numbers or FID for a file opened with transactions."
  }
, "0x00001A9F":{
    "code":"ERROR_HANDLE_NO_LONGER_VALID"
  , "message":"The handle has been invalidated by a transaction. The most likely cause is the presence of memory mapping on a file, or an open handle when the transaction ended or rolled back to savepoint."
  }
, "0x00001AA0":{
    "code":"ERROR_NO_TXF_METADATA"
  , "message":"There is no transaction metadata on the file."
  }
, "0x00001AA1":{
    "code":"ERROR_LOG_CORRUPTION_DETECTED"
  , "message":"The log data is corrupt."
  }
, "0x00001AA2":{
    "code":"ERROR_CANT_RECOVER_WITH_HANDLE_OPEN"
  , "message":"The file cannot be recovered because a handle is still open on it."
  }
, "0x00001AA3":{
    "code":"ERROR_RM_DISCONNECTED"
  , "message":"The transaction outcome is unavailable because the resource manager responsible for it is disconnected."
  }
, "0x00001AA4":{
    "code":"ERROR_ENLISTMENT_NOT_SUPERIOR"
  , "message":"The request was rejected because the enlistment in question is not a superior enlistment."
  }
, "0x00001AA5":{
    "code":"ERROR_RECOVERY_NOT_NEEDED"
  , "message":"The transactional resource manager is already consistent. Recovery is not needed."
  }
, "0x00001AA6":{
    "code":"ERROR_RM_ALREADY_STARTED"
  , "message":"The transactional resource manager has already been started."
  }
, "0x00001AA7":{
    "code":"ERROR_FILE_IDENTITY_NOT_PERSISTENT"
  , "message":"The file cannot be opened in a transaction because its identity depends on the outcome of an unresolved transaction."
  }
, "0x00001AA8":{
    "code":"ERROR_CANT_BREAK_TRANSACTIONAL_DEPENDENCY"
  , "message":"The operation cannot be performed because another transaction is depending on the fact that this property will not change."
  }
, "0x00001AA9":{
    "code":"ERROR_CANT_CROSS_RM_BOUNDARY"
  , "message":"The operation would involve a single file with two transactional resource managers and is therefore not allowed."
  }
, "0x00001AAA":{
    "code":"ERROR_TXF_DIR_NOT_EMPTY"
  , "message":"The $Txf directory must be empty for this operation to succeed."
  }
, "0x00001AAB":{
    "code":"ERROR_INDOUBT_TRANSACTIONS_EXIST"
  , "message":"The operation would leave a transactional resource manager in an inconsistent state and is, therefore, not allowed."
  }
, "0x00001AAC":{
    "code":"ERROR_TM_VOLATILE"
  , "message":"The operation could not be completed because the transaction manager does not have a log."
  }
, "0x00001AAD":{
    "code":"ERROR_ROLLBACK_TIMER_EXPIRED"
  , "message":"A rollback could not be scheduled because a previously scheduled rollback has already been executed or is queued for execution."
  }
, "0x00001AAE":{
    "code":"ERROR_TXF_ATTRIBUTE_CORRUPT"
  , "message":"The transactional metadata attribute on the file or directory is corrupt and unreadable."
  }
, "0x00001AAF":{
    "code":"ERROR_EFS_NOT_ALLOWED_IN_TRANSACTION"
  , "message":"The encryption operation could not be completed because a transaction is active."
  }
, "0x00001AB0":{
    "code":"ERROR_TRANSACTIONAL_OPEN_NOT_ALLOWED"
  , "message":"This object is not allowed to be opened in a transaction."
  }
, "0x00001AB1":{
    "code":"ERROR_LOG_GROWTH_FAILED"
  , "message":"An attempt to create space in the transactional resource manager\'s log failed. The failure status has been recorded in the event log."
  }
, "0x00001AB2":{
    "code":"ERROR_TRANSACTED_MAPPING_UNSUPPORTED_REMOTE"
  , "message":"Memory mapping (creating a mapped section) to a remote file under a transaction is not supported."
  }
, "0x00001AB3":{
    "code":"ERROR_TXF_METADATA_ALREADY_PRESENT"
  , "message":"Transaction metadata is already present on this file and cannot be superseded."
  }
, "0x00001AB4":{
    "code":"ERROR_TRANSACTION_SCOPE_CALLBACKS_NOT_SET"
  , "message":"A transaction scope could not be entered because the scope handler has not been initialized."
  }
, "0x00001AB5":{
    "code":"ERROR_TRANSACTION_REQUIRED_PROMOTION"
  , "message":"Promotion was required to allow the resource manager to enlist, but the transaction was set to disallow it."
  }
, "0x00001AB6":{
    "code":"ERROR_CANNOT_EXECUTE_FILE_IN_TRANSACTION"
  , "message":"This file is open for modification in an unresolved transaction and may be opened for execution only by a transacted reader."
  }
, "0x00001AB7":{
    "code":"ERROR_TRANSACTIONS_NOT_FROZEN"
  , "message":"The request to thaw frozen transactions was ignored because transactions were not previously frozen."
  }
, "0x00001AB8":{
    "code":"ERROR_TRANSACTION_FREEZE_IN_PROGRESS"
  , "message":"Transactions cannot be frozen because a freeze is already in progress."
  }
, "0x00001AB9":{
    "code":"ERROR_NOT_SNAPSHOT_VOLUME"
  , "message":"The target volume is not a snapshot volume. This operation is only valid on a volume mounted as a snapshot."
  }
, "0x00001ABA":{
    "code":"ERROR_NO_SAVEPOINT_WITH_OPEN_FILES"
  , "message":"The savepoint operation failed because files are open on the transaction. This is not permitted."
  }
, "0x00001ABB":{
    "code":"ERROR_DATA_LOST_REPAIR"
  , "message":"Windows has discovered corruption in a file, and that file has since been repaired. Data loss may have occurred."
  }
, "0x00001ABC":{
    "code":"ERROR_SPARSE_NOT_ALLOWED_IN_TRANSACTION"
  , "message":"The sparse operation could not be completed because a transaction is active on the file."
  }
, "0x00001ABD":{
    "code":"ERROR_TM_IDENTITY_MISMATCH"
  , "message":"The call to create a transaction manager object failed because the Tm Identity stored in the logfile does not match the Tm Identity that was passed in as an argument."
  }
, "0x00001ABE":{
    "code":"ERROR_FLOATED_SECTION"
  , "message":"I/O was attempted on a section object that has been floated as a result of a transaction ending. There is no valid data."
  }
, "0x00001ABF":{
    "code":"ERROR_CANNOT_ACCEPT_TRANSACTED_WORK"
  , "message":"The transactional resource manager cannot currently accept transacted work due to a transient condition, such as low resources."
  }
, "0x00001AC0":{
    "code":"ERROR_CANNOT_ABORT_TRANSACTIONS"
  , "message":"The transactional resource manager had too many transactions outstanding that could not be aborted. The transactional resource manager has been shut down."
  }
, "0x00001B59":{
    "code":"ERROR_CTX_WINSTATION_NAME_INVALID"
  , "message":"The specified session name is invalid."
  }
, "0x00001B5A":{
    "code":"ERROR_CTX_INVALID_PD"
  , "message":"The specified protocol driver is invalid."
  }
, "0x00001B5B":{
    "code":"ERROR_CTX_PD_NOT_FOUND"
  , "message":"The specified protocol driver was not found in the system path."
  }
, "0x00001B5C":{
    "code":"ERROR_CTX_WD_NOT_FOUND"
  , "message":"The specified terminal connection driver was not found in the system path."
  }
, "0x00001B5D":{
    "code":"ERROR_CTX_CANNOT_MAKE_EVENTLOG_ENTRY"
  , "message":"A registry key for event logging could not be created for this session."
  }
, "0x00001B5E":{
    "code":"ERROR_CTX_SERVICE_NAME_COLLISION"
  , "message":"A service with the same name already exists on the system."
  }
, "0x00001B5F":{
    "code":"ERROR_CTX_CLOSE_PENDING"
  , "message":"A close operation is pending on the session."
  }
, "0x00001B60":{
    "code":"ERROR_CTX_NO_OUTBUF"
  , "message":"There are no free output buffers available."
  }
, "0x00001B61":{
    "code":"ERROR_CTX_MODEM_INF_NOT_FOUND"
  , "message":"The MODEM.INF file was not found."
  }
, "0x00001B62":{
    "code":"ERROR_CTX_INVALID_MODEMNAME"
  , "message":"The modem name was not found in the MODEM.INF file."
  }
, "0x00001B63":{
    "code":"ERROR_CTX_MODEM_RESPONSE_ERROR"
  , "message":"The modem did not accept the command sent to it. Verify that the configured modem name matches the attached modem."
  }
, "0x00001B64":{
    "code":"ERROR_CTX_MODEM_RESPONSE_TIMEOUT"
  , "message":"The modem did not respond to the command sent to it. Verify that the modem is properly cabled and turned on."
  }
, "0x00001B65":{
    "code":"ERROR_CTX_MODEM_RESPONSE_NO_CARRIER"
  , "message":"Carrier detect has failed or carrier has been dropped due to disconnect."
  }
, "0x00001B66":{
    "code":"ERROR_CTX_MODEM_RESPONSE_NO_DIALTONE"
  , "message":"Dial tone not detected within the required time. Verify that the phone cable is properly attached and functional."
  }
, "0x00001B67":{
    "code":"ERROR_CTX_MODEM_RESPONSE_BUSY"
  , "message":"Busy signal detected at remote site on callback."
  }
, "0x00001B68":{
    "code":"ERROR_CTX_MODEM_RESPONSE_VOICE"
  , "message":"Voice detected at remote site on callback."
  }
, "0x00001B69":{
    "code":"ERROR_CTX_TD_ERROR"
  , "message":"Transport driver error."
  }
, "0x00001B6E":{
    "code":"ERROR_CTX_WINSTATION_NOT_FOUND"
  , "message":"The specified session cannot be found."
  }
, "0x00001B6F":{
    "code":"ERROR_CTX_WINSTATION_ALREADY_EXISTS"
  , "message":"The specified session name is already in use."
  }
, "0x00001B70":{
    "code":"ERROR_CTX_WINSTATION_BUSY"
  , "message":"The requested operation cannot be completed because the terminal connection is currently busy processing a connect, disconnect, reset, or delete operation."
  }
, "0x00001B71":{
    "code":"ERROR_CTX_BAD_VIDEO_MODE"
  , "message":"An attempt has been made to connect to a session whose video mode is not supported by the current client."
  }
, "0x00001B7B":{
    "code":"ERROR_CTX_GRAPHICS_INVALID"
  , "message":"The application attempted to enable DOS graphics mode. DOS graphics mode is not supported."
  }
, "0x00001B7D":{
    "code":"ERROR_CTX_LOGON_DISABLED"
  , "message":"Your interactive logon privilege has been disabled. Contact your administrator."
  }
, "0x00001B7E":{
    "code":"ERROR_CTX_NOT_CONSOLE"
  , "message":"The requested operation can be performed only on the system console. This is most often the result of a driver or system DLL requiring direct console access."
  }
, "0x00001B80":{
    "code":"ERROR_CTX_CLIENT_QUERY_TIMEOUT"
  , "message":"The client failed to respond to the server connect message."
  }
, "0x00001B81":{
    "code":"ERROR_CTX_CONSOLE_DISCONNECT"
  , "message":"Disconnecting the console session is not supported."
  }
, "0x00001B82":{
    "code":"ERROR_CTX_CONSOLE_CONNECT"
  , "message":"Reconnecting a disconnected session to the console is not supported."
  }
, "0x00001B84":{
    "code":"ERROR_CTX_SHADOW_DENIED"
  , "message":"The request to control another session remotely was denied."
  }
, "0x00001B85":{
    "code":"ERROR_CTX_WINSTATION_ACCESS_DENIED"
  , "message":"The requested session access is denied."
  }
, "0x00001B89":{
    "code":"ERROR_CTX_INVALID_WD"
  , "message":"The specified terminal connection driver is invalid."
  }
, "0x00001B8A":{
    "code":"ERROR_CTX_SHADOW_INVALID"
  , "message":"The requested session cannot be controlled remotely. This may be because the session is disconnected or does not currently have a user logged on."
  }
, "0x00001B8B":{
    "code":"ERROR_CTX_SHADOW_DISABLED"
  , "message":"The requested session is not configured to allow remote control."
  }
, "0x00001B8C":{
    "code":"ERROR_CTX_CLIENT_LICENSE_IN_USE"
  , "message":"Your request to connect to this terminal server has been rejected. Your terminal server client license number is currently being used by another user. Call your system administrator to obtain a unique license number."
  }
, "0x00001B8D":{
    "code":"ERROR_CTX_CLIENT_LICENSE_NOT_SET"
  , "message":"Your request to connect to this terminal server has been rejected. Your terminal server client license number has not been entered for this copy of the terminal server client. Contact your system administrator."
  }
, "0x00001B8E":{
    "code":"ERROR_CTX_LICENSE_NOT_AVAILABLE"
  , "message":"The number of connections to this computer is limited and all connections are in use right now. Try connecting later or contact your system administrator."
  }
, "0x00001B8F":{
    "code":"ERROR_CTX_LICENSE_CLIENT_INVALID"
  , "message":"The client you are using is not licensed to use this system. Your logon request is denied."
  }
, "0x00001B90":{
    "code":"ERROR_CTX_LICENSE_EXPIRED"
  , "message":"The system license has expired. Your logon request is denied."
  }
, "0x00001B91":{
    "code":"ERROR_CTX_SHADOW_NOT_RUNNING"
  , "message":"Remote control could not be terminated because the specified session is not currently being remotely controlled."
  }
, "0x00001B92":{
    "code":"ERROR_CTX_SHADOW_ENDED_BY_MODE_CHANGE"
  , "message":"The remote control of the console was terminated because the display mode was changed. Changing the display mode in a remote control session is not supported."
  }
, "0x00001B93":{
    "code":"ERROR_ACTIVATION_COUNT_EXCEEDED"
  , "message":"Activation has already been reset the maximum number of times for this installation. Your activation timer will not be cleared."
  }
, "0x00001B94":{
    "code":"ERROR_CTX_WINSTATIONS_DISABLED"
  , "message":"Remote logons are currently disabled."
  }
, "0x00001B95":{
    "code":"ERROR_CTX_ENCRYPTION_LEVEL_REQUIRED"
  , "message":"You do not have the proper encryption level to access this session."
  }
, "0x00001B96":{
    "code":"ERROR_CTX_SESSION_IN_USE"
  , "message":"The user %s\\%s is currently logged on to this computer. Only the current user or an administrator can log on to this computer."
  }
, "0x00001B97":{
    "code":"ERROR_CTX_NO_FORCE_LOGOFF"
  , "message":"The user %s\\%s is already logged on to the console of this computer. You do not have permission to log in at this time. To resolve this issue, contact %s\\%s and have them log off."
  }
, "0x00001B98":{
    "code":"ERROR_CTX_ACCOUNT_RESTRICTION"
  , "message":"Unable to log you on because of an account restriction."
  }
, "0x00001B99":{
    "code":"ERROR_RDP_PROTOCOL_ERROR"
  , "message":"The RDP component %2 detected an error in the protocol stream and has disconnected the client."
  }
, "0x00001B9A":{
    "code":"ERROR_CTX_CDM_CONNECT"
  , "message":"The Client Drive Mapping Service has connected on terminal connection."
  }
, "0x00001B9B":{
    "code":"ERROR_CTX_CDM_DISCONNECT"
  , "message":"The Client Drive Mapping Service has disconnected on terminal connection."
  }
, "0x00001B9C":{
    "code":"ERROR_CTX_SECURITY_LAYER_ERROR"
  , "message":"The terminal server security layer detected an error in the protocol stream and has disconnected the client."
  }
, "0x00001B9D":{
    "code":"ERROR_TS_INCOMPATIBLE_SESSIONS"
  , "message":"The target session is incompatible with the current session."
  }
, "0x00001F41":{
    "code":"FRS_ERR_INVALID_API_SEQUENCE"
  , "message":"The file replication service API was called incorrectly."
  }
, "0x00001F42":{
    "code":"FRS_ERR_STARTING_SERVICE"
  , "message":"The file replication service cannot be started."
  }
, "0x00001F43":{
    "code":"FRS_ERR_STOPPING_SERVICE"
  , "message":"The file replication service cannot be stopped."
  }
, "0x00001F44":{
    "code":"FRS_ERR_INTERNAL_API"
  , "message":"The file replication service API terminated the request. The event log may have more information."
  }
, "0x00001F45":{
    "code":"FRS_ERR_INTERNAL"
  , "message":"The file replication service terminated the request. The event log may have more information."
  }
, "0x00001F46":{
    "code":"FRS_ERR_SERVICE_COMM"
  , "message":"The file replication service cannot be contacted. The event log may have more information."
  }
, "0x00001F47":{
    "code":"FRS_ERR_INSUFFICIENT_PRIV"
  , "message":"The file replication service cannot satisfy the request because the user has insufficient privileges. The event log may have more information."
  }
, "0x00001F48":{
    "code":"FRS_ERR_AUTHENTICATION"
  , "message":"The file replication service cannot satisfy the request because authenticated RPC is not available. The event log may have more information."
  }
, "0x00001F49":{
    "code":"FRS_ERR_PARENT_INSUFFICIENT_PRIV"
  , "message":"The file replication service cannot satisfy the request because the user has insufficient privileges on the domain controller. The event log may have more information."
  }
, "0x00001F4A":{
    "code":"FRS_ERR_PARENT_AUTHENTICATION"
  , "message":"The file replication service cannot satisfy the request because authenticated RPC is not available on the domain controller. The event log may have more information."
  }
, "0x00001F4B":{
    "code":"FRS_ERR_CHILD_TO_PARENT_COMM"
  , "message":"The file replication service cannot communicate with the file replication service on the domain controller. The event log may have more information."
  }
, "0x00001F4C":{
    "code":"FRS_ERR_PARENT_TO_CHILD_COMM"
  , "message":"The file replication service on the domain controller cannot communicate with the file replication service on this computer. The event log may have more information."
  }
, "0x00001F4D":{
    "code":"FRS_ERR_SYSVOL_POPULATE"
  , "message":"The file replication service cannot populate the system volume because of an internal error. The event log may have more information."
  }
, "0x00001F4E":{
    "code":"FRS_ERR_SYSVOL_POPULATE_TIMEOUT"
  , "message":"The file replication service cannot populate the system volume because of an internal time-out. The event log may have more information."
  }
, "0x00001F4F":{
    "code":"FRS_ERR_SYSVOL_IS_BUSY"
  , "message":"The file replication service cannot process the request. The system volume is busy with a previous request."
  }
, "0x00001F50":{
    "code":"FRS_ERR_SYSVOL_DEMOTE"
  , "message":"The file replication service cannot stop replicating the system volume because of an internal error. The event log may have more information."
  }
, "0x00001F51":{
    "code":"FRS_ERR_INVALID_SERVICE_PARAMETER"
  , "message":"The file replication service detected an invalid parameter."
  }
, "0x00002008":{
    "code":"ERROR_DS_NOT_INSTALLED"
  , "message":"An error occurred while installing the directory service. For more information, see the event log."
  }
, "0x00002009":{
    "code":"ERROR_DS_MEMBERSHIP_EVALUATED_LOCALLY"
  , "message":"The directory service evaluated group memberships locally."
  }
, "0x0000200A":{
    "code":"ERROR_DS_NO_ATTRIBUTE_OR_VALUE"
  , "message":"The specified directory service attribute or value does not exist."
  }
, "0x0000200B":{
    "code":"ERROR_DS_INVALID_ATTRIBUTE_YNTAX"
  , "message":"The attribute syntax specified to the directory service is invalid."
  }
, "0x0000200C":{
    "code":"ERROR_DS_ATTRIBUTE_TYPE_UNDEFINED"
  , "message":"The attribute type specified to the directory service is not defined."
  }
, "0x0000200D":{
    "code":"ERROR_DS_ATTRIBUTE_OR_VALUE_EXISTS"
  , "message":"The specified directory service attribute or value already exists."
  }
, "0x0000200E":{
    "code":"ERROR_DS_BUSY"
  , "message":"The directory service is busy."
  }
, "0x0000200F":{
    "code":"ERROR_DS_UNAVAILABLE"
  , "message":"The directory service is unavailable."
  }
, "0x00002010":{
    "code":"ERROR_DS_NO_RIDS_ALLOCATED"
  , "message":"The directory service was unable to allocate a relative identifier."
  }
, "0x00002011":{
    "code":"ERROR_DS_NO_MORE_RIDS"
  , "message":"The directory service has exhausted the pool of relative identifiers."
  }
, "0x00002012":{
    "code":"ERROR_DS_INCORRECT_ROLE_OWNER"
  , "message":"The requested operation could not be performed because the directory service is not the master for that type of operation."
  }
, "0x00002013":{
    "code":"ERROR_DS_RIDMGR_INIT_ERROR"
  , "message":"The directory service was unable to initialize the subsystem that allocates relative identifiers."
  }
, "0x00002014":{
    "code":"ERROR_DS_OBJ_CLASS_VIOLATION"
  , "message":"The requested operation did not satisfy one or more constraints associated with the class of the object."
  }
, "0x00002015":{
    "code":"ERROR_DS_CANT_ON_NON_LEAF"
  , "message":"The directory service can perform the requested operation only on a leaf object."
  }
, "0x00002016":{
    "code":"ERROR_DS_CANT_ON_RDN"
  , "message":"The directory service cannot perform the requested operation on the relative distinguished name (RDN) attribute of an object."
  }
, "0x00002017":{
    "code":"ERROR_DS_CANT_MOD_OBJ_CLASS"
  , "message":"The directory service detected an attempt to modify the object class of an object."
  }
, "0x00002018":{
    "code":"ERROR_DS_CROSS_DOM_MOVE_ERROR"
  , "message":"The requested cross-domain move operation could not be performed."
  }
, "0x00002019":{
    "code":"ERROR_DS_GC_NOT_AVAILABLE"
  , "message":"Unable to contact the global catalog (GC) server."
  }
, "0x0000201A":{
    "code":"ERROR_SHARED_POLICY"
  , "message":"The policy object is shared and can only be modified at the root."
  }
, "0x0000201B":{
    "code":"ERROR_POLICY_OBJECT_NOT_FOUND"
  , "message":"The policy object does not exist."
  }
, "0x0000201C":{
    "code":"ERROR_POLICY_ONLY_IN_DS"
  , "message":"The requested policy information is only in the directory service."
  }
, "0x0000201D":{
    "code":"ERROR_PROMOTION_ACTIVE"
  , "message":"A domain controller promotion is currently active."
  }
, "0x0000201E":{
    "code":"ERROR_NO_PROMOTION_ACTIVE"
  , "message":"A domain controller promotion is not currently active."
  }
, "0x00002020":{
    "code":"ERROR_DS_OPERATIONS_ERROR"
  , "message":"An operations error occurred."
  }
, "0x00002021":{
    "code":"ERROR_DS_PROTOCOL_ERROR"
  , "message":"A protocol error occurred."
  }
, "0x00002022":{
    "code":"ERROR_DS_TIMELIMIT_EXCEEDED"
  , "message":"The time limit for this request was exceeded."
  }
, "0x00002023":{
    "code":"ERROR_DS_SIZELIMIT_EXCEEDED"
  , "message":"The size limit for this request was exceeded."
  }
, "0x00002024":{
    "code":"ERROR_DS_ADMIN_LIMIT_EXCEEDED"
  , "message":"The administrative limit for this request was exceeded."
  }
, "0x00002025":{
    "code":"ERROR_DS_COMPARE_FALSE"
  , "message":"The compare response was false."
  }
, "0x00002026":{
    "code":"ERROR_DS_COMPARE_TRUE"
  , "message":"The compare response was true."
  }
, "0x00002027":{
    "code":"ERROR_DS_AUTH_METHOD_NOT_SUPPORTED"
  , "message":"The requested authentication method is not supported by the server."
  }
, "0x00002028":{
    "code":"ERROR_DS_STRONG_AUTH_REQUIRED"
  , "message":"A more secure authentication method is required for this server."
  }
, "0x00002029":{
    "code":"ERROR_DS_INAPPROPRIATE_AUTH"
  , "message":"Inappropriate authentication."
  }
, "0x0000202A":{
    "code":"ERROR_DS_AUTH_UNKNOWN"
  , "message":"The authentication mechanism is unknown."
  }
, "0x0000202B":{
    "code":"ERROR_DS_REFERRAL"
  , "message":"A referral was returned from the server."
  }
, "0x0000202C":{
    "code":"ERROR_DS_UNAVAILABLE_CRIT_EXTENSION"
  , "message":"The server does not support the requested critical extension."
  }
, "0x0000202D":{
    "code":"ERROR_DS_CONFIDENTIALITY_REQUIRED"
  , "message":"This request requires a secure connection."
  }
, "0x0000202E":{
    "code":"ERROR_DS_INAPPROPRIATE_MATCHING"
  , "message":"Inappropriate matching."
  }
, "0x0000202F":{
    "code":"ERROR_DS_CONSTRAINT_VIOLATION"
  , "message":"A constraint violation occurred."
  }
, "0x00002030":{
    "code":"ERROR_DS_NO_SUCH_OBJECT"
  , "message":"There is no such object on the server."
  }
, "0x00002031":{
    "code":"ERROR_DS_ALIAS_PROBLEM"
  , "message":"There is an alias problem."
  }
, "0x00002032":{
    "code":"ERROR_DS_INVALID_DN_SYNTAX"
  , "message":"An invalid dn syntax has been specified."
  }
, "0x00002033":{
    "code":"ERROR_DS_IS_LEAF"
  , "message":"The object is a leaf object."
  }
, "0x00002034":{
    "code":"ERROR_DS_ALIAS_DEREF_PROBLEM"
  , "message":"There is an alias dereferencing problem."
  }
, "0x00002035":{
    "code":"ERROR_DS_UNWILLING_TO_PERFORM"
  , "message":"The server is unwilling to process the request."
  }
, "0x00002036":{
    "code":"ERROR_DS_LOOP_DETECT"
  , "message":"A loop has been detected."
  }
, "0x00002037":{
    "code":"ERROR_DS_NAMING_VIOLATION"
  , "message":"There is a naming violation."
  }
, "0x00002038":{
    "code":"ERROR_DS_OBJECT_RESULTS_TOO_LARGE"
  , "message":"The result set is too large."
  }
, "0x00002039":{
    "code":"ERROR_DS_AFFECTS_MULTIPLE_DSAS"
  , "message":"The operation affects multiple DSAs."
  }
, "0x0000203A":{
    "code":"ERROR_DS_SERVER_DOWN"
  , "message":"The server is not operational."
  }
, "0x0000203B":{
    "code":"ERROR_DS_LOCAL_ERROR"
  , "message":"A local error has occurred."
  }
, "0x0000203C":{
    "code":"ERROR_DS_ENCODING_ERROR"
  , "message":"An encoding error has occurred."
  }
, "0x0000203D":{
    "code":"ERROR_DS_DECODING_ERROR"
  , "message":"A decoding error has occurred."
  }
, "0x0000203E":{
    "code":"ERROR_DS_FILTER_UNKNOWN"
  , "message":"The search filter cannot be recognized."
  }
, "0x0000203F":{
    "code":"ERROR_DS_PARAM_ERROR"
  , "message":"One or more parameters are illegal."
  }
, "0x00002040":{
    "code":"ERROR_DS_NOT_SUPPORTED"
  , "message":"The specified method is not supported."
  }
, "0x00002041":{
    "code":"ERROR_DS_NO_RESULTS_RETURNED"
  , "message":"No results were returned."
  }
, "0x00002042":{
    "code":"ERROR_DS_CONTROL_NOT_FOUND"
  , "message":"The specified control is not supported by the server."
  }
, "0x00002043":{
    "code":"ERROR_DS_CLIENT_LOOP"
  , "message":"A referral loop was detected by the client."
  }
, "0x00002044":{
    "code":"ERROR_DS_REFERRAL_LIMIT_EXCEEDED"
  , "message":"The preset referral limit was exceeded."
  }
, "0x00002045":{
    "code":"ERROR_DS_SORT_CONTROL_MISSING"
  , "message":"The search requires a SORT control."
  }
, "0x00002046":{
    "code":"ERROR_DS_OFFSET_RANGE_ERROR"
  , "message":"The search results exceed the offset range specified."
  }
, "0x0000206D":{
    "code":"ERROR_DS_ROOT_MUST_BE_NC"
  , "message":"The root object must be the head of a naming context. The root object cannot have an instantiated parent."
  }
, "0x0000206E":{
    "code":"ERROR_DS_ADD_REPLICA_INHIBITED"
  , "message":"The add replica operation cannot be performed. The naming context must be writable to create the replica."
  }
, "0x0000206F":{
    "code":"ERROR_DS_ATT_NOT_DEF_IN_SCHEMA"
  , "message":"A reference to an attribute that is not defined in the schema occurred."
  }
, "0x00002070":{
    "code":"ERROR_DS_MAX_OBJ_SIZE_EXCEEDED"
  , "message":"The maximum size of an object has been exceeded."
  }
, "0x00002071":{
    "code":"ERROR_DS_OBJ_STRING_NAME_EXISTS"
  , "message":"An attempt was made to add an object to the directory with a name that is already in use."
  }
, "0x00002072":{
    "code":"ERROR_DS_NO_RDN_DEFINED_IN_SCHEMA"
  , "message":"An attempt was made to add an object of a class that does not have an RDN defined in the schema."
  }
, "0x00002073":{
    "code":"ERROR_DS_RDN_DOESNT_MATCH_SCHEMA"
  , "message":"An attempt was made to add an object using an RDN that is not the RDN defined in the schema."
  }
, "0x00002074":{
    "code":"ERROR_DS_NO_REQUESTED_ATTS_FOUND"
  , "message":"None of the requested attributes were found on the objects."
  }
, "0x00002075":{
    "code":"ERROR_DS_USER_BUFFER_TO_SMALL"
  , "message":"The user buffer is too small."
  }
, "0x00002076":{
    "code":"ERROR_DS_ATT_IS_NOT_ON_OBJ"
  , "message":"The attribute specified in the operation is not present on the object."
  }
, "0x00002077":{
    "code":"ERROR_DS_ILLEGAL_MOD_OPERATION"
  , "message":"Illegal modify operation. Some aspect of the modification is not permitted."
  }
, "0x00002078":{
    "code":"ERROR_DS_OBJ_TOO_LARGE"
  , "message":"The specified object is too large."
  }
, "0x00002079":{
    "code":"ERROR_DS_BAD_INSTANCE_TYPE"
  , "message":"The specified instance type is not valid."
  }
, "0x0000207A":{
    "code":"ERROR_DS_MASTERDSA_REQUIRED"
  , "message":"The operation must be performed at a master DSA."
  }
, "0x0000207B":{
    "code":"ERROR_DS_OBJECT_CLASS_REQUIRED"
  , "message":"The object class attribute must be specified."
  }
, "0x0000207C":{
    "code":"ERROR_DS_MISSING_REQUIRED_ATT"
  , "message":"A required attribute is missing."
  }
, "0x0000207D":{
    "code":"ERROR_DS_ATT_NOT_DEF_FOR_CLASS"
  , "message":"An attempt was made to modify an object to include an attribute that is not legal for its class."
  }
, "0x0000207E":{
    "code":"ERROR_DS_ATT_ALREADY_EXISTS"
  , "message":"The specified attribute is already present on the object."
  }
, "0x00002080":{
    "code":"ERROR_DS_CANT_ADD_ATT_VALUES"
  , "message":"The specified attribute is not present, or has no values."
  }
, "0x00002081":{
    "code":"ERROR_DS_SINGLE_VALUE_CONSTRAINT"
  , "message":"Multiple values were specified for an attribute that can have only one value."
  }
, "0x00002082":{
    "code":"ERROR_DS_RANGE_CONSTRAINT"
  , "message":"A value for the attribute was not in the acceptable range of values."
  }
, "0x00002083":{
    "code":"ERROR_DS_ATT_VAL_ALREADY_EXISTS"
  , "message":"The specified value already exists."
  }
, "0x00002084":{
    "code":"ERROR_DS_CANT_REM_MISSING_ATT"
  , "message":"The attribute cannot be removed because it is not present on the object."
  }
, "0x00002085":{
    "code":"ERROR_DS_CANT_REM_MISSING_ATT_VAL"
  , "message":"The attribute value cannot be removed because it is not present on the object."
  }
, "0x00002086":{
    "code":"ERROR_DS_ROOT_CANT_BE_SUBREF"
  , "message":"The specified root object cannot be a subreference."
  }
, "0x00002087":{
    "code":"ERROR_DS_NO_CHAINING"
  , "message":"Chaining is not permitted."
  }
, "0x00002088":{
    "code":"ERROR_DS_NO_CHAINED_EVAL"
  , "message":"Chained evaluation is not permitted."
  }
, "0x00002089":{
    "code":"ERROR_DS_NO_PARENT_OBJECT"
  , "message":"The operation could not be performed because the object\'s parent is either uninstantiated or deleted."
  }
, "0x0000208A":{
    "code":"ERROR_DS_PARENT_IS_AN_ALIAS"
  , "message":"Having a parent that is an alias is not permitted. Aliases are leaf objects."
  }
, "0x0000208B":{
    "code":"ERROR_DS_CANT_MIX_MASTER_AND_REPS"
  , "message":"The object and parent must be of the same type, either both masters or both replicas."
  }
, "0x0000208C":{
    "code":"ERROR_DS_CHILDREN_EXIST"
  , "message":"The operation cannot be performed because child objects exist. This operation can only be performed on a leaf object."
  }
, "0x0000208D":{
    "code":"ERROR_DS_OBJ_NOT_FOUND"
  , "message":"Directory object not found."
  }
, "0x0000208E":{
    "code":"ERROR_DS_ALIASED_OBJ_MISSING"
  , "message":"The aliased object is missing."
  }
, "0x0000208F":{
    "code":"ERROR_DS_BAD_NAME_SYNTAX"
  , "message":"The object name has bad syntax."
  }
, "0x00002090":{
    "code":"ERROR_DS_ALIAS_POINTS_TO_ALIAS"
  , "message":"An alias is not permitted to refer to another alias."
  }
, "0x00002091":{
    "code":"ERROR_DS_CANT_DEREF_ALIAS"
  , "message":"The alias cannot be dereferenced."
  }
, "0x00002092":{
    "code":"ERROR_DS_OUT_OF_SCOPE"
  , "message":"The operation is out of scope."
  }
, "0x00002093":{
    "code":"ERROR_DS_OBJECT_BEING_REMOVED"
  , "message":"The operation cannot continue because the object is in the process of being removed."
  }
, "0x00002094":{
    "code":"ERROR_DS_CANT_DELETE_DSA_OBJ"
  , "message":"The DSA object cannot be deleted."
  }
, "0x00002095":{
    "code":"ERROR_DS_GENERIC_ERROR"
  , "message":"A directory service error has occurred."
  }
, "0x00002096":{
    "code":"ERROR_DS_DSA_MUST_BE_INT_MASTER"
  , "message":"The operation can only be performed on an internal master DSA object."
  }
, "0x00002097":{
    "code":"ERROR_DS_CLASS_NOT_DSA"
  , "message":"The object must be of class DSA."
  }
, "0x00002098":{
    "code":"ERROR_DS_INSUFF_ACCESS_RIGHTS"
  , "message":"Insufficient access rights to perform the operation."
  }
, "0x00002099":{
    "code":"ERROR_DS_ILLEGAL_SUPERIOR"
  , "message":"The object cannot be added because the parent is not on the list of possible superiors."
  }
, "0x0000209A":{
    "code":"ERROR_DS_ATTRIBUTE_OWNED_BY_SAM"
  , "message":"Access to the attribute is not permitted because the attribute is owned by the SAM."
  }
, "0x0000209B":{
    "code":"ERROR_DS_NAME_TOO_MANY_PARTS"
  , "message":"The name has too many parts."
  }
, "0x0000209C":{
    "code":"ERROR_DS_NAME_TOO_LONG"
  , "message":"The name is too long."
  }
, "0x0000209D":{
    "code":"ERROR_DS_NAME_VALUE_TOO_LONG"
  , "message":"The name value is too long."
  }
, "0x0000209E":{
    "code":"ERROR_DS_NAME_UNPARSEABLE"
  , "message":"The directory service encountered an error parsing a name."
  }
, "0x0000209F":{
    "code":"ERROR_DS_NAME_TYPE_UNKNOWN"
  , "message":"The directory service cannot get the attribute type for a name."
  }
, "0x000020A0":{
    "code":"ERROR_DS_NOT_AN_OBJECT"
  , "message":"The name does not identify an object; the name identifies a phantom."
  }
, "0x000020A1":{
    "code":"ERROR_DS_SEC_DESC_TOO_SHORT"
  , "message":"The security descriptor is too short."
  }
, "0x000020A2":{
    "code":"ERROR_DS_SEC_DESC_INVALID"
  , "message":"The security descriptor is invalid."
  }
, "0x000020A3":{
    "code":"ERROR_DS_NO_DELETED_NAME"
  , "message":"Failed to create name for deleted object."
  }
, "0x000020A4":{
    "code":"ERROR_DS_SUBREF_MUST_HAVE_PARENT"
  , "message":"The parent of a new subreference must exist."
  }
, "0x000020A5":{
    "code":"ERROR_DS_NCNAME_MUST_BE_NC"
  , "message":"The object must be a naming context."
  }
, "0x000020A6":{
    "code":"ERROR_DS_CANT_ADD_SYSTEM_ONLY"
  , "message":"It is not permitted to add an attribute that is owned by the system."
  }
, "0x000020A7":{
    "code":"ERROR_DS_CLASS_MUST_BE_CONCRETE"
  , "message":"The class of the object must be structural; you cannot instantiate an abstract class."
  }
, "0x000020A8":{
    "code":"ERROR_DS_INVALID_DMD"
  , "message":"The schema object could not be found."
  }
, "0x000020A9":{
    "code":"ERROR_DS_OBJ_GUID_EXISTS"
  , "message":"A local object with this GUID (dead or alive) already exists."
  }
, "0x000020AA":{
    "code":"ERROR_DS_NOT_ON_BACKLINK"
  , "message":"The operation cannot be performed on a back link."
  }
, "0x000020AB":{
    "code":"ERROR_DS_NO_CROSSREF_FOR_NC"
  , "message":"The cross-reference for the specified naming context could not be found."
  }
, "0x000020AC":{
    "code":"ERROR_DS_SHUTTING_DOWN"
  , "message":"The operation could not be performed because the directory service is shutting down."
  }
, "0x000020AD":{
    "code":"ERROR_DS_UNKNOWN_OPERATION"
  , "message":"The directory service request is invalid."
  }
, "0x000020AE":{
    "code":"ERROR_DS_INVALID_ROLE_OWNER"
  , "message":"The role owner attribute could not be read."
  }
, "0x000020AF":{
    "code":"ERROR_DS_COULDNT_CONTACT_FSMO"
  , "message":"The requested Flexible Single Master Operations (FSMO) operation failed. The current FSMO holder could not be contacted."
  }
, "0x000020B0":{
    "code":"ERROR_DS_CROSS_NC_DN_RENAME"
  , "message":"Modification of a distinguished name across a naming context is not permitted."
  }
, "0x000020B1":{
    "code":"ERROR_DS_CANT_MOD_SYSTEM_ONLY"
  , "message":"The attribute cannot be modified because it is owned by the system."
  }
, "0x000020B2":{
    "code":"ERROR_DS_REPLICATOR_ONLY"
  , "message":"Only the replicator can perform this function."
  }
, "0x000020B3":{
    "code":"ERROR_DS_OBJ_CLASS_NOT_DEFINED"
  , "message":"The specified class is not defined."
  }
, "0x000020B4":{
    "code":"ERROR_DS_OBJ_CLASS_NOT_SUBCLASS"
  , "message":"The specified class is not a subclass."
  }
, "0x000020B5":{
    "code":"ERROR_DS_NAME_REFERENCE_INVALID"
  , "message":"The name reference is invalid."
  }
, "0x000020B6":{
    "code":"ERROR_DS_CROSS_REF_EXISTS"
  , "message":"A cross-reference already exists."
  }
, "0x000020B7":{
    "code":"ERROR_DS_CANT_DEL_MASTER_CROSSREF"
  , "message":"It is not permitted to delete a master cross-reference."
  }
, "0x000020B8":{
    "code":"ERROR_DS_SUBTREE_NOTIFY_NOT_NC_HEAD"
  , "message":"Subtree notifications are only supported on naming context (NC) heads."
  }
, "0x000020B9":{
    "code":"ERROR_DS_NOTIFY_FILTER_TOO_COMPLEX"
  , "message":"Notification filter is too complex."
  }
, "0x000020BA":{
    "code":"ERROR_DS_DUP_RDN"
  , "message":"Schema update failed: Duplicate RDN."
  }
, "0x000020BB":{
    "code":"ERROR_DS_DUP_OID"
  , "message":"Schema update failed: Duplicate OID."
  }
, "0x000020BC":{
    "code":"ERROR_DS_DUP_MAPI_ID"
  , "message":"Schema update failed: Duplicate Message Application Programming Interface (MAPI) identifier."
  }
, "0x000020BD":{
    "code":"ERROR_DS_DUP_SCHEMA_ID_GUID"
  , "message":"Schema update failed: Duplicate schema ID GUID."
  }
, "0x000020BE":{
    "code":"ERROR_DS_DUP_LDAP_DISPLAY_NAME"
  , "message":"Schema update failed: Duplicate LDAP display name."
  }
, "0x000020BF":{
    "code":"ERROR_DS_SEMANTIC_ATT_TEST"
  , "message":"Schema update failed: Range-Lower less than Range-Upper."
  }
, "0x000020C0":{
    "code":"ERROR_DS_SYNTAX_MISMATCH"
  , "message":"Schema update failed: Syntax mismatch."
  }
, "0x000020C1":{
    "code":"ERROR_DS_EXISTS_IN_MUST_HAVE"
  , "message":"Schema deletion failed: Attribute is used in the Must-Contain list."
  }
, "0x000020C2":{
    "code":"ERROR_DS_EXISTS_IN_MAY_HAVE"
  , "message":"Schema deletion failed: Attribute is used in the May-Contain list."
  }
, "0x000020C3":{
    "code":"ERROR_DS_NONEXISTENT_MAY_HAVE"
  , "message":"Schema update failed: Attribute in May-Contain list does not exist."
  }
, "0x000020C4":{
    "code":"ERROR_DS_NONEXISTENT_MUST_HAVE"
  , "message":"Schema update failed: Attribute in the Must-Contain list does not exist."
  }
, "0x000020C5":{
    "code":"ERROR_DS_AUX_CLS_TEST_FAIL"
  , "message":"Schema update failed: Class in the Aux Class list does not exist or is not an auxiliary class."
  }
, "0x000020C6":{
    "code":"ERROR_DS_NONEXISTENT_POSS_SUP"
  , "message":"Schema update failed: Class in the Poss-Superiors list does not exist."
  }
, "0x000020C7":{
    "code":"ERROR_DS_SUB_CLS_TEST_FAIL"
  , "message":"Schema update failed: Class in the subclass of the list does not exist or does not satisfy hierarchy rules."
  }
, "0x000020C8":{
    "code":"ERROR_DS_BAD_RDN_ATT_ID_SYNTAX"
  , "message":"Schema update failed: Rdn-Att-Id has wrong syntax."
  }
, "0x000020C9":{
    "code":"ERROR_DS_EXISTS_IN_AUX_CLS"
  , "message":"Schema deletion failed: Class is used as an auxiliary class."
  }
, "0x000020CA":{
    "code":"ERROR_DS_EXISTS_IN_SUB_CLS"
  , "message":"Schema deletion failed: Class is used as a subclass."
  }
, "0x000020CB":{
    "code":"ERROR_DS_EXISTS_IN_POSS_SUP"
  , "message":"Schema deletion failed: Class is used as a Poss-Superior."
  }
, "0x000020CC":{
    "code":"ERROR_DS_RECALCSCHEMA_FAILED"
  , "message":"Schema update failed in recalculating validation cache."
  }
, "0x000020CD":{
    "code":"ERROR_DS_TREE_DELETE_NOT_FINISHED"
  , "message":"The tree deletion is not finished. The request must be made again to continue deleting the tree."
  }
, "0x000020CE":{
    "code":"ERROR_DS_CANT_DELETE"
  , "message":"The requested delete operation could not be performed."
  }
, "0x000020CF":{
    "code":"ERROR_DS_ATT_SCHEMA_REQ_ID"
  , "message":"Cannot read the governs class identifier for the schema record."
  }
, "0x000020D0":{
    "code":"ERROR_DS_BAD_ATT_SCHEMA_SYNTAX"
  , "message":"The attribute schema has bad syntax."
  }
, "0x000020D1":{
    "code":"ERROR_DS_CANT_CACHE_ATT"
  , "message":"The attribute could not be cached."
  }
, "0x000020D2":{
    "code":"ERROR_DS_CANT_CACHE_CLASS"
  , "message":"The class could not be cached."
  }
, "0x000020D3":{
    "code":"ERROR_DS_CANT_REMOVE_ATT_CACHE"
  , "message":"The attribute could not be removed from the cache."
  }
, "0x000020D4":{
    "code":"ERROR_DS_CANT_REMOVE_CLASS_CACHE"
  , "message":"The class could not be removed from the cache."
  }
, "0x000020D5":{
    "code":"ERROR_DS_CANT_RETRIEVE_DN"
  , "message":"The distinguished name attribute could not be read."
  }
, "0x000020D6":{
    "code":"ERROR_DS_MISSING_SUPREF"
  , "message":"No superior reference has been configured for the directory service. The directory service is, therefore, unable to issue referrals to objects outside this forest."
  }
, "0x000020D7":{
    "code":"ERROR_DS_CANT_RETRIEVE_INSTANCE"
  , "message":"The instance type attribute could not be retrieved."
  }
, "0x000020D8":{
    "code":"ERROR_DS_CODE_INCONSISTENCY"
  , "message":"An internal error has occurred."
  }
, "0x000020D9":{
    "code":"ERROR_DS_DATABASE_ERROR"
  , "message":"A database error has occurred."
  }
, "0x000020DA":{
    "code":"ERROR_DS_GOVERNSID_MISSING"
  , "message":"The governsID attribute is missing."
  }
, "0x000020DB":{
    "code":"ERROR_DS_MISSING_EXPECTED_ATT"
  , "message":"An expected attribute is missing."
  }
, "0x000020DC":{
    "code":"ERROR_DS_NCNAME_MISSING_CR_REF"
  , "message":"The specified naming context is missing a cross-reference."
  }
, "0x000020DD":{
    "code":"ERROR_DS_SECURITY_CHECKING_ERROR"
  , "message":"A security checking error has occurred."
  }
, "0x000020DE":{
    "code":"ERROR_DS_SCHEMA_NOT_LOADED"
  , "message":"The schema is not loaded."
  }
, "0x000020DF":{
    "code":"ERROR_DS_SCHEMA_ALLOC_FAILED"
  , "message":"Schema allocation failed. Check if the machine is running low on memory."
  }
, "0x000020E0":{
    "code":"ERROR_DS_ATT_SCHEMA_REQ_SYNTAX"
  , "message":"Failed to obtain the required syntax for the attribute schema."
  }
, "0x000020E1":{
    "code":"ERROR_DS_GCVERIFY_ERROR"
  , "message":"The GC verification failed. The GC is not available or does not support the operation. Some part of the directory is currently not available."
  }
, "0x000020E2":{
    "code":"ERROR_DS_DRA_SCHEMA_MISMATCH"
  , "message":"The replication operation failed because of a schema mismatch between the servers involved."
  }
, "0x000020E3":{
    "code":"ERROR_DS_CANT_FIND_DSA_OBJ"
  , "message":"The DSA object could not be found."
  }
, "0x000020E4":{
    "code":"ERROR_DS_CANT_FIND_EXPECTED_NC"
  , "message":"The naming context could not be found."
  }
, "0x000020E5":{
    "code":"ERROR_DS_CANT_FIND_NC_IN_CACHE"
  , "message":"The naming context could not be found in the cache."
  }
, "0x000020E6":{
    "code":"ERROR_DS_CANT_RETRIEVE_CHILD"
  , "message":"The child object could not be retrieved."
  }
, "0x000020E7":{
    "code":"ERROR_DS_SECURITY_ILLEGAL_MODIFY"
  , "message":"The modification was not permitted for security reasons."
  }
, "0x000020E8":{
    "code":"ERROR_DS_CANT_REPLACE_HIDDEN_REC"
  , "message":"The operation cannot replace the hidden record."
  }
, "0x000020E9":{
    "code":"ERROR_DS_BAD_HIERARCHY_FILE"
  , "message":"The hierarchy file is invalid."
  }
, "0x000020EA":{
    "code":"ERROR_DS_BUILD_HIERARCHY_TABLE_FAILED"
  , "message":"The attempt to build the hierarchy table failed."
  }
, "0x000020EB":{
    "code":"ERROR_DS_CONFIG_PARAM_MISSING"
  , "message":"The directory configuration parameter is missing from the registry."
  }
, "0x000020EC":{
    "code":"ERROR_DS_COUNTING_AB_INDICES_FAILED"
  , "message":"The attempt to count the address book indices failed."
  }
, "0x000020ED":{
    "code":"ERROR_DS_HIERARCHY_TABLE_MALLOC_FAILED"
  , "message":"The allocation of the hierarchy table failed."
  }
, "0x000020EE":{
    "code":"ERROR_DS_INTERNAL_FAILURE"
  , "message":"The directory service encountered an internal failure."
  }
, "0x000020EF":{
    "code":"ERROR_DS_UNKNOWN_ERROR"
  , "message":"The directory service encountered an unknown failure."
  }
, "0x000020F0":{
    "code":"ERROR_DS_ROOT_REQUIRES_CLASS_TOP"
  , "message":"A root object requires a class of \"top\"."
  }
, "0x000020F1":{
    "code":"ERROR_DS_REFUSING_FSMO_ROLES"
  , "message":"This directory server is shutting down, and cannot take ownership of new floating single-master operation roles."
  }
, "0x000020F2":{
    "code":"ERROR_DS_MISSING_FSMO_SETTINGS"
  , "message":"The directory service is missing mandatory configuration information and is unable to determine the ownership of floating single-master operation roles."
  }
, "0x000020F3":{
    "code":"ERROR_DS_UNABLE_TO_SURRENDER_ROLES"
  , "message":"The directory service was unable to transfer ownership of one or more floating single-master operation roles to other servers."
  }
, "0x000020F4":{
    "code":"ERROR_DS_DRA_GENERIC"
  , "message":"The replication operation failed."
  }
, "0x000020F5":{
    "code":"ERROR_DS_DRA_INVALID_PARAMETER"
  , "message":"An invalid parameter was specified for this replication operation."
  }
, "0x000020F6":{
    "code":"ERROR_DS_DRA_BUSY"
  , "message":"The directory service is too busy to complete the replication operation at this time."
  }
, "0x000020F7":{
    "code":"ERROR_DS_DRA_BAD_DN"
  , "message":"The DN specified for this replication operation is invalid."
  }
, "0x000020F8":{
    "code":"ERROR_DS_DRA_BAD_NC"
  , "message":"The naming context specified for this replication operation is invalid."
  }
, "0x000020F9":{
    "code":"ERROR_DS_DRA_DN_EXISTS"
  , "message":"The DN specified for this replication operation already exists."
  }
, "0x000020FA":{
    "code":"ERROR_DS_DRA_INTERNAL_ERROR"
  , "message":"The replication system encountered an internal error."
  }
, "0x000020FB":{
    "code":"ERROR_DS_DRA_INCONSISTENT_DIT"
  , "message":"The replication operation encountered a database inconsistency."
  }
, "0x000020FC":{
    "code":"ERROR_DS_DRA_CONNECTION_FAILED"
  , "message":"The server specified for this replication operation could not be contacted."
  }
, "0x000020FD":{
    "code":"ERROR_DS_DRA_BAD_INSTANCE_TYPE"
  , "message":"The replication operation encountered an object with an invalid instance type."
  }
, "0x000020FE":{
    "code":"ERROR_DS_DRA_OUT_OF_MEM"
  , "message":"The replication operation failed to allocate memory."
  }
, "0x000020FF":{
    "code":"ERROR_DS_DRA_MAIL_PROBLEM"
  , "message":"The replication operation encountered an error with the mail system."
  }
, "0x00002100":{
    "code":"ERROR_DS_DRA_REF_ALREADY_EXISTS"
  , "message":"The replication reference information for the target server already exists."
  }
, "0x00002101":{
    "code":"ERROR_DS_DRA_REF_NOT_FOUND"
  , "message":"The replication reference information for the target server does not exist."
  }
, "0x00002102":{
    "code":"ERROR_DS_DRA_OBJ_IS_REP_SOURCE"
  , "message":"The naming context cannot be removed because it is replicated to another server."
  }
, "0x00002103":{
    "code":"ERROR_DS_DRA_DB_ERROR"
  , "message":"The replication operation encountered a database error."
  }
, "0x00002104":{
    "code":"ERROR_DS_DRA_NO_REPLICA"
  , "message":"The naming context is in the process of being removed or is not replicated from the specified server."
  }
, "0x00002105":{
    "code":"ERROR_DS_DRA_ACCESS_DENIED"
  , "message":"Replication access was denied."
  }
, "0x00002106":{
    "code":"ERROR_DS_DRA_NOT_SUPPORTED"
  , "message":"The requested operation is not supported by this version of the directory service."
  }
, "0x00002107":{
    "code":"ERROR_DS_DRA_RPC_CANCELLED"
  , "message":"The replication RPC was canceled."
  }
, "0x00002108":{
    "code":"ERROR_DS_DRA_SOURCE_DISABLED"
  , "message":"The source server is currently rejecting replication requests."
  }
, "0x00002109":{
    "code":"ERROR_DS_DRA_SINK_DISABLED"
  , "message":"The destination server is currently rejecting replication requests."
  }
, "0x0000210A":{
    "code":"ERROR_DS_DRA_NAME_COLLISION"
  , "message":"The replication operation failed due to a collision of object names."
  }
, "0x0000210B":{
    "code":"ERROR_DS_DRA_SOURCE_REINSTALLED"
  , "message":"The replication source has been reinstalled."
  }
, "0x0000210C":{
    "code":"ERROR_DS_DRA_MISSING_PARENT"
  , "message":"The replication operation failed because a required parent object is missing."
  }
, "0x0000210D":{
    "code":"ERROR_DS_DRA_PREEMPTED"
  , "message":"The replication operation was preempted."
  }
, "0x0000210E":{
    "code":"ERROR_DS_DRA_ABANDON_SYNC"
  , "message":"The replication synchronization attempt was abandoned because of a lack of updates."
  }
, "0x0000210F":{
    "code":"ERROR_DS_DRA_SHUTDOWN"
  , "message":"The replication operation was terminated because the system is shutting down."
  }
, "0x00002110":{
    "code":"ERROR_DS_DRA_INCOMPATIBLE_PARTIAL_SET"
  , "message":"A synchronization attempt failed because the destination DC is currently waiting to synchronize new partial attributes from the source. This condition is normal if a recent schema change modified the partial attribute set. The destination partial attribute set is not a subset of the source partial attribute set."
  }
, "0x00002111":{
    "code":"ERROR_DS_DRA_SOURCE_IS_PARTIAL_REPLICA"
  , "message":"The replication synchronization attempt failed because a master replica attempted to sync from a partial replica."
  }
, "0x00002112":{
    "code":"ERROR_DS_DRA_EXTN_CONNECTION_FAILED"
  , "message":"The server specified for this replication operation was contacted, but that server was unable to contact an additional server needed to complete the operation."
  }
, "0x00002113":{
    "code":"ERROR_DS_INSTALL_SCHEMA_MISMATCH"
  , "message":"The version of the directory service schema of the source forest is not compatible with the version of the directory service on this computer."
  }
, "0x00002114":{
    "code":"ERROR_DS_DUP_LINK_ID"
  , "message":"Schema update failed: An attribute with the same link identifier already exists."
  }
, "0x00002115":{
    "code":"ERROR_DS_NAME_ERROR_RESOLVING"
  , "message":"Name translation: Generic processing error."
  }
, "0x00002116":{
    "code":"ERROR_DS_NAME_ERROR_NOT_FOUND"
  , "message":"Name translation: Could not find the name or insufficient right to see name."
  }
, "0x00002117":{
    "code":"ERROR_DS_NAME_ERROR_NOT_UNIQUE"
  , "message":"Name translation: Input name mapped to more than one output name."
  }
, "0x00002118":{
    "code":"ERROR_DS_NAME_ERROR_NO_MAPPING"
  , "message":"Name translation: The input name was found but not the associated output format."
  }
, "0x00002119":{
    "code":"ERROR_DS_NAME_ERROR_DOMAIN_ONLY"
  , "message":"Name translation: Unable to resolve completely, only the domain was found."
  }
, "0x0000211A":{
    "code":"ERROR_DS_NAME_ERROR_NO_SYNTACTICAL_MAPPING"
  , "message":"Name translation: Unable to perform purely syntactical mapping at the client without going out to the wire."
  }
, "0x0000211B":{
    "code":"ERROR_DS_CONSTRUCTED_ATT_MOD"
  , "message":"Modification of a constructed attribute is not allowed."
  }
, "0x0000211C":{
    "code":"ERROR_DS_WRONG_OM_OBJ_CLASS"
  , "message":"The OM-Object-Class specified is incorrect for an attribute with the specified syntax."
  }
, "0x0000211D":{
    "code":"ERROR_DS_DRA_REPL_PENDING"
  , "message":"The replication request has been posted; waiting for a reply."
  }
, "0x0000211E":{
    "code":"ERROR_DS_DS_REQUIRED"
  , "message":"The requested operation requires a directory service, and none was available."
  }
, "0x0000211F":{
    "code":"ERROR_DS_INVALID_LDAP_DISPLAY_NAME"
  , "message":"The LDAP display name of the class or attribute contains non-ASCII characters."
  }
, "0x00002120":{
    "code":"ERROR_DS_NON_BASE_SEARCH"
  , "message":"The requested search operation is only supported for base searches."
  }
, "0x00002121":{
    "code":"ERROR_DS_CANT_RETRIEVE_ATTS"
  , "message":"The search failed to retrieve attributes from the database."
  }
, "0x00002122":{
    "code":"ERROR_DS_BACKLINK_WITHOUT_LINK"
  , "message":"The schema update operation tried to add a backward link attribute that has no corresponding forward link."
  }
, "0x00002123":{
    "code":"ERROR_DS_EPOCH_MISMATCH"
  , "message":"The source and destination of a cross-domain move do not agree on the object\'s epoch number. Either the source or the destination does not have the latest version of the object."
  }
, "0x00002124":{
    "code":"ERROR_DS_SRC_NAME_MISMATCH"
  , "message":"The source and destination of a cross-domain move do not agree on the object\'s current name. Either the source or the destination does not have the latest version of the object."
  }
, "0x00002125":{
    "code":"ERROR_DS_SRC_AND_DST_NC_IDENTICAL"
  , "message":"The source and destination for the cross-domain move operation are identical. The caller should use a local move operation instead of a cross-domain move operation."
  }
, "0x00002126":{
    "code":"ERROR_DS_DST_NC_MISMATCH"
  , "message":"The source and destination for a cross-domain move do not agree on the naming contexts in the forest. Either the source or the destination does not have the latest version of the Partitions container."
  }
, "0x00002127":{
    "code":"ERROR_DS_NOT_AUTHORITIVE_FOR_DST_NC"
  , "message":"The destination of a cross-domain move is not authoritative for the destination naming context."
  }
, "0x00002128":{
    "code":"ERROR_DS_SRC_GUID_MISMATCH"
  , "message":"The source and destination of a cross-domain move do not agree on the identity of the source object. Either the source or the destination does not have the latest version of the source object."
  }
, "0x00002129":{
    "code":"ERROR_DS_CANT_MOVE_DELETED_OBJECT"
  , "message":"The object being moved across domains is already known to be deleted by the destination server. The source server does not have the latest version of the source object."
  }
, "0x0000212A":{
    "code":"ERROR_DS_PDC_OPERATION_IN_PROGRESS"
  , "message":"Another operation that requires exclusive access to the PDC FSMO is already in progress."
  }
, "0x0000212B":{
    "code":"ERROR_DS_CROSS_DOMAIN_CLEANUP_REQD"
  , "message":"A cross-domain move operation failed because two versions of the moved object exist—one each in the source and destination domains. The destination object needs to be removed to restore the system to a consistent state."
  }
, "0x0000212C":{
    "code":"ERROR_DS_ILLEGAL_XDOM_MOVE_OPERATION"
  , "message":"This object may not be moved across domain boundaries either because cross-domain moves for this class are not allowed, or the object has some special characteristics, for example, a trust account or a restricted relative identifier (RID), that prevent its move."
  }
, "0x0000212D":{
    "code":"ERROR_DS_CANT_WITH_ACCT_GROUP_MEMBERSHPS"
  , "message":"Cannot move objects with memberships across domain boundaries because, once moved, this violates the membership conditions of the account group. Remove the object from any account group memberships and retry."
  }
, "0x0000212E":{
    "code":"ERROR_DS_NC_MUST_HAVE_NC_PARENT"
  , "message":"A naming context head must be the immediate child of another naming context head, not of an interior node."
  }
, "0x0000212F":{
    "code":"ERROR_DS_CR_IMPOSSIBLE_TO_VALIDATE"
  , "message":"The directory cannot validate the proposed naming context name because it does not hold a replica of the naming context above the proposed naming context. Ensure that the domain naming master role is held by a server that is configured as a GC server, and that the server is up-to-date with its replication partners. (Applies only to Windows 2000 domain naming masters.)"
  }
, "0x00002130":{
    "code":"ERROR_DS_DST_DOMAIN_NOT_NATIVE"
  , "message":"Destination domain must be in native mode."
  }
, "0x00002131":{
    "code":"ERROR_DS_MISSING_INFRASTRUCTURE_CONTAINER"
  , "message":"The operation cannot be performed because the server does not have an infrastructure container in the domain of interest."
  }
, "0x00002132":{
    "code":"ERROR_DS_CANT_MOVE_ACCOUNT_GROUP"
  , "message":"Cross-domain moves of nonempty account groups is not allowed."
  }
, "0x00002133":{
    "code":"ERROR_DS_CANT_MOVE_RESOURCE_GROUP"
  , "message":"Cross-domain moves of nonempty resource groups is not allowed."
  }
, "0x00002134":{
    "code":"ERROR_DS_INVALID_SEARCH_FLAG"
  , "message":"The search flags for the attribute are invalid. The ambiguous name resolution (ANR) bit is valid only on attributes of Unicode or Teletex strings."
  }
, "0x00002135":{
    "code":"ERROR_DS_NO_TREE_DELETE_ABOVE_NC"
  , "message":"Tree deletions starting at an object that has an NC head as a descendant are not allowed."
  }
, "0x00002136":{
    "code":"ERROR_DS_COULDNT_LOCK_TREE_FOR_DELETE"
  , "message":"The directory service failed to lock a tree in preparation for a tree deletion because the tree was in use."
  }
, "0x00002137":{
    "code":"ERROR_DS_COULDNT_IDENTIFY_OBJECTS_FOR_TREE_DELETE"
  , "message":"The directory service failed to identify the list of objects to delete while attempting a tree deletion."
  }
, "0x00002138":{
    "code":"ERROR_DS_SAM_INIT_FAILURE"
  , "message":"SAM initialization failed because of the following error: %1. Error Status: 0x%2. Click OK to shut down the system and reboot into Directory Services Restore Mode. Check the event log for detailed information."
  }
, "0x00002139":{
    "code":"ERROR_DS_SENSITIVE_GROUP_VIOLATION"
  , "message":"Only an administrator can modify the membership list of an administrative group."
  }
, "0x0000213A":{
    "code":"ERROR_DS_CANT_MOD_PRIMARYGROUPID"
  , "message":"Cannot change the primary group ID of a domain controller account."
  }
, "0x0000213B":{
    "code":"ERROR_DS_ILLEGAL_BASE_SCHEMA_MOD"
  , "message":"An attempt was made to modify the base schema."
  }
, "0x0000213C":{
    "code":"ERROR_DS_NONSAFE_SCHEMA_CHANGE"
  , "message":"Adding a new mandatory attribute to an existing class, deleting a mandatory attribute from an existing class, or adding an optional attribute to the special class Top that is not a backlink attribute (directly or through inheritance, for example, by adding or deleting an auxiliary class) is not allowed."
  }
, "0x0000213D":{
    "code":"ERROR_DS_SCHEMA_UPDATE_DISALLOWED"
  , "message":"Schema update is not allowed on this DC because the DC is not the schema FSMO role owner."
  }
, "0x0000213E":{
    "code":"ERROR_DS_CANT_CREATE_UNDER_SCHEMA"
  , "message":"An object of this class cannot be created under the schema container. You can only create Attribute-Schema and Class-Schema objects under the schema container."
  }
, "0x0000213F":{
    "code":"ERROR_DS_INSTALL_NO_SRC_SCH_VERSION"
  , "message":"The replica or child install failed to get the objectVersion attribute on the schema container on the source DC. Either the attribute is missing on the schema container or the credentials supplied do not have permission to read it."
  }
, "0x00002140":{
    "code":"ERROR_DS_INSTALL_NO_SCH_VERSION_IN_INIFILE"
  , "message":"The replica or child install failed to read the objectVersion attribute in the SCHEMA section of the file schema.ini in the System32 directory."
  }
, "0x00002141":{
    "code":"ERROR_DS_INVALID_GROUP_TYPE"
  , "message":"The specified group type is invalid."
  }
, "0x00002142":{
    "code":"ERROR_DS_NO_NEST_GLOBALGROUP_IN_MIXEDDOMAIN"
  , "message":"You cannot nest global groups in a mixed domain if the group is security-enabled."
  }
, "0x00002143":{
    "code":"ERROR_DS_NO_NEST_LOCALGROUP_IN_MIXEDDOMAIN"
  , "message":"You cannot nest local groups in a mixed domain if the group is security-enabled."
  }
, "0x00002144":{
    "code":"ERROR_DS_GLOBAL_CANT_HAVE_LOCAL_MEMBER"
  , "message":"A global group cannot have a local group as a member."
  }
, "0x00002145":{
    "code":"ERROR_DS_GLOBAL_CANT_HAVE_UNIVERSAL_MEMBER"
  , "message":"A global group cannot have a universal group as a member."
  }
, "0x00002146":{
    "code":"ERROR_DS_UNIVERSAL_CANT_HAVE_LOCAL_MEMBER"
  , "message":"A universal group cannot have a local group as a member."
  }
, "0x00002147":{
    "code":"ERROR_DS_GLOBAL_CANT_HAVE_CROSSDOMAIN_MEMBER"
  , "message":"A global group cannot have a cross-domain member."
  }
, "0x00002148":{
    "code":"ERROR_DS_LOCAL_CANT_HAVE_CROSSDOMAIN_LOCAL_MEMBER"
  , "message":"A local group cannot have another cross domain local group as a member."
  }
, "0x00002149":{
    "code":"ERROR_DS_HAVE_PRIMARY_MEMBERS"
  , "message":"A group with primary members cannot change to a security-disabled group."
  }
, "0x0000214A":{
    "code":"ERROR_DS_STRING_SD_CONVERSION_FAILED"
  , "message":"The schema cache load failed to convert the string default security descriptor (SD) on a class-schema object."
  }
, "0x0000214B":{
    "code":"ERROR_DS_NAMING_MASTER_GC"
  , "message":"Only DSAs configured to be GC servers should be allowed to hold the domain naming master FSMO role. (Applies only to Windows 2000 servers.)"
  }
, "0x0000214C":{
    "code":"ERROR_DS_DNS_LOOKUP_FAILURE"
  , "message":"The DSA operation is unable to proceed because of a DNS lookup failure."
  }
, "0x0000214D":{
    "code":"ERROR_DS_COULDNT_UPDATE_SPNS"
  , "message":"While processing a change to the DNS host name for an object, the SPN values could not be kept in sync."
  }
, "0x0000214E":{
    "code":"ERROR_DS_CANT_RETRIEVE_SD"
  , "message":"The Security Descriptor attribute could not be read."
  }
, "0x0000214F":{
    "code":"ERROR_DS_KEY_NOT_UNIQUE"
  , "message":"The object requested was not found, but an object with that key was found."
  }
, "0x00002150":{
    "code":"ERROR_DS_WRONG_LINKED_ATT_SYNTAX"
  , "message":"The syntax of the linked attribute being added is incorrect. Forward links can only have syntax 2.5.5.1, 2.5.5.7, and 2.5.5.14, and backlinks can only have syntax 2.5.5.1."
  }
, "0x00002151":{
    "code":"ERROR_DS_SAM_NEED_BOOTKEY_PASSWORD"
  , "message":"SAM needs to get the boot password."
  }
, "0x00002152":{
    "code":"ERROR_DS_SAM_NEED_BOOTKEY_FLOPPY"
  , "message":"SAM needs to get the boot key from the floppy disk."
  }
, "0x00002153":{
    "code":"ERROR_DS_CANT_START"
  , "message":"Directory Service cannot start."
  }
, "0x00002154":{
    "code":"ERROR_DS_INIT_FAILURE"
  , "message":"Directory Services could not start."
  }
, "0x00002155":{
    "code":"ERROR_DS_NO_PKT_PRIVACY_ON_CONNECTION"
  , "message":"The connection between client and server requires packet privacy or better."
  }
, "0x00002156":{
    "code":"ERROR_DS_SOURCE_DOMAIN_IN_FOREST"
  , "message":"The source domain may not be in the same forest as the destination."
  }
, "0x00002157":{
    "code":"ERROR_DS_DESTINATION_DOMAIN_NOT_IN_FOREST"
  , "message":"The destination domain must be in the forest."
  }
, "0x00002158":{
    "code":"ERROR_DS_DESTINATION_AUDITING_NOT_ENABLED"
  , "message":"The operation requires that destination domain auditing be enabled."
  }
, "0x00002159":{
    "code":"ERROR_DS_CANT_FIND_DC_FOR_SRC_DOMAIN"
  , "message":"The operation could not locate a DC for the source domain."
  }
, "0x0000215A":{
    "code":"ERROR_DS_SRC_OBJ_NOT_GROUP_OR_USER"
  , "message":"The source object must be a group or user."
  }
, "0x0000215B":{
    "code":"ERROR_DS_SRC_SID_EXISTS_IN_FOREST"
  , "message":"The source object\'s SID already exists in the destination forest."
  }
, "0x0000215C":{
    "code":"ERROR_DS_SRC_AND_DST_OBJECT_CLASS_MISMATCH"
  , "message":"The source and destination object must be of the same type."
  }
, "0x0000215D":{
    "code":"ERROR_SAM_INIT_FAILURE"
  , "message":"SAM initialization failed because of the following error: %1. Error Status: 0x%2. Click OK to shut down the system and reboot into Safe Mode. Check the event log for detailed information."
  }
, "0x0000215E":{
    "code":"ERROR_DS_DRA_SCHEMA_INFO_SHIP"
  , "message":"Schema information could not be included in the replication request."
  }
, "0x0000215F":{
    "code":"ERROR_DS_DRA_SCHEMA_CONFLICT"
  , "message":"The replication operation could not be completed due to a schema incompatibility."
  }
, "0x00002160":{
    "code":"ERROR_DS_DRA_EARLIER_SCHEMA_CONFLICT"
  , "message":"The replication operation could not be completed due to a previous schema incompatibility."
  }
, "0x00002161":{
    "code":"ERROR_DS_DRA_OBJ_NC_MISMATCH"
  , "message":"The replication update could not be applied because either the source or the destination has not yet received information regarding a recent cross-domain move operation."
  }
, "0x00002162":{
    "code":"ERROR_DS_NC_STILL_HAS_DSAS"
  , "message":"The requested domain could not be deleted because there exist domain controllers that still host this domain."
  }
, "0x00002163":{
    "code":"ERROR_DS_GC_REQUIRED"
  , "message":"The requested operation can be performed only on a GC server."
  }
, "0x00002164":{
    "code":"ERROR_DS_LOCAL_MEMBER_OF_LOCAL_ONLY"
  , "message":"A local group can only be a member of other local groups in the same domain."
  }
, "0x00002165":{
    "code":"ERROR_DS_NO_FPO_IN_UNIVERSAL_GROUPS"
  , "message":"Foreign security principals cannot be members of universal groups."
  }
, "0x00002166":{
    "code":"ERROR_DS_CANT_ADD_TO_GC"
  , "message":"The attribute is not allowed to be replicated to the GC because of security reasons."
  }
, "0x00002167":{
    "code":"ERROR_DS_NO_CHECKPOINT_WITH_PDC"
  , "message":"The checkpoint with the PDC could not be taken because too many modifications are currently being processed."
  }
, "0x00002168":{
    "code":"ERROR_DS_SOURCE_AUDITING_NOT_ENABLED"
  , "message":"The operation requires that source domain auditing be enabled."
  }
, "0x00002169":{
    "code":"ERROR_DS_CANT_CREATE_IN_NONDOMAIN_NC"
  , "message":"Security principal objects can only be created inside domain naming contexts."
  }
, "0x0000216A":{
    "code":"ERROR_DS_INVALID_NAME_FOR_SPN"
  , "message":"An SPN could not be constructed because the provided host name is not in the necessary format."
  }
, "0x0000216B":{
    "code":"ERROR_DS_FILTER_USES_CONTRUCTED_ATTRS"
  , "message":"A filter was passed that uses constructed attributes."
  }
, "0x0000216C":{
    "code":"ERROR_DS_UNICODEPWD_NOT_IN_QUOTES"
  , "message":"The unicodePwd attribute value must be enclosed in quotation marks."
  }
, "0x0000216D":{
    "code":"ERROR_DS_MACHINE_ACCOUNT_QUOTA_EXCEEDED"
  , "message":"Your computer could not be joined to the domain. You have exceeded the maximum number of computer accounts you are allowed to create in this domain. Contact your system administrator to have this limit reset or increased."
  }
, "0x0000216E":{
    "code":"ERROR_DS_MUST_BE_RUN_ON_DST_DC"
  , "message":"For security reasons, the operation must be run on the destination DC."
  }
, "0x0000216F":{
    "code":"ERROR_DS_SRC_DC_MUST_BE_SP4_OR_GREATER"
  , "message":"For security reasons, the source DC must be NT4SP4 or greater."
  }
, "0x00002170":{
    "code":"ERROR_DS_CANT_TREE_DELETE_CRITICAL_OBJ"
  , "message":"Critical directory service system objects cannot be deleted during tree deletion operations. The tree deletion may have been partially performed."
  }
, "0x00002171":{
    "code":"ERROR_DS_INIT_FAILURE_CONSOLE"
  , "message":"Directory Services could not start because of the following error: %1. Error Status: 0x%2. Click OK to shut down the system. You can use the Recovery Console to further diagnose the system."
  }
, "0x00002172":{
    "code":"ERROR_DS_SAM_INIT_FAILURE_CONSOLE"
  , "message":"SAM initialization failed because of the following error: %1. Error Status: 0x%2. Click OK to shut down the system. You can use the Recovery Console to further diagnose the system."
  }
, "0x00002173":{
    "code":"ERROR_DS_FOREST_VERSION_TOO_HIGH"
  , "message":"The version of the operating system installed is incompatible with the current forest functional level. You must upgrade to a new version of the operating system before this server can become a domain controller in this forest."
  }
, "0x00002174":{
    "code":"ERROR_DS_DOMAIN_VERSION_TOO_HIGH"
  , "message":"The version of the operating system installed is incompatible with the current domain functional level. You must upgrade to a new version of the operating system before this server can become a domain controller in this domain."
  }
, "0x00002175":{
    "code":"ERROR_DS_FOREST_VERSION_TOO_LOW"
  , "message":"The version of the operating system installed on this server no longer supports the current forest functional level. You must raise the forest functional level before this server can become a domain controller in this forest."
  }
, "0x00002176":{
    "code":"ERROR_DS_DOMAIN_VERSION_TOO_LOW"
  , "message":"The version of the operating system installed on this server no longer supports the current domain functional level. You must raise the domain functional level before this server can become a domain controller in this domain."
  }
, "0x00002177":{
    "code":"ERROR_DS_INCOMPATIBLE_VERSION"
  , "message":"The version of the operating system installed on this server is incompatible with the functional level of the domain or forest."
  }
, "0x00002178":{
    "code":"ERROR_DS_LOW_DSA_VERSION"
  , "message":"The functional level of the domain (or forest) cannot be raised to the requested value because one or more domain controllers in the domain (or forest) are at a lower, incompatible functional level."
  }
, "0x00002179":{
    "code":"ERROR_DS_NO_BEHAVIOR_VERSION_IN_MIXEDDOMAIN"
  , "message":"The forest functional level cannot be raised to the requested value because one or more domains are still in mixed-domain mode. All domains in the forest must be in native mode for you to raise the forest functional level."
  }
, "0x0000217A":{
    "code":"ERROR_DS_NOT_SUPPORTED_SORT_ORDER"
  , "message":"The sort order requested is not supported."
  }
, "0x0000217B":{
    "code":"ERROR_DS_NAME_NOT_UNIQUE"
  , "message":"The requested name already exists as a unique identifier."
  }
, "0x0000217C":{
    "code":"ERROR_DS_MACHINE_ACCOUNT_CREATED_PRENT4"
  , "message":"The machine account was created before Windows NT 4.0. The account needs to be re-created."
  }
, "0x0000217D":{
    "code":"ERROR_DS_OUT_OF_VERSION_STORE"
  , "message":"The database is out of version store."
  }
, "0x0000217E":{
    "code":"ERROR_DS_INCOMPATIBLE_CONTROLS_USED"
  , "message":"Unable to continue operation because multiple conflicting controls were used."
  }
, "0x0000217F":{
    "code":"ERROR_DS_NO_REF_DOMAIN"
  , "message":"Unable to find a valid security descriptor reference domain for this partition."
  }
, "0x00002180":{
    "code":"ERROR_DS_RESERVED_LINK_ID"
  , "message":"Schema update failed: The link identifier is reserved."
  }
, "0x00002181":{
    "code":"ERROR_DS_LINK_ID_NOT_AVAILABLE"
  , "message":"Schema update failed: There are no link identifiers available."
  }
, "0x00002182":{
    "code":"ERROR_DS_AG_CANT_HAVE_UNIVERSAL_MEMBER"
  , "message":"An account group cannot have a universal group as a member."
  }
, "0x00002183":{
    "code":"ERROR_DS_MODIFYDN_DISALLOWED_BY_INSTANCE_TYPE"
  , "message":"Rename or move operations on naming context heads or read-only objects are not allowed."
  }
, "0x00002184":{
    "code":"ERROR_DS_NO_OBJECT_MOVE_IN_SCHEMA_NC"
  , "message":"Move operations on objects in the schema naming context are not allowed."
  }
, "0x00002185":{
    "code":"ERROR_DS_MODIFYDN_DISALLOWED_BY_FLAG"
  , "message":"A system flag has been set on the object that does not allow the object to be moved or renamed."
  }
, "0x00002186":{
    "code":"ERROR_DS_MODIFYDN_WRONG_GRANDPARENT"
  , "message":"This object is not allowed to change its grandparent container. Moves are not forbidden on this object, but are restricted to sibling containers."
  }
, "0x00002187":{
    "code":"ERROR_DS_NAME_ERROR_TRUST_REFERRAL"
  , "message":"Unable to resolve completely; a referral to another forest was generated."
  }
, "0x00002188":{
    "code":"ERROR_NOT_SUPPORTED_ON_STANDARD_SERVER"
  , "message":"The requested action is not supported on a standard server."
  }
, "0x00002189":{
    "code":"ERROR_DS_CANT_ACCESS_REMOTE_PART_OF_AD"
  , "message":"Could not access a partition of the directory service located on a remote server. Make sure at least one server is running for the partition in question."
  }
, "0x0000218A":{
    "code":"ERROR_DS_CR_IMPOSSIBLE_TO_VALIDATE_V2"
  , "message":"The directory cannot validate the proposed naming context (or partition) name because it does not hold a replica, nor can it contact a replica of the naming context above the proposed naming context. Ensure that the parent naming context is properly registered in the DNS, and at least one replica of this naming context is reachable by the domain naming master."
  }
, "0x0000218B":{
    "code":"ERROR_DS_THREAD_LIMIT_EXCEEDED"
  , "message":"The thread limit for this request was exceeded."
  }
, "0x0000218C":{
    "code":"ERROR_DS_NOT_CLOSEST"
  , "message":"The GC server is not in the closest site."
  }
, "0x0000218D":{
    "code":"ERROR_DS_CANT_DERIVE_SPN_WITHOUT_SERVER_REF"
  , "message":"The directory service cannot derive an SPN with which to mutually authenticate the target server because the corresponding server object in the local DS database has no serverReference attribute."
  }
, "0x0000218E":{
    "code":"ERROR_DS_SINGLE_USER_MODE_FAILED"
  , "message":"The directory service failed to enter single-user mode."
  }
, "0x0000218F":{
    "code":"ERROR_DS_NTDSCRIPT_SYNTAX_ERROR"
  , "message":"The directory service cannot parse the script because of a syntax error."
  }
, "0x00002190":{
    "code":"ERROR_DS_NTDSCRIPT_PROCESS_ERROR"
  , "message":"The directory service cannot process the script because of an error."
  }
, "0x00002191":{
    "code":"ERROR_DS_DIFFERENT_REPL_EPOCHS"
  , "message":"The directory service cannot perform the requested operation because the servers involved are of different replication epochs (which is usually related to a domain rename that is in progress)."
  }
, "0x00002192":{
    "code":"ERROR_DS_DRS_EXTENSIONS_CHANGED"
  , "message":"The directory service binding must be renegotiated due to a change in the server extensions information."
  }
, "0x00002193":{
    "code":"ERROR_DS_REPLICA_SET_CHANGE_NOT_ALLOWED_ON_DISABLED_CR"
  , "message":"The operation is not allowed on a disabled cross-reference."
  }
, "0x00002194":{
    "code":"ERROR_DS_NO_MSDS_INTID"
  , "message":"Schema update failed: No values for msDS-IntId are available."
  }
, "0x00002195":{
    "code":"ERROR_DS_DUP_MSDS_INTID"
  , "message":"Schema update failed: Duplicate msDS-IntId. Retry the operation."
  }
, "0x00002196":{
    "code":"ERROR_DS_EXISTS_IN_RDNATTID"
  , "message":"Schema deletion failed: Attribute is used in rDNAttID."
  }
, "0x00002197":{
    "code":"ERROR_DS_AUTHORIZATION_FAILED"
  , "message":"The directory service failed to authorize the request."
  }
, "0x00002198":{
    "code":"ERROR_DS_INVALID_SCRIPT"
  , "message":"The directory service cannot process the script because it is invalid."
  }
, "0x00002199":{
    "code":"ERROR_DS_REMOTE_CROSSREF_OP_FAILED"
  , "message":"The remote create cross-reference operation failed on the domain naming master FSMO. The operation\'s error is in the extended data."
  }
, "0x0000219A":{
    "code":"ERROR_DS_CROSS_REF_BUSY"
  , "message":"A cross-reference is in use locally with the same name."
  }
, "0x0000219B":{
    "code":"ERROR_DS_CANT_DERIVE_SPN_FOR_DELETED_DOMAIN"
  , "message":"The directory service cannot derive an SPN with which to mutually authenticate the target server because the server\'s domain has been deleted from the forest."
  }
, "0x0000219C":{
    "code":"ERROR_DS_CANT_DEMOTE_WITH_WRITEABLE_NC"
  , "message":"Writable NCs prevent this DC from demoting."
  }
, "0x0000219D":{
    "code":"ERROR_DS_DUPLICATE_ID_FOUND"
  , "message":"The requested object has a nonunique identifier and cannot be retrieved."
  }
, "0x0000219E":{
    "code":"ERROR_DS_INSUFFICIENT_ATTR_TO_CREATE_OBJECT"
  , "message":"Insufficient attributes were given to create an object. This object may not exist because it may have been deleted and the garbage already collected."
  }
, "0x0000219F":{
    "code":"ERROR_DS_GROUP_CONVERSION_ERROR"
  , "message":"The group cannot be converted due to attribute restrictions on the requested group type."
  }
, "0x000021A0":{
    "code":"ERROR_DS_CANT_MOVE_APP_BASIC_GROUP"
  , "message":"Cross-domain moves of nonempty basic application groups is not allowed."
  }
, "0x000021A1":{
    "code":"ERROR_DS_CANT_MOVE_APP_QUERY_GROUP"
  , "message":"Cross-domain moves of nonempty query-based application groups is not allowed."
  }
, "0x000021A2":{
    "code":"ERROR_DS_ROLE_NOT_VERIFIED"
  , "message":"The FSMO role ownership could not be verified because its directory partition did not replicate successfully with at least one replication partner."
  }
, "0x000021A3":{
    "code":"ERROR_DS_WKO_CONTAINER_CANNOT_BE_SPECIAL"
  , "message":"The target container for a redirection of a well-known object container cannot already be a special container."
  }
, "0x000021A4":{
    "code":"ERROR_DS_DOMAIN_RENAME_IN_PROGRESS"
  , "message":"The directory service cannot perform the requested operation because a domain rename operation is in progress."
  }
, "0x000021A5":{
    "code":"ERROR_DS_EXISTING_AD_CHILD_NC"
  , "message":"The directory service detected a child partition below the requested partition name. The partition hierarchy must be created in a top down method."
  }
, "0x000021A6":{
    "code":"ERROR_DS_REPL_LIFETIME_EXCEEDED"
  , "message":"The directory service cannot replicate with this server because the time since the last replication with this server has exceeded the tombstone lifetime."
  }
, "0x000021A7":{
    "code":"ERROR_DS_DISALLOWED_IN_SYSTEM_CONTAINER"
  , "message":"The requested operation is not allowed on an object under the system container."
  }
, "0x000021A8":{
    "code":"ERROR_DS_LDAP_SEND_QUEUE_FULL"
  , "message":"The LDAP server\'s network send queue has filled up because the client is not processing the results of its requests fast enough. No more requests will be processed until the client catches up. If the client does not catch up then it will be disconnected."
  }
, "0x000021A9":{
    "code":"ERROR_DS_DRA_OUT_SCHEDULE_WINDOW"
  , "message":"The scheduled replication did not take place because the system was too busy to execute the request within the schedule window. The replication queue is overloaded. Consider reducing the number of partners or decreasing the scheduled replication frequency."
  }
, "0x000021AA":{
    "code":"ERROR_DS_POLICY_NOT_KNOWN"
  , "message":"At this time, it cannot be determined if the branch replication policy is available on the hub domain controller. Retry at a later time to account for replication latencies."
  }
, "0x000021AB":{
    "code":"ERROR_NO_SITE_SETTINGS_OBJECT"
  , "message":"The site settings object for the specified site does not exist."
  }
, "0x000021AC":{
    "code":"ERROR_NO_SECRETS"
  , "message":"The local account store does not contain secret material for the specified account."
  }
, "0x000021AD":{
    "code":"ERROR_NO_WRITABLE_DC_FOUND"
  , "message":"Could not find a writable domain controller in the domain."
  }
, "0x000021AE":{
    "code":"ERROR_DS_NO_SERVER_OBJECT"
  , "message":"The server object for the domain controller does not exist."
  }
, "0x000021AF":{
    "code":"ERROR_DS_NO_NTDSA_OBJECT"
  , "message":"The NTDS Settings object for the domain controller does not exist."
  }
, "0x000021B0":{
    "code":"ERROR_DS_NON_ASQ_SEARCH"
  , "message":"The requested search operation is not supported for attribute scoped query (ASQ) searches."
  }
, "0x000021B1":{
    "code":"ERROR_DS_AUDIT_FAILURE"
  , "message":"A required audit event could not be generated for the operation."
  }
, "0x000021B2":{
    "code":"ERROR_DS_INVALID_SEARCH_FLAG_SUBTREE"
  , "message":"The search flags for the attribute are invalid. The subtree index bit is valid only on single-valued attributes."
  }
, "0x000021B3":{
    "code":"ERROR_DS_INVALID_SEARCH_FLAG_TUPLE"
  , "message":"The search flags for the attribute are invalid. The tuple index bit is valid only on attributes of Unicode strings."
  }
, "0x000021C2":{
    "code":"ERROR_DS_HIGH_DSA_VERSION"
  , "message":"The functional level of the domain (or forest) cannot be lowered to the requested value."
  }
, "0x000021C7":{
    "code":"ERROR_DS_SPN_VALUE_NOT_UNIQUE_IN_FOREST"
  , "message":"The operation failed because the SPN value provided for addition/modification is not unique forest-wide."
  }
, "0x000021C8":{
    "code":"ERROR_DS_UPN_VALUE_NOT_UNIQUE_IN_FOREST"
  , "message":"The operation failed because the UPN value provided for addition/modification is not unique forest-wide."
  }
, "0x00002329":{
    "code":"DNS_ERROR_RCODE_FORMAT_ERROR"
  , "message":"DNS server unable to interpret format."
  }
, "0x0000232A":{
    "code":"DNS_ERROR_RCODE_SERVER_FAILURE"
  , "message":"DNS server failure."
  }
, "0x0000232B":{
    "code":"DNS_ERROR_RCODE_NAME_ERROR"
  , "message":"DNS name does not exist."
  }
, "0x0000232C":{
    "code":"DNS_ERROR_RCODE_NOT_IMPLEMENTED"
  , "message":"DNS request not supported by name server."
  }
, "0x0000232D":{
    "code":"DNS_ERROR_RCODE_REFUSED"
  , "message":"DNS operation refused."
  }
, "0x0000232E":{
    "code":"DNS_ERROR_RCODE_YXDOMAIN"
  , "message":"DNS name that should not exist, does exist."
  }
, "0x0000232F":{
    "code":"DNS_ERROR_RCODE_YXRRSET"
  , "message":"DNS resource record (RR) set that should not exist, does exist."
  }
, "0x00002330":{
    "code":"DNS_ERROR_RCODE_NXRRSET"
  , "message":"DNS RR set that should to exist, does not exist."
  }
, "0x00002331":{
    "code":"DNS_ERROR_RCODE_NOTAUTH"
  , "message":"DNS server not authoritative for zone."
  }
, "0x00002332":{
    "code":"DNS_ERROR_RCODE_NOTZONE"
  , "message":"DNS name in update or prereq is not in zone."
  }
, "0x00002338":{
    "code":"DNS_ERROR_RCODE_BADSIG"
  , "message":"DNS signature failed to verify."
  }
, "0x00002339":{
    "code":"DNS_ERROR_RCODE_BADKEY"
  , "message":"DNS bad key."
  }
, "0x0000233A":{
    "code":"DNS_ERROR_RCODE_BADTIME"
  , "message":"DNS signature validity expired."
  }
, "0x0000251D":{
    "code":"DNS_INFO_NO_RECORDS"
  , "message":"No records found for given DNS query."
  }
, "0x0000251E":{
    "code":"DNS_ERROR_BAD_PACKET"
  , "message":"Bad DNS packet."
  }
, "0x0000251F":{
    "code":"DNS_ERROR_NO_PACKET"
  , "message":"No DNS packet."
  }
, "0x00002520":{
    "code":"DNS_ERROR_RCODE"
  , "message":"DNS error, check rcode."
  }
, "0x00002521":{
    "code":"DNS_ERROR_UNSECURE_PACKET"
  , "message":"Unsecured DNS packet."
  }
, "0x0000254F":{
    "code":"DNS_ERROR_INVALID_TYPE"
  , "message":"Invalid DNS type."
  }
, "0x00002550":{
    "code":"DNS_ERROR_INVALID_IP_ADDRESS"
  , "message":"Invalid IP address."
  }
, "0x00002551":{
    "code":"DNS_ERROR_INVALID_PROPERTY"
  , "message":"Invalid property."
  }
, "0x00002552":{
    "code":"DNS_ERROR_TRY_AGAIN_LATER"
  , "message":"Try DNS operation again later."
  }
, "0x00002553":{
    "code":"DNS_ERROR_NOT_UNIQUE"
  , "message":"Record for given name and type is not unique."
  }
, "0x00002554":{
    "code":"DNS_ERROR_NON_RFC_NAME"
  , "message":"DNS name does not comply with RFC specifications."
  }
, "0x00002555":{
    "code":"DNS_STATUS_FQDN"
  , "message":"DNS name is a fully qualified DNS name."
  }
, "0x00002556":{
    "code":"DNS_STATUS_DOTTED_NAME"
  , "message":"DNS name is dotted (multilabel)."
  }
, "0x00002557":{
    "code":"DNS_STATUS_SINGLE_PART_NAME"
  , "message":"DNS name is a single-part name."
  }
, "0x00002558":{
    "code":"DNS_ERROR_INVALID_NAME_CHAR"
  , "message":"DNS name contains an invalid character."
  }
, "0x00002559":{
    "code":"DNS_ERROR_NUMERIC_NAME"
  , "message":"DNS name is entirely numeric."
  }
, "0x0000255A":{
    "code":"DNS_ERROR_NOT_ALLOWED_ON_ROOT_SERVER"
  , "message":"The operation requested is not permitted on a DNS root server."
  }
, "0x0000255B":{
    "code":"DNS_ERROR_NOT_ALLOWED_UNDER_DELEGATION"
  , "message":"The record could not be created because this part of the DNS namespace has been delegated to another server."
  }
, "0x0000255C":{
    "code":"DNS_ERROR_CANNOT_FIND_ROOT_HINTS"
  , "message":"The DNS server could not find a set of root hints."
  }
, "0x0000255D":{
    "code":"DNS_ERROR_INCONSISTENT_ROOT_HINTS"
  , "message":"The DNS server found root hints but they were not consistent across all adapters."
  }
, "0x0000255E":{
    "code":"DNS_ERROR_DWORD_VALUE_TOO_SMALL"
  , "message":"The specified value is too small for this parameter."
  }
, "0x0000255F":{
    "code":"DNS_ERROR_DWORD_VALUE_TOO_LARGE"
  , "message":"The specified value is too large for this parameter."
  }
, "0x00002560":{
    "code":"DNS_ERROR_BACKGROUND_LOADING"
  , "message":"This operation is not allowed while the DNS server is loading zones in the background. Try again later."
  }
, "0x00002561":{
    "code":"DNS_ERROR_NOT_ALLOWED_ON_RODC"
  , "message":"The operation requested is not permitted on against a DNS server running on a read-only DC."
  }
, "0x00002581":{
    "code":"DNS_ERROR_ZONE_DOES_NOT_EXIST"
  , "message":"DNS zone does not exist."
  }
, "0x00002582":{
    "code":"DNS_ERROR_NO_ZONE_INFO"
  , "message":"DNS zone information not available."
  }
, "0x00002583":{
    "code":"DNS_ERROR_INVALID_ZONE_OPERATION"
  , "message":"Invalid operation for DNS zone."
  }
, "0x00002584":{
    "code":"DNS_ERROR_ZONE_CONFIGURATION_ERROR"
  , "message":"Invalid DNS zone configuration."
  }
, "0x00002585":{
    "code":"DNS_ERROR_ZONE_HAS_NO_SOA_RECORD"
  , "message":"DNS zone has no start of authority (SOA) record."
  }
, "0x00002586":{
    "code":"DNS_ERROR_ZONE_HAS_NO_NS_RECORDS"
  , "message":"DNS zone has no Name Server (NS) record."
  }
, "0x00002587":{
    "code":"DNS_ERROR_ZONE_LOCKED"
  , "message":"DNS zone is locked."
  }
, "0x00002588":{
    "code":"DNS_ERROR_ZONE_CREATION_FAILED"
  , "message":"DNS zone creation failed."
  }
, "0x00002589":{
    "code":"DNS_ERROR_ZONE_ALREADY_EXISTS"
  , "message":"DNS zone already exists."
  }
, "0x0000258A":{
    "code":"DNS_ERROR_AUTOZONE_ALREADY_EXISTS"
  , "message":"DNS automatic zone already exists."
  }
, "0x0000258B":{
    "code":"DNS_ERROR_INVALID_ZONE_TYPE"
  , "message":"Invalid DNS zone type."
  }
, "0x0000258C":{
    "code":"DNS_ERROR_SECONDARY_REQUIRES_MASTER_IP"
  , "message":"Secondary DNS zone requires master IP address."
  }
, "0x0000258D":{
    "code":"DNS_ERROR_ZONE_NOT_SECONDARY"
  , "message":"DNS zone not secondary."
  }
, "0x0000258E":{
    "code":"DNS_ERROR_NEED_SECONDARY_ADDRESSES"
  , "message":"Need secondary IP address."
  }
, "0x0000258F":{
    "code":"DNS_ERROR_WINS_INIT_FAILED"
  , "message":"WINS initialization failed."
  }
, "0x00002590":{
    "code":"DNS_ERROR_NEED_WINS_SERVERS"
  , "message":"Need WINS servers."
  }
, "0x00002591":{
    "code":"DNS_ERROR_NBSTAT_INIT_FAILED"
  , "message":"NBTSTAT initialization call failed."
  }
, "0x00002592":{
    "code":"DNS_ERROR_SOA_DELETE_INVALID"
  , "message":"Invalid delete of SOA."
  }
, "0x00002593":{
    "code":"DNS_ERROR_FORWARDER_ALREADY_EXISTS"
  , "message":"A conditional forwarding zone already exists for that name."
  }
, "0x00002594":{
    "code":"DNS_ERROR_ZONE_REQUIRES_MASTER_IP"
  , "message":"This zone must be configured with one or more master DNS server IP addresses."
  }
, "0x00002595":{
    "code":"DNS_ERROR_ZONE_IS_SHUTDOWN"
  , "message":"The operation cannot be performed because this zone is shut down."
  }
, "0x000025B3":{
    "code":"DNS_ERROR_PRIMARY_REQUIRES_DATAFILE"
  , "message":"The primary DNS zone requires a data file."
  }
, "0x000025B4":{
    "code":"DNS_ERROR_INVALID_DATAFILE_NAME"
  , "message":"Invalid data file name for the DNS zone."
  }
, "0x000025B5":{
    "code":"DNS_ERROR_DATAFILE_OPEN_FAILURE"
  , "message":"Failed to open the data file for the DNS zone."
  }
, "0x000025B6":{
    "code":"DNS_ERROR_FILE_WRITEBACK_FAILED"
  , "message":"Failed to write the data file for the DNS zone."
  }
, "0x000025B7":{
    "code":"DNS_ERROR_DATAFILE_PARSING"
  , "message":"Failure while reading datafile for DNS zone."
  }
, "0x000025E5":{
    "code":"DNS_ERROR_RECORD_DOES_NOT_EXIST"
  , "message":"DNS record does not exist."
  }
, "0x000025E6":{
    "code":"DNS_ERROR_RECORD_FORMAT"
  , "message":"DNS record format error."
  }
, "0x000025E7":{
    "code":"DNS_ERROR_NODE_CREATION_FAILED"
  , "message":"Node creation failure in DNS."
  }
, "0x000025E8":{
    "code":"DNS_ERROR_UNKNOWN_RECORD_TYPE"
  , "message":"Unknown DNS record type."
  }
, "0x000025E9":{
    "code":"DNS_ERROR_RECORD_TIMED_OUT"
  , "message":"DNS record timed out."
  }
, "0x000025EA":{
    "code":"DNS_ERROR_NAME_NOT_IN_ZONE"
  , "message":"Name not in DNS zone."
  }
, "0x000025EB":{
    "code":"DNS_ERROR_CNAME_LOOP"
  , "message":"CNAME loop detected."
  }
, "0x000025EC":{
    "code":"DNS_ERROR_NODE_IS_CNAME"
  , "message":"Node is a CNAME DNS record."
  }
, "0x000025ED":{
    "code":"DNS_ERROR_CNAME_COLLISION"
  , "message":"A CNAME record already exists for the given name."
  }
, "0x000025EE":{
    "code":"DNS_ERROR_RECORD_ONLY_AT_ZONE_ROOT"
  , "message":"Record is only at DNS zone root."
  }
, "0x000025EF":{
    "code":"DNS_ERROR_RECORD_ALREADY_EXISTS"
  , "message":"DNS record already exists."
  }
, "0x000025F0":{
    "code":"DNS_ERROR_SECONDARY_DATA"
  , "message":"Secondary DNS zone data error."
  }
, "0x000025F1":{
    "code":"DNS_ERROR_NO_CREATE_CACHE_DATA"
  , "message":"Could not create DNS cache data."
  }
, "0x000025F2":{
    "code":"DNS_ERROR_NAME_DOES_NOT_EXIST"
  , "message":"DNS name does not exist."
  }
, "0x000025F3":{
    "code":"DNS_WARNING_PTR_CREATE_FAILED"
  , "message":"Could not create pointer (PTR) record."
  }
, "0x000025F4":{
    "code":"DNS_WARNING_DOMAIN_UNDELETED"
  , "message":"DNS domain was undeleted."
  }
, "0x000025F5":{
    "code":"DNS_ERROR_DS_UNAVAILABLE"
  , "message":"The directory service is unavailable."
  }
, "0x000025F6":{
    "code":"DNS_ERROR_DS_ZONE_ALREADY_EXISTS"
  , "message":"DNS zone already exists in the directory service."
  }
, "0x000025F7":{
    "code":"DNS_ERROR_NO_BOOTFILE_IF_DS_ZONE"
  , "message":"DNS server not creating or reading the boot file for the directory service integrated DNS zone."
  }
, "0x00002617":{
    "code":"DNS_INFO_AXFR_COMPLETE"
  , "message":"DNS AXFR (zone transfer) complete."
  }
, "0x00002618":{
    "code":"DNS_ERROR_AXFR"
  , "message":"DNS zone transfer failed."
  }
, "0x00002619":{
    "code":"DNS_INFO_ADDED_LOCAL_WINS"
  , "message":"Added local WINS server."
  }
, "0x00002649":{
    "code":"DNS_STATUS_CONTINUE_NEEDED"
  , "message":"Secure update call needs to continue update request."
  }
, "0x0000267B":{
    "code":"DNS_ERROR_NO_TCPIP"
  , "message":"TCP/IP network protocol not installed."
  }
, "0x0000267C":{
    "code":"DNS_ERROR_NO_DNS_SERVERS"
  , "message":"No DNS servers configured for local system."
  }
, "0x000026AD":{
    "code":"DNS_ERROR_DP_DOES_NOT_EXIST"
  , "message":"The specified directory partition does not exist."
  }
, "0x000026AE":{
    "code":"DNS_ERROR_DP_ALREADY_EXISTS"
  , "message":"The specified directory partition already exists."
  }
, "0x000026AF":{
    "code":"DNS_ERROR_DP_NOT_ENLISTED"
  , "message":"This DNS server is not enlisted in the specified directory partition."
  }
, "0x000026B0":{
    "code":"DNS_ERROR_DP_ALREADY_ENLISTED"
  , "message":"This DNS server is already enlisted in the specified directory partition."
  }
, "0x000026B1":{
    "code":"DNS_ERROR_DP_NOT_AVAILABLE"
  , "message":"The directory partition is not available at this time. Wait a few minutes and try again."
  }
, "0x000026B2":{
    "code":"DNS_ERROR_DP_FSMO_ERROR"
  , "message":"The application directory partition operation failed. The domain controller holding the domain naming master role is down or unable to service the request or is not running Windows Server 2003."
  }
, "0x00002714":{
    "code":"WSAEINTR"
  , "message":"A blocking operation was interrupted by a call to WSACancelBlockingCall."
  }
, "0x00002719":{
    "code":"WSAEBADF"
  , "message":"The file handle supplied is not valid."
  }
, "0x0000271D":{
    "code":"WSAEACCES"
  , "message":"An attempt was made to access a socket in a way forbidden by its access permissions."
  }
, "0x0000271E":{
    "code":"WSAEFAULT"
  , "message":"The system detected an invalid pointer address in attempting to use a pointer argument in a call."
  }
, "0x00002726":{
    "code":"WSAEINVAL"
  , "message":"An invalid argument was supplied."
  }
, "0x00002728":{
    "code":"WSAEMFILE"
  , "message":"Too many open sockets."
  }
, "0x00002733":{
    "code":"WSAEWOULDBLOCK"
  , "message":"A nonblocking socket operation could not be completed immediately."
  }
, "0x00002734":{
    "code":"WSAEINPROGRESS"
  , "message":"A blocking operation is currently executing."
  }
, "0x00002735":{
    "code":"WSAEALREADY"
  , "message":"An operation was attempted on a nonblocking socket that already had an operation in progress."
  }
, "0x00002736":{
    "code":"WSAENOTSOCK"
  , "message":"An operation was attempted on something that is not a socket."
  }
, "0x00002737":{
    "code":"WSAEDESTADDRREQ"
  , "message":"A required address was omitted from an operation on a socket."
  }
, "0x00002738":{
    "code":"WSAEMSGSIZE"
  , "message":"A message sent on a datagram socket was larger than the internal message buffer or some other network limit, or the buffer used to receive a datagram into was smaller than the datagram itself."
  }
, "0x00002739":{
    "code":"WSAEPROTOTYPE"
  , "message":"A protocol was specified in the socket function call that does not support the semantics of the socket type requested."
  }
, "0x0000273A":{
    "code":"WSAENOPROTOOPT"
  , "message":"An unknown, invalid, or unsupported option or level was specified in a getsockopt or setsockopt call."
  }
, "0x0000273B":{
    "code":"WSAEPROTONOSUPPORT"
  , "message":"The requested protocol has not been configured into the system, or no implementation for it exists."
  }
, "0x0000273C":{
    "code":"WSAESOCKTNOSUPPORT"
  , "message":"The support for the specified socket type does not exist in this address family."
  }
, "0x0000273D":{
    "code":"WSAEOPNOTSUPP"
  , "message":"The attempted operation is not supported for the type of object referenced."
  }
, "0x0000273E":{
    "code":"WSAEPFNOSUPPORT"
  , "message":"The protocol family has not been configured into the system or no implementation for it exists."
  }
, "0x0000273F":{
    "code":"WSAEAFNOSUPPORT"
  , "message":"An address incompatible with the requested protocol was used."
  }
, "0x00002740":{
    "code":"WSAEADDRINUSE"
  , "message":"Only one usage of each socket address (protocol/network address/port) is normally permitted."
  }
, "0x00002741":{
    "code":"WSAEADDRNOTAVAIL"
  , "message":"The requested address is not valid in its context."
  }
, "0x00002742":{
    "code":"WSAENETDOWN"
  , "message":"A socket operation encountered a dead network."
  }
, "0x00002743":{
    "code":"WSAENETUNREACH"
  , "message":"A socket operation was attempted to an unreachable network."
  }
, "0x00002744":{
    "code":"WSAENETRESET"
  , "message":"The connection has been broken due to keep-alive activity detecting a failure while the operation was in progress."
  }
, "0x00002745":{
    "code":"WSAECONNABORTED"
  , "message":"An established connection was aborted by the software in your host machine."
  }
, "0x00002746":{
    "code":"WSAECONNRESET"
  , "message":"An existing connection was forcibly closed by the remote host."
  }
, "0x00002747":{
    "code":"WSAENOBUFS"
  , "message":"An operation on a socket could not be performed because the system lacked sufficient buffer space or because a queue was full."
  }
, "0x00002748":{
    "code":"WSAEISCONN"
  , "message":"A connect request was made on an already connected socket."
  }
, "0x00002749":{
    "code":"WSAENOTCONN"
  , "message":"A request to send or receive data was disallowed because the socket is not connected and (when sending on a datagram socket using a sendto call) no address was supplied."
  }
, "0x0000274A":{
    "code":"WSAESHUTDOWN"
  , "message":"A request to send or receive data was disallowed because the socket had already been shut down in that direction with a previous shutdown call."
  }
, "0x0000274B":{
    "code":"WSAETOOMANYREFS"
  , "message":"Too many references to a kernel object."
  }
, "0x0000274C":{
    "code":"WSAETIMEDOUT"
  , "message":"A connection attempt failed because the connected party did not properly respond after a period of time, or the established connection failed because the connected host failed to respond."
  }
, "0x0000274D":{
    "code":"WSAECONNREFUSED"
  , "message":"No connection could be made because the target machine actively refused it."
  }
, "0x0000274E":{
    "code":"WSAELOOP"
  , "message":"Cannot translate name."
  }
, "0x0000274F":{
    "code":"WSAENAMETOOLONG"
  , "message":"Name or name component was too long."
  }
, "0x00002750":{
    "code":"WSAEHOSTDOWN"
  , "message":"A socket operation failed because the destination host was down."
  }
, "0x00002751":{
    "code":"WSAEHOSTUNREACH"
  , "message":"A socket operation was attempted to an unreachable host."
  }
, "0x00002752":{
    "code":"WSAENOTEMPTY"
  , "message":"Cannot remove a directory that is not empty."
  }
, "0x00002753":{
    "code":"WSAEPROCLIM"
  , "message":"A Windows Sockets implementation may have a limit on the number of applications that may use it simultaneously."
  }
, "0x00002754":{
    "code":"WSAEUSERS"
  , "message":"Ran out of quota."
  }
, "0x00002755":{
    "code":"WSAEDQUOT"
  , "message":"Ran out of disk quota."
  }
, "0x00002756":{
    "code":"WSAESTALE"
  , "message":"File handle reference is no longer available."
  }
, "0x00002757":{
    "code":"WSAEREMOTE"
  , "message":"Item is not available locally."
  }
, "0x0000276B":{
    "code":"WSASYSNOTREADY"
  , "message":"WSAStartup cannot function at this time because the underlying system it uses to provide network services is currently unavailable."
  }
, "0x0000276C":{
    "code":"WSAVERNOTSUPPORTED"
  , "message":"The Windows Sockets version requested is not supported."
  }
, "0x0000276D":{
    "code":"WSANOTINITIALISED"
  , "message":"Either the application has not called WSAStartup, or WSAStartup failed."
  }
, "0x00002775":{
    "code":"WSAEDISCON"
  , "message":"Returned by WSARecv or WSARecvFrom to indicate that the remote party has initiated a graceful shutdown sequence."
  }
, "0x00002776":{
    "code":"WSAENOMORE"
  , "message":"No more results can be returned by WSALookupServiceNext."
  }
, "0x00002777":{
    "code":"WSAECANCELLED"
  , "message":"A call to WSALookupServiceEnd was made while this call was still processing. The call has been canceled."
  }
, "0x00002778":{
    "code":"WSAEINVALIDPROCTABLE"
  , "message":"The procedure call table is invalid."
  }
, "0x00002779":{
    "code":"WSAEINVALIDPROVIDER"
  , "message":"The requested service provider is invalid."
  }
, "0x0000277A":{
    "code":"WSAEPROVIDERFAILEDINIT"
  , "message":"The requested service provider could not be loaded or initialized."
  }
, "0x0000277B":{
    "code":"WSASYSCALLFAILURE"
  , "message":"A system call that should never fail has failed."
  }
, "0x0000277C":{
    "code":"WSASERVICE_NOT_FOUND"
  , "message":"No such service is known. The service cannot be found in the specified namespace."
  }
, "0x0000277D":{
    "code":"WSATYPE_NOT_FOUND"
  , "message":"The specified class was not found."
  }
, "0x0000277E":{
    "code":"WSA_E_NO_MORE"
  , "message":"No more results can be returned by WSALookupServiceNext."
  }
, "0x0000277F":{
    "code":"WSA_E_CANCELLED"
  , "message":"A call to WSALookupServiceEnd was made while this call was still processing. The call has been canceled."
  }
, "0x00002780":{
    "code":"WSAEREFUSED"
  , "message":"A database query failed because it was actively refused."
  }
, "0x00002AF9":{
    "code":"WSAHOST_NOT_FOUND"
  , "message":"No such host is known."
  }
, "0x00002AFA":{
    "code":"WSATRY_AGAIN"
  , "message":"This is usually a temporary error during host name resolution and means that the local server did not receive a response from an authoritative server."
  }
, "0x00002AFB":{
    "code":"WSANO_RECOVERY"
  , "message":"A nonrecoverable error occurred during a database lookup."
  }
, "0x00002AFC":{
    "code":"WSANO_DATA"
  , "message":"The requested name is valid, but no data of the requested type was found."
  }
, "0x00002AFD":{
    "code":"WSA_QOS_RECEIVERS"
  , "message":"At least one reserve has arrived."
  }
, "0x00002AFE":{
    "code":"WSA_QOS_SENDERS"
  , "message":"At least one path has arrived."
  }
, "0x00002AFF":{
    "code":"WSA_QOS_NO_SENDERS"
  , "message":"There are no senders."
  }
, "0x00002B00":{
    "code":"WSA_QOS_NO_RECEIVERS"
  , "message":"There are no receivers."
  }
, "0x00002B01":{
    "code":"WSA_QOS_REQUEST_CONFIRMED"
  , "message":"Reserve has been confirmed."
  }
, "0x00002B02":{
    "code":"WSA_QOS_ADMISSION_FAILURE"
  , "message":"Error due to lack of resources."
  }
, "0x00002B03":{
    "code":"WSA_QOS_POLICY_FAILURE"
  , "message":"Rejected for administrative reasons—bad credentials."
  }
, "0x00002B04":{
    "code":"WSA_QOS_BAD_STYLE"
  , "message":"Unknown or conflicting style."
  }
, "0x00002B05":{
    "code":"WSA_QOS_BAD_OBJECT"
  , "message":"There is a problem with some part of the filterspec or provider-specific buffer in general."
  }
, "0x00002B06":{
    "code":"WSA_QOS_TRAFFIC_CTRL_ERROR"
  , "message":"There is a problem with some part of the flowspec."
  }
, "0x00002B07":{
    "code":"WSA_QOS_GENERIC_ERROR"
  , "message":"General quality of serve (QOS) error."
  }
, "0x00002B08":{
    "code":"WSA_QOS_ESERVICETYPE"
  , "message":"An invalid or unrecognized service type was found in the flowspec."
  }
, "0x00002B09":{
    "code":"WSA_QOS_EFLOWSPEC"
  , "message":"An invalid or inconsistent flowspec was found in the QOS structure."
  }
, "0x00002B0A":{
    "code":"WSA_QOS_EPROVSPECBUF"
  , "message":"Invalid QOS provider-specific buffer."
  }
, "0x00002B0B":{
    "code":"WSA_QOS_EFILTERSTYLE"
  , "message":"An invalid QOS filter style was used."
  }
, "0x00002B0C":{
    "code":"WSA_QOS_EFILTERTYPE"
  , "message":"An invalid QOS filter type was used."
  }
, "0x00002B0D":{
    "code":"WSA_QOS_EFILTERCOUNT"
  , "message":"An incorrect number of QOS FILTERSPECs were specified in the FLOWDESCRIPTOR."
  }
, "0x00002B0E":{
    "code":"WSA_QOS_EOBJLENGTH"
  , "message":"An object with an invalid ObjectLength field was specified in the QOS provider-specific buffer."
  }
, "0x00002B0F":{
    "code":"WSA_QOS_EFLOWCOUNT"
  , "message":"An incorrect number of flow descriptors was specified in the QOS structure."
  }
, "0x00002B10":{
    "code":"WSA_QOS_EUNKOWNPSOBJ"
  , "message":"An unrecognized object was found in the QOS provider-specific buffer."
  }
, "0x00002B11":{
    "code":"WSA_QOS_EPOLICYOBJ"
  , "message":"An invalid policy object was found in the QOS provider-specific buffer."
  }
, "0x00002B12":{
    "code":"WSA_QOS_EFLOWDESC"
  , "message":"An invalid QOS flow descriptor was found in the flow descriptor list."
  }
, "0x00002B13":{
    "code":"WSA_QOS_EPSFLOWSPEC"
  , "message":"An invalid or inconsistent flowspec was found in the QOS provider-specific buffer."
  }
, "0x00002B14":{
    "code":"WSA_QOS_EPSFILTERSPEC"
  , "message":"An invalid FILTERSPEC was found in the QOS provider-specific buffer."
  }
, "0x00002B15":{
    "code":"WSA_QOS_ESDMODEOBJ"
  , "message":"An invalid shape discard mode object was found in the QOS provider-specific buffer."
  }
, "0x00002B16":{
    "code":"WSA_QOS_ESHAPERATEOBJ"
  , "message":"An invalid shaping rate object was found in the QOS provider-specific buffer."
  }
, "0x00002B17":{
    "code":"WSA_QOS_RESERVED_PETYPE"
  , "message":"A reserved policy element was found in the QOS provider-specific buffer."
  }
, "0x000032C8":{
    "code":"ERROR_IPSEC_QM_POLICY_EXISTS"
  , "message":"The specified quick mode policy already exists."
  }
, "0x000032C9":{
    "code":"ERROR_IPSEC_QM_POLICY_NOT_FOUND"
  , "message":"The specified quick mode policy was not found."
  }
, "0x000032CA":{
    "code":"ERROR_IPSEC_QM_POLICY_IN_USE"
  , "message":"The specified quick mode policy is being used."
  }
, "0x000032CB":{
    "code":"ERROR_IPSEC_MM_POLICY_EXISTS"
  , "message":"The specified main mode policy already exists."
  }
, "0x000032CC":{
    "code":"ERROR_IPSEC_MM_POLICY_NOT_FOUND"
  , "message":"The specified main mode policy was not found."
  }
, "0x000032CD":{
    "code":"ERROR_IPSEC_MM_POLICY_IN_USE"
  , "message":"The specified main mode policy is being used."
  }
, "0x000032CE":{
    "code":"ERROR_IPSEC_MM_FILTER_EXISTS"
  , "message":"The specified main mode filter already exists."
  }
, "0x000032CF":{
    "code":"ERROR_IPSEC_MM_FILTER_NOT_FOUND"
  , "message":"The specified main mode filter was not found."
  }
, "0x000032D0":{
    "code":"ERROR_IPSEC_TRANSPORT_FILTER_EXISTS"
  , "message":"The specified transport mode filter already exists."
  }
, "0x000032D1":{
    "code":"ERROR_IPSEC_TRANSPORT_FILTER_NOT_FOUND"
  , "message":"The specified transport mode filter does not exist."
  }
, "0x000032D2":{
    "code":"ERROR_IPSEC_MM_AUTH_EXISTS"
  , "message":"The specified main mode authentication list exists."
  }
, "0x000032D3":{
    "code":"ERROR_IPSEC_MM_AUTH_NOT_FOUND"
  , "message":"The specified main mode authentication list was not found."
  }
, "0x000032D4":{
    "code":"ERROR_IPSEC_MM_AUTH_IN_USE"
  , "message":"The specified main mode authentication list is being used."
  }
, "0x000032D5":{
    "code":"ERROR_IPSEC_DEFAULT_MM_POLICY_NOT_FOUND"
  , "message":"The specified default main mode policy was not found."
  }
, "0x000032D6":{
    "code":"ERROR_IPSEC_DEFAULT_MM_AUTH_NOT_FOUND"
  , "message":"The specified default main mode authentication list was not found."
  }
, "0x000032D7":{
    "code":"ERROR_IPSEC_DEFAULT_QM_POLICY_NOT_FOUND"
  , "message":"The specified default quick mode policy was not found."
  }
, "0x000032D8":{
    "code":"ERROR_IPSEC_TUNNEL_FILTER_EXISTS"
  , "message":"The specified tunnel mode filter exists."
  }
, "0x000032D9":{
    "code":"ERROR_IPSEC_TUNNEL_FILTER_NOT_FOUND"
  , "message":"The specified tunnel mode filter was not found."
  }
, "0x000032DA":{
    "code":"ERROR_IPSEC_MM_FILTER_PENDING_DELETION"
  , "message":"The main mode filter is pending deletion."
  }
, "0x000032DB":{
    "code":"ERROR_IPSEC_TRANSPORT_FILTER_ENDING_DELETION"
  , "message":"The transport filter is pending deletion."
  }
, "0x000032DC":{
    "code":"ERROR_IPSEC_TUNNEL_FILTER_PENDING_DELETION"
  , "message":"The tunnel filter is pending deletion."
  }
, "0x000032DD":{
    "code":"ERROR_IPSEC_MM_POLICY_PENDING_ELETION"
  , "message":"The main mode policy is pending deletion."
  }
, "0x000032DE":{
    "code":"ERROR_IPSEC_MM_AUTH_PENDING_DELETION"
  , "message":"The main mode authentication bundle is pending deletion."
  }
, "0x000032DF":{
    "code":"ERROR_IPSEC_QM_POLICY_PENDING_DELETION"
  , "message":"The quick mode policy is pending deletion."
  }
, "0x000032E0":{
    "code":"WARNING_IPSEC_MM_POLICY_PRUNED"
  , "message":"The main mode policy was successfully added, but some of the requested offers are not supported."
  }
, "0x000032E1":{
    "code":"WARNING_IPSEC_QM_POLICY_PRUNED"
  , "message":"The quick mode policy was successfully added, but some of the requested offers are not supported."
  }
, "0x000035E8":{
    "code":"ERROR_IPSEC_IKE_NEG_STATUS_BEGIN"
  , "message":"Starts the list of frequencies of various IKE Win32 error codes encountered during negotiations."
  }
, "0x000035E9":{
    "code":"ERROR_IPSEC_IKE_AUTH_FAIL"
  , "message":"The IKE authentication credentials are unacceptable."
  }
, "0x000035EA":{
    "code":"ERROR_IPSEC_IKE_ATTRIB_FAIL"
  , "message":"The IKE security attributes are unacceptable."
  }
, "0x000035EB":{
    "code":"ERROR_IPSEC_IKE_NEGOTIATION_PENDING"
  , "message":"The IKE negotiation is in progress."
  }
, "0x000035EC":{
    "code":"ERROR_IPSEC_IKE_GENERAL_PROCESSING_ERROR"
  , "message":"General processing error."
  }
, "0x000035ED":{
    "code":"ERROR_IPSEC_IKE_TIMED_OUT"
  , "message":"Negotiation timed out."
  }
, "0x000035EE":{
    "code":"ERROR_IPSEC_IKE_NO_CERT"
  , "message":"The IKE failed to find a valid machine certificate. Contact your network security administrator about installing a valid certificate in the appropriate certificate store."
  }
, "0x000035EF":{
    "code":"ERROR_IPSEC_IKE_SA_DELETED"
  , "message":"The IKE security association (SA) was deleted by a peer before it was completely established."
  }
, "0x000035F0":{
    "code":"ERROR_IPSEC_IKE_SA_REAPED"
  , "message":"The IKE SA was deleted before it was completely established."
  }
, "0x000035F1":{
    "code":"ERROR_IPSEC_IKE_MM_ACQUIRE_DROP"
  , "message":"The negotiation request sat in the queue too long."
  }
, "0x000035F2":{
    "code":"ERROR_IPSEC_IKE_QM_ACQUIRE_DROP"
  , "message":"The negotiation request sat in the queue too long."
  }
, "0x000035F3":{
    "code":"ERROR_IPSEC_IKE_QUEUE_DROP_MM"
  , "message":"The negotiation request sat in the queue too long."
  }
, "0x000035F4":{
    "code":"ERROR_IPSEC_IKE_QUEUE_DROP_NO_MM"
  , "message":"The negotiation request sat in the queue too long."
  }
, "0x000035F5":{
    "code":"ERROR_IPSEC_IKE_DROP_NO_RESPONSE"
  , "message":"There was no response from a peer."
  }
, "0x000035F6":{
    "code":"ERROR_IPSEC_IKE_MM_DELAY_DROP"
  , "message":"The negotiation took too long."
  }
, "0x000035F7":{
    "code":"ERROR_IPSEC_IKE_QM_DELAY_DROP"
  , "message":"The negotiation took too long."
  }
, "0x000035F8":{
    "code":"ERROR_IPSEC_IKE_ERROR"
  , "message":"An unknown error occurred."
  }
, "0x000035F9":{
    "code":"ERROR_IPSEC_IKE_CRL_FAILED"
  , "message":"The certificate revocation check failed."
  }
, "0x000035FA":{
    "code":"ERROR_IPSEC_IKE_INVALID_KEY_USAGE"
  , "message":"Invalid certificate key usage."
  }
, "0x000035FB":{
    "code":"ERROR_IPSEC_IKE_INVALID_CERT_TYPE"
  , "message":"Invalid certificate type."
  }
, "0x000035FC":{
    "code":"ERROR_IPSEC_IKE_NO_PRIVATE_KEY"
  , "message":"The IKE negotiation failed because the machine certificate used does not have a private key. IPsec certificates require a private key. Contact your network security administrator about a certificate that has a private key."
  }
, "0x000035FE":{
    "code":"ERROR_IPSEC_IKE_DH_FAIL"
  , "message":"There was a failure in the Diffie-Hellman computation."
  }
, "0x00003600":{
    "code":"ERROR_IPSEC_IKE_INVALID_HEADER"
  , "message":"Invalid header."
  }
, "0x00003601":{
    "code":"ERROR_IPSEC_IKE_NO_POLICY"
  , "message":"No policy configured."
  }
, "0x00003602":{
    "code":"ERROR_IPSEC_IKE_INVALID_SIGNATURE"
  , "message":"Failed to verify signature."
  }
, "0x00003603":{
    "code":"ERROR_IPSEC_IKE_KERBEROS_ERROR"
  , "message":"Failed to authenticate using Kerberos."
  }
, "0x00003604":{
    "code":"ERROR_IPSEC_IKE_NO_PUBLIC_KEY"
  , "message":"The peer\'s certificate did not have a public key."
  }
, "0x00003605":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR"
  , "message":"Error processing the error payload."
  }
, "0x00003606":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_SA"
  , "message":"Error processing the SA payload."
  }
, "0x00003607":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_PROP"
  , "message":"Error processing the proposal payload."
  }
, "0x00003608":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_TRANS"
  , "message":"Error processing the transform payload."
  }
, "0x00003609":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_KE"
  , "message":"Error processing the key exchange payload."
  }
, "0x0000360A":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_ID"
  , "message":"Error processing the ID payload."
  }
, "0x0000360B":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_CERT"
  , "message":"Error processing the certification payload."
  }
, "0x0000360C":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_CERT_REQ"
  , "message":"Error processing the certificate request payload."
  }
, "0x0000360D":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_HASH"
  , "message":"Error processing the hash payload."
  }
, "0x0000360E":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_SIG"
  , "message":"Error processing the signature payload."
  }
, "0x0000360F":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_NONCE"
  , "message":"Error processing the nonce payload."
  }
, "0x00003610":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_NOTIFY"
  , "message":"Error processing the notify payload."
  }
, "0x00003611":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_DELETE"
  , "message":"Error processing the delete payload."
  }
, "0x00003612":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_VENDOR"
  , "message":"Error processing the VendorId payload."
  }
, "0x00003613":{
    "code":"ERROR_IPSEC_IKE_INVALID_PAYLOAD"
  , "message":"Invalid payload received."
  }
, "0x00003614":{
    "code":"ERROR_IPSEC_IKE_LOAD_SOFT_SA"
  , "message":"Soft SA loaded."
  }
, "0x00003615":{
    "code":"ERROR_IPSEC_IKE_SOFT_SA_TORN_DOWN"
  , "message":"Soft SA torn down."
  }
, "0x00003616":{
    "code":"ERROR_IPSEC_IKE_INVALID_COOKIE"
  , "message":"Invalid cookie received."
  }
, "0x00003617":{
    "code":"ERROR_IPSEC_IKE_NO_PEER_CERT"
  , "message":"Peer failed to send valid machine certificate."
  }
, "0x00003618":{
    "code":"ERROR_IPSEC_IKE_PEER_CRL_FAILED"
  , "message":"Certification revocation check of peer\'s certificate failed."
  }
, "0x00003619":{
    "code":"ERROR_IPSEC_IKE_POLICY_CHANGE"
  , "message":"New policy invalidated SAs formed with the old policy."
  }
, "0x0000361A":{
    "code":"ERROR_IPSEC_IKE_NO_MM_POLICY"
  , "message":"There is no available main mode IKE policy."
  }
, "0x0000361B":{
    "code":"ERROR_IPSEC_IKE_NOTCBPRIV"
  , "message":"Failed to enabled trusted computer base (TCB) privilege."
  }
, "0x0000361C":{
    "code":"ERROR_IPSEC_IKE_SECLOADFAIL"
  , "message":"Failed to load SECURITY.DLL."
  }
, "0x0000361D":{
    "code":"ERROR_IPSEC_IKE_FAILSSPINIT"
  , "message":"Failed to obtain the security function table dispatch address from the SSPI."
  }
, "0x0000361E":{
    "code":"ERROR_IPSEC_IKE_FAILQUERYSSP"
  , "message":"Failed to query the Kerberos package to obtain the max token size."
  }
, "0x0000361F":{
    "code":"ERROR_IPSEC_IKE_SRVACQFAIL"
  , "message":"Failed to obtain the Kerberos server credentials for the Internet Security Association and Key Management Protocol (ISAKMP)/ERROR_IPSEC_IKE service. Kerberos authentication will not function. The most likely reason for this is lack of domain membership. This is normal if your computer is a member of a workgroup."
  }
, "0x00003620":{
    "code":"ERROR_IPSEC_IKE_SRVQUERYCRED"
  , "message":"Failed to determine the SSPI principal name for ISAKMP/ERROR_IPSEC_IKE service (QueryCredentialsAttributes)."
  }
, "0x00003621":{
    "code":"ERROR_IPSEC_IKE_GETSPIFAIL"
  , "message":"Failed to obtain a new service provider interface (SPI) for the inbound SA from the IPsec driver. The most common cause for this is that the driver does not have the correct filter. Check your policy to verify the filters."
  }
, "0x00003622":{
    "code":"ERROR_IPSEC_IKE_INVALID_FILTER"
  , "message":"Given filter is invalid."
  }
, "0x00003623":{
    "code":"ERROR_IPSEC_IKE_OUT_OF_MEMORY"
  , "message":"Memory allocation failed."
  }
, "0x00003624":{
    "code":"ERROR_IPSEC_IKE_ADD_UPDATE_KEY_FAILED"
  , "message":"Failed to add an SA to the IPSec driver. The most common cause for this is if the IKE negotiation took too long to complete. If the problem persists, reduce the load on the faulting machine."
  }
, "0x00003625":{
    "code":"ERROR_IPSEC_IKE_INVALID_POLICY"
  , "message":"Invalid policy."
  }
, "0x00003626":{
    "code":"ERROR_IPSEC_IKE_UNKNOWN_DOI"
  , "message":"Invalid digital object identifier (DOI)."
  }
, "0x00003627":{
    "code":"ERROR_IPSEC_IKE_INVALID_SITUATION"
  , "message":"Invalid situation."
  }
, "0x00003628":{
    "code":"ERROR_IPSEC_IKE_DH_FAILURE"
  , "message":"Diffie-Hellman failure."
  }
, "0x00003629":{
    "code":"ERROR_IPSEC_IKE_INVALID_GROUP"
  , "message":"Invalid Diffie-Hellman group."
  }
, "0x0000362A":{
    "code":"ERROR_IPSEC_IKE_ENCRYPT"
  , "message":"Error encrypting payload."
  }
, "0x0000362B":{
    "code":"ERROR_IPSEC_IKE_DECRYPT"
  , "message":"Error decrypting payload."
  }
, "0x0000362C":{
    "code":"ERROR_IPSEC_IKE_POLICY_MATCH"
  , "message":"Policy match error."
  }
, "0x0000362D":{
    "code":"ERROR_IPSEC_IKE_UNSUPPORTED_ID"
  , "message":"Unsupported ID."
  }
, "0x0000362E":{
    "code":"ERROR_IPSEC_IKE_INVALID_HASH"
  , "message":"Hash verification failed."
  }
, "0x0000362F":{
    "code":"ERROR_IPSEC_IKE_INVALID_HASH_ALG"
  , "message":"Invalid hash algorithm."
  }
, "0x00003630":{
    "code":"ERROR_IPSEC_IKE_INVALID_HASH_SIZE"
  , "message":"Invalid hash size."
  }
, "0x00003631":{
    "code":"ERROR_IPSEC_IKE_INVALID_ENCRYPT_ALG"
  , "message":"Invalid encryption algorithm."
  }
, "0x00003632":{
    "code":"ERROR_IPSEC_IKE_INVALID_AUTH_ALG"
  , "message":"Invalid authentication algorithm."
  }
, "0x00003633":{
    "code":"ERROR_IPSEC_IKE_INVALID_SIG"
  , "message":"Invalid certificate signature."
  }
, "0x00003634":{
    "code":"ERROR_IPSEC_IKE_LOAD_FAILED"
  , "message":"Load failed."
  }
, "0x00003635":{
    "code":"ERROR_IPSEC_IKE_RPC_DELETE"
  , "message":"Deleted by using an RPC call."
  }
, "0x00003636":{
    "code":"ERROR_IPSEC_IKE_BENIGN_REINIT"
  , "message":"A temporary state was created to perform reinitialization. This is not a real failure."
  }
, "0x00003637":{
    "code":"ERROR_IPSEC_IKE_INVALID_RESPONDER_LIFETIME_NOTIFY"
  , "message":"The lifetime value received in the Responder Lifetime Notify is below the Windows 2000 configured minimum value. Fix the policy on the peer machine."
  }
, "0x00003639":{
    "code":"ERROR_IPSEC_IKE_INVALID_CERT_KEYLEN"
  , "message":"Key length in the certificate is too small for configured security requirements."
  }
, "0x0000363A":{
    "code":"ERROR_IPSEC_IKE_MM_LIMIT"
  , "message":"Maximum number of established MM SAs to peer exceeded."
  }
, "0x0000363B":{
    "code":"ERROR_IPSEC_IKE_NEGOTIATION_DISABLED"
  , "message":"The IKE received a policy that disables negotiation."
  }
, "0x0000363C":{
    "code":"ERROR_IPSEC_IKE_QM_LIMIT"
  , "message":"Reached maximum quick mode limit for the main mode. New main mode will be started."
  }
, "0x0000363D":{
    "code":"ERROR_IPSEC_IKE_MM_EXPIRED"
  , "message":"Main mode SA lifetime expired or the peer sent a main mode delete."
  }
, "0x0000363E":{
    "code":"ERROR_IPSEC_IKE_PEER_MM_ASSUMED_INVALID"
  , "message":"Main mode SA assumed to be invalid because peer stopped responding."
  }
, "0x0000363F":{
    "code":"ERROR_IPSEC_IKE_CERT_CHAIN_POLICY_MISMATCH"
  , "message":"Certificate does not chain to a trusted root in IPsec policy."
  }
, "0x00003640":{
    "code":"ERROR_IPSEC_IKE_UNEXPECTED_MESSAGE_ID"
  , "message":"Received unexpected message ID."
  }
, "0x00003641":{
    "code":"ERROR_IPSEC_IKE_INVALID_UMATTS"
  , "message":"Received invalid AuthIP user mode attributes."
  }
, "0x00003642":{
    "code":"ERROR_IPSEC_IKE_DOS_COOKIE_SENT"
  , "message":"Sent DOS cookie notify to initiator."
  }
, "0x00003643":{
    "code":"ERROR_IPSEC_IKE_SHUTTING_DOWN"
  , "message":"The IKE service is shutting down."
  }
, "0x00003644":{
    "code":"ERROR_IPSEC_IKE_CGA_AUTH_FAILED"
  , "message":"Could not verify the binding between the color graphics adapter (CGA) address and the certificate."
  }
, "0x00003645":{
    "code":"ERROR_IPSEC_IKE_PROCESS_ERR_NATOA"
  , "message":"Error processing the NatOA payload."
  }
, "0x00003646":{
    "code":"ERROR_IPSEC_IKE_INVALID_MM_FOR_QM"
  , "message":"The parameters of the main mode are invalid for this quick mode."
  }
, "0x00003647":{
    "code":"ERROR_IPSEC_IKE_QM_EXPIRED"
  , "message":"The quick mode SA was expired by the IPsec driver."
  }
, "0x00003648":{
    "code":"ERROR_IPSEC_IKE_TOO_MANY_FILTERS"
  , "message":"Too many dynamically added IKEEXT filters were detected."
  }
, "0x00003649":{
    "code":"ERROR_IPSEC_IKE_NEG_STATUS_END"
  , "message":"Ends the list of frequencies of various IKE Win32 error codes encountered during negotiations."
  }
, "0x000036B0":{
    "code":"ERROR_SXS_SECTION_NOT_FOUND"
  , "message":"The requested section was not present in the activation context."
  }
, "0x000036B1":{
    "code":"ERROR_SXS_CANT_GEN_ACTCTX"
  , "message":"The application has failed to start because its side-by-side configuration is incorrect. See the application event log for more detail."
  }
, "0x000036B2":{
    "code":"ERROR_SXS_INVALID_ACTCTXDATA_FORMAT"
  , "message":"The application binding data format is invalid."
  }
, "0x000036B3":{
    "code":"ERROR_SXS_ASSEMBLY_NOT_FOUND"
  , "message":"The referenced assembly is not installed on your system."
  }
, "0x000036B4":{
    "code":"ERROR_SXS_MANIFEST_FORMAT_ERROR"
  , "message":"The manifest file does not begin with the required tag and format information."
  }
, "0x000036B5":{
    "code":"ERROR_SXS_MANIFEST_PARSE_ERROR"
  , "message":"The manifest file contains one or more syntax errors."
  }
, "0x000036B6":{
    "code":"ERROR_SXS_ACTIVATION_CONTEXT_DISABLED"
  , "message":"The application attempted to activate a disabled activation context."
  }
, "0x000036B7":{
    "code":"ERROR_SXS_KEY_NOT_FOUND"
  , "message":"The requested lookup key was not found in any active activation context."
  }
, "0x000036B8":{
    "code":"ERROR_SXS_VERSION_CONFLICT"
  , "message":"A component version required by the application conflicts with another active component version."
  }
, "0x000036B9":{
    "code":"ERROR_SXS_WRONG_SECTION_TYPE"
  , "message":"The type requested activation context section does not match the query API used."
  }
, "0x000036BA":{
    "code":"ERROR_SXS_THREAD_QUERIES_DISABLED"
  , "message":"Lack of system resources has required isolated activation to be disabled for the current thread of execution."
  }
, "0x000036BB":{
    "code":"ERROR_SXS_PROCESS_DEFAULT_ALREADY_SET"
  , "message":"An attempt to set the process default activation context failed because the process default activation context was already set."
  }
, "0x000036BC":{
    "code":"ERROR_SXS_UNKNOWN_ENCODING_GROUP"
  , "message":"The encoding group identifier specified is not recognized."
  }
, "0x000036BD":{
    "code":"ERROR_SXS_UNKNOWN_ENCODING"
  , "message":"The encoding requested is not recognized."
  }
, "0x000036BE":{
    "code":"ERROR_SXS_INVALID_XML_NAMESPACE_URI"
  , "message":"The manifest contains a reference to an invalid URI."
  }
, "0x000036BF":{
    "code":"ERROR_SXS_ROOT_MANIFEST_DEPENDENCY_OT_INSTALLED"
  , "message":"The application manifest contains a reference to a dependent assembly that is not installed."
  }
, "0x000036C0":{
    "code":"ERROR_SXS_LEAF_MANIFEST_DEPENDENCY_NOT_INSTALLED"
  , "message":"The manifest for an assembly used by the application has a reference to a dependent assembly that is not installed."
  }
, "0x000036C1":{
    "code":"ERROR_SXS_INVALID_ASSEMBLY_IDENTITY_ATTRIBUTE"
  , "message":"The manifest contains an attribute for the assembly identity that is not valid."
  }
, "0x000036C2":{
    "code":"ERROR_SXS_MANIFEST_MISSING_REQUIRED_DEFAULT_NAMESPACE"
  , "message":"The manifest is missing the required default namespace specification on the assembly element."
  }
, "0x000036C3":{
    "code":"ERROR_SXS_MANIFEST_INVALID_REQUIRED_DEFAULT_NAMESPACE"
  , "message":"The manifest has a default namespace specified on the assembly element but its value is not urn:schemas-microsoft-com:asm.v1\".\""
  }
, "0x000036C4":{
    "code":"ERROR_SXS_PRIVATE_MANIFEST_CROSS_PATH_WITH_REPARSE_POINT"
  , "message":"The private manifest probed has crossed the reparse-point-associated path."
  }
, "0x000036C5":{
    "code":"ERROR_SXS_DUPLICATE_DLL_NAME"
  , "message":"Two or more components referenced directly or indirectly by the application manifest have files by the same name."
  }
, "0x000036C6":{
    "code":"ERROR_SXS_DUPLICATE_WINDOWCLASS_NAME"
  , "message":"Two or more components referenced directly or indirectly by the application manifest have window classes with the same name."
  }
, "0x000036C7":{
    "code":"ERROR_SXS_DUPLICATE_CLSID"
  , "message":"Two or more components referenced directly or indirectly by the application manifest have the same COM server CLSIDs."
  }
, "0x000036C8":{
    "code":"ERROR_SXS_DUPLICATE_IID"
  , "message":"Two or more components referenced directly or indirectly by the application manifest have proxies for the same COM interface IIDs."
  }
, "0x000036C9":{
    "code":"ERROR_SXS_DUPLICATE_TLBID"
  , "message":"Two or more components referenced directly or indirectly by the application manifest have the same COM type library TLBIDs."
  }
, "0x000036CA":{
    "code":"ERROR_SXS_DUPLICATE_PROGID"
  , "message":"Two or more components referenced directly or indirectly by the application manifest have the same COM ProgIDs."
  }
, "0x000036CB":{
    "code":"ERROR_SXS_DUPLICATE_ASSEMBLY_NAME"
  , "message":"Two or more components referenced directly or indirectly by the application manifest are different versions of the same component, which is not permitted."
  }
, "0x000036CC":{
    "code":"ERROR_SXS_FILE_HASH_MISMATCH"
  , "message":"A component\'s file does not match the verification information present in the component manifest."
  }
, "0x000036CD":{
    "code":"ERROR_SXS_POLICY_PARSE_ERROR"
  , "message":"The policy manifest contains one or more syntax errors."
  }
, "0x000036CE":{
    "code":"ERROR_SXS_XML_E_MISSINGQUOTE"
  , "message":"Manifest Parse Error: A string literal was expected, but no opening quotation mark was found."
  }
, "0x000036CF":{
    "code":"ERROR_SXS_XML_E_COMMENTSYNTAX"
  , "message":"Manifest Parse Error: Incorrect syntax was used in a comment."
  }
, "0x000036D0":{
    "code":"ERROR_SXS_XML_E_BADSTARTNAMECHAR"
  , "message":"Manifest Parse Error: A name started with an invalid character."
  }
, "0x000036D1":{
    "code":"ERROR_SXS_XML_E_BADNAMECHAR"
  , "message":"Manifest Parse Error: A name contained an invalid character."
  }
, "0x000036D2":{
    "code":"ERROR_SXS_XML_E_BADCHARINSTRING"
  , "message":"Manifest Parse Error: A string literal contained an invalid character."
  }
, "0x000036D3":{
    "code":"ERROR_SXS_XML_E_XMLDECLSYNTAX"
  , "message":"Manifest Parse Error: Invalid syntax for an XML declaration."
  }
, "0x000036D4":{
    "code":"ERROR_SXS_XML_E_BADCHARDATA"
  , "message":"Manifest Parse Error: An Invalid character was found in text content."
  }
, "0x000036D5":{
    "code":"ERROR_SXS_XML_E_MISSINGWHITESPACE"
  , "message":"Manifest Parse Error: Required white space was missing."
  }
, "0x000036D6":{
    "code":"ERROR_SXS_XML_E_EXPECTINGTAGEND"
  , "message":"Manifest Parse Error: The angle bracket (>) character was expected."
  }
, "0x000036D7":{
    "code":"ERROR_SXS_XML_E_MISSINGSEMICOLON"
  , "message":"Manifest Parse Error: A semicolon (;) was expected."
  }
, "0x000036D8":{
    "code":"ERROR_SXS_XML_E_UNBALANCEDPAREN"
  , "message":"Manifest Parse Error: Unbalanced parentheses."
  }
, "0x000036D9":{
    "code":"ERROR_SXS_XML_E_INTERNALERROR"
  , "message":"Manifest Parse Error: Internal error."
  }
, "0x000036DA":{
    "code":"ERROR_SXS_XML_E_UNEXPECTED_WHITESPACE"
  , "message":"Manifest Parse Error: Whitespace is not allowed at this location."
  }
, "0x000036DB":{
    "code":"ERROR_SXS_XML_E_INCOMPLETE_ENCODING"
  , "message":"Manifest Parse Error: End of file reached in invalid state for current encoding."
  }
, "0x000036DC":{
    "code":"ERROR_SXS_XML_E_MISSING_PAREN"
  , "message":"Manifest Parse Error: Missing parenthesis."
  }
, "0x000036DD":{
    "code":"ERROR_SXS_XML_E_EXPECTINGCLOSEQUOTE"
  , "message":"Manifest Parse Error: A single (\') or double (\") quotation mark is missing."
  }
, "0x000036DE":{
    "code":"ERROR_SXS_XML_E_MULTIPLE_COLONS"
  , "message":"Manifest Parse Error: Multiple colons are not allowed in a name."
  }
, "0x000036DF":{
    "code":"ERROR_SXS_XML_E_INVALID_DECIMAL"
  , "message":"Manifest Parse Error: Invalid character for decimal digit."
  }
, "0x000036E0":{
    "code":"ERROR_SXS_XML_E_INVALID_HEXIDECIMAL"
  , "message":"Manifest Parse Error: Invalid character for hexadecimal digit."
  }
, "0x000036E1":{
    "code":"ERROR_SXS_XML_E_INVALID_UNICODE"
  , "message":"Manifest Parse Error: Invalid Unicode character value for this platform."
  }
, "0x000036E2":{
    "code":"ERROR_SXS_XML_E_WHITESPACEORQUESTIONMARK"
  , "message":"Manifest Parse Error: Expecting whitespace or question mark (?)."
  }
, "0x000036E3":{
    "code":"ERROR_SXS_XML_E_UNEXPECTEDENDTAG"
  , "message":"Manifest Parse Error: End tag was not expected at this location."
  }
, "0x000036E4":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDTAG"
  , "message":"Manifest Parse Error: The following tags were not closed: %1."
  }
, "0x000036E5":{
    "code":"ERROR_SXS_XML_E_DUPLICATEATTRIBUTE"
  , "message":"Manifest Parse Error: Duplicate attribute."
  }
, "0x000036E6":{
    "code":"ERROR_SXS_XML_E_MULTIPLEROOTS"
  , "message":"Manifest Parse Error: Only one top-level element is allowed in an XML document."
  }
, "0x000036E7":{
    "code":"ERROR_SXS_XML_E_INVALIDATROOTLEVEL"
  , "message":"Manifest Parse Error: Invalid at the top level of the document."
  }
, "0x000036E8":{
    "code":"ERROR_SXS_XML_E_BADXMLDECL"
  , "message":"Manifest Parse Error: Invalid XML declaration."
  }
, "0x000036E9":{
    "code":"ERROR_SXS_XML_E_MISSINGROOT"
  , "message":"Manifest Parse Error: XML document must have a top-level element."
  }
, "0x000036EA":{
    "code":"ERROR_SXS_XML_E_UNEXPECTEDEOF"
  , "message":"Manifest Parse Error: Unexpected end of file."
  }
, "0x000036EB":{
    "code":"ERROR_SXS_XML_E_BADPEREFINSUBSET"
  , "message":"Manifest Parse Error: Parameter entities cannot be used inside markup declarations in an internal subset."
  }
, "0x000036EC":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDSTARTTAG"
  , "message":"Manifest Parse Error: Element was not closed."
  }
, "0x000036ED":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDENDTAG"
  , "message":"Manifest Parse Error: End element was missing the angle bracket (>) character."
  }
, "0x000036EE":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDSTRING"
  , "message":"Manifest Parse Error: A string literal was not closed."
  }
, "0x000036EF":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDCOMMENT"
  , "message":"Manifest Parse Error: A comment was not closed."
  }
, "0x000036F0":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDDECL"
  , "message":"Manifest Parse Error: A declaration was not closed."
  }
, "0x000036F1":{
    "code":"ERROR_SXS_XML_E_UNCLOSEDCDATA"
  , "message":"Manifest Parse Error: A CDATA section was not closed."
  }
, "0x000036F2":{
    "code":"ERROR_SXS_XML_E_RESERVEDNAMESPACE"
  , "message":"Manifest Parse Error: The namespace prefix is not allowed to start with the reserved string xml\".\""
  }
, "0x000036F3":{
    "code":"ERROR_SXS_XML_E_INVALIDENCODING"
  , "message":"Manifest Parse Error: System does not support the specified encoding."
  }
, "0x000036F4":{
    "code":"ERROR_SXS_XML_E_INVALIDSWITCH"
  , "message":"Manifest Parse Error: Switch from current encoding to specified encoding not supported."
  }
, "0x000036F5":{
    "code":"ERROR_SXS_XML_E_BADXMLCASE"
  , "message":"Manifest Parse Error: The name \"xml\" is reserved and must be lowercase."
  }
, "0x000036F6":{
    "code":"ERROR_SXS_XML_E_INVALID_STANDALONE"
  , "message":"Manifest Parse Error: The stand-alone attribute must have the value \"yes\" or \"no\"."
  }
, "0x000036F7":{
    "code":"ERROR_SXS_XML_E_UNEXPECTED_STANDALONE"
  , "message":"Manifest Parse Error: The stand-alone attribute cannot be used in external entities."
  }
, "0x000036F8":{
    "code":"ERROR_SXS_XML_E_INVALID_VERSION"
  , "message":"Manifest Parse Error: Invalid version number."
  }
, "0x000036F9":{
    "code":"ERROR_SXS_XML_E_MISSINGEQUALS"
  , "message":"Manifest Parse Error: Missing equal sign (=) between the attribute and the attribute value."
  }
, "0x000036FA":{
    "code":"ERROR_SXS_PROTECTION_RECOVERY_FAILED"
  , "message":"Assembly Protection Error: Unable to recover the specified assembly."
  }
, "0x000036FB":{
    "code":"ERROR_SXS_PROTECTION_PUBLIC_KEY_OO_SHORT"
  , "message":"Assembly Protection Error: The public key for an assembly was too short to be allowed."
  }
, "0x000036FC":{
    "code":"ERROR_SXS_PROTECTION_CATALOG_NOT_VALID"
  , "message":"Assembly Protection Error: The catalog for an assembly is not valid, or does not match the assembly\'s manifest."
  }
, "0x000036FD":{
    "code":"ERROR_SXS_UNTRANSLATABLE_HRESULT"
  , "message":"An HRESULT could not be translated to a corresponding Win32 error code."
  }
, "0x000036FE":{
    "code":"ERROR_SXS_PROTECTION_CATALOG_FILE_MISSING"
  , "message":"Assembly Protection Error: The catalog for an assembly is missing."
  }
, "0x000036FF":{
    "code":"ERROR_SXS_MISSING_ASSEMBLY_IDENTITY_ATTRIBUTE"
  , "message":"The supplied assembly identity is missing one or more attributes that must be present in this context."
  }
, "0x00003700":{
    "code":"ERROR_SXS_INVALID_ASSEMBLY_IDENTITY_ATTRIBUTE_NAME"
  , "message":"The supplied assembly identity has one or more attribute names that contain characters not permitted in XML names."
  }
, "0x00003701":{
    "code":"ERROR_SXS_ASSEMBLY_MISSING"
  , "message":"The referenced assembly could not be found."
  }
, "0x00003702":{
    "code":"ERROR_SXS_CORRUPT_ACTIVATION_STACK"
  , "message":"The activation context activation stack for the running thread of execution is corrupt."
  }
, "0x00003703":{
    "code":"ERROR_SXS_CORRUPTION"
  , "message":"The application isolation metadata for this process or thread has become corrupt."
  }
, "0x00003704":{
    "code":"ERROR_SXS_EARLY_DEACTIVATION"
  , "message":"The activation context being deactivated is not the most recently activated one."
  }
, "0x00003705":{
    "code":"ERROR_SXS_INVALID_DEACTIVATION"
  , "message":"The activation context being deactivated is not active for the current thread of execution."
  }
, "0x00003706":{
    "code":"ERROR_SXS_MULTIPLE_DEACTIVATION"
  , "message":"The activation context being deactivated has already been deactivated."
  }
, "0x00003707":{
    "code":"ERROR_SXS_PROCESS_TERMINATION_REQUESTED"
  , "message":"A component used by the isolation facility has requested to terminate the process."
  }
, "0x00003708":{
    "code":"ERROR_SXS_RELEASE_ACTIVATION_ONTEXT"
  , "message":"A kernel mode component is releasing a reference on an activation context."
  }
, "0x00003709":{
    "code":"ERROR_SXS_SYSTEM_DEFAULT_ACTIVATION_CONTEXT_EMPTY"
  , "message":"The activation context of the system default assembly could not be generated."
  }
, "0x0000370A":{
    "code":"ERROR_SXS_INVALID_IDENTITY_ATTRIBUTE_VALUE"
  , "message":"The value of an attribute in an identity is not within the legal range."
  }
, "0x0000370B":{
    "code":"ERROR_SXS_INVALID_IDENTITY_ATTRIBUTE_NAME"
  , "message":"The name of an attribute in an identity is not within the legal range."
  }
, "0x0000370C":{
    "code":"ERROR_SXS_IDENTITY_DUPLICATE_ATTRIBUTE"
  , "message":"An identity contains two definitions for the same attribute."
  }
, "0x0000370D":{
    "code":"ERROR_SXS_IDENTITY_PARSE_ERROR"
  , "message":"The identity string is malformed. This may be due to a trailing comma, more than two unnamed attributes, a missing attribute name, or a missing attribute value."
  }
, "0x0000370E":{
    "code":"ERROR_MALFORMED_SUBSTITUTION_STRING"
  , "message":"A string containing localized substitutable content was malformed. Either a dollar sign ($) was followed by something other than a left parenthesis or another dollar sign, or a substitution\'s right parenthesis was not found."
  }
, "0x0000370F":{
    "code":"ERROR_SXS_INCORRECT_PUBLIC_KEY_OKEN"
  , "message":"The public key token does not correspond to the public key specified."
  }
, "0x00003710":{
    "code":"ERROR_UNMAPPED_SUBSTITUTION_STRING"
  , "message":"A substitution string had no mapping."
  }
, "0x00003711":{
    "code":"ERROR_SXS_ASSEMBLY_NOT_LOCKED"
  , "message":"The component must be locked before making the request."
  }
, "0x00003712":{
    "code":"ERROR_SXS_COMPONENT_STORE_CORRUPT"
  , "message":"The component store has been corrupted."
  }
, "0x00003713":{
    "code":"ERROR_ADVANCED_INSTALLER_FAILED"
  , "message":"An advanced installer failed during setup or servicing."
  }
, "0x00003714":{
    "code":"ERROR_XML_ENCODING_MISMATCH"
  , "message":"The character encoding in the XML declaration did not match the encoding used in the document."
  }
, "0x00003715":{
    "code":"ERROR_SXS_MANIFEST_IDENTITY_SAME_BUT_CONTENTS_DIFFERENT"
  , "message":"The identities of the manifests are identical, but the contents are different."
  }
, "0x00003716":{
    "code":"ERROR_SXS_IDENTITIES_DIFFERENT"
  , "message":"The component identities are different."
  }
, "0x00003717":{
    "code":"ERROR_SXS_ASSEMBLY_IS_NOT_A_DEPLOYMENT"
  , "message":"The assembly is not a deployment."
  }
, "0x00003718":{
    "code":"ERROR_SXS_FILE_NOT_PART_OF_ASSEMBLY"
  , "message":"The file is not a part of the assembly."
  }
, "0x00003719":{
    "code":"ERROR_SXS_MANIFEST_TOO_BIG"
  , "message":"The size of the manifest exceeds the maximum allowed."
  }
, "0x0000371A":{
    "code":"ERROR_SXS_SETTING_NOT_REGISTERED"
  , "message":"The setting is not registered."
  }
, "0x0000371B":{
    "code":"ERROR_SXS_TRANSACTION_CLOSURE_INCOMPLETE"
  , "message":"One or more required members of the transaction are not present."
  }
, "0x00003A98":{
    "code":"ERROR_EVT_INVALID_CHANNEL_PATH"
  , "message":"The specified channel path is invalid."
  }
, "0x00003A99":{
    "code":"ERROR_EVT_INVALID_QUERY"
  , "message":"The specified query is invalid."
  }
, "0x00003A9A":{
    "code":"ERROR_EVT_PUBLISHER_METADATA_NOT_FOUND"
  , "message":"The publisher metadata cannot be found in the resource."
  }
, "0x00003A9B":{
    "code":"ERROR_EVT_EVENT_TEMPLATE_NOT_FOUND"
  , "message":"The template for an event definition cannot be found in the resource (error = %1)."
  }
, "0x00003A9C":{
    "code":"ERROR_EVT_INVALID_PUBLISHER_NAME"
  , "message":"The specified publisher name is invalid."
  }
, "0x00003A9D":{
    "code":"ERROR_EVT_INVALID_EVENT_DATA"
  , "message":"The event data raised by the publisher is not compatible with the event template definition in the publisher\'s manifest."
  }
, "0x00003A9F":{
    "code":"ERROR_EVT_CHANNEL_NOT_FOUND"
  , "message":"The specified channel could not be found. Check channel configuration."
  }
, "0x00003AA0":{
    "code":"ERROR_EVT_MALFORMED_XML_TEXT"
  , "message":"The specified XML text was not well-formed. See extended error for more details."
  }
, "0x00003AA1":{
    "code":"ERROR_EVT_SUBSCRIPTION_TO_DIRECT_CHANNEL"
  , "message":"The caller is trying to subscribe to a direct channel which is not allowed. The events for a direct channel go directly to a log file and cannot be subscribed to."
  }
, "0x00003AA2":{
    "code":"ERROR_EVT_CONFIGURATION_ERROR"
  , "message":"Configuration error."
  }
, "0x00003AA3":{
    "code":"ERROR_EVT_QUERY_RESULT_STALE"
  , "message":"The query result is stale or invalid. This may be due to the log being cleared or rolling over after the query result was created. Users should handle this code by releasing the query result object and reissuing the query."
  }
, "0x00003AA4":{
    "code":"ERROR_EVT_QUERY_RESULT_INVALID_POSITION"
  , "message":"Query result is currently at an invalid position."
  }
, "0x00003AA5":{
    "code":"ERROR_EVT_NON_VALIDATING_MSXML"
  , "message":"Registered Microsoft XML (MSXML) does not support validation."
  }
, "0x00003AA6":{
    "code":"ERROR_EVT_FILTER_ALREADYSCOPED"
  , "message":"An expression can only be followed by a change-of-scope operation if it itself evaluates to a node set and is not already part of some other change-of-scope operation."
  }
, "0x00003AA7":{
    "code":"ERROR_EVT_FILTER_NOTELTSET"
  , "message":"Cannot perform a step operation from a term that does not represent an element set."
  }
, "0x00003AA8":{
    "code":"ERROR_EVT_FILTER_INVARG"
  , "message":"Left side arguments to binary operators must be either attributes, nodes, or variables and right side arguments must be constants."
  }
, "0x00003AA9":{
    "code":"ERROR_EVT_FILTER_INVTEST"
  , "message":"A step operation must involve either a node test or, in the case of a predicate, an algebraic expression against which to test each node in the node set identified by the preceding node set can be evaluated."
  }
, "0x00003AAA":{
    "code":"ERROR_EVT_FILTER_INVTYPE"
  , "message":"This data type is currently unsupported."
  }
, "0x00003AAB":{
    "code":"ERROR_EVT_FILTER_PARSEERR"
  , "message":"A syntax error occurred at position %1!d!"
  }
, "0x00003AAC":{
    "code":"ERROR_EVT_FILTER_UNSUPPORTEDOP"
  , "message":"This operator is unsupported by this implementation of the filter."
  }
, "0x00003AAD":{
    "code":"ERROR_EVT_FILTER_UNEXPECTEDTOKEN"
  , "message":"The token encountered was unexpected."
  }
, "0x00003AAE":{
    "code":"ERROR_EVT_INVALID_OPERATION_OVER_ENABLED_DIRECT_CHANNEL"
  , "message":"The requested operation cannot be performed over an enabled direct channel. The channel must first be disabled before performing the requested operation."
  }
, "0x00003AAF":{
    "code":"ERROR_EVT_INVALID_CHANNEL_PROPERTY_VALUE"
  , "message":"Channel property %1!s! contains an invalid value. The value has an invalid type, is outside the valid range, cannot be updated, or is not supported by this type of channel."
  }
, "0x00003AB0":{
    "code":"ERROR_EVT_INVALID_PUBLISHER_PROPERTY_VALUE"
  , "message":"Publisher property %1!s! contains an invalid value. The value has an invalid type, is outside the valid range, cannot be updated, or is not supported by this type of publisher."
  }
, "0x00003AB1":{
    "code":"ERROR_EVT_CHANNEL_CANNOT_ACTIVATE"
  , "message":"The channel fails to activate."
  }
, "0x00003AB2":{
    "code":"ERROR_EVT_FILTER_TOO_COMPLEX"
  , "message":"The xpath expression exceeded supported complexity. Simplify it or split it into two or more simple expressions."
  }
, "0x00003AB3":{
    "code":"ERROR_EVT_MESSAGE_NOT_FOUND"
  , "message":"The message resource is present but the message is not found in the string or message table."
  }
, "0x00003AB4":{
    "code":"ERROR_EVT_MESSAGE_ID_NOT_FOUND"
  , "message":"The message ID for the desired message could not be found."
  }
, "0x00003AB5":{
    "code":"ERROR_EVT_UNRESOLVED_VALUE_INSERT"
  , "message":"The substitution string for the insert index (%1) could not be found."
  }
, "0x00003AB6":{
    "code":"ERROR_EVT_UNRESOLVED_PARAMETER_INSERT"
  , "message":"The description string for the parameter reference (%1) could not be found."
  }
, "0x00003AB7":{
    "code":"ERROR_EVT_MAX_INSERTS_REACHED"
  , "message":"The maximum number of replacements has been reached."
  }
, "0x00003AB8":{
    "code":"ERROR_EVT_EVENT_DEFINITION_NOT_OUND"
  , "message":"The event definition could not be found for the event ID (%1)."
  }
, "0x00003AB9":{
    "code":"ERROR_EVT_MESSAGE_LOCALE_NOT_FOUND"
  , "message":"The locale-specific resource for the desired message is not present."
  }
, "0x00003ABA":{
    "code":"ERROR_EVT_VERSION_TOO_OLD"
  , "message":"The resource is too old to be compatible."
  }
, "0x00003ABB":{
    "code":"ERROR_EVT_VERSION_TOO_NEW"
  , "message":"The resource is too new to be compatible."
  }
, "0x00003ABC":{
    "code":"ERROR_EVT_CANNOT_OPEN_CHANNEL_OF_QUERY"
  , "message":"The channel at index %1 of the query cannot be opened."
  }
, "0x00003ABD":{
    "code":"ERROR_EVT_PUBLISHER_DISABLED"
  , "message":"The publisher has been disabled and its resource is not available. This usually occurs when the publisher is in the process of being uninstalled or upgraded."
  }
, "0x00003AE8":{
    "code":"ERROR_EC_SUBSCRIPTION_CANNOT_ACTIVATE"
  , "message":"The subscription fails to activate."
  }
, "0x00003AE9":{
    "code":"ERROR_EC_LOG_DISABLED"
  , "message":"The log of the subscription is in a disabled state and events cannot be forwarded to it. The log must first be enabled before the subscription can be activated."
  }
, "0x00003AFC":{
    "code":"ERROR_MUI_FILE_NOT_FOUND"
  , "message":"The resource loader failed to find the Multilingual User Interface (MUI) file."
  }
, "0x00003AFD":{
    "code":"ERROR_MUI_INVALID_FILE"
  , "message":"The resource loader failed to load the MUI file because the file failed to pass validation."
  }
, "0x00003AFE":{
    "code":"ERROR_MUI_INVALID_RC_CONFIG"
  , "message":"The release candidate (RC) manifest is corrupted with garbage data, is an unsupported version, or is missing a required item."
  }
, "0x00003AFF":{
    "code":"ERROR_MUI_INVALID_LOCALE_NAME"
  , "message":"The RC manifest has an invalid culture name."
  }
, "0x00003B00":{
    "code":"ERROR_MUI_INVALID_ULTIMATEFALLBACK_NAME"
  , "message":"The RC Manifest has an invalid ultimate fallback name."
  }
, "0x00003B01":{
    "code":"ERROR_MUI_FILE_NOT_LOADED"
  , "message":"The resource loader cache does not have a loaded MUI entry."
  }
, "0x00003B02":{
    "code":"ERROR_RESOURCE_ENUM_USER_STOP"
  , "message":"The user stopped resource enumeration."
  }
, "0x00003B03":{
    "code":"ERROR_MUI_INTLSETTINGS_UILANG_NOT_INSTALLED"
  , "message":"User interface language installation failed."
  }
, "0x00003B04":{
    "code":"ERROR_MUI_INTLSETTINGS_INVALID_LOCALE_NAME"
  , "message":"Locale installation failed."
  }
, "0x00003B60":{
    "code":"ERROR_MCA_INVALID_CAPABILITIES_STRING"
  , "message":"The monitor returned a DDC/CI capabilities string that did not comply with the ACCESS.bus 3.0, DDC/CI 1.1, or MCCS 2 Revision 1 specification."
  }
, "0x00003B61":{
    "code":"ERROR_MCA_INVALID_VCP_VERSION"
  , "message":"The monitor\'s VCP version (0xDF) VCP code returned an invalid version value."
  }
, "0x00003B62":{
    "code":"ERROR_MCA_MONITOR_VIOLATES_MCCS_SPECIFICATION"
  , "message":"The monitor does not comply with the MCCS specification it claims to support."
  }
, "0x00003B63":{
    "code":"ERROR_MCA_MCCS_VERSION_MISMATCH"
  , "message":"The MCCS version in a monitor\'s mccs_ver capability does not match the MCCS version the monitor reports when the VCP version (0xDF) VCP code is used."
  }
, "0x00003B64":{
    "code":"ERROR_MCA_UNSUPPORTED_MCCS_VERSION"
  , "message":"The monitor configuration API works only with monitors that support the MCCS 1.0, MCCS 2.0, or MCCS 2.0 Revision 1 specifications."
  }
, "0x00003B65":{
    "code":"ERROR_MCA_INTERNAL_ERROR"
  , "message":"An internal monitor configuration API error occurred."
  }
, "0x00003B66":{
    "code":"ERROR_MCA_INVALID_TECHNOLOGY_TYPE_RETURNED"
  , "message":"The monitor returned an invalid monitor technology type. CRT, plasma, and LCD (TFT) are examples of monitor technology types. This error implies that the monitor violated the MCCS 2.0 or MCCS 2.0 Revision 1 specification."
  }
, "0x00003B67":{
    "code":"ERROR_MCA_UNSUPPORTED_COLOR_TEMPERATURE"
  , "message":"The SetMonitorColorTemperature() caller passed a color temperature to it that the current monitor did not support. CRT, plasma, and LCD (TFT) are examples of monitor technology types. This error implies that the monitor violated the MCCS 2.0 or MCCS 2.0 Revision 1 specification."
  }
, "0x00003B92":{
    "code":"ERROR_AMBIGUOUS_SYSTEM_DEVICE"
  , "message":"The requested system device cannot be identified due to multiple indistinguishable devices potentially matching the identification criteria."
  }
, "0x00003BC3":{
    "code":"ERROR_SYSTEM_DEVICE_NOT_FOUND"
  , "message":"The requested system device cannot be found."
  }
}
