// src/ComingSoon.js
import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "./ComingSoon.css";

export default function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for signing up with ${email}!`);
      setEmail("");
    }
  };

  return (
    <div className="coming-soon-container">
      <div className="content">
        <h1>Coming Soon</h1>
        <p>We're working hard to launch our website. Stay tuned!</p>

        <form className="notify-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Notify Me</button>
        </form>

        <div className="social-icons">
            <button
                className="link-style-button"
                onClick={(e) => e.preventDefault()}
                aria-label="Twitter (disabled)"
                disabled
                style={{ cursor: "not-allowed", color: "gray", background: "none", border: "none", padding: 0 }}
                >
                <FaTwitter />
                </button>
            <a
                href="https://www.linkedin.com/in/dembe-kwinda-4461b4237"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
            >
                <FaLinkedin />
            </a>
            <a
                href="https://github.com/ScarySuffer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
            >
                <FaGithub />
            </a>
            </div>

      </div>
    </div>
  );
}
