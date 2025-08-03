import type { IDataProcessor } from "../interfaces/IDataProcessor"
import { SmartCityDataProcessor } from "./SmartCityDataProcessor"

export class BatchDataProcessor implements IDataProcessor {
  private batchSize = 5000
  private processingRate = 0

  public async processData(data: any[]): Promise<any[]> {

    const batches = this.createBatches(data)
    const results: any[] = []

    for (const batch of batches) {
      const processed = batch.map((item) => ({
        ...item,
        batch_processed: true,
        batch_id: Math.random().toString(36),
        processor_type: "BATCH",
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

export class PolymorphismManager {
  private processors: IDataProcessor[] = []

  public addProcessor(processor: IDataProcessor): void {
    this.processors.push(processor)
  }

  public async processAllData(data: any[]): Promise<any[]> {
    const results: any[] = []

    for (const processor of this.processors) {
      const processed = await processor.processData(data)
      results.push(...processed)
    }

    return results
  }

  public optimizeAllProcessors(): void {
    this.processors.forEach((processor) => {
      const optimalSize = processor.getProcessingRate() > 1000 ? 2000 : 1000
      processor.setBatchSize(optimalSize)
    })
  }

  public async demonstratePolymorphism(): Promise<void> {
    console.log("🔄 POLYMORPHISM DEMONSTRATION STARTING...")
    console.log("=".repeat(50))

    const smartCityProcessor = new SmartCityDataProcessor()
    const batchProcessor = new BatchDataProcessor()

    this.addProcessor(smartCityProcessor)
    this.addProcessor(batchProcessor)

    // Create sample data
    const sampleData = [
      { id: 1, value: 25.5, timestamp: new Date().toISOString() },
      { id: 2, value: 67.2, timestamp: new Date().toISOString() },
      { id: 3, value: 89.1, timestamp: new Date().toISOString() },
    ]

    console.log("📊 Sample data created:", sampleData)
    console.log("")

    console.log("🎯 DEMONSTRATING POLYMORPHISM:")
    console.log("Both processors implement IDataProcessor interface but behave differently:")
    console.log("")

    console.log("1️⃣ SmartCityDataProcessor (ML-enhanced processing):")
    const smartResults = await smartCityProcessor.processData([...sampleData])
    console.log("   - Adds ML scores and anomaly detection")
    console.log("   - Applies machine learning algorithms")
    console.log("   - Result sample:", smartResults[0])
    console.log("")

    console.log("2️⃣ BatchDataProcessor (Batch processing):")
    const batchResults = await batchProcessor.processData([...sampleData])
    console.log("   - Processes in large batches")
    console.log("   - Adds batch IDs and batch processing flags")
    console.log("   - Result sample:", batchResults[0])
    console.log("")

    console.log("✅ POLYMORPHISM DEMONSTRATED!")
    console.log("Same method call (processData) but different behaviors:")
    console.log("- SmartCityDataProcessor: ML processing with predictions")
    console.log("- BatchDataProcessor: Batch processing with batch IDs")
    console.log("=".repeat(50))
  }
}
