import React from 'react'
import { useEffect, useState } from 'react'


const Physicians = () => {
  const [ physicians, setPhysicians ] = useState([]);

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
       <h1>Physicians Page</h1>
       {physicians.map(physician => (
        <div key= {physician._id}>
          <p>Name: {physician.name}</p>
          <p>Specialty: {physician.specialty}</p>
          <p>Contact: {physician.contact}</p>
          </div>
       ))}
    </div>
  );
}

export default Physicians;
