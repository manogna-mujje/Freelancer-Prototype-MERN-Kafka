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
        //     return;
        // } else if(event.target.id === 'my-projects'){
        //     console.log('my projects tab');
        //     this.props.myProjects();
        // } else if (event.target.id === 'my-bids') {
        //     console.log('my bids tab');
        //     this.props.myBids();
        // }
    }

    // handleMyProjects(){
    //     console.log('My projects function');
    //     API.myProjects().then((res)=>{
    //         res.json().then((data) => {
    //             this.setState({
    //                 projects: data,
    //                 arrived: true
    //             })
    //         })
    //     })
    // }

    // handleMyBids(){
    //     console.log('My Bids function');
    //     API.myBids().then((res)=>{
    //         res.json().then((data) => {
    //             console.log(data);
    //             this.setState({
    //                 projects: data,
    //                 arrived: true
    //             })
    //         })
    //     })
    // }

    render() {
        return (
            <div className="nav-bar"> 
                <div className="tab">
                    <button className="tablinks"  id="dashboard" onClick={this.handleClick}>Dashboard</button>
                    <button className="tablinks" id="my-projects" onClick={this.props.myProjects}>My Projects</button>
                    <button className="tablinks" id="my-bids" onClick={this.props.myBids}>My Bids</button>
                </div>
            </div>
        );
    }
}

export default NavigationBar;