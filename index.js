const inquirer = require('inquirer');
const db = require('./db')
const consoleTable = require('console.table');

function loadPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "view_employees"
                },
                {
                    name: "Update Employee Role",
                    value: "employee_role"
                },
                {
                    name: "View All Roles",
                    value: "all_roles"
                },
                {
                    name: "Add Role",
                    value: "add_role"
                },
                {
                    name: "View All Departments",
                    value: "view_all_departments"
                },
                {
                    name: "Add Department",
                    value: "add_department"
                },
                {
                    name: "Quit",
                    value: "quit"
                },
                {
                    name: "View All Employees",
                    value: "view_all_employees"
                }
            ]
        }
    ])
}