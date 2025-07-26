// Real-Time Data Connector using AQICN API for Smart City Big Data Processing
import { supabase } from "../../lib/supabase"

// AQICN API Interfaces - Based on real API response structure
export interface AQICNResponse {
  status: string
  data: AQICNData
}

export interface AQICNData {
  aqi: number
  idx: number
  attributions: Attribution[]
  city: CityInfo
  dominentpol: string
  iaqi: IndividualAQI
  time: TimeInfo
  forecast?: ForecastData
}

export interface Attribution {
  url: string
  name: string
}

export interface CityInfo {
  geo: [number, number] // [latitude, longitude]
  name: string
  url: string
  location: string
}

export interface IndividualAQI {
  co?: { v: number }
  h?: { v: number }    // humidity
  no2?: { v: number }
  o3?: { v: number }
  p?: { v: number }    // pressure
  pm10?: { v: number }
  pm25?: { v: number }
  so2?: { v: number }
  t?: { v: number }    // temperature
  w?: { v: number }    // wind speed
}

export interface TimeInfo {
  s: string      // "2025-07-27 04:00:00"
  tz: string     // "+08:00"
  v: number      // Unix timestamp
  iso: string    // "2025-07-27T04:00:00+08:00"
}

export interface ForecastData {
  daily: {
    o3?: ForecastItem[]
    pm10?: ForecastItem[]
    pm25?: ForecastItem[]
    uvi?: ForecastItem[]
  }
}

export interface ForecastItem {
  avg: number
  day: string
  max: number
  min: number
}

// Processed Air Quality Data for our system
export interface ProcessedAirQualityData {
  aqi: number
  pm25: number
  pm10: number
  no2: number
  so2: number
  o3: number
  co: number
  timestamp: string
  location: string
  coordinates: { lat: number; lng: number }
  temperature?: number
  humidity?: number
  pressure?: number
  windSpeed?: number
  dominantPollutant: string
  healthLevel: string
  apiSource: string
}

// Class 21: Real-Time Data Connector for AQICN Big Data APIs
export class RealTimeDataConnector {
  private readonly BASE_URL = "http://api.waqi.info"
  private readonly DEMO_TOKEN = "demo" // Free demo token for testing
  private requestCount = 0

  // Global cities for comprehensive air quality monitoring
  private readonly GLOBAL_CITIES = [
    { name: "shanghai", displayName: "Shanghai, China" },
    { name: "beijing", displayName: "Beijing, China" },
    { name: "london", displayName: "London, UK" },
    { name: "new-york", displayName: "New York, USA" }, 
    { name: "paris", displayName: "Paris, France" },
    { name: "tokyo", displayName: "Tokyo, Japan" },
    { name: "delhi", displayName: "Delhi, India" },
        { name: "los-angeles", displayName: "Los Angeles, USA" }, 
    { name: "mumbai", displayName: "Mumbai, India" },
    { name: "singapore", displayName: "Singapore" },
    { name: "sydney", displayName: "Sydney, Australia" },
    { name: "bangkok", displayName: "Bangkok, Thailand" },
    { name: "seoul", displayName: "Seoul, South Korea" },
    { name: "berlin", displayName: "Berlin, Germany" },
    { name: "moscow", displayName: "Moscow, Russia" }
  ]

  constructor() {
    console.log("Initialized AQICN Real-Time Data Connector with demo token")
  }

  public async fetchAirQualityByCity(cityName: string): Promise<ProcessedAirQualityData | null> {
    try {
      this.requestCount++
      console.log(`Fetching air quality for: ${cityName}`)
      
      const url = `${this.BASE_URL}/feed/${cityName}/?token=${this.DEMO_TOKEN}`
      console.log(`Request URL: ${url}`)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        console.error(`HTTP error for ${cityName}: ${response.status} ${response.statusText}`)
        return null
      }

      const data: AQICNResponse = await response.json()
      console.log(`API response for ${cityName}:`, data)

      if (data.status !== "ok") {
        console.error(`API error for ${cityName}:`, data.status)
        return null
      }

      return this.processAQICNData(data.data)
    } catch (error) {
      console.error(`Error fetching data for ${cityName}:`, error)
      return null
    }
  }

  public async fetchAirQualityByCoordinates(lat: number, lng: number): Promise<ProcessedAirQualityData | null> {
    try {
      const url = `${this.BASE_URL}/feed/geo:${lat};${lng}/?token=${this.DEMO_TOKEN}`
      this.requestCount++
      
      console.log(`Fetching air quality data for coordinates ${lat}, ${lng}...`)
      
      const response = await fetch(url)
      const data: AQICNResponse = await response.json()
      
      if (data.status !== "ok" || !data.data) {
        console.error(`Failed to fetch data for coordinates ${lat}, ${lng}:`, data)
        return null
      }

      return this.processAQICNData(data.data, `${lat},${lng}`)
    } catch (error) {
      console.error(`Error fetching air quality data for coordinates ${lat}, ${lng}:`, error)
      return null
    }
  }

  public async fetchMultipleCitiesData(limit?: number): Promise<ProcessedAirQualityData[]> {
    const cities = limit ? this.GLOBAL_CITIES.slice(0, limit) : this.GLOBAL_CITIES
    const results: ProcessedAirQualityData[] = []

    console.log(`Fetching air quality data for ${cities.length} cities...`)

    const batchSize = 5
    for (let i = 0; i < cities.length; i += batchSize) {
      const batch = cities.slice(i, i + batchSize)
      
      const batchPromises = batch.map(city => 
        this.fetchAirQualityByCity(city.name)
      )
      
      const batchResults = await Promise.all(batchPromises)
      
      batchResults.forEach((result, index) => {
        if (result) {
          result.location = batch[index].displayName
          results.push(result)
        }
      })

      if (i + batchSize < cities.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    console.log(`Successfully fetched data for ${results.length} cities`)
    return results
  }

  private processAQICNData(data: AQICNData): ProcessedAirQualityData {
    const aqi = data.aqi || 0
    const pm25 = data.iaqi?.pm25?.v || 0
    const pm10 = data.iaqi?.pm10?.v || 0
    const no2 = data.iaqi?.no2?.v || 0
    const so2 = data.iaqi?.so2?.v || 0
    const o3 = data.iaqi?.o3?.v || 0
    const co = data.iaqi?.co?.v || 0

    const temperature = data.iaqi?.t?.v
    const humidity = data.iaqi?.h?.v
    const pressure = data.iaqi?.p?.v
    const windSpeed = data.iaqi?.w?.v

    const pollutants = { pm25, pm10, no2, so2, o3, co }
    const dominantPollutant = Object.entries(pollutants)
      .filter(([_, value]) => value > 0)
      .sort(([_, a], [__, b]) => b - a)[0]?.[0] || 'pm25'

    const getHealthLevel = (aqi: number): string => {
      if (aqi <= 50) return 'Good'
      if (aqi <= 100) return 'Moderate'
      if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
      if (aqi <= 200) return 'Unhealthy'
      if (aqi <= 300) return 'Very Unhealthy'
      return 'Hazardous'
    }

    return {
      aqi,
      pm25,
      pm10,
      no2,
      so2,
      o3,
      co,
      timestamp: data.time?.iso || new Date().toISOString(),
      location: data.city?.name || 'Unknown City',
      coordinates: {
        lat: data.city?.geo?.[0] || 0,
        lng: data.city?.geo?.[1] || 0
      },
      temperature,
      humidity,
      pressure,
      windSpeed,
      dominantPollutant,
      healthLevel: getHealthLevel(aqi),
      apiSource: 'AQICN'
    }
  }

  private getHealthLevel(aqi: number): string {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive Groups"
    if (aqi <= 200) return "Unhealthy"
    if (aqi <= 300) return "Very Unhealthy"
    return "Hazardous"
  }

  public async searchStations(query: string): Promise<ProcessedAirQualityData[]> {
    try {
      const url = `${this.BASE_URL}/search/?token=${this.DEMO_TOKEN}&keyword=${encodeURIComponent(query)}`
      this.requestCount++
      
      const response = await fetch(url)
      const searchData = await response.json()
      
      if (searchData.status !== "ok" || !searchData.data) {
        console.error("Failed to search stations:", searchData)
        return []
      }

      const results: ProcessedAirQualityData[] = []
      const stations = searchData.data.slice(0, 10) // Limit to 10 results
      
      for (const station of stations) {
        if (station.uid) {
          try {
            const detailUrl = `${this.BASE_URL}/feed/@${station.uid}/?token=${this.DEMO_TOKEN}`
            const detailResponse = await fetch(detailUrl)
            const detailData: AQICNResponse = await detailResponse.json()
            
            if (detailData.status === "ok" && detailData.data) {
              const processed = this.processAQICNData(detailData.data, station.station?.name || query)
              results.push(processed)
            }
          } catch (error) {
            console.error(`Error fetching station details for ${station.uid}:`, error)
          }
        }
      }
      
      return results
    } catch (error) {
      console.error("Error searching stations:", error)
      return []
    }
  }

  public getAPIStats(): { requestCount: number; dailyLimit: number; isDemo: boolean } {
    return {
      requestCount: this.requestCount,
      dailyLimit: 86400, // 1000 requests per second = effectively unlimited for daily use
      isDemo: true
    }
  }

  public async checkCityAirQualityAlert(cityName: string): Promise<{
    hasAlert: boolean;
    alertLevel: string;
    aqi: number;
    recommendation: string;
  } | null> {
    const data = await this.fetchAirQualityByCity(cityName)
    
    if (!data) return null

    const hasAlert = data.aqi > 100
    let alertLevel = "None"
    let recommendation = "Air quality is acceptable for outdoor activities."

    if (data.aqi > 300) {
      alertLevel = "Emergency"
      recommendation = "Health alert: everyone may experience serious health effects. Avoid all outdoor activities."
    } else if (data.aqi > 200) {
      alertLevel = "Critical"
      recommendation = "Health warning: everyone should avoid all outdoor exertion."
    } else if (data.aqi > 150) {
      alertLevel = "High"
      recommendation = "Everyone should avoid prolonged outdoor exertion."
    } else if (data.aqi > 100) {
      alertLevel = "Moderate"
      recommendation = "Sensitive individuals should limit outdoor activities."
    }

    return {
      hasAlert,
      alertLevel,
      aqi: data.aqi,
      recommendation
    }
  }

  public async getGlobalAirQualityInsights(): Promise<{
    averageAQI: number;
    worstCity: { name: string; aqi: number };
    bestCity: { name: string; aqi: number };
    citiesWithAlerts: number;
    totalCitiesMonitored: number;
    dominantPollutants: { [key: string]: number };
  }> {
    const data = await this.fetchMultipleCitiesData(10) // Sample 10 cities

    if (data.length === 0) {
      return {
        averageAQI: 0,
        worstCity: { name: "Unknown", aqi: 0 },
        bestCity: { name: "Unknown", aqi: 0 },
        citiesWithAlerts: 0,
        totalCitiesMonitored: 0,
        dominantPollutants: {}
      }
    }

    const totalAQI = data.reduce((sum, city) => sum + city.aqi, 0)
    const averageAQI = Math.round(totalAQI / data.length)

    const sortedByAQI = [...data].sort((a, b) => b.aqi - a.aqi)
    const worstCity = { name: sortedByAQI[0].location, aqi: sortedByAQI[0].aqi }
    const bestCity = { name: sortedByAQI[sortedByAQI.length - 1].location, aqi: sortedByAQI[sortedByAQI.length - 1].aqi }

    const citiesWithAlerts = data.filter(city => city.aqi > 100).length

    const dominantPollutants: { [key: string]: number } = {}
    data.forEach(city => {
      dominantPollutants[city.dominantPollutant] = (dominantPollutants[city.dominantPollutant] || 0) + 1
    })

    return {
      averageAQI,
      worstCity,
      bestCity,
      citiesWithAlerts,
      totalCitiesMonitored: data.length,
      dominantPollutants
    }
  }
}

// Factory function to create data connector instance
export function createAQICNDataConnector(): RealTimeDataConnector {
  return new RealTimeDataConnector()
}

export const createDataConnector = createAQICNDataConnector

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  pressure: number
  visibility: number
  weatherCondition: string
  timestamp: string
}

export interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  no2: number
  so2: number
  o3: number
  co: number
  timestamp: string
  location: string
} 