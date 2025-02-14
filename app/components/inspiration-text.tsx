"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const inspirationalQuotes = [
  "Illuminate Your Path",
  "Discover Your Purpose",
  "Embrace Your Journey",
  "Transform Your Future",
  "Unleash Your Potential",
]

export function InspirationText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % inspirationalQuotes.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-8 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-gold/60 text-lg sm:text-xl absolute w-full text-center"
        >
          {inspirationalQuotes[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

