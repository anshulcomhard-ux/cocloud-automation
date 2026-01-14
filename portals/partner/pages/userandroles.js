class UserAndRolesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - User & Roles module entry
    this.userAndRolesMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/user-and-roles"], ' +
        'div.sidebar-items:has(span.title:has-text("User & Roles")), ' +
        'div.sidebar-items:has(span.title:has-text("User and Roles"))'
      )
      .first();

    // User & Roles page title
    this.userAndRolesPageTitle = page
      .locator(
        'h1:has-text("User & Roles"), h2:has-text("User & Roles"), ' +
        'h1:has-text("User and Roles"), h2:has-text("User and Roles"), ' +
        'span.title:has-text("User & Roles"), *:has-text("User & Roles")'
      )
      .first();

    // Add User button - using strict mode
    this.addUserButton = page
      .getByRole('button', { name: /add user/i })
      .or(page.getByText(/add user/i).locator('..').getByRole('button'))
      .first();

    // Form container/modal
    this.formContainer = page.locator('div.modal-section, div.modal-dialog, form').first();

    // Form field locators using strict mode
    // Full Name
    this.fullNameInput = page.getByLabel(/full name/i).or(page.getByPlaceholder(/full name/i)).first();
    this.fullNameLabel = page.getByText(/full name/i).first();

    // Email ID
    this.emailInput = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i)).first();
    this.emailLabel = page.getByText(/email/i).first();

    // Password
    this.passwordInput = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i)).first();
    this.passwordLabel = page.getByText(/password/i).first();

    // Confirm Password
    this.confirmPasswordInput = page
      .getByLabel(/confirm password/i)
      .or(page.getByPlaceholder(/confirm password/i))
      .first();
    this.confirmPasswordLabel = page.getByText(/confirm password/i).first();

    // Mobile Number
    this.mobileInput = page
      .getByLabel(/mobile/i)
      .or(page.getByPlaceholder(/mobile/i))
      .first();
    this.mobileLabel = page.getByText(/mobile/i).first();

    // Company Name
    this.companyNameInput = page
      .getByLabel(/company name/i)
      .or(page.getByPlaceholder(/company name/i))
      .first();
    this.companyNameLabel = page.getByText(/company name/i).first();

    // Role dropdown - using strict mode (native select element)
    this.roleDropdown = page
      .locator('select#role, select[id="role"], select[formcontrolname="role"]')
      .or(page.getByLabel(/role/i))
      .or(page.locator('select').filter({ has: page.getByText(/role/i) }))
      .first();
    this.roleLabel = page.getByText(/role/i).first();
    this.roleDropdownOptions = page.locator('select#role option, select[id="role"] option');

    // Form action buttons - using strict mode
    this.submitButton = page.getByRole('button', { name: /submit/i }).or(
      page.locator('button[type="submit"]').or(page.locator('button.btn-label:has-text("Submit")'))
    ).first();
    this.cancelButton = page.getByRole('button', { name: /cancel/i }).first();

    // Validation error messages
    this.validationMessages = page.locator(
      'div[class*="error"], div[class*="invalid"], ' +
      'span[class*="error"], mat-error, ' +
      '*[class*="error-message"], *[class*="validation"]'
    );

    // Toast/Success message locators
    this.toastContainer = page.locator('#toast-container, div[class*="toast"]').first();
    // Toast messages inside the container
    this.toastMessages = page.locator(
      '#toast-container > div, #toast-container .toast, ' +
      'div[class*="toast"] > div, div[class*="toast-message"]'
    );
    this.successToast = page
      .locator(
        '#toast-container div[class*="success"], ' +
        '#toast-container div[class*="toast-success"], ' +
        '#toast-container *:has-text("successfully"), ' +
        '#toast-container *:has-text("Success"), ' +
        'div[class*="success"], div[class*="toast-success"], ' +
        '*:has-text("successfully"), *:has-text("Success")'
      )
      .first();
    this.errorToast = page
      .locator(
        '#toast-container div[class*="error"], ' +
        '#toast-container div[class*="toast-error"], ' +
        '#toast-container *:has-text("Error"), ' +
        'div[class*="error"], div[class*="toast-error"], ' +
        '*:has-text("Error"), *[class*="error-message"]'
      )
      .first();

    // User & Roles table locators
    this.userTable = page.locator('table, mat-table').first();
    this.userTableRows = page.locator('table tbody tr, mat-table tbody tr, mat-row');
    this.userTableHeaders = page.locator('table thead th, mat-table thead th, mat-header-row mat-header-cell');

    // Table column locators (for verification)
    this.nameColumn = page.locator('td, mat-cell').filter({ hasText: /name/i }).first();
    this.emailColumn = page.locator('td, mat-cell').filter({ hasText: /email/i }).first();
    this.mobileColumn = page.locator('td, mat-cell').filter({ hasText: /mobile/i }).first();
    this.roleColumn = page.locator('td, mat-cell').filter({ hasText: /role/i }).first();
    this.statusColumn = page.locator('td, mat-cell').filter({ hasText: /status/i }).first();

    // Action menu locators
    this.actionButton = page.locator('button.action-btn.btn-primary:has-text("Action"), button.action-btn:has-text("Action"), button:has-text("Action")').first();
    this.actionMenu = page.locator('ul.dropdown-menu.show, ul.dropdown-menu, div[role="menu"], mat-menu').first();
    this.editAction = page.getByRole('menuitem', { name: /edit/i }).or(page.locator('*:has-text("Edit")')).first();
    this.editSalesmanAction = page.locator('li:has-text("Edit Salesman"), ul.dropdown-menu li:has-text("Edit Salesman")').first();
    this.editUserAction = page.locator('li:has-text("Edit User"), ul.dropdown-menu li:has-text("Edit User")').first();
    this.deleteSalesmanAction = page.locator('li:has-text("Delete Salesman"), ul.dropdown-menu li:has-text("Delete Salesman")').first();
    this.deleteUserAction = page.locator('li:has-text("Delete User"), ul.dropdown-menu li:has-text("Delete User")').first();
    this.activateAction = page.getByRole('menuitem', { name: /activate/i }).or(page.locator('*:has-text("Activate")')).first();
    this.deactivateAction = page.getByRole('menuitem', { name: /deactivate/i }).or(page.locator('*:has-text("Deactivate")')).first();
    this.suspendAction = page.locator('li:has-text("Suspend"), ul.dropdown-menu li:has-text("Suspend"), ul.dropdown-menu.show li:has-text("Suspend")').first();
    this.deleteAction = page.getByRole('menuitem', { name: /delete/i }).or(page.locator('*:has-text("Delete")')).first();

    // User Access section locators (for edit form)
    this.userAccessSection = page.locator('*:has-text("User Access")').first();
    this.allowAllLabel = page.locator('label:has-text("Allow All"), *:has-text("Allow All")').first();

    // Table section locators
    this.salesPersonSection = page.locator('div.heading:has-text("Sales Person")').first();
    this.relationshipManagerSection = page.locator('div.heading:has-text("Relationship Manager")').first();
    // Relationship Manager section using the tooltip trigger span
    this.relationshipManagerTooltip = page.locator('span.mat-mdc-tooltip-trigger:has-text("Relationshipmanager"), span:has-text("Relationship Manager")').first();

    // Header dropdown locators
    this.headerDropdownButton = page.locator('button.header-btn.dropdown-toggle, button:has-text("Select Headers")').first();
    this.headerDropdownMenu = page.locator('ul.dropdown-header-menu, ul.dropdown-menu').first();
    this.headerCheckboxes = page.locator('ul.dropdown-header-menu input[type="checkbox"]');
    this.headerCheckboxLabels = page.locator('ul.dropdown-header-menu label');
    this.noColumnsMessage = page.locator('div:has-text("No columns selected. Please choose at least one header to display data.")').first();
    // Allow All checkbox - find checkbox in the same container as "Allow All" label
    // Structure: <div><input type="checkbox"><label>Allow All</label></div>
    // or: <div><label>Allow All</label><input type="checkbox"></div>
    this.allowAllCheckbox = page.locator('div:has(label:has-text("Allow All")) input[type="checkbox"]').first().or(
      page.locator('label:has-text("Allow All")').locator('..').locator('input[type="checkbox"]').first()
    ).or(
      // Find parent container and get first checkbox in it
      page.locator('label:has-text("Allow All")').locator('..').locator('input[type="checkbox"]').first()
    );
    // User checkboxes (all checkboxes except Allow All)
    this.userAccessCheckboxes = page.locator('input[type="checkbox"]');

    // Delete confirmation dialog
    this.deleteConfirmButton = page.getByRole('button', { name: /confirm|yes|delete/i }).first();
    this.deleteCancelButton = page.getByRole('button', { name: /cancel|no/i }).first();
  }

  /**
   * Navigates to the User & Roles page.
   */
  async navigateToUserAndRoles() {
    try {
      // Wait for sidebar to be visible
      await this.page.waitForTimeout(1000);
      
      // Click on the User & Roles menu item
      await this.userAndRolesMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.userAndRolesMenuItem.scrollIntoViewIfNeeded();
      await this.userAndRolesMenuItem.click();
      
      // Wait for page to load
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      
      // Verify we're on the User & Roles page
      await this.userAndRolesPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      console.error('Error navigating to User & Roles page:', error);
      throw error;
    }
  }

  /**
   * Checks if User & Roles page is visible.
   * @returns {Promise<boolean>}
   */
  async isUserAndRolesPageVisible() {
    try {
      const isVisible = await this.userAndRolesPageTitle.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the "Add User" button to open the form.
   */
  async clickAddUser() {
    try {
      await this.addUserButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addUserButton.scrollIntoViewIfNeeded();
      await this.addUserButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Add User button:', error);
      throw error;
    }
  }

  /**
   * Verifies all form fields are visible.
   * @returns {Promise<{allVisible: boolean, missingFields: string[]}>}
   */
  async verifyAllFormFieldsVisible() {
    const fields = [
      { name: 'Full Name', locator: this.fullNameInput },
      { name: 'Email ID', locator: this.emailInput },
      { name: 'Password', locator: this.passwordInput },
      { name: 'Confirm Password', locator: this.confirmPasswordInput },
      { name: 'Mobile Number', locator: this.mobileInput },
      { name: 'Company Name', locator: this.companyNameInput },
      { name: 'Role', locator: this.roleDropdown },
      { name: 'Submit Button', locator: this.submitButton },
      { name: 'Cancel Button', locator: this.cancelButton },
    ];

    const missingFields = [];
    for (const field of fields) {
      try {
        const isVisible = await field.locator.isVisible({ timeout: 3000 });
        if (!isVisible) {
          missingFields.push(field.name);
        }
      } catch (error) {
        missingFields.push(field.name);
      }
    }

    return {
      allVisible: missingFields.length === 0,
      missingFields,
    };
  }

  /**
   * Fills the Full Name field.
   * @param {string} fullName
   */
  async fillFullName(fullName) {
    await this.fullNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.fullNameInput.fill(fullName);
  }

  /**
   * Fills the Email ID field.
   * @param {string} email
   */
  async fillEmail(email) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.emailInput.fill(email);
  }

  /**
   * Checks if Email ID field is read-only.
   * @returns {Promise<boolean>}
   */
  async isEmailReadOnly() {
    try {
      const isReadOnly = await this.emailInput.getAttribute('readonly');
      const isDisabled = await this.emailInput.isDisabled();
      return isReadOnly !== null || isDisabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills the Password field.
   * @param {string} password
   */
  async fillPassword(password) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.passwordInput.fill(password);
  }

  /**
   * Fills the Confirm Password field.
   * @param {string} confirmPassword
   */
  async fillConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  /**
   * Fills the Mobile Number field.
   * @param {string} mobile
   */
  async fillMobile(mobile) {
    await this.mobileInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.mobileInput.fill(mobile);
  }

  /**
   * Fills the Company Name field.
   * @param {string} companyName
   */
  async fillCompanyName(companyName) {
    await this.companyNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.companyNameInput.fill(companyName);
  }

  /**
   * Opens the Role dropdown (for native select, we just need to ensure it's visible).
   */
  async openRoleDropdown() {
    try {
      await this.roleDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.roleDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error accessing role dropdown:', error);
      throw error;
    }
  }

  /**
   * Gets all available roles from the dropdown.
   * @returns {Promise<Array<{value: string, text: string}>>}
   */
  async getAllAvailableRoles() {
    try {
      await this.openRoleDropdown();
      
      // Get all options from the select element
      const roleOptions = this.roleDropdown.locator('option');
      const count = await roleOptions.count();
      console.log(`Found ${count} role options in dropdown`);
      
      const roles = [];
      
      for (let i = 0; i < count; i++) {
        try {
          const option = roleOptions.nth(i);
          const value = await option.getAttribute('value').catch(() => '');
          const text = await option.textContent();
          const isDisabled = await option.getAttribute('disabled').catch(() => null);
          
          if (text && text.trim() && 
              !text.toLowerCase().includes('select') && 
              !isDisabled && 
              value) {
            const roleName = text.trim();
            roles.push({ value: value, text: roleName });
          }
        } catch (error) {
          // Skip this option if there's an error
          continue;
        }
      }
      
      console.log(`Extracted ${roles.length} available roles: ${roles.map(r => r.text).join(', ')}`);
      
      return roles;
    } catch (error) {
      console.error('Error getting available roles:', error);
      return [];
    }
  }

  /**
   * Selects a role from the dropdown.
   * @param {string} roleName - The role name to select (e.g., "Salesperson", "Salesperson Manager", "Relationship Manager")
   */
  async selectRole(roleName) {
    try {
      await this.openRoleDropdown();
      await this.page.waitForTimeout(500);
      
      // For native select, use selectOption method
      // Try multiple strategies to match the role name
      
      // Strategy 1: Select by value (if roleName matches value like "salesPerson")
      const valueMap = {
        'salesperson': 'salesPerson',
        'salesperson manager': 'salesPersonManager',
        'relationship manager': 'relationshipManager',
        'salesman': 'salesPerson', // Map "Salesman" to "Salesperson"
      };
      
      const normalizedName = roleName.toLowerCase().trim();
      let valueToSelect = valueMap[normalizedName];
      
      // Strategy 2: Select by label/text
      if (!valueToSelect) {
        // Try to find by text content
        const options = this.roleDropdown.locator('option');
        const count = await options.count();
        
        for (let i = 0; i < count; i++) {
          const option = options.nth(i);
          const text = await option.textContent();
          const value = await option.getAttribute('value');
          const isDisabled = await option.getAttribute('disabled').catch(() => null);
          
          if (text && value && !isDisabled) {
            const optionText = text.trim().toLowerCase();
            // Check if roleName matches the option text
            if (optionText.includes(normalizedName) || normalizedName.includes(optionText)) {
              valueToSelect = value;
              break;
            }
          }
        }
      }
      
      // Strategy 3: Use selectOption with label
      if (valueToSelect) {
        await this.roleDropdown.selectOption({ value: valueToSelect });
        console.log(`✓ Role selected by value: ${valueToSelect}`);
      } else {
        // Fallback: try selecting by label
        await this.roleDropdown.selectOption({ label: new RegExp(roleName, 'i') });
        console.log(`✓ Role selected by label: ${roleName}`);
      }
      
      await this.page.waitForTimeout(1000);
      
      // Verify selection
      const selectedValue = await this.roleDropdown.inputValue();
      console.log(`✓ Role "${roleName}" selected successfully (value: ${selectedValue})`);
      
      return selectedValue;
    } catch (error) {
      console.error(`Error selecting role "${roleName}":`, error);
      throw error;
    }
  }

  /**
   * Selects each available role one by one (for testing purposes).
   * @returns {Promise<string[]>} - List of roles that were successfully selected
   */
  async selectAllRolesOneByOne() {
    const selectedRoles = [];
    try {
      const availableRoles = await this.getAllAvailableRoles();
      console.log(`Found ${availableRoles.length} available roles: ${availableRoles.join(', ')}`);
      
      for (const role of availableRoles) {
        try {
          await this.selectRole(role);
          selectedRoles.push(role);
          await this.page.waitForTimeout(500);
        } catch (error) {
          console.error(`Failed to select role "${role}":`, error);
        }
      }
      
      return selectedRoles;
    } catch (error) {
      console.error('Error selecting all roles:', error);
      return selectedRoles;
    }
  }

  /**
   * Clicks the Submit button.
   */
  async clickSubmit() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Clicks the Cancel button.
   */
  async clickCancel() {
    await this.cancelButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.cancelButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Gets validation error messages for a specific field.
   * @param {string} fieldName - The name of the field
   * @returns {Promise<string[]>}
   */
  async getValidationMessages(fieldName) {
    try {
      // Find validation messages near the field
      const fieldInput = this.page
        .getByLabel(new RegExp(fieldName, 'i'))
        .or(this.page.getByPlaceholder(new RegExp(fieldName, 'i')))
        .first();
      
      const fieldContainer = fieldInput.locator('..').or(fieldInput.locator('../..'));
      const messages = fieldContainer.locator(
        'mat-error, span[class*="error"], div[class*="error"], *[class*="validation"]'
      );
      
      const count = await messages.count();
      const messageTexts = [];
      for (let i = 0; i < count; i++) {
        const text = await messages.nth(i).textContent();
        if (text) messageTexts.push(text.trim());
      }
      
      return messageTexts;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if a validation message is visible.
   * @param {string} messageText - The expected validation message text
   * @returns {Promise<boolean>}
   */
  async isValidationMessageVisible(messageText) {
    try {
      const message = this.page.getByText(new RegExp(messageText, 'i')).first();
      return await message.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if a toast message is visible.
   * Waits for actual toast messages inside the container, not just the container itself.
   * @returns {Promise<boolean>}
   */
  async isToastVisible() {
    try {
      // Wait for toast container to be in DOM (it might always be present)
      await this.toastContainer.waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});
      
      // Check if container has any child elements (toast messages)
      const hasChildren = await this.toastContainer.evaluate((container) => {
        return container.children.length > 0;
      }).catch(() => false);
      
      if (!hasChildren) {
        return false;
      }
      
      // Wait for actual toast messages to appear inside the container
      const toastCount = await this.toastMessages.count();
      if (toastCount > 0) {
        // Check if at least one toast message is visible
        for (let i = 0; i < toastCount; i++) {
          const toast = this.toastMessages.nth(i);
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            return true;
          }
        }
      }
      
      // Fallback: check for success or error toast
      const successToast = await this.successToast.isVisible({ timeout: 3000 }).catch(() => false);
      const errorToast = await this.errorToast.isVisible({ timeout: 3000 }).catch(() => false);
      
      return successToast || errorToast;
    } catch (error) {
      return false;
    }
  }

  /**
   * Waits for toast message to appear and be visible.
   * @param {number} timeout - Maximum time to wait in milliseconds
   * @returns {Promise<boolean>}
   */
  async waitForToast(timeout = 10000) {
    try {
      const startTime = Date.now();
      let attempt = 0;
      
      while (Date.now() - startTime < timeout) {
        attempt++;
        
        // Check if toast container has children
        const hasChildren = await this.toastContainer.evaluate((container) => {
          return container && container.children.length > 0;
        }).catch(() => false);
        
        if (hasChildren) {
          // Check if any toast message is visible
          const toastCount = await this.toastMessages.count();
          for (let i = 0; i < toastCount; i++) {
            const toast = this.toastMessages.nth(i);
            const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              console.log(`  Toast found at attempt ${attempt}`);
              return true;
            }
          }
        }
        
        // Also check for success/error toast directly
        const successVisible = await this.successToast.isVisible({ timeout: 1000 }).catch(() => false);
        const errorVisible = await this.errorToast.isVisible({ timeout: 1000 }).catch(() => false);
        
        if (successVisible || errorVisible) {
          console.log(`  Toast found (success/error) at attempt ${attempt}`);
          return true;
        }
        
        // Check for any toast-like elements anywhere on the page
        const anyToast = await this.page.locator(
          'div[class*="toast"], div[class*="notification"], ' +
          'div[class*="alert"], div[class*="message"], ' +
          '*:has-text("successfully"), *:has-text("Success"), *:has-text("Error")'
        ).first().isVisible({ timeout: 1000 }).catch(() => false);
        
        if (anyToast) {
          console.log(`  Toast-like element found at attempt ${attempt}`);
          return true;
        }
        
        await this.page.waitForTimeout(500);
      }
      
      console.log(`  No toast found after ${attempt} attempts (${timeout}ms timeout)`);
      return false;
    } catch (error) {
      console.error('Error waiting for toast:', error);
      return false;
    }
  }

  /**
   * Checks if form is still open (indicating submission might have failed).
   * @returns {Promise<boolean>}
   */
  async isFormStillOpen() {
    try {
      const isVisible = await this.formContainer.isVisible({ timeout: 2000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets any error messages on the page (not just toast).
   * @returns {Promise<string[]>}
   */
  async getPageErrorMessages() {
    try {
      const errorMessages = this.page.locator(
        'div[class*="error"], div[class*="alert-danger"], ' +
        'span[class*="error"], *[class*="error-message"], ' +
        '*:has-text("Error"), *:has-text("Failed"), *:has-text("Invalid")'
      );
      
      const count = await errorMessages.count();
      const messages = [];
      
      for (let i = 0; i < count; i++) {
        const msg = errorMessages.nth(i);
        const isVisible = await msg.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await msg.textContent();
          if (text && text.trim()) {
            messages.push(text.trim());
          }
        }
      }
      
      return messages;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks for any success messages anywhere on the page.
   * @returns {Promise<{found: boolean, message: string}>}
   */
  async checkForSuccessMessage() {
    try {
      // Check toast container first
      const toastVisible = await this.isToastVisible();
      if (toastVisible) {
        const toastMessage = await this.getToastMessage();
        if (toastMessage && toastMessage.toLowerCase().includes('success')) {
          return { found: true, message: toastMessage };
        }
      }
      
      // Check for success messages anywhere on the page
      const successElements = this.page.locator(
        '*:has-text("successfully"), ' +
        '*:has-text("Success"), ' +
        '*:has-text("created successfully"), ' +
        '*:has-text("added successfully"), ' +
        'div[class*="success"], ' +
        'div[class*="alert-success"]'
      );
      
      const count = await successElements.count();
      for (let i = 0; i < count; i++) {
        const element = successElements.nth(i);
        const isVisible = await element.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await element.textContent();
          if (text && text.trim()) {
            return { found: true, message: text.trim() };
          }
        }
      }
      
      return { found: false, message: '' };
    } catch (error) {
      return { found: false, message: '' };
    }
  }

  /**
   * Gets the toast message text.
   * @returns {Promise<string>}
   */
  async getToastMessage() {
    try {
      // Wait for toast to appear
      await this.waitForToast(10000);
      
      // Try to get success toast first
      const successToastVisible = await this.successToast.isVisible({ timeout: 2000 }).catch(() => false);
      if (successToastVisible) {
        const text = await this.successToast.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
      
      // Try error toast
      const errorToastVisible = await this.errorToast.isVisible({ timeout: 2000 }).catch(() => false);
      if (errorToastVisible) {
        const text = await this.errorToast.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
      
      // Fallback: get text from toast messages inside container
      const toastCount = await this.toastMessages.count();
      if (toastCount > 0) {
        for (let i = 0; i < toastCount; i++) {
          const toast = this.toastMessages.nth(i);
          const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            if (text && text.trim()) {
              return text.trim();
            }
          }
        }
      }
      
      // Last resort: get text from container
      const containerText = await this.toastContainer.textContent();
      return containerText ? containerText.trim() : '';
    } catch (error) {
      console.error('Error getting toast message:', error);
      return '';
    }
  }

  /**
   * Verifies if a user exists in the table.
   * @param {Object} userData - User data to verify { name, email, mobile, role, status }
   * @returns {Promise<{found: boolean, rowIndex: number, details: string}>}
   */
  async verifyUserInTable(userData) {
    try {
      await this.userTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000); // Wait for table to render
      
      const rows = this.userTableRows;
      const rowCount = await rows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();
        
        // Check if row contains all expected data
        const hasName = !userData.name || rowText.toLowerCase().includes(userData.name.toLowerCase());
        const hasEmail = !userData.email || rowText.toLowerCase().includes(userData.email.toLowerCase());
        const hasMobile = !userData.mobile || rowText.includes(userData.mobile);
        const hasRole = !userData.role || rowText.toLowerCase().includes(userData.role.toLowerCase());
        const hasStatus = !userData.status || rowText.toLowerCase().includes(userData.status.toLowerCase());
        
        if (hasName && hasEmail && hasMobile && hasRole && hasStatus) {
          return {
            found: true,
            rowIndex: i,
            details: `User found at row ${i + 1}`,
          };
        }
      }
      
      return {
        found: false,
        rowIndex: -1,
        details: 'User not found in table',
      };
    } catch (error) {
      console.error('Error verifying user in table:', error);
      return {
        found: false,
        rowIndex: -1,
        details: `Error: ${error.message}`,
      };
    }
  }

  /**
   * Gets the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.page.url();
  }

  /**
   * Clears a form field by field name.
   * @param {string} fieldName - The name of the field to clear
   */
  async clearField(fieldName) {
    const fieldMap = {
      'Full Name': this.fullNameInput,
      'Email': this.emailInput,
      'Password': this.passwordInput,
      'Confirm Password': this.confirmPasswordInput,
      'Mobile': this.mobileInput,
      'Company Name': this.companyNameInput,
    };
    
    const field = fieldMap[fieldName];
    if (field) {
      await field.clear();
    }
  }

  /**
   * Fills the complete form with user data.
   * @param {Object} userData - User data object
   */
  async fillForm(userData) {
    if (userData.fullName) await this.fillFullName(userData.fullName);
    if (userData.email) await this.fillEmail(userData.email);
    if (userData.password) await this.fillPassword(userData.password);
    if (userData.confirmPassword) await this.fillConfirmPassword(userData.confirmPassword);
    if (userData.mobile) await this.fillMobile(userData.mobile);
    if (userData.companyName) await this.fillCompanyName(userData.companyName);
    if (userData.role) await this.selectRole(userData.role);
  }

  /**
   * Gets all table headers.
   * @returns {Promise<string[]>}
   */
  async getTableHeaders() {
    try {
      await this.userTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      const headers = this.userTableHeaders;
      const count = await headers.count();
      const headerTexts = [];
      
      for (let i = 0; i < count; i++) {
        const header = headers.nth(i);
        const text = await header.textContent();
        if (text && text.trim()) {
          headerTexts.push(text.trim());
        }
      }
      
      return headerTexts;
    } catch (error) {
      console.error('Error getting table headers:', error);
      return [];
    }
  }

  /**
   * Validates table headers against expected headers.
   * @param {string[]} expectedHeaders - Array of expected header names
   * @returns {Promise<{allPresent: boolean, missingHeaders: string[], foundHeaders: string[]}>}
   */
  async validateTableHeaders(expectedHeaders) {
    const foundHeaders = await this.getTableHeaders();
    const foundHeadersLower = foundHeaders.map(h => h.toLowerCase());
    const missingHeaders = [];
    
    for (const expected of expectedHeaders) {
      const expectedLower = expected.toLowerCase();
      const found = foundHeadersLower.some(h => h.includes(expectedLower) || expectedLower.includes(h));
      if (!found) {
        missingHeaders.push(expected);
      }
    }
    
    return {
      allPresent: missingHeaders.length === 0,
      missingHeaders,
      foundHeaders,
    };
  }

  /**
   * Gets data from a specific table row.
   * @param {number} rowIndex - Zero-based row index
   * @returns {Promise<{fullName: string, email: string, role: string, status: string, mobile: string, companyName: string}>}
   */
  async getRowData(rowIndex) {
    try {
      await this.userTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.userTableRows;
      const rowCount = await rows.count();
      
      if (rowIndex >= rowCount) {
        throw new Error(`Row index ${rowIndex} is out of range. Table has ${rowCount} rows.`);
      }
      
      const row = rows.nth(rowIndex);
      await row.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get all cells in the row
      const cells = row.locator('td, mat-cell');
      const cellCount = await cells.count();
      
      // Try to extract data by cell position or text content
      const rowText = await row.textContent();
      
      // Extract data using multiple strategies
      const data = {
        fullName: '',
        email: '',
        role: '',
        status: '',
        mobile: '',
        companyName: '',
      };
      
      // Strategy 1: Try to get data by cell index (assuming standard order)
      if (cellCount >= 6) {
        data.fullName = (await cells.nth(0).textContent()).trim();
        data.email = (await cells.nth(1).textContent()).trim();
        data.role = (await cells.nth(2).textContent()).trim();
        data.status = (await cells.nth(3).textContent()).trim();
        data.mobile = (await cells.nth(4).textContent()).trim();
        data.companyName = (await cells.nth(5).textContent()).trim();
      }
      
      // Strategy 2: Extract by patterns from row text
      const emailMatch = rowText.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        data.email = emailMatch[0];
      }
      
      const mobileMatch = rowText.match(/\d{10,}/);
      if (mobileMatch) {
        data.mobile = mobileMatch[0];
      }
      
      // Extract status (Active/Inactive)
      if (rowText.toLowerCase().includes('active')) {
        data.status = 'Active';
      } else if (rowText.toLowerCase().includes('inactive')) {
        data.status = 'Inactive';
      }
      
      return data;
    } catch (error) {
      console.error(`Error getting row data for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Validates row data.
   * @param {Object} rowData - Row data object
   * @returns {Promise<{valid: boolean, errors: string[]}>}
   */
  async validateRowData(rowData) {
    const errors = [];
    
    // Validate Full Name
    if (!rowData.fullName || rowData.fullName.trim() === '') {
      errors.push('Full Name is empty');
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rowData.email || !emailRegex.test(rowData.email)) {
      errors.push('Email ID is invalid or empty');
    }
    
    // Validate Role
    if (!rowData.role || rowData.role.trim() === '') {
      errors.push('Role is empty');
    }
    
    // Validate Status
    const validStatuses = ['Active', 'Inactive', 'active', 'inactive'];
    if (!rowData.status || !validStatuses.includes(rowData.status)) {
      errors.push(`Status is invalid. Expected Active/Inactive, got: ${rowData.status}`);
    }
    
    // Validate Mobile (should be 10 digits or valid format)
    if (rowData.mobile) {
      const mobileDigits = rowData.mobile.replace(/\D/g, '');
      if (mobileDigits.length < 5 || mobileDigits.length > 15) {
        errors.push(`Mobile number is invalid. Should be 5-15 digits, got: ${rowData.mobile}`);
      }
    }
    
    // Validate Company Name
    if (!rowData.companyName || rowData.companyName.trim() === '') {
      errors.push('Company Name is empty');
    }
    
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Opens action menu for a specific row.
   * @param {number} rowIndex - Zero-based row index
   */
  async openActionMenu(rowIndex) {
    try {
      await this.userTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.userTableRows;
      const row = rows.nth(rowIndex);
      await row.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Find action button in the row
      const actionButton = row.locator('button:has-text("Action"), button.action-btn, button[class*="action"]').first();
      await actionButton.waitFor({ state: 'visible', timeout: 5000 });
      await actionButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for menu to appear
      await this.actionMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
        console.log('Action menu might be using different structure');
      });
    } catch (error) {
      console.error(`Error opening action menu for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Clicks Edit action for a user.
   * @param {number} rowIndex - Zero-based row index
   */
  async clickEditAction(rowIndex) {
    try {
      await this.openActionMenu(rowIndex);
      await this.editAction.waitFor({ state: 'visible', timeout: 5000 });
      await this.editAction.click();
      await this.page.waitForTimeout(2000);
      
      // Wait for form to open
      await this.formContainer.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      console.error(`Error clicking edit action for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Gets form data from the edit form.
   * @returns {Promise<Object>}
   */
  async getFormData() {
    try {
      await this.formContainer.waitFor({ state: 'visible', timeout: 5000 });
      
      const formData = {
        fullName: await this.fullNameInput.inputValue().catch(() => ''),
        email: await this.emailInput.inputValue().catch(() => ''),
        mobile: await this.mobileInput.inputValue().catch(() => ''),
        companyName: await this.companyNameInput.inputValue().catch(() => ''),
        role: await this.roleDropdown.inputValue().catch(() => ''),
      };
      
      return formData;
    } catch (error) {
      console.error('Error getting form data:', error);
      return {};
    }
  }

  /**
   * Clicks Activate action for a user.
   * @param {number} rowIndex - Zero-based row index
   */
  async clickActivateAction(rowIndex) {
    try {
      await this.openActionMenu(rowIndex);
      await this.activateAction.waitFor({ state: 'visible', timeout: 5000 });
      await this.activateAction.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`Error clicking activate action for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Clicks Deactivate action for a user.
   * @param {number} rowIndex - Zero-based row index
   */
  async clickDeactivateAction(rowIndex) {
    try {
      await this.openActionMenu(rowIndex);
      await this.deactivateAction.waitFor({ state: 'visible', timeout: 5000 });
      await this.deactivateAction.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`Error clicking deactivate action for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Clicks Suspend action for a user.
   * @param {number} rowIndex - Zero-based row index
   */
  async clickSuspendAction(rowIndex) {
    try {
      await this.openActionMenu(rowIndex);
      await this.suspendAction.waitFor({ state: 'visible', timeout: 5000 });
      await this.suspendAction.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`Error clicking suspend action for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Clicks Delete action for a user and confirms deletion.
   * @param {number} rowIndex - Zero-based row index
   * @param {boolean} confirm - Whether to confirm deletion (default: true)
   */
  async clickDeleteAction(rowIndex, confirm = true) {
    try {
      await this.openActionMenu(rowIndex);
      await this.deleteAction.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteAction.click();
      await this.page.waitForTimeout(1000);
      
      if (confirm) {
        // Wait for confirmation dialog
        await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteConfirmButton.click();
        await this.page.waitForTimeout(2000);
      } else {
        // Cancel deletion
        await this.deleteCancelButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteCancelButton.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.error(`Error clicking delete action for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Clicks Delete action for a user based on role (Delete Salesman or Delete User).
   * @param {number} rowIndex - Zero-based row index
   * @param {string} role - The role to determine which delete action to use
   * @param {boolean} confirm - Whether to confirm deletion (default: true)
   */
  async clickDeleteActionByRole(rowIndex, role, confirm = true) {
    try {
      await this.openActionMenu(rowIndex);
      await this.page.waitForTimeout(1000);
      
      const roleLower = role.toLowerCase();
      if (roleLower.includes('salesperson') || roleLower.includes('salesman')) {
        // Click "Delete Salesman"
        await this.deleteSalesmanAction.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteSalesmanAction.click();
        console.log('✓ Delete Salesman clicked');
      } else if (roleLower.includes('relationship manager')) {
        // Click "Delete User"
        await this.deleteUserAction.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteUserAction.click();
        console.log('✓ Delete User clicked');
      } else {
        // Fallback to generic delete
        await this.deleteAction.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteAction.click();
        console.log('✓ Delete action clicked (fallback)');
      }
      
      await this.page.waitForTimeout(1000);
      
      if (confirm) {
        // Wait for confirmation dialog
        await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteConfirmButton.click();
        await this.page.waitForTimeout(2000);
        console.log('✓ Deletion confirmed');
      } else {
        // Cancel deletion
        await this.deleteCancelButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteCancelButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Deletion cancelled');
      }
    } catch (error) {
      console.error(`Error clicking delete action for row ${rowIndex} with role ${role}:`, error);
      throw error;
    }
  }

  /**
   * Verifies if a user does NOT exist in the correct table based on role.
   * @param {Object} userData - User data to verify { name, email, mobile, role, status }
   * @returns {Promise<{notFound: boolean, details: string}>}
   */
  async verifyUserNotInTable(userData) {
    try {
      const { table, rows } = await this.getTableByRole(userData.role);
      await table.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(2000);
      
      const rowCount = await rows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();
        
        // Check if row contains the user data (if found, user still exists)
        const hasName = userData.name && rowText.toLowerCase().includes(userData.name.toLowerCase());
        const hasEmail = userData.email && rowText.toLowerCase().includes(userData.email.toLowerCase());
        const hasMobile = userData.mobile && rowText.includes(userData.mobile);
        
        // If any identifier matches, user still exists
        if (hasName || hasEmail || hasMobile) {
          return {
            notFound: false,
            details: `User still found at row ${i + 1} in ${userData.role} table`,
          };
        }
      }
      
      return {
        notFound: true,
        details: `User not found in ${userData.role} table (deletion successful)`,
      };
    } catch (error) {
      console.error('Error verifying user not in table:', error);
      return {
        notFound: false,
        details: `Error: ${error.message}`,
      };
    }
  }

  /**
   * Finds a user row index by email address.
   * @param {string} email - Email address to search for
   * @returns {Promise<number|null>} - Row index (0-based) or null if not found
   */
  async findUserRowIndexByEmail(email) {
    try {
      await this.userTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      const rowCount = await this.userTableRows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = this.userTableRows.nth(i);
        const rowText = await row.textContent();
        
        if (rowText && rowText.toLowerCase().includes(email.toLowerCase())) {
          console.log(`✓ Found user with email ${email} at row index ${i}`);
          return i;
        }
      }
      
      console.log(`⚠ User with email ${email} not found in table`);
      return null;
    } catch (error) {
      console.error(`Error finding user row by email ${email}:`, error);
      return null;
    }
  }

  /**
   * Gets the total number of rows in the table.
   * @returns {Promise<number>}
   */
  async getRowCount() {
    try {
      await this.userTable.waitFor({ state: 'visible', timeout: 10000 });
      const count = await this.userTableRows.count();
      return count;
    } catch (error) {
      console.error('Error getting row count:', error);
      return 0;
    }
  }

  /**
   * Gets the table locator based on role or table type.
   * Salesperson or Salesperson Manager → "Sales Person" table
   * Relationship Manager → "Relationship Manager" table
   * @param {string} roleOrTableType - The role name or table type ('salesperson' or 'relationshipmanager')
   * @returns {Promise<{table: Locator, rows: Locator, headers: Locator}>}
   */
  async getTableByRole(roleOrTableType) {
    const roleLower = roleOrTableType.toLowerCase();
    let tableSelector = '';
    let section = null;
    
    if (roleLower.includes('salesperson') || roleLower.includes('salesman') || roleLower === 'salesperson') {
      // Sales Person table - find table near Sales Person section
      section = this.salesPersonSection;
      tableSelector = 'table, mat-table';
      console.log('Looking for Sales Person table');
    } else if (roleLower.includes('relationship') || roleLower.includes('manager') || roleLower === 'relationshipmanager') {
      // Relationship Manager table - find table near Relationship Manager section
      section = this.relationshipManagerSection;
      tableSelector = 'table, mat-table';
      console.log('Looking for Relationship Manager table');
    } else {
      // Default to first table
      tableSelector = 'table, mat-table';
      console.log('Using default table');
    }
    
    // If we have a section, find the table near it
    if (section) {
      try {
        await section.waitFor({ state: 'visible', timeout: 5000 });
        const table = section.locator('..').or(section.locator('../..'))
          .locator('table, mat-table').first();
        const rows = table.locator('tbody tr, mat-row');
        const headers = table.locator('thead th, mat-header-row mat-header-cell');
        return { table, rows, headers };
      } catch (e) {
        // Fallback to default table if section-based search fails
        console.log('Section-based table search failed, using default');
      }
    }
    
    // Default table locator
    const table = this.page.locator(tableSelector).first();
    const rows = table.locator('tbody tr, mat-row');
    const headers = table.locator('thead th, mat-header-row mat-header-cell');
    
    return { table, rows, headers };
  }

  /**
   * Verifies if a user exists in the correct table based on role.
   * @param {Object} userData - User data to verify { name, email, mobile, role, status }
   * @returns {Promise<{found: boolean, rowIndex: number, details: string}>}
   */
  async verifyUserInCorrectTable(userData) {
    try {
      const { table, rows } = await this.getTableByRole(userData.role);
      await table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000);
      
      const rowCount = await rows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();
        
        // Check if row contains all expected data
        const hasName = !userData.name || rowText.toLowerCase().includes(userData.name.toLowerCase());
        const hasEmail = !userData.email || rowText.toLowerCase().includes(userData.email.toLowerCase());
        const hasMobile = !userData.mobile || rowText.includes(userData.mobile);
        const hasRole = !userData.role || rowText.toLowerCase().includes(userData.role.toLowerCase());
        const hasStatus = !userData.status || rowText.toLowerCase().includes(userData.status.toLowerCase());
        
        if (hasName && hasEmail && hasMobile && hasRole && hasStatus) {
          return {
            found: true,
            rowIndex: i,
            details: `User found at row ${i + 1} in ${userData.role} table`,
          };
        }
      }
      
      return {
        found: false,
        rowIndex: -1,
        details: `User not found in ${userData.role} table`,
      };
    } catch (error) {
      console.error('Error verifying user in correct table:', error);
      return {
        found: false,
        rowIndex: -1,
        details: `Error: ${error.message}`,
      };
    }
  }

  /**
   * Gets data from a specific row in the correct table based on role.
   * @param {number} rowIndex - Zero-based row index
   * @param {string} role - The role to determine which table to use
   * @returns {Promise<{fullName: string, email: string, role: string, status: string, mobile: string, companyName: string}>}
   */
  async getRowDataByRole(rowIndex, role) {
    try {
      const { table, rows } = await this.getTableByRole(role);
      await table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000); // Wait for table to be fully rendered
      
      const rowCount = await rows.count();
      console.log(`Getting row data: rowIndex=${rowIndex}, rowCount=${rowCount}, role=${role}`);
      
      if (rowCount === 0) {
        throw new Error(`Table is empty. No rows found in ${role} table.`);
      }
      
      if (rowIndex >= rowCount) {
        throw new Error(`Row index ${rowIndex} is out of range. Table has ${rowCount} rows.`);
      }
      
      const row = rows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 5000 });
      await row.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      const cells = row.locator('td, mat-cell');
      const cellCount = await cells.count();
      const rowText = await row.textContent();
      
      console.log(`Row ${rowIndex} has ${cellCount} cells. Row text preview: ${rowText.substring(0, 100)}...`);
      
      const data = {
        fullName: '',
        email: '',
        role: '',
        status: '',
        mobile: '',
        companyName: '',
      };
      
      // Try to get data by cell index (Name, Email, Mobile No, Role, Status, Company, Action)
      // Based on HTML: Name, Email, Mobile No, Role, Status, Company, Action
      if (cellCount >= 6) {
        try {
          data.fullName = (await cells.nth(0).textContent()).trim();
          data.email = (await cells.nth(1).textContent()).trim();
          data.mobile = (await cells.nth(2).textContent()).trim();
          data.role = (await cells.nth(3).textContent()).trim();
          data.status = (await cells.nth(4).textContent()).trim();
          data.companyName = (await cells.nth(5).textContent()).trim();
        } catch (cellError) {
          console.log(`Error reading cells by index, using fallback: ${cellError.message}`);
        }
      } else if (cellCount >= 5) {
        // Fallback if Action column is not counted
        try {
          data.fullName = (await cells.nth(0).textContent()).trim();
          data.email = (await cells.nth(1).textContent()).trim();
          data.mobile = (await cells.nth(2).textContent()).trim();
          data.role = (await cells.nth(3).textContent()).trim();
          data.status = (await cells.nth(4).textContent()).trim();
          if (cellCount >= 6) {
            data.companyName = (await cells.nth(5).textContent()).trim();
          }
        } catch (cellError) {
          console.log(`Error reading cells by index (fallback), using pattern matching: ${cellError.message}`);
        }
      }
      
      // Extract by patterns as fallback (always try this to ensure we get data)
      const emailMatch = rowText.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch && !data.email) {
        data.email = emailMatch[0];
      }
      
      const mobileMatch = rowText.match(/\d{10,}/);
      if (mobileMatch && !data.mobile) {
        data.mobile = mobileMatch[0];
      }
      
      // Extract status (prioritize pattern matching if cell extraction failed)
      if (!data.status || data.status === '') {
        if (rowText.toLowerCase().includes('active')) {
          data.status = 'Active';
        } else if (rowText.toLowerCase().includes('inactive')) {
          data.status = 'Inactive';
        }
      }
      
      // Validate we got at least some data
      if (!data.status || data.status === '') {
        console.log(`⚠ Warning: Could not extract status from row ${rowIndex}. Row text: ${rowText}`);
      }
      
      console.log(`✓ Extracted row data: status="${data.status}", email="${data.email}"`);
      return data;
    } catch (error) {
      console.error(`Error getting row data for row ${rowIndex} in ${role} table:`, error);
      throw error;
    }
  }

  /**
   * Opens action menu and clicks Edit based on role (Edit Salesman or Edit User).
   * @param {number} rowIndex - Zero-based row index
   * @param {string} role - The role to determine which edit action to use
   */
  async clickEditActionByRole(rowIndex, role) {
    try {
      await this.openActionMenu(rowIndex);
      await this.page.waitForTimeout(1000);
      
      const roleLower = role.toLowerCase();
      if (roleLower.includes('salesperson') || roleLower.includes('salesman')) {
        // Click "Edit Salesman"
        await this.editSalesmanAction.waitFor({ state: 'visible', timeout: 5000 });
        await this.editSalesmanAction.click();
        console.log('✓ Edit Salesman clicked');
      } else if (roleLower.includes('relationship manager')) {
        // Click "Edit User"
        await this.editUserAction.waitFor({ state: 'visible', timeout: 5000 });
        await this.editUserAction.click();
        console.log('✓ Edit User clicked');
      } else {
        // Fallback to generic edit
        await this.editAction.waitFor({ state: 'visible', timeout: 5000 });
        await this.editAction.click();
        console.log('✓ Edit action clicked (fallback)');
      }
      
      await this.page.waitForTimeout(2000);
      
      // Wait for form to open - try multiple strategies
      try {
        await this.formContainer.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Form container is visible');
      } catch (formError) {
        // Try alternative form locators
        const alternativeForm = this.page.locator('form, div.modal, div.modal-dialog, div[class*="form"]').first();
        const isAlternativeVisible = await alternativeForm.isVisible({ timeout: 5000 }).catch(() => false);
        if (isAlternativeVisible) {
          console.log('✓ Alternative form container is visible');
        } else {
          // Check if User Access section is visible (indicates form is open)
          const isUserAccessVisible = await this.userAccessSection.isVisible({ timeout: 5000 }).catch(() => false);
          if (isUserAccessVisible) {
            console.log('✓ User Access section is visible (form is open)');
          } else {
            throw formError;
          }
        }
      }
    } catch (error) {
      console.error(`Error clicking edit action for row ${rowIndex} with role ${role}:`, error);
      throw error;
    }
  }

  /**
   * Checks if "Allow All" checkbox is visible.
   * @returns {Promise<boolean>}
   */
  async isAllowAllCheckboxVisible() {
    try {
      await this.formContainer.waitFor({ state: 'visible', timeout: 5000 });
      // First check if User Access section is visible
      const isSectionVisible = await this.userAccessSection.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isSectionVisible) {
        console.log('User Access section not visible');
        return false;
      }
      // Then check if Allow All label is visible
      const isLabelVisible = await this.allowAllLabel.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isLabelVisible) {
        console.log('Allow All label not visible');
        return false;
      }
      
      // Try multiple strategies to find the checkbox
      // Strategy 1: Checkbox in same parent as label
      let checkbox = this.page.locator('label:has-text("Allow All")').locator('..').locator('input[type="checkbox"]').first();
      let isVisible = await checkbox.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      
      // Strategy 2: Checkbox in parent's parent
      checkbox = this.page.locator('label:has-text("Allow All")').locator('../..').locator('input[type="checkbox"]').first();
      isVisible = await checkbox.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      
      // Strategy 3: Find div containing "Allow All" label and get checkbox from it
      checkbox = this.page.locator('div:has(label:has-text("Allow All")) input[type="checkbox"]').first();
      isVisible = await checkbox.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      
      // Strategy 4: Find all checkboxes in User Access section and check if first one is near "Allow All"
      const allCheckboxes = this.page.locator('*:has-text("User Access")').locator('..').locator('input[type="checkbox"]');
      const count = await allCheckboxes.count().catch(() => 0);
      if (count > 0) {
        // Check if first checkbox is in the same area as "Allow All" label
        const firstCheckbox = allCheckboxes.first();
        const checkboxVisible = await firstCheckbox.isVisible({ timeout: 2000 }).catch(() => false);
        if (checkboxVisible) {
          // Verify it's near "Allow All" by checking if they're in the same container
          const labelParent = await this.allowAllLabel.locator('..').textContent().catch(() => '');
          const checkboxParent = await firstCheckbox.locator('..').textContent().catch(() => '');
          if (labelParent && checkboxParent && (labelParent.includes('Allow All') || checkboxParent.includes('Allow All'))) {
            return true;
          }
        }
      }
      
      console.log('Allow All checkbox not found with any strategy');
      return false;
    } catch (error) {
      console.error('Error checking Allow All checkbox visibility:', error);
      return false;
    }
  }

  /**
   * Gets the checkbox locator for "Allow All" using multiple strategies.
   * @returns {Promise<Locator>}
   */
  async getAllowAllCheckboxLocator() {
    // Strategy 1: Checkbox near label with class "mb-0 heading" containing "Allow All"
    let checkbox = this.page.locator('label.mb-0.heading:has-text("Allow All")').locator('..').locator('input[type="checkbox"]').first();
    let isVisible = await checkbox.isVisible({ timeout: 1000 }).catch(() => false);
    if (isVisible) {
      return checkbox;
    }
    
    // Strategy 2: Checkbox in same parent as label (any label with "Allow All")
    checkbox = this.page.locator('label:has-text("Allow All")').locator('..').locator('input[type="checkbox"]').first();
    isVisible = await checkbox.isVisible({ timeout: 1000 }).catch(() => false);
    if (isVisible) {
      return checkbox;
    }
    
    // Strategy 3: Checkbox in parent's parent
    checkbox = this.page.locator('label:has-text("Allow All")').locator('../..').locator('input[type="checkbox"]').first();
    isVisible = await checkbox.isVisible({ timeout: 1000 }).catch(() => false);
    if (isVisible) {
      return checkbox;
    }
    
    // Strategy 4: Find div containing "Allow All" label and get checkbox from it
    checkbox = this.page.locator('div:has(label:has-text("Allow All")) input[type="checkbox"]').first();
    isVisible = await checkbox.isVisible({ timeout: 1000 }).catch(() => false);
    if (isVisible) {
      return checkbox;
    }
    
    // Strategy 5: First checkbox in User Access section (before user-class divs)
    checkbox = this.page.locator('*:has-text("User Access")').locator('..').locator('input[type="checkbox"]').first();
    return checkbox;
  }

  /**
   * Gets the state of "Allow All" checkbox.
   * @returns {Promise<boolean>}
   */
  async isAllowAllChecked() {
    try {
      const checkbox = await this.getAllowAllCheckboxLocator();
      await checkbox.waitFor({ state: 'visible', timeout: 5000 });
      const isChecked = await checkbox.isChecked();
      return isChecked;
    } catch (error) {
      console.error('Error checking Allow All checkbox state:', error);
      return false;
    }
  }

  /**
   * Clicks the "Allow All" checkbox.
   * @param {boolean} check - Whether to check (true) or uncheck (false)
   */
  async toggleAllowAllCheckbox(check = true) {
    try {
      const checkbox = await this.getAllowAllCheckboxLocator();
      await checkbox.waitFor({ state: 'visible', timeout: 5000 });
      const isCurrentlyChecked = await checkbox.isChecked();
      
      if (isCurrentlyChecked !== check) {
        await checkbox.click();
        await this.page.waitForTimeout(1000);
        console.log(`✓ Allow All checkbox ${check ? 'checked' : 'unchecked'}`);
      } else {
        console.log(`✓ Allow All checkbox already ${check ? 'checked' : 'unchecked'}`);
      }
    } catch (error) {
      console.error('Error toggling Allow All checkbox:', error);
      throw error;
    }
  }

  /**
   * Gets all user access checkboxes (excluding "Allow All").
   * @returns {Promise<Array<{locator: Locator, isChecked: boolean}>>}
   */
  async getUserAccessCheckboxes() {
    try {
      await this.formContainer.waitFor({ state: 'visible', timeout: 5000 });
      await this.userAccessSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
      
      // Get the Allow All checkbox locator to compare
      const allowAllCheckbox = await this.getAllowAllCheckboxLocator();
      let allowAllHandle = null;
      try {
        allowAllHandle = await allowAllCheckbox.elementHandle();
      } catch (e) {
        // Allow All checkbox might not be found, continue anyway
      }
      
      // Find all checkboxes in div.user-class elements (user checkboxes, not Allow All)
      const userClassDivs = this.userAccessSection.locator('div.user-class').or(
        this.page.locator('*:has-text("User Access")').locator('..').locator('div.user-class')
      );
      const divCount = await userClassDivs.count();
      const userCheckboxes = [];
      
      console.log(`Found ${divCount} user-class divs`);
      
      for (let i = 0; i < divCount; i++) {
        try {
          const userDiv = userClassDivs.nth(i);
          const isDivVisible = await userDiv.isVisible({ timeout: 1000 }).catch(() => false);
          
          if (isDivVisible) {
            // Find checkbox within this user-class div
            const checkbox = userDiv.locator('input[type="checkbox"]').first();
            const isCheckboxVisible = await checkbox.isVisible({ timeout: 1000 }).catch(() => false);
            
            if (isCheckboxVisible) {
              const isChecked = await checkbox.isChecked().catch(() => false);
              const isDisabled = await checkbox.isDisabled().catch(() => false);
              userCheckboxes.push({ locator: checkbox, isChecked, isDisabled });
              console.log(`  - User checkbox ${i + 1}: checked=${isChecked}, disabled=${isDisabled}`);
            }
          }
        } catch (error) {
          console.log(`  - Error processing user-class div ${i + 1}: ${error.message}`);
          continue;
        }
      }
      
      console.log(`Total user checkboxes found: ${userCheckboxes.length}`);
      
      return userCheckboxes;
    } catch (error) {
      console.error('Error getting user access checkboxes:', error);
      return [];
    }
  }

  /**
   * Verifies that all user checkboxes are in the expected state.
   * @param {boolean} expectedChecked - Expected checked state
   * @returns {Promise<{allMatch: boolean, checkedCount: number, uncheckedCount: number}>}
   */
  async verifyAllUserCheckboxesState(expectedChecked) {
    try {
      const checkboxes = await this.getUserAccessCheckboxes();
      let checkedCount = 0;
      let uncheckedCount = 0;
      
      for (const checkbox of checkboxes) {
        if (checkbox.isChecked) {
          checkedCount++;
        } else {
          uncheckedCount++;
        }
      }
      
      const allMatch = expectedChecked 
        ? checkedCount === checkboxes.length && uncheckedCount === 0
        : uncheckedCount === checkboxes.length && checkedCount === 0;
      
      return {
        allMatch,
        checkedCount,
        uncheckedCount,
        totalCount: checkboxes.length,
      };
    } catch (error) {
      console.error('Error verifying checkbox states:', error);
      return {
        allMatch: false,
        checkedCount: 0,
        uncheckedCount: 0,
        totalCount: 0,
      };
    }
  }

  /**
   * Gets the checkbox state for a specific user by email or name.
   * @param {string} identifier - Email or name to identify the user
   * @returns {Promise<boolean|null>} - true if checked, false if unchecked, null if not found
   */
  async getUserCheckboxState(identifier) {
    try {
      await this.formContainer.waitFor({ state: 'visible', timeout: 5000 });
      
      // Find checkbox near the identifier text
      const userRow = this.page.locator(`*:has-text("${identifier}")`).first();
      const checkbox = userRow.locator('..').or(userRow.locator('../..')).locator('input[type="checkbox"]').first();
      
      const isVisible = await checkbox.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        return await checkbox.isChecked();
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting checkbox state for ${identifier}:`, error);
      return null;
    }
  }

  /**
   * Gets the list of assigned user names and emails from checked checkboxes in User Access section.
   * @returns {Promise<Array<{name: string, email: string}>>} - Array of objects with name and email
   */
  async getAssignedUsersList() {
    try {
      await this.formContainer.waitFor({ state: 'visible', timeout: 5000 });
      await this.userAccessSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
      
      // Get all checked checkboxes by finding div.user-class elements with checked checkboxes
      const userClassDivs = this.userAccessSection.locator('div.user-class').or(
        this.page.locator('*:has-text("User Access")').locator('..').locator('div.user-class')
      );
      const divCount = await userClassDivs.count();
      const assignedUsers = [];
      
      console.log(`Checking ${divCount} user-class divs for checked checkboxes, names and emails...`);
      
      for (let i = 0; i < divCount; i++) {
        try {
          const userDiv = userClassDivs.nth(i);
          const isDivVisible = await userDiv.isVisible({ timeout: 1000 }).catch(() => false);
          
          if (isDivVisible) {
            // Find checkbox within this user-class div
            const checkbox = userDiv.locator('input[type="checkbox"]').first();
            const isCheckboxVisible = await checkbox.isVisible({ timeout: 1000 }).catch(() => false);
            
            if (isCheckboxVisible) {
              const isChecked = await checkbox.isChecked().catch(() => false);
              
              if (isChecked) {
                let userName = '';
                let userEmail = '';
                
                // Get name from label
                try {
                  const label = userDiv.locator('label.heading, label').first();
                  const labelText = await label.textContent().catch(() => '');
                  if (labelText && labelText.trim() && !labelText.toLowerCase().includes('allow all')) {
                    userName = labelText.trim();
                  }
                } catch (e) {
                  // Continue
                }
                
                // Get email using multiple strategies
                // Strategy 1: Get email from <small class="access"> or <small class="text-muted ms-4 access">
                try {
                  const emailElement = userDiv.locator('small.access, small.text-muted.ms-4.access, small[class*="access"]').first();
                  const emailText = await emailElement.textContent().catch(() => '');
                  
                  if (emailText && emailText.trim() && emailText.includes('@')) {
                    userEmail = emailText.trim();
                  }
                } catch (e) {
                  // Continue to next strategy
                }
                
                // Strategy 2: Get email from <p><small> element
                if (!userEmail) {
                  try {
                    const smallElement = userDiv.locator('p small, p small.access').first();
                    const smallText = await smallElement.textContent().catch(() => '');
                    
                    if (smallText && smallText.trim() && smallText.includes('@')) {
                      userEmail = smallText.trim();
                    }
                  } catch (e) {
                    // Continue to next strategy
                  }
                }
                
                // Strategy 3: Extract email from all text in the div using regex
                if (!userEmail) {
                  try {
                    const divText = await userDiv.textContent().catch(() => '');
                    if (divText) {
                      // Look for email pattern
                      const emailMatch = divText.match(/[\w.-]+@[\w.-]+\.\w+/);
                      if (emailMatch) {
                        userEmail = emailMatch[0];
                      }
                    }
                  } catch (e) {
                    // Continue
                  }
                }
                
                // Only add if we have at least name or email
                if (userName || userEmail) {
                  assignedUsers.push({ name: userName, email: userEmail });
                  console.log(`  - User ${i + 1}: name="${userName}", email="${userEmail}"`);
                } else {
                  console.log(`  - User ${i + 1}: Could not extract name or email`);
                }
              }
            }
          }
        } catch (error) {
          console.log(`  - Error processing user-class div ${i + 1}: ${error.message}`);
          continue;
        }
      }
      
      console.log(`Found ${assignedUsers.length} assigned users with name/email`);
      
      return assignedUsers;
    } catch (error) {
      console.error('Error getting assigned users list:', error);
      return [];
    }
  }

  /**
   * Checks all user checkboxes in the User Access section.
   * @returns {Promise<number>} - Number of checkboxes checked
   */
  async checkAllUserCheckboxes() {
    try {
      await this.formContainer.waitFor({ state: 'visible', timeout: 5000 });
      await this.userAccessSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
      
      // First, try to use "Allow All" checkbox if available
      const allowAllVisible = await this.isAllowAllCheckboxVisible();
      if (allowAllVisible) {
        const isAllowAllChecked = await this.isAllowAllChecked();
        if (!isAllowAllChecked) {
          await this.toggleAllowAllCheckbox(true);
          await this.page.waitForTimeout(2000); // Wait longer for checkboxes to update
        }
      }
      
      // Wait a bit more for UI to update after Allow All is clicked
      await this.page.waitForTimeout(1000);
      
      // Get all user checkboxes and check them individually
      const checkboxes = await this.getUserAccessCheckboxes();
      console.log(`Found ${checkboxes.length} user checkboxes after Allow All`);
      let checkedCount = 0;
      
      for (const checkbox of checkboxes) {
        if (!checkbox.isChecked) {
          try {
            await checkbox.locator.waitFor({ state: 'visible', timeout: 2000 });
            await checkbox.locator.scrollIntoViewIfNeeded();
            
            // Check if checkbox is disabled
            const isDisabled = checkbox.isDisabled || false;
            if (isDisabled) {
              // If disabled, try clicking the label instead
              try {
                const parentDiv = checkbox.locator.locator('..').or(checkbox.locator.locator('../..'));
                const label = parentDiv.locator('label').first();
                const labelVisible = await label.isVisible({ timeout: 1000 }).catch(() => false);
                if (labelVisible) {
                  await label.click();
                  await this.page.waitForTimeout(300);
                  checkedCount++;
                } else {
                  // Fallback: try force clicking the checkbox
                  await checkbox.locator.click({ force: true });
                  checkedCount++;
                }
              } catch (labelError) {
                // If label click fails, try force clicking the checkbox
                await checkbox.locator.click({ force: true });
                checkedCount++;
              }
            } else {
              // Normal click if not disabled
              await checkbox.locator.click();
              checkedCount++;
            }
            await this.page.waitForTimeout(200); // Small delay between clicks
          } catch (error) {
            console.log(`Warning: Could not check checkbox ${checkedCount + 1}: ${error.message}`);
          }
        } else {
          checkedCount++; // Already checked
        }
      }
      
      console.log(`✓ Checked ${checkedCount} user checkboxes`);
      return checkedCount;
    } catch (error) {
      console.error('Error checking all user checkboxes:', error);
      throw error;
    }
  }

  /**
   * Gets the header dropdown button for a specific table section.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   * @returns {Promise<Locator>}
   */
  async getHeaderDropdownButton(tableType) {
    const tableTypeLower = tableType.toLowerCase();
    
    if (tableTypeLower.includes('salesperson') || tableTypeLower.includes('sales')) {
      // Find header dropdown button near Sales Person section
      const salesPersonSection = this.salesPersonSection;
      await salesPersonSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      const dropdownButton = salesPersonSection.locator('..').or(salesPersonSection.locator('../..'))
        .locator('button.header-btn.dropdown-toggle, button:has-text("Select Headers")').first();
      return dropdownButton;
    } else if (tableTypeLower.includes('relationship') || tableTypeLower.includes('manager')) {
      // Find header dropdown button near Relationship Manager section
      // First try using the tooltip trigger span
      try {
        await this.relationshipManagerTooltip.waitFor({ state: 'visible', timeout: 5000 });
        // Find the header dropdown button in the same container or nearby
        const dropdownButton = this.relationshipManagerTooltip.locator('..').or(
          this.relationshipManagerTooltip.locator('../..')
        ).or(
          this.relationshipManagerTooltip.locator('../../..')
        ).locator('button.header-btn.dropdown-toggle, button:has-text("Select Headers")').first();
        
        // Verify button exists
        const exists = await dropdownButton.count().catch(() => 0);
        if (exists > 0) {
          return dropdownButton;
        }
      } catch (e) {
        console.log('Could not find dropdown using tooltip, trying section...');
      }
      
      // Fallback to section-based search
      const relationshipManagerSection = this.relationshipManagerSection;
      await relationshipManagerSection.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      const dropdownButton = relationshipManagerSection.locator('..').or(relationshipManagerSection.locator('../..'))
        .locator('button.header-btn.dropdown-toggle, button:has-text("Select Headers")').first();
      return dropdownButton;
    } else {
      // Default to first header dropdown
      return this.headerDropdownButton;
    }
  }

  /**
   * Opens the header dropdown for a specific table.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   */
  async openHeaderDropdown(tableType) {
    try {
      const dropdownButton = await this.getHeaderDropdownButton(tableType);
      await dropdownButton.waitFor({ state: 'visible', timeout: 10000 });
      await dropdownButton.scrollIntoViewIfNeeded();
      
      // Check if dropdown is already open
      const isExpanded = await dropdownButton.getAttribute('aria-expanded');
      if (isExpanded === 'true') {
        console.log('Header dropdown is already open');
        return;
      }
      
      await dropdownButton.click();
        await this.page.waitForTimeout(1000);
      
      // Wait for dropdown menu to appear
      const dropdownMenu = this.page.locator('ul.dropdown-header-menu.show, ul.dropdown-menu.show').first();
      await dropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      console.log(`✓ Header dropdown opened for ${tableType} table`);
    } catch (error) {
      console.error(`Error opening header dropdown for ${tableType}:`, error);
      throw error;
    }
  }

  /**
   * Closes the header dropdown.
   */
  async closeHeaderDropdown() {
    try {
      // Click outside or press Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error closing header dropdown:', error);
    }
  }

  /**
   * Gets all header checkboxes for a specific table.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   * @returns {Promise<Array<{locator: Locator, name: string, isChecked: boolean}>>}
   */
  async getHeaderCheckboxes(tableType) {
    try {
      await this.openHeaderDropdown(tableType);
      await this.page.waitForTimeout(500);
      
      // Find all checkboxes in the dropdown menu
      const dropdownMenu = this.page.locator('ul.dropdown-header-menu.show, ul.dropdown-menu.show').first();
      const checkboxes = dropdownMenu.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      
      const headerCheckboxes = [];
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const label = checkbox.locator('..').locator('span').first();
        const headerName = await label.textContent().catch(() => '');
        const isChecked = await checkbox.isChecked().catch(() => false);
        
        if (headerName && headerName.trim()) {
          headerCheckboxes.push({
            locator: checkbox,
            name: headerName.trim(),
            isChecked,
          });
        }
      }
      
      return headerCheckboxes;
    } catch (error) {
      console.error(`Error getting header checkboxes for ${tableType}:`, error);
      return [];
    }
  }

  /**
   * Verifies if all headers are selected by default.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   * @returns {Promise<{allSelected: boolean, selectedCount: number, totalCount: number, unselectedHeaders: string[]}>}
   */
  async verifyAllHeadersSelectedByDefault(tableType) {
    try {
      const headerCheckboxes = await this.getHeaderCheckboxes(tableType);
      const totalCount = headerCheckboxes.length;
      let selectedCount = 0;
      const unselectedHeaders = [];
      
      for (const header of headerCheckboxes) {
        if (header.isChecked) {
          selectedCount++;
        } else {
          unselectedHeaders.push(header.name);
        }
      }
      
      const allSelected = selectedCount === totalCount && totalCount > 0;
      
      return {
        allSelected,
        selectedCount,
        totalCount,
        unselectedHeaders,
      };
    } catch (error) {
      console.error(`Error verifying headers selected by default for ${tableType}:`, error);
      return {
        allSelected: false,
        selectedCount: 0,
        totalCount: 0,
        unselectedHeaders: [],
      };
    }
  }

  /**
   * Unselects all header checkboxes.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   */
  async unselectAllHeaders(tableType) {
    try {
      const headerCheckboxes = await this.getHeaderCheckboxes(tableType);
      let unselectedCount = 0;
      
      for (const header of headerCheckboxes) {
        const isChecked = await header.locator.isChecked().catch(() => false);
        if (isChecked) {
          await header.locator.click();
          await this.page.waitForTimeout(300);
          unselectedCount++;
        }
      }
      
      // Wait for UI to update after unselecting
      await this.page.waitForTimeout(1000);
      console.log(`✓ ${unselectedCount} headers unselected for ${tableType} table`);
    } catch (error) {
      console.error(`Error unselecting all headers for ${tableType}:`, error);
      throw error;
    }
  }

  /**
   * Selects all header checkboxes.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   */
  async selectAllHeaders(tableType) {
    try {
      const headerCheckboxes = await this.getHeaderCheckboxes(tableType);
      
      for (const header of headerCheckboxes) {
        if (!header.isChecked) {
          await header.locator.click();
          await this.page.waitForTimeout(200);
        }
      }
      
      console.log(`✓ All headers selected for ${tableType} table`);
    } catch (error) {
      console.error(`Error selecting all headers for ${tableType}:`, error);
      throw error;
    }
  }

  /**
   * Verifies if table columns are visible.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   * @returns {Promise<boolean>}
   */
  async areTableColumnsVisible(tableType) {
    try {
      const { table } = await this.getTableByRole(tableType);
      
      // Check if table exists and is visible
      const tableVisible = await table.isVisible({ timeout: 3000 }).catch(() => false);
      if (!tableVisible) {
        return false;
      }
      
      // Check if table headers are visible and have content
      const headers = table.locator('thead th, mat-header-row mat-header-cell');
      const headerCount = await headers.count();
      
      if (headerCount === 0) {
        return false;
      }
      
      // Check if at least one header has visible text (not empty)
      let visibleHeaderCount = 0;
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await header.textContent().catch(() => '');
          // Header is visible if it has text and is not just whitespace
          if (text && text.trim().length > 0) {
            visibleHeaderCount++;
          }
        }
      }
      
      // Columns are visible if we have at least one visible header with text
      return visibleHeaderCount > 0;
    } catch (error) {
      console.error(`Error checking if columns are visible for ${tableType}:`, error);
      return false;
    }
  }

  /**
   * Verifies if "No columns selected" message is visible.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   * @returns {Promise<boolean>}
   */
  async isNoColumnsMessageVisible(tableType) {
    try {
      // Find the message near the table section
      let section;
      if (tableType.toLowerCase().includes('salesperson') || tableType.toLowerCase().includes('sales')) {
        section = this.salesPersonSection;
      } else {
        section = this.relationshipManagerSection;
      }
      
      // Find message near the section
      const message = section.locator('..').or(section.locator('../..'))
        .locator('div:has-text("No columns selected. Please choose at least one header to display data.")').first();
      
      const isVisible = await message.isVisible({ timeout: 3000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      console.error(`Error checking "No columns selected" message for ${tableType}:`, error);
      return false;
    }
  }

  /**
   * Gets visible table headers for a specific table.
   * @param {string} tableType - 'salesperson' or 'relationshipmanager'
   * @returns {Promise<string[]>}
   */
  async getVisibleTableHeaders(tableType) {
    try {
      const { table, headers } = await this.getTableByRole(tableType);
      await table.waitFor({ state: 'visible', timeout: 5000 });
      
      const headerCount = await headers.count();
      const headerTexts = [];
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await header.textContent();
          if (text && text.trim()) {
            headerTexts.push(text.trim());
          }
        }
      }
      
      return headerTexts;
    } catch (error) {
      console.error(`Error getting visible table headers for ${tableType}:`, error);
      return [];
    }
  }

  /**
   * Finds a row by email in the correct table based on role.
   * @param {string} email - The email address to search for
   * @param {string} role - The role to determine which table to search
   * @returns {Promise<{found: boolean, rowIndex: number, row: Locator, details: string}>}
   */
  async findRowByEmail(email, role) {
    try {
      const { table, rows } = await this.getTableByRole(role);
      await table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000);
      
      const rowCount = await rows.count();
      const emailLower = email.toLowerCase().trim();
      console.log(`Searching for email "${email}" in ${role} table with ${rowCount} rows`);
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        await row.scrollIntoViewIfNeeded();
        const rowText = await row.textContent();
        const rowTextLower = rowText.toLowerCase();
        
        // Check if row contains the email (flexible matching)
        if (rowTextLower.includes(emailLower)) {
          // Try to find the exact email in cells (more flexible matching)
          const cells = row.locator('td, mat-cell');
          const cellCount = await cells.count();
          
          for (let j = 0; j < cellCount; j++) {
            try {
              const cellText = await cells.nth(j).textContent();
              if (cellText) {
                const cellTextLower = cellText.toLowerCase().trim();
                // Match exact email or email with extra whitespace/formatting
                if (cellTextLower === emailLower || 
                    cellTextLower.includes(emailLower) && emailLower.length >= 10) {
                  console.log(`✓ Found email "${email}" at row ${i}, cell ${j}`);
                  return {
                    found: true,
                    rowIndex: i,
                    row: row,
                    details: `Row found at index ${i} in ${role} table`,
                  };
                }
              }
            } catch (cellError) {
              // Continue to next cell if this one fails
              continue;
            }
          }
          
          // If we found the email in row text but not in exact cell, still return it
          // (this handles cases where email might be formatted differently)
          if (rowTextLower.includes(emailLower)) {
            console.log(`✓ Found email "${email}" in row text at row ${i} (flexible match)`);
            return {
              found: true,
              rowIndex: i,
              row: row,
              details: `Row found at index ${i} in ${role} table (flexible match)`,
            };
          }
        }
      }
      
      console.log(`✗ Email "${email}" not found in ${role} table`);
      return {
        found: false,
        rowIndex: -1,
        row: null,
        details: `Row with email ${email} not found in ${role} table`,
      };
    } catch (error) {
      console.error(`Error finding row by email ${email}:`, error);
      return {
        found: false,
        rowIndex: -1,
        row: null,
        details: `Error: ${error.message}`,
      };
    }
  }

  /**
   * Opens action menu for a row identified by email.
   * @param {string} email - The email address to identify the row
   * @param {string} role - The role to determine which table to search
   */
  async openActionMenuByEmail(email, role) {
    try {
      const rowInfo = await this.findRowByEmail(email, role);
      if (!rowInfo.found) {
        throw new Error(`Row with email ${email} not found in ${role} table`);
      }
      
      await rowInfo.row.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Find action button in the row - use more specific locator matching HTML
      const actionButton = rowInfo.row.locator('button.action-btn.btn-primary:has-text("Action")').or(
        rowInfo.row.locator('button.action-btn:has-text("Action")')
      ).or(
        rowInfo.row.locator('button:has-text("Action")')
      ).first();
      
      await actionButton.waitFor({ state: 'visible', timeout: 5000 });
      
      // Verify action button is visible
      const isVisible = await actionButton.isVisible();
      if (!isVisible) {
        throw new Error(`Action button not visible for row with email ${email}`);
      }
      
      // Check if dropdown is already open
      const isExpanded = await actionButton.getAttribute('aria-expanded');
      if (isExpanded === 'true') {
        console.log('Action dropdown is already open');
        // Wait for menu to be visible
        await this.page.locator('ul.dropdown-menu.show').first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
        return rowInfo.rowIndex;
      }
      
      await actionButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for menu to appear with show class
      const dropdownMenu = this.page.locator('ul.dropdown-menu.show').first();
      await dropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
        // Fallback to any dropdown menu
        this.actionMenu.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {
        console.log('Action menu might be using different structure');
      });
      });
      
      console.log('✓ Action dropdown opened successfully');
      return rowInfo.rowIndex;
    } catch (error) {
      console.error(`Error opening action menu for email ${email}:`, error);
      throw error;
    }
  }

  /**
   * Clicks Suspend action for a user identified by email.
   * @param {string} email - The email address to identify the row
   * @param {string} role - The role to determine which table to search
   */
  async clickSuspendActionByEmail(email, role) {
    try {
      await this.openActionMenuByEmail(email, role);
      await this.page.waitForTimeout(500);
      
      // Find suspend option in the dropdown menu - use more specific locator
      const suspendOption = this.page.locator('ul.dropdown-menu.show li:has-text("Suspend")').or(
        this.page.locator('ul.dropdown-menu li:has-text("Suspend")')
      ).or(
        this.suspendAction
      ).first();
      
      await suspendOption.waitFor({ state: 'visible', timeout: 5000 });
      await suspendOption.scrollIntoViewIfNeeded();
      await suspendOption.click();
      console.log('✓ Suspend option clicked');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`Error clicking suspend action for email ${email}:`, error);
      throw error;
    }
  }

  /**
   * Gets row data by email from the correct table based on role.
   * @param {string} email - The email address to identify the row
   * @param {string} role - The role to determine which table to search
   * @returns {Promise<{fullName: string, email: string, role: string, status: string, mobile: string, companyName: string}>}
   */
  async getRowDataByEmail(email, role) {
    try {
      const rowInfo = await this.findRowByEmail(email, role);
      if (!rowInfo.found) {
        throw new Error(`Row with email ${email} not found in ${role} table`);
      }
      
      return await this.getRowDataByRole(rowInfo.rowIndex, role);
    } catch (error) {
      console.error(`Error getting row data for email ${email}:`, error);
      throw error;
    }
  }

  /**
   * Gets the status directly from the status column span element for a row identified by email.
   * @param {string} email - The email address to identify the row
   * @param {string} role - The role to determine which table to search
   * @returns {Promise<string>} - The status text (e.g., "Active" or "Inactive")
   */
  async getStatusByEmail(email, role) {
    try {
      const rowInfo = await this.findRowByEmail(email, role);
      if (!rowInfo.found) {
        throw new Error(`Row with email ${email} not found in ${role} table`);
      }
      
      await rowInfo.row.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Find status span element - matches HTML: <span class="mat-mdc-tooltip-trigger ... active"> Active </span>
      const statusSpan = rowInfo.row.locator('span.mat-mdc-tooltip-trigger:has-text("Active"), span.mat-mdc-tooltip-trigger:has-text("Inactive")').or(
        rowInfo.row.locator('span:has-text("Active"), span:has-text("Inactive")')
      ).first();
      
      const statusText = await statusSpan.textContent();
      const status = statusText ? statusText.trim() : '';
      console.log(`✓ Status retrieved directly from status column: "${status}"`);
      return status;
    } catch (error) {
      console.error(`Error getting status for email ${email}:`, error);
      // Fallback to getRowDataByEmail
      const rowData = await this.getRowDataByEmail(email, role);
      return rowData.status;
    }
  }

  /**
   * Verifies that only one row exists with the given email in the correct table.
   * @param {string} email - The email address to search for
   * @param {string} role - The role to determine which table to search
   * @returns {Promise<{unique: boolean, count: number, details: string}>}
   */
  async verifyUniqueRowByEmail(email, role) {
    try {
      const { table, rows } = await this.getTableByRole(role);
      await table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000);
      
      const rowCount = await rows.count();
      const emailLower = email.toLowerCase();
      let matchCount = 0;
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();
        
        if (rowText.toLowerCase().includes(emailLower)) {
          // Verify it's the exact email
          const cells = row.locator('td, mat-cell');
          const cellCount = await cells.count();
          
          for (let j = 0; j < cellCount; j++) {
            const cellText = await cells.nth(j).textContent();
            if (cellText && cellText.toLowerCase().trim() === emailLower) {
              matchCount++;
              break;
            }
          }
        }
      }
      
      return {
        unique: matchCount === 1,
        count: matchCount,
        details: matchCount === 1 
          ? `Exactly one row found with email ${email}` 
          : `Found ${matchCount} rows with email ${email} (expected 1)`,
      };
    } catch (error) {
      console.error(`Error verifying unique row for email ${email}:`, error);
      return {
        unique: false,
        count: 0,
        details: `Error: ${error.message}`,
      };
    }
  }
}

module.exports = { UserAndRolesPage };

