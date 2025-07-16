// ENUMERATION 1: Device Status
export enum DeviceStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  PROCESSING = "PROCESSING",
  ERROR = "ERROR",
}

// ENUMERATION 2: Data Processing Priority
export enum ProcessingPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

// ENUMERATION 3: Big Data Operation Types
export enum BigDataOperation {
  BATCH_PROCESS = "BATCH_PROCESS",
  STREAM_PROCESS = "STREAM_PROCESS",
  REAL_TIME_ANALYTICS = "REAL_TIME_ANALYTICS",
  MACHINE_LEARNING = "MACHINE_LEARNING",
}
