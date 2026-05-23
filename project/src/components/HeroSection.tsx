import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const DEFECT_BOXES = [
  { x: 10, y: 15, w: 22, h: 18, label: "CRACK", conf: 97.3, color: "oklch(0.8 0.2 195)" },
  { x: 45, y: 25, w: 18, h: 14, label: "SCRATCH", conf: 94.1, color: "oklch(0.68 0.18 270)" },
  { x: 70, y: 50, w: 15, h: 20, label: "INCLUSION", conf: 91.8, color: "oklch(0.78 0.2 50)" },
  { x: 25, y: 60, w: 20, h: 16, label: "PITTED", conf: 88.5, color: "oklch(0.65 0.25 330)" },
]

function FloatingParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 3,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: Math.random() > 0.5 ? "oklch(0.8 0.2 195 / 0.6)" : "oklch(0.65 0.2 210 / 0.4)",
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

function AIDetectionInterface() {
  const [scanPos, setScanPos] = useState(0)
  const [activeBox, setActiveBox] = useState(0)

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanPos((prev) => (prev >= 100 ? 0 : prev + 0.5))
    }, 20)
    const boxInterval = setInterval(() => {
      setActiveBox((prev) => (prev + 1) % DEFECT_BOXES.length)
    }, 1800)
    return () => { clearInterval(scanInterval); clearInterval(boxInterval) }
  }, [])

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        aspectRatio: "16/10",
        background: "oklch(0.08 0.01 240)",
        border: "1px solid oklch(0.65 0.2 210 / 0.3)",
        boxShadow: "0 0 60px oklch(0.65 0.2 210 / 0.2), 0 0 120px oklch(0.65 0.2 210 / 0.05)",
      }}
    >
      {/* Steel surface texture simulation */}
      <div className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(0deg, oklch(0.12 0.01 220 / 0.5) 0px, oklch(0.15 0.015 220 / 0.3) 2px, transparent 2px, transparent 8px),
            repeating-linear-gradient(90deg, oklch(0.1 0.01 220 / 0.2) 0px, transparent 1px, transparent 20px),
            linear-gradient(180deg, oklch(0.14 0.015 225) 0%, oklch(0.11 0.01 240) 50%, oklch(0.13 0.012 230) 100%)
          `
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(oklch(0.65 0.2 210 / 0.07) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 210 / 0.07) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 pointer-events-none z-10"
        style={{
          top: `${scanPos}%`,
          background: "linear-gradient(90deg, transparent, oklch(0.8 0.2 195 / 0.9), oklch(0.65 0.2 210), oklch(0.8 0.2 195 / 0.9), transparent)",
          boxShadow: "0 0 10px oklch(0.8 0.2 195 / 0.8), 0 0 20px oklch(0.8 0.2 195 / 0.3)",
        }}
      />

      {/* Detection boxes */}
      {DEFECT_BOXES.map((box, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.w}%`,
            height: `${box.h}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i <= activeBox ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Box border with corner accents */}
          <div className="absolute inset-0" style={{ border: `1px solid ${box.color}`, boxShadow: `0 0 8px ${box.color}40, inset 0 0 8px ${box.color}10` }} />
          {/* Corner L-shapes */}
          {[
            "top-0 left-0 border-l-2 border-t-2",
            "top-0 right-0 border-r-2 border-t-2",
            "bottom-0 left-0 border-l-2 border-b-2",
            "bottom-0 right-0 border-r-2 border-b-2",
          ].map((cls, ci) => (
            <div key={ci} className={`absolute w-3 h-3 ${cls}`} style={{ borderColor: box.color }} />
          ))}
          {/* Label */}
          <div
            className="absolute -top-5 left-0 text-[9px] font-mono px-1.5 py-0.5 whitespace-nowrap"
            style={{ background: box.color, color: "#0B0F19", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {box.label} {box.conf}%
          </div>
          {/* Confidence fill */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ background: box.color }}
            animate={{ opacity: i === activeBox ? [0.05, 0.15, 0.05] : 0.05 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      ))}

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-1.5"
        style={{ background: "oklch(0.1 0.015 240 / 0.9)", borderBottom: "1px solid oklch(0.65 0.2 210 / 0.2)" }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.75 0.15 160)" }} />
          <span className="text-[10px] font-mono" style={{ color: "oklch(0.75 0.15 160)" }}>LIVE FEED</span>
        </div>
        <span className="text-[10px] font-mono" style={{ color: "oklch(0.55 0.05 210)" }}>CAM_01 • YOLOv8 • 60 FPS</span>
        <span className="text-[10px] font-mono" style={{ color: "oklch(0.8 0.2 195)" }}>{DEFECT_BOXES.length} DEFECTS DETECTED</span>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-1.5"
        style={{ background: "oklch(0.1 0.015 240 / 0.9)", borderTop: "1px solid oklch(0.65 0.2 210 / 0.2)" }}>
        <div className="flex gap-3">
          {[
            { label: "ACCURACY", val: "98.7%" },
            { label: "LATENCY", val: "28ms" },
            { label: "MODEL", val: "YOLOv8" },
          ].map((item) => (
            <div key={item.label} className="text-[9px] font-mono">
              <span style={{ color: "oklch(0.45 0.04 210)" }}>{item.label}: </span>
              <span style={{ color: "oklch(0.8 0.2 195)" }}>{item.val}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "oklch(0.65 0.2 210)" }} />
          <span className="text-[9px] font-mono" style={{ color: "oklch(0.65 0.2 210)" }}>PROCESSING</span>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0B0F19" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.65 0.2 210 / 0.06) 0%, transparent 70%)" }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Left side vertical accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px opacity-30"
        style={{ background: "linear-gradient(180deg, transparent, oklch(0.65 0.2 210), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="mb-4 text-xs font-mono tracking-widest px-3 py-1"
                style={{ borderColor: "oklch(0.8 0.2 195 / 0.4)", color: "oklch(0.8 0.2 195)", background: "oklch(0.8 0.2 195 / 0.05)" }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full mr-2 inline-block"
                  style={{ background: "oklch(0.75 0.15 160)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                NEXT-GEN INDUSTRIAL AI • v2.0
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              style={{ fontFamily: "'Sora', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="gradient-text">Steel Surface</span>
              <br />
              <span className="text-white">Defect Detection</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg max-w-md leading-relaxed"
              style={{ color: "oklch(0.6 0.05 210)", fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Real-time industrial quality inspection using Computer Vision and Deep Learning. Detect cracks, scratches, inclusions and more with{" "}
              <span style={{ color: "oklch(0.8 0.2 195)" }}>98.7% accuracy</span> in under 30ms.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="font-semibold tracking-wide gap-2"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))",
                  border: "none",
                  color: "#0B0F19",
                  boxShadow: "0 0 30px oklch(0.65 0.2 210 / 0.4), 0 4px 20px oklch(0.65 0.2 210 / 0.3)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onClick={() => document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Launch Detection System</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold tracking-wide"
                style={{
                  borderColor: "oklch(0.65 0.2 210 / 0.4)",
                  color: "oklch(0.8 0.05 210)",
                  background: "oklch(0.65 0.2 210 / 0.05)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onClick={() => document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Live Demo
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { val: "98.7%", label: "Accuracy" },
                { val: "<30ms", label: "Processing" },
                { val: "6", label: "Defect Types" },
                { val: "YOLOv8", label: "AI Model" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-lg font-bold gradient-text" style={{ fontFamily: "'Sora', sans-serif" }}>{stat.val}</span>
                  <span className="text-xs" style={{ color: "oklch(0.5 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: AI detection interface */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind interface */}
            <div className="absolute -inset-4 rounded-2xl"
              style={{ background: "radial-gradient(ellipse at center, oklch(0.65 0.2 210 / 0.15), transparent 70%)", filter: "blur(20px)" }}
            />
            <AIDetectionInterface />

            {/* Floating info cards */}
            <motion.div
              className="absolute -left-4 top-1/3 glass rounded-lg p-3 hidden lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-xs font-mono" style={{ color: "oklch(0.55 0.05 210)" }}>DETECTED</div>
              <div className="text-xl font-bold gradient-text" style={{ fontFamily: "'Sora', sans-serif" }}>4</div>
              <div className="text-xs" style={{ color: "oklch(0.6 0.05 210)" }}>Defects Found</div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-1/4 glass rounded-lg p-3 hidden lg:block"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-xs font-mono" style={{ color: "oklch(0.55 0.05 210)" }}>CONFIDENCE</div>
              <div className="text-xl font-bold" style={{ color: "oklch(0.8 0.2 195)", fontFamily: "'Sora', sans-serif" }}>97.3%</div>
              <div className="text-xs" style={{ color: "oklch(0.6 0.05 210)" }}>Avg Score</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: "oklch(0.45 0.04 210)" }}>SCROLL</span>
          <div className="w-4 h-6 rounded-full flex items-start justify-center pt-1" style={{ border: "1px solid oklch(0.45 0.04 210 / 0.5)" }}>
            <motion.div className="w-0.5 h-2 rounded-full" style={{ background: "oklch(0.8 0.2 195)" }} animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
