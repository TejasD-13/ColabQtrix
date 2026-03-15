'use client'

import Image from "next/image"

interface FounderImage {
  src: string
  alt: string
}

interface FounderSectionProps {
  componentId?: string
  badge: string
  heading: string
  quote: string[] | string
  founderName: string
  founderTitle: string
  founderImage?: FounderImage
  _sectionId?: number
}

export default function FounderSection({
  badge,
  heading,
  quote,
  founderName,
  founderTitle,
  founderImage
}: FounderSectionProps) {

  const paragraphs = Array.isArray(quote) ? quote : [quote]

  return (
    <section id="founder" className="py-20 md:py-28 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-4 py-2 rounded-lg">
            {badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT: Founder Image */}
          <div className="flex justify-center">

            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-gray-200 aspect-[3/4] relative bg-gray-50">

              {founderImage?.src ? (
                <Image
                  src={founderImage.src}
                  alt={founderImage.alt || founderName}
                  fill
                  className="object-cover"
                />
              ) : (

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-300">

                  <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
                    <circle cx="50" cy="35" r="22" stroke="#d1d5db" strokeWidth="3" />
                    <path d="M10 90 Q10 65 50 65 Q90 65 90 90" stroke="#d1d5db" strokeWidth="3" fill="none" />
                  </svg>

                  <p className="text-sm text-gray-400 font-medium">
                    Founder Photo
                  </p>

                  <p className="text-xs text-gray-300">
                    Add to /public/images/founder.jpg
                  </p>

                </div>

              )}

            </div>

          </div>


          {/* RIGHT: Message Card */}
          <div className="bg-[#2b6461] rounded-2xl p-8 md:p-10 text-white shadow-xl">

            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {heading}
            </h2>

            <div className="space-y-4">

              {paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-white/85 leading-relaxed text-sm md:text-base"
                >
                  {paragraph}
                </p>
              ))}

            </div>

            <div className="mt-8 pt-6 border-t border-white/20">

              <p className="font-bold text-white">
                {founderName}
              </p>

              <p className="text-white/60 text-sm">
                {founderTitle}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}