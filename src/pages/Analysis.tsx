import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Play,
  Download,
  CheckCircle2,
  Loader2,
  PieChart
} from 'lucide-react'

interface AnalysisProps {
  setCurrentPage: (page: string) => void
}

export default function Analysis({ setCurrentPage }: AnalysisProps) {
  const [analysisName, setAnalysisName] = useState('')
  const [analysisType, setAnalysisType] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleStartAnalysis = () => {
    if (!analysisName || !analysisType || !file) {
      alert('Please fill in all fields and upload a file')
      return
    }

    setAnalyzing(true)
    setProgress(0)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          // Generate mock results matching the dashboard preview
          setResults({
            accuracy: 99.9,
            efficiency: 95,
            scalability: 98,
            dataPoints: 15420,
            processingTime: '2.3s',
            insights: [
              'Strong positive correlation detected in Q1 data',
              'Seasonal patterns identified with 89% confidence',
              'Outliers detected: 3.2% of total data points',
              'Recommended model accuracy: 99.9%',
              'High efficiency achieved with optimized sampling'
            ],
            monthlyPerformance: [
              { month: 'Jan', value: 75 },
              { month: 'Feb', value: 82 },
              { month: 'Mar', value: 88 },
              { month: 'Apr', value: 85 },
              { month: 'May', value: 92 },
              { month: 'Jun', value: 95 },
              { month: 'Jul', value: 98 },
              { month: 'Aug', value: 93 }
            ],
            distribution: [
              { label: 'Random Sampling', value: 30, color: '#2CA01C' },
              { label: 'Stratified Sampling', value: 40, color: '#00A3A3' },
              { label: 'Systematic Sampling', value: 20, color: '#1A2E35' },
              { label: 'Cluster Sampling', value: 10, color: '#E8F5E9' }
            ]
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleReset = () => {
    setAnalysisName('')
    setAnalysisType('')
    setDescription('')
    setFile(null)
    setProgress(0)
    setResults(null)
    setAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Data Analysis</h1>
              <p className="text-gray-600 mt-1">Analyze your data with advanced AI tools</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setCurrentPage('dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis Configuration */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Configure Analysis</CardTitle>
              <CardDescription>Set up your data analysis parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="setup" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                  <TabsTrigger value="data" disabled={!file}>Data Preview</TabsTrigger>
                  <TabsTrigger value="results" disabled={!results}>Results</TabsTrigger>
                </TabsList>

                <TabsContent value="setup" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Analysis Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Sales Data Q1 2026"
                      value={analysisName}
                      onChange={(e) => setAnalysisName(e.target.value)}
                      disabled={analyzing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Analysis Type</Label>
                    <Select value={analysisType} onValueChange={setAnalysisType} disabled={analyzing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select analysis type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="predictive">Predictive Analysis</SelectItem>
                        <SelectItem value="descriptive">Descriptive Statistics</SelectItem>
                        <SelectItem value="diagnostic">Diagnostic Analysis</SelectItem>
                        <SelectItem value="prescriptive">Prescriptive Analysis</SelectItem>
                        <SelectItem value="clustering">Clustering</SelectItem>
                        <SelectItem value="classification">Classification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add notes about this analysis..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={analyzing}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Upload Data File</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <Input
                        id="file"
                        type="file"
                        accept=".csv,.xlsx,.json"
                        onChange={handleFileChange}
                        disabled={analyzing}
                        className="max-w-xs mx-auto"
                      />
                      {file && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg inline-block">
                          <FileText className="inline-block h-4 w-4 mr-2 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">{file.name}</span>
                          <span className="text-sm text-blue-600 ml-2">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Supported formats: CSV, XLSX, JSON</p>
                  </div>

                  {analyzing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Analyzing...</span>
                        <span className="text-gray-600">{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleStartAnalysis} 
                      disabled={analyzing || !analysisName || !analysisType || !file}
                      className="flex-1"
                    >
                      {analyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Analysis
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleReset} disabled={analyzing}>
                      Reset
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="data" className="mt-4">
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Data Preview</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Column 1</th>
                            <th className="text-left p-2">Column 2</th>
                            <th className="text-left p-2">Column 3</th>
                            <th className="text-left p-2">Column 4</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Sample data</td>
                            <td className="p-2">123.45</td>
                            <td className="p-2">Category A</td>
                            <td className="p-2">2026-02-23</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Sample data</td>
                            <td className="p-2">234.56</td>
                            <td className="p-2">Category B</td>
                            <td className="p-2">2026-02-22</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Showing 2 of {file ? '1,000+' : '0'} rows</p>
                  </div>
                </TabsContent>

                <TabsContent value="results" className="mt-4">
                  {results && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <h3 className="font-semibold text-green-900">Analysis Complete!</h3>
                          <p className="text-sm text-green-700">Your data has been successfully analyzed</p>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="bg-white border-0 shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-600">Accuracy</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-green-600">{results.accuracy}%</div>
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>Excellent</span>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-white border-0 shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-600">Efficiency</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-teal-600">{results.efficiency}%</div>
                            <div className="flex items-center gap-1 text-xs text-teal-600 mt-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>High</span>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-white border-0 shadow-md">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-gray-600">Scalability</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-blue-600">{results.scalability}%</div>
                            <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>Optimal</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Charts Section */}
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Monthly Performance Chart */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Monthly Performance</CardTitle>
                            <CardDescription>Performance trend over time</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64 flex items-end justify-around gap-2">
                              {results.monthlyPerformance.map((item: any, index: number) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                  <div 
                                    className="w-full bg-gradient-to-t from-green-600 to-teal-500 rounded-t-lg transition-all duration-1000 hover:opacity-80"
                                    style={{ height: `${item.value}%` }}
                                    title={`${item.month}: ${item.value}%`}
                                  />
                                  <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Method Distribution Pie Chart */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Method Distribution</CardTitle>
                            <CardDescription>Sampling methods breakdown</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64 flex items-center justify-center">
                              <div className="relative w-48 h-48">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E8F5E9" strokeWidth="20" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#2CA01C" strokeWidth="20" 
                                    strokeDasharray="75 251" strokeLinecap="round" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#00A3A3" strokeWidth="20" 
                                    strokeDasharray="100 251" strokeDashoffset="-75" strokeLinecap="round" />
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1A2E35" strokeWidth="20" 
                                    strokeDasharray="50 251" strokeDashoffset="-175" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">4</div>
                                    <div className="text-xs text-gray-500">Methods</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                              {results.distribution.map((item: any, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                  <div>
                                    <div className="text-xs font-medium text-gray-700">{item.label}</div>
                                    <div className="text-xs text-gray-500">{item.value}%</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Additional Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-gray-600">Data Points Analyzed</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{results.dataPoints.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-1">Successfully processed</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-gray-600">Processing Time</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{results.processingTime}</div>
                            <p className="text-xs text-gray-500 mt-1">Lightning fast</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Key Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {results.insights.map((insight: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
                          New Analysis
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Types</CardTitle>
                <CardDescription>Choose the right analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-sm">Predictive</h4>
                      <p className="text-xs text-gray-500">Forecast future trends</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-sm">Descriptive</h4>
                      <p className="text-xs text-gray-500">Understand your data</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-sm">Clustering</h4>
                      <p className="text-xs text-gray-500">Group similar data</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Analyses</span>
                  <Badge variant="secondary">24</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Accuracy</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">94%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Check our documentation for analysis best practices and tutorials.
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
