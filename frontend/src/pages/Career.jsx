import React from "react";
import { Megaphone, Rocket, Target, Users } from "lucide-react";
import { Rectangle62 } from "../Assets/images";

const CategoryCard = ({ icon: Icon, title, subtitle, isActive }) => {
  return (
    <div
      className={`flex items-center gap-4 p-6 rounded-xl shadow-lg cursor-pointer transition-all
        ${isActive ? "bg-[#FF4D00] text-white" : "hover:bg-[#ff9f76]"}`}
    >
      <Icon
        className={`w-6 h-6 ${isActive ? "text-white" : "text-[#FF4D00]"}`}
      />
      <div>
        <h3 className="font-medium">{title}</h3>
        {subtitle && (
          <p
            className={`text-sm ${
              isActive ? "text-white/90" : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const CareerSection = () => {
  const categories = [
    {
      icon: Megaphone,
      title: "Jobs at IIED",

      isActive: false,
    },
    {
      icon: Rocket,
      title: "Jobs at startup",
      isActive: false,
    },
    {
      icon: Target,
      title: "Apply for internship",
      isActive: false,
    },
    {
      icon: Users,
      title: "Join as volunteer",
      isActive: false,
    },
  ];
  const categories1 = [
    {
      icon: Users,
      title: "Join as volunteer",
      isActive: false,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] mb-16 md:pt-[4%]">
        <img
          src={Rectangle62}
          alt="Career opportunities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl text-left font-bold mt-14 ">Join us</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#FF4D00] mb-2">Opportunity to be an</p>
            <h2 className="text-3xl font-bold mb-8">Investor</h2>
            <button className="text-[#fff] px-6 text-xl py-3 rounded-md bg-[#FF4D00] hover:bg-[#FF3D11] mb-2">Apply as an Investor</button>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#FF4D00] mb-2">Opportunities for you</p>
            <h2 className="text-3xl font-bold">Career</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                icon={category.icon}
                title={category.title}
                subtitle={category.subtitle}
                isActive={category.isActive}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;
