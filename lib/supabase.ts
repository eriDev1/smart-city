import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = "https://zhmisoijuhzviasuvkwd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobWlzb2lqdWh6dmlhc3V2a3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTg2NTUsImV4cCI6MjA2ODI3NDY1NX0.cPKo3nAYNKCiEM3heezDZd92xr-7UWwEccrj9rs3jVQ"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Type helpers
export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type Inserts<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type Updates<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]

// Specific table types
export type Device = Tables<"devices">
export type SensorReading = Tables<"sensor_readings">
export type TrafficData = Tables<"traffic_data">
export type EnergyConsumption = Tables<"energy_consumption">
export type ServiceRequest = Tables<"service_requests">
export type SystemEvent = Tables<"system_events">
export type ProcessingBatch = Tables<"processing_batches">
export type MLModel = Tables<"ml_models">
