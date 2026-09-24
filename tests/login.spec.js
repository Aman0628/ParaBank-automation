const {test, expect} = require("playwright/test")
const { POManager } = require("../Pages/poManager")

test("login user ", async ({page}) => {

    const pomanager = new POManager (page);
    const loginPage = pomanager.getmeLogin();

    await loginPage.goto();
    await loginPage.validateLogin();
})