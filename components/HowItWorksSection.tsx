interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  componentId?: string;
  badge: string;
  heading: string;
  steps: Step[];
  _sectionId?: number;
}

export default function HowItWorksSection({
  badge,
  heading,
  steps,
}: HowItWorksSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-mint text-primary text-sm font-semibold px-5 py-1.5 rounded-full tracking-wider uppercase">
            {badge}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          {heading}
        </h2>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                {/* Step number circle */}
                <div className="w-24 h-24 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 z-10">
                  <span className="text-2xl font-extrabold text-primary group-hover:text-white transition-colors">
                    {String(step.stepNumber).padStart(2, '0')}
                  </span>
                </div>

                {/* Arrow between steps (mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-primary/40">
                    ↓
                  </div>
                )}

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
