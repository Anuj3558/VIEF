import React from "react";
import { 
  Brain, Cpu, BotIcon as Robot, Network, Shield, Rocket, Microscope, Stethoscope, Tablet, Phone, Pill, Wallet, BarChart3, CreditCard, FileText, PiggyBank, GraduationCap, Smartphone, Building2, VibrateIcon as Vr, Leaf, Recycle, Sprout, Droplet, Home, Tractor, Binary, Plane, FileSearch, Scale, FileCode2, Lightbulb, Wind, Waves, Flame, Zap, Activity, Car, TrafficConeIcon as TrafficLights, Map, ShoppingCart, Store, Box, PieChart, Glasses, UtensilsCrossed, Carrot, ChefHat,
  MessageSquare, Camera, Users, Factory, PenTool, Package, Watch, Search, Sun, Battery
} from 'lucide-react';
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
  
const domains= [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Transforming industries with intelligent algorithms and data-driven insights for automation, predictive analytics, and enhanced decision-making."
  },
  {
    icon: Cpu,
    title: "Quantum Computing",
    description: "Harnessing quantum mechanics to solve complex computational problems, revolutionizing industries like cryptography, optimization, and material science."
  },
  {
    icon: Robot,
    title: "Robotics & Automation",
    description: "Designing robots and systems to perform tasks autonomously, enhancing efficiency, precision, and reducing labor dependency in various sectors."
  },
  {
    icon: Network,
    title: "Blockchain Technology",
    description: "Providing decentralized, secure solutions for data sharing, transactions, and record-keeping, with applications in finance, healthcare, and beyond."
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protecting digital assets from cyber threats with advanced encryption, threat detection, and real-time monitoring systems."
  },
  {
    icon: Rocket,
    title: "SpaceTech",
    description: "Innovating space exploration and satellite technologies, enabling new discoveries and services in communications, agriculture, and global positioning."
  },
  {
    icon: Microscope,
    title: "Biotech & Life Sciences",
    description: "Revolutionizing healthcare with cutting-edge biotechnology, improving diagnostics, therapies, and personalized medicine for better health outcomes."
  },
  {
    icon: Stethoscope,
    title: "MedTech (Medical Devices)",
    description: "Designing medical devices that monitor, diagnose, and treat diseases, enhancing patient care and advancing healthcare technologies."
  },
  {
    icon: Tablet,
    title: "Digital Health Solutions",
    description: "Integrating technology to provide remote healthcare services, improving access to quality health services and patient engagement."
  },
  {
    icon: Phone,
    title: "Health IT & Telemedicine",
    description: "Offering digital solutions for patient care, medical records, and virtual consultations to improve healthcare efficiency and accessibility."
  },
  {
    icon: Pill,
    title: "Pharmaceutical Innovations",
    description: "Developing new drug therapies and delivery systems, enhancing treatment options for various diseases, and advancing medical science."
  },
  {
    icon: Wallet,
    title: "Digital Payments",
    description: "Streamlining financial transactions through mobile apps, e-wallets, and secure digital platforms for a cashless society."
  },
  {
    icon: BarChart3,
    title: "InsurTech",
    description: "Innovating the insurance industry with technology-driven solutions to enhance risk assessment, claims management, and customer experience."
  },
  {
    icon: CreditCard,
    title: "Blockchain & Cryptocurrency",
    description: "Revolutionizing finance with decentralized digital currencies and secure blockchain systems for transparent, efficient transactions."
  },
  {
    icon: FileText,
    title: "RegTech (Regulatory Technology)",
    description: "Automating compliance processes, risk management, and financial regulations to ensure businesses stay compliant with legal standards."
  },
  {
    icon: PiggyBank,
    title: "WealthTech & Investment Solutions",
    description: "Providing tech-driven investment platforms and tools to enhance wealth management and maximize returns for individuals and businesses."
  },
  {
    icon: GraduationCap,
    title: "Online Learning Platforms",
    description: "Offering flexible, accessible education through virtual classrooms, courses, and training programs for students worldwide."
  },
  {
    icon: Smartphone,
    title: "Educational Apps",
    description: "Designing apps for personalized learning, offering interactive experiences, and helping students learn at their own pace."
  },
  {
    icon: Building2,
    title: "Corporate Training Solutions",
    description: "Developing customized training programs to upskill employees, enhance productivity, and foster professional development in organizations."
  },
  {
    icon: FileCode2,
    title: "eLearning Tools & Content Creation",
    description: "Building digital tools and resources for content creation, helping educators design immersive learning experiences."
  },
  {
    icon: Vr,
    title: "Virtual & Augmented Reality in Education",
    description: "Using VR/AR technology to provide immersive learning experiences, enhancing student engagement and understanding in various subjects."
  },
  {
    icon: Leaf,
    title: "Renewable Energy",
    description: "Innovating green energy solutions like solar, wind, and hydropower to reduce carbon footprints and combat climate change."
  },
  {
    icon: Recycle,
    title: "Waste Management & Recycling",
    description: "Creating sustainable systems for waste disposal, recycling, and reducing environmental pollution through innovative technologies."
  },
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    description: "Developing farming practices that conserve resources, improve crop yield, and reduce environmental impact through technology-driven solutions."
  },
  {
    icon: Droplet,
    title: "Water & Air Purification",
    description: "Advancing technology to purify air and water, ensuring access to clean resources and improving global health standards."
  },
  {
    icon: Home,
    title: "Green Building & Smart Cities",
    description: "Designing energy-efficient buildings and smart infrastructure solutions to create sustainable urban environments for the future."
  },
  {
    icon: Tractor,
    title: "Precision Agriculture",
    description: "Implementing advanced technology like drones and sensors to optimize crop management, reduce waste, and increase efficiency."
  },
  {
    icon: Binary,
    title: "Farm Management Software",
    description: "Providing digital tools to help farmers track, manage, and improve their operations for better productivity and profitability."
  },
  {
    icon: Plane,
    title: "Agricultural Drones & Sensors",
    description: "Using drones and sensors to monitor crops, assess conditions, and provide real-time data to optimize farming operations."
  },
  {
    icon: Sprout,
    title: "Sustainable Farming Solutions",
    description: "Offering innovative methods and tools for eco-friendly farming, improving yields, and reducing environmental impact."
  },
  {
    icon: FileSearch,
    title: "Supply Chain & Food Safety",
    description: "Enhancing traceability and transparency in food production and supply chains, ensuring food safety and reducing waste."
  },
  {
    icon: Lightbulb,
    title: "Impact-Driven Startups",
    description: "Creating businesses with social impact at their core, addressing community issues like poverty, education, and healthcare."
  },
  {
    icon: Building2,
    title: "Community Development Projects",
    description: "Empowering local communities by implementing projects that improve infrastructure, access to resources, and overall living standards."
  },
  {
    icon: Activity,
    title: "Affordable Healthcare Solutions",
    description: "Developing cost-effective healthcare services and products to make health solutions accessible to underserved populations."
  },
  {
    icon: GraduationCap,
    title: "Education for Underprivileged",
    description: "Providing quality education to marginalized communities, helping bridge the education gap and create equal opportunities."
  },
  {
    icon: PiggyBank,
    title: "Poverty Alleviation Initiatives",
    description: "Launching projects that tackle the root causes of poverty, providing sustainable solutions to improve lives."
  },
  {
    icon: Wallet,
    title: "Women-Focused Business Solutions",
    description: "Providing entrepreneurship resources and support specifically for women to create and grow businesses."
  },
  {
    icon: Scale,
    title: "Gender Equality Initiatives",
    description: "Promoting workplace diversity, equal pay, and opportunities for women in leadership positions across various industries."
  },
  {
    icon: GraduationCap,
    title: "Female Leadership Development",
    description: "Offering training and mentorship programs aimed at empowering women to take on leadership roles in business and society."
  },
  {
    icon: GraduationCap,
    title: "Empowerment through Education & Training",
    description: "Educating and equipping women with the skills, knowledge, and confidence to succeed in personal and professional lives."
  },
  {
    icon: FileCode2,
    title: "Digital Content Creation",
    description: "Developing engaging multimedia content for online platforms, transforming the entertainment industry with innovative storytelling."
  },
  {
    icon: Tablet,
    title: "Streaming Platforms",
    description: "Offering seamless access to digital media such as movies, music, and live events through subscription-based or free streaming services."
  },
  {
    icon: Vr,
    title: "VR/AR Entertainment",
    description: "Bringing virtual and augmented reality experiences to entertainment, creating immersive environments for gaming and media consumption."
  },
  {
    icon: Smartphone,
    title: "Gaming & Esports",
    description: "Innovating in the gaming industry with new platforms, competitive gaming, and interactive esports events."
  },
  {
    icon: FileCode2,
    title: "Film & Music Tech Innovations",
    description: "Advancing technology in filmmaking and music production, enhancing creativity, quality, and distribution for artists and creators."
  },
  {
    icon: Car,
    title: "Electric Vehicles (EV)",
    description: "Revolutionizing the automotive industry with eco-friendly, energy-efficient electric vehicles and charging infrastructure."
  },
  {
    icon: Car,
    title: "Autonomous Vehicles",
    description: "Innovating self-driving technology to improve transportation efficiency, reduce accidents, and provide accessible mobility."
  },
  {
    icon: TrafficLights,
    title: "Urban Mobility Solutions",
    description: "Developing smart transportation systems, including shared mobility, ride-hailing, and micro-mobility for efficient city commuting."
  },
  {
    icon: Map,
    title: "Smart Infrastructure",
    description: "Designing intelligent city infrastructure solutions to improve traffic management, energy use, and overall urban sustainability."
  },
  {
    icon: Car,
    title: "Ride-sharing & Fleet Management",
    description: "Offering technology solutions for managing and optimizing fleets, providing efficient transportation and reducing vehicle emissions."
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Platforms",
    description: "Developing digital platforms for buying and selling goods, providing a seamless shopping experience for consumers worldwide."
  },
  {
    icon: Store,
    title: "Omnichannel Solutions",
    description: "Creating integrated solutions that combine physical and digital retail experiences, improving customer engagement and satisfaction."
  },
  {
    icon: Box,
    title: "Supply Chain & Logistics Innovation",
    description: "Innovating in supply chain management with technology solutions for faster, more efficient product distribution and tracking."
  },
  {
    icon: PieChart,
    title: "Consumer Behavior Analytics",
    description: "Using data analytics to understand consumer behavior, personalize offerings, and improve business strategies."
  },
  {
    icon: Glasses,
    title: "Augmented Reality Shopping",
    description: "Implementing AR technology in retail to enhance the shopping experience with virtual try-ons and interactive displays."
  },
  {
    icon: UtensilsCrossed,
    title: "Food Delivery Platforms",
    description: "Building online platforms for efficient food ordering, delivery, and takeaway services, making dining convenient and accessible."
  },
  {
    icon: Carrot,
    title: "Alternative Proteins (Plant-based, Lab-grown)",
    description: "Developing sustainable protein alternatives like plant-based and lab-grown meats to address global food security challenges."
  },
  {
    icon: ChefHat,
    title: "Smart Kitchens & Appliances",
    description: "Innovating kitchen technology with smart appliances that enhance cooking efficiency, safety, and sustainability."
  },
  {
    icon: Box,
    title: "Agri-Food Supply Chain Solutions",
    description: "Optimizing the food supply chain with technology for better tracking, freshness, and reduced food waste."
  },
  {
    icon: Plane,
    title: "Booking & Travel Management Platforms",
    description: "Offering online tools for planning, booking, and managing travel arrangements, enhancing convenience for travelers."
  },
  {
    icon: Map,
    title: "Smart Tourism Solutions",
    description: "Creating technology solutions that provide personalized travel experiences and improve the management of tourist destinations."
  },
  {
    icon: Smartphone,
    title: "Personalized Travel Apps",
    description: "Developing apps that cater to individual travel preferences, offering tailored recommendations for accommodations, activities, and destinations."
  },
  {
    icon: Vr,
    title: "Virtual Travel Experiences",
    description: "Offering immersive VR/AR experiences that allow people to explore destinations remotely before making travel decisions."
  },
  {
    icon: FileText,
    title: "Contract Management Software",
    description: "Simplifying the creation, negotiation, and management of legal contracts, reducing errors and improving efficiency."
  },
  {
    icon: FileSearch,
    title: "Intellectual Property Solutions",
    description: "Offering tools for securing and managing intellectual property rights, ensuring protection for innovations and creations."
  },
  {
    icon: Scale,
    title: "Online Legal Services",
    description: "Providing accessible legal advice and services through digital platforms, making legal assistance more affordable and efficient."
  },
  {
    icon: Network,
    title: "Blockchain in Legal Transactions",
    description: "Using blockchain technology for secure, transparent legal transactions and smart contracts in various industries."
  },
  {
    icon: Brain,
    title: "Legal Analytics & AI",
    description: "Leveraging artificial intelligence to analyze legal data and predict outcomes, improving decision-making and case strategies."
  },
  {
    icon: FileSearch,
    title: "E-Discovery Solutions",
    description: "Innovating legal processes with electronic discovery tools for efficient data retrieval, analysis, and management in legal cases."
  },
  {
    icon: Shield,
    title: "Data Protection & Encryption",
    description: "Safeguarding sensitive information with encryption and advanced security protocols to prevent data breaches and cyberattacks."
  },
  {
    icon: Activity,
    title: "Threat Detection & Response Solutions",
    description: "Implementing proactive systems to detect, analyze, and respond to cybersecurity threats in real time."
  },
  {
    icon: FileText,
    title: "Privacy & Compliance Tools",
    description: "Offering tools that help businesses maintain privacy, secure personal data, and comply with data protection regulations."
  },
  {
    icon: Brain,
    title: "AI in Automation",
    description: "Leveraging AI and machine learning to automate repetitive tasks, improve accuracy, and optimize processes across industries."
  },
  {
    icon: PieChart,
    title: "Predictive Analytics",
    description: "Using machine learning models to analyze data and predict future trends, enhancing decision-making in business and healthcare."
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Developing AI systems to understand and generate human language, improving communication and customer service in various sectors."
  },
  {
    icon: Camera,
    title: "Computer Vision",
    description: "Enabling machines to interpret and understand visual data, advancing applications in healthcare, retail, and autonomous vehicles."
  },
  {
    icon: Users,
    title: "AI for Personalization",
    description: "Using AI to customize user experiences in e-commerce, media, and marketing, delivering tailored recommendations and solutions."
  },
  {
    icon: Robot,
    title: "Robotic Process Automation (RPA)",
    description: "Automating repetitive tasks in business processes to improve efficiency, reduce errors, and lower operational costs."
  },
  {
    icon: Factory,
    title: "Smart Manufacturing",
    description: "Implementing IoT and AI technologies in manufacturing to optimize production processes, improve quality control, and increase efficiency."
  },
  {
    icon: Box,
    title: "Supply Chain Automation",
    description: "Streamlining supply chain processes through automation, improving inventory management, and accelerating product delivery for businesses."
  },
  {
    icon: PenTool,
    title: "Predictive Maintenance",
    description: "Using sensors and AI to monitor equipment health, predict failures, and optimize maintenance schedules, reducing downtime and costs."
  },
  {
    icon: Package,
    title: "Automated Warehousing",
    description: "Using robotics and automation technologies to manage inventory and distribution, improving operational speed and accuracy."
  },
  {
    icon: Home,
    title: "Smart Homes",
    description: "Integrating IoT technology into home devices to automate daily tasks, improve energy efficiency, and enhance security."
  },
  {
    icon: Cpu,
    title: "Industrial IoT (IIoT)",
    description: "Implementing IoT solutions in industries for real-time monitoring, predictive maintenance, and process optimization to boost productivity."
  },
  {
    icon: Watch,
    title: "Wearable IoT Devices",
    description: "Designing health-tracking wearables that monitor vitals, activity levels, and sleep, providing real-time health insights for users."
  },
  {
    icon: Sprout,
    title: "IoT in Agriculture",
    description: "Deploying IoT sensors to monitor soil conditions, water usage, and crop health, optimizing farming practices and reducing waste."
  },
  {
    icon: Building2,
    title: "Smart Cities",
    description: "Using IoT devices to manage urban infrastructure such as traffic, energy, and waste, improving city efficiency and sustainability."
  },
  {
    icon: Package,
    title: "Delivery Drones",
    description: "Using drones for quick and efficient delivery of goods, reducing logistics costs, and improving delivery times."
  },
  {
    icon: Plane,
    title: "Agricultural Drones",
    description: "Deploying drones equipped with sensors to monitor crop health, optimize irrigation, and increase farming efficiency."
  },
  {
    icon: Map,
    title: "Surveying & Mapping Drones",
    description: "Utilizing drones for land surveying and mapping, providing accurate data for construction, mining, and environmental monitoring."
  },
  {
    icon: Search,
    title: "Drone-based Inspections",
    description: "Implementing drones to inspect infrastructure such as bridges, towers, and pipelines, reducing risks and improving efficiency."
  },
  {
    icon: Plane,
    title: "Emergency Response Drones",
    description: "Employing drones for search-and-rescue missions, disaster relief, and delivering supplies to hard-to-reach areas."
  },
  {
    icon: Users,
    title: "Collaborative Robots (Cobots)",
    description: "Designing robots that work alongside humans to enhance productivity and safety in manufacturing and other industries."
  },
  {
    icon: Robot,
    title: "Autonomous Robots",
    description: "Creating robots capable of performing tasks independently, ranging from delivery to complex operations in industrial environments."
  },
  {
    icon: Stethoscope,
    title: "Medical Robotics",
    description: "Developing robotic systems for minimally invasive surgeries, improving precision, reducing recovery times, and enhancing patient outcomes."
  },
  {
    icon: Robot,
    title: "Service Robots",
    description: "Building robots for service industries, including hospitality and healthcare, providing assistance, cleaning, and personal support to customers."
  },
  {
    icon: Factory,
    title: "Industrial Robotics",
    description: "Implementing robots in manufacturing to automate tasks like assembly, welding, painting, and packaging, increasing efficiency and reducing labor costs."
  },
  {
    icon: Sun,
    title: "Solar Power",
    description: "Harnessing solar energy through panels and photovoltaic systems to provide renewable, eco-friendly power for homes and businesses."
  },
  {
    icon: Wind,
    title: "Wind Energy",
    description: "Utilizing wind turbines to generate electricity from wind, providing sustainable energy for industrial and residential applications."
  },
  {
    icon: Waves,
    title: "Hydropower",
    description: "Capturing energy from flowing water to generate electricity, offering a renewable energy source that can power entire communities."
  },
  {
    icon: Flame,
    title: "Geothermal Energy",
    description: "Leveraging heat from beneath the Earth's surface to produce sustainable energy, especially in areas with volcanic or geothermal activity."
  },
  {
    icon: Leaf,
    title: "Bioenergy",
    description: "Converting organic materials like plant waste and algae into biofuels for cleaner energy alternatives to fossil fuels."
  },
  {
    icon: Zap,
    title: "Smart Grids",
    description: "Implementing smart grid technology to monitor energy use, optimize energy distribution, and improve the efficiency of electrical systems."
  },
  {
    icon: Building2,
    title: "Energy-Efficient Buildings",
    description: "Designing buildings that minimize energy consumption with better insulation, smart appliances, and renewable energy sources."
  },
  {
    icon: Lightbulb,
    title: "LED Lighting",
    description: "Adopting energy-efficient LED lighting solutions to reduce electricity consumption and extend the lifespan of lighting systems."
  },
  {
    icon: Activity,
    title: "Demand Response Systems",
    description: "Using technology to shift energy usage during peak times, helping reduce the load on the power grid and conserve energy."
  },
  {
    icon: Battery,
    title: "Energy Storage Solutions",
    description: "Developing advanced battery systems that store energy from renewable sources, ensuring availability during times of high demand."
  }
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
