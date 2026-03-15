'use client'

import { Code, BarChart, ServerCog, FlaskConical } from 'lucide-react'

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
}

interface ServicesSectionProps {
  componentId?: string
  heading: string
  description: string
  services: ServiceItem[]
  _sectionId?: number
}

export default function ServicesSection({
  heading,
  description,
  services,
}: ServicesSectionProps) {
  // Map string icon names to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code size={20} className="text-green-700" />
      case 'strategy':
        return <BarChart size={20} className="text-green-700" />
      case 'support':
        return <ServerCog size={20} className="text-green-700" />
      case 'research':
        return <FlaskConical size={20} className="text-green-700" />
      default:
        return <Code size={20} className="text-green-700" />
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#f2f6f3] rounded-3xl p-12 lg:p-16 flex flex-col lg:flex-row gap-16">
          
          {/* Left Column - Heading & Description */}
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-6">
              {heading}
            </h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {description}
            </p>
          </div>

          {/* Right Column - Services Grid */}
          <div className="lg:w-2/3 grid md:grid-cols-2 gap-x-12 gap-y-12">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[#d6e9dc] flex items-center justify-center mb-4">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
