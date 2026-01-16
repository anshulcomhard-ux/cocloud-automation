/**
 * Login helper function for customer portal
 * Handles login flow including subscription modal selection
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} baseUrl - Base URL of the customer portal
 * @param {string} email - User email
 * @param {string} password - User password
 */
async function login(page, baseUrl, email, password) {
  console.log(`Navigating to ${baseUrl}`);
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Fill email
  const emailInput = page.locator('input#email, input[name="email"], input[type="email"], input[placeholder*="email" i]').first();
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill(email);
  console.log('✓ Filled email');

  // Fill password
  const passwordInput = page.locator('input#password, input[name="password"], input[type="password"], input[placeholder*="password" i]').first();
  await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
  await passwordInput.fill(password);
  console.log('✓ Filled password');

  // Click login button
  const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
  await loginButton.waitFor({ state: 'visible', timeout: 10000 });
  await loginButton.click();
  console.log('✓ Clicked login button');

  // Wait for navigation or modal
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Handle subscription modal if it appears
  console.log('Checking for subscription selection modal...');
  const subscriptionModal = page.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
  const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

  if (modalVisible) {
    console.log('✓ Subscription modal is visible');

    // Wait for subscription options to load
    await page.waitForTimeout(1000);

    // Select the first available subscription
    const firstSubscriptionRadio = page.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
    const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

    if (radioVisible) {
      await firstSubscriptionRadio.click();
      await page.waitForTimeout(500);
      console.log('✓ Selected first subscription');

      // Look for submit/confirm button in modal
      const modalSubmitButton = page.locator(
        'div.modal button:has-text("Submit"), ' +
        'div.modal button:has-text("Confirm"), ' +
        'div.modal button:has-text("Select"), ' +
        'div.modal button[type="submit"], ' +
        'div.common-modal button:has-text("Submit"), ' +
        'div.common-modal button:has-text("Confirm")'
      ).first();

      const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (submitButtonVisible) {
        await modalSubmitButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        console.log('✓ Clicked submit/confirm button in subscription modal');
      } else {
        console.log('⚠ No submit button found, modal may close automatically');
        await page.waitForTimeout(2000);
      }
    } else {
      console.log('⚠ No subscription radio buttons found');
    }
  } else {
    console.log('⚠ Subscription modal not visible, continuing...');
  }

  // Wait for dashboard to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  console.log('✓ Login process completed');
}

module.exports = { login };