class CloudUserPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Cloud User module entry
    this.cloudUserMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/cloud-user"], ' +
        'div.sidebar-items:has(span.title:has-text("Cloud User"))'
      )
      .first();

    // Cloud User page title
    this.cloudUserPageTitle = page
      .locator(
        'h1:has-text("Cloud User"), h2:has-text("Cloud User"), span.title:has-text("Cloud User"), *:has-text("Cloud User")'
      )
      .first();

    // Search panel locators
    this.searchToggle = page.locator('div.py-3.px-3:has(i.bi-search), div[data-bs-toggle="collapse"]:has(i.bi-search)').first();
    this.searchPanel = page.locator('#collapseExample');
    this.searchButton = page.locator('button.btn.search-btn:has-text("Search"), button.search-btn').first();
    this.resetButton = page.locator('button.btn.reset-btn:has-text("Reset"), button.reset-btn').first();
    
    // Search field locators
    this.subIdInput = page.locator('input#subCode[placeholder="Sub Id"], input[placeholder="Sub Id"], input[placeholder*="Sub Id" i], input#subCode, input[formcontrolname*="subCode" i], input[formcontrolname*="subId" i], input[name*="subCode" i], input[name*="subId" i]').first();
    this.adminEmailInput = page.locator('input#customerEmail, input[ng-reflect-name="customerEmail"], input[name="customerEmail"], input[formcontrolname="customerEmail"], input[placeholder*="Admin Email"], input[placeholder*="Admin"], input#adminEmail, input[formcontrolname*="adminEmail" i], input[name*="adminEmail" i]').first();
    this.cloudUserEmailInput = page.locator('input[placeholder*="Cloud User Email"], input[placeholder*="Instance User Email"], input#cloudUserEmail, input#instanceUserEmail, input[formcontrolname*="cloudUserEmail" i], input[formcontrolname*="instanceUserEmail" i], input[name*="cloudUserEmail" i], input[name*="instanceUserEmail" i]').first();
    
    // Table locators
    this.cloudUserTableRows = page.locator('tr.mat-mdc-row.mdc-data-table__row.cdk-row');

    // Toast container and messages
    this.toastContainer = page.locator('#toast-container');
    this.errorToast = page.locator(
      'div[role="alert"].toast-message, ' +
      'div.toast-message:has-text("Please fill in data"), ' +
      'div.toast-message:has-text("at least one")'
    ).first();

    // No data message
    this.noDataMessage = page
      .locator('div:has-text("To see the data, search on any field"), div:has-text("To see the data")')
      .first();

    // Header selection controls
    this.selectHeadersButton = page.locator('button.header-btn.btn.dropdown-toggle:has-text("Select Headers"), button.header-btn.dropdown-toggle:has-text("Select Headers")').first();
    this.headersDropdownMenu = page.locator('ul.dropdown-menu.dropdown-header-menu');
    
    // No columns selected message
    this.noColumnsSelectedMessage = page.locator('div:has-text("No columns selected. Please choose at least one header to display data."), div:has-text("No columns selected")').first();

    // User details page locators
    this.subDetailsSection = page.locator('div.sub-details, div[class*="sub-details"]');
    this.detailsHeader = page.locator('div.header-row:has-text("Details"), div.sub-details div.header-row, div:has-text("Details")').first();
    
    // Cloud user details table locators
    this.cloudUserDetailsTable = page.locator('table.mat-mdc-table');
    this.cloudUserDetailsRows = page.locator('table.mat-mdc-table tbody tr.mat-mdc-row');
    
    // Details page header selection locators
    this.detailsPageSelectHeadersButton = page.locator('button.header-btn.btn.dropdown-toggle:has-text("Select Headers"), button.header-btn.dropdown-toggle:has-text("Select Headers")').first();
    this.detailsPageHeadersDropdownMenu = page.locator('ul.dropdown-menu.dropdown-header-menu');
    this.detailsPageNoColumnsSelectedMessage = page.locator('div:has-text("No columns selected. Please choose at least one header to display data."), div:has-text("No columns selected")').first();
  }

  /**
   * Navigates to the Cloud User page from the dashboard.
   * Assumes user is already logged in and on the dashboard.
   */
  async navigateToCloudUser() {
    try {
      // Click on the Cloud User module in sidebar
      await this.cloudUserMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.cloudUserMenuItem.click();

      // Wait for navigation to complete
      await this.page.waitForLoadState('networkidle');
      
    } catch (error) {      
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Checks if the Cloud User page is visible.
   * @returns {Promise<boolean>}
   */
  async isCloudUserPageVisible() {
    try {
      await this.cloudUserPageTitle.waitFor({ state: 'visible', timeout: 5000 });
      return await this.cloudUserPageTitle.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the search panel if it's not already open.
   */
  async openSearchPanel() {
    // Check if panel is visible and has 'show' class (fully expanded)
    const visible = await this.searchPanel.isVisible().catch(() => false);
    const hasShowClass = await this.searchPanel.evaluate(el => el.classList.contains('show')).catch(() => false);
    
    if (!visible || !hasShowClass) {
      await this.searchToggle.waitFor({ state: 'visible', timeout: 5000 });
      await this.searchToggle.click();
      
      // Wait for panel to be visible
      await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
      
      // Wait for 'show' class to be added (panel fully expanded)
      let showClassAdded = false;
      for (let i = 0; i < 20; i++) {
        await this.page.waitForTimeout(200);
        const hasShow = await this.searchPanel.evaluate(el => el.classList.contains('show')).catch(() => false);
        if (hasShow) {
          showClassAdded = true;
          break;
        }
      }
      
      // Wait a bit more for form fields to be ready and rendered
      await this.page.waitForTimeout(500);
    } else {
      // Even if visible, wait a bit for fields to be ready
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Clicks the search button.
   */
  async clickSearch() {
    await this.openSearchPanel();
    await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.searchButton.click();
    // Wait for search to process
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if an error toast message is visible.
   * @returns {Promise<boolean>}
   */
  async isErrorToastVisible() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 });
      await this.errorToast.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorToast.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets the error toast message text.
   * @returns {Promise<string|null>}
   */
  async getErrorToastMessage() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 });
      await this.errorToast.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorToast.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Checks if any toast message is visible in the toast container.
   * @returns {Promise<boolean>}
   */
  async isAnyToastVisible() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 });
      const toastMessages = this.toastContainer.locator('div[role="alert"], div.toast-message');
      const count = await toastMessages.count();
      if (count > 0) {
        const firstToast = toastMessages.first();
        return await firstToast.isVisible();
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets any toast message text from the toast container.
   * @returns {Promise<string|null>}
   */
  async getAnyToastMessage() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 });
      const toastMessages = this.toastContainer.locator('div[role="alert"], div.toast-message');
      const count = await toastMessages.count();
      if (count > 0) {
        const firstToast = toastMessages.first();
        return await firstToast.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Checks if the "no data" message is visible.
   * @returns {Promise<boolean>}
   */
  async isNoDataMessageVisible() {
    try {
      await this.noDataMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.noDataMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets the "no data" message text.
   * @returns {Promise<string|null>}
   */
  async getNoDataMessage() {
    try {
      if (await this.isNoDataMessageVisible()) {
        return await this.noDataMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Fills in the Sub ID search field.
   * @param {string} subId - The subscription ID
   */
  async fillSubId(subId) {
    await this.openSearchPanel();
    
    // Ensure search panel is visible and expanded
    await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    // Try multiple locator strategies, scoped to search panel
    let inputFound = false;
    const locators = [
      '#collapseExample input#subCode[placeholder="Sub Id"]',
      '#collapseExample input[placeholder="Sub Id"]',
      '#collapseExample input[placeholder*="Sub Id" i]',
      '#collapseExample input#subCode',
      '#collapseExample input[formcontrolname*="subCode" i]',
      '#collapseExample input[formcontrolname*="subId" i]',
      '#collapseExample input[name*="subCode" i]',
      '#collapseExample input[name*="subId" i]',
      '#collapseExample input[type="text"]:first-of-type',
      '#collapseExample input:first-of-type',
      'input#subCode[placeholder="Sub Id"]',
      'input[placeholder="Sub Id"]',
      'input[placeholder*="Sub Id" i]',
      'input#subCode'
    ];
    
    for (const locatorStr of locators) {
      try {
        const input = this.page.locator(locatorStr).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await input.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(200);
          await input.fill(subId);
          inputFound = true;
          break;
        }
      } catch {
        continue;
      }
    }
    
    if (!inputFound) {
      // Fallback: try the original locator with longer timeout, scoped to search panel
      const fallbackInput = this.searchPanel.locator('input#subCode[placeholder="Sub Id"], input[placeholder="Sub Id"]').first();
      await fallbackInput.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await fallbackInput.fill(subId);
    }
  }

  /**
   * Fills in the Admin Email search field.
   * @param {string} adminEmail - The admin email address
   */
  async fillAdminEmail(adminEmail) {
    await this.openSearchPanel();
    
    // Ensure search panel is visible and expanded
    await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    // Try multiple locator strategies, scoped to search panel
    let inputFound = false;
    const locators = [
      '#collapseExample input#customerEmail',
      '#collapseExample input[ng-reflect-name="customerEmail"]',
      '#collapseExample input[name="customerEmail"]',
      '#collapseExample input[formcontrolname="customerEmail"]',
      '#collapseExample input[placeholder*="Admin Email"]',
      '#collapseExample input[placeholder*="Admin"]',
      '#collapseExample input#adminEmail',
      '#collapseExample input[formcontrolname*="adminEmail" i]',
      '#collapseExample input[name*="adminEmail" i]',
      '#collapseExample input[type="email"]',
      '#collapseExample input[type="text"]:nth-of-type(2)',
      'input#customerEmail',
      'input[ng-reflect-name="customerEmail"]',
      'input[name="customerEmail"]',
      'input[formcontrolname="customerEmail"]',
      'input[placeholder*="Admin Email"]',
      'input[placeholder*="Admin"]',
      'input#adminEmail',
      'input[formcontrolname*="adminEmail" i]',
      'input[name*="adminEmail" i]'
    ];
    
    for (const locatorStr of locators) {
      try {
        const input = this.page.locator(locatorStr).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await input.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(200);
          await input.fill(adminEmail);
          inputFound = true;
          break;
        }
      } catch {
        continue;
      }
    }
    
    if (!inputFound) {
      // Fallback: try the original locator with longer timeout, scoped to search panel
      const fallbackInput = this.searchPanel.locator('input#customerEmail, input[ng-reflect-name="customerEmail"], input[name="customerEmail"], input[formcontrolname="customerEmail"], input[placeholder*="Admin Email"], input[placeholder*="Admin"], input#adminEmail').first();
      await fallbackInput.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await fallbackInput.fill(adminEmail);
    }
  }

  /**
   * Fills in the Cloud User Email (Instance User Email) search field.
   * @param {string} cloudUserEmail - The cloud user email address
   */
  async fillCloudUserEmail(cloudUserEmail) {
    await this.openSearchPanel();
    
    // Ensure search panel is visible and expanded
    await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    // Try multiple locator strategies, scoped to search panel
    let inputFound = false;
    const locators = [
      '#collapseExample input[placeholder*="Cloud User Email"]',
      '#collapseExample input[placeholder*="Instance User Email"]',
      '#collapseExample input#cloudUserEmail',
      '#collapseExample input#instanceUserEmail',
      '#collapseExample input[formcontrolname*="cloudUserEmail" i]',
      '#collapseExample input[formcontrolname*="instanceUserEmail" i]',
      '#collapseExample input[name*="cloudUserEmail" i]',
      '#collapseExample input[name*="instanceUserEmail" i]',
      '#collapseExample input[type="email"]:last-of-type',
      '#collapseExample input[type="text"]:last-of-type',
      'input[placeholder*="Cloud User Email"]',
      'input[placeholder*="Instance User Email"]',
      'input#cloudUserEmail',
      'input#instanceUserEmail'
    ];
    
    for (const locatorStr of locators) {
      try {
        const input = this.page.locator(locatorStr).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await input.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(200);
          await input.fill(cloudUserEmail);
          inputFound = true;
          break;
        }
      } catch {
        continue;
      }
    }
    
    if (!inputFound) {
      // Fallback: try the original locator with longer timeout, scoped to search panel
      const fallbackInput = this.searchPanel.locator('input[placeholder*="Cloud User Email"], input[placeholder*="Instance User Email"], input#cloudUserEmail, input#instanceUserEmail').first();
      await fallbackInput.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await fallbackInput.fill(cloudUserEmail);
    }
  }

  /**
   * Gets the count of visible cloud user rows in the table.
   * @returns {Promise<number>}
   */
  async getVisibleRowCount() {
    try {
      await this.cloudUserTableRows.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      return await this.cloudUserTableRows.count();
    } catch {
      return 0;
    }
  }

  /**
   * Verifies that records are showing in the table.
   * @returns {Promise<boolean>}
   */
  async areRecordsShowing() {
    try {
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
      const rowCount = await this.getVisibleRowCount();
      const noDataVisible = await this.isNoDataMessageVisible().catch(() => false);
      return rowCount > 0 && !noDataVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies that a specific value appears in the table.
   * @param {string} searchValue - The value to search for in the table
   * @returns {Promise<boolean>}
   */
  async verifyValueInTable(searchValue) {
    try {
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      const rowWithValue = this.page.locator(`tr:has-text("${searchValue}")`).first();
      await rowWithValue.waitFor({ state: 'visible', timeout: 10000 });
      return await rowWithValue.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifies that a value appears in the Instance User Email column.
   * @param {string} email - The email to verify
   * @returns {Promise<boolean>}
   */
  async verifyInstanceUserEmailInTable(email) {
    try {
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      // Find row with the email in Instance User Email column
      const instanceUserEmailCell = this.page
        .locator('td.cdk-column-Instance-User-Email:has-text("' + email + '")')
        .first();
      await instanceUserEmailCell.waitFor({ state: 'visible', timeout: 10000 });
      return await instanceUserEmailCell.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Clicks the reset button to clear search fields.
   */
  async clickReset() {
    await this.openSearchPanel();
    await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.resetButton.click();
    // Wait for reset to process
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if all search fields are empty/cleared.
   * @returns {Promise<boolean>}
   */
  async areSearchFieldsEmpty() {
    try {
      await this.openSearchPanel();
      const subId = await this.subIdInput.inputValue().catch(() => '');
      const adminEmail = await this.adminEmailInput.inputValue().catch(() => '');
      const cloudUserEmail = await this.cloudUserEmailInput.inputValue().catch(() => '');

      return (
        subId.trim() === '' &&
        adminEmail.trim() === '' &&
        cloudUserEmail.trim() === ''
      );
    } catch {
      return false;
    }
  }

  /**
   * Opens the "Select Headers" dropdown.
   */
  async openSelectHeadersDropdown() {
    await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectHeadersButton.click();
    await this.headersDropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Closes the "Select Headers" dropdown by clicking outside.
   */
  async closeSelectHeadersDropdown() {
    await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
  }

  /**
   * Returns a locator for a header checkbox inside the Select Headers dropdown.
   * @param {string} headerLabel - The visible label text of the header (e.g. "Sub Id")
   * @returns {import('@playwright/test').Locator}
   */
  getHeaderCheckbox(headerLabel) {
    return this.headersDropdownMenu
      .locator('li label')
      .filter({ has: this.page.locator('span.ms-2', { hasText: headerLabel }) })
      .locator('input[type="checkbox"]');
  }

  /**
   * Sets a given header checkbox to checked/unchecked state.
   * @param {string} headerLabel
   * @param {boolean} shouldBeChecked
   */
  async setHeaderCheckboxState(headerLabel, shouldBeChecked) {
    const checkbox = this.getHeaderCheckbox(headerLabel);
    await checkbox.waitFor({ state: 'visible', timeout: 5000 });
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (shouldBeChecked !== isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Unselects all headers in the Select Headers dropdown.
   */
  async unselectAllHeaders() {
    const allHeaders = [
      'Sub Id',
      'Status',
      'Stage',
      'Admin Email',
      'Customer Company Name',
      'Number Of Users',
      'Instance Username',
      'Instance User Email',
      'Instance Password',
      'Partner Company',
      'Partner Email',
      'Plan Name',
      'Start Date',
      'Next Billing Date',
      'Last Billing Date',
    ];
    await this.openSelectHeadersDropdown();
    for (const label of allHeaders) {
      await this.setHeaderCheckboxState(label, false);
    }
    await this.closeSelectHeadersDropdown();
  }

  /**
   * Selects all headers in the Select Headers dropdown.
   */
  async selectAllHeaders() {
    const allHeaders = [
      'Sub Id',
      'Status',
      'Stage',
      'Admin Email',
      'Customer Company Name',
      'Number Of Users',
      'Instance Username',
      'Instance User Email',
      'Instance Password',
      'Partner Company',
      'Partner Email',
      'Plan Name',
      'Start Date',
      'Next Billing Date',
      'Last Billing Date',
    ];
    await this.openSelectHeadersDropdown();
    for (const label of allHeaders) {
      await this.setHeaderCheckboxState(label, true);
    }
    await this.closeSelectHeadersDropdown();
  }

  /**
   * Returns the visible column header texts from the cloud user table.
   * @returns {Promise<string[]>}
   */
  async getVisibleHeaderTexts() {
    const headers = await this.page
      .locator('thead tr[role="row"] th[role="columnheader"]')
      .allTextContents();
    return headers.map((h) => h.trim()).filter((h) => h !== '');
  }

  /**
   * Checks whether a specific column header is visible in the table.
   * @param {string} headerText
   * @returns {Promise<boolean>}
   */
  async isHeaderVisible(headerText) {
    const headers = await this.getVisibleHeaderTexts();
    return headers.some((h) => h.toLowerCase().includes(headerText.toLowerCase()));
  }

  /**
   * Checks if the "No columns selected" message is visible.
   * @returns {Promise<boolean>}
   */
  async isNoColumnsSelectedMessageVisible() {
    try {
      await this.noColumnsSelectedMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.noColumnsSelectedMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets the "No columns selected" message text.
   * @returns {Promise<string|null>}
   */
  async getNoColumnsSelectedMessage() {
    try {
      if (await this.isNoColumnsSelectedMessageVisible()) {
        return await this.noColumnsSelectedMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Clicks on the Sub ID in the first row of the cloud user table.
   * @returns {Promise<string>} - Returns the Sub ID that was clicked
   */
  async clickFirstSubId() {
    try {
      // Find the first row
      const firstRow = this.cloudUserTableRows.first();
      await firstRow.waitFor({ state: 'visible', timeout: 10000 });
      
      // Find Sub ID cell - try multiple strategies
      let subIdCell = null;
      let subId = '';
      
      // Strategy 1: Try to find by column class (cdk-column-Sub-Id or similar)
      try {
        subIdCell = firstRow.locator('td.cdk-column-Sub-Id, td[class*="Sub-Id"], td[class*="SubId"], td[class*="sub-id"]').first();
        await subIdCell.waitFor({ state: 'visible', timeout: 3000 });
      } catch {
        // Strategy 2: Try to find span with Sub ID pattern
        try {
          subIdCell = firstRow.locator('td:has(span:has-text("SUB-")), td:has(span:has-text("123")), span:has-text("SUB-")').first();
          await subIdCell.waitFor({ state: 'visible', timeout: 3000 });
        } catch {
          // Strategy 3: Find any cell with Sub ID text (case insensitive)
          try {
            subIdCell = firstRow.locator('td').filter({ hasText: /SUB-|123/i }).first();
            await subIdCell.waitFor({ state: 'visible', timeout: 3000 });
          } catch {
            // Strategy 4: Get all cells and find one with Sub ID pattern
            const allCells = firstRow.locator('td');
            const cellCount = await allCells.count();
            for (let i = 0; i < cellCount; i++) {
              const cell = allCells.nth(i);
              const text = await cell.textContent();
              if (text && (text.includes('SUB-') || text.includes('123'))) {
                subIdCell = cell;
                break;
              }
            }
          }
        }
      }
      
      if (!subIdCell) {
        throw new Error('Could not find Sub ID cell');
      }
      
      // Get the Sub ID text before clicking
      const subIdText = await subIdCell.textContent();
      subId = subIdText ? subIdText.trim() : '';
      
      // Click on the Sub ID (try clicking the span if it exists, otherwise the cell)
      try {
        const subIdSpan = subIdCell.locator('span').first();
        const spanCount = await subIdSpan.count();
        if (spanCount > 0) {
          await subIdSpan.click({ timeout: 5000 });
        } else {
          await subIdCell.click({ timeout: 5000 });
        }
      } catch {
        // Fallback: try clicking with force
        await subIdCell.click({ force: true, timeout: 5000 });
      }
      
      // Wait for navigation to details page
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      return subId;
    } catch (error) {
      throw new Error(`Failed to click Sub ID: ${error.message}`);
    }
  }

  /**
   * Waits for the user details page to load.
   */
  async waitForUserDetailsPage() {
    try {
      // Wait for network to be idle
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      // Wait for any of the detail indicators
      await Promise.race([
        this.page.locator('div.main-details:has(div.title-key:has-text("Sub Id"))').first().waitFor({ state: 'visible', timeout: 10000 }),
        this.page.locator('div.sub-details').first().waitFor({ state: 'visible', timeout: 10000 }),
        this.page.locator('div:has-text("Sub Id")').first().waitFor({ state: 'visible', timeout: 10000 }),
      ]).catch(() => {});
    } catch {
      // Continue even if wait fails
    }
  }

  /**
   * Verifies that the user details page is loaded.
   * @returns {Promise<boolean>}
   */
  async isUserDetailsPageLoaded() {
    try {
      // Wait for page to load
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      // Strategy 1: Check for "Sub Id" detail row (most reliable indicator)
      try {
        const subIdDetail = this.page.locator('div.main-details:has(div.title-key:has-text("Sub Id")), div:has-text("Sub Id")').first();
        await subIdDetail.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await subIdDetail.isVisible();
        if (isVisible) {
          return true;
        }
      } catch {}
      
      // Strategy 2: Check for sub-details section
      try {
        const subDetails = this.page.locator('div.sub-details, div[class*="sub-details"]').first();
        await subDetails.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await subDetails.isVisible();
        if (isVisible) {
          // Also check if it has content
          const hasContent = await subDetails.locator('div.main-details').count() > 0;
          if (hasContent) {
            return true;
          }
        }
      } catch {}
      
      // Strategy 3: Check for "Details" header
      try {
        const detailsHeader = this.page.locator('div.header-row:has-text("Details"), div.sub-details div.header-row').first();
        await detailsHeader.waitFor({ state: 'visible', timeout: 5000 });
        if (await detailsHeader.isVisible()) {
          return true;
        }
      } catch {}
      
      // Strategy 4: Check for multiple detail rows (Status, Admin Email, etc.)
      try {
        const statusDetail = this.page.locator('div.main-details:has(div.title-key:has-text("Status"))').first();
        await statusDetail.waitFor({ state: 'visible', timeout: 5000 });
        if (await statusDetail.isVisible()) {
          return true;
        }
      } catch {}
      
      // Strategy 5: Check if URL changed (navigated to details page)
      const currentUrl = this.page.url();
      if (currentUrl.includes('/details') || currentUrl.includes('/subscription') || currentUrl.includes('/user')) {
        // Also verify we have some detail content
        const hasDetails = await this.page.locator('div.main-details').count() > 0;
        if (hasDetails) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error checking if user details page is loaded:', error);
      return false;
    }
  }

  /**
   * Gets a user detail value by its key (e.g., "Sub Id", "Status", "Admin Email").
   * @param {string} detailKey - The detail key (e.g., "Sub Id", "Status")
   * @returns {Promise<string|null>}
   */
  async getUserDetailValue(detailKey) {
    try {
      // Wait for page to load
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to find the detail row
      let detailRow = null;
      
      // Strategy 1: Find in sub-details section
      try {
        const subDetails = this.page.locator('div.sub-details').first();
        await subDetails.waitFor({ state: 'visible', timeout: 5000 });
        detailRow = subDetails.locator(`div.main-details:has(div.title-key:has-text("${detailKey}"))`).first();
        await detailRow.waitFor({ state: 'visible', timeout: 3000 });
      } catch {
        // Strategy 2: Find anywhere on page
        try {
          detailRow = this.page.locator(`div.main-details:has(div.title-key:has-text("${detailKey}"))`).first();
          await detailRow.waitFor({ state: 'visible', timeout: 5000 });
        } catch {
          // Strategy 3: Find by partial text match
          detailRow = this.page.locator(`div.main-details:has-text("${detailKey}")`).first();
          await detailRow.waitFor({ state: 'visible', timeout: 5000 });
        }
      }
      
      if (!detailRow) {
        return null;
      }
      
      // Get the value from the second div (col-md-6) or any div after title-key
      let valueDiv = null;
      try {
        valueDiv = detailRow.locator('div.col-md-6').nth(1);
        await valueDiv.waitFor({ state: 'visible', timeout: 2000 });
      } catch {
        // Try to find any div that's not the title-key
        try {
          valueDiv = detailRow.locator('div').filter({ hasNot: this.page.locator('div.title-key') }).first();
          await valueDiv.waitFor({ state: 'visible', timeout: 2000 });
        } catch {
          // Get all divs and take the last one (usually the value)
          const allDivs = detailRow.locator('div');
          const count = await allDivs.count();
          if (count > 1) {
            valueDiv = allDivs.nth(count - 1);
          }
        }
      }
      
      if (valueDiv) {
        const value = await valueDiv.textContent();
        return value ? value.trim() : null;
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting user detail value for "${detailKey}":`, error);
      return null;
    }
  }

  /**
   * Gets all user details as an object.
   * @returns {Promise<Object>}
   */
  async getAllUserDetails() {
    const details = {};
    const detailKeys = [
      'Sub Id',
      'Status',
      'Stage',
      'Admin Email',
      'Customer Company Name',
      'Number Of Users',
      'Partner Company',
      'Partner Email',
      'Start Date',
      'Next Billing Date',
      'Last Billing Date',
    ];
    
    for (const key of detailKeys) {
      const value = await this.getUserDetailValue(key);
      if (value) {
        details[key] = value;
      }
    }
    
    return details;
  }

  /**
   * Gets cloud user details from the first row of the cloud user details table.
   * @returns {Promise<Object>} - Object with Cloud User Email Id, Cloud User Name, and Status
   */
  async getCloudUserDetailsFromTable() {
    try {
      await this.cloudUserDetailsTable.waitFor({ state: 'visible', timeout: 10000 });
      const firstRow = this.cloudUserDetailsRows.first();
      await firstRow.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get Cloud User Email Id (second column)
      const emailIdCell = firstRow.locator('td.cdk-column-Cloud-User-Email-Id').first();
      const emailId = await emailIdCell.textContent();
      
      // Get Cloud User Name (third column)
      const userNameCell = firstRow.locator('td.cdk-column-Cloud-User-Name').first();
      const userName = await userNameCell.textContent();
      
      // Get Status (fourth column)
      const statusCell = firstRow.locator('td.cdk-column-Status').first();
      const status = await statusCell.textContent();
      
      return {
        'Cloud User Email Id': emailId ? emailId.trim() : '',
        'Cloud User Name': userName ? userName.trim() : '',
        'Status': status ? status.trim() : '',
      };
    } catch {
      return {
        'Cloud User Email Id': '',
        'Cloud User Name': '',
        'Status': '',
      };
    }
  }

  /**
   * Verifies that cloud user details match the expected values.
   * @param {string} expectedEmailId - Expected Cloud User Email Id
   * @param {string} expectedUserName - Expected Cloud User Name
   * @param {string} expectedStatus - Expected Status
   * @returns {Promise<boolean>}
   */
  async verifyCloudUserDetails(expectedEmailId, expectedUserName, expectedStatus) {
    try {
      const cloudUserDetails = await this.getCloudUserDetailsFromTable();
      
      const emailIdMatch = cloudUserDetails['Cloud User Email Id'].toLowerCase().includes(expectedEmailId.toLowerCase());
      const userNameMatch = cloudUserDetails['Cloud User Name'].toLowerCase().includes(expectedUserName.toLowerCase());
      const statusMatch = cloudUserDetails['Status'].toLowerCase().includes(expectedStatus.toLowerCase());
      
      return emailIdMatch && userNameMatch && statusMatch;
    } catch {
      return false;
    }
  }

  /**
   * Opens the "Select Headers" dropdown on the details page.
   */
  async openDetailsPageSelectHeadersDropdown() {
    await this.detailsPageSelectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.detailsPageSelectHeadersButton.click();
    await this.detailsPageHeadersDropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Closes the "Select Headers" dropdown on the details page by clicking outside.
   */
  async closeDetailsPageSelectHeadersDropdown() {
    await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
  }

  /**
   * Returns a locator for a header checkbox inside the details page Select Headers dropdown.
   * @param {string} headerLabel - The visible label text of the header (e.g. "Cloud User Email Id")
   * @returns {import('@playwright/test').Locator}
   */
  getDetailsPageHeaderCheckbox(headerLabel) {
    return this.detailsPageHeadersDropdownMenu
      .locator('li label')
      .filter({ has: this.page.locator('span.ms-2', { hasText: headerLabel }) })
      .locator('input[type="checkbox"]');
  }

  /**
   * Sets a given header checkbox to checked/unchecked state on the details page.
   * @param {string} headerLabel
   * @param {boolean} shouldBeChecked
   */
  async setDetailsPageHeaderCheckboxState(headerLabel, shouldBeChecked) {
    const checkbox = this.getDetailsPageHeaderCheckbox(headerLabel);
    await checkbox.waitFor({ state: 'visible', timeout: 5000 });
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (shouldBeChecked !== isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Unselects all headers in the details page Select Headers dropdown.
   */
  async unselectAllDetailsPageHeaders() {
    const allHeaders = [
      'Cloud User Email Id',
      'Cloud User Name',
      'Status',
    ];
    await this.openDetailsPageSelectHeadersDropdown();
    for (const label of allHeaders) {
      await this.setDetailsPageHeaderCheckboxState(label, false);
    }
    await this.closeDetailsPageSelectHeadersDropdown();
  }

  /**
   * Selects all headers in the details page Select Headers dropdown.
   */
  async selectAllDetailsPageHeaders() {
    const allHeaders = [
      'Cloud User Email Id',
      'Cloud User Name',
      'Status',
    ];
    await this.openDetailsPageSelectHeadersDropdown();
    for (const label of allHeaders) {
      await this.setDetailsPageHeaderCheckboxState(label, true);
    }
    await this.closeDetailsPageSelectHeadersDropdown();
  }

  /**
   * Returns the visible column header texts from the cloud user details table.
   * @returns {Promise<string[]>}
   */
  async getDetailsPageVisibleHeaderTexts() {
    try {
      await this.cloudUserDetailsTable.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      const headers = await this.page
        .locator('table.mat-mdc-table thead tr[role="row"] th[role="columnheader"]')
        .allTextContents();
      return headers.map((h) => h.trim()).filter((h) => h !== '');
    } catch {
      return [];
    }
  }

  /**
   * Checks whether a specific column header is visible in the details page table.
   * @param {string} headerText
   * @returns {Promise<boolean>}
   */
  async isDetailsPageHeaderVisible(headerText) {
    const headers = await this.getDetailsPageVisibleHeaderTexts();
    return headers.some((h) => h.toLowerCase().includes(headerText.toLowerCase()));
  }

  /**
   * Checks if the "No columns selected" message is visible on the details page.
   * @returns {Promise<boolean>}
   */
  async isDetailsPageNoColumnsSelectedMessageVisible() {
    try {
      await this.detailsPageNoColumnsSelectedMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.detailsPageNoColumnsSelectedMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets the "No columns selected" message text on the details page.
   * @returns {Promise<string|null>}
   */
  async getDetailsPageNoColumnsSelectedMessage() {
    try {
      if (await this.isDetailsPageNoColumnsSelectedMessageVisible()) {
        return await this.detailsPageNoColumnsSelectedMessage.textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Gets the count of visible rows in the cloud user details table.
   * @returns {Promise<number>}
   */
  async getDetailsPageVisibleRowCount() {
    try {
      await this.cloudUserDetailsRows.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      return await this.cloudUserDetailsRows.count();
    } catch {
      return 0;
    }
  }
}

module.exports = { CloudUserPage };

