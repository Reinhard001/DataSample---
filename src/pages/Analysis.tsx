import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { 
  Upload, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Play,
  Download,
  CheckCircle2,
  Loader2,
  PieChart,
  Sparkles
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
  const [showOutputDialog, setShowOutputDialog] = useState(false)

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
          // Show dialog to view output
          setShowOutputDialog(true)
          // Generate mock results matching the dashboard preview
          setResults({
            accuracy: 92.4,
            efficiency: 88,
            scalability: 94,
            dataPoints: 15420,
            processingTime: '2.3s',
            methodMetrics: [
              {
                id: 'random',
                name: 'Random Sampling',
                efficiency: 84,
                accuracy: 86,
                scalability: 93,
                reason: 'Fast to execute with minimal preprocessing, but accuracy dips on uneven class balance.'
              },
              {
                id: 'stratified',
                name: 'Stratified Sampling',
                efficiency: 79,
                accuracy: 92,
                scalability: 88,
                reason: 'Preserves class proportions, improving accuracy, but adds overhead during stratification.'
              },
              {
                id: 'cluster',
                name: 'Cluster Sampling',
                efficiency: 90,
                accuracy: 81,
                scalability: 95,
                reason: 'Processes clusters independently, scaling well on large data, but can miss fine-grained patterns.'
              }
            ],
            best: {
              efficiency: 'Cluster Sampling',
              accuracy: 'Stratified Sampling',
              scalability: 'Cluster Sampling'
            },
            insights: [
              'Stratified sampling achieved the highest F1 score due to balanced class coverage.',
              'Cluster sampling scaled best on large partitions with low memory pressure.',
              'Random sampling delivered quick turnaround but lower precision in minority classes.',
              'Combined approach recommended for mixed workloads with tight latency constraints.'
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
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex-shrink min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 truncate">Data Analysis</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Analyze your data with advanced AI tools</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setCurrentPage('dashboard')}
              className="flex-shrink-0 self-start sm:self-auto"
              size="sm"
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
                    <Label htmlFor="type">Sampling Extraction Methods</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant={analysisType === 'random' ? 'default' : 'outline'}
                        onClick={() => setAnalysisType('random')}
                        disabled={analyzing}
                        className="h-auto py-3 flex flex-col items-center justify-center"
                      >
                        <span className="text-xl mb-1">1️⃣</span>
                        <span className="text-sm">Random Sampling</span>
                      </Button>
                      <Button 
                        variant={analysisType === 'stratified' ? 'default' : 'outline'}
                        onClick={() => setAnalysisType('stratified')}
                        disabled={analyzing}
                        className="h-auto py-3 flex flex-col items-center justify-center"
                      >
                        <span className="text-xl mb-1">2️⃣</span>
                        <span className="text-sm">Stratified Sampling</span>
                      </Button>
                      <Button 
                        variant={analysisType === 'cluster' ? 'default' : 'outline'}
                        onClick={() => setAnalysisType('cluster')}
                        disabled={analyzing}
                        className="h-auto py-3 flex flex-col items-center justify-center"
                      >
                        <span className="text-xl mb-1">3️⃣</span>
                        <span className="text-sm">Cluster Sampling</span>
                      </Button>
                      <Button 
                        variant={analysisType === 'combined' ? 'default' : 'outline'}
                        onClick={() => setAnalysisType('combined')}
                        disabled={analyzing}
                        className="h-auto py-3 flex flex-col items-center justify-center"
                      >
                        <span className="text-xl mb-1">✨</span>
                        <span className="text-sm">All Combined</span>
                      </Button>
                    </div>
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
                      <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Big Data Sampling Analysis</h3>
                            <p className="text-sm text-gray-600">Results based on the uploaded dataset</p>
                          </div>
                        </div>
                        <Button variant="outline" onClick={handleReset}>
                          Run New Analysis
                        </Button>
                      </div>

                      <div className="grid lg:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-md">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-gray-600">Efficiency</CardTitle>
                            <CardDescription>Influence on processing time</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              {results.methodMetrics.map((method: any) => (
                                <div key={method.id}>
                                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                    <span>{method.name}</span>
                                    <span>{method.efficiency}%</span>
                                  </div>
                                  <div className="h-2 rounded-full bg-gray-100">
                                    <div
                                      className="h-2 rounded-full bg-teal-500"
                                      style={{ width: `${method.efficiency}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="rounded-lg bg-teal-50 border border-teal-100 p-3 text-xs text-teal-900">
                              Most efficient: <span className="font-semibold">{results.best.efficiency}</span>. Clustered batches reduce I/O overhead and allow parallel processing.
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-gray-600">Accuracy</CardTitle>
                            <CardDescription>Model performance (F1 score)</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-center">
                              <div className="relative w-32 h-32">
                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke="#22C55E"
                                    strokeWidth="12"
                                    strokeDasharray={`${results.accuracy * 2.51} 251`}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{results.accuracy}%</div>
                                    <div className="text-xs text-gray-500">F1 score</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {results.methodMetrics.map((method: any) => (
                                <div key={method.id} className="flex items-center justify-between text-xs text-gray-600">
                                  <span>{method.name}</span>
                                  <span>{method.accuracy}%</span>
                                </div>
                              ))}
                            </div>
                            <div className="rounded-lg bg-green-50 border border-green-100 p-3 text-xs text-green-900">
                              Most accurate: <span className="font-semibold">{results.best.accuracy}</span>. Balanced class coverage improves recall and reduces bias.
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-gray-600">Scalability</CardTitle>
                            <CardDescription>Performance with growing data</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="h-24 flex items-end justify-between gap-2">
                              {results.methodMetrics.map((method: any) => (
                                <div key={method.id} className="flex-1 flex flex-col items-center">
                                  <div
                                    className="w-full bg-blue-500/80 rounded-t-md"
                                    style={{ height: `${method.scalability}%` }}
                                  />
                                  <div className="text-[10px] text-gray-600 mt-2 text-center">
                                    {method.name.split(' ')[0]}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-900">
                              Most scalable: <span className="font-semibold">{results.best.scalability}</span>. Clustered partitions distribute load and minimize cross-node traffic.
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Method Comparison</CardTitle>
                          <CardDescription>Efficiency, accuracy, scalability, and reasoning</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {results.methodMetrics.map((method: any) => (
                            <div key={method.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="font-semibold text-gray-900">{method.name}</div>
                                <div className="text-xs text-gray-500">Eff {method.efficiency}% • Acc {method.accuracy}% • Scal {method.scalability}%</div>
                              </div>
                              <p className="text-sm text-gray-600 mt-2">{method.reason}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

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
                            <p className="text-xs text-gray-500 mt-1">Optimized sampling runtime</p>
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

      {/* Analysis Complete Dialog */}
      <AlertDialog open={showOutputDialog} onOpenChange={setShowOutputDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Analysis Complete!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-3">
              <p>
                Your Big Data Sampling Analysis has been successfully completed.
              </p>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center gap-2 text-blue-900">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Comprehensive results are ready to view
                  </span>
                </div>
              </div>
              <p className="text-sm">
                View detailed metrics, comparisons, and recommendations for all sampling methods.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowOutputDialog(false)}
              className="w-full sm:w-auto"
            >
              Stay Here
            </Button>
            <AlertDialogAction
              onClick={() => {
                setShowOutputDialog(false)
                setCurrentPage('analysisoutput')
              }}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              View Output Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
