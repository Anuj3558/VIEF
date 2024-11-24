import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the scheme ID from URL
import axios from "axios";
import { Scheme } from "../Assets/images"; // Make sure this is correctly imported

const SchemeDetails = () => {
  const { id } = useParams(); // Get scheme ID from the URL
  const [schemeDetails, setSchemeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch scheme details based on the ID
  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/scheme-details?id=${id}`
        );
        setSchemeDetails(response.data); // Store fetched scheme details in state
      } catch (err) {
        setError(err.message); // Handle errors if any
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchSchemeDetails();
  }, [id]); // Re-run the effect when the ID changes

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <p>Loading scheme details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // If data is available, render it
  return (
    <div className="max-w-7xl mx-auto md:pt-[4%]">
      {/* Hero Image Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={schemeDetails.image || Scheme} // Use fetched image or fallback to default image
          alt={schemeDetails.title}
          className="w-full h-[400px] object-cover"
        />

        {/* Apply Now Button */}
        <div className="absolute inset-0 flex items-end bottom-5 justify-center">
          <button className="bg-[#1a237e] text-white px-12 py-3 rounded-lg text-xl font-medium hover:bg-[#1a237e]/90 transition-colors">
            Apply Now
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="border-b border-dashed border-gray-200 pb-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-[#1a237e] text-3xl font-bold">
            {schemeDetails.title}
          </h1>
          <div className="text-right">
            <div className="text-lg">{schemeDetails.date}</div>
            <div className="text-[#FF4D00]">{schemeDetails.deadline}</div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          {schemeDetails.description}
        </p>
      </div>
    </div>
  );
};

export default SchemeDetails;
