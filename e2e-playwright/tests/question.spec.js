const { test, expect } = require("@playwright/test");

test("Create and remove question successfully", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics/1");
    await page.locator("textarea[name=question_text]").fill("New question");
    await page.locator("input[type=submit]").click();
    await expect(page.locator(`a >> text=New question`)).toHaveText("New question");

    await page.locator(`a >> text=New question`).click();
    await page.getByRole('button', { name: 'Delete question' }).click();
    await expect(page).toHaveURL('/topics/1');
});

test("Create question fail", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics/1");
    await page.locator("textarea[name=question_text]").type(" ");
    await page.locator("input[type=submit]").click();
    
    await expect(page.locator("textarea[name=question_text]")).toHaveValue(" ");
});