import React, {Component} from 'react';
import ProjectItem from './projectItem';
import NavigationBar from './navigationBar';
import * as API from '../APIs/api';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            initialItems: [],
            currentPage: 1,
            itemsPerPage: 4,
            items: []
        }
        console.log(this.props);
        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMyProjects = this.handleMyProjects.bind(this);
        this.handleMyBids = this.handleMyBids.bind(this);
    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
    
    componentWillMount(){
      API.showProjects().then((res) => {
        res.json().then((data) => {
            this.setState({
              items: data,
              initialItems: data
            })
        })
      })
    }

    handleMyProjects(){
        console.log('My projects function');
        API.myProjects().then((res)=>{
            res.json().then((data) => {
                this.setState({
                  initialItems: data,
                  items: data
                })
            }).catch(()=>{
              this.setState({
                initialItems: [], items: []
              })
            })
        })
    }

    handleMyBids(){
        console.log('My Bids function');
        API.myBids().then((res)=>{
            res.json().then((data) => {
                console.log(data);
                this.setState({
                  initialItems: data,
                  items: data
                })
            })
        })
    }

    filterList(event) {
    let totalProjects = this.state.initialItems;
      var updatedList = totalProjects.map((item) => {
            return item.name;
          })

      let projectItemsArray = [];

      var change = updatedList.filter(function(item, index){
        if(item.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
          if(event.target.value === ""){
            projectItemsArray = totalProjects;
          }
          projectItemsArray.push(totalProjects[index]);
          return item;
        }
      });

      console.log(projectItemsArray);
    this.setState({items: projectItemsArray});
      console.log(this.state.items);
  }

    render(){
      console.log('Rendering...')
      console.log(this.state.initialItems);
      let filteredItems = this.state.items;

      // Logic for displaying current page items
      const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
     
      var currentItems = [];
      let projectItems;

      if(filteredItems.length >= this.state.itemsPerPage) {
        console.log(`slicing`);
        currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
      } else if(filteredItems.length < this.state.itemsPerPage && filteredItems.length !== 0 ){
        console.log(`No slicing`);
        currentItems = (filteredItems);
      } else if(filteredItems.length === 0) {
        projectItems = "No items listed under filtered criteria. Please search again."
      }

      if(filteredItems.length !== 0) {
        // Retrieve each item from the array of Project Items
        console.log(currentItems);
        projectItems = currentItems.map((project, index) => {
            console.log(project)
            return (
                <ProjectItem key={index} project={project} user={this.props.user} currentUser = {this.props.currentUser}/>
            );
        });
      }
      
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(filteredItems.length / this.state.itemsPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li 
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
        
        return (
            <div className="filter-list">
              <form>
              <fieldset className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Search for a project" onChange={this.filterList}/>
              </fieldset>
              </form>
              <NavigationBar myProjects={this.handleMyProjects} myBids={this.handleMyBids}/> <br />
              <div className="Projects">
              {projectItems}
              </div>
              <ul id="page-numbers">
              {renderPageNumbers}
              </ul>
            </div>
          );
    }
}

export default Search;

