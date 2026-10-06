const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/poManager');

test.describe('Customer Registration', () => {
    test('should register a new user successfully with unique credentials', async ({ page }) => {
        const poManager = new POManager(page);
        const registerPage = poManager.getmeRegistration();

        await registerPage.goto();
        const uniqueUsername = `user_${Date.now()}`;
        const user = await registerPage.registerUser({ username: uniqueUsername });

        // Assert success heading and welcome message
        await expect(registerPage.successHeading).toContainText(`Welcome ${user.username}`);
        await expect(registerPage.successMessage).toContainText(/Your account was created successfully/i);
    });

    test('should show validation errors when submitting an empty registration form', async ({ page }) => {
        const poManager = new POManager(page);
        const registerPage = poManager.getmeRegistration();

        await registerPage.goto();
        await registerPage.submit();

        // Validate presence of field errors
        await expect(page.locator('[id="customer.firstName.errors"]')).toBeVisible();
        await expect(page.locator('[id="customer.lastName.errors"]')).toBeVisible();
        await expect(page.locator('[id="customer.username.errors"]')).toBeVisible();
    });

    test('should show error when password and confirmation password do not match', async ({ page }) => {
        const poManager = new POManager(page);
        const registerPage = poManager.getmeRegistration();

        await registerPage.goto();
        await registerPage.registerUser({
            username: `user_${Date.now()}`,
            password: 'Password123!',
            repeatedPassword: 'DifferentPassword456!'
        });

        await expect(registerPage.passwordConfirmError).toBeVisible();
        await expect(registerPage.passwordConfirmError).toContainText(/Passwords did not match/i);
    });
});