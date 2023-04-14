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
                    name: "View All Departments",
                    value: "view_all_departments"

                },
                {
                    name: "View All Roles",
                    value: "all_roles"

                },
                {
                    name: "View All Employees",
                    value: "view_employees"

                },
                {
                    name: "Add a Department",
                    value: "add_department"

                },
                {
                    name: "Add a Role",
                    value: "add_role"
                },
                {
                    name: "Add an Employee",
                    value: "add_employee"
                },
                {
                    name: "Update an Employee Role",
                    value: "update_employee_role"
                },
                {
                    name: "Quit",
                    value: "quit"
                }
            ]
        }
    ])
}