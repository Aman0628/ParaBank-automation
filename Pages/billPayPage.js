class BillPayPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Bill Payment Service' });
        this.payeeNameInput = page.locator('[name="payee.name"]');
        this.streetInput = page.locator('[name="payee.address.street"]');
        this.cityInput = page.locator('[name="payee.address.city"]');
        this.stateInput = page.locator('[name="payee.address.state"]');
        this.zipCodeInput = page.locator('[name="payee.address.zipCode"]');
        this.phoneInput = page.locator('[name="payee.phoneNumber"]');
        this.accountInput = page.locator('[name="payee.accountNumber"]');
        this.verifyAccountInput = page.locator('[name="verifyAccount"]');
        this.amountInput = page.locator('[name="amount"]');
        this.fromAccountSelect = page.locator('[name="fromAccountId"]');
        this.submitButton = page.locator('input[value="Send Payment"]');
        this.completeHeading = page.getByRole('heading', { name: 'Bill Payment Complete' });
        this.payeeNameResult = page.locator('#payeeName');
        this.amountResult = page.locator('#amount');
        this.fromAccountIdResult = page.locator('#fromAccountId');
        this.errorMessages = page.locator('.error');
        this.mismatchError = page.getByText('The account numbers do not match.');
    }

    async fillBillPay(payeeData) {
        if (payeeData.name !== undefined) await this.payeeNameInput.fill(payeeData.name);
        if (payeeData.street !== undefined) await this.streetInput.fill(payeeData.street);
        if (payeeData.city !== undefined) await this.cityInput.fill(payeeData.city);
        if (payeeData.state !== undefined) await this.stateInput.fill(payeeData.state);
        if (payeeData.zipCode !== undefined) await this.zipCodeInput.fill(payeeData.zipCode);
        if (payeeData.phone !== undefined) await this.phoneInput.fill(payeeData.phone);
        if (payeeData.account !== undefined) await this.accountInput.fill(payeeData.account);
        if (payeeData.verifyAccount !== undefined) {
            await this.verifyAccountInput.fill(payeeData.verifyAccount);
        } else if (payeeData.account !== undefined) {
            await this.verifyAccountInput.fill(payeeData.account);
        }
        if (payeeData.amount !== undefined) await this.amountInput.fill(payeeData.amount);
        await this.page.waitForTimeout(300);
        await this.submitButton.click();
    }
}

module.exports = { BillPayPage };
