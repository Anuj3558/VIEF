import React from "react";
import { Rectangle23, Rectangle27, Rectangle27_1 } from "../../Assets/images";

const EventsSection = () => {
  const events = [
    {
      title: "How To Build A Startup",
      date: "5 April 2023",
      isOnline: true,
      description:
        "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects.",
      image: Rectangle23,
    },
    {
      title: "Case Study Of Zomato",
      date: "20 April 2023",
      isOnline: true,
      description:
        "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
      image: Rectangle27,
    },
    {
      title: "Award 2023-24",
      date: "19 April 2023",
      isOnline: true,
      description:
        "We Are Thrilled To Announce A Significant Achievement For IIITD And Our Incubation Centre. During The Recent Budget Session, Ms. Atishi Highlighted Several.",
      image: Rectangle27_1,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12">Our Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {events.map((event, index) => (
          <div key={index} className="relative group">
            <div className="rounded-2xl overflow-hidden bg-white">
              <div className="relative rounded-[2rem] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[250px] object-cover" // Increased height from 200px to 250px
                />
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#FF4D00] transition-colors">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-[#1a237e] group-hover:text-white transition-colors rotate-[-45deg]" // Added rotate-[-45deg] for 45-degree upward rotation
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-2xl p-2 mb-4">
                  <h3 className="text-[#1a237e] text-lg font-semibold">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-600">{event.date}</span>
                    {event.isOnline && (
                      <span className="text-[#00C944] text-sm">Online</span>
                    )}
                  </div>
                </div>

                <div className="bg-[#FF4D00] text-white p-4 rounded-xl">
                  <p className="text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="text-xl font-medium hover:text-[#FF4D00] transition-colors">
          More
        </button>
      </div>
    </div>
  );
};

export default EventsSection;
