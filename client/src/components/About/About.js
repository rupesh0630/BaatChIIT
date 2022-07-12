import React from 'react';
import Footer from '../Footer/Footer';
import './About.css';
import Team1 from './Assets/Himanshu.jpeg';
import Team2 from './Assets/Ritik.jpeg';
import Team3 from './Assets/Rupesh.jpeg';
import NavbarNew from '../Navbar/NavbarNew';
import Github from './Assets/github.png';
import Li from './Assets/linkedin.png';

function About() {
    return (
        <>
            <NavbarNew id='navbar3'/>
            <div className='containerAbt'>
               <h1>About Our Product</h1>               
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
               <h2>Meet the Builders and Creators</h2>
            </div>
            <div id='containerAbt' className='ui container'>
                   <div id='T1'>
                        <img id='imgA1' src={Team1}/>
                        <p className='Aname1'>Himanshu Yadav</p>
                        <p className='Apos'>Web Developer</p>
                        <p className='Apos'>IIT Kharagpur</p>
                        <p className='Social'> 
                        </p>
                   </div>
                   <div id='T2'>
                        <img id='imgA2' src={Team2}/>
                        <p className='Aname2'>Ritik Rathi</p>
                        <p className='Apos'>Web Developer</p>
                        <p className='Apos'>IIT Kharagpur</p>
                        <p className='Social'>
                        </p>
                   </div>
                   <div id='T3'>
                        <img id='imgA3' src={Team3}/>
                        <p className='Aname3'>Rupesh Narayan</p>
                        <p className='Apos'>Web Developer</p>
                        <p className='Apos'>IIT Kharagpur</p>
                        <p className='Social'> 
                        </p>
                   </div>                                              
            </div>
            <Footer/>
        </>
    )
}

export default About;
