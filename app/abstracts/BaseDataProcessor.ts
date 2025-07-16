// ABSTRACT CLASS 1: Base Data Processor (Level 1)
import type { IDataProcessor } from "../interfaces/IDataProcessor"
import { ProcessingPriority } from "../enums/SystemEnums"

export abstract class BaseDataProcessor implements IDataProcessor {
  protected batchSize = 1000
  protected processingRate = 0
  protected priority: ProcessingPriority

  constructor(priority: ProcessingPriority = ProcessingPriority.MEDIUM) {
    this.priority = priority
  }

  // Abstract methods - must be implemented by subclasses
  abstract processData(data: any[]): Promise<any[]>
  abstract validateData(data: any): boolean

  // Concrete methods
  public getBatchSize(): number {
    return this.batchSize
  }

  public setBatchSize(size: number): void {
    this.batchSize = Math.max(100, Math.min(10000, size))
  }

  public getProcessingRate(): number {
    return this.processingRate
  }

  protected updateProcessingRate(recordsProcessed: number, timeMs: number): void {
    this.processingRate = recordsProcessed / (timeMs / 1000)
  }
}
