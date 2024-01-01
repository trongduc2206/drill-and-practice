const { test, expect } = require("@playwright/test");

test("Non-authorized users are directed to login page in attempt to access paths /topics or /quiz", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveURL("/auth/login");
    await page.goto("/quiz");
    await expect(page).toHaveURL("/auth/login");
});

test("Authorized users can access paths /topics or /quiz", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();
    
    await page.goto("/topics");
    await expect(page).toHaveURL("/topics");
    await page.goto("/quiz");
    await expect(page).toHaveURL("/quiz");
});