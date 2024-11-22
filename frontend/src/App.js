import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import  HomePage  from './pages/HomePage';
import { bgTexture } from './Assets/images';
import WhyChooseUs from './pages/WhyChooseUs';
import ContactPage from './pages/Contact';


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
          <Route path="/why-us" element={<WhyChooseUs />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
