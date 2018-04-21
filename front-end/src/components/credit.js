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
            <label> Credit Amount to your account: </label> <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <input type="text" className="form-control" ref="amount" placeholder="Enter an amount" />
                    </div>
                    <div className="col-sm-4">
                        <button type="button" id="credit-amount-button"  className="btn btn-primary" onClick={this.creditAmount}>
                            Credit Account
                        </button>
                    </div>
                </div>
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