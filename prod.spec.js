const { test, expect } = require('@playwright/test');

test('Product Checkout Test', async ({ page }) => {
  // Navigate to Amazon.com
  await page.goto('https://www.amazon.com/');

  // Search for a product (replace 'Product Name' with an actual product name)
  await page.fill('#twotabsearchtextbox', 'SAMSUNG TV Remote Control BN59-01199F by Samsung');
  await page.click('input[type="submit"][value="Go"]');

  // Wait for search results to load
  await page.waitForSelector('.s-result-item');

  // Click on the first search result
  const firstResult = await page.$('.s-result-item');
  await firstResult.click();

  // Wait for the product page to load
  await page.waitForLoadState('domcontentloaded');

  // Wait for the "Add to Cart" button to be visible and clickable
  await page.waitForSelector('#add-to-cart-button', { state: 'visible', timeout: 10000 });
  await page.click('#add-to-cart-button');

  // Wait for the cart confirmation popup (if any)
  await page.waitForSelector('#huc-v2-order-row-confirm-text');

  // Click on the cart icon to proceed to checkout
  await page.click('#nav-cart');

  // Wait for the cart page to load
  await page.waitForLoadState('domcontentloaded');

  // Click on the Proceed to Checkout button
  await page.click('#hlb-ptc-btn-native');

  // Wait for the checkout page to load
  await page.waitForLoadState('domcontentloaded');

  // Verify that the checkout page is loaded
  const pageTitle = await page.title();
  expect(pageTitle).toContain('Checkout'); // Assuming the page title contains 'Checkout'
});
