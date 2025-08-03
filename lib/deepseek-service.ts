import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

export interface AIInsight {
  type: string;
  city: string;
  severity: string;
  confidence: number;
  prediction: string;
  dataSource: string;
  timeframe: string;
  impact: string;
  detectedAt: string;
}

export interface AirQualityData {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  timestamp: string;
  dominentPollutant?: string;
}

export class DeepSeekInsightsService {
  private apiKey: string;
  private deepseek: any;

  constructor() {
    // Support both naming conventions for the API key
    this.apiKey = process.env.Deepseek_API_KEY || process.env.DEEPSEEK_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not found in environment variables. Please set either Deepseek_API_KEY or DEEPSEEK_API_KEY');
    }
    
    // Create configured DeepSeek instance
    this.deepseek = createDeepSeek({
      apiKey: this.apiKey,
    });
  }

  /**
   * Generate AI insights based on air quality data from multiple cities
   */
  async generateInsights(airQualityData: AirQualityData[]): Promise<AIInsight[]> {
    try {
      const prompt = this.createAnalysisPrompt(airQualityData);
      
      const { text } = await generateText({
        model: this.deepseek('deepseek-chat'),
        prompt,
        maxTokens: 2000,
        temperature: 0.3, // Lower temperature for more consistent, factual responses
      });

      return this.parseInsights(text, airQualityData);
    } catch (error) {
      console.error('Error generating DeepSeek insights:', error);
      throw new Error('Failed to generate AI insights');
    }
  }

  /**
   * Create a structured prompt for analyzing air quality data
   */
  private createAnalysisPrompt(data: AirQualityData[]): string {
    const cityData = data.map(city => ({
      name: city.city,
      aqi: city.aqi,
      pm25: city.pm25,
      pm10: city.pm10,
      dominentPollutant: city.dominentPollutant,
      timestamp: city.timestamp
    }));

    return `You are an expert environmental data analyst specializing in air quality monitoring and health impact assessment. 

Analyze the following real-time air quality data from multiple cities and generate 3-4 actionable insights:

CURRENT AIR QUALITY DATA:
${JSON.stringify(cityData, null, 2)}

ANALYSIS REQUIREMENTS:
1. Identify cities with concerning air quality levels (AQI > 100)
2. Detect unusual patterns or anomalies in pollution levels
3. Assess potential health risks for vulnerable populations
4. Predict short-term trends based on current conditions

For each insight, provide:
- Type: (HEALTH_ALERT, POLLUTION_SPIKE, TRAFFIC_IMPACT, ANOMALY_DETECTION, etc.)
- City: The specific city affected
- Severity: LOW, MEDIUM, HIGH, or CRITICAL
- Confidence: (percentage from 70-99)
- Prediction: Clear, actionable statement (max 80 words)
- Impact: LOW, MEDIUM, HIGH, or CRITICAL
- Timeframe: (Current, Next 2 hours, Today, etc.)

Format your response as a JSON array with this structure:
[
  {
    "type": "INSIGHT_TYPE",
    "city": "City Name",
    "severity": "LEVEL",
    "confidence": 85,
    "prediction": "Clear description of the insight and recommended actions",
    "impact": "LEVEL",
    "timeframe": "Time period"
  }
]

Focus on practical, actionable insights that help citizens and authorities make informed decisions about outdoor activities and health precautions.`;
  }

  /**
   * Parse the AI response and convert to structured insights
   */
  private parseInsights(aiResponse: string, originalData: AirQualityData[]): AIInsight[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        return this.createFallbackInsights(originalData);
      }

      const parsedInsights = JSON.parse(jsonMatch[0]);
      
      return parsedInsights.map((insight: any) => ({
        type: insight.type || 'GENERAL_ANALYSIS',
        city: insight.city || 'Multiple Cities',
        severity: insight.severity || 'MEDIUM',
        confidence: Math.min(Math.max(insight.confidence || 80, 70), 99),
        prediction: insight.prediction || 'Air quality analysis completed',
        dataSource: 'DEEPSEEK_AI_ANALYSIS',
        timeframe: insight.timeframe || 'Current',
        impact: insight.impact || 'MEDIUM',
        detectedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error parsing AI insights:', error);
      return this.createFallbackInsights(originalData);
    }
  }

  /**
   * Create fallback insights if AI parsing fails
   */
  private createFallbackInsights(data: AirQualityData[]): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Find cities with high AQI
    const criticalCities = data.filter(city => city.aqi > 150);
    const unhealthyCities = data.filter(city => city.aqi > 100 && city.aqi <= 150);
    
    if (criticalCities.length > 0) {
      const city = criticalCities[0];
      insights.push({
        type: 'HEALTH_ALERT',
        city: city.city,
        severity: 'CRITICAL',
        confidence: 88,
        prediction: `Air quality in ${city.city} has reached unhealthy levels (AQI: ${city.aqi}). Sensitive individuals should avoid outdoor activities.`,
        dataSource: 'DEEPSEEK_AI_ANALYSIS',
        timeframe: 'Current',
        impact: 'CRITICAL',
        detectedAt: new Date().toISOString()
      });
    }
    
    if (unhealthyCities.length > 0) {
      const city = unhealthyCities[0];
      insights.push({
        type: 'POLLUTION_SPIKE',
        city: city.city,
        severity: 'HIGH',
        confidence: 82,
        prediction: `Elevated pollution levels detected in ${city.city} (AQI: ${city.aqi}). Consider limiting prolonged outdoor exposure.`,
        dataSource: 'DEEPSEEK_AI_ANALYSIS',
        timeframe: 'Current',
        impact: 'HIGH',
        detectedAt: new Date().toISOString()
      });
    }

    return insights.slice(0, 3);
  }

  /**
   * Generate a single insight for a specific city
   */
  async generateCityInsight(cityData: AirQualityData): Promise<AIInsight | null> {
    try {
      const prompt = `Analyze this air quality data for ${cityData.city} and provide one specific insight:

City: ${cityData.city}
AQI: ${cityData.aqi}
PM2.5: ${cityData.pm25} μg/m³
PM10: ${cityData.pm10} μg/m³
Dominant Pollutant: ${cityData.dominentPollutant}

Provide a JSON response with one actionable insight about the current air quality conditions and health recommendations.`;

      const { text } = await generateText({
        model: this.deepseek('deepseek-chat'),
        prompt,
        maxTokens: 500,
        temperature: 0.2,
      });

      const insights = this.parseInsights(text, [cityData]);
      return insights.length > 0 ? insights[0] : null;
    } catch (error) {
      console.error('Error generating city insight:', error);
      return null;
    }
  }
} 