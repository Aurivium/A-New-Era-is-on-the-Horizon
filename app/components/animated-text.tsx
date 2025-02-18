"use client"

import { motion } from "framer-motion"
import type { CSSProperties } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  style?: CSSProperties
}

export function AnimatedText({ text, className = "", delay = 0, style }: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={style}
    >
      <h2 className={className}>{text}</h2>
    </motion.div>
  )
}

