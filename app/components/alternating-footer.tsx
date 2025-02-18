"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MoltenGoldText from "./molten-gold-text"

const quotes = [
  "This isn't about just earning a paycheck. It's about finding what sets your soul on fire.",
  "Quo magis incumbis, eo profundius fiet intellectus tuus",
]

export function AlternatingFooter() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 10000) // Alternate every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-8 w-full flex justify-center px-4 z-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <MoltenGoldText
            text={quotes[currentQuoteIndex]}
            className="hero-footnote text-sm md:text-base lg:text-lg font-playfair italic text-white text-luxury max-w-3xl text-center"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

