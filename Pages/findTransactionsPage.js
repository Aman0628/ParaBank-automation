class FindTransactionsPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Find Transactions' });
        this.accountSelect = page.locator('#accountId');
        this.transactionIdInput = page.locator('#transactionId');
        this.findByTxIdButton = page.locator('#findById');
        this.transactionDateInput = page.locator('#transactionDate');
        this.dateInput = this.transactionDateInput;
        this.findByDateButton = page.locator('#findByDate');
        this.fromDateInput = page.locator('#fromDate');
        this.toDateInput = page.locator('#toDate');
        this.findByDateRangeButton = page.locator('#findByDateRange');
        this.amountInput = page.locator('#amount');
        this.findByAmountButton = page.locator('#findByAmount');
        this.transactionTable = page.locator('#transactionTable');
        this.transactionRows = page.locator('#transactionBody tr');
        this.resultHeading = page.locator('#resultContainer h1');
        this.transactionIdError = page.locator('#transactionIdError');
        this.transactionDateError = page.locator('#transactionDateError');
        this.amountError = page.locator('#amountError');
    }

    async findByAmount(amount) {
        await this.amountInput.waitFor({ state: 'visible' });
        await this.amountInput.fill(amount.toString());
        await this.findByAmountButton.click();
    }

    async findByTransactionId(txId) {
        await this.transactionIdInput.waitFor({ state: 'visible' });
        await this.transactionIdInput.fill(txId.toString());
        await this.findByTxIdButton.click();
    }

    async findByDate(dateStr) {
        await this.transactionDateInput.waitFor({ state: 'visible' });
        await this.transactionDateInput.fill(dateStr);
        await this.findByDateButton.click();
    }
}

module.exports = { FindTransactionsPage };
