"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { useUserStats } from "@/hooks/useUserStats"
import { ArrowLeft, Clock, Play, Volume2, VolumeX } from "lucide-react"

// Question pools for randomization
const sentenceCompletionPool = [
  {
    sentence: "It's _____ tonight. Don't forget to bring your sweater.",
    answer: "cold",
  },
  {
    sentence: "_____ the factory opened, air pollution in this town has risen significantly.",
    answer: "Since",
  },
  {
    sentence: "Don't forget to _____ for a receipt when you make your payment.",
    answer: "ask",
  },
  {
    sentence:
      "Some of my favourite childhood memories include fishing and setting up a _____ by the lake with my family.",
    answer: "tent",
  },
  {
    sentence: "You may not _____ with his methods, but there's no denying he brings in a lot of money for the county.",
    answer: "agree",
  },
  {
    sentence:
      "A recent survey indicated that pollution has affected the climate and travel destinations _____ are no popular among online shoppers.",
    answer: "that",
  },
  {
    sentence: "You can _____ your order as soon as you know what you wish to purchase.",
    answer: "place",
  },
  {
    sentence: "I can't _____ what it must be like to perform a task like this all day long.",
    answer: "imagine",
  },
  {
    sentence: "The product is currently out of stock until the next _____ arrives.",
    answer: "shipment",
  },
  {
    sentence: "The event _____ an audience of over 30,000 people.",
    answer: "attracted",
  },
  {
    sentence: "With over _____ of the city council members voted against the new law.",
    answer: "half",
  },
  {
    sentence: "After _____ making a final change to the layout, the newsletter was ready to be sent out.",
    answer: "carefully",
  },
  {
    sentence: "I was surprised when he agreed to make an _____ on the show last night.",
    answer: "appearance",
  },
  {
    sentence: "I needed to take out a _____ from the bank to pay for the roof replacement on my house.",
    answer: "loan",
  },
  {
    sentence: "It's _____ uncertain whether the company will still be in business next year.",
    answer: "quite",
  },
  {
    sentence: "Please check that all envelopes have the correct return _____.",
    answer: "address",
  },
  {
    sentence: "The class had to be _____ indefinitely due to the summer schedule.",
    answer: "cancelled",
  },
  {
    sentence:
      "The broadcasting company is supported by the government, but every television owner pays an annual _____.",
    answer: "fee",
  },
  {
    sentence: "She gets her supplies at a _____ rate because she buys in bulk.",
    answer: "discount",
  },
  {
    sentence: "Employees at our factory must adhere to a strict set of safety _____.",
    answer: "regulations",
  },
  // Additional questions for variety
  {
    sentence: "The weather forecast predicts _____ for the weekend.",
    answer: "rain",
  },
  {
    sentence: "Please _____ your documents before submitting the application.",
    answer: "review",
  },
  {
    sentence: "The meeting has been _____ to next Tuesday.",
    answer: "postponed",
  },
  {
    sentence: "She decided to _____ her career in marketing.",
    answer: "pursue",
  },
  {
    sentence: "The restaurant is famous for its _____ cuisine.",
    answer: "authentic",
  },
]

const dictationPool = [
  "Good morning and thank you for calling our customer service department.",
  "My name is Sarah and I will be assisting you with your inquiry today.",
  "Please provide me with your account number so I can access your information.",
  "I understand your concern and I will do my best to resolve this issue.",
  "Let me check your account details and see what options are available.",
  "I apologize for any inconvenience this may have caused you today.",
  "Your satisfaction is very important to us and we value your business.",
  "I will escalate this matter to our technical support team immediately.",
  "Please hold on while I transfer you to the appropriate department.",
  "Thank you for your patience while we work to resolve this matter.",
  "I have updated your account with the new information you provided.",
  "Is there anything else I can help you with today before we end this call?",
  "Please feel free to contact us again if you need any further assistance.",
  "Have a wonderful day and thank you for choosing our services.",
  "Your case number for reference is twelve thirty four fifty six.",
  "We will follow up with you within twenty four hours regarding this issue.",
  // Additional dictation sentences
  "Welcome to our customer support center, how may I assist you today?",
  "I will need to verify your identity before we can proceed with your request.",
  "The system is currently undergoing maintenance and will be back online shortly.",
  "Your payment has been processed successfully and you will receive a confirmation email.",
  "I can see that your order was shipped yesterday and should arrive within two business days.",
  "Let me transfer you to our billing department for assistance with your account.",
  "Please note that our office hours are Monday through Friday from nine to five.",
  "I have made a note in your account regarding this conversation for future reference.",
  "The warranty on your product covers repairs and replacements for one full year.",
  "Thank you for being a loyal customer, we appreciate your continued business.",
]

// Function to shuffle array
const shuffleArray = (array: any[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Function to get random questions
const getRandomQuestions = (pool: any[], count: number) => {
  const shuffled = shuffleArray(pool)
  return shuffled.slice(0, count)
}

export default function NonVoiceVersantPage() {
  const router = useRouter()
  const { addTestResult } = useUserStats()

  const [currentSection, setCurrentSection] = useState(0)
  const [currentItem, setCurrentItem] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [userInputs, setUserInputs] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showPassage, setShowPassage] = useState(true)
  const [totalScore, setTotalScore] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Generate random questions once when component mounts
  const [testData] = useState(() => ({
    sections: [
      {
        id: "typing",
        title: "Part A - Typing Test",
        duration: 60,
        content:
          "There are various influencing styles, and many people have a default or preferred one they naturally slip into. However, it's important to adjust the style depending on the situation and the people involved. Choosing the most suitable style for each situation can greatly influence the outcome. One common approach is coercion, where threats are used to accomplish tasks. It's important to be cautious with this style, as excessive use can lead to resentment. Other advocated style is directional, where an individual clearly states what they want and when they want it. This approach can be effective when dealing with people who are manipulative. Lastly, reason is another effective strategy, where someone presents a well-thought-out argument based on facts, logic, and evidence to convince others.",
        type: "typing",
      },
      {
        id: "sentence-completion",
        title: "Part B - Sentence Completion",
        duration: 500,
        timePerQuestion: 25,
        questions: getRandomQuestions(sentenceCompletionPool, 20),
        type: "completion",
      },
      {
        id: "dictation",
        title: "Part C - Audio Dictation",
        duration: 400,
        timePerQuestion: 25,
        questions: getRandomQuestions(dictationPool, 16),
        type: "dictation",
      },
      {
        id: "passage-reconstruction",
        title: "Part D - Passage Reconstruction",
        duration: 120,
        readTime: 30,
        writeTime: 90,
        totalQuestions: 4,
        passages: shuffleArray([
          "Customer service representatives must demonstrate excellent communication skills and patience when dealing with difficult situations. They should listen actively to understand customer concerns and provide appropriate solutions. Building positive relationships with customers is essential for business success.",
          "Effective problem-solving requires careful analysis of the situation and consideration of multiple solutions. Representatives should remain calm under pressure and work collaboratively with team members. Clear documentation of all interactions helps maintain service quality standards.",
          "Professional email communication involves using proper grammar, clear subject lines, and courteous language throughout the message. Representatives must respond promptly to customer inquiries and follow up appropriately. Maintaining a professional tone helps build trust and credibility.",
          "Time management skills are crucial for handling multiple customer requests efficiently while maintaining quality service standards. Representatives should prioritize urgent matters and organize their workload effectively. Regular training helps improve performance and customer satisfaction levels.",
        ]).slice(0, 4),
        type: "reconstruction",
      },
      {
        id: "email-writing",
        title: "Part E - Email Writing",
        duration: 540,
        scenarios: shuffleArray([
          {
            subject: "Account Verification Required",
            prompt:
              "Write an email to a customer requesting account verification documents. Explain why verification is needed, what documents are required, and the deadline for submission.",
          },
          {
            subject: "Service Interruption Notification",
            prompt:
              "Compose an email informing customers about a scheduled maintenance that will cause temporary service interruption. Include the maintenance window, expected duration, and alternative support options.",
          },
          {
            subject: "Payment Processing Delay",
            prompt:
              "Write an email to a customer explaining a delay in processing their payment. Apologize for the inconvenience, explain the reason for the delay, and provide a new expected processing date.",
          },
        ]).slice(0, 1),
        type: "email",
      },
    ],
  }))

  const currentTest = testData.sections[currentSection]

  useEffect(() => {
    if (currentTest) {
      if (currentTest.type === "typing") {
        setTimeLeft(currentTest.duration)
      } else if (currentTest.type === "completion") {
        setTimeLeft(currentTest.timePerQuestion || 25)
      } else if (currentTest.type === "dictation") {
        setTimeLeft(currentTest.timePerQuestion || 25)
      } else if (currentTest.type === "reconstruction") {
        setTimeLeft(showPassage ? currentTest.readTime || 30 : currentTest.writeTime || 90)
      } else if (currentTest.type === "email") {
        setTimeLeft(currentTest.duration || 540)
      }
    }
  }, [currentSection, currentItem, currentTest, showPassage])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleTimeUp()
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

  // Auto-play audio for dictation
  useEffect(() => {
    if (currentTest?.type === "dictation" && isActive && !audioPlayed) {
      setTimeout(() => {
        playAudio()
        setAudioPlayed(true)
      }, 1000)
    }
  }, [currentTest, isActive, audioPlayed, currentItem])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTest = () => {
    setHasStarted(true)
    setIsActive(true)
    setCurrentSection(0)
    setCurrentItem(0)
    setUserInputs([])
  }

  const playAudio = () => {
    if ("speechSynthesis" in window && currentTest?.type === "dictation") {
      const text = currentTest.questions?.[currentItem] || ""
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      speechSynthesis.speak(utterance)
    }
  }

  const stopAllAudio = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }

  const handleTimeUp = () => {
    if (currentTest?.type === "reconstruction" && showPassage) {
      setShowPassage(false)
      setTimeLeft(currentTest.writeTime || 90)
      return
    }

    handleNextItem()
  }

  const handleNextItem = () => {
    // Stop any playing audio
    stopAllAudio()

    // Save current input
    const newInputs = [...userInputs]
    newInputs[currentSection * 100 + currentItem] = currentInput
    setUserInputs(newInputs)
    setCurrentInput("")

    const maxItems = getMaxItems()

    if (currentItem < maxItems - 1) {
      setCurrentItem(currentItem + 1)
      setAudioPlayed(false)
      setShowPassage(true)
      resetTimer()
    } else {
      handleNextSection()
    }
  }

  const handleNextSection = () => {
    // Stop any playing audio
    stopAllAudio()

    if (currentSection < testData.sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentItem(0)
      setAudioPlayed(false)
      setShowPassage(true)
      resetTimer()
    } else {
      completeTest()
    }
  }

  const completeTest = () => {
    // Stop any playing audio
    stopAllAudio()

    const score = calculateTotalScore()
    setTotalScore(score)
    setIsActive(false)
    setIsCompleted(true)

    // Add result to user stats
    addTestResult({
      id: `non-voice-versant-${Date.now()}`,
      sectionId: "non-voice-versant",
      score: score,
      duration: Date.now() - (Date.now() - 2000000), // Approximate duration
      type: "complete-assessment",
    })
  }

  const calculateTotalScore = () => {
    // Simple scoring logic - can be enhanced
    let totalScore = 0
    let totalSections = 0

    testData.sections.forEach((section, sectionIndex) => {
      if (section.type === "typing") {
        const input = userInputs[sectionIndex * 100] || ""
        const accuracy =
          input.length > 0
            ? (input.split("").filter((char, i) => char === section.content[i]).length / section.content.length) * 100
            : 0
        totalScore += Math.round(accuracy)
        totalSections++
      } else {
        // For other sections, give a base score if there's input
        const hasInput = userInputs.some(
          (input, index) => Math.floor(index / 100) === sectionIndex && input && input.trim().length > 0,
        )
        totalScore += hasInput ? 75 : 0
        totalSections++
      }
    })

    return totalSections > 0 ? Math.round(totalScore / totalSections) : 0
  }

  const getMaxItems = () => {
    if (currentTest?.type === "typing") return 1
    if (currentTest?.type === "completion") return currentTest.questions?.length || 0
    if (currentTest?.type === "dictation") return currentTest.questions?.length || 0
    if (currentTest?.type === "reconstruction") return currentTest.passages?.length || 0
    if (currentTest?.type === "email") return currentTest.scenarios?.length || 0
    return 0
  }

  const resetTimer = () => {
    if (currentTest?.type === "typing") {
      setTimeLeft(currentTest.duration)
    } else if (currentTest?.type === "completion") {
      setTimeLeft(currentTest.timePerQuestion || 25)
    } else if (currentTest?.type === "dictation") {
      setTimeLeft(currentTest.timePerQuestion || 25)
    } else if (currentTest?.type === "reconstruction") {
      setTimeLeft(showPassage ? currentTest.readTime || 30 : currentTest.writeTime || 90)
    } else if (currentTest?.type === "email") {
      setTimeLeft(currentTest.duration || 540)
    }
  }

  const resetTest = () => {
    // Stop any playing audio
    stopAllAudio()

    setCurrentSection(0)
    setCurrentItem(0)
    setIsActive(false)
    setHasStarted(false)
    setIsCompleted(false)
    setUserInputs([])
    setCurrentInput("")
    setAudioPlayed(false)
    setShowPassage(true)
    setTotalScore(0)
  }

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      stopAllAudio()
    }
  }, [])

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 section-padding flex items-center justify-center">
          <div className="card max-w-2xl w-full text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Non Voice Versant Test Completed!</h2>
            <div className="text-6xl font-bold text-blue-600 mb-6">{totalScore}%</div>
            <p className="text-gray-600 mb-8">
              Congratulations on completing the Non Voice Versant assessment! Your performance has been recorded.
            </p>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-green-800 mb-4">Test Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Typing Test</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Sentence Completion</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Audio Dictation</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Passage Reconstruction</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Email Writing</div>
                  <div className="text-green-600">Completed</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={resetTest} className="btn-secondary w-full">
                Retake Test
              </button>
              <button onClick={() => router.push("/dashboard")} className="btn-primary w-full">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <WhatsAppFloat />

        <section className="bg-gradient-to-br from-blue-50 to-white pt-20 section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Non Voice <span className="text-gradient">Versant Test</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Complete written assessment with 5 sections. Test your typing, comprehension, and communication skills.
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Test Overview</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part A - Typing Test</h4>
                    <div className="text-blue-600 font-medium">1 minute</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part B - Sentence Completion</h4>
                    <div className="text-blue-600 font-medium">20 questions</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part C - Audio Dictation</h4>
                    <div className="text-blue-600 font-medium">16 questions</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part D - Passage Reconstruction</h4>
                    <div className="text-blue-600 font-medium">4 passages</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibred text-gray-900 mb-2">Part E - Email Writing</h4>
                    <div className="text-blue-600 font-medium">9 minutes</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium">Total Duration: ~33 minutes</p>
                  <p className="text-sm text-blue-600 mt-2">⚠️ Questions are randomized for each attempt</p>
                </div>
              </div>

              <button onClick={startTest} className="btn-primary text-xl px-12 py-6 flex items-center mx-auto">
                <Play className="w-6 h-6 mr-3" />
                Start Non Voice Test
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppFloat />

      {/* Header */}
      <section className="bg-white shadow-sm pt-20">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => {
                stopAllAudio()
                router.push("/dashboard")
              }}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Exit Test</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">{currentTest.title}</h1>
              <div className="text-sm text-gray-600">
                Section {currentSection + 1} of {testData.sections.length} - Item {currentItem + 1} of {getMaxItems()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div
          className="bg-blue-600 h-2 transition-all duration-300"
          style={{
            width: `${((currentSection * 20 + currentItem + 1) / 61) * 100}%`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="card max-w-4xl mx-auto">
          {/* Test Content */}
          <div className="space-y-6">
            {currentTest.type === "typing" && (
              <div>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <p className="text-gray-800 leading-relaxed">{currentTest.content}</p>
                </div>
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Start typing here..."
                  className="input-field h-40 resize-none"
                  disabled={!isActive}
                />
                {isActive && (
                  <div className="text-center mt-6">
                    <button onClick={handleNextItem} className="btn-primary">
                      Next Section
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentTest.type === "completion" && (
              <div>
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-3">Complete the sentence:</h4>
                  <p className="text-lg text-gray-800">{currentTest.questions?.[currentItem]?.sentence}</p>
                </div>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="input-field"
                  placeholder="Your answer..."
                  disabled={!isActive}
                />
                {isActive && (
                  <div className="text-center mt-6">
                    <button onClick={handleNextItem} className="btn-primary">
                      {currentItem < getMaxItems() - 1 ? "Next Question" : "Next Section"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentTest.type === "dictation" && (
              <div>
                <div className="bg-blue-50 p-6 rounded-lg mb-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    {audioPlayed ? (
                      <VolumeX className="w-12 h-12 text-gray-400" />
                    ) : (
                      <Volume2 className="w-12 h-12 text-blue-600 animate-pulse" />
                    )}
                  </div>
                  <p className="text-blue-800 font-medium">
                    {audioPlayed
                      ? "Audio played. Type what you heard."
                      : "Listen carefully. Audio will play automatically."}
                  </p>
                  <button
                    onClick={playAudio}
                    className="btn-secondary mt-4 flex items-center mx-auto"
                    disabled={!isActive}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Replay Audio
                  </button>
                </div>
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type what you hear..."
                  className="input-field h-32 resize-none"
                  disabled={!isActive}
                />
                {isActive && (
                  <div className="text-center mt-6">
                    <button onClick={handleNextItem} className="btn-primary">
                      {currentItem < getMaxItems() - 1 ? "Next Question" : "Next Section"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentTest.type === "reconstruction" && (
              <div>
                {showPassage ? (
                  <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-3">Study this passage carefully:</h4>
                    <p className="text-gray-800 leading-relaxed">{currentTest.passages?.[currentItem]}</p>
                    <p className="text-sm text-yellow-700 mt-4">
                      You have {formatTime(timeLeft)} to study this passage. Then you'll need to reconstruct it from
                      memory.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-yellow-800 mb-3">Reconstruct the passage from memory:</h4>
                      <p className="text-yellow-700">
                        Write the passage as accurately as possible from what you remember.
                      </p>
                    </div>
                    <textarea
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder="Reconstruct the passage from memory..."
                      className="input-field h-40 resize-none"
                      disabled={!isActive}
                    />
                    {isActive && (
                      <div className="text-center mt-6">
                        <button onClick={handleNextItem} className="btn-primary">
                          {currentItem < getMaxItems() - 1 ? "Next Passage" : "Next Section"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentTest.type === "email" && (
              <div>
                <div className="bg-purple-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-purple-800 mb-3">Email Scenario:</h4>
                  <p className="text-gray-800 mb-4">{currentTest.scenarios?.[currentItem]?.prompt}</p>
                  <p className="text-sm text-purple-700">
                    Write a professional email addressing this scenario. Include appropriate subject line and content.
                  </p>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="Subject: " className="input-field" disabled={!isActive} />
                  <textarea
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Write your email here..."
                    className="input-field h-48 resize-none"
                    disabled={!isActive}
                  />
                </div>
                {isActive && (
                  <div className="text-center mt-6">
                    <button onClick={handleNextItem} className="btn-primary">
                      {currentItem < getMaxItems() - 1 ? "Next Email" : "Complete Test"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
