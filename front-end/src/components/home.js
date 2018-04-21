import React, {Component} from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from './login';
import { checkSession } from '../actions/index';
import Search from './search';
import Menu from './menu' ;
import NavBar from './bs-navbar';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            arrived: false
        }
    }

    componentDidMount(){
        this.props.checkSession().then((res)=> {
            this.setState({
                user: this.props.currentUser.user.firstName,
                username: this.props.currentUser.user.username,
                arrived: true
            })
        });
    }
    
    render(){
        return (
            <div>
                <h2> Hey, {this.state.user} </h2>
                <h4> Freelance Jobs and Contests </h4>
                <NavBar user={this.state.username} /> <br/>
                <div> 
                { this.props.currentUser && 
                    this.state.arrived &&
                    <Search 
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