"use client"

import { motion } from "framer-motion"
import { type ReactNode, useState } from "react"

export function MouseTracker({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const moveX = (clientX - window.innerWidth / 2) * 0.01
    const moveY = (clientY - window.innerHeight / 2) * 0.01
    setMousePosition({ x: moveX, y: moveY })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      animate={{
        transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
      }}
      transition={{ type: "spring", stiffness: 75, damping: 15 }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  )
}

