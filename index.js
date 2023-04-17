const inquirer = require('inquirer');
// const db = require('./db')
const consoleTable = require('console.table');
const functions = require('./db/functions');
const connection = require('./db/connection');

exports.loadPrompts = loadPrompts;

const { viewAllDepartments } = require('./db/functions');
const { viewAllRoles } = require('./db/functions');
const { viewAllEmployees } = require('./db/functions');
const { addDepartment } = require('./db/functions');

function loadPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_ALL_DEPARTMENTS"

                },
                {
                    name: "View All Roles",
                    value: "ALL_ROLES"

                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"

                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"

                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update an Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;

        switch (choice) {
            case "VIEW_ALL_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "ALL_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case 'QUIT':
                quit();
                break;
        }
    })
}

loadPrompts();