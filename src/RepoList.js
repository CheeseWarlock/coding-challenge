import React, { Component } from 'react';
import styled from 'styled-components';
import Repo from './Repo.js';

const RepoListTitle = styled.h1`
  text-align: center;
`;

const RepoListContainer = styled.div`
  font-family: 'Segoe Ui';
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

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
        <Repo data={ repo }/>
      );
    });
    return (
      <RepoListContainer>
        <RepoListTitle>
          { "Starred repos for " + this.props.user }
        </RepoListTitle>
        { repoElements }
      </RepoListContainer>
    );
  }
}

export default RepoList;
