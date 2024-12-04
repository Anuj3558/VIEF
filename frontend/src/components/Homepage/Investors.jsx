import React, { useContext, useState } from "react";
import { MentorContext } from "../../contexts/MentorContext.js";
import { TeamSection } from "../../pages/AboutUs";
import { SponsorContext } from "../../contexts/SponsorContext.js";
import { Link } from "react-router-dom";
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
          <Link to={"/achievements"} >
          <button
            className="text-xl underline font-medium hover:text-[#FF4D00] transition-colors"
          >
            More
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const Investors = () => {
  const {partnerships} = useContext(SponsorContext)

  // Filter investors and limit to 4
  const investors = partnerships
    .slice(0, 4);

  return (
    <main className=" ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PartnershipGrid />
      </div>
    </main>
  );
};

export default Investors;
