import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  CheckCircle2, 
  Download,
  ArrowLeft,
  Activity,
  Target,
  Zap,
  Database,
  Clock,
  Trophy
} from 'lucide-react'

interface AnalysisOutputProps {
  setCurrentPage: (page: string) => void
  analysisData?: any
}

export default function AnalysisOutput({ setCurrentPage, analysisData }: AnalysisOutputProps) {
  // Mock data - this would come from the actual analysis
  const [results] = useState({
    reportGenerated: new Date().toLocaleDateString(),
    dataset: analysisData?.name || 'SPLA Research Data',
    models: ['Decision Tree', 'Logistic Regression', 'Random Forest'],
    overallAccuracy: 0.85,
    dataPoints: 15420,
    processingTime: '2.3s',
    
    methods: [
      {
        id: 'random',
        name: 'Random Sampling',
        efficiency: {
          score: 84,
          processingTime: 120,
          cpuUsage: 65,
          ioOperations: 4200
        },
        accuracy: {
          f1Score: 0.81,
          precision: 0.85,
          recall: 0.78
        },
        scalability: {
          score: 93,
          memoryUsage: [100, 150, 220, 320, 450, 600],
          responseTime: [80, 95, 120, 160, 210, 280]
        },
        summary: 'Fast execution with minimal preprocessing. Linear memory growth makes it highly scalable. However, accuracy may suffer with uneven class distributions.',
        strengths: ['Fastest processing time', 'Minimal memory overhead', 'Simple implementation', 'Excellent scalability'],
        weaknesses: ['Lower accuracy on imbalanced data', 'No guarantee of representativeness', 'May miss rare patterns']
      },
      {
        id: 'stratified',
        name: 'Stratified Sampling',
        efficiency: {
          score: 79,
          processingTime: 185,
          cpuUsage: 78,
          ioOperations: 6800
        },
        accuracy: {
          f1Score: 0.92,
          precision: 0.90,
          recall: 0.95
        },
        scalability: {
          score: 88,
          memoryUsage: [100, 180, 290, 450, 680, 950],
          responseTime: [85, 110, 165, 250, 370, 520]
        },
        summary: 'Preserves class proportions, significantly improving model accuracy and reducing bias. The stratification overhead is acceptable for most use cases.',
        strengths: ['Highest accuracy', 'Balanced class representation', 'Reduced bias', 'Better recall for minority classes'],
        weaknesses: ['Additional preprocessing required', 'Higher memory usage', 'Slower than random sampling']
      },
      {
        id: 'cluster',
        name: 'Cluster Sampling',
        efficiency: {
          score: 90,
          processingTime: 95,
          cpuUsage: 58,
          ioOperations: 3400
        },
        accuracy: {
          f1Score: 0.78,
          precision: 0.82,
          recall: 0.75
        },
        scalability: {
          score: 95,
          memoryUsage: [100, 140, 200, 280, 380, 500],
          responseTime: [75, 88, 105, 130, 165, 210]
        },
        summary: 'Processes data in clusters independently, enabling excellent parallel processing. Best scalability on large partitioned datasets, though may miss fine-grained patterns.',
        strengths: ['Best efficiency', 'Excellent scalability', 'Parallel processing capable', 'Low memory pressure'],
        weaknesses: ['Lower accuracy', 'May miss cross-cluster patterns', 'Cluster quality dependent']
      }
    ],
    
    recommendation: {
      efficiency: {
        winner: 'Cluster Sampling',
        score: 90,
        reason: 'Cluster Sampling demonstrates the best efficiency with 90% score. It processes data in independent clusters, reducing I/O overhead by 30% compared to stratified sampling. The clustered approach allows for parallel processing, cutting CPU wait times and enabling faster throughput on large datasets.'
      },
      accuracy: {
        winner: 'Stratified Sampling',
        score: 92,
        reason: 'Stratified Sampling achieves the highest accuracy with 92% F1 score. By preserving class proportions during sampling, it ensures balanced representation of all data segments. This reduces sampling bias by 40% and improves recall for minority classes, making it the most reliable choice for predictive modeling.'
      },
      scalability: {
        winner: 'Cluster Sampling',
        score: 95,
        reason: 'Cluster Sampling excels in scalability with a 95% score. It maintains linear memory growth even with datasets growing 10x in size. The cluster-based architecture distributes load effectively across nodes, minimizing cross-partition communication and enabling horizontal scaling without performance degradation.'
      }
    },
    
    insights: [
      'Stratified sampling achieved highest F1 score (0.92) due to balanced class coverage across all data segments',
      'Cluster sampling showed 20% higher processing speed for datasets exceeding 100GB',
      'Random sampling delivered quickest turnaround but 15% lower precision in minority classes',
      'For production workloads prioritizing accuracy, stratified sampling is recommended despite 30% higher preprocessing overhead',
      'Cluster sampling is optimal for real-time applications where latency is critical',
      'Combined hybrid approach (stratified + cluster) recommended for mixed workloads requiring both accuracy and speed'
    ]
  })

  const bestOverall = () => {
    const scores: { [key: string]: number } = {
      random: (results.methods[0].efficiency.score + results.methods[0].accuracy.f1Score * 100 + results.methods[0].scalability.score) / 3,
      stratified: (results.methods[1].efficiency.score + results.methods[1].accuracy.f1Score * 100 + results.methods[1].scalability.score) / 3,
      cluster: (results.methods[2].efficiency.score + results.methods[2].accuracy.f1Score * 100 + results.methods[2].scalability.score) / 3
    }
    
    const best = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)
    return {
      name: results.methods.find(m => m.id === best[0])?.name,
      score: best[1].toFixed(1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-2 md:gap-4 min-w-0 flex-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentPage('analysis')}
                className="flex-shrink-0 mt-1"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <div className="p-1.5 md:p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Big Data Sampling Analysis</h1>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2 line-clamp-2">
                  Dataset: {results.dataset} • Models: {results.models.join(', ')} • Generated: {results.reportGenerated}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setCurrentPage('analysis')}
              className="bg-green-600 hover:bg-green-700 flex-shrink-0 self-start lg:self-auto"
              size="sm"
            >
              Run New Analysis
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Three Main Metric Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Efficiency Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal-600" />
                <CardTitle>Efficiency</CardTitle>
              </div>
              <CardDescription>Influence on Processing Time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bar Chart Comparison */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600">Processing Time Comparison</p>
                {results.methods.map((method) => (
                  <div key={method.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700">{method.name}</span>
                      <Badge variant="outline" className="text-xs">{method.efficiency.processingTime}s</Badge>
                    </div>
                    <div className="h-8 rounded-lg bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-lg transition-all ${
                          method.id === 'cluster' ? 'bg-teal-500' : 
                          method.id === 'random' ? 'bg-teal-400' : 'bg-teal-300'
                        }`}
                        style={{ width: `${method.efficiency.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Line Chart Simulation */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">Dataset Size (GB)</p>
                <div className="h-32 bg-gradient-to-t from-teal-50 to-transparent rounded-lg border border-teal-100 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="300" y2="30" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="0" y1="60" x2="300" y2="60" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="0" y1="90" x2="300" y2="90" stroke="#E5E7EB" strokeWidth="1" />
                    
                    {/* Cluster Sampling - Best */}
                    <polyline
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="2"
                      points="0,100 50,95 100,88 150,80 200,70 250,58 300,45"
                    />
                    
                    {/* Random Sampling */}
                    <polyline
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      points="0,95 50,90 100,82 150,72 200,60 250,45 300,28"
                    />
                    
                    {/* Stratified Sampling */}
                    <polyline
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      points="0,90 50,82 100,72 150,60 200,45 250,28 300,10"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>10GB</span>
                  <span>50GB</span>
                  <span>100GB</span>
                </div>
              </div>

              {/* Insight Box */}
              <div className="rounded-lg bg-teal-50 border border-teal-200 p-3">
                <p className="text-xs leading-relaxed text-teal-900">
                  <span className="font-semibold">Cluster Sampling shows 20% higher efficiency</span> for large datasets, processing in independent batches that reduce I/O overhead and enable parallel execution.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                <CardTitle>Accuracy</CardTitle>
              </div>
              <CardDescription>Impact on Model Performance (F1 Score)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Circular Gauge */}
              <div className="flex items-center justify-center">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="8"
                      strokeDasharray={`${results.overallAccuracy * 264} 264`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{results.overallAccuracy}</div>
                      <div className="text-xs text-gray-500">F1 Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Method Accuracy Table */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold text-gray-600 pb-2 border-b">
                  <span>Method</span>
                  <span className="text-right">Precision</span>
                  <span className="text-right">Recall</span>
                </div>
                {results.methods.map((method) => (
                  <div key={method.id} className="grid grid-cols-3 gap-2 text-xs py-1">
                    <span className="text-gray-700 truncate">{method.name.split(' ')[0]}</span>
                    <span className="text-right font-medium">{method.accuracy.precision.toFixed(2)}</span>
                    <span className="text-right font-medium">{method.accuracy.recall.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* F1 Score Bars */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">F1 Score Comparison</p>
                {results.methods.map((method) => (
                  <div key={method.id} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-16 truncate">{method.name.split(' ')[0]}</span>
                    <div className="flex-1 h-6 rounded bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full ${
                          method.id === 'stratified' ? 'bg-green-500' :
                          method.id === 'random' ? 'bg-green-400' : 'bg-green-300'
                        }`}
                        style={{ width: `${method.accuracy.f1Score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-10 text-right">{method.accuracy.f1Score.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Insight Box */}
              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                <p className="text-xs leading-relaxed text-green-900">
                  <span className="font-semibold">Stratified Sampling: Highest Accuracies.</span> Preserves class proportions, achieving 92% F1 score with balanced recall and precision.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scalability Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <CardTitle>Scalability</CardTitle>
              </div>
              <CardDescription>Performance with Growing Data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bar Chart for Scalability Score */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">Scalability Score</p>
                <div className="h-32 flex items-end justify-between gap-3">
                  {results.methods.map((method) => (
                    <div key={method.id} className="flex-1 flex flex-col items-center">
                      <div className="w-full relative">
                        <div
                          className={`w-full rounded-t-lg transition-all ${
                            method.id === 'cluster' ? 'bg-blue-500' :
                            method.id === 'random' ? 'bg-blue-400' : 'bg-blue-300'
                          }`}
                          style={{ height: `${method.scalability.score * 1.2}px` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold">
                            {method.scalability.score}%
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-600 mt-2 text-center leading-tight">
                        {method.name.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Usage Chart */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">Memory Usage (MB)</p>
                <div className="h-24 bg-gradient-to-t from-blue-50 to-transparent rounded-lg border border-blue-100 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 96" preserveAspectRatio="none">
                    {/* Cluster - Linear */}
                    <polyline
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      points="0,70 60,68 120,64 180,58 240,50 300,40"
                    />
                    
                    {/* Random - Slightly steeper */}
                    <polyline
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      points="0,70 60,65 120,58 180,48 240,35 300,20"
                    />
                    
                    {/* Stratified - Steepest */}
                    <polyline
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      points="0,70 60,62 120,50 180,35 240,18 300,5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>100</span>
                  <span>500</span>
                  <span>1000</span>
                </div>
              </div>

              {/* Response Time Chart */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">Response Time (ms)</p>
                <div className="h-24 bg-gradient-to-t from-purple-50 to-transparent rounded-lg border border-purple-100 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 96" preserveAspectRatio="none">
                    {/* Cluster - Best scaling */}
                    <polyline
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      points="0,75 60,73 120,70 180,65 240,58 300,50"
                    />
                    
                    {/* Random */}
                    <polyline
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      points="0,75 60,70 120,63 180,53 240,40 300,25"
                    />
                    
                    {/* Stratified - Worst scaling */}
                    <polyline
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      points="0,75 60,68 120,58 180,45 240,28 300,10"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>50GB</span>
                  <span>250GB</span>
                  <span>500GB</span>
                </div>
              </div>

              {/* Insight Box */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs leading-relaxed text-blue-900">
                  <span className="font-semibold">Random Sampling demonstrates superior scalability</span> with linear memory growth and consistent response times even as data volumes increase 10x.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Method Comparison */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Detailed Method Comparison
            </CardTitle>
            <CardDescription>
              Comprehensive analysis of each sampling method's performance characteristics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.methods.map((method, index) => (
              <div key={method.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-teal-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.summary}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      {method.efficiency.score}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Target className="h-3 w-3 mr-1" />
                      {(method.accuracy.f1Score * 100).toFixed(0)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {method.scalability.score}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-green-700 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {method.strengths.map((strength, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-orange-700 flex items-center gap-1">
                      <Activity className="h-4 w-4" />
                      Weaknesses
                    </h4>
                    <ul className="space-y-1">
                      {method.weaknesses.map((weakness, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Final Recommendations */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Trophy className="h-6 w-6" />
              Final Recommendation & Analysis
            </CardTitle>
            <CardDescription className="text-amber-700">
              Best sampling method for each category with detailed reasoning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Efficiency Winner */}
            <div className="bg-white rounded-lg p-5 border-l-4 border-teal-500">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-5 w-5 text-teal-600" />
                    <h3 className="font-bold text-lg text-gray-900">Best for Efficiency</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                      {results.recommendation.efficiency.winner}
                    </Badge>
                    <span className="text-2xl font-bold text-teal-600">{results.recommendation.efficiency.score}%</span>
                  </div>
                </div>
                <Trophy className="h-8 w-8 text-teal-500" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {results.recommendation.efficiency.reason}
              </p>
            </div>

            {/* Accuracy Winner */}
            <div className="bg-white rounded-lg p-5 border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-lg text-gray-900">Best for Accuracy</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {results.recommendation.accuracy.winner}
                    </Badge>
                    <span className="text-2xl font-bold text-green-600">{results.recommendation.accuracy.score}%</span>
                  </div>
                </div>
                <Trophy className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {results.recommendation.accuracy.reason}
              </p>
            </div>

            {/* Scalability Winner */}
            <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-lg text-gray-900">Best for Scalability</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {results.recommendation.scalability.winner}
                    </Badge>
                    <span className="text-2xl font-bold text-blue-600">{results.recommendation.scalability.score}%</span>
                  </div>
                </div>
                <Trophy className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {results.recommendation.scalability.reason}
              </p>
            </div>

            {/* Overall Best */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-5 border-2 border-amber-300">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="h-6 w-6 text-amber-600" />
                <h3 className="font-bold text-xl text-amber-900">Overall Best Method</h3>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-amber-600 text-white hover:bg-amber-600 text-lg py-2 px-4">
                  {bestOverall().name}
                </Badge>
                <span className="text-3xl font-bold text-amber-600">
                  {bestOverall().score}% Average Score
                </span>
              </div>
              <p className="text-sm text-amber-900 mt-3 leading-relaxed">
                Based on balanced performance across all three categories, <strong>{bestOverall().name}</strong> provides 
                the best overall value for most use cases, balancing efficiency, accuracy, and scalability effectively.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Key Insights & Observations
            </CardTitle>
            <CardDescription>
              Important findings from the analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {results.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{results.dataPoints.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Successfully processed</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{results.processingTime}</div>
              <p className="text-xs text-gray-500 mt-1">Total analysis time</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Models Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{results.models.length}</div>
              <p className="text-xs text-gray-500 mt-1">{results.models[0]}, {results.models[1]}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Overall Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{bestOverall().score}%</div>
              <p className="text-xs text-gray-500 mt-1">Best method average</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Full Report (PDF)
          </Button>
          <Button variant="outline" size="lg" onClick={() => setCurrentPage('analysis')}>
            Run New Analysis
          </Button>
          <Button variant="outline" size="lg" onClick={() => setCurrentPage('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
