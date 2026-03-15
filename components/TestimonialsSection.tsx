interface Testimonial {
  id: string;
  role: string;
  text: string;
  rating: number;
}

interface TestimonialsSectionProps {
  componentId?: string;
  heading: string;
  testimonials: Testimonial[];
  _sectionId?: number;
}

export default function TestimonialsSection({
  heading,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {heading}
        </h2>
        <p className="text-gray-500 text-center mb-16">
          Trusted by researchers, academicians, and institutions worldwide
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote mark */}
              <div className="text-4xl text-primary/20 font-serif leading-none mb-2 select-none">&ldquo;</div>

              <p className="text-gray-700 leading-relaxed mb-6">{testimonial.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.role.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">Verified Client</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
