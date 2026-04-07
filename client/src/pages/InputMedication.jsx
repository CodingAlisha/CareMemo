import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


const InputMedication = () => {
    const navigate = useNavigate();

    const [formData, setFormData ] = useState ({
        name: '',
        dose: '',
        notes: '',
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
      
        const res = await fetch("/api/medication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });
      
        const data = await res.json();
        console.log("Response:", data);
      
        navigate("/home");
      };

    return (
        <div className='formContainer'>
            <NavBar/>

            <h1 className='formH1'>Add Medication</h1>

            <form className='mealForm' onSubmit={handleSubmit}>

            <label htmlFor="name">Medication Name</label>
            <input className='formInput'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            placeholder='ex: Advil'
            required
            />

            <label htmlFor="Dose">Dose</label>
            <input className='formInput'
            name='dose'
            value={formData.dose || ''}
            onChange={handleChange}
            placeholder='ex: 25mg'
            required
            />


            <label htmlFor="Notes">Notes</label>
            <textarea className='formTextArea'
            name='notes'
            value={formData.notes}
            onChange={handleChange}
            placeholder='1 per day'
            required
            />

            <button className='formBtn'type='submit'>Save</button>
            </form>
        </div>
    );
};

export default InputMedication;