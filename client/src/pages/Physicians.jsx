import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import MainBanner from '../components/MainBanner';
import DeleteButton from '../components/DeleteButton';


const Physicians = () => {
  const [ physicians, setPhysicians ] = useState([]);

  const handleDelete = (id) => {
    setPhysicians((prev) => prev.filter((physician) => physician._id !== id));
  };

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/physician')
    fetch ('/api/physician')
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setPhysicians(data);
    })
    .catch(err => console.error("ERROR:", err));
    // .then(data => setPhysicians (data)); 
  }, []);
  
  return (
    <div>

       <h1 className='physicianH1'>Physicians</h1>

       <MainBanner />

       <Link to='/add-physician' className='nav-link'>Add New Physician</Link>

       <span className='cardSpan'>
       {physicians.map(physician => (
        <div className='physicianContainer' key= {physician._id}>
          <p className='physicianName'>{physician.name}</p>
          <p className='physicianSpecialty'>Specialty: {physician.specialty}</p>
          <p className='physicianContact'>Contact: {physician.contact}</p>
          <DeleteButton endpoint={'deletePhysician'} id={physician._id} onDelete={handleDelete} />
          </div>
       ))}
       </span>
    </div>
  );
}

export default Physicians;
