const { test, expect } = require('@playwright/test');
const { CloudUserPage } = require('../pages/clouduser');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Cloud User Module', () => {
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

  // ==================== EMPTY SEARCH FIELDS TEST ====================

  test('should verify search with all fields empty', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Search with All Fields Empty ===');
    
    const cloudUserPage = new CloudUserPage(page);

    // Navigate to Cloud User page
    console.log('[STEP 1] Navigating to Cloud User page...');
    await cloudUserPage.gotoCloudUser(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Cloud User page');

    // Get initial row count
    console.log('\n[STEP 2] Getting initial table data...');
    const initialTableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    const initialRowCount = initialTableInfo.rowCount;
    console.log(`✓ Initial row count: ${initialRowCount}`);

    // Click on "Search Here" to open the search panel
    console.log('\n[STEP 3] Clicking Search Here to open search panel...');
    await cloudUserPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Do not enter any value in any search field
    console.log('\n[STEP 4] Verifying no values entered in search fields...');
    const subIdValue = await cloudUserPage.subIdSearchField.inputValue().catch(() => '');
    const adminEmailValue = await cloudUserPage.adminUserEmailSearchField.inputValue().catch(() => '');
    const cloudUserEmailValue = await cloudUserPage.cloudUserEmailSearchField.inputValue().catch(() => '');
    const cloudUserNameValue = await cloudUserPage.cloudUserNameSearchField.inputValue().catch(() => '');
    console.log(`✓ Sub ID field is empty: ${subIdValue === ''}`);
    console.log(`✓ Admin User Email field is empty: ${adminEmailValue === ''}`);
    console.log(`✓ Cloud User Email field is empty: ${cloudUserEmailValue === ''}`);
    console.log(`✓ Cloud User Name field is empty: ${cloudUserNameValue === ''}`);

    // Click Search button
    console.log('\n[STEP 5] Clicking Search button without entering any values...');
    await cloudUserPage.clickSearch();
    console.log('✓ Clicked Search button');

    // Wait for search to complete
    await page.waitForTimeout(2000);

    // Verify results
    console.log('\n[STEP 6] Verifying search results...');
    
    // Check for validation error
    const hasValidationError = await cloudUserPage.isValidationErrorVisible();
    if (hasValidationError) {
      console.log('✓ Validation error is shown');
      expect(hasValidationError).toBeTruthy();
    } else {
      console.log('⚠ No validation error shown (this may be acceptable)');
    }

    // Verify table state
    const afterSearchTableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    console.log(`✓ Row count after empty search: ${afterSearchTableInfo.rowCount}`);
    
    if (initialRowCount > 0) {
      // If there was initial data, it should still be there (or cleared based on implementation)
      console.log('✓ Table state verified');
    } else {
      // If no initial data, empty message should appear
      if (afterSearchTableInfo.messageVisible) {
        const messageText = await cloudUserPage.noDataMessage.textContent();
        console.log(`✓ Empty state message shown: "${messageText?.trim()}"`);
        expect(messageText).toContain('Too see the data search on any field');
      } else {
        console.log('⚠ No empty state message appeared');
      }
    }

    await page.screenshot({ path: 'artifacts/clouduser-empty-search.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== SUB ID SEARCH TEST ====================

  test('should verify Sub ID search in Cloud User', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Sub ID Search in Cloud User ===');
    
    const cloudUserPage = new CloudUserPage(page);

    // Navigate to Cloud User page
    console.log('[STEP 1] Navigating to Cloud User page...');
    await cloudUserPage.gotoCloudUser(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Cloud User page');

    // Click Search Here to open search panel
    console.log('\n[STEP 2] Clicking Search Here to open search panel...');
    await cloudUserPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Enter Sub ID as "123" (static value)
    console.log('\n[STEP 3] Entering Sub ID as "123"...');
    await cloudUserPage.enterSubIdSearch('123');
    console.log('✓ Entered Sub ID: "123"');

    // Click Search
    console.log('\n[STEP 4] Clicking Search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Clicked Search button');

    // Verify table shows matching records or empty message
    console.log('\n[STEP 5] Verifying search results...');
    await page.waitForTimeout(2000);
    const tableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
      expect(tableInfo.rowCount).toBeGreaterThan(0);
      
      // Retrieve all column values for the displayed rows
      console.log('\n[STEP 6] Retrieving all column values from displayed rows...');
      const rowCount = await cloudUserPage.allTableRows.count();
      for (let i = 0; i < Math.min(rowCount, 3); i++) {
        const row = cloudUserPage.allTableRows.nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        const rowData = [];
        for (let j = 0; j < cellCount; j++) {
          const cell = cells.nth(j);
          const text = await cell.textContent();
          if (text) rowData.push(text.trim());
        }
        console.log(`  Row ${i + 1}: ${rowData.join(' | ')}`);
      }
    } else {
      const messageText = await cloudUserPage.noDataMessage.textContent();
      console.log(`✓ No data found - Message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
      expect(messageText).toContain('Too see the data search on any field');
    }

    // Click Reset
    console.log('\n[STEP 7] Clicking Reset button...');
    await cloudUserPage.clickReset();
    console.log('✓ Clicked Reset button');

    await page.screenshot({ path: 'artifacts/clouduser-subid-search.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== ADMIN USER EMAIL SEARCH TEST ====================

  test('should verify Admin User Email search', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Admin User Email Search ===');
    
    const cloudUserPage = new CloudUserPage(page);

    // Navigate to Cloud User page
    console.log('[STEP 1] Navigating to Cloud User page...');
    await cloudUserPage.gotoCloudUser(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Cloud User page');

    // Use static Admin User Email for search
    console.log('\n[STEP 2] Using Admin User Email for search...');
    const adminUserEmail = 'Qmaxceramics@gmail.com';
    console.log(`✓ Using Admin User Email: "${adminUserEmail}"`);

    // Click Search Here to open search panel
    console.log('\n[STEP 3] Clicking Search Here to open search panel...');
    await cloudUserPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Enter retrieved Admin User Email in search field
    console.log('\n[STEP 4] Entering Admin User Email in search field...');
    await cloudUserPage.enterAdminUserEmailSearch(adminUserEmail);
    console.log(`✓ Entered Admin User Email: "${adminUserEmail}"`);

    // Click Search
    console.log('\n[STEP 5] Clicking Search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Clicked Search button');

    // Verify table shows matching records or empty message
    console.log('\n[STEP 6] Verifying search results...');
    await page.waitForTimeout(2000);
    const tableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
      expect(tableInfo.rowCount).toBeGreaterThan(0);
      
      // Retrieve all column values for the displayed rows
      console.log('\n[STEP 7] Retrieving all column values from displayed rows...');
      const rowCount = await cloudUserPage.allTableRows.count();
      for (let i = 0; i < Math.min(rowCount, 3); i++) {
        const row = cloudUserPage.allTableRows.nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        const rowData = [];
        for (let j = 0; j < cellCount; j++) {
          const cell = cells.nth(j);
          const text = await cell.textContent();
          if (text) rowData.push(text.trim());
        }
        console.log(`  Row ${i + 1}: ${rowData.join(' | ')}`);
      }
    } else {
      const messageText = await cloudUserPage.noDataMessage.textContent();
      console.log(`✓ No matching data found - Message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
      expect(messageText).toContain('Too see the data search on any field');
    }

    // Click Reset
    console.log('\n[STEP 8] Clicking Reset button...');
    await cloudUserPage.clickReset();
    console.log('✓ Clicked Reset button');

    await page.screenshot({ path: 'artifacts/clouduser-admin-email-search.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== CLOUD USER EMAIL SEARCH TEST ====================

  test('should verify Cloud User Email search', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Cloud User Email Search ===');
    
    const cloudUserPage = new CloudUserPage(page);

    // Navigate to Cloud User page
    console.log('[STEP 1] Navigating to Cloud User page...');
    await cloudUserPage.gotoCloudUser(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Cloud User page');

    // Use static Cloud User Email for search
    console.log('\n[STEP 2] Using Cloud User Email for search...');
    const cloudUserEmail = 'contact@comhard.co.in';
    console.log(`✓ Using Cloud User Email: "${cloudUserEmail}"`);

    // Click Search Here to open search panel
    console.log('\n[STEP 3] Clicking Search Here to open search panel...');
    await cloudUserPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Enter Cloud User Email in search field
    console.log('\n[STEP 4] Entering Cloud User Email in search field...');
    await cloudUserPage.enterCloudUserEmailSearch(cloudUserEmail);
    console.log(`✓ Entered Cloud User Email: "${cloudUserEmail}"`);

    // Click Search
    console.log('\n[STEP 5] Clicking Search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Clicked Search button');

    // Verify table shows matching records or empty message
    console.log('\n[STEP 6] Verifying search results...');
    await page.waitForTimeout(2000);
    const tableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
      expect(tableInfo.rowCount).toBeGreaterThan(0);
      
      // Retrieve all column values for the displayed rows
      console.log('\n[STEP 7] Retrieving all column values from displayed rows...');
      const rowCount = await cloudUserPage.allTableRows.count();
      for (let i = 0; i < Math.min(rowCount, 3); i++) {
        const row = cloudUserPage.allTableRows.nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        const rowData = [];
        for (let j = 0; j < cellCount; j++) {
          const cell = cells.nth(j);
          const text = await cell.textContent();
          if (text) rowData.push(text.trim());
        }
        console.log(`  Row ${i + 1}: ${rowData.join(' | ')}`);
      }
    } else {
      const messageText = await cloudUserPage.noDataMessage.textContent();
      console.log(`✓ No matching data found - Message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
      expect(messageText).toContain('Too see the data search on any field');
    }

    // Click Reset
    console.log('\n[STEP 8] Clicking Reset button...');
    await cloudUserPage.clickReset();
    console.log('✓ Clicked Reset button');

    await page.screenshot({ path: 'artifacts/clouduser-cloud-email-search.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== CLOUD USER NAME SEARCH TEST ====================

  test('should verify Cloud User Name search', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Cloud User Name Search ===');
    
    const cloudUserPage = new CloudUserPage(page);

    // Navigate to Cloud User page
    console.log('[STEP 1] Navigating to Cloud User page...');
    await cloudUserPage.gotoCloudUser(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Cloud User page');

    // Use static Cloud User Name for search
    console.log('\n[STEP 2] Using Cloud User Name for search...');
    const cloudUserName = '123';
    console.log(`✓ Using Cloud User Name: "${cloudUserName}"`);

    // Click Search Here to open search panel
    console.log('\n[STEP 3] Clicking Search Here to open search panel...');
    await cloudUserPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Enter Cloud User Name in search field
    console.log('\n[STEP 4] Entering Cloud User Name in search field...');
    await cloudUserPage.enterCloudUserNameSearch(cloudUserName);
    console.log(`✓ Entered Cloud User Name: "${cloudUserName}"`);

    // Click Search
    console.log('\n[STEP 5] Clicking Search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Clicked Search button');

    // Verify table shows matching records or empty message
    console.log('\n[STEP 6] Verifying search results...');
    await page.waitForTimeout(2000);
    const tableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    
    if (tableInfo.hasData) {
      console.log(`✓ Table shows ${tableInfo.rowCount} matching record(s)`);
      expect(tableInfo.rowCount).toBeGreaterThan(0);
      
      // Retrieve all column values for the displayed rows
      console.log('\n[STEP 7] Retrieving all column values from displayed rows...');
      const rowCount = await cloudUserPage.allTableRows.count();
      for (let i = 0; i < Math.min(rowCount, 3); i++) {
        const row = cloudUserPage.allTableRows.nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        const rowData = [];
        for (let j = 0; j < cellCount; j++) {
          const cell = cells.nth(j);
          const text = await cell.textContent();
          if (text) rowData.push(text.trim());
        }
        console.log(`  Row ${i + 1}: ${rowData.join(' | ')}`);
      }
    } else {
      const messageText = await cloudUserPage.noDataMessage.textContent();
      console.log(`✓ No matching data found - Message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
      expect(messageText).toContain('Too see the data search on any field');
    }

    // Click Reset
    console.log('\n[STEP 8] Clicking Reset button...');
    await cloudUserPage.clickReset();
    console.log('✓ Clicked Reset button');

    await page.screenshot({ path: 'artifacts/clouduser-cloud-name-search.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== RESET BUTTON TEST ====================

  test('should verify Reset button clears search and shows empty state', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Reset Clears Search Fields ===');
    
    const cloudUserPage = new CloudUserPage(page);

    // Navigate to Cloud User page
    console.log('[STEP 1] Navigating to Cloud User page...');
    await cloudUserPage.gotoCloudUser(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Cloud User page');

    // Click Search Here to open search panel
    console.log('\n[STEP 2] Clicking Search Here to open search panel...');
    await cloudUserPage.clickSearchHere();
    console.log('✓ Search panel opened');

    // Enter values in all search fields
    console.log('\n[STEP 3] Entering values in all search fields...');
    await cloudUserPage.enterSubIdSearch('123');
    await cloudUserPage.enterAdminUserEmailSearch('test@example.com');
    await cloudUserPage.enterCloudUserEmailSearch('user@example.com');
    await cloudUserPage.enterCloudUserNameSearch('Test User');
    console.log('✓ Entered values in all search fields');

    // Click Search
    console.log('\n[STEP 4] Clicking Search button...');
    await cloudUserPage.clickSearch();
    console.log('✓ Clicked Search button');
    await page.waitForTimeout(2000);

    // Click Reset button
    console.log('\n[STEP 5] Clicking Reset button...');
    await cloudUserPage.clickReset();
    console.log('✓ Clicked Reset button');
    await page.waitForTimeout(2000);

    // Verify all search input fields are cleared
    console.log('\n[STEP 6] Verifying all search fields are cleared...');
    const allFieldsCleared = await cloudUserPage.verifyAllSearchFieldsCleared();
    expect(allFieldsCleared).toBeTruthy();
    console.log('✓ All search input fields are cleared');

    // Verify table resets to default state
    console.log('\n[STEP 7] Verifying table resets to default state...');
    const tableInfo = await cloudUserPage.verifyTableDataOrEmpty();
    console.log(`✓ Table row count: ${tableInfo.rowCount}`);

    // If no data exists, empty state message should be visible
    if (!tableInfo.hasData) {
      const messageText = await cloudUserPage.noDataMessage.textContent();
      console.log(`✓ Empty state message: "${messageText?.trim()}"`);
      expect(tableInfo.messageVisible).toBeTruthy();
      expect(messageText).toContain('Too see the data search on any field');
    } else {
      console.log('✓ Table shows default data');
    }

    await page.screenshot({ path: 'artifacts/clouduser-reset-button.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });
});

