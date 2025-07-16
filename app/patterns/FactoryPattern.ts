// DESIGN PATTERN 1: Factory Pattern
import { SmartCityDataProcessor } from "../core/SmartCityDataProcessor"
import { RealTimeStreamProcessor } from "../core/RealTimeStreamProcessor"
import { MachineLearningAnalyzer } from "../core/MachineLearningAnalyzer"

export enum ProcessorType {
  DATA_PROCESSOR = "DATA_PROCESSOR",
  STREAM_PROCESSOR = "STREAM_PROCESSOR",
  ML_ANALYZER = "ML_ANALYZER",
}

// CLASS 8: Processor Factory
export class ProcessorFactory {
  public static createProcessor(type: ProcessorType): any {
    switch (type) {
      case ProcessorType.DATA_PROCESSOR:
        return new SmartCityDataProcessor()
      case ProcessorType.STREAM_PROCESSOR:
        return new RealTimeStreamProcessor()
      case ProcessorType.ML_ANALYZER:
        return new MachineLearningAnalyzer()
      default:
        throw new Error(`Unknown processor type: ${type}`)
    }
  }

  public static getSupportedTypes(): ProcessorType[] {
    return Object.values(ProcessorType)
  }
}
