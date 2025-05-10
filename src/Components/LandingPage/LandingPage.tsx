import React from "react";
import BusLogo from "../../assets/SGN_09_08_2022_1662626364399-removebg-preview.png";
import "./LandingPage.css";
import hero_img from "../../assets/Download-Dark-Wallpapers-HD.png";
import { Link } from "react-router-dom";
import bussiness_seller from '../../assets/young-guy-sitting-front-laptop-man-work-computer-freelancer_839035-119921-removebg-preview.png';
import Marquee from "react-fast-marquee";
import star from '../../assets/download.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandinpPage: React.FC = () => {
  const [ref1, view1] = useInView({threshold: 1, triggerOnce: false, });
  const [ref2, view2] = useInView({threshold: 1, triggerOnce: false})
  return (
    <>
      <nav>
        <div className="Brand">
          <img src={BusLogo} alt="Bussiness Logo" className="BrandLogo" />
          <h2 className="text-white fontBrand">BankyConnect</h2>
        </div>
      </nav>
      <div>
        <img src={hero_img} alt="Hero himage" className="heroBgImg" />
      </div>
      <body className="body">
        <div className="bodyHero body-element-margin">
          <div>
            <h4 className="availability">
              Currently Available For Virtual Top-Up <br /> Worldwide{" "}
              <i className="bi bi-arrow-up-right"></i>
            </h4>
            <h2>
              Top Up Made Easy With <br />{" "}
              <h2 className="heroBrandName">BankyConnect</h2>
            </h2>

            <div className="login-btn">
              <Link to={"/register"} className="Link">
                <button type="button">
                  <i className="bi bi-lock"></i>Register
                </button>
              </Link>
              <Link to={"/login"} className="Link">
                <button type="button">
                  {" "}
                  <i className="bi bi-key"></i> Login
                </button>
              </Link>
            </div>
          </div>
          <div className="BusSellCont">
            <img
              src={bussiness_seller}
              alt="Data seller"
              className="BussSellerImg"
            />
          </div>
        </div>
        <div className="marquee-offer-con">
        <Marquee speed={60} gradient={false}>
          <h5 className="marquee-offer">Data Bundle <img src={star} alt="star" /> Airtime <img src={star} alt="star" /> 
          Electricity Bill <img src={star} alt="star" /> Exam Pin <img src={star} alt="star" /> Cable Subscription <img src={star} alt="star" />
          Recharge Card Printing <img src={star} alt="star" /> Data Card <img src={star} alt="star" /></h5>
        </Marquee>
        </div>
        <div className="about-section pt-5 bg-dark">
          <div className="text-center">
           <motion.img ref={ref1} initial={{opacity: 0, y: -100}} transition={{duration: 1, ease: 'easeIn'}} animate={{opacity: view1? 1 : 0, y: view1? 0 : -50}} src={star} alt="star" width={40}  />
          <motion.p ref={ref2} className={`animate-start body-element-margin body-font pt-4 pb-5 ${view2? 'anim' : " "}`} >
           My name is Banky, I Providing virtual top-up services including Data Bundles, Airtime, 
          Electricity Tokens, and Cable TV Subscriptions. I'm also building website for client. I operate globally and am ready to deliver both creative and 
            digital solutions wherever you are.</motion.p>
          </div>
        </div>
      </body>
    </>
  );
};

export default LandinpPage;
