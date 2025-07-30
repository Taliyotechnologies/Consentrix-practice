"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import StatsCard from "@/components/StatsCard"
import { useUserStats } from "@/hooks/useUserStats"
import {
  Clock,
  Keyboard,
  FileText,
  Headphones,
  BookOpen,
  Mail,
  Play,
  BarChart3,
  Trophy,
  Target,
  TrendingUp,
  Zap,
  Timer,
  RefreshCw,
  Mic,
} from "lucide-react"

const testSections = [
  {
    id: "typing",
    title: "Part A - Typing Test",
    description: "Test your typing speed and accuracy with professional content",
    duration: "1 minute",
    icon: Keyboard,
    color: "bg-blue-500",
    difficulty: "Beginner",
  },
  {
    id: "sentence-completion",
    title: "Part B - Sentence Completion",
    description: "Complete sentences with contextually appropriate words",
    duration: "20 questions",
    icon: FileText,
    color: "bg-green-500",
    difficulty: "Intermediate",
  },
  {
    id: "dictation",
    title: "Part C - Audio Dictation",
    description: "Listen and transcribe audio content accurately",
    duration: "16 questions",
    icon: Headphones,
    color: "bg-purple-500",
    difficulty: "Advanced",
  },
  {
    id: "passage-reconstruction",
    title: "Part D - Passage Reconstruction",
    description: "Reconstruct passages from memory with precision",
    duration: "4 passages",
    icon: BookOpen,
    color: "bg-orange-500",
    difficulty: "Advanced",
  },
  {
    id: "email-writing",
    title: "Part E - Email Writing",
    description: "Compose professional emails for business scenarios",
    duration: "9 minutes",
    icon: Mail,
    color: "bg-red-500",
    difficulty: "Intermediate",
  },
]

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const { stats, clearStats, formatTimeUntilExpiry, isExpired } = useUserStats()

  const filteredSections = testSections.filter((section) => {
    if (selectedFilter === "all") return true
    return section.difficulty.toLowerCase() === selectedFilter
  })

  const statsData = [
    {
      icon: Trophy,
      label: "Tests Completed",
      value: stats.testsCompleted.toString(),
      color: "text-yellow-600",
    },
    {
      icon: Target,
      label: "Average Score",
      value: `${stats.averageScore}%`,
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      label: "Improvement",
      value: `${stats.improvement >= 0 ? "+" : ""}${stats.improvement}%`,
      color: stats.improvement >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      icon: Clock,
      label: "Time Practiced",
      value: `${stats.timePracticed}h`,
      color: "text-purple-600",
    },
  ]

  if (isExpired) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 section-padding flex items-center justify-center">
          <div className="card max-w-md w-full text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Timer className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Expired</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your 12-hour practice session has expired. Start a new session to continue tracking your progress.
            </p>
            <button onClick={() => window.location.reload()} className="btn-primary w-full">
              Start New Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppFloat />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white pt-20 pb-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Practice <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose any test section to start practicing. Track your progress and improve your skills.
            </p>

            {/* Session Info */}
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Live Session - Expires in {formatTimeUntilExpiry()}
            </div>
          </div>

          {/* Test Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Non Voice Versant */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Non Voice Versant</h3>
                <Zap className="w-8 h-8 text-blue-200" />
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Complete written assessment with all 5 sections in sequence. Automatic timing, audio guidance, and
                realistic test conditions.
              </p>
              <div className="flex items-center justify-between">
                <Link
                  href="/test/complete"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Non Voice Test
                </Link>
                <div className="text-right">
                  <div className="text-2xl font-bold">~33 min</div>
                  <div className="text-blue-200 text-sm">Total Duration</div>
                </div>
              </div>
            </div>

            {/* Voice Versant Test */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Voice Versant Test</h3>
                <Mic className="w-8 h-8 text-purple-200" />
              </div>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Complete speaking assessment with 6 sections. Test your pronunciation, fluency, and communication skills
                with voice recording.
              </p>
              <div className="flex items-center justify-between">
                <Link
                  href="/test/voice-versant"
                  className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Voice Test
                </Link>
                <div className="text-right">
                  <div className="text-2xl font-bold">~30 min</div>
                  <div className="text-purple-200 text-sm">Total Duration</div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                isLive={true}
              />
            ))}
          </div>

          {/* Clear Stats Button */}
          {stats.testsCompleted > 0 && (
            <div className="text-center mb-8">
              <button onClick={clearStats} className="btn-secondary text-sm flex items-center mx-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Statistics
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="container-custom pb-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "beginner", "intermediate", "advanced"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
              }`}
            >
              {filter === "all" ? "Individual Tests" : filter}
            </button>
          ))}
        </div>

        {/* Test Sections Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSections.map((section) => {
            const IconComponent = section.icon
            return (
              <div key={section.id} className="card-hover group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${section.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{section.duration}</span>
                      </div>
                      <div
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          section.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : section.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {section.difficulty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>

                {/* Action Button */}
                <Link
                  href={`/test/${section.id}`}
                  className="btn-primary w-full flex items-center justify-center group"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Test
                </Link>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Need Help Getting Started?</h3>
              <p className="text-green-100 mb-6 leading-relaxed">
                Our comprehensive guide will walk you through each test section and provide tips for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-lg transition-colors text-center"
                >
                  View Guide
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-6 py-3 rounded-lg transition-colors text-center"
                >
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="text-center">
              <BarChart3 className="w-24 h-24 text-green-200 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Track Your Progress</h4>
              <p className="text-green-100">
                Monitor your improvement with detailed analytics and performance insights.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
