"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MoltenGoldTextProps {
  text: string
  className?: string
}

const MoltenGoldText = ({ text, className = "" }: MoltenGoldTextProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return
    const rect = textRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    textRef.current.style.setProperty("--mouse-x", `${x}px`)
    textRef.current.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <motion.div
      ref={textRef}
      className={`molten-gold-text ${className}`}
      data-text={text}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {text}
      <style jsx>{`
        .molten-gold-text {
          position: relative;
          display: inline-block;
          color: white;
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
        .molten-gold-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #FFD700, #FFA500, #FF8C00);
          background-size: 200% 200%;
          background-position: var(--mouse-x) var(--mouse-y);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          transition: all 0.3s ease;
        }
        .molten-gold-text:hover::before {
          filter: brightness(1.2) contrast(1.1);
        }
      `}</style>
    </motion.div>
  )
}

export default MoltenGoldText

