// src/Contact.js
import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Contact from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:dembekwinda03@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Me</h1>
        <p className="subtitle">Get in touch</p>
        <img
          src="/images/projects/dembe.jpg"
          alt="Dembe Kwinda"
          className="contact-avatar"
          loading="lazy"
        />
      </header>

      <section className="contact-info">
        <ul>
          <li>
            <FaEnvelope aria-hidden="true" />{" "}
            <strong>Email:</strong>{" "}
            <a href="mailto:dembekwinda03@gmail.com">dembekwinda03@gmail.com</a>
          </li>
          <li>
            <FaEnvelope aria-hidden="true" />{" "}
            <strong>Email:</strong>{" "}
            <a href="mailto:deekwinda@icloud.com">deekwinda@icloud.com</a>
          </li>
          <li>
            <FaPhone aria-hidden="true" /> <strong>Phone:</strong>{" "}
            <a href="tel:+27795205467">+27 79 520 5467</a>
          </li>
          <li>
            <FaPhone aria-hidden="true" /> <strong>Phone:</strong>{" "}
            <a href="tel:+27694543677">+27 69 454 3677</a>
          </li>
          <li>
            <FaMapMarkerAlt aria-hidden="true" /> <strong>Location:</strong>{" "}
            Clayville, Olifantsfontein, South Africa
          </li>
          <li>
            <FaLinkedin aria-hidden="true" /> <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/dembe-kwinda-76a45a1b9"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/dembe-kwinda
            </a>
          </li>
          <li>
            <FaGithub aria-hidden="true" /> <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/demcode3"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/demcode3
            </a>
          </li>
          <li>
            <FaGithub aria-hidden="true" /> <strong>GitHub (ScarySuffer):</strong>{" "}
            <a
              href="https://github.com/ScarySuffer"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/ScarySuffer
            </a>
          </li>
          <li>
            <FaGlobe aria-hidden="true" /> <strong>Portfolio:</strong>{" "}
            <a
              href="https://demcode3.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              demcode3.github.io
            </a>
          </li>
        </ul>
      </section>

      <section className="contact-form-section">
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
              rows={5}
            />
          </div>

          <button type="submit" className="contact-submit">
            Send via Email
          </button>
        </form>
      </section>
    </div>
  );
}
