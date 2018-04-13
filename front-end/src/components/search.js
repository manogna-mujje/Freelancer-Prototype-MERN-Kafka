import React, {Component} from 'react';
import ProjectItem from './projectItem';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            initialItems: this.props.projects,
            currentPage: 1,
            itemsPerPage: 4,
            items: []
        }
        console.log(this.props);
        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
    
    componentWillMount(){
      this.setState({
          items: this.state.initialItems
      });
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
      let filteredItems = this.state.items;

      // Logic for displaying current page items
      const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
     
      var currentItems = [];

      if(filteredItems.length >= this.state.itemsPerPage) {
        console.log(`slicing`);
        currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
      } else {
        console.log(`No slicing`);
        currentItems = (filteredItems);
      }

      // Retrieve each item from the array of Project Items
      let projectItems;
      console.log(typeof(currentItems));
      projectItems = currentItems.map((project, index) => {
          return (
              <ProjectItem key={index} project={project} user={this.props.user} currentUser = {this.props.currentUser}/>
          );
      });
      
      if(filteredItems.length === 0) {
        projectItems = "No items listed under filtered criteria. Please search again."
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
              <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
              </fieldset>
              </form>
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

