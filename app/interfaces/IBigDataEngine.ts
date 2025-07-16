// INTERFACE 2: Big Data Engine Interface
export interface IBigDataEngine {
  startProcessing(): void
  stopProcessing(): void
  getMetrics(): any
  optimizePerformance(): void
}
