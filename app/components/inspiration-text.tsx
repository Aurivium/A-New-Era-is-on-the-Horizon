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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % inspirationalQuotes.length)
    }, 4000) // Rotate every 4 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-12 relative overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-yellow-300 text-xl sm:text-2xl font-semibold text-center w-full absolute"
        >
          {inspirationalQuotes[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

