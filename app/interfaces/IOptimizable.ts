// Interface 4: Optimizable Interface
export interface IOptimizable {
  optimize(): void
  getOptimizationLevel(): number
  setOptimizationParameters(params: any): void
}
