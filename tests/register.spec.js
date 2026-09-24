const {test, expect} = require("playwright/test");
const { POManager } = require("../Pages/poManager")

test(" user register ", async ({ page }) => {
    
    const pomanager = new POManager( page );

    const register = pomanager.getmeRegistration();

    await register.goto();
    await register.validateLogin();

});