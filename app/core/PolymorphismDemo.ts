import type { IDataProcessor } from "../interfaces/IDataProcessor"
import type { ProcessedAirQualityData } from "../bigdata/RealTimeDataConnector"
import { AlertSeverity } from "../enums/SystemEnums"

// Real-world polymorphism: Different processors handle air quality data differently based on purpose
export class HealthRiskProcessor implements IDataProcessor {
  private batchSize = 100
  private processingRate = 0

  public async processData(data: any[]): Promise<ProcessedAirQualityData[]> {
    this.processingRate = data.length / 10 // Simulate processing speed

    return data.map((airData: ProcessedAirQualityData) => ({
      ...airData,
      // Health-focused processing: Add health risk assessment
      healthRisk: this.calculateHealthRisk(airData),
      recommendations: this.generateHealthRecommendations(airData),
      riskCategory: this.getRiskCategory(airData.aqi),
      vulnerableGroups: this.getVulnerableGroups(airData),
      processor_type: "HEALTH_RISK",
      processed_at: new Date().toISOString()
    }))
  }

  private calculateHealthRisk(data: ProcessedAirQualityData): number {
    // Complex health risk calculation based on multiple pollutants
    const weights = { pm25: 0.3, pm10: 0.25, no2: 0.2, o3: 0.15, so2: 0.1 }
    return Math.round(
      (data.pm25 * weights.pm25 + 
       data.pm10 * weights.pm10 + 
       data.no2 * weights.no2 + 
       data.o3 * weights.o3 + 
       data.so2 * weights.so2) / 10
    )
  }

  private generateHealthRecommendations(data: ProcessedAirQualityData): string[] {
    const recommendations: string[] = []
    
    if (data.aqi > 150) {
      recommendations.push("Avoid outdoor activities")
      recommendations.push("Keep windows closed")
      recommendations.push("Use air purifiers indoors")
    } else if (data.aqi > 100) {
      recommendations.push("Limit prolonged outdoor activities")
      recommendations.push("Consider wearing N95 masks outdoors")
    } else if (data.aqi > 50) {
      recommendations.push("Sensitive individuals should limit outdoor exposure")
    } else {
      recommendations.push("Air quality is good for outdoor activities")
    }

    if (data.pm25 > 35) recommendations.push("Monitor respiratory symptoms")
    if (data.o3 > 100) recommendations.push("Avoid outdoor exercise during peak hours")

    return recommendations
  }

  private getRiskCategory(aqi: number): string {
    if (aqi <= 50) return "LOW"
    if (aqi <= 100) return "MODERATE"
    if (aqi <= 150) return "HIGH"
    if (aqi <= 200) return "VERY_HIGH"
    return "EXTREME"
  }

  private getVulnerableGroups(data: ProcessedAirQualityData): string[] {
    const groups: string[] = []
    
    if (data.aqi > 100) {
      groups.push("Children", "Elderly", "Pregnant women")
    }
    if (data.pm25 > 35) {
      groups.push("People with asthma", "Heart disease patients")
    }
    if (data.o3 > 80) {
      groups.push("Athletes", "Outdoor workers")
    }

    return groups
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

export class TrafficOptimizationProcessor implements IDataProcessor {
  private batchSize = 200
  private processingRate = 0

  public async processData(data: any[]): Promise<ProcessedAirQualityData[]> {
    this.processingRate = data.length / 5 // Faster processing for traffic optimization

    return data.map((airData: ProcessedAirQualityData) => ({
      ...airData,
      // Traffic-focused processing: Optimize routes based on air quality
      trafficImpact: this.calculateTrafficImpact(airData),
      routeRecommendations: this.generateRouteRecommendations(airData),
      congestionLevel: this.estimateCongestionLevel(airData),
      alternativeRoutes: this.suggestAlternativeRoutes(airData),
      processor_type: "TRAFFIC_OPTIMIZATION",
      processed_at: new Date().toISOString()
    }))
  }

  private calculateTrafficImpact(data: ProcessedAirQualityData): number {
    // Traffic contributes significantly to NO2 and CO levels
    const trafficPollutants = data.no2 * 0.6 + data.co * 0.4
    return Math.round(trafficPollutants / 10)
  }

  private generateRouteRecommendations(data: ProcessedAirQualityData): string[] {
    const recommendations: string[] = []
    
    if (data.aqi > 150) {
      recommendations.push("Avoid high-traffic routes")
      recommendations.push("Use highway/ring roads instead of city center")
      recommendations.push("Consider public transportation")
    } else if (data.no2 > 80) {
      recommendations.push("Minimize stops in traffic")
      recommendations.push("Use air recirculation in vehicle")
    } else {
      recommendations.push("Normal traffic routes are acceptable")
    }

    return recommendations
  }

  private estimateCongestionLevel(data: ProcessedAirQualityData): string {
    // High NO2 and CO often correlate with traffic congestion
    const congestionScore = (data.no2 + data.co) / 2
    
    if (congestionScore > 100) return "SEVERE"
    if (congestionScore > 60) return "HEAVY"
    if (congestionScore > 30) return "MODERATE"
    return "LIGHT"
  }

  private suggestAlternativeRoutes(data: ProcessedAirQualityData): string[] {
    const routes: string[] = []
    
    if (data.aqi > 100) {
      routes.push("Coastal/waterfront routes with better air flow")
      routes.push("Parks and green corridors")
      routes.push("Elevated highways away from ground-level pollution")
    }

    return routes
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

export class EnergyEfficiencyProcessor implements IDataProcessor {
  private batchSize = 150
  private processingRate = 0

  public async processData(data: any[]): Promise<ProcessedAirQualityData[]> {
    this.processingRate = data.length / 8 // Moderate processing speed

    return data.map((airData: ProcessedAirQualityData) => ({
      ...airData,
      // Energy-focused processing: HVAC and building optimization
      hvacRecommendations: this.generateHVACRecommendations(airData),
      energyEfficiencyScore: this.calculateEnergyEfficiency(airData),
      ventilationStrategy: this.determineVentilationStrategy(airData),
      indoorAirQuality: this.predictIndoorAirQuality(airData),
      processor_type: "ENERGY_EFFICIENCY",
      processed_at: new Date().toISOString()
    }))
  }

  private generateHVACRecommendations(data: ProcessedAirQualityData): string[] {
    const recommendations: string[] = []
    
    if (data.aqi > 100) {
      recommendations.push("Increase air filtration settings")
      recommendations.push("Reduce fresh air intake")
      recommendations.push("Activate air purification systems")
    } else if (data.aqi < 50) {
      recommendations.push("Increase natural ventilation")
      recommendations.push("Reduce HVAC energy consumption")
      recommendations.push("Open windows for free cooling")
    }

    if (data.temperature && data.temperature > 25) {
      recommendations.push("Optimize cooling efficiency")
    }

    return recommendations
  }

  private calculateEnergyEfficiency(data: ProcessedAirQualityData): number {
    // Good outdoor air quality allows for more energy-efficient operation
    const baseEfficiency = 100 - (data.aqi / 3) // Higher AQI reduces efficiency
    const temperatureBonus = data.temperature && Math.abs(data.temperature - 22) < 3 ? 10 : 0
    
    return Math.round(Math.max(0, Math.min(100, baseEfficiency + temperatureBonus)))
  }

  private determineVentilationStrategy(data: ProcessedAirQualityData): string {
    if (data.aqi > 150) return "RECIRCULATION_ONLY"
    if (data.aqi > 100) return "MINIMAL_FRESH_AIR"
    if (data.aqi > 50) return "BALANCED_VENTILATION"
    return "NATURAL_VENTILATION"
  }

  private predictIndoorAirQuality(data: ProcessedAirQualityData): number {
    // Indoor AQI is typically 20-50% better than outdoor with proper HVAC
    const reductionFactor = data.aqi > 100 ? 0.3 : 0.5
    return Math.round(data.aqi * (1 - reductionFactor))
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

export class AirQualityProcessingPipeline {
  private processors: IDataProcessor[] = []
  private processingResults: Map<string, any[]> = new Map()

  public addProcessor(processor: IDataProcessor): void {
    this.processors.push(processor)
  }

  public async processAirQualityData(airQualityData: ProcessedAirQualityData[]): Promise<{
    healthAnalysis: any[];
    trafficOptimization: any[];
    energyEfficiency: any[];
    processingStats: {
      totalProcessors: number;
      totalDataPoints: number;
      processingTime: number;
    }
  }> {
    const startTime = Date.now()
    
    // Create different processors for different use cases
    const healthProcessor = new HealthRiskProcessor()
    const trafficProcessor = new TrafficOptimizationProcessor()
    const energyProcessor = new EnergyEfficiencyProcessor()

    // Process the same air quality data through different processors
    // This demonstrates polymorphism: same interface, different implementations, different outputs
    const [healthResults, trafficResults, energyResults] = await Promise.all([
      healthProcessor.processData(airQualityData),
      trafficProcessor.processData(airQualityData),
      energyProcessor.processData(airQualityData)
    ])

    const processingTime = Date.now() - startTime

    this.processingResults.set('health', healthResults)
    this.processingResults.set('traffic', trafficResults)
    this.processingResults.set('energy', energyResults)

    return {
      healthAnalysis: healthResults,
      trafficOptimization: trafficResults,
      energyEfficiency: energyResults,
      processingStats: {
        totalProcessors: 3,
        totalDataPoints: airQualityData.length,
        processingTime
      }
    }
  }

  public getProcessingResults(): Map<string, any[]> {
    return this.processingResults
  }

  public async demonstrateRealWorldPolymorphism(airQualityData: ProcessedAirQualityData[]): Promise<{
    summary: string;
    insights: any;
    recommendations: string[];
  }> {
    console.log("🌍 REAL-WORLD POLYMORPHISM DEMONSTRATION")
    console.log("Processing air quality data for different city systems...")

    const results = await this.processAirQualityData(airQualityData)
    
    // Extract insights from polymorphic processing
    const healthInsights = this.extractHealthInsights(results.healthAnalysis)
    const trafficInsights = this.extractTrafficInsights(results.trafficOptimization)
    const energyInsights = this.extractEnergyInsights(results.energyEfficiency)

    const overallRecommendations = [
      ...healthInsights.recommendations.slice(0, 2),
      ...trafficInsights.recommendations.slice(0, 2),
      ...energyInsights.recommendations.slice(0, 2)
    ]

    return {
      summary: `Processed ${airQualityData.length} data points through 3 specialized processors in ${results.processingStats.processingTime}ms`,
      insights: {
        health: healthInsights,
        traffic: trafficInsights,
        energy: energyInsights
      },
      recommendations: overallRecommendations
    }
  }

  private extractHealthInsights(healthData: any[]): any {
    const highRiskLocations = healthData.filter(d => d.riskCategory === 'HIGH' || d.riskCategory === 'VERY_HIGH')
    const averageHealthRisk = healthData.reduce((sum, d) => sum + (d.healthRisk || 0), 0) / healthData.length

    return {
      averageRiskScore: Math.round(averageHealthRisk),
      highRiskLocations: highRiskLocations.length,
      mostVulnerableGroups: this.getMostCommonVulnerableGroups(healthData),
      recommendations: this.getTopHealthRecommendations(healthData)
    }
  }

  private extractTrafficInsights(trafficData: any[]): any {
    const highCongestionAreas = trafficData.filter(d => d.congestionLevel === 'SEVERE' || d.congestionLevel === 'HEAVY')
    const averageTrafficImpact = trafficData.reduce((sum, d) => sum + (d.trafficImpact || 0), 0) / trafficData.length

    return {
      averageTrafficImpact: Math.round(averageTrafficImpact),
      congestedAreas: highCongestionAreas.length,
      recommendations: this.getTopTrafficRecommendations(trafficData)
    }
  }

  private extractEnergyInsights(energyData: any[]): any {
    const averageEfficiency = energyData.reduce((sum, d) => sum + (d.energyEfficiencyScore || 0), 0) / energyData.length
    const naturalVentilationSuitable = energyData.filter(d => d.ventilationStrategy === 'NATURAL_VENTILATION')

    return {
      averageEfficiencyScore: Math.round(averageEfficiency),
      naturalVentilationSuitableLocations: naturalVentilationSuitable.length,
      recommendations: this.getTopEnergyRecommendations(energyData)
    }
  }

  private getMostCommonVulnerableGroups(healthData: any[]): string[] {
    const groups = healthData.flatMap(d => d.vulnerableGroups || [])
    const groupCounts = groups.reduce((acc, group) => {
      acc[group] = (acc[group] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(groupCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([group]) => group)
  }

  private getTopHealthRecommendations(healthData: any[]): string[] {
    const allRecommendations = healthData.flatMap(d => d.recommendations || [])
    const uniqueRecommendations = [...new Set(allRecommendations)]
    return uniqueRecommendations.slice(0, 3)
  }

  private getTopTrafficRecommendations(trafficData: any[]): string[] {
    const allRecommendations = trafficData.flatMap(d => d.routeRecommendations || [])
    const uniqueRecommendations = [...new Set(allRecommendations)]
    return uniqueRecommendations.slice(0, 3)
  }

  private getTopEnergyRecommendations(energyData: any[]): string[] {
    const allRecommendations = energyData.flatMap(d => d.hvacRecommendations || [])
    const uniqueRecommendations = [...new Set(allRecommendations)]
    return uniqueRecommendations.slice(0, 3)
  }
}
