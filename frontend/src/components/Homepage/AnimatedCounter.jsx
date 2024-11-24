import React, { useEffect, useState } from "react";
import { bgTexture } from "../../Assets/images";

function Counter({ end, duration = 2000, prefix = "", suffix = "", label }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(
        `counter-${label.replace(/\s+/g, "-")}`
      );
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [label]);

  useEffect(() => {
    if (isVisible) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        if (progress < duration) {
          const current = Math.min(
            end,
            Math.floor((progress / duration) * end)
          );
          setCount(current);
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [end, duration, isVisible]);

  return (
    <div
      id={`counter-${label.replace(/\s+/g, "-")}`}
      className="flex flex-col items-center text-center w-full sm:w-auto"
    >
      <div className="text-[#FF4D00] text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 text-xs sm:text-sm px-2 sm:px-0">
        {label}
      </div>
    </div>
  );
}

export default function AnimatedCounters() {
  return (

    <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-5 text-2xl montserrat-light mx-auto">
       
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-7 py-8 sm:py-12 place-items-center">
        <Counter end={100} suffix="+" label="Venture Incubation" />
        <Counter end={15070} suffix="+" label="Job Created" />
        <Counter end={80} suffix="+" label="Session's Conducted" />
        <Counter end={12300} suffix="+" label="Entrepreneurs Engaged" />

        <Counter
          end={1}
          prefix="$"
          suffix="bn"
          label="Combined Value Of Incubated Ventures"
        />
      </div>
      </div>
    
  );
}