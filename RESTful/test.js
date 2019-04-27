// Test script
//
// - Makes a put request, followed by a get request
// - Makes the get request inside the callback of the
//   put request, to ensure the put request completes 
//   first... but how well will this scale if we had
//   to chain together many requests?
//

var http = require('http');

// get request callback
getCallback = function(response)
{
  var str = "";
  response.on('data', function(chunk) { str += chunk;});
  response.on('end', function(){

    // output response body returned from the get request
    console.log(str);

  });
}

// get request options
var getOptions = {
  method: 'get',
  host: 'localhost',
  port: '3000',
  path: '/api'
}

// Callback for the initial put request
putCallback = function(response)
{
  var str = "";
  response.on('data', function(chunk) { str += chunk; });
  response.on('end', function()
  {
    // Output the response we get back
    console.log(str);

    // fire off the next request (a get request)
    http.request(getOptions,getCallback).end();

  });
}

//put all
// options for the put request
var postMethod = {
    method: 'post',
    host: 'localhost',
    port: '3000',
    path: '/api'
}
// data for the body of our put request
var putArrayData =
[{"item":"Poutine","description":"Made with the best potatoes with gravy and squeaky cheese curds","price":8},
{"item":"Frozen Gourmet Burgers","description":"Burgers, but frozen and super fancy","price":10},
{"item":"Sparkling Soda","description":"The not-so-bad drink from the sparkling drink family","price":15}
{"item":"Eggplants","description":"The best kind of vegetable in more ways than one","price":3}]

// make the put request
putAllReq = http.request(postMethod, getCallback);
putAllReq.write(JSON.stringify(putArrayData));
putAllReq.end();

// options for the put request
var putOptions = {
  method: 'put',
  host: 'localhost',
  port: '3000',
  path: '/api/1'
}

// data for the body of our put request
var putData =
{
  "item" : "Cake",
  "description" : "Chocolate with Whipped Cream Frosting",
  "price" : "50"
}

// make the put request
putReq = http.request(putOptions, putCallback);
putReq.write(JSON.stringify(putData));
putReq.end();
