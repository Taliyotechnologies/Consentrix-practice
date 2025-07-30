"use client"

import { useState, useEffect } from "react"

interface TestResult {
  id: string
  sectionId: string
  score: number
  duration: number
  completedAt: number
  type: string
}

interface UserStats {
  testsCompleted: number
  averageScore: number
  improvement: number
  timePracticed: number
  testResults: TestResult[]
  createdAt: number
  expiresAt: number
}

const STORAGE_KEY = "concentrix_user_stats"
const EXPIRY_HOURS = 12

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>({
    testsCompleted: 0,
    averageScore: 0,
    improvement: 0,
    timePracticed: 0,
    testResults: [],
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
  })

  // Load stats from localStorage on mount
  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedStats: UserStats = JSON.parse(stored)

        // Check if data has expired
        if (Date.now() > parsedStats.expiresAt) {
          // Data expired, clear it
          localStorage.removeItem(STORAGE_KEY)
          setStats({
            testsCompleted: 0,
            averageScore: 0,
            improvement: 0,
            timePracticed: 0,
            testResults: [],
            createdAt: Date.now(),
            expiresAt: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
          })
        } else {
          // Data is still valid
          setStats(parsedStats)
        }
      }
    } catch (error) {
      console.error("Error loading user stats:", error)
    }
  }

  const saveStats = (newStats: UserStats) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats))
      setStats(newStats)
    } catch (error) {
      console.error("Error saving user stats:", error)
    }
  }

  const addTestResult = (result: Omit<TestResult, "completedAt">) => {
    const newResult: TestResult = {
      ...result,
      completedAt: Date.now(),
    }

    const updatedResults = [...stats.testResults, newResult]

    // Calculate new statistics
    const testsCompleted = updatedResults.length
    const averageScore = updatedResults.reduce((sum, r) => sum + r.score, 0) / testsCompleted
    const timePracticed = updatedResults.reduce((sum, r) => sum + r.duration, 0) / (1000 * 60 * 60) // Convert to hours

    // Calculate improvement (compare last 5 tests with previous 5)
    let improvement = 0
    if (testsCompleted >= 10) {
      const recent5 = updatedResults.slice(-5)
      const previous5 = updatedResults.slice(-10, -5)
      const recentAvg = recent5.reduce((sum, r) => sum + r.score, 0) / 5
      const previousAvg = previous5.reduce((sum, r) => sum + r.score, 0) / 5
      improvement = ((recentAvg - previousAvg) / previousAvg) * 100
    } else if (testsCompleted >= 2) {
      const lastScore = updatedResults[updatedResults.length - 1].score
      const firstScore = updatedResults[0].score
      improvement = ((lastScore - firstScore) / firstScore) * 100
    }

    const newStats: UserStats = {
      ...stats,
      testsCompleted,
      averageScore: Math.round(averageScore),
      improvement: Math.round(improvement),
      timePracticed: Math.round(timePracticed * 10) / 10, // Round to 1 decimal
      testResults: updatedResults,
    }

    saveStats(newStats)
  }

  const clearStats = () => {
    localStorage.removeItem(STORAGE_KEY)
    setStats({
      testsCompleted: 0,
      averageScore: 0,
      improvement: 0,
      timePracticed: 0,
      testResults: [],
      createdAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000,
    })
  }

  const getTimeUntilExpiry = () => {
    const timeLeft = stats.expiresAt - Date.now()
    return Math.max(0, timeLeft)
  }

  const formatTimeUntilExpiry = () => {
    const timeLeft = getTimeUntilExpiry()
    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return {
    stats,
    addTestResult,
    clearStats,
    getTimeUntilExpiry,
    formatTimeUntilExpiry,
    isExpired: getTimeUntilExpiry() === 0,
  }
}
