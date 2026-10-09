class AccountsOverviewPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
        this.accountTable = page.locator('#accountTable');
        this.accountRows = page.locator('#accountTable tbody tr');
        this.totalBalanceCell = page.locator('#accountTable tbody tr:last-child td:nth-child(2)');
    }

    async getAccountNumbers() {
        await this.accountTable.waitFor({ state: 'visible' });
        const links = this.page.locator('#accountTable tbody tr td a');
        await links.first().waitFor({ state: 'visible' });
        return await links.allInnerTexts();
    }
}

module.exports = { AccountsOverviewPage };
