import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsletterContext } from "../../contexts/NewsletterContext";
import { ArrowLeft } from 'lucide-react';

const DetailPage = () => {
  const { id } = useParams();
  const { newsletters } = useContext(NewsletterContext);
  const navigate = useNavigate();

  const selectedItem = newsletters.find((item) => item._id === id);

  if (!selectedItem) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-700">Item not found!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
      <button
        onClick={() => navigate("/news-letter")}
        className="mb-6 flex items-center text-[#FF4D00] hover:text-[#FF3D00] transition-colors duration-300"
      >
        <ArrowLeft className="mr-2" size={20} />
        <span className="text-sm sm:text-base">Back to Newsletter</span>
      </button>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{selectedItem.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(selectedItem.publishDate).toLocaleDateString()}
      </p>
      <img
        src={selectedItem.image}
        alt={selectedItem.title}
        className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
      />
      <div
        className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: selectedItem.description }}
      />
    </div>
  );
};

export default DetailPage;

