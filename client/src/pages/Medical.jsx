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
        
        <div key= {medicalAlert._id}>
          
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
