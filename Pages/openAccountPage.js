class OpenAccountPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Open New Account' });
        this.typeSelect = page.locator('#type');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.submitButton = page.locator('input[value="Open New Account"]');
        this.newAccountIdLink = page.locator('#newAccountId');
        this.confirmationMessage = page.getByRole('heading', { name: 'Account Opened!' });
    }

    async openAccount(type = 'SAVINGS') {
        await this.typeSelect.waitFor({ state: 'visible' });
        await this.typeSelect.selectOption(type);
        // Wait for the funding account dropdown options to load asynchronously via Angular
        await this.page.waitForTimeout(500);
        await this.fromAccountSelect.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }
}

module.exports = { OpenAccountPage };
