import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { bgTexture } from "./Assets/images";
import InnovationHub from "./pages/InnovationHub";
import CareerSection from "./pages/Career";
import WhyChooseUs from "./pages/WhyChooseUs";
import ContactPage from "./pages/Contact";
import NewsletterPage from "./pages/NewsLetter";
import PastEventDetailsPage from "./pages/PastEventDeatils";
import EventDetailsPage from "./pages/UpcomingEventDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <div
        className="bg-center inset-3 bg-repeat"
        style={{ backgroundImage: `url(${bgTexture})` }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/innovation-hub" element={<InnovationHub />} />
            <Route path="/career" element={<CareerSection />} />
            <Route path="/why-us" element={<WhyChooseUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news-letter" element={<NewsletterPage />} />
            <Route path="/event/past" element={<PastEventDetailsPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
