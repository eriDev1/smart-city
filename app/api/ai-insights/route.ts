import { NextRequest, NextResponse } from 'next/server';
import { DeepSeekInsightsService, AirQualityData } from '@/lib/deepseek-service';
import { getMultipleCitiesAirQuality } from '@/app/bigdata/AQICNQueries';

export async function GET() {
  try {
    // Check if API key is available
    if (!process.env.Deepseek_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    // Get real-time air quality data
    const airQualityData = await getMultipleCitiesAirQuality(10);
    
    if (!airQualityData || airQualityData.length === 0) {
      return NextResponse.json(
        { error: 'No air quality data available' },
        { status: 404 }
      );
    }

    const processedData: AirQualityData[] = airQualityData.map(city => ({
      city: city.location,
      aqi: city.aqi,
      pm25: city.pm25 || 0,
      pm10: city.pm10 || 0,
      o3: city.o3 || 0,
      no2: city.no2 || 0,
      so2: city.so2 || 0,
      co: city.co || 0,
      timestamp: city.timestamp,
      dominantPollutant: city.dominantPollutant || 'Unknown'
    }));

    // Generate AI insights using DeepSeek
    const deepSeekService = new DeepSeekInsightsService();
    const insights = await deepSeekService.generateInsights(processedData);

    return NextResponse.json({
      success: true,
      insights,
      metadata: {
        generatedAt: new Date().toISOString(),
        citiesAnalyzed: processedData.length,
        model: 'deepseek-chat',
        source: 'DEEPSEEK_AI_ANALYSIS'
      }
    });

  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.Deepseek_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { airQualityData } = body;

    if (!airQualityData || !Array.isArray(airQualityData)) {
      return NextResponse.json(
        { error: 'Invalid air quality data provided' },
        { status: 400 }
      );
    }

    // Generate AI insights using provided data
    const deepSeekService = new DeepSeekInsightsService();
    const insights = await deepSeekService.generateInsights(airQualityData);

    return NextResponse.json({
      success: true,
      insights,
      metadata: {
        generatedAt: new Date().toISOString(),
        citiesAnalyzed: airQualityData.length,
        model: 'deepseek-chat',
        source: 'DEEPSEEK_AI_ANALYSIS'
      }
    });

  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI insights',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Generate insight for a specific city
export async function PUT(request: NextRequest) {
  try {
    if (!process.env.Deepseek_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { cityData } = body;

    if (!cityData) {
      return NextResponse.json(
        { error: 'City data is required' },
        { status: 400 }
      );
    }

    const deepSeekService = new DeepSeekInsightsService();
    const insight = await deepSeekService.generateCityInsight(cityData);

    if (!insight) {
      return NextResponse.json(
        { error: 'Failed to generate city insight' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      insight,
      metadata: {
        generatedAt: new Date().toISOString(),
        city: cityData.city,
        model: 'deepseek-chat',
        source: 'DEEPSEEK_AI_ANALYSIS'
      }
    });

  } catch (error) {
    console.error('Error generating city insight:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate city insight',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 