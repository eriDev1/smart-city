// Abstract Class 1: Base IoT Device
import type { IMonitorable } from "../interfaces/IMonitorable"
import type { IControllable } from "../interfaces/IControllable"
import { DeviceStatus } from "../enums/SystemEnums"

export abstract class IoTDevice implements IMonitorable, IControllable {
  protected id: string
  protected location: string
  protected status: DeviceStatus
  protected lastUpdate: Date

  constructor(id: string, location: string) {
    this.id = id
    this.location = location
    this.status = DeviceStatus.OFFLINE
    this.lastUpdate = new Date()
  }

  // Abstract methods that must be implemented by subclasses
  abstract initialize(): void
  abstract processData(data: any): void
  abstract getDeviceType(): string

  // Concrete methods
  public getId(): string {
    return this.id
  }

  public getLocation(): string {
    return this.location
  }

  public getStatus(): DeviceStatus {
    return this.status
  }

  public turnOn(): void {
    this.status = DeviceStatus.ONLINE
    this.lastUpdate = new Date()
  }

  public turnOff(): void {
    this.status = DeviceStatus.OFFLINE
    this.lastUpdate = new Date()
  }

  public reset(): void {
    this.status = DeviceStatus.MAINTENANCE
    this.lastUpdate = new Date()
    setTimeout(() => {
      this.status = DeviceStatus.ONLINE
    }, 1000)
  }

  public getControlStatus(): boolean {
    return this.status === DeviceStatus.ONLINE
  }

  public startMonitoring(): void {
    console.log(`Monitoring started for device ${this.id}`)
  }

  public stopMonitoring(): void {
    console.log(`Monitoring stopped for device ${this.id}`)
  }

  public getMonitoringData(): any {
    return {
      id: this.id,
      location: this.location,
      status: this.status,
      lastUpdate: this.lastUpdate,
    }
  }
}
