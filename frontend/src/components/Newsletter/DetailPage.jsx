import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NewsletterContext } from "../../contexts/NewsletterContext";

const DetailPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const { newsletters } = useContext(NewsletterContext);

  // Find the selected article by its id
  const selectedItem = newsletters.find((item) => item._id === id);

  const navigate = useNavigate(); // Navigate back to the newsletter list

  if (!selectedItem) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/news-letter")}
        className="mb-6 flex items-center text-[#FF4D00] hover:text-[#FF3D00] transition-colors duration-300"
      >
        Back to Newsletter
      </button>
      <h1 className="text-4xl font-bold mb-4">{selectedItem.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {selectedItem.publishDate} | {selectedItem.author?.name}
      </p>
      <img
        src={selectedItem.image}
        alt={selectedItem.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: selectedItem.description }}
      />
    </div>
  );
};

export default DetailPage;
