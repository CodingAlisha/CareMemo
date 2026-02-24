
import React from 'react'


const Card = ({tag, img, title, description, imgIcon, subName, subDesc}) => {
  return (
    <div className='main'>
        <div className='container'>
            <div className='wrapper'>
                <div className='cardList'>
                    <div className='card'>
                        <div className='cardImg'>
                            <img src={img} alt='Doctor'></img>
                            <p className='cardTag'>{tag}</p>
                            </div>
                            <div className='cardContent'>
                            <h3 className='cardTitle'>{title}</h3>
                            <p className='cardText'>{description}</p>
                            <div className='cardFooter'>
                                <div className='cardProfile'>
                                    <img src={imgIcon} alt='doctorIcon'></img>
                                    <div className='cardProfileInfo'>
                                    <span className='cardProfileInfoName'>{subName}</span>
                                    <span className='cardProfileInfoDesc'>{subDesc}</span>
                                    </div>
                                    </div>
                                    {/* <a href='#' className='cardButton'>Read More</a> */}
                                    <div className='cardProfileImg'>
                                    
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    </div>
  )
}

export default Card;

