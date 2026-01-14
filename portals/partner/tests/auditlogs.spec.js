const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { AuditLogsPage } = require('../pages/auditlogs');

test.describe('Partner Portal - Audit Logs', () => {
  test('should test audit logs search functionality with all fields', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';


    console.log('\n=== Starting Test: Audit Logs Search Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test audit logs search functionality with all fields' });

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Audit Logs page
    console.log('\n[STEP 2] Navigating to Audit Logs page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Audit Logs page' });
    const auditLogsPage = new AuditLogsPage(page);
    await auditLogsPage.navigateToAuditLogs();
    const isPageVisible = await auditLogsPage.isAuditLogsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ Audit Logs page is visible');

    // Step 3: Verify all six search fields are visible
    console.log('\n[STEP 3] Verifying all search fields are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify all search fields are visible' });
    const allFieldsVisible = await auditLogsPage.areAllSearchFieldsVisible();
    expect(allFieldsVisible).toBeTruthy();
    console.log('✓ All six search fields are visible (Name, Email, URL Endpoint, API Response, Task Type, Custom Date)');

    // Step 4: Verify Search and Reset buttons are visible and clickable
    console.log('\n[STEP 4] Verifying Search and Reset buttons...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify Search and Reset buttons' });
    const buttonsVisible = await auditLogsPage.areSearchButtonsVisible();
    expect(buttonsVisible).toBeTruthy();
    console.log('✓ Search and Reset buttons are visible and clickable');

    // Test Name field search
    console.log('\n[TEST 1] Testing Name field search...');
    testInfo.annotations.push({ type: 'step', description: 'Test 1: Name field search' });
    const searchName = 'Akshay Gupta';
    await auditLogsPage.fillNameField(searchName);
    await auditLogsPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    const nameMatches = await auditLogsPage.verifyNameColumnContains(searchName);
    expect(nameMatches).toBeTruthy();
    console.log(`✓ All rows in Name column contain "${searchName}"`);

    // Test Email field search
    console.log('\n[TEST 2] Testing Email field search...');
    testInfo.annotations.push({ type: 'step', description: 'Test 2: Email field search' });
    await auditLogsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    const searchEmail = 'contact@co';
    await auditLogsPage.fillEmailField(searchEmail);
    await auditLogsPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    const emailMatches = await auditLogsPage.verifyEmailColumnContains(searchEmail);
    expect(emailMatches).toBeTruthy();
    console.log(`✓ All rows in Email column contain "${searchEmail}"`);

    // Test URL Endpoint search
    console.log('\n[TEST 3] Testing URL Endpoint search...');
    testInfo.annotations.push({ type: 'step', description: 'Test 3: URL Endpoint search' });
    await auditLogsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    const searchUrl = '/Label';
    await auditLogsPage.fillUrlEndpointField(searchUrl);
    await auditLogsPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    const urlMatches = await auditLogsPage.verifyUrlEndpointColumnContains(searchUrl);
    expect(urlMatches).toBeTruthy();
    console.log(`✓ All rows in URL Endpoint column contain "${searchUrl}"`);

    // Test Task Type search
    console.log('\n[TEST 4] Testing Task Type search...');
    testInfo.annotations.push({ type: 'step', description: 'Test 4: Task Type search' });
    await auditLogsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    const searchTaskType = 'Create';
    await auditLogsPage.fillTaskTypeField(searchTaskType);
    await auditLogsPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    const taskTypeMatches = await auditLogsPage.verifyTaskTypeColumnMatches(searchTaskType);
    expect(taskTypeMatches).toBeTruthy();
    console.log(`✓ All rows in Task Type column show "${searchTaskType}"`);

    // Test API Response field
    console.log('\n[TEST 5] Testing API Response field search...');
    testInfo.annotations.push({ type: 'step', description: 'Test 5: API Response search' });
    await auditLogsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    // Try multiple variations of the search text since the search might be case-sensitive
    const searchVariations = [
      'label name already exists',
      'Label name already exists',
      'Label Name Already Exists',
      'label name already exists.'
    ];
    
    let searchApiResponse = searchVariations[0];
    let searchSuccessful = false;
    
    for (const searchText of searchVariations) {
      console.log(`Trying search text: "${searchText}"`);
      await auditLogsPage.fillApiResponseField(searchText);
      await auditLogsPage.clickSearchButton();
      
      // Wait for search results to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      // Check if table has rows
      const tableRows = page.locator('tr[mat-row], tr[role="row"]:not([mat-header-row])');
      const rowCount = await tableRows.count();
      console.log(`Table rows after search: ${rowCount}`);
      
      if (rowCount > 0) {
        searchApiResponse = searchText;
        searchSuccessful = true;
        break;
      } else {
        // Reset and try next variation
        await auditLogsPage.clickResetButton();
        await page.waitForTimeout(1000);
      }
    }
    
    if (!searchSuccessful) {
      console.log('⚠ No results found with any search variation. Proceeding with verification anyway...');
      // Still try to verify - the search might have worked but table is empty
      searchApiResponse = searchVariations[0];
      await auditLogsPage.fillApiResponseField(searchApiResponse);
      await auditLogsPage.clickSearchButton();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
    }
    
    const apiResponseMatches = await auditLogsPage.verifyApiResponseColumnContains(searchApiResponse);
    expect(apiResponseMatches).toBeTruthy();
    console.log(`✓ All rows in API Response column contain "${searchApiResponse}"`);

    // Test Custom Date Range
    console.log('\n[TEST 6] Testing Custom Date Range search...');
    testInfo.annotations.push({ type: 'step', description: 'Test 6: Custom Date Range search' });
    await auditLogsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    // Select a date range (last 7 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    await auditLogsPage.selectDateRange(startDate, endDate);
    await auditLogsPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    const dateRangeMatches = await auditLogsPage.verifyDateRange(startDate, endDate);
    expect(dateRangeMatches).toBeTruthy();
    console.log(`✓ All rows are within the selected date range`);

    // Verify Reset functionality
    console.log('\n[TEST 7] Testing Reset functionality...');
    testInfo.annotations.push({ type: 'step', description: 'Test 7: Reset functionality' });
    await auditLogsPage.clickResetButton();
    await page.waitForTimeout(2000);
    
    // Verify all search fields are empty
    const fieldsEmpty = await auditLogsPage.areSearchFieldsEmpty();
    expect(fieldsEmpty).toBeTruthy();
    console.log('✓ All search fields are empty after reset');
    
    // Verify table resets to full list
    const paginationShowsFullCount = await auditLogsPage.verifyPaginationShowsFullCount();
    expect(paginationShowsFullCount).toBeTruthy();
    console.log('✓ Table reset to full list (pagination shows full count)');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify Select Headers dropdown functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    

    console.log('\n=== Starting Test: Select Headers Dropdown Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Select Headers dropdown functionality' });

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Audit Logs page
    console.log('\n[STEP 2] Navigating to Audit Logs page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Audit Logs page' });
    const auditLogsPage = new AuditLogsPage(page);
    await auditLogsPage.navigateToAuditLogs();
    const isPageVisible = await auditLogsPage.isAuditLogsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ Audit Logs page is visible');

    // Step 3: Click on "Select Headers" button
    console.log('\n[STEP 3] Clicking on "Select Headers" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Select Headers button' });
    await auditLogsPage.clickSelectHeadersButton();
    await page.waitForTimeout(500);
    
    const isDropdownOpen = await auditLogsPage.isSelectHeadersDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Select Headers dropdown is open');

    // Step 4: Verify all available header options are listed
    console.log('\n[STEP 4] Verifying all header options are listed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify all header options are listed' });
    const expectedHeaders = ['Id', 'Date & Time', 'Name', 'Email', 'Task Type', 'URL Endpoint', 'API Response'];
    const allHeadersPresent = await auditLogsPage.verifyAllHeadersPresent(expectedHeaders);
    expect(allHeadersPresent).toBeTruthy();
    console.log(`✓ All ${expectedHeaders.length} expected headers are present`);

    // Step 5: Verify all header options are checked by default
    console.log('\n[STEP 5] Verifying all headers are checked by default...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify all headers checked by default' });
    const allChecked = await auditLogsPage.verifyAllHeadersCheckedByDefault();
    expect(allChecked).toBeTruthy();
    console.log('✓ All headers are checked by default');

    // Step 6: Verify all checked columns are visible in the table
    console.log('\n[STEP 6] Verifying all checked columns are visible in the table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify checked columns are visible' });
    const checkedColumnsVisible = await auditLogsPage.verifyCheckedColumnsVisible();
    expect(checkedColumnsVisible).toBeTruthy();
    console.log('✓ All checked columns are visible in the table');

    // Step 7: Uncheck all options one by one
    console.log('\n[STEP 7] Unchecking all header options one by one...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Uncheck all headers' });
    const headers = await auditLogsPage.getHeaderOptions();
    
    for (const header of headers) {
      console.log(`Unchecking "${header.name}"...`);
      await auditLogsPage.toggleHeaderOption(header.name, false);
      await page.waitForTimeout(300); // Wait for column to hide
      
      // Verify the column is NOT visible
      const isVisible = await auditLogsPage.isColumnVisible(header.name);
      expect(isVisible).toBeFalsy();
      console.log(`✓ Column "${header.name}" is hidden`);
    }
    
    // Verify all unchecked columns are not visible
    const uncheckedColumnsHidden = await auditLogsPage.verifyUncheckedColumnsNotVisible();
    expect(uncheckedColumnsHidden).toBeTruthy();
    console.log('✓ All unchecked columns are hidden');

    // Step 8: Check all options again
    console.log('\n[STEP 8] Checking all header options again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Check all headers again' });
    
    for (const header of headers) {
      console.log(`Checking "${header.name}"...`);
      await auditLogsPage.toggleHeaderOption(header.name, true);
      await page.waitForTimeout(300); // Wait for column to show
      
      // Verify the column is visible
      const isVisible = await auditLogsPage.isColumnVisible(header.name);
      expect(isVisible).toBeTruthy();
      console.log(`✓ Column "${header.name}" is visible`);
    }
    
    // Verify all checked columns are visible
    const allColumnsVisible = await auditLogsPage.verifyCheckedColumnsVisible();
    expect(allColumnsVisible).toBeTruthy();
    console.log('✓ All columns are visible again');

    // Step 9: Close the dropdown and ensure the state remains applied
    console.log('\n[STEP 9] Closing dropdown and verifying state remains...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Close dropdown and verify state' });
    await auditLogsPage.clickSelectHeadersButton();
    await page.waitForTimeout(500);
    
    const isDropdownClosed = !(await auditLogsPage.isSelectHeadersDropdownOpen());
    expect(isDropdownClosed).toBeTruthy();
    console.log('✓ Dropdown is closed');
    
    // Verify columns are still visible after closing dropdown
    const columnsStillVisible = await auditLogsPage.verifyCheckedColumnsVisible();
    expect(columnsStillVisible).toBeTruthy();
    console.log('✓ All columns remain visible after closing dropdown');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify pagination functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

   

    console.log('\n=== Starting Test: Pagination Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test pagination functionality' });

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Audit Logs page
    console.log('\n[STEP 2] Navigating to Audit Logs page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Audit Logs page' });
    const auditLogsPage = new AuditLogsPage(page);
    await auditLogsPage.navigateToAuditLogs();
    const isPageVisible = await auditLogsPage.isAuditLogsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ Audit Logs page is visible');

    // Step 3: Verify pagination text is visible
    console.log('\n[STEP 3] Verifying pagination text is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify pagination text is visible' });
    await page.waitForTimeout(2000); // Wait for page to load
    
    const paginationText = await auditLogsPage.getPaginationText();
    expect(paginationText).toBeTruthy();
    expect(paginationText.length).toBeGreaterThan(0);
    console.log(`✓ Pagination text is visible: "${paginationText}"`);

    // Step 4: Extract total number of records
    console.log('\n[STEP 4] Extracting total number of records...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Extract total records' });
    const totalRecords = await auditLogsPage.getTotalRecords();
    expect(totalRecords).toBeGreaterThan(0);
    console.log(`✓ Total records: ${totalRecords}`);

    // Step 5: Verify default page size is 20
    console.log('\n[STEP 5] Verifying default page size is 20...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify default page size' });
    const isDefaultPageSize = await auditLogsPage.verifyDefaultPageSize();
    expect(isDefaultPageSize).toBeTruthy();
    console.log('✓ Default page size is 20');

    // Step 6: Verify Next Page button is visible and clickable
    console.log('\n[STEP 6] Verifying Next Page button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Next Page button' });
    const nextButtonAvailable = await auditLogsPage.isNextPageButtonAvailable();
    expect(nextButtonAvailable).toBeTruthy();
    console.log('✓ Next Page button is visible and clickable');

    // Step 7: Click Next Page button
    console.log('\n[STEP 7] Clicking Next Page button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Click Next Page button' });
    await auditLogsPage.clickNextPage();
    await page.waitForTimeout(2000);
    console.log('✓ Next Page button clicked');

    // Step 8: Verify pagination text updates
    console.log('\n[STEP 8] Verifying pagination text updates...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify pagination text updates' });
    const pageSize = await auditLogsPage.getCurrentPageSize();
    const expectedStart = pageSize + 1; // e.g., 21 if page size is 20
    const expectedEnd = pageSize * 2; // e.g., 40 if page size is 20
    
    const rangeMatches = await auditLogsPage.verifyPaginationRange(expectedStart, expectedEnd, totalRecords);
    expect(rangeMatches).toBeTruthy();
    console.log(`✓ Pagination text updated to show: ${expectedStart} - ${expectedEnd} of ${totalRecords}`);

    // Step 9: Click Previous Page button
    console.log('\n[STEP 9] Clicking Previous Page button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Click Previous Page button' });
    await auditLogsPage.clickPreviousPage();
    await page.waitForTimeout(2000);
    console.log('✓ Previous Page button clicked');

    // Step 10: Verify pagination resets back to "1 - 20"
    console.log('\n[STEP 10] Verifying pagination resets to first page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify pagination resets' });
    const resetMatches = await auditLogsPage.verifyPaginationRange(1, pageSize, totalRecords);
    expect(resetMatches).toBeTruthy();
    console.log(`✓ Pagination reset to: 1 - ${pageSize} of ${totalRecords}`);

    // Step 11: Change page size to 50
    console.log('\n[STEP 11] Changing page size to 50...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Change page size to 50' });
    await auditLogsPage.changePageSize(50);
    const rows50 = await auditLogsPage.verifyRowsDisplayed(50);
    expect(rows50).toBeTruthy();
    console.log('✓ Page size changed to 50, 50 rows are displayed');

    // Step 12: Change page size to 100
    console.log('\n[STEP 12] Changing page size to 100...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Change page size to 100' });
    await auditLogsPage.changePageSize(100);
    const rows100 = await auditLogsPage.verifyRowsDisplayed(100);
    expect(rows100).toBeTruthy();
    console.log('✓ Page size changed to 100, 100 rows are displayed');

    // Step 13: Change page size to 200
    console.log('\n[STEP 13] Changing page size to 200...');
    testInfo.annotations.push({ type: 'step', description: 'Step 13: Change page size to 200' });
    await auditLogsPage.changePageSize(200);
    const rows200 = await auditLogsPage.verifyRowsDisplayed(200);
    expect(rows200).toBeTruthy();
    console.log('✓ Page size changed to 200, 200 rows are displayed');

    // Step 14: Change page size to 500
    console.log('\n[STEP 14] Changing page size to 500...');
    testInfo.annotations.push({ type: 'step', description: 'Step 14: Change page size to 500' });
    await auditLogsPage.changePageSize(500);
    const rows500 = await auditLogsPage.verifyRowsDisplayed(500);
    expect(rows500).toBeTruthy();
    console.log('✓ Page size changed to 500, 500 rows are displayed');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });
});

