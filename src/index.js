import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// Globals
const url = `https://api.github.com/users/axiomaticdesign/starred`;
const el = document.getElementById('container');

// Get the Stuff
fetch(url)
  .then(res => res.json())
  .then(data => handler(data));

// Handle it
const handler = (data) => {
  data.map((repo) => {
    // Repo container
    const newEl = document.createElement('div');
    newEl.classList.add('repo');
    // Name of repo
    const repoNameEl = document.createElement('h2');
    const repoLinkEl = document.createElement('a');
    const starIcon = document.createElement('i');
    starIcon.classList.add('fa', 'fa-star');
    repoLinkEl.href = repo.html_url;
    repoLinkEl.textContent = repo.full_name;
    repoNameEl.appendChild(starIcon);
    repoNameEl.appendChild(repoLinkEl);
    // Description
    const descEl = document.createElement('p');
    descEl.textContent = repo.description;
    // List of number stuff
    const counterEl = document.createElement('div');
    counterEl.classList.add('counters');
    // Count Stars
    const starsEl = document.createElement('div');
    starsEl.classList.add('stars');
    const starsIcon = document.createElement('i');
    starsIcon.classList.add('fa', 'fa-star');
    const starsCount = document.createElement('a');
    starsCount.href = repo.stargazers_url;
    starsCount.textContent = repo.stargazers_count;
    starsEl.appendChild(starsIcon);
    starsEl.appendChild(starsCount);
    counterEl.appendChild(starsEl);
    // Count Forks
    const forksEl = document.createElement('div');
    forksEl.classList.add('forks');
    const forksIcon = document.createElement('i');
    forksIcon.classList.add('fa', 'fa-code-fork');
    const forksCount = document.createElement('a');
    forksCount.href = repo.forks_url;
    forksCount.textContent = repo.forks_count;
    forksEl.appendChild(forksIcon);
    forksEl.appendChild(forksCount);
    counterEl.appendChild(forksEl);
    // Add elements into repo box
    newEl.appendChild(repoNameEl);
    newEl.appendChild(descEl);
    newEl.appendChild(counterEl);
    // Add to container
    el.appendChild(newEl);
  });
};
