const { expect } = require("playwright/test")

class Registration {

    constructor(page) {

        this.page = page;


        this.firstName = page.locator('[id = "customer.firstName"]');
        this.lastName = page.locator('[id = "customer.lastName"]');
        this.street = page.locator('[id = "customer.address.street"]');
        this.city = page.locator('[id = "customer.address.city"]');
        this.state = page.locator('[id = "customer.address.state"]');
        this.zipCode = page.locator('[id = "customer.address.zipCode"]');
        this.phoneNumber = page.locator('[id = "customer.phoneNumber"]');
        this.ssn = page.locator('[id = "customer.ssn"]');
        this.username = page.locator('[id = "customer.username"]');
        this.password = page.locator('[id = "customer.password"]');
        this.repeatedPassword = page.locator('[id = "repeatedPassword"]');
        this.register = page.getByRole("button", { name: "Register" });
    }
    async goto() {
        await this.page.goto("https://parabank.parasoft.com/parabank/register.htm");
    }
    async validateLogin() {

        await this.firstName.fill("Aman");
        await this.lastName.fill("kori");
        await this.street.fill("sec66");
        await this.city.fill("Mohali");
        await this.state.fill("Pubjab");
        await this.zipCode.fill("123456");
        await this.phoneNumber.fill("1234567890");
        await this.ssn.fill("12345678");
        await this.username.fill("amankori");
        await this.password.fill("Bhull@kd12");
        await this.repeatedPassword.fill("Bhull@kd12");
        await this.register.click();
    }
}
module.exports = { Registration }