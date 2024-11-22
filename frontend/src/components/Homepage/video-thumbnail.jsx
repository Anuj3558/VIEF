import React from "react";
import { FaPlay } from "react-icons/fa"; // Using Font Awesome React Icons for the play button

const VideoThumbnail = ({ src, alt, className }) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
          <FaPlay className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
