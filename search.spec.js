const { test, expect } = require('@playwright/test');

test('Search Functionality Test', async ({ page }) => {
  // Navigate to the Amazon website
  await page.goto('https://www.amazon.com/');

  // Enter search query in the search bar
  await page.type('#twotabsearchtextbox', 'laptop'); // Replace 'laptop' with the desired search query

  // Click on the search button
  await page.click('#nav-search-submit-button');

  // Wait for the search results to load
  await page.waitForSelector('.s-main-slot');

  // Validate search results
  const searchResults = await page.$$('.s-result-item');
  expect(searchResults.length).toBeGreaterThan(0); // Assuming at least one search result is displayed

  // Extract the text of the first search result
  const firstResultText = await searchResults[0].textContent();
  console.log('First search result:', firstResultText);

  // Optionally, you can add more validations here such as checking if the search results match the expected criteria
});
