import React from 'react'
import { useEffect, useState } from 'react'


const MedicalList = () => {
  const [ medicals, setMedicals ] = useState([]);

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
    fetch ('/api/medicalAlert')
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setMedicals(data);
    })
    .catch(err => console.error("ERROR:", err));
  }, []);
  
  return (
    <div>
       <h1>Medical</h1>
       {medicals.map(medicalAlert => (
        // .after you map you need the api name before => name is named after the model schema variable name const mealSelection
        <div key= {medicalAlert._id}>
          <p>Name: {medicalAlert.name}</p>
          <p>Allergy: {medicalAlert.allergy}</p>
          <p>Special Notes: {medicalAlert.notes}</p>
          </div>
       ))}
    </div>
  );
}

export default MedicalList;

