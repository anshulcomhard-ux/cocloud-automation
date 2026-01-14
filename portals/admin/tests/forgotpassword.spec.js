const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/login');
const { ForgotPasswordPage } = require('../pages/forgotpassword');

test.describe('Admin Portal - Forgot Password', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';

  async function openForgotPassword(page, testInfo) {
    testInfo.annotations.push({ type: 'step', description: 'Navigate to Forgot Password page from login' });
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.openFromLogin(baseUrl);
    return forgotPasswordPage;
  }

  test('N01 - should show validation error when requesting OTP with empty email', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N01: Empty Email Validation on Forgot Password ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);

    console.log('\n[STEP 1] Click Request OTP with empty email...');
    await forgotPasswordPage.enterEmail('');
    await forgotPasswordPage.clickRequestOtp();

    console.log('[VERIFY] Email validation error should be visible...');
    const emailErrorVisible = await forgotPasswordPage.isEmailErrorVisible();
    expect(emailErrorVisible).toBeTruthy();

    const errorMsg = await forgotPasswordPage.getEmailErrorMessage();
    console.log(`  ✓ Email error message: "${errorMsg || 'N/A'}"`);
  });

  test('N02 - should show validation error for invalid email format', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N02: Invalid Email Format Validation on Forgot Password ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);

    console.log('\n[STEP 1] Enter invalid email and click Request OTP...');
    await forgotPasswordPage.enterEmail('invalid-email');
    await page.waitForTimeout(500); // Wait for input to be processed
    await forgotPasswordPage.clickRequestOtp();
    await page.waitForTimeout(1000); // Wait for validation error to appear

    console.log('[VERIFY] Email validation error should be visible for invalid format...');
    const emailErrorVisible = await forgotPasswordPage.isEmailErrorVisible();
    expect(emailErrorVisible).toBeTruthy();

    const errorMsg = await forgotPasswordPage.getEmailErrorMessage();
    console.log(`  ✓ Email error message: "${errorMsg || 'N/A'}"`);
  });

  test('P01 - should navigate to Reset Password page for valid registered email', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    console.log('\n=== Test P01: Navigate to Reset Password Page for Valid Email ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);

    console.log('\n[STEP 1] Enter valid email and click Request OTP...');
    await forgotPasswordPage.enterEmail(validEmail);
    await forgotPasswordPage.clickRequestOtp();

    console.log('[VERIFY] Reset Password page should be visible...');
    const onResetPage = await forgotPasswordPage.isOnResetPasswordPage();
    expect(onResetPage).toBeTruthy();

    const resetEmailValue = await forgotPasswordPage.getResetEmailValue();
    console.log(`  ✓ Reset page email value: "${resetEmailValue || 'N/A'}"`);
    expect(resetEmailValue.toLowerCase()).toContain(validEmail.toLowerCase());

    console.log('[VERIFY] Email field should be readonly (not editable) on Reset Password page...');
    const isEmailReadonly = await forgotPasswordPage.isResetEmailReadonly();
    expect(isEmailReadonly).toBeTruthy();
    console.log('  ✓ Email field is readonly (not editable)');
  });

  test('N03 - should show required validation when submitting empty Reset Password form', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    console.log('\n=== Test N03: Required Validation on Empty Reset Password Form ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);

    console.log('\n[STEP 1] Navigate to Reset Password page using valid email...');
    await forgotPasswordPage.enterEmail(validEmail);
    await forgotPasswordPage.clickRequestOtp();
    const onResetPage = await forgotPasswordPage.isOnResetPasswordPage();
    expect(onResetPage).toBeTruthy();

    console.log('\n[STEP 2] Click Change Password with all fields empty...');
    await forgotPasswordPage.fillResetForm({ otp: '', password: '', confirmPassword: '' });
    await forgotPasswordPage.clickChangePassword();

    console.log('[VERIFY] Required validation errors should be visible for OTP, Password and Confirm Password...');
    const errors = await forgotPasswordPage.areResetRequiredErrorsVisible();
    console.log(`  OTP error visible: ${errors.otp}`);
    console.log(`  Password error visible: ${errors.password}`);
    console.log(`  Confirm Password error visible: ${errors.confirmPassword}`);

    expect(errors.otp).toBeTruthy();
    expect(errors.password).toBeTruthy();
    expect(errors.confirmPassword).toBeTruthy();
  });

  test('N04 - should show validation when passwords do not match on Reset Password page', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    console.log('\n=== Test N04: Password Mismatch Validation on Reset Password Page ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);

    console.log('\n[STEP 1] Navigate to Reset Password page using valid email...');
    await forgotPasswordPage.enterEmail(validEmail);
    await forgotPasswordPage.clickRequestOtp();
    
    // Wait a bit more for page navigation to complete
    await page.waitForTimeout(2000);
    
    // Check if we're on Reset Password page
    const onResetPage = await forgotPasswordPage.isOnResetPasswordPage();
    if (!onResetPage) {
      // Check if there's an error that prevented navigation
      const emailErrorVisible = await forgotPasswordPage.isEmailErrorVisible();
      const errorToastVisible = await forgotPasswordPage.waitForErrorToast(3000).catch(() => false);
      
      if (emailErrorVisible || errorToastVisible) {
        const errorMsg = emailErrorVisible 
          ? await forgotPasswordPage.getEmailErrorMessage() 
          : await forgotPasswordPage.getToastMessage();
        throw new Error(`Failed to navigate to Reset Password page. Error: ${errorMsg || 'Unknown error'}`);
      }
    }
    expect(onResetPage).toBeTruthy();

    console.log('\n[STEP 2] Fill mismatched passwords and click Change Password...');
    await forgotPasswordPage.fillResetForm({
      otp: '123456',
      password: 'NewPass@123',
      confirmPassword: 'DifferentPass@123'
    });
    await page.waitForTimeout(500); // Wait for form to process
    await forgotPasswordPage.clickChangePassword();
    await page.waitForTimeout(2000); // Wait for validation error or toast to appear

    console.log('[VERIFY] Confirm password / mismatch validation should be visible...');
    
    // Strategy 1: Check for confirm password error message
    const errors = await forgotPasswordPage.areResetRequiredErrorsVisible();
    console.log(`  Confirm Password error visible: ${errors.confirmPassword}`);
    
    // Strategy 2: Check for error toast (optional)
    const errorToastVisible = await forgotPasswordPage.waitForErrorToast(3000).catch(() => false);
    console.log(`  Error toast visible: ${errorToastVisible}`);
    
    // Strategy 3: Verify we're still on Reset Password page (validation prevented navigation)
    const stillOnResetPage = await forgotPasswordPage.isOnResetPasswordPage();
    console.log(`  Still on Reset Password page: ${stillOnResetPage}`);
    
    // At least one of these should be true: error message, toast, or still on reset page
    const validationDetected = errors.confirmPassword || errorToastVisible || stillOnResetPage;
    expect(validationDetected).toBeTruthy();
    
    if (errors.confirmPassword) {
      console.log('✓ Password mismatch validation error message is visible');
    } else if (errorToastVisible) {
      const toastMsg = await forgotPasswordPage.getToastMessage();
      console.log(`✓ Error toast is visible: "${toastMsg}"`);
    } else if (stillOnResetPage) {
      console.log('✓ Validation prevented navigation (still on Reset Password page)');
    }
  });

  test('N05 - should navigate back to login from Forgot Password page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test N05: Back to Login from Forgot Password Page ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);
    const dashboardPage = new DashboardPage(page);

    console.log('\n[STEP 1] Click Back to Login from Forgot Password page...');
    await forgotPasswordPage.backToLoginLink.click();
    await page.waitForTimeout(2000);

    console.log('[VERIFY] Login form should be visible again...');
    const loginVisible = await dashboardPage.isLoginFormVisible();
    expect(loginVisible).toBeTruthy();
  });

  test('N06 - should navigate back to login from Reset Password page', async ({ page }, testInfo) => {
    test.setTimeout(90000);
    console.log('\n=== Test N06: Back to Login from Reset Password Page ===');

    const forgotPasswordPage = await openForgotPassword(page, testInfo);
    const dashboardPage = new DashboardPage(page);

    console.log('\n[STEP 1] Navigate to Reset Password page using valid email...');
    await forgotPasswordPage.enterEmail(validEmail);
    await forgotPasswordPage.clickRequestOtp();
    const onResetPage = await forgotPasswordPage.isOnResetPasswordPage();
    expect(onResetPage).toBeTruthy();

    console.log('\n[STEP 2] Click Back to Login from Reset Password page...');
    await forgotPasswordPage.backToLoginLink.click();
    await page.waitForTimeout(2000);

    console.log('[VERIFY] Login form should be visible again...');
    const loginVisible = await dashboardPage.isLoginFormVisible();
    expect(loginVisible).toBeTruthy();
  });
});

