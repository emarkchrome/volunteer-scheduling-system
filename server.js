var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.get('/api/hello', function(req, res) {
  res.json({ hello: 'hello' });
});

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
