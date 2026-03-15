'use client'

import Image from "next/image"

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
  image?: string
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
      className="relative min-h-screen flex items-center bg-gray-50 pt-24"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Tag */}
          <div className="inline-flex items-center bg-green-100 text-green-800 text-[12px] font-semibold px-4 py-2 rounded-lg mb-6 tracking-wide">
            TECHNOLOGY INNOVATION
          </div>

          {/* Title */}
          <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-semibold text-gray-900 leading-[1.15] tracking-[-0.01em] mb-6">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] text-gray-500 mb-10 max-w-xl">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            {primaryButton && (
              <a
                href={primaryButton.href}
                className="bg-[#2f5f5b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#244b47] transition"
              >
                {primaryButton.label}
              </a>
            )}

            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
              >
                {secondaryButton.label}
              </a>
            )}
          </div>

        </div>

        {/* RIGHT SIDE IMAGES */}
        <div className="relative flex justify-center">

          {/* Main Hero Image (hardcoded) */}
          <Image
            src="/images/hero-img-1-min.png"
            alt="Technology"
            width={520}
            height={380}
            className="rounded-2xl"
          />

          {/* Floating Logo Card */}
          <div className="absolute -left-20 top-20 bg-white p-8 rounded-2xl shadow-xl">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={180}
              height={180}
            />
          </div>

        </div>

      </div>
    </section>
  )
}