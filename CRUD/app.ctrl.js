// include express
const express = require('express');
const app = express();

// include the mustache template engine for express
const mustacheExpress = require('mustache-express');

// include the model so the controller can use its functions
const Model = require('./app.model.js')

// registers the mustache engine with express
app.engine("mustache", mustacheExpress());

// sets mustache to be the view engine
app.set('view engine', 'mustache');

// sets /views to be the /views folder
// files should have the extension filename.mustache
app.set('views', __dirname + '/views');

// ************************* CONTROLLER ACTIONS ****************************

// delete an employee action (given an id parameter)
app.get('/delete/:id', function(req,res) {

  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }

  // 1. delete the employee first, then get all the employees
  Model.deleteEmployee(req.params.id, getEmployees);

});

// addform action puts the add employee form on the page
app.get('/addform', function(req,res) {

  // 2. render the page with the employee data AND display the add form
  function renderPage(employeeArray)
  {
    res.render('main_page', {addemployee: true, employees: employeeArray,
      fnameinput: true, lnameinput: true,salaryinput: true});
  }

  // 1. get all the employees, then render the page
  Model.getAllEmployees(renderPage);

});

// addemployee action handles add form submit, inserts new employee into table
app.get('/addemployee', function(req,res) {
  var isComplete = true;
  var inputData ={
    firstname : req.query.firstname, 
    lastname :req.query.lastname, 
    salary: req.query.salary, 
    fnameinput : true,
    lnameinput : true,
    salaryinput : true
  };
  valFn = false;
  valLn = false;
  valSal= false;
  if(req.query.firstname == ""){
    valFn = true;
    isComplete = false;
    inputData["fnameinput"] = function () {
      return function (text, render) {
        return "<div id =\"userdiv\" class=\"form-group has-error\">   " + render(text) + "</div>";
      }
    };
  }
  if(req.query.lastname == ""){
    valLn = true;
    isComplete = false;
    inputData["lnameinput"] = function () {
      return function (text, render) {
        return "<div id =\"lnamerdiv\" class=\"form-group has-error\">   " + render(text) + "</div>";
      }
    };
  }
  if(req.query.salary == ""  ){
    valSal = true;
    isComplete = false;
    inputData["salaryinput"] = function () {
      return function (text, render) {
        return "<div id =\"saladiv\" class=\"form-group has-error\">   " + render(text) + "</div>";
      }
    };
  }
  if(isComplete){
      function renderPage(employeeArray) {
        res.render('main_page', { employees: employeeArray});
      }

      function getEmployees() { Model.getAllEmployees(renderPage); }

      Model.addEmployee(req.query, getEmployees);
  }else{
        function renderPage(employeeArray)
        {
          res.render('main_page', {validfn: valFn, validln: valLn ,validsal: valSal, addemployee: inputData, employees: employeeArray});
        }

        Model.getAllEmployees(renderPage);
  }

});

app.get('/layoff', function(req,res) {
  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }
  
  function randDeleteEmployee(empArray) { 
    //get Current Employee data    
    var randId="";
    
    // 1. delete the employee first, then get all the employees
    for (;;) {
      randId= getRandom(1,empArray.length);
      if(empArray[randId-1].role !== 'Manager'){
        break;
      } 
    }
    Model.deleteEmployee(empArray[randId-1].rowid, getEmployees);
   }  
  Model.getAllEmployees(randDeleteEmployee);
});

// updateform action puts the update employee form on the page
app.get('/updateform/:id', function(req,res) {

  // 2. render the page with the employee data AND display update form
  function renderPage(employeeArray)
  {
    // filter the employeeArray for the employee with the id parameter, that's
    // the employee that we want to populate the form with (see: formdata)
    res.render('main_page',
      {updateemployee: true
      ,updateid: req.params.id
      ,formdata : employeeArray.filter(x => (x.rowid == req.params.id))[0]
      ,employees: employeeArray,
      fnameinput: true, lnameinput: true,salaryinput: true
      });
  }

  // 1. get all the employees, then render the page
  Model.getAllEmployees(renderPage);

});

//promoteform action puts the update employee form on the page
app.get('/promoteEmployee/:id', function(req,res) {
  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }

  // 1. update the employee in the database, then get all the employees
  Model.promoteEmployee(req.params.id, getEmployees);

});

app.get('/updateemployee/:id', function(req,res) {
  var isComplete = true;
  var inputData ={
    firstname : req.query.firstname, 
    lastname :req.query.lastname, 
    salary: req.query.salary, 
    fnameinput : true,
    lnameinput : true,
    salaryinput : true
  };
  valFn = false;
  valLn = false;
  valSal= false;
  if(req.query.firstname == ""){
    valFn = true;
    isComplete = false;
    inputData["fnameinput"] = function () {
      return function (text, render) {
        return "<div id =\"userdiv\" class=\"form-group has-error\">   " + render(text) + "</div>";
      }
    };
  }
  if(req.query.lastname == ""){
    valLn = true;
    isComplete = false;
    inputData["lnameinput"] = function () {
      return function (text, render) {
        return "<div id =\"lnamerdiv\" class=\"form-group has-error\">   " + render(text) + "</div>";
      }
    };
  }
  if(req.query.salary == ""  ){
    valSal = true;
    isComplete = false;
    inputData["salaryinput"] = function () {
      return function (text, render) {
        return "<div id =\"saladiv\" class=\"form-group has-error\">   " + render(text) + "</div>";
      }
    };
  }
  if(isComplete){
    // 3. render the page with the employee data
    function renderPage(employeeArray) {
      res.render('main_page', { employees: employeeArray});
    }

    // 2. Get all the employees, then render the page
    function getEmployees() { Model.getAllEmployees(renderPage); }

    // 1. update the employee in the database, then get all the employees
    Model.updateEmployee(req.query, req.params.id, getEmployees);
  }else{
      // 2. render the page with the employee data AND display the add form
      function renderPage(employeeArray)
      {
        res.render('main_page', {validfn: valFn, validln: valLn ,validsal: valSal, addemployee: inputData, employees: employeeArray});
      }

      // 1. get all the employees, then render the page
      Model.getAllEmployees(renderPage);
  }
});

app.get('/random', function(req, res)
{
  const firstname = ["Andrew", "Steven", "Billy", "Yasmin",
                     "Brandon", "Sansa", "Jon", "Tyrion",
                     "Jaime", "Cersei", "James", "Russ",
                     "Lina", "Jane", "Arya", "Ryan",
                     "Rick", "Morty", "Jake", "Finn"];

  const lastname = ["Gray", "Lannister", "Stark", "Walker",
                    "White", "Nguyen", "Raven", "Smith",
                    "Phan", "Black", "Rainbow", "Blue",
                    "Jones", "Kay", "Sanchez", "Universe",
                    "Baratheon", "Targaryen", "Bolton", "Tyrell"];

  const role = ["Manager", "Developer", "Tester"];

  const salary = getRandom(10000, 100000);
  const employee =
    {
      "firstname" : firstname[getRandom(0, (firstname.length - 1))],
      "lastname" : lastname[getRandom(0, (lastname.length - 1))],
      "salary" : salary,
      "role" : role[getRandom(0, (role.length - 1))]
    };

  // 3. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 2. Get all the employees, then render the page
  function getEmployees() { Model.getAllEmployees(renderPage); }

  // 1. Insert employee into table using form data, then get all the employees
  Model.addEmployee(employee, getEmployees);


});

// default action: render the page with employee data
app.get('/', function(req,res) {

  // 2. render the page with the employee data
  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }

  // 1. get all the employees, then render the page
  Model.getAllEmployees(renderPage);

});

app.get('/asc/:type', function(req,res) {

  function renderPage(employeeArray) {
    res.render('main_page', { employees: employeeArray});
  }
 
  Model.getAsc(req.params.type,renderPage);

});

app.get('/desc/:type', function(req,res) {

   function renderPage(employeeArray) {
    res.render('main_page', {employees: employeeArray});
  }

  Model.getDesc(req.params.type,renderPage);

});


function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

// catch-all router case intended for static files
app.get(/^(.+)$/, function(req,res) {
  res.sendFile(__dirname + req.params[0]);
});

app.listen(8081, function() { console.log("server listening..."); } );
