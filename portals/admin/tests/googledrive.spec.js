const { test, expect } = require('@playwright/test');
const { GoogleDrivePage } = require('../pages/googledrive');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Google Drive Module', () => {
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

  // ==================== PAGE ELEMENTS VISIBILITY TEST ====================

  test('should verify all major elements on Google Drive page are visible and loaded correctly', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify All Major Elements on Google Drive Page ===');
    
    const googleDrivePage = new GoogleDrivePage(page);

    // Step 1: Navigate to Google Drive page
    console.log('[STEP 1] Navigating to Google Drive page...');
    try {
      await googleDrivePage.gotoGoogleDrive(baseUrl);
      await page.waitForTimeout(3000);
      const currentUrl = page.url();
      console.log(`✓ Navigated to Google Drive page: ${currentUrl}`);
      
      // Verify we're on the correct page
      if (!currentUrl.includes('google-drive') && !currentUrl.includes('googledrive')) {
        console.log(`  ⚠ Warning: URL does not contain 'google-drive': ${currentUrl}`);
      }
    } catch (error) {
      console.log(`  ✗ Error navigating: ${error.message}`);
      throw error;
    }

    // Step 2: Verify page is loaded
    console.log('\n[STEP 2] Verifying page is loaded...');
    const isPageLoaded = await googleDrivePage.isPageLoaded();
    if (!isPageLoaded) {
      // Try to get more debugging info
      const currentUrl = page.url();
      const pageTitle = await page.title();
      console.log(`  Current URL: ${currentUrl}`);
      console.log(`  Page Title: ${pageTitle}`);
      
      // Try to find any visible elements
      const bodyText = await page.locator('body').textContent().catch(() => '');
      if (bodyText.includes('Google Drive')) {
        console.log('  ℹ "Google Drive" text found in page body');
      } else {
        console.log('  ⚠ "Google Drive" text not found in page body');
      }
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Google Drive page is loaded');

    // Step 3: Verify page title
    console.log('\n[STEP 3] Verifying page title...');
    const isTitleVisible = await googleDrivePage.isElementVisible(googleDrivePage.pageTitle, 'Page Title');
    expect(isTitleVisible).toBeTruthy();
    const titleText = await googleDrivePage.pageTitle.textContent();
    expect(titleText?.trim().toLowerCase()).toContain('google drive');
    console.log(`✓ Page title verified: "${titleText?.trim()}"`);

    // Step 4: Verify Custom Date selector
    console.log('\n[STEP 4] Verifying Custom Date selector...');
    const isDateSelectorVisible = await googleDrivePage.isElementVisible(googleDrivePage.customDateSelector, 'Custom Date Selector');
    // Date selector might be a button or input, so check both
    if (!isDateSelectorVisible) {
      const isDateButtonVisible = await googleDrivePage.isElementVisible(googleDrivePage.customDateButton, 'Custom Date Button');
      expect(isDateButtonVisible || isDateSelectorVisible).toBeTruthy();
    } else {
      expect(isDateSelectorVisible).toBeTruthy();
    }

    // Step 5: Verify Auth Attempt card
    console.log('\n[STEP 5] Verifying Auth Attempt metric card...');
    const isAuthAttemptVisible = await googleDrivePage.isElementVisible(googleDrivePage.authAttemptCard, 'Auth Attempt Card');
    expect(isAuthAttemptVisible).toBeTruthy();

    // Step 6: Verify Auth Completed card
    console.log('\n[STEP 6] Verifying Auth Completed metric card...');
    const isAuthCompletedVisible = await googleDrivePage.isElementVisible(googleDrivePage.authCompletedCard, 'Auth Completed Card');
    expect(isAuthCompletedVisible).toBeTruthy();

    // Step 7: Verify Schedular Add card
    console.log('\n[STEP 7] Verifying Schedular Add metric card...');
    const isSchedulerAddVisible = await googleDrivePage.isElementVisible(googleDrivePage.schedulerAddCard, 'Schedular Add Card');
    expect(isSchedulerAddVisible).toBeTruthy();

    // Step 8: Verify Success Schedular Log card
    console.log('\n[STEP 8] Verifying Success Schedular Log metric card...');
    const isSuccessSchedulerLogVisible = await googleDrivePage.isElementVisible(googleDrivePage.successSchedulerLogCard, 'Success Schedular Log Card');
    expect(isSuccessSchedulerLogVisible).toBeTruthy();

    // Step 9: Verify Failed Schedular Log card
    console.log('\n[STEP 9] Verifying Failed Schedular Log metric card...');
    const isFailedSchedulerLogVisible = await googleDrivePage.isElementVisible(googleDrivePage.failedSchedulerLogCard, 'Failed Schedular Log Card');
    expect(isFailedSchedulerLogVisible).toBeTruthy();

    // Step 10: Verify Delete Schedular Log card
    console.log('\n[STEP 10] Verifying Delete Schedular Log metric card...');
    const isDeleteSchedulerLogVisible = await googleDrivePage.isElementVisible(googleDrivePage.deleteSchedulerLogCard, 'Delete Schedular Log Card');
    expect(isDeleteSchedulerLogVisible).toBeTruthy();

    // Step 11: Verify Schedular Log Report section
    console.log('\n[STEP 11] Verifying Schedular Log Report section...');
    const isReportSectionVisible = await googleDrivePage.isElementVisible(googleDrivePage.schedulerLogReportSection, 'Schedular Log Report Section');
    expect(isReportSectionVisible).toBeTruthy();

    // Step 12: Verify all metric cards are present
    console.log('\n[STEP 12] Verifying all metric cards are present...');
    const metricCardsCount = await googleDrivePage.metricCards.count();
    expect(metricCardsCount).toBeGreaterThanOrEqual(6);

    await page.screenshot({ path: 'artifacts/googledrive-page-elements.png', fullPage: true });
    console.log('\n✓ Test completed successfully - All major elements are visible and loaded correctly');
  });

  

  
});

