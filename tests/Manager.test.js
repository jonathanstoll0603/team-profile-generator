const Manager = require("../lib/Manager");

describe("Manager class", () => {

    describe("Initialization", () => {
        it("Should check to ensure an instance of Manager was created when prompted with new Manager()", () => {
            const manager = new Manager();
    
            expect(typeof manager).toEqual("object");
        });
    
        it("Should set officeNum based off the constructor", () => {
            const officeNumVal = 1;
            const manager = new Manager("Jon", 1, "Jon@email.com", officeNumVal);

            expect(manager.officeNum).toEqual(officeNumVal);
        });
    });

    describe("getOfficeNum", () => {
        
        it("should return constructor officeNum when getOfficeNum is called", () => {
            const officeNumVal = 1;
            const manager = new Manager("Jon", 1, "Jon@email.com", officeNumVal);

            expect(manager.getOfficeNum()).toEqual(officeNumVal);
        });
    });

    describe("getRole", () => {
        
        it("should return role of 'Manager' when getRole is called", () => {
            const roleVal = "Manager";
            const manager = new Manager("Jon", 1, "Jon@email.com", 1);

            expect(manager.getRole()).toEqual(roleVal);
        });
    });
});