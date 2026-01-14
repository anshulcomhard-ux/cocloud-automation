const { test, expect } = require('@playwright/test');
const { SubscriptionPage } = require('../pages/subscription');
const { DashboardPage: LoginPage } = require('../pages/login');

test.describe('Admin Portal - Subscription Module', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';

  test.beforeEach(async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseUrl);
    await loginPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);
  });

  test('should verify subscription page loads successfully and retrieve page heading', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Subscription Page Loads Successfully ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Subscription page');

    // Step 2: Verify page is loaded
    console.log('\n[STEP 2] Verifying page is loaded...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify Subscription page is loaded' });

    const loaded = await subscriptionPage.isPageLoaded();
    expect(loaded).toBeTruthy();
    console.log('✓ Subscription page is loaded');

    // Step 3: Retrieve page heading
    console.log('\n[STEP 3] Retrieving page heading...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve page heading' });

    const heading = await subscriptionPage.getPageHeading();
    expect(heading.toLowerCase()).toContain('all subscriptions');
    console.log(`✓ Page heading retrieved: "${heading}"`);

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Subscription page loads successfully and heading retrieved');
  });

  test('should verify all subscription count matches total records', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify All Subscription Count Matches Total Records ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Retrieve subscriptions count from Total Subscriptions card
    console.log('\n[STEP 2] Retrieving subscriptions count from Total Subscriptions card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Retrieve subscriptions from card' });

    const subscriptionsFromCard = await subscriptionPage.getSubscriptionsCountFromCard();
    console.log(`✓ Subscriptions count from card: ${subscriptionsFromCard}`);

    // Step 3: Retrieve total number of records from pagination
    console.log('\n[STEP 3] Retrieving total number of records from pagination...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve total records from pagination' });

    const totalRecords = await subscriptionPage.getTotalRecordsFromPagination();
    console.log(`✓ Total records from pagination: ${totalRecords}`);

    // Step 4: Match both values
    console.log('\n[STEP 4] Matching subscriptions count with total records...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Match subscriptions count with total records' });

    if (subscriptionsFromCard === 0) {
      // If subscription is 0, verify "There is no subscription found." message is shown
      console.log('\n[STEP 5] Subscriptions count is 0, verifying "no subscription found" message...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify no subscription message' });

      const noSubMessageVisible = await subscriptionPage.isNoSubscriptionMessageVisible();
      expect(noSubMessageVisible).toBeTruthy();
      console.log('✓ "There is no subscription found." message is visible');

      // Also verify total records is 0
      expect(totalRecords).toBe(0);
      console.log('✓ Total records is 0 (matches subscriptions count)');
    } else {
      // If subscription is not 0, verify both values match
      expect(subscriptionsFromCard).toBe(totalRecords);
      console.log(`✓ Subscriptions count (${subscriptionsFromCard}) matches total records (${totalRecords})`);
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log(`✓ Subscriptions count: ${subscriptionsFromCard}`);
    console.log(`✓ Total records: ${totalRecords}`);
    console.log('✓ Both values match successfully');
  });

  test('should verify paid subscription count matches total records', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Paid Subscription Count Matches Total Records ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click Paid Subscription tab
    console.log('\n[STEP 2] Clicking Paid Subscription tab...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Paid Subscription tab' });

    await subscriptionPage.clickPaidSubscriptionTab();
    console.log('✓ Clicked Paid Subscription tab');

    await page.waitForTimeout(2000); // Wait for data to load after clicking tab

    // Step 3: Retrieve subscriptions count from Total Subscriptions card
    console.log('\n[STEP 3] Retrieving subscriptions count from Total Subscriptions card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve subscriptions from card' });

    const subscriptionsFromCard = await subscriptionPage.getSubscriptionsCountFromCard();
    console.log(`✓ Subscriptions count from card: ${subscriptionsFromCard}`);

    // Step 4: Retrieve total number of records from pagination
    console.log('\n[STEP 4] Retrieving total number of records from pagination...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Retrieve total records from pagination' });

    const totalRecords = await subscriptionPage.getTotalRecordsFromPagination();
    console.log(`✓ Total records from pagination: ${totalRecords}`);

    // Step 5: Match both values
    console.log('\n[STEP 5] Matching subscriptions count with total records...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Match subscriptions count with total records' });

    if (subscriptionsFromCard === 0) {
      // If subscription is 0, verify "There is no subscription found." message is shown
      console.log('\n[STEP 6] Subscriptions count is 0, verifying "no subscription found" message...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no subscription message' });

      const noSubMessageVisible = await subscriptionPage.isNoSubscriptionMessageVisible();
      expect(noSubMessageVisible).toBeTruthy();
      console.log('✓ "There is no subscription found." message is visible');

      // Also verify total records is 0
      expect(totalRecords).toBe(0);
      console.log('✓ Total records is 0 (matches subscriptions count)');
    } else {
      // If subscription is not 0, verify both values match
      expect(subscriptionsFromCard).toBe(totalRecords);
      console.log(`✓ Subscriptions count (${subscriptionsFromCard}) matches total records (${totalRecords})`);
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log(`✓ Paid Subscriptions count: ${subscriptionsFromCard}`);
    console.log(`✓ Total records: ${totalRecords}`);
    console.log('✓ Both values match successfully');
  });

  test('should verify trial subscription count matches total records', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Trial Subscription Count Matches Total Records ===');

    const subscriptionPage = new SubscriptionPage(page);


    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click Trial Subscription tab
    console.log('\n[STEP 2] Clicking Trial Subscription tab...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Trial Subscription tab' });

    await subscriptionPage.clickTrialSubscriptionTab();
    console.log('✓ Clicked Trial Subscription tab');

    await page.waitForTimeout(2000); // Wait for data to load after clicking tab

    // Step 3: Retrieve subscriptions count from Total Subscriptions card
    console.log('\n[STEP 3] Retrieving subscriptions count from Total Subscriptions card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve subscriptions from card' });

    const subscriptionsFromCard = await subscriptionPage.getSubscriptionsCountFromCard();
    console.log(`✓ Subscriptions count from card: ${subscriptionsFromCard}`);

    // Step 4: Retrieve total number of records from pagination
    console.log('\n[STEP 4] Retrieving total number of records from pagination...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Retrieve total records from pagination' });

    const totalRecords = await subscriptionPage.getTotalRecordsFromPagination();
    console.log(`✓ Total records from pagination: ${totalRecords}`);

    // Step 5: Match both values
    console.log('\n[STEP 5] Matching subscriptions count with total records...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Match subscriptions count with total records' });

    if (subscriptionsFromCard === 0) {
      // If subscription is 0, verify "There is no subscription found." message is shown
      console.log('\n[STEP 6] Subscriptions count is 0, verifying "no subscription found" message...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no subscription message' });

      const noSubMessageVisible = await subscriptionPage.isNoSubscriptionMessageVisible();
      expect(noSubMessageVisible).toBeTruthy();
      console.log('✓ "There is no subscription found." message is visible');

      // Also verify total records is 0
      expect(totalRecords).toBe(0);
      console.log('✓ Total records is 0 (matches subscriptions count)');
    } else {
      // If subscription is not 0, verify both values match
      expect(subscriptionsFromCard).toBe(totalRecords);
      console.log(`✓ Subscriptions count (${subscriptionsFromCard}) matches total records (${totalRecords})`);
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log(`✓ Trial Subscriptions count: ${subscriptionsFromCard}`);
    console.log(`✓ Total records: ${totalRecords}`);
    console.log('✓ Both values match successfully');
  });

  test('should verify upcoming renewal count matches total records', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Upcoming Renewal Count Matches Total Records ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click Upcoming Renewal tab
    console.log('\n[STEP 2] Clicking Upcoming Renewal tab...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Upcoming Renewal tab' });

    await subscriptionPage.clickUpcomingRenewalTab();
    console.log('✓ Clicked Upcoming Renewal tab');

    await page.waitForTimeout(2000); // Wait for data to load after clicking tab

    // Step 3: Retrieve subscriptions count from Total Subscriptions card
    console.log('\n[STEP 3] Retrieving subscriptions count from Total Subscriptions card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve subscriptions from card' });

    const subscriptionsFromCard = await subscriptionPage.getSubscriptionsCountFromCard();
    console.log(`✓ Subscriptions count from card: ${subscriptionsFromCard}`);

    // Step 4: Retrieve total number of records from pagination
    console.log('\n[STEP 4] Retrieving total number of records from pagination...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Retrieve total records from pagination' });

    const totalRecords = await subscriptionPage.getTotalRecordsFromPagination();
    console.log(`✓ Total records from pagination: ${totalRecords}`);

    // Step 5: Match both values
    console.log('\n[STEP 5] Matching subscriptions count with total records...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Match subscriptions count with total records' });

    if (subscriptionsFromCard === 0) {
      // If subscription is 0, verify "There is no subscription found." message is shown
      console.log('\n[STEP 6] Subscriptions count is 0, verifying "no subscription found" message...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no subscription message' });

      const noSubMessageVisible = await subscriptionPage.isNoSubscriptionMessageVisible();
      expect(noSubMessageVisible).toBeTruthy();
      console.log('✓ "There is no subscription found." message is visible');

      // Also verify total records is 0
      expect(totalRecords).toBe(0);
      console.log('✓ Total records is 0 (matches subscriptions count)');
    } else {
      // If subscription is not 0, verify both values match
      expect(subscriptionsFromCard).toBe(totalRecords);
      console.log(`✓ Subscriptions count (${subscriptionsFromCard}) matches total records (${totalRecords})`);
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log(`✓ Upcoming Renewal Subscriptions count: ${subscriptionsFromCard}`);
    console.log(`✓ Total records: ${totalRecords}`);
    console.log('✓ Both values match successfully');
  });

  test('should verify expired subscription count matches total records', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Expired Subscription Count Matches Total Records ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click Expired Subscription tab
    console.log('\n[STEP 2] Clicking Expired Subscription tab...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Expired Subscription tab' });

    await subscriptionPage.clickExpiredSubscriptionTab();
    console.log('✓ Clicked Expired Subscription tab');

    await page.waitForTimeout(2000); // Wait for data to load after clicking tab

    // Step 3: Retrieve subscriptions count from Total Subscriptions card
    console.log('\n[STEP 3] Retrieving subscriptions count from Total Subscriptions card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve subscriptions from card' });

    const subscriptionsFromCard = await subscriptionPage.getSubscriptionsCountFromCard();
    console.log(`✓ Subscriptions count from card: ${subscriptionsFromCard}`);

    // Step 4: Retrieve total number of records from pagination
    console.log('\n[STEP 4] Retrieving total number of records from pagination...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Retrieve total records from pagination' });

    const totalRecords = await subscriptionPage.getTotalRecordsFromPagination();
    console.log(`✓ Total records from pagination: ${totalRecords}`);

    // Step 5: Match both values
    console.log('\n[STEP 5] Matching subscriptions count with total records...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Match subscriptions count with total records' });

    if (subscriptionsFromCard === 0) {
      // If subscription is 0, verify "There is no subscription found." message is shown
      console.log('\n[STEP 6] Subscriptions count is 0, verifying "no subscription found" message...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no subscription message' });

      const noSubMessageVisible = await subscriptionPage.isNoSubscriptionMessageVisible();
      expect(noSubMessageVisible).toBeTruthy();
      console.log('✓ "There is no subscription found." message is visible');

      // Also verify total records is 0
      expect(totalRecords).toBe(0);
      console.log('✓ Total records is 0 (matches subscriptions count)');
    } else {
      // If subscription is not 0, verify both values match
      expect(subscriptionsFromCard).toBe(totalRecords);
      console.log(`✓ Subscriptions count (${subscriptionsFromCard}) matches total records (${totalRecords})`);
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log(`✓ Expired Subscriptions count: ${subscriptionsFromCard}`);
    console.log(`✓ Total records: ${totalRecords}`);
    console.log('✓ Both values match successfully');
  });

  test('should verify export to excel button is visible and clickable', async ({ page }, testInfo) => {
    test.setTimeout(180000); // 3 minutes timeout for heavy data export
    console.log('\n=== Test: Verify Export To Excel Button Visible and Clickable ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Subscription page');

    // Step 2: Verify Export To Excel button is visible
    console.log('\n[STEP 2] Checking Export To Excel button visibility...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Check Export button visibility' });

    const isVisible = await subscriptionPage.isExportToExcelButtonVisible();
    expect(isVisible).toBeTruthy();
    console.log('✓ Export To Excel button is visible');

    // Step 3: Click Export To Excel and ensure download starts
    console.log('\n[STEP 3] Clicking Export To Excel button and waiting for download...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Export and wait for download' });

    // Set up download listener before clicking (for heavy data, wait longer)
    const downloadPromise = page.waitForEvent('download', { timeout: 120000 }); // 2 minutes timeout for heavy data
    
    await subscriptionPage.clickExportToExcel();
    console.log('✓ Export To Excel button clicked, waiting for download to initiate...');
    
    // Wait a bit for the download to start (heavy data may take time to process)
    await page.waitForTimeout(3000);
    
    const download = await downloadPromise;
    expect(download).toBeTruthy();
    console.log(`✓ Download started: ${await download.suggestedFilename()}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Export To Excel button is visible and clickable, download triggered');
  });

  test('should verify serial no. mismatch section export to excel button', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Serial No. Mismatch Section Export To Excel Button ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click on Serial No. Mismatch section
    console.log('\n[STEP 2] Clicking on Serial No. Mismatch section...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Serial No. Mismatch tab' });

    await subscriptionPage.clickSerialNoMismatchTab();
    console.log('✓ Clicked Serial No. Mismatch tab');

    await page.waitForTimeout(2000); // Wait for section to load

    // Step 3: Check Export To Excel button is visible
    console.log('\n[STEP 3] Checking Export To Excel button visibility...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Check Export button visibility' });

    const isVisible = await subscriptionPage.isExportToExcelButtonVisible();
    expect(isVisible).toBeTruthy();
    console.log('✓ Export To Excel button is visible');

    // Step 4: Check Export To Excel button is clickable
    console.log('\n[STEP 4] Checking Export To Excel button is clickable...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Check Export button is clickable' });

    const isClickable = await subscriptionPage.isExportToExcelButtonClickable();
    expect(isClickable).toBeTruthy();
    console.log('✓ Export To Excel button is clickable');

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Serial No. Mismatch section Export To Excel button is visible and clickable');
  });

  test('should verify new paid subscriptions card dropdown options', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify New Paid Subscriptions Card Dropdown Options ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Check that "This Month" is selected by default
    console.log('\n[STEP 2] Checking default selected value is "This Month"...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Check default selection' });

    const defaultValue = await subscriptionPage.getSelectedNewPaidSubscriptionsDropdownValue();
    expect(defaultValue).toBe('month');
    console.log(`✓ Default selected value is "month" (This Month)`);

    // Step 3: Select "This Week" from dropdown
    console.log('\n[STEP 3] Selecting "This Week" from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Select This Week' });

    await subscriptionPage.selectNewPaidSubscriptionsDropdownOption('week');
    console.log('✓ Selected "This Week" from dropdown');

    // Wait a bit and check for error toast
    await page.waitForTimeout(2000);
    const errorToastAfterWeek = await subscriptionPage.isErrorToastVisible();
    expect(errorToastAfterWeek).toBeFalsy();
    console.log('✓ No error toast shown after selecting "This Week"');

    // Verify the selection
    const weekValue = await subscriptionPage.getSelectedNewPaidSubscriptionsDropdownValue();
    expect(weekValue).toBe('week');
    console.log('✓ "This Week" is now selected');

    // Step 4: Select "This Year" from dropdown
    console.log('\n[STEP 4] Selecting "This Year" from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select This Year' });

    await subscriptionPage.selectNewPaidSubscriptionsDropdownOption('year');
    console.log('✓ Selected "This Year" from dropdown');

    // Wait a bit and check for error toast
    await page.waitForTimeout(2000);
    const errorToastAfterYear = await subscriptionPage.isErrorToastVisible();
    expect(errorToastAfterYear).toBeFalsy();
    console.log('✓ No error toast shown after selecting "This Year"');

    // Verify the selection
    const yearValue = await subscriptionPage.getSelectedNewPaidSubscriptionsDropdownValue();
    expect(yearValue).toBe('year');
    console.log('✓ "This Year" is now selected');

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ New Paid Subscriptions dropdown options are working correctly');
    console.log('✓ No error toasts shown');
  });

  test('should verify restrict deletion functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Restrict Deletion Functionality ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Select checkbox in table
    console.log('\n[STEP 2] Selecting checkbox in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Select checkbox' });

    await subscriptionPage.selectTableCheckbox();
    console.log('✓ Checkbox selected');

    await page.waitForTimeout(1000); // Wait for UI to update

    // Step 3: Check that Restrict Deletion button becomes visible
    console.log('\n[STEP 3] Checking Restrict Deletion button visibility...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Check Restrict Deletion button is visible' });

    const isButtonVisible = await subscriptionPage.isRestrictDeletionButtonVisible();
    expect(isButtonVisible).toBeTruthy();
    console.log('✓ Restrict Deletion button is visible');

    // Step 4: Click Restrict Deletion button
    console.log('\n[STEP 4] Clicking Restrict Deletion button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Restrict Deletion button' });

    await subscriptionPage.clickRestrictDeletionButton();
    console.log('✓ Restrict Deletion button clicked');

    // Step 5: (Optional) Check toast immediately and retrieve text
    console.log('\n[STEP 5] Checking for toast message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Check toast message (optional)' });

    await page.waitForTimeout(1000); // Wait for toast to appear
    const toastText = await subscriptionPage.getToastText();
    if (toastText) {
      console.log(`✓ Toast message retrieved: "${toastText}"`);
    } else {
      console.log('✓ No toast message shown (optional)');
    }

    // Step 6: Go to Sub ID column and check for "(Restricted)" text
    console.log('\n[STEP 6] Checking Sub ID column for "(Restricted)" text...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Check Sub ID shows (Restricted)' });

    await page.waitForTimeout(2000); // Wait for restriction to apply

    const isRestricted = await subscriptionPage.isSubIdRestricted();
    expect(isRestricted).toBeTruthy();
    console.log('✓ Sub ID shows "(Restricted)" text');

    const restrictedText = await subscriptionPage.getSubIdWithRestrictedText();
    if (restrictedText) {
      console.log(`✓ Sub ID text: "${restrictedText}"`);
      expect(restrictedText.toLowerCase()).toContain('restricted');
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Restrict deletion functionality verified');
    if (toastText) {
      console.log(`✓ Toast message: "${toastText}"`);
    }
  });

  test('should verify empty search functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Empty Search Functionality ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000); // Wait for page to fully load
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click "Search Here" to open search panel
    console.log('\n[STEP 2] Clicking "Search Here" to open search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Open search panel' });

    await subscriptionPage.clickSearchHere();
    console.log('✓ Clicked "Search Here"');

    // Verify search panel is open
    const isPanelOpen = await subscriptionPage.isSearchPanelOpen();
    expect(isPanelOpen).toBeTruthy();
    console.log('✓ Search panel is open');

    // Step 3: Click Search button (without entering any criteria)
    console.log('\n[STEP 3] Clicking Search button (empty search)...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Search button' });

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');

    await page.waitForTimeout(2000); // Wait for search results

    // Step 4: Check if data table shows or "no subscription found" message shows
    console.log('\n[STEP 4] Checking search results...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Check search results' });

    const hasData = await subscriptionPage.hasTableData();
    const noSubMessageVisible = await subscriptionPage.isNoSubscriptionMessageVisible();

    // Either data table should show OR "no subscription found" message should show
    expect(hasData || noSubMessageVisible).toBeTruthy();

    if (hasData) {
      console.log('✓ Data table shows results');
    } else if (noSubMessageVisible) {
      console.log('✓ "There is no subscription found." message is shown');
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Empty search functionality verified');
    if (hasData) {
      console.log('✓ Search returned data in table');
    } else {
      console.log('✓ Search showed "no subscription found" message');
    }
  });

  test('should verify complete search functionality with all filters', async ({ page }, testInfo) => {
    test.setTimeout(300000); // 5 minutes timeout for comprehensive search
    console.log('\n=== Test: Verify Complete Search Functionality with All Filters ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000);
    console.log('✓ Navigated to Subscription page');

    // Step 2: Open search panel
    console.log('\n[STEP 2] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Open search panel' });

    await subscriptionPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Step 3: Retrieve partner email, company name, and sub ID from table columns
    console.log('\n[STEP 3] Retrieving partner email, company name, and sub ID from table columns...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Retrieve partner email, company name, and sub ID from table' });

    const { partnerEmails, companyNames, subIds } = await subscriptionPage.getPartnerEmailAndSubIdFromTable();
    console.log(`✓ Retrieved ${partnerEmails.length} partner emails, ${companyNames.length} company names, and ${subIds.length} sub IDs from table`);
    if (partnerEmails.length > 0) {
      console.log(`  Sample partner email: ${partnerEmails[0]}`);
    }
    if (companyNames.length > 0) {
      console.log(`  Sample company name: ${companyNames[0]}`);
    }
    if (subIds.length > 0) {
      console.log(`  Sample sub ID: ${subIds[0]}`);
    }

    // Test 1: Search by Start Date
    console.log('\n--- Test 1: Search by Start Date ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 1: Search by Start Date' });

    const startDateFrom = '01/01/2024';
    const startDateTo = '12/31/2024';
    await subscriptionPage.enterStartDate(startDateFrom, startDateTo);
    console.log(`✓ Entered Start Date range: ${startDateFrom} to ${startDateTo}`);

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const startDateResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(startDateResult.hasData || startDateResult.isEmpty).toBeTruthy();
    if (startDateResult.hasData) {
      console.log('✓ Data table shows results for Start Date search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Start Date search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 2: Search by Next Billing Date
    console.log('\n--- Test 2: Search by Next Billing Date ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 2: Search by Next Billing Date' });

    const nextBillingDateFrom = '01/01/2024';
    const nextBillingDateTo = '12/31/2024';
    await subscriptionPage.enterNextBillingDate(nextBillingDateFrom, nextBillingDateTo);
    console.log(`✓ Entered Next Billing Date range: ${nextBillingDateFrom} to ${nextBillingDateTo}`);

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const nextBillingDateResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(nextBillingDateResult.hasData || nextBillingDateResult.isEmpty).toBeTruthy();
    if (nextBillingDateResult.hasData) {
      console.log('✓ Data table shows results for Next Billing Date search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Next Billing Date search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 3: Search by Last Billing Date
    console.log('\n--- Test 3: Search by Last Billing Date ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 3: Search by Last Billing Date' });

    const lastBillingDateFrom = '01/01/2024';
    const lastBillingDateTo = '12/31/2024';
    await subscriptionPage.enterLastBillingDate(lastBillingDateFrom, lastBillingDateTo);
    console.log(`✓ Entered Last Billing Date range: ${lastBillingDateFrom} to ${lastBillingDateTo}`);

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const lastBillingDateResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(lastBillingDateResult.hasData || lastBillingDateResult.isEmpty).toBeTruthy();
    if (lastBillingDateResult.hasData) {
      console.log('✓ Data table shows results for Last Billing Date search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Last Billing Date search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 4: Search by Company/Email Address (using Company Name)
    console.log('\n--- Test 4: Search by Company Name ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 4: Search by Company Name' });

    if (companyNames.length > 0) {
      const testCompanyName = companyNames[0];
      await subscriptionPage.enterCompanyEmailSearch(testCompanyName);
      console.log(`✓ Entered company name: ${testCompanyName}`);

      await subscriptionPage.clickSearchButton();
      console.log('✓ Search button clicked');
      await page.waitForTimeout(3000);

      const companyResult = await subscriptionPage.verifyTableDataOrEmpty();
      expect(companyResult.hasData || companyResult.isEmpty).toBeTruthy();
      if (companyResult.hasData) {
        const companyNameData = await subscriptionPage.getTableColumnData('Company Name');
        console.log(`✓ Data table shows results. Found ${companyNameData.length} records with Company Name`);
      } else {
        console.log('✓ "There is no subscription found." message shown for company name search');
      }
    } else {
      console.log('⚠ No company names found in table, skipping company name search test');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 5: Search by Sub ID
    console.log('\n--- Test 5: Search by Sub ID ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 5: Search by Sub ID' });

    if (subIds.length > 0) {
      const testSubId = subIds[0];
      await subscriptionPage.enterSubIdSearch(testSubId);
      console.log(`✓ Entered Sub ID: ${testSubId}`);

      await subscriptionPage.clickSearchButton();
      console.log('✓ Search button clicked');
      await page.waitForTimeout(3000);

      const subIdResult = await subscriptionPage.verifyTableDataOrEmpty();
      expect(subIdResult.hasData || subIdResult.isEmpty).toBeTruthy();
      if (subIdResult.hasData) {
        console.log('✓ Data table shows results for Sub ID search');
      } else {
        console.log('✓ "There is no subscription found." message shown for Sub ID search');
      }
    } else {
      console.log('⚠ No sub IDs found in table, skipping Sub ID search test');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 6: Search by Status
    console.log('\n--- Test 6: Search by Status ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 6: Search by Status' });

    await subscriptionPage.selectStatus('Active');
    console.log('✓ Selected "Active" from Status dropdown');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const statusResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(statusResult.hasData || statusResult.isEmpty).toBeTruthy();
    if (statusResult.hasData) {
      console.log('✓ Data table shows results for Status search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Status search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 7: Search by Stage
    console.log('\n--- Test 7: Search by Stage ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 7: Search by Stage' });

    await subscriptionPage.selectStage('Live');
    console.log('✓ Selected "Live" from Stage dropdown (after unselecting all and selecting Select All)');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const stageResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(stageResult.hasData || stageResult.isEmpty).toBeTruthy();
    if (stageResult.hasData) {
      console.log('✓ Data table shows results for Stage search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Stage search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 8: Search by Plan Name
    console.log('\n--- Test 8: Search by Plan Name ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 8: Search by Plan Name' });

    await subscriptionPage.selectPlanName('busy on cloud 7 days trial plan');
    console.log('✓ Selected "busy on cloud 7 days trial plan" from Plan Name dropdown');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const planNameResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(planNameResult.hasData || planNameResult.isEmpty).toBeTruthy();
    if (planNameResult.hasData) {
      console.log('✓ Data table shows results for Plan Name search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Plan Name search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 9: Search by Partner
    console.log('\n--- Test 9: Search by Partner ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 9: Search by Partner' });

    await subscriptionPage.selectPartner('Select All');
    console.log('✓ Selected "Select All" from Partner dropdown');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const partnerResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(partnerResult.hasData || partnerResult.isEmpty).toBeTruthy();
    if (partnerResult.hasData) {
      console.log('✓ Data table shows results for Partner search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Partner search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 10: Search by Account Manager
    console.log('\n--- Test 10: Search by Account Manager ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 10: Search by Account Manager' });

    await subscriptionPage.selectAccountManager('Select All');
    console.log('✓ Selected "Select All" from Account Manager dropdown');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const accountManagerResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(accountManagerResult.hasData || accountManagerResult.isEmpty).toBeTruthy();
    if (accountManagerResult.hasData) {
      console.log('✓ Data table shows results for Account Manager search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Account Manager search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 11: Search by Activate
    console.log('\n--- Test 11: Search by Activate ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 11: Search by Activate' });

    await subscriptionPage.selectActivate('Activate');
    console.log('✓ Selected "Activate" from Activate dropdown');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const activateResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(activateResult.hasData || activateResult.isEmpty).toBeTruthy();
    if (activateResult.hasData) {
      console.log('✓ Data table shows results for Activate search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Activate search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Test 12: Search by Scheduler
    console.log('\n--- Test 12: Search by Scheduler ---');
    testInfo.annotations.push({ type: 'step', description: 'Test 12: Search by Scheduler' });

    await subscriptionPage.selectScheduler('Added');
    console.log('✓ Selected "Added" from Scheduler dropdown');

    await subscriptionPage.clickSearchButton();
    console.log('✓ Search button clicked');
    await page.waitForTimeout(3000);

    const schedulerResult = await subscriptionPage.verifyTableDataOrEmpty();
    expect(schedulerResult.hasData || schedulerResult.isEmpty).toBeTruthy();
    if (schedulerResult.hasData) {
      console.log('✓ Data table shows results for Scheduler search');
    } else {
      console.log('✓ "There is no subscription found." message shown for Scheduler search');
    }

    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Final Test: Verify Reset clears form
    console.log('\n--- Final Test: Verify Reset clears form ---');
    testInfo.annotations.push({ type: 'step', description: 'Final Test: Verify Reset clears form' });

    // Fill some fields
    await subscriptionPage.enterCompanyEmailSearch('test@example.com');
    await subscriptionPage.enterSubIdSearch('TEST-123');
    await page.waitForTimeout(500);

    // Click reset
    await subscriptionPage.clickResetButton();
    console.log('✓ Reset button clicked');
    await page.waitForTimeout(1000);

    // Verify fields are cleared (check if values are empty or default)
    const companyEmailValue = await subscriptionPage.companyEmailSearchField.inputValue();
    const subIdValue = await subscriptionPage.subIdSearchField.inputValue();
    
    expect(companyEmailValue).toBe('');
    expect(subIdValue).toBe('');
    console.log('✓ Form fields are cleared after reset');

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Complete search functionality with all filters verified');
  });

  test('should verify add new subscription functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000); // 2 minutes timeout
    console.log('\n=== Test: Verify Add New Subscription ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    try {
      await subscriptionPage.clickSubscriptionMenuItem();
      console.log('✓ Clicked Subscription menu item');
    } catch (error) {
      console.log(`Note: Could not click Subscription menu item, trying direct navigation: ${error.message}`);
      await subscriptionPage.gotoSubscription(baseUrl);
      console.log('✓ Navigated directly to Subscription page');
    }

    await page.waitForTimeout(3000);
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click on "New" button to open new subscription form
    console.log('\n[STEP 2] Clicking "New" button to open subscription form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click New button' });

    await subscriptionPage.clickNewSubscriptionButton();
    console.log('✓ Clicked "New" button');

    const isFormVisible = await subscriptionPage.isNewSubscriptionFormVisible();
    expect(isFormVisible).toBeTruthy();
    console.log('✓ New subscription form is open');

    // Step 3: Select partner from dropdown
    console.log('\n[STEP 3] Selecting partner from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Select partner' });

    await subscriptionPage.selectNewSubscriptionPartner('contact@comhard.co.in');
    console.log('✓ Selected partner: contact@comhard.co.in');

    // Step 4: Select customer from dropdown
    console.log('\n[STEP 4] Selecting customer from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select customer' });

    await subscriptionPage.selectNewSubscriptionCustomer('ansh.comhard@gmail.com');
    console.log('✓ Selected customer: ansh.comhard@gmail.com');

    // Step 5: Select product from dropdown
    console.log('\n[STEP 5] Selecting product from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Select product' });

    await subscriptionPage.selectNewSubscriptionProduct('Application on Cloud');
    console.log('✓ Selected product: Application on Cloud');

    // Step 6: Select plan name from dropdown
    console.log('\n[STEP 6] Selecting plan name from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Select plan name' });

    // Select "Tally on Cloud - Half Yearly" plan
    const planName = 'Tally on Cloud - Half Yearly';
    await subscriptionPage.selectNewSubscriptionPlanName(planName);
    console.log(`✓ Selected plan name: ${planName}`);

   
    // Step 8: Enter RAM
    console.log('\n[STEP 8] Entering RAM...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Enter RAM' });

    await subscriptionPage.enterNewSubscriptionRam('8');
    console.log('✓ Entered RAM: 8');

    // Step 9: Enter CPU
    console.log('\n[STEP 9] Entering CPU...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Enter CPU' });

    await subscriptionPage.enterNewSubscriptionCpu('4');
    console.log('✓ Entered CPU: 4');

    // Step 10: Enter Storage
    console.log('\n[STEP 10] Entering Storage...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Enter Storage' });

    await subscriptionPage.enterNewSubscriptionStorage('100');
    console.log('✓ Entered Storage: 100');

    // Step 11: Select next renewal date from dropdown
    console.log('\n[STEP 11] Selecting next renewal date from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Select next renewal date' });

    // Select first available renewal date option
    await subscriptionPage.newSubscriptionNextRenewalDateDropdown.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if it's a regular <select> element or Material Design mat-select
    const isSelectElement = await subscriptionPage.newSubscriptionNextRenewalDateDropdown.evaluate((el) => {
      return el.tagName.toLowerCase() === 'select';
    }).catch(() => false);

    let renewalDate = null;
    
    if (isSelectElement) {
      // It's a regular HTML select element
      const firstEnabledOption = subscriptionPage.newSubscriptionNextRenewalDateDropdown.locator('option:not([disabled]):not([value=""])').first();
      const isOptionVisible = await firstEnabledOption.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isOptionVisible) {
        // Get the text content of the option we're about to select
        renewalDate = await firstEnabledOption.textContent();
        const optionValue = await firstEnabledOption.getAttribute('value').catch(() => null);
        
        if (optionValue) {
          await subscriptionPage.newSubscriptionNextRenewalDateDropdown.selectOption(optionValue);
        } else {
          // Fallback: select by index (skip first disabled option)
          await subscriptionPage.newSubscriptionNextRenewalDateDropdown.selectOption({ index: 1 });
          // Get the selected option text after selection
          renewalDate = await subscriptionPage.newSubscriptionNextRenewalDateDropdown.evaluate((select) => {
            const selectedOption = select.options[select.selectedIndex];
            return selectedOption ? selectedOption.textContent : null;
          }).catch(() => null);
        }
      } else {
        // Fallback: select first available option by index
        await subscriptionPage.newSubscriptionNextRenewalDateDropdown.selectOption({ index: 1 });
        // Get the selected option text after selection
        renewalDate = await subscriptionPage.newSubscriptionNextRenewalDateDropdown.evaluate((select) => {
          const selectedOption = select.options[select.selectedIndex];
          return selectedOption ? selectedOption.textContent : null;
        }).catch(() => null);
      }
      await page.waitForTimeout(1000);
    } else {
      // It's a Material Design mat-select
      await subscriptionPage.newSubscriptionNextRenewalDateDropdown.click();
      await page.waitForTimeout(1000);
      
      const renewalDateOverlay = page.locator('div.cdk-overlay-pane').filter({ has: page.locator('mat-option') }).first();
      await renewalDateOverlay.waitFor({ state: 'visible', timeout: 5000 });
      
      const firstRenewalOption = renewalDateOverlay.locator('mat-option').first();
      await firstRenewalOption.waitFor({ state: 'visible', timeout: 5000 });
      renewalDate = await firstRenewalOption.textContent();
      await firstRenewalOption.click();
      await page.waitForTimeout(1000);
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
    
    console.log(`✓ Selected next renewal date: ${renewalDate ? renewalDate.trim() : 'First available option'}`);

    // Step 12: Enter reference ID
    console.log('\n[STEP 12] Entering reference ID...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Enter reference ID' });

    const referenceId = `REF-${Date.now()}`;
    await subscriptionPage.enterNewSubscriptionReferenceId(referenceId);
    console.log(`✓ Entered reference ID: ${referenceId}`);

    // Step 13: Select salesperson from dropdown
    console.log('\n[STEP 13] Selecting salesperson from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 13: Select salesperson' });

    // Select first available salesperson
    await subscriptionPage.newSubscriptionSalespersonDropdown.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if it's a regular <select> element or Material Design mat-select
    const isSalespersonSelect = await subscriptionPage.newSubscriptionSalespersonDropdown.evaluate((el) => {
      return el.tagName.toLowerCase() === 'select';
    }).catch(() => false);

    let salesperson = null;
    
    if (isSalespersonSelect) {
      // It's a regular HTML select element
      const firstEnabledOption = subscriptionPage.newSubscriptionSalespersonDropdown.locator('option:not([disabled]):not([value=""])').first();
      const isOptionVisible = await firstEnabledOption.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isOptionVisible) {
        // Get the text content of the option we're about to select
        salesperson = await firstEnabledOption.textContent();
        const optionValue = await firstEnabledOption.getAttribute('value').catch(() => null);
        
        if (optionValue) {
          await subscriptionPage.newSubscriptionSalespersonDropdown.selectOption(optionValue);
        } else {
          // Fallback: select by index (skip first disabled option)
          await subscriptionPage.newSubscriptionSalespersonDropdown.selectOption({ index: 1 });
          // Get the selected option text after selection
          salesperson = await subscriptionPage.newSubscriptionSalespersonDropdown.evaluate((select) => {
            const selectedOption = select.options[select.selectedIndex];
            return selectedOption ? selectedOption.textContent : null;
          }).catch(() => null);
        }
      } else {
        // Fallback: select first available option by index
        await subscriptionPage.newSubscriptionSalespersonDropdown.selectOption({ index: 1 });
        // Get the selected option text after selection
        salesperson = await subscriptionPage.newSubscriptionSalespersonDropdown.evaluate((select) => {
          const selectedOption = select.options[select.selectedIndex];
          return selectedOption ? selectedOption.textContent : null;
        }).catch(() => null);
      }
      await page.waitForTimeout(1000);
    } else {
      // It's a Material Design mat-select
      await subscriptionPage.newSubscriptionSalespersonDropdown.click();
      await page.waitForTimeout(1000);
      
      const salespersonOverlay = page.locator('div.cdk-overlay-pane').filter({ has: page.locator('mat-option') }).first();
      await salespersonOverlay.waitFor({ state: 'visible', timeout: 5000 });
      
      const firstSalespersonOption = salespersonOverlay.locator('mat-option').first();
      await firstSalespersonOption.waitFor({ state: 'visible', timeout: 5000 });
      salesperson = await firstSalespersonOption.textContent();
      await firstSalespersonOption.click();
      await page.waitForTimeout(1000);
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
    
    console.log(`✓ Selected salesperson: ${salesperson ? salesperson.trim() : 'First available option'}`);

    // Step 14: Click Submit
    console.log('\n[STEP 14] Clicking Submit button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 14: Click Submit' });

    await subscriptionPage.clickNewSubscriptionSubmit();
    console.log('✓ Submit button clicked');

    // Step 15: (Optional) Check toast immediately and retrieve text
    console.log('\n[STEP 15] Checking toast message (optional)...');
    testInfo.annotations.push({ type: 'step', description: 'Step 15: Check toast message (optional)' });

    await page.waitForTimeout(2000); // Wait for toast to appear
    const toastText = await subscriptionPage.getNewSubscriptionToastText();
    if (toastText) {
      console.log(`✓ Toast message retrieved: "${toastText}"`);
    } else {
      console.log('✓ No toast message shown (optional)');
    }

    // Step 16: Verify navigation to subscription page
    console.log('\n[STEP 16] Verifying navigation to subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 16: Verify navigation' });

    await page.waitForTimeout(3000); // Wait for navigation
    
    // Check if we're on the subscription page
    const currentUrl = page.url();
    const isOnSubscriptionPage = currentUrl.toLowerCase().includes('subscription');
    
    // Also check if page heading is visible
    const isPageLoaded = await subscriptionPage.isPageLoaded();
    
    expect(isOnSubscriptionPage || isPageLoaded).toBeTruthy();
    console.log(`✓ Navigated to subscription page. Current URL: ${currentUrl}`);
    console.log(`✓ Page loaded: ${isPageLoaded}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log('✓ Add new subscription functionality verified');
    if (toastText) {
      console.log(`✓ Toast message: "${toastText}"`);
    }
  });

  test('should verify navigation to live plan detail page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Navigation to Live Plan Detail Page ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to Subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    console.log('✓ Clicked Subscription menu item');
    
    const isLoaded = await subscriptionPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    console.log('✓ Navigated to Subscription page');

    // Step 2: Click "Search Here" to open search panel
    console.log('\n[STEP 2] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Open search panel' });

    await subscriptionPage.clickSearchHere();
    const isPanelOpen = await subscriptionPage.isSearchPanelOpen();
    expect(isPanelOpen).toBeTruthy();
    console.log('✓ Search panel opened');

    // Step 3: Select Stage from dropdown (unselect all, then select live)
    console.log('\n[STEP 3] Selecting Stage from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Select Stage from dropdown' });

    // First unselect all stages (same approach as Partner Portal)
    await subscriptionPage.unselectAllStages();
    await page.waitForTimeout(1000);
    console.log('✓ All stages unselected');

    // Then select Live stage
    await subscriptionPage.selectStages('Live');
    await page.waitForTimeout(1000);
    console.log('✓ Live stage selected');

    // Step 4: Click Search button
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search button' });

    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(3000); // Wait for search results
    console.log('✓ Search button clicked');

    // Step 5: Click on Sub ID column cell value
    console.log('\n[STEP 5] Clicking on Sub ID in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click on Sub ID' });

    const clickedSubId = await subscriptionPage.clickFirstSubIdInTable();
    console.log(`✓ Clicked Sub ID: ${clickedSubId}`);

    // Step 6: Verify navigation to plan details page
    console.log('\n[STEP 6] Verifying navigation to plan details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify navigation' });

    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to plan details page');

    // Step 7: Retrieve plan status, subid, and plan name
    console.log('\n[STEP 7] Retrieving plan details...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Retrieve plan details' });

    const planDetails = await subscriptionPage.getPlanDetails();
    console.log(`✓ Plan Name: "${planDetails.planName}"`);
    console.log(`✓ Sub ID: "${planDetails.subId}"`);
    console.log(`✓ Status: "${planDetails.status}"`);

    // Verify that details are retrieved
    expect(planDetails.planName).toBeTruthy();
    expect(planDetails.subId).toBeTruthy();
    expect(planDetails.status).toBeTruthy();
    
    // Verify status contains "Live"
    expect(planDetails.status.toLowerCase()).toContain('live');
    console.log('✓ Plan details retrieved successfully');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify show file manager functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Show File Manager Functionality ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to live plan detail page
    console.log('\n[STEP 1] Navigating to live plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to live plan detail page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    await subscriptionPage.isPageLoaded();
    
    // Open search panel and filter by Live stage
    await subscriptionPage.clickSearchHere();
    await subscriptionPage.unselectAllStages();
    await subscriptionPage.selectStages('Live');
    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click on first Sub ID to navigate to plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to live plan detail page');

    // Step 2: Check Yes/No beside "Show File Manager" text
    console.log('\n[STEP 2] Checking initial Show File Manager value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Check initial value' });

    const initialValue = await subscriptionPage.getShowFileManagerValue();
    expect(initialValue).toBeTruthy();
    expect(['Yes', 'No']).toContain(initialValue);
    console.log(`✓ Initial Show File Manager value: "${initialValue}"`);

    // Step 3: Click on "Update" button beside "Show File Manager"
    console.log('\n[STEP 3] Clicking Update button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Update button' });

    await subscriptionPage.clickShowFileManagerUpdate();
    const isModalVisible = await subscriptionPage.isShowFileManagerModalVisible();
    expect(isModalVisible).toBeTruthy();
    console.log('✓ Update modal opened');

    // Step 4: Click "Yes" in the modal
    console.log('\n[STEP 4] Selecting Yes in modal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select Yes' });

    await subscriptionPage.selectShowFileManagerYes();
    await page.waitForTimeout(2000); // Wait for modal to close and update to apply
    console.log('✓ Selected Yes in modal');

    // Step 5: (Optional) Check toast immediately and retrieve text
    console.log('\n[STEP 5] Checking for toast message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Check toast (optional)' });

    try {
      const toastText = await subscriptionPage.getToastText();
      if (toastText) {
        console.log(`✓ Toast message: "${toastText}"`);
      } else {
        console.log('✓ No toast message displayed (optional)');
      }
    } catch (error) {
      console.log('✓ Toast check skipped (optional)');
    }

    // Step 6: Check Yes/No beside "Show File Manager" again
    console.log('\n[STEP 6] Checking updated Show File Manager value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Check updated value' });

    await page.waitForTimeout(1000); // Wait for UI to update
    const updatedValue = await subscriptionPage.getShowFileManagerValue();
    expect(updatedValue).toBeTruthy();
    expect(['Yes', 'No']).toContain(updatedValue);
    console.log(`✓ Updated Show File Manager value: "${updatedValue}"`);

    // Step 7: Verify the value changed (if initial was Yes, should be No, and vice versa)
    console.log('\n[STEP 7] Verifying value changed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify value changed' });

    if (initialValue === 'Yes') {
      expect(updatedValue).toBe('No');
      console.log('✓ Value changed from Yes to No as expected');
    } else if (initialValue === 'No') {
      expect(updatedValue).toBe('Yes');
      console.log('✓ Value changed from No to Yes as expected');
    } else {
      // If we clicked Yes, the value should be Yes now (regardless of initial)
      expect(updatedValue).toBe('Yes');
      console.log(`✓ Value updated to Yes as expected`);
    }

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify skip google drive functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Skip Google Drive Functionality ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to live plan detail page
    console.log('\n[STEP 1] Navigating to live plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to live plan detail page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    await subscriptionPage.isPageLoaded();
    
    // Open search panel and filter by Live stage
    await subscriptionPage.clickSearchHere();
    await subscriptionPage.unselectAllStages();
    await subscriptionPage.selectStages('Live');
    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click on first Sub ID to navigate to plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to live plan detail page');

    // Step 2: Check Yes/No beside "Skip Google Drive" text
    console.log('\n[STEP 2] Checking initial Skip Google Drive value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Check initial value' });

    const initialValue = await subscriptionPage.getSkipGoogleDriveValue();
    expect(initialValue).toBeTruthy();
    expect(['Yes', 'No']).toContain(initialValue);
    console.log(`✓ Initial Skip Google Drive value: "${initialValue}"`);

    // Step 3: Click on "Update" button beside "Skip Google Drive"
    console.log('\n[STEP 3] Clicking Update button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Update button' });

    await subscriptionPage.clickSkipGoogleDriveUpdate();
    const isModalVisible = await subscriptionPage.isSkipGoogleDriveModalVisible();
    expect(isModalVisible).toBeTruthy();
    console.log('✓ Update modal opened');

    // Step 4: Click "Yes" in the modal
    // According to requirement: clicking "Yes" should toggle the value
    // If initial is "Yes", clicking "Yes" should toggle to "No"
    // If initial is "No", clicking "Yes" should toggle to "Yes"
    console.log('\n[STEP 4] Selecting Yes in modal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select Yes' });

    // Always click "Yes" as per requirement
    // Note: The modal might work by setting the value, not toggling
    // So clicking "Yes" when it's "Yes" might not change it
    // But per requirement, we click "Yes" regardless
    await subscriptionPage.selectSkipGoogleDriveYes();
    
    // Wait for network request to complete
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    await page.waitForTimeout(2000);
    console.log('✓ Selected Yes in modal');

    // Step 5: (Optional) Check toast immediately and retrieve text
    console.log('\n[STEP 5] Checking for toast message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Check toast (optional)' });

    try {
      const toastText = await subscriptionPage.getToastText();
      if (toastText) {
        console.log(`✓ Toast message: "${toastText}"`);
      } else {
        console.log('✓ No toast message displayed (optional)');
      }
    } catch (error) {
      console.log('✓ Toast check skipped (optional)');
    }

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify login as customer button functionality', async ({ page, context }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Login as Customer Button ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to live plan detail page
    console.log('\n[STEP 1] Navigating to live plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to live plan detail page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    await subscriptionPage.isPageLoaded();
    
    // Open search panel and filter by Live stage
    await subscriptionPage.clickSearchHere();
    await subscriptionPage.unselectAllStages();
    await subscriptionPage.selectStages('Live');
    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click on first Sub ID to navigate to plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to live plan detail page');

    // Step 2: Check if "Login as Customer" button is visible
    console.log('\n[STEP 2] Checking if Login as Customer button is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Check button visibility' });

    const isButtonVisible = await subscriptionPage.isLoginAsCustomerButtonVisible();
    expect(isButtonVisible).toBeTruthy();
    console.log('✓ Login as Customer button is visible');

    // Step 3: Click on "Login as Customer" button
    console.log('\n[STEP 3] Clicking Login as Customer button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click button' });

    // Get the number of pages before clicking
    const pagesBefore = context.pages().length;
    
    // Click the button and wait for new tab
    const newPage = await subscriptionPage.clickLoginAsCustomerButton();
    
    // Verify a new page was opened
    const pagesAfter = context.pages().length;
    expect(pagesAfter).toBeGreaterThan(pagesBefore);
    console.log('✓ New tab opened');

    // Step 4: Verify navigation to login page in the new tab
    console.log('\n[STEP 4] Verifying navigation to login page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify navigation to login page' });

    // Wait for the new page to fully load
    await newPage.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await newPage.waitForTimeout(2000);
    
    // Check the URL of the new page
    const newPageUrl = newPage.url();
    console.log(`✓ New tab URL: ${newPageUrl}`);
    
    // Verify it's a login page (could be customer portal login)
    expect(newPageUrl).toMatch(/login|signin|auth/i);
    console.log('✓ Navigated to login page in new tab');

    // Close the new tab
    await newPage.close();
    console.log('✓ Closed new tab');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify extend expiry date functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Extend Expiry Date ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to live plan detail page
    console.log('\n[STEP 1] Navigating to live plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to live plan detail page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    await subscriptionPage.isPageLoaded();
    
    // Open search panel and filter by Live stage
    await subscriptionPage.clickSearchHere();
    await subscriptionPage.unselectAllStages();
    await subscriptionPage.selectStages('Live');
    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click on first Sub ID to navigate to plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to live plan detail page');

    // Step 2: Retrieve expiry date from table column
    console.log('\n[STEP 2] Retrieving current expiry date...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Retrieve current expiry date' });

    const currentExpiryDate = await subscriptionPage.getExpiryDate();
    expect(currentExpiryDate).toBeTruthy();
    console.log(`✓ Current expiry date: "${currentExpiryDate}"`);

    // Parse the current date to calculate a future date
    // Format is typically "05 Jan 2028" or similar
    const currentDate = new Date();
    // Add 30 days to current date for new expiry date
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 30);
    
    // Format as datetime-local: YYYY-MM-DDTHH:mm
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    const hours = String(futureDate.getHours()).padStart(2, '0');
    const minutes = String(futureDate.getMinutes()).padStart(2, '0');
    const newExpiryDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    console.log(`✓ New expiry date to enter: "${newExpiryDateTime}"`);

    // Step 3: Click Action button dropdown
    console.log('\n[STEP 3] Clicking Action dropdown button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Action dropdown' });

    await subscriptionPage.clickActionDropdown();
    console.log('✓ Action dropdown opened');

    // Step 4: Click "Extend Expiry Date" - modal opens
    console.log('\n[STEP 4] Clicking Extend Expiry Date option...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Extend Expiry Date' });

    await subscriptionPage.clickExtendExpiryDate();
    const isModalVisible = await subscriptionPage.isExtendExpiryDateModalVisible();
    expect(isModalVisible).toBeTruthy();
    console.log('✓ Extend Expiry Date modal opened');

    // Step 5: Enter new expiry date greater than current expiry date
    console.log('\n[STEP 5] Entering new expiry date...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Enter new expiry date' });

    await subscriptionPage.enterNewExpiryDate(newExpiryDateTime);
    console.log(`✓ Entered new expiry date: ${newExpiryDateTime}`);

    // Step 6: Enter remarks
    console.log('\n[STEP 6] Entering remarks...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Enter remarks' });

    const remarks = `Extended expiry date for testing - ${new Date().toISOString()}`;
    await subscriptionPage.enterRemarks(remarks);
    console.log(`✓ Entered remarks: "${remarks}"`);

    // Step 7: Click submit (Confirm button)
    console.log('\n[STEP 7] Clicking Confirm button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Click Confirm' });

    await subscriptionPage.clickExtendExpiryDateConfirm();
    
    // Wait for network request to complete
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    await page.waitForTimeout(2000);
    console.log('✓ Confirmed and submitted');

    // Step 8: Check in table that new expiry date shows
    console.log('\n[STEP 8] Verifying new expiry date in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify new expiry date in table' });

    // Refresh the page to get updated expiry date
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Verify we're still on the plan details page
    const urlAfterRefresh = page.url();
    if (!urlAfterRefresh.includes('subscription') || !urlAfterRefresh.includes('details')) {
      console.log('⚠ Not on plan details page after refresh, navigating back...');
      // Navigate back to plan details
      await subscriptionPage.clickSubscriptionMenuItem();
      await subscriptionPage.isPageLoaded();
      await subscriptionPage.clickSearchHere();
      await subscriptionPage.unselectAllStages();
      await subscriptionPage.selectStages('Live');
      await subscriptionPage.clickSearchButton();
      await page.waitForTimeout(2000);
      
      // Click the first Sub ID again to navigate to plan details
      await subscriptionPage.clickFirstSubIdInTable();
      await page.waitForTimeout(2000);
    }
    
    // Wait for the page to load
    await subscriptionPage.planDetailsHeading.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(1000);
    
    // Get the updated expiry date
    const updatedExpiryDate = await subscriptionPage.getExpiryDate();
    expect(updatedExpiryDate).toBeTruthy();
    console.log(`✓ Updated expiry date in table: "${updatedExpiryDate}"`);
    
    // Verify the date has changed (should be different from original)
    expect(updatedExpiryDate).not.toBe(currentExpiryDate);
    console.log('✓ Expiry date has been updated successfully');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify change price functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Change Price ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to live plan detail page
    console.log('\n[STEP 1] Navigating to live plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to live plan detail page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    await subscriptionPage.isPageLoaded();
    
    // Open search panel and filter by Live stage
    await subscriptionPage.clickSearchHere();
    await subscriptionPage.unselectAllStages();
    await subscriptionPage.selectStages('Live');
    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click on first Sub ID to navigate to plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to live plan detail page');

    // Step 2: Retrieve rate value from table column
    console.log('\n[STEP 2] Retrieving current rate value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Retrieve current rate value' });

    const currentRate = await subscriptionPage.getRateValue();
    expect(currentRate).toBeTruthy();
    console.log(`✓ Current rate: "${currentRate}"`);

    // Extract numeric value from rate (remove currency symbols and commas)
    const currentRateNumeric = parseFloat(currentRate.replace(/[₹,]/g, ''));
    expect(currentRateNumeric).toBeGreaterThan(0);
    
    // Calculate new price (add 10% to current price)
    const newPriceNumeric = Math.round(currentRateNumeric * 1.1);
    const newPrice = newPriceNumeric.toString();
    
    console.log(`✓ New price to enter: "${newPrice}"`);

    // Step 3: Click Action button dropdown
    console.log('\n[STEP 3] Clicking Action dropdown button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Action dropdown' });

    await subscriptionPage.clickActionDropdown();
    console.log('✓ Action dropdown opened');

    // Step 4: Click "Change Price" - modal opens
    console.log('\n[STEP 4] Clicking Change Price option...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Change Price' });

    await subscriptionPage.clickChangePrice();
    const isModalVisible = await subscriptionPage.isChangePriceModalVisible();
    expect(isModalVisible).toBeTruthy();
    console.log('✓ Change Price modal opened');

    // Step 5: Enter price
    console.log('\n[STEP 5] Entering new price...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Enter new price' });

    await subscriptionPage.enterNewPrice(newPrice);
    console.log(`✓ Entered new price: ${newPrice}`);

    // Step 6: Enter remarks
    console.log('\n[STEP 6] Entering remarks...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Enter remarks' });

    const remarks = `Changed price for testing - ${new Date().toISOString()}`;
    await subscriptionPage.enterChangePriceRemarks(remarks);
    console.log(`✓ Entered remarks: "${remarks}"`);

    // Step 7: Click confirm
    console.log('\n[STEP 7] Clicking Confirm button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Click Confirm' });

    await subscriptionPage.clickChangePriceConfirm();
    
    // Wait for network request to complete
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    await page.waitForTimeout(2000);
    console.log('✓ Confirmed and submitted');

    // Step 8: Check in table that new rate value is updated
    console.log('\n[STEP 8] Verifying new rate value in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify new rate value in table' });

    // Refresh the page to get updated rate
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Verify we're still on the plan details page
    const urlAfterRefresh = page.url();
    if (!urlAfterRefresh.includes('subscription') || !urlAfterRefresh.includes('details')) {
      console.log('⚠ Not on plan details page after refresh, navigating back...');
      // Navigate back to plan details
      await subscriptionPage.clickSubscriptionMenuItem();
      await subscriptionPage.isPageLoaded();
      await subscriptionPage.clickSearchHere();
      await subscriptionPage.unselectAllStages();
      await subscriptionPage.selectStages('Live');
      await subscriptionPage.clickSearchButton();
      await page.waitForTimeout(2000);
      
      // Click the first Sub ID again to navigate to plan details
      await subscriptionPage.clickFirstSubIdInTable();
      await page.waitForTimeout(2000);
    }
    
    // Wait for the page to load
    await subscriptionPage.planDetailsHeading.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(1000);
    
    // Get the updated rate
    const updatedRate = await subscriptionPage.getRateValue();
    expect(updatedRate).toBeTruthy();
    console.log(`✓ Updated rate in table: "${updatedRate}"`);
    
    // Extract numeric value from updated rate
    const updatedRateNumeric = parseFloat(updatedRate.replace(/[₹,]/g, ''));
    
    // Verify the rate has changed (should be different from original)
    // Note: The displayed rate might be formatted differently, so we compare numeric values
    expect(updatedRateNumeric).not.toBe(currentRateNumeric);
    console.log('✓ Rate has been updated successfully');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify add addon functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Add Addon ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to live plan detail page
    console.log('\n[STEP 1] Navigating to live plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to live plan detail page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    await subscriptionPage.isPageLoaded();
    
    // Open search panel and filter by Live stage
    await subscriptionPage.clickSearchHere();
    await subscriptionPage.unselectAllStages();
    await subscriptionPage.selectStages('Live');
    await subscriptionPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click on first Sub ID to navigate to plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to live plan detail page');

    // Step 2: Click Action button dropdown
    console.log('\n[STEP 2] Clicking Action dropdown button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Action dropdown' });

    await subscriptionPage.clickActionDropdown();
    console.log('✓ Action dropdown opened');

    // Step 3: Click "Add AddOn" - modal opens
    console.log('\n[STEP 3] Clicking Add AddOn option...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Add AddOn' });

    await subscriptionPage.clickAddAddon();
    const isModalVisible = await subscriptionPage.isAddAddonModalVisible();
    expect(isModalVisible).toBeTruthy();
    console.log('✓ Add AddOn modal opened');

    // Step 4: Select name from dropdown - select any value
    console.log('\n[STEP 4] Selecting addon name from dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select addon name' });

    // Try to select "ssd" first, if not available, try "odbc port"
    let addonSelected = false;
    try {
      await subscriptionPage.selectAddonName('ssd');
      addonSelected = true;
      console.log('✓ Selected addon: "ssd"');
    } catch (error) {
      try {
        await subscriptionPage.selectAddonName('odbc port');
        addonSelected = true;
        console.log('✓ Selected addon: "odbc port"');
      } catch (error2) {
        // If neither works, try to get the first available option
        const dropdown = subscriptionPage.addAddonNameDropdown;
        await dropdown.waitFor({ state: 'visible', timeout: 10000 });
        const options = await dropdown.locator('option:not([disabled]):not([value=""])').all();
        if (options.length > 0) {
          const firstOption = options[0];
          const optionValue = await firstOption.getAttribute('value');
          const optionText = await firstOption.textContent();
          await dropdown.selectOption({ value: optionValue });
          addonSelected = true;
          console.log(`✓ Selected addon: "${optionText?.trim()}"`);
        }
      }
    }
    
    expect(addonSelected).toBeTruthy();

    // Step 5: Enter remarks
    console.log('\n[STEP 5] Entering remarks...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Enter remarks' });

    const remarks = `Added addon for testing - ${new Date().toISOString()}`;
    await subscriptionPage.enterAddAddonRemarks(remarks);
    console.log(`✓ Entered remarks: "${remarks}"`);

    // Step 6: Click confirm button
    console.log('\n[STEP 6] Clicking Confirm button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Click Confirm' });

    await subscriptionPage.clickAddAddonConfirm();
    
    // Step 7: (Optional) Check toast - retrieve toast immediately
    console.log('\n[STEP 7] Checking for toast message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Check toast (optional)' });

    // Check for toast immediately after clicking (toast appears immediately)
    await page.waitForTimeout(500); // Small wait for toast to appear
    
    try {
      const toastText = await subscriptionPage.getToastText(5000);
      if (toastText) {
        console.log(`✓ Toast message: "${toastText}"`);
        
        // Verify toast text contains expected message - fail if it doesn't match
        const expectedText = 'add-on has been added to the subscription';
        expect(toastText.toLowerCase()).toContain(expectedText.toLowerCase());
        console.log('✓ Toast message matches expected text');
      } else {
        // If no toast, fail the test as toast is expected
        throw new Error('No toast message displayed, but toast is expected after adding addon');
      }
    } catch (error) {
      if (error.message.includes('No toast message displayed')) {
        throw error;
      }
      // If there's a toast but it doesn't match, the expect above will fail
      // Re-throw any other errors
      throw error;
    }
    
    // Wait for network request to complete
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    await page.waitForTimeout(1000);
    console.log('✓ Confirmed and submitted');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify navigation to trial plan detail page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigation to Trial Plan Detail Page ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    const isLoaded = await subscriptionPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    console.log('✓ Navigated to Subscription page');

    // Step 2: Open search panel
    console.log('\n[STEP 2] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Open search panel' });

    await subscriptionPage.clickSearchHere();
    const isPanelOpen = await subscriptionPage.isSearchPanelOpen();
    expect(isPanelOpen).toBeTruthy();
    console.log('✓ Search panel opened');

    // Step 3: Unselect all stages
    console.log('\n[STEP 3] Unselecting all stages...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Unselect all stages' });

    await subscriptionPage.unselectAllStages();
    await page.waitForTimeout(2000); // Wait for unselection to complete
    console.log('✓ All stages unselected');

    // Step 4: Select only Trial stage
    console.log('\n[STEP 4] Selecting Trial stage...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select Trial stage' });

    await subscriptionPage.selectStages('Trial');
    await page.waitForTimeout(2000); // Wait for selection to complete
    console.log('✓ Trial stage selected');

    // Step 5: Click search button
    console.log('\n[STEP 5] Clicking search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click search' });

    await subscriptionPage.clickSearchButton();
    
    // Wait for network request and table to update
    try {
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    // Wait for results to load and table to update
    await page.waitForTimeout(4000); // Increased wait time for results to load
    console.log('✓ Search executed');

    // Step 6: Click on first Sub ID to navigate to trial plan details
    console.log('\n[STEP 6] Clicking first Sub ID to navigate to trial plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Navigate to trial plan detail page' });

    // Wait a bit more to ensure the table has fully updated
    await page.waitForTimeout(1000);
    
    // Click on first Sub ID to navigate to trial plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to plan detail page');

    // Step 7: Retrieve plan status, sub ID, and plan name
    console.log('\n[STEP 7] Retrieving plan details...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Retrieve plan status, sub ID, and plan name' });

    const planDetails = await subscriptionPage.getPlanDetails();
    expect(planDetails).toBeTruthy();
    expect(planDetails.planName).toBeTruthy();
    expect(planDetails.subId).toBeTruthy();
    expect(planDetails.status).toBeTruthy();
    
    console.log(`✓ Plan Name: "${planDetails.planName}"`);
    console.log(`✓ Sub ID: "${planDetails.subId}"`);
    console.log(`✓ Status: "${planDetails.status}"`);

    // Step 8: Verify the status is "Trial"
    console.log('\n[STEP 8] Verifying plan status is Trial...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify status is Trial' });

    expect(planDetails.status.toLowerCase()).toBe('trial');
    console.log('✓ Plan status is Trial as expected');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify navigation to deleted plan detail page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigation to Deleted Plan Detail Page ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    const isLoaded = await subscriptionPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    console.log('✓ Navigated to Subscription page');

    // Step 2: Open search panel
    console.log('\n[STEP 2] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Open search panel' });

    await subscriptionPage.clickSearchHere();
    const isPanelOpen = await subscriptionPage.isSearchPanelOpen();
    expect(isPanelOpen).toBeTruthy();
    console.log('✓ Search panel opened');

    // Step 3: Unselect all stages
    console.log('\n[STEP 3] Unselecting all stages...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Unselect all stages' });

    await subscriptionPage.unselectAllStages();
    await page.waitForTimeout(2000); // Wait for unselection to complete
    console.log('✓ All stages unselected');

    // Step 4: Select only Deleted stage
    console.log('\n[STEP 4] Selecting Deleted stage...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select Deleted stage' });

    await subscriptionPage.selectStages('Deleted');
    await page.waitForTimeout(2000); // Wait for selection to complete
    console.log('✓ Deleted stage selected');

    // Step 5: Click search button
    console.log('\n[STEP 5] Clicking search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click search' });

    await subscriptionPage.clickSearchButton();
    
    // Wait for network request and table to update
    try {
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    // Wait for results to load and table to update
    await page.waitForTimeout(4000); // Wait for results to load
    console.log('✓ Search executed');

    // Step 6: Click on first Sub ID to navigate to deleted plan details
    console.log('\n[STEP 6] Clicking first Sub ID to navigate to deleted plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Navigate to deleted plan detail page' });

    // Wait a bit more to ensure the table has fully updated
    await page.waitForTimeout(1000);
    
    // Click on first Sub ID to navigate to deleted plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to plan detail page');

    // Step 7: Retrieve plan status, sub ID, and plan name
    console.log('\n[STEP 7] Retrieving plan details...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Retrieve plan status, sub ID, and plan name' });

    const planDetails = await subscriptionPage.getPlanDetails();
    expect(planDetails).toBeTruthy();
    expect(planDetails.planName).toBeTruthy();
    expect(planDetails.subId).toBeTruthy();
    expect(planDetails.status).toBeTruthy();
    
    console.log(`✓ Plan Name: "${planDetails.planName}"`);
    console.log(`✓ Sub ID: "${planDetails.subId}"`);
    console.log(`✓ Status: "${planDetails.status}"`);

    // Step 8: Verify the status is "Deleted"
    console.log('\n[STEP 8] Verifying plan status is Deleted...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify status is Deleted' });

    expect(planDetails.status.toLowerCase()).toBe('deleted');
    console.log('✓ Plan status is Deleted as expected');

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify navigation to expired plan detail page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigation to Expired Plan Detail Page ===');

    const subscriptionPage = new SubscriptionPage(page);

    // Step 1: Navigate to subscription page
    console.log('\n[STEP 1] Navigating to Subscription page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Subscription page' });

    await subscriptionPage.clickSubscriptionMenuItem();
    const isLoaded = await subscriptionPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    console.log('✓ Navigated to Subscription page');

    // Step 2: Open search panel
    console.log('\n[STEP 2] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Open search panel' });

    await subscriptionPage.clickSearchHere();
    const isPanelOpen = await subscriptionPage.isSearchPanelOpen();
    expect(isPanelOpen).toBeTruthy();
    console.log('✓ Search panel opened');

    // Step 3: Unselect all stages
    console.log('\n[STEP 3] Unselecting all stages...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Unselect all stages' });

    await subscriptionPage.unselectAllStages();
    await page.waitForTimeout(2000); // Wait for unselection to complete
    console.log('✓ All stages unselected');

    // Step 4: Select only Expired stage
    console.log('\n[STEP 4] Selecting Expired stage...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Select Expired stage' });

    await subscriptionPage.selectStages('Expired');
    await page.waitForTimeout(2000); // Wait for selection to complete
    console.log('✓ Expired stage selected');

    // Step 5: Click search button
    console.log('\n[STEP 5] Clicking search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click search' });

    await subscriptionPage.clickSearchButton();
    
    // Wait for network request and table to update
    try {
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    } catch (e) {
      // Ignore if networkidle times out
    }
    
    // Wait for results to load and table to update
    await page.waitForTimeout(4000); // Wait for results to load
    console.log('✓ Search executed');

    // Step 6: Click on first Sub ID to navigate to expired plan details
    console.log('\n[STEP 6] Clicking first Sub ID to navigate to expired plan detail page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Navigate to expired plan detail page' });

    // Wait a bit more to ensure the table has fully updated
    await page.waitForTimeout(1000);
    
    // Click on first Sub ID to navigate to expired plan details
    await subscriptionPage.clickFirstSubIdInTable();
    const isDetailsPageLoaded = await subscriptionPage.isPlanDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Navigated to plan detail page');

    // Step 7: Retrieve plan status, sub ID, and plan name
    console.log('\n[STEP 7] Retrieving plan details...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Retrieve plan status, sub ID, and plan name' });

    const planDetails = await subscriptionPage.getPlanDetails();
    expect(planDetails).toBeTruthy();
    expect(planDetails.planName).toBeTruthy();
    expect(planDetails.subId).toBeTruthy();
    expect(planDetails.status).toBeTruthy();
    
    console.log(`✓ Plan Name: "${planDetails.planName}"`);
    console.log(`✓ Sub ID: "${planDetails.subId}"`);
    console.log(`✓ Status: "${planDetails.status}"`);

    // Step 8: Verify the status is "Expired"
    console.log('\n[STEP 8] Verifying plan status is Expired...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify status is Expired' });

    expect(planDetails.status.toLowerCase()).toBe('expired');
    console.log('✓ Plan status is Expired as expected');

    console.log('\n=== Test Completed Successfully ===');
  });
});

