// IoT Device Implementations (Classes 1-6)
import { IoTDevice } from "../abstracts/IoTDevice"
import type { IOptimizable } from "../interfaces/IOptimizable"
import { DeviceStatus } from "../enums/SystemEnums"

// Class 1: Traffic Light Controller (3-level inheritance: IoTDevice -> TrafficDevice -> TrafficLightController)
abstract class TrafficDevice extends IoTDevice {
  protected trafficDensity = 0

  constructor(id: string, location: string) {
    super(id, location)
  }

  public reportTrafficDensity(density: number): void {
    this.trafficDensity = density
    this.processData({ density })
  }

  public getTrafficDensity(): number {
    return this.trafficDensity
  }

  abstract adjustTiming(): void
}

export class TrafficLightController extends TrafficDevice {
  private currentPhase = "RED"
  private timing: { red: number; yellow: number; green: number }

  constructor(id: string, location: string) {
    super(id, location)
    this.timing = { red: 30, yellow: 5, green: 25 }
  }

  public initialize(): void {
    this.status = DeviceStatus.ONLINE
    console.log(`Traffic light ${this.id} initialized at ${this.location}`)
  }

  public processData(data: any): void {
    if (data.density > 80) {
      this.adjustTiming()
    }
  }

  public adjustTiming(): void {
    // Increase green time for high traffic
    this.timing.green = Math.min(this.timing.green + 10, 60)
    console.log(`Traffic light ${this.id} timing adjusted for high traffic`)
  }

  public getDeviceType(): string {
    return "TrafficLightController"
  }

  public getCurrentPhase(): string {
    return this.currentPhase
  }

  public setPhase(phase: string): void {
    this.currentPhase = phase
  }
}

// Class 2: Smart Street Light
export class SmartStreetLight extends IoTDevice implements IOptimizable {
  private brightness = 100
  private motionDetected = false
  private optimizationLevel = 0

  constructor(id: string, location: string) {
    super(id, location)
  }

  public initialize(): void {
    this.status = DeviceStatus.ONLINE
    console.log(`Smart street light ${this.id} initialized at ${this.location}`)
  }

  public processData(data: any): void {
    if (data.motion !== undefined) {
      this.motionDetected = data.motion
      if (this.motionDetected) {
        this.brightness = 100
      }
    }
  }

  public getDeviceType(): string {
    return "SmartStreetLight"
  }

  public adjustBrightness(level: number): void {
    this.brightness = Math.max(0, Math.min(100, level))
    console.log(`Street light ${this.id} brightness set to ${this.brightness}%`)
  }

  public optimize(): void {
    if (!this.motionDetected && new Date().getHours() > 22) {
      this.brightness = 30 // Dim during late hours
      this.optimizationLevel = 70
    }
  }

  public getOptimizationLevel(): number {
    return this.optimizationLevel
  }

  public setOptimizationParameters(params: any): void {
    if (params.dimLevel) {
      this.brightness = params.dimLevel
    }
  }

  public getBrightness(): number {
    return this.brightness
  }
}

// Class 3: Water Quality Sensor
export class WaterQualitySensor extends IoTDevice {
  private qualityReading = 0
  private ph = 7.0
  private temperature = 20.0

  constructor(id: string, location: string) {
    super(id, location)
  }

  public initialize(): void {
    this.status = DeviceStatus.ONLINE
    console.log(`Water quality sensor ${this.id} initialized at ${this.location}`)
  }

  public processData(data: any): void {
    if (data.quality) {
      this.qualityReading = data.quality
    }
    if (data.ph) {
      this.ph = data.ph
    }
    if (data.temperature) {
      this.temperature = data.temperature
    }
  }

  public getDeviceType(): string {
    return "WaterQualitySensor"
  }

  public reportQualityReading(quality: number): void {
    this.qualityReading = quality
    console.log(`Water quality sensor ${this.id} reports quality: ${quality}%`)
  }

  public getQualityReading(): number {
    return this.qualityReading
  }

  public getPH(): number {
    return this.ph
  }

  public getTemperature(): number {
    return this.temperature
  }
}
