"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

interface VisitorData {
  sessionId: string
  timestamp: number
  page: string
  userAgent: string
  referrer: string
  screenResolution: string
  language: string
  timezone: string
  ipAddress?: string
  location?: {
    country?: string
    city?: string
    region?: string
  }
}

export function useVisitorTracking() {
  const pathname = usePathname()
  const hasTrackedSession = useRef(false)
  const lastPage = useRef<string>("")

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const getVisitorData = async (): Promise<VisitorData> => {
    let ipData = null

    try {
      // Get IP and location data
      const ipResponse = await fetch("https://ipapi.co/json/")
      if (ipResponse.ok) {
        ipData = await ipResponse.json()
      }
    } catch (error) {
      console.log("Could not fetch IP data:", error)
    }

    const sessionId = sessionStorage.getItem("visitor_session_id") || generateSessionId()
    sessionStorage.setItem("visitor_session_id", sessionId)

    return {
      sessionId,
      timestamp: Date.now(),
      page: pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ipAddress: ipData?.ip,
      location: {
        country: ipData?.country_name,
        city: ipData?.city,
        region: ipData?.region,
      },
    }
  }

  const sendToTelegram = async (data: VisitorData, isNewSession = false) => {
    const botToken = "8338296061:AAFvlgYqgBU9_05bHgtnQe9Yxf_Q54KP1z4"
    const chatId = "7554058050"

    const flag = data.location?.country ? getCountryFlag(data.location.country) : "🌍"
    const sessionType = isNewSession ? "🆕 NEW VISITOR" : "📄 PAGE VISIT"

    const message = `
${sessionType} - Taliyo Technologies

🆔 Session: ${data.sessionId}
📍 Location: ${flag} ${data.location?.city || "Unknown"}, ${data.location?.country || "Unknown"}
🌐 IP Address: ${data.ipAddress || "Unknown"}
📱 Page: ${data.page}
🕒 Time: ${new Date(data.timestamp).toLocaleString()}

📊 Device Info:
• Screen: ${data.screenResolution}
• Language: ${data.language}
• Timezone: ${data.timezone}
• Referrer: ${data.referrer || "Direct"}

🔗 User Agent: ${data.userAgent.substring(0, 100)}...

#VisitorTracking #TaliyoTechnologies
`

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
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
    } catch (error) {
      console.error("Error sending visitor data to Telegram:", error)
    }
  }

  const getCountryFlag = (country: string): string => {
    const flags: { [key: string]: string } = {
      India: "🇮🇳",
      "United States": "🇺🇸",
      "United Kingdom": "🇬🇧",
      Canada: "🇨🇦",
      Australia: "🇦🇺",
      Germany: "🇩🇪",
      France: "🇫🇷",
      Japan: "🇯🇵",
      China: "🇨🇳",
      Brazil: "🇧🇷",
      Pakistan: "🇵🇰",
      Bangladesh: "🇧🇩",
      Philippines: "🇵🇭",
      Indonesia: "🇮🇩",
      Malaysia: "🇲🇾",
      Singapore: "🇸🇬",
      Thailand: "🇹🇭",
      Vietnam: "🇻🇳",
      "South Korea": "🇰🇷",
      UAE: "🇦🇪",
      "Saudi Arabia": "🇸🇦",
      Egypt: "🇪🇬",
      Nigeria: "🇳🇬",
      "South Africa": "🇿🇦",
      Kenya: "🇰🇪",
      Mexico: "🇲🇽",
      Argentina: "🇦🇷",
      Chile: "🇨🇱",
      Colombia: "🇨🇴",
      Peru: "🇵🇪",
      Russia: "🇷🇺",
      Turkey: "🇹🇷",
      Italy: "🇮🇹",
      Spain: "🇪🇸",
      Netherlands: "🇳🇱",
      Sweden: "🇸🇪",
      Norway: "🇳🇴",
      Denmark: "🇩🇰",
      Finland: "🇫🇮",
      Poland: "🇵🇱",
      "Czech Republic": "🇨🇿",
      Hungary: "🇭🇺",
      Romania: "🇷🇴",
      Bulgaria: "🇧🇬",
      Greece: "🇬🇷",
      Portugal: "🇵🇹",
      Ireland: "🇮🇪",
      Belgium: "🇧🇪",
      Switzerland: "🇨🇭",
      Austria: "🇦🇹",
      Israel: "🇮🇱",
      Iran: "🇮🇷",
      Iraq: "🇮🇶",
      Jordan: "🇯🇴",
      Lebanon: "🇱🇧",
      Syria: "🇸🇾",
      Yemen: "🇾🇪",
      Oman: "🇴🇲",
      Qatar: "🇶🇦",
      Kuwait: "🇰🇼",
      Bahrain: "🇧🇭",
    }
    return flags[country] || "🌍"
  }

  const storeVisitorData = (data: VisitorData) => {
    const existingData = JSON.parse(localStorage.getItem("visitor_analytics") || "[]")
    existingData.push(data)

    // Keep only last 1000 entries to prevent storage overflow
    if (existingData.length > 1000) {
      existingData.splice(0, existingData.length - 1000)
    }

    localStorage.setItem("visitor_analytics", JSON.stringify(existingData))
  }

  useEffect(() => {
    const trackVisit = async () => {
      const data = await getVisitorData()

      // Check if this is a new session
      const isNewSession = !hasTrackedSession.current

      // Track page visit if it's different from last page
      if (lastPage.current !== pathname) {
        await sendToTelegram(data, isNewSession)
        storeVisitorData(data)
        lastPage.current = pathname
        hasTrackedSession.current = true
      }
    }

    // Small delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  // Send daily analytics report
  useEffect(() => {
    const sendDailyReport = async () => {
      const botToken = "8338296061:AAFvlgYqgBU9_05bHgtnQe9Yxf_Q54KP1z4"
      const chatId = "7554058050"

      const analyticsData = JSON.parse(localStorage.getItem("visitor_analytics") || "[]")
      const last24Hours = analyticsData.filter(
        (entry: VisitorData) => Date.now() - entry.timestamp < 24 * 60 * 60 * 1000,
      )

      if (last24Hours.length === 0) return

      // Create text file content
      let fileContent = `TALIYO TECHNOLOGIES - DAILY VISITOR REPORT\n`
      fileContent += `Generated: ${new Date().toLocaleString()}\n`
      fileContent += `Total Visits (24h): ${last24Hours.length}\n\n`

      fileContent += `DETAILED VISITOR LOG:\n`
      fileContent += `${"=".repeat(50)}\n\n`

      last24Hours.forEach((visit: VisitorData, index: number) => {
        fileContent += `${index + 1}. VISIT DETAILS\n`
        fileContent += `Session ID: ${visit.sessionId}\n`
        fileContent += `Timestamp: ${new Date(visit.timestamp).toLocaleString()}\n`
        fileContent += `Page: ${visit.page}\n`
        fileContent += `IP Address: ${visit.ipAddress || "Unknown"}\n`
        fileContent += `Location: ${visit.location?.city || "Unknown"}, ${visit.location?.country || "Unknown"}\n`
        fileContent += `Screen Resolution: ${visit.screenResolution}\n`
        fileContent += `Language: ${visit.language}\n`
        fileContent += `Timezone: ${visit.timezone}\n`
        fileContent += `Referrer: ${visit.referrer || "Direct"}\n`
        fileContent += `User Agent: ${visit.userAgent}\n`
        fileContent += `${"-".repeat(30)}\n\n`
      })

      // Summary statistics
      const uniqueIPs = [...new Set(last24Hours.map((v: VisitorData) => v.ipAddress))].length
      const uniqueCountries = [...new Set(last24Hours.map((v: VisitorData) => v.location?.country))].length
      const pageViews = last24Hours.reduce((acc: { [key: string]: number }, visit: VisitorData) => {
        acc[visit.page] = (acc[visit.page] || 0) + 1
        return acc
      }, {})

      fileContent += `SUMMARY STATISTICS:\n`
      fileContent += `${"=".repeat(30)}\n`
      fileContent += `Total Visits: ${last24Hours.length}\n`
      fileContent += `Unique IPs: ${uniqueIPs}\n`
      fileContent += `Countries: ${uniqueCountries}\n\n`

      fileContent += `PAGE VIEWS:\n`
      Object.entries(pageViews).forEach(([page, count]) => {
        fileContent += `${page}: ${count} visits\n`
      })

      // Send as document
      const blob = new Blob([fileContent], { type: "text/plain" })
      const formData = new FormData()
      formData.append("chat_id", chatId)
      formData.append("document", blob, `visitor_report_${new Date().toISOString().split("T")[0]}.txt`)
      formData.append(
        "caption",
        `📊 Daily Visitor Report - Taliyo Technologies\n📅 ${new Date().toLocaleDateString()}\n📈 ${last24Hours.length} total visits`,
      )

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
          method: "POST",
          body: formData,
        })
      } catch (error) {
        console.error("Error sending daily report:", error)
      }
    }

    // Send report every 24 hours
    const interval = setInterval(sendDailyReport, 24 * 60 * 60 * 1000)

    // Send initial report if it's been more than 24 hours since last report
    const lastReportTime = localStorage.getItem("last_report_time")
    if (!lastReportTime || Date.now() - Number.parseInt(lastReportTime) > 24 * 60 * 60 * 1000) {
      setTimeout(sendDailyReport, 5000) // Send after 5 seconds
      localStorage.setItem("last_report_time", Date.now().toString())
    }

    return () => clearInterval(interval)
  }, [])

  return null
}
