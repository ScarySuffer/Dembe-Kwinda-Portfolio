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
    <div className="project-container">
      <header className="project-header">
        <img
          src="/dembe.jpg"
          alt="Dembe Kwinda"
          className={`profile-image ${scrolled ? "small" : "large"}`}
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
          {projects.map(
            (
              { title, description, url, route, image, tech, github },
              index
            ) => (
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

                <div className="project-links">
                  {route ? (
                    <button
                      className="view-button"
                      onClick={() => navigate(route)}
                    >
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
            )
          )}
        </div>
      </section>

      <section className="section connect">
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
