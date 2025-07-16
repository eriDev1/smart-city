// EXCEPTION CLASS: Custom System Exception with usage
export class SystemException extends Error {
  public readonly errorCode: string
  public readonly timestamp: Date
  public readonly severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

  constructor(message: string, errorCode = "SYS_ERROR", severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "MEDIUM") {
    super(message)
    this.name = "SystemException"
    this.errorCode = errorCode
    this.timestamp = new Date()
    this.severity = severity
  }

  public getFormattedError(): string {
    return `[${this.errorCode}] ${this.message} (${this.timestamp.toISOString()})`
  }
}
