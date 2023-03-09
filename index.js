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
                    addRole()
                    break;

                case 'Add an employee':
                    addEmployee()
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
    db.promise().query('SELECT * FROM department') 
    .then(([data]) => {
        const deptChoices = data.map(({ id, name }) => ({ name: name, value: id}))
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "What is the name of the role?",
                },
    
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is the salary of the role?",
                },
    
                {
                    type: 'list',
                    name: 'department_id',
                    message: "What department will this role be added to?",
                    choices: deptChoices
                }
            ])
            .then(res => {
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',  [res.title, res.salary, res.department_id], (error, data) => {
                    console.log('Role successfully added!')
                    menu()
                })
            })
    })
        
}

function addRole() {
    db.promise().query('SELECT * FROM department') 
    .then(([data]) => {
        const deptChoices = data.map(({ id, name }) => ({ 
            name: name, 
            value: id
        }))
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "What is the name of the role?",
                },
    
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is the salary of the role?",
                },
    
                {
                    type: 'list',
                    name: 'department',
                    message: "What department will this role be added to?",
                    choices: deptChoices
                }
            ])
            .then(res => {
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',  [res.title, res.salary, res.department], (error, data) => {
                    console.log('Role successfully added!')
                    menu()
                })
            })
    })
        
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the first name of the new employee?",
            },

            {
                type: 'input',
                name: 'last_name',
                message: "What is the last name of the new employee?",
            }
        ])
        .then(res => {
            const firstName = res.first_name
            const LastName = res.last_name

            db.promise().query('SELECT * FROM role')
                .then(([data]) => {
                    const roleChoices = data.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }))
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: "What role will be filled by the new employee?",
                                choices: roleChoices
                            }
                        ])
                        .then(res => {
                            const role = res.role

                            db.promise().query('SELECT * FROM employee')
                                .then(([data]) => {
                                    const managerChoices = data.map(({ first_name, last_name, manager_id }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: manager_id
                                    }))

                                    managerChoices.push({ name: "None", value: null });

                                    inquirer
                                        .prompt([
                                            {
                                                type: 'list',
                                                name: 'manager',
                                                message: "What manager will this role be reporting to?",
                                                choices: managerChoices
                                            }
                                        ])

                                        .then(res => {
                                            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, LastName, role, res.manager_id], (error, data) => {
                                                console.log('Employee successfully added!')
                                                menu()
                                            })
                                        })
                                })
                        })
                })
        })
}


