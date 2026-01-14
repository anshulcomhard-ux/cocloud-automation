class AuditLogsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Security and Logs dropdown (sidebar menu)
    // HTML: <a href="#" data-bs-toggle="collapse" class="nav-link" data-bs-target="#logs-&-security">Logs & Security</a>
    this.securityAndLogsDropdown = page.locator('a.nav-link:has-text("Logs & Security"), a.nav-link:has-text("Logs &amp; Security"), a[data-bs-toggle="collapse"][data-bs-target*="logs"], a[data-bs-target*="logs-"], a.nav-link:has-text("Logs")').first();
    
    // Audit Logs option - might be inside collapsed menu with id "logs-&-security" or similar
    this.auditLogsOption = page.locator('[id*="logs"][id*="security"] a:has-text("Audit Logs"), [id*="logs"] a:has-text("Audit Logs"), .collapse.show a:has-text("Audit Logs"), a:has-text("Audit Logs"), a:has-text("Audit"), [href*="audit-logs"], [href*="auditlogs"]').first();
    
    // Page wrapper
    this.auditLogsWrapper = page.locator('.audit-logs-wrapper, .audit-logs, [class*="audit-logs"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("Audit Logs"), .header-left:has-text("Audit Logs"), h1:has-text("Audit Logs"), h2:has-text("Audit Logs")').first();
    this.pageHeading = page.locator('h6.page-title-modern:has-text("Audit Logs"), h1:has-text("Audit Logs"), h2:has-text("Audit Logs"), .page-heading:has-text("Audit Logs")').first();
    
    // Search functionality
    // Search Here button: <div type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" class="search-toggle collapsed">
    this.searchHereButton = page.locator('div.search-toggle[data-bs-toggle="collapse"][data-bs-target="#collapseExample"], div.search-toggle, .search-toggle:has(.search-text)').first();
    this.searchForm = page.locator('#collapseExample, .search-form-content, .search-form-card, form, app-search-form').first();
    
    // Search fields - Angular Material inputs
    // Name: input[ng-reflect-name="name"] with placeholder="Search by name" id="mat-input-0"
    this.nameSearchField = page.locator('input[ng-reflect-name="name"], input[placeholder="Search by name"], input#mat-input-0, mat-form-field:has(mat-label:has-text("Name")) input').first();
    // Email: input[ng-reflect-name="email"] with placeholder="Search by email" id="mat-input-1"
    this.emailSearchField = page.locator('input[ng-reflect-name="email"], input[placeholder="Search by email"], input#mat-input-1, mat-form-field:has(mat-label:has-text("Email")) input').first();
    // URL Endpoint: input[ng-reflect-name="urlEndPoint"] with placeholder="Search by URL endpoint" id="mat-input-2"
    this.urlEndpointSearchField = page.locator('input[ng-reflect-name="urlEndPoint"], input[placeholder="Search by URL endpoint"], input#mat-input-2, mat-form-field:has(mat-label:has-text("URL Endpoint")) input').first();
    // API Response: input[ng-reflect-name="response"] with placeholder="Search by API response" id="mat-input-3"
    this.apiResponseSearchField = page.locator('input[ng-reflect-name="response"], input[placeholder="Search by API response"], input#mat-input-3, mat-form-field:has(mat-label:has-text("API Response")) input').first();
    // Task Type: input[ng-reflect-name="method"] with placeholder="Search by Task Type" id="mat-input-4"
    this.taskTypeSearchField = page.locator('input[ng-reflect-name="method"], input[placeholder="Search by Task Type"], input#mat-input-4, mat-form-field:has(mat-label:has-text("Task Type")) input').first();
    
    // Date range selector - Angular Material date range input
    // mat-form-field with mat-date-range-input
    this.dateRangeFormField = page.locator('mat-form-field:has(mat-label:has-text("Select Date Range")), mat-form-field:has(mat-date-range-input)').first();
    // Calendar toggle button: <button aria-label="Open calendar"> inside mat-datepicker-toggle
    this.dateRangeToggleButton = page.locator('mat-datepicker-toggle button[aria-label="Open calendar"], mat-datepicker-toggle button, button[aria-label="Open calendar"]').first();
    // Start date input: <input matstartdate formcontrolname="startDate" placeholder="Start Date">
    this.startDateInput = page.locator('input[matstartdate], input[formcontrolname="startDate"], input[placeholder="Start Date"], input.mat-start-date').first();
    // End date input: <input matenddate formcontrolname="endDate" placeholder="End Date">
    this.endDateInput = page.locator('input[matenddate], input[formcontrolname="endDate"], input[placeholder="End Date"], input.mat-end-date').first();
    // Date range picker panel (calendar)
    this.dateRangePicker = page.locator('mat-datepicker-content, .mat-datepicker-content, .cdk-overlay-pane:has(mat-calendar), [class*="datepicker"]').first();
    
    // Search and Reset buttons
    // Search: button[type="submit"].btn-search-modern
    this.searchButton = page.locator('button.btn-search-modern, button[type="submit"]:has-text("Search"), button:has-text("Search")').first();
    // Reset: button[type="button"].btn-reset-modern
    this.resetButton = page.locator('button.btn-reset-modern, button[type="button"]:has-text("Reset"), button:has-text("Reset")').first();
    
    // Table
    this.auditLogsTable = page.locator('table, app-table table, mat-table').first();
    this.tableRows = page.locator('table tbody tr, app-table table tbody tr, mat-table tbody mat-row').first();
    this.allTableRows = page.locator('table tbody tr, app-table table tbody tr, mat-table tbody mat-row');
    this.tableHeaders = page.locator('table thead th, app-table thead th, mat-table thead mat-header-cell');
    
    // Table columns - Angular Material
    // Headers: <th class="mat-mdc-header-cell mat-column-Name">
    this.nameColumn = page.locator('th.mat-column-Name, th:has-text("Name"), .mat-column-name').first();
    this.emailColumn = page.locator('th.mat-column-Email, th:has-text("Email"), .mat-column-email').first();
    this.urlEndpointColumn = page.locator('th.mat-column-URL-Endpoint, th:has-text("URL Endpoint"), .mat-column-urlEndpoint').first();
    this.apiResponseColumn = page.locator('th.mat-column-API-Response, th:has-text("API Response"), .mat-column-apiResponse').first();
    this.taskTypeColumn = page.locator('th.mat-column-Task-Type, th:has-text("Task Type"), .mat-column-taskType').first();
    this.dateTimeColumn = page.locator('th.mat-column-Date---Time, th:has-text("Date & Time"), .mat-column-dateTime').first();
    
    // No data message - Angular Material table
    this.noDataFoundMessage = page.locator('text=No data found, text=No Data Found, .no-data, .empty-state, div:has-text("No data found"), mat-table + *:has-text("No data"), .mat-mdc-table + *:has-text("No data")').first();
    
    // Select Headers functionality
    // Button: <button type="button" class="btn-modern dropdown-toggle-modern">Select Headers</button>
    this.selectHeadersButton = page.locator('button.dropdown-toggle-modern:has-text("Select Headers"), button.btn-modern:has-text("Select Headers"), button:has-text("Select Headers")').first();
    // Dropdown: <ul class="dropdown-menu-modern p-1 show">
    this.selectHeadersDropdown = page.locator('.dropdown-menu-modern.show, .dropdown-menu-modern, ul.dropdown-menu-modern').first();
    this.headerCheckboxes = this.selectHeadersDropdown.locator('input[type="checkbox"], label input[type="checkbox"]').first();
    // Checkbox labels: <label class="d-flex align-items-center p-2 dropdown-item-modern">
    this.headerCheckboxLabels = this.selectHeadersDropdown.locator('label.dropdown-item-modern, li label');
    
    // Pagination - Angular Material paginator
    // Items per page: mat-select inside .mat-mdc-paginator-page-size
    this.itemsPerPageDropdown = page.locator('mat-select[aria-labelledby*="paginator-page-size"], .mat-mdc-paginator-page-size mat-select, mat-select').first();
    // Pagination text: <div class="mat-mdc-paginator-range-label">1 – 20 of 739</div>
    this.paginationText = page.locator('.mat-mdc-paginator-range-label, [aria-live="polite"]:has-text("–"), text=/\\d+.*–.*\\d+.*of.*\\d+/i').first();
    // Next button: <button class="mat-mdc-paginator-navigation-next" aria-label="Next page">
    this.nextButton = page.locator('button.mat-mdc-paginator-navigation-next, button[aria-label="Next page"], button:has(mat-icon)').first();
    // Previous button: <button class="mat-mdc-paginator-navigation-previous" aria-label="Previous page">
    this.previousButton = page.locator('button.mat-mdc-paginator-navigation-previous, button[aria-label="Previous page"]').first();
    this.pageNumber = page.locator('.mat-mdc-paginator-range-label').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
  }

  /**
   * Navigates to Audit Logs page via Security and Logs dropdown
   */
  async gotoAuditLogs() {
    try {
      // Click on Security and Logs dropdown
      await this.securityAndLogsDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.securityAndLogsDropdown.click();
      await this.page.waitForTimeout(1000);
      
      // Click on Audit Logs option
      await this.auditLogsOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.auditLogsOption.click();
    } catch (error) {
      // If dropdown not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/audit-logs`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load
    await Promise.race([
      this.auditLogsWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Audit Logs page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageHeading.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.auditLogsWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page heading "Audit Logs" is visible and extracts text
   * @returns {Promise<{visible: boolean, text: string}>}
   */
  async verifyPageHeading() {
    try {
      const visible = await this.pageHeading.isVisible({ timeout: 5000 });
      let text = '';
      if (visible) {
        text = await this.pageHeading.textContent();
        text = text?.trim() || '';
      }
      return {
        visible: visible,
        text: text
      };
    } catch (error) {
      return {
        visible: false,
        text: ''
      };
    }
  }

  /**
   * Clicks on "Search Here" button to open search fields
   */
  async clickSearchHere() {
    try {
      // Check if form is already visible (has 'show' class)
      const formVisible = await this.searchForm.isVisible({ timeout: 2000 }).catch(() => false);
      const formHasShowClass = await this.searchForm.evaluate(el => el.classList.contains('show')).catch(() => false);
      
      if (formVisible && formHasShowClass) {
        // Form is already open, no need to click
        console.log('Search form is already open');
        return;
      }
      
      // Click the search toggle button
      await this.searchHereButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchHereButton.scrollIntoViewIfNeeded();
      await this.searchHereButton.click();
      await this.page.waitForTimeout(1500); // Wait for collapse animation
      
      // Wait for form to expand (check for 'show' class)
      await this.page.waitForFunction(
        () => {
          const form = document.querySelector('#collapseExample');
          return form && form.classList.contains('show');
        },
        { timeout: 5000 }
      ).catch(() => {});
      
      // Also wait for form to be visible
      await this.searchForm.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    } catch (error) {
      // If "Search Here" button not found, search form might already be visible
      const formVisible = await this.searchForm.isVisible({ timeout: 2000 }).catch(() => false);
      if (!formVisible) {
        throw new Error(`Failed to click Search Here button: ${error.message}`);
      }
    }
  }

  /**
   * Gets value from table column
   * @param {number} rowIndex - Row index (0-based)
   * @param {number} columnIndex - Column index (0-based)
   * @returns {Promise<string>}
   */
  async getTableCellValue(rowIndex, columnIndex) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      const cell = row.locator('td').nth(columnIndex).or(row.locator('mat-cell').nth(columnIndex));
      const text = await cell.textContent();
      return text?.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets value from table column by column class name
   * @param {number} rowIndex - Row index (0-based)
   * @param {string} columnClass - Column class name (e.g., "mat-column-Name", "mat-column-Email")
   * @returns {Promise<string>}
   */
  async getTableCellValueByColumnClass(rowIndex, columnClass) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      // Find cell by column class
      const cell = row.locator(`mat-cell.${columnClass}, td.${columnClass}, [class*="${columnClass}"]`).first();
      const text = await cell.textContent();
      return text?.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets name value from first table row
   * @returns {Promise<string>}
   */
  async getNameFromTable() {
    try {
      // Try to get from Name column using column class
      const nameValue = await this.getTableCellValueByColumnClass(0, 'mat-column-Name');
      if (nameValue) {
        return nameValue;
      }
      // Fallback: try different column indices
      // Name might be in column 2 (after ID and Date & Time)
      for (let i = 0; i < 5; i++) {
        const value = await this.getTableCellValue(0, i);
        // Check if it looks like a name (not an ID, not a date, not an email)
        if (value && !value.includes('@') && !value.match(/^\d+$/) && !value.match(/\d{4}-\d{2}-\d{2}/)) {
          return value;
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets email value from first table row
   * @returns {Promise<string>}
   */
  async getEmailFromTable() {
    try {
      // Try to get from Email column using column class
      const emailValue = await this.getTableCellValueByColumnClass(0, 'mat-column-Email');
      if (emailValue && emailValue.includes('@')) {
        return emailValue;
      }
      // Fallback: try different column indices and look for email pattern
      for (let i = 0; i < 5; i++) {
        const value = await this.getTableCellValue(0, i);
        if (value && value.includes('@')) {
          return value;
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets URL Endpoint value from first table row
   * @returns {Promise<string>}
   */
  async getUrlEndpointFromTable() {
    try {
      // Try to get from URL Endpoint column using column class
      const urlValue = await this.getTableCellValueByColumnClass(0, 'mat-column-URL-Endpoint');
      if (urlValue) {
        return urlValue;
      }
      // Fallback: try to find URL pattern in row text
      const firstRow = this.allTableRows.first();
      const rowText = await firstRow.textContent();
      // Try to find URL pattern
      const urlMatch = rowText?.match(/https?:\/\/[^\s]+|api\/[^\s]+|\/[^\s]+/);
      if (urlMatch) {
        return urlMatch[0];
      }
      // Try different column indices
      for (let i = 0; i < 8; i++) {
        const value = await this.getTableCellValue(0, i);
        if (value && (value.includes('/') || value.includes('api') || value.includes('http'))) {
          return value;
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets API Response value from first table row
   * @returns {Promise<string>}
   */
  async getApiResponseFromTable() {
    try {
      // Try to get from API Response column using column class
      const apiResponseValue = await this.getTableCellValueByColumnClass(0, 'mat-column-API-Response');
      if (apiResponseValue) {
        return apiResponseValue;
      }
      // Fallback: get row text and extract meaningful part
      const firstRow = this.allTableRows.first();
      const rowText = await firstRow.textContent();
      // API Response might contain JSON or status codes
      // Return first 50 characters as search value
      return rowText?.substring(0, 50).trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets Task Type value from first table row
   * @returns {Promise<string>}
   */
  async getTaskTypeFromTable() {
    try {
      // Try to get from Task Type column using column class
      const taskTypeValue = await this.getTableCellValueByColumnClass(0, 'mat-column-Task-Type');
      if (taskTypeValue) {
        return taskTypeValue;
      }
      // Fallback: try different columns
      const firstRow = this.allTableRows.first();
      for (let i = 0; i < 8; i++) {
        const value = await this.getTableCellValue(0, i);
        if (value && (value.includes('GET') || value.includes('POST') || value.includes('PUT') || value.includes('DELETE') || value.length < 50)) {
          return value;
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Enters value in name search field
   * @param {string} value
   */
  async enterNameSearch(value) {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      await this.nameSearchField.waitFor({ state: 'visible', timeout: 10000 });
      await this.nameSearchField.scrollIntoViewIfNeeded();
      await this.nameSearchField.clear();
      await this.nameSearchField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter name search: ${error.message}`);
    }
  }

  /**
   * Enters value in email search field
   * @param {string} value
   */
  async enterEmailSearch(value) {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      await this.emailSearchField.waitFor({ state: 'visible', timeout: 10000 });
      await this.emailSearchField.scrollIntoViewIfNeeded();
      await this.emailSearchField.clear();
      await this.emailSearchField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter email search: ${error.message}`);
    }
  }

  /**
   * Enters value in URL Endpoint search field
   * @param {string} value
   */
  async enterUrlEndpointSearch(value) {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      await this.urlEndpointSearchField.waitFor({ state: 'visible', timeout: 10000 });
      await this.urlEndpointSearchField.scrollIntoViewIfNeeded();
      await this.urlEndpointSearchField.clear();
      await this.urlEndpointSearchField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter URL Endpoint search: ${error.message}`);
    }
  }

  /**
   * Enters value in API Response search field
   * @param {string} value
   */
  async enterApiResponseSearch(value) {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      await this.apiResponseSearchField.waitFor({ state: 'visible', timeout: 10000 });
      await this.apiResponseSearchField.scrollIntoViewIfNeeded();
      await this.apiResponseSearchField.clear();
      await this.apiResponseSearchField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter API Response search: ${error.message}`);
    }
  }

  /**
   * Enters value in Task Type search field
   * @param {string} value
   */
  async enterTaskTypeSearch(value) {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      // Check if it's a select dropdown or input
      const isSelect = await this.taskTypeSearchField.evaluate(el => el.tagName.toLowerCase() === 'select').catch(() => false);
      
      if (isSelect) {
        await this.taskTypeSearchField.selectOption(value);
      } else {
        await this.taskTypeSearchField.waitFor({ state: 'visible', timeout: 10000 });
        await this.taskTypeSearchField.scrollIntoViewIfNeeded();
        await this.taskTypeSearchField.clear();
        await this.taskTypeSearchField.fill(value);
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter Task Type search: ${error.message}`);
    }
  }

  /**
   * Clicks on date range calendar toggle button to open calendar
   */
  async clickSelectRange() {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      // Click the calendar toggle button
      await this.dateRangeToggleButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.dateRangeToggleButton.scrollIntoViewIfNeeded();
      await this.dateRangeToggleButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for calendar to appear
      await this.dateRangePicker.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Select Range: ${error.message}`);
    }
  }

  /**
   * Selects start and end date from calendar
   * @param {string} startDate - Start date (format: YYYY-MM-DD)
   * @param {string} endDate - End date (format: YYYY-MM-DD)
   */
  async selectDateRange(startDate, endDate) {
    try {
      // Wait for the search form to be visible first
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
      
      // Check if calendar is already open and close it
      const calendarVisible = await this.dateRangePicker.isVisible({ timeout: 1000 }).catch(() => false);
      if (calendarVisible) {
        // Close calendar by pressing Escape
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      // Use evaluate to set date values directly without triggering calendar
      // This avoids the overlay backdrop blocking clicks
      await this.startDateInput.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      }, startDate);
      
      await this.page.waitForTimeout(300);
      
      await this.endDateInput.evaluate((el, value) => {
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      }, endDate);
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Fallback: try using type() if evaluate fails
      try {
        const startInputVisible = await this.startDateInput.isVisible({ timeout: 2000 }).catch(() => false);
        const endInputVisible = await this.endDateInput.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (startInputVisible && endInputVisible) {
          // Close any open calendar first
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(300);
          
          // Focus and type (this might open calendar, but we'll handle it)
          await this.startDateInput.focus();
          await this.startDateInput.evaluate(el => el.value = '');
          await this.startDateInput.type(startDate, { delay: 50 });
          await this.page.waitForTimeout(300);
          
          await this.endDateInput.focus();
          await this.endDateInput.evaluate(el => el.value = '');
          await this.endDateInput.type(endDate, { delay: 50 });
          await this.page.waitForTimeout(300);
          
          // Close calendar if it opened
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(200);
        }
      } catch (fallbackError) {
        throw new Error(`Failed to select date range: ${error.message}`);
      }
    }
  }

  /**
   * Clicks Search button
   */
  async clickSearch() {
    try {
      // Close any open calendar/overlay first
      const calendarVisible = await this.dateRangePicker.isVisible({ timeout: 1000 }).catch(() => false);
      if (calendarVisible) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
      }
      
      // Wait for search button to be visible and enabled
      await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchButton.waitFor({ state: 'attached', timeout: 5000 });
      
      // Scroll into view and click
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.searchButton.click({ timeout: 10000 });
      
      // Wait for search to complete - use a shorter timeout and check for table updates
      await this.page.waitForTimeout(1000);
      
      // Wait for table to update (either data appears or "no data" message)
      try {
        await Promise.race([
          this.page.waitForSelector('mat-table mat-row', { timeout: 5000 }).catch(() => {}),
          this.page.waitForSelector('text=No data found, text=No Data Found', { timeout: 5000 }).catch(() => {}),
          this.page.waitForTimeout(3000) // Max wait 3 seconds
        ]);
      } catch (e) {
        // Continue even if table doesn't update immediately
      }
    } catch (error) {
      throw new Error(`Failed to click Search button: ${error.message}`);
    }
  }

  /**
   * Clicks Reset button
   */
  async clickReset() {
    try {
      await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.resetButton.click();
      await this.page.waitForTimeout(2000); // Wait for form reset
    } catch (error) {
      throw new Error(`Failed to click Reset button: ${error.message}`);
    }
  }

  /**
   * Verifies table has data or shows "No data found" message
   * @returns {Promise<{hasData: boolean, rowCount: number, noDataMessageVisible: boolean}>}
   */
  async verifyTableData() {
    try {
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      
      // Check for "No data found" message - try multiple selectors
      let noDataMessageVisible = false;
      
      // Check if table is empty and look for no data message
      if (!hasData) {
        // Try multiple selectors for "No data found" message
        const noDataSelectors = [
          this.noDataFoundMessage,
          this.page.locator('text=/No data found/i'),
          this.page.locator('text=/No Data Found/i'),
          this.page.locator('.no-data'),
          this.page.locator('.empty-state'),
          this.page.locator('div:has-text("No data found")'),
          this.page.locator('div:has-text("No Data Found")'),
          // Angular Material empty state
          this.page.locator('mat-table + *:has-text("No data")'),
          this.page.locator('.mat-mdc-table + *:has-text("No data")'),
          // Check if table has empty message
          this.page.locator('[class*="empty"], [class*="no-data"]')
        ];
        
        for (const selector of noDataSelectors) {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            noDataMessageVisible = true;
            break;
          }
        }
        
        // If no explicit message found but table is empty, consider it as "no data"
        if (!noDataMessageVisible && rowCount === 0) {
          noDataMessageVisible = true;
        }
      }
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        noDataMessageVisible: noDataMessageVisible
      };
    } catch (error) {
      return {
        hasData: false,
        rowCount: 0,
        noDataMessageVisible: false,
        error: error.message
      };
    }
  }

  /**
   * Gets the count of table rows
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      return await this.allTableRows.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clicks on Select Headers button
   */
  async clickSelectHeaders() {
    try {
      await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectHeadersButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for dropdown to open
      await this.selectHeadersDropdown.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Select Headers button: ${error.message}`);
    }
  }

  /**
   * Verifies Select Headers dropdown is open
   * @returns {Promise<boolean>}
   */
  async isSelectHeadersDropdownOpen() {
    try {
      return await this.selectHeadersDropdown.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all header checkbox options
   * @returns {Promise<Array<{label: string, checked: boolean}>>}
   */
  async getHeaderOptions() {
    try {
      const checkboxes = this.selectHeadersDropdown.locator('input[type="checkbox"]');
      const count = await checkboxes.count();
      const options = [];
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        // Get label text from the span inside the label
        const label = await checkbox.evaluate(el => {
          const labelEl = el.closest('label');
          if (labelEl) {
            const span = labelEl.querySelector('span');
            return span?.textContent?.trim() || labelEl.textContent?.trim() || '';
          }
          return '';
        }).catch(() => '');
        const checked = await checkbox.isChecked().catch(() => false);
        options.push({ label, checked });
      }
      
      return options;
    } catch (error) {
      return [];
    }
  }

  /**
   * Unselects all header options
   */
  async unselectAllHeaders() {
    try {
      // Ensure dropdown is open
      const isOpen = await this.isSelectHeadersDropdownOpen();
      if (!isOpen) {
        await this.clickSelectHeaders();
        await this.page.waitForTimeout(500);
      }
      
      // Get all checked checkboxes
      const checkboxes = this.selectHeadersDropdown.locator('input[type="checkbox"]:checked');
      const count = await checkboxes.count();
      
      // Uncheck each checkbox one by one, with error handling
      for (let i = 0; i < count; i++) {
        try {
          // Re-query checkboxes to avoid stale element issues
          const currentCheckboxes = this.selectHeadersDropdown.locator('input[type="checkbox"]:checked');
          const currentCount = await currentCheckboxes.count();
          
          if (currentCount === 0) break; // All already unchecked
          
          // Uncheck the first checked checkbox
          await currentCheckboxes.first().uncheck({ timeout: 3000 });
          await this.page.waitForTimeout(200); // Small delay between unchecks
        } catch (error) {
          // If checkbox becomes stale or not found, continue
          console.log(`Warning: Could not uncheck checkbox ${i}: ${error.message}`);
          break;
        }
      }
      await this.page.waitForTimeout(300);
    } catch (error) {
      // Ignore errors but log them
      console.log(`Warning in unselectAllHeaders: ${error.message}`);
    }
  }

  /**
   * Selects all header options
   */
  async selectAllHeaders() {
    try {
      // Ensure dropdown is open
      const isOpen = await this.isSelectHeadersDropdownOpen();
      if (!isOpen) {
        await this.clickSelectHeaders();
        await this.page.waitForTimeout(500);
      }
      
      // Get all unchecked checkboxes
      const checkboxes = this.selectHeadersDropdown.locator('input[type="checkbox"]:not(:checked)');
      const count = await checkboxes.count();
      
      // Check each checkbox one by one, with error handling
      for (let i = 0; i < count; i++) {
        try {
          // Re-query checkboxes to avoid stale element issues
          const currentCheckboxes = this.selectHeadersDropdown.locator('input[type="checkbox"]:not(:checked)');
          const currentCount = await currentCheckboxes.count();
          
          if (currentCount === 0) break; // All already checked
          
          // Check the first unchecked checkbox
          await currentCheckboxes.first().check({ timeout: 3000 });
          await this.page.waitForTimeout(200); // Small delay between checks
        } catch (error) {
          // If checkbox becomes stale or not found, continue
          console.log(`Warning: Could not check checkbox ${i}: ${error.message}`);
          break;
        }
      }
      await this.page.waitForTimeout(300);
    } catch (error) {
      // Ignore errors but log them
      console.log(`Warning in selectAllHeaders: ${error.message}`);
    }
  }

  /**
   * Closes Select Headers dropdown
   */
  async closeSelectHeadersDropdown() {
    try {
      // Check if dropdown is open first
      const isOpen = await this.isSelectHeadersDropdownOpen();
      if (!isOpen) {
        return; // Already closed
      }
      
      // Press Escape to close
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
      
      // Verify it's closed
      const stillOpen = await this.isSelectHeadersDropdownOpen();
      if (stillOpen) {
        // Try clicking outside the dropdown
        await this.page.click('body', { position: { x: 0, y: 0 } });
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      // Ignore errors but log them
      console.log(`Warning in closeSelectHeadersDropdown: ${error.message}`);
    }
  }

  /**
   * Verifies table columns are visible
   * @returns {Promise<{columnsVisible: boolean, columnCount: number}>}
   */
  async verifyTableColumns() {
    try {
      const headerCount = await this.tableHeaders.count();
      return {
        columnsVisible: headerCount > 0,
        columnCount: headerCount
      };
    } catch (error) {
      return {
        columnsVisible: false,
        columnCount: 0
      };
    }
  }

  /**
   * Gets default "Items per page" value
   * @returns {Promise<number>}
   */
  async getItemsPerPage() {
    try {
      const dropdownVisible = await this.itemsPerPageDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      if (dropdownVisible) {
        // For Angular Material select, get the selected value text
        const valueText = await this.itemsPerPageDropdown.locator('.mat-mdc-select-value-text').textContent().catch(() => '');
        if (valueText) {
          const value = parseInt(valueText.trim(), 10);
          if (!isNaN(value)) {
            return value;
          }
        }
        // Try to get value attribute
        const value = await this.itemsPerPageDropdown.getAttribute('ng-reflect-value').catch(() => '');
        if (value) {
          return parseInt(value, 10) || 20;
        }
      }
      return 20; // Default value
    } catch (error) {
      return 20;
    }
  }

  /**
   * Gets pagination text
   * @returns {Promise<string>}
   */
  async getPaginationText() {
    try {
      const textVisible = await this.paginationText.isVisible({ timeout: 3000 }).catch(() => false);
      if (textVisible) {
        const text = await this.paginationText.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Changes items per page
   * @param {number} itemsPerPage - Number of items per page (e.g., 20, 50)
   */
  async changeItemsPerPage(itemsPerPage) {
    try {
      // Wait for dropdown to be visible
      await this.itemsPerPageDropdown.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll into view to avoid interception
      await this.itemsPerPageDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Try to click the select trigger (the visible part)
      // Use force click if regular click is intercepted
      try {
        await this.itemsPerPageDropdown.click({ timeout: 5000, force: false });
      } catch (clickError) {
        // If regular click fails, try force click
        console.log('Regular click failed, trying force click...');
        await this.itemsPerPageDropdown.click({ force: true, timeout: 5000 });
      }
      
      // Wait for the panel to open
      const panelSelector = '.mat-mdc-select-panel, [role="listbox"].mat-mdc-select-panel, #mat-select-0-panel';
      await this.page.waitForSelector(panelSelector, { state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(300);
      
      // Find and click the option by value attribute or text
      // Try multiple selectors for the option
      const optionSelectors = [
        `mat-option[ng-reflect-value="${itemsPerPage}"]`,
        `mat-option[value="${itemsPerPage}"]`,
        `mat-option:has-text("${itemsPerPage}")`,
        `.mat-mdc-select-panel mat-option:has-text("${itemsPerPage}")`,
        `[role="listbox"] mat-option:has-text("${itemsPerPage}")`
      ];
      
      let optionClicked = false;
      for (const selector of optionSelectors) {
        try {
          const option = this.page.locator(selector).first();
          const isVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await option.scrollIntoViewIfNeeded();
            await option.click({ timeout: 3000 });
            optionClicked = true;
            break;
          }
        } catch (e) {
          // Try next selector
          continue;
        }
      }
      
      if (!optionClicked) {
        throw new Error(`Could not find or click option for ${itemsPerPage}`);
      }
      
      // Wait for panel to close and table to update
      await this.page.waitForSelector(panelSelector, { state: 'hidden', timeout: 3000 }).catch(() => {});
      await this.page.waitForTimeout(1500); // Wait for table to update
    } catch (error) {
      throw new Error(`Failed to change items per page: ${error.message}`);
    }
  }

  /**
   * Clicks Next pagination button
   */
  async clickNextButton() {
    try {
      await this.nextButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.nextButton.click();
      await this.page.waitForTimeout(2000); // Wait for page to load
    } catch (error) {
      throw new Error(`Failed to click Next button: ${error.message}`);
    }
  }

  /**
   * Clicks Previous pagination button
   */
  async clickPreviousButton() {
    try {
      await this.previousButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.previousButton.click();
      await this.page.waitForTimeout(2000); // Wait for page to load
    } catch (error) {
      throw new Error(`Failed to click Previous button: ${error.message}`);
    }
  }

  /**
   * Gets first row ID from table
   * @returns {Promise<string>}
   */
  async getFirstRowId() {
    try {
      const firstRow = this.allTableRows.first();
      // ID is usually in the first column
      const idCell = firstRow.locator('td').first().or(firstRow.locator('mat-cell').first());
      const text = await idCell.textContent();
      return text?.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets current page number
   * @returns {Promise<number>}
   */
  async getCurrentPageNumber() {
    try {
      const pageNumberVisible = await this.pageNumber.isVisible({ timeout: 2000 }).catch(() => false);
      if (pageNumberVisible) {
        const text = await this.pageNumber.textContent();
        const match = text?.match(/\d+/);
        return match ? parseInt(match[0], 10) : 1;
      }
      return 1;
    } catch (error) {
      return 1;
    }
  }
}

module.exports = { AuditLogsPage };

