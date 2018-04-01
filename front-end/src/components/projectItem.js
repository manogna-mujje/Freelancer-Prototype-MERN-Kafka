import React, { Component } from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';


class ProjectItem extends Component {
  render() {
      let projectName = this.props.project.PROJECTNAME;
      let linkToProject = '/projects/'+ projectName;
      let projectOwner = this.props.project.PROJECTOWNER;
      let linkToOwner = '/profile/' + projectOwner;
    return (
      <div className="ProjectItem">
        <ul> 
            <li>
                <Link id="project-name" to={linkToProject} ><strong>{this.props.project.PROJECTNAME}</strong> </Link> <br />
                <p>  <i> Project Description: </i> <br/>
                {this.props.project.DESCRIPTION} </p> <br />
                <p> <i>  Skills Required: </i> <br/>
                {this.props.project.SKILLS} </p> 
                <p> <i>  Estimated Budget: </i> <br/>
                {this.props.project.ESTIMATEDBUDGET} </p>  <br />
                <p> <i> Employer: </i> <br />
                <Link to={linkToOwner}> {this.props.project.PROJECTOWNER} </Link> </p> 
                <button id="bid-button" > Post a Bid </button>
            </li>
        </ul>
      </div>
    );
  }
}

export default ProjectItem;