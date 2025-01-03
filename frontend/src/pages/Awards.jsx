import React, { useContext, useState } from "react";
import { Rectangle26, Rectangle57, Rectangle59 } from "../Assets/images";
import { AwardContext } from "../contexts/AwardContext";
import { SponsorContext } from "../contexts/SponsorContext";

// PartnershipGrid Component
const PartnershipGrid = () => {
  const {
    partnerships,
    loading: partnershipLoading,
    error: partnershipError,
  } = useContext(SponsorContext);

  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="max-w-7xl mx-auto mb-16 py-[4%]">
      <h2 className="text-4xl font-bold my-5 text-center mb-12">
        Partnership Collaboration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnershipLoading ? (
          <div className="text-center text-xl">Loading partnerships...</div>
        ) : partnershipError ? (
          <div className="text-center text-xl text-red-500">
            Error loading partnerships
          </div>
        ) : partnerships.length === 0 ? (
          <div className="text-center text-xl">No partnerships found</div>
        ) : (
          (showAll ? partnerships : partnerships.slice(0, 6)).map(
            (partnership, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden">
                <img
                  src={partnership.image}
                  alt={partnership.title}
                  className="w-full h-[250px] object-cover"
                />
                <div className="absolute bottom-4 px-3 text-center">
                  <p className="bg-[#FF4D00] text-white px-4 py-2 text-sm  rounded-lg">
                    {partnership.title}
                  </p>
                </div>
              </div>
            )
          )
        )}
      </div>
      {!showAll && partnerships.length > 6 && (
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
  } = useContext(AwardContext);

  return (
    <div className="mx-auto">
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
            <h1 className="text-5xl text-left text-white font-bold">Awards</h1>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="space-y-8">
        {awardLoading ? (
          <div className="text-center text-xl">Loading awards...</div>
        ) : awardError ? (
          <div className="text-center text-xl text-red-500">
            Error loading awards
          </div>
        ) : awards.length === 0 ? (
          <div className="text-center text-xl">No awards found</div>
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
