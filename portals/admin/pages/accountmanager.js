class AccountManagerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/account-manager" class="nav-link sidebar-items">
    this.accountManagerLink = page.locator('div.nav-link.sidebar-items[routerlink*="account-manager"], div.nav-link.sidebar-items:has-text("Account Manager"), a[routerlink*="account-manager"], .sidebar-items:has-text("Account Manager")').first();
    
    // Page elements
    // HTML: Page heading "Account Manager"
    this.pageHeading = page.locator('h1:has-text("Account Manager"), h2:has-text("Account Manager"), .heading:has-text("Account Manager"), [class*="heading"]:has-text("Account Manager"), *:has-text("Account Manager"):not(div.nav-link):not(a)').first();
    this.pageWrapper = page.locator('app-root, app-account-manager, [class*="account-manager"], [class*="accountmanager"]').first();
    
    // Add Admin button
    // HTML: <button type="button" class="comman-btn1 btn-primary">+ Admin</button>
    this.addAdminButton = page.locator('button.comman-btn1:has-text("+ Admin"), button:has-text("+ Admin"), button:has-text("Admin"):has-text("+")').first();
    
    // Select Headers button
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), .btn:has-text("Select Headers")').first();
    
    // Table locators
    this.accountManagerTable = page.locator('mat-table, table.table, table').first();
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th');
    
    // Table column locators
    this.nameCells = page.locator('td.mat-column-Name, td:has-text("Admin")');
    this.emailCells = page.locator('td.mat-column-Email, td:has-text("@")');
    this.mobileCells = page.locator('td.mat-column-Mobile, td.mat-column-Phone');
    this.roleCells = page.locator('td.mat-column-Role');
    this.statusCells = page.locator('td.mat-column-Status');
    this.actionCells = page.locator('td.mat-column-Action');
    
    // No data message (if exists)
    this.noDataMessage = page.locator('p.error-msg, *:has-text("No data"), *:has-text("No records"), *:has-text("No Data Found"), *:has-text("No data found")').first();
    
    // Add Admin form page (navigates to /account-manager/add-admin)
    // Form field locators
    // HTML: <input id="name" placeholder="Full Name">
    this.addAdminNameField = page.locator('input#name[placeholder="Full Name"], input#name').first();
    // HTML: <input id="email" placeholder="Email Id">
    this.addAdminEmailField = page.locator('input#email[placeholder="Email Id"], input#email[type="email"]').first();
    // HTML: <input id="mobile" placeholder="Mobile Number">
    this.addAdminMobileField = page.locator('input#mobile[placeholder="Mobile Number"], input#mobile').first();
    // HTML: <select id="role">
    this.addAdminRoleDropdown = page.locator('select#role').first();
    // HTML: <input id="password" type="password" placeholder="Password">
    this.addAdminPasswordField = page.locator('input#password[type="password"][placeholder="Password"], input#password').first();
    
    // Form buttons
    this.addAdminSubmitButton = page.locator('button.search-btn:has-text("Submit"), button:has-text("Submit"), button[type="submit"]:has-text("Submit")').first();
    this.addAdminCancelButton = page.locator('button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Required field error message
    this.requiredFieldError = page.locator('div.text-danger.mb-1 small:has-text("It is required field"), .text-danger:has-text("It is required field")').first();
    this.requiredFieldErrors = page.locator('div.text-danger.mb-1 small:has-text("It is required field"), .text-danger:has-text("It is required field")');
    
    // Account Manager Details page heading (on add-admin page)
    this.accountManagerDetailsHeading = page.locator('*:has-text("Account Manager Details"), h1:has-text("Account Manager Details"), h2:has-text("Account Manager Details"), .heading:has-text("Account Manager Details")').first();
    
    // Action column dropdown button
    // HTML: <button>Action</button> in Action column
    this.actionDropdownButton = page.locator('td.mat-column-Action button:has-text("Action"), td.mat-column-Action button[type="button"]').first();
    this.actionDropdownButtons = page.locator('td.mat-column-Action button:has-text("Action"), td.mat-column-Action button[type="button"]');
    
    // Action dropdown menu
    this.actionDropdownMenu = page.locator('ul.dropdown-menu.action-menu, ul.dropdown-menu, .dropdown-menu').first();
    
    // Edit User option in dropdown menu
    this.editUserOption = page.locator('ul.dropdown-menu li.dropdown-item:has-text("Edit User"), ul.dropdown-menu li:has-text("Edit User"), .dropdown-menu li:has-text("Edit User"), .dropdown-item:has-text("Edit User")').first();
    
    // Suspend option in dropdown menu
    this.suspendOption = page.locator('ul.dropdown-menu li.dropdown-item:has-text("Suspend"), ul.dropdown-menu li:has-text("Suspend"), .dropdown-menu li:has-text("Suspend"), .dropdown-item:has-text("Suspend")').first();
    
    // Manage Permissions option in dropdown menu
    this.managePermissionsOption = page.locator('ul.dropdown-menu li.dropdown-item:has-text("Manage Permissions"), ul.dropdown-menu li:has-text("Manage Permissions"), .dropdown-menu li:has-text("Manage Permissions"), .dropdown-item:has-text("Manage Permissions")').first();
    
    // Activate/Active option in dropdown menu
    this.activateOption = page.locator('ul.dropdown-menu li.dropdown-item:has-text("Active"), ul.dropdown-menu li:has-text("Active"), ul.dropdown-menu li.dropdown-item:has-text("Active"), ul.dropdown-menu li:has-text("Active"), .dropdown-menu li:has-text("Active"), .dropdown-menu li:has-text("Active"), .dropdown-item:has-text("Active"), .dropdown-item:has-text("Active")').first();
    
    // Delete User option in dropdown menu
    this.deleteUserOption = page.locator('ul.dropdown-menu li.dropdown-item:has-text("Delete User"), ul.dropdown-menu li:has-text("Delete User"), .dropdown-menu li:has-text("Delete User"), .dropdown-item:has-text("Delete User")').first();
    
    // Manage Permissions Modal locators
    this.managePermissionsModal = page.locator('div.permission-management, .permission-management, *:has-text("Manage Permissions for User")').first();
    this.managePermissionsModalTitle = page.locator('h4:has-text("Manage Permissions for User"), *:has-text("Manage Permissions for User")').first();
    this.managePermissionsCloseButton = page.locator('button.close-btn, button:has(i.bi-x-lg), .close-btn').first();
    
    // Permission checkboxes - all checkboxes in permission sections
    this.allPermissionCheckboxes = page.locator('div.permissions-checkboxes input[type="checkbox"], label.permission-checkbox input[type="checkbox"], .permission-checkbox input[type="checkbox"]');
    
    // Save Permissions button
    this.savePermissionsButton = page.locator('button:has-text("Save Permissions"), .btn-primary:has-text("Save Permissions"), button.btn:has-text("Save Permissions")').first();
    this.cancelPermissionsButton = page.locator('button:has-text("Cancel"), .btn-secondary:has-text("Cancel"), button.btn:has-text("Cancel")').first();
    
    // Delete Admin Modal locators
    this.deleteAdminModal = page.locator('div.modal:has-text("Delete"), .modal.show:has-text("Delete"), div.modal-section:has-text("Delete")').first();
    this.deleteAdminModalTitle = page.locator('div.modal-heading:has-text("Delete"), .modal-title:has-text("Delete"), *:has-text("Delete"):not(script):not(style)').first();
    this.deleteAdminModalYesButton = page.locator('div.modal button:has-text("Yes"), .modal button.btn-primary:has-text("Yes"), button:has-text("Yes")').first();
    this.deleteAdminModalNoButton = page.locator('div.modal button:has-text("No"), .modal button:has-text("No"), button:has-text("No"), button:has-text("Cancel")').first();
    
    // Edit Admin Modal locators
    this.editAdminModal = page.locator('div.modal-section:has-text("Account Manager Details"), div.modal:has-text("Account Manager Details"), .modal.show, .modal[style*="display: block"], div.modal-section').first();
    this.editAdminModalTitle = page.locator('div.modal-heading:has-text("Account Manager Details"), .modal-title:has-text("Account Manager Details"), div.modal-section div.modal-heading, *:has-text("Account Manager Details"):not(script):not(style)').first();
    
    // Edit Admin form field locators (same as add admin, but scoped to modal)
    this.editAdminNameField = page.locator('div.modal-section input#name[placeholder="Full Name"], div.modal input#name, input#name').first();
    this.editAdminEmailField = page.locator('div.modal-section input#email[placeholder="Email Id"], div.modal input#email[type="email"], input#email[type="email"]').first();
    this.editAdminMobileField = page.locator('div.modal-section input#mobile[placeholder="Mobile Number"], div.modal input#mobile, input#mobile').first();
    this.editAdminRoleDropdown = page.locator('div.modal-section select#role, div.modal select#role, select#role').first();
    this.editAdminPasswordField = page.locator('div.modal-section input#password[type="password"][placeholder="Password"], div.modal input#password[type="password"], input#password[type="password"]').first();
    
    // Edit Admin form buttons
    this.editAdminSubmitButton = page.locator('div.modal-section button.search-btn:has-text("Submit"), div.modal button:has-text("Submit"), button[type="submit"]:has-text("Submit"), button.search-btn:has-text("Submit")').first();
    this.editAdminCancelButton = page.locator('div.modal-section button.reset-btn:has-text("Cancel"), div.modal button:has-text("Cancel")').first();
    
    // User Access section checkboxes
    // HTML: <input type="checkbox" class="me-3"> followed by <label>Allow All</label>
    // The checkbox and label are siblings, so we find the label and get the previous sibling checkbox
    this.allowAllLabel = page.locator('label:has-text("Allow All")').first();
    this.allowAllCheckbox = page.locator('label:has-text("Allow All")').locator('xpath=./preceding-sibling::input[@type="checkbox"]').first();
    this.userAccessCheckboxes = page.locator('input[type="checkbox"]').filter({ hasNot: this.allowAllLabel });
    this.allUserCheckboxes = page.locator('input[type="checkbox"]');
  }

  /**
   * Navigates to Account Manager page
   * @param {string} baseUrl - Base URL of the application
   */
  async gotoAccountManager(baseUrl) {
    try {
      // URL should be /account-manager (with hyphen)
      let url = baseUrl.replace('/login', '').replace('/login/', '');
      if (!url.endsWith('/')) {
        url += '/';
      }
      url += 'account-manager';
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await this.page.waitForTimeout(3000);
      
      // Wait for page to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct navigation fails, try clicking the sidebar link
      try {
        await this.accountManagerLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.accountManagerLink.scrollIntoViewIfNeeded();
        await this.accountManagerLink.click();
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('domcontentloaded');
      } catch (linkError) {
        throw new Error(`Failed to navigate to Account Manager page: ${error.message}`);
      }
    }
  }

  /**
   * Verifies if the Account Manager page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Wait for page to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);
      
      // Check if URL contains account-manager
      const currentUrl = this.page.url();
      if (!currentUrl.includes('account-manager') && !currentUrl.includes('accountmanager')) {
        return false;
      }
      
      // Check if page heading is visible
      const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 10000 }).catch(() => false);
      if (!isHeadingVisible) {
        // Try alternative heading locators
        const altHeading = this.page.locator('h1, h2, h3, .heading, [class*="heading"], [class*="title"]').filter({ hasText: /Account Manager/i }).first();
        const isAltHeadingVisible = await altHeading.isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAltHeadingVisible) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the page heading text
   * @returns {Promise<string>}
   */
  async getPageHeading() {
    try {
      const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (isHeadingVisible) {
        const headingText = await this.pageHeading.textContent();
        return headingText?.trim() || '';
      }
      
      // Try alternative heading locators
      const altHeading = this.page.locator('h1, h2, h3, .heading, [class*="heading"], [class*="title"]').filter({ hasText: /Account Manager/i }).first();
      const isAltHeadingVisible = await altHeading.isVisible({ timeout: 3000 }).catch(() => false);
      if (isAltHeadingVisible) {
        const headingText = await altHeading.textContent();
        return headingText?.trim() || '';
      }
      
      return '';
    } catch {
      return '';
    }
  }

  // ==================== ADD ADMIN METHODS ====================

  /**
   * Clicks the Add Admin button (navigates to add-admin page)
   */
  async clickAddAdminButton() {
    try {
      await this.addAdminButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAdminButton.scrollIntoViewIfNeeded();
      await this.addAdminButton.click();
      await this.page.waitForTimeout(3000); // Wait for navigation
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to click Add Admin button: ${error.message}`);
    }
  }

  /**
   * Verifies if on Add Admin page
   * @returns {Promise<boolean>}
   */
  async isAddAdminPageLoaded() {
    try {
      const currentUrl = this.page.url();
      if (!currentUrl.includes('add-admin')) {
        return false;
      }
      
      const isHeadingVisible = await this.accountManagerDetailsHeading.isVisible({ timeout: 5000 }).catch(() => false);
      return isHeadingVisible;
    } catch {
      return false;
    }
  }

  /**
   * Fills the Name field in Add Admin form
   * @param {string} value - The name value
   */
  async fillAdminName(value) {
    try {
      await this.addAdminNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAdminNameField.scrollIntoViewIfNeeded();
      await this.addAdminNameField.clear();
      await this.addAdminNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Name: ${error.message}`);
    }
  }

  /**
   * Fills the Email field in Add Admin form
   * @param {string} value - The email value
   */
  async fillAdminEmail(value) {
    try {
      await this.addAdminEmailField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAdminEmailField.scrollIntoViewIfNeeded();
      await this.addAdminEmailField.clear();
      await this.addAdminEmailField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Email: ${error.message}`);
    }
  }

  /**
   * Fills the Mobile Number field in Add Admin form
   * @param {string} value - The mobile number value
   */
  async fillAdminMobile(value) {
    try {
      await this.addAdminMobileField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAdminMobileField.scrollIntoViewIfNeeded();
      await this.addAdminMobileField.clear();
      await this.addAdminMobileField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Mobile Number: ${error.message}`);
    }
  }

  /**
   * Selects a role from the Role dropdown in Add Admin form
   * @param {string} role - The role to select (e.g., "Support", "Sales Manager", "Manager")
   */
  async selectAdminRole(role) {
    try {
      await this.addAdminRoleDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAdminRoleDropdown.scrollIntoViewIfNeeded();
      await this.addAdminRoleDropdown.selectOption({ label: role }).catch(async () => {
        // Try by value if label doesn't work
        const roleValue = role.toLowerCase().replace(' ', '');
        await this.addAdminRoleDropdown.selectOption(roleValue);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Role: ${error.message}`);
    }
  }

  /**
   * Fills the Password field in Add Admin form
   * @param {string} value - The password value
   */
  async fillAdminPassword(value) {
    try {
      await this.addAdminPasswordField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAdminPasswordField.scrollIntoViewIfNeeded();
      await this.addAdminPasswordField.clear();
      await this.addAdminPasswordField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Password: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in Add Admin form (without waiting for submission)
   */
  async clickAddAdminSubmitButton() {
    try {
      await this.addAdminSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addAdminSubmitButton.scrollIntoViewIfNeeded();
      const isEnabled = await this.addAdminSubmitButton.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      await this.addAdminSubmitButton.evaluate((el) => el.click());
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click Add Admin submit button: ${error.message}`);
    }
  }

  /**
   * Submits the Add Admin form
   */
  async submitAddAdminForm() {
    try {
      await this.addAdminSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addAdminSubmitButton.scrollIntoViewIfNeeded();
      const isEnabled = await this.addAdminSubmitButton.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      await this.addAdminSubmitButton.click({ timeout: 5000 });
      
      // Wait for navigation back to account manager page
      await this.page.waitForTimeout(3000);
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to submit Add Admin form: ${error.message}`);
    }
  }

  /**
   * Gets all validation errors
   * @returns {Promise<string[]>}
   */
  async getAllValidationErrors() {
    try {
      const errors = await this.requiredFieldErrors.allTextContents();
      return errors.map(e => e.trim()).filter(e => e !== '');
    } catch {
      return [];
    }
  }

  /**
   * Verifies if an admin with the given name exists in the table
   * @param {string} adminName - The admin name to search for
   * @returns {Promise<boolean>}
   */
  async verifyAdminInTable(adminName) {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        return false;
      }

      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(adminName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets admin details from table by name
   * @param {string} adminName - The admin name to search for
   * @returns {Promise<object>} Object with name, email, mobile, role, status
   */
  async getAdminDetailsFromTable(adminName) {
    try {
      const rowCount = await this.allTableRows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(adminName.toLowerCase())) {
          const emailCell = row.locator('td.mat-column-Email').first();
          const mobileCell = row.locator('td.mat-column-Mobile').first();
          const roleCell = row.locator('td.mat-column-Role').first();
          const statusCell = row.locator('td.mat-column-Status').first();
          
          return {
            name: (await nameCell.textContent())?.trim() || '',
            email: (await emailCell.textContent())?.trim() || '',
            mobile: (await mobileCell.textContent())?.trim() || '',
            role: (await roleCell.textContent())?.trim() || '',
            status: (await statusCell.textContent())?.trim() || ''
          };
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  // ==================== EDIT ADMIN METHODS ====================

  /**
   * Clicks the Action dropdown button for a specific admin by name
   * @param {string} adminName - The admin name to find
   */
  async clickActionDropdownForAdmin(adminName) {
    try {
      const rowCount = await this.allTableRows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(adminName.toLowerCase())) {
          const actionButton = row.locator('td.mat-column-Action button:has-text("Action"), td.mat-column-Action button[type="button"]').first();
          await actionButton.waitFor({ state: 'visible', timeout: 5000 });
          await actionButton.scrollIntoViewIfNeeded();
          await actionButton.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      }
      throw new Error(`Admin with name "${adminName}" not found in table`);
    } catch (error) {
      throw new Error(`Failed to click Action dropdown for admin "${adminName}": ${error.message}`);
    }
  }

  /**
   * Clicks the Edit User option in the dropdown menu
   */
  async clickEditUserOption() {
    try {
      // Wait a bit for dropdown to stabilize
      await this.page.waitForTimeout(1000);
      
      // Try to find and click Edit User option directly
      // The dropdown menu might already be open, so we don't need to wait for it
      const editOption = this.page.locator('ul.dropdown-menu li.dropdown-item:has-text("Edit User"), ul.dropdown-menu li:has-text("Edit User"), .dropdown-menu li:has-text("Edit User"), .dropdown-item:has-text("Edit User")').first();
      
      // Wait for the option to be visible (with longer timeout)
      await editOption.waitFor({ state: 'visible', timeout: 10000 });
      await editOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await editOption.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct click fails, try alternative approach
      try {
        await this.page.waitForTimeout(1000);
        const altEditOption = this.page.locator('li.dropdown-item:has-text("Edit User")').first();
        await altEditOption.waitFor({ state: 'visible', timeout: 5000 });
        await altEditOption.scrollIntoViewIfNeeded();
        await altEditOption.click();
        await this.page.waitForTimeout(2000);
      } catch (retryError) {
        throw new Error(`Failed to click Edit User option: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  /**
   * Verifies if Edit Admin modal is open
   * @returns {Promise<boolean>}
   */
  async isEditAdminModalOpen() {
    try {
      // Wait a bit for modal to appear
      await this.page.waitForTimeout(2000);
      
      // Check for modal-section with Account Manager Details
      const modalSection = this.page.locator('div.modal-section:has-text("Account Manager Details"), *:has-text("Account Manager Details")').first();
      const isModalVisible = await modalSection.isVisible({ timeout: 10000 }).catch(() => false);
      if (isModalVisible) {
        return true;
      }
      
      // Try alternative: check for modal-heading
      const modalHeading = this.page.locator('div.modal-heading:has-text("Account Manager Details"), div.modal-section div.modal-heading, *:has-text("Account Manager Details")').first();
      const isHeadingVisible = await modalHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (isHeadingVisible) {
        return true;
      }
      
      // Try alternative: check for form fields that should be in the modal
      const nameField = this.page.locator('input#name[placeholder="Full Name"], input#name').first();
      const isNameFieldVisible = await nameField.isVisible({ timeout: 5000 }).catch(() => false);
      if (isNameFieldVisible) {
        return true;
      }
      
      // Try alternative: check for User Access section
      const userAccessSection = this.page.locator('*:has-text("User Access")').first();
      const isUserAccessVisible = await userAccessSection.isVisible({ timeout: 3000 }).catch(() => false);
      return isUserAccessVisible;
    } catch {
      return false;
    }
  }

  /**
   * Edits the Name field in Edit Admin modal
   * @param {string} value - The name value
   */
  async editAdminName(value) {
    try {
      await this.editAdminNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.editAdminNameField.scrollIntoViewIfNeeded();
      await this.editAdminNameField.clear();
      await this.editAdminNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Name: ${error.message}`);
    }
  }

  /**
   * Edits the Email field in Edit Admin modal
   * @param {string} value - The email value
   */
  async editAdminEmail(value) {
    try {
      await this.editAdminEmailField.waitFor({ state: 'visible', timeout: 10000 });
      await this.editAdminEmailField.scrollIntoViewIfNeeded();
      await this.editAdminEmailField.clear();
      await this.editAdminEmailField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Email: ${error.message}`);
    }
  }

  /**
   * Edits the Mobile Number field in Edit Admin modal
   * @param {string} value - The mobile number value
   */
  async editAdminMobile(value) {
    try {
      await this.editAdminMobileField.waitFor({ state: 'visible', timeout: 10000 });
      await this.editAdminMobileField.scrollIntoViewIfNeeded();
      await this.editAdminMobileField.clear();
      await this.editAdminMobileField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Mobile Number: ${error.message}`);
    }
  }

  /**
   * Selects a role from the Role dropdown in Edit Admin modal
   * @param {string} role - The role to select (e.g., "Support", "Sales Manager", "Manager")
   */
  async selectEditAdminRole(role) {
    try {
      await this.editAdminRoleDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.editAdminRoleDropdown.scrollIntoViewIfNeeded();
      await this.editAdminRoleDropdown.selectOption({ label: role }).catch(async () => {
        // Try by value if label doesn't work
        const roleValue = role.toLowerCase().replace(' ', '');
        await this.editAdminRoleDropdown.selectOption(roleValue);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Role: ${error.message}`);
    }
  }

  /**
   * Edits the Password field in Edit Admin modal
   * @param {string} value - The password value
   */
  async editAdminPassword(value) {
    try {
      // Password field might not be visible in edit form, so check first
      const isPasswordFieldVisible = await this.editAdminPasswordField.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isPasswordFieldVisible) {
        console.log('  ⚠ Password field is not visible in edit form, skipping password update');
        return;
      }
      
      await this.editAdminPasswordField.waitFor({ state: 'visible', timeout: 10000 });
      await this.editAdminPasswordField.scrollIntoViewIfNeeded();
      await this.editAdminPasswordField.clear();
      await this.editAdminPasswordField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      // If password field is not available, just log and continue
      console.log(`  ⚠ Password field not available in edit form: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in Edit Admin modal (without waiting for submission)
   */
  async clickEditAdminSubmitButton() {
    try {
      await this.editAdminSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.editAdminSubmitButton.scrollIntoViewIfNeeded();
      const isEnabled = await this.editAdminSubmitButton.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      await this.editAdminSubmitButton.evaluate((el) => el.click());
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click Edit Admin submit button: ${error.message}`);
    }
  }

  /**
   * Submits the Edit Admin form
   */
  async submitEditAdminForm() {
    try {
      await this.editAdminSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.editAdminSubmitButton.scrollIntoViewIfNeeded();
      const isEnabled = await this.editAdminSubmitButton.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      await this.editAdminSubmitButton.click({ timeout: 5000 });
      
      // Wait for modal to close and navigation back to account manager page
      await this.page.waitForTimeout(3000);
      
      // Wait for modal to be hidden
      try {
        await this.editAdminModal.waitFor({ state: 'hidden', timeout: 5000 });
      } catch {
        // Modal might already be closed
      }
      
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to submit Edit Admin form: ${error.message}`);
    }
  }

  /**
   * Clicks the "Allow All" checkbox in User Access section
   */
  async clickAllowAllCheckbox() {
    try {
      // First, find the label with "Allow All" text
      const label = this.page.locator('label:has-text("Allow All")').first();
      await label.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get the checkbox that is a sibling before the label
      // HTML structure: <input type="checkbox" class="me-3"><label>Allow All</label>
      const checkbox = label.locator('xpath=./preceding-sibling::input[@type="checkbox"]').first();
      
      await checkbox.waitFor({ state: 'visible', timeout: 10000 });
      await checkbox.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await checkbox.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // Try alternative: find by label text and get parent, then find checkbox
      try {
        const container = this.page.locator('*:has-text("Allow All")').first();
        await container.waitFor({ state: 'visible', timeout: 5000 });
        const checkbox = container.locator('input[type="checkbox"]').first();
        await checkbox.waitFor({ state: 'visible', timeout: 5000 });
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.click();
        await this.page.waitForTimeout(1000);
      } catch (retryError) {
        throw new Error(`Failed to click Allow All checkbox: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  /**
   * Checks if "Allow All" checkbox is checked
   * @returns {Promise<boolean>}
   */
  async isAllowAllCheckboxChecked() {
    try {
      const label = this.page.locator('label:has-text("Allow All")').first();
      const isLabelVisible = await label.isVisible({ timeout: 5000 }).catch(() => false);
      if (!isLabelVisible) {
        return false;
      }
      
      const checkbox = label.locator('xpath=./preceding-sibling::input[@type="checkbox"]').first();
      const isChecked = await checkbox.isChecked();
      return isChecked;
    } catch {
      return false;
    }
  }

  /**
   * Gets all user checkboxes in User Access section
   * @returns {Promise<Array>} Array of checkbox locators
   */
  async getAllUserCheckboxes() {
    try {
      // Get all checkboxes, then filter out the "Allow All" checkbox
      // The "Allow All" checkbox is the one that has "Allow All" label as following sibling
      const allCheckboxes = this.page.locator('input[type="checkbox"]');
      const allowAllCheckbox = this.page.locator('label:has-text("Allow All")').locator('xpath=./preceding-sibling::input[@type="checkbox"]').first();
      
      // Get count and filter
      const count = await allCheckboxes.count();
      const checkboxes = [];
      
      for (let i = 0; i < count; i++) {
        const checkbox = allCheckboxes.nth(i);
        // Check if this is the "Allow All" checkbox by checking if it has "Allow All" label as sibling
        const hasAllowAllLabel = await checkbox.locator('xpath=./following-sibling::label[contains(text(), "Allow All")]').count() > 0;
        if (!hasAllowAllLabel) {
          checkboxes.push(checkbox);
        }
      }
      
      // Return as locator collection
      return this.page.locator('input[type="checkbox"]').filter({ 
        hasNot: this.page.locator('xpath=./following-sibling::label[contains(text(), "Allow All")]') 
      });
    } catch {
      return this.page.locator('input[type="checkbox"]');
    }
  }

  /**
   * Verifies if all user checkboxes are checked
   * @returns {Promise<boolean>}
   */
  async areAllUserCheckboxesChecked() {
    try {
      const checkboxes = await this.getAllUserCheckboxes();
      const count = await checkboxes.count();
      
      if (count === 0) {
        return false;
      }
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  }

  // ==================== DELETE ADMIN METHODS ====================

  /**
   * Clicks the Delete User option in the dropdown menu
   */
  async clickDeleteUserOption() {
    try {
      // Wait a bit for dropdown to stabilize
      await this.page.waitForTimeout(1000);
      
      // Try to find and click Delete User option directly
      // The dropdown menu might already be open, so we don't need to wait for it
      const deleteOption = this.page.locator('ul.dropdown-menu li.dropdown-item:has-text("Delete User"), ul.dropdown-menu li:has-text("Delete User"), .dropdown-menu li:has-text("Delete User"), .dropdown-item:has-text("Delete User")').first();
      
      // Wait for the option to be visible (with longer timeout)
      await deleteOption.waitFor({ state: 'visible', timeout: 10000 });
      await deleteOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await deleteOption.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct click fails, try alternative approach
      try {
        await this.page.waitForTimeout(1000);
        const altDeleteOption = this.page.locator('li.dropdown-item:has-text("Delete User")').first();
        await altDeleteOption.waitFor({ state: 'visible', timeout: 5000 });
        await altDeleteOption.scrollIntoViewIfNeeded();
        await altDeleteOption.click();
        await this.page.waitForTimeout(2000);
      } catch (retryError) {
        throw new Error(`Failed to click Delete User option: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  /**
   * Verifies if Delete Admin modal is open
   * @returns {Promise<boolean>}
   */
  async isDeleteAdminModalOpen() {
    try {
      // Wait a bit for modal to appear
      await this.page.waitForTimeout(1000);
      
      // Check for modal with Delete text
      const modal = this.page.locator('div.modal:has-text("Delete"), .modal.show:has-text("Delete"), div.modal-section:has-text("Delete")').first();
      const isModalVisible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
      if (isModalVisible) {
        return true;
      }
      
      // Try alternative: check for modal title
      const modalTitle = this.page.locator('div.modal-heading:has-text("Delete"), .modal-title:has-text("Delete"), *:has-text("Delete"):not(script):not(style)').first();
      const isTitleVisible = await modalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      if (isTitleVisible) {
        return true;
      }
      
      // Try alternative: check for Yes/No buttons that should be in the modal
      const yesButton = this.page.locator('div.modal button:has-text("Yes"), .modal button.btn-primary:has-text("Yes")').first();
      const isYesButtonVisible = await yesButton.isVisible({ timeout: 3000 }).catch(() => false);
      return isYesButtonVisible;
    } catch {
      return false;
    }
  }

  /**
   * Confirms deletion by clicking Yes button in Delete Admin modal
   */
  async confirmDeleteAdmin() {
    try {
      await this.deleteAdminModalYesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteAdminModalYesButton.scrollIntoViewIfNeeded();
      await this.deleteAdminModalYesButton.click();
      
      // Wait for modal to close
      await this.page.waitForTimeout(2000);
      
      // Wait for modal to be hidden
      try {
        await this.deleteAdminModal.waitFor({ state: 'hidden', timeout: 5000 });
      } catch {
        // Modal might already be closed
      }
      
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to confirm delete admin: ${error.message}`);
    }
  }

  // ==================== SUSPEND ADMIN METHODS ====================

  /**
   * Clicks the Suspend option in the dropdown menu
   */
  async clickSuspendOption() {
    try {
      // Wait a bit for dropdown to stabilize
      await this.page.waitForTimeout(1000);
      
      // Try to find and click Suspend option directly
      // The dropdown menu might already be open, so we don't need to wait for it
      const suspendOption = this.page.locator('ul.dropdown-menu li.dropdown-item:has-text("Suspend"), ul.dropdown-menu li:has-text("Suspend"), .dropdown-menu li:has-text("Suspend"), .dropdown-item:has-text("Suspend")').first();
      
      // Wait for the option to be visible (with longer timeout)
      await suspendOption.waitFor({ state: 'visible', timeout: 10000 });
      await suspendOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await suspendOption.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct click fails, try alternative approach
      try {
        await this.page.waitForTimeout(1000);
        const altSuspendOption = this.page.locator('li.dropdown-item:has-text("Suspend")').first();
        await altSuspendOption.waitFor({ state: 'visible', timeout: 5000 });
        await altSuspendOption.scrollIntoViewIfNeeded();
        await altSuspendOption.click();
        await this.page.waitForTimeout(2000);
      } catch (retryError) {
        throw new Error(`Failed to click Suspend option: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  /**
   * Gets the status of an admin from the table by name
   * @param {string} adminName - The admin name to search for
   * @returns {Promise<string>} The status value (e.g., "Active", "Inactive")
   */
  async getAdminStatusFromTable(adminName) {
    try {
      const rowCount = await this.allTableRows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(adminName.toLowerCase())) {
          const statusCell = row.locator('td.mat-column-Status').first();
          const statusText = await statusCell.textContent();
          return statusText ? statusText.trim() : '';
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  // ==================== ACTIVATE ADMIN METHODS ====================

  /**
   * Clicks the Activate/Active option in the dropdown menu
   */
  async clickActivateOption() {
    try {
      // Wait a bit for dropdown to stabilize
      await this.page.waitForTimeout(1000);
      
      // Try to find and click Activate/Active option directly
      // The dropdown menu might already be open, so we don't need to wait for it
      const activateOption = this.page.locator('ul.dropdown-menu li.dropdown-item:has-text("Activate"), ul.dropdown-menu li:has-text("Activate"), ul.dropdown-menu li.dropdown-item:has-text("Active"), ul.dropdown-menu li:has-text("Active"), .dropdown-menu li:has-text("Activate"), .dropdown-menu li:has-text("Active"), .dropdown-item:has-text("Activate"), .dropdown-item:has-text("Active")').first();
      
      // Wait for the option to be visible (with longer timeout)
      await activateOption.waitFor({ state: 'visible', timeout: 10000 });
      await activateOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await activateOption.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct click fails, try alternative approach
      try {
        await this.page.waitForTimeout(1000);
        const altActivateOption = this.page.locator('li.dropdown-item:has-text("Activate"), li.dropdown-item:has-text("Active")').first();
        await altActivateOption.waitFor({ state: 'visible', timeout: 5000 });
        await altActivateOption.scrollIntoViewIfNeeded();
        await altActivateOption.click();
        await this.page.waitForTimeout(2000);
      } catch (retryError) {
        throw new Error(`Failed to click Activate option: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  // ==================== MANAGE PERMISSIONS METHODS ====================

  /**
   * Clicks the Manage Permissions option in the dropdown menu
   */
  async clickManagePermissionsOption() {
    try {
      // Wait a bit for dropdown to stabilize
      await this.page.waitForTimeout(1000);
      
      // Try to find and click Manage Permissions option directly
      const managePermissionsOption = this.page.locator('ul.dropdown-menu li.dropdown-item:has-text("Manage Permissions"), ul.dropdown-menu li:has-text("Manage Permissions"), .dropdown-menu li:has-text("Manage Permissions"), .dropdown-item:has-text("Manage Permissions")').first();
      
      // Wait for the option to be visible (with longer timeout)
      await managePermissionsOption.waitFor({ state: 'visible', timeout: 10000 });
      await managePermissionsOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await managePermissionsOption.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct click fails, try alternative approach
      try {
        await this.page.waitForTimeout(1000);
        const altManagePermissionsOption = this.page.locator('li.dropdown-item:has-text("Manage Permissions")').first();
        await altManagePermissionsOption.waitFor({ state: 'visible', timeout: 5000 });
        await altManagePermissionsOption.scrollIntoViewIfNeeded();
        await altManagePermissionsOption.click();
        await this.page.waitForTimeout(2000);
      } catch (retryError) {
        throw new Error(`Failed to click Manage Permissions option: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  /**
   * Verifies if Manage Permissions modal is open
   * @returns {Promise<boolean>}
   */
  async isManagePermissionsModalOpen() {
    try {
      // Wait a bit for modal to appear
      await this.page.waitForTimeout(2000);
      
      // Check for modal with "Manage Permissions for User" text
      const modal = this.page.locator('div.permission-management, *:has-text("Manage Permissions for User")').first();
      const isModalVisible = await modal.isVisible({ timeout: 10000 }).catch(() => false);
      if (isModalVisible) {
        return true;
      }
      
      // Try alternative: check for modal title
      const modalTitle = this.page.locator('h4:has-text("Manage Permissions for User"), *:has-text("Manage Permissions for User")').first();
      const isTitleVisible = await modalTitle.isVisible({ timeout: 5000 }).catch(() => false);
      if (isTitleVisible) {
        return true;
      }
      
      // Try alternative: check for permission checkboxes that should be in the modal
      const checkboxes = this.page.locator('div.permissions-checkboxes input[type="checkbox"]').first();
      const isCheckboxVisible = await checkboxes.isVisible({ timeout: 3000 }).catch(() => false);
      return isCheckboxVisible;
    } catch {
      return false;
    }
  }

  /**
   * Checks all permission checkboxes in the Manage Permissions modal
   */
  async checkAllPermissionCheckboxes() {
    try {
      // Wait for checkboxes to be available
      await this.page.waitForTimeout(1000);
      
      // Get all permission checkboxes
      const checkboxes = this.page.locator('div.permissions-checkboxes input[type="checkbox"], label.permission-checkbox input[type="checkbox"]');
      const count = await checkboxes.count();
      
      console.log(`  Found ${count} permission checkboxes`);
      
      // Check each checkbox
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const isVisible = await checkbox.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          const isChecked = await checkbox.isChecked();
          if (!isChecked) {
            await checkbox.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(200);
            await checkbox.click();
            await this.page.waitForTimeout(200);
          }
        }
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to check all permission checkboxes: ${error.message}`);
    }
  }

  /**
   * Verifies if all permission checkboxes are checked
   * @returns {Promise<boolean>}
   */
  async areAllPermissionCheckboxesChecked() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Get all permission checkboxes
      const checkboxes = this.page.locator('div.permissions-checkboxes input[type="checkbox"], label.permission-checkbox input[type="checkbox"]');
      const count = await checkboxes.count();
      
      if (count === 0) {
        return false;
      }
      
      // Check each checkbox
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const isVisible = await checkbox.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          const isChecked = await checkbox.isChecked();
          if (!isChecked) {
            return false;
          }
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Save Permissions button
   */
  async clickSavePermissions() {
    try {
      await this.savePermissionsButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.savePermissionsButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.savePermissionsButton.click();
      
      // Wait for modal to close
      await this.page.waitForTimeout(2000);
      
      // Wait for modal to be hidden
      try {
        await this.managePermissionsModal.waitFor({ state: 'hidden', timeout: 5000 });
      } catch {
        // Modal might already be closed
      }
      
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to click Save Permissions: ${error.message}`);
    }
  }
}

module.exports = { AccountManagerPage };

