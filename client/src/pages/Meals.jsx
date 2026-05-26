import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import freshMeals from '../assets/freshMeals.jpeg';
import DeleteButton from '../components/DeleteButton';
import NavBar from '../components/NavBar';


const MealList = () => {
  const [ meals, setMeals ] = useState([]);
  const [ filter, setFilter ] = useState('ALL');

  const handleDelete = (id) => {
    setMeals((prev) => prev.filter((meal) => meal._id !== id));
  };
  const filteredMeals = meals.filter ((meal) => {
    if (filter === 'ALL') return true;
    return meal.mealType === filter;
  });

  useEffect(( ) => {
   
    fetch (`${import.meta.env.VITE_API_URL}/api/listMeals`, {
      credentials: 'include'
    })
    .then(res => res.json ())
    .then(data => {
  
      setMeals(data);
    })
    .catch(err => console.error("ERROR:", err));


  }, []);
  
  return (
    <div>
      <NavBar/>
      
       <h1 className='mealH1'>Favorite Meals</h1>

       
       <Banner img={freshMeals} title={'Personalize Meals'}/>

       <Link to='/add-meals' className='nav-link'>Add New Meal</Link>

       <div>
        <select className='mealSelect' onChange={(e) => setFilter (e.target.value)}>
          <option value= 'ALL'>ALL MEALS</option>
          <option value= 'BREAKFAST'>BREAKFAST</option>
          <option value= 'LUNCH'>LUNCH</option>
          <option value= 'DINNER'>DINNER</option>
          <option value= 'SNACK'>SNACK</option>
          </select>
       </div>
       
       <span className='cardSpan'>
       {filteredMeals.map(meal => (
        
        <div className='mealContainer' key= {meal._id}>
          <p className='mealName'>{meal.name}</p>
          <p className='mealMeal'>{meal.mealType}</p>
          <p className='mealInstructions'>Special Instructions: {meal.directions}</p>
          <DeleteButton endpoint='deleteMeals' id={meal._id} onDelete={handleDelete} />
          </div>
       ))}
       </span>
    </div>
  );
}

export default MealList;

