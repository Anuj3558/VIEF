import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const videosData = [
  {
    id: 1,
    thumbnail: "https://res.cloudinary.com/dql4uvrzz/image/upload/v1732976085/wf45uoopuk0enx8ihbaf.jpg",
    video: "https://res.cloudinary.com/dql4uvrzz/video/upload/v1732974634/hsdpte3zjn7aja6s0gv3.mp4",
    alt: "Office workspace with computers and hanging lights"
  },
  {
    id: 2,
    thumbnail: "https://res.cloudinary.com/dql4uvrzz/image/upload/v1732976143/s2vt8qktzvey0zhq8qtb.jpg",
    video: "https://res.cloudinary.com/dql4uvrzz/video/upload/v1732974542/adiwdlubv2zdnttlkagr.mp4",
    alt: "Thumbnail 2"
  },
  {
    id: 3,
    thumbnail: "https://res.cloudinary.com/dql4uvrzz/image/upload/v1732976085/zl9gyavmxiuzdwssz5tx.jpg",
    video: "https://res.cloudinary.com/dql4uvrzz/video/upload/v1732974605/groeage3s6itumvplr93.mp4",
    alt: "Thumbnail 3"
  },
  {
    id: 4,
    thumbnail: "https://res.cloudinary.com/dql4uvrzz/image/upload/v1732976086/qxt28pcmgprjupjvw9zu.jpg",
    video: "https://res.cloudinary.com/dql4uvrzz/video/upload/v1732974576/xpzds4do8uzru6gagjfr.mp4",
    alt: "Thumbnail 4"
  },
  {
    id: 5,
    thumbnail: "https://res.cloudinary.com/dql4uvrzz/image/upload/v1732976167/d2og7kxlp28zmynjz5zk.jpg",
    video: "https://res.cloudinary.com/dql4uvrzz/video/upload/v1732974549/xzw68j8jban0tg5msk4w.mp4",
    alt: "Thumbnail 5"
  }
];

const VideoThumbnail = ({ src, videoSrc, alt, className, isPlaying }) => {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setCanPlay(true);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlay) return;

    const playVideo = async () => {
      try {
        if (isPlaying) {
          video.muted = true;
          await video.play();
          if (hasInteracted) {
            video.muted = false;
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.log("Playback failed:", error);
      }
    };

    playVideo();
  }, [isPlaying, canPlay, hasInteracted]);

  const handleVideoClick = () => {
    setHasInteracted(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  return (
    <div 
      className={`relative ${className} group`}
      onClick={handleVideoClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleVideoClick();
        }
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity duration-300 rounded-xl"></div>
      <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />
      {isPlaying && !hasInteracted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm">
          Click to unmute
        </div>
      )}
    </div>
  );
};

const WorkGlimpse = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-16 lg:py-20"
    >
      <motion.h2 
        variants={itemVariants}
        className="mb-14 text-center text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl"
      >
        Changing visions through missions.
      </motion.h2>
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {videosData.map((video, index) => (
          <motion.div 
            key={video.id} 
            variants={itemVariants}
            whileHover="hover"
            className={index === 0 ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1"}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <VideoThumbnail
              src={video.thumbnail}
              videoSrc={video.video}
              alt={video.alt}
              className="w-full h-full object-cover rounded-xl aspect-video"
              isPlaying={hoveredVideo === video.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WorkGlimpse;