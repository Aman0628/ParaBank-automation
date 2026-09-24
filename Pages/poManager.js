const { Registration } = require("../Pages/register")

class POManager {

    constructor(page) {
        this.page = page;
        this.register = new Registration(page);
    }

    getmeRegistration (){
        return this.register;
    }
}
module.exports = { POManager }