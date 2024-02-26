const { test, expect } = require('@playwright/test');

test('Wishlist Functionality Test', async ({ page }) => {
  // Navigate to the Amazon website
  await page.goto('https://www.amazon.com/');

  // Click on Sign In button
  await page.click('#nav-link-accountList');

  // Wait for the email input field to appear
  await page.waitForSelector('#ap_email');

  // Fill in login details
  await page.fill('#ap_email', 'tstr.patil@gmail.com'); // Replace with your email
  await page.click('#continue');

  // Wait for the password input field to appear
  await page.waitForSelector('#ap_password');

  // Fill in the password
  await page.fill('#ap_password', 'test123'); // Replace with your password
  await page.click('#signInSubmit');

  // Check if the page is redirected to a CAPTCHA verification page
  const captchaPage = await page.$('#auth-captcha-form');
  if (captchaPage) {
    console.log('CAPTCHA verification page detected. Skipping test.');
    return;
  }

  // Wait for the page to finish loading
  await page.waitForLoadState('networkidle');

  // Navigate to a product page
  await page.goto('https://www.amazon.com/dp/B08ZJ6FST2'); // Replace with a valid product URL

  // Click on the "Add to Wish List" button
  await page.click('#wishListMainButton');

  // Wait for the "Added to Wish List" confirmation message
  await page.waitForSelector('.a-alert-success');

  // Verify that the product is added to the wishlist successfully
  const successMessage = await page.textContent('.a-alert-success');
  expect(successMessage).toContain('Added to Wish List'); // Assuming the success message contains this text
});
