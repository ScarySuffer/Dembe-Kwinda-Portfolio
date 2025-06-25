// src/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

// You might need an actual image file for this, e.g., in your public folder
// For example, if you have public/images/error-robot.png
// You can also use an emoji directly or a simple SVG if you don't have an image.

export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* --- NEW TWEAKS BELOW --- */}
      {/* Option 1: Use an emoji for simplicity */}
      <span role="img" aria-label="confused face" style={{ fontSize: '5em', marginBottom: '20px' }}>
        😕
      </span>

      {/* Option 2: If you have an image, uncomment this and adjust src */}
      {/* <img
        src="/images/error-illustration.png" // Make sure this path is correct
        alt="Page Not Found Illustration"
        style={{ width: '150px', height: 'auto', marginBottom: '30px' }}
      /> */}

      <h1>404 - Page Not Found</h1>
      <p>We couldn't find the page you were looking for.</p> {/* Slightly rephrased */}
      <p>
        It might have been moved, deleted, or you might have typed the address incorrectly.
      </p>
      <Link to="/">Go back to the Homepage</Link> {/* Link text updated */}
    </div>
  );
}