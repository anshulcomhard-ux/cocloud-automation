const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { ServiceRequestAllRequestPage } = require('../pages/servicerequest_allrequest');

test.describe('Partner Portal - Service Request - All Requests', () => {
  test('should verify all requests functionality with search, reset, and status filters', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(180000); // 3 minutes timeout

    console.log('\n=== Starting Test: Service Request - All Requests Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Service Request All Requests functionality' });

    // PRECONDITION: Login and navigate
    console.log('\n[PRECONDITION] Logging in and navigating to All Requests page...');
    testInfo.annotations.push({ type: 'step', description: 'Precondition: Login and navigate' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    // Navigate to Service Request → All Requests
    const serviceRequestPage = new ServiceRequestAllRequestPage(page);
    await serviceRequestPage.navigateToAllRequests();
    const isPageVisible = await serviceRequestPage.isAllRequestsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ All Requests page is visible');

    // Wait for page load and data to be visible
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    console.log('✓ Page loaded and data visible');

    // STEP 1: DEFAULT STATE VALIDATION
    console.log('\n[STEP 1] Default State Validation...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Default state validation' });
    
    // Verify Total Tickets card is visible
    const totalTicketsCardVisible = await serviceRequestPage.totalTicketsCard.isVisible({ timeout: 5000 });
    expect(totalTicketsCardVisible).toBeTruthy();
    console.log('✓ Total Tickets card is visible');
    
    // Retrieve total ticket count from card
    const totalTicketsCount = await serviceRequestPage.getTotalTicketsCount();
    expect(totalTicketsCount).toBeGreaterThanOrEqual(0);
    console.log(`✓ Total Tickets count from card: ${totalTicketsCount}`);
    
    // Retrieve total records from pagination
    const totalRecordsFromPagination = await serviceRequestPage.getTotalRecords();
    expect(totalRecordsFromPagination).toBeGreaterThanOrEqual(0);
    console.log(`✓ Total records from pagination: ${totalRecordsFromPagination}`);
    
    // Assert total tickets count equals total records count
    expect(totalTicketsCount).toBe(totalRecordsFromPagination);
    console.log(`✓ Total Tickets count (${totalTicketsCount}) equals pagination records (${totalRecordsFromPagination})`);

    // STEP 2: SEARCH FUNCTIONALITY (POSITIVE SCENARIOS)
    console.log('\n[STEP 2] Search Functionality - Positive Scenarios...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Search functionality (positive)' });
    
    // Search with empty Sub Id and Ticket Id - should show all records
    console.log('\n[STEP 2.1] Testing search with empty fields...');
    await serviceRequestPage.openSearchSection();
    await serviceRequestPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    const allRecordsAfterEmptySearch = await serviceRequestPage.getTotalRecords();
    expect(allRecordsAfterEmptySearch).toBe(totalTicketsCount);
    console.log(`✓ Empty search shows all records: ${allRecordsAfterEmptySearch}`);
    
    // Search by valid Ticket ID
    console.log('\n[STEP 2.2] Testing search by valid Ticket ID...');
    const ticketIds = await serviceRequestPage.getTicketIdValues();
    if (ticketIds.length > 0) {
      const validTicketId = ticketIds[0];
      console.log(`Using Ticket ID from first row: "${validTicketId}"`);
      
      await serviceRequestPage.fillTicketIdField(validTicketId);
      await serviceRequestPage.clickSearchButton();
      await page.waitForTimeout(2000);
      
      // Verify table shows matching records
      const searchTicketIds = await serviceRequestPage.getTicketIdValues();
      expect(searchTicketIds.length).toBeGreaterThan(0);
      console.log(`✓ Table shows ${searchTicketIds.length} matching records`);
      
      // Verify all rows contain the searched Ticket ID
      const allMatchTicketId = await serviceRequestPage.verifyTicketIdInAllRows(validTicketId);
      expect(allMatchTicketId).toBeTruthy();
      
      // Verify pagination total records count matches search result
      const searchTotalRecords = await serviceRequestPage.getTotalRecords();
      expect(searchTotalRecords).toBe(searchTicketIds.length);
      console.log(`✓ Pagination total records (${searchTotalRecords}) matches search results`);
    } else {
      console.log('⚠ No Ticket IDs found in table, skipping Ticket ID search test');
    }
    
    // Reset before next search
    await serviceRequestPage.clickResetButton();
    await page.waitForTimeout(2000);
    
    // Search by valid Sub ID
    console.log('\n[STEP 2.3] Testing search by valid Sub ID...');
    const subIds = await serviceRequestPage.getSubIdValues();
    if (subIds.length > 0) {
      // Filter out empty Sub IDs
      const validSubIds = subIds.filter(id => id && id.trim() !== '');
      if (validSubIds.length > 0) {
        const validSubId = validSubIds[0];
        console.log(`Using Sub ID from first row: "${validSubId}"`);
        
        await serviceRequestPage.fillSubIdField(validSubId);
        await serviceRequestPage.clickSearchButton();
        await page.waitForTimeout(2000);
        
        // Verify table shows matching records
        const searchSubIds = await serviceRequestPage.getSubIdValues();
        expect(searchSubIds.length).toBeGreaterThan(0);
        console.log(`✓ Table shows ${searchSubIds.length} matching records`);
        
        // Verify all rows contain the searched Sub ID
        const allMatchSubId = await serviceRequestPage.verifySubIdInAllRows(validSubId);
        expect(allMatchSubId).toBeTruthy();
        
        // Verify pagination total records count matches search result
        const searchSubTotalRecords = await serviceRequestPage.getTotalRecords();
        expect(searchSubTotalRecords).toBe(searchSubIds.length);
        console.log(`✓ Pagination total records (${searchSubTotalRecords}) matches search results`);
      } else {
        console.log('⚠ No valid Sub IDs found in table, skipping Sub ID search test');
      }
    } else {
      console.log('⚠ No Sub IDs found in table, skipping Sub ID search test');
    }

    // STEP 3: SEARCH FUNCTIONALITY (NEGATIVE SCENARIOS)
    console.log('\n[STEP 3] Search Functionality - Negative Scenarios...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Search functionality (negative)' });
    
    // Reset before negative search
    await serviceRequestPage.clickResetButton();
    await page.waitForTimeout(2000);
    
    // Test invalid Ticket ID
    console.log('\n[STEP 3.1] Testing search with invalid Ticket ID...');
    const invalidTicketId = 'INVALID-TICKET-99999';
    await serviceRequestPage.fillTicketIdField(invalidTicketId);
    await serviceRequestPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Verify "No Data Found" message is displayed
    const noDataForInvalidTicket = await serviceRequestPage.isNoDataMessageVisible();
    expect(noDataForInvalidTicket).toBeTruthy();
    console.log('✓ "No Data Found" message displayed for invalid Ticket ID');
    
    // Verify pagination shows 0 records
    const invalidTicketTotalRecords = await serviceRequestPage.getTotalRecords();
    expect(invalidTicketTotalRecords).toBe(0);
    console.log(`✓ Pagination shows 0 records for invalid Ticket ID`);
    
    // Reset before next negative search
    await serviceRequestPage.clickResetButton();
    await page.waitForTimeout(2000);
    
    // Test invalid Sub ID
    console.log('\n[STEP 3.2] Testing search with invalid Sub ID...');
    const invalidSubId = 'INVALID-SUB-99999';
    await serviceRequestPage.fillSubIdField(invalidSubId);
    await serviceRequestPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Verify "No Data Found" message is displayed
    const noDataForInvalidSub = await serviceRequestPage.isNoDataMessageVisible();
    expect(noDataForInvalidSub).toBeTruthy();
    console.log('✓ "No Data Found" message displayed for invalid Sub ID');
    
    // Verify pagination shows 0 records
    const invalidSubTotalRecords = await serviceRequestPage.getTotalRecords();
    expect(invalidSubTotalRecords).toBe(0);
    console.log(`✓ Pagination shows 0 records for invalid Sub ID`);

    // STEP 4: RESET FUNCTIONALITY
    console.log('\n[STEP 4] Reset Functionality...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Reset functionality' });
    
    // Perform a search first
    await serviceRequestPage.fillTicketIdField('15714');
    await serviceRequestPage.clickSearchButton();
    await page.waitForTimeout(2000);
    
    // Click Reset button
    await serviceRequestPage.clickResetButton();
    await page.waitForTimeout(2000);
    
    // Verify search fields are cleared
    const fieldsEmpty = await serviceRequestPage.areSearchFieldsEmpty();
    expect(fieldsEmpty).toBeTruthy();
    console.log('✓ Search fields are cleared after reset');
    
    // Verify original total tickets count is restored
    const resetTotalTickets = await serviceRequestPage.getTotalTicketsCount();
    expect(resetTotalTickets).toBe(totalTicketsCount);
    console.log(`✓ Original total tickets count restored: ${resetTotalTickets}`);
    
    // Verify pagination total records count matches original value
    const resetTotalRecords = await serviceRequestPage.getTotalRecords();
    expect(resetTotalRecords).toBe(totalTicketsCount);
    console.log(`✓ Pagination total records restored: ${resetTotalRecords}`);

    // STEP 5: STATUS FILTER VALIDATION
    console.log('\n[STEP 5] Status Filter Validation...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Status filter validation' });
    
    const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    
    for (const status of statuses) {
      console.log(`\n[STEP 5.${statuses.indexOf(status) + 1}] Testing ${status} Tickets filter...`);
      
      // Click on the status card
      await serviceRequestPage.clickStatusCard(status);
      
      // Retrieve status-specific ticket count
      const statusCount = await serviceRequestPage.getStatusTicketsCount(status);
      console.log(`✓ ${status} Tickets count: ${statusCount}`);
      
      // Verify pagination total records count matches the card count
      const statusTotalRecords = await serviceRequestPage.getTotalRecords();
      expect(statusTotalRecords).toBe(statusCount);
      console.log(`✓ Pagination total records (${statusTotalRecords}) matches ${status} card count (${statusCount})`);
      
      // Perform search by Ticket ID (if there are records)
      if (statusCount > 0) {
        console.log(`\n[STEP 5.${statuses.indexOf(status) + 1}.1] Testing search by Ticket ID for ${status}...`);
        const statusTicketIds = await serviceRequestPage.getTicketIdValues();
        if (statusTicketIds.length > 0) {
          const statusValidTicketId = statusTicketIds[0];
          await serviceRequestPage.fillTicketIdField(statusValidTicketId);
          await serviceRequestPage.clickSearchButton();
          await page.waitForTimeout(2000);
          
          const searchStatusTicketIds = await serviceRequestPage.getTicketIdValues();
          expect(searchStatusTicketIds.length).toBeGreaterThan(0);
          const allMatchStatusTicket = await serviceRequestPage.verifyTicketIdInAllRows(statusValidTicketId);
          expect(allMatchStatusTicket).toBeTruthy();
          console.log(`✓ Search by Ticket ID works for ${status} status`);
          
          // Reset
          await serviceRequestPage.clickResetButton();
          await page.waitForTimeout(2000);
        }
        
        // Perform search by Sub ID (if there are records with Sub IDs)
        console.log(`\n[STEP 5.${statuses.indexOf(status) + 1}.2] Testing search by Sub ID for ${status}...`);
        const statusSubIds = await serviceRequestPage.getSubIdValues();
        const validStatusSubIds = statusSubIds.filter(id => id && id.trim() !== '');
        if (validStatusSubIds.length > 0) {
          const statusValidSubId = validStatusSubIds[0];
          await serviceRequestPage.fillSubIdField(statusValidSubId);
          await serviceRequestPage.clickSearchButton();
          await page.waitForTimeout(2000);
          
          const searchStatusSubIds = await serviceRequestPage.getSubIdValues();
          expect(searchStatusSubIds.length).toBeGreaterThan(0);
          const allMatchStatusSub = await serviceRequestPage.verifySubIdInAllRows(statusValidSubId);
          expect(allMatchStatusSub).toBeTruthy();
          console.log(`✓ Search by Sub ID works for ${status} status`);
          
          // Reset
          await serviceRequestPage.clickResetButton();
          await page.waitForTimeout(2000);
        }
        
        // Validate negative search scenarios
        console.log(`\n[STEP 5.${statuses.indexOf(status) + 1}.3] Testing negative search for ${status}...`);
        await serviceRequestPage.fillTicketIdField('INVALID-99999');
        await serviceRequestPage.clickSearchButton();
        await page.waitForTimeout(2000);
        
        const noDataStatus = await serviceRequestPage.isNoDataMessageVisible();
        expect(noDataStatus).toBeTruthy();
        console.log(`✓ Negative search works for ${status} status`);
        
        // Reset
        await serviceRequestPage.clickResetButton();
        await page.waitForTimeout(2000);
      } else {
        console.log(`⚠ No ${status} tickets found, skipping search tests for this status`);
      }
    }

    // STEP 6: UI & ACCESSIBILITY CHECKS
    console.log('\n[STEP 6] UI & Accessibility Checks...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: UI & Accessibility checks' });
    
    // Verify Search and Reset buttons are visible and clickable
    const buttonsStatus = await serviceRequestPage.verifyButtonsVisibleAndClickable();
    expect(buttonsStatus.searchVisible).toBeTruthy();
    expect(buttonsStatus.resetVisible).toBeTruthy();
    expect(buttonsStatus.searchEnabled).toBeTruthy();
    expect(buttonsStatus.resetEnabled).toBeTruthy();
    console.log('✓ Search and Reset buttons are visible and clickable');
    
    // Verify table headers are visible
    const headersVisible = await serviceRequestPage.verifyTableHeadersVisible();
    expect(headersVisible).toBeTruthy();
    console.log('✓ Table headers are visible');
    
    // Verify pagination controls are visible (already verified in previous steps)
    const paginationVisible = await serviceRequestPage.paginationInfo.isVisible({ timeout: 3000 }).catch(() => false);
    expect(paginationVisible).toBeTruthy();
    console.log('✓ Pagination controls are visible');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify Select Headers dropdown functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeouts

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

    // Step 2: Navigate to Service Request → All Requests page
    console.log('\n[STEP 2] Navigating to Service Request → All Requests page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to All Requests page' });
    const serviceRequestPage = new ServiceRequestAllRequestPage(page);
    await serviceRequestPage.navigateToAllRequests();
    const isPageVisible = await serviceRequestPage.isAllRequestsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ All Requests page is visible');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Step 3: Verify "Select Headers" button is visible and clickable
    console.log('\n[STEP 3] Verifying Select Headers button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Select Headers button' });
    
    const selectHeadersButton = serviceRequestPage.selectHeadersButton;
    
    // Scroll into view if needed
    await selectHeadersButton.scrollIntoViewIfNeeded();
    
    // Wait for button to be visible with longer timeout
    await selectHeadersButton.waitFor({ state: 'visible', timeout: 15000 });
    const isButtonVisible = await selectHeadersButton.isVisible({ timeout: 5000 });
    expect(isButtonVisible).toBeTruthy();
    console.log('✓ Select Headers button is visible');
    
    const isButtonEnabled = await selectHeadersButton.isEnabled();
    expect(isButtonEnabled).toBeTruthy();
    console.log('✓ Select Headers button is clickable');

    // Step 4: Click on "Select Headers" button and verify dropdown opens
    console.log('\n[STEP 4] Clicking Select Headers button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Select Headers button' });
    await serviceRequestPage.clickSelectHeadersButton();
    await page.waitForTimeout(500);
    
    const isDropdownOpen = await serviceRequestPage.isSelectHeadersDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Select Headers dropdown is open');

    // Step 5: Verify that by default all header options are checked
    console.log('\n[STEP 5] Verifying all headers are checked by default...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify all headers checked by default' });
    
    const expectedHeaders = ['Ticket Id', 'Sub Id', 'Subject', 'Issue Type', 'Issue Sub Type', 'Ticket Status', 'Created At'];
    const allHeadersPresent = await serviceRequestPage.verifyAllHeadersPresent(expectedHeaders);
    expect(allHeadersPresent).toBeTruthy();
    console.log('✓ All expected headers are present');
    
    const allChecked = await serviceRequestPage.verifyAllHeadersCheckedByDefault();
    expect(allChecked).toBeTruthy();
    console.log('✓ All headers are checked by default');

    // Step 6: Verify that all checked headers are visible as table columns
    console.log('\n[STEP 6] Verifying all checked headers are visible in table...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify checked headers are visible' });
    const checkedColumnsVisible = await serviceRequestPage.verifyCheckedColumnsVisible();
    expect(checkedColumnsVisible).toBeTruthy();
    console.log('✓ All checked headers are visible as table columns');

    // Step 7: Click on "Select Headers" button again
    console.log('\n[STEP 7] Opening Select Headers dropdown again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Open Select Headers dropdown again' });
    await serviceRequestPage.openSelectHeadersDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Select Headers dropdown opened');

    // Step 8: Uncheck all header options
    console.log('\n[STEP 8] Unchecking all header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Uncheck all headers' });
    await serviceRequestPage.uncheckAllHeaders();
    await page.waitForTimeout(1000); // Wait for columns to hide
    console.log('✓ All headers unchecked');

    // Step 8.1: Close dropdown and verify "No columns selected" message
    console.log('\n[STEP 8.1] Closing dropdown and verifying "No columns selected" message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8.1: Verify no columns message' });
    
    // Close the dropdown by clicking the button again
    await serviceRequestPage.clickSelectHeadersButton();
    await page.waitForTimeout(1000); // Wait for message to appear
    
    // Verify no table columns are visible
    const noColumnsVisible = await serviceRequestPage.verifyNoColumnsVisible();
    expect(noColumnsVisible).toBeTruthy();
    console.log('✓ No table columns are visible');
    
    // Verify the informational text is displayed
    const noColumnsMessageVisible = await serviceRequestPage.isNoColumnsMessageVisible();
    expect(noColumnsMessageVisible).toBeTruthy();
    console.log('✓ "No columns selected. Please choose at least one header to display data." message is displayed');

    // Step 9: Click on "Select Headers" again
    console.log('\n[STEP 9] Opening Select Headers dropdown again...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Open Select Headers dropdown again' });
    await serviceRequestPage.openSelectHeadersDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Select Headers dropdown opened');

    // Step 10: Check all header options
    console.log('\n[STEP 10] Checking all header options...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Check all headers' });
    await serviceRequestPage.checkAllHeaders();
    await page.waitForTimeout(1000); // Wait for columns to show
    console.log('✓ All headers checked');

    // Step 11: Verify all selected headers are visible again in the table
    console.log('\n[STEP 11] Verifying all selected headers are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify all headers visible' });
    const allHeadersVisible = await serviceRequestPage.verifyCheckedColumnsVisible();
    expect(allHeadersVisible).toBeTruthy();
    console.log('✓ All selected headers are visible in the table');

    // Additional validation: Verify dropdown closes after selection
    console.log('\n[ADDITIONAL] Verifying dropdown closes after selection...');
    await serviceRequestPage.clickSelectHeadersButton();
    await page.waitForTimeout(500);
    const isDropdownClosed = !(await serviceRequestPage.isSelectHeadersDropdownOpen());
    expect(isDropdownClosed).toBeTruthy();
    console.log('✓ Dropdown closes after selection');

    // Additional validation: Verify table updates dynamically (already verified in previous steps)
    console.log('\n[ADDITIONAL] Table updates dynamically without page reload (verified in previous steps)');
    console.log('✓ Table updates dynamically when headers are toggled');

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

    // Step 2: Navigate to Service Request → All Requests page
    console.log('\n[STEP 2] Navigating to Service Request → All Requests page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to All Requests page' });
    const serviceRequestPage = new ServiceRequestAllRequestPage(page);
    await serviceRequestPage.navigateToAllRequests();
    const isPageVisible = await serviceRequestPage.isAllRequestsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ All Requests page is visible');

    // Step 3: Verify pagination section is visible
    console.log('\n[STEP 3] Verifying pagination section...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify pagination section' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const isPaginationVisible = await serviceRequestPage.isPaginationVisible();
    expect(isPaginationVisible).toBeTruthy();
    console.log('✓ Pagination section is visible');

    // Step 4: Verify pagination text is displayed
    console.log('\n[STEP 4] Verifying pagination text...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify pagination text' });
    const paginationText = await serviceRequestPage.getPaginationText();
    expect(paginationText).toBeTruthy();
    expect(paginationText.length).toBeGreaterThan(0);
    expect(paginationText.toLowerCase()).toContain('showing');
    expect(paginationText.toLowerCase()).toContain('records');
    console.log(`✓ Pagination text displayed: "${paginationText}"`);

    // Step 5: Verify default page size
    console.log('\n[STEP 5] Verifying default page size...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify default page size' });
    const defaultPageSize = await serviceRequestPage.verifyDefaultPageSize(20);
    expect(defaultPageSize).toBeTruthy();
    console.log('✓ Default page size is 20');

    // Step 6: Capture first row value on page 1
    console.log('\n[STEP 6] Capturing first row value on page 1...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Capture first row value' });
    
    // Try to get Ticket ID first, fallback to Sub ID
    let firstRowValuePage1 = await serviceRequestPage.getFirstRowTicketId();
    if (!firstRowValuePage1 || firstRowValuePage1.trim() === '') {
      firstRowValuePage1 = await serviceRequestPage.getFirstRowSubId();
    }
    
    expect(firstRowValuePage1).toBeTruthy();
    expect(firstRowValuePage1.length).toBeGreaterThan(0);
    console.log(`✓ First row value on page 1: "${firstRowValuePage1}"`);

    // Step 7: Click Next page button
    console.log('\n[STEP 7] Clicking Next page button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Click Next page' });
    const isNextAvailable = await serviceRequestPage.isNextPageButtonAvailable();
    if (isNextAvailable) {
      const initialRange = await serviceRequestPage.getPageRange();
      await serviceRequestPage.clickNextPage();
      await page.waitForTimeout(2000);
      
      // Step 8: Verify page number increments
      console.log('\n[STEP 8] Verifying page number increments...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify page increments' });
      const newRange = await serviceRequestPage.getPageRange();
      expect(newRange.start).toBeGreaterThan(initialRange.start);
      console.log(`✓ Page incremented: ${initialRange.start}-${initialRange.end} → ${newRange.start}-${newRange.end}`);

      // Step 9: Verify table data changes
      console.log('\n[STEP 9] Verifying table data changed...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify table data changed' });
      
      // Get first row value on page 2
      let firstRowValuePage2 = await serviceRequestPage.getFirstRowTicketId();
      if (!firstRowValuePage2 || firstRowValuePage2.trim() === '') {
        firstRowValuePage2 = await serviceRequestPage.getFirstRowSubId();
      }
      
      expect(firstRowValuePage2).toBeTruthy();
      expect(firstRowValuePage2).not.toBe(firstRowValuePage1);
      console.log(`✓ First row value on page 2: "${firstRowValuePage2}" (different from page 1)`);

      // Step 10: Click Previous page button
      console.log('\n[STEP 10] Clicking Previous page button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Click Previous page' });
      const isPreviousAvailable = await serviceRequestPage.isPreviousPageButtonAvailable();
      if (isPreviousAvailable) {
        await serviceRequestPage.clickPreviousPage();
        await page.waitForTimeout(2000);
        
        // Step 11: Verify navigated back to page 1
        console.log('\n[STEP 11] Verifying navigated back to page 1...');
        testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify back to page 1' });
        const backToPage1Range = await serviceRequestPage.getPageRange();
        expect(backToPage1Range.start).toBe(initialRange.start);
        expect(backToPage1Range.end).toBe(initialRange.end);
        console.log(`✓ Navigated back to page 1: ${backToPage1Range.start}-${backToPage1Range.end}`);
        
        // Verify first row is the same as original
        let firstRowValueBack = await serviceRequestPage.getFirstRowTicketId();
        if (!firstRowValueBack || firstRowValueBack.trim() === '') {
          firstRowValueBack = await serviceRequestPage.getFirstRowSubId();
        }
        expect(firstRowValueBack).toBe(firstRowValuePage1);
        console.log(`✓ First row matches original: "${firstRowValueBack}"`);
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
      await serviceRequestPage.changePageSize(pageSize);
      await page.waitForTimeout(2000);
      
      // Step 13: Verify pagination text updates
      console.log(`\n[STEP 13.${pageSizes.indexOf(pageSize) + 1}] Verifying pagination text updated...`);
      const updatedPaginationText = await serviceRequestPage.getPaginationText();
      expect(updatedPaginationText).toBeTruthy();
      console.log(`✓ Pagination text updated: "${updatedPaginationText}"`);
      
      // Step 14: Verify table reloads with updated rows
      console.log(`\n[STEP 14.${pageSizes.indexOf(pageSize) + 1}] Verifying table reloaded with ${pageSize} rows...`);
      const rowsMatch = await serviceRequestPage.verifyRowsDisplayed(pageSize);
      // The method now handles cases where total records < page size
      expect(rowsMatch).toBeTruthy();
    }

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify ticket status cards behavior', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: Ticket Status Cards Behavior ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test ticket status cards behavior' });

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

    // Navigate to Service Request → All Requests
    console.log('\n[STEP 2] Navigating to Service Request → All Requests page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to All Requests page' });
    const serviceRequestPage = new ServiceRequestAllRequestPage(page);
    await serviceRequestPage.navigateToAllRequests();
    const isPageVisible = await serviceRequestPage.isAllRequestsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ All Requests page is visible');

    // Wait for page load and tickets table to be visible
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    const tableVisible = await serviceRequestPage.isTableVisible();
    expect(tableVisible).toBeTruthy();
    console.log('✓ Page loaded and tickets table is visible');

    // Step 3: Verify Total Tickets card behavior
    console.log('\n[STEP 3] Verifying Total Tickets card behavior...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Total Tickets card' });
    
    // Click on Total Tickets card
    await serviceRequestPage.totalTicketsCard.waitFor({ state: 'visible', timeout: 5000 });
    await serviceRequestPage.totalTicketsCard.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Clicked Total Tickets card');
    
    // Verify Ticket Status column is visible
    const statusColumnVisible = await serviceRequestPage.isTicketStatusColumnVisible();
    expect(statusColumnVisible).toBeTruthy();
    
    // Retrieve all visible ticket statuses
    const allStatuses = await serviceRequestPage.getAllTicketStatuses();
    expect(allStatuses.length).toBeGreaterThan(0);
    console.log(`✓ Retrieved ${allStatuses.length} ticket statuses from table`);
    
    // Verify that ticket statuses include only valid values
    const validStatuses = await serviceRequestPage.verifyValidTicketStatuses();
    expect(validStatuses).toBeTruthy();
    console.log('✓ All ticket statuses are valid (Open, In Progress, Resolved, Closed)');

    // Step 4: Verify Open Tickets card behavior
    console.log('\n[STEP 4] Verifying Open Tickets card behavior...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify Open Tickets card' });
    
    // Click on Open Tickets card
    await serviceRequestPage.clickStatusCard('Open');
    console.log('✓ Clicked Open Tickets card');
    
    // Retrieve all values from Ticket Status column
    const openStatuses = await serviceRequestPage.getAllTicketStatuses();
    
    if (openStatuses.length > 0) {
      // Verify every row has status = "Open"
      const allOpen = await serviceRequestPage.assertAllStatusesEqual('Open');
      expect(allOpen).toBeTruthy();
      console.log('✓ All rows have status "Open"');
    } else {
      // Handle edge case: no records
      const noDataVisible = await serviceRequestPage.isNoDataMessageVisible();
      expect(noDataVisible).toBeTruthy();
      console.log('✓ No Open tickets found - "No Data Found" message displayed');
    }

    // Step 5: Verify In Progress Tickets card behavior
    console.log('\n[STEP 5] Verifying In Progress Tickets card behavior...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify In Progress Tickets card' });
    
    // Click on In Progress Tickets card
    await serviceRequestPage.clickStatusCard('In Progress');
    console.log('✓ Clicked In Progress Tickets card');
    
    // Retrieve all values from Ticket Status column
    const inProgressStatuses = await serviceRequestPage.getAllTicketStatuses();
    
    if (inProgressStatuses.length > 0) {
      // Verify every row has status = "In Progress"
      const allInProgress = await serviceRequestPage.assertAllStatusesEqual('In Progress');
      expect(allInProgress).toBeTruthy();
      console.log('✓ All rows have status "In Progress"');
    } else {
      // Handle edge case: no records
      const noDataVisible = await serviceRequestPage.isNoDataMessageVisible();
      expect(noDataVisible).toBeTruthy();
      console.log('✓ No In Progress tickets found - "No Data Found" message displayed');
    }

    // Step 6: Verify Resolved Tickets card behavior
    console.log('\n[STEP 6] Verifying Resolved Tickets card behavior...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Resolved Tickets card' });
    
    // Click on Resolved Tickets card
    await serviceRequestPage.clickStatusCard('Resolved');
    console.log('✓ Clicked Resolved Tickets card');
    
    // Retrieve all values from Ticket Status column
    const resolvedStatuses = await serviceRequestPage.getAllTicketStatuses();
    
    if (resolvedStatuses.length > 0) {
      // Verify every row has status = "Resolved"
      const allResolved = await serviceRequestPage.assertAllStatusesEqual('Resolved');
      expect(allResolved).toBeTruthy();
      console.log('✓ All rows have status "Resolved"');
    } else {
      // Handle edge case: no records
      const noDataVisible = await serviceRequestPage.isNoDataMessageVisible();
      expect(noDataVisible).toBeTruthy();
      console.log('✓ No Resolved tickets found - "No Data Found" message displayed');
    }

    // Step 7: Verify Closed Tickets card behavior
    console.log('\n[STEP 7] Verifying Closed Tickets card behavior...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify Closed Tickets card' });
    
    // Click on Closed Tickets card
    await serviceRequestPage.clickStatusCard('Closed');
    console.log('✓ Clicked Closed Tickets card');
    
    // Retrieve all values from Ticket Status column
    const closedStatuses = await serviceRequestPage.getAllTicketStatuses();
    
    if (closedStatuses.length > 0) {
      // Verify every row has status = "Closed"
      const allClosed = await serviceRequestPage.assertAllStatusesEqual('Closed');
      expect(allClosed).toBeTruthy();
      console.log('✓ All rows have status "Closed"');
    } else {
      // Handle edge case: no records
      const noDataVisible = await serviceRequestPage.isNoDataMessageVisible();
      expect(noDataVisible).toBeTruthy();
      console.log('✓ No Closed tickets found - "No Data Found" message displayed');
    }

    // Step 8: Additional assertions
    console.log('\n[STEP 8] Additional assertions...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Additional assertions' });
    
    // Verify table updates correctly after card click
    console.log('✓ Table updates correctly after each card click (verified in previous steps)');
    
    // Verify Ticket Status column is visible
    const statusColumnStillVisible = await serviceRequestPage.isTicketStatusColumnVisible();
    expect(statusColumnStillVisible).toBeTruthy();
    console.log('✓ Ticket Status column is visible');
    
    // Verify no mismatch between selected card and displayed ticket statuses
    // (This is already verified in steps 4-7 where we assert all statuses equal the expected status)
    console.log('✓ No mismatch between selected card and displayed ticket statuses (verified in previous steps)');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should verify Raise Service Request button navigation', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(60000); // 1 minute timeout

    console.log('\n=== Starting Test: Raise Service Request Button Navigation ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Raise Service Request button navigation' });

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

    // Step 2: Navigate to Service Request → All Requests page
    console.log('\n[STEP 2] Navigating to Service Request → All Requests page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to All Requests page' });
    const serviceRequestPage = new ServiceRequestAllRequestPage(page);
    await serviceRequestPage.navigateToAllRequests();
    const isPageVisible = await serviceRequestPage.isAllRequestsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ All Requests page is visible');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Step 3: Click on the "Raise Service Request" button
    console.log('\n[STEP 3] Clicking on Raise Service Request button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Raise Service Request button' });
    
    // Verify button is visible before clicking
    const buttonVisible = await serviceRequestPage.raiseServiceRequestButton.isVisible({ timeout: 5000 });
    expect(buttonVisible).toBeTruthy();
    console.log('✓ Raise Service Request button is visible');
    
    // Click the button
    await serviceRequestPage.clickRaiseServiceRequestButton();
    console.log('✓ Clicked Raise Service Request button');

    // Step 4: Verify user is navigated to the Raise Service Request page
    console.log('\n[STEP 4] Verifying navigation to Raise Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify page navigation' });
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify URL contains the expected path
    const currentUrl = await serviceRequestPage.getCurrentUrl();
    console.log(`Current URL: ${currentUrl}`);
    
    const urlContainsRaiseRequest = currentUrl.includes('/service-request/raise-request') || 
                                    currentUrl.includes('/service-request/raise-service-request') ||
                                    currentUrl.includes('/service-request/raise-service');
    expect(urlContainsRaiseRequest).toBeTruthy();
    console.log('✓ URL contains expected path for Raise Service Request page');

    // Verify page heading is visible
    const pageHeadingVisible = await serviceRequestPage.isRaiseServiceRequestPageVisible();
    expect(pageHeadingVisible).toBeTruthy();
    console.log('✓ Raise Service Request page is visible');

    // Additional verification: Check page heading text
    const headingText = await serviceRequestPage.raiseServiceRequestPageHeading.textContent().catch(() => '');
    if (headingText) {
      expect(headingText.trim().toLowerCase()).toContain('raise service request');
      console.log(`✓ Page heading text verified: "${headingText.trim()}"`);
    }

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });
});

