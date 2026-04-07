import React from 'react'
import Card from '../components/Card';
import doctorImg from '../assets/doctorImg.jpg';
import doctor from '../assets/doctor.jpeg';
import planner from '../assets/planner.jpeg';
import schedule from '../assets/schedule.jpg';
import freshMeals from '../assets/freshMeals.jpeg';
import foodIcon from '../assets/foodIcon.png';
import foodHeartIcon from '../assets/foodHeartIcon.png';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';
import medicalIcon from '../assets/medicalIcon.jpg';
import medicationIcon from '../assets/medicationIcon.jpg';
import NavBar from '../components/NavBar';

// import { getMedication } from '../components/ServicesMedication';
// import { getMedicalAlert } from '../components/ServicesMedical';


const Home = () => {
  const [ medications, setMedications ] = useState([]);
  const [ medicals, setMedicals ] = useState([]);

  const handleDeleteMedical = (id) => {
    setMedicals((prev) => prev.filter((medical) => medical._id !== id));
  };

  const handleDeleteMedication = (id) => {
    setMedications((prev) => prev.filter((medication) => medication._id !== id));
  };

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
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

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
    fetch ('/api/medicalAlert', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setMedicals(data);
    })
    .catch(err => console.error("ERROR:", err));
  }, []);

  const mainCards = [

    {
      tag: 'Upcoming Appointments',
      img: planner,
      title: 'Schedule',
      description: 'Never miss what matters, your appointments, milestones, and special events! We take the guesswork out of your day so you can focus on what matters most. ',
      imgIcon: schedule,
      subName: 'Appointments',
      subDesc: 'Add Events',
      route: '/list-schedule'
    },
    {
      tag: 'Meals & Snacks',
      img: freshMeals,
      title: 'Favorite Meals',
      description: 'Build a care meal plan as unique as the person it"s made for. From daily meals to medication and beyond, personalized support that keeps them comfortable, cared for, and at their best. ',
      imgIcon: foodHeartIcon,
      subName: 'Meals',
      subDesc: 'Add Meals',
      route: '/list-meals'
    },
    {
      tag: 'Doctors & Specialist',
      img: doctorImg,
      title: 'Doctors',
      description: 'Everything about your health, right where you need it. Update your primary care provider, manage specialist, and keep your information current. No calls, no phone calls, just one click away.',
      imgIcon: doctor,
      subName: 'Doctors',
      subDesc: 'Add Doctors',
      route: '/list-physicians'
    }
  ]
 
return (
  <div>
    <NavBar/>
    
    <h1 className='heading'>Welcome, Customize a Care Plan</h1>
    <section>
    
    <h1 className='medicalH1'>Medical Information</h1>
    <Link to='/add-medical' className='nav-link'>Add Medical Alert</Link>
    <span className='cardSpan'>
       {medicals.map(medicalAlert => (
        // .after you map you need the api name before => name is named after the model schema variable name const mealSelection
        <div className='medicalContainer' key= {medicalAlert._id}>
          <img className='medicalIcon' src={medicalIcon} alt= 'Medical Alert Icon'/>
          <p className='medicalName'><strong>{medicalAlert.name}</strong></p>
          <p className='medicalAllergy'><strong>Allergy:</strong> {medicalAlert.allergy}</p>
          <p className='medicalNotes'><strong>Special Notes:</strong> {medicalAlert.notes}</p>
          <DeleteButton endpoint={'deleteMedicalAlert'} id={medicalAlert._id} onDelete={handleDeleteMedical} />
          </div>
       ))}
       </span>
    </section>
    

    <div>
      
    </div>
    <span className='cardSpan'>
     {mainCards.map((card, index) => (
   
    <Card className='moveCard'
    key={index}
    tag={card.tag}
    img={card.img}
    title={card.title}
    description={card.description}
    imgIcon={card.imgIcon}
    subName={card.subName}
    subDesc={card.subDesc}
    route={card.route}
    />
  ))}
  </span>
  <section>
        <h1 className='medicationH1'>Medications</h1>

        <Link to='/add-medication' className='nav-link'>Add New Medication</Link>

       <span className='cardSpan'>
       {medications.map(medication => (
        // .after you map you need the api name before => name is named after the model schema variable name const mealSelection
        <div className='medicationContainer'key= {medication._id}>
           <img className='medicationIcon' src={medicationIcon} alt= 'Medical Alert Icon'/>
          <p className='medicationName'><strong>{medication.name}</strong></p>
          <p className='medicationDose'>{medication.dose}</p>
          <p className='medicationNotes'>Special Notes: <strong>{medication.notes}</strong></p>
          <DeleteButton className='formBtn' endpoint='deleteMedication' id={medication._id} onDelete={handleDeleteMedication} />
          </div>
       ))}
       </span>
  </section>
  </div>
)
}

export default Home;