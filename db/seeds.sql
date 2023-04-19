USE employee_db;
-- Insert departments
INSERT INTO departments (name)
VALUES ('Sales');
INSERT INTO departments (name)
VALUES ('Marketing');
INSERT INTO departments (name)
VALUES ('Engineering');
-- Insert roles
INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Manager', 80000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ('Salesperson', 50000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Manager', 90000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Coordinator', 60000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 100000.00, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ('QA Engineer', 80000.00, 3);
-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Doe', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Smith', 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Sarah', 'Johnson', 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Lee', 5, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Emily', 'Wong', 6, 5);