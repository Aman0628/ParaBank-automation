const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/poManager');
const testData = require('../Utils/testData');

test.describe('Find Transactions Functionality', () => {

    test.beforeEach(async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getmeLogin();

        // Login with stable pre-seeded demo user
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/overview\.htm/);
    });

    test('should load find transactions page with all search forms', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const findTransactionsPage = poManager.getFindTransactionsPage();

        // Navigate to Find Transactions
        await accountServicesPage.clickFindTransactions();
        await expect(page).toHaveURL(/findtrans\.htm/);
        await expect(findTransactionsPage.heading).toBeVisible();

        // Verify all 4 search input criteria are displayed
        await expect(findTransactionsPage.transactionIdInput).toBeVisible();
        await expect(findTransactionsPage.dateInput).toBeVisible();
        await expect(findTransactionsPage.fromDateInput).toBeVisible();
        await expect(findTransactionsPage.toDateInput).toBeVisible();
        await expect(findTransactionsPage.amountInput).toBeVisible();
    });

    test('should search transactions by amount and display results or table', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const findTransactionsPage = poManager.getFindTransactionsPage();

        // 1. Navigate to Find Transactions
        await accountServicesPage.clickFindTransactions();
        await expect(page).toHaveURL(/findtrans\.htm/);

        // 2. Search by amount
        await findTransactionsPage.findByAmount('100');

        // 3. Verify results container or heading is displayed
        await expect(findTransactionsPage.resultHeading).toBeVisible({ timeout: 10000 });
        await expect(findTransactionsPage.transactionTable).toBeVisible();
    });

    test('should search transactions by date and display results table', async ({ page }) => {
        const poManager = new POManager(page);
        const accountServicesPage = poManager.getAccountServicesPage();
        const findTransactionsPage = poManager.getFindTransactionsPage();

        // 1. Navigate to Find Transactions
        await accountServicesPage.clickFindTransactions();
        await expect(page).toHaveURL(/findtrans\.htm/);

        // 2. Format today's date MM-DD-YYYY
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${month}-${day}-${year}`;

        // 3. Search by today's date
        await findTransactionsPage.findByDate(formattedDate);

        // 4. Verify results
        await expect(findTransactionsPage.resultHeading).toBeVisible({ timeout: 10000 });
        await expect(findTransactionsPage.transactionTable).toBeVisible();
    });

});
