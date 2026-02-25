import { Award, Target, Users, Zap, CheckCircle2, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AboutProps {
  setCurrentPage: (page: string) => void
}

export default function About({ setCurrentPage }: AboutProps) {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process millions of data points in seconds with our advanced algorithms'
    },
    {
      icon: Target,
      title: 'Highly Accurate',
      description: 'Achieve up to 95% accuracy with our AI-powered analysis models'
    },
    {
      icon: Users,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for both beginners and experts'
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description: 'Trusted by thousands of businesses worldwide'
    }
  ]

  const values = [
    { title: 'Innovation', description: 'Pushing boundaries with cutting-edge technology' },
    { title: 'Accuracy', description: 'Delivering precise insights you can trust' },
    { title: 'Simplicity', description: 'Making complex analysis accessible to everyone' },
    { title: 'Support', description: 'Always here to help you succeed' }
  ]

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '1M+', label: 'Analyses Run' },
    { value: '95%', label: 'Avg Accuracy' },
    { value: '24/7', label: 'Support' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-navy">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to make data analysis accessible, accurate, and actionable for everyone.
            Our platform combines advanced AI with intuitive design to deliver insights that drive results.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => setCurrentPage('signup')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentPage('contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-primary-light/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">
              Powerful features that set us apart
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-card">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary-light/30 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-card">
            <h2 className="text-3xl font-bold text-navy mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Founded in 2024, we started with a simple vision: to democratize data analysis
                and make it accessible to businesses of all sizes.
              </p>
              <p>
                What began as a small team of data scientists and engineers has grown into a
                platform trusted by thousands of users worldwide. We've processed millions of
                analyses and helped countless businesses make data-driven decisions.
              </p>
              <p>
                Today, we continue to innovate and improve, constantly pushing the boundaries
                of what's possible with AI and machine learning. Our commitment to accuracy,
                simplicity, and customer success remains at the core of everything we do.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <p className="text-xl font-semibold text-navy">
                Join us on our journey to transform data analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-teal text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users already analyzing their data with us
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setCurrentPage('signup')}
            >
              Create Free Account
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              onClick={() => setCurrentPage('contact')}
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
