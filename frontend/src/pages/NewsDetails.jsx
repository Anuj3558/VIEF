import React from "react";
import { ArrowLeft } from "lucide-react";

// This is a mock function to fetch news data. In a real application, you would fetch this data from an API or database.
function getNewsData(slug) {
  // Mock data
  return {
    title: "6-Year-Old Horse Dies at Belmont Park After Race Injury",
    date: "June 04, 2023",
    category: "Horse Racing",
    author: {
      name: "John Doe",
      avatar: "/images/profile-pic-1.jpg",
    },
    image: "/images/race-horse.jpg",
    content: `
      <p>NEW YORK (6 June) - A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's Triple Crown finale in New York.</p>
      <p>Mashnee Girl suffered an injury to her left front leg in the seventh race on grass Friday at the track, where the Belmont Stakes will be run June 10. She was euthanized, according to the New York Racing Association.</p>
      <p>The mare's jockey, Dylan Davis, was unseated and taken to a hospital for evaluation. He was later released.</p>
      <p>Mashnee Girl was trained by Mark Hennig and owned by Team Penney Racing.</p>
      <p>The Belmont Stakes is the final leg of the Triple Crown series. The Kentucky Derby was run May 6 and the Preakness on May 20 in Baltimore.</p>
      <p>The death was the second in three days at Belmont Park. Gallo Mio, a 3-year-old gelding, died after suffering an injury to his left front leg while training on the main track Wednesday, the NYRA said.</p>
    `,
    relatedArticles: [
      {
        title: "Sevilla Blunk Embraces Longer Season With World Cup",
        image: "/images/cyclist.jpg",
        category: "Cycling",
      },
      {
        title: "Ryan Garcia is fighting again, this time on social media",
        image: "/images/boxing-arena.jpg",
        category: "Boxing",
      },
    ],
  };
}

const NewsDetail = ({ slug }) => {
  const newsData = getNewsData(slug);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <a href="/newsletter" className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Newsletter
        </a>

        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {newsData.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{newsData.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={newsData.author.avatar}
                alt={newsData.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{newsData.author.name}</p>
                <p className="text-sm text-gray-500">{newsData.date}</p>
              </div>
            </div>

            <img
              src={newsData.image}
              alt={newsData.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: newsData.content }} />
          </div>
        </article>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsData.relatedArticles.map((article, index) => (
              <a href={`/news/${encodeURIComponent(article.title)}`} key={index} className="block group">
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {article.category}
                </span>
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;

