import React, { useEffect, useState } from "react";

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
      className="flex flex-col items-center"
    >
      <div className="text-[#FF4D00] text-4xl font-bold mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
}

export default function AnimatedCounters() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-between items-start gap-4 py-12">
        <Counter end={100} suffix="+" label="Venture Incubation" />
        <Counter end={15070} suffix="+" label="Job Created" />
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
