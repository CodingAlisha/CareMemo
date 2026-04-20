import React from 'react'
import Card from '../components/Card';

// import photos
import organize from '../assets/organize.jpeg';
import personalize from '../assets/personalize.jpg';
// import physicians from '../assets/physicians.jpg';
import groupPhysicians from '../assets/groupPhysicians.jpg';
import schedule from '../assets/schedule.jpg';
import MainBanner from '../components/MainBanner';
import NavBarMain from '../components/NavBarMain';



const Landing = () => {
  
  const mainData = [
    {
    tag: 'Organize',
    img: organize, 
    title: 'Organize Plan',
    imgIcon: schedule,
    description: 'Stay organized with all your important appointments, special events, and more in one convenient location. Eliminate uncertainty and trust our platform to keep you on track. Our goal is to help you manage your essential tasks with ease and flexibility.',
    route: '/list-schedule'
    },
    {
    tag: 'Personalize',
    img: personalize, 
    title: 'Personalize Plan',
    imgIcon: schedule,
    description: 'Develop a personalized plan that effectively addresses the unique needs of your loved one. Dedicated to helping you customize what matters most to them. Personalize meals, medications, and additional services that support every essential part of their care.',
    route: '/list-meals'
    },
    {
    tag: 'Manage',
    img: groupPhysicians, 
    title: 'Manage Physicians',
    imgIcon: schedule,
    description: 'Your health information, all in one place. Through your personalized account page, you can easily manage and update your primary care provider as well as any specialist information, no online search or paperwork required. Our platform puts you in full control.',
    route: '/list-physicians'
        }
]


return (
  <div>
    <NavBarMain />
    
    <MainBanner />
   
    <div className='landingPara'>
      <h1 className='landingH1'><strong>Why Choose CareMemo?</strong></h1>
      <p className='landingInfo'>CareMemo is one place for managing your loved one's care plan. Share updates, track progress, and keep every caregiver and family member on the same page...so you can focus on less coordinating and more on who matters most! From medication schedules and doctor appointments to daily notes and care milestones, CareMemo keeps everything organized in one secure place, No more scattered spreadsheets, or endless group texts. Just clear connected care for the people who matter most.When it comes to caring for someone you love, you deserve a platform built with the same dedication. CareMemo is the trusted choice for families who want simplicity, clarity, and peace of mind all in one place. Get started today! </p>
    </div>

    <span className='cardSpan'>
  {mainData.map((card, index) => (
  
      <Card 
      key={index}
      tag={card.tag}
      img={card.img}
      title={card.title}
      description={card.description}
      imgIcon={card.imgIcon}
      route={card.route}
      />
      
    ))}
    </span>

    <div className='extraContainer'>
      <ul className='ulInfo'>
        <h2 className='landingExtra'>CO-PARENTING?</h2>
        <h3 className='landingInfo'>Plan Hassle Free</h3>
        <li className='extraInfo'>Medical Alerts</li>
        <li className='extraInfo'>Shared Meal Planning</li>
        <li className='extraInfo'>Communication Updates</li>
      </ul>
    
      <ul className='ulInfo'>
        <h2 className='landingExtra'>ELDERLY PARENT?</h2>
        <h3 className='landingInfo'>Organize Specialty Care</h3>
        <li className='extraInfo'>Meal Plan Together</li>
        <li className='extraInfo'>List Medical Doctors</li>
        <li className='extraInfo'>Plan Scheduled Visits</li>
      </ul>
    
      <ul className='ulInfo'>
        <h2 className='landingExtra'>NANNY CARE?</h2>
        <h3 className='landingInfo'>Ensure Quality Care</h3>
        <li className='extraInfo'>Meal Preparation</li>
        <li className='extraInfo'>Health Awareness</li>
        <li className='extraInfo'>Activity Planning</li>
        
      </ul>
    </div>

    </div>
  )
  }


export default Landing


