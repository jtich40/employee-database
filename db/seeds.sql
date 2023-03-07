INSERT INTO department (name)
VALUES 
('Customer Service'), 
('Sales'), 
('Marketing'), 
('IT'), 
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Customer Service Team Lead', 45000, 1),
('Customer Service Rep', 30000, 1),
('Sales Manager', 70000, 2),
('Sales Account Rep', 50000, 2),
('Marketing Manager', 95000, 3),
('Marketing Coordinator', 65000, 3),
('IT Manager', 160000, 4)
('Software Engineer', 110000, 4),
('Finance Director', 130000, 5);
('Financial Analyst', 85000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ryan','Howard', 1, NULL),
('Kelly', 'Kapor', 2, 1)
('Michael','Scott', 3, NULL),
('Jim', 'Halpert' 4, 3),
('Pam', 'Halpert', 5, NULL),
('Andy', 'Bernard' 6, 5),
('Darryl', 'Philbin', 7, NULL),
('Dwight', 'Schrute' 8, 7),
('Oscar', 'Martinez' 9, NULL)
('Angela', 'Martin' 10, 9)

