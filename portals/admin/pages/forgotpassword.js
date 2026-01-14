const { DashboardPage } = require('./login');

class ForgotPasswordPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ========= Forgot Password page locators =========
    // Heading: <h6 class="my-2">Forgot Password</h6>
    this.forgotPasswordHeading = page
      .locator('h6.my-2:has-text("Forgot Password"), h6:has-text("Forgot Password")')
      .first();

    // Email input on Forgot Password page
    // HTML: input[ng-reflect-name="email"][type="email"][placeholder="Enter registered email id"]
    this.emailInput = page
      .locator(
        'input[ng-reflect-name="email"][type="email"], ' +
          'input[placeholder="Enter registered email id"], ' +
          'input[formcontrolname="email"][type="email"]'
      )
      .first();

    // "Request OTP" button
    // HTML: button.primary-btn.w-100.mb-2:has-text("Request OTP")
    this.requestOtpButton = page
      .locator(
        'button.primary-btn.w-100.mb-2:has-text("Request OTP"), ' +
          'button.primary-btn:has-text("Request OTP"), ' +
          'button:has-text("Request OTP")'
      )
      .first();

    // Email validation error (e.g. "Email is required.", "Invalid email format", etc.)
    // HTML: div.error-message.mt-1 span (any email validation error near email input)
    // Strategy: Find error message that appears after email input in the form
    this.emailError = page
      .locator(
        'input[ng-reflect-name="email"][type="email"] ~ div.error-message span, ' +
          'input[formcontrolname="email"][type="email"] ~ div.error-message span, ' +
          'input[placeholder="Enter registered email id"] ~ div.error-message span, ' +
          'div.error-message.mt-1 span:has-text("Email"), ' +
          'div.error-message span:has-text("Email"), ' +
          'div.error-message:has-text("Email")'
      )
      .first();

    // Back to Login link (present on both Forgot and Reset pages)
    // HTML: a.back-to-login:has-text("Back to Login")
    this.backToLoginLink = page
      .locator('a.back-to-login:has-text("Back to Login"), a:has-text("Back to Login")')
      .first();

    // ========= Reset Password page locators =========
    // Heading: <h6 class="my-2">Reset Password</h6>
    this.resetPasswordHeading = page
      .locator('h6.my-2:has-text("Reset Password"), h6:has-text("Reset Password")')
      .first();

    // Readonly email field on Reset Password page (not editable)
    // HTML: input[ng-reflect-name="email"][type="email"][readonly]
    this.resetEmailInput = page
      .locator(
        'input[ng-reflect-name="email"][type="email"][readonly], ' +
          'input[formcontrolname="email"][type="email"][readonly], ' +
          'input[type="email"][readonly]'
      )
      .first();

    // OTP input field
    // HTML: input[ng-reflect-name="otp"][type="text"][placeholder="Enter your OTP"]
    this.otpInput = page
      .locator(
        'input[ng-reflect-name="otp"][type="text"], ' +
          'input[placeholder="Enter your OTP"], ' +
          'input[formcontrolname="otp"][type="text"]'
      )
      .first();

    // New Password input field
    // HTML: input[ng-reflect-name="password"][type="password"][placeholder="Enter your new password"]
    this.newPasswordInput = page
      .locator(
        'input[ng-reflect-name="password"][type="password"], ' +
          'input[placeholder="Enter your new password"], ' +
          'input[formcontrolname="password"][type="password"]'
      )
      .first();

    // Confirm Password input field
    // HTML: input[ng-reflect-name="confirmPassword"][type="password"][placeholder="Re-enter your new password"]
    this.confirmPasswordInput = page
      .locator(
        'input[ng-reflect-name="confirmPassword"][type="password"], ' +
          'input[placeholder="Re-enter your new password"], ' +
          'input[formcontrolname="confirmPassword"][type="password"]'
      )
      .first();

    // OTP validation error
    // HTML: div.error-message.mt-1 span:has-text("OTP is required.")
    this.otpError = page
      .locator(
        'div.error-message.mt-1 span:has-text("OTP is required"), ' +
          'div.error-message span:has-text("OTP is required"), ' +
          'div.error-message:has-text("OTP is required")'
      )
      .first();

    // Password validation error
    // HTML: div.error-message.mt-1 span:has-text("Password is required.")
    this.passwordError = page
      .locator(
        'div.error-message.mt-1 span:has-text("Password is required"), ' +
          'div.error-message span:has-text("Password is required"), ' +
          'div.error-message:has-text("Password is required")'
      )
      .first();

    // Confirm Password validation error (required, mismatch, etc.)
    // HTML: div.error-message.mt-1 span (any confirm password validation error)
    this.confirmPasswordError = page
      .locator(
        'input[ng-reflect-name="confirmPassword"] ~ div.error-message span, ' +
          'input[formcontrolname="confirmPassword"] ~ div.error-message span, ' +
          'input[placeholder*="Re-enter"] ~ div.error-message span, ' +
          'div.error-message.mt-1 span:has-text("Confirm Password"), ' +
          'div.error-message span:has-text("Confirm Password"), ' +
          'div.error-message:has-text("Confirm Password"), ' +
          'div.error-message:has-text("Password mismatch"), ' +
          'div.error-message:has-text("mismatch"), ' +
          'div.error-message:has-text("do not match")'
      )
      .first();

    // Change Password button
    // HTML: button.primary-btn.w-100.mb-2:has-text("Change Password")
    this.changePasswordButton = page
      .locator(
        'button.primary-btn.w-100.mb-2:has-text("Change Password"), ' +
          'button.primary-btn:has-text("Change Password"), ' +
          'button[type="submit"]:has-text("Change Password")'
      )
      .first();

    // Resend OTP button (optional, may be disabled with timer)
    // HTML: button.resend-otp:has-text("Resend OTP")
    this.resendOtpButton = page
      .locator('button.resend-otp:has-text("Resend OTP"), button:has-text("Resend OTP")')
      .first();

    // ========= Toast / notification locators =========
    this.toastContainer = page.locator('#toast-container').first();
    this.successToast = this.toastContainer
      .locator('.toast-success, .toastr-success, [class*="toast-success"]')
      .first();
    this.errorToast = this.toastContainer
      .locator('.toast-error, .toast-danger, .toastr-error, [class*="toast-error"]')
      .first();
    this.toastMessage = this.toastContainer.locator('.toast-message, [role="alert"]').first();
  }

  /**
   * Navigates to login page and opens Forgot Password modal/page.
   * @param {string} baseUrl
   */
  async openFromLogin(baseUrl) {
    const loginPage = new DashboardPage(this.page);
    await loginPage.goto(baseUrl);
    await this.page.waitForTimeout(1000);

    await loginPage.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
    await loginPage.forgotPasswordLink.click();

    await this.forgotPasswordHeading.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ===== Forgot Password page actions =====

  async enterEmail(email) {
    await this.emailInput.fill(email || '');
  }

  async clickRequestOtp() {
    await this.requestOtpButton.click();
    // Wait for either navigation to Reset Password page or error to appear
    try {
      // Wait for navigation response - check multiple indicators
      await Promise.race([
        // Check if Reset Password page appears
        this.resetPasswordHeading.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {}),
        this.otpInput.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {}),
        // Check if error appears
        this.errorToast.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {}),
        this.emailError.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {})
      ]);
    } catch {
      // Continue if none of them appear within timeout - let the test handle verification
    }
    // Additional wait for any async operations to complete
    await this.page.waitForTimeout(1000);
  }

  async isEmailErrorVisible() {
    try {
      // Strategy 1: Check the primary emailError locator
      const primaryVisible = await this.emailError.isVisible({ timeout: 3000 }).catch(() => false);
      if (primaryVisible) return true;

      // Strategy 2: Look for any error message near the email input
      const emailInputParent = this.emailInput.locator('..');
      const nearbyError = emailInputParent
        .locator('div.error-message span, div.error-message, span.error-message')
        .first();
      const nearbyVisible = await nearbyError.isVisible({ timeout: 1000 }).catch(() => false);
      if (nearbyVisible) return true;

      // Strategy 3: Look for error message in the form group containing email input
      const formGroup = this.page.locator('form .form-group:has(input[type="email"])').first();
      const formGroupError = formGroup.locator('div.error-message span, div.error-message').first();
      const formGroupVisible = await formGroupError.isVisible({ timeout: 1000 }).catch(() => false);
      if (formGroupVisible) return true;

      // Strategy 4: Check Angular form validation state
      const emailInput = this.emailInput.first();
      const isInvalid = await emailInput.evaluate((el) => {
        return el.classList.contains('ng-invalid') && 
               el.classList.contains('ng-touched') && 
               el.classList.contains('ng-dirty');
      }).catch(() => false);
      
      if (isInvalid) {
        // If input is invalid, look for any visible error message on the page
        const anyError = this.page.locator('div.error-message:visible, span.error-message:visible').first();
        return await anyError.isVisible({ timeout: 1000 }).catch(() => false);
      }

      return false;
    } catch {
      return false;
    }
  }

  async getEmailErrorMessage() {
    try {
      // Strategy 1: Try primary emailError locator
      const primaryVisible = await this.emailError.isVisible({ timeout: 1000 }).catch(() => false);
      if (primaryVisible) {
        const msg = await this.emailError.textContent();
        if (msg && msg.trim()) return msg.trim();
      }

      // Strategy 2: Look for error message near email input
      const emailInputParent = this.emailInput.locator('..');
      const nearbyError = emailInputParent
        .locator('div.error-message span, div.error-message, span.error-message')
        .first();
      const nearbyVisible = await nearbyError.isVisible({ timeout: 1000 }).catch(() => false);
      if (nearbyVisible) {
        const msg = await nearbyError.textContent();
        if (msg && msg.trim()) return msg.trim();
      }

      // Strategy 3: Look in form group
      const formGroup = this.page.locator('form .form-group:has(input[type="email"])').first();
      const formGroupError = formGroup.locator('div.error-message span, div.error-message').first();
      const formGroupVisible = await formGroupError.isVisible({ timeout: 1000 }).catch(() => false);
      if (formGroupVisible) {
        const msg = await formGroupError.textContent();
        if (msg && msg.trim()) return msg.trim();
      }

      // Strategy 4: Get any visible error message
      const anyError = this.page.locator('div.error-message:visible span, span.error-message:visible').first();
      const anyVisible = await anyError.isVisible({ timeout: 1000 }).catch(() => false);
      if (anyVisible) {
        const msg = await anyError.textContent();
        if (msg && msg.trim()) return msg.trim();
      }

      return null;
    } catch {
      return null;
    }
  }

  async isOnForgotPasswordPage() {
    try {
      return await this.forgotPasswordHeading.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  // ===== Reset Password page actions =====

  async isOnResetPasswordPage() {
    try {
      // Strategy 1: Check for Reset Password heading
      const headingVisible = await this.resetPasswordHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (headingVisible) return true;

      // Strategy 2: Check if OTP input field is visible (indicates Reset Password page)
      const otpVisible = await this.otpInput.isVisible({ timeout: 3000 }).catch(() => false);
      if (otpVisible) return true;

      // Strategy 3: Check if Reset Email input (readonly) is visible
      const resetEmailVisible = await this.resetEmailInput.isVisible({ timeout: 3000 }).catch(() => false);
      if (resetEmailVisible) return true;

      // Strategy 4: Check if Change Password button is visible
      const changePasswordVisible = await this.changePasswordButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (changePasswordVisible) return true;

      return false;
    } catch {
      return false;
    }
  }

  async getResetEmailValue() {
    try {
      return await this.resetEmailInput.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Verifies that the email field on Reset Password page is readonly (not editable)
   * @returns {Promise<boolean>}
   */
  async isResetEmailReadonly() {
    try {
      const readonlyAttr = await this.resetEmailInput.getAttribute('readonly');
      const isDisabled = await this.resetEmailInput.isDisabled();
      // Field is readonly if it has readonly attribute or is disabled
      return readonlyAttr !== null || isDisabled;
    } catch {
      return false;
    }
  }

  async fillResetForm({ otp = '', password = '', confirmPassword = '' }) {
    if (otp !== null) {
      await this.otpInput.fill(otp);
    }
    if (password !== null) {
      await this.newPasswordInput.fill(password);
    }
    if (confirmPassword !== null) {
      await this.confirmPasswordInput.fill(confirmPassword);
    }
  }

  async clickChangePassword() {
    await this.changePasswordButton.click();
    await this.page.waitForTimeout(500);
  }

  async areResetRequiredErrorsVisible() {
    const results = {
      otp: false,
      password: false,
      confirmPassword: false
    };

    try {
      results.otp = await this.otpError.isVisible({ timeout: 3000 }).catch(() => false);
    } catch {}

    try {
      results.password = await this.passwordError.isVisible({ timeout: 3000 }).catch(() => false);
    } catch {}

    try {
      // Strategy 1: Check primary confirmPasswordError locator
      results.confirmPassword = await this.confirmPasswordError.isVisible({ timeout: 3000 }).catch(() => false);
      if (results.confirmPassword) return results;

      // Strategy 2: Look for error message near confirm password input
      const confirmPasswordInputParent = this.confirmPasswordInput.locator('..');
      const nearbyError = confirmPasswordInputParent
        .locator('div.error-message span, div.error-message, span.error-message')
        .first();
      results.confirmPassword = await nearbyError.isVisible({ timeout: 1000 }).catch(() => false);
      if (results.confirmPassword) return results;

      // Strategy 3: Look for error message in form group containing confirm password input
      const formGroup = this.page.locator('form .form-group:has(input[ng-reflect-name="confirmPassword"])').first();
      const formGroupError = formGroup.locator('div.error-message span, div.error-message').first();
      results.confirmPassword = await formGroupError.isVisible({ timeout: 1000 }).catch(() => false);
      if (results.confirmPassword) return results;

      // Strategy 4: Check Angular form validation state for confirm password
      const isInvalid = await this.confirmPasswordInput.evaluate((el) => {
        return el.classList.contains('ng-invalid') && 
               el.classList.contains('ng-touched') && 
               el.classList.contains('ng-dirty');
      }).catch(() => false);
      
      if (isInvalid) {
        // If input is invalid, look for any visible error message related to confirm password
        const anyError = this.page.locator('div.error-message:visible, span.error-message:visible')
          .filter({ hasText: /confirm|mismatch|match/i })
          .first();
        results.confirmPassword = await anyError.isVisible({ timeout: 1000 }).catch(() => false);
      }
    } catch {}

    return results;
  }

  // ===== Toast helpers =====

  async waitForSuccessToast(timeout = 5000) {
    try {
      const containerVisible = await this.toastContainer.isVisible({ timeout: 2000 }).catch(() => false);
      if (!containerVisible) return false;
      await this.successToast.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async waitForErrorToast(timeout = 5000) {
    try {
      const containerVisible = await this.toastContainer.isVisible({ timeout: 2000 }).catch(() => false);
      if (!containerVisible) return false;
      await this.errorToast.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async getToastMessage() {
    try {
      const msg = await this.toastMessage.textContent();
      return msg ? msg.trim() : '';
    } catch {
      return '';
    }
  }
}

module.exports = { ForgotPasswordPage };


