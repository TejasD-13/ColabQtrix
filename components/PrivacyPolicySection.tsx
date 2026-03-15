'use client'

interface PrivacyPolicySectionProps {
  componentId?: string
  heading: string
  effectiveDate: string
  paragraphs: string[]
  contactEmail: string
  _sectionId?: number
}

export default function PrivacyPolicySection({
  heading,
  effectiveDate,
  paragraphs,
  contactEmail
}: PrivacyPolicySectionProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{heading}</h1>
        </div>

        <div className="bg-[#2b6361] text-white rounded-2xl p-10 leading-relaxed space-y-6 shadow-lg">
          <p className="font-semibold text-[#e8dcb5] tracking-wide uppercase text-sm mb-4">
            {effectiveDate}
          </p>
          
          <div className="space-y-6">
            {paragraphs.map((para, index) => (
              <p key={index} className="text-white/90 text-[15px] md:text-base">
                {para}
              </p>
            ))}
          </div>

          <div className="pt-8 mt-8 border-t border-white/20">
            <p className="text-white/90">
              For questions regarding this policy, please reach out to:{' '}
              <a href={`mailto:${contactEmail}`} className="font-semibold text-[#e8dcb5] hover:underline transition-all">
                {contactEmail}
              </a>
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
