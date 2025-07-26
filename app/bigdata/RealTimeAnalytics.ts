// Real-Time Analytics Engine for Big Data Processing using AQICN API
import { supabase } from "../../lib/supabase"
import { 
  getAirQualityByCity, 
  getMultipleCitiesAirQuality, 
  getGlobalAirQualityInsights,
  getCityAirQualityAlert,
  getAQICNAPIStats
} from "./AQICNQueries"
import type { ProcessedAirQualityData } from "./RealTimeDataConnector"

export interface AnalyticsMetrics {
  totalDevices: number
  activeDevices: number
  dataPointsPerSecond: number
  averageResponseTime: number
  systemEfficiency: number
  alertsGenerated: number
  realDataSources: number
  apiCallsToday: number
}

export interface TrendData {
  timestamp: string
  value: number
  category: string
  source: string
}

export interface PredictiveInsight {
  type: string
  prediction: string
  confidence: number
  timeframe: string
  impact: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  dataSource: string
}

// Class 20: Real-Time Analytics Engine with Real AQICN Big Data Integration
export class RealTimeAnalytics {
  private isRunning = false
  private metrics: AnalyticsMetrics = {
    totalDevices: 0,
    activeDevices: 0,
    dataPointsPerSecond: 0,
    averageResponseTime: 0,
    systemEfficiency: 0,
    alertsGenerated: 0,
    realDataSources: 1, // AQICN API
    apiCallsToday: 0,
  }
  private trendData: TrendData[] = []
  private insights: PredictiveInsight[] = []
  private analyticsInterval?: NodeJS.Timeout

  // Major cities for big data collection - matching our AQICN connector
  private smartCityLocations = [
    { name: "shanghai", displayName: "Shanghai, China" },
    { name: "beijing", displayName: "Beijing, China" },
    { name: "london", displayName: "London, UK" },
    { name: "new-york", displayName: "New York, USA" },
    { name: "paris", displayName: "Paris, France" },
    { name: "tokyo", displayName: "Tokyo, Japan" },
    { name: "delhi", displayName: "Delhi, India" },
    { name: "singapore", displayName: "Singapore" }
  ]

  constructor() {
    console.log("Real-Time Analytics Engine initialized with AQICN API integration")
  }

  public startAnalytics(): void {
    if (this.isRunning) return

    this.isRunning = true
    console.log("Real-Time Big Data Analytics Engine started with AQICN API")

    this.analyticsInterval = setInterval(() => {
      this.processRealTimeAnalytics()
    }, 120000) 

    this.processRealTimeAnalytics()
  }

  public stopAnalytics(): void {
    this.isRunning = false
    if (this.analyticsInterval) {
      clearInterval(this.analyticsInterval)
    }
    console.log("Real-Time Analytics Engine stopped")
  }

  private async processRealTimeAnalytics(): Promise<void> {
    try {
      console.log("Processing real-time big data from AQICN API...")
      
      const startTime = Date.now()
      
      await Promise.all([
        this.updateDeviceMetrics(),
        this.processRealAQICNData(),
        this.generatePredictiveInsights(),
        this.detectRealAnomalies(),
        this.updateAPIMetrics()
      ])

      const endTime = Date.now()
      this.metrics.averageResponseTime = endTime - startTime
      this.metrics.dataPointsPerSecond = this.calculateRealDataThroughput()
      
      this.updateTrendData()
      
      console.log(`Processed ${this.metrics.apiCallsToday} API calls today from AQICN`)
    } catch (error) {
      console.error("Error in real-time analytics:", error)
    }
  }

  private async updateDeviceMetrics(): Promise<void> {
    try {
      const { data: devices } = await supabase.from("devices").select("*")

      if (devices) {
        this.metrics.totalDevices = devices.length
        this.metrics.activeDevices = devices.filter((d) => d.status === "ONLINE").length
        this.metrics.systemEfficiency = devices.length > 0 
          ? (this.metrics.activeDevices / this.metrics.totalDevices) * 100 
          : 0
      }
    } catch (error) {
      console.error("Error updating device metrics:", error)
    }
  }

  private async processRealAQICNData(): Promise<void> {
    try {
      console.log("Fetching air quality data from multiple cities...")
      
      const cityDataPromises = this.smartCityLocations.slice(0, 5).map(async (location) => {
        const cachedData = await this.getCachedCityData(location.name)
        return cachedData
      })

      const cityDataResults = await Promise.all(cityDataPromises)
      const validCityData = cityDataResults.filter(data => data !== null) as ProcessedAirQualityData[]

      if (validCityData.length === 0) {
        console.warn("No valid city data received from AQICN API")
        return
      }

      console.log(`Successfully processed ${validCityData.length} cities`)

      const totalAQI = validCityData.reduce((sum, city) => sum + city.aqi, 0)
      const averageAQI = Math.round(totalAQI / validCityData.length)
      const citiesWithAlerts = validCityData.filter(city => city.aqi > 100).length

      if (citiesWithAlerts > 0) {
        this.addInsight({
          type: "GLOBAL_AIR_QUALITY_ALERT",
          prediction: `${citiesWithAlerts} cities currently have poor air quality (AQI > 100). Affected cities: ${validCityData.filter(c => c.aqi > 100).map(c => c.location).join(', ')}`,
          confidence: 95,
          timeframe: "Current",
          impact: citiesWithAlerts > 3 ? "CRITICAL" : "HIGH",
          dataSource: "AQICN Global Network"
        })
      }

      const alertPromises = validCityData.slice(0, 3).map(async (cityData) => {
        if (cityData.aqi > 100) {
          const alert = await getCityAirQualityAlert(cityData.location.toLowerCase().replace(/[^a-z]/g, ''))
          if (alert && alert.hasAlert) {
            this.addInsight({
              type: "CITY_AIR_QUALITY_ALERT",
              prediction: `${cityData.location}: ${alert.recommendation}`,
              confidence: 90,
              timeframe: "Current",
              impact: alert.aqi > 200 ? "CRITICAL" : alert.aqi > 150 ? "HIGH" : "MEDIUM",
              dataSource: "AQICN City Monitor"
            })
            return alert
          }
        }
        return null
      })

      const alerts = await Promise.all(alertPromises)
      const activeAlerts = alerts.filter(alert => alert?.hasAlert).length
      
      if (activeAlerts > 0) {
        this.metrics.alertsGenerated += activeAlerts
      }

      this.trendData.push({
        timestamp: new Date().toISOString(),
        value: averageAQI,
        category: "global-aqi",
        source: "aqicn-api"
      })

      validCityData.forEach(cityData => {
        this.trendData.push({
          timestamp: new Date().toISOString(),
          value: cityData.aqi,
          category: `city-aqi-${cityData.location.toLowerCase().replace(/[^a-z]/g, '')}`,
          source: "aqicn-api"
        })
      })

      console.log(`Processed global air quality data: Average AQI ${averageAQI}, ${citiesWithAlerts} cities with alerts`)
    } catch (error) {
      console.error("Error processing real AQICN data:", error)
    }
  }

  private async generatePredictiveInsights(): Promise<void> {
    const currentHour = new Date().getHours()
    
    try {
      const londonData = await this.getCachedCityData("london")
      
      if (londonData) {
        // Predict traffic patterns based on time and air quality
        if (currentHour >= 7 && currentHour <= 9) {
          let trafficImpact = "normal"
          
          if (londonData.aqi > 100) {
            trafficImpact = "increased due to poor air quality - people may use cars instead of cycling"
          }
          
          this.addInsight({
            type: "TRAFFIC_PREDICTION",
            prediction: `Morning rush hour traffic expected to be ${trafficImpact} (Current AQI: ${londonData.aqi})`,
            confidence: 85,
            timeframe: "Next 2 hours",
            impact: londonData.aqi > 150 ? "HIGH" : "MEDIUM",
            dataSource: "AQICN + Traffic Analysis"
          })
        }

        if (londonData.aqi > 100) {
          this.addInsight({
            type: "HEALTH_RECOMMENDATION",
            prediction: `Air quality in ${londonData.location} is ${londonData.healthLevel}. Outdoor exercise should be limited.`,
            confidence: 95,
            timeframe: "Current",
            impact: londonData.aqi > 200 ? "CRITICAL" : "HIGH",
            dataSource: "AQICN Health Index"
          })
        }

        if (londonData.temperature !== undefined) {
          if (londonData.temperature > 25) {
            this.addInsight({
              type: "ENERGY_PREDICTION",
              prediction: `High temperature (${londonData.temperature}°C) may increase cooling energy demand by 15-20%`,
              confidence: 80,
              timeframe: "Next 6 hours",
              impact: "MEDIUM",
              dataSource: "AQICN Weather + Energy Analysis"
            })
          }
        }
      }
    } catch (error) {
      console.error("Error generating predictive insights:", error)
    }
  }

  private async detectRealAnomalies(): Promise<void> {
    try {
      const cities = await getMultipleCitiesAirQuality(5) // Sample 5 cities
      
      if (cities.length > 2) {
        const aqiValues = cities.map(city => city.aqi)
        const mean = aqiValues.reduce((sum, val) => sum + val, 0) / aqiValues.length
        const variance = aqiValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / aqiValues.length
        const stdDev = Math.sqrt(variance)

        const anomalies = cities.filter(city => Math.abs(city.aqi - mean) > 2 * stdDev)

        if (anomalies.length > 0) {
          this.metrics.alertsGenerated++
          this.addInsight({
            type: "ANOMALY_DETECTION",
            prediction: `${anomalies.length} cities show unusual air quality patterns: ${anomalies.map(a => `${a.location} (AQI: ${a.aqi})`).join(', ')}`,
            confidence: 92,
            timeframe: "Current",
            impact: "HIGH",
            dataSource: "AQICN Statistical Analysis"
          })
        }
      }
    } catch (error) {
      console.error("Error in real anomaly detection:", error)
    }
  }

  private async updateAPIMetrics(): Promise<void> {
    try {
      const apiStats = await getAQICNAPIStats()
      this.metrics.apiCallsToday = apiStats.requestCount
    } catch (error) {
      console.error("Error updating API metrics:", error)
    }
  }

  private calculateRealDataThroughput(): number {
    const timeWindowSeconds = 120 // 2 minutes between processing cycles
    const dataPointsPerCall = 15 // Approximate data points per AQICN API call
    const estimatedDataPoints = this.metrics.apiCallsToday * dataPointsPerCall
    
    return Math.floor(estimatedDataPoints / timeWindowSeconds)
  }

  private addInsight(insight: PredictiveInsight): void {
    this.insights.unshift(insight)
    if (this.insights.length > 50) {
      this.insights = this.insights.slice(0, 50)
    }
  }

  private updateTrendData(): void {
    const now = new Date().toISOString()

    // Add current metrics to trend data with real sources
    this.trendData.push(
      { 
        timestamp: now, 
        value: this.metrics.systemEfficiency, 
        category: "system-efficiency",
        source: "internal-metrics"
      },
      { 
        timestamp: now, 
        value: this.metrics.dataPointsPerSecond, 
        category: "data-throughput",
        source: "aqicn-api-metrics"
      },
      { 
        timestamp: now, 
        value: this.metrics.apiCallsToday, 
        category: "api-usage",
        source: "aqicn-request-counter"
      },
    )

    if (this.trendData.length > 300) {
      this.trendData = this.trendData.slice(-300)
    }
  }

  public getMetrics(): AnalyticsMetrics {
    return { ...this.metrics }
  }

  public getTrendData(): TrendData[] {
    return [...this.trendData]
  }

  public getInsights(): PredictiveInsight[] {
    return [...this.insights]
  }

  public getRealtimeStats(): any {
    // Return real statistics based on actual AQICN API usage and data processing
    return {
      processingRate: this.metrics.dataPointsPerSecond,
      dataVolume: this.metrics.apiCallsToday * 15000, // Approximate data volume per API call
      activeStreams: this.metrics.realDataSources,
      latency: this.metrics.averageResponseTime,
      apiCallsToday: this.metrics.apiCallsToday,
      dataSources: [
        "AQICN World Air Quality Index API",
        "Internal Smart City Sensor Network",
        "Supabase Real-time Database"
      ]
    }
  }

  // Enhanced method to get live data dashboard with AQICN integration
  public async getLiveDataDashboard(): Promise<any> {
    try {
      const [globalInsights, londonData, apiStats] = await Promise.all([
        getGlobalAirQualityInsights(),
        getAirQualityByCity("london"),
        getAQICNAPIStats()
      ])

      return {
        currentTimestamp: new Date().toISOString(),
        globalAirQuality: globalInsights,
        sampleCityData: londonData,
        systemMetrics: this.getMetrics(),
        recentInsights: this.insights.slice(0, 5),
        apiStatistics: apiStats,
        dataSourceStatus: {
          aqicnAPI: true,
          internalSensors: true,
          supabaseDB: true
        },
        bigDataVolume: {
          citiesMonitored: globalInsights.totalCitiesMonitored,
          realTimeDataPoints: this.metrics.apiCallsToday * 15,
          alertsGenerated: this.metrics.alertsGenerated
        }
      }
    } catch (error) {
      console.error("Error generating live data dashboard:", error)
      return null
    }
  }

  public async getCachedCityData(cityName: string): Promise<ProcessedAirQualityData | null> {
    try {
      const { data, error } = await supabase
        .from("cached_air_quality")
        .select("*")
        .eq("city_name", cityName)
        .gte("cached_at", new Date(Date.now() - 30 * 60 * 1000).toISOString()) // 30 minutes cache
        .order("cached_at", { ascending: false })
        .limit(1)

      if (error || !data || data.length === 0) {
        const freshData = await getAirQualityByCity(cityName)
        
        if (freshData) {
          await supabase.from("cached_air_quality").insert([{
            city_name: freshData.location,
            aqi: freshData.aqi,
            pm25: freshData.pm25,
            pm10: freshData.pm10,
            no2: freshData.no2,
            so2: freshData.so2,
            o3: freshData.o3,
            co: freshData.co,
            temperature: freshData.temperature,
            humidity: freshData.humidity,
            pressure: freshData.pressure,
            wind_speed: freshData.windSpeed,
            latitude: freshData.coordinates.lat,
            longitude: freshData.coordinates.lng,
            dominant_pollutant: freshData.dominantPollutant,
            health_level: freshData.healthLevel,
            api_source: freshData.apiSource,
            timestamp: freshData.timestamp,
            cached_at: new Date().toISOString()
          }])
        }
        
        return freshData
      }

      const cached = data[0]
      return {
        aqi: cached.aqi,
        pm25: cached.pm25 || 0,
        pm10: cached.pm10 || 0,
        no2: cached.no2 || 0,
        so2: cached.so2 || 0,
        o3: cached.o3 || 0,
        co: cached.co || 0,
        timestamp: cached.timestamp,
        location: cached.city_name,
        coordinates: {
          lat: cached.latitude,
          lng: cached.longitude
        },
        temperature: cached.temperature || undefined,
        humidity: cached.humidity || undefined,
        pressure: cached.pressure || undefined,
        windSpeed: cached.wind_speed || undefined,
        dominantPollutant: cached.dominant_pollutant || 'pm25',
        healthLevel: cached.health_level,
        apiSource: cached.api_source || 'AQICN'
      }
    } catch (error) {
      console.error("Error in getCachedCityData:", error)
      return null
    }
  }
}
