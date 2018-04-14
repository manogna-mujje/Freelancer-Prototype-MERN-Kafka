import React, {Component} from 'react';
import * as API from '../APIs/api';
import CreditAmount from './credit';
import DebitAmount from './debit';
import TransactionItem from './txnItem';
import PieChart from 'react-simple-pie-chart';

class TransactionManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            outTransactions: '',
            inTransactions: '',
            income: '',
            expenses: ''
        }
    }

    componentDidMount(){
        API.viewTransactionHistory().then((res)=>{
            res.json().then((data)=>{
                this.setState({
                    outTransactions: data.outValue,
                    inTransactions: data.inValue,
                    income: parseInt(data.inAmount),
                    expenses: parseInt(data.outAmount)
                })
                console.log(data);
            })
        })
    }

    render() {
        var outTransactionItems, inTransactionItems;
        console.log(this.state.outTransactions);
        let outTxns = this.state.outTransactions;
        if(this.state.outTransactions === '') {
            outTransactionItems = 'No outgoing transactions';
        }  else {
            outTransactionItems = outTxns.map((txn, index) => {
                return (
                    <li>
                    <TransactionItem key={index} txn={txn} />
                    </li>
                );
            });
        } 

        console.log(this.state.outTransactions);
        let inTxns = this.state.inTransactions;
        if(this.state.inTransactions === '') {
            inTransactionItems = 'No incoming transactions';
        }  else {
            inTransactionItems = inTxns.map((txn, index) => {
                return (
                    <li>
                    <TransactionItem key={index} txn={txn} />
                    </li>
                );
            });
        } 
        return(
            <div id="txnManager">
               TransactionManager
                <CreditAmount /> 
                <br/>
                <DebitAmount /> 
                <br/>
                <label>  Outgoing Tansaction History </label> 
                <div id="txn-history-header"> 
                    <ul>
                        <li> ProjectName </li>
                        <li> Freelancer </li>
                        <li> Amount in $</li>
                        <li> Date of Transaction </li>
                    </ul>
                </div> <br /> <br/>
                <ul>
                {outTransactionItems} 
                </ul> <br/>
                <label> Incoming Tansaction History </label> <br/>
                <div id="txn-history-header"> 
                    <ul>
                        <li> ProjectName </li>
                        <li> Employer </li>
                        <li> Amount in $</li>
                        <li> Date of Transaction </li>
                    </ul>
                </div> <br /> <br/>
                <ul>
                {inTransactionItems} 
                </ul> <br />
                <br />
                <div id="pie-chart"> 
                    <PieChart
                        slices={[
                            {
                            color: '#f00',
                            value: this.state.expenses,
                            },
                            {
                            color: '#0f0',
                            value: this.state.income,
                            },
                        ]}
                    />
                </div>

            </div>
        );
    }
}

export default TransactionManager;