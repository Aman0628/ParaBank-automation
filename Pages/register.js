const { expect } = require('@playwright/test');

class Registration {
    constructor(page) {
        this.page = page;

        this.firstName = page.locator('[id="customer.firstName"]');
        this.lastName = page.locator('[id="customer.lastName"]');
        this.street = page.locator('[id="customer.address.street"]');
        this.city = page.locator('[id="customer.address.city"]');
        this.state = page.locator('[id="customer.address.state"]');
        this.zipCode = page.locator('[id="customer.address.zipCode"]');
        this.phoneNumber = page.locator('[id="customer.phoneNumber"]');
        this.ssn = page.locator('[id="customer.ssn"]');
        this.username = page.locator('[id="customer.username"]');
        this.password = page.locator('[id="customer.password"]');
        this.repeatedPassword = page.locator('[id="repeatedPassword"]');
        this.registerButton = page.locator('form#customerForm input[value="Register"]');

        this.successHeading = page.locator('h1.title');
        this.successMessage = page.locator('#rightPanel p');
        this.usernameError = page.locator('[id="customer.username.errors"]');
        this.passwordConfirmError = page.locator('[id="repeatedPassword.errors"]');
    }

    async goto() {
        await this.page.goto('/parabank/register.htm', { waitUntil: 'domcontentloaded' });
    }

    /**
     * Fills the registration form with provided user data or sensible defaults.
     */
    async fillRegistrationForm(userData = {}) {
        const defaultUser = {
            firstName: 'Aman',
            lastName: 'Kori',
            street: 'sec66',
            city: 'Mohali',
            state: 'Punjab',
            zipCode: '123456',
            phoneNumber: '1234567890',
            ssn: '12345678',
            username: `user_${Date.now()}`,
            password: 'Password123!',
            repeatedPassword: 'Password123!'
        };

        const user = { ...defaultUser, ...userData };

        if (user.firstName !== undefined) await this.firstName.fill(user.firstName);
        if (user.lastName !== undefined) await this.lastName.fill(user.lastName);
        if (user.street !== undefined) await this.street.fill(user.street);
        if (user.city !== undefined) await this.city.fill(user.city);
        if (user.state !== undefined) await this.state.fill(user.state);
        if (user.zipCode !== undefined) await this.zipCode.fill(user.zipCode);
        if (user.phoneNumber !== undefined) await this.phoneNumber.fill(user.phoneNumber);
        if (user.ssn !== undefined) await this.ssn.fill(user.ssn);
        if (user.username !== undefined) await this.username.fill(user.username);
        if (user.password !== undefined) await this.password.fill(user.password);
        if (user.repeatedPassword !== undefined) await this.repeatedPassword.fill(user.repeatedPassword);

        return user;
    }

    async submit() {
        await this.registerButton.click();
    }

    async registerUser(userData) {
        const user = await this.fillRegistrationForm(userData);
        await this.submit();
        return user;
    }

    /**
     * Backward-compatible helper method.
     */
    async validateLogin() {
        return await this.registerUser({
            firstName: 'Aman',
            lastName: 'kori',
            street: 'sec66',
            city: 'Mohali',
            state: 'Pubjab',
            zipCode: '123456',
            phoneNumber: '1234567890',
            ssn: '12345678',
            username: 'amankori',
            password: 'Bhull@kd12',
            repeatedPassword: 'Bhull@kd12'
        });
    }
}

module.exports = { Registration };