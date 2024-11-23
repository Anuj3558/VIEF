import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { badminton, basketball, boxingArena, cyclist, hockey, profilePic1, profilePic2, profilePic3, raceHose1, RectangleNews, Sportsman } from "../Assets/images";

const TrendingNewsItem = ({ image, date, title, description }) => (
  <div className="flex gap-4 mb-6">
    <img
      src={image}
      alt={title}
      className="w-32 h-24 md:w-48 md:h-36 object-cover rounded-lg"
    />
    <div>
      <p className="text-sm text-left text-gray-500 mb-1">{date}</p>
      <h3 className="font-semibold text-left mb-1">{title}</h3>
      <p className="text-sm text-left text-gray-600">{description}</p>
    </div>
  </div>
);

const StartupArticle = ({
  image,
  category,
  title,
  description,
  author,
  date,
}) => (
  <div className="bg-white rounded-lg text-left overflow-hidden">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded">
        {category}
      </span>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{author.name}</span>
      </div>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const Newsletter = () => {
  const trendingNews = [
    {
      image: raceHose1,
      date: "June 04, 2023",
      title: "6-Year-Old Horse Dies at Belmont Park After Race Injury",
      description:
        "NEW YORK (6 June) - A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's...",
    },
    {
      image: cyclist,

      date: "June 03, 2023",
      title: "Sevilla Blunk Embraces Longer Season With World Cup",
      description:
        "Last year, Sevilla Blunk took a more conservative approach to her first season as an Elite Cross Country racer...",
    },
    {
      image: boxingArena,
      date: "June 03, 2023",
      title: "Ryan Garcia is fighting again, this time on social media",
      description:
        "Boxing star Ryan Garcia and his promoter head of home fighter Oscar De La Hoya...",
    },
  ];

  const startupArticles = [
    {
      image: basketball,
      category: "Basketball",
      title:
        "5 Exercises Basketball Players Should Be Using To Develop Strength",
      description:
        "This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or appeal muscles...",
      author: {
        name: "Jake Will",
        avatar: profilePic1,
      },
      date: "04 June 2023",
    },
    {
      image: hockey,
      category: "Ice Hockey",
      title:
        "Golden Knights out to fulfill owner's quest to win Stanley Cup in 6th year",
      description:
        "The Vegas Golden Knights will play the Florida Panthers in the Stanley Cup Final beginning Saturday.",
      author: {
        name: "Fred Jason",
        avatar: profilePic2,
      },
      date: "03 June 2023",
    },
    {
      image: badminton,
      category: "Badminton",
      title: "'Outdoor' Badminton Gets Support From Local Federation",
      description:
        "The Badminton World Federation is developing Air Badminton and the country's governing body, Philippine Badminton Association...",
      author: {
        name: "Song Lazada",
        avatar: profilePic3,
      },
      date: "01 June 2023",
    },
  ];

  return (
    <div className="  ">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-16 md:pt-[4%]">
        <img
          src={RectangleNews}
          alt="Career opportunities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl text-left font-bold ">Newsletter</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending News Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Trending News</h2>
          {trendingNews.map((news, index) => (
            <TrendingNewsItem key={index} {...news} />
          ))}
        </div>

        {/* Featured Article */}
        <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[500px]">
          <img
            src={Sportsman}
            alt="Cycling"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <span className="inline-block bg-white/20 px-3 py-1 rounded text-sm mb-3">
              Cycling
            </span>
            <h3 className="text-2xl font-bold mb-2">
              DISCOVER THE MEMBER BENEFITS OF USA CYCLING!
            </h3>
            <p className="text-sm text-white/80">01 June 2023</p>
          </div>
        </div>
      </div>

      {/* Startup Articles Section */}
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Startup Article</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {startupArticles.map((article, index) => (
            <StartupArticle key={index} {...article} />
          ))}
        </div>
        <div className="flex gap-4">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
