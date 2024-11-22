import React from "react";
import Hero from "../components/Homepage/Herosection";
import GlimpseOfWork from "../components/Homepage/GlimpseOfWork.jsx"
import AnimatedCounters from "../components/Homepage/AnimatedCounter.jsx";
import StoriesSection from "../components/Homepage/StoriesSection.jsx";


const  HomePage =()=>{
    return (
      <>
        <Hero />
        <AnimatedCounters/>
        <StoriesSection />
        <GlimpseOfWork />
      </>
    );
}

export default HomePage