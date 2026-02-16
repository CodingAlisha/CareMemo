import React from 'react'
import { useEffect, useState } from 'react'


const MedicationList = () => {
  const [ medications, setMedications ] = useState([]);

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
    fetch ('/api/medication')
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setMedications(data);
    })
    .catch(err => console.error("ERROR:", err));
  }, []);
  
  return (
    <div>
       <h1>Medications</h1>
       {medications.map(medication => (
        // .after you map you need the api name before => name is named after the model schema variable name const mealSelection
        <div key= {medication._id}>
          <p>Name: {medication.name}</p>
          <p>Dose: {medication.dose}</p>
          <p>Special Notes: {medication.notes}</p>
          </div>
       ))}
    </div>
  );
}

export default MedicationList;

