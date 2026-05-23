import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const DEFECT_TYPES = [
  { name: "Crazing", category: "Surface", color: "oklch(0.8 0.2 195)", pattern: "crack" },
  { name: "Inclusion", category: "Embedded", color: "oklch(0.68 0.18 270)", pattern: "inclusion" },
  { name: "Patches", category: "Surface", color: "oklch(0.75 0.15 160)", pattern: "patches" },
  { name: "Pitted Surface", category: "Corrosion", color: "oklch(0.78 0.2 50)", pattern: "pitted" },
  { name: "Rolled-in Scale", category: "Processing", color: "oklch(0.65 0.25 330)", pattern: "scale" },
  { name: "Scratches", category: "Mechanical", color: "oklch(0.65 0.2 210)", pattern: "scratch" },
]

function DefectVisualization({ color, pattern }: { color: string; pattern: string }) {
  return (
    <div
      className="w-full h-full relative"
      style={{ background: "oklch(0.12 0.015 230)" }}
    >
      {/* Simulated steel texture */}
      <div className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(0deg, oklch(0.14 0.012 225 / 0.4) 0px, transparent 2px, transparent 10px),
            repeating-linear-gradient(90deg, oklch(0.1 0.008 230 / 0.2) 0px, transparent 1px, transparent 30px),
            oklch(0.13 0.01 228)
          `
        }}
      />

      {/* Defect pattern overlay */}
      {pattern === "crack" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M20 30 L35 45 L30 55 L50 75 L45 85" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7"/>
          <path d="M60 20 L70 35 L65 45 L75 60" stroke={color} strokeWidth="1" fill="none" opacity="0.5"/>
        </svg>
      )}
      {pattern === "inclusion" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            [30, 35, 8, 5], [60, 55, 6, 7], [45, 70, 10, 4], [70, 25, 5, 6]
          ].map(([cx, cy, rx, ry], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={0.4 + i * 0.1}/>
          ))}
        </svg>
      )}
      {pattern === "patches" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            "M20 30 Q35 25 40 40 Q45 55 30 55 Q20 50 20 30Z",
            "M60 50 Q75 45 78 60 Q80 75 65 72 Q55 65 60 50Z",
          ].map((d, i) => (
            <path key={i} d={d} fill={color} opacity={0.3 + i * 0.1} />
          ))}
        </svg>
      )}
      {pattern === "pitted" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={15 + (i % 4) * 22 + (i % 3) * 3} cy={20 + Math.floor(i / 4) * 25 + (i % 2) * 5} r={2 + Math.random() * 3} fill={color} opacity={0.5} />
          ))}
        </svg>
      )}
      {pattern === "scale" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[
            "M25 35 L45 30 L50 45 L30 50Z",
            "M55 55 L75 50 L78 65 L58 68Z",
          ].map((d, i) => (
            <path key={i} d={d} fill={color} opacity={0.35 + i * 0.1} />
          ))}
        </svg>
      )}
      {pattern === "scratch" && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="15" y1="25" x2="85" y2="30" stroke={color} strokeWidth="1.5" opacity="0.6"/>
          <line x1="20" y1="45" x2="80" y2="48" stroke={color} strokeWidth="1" opacity="0.5"/>
          <line x1="25" y1="65" x2="75" y2="70" stroke={color} strokeWidth="0.8" opacity="0.4"/>
        </svg>
      )}

      {/* AI scan overlay on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }}
      />
    </div>
  )
}

export function DatasetShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="dataset" ref={ref} className="relative py-24" style={{ background: "#0B0F19" }}>
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{ border: "1px solid oklch(0.65 0.25 330 / 0.3)", color: "oklch(0.65 0.25 330)", background: "oklch(0.65 0.25 330 / 0.05)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.65 0.25 330)" }} />
            NEU SURFACE DEFECT DATABASE
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Defect <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Six distinct defect categories from the NEU Surface Defect Database, used to train our AI models with 1,800+ annotated samples.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DEFECT_TYPES.map((defect, i) => (
            <motion.div
              key={defect.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ border: hovered === i ? `1px solid ${defect.color}60` : "1px solid oklch(0.2 0.03 240 / 0.5)", aspectRatio: "4/3" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Defect visualization */}
              <DefectVisualization color={defect.color} pattern={defect.pattern} />

              {/* AI scan effect on hover */}
              {hovered === i && (
                <motion.div
                  className="absolute left-0 right-0 h-0.5 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${defect.color}, transparent)`, boxShadow: `0 0 8px ${defect.color}` }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* Label overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4"
                style={{ background: "linear-gradient(to top, oklch(0.08 0.01 240 / 0.9) 0%, transparent 60%)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono tracking-widest mb-0.5" style={{ color: defect.color }}>{defect.category.toUpperCase()}</div>
                    <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{defect.name}</h3>
                  </div>
                  <div className="w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${defect.color}20`, border: `1px solid ${defect.color}40` }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 8l6-6M3 2h5v5" stroke={defect.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Top-right corner detection indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: defect.color, color: "#0B0F19" }}>
                  AI DETECTED
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
            style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}>
            <div className="text-xs font-mono" style={{ color: "oklch(0.5 0.04 210)" }}>Dataset:</div>
            <div className="text-sm font-bold gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              NEU Surface Defect Database
            </div>
            <div className="w-px h-4" style={{ background: "oklch(0.3 0.04 240)" }} />
            <div className="text-xs font-mono" style={{ color: "oklch(0.5 0.04 210)" }}>1,800 images • 6 classes • 300 per class</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
