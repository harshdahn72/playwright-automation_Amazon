const { test, expect } = require('@playwright/test');

test('Amazon Login Test', async ({ page }) => {
  // Navigate to Amazon.com
  await page.goto('https://www.amazon.com/');

  // Click on Sign In button
  await page.click('#nav-link-accountList');

  // Wait for the email input field to appear
  await page.waitForSelector('#ap_email');

  // Fill in login details
  await page.fill('#ap_email', 'tsterpatil@gmail.com');

  // Wait for the password input field to be visible with increased timeout
  await page.waitForSelector('#ap_password', { timeout: 10000 }); // Increase timeout to 10 seconds

  // Fill in the password
  await page.fill('#ap_password', 'test123');

  // Click on Sign In button
  await page.click('#signInSubmit');
});
