import React from 'react'
import healthBannerTwo from '../assets/healthBannerTwo.jpg';

const MainBanner = () => {
    return (
        <div
            className='landingBanner'
            style={{ backgroundImage: `url(${healthBannerTwo})` }}
        >
            <h1 className='landingBannerContent'>Welcome to CareMemo</h1>
        </div>
    );
}

export default MainBanner;