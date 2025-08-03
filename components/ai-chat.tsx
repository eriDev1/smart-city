'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, Bot, User, AlertCircle, Lightbulb, Sparkles } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'insight' | 'analysis' | 'question'
}

interface AIResponse {
  success: boolean
  response?: string
  insights?: any[]
  error?: string
}

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm your AI assistant powered by DeepSeek. I can analyze air quality data, provide health recommendations, and answer questions about environmental conditions in your city. What would you like to know?",
      timestamp: new Date(),
      type: 'question'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickQuestions = [
    "What's the current air quality like?",
    "Should I exercise outdoors today?",
    "Which cities have the best air quality?",
    "What are the main pollution sources?",
    "Give me health recommendations"
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          conversationHistory: messages.slice(-5) // Send last 5 messages for context
        }),
      })

      const data: AIResponse = await response.json()
      
      if (data.success && data.response) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          type: text.toLowerCase().includes('recommend') || text.toLowerCase().includes('health') ? 'insight' : 'analysis'
        }

        setTimeout(() => {
          setIsTyping(false)
          setMessages(prev => [...prev, assistantMessage])
        }, 1000)

      } else {
        throw new Error(data.error || 'Failed to get AI response')
      }
    } catch (error) {
      setIsTyping(false)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again or check if the AI service is properly configured.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getMessageIcon = (message: ChatMessage) => {
    if (message.role === 'user') return <User className="w-4 h-4" />
    
    switch (message.type) {
      case 'insight':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />
      case 'analysis':
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      default:
        return <Bot className="w-4 h-4 text-green-500" />
    }
  }

  const getMessageStyle = (message: ChatMessage) => {
    if (message.role === 'user') {
      return "bg-blue-500 text-white ml-12"
    }
    
    switch (message.type) {
      case 'insight':
        return "bg-yellow-50 border-yellow-200"
      case 'analysis':
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Environmental Assistant
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Powered by DeepSeek
          </Badge>
        </CardTitle>
        <CardDescription className="text-green-100">
          Real-time air quality analysis and personalized health recommendations
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 border ${getMessageStyle(message)}`}>
                  <div className="flex items-start gap-2">
                    {getMessageIcon(message)}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-green-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSend(question)}
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about air quality, health recommendations, or environmental data..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <Alert className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Powered by DeepSeek AI • Responses based on real-time air quality data
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
} 