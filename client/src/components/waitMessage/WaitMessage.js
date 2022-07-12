import React from 'react';
import Wait1 from './Assets/wait1.svg';
import Wait2 from './Assets/wait.svg';
import Wait3 from './Assets/wait2.svg';
import './WaitMessage.css'




function WaitMessage({waitMessage}) {


    const logo = () => {

        if(waitMessage==="You are now chatting with a Stranger!"){
            return Wait2;
        }
        else if(waitMessage === "Stranger has left the chat" || waitMessage==="You have left the chat")
        {
            return Wait3;
        }
        else{
            return Wait1;
        }

    }   

    return (
        <div>
            <div id="waitMessage">
                {waitMessage}
                <div>
                   <img alt="waiting logo" className="waitLogo" src={logo()} />
                </div>
            </div>
        </div>
    )
}

export default WaitMessage;


