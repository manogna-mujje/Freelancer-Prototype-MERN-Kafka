// import React, { Component } from 'react';
// import * as API from '../APIs/api';

// class Popup extends Component {
//     constructor(props){
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(event){
//         console.log('event triggered');
//         API.postBid(this.props.project, this.props.user, this.refs.bidAmount.value, this.props.owner )
//         .then((res) => {
//             console.log(res);
//             if(res.status === 200){
//                 document.getElementById('bid-status').innerHTML = "Bid posted successfully";
//             } else {
//                 document.getElementById('bid-status').innerHTML = "Unable to post Bid";
//             }
//             document.getElementById('bid-status').style.display = "block";
//             setTimeout(() => {
//                 this.props.closePopup();
//             },1500);
//         }
//     )
//         event.preventDefault();
//     }
    
//     render() {
//         console.log(this.props.currentUser);
//         return (
//         <div className='popup'>
//             <div className='popup_inner'>
//                 <div className="Fields" id="project-name">
//                     <label> <div> Bid Amount </div></label> <br />
//                     <input ref="bidAmount" placeholder="Bid Amount" /> <br />
//                     <label> <div> Estimated duration </div></label> <br />
//                     <input ref="bid-amount" placeholder="duration" /> <br />
//                     <p id="bid-status">  </p> <br />
//                     <button onClick = {this.handleSubmit}> Submit </button>
//                     <button onClick={this.props.closePopup}> Cancel </button>
//                 </div>
//             </div>
//         </div>
//         );
//     }
// }

// export default Popup;


//----------------------------------------------------------- New Version --------------------------------------------------

import React, { Component } from 'react';
import * as API from '../APIs/api';

// import { createStore } from 'redux';
// import reduxStore from '../reducers/index';



class Popup extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log('event triggered');
        API.postBid(this.props.project, this.refs.bidAmount.value, this.props.owner, this.props.currentUser.user.email )
        .then((res) => {
            console.log(res);
            if(res.status === 200){
                document.getElementById('bid-status').innerHTML = "Bid posted successfully";
            } else {
                document.getElementById('bid-status').innerHTML = "Unable to post Bid";
            }
            document.getElementById('bid-status').style.display = "block";
            setTimeout(() => {
                this.props.closePopup();
            },1500);
        }
    )
    event.preventDefault();
    }


    render() {
        console.log(this.props.user);
        return (
        <div className='popup'>
            <div className='popup_inner'>
                <div className="Fields" id="project-name">
                    <label> <div> Bid Amount </div></label> <br />
                    <input ref="bidAmount" placeholder="Bid Amount" /> <br />
                    <label> <div> Estimated duration </div></label> <br />
                    <input ref="bid-amount" placeholder="duration" /> <br />
                    <p id="bid-status">  </p> <br />
                    <button onClick = {this.handleSubmit}> Submit </button>
                    <button onClick={this.props.closePopup}> Cancel </button>
                </div>
            </div>
        </div>
        );
    }
}

export default Popup;
