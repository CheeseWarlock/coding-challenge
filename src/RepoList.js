import React, { Component } from 'react';
import styled from 'styled-components';
import debounce from 'debounce';
import Repo from './Repo.js';

const RepoListTitle = styled.h1`
    text-align: center;
`;

const RepoListNameField = styled.input`
  border: 0;
  background: none;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  border-bottom: 2px solid #333;
  text-align: center;
  color: inherit;

  :focus {
    background-color: #fff;
    outline: 0;
  }
`;

const RepoListContainer = styled.div`
  font-family: 'Segoe Ui';
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

const EmptyListNotice = styled.p`
  text-align: center;
`;

class RepoList extends Component {
  constructor(props) {
    super(props);

    this.delayedChangeCallback = debounce(this.loadData, 400);

    this.state = {
      loading: true,
      user: this.props.user,
      repos: []
    };
    this.loadData(this.props.user);
  }

  handleChange(event) {
    event.persist();
    this.setState({
      loading: true,
      user: event.target.value
    });
    this.delayedChangeCallback(event.target.value);
  }

  loadData(user) {
    const url = `https://api.github.com/users/${ user }/starred`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          repos: data.length ? data : []
        });
      });
  }

  buildRepoList() {
    if (this.state.loading) {
      return (
        <EmptyListNotice>
          Loading...
        </EmptyListNotice>
      );
    } else if (this.state.repos.length) {
      return this.state.repos.map((repo) => {
        return (
          <Repo data={ repo }/>
        );
      });
    } else {
      return (
        <EmptyListNotice>
          No starred repos found for { this.state.user }.
        </EmptyListNotice>
      );
    }
  }

  render() {
    return (
      <RepoListContainer>
        <RepoListTitle>
          Starred repos for&nbsp;
          <RepoListNameField value={ this.state.user }
                             onChange={ (event) => this.handleChange(event) } />
        </RepoListTitle>
        { this.buildRepoList() }
      </RepoListContainer>
    );
  }
}

export default RepoList;
