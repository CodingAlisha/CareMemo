import React from 'react'



const Banner = ({img, title}) => {
    return (
        <div
            className='landingBanner'
            style={{ backgroundImage: `url(${img})` }}
        >
            <h1 className='landingBannerContent'>{title}</h1>
        </div>
    );
}

export default Banner;