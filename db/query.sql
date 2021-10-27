USE employees_db;
-- query for view departments
-- SELECT * FROM department;

-- query for view roles
-- select
--     b.id, b.title, b.salary,
--     a.dep_name as department
--     from department AS a LEFT JOIN employee_role AS b
--     on a.id = b.id;

-- query for view employees
-- select 
--     a.id, 
--     CONCAT(a.first_name, " ", a.last_name) AS name,
--     CONCAT(b.first_name, " ", b.last_name) AS manager,
--     employee_role.title as role,
--     department.dep_name as department
--     from employee AS a LEFT JOIN employee AS b
--     on a.manager_id = b.id
--     JOIN employee_role on a.role_id = employee_role.id
--     JOIN department on employee_role.department_id = department.id

-- query for add department
-- INSERT INTO department (dep_name) VALUES ("Marketing");


-- DELETE FROM department WHERE id=5;
-- SELECT * FROM department;
    
-- query for add role
-- query for add employee 
-- query for update employee role

-- JOIN department on employee_role.department_id = department.id;