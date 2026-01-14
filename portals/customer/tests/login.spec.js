const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Customer Portal - Login & Subscription', () => {
  test('should login, select subscription and display dashboard', async ({ page }) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    // Step 1: Use the login helper to:
    // - open the login page
    // - enter email and password
    // - click on Login button
    // - wait for subscription modal, select subscription and confirm
    // - wait for navigation to dashboard
    await login(page, baseUrl, email, password);

    // Step 2: Verify the Dashboard page is visible using DashboardPage PageObject
    const dashboardPage = new DashboardPage(page);
    await expect(await dashboardPage.isVisible()).toBeTruthy();

    // Step 3: Capture a screenshot after reaching dashboard
    await page.screenshot({ path: 'artifacts/customer-dashboard.png', fullPage: true });
  });
});
