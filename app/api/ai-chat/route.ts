import { NextRequest, NextResponse } from 'next/server'
import { getMultipleCitiesAirQuality, getGlobalAirQualityInsights } from '@/app/bigdata/AQICNQueries'
import { createDeepSeek } from '@ai-sdk/deepseek'
import { generateText } from 'ai'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json({
        success: false,
        error: 'Message is required'
      }, { status: 400 })
    }

    const [citiesData, globalInsights] = await Promise.all([
      getMultipleCitiesAirQuality(10), 
      getGlobalAirQualityInsights()
    ])

    const currentData = citiesData.map(city => ({
      city: city.location,
      aqi: city.aqi,
      healthLevel: city.healthLevel,
      pm25: city.pm25,
      dominantPollutant: city.dominantPollutant,
      timestamp: city.timestamp
    }))


    const contextPrompt = `You are an AI environmental assistant with access to real-time air quality data. 

CURRENT AIR QUALITY DATA (Updated: ${new Date().toISOString()}):
${currentData.map(city => 
  `• ${city.city}: AQI ${city.aqi} (${city.healthLevel}) - PM2.5: ${city.pm25}μg/m³, Dominant: ${city.dominantPollutant}`
).join('\n')}

GLOBAL INSIGHTS:
• Cities monitored: ${globalInsights?.totalCitiesMonitored || 'N/A'}
• Average AQI: ${globalInsights?.averageAQI || 'N/A'}
• Cities with alerts: ${globalInsights?.citiesWithAlerts || 'N/A'}
• Best air quality: ${globalInsights?.bestCity?.name || 'N/A'} (AQI ${globalInsights?.bestCity?.aqi || 'N/A'})
• Worst air quality: ${globalInsights?.worstCity?.name || 'N/A'} (AQI ${globalInsights?.worstCity?.aqi || 'N/A'})

Use this real-time data to provide accurate, current information about air quality conditions. When users ask about specific cities, reference the actual current data above.

User message: ${message}`

    const apiKey = process.env.DEEPSEEK_API_KEY
    let response: string

    console.log(`🔑 DeepSeek API Key status: ${apiKey ? 'Present' : 'Missing'}`)

    if (!apiKey) {
      console.log('⚠️ DeepSeek API key not found, using fallback response')
               const alertCities = currentData.filter(city => city.aqi > 100)
        const goodCities = currentData.filter(city => city.aqi <= 50)
        
        const sortedCities = [...currentData].sort((a, b) => a.aqi - b.aqi)
        const bestCity = sortedCities[0]
        const worstCity = sortedCities[sortedCities.length - 1]
        
        const isAskingForPollutants = message.toLowerCase().includes('pm2.5') || 
                                    message.toLowerCase().includes('pm10') || 
                                    message.toLowerCase().includes('pollutant') ||
                                    message.toLowerCase().includes('detailed')

        if (isAskingForPollutants) {
          response = `🌍 **Detailed Air Quality Data** (${currentData.length} cities):\n\n` +
            currentData.map(c => 
              `**${c.city.split(',')[0]}**: AQI ${c.aqi} (${c.healthLevel})\n` +
              `  • PM2.5: ${c.pm25 || 'N/A'} μg/m³\n` +
              `  • Dominant pollutant: ${c.dominantPollutant || 'N/A'}\n`
            ).join('\n') +
            `\n*Live data updated ${new Date().toLocaleTimeString()}*`
        } else {
          response = `Based on current air quality data from ${currentData.length} cities:\n\n` +
            `🌍 **Current Cities**: ${currentData.map(c => `${c.city.split(',')[0]} (AQI ${c.aqi})`).join(', ')}\n\n` +
            (alertCities.length > 0 ? 
              `⚠️ **Cities with Alerts**: ${alertCities.map(c => `${c.city.split(',')[0]} (AQI ${c.aqi})`).join(', ')}\n\n` : '') +
            (goodCities.length > 0 ? 
              `✅ **Good Air Quality**: ${goodCities.map(c => `${c.city.split(',')[0]} (AQI ${c.aqi})`).join(', ')}\n\n` : '') +
            `🏆 **Best**: ${bestCity?.city.split(',')[0] || 'N/A'} (AQI ${bestCity?.aqi || 'N/A'})\n` +
            `📉 **Worst**: ${worstCity?.city.split(',')[0] || 'N/A'} (AQI ${worstCity?.aqi || 'N/A'})\n\n` +
            `*Note: DeepSeek AI is not configured. Showing current live data.*`
        }
     } else {
       const deepseek = createDeepSeek({ apiKey })
       const { text } = await generateText({
         model: deepseek('deepseek-chat'),
         prompt: contextPrompt,
         temperature: 0.4,
       })
       response = text
     }

    return NextResponse.json({
      success: true,
      response: response,
      dataSource: 'Real-time AQICN + AI Analysis',
      citiesIncluded: currentData.length,
      lastUpdate: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in AI chat:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process your request. Please try again.',
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AI Chat API is running',
    timestamp: new Date().toISOString()
  });
} 