import React, { useContext, useState } from "react";
import { Rectangle26, Rectangle57, Rectangle59 } from "../Assets/images";
import { AwardContext } from "../contexts/AwardContext";
import { SponsorContext } from "../contexts/SponsorContext";

// PartnershipGrid Component
const PartnershipGrid = () => {
  const {
    sponsors,
    loading: sponsorLoading,
    error: sponsorError,
  } = useContext(SponsorContext); // Use SponsorContext
  
  const [showAll, setShowAll] = useState(false); // State to track if all sponsors are shown

  // Function to handle 'More' button click
  const handleShowAll = () => {
    setShowAll(true); // Show all sponsors
  };

  return (
    <div className="max-w-7xl mx-auto mb-16 py-[4%]">
      <h2 className="text-4xl font-bold my-5 text-center mb-12">
        Partnership Collaboration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsorLoading ? (
          <div className="text-center text-xl">Loading sponsors...</div> // Loading state message
        ) : sponsorError ? (
          <div className="text-center text-xl text-red-500">
            Error loading sponsors
          </div>
        ) : sponsors.length === 0 ? (
          <div className="text-center text-xl">No sponsors found</div> // Message if no sponsors are found
        ) : (
          (showAll ? sponsors : sponsors.slice(0, 6)).map((sponsor, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden">
              <img
                src={sponsor.image}
                alt={sponsor.title}
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#FF4D00] text-white px-4 py-2 rounded-lg">
                  {sponsor.title}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {!showAll && sponsors.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowAll}
            className="text-xl underline font-medium hover:text-[#FF4D00] transition-colors"
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

// AwardCard Component
const AwardCard = ({ image, title, description }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-2xl p-8 shadow-md mb-8">
      <div className="w-full md:w-1/3">
        <img
          src={image || Rectangle59}
          alt={title}
          className="w-full h-[250px] object-cover rounded-xl"
        />
      </div>
      <div className="w-full md:w-2/3">
        <h3 className="text-2xl font-bold mb-4 text-left">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-left">{description}</p>
      </div>
    </div>
  );
};

// AwardsSection Component
const AwardsSection = () => {
  const {
    awards,
    loading: awardLoading,
    error: awardError,
  } = useContext(AwardContext); // Use AwardContext

  return (
    <div className=" mx-auto ">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-16 md:pt-[4%]">
        <img
          src={Rectangle57}
          alt="Career opportunities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 mt-16">
            <h1 className="text-5xl text-left text-white font-bold ">Awards</h1>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="space-y-8">
        {awardLoading ? (
          <div className="text-center text-xl">Loading awards...</div> // Loading state message
        ) : awardError ? (
          <div className="text-center text-xl text-red-500">
            Error loading awards
          </div>
        ) : awards.length === 0 ? (
          <div className="text-center text-xl">No awards found</div> // Message if no awards are found
        ) : (
          awards.map((award, index) => (
            <AwardCard
              key={index}
              title={award.title}
              description={award.description}
              image={award.image}
            />
          ))
        )}
      </div>

      {/* Partnership Section */}
      <PartnershipGrid />
    </div>
  );
};

export default AwardsSection;
