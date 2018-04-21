import React, {Component} from 'react';
import * as API from '../APIs/api';
import { checkSession } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from './bs-navbar';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageURL: '',
            message: '',
            user: '',
            isEditable: false
          };
        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        API.profile().then((res) => {
            res.json().then((body)=>{
                if(body.error){
                    console.log(body.error);
                    this.props.history.push('/login');
                    return;
                }
                console.log(body.user);
                this.setState({ user: body.user });
                this.setState({ imageURL: `http://54.151.54.81:3001/public/${body.user.username}.jpg`});
            })
        });
    }

    handleUpload(){
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.props.user);
        API.upload(data).then((response) => {
            response.json().then((body) => {
              this.setState({ imageURL: `http://54.151.54.81:3001/${body.file}` });
            console.log(body);
            });
          });
    }

    handleClick(){
        API.logout().then((res) => {
           if(res.status === 200){
            this.props.history.push('/login');
           }
        })
    }

    handleEdit(){
        this.setState({
            isEditable: !this.state.isEditable
        });
        setTimeout(()=> {
            if(this.state.isEditable) {
                document.getElementById('edit-profile').innerHTML = "View Profile"
            } else {
                document.getElementById('edit-profile').innerHTML = "Edit Profile"
            }
        }, 10);        
    }


    handleSubmit(event){
        event.preventDefault();
        API.updateProfile(this.refs.fname.value, 
                          this.refs.lname.value, 
                          this.refs.country.value, 
                          this.refs.location.value, 
                          this.refs.phone.value
                        ).then((response) => {
                            response.json().then((body) => {
                              this.setState({ message: 'Profile updated' });
                            });
                          });
    }

    render(){
        return(
            <div id= "profile">
                <div className="row">
                    <div className="col-sm-8">
                    <h2>Hello, {this.props.match.params.user}</h2>
                    </div>
                    <div className="col-sm-4">
                    <button type="button" id="logout"  className="btn btn-dark" onClick={this.handleClick}>Logout</button>
                    </div>
                </div>
                <br/> 
                <NavBar user={this.props.match.params.user}/> <br/>
                <button type="button" id="edit-profile"  className="btn btn-primary" onClick={this.handleEdit}>Edit Profile</button>
                {(!this.state.isEditable) ?
                    <div id = "viewable-profile"> 
                         <div className="row">
                            <div className="col-sm-2">
                                <img id="pic" src={this.state.imageURL} alt="img" />
                            </div>
                            <div className="col-sm-10">
                                <p> First Name: {this.state.user.firstName}</p><br/>
                                <p> Last Name: {this.state.user.lastName}</p><br/>
                                <p> Location: {this.state.user.location}</p><br/>
                                <p> Country: {this.state.user.country}</p><br/>
                                <p> Email: {this.state.user.email}</p><br/>
                                <p> Phone: {this.state.user.phone}</p><br/>
                            </div> 
                        </div>
                        <br/>
                    </div> :
                    <div id = "editable-profile">  
                        <div className="row">
                            <div className="col-sm-3">
                                <div id="profile-picture"> 
                                    <input ref={(ref) => {this.uploadInput = ref;}} type="file" />
                                    <img id="pic" src={this.state.imageURL} alt="img" />
                                </div>
                                <button type="button" id="upload-button"  className="btn btn-primary" onClick={this.handleUpload}> Upload </button>
                            </div>
                            <div className="col-sm-9">
                                <h4> Update your profile: </h4>
                                <div className="row"></div>
                                    <form className="col-sm-4" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label for="fname">First Name:</label>
                                        <input type="text" className="form-control" ref="fname" placeholder="Enter First Name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="lname">Last Name:</label>
                                        <input type="text" className="form-control" ref="lname" placeholder="Enter Last Name"  />
                                    </div>
                                    <div className="form-group">
                                        <label for="location">Location:</label>
                                        <input type="text" className="form-control" ref="location" placeholder="Enter Location"  />
                                    </div>
                                    <div className="form-group">
                                        <label for="country">Country:</label>
                                        <input type="text" className="form-control" ref="country" placeholder="Enter Country"  />
                                    </div>
                                    <div className="form-group">
                                        <label for="phone">Phone Number:</label>
                                        <input type="text" className="form-control" ref="phone" placeholder="Enter Phone Number"  />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                
                                <p id="update-response"> {this.state.message} </p>
                            </div>
                        </div>
                    </div> 
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {  
        isLoggedin: state.session.isLoggedin,
        user: state.session.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ 
            checkSession: checkSession
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile); 

