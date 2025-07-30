"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { Mail, Phone, FileText } from "lucide-react"

export default function TermsOfService() {
  const contactEmail = "contact@taliyotechnologies.com"
  const contactWhatsApp = "+91 7042523611"

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppFloat />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white pt-20 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using our services. By accessing or using our platform, you agree to be bound by these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions about our terms?</h2>
              <p className="text-gray-600">Contact us for clarification or additional information.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`mailto:${contactEmail}`} 
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a 
                href={`https://wa.me/${contactWhatsApp.replace(/\D/g, '')}`} 
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Effective Date: July 30, 2025</h2>
              <p className="text-blue-700">
                These Terms of Service govern your access to and use of our services. Please read them carefully.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. Description of Services</h2>
            <p className="text-gray-700 mb-4">
              We provide online practice tests and educational resources designed to help users prepare for employment assessments. Our services include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Practice tests for various assessment sections</li>
              <li>Performance analytics and feedback</li>
              <li>Educational content and resources</li>
              <li>User account management</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to interfere with our systems or networks</li>
              <li>Not share your account with others</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content, features, and functionality of our services are owned by us or our licensors and are protected by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Reverse engineer our software or systems</li>
              <li>Use our trademarks without authorization</li>
              <li>Create derivative works based on our services</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Account Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your account at any time for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Violation of these terms</li>
              <li>Abusive or fraudulent behavior</li>
              <li>Non-payment of fees (if applicable)</li>
              <li>Inactivity for extended periods</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              Our services are provided "as is" without warranties of any kind. We do not guarantee that our services will be uninterrupted, error-free, or completely secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of significant changes through our platform or via email.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <span className="font-medium text-gray-900">Email:</span>
                <a href={`mailto:${contactEmail}`} className="ml-2 text-blue-600 hover:underline">{contactEmail}</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <span className="font-medium text-gray-900">WhatsApp:</span>
                <a href={`https://wa.me/${contactWhatsApp.replace(/\D/g, '')}`} className="ml-2 text-blue-600 hover:underline">{contactWhatsApp}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
