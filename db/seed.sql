USE employees;

INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Marketing'),
    ('Recruitment');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 110000, 1),
    ('Sales Representative', 80000, 1),
    ('Lead Engineer', 120000, 2),
    ('Software Engineer', 100000, 2),
    ('Marketing Manager', 110000, 3),
    ('Marketing Specialist', 98000, 3),
    ('Recruitment Manager', 95000, 4),
    ('Recruiting Team Lead', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Conley', 1, NULL),
    ('Bonnie', 'Kane', 3,  NULL),
    ('Saskia', 'Harvey', 5, NULL),
    ('Lewys', 'Conner', 7, NULL),
    ('Haris', 'Jackson', 2, 1),
    ('Tyrell', 'Roberson', 4, 3),
    ('Stefan', 'Baxter', 6, 5),
    ('Elisabeth', 'Montes', 8, 7);