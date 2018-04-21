import React, { Component } from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';

class TransactionItem extends Component {
    constructor(props){
        super(props);
        this.state = {
           isEmployer: false,
           isFreelancer: false
        }
    }

  render() {
      console.log(this.props.txn);
      var userProfile;
    let project = this.props.txn.project;
    let linkToProject = '/projects/'+ project;
    if(this.props.txn.freelancer){
        userProfile = this.props.txn.freelancer;
    } else if (this.props.txn.employer) {
        userProfile = this.props.txn.employer;
    }
    let linkToBidder = '/profile/'+ userProfile;
    return (
         <tbody id="txn-item">
            <tr>
            <th scope="row">{this.props.rowNum}</th>
            <td><Link to={linkToProject}> {project}  </Link></td>
            <td><Link to={linkToBidder}> {userProfile} </Link></td>
            <td>{this.props.txn.amount}</td>
            <td>{this.props.txn.lastTransferred}</td>
            </tr>
        </tbody>
    );
  }
}

export default TransactionItem;
