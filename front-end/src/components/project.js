import React, {Component} from 'react';
import * as API from '../APIs/api';
import Menu from './menu' 
import {checkSession} from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bidsTabClick } from '../actions';
import { detailsTabClick } from '../actions';
import ProjectItem from './projectItem';

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectID : "",
            description: "",
            budget: "",
            skills: "",
            status: ""
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.bidsTabClick(this.props.match.params.name);
            setTimeout(()=>{
                document.getElementById('Bids').style.display = "block";
            }, 1000);
    }
    handleClick(event){
        console.log(event);
        if(event.target.id === 'bids-button') {
            console.log('Congrats');
            this.props.bidsTabClick(this.props.match.params.name);
            setTimeout(()=>{
                document.getElementById('Bids').style.display = "block";
                document.getElementById('Project-Details').style.display = "none";
                console.log(JSON.parse(this.props.bids.list)[0]);
            }, 1000);
        } else {
            this.props.detailsTabClick(this.props.match.params.name);
            setTimeout(()=>{
                this.setState({
                    projectID: JSON.parse(this.props.details.list)[0].PROJECTID,
                    description: JSON.parse(this.props.details.list)[0].DESCRIPTION ,
                    budget: JSON.parse(this.props.details.list)[0].ESTIMATEDBUDGET,
                    skills: JSON.parse(this.props.details.list)[0].SKILLS,
                    status: JSON.parse(this.props.details.list)[0].STATUS
                })
            }, 1000);
            setTimeout(()=>{
                document.getElementById('Project-Details').style.display = "block";
                document.getElementById('Bids').style.display = "none";
            }, 2000);
        }   
    }

    render(){
        return (
            <div className="project-details">
                <Menu />
                <div id = "project-title"> 
                    {this.props.match.params.name}
                </div>
                <div id="project-buttons"> 
                    <div className="tab">
                        <button className="tablinks"  id="bids-button" onClick={this.handleClick}>Bids</button>
                        <button className="tablinks" id="project-details-button" onClick={this.handleClick}>Project Details</button>
                    </div>
                    <div id="Bids" className="tabcontent">
                    {this.props.bids.list}
                    </div>
                    <div id="Project-Details" className="tabcontent">
                    <br/>
                       <i> Project ID: </i> <br/> {this.state.projectID} <br/>  <br/>
                       <i> Project Description: </i>  <br/> {this.state.description} <br/> <br/>
                       <i>Estimated Budget: </i>  <br/> {this.state.budget} <br/> <br/>
                       <i>Skills: </i>  <br/> {this.state.skills} <br/> <br/>
                       <i>status: </i> <br/> {this.state.status} <br/>
                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
        bids: state.bids,
        details: state.details
    });
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
        bidsTabClick: bidsTabClick,
        detailsTabClick : detailsTabClick
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Project); 

// export default Project;