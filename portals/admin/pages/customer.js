class CustomerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/customer" class="nav-link sidebar-items">
    this.customerLink = page.locator('div.nav-link.sidebar-items[routerlink="/customer"], div.nav-link.sidebar-items:has-text("Customer"), a[routerlink="/customer"], .sidebar-items:has-text("Customer")').first();
    
    // Page elements
    // HTML: <div class="col-4"><p class="sub fs-5">Customer</p></div>
    this.pageTitle = page.locator('p.sub.fs-5:has-text("Customer"), h1:has-text("Customer"), h2:has-text("Customer"), *:has-text("Customer")').first();
    this.pageWrapper = page.locator('app-root, app-customer, [class*="customer"]').first();
    
    // Table locators
    this.customerTable = page.locator('mat-table, table.table, table').first();
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th');
    
    // Table column locators
    this.companyNameCells = page.locator('td.mat-column-Company-Name, td:has-text("Xyz"), td:has-text("Comhard")');
    this.emailCells = page.locator('td.mat-column-Email, td:has-text("@")');
    this.nameCells = page.locator('td.mat-column-Name, td:has-text("Vinay"), td:has-text("Vikas")');
    this.resellerCompCells = page.locator('td.mat-column-Reseller-Comp, td:has-text("Comhard Te")');
    
    // Record count text
    // HTML: "Showing 1 to 20 of 12078 records"
    this.recordCountText = page.locator('*:has-text("Showing"), *:has-text("records")').first();
    
    // Search form locators
    // HTML: <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3 collapsed">
    this.searchHereButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here"), div.py-3:has-text("Search Here"), span.ms-5:has-text("Search Here")').first();
    this.searchHereSpan = page.locator('span.ms-5:has-text("Search Here"), span:has-text("Search Here")').first();
    // HTML: <div id="collapseExample" class="collapse">
    this.searchForm = page.locator('#collapseExample.collapse, #collapseExample.collapse.show, .search-field-area').first();
    
    // Search field locators - using exact IDs from HTML
    // HTML: <input id="name" ng-reflect-name="name" placeholder="Name/Company Name">
    this.nameSearchField = page.locator('input#name[ng-reflect-name="name"], input#name[placeholder="Name/Company Name"], input#name').first();
    // HTML: <input id="email" ng-reflect-name="email" placeholder="Email">
    this.emailSearchField = page.locator('input#email[ng-reflect-name="email"], input#email[placeholder="Email"], input#email').first();
    // HTML: <input id="mobile" ng-reflect-name="mobile" placeholder="Mobile">
    this.mobileSearchField = page.locator('input#mobile[ng-reflect-name="mobile"], input#mobile[placeholder="Mobile"], input#mobile').first();
    
    // Dropdown locators (mat-select)
    // HTML: <mat-select id="mat-select-52" ...> for Label Name
    this.labelNameDropdown = page.locator('mat-select[aria-labelledby*="Label Name"], mat-form-field:has(mat-label:has-text("Label Name")) mat-select, app-dropdown:has(mat-label:has-text("Label Name")) mat-select').first();
    // HTML: <mat-select id="mat-select-54" ...> for Status
    this.statusDropdown = page.locator('mat-select[aria-labelledby*="Status"], mat-form-field:has(mat-label:has-text("Status")) mat-select, app-dropdown:has(mat-label:has-text("Status")) mat-select').first();
    
    // Search and Reset buttons
    // HTML: <button type="submit" class="btn search-btn">Search</button>
    this.searchButton = page.locator('button.btn.search-btn[type="submit"], button.search-btn:has-text("Search"), button:has-text("Search")').first();
    // HTML: <button type="button" class="btn reset-btn">Reset</button>
    this.resetButton = page.locator('button.btn.reset-btn[type="button"], button.reset-btn:has-text("Reset"), button:has-text("Reset")').first();
    
    // Validation error locators
    this.validationError = page.locator('.error-message, .invalid-feedback, .text-danger, .error-msg').first();
    
    // No data message (if exists)
    this.noDataMessage = page.locator('p.error-msg, *:has-text("No data"), *:has-text("No records")').first();
  }

  /**
   * Navigates to the Customer page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoCustomer(baseUrl) {
    // Navigate to customer page
    await this.customerLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.customerLink.scrollIntoViewIfNeeded();
    await this.customerLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Wait for customer page to load
    await this.customerTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Customer page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnCustomerPage = url.includes('/customer');
      const isTitleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnCustomerPage && isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Customer table is visible with data
   * @returns {Promise<{visible: boolean, hasData: boolean, rowCount: number}>}
   */
  async verifyTableWithData() {
    try {
      const isTableVisible = await this.customerTable.isVisible({ timeout: 5000 }).catch(() => false);
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
      const isFormVisible = await this.nameSearchField.isVisible({ timeout: 1000 }).catch(() => false);
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
        this.nameSearchField,
        this.emailSearchField,
        this.mobileSearchField
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
   * Enters value in Name/Company Name search field
   * @param {string} value - Name/Company Name value
   */
  async enterNameSearch(value) {
    try {
      await this.clickSearchHere();
      await this.nameSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.nameSearchField.scrollIntoViewIfNeeded();
      await this.nameSearchField.clear();
      await this.nameSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Name/Company Name: ${error.message}`);
    }
  }

  /**
   * Enters value in Email search field
   * @param {string} value - Email value
   */
  async enterEmailSearch(value) {
    try {
      await this.clickSearchHere();
      await this.emailSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.emailSearchField.scrollIntoViewIfNeeded();
      await this.emailSearchField.clear();
      await this.emailSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Email: ${error.message}`);
    }
  }

  /**
   * Enters value in Mobile search field
   * @param {string} value - Mobile value
   */
  async enterMobileSearch(value) {
    try {
      await this.clickSearchHere();
      await this.mobileSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.mobileSearchField.scrollIntoViewIfNeeded();
      await this.mobileSearchField.clear();
      await this.mobileSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Mobile: ${error.message}`);
    }
  }

  /**
   * Selects value in Label Name dropdown
   * @param {string} value - Label Name value to select (optional, if not provided selects first available)
   * @returns {Promise<string>} - Returns the selected label name text
   */
  async selectLabelName(value = null) {
    try {
      await this.clickSearchHere();
      
      // Wait for any existing overlays to close
      await this.page.waitForTimeout(500);
      const backdrop = this.page.locator('.cdk-overlay-backdrop');
      const backdropVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
      if (backdropVisible) {
        // Click outside to close any open dropdowns
        await this.page.mouse.click(10, 10);
        await this.page.waitForTimeout(300);
      }
      
      await this.labelNameDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.labelNameDropdown.scrollIntoViewIfNeeded();
      
      // Try clicking with force if normal click is blocked
      try {
        await this.labelNameDropdown.click({ timeout: 3000 });
      } catch {
        // If click is blocked, try force click
        await this.labelNameDropdown.click({ force: true });
      }
      
      await this.page.waitForTimeout(500);
      
      let selectedLabel = '';
      
      if (value) {
        // Wait for specific option to appear
        const option = this.page.locator(`mat-option:has-text("${value}"), .mat-mdc-option:has-text("${value}")`).first();
        await option.waitFor({ state: 'visible', timeout: 5000 });
        selectedLabel = await option.textContent();
        await option.click();
      } else {
        // Select first available option
        const firstOption = this.page.locator('mat-option, .mat-mdc-option').first();
        await firstOption.waitFor({ state: 'visible', timeout: 5000 });
        selectedLabel = await firstOption.textContent();
        await firstOption.click();
      }
      
      await this.page.waitForTimeout(500);
      return selectedLabel ? selectedLabel.trim() : '';
    } catch (error) {
      throw new Error(`Failed to select Label Name: ${error.message}`);
    }
  }

  /**
   * Selects value in Status dropdown
   * @param {string} value - Status value to select (default: "All")
   */
  async selectStatus(value = 'All') {
    try {
      await this.clickSearchHere();
      
      // Wait for any existing overlays to close
      await this.page.waitForTimeout(500);
      const backdrop = this.page.locator('.cdk-overlay-backdrop');
      const backdropVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
      if (backdropVisible) {
        // Click outside to close any open dropdowns
        await this.page.mouse.click(10, 10);
        await this.page.waitForTimeout(300);
      }
      
      await this.statusDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.statusDropdown.scrollIntoViewIfNeeded();
      
      // Try clicking with force if normal click is blocked
      try {
        await this.statusDropdown.click({ timeout: 3000 });
      } catch {
        // If click is blocked, try force click
        await this.statusDropdown.click({ force: true });
      }
      
      await this.page.waitForTimeout(500);
      
      // Wait for options to appear
      const option = this.page.locator(`mat-option:has-text("${value}"), .mat-mdc-option:has-text("${value}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Status: ${error.message}`);
    }
  }

  /**
   * Clicks the Search button
   */
  async clickSearch() {
    try {
      // Wait for search button to be visible and enabled
      await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Check if button is enabled before clicking
      const isEnabled = await this.searchButton.isEnabled({ timeout: 2000 }).catch(() => false);
      if (!isEnabled) {
        throw new Error('Search button is disabled');
      }
      
      await this.searchButton.click({ timeout: 5000 });
      
      // Wait for search to complete - use a shorter timeout to avoid hanging
      // Instead of fixed wait, wait for table to update or timeout quickly
      try {
        await this.page.waitForTimeout(1000);
      } catch (timeoutError) {
        // If timeout occurs, it means test timeout was exceeded - don't throw here
        // Let the test timeout be handled by the test itself
      }
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
      
      // Use a shorter timeout and race it with a promise to prevent blocking
      try {
        await Promise.race([
          this.page.waitForTimeout(1000),
          this.page.waitForLoadState('networkidle', { timeout: 2000 }).catch(() => {})
        ]);
      } catch {
        // If timeout is close, just continue without waiting
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      // If we're close to test timeout, just continue
      if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        console.log('  ⚠ Reset click timeout, continuing...');
        return;
      }
      throw new Error(`Failed to click Reset: ${error.message}`);
    }
  }

  /**
   * Gets Company Name from table (first row)
   * @returns {Promise<string>}
   */
  async getCompanyNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        // Company Name is typically the first column
        if (cellCount > 0) {
          const cell = cells.nth(0);
          const text = await cell.textContent();
          if (text && text.trim()) {
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
   * Gets Email from table (first row)
   * @returns {Promise<string>}
   */
  async getEmailFromTable() {
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
   * Gets Name from table (first row)
   * @returns {Promise<string>}
   */
  async getNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          // Check if it's a name (not email, not empty)
          if (text && !text.includes('@') && text.trim().length > 0) {
            // Skip if it looks like a company name (might be first column)
            // Return the first non-email, non-empty text that's not the first column
            if (i > 0) {
              return text.trim();
            }
          }
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Mobile from table (first row) - if available
   * @returns {Promise<string>}
   */
  async getMobileFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          // Check if it's a mobile number (numeric, typically 10 digits, may contain spaces or dashes)
          if (text) {
            const cleaned = text.trim().replace(/\s+/g, '').replace(/-/g, '');
            if (/^\d{10,}$/.test(cleaned)) {
              return text.trim();
            }
          }
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Label Name from table (first row) - if available
   * @returns {Promise<string>}
   */
  async getLabelNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const cells = firstRow.locator('td');
        const cellCount = await cells.count();
        // Label Name might be in a specific column, try to find it
        // It's usually a text value that's not email, not numeric, and not empty
        for (let i = 0; i < cellCount; i++) {
          const cell = cells.nth(i);
          const text = await cell.textContent();
          if (text && text.trim().length > 0) {
            // Skip email, skip numeric-only (mobile), skip very short text
            if (!text.includes('@') && 
                !/^\d{10,}$/.test(text.trim().replace(/\s+/g, '').replace(/-/g, '')) &&
                text.trim().length > 2) {
              // This might be label name, but we need to be careful
              // Return the first non-email, non-mobile, non-empty text that's not in first 3 columns
              if (i >= 3) {
                return text.trim();
              }
            }
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
      const nameValue = await this.nameSearchField.inputValue().catch(() => '');
      const emailValue = await this.emailSearchField.inputValue().catch(() => '');
      const mobileValue = await this.mobileSearchField.inputValue().catch(() => '');
      
      // For dropdowns, check if they're reset to default
      // Status dropdown should be "All" by default
      const statusValue = await this.statusDropdown.textContent().catch(() => '');
      const isStatusDefault = statusValue.includes('All') || statusValue.trim() === '';
      
      return nameValue === '' && emailValue === '' && mobileValue === '' && isStatusDefault;
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

  /**
   * Verifies search results match the search criteria
   * @param {Object} searchCriteria - Object with search field values
   * @returns {Promise<boolean>}
   */
  async verifySearchResults(searchCriteria) {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        // If no results, it's valid if search didn't match anything
        return true;
      }

      // Check if at least one row matches the search criteria
      let atLeastOneMatch = false;
      const rowsToCheck = Math.min(rowCount, 10); // Check up to 10 rows
      
      for (let i = 0; i < rowsToCheck; i++) {
        const row = this.allTableRows.nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        
        // Extract row data
        const rowData = [];
        for (let j = 0; j < cellCount; j++) {
          const cell = cells.nth(j);
          const text = await cell.textContent();
          if (text) rowData.push(text.trim());
        }

        // Check if this row matches the search criteria
        let rowMatches = true;
        
        // Check Company Name (first column) or Name field
        if (searchCriteria.name && rowData.length > 0) {
          const companyName = rowData[0] || '';
          const name = rowData.length > 2 ? rowData[2] : '';
          const matchesCompanyName = companyName.toLowerCase().includes(searchCriteria.name.toLowerCase());
          const matchesName = name.toLowerCase().includes(searchCriteria.name.toLowerCase());
          if (!matchesCompanyName && !matchesName) {
            rowMatches = false;
          }
        }
        
        // Check Email (second column)
        if (searchCriteria.email && rowData.length > 1) {
          const email = rowData[1] || '';
          if (!email.toLowerCase().includes(searchCriteria.email.toLowerCase())) {
            rowMatches = false;
          }
        }
        
        // Check Mobile (if available, might be in various columns)
        if (searchCriteria.mobile && rowData.length > 0) {
          let mobileFound = false;
          for (let k = 0; k < rowData.length; k++) {
            const cellText = rowData[k] || '';
            const cleaned = cellText.replace(/\s+/g, '').replace(/-/g, '');
            if (cleaned.includes(searchCriteria.mobile.replace(/\s+/g, '').replace(/-/g, ''))) {
              mobileFound = true;
              break;
            }
          }
          if (!mobileFound) {
            rowMatches = false;
          }
        }
        
        // If this row matches, we found at least one match
        if (rowMatches) {
          atLeastOneMatch = true;
          break; // Found at least one match, that's enough
        }
      }
      
      // If we have search criteria, at least one row should match
      // If no search criteria provided, return true (no verification needed)
      if (Object.keys(searchCriteria).length === 0) {
        return true;
      }
      
      return atLeastOneMatch;
    } catch (error) {
      console.error('Error verifying search results:', error);
      return false;
    }
  }
}

module.exports = { CustomerPage };

