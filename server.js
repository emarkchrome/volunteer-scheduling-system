var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.get('/', function(req, res) {

});

app.listen(port, function() {
  console.log('Server running on port ' + port);
})
