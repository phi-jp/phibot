var express = require('express');
var app = express();

var options = null;
if (process.env.PORT) {
  options = {
    key: '',
    secret: '',
    token: '',
    token_secret: '',
  };
}
else {
  options = require('./options');
}

app.set('options', options);
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('This is Twitter-bot application.')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

module.exports = app;