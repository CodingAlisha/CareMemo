
import React from 'react'



const MasterCard = ({img, title, description}) => {
  return (
    <div className='masterBox'>
      <img src={freshMeals} alt=''></img>
      <div className='descriptionBox'>
        <h2 className='h2Box'>Test</h2>
        <p className='tagBox'>Tag<span className='spanBox'>Title</span></p>
        <p className='paraBox'>description</p>
        <button className='btnBox'>Read More</button>

      </div>

    </div>
  )
}

export default MasterCard;

