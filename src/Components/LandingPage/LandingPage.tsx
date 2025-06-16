import React, { useEffect, useState } from "react";
import BusLogo from "../../assets/SGN_09_08_2022_1662626364399-removebg-preview.png";
import "./LandingPage.css";
import hero_img from "../../assets/Download-Dark-Wallpapers-HD.png";
import { Link } from "react-router-dom";
import bussiness_seller from "../../assets/young-guy-sitting-front-laptop-man-work-computer-freelancer_839035-119921-removebg-preview.png";
import Marquee from "react-fast-marquee";
import star from "../../assets/download.png";
import { easeIn, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import personalInfo from "../../assets/personal-infothumb-2653662e.png";
// import { Typewriter } from "react-simple-typewriter";
import Data from "../../assets/data.jpg";
import Airtime from "../../assets/airtime.svg";
import cash from "../../assets/airtime2cash.jpg";
import cable from "../../assets/cable.jpg";
import exam from "../../assets/resultchecker.png";
import electricity from "../../assets/utility.jpg";
import contact_img from "../../assets/project-need-dee85a1f.png";
import mtn from "../../assets/mtn.jfif";
import airtel from "../../assets/80-806745_airtel-data-plan-airtel-logo-new.png";
import glo from "../../assets/OIP.jfif";
import nimobile from "../../assets/R.jfif";
import axios from "axios";
import animationV from '../../assets/dark_blue_bg_3.mp4';

interface plan {
  d_id: number;
  name: string;
  data_type: string;
  network_name: string;
  validity: string;
  user: string;
  reseller: string;
  api: string;
}
const LandinpPage: React.FC = () => {
  const [plans, setPlans] = useState<plan[]>([]);
  const [airtelPlan, setAirtelPlan] = useState<plan[]>([]);
  const [gloPlan, setGloPlans] = useState<plan[]>([]);
  const [mobile, setMobile] = useState<plan[]>([]);
  const [ref1, view1] = useInView({ threshold: 1, triggerOnce: false });
  const [ref2, view2] = useInView({ threshold: 1, triggerOnce: false });
  const [ref3, view3] = useInView({ threshold: 1, triggerOnce: true });
  const [ref4, view4] = useInView({ threshold: 1, triggerOnce: false });
  const [ref5, view5] = useInView({ threshold: 1, triggerOnce: false });
  const [ref6, view6] = useInView({ threshold: 1, triggerOnce: true });
  const [ref7, view7] = useInView({ threshold: 1, triggerOnce: true });
  const [ref8, view8] = useInView({ threshold: 1, triggerOnce: true });
  const [ref9, view9] = useInView({ threshold: 1, triggerOnce: true });
  const [ref10, view10] = useInView({ threshold: 1, triggerOnce: false});
  const [ref11, view11] = useInView({triggerOnce: false, threshold: 1});
  const [ref12, view12] = useInView({ threshold: 1, triggerOnce: false});
  const [ref13, view13] = useInView({ threshold: 1, triggerOnce: false});

  useEffect(() => {
    const fetchDataPlans = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/data/plan",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setPlans(response.data.mtn);
          setAirtelPlan(response.data.airtel);
          setGloPlans(response.data.glo);
          setMobile(response.data.mobile);
        }
      } catch (err: any) {
        console.error("Faild To Fetch Data Plans", err.message);
      }
    };
    fetchDataPlans();
  }, [plans]);
  return (
    <>
      <nav>
        <div className="Brand">
          <img src={BusLogo} alt="Bussiness Logo" className="BrandLogo" />
          <h2 className="text-white fontBrand">BankyConnect</h2>
        </div>
      </nav>
      <div>
        {/* <img src={hero_img} alt="Hero himage" className="heroBgImg" /> */}
        <video
        autoPlay loop muted playsInline className="">
          <source src={animationV} type="video/mp4" />
        </video>
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
              <p className="heroBrandName">BankyConnect</p>
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
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: "easeIn" }}
                animate={{ opacity: view1 ? 1 : 0, y: view1 ? 0 : -20 }}
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
              initial={{ opacity: 0, scale: 0 }}
              animate={{ scale: view3 ? 1 : 0, opacity: view3 ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              src={personalInfo}
              alt="Personal info"
              className="personalInfoImg mb-4"
            />
            <div>
              <motion.h3
                className="pt-3 pb-3 fs-1"
                ref={ref4}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: view4 ? 1 : 0, y: view4 ? 0 : 50 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
              >
                Information About Us
              </motion.h3>
              <motion.p
                ref={ref5}
                initial={{ opacity: 0, y: 50 }}
                animate={view5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="cater_text"
              >
                We cater to rapidly growing base resel customers by providing a
                wide range of transmission services across categoried such as
                noble Data, cable subscriptions, electricity payment,
                airtime(VTU), mobile phone, and more. Our services are tailored
                to deliver maximum convinence and satisfaction throughout the
                resale process. This incluse features like affordable pricing ,
                automation, reliability and dedicated customer support. As out
                website continue to grow, we will keep espanding out offerings
                making then even more diverse, user-friendly and accesible. Join
                us today and experience the growing advantage we have to offer
              </motion.p>
              <div className="gid-about-P">
                <motion.div
                  className=" mail-container"
                  ref={ref7}
                  initial={{ scale: 0 }}
                  animate={view7 ? { scale: 1 } : ""}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
                  <h5>Email</h5>
                  <p>
                    <a href="mailto:bankoleazeezb98@gmail.com">
                      Bankoleazeezb98@gmail.com
                    </a>
                  </p>
                </motion.div>
                <motion.div
                  className={` mail-container`}
                  ref={ref6}
                  initial={{ scale: 0 }}
                  animate={view6 ? { scale: 1 } : ""}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
                  <h5>Phone</h5>
                  <p>+(234) 906 132 4918</p>
                </motion.div>
                <motion.div
                  className=" mail-container"
                  ref={ref8}
                  initial={{ scale: 0 }}
                  animate={view8 ? { scale: 1 } : ""}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
                  <h5>Address</h5>
                  <p>Iragbiji, Osun State</p>
                </motion.div>
                <motion.div
                  className=" mail-container"
                  ref={ref9}
                  initial={{ scale: 0 }}
                  animate={view9 ? { scale: 1 } : ""}
                  transition={{ duration: 1, ease: "easeIn" }}
                >
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
        <div className="marquee-customers">
          <Marquee speed={60} gradient={false}>
            <h5 className="marquee-customer-head">
              1020 + Satisfied Clients <img src={star} alt="star" /> 80 + Team
              Member <img src={star} alt="star" />
              Customer Support 100% <img src={star} alt="star" />
              100% Reliable services <img src={star} alt="star" />
              Security Asured <img src={star} alt="star" />
            </h5>
          </Marquee>
        </div>
        <div className="offer-sec">
          <div className="bg-black servicess">
            <span className="line1"></span>
            <h3 className="line_text">Our Services</h3>
            <span className="line2"></span>
          </div>
          <h2 className="bg-black text-center pt-4 pb-3">
            Look At What We Offer
          </h2>
          <div className="grid-thumbnail">
            <div className="thumbnail-image">
              <img src={Data} alt="Data" />
              <h3 className="service-title">Data Bundle</h3>
              <h4 className="pt-2 ps-1 pe-1">
                Start enjoying this very low rates Data plan for your internet
                browsing databundle.
              </h4>
            </div>
            <div className="thumbnail-image">
              <img src={Airtime} alt="Data" />
              <h3 className="service-title">Airtime Top-Up</h3>
              <h4 className="pt-2 ps-1 pe-1">
                Start enjoying super low rates on airtime for all your calls and
                top-ups!
              </h4>
            </div>
            <div className="thumbnail-image">
              <img src={cash} alt="Data" />
              <h3 className="service-title">Airtime To Cash</h3>
              <h4 className="pt-2 ps-1 pe-1">
                Exchange airtime for cash with ease — secure and instant payouts
                guaranteed.
              </h4>
            </div>
            <div className="thumbnail-image">
              <img src={electricity} alt="Data" />
              <h3 className="service-title">Electricity Bill Payment</h3>
              <h4 className="pt-2 ps-1 pe-1">
                Never miss a light again! Pay your electricity bills anytime,
                anywhere!
              </h4>
            </div>
            <div className="thumbnail-image">
              <img src={cable} alt="Data" />
              <h3 className="service-title">Cable Tv Subscription</h3>
              <h4 className="pt-2 ps-1 pe-1">
                Renew your cable TV subscription instantly — no delays, no
                hassle!
              </h4>
            </div>
            <div className="thumbnail-image">
              <img src={exam} alt="Data" />
              <h3 className="service-title">Result Checker Card</h3>
              <h4 className="pt-2 ps-1 pe-1">
                Get your WAEC, NECO, or JAMB exam card in minutes — no long
                wait!
              </h4>
            </div>
          </div>
          <div className="circle-click">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <div>
              <h5>
                <i className="bi bi-arrow-right circle-arrow"></i>
              </h5>{" "}
              <br />
              <h4 className="circle-text">Click To Login</h4>
            </div>
          </div>
        </div>
        <div className="bg-dark">
          <div className="need_help">
            <div>
              <motion.div className="contact-for-service"
              ref={ref10} initial={{opacity: 0, y: 100}} animate={view10? {opacity: 1, y: 0} : {opacity: 0, y: 100}} transition={{duration: 1, ease: easeIn, }}>
                <span className="me-2"></span>
                <h4>Need A Sercive ?</h4>
              </motion.div>
              <motion.h3 className="need-a-service"
              ref={ref11} initial={{opacity: 0, y: -100}} animate={view11? {opacity: 1, y: 0} : {opacity: 0, y: -100}} transition={{duration: 1, ease: easeIn, }}>
                Let's work together. fixed a meeting
              </motion.h3>

              <div className="contact-div">
                <h3>
                  <i className="bi bi-envelope-at envelope-bg"></i>
                </h3>
                <div>
                  <h3 className="email-c">Email</h3>
                  <h4>
                    <a
                      className="email-c-a"
                      href="mailto:Bankoleazeezb@gmail.com"
                    >
                      Bankoleazeezb@gmail.com
                    </a>
                  </h4>
                </div>
              </div>
              <div className="contact-div">
                <h3>
                  <i className="bi bi-geo-alt envelope-bg"></i>
                </h3>
                <div>
                  <h3 className="email-c">Location</h3>
                  <h4>Iragbiji, Osun State, Nigeria.</h4>
                </div>
              </div>
            </div>
            <img src={contact_img} alt="need help" className="contact-image" />
          </div>
        </div>
        <div className="planSection">
          <div>
          <motion.div className="plans servicess"
          ref={ref12} initial={{opacity: 0, y: -100}} animate={view12? {opacity: 1, y: 0} : {opacity: 0, y: -100}} transition={{duration: 1, ease: easeIn}}>
            <span className="line1"></span>
            <h4 className="line_text">Our Data Price List</h4>
            <span className="line2"></span>
          </motion.div>
          </div>
          <motion.h3 className="need-a-service"
          ref={ref13} initial={{opacity: 0, y: -100}} animate={view13? {opacity: 1, y: 0} : {opacity: 0, y: -100}} transition={{duration: 1, ease: easeIn, delay: 1}}>
            Our Special Price For Your Bussiness Development
          </motion.h3>

          <div className="plansPP">
            <div className="grid-plans self">
              <div className="www">
                <div className="plan-color">
                  <img src={mtn} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">MTN PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {plans.map((air) => (
                      <tbody>
                        <tr key={air.d_id} className="tablehead">
                          <td>{air.network_name}</td>
                          <td>{air.name}</td>
                          <td>{air.data_type}</td>
                          <td>{air.user}</td>
                          <td>{air.reseller}</td>
                          <td>{air.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <div className="glo-color">
                  <img src={glo} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">GLO PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {gloPlan.map((plan) => (
                      <tbody>
                        <tr key={plan.d_id} className="tablehead">
                          <td>{plan.network_name}</td>
                          <td>{plan.name}</td>
                          <td>{plan.data_type}</td>
                          <td>{plan.user}</td>
                          <td>{plan.reseller}</td>
                          <td>{plan.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>

              <div>
                <div className="airtel-color">
                  <img src={airtel} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">AIRTEL PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {airtelPlan.map((plan) => (
                      <tbody>
                        <tr key={plan.d_id} className="tablehead">
                          <td>{plan.network_name}</td>
                          <td>{plan.name}</td>
                          <td>{plan.data_type}</td>
                          <td>{plan.user}</td>
                          <td>{plan.reseller}</td>
                          <td>{plan.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <div className="mobile-color">
                  <img src={nimobile} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">9MOBILE PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {mobile.map((plan) => (
                      <tbody>
                        <tr key={plan.d_id} className="tablehead">
                          <td>{plan.network_name}</td>
                          <td>{plan.name}</td>
                          <td>{plan.data_type}</td>
                          <td>{plan.user}</td>
                          <td>{plan.reseller}</td>
                          <td>{plan.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="workProcess-section bg-dark pb-3">
          <div className="workP-line">
            <span className="workpLine me-2"></span>
            <h4 className="line_text">Working Process</h4>
            <span className="workpLine ms-2"></span>
          </div>
          <div>
            <h3 className="need-a-service">
              Your Dream Website In Just Few Steps
            </h3>
            <div className="grid-workP">
              <div className="workprocess-box">
                <div className="WorkP-content">
                <h3><span className="wproHB me-2"></span>Discovery & Concept</h3>
                <p><span className="wproCont me-2"></span>Understand your business goals, audience, and brand voice</p>
                <p><span className="wproCont me-2"></span>Define project scope, key features, and number of pages</p>
                <p><span className="wproCont me-2"></span>Research industry trends and gather design inspiration</p>
                <p><span className="wproCont me-2"></span>Present moodboards or sample layouts for direction approval</p>
                </div>
                <h1 className="d-fle"><span className="quarter-circle"></span></h1>
              </div>

              <div className="workprocess-box">
                <div className="WorkP-content">
                <h3><span className="wproHB me-2"></span>Design & Wireframing</h3>
                <p><span className="wproCont me-2"></span> Create clean, responsive wireframes to map structure</p>
                <p><span className="wproCont me-2"></span> Design high-fidelity mockups using tools like Figma or Adobe XD</p>
                <p><span className="wproCont me-2"></span>Incorporate your brand identity (colors, typography, logo)</p>
                </div>
                <h1 className="d-fle"><span className="quarter-circle"></span></h1>
              </div>

              <div className="workprocess-box">
                <div className="WorkP-content">
                <h3><span className="wproHB me-2"></span>Build in Code</h3>
                <p><span className="wproCont me-2"></span> Convert design into a fully functional, responsive website</p>
                <p><span className="wproCont me-2"></span>Use hand-code for custom development </p>
                <p><span className="wproCont me-2"></span>Add animations, forms, CMS (blog or dynamic content)</p>
                <p><span className="wproCont me-2"></span>Optimize for SEO, fast load time, and all device sizes</p>
                </div>
                <h1 className="d-fle"><span className="quarter-circle"></span></h1>
              </div>
              
              <div className="workprocess-box">
                <div className="WorkP-content">
                <h3><span className="wproHB me-2"></span>Launch & Handoff</h3>
                <p><span className="wproCont me-2"></span> Connect custom domain and set up hosting</p>
                <p><span className="wproCont me-2"></span> Perform final testing and cross-browser checks</p>
                <p><span className="wproCont me-2"></span>Deliver access, training (video or guide), and support options</p>
                <p><span className="wproCont me-2"></span>Offer ongoing maintenance or future updates if needed</p>
                </div>
                <h1 className="d-fle"><span className="quarter-circle"></span></h1>
              </div>
              
            </div>
          </div>
        </div>
        <div className="partner"> 
          <div className="workP-line mb-5 mt-3">
            <span className="workpLine me-2"></span>
            <h4 className="line_text">Our Partners</h4>
            <span className="workpLine ms-2"></span>
          </div>
          <Marquee speed={30} gradient={false}>
            <img src={mtn} alt="mtn" className="partner-logo" />
            <img src={airtel} alt="airtel" className="partner-logo" />
            <img src={glo} alt="glo" className="partner-logo" />
            <img src={nimobile} alt="nimobile" className="partner-logo" />
            <img src={mtn} alt="mtn" className="partner-logo" />
            <img src={airtel} alt="airtel" className="partner-logo" />
            <img src={glo} alt="glo" className="partner-logo" />
            <img src={nimobile} alt="nimobile" className="partner-logo" />
            <img src={airtel} alt="airtel" className="partner-logo" />
            </Marquee>
        </div>

        <footer>
          <div></div>
        </footer>
      </body>
    </>
  );
};

export default LandinpPage;
