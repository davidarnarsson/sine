import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
     <div id="wrapper">
      {this.props.children}
     </div>
    );
  }
}

export default App;
