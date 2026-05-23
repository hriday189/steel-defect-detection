export function Footer() {
  return (
    <footer className="relative py-12 border-t" style={{ background: "oklch(0.08 0.01 240)", borderColor: "oklch(0.2 0.03 240 / 0.5)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-sm flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))", boxShadow: "0 0 12px oklch(0.8 0.2 195 / 0.4)" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1L9 3V7L5 9L1 7V3L5 1Z" stroke="#0B0F19" strokeWidth="1" fill="none"/>
                  <circle cx="5" cy="5" r="1.5" fill="#0B0F19"/>
                </svg>
              </div>
              <span className="text-sm font-bold tracking-widest gradient-text" style={{ fontFamily: "'Sora', sans-serif" }}>
                STEELVISION AI
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "oklch(0.45 0.04 210)", fontFamily: "'Inter', sans-serif" }}>
              Industrial-grade AI platform for steel surface defect detection powered by YOLOv8 and deep learning.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "oklch(0.45 0.04 210)" }}>PLATFORM</div>
            <div className="flex flex-col gap-2">
              {["Detection System", "Analytics Dashboard", "API Documentation", "Model Training"].map((l) => (
                <a key={l} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "oklch(0.45 0.04 210)" }}>SYSTEM STATUS</div>
            <div className="space-y-2">
              {[
                { label: "Detection Engine", status: "ONLINE", color: "oklch(0.75 0.15 160)" },
                { label: "API Server", status: "ONLINE", color: "oklch(0.75 0.15 160)" },
                { label: "Model v2.0", status: "ACTIVE", color: "oklch(0.8 0.2 195)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span style={{ color: "oklch(0.55 0.04 210)", fontFamily: "'Space Grotesk', sans-serif" }}>{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.color }} />
                    <span className="font-mono text-[10px]" style={{ color: item.color }}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: "oklch(0.18 0.03 240 / 0.5)" }}>
          <p className="text-xs font-mono" style={{ color: "oklch(0.4 0.03 210)" }}>
            © 2026 SteelVision AI • Powered by YOLOv8 & PyTorch • NEU Surface Defect Database
          </p>
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "oklch(0.4 0.03 210)" }}>
            <span>Built with</span>
            <span style={{ color: "oklch(0.8 0.2 195)" }}>React</span>
            <span>+</span>
            <span style={{ color: "oklch(0.65 0.2 210)" }}>FastAPI</span>
            <span>+</span>
            <span style={{ color: "oklch(0.75 0.15 160)" }}>YOLOv8</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
