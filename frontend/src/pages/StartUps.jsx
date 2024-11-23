'use client'

import React from "react"
import { motion } from "framer-motion"

import { ExternalLink, Pizza } from 'lucide-react'
import { COCA, MC, Pizza1, Swiggy } from "../Assets/images"

const StartupCard = ({ name, logo, website }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center"
  >
    <div className="w-full max-w-[280px] overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square ">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-full object-contain"
        />
      </div>
      <div className="bg-[#1a237e] py-2 px-4">
        <h3 className="text-center text-white font-medium">{name}</h3>
      </div>
      <motion.a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-2 px-4 text-center text-[#1a237e] hover:text-[#FF4D00] transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center gap-2">
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </span>
      </motion.a>
    </div>
  </motion.div>
)

const StartupSection = ({ title, startups }) => (
  <section className="my-16">
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-12"
    >
      {title}
    </motion.h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {startups.map((startup, index) => (
        <StartupCard key={index} {...startup} />
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-xl underline font-medium text-[#1a237e] hover:text-[#FF4D00] transition-colors"
      >
        More
      </motion.button>
    </motion.div>
  </section>
)

export default function StartupsPage() {
  const currentStartups = Array(6).fill({
    name: "Swiggy",
    logo: Swiggy,
    website: "https://www.volkswagen.com"
  })

  const successfulStartups = Array(6).fill({
    name: "Dominos",
    logo: Pizza1,
    website: "https://www.volkswagen.com"
  })

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StartupSection title="Current Startups" startups={currentStartups} />
        <StartupSection title="Successful Startups" startups={successfulStartups} />
      </main>
    </div>
  )
}

