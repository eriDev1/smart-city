// AQICN Query Functions for use with Supabase Cache Helpers
import { createAQICNDataConnector, type ProcessedAirQualityData } from "./RealTimeDataConnector"

const dataConnector = createAQICNDataConnector()

export async function getAirQualityByCity(cityName: string): Promise<ProcessedAirQualityData | null> {
  return await dataConnector.fetchAirQualityByCity(cityName)
}

export async function getAirQualityByCoordinates(lat: number, lng: number): Promise<ProcessedAirQualityData | null> {
  return await dataConnector.fetchAirQualityByCoordinates(lat, lng)
}

export async function getMultipleCitiesAirQuality(limit?: number): Promise<ProcessedAirQualityData[]> {
  return await dataConnector.fetchMultipleCitiesData(limit)
}

export async function getGlobalAirQualityInsights() {
  return await dataConnector.getGlobalAirQualityInsights()
}

export async function getCityAirQualityAlert(cityName: string) {
  return await dataConnector.checkCityAirQualityAlert(cityName)
}

export async function searchAirQualityStations(query: string): Promise<ProcessedAirQualityData[]> {
  return await dataConnector.searchStations(query)
}

export const aqicnQueryKeys = {
  all: ['aqicn'] as const,
  cities: () => [...aqicnQueryKeys.all, 'cities'] as const,
  city: (cityName: string) => [...aqicnQueryKeys.cities(), cityName] as const,
  coordinates: (lat: number, lng: number) => [...aqicnQueryKeys.all, 'coordinates', lat, lng] as const,
  multipleCities: (limit?: number) => [...aqicnQueryKeys.cities(), 'multiple', limit] as const,
  globalInsights: () => [...aqicnQueryKeys.all, 'global-insights'] as const,
  cityAlert: (cityName: string) => [...aqicnQueryKeys.all, 'alert', cityName] as const,
  searchStations: (query: string) => [...aqicnQueryKeys.all, 'search', query] as const,
}

export async function getAQICNAPIStats() {
  return dataConnector.getAPIStats()
} 