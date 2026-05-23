import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Demo", href: "#demo" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Dataset", href: "#dataset" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((window.scrollY / totalHeight) * 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="mx-4 mt-3 rounded-xl transition-all duration-500"
          style={{
            background: scrolled ? "oklch(0.1 0.015 240 / 0.9)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            border: scrolled ? "1px solid oklch(0.65 0.2 210 / 0.2)" : "1px solid transparent",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8">
                <motion.div
                  className="absolute inset-0 rounded-sm"
                  style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))", boxShadow: "0 0 14px oklch(0.8 0.2 195 / 0.5)" }}
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="#0B0F19" strokeWidth="1.5" fill="none"/>
                    <circle cx="7" cy="7" r="2" fill="#0B0F19"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest gradient-text" style={{ fontFamily: "'Sora', sans-serif" }}>
                  STEELVISION
                </span>
                <div className="text-[9px] tracking-[0.3em] font-mono" style={{ color: "oklch(0.55 0.05 210)" }}>AI</div>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:text-white"
                  style={{ color: "oklch(0.6 0.05 210)", fontFamily: "'Space Grotesk', sans-serif" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.color = "oklch(0.8 0.2 195)"
                    el.style.background = "oklch(0.65 0.2 210 / 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.color = "oklch(0.6 0.05 210)"
                    el.style.background = "transparent"
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-xs font-mono"
                style={{ borderColor: "oklch(0.8 0.2 195 / 0.4)", color: "oklch(0.8 0.2 195)", background: "oklch(0.8 0.2 195 / 0.05)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full mr-1.5 inline-block animate-pulse" style={{ background: "oklch(0.75 0.15 160)" }} />
                LIVE
              </Badge>
              <Button
                size="sm"
                className="font-semibold text-xs tracking-wider"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))",
                  border: "none",
                  boxShadow: "0 0 20px oklch(0.65 0.2 210 / 0.4)",
                  color: "#0B0F19"
                }}
                onClick={() => document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                Launch System
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ background: "oklch(0.15 0.025 240 / 0.8)", border: "1px solid oklch(0.65 0.2 210 / 0.2)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="block h-0.5 w-full rounded" style={{ background: "oklch(0.8 0.2 195)" }} />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-4 mt-1 rounded-xl p-4 flex flex-col gap-2"
              style={{ background: "oklch(0.12 0.02 240 / 0.95)", border: "1px solid oklch(0.65 0.2 210 / 0.2)", backdropFilter: "blur(20px)" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-2 px-3 text-sm rounded-lg"
                  style={{ color: "oklch(0.75 0.05 210)", fontFamily: "'Space Grotesk', sans-serif" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="mt-2 w-full font-semibold text-sm"
                style={{ background: "linear-gradient(135deg, oklch(0.65 0.2 210), oklch(0.8 0.2 195))", color: "#0B0F19", border: "none" }}
                onClick={() => { setMobileOpen(false); document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" }) }}
              >
                Launch System
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
