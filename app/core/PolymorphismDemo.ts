// POLYMORPHISM DEMONSTRATION
import type { IDataProcessor } from "../interfaces/IDataProcessor"
import { SmartCityDataProcessor } from "./SmartCityDataProcessor"

// CLASS 13: Batch Data Processor (Different implementation of IDataProcessor)
export class BatchDataProcessor implements IDataProcessor {
  private batchSize = 5000
  private processingRate = 0

  public async processData(data: any[]): Promise<any[]> {
    // Different processing logic for batch operations
    const batches = this.createBatches(data)
    const results: any[] = []

    for (const batch of batches) {
      const processed = batch.map((item) => ({
        ...item,
        batch_processed: true,
        batch_id: Math.random().toString(36),
      }))
      results.push(...processed)
    }

    return results
  }

  private createBatches(data: any[]): any[][] {
    const batches: any[][] = []
    for (let i = 0; i < data.length; i += this.batchSize) {
      batches.push(data.slice(i, i + this.batchSize))
    }
    return batches
  }

  public getBatchSize(): number {
    return this.batchSize
  }

  public setBatchSize(size: number): void {
    this.batchSize = size
  }

  public getProcessingRate(): number {
    return this.processingRate
  }
}

// CLASS 14: Polymorphism Manager
export class PolymorphismManager {
  private processors: IDataProcessor[] = []

  public addProcessor(processor: IDataProcessor): void {
    this.processors.push(processor)
  }

  // POLYMORPHISM: Same method call, different implementations
  public async processAllData(data: any[]): Promise<any[]> {
    const results: any[] = []

    for (const processor of this.processors) {
      // Polymorphic call - each processor implements processData differently
      const processed = await processor.processData(data)
      results.push(...processed)
    }

    return results
  }

  // POLYMORPHISM: Same interface, different behaviors
  public optimizeAllProcessors(): void {
    this.processors.forEach((processor) => {
      // Each processor may optimize differently
      const optimalSize = processor.getProcessingRate() > 1000 ? 2000 : 1000
      processor.setBatchSize(optimalSize)
    })
  }

  public demonstratePolymorphism(): void {
    // Create different processor types
    const smartCityProcessor = new SmartCityDataProcessor()
    const batchProcessor = new BatchDataProcessor()

    // Add to collection (all treated as IDataProcessor)
    this.addProcessor(smartCityProcessor)
    this.addProcessor(batchProcessor)

    // Polymorphic behavior - same interface, different implementations
    console.log("Demonstrating polymorphism with different processor types")
  }
}
