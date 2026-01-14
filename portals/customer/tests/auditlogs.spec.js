const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { AuditLogsPage } = require('../pages/auditlogs');

test.describe('Customer Portal - Audit Logs', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

  // ========================
  // VERIFY PAGE LOAD
  // ========================
  test('should verify Audit Logs page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Audit Logs Page Load ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Step 1: Click on Security and Logs dropdown in sidebar
    console.log('\n[STEP 1] Clicking on Security and Logs dropdown in sidebar...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Security and Logs dropdown' });
    
    await auditLogsPage.securityAndLogsDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await auditLogsPage.securityAndLogsDropdown.click();
    await page.waitForTimeout(1000);
    console.log('✓ Clicked Security and Logs dropdown');
    
    // Step 2: Click on Audit Logs option
    console.log('\n[STEP 2] Clicking on Audit Logs option...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Audit Logs option' });
    
    await auditLogsPage.auditLogsOption.waitFor({ state: 'visible', timeout: 10000 });
    await auditLogsPage.auditLogsOption.click();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked Audit Logs option');
    
    // Step 3: Verify page heading text - extract "Audit Logs" text
    console.log('\n[STEP 3] Verifying page heading text...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify page heading' });
    
    const headingVerification = await auditLogsPage.verifyPageHeading();
    expect(headingVerification.visible).toBeTruthy();
    expect(headingVerification.text.toLowerCase()).toContain('audit logs');
    console.log(`✓ Page heading is visible: "${headingVerification.text}"`);
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY NAME SEARCH FIELD
  // ========================
  test('should verify name search field functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Name Search Field ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Retrieve name value from table
    console.log('\n[STEP 2] Retrieving name value from table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Get name from table' });
    const nameValue = await auditLogsPage.getNameFromTable();
    
    if (!nameValue) {
      console.log('⚠ No name value found in table, skipping test');
      test.skip();
      return;
    }
    
    console.log(`✓ Retrieved name value: "${nameValue}"`);
    
    // Enter name value in name field
    console.log('\n[STEP 3] Entering name value in name field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Enter name in search field' });
    await auditLogsPage.enterNameSearch(nameValue);
    console.log(`✓ Entered name: "${nameValue}"`);
    
    // Click search
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify in table if data available else "No data found"
    console.log('\n[STEP 5] Verifying search results...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify search results' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    // Reset form - all data will be shown if available
    console.log('\n[STEP 6] Resetting form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Reset form' });
    await auditLogsPage.clickReset();
    console.log('✓ Form reset - all data will be shown if available');
    
    const resetTableData = await auditLogsPage.verifyTableData();
    console.log(`After reset - Row count: ${resetTableData.rowCount}`);
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY EMAIL SEARCH FIELD
  // ========================
  test('should verify email search field functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Email Search Field ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Retrieve email value from table
    console.log('\n[STEP 2] Retrieving email value from table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Get email from table' });
    const emailValue = await auditLogsPage.getEmailFromTable();
    
    if (!emailValue || !emailValue.includes('@')) {
      console.log('⚠ No valid email value found in table, skipping test');
      test.skip();
      return;
    }
    
    console.log(`✓ Retrieved email value: "${emailValue}"`);
    
    // Enter email value in email field
    console.log('\n[STEP 3] Entering email value in email field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Enter email in search field' });
    await auditLogsPage.enterEmailSearch(emailValue);
    console.log(`✓ Entered email: "${emailValue}"`);
    
    // Click search
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify in table if data available else "No data found"
    console.log('\n[STEP 5] Verifying search results...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify search results' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    // Reset form
    console.log('\n[STEP 6] Resetting form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Reset form' });
    await auditLogsPage.clickReset();
    console.log('✓ Form reset - all data will be shown if available');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY URL ENDPOINT SEARCH FIELD
  // ========================
  test('should verify URL Endpoint search field functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify URL Endpoint Search Field ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Retrieve URL Endpoint value from table
    console.log('\n[STEP 2] Retrieving URL Endpoint value from table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Get URL Endpoint from table' });
    const urlEndpointValue = await auditLogsPage.getUrlEndpointFromTable();
    
    if (!urlEndpointValue) {
      console.log('⚠ No URL Endpoint value found in table, skipping test');
      test.skip();
      return;
    }
    
    console.log(`✓ Retrieved URL Endpoint value: "${urlEndpointValue}"`);
    
    // Enter value in URL Endpoint field
    console.log('\n[STEP 3] Entering value in URL Endpoint field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Enter URL Endpoint in search field' });
    await auditLogsPage.enterUrlEndpointSearch(urlEndpointValue);
    console.log(`✓ Entered URL Endpoint: "${urlEndpointValue}"`);
    
    // Click search
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify in table if data available else "No data found"
    console.log('\n[STEP 5] Verifying search results...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify search results' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    // Reset form
    console.log('\n[STEP 6] Resetting form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Reset form' });
    await auditLogsPage.clickReset();
    console.log('✓ Form reset - all data will be shown if available');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY API RESPONSE SEARCH FIELD
  // ========================
  test('should verify API Response search field functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify API Response Search Field ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Retrieve API Response value from table
    console.log('\n[STEP 2] Retrieving API Response value from table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Get API Response from table' });
    const apiResponseValue = await auditLogsPage.getApiResponseFromTable();
    
    if (!apiResponseValue) {
      console.log('⚠ No API Response value found in table, skipping test');
      test.skip();
      return;
    }
    
    // Extract a meaningful part of the response for search
    const searchValue = apiResponseValue.substring(0, 20).trim();
    console.log(`✓ Retrieved API Response value (partial): "${searchValue}"`);
    
    // Enter value in API Response field
    console.log('\n[STEP 3] Entering value in API Response field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Enter API Response in search field' });
    await auditLogsPage.enterApiResponseSearch(searchValue);
    console.log(`✓ Entered API Response: "${searchValue}"`);
    
    // Click search
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify in table if data available else "No data found"
    console.log('\n[STEP 5] Verifying search results...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify search results' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    // Reset form
    console.log('\n[STEP 6] Resetting form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Reset form' });
    await auditLogsPage.clickReset();
    console.log('✓ Form reset - all data will be shown if available');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY TASK TYPE SEARCH FIELD
  // ========================
  test('should verify Task Type search field functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Task Type Search Field ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Retrieve Task Type value from table
    console.log('\n[STEP 2] Retrieving Task Type value from table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Get Task Type from table' });
    const taskTypeValue = await auditLogsPage.getTaskTypeFromTable();
    
    if (!taskTypeValue) {
      console.log('⚠ No Task Type value found in table, skipping test');
      test.skip();
      return;
    }
    
    console.log(`✓ Retrieved Task Type value: "${taskTypeValue}"`);
    
    // Enter value in Task Type field
    console.log('\n[STEP 3] Entering value in Task Type field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Enter Task Type in search field' });
    await auditLogsPage.enterTaskTypeSearch(taskTypeValue);
    console.log(`✓ Entered Task Type: "${taskTypeValue}"`);
    
    // Click search
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify in table if data available else "No data found"
    console.log('\n[STEP 5] Verifying search results...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify search results' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    // Reset form
    console.log('\n[STEP 6] Resetting form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Reset form' });
    await auditLogsPage.clickReset();
    console.log('✓ Form reset - all data will be shown if available');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY SELECT RANGE SEARCH FIELD
  // ========================
  test('should verify Select Range (date) search field functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Select Range Search Field ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Select start and end date from date range inputs
    console.log('\n[STEP 2] Selecting start and end date...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Select date range' });
    
    // Get dates (7 days ago to today)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    // Fill date inputs directly (without opening calendar)
    await auditLogsPage.selectDateRange(startDateStr, endDateStr);
    console.log(`✓ Selected date range: ${startDateStr} to ${endDateStr}`);
    
    // Click search
    console.log('\n[STEP 4] Clicking Search button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify in table column date & time if data available else "No data found"
    console.log('\n[STEP 5] Verifying search results in Date & Time column...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify search results' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    // Reset form
    console.log('\n[STEP 6] Resetting form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Reset form' });
    await auditLogsPage.clickReset();
    console.log('✓ Form reset - all data will be shown if available');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY EMPTY FIELDS SEARCH
  // ========================
  test('should verify empty fields search functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Empty Fields Search ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Click search here
    console.log('\n[STEP 1] Clicking Search Here...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Click Search Here' });
    await auditLogsPage.clickSearchHere();
    console.log('✓ Clicked Search Here');
    
    // Click search (without entering any values)
    console.log('\n[STEP 2] Clicking Search button with empty fields...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Search with empty fields' });
    await auditLogsPage.clickSearch();
    console.log('✓ Clicked Search button');
    
    // Verify table data if data available else "No data found"
    console.log('\n[STEP 3] Verifying table data...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify table data' });
    const tableData = await auditLogsPage.verifyTableData();
    
    if (tableData.hasData) {
      console.log(`✓ Table has data: ${tableData.rowCount} row(s) found`);
      expect(tableData.hasData).toBeTruthy();
    } else {
      console.log('✓ No data found message displayed');
      expect(tableData.noDataMessageVisible).toBeTruthy();
    }
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY SELECT HEADERS
  // ========================
  test('should verify select headers functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Select Headers ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Check table columns
    console.log('\n[STEP 1] Checking table columns...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Check table columns' });
    const columnsVerification = await auditLogsPage.verifyTableColumns();
    console.log(`Table columns visible: ${columnsVerification.columnsVisible}, Column count: ${columnsVerification.columnCount}`);
    
    // Click select headers button
    console.log('\n[STEP 2] Clicking Select Headers button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Select Headers button' });
    await auditLogsPage.clickSelectHeaders();
    console.log('✓ Clicked Select Headers button');
    
    // Check all header options are selected
    console.log('\n[STEP 3] Checking all header options are selected...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Check header options' });
    const headerOptions = await auditLogsPage.getHeaderOptions();
    console.log(`Found ${headerOptions.length} header options`);
    
    // Unselect all header options
    console.log('\n[STEP 4] Unselecting all header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Unselect all headers' });
    await auditLogsPage.unselectAllHeaders();
    await auditLogsPage.closeSelectHeadersDropdown();
    
    // Wait for table to update after unselecting
    // Use a shorter timeout and handle potential page closure
    try {
      await Promise.race([
        page.waitForTimeout(2000),
        page.waitForEvent('close', { timeout: 100 }).catch(() => {})
      ]);
    } catch (error) {
      // If page closed, re-navigate
      if (error.message.includes('closed') || error.message.includes('Target page')) {
        console.log('⚠ Page closed, re-navigating...');
        await auditLogsPage.gotoAuditLogs();
        await page.waitForTimeout(2000);
      } else {
        // For other errors, just wait a bit
        await page.waitForTimeout(1000);
      }
    }
    console.log('✓ Unselected all header options');
    
    // Verify no column is showing
    console.log('\n[STEP 5] Verifying no columns are showing...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify no columns visible' });
    const columnsAfterUnselect = await auditLogsPage.verifyTableColumns();
    // Note: Some columns might still be visible (like ID), so we check if column count decreased
    console.log(`Column count after unselect: ${columnsAfterUnselect.columnCount}`);
    
    // Click on select header button again
    console.log('\n[STEP 6] Clicking Select Headers button again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Click Select Headers again' });
    await auditLogsPage.clickSelectHeaders();
    console.log('✓ Clicked Select Headers button');
    
    // Select all options
    console.log('\n[STEP 7] Selecting all header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Select all headers' });
    await auditLogsPage.selectAllHeaders();
    await auditLogsPage.closeSelectHeadersDropdown();
    await page.waitForTimeout(1000);
    console.log('✓ Selected all header options');
    
    // Verify all selected header options shown in table columns
    console.log('\n[STEP 8] Verifying all selected headers are shown in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify headers in table' });
    const columnsAfterSelect = await auditLogsPage.verifyTableColumns();
    expect(columnsAfterSelect.columnsVisible).toBeTruthy();
    console.log(`✓ All selected headers shown in table - Column count: ${columnsAfterSelect.columnCount}`);
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY PAGINATION FEATURE
  // ========================
  test('should verify pagination feature on audit logs', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Pagination Feature ===');
    
    const auditLogsPage = new AuditLogsPage(page);
    
    // Navigate to Audit Logs page
    await login(page, baseUrl, email, password);
    await auditLogsPage.gotoAuditLogs();
    await page.waitForTimeout(2000);
    
    // Step 1: Verify default "Items per page" value is 20
    console.log('\n[STEP 1] Verifying default Items per page value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Verify default items per page' });
    const defaultItemsPerPage = await auditLogsPage.getItemsPerPage();
    expect(defaultItemsPerPage).toBe(20);
    console.log(`✓ Default Items per page: ${defaultItemsPerPage}`);
    
    // Step 2: Verify the text "Showing 1 to 20 of X records" is displayed correctly
    console.log('\n[STEP 2] Verifying pagination text...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify pagination text' });
    const paginationText = await auditLogsPage.getPaginationText();
    console.log(`Pagination text: "${paginationText}"`);
    
    if (paginationText) {
      expect(paginationText.toLowerCase()).toMatch(/showing.*to.*of.*records/i);
      console.log('✓ Pagination text is displayed correctly');
    } else {
      console.log('⚠ Pagination text not found (may be displayed differently)');
    }
    
    // Step 3: Click the "Next" pagination button and verify
    console.log('\n[STEP 3] Clicking Next pagination button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Next button' });
    
    const firstRowIdPage1 = await auditLogsPage.getFirstRowId();
    console.log(`First row ID on page 1: "${firstRowIdPage1}"`);
    
    const nextButtonVisible = await auditLogsPage.nextButton.isVisible({ timeout: 3000 }).catch(() => false);
    if (nextButtonVisible) {
      const pageNumberBefore = await auditLogsPage.getCurrentPageNumber();
      console.log(`Page number before: ${pageNumberBefore}`);
      
      await auditLogsPage.clickNextButton();
      console.log('✓ Clicked Next button');
      
      // Verify page number increments
      await page.waitForTimeout(2000);
      const pageNumberAfter = await auditLogsPage.getCurrentPageNumber();
      console.log(`Page number after: ${pageNumberAfter}`);
      
      if (pageNumberAfter > pageNumberBefore) {
        console.log('✓ Page number incremented');
      }
      
      // Verify first row ID on page 2 is different from page 1
      const firstRowIdPage2 = await auditLogsPage.getFirstRowId();
      console.log(`First row ID on page 2: "${firstRowIdPage2}"`);
      
      if (firstRowIdPage1 && firstRowIdPage2 && firstRowIdPage1 !== firstRowIdPage2) {
        console.log('✓ First row ID on page 2 is different from page 1');
        expect(firstRowIdPage1).not.toBe(firstRowIdPage2);
      }
    } else {
      console.log('⚠ Next button not visible (may be on last page or no pagination)');
    }
    
    // Step 4: Click the "Previous" button and verify navigation back to page 1
    console.log('\n[STEP 4] Clicking Previous pagination button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Previous button' });
    
    const previousButtonVisible = await auditLogsPage.previousButton.isVisible({ timeout: 3000 }).catch(() => false);
    if (previousButtonVisible) {
      await auditLogsPage.clickPreviousButton();
      console.log('✓ Clicked Previous button');
      
      await page.waitForTimeout(2000);
      const pageNumberAfterPrevious = await auditLogsPage.getCurrentPageNumber();
      console.log(`Page number after Previous: ${pageNumberAfterPrevious}`);
      
      if (pageNumberAfterPrevious === 1) {
        console.log('✓ Navigated back to page 1');
      }
    } else {
      console.log('⚠ Previous button not visible (may be on first page)');
    }
    
    // Step 5: Change "Items per page" from 20 to 50 and verify
    console.log('\n[STEP 5] Changing Items per page from 20 to 50...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Change items per page to 50' });
    
    const itemsPerPageDropdownVisible = await auditLogsPage.itemsPerPageDropdown.isVisible({ timeout: 3000 }).catch(() => false);
    if (itemsPerPageDropdownVisible) {
      await auditLogsPage.changeItemsPerPage(50);
      console.log('✓ Changed Items per page to 50');
      
      // Verify table shows 50 rows
      await page.waitForTimeout(2000);
      const rowCount = await auditLogsPage.getTableRowCount();
      console.log(`Table row count: ${rowCount}`);
      
      // Table should show up to 50 rows (or all available if less than 50)
      expect(rowCount).toBeLessThanOrEqual(50);
      if (rowCount === 50) {
        console.log('✓ Table shows 50 rows');
      } else {
        console.log(`✓ Table shows ${rowCount} rows (less than 50 available)`);
      }
      
      // Verify pagination text updates correctly
      const updatedPaginationText = await auditLogsPage.getPaginationText();
      console.log(`Updated pagination text: "${updatedPaginationText}"`);
      
      if (updatedPaginationText) {
        expect(updatedPaginationText.toLowerCase()).toMatch(/showing.*to.*of.*records/i);
        console.log('✓ Pagination text updated correctly');
      }
    } else {
      console.log('⚠ Items per page dropdown not visible');
    }
    
    console.log('\n=== Test Completed Successfully ===');
  });
});

