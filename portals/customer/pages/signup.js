class SignupPage {
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
    
    // Sign Up Link on Login Page
    this.signUpLink = page.locator('a:has-text("Sign Up"), a:has-text("Sign up"), a:has-text("sign up"), a:has-text("Sign Up"), a[href*="signup"], a[href*="sign-up"], a[href*="register"]').first();
    
    // Sign Up Page Elements
    this.signUpPageWrapper = page.locator('.signup-page, .sign-up-page, .register-page, [class*="signup"], [class*="sign-up"], [class*="register"]').first();
    this.signUpPageTitle = page.locator('h1:has-text("Sign Up"), h2:has-text("Sign Up"), h1:has-text("Sign up"), h2:has-text("Sign up"), h1:has-text("Register"), .page-title:has-text("Sign Up")').first();
    this.signUpPageHeader = page.locator('.signup-header, .sign-up-header, .register-header, [class*="signup-header"]').first();
    
    // Sign Up Form Fields (for verification that we're on signup page)
    this.signUpForm = page.locator('form:has(input[type="email"]), form:has(input[name*="email"]), .signup-form, .sign-up-form').first();
    
    // Sign Up Form Fields
    this.nameField = page.locator('input#name, input[name="name"], input[ng-reflect-name="name"], input[placeholder*="username" i]').first();
    this.emailField = page.locator('input#email, input[name="email"], input[type="email"], input[ng-reflect-name="email"], input[placeholder*="email" i]').first();
    this.passwordField = page.locator('input#password, input[name="password"], input[type="password"], input[ng-reflect-name="password"], input[placeholder*="password" i]').first();
    this.termsCheckbox = page.locator('input[type="checkbox"][ng-reflect-name="checked"], input[type="checkbox"]:has(+ label:has-text("terms"))').first();
    
    // Sign Up Submit Button
    this.signUpSubmitButton = page.locator('button:has-text("Sign Up"), button[type="submit"]:has-text("Sign Up"), button.primary-btn:has-text("Sign Up")').first();
    
    // Validation Error Messages
    this.validationErrors = page.locator('.error-message, .error-message span, span:has-text("It\'s mandatory field"), .text-danger, [class*="error"]');
    this.requiredFieldErrors = page.locator('.error-message span:has-text("It\'s mandatory field"), .error-message:has-text("mandatory"), span:has-text("mandatory")');
    this.emailValidationErrors = page.locator('.error-message span:has-text("Email is invalid"), .error-message span:has-text("Please enter a valid email address"), .error-message:has-text("invalid"), .error-message:has-text("valid email")');
    this.existingEmailErrors = page.locator('.error-message span:has-text("already exists"), .error-message:has-text("already exists"), .error-message:has-text("already registered"), .error-message:has-text("Email already"), .alert:has-text("already"), .toast:has-text("already")');
    this.passwordValidationErrors = page.locator('.error-message span:has-text("Password must be at least 6 characters"), .error-message:has-text("at least 6 characters"), .error-message:has-text("6 characters")');
    
    // Terms and Conditions and Privacy Policy Links
    this.termsAndConditionsLink = page.locator('a[href="/terms-condition"], a[href*="terms-condition"], a[ng-reflect-router-link="/terms-condition"], a:has-text("terms and conditions")').first();
    this.privacyPolicyLink = page.locator('a[href="/privacy-policy"], a[href*="privacy-policy"], a[ng-reflect-router-link="/privacy-policy"], a:has-text("Privacy policy")').first();
    
    // Login Link on Sign Up Page
    this.loginLink = page.locator('a:has-text("Login"), a:has-text("login"), a:has-text("Sign In"), a[href*="login"], a[href*="signin"], a[ng-reflect-router-link="/login"]').first();
    
    // Click Here Link (Google Forms)
    this.clickHereLink = page.locator('a:has-text("click here"), a:has-text("Click here"), a:has-text("Click Here"), a[href*="docs.google.com/forms"], a[href*="1FAIpQLSed4SjuPKhUS5VD7PrTp4jh9uyKjP0FYvgc0gZ8ydUMD5GJDw"]').first();
    
    // Onboarding Page Elements
    this.onboardingPageWrapper = page.locator('.onboarding-page, .on-boarding, [class*="onboarding"], [class*="on-boarding"]').first();
    this.onboardingPageTitle = page.locator('h1:has-text("Onboarding"), h2:has-text("Onboarding"), h1:has-text("On-Boarding"), p:has-text("Customer Infomation"), p:has-text("Start Trial")').first();
    
    // Customer Information Form Fields
    this.customerNameField = page.locator('input[ng-reflect-name="name"], input[name="name"], input[placeholder*="customer name" i]').first();
    this.companyNameField = page.locator('input[ng-reflect-name="companyName"], input[name="companyName"], input[placeholder*="company name" i]').first();
    this.trialPlanDropdown = page.locator('select[ng-reflect-name="planId"], select[name="planId"]').first();
    this.gstNumberField = page.locator('input[ng-reflect-name="gstIn"], input[name="gstIn"], input[placeholder*="GST number" i]').first();
    this.customerInfoSubmitButton = page.locator('form:has(input[ng-reflect-name="name"]) button:has-text("Submit"), form:has(input[ng-reflect-name="companyName"]) button:has-text("Submit"), form:has(select[ng-reflect-name="planId"]) button:has-text("Submit")').first();
    
    // Customer Information Form Validation Errors
    this.customerInfoValidationErrors = page.locator('.error-message span:has-text("It\'s mandatory field"), .error-message span:has-text("Select Trial Plan is required"), .error-message:has-text("mandatory"), .error-message:has-text("required")');
    this.customerInfoRequiredFieldErrors = page.locator('.error-message span:has-text("It\'s mandatory field"), .error-message:has-text("It\'s mandatory field")');
    this.customerInfoTrialPlanError = page.locator('.error-message span:has-text("Select Trial Plan is required"), .error-message:has-text("Select Trial Plan is required")');
    
    // Start Trial Form Fields
    this.workspaceNameField = page.locator('input[ng-reflect-name="title"], input[name="title"], input[placeholder*="workspace name" i]').first();
    this.tallyReleaseDropdown = page.locator('select[ng-reflect-name="tallyId"], select[name="tallyId"]').first();
    this.usersField = page.locator('input[ng-reflect-name="noOfUsers"], input[name="noOfUsers"], input[placeholder*="no. users" i], input[placeholder*="users" i]').first();
    this.numberOfTallyField = page.locator('input[ng-reflect-name="noOfTally"], input[name="noOfTally"], input[placeholder*="no. of Tally" i], input[placeholder*="Enter no. of Tally" i], input[ng-reflect-name*="tally"], input[name*="tally"]').first();
    this.startTrialSubmitButton = page.locator('form:has(input[ng-reflect-name="title"]) button:has-text("Submit"), form:has(select[ng-reflect-name="tallyId"]) button:has-text("Submit")').first();
    
    // Start Trial Form Validation Errors
    this.startTrialValidationErrors = page.locator('form:has(input[ng-reflect-name="title"]) .error-message span:has-text("It\'s mandatory field"), form:has(input[ng-reflect-name="title"]) .error-message:has-text("mandatory"), form:has(input[ng-reflect-name="title"]) .error-message:has-text("required")');
    this.startTrialRequiredFieldErrors = page.locator('form:has(input[ng-reflect-name="title"]) .error-message span:has-text("It\'s mandatory field"), form:has(input[ng-reflect-name="title"]) .error-message:has-text("It\'s mandatory field")');
    
    // Sidebar Navigation Modules
    this.sidebarDashboardLink = page.locator('nav a:has-text("Dashboard"), [class*="sidebar"] a:has-text("Dashboard"), li:has-text("Dashboard") a, [id*="sidebar"] a:has-text("Dashboard")').first();
    this.sidebarAppManagementLink = page.locator('nav a:has-text("App Management"), [class*="sidebar"] a:has-text("App Management"), li:has-text("App Management") a').first();
    this.sidebarUserManagementLink = page.locator('nav a:has-text("User Management"), [class*="sidebar"] a:has-text("User Management"), li:has-text("User Management") a').first();
    this.sidebarFileManagerLink = page.locator('nav a:has-text("File Manager"), [class*="sidebar"] a:has-text("File Manager"), li:has-text("File Manager") a').first();
    this.sidebarGoogleDriveLink = page.locator('nav a:has-text("Google Drive"), [class*="sidebar"] a:has-text("Google Drive"), li:has-text("Google Drive") a').first();
    this.sidebarLogsSecurityLink = page.locator('nav a:has-text("Logs & Security"), [class*="sidebar"] a:has-text("Logs & Security"), li:has-text("Logs & Security") a').first();
    this.sidebarDownloadSetupLink = page.locator('nav a:has-text("Download Setup"), [class*="sidebar"] a:has-text("Download Setup"), li:has-text("Download Setup") a').first();
    this.sidebarConnectivityTestLink = page.locator('nav a:has-text("Connectivity Test"), [class*="sidebar"] a:has-text("Connectivity Test"), li:has-text("Connectivity Test") a').first();
    this.sidebarAccountDetailsLink = page.locator('nav a:has-text("Account Details"), [class*="sidebar"] a:has-text("Account Details"), li:has-text("Account Details") a').first();
    this.sidebarKnowledgeBaseLink = page.locator('nav a:has-text("Knowledge Base"), [class*="sidebar"] a:has-text("Knowledge Base"), li:has-text("Knowledge Base") a').first();
    this.sidebarServiceRequestLink = page.locator('a[data-bs-toggle="collapse"][data-bs-target="#service-request"], a:has-text("Service Request")[data-bs-toggle="collapse"]').first();
    this.sidebarAllRequestLink = page.locator('a[ng-reflect-router-link="all-request"], a[href="/all-request"], #service-request a:has-text("All Request"), #service-request a:has-text("All Requests")').first();
    this.sidebarRaiseRequestLink = page.locator('a[ng-reflect-router-link="raise-service-request"], a[href="/raise-service-request"], #service-request a:has-text("Raise Request")').first();
    this.sidebarLogoutLink = page.locator('nav a:has-text("Logout"), [class*="sidebar"] a:has-text("Logout"), li:has-text("Logout") a, button:has-text("Logout"), a:has-text("Logout"):visible, [class*="nav"] a:has-text("Logout")').first();
    
    // Logout Modal
    this.logoutModal = page.locator('.modal:has-text("Logout"), .modal:has-text("log out"), .modal-dialog:has-text("Logout")').first();
    this.logoutConfirmButton = page.locator('.modal button:has-text("Yes"), .modal button:has-text("Confirm"), .modal button:has-text("Logout")').first();
    this.logoutCancelButton = page.locator('.modal button:has-text("No"), .modal button:has-text("Cancel")').first();
    
    // Dashboard Page Elements
    this.dashboardPageWrapper = page.locator('.dashboard, .dashboard-page, [class*="dashboard"]').first();
    this.dashboardPageTitle = page.locator('h1:has-text("Dashboard"), h2:has-text("Dashboard"), .dashboard-title').first();
    this.dashboardSidebarLink = page.locator('nav a:has-text("Dashboard"), a:has-text("Dashboard"), button:has-text("Dashboard"), li:has-text("Dashboard")').first();
    this.dashboardWelcomeText = page.locator('text=Welcome to CoCloud Portal').first();
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
   * Checks if Sign Up link is visible on login page
   * @returns {Promise<boolean>}
   */
  async isSignUpLinkVisible() {
    try {
      return await this.signUpLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Sign Up link on login page
   */
  async clickSignUpLink() {
    try {
      await this.signUpLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.signUpLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.signUpLink.click();
      await this.page.waitForTimeout(2000); // Wait for navigation to signup page
    } catch (error) {
      throw new Error(`Failed to click Sign Up link: ${error.message}`);
    }
  }

  /**
   * Checks if the Sign Up page is loaded
   * @returns {Promise<boolean>}
   */
  async isSignUpPageLoaded() {
    try {
      // Check multiple indicators that we're on the signup page
      const titleVisible = await this.signUpPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const wrapperVisible = await this.signUpPageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      const formVisible = await this.signUpForm.isVisible({ timeout: 5000 }).catch(() => false);
      const headerVisible = await this.signUpPageHeader.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Check URL for signup indicators
      const currentUrl = this.page.url();
      const urlContainsSignup = currentUrl.toLowerCase().includes('signup') || 
                                 currentUrl.toLowerCase().includes('sign-up') ||
                                 currentUrl.toLowerCase().includes('register');
      
      return titleVisible || wrapperVisible || formVisible || headerVisible || urlContainsSignup;
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
   * Navigates to the Sign Up page from login page
   * @param {string} baseUrl - Base URL of the application
   */
  async gotoSignUpPage(baseUrl) {
    try {
      await this.gotoLoginPage(baseUrl);
      await this.clickSignUpLink();
      await this.page.waitForTimeout(2000);
      
      const isLoaded = await this.isSignUpPageLoaded();
      if (!isLoaded) {
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to navigate to Sign Up page: ${error.message}`);
    }
  }

  /**
   * Clicks the Sign Up submit button
   */
  async clickSignUpButton() {
    try {
      await this.signUpSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.signUpSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.signUpSubmitButton.click();
      await this.page.waitForTimeout(1000); // Wait for validation to trigger
    } catch (error) {
      throw new Error(`Failed to click Sign Up button: ${error.message}`);
    }
  }

  /**
   * Gets all validation error messages from the form
   * @returns {Promise<Array<string>>}
   */
  async getValidationErrors() {
    try {
      await this.page.waitForTimeout(1000); // Wait for errors to appear
      
      const errors = [];
      const errorCount = await this.requiredFieldErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.requiredFieldErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      // Also check for any error messages in error-message divs
      const errorMessageDivs = this.page.locator('.error-message span, .error-message');
      const divCount = await errorMessageDivs.count();
      
      for (let i = 0; i < divCount; i++) {
        const errorText = await errorMessageDivs.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim() && errorText.includes('mandatory')) {
          const trimmed = errorText.trim();
          if (!errors.includes(trimmed)) {
            errors.push(trimmed);
          }
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if form has validation errors
   * @returns {Promise<boolean>}
   */
  async hasValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.requiredFieldErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the count of required field errors
   * @returns {Promise<number>}
   */
  async getRequiredFieldErrorCount() {
    try {
      await this.page.waitForTimeout(1000);
      return await this.requiredFieldErrors.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clicks the Terms and Conditions link
   * @returns {Promise<string>} The URL after navigation
   */
  async clickTermsAndConditionsLink() {
    try {
      await this.termsAndConditionsLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.termsAndConditionsLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Wait for navigation after clicking
      const [response] = await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => null),
        this.termsAndConditionsLink.click()
      ]);
      
      await this.page.waitForTimeout(2000); // Wait for page to fully load
      return this.page.url();
    } catch (error) {
      throw new Error(`Failed to click Terms and Conditions link: ${error.message}`);
    }
  }

  /**
   * Clicks the Privacy Policy link
   * @returns {Promise<string>} The URL after navigation
   */
  async clickPrivacyPolicyLink() {
    try {
      await this.privacyPolicyLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.privacyPolicyLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Wait for navigation after clicking
      const [response] = await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }).catch(() => null),
        this.privacyPolicyLink.click()
      ]);
      
      await this.page.waitForTimeout(2000); // Wait for page to fully load
      return this.page.url();
    } catch (error) {
      throw new Error(`Failed to click Privacy Policy link: ${error.message}`);
    }
  }

  /**
   * Checks if Terms and Conditions link is visible
   * @returns {Promise<boolean>}
   */
  async isTermsAndConditionsLinkVisible() {
    try {
      return await this.termsAndConditionsLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Privacy Policy link is visible
   * @returns {Promise<boolean>}
   */
  async isPrivacyPolicyLinkVisible() {
    try {
      return await this.privacyPolicyLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Login link is visible on sign up page
   * @returns {Promise<boolean>}
   */
  async isLoginLinkVisible() {
    try {
      return await this.loginLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Login link on sign up page
   */
  async clickLoginLink() {
    try {
      await this.loginLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.loginLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.loginLink.click();
      await this.page.waitForTimeout(2000); // Wait for navigation to login page
    } catch (error) {
      throw new Error(`Failed to click Login link: ${error.message}`);
    }
  }

  /**
   * Fills the email field with a value
   * @param {string} email - Email address to fill
   */
  async fillEmail(email) {
    try {
      await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
      await this.emailField.clear();
      await this.emailField.fill(email);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill email field: ${error.message}`);
    }
  }

  /**
   * Checks if email validation error is displayed
   * @returns {Promise<boolean>}
   */
  async hasEmailValidationError() {
    try {
      await this.page.waitForTimeout(1000); // Wait for validation to trigger
      const errorCount = await this.emailValidationErrors.count();
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
      const errorCount = await this.emailValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.emailValidationErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      // Also check for email errors in error-message divs near email field
      const emailFieldError = this.page.locator('input[ng-reflect-name="email"], input#email').locator('..').locator('.error-message span');
      const emailErrorCount = await emailFieldError.count();
      
      for (let i = 0; i < emailErrorCount; i++) {
        const errorText = await emailFieldError.nth(i).textContent().catch(() => '');
        if (errorText && (errorText.includes('invalid') || errorText.includes('valid email'))) {
          const trimmed = errorText.trim();
          if (!errors.includes(trimmed)) {
            errors.push(trimmed);
          }
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if the form can be submitted (no blocking validation errors)
   * @returns {Promise<boolean>}
   */
  async canSubmitForm() {
    try {
      // Check if submit button is disabled
      const isDisabled = await this.signUpSubmitButton.isDisabled().catch(() => false);
      if (isDisabled) {
        return false;
      }
      
      // Check if email field has invalid class
      const emailInvalid = await this.emailField.evaluate((el) => {
        return el.classList.contains('ng-invalid') && !el.classList.contains('ng-pristine');
      }).catch(() => false);
      
      // If email is invalid, form should not be submittable
      if (emailInvalid) {
        const hasEmailError = await this.hasEmailValidationError();
        if (hasEmailError) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills the name field with a value
   * @param {string} name - Name to fill
   */
  async fillName(name) {
    try {
      await this.nameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.nameField.clear();
      await this.nameField.fill(name);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill name field: ${error.message}`);
    }
  }

  /**
   * Fills the password field with a value
   * @param {string} password - Password to fill
   */
  async fillPassword(password) {
    try {
      await this.passwordField.waitFor({ state: 'visible', timeout: 10000 });
      await this.passwordField.clear();
      await this.passwordField.fill(password);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill password field: ${error.message}`);
    }
  }

  /**
   * Selects/checks the terms and conditions checkbox
   */
  async selectTermsCheckbox() {
    try {
      await this.termsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
      const isChecked = await this.termsCheckbox.isChecked().catch(() => false);
      if (!isChecked) {
        await this.termsCheckbox.check();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to select terms checkbox: ${error.message}`);
    }
  }

  /**
   * Checks if password validation error is displayed
   * @returns {Promise<boolean>}
   */
  async hasPasswordValidationError() {
    try {
      await this.page.waitForTimeout(1000); // Wait for validation to trigger
      const errorCount = await this.passwordValidationErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets password validation error messages
   * @returns {Promise<Array<string>>}
   */
  async getPasswordValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errors = [];
      const errorCount = await this.passwordValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.passwordValidationErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      // Also check for password errors in error-message divs near password field
      const passwordFieldError = this.page.locator('input[ng-reflect-name="password"], input#password').locator('..').locator('.error-message span');
      const passwordErrorCount = await passwordFieldError.count();
      
      for (let i = 0; i < passwordErrorCount; i++) {
        const errorText = await passwordFieldError.nth(i).textContent().catch(() => '');
        if (errorText && (errorText.includes('6 characters') || errorText.includes('at least'))) {
          const trimmed = errorText.trim();
          if (!errors.includes(trimmed)) {
            errors.push(trimmed);
          }
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if existing email error is displayed
   * @returns {Promise<boolean>}
   */
  async hasExistingEmailError() {
    try {
      await this.page.waitForTimeout(3000); // Wait for server response
      
      // Check for error messages in form
      const errorCount = await this.existingEmailErrors.count();
      if (errorCount > 0) {
        return true;
      }
      
      // Check for alert/toast messages with more specific locators
      const alertLocators = [
        this.page.locator('.alert, .alert-danger, .alert-warning, .alert-info'),
        this.page.locator('.toast, .toast-error, .toast-warning'),
        this.page.locator('[role="alert"], [role="status"]'),
        this.page.locator('.notification, .notification-error'),
        this.page.locator('[class*="alert"], [class*="toast"], [class*="notification"]'),
        this.page.locator('.swal2-popup, .swal2-content'), // SweetAlert
        this.page.locator('.modal-body:has-text("already"), .modal:has-text("already")')
      ];
      
      for (const locator of alertLocators) {
        try {
          const count = await locator.count();
          for (let i = 0; i < count; i++) {
            const text = await locator.nth(i).textContent().catch(() => '');
            if (text && (
              text.toLowerCase().includes('already exists') ||
              text.toLowerCase().includes('already registered') ||
              text.toLowerCase().includes('email already') ||
              text.toLowerCase().includes('user already') ||
              text.toLowerCase().includes('account already')
            )) {
              return true;
            }
          }
        } catch (error) {
          continue;
        }
      }
      
      // Check for error messages in email field's parent container
      const emailFieldContainer = this.page.locator('input[ng-reflect-name="email"], input#email').locator('..');
      const containerErrors = emailFieldContainer.locator('.error-message, .text-danger, [class*="error"]');
      const containerErrorCount = await containerErrors.count();
      
      for (let i = 0; i < containerErrorCount; i++) {
        const errorText = await containerErrors.nth(i).textContent().catch(() => '');
        if (errorText && (
          errorText.toLowerCase().includes('already exists') ||
          errorText.toLowerCase().includes('already registered') ||
          errorText.toLowerCase().includes('email already')
        )) {
          return true;
        }
      }
      
      // Check if we're still on signup page (form didn't submit) - this indicates error
      const isOnSignUpPage = await this.isSignUpPageLoaded();
      if (isOnSignUpPage) {
        // Check if email field still has the value (form didn't clear)
        const emailValue = await this.emailField.inputValue().catch(() => '');
        if (emailValue) {
          // Form didn't submit, likely due to validation error
          // Check for any visible error messages
          const anyErrors = this.page.locator('.error-message:visible, .alert:visible, .toast:visible');
          const anyErrorCount = await anyErrors.count();
          if (anyErrorCount > 0) {
            // Check if any of them mention "already"
            for (let i = 0; i < anyErrorCount; i++) {
              const text = await anyErrors.nth(i).textContent().catch(() => '');
              if (text && text.toLowerCase().includes('already')) {
                return true;
              }
            }
          }
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets existing email error messages
   * @returns {Promise<Array<string>>}
   */
  async getExistingEmailErrors() {
    try {
      await this.page.waitForTimeout(3000);
      const errors = [];
      
      // Check for error messages in form
      const errorCount = await this.existingEmailErrors.count();
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.existingEmailErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.trim()) {
          errors.push(errorText.trim());
        }
      }
      
      // Check for existing email errors in error-message divs near email field
      const emailFieldError = this.page.locator('input[ng-reflect-name="email"], input#email').locator('..').locator('.error-message span, .error-message');
      const emailErrorCount = await emailFieldError.count();
      
      for (let i = 0; i < emailErrorCount; i++) {
        const errorText = await emailFieldError.nth(i).textContent().catch(() => '');
        if (errorText && (
          errorText.toLowerCase().includes('already exists') || 
          errorText.toLowerCase().includes('already registered') || 
          errorText.toLowerCase().includes('email already') ||
          errorText.toLowerCase().includes('user already') ||
          errorText.toLowerCase().includes('account already')
        )) {
          const trimmed = errorText.trim();
          if (!errors.includes(trimmed)) {
            errors.push(trimmed);
          }
        }
      }
      
      // Check for alert/toast messages with comprehensive locators
      const alertLocators = [
        this.page.locator('.alert, .alert-danger, .alert-warning, .alert-info'),
        this.page.locator('.toast, .toast-error, .toast-warning'),
        this.page.locator('[role="alert"], [role="status"]'),
        this.page.locator('.notification, .notification-error'),
        this.page.locator('[class*="alert"]:visible, [class*="toast"]:visible, [class*="notification"]:visible'),
        this.page.locator('.swal2-popup, .swal2-content'),
        this.page.locator('.modal-body, .modal-content'),
        this.page.locator('body > *:has-text("already")')
      ];
      
      for (const locator of alertLocators) {
        try {
          const count = await locator.count();
          for (let i = 0; i < count; i++) {
            const text = await locator.nth(i).textContent().catch(() => '');
            if (text && (
              text.toLowerCase().includes('already exists') ||
              text.toLowerCase().includes('already registered') ||
              text.toLowerCase().includes('email already') ||
              text.toLowerCase().includes('user already') ||
              text.toLowerCase().includes('account already')
            )) {
              const trimmed = text.trim();
              if (!errors.includes(trimmed)) {
                errors.push(trimmed);
              }
            }
          }
        } catch (error) {
          continue;
        }
      }
      
      // Check for any visible error messages that might contain "already"
      const anyVisibleErrors = this.page.locator('.error-message:visible, .text-danger:visible, [class*="error"]:visible');
      const visibleErrorCount = await anyVisibleErrors.count();
      
      for (let i = 0; i < visibleErrorCount; i++) {
        const errorText = await anyVisibleErrors.nth(i).textContent().catch(() => '');
        if (errorText && errorText.toLowerCase().includes('already')) {
          const trimmed = errorText.trim();
          if (!errors.includes(trimmed)) {
            errors.push(trimmed);
          }
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if Click Here link is visible
   * @returns {Promise<boolean>}
   */
  async isClickHereLinkVisible() {
    try {
      return await this.clickHereLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Click Here link and verifies it opens in a new tab
   * @param {string} expectedUrl - Expected URL to navigate to
   * @returns {Promise<{newPage: Page, url: string}>}
   */
  async clickClickHereLink(expectedUrl) {
    try {
      await this.clickHereLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.clickHereLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Check if link has target="_blank" attribute
      const targetAttr = await this.clickHereLink.getAttribute('target').catch(() => '');
      const hasTargetBlank = targetAttr === '_blank' || targetAttr === '_new';
      
      // Get the current page count
      const context = this.page.context();
      const pagesBefore = context.pages().length;
      
      let newPage;
      
      if (hasTargetBlank) {
        // Link has target="_blank", will open in new tab
        [newPage] = await Promise.all([
          context.waitForEvent('page', { timeout: 10000 }),
          this.clickHereLink.click()
        ]);
      } else {
        // Try to open in new tab using Ctrl+click or middle mouse button
        try {
          [newPage] = await Promise.all([
            context.waitForEvent('page', { timeout: 10000 }),
            this.clickHereLink.click({ modifiers: ['Control'] })
          ]);
        } catch (error) {
          // If Ctrl+click doesn't work, try regular click and check if new page was created
          await this.clickHereLink.click();
          await this.page.waitForTimeout(1000);
          
          const pagesAfter = context.pages().length;
          if (pagesAfter > pagesBefore) {
            // New page was created
            const pages = context.pages();
            newPage = pages[pages.length - 1];
          } else {
            // No new page, might have navigated in same tab
            newPage = this.page;
          }
        }
      }
      
      // Wait for the new page to load
      await newPage.waitForLoadState('domcontentloaded', { timeout: 15000 });
      await newPage.waitForTimeout(2000);
      
      const newPageUrl = newPage.url();
      
      return {
        newPage: newPage,
        url: newPageUrl
      };
    } catch (error) {
      throw new Error(`Failed to click Click Here link: ${error.message}`);
    }
  }

  /**
   * Checks if onboarding page is loaded
   * @returns {Promise<boolean>}
   */
  async isOnboardingPageLoaded() {
    try {
      const currentUrl = this.page.url();
      const urlContainsOnboarding = currentUrl.toLowerCase().includes('on-boarding') || 
                                    currentUrl.toLowerCase().includes('onboarding');
      
      const titleVisible = await this.onboardingPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const wrapperVisible = await this.onboardingPageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      const customerInfoVisible = await this.page.locator('p:has-text("Customer Infomation"), p:has-text("Customer Information")').isVisible({ timeout: 5000 }).catch(() => false);
      
      return urlContainsOnboarding || titleVisible || wrapperVisible || customerInfoVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills customer information form
   * @param {Object} customerData - Customer information data
   * @param {string} customerData.customerName - Customer name
   * @param {string} customerData.companyName - Company name
   * @param {string} customerData.trialPlan - Trial plan to select (e.g., "Tally On Cloud 7 Days Trial Plan")
   * @param {string} [customerData.gstNumber] - Optional GST number
   */
  async fillCustomerInformationForm(customerData) {
    try {
      // Wait for form to be visible
      await this.customerNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Fill customer name
      if (customerData.customerName) {
        await this.customerNameField.clear();
        await this.customerNameField.fill(customerData.customerName);
        await this.page.waitForTimeout(500);
      }
      
      // Fill company name
      if (customerData.companyName) {
        await this.companyNameField.clear();
        await this.companyNameField.fill(customerData.companyName);
        await this.page.waitForTimeout(500);
      }
      
      // Select trial plan
      if (customerData.trialPlan) {
        await this.trialPlanDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.trialPlanDropdown.selectOption({ label: customerData.trialPlan });
        await this.page.waitForTimeout(500);
      }
      
      // Fill GST number (optional)
      if (customerData.gstNumber) {
        await this.gstNumberField.clear();
        await this.gstNumberField.fill(customerData.gstNumber);
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to fill customer information form: ${error.message}`);
    }
  }

  /**
   * Clicks submit button on customer information form
   */
  async clickCustomerInfoSubmit() {
    try {
      await this.customerInfoSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.customerInfoSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.customerInfoSubmitButton.click();
      await this.page.waitForTimeout(3000); // Wait for navigation to start trial form
    } catch (error) {
      throw new Error(`Failed to click customer information submit button: ${error.message}`);
    }
  }

  /**
   * Checks if Start Trial form is visible
   * @returns {Promise<boolean>}
   */
  async isStartTrialFormVisible() {
    try {
      const startTrialTitle = this.page.locator('p:has-text("Start Trial")');
      const isTitleVisible = await startTrialTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const isWorkspaceFieldVisible = await this.workspaceNameField.isVisible({ timeout: 5000 }).catch(() => false);
      return isTitleVisible || isWorkspaceFieldVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills start trial form
   * @param {Object} trialData - Trial information data
   * @param {string} trialData.workspaceName - Workspace name
   * @param {string} trialData.tallyRelease - Tally release to select
   * @param {string|number} trialData.users - Number of users (1, 3-10, or 2 to show tally field)
   * @param {string|number} [trialData.numberOfTally] - Number of tally (only when users = 2, can be 1 or 2)
   */
  async fillStartTrialForm(trialData) {
    try {
      // Wait for form to be visible
      await this.workspaceNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Fill workspace name
      if (trialData.workspaceName) {
        await this.workspaceNameField.clear();
        await this.workspaceNameField.fill(trialData.workspaceName);
        await this.page.waitForTimeout(500);
      }
      
      // Select tally release
      if (trialData.tallyRelease) {
        await this.tallyReleaseDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.tallyReleaseDropdown.selectOption({ label: trialData.tallyRelease });
        await this.page.waitForTimeout(500);
      }
      
      // Fill users
      if (trialData.users !== undefined) {
        await this.usersField.clear();
        await this.usersField.fill(String(trialData.users));
        await this.page.waitForTimeout(1000); // Wait for field to update and potentially show tally field
        
        // If users = 2, wait for "no. of tally" field to appear and fill it
        if (trialData.users === 2 || trialData.users === '2') {
          // Wait longer for the tally field to become visible and interactive
          // The field appears after users field is filled, but may need time to be ready
          let tallyFieldVisible = false;
          let tallyFieldEnabled = false;
          
          for (let i = 0; i < 15; i++) {
            tallyFieldVisible = await this.numberOfTallyField.isVisible({ timeout: 2000 }).catch(() => false);
            if (tallyFieldVisible) {
              // Check if field is enabled/editable
              tallyFieldEnabled = await this.numberOfTallyField.isEnabled({ timeout: 1000 }).catch(() => false);
              if (tallyFieldEnabled) {
                break;
              }
            }
            await this.page.waitForTimeout(500);
          }
          
          if (tallyFieldVisible && tallyFieldEnabled && trialData.numberOfTally !== undefined) {
            // Wait additional time for Angular form to be fully initialized
            await this.page.waitForTimeout(1000);
            
            // Scroll into view to ensure field is accessible
            await this.numberOfTallyField.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            
            // Try multiple strategies to fill the field
            let filled = false;
            const valueToFill = String(trialData.numberOfTally);
            
            // Strategy 1: Focus, click, clear, then fill
            try {
              await this.numberOfTallyField.focus({ timeout: 5000 });
              await this.page.waitForTimeout(200);
              await this.numberOfTallyField.click({ timeout: 5000 });
              await this.page.waitForTimeout(300);
              await this.numberOfTallyField.clear();
              await this.page.waitForTimeout(200);
              await this.numberOfTallyField.fill(valueToFill);
              await this.page.waitForTimeout(500);
              
              // Verify the value was set
              const currentValue = await this.numberOfTallyField.inputValue().catch(() => '');
              if (currentValue === valueToFill) {
                filled = true;
              }
            } catch (error) {
              // Strategy 1 failed, try next
            }
            
            // Strategy 2: Use type with select all if fill didn't work
            if (!filled) {
              try {
                await this.numberOfTallyField.focus({ timeout: 5000 });
                await this.page.waitForTimeout(200);
                await this.numberOfTallyField.click({ timeout: 5000 });
                await this.page.waitForTimeout(300);
                await this.numberOfTallyField.press('Control+a'); // Select all
                await this.page.waitForTimeout(100);
                await this.numberOfTallyField.type(valueToFill, { delay: 100 });
                await this.page.waitForTimeout(500);
                
                const currentValue = await this.numberOfTallyField.inputValue().catch(() => '');
                if (currentValue === valueToFill) {
                  filled = true;
                }
              } catch (error) {
                // Strategy 2 failed, try next
              }
            }
            
            // Strategy 3: Use evaluate to set value directly and trigger Angular events
            if (!filled) {
              try {
                await this.numberOfTallyField.evaluate((el, value) => {
                  // Set the value
                  el.value = value;
                  // Trigger input event (for Angular reactive forms)
                  el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                  // Trigger change event
                  el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
                  // Trigger focus and blur to ensure validation runs
                  el.dispatchEvent(new Event('focus', { bubbles: true }));
                  el.dispatchEvent(new Event('blur', { bubbles: true }));
                }, valueToFill);
                await this.page.waitForTimeout(500);
                
                const currentValue = await this.numberOfTallyField.inputValue().catch(() => '');
                if (currentValue === valueToFill) {
                  filled = true;
                }
              } catch (error) {
                // Strategy 3 failed
              }
            }
            
            // Strategy 4: Try setting via formControlName (Angular specific)
            if (!filled) {
              try {
                // Find the form control and set value via Angular's FormControl
                await this.page.evaluate((value) => {
                  const input = document.querySelector('input[ng-reflect-name="noOfTally"]');
                  if (input) {
                    // Get Angular component instance if available
                    const ngControl = window.ng && window.ng.getComponent ? window.ng.getComponent(input) : null;
                    if (ngControl && ngControl.control) {
                      ngControl.control.setValue(value);
                    } else {
                      // Fallback: set value and trigger events
                      input.value = value;
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                      input.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                  }
                }, valueToFill);
                await this.page.waitForTimeout(500);
                
                const currentValue = await this.numberOfTallyField.inputValue().catch(() => '');
                if (currentValue === valueToFill) {
                  filled = true;
                }
              } catch (error) {
                // Strategy 4 failed
              }
            }
            
            // Final verification
            const finalValue = await this.numberOfTallyField.inputValue().catch(() => '');
            if (finalValue !== valueToFill) {
              // Try one more time with a longer wait
              await this.page.waitForTimeout(1000);
              await this.numberOfTallyField.click();
              await this.page.waitForTimeout(200);
              await this.numberOfTallyField.fill(valueToFill);
              await this.page.waitForTimeout(500);
              
              const retryValue = await this.numberOfTallyField.inputValue().catch(() => '');
              if (retryValue !== valueToFill) {
                throw new Error(`Failed to fill numberOfTally field after all strategies. Expected: ${valueToFill}, Got: ${retryValue}. Field visible: ${tallyFieldVisible}, Enabled: ${tallyFieldEnabled}`);
              }
            }
          } else if (trialData.numberOfTally !== undefined) {
            throw new Error(`numberOfTally field is not visible or not enabled. Visible: ${tallyFieldVisible}, Enabled: ${tallyFieldEnabled}`);
          }
        }
      }
    } catch (error) {
      throw new Error(`Failed to fill start trial form: ${error.message}`);
    }
  }

  /**
   * Clicks submit button on start trial form
   */
  async clickStartTrialSubmit() {
    try {
      await this.startTrialSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.startTrialSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.startTrialSubmitButton.click();
      await this.page.waitForTimeout(5000); // Wait for navigation to dashboard
    } catch (error) {
      throw new Error(`Failed to click start trial submit button: ${error.message}`);
    }
  }

  /**
   * Checks if dashboard page is loaded
   * @returns {Promise<boolean>}
   */
  async isDashboardPageLoaded() {
    try {
      const currentUrl = this.page.url();
      const lowerUrl = currentUrl.toLowerCase();

      // Root/base URL check - handle both with and without trailing slash
      // e.g., https://dev.cocloud.in/ or https://dev.cocloud.in
      const urlParts = currentUrl.split('/');
      const baseUrlWithSlash = urlParts.slice(0, 3).join('/') + '/';
      const baseUrlWithoutSlash = urlParts.slice(0, 3).join('/');
      const urlIsRoot = currentUrl === baseUrlWithSlash || currentUrl === baseUrlWithoutSlash;

      // If URL is root, consider it as dashboard (user confirmed this)
      if (urlIsRoot) {
        return true;
      }

      // Consider both explicit dashboard URLs and the root URL as potential dashboard locations
      const urlContainsDashboard = lowerUrl.includes('dashboard') || lowerUrl.includes('home');

      const titleVisible = await this.dashboardPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const wrapperVisible = await this.dashboardPageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      const sidebarVisible = await this.dashboardSidebarLink.isVisible({ timeout: 5000 }).catch(() => false);
      const welcomeVisible = await this.dashboardWelcomeText.isVisible({ timeout: 5000 }).catch(() => false);

      // Treat any of these indicators as a successful dashboard load
      return urlContainsDashboard || titleVisible || wrapperVisible || sidebarVisible || welcomeVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills complete signup form with valid details
   * @param {Object} signupData - Signup data
   * @param {string} signupData.name - Name
   * @param {string} signupData.email - Email
   * @param {string} signupData.password - Password
   */
  async fillSignUpForm(signupData) {
    try {
      await this.fillName(signupData.name);
      await this.fillEmail(signupData.email);
      await this.fillPassword(signupData.password);
      await this.selectTermsCheckbox();
    } catch (error) {
      throw new Error(`Failed to fill signup form: ${error.message}`);
    }
  }

  /**
   * Checks if onboarding page is loaded
   * @returns {Promise<boolean>}
   */
  async isOnboardingPageLoaded() {
    try {
      const currentUrl = this.page.url();
      const urlContainsOnboarding = currentUrl.toLowerCase().includes('on-boarding') || 
                                    currentUrl.toLowerCase().includes('onboarding');
      
      const titleVisible = await this.onboardingPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const wrapperVisible = await this.onboardingPageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      
      return urlContainsOnboarding || titleVisible || wrapperVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Customer Information form is visible
   * @returns {Promise<boolean>}
   */
  async isCustomerInformationFormVisible() {
    try {
      const customerNameVisible = await this.customerNameField.isVisible({ timeout: 5000 }).catch(() => false);
      const titleVisible = await this.page.locator('p:has-text("Customer Infomation")').isVisible({ timeout: 5000 }).catch(() => false);
      return customerNameVisible || titleVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Start Trial form is visible
   * @returns {Promise<boolean>}
   */
  async isStartTrialFormVisible() {
    try {
      const workspaceNameVisible = await this.workspaceNameField.isVisible({ timeout: 5000 }).catch(() => false);
      const titleVisible = await this.page.locator('p:has-text("Start Trial")').isVisible({ timeout: 5000 }).catch(() => false);
      return workspaceNameVisible || titleVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills customer information form
   * @param {Object} customerData - Customer information data
   * @param {string} customerData.customerName - Customer name
   * @param {string} customerData.companyName - Company name
   * @param {string} customerData.trialPlan - Trial plan to select (e.g., "Busy On Cloud 7 Days Trial Plan")
   * @param {string} [customerData.gstNumber] - Optional GST number
   */
  async fillCustomerInformationForm(customerData) {
    try {
      // Fill customer name
      if (customerData.customerName) {
        await this.customerNameField.waitFor({ state: 'visible', timeout: 10000 });
        await this.customerNameField.clear();
        await this.customerNameField.fill(customerData.customerName);
        await this.page.waitForTimeout(500);
      }
      
      // Fill company name
      if (customerData.companyName) {
        await this.companyNameField.waitFor({ state: 'visible', timeout: 10000 });
        await this.companyNameField.clear();
        await this.companyNameField.fill(customerData.companyName);
        await this.page.waitForTimeout(500);
      }
      
      // Select trial plan
      if (customerData.trialPlan) {
        await this.trialPlanDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.trialPlanDropdown.selectOption({ label: customerData.trialPlan });
        await this.page.waitForTimeout(500);
      }
      
      // Fill GST number (optional)
      if (customerData.gstNumber) {
        await this.gstNumberField.waitFor({ state: 'visible', timeout: 10000 });
        await this.gstNumberField.clear();
        await this.gstNumberField.fill(customerData.gstNumber);
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to fill customer information form: ${error.message}`);
    }
  }

  /**
   * Clicks submit button on customer information form
   */
  async clickCustomerInfoSubmit() {
    try {
      await this.customerInfoSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.customerInfoSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.customerInfoSubmitButton.click();
      await this.page.waitForTimeout(2000); // Wait for navigation to start trial form
    } catch (error) {
      throw new Error(`Failed to click customer information submit button: ${error.message}`);
    }
  }

  /**
   * Clears all fields in customer information form
   */
  async clearCustomerInformationForm() {
    try {
      // Clear customer name with timeout protection
      try {
        const customerNameVisible = await this.customerNameField.isVisible({ timeout: 3000 }).catch(() => false);
        if (customerNameVisible) {
          await Promise.race([
            this.customerNameField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Clear company name with timeout protection
      try {
        const companyNameVisible = await this.companyNameField.isVisible({ timeout: 3000 }).catch(() => false);
        if (companyNameVisible) {
          await Promise.race([
            this.companyNameField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Reset trial plan dropdown with timeout protection
      try {
        const dropdownVisible = await this.trialPlanDropdown.isVisible({ timeout: 3000 }).catch(() => false);
        if (dropdownVisible) {
          // Try to select first option (Select an option)
          await Promise.race([
            this.trialPlanDropdown.selectOption({ index: 0 }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {
            // If that fails, try selecting by value
            return Promise.race([
              this.trialPlanDropdown.selectOption({ value: '' }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
            ]).catch(() => {});
          });
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Clear GST number (optional field) with timeout protection
      try {
        const gstVisible = await this.gstNumberField.isVisible({ timeout: 3000 }).catch(() => false);
        if (gstVisible) {
          await Promise.race([
            this.gstNumberField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      // Silently continue - some fields might not be clearable
    }
  }

  /**
   * Gets all validation error messages from customer information form
   * @returns {Promise<Array<string>>}
   */
  async getCustomerInfoValidationErrors() {
    try {
      await this.page.waitForTimeout(1000); // Wait for errors to appear
      
      const errors = [];
      const errorCount = await this.customerInfoValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.customerInfoValidationErrors.nth(i).textContent().catch(() => '');
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
   * Checks if customer information form has validation errors
   * @returns {Promise<boolean>}
   */
  async hasCustomerInfoValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.customerInfoValidationErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets count of required field errors in customer information form
   * @returns {Promise<number>}
   */
  async getCustomerInfoRequiredFieldErrorCount() {
    try {
      await this.page.waitForTimeout(1000);
      return await this.customerInfoRequiredFieldErrors.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clears all fields in start trial form
   */
  async clearStartTrialForm() {
    try {
      // Clear workspace name with timeout protection
      try {
        const workspaceVisible = await this.workspaceNameField.isVisible({ timeout: 3000 }).catch(() => false);
        if (workspaceVisible) {
          await Promise.race([
            this.workspaceNameField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Reset tally release dropdown with timeout protection
      try {
        const dropdownVisible = await this.tallyReleaseDropdown.isVisible({ timeout: 3000 }).catch(() => false);
        if (dropdownVisible) {
          // Try to select first option (Select an option)
          await Promise.race([
            this.tallyReleaseDropdown.selectOption({ index: 0 }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {
            // If that fails, try selecting by value
            return Promise.race([
              this.tallyReleaseDropdown.selectOption({ value: '' }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
            ]).catch(() => {});
          });
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(200);
      
      // Clear users field with timeout protection
      try {
        const usersVisible = await this.usersField.isVisible({ timeout: 3000 }).catch(() => false);
        if (usersVisible) {
          await Promise.race([
            this.usersField.clear(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch(() => {});
        }
      } catch (error) {
        // Continue if clearing fails
      }
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      // Silently continue - some fields might not be clearable
    }
  }

  /**
   * Gets all validation error messages from start trial form
   * @returns {Promise<Array<string>>}
   */
  async getStartTrialValidationErrors() {
    try {
      await this.page.waitForTimeout(1000); // Wait for errors to appear
      
      const errors = [];
      const errorCount = await this.startTrialValidationErrors.count();
      
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.startTrialValidationErrors.nth(i).textContent().catch(() => '');
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
   * Checks if start trial form has validation errors
   * @returns {Promise<boolean>}
   */
  async hasStartTrialValidationErrors() {
    try {
      await this.page.waitForTimeout(1000);
      const errorCount = await this.startTrialValidationErrors.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets count of required field errors in start trial form
   * @returns {Promise<number>}
   */
  async getStartTrialRequiredFieldErrorCount() {
    try {
      await this.page.waitForTimeout(1000);
      return await this.startTrialRequiredFieldErrors.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Fills start trial form
   * @param {Object} trialData - Trial information data
   * @param {string} trialData.workspaceName - Workspace name
   * @param {string} trialData.tallyRelease - Tally release to select (e.g., "Tally_2_1_el")
   * @param {string|number} trialData.users - Number of users (1 to 10)
   */
  async fillStartTrialForm(trialData) {
    try {
      // Fill workspace name
      if (trialData.workspaceName) {
        await this.workspaceNameField.waitFor({ state: 'visible', timeout: 10000 });
        await this.workspaceNameField.clear();
        await this.workspaceNameField.fill(trialData.workspaceName);
        await this.page.waitForTimeout(500);
      }
      
      // Select tally release
      if (trialData.tallyRelease) {
        await this.tallyReleaseDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.tallyReleaseDropdown.selectOption({ label: trialData.tallyRelease });
        await this.page.waitForTimeout(500);
      }
      
      // Fill users
      if (trialData.users !== undefined) {
        await this.usersField.waitFor({ state: 'visible', timeout: 10000 });
        await this.usersField.clear();
        await this.usersField.fill(String(trialData.users));
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to fill start trial form: ${error.message}`);
    }
  }

  /**
   * Clicks submit button on start trial form
   */
  async clickStartTrialSubmit() {
    try {
      await this.startTrialSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.startTrialSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.startTrialSubmitButton.click();
      await this.page.waitForTimeout(3000); // Wait for navigation
    } catch (error) {
      throw new Error(`Failed to click start trial submit button: ${error.message}`);
    }
  }

  /**
   * Navigates to onboarding page
   * @param {string} baseUrl - Base URL of the application
   */
  async gotoOnboardingPage(baseUrl) {
    try {
      const onboardingUrl = `${baseUrl}on-boarding`;
      await this.page.goto(onboardingUrl);
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
      
      const isLoaded = await this.isOnboardingPageLoaded();
      if (!isLoaded) {
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to navigate to onboarding page: ${error.message}`);
    }
  }

  /**
   * Checks if a sidebar module is clickable (not locked/disabled)
   * @param {import('@playwright/test').Locator} moduleLocator - Locator for the sidebar module
   * @returns {Promise<boolean>}
   */
  async isSidebarModuleClickable(moduleLocator) {
    try {
      // Check if module is visible
      const isVisible = await moduleLocator.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isVisible) {
        return false;
      }
      
      // Check if module has padlock icon (indicates locked)
      const hasPadlock = await moduleLocator.locator('..').locator('i.bi-lock-fill, .lock-icon, [class*="lock"]').isVisible({ timeout: 1000 }).catch(() => false);
      if (hasPadlock) {
        return false;
      }
      
      // Check if link is disabled
      const isDisabled = await moduleLocator.isDisabled().catch(() => false);
      if (isDisabled) {
        return false;
      }
      
      // Check if parent has disabled class
      const parentHasDisabled = await moduleLocator.locator('..').evaluate((el) => {
        return el.classList.contains('disabled') || 
               el.classList.contains('locked') ||
               el.hasAttribute('disabled');
      }).catch(() => false);
      
      return !parentHasDisabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks a sidebar module and checks if URL changes
   * @param {import('@playwright/test').Locator} moduleLocator - Locator for the sidebar module
   * @param {string} expectedOnboardingUrl - Expected onboarding URL to verify we're still on onboarding
   * @returns {Promise<{urlChanged: boolean, newUrl: string}>}
   */
  async clickSidebarModuleAndCheckUrl(moduleLocator, expectedOnboardingUrl) {
    try {
      const urlBefore = this.page.url();
      
      await moduleLocator.waitFor({ state: 'visible', timeout: 5000 });
      await moduleLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      await moduleLocator.click();
      await this.page.waitForTimeout(2000); // Wait for any navigation
      
      const urlAfter = this.page.url();
      const urlChanged = urlBefore !== urlAfter;
      const stillOnOnboarding = urlAfter.includes('on-boarding') || urlAfter.includes('onboarding');
      
      return {
        urlChanged: urlChanged,
        newUrl: urlAfter,
        stillOnOnboarding: stillOnOnboarding
      };
    } catch (error) {
      // If click fails, might be because module is disabled
      return {
        urlChanged: false,
        newUrl: this.page.url(),
        stillOnOnboarding: true,
        error: error.message
      };
    }
  }

  /**
   * Clicks Service Request to open collapse menu
   */
  async clickServiceRequestToOpenCollapse() {
    try {
      await this.sidebarServiceRequestLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.sidebarServiceRequestLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Check if collapse is already open
      const collapseMenu = this.page.locator('#service-request.collapse.show, #service-request.collapse.show');
      const isAlreadyOpen = await collapseMenu.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!isAlreadyOpen) {
        // Click to open the collapse
        await this.sidebarServiceRequestLink.click();
        await this.page.waitForTimeout(1000); // Wait for collapse to open
      }
      
      // Verify collapse is open by checking if the menu is visible
      const isMenuVisible = await collapseMenu.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isMenuVisible) {
        // Try clicking again
        await this.sidebarServiceRequestLink.click();
        await this.page.waitForTimeout(1000);
      }
      
      // Wait for the menu items to be visible
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click Service Request: ${error.message}`);
    }
  }

  /**
   * Clicks All Request from Service Request dropdown
   * @param {string} expectedOnboardingUrl - Expected onboarding URL to verify we're still on onboarding
   * @returns {Promise<{urlChanged: boolean, newUrl: string}>}
   */
  async clickAllRequestFromDropdown(expectedOnboardingUrl) {
    try {
      const urlBefore = this.page.url();
      
      // First open the Service Request collapse menu
      await this.clickServiceRequestToOpenCollapse();
      
      // Wait for collapse menu to be visible and All Request link to appear
      await this.page.waitForTimeout(1000);
      
      // Try multiple locators for All Request (prioritize router-link and href)
      const allRequestLocators = [
        this.page.locator('a[ng-reflect-router-link="all-request"]').first(),
        this.page.locator('a[href="/all-request"]').first(),
        this.page.locator('#service-request a:has-text("All Request")').first(),
        this.page.locator('#service-request a:has-text("All Requests")').first(),
        this.page.locator('#service-request.collapse.show a:has-text("All Request")').first(),
        this.sidebarAllRequestLink,
        this.page.locator('a:has-text("All Request"):visible').first()
      ];
      
      let allRequestLink = null;
      for (const locator of allRequestLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            allRequestLink = locator;
            break;
          }
        } catch (error) {
          continue;
        }
      }
      
      if (!allRequestLink) {
        throw new Error('All Request link not found in dropdown');
      }
      
      // Scroll into view and wait
      await allRequestLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Wait for element to be in a stable state and actionable
      await allRequestLink.waitFor({ state: 'visible', timeout: 5000 });
      await allRequestLink.waitFor({ state: 'attached', timeout: 5000 });
      
      // Check if element is enabled
      const isEnabled = await allRequestLink.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('All Request link is disabled');
      }
      
      // Get element text for debugging
      const linkText = await allRequestLink.textContent().catch(() => '');
      console.log(`  Found All Request link with text: "${linkText}"`);
      
      // Try multiple click strategies
      let clickSuccess = false;
      const urlBeforeClick = this.page.url();
      
      // Strategy 1: Normal click
      try {
        await allRequestLink.click({ timeout: 5000 });
        await this.page.waitForTimeout(2000);
        const urlAfterClick = this.page.url();
        if (urlAfterClick !== urlBeforeClick) {
          clickSuccess = true;
          console.log(`  Normal click succeeded - URL changed`);
        } else {
          console.log(`  Normal click executed but URL didn't change`);
        }
      } catch (error) {
        console.log(`  Normal click failed: ${error.message}`);
      }
      
      // Strategy 2: Hover then click
      if (!clickSuccess) {
        try {
          await allRequestLink.hover();
          await this.page.waitForTimeout(500);
          await allRequestLink.click({ timeout: 5000 });
          await this.page.waitForTimeout(2000);
          const urlAfterClick = this.page.url();
          if (urlAfterClick !== urlBeforeClick) {
            clickSuccess = true;
            console.log(`  Hover + click succeeded - URL changed`);
          } else {
            console.log(`  Hover + click executed but URL didn't change`);
          }
        } catch (error) {
          console.log(`  Hover + click failed: ${error.message}`);
        }
      }
      
      // Strategy 3: Force click
      if (!clickSuccess) {
        try {
          await allRequestLink.click({ force: true, timeout: 5000 });
          await this.page.waitForTimeout(2000);
          const urlAfterClick = this.page.url();
          if (urlAfterClick !== urlBeforeClick) {
            clickSuccess = true;
            console.log(`  Force click succeeded - URL changed`);
          } else {
            console.log(`  Force click executed but URL didn't change`);
          }
        } catch (error) {
          console.log(`  Force click failed: ${error.message}`);
        }
      }
      
      // Strategy 4: JavaScript click
      if (!clickSuccess) {
        try {
          await allRequestLink.evaluate((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.click();
          });
          await this.page.waitForTimeout(2000);
          const urlAfterClick = this.page.url();
          if (urlAfterClick !== urlBeforeClick) {
            clickSuccess = true;
            console.log(`  JavaScript click succeeded - URL changed`);
          } else {
            console.log(`  JavaScript click executed but URL didn't change`);
          }
        } catch (error) {
          console.log(`  JavaScript click failed: ${error.message}`);
        }
      }
      
      if (!clickSuccess) {
        throw new Error('All click strategies failed - link may not be clickable');
      }
      
      // Wait for navigation - wait for URL to change or wait for specific URL
      await Promise.race([
        this.page.waitForURL('**/all-request**', { timeout: 10000 }).catch(() => {}),
        this.page.waitForTimeout(5000)
      ]);
      
      // Additional wait to ensure navigation completes
      await this.page.waitForTimeout(2000);
      
      const urlAfter = this.page.url();
      const urlChanged = urlBefore !== urlAfter;
      const expectedUrl = 'https://dev.cocloud.in/all-request';
      const urlMatches = urlAfter.includes('/all-request') || urlAfter === expectedUrl;
      
      return {
        urlChanged: urlChanged,
        newUrl: urlAfter,
        urlMatches: urlMatches,
        expectedUrl: expectedUrl
      };
    } catch (error) {
      return {
        urlChanged: false,
        newUrl: this.page.url(),
        urlMatches: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks Raise Request from Service Request dropdown
   * @param {string} expectedOnboardingUrl - Expected onboarding URL to verify we're still on onboarding
   * @returns {Promise<{urlChanged: boolean, newUrl: string}>}
   */
  async clickRaiseRequestFromDropdown(expectedOnboardingUrl) {
    try {
      const urlBefore = this.page.url();
      
      // First open the Service Request collapse menu
      await this.clickServiceRequestToOpenCollapse();
      
      // Wait for collapse menu to be visible and Raise Request link to appear
      await this.page.waitForTimeout(1000);
      
      // Try multiple locators for Raise Request (prioritize router-link and href)
      const raiseRequestLocators = [
        this.page.locator('a[ng-reflect-router-link="raise-service-request"]').first(),
        this.page.locator('a[href="/raise-service-request"]').first(),
        this.page.locator('#service-request a:has-text("Raise Request")').first(),
        this.page.locator('#service-request.collapse.show a:has-text("Raise Request")').first(),
        this.sidebarRaiseRequestLink,
        this.page.locator('a:has-text("Raise Request"):visible').first()
      ];
      
      let raiseRequestLink = null;
      for (const locator of raiseRequestLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            raiseRequestLink = locator;
            break;
          }
        } catch (error) {
          continue;
        }
      }
      
      if (!raiseRequestLink) {
        throw new Error('Raise Request link not found in dropdown');
      }
      
      // Scroll into view and wait
      await raiseRequestLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Wait for element to be in a stable state and actionable
      await raiseRequestLink.waitFor({ state: 'visible', timeout: 5000 });
      await raiseRequestLink.waitFor({ state: 'attached', timeout: 5000 });
      
      // Check if element is enabled
      const isEnabled = await raiseRequestLink.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Raise Request link is disabled');
      }
      
      // Get element text for debugging
      const linkText = await raiseRequestLink.textContent().catch(() => '');
      console.log(`  Found Raise Request link with text: "${linkText}"`);
      
      // Try multiple click strategies
      let clickSuccess = false;
      const urlBeforeClick = this.page.url();
      
      // Strategy 1: Normal click
      try {
        await raiseRequestLink.click({ timeout: 5000 });
        await this.page.waitForTimeout(2000);
        const urlAfterClick = this.page.url();
        if (urlAfterClick !== urlBeforeClick) {
          clickSuccess = true;
          console.log(`  Normal click succeeded - URL changed`);
        } else {
          console.log(`  Normal click executed but URL didn't change`);
        }
      } catch (error) {
        console.log(`  Normal click failed: ${error.message}`);
      }
      
      // Strategy 2: Hover then click
      if (!clickSuccess) {
        try {
          await raiseRequestLink.hover();
          await this.page.waitForTimeout(500);
          await raiseRequestLink.click({ timeout: 5000 });
          await this.page.waitForTimeout(2000);
          const urlAfterClick = this.page.url();
          if (urlAfterClick !== urlBeforeClick) {
            clickSuccess = true;
            console.log(`  Hover + click succeeded - URL changed`);
          } else {
            console.log(`  Hover + click executed but URL didn't change`);
          }
        } catch (error) {
          console.log(`  Hover + click failed: ${error.message}`);
        }
      }
      
      // Strategy 3: Force click
      if (!clickSuccess) {
        try {
          await raiseRequestLink.click({ force: true, timeout: 5000 });
          await this.page.waitForTimeout(2000);
          const urlAfterClick = this.page.url();
          if (urlAfterClick !== urlBeforeClick) {
            clickSuccess = true;
            console.log(`  Force click succeeded - URL changed`);
          } else {
            console.log(`  Force click executed but URL didn't change`);
          }
        } catch (error) {
          console.log(`  Force click failed: ${error.message}`);
        }
      }
      
      // Strategy 4: JavaScript click
      if (!clickSuccess) {
        try {
          await raiseRequestLink.evaluate((el) => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.click();
          });
          await this.page.waitForTimeout(2000);
          const urlAfterClick = this.page.url();
          if (urlAfterClick !== urlBeforeClick) {
            clickSuccess = true;
            console.log(`  JavaScript click succeeded - URL changed`);
          } else {
            console.log(`  JavaScript click executed but URL didn't change`);
          }
        } catch (error) {
          console.log(`  JavaScript click failed: ${error.message}`);
        }
      }
      
      if (!clickSuccess) {
        throw new Error('All click strategies failed - link may not be clickable');
      }
      
      // Wait for navigation - wait for URL to change or wait for specific URL
      await Promise.race([
        this.page.waitForURL('**/raise-service-request**', { timeout: 10000 }).catch(() => {}),
        this.page.waitForTimeout(5000)
      ]);
      
      // Additional wait to ensure navigation completes
      await this.page.waitForTimeout(2000);
      
      const urlAfter = this.page.url();
      const urlChanged = urlBefore !== urlAfter;
      const expectedUrl = 'https://dev.cocloud.in/raise-service-request';
      const urlMatches = urlAfter.includes('/raise-service-request') || urlAfter === expectedUrl;
      
      return {
        urlChanged: urlChanged,
        newUrl: urlAfter,
        urlMatches: urlMatches,
        expectedUrl: expectedUrl
      };
    } catch (error) {
      return {
        urlChanged: false,
        newUrl: this.page.url(),
        urlMatches: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks logout link and checks if modal opens
   * @returns {Promise<boolean>}
   */
  async clickLogoutAndCheckModal() {
    try {
      // Try multiple locators for logout
      const logoutLocators = [
        this.sidebarLogoutLink,
        this.page.locator('nav a:has-text("Logout")').first(),
        this.page.locator('a:has-text("Logout"):visible').first(),
        this.page.locator('[class*="sidebar"] a:has-text("Logout")').first(),
        this.page.locator('li:has-text("Logout") a').first(),
        this.page.locator('button:has-text("Logout")').first(),
        this.page.locator('[class*="nav"] a:has-text("Logout")').first()
      ];
      
      let logoutLink = null;
      for (const locator of logoutLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            logoutLink = locator;
            break;
          }
        } catch (error) {
          continue;
        }
      }
      
      if (!logoutLink) {
        throw new Error('Logout link not found');
      }
      
      await logoutLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      await logoutLink.click();
      await this.page.waitForTimeout(2000); // Wait for modal to open
      
      // Check for modal with multiple locators
      const modalLocators = [
        this.logoutModal,
        this.page.locator('.modal:has-text("Logout")').first(),
        this.page.locator('.modal:has-text("log out")').first(),
        this.page.locator('.modal-dialog:has-text("Logout")').first(),
        this.page.locator('.modal.show').first(),
        this.page.locator('[class*="modal"]:has-text("Logout")').first()
      ];
      
      for (const modalLocator of modalLocators) {
        const isModalOpen = await modalLocator.isVisible({ timeout: 3000 }).catch(() => false);
        if (isModalOpen) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all sidebar module locators as an array
   * @returns {Array<{name: string, locator: import('@playwright/test').Locator}>}
   */
  getSidebarModules() {
    return [
      { name: 'Dashboard', locator: this.sidebarDashboardLink },
      { name: 'App Management', locator: this.sidebarAppManagementLink },
      { name: 'User Management', locator: this.sidebarUserManagementLink },
      { name: 'File Manager', locator: this.sidebarFileManagerLink },
      { name: 'Google Drive', locator: this.sidebarGoogleDriveLink },
      { name: 'Logs & Security', locator: this.sidebarLogsSecurityLink },
      { name: 'Download Setup', locator: this.sidebarDownloadSetupLink },
      { name: 'Connectivity Test', locator: this.sidebarConnectivityTestLink },
      { name: 'Account Details', locator: this.sidebarAccountDetailsLink },
      { name: 'Knowledge Base', locator: this.sidebarKnowledgeBaseLink }
    ];
  }
}

module.exports = { SignupPage };


