import React, { Component } from 'react';
import logo from './logo.svg';

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
            <i className="fa fa-star" />
            <a href={ repo.stargazers_url }>
              { repo.stargazers_count }
            </a>
          </div>
          <div className="forks">
            <i className="fa fa-code-fork" />
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
