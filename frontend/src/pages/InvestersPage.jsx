import React, { useContext } from "react";
import { MentorContext } from "../contexts/MentorContext.js";
import { TeamSection } from "../pages/AboutUs.jsx";

const Investors = () => {
  const { mentors } = useContext(MentorContext);

  // Filter investors and limit to 4
  const investors = mentors
    .filter((mentor) => mentor.position === "Investor")
    

  return (
    <main className=" bg-gray-50/50 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TeamSection title="Investors" homePage={"true"} members={investors} />
      </div>
    </main>
  );
};

export default Investors;
