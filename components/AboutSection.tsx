'use client'

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Target, Lightbulb, CheckCircle2 } from "lucide-react"

interface AboutImage {
  src: string
  alt: string
}

interface AboutSectionProps {
  componentId?: string
  sectionLabel: string
  heading: string
  description: string
  visionHeading: string
  vision: string
  missionHeading: string
  mission: string[]
  keyValuesHeading: string
  keyValues: string[]
  image?: AboutImage
  _sectionId?: number
}

export default function AboutSection({
  sectionLabel,
  heading,
  description,
  visionHeading,
  vision,
  missionHeading,
  mission,
  keyValuesHeading,
  keyValues,
  image
}: AboutSectionProps) {
  
  // Safe fallbacks for arrays & strings
  const safeMission = Array.isArray(mission) ? mission : [];
  const safeKeyValues = Array.isArray(keyValues) ? keyValues : [];
  const safeDescription = description || "";

  return (
    <section id="about" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col gap-16">

        {/* TOP ROW: Text Description (Left) & Main Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Content & Key Values */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-[#184d47]" />
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#184d47] uppercase">
                {sectionLabel || "About Us"}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-8">
              {heading}
            </h2>
            
            <div className="space-y-5 text-[18px] text-gray-500 leading-[1.7] font-light mb-12">
              {safeDescription.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Key Values integrated as elegant pills directly below the description */}
            <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-gray-100">
              <h4 className="text-sm font-bold tracking-[0.1em] text-gray-400 uppercase mb-5">
                {keyValuesHeading}
              </h4>
              <div className="flex flex-wrap gap-3">
                {safeKeyValues.map((value, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-gray-200 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <CheckCircle2 size={16} className="text-[#2b6461]" />
                    <span className="text-[14px] font-medium text-gray-700">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Large Image */}
          {image?.src && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-2xl border border-gray-100"
            >
              <Image
                src={image.src}
                alt={image.alt || "About Image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Cinematic internal shadow */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem] pointer-events-none" />
            </motion.div>
          )}

        </div>


        {/* BOTTOM ROW: Vision (Smaller) & Mission (Larger) Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-gray-100">

          {/* Vision Card (Spans 5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 xl:col-span-5 bg-[#184d47] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            {/* Decorative BG element */}
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                <Lightbulb size={20} className="text-[#e8dcb5]" />
              </div>
              <p className="text-[13px] font-bold tracking-[0.15em] text-[#e8dcb5] uppercase">
                {visionHeading}
              </p>
            </div>
            <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/95 font-medium relative z-10">
              "{vision}"
            </p>
          </motion.div>

          {/* Mission Card (Spans 7 cols) -> Highly flexible height for long bullets */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 xl:col-span-7 bg-[#fafafa] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#184d47]/5 flex items-center justify-center border border-[#184d47]/10">
                <Target size={20} className="text-[#184d47]" />
              </div>
              <p className="text-[13px] font-bold tracking-[0.15em] text-[#184d47] uppercase">
                {missionHeading}
              </p>
            </div>
            
            <ul className="space-y-5">
              {safeMission.map((point, index) => (
                <li key={index} className="text-[16px] md:text-[17px] leading-[1.7] text-gray-600 flex items-start gap-4">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#184d47]/60 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
              {safeMission.length === 0 && (
                <li className="text-gray-400 italic">No mission statements provided.</li>
              )}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  )
}