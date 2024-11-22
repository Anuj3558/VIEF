import React from "react";
import Hero from "../components/Homepage/Herosection";
import GlimpseOfWork from "../components/Homepage/GlimpseOfWork.jsx"
import AnimatedCounters from "../components/Homepage/AnimatedCounter.jsx";
import StoriesSection from "../components/Homepage/StoriesSection.jsx";
import EventsSection from "../components/Homepage/OurEvents.jsx";
import SupportersSection from "../components/Homepage/OurSupporter.jsx";
import ImageCarousel from "../components/Homepage/Caraocel.jsx";


const  HomePage =()=>{
    return (
      <>
        <Hero />
        <ImageCarousel/>
        <AnimatedCounters/>
        <StoriesSection />
        <GlimpseOfWork />
        <EventsSection/>
        <SupportersSection/>
      </>
    );
}

export default HomePage