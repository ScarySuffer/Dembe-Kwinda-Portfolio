// src/Projects.js

// All import statements should be at the very top of the file
import React from "react"; // React import
import { useNavigate } from "react-router-dom"; // React Router hook
import {
  FaLaptopCode,
  FaMobileAlt,
  FaMicrochip,
  FaBookOpen,
  FaCloudSun,
  FaNetworkWired,
  FaChartPie,
  FaBitcoin, // For crypto
  FaLinkedinIn // For LinkedIn
} from "react-icons/fa"; // React Icons imports
import "./Projects.css"; // CSS import

// ===========================================================================
// PROJECT DATA
// This array contains data for all projects, used across various components.
// ===========================================================================
export const allProjects = [ // <<< IMPORTANT: This 'export const' is crucial
 
  {
    title: "DynamicGen Holdings E-commerce",
    description:
      "Built a full-featured React-based e-commerce platform for auto spare parts with filtering and product detail pages.",
    url: "https://dynamicgenholdings-16794.web.app/",
    tech: "React · Firebase · Bootstrap · Node.js · Express · MongoDB",
    category: "Web Development",
    icon: <FaLaptopCode aria-label="Laptop Code Icon" role="img" />
  },
  {
    title: "Budgetly – Personal Finance Tracker",
    description:
      "A modern budgeting app to manage income, expenses, and savings with intuitive charts and Firebase sync.",
    url: "https://kasi-budgetly.netlify.app/",
    tech: "React · Firebase · Chart.js",
    category: "Web Development",
    icon: <FaChartPie aria-label="Chart Pie Icon" role="img" />
  },
   {
    title: "Crypto Price Tracker with ETL + Dashboard",
    description:
      "Built a full-stack crypto dashboard with scheduled ETL pipelines, historical charting, and real-time price tracking.",
    url: "http://13.48.59.188",
    tech: "Node.js · SQLite · Recharts · React · Express · WebSocket · Python",
    category: "Data Science / Web",
    icon: <FaBitcoin aria-label="Bitcoin Icon" role="img" />
  },
  {
    title: "Weather Forecast App",
    description:
      "Built a responsive weather forecast application using React and OpenWeatherMap API.",
    route: "/weather",
    tech: "React · API · CSS",
    category: "Web Development",
    icon: <FaCloudSun aria-label="Cloud Sun Icon" role="img" />
  },
  {
    title: "Arduino Robotics & Automation",
    description:
      "Developed prototypes integrating sensors and actuators to automate mechanical processes.",
     route: "/coming-soon",
    tech: "Arduino · Sensors · Automation · C",
    category: "Engineering / Robotics",
    icon: <FaMicrochip aria-label="Microchip Icon" role="img" />
  },
  {
    title: "Flutter Mobile Apps",
    description:
      "Built cross-platform mobile applications with Flutter, integrating Firebase for backend services.",
  route: "/coming-soon",    tech: "Flutter · Firebase",
    category: "Mobile Development",
    icon: <FaMobileAlt aria-label="Mobile Icon" role="img" />
  },
  {
    title: "Full-Stack Web Development",
    description:
      "Designed and implemented responsive websites and RESTful APIs using MERN stack.",
    route: "/coming-soon",
    tech: "MERN · REST APIs · Node.js · Express · React · MongoDB",
    category: "Web Development",
    icon: <FaNetworkWired aria-label="Network Wired Icon" role="img" />
  },
  {
    title: "Embedded Systems Programming",
    description:
      "Programmed microcontrollers (Arduino) for sensor data acquisition and device control.",
    route: "/coming-soon",
    tech: "Embedded C · Arduino",
    category: "Engineering / Embedded",
    icon: <FaMicrochip aria-label="Microchip Icon" role="img" />
  },
  {
    title: "OpenStreetMap Integration",
    description:
      "Implemented geolocation in mobile apps using OpenStreetMap for enhanced navigation.",
    route: "/coming-soon",
    tech: "Geolocation · OSM · Flutter",
    category: "Mobile Development",
    icon: <FaMobileAlt aria-label="Mobile Icon" role="img" />
  },
  {
    title: "Bookverse",
    description:
      "Created a platform for readers to discover, review, and share books.",
    route: "/coming-soon",
    tech: "React · Node.js · MongoDB",
    category: "Web Development",
    icon: <FaBookOpen aria-label="Book Open Icon" role="img" />
  },
  {
    title: "LinkedIn Profile",
    description: "Connect with me on LinkedIn for more updates.",
    url: "https://www.linkedin.com/in/dembe-kwinda-4461b4237",
    tech: "Professional Network",
    category: "Professional",
    icon: <FaLinkedinIn aria-label="LinkedIn Icon" role="img" />
  }
];

// Main Projects component
export default function Projects() {
  // Directly use allProjects here, no need for a new 'projects' constant
  const navigate = useNavigate();

  return (
    <div className="project-container">
      <header className="project-header">
        <h1>My Projects</h1>
        <p>Explore what I've built with passion and precision.</p>
      </header>

      <section className="project-grid" aria-label="List of projects">
        {allProjects.map(({ title, description, url, route, tech, icon }, index) => (
          <article
            key={title}
            className="project-card"
            style={{
              animation: `fadeSlideUpCard 0.6s ease-out forwards`,
              animationDelay: `${index * 0.2}s`,
            }}
            tabIndex={0}
            aria-describedby={`${title.replace(/\s+/g, "-").toLowerCase()}-desc`}
          >
            <div className="project-icon">{icon}</div>
            <h3>{title}</h3>
            <p id={`${title.replace(/\s+/g, "-").toLowerCase()}-desc`}>{description}</p>

            <div
              className="tech-stack"
              aria-label={`Technologies used in ${title}`}
              role="list"
            >
              {tech.split("·").map((techItem, i) => (
                <span key={i} className="tech-badge" role="listitem">
                  {techItem.trim()}
                </span>
              ))}
            </div>

            <button
              className="view-button"
              onClick={() =>
                route
                  ? navigate(route)
                  : window.open(url, "_blank", "noopener,noreferrer")
              }
              aria-label={`View project: ${title}`}
            >
              Click to View
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
