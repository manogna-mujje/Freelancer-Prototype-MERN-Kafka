import React, { Component } from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        
    }
    
    handleClick(){
        API.logout().then((res) => {
           if(res.status === 200){
            this.props.history.push('/login');
           }
        })
    }

    render() {
        let URL = "http://54.151.54.81:8080";
        let linkToProfile =  URL + "/profile/"+ this.props.user;
        let linkToDashboard = URL + "/dashboard";
        let linkToTxnManager = URL + '/txnManager/'+ this.props.user
        return (
            <div id= "my-NavBar">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href={linkToProfile}>My Profile <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={linkToDashboard}>Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={linkToTxnManager}>Transaction Manager</a>
                </li>
                </ul>
                </nav>
            </div>
        );
    }
}

export default NavBar;
