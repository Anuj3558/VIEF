import React from "react";
import { Monitor, Heart, Users, Rocket, Cpu, Banknote, GraduationCap, Leaf, Tractor, Film, Car, ShoppingCart, Utensils, Plane, Scale, Shield } from "lucide-react";

const CohortCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center mt-12 text-center max-w-[250px]">
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
      icon: Cpu,
      title: "Deep Tech Startups",
      description: "Innovative technologies like AI, blockchain, robotics, and quantum computing, shaping industries and enabling futuristic solutions in complex, high-tech domains."
    },
    {
      icon: Heart,
      title: "HealthTech",
      description: "Revolutionizing healthcare with digital solutions, biotech, medical devices, and telemedicine to improve patient care and healthcare system efficiency."
    },
    {
      icon: Banknote,
      title: "FinTech",
      description: "Transforming financial services through digital payments, blockchain, and secure financial solutions that enhance banking systems and promote inclusivity."
    },
    {
      icon: GraduationCap,
      title: "EdTech",
      description: "Innovating education through e-learning platforms, virtual classrooms, and training tools, empowering students and professionals with accessible, interactive learning experiences."
    },
    {
      icon: Leaf,
      title: "CleanTech & Sustainability",
      description: "Creating eco-friendly solutions for environmental challenges, renewable energy, waste management, and sustainable agriculture to promote a greener, sustainable future."
    },
    {
      icon: Tractor,
      title: "AgriTech",
      description: "Using technology to enhance agriculture with precision farming, sustainable practices, and optimized supply chains to address global food security."
    },
    {
      icon: Users,
      title: "Social Entrepreneurship",
      description: "Focusing on creating social impact by addressing issues like poverty, healthcare, and education, empowering underserved populations for lasting change."
    },
    {
      icon: Users,
      title: "Women Empowerment",
      description: "Promoting gender equality through initiatives in leadership, education, entrepreneurship, and employment, empowering women to drive change across sectors."
    },
    {
      icon: Film,
      title: "Media & Entertainment",
      description: "Transforming entertainment with digital content, streaming, gaming, and immersive technologies, creating engaging experiences for global audiences."
    },
    {
      icon: Car,
      title: "Mobility & Transportation",
      description: "Innovating in urban mobility through electric vehicles, autonomous transport, ride-sharing, and smart infrastructure to promote sustainable, efficient travel solutions."
    },
    {
      icon: ShoppingCart,
      title: "RetailTech & E-commerce",
      description: "Revolutionizing retail with e-commerce platforms, omnichannel solutions, and AI-driven experiences, enhancing shopping convenience and customer engagement."
    },
    {
      icon: Utensils,
      title: "FoodTech",
      description: "Innovating food production, delivery, and sustainability, with plant-based alternatives and smart kitchen technology reshaping the food industry."
    },
    {
      icon: Plane,
      title: "TravelTech",
      description: "Revolutionizing travel with booking platforms, personalized apps, and smart tourism solutions to enhance convenience, safety, and global experiences."
    },
    {
      icon: Scale,
      title: "LegalTech",
      description: "Leveraging technology to streamline legal processes, including AI, contract management, and blockchain, improving access and efficiency in legal services."
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Securing digital assets with advanced encryption, threat detection, and privacy solutions to protect individuals and businesses from cyber risks."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32">
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
