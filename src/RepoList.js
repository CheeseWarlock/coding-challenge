import React, { Component } from 'react';
import logo from './logo.svg';
import Repo from './Repo.js';

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.loadData();
  }

  loadData() {
    const url = `https://api.github.com/users/${ this.props.user }/starred`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      });
  }

  render() {
    const repoElements = this.state.repos.map((repo) => {
      return (
        <Repo repo={ repo }/>
      );
    });
    return (
      <div className="RepoList" id="container">
        <h1>
          { "Starred repos for " + this.props.user }
        </h1>
        { repoElements }
      </div>
    );
  }
}

export default RepoList;
