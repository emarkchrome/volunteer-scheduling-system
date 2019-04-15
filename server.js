var Redis = require('ioredis');

var redis = new Redis('6379');

var bodyParser = require('body-parser');

var moment = require('moment');

var express = require('express');

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 5000;

app.post('/api/create-event', function(req, res) {
  var timeSlotData = [];

  var eventDuration = moment.duration(moment(req.body.eventEndDate, 'HH:mm DD MM YYYY').diff(moment(req.body.eventStartDate, 'HH:mm DD MM YYYY')));

  var timeSlotDuration = eventDuration.asMinutes() / req.body.numberOfSlots;

  for (let i = 0; i < req.body.numberOfSlots; i++) {
    timeSlotData.push({
      id: Math.round(Math.random() * 100000000000),
      slotStartDate: moment(req.body.eventStartDate, 'HH:mm DD MM YYYY').add(timeSlotDuration * i, 'minutes').format('HH:mm DD MM YYYY'),
      slotEndDate: moment(req.body.eventStartDate, 'HH:mm DD MM YYYY').add(timeSlotDuration * (i + 1), 'minutes').format('HH:mm DD MM YYYY'),
      availableVolunteerSlots: req.body.availableVolunteerSlots,
      volunteerSlotsTaken: 0
    });
  }

  var eventDetails = {
    eventName: req.body.eventName,
    id: req.body.eventName.toLowerCase(),
    eventStartDate: req.body.eventStartDate,
    eventEndDate: req.body.eventEndDate,
    numberOfSlots: req.body.numberOfSlots,
    availableVolunteerSlots: req.body.availableVolunteerSlots,
    timeSlotData: timeSlotData,
  };

app.post('/api/join-timeslot', function(req, res) {

  var eventId = req.body.eventId;
  var timeslotId = req.body.timeslotId;
  res.send(`Joining timeslot ${timeslotId} in event ${eventId}.`);

  redis.get('events', function(error, result){
    var currentEvents = JSON.parse(result);
    var volunteerSlotsTaken = currentEvents.find(function(index) { return index.id == eventId }).timeSlotData.find(function(index) { return index.id == timeslotId }).volunteerSlotsTaken;
    if (volunteerSlotsTaken < 4) {
      currentEvents.find(function(index) { return index.id == eventId }).timeSlotData.find(function(index) { return index.id == timeslotId }).volunteerSlotsTaken++;
    } else {
      res.send('noslotsleft');
    }
    redis.set('events', JSON.stringify(currentEvents));
  });

});

app.get('/api/get-events', function(req, res) {

  redis.get('events', function(error, result) {
    res.json({ 'events': JSON.parse(result) });
  });

});

app.get('/api/reset-database', function(req, res) {

  redis.flushdb();
  redis.set('events', '[]');
  res.send('Database reset!');

})

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
