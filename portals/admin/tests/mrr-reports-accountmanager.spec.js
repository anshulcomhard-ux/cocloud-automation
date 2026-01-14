const { test, expect } = require('@playwright/test');
const { AccountManagerReportPage } = require('../pages/mrr-reports-accountmanager');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - MRR Reports - Account Manager Report Module', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    // Login before each test
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);
  });

  // ==================== PAGE LOAD TEST ====================

  test('should verify account manager report page loads successfully - retrieve page heading', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Account Manager Report Page Loads Successfully ===');
    
    const accountManagerReportPage = new AccountManagerReportPage(page);

    // Step 1: First click on MRR Reports sidebar menu - dropdown opens
    console.log('[STEP 1] Clicking on MRR Reports sidebar menu...');
    await accountManagerReportPage.mrrReportsMenu.waitFor({ state: 'visible', timeout: 10000 });
    await accountManagerReportPage.mrrReportsMenu.scrollIntoViewIfNeeded();
    await accountManagerReportPage.mrrReportsMenu.click();
    await page.waitForTimeout(2000);
    console.log('✓ MRR Reports dropdown opened');

    // Step 2: Click on Account Manager Report option
    console.log('[STEP 2] Clicking on Account Manager Report option...');
    await page.waitForTimeout(1000); // Wait for dropdown to fully expand
    
    // Use more specific locator
    const accountManagerLink = page.locator('li[ng-reflect-router-link="/mrr-reports/accountManagerReport"]').first();
    const isVisible = await accountManagerLink.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      await accountManagerLink.scrollIntoViewIfNeeded();
      await accountManagerLink.click();
    } else {
      // Fallback: find by text but exclude other options
      const accountManagerByText = page.locator('li:has-text("Account Manager")').filter({ 
        hasNot: page.locator(':has-text("MRR Report"), :has-text("Partner Report")') 
      }).first();
      await accountManagerByText.waitFor({ state: 'visible', timeout: 10000 });
      await accountManagerByText.scrollIntoViewIfNeeded();
      await accountManagerByText.click();
    }
    
    await page.waitForTimeout(5000); // Wait longer for navigation
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    console.log('✓ Clicked Account Manager Report option');

    // Step 3: Verify page is loaded
    console.log('[STEP 3] Verifying page is loaded...');
    let isPageLoaded = await accountManagerReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await accountManagerReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Account Manager Report page is loaded');

    // Step 4: Retrieve and verify page heading
    console.log('[STEP 4] Retrieving page heading...');
    const pageHeading = await accountManagerReportPage.getPageHeading();
    expect(pageHeading).toBeTruthy();
    expect(pageHeading.toLowerCase()).toContain('account manager report');
    console.log(`✓ Page heading: "${pageHeading}"`);

    await page.screenshot({ path: 'artifacts/account-manager-report-page-load.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ACCOUNT MANAGER DROPDOWN TEST ====================

  test('should verify account manager dropdown', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Account Manager Dropdown ===');
    
    const accountManagerReportPage = new AccountManagerReportPage(page);

    // Step 1: Navigate to Account Manager Report page
    console.log('[STEP 1] Navigating to Account Manager Report page...');
    await accountManagerReportPage.gotoAccountManagerReport(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await accountManagerReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await accountManagerReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Account Manager Report page is loaded');

    // Step 2: Click on Account Manager dropdown
    console.log('[STEP 2] Clicking on Account Manager dropdown...');
    await accountManagerReportPage.clickAccountManagerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen = await accountManagerReportPage.isAccountManagerDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Account Manager dropdown is open');

    // Step 3: Select all options
    console.log('[STEP 3] Selecting all options...');
    await accountManagerReportPage.clickSelectAllAccountManager();
    await page.waitForTimeout(1000);
    
    const isSelectAllChecked = await accountManagerReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllChecked).toBeTruthy();
    console.log('✓ Select All option is checked');
    
    const allChecked = await accountManagerReportPage.areAllAccountManagerCheckboxesChecked();
    expect(allChecked).toBeTruthy();
    console.log('✓ All account manager checkboxes are checked');

    // Step 4: Click OK
    console.log('[STEP 4] Clicking OK...');
    await accountManagerReportPage.clickAccountManagerOk();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked OK');

    // Step 5: Again open dropdown - check all options are selected
    console.log('[STEP 5] Opening dropdown again to verify all options are selected...');
    await accountManagerReportPage.clickAccountManagerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen2 = await accountManagerReportPage.isAccountManagerDropdownOpen();
    expect(isDropdownOpen2).toBeTruthy();
    console.log('✓ Account Manager dropdown is open again');
    
    const isSelectAllChecked2 = await accountManagerReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllChecked2).toBeTruthy();
    console.log('✓ Select All option is still checked');
    
    const allChecked2 = await accountManagerReportPage.areAllAccountManagerCheckboxesChecked();
    expect(allChecked2).toBeTruthy();
    console.log('✓ All account manager checkboxes are still checked');

    // Step 6: Uncheck all options
    console.log('[STEP 6] Unchecking all options...');
    await accountManagerReportPage.uncheckAllAccountManagerCheckboxes();
    await page.waitForTimeout(1000);
    
    const isSelectAllUnchecked = await accountManagerReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllUnchecked).toBeFalsy();
    console.log('✓ Select All option is unchecked');
    
    const allUnchecked = await accountManagerReportPage.areAllAccountManagerCheckboxesUnchecked();
    expect(allUnchecked).toBeTruthy();
    console.log('✓ All account manager checkboxes are unchecked');

    // Step 7: Click OK
    console.log('[STEP 7] Clicking OK...');
    await accountManagerReportPage.clickAccountManagerOk();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked OK');

    // Step 8: Again open dropdown - check all options are unchecked
    console.log('[STEP 8] Opening dropdown again to verify all options are unchecked...');
    await accountManagerReportPage.clickAccountManagerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen3 = await accountManagerReportPage.isAccountManagerDropdownOpen();
    expect(isDropdownOpen3).toBeTruthy();
    console.log('✓ Account Manager dropdown is open again');
    
    const isSelectAllUnchecked2 = await accountManagerReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllUnchecked2).toBeFalsy();
    console.log('✓ Select All option is still unchecked');
    
    const allUnchecked2 = await accountManagerReportPage.areAllAccountManagerCheckboxesUnchecked();
    expect(allUnchecked2).toBeTruthy();
    console.log('✓ All account manager checkboxes are still unchecked');

    await page.screenshot({ path: 'artifacts/account-manager-report-dropdown.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== EXPORT BUTTON TEST ====================

  test('should verify export excel button is present and clickable - trigger download', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Export to Excel Button ===');
    
    const accountManagerReportPage = new AccountManagerReportPage(page);

    // Step 1: Navigate to Account Manager Report page
    console.log('[STEP 1] Navigating to Account Manager Report page...');
    await accountManagerReportPage.gotoAccountManagerReport(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await accountManagerReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await accountManagerReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Account Manager Report page is loaded');

    // Step 2: Verify Export button is visible
    console.log('[STEP 2] Verifying Export to Excel button is visible...');
    const isButtonVisible = await accountManagerReportPage.isExportButtonVisible();
    expect(isButtonVisible).toBeTruthy();
    console.log('✓ Export to Excel button is visible');

    // Step 3: Verify Export button text
    console.log('[STEP 3] Verifying Export button text...');
    const buttonText = await accountManagerReportPage.getExportButtonText();
    expect(buttonText).toBeTruthy();
    expect(buttonText.toUpperCase()).toContain('EXPORT');
    console.log(`✓ Export button text: "${buttonText}"`);

    // Step 4: Verify Export button is enabled/clickable
    console.log('[STEP 4] Verifying Export button is enabled/clickable...');
    const isButtonEnabled = await accountManagerReportPage.isExportButtonEnabled();
    expect(isButtonEnabled).toBeTruthy();
    console.log('✓ Export to Excel button is enabled and clickable');

    // Step 5: Click Export button and verify download is triggered
    console.log('[STEP 5] Clicking Export button and verifying download is triggered...');
    const download = await accountManagerReportPage.clickExportButton();
    expect(download).toBeTruthy();
    console.log('✓ Download triggered successfully');

    // Step 6: Verify download details
    console.log('[STEP 6] Verifying download details...');
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toBeTruthy();
    console.log(`✓ Download filename: "${suggestedFilename}"`);
    
    // Verify it's an Excel file
    const isExcelFile = suggestedFilename.toLowerCase().endsWith('.xlsx') || 
                        suggestedFilename.toLowerCase().endsWith('.xls') ||
                        suggestedFilename.toLowerCase().includes('excel');
    expect(isExcelFile).toBeTruthy();
    console.log('✓ File is an Excel file');

    // Step 7: Wait for download to complete and save it
    console.log('[STEP 7] Waiting for download to complete...');
    const path = await download.path();
    expect(path).toBeTruthy();
    console.log(`✓ Download completed. File saved at: ${path}`);

    await page.screenshot({ path: 'artifacts/account-manager-report-export.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ACCOUNT MANAGER COLUMN CLICK TEST ====================

  test('should verify click on account manager column value leads to mrr report page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Click on Account Manager Column Value ===');
    
    const accountManagerReportPage = new AccountManagerReportPage(page);

    // Step 1: Navigate to Account Manager Report page
    console.log('[STEP 1] Navigating to Account Manager Report page...');
    await accountManagerReportPage.gotoAccountManagerReport(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await accountManagerReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await accountManagerReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Account Manager Report page is loaded');

    // Step 2: Get Account Manager column values from the table
    console.log('[STEP 2] Getting Account Manager column values from table...');
    const accountManagerValues = await accountManagerReportPage.getAccountManagerColumnValues();
    expect(accountManagerValues.length).toBeGreaterThan(0);
    console.log(`✓ Found ${accountManagerValues.length} account manager(s) in table`);
    console.log(`  Account Managers: ${accountManagerValues.slice(0, 5).join(', ')}${accountManagerValues.length > 5 ? '...' : ''}`);

    // Step 3: Click on the first available Account Manager column value
    console.log('[STEP 3] Clicking on Account Manager column value...');
    const accountManagerToClick = accountManagerValues[0];
    console.log(`  Clicking on: "${accountManagerToClick}"`);
    
    await accountManagerReportPage.clickAccountManagerColumnValue(accountManagerToClick);
    await page.waitForTimeout(3000);
    console.log('✓ Clicked on Account Manager column value');

    // Step 4: Verify navigation to MRR Report page
    console.log('[STEP 4] Verifying navigation to MRR Report page...');
    const isMRRReportPage = await accountManagerReportPage.isMRRReportPage();
    expect(isMRRReportPage).toBeTruthy();
    console.log('✓ Navigated to MRR Report page');

    // Step 5: Verify URL contains mrrReport
    console.log('[STEP 5] Verifying URL...');
    const currentUrl = page.url();
    expect(currentUrl).toContain('mrrReport');
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 6: Verify MRR Report page heading is visible
    console.log('[STEP 6] Verifying MRR Report page heading...');
    const mrrReportHeading = page.locator('h1:has-text("MRR Report"), h2:has-text("MRR Report"), *:has-text("MRR Report"):not(div.dropdown-sidebar-items):not(li):not(script):not(style)').first();
    const isHeadingVisible = await mrrReportHeading.isVisible({ timeout: 10000 });
    expect(isHeadingVisible).toBeTruthy();
    
    if (isHeadingVisible) {
      const headingText = await mrrReportHeading.textContent();
      console.log(`✓ MRR Report page heading: "${headingText?.trim()}"`);
    }

    await page.screenshot({ path: 'artifacts/account-manager-column-click-navigation.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== DATE PICKER TEST ====================

  test('should verify search by datePicker - check table shows data with current year and month, previous year', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Date Picker Search ===');
    
    const accountManagerReportPage = new AccountManagerReportPage(page);

    // Step 1: Navigate to Account Manager Report page
    console.log('[STEP 1] Navigating to Account Manager Report page...');
    await accountManagerReportPage.gotoAccountManagerReport(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await accountManagerReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await accountManagerReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Account Manager Report page is loaded');

    // Step 2: Get current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
    
    console.log(`[STEP 2] Current date: ${currentMonth}/${currentYear}`);

    // Step 3: Set date picker to current year and month
    console.log(`[STEP 3] Setting date picker to current month and year (${currentMonth}/${currentYear})...`);
    await accountManagerReportPage.setDatePicker(currentMonth, currentYear);
    console.log('✓ Date picker set to current month and year');

    // Step 4: Wait for table to update
    console.log('[STEP 4] Waiting for table to update...');
    await accountManagerReportPage.waitForTableUpdate();
    console.log('✓ Table update completed');

    // Step 5: Verify date picker value shows current date
    console.log('[STEP 5] Verifying date picker value...');
    const datePickerValue = await accountManagerReportPage.getDatePickerValue();
    expect(datePickerValue).toBeTruthy();
    console.log(`✓ Date picker value: "${datePickerValue}"`);

    // Step 6: Verify table shows data for current month/year
    console.log('[STEP 6] Verifying table shows data for current month/year...');
    const hasCurrentData = await accountManagerReportPage.hasTableData();
    expect(hasCurrentData).toBeTruthy();
    console.log('✓ Table has data for current month/year');
    
    const currentRowCount = await accountManagerReportPage.getTableRowCount();
    console.log(`✓ Table row count for current month/year: ${currentRowCount}`);

    // Step 7: Set date picker to previous year
    const previousYear = currentYear - 1;
    console.log(`[STEP 7] Setting date picker to previous year (${currentMonth}/${previousYear})...`);
    await accountManagerReportPage.setDatePicker(currentMonth, previousYear);
    console.log('✓ Date picker set to previous year');

    // Step 8: Wait for table to update
    console.log('[STEP 8] Waiting for table to update...');
    await accountManagerReportPage.waitForTableUpdate();
    console.log('✓ Table update completed');

    // Step 9: Verify date picker value shows previous year
    console.log('[STEP 9] Verifying date picker value shows previous year...');
    const datePickerValuePrevious = await accountManagerReportPage.getDatePickerValue();
    expect(datePickerValuePrevious).toBeTruthy();
    console.log(`✓ Date picker value: "${datePickerValuePrevious}"`);

    // Step 10: Verify table shows data for previous year
    console.log('[STEP 10] Verifying table shows data for previous year...');
    const hasPreviousData = await accountManagerReportPage.hasTableData();
    expect(hasPreviousData).toBeTruthy();
    console.log('✓ Table has data for previous year');
    
    const previousRowCount = await accountManagerReportPage.getTableRowCount();
    console.log(`✓ Table row count for previous year: ${previousRowCount}`);

    // Step 11: Set date picker back to current year and month
    console.log(`[STEP 11] Setting date picker back to current month and year (${currentMonth}/${currentYear})...`);
    await accountManagerReportPage.setDatePicker(currentMonth, currentYear);
    await accountManagerReportPage.waitForTableUpdate();
    console.log('✓ Date picker reset to current month and year');

    await page.screenshot({ path: 'artifacts/account-manager-report-datepicker.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });
});

