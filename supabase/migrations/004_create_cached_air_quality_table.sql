-- Migration: Add cached_air_quality table for AQICN API data caching
-- This supports the real-time air quality data caching functionality

-- Cached air quality data from AQICN API
CREATE TABLE IF NOT EXISTS cached_air_quality (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_name TEXT NOT NULL,
    aqi INTEGER NOT NULL,
    pm25 DECIMAL(8,2),
    pm10 DECIMAL(8,2),
    no2 DECIMAL(8,2),
    so2 DECIMAL(8,2),
    o3 DECIMAL(8,2),
    co DECIMAL(8,2),
    temperature DECIMAL(5,2),
    humidity INTEGER,
    pressure DECIMAL(7,2),
    wind_speed DECIMAL(5,2),
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    dominant_pollutant TEXT,
    health_level TEXT NOT NULL,
    api_source TEXT DEFAULT 'AQICN',
    timestamp TIMESTAMPTZ NOT NULL,
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_cached_air_quality_city_name 
    ON cached_air_quality(city_name);

CREATE INDEX IF NOT EXISTS idx_cached_air_quality_cached_at 
    ON cached_air_quality(cached_at DESC);

CREATE INDEX IF NOT EXISTS idx_cached_air_quality_aqi 
    ON cached_air_quality(aqi);

CREATE INDEX IF NOT EXISTS idx_cached_air_quality_health_level 
    ON cached_air_quality(health_level);

-- Create a compound index for city and time-based queries
CREATE INDEX IF NOT EXISTS idx_cached_air_quality_city_time 
    ON cached_air_quality(city_name, cached_at DESC);

-- Add Row Level Security (RLS)
ALTER TABLE cached_air_quality ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to cached air quality data" 
    ON cached_air_quality FOR SELECT 
    TO authenticated 
    USING (true);

-- Allow insert for service role (for caching new data)
CREATE POLICY "Allow insert for service role" 
    ON cached_air_quality FOR INSERT 
    TO service_role 
    WITH CHECK (true);

-- Allow delete for cleanup operations (service role only)
CREATE POLICY "Allow delete for cleanup" 
    ON cached_air_quality FOR DELETE 
    TO service_role 
    USING (true); 