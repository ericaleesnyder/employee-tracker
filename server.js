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
  db.query(`select
    b.id, b.title, b.salary,
    a.dep_name as department
    from department AS a LEFT JOIN employee_role AS b
    on a.id = b.id;`, function (err, results) {
    console.table(results)
    menu();
  });
}

function viewEmployees() {
  db.query(`select 
    a.id, 
    CONCAT(a.first_name, " ", a.last_name) AS name,
    CONCAT(b.first_name, " ", b.last_name) AS manager,
    employee_role.title as role,
    department.dep_name as department
    from employee AS a LEFT JOIN employee AS b
    on a.manager_id = b.id
    JOIN employee_role on a.role_id = employee_role.id
    JOIN department on employee_role.department_id = department.id`, function (err, results) {
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
}

async function addEmployee() {
  const answer = await inquirer.prompt ([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "first",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "last",
    },
    {
      type: "input",
      message: "What is the Role Id?",
      name: "role",
    },
    {
      type: "input",
      message: "What is the Manager Id?",
      name: "manager",
    },
  ]) 

  db.query('INSERT INTO employee set ?', [{first_name: answer.first, last_name: answer.last, role_id: answer.role, manager_id: answer.manager}], function (err, results) {
    console.log(results);
    console.log("Select 'View All Employees' to see the updated table")
    menu();
  });
}

async function updateRole() {
  // console.log("TODO: You chose 'Update Role'");
  try {
    const selectEmployeeSql = `select
    a.id,
    CONCAT(a.first_name, " ", a.last_name) AS name,
    CONCAT(b.first_name, " ", b.last_name) AS manager,
    employee_role.title as role,
    employee_role.salary,
    department.dep_name as department
    from employee AS a LEFT JOIN employee AS b
    on a.manager_id = b.id
    JOIN employee_role on a.role_id = employee_role.id
    JOIN department on employee_role.department_id = department.id`;

    const [rows] = await db.promise().query(selectEmployeeSql);

    const choices = rows.map((employees) => ({
      name: `${employees.name}`,
      value: employees,
    }));

    const { name, role } = await inquirer.prompt ([
      {
        type: "list",
        message: "Choose an employee to update:",
        name: "name",
        choices,
      },
      {
        type: "input",
        message: "What is the employee's new Role ID?",
        name: "role",
      },
    ]);
    console.log(name);
    console.log(role);
    const updateEmployeeSql = `UPDATE employee SET ? WHERE ?;`;
    await db
      .promise()
      .query(updateEmployeeSql, [
        { role_id: role },
        { id: name.id },
      ]);
    console.log("Update success.");
    return menu();
    
  } catch (error) {
    console.log(error);
  }
}

function exit() {
  console.log("Goodbye");
  db.end();
}
