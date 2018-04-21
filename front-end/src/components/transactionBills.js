import React, {Component} from 'react';
import TransactionHistory from './transactionHistory';
import * as API from '../APIs/api';

class TransactionBills extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
            bill: ''
        }
        this.viewHistory = this.viewHistory.bind(this);
    }

    componentDidMount(billUpdate){
        var bill = {};
        if(this.props.isEmployer){
            console.log('Employer billDetails');
            // if('hired' in this.props.user.postedProjects){
                console.log('Employer billDetails into array');
                this.props.user.postedProjects.forEach((item)=>{
                    if(item.name ===  this.props.project) {
                       if('hired' in item){
                        bill = {
                            bidAmount: item.hired[0].bidAmount,
                            freelancer: item.hired[0].freelancer,
                            lastTransferred: item.lastTransferred,
                            employer: this.props.user.username
                        }
                       }
                    }
                })
            // }
        } else if(this.props.isFreelancer) {
            var billDetails = this.props.user.assignedProjects;
            console.log(typeof(billDetails));
            console.log('Freelancer billDetails');
            console.log(JSON.stringify(this.props.user.assignedProjects[this.props.project]));
            var bill = (this.props.user.assignedProjects[this.props.project]);
            bill.freelancer = this.props.user.username;
        }
        setTimeout(()=>{
            this.setState({
                bill: bill
            });
          }, 300);
    }

   
    viewHistory() {
        // API.viewTransactionHistory(this.props.employer, this.props.project).then((res) => {
            this.setState({
                showPopup: !this.state.showPopup,
                bill: this.state.bill
            })
        // })
    }

    render() {
        console.log('Bill page');
        console.log(this.state.bill);
        console.log(this.props.user);
        // console.log(this.props.freelancer);
        return(
            <div id="employer-view">
                <button type="button" className="btn btn-primary" id="edit-profile" onClick={this.viewHistory}>
                    View Transaction History
                </button> <br />
                {   this.state.showPopup ? 
                    <TransactionHistory
                        closePopup={this.viewHistory}
                        bill = {this.state.bill}
                    />  :
                    null
                }
            </div>
        );
    }
}

export default TransactionBills;