import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainBanner from '../components/MainBanner';


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

    //   const digits = value.replace(/\D/g, '').slice(0, 10); {
    //     if (digits.length <=3) return digits;
    //   if (digits.length <=6) return `${digits.slice(0,3)}--${digits.slice(3)}`;
    //   return 
    //     `${digits.slice(0,3)}--${digits.slice(3,6)}--${digits.slice(6)}`;
      
    //   };
      

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
            required
            />

            <label htmlFor="Specialty">Specialty</label>
            <input className='formInput'
            name='specialty'
            value={formData.specialty || ''}
            onChange={handleChange}
            placeholder='ex: Primary'
            required
            />


            <label htmlFor="Contact">Contact Number</label>
            <textarea className='formTextArea'
            name='contact'
            value={formData.contact}
            onChange={handleChange}
            placeholder=''
            required
            />

            {/* <label htmlFor="Contact">Contact Number</label>
            <input className='formTextArea'
            name='contact'
            value={formData.contact}
            onChange={handleChange}
            placeholder='555-123-4567'
            maxLength={10}
            required
            /> */}

            <button className='formBtn'type='submit'>Save</button>
            </form>
        </div>
    );
};

export default InputPhysician;