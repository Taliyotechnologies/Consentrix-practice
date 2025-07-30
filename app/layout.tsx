import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ScrollToTop from "@/components/ScrollToTop"
import { VisitorTracker } from "@/components/VisitorTracker"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Taliyo Technologies - Concentrix Practice",
  description:
    "Professional practice test platform for Concentrix assessment preparation. Master your skills with our comprehensive testing suite designed for customer experience careers.",
  keywords:
    "Concentrix, practice test, assessment, typing test, professional training, Taliyo Technologies, customer experience",
  authors: [{ name: "Taliyo Technologies" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Taliyo Technologies - Concentrix Practice",
    description: "Professional practice test platform for Concentrix assessment preparation",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={inter.className}>
        <ScrollToTop />
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}
