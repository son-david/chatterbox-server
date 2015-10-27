/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var storage = [];

var requestHandler = function(request, response) {

  var sendToEnd = {results: []};

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  if (request.method === 'GET') {

    response.writeHead(200, headers);
    response.end(JSON.stringify(sendToEnd));
  }

  if (request.method === 'POST') {
    // gather info from request itself, grab data that we want, push it up to storage

    var body = '';
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      var newMessage = JSON.parse(body);
      storage.push(newMessage);
      response.writeHead(201, headers);
      response.end(JSON.stringify(storage));
    });
  }

  console.log("Serving request type " + request.method + " for url " + request.url);

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10 // Seconds.
};

module.exports = {
  requestHandler: requestHandler
};