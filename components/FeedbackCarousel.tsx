"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

// Sample feedback data - in real implementation, this would come from your backend/API
const feedbackData = [
  {
    name: "Sarah Johnson",
    role: "Customer Experience Specialist",
    content:
      "This platform helped me ace my Concentrix assessment. The practice tests were incredibly realistic and prepared me perfectly for the actual exam!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Technical Support Representative",
    content:
      "Excellent preparation tool for Concentrix. The typing and dictation tests really improved my skills and confidence.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Service Representative",
    content:
      "User-friendly interface and comprehensive test coverage. This platform is essential for anyone applying to Concentrix!",
    rating: 5,
  },
  {
    name: "David Kumar",
    role: "Customer Support Agent",
    content:
      "The practice tests are very similar to the actual Concentrix assessment. I felt well-prepared and confident during my exam.",
    rating: 4,
  },
  {
    name: "Lisa Wang",
    role: "Technical Support Specialist",
    content:
      "Great platform with realistic test conditions. The audio dictation section particularly helped me improve my listening skills.",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "Customer Care Representative",
    content:
      "Comprehensive practice material and excellent user experience. Highly recommend for anyone preparing for Concentrix.",
    rating: 5,
  },
]

export default function FeedbackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackData.length)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {feedbackData.map((feedback, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="card-hover mx-2">
                <div className="flex items-center mb-4">
                  {[...Array(feedback.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{feedback.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{feedback.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{feedback.name}</div>
                    <div className="text-sm text-gray-600">{feedback.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        aria-label="Previous feedback"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        aria-label="Next feedback"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {feedbackData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to feedback ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">
          {isAutoPlaying ? "Auto-playing" : "Paused"} • {currentIndex + 1} of {feedbackData.length}
        </span>
      </div>
    </div>
  )
}
