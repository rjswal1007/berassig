import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`$(window.location.origin)/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/search');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div >
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        <br/>
        <div className='ll'>
        <h4>Don't have an Account? <a href='/Signup'> Sign Up </a> </h4>
        
        </div>
      </form>
    </div>
  );
};

export default Login;
