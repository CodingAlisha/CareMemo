import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const InputMedical = () => {
    const navigate = useNavigate();

    const [formData, setFormData ] = useState ({
        name: '',
        allergy: '',
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
      
        const res = await fetch("/api/medicalAlert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        const data = await res.json();
        console.log("Response:", data);
      
        navigate("/home");
      };

    return (
        <div className='formContainer'>
            <h1 className='formH1'>Add Medical Alert</h1>

            <form className='mealForm' onSubmit={handleSubmit}>

            <label htmlFor="name">Medical Alert Name</label>
            <input className='formInput'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='ex: Sever Asthma'
            required
            />

            <label htmlFor="Allergy">Allergy</label>
            <input className='formInput'
            name='allergy'
            value={formData.allergy || ''}
            onChange={handleChange}
            placeholder='ex: Peanuts'
            required
            />


            <label htmlFor="Notes">Notes</label>
            <textarea className='formTextArea'
            name='notes'
            value={formData.notes}
            onChange={handleChange}
            placeholder='Add special notes here'
            required
            />

            <button className='formBtn'type='submit'>Save</button>
            </form>
        </div>
    );
};

export default InputMedical;