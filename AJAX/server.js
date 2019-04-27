const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', function(req, res)
{
  res.sendFile(__dirname + "/form.html")
  console.log("Viewing homepage.");
});


app.get('/submit/:firstname/:lastname/:studentid/:tuition/:paymentmethod', function(req, res)
{
  var fs = require("fs");
  
  var firstname =  req.params.firstname;
  var lastname =  req.params.lastname;
  var studentid =  req.params.studentid;
  var tuition =  req.params.tuition;
  var paymentmethod =  req.params.paymentmethod;
  var data = '\n'+firstname+','+lastname+','+studentid+','+tuition+','+paymentmethod;
   fs.appendFile('log.txt', data, function (err) {
    if (err){
      console.log("Error saving data.");
      throw err;
    }
    console.log("Info saved: " + firstname + ", " + lastname + ", " + studentid + ", " + tuition + ", " + paymentmethod);
  });

   res.sendFile(__dirname + "/form.html")
});

app.get('/log.txt', function(req, res)
{
   res.sendFile(__dirname + "/log.txt")
   console.log("Viewing log.");
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

app.get('/random', function(req, res)
{
  // possible random first names
  const firstname = ["Kevin", "John", "Sally", "Larissa",
                     "Zhang", "Li", "Ying", "Wang",
                     "Nayla", "Nawal", "Abdul", "Yasin"];

  // possible random last names
  const lastname = ["Browne", "Black", "Smith", "Yendt",
                    "Wei", "Fang", "Patel", "Lee",
                    "Abaza", "Shadid", "Hatem", "Hassin"];

  // random generation of tuition
  const tuition = getRandom(7956, 2800);

  // random generation of a student id
  const studentid =
    "0" + getRandom(0, 9) + getRandom(0,9) + getRandom(0,9) + getRandom(0,9) +
    getRandom(0,9) + getRandom(0,9) + getRandom(0,9) + getRandom(0,9);

  // possible payment methods
  const paymentmethods = ["Credit", "Debit", "Bitcoin"];

  // create random student based on arrays, randomness
  const student =
    {
      "firstname" : firstname[getRandom(0, (firstname.length - 1))],
      "lastname" : lastname[getRandom(0, (lastname.length - 1))],
      "tuition" : tuition,
      "studentid" : studentid,
      "method" : paymentmethods[getRandom(0, (paymentmethods.length - 1))]
    };

  // send the json data as the response
  res.json(student);

  console.log("Random button pressed.")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
