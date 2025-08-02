# 🌬️ Smart Air System

**Real-Time Air Quality Intelligence & Environmental Analytics**

A comprehensive air quality monitoring system powered by ACIQN API, Supabase real-time subscriptions, and advanced object-oriented programming architecture.

## 🚀 Features

### Real-Time Air Quality Monitoring
- **ACIQN API Integration**: Live air quality data from 30+ global cities
- **Supabase Real-time**: Instant updates using official Supabase real-time subscriptions
- **Health Risk Assessment**: AI-powered analysis of pollution levels and health impacts
- **Interactive Dashboard**: Modern UI with real-time status indicators

### Technical Excellence
- **32+ Classes**: Comprehensive OOP architecture exceeding university requirements
- **20+ Interfaces**: Clean abstraction and modularity
- **5 Design Patterns**: Factory, Observer, Command, Singleton, and Strategy patterns
- **3-Level Inheritance**: Deep object hierarchy with proper polymorphism
- **9+ Exception Classes**: Robust error handling

### Data Processing
- **Multi-Source Integration**: ACIQN API + Supabase caching layer
- **Real-time Analytics**: Live data processing and anomaly detection
- **Intelligent Caching**: Dual-layer caching with Supabase and memory
- **Air Quality Insights**: PM2.5, PM10, NO₂, O₃, SO₂, CO measurements

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI/UX**: Tailwind CSS, Shadcn/ui, Magic UI components
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Data Source**: ACIQN (Air Quality Index China Network) API
- **State Management**: TanStack React Query
- **Real-time**: Supabase Realtime with Postgres Changes

## 🏗️ Architecture Overview

### Object-Oriented Design
```
BaseDataProcessor (Abstract)
├── BigDataProcessor
├── RealTimeAnalytics
└── SmartCityDataProcessor

IoTDevice (Abstract)
├── AirQualitySensor
├── TemperatureSensor
└── PollutionMonitor

ManagementService (Interface)
├── EnergyManagementService
├── TrafficManagementService
└── WaterManagementService
```

### Design Patterns Implementation
- **Factory Pattern**: Data connector creation for different APIs
- **Observer Pattern**: Real-time air quality update notifications
- **Command Pattern**: Analytics operations and data processing
- **Singleton Pattern**: Global analytics engine instance
- **Strategy Pattern**: Different air quality analysis algorithms

## 🌍 Real-Time Features

### Supabase Integration
- **Live Subscriptions**: Postgres Changes for instant data updates
- **Smart Caching**: Cached air quality data with automatic refresh
- **Real-time Channels**: Custom channels for air quality updates
- **Error Handling**: Comprehensive connection management

### Air Quality Monitoring
- **Global Coverage**: 30+ cities across 19 countries
- **Health Levels**: Good, Moderate, Unhealthy for Sensitive Groups, Unhealthy, Very Unhealthy, Hazardous
- **Pollutant Tracking**: Complete pollutant analysis with dominant pollutant identification
- **Alert System**: Real-time health alerts and recommendations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- ACIQN API access (configured in MultiCityDataConnector)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd smart-air-system

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase URL and keys

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

### Supabase Setup
```sql
-- Run the real-time setup script
\i scripts/setup-realtime.sql

-- Verify real-time is enabled
SELECT * FROM pg_publication_tables WHERE tablename = 'cached_air_quality';
```

## 📊 Dashboard Sections

### 1. Global Monitoring
- Real-time air quality cards for major cities
- Global insights with averages and alerts
- Health level indicators and recommendations

### 2. Real-Time Analytics
- Live data processing dashboard
- System metrics and performance indicators
- AI-generated insights and predictions

### 3. AI Insights
- Big data processing overview
- Statistical analysis and anomaly detection
- Environmental pattern recognition

### 4. Project Presentation
- Technical architecture showcase
- OOP requirements verification
- Academic excellence demonstration

## 🎯 Academic Excellence

This project demonstrates mastery of:
- **Advanced OOP Concepts**: 32+ classes, multiple inheritance levels
- **Design Patterns**: 5 different patterns properly implemented
- **Real-World Integration**: Actual air quality data from ACIQN API
- **Modern Technologies**: Supabase real-time, Next.js 15, TypeScript
- **Production Quality**: Error handling, caching, performance optimization

## 📱 Real-Time Experience

The Smart Air System provides a truly real-time experience:
- **Live Data Updates**: Automatic refresh when new air quality data arrives
- **Connection Status**: Visual indicators for real-time connection health
- **Smart Refresh**: Intelligent cache invalidation and data synchronization
- **Error Recovery**: Automatic reconnection and error handling

## 🏆 Requirements Exceeded

| Requirement | Required | Achieved | Status |
|-------------|----------|----------|---------|
| Classes | 15+ | 32+ | ✅ Exceeded |
| Interfaces | 5+ | 20+ | ✅ Exceeded |
| Design Patterns | 3+ | 5+ | ✅ Exceeded |
| Inheritance Levels | 3+ | 3+ | ✅ Met |
| Exception Classes | 1+ | 9+ | ✅ Exceeded |
| Real Data Integration | Optional | ✅ ACIQN API | ✅ Bonus |
| Real-time Features | Optional | ✅ Supabase | ✅ Bonus |

## 🌟 Key Innovations

1. **Real ACIQN Integration**: Actual air quality data from global network
2. **Supabase Real-time**: Official real-time subscriptions implementation
3. **Smart Caching**: Multi-layer caching strategy for performance
4. **Modern UI/UX**: Beautiful, responsive design with real-time indicators
5. **Comprehensive OOP**: Production-quality object-oriented architecture

---

**Built with ❤️ for advanced Object-Oriented Programming demonstration**

*This Smart Air System showcases real-world application of OOP principles with actual environmental data and modern real-time technologies.*
