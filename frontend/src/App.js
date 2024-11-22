import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import  HomePage  from './pages/HomePage';
import { bgTexture } from './Assets/images';
import InnovationHub from './pages/InnovationHub';
import CareerSection from './pages/Career';


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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
