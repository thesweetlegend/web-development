var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("employee.db");

// select all the employees, call the callback with them as a parameter
function getAllEmployees(callback)
{
  db.all("SELECT rowid, * FROM Employees",
         function(err,results) { callback(results); });
}
function getAsc(type, callback)
{
  stmt ="";
  if(type == 'salary'){
    stmt = "SELECT rowid,* FROM 'Employees' order by salary asc;";
  }
  if(type == 'firstname'){
    stmt = "SELECT rowid, * FROM 'Employees' order by firstname asc;";
  }
  if(type == 'lastname'){
    stmt = "SELECT rowid, * FROM 'Employees' order by lastname asc;";
  }
  if(type == 'role'){
    stmt = "SELECT rowid, * FROM 'Employees' order by role asc;";
  }
  if(type == 'rowid'){
    stmt = "SELECT rowid, * FROM 'Employees' order by rowid asc;";
  }
  db.all(stmt,
         function(err,results) { callback(results); });
}
function getDesc(type, callback)
{
  stmt ="";
  if(type == 'salary'){
    stmt = "SELECT rowid, * FROM 'Employees' order by salary desc;";
  }
  if(type == 'firstname'){
    stmt = "SELECT rowid, * FROM 'Employees' order by firstname desc;";
  }
  if(type == 'lastname'){
    stmt = "SELECT rowid, * FROM 'Employees' order by lastname desc;";
  }
  if(type == 'role'){
    stmt = "SELECT rowid, * FROM 'Employees' order by role desc;";
  }
  if(type == 'rowid'){
    stmt = "SELECT rowid, * FROM 'Employees' order by rowid desc;";
  }
  db.all(stmt, 
  function(err,results) { callback(results); });
}

// delete an employee with a given id
function deleteEmployee(id,callback)
{
  db.run("DELETE FROM Employees WHERE rowid=?", id,
         function(err) { callback(); });
}

// insert an employee into the table
function addEmployee(employee,callback)
{
  db.run("INSERT INTO Employees VALUES (?,?,?,?)",
         [employee.firstname, employee.lastname, employee.salary, employee.role],
         function(err) { callback(); });
}

// update an employee with a given id
function updateEmployee(employee,id,callback)
{
  db.run("UPDATE Employees SET firstname=?,lastname=?,salary=?,role=? WHERE rowid=?",
         [employee.firstname, employee.lastname, employee.salary, employee.role, id],
         function(err) { callback(); });
}
// promote an employee with a given id
function promoteEmployee(id,callback)
{
  db.run("UPDATE Employees SET role='Manager' WHERE rowid=?",
         [id],
         function(err) { callback(); });
}

// export the functions we have defined
module.exports = {getAllEmployees, deleteEmployee, addEmployee, updateEmployee,promoteEmployee,getAsc,getDesc};
