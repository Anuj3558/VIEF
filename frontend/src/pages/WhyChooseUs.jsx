import React from 'react'
import { motion } from 'framer-motion'
import { wc1, wc2 } from '../Assets/images'

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen pt-10 bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 mt-11">
          <img 
            src={wc1}
            alt="Modern building facade" 
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 "></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 my-5 md:py-32 lg:py-40">
          <motion.h1 
            className="text-3xl md:text-4xl md:mb-52 lg:text-5xl text-left font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why choose us?
          </motion.h1>
          <FeatureGrid 
            features={[
              { title: "Networking Opportunities", description: "Exchange information and build relationships with professionals, leaders, and startup entrepreneurs within your industry." },
              { title: "Professional Resources", description: "Gain access to previously unavailable resources, including education, software, and business tools." },
              { title: "Partnerships", description: "Form partnerships with industry leaders or influencers to help your startup reach massive success." },
              { title: "Sophisticated Equipment", description: "Access expensive equipment essential for growth that might be unaffordable for startups with limited funds." },
              { title: "Best Mentors", description: "Receive invaluable advice from mentors who have built successful businesses to help grow your company." },
              { title: "Accelerated Growth", description: "Accelerate your startup's growth and avoid common pitfalls that occur during expansion." },
            ]}
          />
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="relative bg-white py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0">
          <img 
            src={wc2}
            alt="Modern building facade" 
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 "></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-right md:mb-52 font-bold text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What do we offer?
          </motion.h2>
          <FeatureGrid 
            features={[
              { title: "Physical Lab Facilities", description: "24/7/365 operational workspace with high-speed Internet access, dedicated support, and round-the-clock security." },
              { title: "Incubation & Co-Working Facilities", description: "SA - CEI monitors, reviews, and guides startups through dedicated portfolio managers and support executives." },
              { title: "Partnerships", description: "Form partnerships with industry leaders or influencers to help your startup reach massive success." },
              { title: "Sophisticated Equipment", description: "Access expensive equipment essential for growth that might be unaffordable for startups with limited funds." },
              { title: "Best Mentors", description: "Receive invaluable advice from mentors who have built successful businesses to help grow your company." },
              { title: "Accelerated Growth", description: "Accelerate your startup's growth and avoid common pitfalls that occur during expansion." },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

function FeatureGrid({ features }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} index={index} />
      ))}
    </div>
  )
}

function FeatureCard({ title, description, index }) {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-xl font-semibold text-[#1a237e] mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}