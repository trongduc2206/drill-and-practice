const { test, expect } = require("@playwright/test");

test("Create and remove answer option successfully", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics/1");
    await page.locator("textarea[name=question_text]").fill("Second question");
    await page.locator("input[type=submit]").click();
    await expect(page.locator(`a >> text=Second question`)).toHaveText("Second question");

    await page.locator(`a >> text=Second question`).click();
    await page.locator("textarea[name=option_text]").fill("New option");
    await page.locator("input[type=checkbox][name=is_correct]").check();
    await page.locator("input[type=submit][value=Add]").click();
    await expect(page.locator(`label >> text=New option`)).toHaveText("New option");

    await page.getByRole('button', { name: 'Delete option' }).click();
    await expect(page.locator(`label >> text=New option`)).not.toBeAttached();

    await page.getByRole('button', { name: 'Delete question' }).click();
    await expect(page).toHaveURL('/topics/1');
});

test("Create answer option fail", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics/1");
    await page.locator("textarea[name=question_text]").fill("Third question");
    await page.locator("input[type=submit]").click();
    await expect(page.locator(`a >> text=Third question`)).toHaveText("Third question");

    await page.locator(`a >> text=Third question`).click();
    await page.locator("textarea[name=option_text]").fill(" ");
    await page.locator("input[type=checkbox][name=is_correct]").check();
    await page.locator("input[type=submit][value=Add]").click();
    await expect(page.locator("textarea[name=option_text]")).toHaveValue(" ");

    await page.getByRole('button', { name: 'Delete question' }).click();
    await expect(page).toHaveURL('/topics/1');
});