-- SQL Script to create database tables for the Smart City System
-- This demonstrates database integration and data persistence

CREATE DATABASE IF NOT EXISTS smart_city_db;
USE smart_city_db;

-- Table for IoT Devices
CREATE TABLE IF NOT EXISTS devices (
    id VARCHAR(50) PRIMARY KEY,
    device_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('ONLINE', 'OFFLINE', 'MAINTENANCE', 'ERROR') DEFAULT 'OFFLINE',
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Service Requests
CREATE TABLE IF NOT EXISTS service_requests (
    id VARCHAR(50) PRIMARY KEY,
    citizen_id VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for System Events
CREATE TABLE IF NOT EXISTS system_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    device_id VARCHAR(50),
    service_type VARCHAR(50),
    description TEXT,
    severity ENUM('INFO', 'WARNING', 'ERROR', 'CRITICAL') DEFAULT 'INFO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE SET NULL
);

-- Table for Energy Consumption
CREATE TABLE IF NOT EXISTS energy_consumption (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL,
    consumption_kwh DECIMAL(10,2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO devices (id, device_type, location, status) VALUES
('TL001', 'TrafficLightController', 'Main St & 1st Ave', 'ONLINE'),
('TL002', 'TrafficLightController', 'Oak St & 2nd Ave', 'ONLINE'),
('SL001', 'SmartStreetLight', 'Park Avenue', 'ONLINE'),
('SL002', 'SmartStreetLight', 'Downtown Plaza', 'ONLINE'),
('WS001', 'WaterQualitySensor', 'Central Reservoir', 'ONLINE'),
('WS002', 'WaterQualitySensor', 'North Treatment Plant', 'ONLINE');

INSERT INTO service_requests (id, citizen_id, description, priority, status) VALUES
('REQ001', 'CIT001', 'Street light not working on Oak Street', 'HIGH', 'IN_PROGRESS'),
('REQ002', 'CIT002', 'Traffic light timing issue at Main & 1st', 'MEDIUM', 'PENDING'),
('REQ003', 'CIT003', 'Water quality concern in North district', 'HIGH', 'COMPLETED');

INSERT INTO system_events (event_type, device_id, description, severity) VALUES
('DEVICE_ONLINE', 'TL001', 'Traffic light controller came online', 'INFO'),
('HIGH_TRAFFIC_DETECTED', 'TL001', 'High traffic density detected', 'WARNING'),
('OPTIMIZATION_STARTED', 'SL001', 'Energy optimization initiated', 'INFO'),
('QUALITY_ALERT', 'WS001', 'Water quality reading below threshold', 'WARNING');
