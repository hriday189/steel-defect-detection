import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const STATS = [
  { value: 98.7, suffix: "%", label: "Detection Accuracy", sublabel: "on NEU dataset test set", color: "oklch(0.8 0.2 195)", decimals: 1 },
  { value: 30, suffix: "ms", label: "Processing Speed", sublabel: "per image inference", color: "oklch(0.65 0.2 210)", decimals: 0 },
  { value: 60, suffix: " FPS", label: "Real-Time Detection", sublabel: "live camera stream", color: "oklch(0.75 0.15 160)", decimals: 0 },
  { value: 99.2, suffix: "%", label: "Industrial Precision", sublabel: "false positive rate < 0.8%", color: "oklch(0.78 0.2 50)", decimals: 1 },
]

function AnimatedCounter({ target, suffix, decimals, color, inView }: {
  target: number; suffix: string; decimals: number; color: string; inView: boolean
}) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const iv = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(target * eased)
      if (progress >= 1) clearInterval(iv)
    }, 16)
    return () => clearInterval(iv)
  }, [inView, target])

  return (
    <span style={{ color, fontFamily: "'Sora', sans-serif", textShadow: `0 0 30px ${color}60` }}>
      {decimals > 0 ? val.toFixed(decimals) : Math.floor(val)}{suffix}
    </span>
  )
}

export function PerformanceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative py-24" style={{ background: "oklch(0.085 0.012 240)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.65 0.2 210 / 0.06), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{ border: "1px solid oklch(0.78 0.2 50 / 0.3)", color: "oklch(0.78 0.2 50)", background: "oklch(0.78 0.2 50 / 0.05)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.78 0.2 50)" }} />
            BENCHMARK RESULTS
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Performance <span className="gradient-text">Metrics</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Benchmark results on NEU Surface Defect Database with YOLOv8 + CNN hybrid architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-2xl p-6 text-center group"
              style={{
                background: "oklch(0.12 0.018 240 / 0.8)",
                border: "1px solid oklch(0.22 0.035 240 / 0.6)",
              }}
              whileHover={{ y: -4 }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.border = `1px solid ${stat.color}40`
                el.style.boxShadow = `0 0 40px ${stat.color}15, 0 8px 40px rgba(0,0,0,0.3)`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.border = "1px solid oklch(0.22 0.035 240 / 0.6)"
                el.style.boxShadow = "none"
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${stat.color}06, transparent 70%)` }}
              />

              {/* Animated ring */}
              <div className="relative inline-block mb-4">
                <motion.div
                  className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
                  style={{
                    background: `conic-gradient(${stat.color} 0deg, ${stat.color}30 ${(stat.value / 100) * 360}deg, oklch(0.2 0.03 240) ${(stat.value / 100) * 360}deg)`,
                  }}
                  animate={inView ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.12 0.018 240)" }}
                  />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-extrabold">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} color={stat.color} inView={inView} />
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.label}
              </h3>
              <p className="text-xs" style={{ color: "oklch(0.5 0.04 210)" }}>{stat.sublabel}</p>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
