import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = "https://zhmisoijuhzviasuvkwd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobWlzb2lqdWh6dmlhc3V2a3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTg2NTUsImV4cCI6MjA2ODI3NDY1NX0.cPKo3nAYNKCiEM3heezDZd92xr-7UWwEccrj9rs3jVQ"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Type helpers
export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]

// Air Quality specific types
export type AirQualityData = Tables<"cached_air_quality">

// Real-time subscription types
export type RealtimeAirQualityPayload = {
  new: AirQualityData
  old: AirQualityData | null
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
}

// Helper function to create real-time channel for air quality updates
export function createAirQualityChannel(channelName: string = 'air-quality-updates') {
  return supabase.channel(channelName)
}
