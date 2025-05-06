import React from "react";
import BusLogo from '../../assets/SGN_09_08_2022_1662626364399-removebg-preview.png';
import './LandingPage.css';
import hero_img from '../../assets/vtu_hero_back.jpg';

const LandinpPage: React.FC = () => {
    return (
        <>
        <nav>
            <div className="Brand">
                <img src={BusLogo} alt="Bussiness Logo" className="BrandLogo"/>
                <h2 className="text-white fontBrand">BankyConnect</h2>
            </div>
        </nav>
        <div>
            <img src={hero_img} alt="Hero himage" className="heroBgImg" />
        </div>
        <body className="body">
            <h4 className="availability">Currently Available For Virtual Top-Up <br /> Worldwide   <i className="bi bi-arrow-up-right"></i></h4>
            <h2>Top Up Made Easy With <br /> <h2 className="heroBrandName">BankyConnect</h2></h2>
        </body>
        </>
    )
}

export default LandinpPage;