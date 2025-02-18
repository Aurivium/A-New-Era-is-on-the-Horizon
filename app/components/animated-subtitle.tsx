"use client"

import { motion } from "framer-motion"

export function AnimatedSubtitle() {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 1.2,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="text-xl sm:text-2xl lg:text-3xl font-medium italic"
    >
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-emerald via-emerald-dark to-emerald bg-clip-text text-transparent animate-shimmer inline-block transform-gpu hover:scale-105 transition-transform duration-500">
          Your Potential Awaits
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-emerald via-emerald-dark to-emerald opacity-20 blur-lg animate-pulse" />
      </span>
    </motion.h2>
  )
}

