class ForgotPasswordPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login Page Elements
    this.loginPageEmailField = page.locator('input#email, input[name="email"], input[type="email"], input[placeholder*="email" i]').first();
    this.loginPagePasswordField = page.locator('input#password, input[name="password"], input[type="password"], input[placeholder*="password" i]').first();
    this.loginPageSubmitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")').first();
    this.loginPageWrapper = page.locator('.login-page, .login-container, [class*="login"], .auth-page, .signin-page').first();
    
    // Forgot Password Link on Login Page
    this.forgotPasswordLink = page.locator('a:has-text("Forgot Password"), a:has-text("forgot password"), a:has-text("Forgot password"), a:has-text("Forgot Password?"), a[href*="forgot"], a[href*="forgot-password"]').first();
    
    // Forgot Password Page Elements
    this.forgotPasswordPageWrapper = page.locator('.forgot-password-page, .forgot-password, [class*="forgot-password"], .reset-password-page').first();
    this.forgotPasswordPageTitle = page.locator('h1:has-text("Forgot Password"), h2:has-text("Forgot Password"), h1:has-text("Forgot Password!"), .page-title:has-text("Forgot Password")').first();
    this.forgotPasswordPageHeader = page.locator('.forgot-password-header, [class*="forgot-password-header"]').first();
    
    // Forgot Password Form Fields
    this.forgotPasswordForm = page.locator('form:has(input[type="email"]), form:has(input[name*="email"]), .forgot-password-form').first();
    this.forgotPasswordEmailField = page.locator('input#email, input[name="email"], input[type="email"], input[ng-reflect-name="email"], input[placeholder*="email" i]').first();
    this.resetPasswordButton = page.locator('button:has-text("Reset Password"), button[type="submit"]:has-text("Reset Password"), button.primary-btn:has-text("Reset Password")').first();
    
    // Forgot Password Validation Errors
    this.forgotPasswordValidationErrors = page.locator('.error-message span:has-text("It\'s mandatory field"), .error-message:has-text("mandatory"), .text-danger');
    this.forgotPasswordRequiredFieldErrors = page.locator('.error-message span:has-text("It\'s mandatory field"), .error-message:has-text("It\'s mandatory field")');
    this.forgotPasswordEmailValidationErrors = page.locator('.error-message span:has-text("Email is invalid"), .error-message:has-text("invalid"), .error-message:has-text("valid email")');
    
    // Login Link on Forgot Password Page
    this.loginLink = page.locator('a:has-text("Login"), a:has-text("login"), text=Login, a:has-text("Remembered your password"), a:has-text("Remembered"), *:has-text("Remembered your password? Login") a, *:has-text("Remembered") a').first();
    
    // Set New Password Page Elements (Check your email and Set a new password)
    this.setNewPasswordPageWrapper = page.locator('.set-password-page, .set-new-password, [class*="set-password"], [class*="set-new-password"]').first();
    this.setNewPasswordPageTitle = page.locator('h1:has-text("Check your email"), h2:has-text("Check your email"), h1:has-text("Set a new password"), p:has-text("Check your email and Set a new password")').first();
    
    // Set New Password Form Fields
    this.setNewPasswordForm = page.locator('form:has(input[ng-reflect-name="otp"]), form:has(input[name="otp"])').first();
    this.otpField = page.locator('input[ng-reflect-name="otp"], input[name="otp"], input[id="otp"], input[placeholder*="otp" i], input[placeholder*="6 digit" i]').first();
    this.newPasswordField = page.locator('input[ng-reflect-name="password"], input[name="password"][type="password"], input[id="password"][type="password"], input[placeholder*="new password" i]').first();
    this.confirmPasswordField = page.locator('input[ng-reflect-name="confirmPassword"], input[name="confirmPassword"], input[id="confirmPassword"], input[placeholder*="Re-enter password" i], input[placeholder*="confirm password" i]').first();
    this.submitButton = page.locator('form:has(input[ng-reflect-name="otp"]) button:has-text("Submit"), button[type="submit"]:has-text("Submit")').first();
    
    // Set New Password Validation Errors
    this.setNewPasswordValidationErrors = page.locator('form:has(input[ng-reflect-name="otp"]) .error-message span:has-text("It\'s mandatory field"), form:has(input[ng-reflect-name="otp"]) .error-message:has-text("mandatory")');
    this.setNewPasswordRequiredFieldErrors = page.locator('form:has(input[ng-reflect-name="otp"]) .error-message span:has-text("It\'s mandatory field")');
    this.passwordMismatchErrors = page.locator('.error-message:has-text("Password"), .error-message:has-text("match"), .error-message:has-text("not match")');
    this.passwordLengthErrors = page.locator('.error-message:has-text("at least 6 characters"), .error-message:has-text("6 characters")');
    this.otpValidationErrors = page.locator('.error-message:has-text("OTP"), .error-message:has-text("invalid"), .error-message:has-text("expired")');
    
    // Resend OTP Link
    this.resendOtpLink = page.locator('a:has-text("Resend Otp"), a:has-text("Resend OTP"), a:has-text("resend")').first();
    this.resendOtpTimer = page.locator('text=/\\d{2}:\\d{2}/, [class*="timer"], [class*="countdown"]').first();
  }

  /**
   * Navigates to the login page
   * @param {string} baseUrl - Base URL of the application
   */
  async gotoLoginPage(baseUrl) {
    try {
      await this.page.goto(baseUrl);
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
      
      // Wait for login page to load
      await Promise.race([
        this.loginPageEmailField.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}),
        this.loginPageWrapper.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {})
      ]);
    } catch (error) {
      throw new Error(`Failed to navigate to login page: ${error.message}`);
    }
  }

  /**
   * Checks if the login page is loaded
   * @returns {Promise<boolean>}
   */
  async isLoginPageLoaded() {
    try {
      return await this.loginPageEmailField.isVisible({ timeout: 5000 }) || 
             await this.loginPagePasswordField.isVisible({ timeout: 5000 }) ||
             await this.loginPageWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Forgot Password link is visible on login page
   * @returns {Promise<boolean>}
   */
  async isForgotPasswordLinkVisible() {
    try {
      return await this.forgotPasswordLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Forgot Password link on login page
   */
  async clickForgotPasswordLink() {
    try {
      await this.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.forgotPasswordLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.forgotPasswordLink.click();
      await this.page.waitForTimeout(2000); // Wait for navigation to forgot password page
    } catch (error) {
      throw new Error(`Failed to click Forgot Password link: ${error.message}`);
    }
  }

  /**
   * Checks if the Forgot Password page is loaded
   * @returns {Promise<boolean>}
   */
  async isForgotPasswordPageLoaded() {
    try {
      const titleVisible = await this.forgotPasswordPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const wrapperVisible = await this.forgotPasswordPageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      const formVisible = await this.forgotPasswordForm.isVisible({ timeout: 5000 }).catch(() => false);
      const emailFieldVisible = await this.forgotPasswordEmailField.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Check URL for forgot password indicators
      const currentUrl = this.page.url();
      const urlContainsForgot = currentUrl.toLowerCase().includes('forgot') || 
                                currentUrl.toLowerCase().includes('reset');
      
      return titleVisible || wrapperVisible || formVisible || emailFieldVisible || urlContainsForgot;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current page URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Navigates to the Forgot Password page from login page
   * @param {string} baseUrl - Base URL of the application
   */
  async gotoForgotPasswordPage(baseUrl) {
    try {
      await this.gotoLoginPage(baseUrl);
      await this.clickForgotPasswordLink();
      await this.page.waitForTimeout(2000);
      
      const isLoaded = await this.isForgotPasswordPageLoaded();
      if (!isLoaded) {
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to navigate to Forgot Password page: ${error.message}`);
    }
  }

  /**
   * Fills the email field on forgot password page
   * @param {string} email - Email address to fill
   */
  async fillForgotPasswordEmail(email) {
    try {
      await this.forgotPasswordEmailField.waitFor({ state: 'visible', timeout: 10000 });
      await this.forgotPasswordEmailField.clear();
      await this.forgotPasswordEmailField.fill(email);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill forgot password email field: ${error.message}`);
    }
  }

  /**
   * Clicks the Reset Password button
   */
  async clickResetPasswordButton() {
    try {
      await this.resetPasswordButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.resetPasswordButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.resetPasswordButton.click();
      await this.page.waitForTimeout(5000); // Wait for navigation or validation (increased for set new password page)
    } catch (error) {
      throw new Error(`Failed to click Reset Password button: ${error.message}`);
    }
  }

  /**
   * Checks if forgot password form has validation errors
   * @returns {Promise<boolean>}
   */
  async hasForgotPasswordValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.forgotPasswordRequiredFieldErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all validation error messages from forgot password form
   * @returns {Promise<Array<string>>}
   */
  async getForgotPasswordValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errors = [];
      const errorCount = await this.forgotPasswordValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.forgotPasswordValidationErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if email validation error is displayed
   * @returns {Promise<boolean>}
   */
  async hasEmailValidationError() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.forgotPasswordEmailValidationErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets email validation error messages
   * @returns {Promise<Array<string>>}
   */
  async getEmailValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errors = [];
      const errorCount = await this.forgotPasswordEmailValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.forgotPasswordEmailValidationErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if Set New Password page is loaded
   * @returns {Promise<boolean>}
   */
  async isSetNewPasswordPageLoaded() {
    try {
      // Wait a bit for page to load
      await this.page.waitForTimeout(2000);
      
      // Check for OTP field (most reliable indicator)
      const otpFieldVisible = await this.otpField.isVisible({ timeout: 5000 }).catch(() => false);
      if (otpFieldVisible) return true;
      
      // Check for form with OTP field
      const formVisible = await this.setNewPasswordForm.isVisible({ timeout: 5000 }).catch(() => false);
      if (formVisible) return true;
      
      // Check for title
      const titleVisible = await this.setNewPasswordPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      if (titleVisible) return true;
      
      // Check for password fields
      const passwordFieldVisible = await this.newPasswordField.isVisible({ timeout: 5000 }).catch(() => false);
      const confirmPasswordFieldVisible = await this.confirmPasswordField.isVisible({ timeout: 5000 }).catch(() => false);
      if (passwordFieldVisible && confirmPasswordFieldVisible) return true;
      
      // Check for app-dynamic-form (from HTML structure)
      const dynamicFormVisible = await this.page.locator('app-dynamic-form:has(input[ng-reflect-name="otp"])').isVisible({ timeout: 5000 }).catch(() => false);
      if (dynamicFormVisible) return true;
      
      // Check for submit button
      const submitButtonVisible = await this.submitButton.isVisible({ timeout: 5000 }).catch(() => false);
      if (submitButtonVisible) return true;
      
      // Check URL
      const currentUrl = this.page.url();
      const urlContainsSetPassword = currentUrl.toLowerCase().includes('set-password') || 
                                     currentUrl.toLowerCase().includes('reset-password') ||
                                     currentUrl.toLowerCase().includes('otp') ||
                                     currentUrl.toLowerCase().includes('set-new-password');
      
      // Check for wrapper
      const wrapperVisible = await this.setNewPasswordPageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      
      return titleVisible || wrapperVisible || formVisible || otpFieldVisible || passwordFieldVisible || confirmPasswordFieldVisible || dynamicFormVisible || submitButtonVisible || urlContainsSetPassword;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills OTP field
   * @param {string} otp - OTP code to fill
   */
  async fillOtp(otp) {
    try {
      await this.otpField.waitFor({ state: 'visible', timeout: 10000 });
      await this.otpField.clear();
      await this.otpField.fill(otp);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill OTP field: ${error.message}`);
    }
  }

  /**
   * Fills new password field
   * @param {string} password - Password to fill
   */
  async fillNewPassword(password) {
    try {
      await this.newPasswordField.waitFor({ state: 'visible', timeout: 10000 });
      await this.newPasswordField.clear();
      await this.newPasswordField.fill(password);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill new password field: ${error.message}`);
    }
  }

  /**
   * Fills confirm password field
   * @param {string} password - Password to confirm
   */
  async fillConfirmPassword(password) {
    try {
      await this.confirmPasswordField.waitFor({ state: 'visible', timeout: 10000 });
      await this.confirmPasswordField.clear();
      await this.confirmPasswordField.fill(password);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill confirm password field: ${error.message}`);
    }
  }

  /**
   * Clears all fields in set new password form
   */
  async clearSetNewPasswordForm() {
    try {
      // Clear OTP
      try {
        const otpVisible = await this.otpField.isVisible({ timeout: 3000 }).catch(() => false);
        if (otpVisible) {
          await Promise.race([
            this.otpField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Clear new password
      try {
        const passwordVisible = await this.newPasswordField.isVisible({ timeout: 3000 }).catch(() => false);
        if (passwordVisible) {
          await Promise.race([
            this.newPasswordField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Clear confirm password
      try {
        const confirmPasswordVisible = await this.confirmPasswordField.isVisible({ timeout: 3000 }).catch(() => false);
        if (confirmPasswordVisible) {
          await Promise.race([
            this.confirmPasswordField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      // Silently continue
    }
  }

  /**
   * Clicks the Submit button on set new password form
   */
  async clickSubmitButton() {
    try {
      await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.submitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.submitButton.click();
      await this.page.waitForTimeout(2000); // Wait for validation or navigation
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Checks if set new password form has validation errors
   * @returns {Promise<boolean>}
   */
  async hasSetNewPasswordValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.setNewPasswordValidationErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all validation error messages from set new password form
   * @returns {Promise<Array<string>>}
   */
  async getSetNewPasswordValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errors = [];
      const errorCount = await this.setNewPasswordValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.setNewPasswordValidationErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Gets count of required field errors in set new password form
   * @returns {Promise<number>}
   */
  async getSetNewPasswordRequiredFieldErrorCount() {
    try {
      await this.page.waitForTimeout(1000);
      return await this.setNewPasswordRequiredFieldErrors.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Checks if password mismatch error is displayed
   * @returns {Promise<boolean>}
   */
  async hasPasswordMismatchError() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.passwordMismatchErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets password mismatch error messages
   * @returns {Promise<Array<string>>}
   */
  async getPasswordMismatchErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errors = [];
      const errorCount = await this.passwordMismatchErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.passwordMismatchErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if password length validation error is displayed
   * @returns {Promise<boolean>}
   */
  async hasPasswordLengthError() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.passwordLengthErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets password length validation error messages
   * @returns {Promise<Array<string>>}
   */
  async getPasswordLengthErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errors = [];
      const errorCount = await this.passwordLengthErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.passwordLengthErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if OTP validation error is displayed
   * @returns {Promise<boolean>}
   */
  async hasOtpValidationError() {
    try {
      // Check immediately - toast appears right away after submit
      // First check form validation errors
      const errorCount = await this.otpValidationErrors.count();
      if (errorCount > 0) return true;
      
      // Wait for toast container to appear (toast shows immediately, short timeout)
      try {
        await this.page.locator('#toast-container, .toast-container').first().waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
      } catch (error) {
        // Continue checking even if container wait fails
      }
      
      // Check toast container first (most specific)
      const toastContainer = this.page.locator('#toast-container, .toast-container, .toast-top-right');
      const containerCount = await toastContainer.count();
      if (containerCount > 0) {
        // Check all visible elements inside toast container
        const allElements = toastContainer.locator('*');
        const elementCount = await allElements.count();
        for (let i = 0; i < elementCount; i++) {
          try {
            const element = allElements.nth(i);
            const isVisible = await element.isVisible().catch(() => false);
            if (isVisible) {
              const text = await element.textContent().catch(() => '');
              if (text && text.trim() && (text.toLowerCase().includes('otp') || 
                                         text.toLowerCase().includes('invalid') || 
                                         text.toLowerCase().includes('expired') ||
                                         text.toLowerCase().includes('incorrect'))) {
                return true;
              }
            }
          } catch (error) {
            continue;
          }
        }
      }
      
      // Check for toast notifications with various locators
      const toastLocators = [
        this.page.locator('#toast-container .toast, #toast-container .toast-error, #toast-container .toast-warning'),
        this.page.locator('#toast-container div:visible'),
        this.page.locator('.toast-container .toast, .toast-container .toast-error'),
        this.page.locator('.toast-top-right .toast, .toast-top-right .toast-error'),
        this.page.locator('.toast, .toast-error'),
        this.page.locator('[role="alert"]'),
        this.page.locator('.alert, .alert-danger, .alert-warning')
      ];
      
      for (const locator of toastLocators) {
        try {
          const count = await locator.count();
          for (let i = 0; i < count; i++) {
            const isVisible = await locator.nth(i).isVisible().catch(() => false);
            if (isVisible) {
              const text = await locator.nth(i).textContent().catch(() => '');
              if (text && (text.toLowerCase().includes('otp') || 
                          text.toLowerCase().includes('invalid') || 
                          text.toLowerCase().includes('expired') ||
                          text.toLowerCase().includes('incorrect'))) {
                return true;
              }
            }
          }
        } catch (error) {
          continue;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets OTP validation error messages
   * @returns {Promise<Array<string>>}
   */
  async getOtpValidationErrors() {
    try {
      const errors = [];
      
      // Check form validation errors first
      const errorCount = await this.otpValidationErrors.count();
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.otpValidationErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      // Wait for toast container to appear (toast shows immediately)
      try {
        await this.page.locator('#toast-container, .toast-container').first().waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
      } catch (error) {
        // Continue checking even if container wait fails
      }
      
      // Check toast container first (most specific) - check all elements inside
      const toastContainer = this.page.locator('#toast-container, .toast-container, .toast-top-right');
      const containerCount = await toastContainer.count();
      if (containerCount > 0) {
        // Check all visible elements inside toast container
        const allElements = toastContainer.locator('*');
        const elementCount = await allElements.count();
        for (let i = 0; i < elementCount; i++) {
          try {
            const element = allElements.nth(i);
            const isVisible = await element.isVisible().catch(() => false);
            if (isVisible) {
              const text = await element.textContent().catch(() => '');
              if (text && text.trim() && (text.toLowerCase().includes('otp') || 
                                         text.toLowerCase().includes('invalid') || 
                                         text.toLowerCase().includes('expired') ||
                                         text.toLowerCase().includes('incorrect'))) {
                const trimmed = text.trim();
                if (trimmed && !errors.includes(trimmed)) {
                  errors.push(trimmed);
                }
              }
            }
          } catch (error) {
            continue;
          }
        }
      }
      
      // Check for toast notifications with various locators
      const toastLocators = [
        this.page.locator('#toast-container .toast, #toast-container .toast-error, #toast-container .toast-warning'),
        this.page.locator('#toast-container div:visible'),
        this.page.locator('.toast-container .toast, .toast-container .toast-error'),
        this.page.locator('.toast-top-right .toast, .toast-top-right .toast-error'),
        this.page.locator('.toast, .toast-error'),
        this.page.locator('[role="alert"]'),
        this.page.locator('.alert, .alert-danger, .alert-warning')
      ];
      
      for (const locator of toastLocators) {
        try {
          const count = await locator.count();
          for (let i = 0; i < count; i++) {
            const isVisible = await locator.nth(i).isVisible().catch(() => false);
            if (isVisible) {
              const text = await locator.nth(i).textContent().catch(() => '');
              if (text && (text.toLowerCase().includes('otp') || 
                          text.toLowerCase().includes('invalid') || 
                          text.toLowerCase().includes('expired') ||
                          text.toLowerCase().includes('incorrect'))) {
                const trimmed = text.trim();
                if (trimmed && !errors.includes(trimmed)) {
                  errors.push(trimmed);
                }
              }
            }
          }
        } catch (error) {
          continue;
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if Login link is visible on forgot password page
   * @returns {Promise<boolean>}
   */
  async isLoginLinkVisible() {
    try {
      // Try the main login link locator
      const mainLinkVisible = await this.loginLink.isVisible({ timeout: 3000 }).catch(() => false);
      if (mainLinkVisible) return true;
      
      // Try alternative locators
      const altLink1 = await this.page.locator('*:has-text("Remembered your password? Login") a').isVisible({ timeout: 3000 }).catch(() => false);
      if (altLink1) return true;
      
      const altLink2 = await this.page.locator('*:has-text("Remembered") a').isVisible({ timeout: 3000 }).catch(() => false);
      if (altLink2) return true;
      
      // Try finding link by text content that includes "Login"
      const allLinks = await this.page.locator('a').all();
      for (const link of allLinks) {
        const text = await link.textContent().catch(() => '');
        if (text && text.toLowerCase().includes('login')) {
          const isVisible = await link.isVisible().catch(() => false);
          if (isVisible) return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Login link on forgot password page
   */
  async clickLoginLink() {
    try {
      // Try the main login link locator first
      let linkFound = false;
      try {
        await this.loginLink.waitFor({ state: 'visible', timeout: 5000 });
        linkFound = true;
      } catch (error) {
        // Try alternative locators
        const altLink1 = this.page.locator('*:has-text("Remembered your password? Login") a');
        const altLink2 = this.page.locator('*:has-text("Remembered") a');
        const altLink3 = this.page.locator('a:has-text("Login")');
        
        for (const locator of [altLink1, altLink2, altLink3]) {
          try {
            await locator.waitFor({ state: 'visible', timeout: 3000 });
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await locator.click();
            await this.page.waitForTimeout(2000);
            return;
          } catch (error) {
            continue;
          }
        }
        
        // Try finding link by text content
        const allLinks = await this.page.locator('a').all();
        for (const link of allLinks) {
          const text = await link.textContent().catch(() => '');
          if (text && text.toLowerCase().includes('login')) {
            try {
              await link.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(500);
              await link.click();
              await this.page.waitForTimeout(2000);
              return;
            } catch (error) {
              continue;
            }
          }
        }
      }
      
      if (linkFound) {
        await this.loginLink.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.loginLink.click();
        await this.page.waitForTimeout(2000);
      } else {
        throw new Error('Login link not found');
      }
    } catch (error) {
      throw new Error(`Failed to click Login link: ${error.message}`);
    }
  }

  /**
   * Checks if Resend OTP link is visible
   * @returns {Promise<boolean>}
   */
  async isResendOtpLinkVisible() {
    try {
      return await this.resendOtpLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks Resend OTP link
   */
  async clickResendOtpLink() {
    try {
      await this.resendOtpLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.resendOtpLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.resendOtpLink.click();
      await this.page.waitForTimeout(2000); // Wait for OTP to be resent
    } catch (error) {
      throw new Error(`Failed to click Resend OTP link: ${error.message}`);
    }
  }

  /**
   * Gets the resend OTP timer value
   * @returns {Promise<string>}
   */
  async getResendOtpTimer() {
    try {
      const timerText = await this.resendOtpTimer.textContent().catch(() => '');
      return timerText.trim();
    } catch (error) {
      return '';
    }
  }
}

module.exports = { ForgotPasswordPage };

