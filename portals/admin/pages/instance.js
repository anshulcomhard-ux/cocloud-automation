class InstancePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div class="nav-link sidebar-items" routerlink="/instance">
    this.instanceLink = page.locator('a.nav-link.sidebar-items[routerlink="/instance"], div.nav-link.sidebar-items:has-text("Instance"), a[routerlink="/instance"], .sidebar-items:has-text("Instance")').first();
    
    // Page elements
    this.pageWrapper = page.locator('app-root, app-instance, [class*="instance"]').first();
    this.pageTitle = page.locator('h1:has-text("Instance"), h2:has-text("Instance"), *:has-text("Instance")').first();
    
    // Table locators
    this.instanceTable = page.locator('mat-table, table.table, table').first();
    this.tableRows = page.locator('mat-table mat-row, table tbody tr').first();
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th').first();
    
    // Select Headers locators
    // HTML: <button class="header-btn btn btn-primary dropdown-toggle"> Select Headers </button>
    this.selectHeadersButton = page.locator('button.header-btn.btn.btn-primary.dropdown-toggle:has-text("Select Headers"), button.dropdown-toggle:has-text("Select Headers"), button:has-text("Select Headers")').first();
    
    // HTML: <ul class="dropdown-menu dropdown-header-menu show">
    this.selectHeadersDropdown = page.locator('ul.dropdown-menu.dropdown-header-menu.show, ul.dropdown-menu.dropdown-header-menu, ul.dropdown-menu.show').first();
    
    // HTML: <input type="checkbox" value="Server Name">
    this.headerCheckboxes = page.locator('ul.dropdown-menu.dropdown-header-menu input[type="checkbox"], ul.dropdown-menu input[type="checkbox"]');
    this.headerLabels = page.locator('ul.dropdown-menu.dropdown-header-menu label, ul.dropdown-menu label');
    
    // Table column headers (Angular Material)
    // Using mat-column-* classes
    this.serverNameHeader = page.locator('th.mat-column-Server-Name, th:has-text("Server Name")').first();
    this.driveNameHeader = page.locator('th.mat-column-Drive-Name, th:has-text("Drive Name")').first();
    this.subscriptionIdHeader = page.locator('th.mat-column-Subscription-ID, th:has-text("Subscription ID")').first();
    this.customerEmailHeader = page.locator('th.mat-column-Customer-Email, th:has-text("Customer Email")').first();
    this.noOfUsersHeader = page.locator('th.mat-column-No-Of-Users, th:has-text("No Of Users")').first();
    this.statusHeader = page.locator('th.mat-column-Status, th:has-text("Status")').first();
    this.partnerCompanyHeader = page.locator('th.mat-column-Partner-Company, th:has-text("Partner Company")').first();
    this.salesPersonHeader = page.locator('th.mat-column-Sales-Person, th:has-text("Sales Person")').first();
    this.planNameHeader = page.locator('th.mat-column-Plan-Name, th:has-text("Plan Name")').first();
    this.startDateHeader = page.locator('th.mat-column-Start-Date, th:has-text("Start Date")').first();
    this.nextBillingDateHeader = page.locator('th.mat-column-Next-Billing-Date, th:has-text("Next Billing Date")').first();
    
    // All table headers
    this.allTableHeaders = page.locator('th.mat-mdc-header-cell, th.mat-column-Server-Name, th.mat-column-Drive-Name, th.mat-column-Subscription-ID, th.mat-column-Customer-Email, th.mat-column-No-Of-Users, th.mat-column-Status, th.mat-column-Partner-Company, th.mat-column-Sales-Person, th.mat-column-Plan-Name, th.mat-column-Start-Date, th.mat-column-Next-Billing-Date');
    
    // No data message
    this.noDataMessage = page.locator('*:has-text("No data"), *:has-text("No data found"), *:has-text("No Data"), *:has-text("There is no Instance created yet"), .no-data, .empty-state').first();
    
    // Pagination locators (Angular Material)
    // HTML: <mat-select ng-reflect-value="20"> inside mat-paginator
    this.itemsPerPageDropdown = page.locator('mat-paginator mat-select[aria-labelledby*="mat-paginator-page-size-label"], .mat-mdc-paginator-page-size-select mat-select, mat-paginator mat-select').first();
    this.itemsPerPageLabel = page.locator('.mat-mdc-paginator-page-size-label, [id*="mat-paginator-page-size-label"]').first();
    // HTML: <div class="total-data-info"><span> Showing 1 to 20 of 9242 records </span></div>
    this.totalDataInfo = page.locator('div.total-data-info span, .total-data-info').first();
    // HTML: <div class="mat-mdc-paginator-range-label"> 1 – 20 of 9242 </div>
    this.paginationText = page.locator('.mat-mdc-paginator-range-label, div.total-data-info span').first();
    this.nextButton = page.locator('mat-paginator button.mat-mdc-paginator-navigation-next, button.mat-mdc-paginator-navigation-next').first();
    this.previousButton = page.locator('mat-paginator button.mat-mdc-paginator-navigation-previous, button.mat-mdc-paginator-navigation-previous').first();
    
    // Search form locators
    // HTML: <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3">
    this.searchHereButton = page.locator('div.search-box div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"], div.py-3:has-text("Search Here")').first();
    // HTML: <div id="collapseExample" class="collapse">
    this.searchForm = page.locator('#collapseExample.collapse, #collapseExample.collapse.show, .search-field-area').first();
    
    // Search field locators - using exact IDs from HTML
    // HTML: <input id="subId" ng-reflect-name="subId" placeholder="Sub Id">
    this.subIdSearchField = page.locator('input#subId[ng-reflect-name="subId"], input#subId[placeholder="Sub Id"], input#subId').first();
    // HTML: <input id="planName" ng-reflect-name="planName" placeholder="Plan name">
    this.planNameSearchField = page.locator('input#planName[ng-reflect-name="planName"], input#planName[placeholder="Plan name"], input#planName').first();
    // HTML: <input id="ip" ng-reflect-name="ip" placeholder="IP">
    this.ipAddressSearchField = page.locator('input#ip[ng-reflect-name="ip"], input#ip[placeholder="IP"], input#ip').first();
    // HTML: <input id="driveName" ng-reflect-name="driveName" placeholder="Drive name">
    this.driveNameSearchField = page.locator('input#driveName[ng-reflect-name="driveName"], input#driveName[placeholder="Drive name"], input#driveName').first();
    // HTML: <input id="serverName" ng-reflect-name="serverName" placeholder="Server name">
    this.serverNameSearchField = page.locator('input#serverName[ng-reflect-name="serverName"], input#serverName[placeholder="Server name"], input#serverName').first();
    // HTML: <input id="customerDetail" ng-reflect-name="customerDetail" placeholder="Customer Email/Company Name">
    this.customerEmailSearchField = page.locator('input#customerDetail[ng-reflect-name="customerDetail"], input#customerDetail[placeholder*="Customer Email"], input#customerDetail').first();
    // HTML: <input id="partnerDetail" ng-reflect-name="partnerDetail" placeholder="Partner Email/Company Name">
    this.partnerEmailSearchField = page.locator('input#partnerDetail[ng-reflect-name="partnerDetail"], input#partnerDetail[placeholder*="Partner Email"], input#partnerDetail').first();
    
    // Instance Type dropdown
    // HTML: <mat-select> inside <app-dropdown> with label "Select Instance Type"
    this.instanceTypeDropdown = page.locator('app-dropdown mat-select, mat-form-field:has(mat-label:has-text("Select Instance Type")) mat-select, mat-select[aria-labelledby*="mat-mdc-form-field-label"]').first();
    this.instanceTypeOptions = page.locator('mat-option:has-text("Live Instance"), mat-option:has-text("Trial Instance")');
    
    // Search and Reset buttons
    // HTML: <button type="submit" class="btn search-btn">Search</button>
    this.searchButton = page.locator('button.btn.search-btn[type="submit"], button.search-btn:has-text("Search"), button:has-text("Search")').first();
    // HTML: <button type="button" class="btn reset-btn">Reset</button>
    this.resetButton = page.locator('button.btn.reset-btn[type="button"], button.reset-btn:has-text("Reset"), button:has-text("Reset")').first();
    
    // Table cell locators for data extraction
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.subIdCells = page.locator('td.mat-column-Subscription-ID, td:has-text("SUB-")');
    this.planNameCells = page.locator('td.mat-column-Plan-Name');
    this.ipAddressCells = page.locator('td.mat-column-IP-Address, td:has-text(".")');
    this.driveNameCells = page.locator('td.mat-column-Drive-Name');
    this.serverNameCells = page.locator('td.mat-column-Server-Name');
    this.customerEmailCells = page.locator('td.mat-column-Customer-Email');
    this.partnerEmailCells = page.locator('td.mat-column-Partner-Email, td.mat-column-Partner-Company');
    
    // Change Instance locators
    // HTML: <button class="btn btn-primary">Change Instance</button>
    this.changeInstanceButton = page.locator('button.btn.btn-primary:has-text("Change Instance")').first();
    
    // Change Instance Modal
    // HTML: <div class="common-modal modern-modal" *ngIf="isChangeInstanceModalOpen">
    this.changeInstanceModal = page.locator('.common-modal.modern-modal:has-text("Change User Instance"), .common-modal:has-text("Change User Instance"), .modal.show:has-text("Change User Instance"), .modal:has-text("Change User Instance"), [class*="modal"]:has-text("Change User Instance")').first();
    
    // Modal title
    this.changeInstanceModalTitle = page.locator('.common-modal.modern-modal p.modal-title-modern:has-text("Change User Instance"), .modal-title:has-text("Change User Instance"), p.modal-title-modern:has-text("Change User Instance"), h4:has-text("Change User Instance"), h5:has-text("Change User Instance")').first();
    
    // Source Instance dropdown
    // HTML: <app-select-search> with label "Select source Instance *" (form-label)
    this.sourceInstanceDropdown = page.locator('app-select-search:has(label.form-label:has-text("source Instance")) mat-select, app-select-search:has(label.form-label:has-text("Source Instance")) mat-select, app-select-search mat-select, app-select-search select').first();
    this.sourceInstanceLabel = page.locator('label.form-label:has-text("source Instance"), label.form-label:has-text("Source Instance"), mat-label:has-text("Select Source Instance"), label:has-text("Select Source Instance")').first();
    
    // Destination Instance dropdown
    // HTML: <app-select-search> with label "Select Destination Instance *" (form-label)
    this.destinationInstanceDropdown = page.locator('app-select-search:has(label.form-label:has-text("Destination Instance")) mat-select, app-select-search:has(label.form-label:has-text("destination Instance")) mat-select, app-select-search mat-select, app-select-search select').nth(1);
    this.destinationInstanceLabel = page.locator('label.form-label:has-text("Destination Instance"), label.form-label:has-text("destination Instance"), mat-label:has-text("Select Destination Instance"), label:has-text("Select Destination Instance")').first();
    
    // Modal buttons
    // HTML: <button class="primary-btn btn-modal-primary" (click)="submitChangeInstance()"> Submit </button>
    this.modalSubmitButton = page.locator('.common-modal.modern-modal button.primary-btn.btn-modal-primary:has-text("Submit"), .modal button.primary-btn:has-text("Submit"), .modal button:has-text("Submit"), button:has-text("Submit")').first();
    
    // HTML: <button class="secondary-btn btn-modal-secondary" (click)="closeChangeInstanceModal()"> Cancel </button>
    this.modalCancelButton = page.locator('.common-modal.modern-modal button.secondary-btn.btn-modal-secondary:has-text("Cancel"), .modal button.secondary-btn:has-text("Cancel"), .modal button:has-text("Cancel"), button:has-text("Cancel"), .modal button[aria-label="Close"]').first();
    
    // Modal close icon
    this.modalCloseIcon = page.locator('.common-modal.modern-modal button.close, .modal button.close, button[aria-label="Close"]').first();
    
    // Validation error messages
    this.sourceInstanceError = page.locator('mat-error:has-text("Select Source Instance"), .error-message:has-text("Source Instance")').first();
    this.destinationInstanceError = page.locator('mat-error:has-text("Select Destination Instance"), .error-message:has-text("Destination Instance")').first();
    
    // Loader/spinner
    this.loader = page.locator('.loader, .spinner, [class*="loading"], .mat-progress-spinner').first();
    
    // Instance options in dropdown
    this.instanceOptions = page.locator('mat-option, .mat-mdc-option');
  }

  /**
   * Navigates to the Instance page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoInstance(baseUrl) {
    // Navigate to instance page
    await this.instanceLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.instanceLink.scrollIntoViewIfNeeded();
    await this.instanceLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Wait for instance page to load
    await this.instanceTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Instance page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnInstancePage = url.includes('/instance');
      const isTableVisible = await this.instanceTable.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnInstancePage && isTableVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Instance table is visible with data
   * @returns {Promise<{visible: boolean, hasData: boolean, rowCount: number}>}
   */
  async verifyTableWithData() {
    try {
      const isTableVisible = await this.instanceTable.isVisible({ timeout: 5000 }).catch(() => false);
      const rowCount = await this.tableRows.count();
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

  /**
   * Clicks the Select Headers button
   */
  async clickSelectHeaders() {
    await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectHeadersButton.scrollIntoViewIfNeeded();
    await this.selectHeadersButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Verifies the Select Headers dropdown is open
   * @returns {Promise<boolean>}
   */
  async isSelectHeadersDropdownOpen() {
    try {
      return await this.selectHeadersDropdown.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets all available header checkboxes
   * @returns {Promise<Array<{label: string, checked: boolean, element: any}>>}
   */
  async getAllHeaderOptions() {
    try {
      const checkboxes = await this.headerCheckboxes.all();
      const options = [];
      
      for (const checkbox of checkboxes) {
        const value = await checkbox.getAttribute('value');
        const checked = await checkbox.isChecked();
        const label = await checkbox.locator('..').locator('span.ms-2').textContent().catch(() => value || '');
        
        options.push({
          label: label.trim() || value || '',
          value: value || '',
          checked: checked,
          element: checkbox
        });
      }
      
      return options;
    } catch (error) {
      return [];
    }
  }

  /**
   * Unchecks all header checkboxes
   */
  async uncheckAllHeaders() {
    try {
      const checkboxes = await this.headerCheckboxes.all();
      
      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked();
        if (isChecked) {
          await checkbox.scrollIntoViewIfNeeded();
          await checkbox.uncheck();
          await this.page.waitForTimeout(200);
        }
      }
      
      // Wait for table to update
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to uncheck all headers: ${error.message}`);
    }
  }

  /**
   * Checks all header checkboxes
   */
  async checkAllHeaders() {
    try {
      const checkboxes = await this.headerCheckboxes.all();
      
      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
          await checkbox.scrollIntoViewIfNeeded();
          await checkbox.check();
          await this.page.waitForTimeout(200);
        }
      }
      
      // Wait for table to update
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to check all headers: ${error.message}`);
    }
  }

  /**
   * Verifies all table columns are hidden
   * @returns {Promise<{allHidden: boolean, visibleCount: number, messageVisible: boolean}>}
   */
  async verifyAllColumnsHidden() {
    try {
      const visibleHeaders = await this.allTableHeaders.filter(async (header) => {
        return await header.isVisible();
      });
      
      const visibleCount = await visibleHeaders.count();
      const allHidden = visibleCount === 0;
      
      // Check for no data message
      const messageVisible = await this.noDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        allHidden: allHidden,
        visibleCount: visibleCount,
        messageVisible: messageVisible
      };
    } catch {
      return {
        allHidden: false,
        visibleCount: -1,
        messageVisible: false
      };
    }
  }

  /**
   * Verifies all table columns are visible
   * @returns {Promise<{allVisible: boolean, visibleCount: number}>}
   */
  async verifyAllColumnsVisible() {
    try {
      const headerOptions = await this.getAllHeaderOptions();
      const expectedCount = headerOptions.length;
      
      const visibleHeaders = await this.allTableHeaders.filter(async (header) => {
        return await header.isVisible();
      });
      
      const visibleCount = await visibleHeaders.count();
      const allVisible = visibleCount >= expectedCount;
      
      return {
        allVisible: allVisible,
        visibleCount: visibleCount,
        expectedCount: expectedCount
      };
    } catch {
      return {
        allVisible: false,
        visibleCount: 0,
        expectedCount: 0
      };
    }
  }

  /**
   * Closes the Select Headers dropdown
   */
  async closeSelectHeadersDropdown() {
    try {
      // Press Escape to close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
      
      // Or click outside if needed
      if (await this.isSelectHeadersDropdownOpen()) {
        await this.page.click('body', { position: { x: 0, y: 0 } });
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      // Dropdown might already be closed
    }
  }

  /**
   * Gets the count of visible table headers
   * @returns {Promise<number>}
   */
  async getVisibleHeaderCount() {
    try {
      const count = await this.allTableHeaders.count();
      let visibleCount = 0;
      
      for (let i = 0; i < count; i++) {
        const header = this.allTableHeaders.nth(i);
        if (await header.isVisible()) {
          visibleCount++;
        }
      }
      
      return visibleCount;
    } catch {
      return 0;
    }
  }

  /**
   * Verifies selected headers persist after page refresh
   * @param {Array<string>} expectedHeaders - Array of header labels that should be visible
   * @returns {Promise<boolean>}
   */
  async verifyHeadersPersist(expectedHeaders) {
    try {
      const visibleHeaders = [];
      const count = await this.allTableHeaders.count();
      
      for (let i = 0; i < count; i++) {
        const header = this.allTableHeaders.nth(i);
        if (await header.isVisible()) {
          const text = await header.textContent();
          if (text) {
            visibleHeaders.push(text.trim());
          }
        }
      }
      
      // Check if all expected headers are visible
      const allPresent = expectedHeaders.every(header => 
        visibleHeaders.some(visible => visible.includes(header) || header.includes(visible))
      );
      
      return allPresent;
    } catch {
      return false;
    }
  }

  // ==================== PAGINATION METHODS ====================

  /**
   * Gets the current "Items per page" value
   * @returns {Promise<number>}
   */
  async getItemsPerPage() {
    try {
      const text = await this.itemsPerPageDropdown.textContent();
      const match = text?.match(/\d+/);
      return match ? parseInt(match[0]) : 20;
    } catch {
      // Try to get from select value
      try {
        const value = await this.itemsPerPageDropdown.getAttribute('ng-reflect-value');
        return value ? parseInt(value) : 20;
      } catch {
        return 20;
      }
    }
  }

  /**
   * Gets the pagination text (e.g., "1 – 20 of 100" or "Showing 1 to 20 of 9242 records")
   * @returns {Promise<string>}
   */
  async getPaginationText() {
    try {
      // Try total-data-info first (more descriptive)
      const totalInfo = await this.totalDataInfo.textContent();
      if (totalInfo && totalInfo.trim()) {
        return totalInfo.trim();
      }
      
      // Fallback to range label
      return await this.paginationText.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Changes the items per page
   * @param {number} itemsPerPage - Number of items per page (e.g., 20, 50)
   */
  async changeItemsPerPage(itemsPerPage) {
    try {
      // Step 1: Click the dropdown to open it
      await this.itemsPerPageDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.itemsPerPageDropdown.scrollIntoViewIfNeeded();
      await this.itemsPerPageDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Step 2: Wait for the options panel to open using the exact selector from HTML
      const optionsPanel = this.page.locator('div.mat-mdc-select-panel[role="listbox"]').first();
      await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      
      // Step 3: Find and click the option - use exact selectors from HTML
      // Try by ng-reflect-value first (most reliable)
      const optionByValue = this.page.locator(`mat-option[ng-reflect-value="${itemsPerPage}"]`).first();
      const optionCount = await optionByValue.count();
      
      if (optionCount > 0) {
        // Check if visible
        const isVisible = await optionByValue.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await optionByValue.scrollIntoViewIfNeeded();
          await optionByValue.click();
          await this.page.waitForTimeout(1000);
          
          // Wait for panel to close
          await optionsPanel.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
          
          // Verify the change took effect
          await this.page.waitForTimeout(1000);
          const currentValue = await this.getItemsPerPage();
          if (currentValue !== itemsPerPage) {
            console.log(`⚠ Items per page may not have changed immediately. Expected: ${itemsPerPage}, Got: ${currentValue}`);
          }
          return;
        }
      }
      
      // Fallback: Find by text content in span.mdc-list-item__primary-text
      const allOptions = this.page.locator('mat-option');
      const totalOptions = await allOptions.count();
      
      for (let i = 0; i < totalOptions; i++) {
        const option = allOptions.nth(i);
        const textSpan = option.locator('span.mdc-list-item__primary-text');
        const text = await textSpan.textContent().catch(() => '');
        if (text && text.trim() === String(itemsPerPage)) {
          await option.scrollIntoViewIfNeeded();
          await option.click();
          await this.page.waitForTimeout(1000);
          
          // Wait for panel to close
          await optionsPanel.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
          
          // Verify the change took effect
          await this.page.waitForTimeout(1000);
          return;
        }
      }
      
      // If we get here, option wasn't found
      await this.page.keyboard.press('Escape'); // Close dropdown
      throw new Error(`Option "${itemsPerPage}" not found in dropdown`);
      
    } catch (error) {
      // Try to close any open dropdowns
      await this.page.keyboard.press('Escape').catch(() => {});
      await this.page.waitForTimeout(500);
      throw new Error(`Failed to change items per page: ${error.message}`);
    }
  }

  /**
   * Clicks the Next pagination button
   */
  async clickNextButton() {
    try {
      const isEnabled = await this.nextButton.isEnabled();
      if (!isEnabled) {
        throw new Error('Next button is disabled');
      }
      await this.nextButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Next button: ${error.message}`);
    }
  }

  /**
   * Clicks the Previous pagination button
   */
  async clickPreviousButton() {
    try {
      const isEnabled = await this.previousButton.isEnabled();
      if (!isEnabled) {
        throw new Error('Previous button is disabled');
      }
      await this.previousButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Previous button: ${error.message}`);
    }
  }

  /**
   * Gets the first row's Subscription ID (or first cell text)
   * @returns {Promise<string>}
   */
  async getFirstRowId() {
    try {
      const firstRow = this.allTableRows.first();
      const firstCell = firstRow.locator('td').first();
      return await firstCell.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Gets the total number of rows currently displayed
   * @returns {Promise<number>}
   */
  async getCurrentRowCount() {
    try {
      return await this.allTableRows.count();
    } catch {
      return 0;
    }
  }

  // ==================== SEARCH METHODS ====================

  /**
   * Clicks the "Search Here" button to open search panel
   */
  async clickSearchHere() {
    try {
      // Check if form is already open
      const isFormVisible = await this.searchForm.isVisible({ timeout: 1000 }).catch(() => false);
      if (isFormVisible) {
        return; // Already open
      }
      
      await this.searchHereButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchHereButton.scrollIntoViewIfNeeded();
      await this.searchHereButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for form to be visible
      await this.searchForm.waitFor({ state: 'visible', timeout: 5000 });
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
   * Enters value in Plan Name search field
   * @param {string} value - Plan Name value
   */
  async enterPlanNameSearch(value) {
    try {
      await this.clickSearchHere();
      await this.planNameSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.planNameSearchField.scrollIntoViewIfNeeded();
      await this.planNameSearchField.clear();
      await this.planNameSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Plan Name: ${error.message}`);
    }
  }

  /**
   * Enters value in IP Address search field
   * @param {string} value - IP Address value
   */
  async enterIpAddressSearch(value) {
    try {
      await this.clickSearchHere();
      await this.ipAddressSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.ipAddressSearchField.scrollIntoViewIfNeeded();
      await this.ipAddressSearchField.clear();
      await this.ipAddressSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter IP Address: ${error.message}`);
    }
  }

  /**
   * Enters value in Drive Name search field
   * @param {string} value - Drive Name value
   */
  async enterDriveNameSearch(value) {
    try {
      await this.clickSearchHere();
      await this.driveNameSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.driveNameSearchField.scrollIntoViewIfNeeded();
      await this.driveNameSearchField.clear();
      await this.driveNameSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Drive Name: ${error.message}`);
    }
  }

  /**
   * Enters value in Server Name search field
   * @param {string} value - Server Name value
   */
  async enterServerNameSearch(value) {
    try {
      await this.clickSearchHere();
      await this.serverNameSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.serverNameSearchField.scrollIntoViewIfNeeded();
      await this.serverNameSearchField.clear();
      await this.serverNameSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Server Name: ${error.message}`);
    }
  }

  /**
   * Enters value in Customer Email search field
   * @param {string} value - Customer Email value
   */
  async enterCustomerEmailSearch(value) {
    try {
      await this.clickSearchHere();
      await this.customerEmailSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.customerEmailSearchField.scrollIntoViewIfNeeded();
      await this.customerEmailSearchField.clear();
      await this.customerEmailSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Customer Email: ${error.message}`);
    }
  }

  /**
   * Enters value in Partner Email search field
   * @param {string} value - Partner Email value
   */
  async enterPartnerEmailSearch(value) {
    try {
      await this.clickSearchHere();
      await this.partnerEmailSearchField.waitFor({ state: 'visible', timeout: 5000 });
      await this.partnerEmailSearchField.scrollIntoViewIfNeeded();
      await this.partnerEmailSearchField.clear();
      await this.partnerEmailSearchField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Partner Email: ${error.message}`);
    }
  }

  /**
   * Selects Instance Type from dropdown
   * @param {string} instanceType - Instance type (e.g., "Live Instance", "Trial Instance")
   */
  async selectInstanceType(instanceType) {
    try {
      await this.clickSearchHere();
      await this.instanceTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.instanceTypeDropdown.scrollIntoViewIfNeeded();
      await this.instanceTypeDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options panel to open
      const optionsPanel = this.page.locator('div.mat-mdc-select-panel, div[role="listbox"]').first();
      await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      
      const option = this.page.locator(`mat-option:has-text("${instanceType}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.scrollIntoViewIfNeeded();
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Instance Type: ${error.message}`);
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
      const count = await this.subIdCells.count();
      if (count > 0) {
        const text = await this.subIdCells.first().textContent();
        return text?.trim() || '';
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Plan Name from table (first row)
   * @returns {Promise<string>}
   */
  async getPlanNameFromTable() {
    try {
      const count = await this.planNameCells.count();
      if (count > 0) {
        const text = await this.planNameCells.first().textContent();
        return text?.trim() || '';
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets IP Address from table (first row)
   * @returns {Promise<string>}
   */
  async getIpAddressFromTable() {
    try {
      // Try to find IP pattern in table cells
      const rows = await this.allTableRows.count();
      for (let i = 0; i < Math.min(rows, 5); i++) {
        const row = this.allTableRows.nth(i);
        const cells = row.locator('td');
        const cellCount = await cells.count();
        for (let j = 0; j < cellCount; j++) {
          const cell = cells.nth(j);
          const text = await cell.textContent();
          // Check for IP pattern
          if (text && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(text.trim())) {
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
   * Gets Drive Name from table (first row)
   * @returns {Promise<string>}
   */
  async getDriveNameFromTable() {
    try {
      const count = await this.driveNameCells.count();
      if (count > 0) {
        const text = await this.driveNameCells.first().textContent();
        return text?.trim() || '';
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Server Name from table (first row)
   * @returns {Promise<string>}
   */
  async getServerNameFromTable() {
    try {
      const count = await this.serverNameCells.count();
      if (count > 0) {
        const text = await this.serverNameCells.first().textContent();
        return text?.trim() || '';
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Customer Email from table (first row)
   * @returns {Promise<string>}
   */
  async getCustomerEmailFromTable() {
    try {
      const count = await this.customerEmailCells.count();
      if (count > 0) {
        const text = await this.customerEmailCells.first().textContent();
        // Check if it's an email
        if (text && text.includes('@')) {
          return text.trim();
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets Partner Email from table (first row)
   * @returns {Promise<string>}
   */
  async getPartnerEmailFromTable() {
    try {
      const count = await this.partnerEmailCells.count();
      if (count > 0) {
        const text = await this.partnerEmailCells.first().textContent();
        // Check if it's an email
        if (text && text.includes('@')) {
          return text.trim();
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

  // ==================== CHANGE INSTANCE METHODS ====================

  /**
   * Clicks the "Change Instance" button
   */
  async clickChangeInstanceButton() {
    try {
      await this.changeInstanceButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.changeInstanceButton.scrollIntoViewIfNeeded();
      await this.changeInstanceButton.click();
      // Wait for modal to appear
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Change Instance button: ${error.message}`);
    }
  }

  /**
   * Verifies the Change Instance modal is open
   * @returns {Promise<boolean>}
   */
  async isChangeInstanceModalOpen() {
    try {
      // First, check if any modal is visible
      const anyModal = this.page.locator('.common-modal.modern-modal, .modal.show, .modal[style*="display"], [class*="modal"][style*="display"]').first();
      const hasAnyModal = await anyModal.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!hasAnyModal) {
        // Check if modal exists in DOM even if not visible
        const modalInDOM = await this.page.locator('.common-modal.modern-modal, .modal').count();
        if (modalInDOM > 0) {
          // Modal exists but might be hidden, wait a bit more
          await this.page.waitForTimeout(1000);
          return await anyModal.isVisible({ timeout: 2000 }).catch(() => false);
        }
        return false;
      }
      
      // Try multiple selectors to detect the specific Change Instance modal
      const selectors = [
        '.common-modal.modern-modal:has-text("Change User Instance")',
        '.common-modal:has-text("Change User Instance")',
        '.modal.show:has-text("Change User Instance")',
        '.modal:has-text("Change User Instance")',
        '[class*="modal"]:has-text("Change User Instance")'
      ];
      
      for (const selector of selectors) {
        const modal = this.page.locator(selector).first();
        const isVisible = await modal.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      
      // If no specific modal found but a modal is visible, check if it has the expected content
      if (hasAnyModal) {
        const modalText = await anyModal.textContent().catch(() => '');
        if (modalText && (modalText.includes('Change User Instance') || modalText.includes('Source Instance') || modalText.includes('Destination Instance'))) {
          // Update the modal locator to the found one
          this.changeInstanceModal = anyModal;
          return true;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Verifies all required elements in the Change Instance modal
   * @returns {Promise<{modalOpen: boolean, titleVisible: boolean, sourceDropdownVisible: boolean, destinationDropdownVisible: boolean, submitVisible: boolean, cancelVisible: boolean}>}
   */
  async verifyChangeInstanceModalElements() {
    try {
      // Wait a bit more for modal to fully render
      await this.page.waitForTimeout(1000);
      
      const modalOpen = await this.isChangeInstanceModalOpen();
      
      // If modal is detected, try to find elements within any visible modal
      let titleVisible = false;
      let sourceDropdownVisible = false;
      let destinationDropdownVisible = false;
      let submitVisible = false;
      let cancelVisible = false;
      
      if (modalOpen) {
        // Try to find title with multiple selectors
        const titleSelectors = [
          'p.modal-title-modern:has-text("Change User Instance")',
          '.modal-title:has-text("Change User Instance")',
          'h4:has-text("Change User Instance")',
          'h5:has-text("Change User Instance")',
          '*:has-text("Change User Instance")'
        ];
        for (const selector of titleSelectors) {
          titleVisible = await this.page.locator(selector).first().isVisible({ timeout: 1000 }).catch(() => false);
          if (titleVisible) break;
        }
        
        // Try to find source dropdown - look for app-select-search components in modal
        // Use the modal if it's visible, otherwise search the whole page
        const isModalVisible = await this.changeInstanceModal.isVisible({ timeout: 1000 }).catch(() => false);
        const modalContext = isModalVisible ? this.changeInstanceModal : this.page;
        
        // First, find all app-select-search components in the modal
        const allSelectSearch = modalContext.locator('app-select-search');
        const selectSearchCount = await allSelectSearch.count().catch(() => 0);
        
        // Try to find by label text (form-label or mat-label)
        for (let i = 0; i < selectSearchCount; i++) {
          const selectSearch = allSelectSearch.nth(i);
          // Check for form-label first (matches actual HTML)
          const labelText = await selectSearch.locator('label.form-label, mat-label, label').textContent().catch(() => '');
          
          if (labelText && (labelText.includes('source Instance') || labelText.includes('Source Instance'))) {
            const matSelect = selectSearch.locator('mat-select, select').first();
            sourceDropdownVisible = await matSelect.isVisible({ timeout: 2000 }).catch(() => false);
            if (sourceDropdownVisible) {
              this.sourceInstanceDropdown = matSelect;
              break;
            }
          }
        }
        
        // If not found by label, try to get first app-select-search
        if (!sourceDropdownVisible && selectSearchCount > 0) {
          const firstSelectSearch = allSelectSearch.first();
          const matSelect = firstSelectSearch.locator('mat-select, select').first();
          sourceDropdownVisible = await matSelect.isVisible({ timeout: 2000 }).catch(() => false);
          if (sourceDropdownVisible) {
            this.sourceInstanceDropdown = matSelect;
          }
        }
        
        // Try to find destination dropdown
        for (let i = 0; i < selectSearchCount; i++) {
          const selectSearch = allSelectSearch.nth(i);
          const labelText = await selectSearch.locator('label.form-label, mat-label, label').textContent().catch(() => '');
          
          if (labelText && (labelText.includes('Destination Instance') || labelText.includes('destination Instance'))) {
            const matSelect = selectSearch.locator('mat-select, select').first();
            destinationDropdownVisible = await matSelect.isVisible({ timeout: 2000 }).catch(() => false);
            if (destinationDropdownVisible) {
              this.destinationInstanceDropdown = matSelect;
              break;
            }
          }
        }
        
        // If not found by label, try to get second app-select-search
        if (!destinationDropdownVisible && selectSearchCount >= 2) {
          const secondSelectSearch = allSelectSearch.nth(1);
          const matSelect = secondSelectSearch.locator('mat-select, select').first();
          destinationDropdownVisible = await matSelect.isVisible({ timeout: 2000 }).catch(() => false);
          if (destinationDropdownVisible) {
            this.destinationInstanceDropdown = matSelect;
          }
        }
        
        // Try to find Submit button (matches HTML: button.search-btn)
        const submitSelectors = [
          'button.search-btn:has-text("Submit")',
          'button.btn.search-btn:has-text("Submit")',
          'button.primary-btn.btn-modal-primary:has-text("Submit")',
          'button[type="submit"]:has-text("Submit")',
          'button:has-text("Submit")'
        ];
        for (const selector of submitSelectors) {
          submitVisible = await modalContext.locator(selector).first().isVisible({ timeout: 1000 }).catch(() => false);
          if (submitVisible) {
            this.modalSubmitButton = modalContext.locator(selector).first();
            break;
          }
        }
        
        // Try to find Cancel button (matches HTML: button.reset-btn)
        const cancelSelectors = [
          'button.reset-btn:has-text("Cancel")',
          'button.btn.reset-btn:has-text("Cancel")',
          'button.secondary-btn.btn-modal-secondary:has-text("Cancel")',
          'button:has-text("Cancel")',
          'button[aria-label="Close"]'
        ];
        for (const selector of cancelSelectors) {
          cancelVisible = await modalContext.locator(selector).first().isVisible({ timeout: 1000 }).catch(() => false);
          if (cancelVisible) {
            this.modalCancelButton = modalContext.locator(selector).first();
            break;
          }
        }
      }
      
      return {
        modalOpen: modalOpen,
        titleVisible: titleVisible,
        sourceDropdownVisible: sourceDropdownVisible,
        destinationDropdownVisible: destinationDropdownVisible,
        submitVisible: submitVisible,
        cancelVisible: cancelVisible
      };
    } catch (error) {
      return {
        modalOpen: false,
        titleVisible: false,
        sourceDropdownVisible: false,
        destinationDropdownVisible: false,
        submitVisible: false,
        cancelVisible: false
      };
    }
  }

  /**
   * Clicks Submit button without selecting values (to test validation)
   */
  async clickModalSubmitWithoutSelection() {
    try {
      await this.modalSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.modalSubmitButton.scrollIntoViewIfNeeded();
      await this.modalSubmitButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Verifies validation error messages are shown
   * @returns {Promise<{sourceErrorVisible: boolean, destinationErrorVisible: boolean}>}
   */
  async verifyValidationErrors() {
    try {
      const sourceErrorVisible = await this.sourceInstanceError.isVisible({ timeout: 2000 }).catch(() => false);
      const destinationErrorVisible = await this.destinationInstanceError.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        sourceErrorVisible: sourceErrorVisible,
        destinationErrorVisible: destinationErrorVisible
      };
    } catch {
      return {
        sourceErrorVisible: false,
        destinationErrorVisible: false
      };
    }
  }

  /**
   * Selects a value from Source Instance dropdown
   * @param {string} instanceValue - Instance value to select (optional, selects first available if not provided)
   * @returns {Promise<string>} Selected value
   */
  async selectSourceInstance(instanceValue = null) {
    try {
      // Ensure dropdown is found - try to find it again if needed
      if (!(await this.sourceInstanceDropdown.isVisible({ timeout: 1000 }).catch(() => false))) {
        // Try to find it again
        const allSelectSearch = this.page.locator('app-select-search');
        const count = await allSelectSearch.count();
        for (let i = 0; i < count; i++) {
          const selectSearch = allSelectSearch.nth(i);
          const labelText = await selectSearch.locator('label.form-label, mat-label, label').textContent().catch(() => '');
          if (labelText && (labelText.includes('source Instance') || labelText.includes('Source Instance'))) {
            this.sourceInstanceDropdown = selectSearch.locator('mat-select, select').first();
            break;
          }
        }
      }
      
      await this.sourceInstanceDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.sourceInstanceDropdown.scrollIntoViewIfNeeded();
      await this.sourceInstanceDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options panel to open (for mat-select) or options to be available (for select)
      const tagName = await this.sourceInstanceDropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      const role = await this.sourceInstanceDropdown.getAttribute('role').catch(() => '');
      const isMatSelect = tagName === 'mat-select' || role === 'combobox';
      
      if (isMatSelect) {
        const optionsPanel = this.page.locator('div.mat-mdc-select-panel[role="listbox"]').first();
        await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      } else {
        // Regular select - wait for options to be available
        await this.page.waitForTimeout(500);
      }
      
      if (instanceValue) {
        // Select specific instance
        const option = this.page.locator(`mat-option:has-text("${instanceValue}"), option:has-text("${instanceValue}")`).first();
        await option.waitFor({ state: 'visible', timeout: 3000 });
        await option.scrollIntoViewIfNeeded();
        await option.click();
      } else {
        // Select first available option (skip "Select Source Instance" placeholder if exists)
        const allOptions = this.page.locator('mat-option, option');
        const count = await allOptions.count();
        if (count > 0) {
          // Try to find first non-disabled option
          for (let i = 0; i < count; i++) {
            const option = allOptions.nth(i);
            const isDisabled = await option.getAttribute('disabled').catch(() => null);
            if (!isDisabled) {
              const text = await option.textContent().catch(() => '');
              if (text && !text.includes('Select')) {
                await option.scrollIntoViewIfNeeded();
                await option.click();
                await this.page.waitForTimeout(500);
                return text.trim();
              }
            }
          }
          // If no suitable option found, click first option
          await allOptions.first().click();
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Get selected value
      const selectedText = await this.sourceInstanceDropdown.textContent().catch(() => '');
      return selectedText.trim();
    } catch (error) {
      // Close dropdown if open
      await this.page.keyboard.press('Escape').catch(() => {});
      throw new Error(`Failed to select Source Instance: ${error.message}`);
    }
  }

  /**
   * Selects a value from Destination Instance dropdown
   * @param {string} instanceValue - Instance value to select (optional, selects first available if not provided)
   * @param {string} excludeValue - Value to exclude (e.g., source instance value)
   * @returns {Promise<string>} Selected value
   */
  async selectDestinationInstance(instanceValue = null, excludeValue = null) {
    try {
      // Ensure dropdown is found - try to find it again if needed
      if (!(await this.destinationInstanceDropdown.isVisible({ timeout: 1000 }).catch(() => false))) {
        // Try to find it again
        const allSelectSearch = this.page.locator('app-select-search');
        const count = await allSelectSearch.count();
        for (let i = 0; i < count; i++) {
          const selectSearch = allSelectSearch.nth(i);
          const labelText = await selectSearch.locator('label.form-label, mat-label, label').textContent().catch(() => '');
          if (labelText && (labelText.includes('Destination Instance') || labelText.includes('destination Instance'))) {
            this.destinationInstanceDropdown = selectSearch.locator('mat-select, select').first();
            break;
          }
        }
        // If still not found, use second app-select-search
        if (!(await this.destinationInstanceDropdown.isVisible({ timeout: 1000 }).catch(() => false)) && count >= 2) {
          this.destinationInstanceDropdown = allSelectSearch.nth(1).locator('mat-select, select').first();
        }
      }
      
      await this.destinationInstanceDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.destinationInstanceDropdown.scrollIntoViewIfNeeded();
      await this.destinationInstanceDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options panel to open (for mat-select) or options to be available (for select)
      const tagName = await this.destinationInstanceDropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      const role = await this.destinationInstanceDropdown.getAttribute('role').catch(() => '');
      const isMatSelect = tagName === 'mat-select' || role === 'combobox';
      
      if (isMatSelect) {
        const optionsPanel = this.page.locator('div.mat-mdc-select-panel[role="listbox"]').first();
        await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      } else {
        // Regular select - wait for options to be available
        await this.page.waitForTimeout(500);
      }
      
      if (instanceValue) {
        // Select specific instance
        const option = this.page.locator(`mat-option:has-text("${instanceValue}"), option:has-text("${instanceValue}")`).first();
        await option.waitFor({ state: 'visible', timeout: 3000 });
        await option.scrollIntoViewIfNeeded();
        await option.click();
      } else {
        // Select first available option (skip excluded value and "Select Destination Instance" placeholder)
        const allOptions = this.page.locator('mat-option, option');
        const count = await allOptions.count();
        if (count > 0) {
          for (let i = 0; i < count; i++) {
            const option = allOptions.nth(i);
            const isDisabled = await option.getAttribute('disabled').catch(() => null);
            if (!isDisabled) {
              const text = await option.textContent().catch(() => '');
              if (text && !text.includes('Select') && (!excludeValue || !text.includes(excludeValue))) {
                await option.scrollIntoViewIfNeeded();
                await option.click();
                await this.page.waitForTimeout(500);
                return text.trim();
              }
            }
          }
          // If no suitable option found, click first option
          await allOptions.first().click();
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Get selected value
      const selectedText = await this.destinationInstanceDropdown.textContent().catch(() => '');
      return selectedText.trim();
    } catch (error) {
      // Close dropdown if open
      await this.page.keyboard.press('Escape').catch(() => {});
      throw new Error(`Failed to select Destination Instance: ${error.message}`);
    }
  }

  /**
   * Clicks Submit button after selecting both dropdowns
   * @returns {Promise<{clicked: boolean, loaderVisible: boolean}>}
   */
  async clickModalSubmit() {
    try {
      await this.modalSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.modalSubmitButton.scrollIntoViewIfNeeded();
      await this.modalSubmitButton.click();
      
      // Check for loader
      const loaderVisible = await this.loader.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Wait for modal to close or loader to appear
      await this.page.waitForTimeout(2000);
      
      return {
        clicked: true,
        loaderVisible: loaderVisible
      };
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Closes the Change Instance modal
   */
  async closeChangeInstanceModal() {
    try {
      // Try Cancel button first
      const cancelVisible = await this.modalCancelButton.isVisible({ timeout: 1000 }).catch(() => false);
      if (cancelVisible) {
        await this.modalCancelButton.click();
        await this.page.waitForTimeout(500);
      } else {
        // Try close icon
        const closeVisible = await this.modalCloseIcon.isVisible({ timeout: 1000 }).catch(() => false);
        if (closeVisible) {
          await this.modalCloseIcon.click();
          await this.page.waitForTimeout(500);
        } else {
          // Press Escape
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
        }
      }
    } catch (error) {
      // Modal might already be closed
    }
  }

  /**
   * Verifies modal is closed
   * @returns {Promise<boolean>}
   */
  async isChangeInstanceModalClosed() {
    try {
      return !(await this.changeInstanceModal.isVisible({ timeout: 1000 }).catch(() => false));
    } catch {
      return true;
    }
  }

  /**
   * Verifies no error message is displayed
   * @returns {Promise<boolean>}
   */
  async verifyNoError() {
    try {
      const errorVisible = await this.page.locator('.error-message, .toast-error, .alert-danger').isVisible({ timeout: 1000 }).catch(() => false);
      return !errorVisible;
    } catch {
      return true;
    }
  }
}

module.exports = { InstancePage };

