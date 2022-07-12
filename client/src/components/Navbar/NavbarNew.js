import React, { useState, useEffect } from 'react';
import './NavbarNew.css';
import LoginPopup from '../Login-Popup/LoginPopup';
import Bars from './Assets/bars.svg'
import Logo from './Assets/Logo1.png';


function Navbar(props) {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const handleClick = () => setClick(!click);                      
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 780) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const changeBackground = () =>{
    if(window.scrollY >=75){
      setNavbar(true);
    }else{
      setNavbar(false);
    };
  };

  window.addEventListener('scroll', changeBackground);

  return (
    <>
      <nav id={props.id} className={navbar ? 'navbar active':'navbar'}>
        <div className='navbar-container'>
            <a href='/' className='navbar-logo' onClick={closeMobileMenu}>
              <img alt="brand-logo" id="logo" src={Logo}/>
            </a>
            <div className='menu-icon' onClick={handleClick}>
              <img alt="bars" className="bars" src={Bars}/>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <div className='mobileHead nav-item'>
            <a href='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img alt="logo" id="logo" src={Logo}/>
            </a>
            </div>
            <div className='menu-icon' onClick={closeMobileMenu}>
              <i className= 'fas fa-times'/>
            </div>
            
            <li id="about" className='nav-item'>
              <a href='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </a>
            </li>
            <li className='nav-item'>
              <div
                className='nav-links'
                onClick={closeMobileMenu}
              >
               <LoginPopup id="signUp" text="Already have an account?" link="Log In" name="Sign Up"/>
              </div>
            </li>
            <li className='nav-item'>
              <div
                className='nav-links'
                onClick={closeMobileMenu}
              >
               <LoginPopup id="logIn" text="No Account?" link="Sign Up" name="Log In" />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;