async function login(page, url, email, password) {
  await page.goto(url);
  await page.fill('//*[@id="email"]', email);
  await page.fill('//*[@id="password"]', password);
  await page.click('button[type="submit"]');

  // Wait a bit for modal to appear if it exists - with error handling
  try {
    await Promise.race([
      page.waitForTimeout(2000),
      page.waitForLoadState('domcontentloaded', { timeout: 3000 }).catch(() => {})
    ]);
  } catch (error) {
    if (error.message && error.message.includes('Target page, context or browser has been closed')) {
      throw new Error('Page was closed during login. This may indicate a navigation issue or authentication failure.');
    }
    // If it's just a timeout, continue
  }

  // Check if subscription selection modal is visible
  const subscriptionModal = page.locator('.modal-content:has-text("Select Subscription"), .modal:has-text("Select Subscription"), .modal-dialog:has-text("Select Subscription"), table:has-text("SUB-")').first();
  const isModalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

  if (isModalVisible) {
    // Modal is visible, select a subscription option
    // Try to find subscription radio buttons in a table
    const subscriptionTable = page.locator('table:has(input[type="radio"])').first();
    const tableVisible = await subscriptionTable.isVisible({ timeout: 3000 }).catch(() => false);

    if (tableVisible) {
      // Select the first available subscription radio button
      const firstRadio = subscriptionTable.locator('input[type="radio"]').first();
      await firstRadio.click({ timeout: 5000 });
      
      // Look for a confirm/submit button in the modal (could be "Confirm", "Submit", "OK", etc.)
      const confirmButton = page.locator('.modal-content button:has-text("Confirm"), .modal-content button:has-text("Submit"), .modal-content button:has-text("OK"), .modal-content button[type="submit"]').first();
      const confirmVisible = await confirmButton.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (confirmVisible) {
        await confirmButton.click();
      }
    } else {
      // Try alternative approach - look for radio buttons directly
      const radioButtons = page.locator('.modal-content input[type="radio"]');
      const radioCount = await radioButtons.count();
      
      if (radioCount > 0) {
        await radioButtons.first().click();
        
        // Click confirm button if exists
        const confirmButton = page.locator('.modal-content button:has-text("Confirm"), .modal-content button:has-text("Submit"), .modal-content button[type="submit"]').first();
        const confirmVisible = await confirmButton.isVisible({ timeout: 3000 }).catch(() => false);
        if (confirmVisible) {
          await confirmButton.click();
        }
      }
    }

    // Wait for navigation after subscription selection
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  } else {
    // No modal, just wait for navigation to dashboard
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  }

  // Handle security skip if it appears
  const skipSecurityButton = page.locator('.modal-content button:has-text("Skip, I don\'t want security"), button:has-text("Skip")').first();
  const skipVisible = await skipSecurityButton.isVisible({ timeout: 5000 }).catch(() => false);
  
  if (skipVisible) {
    await skipSecurityButton.click();
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  }
}

module.exports = { login };