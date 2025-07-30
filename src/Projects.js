import { useNavigate } from "react-router-dom";
import "./Projects.css";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaMicrochip,
  FaBookOpen,
  FaCloudSun,
  FaNetworkWired,
  FaChartPie,
} from "react-icons/fa";

export default function Projects() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Crypto Price Tracker with ETL + Dashboard",
      description:
        "Built a full-stack crypto dashboard with scheduled ETL pipelines, historical charting, and real-time price tracking.",
      url: "http://13.48.59.188",
      tech: "Node.js · SQLite · Recharts · React · Express",
      icon: <FaChartPie aria-label="Chart Pie Icon" role="img" />,
    },
    {
      title: "DynamicGen Holdings E-commerce",
      description:
        "Built a full-featured React-based e-commerce platform for auto spare parts with filtering and product detail pages.",
      url: "https://dynamicgenholdings-16794.web.app/",
      tech: "React · Firebase · Bootstrap",
      icon: <FaLaptopCode aria-label="Laptop Code Icon" role="img" />,
    },
    {
      title: "Budgetly – Personal Finance Tracker",
      description:
        "A modern budgeting app to manage income, expenses, and savings with intuitive charts and Firebase sync.",
      url: "https://kasi-budgetly.netlify.app/",
      tech: "React · Firebase · Chart.js",
      icon: <FaChartPie aria-label="Chart Pie Icon" role="img" />,
    },
    {
      title: "Weather Forecast App",
      description:
        "Built a responsive weather forecast application using React and OpenWeatherMap API.",
      route: "/weather",
      tech: "React · API · CSS",
      icon: <FaCloudSun aria-label="Cloud Sun Icon" role="img" />,
    },
    {
      title: "Arduino Robotics & Automation",
      description:
        "Developed prototypes integrating sensors and actuators to automate mechanical processes.",
      url: "https://github.com/yourusername/arduino-robotics",
      tech: "Arduino · Sensors · Automation",
      icon: <FaMicrochip aria-label="Microchip Icon" role="img" />,
    },
    {
      title: "Flutter Mobile Apps",
      description:
        "Built cross-platform mobile applications with Flutter, integrating Firebase for backend services.",
      url: "https://github.com/yourusername/flutter-mobile-apps",
      tech: "Flutter · Firebase",
      icon: <FaMobileAlt aria-label="Mobile Icon" role="img" />,
    },
    {
      title: "Full-Stack Web Development",
      description:
        "Designed and implemented responsive websites and RESTful APIs using MERN stack.",
      url: "https://github.com/yourusername/fullstack-web-development",
      tech: "MERN · REST APIs",
      icon: <FaNetworkWired aria-label="Network Wired Icon" role="img" />,
    },
    {
      title: "Embedded Systems Programming",
      description:
        "Programmed microcontrollers (Arduino) for sensor data acquisition and device control.",
      url: "https://github.com/yourusername/embedded-systems",
      tech: "Embedded C · Arduino",
      icon: <FaMicrochip aria-label="Microchip Icon" role="img" />,
    },
    {
      title: "OpenStreetMap Integration",
      description:
        "Implemented geolocation in mobile apps using OpenStreetMap for enhanced navigation.",
      url: "https://github.com/yourusername/openstreetmap-integration",
      tech: "Geolocation · OSM",
      icon: <FaMobileAlt aria-label="Mobile Icon" role="img" />,
    },
    {
      title: "Bookverse",
      description:
        "Created a platform for readers to discover, review, and share books.",
      url: "https://github.com/yourusername/bookverse",
      tech: "React · Node.js · MongoDB",
      icon: <FaBookOpen aria-label="Book Open Icon" role="img" />,
    },
    {
      title: "LinkedIn Profile",
      description: "Connect with me on LinkedIn for more updates.",
      url: "https://www.linkedin.com/in/dembekwinda",
      tech: "Professional Network",
      icon: <FaLaptopCode aria-label="Laptop Code Icon" role="img" />,
    },
  ];

  return (
    <div className="project-container">
      <header className="project-header">
        <h1>My Projects</h1>
        <p>Explore what I've built with passion and precision.</p>
      </header>

      <section className="project-grid" aria-label="List of projects">
        {projects.map(({ title, description, url, route, tech, icon }, index) => (
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
