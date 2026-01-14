const { expect } = require('@playwright/test');

class ForgotPasswordPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ==================== LOGIN PAGE LOCATORS ====================
    
    // Email input field on login page
    this.loginEmailInput = page.locator('input[type="email"], input[id*="email"], input[name*="email"], input[placeholder*="Email" i]').first();
    
    // Password input field on login page
    this.loginPasswordInput = page.locator('input[type="password"], input[id*="password"], input[name*="password"]').first();
    
    // Forgot Password link
    this.forgotPasswordLink = page.locator(
      'a:has-text("Forgot Password"), ' +
      'a:has-text("Forgot password"), ' +
      'a:has-text("forgot password"), ' +
      'link:has-text("Forgot Password"), ' +
      'span:has-text("Forgot Password"), ' +
      'button:has-text("Forgot Password")'
    ).first();
    
    // Sign In button
    this.signInButton = page.locator(
      'button[type="submit"]:has-text("Sign In"), ' +
      'button:has-text("Sign In"), ' +
      'button:has-text("Login"), ' +
      'button:has-text("Log In")'
    ).first();

    // ==================== RESET PASSWORD PAGE LOCATORS ====================
    
    // Page heading "Reset Password"
    this.resetPasswordHeading = page.locator(
      'h1:has-text("Reset Password"), ' +
      'h2:has-text("Reset Password"), ' +
      'h3:has-text("Reset Password"), ' +
      'h4:has-text("Reset Password"), ' +
      'h5:has-text("Reset Password"), ' +
      'span:has-text("Reset Password"), ' +
      'div:has-text("Reset Password"):not(div.sidebar-items)'
    ).first();
    
    // Email input field on reset password page
    this.resetEmailInput = page.locator('input[type="email"], input[id*="email"], input[name*="email"], input[placeholder*="Email" i]').first();
    
    // Request OTP button
    this.requestOtpButton = page.locator(
      'button:has-text("Request OTP"), ' +
      'button:has-text("Request Otp"), ' +
      'button:has-text("Send OTP"), ' +
      'button[type="submit"]'
    ).first();
    
    // Login link (to go back to login page)
    this.loginLink = page.locator(
      'a:has-text("Login"), ' +
      'a:has-text("Log In"), ' +
      'a:has-text("Sign In"), ' +
      'link:has-text("Login"), ' +
      'span:has-text("Login"), ' +
      'button:has-text("Login")'
    ).first();

    // ==================== RESET PASSWORD FORM FIELDS (After OTP is sent) ====================
    
    // Email field (may be prefilled and disabled)
    this.resetPageEmailInput = page.locator('input[type="email"][id*="email"], input[type="email"][name*="email"], input[type="email"][placeholder*="Email" i]').first();
    
    // OTP input field
    this.otpInput = page.locator(
      'input[type="text"][id*="otp"], ' +
      'input[type="number"][id*="otp"], ' +
      'input[name*="otp"], ' +
      'input[placeholder*="OTP" i], ' +
      'input[placeholder*="Enter OTP" i]'
    ).first();
    
    // New Password input field
    this.newPasswordInput = page.locator(
      'input[type="password"][id*="password"], ' +
      'input[type="password"][name*="password"], ' +
      'input[type="password"][placeholder*="Password" i], ' +
      'input[type="password"][placeholder*="New Password" i], ' +
      'input[type="password"][placeholder*="Enter Password" i]'
    ).first();
    
    // Confirm Password input field (Re-enter Password)
    this.confirmPasswordInput = page.locator(
      'input[type="password"][id*="confirm"], ' +
      'input[type="password"][name*="confirm"], ' +
      'input[type="password"][placeholder*="Confirm" i], ' +
      'input[type="password"][placeholder*="Confirm Password" i], ' +
      'input[type="password"][placeholder*="Re-enter Password" i]'
    ).first();
    
    // Change Password button
    this.changePasswordButton = page.locator(
      'button:has-text("Change Password"), ' +
      'button:has-text("Reset Password"), ' +
      'button[type="submit"]:has-text("Change"), ' +
      'button[type="submit"]:has-text("Reset")'
    ).first();
    
    // Resend OTP button
    this.resendOtpButton = page.locator(
      'button:has-text("Resend OTP"), ' +
      'button:has-text("Resend"), ' +
      'a:has-text("Resend OTP"), ' +
      'a:has-text("Resend")'
    ).first();
    
    // Resend OTP countdown timer
    this.resendOtpTimer = page.locator(
      'small.text-secondary:has-text("00:"), ' +
      'small:has-text(":"), ' +
      'span:has-text("Resend"), ' +
      'div:has-text("Resend"), ' +
      '[class*="timer"], ' +
      '[class*="countdown"]'
    ).first();
    
    // Password visibility toggle (eye icon) - for new password
    this.passwordVisibilityToggle = page.locator(
      'input#password ~ span.input-group-text.password-icon, ' +
      'input[id="password"] ~ span.input-group-text i.bi-eye, ' +
      'input[id="password"] ~ span.input-group-text i.bi-eye-slash, ' +
      'span.password-icon:has(i.bi-eye), ' +
      'span.password-icon:has(i.bi-eye-slash)'
    ).first();
    
    // Confirm password visibility toggle
    this.confirmPasswordVisibilityToggle = page.locator(
      'input#confirmPassword ~ span.input-group-text.password-icon, ' +
      'input[id="confirmPassword"] ~ span.input-group-text i.bi-eye, ' +
      'input[id="confirmPassword"] ~ span.input-group-text i.bi-eye-slash'
    ).first();
    
    // Password mismatch error
    this.passwordMismatchError = page.locator(
      'mat-error:has-text("match"), ' +
      'div.error:has-text("match"), ' +
      'div:has-text("password mismatch"), ' +
      'div:has-text("passwords do not match")'
    ).first();
    
    // Password policy error
    this.passwordPolicyError = page.locator(
      'mat-error:has-text("password"), ' +
      'div.error:has-text("password"), ' +
      'div:has-text("password must"), ' +
      'div:has-text("password should"), ' +
      'div:has-text("minimum"), ' +
      'div:has-text("special character")'
    ).first();

    // ==================== VALIDATION/ERROR MESSAGE LOCATORS ====================
    
    // Error message (div.error-message)
    this.errorMessage = page.locator(
      'div.error-message, ' +
      'div.error, ' +
      'div.text-danger, ' +
      'mat-error, ' +
      'div:has-text("error"), ' +
      'div:has-text("invalid"), ' +
      'div:has-text("required")'
    ).first();
    
    // All error messages
    this.allErrorMessages = page.locator('div.error-message.ng-star-inserted');
    
    // Email validation error
    this.emailValidationError = page.locator(
      'div.error-message:has-text("email"), ' +
      'mat-error:has-text("email"), ' +
      'div.error:has-text("email"), ' +
      'div.text-danger:has-text("email"), ' +
      'div:has-text("invalid email"), ' +
      'div:has-text("email format"), ' +
      'div:has-text("required")'
    ).first();
    
    // OTP validation error
    this.otpValidationError = page.locator(
      'div.error-message:has-text("OTP"), ' +
      'div.error-message:has-text("otp"), ' +
      'div:has-text("OTP is required"), ' +
      'div.error-message:has-text("Please enter valid 6 digit OTP"), ' +
      'div:has-text("Please enter valid 6 digit OTP"), ' +
      'div:has-text("valid 6 digit OTP")'
    ).first();
    
    // Password validation error
    this.passwordValidationError = page.locator(
      'div.error-message:has-text("Password is required"), ' +
      'div.error-message:has-text("password"), ' +
      'div:has-text("Password is required")'
    ).first();
    
    // Re-enter Password validation error
    this.reEnterPasswordValidationError = page.locator(
      'div.error-message:has-text("Re-enter Password"), ' +
      'div.error-message:has-text("re-enter"), ' +
      'div:has-text("Re-enter Password is required")'
    ).first();
    
    // User not found error (toast or error message)
    this.userNotFoundError = page.locator(
      'div#toast-container div:has-text("User not found"), ' +
      'div.toast-container div:has-text("User not found"), ' +
      'div#toast-container div:has-text("user not found"), ' +
      'div.toast-container div:has-text("user not found"), ' +
      'div#toast-container div:has-text("not registered"), ' +
      'div.toast-container div:has-text("not registered"), ' +
      'div:has-text("User not found"), ' +
      'div:has-text("user not found"), ' +
      'div:has-text("User does not exist"), ' +
      'div:has-text("Email not registered"), ' +
      'div:has-text("Partner not registered")'
    ).first();
    
    // Invalid OTP error (toast message)
    this.invalidOtpError = page.locator(
      'div#toast-container div:has-text("invalid"), ' +
      'div.toast-container div:has-text("invalid"), ' +
      'div[role="alert"]:has-text("invalid"), ' +
      'div[role="alert"]:has-text("required"), ' +
      'div[role="alert"].toast-message:has-text("hash"), ' +
      'div:has-text("invalid OTP"), ' +
      'div:has-text("OTP invalid"), ' +
      'div:has-text("fields are required")'
    ).first();

    // ==================== TOAST/SUCCESS MESSAGE LOCATORS ====================
    
    // Toast container
    this.toastContainer = page.locator('div#toast-container, div.toast-container, div[class*="toast-container"]').first();
    
    // Success toast/message
    this.successToast = page.locator(
      'div#toast-container div.toast-success, ' +
      'div.toast-container div.toast-success, ' +
      'div#toast-container div.toast:has-text("success"), ' +
      'div.toast-container div.toast:has-text("success"), ' +
      'div#toast-container div:has-text("OTP sent successfully"), ' +
      'div.toast-container div:has-text("OTP sent successfully"), ' +
      'div#toast-container div:has-text("OTP sent"), ' +
      'div.toast-container div:has-text("OTP sent"), ' +
      'div.toast-success, ' +
      'div.toast:has-text("success"), ' +
      'div[role="alert"]:has-text("success"), ' +
      'div:has-text("OTP sent successfully"), ' +
      'div:has-text("OTP sent"), ' +
      'div:has-text("successfully")'
    ).first();

    // ==================== LOADER LOCATORS ====================
    
    // Loader/spinner
    this.loader = page.locator(
      'div.loader, ' +
      'div.spinner, ' +
      'div[class*="loading"], ' +
      'div[class*="spinner"], ' +
      'mat-spinner, ' +
      '[role="progressbar"]'
    ).first();
  }

  /**
   * Navigate to login page
   */
  async gotoLoginPage(url) {
    try {
      console.log(`  Navigating to login page: ${url}`);
      await this.page.goto(url);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log('  ✓ Navigated to login page');
    } catch (error) {
      console.log(`  ⚠ Error navigating to login page: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify email input field is visible on login page
   */
  async isLoginEmailInputVisible() {
    try {
      const visible = await this.loginEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify password input field is visible on login page
   */
  async isLoginPasswordInputVisible() {
    try {
      const visible = await this.loginPasswordInput.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify Forgot Password link is visible
   */
  async isForgotPasswordLinkVisible() {
    try {
      const visible = await this.forgotPasswordLink.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify Sign In button is visible
   */
  async isSignInButtonVisible() {
    try {
      const visible = await this.signInButton.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Click Forgot Password link
   */
  async clickForgotPasswordLink() {
    try {
      await this.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.forgotPasswordLink.scrollIntoViewIfNeeded();
      await this.forgotPasswordLink.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      console.log('  ✓ Clicked Forgot Password link');
    } catch (error) {
      console.log(`  ⚠ Error clicking Forgot Password link: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify Reset Password page is loaded
   */
  async isResetPasswordPageVisible() {
    try {
      const headingVisible = await this.resetPasswordHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (headingVisible) return true;
      
      // Alternative: Check if URL contains reset or forgot
      const url = this.page.url();
      if (url.toLowerCase().includes('reset') || url.toLowerCase().includes('forgot')) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get Reset Password heading text
   */
  async getResetPasswordHeadingText() {
    try {
      const text = await this.resetPasswordHeading.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify email input field is visible on reset password page
   */
  async isResetEmailInputVisible() {
    try {
      const visible = await this.resetEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify Request OTP button is visible
   */
  async isRequestOtpButtonVisible() {
    try {
      const visible = await this.requestOtpButton.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify Request OTP button is enabled
   */
  async isRequestOtpButtonEnabled() {
    try {
      const enabled = await this.requestOtpButton.isEnabled();
      return enabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get email input placeholder text
   */
  async getEmailInputPlaceholder() {
    try {
      const placeholder = await this.resetEmailInput.getAttribute('placeholder');
      return placeholder ? placeholder.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Get Request OTP button text
   */
  async getRequestOtpButtonText() {
    try {
      const text = await this.requestOtpButton.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Enter email in reset password page
   */
  async enterEmail(email) {
    try {
      await this.resetEmailInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.resetEmailInput.clear();
      await this.resetEmailInput.fill(email);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered email: ${email}`);
    } catch (error) {
      console.log(`  ⚠ Error entering email: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get email input value
   */
  async getEmailValue() {
    try {
      const value = await this.resetEmailInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Click Request OTP button
   */
  async clickRequestOtpButton() {
    try {
      await this.requestOtpButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.requestOtpButton.scrollIntoViewIfNeeded();
      await this.requestOtpButton.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Request OTP button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Request OTP button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify email validation error is visible
   */
  async isEmailValidationErrorVisible() {
    try {
      await this.page.waitForTimeout(500);
      const visible = await this.emailValidationError.isVisible({ timeout: 3000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify any error message is visible
   */
  async isAnyErrorMessageVisible() {
    try {
      await this.page.waitForTimeout(500);
      
      // Check if any error message is visible
      const errorCount = await this.allErrorMessages.count();
      for (let i = 0; i < errorCount; i++) {
        const error = this.allErrorMessages.nth(i);
        if (await error.isVisible({ timeout: 2000 }).catch(() => false)) {
          return true;
        }
      }
      
      // Fallback to general error message locator
      const visible = await this.errorMessage.isVisible({ timeout: 2000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get email validation error text
   */
  async getEmailValidationErrorText() {
    try {
      await this.page.waitForTimeout(500);
      if (await this.emailValidationError.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await this.emailValidationError.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify error message is visible (checks both form errors and toast messages)
   */
  async isErrorMessageVisible() {
    try {
      await this.page.waitForTimeout(500);
      
      // Check form error messages
      const formErrorVisible = await this.isAnyErrorMessageVisible();
      if (formErrorVisible) {
        return true;
      }
      
      // Check toast container for error messages
      const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
      if (await toastContainer.isVisible({ timeout: 2000 }).catch(() => false)) {
        const toast = toastContainer.locator('div[role="alert"], div.toast-message').first();
        if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
          const text = await toast.textContent();
          // Check if it's an error message (not success)
          if (text && !text.toLowerCase().includes('success') && !text.toLowerCase().includes('sent')) {
            return true;
          }
        }
      }
      
      // Check invalid OTP error
      if (await this.invalidOtpError.isVisible({ timeout: 2000 }).catch(() => false)) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get general error message text
   */
  async getErrorMessageText() {
    try {
      await this.page.waitForTimeout(500);
      
      // Try to get from all error messages (get first visible one)
      const errorCount = await this.allErrorMessages.count();
      for (let i = 0; i < errorCount; i++) {
        const error = this.allErrorMessages.nth(i);
        if (await error.isVisible({ timeout: 2000 }).catch(() => false)) {
          const text = await error.textContent();
          if (text && text.trim().length > 0) {
            return text.trim();
          }
        }
      }
      
      // Fallback to general error message locator
      if (await this.errorMessage.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await this.errorMessage.textContent();
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      }
      
      // Check toast container for error messages
      const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
      if (await toastContainer.isVisible({ timeout: 2000 }).catch(() => false)) {
        const toast = toastContainer.locator('div[role="alert"], div.toast-message').first();
        if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
          const text = await toast.textContent();
          if (text && text.trim().length > 0) {
            return text.trim();
          }
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Get all error messages text
   */
  async getAllErrorMessagesText() {
    try {
      await this.page.waitForTimeout(500);
      const errors = [];
      
      const errorCount = await this.allErrorMessages.count();
      for (let i = 0; i < errorCount; i++) {
        const error = this.allErrorMessages.nth(i);
        if (await error.isVisible({ timeout: 1000 }).catch(() => false)) {
          const text = await error.textContent();
          if (text && text.trim().length > 0) {
            errors.push(text.trim());
          }
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Verify invalid OTP error is visible
   */
  async isInvalidOtpErrorVisible() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check toast container for invalid OTP error
      const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
      if (await toastContainer.isVisible({ timeout: 2000 }).catch(() => false)) {
        const toast = toastContainer.locator('div[role="alert"], div.toast-message').first();
        if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
          const text = await toast.textContent();
          if (text && (text.toLowerCase().includes('invalid') || text.toLowerCase().includes('required') || text.toLowerCase().includes('hash'))) {
            return true;
          }
        }
      }
      
      // Check invalid OTP error locator
      if (await this.invalidOtpError.isVisible({ timeout: 2000 }).catch(() => false)) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get invalid OTP error text
   */
  async getInvalidOtpErrorText() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check toast container
      const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
      if (await toastContainer.isVisible({ timeout: 2000 }).catch(() => false)) {
        const toast = toastContainer.locator('div[role="alert"], div.toast-message').first();
        if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
          const text = await toast.textContent();
          if (text && (text.toLowerCase().includes('invalid') || text.toLowerCase().includes('required') || text.toLowerCase().includes('hash'))) {
            return text.trim();
          }
        }
      }
      
      // Check invalid OTP error locator
      if (await this.invalidOtpError.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await this.invalidOtpError.textContent();
        return text ? text.trim() : '';
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify any error message is visible
   */
  async isAnyErrorMessageVisible() {
    try {
      await this.page.waitForTimeout(500);
      
      // Check if any error message is visible
      const errorCount = await this.allErrorMessages.count();
      for (let i = 0; i < errorCount; i++) {
        const error = this.allErrorMessages.nth(i);
        if (await error.isVisible({ timeout: 2000 }).catch(() => false)) {
          return true;
        }
      }
      
      // Fallback to general error message locator
      const visible = await this.errorMessage.isVisible({ timeout: 2000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify user not found error is visible
   */
  async isUserNotFoundErrorVisible() {
    try {
      await this.page.waitForTimeout(1500);
      
      const strategies = [
        // Strategy 1: Check toast container for error messages
        async () => {
          const container = this.toastContainer;
          if (await container.isVisible({ timeout: 2000 }).catch(() => false)) {
            const toast = container.locator('div:has-text("not found"), div:has-text("not registered"), div:has-text("not exist")').first();
            return await toast.isVisible({ timeout: 3000 }).catch(() => false);
          }
          return false;
        },
        // Strategy 2: Check user not found error locator
        async () => {
          const error = this.userNotFoundError;
          return await error.isVisible({ timeout: 3000 }).catch(() => false);
        },
        // Strategy 3: Check toast container directly
        async () => {
          const toast = this.page.locator('div#toast-container div:has-text("User not found"), div.toast-container div:has-text("User not found")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        },
        // Strategy 4: Check for any error message
        async () => {
          const toast = this.page.locator('div:has-text("User not found"), div:has-text("user not found")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        }
      ];

      for (const strategy of strategies) {
        try {
          const visible = await strategy();
          if (visible) return true;
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user not found error text
   */
  async getUserNotFoundErrorText() {
    try {
      await this.page.waitForTimeout(1500);
      
      const strategies = [
        // Strategy 1: Get from toast container
        async () => {
          const container = this.toastContainer;
          if (await container.isVisible({ timeout: 2000 }).catch(() => false)) {
            const toast = container.locator('div:has-text("not found"), div:has-text("not registered"), div:has-text("not exist")').first();
            if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
              const text = await toast.textContent();
              return text ? text.trim() : '';
            }
          }
          return '';
        },
        // Strategy 2: Get from user not found error locator
        async () => {
          if (await this.userNotFoundError.isVisible({ timeout: 2000 }).catch(() => false)) {
            const text = await this.userNotFoundError.textContent();
            return text ? text.trim() : '';
          }
          return '';
        },
        // Strategy 3: Get from toast container directly
        async () => {
          const toast = this.page.locator('div#toast-container div:has-text("User not found"), div.toast-container div:has-text("User not found")').first();
          if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
            const text = await toast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        },
        // Strategy 4: Get from any error message
        async () => {
          const toast = this.page.locator('div:has-text("User not found"), div:has-text("user not found")').first();
          if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
            const text = await toast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        }
      ];

      for (const strategy of strategies) {
        try {
          const text = await strategy();
          if (text && text.length > 0) {
            return text;
          }
        } catch (e) {
          continue;
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify if navigated to reset password page (after OTP is sent)
   * This checks if we're on a page with OTP, password, and confirm password fields
   * If partner is registered by admin, these fields will be visible
   */
  async isOnResetPasswordPage() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check for OTP input field
      const otpVisible = await this.otpInput.isVisible({ timeout: 3000 }).catch(() => false);
      // Check for New Password input field
      const passwordVisible = await this.newPasswordInput.isVisible({ timeout: 3000 }).catch(() => false);
      // Check for Confirm Password input field
      const confirmPasswordVisible = await this.confirmPasswordInput.isVisible({ timeout: 3000 }).catch(() => false);
      
      // All three fields should be visible if on reset password page
      if (otpVisible && passwordVisible && confirmPasswordVisible) {
        return true;
      }
      
      // Alternative: Check URL
      const url = this.page.url();
      if (url.toLowerCase().includes('reset') || url.toLowerCase().includes('otp')) {
        return true;
      }
      
      // Alternative: Check for reset password heading
      const headingVisible = await this.resetPasswordHeading.isVisible({ timeout: 2000 }).catch(() => false);
      return headingVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify if reset password form fields are visible
   * Returns object with visibility status of each field
   */
  async areResetPasswordFieldsVisible() {
    try {
      await this.page.waitForTimeout(1000);
      
      const otpVisible = await this.otpInput.isVisible({ timeout: 3000 }).catch(() => false);
      const passwordVisible = await this.newPasswordInput.isVisible({ timeout: 3000 }).catch(() => false);
      const confirmPasswordVisible = await this.confirmPasswordInput.isVisible({ timeout: 3000 }).catch(() => false);
      
      return {
        otp: otpVisible,
        password: passwordVisible,
        confirmPassword: confirmPasswordVisible,
        allVisible: otpVisible && passwordVisible && confirmPasswordVisible
      };
    } catch (error) {
      return {
        otp: false,
        password: false,
        confirmPassword: false,
        allVisible: false
      };
    }
  }

  /**
   * Verify if partner is not registered (fields are NOT visible)
   * If partner is not registered by admin, OTP, password, and confirm password fields will NOT be visible
   */
  async isPartnerNotRegistered() {
    try {
      await this.page.waitForTimeout(2000);
      
      // Check if reset password fields are NOT visible
      const fields = await this.areResetPasswordFieldsVisible();
      
      // If none of the fields are visible, partner is likely not registered
      if (!fields.otp && !fields.password && !fields.confirmPassword) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify success toast is visible
   */
  async isSuccessToastVisible() {
    try {
      await this.page.waitForTimeout(1500);
      
      const strategies = [
        // Strategy 1: Check toast container for success messages
        async () => {
          const container = this.toastContainer;
          if (await container.isVisible({ timeout: 2000 }).catch(() => false)) {
            const toast = container.locator('div:has-text("OTP"), div:has-text("success"), div:has-text("sent")').first();
            return await toast.isVisible({ timeout: 3000 }).catch(() => false);
          }
          return false;
        },
        // Strategy 2: Check for success toast directly
        async () => {
          const toast = this.successToast;
          return await toast.isVisible({ timeout: 5000 }).catch(() => false);
        },
        // Strategy 3: Check for OTP sent messages in toast container
        async () => {
          const toast = this.page.locator('div#toast-container div:has-text("OTP sent"), div.toast-container div:has-text("OTP sent")').first();
          return await toast.isVisible({ timeout: 5000 }).catch(() => false);
        },
        // Strategy 4: Check for any success message
        async () => {
          const toast = this.page.locator('div:has-text("OTP sent successfully"), div:has-text("OTP sent")').first();
          return await toast.isVisible({ timeout: 5000 }).catch(() => false);
        }
      ];

      for (const strategy of strategies) {
        try {
          const visible = await strategy();
          if (visible) return true;
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get success toast text
   */
  async getSuccessToastText() {
    try {
      await this.page.waitForTimeout(1500);
      
      const strategies = [
        // Strategy 1: Get from toast container
        async () => {
          const container = this.toastContainer;
          if (await container.isVisible({ timeout: 2000 }).catch(() => false)) {
            const toast = container.locator('div:has-text("OTP"), div:has-text("success"), div:has-text("sent")').first();
            if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
              const text = await toast.textContent();
              return text ? text.trim() : '';
            }
          }
          return '';
        },
        // Strategy 2: Get from success toast locator
        async () => {
          if (await this.successToast.isVisible({ timeout: 3000 }).catch(() => false)) {
            const text = await this.successToast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        },
        // Strategy 3: Get from toast container directly
        async () => {
          const toast = this.page.locator('div#toast-container div:has-text("OTP sent"), div.toast-container div:has-text("OTP sent")').first();
          if (await toast.isVisible({ timeout: 3000 }).catch(() => false)) {
            const text = await toast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        },
        // Strategy 4: Get from any success message
        async () => {
          const toast = this.page.locator('div:has-text("OTP sent successfully"), div:has-text("OTP sent")').first();
          if (await toast.isVisible({ timeout: 3000 }).catch(() => false)) {
            const text = await toast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        }
      ];

      for (const strategy of strategies) {
        try {
          const text = await strategy();
          if (text && text.length > 0) {
            return text;
          }
        } catch (e) {
          continue;
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Click Login link to go back to login page
   */
  async clickLoginLink() {
    try {
      await this.loginLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.loginLink.scrollIntoViewIfNeeded();
      await this.loginLink.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      console.log('  ✓ Clicked Login link');
    } catch (error) {
      console.log(`  ⚠ Error clicking Login link: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify login page is visible
   */
  async isLoginPageVisible() {
    try {
      const emailVisible = await this.isLoginEmailInputVisible();
      const passwordVisible = await this.isLoginPasswordInputVisible();
      return emailVisible && passwordVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify loader is visible
   */
  async isLoaderVisible() {
    try {
      const visible = await this.loader.isVisible({ timeout: 2000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Wait for loader to disappear
   */
  async waitForLoaderToDisappear(timeout = 10000) {
    try {
      await this.page.waitForTimeout(500);
      if (await this.isLoaderVisible()) {
        await this.loader.waitFor({ state: 'hidden', timeout }).catch(() => {});
      }
    } catch (error) {
      // Loader might not be present, which is fine
    }
  }

  /**
   * Verify email format is valid
   */
  isValidEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Verify error message is cleared when valid email is entered
   */
  async verifyErrorMessageCleared() {
    try {
      await this.page.waitForTimeout(500);
      const errorVisible = await this.isEmailValidationErrorVisible();
      return !errorVisible;
    } catch (error) {
      return false;
    }
  }

  // ==================== RESET PASSWORD PAGE METHODS ====================

  /**
   * Verify email field is visible on reset password page
   */
  async isResetPageEmailInputVisible() {
    try {
      const visible = await this.resetPageEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get email value from reset password page
   */
  async getResetPageEmailValue() {
    try {
      const value = await this.resetPageEmailInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Check if email field is disabled
   */
  async isResetPageEmailDisabled() {
    try {
      const disabled = await this.resetPageEmailInput.isDisabled();
      return disabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Enter OTP
   */
  async enterOtp(otp) {
    try {
      await this.otpInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.otpInput.clear();
      await this.otpInput.fill(otp);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered OTP: ${otp}`);
    } catch (error) {
      console.log(`  ⚠ Error entering OTP: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get OTP value
   */
  async getOtpValue() {
    try {
      const value = await this.otpInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Enter new password
   */
  async enterNewPassword(password) {
    try {
      await this.newPasswordInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.newPasswordInput.clear();
      await this.newPasswordInput.fill(password);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered new password`);
    } catch (error) {
      console.log(`  ⚠ Error entering new password: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get new password value
   */
  async getNewPasswordValue() {
    try {
      const value = await this.newPasswordInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Enter confirm password
   */
  async enterConfirmPassword(password) {
    try {
      await this.confirmPasswordInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.confirmPasswordInput.clear();
      await this.confirmPasswordInput.fill(password);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered confirm password`);
    } catch (error) {
      console.log(`  ⚠ Error entering confirm password: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get confirm password value
   */
  async getConfirmPasswordValue() {
    try {
      const value = await this.confirmPasswordInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify Change Password button is visible
   */
  async isChangePasswordButtonVisible() {
    try {
      const visible = await this.changePasswordButton.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify Change Password button is enabled
   */
  async isChangePasswordButtonEnabled() {
    try {
      const enabled = await this.changePasswordButton.isEnabled();
      return enabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Click Change Password button
   */
  async clickChangePasswordButton() {
    try {
      await this.changePasswordButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.changePasswordButton.scrollIntoViewIfNeeded();
      await this.changePasswordButton.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      console.log('  ✓ Clicked Change Password button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Change Password button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify Resend OTP button is visible
   */
  async isResendOtpButtonVisible() {
    try {
      const visible = await this.resendOtpButton.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify Resend OTP button is enabled
   */
  async isResendOtpButtonEnabled() {
    try {
      const enabled = await this.resendOtpButton.isEnabled();
      return enabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Click Resend OTP button
   */
  async clickResendOtpButton() {
    try {
      await this.resendOtpButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.resendOtpButton.scrollIntoViewIfNeeded();
      await this.resendOtpButton.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Resend OTP button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Resend OTP button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get Resend OTP timer text
   */
  async getResendOtpTimerText() {
    try {
      const text = await this.resendOtpTimer.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Wait for Resend OTP timer to finish
   */
  async waitForResendOtpTimerToFinish(maxWaitTime = 60000) {
    try {
      const startTime = Date.now();
      while (Date.now() - startTime < maxWaitTime) {
        const enabled = await this.isResendOtpButtonEnabled();
        if (enabled) {
          console.log('  ✓ Resend OTP button is now enabled');
          return true;
        }
        await this.page.waitForTimeout(1000);
      }
      console.log('  ⚠ Resend OTP timer did not finish within timeout');
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify password visibility toggle is visible
   */
  async isPasswordVisibilityToggleVisible() {
    try {
      const visible = await this.passwordVisibilityToggle.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Toggle password visibility (for new password field)
   */
  async togglePasswordVisibility() {
    try {
      await this.passwordVisibilityToggle.waitFor({ state: 'visible', timeout: 5000 });
      await this.passwordVisibilityToggle.click();
      await this.page.waitForTimeout(500);
      console.log('  ✓ Toggled password visibility');
    } catch (error) {
      console.log(`  ⚠ Error toggling password visibility: ${error.message}`);
      throw error;
    }
  }

  /**
   * Toggle confirm password visibility
   */
  async toggleConfirmPasswordVisibility() {
    try {
      await this.confirmPasswordVisibilityToggle.waitFor({ state: 'visible', timeout: 5000 });
      await this.confirmPasswordVisibilityToggle.click();
      await this.page.waitForTimeout(500);
      console.log('  ✓ Toggled confirm password visibility');
    } catch (error) {
      console.log(`  ⚠ Error toggling confirm password visibility: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if password is visible (not masked)
   */
  async isPasswordVisible() {
    try {
      const inputType = await this.newPasswordInput.getAttribute('type');
      return inputType === 'text';
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify password mismatch error is visible
   */
  async isPasswordMismatchErrorVisible() {
    try {
      await this.page.waitForTimeout(500);
      const visible = await this.passwordMismatchError.isVisible({ timeout: 3000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get password mismatch error text
   */
  async getPasswordMismatchErrorText() {
    try {
      if (await this.passwordMismatchError.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await this.passwordMismatchError.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify password policy error is visible
   */
  async isPasswordPolicyErrorVisible() {
    try {
      await this.page.waitForTimeout(500);
      const visible = await this.passwordPolicyError.isVisible({ timeout: 3000 }).catch(() => false);
      return visible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get password policy error text
   */
  async getPasswordPolicyErrorText() {
    try {
      if (await this.passwordPolicyError.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await this.passwordPolicyError.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify all fields are cleared (after page refresh)
   */
  async areAllFieldsCleared() {
    try {
      const otp = await this.getOtpValue();
      const password = await this.getNewPasswordValue();
      const confirmPassword = await this.getConfirmPasswordValue();
      
      return otp === '' && password === '' && confirmPassword === '';
    } catch (error) {
      return false;
    }
  }
}

module.exports = { ForgotPasswordPage };

