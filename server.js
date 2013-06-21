var express = require('express');
var mime = require('mime');
var fs = require('fs');
var vino = require('./vino');
var app = express();

var vino = require('./vino');

client = new vino({username: 'josh@synthvine.com', password: 'passw3rd'});
client.login(function(err, key, username) {

    if (err) throw new Error(err);
    console.log('\n\n\nsuccessfully logged in, key and username: ', key, username, '\n\n\n');

});


app.get('/feed', function(req, res){

  client.tagSearch('synthpatch', function(err, feed) {
      if (err) throw new Error(err);
      // console.log('your timeline', feed);
      res.send(feed.records);
      // for (var i in feed.records) {
      //     var entry = feed.records[i];
      //     console.log(entry.description, entry.videoUrl);
      // }
  });
  
  // var body = 'Hello World';
  // res.setHeader('Content-Type', 'text/plain');
  // res.setHeader('Content-Length', body.length);
  // res.end(body);
});

app.get('*', function(req, res) {
  // send all urls to render index
  var path = 'index.html';

  var absPath = __dirname + '/' + path;
  var mimeType = mime.lookup(absPath);

  // load file
  fs.readFile(absPath, function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end();
    } else {
      res.setHeader('Content-Type', mimeType);
      res.writeHead(200);
      res.end(content, 'utf-8');
    }
  });
});

app.listen(8888);
console.log('Listening on port 8888');
