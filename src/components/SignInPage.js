// src/components/SigninPage.js

import React, { useState } from 'react';
import './SignInPage.css'; 

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Handle successful sign-in (e.g., display success message or redirect to dashboard)
        window.alert('Sign-in successful. Redirecting to Dashboard');
        console.log('Sign-in successful');

        // Redirect to userdashboard page after a short delay
        setTimeout(() => {
          window.location.href = '/'; //currenty redirectin to home TO BE CHANGED
      }, 1000); // Redirect after 1 second (1000 milliseconds)
      }
      else if (response.status === 404) {
        // Handle existing user error
        window.alert('User not found');
      }
      else if (response.status === 422) {
        // Handle existing user error
        window.alert('Invalid Credentials');
      }
      else if (response.status === 500) {
        // Handle existing user error
        window.alert('Something went wrong at Backend');
      }
      else {
        throw new Error('Sign-in failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error.message);
      // Handle sign-in error (e.g., display error message to user)
      window.alert('Sign-in error')
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SigninPage;
