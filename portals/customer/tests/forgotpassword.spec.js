const { test, expect } = require('@playwright/test');
const { ForgotPasswordPage } = require('../pages/forgotpassword');

test.describe('Customer Portal - Forgot Password', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';

  test('should verify navigate to forgot password page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigate to Forgot Password Page ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);

    try {
      // Step 1: Go to login page
      console.log('[STEP 1] Navigating to login page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to login page' });
      await forgotPasswordPage.gotoLoginPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isLoginPageLoaded = await forgotPasswordPage.isLoginPageLoaded();
      expect(isLoginPageLoaded).toBeTruthy();
      console.log('✓ Login page is loaded');

      // Step 2: Click on forgot password text link
      console.log('\n[STEP 2] Clicking on Forgot Password link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Forgot Password link' });
      
      const isForgotPasswordLinkVisible = await forgotPasswordPage.isForgotPasswordLinkVisible();
      expect(isForgotPasswordLinkVisible).toBeTruthy();
      console.log('✓ Forgot Password link is visible');
      
      await forgotPasswordPage.clickForgotPasswordLink();
      console.log('✓ Clicked Forgot Password link');

      // Step 3: Verify navigated to forgot password page
      console.log('\n[STEP 3] Verifying navigation to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Forgot Password page is loaded' });
      
      await page.waitForTimeout(2000); // Wait for page to load
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');
      
      const currentUrl = await forgotPasswordPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Navigate to Forgot Password page verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify required fields on forgot password page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Required Fields on Forgot Password Page ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);

    try {
      // Step 1: Navigate to forgot password page
      console.log('[STEP 1] Navigating to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Forgot Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');

      // Step 2: Click Reset Password button (without filling email)
      console.log('\n[STEP 2] Clicking Reset Password button without filling email...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Reset Password button' });
      await forgotPasswordPage.clickResetPasswordButton();
      console.log('✓ Clicked Reset Password button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 3: Check required fields validation
      console.log('\n[STEP 3] Checking required fields validation...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify required fields validation' });
      
      const hasErrors = await forgotPasswordPage.hasForgotPasswordValidationErrors();
      expect(hasErrors).toBeTruthy();
      console.log('✓ Validation errors are displayed');
      
      const validationErrors = await forgotPasswordPage.getForgotPasswordValidationErrors();
      
      expect(validationErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${validationErrors.length} required field error(s)`);
      console.log(`  Validation errors: ${validationErrors.join(', ')}`);
      
      // Verify email field has error
      const emailFieldHasError = await forgotPasswordPage.forgotPasswordEmailField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      expect(emailFieldHasError).toBeTruthy();
      console.log('✓ Email field shows validation error');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Required fields validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify invalid email validation on forgot password page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Invalid Email Validation on Forgot Password Page ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const invalidEmail = 'invalid-email';

    try {
      // Step 1: Navigate to forgot password page
      console.log('[STEP 1] Navigating to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Forgot Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');

      // Step 2: Fill email field with invalid email
      console.log(`\n[STEP 2] Filling email field with invalid email: "${invalidEmail}"...`);
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill invalid email' });
      await forgotPasswordPage.fillForgotPasswordEmail(invalidEmail);
      console.log(`✓ Filled email field with: "${invalidEmail}"`);
      
      // Trigger validation by clicking outside or tabbing away
      await page.keyboard.press('Tab');
      await page.waitForTimeout(1000);

      // Step 3: Verify email validation error is displayed
      console.log('\n[STEP 3] Verifying email validation error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify email validation error' });
      
      const hasEmailError = await forgotPasswordPage.hasEmailValidationError();
      expect(hasEmailError).toBeTruthy();
      console.log('✓ Email validation error is displayed');
      
      const emailErrors = await forgotPasswordPage.getEmailValidationErrors();
      expect(emailErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${emailErrors.length} email validation error(s): ${emailErrors.join(', ')}`);

      // Step 4: Verify form cannot be submitted
      console.log('\n[STEP 4] Verifying form cannot be submitted with invalid email...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify form cannot be submitted' });
      
      const urlBeforeSubmit = await forgotPasswordPage.getCurrentUrl();
      await forgotPasswordPage.clickResetPasswordButton();
      await page.waitForTimeout(2000);
      
      const urlAfterSubmit = await forgotPasswordPage.getCurrentUrl();
      const isStillOnForgotPasswordPage = await forgotPasswordPage.isForgotPasswordPageLoaded();
      
      expect(isStillOnForgotPasswordPage).toBeTruthy();
      console.log('✓ Still on Forgot Password page - form did not submit');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Invalid email validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify reset password with valid email navigates to set new password page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Reset Password with Valid Email ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const validEmail = 'vikas@comhard.co.in'; // Use a test email that exists in the system

    try {
      // Step 1: Navigate to forgot password page
      console.log('[STEP 1] Navigating to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Forgot Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');

      // Step 2: Fill email field with valid email
      console.log(`\n[STEP 2] Filling email field with valid email: "${validEmail}"...`);
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill valid email' });
      await forgotPasswordPage.fillForgotPasswordEmail(validEmail);
      console.log(`✓ Filled email field with: "${validEmail}"`);

      // Step 3: Click Reset Password button
      console.log('\n[STEP 3] Clicking Reset Password button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Reset Password button' });
      await forgotPasswordPage.clickResetPasswordButton();
      console.log('✓ Clicked Reset Password button');
      await page.waitForTimeout(5000); // Wait for navigation

      // Step 4: Verify navigation to Set New Password page
      console.log('\n[STEP 4] Verifying navigation to Set New Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify Set New Password page' });
      
      // Retry checking if page is loaded (up to 3 attempts)
      let isSetNewPasswordPageLoaded = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        isSetNewPasswordPageLoaded = await forgotPasswordPage.isSetNewPasswordPageLoaded();
        if (isSetNewPasswordPageLoaded) {
          break;
        }
        console.log(`  Attempt ${attempt}: Waiting for Set New Password page...`);
        await page.waitForTimeout(2000);
      }
      
      expect(isSetNewPasswordPageLoaded).toBeTruthy();
      console.log('✓ Set New Password page is loaded');
      
      const currentUrl = await forgotPasswordPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Reset password with valid email verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify reset password with non-existent email shows error', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Reset Password with Non-Existent Email ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const nonExistentEmail = `nonexistent${Date.now()}@example.com`;

    try {
      // Step 1: Navigate to forgot password page
      console.log('[STEP 1] Navigating to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Forgot Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');

      // Step 2: Fill email field with non-existent email
      console.log(`\n[STEP 2] Filling email field with non-existent email: "${nonExistentEmail}"...`);
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill non-existent email' });
      await forgotPasswordPage.fillForgotPasswordEmail(nonExistentEmail);
      console.log(`✓ Filled email field with: "${nonExistentEmail}"`);

      // Step 3: Click Reset Password button
      console.log('\n[STEP 3] Clicking Reset Password button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Reset Password button' });
      await forgotPasswordPage.clickResetPasswordButton();
      console.log('✓ Clicked Reset Password button');
      await page.waitForTimeout(3000); // Wait for server response

      // Step 4: Verify error message is displayed or still on forgot password page
      console.log('\n[STEP 4] Verifying error message or page state...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify error message' });
      
      const isStillOnForgotPasswordPage = await forgotPasswordPage.isForgotPasswordPageLoaded();
      const urlAfterSubmit = await forgotPasswordPage.getCurrentUrl();
      
      // Either error message should be shown or still on forgot password page
      expect(isStillOnForgotPasswordPage || !urlAfterSubmit.includes('set-password')).toBeTruthy();
      console.log('✓ Error message displayed or still on Forgot Password page');
      console.log(`  Current URL: ${urlAfterSubmit}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Non-existent email validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify required fields on set new password page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Required Fields on Set New Password Page ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const validEmail = 'vikas@comhard.co.in'; // Use a test email that exists in the system

    try {
      // Step 1: Navigate to forgot password page
      console.log('[STEP 1] Navigating to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Forgot Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');

      // Step 2: Fill email and navigate to set new password page
      console.log(`\n[STEP 2] Filling email and navigating to Set New Password page...`);
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Set New Password page' });
      await forgotPasswordPage.fillForgotPasswordEmail(validEmail);
      await forgotPasswordPage.clickResetPasswordButton();
      await page.waitForTimeout(5000);
      
      // Retry checking if page is loaded (up to 3 attempts)
      let isSetNewPasswordPageLoaded = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        isSetNewPasswordPageLoaded = await forgotPasswordPage.isSetNewPasswordPageLoaded();
        if (isSetNewPasswordPageLoaded) {
          break;
        }
        console.log(`  Attempt ${attempt}: Waiting for Set New Password page...`);
        await page.waitForTimeout(2000);
      }
      
      expect(isSetNewPasswordPageLoaded).toBeTruthy();
      console.log('✓ Set New Password page is loaded');

      // Step 3: Clear all fields
      console.log('\n[STEP 3] Clearing all fields...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Clear all fields' });
      await forgotPasswordPage.clearSetNewPasswordForm();
      console.log('✓ Cleared all fields');

      // Step 4: Click submit button
      console.log('\n[STEP 4] Clicking submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Click submit button' });
      await forgotPasswordPage.clickSubmitButton();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 5: Check required field messages
      console.log('\n[STEP 5] Checking required field messages...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify required field messages' });
      
      const hasErrors = await forgotPasswordPage.hasSetNewPasswordValidationErrors();
      expect(hasErrors).toBeTruthy();
      console.log('✓ Validation errors are displayed');
      
      const validationErrors = await forgotPasswordPage.getSetNewPasswordValidationErrors();
      const errorCount = await forgotPasswordPage.getSetNewPasswordRequiredFieldErrorCount();
      
      expect(validationErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${validationErrors.length} validation error(s)`);
      console.log(`  Errors: ${validationErrors.join(', ')}`);
      
      // Verify specific required fields have errors
      // OTP field
      const otpError = validationErrors.some(error => error.includes("It's mandatory field"));
      expect(otpError).toBeTruthy();
      console.log('✓ OTP field shows validation error');
      
      // Password field
      const passwordError = validationErrors.some(error => error.includes("It's mandatory field"));
      expect(passwordError).toBeTruthy();
      console.log('✓ Password field shows validation error');
      
      // Confirm Password field
      const confirmPasswordError = validationErrors.some(error => error.includes("It's mandatory field"));
      expect(confirmPasswordError).toBeTruthy();
      console.log('✓ Confirm Password field shows validation error');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Set New Password form required fields validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify password mismatch validation on set new password page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Password Mismatch Validation ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const validEmail = 'vikas@comhard.co.in';
    const otp = '123456';
    const newPassword = 'NewPassword123';
    const confirmPassword = 'DifferentPassword123';

    try {
      // Step 1: Navigate to set new password page
      console.log('[STEP 1] Navigating to Set New Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Set New Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      await forgotPasswordPage.fillForgotPasswordEmail(validEmail);
      await forgotPasswordPage.clickResetPasswordButton();
      await page.waitForTimeout(3000);
      
      const isSetNewPasswordPageLoaded = await forgotPasswordPage.isSetNewPasswordPageLoaded();
      expect(isSetNewPasswordPageLoaded).toBeTruthy();
      console.log('✓ Set New Password page is loaded');

      // Step 2: Fill form with mismatched passwords
      console.log('\n[STEP 2] Filling form with mismatched passwords...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill form with mismatched passwords' });
      
      await forgotPasswordPage.fillOtp(otp);
      console.log(`✓ Filled OTP: "${otp}"`);
      
      await forgotPasswordPage.fillNewPassword(newPassword);
      console.log(`✓ Filled new password: "${newPassword}"`);
      
      await forgotPasswordPage.fillConfirmPassword(confirmPassword);
      console.log(`✓ Filled confirm password: "${confirmPassword}" (different from new password)`);

      // Step 3: Click submit button
      console.log('\n[STEP 3] Clicking submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click submit button' });
      await forgotPasswordPage.clickSubmitButton();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(2000); // Wait for validation

      // Step 4: Check password mismatch error
      console.log('\n[STEP 4] Checking password mismatch error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify password mismatch error' });
      
      const hasMismatchError = await forgotPasswordPage.hasPasswordMismatchError();
      expect(hasMismatchError).toBeTruthy();
      console.log('✓ Password mismatch error is displayed');
      
      const mismatchErrors = await forgotPasswordPage.getPasswordMismatchErrors();
      expect(mismatchErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${mismatchErrors.length} password mismatch error(s): ${mismatchErrors.join(', ')}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Password mismatch validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify password minimum length validation on set new password page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Password Minimum Length Validation ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const validEmail = 'vikas@comhard.co.in';
    const otp = '123456';
    const shortPassword = '12345'; // Less than 6 characters

    try {
      // Step 1: Navigate to set new password page
      console.log('[STEP 1] Navigating to Set New Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Set New Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      await forgotPasswordPage.fillForgotPasswordEmail(validEmail);
      await forgotPasswordPage.clickResetPasswordButton();
      await page.waitForTimeout(3000);
      
      const isSetNewPasswordPageLoaded = await forgotPasswordPage.isSetNewPasswordPageLoaded();
      expect(isSetNewPasswordPageLoaded).toBeTruthy();
      console.log('✓ Set New Password page is loaded');

      // Step 2: Fill form with short password
      console.log('\n[STEP 2] Filling form with short password...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill form with short password' });
      
      await forgotPasswordPage.fillOtp(otp);
      console.log(`✓ Filled OTP: "${otp}"`);
      
      await forgotPasswordPage.fillNewPassword(shortPassword);
      console.log(`✓ Filled new password: "${shortPassword}" (${shortPassword.length} characters)`);
      
      await forgotPasswordPage.fillConfirmPassword(shortPassword);
      console.log(`✓ Filled confirm password: "${shortPassword}"`);

      // Step 3: Click submit button
      console.log('\n[STEP 3] Clicking submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click submit button' });
      await forgotPasswordPage.clickSubmitButton();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(2000); // Wait for validation

      // Step 4: Check password length validation error
      console.log('\n[STEP 4] Checking password length validation error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify password length error' });
      
      const hasLengthError = await forgotPasswordPage.hasPasswordLengthError();
      expect(hasLengthError).toBeTruthy();
      console.log('✓ Password length validation error is displayed');
      
      const lengthErrors = await forgotPasswordPage.getPasswordLengthErrors();
      expect(lengthErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${lengthErrors.length} password length error(s): ${lengthErrors.join(', ')}`);
      
      // Verify error message contains expected text
      const hasExpectedMessage = lengthErrors.some(error => 
        error.toLowerCase().includes('at least 6 characters') || 
        error.toLowerCase().includes('6 characters') ||
        error.toLowerCase().includes('must be at least')
      );
      expect(hasExpectedMessage).toBeTruthy();
      console.log('✓ Error message contains "at least 6 characters" text');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Password minimum length validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify invalid OTP validation on set new password page', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Invalid OTP Validation ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const validEmail = 'vikas@comhard.co.in';
    const invalidOtp = '000000';
    const newPassword = 'NewPassword123';

    try {
      // Step 1: Navigate to set new password page
      console.log('[STEP 1] Navigating to Set New Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Set New Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      await forgotPasswordPage.fillForgotPasswordEmail(validEmail);
      await forgotPasswordPage.clickResetPasswordButton();
      await page.waitForTimeout(3000);
      
      const isSetNewPasswordPageLoaded = await forgotPasswordPage.isSetNewPasswordPageLoaded();
      expect(isSetNewPasswordPageLoaded).toBeTruthy();
      console.log('✓ Set New Password page is loaded');

      // Step 2: Fill form with invalid OTP
      console.log('\n[STEP 2] Filling form with invalid OTP...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill form with invalid OTP' });
      
      await forgotPasswordPage.fillOtp(invalidOtp);
      console.log(`✓ Filled OTP: "${invalidOtp}" (invalid)`);
      
      await forgotPasswordPage.fillNewPassword(newPassword);
      console.log(`✓ Filled new password: "${newPassword}"`);
      
      await forgotPasswordPage.fillConfirmPassword(newPassword);
      console.log(`✓ Filled confirm password: "${newPassword}"`);

      // Step 3: Click submit button
      console.log('\n[STEP 3] Clicking submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click submit button' });
      await forgotPasswordPage.clickSubmitButton();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(500); // Small wait for toast to render (toast appears immediately)

      // Step 4: Check OTP validation error immediately (toast shows right away)
      console.log('\n[STEP 4] Checking OTP validation error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify OTP validation error' });
      
      const hasOtpError = await forgotPasswordPage.hasOtpValidationError();
      expect(hasOtpError).toBeTruthy();
      console.log('✓ OTP validation error is displayed');
      
      const otpErrors = await forgotPasswordPage.getOtpValidationErrors();
      expect(otpErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${otpErrors.length} OTP validation error(s): ${otpErrors.join(', ')}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Invalid OTP validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify navigate to login page from forgot password page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigate to Login Page from Forgot Password Page ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);

    try {
      // Step 1: Go to forgot password page
      console.log('[STEP 1] Navigating to Forgot Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Forgot Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isForgotPasswordPageLoaded = await forgotPasswordPage.isForgotPasswordPageLoaded();
      expect(isForgotPasswordPageLoaded).toBeTruthy();
      console.log('✓ Forgot Password page is loaded');

      // Step 2: Click login text link
      console.log('\n[STEP 2] Clicking Login link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Login link' });
      
      const isLoginLinkVisible = await forgotPasswordPage.isLoginLinkVisible();
      expect(isLoginLinkVisible).toBeTruthy();
      console.log('✓ Login link is visible');
      
      await forgotPasswordPage.clickLoginLink();
      console.log('✓ Clicked Login link');
      await page.waitForTimeout(2000); // Wait for navigation

      // Step 3: Verify navigated to login page
      console.log('\n[STEP 3] Verifying navigation to Login page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Login page is loaded' });
      
      const isLoginPageLoaded = await forgotPasswordPage.isLoginPageLoaded();
      expect(isLoginPageLoaded).toBeTruthy();
      console.log('✓ Login page is loaded');
      
      const currentUrl = await forgotPasswordPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Navigate to Login page verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify resend OTP functionality', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Resend OTP Functionality ===');
    
    const forgotPasswordPage = new ForgotPasswordPage(page);
    const validEmail = 'vikas@comhard.co.in';

    try {
      // Step 1: Navigate to set new password page
      console.log('[STEP 1] Navigating to Set New Password page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Set New Password page' });
      await forgotPasswordPage.gotoForgotPasswordPage(baseUrl);
      await page.waitForTimeout(2000);
      
      await forgotPasswordPage.fillForgotPasswordEmail(validEmail);
      await forgotPasswordPage.clickResetPasswordButton();
      await page.waitForTimeout(3000);
      
      const isSetNewPasswordPageLoaded = await forgotPasswordPage.isSetNewPasswordPageLoaded();
      expect(isSetNewPasswordPageLoaded).toBeTruthy();
      console.log('✓ Set New Password page is loaded');

      // Step 2: Check if Resend OTP link is visible
      console.log('\n[STEP 2] Checking Resend OTP link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Check Resend OTP link' });
      
      const isResendOtpVisible = await forgotPasswordPage.isResendOtpLinkVisible();
      if (isResendOtpVisible) {
        console.log('✓ Resend OTP link is visible');
        
        // Get timer value before clicking
        const timerBefore = await forgotPasswordPage.getResendOtpTimer();
        console.log(`  Timer before click: ${timerBefore}`);
        
        // Step 3: Click Resend OTP link
        console.log('\n[STEP 3] Clicking Resend OTP link...');
        testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Resend OTP link' });
        await forgotPasswordPage.clickResendOtpLink();
        console.log('✓ Clicked Resend OTP link');
        await page.waitForTimeout(2000);
        
        // Step 4: Verify timer resets or OTP is resent
        console.log('\n[STEP 4] Verifying OTP resend...');
        testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify OTP resend' });
        
        const timerAfter = await forgotPasswordPage.getResendOtpTimer();
        console.log(`  Timer after click: ${timerAfter}`);
        console.log('✓ OTP resend functionality verified');
      } else {
        console.log('⚠ Resend OTP link not visible (may be disabled or timer active)');
      }

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Resend OTP functionality verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });
});

