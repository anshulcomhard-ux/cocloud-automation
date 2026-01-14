const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { AccountDetailsPage } = require('../pages/accountdetails');

test.describe('Customer Portal - Account Details', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

  // ========================
  // VERIFY PAGE LOAD
  // ========================
  test('should verify Account Details page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Account Details Page Load ===');
    
    const accountDetailsPage = new AccountDetailsPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Account Details page from sidebar
    console.log('\n[STEP 1] Navigating to Account Details page from sidebar...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Account Details page' });
    await accountDetailsPage.gotoAccountDetails();
    console.log('✓ Navigated to Account Details page');
    
    // Verify page heading is visible (verify page reload by retrieving heading only)
    console.log('\n[STEP 2] Verifying page heading...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify page heading' });
    await page.waitForTimeout(2000); // Wait for page to fully load
    
    const pageHeading = await accountDetailsPage.pageHeading.isVisible({ timeout: 10000 }).catch(() => false);
    expect(pageHeading).toBeTruthy();
    
    const headingText = await accountDetailsPage.pageHeading.textContent().catch(() => '');
    console.log(`✓ Page heading retrieved: "${headingText ? headingText.trim() : 'N/A'}"`);
    expect(headingText.toLowerCase()).toContain('account details');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY PURCHASE USERS BUTTON NAVIGATION
  // ========================
  test('should verify Purchase Users button navigation', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Purchase Users Button Navigation ===');
    
    const accountDetailsPage = new AccountDetailsPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Account Details page
    console.log('\n[STEP 1] Navigating to Account Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Account Details page' });
    await accountDetailsPage.gotoAccountDetails();
    console.log('✓ Navigated to Account Details page');
    
    // Click on "Purchase Users" button
    console.log('\n[STEP 2] Clicking on Purchase Users button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Purchase Users button' });
    await accountDetailsPage.clickPurchaseUsers();
    console.log('✓ Clicked Purchase Users button');
    
    // Assert navigation happens
    console.log('\n[STEP 3] Verifying navigation happened...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify navigation' });
    await page.waitForTimeout(2000); // Wait for navigation
    const currentUrl = await accountDetailsPage.getCurrentUrl();
    console.log(`Current URL: ${currentUrl}`);
    
    // Verify URL contains "payment"
    console.log('\n[STEP 4] Verifying URL contains "payment"...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify payment URL' });
    const isPaymentPage = await accountDetailsPage.verifyPaymentPageNavigation();
    expect(isPaymentPage).toBeTruthy();
    console.log('✓ URL contains "payment"');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY PROFILE DETAILS EDIT MODAL
  // ========================
  test('should verify Profile Details Edit modal', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Profile Details Edit Modal ===');
    
    const accountDetailsPage = new AccountDetailsPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Account Details page
    console.log('\n[STEP 1] Navigating to Account Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Account Details page' });
    await accountDetailsPage.gotoAccountDetails();
    console.log('✓ Navigated to Account Details page');
    
    // Click on "Edit" button in Profile Details section
    console.log('\n[STEP 2] Clicking on Edit button in Profile Details section...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Edit button' });
    await accountDetailsPage.clickProfileDetailsEdit();
    console.log('✓ Clicked Edit button');
    
    
    
    // Assert "Name" field is visible
    console.log('\n[STEP 4] Verifying Name field is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify Name field' });
    const nameFieldVisible = await accountDetailsPage.isProfileModalNameFieldVisible();
    expect(nameFieldVisible).toBeTruthy();
    console.log('✓ Name field is visible');
    
    // Assert "Company" field is visible
    console.log('\n[STEP 5] Verifying Company field is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify Company field' });
    const companyFieldVisible = await accountDetailsPage.isProfileModalCompanyFieldVisible();
    expect(companyFieldVisible).toBeTruthy();
    console.log('✓ Company field is visible');
    
    // Close the modal
    console.log('\n[STEP 6] Closing the modal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Close modal' });
    await accountDetailsPage.closeProfileEditModal();
    console.log('✓ Modal closed');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY BILLING DETAILS EDIT NAVIGATION
  // ========================
  test('should verify Billing Details Edit navigation', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Billing Details Edit Navigation ===');
    
    const accountDetailsPage = new AccountDetailsPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Account Details page
    console.log('\n[STEP 1] Navigating to Account Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Account Details page' });
    await accountDetailsPage.gotoAccountDetails();
    console.log('✓ Navigated to Account Details page');
    
    // Click on "Edit" button in Billing Details section
    console.log('\n[STEP 2] Clicking on Edit button in Billing Details section...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Edit button' });
    await accountDetailsPage.clickBillingDetailsEdit();
    console.log('✓ Clicked Edit button');
    
    // Verify billing details form/page opens
    console.log('\n[STEP 3] Verifying billing details form/page opens...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify form/page opens' });
    const formVisible = await accountDetailsPage.isBillingFormVisible();
    expect(formVisible).toBeTruthy();
    console.log('✓ Billing details form/page is visible');
    
    // Assert fields are visible
    console.log('\n[STEP 4] Verifying form fields are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify form fields' });
    const fields = await accountDetailsPage.verifyBillingFormFields();
    
    expect(fields.name).toBeTruthy();
    console.log('✓ Name field is visible');
    
    expect(fields.company).toBeTruthy();
    console.log('✓ Company field is visible');
    
    expect(fields.mobile).toBeTruthy();
    console.log('✓ Mobile field is visible');
    
    expect(fields.address).toBeTruthy();
    console.log('✓ Address field is visible');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY ORDER HISTORY SECTION
  // ========================
  test('should verify Order History section', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Order History Section ===');
    
    const accountDetailsPage = new AccountDetailsPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Account Details page
    console.log('\n[STEP 1] Navigating to Account Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Account Details page' });
    await accountDetailsPage.gotoAccountDetails();
    console.log('✓ Navigated to Account Details page');
    
    // Check if Order History table is visible
    console.log('\n[STEP 2] Checking if Order History table is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Check table visibility' });
    const tableVisible = await accountDetailsPage.isOrderHistoryTableVisible();
    expect(tableVisible).toBeTruthy();
    console.log('✓ Order History table is visible');
    
    // Verify data exists or no data message
    console.log('\n[STEP 3] Verifying Order History data...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify data' });
    const orderHistoryData = await accountDetailsPage.verifyOrderHistoryData();
    
    if (orderHistoryData.hasData) {
      // If data exists: Assert rows are displayed
      console.log(`✓ Order History has data: ${orderHistoryData.rowCount} row(s) found`);
      expect(orderHistoryData.hasData).toBeTruthy();
      expect(orderHistoryData.rowCount).toBeGreaterThan(0);
      
      // Verify columns: Date & Time, Order Id, Sub Id, Plan Name, Amount, Status
      console.log('\n[STEP 4] Verifying Order History columns...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify columns' });
      const columns = await accountDetailsPage.verifyOrderHistoryColumns();
      
      expect(columns.dateTime).toBeTruthy();
      console.log('✓ Date & Time column is visible');
      
      expect(columns.orderId).toBeTruthy();
      console.log('✓ Order Id column is visible');
      
      expect(columns.subId).toBeTruthy();
      console.log('✓ Sub Id column is visible');
      
      expect(columns.planName).toBeTruthy();
      console.log('✓ Plan Name column is visible');
      
      expect(columns.amount).toBeTruthy();
      console.log('✓ Amount column is visible');
      
      expect(columns.status).toBeTruthy();
      console.log('✓ Status column is visible');
    } else {
      // If no data: Assert "No data found" or empty state message is displayed
      console.log('✓ No data found in Order History');
      expect(orderHistoryData.noDataMessageVisible).toBeTruthy();
      console.log('✓ "No data found" message is displayed');
    }
    
    console.log('\n=== Test Completed Successfully ===');
  });

  
});

