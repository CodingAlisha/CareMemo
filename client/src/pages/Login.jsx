// import React, { useState } from 'react';
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBarMain from '../components/NavBarMain';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    // reset errors
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.errors) {
        setEmailError(data.errors.email || '');
        setPasswordError(data.errors.password || '');
      }

      if (data.user) {
        // window.location = '/home';
        setTimeout(() => navigate('/home'), 100);
      }

    } catch (err) {
    }
  };

  return (
    <div>
       <NavBarMain />
      
      <form onSubmit={handleSubmit}>
      {/* <form > */}
        <h2>Login</h2>

        <label htmlFor="email" className='formTitle'>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="email error">{emailError}</div>

        <label htmlFor="password" className='formTitle'>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="passwordError">{passwordError}</div>
       
        <NavLink to='/signup' className='nav-link'>Need to Create an Account? Sign Up</NavLink>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;