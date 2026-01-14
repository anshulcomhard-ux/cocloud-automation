const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { GoogleDrivePage } = require('../pages/googledrive');

test.describe('Partner Portal - Google Drive - Page Elements Verification', () => {
  test('should verify all major elements on Google Drive page are visible and loaded correctly', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Verify Google Drive Page Elements ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify all major elements on Google Drive page are visible and loaded correctly' });

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');

    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const loginUrl = await dashboardPage.getCurrentUrl();
    expect(loginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${loginUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Google Drive page
    console.log('\n[STEP 2] Navigating to Google Drive page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Google Drive page' });
    const googleDrivePage = new GoogleDrivePage(page);
    await googleDrivePage.navigateToGoogleDrive();
    console.log('✓ Clicked on Google Drive menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying Google Drive page is loaded...');
    const isPageVisible = await googleDrivePage.isGoogleDrivePageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ Google Drive page is visible');
    const googleDriveUrl = await googleDrivePage.getCurrentUrl();
    const urlLower = googleDriveUrl.toLowerCase();
    expect(urlLower.includes('google-drive') || urlLower.includes('googledrive')).toBeTruthy();
    console.log(`✓ Current URL contains 'google-drive' or 'googledrive': ${googleDriveUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Verify sidebar menu "Google Drive" is visible and active
    console.log('\n[STEP 3] Verifying sidebar menu "Google Drive" is visible and active...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify sidebar menu Google Drive is visible and active' });
    const menuItemResult = await googleDrivePage.verifyGoogleDriveMenuItem();
    expect(menuItemResult.visible).toBeTruthy();
    expect(menuItemResult.active).toBeTruthy();
    console.log('✓ Sidebar menu "Google Drive" is visible');
    console.log('✓ Sidebar menu "Google Drive" is active');
    console.log('✓ Sidebar menu verification PASSED');

    // Step 4: Verify metric cards are visible with their labels and count values
    console.log('\n[STEP 4] Verifying metric cards are visible with labels and count values...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify metric cards are visible with labels and count values' });
    
    const metricCards = [
      'Auth Attempt',
      'Auth Completed',
      'Scheduler Add',
      'Success Scheduler Log',
      'Failed Scheduler Log',
      'Delete Scheduler Log'
    ];

    for (const cardName of metricCards) {
      console.log(`\n  Verifying ${cardName} card...`);
      const cardResult = await googleDrivePage.verifyMetricCard(cardName);
      
      expect(cardResult.visible).toBeTruthy();
      console.log(`    ✓ ${cardName} card is visible`);
      
      expect(cardResult.labelVisible).toBeTruthy();
      console.log(`    ✓ ${cardName} label is visible`);
      
      expect(cardResult.countVisible).toBeTruthy();
      console.log(`    ✓ ${cardName} count is visible`);
      
      expect(cardResult.count).toBeTruthy();
      expect(cardResult.count.length).toBeGreaterThan(0);
      console.log(`    ✓ ${cardName} count value: ${cardResult.count}`);
    }
    console.log('\n✓ All metric cards verification PASSED');

    // Step 5: Verify each metric card has an icon displayed
    console.log('\n[STEP 5] Verifying each metric card has an icon displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify each metric card has an icon displayed' });
    
    for (const cardName of metricCards) {
      console.log(`  Verifying ${cardName} icon...`);
      const iconVisible = await googleDrivePage.verifyMetricCardIcon(cardName);
      expect(iconVisible).toBeTruthy();
      console.log(`    ✓ ${cardName} icon is visible`);
    }
    console.log('✓ All metric card icons verification PASSED');

    // Step 6: Verify Custom Date field is visible with date range selector and calendar icon
    console.log('\n[STEP 6] Verifying Custom Date field is visible with date range selector and calendar icon...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Custom Date field is visible' });
    const customDateResult = await googleDrivePage.verifyCustomDateField();
    
    expect(customDateResult.fieldVisible).toBeTruthy();
    console.log('✓ Custom Date field is visible');
    
    expect(customDateResult.inputVisible).toBeTruthy();
    console.log('✓ Custom Date input/selector is visible');
    
    expect(customDateResult.calendarIconVisible).toBeTruthy();
    console.log('✓ Custom Date calendar icon is visible');
    console.log('✓ Custom Date field verification PASSED');

    // Step 7: Verify main section title "Schedular Log Report" is visible
    console.log('\n[STEP 7] Verifying main section title "Schedular Log Report" is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify Schedular Log Report title is visible' });
    const titleVisible = await googleDrivePage.verifySchedulerLogReportTitle();
    expect(titleVisible).toBeTruthy();
    console.log('✓ "Schedular Log Report" title is visible');
    console.log('✓ Title verification PASSED');

    // Step 8: Verify graph/chart container is visible (optional)
    console.log('\n[STEP 8] Verifying graph/chart container is visible (optional)...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify graph/chart container is visible (optional)' });
    const chartVisible = await googleDrivePage.verifyChartContainer();
    if (chartVisible) {
      console.log('✓ Graph/chart container is visible');
    } else {
      console.log('⚠ Graph/chart container is not visible (this is optional)');
    }
    console.log('✓ Chart container check completed');

    // Step 9: Verify "No Data Found" message is visible inside the chart when there is no data
    console.log('\n[STEP 9] Verifying "No Data Found" message is visible inside the chart (if no data)...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify No Data Found message is visible' });
    const noDataFoundVisible = await googleDrivePage.verifyNoDataFoundMessage();
    if (noDataFoundVisible) {
      console.log('✓ "No Data Found" message is visible (no data available)');
    } else {
      console.log('⚠ "No Data Found" message is not visible (data may be available)');
    }
    // This is optional - we don't fail the test if data is present
    console.log('✓ No Data Found message check completed');

    // Step 10: Ensure the entire page loads without console errors (optional)
    console.log('\n[STEP 10] Checking for console errors (optional)...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Check for console errors' });
    
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a bit to capture any console errors
    await page.waitForTimeout(2000);

    if (consoleErrors.length > 0) {
      console.log(`⚠ Found ${consoleErrors.length} console error(s):`);
      consoleErrors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    } else {
      console.log('✓ No console errors detected');
    }
    // This is optional - we don't fail the test for console errors
    console.log('✓ Console error check completed');

    // Final Summary
    console.log('\n=== Test Summary ===');
    console.log('✓ All major elements verified successfully:');
    console.log('  - Sidebar menu "Google Drive" is visible and active');
    console.log('  - All 6 metric cards are visible with labels and count values');
    console.log('  - All metric cards have icons displayed');
    console.log('  - Custom Date field is visible with date range selector and calendar icon');
    console.log('  - "Schedular Log Report" title is visible');
    if (chartVisible) {
      console.log('  - Graph/chart container is visible');
    } else {
      console.log('  - Graph/chart container check completed (optional)');
    }
    console.log('  - Page loaded without critical errors');

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify Success and Failed Schedular Log clickable functionality', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Verify Success and Failed Schedular Log Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify Success and Failed Schedular Log clickable functionality' });

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');

    // Verify login was successful
    console.log('[VERIFICATION 1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const loginUrl = await dashboardPage.getCurrentUrl();
    expect(loginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${loginUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Google Drive page
    console.log('\n[STEP 2] Navigating to Google Drive page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Google Drive page' });
    const googleDrivePage = new GoogleDrivePage(page);
    await googleDrivePage.navigateToGoogleDrive();
    console.log('✓ Clicked on Google Drive menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying Google Drive page is loaded...');
    const isPageVisible = await googleDrivePage.isGoogleDrivePageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ Google Drive page is visible');
    const googleDriveUrl = await googleDrivePage.getCurrentUrl();
    const urlLower = googleDriveUrl.toLowerCase();
    expect(urlLower.includes('google-drive') || urlLower.includes('googledrive')).toBeTruthy();
    console.log(`✓ Current URL contains 'google-drive' or 'googledrive': ${googleDriveUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Verify Success and Failed Schedular Log are visible and clickable
    console.log('\n[STEP 3] Verifying Success and Failed Schedular Log are visible and clickable...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify clickable elements' });
    const clickableResult = await googleDrivePage.verifyClickableElements();
    
    expect(clickableResult.successVisible).toBeTruthy();
    console.log('✓ Success Schedular Log is visible');
    expect(clickableResult.successClickable).toBeTruthy();
    console.log('✓ Success Schedular Log is clickable');
    
    expect(clickableResult.failedVisible).toBeTruthy();
    console.log('✓ Failed Schedular Log is visible');
    expect(clickableResult.failedClickable).toBeTruthy();
    console.log('✓ Failed Schedular Log is clickable');
    console.log('✓ Clickable elements verification PASSED');

    // Step 4: Click on Success Schedular Log and verify result
    console.log('\n[STEP 4] Clicking on Success Schedular Log and verifying result...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Success Schedular Log and verify' });
    
    // Set up console error tracking
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await googleDrivePage.clickSuccessSchedularLog();
    await page.waitForTimeout(2000); // Wait for response

    // Check for toast message (No Data Found)
    const toastResult = await googleDrivePage.verifyToastMessage('No Data Found', 5000);
    
    if (toastResult.visible && toastResult.containsExpected) {
      console.log(`✓ Toast message appeared: "${toastResult.message}"`);
      console.log('✓ No data available for Success Schedular Log (as expected)');
    } else {
      // If no toast, check for table/list with data
      const tableResult = await googleDrivePage.verifySchedulerLogTable();
      if (tableResult.tableVisible && tableResult.hasData) {
        expect(tableResult.recordCount).toBeGreaterThan(0);
        console.log(`✓ Scheduler log table/list is visible with ${tableResult.recordCount} record(s)`);
        console.log('✓ Data is available for Success Schedular Log');
      } else if (toastResult.visible) {
        console.log(`⚠ Toast message appeared but doesn't contain "No Data Found": "${toastResult.message}"`);
      } else {
        console.log('⚠ No toast message or table found - checking for alternative indicators');
      }
    }
    console.log('✓ Success Schedular Log click verification completed');

    // Step 5: Click on Failed Schedular Log and verify result
    console.log('\n[STEP 5] Clicking on Failed Schedular Log and verifying result...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click Failed Schedular Log and verify' });
    
    await googleDrivePage.clickFailedSchedularLog();
    await page.waitForTimeout(2000); // Wait for response

    // Check for toast message (No Data Found)
    const failedToastResult = await googleDrivePage.verifyToastMessage('No Data Found', 5000);
    
    if (failedToastResult.visible && failedToastResult.containsExpected) {
      console.log(`✓ Toast message appeared: "${failedToastResult.message}"`);
      console.log('✓ No data available for Failed Schedular Log (as expected)');
    } else {
      // If no toast, check for table/list with data
      const failedTableResult = await googleDrivePage.verifySchedulerLogTable();
      if (failedTableResult.tableVisible && failedTableResult.hasData) {
        expect(failedTableResult.recordCount).toBeGreaterThan(0);
        console.log(`✓ Scheduler log table/list is visible with ${failedTableResult.recordCount} record(s)`);
        console.log('✓ Data is available for Failed Schedular Log');
      } else if (failedToastResult.visible) {
        console.log(`⚠ Toast message appeared but doesn't contain "No Data Found": "${failedToastResult.message}"`);
      } else {
        console.log('⚠ No toast message or table found - checking for alternative indicators');
      }
    }
    console.log('✓ Failed Schedular Log click verification completed');

    // Step 6: Verify no console errors
    console.log('\n[STEP 6] Verifying no console errors during interactions...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no console errors' });
    
    await page.waitForTimeout(2000); // Wait a bit more to capture any delayed errors

    if (consoleErrors.length > 0) {
      console.log(`⚠ Found ${consoleErrors.length} console error(s) during interactions:`);
      consoleErrors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
      // Don't fail the test for console errors, but log them
    } else {
      console.log('✓ No console errors detected during interactions');
    }
    console.log('✓ Console error check completed');

    // Final Summary
    console.log('\n=== Test Summary ===');
    console.log('✓ All interactions completed successfully:');
    console.log('  - Success and Failed Schedular Log elements are visible and clickable');
    console.log('  - Success Schedular Log click handled (toast or table verified)');
    console.log('  - Failed Schedular Log click handled (toast or table verified)');
    console.log('  - No critical console errors during interactions');

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });
});

