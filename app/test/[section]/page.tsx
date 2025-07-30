"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Play, Pause, RotateCcw } from "lucide-react"
import { useUserStats } from "@/hooks/useUserStats"

const testData = {
  typing: {
    title: "Typing Test",
    duration: 60, // 1 minute
    content:
      "There are various influencing styles, and many people have a default or preferred one they naturally slip into. However, it's important to adjust the style depending on the situation and the people involved. Choosing the most suitable style for each situation can greatly influence the outcome.",
    type: "typing",
  },
  "sentence-completion": {
    title: "Sentence Completion",
    duration: 400, // 16 questions × 25 seconds
    questions: [
      "The weather today is _____ than yesterday.",
      "She decided to _____ her vacation plans.",
      "The meeting has been _____ to next week.",
    ],
    type: "completion",
  },
  dictation: {
    title: "Dictation Test",
    duration: 480, // 8 minutes
    audioText:
      "Please listen carefully and type exactly what you hear. Good communication skills are essential in any workplace.",
    type: "dictation",
  },
  "passage-reconstruction": {
    title: "Passage Reconstruction",
    duration: 120, // 2 minutes total
    passage:
      "Customer service is the backbone of any successful business. It involves understanding customer needs, providing solutions, and maintaining positive relationships.",
    type: "reconstruction",
  },
  "email-writing": {
    title: "Email Writing",
    duration: 720, // 12 minutes
    prompt: "Write a professional email to a client apologizing for a delayed shipment and explaining the next steps.",
    type: "email",
  },
}

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const { addTestResult } = useUserStats()
  const section = params.section as string
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentTest = testData[section as keyof typeof testData]

  useEffect(() => {
    if (currentTest) {
      setTimeLeft(currentTest.duration)
    }
  }, [currentTest])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false)
            submitTest()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTest = () => {
    setIsActive(true)
    setStartTime(Date.now())
  }

  const pauseTest = () => {
    setIsActive(false)
  }

  const resetTest = () => {
    setIsActive(false)
    setTimeLeft(currentTest?.duration || 0)
    setUserInput("")
    setIsCompleted(false)
    setScore(0)
    setStartTime(0)
  }

  const calculateScore = () => {
    if (!currentTest) return 0

    if (currentTest.type === "typing") {
      const accuracy =
        userInput.length > 0
          ? (userInput.split("").filter((char, i) => char === currentTest.content[i]).length /
              currentTest.content.length) *
            100
          : 0
      return Math.round(accuracy)
    }

    return Math.round(Math.min(100, (userInput.length / 50) * 100)) // Simple scoring
  }

  const submitTest = () => {
    const finalScore = calculateScore()
    const duration = Date.now() - startTime

    setScore(finalScore)
    setIsCompleted(true)
    setIsActive(false)

    // Add result to user stats
    addTestResult({
      id: `${section}-${Date.now()}`,
      sectionId: section,
      score: finalScore,
      duration: duration,
      type: currentTest?.type || "unknown",
    })
  }

  if (!currentTest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
          <Link href="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Completed!</h2>
          <div className="text-6xl font-bold text-blue-600 mb-4">{score}%</div>
          <p className="text-gray-600 mb-6">Great job on completing the {currentTest.title}!</p>
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-green-800 text-sm">✅ Result saved to your live statistics</p>
          </div>
          <div className="space-y-3">
            <button onClick={resetTest} className="btn-secondary w-full">
              Retake Test
            </button>
            <Link href="/dashboard" className="btn-primary w-full block">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{currentTest.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          {/* Test Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            {!isActive && timeLeft === currentTest.duration && (
              <button onClick={startTest} className="btn-primary flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Start Test
              </button>
            )}

            {isActive && (
              <button onClick={pauseTest} className="btn-secondary flex items-center">
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </button>
            )}

            <button onClick={resetTest} className="btn-secondary flex items-center">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>

          {/* Test Content */}
          <div className="space-y-6">
            {currentTest.type === "typing" && (
              <div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-800 leading-relaxed">{currentTest.content}</p>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Start typing here..."
                  className="input-field h-32 resize-none"
                  disabled={!isActive}
                />
              </div>
            )}

            {currentTest.type === "completion" && (
              <div className="space-y-4">
                {currentTest.questions?.map((question, index) => (
                  <div key={index}>
                    <p className="text-gray-800 mb-2">{question}</p>
                    <input type="text" className="input-field" placeholder="Your answer..." disabled={!isActive} />
                  </div>
                ))}
              </div>
            )}

            {currentTest.type === "dictation" && (
              <div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4 text-center">
                  <p className="text-blue-800 mb-4">Click play to listen to the audio</p>
                  <button className="btn-primary">
                    <Play className="w-5 h-5 mr-2" />
                    Play Audio
                  </button>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type what you hear..."
                  className="input-field h-32 resize-none"
                  disabled={!isActive}
                />
              </div>
            )}

            {currentTest.type === "reconstruction" && (
              <div>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <p className="text-yellow-800 mb-2">Study this passage:</p>
                  <p className="text-gray-800">{currentTest.passage}</p>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Reconstruct the passage from memory..."
                  className="input-field h-32 resize-none"
                  disabled={!isActive}
                />
              </div>
            )}

            {currentTest.type === "email" && (
              <div>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-green-800 mb-2">Email Prompt:</p>
                  <p className="text-gray-800">{currentTest.prompt}</p>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="Subject line..." className="input-field" disabled={!isActive} />
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Write your email here..."
                    className="input-field h-40 resize-none"
                    disabled={!isActive}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            {isActive && (
              <div className="text-center">
                <button onClick={submitTest} className="btn-primary">
                  Submit Test
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
