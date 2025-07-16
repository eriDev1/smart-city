import { ManagementService } from "../abstracts/ManagementService"
import { ServiceType, RequestStatus, Priority } from "../enums/SystemEnums"

// Class 11: Citizen Service Request
export class ServiceRequest {
  private id: string
  private citizenId: string
  private description: string
  private priority: Priority
  private status: RequestStatus
  private createdAt: Date

  constructor(id: string, citizenId: string, description: string, priority: Priority = Priority.MEDIUM) {
    this.id = id
    this.citizenId = citizenId
    this.description = description
    this.priority = priority
    this.status = RequestStatus.PENDING
    this.createdAt = new Date()
  }

  public getId(): string {
    return this.id
  }
  public getCitizenId(): string {
    return this.citizenId
  }
  public getDescription(): string {
    return this.description
  }
  public getPriority(): Priority {
    return this.priority
  }
  public getStatus(): RequestStatus {
    return this.status
  }
  public getCreatedAt(): Date {
    return this.createdAt
  }

  public updateStatus(status: RequestStatus): void {
    this.status = status
  }

  public setPriority(priority: Priority): void {
    this.priority = priority
  }
}

// Class 12: Citizen Service
export class CitizenService extends ManagementService {
  private serviceRequests: Map<string, ServiceRequest> = new Map()
  private requestCounter = 0

  constructor() {
    super(ServiceType.CITIZEN)
  }

  public initialize(): void {
    console.log("Citizen Service initialized")
  }

  public processRequest(request: any): void {
    console.log(`Processing citizen request: ${request.type}`)

    switch (request.type) {
      case "NEW_REQUEST":
        this.createServiceRequest(request.citizenId, request.description, request.priority)
        break
      case "UPDATE_STATUS":
        this.updateRequestStatus(request.requestId, request.status)
        break
      default:
        console.log("Unknown citizen request type")
    }
  }

  public createServiceRequest(citizenId: string, description: string, priority: Priority): ServiceRequest {
    const requestId = `REQ${++this.requestCounter}`
    const serviceRequest = new ServiceRequest(requestId, citizenId, description, priority)
    this.serviceRequests.set(requestId, serviceRequest)
    console.log(`Service request ${requestId} created for citizen ${citizenId}`)
    return serviceRequest
  }

  public updateRequestStatus(requestId: string, status: RequestStatus): void {
    const request = this.serviceRequests.get(requestId)
    if (request) {
      request.updateStatus(status)
      console.log(`Request ${requestId} status updated to ${status}`)
    }
  }

  public getServiceRequests(): ServiceRequest[] {
    return Array.from(this.serviceRequests.values())
  }

  public getRequestsByPriority(priority: Priority): ServiceRequest[] {
    return this.getServiceRequests().filter((req) => req.getPriority() === priority)
  }
}
