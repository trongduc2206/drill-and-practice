const { test, expect } = require("@playwright/test");

test("Register successfully", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email][name=email]").type("test@gmail.com");
    await page.locator("input[type=password][name=password]").type("1234");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/auth/login");
    await page.locator("input[type=email][name=email]").type("test@gmail.com");
    await page.locator("input[type=password][name=password]").type("1234");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/topics");
});

test("Register fail with less than 4 character password", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email][name=email]").type("test@gmail.com");
    await page.locator("input[type=password][name=password]").type("123");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/auth/register");
    await expect(page.locator("input[type=email][name=email]")).toHaveValue("test@gmail.com");
    await expect(page.locator("input[type=password][name=password]")).toHaveValue("123");
});