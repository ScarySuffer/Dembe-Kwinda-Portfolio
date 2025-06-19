import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    document.body.classList.toggle("light-mode", savedTheme !== "dark");
  }, []);

  const projects = [
    {
      title: "DynamicGen Holdings E-commerce",
      description:
        "Full-featured React e-commerce site for auto spare parts with filters, product pages, and Firebase integration.",
      url: "https://dynamicgenholdings-16794.web.app/",
      image: "/images/projects/dynamicgen.png",
      tech: ["React", "Firebase", "Bootstrap"],
      github: null,
    },
    {
      title: "Budgetly – Personal Finance Tracker",
      description:
        "A modern budgeting app to manage income, expenses, and savings with intuitive charts. Frontend hosted on Netlify; backend API deployed on Heroku.",
      url: "https://kasi-budgetly.netlify.app/",
      image: "/images/projects/budgetly.png",
      tech: ["React", "Node.js", "Express", "Chart.js", "Netlify", "Heroku"],
      github: "https://github.com/Kasi-Digital-Budgetly/budgetly-finance-tracker",
    },
    {
      title: "Weather Forecast App",
      description: "Real-time weather forecast app using OpenWeatherMap API and React.",
      route: "/weather",
      image: "/images/projects/weather.png",
      tech: ["React", "OpenWeatherMap API"],
    },
    {
      title: "Arduino Robotics & Automation",
      description:
        "Embedded systems using sensors, actuators, and Arduino to automate mechanical processes.",
      url: "https://github.com/dembekwinda/arduino-robotics",
      image: "/images/projects/arduino.png",
      tech: ["Arduino", "C++", "Sensors"],
    },
    {
      title: "Flutter Mobile Apps",
      description:
        "Cross-platform mobile apps built with Flutter and Firebase for authentication and real-time databases.",
      url: "https://github.com/dembekwinda/flutter-mobile-apps",
      image: "/images/projects/My APP.png",
      tech: ["Flutter", "Dart", "Firebase"],
    },
    {
      title: "Full-Stack Web Development",
      description:
        "Responsive websites and REST APIs using React, Node.js, Express, and MongoDB.",
      url: "https://github.com/dembekwinda/fullstack-web-development",
      image: "/images/projects/fullstack.png",
      tech: ["MERN", "REST API"],
    },
    {
      title: "Embedded Systems Programming",
      description:
        "Microcontroller programming for sensor acquisition and logic control in IoT and mechatronics.",
      url: "https://github.com/dembekwinda/embedded-systems",
      image: "/images/projects/embedded.png",
      tech: ["C", "IoT", "Microcontrollers"],
    },
    {
      title: "OpenStreetMap Integration",
      description:
        "Location-aware mobile apps with OpenStreetMap and Flutter Map for real-time tracking and mapping.",
      url: "https://github.com/dembekwinda/openstreetmap-integration",
      image: "/images/projects/openstreetmap.png",
      tech: ["Flutter", "OpenStreetMap", "Geolocation"],
    },
    {
      title: "Bookverse",
      description:
        "A book discovery and review platform that connects readers through community-driven experiences.",
      url: "https://github.com/dembekwinda/bookverse",
      image: "/images/projects/open-book.png",
      tech: ["React", "MongoDB", "Node.js"],
    },
  ];

  return (
    <div className="project-container">
      <header
        className="project-header"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <img
          src="/dembe.jpg"
          alt="Dembe Kwinda"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 0 8px rgba(0,0,0,0.15)",
          }}
          loading="lazy"
        />
        <div>
          <h1>Dembe Kwinda</h1>
          <p>Software Developer</p>
        </div>
      </header>

      <section className="section about">
        <h2>About Me</h2>
        <p>
          I'm a passionate full-stack developer building modern web and mobile
          applications. I specialize in intuitive UIs and scalable systems.
          Currently exploring data science and cloud computing.
        </p>
      </section>

      <section className="section projects">
        <h2>Highlighted Projects</h2>
        <div className="project-grid">
          {projects.map(({ title, description, url, route, image, tech, github }, index) => (
            <div
              className="project-card"
              key={title}
              title={title}
              style={{
                animation: "fadeSlideUpCard 0.5s ease forwards",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <img
                src={image}
                alt={`Screenshot of ${title}`}
                className="project-image"
                loading="lazy"
                style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
              />
              <h3>{title}</h3>
              <p>{description}</p>

              {tech && (
                <div className="tech-tags">
                  {tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div
                className="project-links"
                style={{ marginTop: "10px", display: "flex", gap: "10px" }}
              >
                {route ? (
                  <button className="view-button" onClick={() => navigate(route)}>
                    Open
                  </button>
                ) : (
                  <a
                    href={url}
                    className="view-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}

                {github && (
                  <a
                    href={github}
                    className="view-button github"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View source code on GitHub"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="section connect"
        style={{ textAlign: "center", marginTop: "40px" }}
      >
        <h2>Connect</h2>
        <p>
          <a
            href="https://www.linkedin.com/in/dembe-kwinda-4461b4237"
            target="_blank"
            rel="noopener noreferrer"
            className="view-button"
          >
            Visit my LinkedIn Profile
          </a>
        </p>
      </section>
    </div>
  );
}
