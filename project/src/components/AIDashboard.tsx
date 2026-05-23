import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts"

const areaData = [
  { t: "00:00", detections: 12, accuracy: 97.2 },
  { t: "04:00", detections: 18, accuracy: 98.1 },
  { t: "08:00", detections: 35, accuracy: 97.8 },
  { t: "12:00", detections: 52, accuracy: 98.5 },
  { t: "16:00", detections: 44, accuracy: 98.9 },
  { t: "20:00", detections: 28, accuracy: 97.4 },
  { t: "Now", detections: 61, accuracy: 98.7 },
]

const pieData = [
  { name: "Cracks", value: 28, color: "oklch(0.8 0.2 195)" },
  { name: "Scratches", value: 22, color: "oklch(0.65 0.2 210)" },
  { name: "Inclusion", value: 18, color: "oklch(0.68 0.18 270)" },
  { name: "Patches", value: 15, color: "oklch(0.75 0.15 160)" },
  { name: "Pitted", value: 12, color: "oklch(0.78 0.2 50)" },
  { name: "Scales", value: 5, color: "oklch(0.65 0.25 330)" },
]

const barData = [
  { zone: "Zone A", defects: 14 },
  { zone: "Zone B", defects: 8 },
  { zone: "Zone C", defects: 22 },
  { zone: "Zone D", defects: 6 },
  { zone: "Zone E", defects: 17 },
  { zone: "Zone F", defects: 11 },
]

const logs = [
  { time: "14:32:01", type: "CRACK", conf: 97.3, severity: "HIGH", action: "FLAGGED" },
  { time: "14:31:48", type: "SCRATCH", conf: 94.1, severity: "MED", action: "LOGGED" },
  { time: "14:31:22", type: "INCLUSION", conf: 91.8, severity: "LOW", action: "LOGGED" },
  { time: "14:30:55", type: "PITTED", conf: 88.5, severity: "MED", action: "LOGGED" },
  { time: "14:30:30", type: "CRACK", conf: 96.1, severity: "HIGH", action: "FLAGGED" },
  { time: "14:30:05", type: "SCRATCH", conf: 89.3, severity: "LOW", action: "LOGGED" },
]

function StatCard({ label, value, sub, color, delay }: { label: string; value: string; sub?: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl p-5"
      style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}
    >
      <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "oklch(0.5 0.04 210)" }}>{label}</div>
      <div className="text-2xl font-bold mb-1" style={{ color, fontFamily: "'Sora', sans-serif", textShadow: `0 0 20px ${color}60` }}>
        {value}
      </div>
      {sub && <div className="text-xs" style={{ color: "oklch(0.45 0.04 210)" }}>{sub}</div>}
      <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(90deg, ${color}50, transparent)` }} />
    </motion.div>
  )
}

function SystemHealth({ label, val, color }: { label: string; val: number; color: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif", minWidth: 80 }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.2 0.03 240)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${val}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)`, boxShadow: `0 0 6px ${color}60` }}
        />
      </div>
      <span className="text-xs font-mono" style={{ color, minWidth: 32, textAlign: "right" }}>{val}%</span>
    </div>
  )
}

export function AIDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true })
  const [liveCount, setLiveCount] = useState(1284)

  useEffect(() => {
    const iv = setInterval(() => {
      setLiveCount((p) => p + Math.floor(Math.random() * 3))
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section id="dashboard" ref={sectionRef} className="relative py-24" style={{ background: "#0B0F19" }}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.65 0.2 210 / 0.04), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{ border: "1px solid oklch(0.65 0.2 210 / 0.3)", color: "oklch(0.8 0.2 195)", background: "oklch(0.65 0.2 210 / 0.05)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.75 0.15 160)" }} />
            LIVE ANALYTICS
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            AI Inspection <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Real-time analytics, detection logs, and system health monitoring in one industrial control center.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="TOTAL INSPECTED" value={liveCount.toLocaleString()} sub="surfaces today" color="oklch(0.8 0.2 195)" delay={0} />
          <StatCard label="DEFECTS FOUND" value="247" sub="across 6 types" color="oklch(0.78 0.2 50)" delay={0.1} />
          <StatCard label="ACCURACY" value="98.7%" sub="model confidence" color="oklch(0.75 0.15 160)" delay={0.2} />
          <StatCard label="AVG LATENCY" value="28ms" sub="per inference" color="oklch(0.65 0.2 210)" delay={0.3} />
        </div>

        {/* Main dashboard grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Detection timeline - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 rounded-xl p-5"
            style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "oklch(0.5 0.04 210)" }}>DETECTION TIMELINE</div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Defections & Accuracy (24h)</div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "oklch(0.8 0.2 195)" }} />
                  <span style={{ color: "oklch(0.55 0.04 210)" }}>Detections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "oklch(0.75 0.15 160)" }} />
                  <span style={{ color: "oklch(0.55 0.04 210)" }}>Accuracy %</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="detGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.8 0.2 195)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.8 0.2 195)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.75 0.15 160)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.75 0.15 160)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 240 / 0.3)" />
                <XAxis dataKey="t" tick={{ fill: "oklch(0.45 0.04 210)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.45 0.04 210)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "oklch(0.12 0.018 240)", border: "1px solid oklch(0.65 0.2 210 / 0.3)", borderRadius: 8, fontFamily: "monospace", fontSize: 11 }}
                  labelStyle={{ color: "oklch(0.8 0.2 195)" }}
                  itemStyle={{ color: "oklch(0.75 0.05 210)" }}
                />
                <Area type="monotone" dataKey="detections" stroke="oklch(0.8 0.2 195)" strokeWidth={2} fill="url(#detGrad)" />
                <Area type="monotone" dataKey="accuracy" stroke="oklch(0.75 0.15 160)" strokeWidth={2} fill="url(#accGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Defect distribution pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl p-5"
            style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}
          >
            <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "oklch(0.5 0.04 210)" }}>DEFECT DISTRIBUTION</div>
            <div className="text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>By Type</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.12 0.018 240)", border: "1px solid oklch(0.65 0.2 210 / 0.3)", borderRadius: 8, fontFamily: "monospace", fontSize: 11 }} itemStyle={{ color: "oklch(0.75 0.05 210)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                  <span style={{ color: "oklch(0.55 0.04 210)" }}>{item.name}</span>
                  <span className="ml-auto font-mono" style={{ color: item.color }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Zone bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-xl p-5"
            style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}
          >
            <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "oklch(0.5 0.04 210)" }}>DEFECTS BY ZONE</div>
            <div className="text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Inspection Zones</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.04 240 / 0.3)" />
                <XAxis dataKey="zone" tick={{ fill: "oklch(0.45 0.04 210)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.45 0.04 210)", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.12 0.018 240)", border: "1px solid oklch(0.65 0.2 210 / 0.3)", borderRadius: 8, fontFamily: "monospace", fontSize: 11 }} itemStyle={{ color: "oklch(0.75 0.05 210)" }} />
                <Bar dataKey="defects" fill="oklch(0.65 0.2 210)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* System health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl p-5"
            style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}
          >
            <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "oklch(0.5 0.04 210)" }}>SYSTEM HEALTH</div>
            <div className="space-y-4">
              <SystemHealth label="GPU Usage" val={87} color="oklch(0.8 0.2 195)" />
              <SystemHealth label="CPU Load" val={42} color="oklch(0.75 0.15 160)" />
              <SystemHealth label="Memory" val={68} color="oklch(0.65 0.2 210)" />
              <SystemHealth label="Model Conf." val={98} color="oklch(0.78 0.2 50)" />
              <SystemHealth label="Camera Feed" val={100} color="oklch(0.75 0.15 160)" />
            </div>
          </motion.div>

          {/* Detection logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="rounded-xl p-5"
            style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.25 0.04 240 / 0.5)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono tracking-widest" style={{ color: "oklch(0.5 0.04 210)" }}>DETECTION LOG</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.75 0.15 160)" }} />
                <span className="text-[10px] font-mono" style={{ color: "oklch(0.75 0.15 160)" }}>LIVE</span>
              </div>
            </div>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center justify-between text-[10px] font-mono py-1.5 px-2 rounded"
                  style={{ background: "oklch(0.1 0.012 240 / 0.5)", border: "1px solid oklch(0.2 0.03 240 / 0.5)" }}
                >
                  <span style={{ color: "oklch(0.45 0.04 210)" }}>{log.time}</span>
                  <span style={{ color: log.severity === "HIGH" ? "oklch(0.78 0.2 50)" : log.severity === "MED" ? "oklch(0.8 0.2 195)" : "oklch(0.65 0.2 210)" }}>
                    {log.type}
                  </span>
                  <span style={{ color: "oklch(0.75 0.15 160)" }}>{log.conf}%</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px]"
                    style={{
                      background: log.action === "FLAGGED" ? "oklch(0.78 0.2 50 / 0.2)" : "oklch(0.65 0.2 210 / 0.15)",
                      color: log.action === "FLAGGED" ? "oklch(0.78 0.2 50)" : "oklch(0.65 0.2 210)",
                    }}>
                    {log.action}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
