import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div className="Menu">
                <header>
                    <div id="left-menu">
                        <ul>
                            <div id="logo">
                            <Link to = "/"><img src="logo.png"/></Link>
                            </div>
                            
                            <li><a href="https://www.google.com">Hire Freelancers</a></li> 
                            <li><a href="https://www.google.com">Find Work</a></li>
                            <li><a href="https://www.google.com">How it works</a></li>   
                        </ul>
                    </div>
                    <div id="right-menu">
                        <ul>
                            <li><Link to ="/post-project" className="menu-button" >Post a Project </Link></li> 
                            <li> <a href="http://localhost:8080/signup"> Sign Up </a> </li>
                            <li><a href="http://localhost:8080/login">Log In</a></li>
                        </ul>     
                    </div>   
                </header>
            </div>
        );
    }
}

export default Menu;