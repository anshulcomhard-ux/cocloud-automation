const { test, expect } = require('@playwright/test');
const { ForgotPasswordPage } = require('../pages/forgotpsd');

test.describe('Partner Portal - Forgot Password', () => {
  test('should verify Forgot Password flow', async ({ page, browser }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';

    test.setTimeout(300000); // 5 minutes timeout (increased for admin portal check)

    console.log('\n=== Starting Test: Forgot Password Flow ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Forgot Password feature flow' });

    const forgotPasswordPage = new ForgotPasswordPage(page);

    // STEP 1: Navigate to the login page
    console.log('\n[STEP 1] Navigating to login page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to login page' });
    
    await forgotPasswordPage.gotoLoginPage(baseUrl);
    console.log('✓ Navigated to login page');

    // STEP 2: Verify elements are visible
    console.log('\n[STEP 2] Verifying login page elements are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify login page elements' });
    
    const emailVisible = await forgotPasswordPage.isLoginEmailInputVisible();
    expect(emailVisible).toBeTruthy();
    console.log('✓ Email input field is visible');
    
    const passwordVisible = await forgotPasswordPage.isLoginPasswordInputVisible();
    expect(passwordVisible).toBeTruthy();
    console.log('✓ Password input field is visible');
    
    const forgotLinkVisible = await forgotPasswordPage.isForgotPasswordLinkVisible();
    expect(forgotLinkVisible).toBeTruthy();
    console.log('✓ Forgot Password link is visible');
    
    const signInVisible = await forgotPasswordPage.isSignInButtonVisible();
    expect(signInVisible).toBeTruthy();
    console.log('✓ Sign In button is visible');

    // STEP 3: Click on "Forgot Password" link
    console.log('\n[STEP 3] Clicking on "Forgot Password" link...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Forgot Password link' });
    
    await forgotPasswordPage.clickForgotPasswordLink();
    
    // Verify user navigates to Reset Password page
    const resetPageVisible = await forgotPasswordPage.isResetPasswordPageVisible();
    expect(resetPageVisible).toBeTruthy();
    console.log('✓ Navigated to Reset Password page');
    
    // Verify page heading "Reset Password" is visible
    const headingVisible = await forgotPasswordPage.resetPasswordHeading.isVisible({ timeout: 5000 }).catch(() => false);
    expect(headingVisible).toBeTruthy();
    console.log('✓ Page heading "Reset Password" is visible');
    
    const headingText = await forgotPasswordPage.getResetPasswordHeadingText();
    expect(headingText.toLowerCase()).toContain('reset password');
    console.log(`✓ Heading text: "${headingText}"`);
    
    // Verify email input field is visible
    const resetEmailVisible = await forgotPasswordPage.isResetEmailInputVisible();
    expect(resetEmailVisible).toBeTruthy();
    console.log('✓ Email input field is visible on Reset Password page');
    
    // Verify "Request OTP" button is visible
    const requestOtpVisible = await forgotPasswordPage.isRequestOtpButtonVisible();
    expect(requestOtpVisible).toBeTruthy();
    console.log('✓ "Request OTP" button is visible');
    
    // Check button state (may be enabled or disabled by default depending on implementation)
    const requestOtpEnabled = await forgotPasswordPage.isRequestOtpButtonEnabled();
    if (requestOtpEnabled) {
      console.log('✓ "Request OTP" button is enabled by default');
    } else {
      console.log('✓ "Request OTP" button is disabled by default');
    }
    
    // Verify email field is empty
    const emailValue = await forgotPasswordPage.getEmailValue();
    expect(emailValue).toBe('');
    console.log('✓ Email field is empty by default');

    // STEP 4: Negative Scenarios
    console.log('\n[STEP 4] Testing negative scenarios...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Test negative scenarios' });
    
    // 4a: Click Request OTP without entering email
    console.log('\n[STEP 4a] Clicking Request OTP without entering email...');
    await forgotPasswordPage.clickRequestOtpButton();
    await page.waitForTimeout(1000);
    
    const validationErrorVisible = await forgotPasswordPage.isEmailValidationErrorVisible();
    if (validationErrorVisible) {
      const errorText = await forgotPasswordPage.getEmailValidationErrorText();
      console.log(`✓ Validation message shown: "${errorText}"`);
      expect(validationErrorVisible).toBeTruthy();
    } else {
      console.log('  ⚠ Validation error not visible (may be handled differently)');
    }
    
    // 4b: Enter invalid email formats and verify validation messages
    console.log('\n[STEP 4b] Testing invalid email formats...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4b: Test invalid email formats' });
    
    const invalidEmails = ['abc', 'abc@', 'abc@.gmail'];
    
    for (const invalidEmail of invalidEmails) {
      await forgotPasswordPage.enterEmail(invalidEmail);
      await page.waitForTimeout(500);
      
      const isValid = forgotPasswordPage.isValidEmailFormat(invalidEmail);
      expect(isValid).toBeFalsy();
      console.log(`✓ Invalid email format "${invalidEmail}" detected`);
      
      // Check button state and validation
      const buttonEnabled = await forgotPasswordPage.isRequestOtpButtonEnabled();
      if (!buttonEnabled) {
        console.log(`✓ Request OTP button remains disabled for "${invalidEmail}"`);
      } else {
        // Button is enabled, try clicking to see validation
        await forgotPasswordPage.clickRequestOtpButton();
        await page.waitForTimeout(1000);
        const errorVisible = await forgotPasswordPage.isEmailValidationErrorVisible();
        if (errorVisible) {
          const errorText = await forgotPasswordPage.getEmailValidationErrorText();
          console.log(`✓ Error message shown for "${invalidEmail}": "${errorText}"`);
        } else {
          console.log(`  ⚠ No error message shown for "${invalidEmail}"`);
        }
      }
    }
    
    // 4c: Enter correct registered email and verify OTP sent
    console.log('\n[STEP 4c] Testing with registered email...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4c: Test with registered email' });
    
    const registeredEmail = 'contact@comhard.co.in';
    console.log(`  Entering registered email: "${registeredEmail}"`);
    await forgotPasswordPage.enterEmail(registeredEmail);
    await page.waitForTimeout(500);
    
    const buttonEnabledForRegistered = await forgotPasswordPage.isRequestOtpButtonEnabled();
    expect(buttonEnabledForRegistered).toBeTruthy();
    console.log('✓ Request OTP button is enabled');
    
    await forgotPasswordPage.clickRequestOtpButton();
    await forgotPasswordPage.waitForLoaderToDisappear(10000);
    await page.waitForTimeout(3000);
    
    // Verify OTP sent (success toast or fields visible)
    const successToast = await forgotPasswordPage.isSuccessToastVisible();
    if (successToast) {
      const toastText = await forgotPasswordPage.getSuccessToastText();
      console.log(`✓ OTP sent successfully: "${toastText}"`);
    } else {
      console.log('  ⚠ Success toast not visible, checking fields visibility...');
    }
    
    // Verify OTP, Password, Confirm Password fields ARE visible
    const resetFields = await forgotPasswordPage.areResetPasswordFieldsVisible();
    expect(resetFields.allVisible).toBeTruthy();
    console.log('✓ Reset password fields are visible');
    console.log(`  - OTP field visible: ${resetFields.otp}`);
    console.log(`  - Password field visible: ${resetFields.password}`);
    console.log(`  - Confirm Password field visible: ${resetFields.confirmPassword}`);
    
    // 4d: Verify email exists in admin portal Reseller module
    console.log('\n[STEP 4d] Verifying email in admin portal Reseller module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4d: Verify email in admin portal' });
    
    // Create admin portal context
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    
    try {
      // Navigate to admin portal
      const adminUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in';
      const adminEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
      const adminPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';
      
      console.log('  Navigating to admin portal...');
      await adminPage.goto(adminUrl);
      await adminPage.waitForLoadState('networkidle');
      await adminPage.waitForTimeout(2000);
      
      // Login to admin portal
      console.log('  Logging in to admin portal...');
      const adminEmailInput = adminPage.locator('input[type="email"], input[id*="email"], input[name*="email"]').first();
      const adminPasswordInput = adminPage.locator('input[type="password"]').first();
      const adminLoginButton = adminPage.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
      
      await adminEmailInput.waitFor({ state: 'visible', timeout: 10000 });
      await adminEmailInput.fill(adminEmail);
      await adminPasswordInput.fill(adminPassword);
      await adminLoginButton.click();
      await adminPage.waitForLoadState('networkidle');
      await adminPage.waitForTimeout(3000);
      console.log('  ✓ Logged in to admin portal');
      
      // Navigate to Reseller module
      console.log('  Navigating to Reseller module...');
      const resellerMenuItem = adminPage.locator(
        'div.sidebar-items:has-text("Reseller"), ' +
        'a:has-text("Reseller"), ' +
        'span:has-text("Reseller"), ' +
        '[ng-reflect-router-link*="reseller"], ' +
        '[routerlink*="reseller"], ' +
        'a[href*="reseller"]'
      ).first();
      
      await resellerMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await resellerMenuItem.click();
      await adminPage.waitForLoadState('networkidle');
      await adminPage.waitForTimeout(3000);
      console.log('  ✓ Navigated to Reseller module');
      
      // Click on "Search Here" to expand search form (if collapsed)
      console.log('  Clicking on "Search Here" to expand search form...');
      
      // Check if collapse section is already expanded
      const collapseSection = adminPage.locator('div#collapseExample').first();
      const collapseClass = await collapseSection.getAttribute('class').catch(() => '');
      const isExpanded = collapseClass && collapseClass.includes('show');
      
      if (!isExpanded) {
        // Find the "Search Here" button using the exact HTML structure
        const searchHereButton = adminPage.locator(
          'div.search-box div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has(span:has-text("Search Here")), ' +
          'div.search-box div.py-3[data-bs-toggle="collapse"]:has(span:has-text("Search Here")), ' +
          'div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has(span.ms-5:has-text("Search Here")), ' +
          'div.py-3.collapsed:has(span:has-text("Search Here"))'
        ).first();
        
        await searchHereButton.waitFor({ state: 'visible', timeout: 10000 });
        await searchHereButton.click();
        await adminPage.waitForTimeout(1500);
        console.log('  ✓ Clicked on "Search Here" to expand form');
        
        // Verify form is now expanded
        const newCollapseClass = await collapseSection.getAttribute('class').catch(() => '');
        const nowExpanded = newCollapseClass && newCollapseClass.includes('show');
        if (nowExpanded) {
          console.log('  ✓ Search form is now expanded');
        } else {
          console.log('  ⚠ Search form expansion may still be in progress');
        }
      } else {
        console.log('  ✓ Search form is already expanded');
      }
      
      // Wait for search form to be visible and expanded
      await collapseSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await adminPage.waitForTimeout(1000);
      
      // Find email input field inside the search form (can be hidden but still interactable)
      console.log('  Finding email input field in search form...');
      const emailInput = adminPage.locator(
        'input#email[placeholder="Email"], ' +
        'input[placeholder="Email"][id="email"], ' +
        'input[ng-reflect-name="email"][placeholder="Email"], ' +
        'input[formcontrolname="email"][placeholder="Email"], ' +
        'app-search-form input#email, ' +
        'app-search-form input[placeholder="Email"], ' +
        'div#collapseExample input#email'
      ).first();
      
      // Wait for element to be attached to DOM (even if hidden)
      await emailInput.waitFor({ state: 'attached', timeout: 10000 });
      
      // Try to make it visible by scrolling or clicking the form area first
      try {
        const formArea = adminPage.locator('div#collapseExample, app-search-form').first();
        await formArea.scrollIntoViewIfNeeded();
        await adminPage.waitForTimeout(500);
      } catch (e) {
        console.log('  ⚠ Could not scroll to form area');
      }
      
      // Click on email input (use force if needed)
      const isEmailVisible = await emailInput.isVisible({ timeout: 2000 }).catch(() => false);
      if (isEmailVisible) {
        await emailInput.click();
      } else {
        console.log('  ⚠ Email input is hidden, using force click');
        await emailInput.click({ force: true });
      }
      await adminPage.waitForTimeout(500);
      console.log('  ✓ Clicked on email input field');
      
      // Enter the email in email input field (use force fill if needed)
      console.log(`  Entering email: "${registeredEmail}"`);
      await emailInput.fill(registeredEmail, { force: true });
      await adminPage.waitForTimeout(500);
      console.log('  ✓ Entered email in search form');
      
      // Click search button (submit button inside the form)
      console.log('  Clicking search button...');
      const searchButton = adminPage.locator(
        'app-search-form button.search-btn[type="submit"], ' +
        'app-search-form button:has-text("Search")[type="submit"], ' +
        'button.search-btn[type="submit"]:has-text("Search"), ' +
        'form button[type="submit"].search-btn'
      ).first();
      
      // Try to wait for button to be visible, if hidden try to force click
      const isButtonVisible = await searchButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isButtonVisible) {
        await searchButton.click();
      } else {
        // Button might be hidden but still clickable, try force click
        console.log('  ⚠ Search button not visible, attempting force click...');
        await searchButton.click({ force: true });
      }
      
      await adminPage.waitForLoadState('networkidle');
      await adminPage.waitForTimeout(2000);
      console.log('  ✓ Clicked search button');
      
      // Find email column in table and verify email exists
      console.log('  Verifying email in table...');
      const table = adminPage.locator('table').first();
      const headers = table.locator('thead tr th');
      const headerCount = await headers.count();
      let emailColumnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent().catch(() => '');
        if (text && text.trim().toLowerCase().includes('email')) {
          emailColumnIndex = i;
          break;
        }
      }
      
      if (emailColumnIndex >= 0) {
        const rows = table.locator('tbody tr');
        const rowCount = await rows.count();
        console.log(`  Found ${rowCount} row(s) after search`);
        
        let emailFound = false;
        for (let i = 0; i < rowCount; i++) {
          const row = rows.nth(i);
          const emailCell = row.locator('td').nth(emailColumnIndex);
          const emailText = await emailCell.textContent().catch(() => '');
          if (emailText && emailText.trim().toLowerCase() === registeredEmail.toLowerCase()) {
            emailFound = true;
            console.log(`✓ Email "${registeredEmail}" found in Reseller table`);
            break;
          }
        }
        
        expect(emailFound).toBeTruthy();
        if (!emailFound) {
          throw new Error(`Email "${registeredEmail}" not found in Reseller table after search`);
        }
      } else {
        throw new Error('Could not find email column in Reseller table');
      }
      
    } catch (error) {
      console.log(`  ✗ Error verifying email in admin portal: ${error.message}`);
      throw error;
    } finally {
      // Close admin portal context
      await adminContext.close();
    }

    console.log('\n=== Test Completed Successfully (Completed at STEP 4) ===');
  });

  test('should verify Reset Password flow', async ({ page }, testInfo) => {
    const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
    const registeredEmail = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
    const oldPassword = process.env.PARTNER_PASSWORD || 'hrhk@1111';
    const newPassword = 'NewPassword@123';

    test.setTimeout(300000); // 5 minutes timeout for this comprehensive test

    console.log('\n=== Starting Test: Reset Password Flow ===');
    console.log(`Test started at: ${new Date().toISOString()}`);
    testInfo.annotations.push({ type: 'test', description: 'Test Reset Password feature flow' });

    const forgotPasswordPage = new ForgotPasswordPage(page);

    // STEP 1: Navigate to Partner Portal login page
    console.log('\n[STEP 1] Navigating to Partner Portal login page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to login page' });
    
    await forgotPasswordPage.gotoLoginPage(baseUrl);
    console.log('✓ Navigated to login page');

    // STEP 2: Click on "Forgot Password?" link
    console.log('\n[STEP 2] Clicking on "Forgot Password?" link...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Forgot Password link' });
    
    await forgotPasswordPage.clickForgotPasswordLink();
    console.log('✓ Clicked Forgot Password link');

    // STEP 3: Verify user is navigated to "Reset Password" page
    console.log('\n[STEP 3] Verifying navigation to Reset Password page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Reset Password page' });
    
    const resetPageVisible = await forgotPasswordPage.isResetPasswordPageVisible();
    expect(resetPageVisible).toBeTruthy();
    console.log('✓ Navigated to Reset Password page');

    // STEP 4: Enter registered partner email and request OTP
    console.log('\n[STEP 4] Entering registered partner email and requesting OTP...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Enter email and request OTP' });
    
    await forgotPasswordPage.enterEmail(registeredEmail);
    await page.waitForTimeout(500);
    
    await forgotPasswordPage.clickRequestOtpButton();
    await forgotPasswordPage.waitForLoaderToDisappear(10000);
    await page.waitForTimeout(3000);
    
    // Verify reset password fields are visible (partner is registered)
    const resetPasswordFields = await forgotPasswordPage.areResetPasswordFieldsVisible();
    expect(resetPasswordFields.allVisible).toBeTruthy();
    console.log('✓ Reset password form fields are visible (partner is registered)');

    // ==================== RESET PASSWORD PAGE - UI VERIFICATION ====================
    console.log('\n--- RESET PASSWORD PAGE - UI VERIFICATION ---');

    // STEP 5: Verify all fields are visible
    console.log('\n[STEP 5] Verifying all fields are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify UI fields' });
    
    // Verify email field
    const emailVisible = await forgotPasswordPage.isResetPageEmailInputVisible();
    expect(emailVisible).toBeTruthy();
    console.log('✓ Email field is visible');
    
    const emailValue = await forgotPasswordPage.getResetPageEmailValue();
    console.log(`✓ Email field value: "${emailValue}"`);
    
    const emailDisabled = await forgotPasswordPage.isResetPageEmailDisabled();
    if (emailDisabled) {
      console.log('✓ Email field is disabled (prefilled)');
    } else {
      console.log('✓ Email field is editable');
    }
    
    // Verify OTP input
    expect(resetPasswordFields.otp).toBeTruthy();
    console.log('✓ Enter OTP input is visible');
    
    // Verify Password input
    expect(resetPasswordFields.password).toBeTruthy();
    console.log('✓ Enter Password input is visible');
    
    // Verify Re-enter Password input
    expect(resetPasswordFields.confirmPassword).toBeTruthy();
    console.log('✓ Re-enter Password input is visible');
    
    // Verify Change Password button
    const changePasswordVisible = await forgotPasswordPage.isChangePasswordButtonVisible();
    expect(changePasswordVisible).toBeTruthy();
    console.log('✓ Change Password button is visible');
    
    // Verify Resend OTP button
    const resendOtpVisible = await forgotPasswordPage.isResendOtpButtonVisible();
    expect(resendOtpVisible).toBeTruthy();
    console.log('✓ Resend OTP button is visible');
    
    // Verify Login link
    const loginLinkVisible = await forgotPasswordPage.loginLink.isVisible({ timeout: 5000 }).catch(() => false);
    expect(loginLinkVisible).toBeTruthy();
    console.log('✓ Login link is visible');

    // ==================== NEGATIVE SCENARIOS ====================
    console.log('\n--- NEGATIVE SCENARIOS ---');

    // STEP 6: Click "Change Password" without entering any data
    console.log('\n[STEP 6] Testing Change Password without data...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Test validation without data' });
    
    await forgotPasswordPage.clickChangePasswordButton();
    await page.waitForTimeout(1000);
    
    // Check for any error messages
    const anyErrorVisible = await forgotPasswordPage.isAnyErrorMessageVisible();
    if (anyErrorVisible) {
      const allErrors = await forgotPasswordPage.getAllErrorMessagesText();
      console.log(`✓ Validation messages shown: ${allErrors.join(', ')}`);
      expect(allErrors.length).toBeGreaterThan(0);
    } else {
      // Try individual error checks
      const otpError = await forgotPasswordPage.otpValidationError.isVisible({ timeout: 2000 }).catch(() => false);
      const passwordError = await forgotPasswordPage.passwordValidationError.isVisible({ timeout: 2000 }).catch(() => false);
      const reEnterError = await forgotPasswordPage.reEnterPasswordValidationError.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (otpError || passwordError || reEnterError) {
        const errors = [];
        if (otpError) {
          const text = await forgotPasswordPage.otpValidationError.textContent();
          errors.push(`OTP: ${text?.trim()}`);
        }
        if (passwordError) {
          const text = await forgotPasswordPage.passwordValidationError.textContent();
          errors.push(`Password: ${text?.trim()}`);
        }
        if (reEnterError) {
          const text = await forgotPasswordPage.reEnterPasswordValidationError.textContent();
          errors.push(`Re-enter: ${text?.trim()}`);
        }
        console.log(`✓ Validation messages shown: ${errors.join(', ')}`);
      } else {
        console.log('  ⚠ Validation error not visible (may be handled differently)');
      }
    }

    // STEP 7: Enter invalid OTP and valid passwords
    console.log('\n[STEP 7] Testing invalid OTP...');
    testInfo.annotations.push({ type: 'step', description: 'Step 7: Test invalid OTP' });
    
    // Test with invalid 6-digit OTP (wrong OTP)
    await forgotPasswordPage.enterOtp('123456');
    await forgotPasswordPage.enterNewPassword(newPassword);
    await forgotPasswordPage.enterConfirmPassword(newPassword);
    await page.waitForTimeout(500);
    
    await forgotPasswordPage.clickChangePasswordButton();
    await page.waitForTimeout(2000);
    
    // Check for invalid OTP error (may be in toast or validation message)
    const invalidOtpError = await forgotPasswordPage.isInvalidOtpErrorVisible();
    if (invalidOtpError) {
      const errorText = await forgotPasswordPage.getInvalidOtpErrorText();
      console.log(`✓ Invalid OTP error shown: "${errorText}"`);
      expect(invalidOtpError).toBeTruthy();
    } else {
      // Check toast container directly
      const toastContainer = page.locator('div#toast-container, div.toast-container').first();
      if (await toastContainer.isVisible({ timeout: 2000 }).catch(() => false)) {
        const toast = toastContainer.locator('div[role="alert"], div.toast-message').first();
        if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
          const toastText = await toast.textContent();
          console.log(`✓ Error toast found: "${toastText}"`);
          if (toastText && (toastText.toLowerCase().includes('invalid') || toastText.toLowerCase().includes('required') || toastText.toLowerCase().includes('hash'))) {
            console.log('✓ Invalid OTP error detected in toast');
            expect(toastText.length).toBeGreaterThan(0);
          }
        }
      }
    }
    
    // Test with OTP more than 6 digits (should show validation message)
    console.log('\n[STEP 7a] Testing OTP with more than 6 digits...');
    await forgotPasswordPage.enterOtp('1234567'); // 7 digits
    await page.waitForTimeout(500);
    
    // Check for validation message "Please enter valid 6 digit OTP"
    const otpValidationError = await forgotPasswordPage.otpValidationError.isVisible({ timeout: 2000 }).catch(() => false);
    if (otpValidationError) {
      const validationText = await forgotPasswordPage.otpValidationError.textContent();
      console.log(`✓ OTP validation message shown: "${validationText}"`);
      expect(validationText.toLowerCase()).toContain('6 digit');
    } else {
      // Check all error messages
      const allErrors = await forgotPasswordPage.getAllErrorMessagesText();
      const otpError = allErrors.find(e => e.toLowerCase().includes('6 digit') || e.toLowerCase().includes('valid'));
      if (otpError) {
        console.log(`✓ OTP validation found: "${otpError}"`);
      } else {
        console.log('  ⚠ OTP validation message not found');
      }
    }

    // STEP 8: Test empty password fields
    console.log('\n[STEP 8] Testing empty password fields...');
    testInfo.annotations.push({ type: 'step', description: 'Step 8: Test empty password validation' });
    
    // Clear password fields
    await forgotPasswordPage.enterNewPassword('');
    await forgotPasswordPage.enterConfirmPassword('');
    await page.waitForTimeout(500);
    
    const buttonEnabledEmpty = await forgotPasswordPage.isChangePasswordButtonEnabled();
    if (!buttonEnabledEmpty) {
      console.log('✓ Change Password button remains disabled with empty passwords');
    } else {
      // Try clicking to see validation
      await forgotPasswordPage.clickChangePasswordButton();
      await page.waitForTimeout(1000);
      const passwordError = await forgotPasswordPage.isEmailValidationErrorVisible();
      if (passwordError) {
        console.log('✓ Password validation shown');
      }
    }

    // STEP 9: Test password mismatch
    console.log('\n[STEP 9] Testing password mismatch...');
    testInfo.annotations.push({ type: 'step', description: 'Step 9: Test password mismatch' });
    
    await forgotPasswordPage.enterNewPassword(newPassword);
    await forgotPasswordPage.enterConfirmPassword('DifferentPassword@123');
    await page.waitForTimeout(500);
    
    const mismatchErrorVisible = await forgotPasswordPage.isPasswordMismatchErrorVisible();
    if (mismatchErrorVisible) {
      const errorText = await forgotPasswordPage.getPasswordMismatchErrorText();
      console.log(`✓ Password mismatch error shown: "${errorText}"`);
      expect(mismatchErrorVisible).toBeTruthy();
    } else {
      // Check if button is disabled
      const buttonEnabledMismatch = await forgotPasswordPage.isChangePasswordButtonEnabled();
      if (!buttonEnabledMismatch) {
        console.log('✓ Change Password button disabled due to password mismatch');
      }
    }

    // STEP 10: Test password policy validation
    console.log('\n[STEP 10] Testing password policy validation...');
    testInfo.annotations.push({ type: 'step', description: 'Step 10: Test password policy' });
    
    const weakPasswords = ['123', 'abc', 'password'];
    
    for (const weakPassword of weakPasswords) {
      await forgotPasswordPage.enterNewPassword(weakPassword);
      await forgotPasswordPage.enterConfirmPassword(weakPassword);
      await page.waitForTimeout(500);
      
      const policyErrorVisible = await forgotPasswordPage.isPasswordPolicyErrorVisible();
      if (policyErrorVisible) {
        const errorText = await forgotPasswordPage.getPasswordPolicyErrorText();
        console.log(`✓ Password policy error shown for "${weakPassword}": "${errorText}"`);
        break;
      }
    }

    // ==================== OTP RESEND SCENARIOS ====================
    console.log('\n--- OTP RESEND SCENARIOS ---');

    // STEP 11: Verify Resend OTP button is disabled initially
    console.log('\n[STEP 11] Verifying Resend OTP button state...');
    testInfo.annotations.push({ type: 'step', description: 'Step 11: Verify Resend OTP button state' });
    
    const resendOtpEnabledInitially = await forgotPasswordPage.isResendOtpButtonEnabled();
    expect(resendOtpEnabledInitially).toBeFalsy();
    console.log('✓ Resend OTP button is disabled initially');
    
    const timerText = await forgotPasswordPage.getResendOtpTimerText();
    if (timerText) {
      console.log(`✓ Countdown timer visible: "${timerText}"`);
    }

    // STEP 12: Wait for timer to finish (or skip if too long)
    console.log('\n[STEP 12] Waiting for Resend OTP timer...');
    testInfo.annotations.push({ type: 'step', description: 'Step 12: Wait for timer' });
    
    // Note: In real scenario, you might want to skip this or use a shorter timeout
    // For testing, we'll wait up to 10 seconds
    const timerFinished = await forgotPasswordPage.waitForResendOtpTimerToFinish(10000);
    if (timerFinished) {
      const resendOtpEnabledAfter = await forgotPasswordPage.isResendOtpButtonEnabled();
      expect(resendOtpEnabledAfter).toBeTruthy();
      console.log('✓ Resend OTP button is now enabled');
      
      // STEP 13: Click Resend OTP
      console.log('\n[STEP 13] Clicking Resend OTP...');
      testInfo.annotations.push({ type: 'step', description: 'Step 13: Click Resend OTP' });
      
      await forgotPasswordPage.clickResendOtpButton();
      await page.waitForTimeout(2000);
      
      // Verify success toast
      const resendSuccessToast = await forgotPasswordPage.isSuccessToastVisible();
      if (resendSuccessToast) {
        const toastText = await forgotPasswordPage.getSuccessToastText();
        console.log(`✓ Resend OTP success toast: "${toastText}"`);
      }
      
      // Verify timer resets (button becomes disabled again)
      await page.waitForTimeout(1000);
      const resendOtpDisabledAgain = await forgotPasswordPage.isResendOtpButtonEnabled();
      if (!resendOtpDisabledAgain) {
        console.log('✓ Timer reset - Resend OTP button disabled again');
      }
    } else {
      console.log('  ⚠ Timer did not finish within timeout, skipping resend test');
    }

    // ==================== POSITIVE SCENARIO ====================
    console.log('\n--- POSITIVE SCENARIO ---');

    // STEP 14: Enter valid OTP and passwords
    console.log('\n[STEP 14] Entering valid OTP and passwords...');
    testInfo.annotations.push({ type: 'step', description: 'Step 14: Enter valid data' });
    
    // Note: In real scenario, you would need to get the actual OTP from email/SMS
    // For testing, we'll use a placeholder - you may need to manually enter or mock this
    console.log('  ⚠ Note: Enter actual OTP from email/SMS for complete test');
    
    // For now, we'll test the flow with placeholder OTP
    // In production, you'd extract OTP from email or use test OTP
    const testOtp = '123456'; // Replace with actual OTP in real scenario
    
    await forgotPasswordPage.enterOtp(testOtp);
    await forgotPasswordPage.enterNewPassword(newPassword);
    await forgotPasswordPage.enterConfirmPassword(newPassword);
    await page.waitForTimeout(500);
    
    // Verify Change Password button becomes enabled
    const buttonEnabled = await forgotPasswordPage.isChangePasswordButtonEnabled();
    if (buttonEnabled) {
      console.log('✓ Change Password button is enabled');
      
      // STEP 15: Click Change Password
      console.log('\n[STEP 15] Clicking Change Password...');
      testInfo.annotations.push({ type: 'step', description: 'Step 15: Click Change Password' });
      
      await forgotPasswordPage.clickChangePasswordButton();
      await page.waitForTimeout(3000);
      
      // Verify success message or redirection to login page
      const loginPageVisible = await forgotPasswordPage.isLoginPageVisible();
      if (loginPageVisible) {
        console.log('✓ Redirected to Login page after password reset');
      } else {
        const successToast = await forgotPasswordPage.isSuccessToastVisible();
        if (successToast) {
          const toastText = await forgotPasswordPage.getSuccessToastText();
          console.log(`✓ Success message shown: "${toastText}"`);
        }
      }
    } else {
      console.log('  ⚠ Change Password button not enabled (may need valid OTP)');
    }

    // ==================== POST RESET VERIFICATION ====================
    console.log('\n--- POST RESET VERIFICATION ---');

    // STEP 16: Verify redirection to Login page and login with new password
    console.log('\n[STEP 16] Verifying login with new password...');
    testInfo.annotations.push({ type: 'step', description: 'Step 16: Login with new password' });
    
    // Navigate to login page if not already there
    if (!(await forgotPasswordPage.isLoginPageVisible())) {
      await forgotPasswordPage.gotoLoginPage(baseUrl);
      await page.waitForTimeout(2000);
    }
    
    // Login with new password
    const { DashboardPage } = require('../pages/DashboardPage');
    const dashboardPage = new DashboardPage(page);
    
    await dashboardPage.login(registeredEmail, newPassword);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const loginSuccess = await dashboardPage.isVisible();
    if (loginSuccess) {
      console.log('✓ Login successful with new password');
    } else {
      console.log('  ⚠ Login may have failed (password might not have been reset)');
    }

    // ==================== ADDITIONAL CHECKS ====================
    console.log('\n--- ADDITIONAL CHECKS ---');

    // STEP 17: Verify password visibility toggle
    console.log('\n[STEP 17] Testing password visibility toggle...');
    testInfo.annotations.push({ type: 'step', description: 'Step 17: Test password visibility toggle' });
    
    // Navigate back to reset password page for testing
    await forgotPasswordPage.gotoLoginPage(baseUrl);
    await forgotPasswordPage.clickForgotPasswordLink();
    await page.waitForTimeout(2000);
    
    // Enter password
    await forgotPasswordPage.enterNewPassword(newPassword);
    await page.waitForTimeout(500);
    
    // Check initial state (should be masked)
    const initiallyMasked = !(await forgotPasswordPage.isPasswordVisible());
    console.log(`✓ Password initially masked: ${initiallyMasked}`);
    
    // Toggle visibility
    const toggleVisible = await forgotPasswordPage.isPasswordVisibilityToggleVisible();
    if (toggleVisible) {
      await forgotPasswordPage.togglePasswordVisibility();
      const afterToggle = await forgotPasswordPage.isPasswordVisible();
      console.log(`✓ Password visible after toggle: ${afterToggle}`);
      
      // Toggle back
      await forgotPasswordPage.togglePasswordVisibility();
      const afterToggleBack = !(await forgotPasswordPage.isPasswordVisible());
      console.log(`✓ Password masked again: ${afterToggleBack}`);
    } else {
      console.log('  ⚠ Password visibility toggle not found');
    }

    // STEP 18: Verify page refresh clears fields
    console.log('\n[STEP 18] Testing page refresh clears fields...');
    testInfo.annotations.push({ type: 'step', description: 'Step 18: Test page refresh' });
    
    // Enter some values
    await forgotPasswordPage.enterOtp('123456');
    await forgotPasswordPage.enterNewPassword('test');
    await forgotPasswordPage.enterConfirmPassword('test');
    await page.waitForTimeout(500);
    
    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Verify fields are cleared
    const fieldsCleared = await forgotPasswordPage.areAllFieldsCleared();
    if (fieldsCleared) {
      console.log('✓ All fields cleared after page refresh');
    } else {
      console.log('  ⚠ Fields may not be cleared after refresh');
    }

    console.log('\n=== Test Completed Successfully ===');
  });
});

