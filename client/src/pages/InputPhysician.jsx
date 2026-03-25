import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidPhoneNumber } from 'libphonenumber-js';
import MainBanner from '../components/MainBanner';


const InputPhysician = () => {
    const navigate = useNavigate();

    const [ error, setError ] = useState('');
    const [ contact, setContact ] = useState('');

    const [formData, setFormData ] = useState ({
        name: '',
        specialty: '',
        contact: '',
    });

    // const handleChange = (e) => {
    //     setFormData ({
    //         ...formData, 
    //         [e.target.name]: e.target.value,
    //     });
    // };


    const formatPhoneNumber = ( value ) => {
        const digits = value.replace(/\D/g, '')
        if (digits.length <= 3) return digits
        if (digits.length <= 6) return `${digits.slice(0,3)}-${digits.slice(3)}`
        if (digits.length <= 10) return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6,10)}`
        return `${digits.slice(0,1)}-${digits.slice(1,4)}-${digits.slice(4,7)}-${digits.slice(7,11)}`
    }

    const handleChange = (e) => {
        if (e.target.name === 'contact') {
            const formatted = formatPhoneNumber(e.target.value)
            setFormData({ ...formData, contact: formatted })
        } else {
            setFormData ({
                ...formData, 
                [e.target.name]: e.target.value,
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidPhoneNumber(formData.contact)){
           setError('Please enter a valid phone number')
        }
        // console.log("Submitting:", formData);
      
        const res = await fetch("/api/physician", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });
      
        const data = await res.json();
        // console.log("Response:", data);
      
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
            {/* <textarea className='formTextArea' */}
            <input type='tel' className='formTextArea'
            name='contact'
            minLength={10}
            maxLength={15}
            value={formData.contact}
            onChange={handleChange}
            placeholder='ex: 888-888-8888'
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