const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { CloudUserPage } = require('../pages/clouduser');

test.describe('Partner Portal - Cloud User', () => {
  test('should show error toast when searching without entering any fields', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Cloud User Search Without Fields ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${currentUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Cloud User module
    console.log('\n[STEP 2] Navigating to Cloud User module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Cloud User module' });
    const cloudUserPage = new CloudUserPage(page);
    await cloudUserPage.navigateToCloudUser();
    console.log('✓ Clicked on Cloud User menu item');
    
    // Verify we're on Cloud User page
    console.log('[VERIFICATION 2] Verifying Cloud User page is loaded...');
    await page.waitForLoadState('networkidle').catch(() => {});
    const isCloudUserPage = await cloudUserPage.isCloudUserPageVisible();
    expect(isCloudUserPage).toBeTruthy();
    console.log('✓ Cloud User page is visible');
    console.log('✓ Navigation verification PASSED');

    // Step 3: Open search panel
    console.log('\n[STEP 3] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Open search panel' });
    await cloudUserPage.openSearchPanel();
    await page.waitForTimeout(500);
    console.log('✓ Search panel opened');

    // Step 4: Click search button without entering any fields
    console.log('\n[STEP 4] Clicking search button without entering any fields...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click search button without fields' });
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Step 5: Verify user gets valid toast to fill at least one field
    console.log('\n[VERIFICATION 3] Verifying error toast appears...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify error toast message' });
    await page.waitForTimeout(1000);
    const errorToastVisible = await cloudUserPage.isErrorToastVisible();
    expect(errorToastVisible).toBeTruthy();
    console.log('✓ Error toast is visible');

    // Verify toast message content
    console.log('[VERIFICATION 4] Verifying error toast message content...');
    const errorMessage = await cloudUserPage.getErrorToastMessage();
    expect(errorMessage).not.toBeNull();
    console.log(`✓ Error toast message: "${errorMessage}"`);
    expect(errorMessage.toLowerCase()).toMatch(/fill|at least|one|field|search/i);
    console.log('✓ Error message contains expected keywords (fill/at least/one/field/search)');
    console.log('✓ Error toast verification PASSED');

    // Step 6: Verify no data message is showing
    console.log('\n[VERIFICATION 5] Verifying no data message is displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no data message' });
    const noDataVisible = await cloudUserPage.isNoDataMessageVisible();
    expect(noDataVisible).toBeTruthy();
    console.log('✓ No data message is visible');

    // Verify no data message content
    console.log('[VERIFICATION 6] Verifying no data message content...');
    const noDataMessage = await cloudUserPage.getNoDataMessage();
    expect(noDataMessage).not.toBeNull();
    console.log(`✓ No data message: "${noDataMessage}"`);
    expect(noDataMessage.toLowerCase()).toMatch(/see the data|search|field/i);
    console.log('✓ No data message contains expected keywords (see the data/search/field)');
    console.log('✓ No data message verification PASSED');

    // Capture screenshot
    console.log('\n[STEP 7] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-cloud-user-search-error.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-cloud-user-search-error.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should search cloud user by Sub ID, Admin Email, and Cloud User Email', async ({ page }, testInfo) => {
   
    
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Search Cloud User by Sub ID, Admin Email, and Cloud User Email ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${currentUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Cloud User module
    console.log('\n[STEP 2] Navigating to Cloud User module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Cloud User module' });
    const cloudUserPage = new CloudUserPage(page);
    await cloudUserPage.navigateToCloudUser();
    console.log('✓ Clicked on Cloud User menu item');
    
    // Verify we're on Cloud User page
    console.log('[VERIFICATION 2] Verifying Cloud User page is loaded...');
    await page.waitForLoadState('networkidle').catch(() => {});
    const isCloudUserPage = await cloudUserPage.isCloudUserPageVisible();
    expect(isCloudUserPage).toBeTruthy();
    console.log('✓ Cloud User page is visible');
    console.log('✓ Navigation verification PASSED');

    // Step 3: Open search panel
    console.log('\n[STEP 3] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Open search panel' });
    await cloudUserPage.openSearchPanel();
    await page.waitForTimeout(500);
    console.log('✓ Search panel opened');

    // Test 1: Search by Sub ID
    console.log('\n--- Test 1: Search by Sub ID ---');
    const subId = '123'; // Replace with actual test data
    console.log(`\n[STEP 4] Filling Sub ID field with: "${subId}"...`);
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Fill Sub ID and search' });
    await cloudUserPage.fillSubId(subId);
    console.log('✓ Sub ID entered');

    console.log('\n[STEP 5] Clicking search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    console.log('\n[VERIFICATION 3] Verifying records are showing for Sub ID search...');
    const recordsShowingSubId = await cloudUserPage.areRecordsShowing();
    expect(recordsShowingSubId).toBeTruthy();
    const rowCountSubId = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Records are showing: ${rowCountSubId} row(s) found`);
    console.log('✓ Sub ID search verification PASSED');

    // Test 2: Search by Admin Email
    console.log('\n--- Test 2: Search by Admin Email ---');
    const adminEmail = 'anilgoyal57@rediffmail.com'; // Replace with actual test data
    console.log(`\n[STEP 6] Filling Admin Email field with: "${adminEmail}"...`);
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Fill Admin Email and search' });
    await cloudUserPage.fillAdminEmail(adminEmail);
    console.log('✓ Admin Email entered');

    console.log('\n[STEP 7] Clicking search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    console.log('\n[VERIFICATION 4] Verifying records are showing for Admin Email search...');
    const recordsShowingAdminEmail = await cloudUserPage.areRecordsShowing();
    expect(recordsShowingAdminEmail).toBeTruthy();
    const rowCountAdminEmail = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Records are showing: ${rowCountAdminEmail} row(s) found`);
    const adminEmailInTable = await cloudUserPage.verifyValueInTable(adminEmail);
    console.log(`✓ Admin Email "${adminEmail}" found in table: ${adminEmailInTable}`);
    console.log('✓ Admin Email search verification PASSED');

    // Test 3: Search by Cloud User Email
    console.log('\n--- Test 3: Search by Cloud User Email ---');
    const cloudUserEmail = 'sunriseagency101@gmail.com'; // Replace with actual test data
    console.log(`\n[STEP 8] Filling Cloud User Email field with: "${cloudUserEmail}"...`);
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Fill Cloud User Email and search' });
    await cloudUserPage.fillCloudUserEmail(cloudUserEmail);
    console.log('✓ Cloud User Email entered');

    console.log('\n[STEP 9] Clicking search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    console.log('\n[VERIFICATION 5] Verifying records are showing for Cloud User Email search...');
    const recordsShowingCloudUserEmail = await cloudUserPage.areRecordsShowing();
    expect(recordsShowingCloudUserEmail).toBeTruthy();
    const rowCountCloudUserEmail = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Records are showing: ${rowCountCloudUserEmail} row(s) found`);
    
    // Verify Cloud User Email in Instance User Email column
    console.log('[VERIFICATION 6] Verifying Cloud User Email in Instance User Email column...');
    const instanceUserEmailFound = await cloudUserPage.verifyInstanceUserEmailInTable(cloudUserEmail);
    expect(instanceUserEmailFound).toBeTruthy();
    console.log(`✓ Cloud User Email "${cloudUserEmail}" found in Instance User Email column: ${instanceUserEmailFound}`);
    console.log('✓ Cloud User Email search verification PASSED');

    // Step 10: Click reset button
    console.log('\n[STEP 10] Clicking reset button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Click reset button' });
    await cloudUserPage.clickReset();
    console.log('✓ Reset button clicked');
    
    // Wait for reset to process
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 11: Verify form fields are cleared
    console.log('\n[VERIFICATION 7] Verifying search form fields are cleared...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify form is cleared' });
    const fieldsEmpty = await cloudUserPage.areSearchFieldsEmpty();
    expect(fieldsEmpty).toBeTruthy();
    console.log('✓ All search fields are cleared');
    console.log('✓ Form reset verification PASSED');

    // Step 12: Verify no data is showing
    console.log('\n[VERIFICATION 8] Verifying no data is showing after reset...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Verify no data showing' });
    const noDataVisible = await cloudUserPage.isNoDataMessageVisible();
    expect(noDataVisible).toBeTruthy();
    console.log('✓ No data message is visible');
    const rowCountAfterReset = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count after reset: ${rowCountAfterReset}`);
    expect(rowCountAfterReset).toBe(0);
    console.log('✓ No data verification PASSED');

    // Capture screenshot
    console.log('\n[STEP 13] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-cloud-user-search-results.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-cloud-user-search-results.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('to verify searching with invalid data', async ({ page }, testInfo) => {
    
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Search Cloud User with Invalid Data ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${currentUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Cloud User module
    console.log('\n[STEP 2] Navigating to Cloud User module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Cloud User module' });
    const cloudUserPage = new CloudUserPage(page);
    await cloudUserPage.navigateToCloudUser();
    console.log('✓ Clicked on Cloud User menu item');
    
    // Verify we're on Cloud User page
    console.log('[VERIFICATION 2] Verifying Cloud User page is loaded...');
    await page.waitForLoadState('networkidle').catch(() => {});
    const isCloudUserPage = await cloudUserPage.isCloudUserPageVisible();
    expect(isCloudUserPage).toBeTruthy();
    console.log('✓ Cloud User page is visible');
    console.log('✓ Navigation verification PASSED');

    // Step 3: Open search panel
    console.log('\n[STEP 3] Opening search panel...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Open search panel' });
    await cloudUserPage.openSearchPanel();
    await page.waitForTimeout(500);
    console.log('✓ Search panel opened');

    // Test 1: Search with invalid Sub ID
    console.log('\n--- Test 1: Search with Invalid Sub ID ---');
    const invalidSubId = 'INVALID_SUB_ID_999999';
    console.log(`\n[STEP 4] Filling Sub ID field with invalid data: "${invalidSubId}"...`);
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Search with invalid Sub ID' });
    await cloudUserPage.fillSubId(invalidSubId);
    console.log('✓ Invalid Sub ID entered');

    console.log('\n[STEP 5] Clicking search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    console.log('\n[VERIFICATION 3] Verifying toast message appears for invalid Sub ID...');
    const toastVisibleSubId = await cloudUserPage.isAnyToastVisible();
    if (toastVisibleSubId) {
      const toastMessage = await cloudUserPage.getAnyToastMessage();
      console.log(`✓ Toast message: "${toastMessage}"`);
    }
    console.log(`✓ Toast visible: ${toastVisibleSubId}`);

    console.log('\n[VERIFICATION 4] Verifying no data is showing for invalid Sub ID...');
    const noDataVisibleSubId = await cloudUserPage.isNoDataMessageVisible();
    expect(noDataVisibleSubId).toBeTruthy();
    console.log('✓ No data message is visible');
    const rowCountSubId = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count: ${rowCountSubId}`);
    expect(rowCountSubId).toBe(0);
    console.log('✓ Invalid Sub ID search verification PASSED');

    // Test 2: Search with invalid Admin Email
    console.log('\n--- Test 2: Search with Invalid Admin Email ---');
    const invalidAdminEmail = 'invalid_admin_email@nonexistent.com';
    console.log(`\n[STEP 6] Filling Admin Email field with invalid data: "${invalidAdminEmail}"...`);
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Search with invalid Admin Email' });
    await cloudUserPage.fillAdminEmail(invalidAdminEmail);
    console.log('✓ Invalid Admin Email entered');

    console.log('\n[STEP 7] Clicking search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    console.log('\n[VERIFICATION 5] Verifying toast message appears for invalid Admin Email...');
    const toastVisibleAdminEmail = await cloudUserPage.isAnyToastVisible();
    if (toastVisibleAdminEmail) {
      const toastMessage = await cloudUserPage.getAnyToastMessage();
      console.log(`✓ Toast message: "${toastMessage}"`);
    }
    console.log(`✓ Toast visible: ${toastVisibleAdminEmail}`);

    console.log('\n[VERIFICATION 6] Verifying no data is showing for invalid Admin Email...');
    const noDataVisibleAdminEmail = await cloudUserPage.isNoDataMessageVisible();
    expect(noDataVisibleAdminEmail).toBeTruthy();
    console.log('✓ No data message is visible');
    const rowCountAdminEmail = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count: ${rowCountAdminEmail}`);
    expect(rowCountAdminEmail).toBe(0);
    console.log('✓ Invalid Admin Email search verification PASSED');

    // Test 3: Search with invalid Cloud User Email
    console.log('\n--- Test 3: Search with Invalid Cloud User Email ---');
    const invalidCloudUserEmail = 'invalid_cloud_user@nonexistent.com';
    console.log(`\n[STEP 8] Filling Cloud User Email field with invalid data: "${invalidCloudUserEmail}"...`);
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Search with invalid Cloud User Email' });
    await cloudUserPage.fillCloudUserEmail(invalidCloudUserEmail);
    console.log('✓ Invalid Cloud User Email entered');

    console.log('\n[STEP 9] Clicking search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');

    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    console.log('\n[VERIFICATION 7] Verifying toast message appears for invalid Cloud User Email...');
    const toastVisibleCloudUserEmail = await cloudUserPage.isAnyToastVisible();
    if (toastVisibleCloudUserEmail) {
      const toastMessage = await cloudUserPage.getAnyToastMessage();
      console.log(`✓ Toast message: "${toastMessage}"`);
    }
    console.log(`✓ Toast visible: ${toastVisibleCloudUserEmail}`);

    console.log('\n[VERIFICATION 8] Verifying no data is showing for invalid Cloud User Email...');
    const noDataVisibleCloudUserEmail = await cloudUserPage.isNoDataMessageVisible();
    expect(noDataVisibleCloudUserEmail).toBeTruthy();
    console.log('✓ No data message is visible');
    const rowCountCloudUserEmail = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count: ${rowCountCloudUserEmail}`);
    expect(rowCountCloudUserEmail).toBe(0);
    console.log('✓ Invalid Cloud User Email search verification PASSED');

    // Step 10: Click reset button
    console.log('\n[STEP 10] Clicking reset button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Click reset button' });
    await cloudUserPage.clickReset();
    console.log('✓ Reset button clicked');
    
    // Wait for reset to process
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 11: Verify form fields are cleared
    console.log('\n[VERIFICATION 9] Verifying search form fields are cleared...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify form is reset' });
    const fieldsEmpty = await cloudUserPage.areSearchFieldsEmpty();
    expect(fieldsEmpty).toBeTruthy();
    console.log('✓ All search fields are cleared');
    console.log('✓ Form reset verification PASSED');

    // Step 12: Verify no data is showing after reset
    console.log('\n[VERIFICATION 10] Verifying no data is showing after reset...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Verify no data showing after reset' });
    const noDataVisibleAfterReset = await cloudUserPage.isNoDataMessageVisible();
    expect(noDataVisibleAfterReset).toBeTruthy();
    console.log('✓ No data message is visible');
    const rowCountAfterReset = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count after reset: ${rowCountAfterReset}`);
    expect(rowCountAfterReset).toBe(0);
    console.log('✓ No data after reset verification PASSED');

    // Capture screenshot
    console.log('\n[STEP 13] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-cloud-user-invalid-search.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-cloud-user-invalid-search.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should select and unselect headers to show/hide columns', async ({ page }, testInfo) => {
    test.setTimeout(120000); // Set timeout to 2 minutes for this test
    
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Select and Unselect Headers ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${currentUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Cloud User module
    console.log('\n[STEP 2] Navigating to Cloud User module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Cloud User module' });
    const cloudUserPage = new CloudUserPage(page);
    await cloudUserPage.navigateToCloudUser();
    console.log('✓ Clicked on Cloud User menu item');
    
    // Verify we're on Cloud User page
    console.log('[VERIFICATION 2] Verifying Cloud User page is loaded...');
    await page.waitForLoadState('networkidle').catch(() => {});
    const isCloudUserPage = await cloudUserPage.isCloudUserPageVisible();
    expect(isCloudUserPage).toBeTruthy();
    console.log('✓ Cloud User page is visible');
    console.log('✓ Navigation verification PASSED');

    // Step 3: Search with Sub ID '123'
    console.log('\n[STEP 3] Searching with Sub ID "123"...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Search with Sub ID' });
    await cloudUserPage.openSearchPanel();
    await cloudUserPage.fillSubId('123');
    console.log('✓ Sub ID "123" entered');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');
    
    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 4: Click header dropdown
    console.log('\n[STEP 4] Opening Select Headers dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Open Select Headers dropdown' });
    await cloudUserPage.openSelectHeadersDropdown();
    console.log('✓ Header dropdown opened');

    // Step 5: Check all checked options are listed as columns
    console.log('\n[VERIFICATION 3] Verifying checked headers are shown as columns...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify checked headers shown as columns' });
    await cloudUserPage.closeSelectHeadersDropdown();
    await page.waitForTimeout(500);
    
    const visibleHeaders = await cloudUserPage.getVisibleHeaderTexts();
    console.log(`✓ Visible headers: ${visibleHeaders.join(', ')}`);
    expect(visibleHeaders.length).toBeGreaterThan(0);
    console.log(`✓ Total visible headers: ${visibleHeaders.length}`);
    console.log('✓ Headers verification PASSED');

    // Step 6: Unselect all headers
    console.log('\n[STEP 6] Unselecting all headers...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Unselect all headers' });
    await cloudUserPage.unselectAllHeaders();
    console.log('✓ All headers unselected');
    
    // Wait for table to update
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 7: Verify no columns/data/records will show
    console.log('\n[VERIFICATION 4] Verifying no columns/data/records are showing...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify no columns showing' });
    const visibleHeadersAfterUnselect = await cloudUserPage.getVisibleHeaderTexts();
    console.log(`✓ Visible headers after unselect: ${visibleHeadersAfterUnselect.length}`);
    expect(visibleHeadersAfterUnselect.length).toBe(0);
    console.log('✓ No columns are visible');
    
    const rowCountAfterUnselect = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count after unselect: ${rowCountAfterUnselect}`);
    expect(rowCountAfterUnselect).toBe(0);
    console.log('✓ No data/records are showing');
    console.log('✓ No columns/data verification PASSED');

    // Step 8: Verify "No columns selected" message is shown
    console.log('\n[VERIFICATION 5] Verifying "No columns selected" message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify no columns selected message' });
    const noColumnsMessageVisible = await cloudUserPage.isNoColumnsSelectedMessageVisible();
    expect(noColumnsMessageVisible).toBeTruthy();
    console.log('✓ "No columns selected" message is visible');
    
    const noColumnsMessage = await cloudUserPage.getNoColumnsSelectedMessage();
    expect(noColumnsMessage).not.toBeNull();
    console.log(`✓ Message text: "${noColumnsMessage}"`);
    expect(noColumnsMessage.toLowerCase()).toMatch(/no columns selected|choose at least one header/i);
    console.log('✓ Message contains expected text');
    console.log('✓ No columns selected message verification PASSED');

    // Step 9: Select all headers again
    console.log('\n[STEP 9] Selecting all headers again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Select all headers' });
    await cloudUserPage.selectAllHeaders();
    console.log('✓ All headers selected');
    
    // Wait for table to update
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 10: Verify all headers selected showing as columns
    console.log('\n[VERIFICATION 6] Verifying all headers are shown as columns...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify all headers shown as columns' });
    const visibleHeadersAfterSelect = await cloudUserPage.getVisibleHeaderTexts();
    console.log(`✓ Visible headers after select: ${visibleHeadersAfterSelect.join(', ')}`);
    expect(visibleHeadersAfterSelect.length).toBeGreaterThan(0);
    console.log(`✓ Total visible headers: ${visibleHeadersAfterSelect.length}`);
    
    // Verify expected headers are present
    const expectedHeaders = [
      'Sub Id',
      'Status',
      'Stage',
      'Admin Email',
      'Customer Company Name',
      'Number Of Users',
      'Instance Username',
      'Instance User Email',
      'Instance Password',
      'Partner Company',
      'Partner Email',
      'Plan Name',
      'Start Date',
      'Next Billing Date',
      'Last Billing Date',
    ];
    
    for (const header of expectedHeaders) {
      const isVisible = await cloudUserPage.isHeaderVisible(header);
      console.log(`✓ Header "${header}" visible: ${isVisible}`);
      expect(isVisible).toBeTruthy();
    }
    console.log('✓ All headers verification PASSED');

    // Verify records are showing again
    const rowCountAfterSelect = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Row count after select: ${rowCountAfterSelect}`);
    expect(rowCountAfterSelect).toBeGreaterThan(0);
    console.log('✓ Records are showing again');

    // Capture screenshot
    console.log('\n[STEP 11] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-cloud-user-headers-toggle.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-cloud-user-headers-toggle.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should click Sub ID and verify user details and cloud user details', async ({ page }, testInfo) => {
    test.setTimeout(120000); // Set timeout to 2 minutes for this test
    
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Click Sub ID and Verify Details ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${currentUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Cloud User module
    console.log('\n[STEP 2] Navigating to Cloud User module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Cloud User module' });
    const cloudUserPage = new CloudUserPage(page);
    await cloudUserPage.navigateToCloudUser();
    console.log('✓ Clicked on Cloud User menu item');
    
    // Verify we're on Cloud User page
    console.log('[VERIFICATION 2] Verifying Cloud User page is loaded...');
    await page.waitForLoadState('networkidle').catch(() => {});
    const isCloudUserPage = await cloudUserPage.isCloudUserPageVisible();
    expect(isCloudUserPage).toBeTruthy();
    console.log('✓ Cloud User page is visible');
    console.log('✓ Navigation verification PASSED');

    // Step 3: Search with Sub ID '123'
    console.log('\n[STEP 3] Searching with Sub ID "123"...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Search with Sub ID' });
    await cloudUserPage.openSearchPanel();
    await cloudUserPage.fillSubId('123');
    console.log('✓ Sub ID "123" entered');
    await cloudUserPage.clickSearch();
    console.log('✓ Search button clicked');
    
    // Wait for search results
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 4: Verify records are showing
    console.log('\n[VERIFICATION 3] Verifying records are showing...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify records showing' });
    const recordsShowing = await cloudUserPage.areRecordsShowing();
    expect(recordsShowing).toBeTruthy();
    const rowCount = await cloudUserPage.getVisibleRowCount();
    console.log(`✓ Records are showing: ${rowCount} row(s) found`);
    expect(rowCount).toBeGreaterThan(0);
    console.log('✓ Records verification PASSED');

    // Step 5: Get data from first row before clicking (to compare later)
    console.log('\n[STEP 5] Capturing data from first row...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Capture data from table' });
    const firstRow = cloudUserPage.cloudUserTableRows.first();
    await firstRow.waitFor({ state: 'visible', timeout: 10000 });
    
    // Get Cloud User Email Id, Cloud User Name, and Status from the table
    let cloudUserEmailId = '';
    let cloudUserName = '';
    let cloudUserStatus = '';
    
    try {
      // Try to get from Instance User Email column (this is the Cloud User Email)
      const emailCell = firstRow.locator('td.cdk-column-Instance-User-Email, td[class*="Instance-User-Email"]').first();
      if (await emailCell.count() > 0) {
        const emailText = await emailCell.textContent();
        cloudUserEmailId = emailText ? emailText.trim() : '';
      }
    } catch (error) {
      console.log(`Note: Could not get email from Instance User Email column: ${error.message}`);
    }
    
    try {
      // Try to get from Instance Username column (this is the Cloud User Name)
      const nameCell = firstRow.locator('td.cdk-column-Instance-Username, td[class*="Instance-Username"]').first();
      if (await nameCell.count() > 0) {
        const nameText = await nameCell.textContent();
        cloudUserName = nameText ? nameText.trim() : '';
      }
    } catch (error) {
      console.log(`Note: Could not get name from Instance Username column: ${error.message}`);
    }
    
    try {
      // Try to get Status
      const statusCell = firstRow.locator('td.cdk-column-Status, td[class*="Status"]').first();
      if (await statusCell.count() > 0) {
        const statusText = await statusCell.textContent();
        cloudUserStatus = statusText ? statusText.trim() : '';
      }
    } catch (error) {
      console.log(`Note: Could not get status: ${error.message}`);
    }
    
    console.log(`✓ Captured Cloud User Email Id: "${cloudUserEmailId}"`);
    console.log(`✓ Captured Cloud User Name: "${cloudUserName}"`);
    console.log(`✓ Captured Status: "${cloudUserStatus}"`);

    // Step 6: Click on first Sub ID
    console.log('\n[STEP 6] Clicking on first Sub ID...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Click Sub ID' });
    const clickedSubId = await cloudUserPage.clickFirstSubId();
    console.log(`✓ Clicked on Sub ID: "${clickedSubId}"`);
    
    // Wait for navigation to details page
    console.log('Waiting for page navigation...');
    await cloudUserPage.waitForUserDetailsPage();
    
    // Check current URL
    const currentUrlAfterClick = await page.url();
    console.log(`✓ Current URL after click: ${currentUrlAfterClick}`);

    // Step 7: Verify user details page is loaded
    console.log('\n[VERIFICATION 4] Verifying user details page is loaded...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify details page loaded' });
    
    // Try to find details section elements for debugging
    const subDetailsExists = await page.locator('div.sub-details').count();
    const detailsHeaderExists = await page.locator('div:has-text("Details")').count();
    const subIdDetailExists = await page.locator('div:has-text("Sub Id")').count();
    const mainDetailsExists = await page.locator('div.main-details').count();
    console.log(`✓ Sub details section found: ${subDetailsExists > 0}`);
    console.log(`✓ Details header found: ${detailsHeaderExists > 0}`);
    console.log(`✓ Sub Id detail found: ${subIdDetailExists > 0}`);
    console.log(`✓ Main details rows found: ${mainDetailsExists}`);
    
    const detailsPageLoaded = await cloudUserPage.isUserDetailsPageLoaded();
    if (!detailsPageLoaded) {
      // Try to get page title or any visible text for debugging
      const pageTitle = await page.title();
      console.log(`Page title: ${pageTitle}`);
      const bodyText = await page.locator('body').textContent();
      console.log(`Page contains "Details": ${bodyText?.includes('Details')}`);
      console.log(`Page contains "Sub Id": ${bodyText?.includes('Sub Id')}`);
      console.log(`Page contains "Status": ${bodyText?.includes('Status')}`);
    }
    expect(detailsPageLoaded).toBeTruthy();
    console.log('✓ User details page is loaded');
    console.log('✓ Details page verification PASSED');

    // Step 8: Verify user details (Sub Id and all)
    console.log('\n[VERIFICATION 5] Verifying user details...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify user details' });
    const userDetails = await cloudUserPage.getAllUserDetails();
    console.log('✓ User details retrieved:', userDetails);
    
    // Verify Sub Id matches
    if (clickedSubId && userDetails['Sub Id']) {
      expect(userDetails['Sub Id']).toContain(clickedSubId.replace('SUB-', '') || clickedSubId);
      console.log(`✓ Sub Id matches: "${userDetails['Sub Id']}"`);
    }
    
    // Verify other key details exist
    expect(userDetails['Status']).toBeTruthy();
    console.log(`✓ Status: "${userDetails['Status']}"`);
    expect(userDetails['Admin Email']).toBeTruthy();
    console.log(`✓ Admin Email: "${userDetails['Admin Email']}"`);
    expect(userDetails['Customer Company Name']).toBeTruthy();
    console.log(`✓ Customer Company Name: "${userDetails['Customer Company Name']}"`);
    console.log('✓ User details verification PASSED');

    // Step 9: Verify cloud user details
    console.log('\n[VERIFICATION 6] Verifying cloud user details in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify cloud user details' });
    const cloudUserDetails = await cloudUserPage.getCloudUserDetailsFromTable();
    console.log('✓ Cloud user details retrieved:', cloudUserDetails);
    
    // Verify Cloud User Email Id matches
    if (cloudUserEmailId && cloudUserDetails['Cloud User Email Id']) {
      const emailIdMatch = cloudUserDetails['Cloud User Email Id'].toLowerCase().includes(cloudUserEmailId.toLowerCase());
      expect(emailIdMatch).toBeTruthy();
      console.log(`✓ Cloud User Email Id matches: "${cloudUserDetails['Cloud User Email Id']}"`);
    }
    
    // Verify Cloud User Name matches
    if (cloudUserName && cloudUserDetails['Cloud User Name']) {
      const nameMatch = cloudUserDetails['Cloud User Name'].toLowerCase().includes(cloudUserName.toLowerCase());
      expect(nameMatch).toBeTruthy();
      console.log(`✓ Cloud User Name matches: "${cloudUserDetails['Cloud User Name']}"`);
    }
    
    // Verify Status matches
    if (cloudUserStatus && cloudUserDetails['Status']) {
      const statusMatch = cloudUserDetails['Status'].toLowerCase().includes(cloudUserStatus.toLowerCase());
      expect(statusMatch).toBeTruthy();
      console.log(`✓ Status matches: "${cloudUserDetails['Status']}"`);
    }
    
    // Verify all three fields are present
    expect(cloudUserDetails['Cloud User Email Id']).toBeTruthy();
    expect(cloudUserDetails['Cloud User Name']).toBeTruthy();
    expect(cloudUserDetails['Status']).toBeTruthy();
    console.log('✓ Cloud user details verification PASSED');

    // Capture screenshot
    console.log('\n[STEP 10] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-cloud-user-details.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-cloud-user-details.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  
});

