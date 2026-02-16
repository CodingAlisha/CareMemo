import React from 'react'
import { useEffect, useState } from 'react'


const UpcomingSchedule = () => {
  const [ schedules, setSchedules ] = useState([]);

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
       <h1>Upcoming Events & Appointments</h1>
       {schedules.map(schedule => (
        // .name is named after the model schema variable name const mealSelection
        <div key= {schedule._id}>
          <p>Event Name: {schedule.eventType}</p>
          <p>Reason: {schedule.reason}</p>
          <p>Status: {schedule.status}</p>
          </div>
       ))}
    </div>
  );
}

export default UpcomingSchedule;

