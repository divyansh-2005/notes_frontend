import React, { useState, useContext } from 'react';
import './SignInPage.css'; 
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let navigate = useNavigate();
  // Access the signIn function from the context
  const { signIn } = useContext(AuthContext);

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
        const data = await response.json();
        const {user,token} = data;

        console.log('Data received from backend:', data);

        // Call the signIn function with user data
        signIn(user,token);

        // Handle successful sign-in (e.g., display success message or redirect to dashboard)
        window.alert('Sign-in successful. Redirecting to Dashboard');
        console.log('Sign-in successful');

        // Redirect to user dashboard page after a short delay
        setTimeout(() => {
          navigate('/user'); 
        }, 1000); // Redirect after 1 second (1000 milliseconds)

      } else if (response.status === 404) {
        // Handle existing user error
        window.alert('User not found');
      } else if (response.status === 422) {
        // Handle invalid credentials error
        window.alert('Invalid Credentials');
      } else if (response.status === 500) {
        // Handle server error
        window.alert('Something went wrong at Backend');
      } else {
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
