// Singleton Pattern Implementation
import type { IManagementService } from "../interfaces/IManagementService"
import type { IoTDevice } from "../abstracts/IoTDevice"
import { SystemException } from "../exceptions/SystemException"
import { ServiceType } from "../enums/SystemEnums"

export class CityManager {
  private static instance: CityManager
  private services: Map<ServiceType, IManagementService> = new Map()
  private devices: Map<string, IoTDevice> = new Map()
  private isMonitoring = false

  private constructor() {
    // Private constructor for Singleton pattern
  }

  public static getInstance(): CityManager {
    if (!CityManager.instance) {
      CityManager.instance = new CityManager()
    }
    return CityManager.instance
  }

  public addService(service: IManagementService): void {
    this.services.set(service.getServiceType(), service)
  }

  public addDevice(device: IoTDevice): void {
    this.devices.set(device.getId(), device)
    device.initialize()
  }

  public startMonitoring(): void {
    if (this.isMonitoring) {
      throw new SystemException("Monitoring is already active")
    }

    this.isMonitoring = true
    this.services.forEach((service) => service.start())
    console.log("City monitoring started")
  }

  public stopMonitoring(): void {
    this.isMonitoring = false
    this.services.forEach((service) => service.stop())
    console.log("City monitoring stopped")
  }

  public activateEmergencyMode(): void {
    this.services.forEach((service) => service.handleEmergency())
    console.log("Emergency mode activated across all services")
  }

  public optimizeEnergyConsumption(): void {
    const energyService = this.services.get(ServiceType.ENERGY)
    if (energyService) {
      energyService.optimize()
    }
  }

  public getDeviceCount(): number {
    return this.devices.size
  }

  public getActiveServiceCount(): number {
    return this.services.size
  }

  public getDevice(id: string): IoTDevice | undefined {
    return this.devices.get(id)
  }

  public getAllDevices(): IoTDevice[] {
    return Array.from(this.devices.values())
  }
}
