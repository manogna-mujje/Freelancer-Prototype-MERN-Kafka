import React, {Component} from 'react';
import * as API from '../APIs/api';
import CreditAmount from './credit';
import DebitAmount from './debit';
import TransactionItem from './txnItem';
import PieChart from 'react-simple-pie-chart';
import NavBar from './bs-navbar';

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
        console.log(this.state.expenses);
        console.log(this.state.income);
        var outTransactionItems, inTransactionItems;
        console.log(this.state.outTransactions);
        let outTxns = this.state.outTransactions;
        if(this.state.outTransactions === '') {
            outTransactionItems = 'No outgoing transactions';
        }  else {
            outTransactionItems = outTxns.map((txn, index) => {
                return (
                    <TransactionItem key={index} rowNum={index+1}  txn={txn} />
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
                    <TransactionItem key={index} rowNum={index+1} txn={txn} />
                );
            });
        } 
        return(
            <div id="txnManager">
            <br/>
            <h3 > TransactionManager </h3>
             <NavBar user={this.props.match.params.user}/> <br/>
               
               <br />
                <CreditAmount /> 
                <br/> <br />
                <DebitAmount /> 
                <br/>
                <br />
                <label>  Outgoing Tansaction History </label> 
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ProjectName</th>
                    <th scope="col">Freelancer</th>
                    <th scope="col">Amount in $ </th>
                    <th scope="col">Date of Transaction</th>
                    </tr>
                </thead>
                {outTransactionItems} 
                </table>
                <br />                
                <label> Incoming Tansaction History </label> <br/>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ProjectName</th>
                    <th scope="col">Employer</th>
                    <th scope="col">Amount in $ </th>
                    <th scope="col">Date of Transaction</th>
                    </tr>
                </thead>
                {inTransactionItems} 
                </table>
                <br/>
                <h4> Pie Chart displaying the percentages of Incoming and Outgoing Transactions: </h4> <br/>
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