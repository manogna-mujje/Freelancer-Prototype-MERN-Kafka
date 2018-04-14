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
    //   console.log(this.props.bid.bidderEmail);
    let project = this.props.txn.project;
    let linkToProject = '/projects/'+ project;
    if(this.props.txn.freelancer){
        userProfile = this.props.txn.freelancer;
    } else if (this.props.txn.employer) {
        userProfile = this.props.txn.employer;
    }
    let linkToBidder = '/profile/'+ userProfile;
    //   let bidAmount = this.props.bid.bidAmount;
    return (
      <div id="txn-item">
        <ul>
            <li> <Link to={linkToProject}> {project}  </Link> </li>
            <li> <Link to={linkToBidder}> {userProfile} </Link> </li>
            <li> {this.props.txn.amount} </li>
            <li> {this.props.txn.lastTransferred} </li>
        </ul>
      </div>
    );
  }
}

export default TransactionItem;
