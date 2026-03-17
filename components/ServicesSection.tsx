'use client'

import { useState } from "react"
import Image from "next/image"
import ServicesWheel from "./ServicesWheel"
import { motion, AnimatePresence } from "framer-motion"

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  image?: string
}

interface Props {
  heading: string
  description: string
  services: ServiceItem[]
}

export default function ServicesSection({
  heading,
  description,
  services
}: Props) {

  const [activeIndex, setActiveIndex] = useState(0)

  return (

    <section className="py-24 md:py-32 bg-white text-gray-800 overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-[#184d47] rounded-full" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#184d47] uppercase">
              Our Capabilities
            </span>
            <span className="w-8 h-[2px] bg-[#184d47] rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-gray-900 leading-[1.1] tracking-[-0.02em]">
            {heading}
          </h2>

          <p className="text-gray-500 text-[18px] leading-[1.6] font-light">
            {description}
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* LEFT SIDE - Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative h-full min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Dynamic Image Graphic */}
                <div className="relative w-full aspect-square max-w-[400px] mx-auto mb-10 rounded-[2rem] bg-gray-50/50 flex items-center justify-center p-8 border border-gray-100 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#184d47]/5 to-transparent rounded-[2rem]" />
                  {services[activeIndex].image && (
                    <Image
                      src={services[activeIndex].image}
                      alt={services[activeIndex].title}
                      width={320}
                      height={320}
                      className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>

                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
                    {services[activeIndex].title}
                  </h3>

                  <p className="text-[16px] text-gray-500 leading-[1.6] font-light">
                    {services[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT SIDE - Interactive Wheel Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center order-1 lg:order-2"
          >
            {/* Extremely Premium Dark Container for Wheel */}
            <div className="w-full bg-[#184d47] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(24,77,71,0.3)] border border-[#2f5f5b]">
              
              {/* Internal Glowing Orbs for the dark container */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2f5f5b] rounded-full blur-[80px] opacity-70" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8dcb5]/10 rounded-full blur-[80px]" />

              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-12 text-center tracking-wide">
                  Select a Service Modality
                </h3>

                <div className="scale-90 md:scale-100">
                  <ServicesWheel
                    services={services}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  )

}