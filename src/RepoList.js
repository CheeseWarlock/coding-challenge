import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
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

const RepoListNotice = styled.p`
  text-align: center;
`;

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.i`
  animation: ${ Rotate } infinite 3s linear;
  font-size: 2em;
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
    if (event.target.value.length) {
      event.persist();
      this.setState({
        loading: true,
        user: event.target.value
      });
      this.delayedChangeCallback(event.target.value);
    } else {
      this.setState({
        loading: false,
        user: "",
        repos: []
      });
    }
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
        <RepoListNotice>
          <LoadingSpinner className="fa fa-spinner"/>
        </RepoListNotice>
      );
    } else if (this.state.repos.length) {
      return this.state.repos.map((repo) => {
        return (
          <Repo data={ repo }/>
        );
      });
    } else if (this.state.user.length) {
      return (
        <RepoListNotice>
          No starred repos found for { this.state.user }.
        </RepoListNotice>
      );
    } else {
      return (
        <RepoListNotice>
          Enter a GitHub username to see their starred repos!
        </RepoListNotice>
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
