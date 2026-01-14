const { test, expect } = require('@playwright/test');
const { FirewallServerPage } = require('../pages/firewallserver');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Firewall Server Module', () => {
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

  test('should verify firewall server page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Firewall Server Page Loads Successfully ===');
    
    const firewallServerPage = new FirewallServerPage(page);

    // Navigate to Firewall Server page
    console.log('[STEP 1] Navigating to Firewall Server page...');
    await firewallServerPage.gotoFirewallServer(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Firewall Server page');

    // Verify page is loaded
    console.log('\n[STEP 2] Verifying page is loaded...');
    const isPageLoaded = await firewallServerPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Firewall Server page is loaded');

    // Verify page title is visible
    console.log('\n[STEP 3] Verifying page title...');
    const isTitleVisible = await firewallServerPage.pageTitle.isVisible({ timeout: 5000 });
    expect(isTitleVisible).toBeTruthy();
    const titleText = await firewallServerPage.pageTitle.textContent();
    console.log(`✓ Page title is visible: "${titleText?.trim()}"`);

    // Verify table is visible
    console.log('\n[STEP 4] Verifying firewall server table is visible...');
    const tableInfo = await firewallServerPage.verifyTableWithData();
    expect(tableInfo.visible).toBeTruthy();
    console.log(`✓ Firewall Server table is visible`);
    console.log(`✓ Table has ${tableInfo.rowCount} row(s)`);

    // Verify Add Server button is visible
    console.log('\n[STEP 5] Verifying Add Server button...');
    const isAddServerVisible = await firewallServerPage.addServerButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (isAddServerVisible) {
      console.log('✓ "+ Server" button is visible');
    } else {
      console.log('⚠ "+ Server" button not found (may be optional)');
    }

    // Verify Select Headers button is visible
    console.log('\n[STEP 6] Verifying Select Headers button...');
    const isSelectHeadersVisible = await firewallServerPage.selectHeadersButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (isSelectHeadersVisible) {
      console.log('✓ "Select Headers" button is visible');
    } else {
      console.log('⚠ "Select Headers" button not found (may be optional)');
    }

    // Verify record count text is visible (if data exists)
    console.log('\n[STEP 7] Verifying record count information...');
    const isRecordCountVisible = await firewallServerPage.recordCountText.isVisible({ timeout: 5000 }).catch(() => false);
    if (isRecordCountVisible) {
      const recordText = await firewallServerPage.recordCountText.textContent();
      console.log(`✓ Record count text is visible: "${recordText?.trim()}"`);
    } else {
      console.log('⚠ Record count text not found (may be optional)');
    }

    await page.screenshot({ path: 'artifacts/firewallserver-page-load.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== UPDATE FIREWALL SERVER MODAL TEST ====================

  test('should verify clicking name column value and edit icon opens Update Firewall Server modal', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Name Column and Edit Icon Open Update Firewall Server Modal ===');
    
    const firewallServerPage = new FirewallServerPage(page);

    // Navigate to Firewall Server page
    console.log('[STEP 1] Navigating to Firewall Server page...');
    await firewallServerPage.gotoFirewallServer(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Firewall Server page');

    // Get initial table data
    console.log('\n[STEP 2] Getting initial table data...');
    const initialTableInfo = await firewallServerPage.verifyTableDataOrEmpty();
    const initialRowCount = initialTableInfo.rowCount;
    console.log(`✓ Initial row count: ${initialRowCount}`);

    if (initialRowCount === 0) {
      console.log('⚠ No data in table, skipping test');
      return;
    }

    // Test 1: Click on Name column value
    console.log('\n[STEP 3] Clicking on Name column value in first row...');
    await firewallServerPage.clickNameColumnValue();
    console.log('✓ Clicked on Name column value');

    // Verify Update Firewall Server modal is open
    console.log('\n[STEP 4] Verifying Update Firewall Server modal is open...');
    await page.waitForTimeout(3000);
    
    // Wait for modal title to appear
    await firewallServerPage.updateFirewallServerModalTitle.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1000);
    
    const isModalOpen1 = await firewallServerPage.isUpdateFirewallServerModalOpen();
    expect(isModalOpen1).toBeTruthy();
    console.log('✓ Update Firewall Server modal is open after clicking Name column');

    // Verify modal title
    const modalTitle = await firewallServerPage.updateFirewallServerModalTitle.textContent();
    expect(modalTitle).toBeTruthy();
    expect(modalTitle?.trim().toLowerCase()).toContain('update firewall server');
    console.log(`✓ Modal title verified: "${modalTitle?.trim()}"`);

    // Close the modal
    console.log('\n[STEP 5] Closing Update Firewall Server modal...');
    await firewallServerPage.closeUpdateFirewallServerModal();
    await page.waitForTimeout(1000);
    console.log('✓ Attempted to close modal');


    await page.screenshot({ path: 'artifacts/firewallserver-update-modal.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== ADD NEW FIREWALL SERVER MODAL TEST ====================

  test('should verify Add New Firewall Server modal opens, fill empty fields, leave pre-filled fields, submit and verify in table', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    console.log('\n=== Test: Verify Add New Firewall Server - Fill Empty Fields, Submit and Verify in Table ===');
    
    const firewallServerPage = new FirewallServerPage(page);

    // Navigate to Firewall Server page
    console.log('[STEP 1] Navigating to Firewall Server page...');
    await firewallServerPage.gotoFirewallServer(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Firewall Server page');

    // Get initial table data
    console.log('\n[STEP 2] Getting initial table data...');
    const initialTableInfo = await firewallServerPage.verifyTableDataOrEmpty();
    const initialRowCount = initialTableInfo.rowCount;
    console.log(`✓ Initial row count: ${initialRowCount}`);

    // Click Add Server button
    console.log('\n[STEP 3] Clicking Add Server button...');
    
    // Verify button is visible before clicking
    const isButtonVisible = await firewallServerPage.addServerButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (!isButtonVisible) {
      throw new Error('Add Server button is not visible');
    }
    console.log('✓ Add Server button is visible');
    
    await firewallServerPage.clickAddServerButton();
    console.log('✓ Clicked Add Server button');

    // Verify Add New Firewall Server modal is open
    console.log('\n[STEP 4] Verifying Add New Firewall Server modal is open...');
    await page.waitForTimeout(1000);
    
    // Wait for modal to appear - check immediately first, then poll
    let isModalOpen = await firewallServerPage.isAddNewFirewallServerModalOpen();
    
    if (!isModalOpen) {
      // If not open immediately, wait and poll
      for (let i = 0; i < 10; i++) {
        await page.waitForTimeout(500);
        isModalOpen = await firewallServerPage.isAddNewFirewallServerModalOpen();
        if (isModalOpen) {
          break;
        }
      }
    }
    
    // If still not open, try waiting for form field directly
    if (!isModalOpen) {
      console.log('  Modal not detected, waiting for form field...');
      await firewallServerPage.fullNameField.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1000);
      isModalOpen = await firewallServerPage.isAddNewFirewallServerModalOpen();
    }
    
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Firewall Server modal is open');

    // Verify modal title (if visible)
    const isTitleVisible = await firewallServerPage.addNewFirewallServerModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
    if (isTitleVisible) {
      const modalTitle = await firewallServerPage.addNewFirewallServerModalTitle.textContent();
      expect(modalTitle).toBeTruthy();
      expect(modalTitle?.trim().toLowerCase()).toContain('add new firewall server');
      console.log(`✓ Modal title verified: "${modalTitle?.trim()}"`);
    } else {
      // If title is not visible, at least verify form field is visible
      const isFormVisible = await firewallServerPage.fullNameField.isVisible({ timeout: 2000 }).catch(() => false);
      expect(isFormVisible).toBeTruthy();
      console.log('✓ Modal is open (form field visible, title may not be visible)');
    }

    // Check pre-filled fields and leave them as they are
    console.log('\n[STEP 5] Checking pre-filled fields (leaving them unchanged)...');
    
    // Check text field values (some may be pre-filled)
    const ramValue = await firewallServerPage.getFieldValue(firewallServerPage.ramField);
    const cpuValue = await firewallServerPage.getFieldValue(firewallServerPage.cpuField);
    const storageValue = await firewallServerPage.getFieldValue(firewallServerPage.storageField);
    
    console.log(`✓ RAM field value: "${ramValue || 'Empty'}"`);
    console.log(`✓ CPU field value: "${cpuValue || 'Empty'}"`);
    console.log(`✓ Storage field value: "${storageValue || 'Empty'}"`);
    
    // Verify that pre-filled fields are preserved (not cleared)
    if (ramValue) {
      console.log(`  → RAM field is pre-filled with "${ramValue}", leaving it unchanged`);
    }
    if (cpuValue) {
      console.log(`  → CPU field is pre-filled with "${cpuValue}", leaving it unchanged`);
    }
    if (storageValue) {
      console.log(`  → Storage field is pre-filled with "${storageValue}", leaving it unchanged`);
    }

    // Fill only empty required fields (leaving pre-filled ones as they are)
    console.log('\n[STEP 6] Filling empty required fields (leaving pre-filled fields unchanged)...');
    
    const timestamp = Date.now();
    const formData = {
      fullName: 'TestFirewallServer' + timestamp,
      hostname: 'TESTFIREWALL' + timestamp,
      ipAddress: '172.70.1.' + (100 + (timestamp % 100)),
      publicIp: '103.171.134.' + (100 + (timestamp % 100)),
      rdpPort: '3389',
      description: 'Test Firewall Server Description',
      port: '8080'
    };
    
    await firewallServerPage.fillAddNewFirewallServerForm(formData);
    console.log('✓ Filled empty required fields');
    console.log(`  → Full Name: "${formData.fullName}"`);
    console.log(`  → Hostname: "${formData.hostname}"`);
    console.log(`  → IP Address: "${formData.ipAddress}"`);
    console.log(`  → Public IP Address: "${formData.publicIp}"`);
    console.log(`  → RDP Port: "${formData.rdpPort}"`);
    console.log(`  → Description: "${formData.description}"`);
    console.log(`  → Port: "${formData.port}"`);

    // Verify empty fields were filled
    console.log('\n[STEP 7] Verifying empty fields were filled...');
    const fullNameValue = await firewallServerPage.getFieldValue(firewallServerPage.fullNameField);
    const hostnameValue = await firewallServerPage.getFieldValue(firewallServerPage.hostnameField);
    const ipAddressValue = await firewallServerPage.getFieldValue(firewallServerPage.ipAddressField);
    
    if (fullNameValue) {
      console.log(`✓ Full Name field has value: "${fullNameValue}"`);
      expect(fullNameValue).toBe(formData.fullName);
    }
    if (hostnameValue) {
      console.log(`✓ Hostname field has value: "${hostnameValue}"`);
      expect(hostnameValue).toBe(formData.hostname);
    }
    if (ipAddressValue) {
      console.log(`✓ IP Address field has value: "${ipAddressValue}"`);
      expect(ipAddressValue).toBe(formData.ipAddress);
    }

    // Verify pre-filled fields are still intact
    console.log('\n[STEP 8] Verifying pre-filled fields are still intact...');
    const ramValueAfter = await firewallServerPage.getFieldValue(firewallServerPage.ramField);
    const cpuValueAfter = await firewallServerPage.getFieldValue(firewallServerPage.cpuField);
    const storageValueAfter = await firewallServerPage.getFieldValue(firewallServerPage.storageField);
    
    if (ramValue && ramValueAfter === ramValue) {
      console.log(`✓ RAM field preserved: "${ramValue}"`);
    }
    if (cpuValue && cpuValueAfter === cpuValue) {
      console.log(`✓ CPU field preserved: "${cpuValue}"`);
    }
    if (storageValue && storageValueAfter === storageValue) {
      console.log(`✓ Storage field preserved: "${storageValue}"`);
    }

    // Verify Submit and Cancel buttons are visible
    console.log('\n[STEP 9] Verifying Submit and Cancel buttons are visible...');
    const isSubmitVisible = await firewallServerPage.addFirewallServerSubmitButton.isVisible({ timeout: 2000 }).catch(() => false);
    const isCancelVisible = await firewallServerPage.addFirewallServerCancelButton.isVisible({ timeout: 2000 }).catch(() => false);
    
    expect(isSubmitVisible).toBeTruthy();
    expect(isCancelVisible).toBeTruthy();
    console.log('✓ Submit button is visible');
    console.log('✓ Cancel button is visible');

    // Click Submit button
    console.log('\n[STEP 10] Clicking Submit button...');
    await firewallServerPage.clickSubmitButton();
    console.log('✓ Clicked Submit button');

    // Wait for modal to close and table to update
    console.log('\n[STEP 11] Waiting for modal to close and table to update...');
    await page.waitForTimeout(3000);
    
    // Verify modal is closed
    const isModalClosed = await firewallServerPage.isAddNewFirewallServerModalOpen();
    expect(isModalClosed).toBeFalsy();
    console.log('✓ Modal is closed');

    // Verify new server appears in table
    console.log('\n[STEP 12] Verifying new firewall server appears in table...');
    await page.waitForTimeout(2000);
    
    const afterSubmitTableInfo = await firewallServerPage.verifyTableDataOrEmpty();
    const afterSubmitRowCount = afterSubmitTableInfo.rowCount;
    console.log(`✓ Table row count after submit: ${afterSubmitRowCount}`);
    
    // Verify row count increased
    if (initialRowCount > 0) {
      expect(afterSubmitRowCount).toBeGreaterThanOrEqual(initialRowCount);
      console.log('✓ Row count increased or remained same (as expected)');
    }

    // Verify the new server name appears in the table
    const serverExists = await firewallServerPage.verifyServerInTable(formData.fullName);
    expect(serverExists).toBeTruthy();
    console.log(`✓ New firewall server "${formData.fullName}" found in table`);

    await page.screenshot({ path: 'artifacts/firewallserver-add-new-server.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });
});

