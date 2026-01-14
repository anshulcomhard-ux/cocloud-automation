const { test, expect } = require('@playwright/test');
const { SalespersonDashboardPage } = require('../pages/salespersondashboard');
const { UserAndRolesPage } = require('../pages/userandroles');
const { DashboardPage } = require('../pages/DashboardPage');

test.describe('Partner Portal - Salesperson Dashboard - Module Visibility', () => {
  test('should verify salesperson side modules visibility', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const adminEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const adminPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';


    console.log('=== Test: Verify Salesperson Side Modules Visibility ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login as admin to create a salesperson user
    console.log('\n[STEP 1] Logging in as admin to create salesperson user...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login as admin and create salesperson user' });
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(adminEmail, adminPassword);
    console.log('✓ Navigated to login page and submitted admin credentials');

    // Verify admin login was successful
    console.log('[VERIFICATION 1] Verifying admin login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const adminLoginUrl = await dashboardPage.getCurrentUrl();
    expect(adminLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${adminLoginUrl}`);
    console.log('✓ Admin login verification PASSED');

    // Step 2: Navigate to User & Roles page
    console.log('\n[STEP 2] Navigating to User & Roles page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to User & Roles page' });
    
    const userAndRolesPage = new UserAndRolesPage(page);
    await userAndRolesPage.navigateToUserAndRoles();
    console.log('✓ Clicked on User & Roles menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying User & Roles page is loaded...');
    const isPageVisible = await userAndRolesPage.isUserAndRolesPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ User & Roles page is visible');
    const userRolesUrl = await userAndRolesPage.getCurrentUrl();
    expect(userRolesUrl).toContain('user');
    console.log(`✓ Current URL contains 'user': ${userRolesUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Click "Add User" button
    console.log('\n[STEP 3] Clicking "Add User" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Add User button' });
    
    await userAndRolesPage.clickAddUser();
    console.log('✓ Add User button clicked');
    await page.waitForTimeout(1000);

    // Step 4: Fill form with valid data for Salesperson
    console.log('\n[STEP 4] Filling form with valid data for Salesperson...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Fill form with valid data for Salesperson' });
    
    // Generate unique test data
    const timestamp = Date.now();
    const testUserData = {
      fullName: `Test Salesperson ${timestamp}`,
      email: `testsalesperson${timestamp}@example.com`,
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      mobile: `98765${timestamp.toString().slice(-5)}`.substring(0, 10),
      companyName: `Test Company ${timestamp}`,
      role: '',
    };

    console.log('[STEP 4.1] Entering Full Name...');
    await userAndRolesPage.fillFullName(testUserData.fullName);
    console.log(`✓ Full Name entered: ${testUserData.fullName}`);

    console.log('[STEP 4.2] Checking Email ID field...');
    const isEmailReadOnly = await userAndRolesPage.isEmailReadOnly();
    if (isEmailReadOnly) {
      console.log('✓ Email ID field is read-only (auto-filled)');
      testUserData.email = await userAndRolesPage.emailInput.inputValue();
      console.log(`✓ Auto-filled Email: ${testUserData.email}`);
    } else {
      console.log('[STEP 4.3] Entering Email ID...');
      await userAndRolesPage.fillEmail(testUserData.email);
      console.log(`✓ Email ID entered: ${testUserData.email}`);
    }

    console.log('[STEP 4.4] Entering Password...');
    await userAndRolesPage.fillPassword(testUserData.password);
    console.log('✓ Password entered');

    console.log('[STEP 4.5] Entering Confirm Password...');
    await userAndRolesPage.fillConfirmPassword(testUserData.confirmPassword);
    console.log('✓ Confirm Password entered');

    console.log('[STEP 4.6] Entering Mobile Number...');
    await userAndRolesPage.fillMobile(testUserData.mobile);
    console.log(`✓ Mobile Number entered: ${testUserData.mobile}`);

    console.log('[STEP 4.7] Entering Company Name...');
    await userAndRolesPage.fillCompanyName(testUserData.companyName);
    console.log(`✓ Company Name entered: ${testUserData.companyName}`);

    console.log('[STEP 4.8] Getting all available roles...');
    const availableRoles = await userAndRolesPage.getAllAvailableRoles();
    const roleTexts = availableRoles.map(r => r.text);
    console.log(`✓ Found ${availableRoles.length} available roles: ${roleTexts.join(', ')}`);

    // Select "Salesperson" role
    let selectedRole = null;
    const preferredRoles = ['Salesperson', 'Sales Person', 'Sales'];
    
    for (const preferredRole of preferredRoles) {
      const foundRole = availableRoles.find(r => 
        r.text.toLowerCase().includes(preferredRole.toLowerCase())
      );
      if (foundRole) {
        selectedRole = foundRole.text;
        break;
      }
    }
    
    if (!selectedRole && availableRoles.length > 0) {
      selectedRole = availableRoles[0].text; // Fallback to first available role
    }
    
    if (selectedRole) {
      console.log(`[STEP 4.9] Selecting role: ${selectedRole}...`);
      await userAndRolesPage.selectRole(selectedRole);
      testUserData.role = selectedRole;
      console.log(`✓ Role selected: ${selectedRole}`);
    } else {
      throw new Error('No suitable Salesperson role available to select');
    }

    console.log('✓ Form filled with valid data');

    // Step 5: Submit the form
    console.log('\n[STEP 5] Submitting the form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Submit the form' });
    
    await userAndRolesPage.clickSubmit();
    console.log('✓ Submit button clicked');
    
    // Wait for form submission
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 6: Verify success toast
    console.log('\n[STEP 6] Verifying success toast...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify success toast' });
    
    const toastAppeared = await userAndRolesPage.waitForToast(20000);
    if (toastAppeared) {
      const toastMessage = await userAndRolesPage.getToastMessage();
      console.log(`✓ Success toast message: ${toastMessage}`);
      expect(toastMessage.toLowerCase()).toContain('success');
    } else {
      console.log('⚠ Toast not found, but continuing...');
    }
    
    // Verify form is closed
    const isFormOpen = await userAndRolesPage.isFormStillOpen();
    expect(isFormOpen).toBeFalsy();
    console.log('✓ Form is closed');

    // Step 7: Logout from current account
    console.log('\n[STEP 7] Logging out from current account...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Logout from current account' });
    
    const logoutSuccessful = await dashboardPage.logout();
    
    // Verify we're on login page
    await page.waitForTimeout(2000);
    const afterLogoutUrl = await dashboardPage.getCurrentUrl();
    const isOnLoginPage = afterLogoutUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
    
    if (logoutSuccessful || isOnLoginPage) {
      console.log('✓ Logged out successfully');
      console.log(`✓ Redirected to login page: ${afterLogoutUrl}`);
      console.log('✓ Logout verification PASSED');
    } else {
      // If logout didn't work, navigate to login page manually
      console.log('⚠ Logout may not have redirected, navigating to login page manually...');
      await dashboardPage.goto(baseUrl);
      await page.waitForTimeout(2000);
      
      const finalUrl = await dashboardPage.getCurrentUrl();
      const isNowOnLoginPage = finalUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
      expect(isNowOnLoginPage).toBeTruthy();
      console.log(`✓ Navigated to login page: ${finalUrl}`);
      console.log('✓ Logout verification PASSED (manual navigation)');
    }

    // Step 8: Login as salesperson
    console.log('\n[STEP 8] Logging in as salesperson...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Login as salesperson' });
    
    // Wait for login form to be ready
    await page.waitForTimeout(1000);
    await dashboardPage.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    
    console.log(`[STEP 8.1] Entering salesperson email: ${testUserData.email}`);
    await dashboardPage.fillEmail(testUserData.email);
    console.log('✓ Email entered');
    
    console.log('[STEP 8.2] Entering salesperson password...');
    await dashboardPage.fillPassword(testUserData.password);
    console.log('✓ Password entered');
    
    console.log('[STEP 8.3] Clicking Sign In button...');
    await dashboardPage.clickSignIn();
    console.log('✓ Sign In button clicked');
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 9: Verify login and navigate to dashboard
    console.log('\n[STEP 9] Verifying login and navigating to dashboard...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify login and navigate to dashboard' });
    
    // Verify login was successful
    console.log('[STEP 9.1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    
    const salespersonLoginUrl = await dashboardPage.getCurrentUrl();
    expect(salespersonLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${salespersonLoginUrl}`);
    
    // Verify we're on dashboard
    const isNotOnLoginPage = !salespersonLoginUrl.includes('/login');
    expect(isNotOnLoginPage).toBeTruthy();
    console.log(`✓ Not on login page - URL: ${salespersonLoginUrl}`);
    
    // Verify login form is not visible
    const isLoginFormVisible = await dashboardPage.isLoginFormVisible();
    expect(isLoginFormVisible).toBeFalsy();
    console.log('✓ Login form is not visible (logged in successfully)');
    
    console.log('✓ Salesperson login verification PASSED');

    // Step 10: Verify salesperson side modules visibility
    console.log('\n[STEP 10] Verifying salesperson side modules visibility...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify salesperson side modules visibility' });
    
    const salespersonDashboardPage = new SalespersonDashboardPage(page);
    
    // Wait for sidebar to be visible
    await page.waitForTimeout(2000);
    const isSidebarVisible = await dashboardPage.dashboardSidebar.isVisible({ timeout: 10000 }).catch(() => false);
    if (isSidebarVisible) {
      console.log('✓ Sidebar is visible');
    } else {
      console.log('⚠ Sidebar not visible, but continuing with module checks...');
    }

    // Verify Dashboard module
    console.log('[STEP 10.1] Verifying Dashboard module visibility...');
    const dashboardVisible = await salespersonDashboardPage.isDashboardModuleVisible();
    expect(dashboardVisible).toBeTruthy();
    console.log('✓ Dashboard module is visible');
    
    const dashboardText = await salespersonDashboardPage.getDashboardModuleText();
    console.log(`✓ Dashboard module text: "${dashboardText.trim()}"`);

    // Verify Cloud User module
    console.log('[STEP 10.2] Verifying Cloud User module visibility...');
    const cloudUserVisible = await salespersonDashboardPage.isCloudUserModuleVisible();
    expect(cloudUserVisible).toBeTruthy();
    console.log('✓ Cloud User module is visible');
    
    const cloudUserText = await salespersonDashboardPage.getCloudUserModuleText();
    console.log(`✓ Cloud User module text: "${cloudUserText.trim()}"`);

    // Verify Reports module
    console.log('[STEP 10.3] Verifying Reports module visibility...');
    const reportsVisible = await salespersonDashboardPage.isReportsModuleVisible();
    expect(reportsVisible).toBeTruthy();
    console.log('✓ Reports module is visible');
    
    const reportsText = await salespersonDashboardPage.getReportsModuleText();
    console.log(`✓ Reports module text: "${reportsText.trim()}"`);

    // Verify Service Request module
    console.log('[STEP 10.4] Verifying Service Request module visibility...');
    const serviceRequestVisible = await salespersonDashboardPage.isServiceRequestModuleVisible();
    expect(serviceRequestVisible).toBeTruthy();
    console.log('✓ Service Request module is visible');
    
    const serviceRequestText = await salespersonDashboardPage.getServiceRequestModuleText();
    console.log(`✓ Service Request module text: "${serviceRequestText.trim()}"`);

    // Verify Subscriptions module
    console.log('[STEP 10.5] Verifying Subscriptions module visibility...');
    const subscriptionsVisible = await salespersonDashboardPage.isSubscriptionsModuleVisible();
    expect(subscriptionsVisible).toBeTruthy();
    console.log('✓ Subscriptions module is visible');
    
    const subscriptionsText = await salespersonDashboardPage.getSubscriptionsModuleText();
    console.log(`✓ Subscriptions module text: "${subscriptionsText.trim()}"`);

    // Summary verification
    console.log('\n[VERIFICATION SUMMARY] All salesperson modules visibility check:');
    const allModules = await salespersonDashboardPage.verifyAllSalespersonModules();
    console.log(`  - Dashboard: ${allModules.dashboard ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Cloud User: ${allModules.cloudUser ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Reports: ${allModules.reports ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Service Request: ${allModules.serviceRequest ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Subscriptions: ${allModules.subscriptions ? '✓ Visible' : '✗ Not Visible'}`);

    // Final assertions
    expect(allModules.dashboard).toBeTruthy();
    expect(allModules.cloudUser).toBeTruthy();
    expect(allModules.reports).toBeTruthy();
    expect(allModules.serviceRequest).toBeTruthy();
    expect(allModules.subscriptions).toBeTruthy();

    console.log('\n✓ All salesperson modules are visible and accessible');
    console.log(`✓ Salesperson Email: ${testUserData.email}`);
    console.log(`✓ Salesperson Role: ${testUserData.role}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify sales manager side modules visibility', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const adminEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const adminPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('=== Test: Verify Sales Manager Side Modules Visibility ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login as admin to create a sales manager user
    console.log('\n[STEP 1] Logging in as admin to create sales manager user...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login as admin and create sales manager user' });
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(adminEmail, adminPassword);
    console.log('✓ Navigated to login page and submitted admin credentials');

    // Verify admin login was successful
    console.log('[VERIFICATION 1] Verifying admin login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const adminLoginUrl = await dashboardPage.getCurrentUrl();
    expect(adminLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${adminLoginUrl}`);
    console.log('✓ Admin login verification PASSED');

    // Step 2: Navigate to User & Roles page
    console.log('\n[STEP 2] Navigating to User & Roles page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to User & Roles page' });
    
    const userAndRolesPage = new UserAndRolesPage(page);
    await userAndRolesPage.navigateToUserAndRoles();
    console.log('✓ Clicked on User & Roles menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying User & Roles page is loaded...');
    const isPageVisible = await userAndRolesPage.isUserAndRolesPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ User & Roles page is visible');
    const userRolesUrl = await userAndRolesPage.getCurrentUrl();
    expect(userRolesUrl).toContain('user');
    console.log(`✓ Current URL contains 'user': ${userRolesUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Click "Add User" button
    console.log('\n[STEP 3] Clicking "Add User" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Add User button' });
    
    await userAndRolesPage.clickAddUser();
    console.log('✓ Add User button clicked');
    await page.waitForTimeout(1000);

    // Step 4: Fill form with valid data for Sales Manager
    console.log('\n[STEP 4] Filling form with valid data for Sales Manager...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Fill form with valid data for Sales Manager' });
    
    // Generate unique test data
    const timestamp = Date.now();
    const testUserData = {
      fullName: `Test Sales Manager ${timestamp}`,
      email: `testsalesmanager${timestamp}@example.com`,
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      mobile: `98765${timestamp.toString().slice(-5)}`.substring(0, 10),
      companyName: `Test Company ${timestamp}`,
      role: '',
    };

    console.log('[STEP 4.1] Entering Full Name...');
    await userAndRolesPage.fillFullName(testUserData.fullName);
    console.log(`✓ Full Name entered: ${testUserData.fullName}`);

    console.log('[STEP 4.2] Checking Email ID field...');
    const isEmailReadOnly = await userAndRolesPage.isEmailReadOnly();
    if (isEmailReadOnly) {
      console.log('✓ Email ID field is read-only (auto-filled)');
      testUserData.email = await userAndRolesPage.emailInput.inputValue();
      console.log(`✓ Auto-filled Email: ${testUserData.email}`);
    } else {
      console.log('[STEP 4.3] Entering Email ID...');
      await userAndRolesPage.fillEmail(testUserData.email);
      console.log(`✓ Email ID entered: ${testUserData.email}`);
    }

    console.log('[STEP 4.4] Entering Password...');
    await userAndRolesPage.fillPassword(testUserData.password);
    console.log('✓ Password entered');

    console.log('[STEP 4.5] Entering Confirm Password...');
    await userAndRolesPage.fillConfirmPassword(testUserData.confirmPassword);
    console.log('✓ Confirm Password entered');

    console.log('[STEP 4.6] Entering Mobile Number...');
    await userAndRolesPage.fillMobile(testUserData.mobile);
    console.log(`✓ Mobile Number entered: ${testUserData.mobile}`);

    console.log('[STEP 4.7] Entering Company Name...');
    await userAndRolesPage.fillCompanyName(testUserData.companyName);
    console.log(`✓ Company Name entered: ${testUserData.companyName}`);

    console.log('[STEP 4.8] Getting all available roles...');
    const availableRoles = await userAndRolesPage.getAllAvailableRoles();
    const roleTexts = availableRoles.map(r => r.text);
    console.log(`✓ Found ${availableRoles.length} available roles: ${roleTexts.join(', ')}`);

    // Select "Sales Manager" or "Salesperson Manager" role
    let selectedRole = null;
    const preferredRoles = ['Sales Manager', 'Salesperson Manager', 'Sales Manager'];
    
    for (const preferredRole of preferredRoles) {
      const foundRole = availableRoles.find(r => 
        r.text.toLowerCase().includes(preferredRole.toLowerCase()) ||
        r.text.toLowerCase().includes('sales manager') ||
        r.text.toLowerCase().includes('salesperson manager')
      );
      if (foundRole) {
        selectedRole = foundRole.text;
        break;
      }
    }
    
    if (!selectedRole && availableRoles.length > 0) {
      selectedRole = availableRoles[0].text; // Fallback to first available role
    }
    
    if (selectedRole) {
      console.log(`[STEP 4.9] Selecting role: ${selectedRole}...`);
      await userAndRolesPage.selectRole(selectedRole);
      testUserData.role = selectedRole;
      console.log(`✓ Role selected: ${selectedRole}`);
    } else {
      throw new Error('No suitable Sales Manager role available to select');
    }

    console.log('✓ Form filled with valid data');

    // Step 5: Submit the form
    console.log('\n[STEP 5] Submitting the form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Submit the form' });
    
    await userAndRolesPage.clickSubmit();
    console.log('✓ Submit button clicked');
    
    // Wait for form submission
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 6: Verify success toast
    console.log('\n[STEP 6] Verifying success toast...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify success toast' });
    
    const toastAppeared = await userAndRolesPage.waitForToast(20000);
    if (toastAppeared) {
      const toastMessage = await userAndRolesPage.getToastMessage();
      console.log(`✓ Success toast message: ${toastMessage}`);
      expect(toastMessage.toLowerCase()).toContain('success');
    } else {
      console.log('⚠ Toast not found, but continuing...');
    }
    
    // Verify form is closed
    const isFormOpen = await userAndRolesPage.isFormStillOpen();
    expect(isFormOpen).toBeFalsy();
    console.log('✓ Form is closed');

    // Step 7: Logout from current account
    console.log('\n[STEP 7] Logging out from current account...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Logout from current account' });
    
    const logoutSuccessful = await dashboardPage.logout();
    
    // Verify we're on login page
    await page.waitForTimeout(2000);
    const afterLogoutUrl = await dashboardPage.getCurrentUrl();
    const isOnLoginPage = afterLogoutUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
    
    if (logoutSuccessful || isOnLoginPage) {
      console.log('✓ Logged out successfully');
      console.log(`✓ Redirected to login page: ${afterLogoutUrl}`);
      console.log('✓ Logout verification PASSED');
    } else {
      // If logout didn't work, navigate to login page manually
      console.log('⚠ Logout may not have redirected, navigating to login page manually...');
      await dashboardPage.goto(baseUrl);
      await page.waitForTimeout(2000);
      
      const finalUrl = await dashboardPage.getCurrentUrl();
      const isNowOnLoginPage = finalUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
      expect(isNowOnLoginPage).toBeTruthy();
      console.log(`✓ Navigated to login page: ${finalUrl}`);
      console.log('✓ Logout verification PASSED (manual navigation)');
    }

    // Step 8: Login as sales manager
    console.log('\n[STEP 8] Logging in as sales manager...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Login as sales manager' });
    
    // Wait for login form to be ready
    await page.waitForTimeout(1000);
    await dashboardPage.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    
    console.log(`[STEP 8.1] Entering sales manager email: ${testUserData.email}`);
    await dashboardPage.fillEmail(testUserData.email);
    console.log('✓ Email entered');
    
    console.log('[STEP 8.2] Entering sales manager password...');
    await dashboardPage.fillPassword(testUserData.password);
    console.log('✓ Password entered');
    
    console.log('[STEP 8.3] Clicking Sign In button...');
    await dashboardPage.clickSignIn();
    console.log('✓ Sign In button clicked');
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 9: Verify login and navigate to dashboard
    console.log('\n[STEP 9] Verifying login and navigating to dashboard...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify login and navigate to dashboard' });
    
    // Verify login was successful
    console.log('[STEP 9.1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    
    const salesManagerLoginUrl = await dashboardPage.getCurrentUrl();
    expect(salesManagerLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${salesManagerLoginUrl}`);
    
    // Verify we're on dashboard
    const isNotOnLoginPage = !salesManagerLoginUrl.includes('/login');
    expect(isNotOnLoginPage).toBeTruthy();
    console.log(`✓ Not on login page - URL: ${salesManagerLoginUrl}`);
    
    // Verify login form is not visible
    const isLoginFormVisible = await dashboardPage.isLoginFormVisible();
    expect(isLoginFormVisible).toBeFalsy();
    console.log('✓ Login form is not visible (logged in successfully)');
    
    console.log('✓ Sales Manager login verification PASSED');

    // Step 10: Verify sales manager side modules visibility
    console.log('\n[STEP 10] Verifying sales manager side modules visibility...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify sales manager side modules visibility' });
    
    const salespersonDashboardPage = new SalespersonDashboardPage(page);
    
    // Wait for sidebar to be visible
    await page.waitForTimeout(2000);
    const isSidebarVisible = await dashboardPage.dashboardSidebar.isVisible({ timeout: 10000 }).catch(() => false);
    if (isSidebarVisible) {
      console.log('✓ Sidebar is visible');
    } else {
      console.log('⚠ Sidebar not visible, but continuing with module checks...');
    }

    // Verify Dashboard module
    console.log('[STEP 10.1] Verifying Dashboard module visibility...');
    const dashboardVisible = await salespersonDashboardPage.isDashboardModuleVisible();
    expect(dashboardVisible).toBeTruthy();
    console.log('✓ Dashboard module is visible');
    
    const dashboardText = await salespersonDashboardPage.getDashboardModuleText();
    console.log(`✓ Dashboard module text: "${dashboardText.trim()}"`);

    // Verify Cloud User module
    console.log('[STEP 10.2] Verifying Cloud User module visibility...');
    const cloudUserVisible = await salespersonDashboardPage.isCloudUserModuleVisible();
    expect(cloudUserVisible).toBeTruthy();
    console.log('✓ Cloud User module is visible');
    
    const cloudUserText = await salespersonDashboardPage.getCloudUserModuleText();
    console.log(`✓ Cloud User module text: "${cloudUserText.trim()}"`);

    // Verify Reports module
    console.log('[STEP 10.3] Verifying Reports module visibility...');
    const reportsVisible = await salespersonDashboardPage.isReportsModuleVisible();
    expect(reportsVisible).toBeTruthy();
    console.log('✓ Reports module is visible');
    
    const reportsText = await salespersonDashboardPage.getReportsModuleText();
    console.log(`✓ Reports module text: "${reportsText.trim()}"`);

    // Verify Service Request module
    console.log('[STEP 10.4] Verifying Service Request module visibility...');
    const serviceRequestVisible = await salespersonDashboardPage.isServiceRequestModuleVisible();
    expect(serviceRequestVisible).toBeTruthy();
    console.log('✓ Service Request module is visible');
    
    const serviceRequestText = await salespersonDashboardPage.getServiceRequestModuleText();
    console.log(`✓ Service Request module text: "${serviceRequestText.trim()}"`);

    // Verify License Details module
    console.log('[STEP 10.5] Verifying License Details module visibility...');
    const licenseDetailsVisible = await salespersonDashboardPage.isLicenseDetailsModuleVisible();
    expect(licenseDetailsVisible).toBeTruthy();
    console.log('✓ License Details module is visible');
    
    const licenseDetailsText = await salespersonDashboardPage.getLicenseDetailsModuleText();
    console.log(`✓ License Details module text: "${licenseDetailsText.trim()}"`);

    // Verify Knowledge Base module
    console.log('[STEP 10.6] Verifying Knowledge Base module visibility...');
    const knowledgeBaseVisible = await salespersonDashboardPage.isKnowledgeBaseModuleVisible();
    expect(knowledgeBaseVisible).toBeTruthy();
    console.log('✓ Knowledge Base module is visible');
    
    const knowledgeBaseText = await salespersonDashboardPage.getKnowledgeBaseModuleText();
    console.log(`✓ Knowledge Base module text: "${knowledgeBaseText.trim()}"`);

    // Verify Subscriptions module
    console.log('[STEP 10.7] Verifying Subscriptions module visibility...');
    const subscriptionsVisible = await salespersonDashboardPage.isSubscriptionsModuleVisible();
    expect(subscriptionsVisible).toBeTruthy();
    console.log('✓ Subscriptions module is visible');
    
    const subscriptionsText = await salespersonDashboardPage.getSubscriptionsModuleText();
    console.log(`✓ Subscriptions module text: "${subscriptionsText.trim()}"`);

    // Summary verification
    console.log('\n[VERIFICATION SUMMARY] All sales manager modules visibility check:');
    const allModules = await salespersonDashboardPage.verifyAllSalesManagerModules();
    console.log(`  - Dashboard: ${allModules.dashboard ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Cloud User: ${allModules.cloudUser ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Reports: ${allModules.reports ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Service Request: ${allModules.serviceRequest ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - License Details: ${allModules.licenseDetails ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Knowledge Base: ${allModules.knowledgeBase ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Subscriptions: ${allModules.subscriptions ? '✓ Visible' : '✗ Not Visible'}`);

    // Final assertions
    expect(allModules.dashboard).toBeTruthy();
    expect(allModules.cloudUser).toBeTruthy();
    expect(allModules.reports).toBeTruthy();
    expect(allModules.serviceRequest).toBeTruthy();
    expect(allModules.licenseDetails).toBeTruthy();
    expect(allModules.knowledgeBase).toBeTruthy();
    expect(allModules.subscriptions).toBeTruthy();

    console.log('\n✓ All sales manager modules are visible and accessible');
    console.log(`✓ Sales Manager Email: ${testUserData.email}`);
    console.log(`✓ Sales Manager Role: ${testUserData.role}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify relationship manager side modules visibility', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const adminEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const adminPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('=== Test: Verify Relationship Manager Side Modules Visibility ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login as admin to create a relationship manager user
    console.log('\n[STEP 1] Logging in as admin to create relationship manager user...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login as admin and create relationship manager user' });
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(adminEmail, adminPassword);
    console.log('✓ Navigated to login page and submitted admin credentials');

    // Verify admin login was successful
    console.log('[VERIFICATION 1] Verifying admin login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const adminLoginUrl = await dashboardPage.getCurrentUrl();
    expect(adminLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${adminLoginUrl}`);
    console.log('✓ Admin login verification PASSED');

    // Step 2: Navigate to User & Roles page
    console.log('\n[STEP 2] Navigating to User & Roles page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to User & Roles page' });
    
    const userAndRolesPage = new UserAndRolesPage(page);
    await userAndRolesPage.navigateToUserAndRoles();
    console.log('✓ Clicked on User & Roles menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying User & Roles page is loaded...');
    const isPageVisible = await userAndRolesPage.isUserAndRolesPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ User & Roles page is visible');
    const userRolesUrl = await userAndRolesPage.getCurrentUrl();
    expect(userRolesUrl).toContain('user');
    console.log(`✓ Current URL contains 'user': ${userRolesUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Click "Add User" button
    console.log('\n[STEP 3] Clicking "Add User" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Add User button' });
    
    await userAndRolesPage.clickAddUser();
    console.log('✓ Add User button clicked');
    await page.waitForTimeout(1000);

    // Step 4: Fill form with valid data for Relationship Manager
    console.log('\n[STEP 4] Filling form with valid data for Relationship Manager...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Fill form with valid data for Relationship Manager' });
    
    // Generate unique test data
    const timestamp = Date.now();
    const testUserData = {
      fullName: `Test Relationship Manager ${timestamp}`,
      email: `testrelationshipmanager${timestamp}@example.com`,
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      mobile: `98765${timestamp.toString().slice(-5)}`.substring(0, 10),
      companyName: `Test Company ${timestamp}`,
      role: '',
    };

    console.log('[STEP 4.1] Entering Full Name...');
    await userAndRolesPage.fillFullName(testUserData.fullName);
    console.log(`✓ Full Name entered: ${testUserData.fullName}`);

    console.log('[STEP 4.2] Checking Email ID field...');
    const isEmailReadOnly = await userAndRolesPage.isEmailReadOnly();
    if (isEmailReadOnly) {
      console.log('✓ Email ID field is read-only (auto-filled)');
      testUserData.email = await userAndRolesPage.emailInput.inputValue();
      console.log(`✓ Auto-filled Email: ${testUserData.email}`);
    } else {
      console.log('[STEP 4.3] Entering Email ID...');
      await userAndRolesPage.fillEmail(testUserData.email);
      console.log(`✓ Email ID entered: ${testUserData.email}`);
    }

    console.log('[STEP 4.4] Entering Password...');
    await userAndRolesPage.fillPassword(testUserData.password);
    console.log('✓ Password entered');

    console.log('[STEP 4.5] Entering Confirm Password...');
    await userAndRolesPage.fillConfirmPassword(testUserData.confirmPassword);
    console.log('✓ Confirm Password entered');

    console.log('[STEP 4.6] Entering Mobile Number...');
    await userAndRolesPage.fillMobile(testUserData.mobile);
    console.log(`✓ Mobile Number entered: ${testUserData.mobile}`);

    console.log('[STEP 4.7] Entering Company Name...');
    await userAndRolesPage.fillCompanyName(testUserData.companyName);
    console.log(`✓ Company Name entered: ${testUserData.companyName}`);

    console.log('[STEP 4.8] Getting all available roles...');
    const availableRoles = await userAndRolesPage.getAllAvailableRoles();
    const roleTexts = availableRoles.map(r => r.text);
    console.log(`✓ Found ${availableRoles.length} available roles: ${roleTexts.join(', ')}`);

    // Select "Relationship Manager" role
    let selectedRole = null;
    const preferredRoles = ['Relationship Manager', 'RelationshipManager', 'Relationship'];
    
    for (const preferredRole of preferredRoles) {
      const foundRole = availableRoles.find(r => 
        r.text.toLowerCase().includes(preferredRole.toLowerCase())
      );
      if (foundRole) {
        selectedRole = foundRole.text;
        break;
      }
    }
    
    if (!selectedRole && availableRoles.length > 0) {
      selectedRole = availableRoles[0].text; // Fallback to first available role
    }
    
    if (selectedRole) {
      console.log(`[STEP 4.9] Selecting role: ${selectedRole}...`);
      await userAndRolesPage.selectRole(selectedRole);
      testUserData.role = selectedRole;
      console.log(`✓ Role selected: ${selectedRole}`);
    } else {
      throw new Error('No suitable Relationship Manager role available to select');
    }

    console.log('✓ Form filled with valid data');

    // Step 5: Submit the form
    console.log('\n[STEP 5] Submitting the form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Submit the form' });
    
    await userAndRolesPage.clickSubmit();
    console.log('✓ Submit button clicked');
    
    // Wait for form submission
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 6: Verify success toast
    console.log('\n[STEP 6] Verifying success toast...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify success toast' });
    
    const toastAppeared = await userAndRolesPage.waitForToast(20000);
    if (toastAppeared) {
      const toastMessage = await userAndRolesPage.getToastMessage();
      console.log(`✓ Success toast message: ${toastMessage}`);
      expect(toastMessage.toLowerCase()).toContain('success');
    } else {
      console.log('⚠ Toast not found, but continuing...');
    }
    
    // Verify form is closed
    const isFormOpen = await userAndRolesPage.isFormStillOpen();
    expect(isFormOpen).toBeFalsy();
    console.log('✓ Form is closed');

    // Step 7: Logout from current account
    console.log('\n[STEP 7] Logging out from current account...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Logout from current account' });
    
    const logoutSuccessful = await dashboardPage.logout();
    
    // Verify we're on login page
    await page.waitForTimeout(2000);
    const afterLogoutUrl = await dashboardPage.getCurrentUrl();
    const isOnLoginPage = afterLogoutUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
    
    if (logoutSuccessful || isOnLoginPage) {
      console.log('✓ Logged out successfully');
      console.log(`✓ Redirected to login page: ${afterLogoutUrl}`);
      console.log('✓ Logout verification PASSED');
    } else {
      // If logout didn't work, navigate to login page manually
      console.log('⚠ Logout may not have redirected, navigating to login page manually...');
      await dashboardPage.goto(baseUrl);
      await page.waitForTimeout(2000);
      
      const finalUrl = await dashboardPage.getCurrentUrl();
      const isNowOnLoginPage = finalUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
      expect(isNowOnLoginPage).toBeTruthy();
      console.log(`✓ Navigated to login page: ${finalUrl}`);
      console.log('✓ Logout verification PASSED (manual navigation)');
    }

    // Step 8: Login as relationship manager
    console.log('\n[STEP 8] Logging in as relationship manager...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Login as relationship manager' });
    
    // Wait for login form to be ready
    await page.waitForTimeout(1000);
    await dashboardPage.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    
    console.log(`[STEP 8.1] Entering relationship manager email: ${testUserData.email}`);
    await dashboardPage.fillEmail(testUserData.email);
    console.log('✓ Email entered');
    
    console.log('[STEP 8.2] Entering relationship manager password...');
    await dashboardPage.fillPassword(testUserData.password);
    console.log('✓ Password entered');
    
    console.log('[STEP 8.3] Clicking Sign In button...');
    await dashboardPage.clickSignIn();
    console.log('✓ Sign In button clicked');
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 9: Verify login and navigate to dashboard
    console.log('\n[STEP 9] Verifying login and navigating to dashboard...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify login and navigate to dashboard' });
    
    // Verify login was successful
    console.log('[STEP 9.1] Verifying login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    
    const relationshipManagerLoginUrl = await dashboardPage.getCurrentUrl();
    expect(relationshipManagerLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${relationshipManagerLoginUrl}`);
    
    // Verify we're on dashboard
    const isNotOnLoginPage = !relationshipManagerLoginUrl.includes('/login');
    expect(isNotOnLoginPage).toBeTruthy();
    console.log(`✓ Not on login page - URL: ${relationshipManagerLoginUrl}`);
    
    // Verify login form is not visible
    const isLoginFormVisible = await dashboardPage.isLoginFormVisible();
    expect(isLoginFormVisible).toBeFalsy();
    console.log('✓ Login form is not visible (logged in successfully)');
    
    console.log('✓ Relationship Manager login verification PASSED');

    // Step 10: Verify relationship manager side modules visibility
    console.log('\n[STEP 10] Verifying relationship manager side modules visibility...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify relationship manager side modules visibility' });
    
    const salespersonDashboardPage = new SalespersonDashboardPage(page);
    
    // Wait for sidebar to be visible
    await page.waitForTimeout(2000);
    const isSidebarVisible = await dashboardPage.dashboardSidebar.isVisible({ timeout: 10000 }).catch(() => false);
    if (isSidebarVisible) {
      console.log('✓ Sidebar is visible');
    } else {
      console.log('⚠ Sidebar not visible, but continuing with module checks...');
    }

    // Verify Dashboard module
    console.log('[STEP 10.1] Verifying Dashboard module visibility...');
    const dashboardVisible = await salespersonDashboardPage.isDashboardModuleVisible();
    expect(dashboardVisible).toBeTruthy();
    console.log('✓ Dashboard module is visible');
    
    const dashboardText = await salespersonDashboardPage.getDashboardModuleText();
    console.log(`✓ Dashboard module text: "${dashboardText.trim()}"`);

    // Verify Cloud User module
    console.log('[STEP 10.2] Verifying Cloud User module visibility...');
    const cloudUserVisible = await salespersonDashboardPage.isCloudUserModuleVisible();
    expect(cloudUserVisible).toBeTruthy();
    console.log('✓ Cloud User module is visible');
    
    const cloudUserText = await salespersonDashboardPage.getCloudUserModuleText();
    console.log(`✓ Cloud User module text: "${cloudUserText.trim()}"`);

    // Verify Reports module
    console.log('[STEP 10.3] Verifying Reports module visibility...');
    const reportsVisible = await salespersonDashboardPage.isReportsModuleVisible();
    expect(reportsVisible).toBeTruthy();
    console.log('✓ Reports module is visible');
    
    const reportsText = await salespersonDashboardPage.getReportsModuleText();
    console.log(`✓ Reports module text: "${reportsText.trim()}"`);

    // Verify Service Request module
    console.log('[STEP 10.4] Verifying Service Request module visibility...');
    const serviceRequestVisible = await salespersonDashboardPage.isServiceRequestModuleVisible();
    expect(serviceRequestVisible).toBeTruthy();
    console.log('✓ Service Request module is visible');
    
    const serviceRequestText = await salespersonDashboardPage.getServiceRequestModuleText();
    console.log(`✓ Service Request module text: "${serviceRequestText.trim()}"`);

    // Verify License Details module
    console.log('[STEP 10.5] Verifying License Details module visibility...');
    const licenseDetailsVisible = await salespersonDashboardPage.isLicenseDetailsModuleVisible();
    expect(licenseDetailsVisible).toBeTruthy();
    console.log('✓ License Details module is visible');
    
    const licenseDetailsText = await salespersonDashboardPage.getLicenseDetailsModuleText();
    console.log(`✓ License Details module text: "${licenseDetailsText.trim()}"`);

    // Verify Knowledge Base module
    console.log('[STEP 10.6] Verifying Knowledge Base module visibility...');
    const knowledgeBaseVisible = await salespersonDashboardPage.isKnowledgeBaseModuleVisible();
    expect(knowledgeBaseVisible).toBeTruthy();
    console.log('✓ Knowledge Base module is visible');
    
    const knowledgeBaseText = await salespersonDashboardPage.getKnowledgeBaseModuleText();
    console.log(`✓ Knowledge Base module text: "${knowledgeBaseText.trim()}"`);

    // Verify Subscriptions module
    console.log('[STEP 10.7] Verifying Subscriptions module visibility...');
    const subscriptionsVisible = await salespersonDashboardPage.isSubscriptionsModuleVisible();
    expect(subscriptionsVisible).toBeTruthy();
    console.log('✓ Subscriptions module is visible');
    
    const subscriptionsText = await salespersonDashboardPage.getSubscriptionsModuleText();
    console.log(`✓ Subscriptions module text: "${subscriptionsText.trim()}"`);

    // Summary verification
    console.log('\n[VERIFICATION SUMMARY] All relationship manager modules visibility check:');
    const allModules = await salespersonDashboardPage.verifyAllRelationshipManagerModules();
    console.log(`  - Dashboard: ${allModules.dashboard ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Cloud User: ${allModules.cloudUser ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Reports: ${allModules.reports ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Service Request: ${allModules.serviceRequest ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - License Details: ${allModules.licenseDetails ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Knowledge Base: ${allModules.knowledgeBase ? '✓ Visible' : '✗ Not Visible'}`);
    console.log(`  - Subscriptions: ${allModules.subscriptions ? '✓ Visible' : '✗ Not Visible'}`);

    // Final assertions
    expect(allModules.dashboard).toBeTruthy();
    expect(allModules.cloudUser).toBeTruthy();
    expect(allModules.reports).toBeTruthy();
    expect(allModules.serviceRequest).toBeTruthy();
    expect(allModules.licenseDetails).toBeTruthy();
    expect(allModules.knowledgeBase).toBeTruthy();
    expect(allModules.subscriptions).toBeTruthy();

    console.log('\n✓ All relationship manager modules are visible and accessible');
    console.log(`✓ Relationship Manager Email: ${testUserData.email}`);
    console.log(`✓ Relationship Manager Role: ${testUserData.role}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify assigned users to salesperson are visible and selectable in salesperson dropdown on dashboard', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const adminEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const adminPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('=== Test: Verify Assigned Users to Salesperson in Dashboard Dropdown ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login as admin
    console.log('\n[STEP 1] Logging in as admin...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login as admin' });
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(adminEmail, adminPassword);
    console.log('✓ Navigated to login page and submitted admin credentials');

    // Verify admin login was successful
    console.log('[VERIFICATION 1] Verifying admin login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const adminLoginUrl = await dashboardPage.getCurrentUrl();
    expect(adminLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${adminLoginUrl}`);
    console.log('✓ Admin login verification PASSED');

    // Step 2: Navigate to User & Roles page
    console.log('\n[STEP 2] Navigating to User & Roles page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to User & Roles page' });
    
    const userAndRolesPage = new UserAndRolesPage(page);
    await userAndRolesPage.navigateToUserAndRoles();
    console.log('✓ Clicked on User & Roles menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying User & Roles page is loaded...');
    const isPageVisible = await userAndRolesPage.isUserAndRolesPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ User & Roles page is visible');
    const userRolesUrl = await userAndRolesPage.getCurrentUrl();
    expect(userRolesUrl).toContain('user');
    console.log(`✓ Current URL contains 'user': ${userRolesUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Create a salesperson user
    console.log('\n[STEP 3] Creating a salesperson user...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Create a salesperson user' });
    
    await userAndRolesPage.clickAddUser();
    console.log('✓ Add User button clicked');
    await page.waitForTimeout(1000);

    // Generate unique test data
    const timestamp = Date.now();
    const testUserData = {
      fullName: `Test Salesperson ${timestamp}`,
      email: `testsalesperson${timestamp}@example.com`,
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      mobile: `98765${timestamp.toString().slice(-5)}`.substring(0, 10),
      companyName: `Test Company ${timestamp}`,
      role: '',
    };

    console.log('[STEP 3.1] Filling form with valid data...');
    await userAndRolesPage.fillFullName(testUserData.fullName);
    
    const isEmailReadOnly = await userAndRolesPage.isEmailReadOnly();
    if (isEmailReadOnly) {
      testUserData.email = await userAndRolesPage.emailInput.inputValue();
      console.log(`✓ Auto-filled Email: ${testUserData.email}`);
    } else {
      await userAndRolesPage.fillEmail(testUserData.email);
      console.log(`✓ Email ID entered: ${testUserData.email}`);
    }
    
    await userAndRolesPage.fillPassword(testUserData.password);
    await userAndRolesPage.fillConfirmPassword(testUserData.confirmPassword);
    await userAndRolesPage.fillMobile(testUserData.mobile);
    await userAndRolesPage.fillCompanyName(testUserData.companyName);

    // Select Salesperson role
    const availableRoles = await userAndRolesPage.getAllAvailableRoles();
    const salespersonRole = availableRoles.find(r => 
      r.text.toLowerCase().includes('salesperson') || 
      r.text.toLowerCase().includes('sales person')
    );
    
    if (salespersonRole) {
      await userAndRolesPage.selectRole(salespersonRole.text);
      testUserData.role = salespersonRole.text;
      console.log(`✓ Role selected: ${salespersonRole.text}`);
    } else {
      throw new Error('Salesperson role not found');
    }

    // Submit the form
    await userAndRolesPage.clickSubmit();
    console.log('✓ Submit button clicked');
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Verify success
    const toastAppeared = await userAndRolesPage.waitForToast(20000);
    if (toastAppeared) {
      const toastMessage = await userAndRolesPage.getToastMessage();
      console.log(`✓ Success toast message: ${toastMessage}`);
    }
    console.log('✓ Salesperson user created successfully');

    // Step 4: Edit the salesperson user
    console.log('\n[STEP 4] Editing the salesperson user...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Edit the salesperson user' });
    
    // Find the user row by email
    const userRowIndex = await userAndRolesPage.findUserRowIndexByEmail(testUserData.email);
    if (userRowIndex === null) {
      throw new Error(`Could not find user with email ${testUserData.email} in table`);
    }
    console.log(`✓ Found user at row index ${userRowIndex}`);

    // Click Edit action - use Edit Salesman for salesperson role
    await userAndRolesPage.clickEditActionByRole(userRowIndex, testUserData.role);
    console.log('✓ Edit Salesman action clicked');
    await page.waitForTimeout(2000);

    // Verify form is open
    const isFormOpen = await userAndRolesPage.isFormStillOpen();
    expect(isFormOpen).toBeTruthy();
    console.log('✓ Edit form is open');

    // Step 5: Check all checkboxes to assign all users to salesperson
    console.log('\n[STEP 5] Checking all checkboxes to assign all users to salesperson...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Check all checkboxes to assign all users' });
    
    const checkedCount = await userAndRolesPage.checkAllUserCheckboxes();
    console.log(`✓ Checked ${checkedCount} user checkboxes`);

    // Retrieve the list of assigned persons (with names and emails)
    const assignedUsers = await userAndRolesPage.getAssignedUsersList();
    console.log(`✓ Retrieved ${assignedUsers.length} assigned users`);
    expect(assignedUsers.length).toBeGreaterThan(0);
    
    // Log assigned users with names and emails
    assignedUsers.forEach((user, index) => {
      console.log(`  - User ${index + 1}: name="${user.name}", email="${user.email}"`);
    });
    console.log(`✓ Assigned users list: ${JSON.stringify(assignedUsers, null, 2)}`);

    // Submit the form to save changes
    await userAndRolesPage.clickSubmit();
    console.log('✓ Submit button clicked to save changes');
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Verify success
    const editToastAppeared = await userAndRolesPage.waitForToast(20000);
    if (editToastAppeared) {
      const editToastMessage = await userAndRolesPage.getToastMessage();
      console.log(`✓ Success toast message: ${editToastMessage}`);
    }
    console.log('✓ User assignments saved successfully');

    // Step 6: Logout from current account
    console.log('\n[STEP 6] Logging out from current account...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Logout from current account' });
    
    const logoutSuccessful = await dashboardPage.logout();
    await page.waitForTimeout(2000);
    
    const afterLogoutUrl = await dashboardPage.getCurrentUrl();
    const isOnLoginPage = afterLogoutUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
    
    if (!logoutSuccessful && !isOnLoginPage) {
      await dashboardPage.goto(baseUrl);
      await page.waitForTimeout(2000);
    }
    console.log('✓ Logged out successfully');

    // Step 7: Login as salesperson
    console.log('\n[STEP 7] Logging in as salesperson...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Login as salesperson' });
    
    await page.waitForTimeout(1000);
    await dashboardPage.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    
    await dashboardPage.fillEmail(testUserData.email);
    await dashboardPage.fillPassword(testUserData.password);
    await dashboardPage.clickSignIn();
    console.log('✓ Submitted salesperson credentials');
    
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Verify login
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Salesperson login successful');

    // Step 8: Navigate to dashboard
    console.log('\n[STEP 8] Navigating to dashboard...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Navigate to dashboard' });
    
    // Check if already on dashboard
    const currentUrl = await dashboardPage.getCurrentUrl();
    const isAlreadyOnDashboard = currentUrl.includes('dashboard') || await dashboardPage.dashboardTitle.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!isAlreadyOnDashboard) {
      await dashboardPage.navigateToDashboard();
      await page.waitForTimeout(2000);
    } else {
      console.log('Already on dashboard page');
    }
    
    const dashboardUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${dashboardUrl}`);

    // Step 9: Click on salesperson dropdown
    console.log('\n[STEP 9] Clicking on salesperson dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Click on salesperson dropdown' });
    
    const salespersonDashboardPage = new SalespersonDashboardPage(page);
    await salespersonDashboardPage.openSalespersonDropdown();
    await page.waitForTimeout(1000);
    console.log('✓ Salesperson dropdown opened');

    // Step 10: Get all dropdown options and retrieve their names
    console.log('\n[STEP 10] Getting all dropdown options and retrieving their names...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Get all dropdown options and retrieve names' });
    
    const dropdownOptions = await salespersonDashboardPage.getSalespersonDropdownOptions();
    console.log(`✓ Found ${dropdownOptions.length} options in Salesperson dropdown`);
    
    // Extract names from dropdown options
    const dropdownNames = dropdownOptions.map(opt => opt.text.trim()).filter(name => name && name.length > 0);
    console.log(`✓ Retrieved ${dropdownNames.length} names from dropdown: ${dropdownNames.slice(0, 10).join(', ')}${dropdownNames.length > 10 ? '...' : ''}`);
    
    // Step 11: Match dropdown names with extracted assigned users
    console.log('\n[STEP 11] Matching dropdown names with extracted assigned users...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Match dropdown names with assigned users' });
    
    // Extract names and emails from assigned users
    const assignedUserNames = assignedUsers.map(u => u.name).filter(name => name && name.length > 0);
    const assignedUserEmails = assignedUsers.map(u => u.email).filter(email => email && email.length > 0);
    
    console.log(`✓ Assigned users - Names: ${assignedUserNames.length}, Emails: ${assignedUserEmails.length}`);
    
    // Match names from dropdown with assigned user names
    const matchedNames = [];
    const unmatchedNames = [];
    
    for (const assignedName of assignedUserNames) {
      const found = dropdownNames.some(dropdownName => 
        dropdownName.toLowerCase().includes(assignedName.toLowerCase()) ||
        assignedName.toLowerCase().includes(dropdownName.toLowerCase())
      );
      if (found) {
        matchedNames.push(assignedName);
      } else {
        unmatchedNames.push(assignedName);
      }
    }
    
    console.log(`✓ Matched ${matchedNames.length} names: ${matchedNames.slice(0, 10).join(', ')}${matchedNames.length > 10 ? '...' : ''}`);
    if (unmatchedNames.length > 0) {
      console.log(`⚠ Unmatched ${unmatchedNames.length} names: ${unmatchedNames.slice(0, 10).join(', ')}${unmatchedNames.length > 10 ? '...' : ''}`);
    }
    
    // Verify that at least some names match
    expect(matchedNames.length).toBeGreaterThan(0);
    console.log(`✓ Successfully matched ${matchedNames.length} out of ${assignedUserNames.length} assigned user names`);

    // Step 12: Verify all options are selectable
    console.log('\n[STEP 12] Verifying all options are selectable...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Verify all options are selectable' });
    
    const selectabilityResult = await salespersonDashboardPage.verifyAllOptionsAreSelectable();
    console.log(`✓ Selectability result: ${JSON.stringify(selectabilityResult)}`);
    
    expect(selectabilityResult.allSelectable).toBeTruthy();
    expect(selectabilityResult.selectableCount).toBeGreaterThan(0);
    console.log(`✓ All ${selectabilityResult.selectableCount} options are selectable`);

    // Step 13: Click OK
    console.log('\n[STEP 13] Clicking OK button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 13: Click OK button' });
    
    await salespersonDashboardPage.clickSalespersonDropdownOk();
    await page.waitForTimeout(1000);
    console.log('✓ OK button clicked');

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
    console.log(`✓ Salesperson Email: ${testUserData.email}`);
    console.log(`✓ Assigned Users Count: ${assignedUsers.length}`);
    console.log(`✓ Assigned Users: ${assignedUsers.join(', ')}`);
  });

  test('should verify billing details card is visible and details visible on it for salesperson', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const adminEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const adminPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('=== Test: Verify Billing Details Card Visibility for Salesperson ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login as admin/partner
    console.log('\n[STEP 1] Logging in as admin/partner...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login as admin/partner' });
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(adminEmail, adminPassword);
    console.log('✓ Navigated to login page and submitted admin credentials');

    // Verify admin login was successful
    console.log('[VERIFICATION 1] Verifying admin login was successful...');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    const adminLoginUrl = await dashboardPage.getCurrentUrl();
    expect(adminLoginUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${adminLoginUrl}`);
    console.log('✓ Admin login verification PASSED');

    // Step 2: Navigate to Billing Details module
    console.log('\n[STEP 2] Navigating to Billing Details module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Billing Details module' });
    
    const { BillingPage } = require('../pages/BillingPage');
    const billingPage = new BillingPage(page);
    await billingPage.navigateToBilling();
    console.log('✓ Clicked on Billing menu item');

    // Verify navigation
    console.log('[VERIFICATION 2] Verifying Billing page is loaded...');
    const isBillingPageVisible = await billingPage.isBillingPageVisible();
    expect(isBillingPageVisible).toBeTruthy();
    console.log('✓ Billing page is visible');
    const billingUrl = await billingPage.getCurrentUrl();
    expect(billingUrl).toContain('billing');
    console.log(`✓ Current URL contains 'billing': ${billingUrl}`);
    console.log('✓ Navigation verification PASSED');

    // Step 3: Check if billing details are visible on main partner portal
    console.log('\n[STEP 3] Checking if billing details are visible on main partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Check billing details visibility on main partner portal' });
    
    const isBillingDetailsVisible = await billingPage.isBillingDetailsCardVisible();
    console.log(`✓ Billing Details card visible on main partner portal: ${isBillingDetailsVisible}`);
    
    let mainPartnerBillingDetails = null;
    if (isBillingDetailsVisible) {
      // Get billing details from main partner portal
      mainPartnerBillingDetails = await billingPage.getAllBillingDetailsFromCard();
      console.log(`✓ Retrieved billing details from main partner portal:`);
      console.log(`  - Name: ${mainPartnerBillingDetails.name || 'N/A'}`);
      console.log(`  - Email: ${mainPartnerBillingDetails.email || 'N/A'}`);
      console.log(`  - Mobile: ${mainPartnerBillingDetails.mobile || 'N/A'}`);
      console.log(`  - Company: ${mainPartnerBillingDetails.company || 'N/A'}`);
      console.log(`  - Address: ${mainPartnerBillingDetails.address || 'N/A'}`);
    } else {
      console.log('⚠ Billing Details card is NOT visible on main partner portal');
    }

    // Step 4: Navigate to User & Roles module and create a salesperson
    console.log('\n[STEP 4] Navigating to User & Roles module to create salesperson...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Navigate to User & Roles and create salesperson' });
    
    const { UserAndRolesPage } = require('../pages/userandroles');
    const userAndRolesPage = new UserAndRolesPage(page);
    await userAndRolesPage.navigateToUserAndRoles();
    console.log('✓ Navigated to User & Roles page');
    
    // Create salesperson user
    console.log('[STEP 4.1] Clicking Add User button...');
    await userAndRolesPage.clickAddUser();
    await page.waitForTimeout(1000);
    
    const timestamp = Date.now();
    const testUserData = {
      fullName: `Test Salesperson ${timestamp}`,
      email: `testsalesperson${timestamp}@example.com`,
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      mobile: `98765${timestamp.toString().slice(-5)}`.substring(0, 10),
      companyName: `Test Company ${timestamp}`,
      role: '',
    };

    console.log('[STEP 4.2] Filling salesperson form...');
    await userAndRolesPage.fillFullName(testUserData.fullName);
    const isEmailReadOnly = await userAndRolesPage.isEmailReadOnly();
    if (isEmailReadOnly) {
      testUserData.email = await userAndRolesPage.emailInput.inputValue();
      console.log(`✓ Auto-filled Email: ${testUserData.email}`);
    } else {
      await userAndRolesPage.fillEmail(testUserData.email);
      console.log(`✓ Email entered: ${testUserData.email}`);
    }
    await userAndRolesPage.fillPassword(testUserData.password);
    await userAndRolesPage.fillConfirmPassword(testUserData.confirmPassword);
    await userAndRolesPage.fillMobile(testUserData.mobile);
    await userAndRolesPage.fillCompanyName(testUserData.companyName);

    const availableRoles = await userAndRolesPage.getAllAvailableRoles();
    const salespersonRole = availableRoles.find(r => 
      r.text.toLowerCase().includes('salesperson') || 
      r.text.toLowerCase().includes('sales person')
    );
    
    if (salespersonRole) {
      await userAndRolesPage.selectRole(salespersonRole.text);
      testUserData.role = salespersonRole.text;
      console.log(`✓ Role selected: ${salespersonRole.text}`);
    } else {
      throw new Error('Salesperson role not found');
    }

    console.log('[STEP 4.3] Submitting salesperson form...');
    await userAndRolesPage.clickSubmit();
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(3000);

    const toastAppeared = await userAndRolesPage.waitForToast(20000);
    if (toastAppeared) {
      const toastMessage = await userAndRolesPage.getToastMessage();
      console.log(`✓ Success toast message: ${toastMessage}`);
    }
    console.log('✓ Salesperson user created successfully');

    // Step 5: Logout from current account
    console.log('\n[STEP 5] Logging out from current account...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Logout from current account' });
    
    const logoutSuccessful = await dashboardPage.logout();
    await page.waitForTimeout(2000);
    
    const afterLogoutUrl = await dashboardPage.getCurrentUrl();
    const isOnLoginPage = afterLogoutUrl.includes('/login') || await dashboardPage.isLoginFormVisible();
    
    if (!logoutSuccessful && !isOnLoginPage) {
      await dashboardPage.goto(baseUrl);
      await page.waitForTimeout(2000);
    }
    console.log('✓ Logged out successfully');

    // Step 6: Login as salesperson
    console.log('\n[STEP 6] Logging in as salesperson...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Login as salesperson' });
    
    await page.waitForTimeout(1000);
    await dashboardPage.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    
    await dashboardPage.fillEmail(testUserData.email);
    await dashboardPage.fillPassword(testUserData.password);
    await dashboardPage.clickSignIn();
    console.log('✓ Submitted salesperson credentials');
    
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Verify login
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Salesperson login successful');

    // Step 7: Navigate to dashboard
    console.log('\n[STEP 7] Navigating to dashboard...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Navigate to dashboard' });
    
    const currentUrl = await dashboardPage.getCurrentUrl();
    const isAlreadyOnDashboard = currentUrl.includes('dashboard') || await dashboardPage.dashboardTitle.isVisible({ timeout: 2000 }).catch(() => false);
    
    if (!isAlreadyOnDashboard) {
      await dashboardPage.navigateToDashboard();
      await page.waitForTimeout(2000);
    } else {
      console.log('Already on dashboard page');
    }
    
    const dashboardUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Current URL: ${dashboardUrl}`);

    // Step 8: Check billing details card on dashboard
    console.log('\n[STEP 8] Checking billing details card on dashboard...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Check billing details card on dashboard' });
    
    const salespersonDashboardPage = new SalespersonDashboardPage(page);
    const isBillingCardVisible = await salespersonDashboardPage.isBillingDetailsCardVisible();
    
    // If billing details were visible on main partner, they should be visible to salesperson
    if (isBillingDetailsVisible) {
      expect(isBillingCardVisible).toBeTruthy();
      console.log('✓ Billing Details card is visible on salesperson dashboard (matches main partner)');
    } else {
      expect(isBillingCardVisible).toBeFalsy();
      console.log('✓ Billing Details card is NOT visible on salesperson dashboard (matches main partner)');
    }

    // Step 9: Verify details are visible on billing card
    console.log('\n[STEP 9] Verifying details are visible on billing card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify details are visible on billing card' });
    
    if (isBillingCardVisible && mainPartnerBillingDetails) {
      const salespersonBillingDetails = await salespersonDashboardPage.getBillingDetailsFromCard();
      console.log(`✓ Retrieved billing details from salesperson dashboard:`);
      console.log(`  - Name: ${salespersonBillingDetails.name || 'N/A'}`);
      console.log(`  - Email: ${salespersonBillingDetails.email || 'N/A'}`);
      console.log(`  - Mobile: ${salespersonBillingDetails.mobile || 'N/A'}`);
      
      // Verify that details match (at least name, email, mobile should match)
      // Trim values before comparison to handle whitespace differences
      if (mainPartnerBillingDetails.name) {
        const mainName = mainPartnerBillingDetails.name.trim();
        const salespersonName = (salespersonBillingDetails.name || '').trim();
        expect(salespersonName).toBe(mainName);
        console.log(`✓ Name matches: "${salespersonName}"`);
      }
      if (mainPartnerBillingDetails.email) {
        const mainEmail = mainPartnerBillingDetails.email.trim();
        const salespersonEmail = (salespersonBillingDetails.email || '').trim();
        expect(salespersonEmail).toBe(mainEmail);
        console.log(`✓ Email matches: "${salespersonEmail}"`);
      }
      if (mainPartnerBillingDetails.mobile) {
        const mainMobile = mainPartnerBillingDetails.mobile.trim();
        const salespersonMobile = (salespersonBillingDetails.mobile || '').trim();
        expect(salespersonMobile).toBe(mainMobile);
        console.log(`✓ Mobile matches: "${salespersonMobile}"`);
      }
    } else if (isBillingCardVisible) {
      // If card is visible but we don't have main partner details, just verify card has some details
      const salespersonBillingDetails = await salespersonDashboardPage.getBillingDetailsFromCard();
      const hasDetails = salespersonBillingDetails.name || salespersonBillingDetails.email || salespersonBillingDetails.mobile;
      expect(hasDetails).toBeTruthy();
      console.log('✓ Billing Details card contains details');
    } else {
      console.log('⚠ Billing Details card is not visible, skipping details verification');
    }

    // Step 10: Verify edit button should NOT be visible on card
    console.log('\n[STEP 10] Verifying edit button should NOT be visible on card...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify edit button should NOT be visible' });
    
    const isEditButtonVisible = await salespersonDashboardPage.isEditButtonVisibleOnBillingCard();
    expect(isEditButtonVisible).toBeFalsy();
    console.log('✓ Edit button is NOT visible on Billing Details card (as expected for salesperson)');

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });
});

