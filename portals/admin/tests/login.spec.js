const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Login', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';
  const invalidPassword = 'InvalidPassword123!';
  const nonExistentEmail = 'nonexistent@example.com';

  // P01 - Valid Login with Correct Credentials
  test('P01 - should login with correct credentials and display dashboard', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test P01: Valid Login with Correct Credentials ===');
    
    const dashboardPage = new DashboardPage(page);

    // Step 1: Navigate to admin portal and verify login form is visible
    console.log('[STEP 1] Navigating to admin portal...');
    await dashboardPage.goto(baseUrl);
    const isLoginFormVisible = await dashboardPage.isLoginFormVisible();
    expect(isLoginFormVisible).toBeTruthy();
    console.log('✓ Login form is visible');

    // Step 2: Perform login
    console.log('[STEP 2] Performing login...');
    
    await dashboardPage.login(validEmail, validPassword);
    console.log('✓ Login credentials submitted');

    // Step 3: Wait for success toast or navigation
    console.log('[STEP 3] Waiting for login response...');
    await page.waitForTimeout(3000);
    
    // Check for success toast
    const successToast = await dashboardPage.successToast.isVisible({ timeout: 5000 }).catch(() => false);
    if (successToast) {
      console.log('✓ Success toast appeared');
    }

    // Step 4: Verify successful login - wait for login form to disappear or URL change
    console.log('[STEP 4] Verifying login form disappeared...');
    await page.waitForTimeout(2000);
    const currentUrl = await dashboardPage.getCurrentUrl();
    const isLoginFormStillVisible = await dashboardPage.isLoginFormStillVisible();
    
    // Either form should disappear or URL should change
    expect(isLoginFormStillVisible === false || !currentUrl.includes('/login')).toBeTruthy();
    console.log(`✓ Login form disappeared or URL changed: ${currentUrl}`);

    // Step 5: Verify we're on the dashboard page (not on login page)
    console.log('[STEP 5] Verifying URL redirect...');
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ URL does not contain '/login': ${currentUrl}`);

    // Step 6: Verify dashboard is loaded and visible
    console.log('[STEP 6] Verifying dashboard is visible...');
    await page.waitForTimeout(2000);
    
    // Verify we're not on login page first
    const finalUrl = await dashboardPage.getCurrentUrl();
    expect(finalUrl).not.toContain('/login');
    console.log(`✓ Not on login page: ${finalUrl}`);
    
    // Check if dashboard is visible (flexible check)
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard is visible');

    // Step 7: Verify specific dashboard elements are present (with flexible check)
    console.log('[STEP 7] Verifying dashboard elements...');
    
    // Try to find sidebar first (most reliable)
    const isSidebarVisible = await dashboardPage.dashboardSidebar.isVisible({ timeout: 10000 }).catch(() => false);
    if (isSidebarVisible) {
      console.log('✓ Dashboard sidebar is visible');
    }
    
    // Try to find dashboard title
    const isTitleVisible = await dashboardPage.dashboardTitle.isVisible({ timeout: 10000 }).catch(() => false);
    if (isTitleVisible) {
      console.log('✓ Dashboard title is visible');
      const dashboardTitle = await dashboardPage.getDashboardTitle();
      if (dashboardTitle) {
        console.log(`✓ Dashboard title: "${dashboardTitle}"`);
      }
    }
    
    // At least one element should be visible
    expect(isSidebarVisible || isTitleVisible).toBeTruthy();

    // Step 9: Capture screenshot
    await page.screenshot({ path: 'artifacts/P01-valid-login.png', fullPage: true });
    console.log('✓ Test P01 completed successfully');
  });

  // P02 - Login with Email in Different Cases (Uppercase/Lowercase)
  // Note: Login should fail with uppercase email as only registered (lowercase) email works
  test('P02 - should fail login with email in uppercase', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test P02: Login with Email in Uppercase (Should Fail) ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Enter email in uppercase
    console.log('[STEP 1] Entering email in uppercase...');
    const uppercaseEmail = validEmail.toUpperCase();
    await dashboardPage.fillEmail(uppercaseEmail);
    await dashboardPage.fillPassword(validPassword);
    console.log(`✓ Email entered: ${uppercaseEmail}`);

    // Step 2: Click Sign In
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    console.log('✓ Login credentials submitted');

    // Step 3: Wait for login response
    console.log('[STEP 3] Waiting for login response...');
    await page.waitForTimeout(5000);
    
    // Step 4: Check for error toast (optional - may or may not appear)
    console.log('[STEP 4] Checking for error toast...');
    const errorToast = await dashboardPage.isErrorToastVisible(5000).catch(() => false);
    if (errorToast) {
      const toastMsg = await dashboardPage.getErrorToastMessage();
      console.log(`✓ Error toast appeared: "${toastMsg}"`);
      // Verify toast message contains error about user not found or invalid credentials
      if (toastMsg) {
        const hasUserNotFound = toastMsg.toLowerCase().match(/user.*not.*found|no.*user|invalid.*credentials|incorrect.*credentials/i);
        if (hasUserNotFound) {
          console.log('✓ Toast message indicates user not found (expected for uppercase email)');
        }
      }
    } else {
      console.log('⚠ No error toast appeared (this is acceptable)');
    }

    // Step 5: Verify login failed - user should still be on login page
    console.log('[STEP 5] Verifying login failed (user should still be on login page)...');
    const currentUrl = await dashboardPage.getCurrentUrl();
    const isLoginFormStillVisible = await dashboardPage.isLoginFormStillVisible();
    
    // Verify user is still on login page
    expect(currentUrl).toContain('/login');
    expect(isLoginFormStillVisible).toBeTruthy();
    console.log(`✓ Login failed as expected - still on login page: ${currentUrl}`);
    console.log(`✓ Login form is still visible: ${isLoginFormStillVisible}`);

    // Step 6: Verify user did NOT navigate to dashboard
    console.log('[STEP 6] Verifying user did NOT navigate to dashboard...');
    const isOnDashboard = !currentUrl.includes('/login');
    expect(isOnDashboard).toBeFalsy();
    console.log('✓ User did not navigate to dashboard (login correctly failed)');

    await page.screenshot({ path: 'artifacts/P02-uppercase-email-failed.png', fullPage: true });
    console.log('✓ Test P02 completed successfully - login correctly failed with uppercase email');
  });

  // P03 - Login with Leading/Trailing Spaces in Email
  test('P03 - should login with email containing leading/trailing spaces', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test P03: Login with Email with Spaces ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Enter email with leading/trailing spaces
    console.log('[STEP 1] Entering email with spaces...');
    const emailWithSpaces = ` ${validEmail} `;
    await dashboardPage.fillEmail(emailWithSpaces);
    await dashboardPage.fillPassword(validPassword);
    console.log(`✓ Email entered with spaces: "${emailWithSpaces}"`);

    // Step 2: Click Sign In
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    await page.waitForTimeout(3000);

    // Step 3: Verify login is successful (spaces should be trimmed)
    console.log('[STEP 3] Verifying login success...');
    const currentUrl = await dashboardPage.getCurrentUrl();
    const isLoginFormStillVisible = await dashboardPage.isLoginFormStillVisible();
    
    // Either form should disappear or URL should change
    expect(isLoginFormStillVisible === false || !currentUrl.includes('/login')).toBeTruthy();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Login successful with email containing spaces (spaces trimmed) - URL: ${currentUrl}`);

    await page.screenshot({ path: 'artifacts/P03-email-with-spaces.png', fullPage: true });
    console.log('✓ Test P03 completed successfully');
  });

  // P04 - Verify Dashboard Elements After Login
  test('P04 - should verify all dashboard elements after login', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test P04: Verify Dashboard Elements ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);

    // Verify we're not on login page
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    console.log(`✓ Not on login page: ${currentUrl}`);

    // Step 1: Verify dashboard is visible
    console.log('[STEP 1] Verifying dashboard is visible...');
    const isDashboardVisible = await dashboardPage.isVisible();
    expect(isDashboardVisible).toBeTruthy();
    console.log('✓ Dashboard is visible');

    // Step 2: Verify "Dashboard & Statistics" heading is visible
    console.log('[STEP 2] Verifying "Dashboard & Statistics" heading...');
    const isTitleVisible = await dashboardPage.dashboardTitle.isVisible({ timeout: 10000 }).catch(() => false);
    expect(isTitleVisible).toBeTruthy();
    console.log('✓ "Dashboard & Statistics" heading is visible');
    
    // Verify heading text
    const dashboardTitleText = await dashboardPage.getDashboardTitle();
    expect(dashboardTitleText).toBeTruthy();
    expect(dashboardTitleText?.trim()).toMatch(/Dashboard.*Statistics/i);
    console.log(`✓ Dashboard heading text: "${dashboardTitleText?.trim()}"`);

    // Step 3: Verify sidebar menu (most reliable element)
    console.log('[STEP 3] Verifying sidebar menu...');
    const isSidebarVisible = await dashboardPage.dashboardSidebar.isVisible({ timeout: 10000 }).catch(() => false);
    if (isSidebarVisible) {
      console.log('✓ Sidebar menu is visible');
    } else {
      console.log('⚠ Sidebar not found, checking other elements...');
    }

    // Step 4: Verify main content area
    console.log('[STEP 4] Verifying main content area...');
    const isDashboardContainerVisible = await dashboardPage.dashboardContainer.isVisible();
    expect(isDashboardContainerVisible).toBeTruthy();
    console.log('✓ Main content area is visible');

    // At least sidebar or title should be visible
    expect(isSidebarVisible || isTitleVisible || isDashboardContainerVisible).toBeTruthy();

    await page.screenshot({ path: 'artifacts/P04-dashboard-elements.png', fullPage: true });
    console.log('✓ Test P04 completed successfully');
  });

  // P05 - Verify URL Changes After Successful Login
  test('P05 - should verify URL changes after successful login', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test P05: Verify URL Changes ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Get initial URL (should contain login)
    console.log('[STEP 1] Getting initial URL...');
    const initialUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Initial URL: ${initialUrl}`);

    // Step 2: Perform login
    console.log('[STEP 2] Performing login...');
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(2000);

    // Step 3: Verify URL changed and doesn't contain '/login'
    console.log('[STEP 3] Verifying URL changed...');
    const currentUrl = await dashboardPage.getCurrentUrl();
    expect(currentUrl).not.toContain('/login');
    expect(currentUrl).not.toBe(initialUrl);
    console.log(`✓ URL changed from login page: ${currentUrl}`);

    await page.screenshot({ path: 'artifacts/P05-url-change.png', fullPage: true });
    console.log('✓ Test P05 completed successfully');
  });

  // N01 - Login with Invalid Email Format
  test('N01 - should show error for invalid email format', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N01: Invalid Email Format ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    const invalidEmails = ['invalidemail', 'test@', '@domain.com'];
    
    for (const invalidEmail of invalidEmails) {
      console.log(`\nTesting with invalid email: "${invalidEmail}"`);
      
      // Step 1: Enter invalid email
      await dashboardPage.clearAllFields();
      await dashboardPage.fillEmail(invalidEmail);
      await dashboardPage.fillPassword('anypassword');
      
      // Step 2: Click Sign In (this will trigger Angular form validation)
      await dashboardPage.clickSignIn();
      await page.waitForTimeout(1500);
      
      // Step 3: Verify validation error appears or form didn't submit
      const emailError = await dashboardPage.isEmailErrorVisible();
      const errorToast = await dashboardPage.isErrorToastVisible(3000);
      const isFormVisible = await dashboardPage.isLoginFormStillVisible();
      const currentUrl = await dashboardPage.getCurrentUrl();
      
      // Should either show validation error or stay on login page
      expect(emailError || errorToast || (isFormVisible && currentUrl.includes('/login'))).toBeTruthy();
      
      if (emailError) {
        const errorMsg = await dashboardPage.getEmailErrorMessage();
        console.log(`✓ Validation error shown for "${invalidEmail}": "${errorMsg}"`);
      } else if (errorToast) {
        const toastMsg = await dashboardPage.getErrorToastMessage();
        console.log(`✓ Error toast for "${invalidEmail}": "${toastMsg}"`);
      } else {
        console.log(`✓ Login did not proceed for "${invalidEmail}" (form validation prevented submission)`);
      }
    }

    await page.screenshot({ path: 'artifacts/N01-invalid-email-format.png', fullPage: true });
    console.log('✓ Test N01 completed successfully');
  });

  // N02 - Login with Empty Email Field
  test('N02 - should show error for empty email field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N02: Empty Email Field ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Leave email field empty, enter password
    console.log('[STEP 1] Leaving email empty, entering password...');
    await dashboardPage.clearAllFields();
    await dashboardPage.fillPassword(validPassword);
    
    // Step 2: Click Sign In
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    await page.waitForTimeout(1000);
    
    // Step 3: Verify validation error appears
    console.log('[STEP 3] Verifying validation error...');
    const emailError = await dashboardPage.isEmailErrorVisible();
    const errorToast = await dashboardPage.isErrorToastVisible(3000);
    
    expect(emailError || errorToast).toBeTruthy();
    if (emailError) {
      const errorMsg = await dashboardPage.getEmailErrorMessage();
      console.log(`✓ Email validation error: "${errorMsg}"`);
      expect(errorMsg?.toLowerCase()).toMatch(/email|required/i);
    } else if (errorToast) {
      const toastMsg = await dashboardPage.getErrorToastMessage();
      console.log(`✓ Error toast: "${toastMsg}"`);
    }

    await page.screenshot({ path: 'artifacts/N02-empty-email.png', fullPage: true });
    console.log('✓ Test N02 completed successfully');
  });

  // N03 - Login with Empty Password Field
  test('N03 - should show error for empty password field', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N03: Empty Password Field ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Enter email, leave password empty
    console.log('[STEP 1] Entering email, leaving password empty...');
    await dashboardPage.clearAllFields();
    await dashboardPage.fillEmail(validEmail);
    
    // Step 2: Click Sign In (triggers Angular form validation)
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    await page.waitForTimeout(1500);
    
    // Step 3: Verify validation error appears or form didn't submit
    console.log('[STEP 3] Verifying validation error...');
    const passwordError = await dashboardPage.isPasswordErrorVisible();
    const errorToast = await dashboardPage.isErrorToastVisible(3000);
    const isFormVisible = await dashboardPage.isLoginFormStillVisible();
    const currentUrl = await dashboardPage.getCurrentUrl();
    
    expect(passwordError || errorToast || (isFormVisible && currentUrl.includes('/login'))).toBeTruthy();
    
    if (passwordError) {
      const errorMsg = await dashboardPage.getPasswordErrorMessage();
      console.log(`✓ Password validation error: "${errorMsg}"`);
      if (errorMsg) {
        expect(errorMsg.toLowerCase()).toMatch(/password|required/i);
      }
    } else if (errorToast) {
      const toastMsg = await dashboardPage.getErrorToastMessage();
      console.log(`✓ Error toast: "${toastMsg}"`);
    } else {
      console.log('✓ Login form still visible (validation prevented submission)');
    }

    await page.screenshot({ path: 'artifacts/N03-empty-password.png', fullPage: true });
    console.log('✓ Test N03 completed successfully');
  });

  // N04 - Login with Empty Email and Password Fields
  test('N04 - should show errors for empty email and password fields', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N04: Empty Email and Password ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Leave both fields empty
    console.log('[STEP 1] Leaving both fields empty...');
    await dashboardPage.clearAllFields();
    
    // Step 2: Click Sign In (triggers Angular form validation)
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    await page.waitForTimeout(1500);
    
    // Step 3: Verify validation errors appear for both fields or form didn't submit
    console.log('[STEP 3] Verifying validation errors...');
    const emailError = await dashboardPage.isEmailErrorVisible();
    const passwordError = await dashboardPage.isPasswordErrorVisible();
    const errorToast = await dashboardPage.isErrorToastVisible(3000);
    const isFormVisible = await dashboardPage.isLoginFormStillVisible();
    const currentUrl = await dashboardPage.getCurrentUrl();
    
    expect(emailError || passwordError || errorToast || (isFormVisible && currentUrl.includes('/login'))).toBeTruthy();
    
    if (emailError) {
      const emailErrorMsg = await dashboardPage.getEmailErrorMessage();
      console.log(`✓ Email error: "${emailErrorMsg}"`);
    }
    if (passwordError) {
      const passwordErrorMsg = await dashboardPage.getPasswordErrorMessage();
      console.log(`✓ Password error: "${passwordErrorMsg}"`);
    }
    if (errorToast) {
      const toastMsg = await dashboardPage.getErrorToastMessage();
      console.log(`✓ Error toast: "${toastMsg}"`);
    }
    if (!emailError && !passwordError && !errorToast) {
      console.log('✓ Login form still visible (validation prevented submission)');
    }

    await page.screenshot({ path: 'artifacts/N04-empty-both-fields.png', fullPage: true });
    console.log('✓ Test N04 completed successfully');
  });

  // N05 - Login with Invalid Password
test('N05 - should show error for invalid password', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N05: Invalid Password ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Enter valid email, incorrect password
    console.log('[STEP 1] Entering valid email and incorrect password...');
    await dashboardPage.clearAllFields();
    await dashboardPage.fillEmail(validEmail);
    await dashboardPage.fillPassword(invalidPassword);
    
    // Step 2: Click Sign In
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    await page.waitForTimeout(3000);
    
    // Step 3: Verify error toast/message appears
    console.log('[STEP 3] Verifying error message...');
    const errorToast = await dashboardPage.isErrorToastVisible(5000);
    const isFormStillVisible = await dashboardPage.isLoginFormStillVisible();
    const currentUrl = await dashboardPage.getCurrentUrl();
    
    expect(errorToast || (isFormStillVisible && currentUrl.includes('/login'))).toBeTruthy();
    
    if (errorToast) {
      const toastMsg = await dashboardPage.getErrorToastMessage();
      console.log(`✓ Error toast: "${toastMsg}"`);
      if (toastMsg) {
        expect(toastMsg.toLowerCase()).toMatch(/invalid|incorrect|wrong|credentials|password/i);
      }
    } else {
      expect(isFormStillVisible).toBeTruthy();
      expect(currentUrl).toContain('/login');
      console.log('✓ Login form still visible (login did not proceed)');
    }

    await page.screenshot({ path: 'artifacts/N05-invalid-password.png', fullPage: true });
    console.log('✓ Test N05 completed successfully');
  });

  // N06 - Login with Non-Existent Email
  test('N06 - should show error for non-existent email', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N06: Non-Existent Email ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Enter non-existent email
    console.log('[STEP 1] Entering non-existent email...');
    await dashboardPage.clearAllFields();
    await dashboardPage.fillEmail(nonExistentEmail);
    await dashboardPage.fillPassword('anypassword');
    
    // Step 2: Click Sign In
    console.log('[STEP 2] Clicking Sign In...');
    await dashboardPage.clickSignIn();
    await page.waitForTimeout(3000);
    
    // Step 3: Verify error message appears
    console.log('[STEP 3] Verifying error message...');
    const errorToast = await dashboardPage.isErrorToastVisible(5000);
    const isFormStillVisible = await dashboardPage.isLoginFormStillVisible();
    const currentUrl = await dashboardPage.getCurrentUrl();
    
    // Should either show error toast or stay on login page
    expect(errorToast || (isFormStillVisible && currentUrl.includes('/login'))).toBeTruthy();
    
    if (errorToast) {
      const toastMsg = await dashboardPage.getErrorToastMessage();
      console.log(`✓ Error toast: "${toastMsg}"`);
      if (toastMsg) {
        expect(toastMsg.toLowerCase()).toMatch(/invalid|incorrect|credentials|not found|user|email/i);
      }
    } else {
      expect(isFormStillVisible).toBeTruthy();
      expect(currentUrl).toContain('/login');
      console.log('✓ Login form still visible (login did not proceed)');
    }

    await page.screenshot({ path: 'artifacts/N06-non-existent-email.png', fullPage: true });
    console.log('✓ Test N06 completed successfully');
  });

  // N07 - Login with Correct Email but Wrong Password (Multiple Attempts)
  test('N07 - should handle multiple failed login attempts', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test N07: Multiple Failed Login Attempts ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    const maxAttempts = 3;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`\n[ATTEMPT ${attempt}/${maxAttempts}]`);
      
      // Step 1: Enter valid email, wrong password
      await dashboardPage.clearAllFields();
      await dashboardPage.fillEmail(validEmail);
      await dashboardPage.fillPassword(invalidPassword);
      
      // Step 2: Click Sign In
      await dashboardPage.clickSignIn();
      await page.waitForTimeout(2000);
      
      // Step 3: Check for error message
      const errorToast = await dashboardPage.isErrorToastVisible(3000);
      const isFormStillVisible = await dashboardPage.isLoginFormStillVisible();
      
      if (errorToast) {
        const toastMsg = await dashboardPage.getErrorToastMessage();
        console.log(`  Attempt ${attempt}: Error toast - "${toastMsg}"`);
        
        // Check for rate limiting or account lock message after multiple attempts
        if (attempt >= 3) {
          const hasRateLimit = toastMsg?.toLowerCase().match(/rate limit|too many|locked|temporarily|try again/i);
          if (hasRateLimit) {
            console.log(`✓ Rate limiting detected after ${attempt} attempts`);
            break;
          }
        }
      }
      
      expect(isFormStillVisible).toBeTruthy();
      console.log(`  Attempt ${attempt}: Login form still visible (login failed)`);
    }

    await page.screenshot({ path: 'artifacts/N07-multiple-attempts.png', fullPage: true });
    console.log('✓ Test N07 completed successfully');
  });

  // UI01 - Verify Login Form Elements Visibility
  test('UI01 - should verify all login form elements are visible', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test UI01: Login Form Elements Visibility ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Verify email input is visible
    console.log('[STEP 1] Verifying email input...');
    const isEmailVisible = await dashboardPage.emailInput.isVisible();
    expect(isEmailVisible).toBeTruthy();
    console.log('✓ Email input is visible');
    
    // Step 2: Verify password input is visible
    console.log('[STEP 2] Verifying password input...');
    const isPasswordVisible = await dashboardPage.passwordInput.isVisible();
    expect(isPasswordVisible).toBeTruthy();
    console.log('✓ Password input is visible');
    
    // Step 3: Verify Sign In button is visible
    console.log('[STEP 3] Verifying Sign In button...');
    const isSignInVisible = await dashboardPage.signInButton.isVisible();
    expect(isSignInVisible).toBeTruthy();
    console.log('✓ Sign In button is visible');
    
    // Step 4: Verify Forgot Password link is visible
    console.log('[STEP 4] Verifying Forgot Password link...');
    const isForgotPasswordVisible = await dashboardPage.isForgotPasswordLinkVisible();
    if (isForgotPasswordVisible) {
      console.log('✓ Forgot Password link is visible');
    } else {
      console.log('⚠ Forgot Password link not found (may not exist on this page)');
    }

    await page.screenshot({ path: 'artifacts/UI01-form-elements.png', fullPage: true });
    console.log('✓ Test UI01 completed successfully');
  });

  // UI02 - Verify Password Field Type (Should be Password Type)
  test('UI02 - should verify password field is masked', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test UI02: Password Field Masking ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Enter password
    console.log('[STEP 1] Entering password...');
    const testPassword = 'TestPassword123';
    await dashboardPage.fillPassword(testPassword);
    
    // Step 2: Verify password field type is 'password' (masked)
    console.log('[STEP 2] Verifying password is masked...');
    const isMasked = await dashboardPage.isPasswordMasked();
    expect(isMasked).toBeTruthy();
    console.log('✓ Password field type is "password" (masked)');
    
    // Step 3: Verify password value is not visible as plain text
    const inputType = await dashboardPage.passwordInput.getAttribute('type');
    expect(inputType).toBe('password');
    console.log(`✓ Input type attribute: "${inputType}"`);

    await page.screenshot({ path: 'artifacts/UI02-password-masked.png', fullPage: true });
    console.log('✓ Test UI02 completed successfully');
  });

  // UI03 - Verify Forgot Password Link Navigation
  test('UI03 - should verify forgot password link navigation', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test UI03: Forgot Password Link Navigation ===');
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    
    // Step 1: Verify Forgot Password link is visible
    console.log('[STEP 1] Verifying Forgot Password link is visible...');
    const isForgotPasswordVisible = await dashboardPage.isForgotPasswordLinkVisible();
    
    if (!isForgotPasswordVisible) {
      console.log('⚠ Forgot Password link not found, skipping test');
      test.skip();
      return;
    }
    
    expect(isForgotPasswordVisible).toBeTruthy();
    console.log('✓ Forgot Password link is visible');
    
    // Step 2: Get current URL
    const initialUrl = await dashboardPage.getCurrentUrl();
    console.log(`✓ Initial URL: ${initialUrl}`);
    
    // Step 3: Click Forgot Password link
    console.log('[STEP 2] Clicking Forgot Password link...');
    await dashboardPage.clickForgotPasswordLink();
    await page.waitForTimeout(2000);
    
    // Step 4: Verify navigation to reset password page
    console.log('[STEP 3] Verifying page navigation...');
    const currentUrl = await dashboardPage.getCurrentUrl();
    const urlContainsReset = currentUrl.includes('forgot') || currentUrl.includes('reset') || currentUrl.includes('password');
    
    expect(urlContainsReset || currentUrl !== initialUrl).toBeTruthy();
    console.log(`✓ Navigated to: ${currentUrl}`);
    
    // Verify we're on a different page
    expect(currentUrl).not.toBe(initialUrl);
    console.log('✓ URL changed (navigation successful)');

    await page.screenshot({ path: 'artifacts/UI03-forgot-password-navigation.png', fullPage: true });
    console.log('✓ Test UI03 completed successfully');
  });
});

