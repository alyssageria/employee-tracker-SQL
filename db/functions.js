const inquirer = require('inquirer');
const index = require('../index.js');
const consoleTable = require('console.table');
const connection = require('./connection.js');

const { loadPrompts } = require('../index.js');

exports.viewAllDepartments = viewAllDepartments;
exports.viewAllRoles = viewAllRoles;
exports.viewAllEmployees = viewAllEmployees;
exports.addDepartment = addDepartment;

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

}

function addEmployee() {

}

function updateEmployeeRole() {

}

function quit() {

}

