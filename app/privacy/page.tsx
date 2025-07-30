"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { Mail, Phone, Shield } from "lucide-react"

export default function PrivacyPolicy() {
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
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Have questions about our privacy policy?</h2>
              <p className="text-gray-600">We're here to help and provide clarification.</p>
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

      {/* Policy Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Last Updated: July 30, 2025</h2>
              <p className="text-blue-700">
                This Privacy Policy was last revised on July 30, 2025. We may update this policy from time to time.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us when using our services, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Account registration information (name, email address)</li>
              <li>Test responses and performance data</li>
              <li>Usage statistics and interaction data</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide and improve our services</li>
              <li>Personalize your learning experience</li>
              <li>Analyze usage patterns and performance</li>
              <li>Communicate with you about our services</li>
              <li>Respond to your requests and inquiries</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Encrypted data transmission</li>
              <li>Secure server infrastructure</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data in portable format</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience and analyze usage. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not intended for individuals under the age of 16. We do not knowingly collect information from children.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
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
