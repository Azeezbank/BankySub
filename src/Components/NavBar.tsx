import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
    sideBarClickHandler: () => void;
};

const NavBar:React.FC<Props> = ({sideBarClickHandler}) => {
    const [isLogout, setIsLogOut] = useState(false);
    const navigate = useNavigate();
    
      const handleLogout = () => {
        setIsLogOut(!isLogout);
      };

      //Log out
  const handleLogOutUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bankysub-api.onrender.com/logout', {}, {withCredentials: true});
      if (response.status === 200) {
        navigate('/login?');
      }
    } catch (err: any) {
      console.error('Failed to logout');
    };
  };
    return (
        <>
                    <nav>
              <div className="navbar">
                <div className="nav-menu" onClick={sideBarClickHandler}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>Welcome</div>
                <div className="handburger" onClick={handleLogout}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </nav>
            <div className= {`logoutV ${isLogout ? "visible" : "hidden"} logout`} onClick={handleLogOutUser}>
              <h5 className="me-4"><i className="bi bi-search"></i></h5>
              <p><strong className="bi bi-power"> Logout</strong></p>
            </div>
        </>
    )
}

export default NavBar;