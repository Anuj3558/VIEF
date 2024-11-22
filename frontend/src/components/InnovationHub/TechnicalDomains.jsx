import React from "react";
import {
  BotIcon as Robot,
  Factory,
  Printer,
  Brain,
  Leaf,
  Wifi,
  LineChart,
  Car,
  Globe,
  Network,
  Shield,
  DrillIcon as Drone,
} from "lucide-react";

const DomainCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-[250px]">
      <div className="w-16 h-16 rounded-full bg-[#FFE4E0] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#1a237e]" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const TechnicalDomains = () => {
  const domains = [
    {
      icon: Robot,
      title: "Robotics",
      description:
        "Deep technology or hard tech is a classification of organization, or more generally a classification of technology, based on substantial technology solutions based on substantial scientific or engineering challenges.",
    },
    {
      icon: Factory,
      title: "Industry Automation",
      description:
        "Industry 4.0 is concerned with smart manufacturing where machines instantly specialize in their own role.",
    },
    {
      icon: Printer,
      title: "Rapid Prototyping",
      description:
        "Rapid prototyping is the fast fabrication of a physical part, model or assembly using 3D CAD or solid design tools.",
    },
    {
      icon: Brain,
      title: "AI/ML",
      description:
        "AI and ML is a technology which enables a machine to simulate human behavior.",
    },
    {
      icon: Leaf,
      title: "Green Energy And Energy Conservation",
      description:
        "Energy conservation is the effort made to reduce the consumption of energy by using less of an energy service.",
    },
    {
      icon: Wifi,
      title: "Internet Of Things",
      description:
        "IoT describes physical objects that are embedded with sensors, software, and other technologies for exchanging data with other devices.",
    },
    {
      icon: LineChart,
      title: "Data Analytics",
      description:
        "Data analytics is the science of examining raw data to conclude that information.",
    },
    {
      icon: Car,
      title: "Autonomous Electric Vehicles",
      description:
        "A EVs use AI and next-generation batteries, providing better and cleaner transport and could be one of the biggest innovations of the previous decade.",
    },
    {
      icon: Globe,
      title: "Web Applications",
      description:
        "A web application is application software that runs in a web browser, unlike software programs that run locally on the operating system of the device.",
    },
    {
      icon: Network,
      title: "Block Chain",
      description:
        "Blockchain uses a digital ledger of transactions that is duplicated and distributed across computer systems on the blockchain.",
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description:
        "Cyber security is the practice of defending computers, servers, mobile devices, networks, and data from malicious attacks.",
    },
    {
      icon: Drone,
      title: "Drone Technology",
      description:
        "Drone technology continues to evolve, making drones more suitable for enterprise use through their embedded systems.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-16">
        Technical Domains
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center">
        {domains.map((domain, index) => (
          <DomainCard
            key={index}
            icon={domain.icon}
            title={domain.title}
            description={domain.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TechnicalDomains;
