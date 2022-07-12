import React, {useEffect, useState} from 'react';
// import { Button } from './Button';
import './Head.css';
import LoginPopup from '../Login-Popup/LoginPopup'; 




function Head() {
  
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  //  style={{ transform: `translateY(-${offsetY * 0.4}px)` }}
  // style={{color: `rgba(255, 255, 255, ${1/2(offsetY +1)})`}}

  return (
    <div>   
    <div style={{ transform: `translateY(-${offsetY * 0.4}px)` }} className='head-container' > 
      <h1>UNWIND YOURSELF</h1>
      <p>Welcome to the world of conversing without hesitation and judgement.</p>
      <div>
          <div>
            <LoginPopup id="getStarted" text="Already have an account?" link="Log In" name="Get Started"/>
          </div>
          <div className="Login">
            <LoginPopup id="HeadlogIn" text="No Account?" link="Sign Up" name="Log In" />  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head;