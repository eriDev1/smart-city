import { ManagementService } from "../abstracts/ManagementService"
import { ServiceType } from "../enums/SystemEnums"

export class EnergyManagementService extends ManagementService {
  private streetLights: string[] = []
  private energyConsumption = 0

  constructor() {
    super(ServiceType.ENERGY)
  }

  public initialize(): void {
    console.log("Energy Management Service initialized")
    this.loadStreetLights()
  }

  public processRequest(request: any): void {
    console.log(`Processing energy request: ${request.type}`)

    switch (request.type) {
      case "DIM_LIGHTS":
        this.dimStreetLights(request.percentage)
        break
      case "OPTIMIZE_CONSUMPTION":
        this.optimize()
        break
      default:
        console.log("Unknown energy request type")
    }
  }

  private loadStreetLights(): void {
    this.streetLights = ["SL001", "SL002", "SL003"]
  }

  private dimStreetLights(percentage: number): void {
    console.log(`Dimming street lights to ${percentage}%`)
    this.energyConsumption *= percentage / 100
  }

  public optimize(): void {
    super.optimize()
    console.log("Optimizing energy consumption based on usage patterns")
    this.dimStreetLights(75) // Dim to 75% during optimization
  }

  public getEnergyConsumption(): number {
    return this.energyConsumption
  }
}
