import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MainBanner from '../components/MainBanner';
import Banner from '../components/Banner';
import planner from '../assets/planner.jpeg'
import DeleteButton from '../components/DeleteButton';


const UpcomingSchedule = () => {
  const [ schedules, setSchedules ] = useState([]);

  const handleDelete = (id) => {
    setSchedules((prev) => prev.filter((schedule) => schedule._id !== id));
  };


  const formateDate = (date) => {
    if (!date) return '';
    const scheduleDate = new Date(date);
    return scheduleDate.toLocaleString('en-US', {
      dateStyle: 'medium', 
      timeStyle: 'short'
    });
  };


  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
    // this api name is what is in the controller
    fetch ('/api/schedule')
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setSchedules(data);
    })
    .catch(err => console.error("ERROR:", err));
  }, []);
  
  return (
    <div>
       <h1 className='scheduleH1'>Upcoming Events & Appointments</h1>

       {/* <MainBanner /> */}
       <Banner img={planner} title={'Schedule'}/>

       <Link to='/add-schedule' className='nav-link'>Add New Event</Link>

       <span className='cardSpan'>
       {schedules.map(schedule => (
        // .name is named after the model schema variable name const mealSelection
        <div className='scheduleContainer' key= {schedule._id}>
          <p className='scheduleName'>{schedule.eventType}</p>
          <p className='scheduleReason'>Reason: {schedule.reason}</p>
          <p className='scheduleStatus'>Status: {schedule.status}</p>
          <p className='scheduleStatus'>Date & Time: {formateDate(schedule.date)}</p>
          <DeleteButton endpoint='deleteSchedule' id={schedule._id} onDelete={handleDelete} />
          </div>
       ))}
       </span>
    </div>
  );
}

export default UpcomingSchedule;

