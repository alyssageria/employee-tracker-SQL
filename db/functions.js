const inquirer = require('inquirer');
const index = require('../index.js');
const consoleTable = require('console.table');
const connection = require('./connection.js');


exports.viewAllDepartments = viewAllDepartments;
exports.viewAllRoles = viewAllRoles;
exports.viewAllEmployees = viewAllEmployees;
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(data);
        }

    })
}

function viewAllRoles() {
    connection.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(data);
        }
    })
}

function viewAllEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(data);
        }
    })
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department you would like to add:'
    })
        .then((answer) => {
            connection.query('INSERT INTO department (name) VALUES (?)', [answer.name], (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(`Successfully added ${answer.name} department to the database`);
                }
            })
        })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the role title:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter their yearly salary:',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Please enter the department:'
        }
    ])
        .then((answer) => {
            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.title, answer.salary, answer.department_id], (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(`Successfully added ${answer.title} role to the database`);
                }
            })
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name of the employee:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter their role ID'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please enter their manager ID'
        }
    ])
        .then((answer) => {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(`Successfully added employee ${answer.first_name} ${answer.last_name}to the database`);
                }
            })
        })
}

function updateEmployeeRole() {
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
        if (err) {
            console.log(err);
            return;
        }

        // Prompt the user to select an employee to update
        inquirer.prompt({
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employees.map(employee => ({ name: employee.name, value: employee.id }))
        }).then((employeeAnswer) => {
            // Query the database to get a list of all roles
            connection.query('SELECT id, title FROM role', (err, roles) => {
                if (err) {
                    console.log(err);
                    return;
                }

                // Prompt the user to select a new role for the employee
                inquirer.prompt({
                    type: 'list',
                    name: 'role',
                    message: 'Which role would you like to assign?',
                    choices: roles.map(role => ({ name: role.title, value: role.id }))
                }).then((roleAnswer) => {
                    // Update the employee's role in the database
                    connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleAnswer.role, employeeAnswer.employee], (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log(`Successfully updated employee's role`);
                        }
                    })
                })
            })
        })
    })
}

function quit() {

}

