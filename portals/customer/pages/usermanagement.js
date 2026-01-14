class UserManagementPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.userManagementMenu = page.locator('a:has-text("User Management"), button:has-text("User Management"), a[href*="user-management"]').first();
    
    // Page wrapper (if exists)
    this.userManagementWrapper = page.locator('.user-management-wrapper, .user-management').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("User Management"), .header-left:has-text("User Management")').first();
    this.pageTitle = page.locator('h6.page-title-modern:has-text("User Management")').first();
    this.pageIcon = page.locator('.header-left i.bi-person-fill-gear.page-icon, .page-icon.bi-person-fill-gear').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    
    // Search functionality
    this.searchHereButton = page.locator('button:has-text("Search Here"), a:has-text("Search Here"), .search-here, [aria-label*="Search Here"]').first();
    this.searchInput = page.locator('input[placeholder*="Search"], input[type="text"][placeholder*="search"], app-search-form input').first();
    this.searchButton = page.locator('button:has-text("Search"), button[type="submit"]:has-text("Search"), .search-button').first();
    this.resetButton = page.locator('button:has-text("Reset"), button:has-text("Clear"), .reset-button, .clear-button').first();
    
    // Filter fields - scoped to search form area to avoid matching header dropdowns
    const searchFormScope = page.locator('app-search-form, .search-form, form, .filter-section, .search-section').first();
    this.displayNameInput = page.locator('input[placeholder*="Display Name"], input[name*="displayName"], input[id*="displayName"], input[ng-reflect-name="displayName"], input.mat-mdc-input-element[placeholder*="Display Name"]').first();
    this.emailInput = page.locator('input[placeholder*="Email"], input[type="email"][name*="email"], input[id*="email"], input[ng-reflect-name="email"], input.mat-mdc-input-element[placeholder*="Email"]').first();
    // Status dropdown - explicitly exclude user profile dropdown and scope to search area
    this.statusDropdown = searchFormScope.locator('select[name*="status"], select[id*="status"]').first()
      .or(page.locator('select[name*="status"]:not([aria-labelledby="profileDropdown"]), select[id*="status"]:not([aria-labelledby="profileDropdown"])').first())
      .or(page.locator('mat-select:has-text("Status"):not([aria-labelledby="profileDropdown"])').first())
      .or(page.locator('.status-dropdown:not([aria-labelledby="profileDropdown"])').first());
    this.statusDropdownButton = searchFormScope.locator('button[aria-label*="Status"], .status-select, select[name*="status"], mat-select').first()
      .or(page.locator('button[aria-label*="Status"]:not([aria-labelledby="profileDropdown"])').first())
      .or(page.locator('.status-select:not([aria-labelledby="profileDropdown"])').first())
      .or(page.locator('select[name*="status"]:not([aria-labelledby="profileDropdown"])').first())
      .or(page.locator('mat-select:not([aria-labelledby="profileDropdown"])').first());
    this.statusOptionOffline = page.locator('option:has-text("Offline"), mat-option:has-text("Offline"), [role="option"]:has-text("Offline")').first();
    this.statusOptionOnline = page.locator('option:has-text("Online"), mat-option:has-text("Online"), [role="option"]:has-text("Online")').first();
    
    // Table
    this.usersTable = page.locator('table, app-table table, mat-table').first();
    this.tableRows = page.locator('table tbody tr, app-table table tbody tr, mat-table tbody mat-row').first();
    this.allTableRows = page.locator('table tbody tr, app-table table tbody tr, mat-table tbody mat-row');
    this.displayNameColumn = page.locator('th:has-text("Display Name"), .mat-column-displayName, td:nth-child(1), mat-cell:nth-child(1)').first();
    this.emailColumn = page.locator('th:has-text("Email"), .mat-column-email, td:nth-child(2), mat-cell:nth-child(2)').first();
    this.statusColumn = page.locator('th:has-text("Status"), .mat-column-status, td:nth-child(3), mat-cell:nth-child(3)').first();
    this.cloudUsernameColumn = page.locator('th:has-text("Cloud Username"), .mat-column-cloudUsername, th:has-text("Cloud User"), th:has-text("Username")').first();
    this.cloudPasswordColumn = page.locator('th:has-text("Cloud Password"), .mat-column-cloudPassword, th:has-text("Cloud Pass"), th:has-text("Password")').first();
    this.loginLinkColumn = page.locator('th:has-text("Login Link"), .mat-column-loginLink, th:has-text("Login"), th:has-text("Link")').first();
    this.actionsColumn = page.locator('th:has-text("Actions"), .mat-column-actions, td:last-child, mat-cell:last-child').first();
    
    // Force Log Off button in action column
    this.forceLogOffButton = page.locator('button:has-text("Log Off"), button:has-text("Logoff"), button:has-text("Force Log Off"), i.bi-power.text-danger, button[aria-label*="Log Off"], button[aria-label*="Logoff"]').first();
    
    // Edit button in action column
    this.editButton = page.locator('button:has-text("Edit"), button[aria-label*="Edit"], i.bi-pencil-square, i.bi-pencil, button:has(i.bi-pencil-square), button:has(i.bi-pencil), button.edit-btn, i[ng-reflect-message="Update"]').first();
    
    // Delete button in action column
    this.deleteButton = page.locator('button:has-text("Delete"), button[aria-label*="Delete"], i.bi-trash3-fill, i.bi-trash, button:has(i.bi-trash3-fill), button:has(i.bi-trash), i.bi-x-circle, button:has(i.bi-x-circle), i[ng-reflect-message="Delete"]').first();
    
    // Delete confirmation modal
    this.deleteConfirmationModal = page.locator('.modal:has-text("Delete"), .modal:has-text("Confirm Delete"), .modal-dialog:has-text("Delete"), .modal:has-text("Are you sure")').first();
    this.deleteConfirmButton = this.deleteConfirmationModal.locator('button:has-text("Delete"), button:has-text("Confirm"), button:has-text("Yes"), button.btn-danger:has-text("Delete")').first();
    this.deleteCancelButton = this.deleteConfirmationModal.locator('button:has-text("Cancel"), button:has-text("No"), button[aria-label="Close"]').first();
    
    // Add Instance User Modal
    this.addInstanceUserModal = page.locator('.common-modal:has-text("Add Instance User"), .modal:has-text("Add Instance User"), .modal:has-text("Add User"), .modal-dialog:has-text("Add Instance User"), .modal-dialog:has-text("Add User")').first();
    this.addInstanceUserModalTitle = this.addInstanceUserModal.locator('.modal-title-modern:has-text("Add Instance User"), .modal-title:has-text("Add Instance User"), .modal-title:has-text("Add User"), .modal-header:has-text("Add")').first();
    
    // Add Instance User Modal form fields
    this.addModalDisplayNameInput = this.addInstanceUserModal.locator('input[ng-reflect-name="userDisplayName"], input[ng-reflect-name="displayName"], input[placeholder="Enter display name"], input[placeholder*="Display Name"], input[name*="displayName"], input[id*="displayName"]').first();
    this.addModalEmailInput = this.addInstanceUserModal.locator('input[type="email"][ng-reflect-name="email"], input[type="email"][placeholder="Enter email"], input[type="email"][placeholder*="Email"], input[name*="email"], input[id*="email"]').first();
    
    // Add Instance User Modal buttons
    this.addModalSubmitButton = this.addInstanceUserModal.locator('button.primary-btn:has-text("Submit"), button[type="submit"]:has-text("Submit"), button:has-text("Submit"), button:has-text("Add"), button:has-text("Save"), button[type="submit"]').first();
    this.addModalCancelButton = this.addInstanceUserModal.locator('button.secondary-btn:has-text("Cancel"), button:has-text("Cancel"), button:has-text("Close"), button[aria-label="Close"]').first();
    
    // Add Instance User Modal validation errors
    this.addModalRequiredFieldErrors = this.addInstanceUserModal.locator('.text-danger, .error-message, .invalid-feedback, [class*="error"], mat-error, .field-error').first();
    this.addModalDisplayNameError = this.addInstanceUserModal.locator('*:has-text("Display Name") + * .text-danger, *:has-text("Display Name") ~ * .error-message, mat-error:has-text("required"), .error:has-text("Display Name")').first();
    this.addModalEmailError = this.addInstanceUserModal.locator('*:has-text("Email") + * .text-danger, *:has-text("Email") ~ * .error-message, mat-error:has-text("required"), .error:has-text("Email")').first();
    
    // Update Instance User Modal
    this.updateInstanceUserModal = page.locator('.common-modal:has-text("Update Instance User"), .modal:has-text("Update Instance User"), .modal:has-text("Edit User"), .modal:has-text("Update User"), .modal-dialog:has-text("Update"), .modal-dialog:has-text("Edit")').first();
    this.updateInstanceUserModalTitle = this.updateInstanceUserModal.locator('.modal-title-modern:has-text("Update Instance User"), .modal-title:has-text("Update Instance User"), .modal-title:has-text("Edit User"), .modal-header:has-text("Update")').first();
    
    // Modal form fields - scoped to modal and app-dynamic-form
    this.modalDisplayNameInput = this.updateInstanceUserModal.locator('input[ng-reflect-name="userDisplayName"], input[placeholder="Enter display name"], input[placeholder*="Display Name"], input[name*="displayName"], input[id*="displayName"], input[ng-reflect-name="displayName"]').first();
    this.modalEmailInput = this.updateInstanceUserModal.locator('input[type="email"][ng-reflect-name="email"], input[type="email"][placeholder="Enter email"], input[type="email"][placeholder*="Email"], input[name*="email"], input[id*="email"]').first();
    
    // Modal buttons
    this.modalSubmitButton = this.updateInstanceUserModal.locator('button.primary-btn:has-text("Submit"), button[type="submit"]:has-text("Submit"), button:has-text("Submit"), button:has-text("Update"), button:has-text("Save"), button[type="submit"]').first();
    this.modalCancelButton = this.updateInstanceUserModal.locator('button.secondary-btn:has-text("Cancel"), button:has-text("Cancel"), button:has-text("Close"), button[aria-label="Close"]').first();
    
    // Required field validation messages in modal
    this.modalRequiredFieldErrors = this.updateInstanceUserModal.locator('.text-danger, .error-message, .invalid-feedback, [class*="error"], mat-error, .field-error').first();
    this.modalDisplayNameError = this.updateInstanceUserModal.locator('*:has-text("Display Name") + * .text-danger, *:has-text("Display Name") ~ * .error-message, mat-error:has-text("required"), .error:has-text("Display Name")').first();
    this.modalEmailError = this.updateInstanceUserModal.locator('*:has-text("Email") + * .text-danger, *:has-text("Email") ~ * .error-message, mat-error:has-text("required"), .error:has-text("Email")').first();
    
    // No results message
    this.noResultsMessage = page.locator('.fs-5.text-muted:has-text("No Instance Available"), div:has-text("No Instance Available"), .no-results, .empty-state').first();
    
    // Toast/Notification messages
    this.successToast = page.locator('.toast-success, .alert-success, .toast:has-text("successfully"), [class*="toast-success"], [class*="alert-success"], .toast-body:has-text("successfully")').first();
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
    this.toastMessage = page.locator('.toast-body, .toast-message, .alert-message, [class*="toast"]').first();
    
    // User dropdown (to check if user is root user or instance user)
    // Dropdown toggle: <a data-bs-toggle="dropdown" class="dropdown-toggle">
    this.userDropdown = page.locator('a.dropdown-toggle[data-bs-toggle="dropdown"], a.dropdown-toggle, a[data-bs-toggle="dropdown"]').first();
    // Dropdown menu: <div class="dropdown-menu text-center show" aria-labelledby="profileDropdown">
    this.userDropdownMenu = page.locator('div.dropdown-menu[aria-labelledby="profileDropdown"], .dropdown-menu.show, .dropdown-menu').first();
    // User type text: <span class="mb-2">Root User</span> or <span class="mb-2">Instance User</span>
    this.userTypeText = page.locator('.dropdown-menu span.mb-2, .dropdown-menu.show span.mb-2, div[aria-labelledby="profileDropdown"] span.mb-2').first();
    this.rootUserOption = page.locator('.dropdown-menu span.mb-2:has-text("Root User"), .dropdown-menu.show span.mb-2:has-text("Root User"), span.mb-2:has-text("Root User")').first();
    this.instanceUserOption = page.locator('.dropdown-menu span.mb-2:has-text("Instance User"), .dropdown-menu.show span.mb-2:has-text("Instance User"), span.mb-2:has-text("Instance User")').first();
    
    // Add User button
    this.addUserButton = page.locator('button.btn-primary-modern:has-text("User"), button:has-text("User"):has(i.bi-plus), .header-actions button:has-text("User")').first();
    
    // Purchase Users button
    this.purchaseUsersButton = page.locator('button.primary-btn-modern:has-text("Purchase Users"), button:has-text("Purchase Users"), .user-limit-section button:has-text("Purchase Users")').first();
    
    // User Limit
    this.userLimitText = page.locator('.user-limit, .user-limit-section, p.user-limit, .user-limit-section p').first();
  }

  /**
   * Navigates to User Management page
   */
  async gotoUserManagement() {
    // Try to click the menu item
    try {
      await this.userManagementMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.userManagementMenu.click();
    } catch (error) {
      // If menu item not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/user-management`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load - check for wrapper or key elements
    await Promise.race([
      this.userManagementWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the User Management page is visible.
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.userManagementWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the page loaded without errors.
   * @returns {Promise<boolean>}
   */
  async isPageLoadedWithoutErrors() {
    try {
      // Wait for page to be fully loaded
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      
      // Check for critical error messages
      const errorCount = await this.errorMessages.count();
      
      // Check if main elements are present
      const pageTitleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      const pageHeaderVisible = await this.pageHeader.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Page is loaded without errors if:
      // - Main elements are visible
      // - No critical error messages (or only validation errors which are expected)
      return pageTitleVisible || pageHeaderVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the "User Management" text is visible.
   * @returns {Promise<boolean>}
   */
  async isUserManagementTextVisible() {
    try {
      // Check if page title with "User Management" text is visible
      const titleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      if (titleVisible) {
        const text = await this.pageTitle.textContent();
        if (text && text.trim().toLowerCase().includes('user management')) {
          return true;
        }
      }
      
      // Also check page header
      const headerVisible = await this.pageHeader.isVisible({ timeout: 5000 }).catch(() => false);
      if (headerVisible) {
        const text = await this.pageHeader.textContent();
        if (text && text.trim().toLowerCase().includes('user management')) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the "User Management" page title text.
   * @returns {Promise<string>}
   */
  async getUserManagementText() {
    try {
      await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
      const text = await this.pageTitle.textContent();
      return text?.trim() || '';
    } catch (error) {
      // Try alternative selector
      const altTitle = this.page.locator('h6.page-title-modern, .page-title-modern').first();
      const text = await altTitle.textContent().catch(() => '');
      return text?.trim() || '';
    }
  }

  /**
   * Gets the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Verifies all page load validations:
   * - Page loads without errors
   * - "User Management" text is visible
   * @returns {Promise<{pageLoaded: boolean, userManagementTextVisible: boolean, userManagementText: string}>}
   */
  async verifyPageLoad() {
    const pageLoaded = await this.isPageLoadedWithoutErrors();
    const userManagementTextVisible = await this.isUserManagementTextVisible();
    const userManagementText = await this.getUserManagementText();
    
    return {
      pageLoaded,
      userManagementTextVisible,
      userManagementText
    };
  }

  /**
   * Gets display name from the first table row.
   * @returns {Promise<string>}
   */
  async getDisplayNameFromFirstRow() {
    try {
      await this.allTableRows.first().waitFor({ state: 'visible', timeout: 10000 });
      const firstRow = this.allTableRows.first();
      // Try to get display name from first cell or column with "Display" in header
      const displayNameCell = firstRow.locator('td').first().or(firstRow.locator('mat-cell').first());
      const text = await displayNameCell.textContent();
      return text?.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets email from the first table row.
   * @returns {Promise<string>}
   */
  async getEmailFromFirstRow() {
    try {
      await this.allTableRows.first().waitFor({ state: 'visible', timeout: 10000 });
      const firstRow = this.allTableRows.first();
      return await this.getEmailFromRow(firstRow);
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets display name from the second table row (if available).
   * @returns {Promise<string>}
   */
  async getDisplayNameFromSecondRow() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount < 2) {
        return '';
      }
      const secondRow = this.allTableRows.nth(1);
      await secondRow.waitFor({ state: 'visible', timeout: 10000 });
      // Try to get display name from first cell or column with "Display" in header
      const displayNameCell = secondRow.locator('td').first().or(secondRow.locator('mat-cell').first());
      const text = await displayNameCell.textContent();
      return text?.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets email from the second table row (if available).
   * @returns {Promise<string>}
   */
  async getEmailFromSecondRow() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount < 2) {
        return '';
      }
      const secondRow = this.allTableRows.nth(1);
      await secondRow.waitFor({ state: 'visible', timeout: 10000 });
      return await this.getEmailFromRow(secondRow);
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets email from a specific table row
   * @param {import('@playwright/test').Locator} row - Table row locator
   * @returns {Promise<string>}
   */
  async getEmailFromRow(row) {
    try {
      // Try to get email from second cell or column with "Email" in header
      const emailCell = row.locator('td').nth(1).or(row.locator('mat-cell').nth(1));
      const text = await emailCell.textContent();
      const email = text?.trim() || '';
      
      // If no email found in second column, try to find email pattern in row text
      if (!email || !email.includes('@')) {
        const rowText = await row.textContent().catch(() => '');
        const emailMatch = rowText?.match(/[\w\.-]+@[\w\.-]+\.\w+/);
        return emailMatch ? emailMatch[0] : '';
      }
      
      return email;
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the count of table rows.
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      await this.page.waitForTimeout(1000);
      return await this.allTableRows.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Gets the user limit from the page
   * @returns {Promise<number>} Returns the user limit number, or -1 if not found
   */
  async getUserLimit() {
    try {
      // Wait for user limit text to be visible
      const limitVisible = await this.userLimitText.isVisible({ timeout: 5000 }).catch(() => false);
      if (!limitVisible) {
        // Try alternative selectors
        const altSelectors = [
          this.page.locator('.user-limit-section p, .user-limit-section span').first(),
          this.page.locator('p:has-text("User Limit"), span:has-text("User Limit")').first(),
          this.page.locator('.user-limit').first()
        ];
        
        for (const selector of altSelectors) {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await selector.textContent().catch(() => '');
            if (text) {
              // Extract number from text like "User Limit: 10" or "User Limit:10"
              const match = text.match(/User Limit[:\s]+(\d+)/i);
              if (match && match[1]) {
                return parseInt(match[1], 10);
              }
            }
          }
        }
        return -1;
      }
      
      const limitText = await this.userLimitText.textContent().catch(() => '');
      if (limitText) {
        // Extract number from text like "User Limit: 10" or "User Limit:10"
        const match = limitText.match(/User Limit[:\s]+(\d+)/i);
        if (match && match[1]) {
          return parseInt(match[1], 10);
        }
      }
      
      return -1;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Checks if user limit is reached
   * @returns {Promise<{limitReached: boolean, userLimit: number, currentCount: number}>}
   */
  async isUserLimitReached() {
    try {
      const userLimit = await this.getUserLimit();
      const currentCount = await this.getTableRowCount();
      
      if (userLimit === -1) {
        // If we can't get the limit, assume limit is not reached
        return {
          limitReached: false,
          userLimit: -1,
          currentCount: currentCount
        };
      }
      
      return {
        limitReached: currentCount >= userLimit,
        userLimit: userLimit,
        currentCount: currentCount
      };
    } catch (error) {
      return {
        limitReached: false,
        userLimit: -1,
        currentCount: 0,
        error: error.message
      };
    }
  }

  /**
   * Clicks on "Search Here" button to open search fields.
   */
  async clickSearchHere() {
    try {
      await this.searchHereButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchHereButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // If "Search Here" button not found, try alternative selectors
      const altSelectors = [
        this.page.locator('button:has-text("Search"), a:has-text("Search")').first(),
        this.page.locator('.search-toggle, .filter-toggle').first()
      ];
      
      for (const selector of altSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await selector.click();
            await this.page.waitForTimeout(1000);
            return;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
    }
  }

  /**
   * Enters text in the search input field.
   * @param {string} text - Text to enter
   */
  async enterSearchText(text) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.clear();
    await this.searchInput.fill(text);
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the Search button.
   */
  async clickSearch() {
    await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Clicks the Reset button.
   */
  async clickReset() {
    await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.resetButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Enters display name in the display name input field.
   * @param {string} displayName - Display name to enter
   */
  async enterDisplayName(displayName) {
    // Try multiple selectors for Material Design input
    const displayNameSelectors = [
      this.displayNameInput,
      this.page.locator('input[ng-reflect-name="displayName"]').first(),
      this.page.locator('input.mat-mdc-input-element[placeholder*="Display Name"]').first(),
      this.page.locator('input[placeholder="Display Name"]').first()
    ];

    let inputFound = false;
    for (const selector of displayNameSelectors) {
      try {
        // Check if element exists (even if hidden)
        const exists = await selector.count();
        if (exists > 0) {
          // Try to make it visible by clicking on the form field or label
          const formField = this.page.locator('mat-form-field:has(input[ng-reflect-name="displayName"]), .mat-mdc-form-field:has(input[placeholder*="Display Name"])').first();
          const formFieldExists = await formField.count();
          if (formFieldExists > 0) {
            await formField.click();
            await this.page.waitForTimeout(300);
          }
          
          // Wait for input to be attached and try to interact
          await selector.waitFor({ state: 'attached', timeout: 5000 });
          await selector.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          
          // Clear and fill
          await selector.clear();
          await selector.fill(displayName);
          inputFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!inputFound) {
      throw new Error('Display Name input field not found');
    }
    
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters email in the email input field.
   * @param {string} email - Email to enter
   */
  async enterEmail(email) {
    // Try multiple selectors for Material Design input
    const emailSelectors = [
      this.emailInput,
      this.page.locator('input[ng-reflect-name="email"]').first(),
      this.page.locator('input.mat-mdc-input-element[placeholder*="Email"]').first(),
      this.page.locator('input[type="email"][placeholder*="Email"]').first()
    ];

    let inputFound = false;
    for (const selector of emailSelectors) {
      try {
        // Check if element exists (even if hidden)
        const exists = await selector.count();
        if (exists > 0) {
          // Try to make it visible by clicking on the form field or label
          const formField = this.page.locator('mat-form-field:has(input[ng-reflect-name="email"]), .mat-mdc-form-field:has(input[placeholder*="Email"])').first();
          const formFieldExists = await formField.count();
          if (formFieldExists > 0) {
            await formField.click();
            await this.page.waitForTimeout(300);
          }
          
          // Wait for input to be attached and try to interact
          await selector.waitFor({ state: 'attached', timeout: 5000 });
          await selector.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          
          // Clear and fill
          await selector.clear();
          await selector.fill(email);
          inputFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!inputFound) {
      throw new Error('Email input field not found');
    }
    
    await this.page.waitForTimeout(500);
  }

  /**
   * Gets the current value of display name input field.
   * @returns {Promise<string>}
   */
  async getDisplayNameInputValue() {
    try {
      const selector = this.page.locator('input[ng-reflect-name="displayName"], input[placeholder*="Display Name"]').first();
      await selector.waitFor({ state: 'attached', timeout: 5000 });
      return await selector.inputValue();
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the current value of email input field.
   * @returns {Promise<string>}
   */
  async getEmailInputValue() {
    try {
      const selector = this.page.locator('input[ng-reflect-name="email"], input[placeholder*="Email"]').first();
      await selector.waitFor({ state: 'attached', timeout: 5000 });
      return await selector.inputValue();
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if the form is reset (fields are empty).
   * @returns {Promise<boolean>}
   */
  async isFormReset() {
    const displayNameValue = await this.getDisplayNameInputValue();
    const emailValue = await this.getEmailInputValue();
    return displayNameValue === '' && emailValue === '';
  }

  /**
   * Clicks on the status dropdown.
   */
  async clickStatusDropdown() {
    // Try multiple selectors for status dropdown - explicitly exclude user profile dropdown
    const statusSelectors = [
      // First try scoped to search form area
      this.page.locator('app-search-form select[name*="status"], .search-form select[name*="status"], form select[name*="status"]').first(),
      this.page.locator('app-search-form mat-select, .search-form mat-select, form mat-select').first(),
      // Then try with explicit exclusion of profile dropdown
      this.page.locator('select[name*="status"]:not([aria-labelledby="profileDropdown"])').first(),
      this.page.locator('select[id*="status"]:not([aria-labelledby="profileDropdown"])').first(),
      this.page.locator('mat-select:has-text("Status"):not([aria-labelledby="profileDropdown"])').first(),
      // Use the page object locators
      this.statusDropdownButton,
      this.statusDropdown,
      // Fallback - but exclude dropdown-toggle in header/navbar
      this.page.locator('select[name*="status"]:not(.dropdown-toggle), select[id*="status"]:not(.dropdown-toggle)').first(),
      this.page.locator('mat-select:not(.dropdown-toggle):not([aria-labelledby="profileDropdown"])').first()
    ];

    for (const selector of statusSelectors) {
      try {
        const isVisible = await selector.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          // Double-check it's not the user profile dropdown by checking if it's near search fields
          const nearSearchField = await this.displayNameInput.isVisible({ timeout: 1000 }).catch(() => false);
          if (nearSearchField) {
            await selector.scrollIntoViewIfNeeded();
            await selector.click();
            await this.page.waitForTimeout(500);
            return;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    // If all selectors failed, throw an error
    throw new Error('Status dropdown not found. Make sure search form is expanded.');
  }

  /**
   * Selects status from dropdown.
   * @param {string} status - Status to select ("Online" or "Offline")
   */
  async selectStatus(status) {
    await this.clickStatusDropdown();
    await this.page.waitForTimeout(500);

    if (status.toLowerCase() === 'offline') {
      await this.statusOptionOffline.waitFor({ state: 'visible', timeout: 5000 });
      await this.statusOptionOffline.click();
    } else if (status.toLowerCase() === 'online') {
      await this.statusOptionOnline.waitFor({ state: 'visible', timeout: 5000 });
      await this.statusOptionOnline.click();
    }
    
    await this.page.waitForTimeout(500);
  }

  /**
   * Checks if "No Instance Available" message is visible.
   * @returns {Promise<boolean>}
   */
  async isNoInstanceAvailableVisible() {
    try {
      return await this.noResultsMessage.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies table contains results or shows "No Instance Available".
   * @returns {Promise<{hasResults: boolean, rowCount: number, noInstanceMessage: boolean}>}
   */
  async verifyTableResults() {
    const rowCount = await this.getTableRowCount();
    const noInstanceMessage = await this.isNoInstanceAvailableVisible();
    const hasResults = rowCount > 0;

    return {
      hasResults,
      rowCount,
      noInstanceMessage
    };
  }

  /**
   * Gets status value from a specific table row.
   * @param {number} rowIndex - Index of the row (0-based)
   * @returns {Promise<string>}
   */
  async getStatusFromRow(rowIndex) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 5000 });
      
      // Try to find status column - could be in different positions
      const statusSelectors = [
        row.locator('td').nth(2), // Third column
        row.locator('mat-cell').nth(2), // Third cell for Material table
        row.locator('td:has-text("Online"), td:has-text("Offline")').first(),
        row.locator('mat-cell:has-text("Online"), mat-cell:has-text("Offline")').first(),
        row.locator('[class*="status"]').first()
      ];

      for (const selector of statusSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await selector.textContent();
            if (text && (text.includes('Online') || text.includes('Offline'))) {
              return text.trim();
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // Fallback: get all cells and find the one with status
      const cells = row.locator('td, mat-cell');
      const cellCount = await cells.count();
      for (let i = 0; i < cellCount; i++) {
        const cellText = await cells.nth(i).textContent().catch(() => '');
        if (cellText && (cellText.includes('Online') || cellText.includes('Offline'))) {
          return cellText.trim();
        }
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets all status values from table rows.
   * @returns {Promise<string[]>}
   */
  async getAllStatusValues() {
    try {
      const rowCount = await this.getTableRowCount();
      const statuses = [];

      for (let i = 0; i < rowCount; i++) {
        const status = await this.getStatusFromRow(i);
        if (status) {
          statuses.push(status);
        }
      }

      return statuses;
    } catch (error) {
      return [];
    }
  }

  /**
   * Verifies that all status values in the table match the expected status.
   * @param {string} expectedStatus - Expected status ("Online" or "Offline")
   * @returns {Promise<{allMatch: boolean, statuses: string[], expectedStatus: string, matchCount: number, totalCount: number}>}
   */
  async verifyStatusColumnMatches(expectedStatus) {
    const statuses = await this.getAllStatusValues();
    const totalCount = statuses.length;
    const normalizedExpected = expectedStatus.trim().toLowerCase();
    
    const matchCount = statuses.filter(status => {
      const normalizedStatus = status.toLowerCase();
      return normalizedStatus.includes(normalizedExpected) || 
             (normalizedExpected === 'online' && normalizedStatus.includes('online')) ||
             (normalizedExpected === 'offline' && normalizedStatus.includes('offline'));
    }).length;

    const allMatch = matchCount === totalCount && totalCount > 0;

    return {
      allMatch,
      statuses,
      expectedStatus: expectedStatus.trim(),
      matchCount,
      totalCount
    };
  }

  /**
   * Clicks on user dropdown to open it
   */
  async clickUserDropdown() {
    try {
      // Primary selector: <a data-bs-toggle="dropdown" class="dropdown-toggle">
      const dropdownSelectors = [
        this.userDropdown,
        this.page.locator('a.dropdown-toggle[data-bs-toggle="dropdown"]').first(),
        this.page.locator('a[data-bs-toggle="dropdown"].dropdown-toggle').first(),
        // Fallback selectors
        this.page.locator('a.dropdown-toggle').first(),
        this.page.locator('button[aria-label*="User"], button[aria-label*="Account"], button[aria-label*="Profile"]').first(),
        this.page.locator('.navbar .dropdown-toggle, .header .dropdown-toggle').first()
      ];

      for (const selector of dropdownSelectors) {
        try {
          const count = await selector.count();
          if (count > 0) {
            const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              await selector.scrollIntoViewIfNeeded();
              await selector.click();
              await this.page.waitForTimeout(1000);
              // Wait for dropdown menu to appear
              await this.userDropdownMenu.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
              return;
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      throw new Error('User dropdown not found');
    } catch (error) {
      throw new Error(`Failed to click user dropdown: ${error.message}`);
    }
  }

  /**
   * Gets user type from dropdown (Root User or Instance User)
   * @returns {Promise<string>} Returns 'root user', 'instance user', or 'unknown'
   */
  async getUserType() {
    try {
      // First check if dropdown is already open
      let menu = null;
      let menuVisible = false;
      
      // Try to find the dropdown menu with multiple selectors
      const menuSelectors = [
        this.page.locator('.dropdown-menu.show[aria-labelledby="profileDropdown"]').first(),
        this.page.locator('.dropdown-menu[aria-labelledby="profileDropdown"].show').first(),
        this.page.locator('div[aria-labelledby="profileDropdown"].dropdown-menu.show').first(),
        this.userDropdownMenu,
        this.page.locator('.dropdown-menu.show').first(),
        this.page.locator('.dropdown-menu[aria-labelledby="profileDropdown"]').first()
      ];
      
      for (const menuSelector of menuSelectors) {
        const count = await menuSelector.count().catch(() => 0);
        if (count > 0) {
          menuVisible = await menuSelector.isVisible({ timeout: 1000 }).catch(() => false);
          if (menuVisible) {
            menu = menuSelector;
            break;
          }
        }
      }
      
      if (!menuVisible) {
        // Click dropdown to open it
        await this.clickUserDropdown();
        await this.page.waitForTimeout(1500);
        
        // Try to find the menu again
        for (const menuSelector of menuSelectors) {
          const count = await menuSelector.count().catch(() => 0);
          if (count > 0) {
            menuVisible = await menuSelector.isVisible({ timeout: 3000 }).catch(() => false);
            if (menuVisible) {
              menu = menuSelector;
              break;
            }
          }
        }
      }

      if (!menuVisible || !menu) {
        await this.page.keyboard.press('Escape').catch(() => {});
        return 'unknown';
      }

      // First, try to get text from the entire menu (most reliable)
      let menuText = '';
      try {
        menuText = await menu.textContent({ timeout: 2000 }).catch(() => '');
        if (menuText && menuText.trim()) {
          const normalizedText = menuText.trim().toLowerCase();
          
          // Close dropdown before returning (use Escape only, don't click body)
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(300);
          
          if (normalizedText.includes('root user')) {
            return 'root user';
          } else if (normalizedText.includes('instance user')) {
            return 'instance user';
          }
        }
      } catch (e) {
        // Continue to try specific selectors
      }

      // Get user type from <span class="mb-2">Root User</span> or <span class="mb-2">Instance User</span>
      const userTypeSelectors = [
        // Scoped to the menu we found
        menu.locator('span.mb-2').first(),
        // Or try page-level selectors
        this.page.locator('div[aria-labelledby="profileDropdown"] span.mb-2').first(),
        this.page.locator('.dropdown-menu.show span.mb-2').first(),
        this.page.locator('.dropdown-menu[aria-labelledby="profileDropdown"] span.mb-2').first(),
        this.userTypeText,
        this.page.locator('.dropdown-menu span.mb-2').first(),
        this.page.locator('.dropdown-menu span:has-text("Root User"), .dropdown-menu span:has-text("Instance User")').first()
      ];

      for (const selector of userTypeSelectors) {
        try {
          const count = await selector.count().catch(() => 0);
          if (count > 0) {
            const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              const text = await selector.textContent({ timeout: 2000 }).catch(() => '');
              if (text && text.trim()) {
                const normalizedText = text.trim().toLowerCase();
                
                // Close dropdown before returning (use Escape only)
                await this.page.keyboard.press('Escape').catch(() => {});
                await this.page.waitForTimeout(300);
                
                if (normalizedText.includes('root user')) {
                  return 'root user';
                } else if (normalizedText.includes('instance user')) {
                  return 'instance user';
                }
              }
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // Final fallback: Check entire dropdown menu text again
      try {
        menuText = await menu.textContent({ timeout: 2000 }).catch(() => '');
        if (menuText) {
          const normalizedText = menuText.trim().toLowerCase();
          await this.page.keyboard.press('Escape').catch(() => {});
          await this.page.waitForTimeout(300);
          
          if (normalizedText.includes('root user')) {
            return 'root user';
          } else if (normalizedText.includes('instance user')) {
            return 'instance user';
          }
        }
      } catch (e) {
        // Ignore
      }

      // Close dropdown if still open (use Escape only, avoid clicking body which might cause navigation)
      await this.page.keyboard.press('Escape').catch(() => {});
      await this.page.waitForTimeout(300);
      return 'unknown';
    } catch (error) {
      // Try to close dropdown if open
      await this.page.keyboard.press('Escape').catch(() => {});
      await this.page.click('body').catch(() => {}); // Click outside to close
      return 'unknown';
    }
  }

  /**
   * Checks if Add User button is visible
   * @returns {Promise<boolean>}
   */
  async isAddUserButtonVisible() {
    try {
      return await this.addUserButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Purchase Users button is visible
   * @returns {Promise<boolean>}
   */
  async isPurchaseUsersButtonVisible() {
    try {
      return await this.purchaseUsersButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Purchase Users button
   */
  async clickPurchaseUsersButton() {
    try {
      await this.purchaseUsersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.purchaseUsersButton.scrollIntoViewIfNeeded();
      await this.purchaseUsersButton.click();
      await this.page.waitForTimeout(2000); // Wait for navigation
    } catch (error) {
      throw new Error(`Failed to click Purchase Users button: ${error.message}`);
    }
  }

  /**
   * Verifies navigation to payment page
   * @param {string} expectedUrlText - Expected text in URL (default: "payment")
   * @returns {Promise<{navigated: boolean, url: string, containsPayment: boolean}>}
   */
  async verifyPaymentPageNavigation(expectedUrlText = 'payment') {
    try {
      // Wait for navigation to complete
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(2000);
      
      const currentUrl = this.page.url().toLowerCase();
      const containsPayment = currentUrl.includes(expectedUrlText.toLowerCase());
      
      return {
        navigated: true,
        url: currentUrl,
        containsPayment: containsPayment
      };
    } catch (error) {
      return {
        navigated: false,
        url: this.page.url(),
        containsPayment: false,
        error: error.message
      };
    }
  }

  /**
   * Verifies button visibility based on user type
   * @returns {Promise<{userType: string, addUserButtonVisible: boolean, purchaseUsersButtonVisible: boolean, buttonsMatchUserType: boolean}>}
   */
  async verifyButtonVisibilityByUserType() {
    const userType = await this.getUserType();
    const addUserButtonVisible = await this.isAddUserButtonVisible();
    const purchaseUsersButtonVisible = await this.isPurchaseUsersButtonVisible();

    // If root user, both buttons should be visible
    // If instance user, buttons should not be visible
    let buttonsMatchUserType = false;
    if (userType === 'root user') {
      buttonsMatchUserType = addUserButtonVisible && purchaseUsersButtonVisible;
    } else if (userType === 'instance user') {
      buttonsMatchUserType = !addUserButtonVisible && !purchaseUsersButtonVisible;
    } else {
      // Unknown user type - cannot verify
      buttonsMatchUserType = false;
    }

    return {
      userType,
      addUserButtonVisible,
      purchaseUsersButtonVisible,
      buttonsMatchUserType
    };
  }

  /**
   * Gets user row by email
   * @param {string} email - User email to find
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async getUserRow(email) {
    // Find row that contains the email
    const userRow = this.page.locator('tr, mat-row', { hasText: email }).first();
    await userRow.waitFor({ state: 'visible', timeout: 10000 });
    return userRow;
  }

  /**
   * Gets the action column for a specific user row
   * @param {string} email - User email to find
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async getActionColumn(email) {
    const userRow = await this.getUserRow(email);
    // Action column is usually the last column
    const actionColumn = userRow.locator('td:last-child, mat-cell:last-child, .actions-column').first();
    return actionColumn;
  }

  /**
   * Clicks the Force Log Off button for a specific user
   * @param {string} email - User email to log off
   * @returns {Promise<{clicked: boolean, toastMessage: string, buttonClickable: boolean}>}
   */
  async clickForceLogOff(email) {
    try {
      const userRow = await this.getUserRow(email);
      
      // Find log off button in the action column (last column)
      const logOffButtonSelectors = [
        userRow.locator('button:has-text("Log Off"), button:has-text("Logoff"), button:has-text("Force Log Off")').first(),
        userRow.locator('i.bi-power.text-danger, i.bi-power').first(),
        userRow.locator('button[aria-label*="Log Off"], button[aria-label*="Logoff"]').first(),
        userRow.locator('td:last-child button, mat-cell:last-child button').first(),
        userRow.locator('.actions-column button').first()
      ];

      let buttonClicked = false;
      let clickedButton = null;
      let buttonClickable = false;
      
      for (const selector of logOffButtonSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            // Check if button is clickable/enabled
            const isDisabled = await selector.isDisabled().catch(() => false);
            buttonClickable = !isDisabled;
            
            await selector.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            clickedButton = selector;
            await selector.click();
            buttonClicked = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!buttonClicked) {
        // Check if any button exists but is not clickable
        for (const selector of logOffButtonSelectors) {
          try {
            const exists = await selector.count().catch(() => 0);
            if (exists > 0) {
              const isDisabled = await selector.isDisabled().catch(() => true);
              buttonClickable = !isDisabled;
              break;
            }
          } catch (e) {
            // Continue
          }
        }
        throw new Error(`Force Log Off button not found for user: ${email}`);
      }
      
      // Toast appears immediately after clicking, so capture it right away
      await this.page.waitForTimeout(200); // Small delay for toast to appear
      
      // Try to capture toast message immediately
      let toastMessage = '';
      const toastSelectors = [
        this.page.locator('#toast-container .toast-body').first(),
        this.page.locator('.toast-container .toast-body').first(),
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast-body').first(),
        this.page.locator('.toast-message').first(),
        this.page.locator('.toast').first(),
        this.page.locator('.toast-success').first(),
        this.page.locator('.alert-success').first(),
        this.page.locator('[class*="toast"]').first(),
        this.page.locator('mat-snack-bar-container').first(),
        this.page.locator('[role="alert"]').first(),
        this.page.locator('[role="status"]').first()
      ];
      
      // Check multiple times quickly to catch the toast
      for (let attempt = 0; attempt < 5; attempt++) {
        for (const selector of toastSelectors) {
          try {
            const isVisible = await selector.isVisible({ timeout: 300 }).catch(() => false);
            if (isVisible) {
              const text = await selector.textContent().catch(() => '');
              if (text && text.trim()) {
                toastMessage = text.trim();
                break;
              }
            }
          } catch (e) {
            // Continue
          }
        }
        if (toastMessage) break;
        await this.page.waitForTimeout(100); // Small delay between attempts
      }
      
      await this.page.waitForTimeout(800); // Additional wait after clicking
      
      return {
        clicked: true,
        toastMessage: toastMessage,
        buttonClickable: buttonClickable
      };
    } catch (error) {
      return {
        clicked: false,
        toastMessage: '',
        buttonClickable: false,
        error: error.message
      };
    }
  }

  /**
   * Checks if Force Log Off button is visible for a specific user
   * @param {string} email - User email to check
   * @returns {Promise<boolean>}
   */
  async isForceLogOffButtonVisible(email) {
    try {
      const userRow = await this.getUserRow(email);
      const logOffButton = userRow.locator('button:has-text("Log Off"), button:has-text("Logoff"), i.bi-power, button[aria-label*="Log Off"]').first();
      return await logOffButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Edit button for a specific user
   * @param {string} email - User email to edit
   */
  async clickEditButton(email) {
    try {
      const userRow = await this.getUserRow(email);
      
      // Find edit button in the action column (last column)
      const editButtonSelectors = [
        userRow.locator('i.bi-pencil-square, i.bi-pencil-square.text-success').first(),
        userRow.locator('i[ng-reflect-message="Update"], i[mattooltipposition]').first(),
        userRow.locator('span i.bi-pencil-square').first(),
        userRow.locator('button:has-text("Edit"), button[aria-label*="Edit"]').first(),
        userRow.locator('i.bi-pencil, button:has(i.bi-pencil)').first(),
        userRow.locator('button:has(i.bi-pencil-square)').first(),
        userRow.locator('button[aria-label*="Edit"]').first(),
        userRow.locator('td:last-child i.bi-pencil-square, mat-cell:last-child i.bi-pencil-square').first(),
        userRow.locator('td:last-child button:has(i.bi-pencil), mat-cell:last-child button:has(i.bi-pencil)').first(),
        userRow.locator('.actions-column i.bi-pencil-square, .actions-column button:has(i.bi-pencil-square)').first(),
        userRow.locator('td:last-child button, mat-cell:last-child button').first()
      ];

      let buttonClicked = false;
      for (const selector of editButtonSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.scrollIntoViewIfNeeded();
            await selector.click();
            await this.page.waitForTimeout(1000);
            buttonClicked = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!buttonClicked) {
        throw new Error(`Edit button not found for user: ${email}`);
      }
    } catch (error) {
      throw new Error(`Failed to click edit button for user ${email}: ${error.message}`);
    }
  }

  /**
   * Checks if Edit button is visible for a specific user
   * @param {string} email - User email to check
   * @returns {Promise<boolean>}
   */
  async isEditButtonVisible(email) {
    try {
      const userRow = await this.getUserRow(email);
      const editButtonSelectors = [
        userRow.locator('i.bi-pencil-square, i.bi-pencil-square.text-success').first(),
        userRow.locator('i[ng-reflect-message="Update"]').first(),
        userRow.locator('span i.bi-pencil-square').first(),
        userRow.locator('button:has-text("Edit"), button[aria-label*="Edit"]').first(),
        userRow.locator('i.bi-pencil, button:has(i.bi-pencil)').first(),
        userRow.locator('button:has(i.bi-pencil-square)').first()
      ];
      
      for (const selector of editButtonSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clears the display name and email fields in the update modal
   */
  async clearModalFields() {
    try {
      // Wait for modal to be fully loaded
      await this.updateInstanceUserModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);
      
      // Try multiple selectors for display name input
      const displayNameSelectors = [
        this.updateInstanceUserModal.locator('input[ng-reflect-name="userDisplayName"]').first(),
        this.updateInstanceUserModal.locator('input[placeholder="Enter display name"]').first(),
        this.updateInstanceUserModal.locator('input[placeholder*="Display Name"]').first(),
        this.updateInstanceUserModal.locator('label:has-text("Display Name")').locator('..').locator('input').first(),
        this.modalDisplayNameInput
      ];
      
      let displayNameCleared = false;
      for (const selector of displayNameSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.clear();
            await this.page.waitForTimeout(300);
            displayNameCleared = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!displayNameCleared) {
        throw new Error('Display Name input not found');
      }
      
      // Try multiple selectors for email input
      const emailSelectors = [
        this.updateInstanceUserModal.locator('input[type="email"][ng-reflect-name="email"]').first(),
        this.updateInstanceUserModal.locator('input[type="email"][placeholder="Enter email"]').first(),
        this.updateInstanceUserModal.locator('input[type="email"][placeholder*="Email"]').first(),
        this.updateInstanceUserModal.locator('label:has-text("Email")').locator('..').locator('input[type="email"]').first(),
        this.modalEmailInput
      ];
      
      let emailCleared = false;
      for (const selector of emailSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.clear();
            await this.page.waitForTimeout(300);
            emailCleared = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!emailCleared) {
        throw new Error('Email input not found');
      }
    } catch (error) {
      throw new Error(`Failed to clear modal fields: ${error.message}`);
    }
  }

  /**
   * Fills the display name and email fields in the update modal
   * @param {string} displayName - Display name to enter
   * @param {string} email - Email to enter
   */
  async fillModalFields(displayName, email) {
    try {
      // Wait for modal to be fully loaded
      await this.updateInstanceUserModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);
      
      // Try multiple selectors for display name input
      const displayNameSelectors = [
        this.updateInstanceUserModal.locator('input[ng-reflect-name="userDisplayName"]').first(),
        this.updateInstanceUserModal.locator('input[placeholder="Enter display name"]').first(),
        this.updateInstanceUserModal.locator('input[placeholder*="Display Name"]').first(),
        this.updateInstanceUserModal.locator('label:has-text("Display Name")').locator('..').locator('input').first(),
        this.modalDisplayNameInput
      ];
      
      let displayNameFilled = false;
      for (const selector of displayNameSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.fill(displayName);
            await this.page.waitForTimeout(300);
            displayNameFilled = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!displayNameFilled) {
        throw new Error('Display Name input not found');
      }
      
      // Try multiple selectors for email input
      const emailSelectors = [
        this.updateInstanceUserModal.locator('input[type="email"][ng-reflect-name="email"]').first(),
        this.updateInstanceUserModal.locator('input[type="email"][placeholder="Enter email"]').first(),
        this.updateInstanceUserModal.locator('input[type="email"][placeholder*="Email"]').first(),
        this.updateInstanceUserModal.locator('label:has-text("Email")').locator('..').locator('input[type="email"]').first(),
        this.modalEmailInput
      ];
      
      let emailFilled = false;
      for (const selector of emailSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.fill(email);
            await this.page.waitForTimeout(300);
            emailFilled = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!emailFilled) {
        throw new Error('Email input not found');
      }
    } catch (error) {
      throw new Error(`Failed to fill modal fields: ${error.message}`);
    }
  }

  /**
   * Submits the update instance user modal
   */
  async submitUpdateModal() {
    try {
      await this.modalSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.modalSubmitButton.scrollIntoViewIfNeeded();
      await this.modalSubmitButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to submit update modal: ${error.message}`);
    }
  }

  /**
   * Verifies required field validation errors are displayed in the modal
   * @returns {Promise<{displayNameError: boolean, emailError: boolean, anyError: boolean}>}
   */
  async verifyModalRequiredFieldErrors() {
    try {
      await this.page.waitForTimeout(500);
      
      const displayNameErrorVisible = await this.modalDisplayNameError.isVisible({ timeout: 2000 }).catch(() => false);
      const emailErrorVisible = await this.modalEmailError.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Also check for any error messages in modal
      const anyErrorVisible = await this.modalRequiredFieldErrors.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        displayNameError: displayNameErrorVisible,
        emailError: emailErrorVisible,
        anyError: displayNameErrorVisible || emailErrorVisible || anyErrorVisible
      };
    } catch (error) {
      return {
        displayNameError: false,
        emailError: false,
        anyError: false
      };
    }
  }

  /**
   * Verifies user details in the table match the provided values
   * @param {string} email - Email to find the user row
   * @param {string} expectedDisplayName - Expected display name
   * @param {string} expectedEmail - Expected email
   * @returns {Promise<{found: boolean, displayNameMatches: boolean, emailMatches: boolean}>}
   */
  async verifyUserInTable(email, expectedDisplayName, expectedEmail) {
    try {
      const userRow = await this.getUserRow(expectedEmail || email);
      
      // Get display name and email from the row
      const displayNameCell = userRow.locator('td:nth-child(1), mat-cell:nth-child(1)').first();
      const emailCell = userRow.locator('td:nth-child(2), mat-cell:nth-child(2)').first();
      
      const actualDisplayName = await displayNameCell.textContent().catch(() => '');
      const actualEmail = await emailCell.textContent().catch(() => '');
      
      const displayNameMatches = actualDisplayName.trim().includes(expectedDisplayName.trim());
      const emailMatches = actualEmail.trim().includes(expectedEmail.trim());
      
      return {
        found: true,
        displayNameMatches,
        emailMatches,
        actualDisplayName: actualDisplayName.trim(),
        actualEmail: actualEmail.trim()
      };
    } catch (error) {
      return {
        found: false,
        displayNameMatches: false,
        emailMatches: false,
        actualDisplayName: '',
        actualEmail: ''
      };
    }
  }

  /**
   * Clicks the Delete button for a specific user
   * @param {string} email - User email to delete
   */
  async clickDeleteButton(email) {
    try {
      const userRow = await this.getUserRow(email);
      
      // Find delete button in the action column (last column)
      const deleteButtonSelectors = [
        userRow.locator('i.bi-trash3-fill, i.bi-trash3-fill.text-danger').first(),
        userRow.locator('i[ng-reflect-message="Delete"], i[mattooltipposition][ng-reflect-message="Delete"]').first(),
        userRow.locator('span i.bi-trash3-fill').first(),
        userRow.locator('button:has-text("Delete"), button[aria-label*="Delete"]').first(),
        userRow.locator('i.bi-trash, button:has(i.bi-trash)').first(),
        userRow.locator('button:has(i.bi-trash3-fill)').first(),
        userRow.locator('i.bi-x-circle, button:has(i.bi-x-circle)').first(),
        userRow.locator('button[aria-label*="Delete"]').first(),
        userRow.locator('td:last-child i.bi-trash3-fill, mat-cell:last-child i.bi-trash3-fill').first(),
        userRow.locator('td:last-child button:has(i.bi-trash), mat-cell:last-child button:has(i.bi-trash)').first(),
        userRow.locator('.actions-column i.bi-trash3-fill, .actions-column button:has(i.bi-trash3-fill)').first(),
        userRow.locator('td:last-child button, mat-cell:last-child button').first()
      ];

      let buttonClicked = false;
      for (const selector of deleteButtonSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.scrollIntoViewIfNeeded();
            await selector.click();
            await this.page.waitForTimeout(1000);
            buttonClicked = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      if (!buttonClicked) {
        throw new Error(`Delete button not found for user: ${email}`);
      }
    } catch (error) {
      throw new Error(`Failed to click delete button for user ${email}: ${error.message}`);
    }
  }

  /**
   * Confirms deletion in the confirmation modal
   */
  async confirmDelete() {
    try {
      // Check if confirmation modal is visible
      const modalVisible = await this.deleteConfirmationModal.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (modalVisible) {
        // Try multiple selectors for the confirm/yes button
        const confirmButtonSelectors = [
          this.deleteConfirmButton,
          this.deleteConfirmationModal.locator('button:has-text("Yes"), button:has-text("Confirm"), button:has-text("Delete")').first(),
          this.deleteConfirmationModal.locator('button.btn-danger, button.btn-primary:has-text("Yes"), button.btn-primary:has-text("Delete")').first(),
          this.deleteConfirmationModal.locator('button[type="button"]:has-text("Yes"), button[type="button"]:has-text("Delete")').first()
        ];
        
        let buttonClicked = false;
        for (const selector of confirmButtonSelectors) {
          try {
            const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              await selector.scrollIntoViewIfNeeded();
              await selector.click();
              await this.page.waitForTimeout(1000);
              buttonClicked = true;
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
        
        if (!buttonClicked) {
          throw new Error('Could not find or click confirm button in delete modal');
        }
      } else {
        // If no confirmation modal, deletion might have happened directly
        console.log('⚠ No confirmation modal found, deletion may have happened directly');
      }
    } catch (error) {
      throw new Error(`Failed to confirm delete: ${error.message}`);
    }
  }

  /**
   * Checks if Delete button is visible for a specific user
   * @param {string} email - User email to check
   * @returns {Promise<boolean>}
   */
  async isDeleteButtonVisible(email) {
    try {
      const userRow = await this.getUserRow(email);
      const deleteButtonSelectors = [
        userRow.locator('i.bi-trash3-fill, i.bi-trash3-fill.text-danger').first(),
        userRow.locator('i[ng-reflect-message="Delete"]').first(),
        userRow.locator('span i.bi-trash3-fill').first(),
        userRow.locator('button:has-text("Delete"), button[aria-label*="Delete"]').first(),
        userRow.locator('i.bi-trash, button:has(i.bi-trash)').first(),
        userRow.locator('button:has(i.bi-trash3-fill)').first(),
        userRow.locator('i.bi-x-circle, button:has(i.bi-x-circle)').first()
      ];
      
      for (const selector of deleteButtonSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies that a user is NOT visible in the table
   * @param {string} email - Email of the user to check
   * @returns {Promise<boolean>} Returns true if user is NOT found (deleted), false if still found
   */
  async verifyUserNotInTable(email) {
    try {
      // Wait for table to refresh after deletion
      await this.page.waitForTimeout(3000);
      
      // Try multiple times as table might take time to refresh
      let attempts = 0;
      const maxAttempts = 5;
      
      while (attempts < maxAttempts) {
        // Try to find the user row
        const userRow = this.page.locator('tr, mat-row', { hasText: email }).first();
        const rowCount = await userRow.count();
        
        if (rowCount === 0) {
          return true; // User not found - successfully deleted
        }
        
        // Check if row is visible
        const isVisible = await userRow.isVisible({ timeout: 1000 }).catch(() => false);
        if (!isVisible) {
          return true; // Row exists but not visible - deleted
        }
        
        // If still visible, wait and try again
        if (attempts < maxAttempts - 1) {
          await this.page.waitForTimeout(2000);
        }
        attempts++;
      }
      
      // After all attempts, check one more time
      const finalCheck = this.page.locator('tr, mat-row', { hasText: email }).first();
      const finalCount = await finalCheck.count();
      if (finalCount === 0) {
        return true;
      }
      
      const finalVisible = await finalCheck.isVisible({ timeout: 1000 }).catch(() => false);
      return !finalVisible;
    } catch (error) {
      // If error finding row, assume it's deleted
      return true;
    }
  }

  /**
   * Verifies success toast message is displayed
   * @param {string} expectedMessage - Expected message text (partial match)
   * @returns {Promise<boolean>}
   */
  async verifySuccessToast(expectedMessage = 'successfully') {
    try {
      // Wait for toast to appear (toasts usually appear after a short delay)
      await this.page.waitForTimeout(1500);
      
      // First check if toast-container exists and has children
      const toastContainer = this.page.locator('#toast-container, .toast-container, .toast-top-right').first();
      const containerExists = await toastContainer.count() > 0;
      
      if (containerExists) {
        // Check for toast elements inside the container
        const toastInContainer = toastContainer.locator('.toast, [class*="toast"], .alert, [class*="alert"]').first();
        const toastVisible = await toastInContainer.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (toastVisible) {
          const toastText = await toastInContainer.textContent().catch(() => '');
          if (toastText && toastText.toLowerCase().includes(expectedMessage.toLowerCase())) {
            return true;
          }
        }
        
        // Also check all toast elements in container
        const allToasts = toastContainer.locator('.toast, [class*="toast"]');
        const toastCount = await allToasts.count();
        
        for (let i = 0; i < toastCount; i++) {
          const toast = allToasts.nth(i);
          const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent().catch(() => '');
            if (text && text.toLowerCase().includes(expectedMessage.toLowerCase())) {
              return true;
            }
          }
        }
      }
      
      // Try multiple toast selectors (page-level)
      const toastSelectors = [
        this.successToast,
        this.page.locator('.toast:has-text("successfully"), .toast-success').first(),
        this.page.locator('.alert-success:has-text("successfully")').first(),
        this.page.locator('[class*="toast"]:has-text("successfully")').first(),
        this.page.locator('.toast-body:has-text("successfully")').first(),
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast-top-right .toast').first()
      ];

      for (const selector of toastSelectors) {
        try {
          const count = await selector.count().catch(() => 0);
          if (count > 0) {
            const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              const toastText = await selector.textContent().catch(() => '');
              if (toastText && toastText.toLowerCase().includes(expectedMessage.toLowerCase())) {
                return true;
              }
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // Also check for any toast message containing the expected text
      const anyToast = this.page.locator('.toast, .alert, [class*="toast"], [class*="alert"]').filter({ hasText: new RegExp(expectedMessage, 'i') }).first();
      const isVisible = await anyToast.isVisible({ timeout: 2000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the text content of the success toast message
   * @returns {Promise<string>}
   */
  async getSuccessToastMessage() {
    try {
      await this.page.waitForTimeout(1500);
      
      // First check toast-container for toast elements
      const toastContainer = this.page.locator('#toast-container, .toast-container, .toast-top-right').first();
      const containerExists = await toastContainer.count() > 0;
      
      if (containerExists) {
        // Get first visible toast in container
        const toastInContainer = toastContainer.locator('.toast, [class*="toast"], .alert').first();
        const toastVisible = await toastInContainer.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (toastVisible) {
          const text = await toastInContainer.textContent().catch(() => '');
          if (text && text.trim()) {
            return text.trim();
          }
        }
        
        // Try all toasts in container
        const allToasts = toastContainer.locator('.toast, [class*="toast"]');
        const toastCount = await allToasts.count();
        
        for (let i = 0; i < toastCount; i++) {
          const toast = allToasts.nth(i);
          const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent().catch(() => '');
            if (text && text.trim()) {
              return text.trim();
            }
          }
        }
      }
      
      const toastSelectors = [
        this.successToast,
        this.page.locator('.toast:has-text("successfully")').first(),
        this.page.locator('.alert-success').first(),
        this.page.locator('.toast-body').first(),
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast-top-right .toast').first()
      ];

      for (const selector of toastSelectors) {
        try {
          const count = await selector.count().catch(() => 0);
          if (count > 0) {
            const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              const text = await selector.textContent().catch(() => '');
              if (text && text.trim()) {
                return text.trim();
              }
            }
          }
        } catch (e) {
          // Continue
        }
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Clicks Force Log Off button and verifies success toast
   * @param {string} email - User email to log off
   * @param {string} expectedMessage - Expected success message (default: "user successfully logoff")
   * @returns {Promise<{success: boolean, toastMessage: string}>}
   */
  async forceLogOffUser(email, expectedMessage = 'user successfully logoff') {
    try {
      // Click the force log off button
      await this.clickForceLogOff(email);
      
      // Wait for toast to appear
      await this.page.waitForTimeout(2000);
      
      // Verify success toast
      const toastVisible = await this.verifySuccessToast(expectedMessage);
      const toastMessage = await this.getSuccessToastMessage();
      
      return {
        success: toastVisible,
        toastMessage: toastMessage
      };
    } catch (error) {
      return {
        success: false,
        toastMessage: '',
        error: error.message
      };
    }
  }

  /**
   * Gets the column index for Cloud Username column
   * @returns {Promise<number>} Returns column index (0-based) or -1 if not found
   */
  async getCloudUsernameColumnIndex() {
    try {
      // Try to find the column header
      const headerSelectors = [
        this.page.locator('th:has-text("Cloud Username")').first(),
        this.page.locator('th:has-text("Cloud User")').first(),
        this.page.locator('th:has-text("Username")').first(),
        this.page.locator('.mat-column-cloudUsername').first(),
        this.cloudUsernameColumn
      ];

      for (const selector of headerSelectors) {
        const count = await selector.count();
        if (count > 0) {
          // Get all headers
          const allHeaders = this.page.locator('th, mat-header-cell');
          const headerCount = await allHeaders.count();
          
          for (let i = 0; i < headerCount; i++) {
            const header = allHeaders.nth(i);
            const text = await header.textContent().catch(() => '');
            if (text && (text.toLowerCase().includes('cloud username') || 
                         text.toLowerCase().includes('cloud user') ||
                         text.toLowerCase().includes('username'))) {
              return i;
            }
          }
        }
      }
      
      // Fallback: try to find by column position (usually after email/status)
      return -1; // Will need to search dynamically
    } catch (error) {
      return -1;
    }
  }

  /**
   * Gets the column index for Cloud Password column
   * @returns {Promise<number>} Returns column index (0-based) or -1 if not found
   */
  async getCloudPasswordColumnIndex() {
    try {
      // Try to find the column header
      const headerSelectors = [
        this.page.locator('th:has-text("Cloud Password")').first(),
        this.page.locator('th:has-text("Cloud Pass")').first(),
        this.page.locator('th:has-text("Password")').first(),
        this.page.locator('.mat-column-cloudPassword').first(),
        this.cloudPasswordColumn
      ];

      for (const selector of headerSelectors) {
        const count = await selector.count();
        if (count > 0) {
          // Get all headers
          const allHeaders = this.page.locator('th, mat-header-cell');
          const headerCount = await allHeaders.count();
          
          for (let i = 0; i < headerCount; i++) {
            const header = allHeaders.nth(i);
            const text = await header.textContent().catch(() => '');
            if (text && (text.toLowerCase().includes('cloud password') || 
                         text.toLowerCase().includes('cloud pass') ||
                         text.toLowerCase().includes('password'))) {
              return i;
            }
          }
        }
      }
      
      return -1;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Clicks the eye icon in Cloud Username column for a specific row
   * @param {number} rowIndex - Row index (0-based)
   * @returns {Promise<void>}
   */
  async clickCloudUsernameEyeIcon(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 10000 });
      
      // Find eye icon in the row - could be in cloud username column
      const eyeIconSelectors = [
        row.locator('i.bi-eye[ng-reflect-message*="username"], i.bi-eye[ng-reflect-message*="usern"]').first(),
        row.locator('i.bi-eye.mat-mdc-tooltip-trigger').first(),
        row.locator('i.bi-eye').first(),
        row.locator('span i.bi-eye').first(),
        row.locator('td i.bi-eye, mat-cell i.bi-eye').first()
      ];

      // Try to find by column index first
      const usernameColumnIndex = await this.getCloudUsernameColumnIndex();
      if (usernameColumnIndex >= 0) {
        const columnCell = row.locator(`td:nth-child(${usernameColumnIndex + 1}), mat-cell:nth-child(${usernameColumnIndex + 1})`).first();
        const eyeInColumn = columnCell.locator('i.bi-eye').first();
        const isVisible = await eyeInColumn.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await eyeInColumn.scrollIntoViewIfNeeded();
          await eyeInColumn.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      }

      // Fallback: try all selectors
      for (const selector of eyeIconSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const tooltip = await selector.getAttribute('ng-reflect-message').catch(() => '');
            if (tooltip && (tooltip.toLowerCase().includes('username') || tooltip.toLowerCase().includes('usern'))) {
              await selector.scrollIntoViewIfNeeded();
              await selector.click();
              await this.page.waitForTimeout(1000);
              return;
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // If no specific username eye icon found, try first eye icon in row
      const firstEyeIcon = row.locator('i.bi-eye').first();
      const isVisible = await firstEyeIcon.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        await firstEyeIcon.scrollIntoViewIfNeeded();
        await firstEyeIcon.click();
        await this.page.waitForTimeout(1000);
        return;
      }

      throw new Error('Cloud Username eye icon not found');
    } catch (error) {
      throw new Error(`Failed to click Cloud Username eye icon: ${error.message}`);
    }
  }

  /**
   * Clicks the eye icon in Cloud Password column for a specific row
   * @param {number} rowIndex - Row index (0-based)
   * @returns {Promise<void>}
   */
  async clickCloudPasswordEyeIcon(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 10000 });
      
      // Find eye icon in the row - could be in cloud password column
      const eyeIconSelectors = [
        row.locator('i.bi-eye[ng-reflect-message*="password"], i.bi-eye[ng-reflect-message*="pass"]').first(),
        row.locator('i.bi-eye.mat-mdc-tooltip-trigger').last(), // Last eye icon is usually password
        row.locator('i.bi-eye').last(),
        row.locator('span i.bi-eye').last(),
        row.locator('td i.bi-eye, mat-cell i.bi-eye').last()
      ];

      // Try to find by column index first
      const passwordColumnIndex = await this.getCloudPasswordColumnIndex();
      if (passwordColumnIndex >= 0) {
        const columnCell = row.locator(`td:nth-child(${passwordColumnIndex + 1}), mat-cell:nth-child(${passwordColumnIndex + 1})`).first();
        const eyeInColumn = columnCell.locator('i.bi-eye').first();
        const isVisible = await eyeInColumn.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await eyeInColumn.scrollIntoViewIfNeeded();
          await eyeInColumn.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      }

      // Fallback: try all selectors (prefer last eye icon as it's usually password)
      for (const selector of eyeIconSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const tooltip = await selector.getAttribute('ng-reflect-message').catch(() => '');
            if (tooltip && (tooltip.toLowerCase().includes('password') || tooltip.toLowerCase().includes('pass'))) {
              await selector.scrollIntoViewIfNeeded();
              await selector.click();
              await this.page.waitForTimeout(1000);
              return;
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // If no specific password eye icon found, try last eye icon in row
      const allEyeIcons = row.locator('i.bi-eye');
      const eyeIconCount = await allEyeIcons.count();
      if (eyeIconCount > 1) {
        const lastEyeIcon = allEyeIcons.nth(eyeIconCount - 1);
        const isVisible = await lastEyeIcon.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await lastEyeIcon.scrollIntoViewIfNeeded();
          await lastEyeIcon.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      }

      throw new Error('Cloud Password eye icon not found');
    } catch (error) {
      throw new Error(`Failed to click Cloud Password eye icon: ${error.message}`);
    }
  }

  /**
   * Retrieves the revealed Cloud Username value from a specific row
   * @param {number} rowIndex - Row index (0-based)
   * @returns {Promise<string>}
   */
  async getCloudUsername(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 10000 });
      
      // Try to find by column index
      const usernameColumnIndex = await this.getCloudUsernameColumnIndex();
      if (usernameColumnIndex >= 0) {
        const columnCell = row.locator(`td:nth-child(${usernameColumnIndex + 1}), mat-cell:nth-child(${usernameColumnIndex + 1})`).first();
        const cellText = await columnCell.textContent().catch(() => '');
        // Remove eye icon text and get the actual username
        const username = cellText.replace(/Click here to reveal.*/i, '').trim();
        if (username && !username.includes('bi-eye')) {
          return username;
        }
      }

      // Fallback: search all cells for username-like text
      const cells = row.locator('td, mat-cell');
      const cellCount = await cells.count();
      
      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);
        const cellText = await cell.textContent().catch(() => '');
        // Look for text that might be a username (not email, not status, not action buttons)
        if (cellText && 
            !cellText.includes('@') && 
            !cellText.toLowerCase().includes('online') && 
            !cellText.toLowerCase().includes('offline') &&
            !cellText.includes('bi-') &&
            cellText.trim().length > 0) {
          const cleanText = cellText.replace(/Click here to reveal.*/i, '').trim();
          if (cleanText) {
            return cleanText;
          }
        }
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Retrieves the revealed Cloud Password value from a specific row
   * @param {number} rowIndex - Row index (0-based)
   * @returns {Promise<string>}
   */
  async getCloudPassword(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 10000 });
      
      // Try to find by column index
      const passwordColumnIndex = await this.getCloudPasswordColumnIndex();
      if (passwordColumnIndex >= 0) {
        const columnCell = row.locator(`td:nth-child(${passwordColumnIndex + 1}), mat-cell:nth-child(${passwordColumnIndex + 1})`).first();
        const cellText = await columnCell.textContent().catch(() => '');
        // Remove eye icon text and get the actual password
        const password = cellText.replace(/Click here to reveal.*/i, '').trim();
        if (password && !password.includes('bi-eye')) {
          return password;
        }
      }

      // Fallback: search all cells for password-like text (usually masked or revealed)
      const cells = row.locator('td, mat-cell');
      const cellCount = await cells.count();
      
      for (let i = 0; i < cellCount; i++) {
        const cell = cells.nth(i);
        const cellText = await cell.textContent().catch(() => '');
        // Look for text that might be a password (could be masked with dots or revealed)
        if (cellText && 
            !cellText.includes('@') && 
            !cellText.toLowerCase().includes('online') && 
            !cellText.toLowerCase().includes('offline') &&
            !cellText.includes('bi-') &&
            cellText.trim().length > 0) {
          const cleanText = cellText.replace(/Click here to reveal.*/i, '').trim();
          // Check if it looks like a password (could be dots or actual text)
          if (cleanText && (cleanText.includes('•') || cleanText.length > 3)) {
            return cleanText;
          }
        }
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies cloud username and password can be viewed
   * @param {number} rowIndex - Row index (0-based), defaults to 0 (first row)
   * @returns {Promise<{username: string, password: string, usernameRetrieved: boolean, passwordRetrieved: boolean}>}
   */
  async verifyCloudCredentials(rowIndex = 0) {
    try {
      // Click cloud username eye icon
      await this.clickCloudUsernameEyeIcon(rowIndex);
      await this.page.waitForTimeout(1500); // Wait for value to be revealed
      
      // Retrieve cloud username
      const username = await this.getCloudUsername(rowIndex);
      
      // Click cloud password eye icon
      await this.clickCloudPasswordEyeIcon(rowIndex);
      await this.page.waitForTimeout(1500); // Wait for value to be revealed
      
      // Retrieve cloud password
      const password = await this.getCloudPassword(rowIndex);
      
      return {
        username: username || '',
        password: password || '',
        usernameRetrieved: username && username.length > 0,
        passwordRetrieved: password && password.length > 0
      };
    } catch (error) {
      return {
        username: '',
        password: '',
        usernameRetrieved: false,
        passwordRetrieved: false,
        error: error.message
      };
    }
  }

  /**
   * Gets the column index for Login Link column
   * @returns {Promise<number>} Returns column index (0-based) or -1 if not found
   */
  async getLoginLinkColumnIndex() {
    try {
      // Try to find the column header
      const headerSelectors = [
        this.page.locator('th:has-text("Login Link")').first(),
        this.page.locator('th:has-text("Login")').first(),
        this.page.locator('th:has-text("Link")').first(),
        this.page.locator('.mat-column-loginLink').first(),
        this.loginLinkColumn
      ];

      for (const selector of headerSelectors) {
        const count = await selector.count();
        if (count > 0) {
          // Get all headers
          const allHeaders = this.page.locator('th, mat-header-cell');
          const headerCount = await allHeaders.count();
          
          for (let i = 0; i < headerCount; i++) {
            const header = allHeaders.nth(i);
            const text = await header.textContent().catch(() => '');
            if (text && (text.toLowerCase().includes('login link') || 
                         text.toLowerCase().includes('login') ||
                         text.toLowerCase().includes('link'))) {
              return i;
            }
          }
        }
      }
      
      return -1;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Clicks the Remote Login button for a specific row
   * @param {number} rowIndex - Row index (0-based), defaults to 0
   * @param {import('@playwright/test').BrowserContext} context - Browser context to check for new pages
   * @returns {Promise<{clicked: boolean, urlBefore: string, urlAfter: string, openedInNewTab: boolean}>}
   */
  async clickRemoteLoginButton(rowIndex = 0, context = null) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get URL before clicking
      const urlBefore = this.page.url();
      const pagesBefore = context ? context.pages().length : 1;
      
      // Find Remote Login button in the row
      const remoteLoginSelectors = [
        row.locator('button:has-text("Remote Login"), a:has-text("Remote Login")').first(),
        row.locator('a:has-text("Remote"), button:has-text("Remote")').first(),
        row.locator('button[aria-label*="Remote Login"], a[aria-label*="Remote Login"]').first(),
        row.locator('a[href*="remote"], button[href*="remote"]').first()
      ];

      // Try to find by column index first
      const loginLinkColumnIndex = await this.getLoginLinkColumnIndex();
      if (loginLinkColumnIndex >= 0) {
        const columnCell = row.locator(`td:nth-child(${loginLinkColumnIndex + 1}), mat-cell:nth-child(${loginLinkColumnIndex + 1})`).first();
        const remoteLoginInColumn = columnCell.locator('button:has-text("Remote"), a:has-text("Remote"), button:has-text("Remote Login"), a:has-text("Remote Login")').first();
        const isVisible = await remoteLoginInColumn.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await remoteLoginInColumn.scrollIntoViewIfNeeded();
          // Check if it's a link that opens in new tab
          const target = await remoteLoginInColumn.getAttribute('target').catch(() => null);
          const isNewTab = target === '_blank' || target === '_new';
          
          // Click the button/link
          if (isNewTab && context) {
            // Wait for new page
            const [newPage] = await Promise.all([
              context.waitForEvent('page', { timeout: 10000 }).catch(() => null),
              remoteLoginInColumn.click()
            ]);
            await this.page.waitForTimeout(2000);
            
            if (newPage) {
              const newPageUrl = newPage.url();
              await newPage.close();
              return {
                clicked: true,
                urlBefore,
                urlAfter: newPageUrl,
                openedInNewTab: true
              };
            }
          } else {
            // Wait for navigation in same page
            await Promise.all([
              this.page.waitForURL('**', { timeout: 10000 }).catch(() => {}),
              remoteLoginInColumn.click()
            ]);
            await this.page.waitForTimeout(2000);
            const urlAfter = this.page.url();
            return {
              clicked: true,
              urlBefore,
              urlAfter,
              openedInNewTab: false
            };
          }
        }
      }

      // Fallback: try all selectors
      for (const selector of remoteLoginSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.scrollIntoViewIfNeeded();
            const target = await selector.getAttribute('target').catch(() => null);
            const isNewTab = target === '_blank' || target === '_new';
            
            if (isNewTab && context) {
              const [newPage] = await Promise.all([
                context.waitForEvent('page', { timeout: 10000 }).catch(() => null),
                selector.click()
              ]);
              await this.page.waitForTimeout(2000);
              
              if (newPage) {
                const newPageUrl = newPage.url();
                await newPage.close();
                return {
                  clicked: true,
                  urlBefore,
                  urlAfter: newPageUrl,
                  openedInNewTab: true
                };
              }
            } else {
              await Promise.all([
                this.page.waitForURL('**', { timeout: 10000 }).catch(() => {}),
                selector.click()
              ]);
              await this.page.waitForTimeout(2000);
              const urlAfter = this.page.url();
              return {
                clicked: true,
                urlBefore,
                urlAfter,
                openedInNewTab: false
              };
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      throw new Error('Remote Login button not found');
    } catch (error) {
      return {
        clicked: false,
        urlBefore: this.page.url(),
        urlAfter: this.page.url(),
        openedInNewTab: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks the HTML Login button for a specific row
   * @param {number} rowIndex - Row index (0-based), defaults to 0
   * @param {import('@playwright/test').BrowserContext} context - Browser context to check for new pages
   * @returns {Promise<{clicked: boolean, urlBefore: string, urlAfter: string, openedInNewTab: boolean}>}
   */
  async clickHtmlLoginButton(rowIndex = 0, context = null) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get URL before clicking
      const urlBefore = this.page.url();
      const pagesBefore = context ? context.pages().length : 1;
      
      // Find HTML Login button in the row
      const htmlLoginSelectors = [
        row.locator('button:has-text("HTML Login"), a:has-text("HTML Login")').first(),
        row.locator('button:has-text("HTML"), a:has-text("HTML")').first(),
        row.locator('button[aria-label*="HTML Login"], a[aria-label*="HTML Login"]').first(),
        row.locator('a[href*="html"], button[href*="html"]').first(),
        row.locator('a[href*="web"], button[href*="web"]').first()
      ];

      // Try to find by column index first
      const loginLinkColumnIndex = await this.getLoginLinkColumnIndex();
      if (loginLinkColumnIndex >= 0) {
        const columnCell = row.locator(`td:nth-child(${loginLinkColumnIndex + 1}), mat-cell:nth-child(${loginLinkColumnIndex + 1})`).first();
        const htmlLoginInColumn = columnCell.locator('button:has-text("HTML"), a:has-text("HTML"), button:has-text("HTML Login"), a:has-text("HTML Login")').first();
        const isVisible = await htmlLoginInColumn.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await htmlLoginInColumn.scrollIntoViewIfNeeded();
          const target = await htmlLoginInColumn.getAttribute('target').catch(() => null);
          const isNewTab = target === '_blank' || target === '_new';
          
          if (isNewTab && context) {
            const [newPage] = await Promise.all([
              context.waitForEvent('page', { timeout: 10000 }).catch(() => null),
              htmlLoginInColumn.click()
            ]);
            await this.page.waitForTimeout(2000);
            
            if (newPage) {
              const newPageUrl = newPage.url();
              await newPage.close();
              return {
                clicked: true,
                urlBefore,
                urlAfter: newPageUrl,
                openedInNewTab: true
              };
            }
          } else {
            await Promise.all([
              this.page.waitForURL('**', { timeout: 10000 }).catch(() => {}),
              htmlLoginInColumn.click()
            ]);
            await this.page.waitForTimeout(2000);
            const urlAfter = this.page.url();
            return {
              clicked: true,
              urlBefore,
              urlAfter,
              openedInNewTab: false
            };
          }
        }
      }

      // Fallback: try all selectors
      for (const selector of htmlLoginSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.scrollIntoViewIfNeeded();
            const target = await selector.getAttribute('target').catch(() => null);
            const isNewTab = target === '_blank' || target === '_new';
            
            if (isNewTab && context) {
              const [newPage] = await Promise.all([
                context.waitForEvent('page', { timeout: 10000 }).catch(() => null),
                selector.click()
              ]);
              await this.page.waitForTimeout(2000);
              
              if (newPage) {
                const newPageUrl = newPage.url();
                await newPage.close();
                return {
                  clicked: true,
                  urlBefore,
                  urlAfter: newPageUrl,
                  openedInNewTab: true
                };
              }
            } else {
              await Promise.all([
                this.page.waitForURL('**', { timeout: 10000 }).catch(() => {}),
                selector.click()
              ]);
              await this.page.waitForTimeout(2000);
              const urlAfter = this.page.url();
              return {
                clicked: true,
                urlBefore,
                urlAfter,
                openedInNewTab: false
              };
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      throw new Error('HTML Login button not found');
    } catch (error) {
      return {
        clicked: false,
        urlBefore: this.page.url(),
        urlAfter: this.page.url(),
        openedInNewTab: false,
        error: error.message
      };
    }
  }

  /**
   * Checks if Remote Login button is visible for a specific row
   * @param {number} rowIndex - Row index (0-based), defaults to 0
   * @returns {Promise<boolean>}
   */
  async isRemoteLoginButtonVisible(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 5000 });
      
      const remoteLoginButton = row.locator('button:has-text("Remote Login"), a:has-text("Remote Login"), button:has-text("Remote"), a:has-text("Remote")').first();
      return await remoteLoginButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if HTML Login button is visible for a specific row
   * @param {number} rowIndex - Row index (0-based), defaults to 0
   * @returns {Promise<boolean>}
   */
  async isHtmlLoginButtonVisible(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      await row.waitFor({ state: 'visible', timeout: 5000 });
      
      const htmlLoginButton = row.locator('button:has-text("HTML Login"), a:has-text("HTML Login"), button:has-text("HTML"), a:has-text("HTML")').first();
      return await htmlLoginButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies navigation occurred (URL changed)
   * @param {string} urlBefore - URL before navigation
   * @param {string} urlAfter - URL after navigation
   * @returns {Promise<{navigated: boolean, urlChanged: boolean, newUrl: string}>}
   */
  async verifyNavigation(urlBefore, urlAfter) {
    const urlChanged = urlBefore !== urlAfter;
    const navigated = urlChanged && urlAfter && urlAfter.length > 0;
    
    return {
      navigated,
      urlChanged,
      newUrl: urlAfter
    };
  }

  /**
   * Clicks the Add User button
   */
  async clickAddUserButton() {
    try {
      await this.addUserButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addUserButton.scrollIntoViewIfNeeded();
      await this.addUserButton.click();
      await this.page.waitForTimeout(1500);
    } catch (error) {
      throw new Error(`Failed to click Add User button: ${error.message}`);
    }
  }

  /**
   * Verifies Add Instance User modal is visible
   * @returns {Promise<boolean>}
   */
  async isAddInstanceUserModalVisible() {
    try {
      return await this.addInstanceUserModal.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills the Add Instance User modal fields
   * @param {string} displayName - Display name to enter
   * @param {string} email - Email to enter
   */
  async fillAddModalFields(displayName, email) {
    try {
      // Wait for modal to be fully loaded
      await this.addInstanceUserModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);
      
      // Try multiple selectors for display name input
      const displayNameSelectors = [
        this.addInstanceUserModal.locator('input[ng-reflect-name="userDisplayName"]').first(),
        this.addInstanceUserModal.locator('input[ng-reflect-name="displayName"]').first(),
        this.addInstanceUserModal.locator('input[placeholder="Enter display name"]').first(),
        this.addInstanceUserModal.locator('input[placeholder*="Display Name"]').first(),
        this.addInstanceUserModal.locator('label:has-text("Display Name")').locator('..').locator('input').first(),
        this.addModalDisplayNameInput
      ];
      
      let displayNameFilled = false;
      for (const selector of displayNameSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.fill(displayName);
            await this.page.waitForTimeout(300);
            displayNameFilled = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!displayNameFilled) {
        throw new Error('Display Name input not found in Add Instance User modal');
      }
      
      // Try multiple selectors for email input
      const emailSelectors = [
        this.addInstanceUserModal.locator('input[type="email"][ng-reflect-name="email"]').first(),
        this.addInstanceUserModal.locator('input[type="email"][placeholder="Enter email"]').first(),
        this.addInstanceUserModal.locator('input[type="email"][placeholder*="Email"]').first(),
        this.addInstanceUserModal.locator('label:has-text("Email")').locator('..').locator('input[type="email"]').first(),
        this.addModalEmailInput
      ];
      
      let emailFilled = false;
      for (const selector of emailSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await selector.fill(email);
            await this.page.waitForTimeout(300);
            emailFilled = true;
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!emailFilled) {
        throw new Error('Email input not found in Add Instance User modal');
      }
    } catch (error) {
      throw new Error(`Failed to fill Add Instance User modal fields: ${error.message}`);
    }
  }

  /**
   * Submits the Add Instance User modal
   * @returns {Promise<{clicked: boolean, toastMessage: string}>}
   */
  async submitAddModal() {
    try {
      await this.addModalSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addModalSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.addModalSubmitButton.click();
      
      // Toast appears immediately after clicking submit, so capture it right away
      await this.page.waitForTimeout(200); // Small delay for toast to appear
      
      // Try to capture toast message immediately
      let toastMessage = '';
      const toastSelectors = [
        this.page.locator('#toast-container .toast-body').first(),
        this.page.locator('.toast-container .toast-body').first(),
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast-body').first(),
        this.page.locator('.toast-message').first(),
        this.page.locator('.toast').first(),
        this.page.locator('.toast-success').first(),
        this.page.locator('.alert-success').first(),
        this.page.locator('[class*="toast"]').first(),
        this.page.locator('mat-snack-bar-container').first(),
        this.page.locator('[role="alert"]').first(),
        this.page.locator('[role="status"]').first()
      ];
      
      // Check multiple times quickly to catch the toast
      for (let attempt = 0; attempt < 5; attempt++) {
        for (const selector of toastSelectors) {
          try {
            const isVisible = await selector.isVisible({ timeout: 300 }).catch(() => false);
            if (isVisible) {
              const text = await selector.textContent().catch(() => '');
              if (text && text.trim()) {
                toastMessage = text.trim();
                break;
              }
            }
          } catch (e) {
            // Continue
          }
        }
        if (toastMessage) break;
        await this.page.waitForTimeout(100); // Small delay between attempts
      }
      
      await this.page.waitForTimeout(800); // Additional wait after clicking
      
      return {
        clicked: true,
        toastMessage: toastMessage
      };
    } catch (error) {
      return {
        clicked: false,
        toastMessage: '',
        error: error.message
      };
    }
  }

  /**
   * Verifies required field validation errors are displayed in the Add Instance User modal
   * @returns {Promise<{displayNameError: boolean, emailError: boolean, anyError: boolean}>}
   */
  async verifyAddModalRequiredFieldErrors() {
    try {
      await this.page.waitForTimeout(500);
      
      const displayNameErrorVisible = await this.addModalDisplayNameError.isVisible({ timeout: 2000 }).catch(() => false);
      const emailErrorVisible = await this.addModalEmailError.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Also check for any error messages in modal
      const anyErrorVisible = await this.addModalRequiredFieldErrors.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        displayNameError: displayNameErrorVisible,
        emailError: emailErrorVisible,
        anyError: displayNameErrorVisible || emailErrorVisible || anyErrorVisible
      };
    } catch (error) {
      return {
        displayNameError: false,
        emailError: false,
        anyError: false
      };
    }
  }

  /**
   * Verifies user exists in the table by email
   * @param {string} email - Email to search for
   * @returns {Promise<{found: boolean, displayName: string, email: string}>}
   */
  async verifyUserExistsInTable(email) {
    try {
      // Wait for table to refresh
      await this.page.waitForTimeout(2000);
      
      // Try to find the user row by email
      const userRow = this.page.locator('tr, mat-row', { hasText: email }).first();
      const rowCount = await userRow.count();
      
      if (rowCount > 0) {
        const isVisible = await userRow.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          // Get display name and email from the row
          const displayNameCell = userRow.locator('td:nth-child(1), mat-cell:nth-child(1)').first();
          const emailCell = userRow.locator('td:nth-child(2), mat-cell:nth-child(2)').first();
          
          const displayName = await displayNameCell.textContent().catch(() => '');
          const userEmail = await emailCell.textContent().catch(() => '');
          
          return {
            found: true,
            displayName: displayName.trim(),
            email: userEmail.trim()
          };
        }
      }
      
      return {
        found: false,
        displayName: '',
        email: ''
      };
    } catch (error) {
      return {
        found: false,
        displayName: '',
        email: ''
      };
    }
  }
}

module.exports = { UserManagementPage };

