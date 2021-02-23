// const employee = require("./lib/Employee");
const fs = require("fs")
const inquirer = require("inquirer");
const util = require("util"); //Util import for writeFileAsync
const { createInflate } = require("zlib");
const Employee = require("./lib/Employee");
// const Employee = require("./lib/Employee");
const writeFileAsync = util.promisify(fs.writeFile); // For async function
// const generateHTML = require("./src/generateHTML");

// Function that initiates upon node being run
function init() {
    // Function that calls inquirer.prompt, and prompts user with info below
    const initialPrompt = () => {
        return inquirer.prompt([
            {
                type: 'confirm',
                message: "Welcome to the Team Profile Generator! Confirm to continue as a manager.",
                name: 'confirmManager'
            },
            {
                type: 'input',
                message: "Please enter manager full name.",
                name: 'employeeName',
            },
            {
                type: 'number',
                message: 'Please enter manager id number.',
                name: 'id'
            },
            {
                type: 'input',
                message: 'Please enter manager email address.',
                name: 'email',
                default: () => {},
                validate: function (email) {
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    
                    if (valid) {
                        return true;
                    } else {
                        console.log("Please enter a valid email address.");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                message: "Please enter manager office number.",
                name: 'officeNum'
            },
            {
                type: 'confirm',
                message: 'Would you like to add additional employees to your team portal?',
                name: 'addMoreEmployees'
            }
        ])
    }
    initialPrompt().then((response) => {
        const employee = new Employee(response);

        writeFileAsync("./dist/index.html", employee)
        .then(() => {
            console.log("Successfully Created Team Member Profile.");
        })
        .catch(err => console.error(err));
    })
}

init();