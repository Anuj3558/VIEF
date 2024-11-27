import React, { useState, useEffect, useContext } from "react";
import { GalleryContext } from "../../contexts/GalleryContext";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch the gallery data from the context
  const { gallery } = useContext(GalleryContext);
  

  // Ensure gallery is not undefined and is an array
  const images = gallery && Array.isArray(gallery) ? gallery : [];

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (!isHovered && images.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (images.length === 0) {
    return <div>Loading gallery...</div>; // Display loading message if no data is available
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-5 px-4 mt-24">
      <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-center mb-8">
        <span className="text-black">Gallery</span>
      </h2>
      <div
        className="relative overflow-hidden rounded-xl shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image) => (
            <div
              key={image._id}
              className="w-full flex-shrink-0 relative group"
            >
              <div className="relative">
                <img
                  src={image.photo}
                  alt={image.title}
                  className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
                />
                {/* Text overlay that's always visible */}
                <div className="absolute bottom-4 right-4 text-right text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-lg">
                    {image.title}
                  </h3>
                  <p className="text-sm md:text-base mb-1 drop-shadow-lg">
                    {image.subtitle}
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
