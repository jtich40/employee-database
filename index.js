// imported packages
const inquirer = require('inquirer')
const mysql = require('mysql2')
const logo = require('asciiart-logo')
require('dotenv').config()

// connect to sql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

// initialize the command-line app
startApp()

function startApp() {
    console.log(
        logo({
            name: 'Employee Database',
            logoColor: 'bold-magenta',
        }).render())

    menu()
}

function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: "What would you like to do?",
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ])
        .then(res => {
            // output based on user input for prompts
            switch (res.options) {
                case 'View all departments':
                    viewDepartments()
                    break;

                case 'View all roles':
                    viewRoles()
                    break;

                case "View all employees":
                    viewEmployees()
                    break;

                case 'Add a department':
                    addDepartment()
                    break;

                case 'Add a role':
                    // call view all departments
                    break;

                case 'Add an employee':
                    // call view all departments
                    break;

                case 'Update an employee role':
                    // call view all departments
                    break;

                default:
                    'Quit'
                    break;
            }
        })
}

function viewDepartments() {
    db.query('SELECT * FROM department', (error, data) => {
        console.table(data)
        menu()
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'deptName',
                message: "What is the name of the department?",
            }
        ])
        .then(res => {
            db.query('INSERT INTO department SET ?', res.deptName, (error, data) => {
                console.log('Department successfully added!')
                menu()
            })
        })
}

function viewRoles() {
    db.query('SELECT * FROM role', (error, data) => {
        console.table(data)
        menu()
    })
  }

  function viewEmployees() {
    db.query('SELECT * FROM employee', (error, data) => {
        console.table(data)
        menu()
    })
  }

  function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: "What is the name of the role?",
            },

            {
                type: 'input',
                name: 'roleSalary',
                message: "What is the salary of the role?",
            },

            {
                type: 'list',
                name: 'deptName',
                message: "What department will this role be added to?",
                choices: [

                ]
            }
        ])
        .then(res => {
            db.query('INSERT INTO role SET ?', res.deptName, (error, data) => {
                console.log('Role successfully added!')
                menu()
            })
        })
}

