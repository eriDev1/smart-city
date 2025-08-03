import { IoTDevice } from "../abstracts/IoTDevice"
import type { IOptimizable } from "../interfaces/IOptimizable"
import { DeviceStatus, DeviceType } from "../enums/SystemEnums"

export class AirQualityMonitor extends IoTDevice {
  private pm25 = 0
  private pm10 = 0
  private no2 = 0
  private o3 = 0
  private so2 = 0
  private co = 0
  private aqi = 0

  constructor(id: string, location: string) {
    super(id, location)
  }

  public initialize(): void {
    this.status = DeviceStatus.ONLINE
    console.log(`Air quality monitor ${this.id} initialized at ${this.location}`)
  }

  public processData(data: any): void {
    if (data.pm25) this.pm25 = data.pm25
    if (data.pm10) this.pm10 = data.pm10
    if (data.no2) this.no2 = data.no2
    if (data.o3) this.o3 = data.o3
    if (data.so2) this.so2 = data.so2
    if (data.co) this.co = data.co
    if (data.aqi) this.aqi = data.aqi
  }

  public getDeviceType(): string {
    return "AirQualityMonitor"
  }

  public getPM25(): number {
    return this.pm25
  }

  public getPM10(): number {
    return this.pm10
  }

  public getNO2(): number {
    return this.no2
  }

  public getO3(): number {
    return this.o3
  }

  public getSO2(): number {
    return this.so2
  }

  public getCO(): number {
    return this.co
  }

  public getAQI(): number {
    return this.aqi
  }
}

export class WeatherStation extends IoTDevice implements IOptimizable {
  private temperature = 0
  private humidity = 0
  private pressure = 0
  private windSpeed = 0
  private windDirection = 0
  private optimizationLevel = 0

  constructor(id: string, location: string) {
    super(id, location)
  }

  public initialize(): void {
    this.status = DeviceStatus.ONLINE
    console.log(`Weather station ${this.id} initialized at ${this.location}`)
  }

  public processData(data: any): void {
    if (data.temperature) this.temperature = data.temperature
    if (data.humidity) this.humidity = data.humidity
    if (data.pressure) this.pressure = data.pressure
    if (data.windSpeed) this.windSpeed = data.windSpeed
    if (data.windDirection) this.windDirection = data.windDirection
  }

  public getDeviceType(): string {
    return "WeatherStation"
  }

  public optimize(): void {
    this.optimizationLevel = 80
  }

  public getOptimizationLevel(): number {
    return this.optimizationLevel
  }

  public setOptimizationParameters(params: any): void {
    if (params.calibrationLevel) {
      this.optimizationLevel = params.calibrationLevel
    }
  }

  public getTemperature(): number {
    return this.temperature
  }

  public getHumidity(): number {
    return this.humidity
  }

  public getPressure(): number {
    return this.pressure
  }

  public getWindSpeed(): number {
    return this.windSpeed
  }

  public getWindDirection(): number {
    return this.windDirection
  }
}

export class NoiseMonitor extends IoTDevice {
  private decibelLevel = 0
  private averageNoise = 0
  private peakNoise = 0

  constructor(id: string, location: string) {
    super(id, location)
  }

  public initialize(): void {
    this.status = DeviceStatus.ONLINE
    console.log(`Noise monitor ${this.id} initialized at ${this.location}`)
  }

  public processData(data: any): void {
    if (data.decibels) {
      this.decibelLevel = data.decibels
      this.updateAverages()
    }
  }

  public getDeviceType(): string {
    return "NoiseMonitor"
  }

  private updateAverages(): void {
    this.averageNoise = (this.averageNoise + this.decibelLevel) / 2
    this.peakNoise = Math.max(this.peakNoise, this.decibelLevel)
  }

  public getDecibelLevel(): number {
    return this.decibelLevel
  }

  public getAverageNoise(): number {
    return this.averageNoise
  }

  public getPeakNoise(): number {
    return this.peakNoise
  }
}
