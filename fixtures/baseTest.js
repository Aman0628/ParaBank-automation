const base = require('@playwright/test');
const { LoginPage } = require('../Pages/loginPage');
const { Registration } = require('../Pages/register');
const { AccountServicesPage } = require('../Pages/accountServicesPage');
const { AccountsOverviewPage } = require('../Pages/accountsOverviewPage');
const { OpenAccountPage } = require('../Pages/openAccountPage');
const { TransferFundsPage } = require('../Pages/transferFundsPage');
const { BillPayPage } = require('../Pages/billPayPage');
const { FindTransactionsPage } = require('../Pages/findTransactionsPage');
const { UpdateProfilePage } = require('../Pages/updateProfilePage');
const { RequestLoanPage } = require('../Pages/requestLoanPage');
const { POManager } = require('../Pages/poManager');
const testData = require('../Utils/testData');

// Extend base test with custom page fixtures
const test = base.test.extend({
    poManager: async ({ page }, use) => {
        await use(new POManager(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new Registration(page));
    },
    accountServicesPage: async ({ page }, use) => {
        await use(new AccountServicesPage(page));
    },
    accountsOverviewPage: async ({ page }, use) => {
        await use(new AccountsOverviewPage(page));
    },
    openAccountPage: async ({ page }, use) => {
        await use(new OpenAccountPage(page));
    },
    transferFundsPage: async ({ page }, use) => {
        await use(new TransferFundsPage(page));
    },
    billPayPage: async ({ page }, use) => {
        await use(new BillPayPage(page));
    },
    findTransactionsPage: async ({ page }, use) => {
        await use(new FindTransactionsPage(page));
    },
    updateProfilePage: async ({ page }, use) => {
        await use(new UpdateProfilePage(page));
    },
    requestLoanPage: async ({ page }, use) => {
        await use(new RequestLoanPage(page));
    },

    // Authenticated fixture: Automatically logs in and lands on Account Overview
    authenticatedUser: async ({ page, loginPage, accountServicesPage }, use) => {
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await base.expect(page).toHaveURL(/overview\.htm/);

        // If ParaBank shows temporary internal error on fresh session, refresh via Accounts Overview
        const errorHeading = page.getByRole('heading', { name: 'Error!' });
        if (await errorHeading.isVisible({ timeout: 1500 }).catch(() => false)) {
            await accountServicesPage.clickAccountsOverview();
        }
        await use(page);
    }
});

module.exports = { test, expect: base.expect };
