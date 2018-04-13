import React, {Component} from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from './login';
import { checkSession } from '../actions/index';
import Search from './search';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            projects: [],
            arrived: false
        }
    }

    componentDidMount(){
        this.props.checkSession().then((res)=> {
            this.setState({
                user: this.props.currentUser.user.firstName
            })
        });
        API.showProjects().then((res) => {
            res.json().then((data) => {
                this.setState({
                    projects: data,
                    arrived: true
                })
            })
        })
    }
    
    render(){
        return (
            <div>
                <h1> Welcome back, {this.state.user} </h1>
                <h2> Freelance Jobs and Contests </h2>
                <p> <Link className="menu-button" id="post-project" to="/post-project">  Post a Project  </Link> </p> <br/>
                <div> 
                { this.props.currentUser && 
                    this.state.arrived && 
                    <Search 
                    projects = {this.state.projects}
                    currentUser = {this.props.currentUser}
                    user = {this.props.currentUser.user.username}
                    />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {  
        isLoggedin: state.session.isLoggedin,
        currentUser: state.session
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
            checkSession: checkSession
        }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (Home); 