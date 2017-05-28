import React, { Component } from 'react';
import styled from 'styled-components';

const RepoCard = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const RepoTitle = styled.h2`
  font-weight: normal;
`;

const RepoTitleLink = styled.a`
  color: #007afb;
`;

const RepoTitleIcon = styled.i`
  color: #ffc500;
  margin-right: 7px;
`;

const RepoDescription = styled.p`
`;

const Counters = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const Counter = styled.div`
  margin-right: 20px;
`;

const Icon = styled.i`
  color: #333;
  margin-right: 5px;
  font-size: 1.25em;
`;

const CounterLink = styled.a`
  :link, :visited {
    color: #777;
    text-decoration: none;
  }

  :hover, :active {
    color: #ff5600;
  }
`;

class Repo extends Component {
  render() {
    const repo = this.props.data;
    return (
      <RepoCard>
        <RepoTitle>
          <RepoTitleIcon className="fa fa-star" />
          <RepoTitleLink href={ repo.html_url }>
            { repo.full_name }
          </RepoTitleLink>
        </RepoTitle>
        <RepoDescription>
          { repo.description }
        </RepoDescription>
        <Counters>
          <Counter>
            <Icon className="fa fa-star" />
            <CounterLink href={ repo.stargazers_url }>
              { repo.stargazers_count }
            </CounterLink>
          </Counter>
          <Counter>
            <Icon className="fa fa-code-fork" />
            <CounterLink href={ repo.forks_url }>
              { repo.forks_count }
            </CounterLink>
          </Counter>
        </Counters>
      </RepoCard>
    );
  }
}

export default Repo;
