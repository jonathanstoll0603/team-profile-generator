const Employee = require("./Employee");

class Manager extends Employee {
    
    constructor(employeeName, id, email, officeNum) {
        super(employeeName, id, email);
        this.officeNum = officeNum;
    }

    getOfficeNum = () => {
        return this.officeNum;
    }

    getRole = () => {
        return this.role = "Manager";
    }
}

module.exports = Manager;