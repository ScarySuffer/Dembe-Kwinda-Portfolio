import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleNavLinkClick = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    setSidebarOpen(false);
  };

  const handleNavLinkHover = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      // Note: Do NOT close sidebar here on hover
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/resume", label: "Resume" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
    { path: "/certificates", label: "Certificates" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
        <div className="container-fluid px-3">
          <Link className="navbar-brand fw-bold" to="/">
            My Portfolio
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Desktop nav links */}
          <div className="d-none d-lg-flex ms-auto align-items-center">
            <ul className="navbar-nav">
              {navLinks.map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <Link
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    }`}
                    to={path}
                    onMouseEnter={() => handleNavLinkHover(path)}
                    onClick={(e) => {
                      e.preventDefault();
                      if (location.pathname !== path) navigate(path);
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Dark/Light toggle button */}
            <button
              className={`btn ms-3 btn-sm ${
                darkMode ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        role="navigation"
      >
        <ul className="sidebar-nav">
          {navLinks.map(({ path, label }) => (
            <li key={path} className="sidebar-item">
              <a
                href={path}
                className={`sidebar-link ${
                  location.pathname === path ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(path);
                }}
                onMouseEnter={() => handleNavLinkHover(path)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Dark/Light toggle in sidebar */}
        <div className="sidebar-toggle-container">
          <button
            className={`btn ${darkMode ? "btn-dark" : "btn-outline-dark"} w-100`}
            onClick={() => {
              toggleDarkMode();
              setSidebarOpen(false); // optionally close sidebar on toggle
            }}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      </div>

      {/* Overlay to close sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
