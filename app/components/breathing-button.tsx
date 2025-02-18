"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface BreathingButtonProps {
  onClick: () => void
}

export function BreathingButton({ onClick }: BreathingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 text-lg font-playfair font-bold rounded-full border-2 border-yellow-400 shadow-lg overflow-hidden"
      animate={{
        scale: isHovered ? 1.05 : [1, 1.03, 1],
        boxShadow: isHovered ? "0 0 30px rgba(255, 215, 0, 0.7)" : "0 0 20px rgba(255, 215, 0, 0.5)",
      }}
      transition={{
        scale: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 2.5,
          ease: "easeInOut",
        },
        boxShadow: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(45deg, rgba(0,0,0,0.6), rgba(20,20,20,0.6))",
        }}
        initial={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, opacity: 0.9 }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10 text-yellow-300 tracking-wide">Join the Waitlist</span>

      <motion.div
        className="absolute inset-0 bg-yellow-400 rounded-full pointer-events-none z-0"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 3, opacity: 0.2 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}

