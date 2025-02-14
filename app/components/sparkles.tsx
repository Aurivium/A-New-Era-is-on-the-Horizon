"use client"

import { useEffect, useRef } from "react"

export function Sparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener("resize", setSize)

    class Sparkle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.5 + 0.3
        this.color = "#FDF6E3"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity = Math.max(0, this.opacity - 0.002)

        if (this.opacity <= 0) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.opacity = 0.5 + Math.random() * 0.5
        }

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(253, 246, 227, ${this.opacity})`
        ctx.fill()
      }
    }

    const sparkles: Sparkle[] = Array.from({ length: 50 }, () => new Sparkle())

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparkles.forEach((sparkle) => {
        sparkle.update()
        sparkle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener("resize", setSize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
}

