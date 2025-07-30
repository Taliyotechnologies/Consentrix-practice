"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "About & Services",
    href: "#",
    dropdown: [
      { name: "About Us", href: "/about" },
      { name: "About Concentrix", href: "/about-concentrix" },
      { name: "Our Services", href: "/services" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  { name: "Practice Tests", href: "/dashboard" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
        setMobileDropdownOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isActiveDropdown = (dropdown: any[]) => {
    return dropdown.some((item) => pathname === item.href)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen)
  }

  const closeMobileMenu = () => {
    setIsOpen(false)
    setMobileDropdownOpen(false)
  }

  return (
    <header
      className={`${isScrolled ? "navbar-sticky shadow-md" : "bg-white"} transition-all duration-300 relative z-50`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 z-50">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div className="font-bold text-xl text-gray-900">Concentrix Practice</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8 ml-auto">
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={toggleDropdown}
                        className={`font-medium transition-colors duration-200 flex items-center cursor-pointer py-2 px-1 rounded-md hover:bg-gray-50 ${
                          isActiveDropdown(item.dropdown) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Desktop Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 transition-all duration-200 origin-top ${
                          dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                        }`}
                        style={{ zIndex: 9999 }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={closeDropdown}
                            className={`block px-4 py-3 text-sm transition-all duration-150 hover:bg-blue-50 hover:text-blue-600 border-l-3 border-transparent hover:border-blue-500 ${
                              pathname === dropdownItem.href
                                ? "text-blue-600 bg-blue-50 border-blue-500"
                                : "text-gray-700"
                            }`}
                          >
                            <div className="flex items-center">
                              <span>{dropdownItem.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-200 py-2 px-1 rounded-md hover:bg-gray-50 ${
                        pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex">
              <Link href="/dashboard" className="btn-primary">
                Start Practice Test
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ml-4 z-50 relative"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile & Tablet Navigation */}
        <div
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMobileMenu}
        >
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900">Taliyo Technologies</div>
                  <div className="text-xs text-blue-600 font-medium">Concentrix Practice</div>
                </div>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="p-6 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={toggleMobileDropdown}
                        className={`flex items-center justify-between w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                          isActiveDropdown(item.dropdown)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown Items */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-4 space-y-1 py-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={closeMobileMenu}
                              className={`block font-medium py-3 px-4 rounded-lg transition-all duration-200 border-l-3 border-transparent ${
                                pathname === dropdownItem.href
                                  ? "text-blue-600 bg-blue-50 border-blue-500"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`block font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Button */}
              <div className="pt-4 mt-6 border-t border-gray-100">
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="btn-primary w-full text-center block py-4 text-lg font-semibold"
                >
                  Start Practice Test
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-6 mt-auto border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">© 2024 Taliyo Technologies</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
