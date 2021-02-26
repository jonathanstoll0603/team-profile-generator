class Employee {

    constructor(employeeName, id, email) {
        this.employeeName = employeeName;
        this.id = id;
        this.email = email;
    }

    getName() {       
        return this.employeeName;
    }

    getEmail() {
        return this.email;
    }

    getID() {        
        return this.id;
    }

    getRole() {
        return this.role = "Employee";
    }
}

module.exports = Employee;