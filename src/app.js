var path = require('path');
var express = require('express');
var app = express();

var options = null;
// for heroku
if (process.env.PORT) {
  var env = process.env;
  options = {
    key: process.env.TWIBOT_TWITTER_KEY,
    secret: process.env.TWIBOT_TWITTER_SECRET,
    token: process.env.TWIBOT_TWITTER_TOKEN,
    token_secret: process.env.TWIBOT_TWITTER_TOKEN_SECRET,
  };
}
else {
  options = require('./config').options;
}

app.set('options', options);
app.set('port', (process.env.PORT || 5000));
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function(req, res) {
//   res.send('This is Twitter-bot application.')
// });

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

module.exports = app;