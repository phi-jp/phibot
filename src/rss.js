// 
var FeedParser = require('feedparser');
var request = require('request');

module.exports = {
  get: function(path, callback) {
    var req = request(path);
    var feedparser = new FeedParser();
    var meta = null;
    var items = [];

    req.on('response', function (res) {
        this.pipe(feedparser);
    });

    feedparser.on('readable', function() {
      var meta = this.meta;
      while(item = this.read()) {
        items.push(item);
      }
    });

    feedparser.on('end', function() {
      callback && callback(meta, items);
    });
  },

  pick: function(path, callback) {
    this.get(path, function(meta, items) {
      var index = (Math.random()*items.length)|0;
      var item = items[index];
      callback && callback(item);
    });
  },

  latest: function(path, callback) {
    this.get(path, function(meta, items) {
      callback && callback(items[0]);
    });
  },
};
