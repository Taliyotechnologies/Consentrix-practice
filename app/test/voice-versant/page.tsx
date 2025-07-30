"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { ArrowLeft, Clock, Mic, MicOff, Volume2, VolumeX } from "lucide-react"

const voiceVersantData = {
  sections: [
    {
      id: "reading",
      title: "Part A - Reading",
      duration: 180, // 3 minutes
      instructions: "Read each sentence aloud clearly and naturally. You have 3 seconds to read each sentence.",
      sentences: [
        "The customer service representative handled the complaint professionally.",
        "Please verify your account information before proceeding with the transaction.",
        "Our technical support team is available twenty-four hours a day.",
        "The company policy requires all employees to attend the training session.",
        "Your order has been processed and will be shipped within two business days.",
        "We apologize for any inconvenience this delay may have caused you.",
        "The warranty covers all manufacturing defects for a period of one year.",
        "Please hold while I transfer you to the appropriate department.",
        "Your feedback is valuable and helps us improve our services.",
        "The system maintenance will be completed by tomorrow morning.",
        "All customer inquiries must be documented in the tracking system.",
        "The new software update includes enhanced security features.",
        "Please provide your reference number for faster assistance.",
        "Our billing department can help you with payment arrangements.",
        "The conference call is scheduled for three o'clock this afternoon.",
      ],
      timePerSentence: 3,
      type: "reading",
    },
    {
      id: "repeat",
      title: "Part B - Repeat",
      duration: 240, // 4 minutes
      instructions: "Listen carefully and repeat exactly what you hear. You will hear each sentence once.",
      sentences: [
        "Good morning, how can I help you today?",
        "Please hold on while I check your account.",
        "Your call is important to us.",
        "I will transfer you to our billing department.",
        "Thank you for choosing our services.",
        "Your order number is twelve thirty-four fifty-six.",
        "The delivery will arrive between nine and five.",
        "Please update your contact information.",
        "We have received your payment confirmation.",
        "Your warranty expires next month.",
        "The technical issue has been resolved.",
        "Please rate your experience with us today.",
        "Your account has been successfully updated.",
        "We will follow up within twenty-four hours.",
        "Thank you for your patience and understanding.",
        "Is there anything else I can help you with?",
      ],
      type: "repeat",
    },
    {
      id: "short-answer",
      title: "Part C - Short Answer Questions",
      duration: 300, // 5 minutes
      instructions: "Answer each question with a short, clear response. You have 10 seconds to answer each question.",
      questions: [
        {
          question: "What do you do when a customer is angry?",
          expectedAnswer: "Listen carefully and try to help solve their problem.",
        },
        {
          question: "How do you handle multiple calls at the same time?",
          expectedAnswer: "Prioritize urgent calls and manage time efficiently.",
        },
        {
          question: "What information do you need from a customer?",
          expectedAnswer: "Name, account number, and description of the issue.",
        },
        {
          question: "How do you verify a customer's identity?",
          expectedAnswer: "Ask for personal information like date of birth or address.",
        },
        {
          question: "What do you do if you don't know the answer?",
          expectedAnswer: "Ask a supervisor or transfer to the right department.",
        },
        {
          question: "How do you end a customer service call?",
          expectedAnswer: "Ask if there's anything else and thank the customer.",
        },
        {
          question: "What do you do when the system is down?",
          expectedAnswer: "Inform the customer and offer alternative solutions.",
        },
        {
          question: "How do you handle a billing dispute?",
          expectedAnswer: "Review the account and explain the charges clearly.",
        },
        {
          question: "What do you do for a product return?",
          expectedAnswer: "Check the return policy and provide instructions.",
        },
        {
          question: "How do you follow up with customers?",
          expectedAnswer: "Call or email within the promised timeframe.",
        },
      ],
      timePerQuestion: 10,
      type: "short-answer",
    },
    {
      id: "sentence-builds",
      title: "Part D - Sentence Builds",
      duration: 360, // 6 minutes
      instructions:
        "Use the given words to build a complete, grammatically correct sentence. You have 15 seconds for each set of words.",
      wordSets: [
        {
          words: ["customer", "service", "representative", "helpful", "very"],
          expectedSentence: "The customer service representative was very helpful.",
        },
        {
          words: ["account", "information", "please", "verify", "your"],
          expectedSentence: "Please verify your account information.",
        },
        {
          words: ["technical", "support", "available", "hours", "twenty-four"],
          expectedSentence: "Technical support is available twenty-four hours.",
        },
        {
          words: ["order", "processed", "shipped", "business", "days"],
          expectedSentence: "Your order has been processed and will be shipped in two business days.",
        },
        {
          words: ["apologize", "inconvenience", "delay", "caused", "any"],
          expectedSentence: "We apologize for any inconvenience this delay has caused.",
        },
        {
          words: ["warranty", "covers", "defects", "manufacturing", "year"],
          expectedSentence: "The warranty covers manufacturing defects for one year.",
        },
        {
          words: ["transfer", "appropriate", "department", "hold", "please"],
          expectedSentence: "Please hold while I transfer you to the appropriate department.",
        },
        {
          words: ["feedback", "valuable", "improve", "services", "helps"],
          expectedSentence: "Your feedback is valuable and helps us improve our services.",
        },
        {
          words: ["maintenance", "completed", "tomorrow", "system", "morning"],
          expectedSentence: "System maintenance will be completed tomorrow morning.",
        },
        {
          words: ["inquiries", "documented", "tracking", "customer", "system"],
          expectedSentence: "Customer inquiries must be documented in the tracking system.",
        },
      ],
      timePerSet: 15,
      type: "sentence-builds",
    },
    {
      id: "story-retellings",
      title: "Part E - Story Retellings",
      duration: 480, // 8 minutes
      instructions:
        "Listen to each story carefully, then retell it in your own words. You have 60 seconds to retell each story.",
      stories: [
        {
          title: "Customer Complaint Resolution",
          story:
            "Yesterday, a customer called our support center because her internet service was not working properly. She had been experiencing slow speeds for three days and was very frustrated. Our technician, Mark, listened carefully to her concerns and ran several diagnostic tests. He discovered that the problem was with the router configuration. Mark walked the customer through the steps to reset her router and update the settings. After fifteen minutes, the internet was working perfectly. The customer was very grateful and thanked Mark for his patience and expertise.",
          keyPoints: [
            "Customer had internet problems",
            "Slow speeds for three days",
            "Technician Mark helped",
            "Router configuration issue",
            "Problem resolved in 15 minutes",
            "Customer was grateful",
          ],
        },
        {
          title: "Billing Error Correction",
          story:
            "Last week, Mrs. Johnson received her monthly bill and noticed she was charged twice for the same service. She called our billing department to report the error. The representative, Sarah, immediately accessed Mrs. Johnson's account and confirmed that there was indeed a duplicate charge. Sarah explained that this happened due to a system glitch during the billing cycle. She processed a refund for the duplicate amount and ensured that Mrs. Johnson would receive a credit on her next bill. Sarah also set up a reminder to monitor Mrs. Johnson's account for the next two months to prevent similar issues.",
          keyPoints: [
            "Mrs. Johnson found duplicate charge",
            "Called billing department",
            "Sarah confirmed the error",
            "System glitch caused problem",
            "Refund processed",
            "Account monitoring set up",
          ],
        },
        {
          title: "Product Exchange Process",
          story:
            "A customer purchased a laptop from our store but discovered it had a defective keyboard after two days of use. He brought the laptop back to the store with his receipt and warranty information. Our sales associate, Jennifer, examined the laptop and confirmed the keyboard malfunction. Since the laptop was still under the return policy period, Jennifer offered either a full refund or an exchange for a new laptop. The customer chose to exchange it for the same model. Jennifer processed the exchange, transferred all the customer's data to the new laptop, and provided an extended warranty at no extra cost for the inconvenience.",
          keyPoints: [
            "Customer bought defective laptop",
            "Keyboard malfunction",
            "Brought back with receipt",
            "Jennifer confirmed problem",
            "Customer chose exchange",
            "Data transferred and extended warranty given",
          ],
        },
        {
          title: "Emergency Service Call",
          story:
            "During a severe storm last month, many customers lost their phone and internet services. Our emergency response team worked around the clock to restore connections. One elderly customer, Mr. Peterson, called our emergency line because he needed his phone service for medical reasons. The dispatcher, Tom, immediately prioritized Mr. Peterson's case and sent a technician to his location within two hours. The technician discovered that a tree had damaged the phone line to his house. Despite the dangerous weather conditions, the technician repaired the line and restored Mr. Peterson's service by evening. Mr. Peterson was extremely relieved and praised our team's dedication.",
          keyPoints: [
            "Storm caused service outages",
            "Mr. Peterson needed phone for medical reasons",
            "Tom prioritized the case",
            "Technician sent within 2 hours",
            "Tree damaged phone line",
            "Service restored by evening",
          ],
        },
      ],
      timePerStory: 60,
      type: "story-retellings",
    },
    {
      id: "open-questions",
      title: "Part F - Open Questions",
      duration: 600, // 10 minutes
      instructions: "Answer each question with detailed responses. Speak for 45-60 seconds on each topic.",
      questions: [
        {
          question: "Describe your experience with customer service. What makes good customer service?",
          guidelines: "Talk about personal experiences, key qualities of good service, and specific examples.",
        },
        {
          question: "How would you handle a situation where a customer is dissatisfied with a product or service?",
          guidelines: "Discuss your approach, steps you would take, and how you would ensure customer satisfaction.",
        },
        {
          question: "Explain the importance of communication skills in a customer service role.",
          guidelines:
            "Describe different communication skills, their importance, and how they impact customer relationships.",
        },
        {
          question: "Tell me about a time when you had to solve a difficult problem. How did you approach it?",
          guidelines: "Share a specific example, your problem-solving process, and the outcome.",
        },
        {
          question: "What do you think are the biggest challenges in customer service today?",
          guidelines: "Discuss modern challenges, technology impact, and potential solutions.",
        },
        {
          question: "How do you stay calm and professional when dealing with angry or frustrated customers?",
          guidelines: "Share techniques, personal strategies, and the importance of maintaining professionalism.",
        },
        {
          question: "Describe how technology has changed customer service. What are the benefits and challenges?",
          guidelines: "Discuss technological advances, their impact on service delivery, and future trends.",
        },
        {
          question: "What would you do if you made a mistake while helping a customer?",
          guidelines: "Explain your approach to handling mistakes, taking responsibility, and making corrections.",
        },
        {
          question: "How important is teamwork in a customer service environment?",
          guidelines: "Discuss collaboration, supporting colleagues, and working together to serve customers.",
        },
        {
          question: "What motivates you to work in customer service, and what are your career goals?",
          guidelines: "Share your motivation, interests in the field, and future aspirations.",
        },
      ],
      timePerQuestion: 60,
      type: "open-questions",
    },
  ],
}

export default function VoiceVersantPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentItem, setCurrentItem] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  const currentTest = voiceVersantData.sections[currentSection]

  useEffect(() => {
    if (currentTest) {
      if (currentTest.type === "reading") {
        setTimeLeft(currentTest.timePerSentence || 3)
      } else if (currentTest.type === "short-answer") {
        setTimeLeft(currentTest.timePerQuestion || 10)
      } else if (currentTest.type === "sentence-builds") {
        setTimeLeft(currentTest.timePerSet || 15)
      } else if (currentTest.type === "story-retellings") {
        setTimeLeft(currentTest.timePerStory || 60)
      } else if (currentTest.type === "open-questions") {
        setTimeLeft(currentTest.timePerQuestion || 60)
      } else {
        setTimeLeft(5) // Default for repeat
      }
    }
  }, [currentSection, currentItem, currentTest])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleNextItem()
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

  // Auto-play audio for repeat section
  useEffect(() => {
    if (currentTest?.type === "repeat" && isActive && !audioPlayed) {
      setTimeout(() => {
        playAudio()
        setAudioPlayed(true)
      }, 1000)
    }
  }, [currentTest, isActive, audioPlayed, currentItem])

  // Auto-play story for story retelling
  useEffect(() => {
    if (currentTest?.type === "story-retellings" && isActive && !audioPlayed && !isListening) {
      setTimeout(() => {
        playStory()
        setAudioPlayed(true)
        setIsListening(true)
      }, 1000)
    }
  }, [currentTest, isActive, audioPlayed, currentItem, isListening])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startVoiceTest = () => {
    setHasStarted(true)
    setIsActive(true)
    setCurrentSection(0)
    setCurrentItem(0)
  }

  const playAudio = () => {
    if ("speechSynthesis" in window && currentTest?.type === "repeat") {
      const text = currentTest.sentences?.[currentItem] || ""
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      speechSynthesis.speak(utterance)
    }
  }

  const playStory = () => {
    if ("speechSynthesis" in window && currentTest?.type === "story-retellings") {
      const story = currentTest.stories?.[currentItem]?.story || ""
      const utterance = new SpeechSynthesisUtterance(story)
      utterance.rate = 0.7
      utterance.pitch = 1
      utterance.volume = 1
      utterance.onend = () => {
        setIsListening(false)
        // Reset timer for retelling
        if (currentTest.timePerStory) {
          setTimeLeft(currentTest.timePerStory)
        }
      }
      speechSynthesis.speak(utterance)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleNextItem = () => {
    const maxItems = getMaxItems()

    if (currentItem < maxItems - 1) {
      setCurrentItem(currentItem + 1)
      setAudioPlayed(false)
      setIsListening(false)
      resetTimer()
    } else {
      handleNextSection()
    }
  }

  const handleNextSection = () => {
    if (currentSection < voiceVersantData.sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentItem(0)
      setAudioPlayed(false)
      setIsListening(false)
      resetTimer()
    } else {
      setIsActive(false)
      setIsCompleted(true)
    }
  }

  const getMaxItems = () => {
    if (currentTest?.type === "reading") return currentTest.sentences?.length || 0
    if (currentTest?.type === "repeat") return currentTest.sentences?.length || 0
    if (currentTest?.type === "short-answer") return currentTest.questions?.length || 0
    if (currentTest?.type === "sentence-builds") return currentTest.wordSets?.length || 0
    if (currentTest?.type === "story-retellings") return currentTest.stories?.length || 0
    if (currentTest?.type === "open-questions") return currentTest.questions?.length || 0
    return 0
  }

  const resetTimer = () => {
    if (currentTest?.type === "reading") {
      setTimeLeft(currentTest.timePerSentence || 3)
    } else if (currentTest?.type === "short-answer") {
      setTimeLeft(currentTest.timePerQuestion || 10)
    } else if (currentTest?.type === "sentence-builds") {
      setTimeLeft(currentTest.timePerSet || 15)
    } else if (currentTest?.type === "story-retellings") {
      setTimeLeft(currentTest.timePerStory || 60)
    } else if (currentTest?.type === "open-questions") {
      setTimeLeft(currentTest.timePerQuestion || 60)
    } else {
      setTimeLeft(5)
    }
  }

  const resetTest = () => {
    setCurrentSection(0)
    setCurrentItem(0)
    setIsActive(false)
    setHasStarted(false)
    setIsCompleted(false)
    setAudioPlayed(false)
    setIsListening(false)
    setIsRecording(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 section-padding flex items-center justify-center">
          <div className="card max-w-2xl w-full text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Voice Versant Test Completed!</h2>
            <div className="text-6xl font-bold text-blue-600 mb-6">✓</div>
            <p className="text-gray-600 mb-8">
              Congratulations on completing the Voice Versant speaking assessment! Your responses have been recorded.
            </p>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-green-800 mb-4">Test Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Reading</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Repeat</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Short Answers</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Sentence Builds</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Story Retellings</div>
                  <div className="text-green-600">Completed</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-medium">Open Questions</div>
                  <div className="text-green-600">Completed</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={resetTest} className="btn-secondary w-full">
                Retake Voice Test
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

        <section className="bg-gradient-to-br from-purple-50 to-white pt-20 section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Voice{" "}
                <span className="text-gradient bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Versant Test
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Complete speaking assessment with 6 sections. Test your pronunciation, fluency, and communication
                skills.
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Test Overview</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part A - Reading</h4>
                    <div className="text-purple-600 font-medium">15 sentences</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part B - Repeat</h4>
                    <div className="text-purple-600 font-medium">16 sentences</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part C - Short Answers</h4>
                    <div className="text-purple-600 font-medium">10 questions</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part D - Sentence Builds</h4>
                    <div className="text-purple-600 font-medium">10 word sets</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part E - Story Retellings</h4>
                    <div className="text-purple-600 font-medium">4 stories</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Part F - Open Questions</h4>
                    <div className="text-purple-600 font-medium">10 questions</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-purple-800 font-medium">Total Duration: ~30 minutes</p>
                  <p className="text-sm text-purple-600 mt-2">
                    ⚠️ Microphone access required for recording your responses
                  </p>
                </div>
              </div>

              <button
                onClick={startVoiceTest}
                className="btn-primary text-xl px-12 py-6 flex items-center mx-auto bg-purple-600 hover:bg-purple-700"
              >
                <Mic className="w-6 h-6 mr-3" />
                Start Voice Test
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
              onClick={() => router.push("/dashboard")}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Exit Test</span>
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">{currentTest.title}</h1>
              <div className="text-sm text-gray-600">
                Section {currentSection + 1} of {voiceVersantData.sections.length} - Item {currentItem + 1} of{" "}
                {getMaxItems()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
              </div>
              {isRecording && (
                <div className="flex items-center text-red-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div
          className="bg-purple-600 h-2 transition-all duration-300"
          style={{
            width: `${((currentSection * getMaxItems() + currentItem + 1) / voiceVersantData.sections.reduce((acc, section) => acc + (section.sentences?.length || section.questions?.length || section.wordSets?.length || section.stories?.length || 0), 0)) * 100}%`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="card max-w-4xl mx-auto">
          {/* Instructions */}
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-purple-800 mb-2">Instructions</h3>
            <p className="text-purple-700">{currentTest.instructions}</p>
          </div>

          {/* Test Content */}
          <div className="space-y-6">
            {currentTest.type === "reading" && (
              <div className="text-center">
                <div className="bg-white border-2 border-purple-200 p-8 rounded-lg mb-6">
                  <p className="text-2xl text-gray-800 leading-relaxed">{currentTest.sentences?.[currentItem]}</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                </div>
              </div>
            )}

            {currentTest.type === "repeat" && (
              <div className="text-center">
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-center mb-4">
                    {audioPlayed ? (
                      <VolumeX className="w-12 h-12 text-gray-400" />
                    ) : (
                      <Volume2 className="w-12 h-12 text-blue-600 animate-pulse" />
                    )}
                  </div>
                  <p className="text-blue-800 font-medium">
                    {audioPlayed
                      ? "Audio played. Now repeat what you heard."
                      : "Listen carefully. Audio will play automatically."}
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                    disabled={!audioPlayed}
                  >
                    {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                </div>
              </div>
            )}

            {currentTest.type === "short-answer" && (
              <div>
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-3">Question:</h4>
                  <p className="text-lg text-gray-800">{currentTest.questions?.[currentItem]?.question}</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentTest.type === "sentence-builds" && (
              <div>
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-orange-800 mb-3">Build a sentence using these words:</h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {currentTest.wordSets?.[currentItem]?.words.map((word, index) => (
                      <span
                        key={index}
                        className="bg-white px-4 py-2 rounded-lg border-2 border-orange-200 font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentTest.type === "story-retellings" && (
              <div>
                {isListening ? (
                  <div className="bg-yellow-50 p-6 rounded-lg mb-6 text-center">
                    <Volume2 className="w-12 h-12 text-yellow-600 mx-auto mb-4 animate-pulse" />
                    <h4 className="font-semibold text-yellow-800 mb-2">{currentTest.stories?.[currentItem]?.title}</h4>
                    <p className="text-yellow-700">Listen carefully to the story. You will retell it afterwards.</p>
                  </div>
                ) : (
                  <div>
                    <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-yellow-800 mb-3">
                        Now retell the story: {currentTest.stories?.[currentItem]?.title}
                      </h4>
                      <p className="text-yellow-700">
                        Retell the story in your own words. Include the main points and details.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                            isRecording
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          }`}
                        >
                          {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                          {isRecording ? "Stop Recording" : "Start Recording"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentTest.type === "open-questions" && (
              <div>
                <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-indigo-800 mb-3">Question:</h4>
                  <p className="text-lg text-gray-800 mb-4">{currentTest.questions?.[currentItem]?.question}</p>
                  <div className="text-sm text-indigo-700">
                    <strong>Guidelines:</strong> {currentTest.questions?.[currentItem]?.guidelines}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
