import React from 'react'
import { useEffect, useState } from 'react';
import DeleteButton from '../components/DeleteButton';
import medicalIcon from '../assets/medicalIcon.jpg';
// DELETE BUTTON NOT WORKING


const MedicalList = () => {
  const [ medicals, setMedicals ] = useState([]);

  const handleDelete = (id) => {
    setMedicals((prev) => prev.filter((medical) => medical._id !== id));
  };

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
    fetch ('/api/medicalAlert', {
      method: 'GET',
      credentials: 'include'
    }
    )
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
          {/* <img src={medicalIcon} alt= 'Medical Alert Icon' width={18} height={18}/>
          <span>{medicalAlert.name}</span> */}
          <p>Name: {medicalAlert.name}</p>
          <p>Allergy: {medicalAlert.allergy}</p>
          <p>Special Notes: {medicalAlert.notes}</p>
          <DeleteButton endpoint={'deleteMedicalAlert'} id={medicalAlert._id} onDelete={handleDelete} />
          </div>
       ))}
    </div>
  );
}

export default MedicalList;
