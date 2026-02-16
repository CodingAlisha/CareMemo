// the is a copy of the Landing page

import React from "react";
import Card from '../components/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import organize from '../assets/organize.jpeg';
import personalize from '../assets/personalize.jpg';
import physicians from '../assets/physicians.jpg';
import schedule from '../assets/schedule.jpg';

const Slider = () => {

    const mainData = [
        {
        tag: 'Organize',
        img: organize, 
        title: 'Organize Plan',
        imgIcon: schedule,
        description: 'organize description here',
        },
        {
        tag: 'Personalize',
        img: personalize, 
        title: 'Personalize Plan',
        imgIcon: schedule,
        description: 'Personalize description here',
        },
        {
        tag: 'Manage',
        img: physicians, 
        title: 'Manage Physicians',
        imgIcon: schedule,
        description: 'Manage physicians description here',
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

export default Slider
