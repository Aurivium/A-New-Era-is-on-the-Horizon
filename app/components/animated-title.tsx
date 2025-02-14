"use client"

import { motion } from "framer-motion"

export function AnimatedTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: 0.5,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="relative text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
    >
      <span className="block relative">
        <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent animate-shimmer inline-block transform-gpu hover:scale-105 transition-transform duration-500">
          Aurivium is Coming
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-light opacity-20 blur-xl animate-pulse" />
      </span>
    </motion.h1>
  )
}

