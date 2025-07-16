import { BigDataDashboard } from "./components/BigDataDashboard"

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Smart City Big Data Processing System</h1>
          <p className="text-blue-100 mt-2">Advanced Programming Course - University Project</p>
          <div className="flex gap-3 mt-3">
            <span className="bg-blue-500 px-3 py-1 rounded text-sm">Big Data Processing</span>
            <span className="bg-purple-500 px-3 py-1 rounded text-sm">Real-time Analytics</span>
            <span className="bg-green-500 px-3 py-1 rounded text-sm">15+ Classes</span>
            <span className="bg-orange-500 px-3 py-1 rounded text-sm">5+ Interfaces</span>
          </div>
        </div>
      </header>
      <BigDataDashboard />
    </div>
  )
}
