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
  joinTimeslot(e) {
    fetch('/api/join-timeslot', {
      method: 'POST',
      body: JSON.stringify({
        'eventId': e.target.getAttribute('eventid'),
        'timeslotId': e.target.getAttribute('timeslotId')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(data) {
      return data.text();
    })
    .then(function(data) {
      console.log(data);
      window.location.reload();
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Volunteer Scheduler</h1>
          {
            this.state.events.map((event, index) => {
              return (
                <ul key={index}>
                  <li>Event Name: { event.eventName }</li>
                  <li>Event Date: { moment(event.eventStartDate, 'HH:mm DD MM YYYY').format('DD MMMM, YYYY') }</li>
                  <li>Event Time: { moment(event.eventStartDate, 'HH:mm DD MM YYYY').format('HH:mm') } - { moment(event.eventEndDate, 'HH:mm DD MM YYYY').format('HH:mm') }</li>
                  <li>Timeslots
                    <ul>
                      { event.timeSlotData.map((timeslot, timeslotIndex) => {
                        return (
                          <li key={timeslotIndex}><br></br>
                            <ul>
                              <li>Time: { moment(timeslot.slotStartDate, 'HH:mm DD MM YYYY').format('HH:mm') } - { moment(timeslot.slotEndDate, 'HH:mm DD MM YYYY').format('HH:mm') }</li>
                              <li>Available Slots: { timeslot.availableVolunteerSlots - timeslot.volunteerSlotsTaken } / { timeslot.availableVolunteerSlots }</li>
                              <li timeslotid={timeslot.id} eventid={event.id} onClick={this.joinTimeslot.bind(this)}>Join Timeslot</li>
                            </ul>
                          </li>
                        )
                      }) }
                    </ul>
                  </li>
              </ul>
              )
            })
          }
        </header>
        <div className="events"></div>
      </div>
    );
  }
}

export default App;
