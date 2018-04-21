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
                <label> Withdraw Amount from your account:  </label> <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <input type="text" className="form-control" ref="amount" placeholder="Enter an amount" />
                    </div>
                    <div className="col-sm-4">
                        <button type="button" id="debit-amount-button"  className="btn btn-primary" onClick={this.debitAmount}>
                        Withdraw Account
                        </button>
                    </div>
                </div>
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