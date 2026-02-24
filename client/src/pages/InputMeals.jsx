import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const InputMeals = () => {
    const navigate = useNavigate();

    const [formData, setFormData ] = useState ({
        name: '',
        mealType: '',
        directions: '',
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
      
        const res = await fetch("/api/listMeals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        const data = await res.json();
        console.log("Response:", data);
      
        navigate("/list-meals");
      };

    return (
        <div className='formContainer'>
            <h1 className='formH1'>Create Meal</h1>

            <form className='mealForm' onSubmit={handleSubmit}>

            <label htmlFor="Meal Name">Meal Name</label>
            <input className='formInput'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            placeholder='ex: Turkey Sandwich'
            />

            {/* <label htmlFor="Meal Type">Meal Type</label>
            <input className='formInput'
            name='mealType'
            value={formData.mealType || ''}
            onChange={handleChange}
            placeholder='ex: Breakfast'
            /> */}

            <select className='formSelect'
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            >
            <option value="">Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            </select>


            <label htmlFor="Meal Directions">Special Instructions</label>
            <textarea className='formTextArea'
            name='directions'
            value={formData.directions}
            onChange={handleChange}
            placeholder='Toast bread, light butter'
            />

            <button className='formBtn'type='submit'>Save</button>
            </form>
        </div>
    );
};

export default InputMeals;