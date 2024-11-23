'use client'

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'



const events = [
  {
    title: "How To Build A Startup",
    date: "5 April 2023",
    isOnline: true,
    description:
      "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Case Study Of Zomato",
    date: "20 April 2023",
    isOnline: true,
    description:
      "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
    image: "",
  },
  {
    title: "Award 2023-24",
    date: "19 April 2023",
    isOnline: true,
    description:
      "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
    image: "",
  },
]

const pastEvents = [...events]

export default function EventsPage() {
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

  const EventSection = ({ title, events }) => (
    <section className=" my-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {events.map((event, index) => (
          <motion.div key={index} variants={itemVariants} className="relative group">
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative rounded-[2rem] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={event.image}
                  alt={event.title}
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
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 ml-auto whitespace-nowrap">
                    <span className="text-sm text-gray-600">{event.date}</span>
                    {event.isOnline && (
                      <span className="text-[#00C944] text-sm">Online</span>
                    )}
                  </div>
                </div>

                <div className="bg-[#FF4D00] text-white p-4 rounded-xl">
                  <p className="text-sm leading-relaxed line-clamp-3">{event.description}</p>
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
    <main className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EventSection title="Upcoming Events" events={events} />
        <EventSection title="Past Events" events={pastEvents} />
      </div>
    </main>
  )
}