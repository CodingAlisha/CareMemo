import React from 'react'
import { NavLink } from 'react-router-dom'


const NavBar = () => {
  return (
    <div className='Navbar'>
        <nav>
            <NavLink to='/'>Landing</NavLink>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/list-meals'>Meals</NavLink>
            <NavLink to='/list-physicians'>Physicians</NavLink>
            <NavLink to='/list-schedule'>Schedule</NavLink>
            <NavLink to='/list-medical'>Medical Alert</NavLink>
            <NavLink to='/list-medication'>Medication</NavLink>
        </nav>
    </div>
  )
}

// const NavBar = () => {
//   return (
//     <h1 style={{ color: 'red' }}>
//       NAVBAR IS RENDERING
//     </h1>
//   )
// }

export default NavBar
