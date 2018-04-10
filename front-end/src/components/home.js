// import React, {Component} from 'react';
// import * as API from '../APIs/api';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Login } from './login';
// import { checkSession } from '../actions/index';
// import ProjectItem from './projectItem';
// import Search from './search';

// class Home extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             projects: [],
//             currentPage: 1,
//             itemsPerPage: 4
//         }
//         this.handleClick = this.handleClick.bind(this);
//     }

//     handleClick(event) {
//         this.setState({
//           currentPage: Number(event.target.id)
//         });
//       }

//     componentDidMount(){
//         this.props.checkSession().then((res)=> {
//             console.log(this.props.user);
//         })
//         API.showProjects().then((res) => {
//             res.json().then((data) => {
//                 this.setState({
//                     projects: data
//                 })
//             })
//         })
//     }
    
//     render(){
//         let items = this.state.projects;

//         console.log(this.state.currentPage);

//         // Logic for displaying current page items
//         const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
//         const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
//         const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

//         // Retrieve each item from the array of Project Items
//         let projectItems
//         if(this.state.projects){
//             projectItems = currentItems.map((project, index) => {
//                 return (
//                     <ProjectItem key={index} project={project} user={this.props.user}/>
//                 );
//             });
//         }

//         // Logic for displaying page numbers
//         const pageNumbers = [];
//         for (let i = 1; i <= Math.ceil(items.length / this.state.itemsPerPage); i++) {
//           pageNumbers.push(i);
//         }

//         const renderPageNumbers = pageNumbers.map(number => {
//             return (
//               <li
//                 key={number}
//                 id={number}
//                 onClick={this.handleClick}
//               >
//                 {number}
//               </li>
//             );
//           });

//         return (
//             <div>
//                 <h1> Welcome back, {this.props.user} </h1>
//                 <h2> Freelance Jobs and Contests </h2>
//                 <div> 
//                     <Search projects={this.state.projects}/>
//                 </div>
//                 <div className="Projects">
//                <p> <Link className="menu-button" id="post-project" to="/post-project">  Post a Project  </Link> </p> <br/>
//                 {projectItems}
//                 </div>
//                 <ul id="page-numbers">
//                 {renderPageNumbers}
//                 </ul>
//             </div>
//         );
//     }
// }

// function mapStateToProps(state) {
//     return {  
//         isLoggedin: state.session.isLoggedin,
//         user: state.session.user
//     };
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ 
//             checkSession: checkSession
//         }, dispatch);
// }
// export default connect(mapStateToProps, mapDispatchToProps) (Home); 



// -------------- New version -----------------

import React, {Component} from 'react';
import * as API from '../APIs/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Login } from './login';
import { checkSession } from '../actions/index';
import Search from './search';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            projects: [],
            arrived: false
        }
    }

    componentDidMount(){
        console.log('Comp Did Mount')
        this.props.checkSession().then((res)=> {
            this.setState({
                user: this.props.user.user.firstName
            })
        })
        API.showProjects().then((res) => {
            res.json().then((data) => {
                console.log(data);
                this.setState({
                    projects: data,
                    arrived: true
                })
            })
        })
    }
    
    render(){
        return (
            <div>
                <h1> Welcome back, {this.state.user} </h1>
                <h2> Freelance Jobs and Contests </h2>
                <p> <Link className="menu-button" id="post-project" to="/post-project">  Post a Project  </Link> </p> <br/>
                <div> 
                { this.props.user && 
                    this.state.arrived && 
                    <Search 
                    projects = {this.state.projects}
                    user = {this.props.user.user.username}
                    />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {  
        isLoggedin: state.session.isLoggedin,
        user: state.session
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
            checkSession: checkSession
        }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps) (Home); 