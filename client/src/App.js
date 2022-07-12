import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// import {connect} from 'react-redux';
// import * as actions from './actions';

import Home from './components/Homepage/Home';
import Chat from './components/Chat/Chat';
import About from './components/About/About';
import axios from 'axios';

// eslint-disable-next-line
let isUserLoggedIn = false; 

class App  extends Component {

    state = {component: ''};

    componentDidMount(){
        
        axios.get('/api/current_user')
            .then(response => {
                // console.log(response);
                if(response.data === ""){
                    this.setState({component: Home})
                    isUserLoggedIn = false;
                }
                else{
                    this.setState({component: Chat});
                    isUserLoggedIn=true;
                }
            })

    }

    render(){
        return(
            <BrowserRouter>
                <Route path="/" exact component={this.state.component}/>
                <Route path = "/chat" exact component={this.state.component} />
                <Route path = "/about" exact component={About} />
            </BrowserRouter>
        );
    }
};

// function mapStateToProps({auth}){
//     return {auth};
// }

// export default connect(null, actions)(App);
export default App;