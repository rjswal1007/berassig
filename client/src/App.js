import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Brewery from './components/Brewery';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
      <Route path="/brewery/:id" element={isAuthenticated ? <Brewery /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
