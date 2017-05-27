import React, { Component } from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

const Icon = styled.i`
  color: #333;
  margin-right: 5px;
  font-size: 1.25em;
`;

class Repo extends Component {
  render() {
    const repo = this.props.repo;
    return (
      <div className="repo">
        <h2>
          <i className="fa fa-star" />
          <a href={ repo.html_url }>
            { repo.full_name }
          </a>
        </h2>
        <p>
          { repo.description }
        </p>
        <div className="counters">
          <div className="stars">
            <Icon className="fa fa-star" />
            <a href={ repo.stargazers_url }>
              { repo.stargazers_count }
            </a>
          </div>
          <div className="forks">
            <Icon className="fa fa-code-fork" />
            <a href={ repo.forks_url }>
              { repo.forks_count }
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Repo;
