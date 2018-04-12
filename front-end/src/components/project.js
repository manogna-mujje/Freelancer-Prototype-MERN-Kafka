import React, {Component} from 'react';
import * as API from '../APIs/api';
import Menu from './menu' 
import {checkSession} from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { bidsTabClick } from '../actions';
import { detailsTabClick } from '../actions';
import ProjectItem from './projectItem';
import BidItem from './bidItem';

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            bids: [],
            isAsc: false,
            description: "",
            budget: "",
            skills: "",
            employer: "",
            status: "open"
        }
        this.handleClick = this.handleClick.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount(){
        this.props.bidsTabClick(this.props.match.params.name).then((data)=> {
            let bidArray = JSON.stringify(data);
            let bidObj = JSON.parse(bidArray);
            this.setState({
                bids: bidObj.value.value
            });
            document.getElementById('Bids').style.display = "block";
            document.getElementById('Project-Details').style.display = "none";
        })
    }

    sort(){
        this.setState({
            isAsc: !this.state.isAsc
        })
    }

    handleClick(event){
        console.log(event);
        if(event.target.id === 'bids-button') {
            this.props.bidsTabClick(this.props.match.params.name).then((data)=> {
                let bidArray = JSON.stringify(data);
                let bidObj = JSON.parse(bidArray);
                this.setState({
                    bids: bidObj.value.value
                });
                document.getElementById('Bids').style.display = "block";
                document.getElementById('Project-Details').style.display = "none";
            })
        } else {
            this.props.detailsTabClick(this.props.match.params.name).then((data)=>{
                this.setState({
                    description: JSON.parse(this.props.details.list).postedProjects[0].description,
                    budget: JSON.parse(this.props.details.list).postedProjects[0].budget,
                    skills: JSON.parse(this.props.details.list).postedProjects[0].skills,
                    employer: JSON.parse(this.props.details.list).postedProjects[0].owner
                    // status: JSON.parse(this.props.details.list)[0].status
                });
                document.getElementById('Project-Details').style.display = "block";
                document.getElementById('Bids').style.display = "none";
            });
        }   
    }

    render(){
        let bidItems, bidsLength, bidAvg, num = 1;
        console.log(this.state.bids);
        
        if(this.state.bids !== [] && typeof(this.state.bids) !== 'undefined'){
        // Sorting Bid Items
        let bidArray = this.state.bids;
        if(!this.state.isAsc){
            bidArray.sort(function(a,b){
                return parseInt(b.bidAmount) - parseInt(a.bidAmount);
            })
        } else {
            bidArray.sort(function(a,b){
                return parseInt(a.bidAmount) - parseInt(b.bidAmount);
            })
        }
            bidsLength = this.state.bids.length;
            let totalBidAmount = 0;
            console.log(typeof(this.state.bids));
            bidItems = bidArray.map((bid, index) => {
                console.log(bid);
                totalBidAmount = totalBidAmount + parseInt(bid.bidAmount);
                bidAvg = totalBidAmount/bidsLength;
                return (<li> <BidItem key ={index} project={this.props.match.params.name} bid={bid}/> </li>);
            });
        } else {
            bidsLength = 0;
            bidItems = 'No bids yet!';
        }
        return (
            <div className="project-details">
                <Menu />
                <div id = "project-title"> 
                    {this.props.match.params.name}
                </div>
                <div id= "bid-summary"> 
                <ul>
                    <li> 
                       <span> Bids </span> <br/> {bidsLength}
                    </li>
                    <li> 
                    <span>  Avg Bid (USD) </span><br/> ${Math.ceil(bidAvg)}
                    </li>
                    <br />
                    <br />
                </ul>
                </div>
          
                <br />
                <div id="project-buttons"> 
                    <div className="tab">
                        <button className="tablinks"  id="bids-button" onClick={this.handleClick}>Bids</button>
                        <button className="tablinks" id="project-details-button" onClick={this.handleClick}>Project Details</button>
                        <div className="sort-buttons"> 
                            <button><div className="triangle-up" onClick = {this.sort}></div></button>
                            <button><div className="triangle-down" onClick = {this.sort} ></div></button>
                        </div>
                    </div>
                    <div id="Bids" className="tabcontent">
                        <ul> {bidItems} </ul>
                    </div>
                    <div id="Project-Details" className="tabcontent">
                        <br/>
                       <i> Project Description: </i>  <br/> {this.state.description} <br/> <br/>
                       <i> Estimated Budget: </i>  <br/> {this.state.budget} <br/> <br/>
                       <i> Skills: </i>  <br/> {this.state.skills} <br/> <br/>
                       <i> Status: </i> <br/> {this.state.status} <br/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
        bids: state.bids,
        details: state.details
    });
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
        bidsTabClick: bidsTabClick,
        detailsTabClick : detailsTabClick
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Project); 
