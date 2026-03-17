'use client'

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface HeroButton {
  label: string
  href: string
}

interface HeroSectionProps {
  componentId?: string
  title: string
  subtitle: string
  primaryButton: HeroButton
  secondaryButton: HeroButton
  image?: string // Note: Kept for API compatibility, but we hardcode hero2.jpg per design request
  _sectionId?: number
}

export default function HeroSection({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center pt-20 pb-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/image2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed" // Creates a subtle parallax effect
      }}
    >
      {/* 
        Dark Gradients & Overlays 
        We use a combination of a solid color overlay and a radial gradient 
        to ensure text contrast while keeping the edges moody and cinematic.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] via-transparent to-black/30 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_120%)] z-0 opacity-100" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 flex flex-col items-center text-center">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-12 h-[1px] bg-[#e8dcb5]/60" />
          <span className="text-[12px] md:text-[13px] font-bold tracking-[0.25em] text-[#e8dcb5] uppercase drop-shadow-md">
            Welcome to the Future
          </span>
          <span className="w-12 h-[1px] bg-[#e8dcb5]/60" />
        </motion.div>

        {/* Title - Professional Clean Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[52px] md:text-[72px] lg:text-[88px] font-semibold text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18px] md:text-[22px] text-gray-300 mb-14 max-w-[700px] leading-[1.6] font-light drop-shadow"
        >
          {subtitle}
        </motion.p>

        {/* Buttons Array */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          {primaryButton && (
            <a
              href={primaryButton.href}
              className="w-full sm:w-auto group relative flex justify-center items-center gap-3 bg-[#184d47] text-white px-10 py-4 md:py-5 rounded-full font-medium tracking-wide overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(24,77,71,0.6)] hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-[15px]">{primaryButton.label}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          )}

          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className="w-full sm:w-auto flex justify-center items-center gap-3 bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-4 md:py-5 rounded-full font-medium tracking-wide transition-all hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="text-[15px]">{secondaryButton.label}</span>
            </a>
          )}
        </motion.div>

      </div>
    </section>
  )
}