import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MainBanner from '../components/MainBanner';
import Banner from '../components/Banner';
import freshMeals from '../assets/freshMeals.jpeg';
import DeleteButton from '../components/DeleteButton';


const MealList = () => {
  const [ meals, setMeals ] = useState([]);

  const handleDelete = (id) => {
    setMeals((prev) => prev.filter((meal) => meal._id !== id));
  };

  useEffect(( ) => {
    // fetch('http://localhost:3001/api/listMeals')
    fetch ('/api/listMeals')
    .then(res => res.json ())
    .then(data => {
      console.log("DATA FROM API:", data);
      setMeals(data);
    })
    .catch(err => console.error("ERROR:", err));


  }, []);
  
  return (
    <div>
      
       <h1 className='mealH1'>Favorite Meals</h1>

       {/* <MainBanner /> */}
       <Banner img={freshMeals} title={'Personalize Meals'}/>

       <Link to='/add-meals' className='nav-link'>Add New Meal</Link>
       
       <span className='cardSpan'>
       {meals.map(meal => (
        // .name is named after the model schema variable name const mealSelection
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

