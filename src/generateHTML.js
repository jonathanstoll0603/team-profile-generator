const Employee = require("../lib/Employee");

const renderManagerInfo = () => {
    if (Employee.getRole === "Manager") {
        return ` <li class="list-group-item bg-light">Office Number: ${this.officeNum}</li>`
    } else {
        return "";
    }
};

const renderEngineerInfo = () => {
    if (Employee.getRole === "Engineer") {
        return `<li class="list-group-item bg-light"><a href="#" class="card-link">Email: ${this.github}</a></li>`
    } else {
        return "";
    }
}

const renderInternInfo = () => {
    if (Employee.getRole === "Intern") {
        return `<li class="list-group-item bg-light">School: ${this.school}</li>`
    } else {
        return "";
    }
}

const renderEmployeeInfo = () => {
    return `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-container">
        <div class="card text-center text-dark bg-light mb-3" style="width: 18rem;">
            <div class="card-header">${this.employeeName}</div>
            <div class="card-header">${this.role}</div>
            <div class="card-body bg-light mb-3">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-light">ID Number: ${this.id}</li>
                    <li class="list-group-item bg-light"><a href="www.${this.email}" class="card-link">Email: ${this.email}</a></li>
                    ${renderManagerInfo()}
                    ${renderEngineerInfo()}
                    ${renderInternInfo()}
                </ul>
            </div>
        </div>
    </div>
    `
}
const generateHTMLTemplate = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <link href="./style.css" rel="stylesheet">
        <title>Team Profile Page</title>
    </head>
    <body>

        <!-- Header -->
        <header>
            <div class="container-fluid position-relative mb-3 header-container">
                <h1 class="text-center position-absolute top-50 start-50 translate-middle header-title">Team Profile Overview</h1>
            </div>
        </header>

        <!-- Main content -->
        <div class="container-fluid content-container">
            <div class="row justify-content-evenly">
                ${renderEmployeeInfo()}
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
        <script src="../index.js"></script>
    </body>
    </html>
    `
}

module.exports = generateHTMLTemplate;