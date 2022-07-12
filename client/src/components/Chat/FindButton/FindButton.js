import React from 'react';
import './FindButton.css';
import Find from './Assets/find.svg';


class FindButton extends React.Component {

    state = {name: '', className: '', logo: false};

    onClickHandler = () => {
    
        if(this.state.className === 'ui button end'){
            this.props.setEnd(true);
            console.log("end chat clicked")
        }
        else if(this.state.className === 'ui button find'){
            this.props.setFind(true);
            // this.setState({name: 'Loading', className: 'ui loading button large', logo: false})
            console.log("Find button clicked");
        }
    }
    
    componentDidUpdate(){
        if(this.props.bcode === 2)
        {
            this.setState({name: 'Loading', className: 'ui loading button large', logo: false});
            this.props.setBcode(null);
        }
        else if(this.props.bcode === 1)
        {
            this.setState({name: 'End Chat', className: 'ui button end', logo: false});
            this.props.setBcode(null);
        }
        else if(this.props.bcode === 3)
        {
            this.setState({name: 'Find new', className: 'ui button find', logo: true});
            this.props.setBcode(null);
        }
    }

    render(){
        // console.log(this.props.code);
        return (
            <div>
                <button onClick={this.onClickHandler} className={this.state.className}>
                    {(this.state.logo)? (<div>Find New<img alt="find logo" id="find" src={Find} /></div>): (this.state.name) }
                </button>
            </div>
        )
    }
}
export default FindButton;