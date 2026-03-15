'use client'

import { MapPin, Mail, Phone } from "lucide-react"

interface ContactSectionProps {
  componentId?: string
  sectionLabel: string
  heading: string
  subheading: string
  phones: string[]
  emails: string[]
  address: string
  mapEmbedUrl: string
  _sectionId?: number
}

export default function ContactSection({
  sectionLabel,
  heading,
  subheading,
  phones,
  emails,
  address,
  mapEmbedUrl
}: ContactSectionProps) {

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">

          <span className="px-4 py-1.5 bg-green-100 text-green-800 text-xs font-semibold rounded-lg">
            {sectionLabel}
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
            {heading}
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            {subheading}
          </p>

        </div>


        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* CONTACT INFO */}
          <div className="space-y-10">

            {/* Phone */}
            <div className="flex items-start gap-6">

              <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-gray-500" />
              </div>

              <div>

                <p className="text-gray-500 mb-1">
                  Phone
                </p>

                <div className="font-semibold text-gray-800 space-y-1">

                  {phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block hover:text-[#2f5f5b] transition"
                    >
                      {phone}
                    </a>
                  ))}

                </div>

              </div>

            </div>


            {/* Email */}
            <div className="flex items-start gap-6">

              <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-gray-500" />
              </div>

              <div>

                <p className="text-gray-500 mb-1">
                  Email
                </p>

                <div className="font-semibold text-gray-800 space-y-1">

                  {emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block hover:text-[#2f5f5b] transition"
                    >
                      {email}
                    </a>
                  ))}

                </div>

              </div>

            </div>


            {/* Address */}
            <div className="flex items-start gap-6">

              <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-gray-500" />
              </div>

              <div>

                <p className="text-gray-500 mb-1">
                  Address
                </p>

                <p className="font-semibold text-gray-800 leading-relaxed">
                  {address}
                </p>

              </div>

            </div>

          </div>


          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-gray-200 h-[360px] md:h-[420px]">

            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />

          </div>

        </div>

      </div>

    </section>
  )
}