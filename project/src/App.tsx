import { useState } from "react"
import { AnimatePresence } from "framer-motion"

import { LoadingScreen } from "@/components/LoadingScreen"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { AIDashboard } from "@/components/AIDashboard"
import { AIDetectionDemo } from "@/components/AIDetectionDemo"
import { TechStackSection } from "@/components/TechStackSection"
import { WorkflowSection } from "@/components/WorkflowSection"
import { DatasetShowcase } from "@/components/DatasetShowcase"
import { PerformanceSection } from "@/components/PerformanceSection"
import { Footer } from "@/components/Footer"
import { AIAssistant } from "@/components/AIAssistant"

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative min-h-screen" style={{ background: "#0B0F19" }}>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <FeaturesSection />
            <AIDashboard />
            <AIDetectionDemo />
            <WorkflowSection />
            <TechStackSection />
            <DatasetShowcase />
            <PerformanceSection />
          </main>
          <Footer />
          <AIAssistant />
        </>
      )}
    </div>
  )
}
