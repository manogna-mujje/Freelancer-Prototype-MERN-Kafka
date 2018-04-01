import React, {Component} from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from './login';
import { checkSession } from '../actions/index';
import ProjectItem from './projectItem';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount(){
        this.props.checkSession().then((res)=> {
            console.log(this.props.user);
        })
        API.showProjects().then((res) => {
            res.json().then((data) => {
                console.log(data);
                data.list.map(proj => {
                    console.log(proj);
                })
                console.log(Array.isArray(data.list));
                this.setState({
                    projects: data.list
                })
            })
        })
    }

    
    render(){
        console.log( (Array.from(this.state.projects) ));
        let projectItems
        if(this.state.projects){
        projectItems = this.state.projects.map(project => {
            console.log(project);
            return (
                <ProjectItem key={project.PROJECTNAME} project={project} user={this.props.user}/>
            );
        });
        }
        return (
            <div>
                <h1> Welcome back, {this.props.user} </h1>
                <h2> Freelance Jobs and Contests </h2>
                <div className="Projects">
               <p> <Link className="menu-button" id="post-project" to="/post-project">  Post a Project  </Link> </p> <br/>
                {projectItems}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {  
        isLoggedin: state.session.isLoggedin,
        user: state.session.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
            checkSession: checkSession
        }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (Home); 