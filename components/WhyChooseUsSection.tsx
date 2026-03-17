'use client'

import { motion, Variants } from "framer-motion"

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseUsSectionProps {
  componentId?: string;
  badge: string;
  heading: string;
  description: string;
  features: Feature[];
  _sectionId?: number;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  strategy: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  support: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  research: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export default function WhyChooseUsSection({
  badge,
  heading,
  description,
  features,
}: WhyChooseUsSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-[#fafafa] overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#184d47]/[0.02] rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#184d47] rounded-full" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#184d47] uppercase">
                {badge}
              </span>
              <span className="w-8 h-[2px] bg-[#184d47] rounded-full" />
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-6"
          >
            {heading}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] text-gray-500 leading-[1.6] max-w-2xl mx-auto font-light"
          >
            {description}
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={item}
              key={feature.id}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100/80 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-[#184d47]/20 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#184d47]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#184d47] group-hover:bg-[#184d47] group-hover:text-white transition-colors duration-500 mb-8 border border-gray-100 group-hover:border-transparent">
                  {ICON_MAP[feature.icon] || (
                    <span className="font-bold text-lg">{index + 1}</span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#184d47] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-[15px] text-gray-500 leading-[1.6] font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
