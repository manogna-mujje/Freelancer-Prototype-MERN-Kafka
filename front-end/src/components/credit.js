import React, {Component} from 'react';
import Payment from './payment';

class CreditAmount extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        }
        this.creditAmount = this.creditAmount.bind(this);
    }

    creditAmount() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render() {
        return(
            <div id="employer-view">
                <br/>
                <label> Credit Amount to your account: </label> <br/>
                <input type="text" ref="amount" placeholder="Enter an amount" /><br/><br />
                <button id="file-upload-button" onClick = { this.creditAmount } >
                    Credit Account
                </button>
                {   this.state.showPopup ? 
                    <Payment
                        closePopup={this.creditAmount}
                        amount = {this.refs.amount.value}
                    />  :
                    null
                }
            </div>
        );
    }
}

export default CreditAmount;