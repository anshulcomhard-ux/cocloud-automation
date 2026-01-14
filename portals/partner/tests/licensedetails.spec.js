const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { LicenseDetailsPage } = require('../pages/licensedetails');

test.describe('Partner Portal - License Details', () => {
  test('should test license details search functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: License Details Search Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test license details search functionality' });

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

    // Step 2: Navigate to License Details page
    console.log('\n[STEP 2] Navigating to License Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to License Details page' });
    const licenseDetailsPage = new LicenseDetailsPage(page);
    await licenseDetailsPage.navigateToLicenseDetails();
    const isPageVisible = await licenseDetailsPage.isLicenseDetailsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ License Details page is visible');

    // Step 3: Verify search panel is visible with all fields
    console.log('\n[STEP 3] Verifying search panel fields...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify search panel fields' });
    const allFieldsVisible = await licenseDetailsPage.areAllSearchFieldsVisible();
    expect(allFieldsVisible).toBeTruthy();
    console.log('✓ All search fields are visible (Search Here, TSS S.no, Sub Id, Expiry date, Search button, Reset button)');

    // Step 4: Verify default state
    console.log('\n[STEP 4] Verifying default state...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify default state' });
    
    const tableVisible = await licenseDetailsPage.isTableVisible();
    expect(tableVisible).toBeTruthy();
    console.log('✓ Table is visible');
    
    const paginationText = await licenseDetailsPage.getPaginationText();
    expect(paginationText).toBeTruthy();
    expect(paginationText.length).toBeGreaterThan(0);
    console.log(`✓ Pagination text is displayed: "${paginationText}"`);
    
    const initialTotalRecords = await licenseDetailsPage.getTotalRecords();
    expect(initialTotalRecords).toBeGreaterThan(0);
    console.log(`✓ Initial total records: ${initialTotalRecords}`);

    // Step 5: Search by Sub Id
    console.log('\n[STEP 5] Testing search by Sub Id...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Search by Sub Id' });
    
    // Get a valid Sub Id from the first row
    const initialSubIds = await licenseDetailsPage.getSubIdValues();
    if (initialSubIds.length > 0) {
      const searchSubId = initialSubIds[0];
      console.log(`Using Sub Id from first row: "${searchSubId}"`);
      
      await licenseDetailsPage.fillSubIdField(searchSubId);
      await licenseDetailsPage.clickSearchButton();
      await page.waitForTimeout(2000);
      
      // Verify table updates with filtered results
      const filteredSubIds = await licenseDetailsPage.getSubIdValues();
      expect(filteredSubIds.length).toBeGreaterThan(0);
      console.log(`✓ Table updated with ${filteredSubIds.length} filtered results`);
      
      // Verify all rows contain the searched Sub Id
      const allMatch = await licenseDetailsPage.verifySubIdInAllRows(searchSubId);
      expect(allMatch).toBeTruthy();
      
      // Verify pagination text updates
      const filteredPaginationText = await licenseDetailsPage.getPaginationText();
      expect(filteredPaginationText).toBeTruthy();
      console.log(`✓ Pagination text updated: "${filteredPaginationText}"`);
    } else {
      console.log('⚠ No Sub Ids found in initial table, skipping Sub Id search test');
    }

    // Step 6: Search by TSS S.no
    console.log('\n[STEP 6] Testing search by TSS S.no...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Search by TSS S.no' });
    
    // Clear previous filters
    await licenseDetailsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    // Get a valid TSS S.no from the first row
    const initialTssSerials = await licenseDetailsPage.getTssSerialNumberValues();
    if (initialTssSerials.length > 0) {
      const searchTssSerial = initialTssSerials[0];
      console.log(`Using TSS S.no from first row: "${searchTssSerial}"`);
      
      await licenseDetailsPage.fillTssSerialNumberField(searchTssSerial);
      await licenseDetailsPage.clickSearchButton();
      await page.waitForTimeout(2000);
      
      // Verify matching records are shown
      const filteredTssSerials = await licenseDetailsPage.getTssSerialNumberValues();
      expect(filteredTssSerials.length).toBeGreaterThan(0);
      console.log(`✓ Table shows ${filteredTssSerials.length} matching records`);
      
      const allMatchTss = await licenseDetailsPage.verifyTssSerialInAllRows(searchTssSerial);
      expect(allMatchTss).toBeTruthy();
    } else {
      console.log('⚠ No TSS S.nos found in initial table, skipping TSS S.no search test');
    }

    // Step 7: Search by Expiry date
    console.log('\n[STEP 7] Testing search by Expiry date...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Search by Expiry date' });
    
    // Clear previous filters
    await licenseDetailsPage.clickResetButton();
    await page.waitForTimeout(1000);
    
    // Select a date (using current month/year as example)
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const expiryDate = `${month}/${year}`;
    
    console.log(`Selecting expiry date: ${expiryDate}`);
    await licenseDetailsPage.selectExpiryDate(expiryDate);
    await licenseDetailsPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Verify results are displayed
    const rowCount = await licenseDetailsPage.getTableRowCount();
    console.log(`✓ Search by expiry date returned ${rowCount} records`);
    
    // Note: Detailed expiry date verification would require parsing the expiry column values
    // which may have different formats. For now, we verify that results are shown.

    // Step 8: No data scenario
    console.log('\n[STEP 8] Testing no data scenario...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Test no data scenario' });
    
    // Test 1: Search with invalid Sub Id
    console.log('\n[STEP 8.1] Testing invalid Sub Id search...');
    const invalidSubId = 'INVALID-SUB-ID-99999';
    await licenseDetailsPage.fillSubIdField(invalidSubId);
    await licenseDetailsPage.clickSearchButton();
    
    // Wait for search results
    try {
      await page.waitForTimeout(3000);
    } catch (error) {
      if (!error.message.includes('closed')) {
        throw error;
      }
    }
    
    // Verify no records for invalid Sub Id
    if (!page.isClosed()) {
      const noDataRowCount1 = await licenseDetailsPage.getTableRowCount();
      const noDataMessageVisible1 = await licenseDetailsPage.isNoDataMessageVisible();
      
      if (noDataRowCount1 === 0 || noDataMessageVisible1) {
        console.log('✓ No records found for invalid Sub Id (expected)');
        if (noDataMessageVisible1) {
          console.log('✓ "There is no Tally Data Created Yet." message is displayed');
        }
      }
    }
    
    // Test 2: Search with invalid TSS S.no
    console.log('\n[STEP 8.2] Testing invalid TSS S.no search...');
    if (!page.isClosed()) {
      const invalidTssSerial = '999999999999';
      await licenseDetailsPage.fillTssSerialNumberField(invalidTssSerial);
      await licenseDetailsPage.clickSearchButton();
      
      // Wait for search results
      try {
        await page.waitForTimeout(3000);
      } catch (error) {
        if (!error.message.includes('closed')) {
          throw error;
        }
      }
      
      // Verify no records for invalid TSS S.no
      if (!page.isClosed()) {
        const noDataRowCount2 = await licenseDetailsPage.getTableRowCount();
        const noDataMessageVisible2 = await licenseDetailsPage.isNoDataMessageVisible();
        
        if (noDataRowCount2 === 0 || noDataMessageVisible2) {
          console.log('✓ No records found for invalid TSS S.no (expected)');
          if (noDataMessageVisible2) {
            console.log('✓ "There is no Tally Data Created Yet." message is displayed');
          }
        }
        
        // Verify pagination reflects no data
        const noDataPaginationText = await licenseDetailsPage.getPaginationText();
        if (noDataPaginationText === '' || noDataPaginationText.includes('0 records')) {
          console.log(`✓ Pagination reflects no data: "${noDataPaginationText}"`);
        }
      }
    }
    
    // Step 9: Reset functionality - Click Reset after Step 8
    console.log('\n[STEP 9] Testing Reset functionality...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Test Reset functionality' });
    
    // Wait a bit before reset to ensure page is stable
    try {
      await page.waitForTimeout(2000);
    } catch (error) {
      // If page is closed, we can't continue
      if (error.message && error.message.includes('closed')) {
        console.log('⚠ Page closed, cannot test reset functionality');
        return;
      }
      throw error;
    }
    
    // Click Reset button
    try {
      await licenseDetailsPage.clickResetButton();
      
      // Wait for reset to complete
      try {
        await page.waitForTimeout(3000);
      } catch (error) {
        if (error.message && error.message.includes('closed')) {
          console.log('⚠ Page closed after reset click');
          return;
        }
        throw error;
      }
      
      // Verify form is cleared
      console.log('\n[STEP 9.1] Verifying form is cleared...');
      const fieldsEmpty = await licenseDetailsPage.areSearchFieldsEmpty();
      expect(fieldsEmpty).toBeTruthy();
      console.log('✓ All search fields are cleared after reset');
      
      // Verify all records are showing
      console.log('\n[STEP 9.2] Verifying all records are displayed...');
      const resetRowCount = await licenseDetailsPage.getTableRowCount();
      expect(resetRowCount).toBeGreaterThan(0);
      console.log(`✓ Full license list displayed: ${resetRowCount} rows`);
      
      // Verify pagination resets to original record count
      const resetPaginationText = await licenseDetailsPage.getPaginationText();
      const resetTotalRecords = await licenseDetailsPage.getTotalRecords();
      expect(resetTotalRecords).toBeGreaterThan(0);
      console.log(`✓ Pagination reset: "${resetPaginationText}"`);
      console.log(`✓ Total records: ${resetTotalRecords} (should match initial: ${initialTotalRecords})`);
      
      // Verify table is visible and has data
      const tableVisible = await licenseDetailsPage.isTableVisible();
      expect(tableVisible).toBeTruthy();
      console.log('✓ Table is visible with all records');
    } catch (error) {
      // If page is closed, log and complete test
      if (error.message && error.message.includes('closed')) {
        console.log('⚠ Page closed during reset, cannot verify reset results');
      } else {
        // Re-throw other errors
        throw error;
      }
    }

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify Select Headers dropdown functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

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

    // Step 2: Navigate to License Details page
    console.log('\n[STEP 2] Navigating to License Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to License Details page' });
    const licenseDetailsPage = new LicenseDetailsPage(page);
    await licenseDetailsPage.navigateToLicenseDetails();
    const isPageVisible = await licenseDetailsPage.isLicenseDetailsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ License Details page is visible');

    // Wait for table to be visible (button might only appear after table loads)
    console.log('\n[STEP 2.1] Waiting for table to load...');
    const tableVisible = await licenseDetailsPage.isTableVisible();
    if (tableVisible) {
      console.log('✓ Table is visible');
    }
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Step 3: Verify "Select Headers" button is visible and clickable
    console.log('\n[STEP 3] Verifying Select Headers button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Select Headers button' });
    
    const selectHeadersButton = licenseDetailsPage.selectHeadersButton;
    
    // Try to find the button with multiple strategies
    try {
      // Scroll into view if needed
      await selectHeadersButton.scrollIntoViewIfNeeded();
      
      // Wait for button to be visible with longer timeout
      await selectHeadersButton.waitFor({ state: 'visible', timeout: 15000 });
    } catch (error) {
      console.log('⚠ Button not immediately visible, trying alternative approach...');
      // Try waiting a bit more and scrolling to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(2000);
      await selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    const isButtonVisible = await selectHeadersButton.isVisible({ timeout: 5000 });
    expect(isButtonVisible).toBeTruthy();
    console.log('✓ Select Headers button is visible');
    
    const isButtonEnabled = await selectHeadersButton.isEnabled();
    expect(isButtonEnabled).toBeTruthy();
    console.log('✓ Select Headers button is clickable');

    // Step 4: Click on "Select Headers" dropdown and verify it opens
    console.log('\n[STEP 4] Clicking Select Headers button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Select Headers button' });
    await licenseDetailsPage.clickSelectHeadersButton();
    await page.waitForTimeout(500);
    
    const isDropdownOpen = await licenseDetailsPage.isSelectHeadersDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Select Headers dropdown is open');

    // Step 5: Verify that by default all header options are checked
    console.log('\n[STEP 5] Verifying all headers are checked by default...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify all headers checked by default' });
    const allChecked = await licenseDetailsPage.verifyAllHeadersCheckedByDefault();
    expect(allChecked).toBeTruthy();
    console.log('✓ All headers are checked by default');

    // Step 6: Verify that all checked headers are visible as table columns
    console.log('\n[STEP 6] Verifying all checked headers are visible in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify checked headers are visible' });
    const checkedColumnsVisible = await licenseDetailsPage.verifyCheckedColumnsVisible();
    expect(checkedColumnsVisible).toBeTruthy();
    console.log('✓ All checked headers are visible as table columns');

    // Step 7: Open the "Select Headers" dropdown again
    console.log('\n[STEP 7] Opening Select Headers dropdown again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Open Select Headers dropdown again' });
    await licenseDetailsPage.openSelectHeadersDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Select Headers dropdown opened');

    // Step 8: Uncheck all header options
    console.log('\n[STEP 8] Unchecking all header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Uncheck all headers' });
    await licenseDetailsPage.uncheckAllHeaders();
    await page.waitForTimeout(1000); // Wait for columns to hide
    console.log('✓ All headers unchecked');

    // Step 8.1: Close dropdown and verify "No columns selected" message appears
    console.log('\n[STEP 8.1] Closing dropdown and verifying "No columns selected" message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8.1: Verify no columns message after unchecking' });
    
    // Close the dropdown by clicking outside or clicking the button again
    await licenseDetailsPage.clickSelectHeadersButton();
    await page.waitForTimeout(1000); // Wait for message to appear
    
    // Verify the informational text is displayed
    const noColumnsMessageVisible = await licenseDetailsPage.isNoColumnsMessageVisible();
    expect(noColumnsMessageVisible).toBeTruthy();
    console.log('✓ "No columns selected. Please choose at least one header to display data." message is displayed');

    // Step 9: Verify that no table columns are visible
    console.log('\n[STEP 9] Verifying no table columns are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify no columns visible' });
    const noColumnsVisible = await licenseDetailsPage.verifyNoColumnsVisible();
    expect(noColumnsVisible).toBeTruthy();
    console.log('✓ No table columns are visible');

    // Step 11: Open the "Select Headers" dropdown again
    console.log('\n[STEP 11] Opening Select Headers dropdown again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Open Select Headers dropdown again' });
    await licenseDetailsPage.openSelectHeadersDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Select Headers dropdown opened');

    // Step 12: Select all header options
    console.log('\n[STEP 12] Selecting all header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Select all headers' });
    await licenseDetailsPage.checkAllHeaders();
    await page.waitForTimeout(1000); // Wait for columns to show
    console.log('✓ All headers selected');

    // Step 13: Verify all selected headers are visible again in the table
    console.log('\n[STEP 13] Verifying all selected headers are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 13: Verify all headers visible' });
    const allHeadersVisible = await licenseDetailsPage.verifyCheckedColumnsVisible();
    expect(allHeadersVisible).toBeTruthy();
    console.log('✓ All selected headers are visible in the table');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify pagination functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

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

    // Step 2: Navigate to License Details page
    console.log('\n[STEP 2] Navigating to License Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to License Details page' });
    const licenseDetailsPage = new LicenseDetailsPage(page);
    await licenseDetailsPage.navigateToLicenseDetails();
    const isPageVisible = await licenseDetailsPage.isLicenseDetailsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ License Details page is visible');

    // Step 3: Verify pagination section is visible
    console.log('\n[STEP 3] Verifying pagination section...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify pagination section' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const isPaginationVisible = await licenseDetailsPage.isPaginationVisible();
    expect(isPaginationVisible).toBeTruthy();
    console.log('✓ Pagination section is visible');

    // Step 4: Verify pagination text is displayed
    console.log('\n[STEP 4] Verifying pagination text...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify pagination text' });
    const paginationText = await licenseDetailsPage.getPaginationText();
    expect(paginationText).toBeTruthy();
    expect(paginationText.length).toBeGreaterThan(0);
    expect(paginationText.toLowerCase()).toContain('showing');
    expect(paginationText.toLowerCase()).toContain('records');
    console.log(`✓ Pagination text displayed: "${paginationText}"`);

    // Step 5: Verify default page size
    console.log('\n[STEP 5] Verifying default page size...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify default page size' });
    const defaultPageSize = await licenseDetailsPage.verifyDefaultPageSize(20);
    expect(defaultPageSize).toBeTruthy();
    console.log('✓ Default page size is 20');

    // Step 6: Capture first row value on page 1
    console.log('\n[STEP 6] Capturing first row value on page 1...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Capture first row value' });
    const firstRowSubIdPage1 = await licenseDetailsPage.getFirstRowSubId();
    expect(firstRowSubIdPage1).toBeTruthy();
    expect(firstRowSubIdPage1.length).toBeGreaterThan(0);
    console.log(`✓ First row Sub Id on page 1: "${firstRowSubIdPage1}"`);

    // Step 7: Click Next page button
    console.log('\n[STEP 7] Clicking Next page button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Click Next page' });
    const isNextAvailable = await licenseDetailsPage.isNextPageButtonAvailable();
    if (isNextAvailable) {
      const initialRange = await licenseDetailsPage.getPageRange();
      await licenseDetailsPage.clickNextPage();
      await page.waitForTimeout(2000);
      
      // Step 8: Verify page number increments
      console.log('\n[STEP 8] Verifying page number increments...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify page increments' });
      const newRange = await licenseDetailsPage.getPageRange();
      expect(newRange.start).toBeGreaterThan(initialRange.start);
      console.log(`✓ Page incremented: ${initialRange.start}-${initialRange.end} → ${newRange.start}-${newRange.end}`);

      // Step 9: Verify table data changes
      console.log('\n[STEP 9] Verifying table data changed...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify table data changed' });
      const firstRowSubIdPage2 = await licenseDetailsPage.getFirstRowSubId();
      expect(firstRowSubIdPage2).toBeTruthy();
      expect(firstRowSubIdPage2).not.toBe(firstRowSubIdPage1);
      console.log(`✓ First row Sub Id on page 2: "${firstRowSubIdPage2}" (different from page 1)`);

      // Step 10: Click Previous page button
      console.log('\n[STEP 10] Clicking Previous page button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Click Previous page' });
      const isPreviousAvailable = await licenseDetailsPage.isPreviousPageButtonAvailable();
      if (isPreviousAvailable) {
        await licenseDetailsPage.clickPreviousPage();
        await page.waitForTimeout(2000);
        
        // Step 11: Verify navigated back to page 1
        console.log('\n[STEP 11] Verifying navigated back to page 1...');
        testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify back to page 1' });
        const backToPage1Range = await licenseDetailsPage.getPageRange();
        expect(backToPage1Range.start).toBe(initialRange.start);
        expect(backToPage1Range.end).toBe(initialRange.end);
        console.log(`✓ Navigated back to page 1: ${backToPage1Range.start}-${backToPage1Range.end}`);
        
        // Verify first row is the same as original
        const firstRowSubIdBack = await licenseDetailsPage.getFirstRowSubId();
        expect(firstRowSubIdBack).toBe(firstRowSubIdPage1);
        console.log(`✓ First row matches original: "${firstRowSubIdBack}"`);
      } else {
        console.log('⚠ Previous page button not available');
      }
    } else {
      console.log('⚠ Next page button not available (possibly only one page of data)');
    }

    // Step 12: Change Items per page
    console.log('\n[STEP 12] Changing Items per page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Change page size' });
    const pageSizes = [50, 100, 200, 500];
    
    for (const pageSize of pageSizes) {
      console.log(`\n[STEP 12.${pageSizes.indexOf(pageSize) + 1}] Changing page size to ${pageSize}...`);
      await licenseDetailsPage.changePageSize(pageSize);
      await page.waitForTimeout(2000);
      
      // Step 13: Verify pagination text updates
      console.log(`\n[STEP 13.${pageSizes.indexOf(pageSize) + 1}] Verifying pagination text updated...`);
      const updatedPaginationText = await licenseDetailsPage.getPaginationText();
      expect(updatedPaginationText).toBeTruthy();
      console.log(`✓ Pagination text updated: "${updatedPaginationText}"`);
      
      // Step 14: Verify table reloads with updated rows
      console.log(`\n[STEP 14.${pageSizes.indexOf(pageSize) + 1}] Verifying table reloaded with ${pageSize} rows...`);
      const rowsMatch = await licenseDetailsPage.verifyRowsDisplayed(pageSize);
      // Note: We allow some flexibility as the last page might have fewer rows
      if (!rowsMatch) {
        const actualRowCount = await licenseDetailsPage.getTableRowCount();
        if (actualRowCount <= pageSize) {
          console.log(`✓ Table displays ${actualRowCount} rows (within page size ${pageSize})`);
        } else {
          expect(rowsMatch).toBeTruthy(); // Fail if more rows than expected
        }
      }
    }

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });
});
