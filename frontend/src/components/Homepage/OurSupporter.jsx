import React from "react";
import { DPToFSci, DST, MSHL, StartupIndia } from "../../Assets/images";

function SupportersSection() {
  const supporters = [
    {
      name: "MeitY Startup Hub",
      logo: MSHL,
    },
    {
      name: "DST NIDHI",
      logo: DST,
    },
    {
      name: "Department of Science & Technology",
      logo: DPToFSci,
    },
    {
      name: "Startup India",
      logo: StartupIndia,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <h2 className="text-4xl font-bold">
          <span className="text-[#FF4D00]">Our</span>{" "}
          <span className="text-[#1a237e]">Supporters</span>
        </h2>

        <div className="flex items-center justify-center gap-6">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 w-[200px] h-[120px] flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <img
                src={supporter.logo}
                alt={supporter.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupportersSection;
