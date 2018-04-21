import React, { Component } from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';
import Popup from './popup';

class ProjectItem extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false, 
      isFreelancer: false
    };
  }

  componentDidMount(){
    console.log('compWilMount');
    if (this.props.user !== this.props.project.owner) {
      this.setState({
        isFreelancer: true
      });
    }
  }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    console.log('Rendering.....')
    console.log(this.props.project);
    console.log(this.props.user);
    console.log(this.props.project.owner);
    console.log(this.state.isFreelancer);
   
    let projectName = this.props.project.name;
    let linkToProject = '/projects/'+ projectName;
    let projectOwner = this.props.project.owner;
    let linkToOwner = '/profile/' + projectOwner;
    return (
      <div className="ProjectItem">
        <ul> 
            <li>
                <Link id="project-name" to={linkToProject} ><strong>{this.props.project.name}</strong> </Link> <br />
                <p>  <i> Project Description: </i> <br/>
                {this.props.project.description} </p> <br />
                <p> <i>  Skills Required: </i> <br/>
                {this.props.project.skills} </p> 
                <p> <i>  Estimated Budget: </i> <br/>
                {this.props.project.budget} </p>  <br />
                <p> <i> Employer: </i> <br />
                   <Link to={linkToOwner}> {this.props.project.owner} </Link> </p> 
                <div> 
                  {
                    this.state.isFreelancer && 
                    <button id="bid-button" onClick = {this.togglePopup.bind(this)}> Bid Now </button>
                  }
                </div>   
               
                {this.state.showPopup ? 
                  <Popup
                    project={this.props.project.name}
                    owner = {this.props.project.owner}
                    closePopup={this.togglePopup.bind(this)}
                    user={this.props.user}
                    currentUser = {this.props.currentUser}
                  />
                  : null
                }
            </li>
        </ul>
      </div>
    );
  }
}

export default ProjectItem;

