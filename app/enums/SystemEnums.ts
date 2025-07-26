// System Enumerations for Smart City Big Data System
// Provides type-safe constants for various system components

export enum DeviceType {
  AIR_QUALITY_MONITOR = "AIR_QUALITY_MONITOR",
  TRAFFIC_COUNTER = "TRAFFIC_COUNTER",
  ENERGY_METER = "ENERGY_METER",
  WEATHER_STATION = "WEATHER_STATION",
  NOISE_MONITOR = "NOISE_MONITOR",
  WATER_QUALITY_SENSOR = "WATER_QUALITY_SENSOR",
  SMART_STREETLIGHT = "SMART_STREETLIGHT",
  PARKING_SENSOR = "PARKING_SENSOR"
}

export enum DeviceStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  MAINTENANCE = "MAINTENANCE",
  ERROR = "ERROR",
  CALIBRATING = "CALIBRATING"
}

export enum DataProcessingStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED"
}

export enum AlertSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum ServiceRequestStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED"
}

export enum ServiceRequestPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY"
}

export enum AirQualityLevel {
  GOOD = "GOOD",
  MODERATE = "MODERATE",
  UNHEALTHY_FOR_SENSITIVE = "UNHEALTHY_FOR_SENSITIVE",
  UNHEALTHY = "UNHEALTHY",
  VERY_UNHEALTHY = "VERY_UNHEALTHY",
  HAZARDOUS = "HAZARDOUS"
}

export enum AnalyticsInsightType {
  TRAFFIC_PREDICTION = "TRAFFIC_PREDICTION",
  HEALTH_RECOMMENDATION = "HEALTH_RECOMMENDATION",
  ENERGY_PREDICTION = "ENERGY_PREDICTION",
  ANOMALY_DETECTION = "ANOMALY_DETECTION",
  GLOBAL_AIR_QUALITY_ALERT = "GLOBAL_AIR_QUALITY_ALERT",
  CITY_AIR_QUALITY_ALERT = "CITY_AIR_QUALITY_ALERT"
}

export enum SystemEventType {
  DEVICE_ONLINE = "DEVICE_ONLINE",
  DEVICE_OFFLINE = "DEVICE_OFFLINE",
  HIGH_TRAFFIC = "HIGH_TRAFFIC",
  POOR_AIR_QUALITY = "POOR_AIR_QUALITY",
  SYSTEM_STARTUP = "SYSTEM_STARTUP",
  SYSTEM_SHUTDOWN = "SYSTEM_SHUTDOWN",
  DATA_ANOMALY = "DATA_ANOMALY",
  API_ERROR = "API_ERROR"
}

export enum DataSourceType {
  AQICN_API = "AQICN_API",
  INTERNAL_SENSOR = "INTERNAL_SENSOR",
  GOVERNMENT_STATION = "GOVERNMENT_STATION",
  EMBASSY_MONITOR = "EMBASSY_MONITOR",
  WEATHER_SERVICE = "WEATHER_SERVICE"
}

// Helper functions for enum usage
export class EnumHelper {
  static getDeviceTypeDisplayName(type: DeviceType): string {
    const displayNames: Record<DeviceType, string> = {
      [DeviceType.AIR_QUALITY_MONITOR]: "Air Quality Monitor",
      [DeviceType.TRAFFIC_COUNTER]: "Traffic Counter",
      [DeviceType.ENERGY_METER]: "Energy Meter",
      [DeviceType.WEATHER_STATION]: "Weather Station",
      [DeviceType.NOISE_MONITOR]: "Noise Monitor",
      [DeviceType.WATER_QUALITY_SENSOR]: "Water Quality Sensor",
      [DeviceType.SMART_STREETLIGHT]: "Smart Streetlight",
      [DeviceType.PARKING_SENSOR]: "Parking Sensor"
    }
    return displayNames[type]
  }

  static getAirQualityColor(level: AirQualityLevel): string {
    const colors: Record<AirQualityLevel, string> = {
      [AirQualityLevel.GOOD]: "green",
      [AirQualityLevel.MODERATE]: "yellow",
      [AirQualityLevel.UNHEALTHY_FOR_SENSITIVE]: "orange",
      [AirQualityLevel.UNHEALTHY]: "red",
      [AirQualityLevel.VERY_UNHEALTHY]: "purple",
      [AirQualityLevel.HAZARDOUS]: "maroon"
    }
    return colors[level]
  }

  static getAlertSeverityIcon(severity: AlertSeverity): string {
    const icons: Record<AlertSeverity, string> = {
      [AlertSeverity.LOW]: "ℹ️",
      [AlertSeverity.MEDIUM]: "⚠️",
      [AlertSeverity.HIGH]: "🚨",
      [AlertSeverity.CRITICAL]: "🔥"
    }
    return icons[severity]
  }
}
