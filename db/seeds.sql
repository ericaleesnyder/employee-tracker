-- need to set information for each of the tables
USE employees_db;

INSERT INTO department (dep_name)
VALUES ("Accounting"),
       ("Leadership"),
       ("Engineering");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Manager", 120000, 2),
       ("Engineer", 80000, 3),
       ("Intern", 20000, 3),
       ("Accountant", 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Bacon", 1, NULL),
       ("Kim", "Kardashian", 2, 1),
       ("Doja", "Cat", 3, 1),
       ("Billy", "Joel", 4, 1);