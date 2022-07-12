import React from 'react';
import './Footer.css';
import Logo from './Assets/Logo1.png';

class Footer extends React.Component{
    render(){
        return (
            <div className="m">
                <div className="ui container">
                       <img alt="brand-logo" id='fh3' src={Logo}/>
                    <p>2022 ChatIIT (beta), ALL RIGHTS RESERVED</p>
                </div>
            </div>
        )
    }
};

export default Footer;