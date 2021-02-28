const fs = require("fs")
const inquirer = require("inquirer");
const util = require("util"); //Util import for writeFileAsync
const writeFileAsync = util.promisify(fs.writeFile); // For async function

// All of the Classes to be used later
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


// Function that initiates upon node being run
async function init() {

    let teamProfileTemplate = "";

    // Global variables
    let employeeName;
    let id;
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
                    valid = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(answer)
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
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
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

            // Places the manager responses inside of the manager.html file
            employeeTemplate = fs.readFileSync("./src/manager.html");

            // eval accesses the employeeTemplate's local variables and fills them in with responses.
            teamProfileTemplate +="\n" + eval("`"+ employeeTemplate +"`");
            console.log("Manager profile successfully created.")

            // call the menu prompt to check if user wants to add more employees
            return menuPrompt();
        }).catch(err => console.log(err));
        
    // Prompt for the menu that will appear after completing each team member prompt
    async function menuPrompt() {
        await inquirer.prompt([
            {
                type: 'list',
                message: 'Would you like to add an additional employee to your team profile?',
                name: 'role',
                choices: ["Engineer", "Intern", "Finished Building Team"]    
            }
        ]).then((menuAnswer) => {
            
            if (menuAnswer.role === "Engineer") {
                console.log("Creating Engineer Profile...")
                // Returns the engineer prompt questions
                return addEngineerPrompt();
            } else if (menuAnswer.role === "Intern") {
                console.log("Creating Intern Profile...")
                // Returns the intern prompt questions
                return addInternPrompt();
            } else {
                return;
            }
    
        }).catch(err => console.error(err));
    }

    // // // Variable that hold the questions and answers prompt for Addtional Employees
    async function addEngineerPrompt() {
        await inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the employee you'd like to place in the team portal?",
                name: 'employeeName',
                validate: (answer) => {
                    valid = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(answer)
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
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
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
            let engineer = new Engineer(employeeName, id, email, github);

            // Places the engineer responses inside of the engineer.html file
            employeeTemplate = fs.readFileSync("./src/engineer.html");

            teamProfileTemplate += "\n" + eval("`"+ employeeTemplate +"`")
            console.log("Engineer profile successfully created.")

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
                    valid = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(answer)
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
                    valid = /^[0-9]+$/.test(answer)
                    if (!valid) {
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

            // creates a new Intern class with response answers.
            let intern = new Intern(employeeName, id, email, school);

            // Places the intern responses inside of the intern.html file
            employeeTemplate = fs.readFileSync("./src/intern.html");

            teamProfileTemplate += eval("`"+ employeeTemplate +"`")
            console.log("Intern profile successfully created.")

            // Recall the menu prompt to see if user wants to add another team member
            return menuPrompt();
        }).catch(err => console.error(err));
    }

    // Reads generate.html and places the contents of the file in a variable
    const generateFinalPage = fs.readFileSync("./src/generate.html");
                        
    // takes all of the team profiles that were created, and places them inside of generateFinalPage variable.
    teamProfileTemplate = eval("`"+ generateFinalPage +"`");

    // Writes all of the stored team profiles templates and their contents to a final html page.
    writeFileAsync("./dist/index.html", teamProfileTemplate);
    console.log("Team profile page successfully created!")
}

init();

