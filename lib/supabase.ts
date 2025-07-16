import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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
