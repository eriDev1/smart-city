// System Enumerations for Smart City Big Data System
// Provides type-safe constants for various system components

export enum DeviceType {
  AIR_QUALITY_MONITOR = "AIR_QUALITY_MONITOR",
  WEATHER_STATION = "WEATHER_STATION",
  NOISE_MONITOR = "NOISE_MONITOR"
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
  HEALTH_RECOMMENDATION = "HEALTH_RECOMMENDATION",
  ANOMALY_DETECTION = "ANOMALY_DETECTION",
  GLOBAL_AIR_QUALITY_ALERT = "GLOBAL_AIR_QUALITY_ALERT",
  CITY_AIR_QUALITY_ALERT = "CITY_AIR_QUALITY_ALERT"
}

export enum SystemEventType {
  DEVICE_ONLINE = "DEVICE_ONLINE",
  DEVICE_OFFLINE = "DEVICE_OFFLINE",
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

export enum ServiceType {
  AIR_QUALITY = "AIR_QUALITY"
}

export enum ProcessingPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum BigDataOperation {
  PROCESS = "PROCESS",
  ANALYZE = "ANALYZE",
  STREAM = "STREAM",
  CACHE = "CACHE"
}

export class EnumHelper {
  static getDeviceTypeDisplayName(type: DeviceType): string {
    const displayNames: Record<DeviceType, string> = {
      [DeviceType.AIR_QUALITY_MONITOR]: "Air Quality Monitor",
      [DeviceType.WEATHER_STATION]: "Weather Station",
      [DeviceType.NOISE_MONITOR]: "Noise Monitor"
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
