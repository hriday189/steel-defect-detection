import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const phases = [
    "INITIALIZING NEURAL NETWORK...",
    "LOADING YOLO v8 MODEL...",
    "CALIBRATING DETECTION MATRIX...",
    "SYSTEM READY",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 600)
          return 100
        }
        return prev + 1.2
      })
    }, 28)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (progress < 25) setPhase(0)
    else if (progress < 55) setPhase(1)
    else if (progress < 80) setPhase(2)
    else setPhase(3)
  }, [progress])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0B0F19" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Animated corner brackets */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          "top-8 left-8 border-l-2 border-t-2",
          "top-8 right-8 border-r-2 border-t-2",
          "bottom-8 left-8 border-l-2 border-b-2",
          "bottom-8 right-8 border-r-2 border-b-2",
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-12 h-12 ${cls}`}
            style={{ borderColor: "oklch(0.8 0.2 195)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
        ))}
      </div>

      {/* Scanning line across full screen */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.8 0.2 195 / 0.8), oklch(0.65 0.2 210), oklch(0.8 0.2 195 / 0.8), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Animated hexagon icon */}
          <div className="relative w-20 h-20">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid oklch(0.8 0.2 195 / 0.6)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{ border: "1px dashed oklch(0.65 0.2 210 / 0.4)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-sm"
                style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))", boxShadow: "0 0 20px oklch(0.8 0.2 195 / 0.6)" }}
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest gradient-text" style={{ fontFamily: "'Sora', sans-serif" }}>
              STEELVISION
            </h1>
            <p className="text-xs tracking-[0.4em] mt-1" style={{ color: "oklch(0.8 0.2 195)" }}>AI DEFECT DETECTION</p>
          </div>
        </motion.div>

        {/* Detection grid visualization */}
        <motion.div
          className="relative w-64 h-40 rounded-lg overflow-hidden"
          style={{ border: "1px solid oklch(0.65 0.2 210 / 0.3)", background: "oklch(0.1 0.015 240 / 0.8)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(oklch(0.65 0.2 210 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 210 / 0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px"
            }}
          />
          {/* Fake detection boxes */}
          {[
            { x: "15%", y: "20%", w: "30%", h: "40%", label: "CRACK", conf: "97.3%" },
            { x: "55%", y: "30%", w: "25%", h: "30%", label: "SCRATCH", conf: "94.1%" },
          ].map((box, i) => (
            <motion.div
              key={i}
              className="absolute detection-box"
              style={{ left: box.x, top: box.y, width: box.w, height: box.h, border: "1px solid oklch(0.8 0.2 195)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.3 }}
            >
              <span className="absolute -top-4 left-0 text-[8px] font-mono px-1"
                style={{ background: "oklch(0.8 0.2 195)", color: "#0B0F19" }}>
                {box.label} {box.conf}
              </span>
            </motion.div>
          ))}
          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.8 0.2 195), transparent)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute bottom-2 left-2 text-[9px] font-mono" style={{ color: "oklch(0.8 0.2 195)" }}>
            SCANNING...
          </div>
        </motion.div>

        {/* Phase text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs font-mono tracking-widest"
            style={{ color: "oklch(0.8 0.2 195)" }}
          >
            {phases[phase]}
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-64">
          <div className="flex justify-between text-xs font-mono mb-2" style={{ color: "oklch(0.55 0.05 210)" }}>
            <span>LOADING</span>
            <span style={{ color: "oklch(0.8 0.2 195)" }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "oklch(0.2 0.03 240)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))",
                boxShadow: "0 0 8px oklch(0.8 0.2 195 / 0.8)"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
