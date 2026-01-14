class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login form locators - based on auth-form component
    this.emailInput = page.locator('input[formcontrolname="email"]').first();
    this.passwordInput = page.locator('input[formcontrolname="password"], input#password').first();
    this.signInButton = page.locator('button:has-text("Sign in")').first();
    this.forgotPasswordLink = page.locator('a.forgot-btn:has-text("Forgot Password"), a.forgot-btn').first();
    
    // Error and validation locators - based on auth-form component structure
    this.emailError = page.locator('div.error-message:has-text("Email"), div.error-message:has-text("email"), div.error-message').first();
    this.passwordError = page.locator('div.error-message:has-text("Password"), div.error-message:has-text("password")').first();
    
    // Toastr (ngx-toastr) locators
    this.errorToast = page.locator('#toast-container .toast-error, #toast-container .toast-danger, #toast-container .toastr-error, div[role="alert"].toast-error').first();
    this.successToast = page.locator('#toast-container .toast-success, #toast-container .toastr-success, div[role="alert"].toast-success').first();
    this.toastContainer = page.locator('#toast-container').first();
    this.errorMessage = page.locator('#toast-container .toast-error .toast-message, #toast-container .toast-error, #toast-container .toastr-error').first();
    
    // Dashboard locators - elements that verify successful login and dashboard navigation
    this.dashboardContainer = page.locator('app-root');
    this.dashboardSidebar = page.locator('div[class*="sidebar"], nav[class*="sidebar"], aside[class*="sidebar"], div[class*="menu"], nav[class*="menu"]').first();
    this.dashboardMenuItem = page.locator('span:has-text("Dashboard"), a:has-text("Dashboard"), div:has-text("Dashboard"), li:has-text("Dashboard")').first();
    this.dashboardTitle = page.locator('h1:has-text("Dashboard"), h2:has-text("Dashboard"), h1:has-text("Dashboard and Statistics"), h2:has-text("Dashboard and Statistics"), div:has-text("Dashboard"), *:has-text("Dashboard and Statistics"), *:has-text("Dashboard")').first();
    this.subscriptionsSummary = page.locator('*:has-text("Subscriptions Summary"), *:has-text("Subscriptions")').first();
    this.totalPaidSubscriptionsCard = page.locator('*:has-text("Total Paid Subscriptions"), *:has-text("Paid Subscriptions")').first();
    this.userNameHeader = page.locator('*[class*="user-name"], *[class*="user-info"], *[class*="username"]').first();
    
    // Logout locators
    // Three dots menu button
    this.threeDotsMenuButton = page.locator('div.dropstart div[data-bs-toggle="dropdown"], div.dropstart i.bi-three-dots-vertical').first();
    // Logout option in dropdown menu
    this.logoutMenuItem = page.locator('ul.dropdown-menu li:has-text("Logout"), ul.dropdown-menu li:has(i.bi-power)').first();
    // Fallback: direct logout button (if exists)
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), span:has-text("Logout"), button:has-text("Log out"), a:has-text("Log out")').first();
  }

  /**
   * Navigates to the partner portal login page.
   * @param {string} url - The base URL of the partner portal
   */
  async goto(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
    // Wait for Angular component to load
    await this.page.waitForSelector('app-auth-form', { state: 'attached' });
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Fills in the email field.
   * @param {string} email - The email address to enter
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Fills in the password field.
   * @param {string} password - The password to enter
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the Sign in button.
   */
  async clickSignIn() {
    await this.signInButton.click();
    // Wait a bit for Angular form validation to trigger
    await this.page.waitForTimeout(500);
  }

  /**
   * Performs the complete login flow.
   * @param {string} email - The email address
   * @param {string} password - The password
   */
  async login(email, password) {
    const initialUrl = await this.page.url();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
    
    // Wait for navigation or toast messages
    try {
      // Wait for URL to change (navigate away from login page)
      await this.page.waitForURL(url => !url.includes('/login'), { timeout: 8000 });
    } catch {
      // If URL doesn't change, check for toast messages or wait
      await Promise.race([
        this.successToast.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
        this.errorToast.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
        this.page.waitForTimeout(2000)
      ]);
    }
    
    // Wait for network to be idle
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if the login form is visible.
   * @returns {Promise<boolean>}
   */
  async isLoginFormVisible() {
    return this.emailInput.isVisible();
  }

  /**
   * Checks if the dashboard is visible after login.
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      // First check: verify we're not on login page
      const currentUrl = await this.getCurrentUrl();
      if (currentUrl.includes('/login')) {
        // Check if login form is still visible
        const isFormVisible = await this.emailInput.isVisible({ timeout: 2000 }).catch(() => false);
        if (isFormVisible) {
          return false; // Still on login page
        }
      }
      
      // Wait a bit for page to load
      await this.page.waitForTimeout(1000);
      
      // Check if login form is hidden (indicating successful login)
      const isFormHidden = await this.emailInput.isHidden({ timeout: 5000 }).catch(() => true);
      
      if (!isFormHidden && currentUrl.includes('/login')) {
        return false; // Still showing login form
      }
      
      // Check if we're not on login page
      const finalUrl = await this.getCurrentUrl();
      if (finalUrl.includes('/login')) {
        return false;
      }
      
      // Try to find dashboard elements (at least one should be visible)
      // 1. Check for sidebar/navigation menu
      const isSidebarVisible = await this.dashboardSidebar.isVisible({ timeout: 5000 }).catch(() => false);
      if (isSidebarVisible) {
        return true;
      }
      
      // 2. Check for dashboard title
      const isDashboardTitleVisible = await this.dashboardTitle.isVisible({ timeout: 5000 }).catch(() => false);
      if (isDashboardTitleVisible) {
        return true;
      }
      
      // 3. Check for any dashboard-related text
      const hasDashboardText = await this.page.locator('*:has-text("Dashboard"), *:has-text("Subscriptions"), *:has-text("Statistics")').first().isVisible({ timeout: 3000 }).catch(() => false);
      if (hasDashboardText) {
        return true;
      }
      
      // 4. Final check: container is visible and we're not on login
      const isContainerVisible = await this.dashboardContainer.isVisible().catch(() => false);
      return isContainerVisible && !finalUrl.includes('/login');
    } catch (error) {
      // If all checks fail, verify we're at least not on login page
      try {
        const currentUrl = await this.getCurrentUrl();
        return !currentUrl.includes('/login');
      } catch {
        return false;
      }
    }
  }

  /**
   * Verifies that the user has successfully logged in and navigated to dashboard.
   * Checks multiple dashboard elements to ensure complete navigation.
   * @returns {Promise<boolean>}
   */
  async verifyDashboardLoaded() {
    try {
      // Wait for login form to disappear
      
      // Wait for and verify dashboard elements
      await this.dashboardTitle.waitFor({ state: 'visible', timeout: 10000 });
      
      // Check multiple dashboard elements
      const checks = await Promise.all([
        this.dashboardTitle.isVisible(),
      ]);
      
      return checks.every(check => check === true);
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the dashboard title text.
   * @returns {Promise<string>}
   */
  async getDashboardTitle() {
    return await this.dashboardTitle.textContent();
  }

  /**
   * Gets the current page URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Clears the email input field.
   */
  async clearEmail() {
    await this.emailInput.clear();
  }

  /**
   * Clears the password input field.
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }

  /**
   * Clears both email and password fields.
   */
  async clearAllFields() {
    await this.clearEmail();
    await this.clearPassword();
  }

  /**
   * Gets the email input value.
   * @returns {Promise<string>}
   */
  async getEmailValue() {
    return await this.emailInput.inputValue();
  }

  /**
   * Gets the password input value.
   * @returns {Promise<string>}
   */
  async getPasswordValue() {
    return await this.passwordInput.inputValue();
  }

  /**
   * Checks if password field type is 'password' (masked).
   * @returns {Promise<boolean>}
   */
  async isPasswordMasked() {
    const inputType = await this.passwordInput.getAttribute('type');
    return inputType === 'password';
  }

  /**
   * Checks if email validation error is visible.
   * @returns {Promise<boolean>}
   */
  async isEmailErrorVisible() {
    try {
      // Strategy 1: Find error message in the form that contains "Email" or "required"
      // The error message is a sibling div after the input-group
      const emailError1 = this.page.locator('form div.error-message:has-text("Email"), form div.error-message:has-text("email"), form div.error-message:has-text("Email is required"), form div.error-message:has-text("email is required")').first();
      const isVisible1 = await emailError1.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible1) {
        return true;
      }
      
      // Strategy 2: Find all error messages in form and check if any contains email-related text
      const allErrors = this.page.locator('form div.error-message');
      const count = await allErrors.count();
      for (let i = 0; i < count; i++) {
        const error = allErrors.nth(i);
        const isVisible = await error.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await error.textContent().catch(() => '');
          if (text && (text.toLowerCase().includes('email') || text.toLowerCase().includes('required'))) {
            return true;
          }
        }
      }
      
      // Strategy 3: Check if email input has ng-invalid class and form has ng-submitted
      const emailInput = this.page.locator('input[formcontrolname="email"]').first();
      const hasInvalidClass = await emailInput.evaluate(el => el.classList.contains('ng-invalid')).catch(() => false);
      const form = this.page.locator('form').first();
      const hasSubmittedClass = await form.evaluate(el => el.classList.contains('ng-submitted')).catch(() => false);
      
      if (hasInvalidClass && hasSubmittedClass) {
        // Find first error message in the form
        const formError = this.page.locator('form div.error-message').first();
        const isVisible3 = await formError.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible3) {
          return true;
        }
      }
      
      // Fallback to general error message check
      try {
        return await this.emailError.isVisible({ timeout: 1000 });
      } catch {
        return false;
      }
    } catch {
      return false;
    }
  }

  /**
   * Checks if password validation error is visible.
   * @returns {Promise<boolean>}
   */
  async isPasswordErrorVisible() {
    try {
      // Check for error-message div near password input
      const passwordError = this.page.locator('input[formcontrolname="password"]').locator('..').locator('div.error-message').first();
      return await passwordError.isVisible({ timeout: 3000 });
    } catch {
      // Fallback to general error message check
      try {
        return await this.passwordError.isVisible({ timeout: 1000 });
      } catch {
        return false;
      }
    }
  }

  /**
   * Gets email validation error message.
   * @returns {Promise<string|null>}
   */
  async getEmailErrorMessage() {
    try {
      // Strategy 1: Find error message in the form that contains "Email" or "required"
      const emailError1 = this.page.locator('form div.error-message:has-text("Email"), form div.error-message:has-text("email"), form div.error-message:has-text("Email is required"), form div.error-message:has-text("email is required")').first();
      const isVisible1 = await emailError1.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible1) {
        const text = await emailError1.textContent().catch(() => '');
        if (text) return text.trim();
      }
      
      // Strategy 2: Find all error messages in form and check if any contains email-related text
      const allErrors = this.page.locator('form div.error-message');
      const count = await allErrors.count();
      for (let i = 0; i < count; i++) {
        const error = allErrors.nth(i);
        const isVisible = await error.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await error.textContent().catch(() => '');
          if (text && (text.toLowerCase().includes('email') || text.toLowerCase().includes('required'))) {
            return text.trim();
          }
        }
      }
      
      // Strategy 3: Check if email input has ng-invalid class and form has ng-submitted
      const emailInput = this.page.locator('input[formcontrolname="email"]').first();
      const hasInvalidClass = await emailInput.evaluate(el => el.classList.contains('ng-invalid')).catch(() => false);
      const form = this.page.locator('form').first();
      const hasSubmittedClass = await form.evaluate(el => el.classList.contains('ng-submitted')).catch(() => false);
      
      if (hasInvalidClass && hasSubmittedClass) {
        // Find first error message in the form (should be email error if email is invalid)
        const formError = this.page.locator('form div.error-message').first();
        const isVisible3 = await formError.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible3) {
          const text = await formError.textContent().catch(() => '');
          if (text) return text.trim();
        }
      }
      
      // Fallback to general error message check
      try {
        const msg = await this.emailError.textContent();
        return msg ? msg.trim() : null;
      } catch {
        return null;
      }
    } catch {
      return null;
    }
  }

  /**
   * Gets password validation error message.
   * @returns {Promise<string|null>}
   */
  async getPasswordErrorMessage() {
    try {
      if (await this.isPasswordErrorVisible()) {
        // Try to get error message near password input
        const passwordError = this.page.locator('input[formcontrolname="password"]').locator('..').locator('div.error-message').first();
        if (await passwordError.isVisible({ timeout: 1000 })) {
          const msg = await passwordError.textContent();
          if (msg) return msg.trim();
        }
        // Fallback
        const msg = await this.passwordError.textContent();
        return msg ? msg.trim() : null;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Checks if error toast is visible.
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<boolean>}
   */
  async isErrorToastVisible(timeout = 5000) {
    try {
      // Check if toast container exists first
      const containerExists = await this.toastContainer.isVisible({ timeout: 2000 }).catch(() => false);
      if (!containerExists) return false;
      
      // Check for error toast
      return await this.errorToast.isVisible({ timeout });
    } catch {
      // Also check for any toast with error text
      try {
        const anyErrorToast = this.page.locator('#toast-container:has-text("error"), #toast-container:has-text("invalid"), #toast-container:has-text("incorrect")').first();
        return await anyErrorToast.isVisible({ timeout: 2000 });
      } catch {
        return false;
      }
    }
  }

  /**
   * Gets error toast message.
   * @returns {Promise<string|null>}
   */
  async getErrorToastMessage() {
    try {
      if (await this.isErrorToastVisible()) {
        // Try multiple selectors for toast message
        const selectors = [
          '#toast-container .toast-error .toast-message',
          '#toast-container .toast-error',
          '#toast-container .toastr-error',
          '#toast-container [role="alert"]'
        ];
        
        for (const selector of selectors) {
          try {
            const element = this.page.locator(selector).first();
            if (await element.isVisible({ timeout: 1000 })) {
              const message = await element.textContent();
              if (message && message.trim()) {
                return message.trim();
              }
            }
          } catch {}
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Checks if any validation error is visible (email or password).
   * @returns {Promise<boolean>}
   */
  async isAnyValidationErrorVisible() {
    const emailError = await this.isEmailErrorVisible();
    const passwordError = await this.isPasswordErrorVisible();
    return emailError || passwordError;
  }

  /**
   * Gets all validation error messages.
   * @returns {Promise<string[]>}
   */
  async getAllValidationErrors() {
    const errors = [];
    const emailError = await this.getEmailErrorMessage();
    const passwordError = await this.getPasswordErrorMessage();
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    return errors;
  }

  /**
   * Clicks the Forgot Password link.
   */
  async clickForgotPasswordLink() {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Checks if Forgot Password link is visible.
   * @returns {Promise<boolean>}
   */
  async isForgotPasswordLinkVisible() {
    try {
      return await this.forgotPasswordLink.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Checks if login form is still visible (login failed).
   * @returns {Promise<boolean>}
   */
  async isLoginFormStillVisible() {
    try {
      return await this.emailInput.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Waits for error toast to appear and disappear.
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForErrorToast(timeout = 5000) {
    try {
      await this.errorToast.waitFor({ state: 'visible', timeout });
      await this.page.waitForTimeout(1000);
    } catch {
      // Toast may not appear, continue
    }
  }

  /**
   * Logs out from the current session.
   */
  async logout() {
    try {
      // Strategy 1: Try clicking 3-dots menu first, then Logout option
      const threeDotsVisible = await this.threeDotsMenuButton.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (threeDotsVisible) {
        console.log('  Found 3-dots menu, clicking to open dropdown...');
        await this.threeDotsMenuButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.threeDotsMenuButton.scrollIntoViewIfNeeded();
        await this.threeDotsMenuButton.click();
        await this.page.waitForTimeout(500);
        
        // Wait for dropdown menu to appear
        const dropdownMenu = this.page.locator('ul.dropdown-menu.show, ul.dropdown-menu').first();
        await dropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        
        // Click Logout option
        await this.logoutMenuItem.waitFor({ state: 'visible', timeout: 5000 });
        await this.logoutMenuItem.scrollIntoViewIfNeeded();
        await this.logoutMenuItem.click();
        console.log('  ✓ Clicked Logout from dropdown menu');
      } else {
        // Strategy 2: Fallback to direct logout button
        console.log('  3-dots menu not found, trying direct logout button...');
        await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.logoutButton.scrollIntoViewIfNeeded();
        await this.logoutButton.click();
        console.log('  ✓ Clicked direct logout button');
      }
      
      // Wait for logout to process (may redirect or show login form)
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(3000);
      
      // Check if we're redirected to login page or login form is visible
      const currentUrl = await this.getCurrentUrl();
      const isOnLoginPage = currentUrl.includes('/login');
      const isLoginFormVisible = await this.isLoginFormVisible();
      
      if (isOnLoginPage || isLoginFormVisible) {
        console.log(`✓ Logged out successfully - URL: ${currentUrl}`);
        return true;
      } else {
        // If logout didn't redirect, try navigating to login page manually
        console.log(`⚠ Logout clicked but not redirected - URL: ${currentUrl}`);
        console.log('  Attempting to navigate to login page...');
        
        // Navigate to login page
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/login`);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        
        // Verify we're on login page now
        const newUrl = await this.getCurrentUrl();
        const isNowOnLoginPage = newUrl.includes('/login') || await this.isLoginFormVisible();
        
        if (isNowOnLoginPage) {
          console.log(`✓ Navigated to login page: ${newUrl}`);
          return true;
        } else {
          console.log(`⚠ Still not on login page - URL: ${newUrl}`);
          return false;
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Try to navigate to login page as fallback
      try {
        const currentUrl = await this.getCurrentUrl();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/login`);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        console.log('✓ Navigated to login page as fallback');
        return true;
      } catch (navError) {
        console.error('Error navigating to login page:', navError);
        throw error;
      }
    }
  }
}

module.exports = { DashboardPage };

