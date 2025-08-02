'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAirQualityByCity, getGlobalAirQualityInsights, aqicnQueryKeys } from '@/app/bigdata/AQICNQueries'
import { CheckCircle, Sparkles } from 'lucide-react'
import AnimatedCounter from '@/components/magic-ui/animated-counter'

function AirQualityCard({ city }: { city: string }) {
  const { data: airQuality, isLoading, error, refetch } = useQuery({
    queryKey: aqicnQueryKeys.city(city),
    queryFn: () => {
      console.log(`Fetching data for city: ${city}`)
      return getAirQualityByCity(city)
    },
    staleTime: 5 * 60 * 1000, 
    refetchInterval: 10 * 60 * 1000, 
    retry: 3,
    retryDelay: 1000,
  })

  const getHealthColor = (healthLevel: string) => {
    switch (healthLevel.toLowerCase()) {
      case 'good': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'unhealthy for sensitive groups': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'unhealthy': return 'bg-red-100 text-red-800 border-red-200'
      case 'very unhealthy': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'hazardous': return 'bg-red-200 text-red-900 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-emerald-600'
    if (aqi <= 100) return 'text-yellow-600'
    if (aqi <= 150) return 'text-orange-600'
    if (aqi <= 200) return 'text-red-600'
    if (aqi <= 300) return 'text-purple-600'
    return 'text-red-800'
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse bg-white/70 backdrop-blur-sm shadow-lg border-gray-200">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-600">{city}</CardTitle>
          <CardDescription>Failed to load air quality data</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!airQuality) {
    return (
      <Card className="border-gray-200 bg-white/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>{city}</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="transition-all hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {airQuality.location}
          </span>
          <Badge variant="outline" className={getHealthColor(airQuality.healthLevel)}>
            {airQuality.healthLevel}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-gray-600">
          <Sparkles className="w-3 h-3" />
          Real-time data from {airQuality.apiSource}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-700">AQI</span>
            <span className={`text-3xl font-bold ${getAQIColor(airQuality.aqi)}`}>
              <AnimatedCounter value={airQuality.aqi} duration={1500} />
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">PM2.5:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={airQuality.pm25} duration={1200} /> μg/m³
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PM10:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={airQuality.pm10} duration={1200} /> μg/m³
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">NO₂:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={airQuality.no2} duration={1200} /> μg/m³
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">O₃:</span>
              <span className="ml-1 font-medium text-gray-900">
                <AnimatedCounter value={airQuality.o3} duration={1200} /> μg/m³
              </span>
            </div>
          </div>

          {airQuality.temperature && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-500">Temperature:</span>
              <span className="font-medium text-gray-900">
                <AnimatedCounter value={airQuality.temperature} duration={1000} />°C
              </span>
            </div>
          )}

          <div className="text-xs text-gray-400 flex items-center gap-1">
            <span>Dominant pollutant:</span>
            <Badge variant="secondary" className="text-xs">
              {airQuality.dominantPollutant.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GlobalInsightsWidget() {
  const { data: insights, isLoading, error } = useQuery({
    queryKey: aqicnQueryKeys.globalInsights(),
    queryFn: getGlobalAirQualityInsights,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
  })

  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle>Global Air Quality Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !insights) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-gray-200">
        <CardHeader>
          <CardTitle>Global Air Quality Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load global insights</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🌍 Global Air Quality Insights</CardTitle>
        <CardDescription>Real-time analytics from {insights.totalCitiesMonitored} cities worldwide</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{insights.averageAQI}</div>
            <div className="text-sm text-gray-500">Average AQI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{insights.citiesWithAlerts}</div>
            <div className="text-sm text-gray-500">Cities with Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{insights.bestCity.aqi}</div>
            <div className="text-sm text-gray-500">Best: {insights.bestCity.name}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{insights.worstCity.aqi}</div>
            <div className="text-sm text-gray-500">Worst: {insights.worstCity.name}</div>
          </div>
        </div>

        {insights.citiesWithAlerts > 0 && (
          <Alert className="mt-4">
            <AlertDescription>
              ⚠️ {insights.citiesWithAlerts} cities currently have unhealthy air quality (AQI {`>`} 100). 
              Consider limiting outdoor activities in affected areas.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export function GlobalMonitoring() {
  const majorCities = ['London', 'New York', 'Tokyo', 'Paris', 'Shanghai', 'Delhi']

  return (
    <div className="space-y-6">
      <GlobalInsightsWidget />

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🌍 Major Cities Air Quality Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Real-time pollution monitoring across 6 major global cities with complete health assessments powered by ACIQN data
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majorCities.map((city) => (
            <AirQualityCard key={city} city={city} />
          ))}
        </div>
      </div>
    </div>
  )
} 