import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const InputPhysician = () => {
    const navigate = useNavigate();

    const [formData, setFormData ] = useState ({
        name: '',
        specialty: '',
        contact: '',
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
      
        const res = await fetch("/api/physician", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        const data = await res.json();
        console.log("Response:", data);
      
        navigate("/list-physicians");
      };

    return (
        <div className='formContainer'>
            <h1 className='formH1'>Add Physician</h1>

            <form className='mealForm' onSubmit={handleSubmit}>

            <label htmlFor="name">Physician Name</label>
            <input className='formInput'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            placeholder='ex: Dr. Johnson'
            />

            <label htmlFor="Specialty">Specialty</label>
            <input className='formInput'
            name='specialty'
            value={formData.specialty || ''}
            onChange={handleChange}
            placeholder='ex: Primary'
            />


            <label htmlFor="Contact">Contact Number</label>
            <textarea className='formTextArea'
            name='contact'
            value={formData.contact}
            onChange={handleChange}
            placeholder=''
            />

            <button className='formBtn'type='submit'>Save</button>
            </form>
        </div>
    );
};

export default InputPhysician;