const { test, expect } = require("playwright/test")

test("End To End registration ", async ({ page }) => {

    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('[id = "customer.firstName"]');
    await page.locator('[id = "customer.lastName"]');
    await page.locator('[id = "customer.address.street"]');
    await page.locator('[id = "customer.address.city"]');
    await page.locator('[id = "customer.address.state"]');
    await page.locator('[id = "customer.address.zipCode"]');
    await page.locator('[id = "customer.phoneNumber"]');
    await page.locator('[id = "customer.ssn"]');
    await page.locator('[id = "customer.username"]');
    await page.locator('[id = "customer.password"]');
    await page.locator('[id = "repeatedPassword"]');
    await page.getByRole("button", { name: "Register" });

    
});

test("End To End test case", async ({ page }) => {

    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator('[ name="username" ]').fill("amankori");
    await page.locator('[name="password"]').fill("BhulL@kd12");
    await page.locator('[value="Log In"]').click();

    await expect(page).toHaveURL("https://parabank.parasoft.com/parabank/overview.htm");
})