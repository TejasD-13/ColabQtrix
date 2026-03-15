'use client'

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

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

  return (
    <section id="about" className="py-16 md:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">

        {/* RIGHT CONTENT */}
        <div className="order-1 lg:order-2">

          <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-4 py-2 rounded-lg mb-6">
            {sectionLabel}
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-6">
            {heading}
          </h2>

          <div className="space-y-6 text-gray-600 leading-relaxed text-[15px] sm:text-[16px]">
            {description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10">

            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {keyValuesHeading}
            </h4>

            <div className="flex flex-wrap gap-4">

              {keyValues.map((value, index) => (

                <div key={index} className="flex items-center gap-2 text-gray-700">

                  <CheckCircle2
                    size={18}
                    className="text-[#2b6461]"
                    fill="#2b6461"
                    color="white"
                  />

                  <span className="text-sm font-medium">
                    {value}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* LEFT IMAGE + CARD */}
        <div className="order-2 lg:order-1 flex flex-col gap-6">

          {image?.src && (
            <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden">

              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />

            </div>
          )}

          <div className="bg-[#2b6461] rounded-2xl p-6 sm:p-8 text-white shadow-lg">

            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#e8dcb5] uppercase mb-3">
              {visionHeading}
            </p>

            <p className="text-[15px] sm:text-[16px] leading-relaxed text-white/90 mb-6">
              {vision}
            </p>

            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#e8dcb5] uppercase mb-4">
              {missionHeading}
            </p>

            <div className="space-y-3">

              {mission.map((point, index) => (
                <p key={index} className="text-[14px] sm:text-[15px] leading-relaxed text-white/90">
                  {point}
                </p>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}