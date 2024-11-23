'use client'

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'




const schemes = [
  {
    title: "PRE-INCUBATION",
    date: "15 April 2023",
    deadline: "Deadline",
    description:
      "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects.",
    image: "",
  },
  {
    title: "SEED INVESTMENT",
    date: "20 April 2023",
    deadline: "Deadline",
    description:
      "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
    image: "",
  },
  {
    title: "Award 2023-24",
    date: "19 April 2023",
    deadline: "Deadline",
    description:
      "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
    image: "",
  },
]

export default function ApplyNowPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const SchemeSection = ({ schemes }) => (
    <section className="my-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Schemes Available
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {schemes.map((scheme, index) => (
          <motion.div key={index} variants={itemVariants} className="relative group">
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative rounded-[2rem] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={scheme.image}
                  alt={scheme.title}
                  className="w-full h-[250px] object-cover"
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center cursor-pointer group-hover:bg-[#FF4D00] transition-colors duration-300"
                >
                  <ArrowUpRight
                    className="w-6 h-6 text-[#1a237e] rotate-[-45deg] group-hover:text-white transition-colors duration-300"
                  />
                </motion.div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-2xl p-2 mb-4">
                  <h3 className="text-[#1a237e] text-lg font-semibold line-clamp-1">
                    {scheme.title}
                  </h3>
                  <div className="flex flex-col items-end gap-1 ml-auto">
                    <span className="text-sm text-gray-600">{scheme.date}</span>
                    <span className="text-xs text-[#FF4D00]">{scheme.deadline}</span>
                  </div>
                </div>

                <div className="bg-[#1a237e] text-white p-4 rounded-xl">
                  <p className="text-sm leading-relaxed line-clamp-3">{scheme.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl font-medium text-[#1a237e] hover:text-[#FF4D00] transition-colors"
        >
          More
        </motion.button>
      </motion.div>
    </section>
  )

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SchemeSection schemes={schemes} />
        
      </main>
    </div>
  )
}

