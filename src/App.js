import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";  // <-- import your Navbar component here
import ComingSoon from './ComingSoon';

import Home from "./Home";
import Resume from "./resume";
import Projects from "./Projects";
import Contact from "./Contact";
import WeatherForecast from "./WeatherForecast";
import Certificates from "./Certificates";

import "./App.css";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const updateDarkMode = () => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    };

    updateDarkMode();

    function onStorageChange(e) {
      if (e.key === "theme") {
        updateDarkMode();
      }
    }
    window.addEventListener("storage", onStorageChange);

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener("storage", onStorageChange);
      observer.disconnect();
    };
  }, []);

  return (
    <Router>
      {/* Render Navbar component here */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/resume" element={<Resume darkMode={darkMode} />} />
          <Route path="/projects" element={<Projects darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          <Route path="/weather" element={<WeatherForecast darkMode={darkMode} />} />
          <Route path="/certificates" element={<Certificates darkMode={darkMode} />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </main>
    </Router>
  );
}
