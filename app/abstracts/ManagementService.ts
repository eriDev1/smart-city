// Abstract Class 2: Base Management Service
import type { IManagementService } from "../interfaces/IManagementService"
import type { IReportable } from "../interfaces/IReportable"
import type { ServiceType } from "../enums/SystemEnums"

export abstract class ManagementService implements IManagementService, IReportable {
  protected serviceType: ServiceType
  protected isRunning = false
  protected emergencyMode = false

  constructor(serviceType: ServiceType) {
    this.serviceType = serviceType
  }

  // Abstract methods
  abstract initialize(): void
  abstract processRequest(request: any): void

  // Concrete implementations
  public start(): void {
    if (!this.isRunning) {
      this.initialize()
      this.isRunning = true
      console.log(`${this.serviceType} service started`)
    }
  }

  public stop(): void {
    this.isRunning = false
    console.log(`${this.serviceType} service stopped`)
  }

  public getServiceType(): ServiceType {
    return this.serviceType
  }

  public handleEmergency(): void {
    this.emergencyMode = true
    console.log(`${this.serviceType} service in emergency mode`)
  }

  public optimize(): void {
    console.log(`${this.serviceType} service optimization started`)
  }

  public getStatus(): string {
    return this.isRunning ? "Running" : "Stopped"
  }

  public generateReport(): string {
    return `Report for ${this.serviceType} service`
  }

  public getReportData(): any {
    return {
      serviceType: this.serviceType,
      isRunning: this.isRunning,
      emergencyMode: this.emergencyMode,
    }
  }

  public exportReport(format: string): void {
    console.log(`Exporting ${this.serviceType} report in ${format} format`)
  }
}
