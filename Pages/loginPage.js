class LoginPage {

    constructor(page) {

        this.page = page;
        this.loginUsername = page.locator('[ name="username" ]');
        this.loginPassword = page.locator('[name="password"]');
        this.loginButton = page.locator('[value="Log In"]');
    }
    async goto() {

        await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
    }
    async validateLogin() {

        await this.loginUsername.fill("amankori")
        await this.loginPassword.fill("BhulL@kd12");
        await this.loginButton.click()
    }
}
module.exports = { LoginPage }