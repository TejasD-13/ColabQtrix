'use client'

import Image from "next/image"

interface Step {
  id: string
  stepNumber: number
  title: string
  description: string
}

interface BottomImage {
  src: string
  alt: string
}

interface HowItWorksSectionProps {
  componentId?: string
  badge: string
  heading: string
  steps: Step[]
  bottomImage?: BottomImage
  _sectionId?: number
}

export default function HowItWorksSection({
  badge,
  heading,
  steps,
  bottomImage
}: HowItWorksSectionProps) {

  return (
    <section className="py-20 md:py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">

          <span className="px-4 py-1.5 bg-green-100 text-green-800 text-xs font-semibold rounded-lg">
            {badge}
          </span>

          <h2 className="text-4xl font-semibold text-gray-900 mt-4">
            {heading}
          </h2>

        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-16 text-center">

          {/* Connector 1 */}
          <svg
            className="hidden md:block absolute top-10 left-[13%] w-[20%]"
            viewBox="0 0 200 60"
          >
            <path d="M0 40 Q100 0 200 40" stroke="#2f5f5b" strokeWidth="2" strokeDasharray="6 8" fill="none" />
          </svg>

          {/* Connector 2 */}
          <svg
            className="hidden md:block absolute top-10 left-[38%] w-[20%]"
            viewBox="0 0 200 60"
          >
            <path d="M0 20 Q100 60 200 20" stroke="#2f5f5b" strokeWidth="2" strokeDasharray="6 8" fill="none" />
          </svg>

          {/* Connector 3 */}
          <svg
            className="hidden md:block absolute top-10 left-[63%] w-[20%]"
            viewBox="0 0 200 60"
          >
            <path d="M0 40 Q100 0 200 40" stroke="#2f5f5b" strokeWidth="2" strokeDasharray="6 8" fill="none" />
          </svg>

          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">

              {/* Circle */}
              <div className="w-16 h-16 rounded-full bg-[#2f5f5b] text-white flex items-center justify-center text-xl font-semibold mb-6 relative z-10">
                {step.stepNumber}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[15px] leading-relaxed max-w-xs">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Bottom Image */}
      {bottomImage?.src && (
        <div className="max-w-6xl mx-auto mt-24 px-6 flex justify-center">

          <Image
            src={bottomImage.src}
            alt={bottomImage.alt}
            width={1200}
            height={260}
            className="w-full max-w-5xl rounded-2xl"
          />

        </div>
      )}

    </section>
  )
}