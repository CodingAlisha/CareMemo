import React from 'react'
// import healthBannerTwo from '../assets/healthBannerTwo.jpg';

import HealthBannerCM from '../assets/HealthBannerCM.jpeg';

// LANDING BANNER NO AUTH REQ.

const MainBanner = () => {
    return (
        <div
            className='landingBanner'
            style={{ backgroundImage: `url(${HealthBannerCM})` }}
        >
            <h1 className='landingBannerContent'>Welcome to CareMemo</h1>
        </div>
    );
}

export default MainBanner;