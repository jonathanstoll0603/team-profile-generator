const Intern = require("../lib/Intern");

describe("Intern class", () => {

    describe("Initialization", () => {
        it("Should check to ensure an instance of Intern was created when prompted with new Intern()", () => {
            const intern = new Intern();
    
            expect(typeof intern).toEqual("object");
        });
    
        it("Should set school based off the constructor", () => {
            const schoolVal = "UGA";
            const intern = new Intern("Jon", 1, "Jon@email.com", schoolVal);

            expect(intern.school).toEqual(schoolVal);
        });
    });

    describe("getSchool", () => {
        
        it("should return school when getSchool is called", () => {
            const schoolVal = "UGA"
            const intern = new Intern("Jon", 1, "Jon@email.com", schoolVal);

            expect(intern.getSchool()).toEqual(schoolVal);
        });
    });

    describe("getRole", () => {
        
        it("should return role of 'Intern' when getRole is called", () => {
            const roleVal = "Intern";
            const intern = new Intern("Jon", 1, "Jon@email.com", "UGA");

            expect(intern.getRole()).toEqual(roleVal);
        });
    });
});