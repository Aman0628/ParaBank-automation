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

module.exports = { UpdateProfilePage };
