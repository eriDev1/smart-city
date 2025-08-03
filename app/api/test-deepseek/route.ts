import { NextResponse } from 'next/server';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

export async function GET() {
  try {
    // Check if API key is available
    const apiKey = process.env.Deepseek_API_KEY || process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'DeepSeek API key not found',
        message: 'Please add your DeepSeek API key to your .env.local file',
        setup: {
          step1: 'Get your API key from https://platform.deepseek.com/api_keys',
          step2: 'Create or update .env.local file in your project root',
          step3: 'Add either: Deepseek_API_KEY=your_actual_api_key OR DEEPSEEK_API_KEY=your_actual_api_key',
          step4: 'Restart your development server'
        }
      }, { status: 400 });
    }

    // Test API key with a simple prompt
    const deepseek = createDeepSeek({ apiKey });
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: 'Hello! Please respond with "DeepSeek API is working correctly" if you can see this.',
      maxTokens: 50,
      temperature: 0.1,
    });

    return NextResponse.json({
      success: true,
      message: 'DeepSeek API is working correctly!',
      response: text,
      apiKey: apiKey ? 'Set (hidden)' : 'Not set',
      usedEnvironmentVar: process.env.Deepseek_API_KEY ? 'Deepseek_API_KEY' : 'DEEPSEEK_API_KEY',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('DeepSeek test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'DeepSeek API test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: {
        common_issues: [
          'Invalid API key',
          'API key not properly set in environment',
          'Network connectivity issues',
          'Rate limiting or quota exceeded'
        ],
        check: [
          'Verify your API key is correct',
          'Ensure .env.local file is in project root',
          'Restart development server after adding env vars',
          'Check DeepSeek platform for account status'
        ]
      }
    }, { status: 500 });
  }
} 