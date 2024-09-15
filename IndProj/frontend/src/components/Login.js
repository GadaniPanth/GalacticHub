import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', { email, password });
      localStorage.setItem('login', response.data.access);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup/', { email, password });
      handleLogin(e); // Auto-login after signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className='fixed pt-[30vh] pl-[30vw]' >
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          className='text-blue-900'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          className='text-blue-900'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          show
        />
        <br />
        <input type='submit' value="Signup" />
      </form>
    </div>
  );
};

export default Login;
