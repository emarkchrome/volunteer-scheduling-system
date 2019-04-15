import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    /*fetch('/api/create-event', {
      method: 'POST',
      body: JSON.stringify({
        'eventName': 'Fundraiser',
        'eventStartDate': '14:00 24 05 2019',
        'eventEndDate': '19:00 24 05 2019',
        'numberOfSlots': 5,
        'availableVolunteerSlots': 4
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
  }*/
  fetch('/api/get-events', {
    method: 'GET',
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
        <header>
          <h1>Volunteer Scheduler</h1>
        </header>
      </div>
    );
  }
}

export default App;
