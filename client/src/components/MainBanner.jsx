import React from 'react'
// import healthBannerTwo from '../assets/healthBannerTwo.jpg';

import healthBannerCM from '../assets/healthBannerCM.jpeg';

// LANDING BANNER NO AUTH REQ.

const MainBanner = () => {
    return (
        <div
            className='landingBanner'
            style={{ backgroundImage: `url(${healthBannerCM})` }}
        >
            <h1 className='landingBannerContent'>Welcome to CareMemo</h1>
        </div>
    );
}

export default MainBanner;