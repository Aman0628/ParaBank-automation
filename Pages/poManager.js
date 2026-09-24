const { Registration } = require("../Pages/register")
const { LoginPage } = require("../Pages/loginPage")

class POManager {

    constructor(page) {
        this.page = page;

        this.register = new Registration(page);
        this.loginPage = new LoginPage(page);
    }

    getmeRegistration (){
        return this.register;
    }
    getmeLogin (){
        return this.loginPage;
    }
}
module.exports = { POManager }