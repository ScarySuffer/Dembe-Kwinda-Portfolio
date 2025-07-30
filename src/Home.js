import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure your CSS is correctly linked
import { allProjects } from './Projects'; // Import allProjects from the centralized data file

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // This part handles theme, ensure it's consistent with your ThemeContext if used globally
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    document.body.classList.toggle("light-mode", savedTheme !== "dark");

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter out the LinkedIn Profile from projects displayed on the Home page,
  // as it's typically handled separately or not as a "project" for this section.
  const highlightedProjects = allProjects.filter(project => project.title !== "LinkedIn Profile");


  return (
    <main className="home-page-container"> {/* This class is styled for full-screen in Home.css */}
      <header className="home-header" role="banner">
        <img
          src="/images/projects/dembe.jpg" // Updated to consistent asset path
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
          {highlightedProjects.map( // Use filtered projects here
            (
              { title, description, url, route, image, tech, github, icon }, // Include icon from allProjects
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
                {/* Use the icon from the allProjects data if available, otherwise fallback to image */}
                {icon ? (
                  <div className="project-card-icon">{icon}</div>
                ) : (
                  <img
                    src={image}
                    alt={`Screenshot of ${title}`}
                    className="project-image"
                    loading="lazy"
                  />
                )}
                <h3>{title}</h3>
                <p id={`${title.replace(/\s+/g, "-").toLowerCase()}-desc`}>
                  {description}
                </p>

                {tech && (
                  <div className="tech-tags" aria-label={`Technologies used in ${title}`} role="list">
                    {/* Ensure tech is a string to be split, as per your Projects.js data structure */}
                    {tech.split('·').map((t) => (
                      <span key={t.trim()} className="tech-badge" role="listitem">
                        {t.trim()}
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
