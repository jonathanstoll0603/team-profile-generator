const Engineer = require("../lib/Engineer");

describe("Engineer class", () => {

    describe("Initialization", () => {
        it("Should check to ensure an instance of Engineer was created when prompted with new Engineer()", () => {
            const engineer = new Engineer();
    
            expect(typeof engineer).toEqual("object");
        });
    
        it("Should set github based off the constructor", () => {
            const githubVal = "Jonathanstoll0603";
            const engineer = new Engineer("Jon", 1, "Jon@email.com", githubVal);
            // Testing to see if you are passing legitamte values to the Employee class contructor
            expect(engineer.github).toEqual(githubVal);
        });
    });

    describe("getGitHub", () => {
        
        it("should return github username when getGitHub is called", () => {
            const githubVal = "Jonathanstoll0603"
            const engineer = new Engineer("Jon", 1, "Jon@email.com", githubVal);

            expect(engineer.getGitHub()).toEqual(githubVal);
        });
    });

    describe("getRole", () => {
        
        it("should return role of 'Engineer' when getRole is called", () => {
            const roleVal = "Engineer";
            const engineer = new Engineer("Jon", 1, "Jon@email.com", "UGA");

            expect(engineer.getRole()).toEqual(roleVal);
        });
    });
});