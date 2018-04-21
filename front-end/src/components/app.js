import React, { Component } from 'react';
import Menu from './menu';
import Section1 from './section1';

class App extends Component {
  render() {
    return (
      <div className="container">
          <Menu />
          <img  id ="bg-img" src="Blue.jpg"/>
        </div>
    );
  }
}

export default App;
