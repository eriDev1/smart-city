'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase, createAirQualityChannel, type AirQualityData } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { aqicnQueryKeys } from '@/app/bigdata/AQICNQueries'

interface UseRealtimeAirQualityOptions {
  enabled?: boolean
  onUpdate?: (data: AirQualityData) => void
  onInsert?: (data: AirQualityData) => void
  onDelete?: (data: AirQualityData) => void
}

export function useRealtimeAirQuality(options: UseRealtimeAirQualityOptions = {}) {
  const { enabled = true } = options
  const [isConnected, setIsConnected] = useState(true) // Default to connected
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(new Date())
  const queryClient = useQueryClient()
  const channelRef = useRef<any>(null)

  // Memoize handlers to prevent useEffect re-runs
  const handleInsert = useCallback((payload: any) => {
    console.log('🆕 New air quality data received:', payload.new)
    setLastUpdate(new Date())
    queryClient.invalidateQueries({ queryKey: aqicnQueryKeys.globalInsights() })
    options.onInsert?.(payload.new as AirQualityData)
  }, [queryClient, options.onInsert])

  const handleUpdate = useCallback((payload: any) => {
    console.log('🔄 Air quality data updated:', payload.new)
    setLastUpdate(new Date())
    
    if (payload.new?.city_name) {
      queryClient.invalidateQueries({ 
        queryKey: aqicnQueryKeys.city(payload.new.city_name) 
      })
    }
    
    queryClient.invalidateQueries({ queryKey: aqicnQueryKeys.globalInsights() })
    options.onUpdate?.(payload.new as AirQualityData)
  }, [queryClient, options.onUpdate])

  const handleDelete = useCallback((payload: any) => {
    console.log('🗑️ Air quality data deleted:', payload.old)
    setLastUpdate(new Date())
    queryClient.invalidateQueries({ queryKey: aqicnQueryKeys.globalInsights() })
    options.onDelete?.(payload.old as AirQualityData)
  }, [queryClient, options.onDelete])

  useEffect(() => {
    if (!enabled) {
      setIsConnected(false)
      setConnectionError(null)
      return
    }

    // Avoid duplicate subscriptions
    if (channelRef.current) {
      return
    }

    // Create the real-time channel
    const channel = createAirQualityChannel('smart-air-realtime')
    channelRef.current = channel

    // Subscribe to events
    channel
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'cached_air_quality',
      }, handleInsert)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'cached_air_quality',
      }, handleUpdate)
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'cached_air_quality',
      }, handleDelete)

    // Subscribe to the channel
    channel.subscribe((status) => {
      console.log('Real-time subscription status:', status)
      if (status === 'SUBSCRIBED') {
        console.log('✅ Real-time air quality subscription active')
        setIsConnected(true)
        setConnectionError(null)
      } else if (status === 'CHANNEL_ERROR') {
        console.error('❌ Real-time subscription error')
        setConnectionError('Connection issues')
      } else if (status === 'TIMED_OUT') {
        console.warn('⏰ Real-time subscription timed out')
        setConnectionError(null)
      } else if (status === 'CLOSED') {
        console.log('📴 Real-time subscription closed')
        setIsConnected(false)
      }
    })

    return () => {
      if (channelRef.current) {
        console.log('🔌 Unsubscribing from real-time air quality updates')
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
      setIsConnected(false)
    }
  }, [enabled, handleInsert, handleUpdate, handleDelete])

  const disconnect = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
      setIsConnected(false)
    }
  }, [])

  return {
    isConnected,
    connectionError,
    lastUpdate,
    disconnect,
  }
}

export function useRealtimeCityAirQuality(cityName: string, enabled = true) {
  return useRealtimeAirQuality({ enabled })
} 