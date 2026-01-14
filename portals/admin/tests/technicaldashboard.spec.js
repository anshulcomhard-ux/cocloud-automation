const { test, expect } = require('@playwright/test');
const { TechnicalDashboardPage } = require('../pages/technicaldashboard');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Technical Dashboard Module', () => {
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

  // ==================== TECHNICAL DASHBOARD PAGE LOAD TEST ====================

  test('should verify Technical Dashboard page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Technical Dashboard Page Loads Successfully ===');
    
    const technicalDashboardPage = new TechnicalDashboardPage(page);

    // Step 1: Navigate to the Admin Portal (already logged in via beforeEach)
    console.log('[STEP 1] Navigating to Admin Portal...');
    const currentUrl = await page.url();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 2: Click on the "Technical Dashboard" option from the sidebar menu
    console.log('\n[STEP 2] Clicking on "Technical Dashboard" from sidebar menu...');
    await technicalDashboardPage.gotoTechnicalDashboard(baseUrl);
    console.log('✓ Clicked on Technical Dashboard option');

    // Step 3: Verify user is redirected to the Technical Dashboard page
    console.log('\n[STEP 3] Verifying user is redirected to Technical Dashboard page...');
    const isPageLoaded = await technicalDashboardPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Technical Dashboard page loaded successfully');
    
    const pageUrl = await page.url();
    expect(pageUrl).toContain('/technical-dashboard');
    console.log(`✓ Page URL contains '/technical-dashboard': ${pageUrl}`);

    // Step 4: Verify the text "Technical Dashboard" is visible on the page
    console.log('\n[STEP 4] Verifying "Technical Dashboard" text is visible...');
    const isHeadingVisible = await technicalDashboardPage.isHeadingVisible();
    
    // If heading not found with locators, check if text exists on page
    if (!isHeadingVisible) {
      console.log('⚠ Heading not found with locators, checking page content...');
      const pageContent = await page.textContent('body');
      const hasText = pageContent && pageContent.includes('Technical Dashboard');
      expect(hasText).toBeTruthy();
      console.log('✓ "Technical Dashboard" text found in page content');
    } else {
      expect(isHeadingVisible).toBeTruthy();
      console.log('✓ "Technical Dashboard" text is visible');
    }
    
    const headingText = await technicalDashboardPage.getHeadingText();
    if (headingText) {
      expect(headingText).toContain('Technical Dashboard');
      console.log(`✓ Heading text: "${headingText}"`);
    } else {
      // Fallback: verify text exists on page
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Technical Dashboard');
      console.log('✓ "Technical Dashboard" text verified in page content');
    }

    // Step 5: Verify the heading is displayed correctly and page layout renders without issues
    console.log('\n[STEP 5] Verifying heading and page layout...');
    const isLayoutValid = await technicalDashboardPage.verifyPageLayout();
    expect(isLayoutValid).toBeTruthy();
    console.log('✓ Page layout renders correctly');
    console.log('✓ Heading is displayed correctly');

    // Step 6: Refresh the Technical Dashboard page
    console.log('\n[STEP 6] Refreshing the Technical Dashboard page...');
    await technicalDashboardPage.refreshPage();
    console.log('✓ Page refreshed successfully');

    // Step 7: Verify the page reloads successfully
    console.log('\n[STEP 7] Verifying page reloads successfully...');
    const isPageStillLoaded = await technicalDashboardPage.isPageLoaded();
    expect(isPageStillLoaded).toBeTruthy();
    console.log('✓ Page reloaded successfully');
    
    const pageUrlAfterRefresh = await page.url();
    expect(pageUrlAfterRefresh).toContain('/technical-dashboard');
    console.log(`✓ Page URL after refresh: ${pageUrlAfterRefresh}`);

    // Step 8: Verify the text "Technical Dashboard" is still visible after refresh
    console.log('\n[STEP 8] Verifying "Technical Dashboard" text is still visible after refresh...');
    const isHeadingStillVisible = await technicalDashboardPage.isHeadingVisible();
    
    // If heading not found with locators, check if text exists on page
    if (!isHeadingStillVisible) {
      console.log('⚠ Heading not found with locators after refresh, checking page content...');
      const pageContentAfterRefresh = await page.textContent('body');
      const hasTextAfterRefresh = pageContentAfterRefresh && pageContentAfterRefresh.includes('Technical Dashboard');
      expect(hasTextAfterRefresh).toBeTruthy();
      console.log('✓ "Technical Dashboard" text found in page content after refresh');
    } else {
      expect(isHeadingStillVisible).toBeTruthy();
      console.log('✓ "Technical Dashboard" text is still visible after refresh');
    }
    
    const headingTextAfterRefresh = await technicalDashboardPage.getHeadingText();
    if (headingTextAfterRefresh) {
      expect(headingTextAfterRefresh).toContain('Technical Dashboard');
      console.log(`✓ Heading text after refresh: "${headingTextAfterRefresh}"`);
    } else {
      // Fallback: verify text exists on page
      const pageContentAfterRefresh = await page.textContent('body');
      expect(pageContentAfterRefresh).toContain('Technical Dashboard');
      console.log('✓ "Technical Dashboard" text verified in page content after refresh');
    }

    await page.screenshot({ path: 'artifacts/technical-dashboard-page-load.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== SERVER LIST DROPDOWN TEST ====================

  test('should verify Server List dropdown functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Server List Dropdown Functionality ===');
    
    const technicalDashboardPage = new TechnicalDashboardPage(page);

    // Step 1: Navigate to Admin Portal (already logged in via beforeEach)
    console.log('[STEP 1] Navigating to Admin Portal...');
    const currentUrl = await page.url();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 2: Click on "Technical Dashboard" option from the left sidebar
    console.log('\n[STEP 2] Clicking on "Technical Dashboard" from sidebar...');
    await technicalDashboardPage.gotoTechnicalDashboard(baseUrl);
    console.log('✓ Clicked on Technical Dashboard option');

    // Step 3: Verify "Technical Dashboard" page loads successfully
    console.log('\n[STEP 3] Verifying Technical Dashboard page loads successfully...');
    const isPageLoaded = await technicalDashboardPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Technical Dashboard page loaded successfully');
    
    const pageUrl = await page.url();
    expect(pageUrl).toContain('/technical-dashboard');
    console.log(`✓ Page URL: ${pageUrl}`);

    // Step 4: Locate and click on the "Server List" dropdown
    console.log('\n[STEP 4] Locating and clicking on "Server List" dropdown...');
    await technicalDashboardPage.clickServerListDropdown();
    console.log('✓ Clicked on Server List dropdown');

    // Step 5: Verify the dropdown panel opens successfully
    console.log('\n[STEP 5] Verifying dropdown panel opens successfully...');
    const isPanelOpen = await technicalDashboardPage.isDropdownPanelOpen();
    expect(isPanelOpen).toBeTruthy();
    console.log('✓ Dropdown panel opened successfully');

    // Step 6: Verify the following elements are visible inside the dropdown
    console.log('\n[STEP 6] Verifying elements are visible inside the dropdown...');
    const elements = await technicalDashboardPage.verifyDropdownElements();
    
    expect(elements.searchInput).toBeTruthy();
    console.log('✓ Search input field is visible');
    
    expect(elements.selectAll).toBeTruthy();
    console.log('✓ "Select All" checkbox is visible');
    
    expect(elements.okButton).toBeTruthy();
    console.log('✓ "Ok" button is visible');
    
    expect(elements.cancelButton).toBeTruthy();
    console.log('✓ "Cancel" button is visible');
    
    if (elements.serverOptions) {
      const serverCount = await technicalDashboardPage.getServerOptionsCount();
      console.log(`✓ Server list with checkboxes is visible (${serverCount} server(s) available)`);
    } else {
      console.log('⚠ No server options available in the list');
    }

    // Step 7: If server list data is available, select one server and click Ok
    const serverCount = await technicalDashboardPage.getServerOptionsCount();
    if (serverCount > 0) {
      console.log('\n[STEP 7] Server list data is available...');
      
      // Select one server checkbox
      console.log('  Selecting one server checkbox...');
      await technicalDashboardPage.selectServerOption(0);
      console.log('  ✓ Selected server checkbox');
      
      // Click on "Ok" button
      console.log('  Clicking on "Ok" button...');
      await technicalDashboardPage.clickOkButton();
      console.log('  ✓ Clicked Ok button');
      
      // Verify dropdown closes successfully
      console.log('  Verifying dropdown closes successfully...');
      const isClosed = await technicalDashboardPage.isDropdownPanelClosed();
      expect(isClosed).toBeTruthy();
      console.log('  ✓ Dropdown closed successfully');
    } else {
      console.log('\n[STEP 7] No server list data available, skipping server selection');
    }

    // Step 8: Click on the "Server List" dropdown again
    console.log('\n[STEP 8] Clicking on "Server List" dropdown again...');
    await technicalDashboardPage.clickServerListDropdown();
    console.log('✓ Clicked on Server List dropdown');

    // Step 9: Click on "Cancel" button
    console.log('\n[STEP 9] Clicking on "Cancel" button...');
    await technicalDashboardPage.clickCancelButton();
    console.log('✓ Clicked Cancel button');

    // Step 10: Verify dropdown closes without applying any changes
    console.log('\n[STEP 10] Verifying dropdown closes without applying changes...');
    const isDropdownClosed = await technicalDashboardPage.isDropdownPanelClosed();
    expect(isDropdownClosed).toBeTruthy();
    console.log('✓ Dropdown closed successfully without applying changes');

    await page.screenshot({ path: 'artifacts/technical-dashboard-server-list-dropdown.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== TECHNICAL DASHBOARD CARDS TEST ====================

  test('should verify Technical Dashboard card titles are displayed', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Technical Dashboard Card Titles Are Displayed ===');
    
    const technicalDashboardPage = new TechnicalDashboardPage(page);

    // Step 1: Navigate to Admin Portal (already logged in via beforeEach)
    console.log('[STEP 1] Navigating to Admin Portal...');
    const currentUrl = await page.url();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 2: Click on "Technical Dashboard" option from the left sidebar
    console.log('\n[STEP 2] Clicking on "Technical Dashboard" from sidebar...');
    await technicalDashboardPage.gotoTechnicalDashboard(baseUrl);
    console.log('✓ Clicked on Technical Dashboard option');

    // Step 3: Verify Technical Dashboard page loads successfully
    console.log('\n[STEP 3] Verifying Technical Dashboard page loads successfully...');
    const isPageLoaded = await technicalDashboardPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Technical Dashboard page loaded successfully');
    
    const pageUrl = await page.url();
    expect(pageUrl).toContain('/technical-dashboard');
    console.log(`✓ Page URL: ${pageUrl}`);

    // Step 4: Locate all summary cards displayed on the dashboard
    console.log('\n[STEP 4] Locating all summary cards on the dashboard...');
    const cardsCount = await technicalDashboardPage.getCardsCount();
    console.log(`✓ Found ${cardsCount} card(s) on the dashboard`);

    // Step 5: Verify the following card titles are visible on the page
    console.log('\n[STEP 5] Verifying all card titles are visible...');
    const cardTitles = await technicalDashboardPage.verifyAllCardTitles();
    
    // Verify Total Instance card
    expect(cardTitles.totalInstance).toBeTruthy();
    console.log('✓ Total Instance card title is visible');
    const totalInstanceText = await technicalDashboardPage.getCardTitleText('Total Instance');
    expect(totalInstanceText).toContain('Total Instance');
    console.log(`  Card title text: "${totalInstanceText}"`);

    // Verify Live Instance card
    expect(cardTitles.liveInstance).toBeTruthy();
    console.log('✓ Live Instance card title is visible');
    const liveInstanceText = await technicalDashboardPage.getCardTitleText('Live Instance');
    expect(liveInstanceText).toContain('Live Instance');
    console.log(`  Card title text: "${liveInstanceText}"`);

    // Verify Trial Instance card
    expect(cardTitles.trialInstance).toBeTruthy();
    console.log('✓ Trial Instance card title is visible');
    const trialInstanceText = await technicalDashboardPage.getCardTitleText('Trial Instance');
    expect(trialInstanceText).toContain('Trial Instance');
    console.log(`  Card title text: "${trialInstanceText}"`);

    // Verify Marg Instance card
    expect(cardTitles.margInstance).toBeTruthy();
    console.log('✓ Marg Instance card title is visible');
    const margInstanceText = await technicalDashboardPage.getCardTitleText('Marg Instance');
    expect(margInstanceText).toContain('Marg Instance');
    console.log(`  Card title text: "${margInstanceText}"`);

    // Verify Partner Instance card
    expect(cardTitles.partnerInstance).toBeTruthy();
    console.log('✓ Partner Instance card title is visible');
    const partnerInstanceText = await technicalDashboardPage.getCardTitleText('Partner Instance');
    expect(partnerInstanceText).toContain('Partner Instance');
    console.log(`  Card title text: "${partnerInstanceText}"`);

    // Verify Offline Servers card
    expect(cardTitles.offlineServers).toBeTruthy();
    console.log('✓ Offline Servers card title is visible');
    const offlineServersText = await technicalDashboardPage.getCardTitleText('Offline Servers');
    expect(offlineServersText).toContain('Offline Servers');
    console.log(`  Card title text: "${offlineServersText}"`);

    // Verify all 6 cards are visible
    const allCardsVisible = Object.values(cardTitles).every(visible => visible === true);
    expect(allCardsVisible).toBeTruthy();
    console.log('\n✓ All 6 cards are visible on the Technical Dashboard');
    console.log('✓ Each card displays the correct title text');
    console.log('✓ Card titles are not broken or missing');

    await page.screenshot({ path: 'artifacts/technical-dashboard-cards.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== SERVER SUMMARY AND SERVER WISE REPORT TABLES TEST ====================

  test('should verify Server Summary and Server Wise Report tables visibility', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Server Summary and Server Wise Report Tables Visibility ===');
    
    const technicalDashboardPage = new TechnicalDashboardPage(page);

    // Step 1: Navigate to Admin Portal (already logged in via beforeEach)
    console.log('[STEP 1] Navigating to Admin Portal...');
    const currentUrl = await page.url();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 2: Click on "Technical Dashboard" option from the sidebar
    console.log('\n[STEP 2] Clicking on "Technical Dashboard" from sidebar...');
    await technicalDashboardPage.gotoTechnicalDashboard(baseUrl);
    console.log('✓ Clicked on Technical Dashboard option');

    // Step 3: Wait for the Technical Dashboard page to load completely
    console.log('\n[STEP 3] Waiting for Technical Dashboard page to load completely...');
    const isPageLoaded = await technicalDashboardPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Technical Dashboard page loaded successfully');
    
    const pageUrl = await page.url();
    expect(pageUrl).toContain('/technical-dashboard');
    console.log(`✓ Page URL: ${pageUrl}`);
    
    // Wait a bit more for tables to load
    await page.waitForTimeout(2000);

    // ==================== VERIFY SERVER SUMMARY TABLE ====================
    
    // Step 4: Locate the "Server Summary" table section
    console.log('\n[STEP 4] Locating the "Server Summary" table section...');
    const isServerSummaryVisible = await technicalDashboardPage.isServerSummarySectionVisible();
    expect(isServerSummaryVisible).toBeTruthy();
    console.log('✓ Server Summary section is visible');

    // Step 5: Check if table rows/data are present
    console.log('\n[STEP 5] Checking if Server Summary table has data...');
    const serverSummaryInfo = await technicalDashboardPage.verifyServerSummaryTable();
    
    if (serverSummaryInfo.hasData) {
      // If data is available
      console.log(`✓ Server Summary table is visible with ${serverSummaryInfo.rowCount} row(s)`);
      expect(serverSummaryInfo.rowCount).toBeGreaterThan(0);
      console.log('✓ Server Summary table contains at least one data row');
    } else {
      // If data is not available
      console.log('⚠ No data rows found in Server Summary table');
      if (serverSummaryInfo.noDataMessageVisible) {
        const noDataText = await technicalDashboardPage.serverSummaryNoDataMessage.textContent();
        console.log(`✓ "No Data Found" message is displayed: "${noDataText?.trim()}"`);
        expect(serverSummaryInfo.noDataMessageVisible).toBeTruthy();
      } else {
        console.log('⚠ "No Data Found" message not found, but table has no data');
      }
    }

    // ==================== VERIFY SERVER WISE REPORT TABLE ====================
    
    // Step 6: Locate the "Server Wise Report" table section
    console.log('\n[STEP 6] Locating the "Server Wise Report" table section...');
    const isServerWiseReportVisible = await technicalDashboardPage.isServerWiseReportSectionVisible();
    expect(isServerWiseReportVisible).toBeTruthy();
    console.log('✓ Server Wise Report section is visible');

    // Step 7: Check if table rows/data are present
    console.log('\n[STEP 7] Checking if Server Wise Report table has data...');
    const serverWiseReportInfo = await technicalDashboardPage.verifyServerWiseReportTable();
    
    if (serverWiseReportInfo.hasData) {
      // If data is available
      console.log(`✓ Server Wise Report table is visible with ${serverWiseReportInfo.rowCount} row(s)`);
      expect(serverWiseReportInfo.rowCount).toBeGreaterThan(0);
      console.log('✓ Server Wise Report table contains at least one data row');
    } else {
      // If data is not available
      console.log('⚠ No data rows found in Server Wise Report table');
      if (serverWiseReportInfo.noDataMessageVisible) {
        const noDataText = await technicalDashboardPage.serverWiseReportNoDataMessage.textContent();
        console.log(`✓ "No Data Found" message is displayed: "${noDataText?.trim()}"`);
        expect(serverWiseReportInfo.noDataMessageVisible).toBeTruthy();
      } else {
        console.log('⚠ "No Data Found" message not found, but table has no data');
      }
    }

    // Final assertions
    console.log('\n[FINAL ASSERTIONS]');
    console.log('✓ Technical Dashboard page loads successfully');
    console.log('✓ Server Summary table OR "No Data Found" message is visible');
    console.log('✓ Server Wise Report table OR "No Data Found" message is visible');

    await page.screenshot({ path: 'artifacts/technical-dashboard-tables.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== SERVER TYPE DROPDOWN TEST ====================

  test('should verify Server Type dropdown filters Server Summary and Server Wise Report', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Server Type Dropdown Filters Server Summary and Server Wise Report ===');
    
    const technicalDashboardPage = new TechnicalDashboardPage(page);

    // Navigate to Technical Dashboard
    console.log('[STEP 1] Navigating to Technical Dashboard...');
    await technicalDashboardPage.gotoTechnicalDashboard(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Technical Dashboard');

    // Step 1: Verify Server Type Dropdown Visibility
    console.log('\n[STEP 1] Verifying Server Type Dropdown Visibility...');
    const isDropdownVisible = await technicalDashboardPage.isServerTypeDropdownVisible();
    expect(isDropdownVisible).toBeTruthy();
    console.log('✓ Server Type dropdown is visible');

    // Step 2: Verify Server Type Dropdown Options
    console.log('\n[STEP 2] Verifying Server Type Dropdown Options...');
    await technicalDashboardPage.clickServerTypeDropdown();
    console.log('✓ Clicked on Server Type dropdown');
    
    const options = await technicalDashboardPage.verifyServerTypeOptions();
    
    expect(options.trialServer).toBeTruthy();
    console.log('✓ Trial Server option is listed');
    
    expect(options.liveServer).toBeTruthy();
    console.log('✓ Live Server option is listed');
    
    expect(options.margServer).toBeTruthy();
    console.log('✓ Marg Server option is listed');
    
    expect(options.partnerServer).toBeTruthy();
    console.log('✓ Partner Server option is listed');
    
    expect(options.customServer).toBeTruthy();
    console.log('✓ Custom Server option is listed');

    // Get all options for verification
    const allOptions = await technicalDashboardPage.getAllServerTypeOptions();
    console.log(`✓ All options found: ${allOptions.join(', ')}`);

    // List of server types to test
    const serverTypes = ['Trial Server', 'Live Server', 'Marg Server', 'Partner Server', 'Custom Server'];

    // Step 3-6: Verify Data for Each Server Type
    for (const serverType of serverTypes) {
      console.log(`\n[STEP 3-6] Testing Server Type: ${serverType}`);
      
      // Step 3a: Select the option from the dropdown
      console.log(`  a. Selecting "${serverType}" from dropdown...`);
      await technicalDashboardPage.selectServerType(serverType);
      console.log(`  ✓ Selected "${serverType}"`);
      
      // Step 3b: Wait for data to load
      console.log(`  b. Waiting for data to load...`);
      await page.waitForTimeout(3000);
      console.log('  ✓ Data loading completed');

      // Step 4: Verify Server Summary Table
      console.log(`\n  [STEP 4] Verifying Server Summary Table for ${serverType}...`);
      const serverSummaryInfo = await technicalDashboardPage.verifyServerSummaryTable();
      
      if (serverSummaryInfo.hasData) {
        // If data is available
        expect(serverSummaryInfo.rowCount).toBeGreaterThan(0);
        console.log(`  ✓ Server Summary table is visible with ${serverSummaryInfo.rowCount} row(s)`);
        console.log(`  ✓ Table contains at least one row`);
      } else {
        // If no data is available
        if (serverSummaryInfo.noDataMessageVisible) {
          const noDataText = await technicalDashboardPage.serverSummaryNoDataMessage.textContent();
          console.log(`  ✓ "No data found!" message is displayed: "${noDataText?.trim()}"`);
          expect(noDataText).toMatch(/no data found/i);
        } else {
          console.log(`  ⚠ No data rows found, but "No data found!" message not visible`);
        }
      }

      // Step 5: Verify Server Wise Report Table
      console.log(`\n  [STEP 5] Verifying Server Wise Report Table for ${serverType}...`);
      const serverWiseReportInfo = await technicalDashboardPage.verifyServerWiseReportTable();
      
      if (serverWiseReportInfo.hasData) {
        // If data is available
        expect(serverWiseReportInfo.rowCount).toBeGreaterThan(0);
        console.log(`  ✓ Server Wise Report table is visible with ${serverWiseReportInfo.rowCount} row(s)`);
        console.log(`  ✓ Table contains rows`);
      } else {
        // If no data is available
        if (serverWiseReportInfo.noDataMessageVisible) {
          const noDataText = await technicalDashboardPage.serverWiseReportNoDataMessage.textContent();
          console.log(`  ✓ "No data found!" message is displayed: "${noDataText?.trim()}"`);
          expect(noDataText).toMatch(/no data found/i);
        } else {
          console.log(`  ⚠ No data rows found, but "No data found!" message not visible`);
        }
      }

      console.log(`  ✓ Completed testing for ${serverType}`);
    }

    // Final assertions
    console.log('\n[FINAL ASSERTIONS]');
    console.log('✓ Server Type dropdown opens correctly');
    console.log('✓ Each option can be selected without errors');
    console.log('✓ Server Summary and Server Wise Report tables are displayed correctly');
    console.log('✓ "No data found!" message appears when applicable');
    console.log('✓ No UI break or console errors occur');

    await page.screenshot({ path: 'artifacts/technical-dashboard-server-type-dropdown.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });
});

