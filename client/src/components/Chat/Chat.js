import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import NavChatNew from './NavChat/NavChatNew';
import './Chat.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import FindButton from './FindButton/FindButton';
import IsTyping from '../IsTyping/IsTyping';
import WaitMessage from '../waitMessage/WaitMessage';


let socket;
var id;
var arr = [];

const Chat = ({location}) => {

    var ENDPOINT = '';
    if(process.env.NODE_ENV === 'production')
    {
        ENDPOINT = 'https://nameless-bayou-10689.herokuapp.com/';
    }
    else{
        ENDPOINT = 'http://localhost:5000';
    }
    
    // const ENDPOINT = 'http://localhost:5000';

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [waitMessage, setWaitMessage] = useState('');
    const [code, setCode] = useState(null);
    const [bcode, setBcode] = useState(null);
    const [end, setEnd] = useState(false);
    const [find, setFind] = useState(false);
    const [typing, setTyping] = useState(false);
    const [b , setB] = useState(false);
    const [divId, setDivId] = useState('div');
    const [spaceLeft, setSpaceLeft] = useState('space_left');
    const [spaceRight, setSpceRight] = useState('space_right');
    const [change, setChange] = useState(false);

    useEffect(() => {
       
        socket = io(ENDPOINT);

        socket.on('conn', (data) => {
            // console.log(`You are now chatting with a random stranger !!`);
            id = data.id;
            setWaitMessage(data.text);
            setMessages([]);
            setCode(data.code);
            setBcode(data.bcode);
        })
        socket.on('waiting', text => {
            setWaitMessage(text.text);
            setCode(text.code);
            setBcode(text.bcode);
        })
        socket.on('disconn', (data) => {
            // console.log(data.id);
            // console.log(data.text);
            setCode(data.code);
            setBcode(data.bcode);
            setWaitMessage(data.text);
            // console.log(code);
        });
    }, [ENDPOINT, location.search]);
    

    useEffect(() => {
        if(end===true)
        {
            socket.emit("disconn");
            setEnd(false);
        }
    }, [end])


    useEffect(() => {
        socket.on('istyping', isTyping => {
            setB(isTyping);
           
        })
    });

    useEffect(() => {
            socket.emit("typing", typing);
    });


    useEffect(() => {
        if(find===true){
            socket.emit("new");
            setFind(false);
        }
    }, [find])

    useEffect(() => {
        socket.on('message', (message) => {
            const addMessage = (message) => setMessages(state => [...state, message]);
            addMessage(message);
        })
        //eslint-disable-next-line
    }, [arr]);

    useEffect(() => {
        if(message) {
            socket.emit('sendMessage', message, () => {setMessage('')});
        }
        // else{
        //     console.log("no message");
        // }
    }, [message]);

    const dark_mode = (event) => {
        if(event){
            setDivId('not_div');
            setSpaceLeft('not_space_left');
            setSpceRight('not_space_right');
        }
        else{
            setSpaceLeft('space_left');
            setSpceRight('space_right');
            setDivId('div');
        }
    }

    const scroll_effect = (event) => {
        if(event)
        {
            setChange(!change);
        }
        else{
            setChange(!change)
        }
    }


    // console.log(message, messages);

    return(
        <div id={divId}>
            <NavChatNew dark_mode={dark_mode}/>
            <div id="container" >
                <div id="findButton_m">
                    <FindButton find={find} setFind={setFind} end={end} setEnd={setEnd} bcode={bcode} setBcode={setBcode}/>
                </div>
                <div className="space1">
                    <div id={spaceLeft}>
                        <WaitMessage waitMessage={waitMessage}/>
                    </div>
                    <div id={spaceRight}>
                        <div>
                            <Messages change={change} divId={divId} id={id} messages={messages} waitMessage={waitMessage}/>
                            <IsTyping divId={divId} b={b}/>
                        </div>
                    </div>
                </div>
                <div className="space2">
                    <div id="findButton">
                        <div>
                            <FindButton find={find} setFind={setFind} end={end} setEnd={setEnd} bcode={bcode} setBcode={setBcode}/>
                        </div>
                    </div>
                    <div className="spaceInput">
                        <Input scroll_effect={scroll_effect} divId={divId} typing={typing} setTyping={setTyping} code={code} setCode={setCode} message={message} setMessage={setMessage} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Chat;