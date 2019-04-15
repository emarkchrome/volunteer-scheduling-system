import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { events: [], eventName: null, eventStartDate: null, eventEndDate: null, numberOfSlots: null, availableVolunteerSlots: null };
  }
  componentWillMount() {
    var thisInstance = this;

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
        thisInstance.setState({ events: data.events });
      });
  }
  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }
  createEvent(e) {

    e.preventDefault();

    var thisInstance = this;

    fetch('/api/create-event', {
      method: 'POST',
      body: JSON.stringify({
        'eventName': thisInstance.state.eventName,
        'eventStartDate': thisInstance.state.eventStartDate,
        'eventEndDate': thisInstance.state.eventEndDate,
        'numberOfSlots': thisInstance.state.numberOfSlots,
        'availableVolunteerSlots': thisInstance.state.availableVolunteerSlots
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
        window.location.reload();
      });

  }
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
        </header>
        <div className="events">
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
          {
            this.state.events.length == 0 && (
              <h3>You haven't made any events. Try making one to see it appear here.</h3>
            )
          }
        </div>
        <div className="create-event-form">
          <hr></hr>
          <h2>Create Event:</h2>
          <form onSubmit={this.createEvent.bind(this)}>
            <input required type="text" placeholder="Event Name" name="eventName" onChange={this.handleInputChange.bind(this)} /><br /><br />
            <input required type="datetime-local" placeholder="Event Start Time" name="eventStartDate" onChange={this.handleInputChange.bind(this)} /><br /><br />
            <input required type="datetime-local" placeholder="Event End Time" name="eventEndDate" onChange={this.handleInputChange.bind(this)} /><br /><br />
            <input required type="number" placeholder="Into how many equally sized timeslots do you want to split the event?" name="numberOfSlots" onChange={this.handleInputChange.bind(this)} /><br /><br />
            <input required type="number" placeholder="How many volunteers should be able to signup for each timeslot?" name="availableVolunteerSlots" onChange={this.handleInputChange.bind(this)} /><br /><br />
            <input required type="submit" value="Create Event"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
