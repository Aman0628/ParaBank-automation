const { expect } = require('@playwright/test');

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

class TransferFundsPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.fromAccountIdSelect = page.locator('#fromAccountId');
        this.toAccountIdSelect = page.locator('#toAccountId');
        this.submitButton = page.locator('input[value="Transfer"]');
        this.completeHeading = page.getByRole('heading', { name: 'Transfer Complete!' });
        this.amountResult = page.locator('#amountResult');
        this.fromAccountIdResult = page.locator('#fromAccountIdResult');
        this.toAccountIdResult = page.locator('#toAccountIdResult');
        this.errorMessage = page.locator('.error');
    }

    async transfer(amount) {
        await this.amountInput.waitFor({ state: 'visible' });
        // Give dropdowns a moment to populate from Angular
        await this.fromAccountIdSelect.locator('option').first().waitFor({ state: 'attached', timeout: 10000 });
        await this.amountInput.fill(amount.toString());
        await this.page.waitForTimeout(500);
        await this.submitButton.click();
    }
}

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

class UpdateProfilePage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Update Profile' });
        this.firstNameInput = page.locator('[id="customer.firstName"]');
        this.lastNameInput = page.locator('[id="customer.lastName"]');
        this.streetInput = page.locator('[id="customer.address.street"]');
        this.cityInput = page.locator('[id="customer.address.city"]');
        this.stateInput = page.locator('[id="customer.address.state"]');
        this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
        this.phoneInput = page.locator('[id="customer.phoneNumber"]');
        this.submitButton = page.locator('input[value="Update Profile"]');
        this.confirmationHeading = page.getByRole('heading', { name: 'Profile Updated' });
        this.errorMessages = page.locator('.error');
    }

    async updateProfile(profileData) {
        // Wait for form to pre-populate with existing customer data
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.page.waitForFunction(() => {
            const el = document.querySelector('[id="customer.firstName"]');
            return el && el.value !== '';
        }, { timeout: 10000 }).catch(() => {});

        if (profileData.firstName !== undefined) await this.firstNameInput.fill(profileData.firstName);
        if (profileData.lastName !== undefined) await this.lastNameInput.fill(profileData.lastName);
        if (profileData.street !== undefined) await this.streetInput.fill(profileData.street);
        if (profileData.city !== undefined) await this.cityInput.fill(profileData.city);
        if (profileData.state !== undefined) await this.stateInput.fill(profileData.state);
        if (profileData.zipCode !== undefined) await this.zipCodeInput.fill(profileData.zipCode);
        if (profileData.phone !== undefined) await this.phoneInput.fill(profileData.phone);
        await this.submitButton.click();
    }
}

class RequestLoanPage {
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Apply for a Loan' });
        this.amountInput = page.locator('#amount');
        this.downPaymentInput = page.locator('#downPayment');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.submitButton = page.locator('input[value="Apply Now"]');
        this.loanStatus = page.locator('#loanStatus');
        this.loanProvider = page.locator('#loanProviderName');
        this.newAccountId = page.locator('#newAccountId');
        this.errorMessage = page.locator('.error');
    }

    async applyLoan(amount, downPayment) {
        await this.amountInput.waitFor({ state: 'visible' });
        await this.amountInput.fill(amount.toString());
        await this.downPaymentInput.fill(downPayment.toString());
        await this.page.waitForTimeout(500);
        await this.submitButton.click();
    }
}

module.exports = {
    AccountServicesPage,
    AccountsOverviewPage,
    OpenAccountPage,
    TransferFundsPage,
    BillPayPage,
    FindTransactionsPage,
    UpdateProfilePage,
    RequestLoanPage
};
