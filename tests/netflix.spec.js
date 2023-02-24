const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

test("my first test", async ({ page }) => {
  // go to todoapp
  await page.goto("https://todomvc.com/examples/react/#/");

  // enter a todo
  await page.fill(".new-todo", "write a test!");
  await page.keyboard.press("Enter");
  // complete the todo

  await page.click(".toggle")
  await page.waitForTimeout(1000)
});

// ADD YOUR TESTS HERE!

test.use({ headless: false, slowMo: 1000 });

test("homework", async ({ page }) => {
  // Go to Netflix homepage
  await page.goto('https://www.netflix.com');

  // Click on Sign In button
  await page.click('a[data-uia="header-login-link"]');

  // Enter invalid email and password
  await page.fill('input[name="userLoginId"]', 'badbunny@badrabbit.carrot');
  await page.fill('input[name="password"]', 'wrong!');

  // Submit the form
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation()
  ]);

  // Check if the error message is displayed
  const errorMessage = await page.$eval('div.ui-message-contents', el => el.textContent);
  expect(errorMessage).toContain("Sorry, we can't find an account with this email address. Please try again or create a new account.");

  // Take a screenshot of the error message
  await page.screenshot({ path: 'invalid-login.png' });
});