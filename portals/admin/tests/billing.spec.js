const { test, expect } = require('@playwright/test');
const { BillingPage } = require('../pages/billing');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Billing Module', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';

  test.beforeEach(async ({ page }) => {
   
    // Login before each test
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);
  });

  // ==================== PAGE LOAD TEST ====================

  test('should verify billing page loads successfully - retrieve page heading', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Billing Page Loads Successfully ===');
    
    const billingPage = new BillingPage(page);

    // Step 1: Navigate to Billing page
    console.log('[STEP 1] Navigating to Billing page...');
    await billingPage.gotoBilling(baseUrl);
    await page.waitForTimeout(3000);
    
    // Step 2: Verify page is loaded
    console.log('[STEP 2] Verifying page is loaded...');
    let isPageLoaded = await billingPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await billingPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Billing page is loaded');

    // Step 3: Retrieve page heading
    console.log('[STEP 3] Retrieving page heading...');
    const pageHeading = await billingPage.getPageHeading();
    expect(pageHeading).toBeTruthy();
    expect(pageHeading.toLowerCase()).toContain('billing');
    console.log(`✓ Page heading retrieved: "${pageHeading}"`);
    console.log('✓ Test completed successfully');
  });

  // ==================== SEARCH AND RESET TEST ====================

  test('should verify search features and reset clear all fields', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Search Features and Reset ===');
    
    const billingPage = new BillingPage(page);

    // Step 1: Navigate to Billing page
    console.log('[STEP 1] Navigating to Billing page...');
    await billingPage.gotoBilling(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await billingPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await billingPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Billing page is loaded');

    // Step 2: Click Search Here to open search panel
    console.log('[STEP 2] Clicking Search Here to open search panel...');
    await billingPage.clickSearchHere();
    await page.waitForTimeout(2000);
    
    const isSearchPanelOpen = await billingPage.isSearchPanelOpen();
    expect(isSearchPanelOpen).toBeTruthy();
    console.log('✓ Search panel is open');

    // Step 3: Enter date
    console.log('[STEP 3] Entering date...');
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); // 1 month ago
    const endDate = new Date();
    
    const startDateString = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const endDateString = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    
    await billingPage.fillDateRange(startDateString, endDateString);
    console.log(`✓ Filled Date Range: ${startDateString} to ${endDateString}`);

    // Step 4: Click Search
    console.log('[STEP 4] Clicking Search button...');
    await billingPage.clickSearchButton();
    await page.waitForTimeout(3000);
    console.log('✓ Search executed');

    // Step 5: Click arrow button to open sub-table
    console.log('[STEP 5] Clicking arrow button to open sub-table...');
    await billingPage.clickArrowButton();
    await page.waitForTimeout(2000);
    console.log('✓ Sub-table opened');

    // Step 6: Check Date & Time column - shows data if available, else shows empty sub-table card
    console.log('[STEP 6] Checking Date & Time column in sub-table...');
    const hasDateData = await billingPage.hasSubTableDateData();
    if (hasDateData) {
      console.log('✓ Sub-table shows data in Date & Time column');
    } else {
      console.log('✓ Sub-table shows empty (no data available)');
    }

    // Step 7: Click Reset
    console.log('[STEP 7] Clicking Reset button...');
    await billingPage.clickResetButton();
    await page.waitForTimeout(2000);
    console.log('✓ Reset clicked');

    // Step 8: Select action type from dropdown
    console.log('[STEP 8] Selecting action type from dropdown...');
    await billingPage.clickSearchHere(); // Reopen search panel if closed
    await page.waitForTimeout(1000);
    await billingPage.selectActionType('Free Credit');
    console.log('✓ Selected Action Type: Free Credit');

    // Step 9: Click Search
    console.log('[STEP 9] Clicking Search button...');
    await billingPage.clickSearchButton();
    await page.waitForTimeout(3000);
    console.log('✓ Search executed');

    // Step 10: Click arrow button to open sub-table
    console.log('[STEP 10] Clicking arrow button to open sub-table...');
    await billingPage.clickArrowButton();
    await page.waitForTimeout(2000);
    console.log('✓ Sub-table opened');

    // Step 11: Check Action column - shows data if available, else shows empty sub-table card
    console.log('[STEP 11] Checking Action column in sub-table...');
    const hasActionData = await billingPage.hasSubTableActionData();
    if (hasActionData) {
      console.log('✓ Sub-table shows data in Action column');
    } else {
      console.log('✓ Sub-table shows empty (no data available)');
    }

    // Step 12: Click Reset
    console.log('[STEP 12] Clicking Reset button...');
    await billingPage.clickResetButton();
    await page.waitForTimeout(2000);
    console.log('✓ Reset clicked');

    // Step 13: Enter partner email
    console.log('[STEP 13] Entering partner email...');
    await billingPage.clickSearchHere(); // Reopen search panel if closed
    await page.waitForTimeout(1000);
    await billingPage.fillPartnerEmail('contact@comhard.co.in');
    console.log('✓ Filled Partner Email: contact@comhard.co.in');

    // Step 14: Click Search
    console.log('[STEP 14] Clicking Search button...');
    await billingPage.clickSearchButton();
    await page.waitForTimeout(3000);
    console.log('✓ Search executed');

    // Step 15: Click arrow button to open sub-table
    console.log('[STEP 15] Clicking arrow button to open sub-table...');
    await billingPage.clickArrowButton();
    await page.waitForTimeout(2000);
    console.log('✓ Sub-table opened');

    // Step 16: Check Action column - shows data if available, else shows empty sub-table card
    console.log('[STEP 16] Checking Action column in sub-table...');
    const hasActionData2 = await billingPage.hasSubTableActionData();
    if (hasActionData2) {
      console.log('✓ Sub-table shows data in Action column');
    } else {
      console.log('✓ Sub-table shows empty (no data available)');
    }

    // Step 17: Click Reset - all fields clear
    console.log('[STEP 17] Clicking Reset button to clear all fields...');
    await billingPage.clickResetButton();
    await page.waitForTimeout(2000);
    
    const areFieldsCleared = await billingPage.areAllFieldsCleared();
    expect(areFieldsCleared).toBeTruthy();
    console.log('✓ All fields are cleared after reset');
    console.log('✓ Test completed successfully');
  });

  // ==================== SEARCH WITH EMPTY FIELDS TEST ====================

  test('should verify click search button when all search fields are empty - shows no error and shows data table if available', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Search with Empty Fields ===');
    
    const billingPage = new BillingPage(page);

    // Step 1: Navigate to Billing page
    console.log('[STEP 1] Navigating to Billing page...');
    await billingPage.gotoBilling(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await billingPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await billingPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Billing page is loaded');

    // Step 2: Click Search Here to open search panel
    console.log('[STEP 2] Clicking Search Here to open search panel...');
    await billingPage.clickSearchHere();
    await page.waitForTimeout(2000);
    
    const isSearchPanelOpen = await billingPage.isSearchPanelOpen();
    expect(isSearchPanelOpen).toBeTruthy();
    console.log('✓ Search panel is open');

    // Step 3: Verify all fields are empty
    console.log('[STEP 3] Verifying all search fields are empty...');
    const areFieldsEmpty = await billingPage.areAllFieldsCleared();
    expect(areFieldsEmpty).toBeTruthy();
    console.log('✓ All search fields are empty');

    // Step 4: Click Search button without filling any fields
    console.log('[STEP 4] Clicking Search button with empty fields...');
    await billingPage.clickSearchButton();
    await page.waitForTimeout(3000);
    console.log('✓ Search button clicked');

    // Step 5: Verify no error messages are shown
    console.log('[STEP 5] Verifying no error messages are shown...');
    const hasErrors = await billingPage.hasErrorMessages();
    expect(hasErrors).toBeFalsy();
    console.log('✓ No error messages displayed');

    // Step 6: Verify table shows data if available
    console.log('[STEP 6] Verifying table shows data if available...');
    const hasData = await billingPage.hasTableData();
    if (hasData) {
      const rowCount = await billingPage.getTableRowCount();
      console.log(`✓ Table has data: ${rowCount} row(s) found`);
    } else {
      console.log('✓ Table has no data (empty table)');
    }
    console.log('✓ Test completed successfully');
  });
});

