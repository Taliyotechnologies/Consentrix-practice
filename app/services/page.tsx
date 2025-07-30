import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import Link from "next/link"
import {
  Clock,
  Target,
  BarChart3,
  Headphones,
  FileText,
  Mail,
  Keyboard,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react"

const services = [
  {
    icon: Keyboard,
    title: "Typing Speed Assessment",
    description: "Comprehensive typing tests with real-time WPM tracking and accuracy analysis.",
    features: ["Real-time speed tracking", "Accuracy measurement", "Professional content", "Progress analytics"],
    duration: "1 minute",
    color: "bg-blue-500",
  },
  {
    icon: FileText,
    title: "Sentence Completion",
    description: "Advanced grammar and vocabulary tests with contextual sentence completion.",
    features: ["Grammar assessment", "Vocabulary testing", "Context analysis", "Instant feedback"],
    duration: "6-7 minutes",
    color: "bg-green-500",
  },
  {
    icon: Headphones,
    title: "Audio Dictation",
    description: "Professional audio dictation tests to evaluate listening and transcription skills.",
    features: ["High-quality audio", "Various accents", "Speed variations", "Accuracy scoring"],
    duration: "8 minutes",
    color: "bg-purple-500",
  },
  {
    icon: BookOpen,
    title: "Passage Reconstruction",
    description: "Memory and comprehension tests requiring passage reconstruction from recall.",
    features: ["Memory assessment", "Comprehension testing", "Detail retention", "Structured scoring"],
    duration: "2 minutes",
    color: "bg-orange-500",
  },
  {
    icon: Mail,
    title: "Professional Email Writing",
    description: "Business communication assessment through professional email composition.",
    features: ["Business writing", "Professional tone", "Structure analysis", "Communication skills"],
    duration: "12 minutes",
    color: "bg-red-500",
  },
]

const additionalServices = [
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Detailed insights into your test performance with actionable recommendations.",
  },
  {
    icon: Target,
    title: "Personalized Training",
    description: "Customized practice sessions based on your strengths and improvement areas.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Practice anytime, anywhere with our 24/7 available testing platform.",
  },
]



export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white pt-20 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive Concentrix assessment preparation with cutting-edge testing solutions designed to maximize
              your success rate.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Test Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master all five sections of the Concentrix assessment with our specialized practice modules.
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="card-hover">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4 mb-6">
                        <div
                          className={`${service.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center lg:text-right">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        {service.duration}
                      </div>
                      <div>
                        <Link href="/dashboard" className="btn-primary inline-flex items-center">
                          Try Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Additional Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhanced features to accelerate your learning and track your progress effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
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



      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Excel in Your Assessment?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your preparation journey today with our comprehensive practice platform.
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center"
          >
            Begin Practice Tests
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
