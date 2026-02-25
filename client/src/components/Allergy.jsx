import React from 'react'





const Card = () => {
  return (
    <>
        <div className='container'>
            <div className='wrapper'>
                <div className='cardList'>
                    <div className='card'>
                        <div className='cardImg'>
                            <img src='src/assets/doctorImg.jpg' alt='Doctor'></img>
                            <p className='cardTag'>Doctors & Specialist</p>
                            </div>
                            <div className='cardContent'>
                            <h3 className='cardTitle'>Doctors</h3>
                            <p className='cardText'>Here is the text for the card info. More details to follow.More providers and names will be added here.</p>
                            <div className='cardFooter'>
                                <div className='cardProfile'>
                                    <img src='src/assets/doctor.jpeg' alt='doctorIcon'></img>
                                    <div className='cardProfileInfo'>
                                    <span className='cardProfileInfoName'>Your Doctor </span>
                                    <span className='cardProfileInfoDesc'>Text Here </span>
                                    </div>
                                    </div>
                                    <a href='#' className='cardButton'>Read More</a>
                                    <div className='cardProfileImg'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </>
  )
}

export default Card;

