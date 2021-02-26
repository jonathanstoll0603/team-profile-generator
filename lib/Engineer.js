const Employee = require("./Employee");

class Engineer extends Employee {

    constructor(employeeName, id, email, github) {
        super(employeeName, id, email)
        this.github = github;
    }

    getGitHub = () => {
        return this.github;
    }; 

    getRole = () => {
        return this.role = "Engineer";
    };
}

module.exports = Engineer;