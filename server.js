var Redis = require('ioredis');

//var redis = new Redis('6379');

var bodyParser = require('body-parser');

var moment = require('moment');

var express = require('express');

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 5000;

app.post('/api/create-event', function(req, res) {
  var eventDetails = {
    eventName: req.body.eventName
  }
  res.json({ eventName: eventDetails.eventName})
});

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
