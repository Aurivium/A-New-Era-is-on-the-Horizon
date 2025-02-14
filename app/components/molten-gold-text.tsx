"use client"

import { useRef } from "react"
import type React from "react"

interface MoltenGoldTextProps {
  text: string
  className?: string
}

const MoltenGoldText = ({ text, className = "" }: MoltenGoldTextProps) => {
  const textRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return
    const rect = textRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    textRef.current.style.setProperty("--mouse-x", `${x}px`)
    textRef.current.style.setProperty("--mouse-y", `${y}px`)
  }

  const handleMouseEnter = () => {
    textRef.current?.classList.add("hovered")
  }

  const handleMouseLeave = () => {
    textRef.current?.classList.remove("hovered")
  }

  return (
    <>
      <div
        ref={textRef}
        className={`molten-gold-text font-playfair ${className}`}
        data-text={text}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </div>
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
          color: #daa520;
          clip-path: circle(0% at var(--mouse-x, 50%) var(--mouse-y, 50%));
          transition: clip-path 7s ease;
          pointer-events: none;
        }
        .molten-gold-text.hovered::before {
          clip-path: circle(150% at var(--mouse-x, 50%) var(--mouse-y, 50%));
        }
      `}</style>
    </>
  )
}

export default MoltenGoldText

