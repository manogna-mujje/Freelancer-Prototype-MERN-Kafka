import React, {Component} from 'react';
import * as API from '../APIs/api';
import { connect } from 'react-redux';
import {checkSession} from '../actions/index';
import { bindActionCreators } from 'redux';

class PostProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            newProject: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        console.log(this.props.checkSession());
         this.props.checkSession().then((res)=> {
             console.log(res);
             if(this.props.isLoggedin){
                 this.setState({
                     user: this.props.user
                 })
             }
         });
     }

    static defaultProps = {
        ranges : ['Micro Project($10-30 USD)', 'Simple Project($30-250 USD)', 'Very Small Project($250-750 USD)', 'Small Project($750-1500 USD)', 'Medium Project($1500-3000 USD)', 'Large Project($3000-5000 USD)']
    }

    handleSubmit(event){
        API.postProject(this.refs.title.value, this.refs.description.value, this.refs.skills.value, this.state.user, this.refs.range.value)
        .then((res) => {
            if(res.status === 200){
                console.log('Push to different page');
                this.props.history.push('/projects/' + this.refs.title.value);
            } else {
                document.getElementById('error-post-project').style.display = "block";
            }
        })
        event.preventDefault();
    }

    render(){
        let rangeOptions = this.props.ranges.map(range => {
            return <option key={range} value={range}> {range} </option>
        });
        return (
            <div className="post-project">
                <p id="error-post-project" > Error occured while posting project to Database.</p>
                <form onSubmit= {this.handleSubmit}>
                    <div className="Fields" id="title">
                        <h2> Tell us what you need done </h2>
                        <p> Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</p>
                    </div>
                    <div className="Fields" id="project-name">
                        <label> <div> Choose a name for your project </div></label> <br />
                        <input ref="title" placeholder="e.g. Build me a website" />
                    </div>
                    <div className="Fields" id="project-description">
                        <label> <div> Tell us more about your project </div></label> <br />
                        <p> Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</p>
                        <input ref="description" placeholder="Describe your project here..." />
                    </div>
                    <div className="Fields" id="skills">
                        <label> <div> What skills are required?  </div></label> <br />
                        <p> Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in..</p>
                        <input ref="skills" placeholder="What skills are required?" />
                    </div>
                    <div  id="payment">
                        <label> <div> How do you want to pay?  </div></label> <br />
                        <input type="radio" name="paymode" value="fixed"> Fixed price </input> <br/>
                        <input type="radio" name="paymode" value="hourly"> Hourly </input>
                    </div>
                    <div className="Fields" id="budget">
                        <label> <div> What is your estimated budget?  </div></label> <br />
                        <select ref="range">
                            {rangeOptions}
                        </select><br />
                        <br />
                    </div>
                    <input className= "menu-button" id="project-submit" type="submit" value="Post My Project"></input>
                </form>
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


export default connect(mapStateToProps, mapDispatchToProps)(PostProject); 