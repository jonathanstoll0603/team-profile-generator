const Employee = require("../lib/Employee");

describe("Employee", () => {

    describe("Initialization", () => {
        it("Should check to ensure an instance of Employee was created when prompted with new Employee()", () => {
            const employee = new Employee();

            expect(typeof employee).toEqual("object");
        });

        it("Should take in a name, age, and email parameter", () => {
            const name = "Jon";
            const idNum = 3;
            const emailAdd = "Jon@email.com";
            const employee = new Employee(name, idNum, emailAdd);
      
            expect(employee.employeeName).toEqual("Jon");
            expect(employee.id).toEqual(3);
            expect(employee.email).toEqual("Jon@email.com");
        });
    });
    
    describe("getName", () => {
        it("Should get a name when getName() is called.", () => {
            const nameVal = 1;
            const employee = new Employee(nameVal, 1, "Jon@email.com");

            expect(employee.getName()).toEqual(nameVal);
        });
    });

    describe("getID", () => {
        it("Should get an id when getID() is called.", () => {
            const idVal = 1;
            const employee = new Employee("Jon", idVal, "Jon@email.com");

            expect(employee.getID()).toEqual(idVal);
        });
    })

    describe("getEmail", () => {
        it("Should get an id when getEmail() is called.", () => {
            const emailVal = "Jon@email.com";
            const employee = new Employee("Jon", 1, emailVal);

            expect(employee.getEmail()).toEqual(emailVal);
        });
    });

    describe("getRole", () => {
        it("Should get role with value of 'Employee' when getRole is called.", () => {
            const roleVal = "Employee";
            const employee = new Employee("Jon", 3, "Jon@email.com")

            expect(employee.getRole()).toEqual(roleVal);
        });
    });
});