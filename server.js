const art = require("ascii-art");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});

start();

async function start() {
  try {
    const rendered = await art.font("Employee Tracker", "doom").completed();
    console.log(rendered);
    return menu();
  } catch (err) {
    console.log(err);
  }
}

async function menu() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose a task:",
      name: "action",
      choices: 
      [
        "View All Departments", 
        "View All Roles", 
        "View All Employees", 
        "Add a Department", 
        "Add a Role", 
        "Add an Employee", 
        "Update an Employee Role",
        "Exit"
      ],
    },
  ]);

  switch (action) {
    case "View All Departments":
      return viewDepartments();

    case "View All Roles":
      return viewRoles();

    case "View All Employees":
      return viewEmployees();

    case "Add a Department":
      return addDepartment();

    case "Add a Role":
      return addRole();

    case "Add an Employee":
      return addEmployee();

    case "Update an Employee Role":
      return updateRole();

    default:
      return exit();
  }
}

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results)
    menu();
  });
}

function viewRoles() {
  db.query('SELECT * FROM employee_role', function (err, results) {
    console.table(results)
    menu();
  });
}

function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results)
    menu();
  });
}

async function addDepartment() {
  const answer = await inquirer.prompt ([
    {
      type: "input",
      message: "What is the Department Name?",
      name: "department",
    }
  ]) 

  db.query('INSERT INTO department set ?', [{dep_name: answer.department}], function (err, results) {
    console.log("Select 'View All Departments' to see the updated table")
    menu();
  });
}

async function addRole() {
  const answer = await inquirer.prompt ([
    {
      type: "input",
      message: "What is the Employee Role?",
      name: "role",
    },
    {
      type: "input",
      message: "What is the Employee Role Salary?",
      name: "salary",
    },
    {
      type: "input",
      message: "What is the Department Id?",
      name: "department",
    },
  ]) 

  db.query('INSERT INTO employee_role set ?', [{title: answer.role, salary: answer.salary, department_id: answer.department}], function (err, results) {
    console.log("Select 'View All Roles' to see the updated table")
    menu();
  });
  // prompt user to input title
  // prompt user to input salary
  // prompt user to input department_id
  // db.query --> insert into employee_role 
  // show updated employee_role table
  // menu();
}

function addEmployee() {
  console.log("TODO: You chose 'Add Employee'");
  // prompt user to input first_name
  // prompt user to input last_name
  // prompt user to input role_id
  // prompt user to input manager_id
  // db.query --> insert into employee
  // show updated employee table
  // menu();
}

function updateRole() {
  console.log("TODO: You chose 'Update Role'");
}

function exit() {
  console.log("Goodbye");
  db.end();
}
