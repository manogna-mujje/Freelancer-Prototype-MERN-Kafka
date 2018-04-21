import React, {Component} from 'react';
import * as API from '../APIs/api';
import Menu from './menu' 

class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        if(event.target.id === 'dashboard') {
            // this.props.history.push('/dashboard');
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="nav-bar"> 
                <div className="tab">
                    <button className="tablinks"  id="dashboard" onClick={this.handleClick}>All Projects</button>
                    <button className="tablinks" id="my-projects" onClick={this.props.myProjects}>My Projects</button>
                    <button className="tablinks" id="my-bids" onClick={this.props.myBids}>My Bids</button>
                </div>
            </div>
        );
    }
}

export default NavigationBar;