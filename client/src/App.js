import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('/api/create-event', {
      method: 'POST',
      body: JSON.stringify({
        'eventName': 'Fundraiser'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
