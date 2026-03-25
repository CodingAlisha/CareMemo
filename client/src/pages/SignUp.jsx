// import React, { useState } from 'react';
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword]  = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    
      // if (password !== confirmPassword) err.confirmPassword = 'Passwords do not match';
    
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        return;
      }
    
    // reset errors
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch('/api/SignUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
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
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {/* <form > */}
        <h2>Sign Up</h2>


        <label htmlFor="firstName" className='formTitle'>First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="lastName" className='formTitle'>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />


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

        <label htmlFor="confirmPassword" className='formTitle'>Confirm Password</label>
        <input
          type="password"
          name="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="confirmPasswordError">{confirmPasswordError}</div>

        <NavLink to='/login' className='nav-link'>Already have an account? Log In</NavLink>
        {/* <button onClick={(e)=>handleSubmit(e)}>Register</button> */}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;