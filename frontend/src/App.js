import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import EventsPage from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import ApplyNowPage from "./pages/ApplyNow";
import StartupsPage from "./pages/StartUps";
import Awards from "./pages/Awards";
import Dashboard from "./components/Dashboard/components/Dashboard";
import SchemeDetailPage from "./pages/SchemeDetails";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./pages/Protected";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Coworking from "./pages/Coworking";
import BlogContentPage from "./pages/BlogContentPage";
import Investers from "./pages/InvestersPage";
import Newsletter from "./pages/NewsLetter";
import ArticleDetail from "./pages/ArticleDetail";
import NewsDetail from "./pages/NewsDetails";
import DetailPage from "./components/Newsletter/DetailPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
            <Route path="/facilities" element={<WhyChooseUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="news-letter" element={<Newsletter />} />
            <Route path="/news-letter/:id" element={<DetailPage />} />
            <Route path="/event/past" element={<PastEventDetailsPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/apply-now" element={<ApplyNowPage />} />
            <Route path="/startup" element={<StartupsPage />} />
            <Route path="/achievements" element={<Awards />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/post/:id" element={<BlogContentPage />} />
            <Route path="/Coworking" element={<Coworking />} />
            <Route path="/investors" element={<Investers />} />
            <Route
              path="/admin"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/scheme-details/:id" element={<SchemeDetailPage />} />
            <Route path="/scheme-details" element={<SchemeDetailPage />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

