var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("itemInfo.db");
var express = require('express');
var app = express();

// startup a collection of data to manage
db.serialize(function(){

  // create a fresh version of the table
  db.run("DROP TABLE IF EXISTS ItemTable");
  db.run("CREATE TABLE ItemTable (item TEXT, description TEXT, " +
  	     "price INTEGER)");

  // insert initial records into the table
/*  var stmt = db.prepare("INSERT INTO ItemTable VALUES (?,?,?)");
  stmt.run("Poutine", "Made with the best potatoes with gravy and squeaky cheese curds", "8");
  stmt.run("Frozen Gourmet Burgers", "Burgers, but frozen and super fancy", "10");
  stmt.run("Sparkling Soda", "The not-so-bad drink from the sparkling drink family", "15");
  stmt.run("Eggplants", "The best kind of vegetable in more ways than one", "3");
  stmt.finalize();*/

});

// GET the entire collection, send it back as JSON data
app.get("/api",
  function(req,res)
  {
    console.log("GET REQUEST RECEIVED");

  	db.all("SELECT rowid as id, item, description, price FROM ItemTable",
  		   function(err, results)
  		   {
             // send debug info to console
             console.log(JSON.stringify(results));
  
             // send back table data as JSON data
             res.json(results);
  		   });
  });




  // GET the entire collection, send it back as JSON data
app.get("/api/:id",
function(req,res)
{
  console.log("GET ID REQUEST RECEIVED");

  db.all("SELECT rowid as id, item, description, price FROM ItemTable where rowid = ?",req.params.id,
       function(err, results)
       {
           // send debug info to console
           console.log(JSON.stringify(results));

           // send back table data as JSON data
           res.json(results);
       });
});

// PUT request to change a specific item in the collection
app.put("/api",
  function(req,res)
  {
  	console.log("PUT REQUEST RECEIVED");

    var str = "";
    req.on("data", function(chunk) { str += chunk;});
    req.on("end", function() { 
 
      // create the JSON object from the data in the request
      var reqObj = JSON.parse(str);

      // output the JSON object received in the request
      console.log(str);
      for(var a = 0; a< reqObj.length; a++ ){
            // make the update to the database
          db.serialize(function() {
            var stmt = db.prepare("UPDATE ItemTable set item=(?), " +
                                  "description=(?), price=(?) WHERE " +
                                  "rowid=" + a);
            stmt.run(reqObj[a].item,
                  reqObj[a].description,
                  reqObj[a].price);

            stmt.finalize();

 
            });
      }
      res.json({response: "Collection UPDATED"});
    });

  });

// PUT request to change a specific item in the collection
app.put("/api/:id",
  function(req,res)
  {
  	console.log("PUT REQUEST RECEIVED");

    var str = "";
    req.on("data", function(chunk) { str += chunk;});
    req.on("end", function() { 
 
      // create the JSON object from the data in the request
      var reqObj = JSON.parse(str);

      // output the JSON object received in the request
      console.log(str);

      // make the update to the database
      db.serialize(function() {
        var stmt = db.prepare("UPDATE ItemTable set item=(?), " +
        	                    "description=(?), price=(?) WHERE " +
        	                    "rowid=" + req.params.id);
        stmt.run(reqObj.item,
        	     reqObj.description,
        	     reqObj.price);

        stmt.finalize();

        res.json({response: "ITEM UPDATED"});
      });

    });

  });


// DELETE the entire collection
app.delete("/api", 
  function(req,res)
  {
  	console.log("DELETE REQUEST RECEIVED");

    db.run("DELETE FROM ItemTable");
    res.json({response: "Collection DELETED"});
  });

  // DELETE the entire collection
app.delete("/api/:id", 
function(req,res)
{
  console.log("DELETE REQUEST RECEIVED");

  db.run("DELETE FROM ItemTable where rowid="+ req.params.id);
  res.json({response: "Item DELETED"});
});

app.post("/api", function(request, response) {
  console.log('Item Inserted')

  console.log("PUT REQUEST RECEIVED");

  var str = "";
  req.on("data", function(chunk) { str += chunk;});
  req.on("end", function() { 

    // create the JSON object from the data in the request
    var reqObj = JSON.parse(str);

    // output the JSON object received in the request
    console.log(str);

    db.serialize(function(){

      // create a fresh version of the table
  
    
      // insert initial records into the table
      var stmt = db.prepare("INSERT INTO ItemTable VALUES (?,?,?)");
      stmt.run(reqObj.item,
        reqObj.description,
        reqObj.price);
      stmt.finalize();
    
    });
  });
});

var server = app.listen(3000, function(){
  console.log("RESTful API listening on port 3000!")
});

