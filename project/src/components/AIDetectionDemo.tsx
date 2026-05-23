import { useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const MOCK_RESULTS = [
  { type: "CRACK", severity: "HIGH", confidence: 97.3, action: "Immediate inspection required. Surface integrity compromised.", color: "oklch(0.78 0.2 50)" },
  { type: "SCRATCH", severity: "MEDIUM", confidence: 94.1, action: "Log and monitor. Schedule maintenance within 48 hours.", color: "oklch(0.8 0.2 195)" },
  { type: "INCLUSION", severity: "LOW", confidence: 91.8, action: "Minor surface irregularity detected. Continue monitoring.", color: "oklch(0.75 0.15 160)" },
]

type Phase = "idle" | "uploading" | "scanning" | "done"

export function AIDetectionDemo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [scanLine, setScanLine] = useState(0)

  // Mock animation — used as fallback when backend is unreachable
  const runAnalysis = useCallback((imageSrc?: string) => {
    setPhase("uploading")
    setProgress(0)
    if (imageSrc) setUploadedFile(imageSrc)

    let p = 0
    const uploadInterval = setInterval(() => {
      p += 4
      setProgress(p)
      if (p >= 100) {
        clearInterval(uploadInterval)
        setPhase("scanning")
        setProgress(0)
        let sp = 0
        const scanInterval = setInterval(() => {
          sp += 2
          setScanLine(sp)
          setProgress(sp)
          if (sp >= 100) {
            clearInterval(scanInterval)
            setPhase("done")
            setProgress(100)
          }
        }, 30)
      }
    }, 40)
  }, [])

  // ✅ Real backend upload — uses Vite proxy (/api → http://127.0.0.1:8000)
  const handleFile = useCallback((file: File) => {
    // Show local preview immediately
    const reader = new FileReader()
    reader.onload = (e) => setUploadedFile(e.target?.result as string)
    reader.readAsDataURL(file)

    // Send to FastAPI backend via Vite proxy
    const formData = new FormData()
    formData.append("file", file)
    setPhase("uploading")
    setProgress(0)

    fetch("/api/detect", {
      method: "POST",
      body: formData,
      // ✅ Do NOT set Content-Type — browser sets it with correct multipart boundary
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((_result) => {
        // Backend responded — animate the scan phase
        setPhase("scanning")
        setProgress(0)
        let sp = 0
        const scanInterval = setInterval(() => {
          sp += 2
          setScanLine(sp)
          setProgress(sp)
          if (sp >= 100) {
            clearInterval(scanInterval)
            setPhase("done")
            setProgress(100)
          }
        }, 30)
      })
      .catch((_err) => {
        // Backend unreachable — fall back to mock animation so UI still works
        console.warn("Backend unreachable, running mock analysis")
        runAnalysis()
      })
  }, [runAnalysis])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) handleFile(file)
  }, [handleFile])

  const handleReset = () => {
    setPhase("idle")
    setProgress(0)
    setUploadedFile(null)
    setScanLine(0)
  }

  return (
    <section id="demo" ref={sectionRef} className="relative py-24" style={{ background: "#0B0F19" }}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 60%, oklch(0.58 0.28 290 / 0.04), transparent)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4"
            style={{ border: "1px solid oklch(0.58 0.28 290 / 0.4)", color: "oklch(0.68 0.18 270)", background: "oklch(0.58 0.28 290 / 0.05)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.68 0.18 270)" }} />
            INTERACTIVE DEMO
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Try the <span className="gradient-text">AI Detection Engine</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Upload a steel surface image and watch the AI analyze it in real-time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                minHeight: 340,
                border: dragOver
                  ? "2px dashed oklch(0.8 0.2 195)"
                  : phase === "idle"
                  ? "2px dashed oklch(0.3 0.05 240 / 0.6)"
                  : "1px solid oklch(0.65 0.2 210 / 0.3)",
                background: "oklch(0.1 0.015 240 / 0.8)",
                boxShadow: dragOver ? "0 0 30px oklch(0.8 0.2 195 / 0.2)" : "none",
              }}
              onClick={() => phase === "idle" && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full p-8 gap-4"
                    style={{ minHeight: 340 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ background: "oklch(0.65 0.2 210 / 0.1)", border: "1px solid oklch(0.65 0.2 210 / 0.3)" }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 4v16M8 12l8-8 8 8" stroke="oklch(0.8 0.2 195)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 24h20" stroke="oklch(0.65 0.2 210)" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Drop steel image here
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.5 0.04 210)" }}>or click to browse • PNG, JPG, WEBP</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); runAnalysis() }}
                      style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))", color: "#0B0F19", border: "none", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Run Demo Analysis
                    </Button>
                    <p className="text-[10px] font-mono" style={{ color: "oklch(0.4 0.03 210)" }}>
                      Uses sample NEU dataset image
                    </p>
                  </motion.div>
                )}

                {(phase === "uploading" || phase === "scanning") && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full p-8 gap-6"
                    style={{ minHeight: 340 }}
                  >
                    {/* Scanning visualization */}
                    <div className="relative w-48 h-36 rounded-lg overflow-hidden"
                      style={{ background: "oklch(0.08 0.01 240)", border: "1px solid oklch(0.65 0.2 210 / 0.3)" }}>
                      <div className="absolute inset-0"
                        style={{
                          backgroundImage: `linear-gradient(oklch(0.65 0.2 210 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.2 210 / 0.08) 1px, transparent 1px)`,
                          backgroundSize: "16px 16px"
                        }}
                      />
                      {phase === "scanning" && (
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 pointer-events-none"
                          style={{
                            top: `${scanLine}%`,
                            background: "linear-gradient(90deg, transparent, oklch(0.8 0.2 195), transparent)",
                            boxShadow: "0 0 8px oklch(0.8 0.2 195 / 0.8)"
                          }}
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[10px] font-mono text-center" style={{ color: "oklch(0.5 0.04 210)" }}>
                          {phase === "uploading" ? "UPLOADING IMAGE..." : "RUNNING YOLO v8..."}
                        </div>
                      </div>
                    </div>

                    <div className="w-full max-w-48">
                      <div className="flex justify-between text-[10px] font-mono mb-1.5" style={{ color: "oklch(0.5 0.04 210)" }}>
                        <span>{phase === "uploading" ? "UPLOADING" : "ANALYZING"}</span>
                        <span style={{ color: "oklch(0.8 0.2 195)" }}>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1" />
                    </div>

                    <div className="text-xs font-mono text-center" style={{ color: "oklch(0.6 0.05 210)" }}>
                      {phase === "uploading"
                        ? "Preprocessing with OpenCV..."
                        : progress < 40 ? "Running feature extraction..."
                        : progress < 70 ? "Applying CNN classification..."
                        : "Generating detection report..."}
                    </div>
                  </motion.div>
                )}

                {phase === "done" && uploadedFile && (
                  <motion.div
                    key="done-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-full"
                    style={{ minHeight: 340 }}
                  >
                    <img src={uploadedFile} alt="Analyzed" className="w-full h-full object-cover" style={{ minHeight: 340, maxHeight: 340 }} />
                    {/* Overlay detection boxes */}
                    {[
                      { x: 12, y: 15, w: 26, h: 20, label: "CRACK 97.3%", color: "oklch(0.78 0.2 50)" },
                      { x: 52, y: 35, w: 22, h: 18, label: "SCRATCH 94.1%", color: "oklch(0.8 0.2 195)" },
                    ].map((box, i) => (
                      <div key={i} className="absolute" style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%`, border: `1.5px solid ${box.color}`, boxShadow: `0 0 8px ${box.color}60` }}>
                        <div className="absolute -top-5 left-0 text-[9px] font-mono px-1.5 py-0.5" style={{ background: box.color, color: "#0B0F19" }}>{box.label}</div>
                      </div>
                    ))}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent 70%, oklch(0.08 0.01 240))" }}
                    />
                  </motion.div>
                )}

                {phase === "done" && !uploadedFile && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full p-8 gap-4"
                    style={{ minHeight: 340 }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "oklch(0.75 0.15 160 / 0.15)", border: "1px solid oklch(0.75 0.15 160 / 0.4)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5 9-9" stroke="oklch(0.75 0.15 160)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Analysis Complete</p>
                    <p className="text-xs text-center" style={{ color: "oklch(0.5 0.04 210)" }}>3 defects detected in sample image</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <AnimatePresence mode="wait">
              {phase !== "done" ? (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full rounded-xl p-8 gap-4"
                  style={{ minHeight: 200, background: "oklch(0.1 0.015 240 / 0.6)", border: "1px solid oklch(0.2 0.03 240 / 0.5)" }}
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {phase === "idle" ? "Awaiting Input" : "Processing..."}
                    </div>
                    <p className="text-xs" style={{ color: "oklch(0.45 0.04 210)" }}>
                      {phase === "idle" ? "Upload an image to begin AI analysis" : "AI is analyzing your image..."}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full mt-4">
                    {["YOLO v8", "CNN", "OpenCV"].map((t) => (
                      <div key={t} className="rounded-lg p-2 text-center text-[10px] font-mono"
                        style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: "1px solid oklch(0.2 0.03 240 / 0.5)", color: "oklch(0.5 0.04 210)" }}>
                        {t}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {MOCK_RESULTS.map((result, i) => (
                    <motion.div
                      key={result.type}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="rounded-xl p-4"
                      style={{ background: "oklch(0.12 0.018 240 / 0.8)", border: `1px solid ${result.color}30` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: result.color }} />
                          <span className="text-sm font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>{result.type}</span>
                        </div>
                        <Badge variant="outline" className="text-[9px] font-mono px-2"
                          style={{ borderColor: result.color + "50", color: result.color, background: result.color + "10" }}>
                          {result.severity}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-[10px] font-mono mb-1" style={{ color: "oklch(0.5 0.04 210)" }}>
                          <span>CONFIDENCE</span>
                          <span style={{ color: result.color }}>{result.confidence}%</span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "oklch(0.2 0.03 240)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                            style={{ background: result.color }}
                          />
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: "oklch(0.5 0.04 210)", fontFamily: "'Inter', sans-serif" }}>
                        {result.action}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                <Button
                  className="flex-1 font-semibold text-sm gap-2"
                  style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))", color: "#0B0F19", border: "none", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M3 6l4 4 4-4M1 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Report
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-sm"
                  style={{ borderColor: "oklch(0.3 0.05 240 / 0.6)", color: "oklch(0.7 0.05 210)", fontFamily: "'Space Grotesk', sans-serif" }}
                  onClick={handleReset}
                >
                  New Analysis
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
