import React, { Component } from 'react';
import * as API from '../APIs/api';

class Payment extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log(this.props.currentUser);
        API.creditAccount(this.props.amount).then((res)=> {
            document.getElementById('payment-status').innerHTML = 'Amount credited to your account successfully.';
        });
        event.preventDefault();
    }
    

    render() {
        return (
        <div className='popup'>
            <div className='popup_inner'>
                <div id="card-payment">
                    <h4> <strong> Please enter your card details: </strong> </h4>
                    <div className="Payment-Fields"> 
                        <input ref="name" placeholder="Name on card" /> <br /> <br />
                        <input ref="card-number" placeholder="Card Number" /> <br /> <br />
                    </div>
                    <div className="private-info"> 
                        <input id="private-info" ref="expiry" placeholder="Expiry Date" /> 
                        <input id="private-info" ref="cvv" placeholder="CVV" /> 
                    </div>
                    <p id="payment-status">  </p> <br /> 
                    <br /> 
                    <button id="payment-buttons" onClick = {this.handleSubmit}> Confirm </button>
                    <button id="payment-buttons" onClick={this.props.closePopup}> Cancel </button>
                </div>
            </div>
        }
        </div>
        );
    }
}

export default Payment;
