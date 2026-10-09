const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginUsername = page.locator('[name="username"]');
        this.loginPassword = page.locator('[name="password"]');
        this.loginButton = page.locator('[value="Log In"]');
        this.errorMessage = page.locator('p.error, .error');
        this.customerGreeting = page.getByText(/^Welcome\s+/);
    }

    async goto() {
        await this.page.goto('/parabank/login.htm', { waitUntil: 'domcontentloaded' });
    }

    async login(username, password) {
        // fill('') works for both empty and non-empty values
        await this.loginUsername.fill(username || '');
        await this.loginPassword.fill(password || '');
        await this.loginButton.click();
    }

    /**
     * Login and assert successful redirect to overview page.
     */
    async validateLogin(username = 'john', password = 'demo') {
        await this.login(username, password);
        await expect(this.page).toHaveURL(/\/overview\.htm/);
    }
}

module.exports = { LoginPage };