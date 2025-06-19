import React, { useEffect } from "react";
import "./Certificates.css";

const certificates = {
  Backend: [
    {
      name: "Understanding Cloud Computing",
      image: "/Course Certificates/cloud-computing.jpg",
      file: "/Course Certificates/Understanding Cloud Computing Certification - Dembe Kwinda.pdf",
    },
  ],
  "Data Science": [
    {
      name: "Introduction to Numpy",
      image: "/Course Certificates/numpy.jpg",
      file: "/Course Certificates/Course_Certificate_Dembe_Kwinda.pdf",
    },
    {
      name: "Introduction to Python for Developers",
      image: "/Course Certificates/python.jpg",
      file: "/Course Certificates/Introduction to Python for Developers.pdf",
    },
  ],
  Frontend: [
    {
      name: "REACT JS",
      image: "/Course Certificates/Coming Soon.gif",
    },
  ],
};

export default function Certificates() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    document.body.classList.toggle("light-mode", savedTheme !== "dark");
  }, []);

  return (
    <div className="certificates-fullscreen">
      <div className="certificates-container">
        <h1 className="cert-title">My Certificates</h1>

        <div className="extra-section">
          <h2>Take a look at all the courses I’ve completed on DataCamp and AI Planet</h2>
          <h3 className="section-subtitle">My Courses</h3>
          <ul className="custom-list">
            <li>Introduction to Numpy</li>
            <li>Introduction to Python for Developers</li>
            <li>Understanding Cloud Computing</li>
          </ul>

          <h3 className="section-subtitle">My Tracks</h3>
          <div className="coming-soon-block">
            <button className="visit-link" disabled>Visit Tracks</button>
            <img src="/Course Certificates/Coming Soon.gif" alt="Coming Soon" className="coming-soon-img" />
          </div>

          <h3 className="section-subtitle">My Projects</h3>
          <div className="coming-soon-block">
            <button className="visit-link" disabled>Visit Projects</button>
            <img src="/Course Certificates/Coming Soon.gif" alt="Coming Soon" className="coming-soon-img" />
          </div>
        </div>

        {Object.entries(certificates).map(([category, certList]) => (
          <div key={category} className="cert-section">
            <h2 className="cert-category">{category}</h2>
            <div className="cert-grid">
              {certList.map((cert, i) => (
                <div
                  key={i}
                  className="cert-card"
                  style={{
                    animation: "fadeSlideUpCard 0.5s ease forwards",
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <a
                    href={cert.file || "#"}
                    target={cert.file ? "_blank" : undefined}
                    rel={cert.file ? "noopener noreferrer" : undefined}
                    className="cert-link"
                  >
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="cert-image"
                    />
                    <p className="cert-name">{cert.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
