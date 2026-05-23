import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const TECHS = [
  { name: "Python", desc: "Core language for AI pipeline", icon: "🐍", color: "oklch(0.78 0.2 50)" },
  { name: "PyTorch", desc: "Deep learning framework", icon: "🔥", color: "oklch(0.78 0.2 50)" },
  { name: "OpenCV", desc: "Image preprocessing & vision", icon: "👁", color: "oklch(0.8 0.2 195)" },
  { name: "YOLOv8", desc: "Real-time object detection", icon: "⚡", color: "oklch(0.65 0.2 210)" },
  { name: "CNN", desc: "Feature extraction & classification", icon: "🧠", color: "oklch(0.68 0.18 270)" },
  { name: "NumPy", desc: "Numerical computing arrays", icon: "📊", color: "oklch(0.75 0.15 160)" },
  { name: "FastAPI", desc: "High-performance REST API", icon: "🚀", color: "oklch(0.75 0.15 160)" },
  { name: "NEU Dataset", desc: "6-class defect database", icon: "🗄", color: "oklch(0.65 0.25 330)" },
]

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="tech" ref={ref} className="relative py-24" style={{ background: "#0B0F19" }}>
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{ border: "1px solid oklch(0.75 0.15 160 / 0.3)", color: "oklch(0.75 0.15 160)", background: "oklch(0.75 0.15 160 / 0.05)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.75 0.15 160)" }} />
            POWERED BY
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Built on cutting-edge open source technologies powering industrial AI inspection worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TECHS.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative rounded-xl p-5 text-center cursor-default"
              style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)", transformStyle: "preserve-3d" }}
              whileHover={{ y: -6, scale: 1.03, rotateY: 5 }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.border = `1px solid ${tech.color}40`
                el.style.boxShadow = `0 8px 40px ${tech.color}20, 0 0 20px ${tech.color}15`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.border = "1px solid oklch(0.25 0.04 240 / 0.5)"
                el.style.boxShadow = "none"
              }}
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${tech.color}08, transparent 70%)` }}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{ background: `${tech.color}10`, border: `1px solid ${tech.color}25` }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                {tech.icon}
              </motion.div>

              <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {tech.name}
              </h3>
              <p className="text-[11px] leading-relaxed" style={{ color: "oklch(0.5 0.04 210)" }}>
                {tech.desc}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${tech.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
