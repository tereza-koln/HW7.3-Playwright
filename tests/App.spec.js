const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");

test("Valid Authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill(password);
  await page.screenshot({ path: './screenshots/validAutorization1.png' });
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL("https://netology.ru/profile/8444009");
  await page.waitForSelector("h2");

  const title = await page.$eval("h2", (element) => element.textContent);

  expect(title).toBe("Моё обучение");
});

test("Not Valid Authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");  
  await page.getByPlaceholder('Email').fill("test@yandex.ru");
  await page.getByPlaceholder('Пароль').fill("qwerty12345");
  await page.screenshot({ path: './screenshots/notValidAutorization1.png' });
  await page.getByTestId('login-submit-btn').click();  

  await expect(page.locator("data-testid=login-error-hint")).toContainText("Вы ввели неправильно логин или пароль");
});