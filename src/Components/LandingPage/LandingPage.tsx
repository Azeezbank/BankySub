import React from "react";
import BusLogo from "../../assets/SGN_09_08_2022_1662626364399-removebg-preview.png";
import "./LandingPage.css";
import hero_img from "../../assets/Download-Dark-Wallpapers-HD.png";
import { Link } from "react-router-dom";
import bussiness_seller from "../../assets/young-guy-sitting-front-laptop-man-work-computer-freelancer_839035-119921-removebg-preview.png";
import Marquee from "react-fast-marquee";
import star from "../../assets/download.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import personalInfo from "../../assets/personal-infothumb-2653662e.png";
import { Typewriter } from "react-simple-typewriter";

const LandinpPage: React.FC = () => {
  const [ref1, view1] = useInView({ threshold: 1, triggerOnce: false });
  const [ref2, view2] = useInView({ threshold: 1, triggerOnce: false });
  const [ref3, view3] = useInView({ threshold: 1, triggerOnce: true });
  const [ref4, view4] = useInView({ threshold: 1, triggerOnce: false });
  const [ref5, view5] = useInView({ threshold: 1, triggerOnce: false });
  const [ref6, view6] = useInView({ threshold: 1, triggerOnce: true });
  const [ref7, view7] = useInView({ threshold: 1, triggerOnce: true });
  const [ref8, view8] = useInView({ threshold: 1, triggerOnce: true });
  const [ref9, view9] = useInView({ threshold: 1, triggerOnce: true });
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
            <h5 className="marquee-offer">
              Data Bundle <img src={star} alt="star" /> Airtime{" "}
              <img src={star} alt="star" />
              Electricity Bill <img src={star} alt="star" /> Exam Pin{" "}
              <img src={star} alt="star" /> Cable Subscription{" "}
              <img src={star} alt="star" />
              Recharge Card Printing <img src={star} alt="star" /> Data Card{" "}
              <img src={star} alt="star" />
            </h5>
          </Marquee>
        </div>
        <div className="bg-black ps-4 pe-4 pb-4">
        <div className="about-section pt-5 pb-5">
          <div className="text-center">
            <motion.img
              ref={ref1}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 1, ease: "easeIn" }}
              animate={{ opacity: view1 ? 1 : 0, y: view1 ? 0 : -50 }}
              src={star}
              alt="star"
              width={40}
            />
            <motion.p
              ref={ref2}
              className={`animate-start body-element-margin body-font pt-4 pb-2 ${
                view2 ? "anim" : " "
              }`}
            >
              My name is Banky, I Providing virtual top-up services including
              Data Bundles, Airtime, Electricity Tokens, and Cable TV
              Subscriptions. I'm also building website for client. I operate
              globally and am ready to deliver both creative and digital
              solutions wherever you are.
            </motion.p>
          </div>
          
        </div>
        <div className="personalInfoSec bg-dark p-5 mb-5">
            <motion.img
            ref={ref3}
            initial={{opacity: 0, scale: 0}} animate={{scale: view3? 1 : 0, opacity: view3? 1 : 0}} transition={{duration: 1, ease: 'easeInOut'}}
              src={personalInfo}
              alt="Personal info"
              className="personalInfoImg mb-4"
            />
            <div>
            <motion.h3 className="pt-3 pb-3 fs-1" ref={ref4} initial={{opacity: 0, y: 50}} animate={{opacity: view4? 1 : 0, y: view4? 0 : 50}} transition={{duration: 0.5, ease: 'easeIn'}}>Information About Us</motion.h3>
            <motion.p  ref={ref5} initial={{opacity: 0}} animate={{opacity: view5? 1 : 0}} transition={{duration: 1, ease: 'easeIn'}}>
            <Typewriter
            words={['We cater to rapidly growing base resel customers by providing a wide range of transmission services across categoried such as noble Data, cable subscriptions, electricity payment, airtime(VTU), mobile phone, and more. Our services are tailored to deliver maximum convinence ans satisfaction throughout the resale process. This incluse features like affordable pricing , automation, reliability and dedicated customer support. As out website continue to grow, we will keep espanding out offerings making then even more diverse, user-friendly and accesible. Join us today and experience the growing advantage we have to offer.']}
            loop={Infinity}
            cursor
            typeSpeed={10}
            deleteSpeed={2}

            />
            </motion.p>
            <div className="gid-about-P">
            <motion.div className=" mail-container" ref={ref7} initial={{scale: 0}} animate={view7? {scale: 1} : ''} transition={{duration: 1, ease: 'easeIn'}}>
              <h5>Email</h5>
              <p><a href="mailto:bankoleazeezb98@gmail.com">Bankoleazeezb98@gmail.com</a></p>
            </motion.div>
            <motion.div className={` mail-container`} ref={ref6} initial={{scale: 0}} animate={view6? {scale: 1} : ''} transition={{duration: 1, ease: 'easeIn'}} >
              <h5>Phone</h5>
              <p>+(234) 906 132 4918</p>
            </motion.div>
            <motion.div className=" mail-container" ref={ref8} initial={{scale: 0}} animate={view8? {scale: 1} : ''} transition={{duration: 1, ease: 'easeIn'}}>
              <h5>Address</h5>
              <p>Iragbiji, Osun State</p>
            </motion.div>
            <motion.div className=" mail-container" ref={ref9} initial={{scale: 0}} animate={view9? {scale: 1} : ''} transition={{duration: 1, ease: 'easeIn'}}>
              <h5>Follow</h5>
              <div className="d-flex">
                <i className="bi bi-linkedin fs-4 m-2"></i>
                <i className="bi bi-whatsapp fs-4 m-2"></i>
                <i className="bi bi-facebook fs-4 m-2"></i>
                <i className="bi bi-twitter fs-4 m-2"></i>
                <i className="bi bi-telegram fs-4 m-2"></i>
              </div>
            </motion.div>
            </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default LandinpPage;
