// required packages
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const functions = require('./db/functions');
const connection = require('./db/connection');

exports.returnMainMenu = returnMainMenu;

// importing all my functions from functions.js
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, quit } = require('./db/functions');

// load prompts function
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
                returnMainMenu();
                break;
            case "ALL_ROLES":
                viewAllRoles();
                returnMainMenu();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                returnMainMenu();
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

// this function prompts the user when they click on a choice if they would like to return to the main menu Y/N
function returnMainMenu() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "returnToMainMenu",
                message: "Would you like to return to the main menu?",
                default: true
            }
        ])
        .then(res => {
            if (res.returnToMainMenu) {
                loadPrompts();
            } else {
                quit();
            }
        });
}

loadPrompts();