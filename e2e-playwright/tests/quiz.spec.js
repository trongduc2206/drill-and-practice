const { test, expect } = require("@playwright/test");

test("Answer quiz", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email][name=email]").type("admin@admin.com");
    await page.locator("input[type=password][name=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics/1");
    await page.locator("textarea[name=question_text]").fill("Quiz question");
    await page.locator("input[type=submit]").click();
    await expect(page.locator(`a >> text=Quiz question`)).toHaveText("Quiz question");

    await page.locator(`a >> text=Quiz question`).click();

    await page.locator("textarea[name=option_text]").fill("True");
    await page.locator("input[type=checkbox][name=is_correct]").check();
    await page.locator("input[type=submit][value=Add]").click();
    await expect(page.locator(`label >> text=True`)).toHaveText("True");

    await page.locator("textarea[name=option_text]").fill("False");
    await page.locator("input[type=submit][value=Add]").click();
    await expect(page.locator(`label >> text=False`)).toHaveText("False");

    await page.goto("/quiz");
    await page.locator(`a >> text=Finnish language`).click();

    await page.getByTestId('True').click();
    await expect(page.locator(`h1 >> text=Correct!`)).toHaveText("Correct!");
    await page.locator(`a >> text=Next question`).click();

    await page.getByTestId('False').click();
    await expect(page.locator(`h1 >> text=Incorrect!`)).toHaveText("Incorrect!");
});