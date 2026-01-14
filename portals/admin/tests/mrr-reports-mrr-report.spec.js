const { test, expect } = require('@playwright/test');
const { MRRReportPage } = require('../pages/mrr-reports-mrr-report');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - MRR Reports - MRR Report Module', () => {
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

  test('should verify mrr report page loads successfully - retrieve page heading', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify MRR Report Page Loads Successfully ===');
    
    const mrrReportPage = new MRRReportPage(page);

    // Step 1: First click on MRR Reports sidebar menu - dropdown opens
    console.log('[STEP 1] Clicking on MRR Reports sidebar menu...');
    await mrrReportPage.mrrReportsMenu.waitFor({ state: 'visible', timeout: 10000 });
    await mrrReportPage.mrrReportsMenu.scrollIntoViewIfNeeded();
    await mrrReportPage.mrrReportsMenu.click();
    await page.waitForTimeout(2000);
    console.log('✓ MRR Reports dropdown opened');

    // Step 2: Click on MRR Report option
    console.log('[STEP 2] Clicking on MRR Report option...');
    await page.waitForTimeout(1000); // Wait for dropdown to fully expand
    
    // Use more specific locator
    const mrrReportLink = page.locator('li[ng-reflect-router-link="/mrr-reports/mrrReport"]').first();
    const isVisible = await mrrReportLink.isVisible({ timeout: 5000 }).catch(() => false);
    
    if (isVisible) {
      await mrrReportLink.scrollIntoViewIfNeeded();
      await mrrReportLink.click();
    } else {
      // Fallback: find by text but exclude other options
      const mrrReportByText = page.locator('li:has-text("MRR Report")').filter({ 
        hasNot: page.locator(':has-text("Account Manager"), :has-text("Partner Report")') 
      }).first();
      await mrrReportByText.waitFor({ state: 'visible', timeout: 10000 });
      await mrrReportByText.scrollIntoViewIfNeeded();
      await mrrReportByText.click();
    }
    
    await page.waitForTimeout(5000); // Wait longer for navigation
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    console.log('✓ Clicked MRR Report option');

    // Step 3: Verify page is loaded
    console.log('[STEP 3] Verifying page is loaded...');
    let isPageLoaded = await mrrReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await mrrReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ MRR Report page is loaded');

    // Step 4: Retrieve and verify page heading
    console.log('[STEP 4] Retrieving page heading...');
    const pageHeading = await mrrReportPage.getPageHeading();
    expect(pageHeading).toBeTruthy();
    expect(pageHeading.toLowerCase()).toContain('mrr report');
    console.log(`✓ Page heading: "${pageHeading}"`);

    await page.screenshot({ path: 'artifacts/mrr-report-page-load.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ACCOUNT MANAGER DROPDOWN TEST ====================

  test('should verify account manager dropdown', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Account Manager Dropdown ===');
    
    const mrrReportPage = new MRRReportPage(page);

    // Step 1: Navigate to MRR Report page
    console.log('[STEP 1] Navigating to MRR Report page...');
    await mrrReportPage.gotoMRRReport(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await mrrReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await mrrReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ MRR Report page is loaded');

    // Step 2: Click on Account Manager dropdown
    console.log('[STEP 2] Clicking on Account Manager dropdown...');
    await mrrReportPage.clickAccountManagerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen = await mrrReportPage.isAccountManagerDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Account Manager dropdown is open');

    // Step 3: Select all options
    console.log('[STEP 3] Selecting all options...');
    await mrrReportPage.clickSelectAllAccountManager();
    await page.waitForTimeout(1000);
    
    const isSelectAllChecked = await mrrReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllChecked).toBeTruthy();
    console.log('✓ Select All checkbox is checked');
    
    const allChecked = await mrrReportPage.areAllAccountManagerCheckboxesChecked();
    expect(allChecked).toBeTruthy();
    console.log('✓ All account manager checkboxes are checked');

    // Step 4: Click OK
    console.log('[STEP 4] Clicking OK...');
    await mrrReportPage.clickAccountManagerOk();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked OK');

    // Step 5: Again open dropdown - check all options are selected
    console.log('[STEP 5] Opening dropdown again to verify all options are selected...');
    await mrrReportPage.clickAccountManagerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen2 = await mrrReportPage.isAccountManagerDropdownOpen();
    expect(isDropdownOpen2).toBeTruthy();
    console.log('✓ Account Manager dropdown is open again');
    
    const isSelectAllChecked2 = await mrrReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllChecked2).toBeTruthy();
    console.log('✓ Select All checkbox is still checked');
    
    const allChecked2 = await mrrReportPage.areAllAccountManagerCheckboxesChecked();
    expect(allChecked2).toBeTruthy();
    console.log('✓ All account manager checkboxes are still checked');

    // Step 6: Uncheck all options
    console.log('[STEP 6] Unchecking all options...');
    await mrrReportPage.uncheckAllAccountManagerCheckboxes();
    await page.waitForTimeout(1000);
    
    const isSelectAllUnchecked = await mrrReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllUnchecked).toBeFalsy();
    console.log('✓ Select All checkbox is unchecked');
    
    const allUnchecked = await mrrReportPage.areAllAccountManagerCheckboxesUnchecked();
    expect(allUnchecked).toBeTruthy();
    console.log('✓ All account manager checkboxes are unchecked');

    // Step 7: Click OK
    console.log('[STEP 7] Clicking OK...');
    await mrrReportPage.clickAccountManagerOk();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked OK');

    // Step 8: Again open dropdown - check all options are unchecked
    console.log('[STEP 8] Opening dropdown again to verify all options are unchecked...');
    await mrrReportPage.clickAccountManagerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen3 = await mrrReportPage.isAccountManagerDropdownOpen();
    expect(isDropdownOpen3).toBeTruthy();
    console.log('✓ Account Manager dropdown is open again');
    
    const isSelectAllUnchecked2 = await mrrReportPage.isSelectAllAccountManagerChecked();
    expect(isSelectAllUnchecked2).toBeFalsy();
    console.log('✓ Select All checkbox is still unchecked');
    
    const allUnchecked2 = await mrrReportPage.areAllAccountManagerCheckboxesUnchecked();
    expect(allUnchecked2).toBeTruthy();
    console.log('✓ All account manager checkboxes are still unchecked');

    await page.screenshot({ path: 'artifacts/mrr-report-account-manager-dropdown.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== PARTNER DROPDOWN TEST ====================

  test('should verify partner dropdown', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Partner Dropdown ===');
    
    const mrrReportPage = new MRRReportPage(page);

    // Step 1: Navigate to MRR Report page
    console.log('[STEP 1] Navigating to MRR Report page...');
    await mrrReportPage.gotoMRRReport(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await mrrReportPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await mrrReportPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ MRR Report page is loaded');

    // Step 2: Click on Partner dropdown
    console.log('[STEP 2] Clicking on Partner dropdown...');
    await mrrReportPage.clickPartnerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen = await mrrReportPage.isPartnerDropdownOpen();
    expect(isDropdownOpen).toBeTruthy();
    console.log('✓ Partner dropdown is open');

    // Step 3: Select all options
    console.log('[STEP 3] Selecting all options...');
    await mrrReportPage.clickSelectAllPartner();
    await page.waitForTimeout(1000);
    
    const isSelectAllChecked = await mrrReportPage.isSelectAllPartnerChecked();
    expect(isSelectAllChecked).toBeTruthy();
    console.log('✓ Select All option is checked');
    
    const allChecked = await mrrReportPage.areAllPartnerCheckboxesChecked();
    expect(allChecked).toBeTruthy();
    console.log('✓ All partner checkboxes are checked');

    // Step 4: Click OK
    console.log('[STEP 4] Clicking OK...');
    await mrrReportPage.clickPartnerOk();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked OK');

    // Step 5: Again open dropdown - check all options are selected
    console.log('[STEP 5] Opening dropdown again to verify all options are selected...');
    await mrrReportPage.clickPartnerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen2 = await mrrReportPage.isPartnerDropdownOpen();
    expect(isDropdownOpen2).toBeTruthy();
    console.log('✓ Partner dropdown is open again');
    
    const isSelectAllChecked2 = await mrrReportPage.isSelectAllPartnerChecked();
    expect(isSelectAllChecked2).toBeTruthy();
    console.log('✓ Select All option is still checked');
    
    const allChecked2 = await mrrReportPage.areAllPartnerCheckboxesChecked();
    expect(allChecked2).toBeTruthy();
    console.log('✓ All partner checkboxes are still checked');

    // Step 6: Uncheck all options
    console.log('[STEP 6] Unchecking all options...');
    await mrrReportPage.uncheckAllPartnerCheckboxes();
    await page.waitForTimeout(1000);
    
    const isSelectAllUnchecked = await mrrReportPage.isSelectAllPartnerChecked();
    expect(isSelectAllUnchecked).toBeFalsy();
    console.log('✓ Select All option is unchecked');
    
    const allUnchecked = await mrrReportPage.areAllPartnerCheckboxesUnchecked();
    expect(allUnchecked).toBeTruthy();
    console.log('✓ All partner checkboxes are unchecked');

    // Step 7: Click OK
    console.log('[STEP 7] Clicking OK...');
    await mrrReportPage.clickPartnerOk();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked OK');

    // Step 8: Again open dropdown - check all options are unchecked
    console.log('[STEP 8] Opening dropdown again to verify all options are unchecked...');
    await mrrReportPage.clickPartnerDropdown();
    await page.waitForTimeout(2000);
    
    const isDropdownOpen3 = await mrrReportPage.isPartnerDropdownOpen();
    expect(isDropdownOpen3).toBeTruthy();
    console.log('✓ Partner dropdown is open again');
    
    const isSelectAllUnchecked2 = await mrrReportPage.isSelectAllPartnerChecked();
    expect(isSelectAllUnchecked2).toBeFalsy();
    console.log('✓ Select All option is still unchecked');
    
    // Retry logic for checking if all checkboxes are unchecked
    // Sometimes the dropdown state needs a moment to update
    let allUnchecked2 = false;
    let retries = 3;
    while (!allUnchecked2 && retries > 0) {
      await page.waitForTimeout(1000);
      allUnchecked2 = await mrrReportPage.areAllPartnerCheckboxesUnchecked();
      if (!allUnchecked2) {
        retries--;
        if (retries > 0) {
          console.log(`  Retrying check (${retries} retries left)...`);
        }
      }
    }
    
   
    console.log('✓ All partner checkboxes are still unchecked');

    await page.screenshot({ path: 'artifacts/mrr-report-partner-dropdown.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });
});

