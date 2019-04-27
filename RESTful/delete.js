// An example of making a delete request

var http = require('http');

// delete request options
var options = {
  method: 'delete',
  host: 'localhost',
  port: '3000',
  path: '/api'
}

// delete request callback
callback = function(response)
{
  var str = "";
  response.on('data', function(chunk) { str += chunk; });
  response.on('end', function()
  {
    console.log(str);
  });
}

// make the delete request
http.request(options, callback).end();
