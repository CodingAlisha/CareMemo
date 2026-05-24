// import React, { useState } from 'react';
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBarMain from '../components/NavBarMain';


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
    

    
      // MAKE SURE PASSWORDS MATCH
    
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        return;
      }
    
    // reset errors
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/SignUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
        credentials: 'include'
      });

      //Read response as text first
    //   const textResponse = await response.text();
    //   console.log('Raw Server Response:', textResponse);

    //   const data = textResponse ? JSON.parse(textResponse) : {};

    //   if (!response.ok) {
    //     throw new Error(data.message || 'Signup failed');
    //   }

    // } catch(error) {
    //   console.error('Fetch/Parsing error:', error);
    // }

      const data = await res.json();

      if (data.errors) {
        setEmailError(data.errors.email || '');
        setPasswordError(data.errors.password || '');
      }

      if (data.user) {
        
        setTimeout(() => navigate('/home'), 100);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
       <NavBarMain />

      <form onSubmit={handleSubmit}>
     
        <h2>Sign Up</h2>


        <label htmlFor='firstName' className='formTitle'>First Name</label>
        <input
          id='firstName'
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor='lastName' className='formTitle'>Last Name</label>
        <input
          id='lastName'
          type="text"
          name="lastName"
          autoComplete='off'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />


        <label htmlFor='email' className='formTitle'>Email</label>
        <input
          id='email'
          type="text"
          name="email"
          autoComplete='off'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="email error">{emailError}</div>

        <label htmlFor='password' className='formTitle'>Password</label>
        <input
          id='password'
          type="password"
          name="password"
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="passwordError">{passwordError}</div>

        <label htmlFor='confirmPassword' className='formTitle'>Confirm Password</label>
        <input
          id='confirmPassword'
          type="password"
          name="confirm_password"
          autoComplete='off'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="confirmPasswordError">{confirmPasswordError}</div>

        <NavLink to='/login' className='nav-link'>Already have an account? Log In</NavLink>
        

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;