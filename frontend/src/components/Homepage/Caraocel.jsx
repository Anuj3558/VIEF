import React, { useState } from "react";
import { Frame329, Rectangle10, Rectangle11, Rectangle8 } from "../../Assets/images";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: Frame329, alt: "Image 1" },
    { src: Rectangle8, alt: "Image 2" },
    { src: Rectangle10, alt: "Image 3" },
    { src: Rectangle11, alt: "Image 4" },
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
    <div className="max-w-4xl mx-auto my-12 relative">
      <h2 className="text-4xl font-bold text-center mb-8">
        <span className="text-[#FF4D00]">Our</span>{" "}
        <span className="text-[#1a237e]">Gallery</span>
      </h2>
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[400px] object-cover"
              />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-[#1a237e] p-2 rounded-full hover:bg-[#FF4D00] hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-[#1a237e] p-2 rounded-full hover:bg-[#FF4D00] hover:text-white transition-colors"
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentIndex ? "bg-[#FF4D00]" : "bg-[#1a237e]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
