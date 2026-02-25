import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
// import RequireAuth from './components/RequireAuth';


// import reactLogo from './assets/react.svg'
import './App.css'




// Import pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Schedule from './pages/Schedule'
import Meals from './pages/Meals';
import Physicians from './pages/Physicians';
import Medical from './pages/Medical';
import Medication from './pages/Medication';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import InputMeals from './pages/InputMeals';



//Import Components
import Footer from './components/Footer';
import NavBar from './components/NavBar.jsx';
import InputPhysician from './pages/InputPhysician.jsx';
import InputMedication from './pages/InputMedication.jsx';
import InputSchedule from './pages/InputSchedule.jsx';
import InputMedical from './pages/InputMedical.jsx';





function App() {

  return (
    
    <BrowserRouter>
    <NavBar/>
    <Routes>
      {/* PUBLIC ROUTE*/}
      <Route path='/' element={<Landing/>} />
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />

       {/* PROTECTED ROUTE*/}
       <Route element={<ProtectedRoute />}>
      <Route path='/home' element={<Home />} />
      <Route path='/list-physicians' element={<Physicians />} />
      <Route path='/list-meals' element={<Meals/>} />
      <Route path='/list-schedule' element={<Schedule/>} />
      <Route path='/list-medical' element={<Medical/>} />
      <Route path='/list-medication' element={<Medication/>} />
      <Route path='/add-meals' element={<InputMeals/>} />
      <Route path='/add-physician' element={<InputPhysician/>} />
      <Route path='/add-medication' element={<InputMedication/>} />
      <Route path='/add-schedule' element={<InputSchedule/>} />
      <Route path='/add-medical' element={<InputMedical/>} />
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter> 
  );
}

export default App;



