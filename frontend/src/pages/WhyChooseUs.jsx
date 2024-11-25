import React from 'react'
import { motion } from 'framer-motion'
import { wc1, wc2 } from '../Assets/images'

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen pt-6 bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 w-full bg-gray-100 bg-opacity-60 mt-11">
          <img 
            src={wc1}
            alt="Modern building facade" 
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 my-5 md:py-32 lg:py-40">
          <motion.h1 
            className="text-3xl md:text-4xl md:mb-52 lg:text-5xl text-left font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us?
          </motion.h1>
          <FeatureGrid 
            features={[
              { title: "Expert Mentorship", description: "Learn from seasoned entrepreneurs who provide actionable insights to help you grow and scale your startup successfully." },
              { title: "Access to Essential Resources", description: "Unlock powerful tools, software, and educational resources essential for transforming your startup idea into a thriving business." },
              { title: "Networking Opportunities", description: "Build valuable relationships with industry professionals, leaders, and entrepreneurs to expand your network and drive your startup forward." },
              { title: "Strategic Partnerships", description: "Collaborate with influential partners to unlock opportunities, expand your reach, and scale your startup for greater success." },
              { title: "Advanced Equipment", description: "Utilize high-end equipment that's often inaccessible to startups, enabling faster development and better quality outcomes for your business." },
              { title: "Accelerated Growth & IPR Support", description: "Fast-track your growth with expert guidance and IPR support to protect and commercialize your innovations efficiently." },
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
          <div className="absolute inset-0"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl text-right md:mb-52 font-bold text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What do we offer?
          </motion.h2>
          <FeatureGrid 
            features={[
              { title: "From Idea to Reality", description: "Transform your raw idea into a tangible, market-ready product, with expert guidance at every step toward entrepreneurial success." },
              { title: "Business Development Mastery", description: "Turn challenges into growth opportunities with strategic advice on market entry, scaling, and creating long-term value." },
              { title: "Building Your First Prototype", description: "Receive hands-on support in developing your Minimum Viable Product (MVP) to validate your idea and refine your concept." },
              { title: "Connecting with Investors", description: "Unlock access to funding through angel investors, venture capital, and grants, providing the resources you need to scale." },
              { title: "Protecting Your Innovations with IPR", description: "Safeguard your intellectual property with expert IPR services, ensuring your ideas are legally protected and ready for commercialization." },
              { title: "Networking with Industry Experts", description: "Build valuable relationships with mentors, investors, and industry professionals who offer support and guidance." },
              { title: "Strategic Partnerships for Success", description: "Form partnerships with key industry players to accelerate your growth, enter new markets, and boost your business." },
              { title: "Access to Premium Resources", description: "Gain access to exclusive tools, software, and resources that help streamline your business operations and enhance your capabilities." },
              { title: "Mentorship for Every Phase", description: "Receive tailored mentorship from experienced professionals who guide you through each stage of your startup journey." },
              { title: "Market Insights & Strategy", description: "Understand market trends and customer behavior, helping you position your startup for optimal success in the competitive landscape." },
              { title: "Scalable Growth Solutions", description: "Implement growth strategies that facilitate rapid scaling and help you avoid common pitfalls during your expansion phase." },
              { title: "Legal and Compliance Support", description: "Get expert advice on legal requirements and compliance issues, ensuring your business runs smoothly and within regulations." },
              { title: "Customer Acquisition & Retention", description: "Master the art of customer acquisition and retention with proven techniques to build a loyal and profitable customer base." },
              { title: "Recognition & Exposure", description: "Gain recognition for your innovation and success through participation in competitions, events, and Vastav Group marketing opportunities." },
              { title: "Vastav Group & VIIPS Collaboration", description: "Connect with VIIPS-based startups, receive startup consultancy, and access Vastav Community and networking support to take your business to the next level." },
              { title: "Internship and Volunteering Opportunities", description: "Gain valuable work experience with internship offers and volunteering opportunities within the Vastav network, setting you up for future career success." },
              { title: "Government Scheme Updates & Funding Consultancy", description: "Stay updated on government schemes and receive expert funding consultancy to secure financial support for your startup." },
              { title: "Competitions & Guidance", description: "Access guidance and mentorship for national and international competitions, gaining exposure and recognition for your innovation." },
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

