// var http = require("http");
// var handleRequest = require('./request-handler');
var express = require('express');
var http = require('http');
var app = express();

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "applicaton/json"
};

var sendToEnd = {results: []};

app.options('/classes/messages/', function(req, res) {
  res.writeHead(200, headers);
  res.end(JSON.stringify(sendToEnd));
});

app.get('/classes/messages/', function(req, res) {
  res.writeHead(200, headers);
  res.end(JSON.stringify(sendToEnd));
});

app.get('/classes/room1/', function(req, res) {
  res.writeHead(200, headers);
  res.end(JSON.stringify(sendToEnd));
});

app.post('/classes/messages/', function(req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    var newMessage = JSON.parse(body);
    newMessage.objectId = sendToEnd.results.length;
    sendToEnd.results.push(newMessage);
    res.writeHead(201, headers);
    res.end(JSON.stringify(sendToEnd));
  });
});

app.get('*', function(req, res) {
  res.writeHead(404, headers);
  res.end('Error');
});

http.createServer(app).listen(3000);