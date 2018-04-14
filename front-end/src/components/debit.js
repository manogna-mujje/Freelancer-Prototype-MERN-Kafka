import React, {Component} from 'react';
import Withdrawl from './withdrawl';

class DebitAmount extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        }
        this.debitAmount = this.debitAmount.bind(this);
    }

    debitAmount() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render() {
        return(
            <div id="profiler-view">
                <br/>
                <label> Withdraw Amount from your account: </label> <br/>
                <input type="text" ref="amount" placeholder="Enter an amount" /><br/><br />
                <button id="debit-amount-button" onClick = { this.debitAmount } >
                    Withdraw Amount
                </button>
                {   this.state.showPopup ? 
                    <Withdrawl
                        closePopup={this.debitAmount}
                        amount = {this.refs.amount.value}
                    />  :
                    null
                }
            </div>
        );
    }
}

export default DebitAmount;