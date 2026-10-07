const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/poManager');
const testData = require('../Utils/testData');

test.describe('Bill Payment Service', () => {

    test.beforeEach(async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        // Login with stable pre-seeded demo user
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/overview\.htm/);
    });

    test('should successfully pay a bill with valid details', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const billPayPage = poManager.getBillPayPage();

        // 1. Navigate to Bill Pay
        await accountServicesPage.clickBillPay();
        await expect(page).toHaveURL(/billpay\.htm/);
        await expect(billPayPage.heading).toBeVisible();

        // 2. Submit payment details
        const paymentDetails = {
            name: 'Electric Power Co',
            street: '100 Energy Blvd',
            city: 'Metro City',
            state: 'CA',
            zipCode: '90210',
            phone: '5559876543',
            account: '778899',
            verifyAccount: '778899',
            amount: '65.50'
        };
        await billPayPage.fillBillPay(paymentDetails);

        // 3. Verify confirmation
        await expect(billPayPage.completeHeading).toBeVisible({ timeout: 10000 });
        await expect(billPayPage.payeeNameResult).toHaveText(paymentDetails.name);
        await expect(billPayPage.amountResult).toHaveText(`$${paymentDetails.amount}`);
    });

    test('should display validation errors when submitting an empty bill payment form', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const billPayPage = poManager.getBillPayPage();

        // 1. Navigate to Bill Pay
        await accountServicesPage.clickBillPay();
        await expect(page).toHaveURL(/billpay\.htm/);

        // 2. Click send payment without filling fields
        await billPayPage.submitButton.click();

        // 3. Verify that validation errors are displayed
        const errorLocators = billPayPage.errorMessages;
        await expect(errorLocators.first()).toBeVisible();
        const errorCount = await errorLocators.count();
        expect(errorCount).toBeGreaterThan(0);
    });

    test('should display validation error when account numbers do not match', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const billPayPage = poManager.getBillPayPage();

        // 1. Navigate to Bill Pay
        await accountServicesPage.clickBillPay();
        await expect(page).toHaveURL(/billpay\.htm/);

        // 2. Submit with mismatched account numbers
        await billPayPage.fillBillPay({
            name: 'Water Works',
            street: '45 Lake Rd',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
            phone: '5552223333',
            account: '12345',
            verifyAccount: '54321', // Mismatched
            amount: '30.00'
        });

        // 3. Verify mismatch error appears and payment is not completed
        await expect(billPayPage.completeHeading).not.toBeVisible();
        await expect(billPayPage.mismatchError).toBeVisible();
    });

});
