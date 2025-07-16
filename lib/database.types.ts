export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      devices: {
        Row: {
          created_at: string | null
          device_id: string
          device_type: string
          id: string
          last_update: string | null
          location: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          device_type: string
          id?: string
          last_update?: string | null
          location: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          device_type?: string
          id?: string
          last_update?: string | null
          location?: string
          status?: string | null
        }
        Relationships: []
      }
      energy_consumption: {
        Row: {
          consumption_kwh: number
          created_at: string | null
          device_id: string
          efficiency_category: string | null
          efficiency_rating: number
          id: string
          processed_at: string | null
          timestamp: string | null
          worker_id: string | null
        }
        Insert: {
          consumption_kwh: number
          created_at?: string | null
          device_id: string
          efficiency_category?: string | null
          efficiency_rating?: number
          id?: string
          processed_at?: string | null
          timestamp?: string | null
          worker_id?: string | null
        }
        Update: {
          consumption_kwh?: number
          created_at?: string | null
          device_id?: string
          efficiency_category?: string | null
          efficiency_rating?: number
          id?: string
          processed_at?: string | null
          timestamp?: string | null
          worker_id?: string | null
        }
        Relationships: []
      }
      ml_models: {
        Row: {
          accuracy: number | null
          created_at: string | null
          id: string
          last_trained: string | null
          model_id: string
          model_name: string
          model_type: string
          status: string | null
          training_data_count: number | null
        }
        Insert: {
          accuracy?: number | null
          created_at?: string | null
          id?: string
          last_trained?: string | null
          model_id: string
          model_name: string
          model_type: string
          status?: string | null
          training_data_count?: number | null
        }
        Update: {
          accuracy?: number | null
          created_at?: string | null
          id?: string
          last_trained?: string | null
          model_id?: string
          model_name?: string
          model_type?: string
          status?: string | null
          training_data_count?: number | null
        }
        Relationships: []
      }
      processing_batches: {
        Row: {
          batch_id: string
          batch_type: string
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          processing_time_ms: number | null
          record_count: number
          status: string | null
        }
        Insert: {
          batch_id: string
          batch_type: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          processing_time_ms?: number | null
          record_count?: number
          status?: string | null
        }
        Update: {
          batch_id?: string
          batch_type?: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          processing_time_ms?: number | null
          record_count?: number
          status?: string | null
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          anomaly_detected: boolean | null
          created_at: string | null
          device_id: string
          id: string
          ml_score: number | null
          processed: boolean | null
          reading_type: string
          timestamp: string | null
          unit: string | null
          value: number
        }
        Insert: {
          anomaly_detected?: boolean | null
          created_at?: string | null
          device_id: string
          id?: string
          ml_score?: number | null
          processed?: boolean | null
          reading_type: string
          timestamp?: string | null
          unit?: string | null
          value: number
        }
        Update: {
          anomaly_detected?: boolean | null
          created_at?: string | null
          device_id?: string
          id?: string
          ml_score?: number | null
          processed?: boolean | null
          reading_type?: string
          timestamp?: string | null
          unit?: string | null
          value?: number
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          citizen_id: string
          created_at: string | null
          description: string
          id: string
          priority: string | null
          request_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          citizen_id: string
          created_at?: string | null
          description: string
          id?: string
          priority?: string | null
          request_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          citizen_id?: string
          created_at?: string | null
          description?: string
          id?: string
          priority?: string | null
          request_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_events: {
        Row: {
          created_at: string | null
          description: string | null
          device_id: string | null
          event_data: Json | null
          event_type: string
          id: string
          service_type: string | null
          severity: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          device_id?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          service_type?: string | null
          severity?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          device_id?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          service_type?: string | null
          severity?: string | null
        }
        Relationships: []
      }
      traffic_data: {
        Row: {
          average_speed: number
          congestion_level: number
          created_at: string | null
          device_id: string
          efficiency_score: number | null
          id: string
          processed_at: string | null
          timestamp: string | null
          vehicle_count: number
          worker_id: string | null
        }
        Insert: {
          average_speed?: number
          congestion_level?: number
          created_at?: string | null
          device_id: string
          efficiency_score?: number | null
          id?: string
          processed_at?: string | null
          timestamp?: string | null
          vehicle_count?: number
          worker_id?: string | null
        }
        Update: {
          average_speed?: number
          congestion_level?: number
          created_at?: string | null
          device_id?: string
          efficiency_score?: number | null
          id?: string
          processed_at?: string | null
          timestamp?: string | null
          vehicle_count?: number
          worker_id?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
