import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const QUICK_REPLIES = [
  "What defects can you detect?",
  "How accurate is the model?",
  "What is the processing speed?",
  "How does YOLOv8 work?",
]

const BOT_RESPONSES: Record<string, string> = {
  "What defects can you detect?": "I can detect 6 types: Cracks, Scratches, Inclusions, Patches, Pitted Surfaces, and Rolled-in Scales — all from the NEU Surface Defect Database.",
  "How accurate is the model?": "The YOLOv8 + CNN hybrid achieves 98.7% accuracy on the NEU test set with a false positive rate below 0.8%.",
  "What is the processing speed?": "Each inference takes under 30ms, enabling real-time detection at 60 FPS on industrial cameras.",
  "How does YOLOv8 work?": "YOLOv8 divides the image into a grid, predicts bounding boxes and class probabilities simultaneously — enabling single-pass real-time detection.",
}

type Message = { role: "user" | "bot"; text: string }

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm the SteelVision AI Assistant. Ask me about defect detection, model accuracy, or our technology stack." }
  ])
  const [input, setInput] = useState("")

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: "user", text }
    const botReply = BOT_RESPONSES[text] || "I'm specialized in steel defect detection. Try asking about detection accuracy, defect types, or processing speed!"
    setMessages((prev) => [...prev, userMsg, { role: "bot", text: botReply }])
    setInput("")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-72 rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "oklch(0.11 0.016 240 / 0.95)",
              border: "1px solid oklch(0.65 0.2 210 / 0.3)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 40px oklch(0.65 0.2 210 / 0.2)",
              maxHeight: 420,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid oklch(0.2 0.03 240 / 0.5)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "oklch(0.75 0.15 160)" }} />
                <span className="text-xs font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-xs" style={{ color: "oklch(0.5 0.04 210)" }}>✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 240 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                    style={{
                      background: msg.role === "user" ? "oklch(0.65 0.2 210 / 0.3)" : "oklch(0.15 0.025 240 / 0.8)",
                      color: "oklch(0.85 0.04 210)",
                      border: msg.role === "bot" ? "1px solid oklch(0.2 0.03 240 / 0.5)" : "none",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="px-3 py-2 flex flex-wrap gap-1" style={{ borderTop: "1px solid oklch(0.15 0.02 240 / 0.5)" }}>
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[10px] px-2 py-1 rounded-full transition-all"
                  style={{ background: "oklch(0.65 0.2 210 / 0.1)", border: "1px solid oklch(0.65 0.2 210 / 0.2)", color: "oklch(0.7 0.1 210)", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 px-3 py-2" style={{ borderTop: "1px solid oklch(0.15 0.02 240 / 0.5)" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about SteelVision AI..."
                className="flex-1 text-xs px-3 py-2 rounded-lg outline-none"
                style={{ background: "oklch(0.08 0.01 240)", border: "1px solid oklch(0.2 0.03 240 / 0.5)", color: "oklch(0.8 0.04 210)", fontFamily: "'Inter', sans-serif" }}
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h9M7 3l3 3-3 3" stroke="#0B0F19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: open ? "oklch(0.15 0.025 240)" : "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))",
          boxShadow: "0 0 30px oklch(0.65 0.2 210 / 0.4)",
          border: "1px solid oklch(0.65 0.2 210 / 0.3)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
              style={{ color: "oklch(0.8 0.2 195)", fontSize: 16 }}>✕</motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="#0B0F19" strokeWidth="1.5"/>
                <path d="M7 8.5c0-1.1 1.1-2 2.5-2s2 .8 2 1.8c0 1-.7 1.5-1.5 2v1" stroke="#0B0F19" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="14" r=".7" fill="#0B0F19"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
