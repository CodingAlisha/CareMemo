import React from 'react'
import { useEffect, useState } from 'react'


const MealList = () => {
  const [ meals, setMeals ] = useState([]);

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
       <h1>Favorite Meals</h1>
       {meals.map(meal => (
        // .name is named after the model schema variable name const mealSelection
        <div key= {meal._id}>
          <p>Name: {meal.name}</p>
          <p>Meal: {meal.mealType}</p>
          <p>Special Instructions: {meal.directions}</p>
          </div>
       ))}
    </div>
  );
}

export default MealList;

