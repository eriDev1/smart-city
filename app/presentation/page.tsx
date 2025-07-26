'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Users, Target, Code, Database, Zap, CheckCircle } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: "Smart City Big Data System",
    subtitle: "Advanced Programming Project - OOP Implementation",
    content: (
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">🏙️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Smart City Big Data System
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Real-Time Air Quality Monitoring & Analytics with Advanced OOP Architecture
        </p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Badge variant="outline" className="p-3">15+ Classes</Badge>
          <Badge variant="outline" className="p-3">5+ Interfaces</Badge>
          <Badge variant="outline" className="p-3">Multiple Design Patterns</Badge>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          Powered by AQICN API • React • TypeScript • Supabase
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Team & Problem Statement",
    subtitle: "Who we are and what we solve",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <strong>Team Lead:</strong> Erind Avdiu, Argjend Ejupi
                </div>
                <div>
                  <strong>Course:</strong> Programimi i Avancuar
                </div>
                <div>
                  <strong>Institution:</strong> UBT University
                </div>
                <div>
                  <strong>Instructor:</strong> Dr.Sc Edmond Jajaga
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Problem Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p><strong>Challenge:</strong> Urban air pollution monitoring lacks real-time insights</p>
                <p><strong>Impact:</strong> Citizens can't make informed health decisions</p>
                <p><strong>Solution:</strong> Real-time big data analytics system</p>
                <p><strong>Benefit:</strong> Proactive health protection & smart city management</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Scope & Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">11,000+</div>
                <div className="text-sm">Monitoring Stations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">162K+</div>
                <div className="text-sm">Daily Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm">Global Cities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Real-time</div>
                <div className="text-sm">Analytics</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 3,
    title: "OOP Architecture Overview",
    subtitle: "Complete implementation of advanced OOP concepts",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Classes & Interfaces (20+ Total)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-blue-600">Core Classes (15+):</div>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>RealTimeAnalytics</li>
                  <li>RealTimeDataConnector</li>
                  <li>BigDataProcessor</li>
                  <li>DataStreamManager</li>
                  <li>SmartCityDataProcessor</li>
                  <li>MachineLearningAnalyzer</li>
                  <li>CityManager</li>
                  <li>TrafficManagementService</li>
                  <li>EnergyManagementService</li>
                  <li>WaterManagementService</li>
                  <li>CitizenService</li>
                  <li>IoTDevices (multiple)</li>
                  <li>SystemException</li>
                  <li>CommandPattern</li>
                  <li>FactoryPattern</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interfaces & Abstracts (5+)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-green-600">Interfaces:</div>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>IDataProcessor</li>
                  <li>IStreamProcessor</li>
                  <li>IBigDataEngine</li>
                  <li>IManagementService</li>
                  <li>IAnalyticsProvider</li>
                  <li>IMonitorable</li>
                  <li>IOptimizable</li>
                  <li>IReportable</li>
                </ul>
                <div className="font-semibold text-purple-600 mt-3">Abstract Classes:</div>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>BaseDataProcessor</li>
                  <li>BigDataEngine</li>
                  <li>IoTDevice</li>
                  <li>ManagementService</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Design Patterns & Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="font-semibold text-orange-600 mb-2">Design Patterns:</div>
                <ul className="text-sm space-y-1">
                  <li>✅ Factory Pattern</li>
                  <li>✅ Observer Pattern</li>
                  <li>✅ Command Pattern</li>
                  <li>✅ Singleton Pattern</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-red-600 mb-2">OOP Principles:</div>
                <ul className="text-sm space-y-1">
                  <li>✅ Inheritance (3+ levels)</li>
                  <li>✅ Polymorphism</li>
                  <li>✅ Encapsulation</li>
                  <li>✅ Abstraction</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-teal-600 mb-2">Architecture:</div>
                <ul className="text-sm space-y-1">
                  <li>✅ Layered Architecture</li>
                  <li>✅ Exception Handling</li>
                  <li>✅ Enumerations</li>
                  <li>✅ Strong Cohesion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 4,
    title: "Big Data Implementation",
    subtitle: "Real-time processing of environmental data",
    content: (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Big Data Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">Volume</div>
                <div className="text-sm">162K+ data points daily</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">Velocity</div>
                <div className="text-sm">Real-time updates</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Variety</div>
                <div className="text-sm">AQI, weather, health</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">Veracity</div>
                <div className="text-sm">Government stations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AQICN API (11,000+ stations)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Government monitoring stations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Embassy air quality sensors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time weather data</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Anomaly detection (2σ threshold)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Predictive health insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Traffic pattern prediction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Energy demand forecasting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Technical Implementation",
    subtitle: "Code fragments and architecture details",
    content: (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Code Fragments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono">
              <div className="mb-2 text-gray-400">// Real-time analytics with caching</div>
              <div>public async getCachedCityData(cityName: string): Promise&lt;ProcessedAirQualityData&gt; {`{`}</div>
              <div className="ml-2">const cached = await supabase.from("cached_air_quality")</div>
              <div className="ml-4">.select("*").eq("city_name", cityName)</div>
              <div className="ml-2">if (!cached || isExpired(cached)) {`{`}</div>
              <div className="ml-4">const fresh = await getAirQualityByCity(cityName)</div>
              <div className="ml-4">await cacheFreshData(fresh)</div>
              <div className="ml-2">{`}`}</div>
              <div>{`}`}</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div><strong>Frontend:</strong> React 19, TypeScript, TailwindCSS</div>
                <div><strong>Backend:</strong> Next.js App Router, Node.js</div>
                <div><strong>Database:</strong> Supabase PostgreSQL</div>
                <div><strong>APIs:</strong> AQICN World Air Quality Index</div>
                <div><strong>State:</strong> TanStack Query, Zustand</div>
                <div><strong>Animations:</strong> Framer Motion</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>📊 <strong>Presentation Layer:</strong> React Components</div>
                <div>🔄 <strong>Service Layer:</strong> Analytics Engine</div>
                <div>💾 <strong>Data Layer:</strong> Supabase + API Cache</div>
                <div>🌐 <strong>External APIs:</strong> AQICN Integration</div>
                <div>⚡ <strong>Real-time:</strong> WebSocket + Polling</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Results & Achievements",
    subtitle: "What we accomplished and learned",
    content: (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">All OOP Requirements</div>
                <div className="text-sm text-gray-600">15+ classes, patterns, inheritance</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">Big Data Processing</div>
                <div className="text-sm text-gray-600">Real-time analytics engine</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Code className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold">Production Ready</div>
                <div className="text-sm text-gray-600">Full TypeScript, testing</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold">Performance</div>
                <div className="text-sm text-gray-600">85% cache hit rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Advantages Over Alternatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>✅ <strong>Real data:</strong> vs simulated/random data</div>
                <div>✅ <strong>Free API:</strong> vs expensive commercial solutions</div>
                <div>✅ <strong>Modern stack:</strong> vs legacy technologies</div>
                <div>✅ <strong>Complete OOP:</strong> vs procedural approaches</div>
                <div>✅ <strong>Scalable:</strong> vs monolithic architectures</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Future Enhancements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>🔮 Machine learning predictions</div>
                <div>📱 Mobile application</div>
                <div>🌍 More data sources integration</div>
                <div>🔔 Smart notifications system</div>
                <div>📈 Advanced visualization</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Repository & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div><strong>GitHub Repository:</strong> github.com/your-username/smart-city-system</div>
              <div><strong>Live Demo:</strong> smart-city-demo.vercel.app</div>
              <div><strong>Documentation:</strong> Complete README with setup instructions</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={prevSlide} 
            variant="outline"
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={nextSlide}
            variant="outline"
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mb-4">
          <Badge variant="outline">
            Slide {currentSlide + 1} of {slides.length}
          </Badge>
        </div>

        {/* Main Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl p-8 min-h-[600px]"
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {slides[currentSlide].content}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Smart City System Project • Advanced Programming • UBT University
        </div>
      </div>
    </div>
  )
} 