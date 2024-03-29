// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to Notes App</h1>
      <div>
        <Link to="/signin" className="button">Sign In</Link> {/* Link to sign-in page */}
        <Link to="/signup" className="button">Sign Up</Link> {/* Link to sign-up page */}
      </div>
    </div>
  );
};

export default HomePage;
