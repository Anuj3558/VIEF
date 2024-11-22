import React from "react";
import { COCA, MC } from "../../Assets/images";

function StoriesSection() {
  const stories = [
    {
      title: "MC DONALDS",
      subtitle: "Expanding exponentially",
      image: MC,
    },
    {
      title: "COCA - COLA",
      subtitle: "Expanding exponentially",
      image: COCA,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Left Section */}
        <div className="md:w-1/3 flex flex-col justify-start">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[#FF4D00]">Stories to</span>
            <br />
            <span className="text-[#1a237e]">Inspire You</span>
          </h2>
          <button className="bg-[#1a237e] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#1a237e]/90 transition-colors self-start">
            Explore
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Section - Stories Grid */}
        <div className="grid md:grid-cols-2 gap-6 flex-1">
          {stories.map((story, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-sm opacity-90">{story.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoriesSection;
