import React from 'react';
import './NavChatNew.css';
import './NavChatNew.css';
import BarsBlack from './Assets/barsBlack.svg';
import Bars from './Assets/bars.svg';
import Day from './Assets/Day1.png';
import Night from './Assets/Night1.png';
import Logo from './Assets/Logo1.png';
import LogoDark from './Assets/LogoDark.png';


class NavChatNew extends React.Component {

    state = {div_id: 'all', chath3: 'chath3', logout: 'logout', mode: false, click: false, bars: true}

    componentDidMount(){
        this.onClickHandler();
    }
   onClickHandler = () => {
        this.setState({ mode: !this.state.mode });
       if(this.state.mode){
           this.props.dark_mode(this.state.mode);
           this.setState({div_id: 'not_all', chath3: 'not_chath3', logout: 'not_logout', bars:false})
       }
       else{
           this.props.dark_mode(this.state.mode);
           this.setState({div_id: 'all', chath3: 'chath3', logout: 'logout', bars: true});
       }
    //    console.log(this.state.mode);
   }
    

   closeMobileMenu=() =>{
       this.setState({click: false});
   }

   handleClick = () => {
       this.setState({click: !this.state.click});
   }
   
   

    render(){ 
        return (
            <>
        <nav className='navbar2'>
          <div className='navbar-container2'>
            <div className='navbar-logo2' onClick={this.closeMobileMenu}>
                {this.state.mode ? <img alt="logo" id="logo2" src={LogoDark}/> : <img alt="logo" id="logo2" src={Logo}/>}
            </div>
            <div className='menu-icon2' onClick={this.handleClick}>
               {this.state.bars ? <img alt="bars" className='bars2' src={BarsBlack}/> : <img alt="bars" className='bars2' src={Bars}/>}
            </div>
                  
            <ul id= {this.state.bars ? 'WhiteBg' : 'BlackBg'} className={this.state.click ? 'nav-menu active2' : 'nav-menu2'}>          
                <div className='mobileHead2 nav-item2'>
                    <div  className='navbar-logo2' onClick={this.closeMobileMenu}>
                    {this.state.mode ? <img alt="logo" id="logo2" src={LogoDark}/> : <img alt="logo" id="logo2" src={Logo}/>}
                    </div>
                </div> 
                <div className='menu-icon2' onClick={this.closeMobileMenu}>
                     <i id={this.state.bars ? 'Btimes': 'Wtimes'} className= 'fas fa-times'/>
                </div>

                <li className='nav-item2'>
                   <div
                    className='nav-links2'                   
                    >
                     {this.state.mode ? <img alt="dark" id="night" onClick={this.onClickHandler} src={Night}/> : <img alt="light" id="day"  onClick={this.onClickHandler} src={Day}/>}
                   </div>
                </li>

                <li className='nav-item2'>
                   <div
                    className='nav-links2'
                    onClick={this.closeMobileMenu}
                    >
                        <button id={this.state.logout}><a href='/api/logout'>LogOut</a></button>
                   </div>
                </li>

            </ul>
          </div>
         </nav>
            </>
        );
       }
    }         

export default NavChatNew;




