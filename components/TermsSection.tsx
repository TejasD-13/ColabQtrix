'use client'

interface TermsSectionProps {
  componentId?: string
  heading: string
  paragraphs: string[]
  sections: {
    title: string
    text: string
  }[]
  _sectionId?: number
}

export default function TermsSection({
  heading,
  paragraphs,
  sections
}: TermsSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{heading}</h1>
        </div>

        <div className="bg-[#2b6361] text-white rounded-2xl p-10 leading-relaxed space-y-8 shadow-lg">
          
          <div className="space-y-6">
            {paragraphs?.map((para, index) => (
              <p key={index} className="text-white/90 text-[15px] md:text-base">
                {para}
              </p>
            ))}
          </div>

          {sections && sections.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-white/20">
              {sections.map((sec, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#e8dcb5]">{sec.title}</h3>
                  <p className="text-white/90 text-[15px] md:text-base">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  )
}
