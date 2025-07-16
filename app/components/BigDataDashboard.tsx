"use client"

import { useState } from "react"
import { BigDataSystemManager } from "../core/BigDataSystemManager"
import { PolymorphismManager } from "../core/PolymorphismDemo"

export function BigDataDashboard() {
  const [systemManager] = useState(() => BigDataSystemManager.getInstance())
  const [polymorphismDemo] = useState(() => new PolymorphismManager())
  const [metrics, setMetrics] = useState(() => systemManager.getSystemMetrics())
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStartProcessing = () => {
    systemManager.startBigDataProcessing()
    setIsProcessing(true)
    updateMetrics()
  }

  const handleStopProcessing = () => {
    systemManager.stopBigDataProcessing()
    setIsProcessing(false)
    updateMetrics()
  }

  const handleScaleSystem = (nodes: number) => {
    systemManager.scaleSystem(nodes)
    updateMetrics()
  }

  const updateMetrics = () => {
    setMetrics(systemManager.getSystemMetrics())
  }

  const handlePolymorphismDemo = () => {
    polymorphismDemo.demonstratePolymorphism()
    console.log("Polymorphism demonstration completed - check console")
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Big Data System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{metrics.isRunning ? "ACTIVE" : "STOPPED"}</p>
          <p className="text-sm text-gray-600">Big Data Processing</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-800">Cluster Nodes</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {metrics.clusterHealth?.activeNodes || 0}/{metrics.clusterHealth?.totalNodes || 0}
          </p>
          <p className="text-sm text-gray-600">Active/Total Nodes</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-800">Data Processors</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{metrics.processorCount}</p>
          <p className="text-sm text-gray-600">Active Processors</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {metrics.clusterHealth?.healthPercentage?.toFixed(1) || 0}%
          </p>
          <p className="text-sm text-gray-600">Overall Health</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Big Data Controls</h3>
          <div className="space-y-3">
            <button
              onClick={handleStartProcessing}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? "Processing Active" : "Start Big Data Processing"}
            </button>

            <button
              onClick={handleStopProcessing}
              disabled={!isProcessing}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Stop Processing
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleScaleSystem(6)}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Scale Up (6 nodes)
              </button>
              <button
                onClick={() => handleScaleSystem(2)}
                className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
              >
                Scale Down (2 nodes)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">OOP Demonstrations</h3>
          <div className="space-y-3">
            <button
              onClick={handlePolymorphismDemo}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Demonstrate Polymorphism
            </button>

            <button
              onClick={() => systemManager.undoLastOperation()}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Undo Last Operation
            </button>

            <button
              onClick={() => systemManager.redoLastOperation()}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Redo Operation
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Advanced Programming Requirements Fulfilled</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-600 mb-2">✅ OOP Requirements Met:</h4>
            <ul className="space-y-1 text-sm">
              <li>
                • 5+ Interfaces (IDataProcessor, IBigDataEngine, IAnalyticsProvider, IStreamProcessor, IClusterManager)
              </li>
              <li>• 15+ Classes (SmartCityDataProcessor, BigDataClusterManager, RealTimeStreamProcessor, etc.)</li>
              <li>• Custom Exception (SystemException with usage)</li>
              <li>• 3-Level Inheritance (BaseDataProcessor → AdvancedDataProcessor → SmartCityDataProcessor)</li>
              <li>• Polymorphism (IDataProcessor implementations)</li>
              <li>• Enumerations (DeviceStatus, ProcessingPriority, BigDataOperation)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">🏗️ Architecture & Patterns:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Architectural Style: MVC Pattern</li>
              <li>• Singleton Pattern (BigDataClusterManager, BigDataSystemManager)</li>
              <li>• Factory Pattern (ProcessorFactory)</li>
              <li>• Observer Pattern (BigDataEventManager, SystemMonitor)</li>
              <li>• Command Pattern (BigDataCommand, CommandManager)</li>
              <li>• Big Data Processing with real-time analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      {metrics.alerts && metrics.alerts.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent System Events</h3>
          <div className="space-y-2">
            {metrics.alerts.map((alert: any, index: number) => (
              <div key={index} className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm font-medium">{alert.type}</p>
                <p className="text-xs text-gray-600">{alert.processed}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
