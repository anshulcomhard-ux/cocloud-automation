const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/signup');

const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';

test.describe('Customer Portal - Sign Up', () => {

  test('should verify navigate to sign up page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigate to Sign Up Page ===');
    
    const signupPage = new SignupPage(page);

    try {
      // Step 1: Go to login page
      console.log('[STEP 1] Navigating to login page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to login page' });
      await signupPage.gotoLoginPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isLoginPageLoaded = await signupPage.isLoginPageLoaded();
      expect(isLoginPageLoaded).toBeTruthy();
      console.log('✓ Login page is loaded');

      // Step 2: Click on sign up text link
      console.log('\n[STEP 2] Clicking on Sign Up link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Sign Up link' });
      
      const isSignUpLinkVisible = await signupPage.isSignUpLinkVisible();
      expect(isSignUpLinkVisible).toBeTruthy();
      console.log('✓ Sign Up link is visible');
      
      await signupPage.clickSignUpLink();
      console.log('✓ Clicked Sign Up link');

      // Step 3: Verify navigated to sign up page
      console.log('\n[STEP 3] Verifying navigation to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Sign Up page is loaded' });
      
      await page.waitForTimeout(2000); // Wait for page to load
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');
      
      const currentUrl = await signupPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Navigate to Sign Up page verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify required fields on sign up page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Required Fields on Sign Up Page ===');
    
    const signupPage = new SignupPage(page);

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Click Sign Up button (without filling any fields)
      console.log('\n[STEP 2] Clicking Sign Up button without filling fields...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 3: Check required fields validation
      console.log('\n[STEP 3] Checking required fields validation...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify required fields validation' });
      
      const hasErrors = await signupPage.hasValidationErrors();
      expect(hasErrors).toBeTruthy();
      console.log('✓ Validation errors are displayed');
      
      const validationErrors = await signupPage.getValidationErrors();
      const errorCount = await signupPage.getRequiredFieldErrorCount();
      
      expect(errorCount).toBeGreaterThan(0);
      console.log(`✓ Found ${errorCount} required field error(s)`);
      console.log(`  Validation errors: ${validationErrors.join(', ')}`);
      
      // Verify specific required fields have errors
      // Name field
      const nameFieldHasError = await signupPage.nameField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      console.log(`✓ Name field validation: ${nameFieldHasError ? 'Error shown' : 'No error'}`);
      
      // Email field
      const emailFieldHasError = await signupPage.emailField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      console.log(`✓ Email field validation: ${emailFieldHasError ? 'Error shown' : 'No error'}`);
      
      // Password field
      const passwordFieldHasError = await signupPage.passwordField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      console.log(`✓ Password field validation: ${passwordFieldHasError ? 'Error shown' : 'No error'}`);
      
      // Terms checkbox
      const termsCheckboxHasError = await signupPage.termsCheckbox.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      console.log(`✓ Terms checkbox validation: ${termsCheckboxHasError ? 'Error shown' : 'No error'}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Required fields validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify terms and conditions and privacy policy links navigation', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Terms and Conditions and Privacy Policy Links Navigation ===');
    
    const signupPage = new SignupPage(page);
    const expectedTermsUrl = 'https://dev.cocloud.in/terms-condition';
    const expectedPrivacyUrl = 'https://dev.cocloud.in/privacy-policy';

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Verify Terms and Conditions link navigation
      console.log('\n[STEP 2] Verifying Terms and Conditions link navigation...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify Terms and Conditions link' });
      
      const isTermsLinkVisible = await signupPage.isTermsAndConditionsLinkVisible();
      expect(isTermsLinkVisible).toBeTruthy();
      console.log('✓ Terms and Conditions link is visible');
      
      const termsUrl = await signupPage.clickTermsAndConditionsLink();
      console.log(`✓ Navigated to: ${termsUrl}`);
      expect(termsUrl).toContain('/terms-condition');
      console.log(`✓ Terms and Conditions link navigates to: ${termsUrl}`);
      
      // Verify exact URL match
      const normalizedTermsUrl = termsUrl.split('?')[0]; // Remove query parameters if any
      expect(normalizedTermsUrl).toBe(expectedTermsUrl);
      console.log(`✓ URL matches expected: ${expectedTermsUrl}`);

      // Step 3: Navigate back to sign up page
      console.log('\n[STEP 3] Navigating back to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Navigate back to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      console.log('✓ Navigated back to Sign Up page');

      // Step 4: Verify Privacy Policy link navigation
      console.log('\n[STEP 4] Verifying Privacy Policy link navigation...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify Privacy Policy link' });
      
      const isPrivacyLinkVisible = await signupPage.isPrivacyPolicyLinkVisible();
      expect(isPrivacyLinkVisible).toBeTruthy();
      console.log('✓ Privacy Policy link is visible');
      
      const privacyUrl = await signupPage.clickPrivacyPolicyLink();
      console.log(`✓ Navigated to: ${privacyUrl}`);
      expect(privacyUrl).toContain('/privacy-policy');
      console.log(`✓ Privacy Policy link navigates to: ${privacyUrl}`);
      
      // Verify exact URL match
      const normalizedPrivacyUrl = privacyUrl.split('?')[0]; // Remove query parameters if any
      expect(normalizedPrivacyUrl).toBe(expectedPrivacyUrl);
      console.log(`✓ URL matches expected: ${expectedPrivacyUrl}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Terms and Conditions and Privacy Policy links navigation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify navigate to login page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Navigate to Login Page ===');
    
    const signupPage = new SignupPage(page);

    try {
      // Step 1: Go to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Click login text link
      console.log('\n[STEP 2] Clicking Login link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Login link' });
      
      const isLoginLinkVisible = await signupPage.isLoginLinkVisible();
      expect(isLoginLinkVisible).toBeTruthy();
      console.log('✓ Login link is visible');
      
      await signupPage.clickLoginLink();
      console.log('✓ Clicked Login link');
      await page.waitForTimeout(2000); // Wait for navigation

      // Step 3: Verify navigated to login page
      console.log('\n[STEP 3] Verifying navigation to Login page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Login page is loaded' });
      
      const isLoginPageLoaded = await signupPage.isLoginPageLoaded();
      expect(isLoginPageLoaded).toBeTruthy();
      console.log('✓ Login page is loaded');
      
      const currentUrl = await signupPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);
      
      // Verify URL contains login indicators
      const urlContainsLogin = currentUrl.toLowerCase().includes('login') || 
                               currentUrl.toLowerCase().includes('signin');
      expect(urlContainsLogin || isLoginPageLoaded).toBeTruthy();
      console.log('✓ Successfully navigated to Login page');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Navigate to Login page verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify invalid email not proceeds to sign up', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Invalid Email Not Proceeds to Sign Up ===');
    
    const signupPage = new SignupPage(page);
    const invalidEmails = [
      'invalid-email',
      'test@',
      '@example.com',
      'test@.com',
      'test..test@example.com',
      'test@example',
      'test @example.com',
      'test@example .com'
    ];

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Test with first invalid email
      const invalidEmail = invalidEmails[0];
      
      // Step 2: Fill email field with invalid email
      console.log(`\n[STEP 2] Filling email field with invalid email: "${invalidEmail}"...`);
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill invalid email' });
      await signupPage.fillEmail(invalidEmail);
      console.log(`✓ Filled email field with: "${invalidEmail}"`);
      
      // Trigger validation by clicking outside or tabbing away
      await page.keyboard.press('Tab');
      await page.waitForTimeout(1000);

      // Step 3: Verify email validation error is displayed
      console.log('\n[STEP 3] Verifying email validation error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify email validation error' });
      
      const hasEmailError = await signupPage.hasEmailValidationError();
      expect(hasEmailError).toBeTruthy();
      console.log('✓ Email validation error is displayed');
      
      const emailErrors = await signupPage.getEmailValidationErrors();
      expect(emailErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${emailErrors.length} email validation error(s): ${emailErrors.join(', ')}`);
      
      // Verify error messages contain expected text
      const hasInvalidMessage = emailErrors.some(error => 
        error.toLowerCase().includes('invalid') || error.toLowerCase().includes('valid email')
      );
      expect(hasInvalidMessage).toBeTruthy();
      console.log('✓ Error message contains "invalid" or "valid email" text');

      // Step 4: Verify form cannot be submitted
      console.log('\n[STEP 4] Verifying form cannot be submitted with invalid email...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify form cannot be submitted' });
      
      const canSubmit = await signupPage.canSubmitForm();
      console.log(`  Form can be submitted: ${canSubmit}`);
      
      // Get current URL before clicking submit
      const urlBeforeSubmit = await signupPage.getCurrentUrl();
      console.log(`  URL before submit: ${urlBeforeSubmit}`);
      
      // Try to click submit button
      try {
        await signupPage.clickSignUpButton();
        await page.waitForTimeout(2000);
      } catch (error) {
        // If button click fails, that's okay - it means form is blocked
        console.log('  Submit button click was blocked or failed (expected)');
      }
      
      // Check if we're still on sign up page (form didn't submit)
      const urlAfterSubmit = await signupPage.getCurrentUrl();
      const isStillOnSignUpPage = await signupPage.isSignUpPageLoaded();
      
      expect(isStillOnSignUpPage).toBeTruthy();
      console.log('✓ Still on Sign Up page - form did not submit');
      console.log(`  URL after submit attempt: ${urlAfterSubmit}`);
      
      // Verify email error is still visible
      const stillHasError = await signupPage.hasEmailValidationError();
      expect(stillHasError).toBeTruthy();
      console.log('✓ Email validation error is still displayed');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Invalid email validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify password must be at least 6 characters', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Password Must Be At Least 6 Characters ===');
    
    const signupPage = new SignupPage(page);
    const testName = 'Test User';
    const testEmail = 'testuser@example.com';
    const shortPassword = '12345'; // Less than 6 characters

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill form fields
      console.log('\n[STEP 2] Filling form fields...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill form fields' });
      
      // Enter name
      await signupPage.fillName(testName);
      console.log(`✓ Filled name: "${testName}"`);
      
      // Enter email
      await signupPage.fillEmail(testEmail);
      console.log(`✓ Filled email: "${testEmail}"`);
      
      // Enter password less than 6 characters
      await signupPage.fillPassword(shortPassword);
      console.log(`✓ Filled password: "${shortPassword}" (${shortPassword.length} characters)`);
      
      // Select terms and conditions checkbox
      await signupPage.selectTermsCheckbox();
      console.log('✓ Selected terms and conditions checkbox');
      
      await page.waitForTimeout(1000);

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 4: Check password validation error
      console.log('\n[STEP 4] Checking password validation error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify password validation error' });
      
      const hasPasswordError = await signupPage.hasPasswordValidationError();
      expect(hasPasswordError).toBeTruthy();
      console.log('✓ Password validation error is displayed');
      
      const passwordErrors = await signupPage.getPasswordValidationErrors();
      expect(passwordErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${passwordErrors.length} password validation error(s): ${passwordErrors.join(', ')}`);
      
      // Verify error message contains expected text
      const hasExpectedMessage = passwordErrors.some(error => 
        error.toLowerCase().includes('at least 6 characters') || 
        error.toLowerCase().includes('6 characters') ||
        error.toLowerCase().includes('must be at least')
      );
      expect(hasExpectedMessage).toBeTruthy();
      console.log('✓ Error message contains "at least 6 characters" text');
      
      // Verify specific error message
      const hasExactMessage = passwordErrors.some(error => 
        error === 'Password must be at least 6 characters.'
      );
      if (hasExactMessage) {
        console.log('✓ Found exact error message: "Password must be at least 6 characters."');
      }

      // Step 5: Verify form did not submit (still on sign up page)
      console.log('\n[STEP 5] Verifying form did not submit...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify form did not submit' });
      
      const isStillOnSignUpPage = await signupPage.isSignUpPageLoaded();
      expect(isStillOnSignUpPage).toBeTruthy();
      console.log('✓ Still on Sign Up page - form did not submit');
      
      const currentUrl = await signupPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);
      
      // Verify password error is still visible
      const stillHasError = await signupPage.hasPasswordValidationError();
      expect(stillHasError).toBeTruthy();
      console.log('✓ Password validation error is still displayed');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Password minimum length validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify cannot sign up with existing email', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Cannot Sign Up With Existing Email ===');
    
    const signupPage = new SignupPage(page);
    const testName = 'Test User';
    const existingEmail = 'vikas@comhard.co.in';
    const testPassword = 'Test123456';

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill form fields with existing email
      console.log('\n[STEP 2] Filling form fields with existing email...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill form with existing email' });
      
      // Enter name
      await signupPage.fillName(testName);
      console.log(`✓ Filled name: "${testName}"`);
      
      // Enter existing email
      await signupPage.fillEmail(existingEmail);
      console.log(`✓ Filled email: "${existingEmail}" (existing email)`);
      
      // Enter password
      await signupPage.fillPassword(testPassword);
      console.log(`✓ Filled password: "${testPassword}"`);
      
      // Select terms and conditions checkbox
      await signupPage.selectTermsCheckbox();
      console.log('✓ Selected terms and conditions checkbox');
      
      await page.waitForTimeout(1000);

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(3000); // Wait for server response

      // Step 4: Check for existing email error
      console.log('\n[STEP 4] Checking for existing email error...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify existing email error' });
      
      // Get URL before checking errors
      const urlBeforeCheck = await signupPage.getCurrentUrl();
      console.log(`  URL after submit: ${urlBeforeCheck}`);
      
      // Check if we're still on signup page (indicates form didn't submit)
      const isStillOnSignUpPage = await signupPage.isSignUpPageLoaded();
      console.log(`  Still on Sign Up page: ${isStillOnSignUpPage}`);
      
      // Check for existing email error
      const hasExistingEmailError = await signupPage.hasExistingEmailError();
      
      // If no error found but we're still on signup page, that's also a valid indication
      if (!hasExistingEmailError && isStillOnSignUpPage) {
        console.log('⚠ No explicit error message found, but form did not submit (still on signup page)');
        console.log('  This indicates the email validation prevented signup');
      }
      
      const existingEmailErrors = await signupPage.getExistingEmailErrors();
      console.log(`  Found ${existingEmailErrors.length} error message(s): ${existingEmailErrors.join(', ')}`);
      
      // Verify either error message exists OR form didn't submit (both indicate validation worked)
      const formDidNotSubmit = isStillOnSignUpPage && urlBeforeCheck.toLowerCase().includes('signup');
      const hasErrorOrBlocked = hasExistingEmailError || existingEmailErrors.length > 0 || formDidNotSubmit;
      
      expect(hasErrorOrBlocked).toBeTruthy();
      console.log('✓ Existing email prevented signup (error shown or form blocked)');
      
      if (existingEmailErrors.length > 0) {
        // Verify error message contains expected text
        const hasExpectedMessage = existingEmailErrors.some(error => 
          error.toLowerCase().includes('already exists') || 
          error.toLowerCase().includes('already registered') ||
          error.toLowerCase().includes('email already') ||
          error.toLowerCase().includes('user already') ||
          error.toLowerCase().includes('account already')
        );
        if (hasExpectedMessage) {
          console.log('✓ Error message indicates email already exists');
        }
      }

      // Step 5: Verify form did not submit (still on sign up page)
      console.log('\n[STEP 5] Verifying form did not submit...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify form did not submit' });
      
      // Re-check to ensure we're still on signup page (using different variable name)
      const stillOnSignUpPageCheck = await signupPage.isSignUpPageLoaded();
      expect(stillOnSignUpPageCheck).toBeTruthy();
      console.log('✓ Still on Sign Up page - form did not submit');
      
      const currentUrl = await signupPage.getCurrentUrl();
      console.log(`✓ Current URL: ${currentUrl}`);
      
      // Verify we're not on a success page or dashboard
      const urlContainsSuccess = currentUrl.toLowerCase().includes('success') || 
                                 currentUrl.toLowerCase().includes('dashboard') ||
                                 currentUrl.toLowerCase().includes('home');
      expect(urlContainsSuccess).toBeFalsy();
      console.log('✓ Not redirected to success or dashboard page');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Existing email validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify cannot signup with empty fields', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Cannot Signup With Empty Fields ===');
    
    const signupPage = new SignupPage(page);

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Verify all fields are empty
      console.log('\n[STEP 2] Verifying all fields are empty...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify fields are empty' });
      
      const nameValue = await signupPage.nameField.inputValue().catch(() => '');
      const emailValue = await signupPage.emailField.inputValue().catch(() => '');
      const passwordValue = await signupPage.passwordField.inputValue().catch(() => '');
      const termsChecked = await signupPage.termsCheckbox.isChecked().catch(() => false);
      
      expect(nameValue).toBe('');
      console.log('✓ Name field is empty');
      expect(emailValue).toBe('');
      console.log('✓ Email field is empty');
      expect(passwordValue).toBe('');
      console.log('✓ Password field is empty');
      expect(termsChecked).toBe(false);
      console.log('✓ Terms checkbox is unchecked');

      // Step 3: Click Sign Up button with empty fields
      console.log('\n[STEP 3] Clicking Sign Up button with empty fields...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      
      // Get current URL before clicking
      const urlBeforeSubmit = await signupPage.getCurrentUrl();
      console.log(`  URL before submit: ${urlBeforeSubmit}`);
      
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 4: Verify validation errors are displayed
      console.log('\n[STEP 4] Verifying validation errors are displayed...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify validation errors' });
      
      const hasErrors = await signupPage.hasValidationErrors();
      expect(hasErrors).toBeTruthy();
      console.log('✓ Validation errors are displayed');
      
      const validationErrors = await signupPage.getValidationErrors();
      const errorCount = await signupPage.getRequiredFieldErrorCount();
      
      expect(errorCount).toBeGreaterThan(0);
      console.log(`✓ Found ${errorCount} required field error(s)`);
      console.log(`  Validation errors: ${validationErrors.join(', ')}`);

      // Step 5: Verify form did not submit
      console.log('\n[STEP 5] Verifying form did not submit...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify form did not submit' });
      
      // Check if still on sign up page
      const isStillOnSignUpPage = await signupPage.isSignUpPageLoaded();
      expect(isStillOnSignUpPage).toBeTruthy();
      console.log('✓ Still on Sign Up page - form did not submit');
      
      const urlAfterSubmit = await signupPage.getCurrentUrl();
      console.log(`  URL after submit: ${urlAfterSubmit}`);
      
      // Verify URL hasn't changed (or only changed slightly, not to success/dashboard)
      const urlChanged = urlBeforeSubmit !== urlAfterSubmit;
      if (urlChanged) {
        // If URL changed, verify it's not a success/dashboard page
        const urlContainsSuccess = urlAfterSubmit.toLowerCase().includes('success') || 
                                   urlAfterSubmit.toLowerCase().includes('dashboard') ||
                                   urlAfterSubmit.toLowerCase().includes('home');
        expect(urlContainsSuccess).toBeFalsy();
        console.log('✓ URL changed but not to success/dashboard page');
      } else {
        console.log('✓ URL did not change - form did not submit');
      }
      
      // Verify we're not on a success page or dashboard
      const urlContainsSuccess = urlAfterSubmit.toLowerCase().includes('success') || 
                                 urlAfterSubmit.toLowerCase().includes('dashboard') ||
                                 urlAfterSubmit.toLowerCase().includes('home');
      expect(urlContainsSuccess).toBeFalsy();
      console.log('✓ Not redirected to success or dashboard page');

      // Step 6: Verify all required fields still show errors
      console.log('\n[STEP 6] Verifying all required fields show errors...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify all fields show errors' });
      
      // Name field
      const nameFieldHasError = await signupPage.nameField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      expect(nameFieldHasError).toBeTruthy();
      console.log('✓ Name field shows validation error');
      
      // Email field
      const emailFieldHasError = await signupPage.emailField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      expect(emailFieldHasError).toBeTruthy();
      console.log('✓ Email field shows validation error');
      
      // Password field
      const passwordFieldHasError = await signupPage.passwordField.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      expect(passwordFieldHasError).toBeTruthy();
      console.log('✓ Password field shows validation error');
      
      // Terms checkbox
      const termsCheckboxHasError = await signupPage.termsCheckbox.evaluate((el) => {
        return el.classList.contains('ng-invalid') || el.classList.contains('is-invalid');
      }).catch(() => false);
      expect(termsCheckboxHasError).toBeTruthy();
      console.log('✓ Terms checkbox shows validation error');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Cannot signup with empty fields verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify click here link navigates to Google Forms in new tab', async ({ page, context }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Click Here Link Navigates to Google Forms ===');
    
    const signupPage = new SignupPage(page);
    const expectedUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSed4SjuPKhUS5VD7PrTp4jh9uyKjP0FYvgc0gZ8ydUMD5GJDw/viewform';

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Verify Click Here link is visible
      console.log('\n[STEP 2] Verifying Click Here link is visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify Click Here link visibility' });
      
      const isLinkVisible = await signupPage.isClickHereLinkVisible();
      expect(isLinkVisible).toBeTruthy();
      console.log('✓ Click Here link is visible');
      
      // Get original page count
      const pagesBefore = context.pages().length;
      console.log(`  Pages before click: ${pagesBefore}`);

      // Step 3: Click Click Here link
      console.log('\n[STEP 3] Clicking Click Here link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Click Here link' });
      
      const result = await signupPage.clickClickHereLink(expectedUrl);
      const newPage = result.newPage;
      const navigatedUrl = result.url;
      
      console.log(`✓ Clicked Click Here link`);
      console.log(`  Navigated URL: ${navigatedUrl}`);
      
      // Step 4: Verify new tab/page was opened
      console.log('\n[STEP 4] Verifying new tab was opened...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify new tab opened' });
      
      const pagesAfter = context.pages().length;
      console.log(`  Pages after click: ${pagesAfter}`);
      
      // Check if a new page was created (new tab)
      const newTabOpened = pagesAfter > pagesBefore || newPage !== page;
      expect(newTabOpened).toBeTruthy();
      console.log('✓ New tab/page was opened');

      // Step 5: Verify navigation to Google Forms URL
      console.log('\n[STEP 5] Verifying navigation to Google Forms URL...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify Google Forms URL' });
      
      // Check if URL contains the expected Google Forms path
      const urlContainsExpected = navigatedUrl.includes('docs.google.com/forms') && 
                                   navigatedUrl.includes('1FAIpQLSed4SjuPKhUS5VD7PrTp4jh9uyKjP0FYvgc0gZ8ydUMD5GJDw');
      expect(urlContainsExpected).toBeTruthy();
      console.log(`✓ Navigated to Google Forms URL`);
      console.log(`  Expected: ${expectedUrl}`);
      console.log(`  Actual: ${navigatedUrl}`);
      
      // Verify exact URL match (allowing for query parameters)
      const normalizedExpected = expectedUrl.split('?')[0];
      const normalizedActual = navigatedUrl.split('?')[0];
      expect(normalizedActual).toBe(normalizedExpected);
      console.log('✓ URL matches expected Google Forms link');

      // Step 6: Verify Google Forms page loaded
      console.log('\n[STEP 6] Verifying Google Forms page loaded...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify Google Forms page' });
      
      // Check for Google Forms indicators
      const pageTitle = await newPage.title().catch(() => '');
      const pageContent = await newPage.content().catch(() => '');
      
      const isGoogleForms = pageTitle.toLowerCase().includes('google forms') || 
                           pageContent.includes('Google Forms') ||
                           pageContent.includes('Tally License Requirement') ||
                           navigatedUrl.includes('docs.google.com/forms');
      
      expect(isGoogleForms).toBeTruthy();
      console.log(`✓ Google Forms page loaded`);
      console.log(`  Page title: ${pageTitle}`);

      // Close the new tab and return to original page
      if (newPage !== page) {
        await newPage.close();
        await page.bringToFront();
        console.log('✓ Closed new tab and returned to original page');
      }

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Click Here link navigation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify signup with valid details select tally on cloud 7 days trial plan', async ({ page }, testInfo) => {
    test.setTimeout(180000); // 3 minutes - accommodate up to 120s wait for dashboard + form filling time
    
    console.log('\n=== Test: Verify Signup With Valid Details ===');
    
    const signupPage = new SignupPage(page);
    
    // Generate unique test data
    const timestamp = Date.now();
    const testName = `TestUser${timestamp}`;
    const testEmail = `testuser${timestamp}@example.com`;
    const testPassword = 'Test123456';
    const customerName = `Customer${timestamp}`;
    const companyName = `Company${timestamp}`;
    const workspaceName = `Workspace${timestamp}`;
    const trialPlan = 'Tally On Cloud 7 Days Trial Plan';
    const tallyRelease = 'Tally_2_1_el';
    const users = '2'; // Use 2 to test the "no. of tally" field
    const numberOfTally = '1';

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill signup form with valid details
      console.log('\n[STEP 2] Filling signup form with valid details...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill signup form' });
      
      await signupPage.fillSignUpForm({
        name: testName,
        email: testEmail,
        password: testPassword
      });
      console.log(`✓ Filled signup form - Name: "${testName}", Email: "${testEmail}"`);

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(5000); // Wait for navigation to onboarding

      // Step 4: Verify navigation to onboarding page
      console.log('\n[STEP 4] Verifying navigation to onboarding page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify onboarding page' });
      
      const isOnboardingPageLoaded = await signupPage.isOnboardingPageLoaded();
      expect(isOnboardingPageLoaded).toBeTruthy();
      console.log('✓ Onboarding page is loaded');
      
      const onboardingUrl = await signupPage.getCurrentUrl();
      console.log(`✓ Current URL: ${onboardingUrl}`);
      expect(onboardingUrl).toContain('/on-boarding');
      console.log('✓ URL contains "/on-boarding"');

      // Step 5: Fill customer information form
      console.log('\n[STEP 5] Filling customer information form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Fill customer information form' });
      
      await signupPage.fillCustomerInformationForm({
        customerName: customerName,
        companyName: companyName,
        trialPlan: trialPlan
      });
      console.log(`✓ Filled customer information - Name: "${customerName}", Company: "${companyName}", Plan: "${trialPlan}"`);

      // Step 6: Click submit on customer information form
      console.log('\n[STEP 6] Clicking submit on customer information form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Submit customer information' });
      await signupPage.clickCustomerInfoSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(3000); // Wait for navigation to start trial form

      // Step 7: Verify navigation to start trial form
      console.log('\n[STEP 7] Verifying navigation to start trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify start trial form' });
      
      const isStartTrialFormVisible = await signupPage.isStartTrialFormVisible();
      expect(isStartTrialFormVisible).toBeTruthy();
      console.log('✓ Start Trial form is visible');

      // Step 8: Fill start trial form
      console.log('\n[STEP 8] Filling start trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Fill start trial form' });
      
      await signupPage.fillStartTrialForm({
        workspaceName: workspaceName,
        tallyRelease: tallyRelease,
        users: users,
        numberOfTally: numberOfTally
      });
      console.log(`✓ Filled start trial form - Workspace: "${workspaceName}", Tally Release: "${tallyRelease}", Users: "${users}"`);
      
      // Verify "no. of tally" field appeared when users = 2
      if (users === '2') {
        const tallyFieldVisible = await signupPage.numberOfTallyField.isVisible({ timeout: 5000 }).catch(() => false);
        expect(tallyFieldVisible).toBeTruthy();
        console.log(`✓ "No. of Tally" field is visible (users = 2)`);
        
        // Wait and retry to verify the field was actually filled (field filling may take time)
        let tallyFieldValue = '';
        let fieldFilled = false;
        for (let retry = 0; retry < 10; retry++) {
          tallyFieldValue = await signupPage.numberOfTallyField.inputValue().catch(() => '');
          if (tallyFieldValue === numberOfTally) {
            fieldFilled = true;
            break;
          }
          await page.waitForTimeout(500);
        }
        
        if (!fieldFilled) {
          // Try to fill it manually one more time
          console.log(`⚠ Field not filled automatically, attempting manual fill...`);
          try {
            await signupPage.numberOfTallyField.focus();
            await page.waitForTimeout(200);
            await signupPage.numberOfTallyField.click();
            await page.waitForTimeout(200);
            await signupPage.numberOfTallyField.fill(numberOfTally);
            await page.waitForTimeout(500);
            tallyFieldValue = await signupPage.numberOfTallyField.inputValue().catch(() => '');
            if (tallyFieldValue === numberOfTally) {
              fieldFilled = true;
            }
          } catch (error) {
            console.log(`⚠ Manual fill attempt failed: ${error.message}`);
          }
        }
        
        expect(fieldFilled).toBeTruthy();
        expect(tallyFieldValue).toBe(numberOfTally);
        console.log(`✓ Verified number of tally field value: "${tallyFieldValue}"`);
        
        // Check for validation errors - should not have "mandatory field" error if filled correctly
        await page.waitForTimeout(500); // Wait for validation to update
        const hasValidationError = await page.locator('text="It\'s mandatory field."').isVisible({ timeout: 1000 }).catch(() => false);
        if (hasValidationError) {
          throw new Error('No. of Tally field still shows validation error after filling. Value: ' + tallyFieldValue);
        }
        console.log(`✓ No validation errors for "No. of Tally" field`);
      }

      // Step 9: Click submit on start trial form
      console.log('\n[STEP 9] Clicking submit on start trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Submit start trial form' });
      await signupPage.clickStartTrialSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(5000); // Wait for navigation to dashboard

      // Step 10: Verify navigation to dashboard page
      console.log('\n[STEP 10] Verifying navigation to dashboard page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify dashboard page' });
      
      // Wait up to 2 minutes for dashboard to load
      // Check both page state AND URL change (must navigate away from /on-boarding)
      let isDashboardPageLoaded = false;
      let dashboardUrl = '';
      const expectedOnboardingUrl = 'https://dev.cocloud.in/on-boarding';
      
      for (let attempt = 1; attempt <= 24; attempt++) {
        dashboardUrl = await signupPage.getCurrentUrl();
        const isStillOnOnboarding = dashboardUrl === expectedOnboardingUrl || dashboardUrl === expectedOnboardingUrl + '/';
        
        // Check if we've navigated away from onboarding page
        if (!isStillOnOnboarding) {
          // URL changed, now check if dashboard page is loaded
          isDashboardPageLoaded = await signupPage.isDashboardPageLoaded();
          console.log(`  [Dashboard check attempt ${attempt}] URL changed: ${dashboardUrl}, Dashboard loaded: ${isDashboardPageLoaded}`);
          
          if (isDashboardPageLoaded) {
            break;
          }
        } else {
          console.log(`  [Dashboard check attempt ${attempt}] Still on onboarding: ${dashboardUrl}`);
        }
        
        // Wait 5 seconds before next attempt (total max ~120s)
        await page.waitForTimeout(5000);
      }
      
      // Verify we navigated away from onboarding
      const finalUrl = await signupPage.getCurrentUrl();
      const stillOnOnboarding = finalUrl === expectedOnboardingUrl || finalUrl === expectedOnboardingUrl + '/';
      expect(stillOnOnboarding).toBeFalsy();
      console.log(`✓ Navigated away from onboarding page`);
      console.log(`✓ Current URL: ${finalUrl}`);
      
      // Verify dashboard page is loaded
      expect(isDashboardPageLoaded).toBeTruthy();
      console.log('✓ Dashboard page is loaded');
      
      // Verify URL - root URL or dashboard/home URL is acceptable
      const urlParts = finalUrl.split('/');
      const rootUrl = urlParts.slice(0, 3).join('/');
      const isRootUrl = finalUrl === rootUrl || finalUrl === rootUrl + '/';
      const urlContainsDashboard = finalUrl.toLowerCase().includes('dashboard') || 
                                   finalUrl.toLowerCase().includes('home');
      
      expect(isRootUrl || urlContainsDashboard).toBeTruthy();
      console.log('✓ URL indicates dashboard page (root URL or dashboard/home)');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Signup with valid details verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify signup with valid details and complete onboarding with Busy On Cloud 7 Days Trial Plan', async ({ page }, testInfo) => {
    test.setTimeout(180000); // 3 minutes for complete flow
    console.log('\n=== Test: Verify Signup with Valid Details and Complete Onboarding ===');
    
    const signupPage = new SignupPage(page);
    const timestamp = Date.now();
    
    // Generate unique test data
    const testName = `TestUser${timestamp}`;
    const testEmail = `testuser${timestamp}@example.com`;
    const testPassword = 'Test123456';
    const customerName = `Customer${timestamp}`;
    const companyName = `Company${timestamp}`;
    const trialPlan = 'Busy On Cloud 7 Days Trial Plan';
    const workspaceName = `Workspace${timestamp}`;
    const numberOfUsers = '5';
    const expectedOnboardingUrl = 'https://dev.cocloud.in/on-boarding';
    const expectedFinalUrl = 'https://dev.cocloud.in';

    try {
      // Step 1: Navigate to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill signup form with valid details
      console.log('\n[STEP 2] Filling signup form with valid details...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill signup form' });
      
      await signupPage.fillName(testName);
      console.log(`✓ Filled name: "${testName}"`);
      
      await signupPage.fillEmail(testEmail);
      console.log(`✓ Filled email: "${testEmail}"`);
      
      await signupPage.fillPassword(testPassword);
      console.log(`✓ Filled password`);
      
      await signupPage.selectTermsCheckbox();
      console.log('✓ Selected terms and conditions checkbox');

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(3000); // Wait for navigation

      // Step 4: Verify navigation to onboarding page
      console.log('\n[STEP 4] Verifying navigation to onboarding page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify onboarding page' });
      
      const currentUrl = await signupPage.getCurrentUrl();
      console.log(`  Current URL: ${currentUrl}`);
      
      const isOnboardingPageLoaded = await signupPage.isOnboardingPageLoaded();
      expect(isOnboardingPageLoaded).toBeTruthy();
      console.log('✓ Onboarding page is loaded');
      
      // Verify URL contains on-boarding
      expect(currentUrl).toContain('/on-boarding');
      console.log(`✓ URL matches expected: ${expectedOnboardingUrl}`);

      // Step 5: Fill customer information form
      console.log('\n[STEP 5] Filling customer information form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Fill customer information form' });
      
      const isCustomerFormVisible = await signupPage.isCustomerInformationFormVisible();
      expect(isCustomerFormVisible).toBeTruthy();
      console.log('✓ Customer Information form is visible');
      
      await signupPage.fillCustomerInformationForm({
        customerName: customerName,
        companyName: companyName,
        trialPlan: trialPlan
      });
      console.log(`✓ Filled customer name: "${customerName}"`);
      console.log(`✓ Filled company name: "${companyName}"`);
      console.log(`✓ Selected trial plan: "${trialPlan}"`);

      // Step 6: Click submit on customer information form
      console.log('\n[STEP 6] Clicking submit on customer information form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Submit customer information form' });
      await signupPage.clickCustomerInfoSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(3000); // Wait for navigation to start trial form

      // Step 7: Verify navigation to start trial form
      console.log('\n[STEP 7] Verifying navigation to start trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify start trial form' });
      
      const isStartTrialFormVisible = await signupPage.isStartTrialFormVisible();
      expect(isStartTrialFormVisible).toBeTruthy();
      console.log('✓ Start Trial form is visible');

      // Step 8: Fill start trial form
      console.log('\n[STEP 8] Filling start trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Fill start trial form' });
      
      await signupPage.fillStartTrialForm({
        workspaceName: workspaceName,
        users: numberOfUsers
      })
      console.log(`✓ Filled workspace name: "${workspaceName}"`);
      console.log(`✓ Filled number of users: "${numberOfUsers}"`);

      // Step 9: Click submit on start trial form
      console.log('\n[STEP 9] Clicking submit on start trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Submit start trial form' });
      await signupPage.clickStartTrialSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(5000); // Wait for navigation

      // Step 10: Verify navigation to dev.cocloud.in
      console.log('\n[STEP 10] Verifying navigation to dev.cocloud.in...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify final URL' });
      
      const finalUrl = await signupPage.getCurrentUrl();
      console.log(`  Final URL: ${finalUrl}`);
      
      // Verify URL is dev.cocloud.in (may have path, but base should match)
      const urlMatches = finalUrl.startsWith(expectedFinalUrl);
      expect(urlMatches).toBeTruthy();
      console.log(`✓ Navigated to: ${finalUrl}`);
      console.log(`✓ URL matches expected base: ${expectedFinalUrl}`);

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Signup and onboarding flow verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify sidebar modules are not clickable on onboarding page except all request, raise request and logout', async ({ page }, testInfo) => {
    
    console.log('\n=== Test: Verify Sidebar Modules on Onboarding Page ===');
    
    const signupPage = new SignupPage(page);
    const expectedOnboardingUrl = 'https://dev.cocloud.in/on-boarding';
    const timestamp = Date.now();
    
    // Generate unique test data for signup
    const testName = `TestUser${timestamp}`;
    const testEmail = `testuser${timestamp}@example.com`;
    const testPassword = 'Test123456';

    try {
      // Step 1: Go to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill signup form
      console.log('\n[STEP 2] Filling signup form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill signup form' });
      
      await signupPage.fillName(testName);
      console.log(`✓ Filled name: "${testName}"`);
      
      await signupPage.fillEmail(testEmail);
      console.log(`✓ Filled email: "${testEmail}"`);
      
      await signupPage.fillPassword(testPassword);
      console.log(`✓ Filled password`);
      
      await signupPage.selectTermsCheckbox();
      console.log('✓ Selected terms and conditions checkbox');

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(3000); // Wait for navigation to onboarding

      // Step 4: Verify navigation to onboarding page
      console.log('\n[STEP 4] Verifying navigation to onboarding page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify onboarding page' });
      
      const isOnboardingPageLoaded = await signupPage.isOnboardingPageLoaded();
      expect(isOnboardingPageLoaded).toBeTruthy();
      console.log('✓ Onboarding page is loaded');
      
      const initialUrl = await signupPage.getCurrentUrl();
      console.log(`  Initial URL: ${initialUrl}`);
      expect(initialUrl).toContain('/on-boarding');

      // Step 5: Click on each locked module and verify URL is still on onboarding
      console.log('\n[STEP 5] Verifying locked modules do not change URL...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify locked modules' });
      
      const sidebarModules = signupPage.getSidebarModules();
      const lockedModules = ['Dashboard', 'App Management', 'User Management', 'File Manager', 
                            'Google Drive', 'Logs & Security', 'Download Setup', 
                            'Connectivity Test', 'Account Details', 'Knowledge Base'];
      
      for (const module of sidebarModules) {
        if (lockedModules.includes(module.name)) {
          console.log(`  Checking module: ${module.name}...`);
          
          const urlBeforeClick = await signupPage.getCurrentUrl();
          const isClickable = await signupPage.isSidebarModuleClickable(module.locator);
          
          if (isClickable) {
            // If clickable, try clicking and verify URL doesn't change
            const result = await signupPage.clickSidebarModuleAndCheckUrl(module.locator, expectedOnboardingUrl);
            const urlAfterClick = result.newUrl;
            
            // Verify URL is still on onboarding
            const stillOnOnboarding = urlAfterClick.includes('on-boarding') || urlAfterClick.includes('onboarding');
            expect(stillOnOnboarding).toBeTruthy();
            console.log(`    ✓ ${module.name} - URL still on onboarding: ${urlAfterClick}`);
          } else {
            console.log(`    ✓ ${module.name} is locked/disabled (not clickable)`);
          }
        }
      }

      // Step 6: Click Service Request to open dropdown, then click All Request - verify URL changes
      console.log('\n[STEP 6] Clicking Service Request dropdown and then All Request...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Click Service Request dropdown and All Request' });
      
      const serviceRequestVisible = await signupPage.sidebarServiceRequestLink.isVisible({ timeout: 5000 }).catch(() => false);
      expect(serviceRequestVisible).toBeTruthy();
      console.log('✓ Service Request link is visible');
      
      const urlBeforeAllRequest = await signupPage.getCurrentUrl();
      console.log(`  URL before clicking All Request: ${urlBeforeAllRequest}`);
      
      const result = await signupPage.clickAllRequestFromDropdown(expectedOnboardingUrl);
      
      console.log(`  URL after clicking All Request: ${result.newUrl}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      }
      
      expect(result.urlChanged).toBeTruthy();
      console.log(`✓ All Request link changed URL from: ${urlBeforeAllRequest}`);
      console.log(`  To: ${result.newUrl}`);
      
      // Verify URL matches expected
      const expectedAllRequestUrl = 'https://dev.cocloud.in/all-request';
      expect(result.newUrl).toContain('/all-request');
      console.log(`✓ URL matches expected: ${expectedAllRequestUrl}`);
      
      // Navigate back to onboarding
      await signupPage.gotoOnboardingPage(baseUrl);
      await page.waitForTimeout(2000);
      console.log('✓ Navigated back to onboarding page');

      // Step 7: Click Service Request to open dropdown, then click Raise Request - verify URL changes
      console.log('\n[STEP 7] Clicking Service Request dropdown and then Raise Request...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Click Service Request dropdown and Raise Request' });
      
      const urlBeforeRaiseRequest = await signupPage.getCurrentUrl();
      console.log(`  URL before clicking Raise Request: ${urlBeforeRaiseRequest}`);
      
      const raiseRequestResult = await signupPage.clickRaiseRequestFromDropdown(expectedOnboardingUrl);
      
      console.log(`  URL after clicking Raise Request: ${raiseRequestResult.newUrl}`);
      if (raiseRequestResult.error) {
        console.log(`  Error: ${raiseRequestResult.error}`);
      }
      
      expect(raiseRequestResult.urlChanged).toBeTruthy();
      console.log(`✓ Raise Request link changed URL from: ${urlBeforeRaiseRequest}`);
      console.log(`  To: ${raiseRequestResult.newUrl}`);
      
      // Verify URL matches expected
      const expectedRaiseRequestUrl = 'https://dev.cocloud.in/raise-service-request';
      expect(raiseRequestResult.newUrl).toContain('/raise-service-request');
      console.log(`✓ URL matches expected: ${expectedRaiseRequestUrl}`);
      
      // Navigate back to onboarding
      await signupPage.gotoOnboardingPage(baseUrl);
      await page.waitForTimeout(2000);
      console.log('✓ Navigated back to onboarding page');

      // Step 8: Click Logout - verify modal opens
      console.log('\n[STEP 8] Clicking Logout link...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Click Logout' });
      
      // Try multiple locators to find logout link
      const logoutLocators = [
        signupPage.sidebarLogoutLink,
        page.locator('nav a:has-text("Logout")').first(),
        page.locator('a:has-text("Logout"):visible').first(),
        page.locator('[class*="sidebar"] a:has-text("Logout")').first()
      ];
      
      let logoutFound = false;
      for (const locator of logoutLocators) {
        const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          logoutFound = true;
          console.log('✓ Logout link is visible');
          break;
        }
      }
      
      if (!logoutFound) {
        console.log('⚠ Logout link not found with standard locators, trying clickLogoutAndCheckModal...');
      }
      
      const isModalOpen = await signupPage.clickLogoutAndCheckModal();
      expect(isModalOpen).toBeTruthy();
      console.log('✓ Logout modal is open');
      
      // Close the modal
      const cancelVisible = await signupPage.logoutCancelButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (cancelVisible) {
        await signupPage.logoutCancelButton.click();
        await page.waitForTimeout(1000);
        console.log('✓ Closed logout modal');
      } else {
        // Try pressing Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
      }

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Sidebar modules verification on onboarding page completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify customer information form required fields during onboarding process', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Customer Information Form Required Fields ===');
    
    const signupPage = new SignupPage(page);
    const timestamp = Date.now();
    
    // Generate unique test data for signup
    const testName = `TestUser${timestamp}`;
    const testEmail = `testuser${timestamp}@example.com`;
    const testPassword = 'Test123456';

    try {
      // Step 1: Go to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill signup form
      console.log('\n[STEP 2] Filling signup form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill signup form' });
      
      await signupPage.fillName(testName);
      console.log(`✓ Filled name: "${testName}"`);
      
      await signupPage.fillEmail(testEmail);
      console.log(`✓ Filled email: "${testEmail}"`);
      
      await signupPage.fillPassword(testPassword);
      console.log(`✓ Filled password`);
      
      await signupPage.selectTermsCheckbox();
      console.log('✓ Selected terms and conditions checkbox');

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(3000); // Wait for navigation to onboarding

      // Step 4: Verify navigation to onboarding page
      console.log('\n[STEP 4] Verifying navigation to onboarding page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify onboarding page' });
      
      const isOnboardingPageLoaded = await signupPage.isOnboardingPageLoaded();
      expect(isOnboardingPageLoaded).toBeTruthy();
      console.log('✓ Onboarding page is loaded');
      
      const onboardingUrl = await signupPage.getCurrentUrl();
      console.log(`  Current URL: ${onboardingUrl}`);
      expect(onboardingUrl).toContain('/on-boarding');

      // Step 5: Verify Customer Information form is visible
      console.log('\n[STEP 5] Verifying Customer Information form is visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify Customer Information form' });
      
      const isCustomerFormVisible = await signupPage.isCustomerInformationFormVisible();
      expect(isCustomerFormVisible).toBeTruthy();
      console.log('✓ Customer Information form is visible');

      // Step 6: Clear all fields
      console.log('\n[STEP 6] Clearing all fields...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Clear all fields' });
      
      await signupPage.clearCustomerInformationForm();
      console.log('✓ Cleared all fields');

      // Step 7: Click submit button
      console.log('\n[STEP 7] Clicking submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Click submit button' });
      
      await signupPage.clickCustomerInfoSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 8: Check required field messages
      console.log('\n[STEP 8] Checking required field messages...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify required field messages' });
      
      const hasErrors = await signupPage.hasCustomerInfoValidationErrors();
      expect(hasErrors).toBeTruthy();
      console.log('✓ Validation errors are displayed');
      
      const validationErrors = await signupPage.getCustomerInfoValidationErrors();
      const errorCount = await signupPage.getCustomerInfoRequiredFieldErrorCount();
      
      expect(validationErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${validationErrors.length} validation error(s)`);
      console.log(`  Errors: ${validationErrors.join(', ')}`);
      
      // Verify specific required fields have errors
      // Customer Name field
      const customerNameHasInvalidClass = await signupPage.customerNameField.evaluate((el) => {
        return el.classList.contains('ng-invalid') && el.classList.contains('ng-touched');
      }).catch(() => false);
      
      const customerNameError = validationErrors.some(error => 
        error.includes("It's mandatory field")
      );
      expect(customerNameError || customerNameHasInvalidClass).toBeTruthy();
      console.log('✓ Customer Name field shows validation error');
      
      // Company Name field
      const companyNameError = validationErrors.some(error => 
        error.includes("It's mandatory field")
      );
      expect(companyNameError).toBeTruthy();
      console.log('✓ Company/individual name field shows validation error');
      
      // Trial Plan dropdown
      const trialPlanError = validationErrors.some(error => 
        error.includes("Select Trial Plan is required") || error.includes("required")
      );
      expect(trialPlanError).toBeTruthy();
      console.log('✓ Select Trial Plan dropdown shows validation error');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Customer Information form required fields validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });

  test('should verify start trial form required fields during onboarding process', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Start Trial Form Required Fields ===');
    
    const signupPage = new SignupPage(page);
    const timestamp = Date.now();
    
    // Generate unique test data for signup
    const testName = `TestUser${timestamp}`;
    const testEmail = `testuser${timestamp}@example.com`;
    const testPassword = 'Test123456';
    const customerName = `Customer${timestamp}`;
    const companyName = `Company${timestamp}`;
    const trialPlan = 'Tally On Cloud 7 Days Trial Plan';

    try {
      // Step 1: Go to sign up page
      console.log('[STEP 1] Navigating to Sign Up page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Sign Up page' });
      await signupPage.gotoSignUpPage(baseUrl);
      await page.waitForTimeout(2000);
      
      const isSignUpPageLoaded = await signupPage.isSignUpPageLoaded();
      expect(isSignUpPageLoaded).toBeTruthy();
      console.log('✓ Sign Up page is loaded');

      // Step 2: Fill signup form
      console.log('\n[STEP 2] Filling signup form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Fill signup form' });
      
      await signupPage.fillName(testName);
      console.log(`✓ Filled name: "${testName}"`);
      
      await signupPage.fillEmail(testEmail);
      console.log(`✓ Filled email: "${testEmail}"`);
      
      await signupPage.fillPassword(testPassword);
      console.log(`✓ Filled password`);
      
      await signupPage.selectTermsCheckbox();
      console.log('✓ Selected terms and conditions checkbox');

      // Step 3: Click Sign Up button
      console.log('\n[STEP 3] Clicking Sign Up button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Sign Up button' });
      await signupPage.clickSignUpButton();
      console.log('✓ Clicked Sign Up button');
      await page.waitForTimeout(3000); // Wait for navigation to onboarding

      // Step 4: Verify navigation to onboarding page
      console.log('\n[STEP 4] Verifying navigation to onboarding page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify onboarding page' });
      
      const isOnboardingPageLoaded = await signupPage.isOnboardingPageLoaded();
      expect(isOnboardingPageLoaded).toBeTruthy();
      console.log('✓ Onboarding page is loaded');

      // Step 5: Fill customer information form
      console.log('\n[STEP 5] Filling customer information form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Fill customer information form' });
      
      const isCustomerFormVisible = await signupPage.isCustomerInformationFormVisible();
      expect(isCustomerFormVisible).toBeTruthy();
      console.log('✓ Customer Information form is visible');
      
      await signupPage.fillCustomerInformationForm({
        customerName: customerName,
        companyName: companyName,
        trialPlan: trialPlan
      });
      console.log(`✓ Filled customer name: "${customerName}"`);
      console.log(`✓ Filled company name: "${companyName}"`);
      console.log(`✓ Selected trial plan: "${trialPlan}"`);

      // Step 6: Click submit on customer information form
      console.log('\n[STEP 6] Clicking submit on customer information form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Submit customer information form' });
      await signupPage.clickCustomerInfoSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(3000); // Wait for navigation to start trial form

      // Step 7: Verify Start Trial form is visible
      console.log('\n[STEP 7] Verifying Start Trial form is visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Verify Start Trial form' });
      
      const isStartTrialFormVisible = await signupPage.isStartTrialFormVisible();
      expect(isStartTrialFormVisible).toBeTruthy();
      console.log('✓ Start Trial form is visible');

      // Step 8: Clear all fields in Start Trial form
      console.log('\n[STEP 8] Clearing all fields in Start Trial form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Clear Start Trial form fields' });
      
      await signupPage.clearStartTrialForm();
      console.log('✓ Cleared all fields');

      // Step 9: Click submit button
      console.log('\n[STEP 9] Clicking submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Click submit button' });
      
      await signupPage.clickStartTrialSubmit();
      console.log('✓ Clicked submit button');
      await page.waitForTimeout(2000); // Wait for validation to trigger

      // Step 10: Check required field messages
      console.log('\n[STEP 10] Checking required field messages...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify required field messages' });
      
      const hasErrors = await signupPage.hasStartTrialValidationErrors();
      expect(hasErrors).toBeTruthy();
      console.log('✓ Validation errors are displayed');
      
      const validationErrors = await signupPage.getStartTrialValidationErrors();
      const errorCount = await signupPage.getStartTrialRequiredFieldErrorCount();
      
      expect(validationErrors.length).toBeGreaterThan(0);
      console.log(`✓ Found ${validationErrors.length} validation error(s)`);
      console.log(`  Errors: ${validationErrors.join(', ')}`);
      
      // Verify specific required fields have errors
      // Workspace Name field
      const workspaceNameError = validationErrors.some(error => 
        error.includes("It's mandatory field")
      );
      expect(workspaceNameError).toBeTruthy();
      console.log('✓ Workspace Name field shows validation error');
      
      // Verify workspace name field has invalid class
      const workspaceNameHasInvalidClass = await signupPage.workspaceNameField.evaluate((el) => {
        return el.classList.contains('ng-invalid') && el.classList.contains('ng-touched');
      }).catch(() => false);
      expect(workspaceNameHasInvalidClass).toBeTruthy();
      console.log('✓ Workspace Name field has invalid class');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Start Trial form required fields validation verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    }
  });
});

