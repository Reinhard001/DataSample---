import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  FileText, 
  Database,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

interface DashboardProps {
  setCurrentPage: (page: string) => void
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const { user } = useAuth()

  // Sample data
  const recentAnalyses = [
    { id: 1, name: 'Sales Data Q1', date: '2026-02-20', status: 'completed', accuracy: 95 },
    { id: 2, name: 'Customer Behavior', date: '2026-02-18', status: 'completed', accuracy: 88 },
    { id: 3, name: 'Product Performance', date: '2026-02-15', status: 'in-progress', accuracy: 0 },
    { id: 4, name: 'Market Trends', date: '2026-02-12', status: 'completed', accuracy: 92 }
  ]

  const stats = [
    { label: 'Total Analyses', value: '24', icon: BarChart3, change: '+12%', color: 'text-blue-600' },
    { label: 'Avg Accuracy', value: '94%', icon: TrendingUp, change: '+5%', color: 'text-green-600' },
    { label: 'Active Projects', value: '3', icon: Activity, change: '+1', color: 'text-purple-600' },
    { label: 'Data Processed', value: '1.2TB', icon: Database, change: '+340MB', color: 'text-orange-600' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setCurrentPage('analysis')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Start New Analysis
              </Button>
              <Button 
                variant="outline"
                className="text-black border-gray-300 hover:bg-gray-50"
              >
                Learn More
              </Button>
              <Button 
                variant="outline"
                className="text-black border-gray-300 hover:bg-gray-50"
              >
                View Documents
              </Button>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Analyses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>Your latest data analysis projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{analysis.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-500">{analysis.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {analysis.status === 'completed' ? (
                        <>
                          <div className="text-right">
                            <p className="text-sm font-medium">{analysis.accuracy}% accuracy</p>
                            <Progress value={analysis.accuracy} className="w-20 mt-1" />
                          </div>
                          <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="default" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          In Progress
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setCurrentPage('analysis')}
              >
                View All Analyses
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('analysis')}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('analysis')}
              >
                <Database className="mr-2 h-4 w-4" />
                Upload Data
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('analysis')}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Reports
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setCurrentPage('analysis')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Recent activity on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="analyses">Analyses</TabsTrigger>
                <TabsTrigger value="uploads">Uploads</TabsTrigger>
                <TabsTrigger value="learn" className="text-black">Learn</TabsTrigger>
                <TabsTrigger value="documents" className="text-black">View Document</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-4">
                <div className="flex gap-4 p-3 border-l-2 border-blue-600">
                  <div className="text-sm text-gray-500">2 hours ago</div>
                  <div>
                    <p className="font-medium">Completed analysis: Sales Data Q1</p>
                    <p className="text-sm text-gray-600">95% accuracy achieved</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 border-l-2 border-gray-300">
                  <div className="text-sm text-gray-500">5 hours ago</div>
                  <div>
                    <p className="font-medium">Uploaded new dataset</p>
                    <p className="text-sm text-gray-600">customer_data_feb.csv (2.3 MB)</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 border-l-2 border-gray-300">
                  <div className="text-sm text-gray-500">1 day ago</div>
                  <div>
                    <p className="font-medium">Started new analysis</p>
                    <p className="text-sm text-gray-600">Product Performance analysis</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analyses" className="space-y-4 mt-4">
                <div className="flex gap-4 p-3 border-l-2 border-blue-600">
                  <div className="text-sm text-gray-500">2 hours ago</div>
                  <div>
                    <p className="font-medium">Completed analysis: Sales Data Q1</p>
                    <p className="text-sm text-gray-600">95% accuracy achieved</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="uploads" className="space-y-4 mt-4">
                <div className="flex gap-4 p-3 border-l-2 border-gray-300">
                  <div className="text-sm text-gray-500">5 hours ago</div>
                  <div>
                    <p className="font-medium">Uploaded new dataset</p>
                    <p className="text-sm text-gray-600">customer_data_feb.csv (2.3 MB)</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="learn" className="space-y-4 mt-4">
                <div className="flex gap-4 p-3 border-l-2 border-blue-600">
                  <div className="text-sm text-gray-500">3 days ago</div>
                  <div>
                    <p className="font-medium">Data Analysis Best Practices</p>
                    <p className="text-sm text-gray-600">Learn about advanced analysis techniques</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 border-l-2 border-gray-300">
                  <div className="text-sm text-gray-500">1 week ago</div>
                  <div>
                    <p className="font-medium">Getting Started with Analytics</p>
                    <p className="text-sm text-gray-600">Introduction to data analysis tools</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 mt-4">
                <div className="flex gap-4 p-3 border-l-2 border-blue-600">
                  <div className="text-sm text-gray-500">2 days ago</div>
                  <div>
                    <p className="font-medium">Q1 Sales Report</p>
                    <p className="text-sm text-gray-600">Comprehensive analysis document</p>
                  </div>
                </div>
                <div className="flex gap-4 p-3 border-l-2 border-gray-300">
                  <div className="text-sm text-gray-500">1 week ago</div>
                  <div>
                    <p className="font-medium">Customer Insights Summary</p>
                    <p className="text-sm text-gray-600">Key findings and recommendations</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
