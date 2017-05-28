import React, { Component } from 'react';
import RepoList from './RepoList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RepoList user="axiomaticdesign"/>
      </div>
    );
  }
}

export default App;
