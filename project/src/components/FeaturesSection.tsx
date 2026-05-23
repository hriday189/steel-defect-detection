import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Real-Time Defect Detection",
    desc: "Process steel surface images in under 30ms with live camera feed integration and instant defect identification.",
    color: "oklch(0.8 0.2 195)",
    tag: "CORE",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="16" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="16" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12v4M12 8h4M20 12v4M16 20h-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "YOLO Object Detection",
    desc: "State-of-the-art YOLOv8 model trained on NEU Surface Defect Database with bounding box precision.",
    color: "oklch(0.65 0.2 210)",
    tag: "AI",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L14 18L20 10L24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="14" r="2" fill="currentColor" opacity="0.6"/>
        <circle cx="14" cy="18" r="2" fill="currentColor" opacity="0.6"/>
        <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: "CNN Classification",
    desc: "Deep convolutional neural networks classify defect types with 98.7% accuracy across 6 defect categories.",
    color: "oklch(0.68 0.18 270)",
    tag: "DEEP LEARNING",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 10h4M7 14h8M7 18h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="17" y="10" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    title: "AI Inspection Dashboard",
    desc: "Comprehensive analytics dashboard with real-time charts, detection logs, and system performance metrics.",
    color: "oklch(0.75 0.15 160)",
    tag: "DASHBOARD",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h20M14 4v20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
        <circle cx="9" cy="9" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="19" cy="19" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: "Heatmap Visualization",
    desc: "Grad-CAM heatmaps reveal exactly which regions triggered defect detection for explainable AI insights.",
    color: "oklch(0.78 0.2 50)",
    tag: "VISUALIZATION",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 14h2M18 14h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <text x="10" y="18" fill="currentColor" fontSize="6" fontFamily="monospace">97%</text>
      </svg>
    ),
    title: "Confidence Score Tracking",
    desc: "Track AI confidence levels for each detection, filter by threshold, and monitor model certainty over time.",
    color: "oklch(0.65 0.25 330)",
    tag: "ANALYTICS",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M20 10h4M20 14h3M20 18h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <circle cx="12" cy="13" r="1" fill="currentColor"/>
      </svg>
    ),
    title: "Live Camera Feed",
    desc: "Direct integration with industrial cameras for continuous monitoring and real-time defect detection on production lines.",
    color: "oklch(0.72 0.22 195)",
    tag: "HARDWARE",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 8h16M6 12h12M6 16h14M6 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 16l4 4m0 0l-2 2-2-2 2-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Automated Reporting",
    desc: "Generate detailed PDF inspection reports with defect maps, statistics, and recommended corrective actions.",
    color: "oklch(0.68 0.18 270)",
    tag: "REPORTING",
  },
]

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-xl p-6 cursor-default transition-all duration-300"
      style={{
        background: "oklch(0.12 0.018 240 / 0.8)",
        border: "1px solid oklch(0.25 0.04 240 / 0.5)",
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.border = `1px solid ${feature.color}40`
        el.style.boxShadow = `0 0 30px ${feature.color}20, 0 4px 24px rgba(0,0,0,0.3)`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.border = "1px solid oklch(0.25 0.04 240 / 0.5)"
        el.style.boxShadow = "none"
      }}
    >
      {/* Animated gradient corner */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top right, ${feature.color}20, transparent)` }}
      />

      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
          style={{ color: feature.color, background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
        >
          {feature.icon}
        </div>
        <span
          className="text-[9px] font-mono tracking-widest px-2 py-1 rounded"
          style={{ color: feature.color, background: `${feature.color}10`, border: `1px solid ${feature.color}20` }}
        >
          {feature.tag}
        </span>
      </div>

      <h3
        className="text-base font-semibold mb-2 text-white group-hover:transition-colors"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Inter', sans-serif" }}>
        {feature.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.color}60, transparent)` }}
      />
    </motion.div>
  )
}

export function FeaturesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="features" className="relative py-24 overflow-hidden" style={{ background: "#0B0F19" }}>
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, #0B0F19, transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{ border: "1px solid oklch(0.65 0.2 210 / 0.3)", color: "oklch(0.8 0.2 195)", background: "oklch(0.65 0.2 210 / 0.05)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.8 0.2 195)" }} />
            CAPABILITIES
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Industrial-Grade <span className="gradient-text">AI Features</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            A complete suite of AI-powered tools designed for precision steel surface inspection in smart manufacturing environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
