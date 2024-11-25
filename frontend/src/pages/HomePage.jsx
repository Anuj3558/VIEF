import React from "react";
import Hero from "../components/Homepage/Herosection";
import GlimpseOfWork from "../components/Homepage/GlimpseOfWork.jsx"
import AnimatedCounters from "../components/Homepage/AnimatedCounter.jsx";
import StoriesSection from "../components/Homepage/StoriesSection.jsx";
import EventsSection from "../components/Homepage/OurEvents.jsx";
import SupportersSection from "../components/Homepage/OurSupporter.jsx";
import ImageCarousel from "../components/Homepage/Caraocel.jsx";

import TrendingEventOverlay from "../components/Homepage/compoents/TrendingEventOverlay.jsx";
import HowToJoinSection from "../components/Homepage/HowtoJoin.jsx";

import EventsSectionHome from "../components/Homepage/OurEvents.jsx";
import Investors from "../components/Homepage/Investors.jsx";


const  HomePage =()=>{
    return (
      <> 
      <TrendingEventOverlay />
        <Hero />
        <AnimatedCounters/>
        <StoriesSection />
        <GlimpseOfWork />
        <HowToJoinSection />
        <ImageCarousel/>
        
        <EventsSectionHome  />
        <Investors />
        <SupportersSection/>
        
       
      </>
    );
}

export default HomePage