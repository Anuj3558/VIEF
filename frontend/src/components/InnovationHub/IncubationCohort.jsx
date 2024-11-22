import React from "react";
import { Monitor, Heart, Users, Rocket } from "lucide-react";

const CohortCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-[250px]">
      <div className="w-16 h-16 rounded-full bg-[#FFE4E0] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#FF4D00]" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const IncubationCohort = () => {
  const cohorts = [
    {
      icon: Monitor,
      title: "Deep Tech Startup",
      description:
        "Deep technology or deep tech is a classification of organization, or more generally a classification of technology, based on the use of substantial technology solutions based on substantial scientific or engineering challenges.",
    },
    {
      icon: Heart,
      title: "Health Tech",
      description:
        "HealthTech addresses the software and technology solutions that healthcare organizations adopt to optimize and digitize the delivery and payment of healthcare services.",
    },
    {
      icon: Users,
      title: "Women Empowerment",
      description:
        "Clearly, there is a lot of work ahead to achieve gender equality in entrepreneurship. Empowerment should also focus on creating a supportive system that helps the block women-founders have been the most successful supporting women entrepreneurs.",
    },
    {
      icon: Rocket,
      title: "Social Entrepreneurship",
      description:
        "Social entrepreneurship aims to solve in innovative ways the most pressing and social issues that affect millions. It's a significant force that provides creative solutions.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-16">
        Incubation Cohort
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {cohorts.map((cohort, index) => (
          <CohortCard
            key={index}
            icon={cohort.icon}
            title={cohort.title}
            description={cohort.description}
          />
        ))}
      </div>
    </div>
  );
};

export default IncubationCohort;
