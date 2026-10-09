// Find Transactions Edge Cases
const { test, expect } = require('@playwright/test');
const { POManager } = require('../Pages/poManager');
const testData = require('../Utils/testData');

test.describe('Find Transactions Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    const po = new POManager(page);
    const login = po.getmeLogin();
    await login.goto();
    await login.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL(/overview\.htm/);
  });

  test('should show error when searching with invalid transaction ID', async ({ page }) => {
    const po = new POManager(page);
    const accountServices = po.getAccountServicesPage();
    const findTx = po.getFindTransactionsPage();
    await accountServices.clickFindTransactions();
    await expect(page).toHaveURL(/findtrans\.htm/);
    await findTx.findByTransactionId('nonexistent123');
    // Expect an error element (generic .error) to become visible
    await expect(findTx.errorMessage).toBeVisible();
  });

  test('should handle date‑range search and display results', async ({ page }) => {
    const po = new POManager(page);
    const accountServices = po.getAccountServicesPage();
    const findTx = po.getFindTransactionsPage();
    await accountServices.clickFindTransactions();
    await expect(page).toHaveURL(/findtrans\.htm/);
    // Use a recent past range (e.g., last 30 days)
    const today = new Date();
    const to = `${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}-${today.getFullYear()}`;
    const past = new Date();
    past.setDate(past.getDate() - 30);
    const from = `${String(past.getMonth()+1).padStart(2,'0')}-${String(past.getDate()).padStart(2,'0')}-${past.getFullYear()}`;
    // Fill range fields directly (no helper method exists yet)
    await findTx.fromDateInput.fill(from);
    await findTx.toDateInput.fill(to);
    await findTx.findByDateRangeButton.click();
    await expect(findTx.resultHeading).toBeVisible({ timeout: 10000 });
    await expect(findTx.transactionTable).toBeVisible();
  });

  test('should show validation error for invalid date format in single date search', async ({ page }) => {
    const po = new POManager(page);
    const accountServices = po.getAccountServicesPage();
    const findTx = po.getFindTransactionsPage();
    await accountServices.clickFindTransactions();
    await expect(page).toHaveURL(/findtrans\.htm/);
    await findTx.findByDate('13-32-2022'); // malformed
    await expect(findTx.transactionDateError).toBeVisible();
  });

  test('should handle zero‑result amount search gracefully', async ({ page }) => {
    const po = new POManager(page);
    const accountServices = po.getAccountServicesPage();
    const findTx = po.getFindTransactionsPage();
    await accountServices.clickFindTransactions();
    await expect(page).toHaveURL(/findtrans\.htm/);
    // Choose an amount unlikely to exist, e.g., 9999999
    await findTx.findByAmount('9999999');
    await expect(findTx.resultHeading).toBeVisible({ timeout: 10000 });
    // Expect zero rows in the result table
    await expect(findTx.transactionRows).toHaveCount(0);
  });
});
