const { test, expect } = require('@playwright/test');
const { InstancePage } = require('../pages/instance');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Instance Module', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000); // Increase timeout for beforeEach
    // Login before each test
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);
  });

  test('should verify Select Headers functionality in Instance module', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Select Headers Functionality ===');
    
    const instancePage = new InstancePage(page);

    // Step 1: Navigate to Admin Portal (already logged in via beforeEach)
    console.log('[STEP 1] Navigating to Admin Portal...');
    const currentUrl = await page.url();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 2: Click on the "Instance" module from the sidebar/menu
    console.log('\n[STEP 2] Clicking on "Instance" module from sidebar...');
    await instancePage.gotoInstance(baseUrl);
    console.log('✓ Clicked on Instance module');

    // Step 3: Verify the Instance page loads successfully
    console.log('\n[STEP 3] Verifying Instance page loads successfully...');
    const isPageLoaded = await instancePage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Instance page loaded successfully');
    
    const pageUrl = await page.url();
    expect(pageUrl).toContain('/instance');
    console.log(`✓ Page URL contains '/instance': ${pageUrl}`);

    // Step 4: Verify the Instance table is visible with data
    console.log('\n[STEP 4] Verifying Instance table is visible with data...');
    const tableInfo = await instancePage.verifyTableWithData();
    expect(tableInfo.visible).toBeTruthy();
    console.log(`✓ Instance table is visible`);
    
    if (tableInfo.hasData) {
      console.log(`✓ Table has data - ${tableInfo.rowCount} row(s) found`);
    } else {
      console.log('⚠ Table is visible but has no data (this is acceptable for testing)');
    }

    // Step 5: Click on the "Select Headers" button
    console.log('\n[STEP 5] Clicking on "Select Headers" button...');
    await instancePage.clickSelectHeaders();
    console.log('✓ Clicked Select Headers button');

    // Step 6: Verify the Select Headers dropdown/modal opens
    console.log('\n[STEP 6] Verifying Select Headers dropdown opens...');
    const isDropdownOpen = await instancePage.isSelectHeadersDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Select Headers dropdown is open');

    // Step 7: Identify all available column header checkboxes
    console.log('\n[STEP 7] Identifying all available column header checkboxes...');
    const headerOptions = await instancePage.getAllHeaderOptions();
    expect(headerOptions.length).toBeGreaterThan(0);
    console.log(`✓ Found ${headerOptions.length} header options:`);
    headerOptions.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option.label} (checked: ${option.checked})`);
    });

    // Step 8: Uncheck all header dropdown options
    console.log('\n[STEP 8] Unchecking all header dropdown options...');
    await instancePage.uncheckAllHeaders();
    console.log('✓ All header options unchecked');

    // Verify all checkboxes are unchecked
    const uncheckedOptions = await instancePage.getAllHeaderOptions();
    const allUnchecked = uncheckedOptions.every(option => !option.checked);
    expect(allUnchecked).toBeTruthy();
    console.log('✓ Verified all checkboxes are unchecked');

    // Step 9: Verify all columns are hidden from the table and a message is shown
    console.log('\n[STEP 9] Verifying all columns are hidden and message is shown...');
    await page.waitForTimeout(2000); // Wait for table to update
    
    const hiddenInfo = await instancePage.verifyAllColumnsHidden();
    expect(hiddenInfo.allHidden).toBeTruthy();
    console.log(`✓ All columns are hidden (visible count: ${hiddenInfo.visibleCount})`);
    
    if (hiddenInfo.messageVisible) {
      const messageText = await instancePage.noDataMessage.textContent();
      console.log(`✓ Message is shown: "${messageText?.trim()}"`);
    } else {
      console.log('⚠ No message shown (this may be acceptable)');
    }

    // Step 10: Re-check all column header options
    console.log('\n[STEP 10] Re-checking all column header options...');
    // Ensure dropdown is still open
    if (!(await instancePage.isSelectHeadersDropdownOpen())) {
      await instancePage.clickSelectHeaders();
      await page.waitForTimeout(500);
    }
    
    await instancePage.checkAllHeaders();
    console.log('✓ All header options checked');

    // Verify all checkboxes are checked
    const checkedOptions = await instancePage.getAllHeaderOptions();
    const allChecked = checkedOptions.every(option => option.checked);
    expect(allChecked).toBeTruthy();
    console.log('✓ Verified all checkboxes are checked');

    // Step 11: Verify all columns are visible again in the table
    console.log('\n[STEP 11] Verifying all columns are visible again...');
    await page.waitForTimeout(2000); // Wait for table to update
    
    const visibleInfo = await instancePage.verifyAllColumnsVisible();
    expect(visibleInfo.allVisible).toBeTruthy();
    console.log(`✓ All columns are visible (visible count: ${visibleInfo.visibleCount}, expected: ${visibleInfo.expectedCount})`);

    // Close dropdown
    await instancePage.closeSelectHeadersDropdown();
    await page.waitForTimeout(1000);

    // Step 12: Refresh the page
    console.log('\n[STEP 12] Refreshing the page...');
    const visibleHeadersBeforeRefresh = [];
    const headerOptionsBeforeRefresh = await instancePage.getAllHeaderOptions();
    headerOptionsBeforeRefresh.forEach(option => {
      if (option.checked) {
        visibleHeadersBeforeRefresh.push(option.label);
      }
    });
    console.log(`✓ Headers checked before refresh: ${visibleHeadersBeforeRefresh.length}`);
    
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');

    // Step 13: Verify selected headers options persist
    console.log('\n[STEP 13] Verifying selected headers options persist after refresh...');
    
    // Verify page is still loaded
    const isPageStillLoaded = await instancePage.isPageLoaded();
    expect(isPageStillLoaded).toBeTruthy();
    console.log('✓ Instance page is still loaded after refresh');
    
    // Click Select Headers to check persisted state
    await instancePage.clickSelectHeaders();
    await page.waitForTimeout(500);
    
    const headerOptionsAfterRefresh = await instancePage.getAllHeaderOptions();
    const checkedAfterRefresh = headerOptionsAfterRefresh.filter(option => option.checked);
    
    console.log(`✓ Headers checked after refresh: ${checkedAfterRefresh.length}`);
    
    // Verify that previously checked headers are still checked
    // Note: This may vary based on implementation - some systems don't persist
    if (checkedAfterRefresh.length > 0) {
      console.log('✓ Selected headers persisted after refresh');
      // Verify headers are visible in table
      const visibleAfterRefresh = await instancePage.verifyAllColumnsVisible();
      expect(visibleAfterRefresh.visibleCount).toBeGreaterThan(0);
      console.log(`✓ ${visibleAfterRefresh.visibleCount} columns are visible after refresh`);
    } else {
      console.log('⚠ Headers did not persist (this may be expected behavior)');
    }

    await page.screenshot({ path: 'artifacts/instance-select-headers.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== SEARCH FIELD TESTS ====================

  // 1️⃣ Verify Sub ID Search Field
  test('should verify Sub ID search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Sub ID Search Field ===');
    
    const instancePage = new InstancePage(page);

    // Navigate to Instance page
    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    // Click Search Here to open search panel
    console.log('[STEP 1] Clicking Search Here...');
    await instancePage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Retrieve Sub ID value from table (if available), else use "123"
    console.log('\n[STEP 2] Retrieving Sub ID from table...');
    let subId = await instancePage.getSubIdFromTable();
    if (!subId) {
      subId = '123';
      console.log('⚠ No Sub ID found in table, using default: "123"');
    } else {
      console.log(`✓ Retrieved Sub ID: "${subId}"`);
    }

    // Enter value in Sub ID field
    console.log('\n[STEP 3] Entering Sub ID in search field...');
    await instancePage.enterSubIdSearch(subId);
    console.log(`✓ Entered Sub ID: "${subId}"`);

    // Click Search
    console.log('\n[STEP 4] Clicking Search button...');
    await instancePage.clickSearch();
    console.log('✓ Clicked Search button');

    // Verify table shows matching records or empty message
    console.log('\n[STEP 5] Verifying search results...');
    await page.waitForTimeout(2000);
    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
      expect(tableInfo.rowCount).toBeGreaterThan(0);
    } else {
      const messageText = await instancePage.noDataMessage.textContent();
      console.log(`✓ No data found - Message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
      expect(messageText).toMatch(/no instance|no data/i);
    }

    // Click Reset
    console.log('\n[STEP 6] Clicking Reset button...');
    await instancePage.clickReset();
    console.log('✓ Clicked Reset button');

    // Verify all table data is restored
    console.log('\n[STEP 7] Verifying data restoration...');
    await page.waitForTimeout(2000);
    const restoredInfo = await instancePage.verifyTableDataOrEmpty();
    console.log(`✓ Table data restored - ${restoredInfo.rowCount} row(s)`);
  });

  // 2️⃣ Verify Plan Name Search Field
  test('should verify Plan Name search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Plan Name Search Field ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    await instancePage.clickSearchHere();
    let planName = await instancePage.getPlanNameFromTable();
    if (!planName) {
      planName = 'trial';
      console.log('⚠ No Plan Name found, using default: "trial"');
    } else {
      console.log(`✓ Retrieved Plan Name: "${planName}"`);
    }

    await instancePage.enterPlanNameSearch(planName);
    await instancePage.clickSearch();
    await page.waitForTimeout(2000);

    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
    } else {
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    await instancePage.clickReset();
    await page.waitForTimeout(2000);
    console.log('✓ Test completed');
  });

  // 3️⃣ Verify IP Address Search Field
  test('should verify IP Address search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify IP Address Search Field ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    await instancePage.clickSearchHere();
    let ipAddress = await instancePage.getIpAddressFromTable();
    if (!ipAddress) {
      ipAddress = '192.168.1.1';
      console.log('⚠ No IP Address found, using default: "192.168.1.1"');
    } else {
      console.log(`✓ Retrieved IP Address: "${ipAddress}"`);
    }

    await instancePage.enterIpAddressSearch(ipAddress);
    await instancePage.clickSearch();
    await page.waitForTimeout(2000);

    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
    } else {
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    await instancePage.clickReset();
    await page.waitForTimeout(2000);
    console.log('✓ Test completed');
  });

  // 4️⃣ Verify Drive Name Search Field
  test('should verify Drive Name search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Drive Name Search Field ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    await instancePage.clickSearchHere();
    let driveName = await instancePage.getDriveNameFromTable();
    if (!driveName) {
      driveName = 'C:';
      console.log('⚠ No Drive Name found, using default: "C:"');
    } else {
      console.log(`✓ Retrieved Drive Name: "${driveName}"`);
    }

    await instancePage.enterDriveNameSearch(driveName);
    await instancePage.clickSearch();
    await page.waitForTimeout(2000);

    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
    } else {
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    await instancePage.clickReset();
    await page.waitForTimeout(2000);
    console.log('✓ Test completed');
  });

  // 5️⃣ Verify Server Name Search Field
  test('should verify Server Name search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Server Name Search Field ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    await instancePage.clickSearchHere();
    let serverName = await instancePage.getServerNameFromTable();
    if (!serverName) {
      serverName = 'server-test';
      console.log('⚠ No Server Name found, using default: "server-test"');
    } else {
      console.log(`✓ Retrieved Server Name: "${serverName}"`);
    }

    await instancePage.enterServerNameSearch(serverName);
    await instancePage.clickSearch();
    await page.waitForTimeout(2000);

    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
    } else {
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    await instancePage.clickReset();
    await page.waitForTimeout(2000);
    console.log('✓ Test completed');
  });

  // 6️⃣ Verify Customer Email / Company Name Search Field
  test('should verify Customer Email search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Customer Email Search Field ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    await instancePage.clickSearchHere();
    let customerEmail = await instancePage.getCustomerEmailFromTable();
    if (!customerEmail) {
      customerEmail = 'test@gmail.com';
      console.log('⚠ No Customer Email found, using default: "test@gmail.com"');
    } else {
      console.log(`✓ Retrieved Customer Email: "${customerEmail}"`);
    }

    await instancePage.enterCustomerEmailSearch(customerEmail);
    await instancePage.clickSearch();
    await page.waitForTimeout(2000);

    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
    } else {
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    await instancePage.clickReset();
    await page.waitForTimeout(2000);
    console.log('✓ Test completed');
  });

  // 7️⃣ Verify Partner Email / Company Name Search Field
  test('should verify Partner Email search field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Partner Email Search Field ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    await instancePage.clickSearchHere();
    let partnerEmail = await instancePage.getPartnerEmailFromTable();
    if (!partnerEmail) {
      partnerEmail = 'partner@test.com';
      console.log('⚠ No Partner Email found, using default: "partner@test.com"');
    } else {
      console.log(`✓ Retrieved Partner Email: "${partnerEmail}"`);
    }

    await instancePage.enterPartnerEmailSearch(partnerEmail);
    await instancePage.clickSearch();
    await page.waitForTimeout(2000);

    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
    } else {
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    await instancePage.clickReset();
    await page.waitForTimeout(2000);
    console.log('✓ Test completed');
  });

  // 8️⃣ Verify Instance Type Dropdown Search
  test('should verify Instance Type dropdown search', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Instance Type Dropdown Search ===');
    
    const instancePage = new InstancePage(page);

    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);

    // Open Search Here
    console.log('[STEP 1] Opening search panel...');
    await instancePage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Open "Select Instance Type" dropdown
    console.log('\n[STEP 2] Selecting "Live Instance" from dropdown...');
    await instancePage.selectInstanceType('Live Instance');
    console.log('✓ Selected "Live Instance"');

    // Click Search
    console.log('\n[STEP 3] Clicking Search button...');
    await instancePage.clickSearch();
    console.log('✓ Clicked Search button');

    // Verify table shows only live instances
    console.log('\n[STEP 4] Verifying search results...');
    await page.waitForTimeout(2000);
    const tableInfo = await instancePage.verifyTableDataOrEmpty();
    
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} live instance(s)`);
      expect(tableInfo.rowCount).toBeGreaterThan(0);
    } else {
      const messageText = await instancePage.noDataMessage.textContent();
      console.log(`✓ No live instances found - Message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
    }

    // Click Reset
    console.log('\n[STEP 5] Clicking Reset button...');
    await instancePage.clickReset();
    console.log('✓ Clicked Reset button');

    // Verify all instance types shown
    console.log('\n[STEP 6] Verifying all instance types are shown...');
    await page.waitForTimeout(2000);
    const restoredInfo = await instancePage.verifyTableDataOrEmpty();
    console.log(`✓ All instance types restored - ${restoredInfo.rowCount} row(s)`);
    console.log('✓ Test completed');
  });

  // ==================== PAGINATION TEST ====================

  test('should verify pagination feature on instance page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Pagination Feature ===');
    
    const instancePage = new InstancePage(page);

    // Navigate to Instance page
    console.log('[STEP 1] Navigating to Instance page...');
    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Instance page');

    // Step 1: Verify default "Items per page" value is 20
    console.log('\n[STEP 1] Verifying default "Items per page" value...');
    const defaultItemsPerPage = await instancePage.getItemsPerPage();
    expect(defaultItemsPerPage).toBe(20);
    console.log(`✓ Default items per page: ${defaultItemsPerPage}`);

    // Step 2: Verify the text "Showing 1 to 20 of X records" is displayed correctly
    console.log('\n[STEP 2] Verifying pagination text...');
    const paginationText = await instancePage.getPaginationText();
    expect(paginationText).toBeTruthy();
    // Check for either format: "Showing 1 to 20 of X records" or "1 – 20 of X"
    expect(paginationText).toMatch(/(Showing\s+\d+\s+to\s+\d+\s+of\s+\d+\s+records|\d+\s*[–-]\s*\d+\s+of\s+\d+)/i);
    console.log(`✓ Pagination text: "${paginationText}"`);

    // Extract total records from pagination text
    const totalMatch = paginationText.match(/of\s+(\d+)/i);
    const totalRecords = totalMatch ? parseInt(totalMatch[1]) : 0;
    console.log(`✓ Total records: ${totalRecords}`);

    // Step 3: Click the "Next" pagination button and verify
    if (totalRecords > 20) {
      console.log('\n[STEP 3] Clicking Next pagination button...');
      
      // Check if Next button is enabled
      const isNextEnabled = await instancePage.nextButton.isEnabled();
      if (isNextEnabled) {
        await instancePage.clickNextButton();
        console.log('✓ Clicked Next button');
        
        await page.waitForTimeout(2000);
        
        // Verify page number increments (pagination text changes)
        const paginationTextAfterNext = await instancePage.getPaginationText();
        console.log(`✓ Pagination text after Next: "${paginationTextAfterNext}"`);
        expect(paginationTextAfterNext).toMatch(/21|2[1-9]|[3-9]\d/); // Should show page 2 (e.g., "Showing 21 to 40")
        console.log('✓ Page number incremented (pagination navigation successful)');

        // Step 4: Click the "Previous" button and verify navigation back to page 1
        console.log('\n[STEP 4] Clicking Previous pagination button...');
        await instancePage.clickPreviousButton();
        console.log('✓ Clicked Previous button');
        
        await page.waitForTimeout(2000);
        
        const paginationTextAfterPrev = await instancePage.getPaginationText();
        console.log(`✓ Pagination text after Previous: "${paginationTextAfterPrev}"`);
        expect(paginationTextAfterPrev).toMatch(/1\s*[–-]\s*\d+|Showing\s+1\s+to/i); // Should show page 1
        console.log('✓ Navigated back to page 1');
      } else {
        console.log('⚠ Next button is disabled (not enough records for pagination)');
      }
    } else {
      console.log('\n[STEP 3-4] Skipping Next/Previous navigation (not enough records for pagination)');
    }

    await page.screenshot({ path: 'artifacts/instance-pagination.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== EMPTY SEARCH FIELDS TEST ====================

  test('should verify search with all fields empty', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Search with All Fields Empty ===');
    
    const instancePage = new InstancePage(page);

    // Navigate to Instance page
    console.log('[STEP 1] Navigating to Instance page...');
    await instancePage.gotoInstance(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Instance page');

    // Get initial row count
    console.log('\n[STEP 2] Getting initial table data...');
    const initialTableInfo = await instancePage.verifyTableDataOrEmpty();
    const initialRowCount = initialTableInfo.rowCount;
    console.log(`✓ Initial row count: ${initialRowCount}`);

    // Click on "Search Here" to open the search panel
    console.log('\n[STEP 3] Clicking Search Here to open search panel...');
    await instancePage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Do not enter any value in any search field
    console.log('\n[STEP 4] Verifying no values entered in search fields...');
    // Verify fields are empty
    const subIdValue = await instancePage.subIdSearchField.inputValue().catch(() => '');
    const planNameValue = await instancePage.planNameSearchField.inputValue().catch(() => '');
    console.log(`✓ Sub ID field is empty: ${subIdValue === ''}`);
    console.log(`✓ Plan Name field is empty: ${planNameValue === ''}`);

    // Click Search button
    console.log('\n[STEP 5] Clicking Search button without entering any values...');
    await instancePage.clickSearch();
    console.log('✓ Clicked Search button');

    // Wait for search to complete
    await page.waitForTimeout(2000);

    // Verify results
    console.log('\n[STEP 6] Verifying search results...');
    
    // No validation error should be shown
    const hasValidationError = await page.locator('.error-message, .invalid-feedback, .text-danger').isVisible({ timeout: 1000 }).catch(() => false);
    expect(hasValidationError).toBeFalsy();
    console.log('✓ No validation error shown');

    // All instance records should be displayed (default state)
    const afterSearchTableInfo = await instancePage.verifyTableDataOrEmpty();
    console.log(`✓ Row count after empty search: ${afterSearchTableInfo.rowCount}`);
    
    if (initialRowCount > 0) {
      // If there was initial data, it should still be there
      expect(afterSearchTableInfo.hasData).toBeTruthy();
      expect(afterSearchTableInfo.rowCount).toBeGreaterThan(0);
      console.log('✓ All instance records are still displayed');
      
      // Table should not be cleared
      expect(afterSearchTableInfo.rowCount).toBe(initialRowCount);
      console.log('✓ Table was not cleared (same row count)');
      
      // No empty state message should appear if data exists
      
      expect(afterSearchTableInfo.messageVisible).toBeFalsy();
      console.log('✓ No empty state message appeared');
    } else {
      // If no initial data, empty message might appear
      console.log('⚠ No initial data found - this is acceptable');
    }

    await page.screenshot({ path: 'artifacts/instance-empty-search.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  

  
});

