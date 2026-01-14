const { test, expect } = require('@playwright/test');
const { AccountManagerPage } = require('../pages/accountmanager');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Account Manager Module', () => {
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

  // ==================== PAGE LOAD TEST ====================

  test('should verify account manager page loads successfully - retrieve page heading', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Account Manager Page Loads Successfully ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(3000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Verify page is loaded
    console.log('[STEP 2] Verifying page is loaded...');
    const isPageLoaded = await accountManagerPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Account Manager page is loaded');

    // Step 3: Retrieve and verify page heading
    console.log('[STEP 3] Retrieving page heading...');
    const pageHeading = await accountManagerPage.getPageHeading();
    expect(pageHeading).toBeTruthy();
    expect(pageHeading.toLowerCase()).toContain('account manager');
    console.log(`✓ Page heading: "${pageHeading}"`);

    await page.screenshot({ path: 'artifacts/accountmanager-page-load.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ADD ADMIN TEST ====================

  test('should verify add admin role as support', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Add Admin Role as Support ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestAdmin${timestamp}`;
    const testAdminEmail = `testadmin${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Support';

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select role as Support from dropdown
    console.log('[STEP 5] Selecting Role as Support...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4)); // Check last 4 digits
    expect(adminDetails.role.toLowerCase()).toContain(testAdminRole.toLowerCase());
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    await page.screenshot({ path: 'artifacts/accountmanager-add-admin.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ADD ADMIN AS SALES MANAGER TEST ====================

  test('should verify add admin role as sales manager', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Add Admin Role as Sales Manager ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestSalesManager${timestamp}`;
    const testAdminEmail = `testsalesmanager${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Sales Manager';

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select role as Sales Manager from dropdown
    console.log('[STEP 5] Selecting Role as Sales Manager...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    // Role in table is displayed as "salesmanager" (without space)
    expect(adminDetails.role.toLowerCase()).toMatch(/sales\s*manager|salesmanager/);
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    await page.screenshot({ path: 'artifacts/accountmanager-add-admin-sales-manager.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ADD ADMIN AS MANAGER TEST ====================

  test('should verify add admin role as manager', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Add Admin Role as Manager ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestManager${timestamp}`;
    const testAdminEmail = `testmanager${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Manager';

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Enter values in input fields
    console.log('[STEP 3] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 4: Select role as Manager from dropdown
    console.log('[STEP 4] Selecting Role as Manager...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 5: Click submit
    console.log('[STEP 5] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 6: Navigated to account manager page
    console.log('[STEP 6] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 7: Check the added admin in table - check all columns
    console.log('[STEP 7] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    expect(adminDetails.role.toLowerCase()).toContain('manager');
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    await page.screenshot({ path: 'artifacts/accountmanager-add-admin-manager.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== EDIT ADMIN TEST ====================

  test('should verify edit admin role', async ({ page }, testInfo) => {
    test.setTimeout(300000);
    console.log('\n=== Test: Verify Edit Admin Role ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestAdmin${timestamp}`;
    const testAdminEmail = `testadmin${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Support'; // Initial role

    const editedAdminName = `EditedAdmin${timestamp}`;
    const editedAdminEmail = `editedadmin${timestamp}@test.com`;
    const editedAdminMobile = `987655${timestamp.toString().slice(-4)}`;
    const editedAdminPassword = 'Edited@123456';
    const editedAdminRole = 'Manager'; // Updated role

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select any role from role dropdown
    console.log('[STEP 5] Selecting Role from dropdown...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    expect(adminDetails.role.toLowerCase()).toContain(testAdminRole.toLowerCase());
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    // Step 9: Go to action column
    console.log('[STEP 9] Going to action column...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 10: Click action dropdown of added admin
    console.log('[STEP 10] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 11: Click edit user - modal opens
    console.log('[STEP 11] Clicking Edit User option...');
    await accountManagerPage.clickEditUserOption();
    await page.waitForTimeout(3000);
    
    // Wait for modal to appear with multiple checks
    let isEditModalOpen = await accountManagerPage.isEditAdminModalOpen();
    if (!isEditModalOpen) {
      await page.waitForTimeout(2000);
      isEditModalOpen = await accountManagerPage.isEditAdminModalOpen();
    }
    if (!isEditModalOpen) {
      await page.waitForTimeout(2000);
      isEditModalOpen = await accountManagerPage.isEditAdminModalOpen();
    }
    expect(isEditModalOpen).toBeTruthy();
    console.log('✓ Edit Admin modal is open');

    // Step 12: Update all values
    console.log('[STEP 12] Updating all admin values...');
    await accountManagerPage.editAdminName(editedAdminName);
    console.log(`✓ Updated Name: "${editedAdminName}"`);
    
    await accountManagerPage.editAdminEmail(editedAdminEmail);
    console.log(`✓ Updated Email: "${editedAdminEmail}"`);
    
    await accountManagerPage.editAdminMobile(editedAdminMobile);
    console.log(`✓ Updated Mobile: "${editedAdminMobile}"`);
    
    await accountManagerPage.selectEditAdminRole(editedAdminRole);
    console.log(`✓ Updated Role: "${editedAdminRole}"`);
    
    await accountManagerPage.editAdminPassword(editedAdminPassword);
    console.log('✓ Updated Password');

    // Step 13: Click on Allow All checkbox - all options will be checked
    console.log('[STEP 13] Clicking Allow All checkbox...');
    await accountManagerPage.clickAllowAllCheckbox();
    await page.waitForTimeout(1000);
    
    const isAllowAllChecked = await accountManagerPage.isAllowAllCheckboxChecked();
    expect(isAllowAllChecked).toBeTruthy();
    console.log('✓ Allow All checkbox is checked');
    
    const allCheckboxesChecked = await accountManagerPage.areAllUserCheckboxesChecked();
    expect(allCheckboxesChecked).toBeTruthy();
    console.log('✓ All user checkboxes are checked');

    // Step 14: Click submit
    console.log('[STEP 14] Submitting Edit Admin form...');
    await accountManagerPage.submitEditAdminForm();
    console.log('✓ Form submitted');

    // Step 15: Navigated to account manager page
    console.log('[STEP 15] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage2 = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage2).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 16: Check edit details in table except checkboxes
    console.log('[STEP 16] Verifying updated values in table (except checkboxes)...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    // Check that old admin name is not found (or found with updated values)
    const editedAdminFound = await accountManagerPage.verifyAdminInTable(editedAdminName);
    expect(editedAdminFound).toBeTruthy();
    console.log(`✓ Edited admin "${editedAdminName}" found in table`);
    
    // Get updated admin details and verify all columns (except checkboxes)
    const updatedAdminDetails = await accountManagerPage.getAdminDetailsFromTable(editedAdminName);
    expect(updatedAdminDetails).toBeTruthy();
    expect(updatedAdminDetails.name.toLowerCase()).toContain(editedAdminName.toLowerCase());
    expect(updatedAdminDetails.email.toLowerCase()).toContain(editedAdminEmail.toLowerCase());
    expect(updatedAdminDetails.mobile).toContain(editedAdminMobile.slice(-4));
    expect(updatedAdminDetails.role.toLowerCase()).toContain(editedAdminRole.toLowerCase());
    expect(updatedAdminDetails.status).toBeTruthy();
    
    console.log(`✓ Updated Name: "${updatedAdminDetails.name}"`);
    console.log(`✓ Updated Email: "${updatedAdminDetails.email}"`);
    console.log(`✓ Updated Mobile: "${updatedAdminDetails.mobile}"`);
    console.log(`✓ Updated Role: "${updatedAdminDetails.role}"`);
    console.log(`✓ Status: "${updatedAdminDetails.status}"`);

    // Step 17: Again edit admin role
    console.log('[STEP 17] Again clicking Edit User option...');
    await accountManagerPage.clickActionDropdownForAdmin(editedAdminName);
    await page.waitForTimeout(1000);
    await accountManagerPage.clickEditUserOption();
    await page.waitForTimeout(3000);
    
    // Wait for modal to appear
    let isEditModalOpen2 = await accountManagerPage.isEditAdminModalOpen();
    if (!isEditModalOpen2) {
      await page.waitForTimeout(2000);
      isEditModalOpen2 = await accountManagerPage.isEditAdminModalOpen();
    }
    expect(isEditModalOpen2).toBeTruthy();
    console.log('✓ Edit Admin modal is open again');

    // Step 18: Check all checkboxes are checked
    console.log('[STEP 18] Verifying all checkboxes are checked...');
    await page.waitForTimeout(1000);
    
    const isAllowAllChecked2 = await accountManagerPage.isAllowAllCheckboxChecked();
    expect(isAllowAllChecked2).toBeTruthy();
    console.log('✓ Allow All checkbox is checked');
    
    const allCheckboxesChecked2 = await accountManagerPage.areAllUserCheckboxesChecked();
    expect(allCheckboxesChecked2).toBeTruthy();
    console.log('✓ All user checkboxes are checked');

    await page.screenshot({ path: 'artifacts/accountmanager-edit-admin.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== DELETE ADMIN TEST ====================

  test('should verify delete admin role', async ({ page }, testInfo) => {
    test.setTimeout(300000);
    console.log('\n=== Test: Verify Delete Admin Role ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestAdmin${timestamp}`;
    const testAdminEmail = `testadmin${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Support'; // Any role

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select any role from role dropdown
    console.log('[STEP 5] Selecting Role from dropdown...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    expect(adminDetails.role.toLowerCase()).toContain(testAdminRole.toLowerCase());
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    // Step 9: Go to action column
    console.log('[STEP 9] Going to action column...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 10: Click action dropdown of added admin
    console.log('[STEP 10] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 11: Click delete user - modal opens
    console.log('[STEP 11] Clicking Delete User option...');
    await accountManagerPage.clickDeleteUserOption();
    await page.waitForTimeout(3000);
    
    // Wait for modal to appear with multiple checks
    let isDeleteModalOpen = await accountManagerPage.isDeleteAdminModalOpen();
    if (!isDeleteModalOpen) {
      await page.waitForTimeout(2000);
      isDeleteModalOpen = await accountManagerPage.isDeleteAdminModalOpen();
    }
    expect(isDeleteModalOpen).toBeTruthy();
    console.log('✓ Delete Admin modal is open');

    // Step 12: Click Yes
    console.log('[STEP 12] Clicking Yes to confirm deletion...');
    await accountManagerPage.confirmDeleteAdmin();
    console.log('✓ Clicked Yes to delete');

    // Step 13: Check deleted admin user not visible in table - refresh if required
    console.log('[STEP 13] Verifying deleted admin is not visible in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const deletedAdminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(deletedAdminFound).toBeFalsy();
    console.log(`✓ Admin "${testAdminName}" is not visible in table (deleted successfully)`);
    
    // Verify table still has other rows (if any)
    const rowCount = await accountManagerPage.allTableRows.count();
    console.log(`✓ Table has ${rowCount} row(s) after deletion`);

    await page.screenshot({ path: 'artifacts/accountmanager-delete-admin.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== SUSPEND ADMIN TEST ====================

  test('should verify suspend admin role', async ({ page }, testInfo) => {
    test.setTimeout(300000);
    console.log('\n=== Test: Verify Suspend Admin Role ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestAdmin${timestamp}`;
    const testAdminEmail = `testadmin${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Support'; // Any role

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select any role from role dropdown
    console.log('[STEP 5] Selecting Role from dropdown...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    expect(adminDetails.role.toLowerCase()).toContain(testAdminRole.toLowerCase());
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    // Step 9: Go to action column
    console.log('[STEP 9] Going to action column...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 10: Click action dropdown of added admin
    console.log('[STEP 10] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 11: Click suspend option
    console.log('[STEP 11] Clicking Suspend option...');
    await accountManagerPage.clickSuspendOption();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked Suspend option');

    // Step 12: Go to status column - check status - inactive
    console.log('[STEP 12] Checking status column - should be Inactive...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure status is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminStatus = await accountManagerPage.getAdminStatusFromTable(testAdminName);
    expect(adminStatus).toBeTruthy();
    expect(adminStatus.toLowerCase()).toContain('inactive');
    console.log(`✓ Status: "${adminStatus}" (should be Inactive)`);

    await page.screenshot({ path: 'artifacts/accountmanager-suspend-admin.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ACTIVATE ADMIN TEST ====================

  test('should verify activate admin role', async ({ page }, testInfo) => {
    test.setTimeout(300000);
    console.log('\n=== Test: Verify Activate Admin Role ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestAdmin${timestamp}`;
    const testAdminEmail = `testadmin${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Support'; // Any role

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select any role from role dropdown
    console.log('[STEP 5] Selecting Role from dropdown...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    expect(adminDetails.role.toLowerCase()).toContain(testAdminRole.toLowerCase());
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    // Step 9: Go to action column
    console.log('[STEP 9] Going to action column...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 10: Click action dropdown of added admin
    console.log('[STEP 10] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 11: Click suspend option
    console.log('[STEP 11] Clicking Suspend option...');
    await accountManagerPage.clickSuspendOption();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked Suspend option');

    // Step 12: Go to status column - check status - inactive
    console.log('[STEP 12] Checking status column - should be Inactive...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure status is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    let adminStatus = await accountManagerPage.getAdminStatusFromTable(testAdminName);
    expect(adminStatus).toBeTruthy();
    expect(adminStatus.toLowerCase()).toContain('inactive');
    console.log(`✓ Status: "${adminStatus}" (should be Inactive)`);

    // Step 13: Again, go to action column
    console.log('[STEP 13] Going to action column again...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 14: Click action dropdown of added admin
    console.log('[STEP 14] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 15: Click active option
    console.log('[STEP 15] Clicking Activate option...');
    await accountManagerPage.clickActivateOption();
    await page.waitForTimeout(2000);
    console.log('✓ Clicked Activate option');

    // Step 16: Go to status column - check status - active
    console.log('[STEP 16] Checking status column - should be Active...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure status is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    adminStatus = await accountManagerPage.getAdminStatusFromTable(testAdminName);
    expect(adminStatus).toBeTruthy();
    expect(adminStatus.toLowerCase()).toContain('active');
    console.log(`✓ Status: "${adminStatus}" (should be Active)`);

    await page.screenshot({ path: 'artifacts/accountmanager-activate-admin.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== MANAGE PERMISSIONS TEST ====================

  test('should verify manage permissions', async ({ page }, testInfo) => {
    test.setTimeout(300000);
    console.log('\n=== Test: Verify Manage Permissions ===');
    
    const accountManagerPage = new AccountManagerPage(page);

    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testAdminName = `TestAdmin${timestamp}`;
    const testAdminEmail = `testadmin${timestamp}@test.com`;
    const testAdminMobile = `987654${timestamp.toString().slice(-4)}`;
    const testAdminPassword = 'Test@123456';
    const testAdminRole = 'Support'; // Any role

    // Step 1: Navigate to Account Manager page
    console.log('[STEP 1] Navigating to Account Manager page...');
    await accountManagerPage.gotoAccountManager(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Account Manager page');

    // Step 2: Click Add Admin button - navigates to add-admin page
    console.log('[STEP 2] Clicking Add Admin button...');
    await accountManagerPage.clickAddAdminButton();
    await page.waitForTimeout(2000);
    const isAddAdminPageLoaded = await accountManagerPage.isAddAdminPageLoaded();
    expect(isAddAdminPageLoaded).toBeTruthy();
    console.log('✓ Add Admin page is loaded');

    // Step 3: Click submit - check required fields
    console.log('[STEP 3] Clicking Submit to check required fields validation...');
    await accountManagerPage.clickAddAdminSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await accountManagerPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s))`);
    } else {
      console.log('⚠ No validation errors found');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 4: Enter values in input fields
    console.log('[STEP 4] Filling admin form fields...');
    await accountManagerPage.fillAdminName(testAdminName);
    console.log(`✓ Filled Name: "${testAdminName}"`);
    
    await accountManagerPage.fillAdminEmail(testAdminEmail);
    console.log(`✓ Filled Email: "${testAdminEmail}"`);
    
    await accountManagerPage.fillAdminMobile(testAdminMobile);
    console.log(`✓ Filled Mobile: "${testAdminMobile}"`);
    
    await accountManagerPage.fillAdminPassword(testAdminPassword);
    console.log('✓ Filled Password');

    // Step 5: Select any role from role dropdown
    console.log('[STEP 5] Selecting Role from dropdown...');
    await accountManagerPage.selectAdminRole(testAdminRole);
    console.log(`✓ Selected Role: "${testAdminRole}"`);

    // Step 6: Click submit
    console.log('[STEP 6] Submitting Add Admin form...');
    await accountManagerPage.submitAddAdminForm();
    console.log('✓ Form submitted');

    // Step 7: Navigated to account manager page
    console.log('[STEP 7] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 8: Check the added admin in table - check all columns
    console.log('[STEP 8] Verifying added admin in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const adminFound = await accountManagerPage.verifyAdminInTable(testAdminName);
    expect(adminFound).toBeTruthy();
    console.log(`✓ Admin "${testAdminName}" found in table`);
    
    // Get admin details and verify all columns
    const adminDetails = await accountManagerPage.getAdminDetailsFromTable(testAdminName);
    expect(adminDetails).toBeTruthy();
    expect(adminDetails.name.toLowerCase()).toContain(testAdminName.toLowerCase());
    expect(adminDetails.email.toLowerCase()).toContain(testAdminEmail.toLowerCase());
    expect(adminDetails.mobile).toContain(testAdminMobile.slice(-4));
    expect(adminDetails.role.toLowerCase()).toContain(testAdminRole.toLowerCase());
    expect(adminDetails.status).toBeTruthy();
    
    console.log(`✓ Name: "${adminDetails.name}"`);
    console.log(`✓ Email: "${adminDetails.email}"`);
    console.log(`✓ Mobile: "${adminDetails.mobile}"`);
    console.log(`✓ Role: "${adminDetails.role}"`);
    console.log(`✓ Status: "${adminDetails.status}"`);

    // Step 9: Go to action column
    console.log('[STEP 9] Going to action column...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 10: Click action dropdown of added admin
    console.log('[STEP 10] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 11: Click manage permissions option - modal opens
    console.log('[STEP 11] Clicking Manage Permissions option...');
    await accountManagerPage.clickManagePermissionsOption();
    await page.waitForTimeout(3000);
    
    // Wait for modal to appear with multiple checks
    let isManagePermissionsModalOpen = await accountManagerPage.isManagePermissionsModalOpen();
    if (!isManagePermissionsModalOpen) {
      await page.waitForTimeout(2000);
      isManagePermissionsModalOpen = await accountManagerPage.isManagePermissionsModalOpen();
    }
    expect(isManagePermissionsModalOpen).toBeTruthy();
    console.log('✓ Manage Permissions modal is open');

    // Step 12: Check all permission checkboxes
    console.log('[STEP 12] Checking all permission checkboxes...');
    await accountManagerPage.checkAllPermissionCheckboxes();
    console.log('✓ All permission checkboxes checked');

    // Step 13: Click save permissions
    console.log('[STEP 13] Clicking Save Permissions...');
    await accountManagerPage.clickSavePermissions();
    console.log('✓ Clicked Save Permissions');

    // Step 14: Navigated to account manager page
    console.log('[STEP 14] Verifying navigation to Account Manager page...');
    await page.waitForTimeout(3000);
    const isBackOnAccountManagerPage2 = await accountManagerPage.isPageLoaded();
    expect(isBackOnAccountManagerPage2).toBeTruthy();
    console.log('✓ Navigated back to Account Manager page');

    // Step 15: Again, go to action column
    console.log('[STEP 15] Going to action column again...');
    await page.waitForTimeout(2000);
    console.log('✓ Located action column');

    // Step 16: Click action dropdown of added admin
    console.log('[STEP 16] Clicking action dropdown for added admin...');
    await accountManagerPage.clickActionDropdownForAdmin(testAdminName);
    await page.waitForTimeout(1000);
    console.log('✓ Clicked action dropdown');

    // Step 17: Click manage permissions option - modal opens
    console.log('[STEP 17] Clicking Manage Permissions option again...');
    await accountManagerPage.clickManagePermissionsOption();
    await page.waitForTimeout(3000);
    
    // Wait for modal to appear
    let isManagePermissionsModalOpen2 = await accountManagerPage.isManagePermissionsModalOpen();
    if (!isManagePermissionsModalOpen2) {
      await page.waitForTimeout(2000);
      isManagePermissionsModalOpen2 = await accountManagerPage.isManagePermissionsModalOpen();
    }
    expect(isManagePermissionsModalOpen2).toBeTruthy();
    console.log('✓ Manage Permissions modal is open again');

    // Step 18: Check all permission checkboxes are checked
    console.log('[STEP 18] Verifying all permission checkboxes are checked...');
    await page.waitForTimeout(1000);
    
    const allCheckboxesChecked = await accountManagerPage.areAllPermissionCheckboxesChecked();
    expect(allCheckboxesChecked).toBeTruthy();
    console.log('✓ All permission checkboxes are checked');

    await page.screenshot({ path: 'artifacts/accountmanager-manage-permissions.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });
});

