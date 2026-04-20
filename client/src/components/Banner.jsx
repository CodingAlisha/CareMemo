import React from 'react'

// REUSABLE BANNER REQUIRE AUTH

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