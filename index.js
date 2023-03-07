const inquirer = require('inquirer')
require('dotenv').config()
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.PASSWORD,
      database: 'company_db'
    },
    console.log(`Connected to the books_db database.`)
  );

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
            // call view all departments
            break;

            case 'view all roles': 
            // call 'view all roles'
            break;

            case "view all employees": 
            // call view all employees
            break;
            
            case 'add a department': 
            // call view all departments
            break;

            case 'add a role': 
            // call view all departments
            break;

            case 'add an employee': 
            // call view all departments
            break;

            case 'update an employee role': 
            // call view all departments
            break;
    
        default:
            'quit'
            break;
    }
})