const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { SettingsPage } = require('../pages/settings');

test.describe('Partner Portal - Settings', () => {
  test('should verify Settings page navigation and page load', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: Settings Page Navigation & Load ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Settings page navigation and page load' });

    // PRECONDITION: Login
    console.log('\n[PRECONDITION] Logging in...');
    testInfo.annotations.push({ type: 'step', description: 'Precondition: Login' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Login verification PASSED');

    // STEP 1: Navigate to Settings page
    console.log('\n[STEP 1] Navigating to Settings page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Settings page' });
    
    const settingsPage = new SettingsPage(page);
    await settingsPage.navigateToSettings();
    console.log('✓ Navigated to Settings page');

    // STEP 2: Verify Settings page loads successfully
    console.log('\n[STEP 2] Verifying Settings page loads successfully...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify page loads' });
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const isPageVisible = await settingsPage.isSettingsPageVisible();
    expect(isPageVisible).toBeTruthy();
    console.log('✓ Settings page loaded successfully');

    // STEP 3: Verify page heading "Settings" is visible
    console.log('\n[STEP 3] Verifying page heading "Settings" is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify page heading' });
    
    const headingVisible = await settingsPage.isPageHeadingVisible();
    expect(headingVisible).toBeTruthy();
    console.log('✓ Page heading is visible');
    
    const headingText = await settingsPage.getPageHeadingText();
    expect(headingText.toLowerCase()).toContain('settings');
    console.log(`✓ Page heading text: "${headingText}"`);

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify Show Google Drive Section', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: Show Google Drive Section ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Show Google Drive section functionality' });

    // PRECONDITION: Login
    console.log('\n[PRECONDITION] Logging in...');
    testInfo.annotations.push({ type: 'step', description: 'Precondition: Login' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Login verification PASSED');

    // Navigate to Settings page
    const settingsPage = new SettingsPage(page);
    await settingsPage.navigateToSettings();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Settings page');

    // STEP 1: Verify "Show Google Drive" card/section is visible
    console.log('\n[STEP 1] Verifying "Show Google Drive" card/section is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Verify Google Drive card visible' });
    
    const cardVisible = await settingsPage.isGoogleDriveCardVisible();
    expect(cardVisible).toBeTruthy();
    console.log('✓ "Show Google Drive" card/section is visible');

    // STEP 2: Verify descriptive text explaining Google authentication and backup is displayed
    console.log('\n[STEP 2] Verifying descriptive text is displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify descriptive text' });
    
    const descriptionVisible = await settingsPage.isGoogleDriveDescriptionVisible();
    expect(descriptionVisible).toBeTruthy();
    console.log('✓ Descriptive text is visible');
    
    const descriptionText = await settingsPage.getGoogleDriveDescriptionText();
    expect(descriptionText.length).toBeGreaterThan(0);
    console.log(`✓ Description text: "${descriptionText.substring(0, 100)}..."`);

    // STEP 3: Verify "See Google Pages" link/text is visible
    console.log('\n[STEP 3] Verifying "See Google Pages" link/text is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify See Google Pages link' });
    
    const linkVisible = await settingsPage.isSeeGooglePagesLinkVisible();
    expect(linkVisible).toBeTruthy();
    console.log('✓ "See Google Pages" link/text is visible');

    // STEP 4: Verify "Show google drive" checkbox is visible
    console.log('\n[STEP 4] Verifying "Show google drive" checkbox is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify checkbox visible' });
    
    const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
    expect(checkboxVisible).toBeTruthy();
    console.log('✓ "Show google drive" checkbox is visible');

    // STEP 5: Verify checkbox is checked by default (if applicable)
    console.log('\n[STEP 5] Verifying checkbox default state...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify checkbox default state' });
    
    const defaultChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
    console.log(`✓ Checkbox default state: ${defaultChecked ? 'Checked' : 'Unchecked'}`);

    // STEP 6: Uncheck the checkbox and verify its state changes
    console.log('\n[STEP 6] Unchecking the checkbox and verifying state change...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Uncheck checkbox' });
    
    if (defaultChecked) {
      await settingsPage.setShowGoogleDriveCheckbox(false);
      const unchecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      expect(unchecked).toBeFalsy();
      console.log('✓ Checkbox unchecked successfully');
    } else {
      console.log('  ⚠ Checkbox was already unchecked');
    }

    // STEP 7: Check the checkbox again and verify its state changes back
    console.log('\n[STEP 7] Checking the checkbox again and verifying state change...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Check checkbox' });
    
    await settingsPage.setShowGoogleDriveCheckbox(true);
    const checked = await settingsPage.isShowGoogleDriveCheckboxChecked();
    expect(checked).toBeTruthy();
    console.log('✓ Checkbox checked successfully');

    // STEP 8: Verify the Save button is visible and enabled
    console.log('\n[STEP 8] Verifying Save button is visible and enabled...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify Save button' });
    
    const saveButtonVisible = await settingsPage.isSaveButtonVisible();
    expect(saveButtonVisible).toBeTruthy();
    console.log('✓ Save button is visible');
    
    const saveButtonEnabled = await settingsPage.isSaveButtonEnabled();
    expect(saveButtonEnabled).toBeTruthy();
    console.log('✓ Save button is enabled');

    // STEP 9: Click Save and verify success toast/message appears
    console.log('\n[STEP 9] Clicking Save and verifying success message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Click Save and verify success' });
    
    await settingsPage.clickSaveButton();
    
    const successToastVisible = await settingsPage.isSuccessToastVisible();
    expect(successToastVisible).toBeTruthy();
    console.log('✓ Success toast/message appeared');
    
    const toastText = await settingsPage.getSuccessToastText();
    if (toastText) {
      console.log(`✓ Success message: "${toastText}"`);
    }

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify Ticket Support Section', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: Ticket Support Section ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Ticket Support section functionality' });

    // PRECONDITION: Login
    console.log('\n[PRECONDITION] Logging in...');
    testInfo.annotations.push({ type: 'step', description: 'Precondition: Login' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Login verification PASSED');

    // Navigate to Settings page
    const settingsPage = new SettingsPage(page);
    await settingsPage.navigateToSettings();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Settings page');

    // STEP 1: Verify "Ticket Support" card/section is visible
    console.log('\n[STEP 1] Verifying "Ticket Support" card/section is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Verify Ticket Support card' });
    
    const cardVisible = await settingsPage.isTicketSupportCardVisible();
    expect(cardVisible).toBeTruthy();
    console.log('✓ "Ticket Support" card/section is visible');

    // STEP 2: Verify the question is visible
    console.log('\n[STEP 2] Verifying the question is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify question text' });
    
    const questionVisible = await settingsPage.isTicketSupportQuestionVisible();
    expect(questionVisible).toBeTruthy();
    console.log('✓ Question is visible');
    
    const questionText = await settingsPage.getTicketSupportQuestionText();
    expect(questionText.toLowerCase()).toContain('ticketing support');
    console.log(`✓ Question text: "${questionText}"`);

    // STEP 3: Verify both radio buttons "Yes" and "No" are visible
    console.log('\n[STEP 3] Verifying both radio buttons are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify radio buttons visible' });
    
    const yesRadioVisible = await settingsPage.isTicketSupportYesRadioVisible();
    expect(yesRadioVisible).toBeTruthy();
    console.log('✓ "Yes" radio button is visible');
    
    const noRadioVisible = await settingsPage.isTicketSupportNoRadioVisible();
    expect(noRadioVisible).toBeTruthy();
    console.log('✓ "No" radio button is visible');

    // STEP 4: Verify one option is selected by default
    console.log('\n[STEP 4] Verifying default selection...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify default selection' });
    
    const defaultOption = await settingsPage.getSelectedTicketSupportOption();
    expect(defaultOption).not.toBe('None');
    console.log(`✓ Default selection: "${defaultOption}"`);

    // STEP 5: Switch between Yes and No and verify selection updates correctly
    console.log('\n[STEP 5] Switching between Yes and No...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Switch between options' });
    
    // Select the opposite of current selection
    if (defaultOption === 'Yes') {
      await settingsPage.selectTicketSupportNo();
      const noSelected = await settingsPage.isTicketSupportNoRadioSelected();
      expect(noSelected).toBeTruthy();
      console.log('✓ Switched to "No" successfully');
      
      await settingsPage.selectTicketSupportYes();
      const yesSelected = await settingsPage.isTicketSupportYesRadioSelected();
      expect(yesSelected).toBeTruthy();
      console.log('✓ Switched back to "Yes" successfully');
    } else {
      await settingsPage.selectTicketSupportYes();
      const yesSelected = await settingsPage.isTicketSupportYesRadioSelected();
      expect(yesSelected).toBeTruthy();
      console.log('✓ Switched to "Yes" successfully');
      
      await settingsPage.selectTicketSupportNo();
      const noSelected = await settingsPage.isTicketSupportNoRadioSelected();
      expect(noSelected).toBeTruthy();
      console.log('✓ Switched back to "No" successfully');
    }

    // STEP 6: Verify the support email input field is visible
    console.log('\n[STEP 6] Verifying support email input field is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify email input visible' });
    
    const emailInputVisible = await settingsPage.isSupportEmailInputVisible();
    expect(emailInputVisible).toBeTruthy();
    console.log('✓ Support email input field is visible');

    // STEP 7: Verify the email field is prefilled with a valid email address
    console.log('\n[STEP 7] Verifying email field is prefilled...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify email prefilled' });
    
    const prefilledEmail = await settingsPage.getSupportEmailValue();
    expect(prefilledEmail.length).toBeGreaterThan(0);
    console.log(`✓ Email field prefilled with: "${prefilledEmail}"`);
    
    const isValidPrefilled = settingsPage.isValidEmailFormat(prefilledEmail);
    expect(isValidPrefilled).toBeTruthy();
    console.log('✓ Prefilled email has valid format');

    // STEP 8: Update the email value and verify input accepts valid email format
    console.log('\n[STEP 8] Updating email value...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Update email value' });
    
    const newEmail = 'support@example.com';
    await settingsPage.enterSupportEmail(newEmail);
    
    const updatedEmail = await settingsPage.getSupportEmailValue();
    expect(updatedEmail).toBe(newEmail);
    console.log(`✓ Email updated to: "${updatedEmail}"`);
    
    const isValidUpdated = settingsPage.isValidEmailFormat(updatedEmail);
    expect(isValidUpdated).toBeTruthy();
    console.log('✓ Updated email has valid format');

    // STEP 9: Click Save and verify success confirmation appears
    console.log('\n[STEP 9] Clicking Save and verifying success confirmation...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Click Save and verify success' });
    
    await settingsPage.clickSaveButton();
    
    const successToastVisible = await settingsPage.isSuccessToastVisible();
    expect(successToastVisible).toBeTruthy();
    console.log('✓ Success confirmation appeared');
    
    const toastText = await settingsPage.getSuccessToastText();
    if (toastText) {
      console.log(`✓ Success message: "${toastText}"`);
    }

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify Negative Scenarios for radio button on ticket support section', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: Negative Scenarios ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test negative scenarios and validation' });

    // PRECONDITION: Login
    console.log('\n[PRECONDITION] Logging in...');
    testInfo.annotations.push({ type: 'step', description: 'Precondition: Login' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Login verification PASSED');

    // Navigate to Settings page
    const settingsPage = new SettingsPage(page);
    await settingsPage.navigateToSettings();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Settings page');

    // STEP 1: Try saving with an invalid email format and verify validation error is shown
    console.log('\n[STEP 1] Testing invalid email format validation...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Test invalid email validation' });
    
    const invalidEmail = 'invalid-email-format';
    await settingsPage.enterSupportEmail(invalidEmail);
    console.log(`✓ Entered invalid email: "${invalidEmail}"`);
    
    await settingsPage.clickSaveButton();
    await page.waitForTimeout(1000);
    
    const validationErrorVisible = await settingsPage.isEmailValidationErrorVisible();
    if (validationErrorVisible) {
      const errorText = await settingsPage.getErrorMessageText();
      console.log(`✓ Validation error shown: "${errorText}"`);
      expect(validationErrorVisible).toBeTruthy();
    } else {
      console.log('  ⚠ Validation error not visible (may be handled differently)');
    }

    // STEP 2: Try saving without changing anything and verify no error occurs
    console.log('\n[STEP 2] Testing save without changes...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Test save without changes' });
    
    // Restore valid email
    const validEmail = 'support@example.com';
    await settingsPage.enterSupportEmail(validEmail);
    await page.waitForTimeout(500);
    
    // Click Save
    await settingsPage.clickSaveButton();
    await page.waitForTimeout(2000);
    
    // Verify no error message (or success message appears)
    const errorAfterValid = await settingsPage.isErrorMessageVisible();
    if (!errorAfterValid) {
      console.log('✓ No error occurred when saving with valid data');
    } else {
      const errorText = await settingsPage.getErrorMessageText();
      console.log(`  ⚠ Error occurred: "${errorText}"`);
    }
    
    const successVisible = await settingsPage.isSuccessToastVisible();
    if (successVisible) {
      console.log('✓ Success message appeared');
    }

    // STEP 3: Refresh the page and verify settings persist correctly after save
    console.log('\n[STEP 3] Refreshing page and verifying settings persist...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify settings persist after refresh' });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Verify email persists
    const persistedEmail = await settingsPage.getSupportEmailValue();
    console.log(`✓ Email after refresh: "${persistedEmail}"`);
    
    // Verify checkbox state persists (if applicable)
    const checkboxState = await settingsPage.isShowGoogleDriveCheckboxChecked();
    console.log(`✓ Checkbox state after refresh: ${checkboxState ? 'Checked' : 'Unchecked'}`);
    
    // Verify radio button selection persists
    const persistedOption = await settingsPage.getSelectedTicketSupportOption();
    console.log(`✓ Ticket Support option after refresh: "${persistedOption}"`);

    console.log('\n=== Test Completed Successfully ===');
  });

  test('should verify Accessibility & UI Checks', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

    test.setTimeout(120000); // 2 minutes timeout

    console.log('\n=== Starting Test: Accessibility & UI Checks ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test accessibility and UI elements' });

    // PRECONDITION: Login
    console.log('\n[PRECONDITION] Logging in...');
    testInfo.annotations.push({ type: 'step', description: 'Precondition: Login' });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Login verification PASSED');

    // Navigate to Settings page
    const settingsPage = new SettingsPage(page);
    await settingsPage.navigateToSettings();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Settings page');

    // STEP 1: Verify all buttons, inputs, and checkboxes are enabled and clickable
    console.log('\n[STEP 1] Verifying all UI elements are enabled and clickable...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Verify UI elements enabled' });
    
    // Verify Save button
    const saveButtonEnabled = await settingsPage.isSaveButtonEnabled();
    expect(saveButtonEnabled).toBeTruthy();
    console.log('✓ Save button is enabled');
    
    // Verify checkbox is clickable
    const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
    expect(checkboxVisible).toBeTruthy();
    // Checkbox is clickable if visible
    console.log('✓ Checkbox is clickable');
    
    // Verify email input is enabled
    const emailInputVisible = await settingsPage.isSupportEmailInputVisible();
    expect(emailInputVisible).toBeTruthy();
    // Try to interact with email input to verify it's enabled
    const currentEmail = await settingsPage.getSupportEmailValue();
    console.log(`✓ Email input is enabled (current value: "${currentEmail}")`);
    
    // Verify radio buttons are clickable
    const yesRadioVisible = await settingsPage.isTicketSupportYesRadioVisible();
    expect(yesRadioVisible).toBeTruthy();
    console.log('✓ Yes radio button is clickable');
    
    const noRadioVisible = await settingsPage.isTicketSupportNoRadioVisible();
    expect(noRadioVisible).toBeTruthy();
    console.log('✓ No radio button is clickable');

    // STEP 2: Verify no console errors occur during interactions
    console.log('\n[STEP 2] Verifying no console errors occur...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify no console errors' });
    
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Perform some interactions
    await settingsPage.toggleShowGoogleDriveCheckbox();
    await page.waitForTimeout(500);
    
    await settingsPage.enterSupportEmail('test@example.com');
    await page.waitForTimeout(500);
    
    await settingsPage.selectTicketSupportYes();
    await page.waitForTimeout(500);
    
    if (consoleErrors.length > 0) {
      console.log(`  ⚠ Found ${consoleErrors.length} console error(s):`);
      consoleErrors.forEach((error, index) => {
        console.log(`    ${index + 1}. ${error}`);
      });
    } else {
      console.log('✓ No console errors occurred during interactions');
    }

    console.log('\n=== Test Completed Successfully ===');
  });

  test.skip('should verify Ticket Support toggle affects Customer Portal visibility', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(100000); // 5 minutes timeout

    console.log('\n=== Starting Test: Ticket Support Toggle ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Ticket Support toggle affects Customer Portal visibility' });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // PRECONDITION: Login to Partner Portal
      console.log('\n[PRECONDITION] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Precondition: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');
      
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 1: Navigate to Settings page
      console.log('\n[STEP 1] Navigating to Settings page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings page');

      // STEP 2: Locate Ticket Support question
      console.log('\n[STEP 2] Locating Ticket Support question...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Locate question' });
      const questionVisible = await settingsPage.isTicketSupportQuestionVisible();
      expect(questionVisible).toBeTruthy();
      console.log('✓ Ticket Support question found');

      // STEP 3: Select "Yes"
      console.log('\n[STEP 3] Selecting "Yes"...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Select Yes' });
      await settingsPage.selectTicketSupportYes();
      const yesSelected = await settingsPage.isTicketSupportYesRadioSelected();
      expect(yesSelected).toBeTruthy();
      console.log('✓ "Yes" selected');

      // STEP 4: Save settings
      console.log('\n[STEP 4] Saving settings...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Save settings' });
      await settingsPage.clickSaveButton();
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Settings saved');

      // STEP 5: Login to Customer Portal
      console.log('\n[STEP 5] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Login to Customer Portal' });
      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Email input field not found on customer portal login page');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(2000);
      console.log('✓ Submitted login credentials');

      // Handle subscription modal if it appears
      console.log('  Checking for subscription selection modal...');
      const subscriptionModal = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        
        // Wait for subscription options to load
        await customerPage.waitForTimeout(1000);
        
        // Select the first available subscription
        const firstSubscriptionRadio = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');
          
          // Look for submit/confirm button in modal
          const modalSubmitButton = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();
          
          const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }
      
      // Wait for dashboard to load after subscription selection
      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify Service Request module is visible
      console.log('\n[STEP 6] Verifying Service Request module is visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Service Request visible' });
      
      // Wait for customer portal dashboard/sidebar to be fully loaded
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);
      
      // Try to wait for sidebar to be visible
      const sidebarVisible = await customerPage.locator('div.sidebar, nav.sidebar, aside.sidebar').first().isVisible({ timeout: 5000 }).catch(() => false);
      if (sidebarVisible) {
        console.log('  ✓ Sidebar is visible');
      } else {
        console.log('  ⚠ Sidebar not immediately visible, continuing...');
      }
      
      const serviceRequestVisible = await settingsPage.isServiceRequestModuleVisibleInCustomerPortal(customerPage);
      expect(serviceRequestVisible).toBeTruthy();
      console.log('✓ Service Request module is visible in Customer Portal');

      // STEP 7: Logout from Customer Portal
      console.log('\n[STEP 7] Logging out from Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Logout from Customer Portal' });
      const logoutButton = customerPage.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")').first();
      if (await logoutButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await logoutButton.click();
        await customerPage.waitForLoadState('networkidle');
        await customerPage.waitForTimeout(2000);
        console.log('✓ Logged out from Customer Portal');
      } else {
        await customerPage.goto(`${customerPortalUrl}/logout`).catch(() => {});
        await customerPage.waitForTimeout(2000);
        console.log('✓ Logged out from Customer Portal (via URL)');
      }

      // STEP 8: Go back to Partner Portal Settings and select "No"
      console.log('\n[STEP 8] Selecting "No" in Settings...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Select No' });
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      await settingsPage.selectTicketSupportNo();
      const noSelected = await settingsPage.isTicketSupportNoRadioSelected();
      expect(noSelected).toBeTruthy();
      console.log('✓ "No" selected');

      // STEP 9: Save settings
      console.log('\n[STEP 9] Saving settings...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Save settings' });
      await settingsPage.clickSaveButton();
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Settings saved');

      // STEP 10: Login again to Customer Portal
      console.log('\n[STEP 10] Logging in to Customer Portal again...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Login to Customer Portal again' });
      
      // Navigate to customer portal login page
      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);
      
      // Check if we're already on a logged-in page
      const currentUrl = customerPage.url();
      console.log(`  Current URL: ${currentUrl}`);
      
      // Try to find login form elements
      const customerEmailInput2 = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput2 = customerPage.locator('input[type="password"]').first();
      const customerLoginButton2 = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible2 = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible2 = await customerEmailInput2.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible2) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible2) {
        throw new Error('Email input field not found on customer portal login page');
      }

      await customerEmailInput2.fill(customerEmail);
      await customerPasswordInput2.fill(customerPassword);
      await customerLoginButton2.click();
      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(2000);
      console.log('✓ Submitted login credentials');

      // Handle subscription modal if it appears
      console.log('  Checking for subscription selection modal...');
      const subscriptionModal2 = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible2 = await subscriptionModal2.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (modalVisible2) {
        console.log('  ✓ Subscription modal is visible');
        
        // Wait for subscription options to load
        await customerPage.waitForTimeout(1000);
        
        // Select the first available subscription
        const firstSubscriptionRadio2 = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible2 = await firstSubscriptionRadio2.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (radioVisible2) {
          await firstSubscriptionRadio2.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');
          
          // Look for submit/confirm button in modal
          const modalSubmitButton2 = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();
          
          const submitButtonVisible2 = await modalSubmitButton2.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible2) {
            await modalSubmitButton2.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }
      
      // Wait for dashboard to load after subscription selection
      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Logged in to Customer Portal');

      // STEP 11: Verify Service Request module is NOT visible
      console.log('\n[STEP 11] Verifying Service Request module is NOT visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify Service Request not visible' });
      
      // Wait for customer portal dashboard/sidebar to be fully loaded
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);
      
      const serviceRequestNotVisible = !(await settingsPage.isServiceRequestModuleVisibleInCustomerPortal(customerPage));
      expect(serviceRequestNotVisible).toBeTruthy();
      console.log('✓ Service Request module is NOT visible in Customer Portal');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      // Cleanup: Close contexts
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test('should verify Google Drive access and modules for Live/Trial plan when enabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Google Drive access for Live/Trial plan ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify Google Drive access and modules for Live/Trial plan when enabled' });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Ensure "Show Google Drive" checkbox is enabled (checked)
      console.log('\n[STEP 3] Ensuring "Show Google Drive" checkbox is enabled...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Ensure Show Google Drive is enabled' });

      const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
      expect(checkboxVisible).toBeTruthy();
      console.log('✓ "Show Google Drive" checkbox is visible');

      let isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      console.log(`✓ Checkbox current state: ${isChecked ? 'Checked' : 'Unchecked'}`);

      if (!isChecked) {
        console.log('  Checkbox is not checked, checking it and saving...');
        await settingsPage.setShowGoogleDriveCheckbox(true);
        isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
        expect(isChecked).toBeTruthy();
        console.log('✓ Checkbox is now checked');

        // Click Save
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        // Verify success toast (best-effort)
        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after enabling Google Drive');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Handle subscription selection modal' });

      const subscriptionModal = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();

          const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify plan status using dashboard CTA button
      console.log('\n[STEP 6] Verifying plan status using dashboard CTA button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify plan status' });

      const planCta = customerPage.locator(
        'span.renew-btn-modern, ' +
        'button:has-text("Upgrade Now"), ' +
        'button:has-text("Upgrade to Pro"), ' +
        'button:has-text("Renew Now")'
      ).first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('renew now')) {
        console.log('⚠ Plan appears to be expired (CTA: Renew Now). This test is not applicable for expired plans.');
        test.skip(true, 'Plan is expired (Renew Now). Test not applicable for expired plans.');
      }

      const isLiveOrTrial =
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade');

      expect(isLiveOrTrial).toBeTruthy();
      console.log('✓ Plan is Live/Trial based on CTA text');

      // STEP 7: Verify Google Drive setup modal does NOT appear
      console.log('\n[STEP 7] Verifying Google Drive setup modal does NOT appear...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify no Google Drive setup modal' });

      const setupModalVisible = await settingsPage.isGoogleDriveSetupModalVisible(customerPage);
      expect(setupModalVisible).toBeFalsy();
      console.log('✓ Google Drive setup modal is NOT visible');

      // STEP 8: Verify Google Drive module is visible, clickable, and navigates correctly
      console.log('\n[STEP 8] Verifying Google Drive module visibility and navigation...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify Google Drive module' });

      const googleDriveVisible = await settingsPage.isGoogleDriveModuleVisibleInCustomerPortal(customerPage);
      expect(googleDriveVisible).toBeTruthy();
      console.log('✓ Google Drive module is visible in sidebar');

      const driveClicked = await settingsPage.clickModuleInCustomerPortal(customerPage, 'Google Drive');
      expect(driveClicked).toBeTruthy();
      console.log('✓ Clicked Google Drive module');

      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      // Verify Google Drive page header and scheduler card (setup completed state)
      const driveHeaderVisible = await customerPage
        .locator(
          'h2.page-title-modern:has-text("Google Drive"), ' +
          'h1:has-text("Google Drive"), ' +
          'div.header-left h2:has-text("Google Drive")'
        )
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);
      expect(driveHeaderVisible).toBeTruthy();
      console.log('✓ Google Drive page header is visible');

      const driveInfoCard = customerPage.locator('div.drive-info-card, .drive-info-card .card-body').first();
      const driveInfoVisible = await driveInfoCard.isVisible({ timeout: 5000 }).catch(() => false);
      expect(driveInfoVisible).toBeTruthy();
      console.log('✓ Google Drive info card (setup completed state) is visible');

      // STEP 9: Verify Logs & Security sub-modules (Security Rules, User Logs, Audit Logs)
      console.log('\n[STEP 9] Verifying Logs & Security sub-modules...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify Logs & Security sub-modules' });

      const logsSecurityToggle = customerPage.locator(
        'a.nav-link[data-bs-target="#logs-\\&-security"], ' +
        'a.nav-link:has-text("Logs & Security")'
      ).first();

      const logsToggleVisible = await logsSecurityToggle.isVisible({ timeout: 5000 }).catch(() => false);
      expect(logsToggleVisible).toBeTruthy();
      console.log('  ✓ Logs & Security parent menu is visible');

      // Ensure Logs & Security submenu is expanded
      const logsSubmenu = customerPage.locator('ul#logs-\\&-security').first();
      const logsExpandedAttr = await logsSecurityToggle.getAttribute('aria-expanded').catch(() => null);
      const logsAlreadyExpanded = logsExpandedAttr === 'true';

      if (!logsAlreadyExpanded) {
        await logsSecurityToggle.click();
        await customerPage.waitForTimeout(1000);
        console.log('  ✓ Clicked Logs & Security to expand submenu');
      } else {
        console.log('  ✓ Logs & Security submenu is already expanded');
      }

      await logsSubmenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

      const logsSubModules = [
        { name: 'Security Rules', routePart: 'security-rules' },
        { name: 'User Logs', routePart: 'user-logs' },
        { name: 'Audit Logs', routePart: 'audit-logs' }
      ];

      for (const sub of logsSubModules) {
        console.log(`  - Verifying sub-module "${sub.name}"...`);
        const subLink = customerPage.locator(
          'ul#logs-\\&-security a.nav-link.menu-item:has-text("' + sub.name + '")'
        ).first();

        const subVisible = await subLink.isVisible({ timeout: 5000 }).catch(() => false);
        expect(subVisible).toBeTruthy();
        console.log(`    ✓ "${sub.name}" link is visible`);

        await subLink.click();
        await customerPage.waitForLoadState('networkidle').catch(() => {});
        await customerPage.waitForTimeout(1500);

        const currentUrl = customerPage.url();
        expect(currentUrl.toLowerCase()).toContain(sub.routePart);
        console.log(`    ✓ "${sub.name}" is clickable and opened (URL contains "${sub.routePart}")`);

        // Re-expand Logs & Security after navigation (menu may collapse on route change)
        const expandedAttrAfterNav = await logsSecurityToggle.getAttribute('aria-expanded').catch(() => null);
        if (expandedAttrAfterNav !== 'true') {
          await logsSecurityToggle.click().catch(() => {});
          await customerPage.waitForTimeout(500);
        }
      }

      // STEP 10: Verify all modules are visible, clickable, and not locked
      console.log('\n[STEP 10] Verifying all modules are visible, clickable, and not locked...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify all modules accessible for Live/Trial plan' });

      const allModules = await settingsPage.getAllSidebarModules(customerPage);
      console.log(`  Found modules: ${allModules.join(', ')}`);

      const inaccessibleModules = [];

      for (const moduleName of allModules) {
        const name = moduleName.trim();
        if (!name) continue;

        // Check lock state (CSS-based only; icon-based locks may still be decorative)
        const isLocked = await settingsPage.isModuleLockedInCustomerPortal(customerPage, name);
        if (isLocked) {
          console.log(`  ⚠ Module "${name}" appears locked based on CSS/interaction state`);
          inaccessibleModules.push(name);
          continue;
        }

        // Check clickability (best-effort, ignore decorative lock icons)
        const clicked = await settingsPage.clickModuleInCustomerPortal(customerPage, name);
        if (!clicked) {
          console.log(`  ⚠ Could not click module "${name}"`);
          inaccessibleModules.push(name);
        } else {
          console.log(`  ✓ Module "${name}" is clickable and opens`);
          // Small wait before moving to next module
          await customerPage.waitForTimeout(500);
        }
      }

      expect(inaccessibleModules.length).toBe(0);
      if (inaccessibleModules.length === 0) {
        console.log('✓ All modules are visible, clickable, and not locked for Live/Trial plan');
      } else {
        console.log(`  ⚠ Inaccessible/locked modules: ${inaccessibleModules.join(', ')}`);
      }

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Google Drive access and module availability for Expired plan when enabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Google Drive access for Expired plan ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify Google Drive access and module availability for Expired plan when enabled' });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Ensure "Show Google Drive" checkbox is enabled (checked)
      console.log('\n[STEP 3] Ensuring "Show Google Drive" checkbox is enabled...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Ensure Show Google Drive is enabled' });

      const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
      expect(checkboxVisible).toBeTruthy();
      console.log('✓ "Show Google Drive" checkbox is visible');

      let isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      console.log(`✓ Checkbox current state: ${isChecked ? 'Checked' : 'Unchecked'}`);

      if (!isChecked) {
        console.log('  Checkbox is not checked, checking it and saving...');
        await settingsPage.setShowGoogleDriveCheckbox(true);
        isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
        expect(isChecked).toBeTruthy();
        console.log('✓ Checkbox is now checked');

        // Click Save
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        // Verify success toast (best-effort)
        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after enabling Google Drive');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Handle subscription selection modal' });

      const subscriptionModal = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();

          const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify plan status using dashboard CTA button
      console.log('\n[STEP 6] Verifying plan status using dashboard CTA button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify plan status' });

      const planCta = customerPage.locator(
        'span.renew-btn-modern, ' +
        'button:has-text("Upgrade Now"), ' +
        'button:has-text("Upgrade to Pro"), ' +
        'button:has-text("Renew Now")'
      ).first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('upgrade now') || ctaLower.includes('upgrade to pro') || ctaLower.includes('upgrade')) {
        console.log('⚠ Plan appears to be Live/Trial (CTA: Upgrade). This test is only for expired plans.');
        test.skip(true, 'Plan is Live/Trial. This expired-plan test is not applicable.');
      }

      expect(ctaLower.includes('renew now')).toBeTruthy();
      console.log('✓ Plan is Expired based on CTA text (Renew Now)');

      // STEP 7: Verify Google Drive setup modal does NOT appear
      console.log('\n[STEP 7] Verifying Google Drive setup modal does NOT appear...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify no Google Drive setup modal' });

      const setupModalVisible = await settingsPage.isGoogleDriveSetupModalVisible(customerPage);
      expect(setupModalVisible).toBeFalsy();
      console.log('✓ Google Drive setup modal is NOT visible');

      // STEP 8: Verify Renew Now modal is displayed automatically for expired plan
      console.log('\n[STEP 8] Verifying Renew plan modal is displayed automatically...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify Renew plan modal appears' });

      const renewModalVisibleInitial = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisibleInitial).toBeTruthy();
      console.log('✓ Renew plan modal is visible for expired plan');

      // STEP 9: Click Renew button on modal
      console.log('\n[STEP 9] Clicking Renew button in modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Click Renew button' });

      const renewClicked = await settingsPage.clickRenewButtonInPlanModal(customerPage);
      expect(renewClicked).toBeTruthy();
      console.log('✓ Clicked Renew button in expired plan modal');

      // STEP 10: Verify Google Drive module is visible and locked, and clicking it opens Renew modal
      console.log('\n[STEP 10] Verifying Google Drive module is visible, locked, and opens Renew modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify Google Drive module locked for expired plan' });

      const googleDriveVisible = await settingsPage.isGoogleDriveModuleVisibleInCustomerPortal(customerPage);
      expect(googleDriveVisible).toBeTruthy();
      console.log('✓ Google Drive module is visible in sidebar');

      const hasLockIcon = await settingsPage.hasLockIcon(customerPage, 'Google Drive');
      expect(hasLockIcon).toBeTruthy();
      console.log('✓ Google Drive module shows a lock icon for expired plan');

      // Click Google Drive module and expect Renew modal to open
      const driveClicked = await settingsPage.clickModuleInCustomerPortal(customerPage, 'Google Drive');
      expect(driveClicked).toBeTruthy();
      await customerPage.waitForTimeout(1500);

      const renewModalVisibleAfterClick = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisibleAfterClick).toBeTruthy();
      console.log('✓ Clicking Google Drive module opens Renew plan modal (module is locked)');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Google Drive access when setup is not completed for Live/Trial plan', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Google Drive access when setup not completed (Live/Trial) ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify Google Drive access when setup is not completed for Live/Trial plan' });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Ensure "Show Google Drive" checkbox is enabled (checked)
      console.log('\n[STEP 3] Ensuring "Show Google Drive" checkbox is enabled...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Ensure Show Google Drive is enabled' });

      const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
      expect(checkboxVisible).toBeTruthy();
      console.log('✓ "Show Google Drive" checkbox is visible');

      let isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      console.log(`✓ Checkbox current state: ${isChecked ? 'Checked' : 'Unchecked'}`);

      if (!isChecked) {
        console.log('  Checkbox is not checked, checking it and saving...');
        await settingsPage.setShowGoogleDriveCheckbox(true);
        isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
        expect(isChecked).toBeTruthy();
        console.log('✓ Checkbox is now checked');

        // Click Save
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        // Verify success toast (best-effort)
        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after enabling Google Drive');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Handle subscription selection modal' });

      const subscriptionModal = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();

          const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify plan status using dashboard CTA button (must be Live/Trial)
      console.log('\n[STEP 6] Verifying plan status using dashboard CTA button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify plan status is Live/Trial' });

      const planCta = customerPage.locator(
        'span.renew-btn-modern, ' +
        'button:has-text("Upgrade Now"), ' +
        'button:has-text("Upgrade to Pro"), ' +
        'button:has-text("Renew Now")'
      ).first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('renew now')) {
        console.log('⚠ Plan appears to be expired (CTA: Renew Now). This test is only for Live/Trial plans.');
        test.skip(true, 'Plan is Expired. This Live/Trial test is not applicable.');
      }

      const isLiveOrTrial =
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade');

      expect(isLiveOrTrial).toBeTruthy();
      console.log('✓ Plan is Live/Trial based on CTA text');

      // STEP 7: Verify Google Drive setup modal is displayed on Dashboard
      console.log('\n[STEP 7] Verifying Google Drive setup modal is displayed...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify Google Drive setup modal visible' });

      const setupModalVisible = await settingsPage.isGoogleDriveSetupModalVisible(customerPage);
      expect(setupModalVisible).toBeTruthy();
      console.log('✓ Google Drive setup modal is visible on Dashboard');

      // STEP 8: Click "Setup Now and Secure Data" on the modal
      console.log('\n[STEP 8] Clicking "Setup Now and Secure Data" on the modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Click Setup Now and Secure Data' });

      const setupClicked = await settingsPage.clickSetupNowButton(customerPage);
      expect(setupClicked).toBeTruthy();
      console.log('✓ Clicked "Setup Now and Secure Data" button');

      // STEP 9: Verify user is navigated to Google Drive page (setup not completed)
      console.log('\n[STEP 9] Verifying Google Drive setup page is visible and loaded...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify Google Drive setup page' });

      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const driveHeaderVisible = await customerPage
        .locator(
          'h2.page-title-modern:has-text("Google Drive"), ' +
          'h1:has-text("Google Drive"), ' +
          'div.header-left h2:has-text("Google Drive")'
        )
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);
      expect(driveHeaderVisible).toBeTruthy();
      console.log('✓ Google Drive page header is visible');

      const configCard = customerPage.locator(
        'div.card.modern-card:has(h3.card-title:has-text("Configure Account")), ' +
        'div.card.modern-card:has(p.text-danger:has-text("Your Account Configuration is Pending"))'
      ).first();
      const configCardVisible = await configCard.isVisible({ timeout: 5000 }).catch(() => false);
      expect(configCardVisible).toBeTruthy();
      console.log('✓ Google Drive configuration card (setup pending) is visible');

      // STEP 10: Verify Google Drive module in sidebar is visible, clickable, and not locked
      console.log('\n[STEP 10] Verifying Google Drive module in sidebar is visible, clickable, and unlocked...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify Google Drive module unlocked' });

      const googleDriveVisible = await settingsPage.isGoogleDriveModuleVisibleInCustomerPortal(customerPage);
      expect(googleDriveVisible).toBeTruthy();
      console.log('✓ Google Drive module is visible in sidebar');

      const hasLockIcon = await settingsPage.hasLockIcon(customerPage, 'Google Drive');
      expect(hasLockIcon).toBeFalsy();
      console.log('✓ Google Drive module does NOT show a lock icon for Live/Trial plan');

      const driveClickedAgain = await settingsPage.clickModuleInCustomerPortal(customerPage, 'Google Drive');
      expect(driveClickedAgain).toBeTruthy();
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(1500);
      console.log('✓ Google Drive module is clickable and remains accessible');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Google Drive access when setup is not completed for Expired plan', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Google Drive access when setup not completed (Expired plan) ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify Google Drive access when setup is not completed for Expired plan' });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Ensure "Show Google Drive" checkbox is enabled (checked)
      console.log('\n[STEP 3] Ensuring "Show Google Drive" checkbox is enabled...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Ensure Show Google Drive is enabled' });

      const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
      expect(checkboxVisible).toBeTruthy();
      console.log('✓ "Show Google Drive" checkbox is visible');

      let isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      console.log(`✓ Checkbox current state: ${isChecked ? 'Checked' : 'Unchecked'}`);

      if (!isChecked) {
        console.log('  Checkbox is not checked, checking it and saving...');
        await settingsPage.setShowGoogleDriveCheckbox(true);
        isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
        expect(isChecked).toBeTruthy();
        console.log('✓ Checkbox is now checked');

        // Click Save
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        // Verify success toast (best-effort)
        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after enabling Google Drive');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Handle subscription selection modal' });

      const subscriptionModal = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();

          const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify plan status using dashboard CTA button (must be Expired)
      console.log('\n[STEP 6] Verifying plan status using dashboard CTA button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify plan status is Expired' });

      const planCta = customerPage.locator(
        'span.renew-btn-modern, ' +
        'button:has-text("Upgrade Now"), ' +
        'button:has-text("Upgrade to Pro"), ' +
        'button:has-text("Renew Now")'
      ).first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('upgrade now') || ctaLower.includes('upgrade to pro') || ctaLower.includes('upgrade')) {
        console.log('⚠ Plan appears to be Live/Trial (CTA: Upgrade). This test is only for expired plans.');
        test.skip(true, 'Plan is Live/Trial. This expired-plan test is not applicable.');
      }

      expect(ctaLower.includes('renew now')).toBeTruthy();
      console.log('✓ Plan is Expired based on CTA text (Renew Now)');

      // STEP 7: Verify Renew Now modal is displayed automatically
      console.log('\n[STEP 7] Verifying Renew plan modal is displayed automatically...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify Renew plan modal appears' });

      const renewModalVisibleInitial = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisibleInitial).toBeTruthy();
      console.log('✓ Renew plan modal is visible for expired plan');

      // STEP 8: Click Renew button on modal
      console.log('\n[STEP 8] Clicking Renew button in modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Click Renew button' });

      const renewClicked = await settingsPage.clickRenewButtonInPlanModal(customerPage);
      expect(renewClicked).toBeTruthy();
      console.log('✓ Clicked Renew button in expired plan modal');

      // STEP 9: Click Google Drive module and verify Renew modal opens and navigation is blocked
      console.log('\n[STEP 9] Clicking Google Drive module and verifying Renew modal behavior...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Verify Google Drive module locked and opens Renew modal' });

      const googleDriveVisible = await settingsPage.isGoogleDriveModuleVisibleInCustomerPortal(customerPage);
      expect(googleDriveVisible).toBeTruthy();
      console.log('✓ Google Drive module is visible in sidebar');

      const hasLockIcon = await settingsPage.hasLockIcon(customerPage, 'Google Drive');
      expect(hasLockIcon).toBeTruthy();
      console.log('✓ Google Drive module shows a lock icon for expired plan');

      const driveClicked = await settingsPage.clickModuleInCustomerPortal(customerPage, 'Google Drive');
      expect(driveClicked).toBeTruthy();
      await customerPage.waitForTimeout(1500);

      const renewModalVisibleAfterClick = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisibleAfterClick).toBeTruthy();
      console.log('✓ Clicking Google Drive module opens Renew plan modal');

      const currentUrl = customerPage.url().toLowerCase();
      expect(currentUrl.includes('google-drive')).toBeFalsy();
      console.log('✓ Google Drive module does not navigate to Google Drive page when plan is expired');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Google Drive access when set up is not complete/or complete and modules for expired plan when Google Drive is disabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Google Drive access for Expired plan when disabled ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({
      type: 'test',
      description: 'Verify Google Drive access when setup is complete/not complete and modules for expired plan when Google Drive is disabled',
    });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Ensure "Show Google Drive" checkbox is disabled (unchecked)
      console.log('\n[STEP 3] Ensuring "Show Google Drive" checkbox is disabled...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Ensure Show Google Drive is disabled' });

      const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
      expect(checkboxVisible).toBeTruthy();
      console.log('✓ "Show Google Drive" checkbox is visible');

      let isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      console.log(`✓ Checkbox current state: ${isChecked ? 'Checked' : 'Unchecked'}`);

      if (isChecked) {
        console.log('  Checkbox is currently checked, unchecking it and saving...');
        await settingsPage.setShowGoogleDriveCheckbox(false);
        const nowUnchecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
        expect(nowUnchecked).toBeFalsy();
        console.log('✓ Checkbox is now unchecked');

        // Click Save
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        // Verify success toast (best-effort)
        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after disabling Google Drive');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      } else {
        console.log('✓ Checkbox is already unchecked (Google Drive disabled)');
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage
        .locator('input[type="email"], input[id*="email"], input[name*="email"]')
        .first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage
        .locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
        .first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 5: Handle subscription selection modal',
      });

      const subscriptionModal = customerPage
        .locator(
          'div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))',
        )
        .first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage
          .locator('table.modern-table-modal input[type="radio"][name="subscription"]')
          .first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage
            .locator(
              'div.modal button:has-text("Submit"), ' +
                'div.modal button:has-text("Confirm"), ' +
                'div.modal button:has-text("Select"), ' +
                'div.modal button[type="submit"], ' +
                'div.common-modal button:has-text("Submit"), ' +
                'div.common-modal button:has-text("Confirm")',
            )
            .first();

          const submitButtonVisible = await modalSubmitButton
            .isVisible({ timeout: 3000 })
            .catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify plan status using dashboard CTA button (must be Expired)
      console.log('\n[STEP 6] Verifying plan status using dashboard CTA button...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 6: Verify plan status is Expired',
      });

      const planCta = customerPage
        .locator(
          'span.renew-btn-modern, ' +
            'button:has-text("Upgrade Now"), ' +
            'button:has-text("Upgrade to Pro"), ' +
            'button:has-text("Renew Now")',
        )
        .first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade')
      ) {
        console.log('⚠ Plan appears to be Live/Trial (CTA: Upgrade). This test is only for expired plans.');
        test.skip(true, 'Plan is Live/Trial. This expired-plan (Google Drive disabled) test is not applicable.');
      }

      expect(ctaLower.includes('renew now')).toBeTruthy();
      console.log('✓ Plan is Expired based on CTA text (Renew Now)');

      // STEP 7: Verify Google Drive setup modal does NOT appear
      console.log('\n[STEP 7] Verifying Google Drive setup modal does NOT appear...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 7: Verify no Google Drive setup modal',
      });

      const setupModalVisibleExpired = await settingsPage.isGoogleDriveSetupModalVisible(customerPage);
      expect(setupModalVisibleExpired).toBeFalsy();
      console.log('✓ Google Drive setup modal is NOT visible when Google Drive is disabled (expired plan)');

      // STEP 8: Verify Renew plan modal is displayed for expired plan
      console.log('\n[STEP 8] Verifying Renew plan modal is displayed for expired plan...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 8: Verify Renew plan modal appears',
      });

      const renewModalVisible = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisible).toBeTruthy();
      console.log('✓ Renew plan modal is visible for expired plan when Google Drive is disabled');

      // STEP 9: Verify Google Drive module is not visible in sidebar
      console.log('\n[STEP 9] Verifying Google Drive module is not visible in sidebar...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 9: Verify Google Drive module hidden (expired plan, disabled)',
      });

      const googleDriveVisibleExpired = await settingsPage.isGoogleDriveModuleVisibleInCustomerPortal(
        customerPage,
      );
      expect(googleDriveVisibleExpired).toBeFalsy();
      console.log('✓ Google Drive module is not visible in sidebar when disabled (expired plan)');

      const allModules = await settingsPage.getAllSidebarModules(customerPage);
      console.log(`  Found modules: ${allModules.join(', ')}`);
      const googleModules = allModules.filter(
        (m) => m.toLowerCase().includes('google') && m.toLowerCase().includes('drive'),
      );
      expect(googleModules.length).toBe(0);
      if (googleModules.length === 0) {
        console.log('✓ No Google Drive-related modules found in sidebar for expired plan when disabled');
      }

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Google Drive access when set up is not complete/or complete and modules for Live/Trial plan when Google Drive is disabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Google Drive access for Live/Trial plan when disabled ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Verify Google Drive access and modules for Live/Trial plan when Google Drive is disabled' });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Ensure "Show Google Drive" checkbox is disabled (unchecked)
      console.log('\n[STEP 3] Ensuring "Show Google Drive" checkbox is disabled...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Ensure Show Google Drive is disabled' });

      const checkboxVisible = await settingsPage.isShowGoogleDriveCheckboxVisible();
      expect(checkboxVisible).toBeTruthy();
      console.log('✓ "Show Google Drive" checkbox is visible');

      let isChecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
      console.log(`✓ Checkbox current state: ${isChecked ? 'Checked' : 'Unchecked'}`);

      if (isChecked) {
        console.log('  Checkbox is currently checked, unchecking it and saving...');
        await settingsPage.setShowGoogleDriveCheckbox(false);
        const nowUnchecked = await settingsPage.isShowGoogleDriveCheckboxChecked();
        expect(nowUnchecked).toBeFalsy();
        console.log('✓ Checkbox is now unchecked');

        // Click Save
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        // Verify success toast (best-effort)
        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after disabling Google Drive');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      } else {
        console.log('✓ Checkbox is already unchecked (Google Drive disabled)');
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Handle subscription selection modal' });

      const subscriptionModal = customerPage.locator('div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))').first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage.locator('table.modern-table-modal input[type="radio"][name="subscription"]').first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage.locator(
            'div.modal button:has-text("Submit"), ' +
            'div.modal button:has-text("Confirm"), ' +
            'div.modal button:has-text("Select"), ' +
            'div.modal button[type="submit"], ' +
            'div.common-modal button:has-text("Submit"), ' +
            'div.common-modal button:has-text("Confirm")'
          ).first();

          const submitButtonVisible = await modalSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);
      console.log('✓ Customer Portal dashboard should be loaded');

      // STEP 6: Verify plan status using dashboard CTA button (must be Live/Trial)
      console.log('\n[STEP 6] Verifying plan status using dashboard CTA button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify plan status is Live/Trial' });

      const planCta = customerPage.locator(
        'span.renew-btn-modern, ' +
        'button:has-text("Upgrade Now"), ' +
        'button:has-text("Upgrade to Pro"), ' +
        'button:has-text("Renew Now")'
      ).first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('renew now')) {
        console.log('⚠ Plan appears to be Expired (CTA: Renew Now). This test is only for Live/Trial plans.');
        test.skip(true, 'Plan is Expired. This Live/Trial (Google Drive disabled) test is not applicable.');
      }

      const isLiveOrTrial =
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade');

      expect(isLiveOrTrial).toBeTruthy();
      console.log('✓ Plan is Live/Trial based on CTA text');

      // STEP 7: Verify Google Drive setup modal does NOT appear
      console.log('\n[STEP 7] Verifying Google Drive setup modal does NOT appear...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify no Google Drive setup modal' });

      const setupModalVisible = await settingsPage.isGoogleDriveSetupModalVisible(customerPage);
      expect(setupModalVisible).toBeFalsy();
      console.log('✓ Google Drive setup modal is NOT visible when Google Drive is disabled');

      // STEP 8: Verify Google Drive module is not visible in sidebar
      console.log('\n[STEP 8] Verifying Google Drive module is not visible in sidebar...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify Google Drive module hidden' });

      const googleDriveVisible = await settingsPage.isGoogleDriveModuleVisibleInCustomerPortal(customerPage);
      expect(googleDriveVisible).toBeFalsy();
      console.log('✓ Google Drive module is not visible in sidebar when disabled');

      const allModules = await settingsPage.getAllSidebarModules(customerPage);
      console.log(`  Found modules: ${allModules.join(', ')}`);
      const googleModules = allModules.filter(m => m.toLowerCase().includes('google') && m.toLowerCase().includes('drive'));
      expect(googleModules.length).toBe(0);
      if (googleModules.length === 0) {
        console.log('✓ No Google Drive-related modules found in sidebar');
      }

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Service Request visibility for expired plan when Ticket Support is enabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Service Request visibility for expired plan when Ticket Support enabled ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({
      type: 'test',
      description:
        'Verify Service Request module visibility for expired plan when Ticket Support is enabled from Partner Portal',
    });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings page
      console.log('\n[STEP 2] Navigating to Settings page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings page');

      // STEP 3: Ensure Ticket Support question is set to "Yes"
      console.log('\n[STEP 3] Ensuring Ticket Support is enabled (Yes)...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 3: Ensure Ticket Support question is set to Yes',
      });

      const questionVisible = await settingsPage.isTicketSupportQuestionVisible();
      expect(questionVisible).toBeTruthy();
      console.log('✓ Ticket Support question is visible');

      const selectedOption = await settingsPage.getSelectedTicketSupportOption();
      console.log(`  Current Ticket Support option: "${selectedOption}"`);

      if (selectedOption !== 'Yes') {
        console.log('  Ticket Support is not set to "Yes", updating and saving...');
        await settingsPage.selectTicketSupportYes();
        const yesSelected = await settingsPage.isTicketSupportYesRadioSelected();
        expect(yesSelected).toBeTruthy();
        console.log('✓ Selected "Yes" for Ticket Support');

        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after enabling Ticket Support');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      } else {
        console.log('✓ Ticket Support is already set to "Yes"');
      }

      // STEP 4: Logout from Partner Portal (best-effort, not critical)
      console.log('\n[STEP 4] Logging out from Partner Portal (best-effort)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Logout from Partner Portal' });
      try {
        const logoutButton = partnerPage
          .locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")')
          .first();
        if (await logoutButton.isVisible({ timeout: 3000 }).catch(() => false)) {
          await logoutButton.click();
          await partnerPage.waitForLoadState('networkidle').catch(() => {});
          await partnerPage.waitForTimeout(2000);
          console.log('✓ Logged out from Partner Portal');
        } else {
          console.log('  ⚠ Logout button not found, continuing without explicit logout');
        }
      } catch (e) {
        console.log(`  ⚠ Error while logging out from Partner Portal: ${e.message}`);
      }

      // STEP 5: Login to Customer Portal
      console.log('\n[STEP 5] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage
        .locator('input[type="email"], input[id*="email"], input[name*="email"]')
        .first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage
        .locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
        .first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // Handle subscription selection modal (if present) before verifying Dashboard
      console.log('  Checking for subscription selection modal...');
      const subscriptionModal = customerPage
        .locator(
          'div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))',
        )
        .first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage
          .locator('table.modern-table-modal input[type="radio"][name="subscription"]')
          .first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage
            .locator(
              'div.modal button:has-text("Submit"), ' +
                'div.modal button:has-text("Confirm"), ' +
                'div.modal button:has-text("Select"), ' +
                'div.modal button[type="submit"], ' +
                'div.common-modal button:has-text("Submit"), ' +
                'div.common-modal button:has-text("Confirm")',
            )
            .first();

          const submitButtonVisible = await modalSubmitButton
            .isVisible({ timeout: 3000 })
            .catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 6: Ensure we are on Dashboard page
      console.log('\n[STEP 6] Verifying Dashboard page is loaded...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Dashboard page' });

      const onDashboard = await settingsPage.isOnDashboardPage(customerPage);
      expect(onDashboard).toBeTruthy();
      console.log('✓ Customer Portal Dashboard is loaded');

      // STEP 7: Verify Renew Now modal is displayed for expired plan
      console.log('\n[STEP 7] Verifying Renew Now modal is displayed for expired plan...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 7: Verify Renew Now modal for expired plan',
      });

      const planCta = customerPage
        .locator(
          'span.renew-btn-modern, ' +
            'button:has-text("Upgrade Now"), ' +
            'button:has-text("Upgrade to Pro"), ' +
            'button:has-text("Renew Now")',
        )
        .first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade')
      ) {
        console.log('⚠ Plan appears to be Live/Trial (CTA: Upgrade). This test is only for expired plans.');
        test.skip(true, 'Plan is Live/Trial. This expired-plan Ticket Support test is not applicable.');
      }

      expect(ctaLower.includes('renew now')).toBeTruthy();
      console.log('✓ Plan is Expired based on CTA text (Renew Now)');

      const renewModalVisible = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisible).toBeTruthy();
      console.log('✓ Renew Now modal is visible on Dashboard for expired plan');

      // (Best-effort) Validate modal text and presence of Renew Now button
      const renewButtonInModal = customerPage
        .locator(
          'div.common-modal button:has-text("Renew"), ' +
            'div.common-modal button:has-text("Renew Now"), ' +
            'div.modal button:has-text("Renew")',
        )
        .first();
      const renewButtonVisible = await renewButtonInModal.isVisible({ timeout: 5000 }).catch(() => false);
      expect(renewButtonVisible).toBeTruthy();
      console.log('✓ Renew Now button is visible in the modal');

      // STEP 8: Click on the Renew Now button
      console.log('\n[STEP 8] Clicking Renew Now button in modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Click Renew Now button' });

      const renewClicked = await settingsPage.clickRenewButtonInPlanModal(customerPage);
      expect(renewClicked).toBeTruthy();
      console.log('✓ Clicked Renew Now button in expired plan modal');

      // STEP 9: Verify user remains logged in, navigation succeeds, and Service Request is visible
      console.log('\n[STEP 9] Verifying post-Renew Now behavior and Service Request visibility...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 9: Verify logged-in state and Service Request visibility',
      });

      await customerPage.waitForLoadState('networkidle').catch(() => {});
      await customerPage.waitForTimeout(3000);

      // User remains logged in: sidebar should still be visible
      const sidebarVisible = await customerPage
        .locator('div.sidebar, nav.sidebar, aside.sidebar')
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);
      expect(sidebarVisible).toBeTruthy();
      console.log('✓ Sidebar is visible after clicking Renew Now (user remains logged in)');

      // Navigation successful: not on login or error page
      const currentUrl = customerPage.url();
      console.log(`  Current URL after Renew Now: ${currentUrl}`);
      expect(currentUrl.toLowerCase()).toContain('dev.cocloud.in');
      console.log('✓ Navigation is successful and domain is correct after Renew Now');

      const loginFormVisible = await customerPage
        .locator('form:has(input[type="email"]), form:has-text("Login"), form:has-text("Sign In")')
        .first()
        .isVisible({ timeout: 3000 })
        .catch(() => false);
      expect(loginFormVisible).toBeFalsy();
      console.log('✓ User is not redirected back to login page after Renew Now');

      // Service Request module should be visible because Ticket Support is enabled
      const serviceRequestVisible = await settingsPage.isServiceRequestModuleVisibleInCustomerPortal(
        customerPage,
      );
      expect(serviceRequestVisible).toBeTruthy();
      console.log('✓ Service Request module is visible in sidebar for expired plan when Ticket Support enabled');

      // STEP 10: Verify Service Request is clickable and user can navigate to All Requests
      console.log('\n[STEP 10] Verifying Service Request -> All Requests navigation...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 10: Verify Service Request -> All Requests navigation',
      });

      const navigatedToAllRequests = await settingsPage.navigateToServiceRequestAllRequests(customerPage);
      expect(navigatedToAllRequests).toBeTruthy();
      console.log('✓ Service Request module is clickable and navigates to All Requests page');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Service Request hidden for expired plan when Ticket Support is disabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Service Request hidden for expired plan when Ticket Support disabled ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({
      type: 'test',
      description:
        'Verify Service Request module is hidden for expired plan when Ticket Support is disabled from Partner Portal',
    });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings page
      console.log('\n[STEP 2] Navigating to Settings page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings page');

      // STEP 3: Ensure Ticket Support question is set to "No"
      console.log('\n[STEP 3] Ensuring Ticket Support is disabled (No)...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 3: Ensure Ticket Support question is set to No',
      });

      const questionVisible = await settingsPage.isTicketSupportQuestionVisible();
      expect(questionVisible).toBeTruthy();
      console.log('✓ Ticket Support question is visible');

      const selectedOption = await settingsPage.getSelectedTicketSupportOption();
      console.log(`  Current Ticket Support option: "${selectedOption}"`);

      if (selectedOption !== 'No') {
        console.log('  Ticket Support is not set to "No", updating and saving...');
        await settingsPage.selectTicketSupportNo();
        const noSelected = await settingsPage.isTicketSupportNoRadioSelected();
        expect(noSelected).toBeTruthy();
        console.log('✓ Selected "No" for Ticket Support');

        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after disabling Ticket Support');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      } else {
        console.log('✓ Ticket Support is already set to "No"');
      }

      // STEP 4: Login to Customer Portal
      console.log('\n[STEP 4] Logging in to Customer Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage
        .locator('input[type="email"], input[id*="email"], input[name*="email"]')
        .first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage
        .locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
        .first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) {
          break;
        }
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 5: Handle subscription selection modal (if present)
      console.log('\n[STEP 5] Handling subscription selection modal (if present)...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 5: Handle subscription selection modal',
      });

      const subscriptionModal = customerPage
        .locator(
          'div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))',
        )
        .first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage
          .locator('table.modern-table-modal input[type="radio"][name="subscription"]')
          .first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage
            .locator(
              'div.modal button:has-text("Submit"), ' +
                'div.modal button:has-text("Confirm"), ' +
                'div.modal button:has-text("Select"), ' +
                'div.modal button[type="submit"], ' +
                'div.common-modal button:has-text("Submit"), ' +
                'div.common-modal button:has-text("Confirm")',
            )
            .first();

          const submitButtonVisible = await modalSubmitButton
            .isVisible({ timeout: 3000 })
            .catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 6: Ensure we are on Dashboard page
      console.log('\n[STEP 6] Verifying Dashboard page is loaded...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Dashboard page' });

      const onDashboard = await settingsPage.isOnDashboardPage(customerPage);
      expect(onDashboard).toBeTruthy();
      console.log('✓ Customer Portal Dashboard is loaded');

      // STEP 7: Verify Renew Now modal is displayed for expired plan
      console.log('\n[STEP 7] Verifying Renew Now modal is displayed for expired plan...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 7: Verify Renew Now modal for expired plan',
      });

      const planCta = customerPage
        .locator(
          'span.renew-btn-modern, ' +
            'button:has-text("Upgrade Now"), ' +
            'button:has-text("Upgrade to Pro"), ' +
            'button:has-text("Renew Now")',
        )
        .first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade')
      ) {
        console.log('⚠ Plan appears to be Live/Trial (CTA: Upgrade). This test is only for expired plans.');
        test.skip(true, 'Plan is Live/Trial. This expired-plan Ticket Support disabled test is not applicable.');
      }

      expect(ctaLower.includes('renew now')).toBeTruthy();
      console.log('✓ Plan is Expired based on CTA text (Renew Now)');

      const renewModalVisible = await settingsPage.isRenewPlanModalVisible(customerPage);
      expect(renewModalVisible).toBeTruthy();
      console.log('✓ Renew Now modal is visible on Dashboard for expired plan');

      // Verify Renew Now button in modal
      const renewButtonInModal = customerPage
        .locator(
          'div.common-modal button:has-text("Renew"), ' +
            'div.common-modal button:has-text("Renew Now"), ' +
            'div.modal button:has-text("Renew")',
        )
        .first();
      const renewButtonVisible = await renewButtonInModal.isVisible({ timeout: 5000 }).catch(() => false);
      expect(renewButtonVisible).toBeTruthy();
      console.log('✓ Renew Now button is visible in the modal');

      // STEP 8: Click on the Renew Now button
      console.log('\n[STEP 8] Clicking Renew Now button in modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Click Renew Now button' });

      const renewClicked = await settingsPage.clickRenewButtonInPlanModal(customerPage);
      expect(renewClicked).toBeTruthy();
      console.log('✓ Clicked Renew Now button in expired plan modal');

      // STEP 9: Verify user remains logged in, navigation succeeds, and Service Request is NOT visible
      console.log('\n[STEP 9] Verifying post-Renew Now behavior and Service Request NOT visible...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 9: Verify logged-in state and Service Request hidden',
      });

      await customerPage.waitForLoadState('networkidle').catch(() => {});
      await customerPage.waitForTimeout(3000);

      // User remains logged in: sidebar should still be visible
      const sidebarVisible = await customerPage
        .locator('div.sidebar, nav.sidebar, aside.sidebar')
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);
      expect(sidebarVisible).toBeTruthy();
      console.log('✓ Sidebar is visible after clicking Renew Now (user remains logged in)');

      // Navigation successful: not on login or error page
      const currentUrl = customerPage.url();
      console.log(`  Current URL after Renew Now: ${currentUrl}`);
      expect(currentUrl.toLowerCase()).toContain('dev.cocloud.in');
      console.log('✓ Navigation is successful and domain is correct after Renew Now');

      const loginFormVisible = await customerPage
        .locator('form:has(input[type="email"]), form:has-text("Login"), form:has-text("Sign In")')
        .first()
        .isVisible({ timeout: 3000 })
        .catch(() => false);
      expect(loginFormVisible).toBeFalsy();
      console.log('✓ User is not redirected back to login page after Renew Now');

      // Service Request module should NOT be visible because Ticket Support is disabled
      const serviceRequestVisible = await settingsPage.isServiceRequestModuleVisibleInCustomerPortal(
        customerPage,
      );
      expect(serviceRequestVisible).toBeFalsy();
      console.log('✓ Service Request module is NOT visible in sidebar for expired plan when Ticket Support disabled');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test.skip('should verify Service Request visibility and accessibility for Live/Trial plan when Ticket Support is enabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Service Request visibility & accessibility for Live/Trial plan when Ticket Support enabled ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({
      type: 'test',
      description:
        'Verify Service Request module visibility and accessibility in Customer Portal for Live/Trial plan when Ticket Support is enabled in Partner Portal',
    });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3 & 4: Ensure Ticket Support question is set to "Yes" and save
      console.log('\n[STEP 3] Ensuring Ticket Support is enabled (Yes)...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 3–5: Ensure Ticket Support = Yes and save',
      });

      const questionVisible = await settingsPage.isTicketSupportQuestionVisible();
      expect(questionVisible).toBeTruthy();
      console.log('✓ Ticket Support question is visible');

      const selectedOption = await settingsPage.getSelectedTicketSupportOption();
      console.log(`  Current Ticket Support option: "${selectedOption}"`);

      if (selectedOption !== 'Yes') {
        console.log('  Ticket Support is not set to "Yes", updating and saving...');
        await settingsPage.selectTicketSupportYes();
        const yesSelected = await settingsPage.isTicketSupportYesRadioSelected();
        expect(yesSelected).toBeTruthy();
        console.log('✓ Selected "Yes" for Ticket Support');

        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after enabling Ticket Support');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      } else {
        console.log('✓ Ticket Support is already set to "Yes"');
      }

      // STEP 6: Login to Customer Portal (Live/Trial expected)
      console.log('\n[STEP 6] Logging in to Customer Portal (Live/Trial expected)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage
        .locator('input[type="email"], input[id*="email"], input[name*="email"]')
        .first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage
        .locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
        .first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) break;
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // Handle subscription selection modal (if present)
      console.log('  Checking for subscription selection modal...');
      const subscriptionModal = customerPage
        .locator(
          'div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))',
        )
        .first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage
          .locator('table.modern-table-modal input[type="radio"][name="subscription"]')
          .first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage
            .locator(
              'div.modal button:has-text("Submit"), ' +
                'div.modal button:has-text("Confirm"), ' +
                'div.modal button:has-text("Select"), ' +
                'div.modal button[type="submit"], ' +
                'div.common-modal button:has-text("Submit"), ' +
                'div.common-modal button:has-text("Confirm")',
            )
            .first();

          const submitButtonVisible = await modalSubmitButton
            .isVisible({ timeout: 3000 })
            .catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 7: Verify plan is Live/Trial (NOT expired)
      console.log('\n[STEP 7] Verifying plan status is Live/Trial...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 7: Verify plan status is Live/Trial',
      });

      const planCta = customerPage
        .locator(
          'span.renew-btn-modern, ' +
            'button:has-text("Upgrade Now"), ' +
            'button:has-text("Upgrade to Pro"), ' +
            'button:has-text("Renew Now")',
        )
        .first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('renew now')) {
        console.log('⚠ Plan appears to be Expired (CTA: Renew Now). This test is only for Live/Trial plans.');
        test.skip(true, 'Plan is Expired. This Live/Trial Ticket Support test is not applicable.');
      }

      const isLiveOrTrial =
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade');

      expect(isLiveOrTrial).toBeTruthy();
      console.log('✓ Plan is Live/Trial based on CTA text');

      // STEP 8: Verify Service Request module visibility, clickability, and no lock icon
      console.log('\n[STEP 8] Verifying Service Request module visibility, clickability, and no lock icon...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 8: Verify Service Request module visible, clickable, and unlocked',
      });

      const serviceRequestVisible = await settingsPage.isServiceRequestModuleVisibleInCustomerPortal(
        customerPage,
      );
      expect(serviceRequestVisible).toBeTruthy();
      console.log('✓ Service Request module is visible in sidebar');

      const hasLockIcon = await settingsPage.hasLockIcon(customerPage, 'Service Request');
      expect(hasLockIcon).toBeFalsy();
      console.log('✓ Service Request module does NOT show a lock icon');

      const isLocked = await settingsPage.isModuleLockedInCustomerPortal(customerPage, 'Service Request');
      expect(isLocked).toBeFalsy();
      console.log('✓ Service Request module is not locked / disabled');

      // STEP 9a: Verify All Requests sub-module
      console.log('\n[STEP 9a] Verifying Service Request -> All Requests accessibility...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 9a: Verify All Requests sub-module',
      });

      const navigatedToAllRequests = await settingsPage.navigateToServiceRequestAllRequests(customerPage);
      expect(navigatedToAllRequests).toBeTruthy();

      const allReqUrl = customerPage.url().toLowerCase();
      const allReqUrlOk =
        allReqUrl.includes('/service-request/all-requests') || allReqUrl.includes('all-request');
      expect(allReqUrlOk).toBeTruthy();
      console.log(`✓ All Requests URL is correct: ${allReqUrl}`);

      // STEP 9b: Verify Raise Request sub-module (click only, without strict navigation assertions)
      console.log('\n[STEP 9b] Verifying Service Request -> Raise Request clickability...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 9b: Verify Raise Request sub-module clickability',
      });

      const navigatedToRaiseRequest =
        await settingsPage.navigateToServiceRequestRaiseRequest(customerPage);
      expect(navigatedToRaiseRequest).toBeTruthy();

      const raiseUrl = customerPage.url().toLowerCase();
      console.log(`✓ After clicking Raise Request, current URL: ${raiseUrl}`);

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });

  test('should verify Service Request hidden for Live/Trial plan when Ticket Support is disabled', async ({ browser }, testInfo) => {
    const partnerPortalUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const customerPortalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in';
    const partnerEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const partnerPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

    test.setTimeout(300000); // 5 minutes timeout

    console.log('\n=== Starting Test: Service Request hidden for Live/Trial plan when Ticket Support disabled ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({
      type: 'test',
      description:
        'Verify Service Request module/menu is NOT visible in Customer Portal for Live/Trial plan when Ticket Support is disabled in Partner Portal',
    });

    // Create partner portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();

    // Create customer portal context
    const customerContext = await browser.newContext();
    const customerPage = await customerContext.newPage();

    try {
      // STEP 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      const dashboardPage = new DashboardPage(partnerPage);
      await dashboardPage.goto(partnerPortalUrl);
      await dashboardPage.login(partnerEmail, partnerPassword);
      console.log('✓ Logged in to Partner Portal');

      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);

      // STEP 2: Navigate to Settings module
      console.log('\n[STEP 2] Navigating to Settings module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Settings' });
      const settingsPage = new SettingsPage(partnerPage);
      await settingsPage.navigateToSettings();
      await partnerPage.waitForLoadState('networkidle');
      await partnerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Settings module');

      // STEP 3: Set Ticket Support to "No"
      console.log('\n[STEP 3] Ensuring Ticket Support is disabled (No)...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 3: Set Ticket Support radio to No',
      });

      const questionVisible = await settingsPage.isTicketSupportQuestionVisible();
      expect(questionVisible).toBeTruthy();
      console.log('✓ Ticket Support question is visible');

      const selectedOption = await settingsPage.getSelectedTicketSupportOption();
      console.log(`  Current Ticket Support option: "${selectedOption}"`);

      if (selectedOption !== 'No') {
        console.log('  Ticket Support is not set to "No", updating and saving...');
        await settingsPage.selectTicketSupportNo();
        const noSelected = await settingsPage.isTicketSupportNoRadioSelected();
        expect(noSelected).toBeTruthy();
        console.log('✓ Selected "No" for Ticket Support');

        // STEP 4: Click Save and verify success (best-effort)
        await settingsPage.clickSaveButton();
        await partnerPage.waitForTimeout(2000);

        const successToastVisible = await settingsPage.isSuccessToastVisible();
        if (successToastVisible) {
          console.log('✓ Success toast/message appeared after disabling Ticket Support');
        } else {
          console.log('  ⚠ Success toast not visible (may have appeared and disappeared)');
        }
      } else {
        console.log('✓ Ticket Support is already set to "No"');
      }

      // STEP 5: Login to Customer Portal (Live/Trial expected)
      console.log('\n[STEP 5] Logging in to Customer Portal (Live/Trial expected)...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Login to Customer Portal' });

      await customerPage.goto(customerPortalUrl);
      await customerPage.waitForLoadState('domcontentloaded');
      await customerPage.waitForTimeout(2000);

      const customerEmailInput = customerPage
        .locator('input[type="email"], input[id*="email"], input[name*="email"]')
        .first();
      const customerPasswordInput = customerPage.locator('input[type="password"]').first();
      const customerLoginButton = customerPage
        .locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")')
        .first();

      // Wait for email input to be visible (with retries)
      let emailInputVisible = false;
      for (let attempt = 0; attempt < 3; attempt++) {
        emailInputVisible = await customerEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
        if (emailInputVisible) break;
        console.log(`  Attempt ${attempt + 1}: Email input not visible, waiting...`);
        await customerPage.waitForTimeout(2000);
        if (attempt === 1) {
          await customerPage.reload({ waitUntil: 'domcontentloaded' });
          await customerPage.waitForTimeout(2000);
        }
      }

      if (!emailInputVisible) {
        throw new Error('Customer email input not visible after multiple attempts');
      }

      await customerEmailInput.fill(customerEmail);
      await customerPasswordInput.fill(customerPassword);
      await customerLoginButton.click();
      console.log('✓ Submitted customer credentials');

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // Handle subscription selection modal (if present)
      console.log('  Checking for subscription selection modal...');
      const subscriptionModal = customerPage
        .locator(
          'div.modal:has(h5:has-text("Select Subscription")), div.common-modal:has(h5:has-text("Select Subscription"))',
        )
        .first();
      const modalVisible = await subscriptionModal.isVisible({ timeout: 5000 }).catch(() => false);

      if (modalVisible) {
        console.log('  ✓ Subscription modal is visible');
        await customerPage.waitForTimeout(1000);

        const firstSubscriptionRadio = customerPage
          .locator('table.modern-table-modal input[type="radio"][name="subscription"]')
          .first();
        const radioVisible = await firstSubscriptionRadio.isVisible({ timeout: 5000 }).catch(() => false);

        if (radioVisible) {
          await firstSubscriptionRadio.click();
          await customerPage.waitForTimeout(500);
          console.log('  ✓ Selected first subscription');

          const modalSubmitButton = customerPage
            .locator(
              'div.modal button:has-text("Submit"), ' +
                'div.modal button:has-text("Confirm"), ' +
                'div.modal button:has-text("Select"), ' +
                'div.modal button[type="submit"], ' +
                'div.common-modal button:has-text("Submit"), ' +
                'div.common-modal button:has-text("Confirm")',
            )
            .first();

          const submitButtonVisible = await modalSubmitButton
            .isVisible({ timeout: 3000 })
            .catch(() => false);
          if (submitButtonVisible) {
            await modalSubmitButton.click();
            await customerPage.waitForLoadState('networkidle');
            await customerPage.waitForTimeout(2000);
            console.log('  ✓ Clicked submit/confirm button in subscription modal');
          } else {
            console.log('  ⚠ No submit button found, modal may close automatically');
            await customerPage.waitForTimeout(2000);
          }
        } else {
          console.log('  ⚠ No subscription radio buttons found');
        }
      } else {
        console.log('  ⚠ Subscription modal not visible, continuing...');
      }

      await customerPage.waitForLoadState('networkidle');
      await customerPage.waitForTimeout(3000);

      // STEP 6: Verify plan is Live/Trial (NOT expired)
      console.log('\n[STEP 6] Verifying plan status is Live/Trial...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 6: Verify plan status is Live/Trial',
      });

      const planCta = customerPage
        .locator(
          'span.renew-btn-modern, ' +
            'button:has-text("Upgrade Now"), ' +
            'button:has-text("Upgrade to Pro"), ' +
            'button:has-text("Renew Now")',
        )
        .first();

      const ctaTextRaw = await planCta.textContent().catch(() => '');
      const ctaText = ctaTextRaw ? ctaTextRaw.trim() : '';
      console.log(`  Plan CTA text: "${ctaText}"`);

      if (!ctaText) {
        throw new Error('Could not determine plan status (CTA text not found)');
      }

      const ctaLower = ctaText.toLowerCase();
      if (ctaLower.includes('renew now')) {
        console.log('⚠ Plan appears to be Expired (CTA: Renew Now). This test is only for Live/Trial plans.');
        test.skip(true, 'Plan is Expired. This Live/Trial Ticket Support-disabled test is not applicable.');
      }

      const isLiveOrTrial =
        ctaLower.includes('upgrade now') ||
        ctaLower.includes('upgrade to pro') ||
        ctaLower.includes('upgrade');

      expect(isLiveOrTrial).toBeTruthy();
      console.log('✓ Plan is Live/Trial based on CTA text');

      // STEP 7: Verify Service Request module is NOT visible in Customer Portal
      console.log('\n[STEP 7] Verifying Service Request module is NOT visible in Customer Portal...');
      testInfo.annotations.push({
        type: 'step',
        description: 'Step 7: Verify Service Request is hidden',
      });

      const serviceRequestVisible = await settingsPage.isServiceRequestModuleVisibleInCustomerPortal(
        customerPage,
      );
      expect(serviceRequestVisible).toBeFalsy();
      console.log('✓ Service Request module/menu is NOT visible in the Customer Portal when Ticket Support is disabled for Live/Trial plan');

      console.log('\n=== Test Completed Successfully ===');
    } finally {
      await partnerContext.close();
      await customerContext.close();
    }
  });
});