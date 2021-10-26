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
  console.log("TODO: You chose 'View Employees'");
}

function addDepartment() {
  console.log("TODO: You chose 'Add Department'");
}

function addRole() {
  console.log("TODO: You chose 'Add Role'");
}

function addEmployee() {
  console.log("TODO: You chose 'Add Employee'");
}

function updateRole() {
  console.log("TODO: You chose 'Update Role'");
}

function exit() {
  console.log("Goodbye");
  db.end();
}
