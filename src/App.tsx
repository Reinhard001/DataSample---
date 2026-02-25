import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  PieChart, 
  Activity, 
  Zap, 
  Target, 
  TrendingUp, 
  Database,
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  Play,
  Shield,
  Cpu,
  BarChart,
  Timer,
  FileText,
  Settings,
  Download,
  RefreshCw,
  Sparkles,
  Layers,
  Award,
  LogOut,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import Dashboard from '@/pages/Dashboard'
import Analysis from '@/pages/Analysis'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import './App.css'

// Navigation Component
function Navigation({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const publicNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const protectedNavLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analysis', label: 'Analysis' },
  ]

  const handleProtectedNavigation = (pageId: string) => {
    if (!isAuthenticated) {
      setCurrentPage('signin')
    } else {
      setCurrentPage(pageId)
    }
  }

  const handleLogout = () => {
    logout()
    setCurrentPage('home')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-glow">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-navy">DataSample</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-navy/5 rounded-full p-1">
            {publicNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === link.id
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-navy/70 hover:text-navy hover:bg-navy/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            {protectedNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleProtectedNavigation(link.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === link.id
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-navy/70 hover:text-navy hover:bg-navy/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCurrentPage('dashboard')}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentPage('analysis')}>
                    <Activity className="mr-2 h-4 w-4" />
                    Analysis
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentPage('signin')}
                  className="border-navy/30"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => setCurrentPage('signup')}
                  className="bg-primary hover:bg-primary-dark text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-navy/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 animate-slide-down">
            {publicNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-1 ${
                  currentPage === link.id
                    ? 'bg-primary text-white'
                    : 'text-navy/70 hover:text-navy hover:bg-navy/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            {protectedNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  handleProtectedNavigation(link.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-1 ${
                  currentPage === link.id
                    ? 'bg-primary text-white'
                    : 'text-navy/70 hover:text-navy hover:bg-navy/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {isAuthenticated ? (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 px-4 py-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t space-y-2">
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setCurrentPage('signin')
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                  onClick={() => {
                    setCurrentPage('signup')
                    setMobileMenuOpen(false)
                  }}
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [counters, setCounters] = useState({ accuracy: 0, speed: 0, users: 0 })
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        accuracy: Math.min(prev.accuracy + 1, 99),
        speed: Math.min(prev.speed + 1, 10),
        users: Math.min(prev.users + 1, 50)
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      setCurrentPage('analysis')
    } else {
      setCurrentPage('signin')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Data visualization background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/60" />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1.5 text-sm animate-fade-in">
              <Sparkles className="w-3 h-3 mr-1" />
              Big Data Performance Analysis
            </Badge>
            
            <h1 className="heading-xl text-white animate-slide-up">
              Unlock Big Data{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-teal-light bg-clip-text text-transparent">
                Performance
              </span>
            </h1>
            
            <p className="body-lg text-white/70 max-w-xl animate-slide-up animate-delay-200">
              Analyze sampling extraction methods with precision. Compare accuracy, efficiency, 
              and scalability across different Big Data sampling techniques.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up animate-delay-300">
              <Button 
                size="lg"
                onClick={handleStartAnalysis}
                className="bg-primary hover:bg-primary-dark text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Analysis
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setCurrentPage('about')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Learn More
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-slide-up animate-delay-400">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">{counters.accuracy}%</div>
                <div className="text-sm text-white/60 mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-teal">{counters.speed}x</div>
                <div className="text-sm text-white/60 mt-1">Faster</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">{counters.users}K+</div>
                <div className="text-sm text-white/60 mt-1">Users</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="hidden lg:block relative h-[500px]">
            <div className="absolute top-0 right-0 w-72 glass rounded-2xl p-6 shadow-card animate-float">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Real-time Analysis</div>
                  <div className="text-xs text-muted-foreground">Live metrics</div>
                </div>
              </div>
              <div className="h-24 bg-gradient-to-r from-primary/20 to-teal/20 rounded-lg flex items-end p-3 gap-1">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="absolute top-32 left-0 w-64 glass rounded-2xl p-6 shadow-card animate-float animate-delay-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-navy">Efficiency Score</span>
                <Badge className="bg-teal/20 text-teal">+12%</Badge>
              </div>
              <div className="text-4xl font-bold text-navy mb-2">94.5%</div>
              <Progress value={94.5} className="h-2" />
            </div>

            <div className="absolute bottom-20 right-10 w-56 glass rounded-2xl p-5 shadow-card animate-float animate-delay-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-navy">Analysis Complete</div>
                  <div className="text-xs text-muted-foreground">2.3s elapsed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const features = [
    {
      icon: Database,
      title: 'Big Data Sampling',
      description: 'Advanced sampling extraction methods for massive datasets with optimized performance.',
      color: 'from-primary to-primary-dark'
    },
    {
      icon: BarChart3,
      title: 'Performance Metrics',
      description: 'Comprehensive analysis of accuracy, efficiency, and scalability in real-time.',
      color: 'from-teal to-teal-dark'
    },
    {
      icon: Cpu,
      title: 'Smart Algorithms',
      description: 'AI-powered recommendations for optimal sampling method selection.',
      color: 'from-primary to-teal'
    },
    {
      icon: Shield,
      title: 'Reliable Results',
      description: 'Statistically sound analysis with confidence intervals and error margins.',
      color: 'from-teal-dark to-navy'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-primary/10 text-primary mb-4">About Us</Badge>
          <h2 className="heading-lg text-navy mb-4">What is DataSample Performance Hub?</h2>
          <p className="body-lg">
            DataSample Performance Hub is a comprehensive platform designed to analyze and compare 
            the influence of sampling extraction methods on Big Data performance. Our tools help 
            data scientists and engineers make informed decisions about sampling strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group card-hover border-0 shadow-card overflow-hidden"
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '10M+', label: 'Data Points Analyzed' },
            { value: '50+', label: 'Sampling Methods' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Layers,
      title: 'Scalability Analysis',
      description: 'Evaluate how sampling methods perform as data volume grows from thousands to billions of records.',
      metrics: ['Horizontal Scaling', 'Vertical Scaling', 'Distributed Processing']
    },
    {
      icon: Zap,
      title: 'Efficiency Metrics',
      description: 'Measure processing time, memory usage, and computational resources for each sampling method.',
      metrics: ['Time Complexity', 'Space Complexity', 'Throughput']
    },
    {
      icon: Target,
      title: 'Accuracy Assessment',
      description: 'Compare statistical accuracy and precision of different sampling extraction techniques.',
      metrics: ['Precision', 'Recall', 'F1 Score']
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-primary-light/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-teal/10 text-teal mb-4">Key Features</Badge>
          <h2 className="heading-lg text-navy mb-4">Why Choose DataSample?</h2>
          <p className="body-lg">
            Our platform provides comprehensive tools for analyzing Big Data sampling methods 
            across three critical dimensions: scalability, efficiency, and accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group card-hover border-0 shadow-card perspective-1000"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-glow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-navy/80">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Dashboard Preview Section
function DashboardPreviewSection({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { isAuthenticated } = useAuth()

  const handleViewDashboard = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard')
    } else {
      setCurrentPage('signin')
    }
  }

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/20 text-primary border-primary/30">Dashboard</Badge>
            <h2 className="heading-lg text-white">Real-time Performance Dashboard</h2>
            <p className="body-lg text-white/70">
              Monitor your sampling methods with live metrics and interactive visualizations. 
              Track accuracy, efficiency, and scalability in real-time.
            </p>
            <ul className="space-y-4">
              {[
                'Live performance metrics',
                'Interactive charts and graphs',
                'Historical data comparison',
                'Export reports in multiple formats'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button 
              size="lg"
              onClick={handleViewDashboard}
              className="bg-primary hover:bg-primary-dark text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'View Dashboard'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-teal/30 rounded-3xl blur-2xl" />
            <img 
              src="/dashboard-preview.jpg" 
              alt="Dashboard Preview"
              className="relative rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Data Scientist',
      company: 'TechCorp Inc.',
      content: 'DataSample has revolutionized how we approach Big Data sampling. The detailed analysis of scalability and efficiency metrics has helped us optimize our data pipelines significantly.',
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Data Engineer',
      company: 'DataFlow Systems',
      content: 'The accuracy comparisons between different sampling methods are invaluable. We have reduced our processing time by 40% while maintaining statistical precision.',
      avatar: 'MR'
    },
    {
      name: 'Emily Watson',
      role: 'Analytics Manager',
      company: 'Insight Analytics',
      content: 'Finally, a tool that provides comprehensive performance analysis for Big Data sampling. The dashboard is intuitive and the insights are actionable.',
      avatar: 'EW'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-primary/10 text-primary mb-4">Testimonials</Badge>
          <h2 className="heading-lg text-navy mb-4">What Our Users Say</h2>
          <p className="body-lg">
            Join thousands of data professionals who trust DataSample for their Big Data sampling analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover border-0 shadow-card">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-navy/80 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-primary to-teal">
                    <AvatarFallback className="text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-navy">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-teal/10 text-teal mb-4">Contact Us</Badge>
              <h2 className="heading-lg text-navy mb-4">Get in Touch</h2>
              <p className="body-lg">
                Have questions about DataSample? We would love to hear from you. 
                Send us a message and we will respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'support@datasample.co.ke' },
                { icon: Phone, label: 'Phone', value: '+254 20 123 4567' },
                { icon: MapPin, label: 'Address', value: 'Westlands, Nairobi, Kenya' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-navy">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-4">Follow us</div>
              <div className="flex gap-3">
                {[Github, Twitter, Linkedin].map((Icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Name</label>
                    <Input 
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Email</label>
                    <Input 
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-navy mb-2 block">Message</label>
                    <Textarea 
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-white shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { isAuthenticated } = useAuth()

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      setCurrentPage('analysis')
    } else {
      setCurrentPage('signin')
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="heading-lg text-white mb-6">Ready to Optimize Your Big Data Sampling?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Start analyzing your sampling methods today and discover insights that will transform 
          your data processing workflows.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            onClick={handleStartAnalysis}
            className="bg-white text-primary hover:bg-white/90 shadow-xl"
          >
            <Play className="w-4 h-4 mr-2" />
            {isAuthenticated ? 'Go to Analysis' : 'Start Free Analysis'}
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const footerLinks = {
    Product: ['Features', 'Dashboard', 'Analysis', 'Pricing'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'API Reference', 'Tutorials', 'Support'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies']
  }

  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">DataSample</span>
            </div>
            <p className="text-white/60 mb-6 max-w-sm">
              Advanced Big Data sampling analysis platform. Optimize your data extraction 
              methods with precision and confidence.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => {
                        if (link === 'Dashboard') setCurrentPage('dashboard')
                        else if (link === 'Analysis') setCurrentPage('analysis')
                        else if (link === 'About') setCurrentPage('about')
                      }}
                      className="text-white/60 hover:text-primary transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10" />

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2026 DataSample Performance Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
            <button className="hover:text-primary transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Crosshair icon component
function Crosshair({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  )
}

// Analysis Page
function AnalysisPage() {
  const [activeTab, setActiveTab] = useState('accuracy')

  const comparisonData = [
    { method: 'Random Sampling', accuracy: 87, efficiency: 92, scalability: 85, time: '1.2s' },
    { method: 'Stratified Sampling', accuracy: 95, efficiency: 88, scalability: 78, time: '2.1s' },
    { method: 'Systematic Sampling', accuracy: 89, efficiency: 94, scalability: 90, time: '0.9s' },
    { method: 'Cluster Sampling', accuracy: 82, efficiency: 96, scalability: 95, time: '0.7s' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-lg text-navy mb-2">In-depth Analysis</h1>
          <p className="text-muted-foreground">Compare accuracy, efficiency, and scalability across sampling methods.</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="accuracy" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Accuracy
            </TabsTrigger>
            <TabsTrigger value="efficiency" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Efficiency
            </TabsTrigger>
            <TabsTrigger value="scalability" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Scalability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accuracy" className="space-y-8">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Accuracy Comparison</CardTitle>
                <CardDescription>Statistical accuracy across different sampling methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-navy">{item.method}</span>
                        <span className="text-primary font-semibold">{item.accuracy}%</span>
                      </div>
                      <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-teal rounded-full transition-all duration-1000"
                          style={{ width: `${item.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Best Accuracy', method: 'Stratified Sampling', value: '95%', icon: Award },
                { title: 'Most Consistent', method: 'Systematic Sampling', value: '±2%', icon: CheckCircle2 },
                { title: 'Recommended', method: 'Stratified', value: 'For precision', icon: Sparkles }
              ].map((stat, index) => (
                <Card key={index} className="border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                    <div className="text-lg font-bold text-navy">{stat.method}</div>
                    <div className="text-primary font-semibold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-8">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Processing time and resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead>Processing Time</TableHead>
                      <TableHead>Memory Usage</TableHead>
                      <TableHead>CPU Utilization</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.method}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>{(item.efficiency * 0.8).toFixed(0)} MB</TableCell>
                        <TableCell>{(item.efficiency * 0.6).toFixed(0)}%</TableCell>
                        <TableCell>
                          <Badge className={item.efficiency >= 90 ? 'bg-primary' : 'bg-teal'}>
                            {item.efficiency}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scalability" className="space-y-8">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Scalability Analysis</CardTitle>
                <CardDescription>Performance at different data volumes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { size: '100K records', random: 95, stratified: 90, systematic: 93, cluster: 97 },
                    { size: '1M records', random: 90, stratified: 85, systematic: 91, cluster: 95 },
                    { size: '10M records', random: 85, stratified: 78, systematic: 88, cluster: 94 },
                    { size: '100M records', random: 78, stratified: 68, systematic: 82, cluster: 92 }
                  ].map((row, index) => (
                    <div key={index} className="space-y-2">
                      <div className="font-medium text-navy text-sm">{row.size}</div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { name: 'Random', value: row.random },
                          { name: 'Stratified', value: row.stratified },
                          { name: 'Systematic', value: row.systematic },
                          { name: 'Cluster', value: row.cluster }
                        ].map((method, i) => (
                          <div key={i} className="text-center">
                            <div className="h-20 bg-primary/10 rounded-lg relative overflow-hidden">
                              <div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-teal transition-all duration-500"
                                style={{ height: `${method.value}%` }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-navy">{method.value}%</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{method.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analysis Image */}
        <Card className="mt-8 border-0 shadow-card overflow-hidden">
          <CardContent className="p-0">
            <img 
              src="/analysis-charts.jpg" 
              alt="Analysis Charts"
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Home Page Component
function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="overflow-hidden">
      <HeroSection setCurrentPage={setCurrentPage} />
      <AboutSection />
      <FeaturesSection />
      <DashboardPreviewSection setCurrentPage={setCurrentPage} />
      <TestimonialsSection />
      <CTASection setCurrentPage={setCurrentPage} />
      <ContactSection />
    </div>
  )
}

// Main App
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [redirectTo, setRedirectTo] = useState<string | undefined>(undefined)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Handle protected routes - store redirect location for after login
  const handleSetCurrentPage = (page: string) => {
    setCurrentPage(page)
    if (redirectTo && page !== 'signin' && page !== 'signup') {
      setRedirectTo(undefined)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - only show for non-auth pages */}
      {currentPage !== 'signin' && currentPage !== 'signup' && (
        <Navigation currentPage={currentPage} setCurrentPage={handleSetCurrentPage} />
      )}
      
      <main>
        {currentPage === 'home' && <HomePage setCurrentPage={handleSetCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard setCurrentPage={handleSetCurrentPage} />}
        {currentPage === 'analysis' && <Analysis setCurrentPage={handleSetCurrentPage} />}
        {currentPage === 'about' && <About setCurrentPage={handleSetCurrentPage} />}
        {currentPage === 'contact' && <Contact setCurrentPage={handleSetCurrentPage} />}
        {currentPage === 'signin' && <SignIn setCurrentPage={handleSetCurrentPage} redirectTo={redirectTo} />}
        {currentPage === 'signup' && <SignUp setCurrentPage={handleSetCurrentPage} />}
      </main>

      {/* Footer */}
      {currentPage === 'home' && <Footer setCurrentPage={handleSetCurrentPage} />}
      {currentPage !== 'home' && currentPage !== 'signin' && currentPage !== 'signup' && (
        <footer className="bg-navy text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/60 text-sm">
              © 2026 DataSample Performance Hub. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
