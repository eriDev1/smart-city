// Generated types for Supabase - you'll replace this with generated types
export interface Database {
  public: {
    Tables: {
      devices: {
        Row: {
          id: string
          device_id: string
          device_type: string
          location: string
          status: "ONLINE" | "OFFLINE" | "MAINTENANCE" | "ERROR"
          last_update: string
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          device_type: string
          location: string
          status?: "ONLINE" | "OFFLINE" | "MAINTENANCE" | "ERROR"
          last_update?: string
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          device_type?: string
          location?: string
          status?: "ONLINE" | "OFFLINE" | "MAINTENANCE" | "ERROR"
          last_update?: string
          created_at?: string
        }
      }
      sensor_readings: {
        Row: {
          id: string
          device_id: string
          reading_type: string
          value: number
          unit: string
          timestamp: string
          processed: boolean
          ml_score: number | null
          anomaly_detected: boolean
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          reading_type: string
          value: number
          unit?: string
          timestamp?: string
          processed?: boolean
          ml_score?: number | null
          anomaly_detected?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          reading_type?: string
          value?: number
          unit?: string
          timestamp?: string
          processed?: boolean
          ml_score?: number | null
          anomaly_detected?: boolean
          created_at?: string
        }
      }
      traffic_data: {
        Row: {
          id: string
          device_id: string
          vehicle_count: number
          average_speed: number
          congestion_level: number
          efficiency_score: number | null
          timestamp: string
          processed_at: string | null
          worker_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          vehicle_count?: number
          average_speed?: number
          congestion_level?: number
          efficiency_score?: number | null
          timestamp?: string
          processed_at?: string | null
          worker_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          vehicle_count?: number
          average_speed?: number
          congestion_level?: number
          efficiency_score?: number | null
          timestamp?: string
          processed_at?: string | null
          worker_id?: string | null
          created_at?: string
        }
      }
      energy_consumption: {
        Row: {
          id: string
          device_id: string
          consumption_kwh: number
          efficiency_rating: number
          efficiency_category: "LOW" | "MEDIUM" | "HIGH" | null
          timestamp: string
          processed_at: string | null
          worker_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          consumption_kwh: number
          efficiency_rating?: number
          efficiency_category?: "LOW" | "MEDIUM" | "HIGH" | null
          timestamp?: string
          processed_at?: string | null
          worker_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          consumption_kwh?: number
          efficiency_rating?: number
          efficiency_category?: "LOW" | "MEDIUM" | "HIGH" | null
          timestamp?: string
          processed_at?: string | null
          worker_id?: string | null
          created_at?: string
        }
      }
      service_requests: {
        Row: {
          id: string
          request_id: string
          citizen_id: string
          description: string
          priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
          status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          request_id: string
          citizen_id: string
          description: string
          priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
          status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          request_id?: string
          citizen_id?: string
          description?: string
          priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
          status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
          created_at?: string
          updated_at?: string
        }
      }
      system_events: {
        Row: {
          id: string
          event_type: string
          device_id: string | null
          service_type: string | null
          description: string | null
          severity: "INFO" | "WARNING" | "ERROR" | "CRITICAL"
          event_data: any | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          device_id?: string | null
          service_type?: string | null
          description?: string | null
          severity?: "INFO" | "WARNING" | "ERROR" | "CRITICAL"
          event_data?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          device_id?: string | null
          service_type?: string | null
          description?: string | null
          severity?: "INFO" | "WARNING" | "ERROR" | "CRITICAL"
          event_data?: any | null
          created_at?: string
        }
      }
      processing_batches: {
        Row: {
          id: string
          batch_id: string
          batch_type: string
          record_count: number
          processing_time_ms: number | null
          status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
          error_message: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          batch_id: string
          batch_type: string
          record_count?: number
          processing_time_ms?: number | null
          status?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
          error_message?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          batch_id?: string
          batch_type?: string
          record_count?: number
          processing_time_ms?: number | null
          status?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
          error_message?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      ml_models: {
        Row: {
          id: string
          model_id: string
          model_name: string
          model_type: string
          accuracy: number
          last_trained: string | null
          training_data_count: number
          status: "ACTIVE" | "INACTIVE" | "TRAINING"
          created_at: string
        }
        Insert: {
          id?: string
          model_id: string
          model_name: string
          model_type: string
          accuracy?: number
          last_trained?: string | null
          training_data_count?: number
          status?: "ACTIVE" | "INACTIVE" | "TRAINING"
          created_at?: string
        }
        Update: {
          id?: string
          model_id?: string
          model_name?: string
          model_type?: string
          accuracy?: number
          last_trained?: string | null
          training_data_count?: number
          status?: "ACTIVE" | "INACTIVE" | "TRAINING"
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
