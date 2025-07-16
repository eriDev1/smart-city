import { BigDataDashboard } from "./components/BigDataDashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Smart City Control Center</h1>
          <p className="text-blue-100 mt-1">Real-time monitoring and management system</p>
        </div>
      </header>
      <BigDataDashboard />
    </div>
  )
}
