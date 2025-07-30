import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    document.body.classList.toggle("light-mode", savedTheme !== "dark");

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      title: "Crypto Price Tracker with ETL + Dashboard",
      description:
        "A full-stack dashboard tracking real-time crypto prices and historical trends with ETL pipeline and chart visualizations.",
      url: "http://13.48.59.188",
      image: "/images/projects/crypto.png",
      tech: ["React", "Node.js", "SQLite", "Express", "Recharts", "ETL"],
      github: "https://github.com/yourusername/crypto-price-tracker-etl",
    },
    {
      title: "Weather Forecast App",
      description:
        "Real-time weather forecast app using OpenWeatherMap API and React.",
      route: "/weather",
      image: "/images/projects/weather.png",
      tech: ["React", "OpenWeatherMap API"],
    },
    {
      title: "Arduino Robotics & Automation",
      description:
        "Embedded systems using sensors, actuators, and Arduino to automate mechanical processes.",
      route: "/coming-soon",
      image: "/images/projects/arduino.png",
      tech: ["Arduino", "C++", "Sensors"],
    },
    {
      title: "Flutter Mobile Apps",
      description:
        "Cross-platform mobile apps built with Flutter and Firebase for authentication and real-time databases.",
      route: "/coming-soon",
      image: "/images/projects/My APP.png",
      tech: ["Flutter", "Dart", "Firebase"],
    },
    {
      title: "Full-Stack Web Development",
      description:
        "Responsive websites and REST APIs using React, Node.js, Express, and MongoDB.",
      route: "/coming-soon",
      image: "/images/projects/fullstack.png",
      tech: ["MERN", "REST API"],
    },
    {
      title: "Embedded Systems Programming",
      description:
        "Microcontroller programming for sensor acquisition and logic control in IoT and mechatronics.",
      route: "/coming-soon",
      image: "/images/projects/embedded.png",
      tech: ["C", "IoT", "Microcontrollers"],
    },
    {
      title: "OpenStreetMap Integration",
      description:
        "Location-aware mobile apps with OpenStreetMap and Flutter Map for real-time tracking and mapping.",
      route: "/coming-soon",
      image: "/images/projects/openstreetmap.png",
      tech: ["Flutter", "OpenStreetMap", "Geolocation"],
    },
    {
      title: "Bookverse",
      description:
        "A book discovery and review platform that connects readers through community-driven experiences.",
      route: "/coming-soon",
      image: "/images/projects/open-book.png",
      tech: ["React", "MongoDB", "Node.js"],
    },
  ];

  return (
    <main className="project-container">
      <header className="project-header" role="banner">
        <img
          src="/dembe.jpg"
          alt="Dembe Kwinda"
          className={`profile-image ${scrolled ? "small" : "large"}`}
          loading="lazy"
          width={scrolled ? 60 : 120}
          height={scrolled ? 60 : 120}
        />
        <div>
          <h1 tabIndex={0}>Dembe Kwinda</h1>
          <p tabIndex={0}>Software Developer</p>
        </div>
      </header>

      <section className="section about" aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <p tabIndex={0}>
          I'm a passionate full-stack developer building modern web and mobile
          applications. I specialize in intuitive UIs and scalable systems.
          Currently exploring data science and cloud computing.
        </p>
      </section>

      <section
        className="section projects"
        aria-labelledby="highlighted-projects-heading"
      >
        <h2 id="highlighted-projects-heading">Highlighted Projects</h2>
        <div className="project-grid" role="list">
          {projects.map(
            (
              { title, description, url, route, image, tech, github },
              index
            ) => (
              <article
                key={title}
                className="project-card"
                role="listitem"
                tabIndex={0}
                aria-describedby={`${title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-desc`}
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
                />
                <h3>{title}</h3>
                <p id={`${title.replace(/\s+/g, "-").toLowerCase()}-desc`}>
                  {description}
                </p>

                {tech && (
                  <div className="tech-tags" aria-label={`Technologies used in ${title}`} role="list">
                    {tech.map((t) => (
                      <span key={t} className="tech-badge" role="listitem">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  {route ? (
                    <button
                      className="view-button"
                      onClick={() => navigate(route)}
                      aria-label={`Open project ${title}`}
                    >
                      Open
                    </button>
                  ) : (
                    <a
                      href={url}
                      className="view-button"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View project ${title} in a new tab`}
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
                      aria-label={`View source code of ${title} on GitHub`}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            )
          )}
        </div>
      </section>

      <section className="section connect" aria-labelledby="connect-heading">
        <h2 id="connect-heading">Connect</h2>
        <p tabIndex={0}>
          <a
            href="https://www.linkedin.com/in/dembe-kwinda-4461b4237"
            target="_blank"
            rel="noopener noreferrer"
            className="view-button"
            aria-label="Visit my LinkedIn profile (opens in a new tab)"
          >
            Visit my LinkedIn Profile
          </a>
        </p>
      </section>
    </main>
  );
}
