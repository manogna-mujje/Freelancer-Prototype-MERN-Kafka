import React, { Component } from 'react';
import Menu from './menu';
import Section1 from './section1';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Menu />
          <Section1 />
        </div>
    );
  }
}

export default App;
