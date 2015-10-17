
var app = require('../src/app');
var rss = require('../src/rss');
var Twit = require('twit');
var CronJob = require('cron').CronJob;
var moment = require('moment');

// 
var FeedParser = require('feedparser');
var request = require('request');


var T = new Twit({
  consumer_key: app.get('options').key,
  consumer_secret: app.get('options').secret,
  access_token: app.get('options').token,
  access_token_secret: app.get('options').token_secret,
});


var tweet = function() {
  rss.pick('http://phiary.me/rss?limit=500', function(item) {
    var categories = item.categories.map(function(c) {
      return '#' + c;
    })
    categories.push('#phiary');

    var message = [item.title, item.link, categories.join(' ')].join(' ');
    console.log(message);

    T.post('statuses/update', { status: message }, function(err, data, response) {
      console.log('Tweet!');
    });
  });
};

tweet();

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