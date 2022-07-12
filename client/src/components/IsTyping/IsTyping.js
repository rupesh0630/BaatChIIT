import React, {useState} from 'react';
import './IsTyping.css';
import { useEffect, useRef } from 'react';

const IsTyping = ({b, divId}) => {

    const [idName, setIdName] = useState('typing');
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() =>{
        if(divId === 'not_div')
        {
            setIdName('not_typing');
        }
        else
        {
            setIdName('typing');
        }
    }, [divId]);
    useEffect(() => {
        scrollToBottom();
    }, [b]);

    return(
        <div>
            <div id={idName}>
              {(b)? (<div>Stranger is Typing...</div>): null}
            </div> 
            <div ref={messagesEndRef} />
        </div>
    ) 
}
// className="ScrollToBottom"
export default IsTyping;