import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


const InputSchedule = () => {
    const navigate = useNavigate();

    const [formData, setFormData ] = useState ({
        eventType: '',
        reason: '',
        status: '',
        date: ''
    });

    
    const handleChange = (e) => {
        setFormData ({
            ...formData, 
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", formData);

        const res = await fetch("/api/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",},
          credentials: 'include',
          body: JSON.stringify(formData),
        });
      
        const data = await res.json();
        console.log("Response:", data);
      
        navigate("/list-schedule");
      };

    return (
        <div className='formContainer'>
            <NavBar/>

            <h1 className='formH1'>Add Event</h1>

            <form className='mealForm' onSubmit={handleSubmit}>

                <div>
                <select className='formSelect'
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            >
            <option value="">Select Event Type</option>
            <option value="DOCTOR">Doctor</option>
            <option value="PRACTICE">Practice</option>
            <option value="MEETING">Meeting</option>
            <option value="DANCE">Dance</option>
            <option value="OTHER">Other</option>
            </select>
                </div>

    
            
            <div>
            <select className='formSelect'
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            >
            <option value="">Select Event Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
            </select>
            </div>
        
            <label htmlFor="Date">Date & Time</label>
            <input type='datetime-local' className='formTextArea'
            name='date'
            value={formData.date}
            onChange={handleChange}
            required
            />
            

            <div>
            <label htmlFor="Reason">Reason for Visit</label>
            <textarea className='formTextArea'
            name='reason'
            value={formData.reason}
            onChange={handleChange}
            placeholder='Type here'
            required
            />
            </div>

           



            <button className='formBtn'type='submit'>Save</button>
            </form>
        </div>
    );
};

export default InputSchedule;