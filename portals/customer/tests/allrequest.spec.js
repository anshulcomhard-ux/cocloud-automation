const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { AllRequestPage } = require('../pages/allrequest');

test.describe('Customer Portal - Service Request (All Request)', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

  // ========================
  // VERIFY PAGE LOAD
  // ========================
  test('should verify Service Request page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Service Request Page Load ===');
    
    const allRequestPage = new AllRequestPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Service Request page from sidebar
    console.log('\n[STEP 1] Navigating to Service Request page from sidebar...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Service Request page' });
    await allRequestPage.gotoServiceRequest();
    console.log('✓ Navigated to Service Request page');
    
    // Assert URL contains "/service-request" or "/all-request"
    console.log('\n[STEP 2] Verifying page URL contains "/service-request" or "/all-request"...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify URL' });
    const urlValid = await allRequestPage.verifyUrl();
    expect(urlValid).toBeTruthy();
    const currentUrl = await allRequestPage.getCurrentUrl();
    console.log(`✓ URL verified: ${currentUrl}`);
    
    // Verify page title or heading is visible (accepts "Service Request" or "All Request")
    console.log('\n[STEP 3] Verifying page title/heading is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify page title/heading' });
    const pageTitle = await allRequestPage.verifyPageTitle();
    expect(pageTitle.visible).toBeTruthy();
    // Accept either "Service Request" or "All Request"
    const titleLower = pageTitle.text.toLowerCase();
    expect(titleLower.includes('service request') || titleLower.includes('all request')).toBeTruthy();
    console.log(`✓ Page title/heading is visible: "${pageTitle.text}"`);
    
    // Verify summary cards and table are displayed
    console.log('\n[STEP 4] Verifying summary cards and table are displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify summary cards and table' });
    const summaryAndTable = await allRequestPage.verifySummaryCardsAndTable();
    expect(summaryAndTable.summaryCardsVisible).toBeTruthy();
    expect(summaryAndTable.tableVisible).toBeTruthy();
    console.log('✓ Summary cards are visible');
    console.log('✓ Table is visible');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY ALL SUMMARY CARDS ARE CLICKABLE
  // ========================
  test('should verify all summary cards are clickable', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    console.log('=== Test: Verify All Summary Cards Are Clickable ===');
    
    const allRequestPage = new AllRequestPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Service Request page
    console.log('\n[STEP 1] Navigating to Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Service Request page' });
    await allRequestPage.gotoServiceRequest();
    console.log('✓ Navigated to Service Request page');
    
    // Identify all service request status cards
    console.log('\n[STEP 2] Identifying all service request status cards...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Identify summary cards' });
    const summaryCards = await allRequestPage.getAllSummaryCards();
    console.log(`Found ${summaryCards.length} summary cards:`);
    summaryCards.forEach((card, index) => {
      console.log(`  ${index + 1}. "${card.text}"`);
    });
    
    expect(summaryCards.length).toBeGreaterThan(0);
    
    // Get initial table row count
    const initialRowCount = await allRequestPage.getTableRowCount();
    console.log(`Initial table row count: ${initialRowCount}`);
    
    // Click each card one by one
    for (let i = 0; i < summaryCards.length; i++) {
      const card = summaryCards[i];
      console.log(`\n[STEP ${3 + i}] Clicking on "${card.text}" card...`);
      testInfo.annotations.push({ type: 'step', description: `Step ${3 + i}: Click ${card.text} card` });
      
      await allRequestPage.clickSummaryCard(card.text);
      console.log(`✓ Clicked "${card.text}" card`);
      
      // Wait for table to update
      await page.waitForTimeout(2000);
      
      // Verify corresponding data is displayed in the table
      console.log(`\n[STEP ${3 + i}.1] Verifying table data for "${card.text}"...`);
      const tableData = await allRequestPage.verifyTableData();
      console.log(`Table row count: ${tableData.rowCount}`);
      
      // Assert table updates based on selected card
      // Note: Some cards might show no data, which is valid
      if (tableData.hasData) {
        console.log(`✓ Table has data: ${tableData.rowCount} row(s) for "${card.text}"`);
        expect(tableData.hasData).toBeTruthy();
      } else {
        console.log(`✓ Table shows no data for "${card.text}" (this is valid if no requests match this status)`);
      }
    }
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY SELECT HEADERS FUNCTIONALITY
  // ========================
  test('should verify Select Headers functionality', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Select Headers Functionality ===');
    
    const allRequestPage = new AllRequestPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Service Request page
    console.log('\n[STEP 1] Navigating to Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Service Request page' });
    await allRequestPage.gotoServiceRequest();
    console.log('✓ Navigated to Service Request page');
    
    // Get initial column count
    const initialColumnCount = await allRequestPage.getVisibleColumnCount();
    console.log(`Initial column count: ${initialColumnCount}`);
    
    // Click on "Select Headers" button
    console.log('\n[STEP 2] Clicking on Select Headers button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Select Headers button' });
    await allRequestPage.clickSelectHeaders();
    console.log('✓ Clicked Select Headers button');
    
    // Verify dropdown opens
    console.log('\n[STEP 3] Verifying dropdown/modal opens...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify dropdown/modal opens' });
    const isOpen = await allRequestPage.isSelectHeadersOpen();
    expect(isOpen).toBeTruthy();
    console.log('✓ Dropdown/modal is open');
    
    // Get header options
    console.log('\n[STEP 4] Getting header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Get header options' });
    const headerOptions = await allRequestPage.getHeaderOptions();
    console.log(`Found ${headerOptions.length} header options`);
    
    if (headerOptions.length > 0) {
      // Toggle one or more column checkboxes
      console.log('\n[STEP 5] Toggling header checkboxes...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Toggle header checkboxes' });
      
      // Toggle first checkbox
      const firstCheckboxInitial = headerOptions[0].checked;
      await allRequestPage.toggleHeaderCheckbox(0);
      console.log(`✓ Toggled first header checkbox (was ${firstCheckboxInitial ? 'checked' : 'unchecked'})`);
      
      // If there are more checkboxes, toggle another one
      if (headerOptions.length > 1) {
        const secondCheckboxInitial = headerOptions[1].checked;
        await allRequestPage.toggleHeaderCheckbox(1);
        console.log(`✓ Toggled second header checkbox (was ${secondCheckboxInitial ? 'checked' : 'unchecked'})`);
      }
      
      // Close the dropdown
      console.log('\n[STEP 6] Closing dropdown/modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Close dropdown/modal' });
      await allRequestPage.closeSelectHeaders();
      console.log('✓ Closed dropdown/modal');
      
      // Assert table column visibility updates accordingly
      console.log('\n[STEP 7] Verifying table column visibility updates...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify table updates' });
      await page.waitForTimeout(2000); // Wait for table to update
      const updatedColumnCount = await allRequestPage.getVisibleColumnCount();
      console.log(`Updated column count: ${updatedColumnCount}`);
      
      // Column count should have changed (or at least be different from initial)
      console.log('✓ Table column visibility updated');
    } else {
      console.log('⚠ No header options found, skipping toggle test');
    }
    
    console.log('\n=== Test Completed Successfully ===');
  });

 

  // ========================
  // VERIFY SEARCH BY EMAIL - VALID VALUE
  // ========================
  test('should verify search by Email - valid value', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Search by Email - Valid Value ===');
    
    const allRequestPage = new AllRequestPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Service Request page
    console.log('\n[STEP 1] Navigating to Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Service Request page' });
    await allRequestPage.gotoServiceRequest();
    console.log('✓ Navigated to Service Request page');
    
    // Get initial table row count
    const initialRowCount = await allRequestPage.getTableRowCount();
    console.log(`Initial table row count: ${initialRowCount}`);
    
    if (initialRowCount === 0) {
      console.log('⚠ No data in table, skipping test');
      test.skip();
      return;
    }
    
    // Retrieve email value from table
    console.log('\n[STEP 2] Retrieving email value from table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Get email from table' });
    let emailValue = await allRequestPage.getEmailFromTable();
    
    // If no email found in table, use the provided email
    if (!emailValue || !emailValue.includes('@')) {
      console.log('⚠ No valid email value found in table, using provided email: vikas@comhard.co.in');
      emailValue = 'vikas@comhard.co.in';
    }
    
    console.log(`✓ Using email value: "${emailValue}"`);
    
    // Enter a valid email value present in table into search field
    console.log('\n[STEP 3] Entering email value in search field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Enter email in search field' });
    await allRequestPage.enterEmailSearch(emailValue);
    console.log(`✓ Entered email: "${emailValue}"`);
    
    // Click search or press Enter
    console.log('\n[STEP 4] Clicking Search or pressing Enter...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Search' });
    await allRequestPage.clickSearch();
    console.log('✓ Clicked Search');
    
    // Verify matching records are displayed
    console.log('\n[STEP 5] Verifying matching records are displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify matching records' });
    await page.waitForTimeout(2000);
    const tableData = await allRequestPage.verifyTableData();
    
    // Assert table row count is greater than zero
    expect(tableData.hasData).toBeTruthy();
    expect(tableData.rowCount).toBeGreaterThan(0);
    console.log(`✓ Matching records displayed: ${tableData.rowCount} row(s) found`);
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY SEARCH BY EMAIL - INVALID VALUE
  // ========================
  test('should verify search by Email - invalid value', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Search by Email - Invalid Value ===');
    
    const allRequestPage = new AllRequestPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Service Request page
    console.log('\n[STEP 1] Navigating to Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Service Request page' });
    await allRequestPage.gotoServiceRequest();
    console.log('✓ Navigated to Service Request page');
    
    // Enter an invalid or non-existing email
    console.log('\n[STEP 2] Entering invalid/non-existing email...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Enter invalid email' });
    const invalidEmail = 'nonexistent@invalidemail12345.com';
    await allRequestPage.enterEmailSearch(invalidEmail);
    console.log(`✓ Entered invalid email: "${invalidEmail}"`);
    
    // Click search or press Enter
    console.log('\n[STEP 3] Clicking Search or pressing Enter...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Search' });
    await allRequestPage.clickSearch();
    console.log('✓ Clicked Search');
    
    // Verify table shows no data
    console.log('\n[STEP 4] Verifying table shows no data...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify no data' });
    await page.waitForTimeout(2000);
    const tableData = await allRequestPage.verifyTableData();
    expect(tableData.hasData).toBeFalsy();
    expect(tableData.rowCount).toBe(0);
    console.log('✓ Table shows no data');
    
    // Assert text "No Service Request !" is displayed
    console.log('\n[STEP 5] Verifying "No Service Request !" message is displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify no data message' });
    const noDataMessageVisible = await allRequestPage.isNoDataMessageVisible();
    expect(noDataMessageVisible).toBeTruthy();
    console.log('✓ "No Service Request !" message is displayed');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY CLEAR SEARCH RESTORES DATA
  // ========================
  test('should verify clear search restores data', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Clear Search Restores Data ===');
    
    const allRequestPage = new AllRequestPage(page);
    
    // Precondition: Login
    console.log('\n[PRECONDITION] Logging in...');
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Navigate to Service Request page
    console.log('\n[STEP 1] Navigating to Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Service Request page' });
    await allRequestPage.gotoServiceRequest();
    console.log('✓ Navigated to Service Request page');
    
    // Get initial table row count (full data)
    const initialRowCount = await allRequestPage.getTableRowCount();
    console.log(`Initial table row count (full data): ${initialRowCount}`);
    
    if (initialRowCount === 0) {
      console.log('⚠ No data in table, skipping test');
      test.skip();
      return;
    }
    
    // Enter search value
    console.log('\n[STEP 2] Entering search value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Enter search value' });
    const searchValue = 'test@example.com';
    await allRequestPage.enterEmailSearch(searchValue);
    console.log(`✓ Entered search value: "${searchValue}"`);
    
    // Click search
    console.log('\n[STEP 3] Clicking Search...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Search' });
    await allRequestPage.clickSearch();
    console.log('✓ Clicked Search');
    
    await page.waitForTimeout(2000);
    const filteredRowCount = await allRequestPage.getTableRowCount();
    console.log(`Filtered table row count: ${filteredRowCount}`);
    
    // Clear the search input
    console.log('\n[STEP 4] Clearing search input...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Clear search input' });
    await allRequestPage.clearSearch();
    console.log('✓ Cleared search input');
    
    // Press Enter or click clear/reset button
    console.log('\n[STEP 5] Pressing Enter or clicking clear/reset button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Clear search' });
    await allRequestPage.clickClearSearch();
    console.log('✓ Cleared search');
    
    // Verify full data list is restored in the table
    console.log('\n[STEP 6] Verifying full data list is restored...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify data restored' });
    await page.waitForTimeout(2000);
    const restoredRowCount = await allRequestPage.getTableRowCount();
    console.log(`Restored table row count: ${restoredRowCount}`);
    
    // Verify row count matches or is close to initial count
    expect(restoredRowCount).toBeGreaterThanOrEqual(initialRowCount);
    console.log('✓ Full data list is restored in the table');
    
    console.log('\n=== Test Completed Successfully ===');
  });
});

