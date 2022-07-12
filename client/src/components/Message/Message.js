import React from 'react';
import './Message.css';

const Message = ({divId, id, message: {text, user}}) => {

    let isSentByCurrentUser = false;

   const giveId = () => {
      if(divId === 'not_div')
      {
         return 'not_left';
      }
      else
      {
         return 'left';
      }
   }

    if(user===id)
    {
       isSentByCurrentUser=true;
    }

   
    return (
       <div>
            {isSentByCurrentUser
            ?(
               <div className="me">
                  <div id="right">{text}</div>
               </div>
            ): (
               <div className="other">
                  <p id={giveId()}>{text}</p>
               </div>
            )}
        </div>   
    )    
}

export default Message;