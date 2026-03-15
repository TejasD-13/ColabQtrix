'use client'

import Link from 'next/link'
import { MapPin, Mail, Phone, Globe, ArrowUp } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  badge?: string
}

interface FooterSectionProps {
  componentId?: string
  aboutHeading: string
  aboutText: string
  companyHeading: string
  companyLinks: FooterLink[]
  contactHeading: string
  address: string
  emails: string[]
  phones: string[]
  website: string
  websiteUrl: string
  copyright: string
  visitorCount: string[]
  _sectionId?: number
}

export default function FooterSection({
  aboutHeading,
  aboutText,
  companyHeading,
  companyLinks,
  contactHeading,
  address,
  emails,
  phones,
  website,
  websiteUrl,
  copyright,
  visitorCount
}: FooterSectionProps) {

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-gray-50 border-t border-gray-200 relative">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ABOUT */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">
              {aboutHeading}
            </h4>

            <p className="text-gray-500 text-sm leading-relaxed">
              {aboutText}
            </p>
          </div>


          {/* COMPANY LINKS */}
          <div>

            <h4 className="font-bold text-gray-900 mb-5">
              {companyHeading}
            </h4>

            <ul className="space-y-3">

              {companyLinks.map((link, idx) => (

                <li key={idx}>

                  <Link
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-[#2f5f5b] transition-colors flex items-center gap-2"
                  >
                    {link.label}

                    {link.badge && (
                      <span className="inline-block bg-[#e6f4f3] border border-[#2f5f5b]/30 text-[#2f5f5b] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}

                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* CONTACT */}
          <div>

            <h4 className="font-bold text-gray-900 mb-5">
              {contactHeading}
            </h4>

            <ul className="space-y-4">

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#2f5f5b] mt-0.5 flex-shrink-0" />
                <span className="text-gray-500 text-sm leading-relaxed">
                  {address}
                </span>
              </li>


              {/* Emails */}
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-[#2f5f5b] mt-0.5 flex-shrink-0" />

                <div className="flex flex-col gap-1">

                  {emails.map((email, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${email}`}
                      className="text-gray-500 text-sm hover:text-[#2f5f5b]"
                    >
                      {email}
                    </a>
                  ))}

                </div>
              </li>


              {/* Phones */}
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-[#2f5f5b] mt-0.5 flex-shrink-0" />

                <div className="flex flex-col gap-1">

                  {phones.map((phone, idx) => (
                    <span key={idx} className="text-gray-500 text-sm">
                      {phone}
                    </span>
                  ))}

                </div>
              </li>


              {/* Website */}
              <li className="flex items-center gap-3">
                <Globe size={15} className="text-[#2f5f5b] flex-shrink-0" />

                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-[#2f5f5b]"
                >
                  {website}
                </a>

              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 py-5">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm">
            {copyright}
          </p>

          {/* Visitor Counter */}
          <div className="flex">

            {visitorCount.map((digit, idx) => (

              <div
                key={idx}
                className="w-7 h-9 bg-[#2f5f5b] text-white text-sm font-mono font-bold flex items-center justify-center border-r border-white/20 last:border-0"
              >
                {digit}
              </div>

            ))}

          </div>

        </div>

      </div>


      {/* BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2f5f5b] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1f4a47] transition z-40"
      >
        <ArrowUp size={20} />
      </button>

    </footer>
  )
}