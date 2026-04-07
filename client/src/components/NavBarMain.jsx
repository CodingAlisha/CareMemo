import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import api from '../api/api';


const NavBarMain = () => {

  const navigate = useNavigate();

//   const handleLogout = async () => {
//     await api.get('api/logout');
//     navigate('/');
//   };

  return (
    <div className='Navbar'>
        <nav>
            <NavLink to='/' className='nav-link'>Landing</NavLink>
            <NavLink to='/home' className='nav-link'>Home</NavLink>
            <NavLink to='/list-meals' className='nav-link'>Meals</NavLink>
            <NavLink to='/list-physicians' className='nav-link'>Physicians</NavLink>
            <NavLink to='/list-schedule' className='nav-link'>Schedule</NavLink>
            <NavLink to='/signUp' className='nav-link'>Sign Up</NavLink>
            <NavLink to='/login' className='nav-link'>Log In</NavLink>
        </nav>
    </div>
  )
}


export default NavBarMain;
