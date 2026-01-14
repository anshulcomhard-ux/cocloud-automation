const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { AddUserPage } = require('../pages/adduser');

test.describe('Customer Portal - Add User', () => {
  test('should add a new instance user successfully', async ({ page }) => {
    console.log('=== Test: Add New Instance User ===');
    
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    // Test data for new user
    const newUserDisplayName = `Auto User ${Date.now()}`;
    const newUserEmail = `auto.user+${Date.now()}@example.com`;
    
    console.log(`\n[TEST] Test data:`);
    console.log(`  Display Name: "${newUserDisplayName}"`);
    console.log(`  Email: "${newUserEmail}"`);

    // Step 1: Login (includes subscription selection and skip security if needed)
    console.log('\n[STEP 1] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');

    // Step 2: Navigate to User Management
    console.log('\n[STEP 2] Navigating to User Management...');
    const addUserPage = new AddUserPage(page);
    await addUserPage.gotoUserManagement();
    console.log('✓ Navigated to User Management page');

    // Step 3: Add a new user via modal
    console.log('\n[STEP 3] Adding new user...');
    await addUserPage.addUser(newUserDisplayName, newUserEmail);
    console.log('✓ User addition completed');

    // Step 4: Verify the user is added (by email in the table)
    console.log('\n[STEP 4] Verifying user is present in table...');
    const isPresent = await addUserPage.isUserPresent(newUserEmail);
    console.log(`User present check result: ${isPresent}`);
    
    expect(isPresent).toBeTruthy();
    console.log('✓ User verified in table');

    // Optional: capture screenshot of User Management with new user
    console.log('\n[STEP 5] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/customer-add-user.png', fullPage: true });
    console.log('✓ Screenshot captured');
    
    console.log('\n=== Test Completed Successfully ===');
  });
});


