class AccountServicesPage {
    constructor(page) {
        this.page = page;
        this.openAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.accountsOverviewLink = page.getByRole('link', { name: 'Accounts Overview' });
        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
        this.findTransactionsLink = page.getByRole('link', { name: 'Find Transactions' });
        this.updateContactInfoLink = page.getByRole('link', { name: 'Update Contact Info' });
        this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
        this.logOutLink = page.getByRole('link', { name: 'Log Out' });
    }

    async clickOpenAccount() {
        await this.openAccountLink.click();
    }

    async clickAccountsOverview() {
        await this.accountsOverviewLink.click();
    }

    async clickTransferFunds() {
        await this.transferFundsLink.click();
    }

    async clickBillPay() {
        await this.billPayLink.click();
    }

    async clickFindTransactions() {
        await this.findTransactionsLink.click();
    }

    async clickUpdateContactInfo() {
        await this.updateContactInfoLink.click();
    }

    async clickRequestLoan() {
        await this.requestLoanLink.click();
    }

    async clickLogOut() {
        await this.logOutLink.click();
    }
}

module.exports = { AccountServicesPage };
