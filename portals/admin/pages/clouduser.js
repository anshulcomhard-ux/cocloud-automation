class CloudUserPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/cloud-user" class="nav-link sidebar-items">
    this.cloudUserLink = page.locator('div.nav-link.sidebar-items[routerlink="/cloud-user"], div.nav-link.sidebar-items:has-text("Cloud User"), a[routerlink="/cloud-user"], .sidebar-items:has-text("Cloud User")').first();
    
    // Page elements
    this.pageWrapper = page.locator('app-root, app-cloud-user, [class*="cloud-user"]').first();
    this.pageTitle = page.locator('h1:has-text("Cloud User"), h2:has-text("Cloud User"), *:has-text("Cloud User")').first();
    
    // Table locators
    this.cloudUserTable = page.locator('mat-table, table.table, table').first();
    this.tableRows = page.locator('mat-table mat-row, table tbody tr').first();
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th').first();
    
    // No data message
    // HTML: <p class="error-msg">Too see the data search on any field !</p>
    this.noDataMessage = page.locator('p.error-msg:has-text("Too see the data search on any field"), p.error-msg, *:has-text("Too see the data search on any field"), *:has-text("Too see the data search")').first();
    
    // Search form locators
    // HTML: <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3">
    this.searchHereButton = page.locator('div.search-box div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"], div.py-3:has-text("Search Here")').first();
    // Alternative: click on the span directly
    this.searchHereSpan = page.locator('span.ms-5:has-text("Search Here"), span:has-text("Search Here")').first();
    // HTML: <div id="collapseExample" class="collapse">
    this.searchForm = page.locator('#collapseExample.collapse, #collapseExample.collapse.show, .search-field-area').first();
    
    // Search field locators - using exact IDs from HTML
    // HTML: <input id="subCode" ng-reflect-name="subCode" placeholder="Sub Id">
    this.subIdSearchField = page.locator('input#subCode[ng-reflect-name="subCode"], input#subCode[placeholder="Sub Id"], input#subCode').first();
    // HTML: <input id="customerEmail" ng-reflect-name="customerEmail" placeholder="Admin User Email">
    this.adminUserEmailSearchField = page.locator('input#customerEmail[ng-reflect-name="customerEmail"], input#customerEmail[placeholder="Admin User Email"], input#customerEmail').first();
    // HTML: <input id="cloudUserEmail" ng-reflect-name="cloudUserEmail" placeholder="Cloud User Email">
    this.cloudUserEmailSearchField = page.locator('input#cloudUserEmail[ng-reflect-name="cloudUserEmail"], input#cloudUserEmail[placeholder="Cloud User Email"], input#cloudUserEmail').first();
    // HTML: <input id="cloudUserName" ng-reflect-name="cloudUserName" placeholder="Cloud User Name">
    this.cloudUserNameSearchField = page.locator('input#cloudUserName[ng-reflect-name="cloudUserName"], input#cloudUserName[placeholder="Cloud User Name"], input#cloudUserName').first();
    
    // Search and Reset buttons
    // HTML: <button type="submit" class="btn search-btn">Search</button>
    this.searchButton = page.locator('button.btn.search-btn[type="submit"], button.search-btn:has-text("Search"), button:has-text("Search")').first();
    // HTML: <button type="button" class="btn reset-btn">Reset</button>
    this.resetButton = page.locator('button.btn.reset-btn[type="button"], button.reset-btn:has-text("Reset"), button:has-text("Reset")').first();
    
    // Table cell locators for data extraction
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.subIdCells = page.locator('td.mat-column-Sub-ID, td:has-text("SUB-"), td:has-text("123")');
    this.adminUserEmailCells = page.locator('td.mat-column-Admin-User-Email, td.mat-column-Customer-Email, td:has-text("@")');
    this.cloudUserEmailCells = page.locator('td.mat-column-Cloud-User-Email, td:has-text("@")');
    this.cloudUserNameCells = page.locator('td.mat-column-Cloud-User-Name, td.mat-column-Name');
    
    // Validation error locators
    this.validationError = page.locator('.error-message, .invalid-feedback, .text-danger, .error-msg').first();
  }

  /**
   * Navigates to the Cloud User page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoCloudUser(baseUrl) {
    // Navigate to cloud user page
    await this.cloudUserLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.cloudUserLink.scrollIntoViewIfNeeded();
    await this.cloudUserLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Wait for cloud user page to load
    await this.cloudUserTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Cloud User page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnCloudUserPage = url.includes('/cloud-user');
      const isTableVisible = await this.cloudUserTable.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnCloudUserPage && isTableVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Cloud User table is visible with data
   * @returns {Promise<{visible: boolean, hasData: boolean, rowCount: number}>}
   */
  async verifyTableWithData() {
    try {
      const isTableVisible = await this.cloudUserTable.isVisible({ timeout: 5000 }).catch(() => false);
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      
      return {
        visible: isTableVisible,
        hasData: hasData,
        rowCount: rowCount
      };
    } catch {
      return {
        visible: false,
        hasData: false,
        rowCount: 0
      };
    }
  }

  // ==================== SEARCH METHODS ====================

  /**
   * Clicks the "Search Here" button to open search panel
   */
  async clickSearchHere() {
    try {
      // Check if form is already open by checking if any input field is visible
      const isFormVisible = await this.subIdSearchField.isVisible({ timeout: 1000 }).catch(() => false);
      if (isFormVisible) {
        return; // Already open
      }
      
      // Wait for button to be ready
      await this.searchHereButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchHereButton.scrollIntoViewIfNeeded();
      
      // Try clicking the div first
      let clickWorked = false;
      try {
        await this.searchHereButton.click({ timeout: 5000 });
        await this.page.waitForTimeout(300);
        // Check if collapse started expanding
        const collapse = this.page.locator('#collapseExample');
        const hasShow = await collapse.evaluate(el => el.classList.contains('show')).catch(() => false);
        if (hasShow) {
          clickWorked = true;
        }
      } catch {
        // Try JavaScript click on div
        try {
          await this.searchHereButton.evaluate(el => el.click());
          await this.page.waitForTimeout(300);
          clickWorked = true;
        } catch {
          // Try clicking the span instead
          try {
            await this.searchHereSpan.waitFor({ state: 'visible', timeout: 5000 });
            await this.searchHereSpan.scrollIntoViewIfNeeded();
            await this.searchHereSpan.click({ timeout: 5000 });
            clickWorked = true;
          } catch {
            // Last resort: JavaScript click on span
            await this.searchHereSpan.evaluate(el => el.click());
            clickWorked = true;
          }
        }
      }
      
      // Wait a bit for the click to register
      await this.page.waitForTimeout(500);
      
      // Wait for collapse to expand - check for show class or aria-expanded
      let collapseExpanded = false;
      const collapseElement = this.page.locator('#collapseExample');
      
      for (let i = 0; i < 40; i++) {
        await this.page.waitForTimeout(200);
        try {
          // Check for show class
          const hasShow = await collapseElement.evaluate(el => el.classList.contains('show'));
          // Check for aria-expanded on button
          const buttonExpanded = await this.searchHereButton.getAttribute('aria-expanded');
          // Check if collapse is visible (height > 0)
          const isVisible = await collapseElement.isVisible({ timeout: 100 }).catch(() => false);
          
          if (hasShow || buttonExpanded === 'true' || isVisible) {
            collapseExpanded = true;
            break;
          }
        } catch {
          // Continue polling
        }
      }
      
      // Wait for animation to complete
      await this.page.waitForTimeout(1000);
      
      // Now wait for any input field to be visible
      let inputVisible = false;
      const inputs = [
        this.subIdSearchField,
        this.adminUserEmailSearchField,
        this.cloudUserEmailSearchField,
        this.cloudUserNameSearchField
      ];
      
      // Poll for inputs to become visible (check every 200ms for up to 10 seconds)
      for (let i = 0; i < 50; i++) {
        await this.page.waitForTimeout(200);
        for (const input of inputs) {
          try {
            const isVisible = await input.isVisible({ timeout: 100 });
            if (isVisible) {
              inputVisible = true;
              break;
            }
          } catch {
            // Continue checking
          }
        }
        if (inputVisible) {
          // Wait a bit more to ensure animation is complete
          await this.page.waitForTimeout(300);
          break;
        }
      }
      
      if (!inputVisible) {
        // Try one more time with force - maybe inputs are there but need to be scrolled into view
        for (const input of inputs) {
          try {
            await input.scrollIntoViewIfNeeded();
            const isVisible = await input.isVisible({ timeout: 1000 });
            if (isVisible) {
              inputVisible = true;
              break;
            }
          } catch {
            // Continue
          }
        }
      }
      
      if (!inputVisible) {
        throw new Error(`Input fields did not become visible after clicking Search Here. Collapse expanded: ${collapseExpanded}`);
      }
    } catch (error) {
      throw new Error(`Failed to click Search Here: ${error.message}`);
    }
  }

  /**
   * Enters value in Sub ID search field
   * @param {string} value - Sub ID value
   */
  async enterSubIdSearch(value) {
    try {
      await this.clickSearchHere();
      await this.subIdSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.subIdSearchField.scrollIntoViewIfNeeded();
      await this.subIdSearchField.clear();
      await this.subIdSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Sub ID: ${error.message}`);
    }
  }

  /**
   * Enters value in Admin User Email search field
   * @param {string} value - Admin User Email value
   */
  async enterAdminUserEmailSearch(value) {
    try {
      await this.clickSearchHere();
      await this.adminUserEmailSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.adminUserEmailSearchField.scrollIntoViewIfNeeded();
      await this.adminUserEmailSearchField.clear();
      await this.adminUserEmailSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Admin User Email: ${error.message}`);
    }
  }

  /**
   * Enters value in Cloud User Email search field
   * @param {string} value - Cloud User Email value
   */
  async enterCloudUserEmailSearch(value) {
    try {
      await this.clickSearchHere();
      await this.cloudUserEmailSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.cloudUserEmailSearchField.scrollIntoViewIfNeeded();
      await this.cloudUserEmailSearchField.clear();
      await this.cloudUserEmailSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Cloud User Email: ${error.message}`);
    }
  }

  /**
   * Enters value in Cloud User Name search field
   * @param {string} value - Cloud User Name value
   */
  async enterCloudUserNameSearch(value) {
    try {
      await this.clickSearchHere();
      await this.cloudUserNameSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.cloudUserNameSearchField.scrollIntoViewIfNeeded();
      await this.cloudUserNameSearchField.clear();
      await this.cloudUserNameSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Cloud User Name: ${error.message}`);
    }
  }

  /**
   * Clicks the Search button
   */
  async clickSearch() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.searchButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Search: ${error.message}`);
    }
  }

  /**
   * Clicks the Reset button
   */
  async clickReset() {
    try {
      await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.resetButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Reset: ${error.message}`);
    }
  }

  /**
   * Gets Sub ID from table (first row)
   * @returns {Promise<string>}
   */
  async getSubIdFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        // Try to find Sub ID in first row
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          // Check if it's a Sub ID (numeric or contains "SUB-")
          if (text && (/^\d+$/.test(text.trim()) || text.trim().includes('SUB-'))) {
            return text.trim();
          }
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Admin User Email from table (first row)
   * @returns {Promise<string>}
   */
  async getAdminUserEmailFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          // Check if it's an email
          if (text && text.includes('@')) {
            return text.trim();
          }
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Cloud User Email from table (first row)
   * @returns {Promise<string>}
   */
  async getCloudUserEmailFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          // Check if it's an email
          if (text && text.includes('@')) {
            return text.trim();
          }
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Cloud User Name from table (first row)
   * @returns {Promise<string>}
   */
  async getCloudUserNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          // Check if it's a name (not email, not numeric, not empty)
          if (text && !text.includes('@') && !/^\d+$/.test(text.trim()) && text.trim().length > 0) {
            return text.trim();
          }
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies table has data or shows empty message
   * @returns {Promise<{hasData: boolean, rowCount: number, messageVisible: boolean}>}
   */
  async verifyTableDataOrEmpty() {
    try {
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      const messageVisible = await this.noDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        messageVisible: messageVisible
      };
    } catch {
      return {
        hasData: false,
        rowCount: 0,
        messageVisible: false
      };
    }
  }

  /**
   * Verifies all search fields are cleared
   * @returns {Promise<boolean>}
   */
  async verifyAllSearchFieldsCleared() {
    try {
      const subIdValue = await this.subIdSearchField.inputValue().catch(() => '');
      const adminEmailValue = await this.adminUserEmailSearchField.inputValue().catch(() => '');
      const cloudUserEmailValue = await this.cloudUserEmailSearchField.inputValue().catch(() => '');
      const cloudUserNameValue = await this.cloudUserNameSearchField.inputValue().catch(() => '');
      
      return subIdValue === '' && adminEmailValue === '' && cloudUserEmailValue === '' && cloudUserNameValue === '';
    } catch {
      return false;
    }
  }

  /**
   * Checks if validation error is visible
   * @returns {Promise<boolean>}
   */
  async isValidationErrorVisible() {
    try {
      return await this.validationError.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }
}

module.exports = { CloudUserPage };

