import Link from "next/link"
import { Mail, Facebook, Twitter, Linkedin, Instagram, Clock, MessageSquare, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div>
                  <div className="font-bold text-xl">Taliyo Technologies</div>
                  <div className="text-sm text-blue-400">Concentrix Practice</div>
                </div>
              </Link>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering professionals with comprehensive practice test solutions. Master your Concentrix assessment
                with our advanced testing platform designed for career success in customer experience roles.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/taliyotechnologies" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/taliyotech" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/taliyo-technologies" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/taliyotechnologies" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Practice Tests
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Write Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Information */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Support Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-400" />
                    Email Support
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Professional assistance via email. Send us your questions and we'll respond with detailed assistance
                    and solutions within 24 hours.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-green-400" />
                    Response Time
                  </h4>
                  <p className="text-gray-300 text-sm">
                    We typically respond to all inquiries within 24 hours during business days. For urgent matters,
                    please mention it in your message.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Support */}
            <div>
              <h3 className="font-semibold text-lg mb-6">Additional Support</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-purple-400" />
                    Support Categories
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Technical Issues</li>
                    <li>• Practice Questions</li>
                    <li>• Account Problems</li>
                    <li>• Feature Requests</li>
                    <li>• General Inquiries</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-orange-400" />
                    Website
                  </h4>
                  <a
                    href="https://taliyotechnologies.com"
                    className="text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
                  >
                    taliyotechnologies.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Made by Taliyo Technologies. All rights reserved by Taliyo Technologies.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
