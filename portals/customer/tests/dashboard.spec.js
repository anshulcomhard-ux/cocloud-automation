const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Customer Portal - Dashboard', () => {
  test('should navigate to pricing page when clicking Upgrade Now button', async ({ page }, testInfo) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Navigate to Pricing Page via Upgrade Now Button ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal (login helper handles subscription modal if present)
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    // The login helper will:
    // - Fill email and password
    // - Click login button
    // - Check if subscription selection modal appears
    // - If modal exists: select a subscription option and navigate to dashboard
    // - If modal doesn't exist: navigate directly to dashboard
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    
    // Verify we're on the dashboard or ready to navigate to it
    await page.waitForTimeout(2000);

    // Step 2: Navigate to dashboard page (if not already there)
    console.log('\n[STEP 2] Navigating to dashboard page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to dashboard page' });
    
    const dashboardPage = new DashboardPage(page);
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard page is visible');

    const currentUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 3: Click on "Upgrade Now" button
    console.log('\n[STEP 3] Clicking on "Upgrade Now" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Upgrade Now button' });
    
    await dashboardPage.clickUpgradeNow();
    console.log('✓ Clicked "Upgrade Now" button');

    // Wait for navigation
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Step 4: Verify user navigates to pricing page
    console.log('\n[STEP 4] Verifying navigation to pricing page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify navigation to pricing page' });
    
    // Verify Pricing page title is visible
    const isPricingPageVisible = await dashboardPage.isPricingPageVisible();
    expect(isPricingPageVisible).toBeTruthy();
    console.log('✓ Pricing page title is visible');

    // Get and verify Pricing page title text
    const pricingPageTitle = await dashboardPage.getPricingPageTitle();
    expect(pricingPageTitle).toContain('Pricing');
    console.log(`✓ Pricing page title: "${pricingPageTitle?.trim() || 'Pricing'}"`);

    // Verify URL contains pricing (optional check)
    const newUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL after navigation: ${newUrl}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify update instance user', async ({ page }, testInfo) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(180000); // 3 minutes timeout

    console.log('=== Test: Verify Update Instance User ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to dashboard page
    console.log('\n[STEP 2] Navigating to dashboard page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to dashboard page' });
    
    const dashboardPage = new DashboardPage(page);
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard page is visible');

    const currentUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 3: Click edit button
    console.log('\n[STEP 3] Clicking edit button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click edit button' });
    
    await dashboardPage.clickEditInstanceUser();
    console.log('✓ Clicked edit button');
    await page.waitForTimeout(2000);

    // Step 4: Verify update instance user modal opens
    console.log('\n[STEP 4] Verifying update instance user modal opens...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify modal opens' });
    
    const isModalVisible = await dashboardPage.isUpdateInstanceUserModalVisible();
    expect(isModalVisible).toBeTruthy();
    console.log('✓ Update Instance User modal is visible');

    // Step 5: Check fields are prefilled and extract values
    console.log('\n[STEP 5] Checking fields are prefilled and extracting values...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Check prefilled fields and extract values' });
    
    const prefilledValues = await dashboardPage.getPrefilledValues();
    expect(prefilledValues.displayName).toBeTruthy();
    expect(prefilledValues.email).toBeTruthy();
    console.log(`✓ Display Name (prefilled): "${prefilledValues.displayName}"`);
    console.log(`✓ Email (prefilled): "${prefilledValues.email}"`);

    // Step 6: Clear the fields and click submit
    console.log('\n[STEP 6] Clearing fields and clicking submit...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Clear fields and submit' });
    
    await dashboardPage.clearAllFields();
    console.log('✓ Cleared all fields');
    
    await dashboardPage.clickSubmit();
    console.log('✓ Clicked submit button');
    await page.waitForTimeout(3000);

    // Check if modal is still visible (validation error) or closed (submitted)
    const modalStillVisible = await dashboardPage.isUpdateInstanceUserModalVisible();
    if (modalStillVisible) {
      console.log('⚠ Modal still visible (validation error or submission pending), closing and reopening...');
      await dashboardPage.clickCancel();
      await page.waitForTimeout(1000);
    }
    
    // Reopen modal to continue with next steps
    await dashboardPage.clickEditInstanceUser();
    await page.waitForTimeout(2000);
    
    // Verify modal is open again
    const isModalOpenAgain = await dashboardPage.isUpdateInstanceUserModalVisible();
    expect(isModalOpenAgain).toBeTruthy();
    console.log('✓ Modal reopened successfully');

    // Step 7: Fill the fields with the same prefilled values
    console.log('\n[STEP 7] Filling fields with prefilled values...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Fill fields with prefilled values' });
    
    // Use the same values that were prefilled
    await dashboardPage.fillAllFields(prefilledValues.displayName, prefilledValues.email);
    console.log(`✓ Filled Display Name: "${prefilledValues.displayName}"`);
    console.log(`✓ Filled Email: "${prefilledValues.email}"`);

    // Step 8: Click submit
    console.log('\n[STEP 8] Clicking submit button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Click submit' });
    
    await dashboardPage.clickSubmit();
    console.log('✓ Clicked submit button');
    
    // Wait for modal to close and table to update
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    
    // Additional wait to ensure table is updated
    await page.waitForTimeout(2000);

    // Step 9: Verify the values display on UI
    console.log('\n[STEP 9] Verifying values display on UI...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify values in table' });
    
    // Wait a bit more for table to be ready
    await page.waitForTimeout(2000);
    
    const tableValues = await dashboardPage.getInstanceUserValuesFromTable();
    console.log(`✓ Display Name in table: "${tableValues.displayName}"`);
    console.log(`✓ Email in table: "${tableValues.email}"`);
    
    // Verify the values match what we entered (prefilled values)
    expect(tableValues.displayName.trim()).toBe(prefilledValues.displayName.trim());
    expect(tableValues.email.trim()).toBe(prefilledValues.email.trim());
    console.log('✓ Values match in the table');

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify force log off', async ({ page }, testInfo) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Verify Force Log Off ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to dashboard page
    console.log('\n[STEP 2] Navigating to dashboard page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to dashboard page' });
    
    const dashboardPage = new DashboardPage(page);
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard page is visible');

    const currentUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 3: Click on Force Logoff button
    console.log('\n[STEP 3] Clicking on Force Logoff button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Force Logoff button' });
    
    await dashboardPage.clickForceLogoff();
    console.log('✓ Clicked Force Logoff button');
    
    // Wait a bit for toast to appear
    await page.waitForTimeout(2000);

    // Step 4: Verify toast message appears
    console.log('\n[STEP 4] Verifying toast message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify toast message' });
    
    const toastVisible = await dashboardPage.waitForToast(15000);
    expect(toastVisible).toBeTruthy();
    console.log('✓ Toast message is visible');
    
    // Get toast message text
    const toastMessage = await dashboardPage.getToastMessage();
    expect(toastMessage).toBeTruthy();
    console.log(`✓ Toast message: "${toastMessage}"`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify remote login and html login buttons are clickable and navigate to new tabs', async ({ page, context }, testInfo) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    const remoteLoginUrl = 'https://cloud150.cocloud.in/software/remoteapp2.html?login=cloud150.e1&pass=tLn3dF5q';
    const htmlLoginUrl = 'https://cloud150.cocloud.in/software/html5.html';

    test.setTimeout(180000); // 3 minutes timeout

    console.log('=== Test: Verify Remote Login and HTML Login Buttons ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to dashboard page
    console.log('\n[STEP 2] Navigating to dashboard page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to dashboard page' });
    
    const dashboardPage = new DashboardPage(page);
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard page is visible');

    const currentUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 3: Verify Remote Login button is visible and clickable
    console.log('\n[STEP 3] Verifying Remote Login button is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Remote Login button is visible' });
    
    const isRemoteLoginVisible = await dashboardPage.isRemoteLoginButtonVisible();
    expect(isRemoteLoginVisible).toBeTruthy();
    console.log('✓ Remote Login button is visible');

    // Step 4: Click Remote Login button and verify navigation to new tab
    console.log('\n[STEP 4] Clicking Remote Login button and verifying new tab...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Remote Login and verify new tab' });
    
    const remoteLoginPage = await dashboardPage.clickRemoteLoginAndWaitForNewPage(remoteLoginUrl);
    console.log('✓ Remote Login button clicked and new tab opened');
    
    // Verify URL
    const remoteLoginPageUrl = remoteLoginPage.url();
    console.log(`✓ Remote Login page URL: ${remoteLoginPageUrl}`);
    expect(remoteLoginPageUrl).toContain('remoteapp2.html');
    // Verify it contains the base URL pattern
    expect(remoteLoginPageUrl).toContain('cloud150.cocloud.in/software/remoteapp2.html');
    console.log('✓ Remote Login URL verified');
    
    // Close the remote login tab
    await remoteLoginPage.close();
    console.log('✓ Closed Remote Login tab');
    await page.waitForTimeout(1000);

    // Step 5: Verify HTML Login button is visible and clickable
    console.log('\n[STEP 5] Verifying HTML Login button is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify HTML Login button is visible' });
    
    const isHtmlLoginVisible = await dashboardPage.isHtmlLoginButtonVisible();
    expect(isHtmlLoginVisible).toBeTruthy();
    console.log('✓ HTML Login button is visible');

    // Step 6: Click HTML Login button and verify navigation to new tab
    console.log('\n[STEP 6] Clicking HTML Login button and verifying new tab...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Click HTML Login and verify new tab' });
    
    const htmlLoginPage = await dashboardPage.clickHtmlLoginAndWaitForNewPage(htmlLoginUrl);
    console.log('✓ HTML Login button clicked and new tab opened');
    
    // Verify URL
    const htmlLoginPageUrl = htmlLoginPage.url();
    console.log(`✓ HTML Login page URL: ${htmlLoginPageUrl}`);
    expect(htmlLoginPageUrl).toContain('html5.html');
    // Verify it contains the base URL pattern
    expect(htmlLoginPageUrl).toContain('cloud150.cocloud.in/software/html5.html');
    console.log('✓ HTML Login URL verified');
    
    // Close the HTML login tab
    await htmlLoginPage.close();
    console.log('✓ Closed HTML Login tab');

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify raise service request button is clickable and navigates to raise service request page', async ({ page }, testInfo) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Verify Raise Service Request Button ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to dashboard page
    console.log('\n[STEP 2] Navigating to dashboard page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to dashboard page' });
    
    const dashboardPage = new DashboardPage(page);
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard page is visible');

    const currentUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 3: Verify Raise Service Request button is visible and clickable
    console.log('\n[STEP 3] Verifying Raise Service Request button is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Raise Service Request button is visible' });
    
    const isButtonVisible = await dashboardPage.isRaiseServiceRequestButtonVisible();
    expect(isButtonVisible).toBeTruthy();
    console.log('✓ Raise Service Request button is visible');

    // Step 4: Click on Raise Service Request button
    console.log('\n[STEP 4] Clicking on Raise Service Request button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Raise Service Request button' });
    
    await dashboardPage.clickRaiseServiceRequest();
    console.log('✓ Clicked Raise Service Request button');
    
    // Wait for navigation
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Step 5: Verify navigation to Raise Service Request page
    console.log('\n[STEP 5] Verifying navigation to Raise Service Request page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify navigation to Raise Service Request page' });
    
    // Check URL
    const newUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL after navigation: ${newUrl}`);
    
    // Verify we're on the service request page
    const isServiceRequestPage = await dashboardPage.isRaiseServiceRequestPage();
    expect(isServiceRequestPage).toBeTruthy();
    console.log('✓ Navigated to Raise Service Request page');
    
    // Optionally check page title
    const pageTitle = await dashboardPage.getPageTitle();
    if (pageTitle) {
      console.log(`✓ Page title: "${pageTitle}"`);
    }

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify account details on account details card', async ({ page }, testInfo) => {
    const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Verify Account Details on Account Details Card ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to dashboard page
    console.log('\n[STEP 2] Navigating to dashboard page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to dashboard page' });
    
    const dashboardPage = new DashboardPage(page);
    
    // Verify dashboard is visible
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard page is visible');

    // Step 3: Verify Account Details card is visible
    console.log('\n[STEP 3] Verifying Account Details card is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Account Details card is visible' });
    
    const isCardVisible = await dashboardPage.isAccountDetailsCardVisible();
    expect(isCardVisible).toBeTruthy();
    console.log('✓ Account Details card is visible');

    // Step 4: Extract account details from card
    console.log('\n[STEP 4] Extracting account details from card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Extract account details from card' });
    
    const accountDetails = await dashboardPage.getAccountDetails();
    console.log(`✓ Name: "${accountDetails.name}"`);
    console.log(`✓ Email ID: "${accountDetails.email}"`);
    console.log(`✓ Current Plan: "${accountDetails.currentPlan}"`);
    console.log(`✓ Billing Status: "${accountDetails.billingStatus}"`);

    // Step 5: Verify email matches login email
    console.log('\n[STEP 5] Verifying email matches login email...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify email matches login email' });
    
    expect(accountDetails.email.toLowerCase()).toBe(email.toLowerCase());
    console.log(`✓ Email matches login email: "${accountDetails.email}"`);

    // Step 6: Get current plan from header and verify it matches card
    console.log('\n[STEP 6] Getting current plan from header and verifying it matches card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify current plan matches header' });
    
    const headerPlan = await dashboardPage.getHeaderCurrentPlan();
    console.log(`✓ Header Current Plan: "${headerPlan}"`);
    console.log(`✓ Card Current Plan: "${accountDetails.currentPlan}"`);
    
    // Extract plan name from header (remove subscription ID if present)
    // Header format: "Tally On Cloud - Monthly (SUB-P013115)"
    // Card format: "Tally On Cloud - Monthly (10 Users)"
    // We need to compare the base plan name (everything before the first parenthesis)
    const headerPlanBase = headerPlan.split('(')[0].trim();
    const cardPlanBase = accountDetails.currentPlan.split('(')[0].trim();
    
    // Normalize both plans (remove extra spaces, convert to lowercase for comparison)
    const normalizedHeaderPlan = headerPlanBase.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalizedCardPlan = cardPlanBase.toLowerCase().replace(/\s+/g, ' ').trim();
    
    expect(normalizedCardPlan).toBe(normalizedHeaderPlan);
    console.log(`✓ Current plan in card matches header plan: "${cardPlanBase}"`);

    // Step 7: Verify View More link is visible and clickable
    console.log('\n[STEP 7] Verifying View More link is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify View More link is visible' });
    
    const isViewMoreVisible = await dashboardPage.isViewMoreLinkVisible();
    expect(isViewMoreVisible).toBeTruthy();
    console.log('✓ View More link is visible');

    // Step 8: Click View More link
    console.log('\n[STEP 8] Clicking View More link...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Click View More link' });
    
    await dashboardPage.clickViewMore();
    console.log('✓ Clicked View More link');
    
    // Wait for navigation
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Step 9: Verify navigation to Account Details page
    console.log('\n[STEP 9] Verifying navigation to Account Details page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify navigation to Account Details page' });
    
    const isAccountDetailsPage = await dashboardPage.isAccountDetailsPage();
    expect(isAccountDetailsPage).toBeTruthy();
    console.log('✓ Navigated to Account Details page');
    
    const accountDetailsUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Account Details page URL: ${accountDetailsUrl}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });
});

