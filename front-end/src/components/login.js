import React, {Component} from 'react';
import * as API from '../APIs/api';
import {loginAccount} from '../actions/index';
import {checkSession} from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        API.checkSession().then((res) => {
            res.json().then((body)=>{
                if(body.error){
                    console.log(body.error);
                    return;
                }
                console.log(body);
                this.setState({ user: body.user });
                this.props.history.push('/profile/' + body.user.username);
            })
        });
    }

    handleSubmit(event){
        this.props.loginAccount(this.state.username, this.state.password).then((data)=> {
            // console.log(data);
            // console.log(this.props.loginOutput.isFulfilled);
            if(this.props.loginOutput.isFulfilled){
                    this.props.history.push({
                        pathname: '/profile/' + this.props.loginOutput.username
                    })
            } else {
                document.getElementById('error-message').style.display = "block";
            }
        });
        event.preventDefault();
    }

    handleChange(event) {
        switch (event.target.id ){
            case 'id-username':
                this.setState({
                    username : event.target.value
                });
                break; 
            case 'id-password':
                this.setState({
                    password : event.target.value
                });
                break;   
        }
    }

    render() {
        return (
            <div className="login-container"> 
                <div className="loginForm">
                <form onSubmit={this.handleSubmit}>
                    <h4> Login Account </h4> <br/>
                    <p id="error-message"> The email and password you entered did not match our records. Please double-check and try again. </p>
                    <input className="inputField" type="text" id= "id-username"  name="username" placeholder="Username"
                    onChange={this.handleChange}
                    /> <br />
                    <input className="inputField" type="password" id= "id-password"  name="password" placeholder="Password"
                    onChange={this.handleChange}
                    /> <br />
                    <input className="inputField" id="submit" type="submit" value="Login"/>
                </form>
                
                <br /> 
                <br />
                <br /> 
                <div className = "form-footer"> Don't have an account? <span> <Link to= '/signup'>Sign Up. </Link> </span> </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {  
        loginOutput: state.loginOutput,
        session: state.session
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
            loginAccount: loginAccount,
            checkSession: checkSession
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login); 

