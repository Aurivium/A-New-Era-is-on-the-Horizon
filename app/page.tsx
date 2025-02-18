"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Sparkles } from "./components/sparkles"
import MoltenGoldText from "./components/molten-gold-text"
import { BreathingButton } from "./components/breathing-button"
import { SignUpForm } from "./components/sign-up-form"
import { FloatingParticles } from "./components/floating-particles"
import { InspirationText } from "./components/inspiration-text"
import { ConfirmationOverlay } from "./components/confirmation-overlay"
import { AlternatingFooter } from "./components/alternating-footer"

export default function Home() {
  const [formState, setFormState] = useState({ show: false, isSubmitted: false })
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5])

  // Common animation settings (for subheadline, inspirational text, etc.)
  const textAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  // Preload background image for smoother initial render
  useEffect(() => {
    const img = new Image()
    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aurivium%20Badge%20Full-lJrfktGl4yq1lg7PMjKDa899EdhMNw.png"
  }, [])

  return (
    <main className="relative h-screen overflow-hidden bg-black">
      <div className="hero relative w-full h-full">
        {/* Background Image with Parallax and Fade Effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-75"
          style={{
            backgroundImage:
              "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aurivium%20Badge%20Full-lJrfktGl4yq1lg7PMjKDa899EdhMNw.png)",
            y: backgroundY,
            opacity,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Gradient Overlay for Improved Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

        {/* Floating Gold Particles */}
        <FloatingParticles />

        {/* Sparks Animation */}
        <div className="relative z-10">
          <Sparkles />
        </div>

        {/* Main Content */}
        <div className="hero-content relative z-20 flex flex-col items-center w-full h-full px-4 py-12 md:py-16">
          <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
            {/* Aurivium Headline – starts centered; when form is shown, slides up by 50px */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={
                formState.show
                  ? { opacity: 1, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }
                  : { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
              }
            >
              <MoltenGoldText
                text="Aurivium"
                className="hero-title text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-tight text-[#fcd34d] text-luxury"
              />
            </motion.div>

            {/* Subheadline (conditionally rendered) */}
            <AnimatePresence>
              {!formState.show && !formState.isSubmitted && (
                <motion.div
                  key="subheadline"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="text-center"
                >
                  <MoltenGoldText
                    text="A new era of purposeful work is on the horizon."
                    className="hero-subtitle text-2xl md:text-3xl lg:text-4xl font-playfair font-light tracking-wide text-[#fcd34d] text-luxury"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inspirational Quotes (conditionally rendered) */}
            <AnimatePresence>
              {!formState.show && !formState.isSubmitted && (
                <motion.div
                  key="inspiration"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  className="text-center"
                >
                  <InspirationText />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Breathing Button (positioned as in the old iteration) */}
          <div className="absolute top-[65vh] left-1/2 transform -translate-x-1/2">
            <AnimatePresence>
              {!formState.show && (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <BreathingButton onClick={() => setFormState({ show: true, isSubmitted: false })} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Alternating Footer */}
      <AlternatingFooter />

      {/* Sign-Up Form Overlay */}
      <AnimatePresence>
        {formState.show && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <SignUpForm onSubmit={() => setFormState({ show: false, isSubmitted: true })} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {formState.isSubmitted && (
          <ConfirmationOverlay
            onComplete={() => {
              setFormState({ show: false, isSubmitted: false })
            }}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

