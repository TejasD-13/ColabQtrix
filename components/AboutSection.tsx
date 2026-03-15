interface AboutSectionProps {
  componentId?: string;
  badge: string;
  heading: string;
  description: string;
  vision: string;
  mission: string;
  _sectionId?: number;
}

export default function AboutSection({
  badge,
  heading,
  description,
  vision,
  mission,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-mint text-primary text-sm font-semibold px-5 py-1.5 rounded-full tracking-wider uppercase">
            {badge}
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 max-w-3xl mx-auto leading-tight mb-6">
          {heading}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg leading-relaxed mb-16">
          {description}
        </p>

        {/* Vision & Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white shadow-xl shadow-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Vision Statement</h3>
            </div>
            <p className="text-white/90 leading-relaxed">{vision}</p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white shadow-xl shadow-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Mission Statement</h3>
            </div>
            <p className="text-white/90 leading-relaxed">{mission}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
