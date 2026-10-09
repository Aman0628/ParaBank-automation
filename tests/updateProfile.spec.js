const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/poManager');
const testData = require('../Utils/testData');

test.describe('Update Contact Information Functionality', () => {

    test.beforeEach(async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        // Login with stable pre-seeded demo user
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/overview\.htm/);
    });

    test('should load existing customer profile details', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const updateProfilePage = poManager.getUpdateProfilePage();

        // 1. Navigate to Update Contact Info
        await accountServicesPage.clickUpdateContactInfo();
        await expect(page).toHaveURL(/updateprofile\.htm/);
        await expect(updateProfilePage.heading).toBeVisible();

        // 2. Wait for populated values
        await expect(updateProfilePage.firstNameInput).toBeVisible();
        await expect(updateProfilePage.lastNameInput).toBeVisible();
        await expect(updateProfilePage.streetInput).toBeVisible();
        await expect(updateProfilePage.cityInput).toBeVisible();
        await expect(updateProfilePage.stateInput).toBeVisible();
        await expect(updateProfilePage.zipCodeInput).toBeVisible();
    });

    test('should successfully update customer contact information', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const updateProfilePage = poManager.getUpdateProfilePage();

        // 1. Navigate to Update Contact Info
        await accountServicesPage.clickUpdateContactInfo();
        await expect(page).toHaveURL(/updateprofile\.htm/);

        // 2. Update address & phone number
        const updatedPhone = '9876543210';
        await updateProfilePage.updateProfile({
            phone: updatedPhone
        });

        // 3. Verify confirmation heading
        await expect(updateProfilePage.confirmationHeading).toBeVisible({ timeout: 10000 });
        await expect(page.locator('#updateProfileResult')).toContainText('Your updated address and phone number have been added to the system');
    });

    test('should show validation error when required field is cleared', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const updateProfilePage = poManager.getUpdateProfilePage();

        // 1. Navigate to Update Contact Info
        await accountServicesPage.clickUpdateContactInfo();
        await expect(page).toHaveURL(/updateprofile\.htm/);

        // 2. Clear First Name and submit
        await updateProfilePage.firstNameInput.waitFor({ state: 'visible' });
        await updateProfilePage.firstNameInput.fill('');
        await updateProfilePage.submitButton.click();

        // 3. Verify validation error appears or submission is blocked
        await expect(updateProfilePage.confirmationHeading).not.toBeVisible();
        await expect(updateProfilePage.errorMessages.first()).toBeVisible();
    });

});
