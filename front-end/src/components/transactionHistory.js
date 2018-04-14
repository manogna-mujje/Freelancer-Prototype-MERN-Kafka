import React, { Component } from 'react';
import * as API from '../APIs/api';

class TransactionHistory extends Component {
    constructor(props){
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit(event){
    //     console.log(this.props.currentUser);
    //     API.transactionHistory(this.props.amount).then((res)=> {
    //         document.getElementById('payment-status').innerHTML = 'Amount credited to your account successfully.';
    //     });
    //     event.preventDefault();
    // }

    render() {
        return (
        <div className='popup'>
            <div className='txnHistory'>
                <div className='table'>
                    <h4>  Transaction Details </h4>
                    <i> Employer: </i> {this.props.bill.employer} <br />
                    <i> Freelancer: </i> {this.props.bill.freelancer} <br />
                    <i> Amount: </i> {this.props.bill.bidAmount} <br />
                    <i> Date of Transaction: </i> {this.props.bill.lastTransferred} <br />
                
                </div>
                <button onClick = {this.props.closePopup}>Close</button>
            </div>
        </div>
        );
    }
}

export default TransactionHistory;
