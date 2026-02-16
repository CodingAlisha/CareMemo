import React from 'react'
import Card from '../components/Card';
import doctorImg from '../assets/doctorImg.jpg';
import doctor from '../assets/doctor.jpeg';
import planner from '../assets/planner.jpeg';
import schedule from '../assets/schedule.jpg';
import freshMeals from '../assets/freshMeals.jpeg';
import foodIcon from '../assets/foodIcon.png';
import foodHeartIcon from '../assets/foodHeartIcon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';


const Home = () => {

  const mainCards = [

    {
      tag: 'Upcoming Appointments',
      img: planner,
      title: 'Schedule',
      description: 'Here is the text for description in the schedule card',
      imgIcon: schedule,
      subName: 'Appointments',
      subDesc: 'Text Here'
    },
    {
      tag: 'Meals & Snacks',
      img: freshMeals,
      title: 'Favorite Meals',
      description: 'Here is the text for description in the food card',
      imgIcon: foodHeartIcon,
      subName: 'Meals',
      subDesc: 'Text Here'
    },
    {
      tag: 'Doctors & Specialist',
      img: doctorImg,
      title: 'Doctors',
      description: 'Here is the text for description in the doctor card',
      imgIcon: doctor,
      subName: 'Your Doctor',
      subDesc: 'Text Here'
    }
  ]
 
return (
  <div>
    <h1 className='heading'>Welcome, Customize a Care Plan</h1>

    
     {mainCards.map((card, index) => (
   
    <Card 
    key={index}
    tag={card.tag}
    img={card.img}
    title={card.title}
    description={card.description}
    imgIcon={card.imgIcon}
    subName={card.subName}
    subDesc={card.subDesc}
    />
    
  ))}
  </div>
)
}

export default Home;