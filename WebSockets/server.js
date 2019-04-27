// Required packages
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Return the teacher page
app.get('/bidder', function(req,res){
  res.sendFile(__dirname + '/bidder.html');
});

// Return the student page
app.get('/auction', function(req,res){
  res.sendFile(__dirname + '/auction.html');
});

// variable for item
var itemDesciption;
var price;

//variable for bidder
var bidderName;

// If we have a connection....
io.on('connection', function(socket){

  socket.on("submitquestion", function(quesdata)
  {
    bidderName = "";
    console.log(bidderName);
    // Set the correct answer
    itemDesciption = quesdata.item;
    price = quesdata.price;

    // Make sure we've received the question OK
    console.log("Item submitted: " + JSON.stringify(quesdata));
   
    // Broadcast the question to all the students
    socket.broadcast.emit("deliverquestion", {item: itemDesciption, price: price,
      name: bidderName});

  });

  socket.on("answerquestion", function(answerdata){
    if(price< answerdata.bid){
      price = answerdata.bid;
      bidderName = answerdata.name;
    }
    console.log("Item submitted: " + JSON.stringify(answerdata));
    // Send back the result (right or wrong), along with 
    // the right answer
    console.log(price);
    console.log(bidderName);
    io.to(socket.id).emit("resultquestion",
    {item: itemDesciption, price: price,
     name: bidderName});
                         
  });

});

// Start the server
http.listen(3000, function(){
  console.log('listening on *:3000');
});

