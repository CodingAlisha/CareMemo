import React from 'react'
import { useEffect, useState } from 'react'
import DeleteButton from '../components/DeleteButton';



const MedicationList = () => {
  const [ medications, setMedications ] = useState([]);

  const handleDelete = (id) => {
    setMedications((prev) => prev.filter((medication) => medication._id !== id));
  };

  useEffect(( ) => {
    
    fetch ('/api/medication', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setMedications(data);
    })
    .catch(err => console.error("ERROR:", err));
  }, []);
  
  return (
    <div>
       <h1 className='medicationH1'>Medications</h1>
       <span className='cardSpan'>
       {medications.map(medication => (
        
        <div className='medicationContainer' key= {medication._id}>
          <p className='medicationName'>Name: {medication.name}</p>
          <p className='medicationDose'>Dose: {medication.dose}</p>
          <p className='medicationNotes'>Special Notes: {medication.notes}</p>
          <DeleteButton className='formBtn' endpoint='deleteMedication' id={medication._id} onDelete={handleDelete} />
          </div>
       ))}
       </span>
    </div>
  );
}

export default MedicationList;

