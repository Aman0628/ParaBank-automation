const { Registration } = require("../Pages/register")
const { LoginPage } = require("../Pages/loginPage")
const {
    AccountServicesPage,
    AccountsOverviewPage,
    OpenAccountPage,
    TransferFundsPage,
    BillPayPage,
    FindTransactionsPage,
    UpdateProfilePage,
    RequestLoanPage,
} = require("../Pages/accountServices")

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

    getmeRegistration (){
        return this.register;
    }
    getmeLogin (){
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
module.exports = { POManager }