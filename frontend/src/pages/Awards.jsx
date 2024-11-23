import React from "react";
import {
  Rectangele57,
  Rectangle26,
  Rectangle57,
  Rectangle59,
} from "../Assets/images";

const PartnershipGrid = () => {
  const universities = Array(9).fill({
    name: "XYZ University",
    image: "/placeholder.svg?height=300&width=400",
  });

  return (
    <div className="max-w-7xl mx-auto mb-16 py-[4%]">
      <h2 className="text-4xl font-bold text-center mb-12">
        Partnership Collaboration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni, index) => (
          <div key={index} className="relative rounded-2xl overflow-hidden">
            <img
              src={Rectangle26}
              alt={uni.name}
              className="w-full h-[250px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#FF4D00] text-white px-4 py-2 rounded-lg">
                {uni.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="#"
          className="text-xl font-medium hover:text-[#FF4D00] transition-colors"
        >
          More
        </a>
      </div>
    </div>
  );
};

const AwardCard = ({ image, title, description }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-2xl p-8 shadow-sm mb-8">
      <div className="w-full md:w-1/3">
        <img
          src={Rectangle59}
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

const AwardsSection = () => {
  const awards = [
    {
      title: "Best Incubation Award",
      description:
        "It's time to shine a spotlight on innovation and entrepreneurship! Join us at IIITD-IC as we present an exhilarating Investors Meet, where the brightest minds collide. Don't just spectate, participate! If you are a startup who has developed the product and looking for scaling up your venture with backup from VCs, do submit your application.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Best Incubation Award",
      description:
        "It's time to shine a spotlight on innovation and entrepreneurship! Join us at IIITD-IC as we present an exhilarating Investors Meet, where the brightest minds collide. Don't just spectate, participate! If you are a startup who has developed the product and looking for scaling up your venture with backup from VCs, do submit your application.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Best Incubation Award",
      description:
        "It's time to shine a spotlight on innovation and entrepreneurship! Join us at IIITD-IC as we present an exhilarating Investors Meet, where the brightest minds collide. Don't just spectate, participate! If you are a startup who has developed the product and looking for scaling up your venture with backup from VCs, do submit your application.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

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
          <div className="container mx-auto px-4">
            <h1 className="text-5xl text-left font-bold ">Awards</h1>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="space-y-8">
        {awards.map((award, index) => (
          <AwardCard key={index} {...award} />
        ))}
      </div>
      {/* Partnership Section */}
      <PartnershipGrid />
    </div>
  );
};

export default AwardsSection;
