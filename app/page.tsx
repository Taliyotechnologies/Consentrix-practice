"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import FeedbackCarousel from "@/components/FeedbackCarousel"
import { Clock, CheckCircle, ArrowRight, Star, Target, Zap, Shield, MessageSquare } from "lucide-react"
import { useVisitorTracking } from "@/hooks/useVisitorTracking"

const features = [
  {
    icon: Clock,
    title: "Real-Time Testing",
    description: "Experience authentic exam conditions with precise timing and instant feedback.",
    color: "bg-blue-500",
  },
  {
    icon: Target,
    title: "Comprehensive Coverage",
    description: "5 complete test sections covering all aspects of the Consentrix assessment.",
    color: "bg-green-500",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate scoring and detailed performance analytics after each test.",
    color: "bg-purple-500",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Practice with confidence on our secure, reliable testing environment.",
    color: "bg-orange-500",
  },
]

const stats = [
  { number: "10,000+", label: "Tests Completed" },
  { number: "95%", label: "Success Rate" },
  { number: "24/7", label: "Platform Availability" },
  { number: "5", label: "Test Sections" },
]

export default function HomePage() {
  useVisitorTracking() // Add this line

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 section-padding overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                #1 Concentrix Practice Platform
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Master Your <span className="text-gradient">Concentrix Practice</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Prepare for your Concentrix assessment with confidence using our comprehensive practice test platform.
                Experience real exam conditions, get instant feedback, and boost your success rate for customer
                experience roles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 flex items-center justify-center">
                  <Target className="w-5 h-5 mr-2" />
                  Start Practice Test
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Practice Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {["Typing Test", "Sentence Completion", "Audio Dictation", "Passage Reading", "Email Writing"].map(
                      (test, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{test}</span>
                          </div>
                          <div className="text-sm text-gray-500">Ready</div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-bounce-gentle"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-10 animate-bounce-gentle"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most comprehensive and user-friendly Concentrix practice platform designed for your success
              in customer experience careers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="card-hover text-center group">
                  <div
                    className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Test Sections Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Test Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice all five sections of the Consentrix assessment with realistic timing and scoring.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                {
                  title: "Part A - Typing Test",
                  time: "5 minutes",
                  desc: "Test your typing speed and accuracy with professional content",
                },
                {
                  title: "Part B - Sentence Completion",
                  time: "10 minutes",
                  desc: "Complete sentences with contextually appropriate words",
                },
                {
                  title: "Part C - Audio Dictation",
                  time: "8 minutes",
                  desc: "Listen and transcribe audio content accurately",
                },
                {
                  title: "Part D - Passage Reconstruction",
                  time: "15 minutes",
                  desc: "Reconstruct passages from memory with precision",
                },
                {
                  title: "Part E - Email Writing",
                  time: "12 minutes",
                  desc: "Compose professional emails for business scenarios",
                },
              ].map((section, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{section.title}</h4>
                      <span className="text-sm text-blue-600 font-medium">{section.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{section.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Start?</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Join thousands of successful candidates who have used our platform to ace their Consentrix assessments.
                Start practicing today and boost your confidence.
              </p>
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                Begin Practice Tests
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section with Carousel */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Feedback</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who achieved their goals using our practice platform.
            </p>
          </div>

          <FeedbackCarousel />

          {/* Write a Feedback Button */}
          <div className="text-center mt-12">
            <Link
              href="/feedback"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center bg-green-600 hover:bg-green-700"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Write a Feedback
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Join Concentrix?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start practicing today and join the thousands who have successfully passed their Concentrix assessments and
            built rewarding careers in customer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Start Free Practice
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
