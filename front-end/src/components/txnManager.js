import React, {Component} from 'react';
import Payment from './payment';

class TransactionManager extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     showPopup: false
        // }
        // this.creditAmount = this.creditAmount.bind(this);
    }

    // creditAmount() {
    //     this.setState({
    //         showPopup: !this.state.showPopup
    //     })
    // }

    render() {
        return(
            <div id="txnManager">
               TransactionManager
            </div>
        );
    }
}

export default TransactionManager;