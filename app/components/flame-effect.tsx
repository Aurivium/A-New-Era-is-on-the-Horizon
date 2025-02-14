"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function FlameEffect({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{
        filter: [
          "drop-shadow(0 0 15px rgba(255,215,0,0.3))",
          "drop-shadow(0 0 25px rgba(255,215,0,0.5))",
          "drop-shadow(0 0 15px rgba(255,215,0,0.3))",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  )
}

