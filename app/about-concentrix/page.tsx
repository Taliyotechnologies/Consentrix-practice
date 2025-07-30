import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { Globe, Users, Award, TrendingUp, Heart, Target, Briefcase } from "lucide-react"

const concentrixFacts = [
  {
    icon: Globe,
    title: "Global Presence",
    description: "Operating in more than 40 countries worldwide",
    stat: "40+",
  },
  {
    icon: Users,
    title: "Industry Leader",
    description: "Serving top brands across various industries",
    stat: "Global",
  },
  {
    icon: Award,
    title: "Quality Focus",
    description: "Delivering high-quality customer experience solutions",
    stat: "Premium",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Strong focus on employee development and growth opportunities",
    stat: "Growth",
  },
]

const industries = [
  { name: "Technology", icon: "💻" },
  { name: "Banking & Finance", icon: "🏦" },
  { name: "Healthcare", icon: "🏥" },
  { name: "E-commerce", icon: "🛒" },
  { name: "Telecommunications", icon: "📱" },
  { name: "Retail", icon: "🏪" },
]

const services = [
  {
    icon: Heart,
    title: "Customer Support",
    description: "Comprehensive customer service solutions across multiple channels",
  },
  {
    icon: Target,
    title: "Technical Assistance",
    description: "Expert technical support and troubleshooting services",
  },
  {
    icon: TrendingUp,
    title: "Sales Support",
    description: "Professional sales assistance and lead generation services",
  },
  {
    icon: Briefcase,
    title: "Back-Office Operations",
    description: "Efficient back-office support and administrative services",
  },
]

export default function AboutConcentrixPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white pt-20 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">Concentrix</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Concentrix is a global business services company that specializes in customer experience (CX) solutions,
              providing world-class services to top brands across the globe.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {concentrixFacts.map((fact, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{fact.stat}</div>
                  <div className="text-gray-600 text-sm">{fact.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Global Business Services Leader</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Concentrix is a global business services company that specializes in customer experience (CX) solutions.
                The company provides services like customer support, technical assistance, sales, and back-office
                operations to top brands around the world.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Operating in more than 40 countries, Concentrix serves clients across various industries, including
                technology, banking, healthcare, e-commerce, and telecommunications.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Concentrix focuses on delivering high-quality support and building long-term customer relationships. The
                company is known for its professional training, employee growth opportunities, and strong work culture.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Concentrix?</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Concentrix is a great place to start and grow a career in customer service and communication roles. Join
                a company that values professional development and offers excellent growth opportunities.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span className="text-blue-100">Professional Training Programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span className="text-blue-100">Career Growth Opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  <span className="text-blue-100">Strong Work Culture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Concentrix provides comprehensive business services designed to enhance customer experience and drive
              business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="card-hover text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Concentrix serves clients across various industries, providing specialized solutions for each sector.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="card-hover text-center">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="font-semibold text-gray-900">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Start Your Career with Concentrix</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Concentrix believes in empowering employees with professional training, growth opportunities, and a
            supportive work culture. It's an excellent place to start and grow a career in customer service and
            communication roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Practice for Concentrix Assessment
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Get Career Guidance
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
