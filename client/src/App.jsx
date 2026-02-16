import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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



//Import Components
import Footer from './components/Footer';
import Slider from './components/Slider';
import NavBar from './components/NavBar.jsx';




function App() {

  return (
    
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/home' element={<Home />} />
      <Route path='/list-physicians' element={<Physicians />} />
      <Route path='/list-meals' element={<Meals/>} />
      <Route path='/list-schedule' element={<Schedule/>} />
      <Route path='/list-medical' element={<Medical/>} />
      <Route path='/list-medication' element={<Medication/>} />
    </Routes>
    </BrowserRouter> 
  );
}

export default App;



