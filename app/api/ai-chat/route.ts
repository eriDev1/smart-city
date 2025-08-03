import { NextRequest, NextResponse } from 'next/server';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import { getMultipleCitiesAirQuality, getGlobalAirQualityInsights } from '@/app/bigdata/AQICNQueries';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'insight' | 'analysis' | 'question';
}

interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.Deepseek_API_KEY || process.env.DEEPSEEK_API_KEY;

    const body: ChatRequest = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Message is required'
      }, { status: 400 });
    }

    const [airQualityData, globalInsights] = await Promise.all([
      getMultipleCitiesAirQuality(8).catch(() => []),
      getGlobalAirQualityInsights().catch(() => null)
    ]);

    const conversationContext = conversationHistory
      .slice(-4) 
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = createChatPrompt(message, airQualityData, globalInsights, conversationContext);

    const deepseek = createDeepSeek({ apiKey });
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt,
      temperature: 0.4, 
    });

    return NextResponse.json({
      success: true,
      response: text,
      metadata: {
        timestamp: new Date().toISOString(),
        citiesAnalyzed: airQualityData?.length || 0,
        hasGlobalData: !!globalInsights
      }
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process chat message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function createChatPrompt(
  userMessage: string, 
  airQualityData: any[], 
  globalInsights: any, 
  conversationContext: string
): string {
  const currentData = airQualityData?.slice(0, 5) || [];
  
  return `You are an expert environmental AI assistant specializing in air quality analysis and health recommendations. You're having a conversation with a user about environmental conditions.

CURRENT AIR QUALITY DATA:
${currentData.length > 0 ? JSON.stringify(currentData.map(city => ({
  location: city.location,
  aqi: city.aqi,
  pm25: city.pm25,
  pm10: city.pm10,
  dominantPollutant: city.dominantPollutant,
  healthLevel: city.healthLevel
})), null, 2) : 'No current data available'}

GLOBAL INSIGHTS:
${globalInsights ? `
- Cities Monitored: ${globalInsights.totalCitiesMonitored || 'N/A'}
- Countries: ${globalInsights.countriesRepresented || 'N/A'}
- Average AQI: ${globalInsights.averageAQI || 'N/A'}
- Air Quality Trend: ${globalInsights.qualityTrend || 'N/A'}
` : 'Global insights not available'}

CONVERSATION HISTORY:
${conversationContext || 'No previous conversation'}

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
1. Respond conversationally and helpfully
2. Use the current air quality data to provide specific, actionable advice
3. If asked about specific cities, reference the actual data
4. Provide health recommendations based on AQI levels:
   - 0-50 (Good): Safe for all activities
   - 51-100 (Moderate): Sensitive people should limit prolonged outdoor activities
   - 101-150 (Unhealthy for Sensitive Groups): Sensitive people should avoid outdoor activities
   - 151-200 (Unhealthy): Everyone should limit outdoor activities
   - 201+ (Very Unhealthy): Everyone should avoid outdoor activities
5. Keep responses concise but informative (aim for 2-4 sentences)
6. Use emojis sparingly and appropriately
7. If the user asks about something unrelated to air quality/environment, politely redirect to your expertise area
8. Always base recommendations on real data when available

Respond as a knowledgeable but friendly assistant:`;
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'AI Chat API is running',
    timestamp: new Date().toISOString()
  });
} 