import React, {useState} from 'react';

type Props = {
    sideBarClickHandler: () => void;
};

const NavBar:React.FC<Props> = ({sideBarClickHandler}) => {
    const [isLogout, setIsLogOut] = useState(false);

    
      const handleLogout = () => {
        setIsLogOut(!isLogout);
      }
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
            <div className= {`logoutV ${isLogout ? "visible" : "hidden"} logout`}>
              <h5 className="me-4"><i className="bi bi-search"></i></h5>
              <h5><i className="bi bi-power"> Logout</i></h5>
            </div>
        </>
    )
}

export default NavBar;