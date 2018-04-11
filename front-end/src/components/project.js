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
            description: "",
            budget: "",
            skills: "",
            employer: "",
            status: "open"
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
            console.log('Bids Details:')
            console.log(this.props.bids);
            this.props.bidsTabClick(this.props.match.params.name);
            setTimeout(()=>{
                document.getElementById('Bids').style.display = "block";
                document.getElementById('Project-Details').style.display = "none";
                console.log(JSON.parse(this.props.bids.list)[0]);
            }, 1000);
        } else {
            this.props.detailsTabClick(this.props.match.params.name).then((data)=>{
                console.log(JSON.parse(this.props.details.list));
                console.log(JSON.parse(this.props.details.list).postedProjects[0].budget);
                // console.log(JSON.parse(this.props.details.list.postedProjects)[0].budget);
                this.setState({
                    description: JSON.parse(this.props.details.list).postedProjects[0].description,
                    budget: JSON.parse(this.props.details.list).postedProjects[0].budget,
                    skills: JSON.parse(this.props.details.list).postedProjects[0].skills,
                    employer: JSON.parse(this.props.details.list).postedProjects[0].owner
                    // status: JSON.parse(this.props.details.list)[0].status
                });
                document.getElementById('Project-Details').style.display = "block";
                document.getElementById('Bids').style.display = "none";
            });
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
                       <i> Project Description: </i>  <br/> {this.state.description} <br/> <br/>
                       <i> Estimated Budget: </i>  <br/> {this.state.budget} <br/> <br/>
                       <i> Skills: </i>  <br/> {this.state.skills} <br/> <br/>
                       <i> Status: </i> <br/> {this.state.status} <br/>
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