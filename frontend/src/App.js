import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import  HomePage  from './pages/HomePage';
import { bgTexture } from './Assets/images';
<<<<<<< HEAD
import InnovationHub from './pages/InnovationHub';
import CareerSection from './pages/Career';
=======
import WhyChooseUs from './pages/WhyChooseUs';
import ContactPage from './pages/Contact';
>>>>>>> a06bbfaed8e3f9ec61b4ad34d1e04c5a4d9f91b6


function App() {
  return (
    <Router>
      <Navbar />
      <div
<<<<<<< HEAD
        className="bg-center inset-3 bg-repeat"
        style={{ backgroundImage: `url(${bgTexture})` }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/innovation-hub" element={<InnovationHub />} />
            <Route path="/career" element={<CareerSection />} />
          </Routes>
        </div>
=======
    className="bg-center inset-3 bg-repeat"
    style={{ backgroundImage: `url(${bgTexture})` }}
  >
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why-us" element={<WhyChooseUs />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
>>>>>>> a06bbfaed8e3f9ec61b4ad34d1e04c5a4d9f91b6
      </div>
      <Footer />
    </Router>
  );
}

export default App;
