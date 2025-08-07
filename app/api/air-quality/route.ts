import { NextRequest, NextResponse } from 'next/server'
import { getMultipleCitiesAirQuality } from '@/app/bigdata/AQICNQueries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    
    // Fetch air quality data from multiple cities
    const airQualityData = await getMultipleCitiesAirQuality(limit)
    
    if (!airQualityData || airQualityData.length === 0) {
      return NextResponse.json(
        { error: 'No air quality data available' },
        { status: 404 }
      )
    }

    return NextResponse.json(airQualityData)
  } catch (error) {
    console.error('Error fetching air quality data:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch air quality data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
