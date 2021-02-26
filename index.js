// const employee = require("./lib/Employee");
const fs = require("fs")
const inquirer = require("inquirer");
const util = require("util"); //Util import for writeFileAsync

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// const Employee = require("./lib/Employee");
const writeFileAsync = util.promisify(fs.writeFile); // For async function
// const generateHTML = require("./src/generateHTML");
// const managerHTML = require("./src/managerHTML");

// Function that initiates upon node being run
async function init() {
    let teamProfileTemplate = "";

    // Global variables
    let employeeName;
    let id;
    let role;
    let email;
    let officeNum;
    let github;
    let school;

    // Function that calls the initial inquirer.prompt
    await inquirer.prompt([
            {
                type: "list",
                message: "Welcome to Team Profile Generator! Select the 'Manager' role to continue.",
                name: 'role',
                choices: ['Manager']
            },
            {
                type: 'input',
                message: "Please enter the team manager's full name.",
                name: 'employeeName',
                validate: (answer) => {
                    valid = /^[a-zA-Z]*$/.test(answer)
                    if (!valid) {
                        return console.log(" *Name input cannot contain any numbers or symbols. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'Please enter the team manager\'s id number.',
                name: 'id',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return console.log(" *Input must be a number. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'Please enter the team manager\'s email address.',
                name: 'email',
                default: () => {},
                validate: function (email) {
                    valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)
    
                    if (valid) {
                        return true;
                    } else {
                       return console.log(" *Not a valid email address format. Try again.*");
                    }
                }
            },
            {
                type: 'input',
                message: "Please enter the team manager\'s office number.",
                name: 'officeNum',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return console.log(" *Input must be a number. Try again.*");
                    }
                     return true;
                }                
            }
        ]).then((response) => {
        
            // Stores response variables
            employeeName = response.employeeName;
            id = response.id;
            email = response.email;
            role = response.role;
            officeNum = response.officeNum;

            // Once finished, it creates a new Manager from the Manager class with responses as parameters
            const manager = new Manager(employeeName, id, email, officeNum);
            const managerTemplate = fs.readFileSync("./src/manager.html");

            // eval accesses the managerTemplate's local variables and fills them in with responses.
            teamProfileTemplate = teamProfileTemplate + eval("`" + managerTemplate + "`")
        }).catch(err => console.log(err));
        
    // Prompt for the menu that will appear after completing each team member prompt
    await inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add an additional employee to your team profile?',
            name: 'role',
            choices: ["Engineer", "Intern", "Finished Building Team"]    
        }
    ]).then((menuAnswer) => {
        console.log(menuAnswer);
        
        if (menuAnswer.role === "Engineer") {
            console.log("Creating Engineer Profile...")
            return addEngineerPrompt();
        } else if (menuAnswer.role === "Intern") {
            console.log("Creating Intern Profile...")
            return addInternPrompt();
        } else {
            return;
        }

    }).catch(err => console.error(err));
    
    // // // Variable that hold the questions and answers prompt for Addtional Employees
    async function addEngineerPrompt() {
        await inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the employee you'd like to place in the team portal?",
                name: 'employeeName',
                validate: (answer) => {
                    valid = /^[a-zA-Z]*$/.test(answer)
                    if (!valid) {
                        return console.log(" *Name input cannot contain any numbers or symbols. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'number',
                message: 'What is your employee\'s id number?',
                name: 'id',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return console.log(" *Input must be a number. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'What is your employee\'s email address?',
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
                type: 'input',
                message: 'What is your engineer\'s GitHub username?',
                name: 'github'
            }
        ]).then((response) => { //For engineer response handling
            employeeName = response.employeeName;
            id = response.id;
            email = response.email;
            role = response.role;
            github = response.github;
            // creates a new employee class with response answers.
            let newEngineer = new Engineer(employeeName, id, email, github);
            const engineerTemplate = fs.readFileSync("./src/intern.html");

            teamProfileTemplate += eval("`" + engineerTemplate + "`")
            return menuPrompt();
        })
    }

    async function addInternPrompt() {
        await inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the employee you'd like to place in the team portal?",
                name: 'employeeName',
                validate: (answer) => {
                    valid = /^[a-zA-Z]*$/.test(answer)
                    if (!valid) {
                        return console.log(" *Name input cannot contain any numbers or symbols. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'number',
                message: 'What is your employee\'s id number?',
                name: 'id',
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return console.log(" *Input must be a number. Try again.*")
                    }
                    return true;
                }
            },
            {
                type: 'input',
                message: 'What is your employee\'s email address?',
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
                },
                
            },
            {
                type: 'input',
                message: 'What school does your intern attend?',
                name: 'school'
            }
        // response handler for Intern class and html
        ]).then((response) => {

            employeeName = response.employeeName;
            id = response.id;
            email = response.email;
            role = response.role;
            school = response.school;
            // creates a new employee class with response answers.
            let newIntern = new Intern(employeeName, id, email, school);
            
            // Once finished, it creates a new Employee for the manager w/ responses as parameters
            const internTemplate = fs.readFileSync("./src/intern.html");

            teamProfileTemplate += eval("`" + internTemplate + "`")

            // Recall the menu prompt to see if user wants to add another team member
            return menuPrompt();
        }).catch(err => console.error(err));
    }

    // Reads main.html and places html in a variable
    const generateFinalPage = fs.readFileSync("./src/generate.html");
            
    // Use eval to implement template literals in main.html and places teamHTML inside main template
    teamProfileTemplate += eval("`" + generateFinalPage + "`");

    // write file to new team.html file
    fs.writeFile("./dist/index.html", teamProfileTemplate, function(err) {

        if (err) {
        return console.log(err);
        }
        
        console.log("Successfully Created Team Member Profile.");
    })
}

init();

