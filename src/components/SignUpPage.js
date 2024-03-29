// src/components/SignUpPage.js

import React, { useState } from 'react';
import "./SignUpPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API endpoint for user sign-up
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Sign-up successful:', data);
        
        // Display success message
        window.alert('Sign-up successful! You can now Sign in.');

        // Redirect to sign-in page after a short delay
        setTimeout(() => {
            window.location.href = '/signin';
        }, 1000); // Redirect after 1 second (1000 milliseconds)
        
      }
      else if (response.status === 400) {
        // Handle existing user error
        window.alert('User already exists. Please sign in or use a different email.');
      }
      else if (response.status === 500) {
        // Handle existing user error
        window.alert('Something went wrong at Backend');
      }
      else {
        throw new Error('Sign-up failed');
      }

    } catch (error) {
        console.error('Sign-up error:', error.message);
        // Display error message
        window.alert('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
