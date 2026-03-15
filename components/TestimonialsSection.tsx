'use client'

interface Testimonial {
  id: string
  quote: string
  author: string
}

interface TestimonialsSectionProps {
  componentId?: string
  sectionLabel: string
  heading: string
  subheading: string
  items: Testimonial[]
  _sectionId?: number
}

export default function TestimonialsSection({
  sectionLabel,
  heading,
  subheading,
  items
}: TestimonialsSectionProps) {

  return (
    <section className="py-16 md:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 md:mb-16">

          <span className="px-4 py-1.5 bg-green-100 text-green-800 text-xs font-semibold rounded-lg">
            {sectionLabel}
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4">
            {heading}
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            {subheading}
          </p>

        </div>


        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {items.map((testimonial) => (

            <div
              key={testimonial.id}
              className="bg-[#f7f7f7] border border-gray-200 rounded-2xl p-6 md:p-8 text-gray-600 leading-relaxed transition hover:shadow-md"
            >

              {/* Quote */}
              <p className="mb-6 text-sm md:text-base">
                {testimonial.quote}
              </p>

              {/* Author */}
              <p className="font-semibold text-gray-900">
                {testimonial.author}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}