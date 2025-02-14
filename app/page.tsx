import type { Metadata } from "next"
import { Sparkles } from "./components/sparkles"
import MoltenGoldText from "./components/molten-gold-text"

export const metadata: Metadata = {
  title: "Aurivium | A new era of purposeful work",
  description: "Aurivium - A new era of purposeful work is on the horizon.",
  openGraph: {
    title: "Aurivium | A new era of purposeful work",
    description: "Aurivium - A new era of purposeful work is on the horizon.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aurivium%20Hero%20Badge.jpg-0803uWjJaLP07qx6XQGpLXH0T0v302.jpeg",
    ],
  },
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="hero">
        {/* Background Image with Brightness Filter */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-75"
          style={{
            backgroundImage:
              "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Aurivium%20Hero%20Badge.jpg-0803uWjJaLP07qx6XQGpLXH0T0v302.jpeg)",
          }}
        />

        {/* Subtle Top Gradient Fade for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent h-1/2" />

        {/* Sparks Animation */}
        <div className="relative z-10">
          <Sparkles />
        </div>

        {/* Content Positioned Toward the Top */}
        <div className="hero-content relative z-20 flex flex-col items-center justify-between min-h-screen px-4 py-12 md:py-16">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <MoltenGoldText
                text="Aurivium"
                className="hero-title text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-tight text-white"
              />
            </div>
            <div className="text-center">
              <MoltenGoldText
                text="A new era of purposeful work is on the horizon."
                className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-playfair font-light tracking-wide text-white"
              />
            </div>
          </div>
          <MoltenGoldText
            text={"This isn't about just earning a paycheck. It's about finding what sets your soul on fire."}
            className="hero-footnote text-sm md:text-base lg:text-lg font-playfair italic text-white mt-8"
          />
        </div>
      </div>
    </main>
  )
}

