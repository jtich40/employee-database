// imported packages
const inquirer = require('inquirer')
const mysql = require('mysql2')
const logo = require('asciiart-logo')
require('dotenv').config()

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
                    'view all roles',
                    "view all employees",
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'quit'
                ]
            }
        ]).then(res => {
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
                    // call view all departments
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
                    'quit'
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