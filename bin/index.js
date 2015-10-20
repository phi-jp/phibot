
var app = require('../src/app');
var rss = require('../src/rss');
var Twit = require('twit');
var CronJob = require('cron').CronJob;
var moment = require('moment');

var T = new Twit({
  consumer_key: app.get('options').key,
  consumer_secret: app.get('options').secret,
  access_token: app.get('options').token,
  access_token_secret: app.get('options').token_secret,
});


var tweet = function(mode, callback) {
  var rssCallback = function(item) {
    item.categories = item.categories || [];
    var categories = item.categories.map(function(c) {
      return '#' + c.replace(' ', '_');
    });
    categories.push('#phiary');

    var message = [item.title, item.link, categories.join(' ')].join(' ');

    T.post('statuses/update', { status: message }, function(err, data, response) {
      console.log('Tweet!');
    });

    callback && callback(message);
  };

  var path = 'http://phiary.me/rss?limit=500';

  if (mode === 'random') {
    rss.pick('http://phiary.me/rss?limit=500', rssCallback);
  }
  else if (mode === 'latest') {
    rss.latest('http://phiary.me/rss?limit=500', rssCallback);
  }
};


app.post('/post', function(req, res) {
  console.log('post');
  tweet('random', function(message) {
    console.log(message);
    res.send(message);
  });
});


app.post('/latest', function(req, res) {
  console.log('latest');
  tweet('latest', function(message) {
    console.log(message);
    res.send(message);
  });
});


var cronTime = '0 0 0-14 * * *';

/*

var cronTime = '0 0 0-14 * * *';

new CronJob({
  cronTime: cronTime,
  onTick: function () {
    tweet();
  },
  start: true
});

function tweet(){
  var message = moment().utc().add(9, 'h').format("ただいま MM月DD日 HH時mm分です。");
  console.log(message);

  T.post('statuses/update', { status: message }, function(err, data, response) {
    //console.log('Tweet!');
  });
}
*/