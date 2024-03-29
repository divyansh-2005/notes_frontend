// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './components/AuthContext';


function App() {
  const [user,setUser] = useState(null);

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/signin" element={<SignInPage setUser={setUser}/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/user" element={<Dashboard user={user}/>} />
       </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;
