import React from 'react'
import { motion } from 'framer-motion'

const SuccessStoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Success Story Hero"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Our Success Stories
          </motion.h1>
        </div>
      </motion.div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              From Startup to Industry Leader: The Journey of TechInnovate
            </h2>
          
            <div className="mb-8">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="TechInnovate Team"
                width={800}
                height={400}
                className="rounded-lg shadow-md w-full"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                In the heart of Silicon Valley, a small team of passionate engineers and designers 
                came together with a vision to revolutionize the way people interact with technology. 
                This is the story of TechInnovate, a company that started in a garage and grew to 
                become a global leader in user experience design.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">The Beginning</h3>
              <p>
                Founded by Sarah Chen and Michael Rodriguez in 2015, TechInnovate began as a small 
                consulting firm specializing in user interface design. With their combined expertise 
                in software engineering and human-computer interaction, they saw an opportunity to 
                create more intuitive and accessible technology solutions.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">The Breakthrough</h3>
              <p>
                In 2017, TechInnovate launched their flagship product, an AI-powered design assistant 
                that could generate user interface mockups based on natural language descriptions. 
                This innovative tool caught the attention of major tech companies and quickly gained 
                traction in the industry.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Scaling Up</h3>
              <p>
                As demand for their products grew, so did the company. TechInnovate expanded from a 
                team of 5 to over 100 employees in just two years. They opened offices in New York, 
                London, and Tokyo, serving clients across the globe.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Impact and Recognition</h3>
              <p>
                Today, TechInnovate's tools are used by millions of designers and developers worldwide. 
                The company has won numerous awards for innovation and was recently named one of the 
                fastest-growing tech companies in the US.
              </p>

              <blockquote className="italic border-l-4 border-blue-500 pl-4 my-8 bg-blue-50 p-4 rounded-r-lg">
                "Our success is a testament to the power of user-centered design and the incredible 
                team we've built. We're excited to continue pushing the boundaries of what's possible 
                in technology." - Sarah Chen, Co-founder and CEO
              </blockquote>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Looking Ahead</h3>
              <p>
                As TechInnovate looks to the future, they remain committed to their original mission 
                of making technology more accessible and user-friendly. With ongoing research into 
                emerging technologies like virtual reality and brain-computer interfaces, the company 
                is poised to continue its trajectory of innovation and growth.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SuccessStoryPage

