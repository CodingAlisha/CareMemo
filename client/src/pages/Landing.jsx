import React from 'react'
import Card from '../components/Card';

// import photos
import organize from '../assets/organize.jpeg';
import personalize from '../assets/personalize.jpg';
import physicians from '../assets/physicians.jpg';
import schedule from '../assets/schedule.jpg';

const Landing = () => {
  
  const mainData = [
    {
    tag: 'Organize',
    img: organize, 
    title: 'Organize Plan',
    imgIcon: schedule,
    description: 'Stay organized with all your important appointments, special events, and more in one convenient location. Eliminate uncertainty and trust our organization to keep you on track. Our goal is to help you manage your essential tasks with ease and flexibility.',
    },
    {
    tag: 'Personalize',
    img: personalize, 
    title: 'Personalize Plan',
    imgIcon: schedule,
    description: 'Develop a personalized plan that effectively addresses the unique needs of your loved one. We are dedicated to helping you customize what matters most to them. You can personalize tailored meals, medications, and additional services that support every essential part of their care.',
    },
    {
    tag: 'Manage',
    img: organize, 
    title: 'Manage Physicians',
    imgIcon: schedule,
    description: 'Your health information, all in one place. Through your personalized account page, you can easily manage and update your primary care provider as well as any specialist information, no phone calls or paperwork required. Whether you are adding a new specialist, switching your primary, or simply reviewing your current provider, our platform puts you in full control.',
        }
]


return (
<div>
{mainData.map((card, index) => (

    <Card 
    key={index}
    tag={card.tag}
    img={card.img}
    title={card.title}
    description={card.description}
    imgIcon={card.imgIcon}
    />
    
  ))}
  </div>
)
}


export default Landing
