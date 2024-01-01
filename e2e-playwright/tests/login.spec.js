const { test, expect } = require("@playwright/test");

test("Login with admin account", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/topics");
});

test("Login with wrong password", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("12345");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/auth/login");
    await expect(page.locator("input[type=email][name=email]")).toHaveValue("admin@admin.com");
    await expect(page.locator("input[type=password][name=password]")).toHaveValue("12345");
});