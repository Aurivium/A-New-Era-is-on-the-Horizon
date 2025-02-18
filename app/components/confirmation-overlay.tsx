"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfirmationOverlayProps {
  onComplete?: () => void
}

export function ConfirmationOverlay({ onComplete }: ConfirmationOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) {
          onComplete()
        }
      }}
    >
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 rounded-lg shadow-2xl border border-yellow-400 max-w-md text-center"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Thank you for joining!</h2>
            <p className="text-white text-lg leading-relaxed">
              We're excited to work with you and will keep you updated via email on release dates, news, and more.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 5, ease: "linear" }}
              className="h-1 bg-yellow-400 mt-6 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

