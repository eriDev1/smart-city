// Polymorphism Demonstration
import type { IoTDevice } from "../abstracts/IoTDevice"
import { TrafficLightController, SmartStreetLight, WaterQualitySensor } from "../devices/IoTDevices"

export class DeviceManager {
  private devices: IoTDevice[] = []

  public addDevice(device: IoTDevice): void {
    this.devices.push(device)
  }

  // Polymorphism: Same method call works differently for each device type
  public initializeAllDevices(): void {
    this.devices.forEach((device) => {
      device.initialize() // Polymorphic call
      console.log(`Device ${device.getId()} of type ${device.getDeviceType()} initialized`)
    })
  }

  // Polymorphism: Process data differently based on device type
  public processAllDeviceData(data: any): void {
    this.devices.forEach((device) => {
      device.processData(data) // Polymorphic call
    })
  }

  public demonstratePolymorphism(): void {
    // Create different types of devices
    const trafficLight = new TrafficLightController("TL001", "Main Street")
    const streetLight = new SmartStreetLight("SL001", "Park Avenue")
    const waterSensor = new WaterQualitySensor("WS001", "Central Reservoir")

    // Add to collection (all treated as IoTDevice)
    this.addDevice(trafficLight)
    this.addDevice(streetLight)
    this.addDevice(waterSensor)

    // Polymorphic behavior - same interface, different implementations
    this.initializeAllDevices()

    // Each device processes data differently
    this.processAllDeviceData({
      density: 75,
      motion: true,
      quality: 92,
    })
  }
}
