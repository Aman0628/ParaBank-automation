const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/poManager');
const testData = require('../Utils/testData');

test.describe('Login Functionality', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        await loginPage.goto();
        const { username, password } = testData.validUser;
        await loginPage.login(username, password);
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(loginPage.customerGreeting).toBeVisible();
    });

    test('should show error when logging in with invalid username', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        await loginPage.goto();
        await loginPage.login('non_existing_user_9999', testData.validUser.password);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(/could not be verified|error/i);
    });

    test('should show error when logging in with invalid password', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        await loginPage.goto();
        await loginPage.login(testData.validUser.username, 'WrongPassword123!');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(/could not be verified|error/i);
    });

    test('should show error when credentials are left empty', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        await loginPage.goto();
        // Use fill('') to clear the field instead of .clear() which can fail on a closed page
        await page.locator('[name="username"]').fill('');
        await page.locator('[name="password"]').fill('');
        await page.locator('[value="Log In"]').click();
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(/Please enter a username and password/i);
    });
});

test.describe('Parameterized Login Tests', () => {
    for (const data of testData.loginTestCases) {
        test(`Data-Driven Test: ${data.title}`, async ({ page }) => {
            const poManager = new POManager(page);
            const loginPage = poManager.getmeLogin();

            await loginPage.goto();

            // Use fill('') for empty values to avoid .clear() failing on closed contexts
            await page.locator('[name="username"]').fill(data.username);
            await page.locator('[name="password"]').fill(data.password);
            await page.locator('[value="Log In"]').click();

            if (data.expectedSuccess) {
                await expect(page).toHaveURL(data.expectedUrlPattern);
                await expect(loginPage.customerGreeting).toBeVisible();
            } else {
                await expect(loginPage.errorMessage).toBeVisible();
                await expect(loginPage.errorMessage).toContainText(data.expectedErrorMessage);
            }
        });
    }
});