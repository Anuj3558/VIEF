import React, { useState } from "react";
import { Frame329, Rectangle10, Rectangle11, Rectangle8 } from "../../Assets/images";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { 
      src: Frame329, 
      alt: "Image 1",
      title: "Innovation Hub",
      description: "Empowering startups with cutting-edge resources",
      subtext: "Transform your vision into reality"
    },
    { 
      src: Rectangle8, 
      alt: "Image 2",
      title: "Collaborative Spaces",
      description: "Modern workspaces designed for creativity",
      subtext: "Where ideas come to life"
    },
    { 
      src: Rectangle10, 
      alt: "Image 3",
      title: "Tech Ecosystem",
      description: "Connecting entrepreneurs with global opportunities",
      subtext: "Accelerating startup success"
    },
    { 
      src: Rectangle11, 
      alt: "Image 4",
      title: "Mentorship Program",
      description: "Guided growth from industry experts",
      subtext: "Your path to excellence"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-10 my-32 px-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
        <span className="text-[#FF4D00]">Our</span>{" "}
        <span className="text-[#1a237e]">Gallery</span>
      </h2>
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-4 right-4 text-right text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    {image.title}
                  </h3>
                  <p className="text-sm md:text-base mb-1">
                    {image.description}
                  </p>
                  <p className="text-xs md:text-sm opacity-80">
                    {image.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-1 ${
                index === currentIndex ? "bg-[#FF4D00]" : "bg-[#1a237e]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;