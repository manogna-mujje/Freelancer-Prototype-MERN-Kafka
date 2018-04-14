import React, { Component } from 'react';
import * as API from '../APIs/api';

class Withdrawl extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log(this.props.currentUser);
        API.debitAmount(this.props.amount).then((res)=> {
            document.getElementById('payment-status').innerHTML = 'Amount withdrawn successfully.';
        });
        event.preventDefault();
    }
    

    render() {
        return (
        <div className='popup'>
            <div className='popup_inner'>
                <div id="card-payment">
                    <h4> <strong> Please enter your Bank details: </strong> </h4>
                    <div className="Payment-Fields"> 
                        <input ref="name" placeholder="Account holder Name" /> <br /> <br />
                        <input id="bank" ref="bank" placeholder="Bank Name" /> <br /> <br /> 
                        <input ref="account-number" placeholder="Account Number" /> <br /> 
                    </div>
                    <p id="payment-status">  </p> <br /> 
                    <button id="payment-buttons" onClick = {this.handleSubmit}> Confirm </button>
                    <button id="payment-buttons" onClick={this.props.closePopup}> Cancel </button>
                </div>
            </div>
        }
        </div>
        );
    }
}

export default Withdrawl;
