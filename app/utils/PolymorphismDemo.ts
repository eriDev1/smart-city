// Polymorphism Demonstration
import { IoTDevice } from "../abstracts/IoTDevice"
import { AirQualityMonitor, WeatherStation, NoiseMonitor } from "../devices/IoTDevices"

export class DeviceManager {
  private devices: IoTDevice[] = []

  public addDevice(device: IoTDevice): void {
    this.devices.push(device)
  }

  public demonstratePolymorphism(): void {
    const airQualityMonitor = new AirQualityMonitor("AQ001", "Downtown")
    const weatherStation = new WeatherStation("WS001", "Park Central")
    const noiseMonitor = new NoiseMonitor("NM001", "Highway Junction")

    this.addDevice(airQualityMonitor)
    this.addDevice(weatherStation)
    this.addDevice(noiseMonitor)

    this.devices.forEach(device => {
      device.initialize()
      console.log(`Device ${device.getId()} of type ${device.getDeviceType()} is ${device.getStatus()}`)
      
      if (device instanceof AirQualityMonitor) {
        device.processData({ pm25: 35, pm10: 50, aqi: 75 })
        console.log(`AQI Reading: ${device.getAQI()}`)
      } else if (device instanceof WeatherStation) {
        device.processData({ temperature: 22, humidity: 65, pressure: 1013 })
        console.log(`Temperature: ${device.getTemperature()}°C`)
      } else if (device instanceof NoiseMonitor) {
        device.processData({ decibels: 75 })
        console.log(`Noise Level: ${device.getDecibelLevel()} dB`)
      }
    })
  }

  public processAllDevices(): void {
    this.devices.forEach(device => {
      const simulatedData = this.generateSimulatedData(device.getDeviceType())
      device.processData(simulatedData)
    })
  }

  private generateSimulatedData(deviceType: string): any {
    switch (deviceType) {
      case "AirQualityMonitor":
        return { pm25: Math.random() * 100, aqi: Math.random() * 200 }
      case "WeatherStation":
        return { temperature: Math.random() * 40, humidity: Math.random() * 100 }
      case "NoiseMonitor":
        return { decibels: Math.random() * 120 }
      default:
        return {}
    }
  }
}
