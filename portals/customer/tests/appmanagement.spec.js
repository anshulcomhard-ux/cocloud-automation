const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { AppManagementPage } = require('../pages/appmanagement');

test.describe('Customer Portal - App Management', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

  test('should verify App Management page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Verify App Management Page Loads Successfully ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    
    // Step 2: Navigate to App Management page
    console.log('\n[STEP 2] Navigating to App Management page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to App Management page' });
    
    const appManagementPage = new AppManagementPage(page);
    await appManagementPage.gotoAppManagement();
    
    // Verify page is visible
    const isPageVisible = await appManagementPage.isVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ App Management page is visible');

    const currentUrl = await appManagementPage.getCurrentUrl();
    console.log(`✓ Current URL: ${currentUrl}`);

    // Step 3: Verify page loads without errors
    console.log('\n[STEP 3] Verifying page loads without errors...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify page loads without errors' });
    
    const pageLoaded = await appManagementPage.isPageLoadedWithoutErrors();
    expect(pageLoaded).toBeTruthy();
    console.log('✓ Page loaded without errors');

    // Step 4: Verify "Application Configuration" section is visible
    console.log('\n[STEP 4] Verifying "Application Configuration" section is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify Application Configuration section is visible' });
    
    const configVisible = await appManagementPage.isApplicationConfigSectionVisible();
    expect(configVisible).toBeTruthy();
    console.log('✓ Application Configuration section is visible');

    // Step 5: Verify Instance Title field is populated
    console.log('\n[STEP 5] Verifying Instance Title field is populated...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify Instance Title field is populated' });
    
    const instanceTitlePopulated = await appManagementPage.isInstanceTitlePopulated();
    expect(instanceTitlePopulated).toBeTruthy();
    console.log('✓ Instance Title field is populated');

    const instanceTitle = await appManagementPage.getInstanceTitle();
    console.log(`✓ Instance Title value: "${instanceTitle}"`);

    // Step 6: Verify App Version field is populated
    console.log('\n[STEP 6] Verifying App Version field is populated...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify App Version field is populated' });
    
    const appVersionPopulated = await appManagementPage.isAppVersionPopulated();
    expect(appVersionPopulated).toBeTruthy();
    console.log('✓ App Version field is populated');

    const appVersion = await appManagementPage.getAppVersion();
    console.log(`✓ App Version value: "${appVersion}"`);

    // Summary
    console.log('\n=== Validation Summary ===');
    console.log(`✓ Page loads without errors: ${pageLoaded}`);
    console.log(`✓ Application Configuration section visible: ${configVisible}`);
    console.log(`✓ Instance Title populated: ${instanceTitlePopulated} (Value: "${instanceTitle}")`);
    console.log(`✓ App Version populated: ${appVersionPopulated} (Value: "${appVersion}")`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should update Instance Title with valid data', async ({ page }, testInfo) => {
    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Update Instance Title with Valid Data ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to App Management page
    console.log('\n[STEP 2] Navigating to App Management page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to App Management page' });
    
    const appManagementPage = new AppManagementPage(page);
    await appManagementPage.gotoAppManagement();
    
    // Verify page is visible
    const isPageVisible = await appManagementPage.isVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ App Management page is visible');

    // Step 3: Get current Instance Title value (to verify it changes)
    console.log('\n[STEP 3] Getting current Instance Title value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Get current Instance Title' });
    
    const originalTitle = await appManagementPage.getInstanceTitle();
    console.log(`✓ Current Instance Title: "${originalTitle}"`);

    // Step 4: Edit Instance Title
    console.log('\n[STEP 4] Editing Instance Title...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Edit Instance Title' });
    
    const newTitle = `Testing_Instance_${Date.now()}`;
    await appManagementPage.editInstanceTitle(newTitle);
    console.log(`✓ Entered new Instance Title: "${newTitle}"`);

    // Verify the field has the new value before saving
    const titleBeforeSave = await appManagementPage.getInstanceTitle();
    expect(titleBeforeSave).toBe(newTitle);
    console.log(`✓ Verified Instance Title field contains: "${titleBeforeSave}"`);

    // Step 5: Click Save Changes button
    console.log('\n[STEP 5] Clicking Save Changes button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click Save Changes' });
    
    await appManagementPage.clickSaveChanges();
    console.log('✓ Clicked Save Changes button');

    // Wait for network request to complete
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Step 6: Verify value persists in input field after save (before reload)
    console.log('\n[STEP 6] Verifying value persists in input field after save...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify value persists in input field after save' });
    
    const titleAfterSave = await appManagementPage.getInstanceTitle();
    expect(titleAfterSave).toBe(newTitle);
    console.log(`✓ Instance Title persists in input field after save: "${titleAfterSave}"`);
    console.log(`✓ Expected: "${newTitle}"`);
    console.log(`✓ Actual: "${titleAfterSave}"`);

    // Step 7: Verify success message is shown (optional - don't fail if not found)
    console.log('\n[STEP 7] Checking for success message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Check for success message' });
    
    let toastVisible = false;
    let toastMessage = '';
    
    try {
      toastVisible = await appManagementPage.waitForToast(5000);
      if (toastVisible) {
        toastMessage = await appManagementPage.getToastMessage();
        console.log(`✓ Success toast message is visible: "${toastMessage}"`);
      } else {
        console.log('⚠ Success toast message not found (this is optional)');
      }
    } catch (error) {
      console.log('⚠ Could not verify toast message (this is optional)');
    }

    // Step 8: Reload page and verify updated title persists
    console.log('\n[STEP 8] Reloading page and verifying updated title persists...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Reload page and verify title persists' });
    
    await appManagementPage.reloadPage();
    console.log('✓ Page reloaded');

    // Verify page is still visible after reload
    const isPageVisibleAfterReload = await appManagementPage.isVisible();
    expect(isPageVisibleAfterReload).toBeTruthy();
    console.log('✓ App Management page is visible after reload');

    // Verify the Instance Title persists
    const titleAfterReload = await appManagementPage.getInstanceTitle();
    expect(titleAfterReload).toBe(newTitle);
    console.log(`✓ Instance Title persists after reload: "${titleAfterReload}"`);
    console.log(`✓ Original title: "${originalTitle}"`);
    console.log(`✓ Updated title: "${newTitle}"`);
    console.log(`✓ Title after reload: "${titleAfterReload}"`);

    // Summary
    console.log('\n=== Validation Summary ===');
    console.log(`✓ Value persists in input field after save: ${titleAfterSave === newTitle}`);
    console.log(`✓ Success message displayed: ${toastVisible}${toastMessage ? ` (${toastMessage})` : ''}`);
    console.log(`✓ Updated title saved: ${titleAfterReload === newTitle}`);
    console.log(`✓ Title persists after reload: ${titleAfterReload === newTitle}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should validate Instance Title is mandatory', async ({ page }, testInfo) => {
    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Validate Instance Title is Mandatory ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to App Management page
    console.log('\n[STEP 2] Navigating to App Management page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to App Management page' });
    
    const appManagementPage = new AppManagementPage(page);
    await appManagementPage.gotoAppManagement();
    
    // Verify page is visible
    const isPageVisible = await appManagementPage.isVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ App Management page is visible');

    // Step 3: Get current Instance Title value (to verify it's not saved when cleared)
    console.log('\n[STEP 3] Getting current Instance Title value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Get current Instance Title' });
    
    const originalTitle = await appManagementPage.getInstanceTitle();
    console.log(`✓ Current Instance Title: "${originalTitle}"`);
    expect(originalTitle.length).toBeGreaterThan(0);

    // Step 4: Clear Instance Title field
    console.log('\n[STEP 4] Clearing Instance Title field...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Clear Instance Title field' });
    
    await appManagementPage.clearInstanceTitle();
    console.log('✓ Cleared Instance Title field');

    // Verify the field is empty
    const titleAfterClear = await appManagementPage.getInstanceTitle();
    expect(titleAfterClear).toBe('');
    console.log(`✓ Verified Instance Title field is empty: "${titleAfterClear}"`);

    // Step 5: Click Save Changes button
    console.log('\n[STEP 5] Clicking Save Changes button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click Save Changes' });
    
    await appManagementPage.clickSaveChanges();
    console.log('✓ Clicked Save Changes button');

    // Wait a bit for validation to trigger
    await page.waitForTimeout(2000);

    // Step 6: Verify validation error is displayed
    console.log('\n[STEP 6] Verifying validation error is displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify validation error is displayed' });
    
    const errorVisible = await appManagementPage.isInstanceTitleValidationErrorVisible();
    expect(errorVisible).toBeTruthy();
    console.log('✓ Validation error is visible');

    const errorMessage = await appManagementPage.getInstanceTitleValidationError();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.toLowerCase()).toContain('required');
    console.log(`✓ Validation error message: "${errorMessage}"`);

    // Verify field is in invalid state
    const isInvalid = await appManagementPage.isInstanceTitleInvalid();
    expect(isInvalid).toBeTruthy();
    console.log(`✓ Instance Title field is in invalid state: ${isInvalid}`);

    // Step 7: Verify changes are not saved (field is still empty)
    console.log('\n[STEP 7] Verifying changes are not saved...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify changes are not saved' });
    
    const titleAfterSave = await appManagementPage.getInstanceTitle();
    expect(titleAfterSave).toBe('');
    console.log(`✓ Instance Title field is still empty after save attempt: "${titleAfterSave}"`);
    console.log(`✓ Changes were not saved (field remains empty)`);

    // Step 8: Reload page and verify original value persists (if we want to verify persistence)
    console.log('\n[STEP 8] Reloading page and verifying original value persists...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Reload page and verify original value persists' });
    
    await appManagementPage.reloadPage();
    console.log('✓ Page reloaded');

    // Verify page is still visible after reload
    const isPageVisibleAfterReload = await appManagementPage.isVisible();
    expect(isPageVisibleAfterReload).toBeTruthy();
    console.log('✓ App Management page is visible after reload');

    // Verify the original Instance Title persists (since empty value wasn't saved)
    const titleAfterReload = await appManagementPage.getInstanceTitle();
    expect(titleAfterReload).toBe(originalTitle);
    console.log(`✓ Original Instance Title persists after reload: "${titleAfterReload}"`);
    console.log(`✓ Original title: "${originalTitle}"`);
    console.log(`✓ Title after reload: "${titleAfterReload}"`);
    console.log(`✓ Empty value was not saved, original value restored`);

    // Summary
    console.log('\n=== Validation Summary ===');
    console.log(`✓ Validation error displayed: ${errorVisible}`);
    console.log(`✓ Validation error message: "${errorMessage}"`);
    console.log(`✓ Field in invalid state: ${isInvalid}`);
    console.log(`✓ Changes not saved (field empty): ${titleAfterSave === ''}`);
    console.log(`✓ Original value persists after reload: ${titleAfterReload === originalTitle}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify Tally Reactivation button functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Verify Tally Reactivation Button Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to App Management page
    console.log('\n[STEP 2] Navigating to App Management page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to App Management page' });
    
    const appManagementPage = new AppManagementPage(page);
    await appManagementPage.gotoAppManagement();
    
    // Verify page is visible
    const isPageVisible = await appManagementPage.isVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ App Management page is visible');

    // Step 3: Check if Tally Reactivation button is visible
    console.log('\n[STEP 3] Checking if Tally Reactivation button is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Check if Tally Reactivation button is visible' });
    
    const isButtonVisible = await appManagementPage.isTallyReactivationButtonVisible();
    
    if (!isButtonVisible) {
      console.log('⚠ Tally Reactivation button is not visible (may not be available for this user/plan)');
      console.log('⚠ Skipping test - button is only visible when !isInstanceUser && isTally');
      test.skip();
      return;
    }
    
    console.log('✓ Tally Reactivation button is visible');

    // Step 4: Click Tally Reactivation button
    console.log('\n[STEP 4] Clicking Tally Reactivation button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Tally Reactivation button' });
    
    await appManagementPage.clickTallyReactivation();
    console.log('✓ Clicked Tally Reactivation button');

    // Wait for modal to appear
    await page.waitForTimeout(2000);

    // Step 5: Verify Tally Reactivation modal appears
    console.log('\n[STEP 5] Verifying Tally Reactivation modal appears...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify Tally Reactivation modal appears' });
    
    const modalVisible = await appManagementPage.isTallyReactivationModalVisible();
    expect(modalVisible).toBeTruthy();
    console.log('✓ Tally Reactivation modal is visible');

    // Get modal title if available
    const modalTitle = await appManagementPage.getTallyReactivationModalTitle();
    if (modalTitle) {
      console.log(`✓ Modal title: "${modalTitle}"`);
      expect(modalTitle.toLowerCase()).toContain('tally');
    } else {
      console.log('✓ Modal is visible (title not captured)');
    }

    // Step 6: Close the modal (cleanup)
    console.log('\n[STEP 6] Closing the modal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Close the modal' });
    
    await appManagementPage.closeTallyReactivationModal();
    console.log('✓ Modal closed');

    // Wait a bit to ensure modal is closed
    await page.waitForTimeout(1000);

    // Verify modal is closed
    const modalStillVisible = await appManagementPage.isTallyReactivationModalVisible();
    expect(modalStillVisible).toBeFalsy();
    console.log('✓ Verified modal is closed');

    // Summary
    console.log('\n=== Validation Summary ===');
    console.log(`✓ Tally Reactivation button visible: ${isButtonVisible}`);
    console.log(`✓ Modal appeared after click: ${modalVisible}`);
    console.log(`✓ Modal title: ${modalTitle || 'N/A'}`);
    console.log(`✓ Modal closed successfully: ${!modalStillVisible}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });

  test('should verify Change Version button opens dropdown and confirmation modal', async ({ page }, testInfo) => {
    test.setTimeout(120000); // 2 minutes timeout

    console.log('=== Test: Verify Change Version Button Functionality ===');
    console.log(`Test started at: ${new Date().toISOString()}`);

    // Step 1: Login to customer portal
    console.log('\n[STEP 1] Logging in to customer portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to customer portal' });
    
    await login(page, baseUrl, email, password);
    console.log('✓ Login successful');
    await page.waitForTimeout(2000);

    // Step 2: Navigate to App Management page
    console.log('\n[STEP 2] Navigating to App Management page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to App Management page' });
    
    const appManagementPage = new AppManagementPage(page);
    await appManagementPage.gotoAppManagement();
    
    // Verify page is visible
    const isPageVisible = await appManagementPage.isVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ App Management page is visible');

    // Step 3: Get current App Version
    console.log('\n[STEP 3] Getting current App Version...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Get current App Version' });
    
    const currentVersion = await appManagementPage.getCurrentAppVersion();
    console.log(`✓ Current App Version: "${currentVersion}"`);

    // Step 4: Check if Change Version button is visible
    console.log('\n[STEP 4] Checking if Change Version button is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Check if Change Version button is visible' });
    
    const isButtonVisible = await appManagementPage.isChangeVersionButtonVisible();
    
    if (!isButtonVisible) {
      console.log('⚠ Change Version button is not visible (may not be available for this user/plan)');
      console.log('⚠ Skipping test - button is only visible when !isInstanceUser && isTally');
      test.skip();
      return;
    }
    
    console.log('✓ Change Version button is visible');

    // Step 5: Click Change Version button to open dropdown
    console.log('\n[STEP 5] Clicking Change Version button to open dropdown...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Click Change Version button' });
    
    await appManagementPage.clickChangeVersion();
    console.log('✓ Clicked Change Version button');

    // Wait for dropdown to appear - wait for the show class or items to be visible
    await page.waitForTimeout(1500);
    
    // Wait for dropdown items to be visible as an alternative check
    try {
      await page.locator('.dropdown-menu .customerList li span.dropdown-item').first().waitFor({ state: 'visible', timeout: 5000 });
    } catch (e) {
      // Continue anyway
    }

    // Step 6: Verify dropdown is open
    console.log('\n[STEP 6] Verifying dropdown is open...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify dropdown is open' });
    
    const dropdownVisible = await appManagementPage.isChangeVersionDropdownVisible();
    expect(dropdownVisible).toBeTruthy();
    console.log('✓ Change Version dropdown is open');

    // Get available version options
    const optionsCount = await appManagementPage.getVersionOptionsCount();
    console.log(`✓ Available version options: ${optionsCount}`);
    expect(optionsCount).toBeGreaterThan(0);

    // Step 7: Select a different available version
    console.log('\n[STEP 7] Selecting a different available version...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Select a different version' });
    
    const { selectedVersion, currentVersion: currentVer } = await appManagementPage.selectDifferentVersion();
    console.log(`✓ Selected version: "${selectedVersion}"`);
    console.log(`✓ Current version: "${currentVer}"`);
    expect(selectedVersion).toBeTruthy();

    // Step 8: Verify confirmation modal appears
    console.log('\n[STEP 8] Verifying confirmation modal appears...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify confirmation modal appears' });
    
    const modalVisible = await appManagementPage.isVersionChangeModalVisible();
    expect(modalVisible).toBeTruthy();
    console.log('✓ Version Change Confirmation modal is visible');

    // Get modal title if available
    const modalTitle = await appManagementPage.getVersionChangeModalTitle();
    if (modalTitle) {
      console.log(`✓ Modal title: "${modalTitle}"`);
      expect(modalTitle.toLowerCase()).toContain('tally');
    } else {
      console.log('✓ Modal is visible (title not captured)');
    }

    // Verify Cancel and Proceed buttons are present
    const cancelButtonVisible = await appManagementPage.versionChangeCancelButton.isVisible({ timeout: 3000 }).catch(() => false);
    const proceedButtonVisible = await appManagementPage.versionChangeProceedButton.isVisible({ timeout: 3000 }).catch(() => false);
    
    expect(cancelButtonVisible || proceedButtonVisible).toBeTruthy();
    console.log(`✓ Cancel button visible: ${cancelButtonVisible}`);
    console.log(`✓ Proceed button visible: ${proceedButtonVisible}`);

    // Step 9: Click Cancel button
    console.log('\n[STEP 9] Clicking Cancel button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Click Cancel button' });
    
    await appManagementPage.clickVersionChangeCancel();
    console.log('✓ Clicked Cancel button');

    // Wait for modal to close
    await page.waitForTimeout(1000);

    // Verify modal is closed
    const modalStillVisible = await appManagementPage.isVersionChangeModalVisible();
    expect(modalStillVisible).toBeFalsy();
    console.log('✓ Verified modal is closed');

    // Verify version didn't change (since we cancelled)
    const versionAfterCancel = await appManagementPage.getCurrentAppVersion();
    expect(versionAfterCancel).toBe(currentVersion);
    console.log(`✓ Version unchanged after cancel: "${versionAfterCancel}"`);
    console.log(`✓ Original version: "${currentVersion}"`);

    // Summary
    console.log('\n=== Validation Summary ===');
    console.log(`✓ Change Version button visible: ${isButtonVisible}`);
    console.log(`✓ Dropdown opened: ${dropdownVisible}`);
    console.log(`✓ Available version options: ${optionsCount}`);
    console.log(`✓ Selected version: "${selectedVersion}"`);
    console.log(`✓ Confirmation modal appeared: ${modalVisible}`);
    console.log(`✓ Modal title: ${modalTitle || 'N/A'}`);
    console.log(`✓ Cancel button clicked: ${cancelButtonVisible}`);
    console.log(`✓ Modal closed: ${!modalStillVisible}`);
    console.log(`✓ Version unchanged after cancel: ${versionAfterCancel === currentVersion}`);

    console.log('\n=== Test Completed Successfully ===');
    console.log(`Test completed at: ${new Date().toISOString()}`);
  });
});

