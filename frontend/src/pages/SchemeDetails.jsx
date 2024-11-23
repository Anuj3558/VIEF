import React from "react";
import { RectangleScheme, Scheme } from "../Assets/images";

const PreIncubation = () => {
  return (
    <div className="max-w-7xl mx-auto md:pt-[4%]">
      {/* Hero Image Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={Scheme}
          alt="Pre-incubation presentation"
          className="w-full h-[400px] object-cover"
        />

        {/* Apply Now Button */}
        <div className="absolute inset-0 flex  items-end bottom-5 justify-center">
          <button className="bg-[#1a237e] text-white px-12 py-3 rounded-lg text-xl font-medium hover:bg-[#1a237e]/90 transition-colors">
            Apply Now
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="border-b border-dashed border-gray-200 pb-4 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-[#1a237e] text-3xl font-bold">Pre-Incubation</h1>
          <div className="text-right">
            <div className="text-lg">13 April 2023</div>
            <div className="text-[#FF4D00]">Deadline</div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">
          We Are Thrilled To Announce A Significant Achievement For IIITD And
          Our Incubation Centre. During The Recent Budget Session, Ms. Atishi
          Highlighted Several Key Aspects,We Are Thrilled To Announce A
          Significant Achievement For IIITD And Our Incubation Centre. During
          The Recent Budget Session, Ms. Atishi Highlighted Several Key
          Aspects,We Are Thrilled To Announce A Significant Achievement For
          IIITD And Our Incubation Centre. During The Recent Budget Session, Ms.
          Atishi Highlighted Several Key Aspects,We Are Thrilled To Announce A
          Significant Achievement For IIITD And Our Incubation Centre. During
          The Recent Budget Session, Ms. Atishi Highlighted Several Key
          Aspects,We Are Thrilled To Announce A Significant Achievement For
          IIITD And Our Incubation Centre. During The Recent Budget Session, Ms.
          Atishi Highlighted Several Key Aspects,We Are Thrilled To Announce A
          Significant Achievement For IIITD And Our Incubation Centre. During
          The Recent Budget Session, Ms. Atishi Highlighted Several Key Aspects.
        </p>
      </div>
    </div>
  );
};

export default PreIncubation;
