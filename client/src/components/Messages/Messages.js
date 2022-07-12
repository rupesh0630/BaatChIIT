import React  from 'react';
import './Messages.css';
import Message from '../Message/Message';
import { useEffect, useRef } from 'react';



const Messages = ({change, divId, id, messages, waitMessage}) => {
  
  // const [height, setHeight] = useState(null);

  // const handleScroll = () => setHeight(window.innerHeight);

  // useEffect(() => {
  //   const h = document.getElementById('Scroll').clientHeight;
  //   setHeight(h);
  // }, []);

  let temp = false;
  if(waitMessage === "Stranger has left the chat" || waitMessage === "You have left the chat")
  {
    temp = true;
  }
  else{
    temp = false;
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, change]);

  // console.log(height);
  return(
      <div id="Scroll" className="ScrollToBottom">
        {temp ? null:  (<div id="waitTop">{waitMessage}</div>)}
          {messages.map((message, i) =>          
              <div key={i}><Message divId={divId} id={id} message={message}/></div>
          )}          
          {temp ? (<div id="waitTop">{waitMessage}</div>) : null}
          <div ref={messagesEndRef} />
      </div>
  )
        
    
}



export default Messages;