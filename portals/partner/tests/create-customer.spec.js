const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { CustomersPage } = require('../pages/CustomersPage');

test.describe('Partner Portal - Create Customer', () => {
  test('should navigate to customer module and create a new customer', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Create New Customer ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

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
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Current URL does not contain '/login': ${currentUrl}`);
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Customers module
    console.log('\n[STEP 2] Navigating to Customers module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Customers module' });
    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();
    console.log('✓ Clicked on Customers menu item');
  
    // Step 3: Click "Add Customer" button to open the modal
    console.log('\n[STEP 3] Clicking "Add Customer" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Open Add Customer modal' });
    await customersPage.clickAddCustomer();
    console.log('✓ Add Customer modal opened');
   
    const timestamp = Date.now();
    const customerData = {
      name: `Test Customer ${timestamp}`,
      email: `testcustomer${timestamp}@example.com`,
      phone: `1555${timestamp.toString().slice(-7)}`,
      company: `Test Company ${timestamp}`,
      address: `123 Test Street, Test City`,
    };
    console.log(`\n[STEP 4] Creating customer with data:`, customerData);
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Fill and submit customer form' });
    
    await customersPage.createCustomer(customerData);
    console.log('✓ Customer form filled and submitted');
    
    // Step 5: Verify customer creation success
    console.log('\n[VERIFICATION 2] Verifying customer creation success...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify customer creation' });
    await page.waitForTimeout(2000);
    
    // Check for success message or modal closure
    const isSuccessVisible = await customersPage.isSuccessMessageVisible();
    const isModalClosed = !(await customersPage.isModalVisible());
    console.log(`✓ Success message visible: ${isSuccessVisible}`);
    console.log(`✓ Modal closed: ${isModalClosed}`);
    
    // Either success message should appear or modal should close
    expect(isSuccessVisible || isModalClosed).toBeTruthy();
    console.log('✓ Customer creation success verified');
    
    // If success message is visible, verify its content
    if (isSuccessVisible) {
      const successMessage = await customersPage.getSuccessMessage();
      console.log(`✓ Success message: "${successMessage}"`);
      expect(successMessage).toContain('success');
      console.log('✓ Success message contains "success"');
    }
    console.log('✓ Customer creation verification PASSED');
    
    // Step 6: Verify customer appears in the customer list
    console.log('\n[VERIFICATION 3] Verifying customer appears in the list...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify customer in list' });
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    
    // Verify customer is in the list
    const customerInList = await customersPage.verifyCustomerInList(customerData.name);
    expect(customerInList).toBeTruthy();
    console.log(`✓ Customer "${customerData.name}" found in the list`);
    console.log('✓ Customer list verification PASSED');
    
    // Step 7: Capture screenshot of the customer list
    console.log('\n[STEP 7] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-customer-list.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-customer-list.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should edit existing customer details from action menu', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Edit Customer ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

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
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Customers module
    console.log('\n[STEP 2] Navigating to Customers module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Customers module' });
    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();
    console.log('✓ Clicked on Customers menu item');

    // Step 3: Create a customer to be edited
    console.log('\n[STEP 3] Creating a customer to be edited...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Create customer' });
    const timestamp = Date.now();
    const originalCustomer = {
      name: `Edit Customer ${timestamp}`,
      email: `editcustomer${timestamp}@example.com`,
      phone: `1666${timestamp.toString().slice(-7)}`,
      company: `Edit Company ${timestamp}`,
      address: `456 Original Street, Original City`,
    };
    console.log(`✓ Customer data prepared:`, originalCustomer);

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(originalCustomer);
    console.log('✓ Customer form filled and submitted');

    // Wait for creation to complete
    await page.waitForTimeout(2000);

    // Verify original customer appears in list
    console.log('\n[VERIFICATION 2] Verifying original customer appears in list...');
    const originalInList = await customersPage.verifyCustomerInList(originalCustomer.name);
    expect(originalInList).toBeTruthy();
    console.log(`✓ Original customer "${originalCustomer.name}" found in the list`);
    console.log('✓ Original customer verification PASSED');

    // Step 4: Edit the customer via Action -> Manage -> Edit Account
    console.log('\n[STEP 4] Editing customer via Action menu...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Edit customer' });
    const updatedCustomer = {
      name: `${originalCustomer.name}Updated`,
      email: `updated-${timestamp}@example.com`,
      phone: `1777${timestamp.toString().slice(-7)}`,
      company: `Updated Company ${timestamp}`,
    };
    console.log(`✓ Updated customer data:`, updatedCustomer);

    await customersPage.editCustomer(originalCustomer.name, updatedCustomer);
    console.log('✓ Customer edit form submitted');

    // Step 5: Verify edit success (success message or updated data in list)
    console.log('\n[VERIFICATION 3] Verifying edit success...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify edit success' });
    await page.waitForTimeout(2000);

    const editSuccessVisible = await customersPage.isSuccessMessageVisible();
    const updatedCustomerInList = await customersPage.verifyCustomerInList(updatedCustomer.name);
    console.log(`✓ Success message visible: ${editSuccessVisible}`);
    console.log(`✓ Updated customer in list: ${updatedCustomerInList}`);
    expect(editSuccessVisible || updatedCustomerInList).toBeTruthy();
    console.log('✓ Edit success verification PASSED');

    // Step 6: Verify updated customer appears in customer list
    console.log('\n[VERIFICATION 4] Verifying updated customer appears in list...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify updated customer in list' });
    const updatedInList = await customersPage.verifyCustomerInList(updatedCustomer.name);
    expect(updatedInList).toBeTruthy();
    console.log(`✓ Updated customer "${updatedCustomer.name}" found in the list`);
    console.log('✓ Updated customer verification PASSED');

    // Capture screenshot after edit
    console.log('\n[STEP 7] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-customer-edited.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-customer-edited.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should assign label to added customer using label dropdown', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Assign Label to Customer ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to partner portal
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    // Step 2: Navigate to Customers module
    console.log('\n[STEP 2] Navigating to Customers module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Customers module' });
    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();
    console.log('✓ Clicked on Customers menu item');

    // Step 3: Create a customer that we will label
    console.log('\n[STEP 3] Creating a customer to label...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Create customer' });
    const timestamp = Date.now();
    const customerData = {
      name: `Label Customer ${timestamp}`,
      email: `labelcustomer${timestamp}@example.com`,
      phone: `1888${timestamp.toString().slice(-7)}`,
      company: `Label Company ${timestamp}`,
      address: `789 Label Street, Label City`,
    };
    console.log(`✓ Customer data prepared:`, customerData);

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    console.log('✓ Customer form filled and submitted');

    // Wait for creation to complete and appear in list
    console.log('\n[VERIFICATION 1] Verifying customer appears in list...');
    await page.waitForTimeout(2000);
    const createdInList = await customersPage.verifyCustomerInList(customerData.name);
    expect(createdInList).toBeTruthy();
    console.log(`✓ Customer "${customerData.name}" found in the list`);
    console.log('✓ Customer creation verification PASSED');

    // Step 4: Select the added customer via '#' column and open label dropdown
    console.log('\n[STEP 4] Assigning label to customer...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Assign label to customer' });
    const labelName = 'new';
    console.log(`✓ Label name: "${labelName}"`);
    await customersPage.assignLabelToCustomer(customerData.name, labelName);
    console.log('✓ Label assigned to customer');

    // Step 5: Verify label is assigned successfully in Label column
    console.log('\n[VERIFICATION 2] Verifying label is assigned...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify label assignment' });
    await page.waitForTimeout(2000);
    const labelAssigned = await customersPage.verifyLabelAssigned(customerData.name, labelName);
    expect(labelAssigned).toBeTruthy();
    console.log(`✓ Label "${labelName}" is assigned to customer "${customerData.name}"`);
    console.log('✓ Label assignment verification PASSED');

    // Capture screenshot after label assignment
    console.log('\n[STEP 6] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-customer-label-assigned.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-customer-label-assigned.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should remove assigned label from customer via action dropdown', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    // Create customer to label
    const timestamp = Date.now();
    const customerData = {
      name: `Remove Label Customer ${timestamp}`,
      email: `removelabel${timestamp}@example.com`,
      phone: `1999${timestamp.toString().slice(-7)}`,
      company: `Remove Label Company ${timestamp}`,
      address: `101 Remove St, Remove City`,
    };

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    await page.waitForTimeout(2000);
    expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();

    // Assign label first
    const labelName = 'new';
    await customersPage.assignLabelToCustomer(customerData.name, labelName);
    await page.waitForTimeout(1000);
    expect(await customersPage.verifyLabelAssigned(customerData.name, labelName)).toBeTruthy();

    // Remove label through action dropdown
    await customersPage.removeLabelFromCustomer(customerData.name, labelName);

    // Verify label removed
    await page.waitForTimeout(1000);
    expect(await customersPage.verifyLabelRemoved(customerData.name, labelName)).toBeTruthy();

    await page.screenshot({ path: 'artifacts/partner-customer-label-removed.png', fullPage: true });
  });

  test('should navigate to subscriptions of added customer and see no data', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    
    // Create a fresh customer with no subscriptions
    const timestamp = Date.now();
    const customerData = {
      name: `Subs Customer ${timestamp}`,
      email: `subscustomer${timestamp}@example.com`,
      phone: `1444${timestamp.toString().slice(-7)}`,
      company: `Subs Company ${timestamp}`,
      address: `202 Subs Street, Subs City`,
    };

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    await page.waitForTimeout(2000);
    expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();

    // Open subscriptions from action dropdown
    await customersPage.openSubscriptionsForCustomer(customerData.name);

    // Verify navigation to subscriptions page
    expect(await customersPage.isOnSubscriptionsPage()).toBeTruthy();

    // Verify "no subscription found" toast/message is shown
    expect(await customersPage.isNoSubscriptionToastVisible()).toBeTruthy();

    await page.screenshot({ path: 'artifacts/partner-customer-subscriptions-empty.png', fullPage: true });
  });

  test('should suspend newly added customer from action menu', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    // Create a fresh customer to suspend
    const timestamp = Date.now();
    const customerData = {
      name: `Suspend Customer ${timestamp}`,
      email: `suspendcustomer${timestamp}@example.com`,
      phone: `1333${timestamp.toString().slice(-7)}`,
      company: `Suspend Company ${timestamp}`,
      address: `303 Suspend Street, Suspend City`,
    };

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    await page.waitForTimeout(2000);
    expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();

    // Suspend the customer via Action -> Manage -> Suspend
    await customersPage.suspendCustomer(customerData.name);

    // Verify toast appears
    await page.waitForTimeout(1000);
    expect(await customersPage.isSuspendToastVisible()).toBeTruthy();

    // Verify status becomes Inactive in Status column
    await page.waitForTimeout(1000);
    expect(await customersPage.isCustomerInactive(customerData.name)).toBeTruthy();

    await page.screenshot({ path: 'artifacts/partner-customer-suspended.png', fullPage: true });
  });

  test('should activate suspended customer from action menu', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    // Create a fresh customer to suspend then activate
    const timestamp = Date.now();
    const customerData = {
      name: `Activate Customer ${timestamp}`,
      email: `activatecustomer${timestamp}@example.com`,
      phone: `1222${timestamp.toString().slice(-7)}`,
      company: `Activate Company ${timestamp}`,
      address: `404 Activate Street, Activate City`,
    };

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    await page.waitForTimeout(2000);
    expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();

    // First suspend the customer
    await customersPage.suspendCustomer(customerData.name);
    await page.waitForTimeout(1000);

    // Then activate the customer
    await customersPage.activateCustomer(customerData.name);

    // Verify status is Active again
    await page.waitForTimeout(1000);
    expect(await customersPage.isCustomerActive(customerData.name)).toBeTruthy();

    await page.screenshot({ path: 'artifacts/partner-customer-activated.png', fullPage: true });
  });

  test('should delete newly added customer and reduce total count', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    // Capture initial total records
    const initialTotal = await customersPage.getTotalRecordsCount();

    // Create a new customer to delete
    const timestamp = Date.now();
    const customerData = {
      name: `Delete Customer ${timestamp}`,
      email: `deletecustomer${timestamp}@example.com`,
      phone: `1111${timestamp.toString().slice(-7)}`,
      company: `Delete Company ${timestamp}`,
      address: `505 Delete Street, Delete City`,
    };

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    await page.waitForTimeout(2000);
    expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();

    // Total after adding
    const totalAfterAdd = await customersPage.getTotalRecordsCount();

    // Open delete modal and confirm
    await customersPage.openDeleteCustomerModal(customerData.name);
    await customersPage.confirmDeleteCustomer();

    // Wait for deletion/grids refresh
    await page.waitForTimeout(2000);

    // Verify delete toast and that customer row is gone
    expect(await customersPage.isDeleteToastVisible()).toBeTruthy();
    expect(await customersPage.isCustomerDeleted(customerData.name)).toBeTruthy();

    // Verify total count decreased by 1 compared to totalAfterAdd (if both counts are available)
    const totalAfterDelete = await customersPage.getTotalRecordsCount();
    if (totalAfterAdd !== null && totalAfterDelete !== null) {
      expect(totalAfterDelete).toBe(totalAfterAdd - 1);
    }

    await page.screenshot({ path: 'artifacts/partner-customer-deleted.png', fullPage: true });
  });

  test('should search customer by company, email, label, status and mobile', async ({ page }) => {
    test.setTimeout(60000); // Set timeout to 60 seconds for this test
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    // Create a customer and assign label
    const timestamp = Date.now();
    const customerData = {
      name: `Search Customer ${timestamp}`,
      email: `searchcustomer${timestamp}@example.com`,
      phone: `1990${timestamp.toString().slice(-7)}`,
      company: `Search Company ${timestamp}`,
      address: `606 Search Street, Search City`,
    };

    await customersPage.clickAddCustomer();
    await customersPage.createCustomer(customerData);
    await page.waitForTimeout(2000);
    expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();

    // Assign label "new" so we can search by label
    const labelName = 'new';
    await customersPage.assignLabelToCustomer(customerData.name, labelName);
    await page.waitForTimeout(1000);
    expect(await customersPage.verifyLabelAssigned(customerData.name, labelName)).toBeTruthy();

    // Helper to verify search result includes the customer
    const verifySearchResult = async () => {
      expect(await customersPage.verifyCustomerInList(customerData.name)).toBeTruthy();
    };

    // 1) Search by company name
    await customersPage.setSearchCompany(customerData.company);
    await customersPage.clickSearch();
    await page.waitForTimeout(1000);
    await verifySearchResult();

    // Reset and verify fields cleared
    await customersPage.clickReset();
    await page.waitForLoadState('networkidle').catch(() => {});
    expect(await customersPage.areSearchFieldsEmpty()).toBeTruthy();

    // 2) Search by email
    await customersPage.setSearchEmail(customerData.email);
    await customersPage.clickSearch();
    await page.waitForLoadState('networkidle').catch(() => {});
    await verifySearchResult();

    await customersPage.clickReset();
    await page.waitForLoadState('networkidle').catch(() => {});

    // 3) Search by label
    await customersPage.setSearchLabel(labelName);
    await customersPage.clickSearch();
    await page.waitForLoadState('networkidle').catch(() => {});
    await verifySearchResult();

    await customersPage.clickReset();
    await page.waitForLoadState('networkidle').catch(() => {});

    // 4) Search by status (Active)
    await customersPage.setSearchStatus('Active');
    await customersPage.clickSearch();
    await page.waitForLoadState('networkidle').catch(() => {});
    await verifySearchResult();

    await customersPage.clickReset();
    await page.waitForLoadState('networkidle').catch(() => {});

    // 5) Search by mobile
    await customersPage.setSearchMobile(customerData.phone);
    await customersPage.clickSearch();
    await page.waitForLoadState('networkidle').catch(() => {});
    await verifySearchResult();

    // Final reset and check fields are empty/default again
    await customersPage.clickReset();
    await page.waitForLoadState('networkidle').catch(() => {});
    expect(await customersPage.areSearchFieldsEmpty()).toBeTruthy();

    await page.screenshot({ path: 'artifacts/partner-customer-search.png', fullPage: true });
  });

  test('should show and hide customer table columns using Select Headers dropdown', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    await customersPage.navigateToCustomers();

    // Ensure headers dropdown is available
    await customersPage.openSelectHeadersDropdown();
    // Close once to start from a known state
    await page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});

    // Step 1: Unselect all optional headers
    await customersPage.unselectAllOptionalHeaders();

    // Step 2: Verify only 4 mandatory columns are visible - #, Company, Email and Action
    const visibleAfterUnselect = await customersPage.getVisibleHeaderTexts();
    const expectedMandatoryHeaders = ['#', 'Company', 'Email', 'Action'];

    // Check there are exactly 4 headers
    expect(visibleAfterUnselect.length).toBe(expectedMandatoryHeaders.length);
    // Check each mandatory header is present
    for (const header of expectedMandatoryHeaders) {
      expect(
        visibleAfterUnselect.some((h) => h.toLowerCase().includes(header.toLowerCase()))
      ).toBeTruthy();
    }

    // Optional headers that should be hidden
    const optionalHeaders = [
      'Name',
      'Mobile',
      'Label',
      'Last Login',
      'Status',
      'Customer Type',
      'Created At',
      'Country',
    ];
    for (const header of optionalHeaders) {
      expect(
        visibleAfterUnselect.some((h) => h.toLowerCase().includes(header.toLowerCase()))
      ).toBeFalsy();
    }

    // Step 3: Select all optional headers again
    await customersPage.selectAllOptionalHeaders();

    // Step 4: Verify all headers (mandatory + optional) are visible
    const visibleAfterSelectAll = await customersPage.getVisibleHeaderTexts();
    const allExpectedHeaders = expectedMandatoryHeaders.concat(optionalHeaders);
    for (const header of allExpectedHeaders) {
      expect(
        visibleAfterSelectAll.some((h) => h.toLowerCase().includes(header.toLowerCase()))
      ).toBeTruthy();
    }

    await page.screenshot({ path: 'artifacts/partner-customer-headers-toggle.png', fullPage: true });
  });

  test('should test pagination functionality with all items per page options', async ({ page }) => {
    test.setTimeout(120000); // Set timeout to 2 minutes for this test
    
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    
    // Step 1: Navigate to Customers module
    await customersPage.navigateToCustomers();
    await page.waitForLoadState('networkidle').catch(() => {});

    // Step 2: Check initial items per page
    const initialItemsPerPage = await customersPage.getItemsPerPage();
    expect(initialItemsPerPage).not.toBeNull();
    console.log(`Initial items per page: ${initialItemsPerPage}`);

    // Step 3: Verify number of visible records matches items per page
    const initialVisibleRows = await customersPage.getVisibleRowCount();
    const pageRangeInfo = await customersPage.getPageRangeFromInfo();
    
    // On first page, visible rows should match items per page (unless total records is less)
    if (pageRangeInfo && pageRangeInfo.total >= initialItemsPerPage) {
      expect(initialVisibleRows).toBe(initialItemsPerPage);
    } else if (pageRangeInfo) {
      // If total is less than items per page, visible rows should equal total
      expect(initialVisibleRows).toBe(pageRangeInfo.total);
    }

    // Step 4: Test next page (if available)
    const isNextEnabled = await customersPage.isNextPageEnabled();
    if (isNextEnabled) {
      await customersPage.clickNextPage();
      await page.waitForLoadState('networkidle').catch(() => {});
      
      // Verify we're on a different page
      const pageRangeAfterNext = await customersPage.getPageRangeFromInfo();
      if (pageRangeAfterNext && pageRangeInfo) {
        expect(pageRangeAfterNext.start).toBeGreaterThan(pageRangeInfo.start);
      }
      
      // Step 5: Test previous page
      await customersPage.clickPreviousPage();
      await page.waitForLoadState('networkidle').catch(() => {});
      
      // Verify we're back to original page
      const pageRangeAfterPrev = await customersPage.getPageRangeFromInfo();
      if (pageRangeAfterPrev && pageRangeInfo) {
        expect(pageRangeAfterPrev.start).toBe(pageRangeInfo.start);
      }
    }

    // Step 6: Test all items per page options
    const itemsPerPageOptions = [20, 50, 100, 200, 500];
    
    for (const itemsPerPage of itemsPerPageOptions) {
      console.log(`Testing items per page: ${itemsPerPage}`);
      
      // Set items per page
      await customersPage.setItemsPerPage(itemsPerPage);
      // Wait for table to update after changing items per page
      await page.waitForLoadState('networkidle').catch(() => {});
      await customersPage.totalDataInfo.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      
      // Verify items per page was set correctly
      const currentItemsPerPage = await customersPage.getItemsPerPage();
      expect(currentItemsPerPage).toBe(itemsPerPage);
      
      // Verify number of visible records matches items per page
      const visibleRows = await customersPage.getVisibleRowCount();
      const currentPageRange = await customersPage.getPageRangeFromInfo();
      
      if (currentPageRange) {
        // Calculate expected visible rows
        const expectedRows = Math.min(itemsPerPage, currentPageRange.total - currentPageRange.start + 1);
        expect(visibleRows).toBe(expectedRows);
        
        // Verify page range info shows correct range
        const rangeDiff = currentPageRange.end - currentPageRange.start + 1;
        expect(rangeDiff).toBeLessThanOrEqual(itemsPerPage);
      }
      
      // Test next page (if available)
      const canGoNext = await customersPage.isNextPageEnabled();
      if (canGoNext) {
        const pageRangeBeforeNext = await customersPage.getPageRangeFromInfo();
        await customersPage.clickNextPage();
        // Wait for pagination to complete
        await page.waitForLoadState('networkidle').catch(() => {});
        await customersPage.totalDataInfo.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        
        // Verify we moved to next page
        const pageRangeAfterNext = await customersPage.getPageRangeFromInfo();
        if (pageRangeBeforeNext && pageRangeAfterNext) {
          expect(pageRangeAfterNext.start).toBeGreaterThan(pageRangeBeforeNext.start);
          
          // Verify visible rows on next page
          const visibleRowsOnNextPage = await customersPage.getVisibleRowCount();
          if (pageRangeAfterNext.total >= pageRangeAfterNext.end) {
            const expectedRowsOnNextPage = Math.min(
              itemsPerPage,
              pageRangeAfterNext.end - pageRangeAfterNext.start + 1
            );
            expect(visibleRowsOnNextPage).toBe(expectedRowsOnNextPage);
          }
        }
        
        // Test previous page
        await customersPage.clickPreviousPage();
        // Wait for pagination to complete
        await page.waitForLoadState('networkidle').catch(() => {});
        await customersPage.totalDataInfo.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        
        // Verify we're back to previous page
        const pageRangeAfterPrev = await customersPage.getPageRangeFromInfo();
        if (pageRangeBeforeNext && pageRangeAfterPrev) {
          expect(pageRangeAfterPrev.start).toBe(pageRangeBeforeNext.start);
          expect(pageRangeAfterPrev.end).toBe(pageRangeBeforeNext.end);
        }
      }
    }

    // Capture screenshot after pagination tests
    await page.screenshot({ path: 'artifacts/partner-customer-pagination.png', fullPage: true });
  });

  test('should create a new label and search for it', async ({ page }) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    // Login and navigate
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });

    const customersPage = new CustomersPage(page);
    
    // Step 1: Navigate to Customers module
    await customersPage.navigateToCustomers();
    await page.waitForLoadState('networkidle').catch(() => {});

    // Step 2: Click on label dropdown
    await customersPage.openLabelDropdown();
    await page.waitForTimeout(500);

    // Step 3: Click "Manage Label" button
    await customersPage.clickManageLabel();
    
    // Step 4: Wait for manage label page to load
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Step 5: Click "+ Label" button to open add label modal
    await customersPage.clickAddLabel();
    await page.waitForTimeout(500);

    // Step 6: Generate unique label name
    const timestamp = Date.now();
    const labelName = `Tst${timestamp}`;
    const customColor = '#FF5733'; // Orange-red color
    
    console.log(`\n[STEP 6] Generated label name: "${labelName}" with color: "${customColor}"`);

    // Step 7: Enter label name
    console.log(`\n[STEP 7] Entering label name: "${labelName}"`);
    await customersPage.fillLabelName(labelName);
    await page.waitForTimeout(500);
    console.log('✓ Label name entered');

    // Step 8: Choose custom color
    console.log(`\n[STEP 8] Selecting custom color: "${customColor}"`);
    await customersPage.selectCustomColor(customColor);
    await page.waitForTimeout(500);
    console.log('✓ Color selected');

    // Step 9: Click submit button
    console.log('\n[STEP 9] Submitting label form...');
    await customersPage.submitLabelForm();
    console.log('✓ Label form submitted');
    
    // Wait for modal to close (if it closes automatically)
    console.log('\n[STEP 9.1] Waiting for modal to close...');
    await customersPage.labelNameInput.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    console.log('✓ Modal closed');
    
    // Wait for table to refresh
    console.log('\n[STEP 9.2] Waiting for table to refresh...');
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);
    console.log('✓ Table refresh complete');
    
    // Wait for success message if it appears
    console.log('\n[STEP 9.3] Checking for success message...');
    const successVisible = await customersPage.isSuccessMessageVisible().catch(() => false);
    if (successVisible) {
      console.log('✓ Success message appeared');
      await page.waitForTimeout(1000);
    } else {
      console.log('⚠ No success message found');
    }

    // Step 10: Verify added label is visible in records with correct name and color
    console.log(`\n[STEP 10] Verifying label "${labelName}" with color "${customColor}" in table...`);
    const labelVisible = await customersPage.verifyLabelInManageLabelTable(labelName, customColor);
    console.log(`Label verification result: ${labelVisible}`);
    expect(labelVisible).toBeTruthy();
    console.log('✓ Label verified in table');

    // Step 11: Navigate back to customers page
    console.log('\n[STEP 11] Navigating back to customers page...');
    await customersPage.navigateBackToCustomers();
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    console.log('✓ Navigated back to customers page');

    // Step 12: Click on label dropdown again
    console.log('\n[STEP 12] Opening label dropdown...');
    await customersPage.openLabelDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Label dropdown opened');

    // Step 13: Search for the created label
    console.log(`\n[STEP 13] Searching for label "${labelName}" in dropdown...`);
    await customersPage.fillLabelSearchInput(labelName);
    console.log(`✓ Search input filled with: "${labelName}"`);
    
    // Step 14: Verify created label shows in search results
    console.log(`\n[STEP 14] Verifying label "${labelName}" appears in dropdown search results...`);
    const labelFound = await customersPage.verifyLabelInDropdown(labelName);
    console.log(`Label found in dropdown: ${labelFound}`);
    expect(labelFound).toBeTruthy();
    console.log('✓ Label verified in dropdown');

    // Capture screenshot after label creation and search
    await page.screenshot({ path: 'artifacts/partner-label-created-searched.png', fullPage: true });
  });

  test('should edit an existing label and verify updates', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('\n=== Test: Edit Existing Label ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Login and navigate
    console.log('\n[STEP 1] Logging in to partner portal...');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Login successful');

    const customersPage = new CustomersPage(page);
    
    // Step 1: Navigate to Customers module
    console.log('\n[STEP 2] Navigating to Customers module...');
    await customersPage.navigateToCustomers();
    await page.waitForLoadState('networkidle').catch(() => {});
    console.log('✓ Navigated to Customers module');

    // Step 2: Click on label dropdown
    console.log('\n[STEP 3] Opening label dropdown...');
    await customersPage.openLabelDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Label dropdown opened');

    // Step 3: Click "Manage Label" button
    console.log('\n[STEP 4] Clicking "Manage Label" button...');
    await customersPage.clickManageLabel();
    
    // Step 4: Wait for manage label page to load
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    console.log('✓ Manage Label page loaded');

    // Step 5: Create a label first (to edit later)
    console.log('\n[STEP 5] Creating a label to edit...');
    await customersPage.clickAddLabel();
    await page.waitForTimeout(500);
    console.log('✓ Add Label modal opened');

    const timestamp = Date.now();
    // Label name limit is 20 characters, so keep it short
    // "Elabl" (5) + timestamp (13) = 18 characters (within limit)
    const originalLabelName = `Elabl${timestamp}`;
    const originalColor = '#FF5733'; // Orange-red color
    console.log(`Label name: "${originalLabelName}" (${originalLabelName.length} chars), Color: "${originalColor}"`);

    // Step 6: Enter original label name
    console.log('\n[STEP 6] Entering original label name...');
    await customersPage.fillLabelName(originalLabelName);
    await page.waitForTimeout(500);
    console.log(`✓ Label name entered: "${originalLabelName}"`);

    // Step 7: Choose original color
    console.log('\n[STEP 7] Selecting original color...');
    await customersPage.selectCustomColor(originalColor);
    await page.waitForTimeout(500);
    console.log(`✓ Color selected: "${originalColor}"`);

    // Step 8: Submit the form to create label
    console.log('\n[STEP 8] Submitting label form to create label...');
    await customersPage.submitLabelForm();
    console.log('✓ Label form submitted');
    
    // Wait for modal to close and table to refresh
    await customersPage.labelNameInput.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);

    // Wait for success message if it appears
    const successVisible1 = await customersPage.isSuccessMessageVisible().catch(() => false);
    if (successVisible1) {
      await page.waitForTimeout(1000);
      console.log('✓ Success message appeared');
    }

    // Step 9: Verify original label was created
    console.log(`\n[STEP 9] Verifying original label "${originalLabelName}" was created...`);
    const originalLabelVisible = await customersPage.verifyLabelInManageLabelTable(originalLabelName, originalColor);
    expect(originalLabelVisible).toBeTruthy();
    console.log('✓ Original label verified in table');

    // Step 10: Click edit button (pencil icon) for the label
    console.log(`\n[STEP 10] Clicking edit button for label "${originalLabelName}"...`);
    await customersPage.clickEditLabel(originalLabelName);
    await page.waitForTimeout(500);
    console.log('✓ Edit button clicked, modal opened');

    // Step 11: Update label name and color
    console.log('\n[STEP 11] Updating label name and color...');
    // Label name limit is 20 characters, so keep it short
    // "Upd" (3) + timestamp (13) = 16 characters (within limit)
    const updatedLabelName = `Upd${timestamp}`;
    const updatedColor = '#00FF00'; // Green color
    console.log(`Updated label name: "${updatedLabelName}" (${updatedLabelName.length} chars), Updated color: "${updatedColor}"`);

    await customersPage.updateLabelName(updatedLabelName);
    await page.waitForTimeout(500);
    console.log(`✓ Label name updated to: "${updatedLabelName}"`);

    await customersPage.updateLabelColor(updatedColor);
    await page.waitForTimeout(500);
    console.log(`✓ Color updated to: "${updatedColor}"`);

    // Step 12: Submit the updated form
    console.log('\n[STEP 12] Submitting updated label form...');
    await customersPage.submitLabelForm();
    console.log('✓ Updated label form submitted');
    
    // Wait for modal to close and table to refresh
    await customersPage.labelNameInput.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);

    // Wait for success message if it appears
    const successVisible2 = await customersPage.isSuccessMessageVisible().catch(() => false);
    if (successVisible2) {
      await page.waitForTimeout(1000);
      console.log('✓ Success message appeared');
    }

    // Step 13: Verify updated label name and color in the table
    console.log(`\n[STEP 13] Verifying updated label "${updatedLabelName}" in table...`);
    const updatedLabelVisible = await customersPage.verifyLabelInManageLabelTable(updatedLabelName, updatedColor);
    expect(updatedLabelVisible).toBeTruthy();
    console.log('✓ Updated label verified in table');

    // Step 14: Verify original label name no longer exists (or verify it's been updated)
    console.log(`\n[STEP 14] Verifying original label "${originalLabelName}" no longer exists...`);
    const originalLabelStillExists = await customersPage.verifyLabelInManageLabelTable(originalLabelName, originalColor);
    expect(originalLabelStillExists).toBeFalsy();
    console.log('✓ Original label confirmed to be updated (no longer exists with original name)');
    
    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);

    // Capture screenshot after label edit
    await page.screenshot({ path: 'artifacts/partner-label-edited.png', fullPage: true });
  });

  test('should delete a created label', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Delete Label ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Login and navigate
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    const customersPage = new CustomersPage(page);
    
    // Step 1: Navigate to Customers module
    console.log('\n[STEP 2] Navigating to Customers module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Customers module' });
    await customersPage.navigateToCustomers();
    await page.waitForLoadState('networkidle').catch(() => {});
    console.log('✓ Clicked on Customers menu item');

    // Step 2: Click on label dropdown
    console.log('\n[STEP 3] Opening label dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Open label dropdown' });
    await customersPage.openLabelDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Label dropdown opened');

    // Step 3: Click "Manage Label" button
    console.log('\n[STEP 4] Clicking "Manage Label" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Navigate to Manage Label page' });
    await customersPage.clickManageLabel();
    
    // Step 4: Wait for manage label page to load
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    console.log('✓ Manage Label page loaded');

    // Step 5: Create a label first (to delete later)
    console.log('\n[STEP 5] Creating a label to delete...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Create label' });
    await customersPage.clickAddLabel();
    await page.waitForTimeout(500);
    console.log('✓ Add Label modal opened');

    const timestamp = Date.now();
    const labelName = `Dlab${timestamp}`;
    const labelColor = '#FF5733'; // Orange-red color
    console.log(`✓ Label name: "${labelName}", Color: "${labelColor}"`);

    // Step 6: Enter label name
    console.log('\n[STEP 6] Filling label form...');
    await customersPage.fillLabelName(labelName);
    await page.waitForTimeout(500);
    console.log('✓ Label name entered');

    // Step 7: Choose color
    await customersPage.selectCustomColor(labelColor);
    await page.waitForTimeout(500);
    console.log('✓ Color selected');

    // Step 8: Submit the form to create label
    console.log('\n[STEP 7] Submitting label form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Submit label form' });
    await customersPage.submitLabelForm();
    console.log('✓ Label form submitted');
    
    // Wait for modal to close and table to refresh
    await customersPage.labelNameInput.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);

    // Step 9: Verify label was created
    console.log('\n[VERIFICATION 1] Verifying label was created...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify label created' });
    const labelCreated = await customersPage.verifyLabelInManageLabelTable(labelName, labelColor);
    expect(labelCreated).toBeTruthy();
    console.log(`✓ Label "${labelName}" found in table with color "${labelColor}"`);
    console.log('✓ Label creation verification PASSED');

    // Step 10: Click delete button (trash icon) for the created label
    console.log('\n[STEP 8] Clicking delete button for label...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Click delete button' });
    await customersPage.clickDeleteLabel(labelName);
    await page.waitForTimeout(500);
    console.log('✓ Delete button clicked, confirmation modal opened');

    // Step 11: Confirm deletion by clicking Yes in the modal
    console.log('\n[STEP 9] Confirming deletion...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Confirm deletion' });
    await customersPage.confirmDeleteLabel();
    console.log('✓ Deletion confirmed');
    
    // Wait for deletion to complete and table to refresh
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);

    // Wait for success message if it appears
    const successVisible = await customersPage.isSuccessMessageVisible().catch(() => false);
    if (successVisible) {
      await page.waitForTimeout(1000);
      console.log('✓ Success message appeared');
    }

    // Step 12: Verify label is deleted (not in records)
    console.log('\n[VERIFICATION 2] Verifying label is deleted...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify label deleted' });
    const labelDeleted = await customersPage.verifyLabelDeleted(labelName);
    expect(labelDeleted).toBeTruthy();
    console.log(`✓ Label "${labelName}" is deleted (not found in table)`);
    console.log('✓ Label deletion verification PASSED');

    // Step 13: Double-check by verifying label is not visible in table
    console.log('\n[VERIFICATION 3] Double-checking label is not in table...');
    const labelStillExists = await customersPage.verifyLabelInManageLabelTable(labelName, labelColor);
    expect(labelStillExists).toBeFalsy();
    console.log(`✓ Label "${labelName}" confirmed not in table`);
    console.log('✓ Label removal verification PASSED');

    // Capture screenshot after label deletion
    console.log('\n[STEP 10] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-label-deleted.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-label-deleted.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  test('should not allow creating duplicate label names', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    console.log('=== Test: Prevent Duplicate Label Names ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Login and navigate
    console.log('\n[STEP 1] Logging in to partner portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to partner portal' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Dashboard title is visible');
    console.log('✓ Login verification PASSED');

    const customersPage = new CustomersPage(page);
    
    // Step 1: Navigate to Customers module
    console.log('\n[STEP 2] Navigating to Customers module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Customers module' });
    await customersPage.navigateToCustomers();
    await page.waitForLoadState('networkidle').catch(() => {});
    console.log('✓ Clicked on Customers menu item');

    // Step 2: Click on label dropdown
    console.log('\n[STEP 3] Opening label dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Open label dropdown' });
    await customersPage.openLabelDropdown();
    await page.waitForTimeout(500);
    console.log('✓ Label dropdown opened');

    // Step 3: Click "Manage Label" button
    console.log('\n[STEP 4] Clicking "Manage Label" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Navigate to Manage Label page' });
    await customersPage.clickManageLabel();
    
    // Step 4: Wait for manage label page to load
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    console.log('✓ Manage Label page loaded');

    // Step 5: Create first label
    console.log('\n[STEP 5] Creating first label...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Create first label' });
    await customersPage.clickAddLabel();
    await page.waitForTimeout(500);
    console.log('✓ Add Label modal opened');

    const timestamp = Date.now();
    const labelName = `Dupl${timestamp}`;
    const labelColor = '#FF5733'; // Orange-red color
    console.log(`✓ Label name: "${labelName}", Color: "${labelColor}"`);

    // Step 6: Enter label name
    console.log('\n[STEP 6] Filling label form...');
    await customersPage.fillLabelName(labelName);
    await page.waitForTimeout(500);
    console.log('✓ Label name entered');

    // Step 7: Choose color
    await customersPage.selectCustomColor(labelColor);
    await page.waitForTimeout(500);
    console.log('✓ Color selected');

    // Step 8: Submit the form to create first label
    console.log('\n[STEP 7] Submitting label form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Submit first label form' });
    await customersPage.submitLabelForm();
    console.log('✓ Label form submitted');
    
    // Wait for modal to close and table to refresh
    await customersPage.labelNameInput.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);
    
    // Wait for success message if it appears (gives table time to refresh)
    const successVisible = await customersPage.isSuccessMessageVisible().catch(() => false);
    if (successVisible) {
      await page.waitForTimeout(1000);
      console.log('✓ Success message appeared');
    }

    // Step 9: Verify first label was created
    console.log('\n[VERIFICATION 1] Verifying first label was created...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify first label created' });
    const firstLabelCreated = await customersPage.verifyLabelInManageLabelTable(labelName, labelColor);
    expect(firstLabelCreated).toBeTruthy();
    console.log(`✓ First label "${labelName}" found in table with color "${labelColor}"`);
    console.log('✓ First label creation verification PASSED');

    // Step 10: Count labels with the same name (should be 1)
    console.log('\n[VERIFICATION 2] Counting labels with same name...');
    const countBeforeDuplicate = await customersPage.countLabelsByName(labelName);
    expect(countBeforeDuplicate).toBe(1);
    console.log(`✓ Label count before duplicate attempt: ${countBeforeDuplicate}`);
    console.log('✓ Label count verification PASSED');

    // Step 11: Try to create another label with the same name
    console.log('\n[STEP 8] Attempting to create duplicate label...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Try to create duplicate label' });
    await customersPage.clickAddLabel();
    await page.waitForTimeout(500);
    console.log('✓ Add Label modal opened again');

    // Step 12: Enter the same label name
    console.log('\n[STEP 9] Filling duplicate label form...');
    await customersPage.fillLabelName(labelName);
    await page.waitForTimeout(500);
    console.log('✓ Same label name entered');

    // Step 13: Choose a different color (or same color)
    const duplicateColor = '#00FF00'; // Green color
    await customersPage.selectCustomColor(duplicateColor);
    await page.waitForTimeout(500);
    console.log(`✓ Different color selected: "${duplicateColor}"`);

    // Step 14: Submit the form (should show error)
    console.log('\n[STEP 10] Submitting duplicate label form...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Submit duplicate label form' });
    await customersPage.submitLabelForm();
    console.log('✓ Duplicate label form submitted');
    
    // Wait for toast/error message to appear
    await page.waitForTimeout(2000);

    // Step 15: Verify error toast is visible
    console.log('\n[VERIFICATION 3] Verifying error toast appears...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify error toast' });
    const errorToastVisible = await customersPage.isErrorToastVisible();
    expect(errorToastVisible).toBeTruthy();
    console.log('✓ Error toast is visible');

    // Step 16: Get and verify error toast message
    console.log('[VERIFICATION 4] Verifying error toast message...');
    const errorMessage = await customersPage.getErrorToastMessage();
    expect(errorMessage).not.toBeNull();
    console.log(`✓ Error toast message: "${errorMessage}"`);
    expect(errorMessage.toLowerCase()).toMatch(/error|already|duplicate|exists|same|name/i);
    console.log('✓ Error message contains expected keywords');
    console.log('✓ Error toast verification PASSED');

    // Step 17: Wait for modal to close (if it closes automatically) or close it manually
    console.log('\n[STEP 11] Closing modal if still open...');
    await customersPage.labelNameInput.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    // If modal is still open, close it
    if (await customersPage.labelNameInput.isVisible({ timeout: 1000 }).catch(() => false)) {
      await customersPage.cancelButton.click().catch(() => {});
      console.log('✓ Modal closed manually');
    } else {
      console.log('✓ Modal closed automatically');
    }
    
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);

    // Step 18: Verify duplicate label was not created - count should still be 1
    console.log('\n[VERIFICATION 5] Verifying duplicate label was not created...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Verify duplicate not created' });
    const countAfterDuplicate = await customersPage.countLabelsByName(labelName);
    expect(countAfterDuplicate).toBe(1);
    console.log(`✓ Label count after duplicate attempt: ${countAfterDuplicate}`);
    console.log('✓ Duplicate label prevention verification PASSED');

    // Step 19: Verify only one label with the same name exists in the table
    console.log('\n[VERIFICATION 6] Verifying original label still exists...');
    const labelStillExists = await customersPage.verifyLabelInManageLabelTable(labelName, labelColor);
    expect(labelStillExists).toBeTruthy();
    console.log(`✓ Original label "${labelName}" with color "${labelColor}" still exists`);
    console.log('✓ Original label verification PASSED');

    
  

    // Capture screenshot after duplicate label attempt
    console.log('\n[STEP 12] Capturing screenshot...');
    await page.screenshot({ path: 'artifacts/partner-label-duplicate-prevented.png', fullPage: true });
    console.log('✓ Screenshot captured: artifacts/partner-label-duplicate-prevented.png');

    console.log('\n=== Test completed successfully ===');
    console.log(`Test ended at: ${new Date().toISOString()}`);
  });

  
});

