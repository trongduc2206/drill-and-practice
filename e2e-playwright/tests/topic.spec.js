const { test, expect } = require("@playwright/test");

test("Admin can create new topic", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();
    
    await expect(page).toHaveURL("/topics");
    await page.locator("input[type=text][name=name]").type("New Topic");
    await page.locator("input[type=submit][value=Create]").click();
    await expect(page.locator(`a >> text=New topic`)).toHaveText("New Topic");
});

test("Non-admin user can not create and remove new topic", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email][name=email]").type("test1@gmail.com");
    await page.locator("input[type=password][name=password]").type("1234");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/auth/login");

    await page.locator("input[type=email][name=email]").type("test1@gmail.com");
    await page.locator("input[type=password][name=password]").type("1234");
    await page.locator("input[type=submit]").click();

    await expect(page).toHaveURL("/topics");

    await expect(page.locator("input[type=text][name=name]")).not.toBeAttached();
    await expect(page.locator("input[type=submit]")).not.toBeAttached();
});