"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { Send, CheckCircle, Star, MessageSquare } from "lucide-react"

export default function ReviewPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    rating: 5,
    review: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    })
  }

  const sendReviewToTelegram = async (data: typeof formData) => {
    const botToken = "8338296061:AAFvlgYqgBU9_05bHgtnQe9Yxf_Q54KP1z4"
    const chatId = "7554058050"

    const stars = "⭐".repeat(data.rating)
    const message = `
🌟 NEW REVIEW SUBMISSION - Taliyo Technologies

👤 Name: ${data.name}
📧 Email: ${data.email}
💼 Role: ${data.role}
⭐ Rating: ${stars} (${data.rating}/5)

💬 Review:
"${data.review}"

📅 Time: ${new Date().toLocaleString()}
🌐 Source: Concentrix Practice Test Platform
🔗 Website: taliyotechnologies.com

#Review #Testimonial #ConcentrixPractice
`

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Error sending review to Telegram:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await sendReviewToTelegram(formData)

      if (success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", role: "", rating: 5, review: "" })
      } else {
        alert("Failed to submit review. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 section-padding flex items-center justify-center">
          <div className="card max-w-md w-full text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for your valuable feedback! Your review helps us improve our platform and helps other users make
              informed decisions.
            </p>
            <div className="space-y-3">
              <button onClick={() => setIsSubmitted(false)} className="btn-secondary w-full">
                Submit Another Review
              </button>
              <a href="/" className="btn-primary w-full block">
                Back to Home
              </a>
            </div>
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
      <section className="bg-gradient-to-br from-green-50 to-white pt-20 pb-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Share Your{" "}
              <span className="text-gradient bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Help others by sharing your experience with our Concentrix practice test platform. Your feedback matters!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-custom pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="text-center mb-8">
              <MessageSquare className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h2>
              <p className="text-gray-600">
                Share your experience and help others succeed in their Concentrix assessment preparation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role/Position *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Customer Service Representative, Technical Support Specialist"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-4">
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    className="input-field w-32"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                  <div className="flex items-center">
                    {[...Array(formData.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - formData.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-gray-300" />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Share your experience with our platform. How did it help you prepare for your Concentrix assessment?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Review
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Why Your Review Matters</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Helps other candidates prepare better for their assessments</li>
                <li>• Provides valuable feedback to improve our platform</li>
                <li>• Builds a supportive community of Concentrix aspirants</li>
                <li>• Your success story can inspire others to achieve their goals</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
