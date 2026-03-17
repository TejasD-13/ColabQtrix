'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  author: string
}

interface TestimonialsSectionProps {
  sectionLabel: string
  heading: string
  subheading: string
  items: Testimonial[]
}

export default function TestimonialsSection({
  sectionLabel,
  heading,
  subheading,
  items
}: TestimonialsSectionProps) {

  const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = items[index]
  const avatarLetter = testimonial.author.charAt(0).toUpperCase()

  return (
    <section className="py-24 md:py-32 relative bg-white overflow-hidden">
      
      {/* Background Graphic Block */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[45%] bg-[#184d47] rounded-l-[3rem] hidden lg:block" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT SIDE - Header Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-[#184d47] rounded-full" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#184d47] uppercase">
                {sectionLabel}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-[-0.02em]">
              {heading}
            </h2>

            <p className="text-[18px] text-gray-500 mt-8 leading-[1.6] font-light max-w-sm">
              {subheading}
            </p>

            {/* Custom Nav Controls */}
            <div className="hidden lg:flex gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#184d47] hover:text-white hover:border-[#184d47] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#184d47] hover:text-white hover:border-[#184d47] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>


          {/* RIGHT SIDE - Overlapping Premium Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 lg:-ml-10 relative"
          >
            <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 min-h-[360px] flex flex-col justify-between relative overflow-hidden">
              
              <Quote className="absolute top-10 right-10 w-32 h-32 text-gray-50/50 -rotate-12 z-0 pointer-events-none" />

              <div className="relative z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-col h-full absolute inset-0 pt-2 pb-6"
                  >
                    <p className="text-[20px] md:text-[24px] lg:text-[28px] text-gray-800 leading-[1.6] font-medium tracking-tight h-[150px] overflow-hidden">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-5 mt-auto">
                      <div className="w-14 h-14 rounded-full bg-[#184d47]/10 flex items-center justify-center font-bold text-xl text-[#184d47]">
                        {avatarLetter}
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 leading-tight">
                          {testimonial.author}
                        </p>
                        <p className="text-sm font-medium text-gray-500 tracking-wide uppercase mt-1">
                          Verified Client
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="h-[220px] md:h-[240px] pointer-events-none opacity-0" />
              </div>

            </div>

            {/* Mobile / Tablet Nav Controls */}
            <div className="flex lg:hidden items-center justify-between mt-8">
              {/* Dot indicators */}
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-[#184d47]"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  )
}