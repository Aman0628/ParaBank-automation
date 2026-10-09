const { Registration } = require("../Pages/register");
const { LoginPage } = require("../Pages/loginPage");
const { AccountServicesPage } = require("../Pages/accountServicesPage");
const { AccountsOverviewPage } = require("../Pages/accountsOverviewPage");
const { OpenAccountPage } = require("../Pages/openAccountPage");
const { TransferFundsPage } = require("../Pages/transferFundsPage");
const { BillPayPage } = require("../Pages/billPayPage");
const { FindTransactionsPage } = require("../Pages/findTransactionsPage");
const { UpdateProfilePage } = require("../Pages/updateProfilePage");
const { RequestLoanPage } = require("../Pages/requestLoanPage");

class POManager {
    constructor(page) {
        this.page = page;

        this.register = new Registration(page);
        this.loginPage = new LoginPage(page);
        this.accountServicesPage = new AccountServicesPage(page);
        this.accountsOverviewPage = new AccountsOverviewPage(page);
        this.openAccountPage = new OpenAccountPage(page);
        this.transferFundsPage = new TransferFundsPage(page);
        this.billPayPage = new BillPayPage(page);
        this.findTransactionsPage = new FindTransactionsPage(page);
        this.updateProfilePage = new UpdateProfilePage(page);
        this.requestLoanPage = new RequestLoanPage(page);
    }

    getmeRegistration() {
        return this.register;
    }
    getmeLogin() {
        return this.loginPage;
    }
    getAccountServicesPage() {
        return this.accountServicesPage;
    }
    getAccountsOverviewPage() {
        return this.accountsOverviewPage;
    }
    getOpenAccountPage() {
        return this.openAccountPage;
    }
    getTransferFundsPage() {
        return this.transferFundsPage;
    }
    getBillPayPage() {
        return this.billPayPage;
    }
    getFindTransactionsPage() {
        return this.findTransactionsPage;
    }
    getUpdateProfilePage() {
        return this.updateProfilePage;
    }
    getRequestLoanPage() {
        return this.requestLoanPage;
    }
}

module.exports = { POManager };