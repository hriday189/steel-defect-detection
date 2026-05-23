import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const STEPS = [
  {
    num: "01",
    title: "Capture Steel Image",
    desc: "Industrial camera captures high-resolution steel surface at 60 FPS",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10l6-2v8l-6-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    color: "oklch(0.8 0.2 195)",
  },
  {
    num: "02",
    title: "Preprocess with OpenCV",
    desc: "Noise reduction, contrast enhancement, and edge detection via OpenCV",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
        <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: "oklch(0.65 0.2 210)",
  },
  {
    num: "03",
    title: "Run YOLO Detection",
    desc: "YOLOv8 model detects and localizes defects with bounding boxes",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="5" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 5L2 2M19 5l3-3M5 19l-3 3M19 19l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    color: "oklch(0.68 0.18 270)",
  },
  {
    num: "04",
    title: "CNN Classification",
    desc: "Deep CNN classifies defect type with confidence scoring",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 12h3M14 12h3M13.4 7.6l4.2 3.2M13.4 16.4l4.2-3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    color: "oklch(0.75 0.15 160)",
  },
  {
    num: "05",
    title: "Generate Analytics",
    desc: "Dashboard populated with detection stats, heatmaps, and trends",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 18l5-5 4 4 5-7 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: "oklch(0.78 0.2 50)",
  },
  {
    num: "06",
    title: "Export Inspection Report",
    desc: "Automated PDF/CSV report with defect map and corrective actions",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "oklch(0.65 0.25 330)",
  },
]

export function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="workflow" ref={ref} className="relative py-24" style={{ background: "oklch(0.085 0.012 240)" }}>
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 50%, oklch(0.65 0.2 210 / 0.03), transparent)" }} />

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
            PROCESS FLOW
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            From raw camera feed to actionable inspection report in under 100 milliseconds.
          </p>
        </motion.div>

        {/* Horizontal workflow on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px mx-16"
            style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.2 210 / 0.3), oklch(0.8 0.2 195 / 0.4), oklch(0.65 0.2 210 / 0.3), transparent)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <motion.div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                    border: `2px solid ${step.color}40`,
                    color: step.color,
                    boxShadow: `0 0 20px ${step.color}20`,
                  }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${step.color}40` }}
                >
                  {step.icon}
                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: step.color, color: "#0B0F19" }}>
                    {step.num.slice(-1)}
                  </div>
                </motion.div>

                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden w-px h-6 mb-2"
                    style={{ background: `linear-gradient(to bottom, ${step.color}60, ${STEPS[i + 1].color}60)` }}
                  />
                )}

                <div className="text-xs font-mono tracking-widest mb-1" style={{ color: step.color }}>{step.num}</div>
                <h3 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.5 0.04 210)" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
