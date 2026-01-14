class AccountManagerReportPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div class="dropdown-sidebar-items dropdown-section"> with title "MRR Reports"
    this.mrrReportsMenu = page.locator('div.dropdown-sidebar-items:has-text("MRR Reports"), .dropdown-section:has-text("MRR Reports")').first();
    
    // Account Manager Report option in dropdown
    // HTML: <li routerlink="/mrr-reports/accountManagerReport"> Account Manager </li>
    this.accountManagerReportOption = page.locator('li[ng-reflect-router-link="/mrr-reports/accountManagerReport"], li[routerlink="/mrr-reports/accountManagerReport"], li:has-text("Account Manager"):not(:has-text("MRR Report")):not(:has-text("Partner Report"))').first();
    
    // Page elements
    // HTML: Page heading "Account Manager Report"
    this.pageHeading = page.locator('h1:has-text("Account Manager Report"), h2:has-text("Account Manager Report"), .heading:has-text("Account Manager Report"), *:has-text("Account Manager Report"):not(div.dropdown-sidebar-items):not(li):not(script):not(style)').first();
    this.pageWrapper = page.locator('app-root, app-account-manager-report, [class*="account-manager-report"], [class*="accountManagerReport"]').first();
    
    // Filter elements
    // Account Manager dropdown - Material Design mat-select
    // HTML: <mat-select role="combobox" multiple>
    this.accountManagerDropdownButton = page.locator('mat-select').filter({ has: page.locator('mat-label:has-text("Account Manager")') }).first();
    this.accountManagerMatSelect = page.locator('mat-select[aria-labelledby*="Account Manager"], mat-select').filter({ has: page.locator('mat-label:has-text("Account Manager")') }).first();
    
    // Account Manager dropdown panel (Material Design overlay panel when open)
    this.accountManagerDropdownPanel = page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
    
    // Search field in dropdown panel
    this.accountManagerSearchField = page.locator('div.cdk-overlay-pane input[placeholder*="Search Here"], div.cdk-overlay-pane input[placeholder*="Search"], input[placeholder*="Search Here"]').first();
    
    // Select All mat-option in Material Design panel
    this.accountManagerSelectAllOption = page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
    
    // All account manager mat-options in panel (excluding Select All)
    this.accountManagerOptions = page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
    
    // All mat-options in Account Manager dropdown panel (including Select All)
    this.allAccountManagerOptions = page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
    
    // OK button in dropdown panel
    this.accountManagerOkButton = page.locator('div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button:has-text("OK"), div.mat-mdc-select-panel button:has-text("Ok")').first();
    
    // Cancel button in dropdown panel
    this.accountManagerCancelButton = page.locator('div.cdk-overlay-pane button:has-text("Cancel"), div.mat-mdc-select-panel button:has-text("Cancel")').first();
    
    // Date picker elements
    // HTML: <input matinput placeholder="MM/YYYY" mat-datepicker>
    this.datePickerInput = page.locator('input[placeholder="MM/YYYY"], input[placeholder*="month"], input[placeholder*="year"], input.mat-datepicker-input').first();
    this.datePickerLabel = page.locator('mat-label:has-text("Choose a month and year")').first();
    this.datePickerCalendar = page.locator('mat-datepicker').first();
    
    // Date picker calendar panel (when open)
    this.datePickerPanel = page.locator('div.cdk-overlay-pane mat-calendar, div.mat-datepicker-popup, div.cdk-overlay-pane [class*="calendar"]').first();
    
    // Year selection in calendar
    this.yearOptions = page.locator('div.cdk-overlay-pane button[class*="year"], div.cdk-overlay-pane td[class*="year"], div.cdk-overlay-pane [class*="year-cell"]');
    
    // Month selection in calendar
    this.monthOptions = page.locator('div.cdk-overlay-pane button[class*="month"], div.cdk-overlay-pane td[class*="month"], div.cdk-overlay-pane [class*="month-cell"]');
    
    // Tab buttons
    this.mrrTab = page.locator('button:has-text("MRR"), .btn:has-text("MRR")').first();
    this.subscriptionTab = page.locator('button:has-text("Subscription"), .btn:has-text("Subscription")').first();
    
    // Export button
    this.exportButton = page.locator('button:has-text("EXPORT TO EXCEL"), button:has-text("Export"), .btn:has-text("EXPORT")').first();
    
    // Table elements
    this.reportTable = page.locator('table, [class*="table"], [role="table"]').first();
    
    // Account Manager column cells (clickable values)
    // These are typically in the Account Manager column and are clickable links
    this.accountManagerColumnCells = page.locator('table td, [role="cell"]').filter({ 
      hasText: /.+/ 
    }).filter({ 
      hasNot: page.locator(':has-text("S. No."), :has-text("Account Manager"), :has-text("No of Partners"), :has-text("New Business MRR"), :has-text("Expan")') 
    });
    
    // Account Manager column values (specifically targeting clickable account manager names)
    // These are usually links or clickable elements within the Account Manager column
    this.accountManagerColumnValues = page.locator('table td a, table td[class*="pointer"], table td[class*="link"], table td span[class*="pointer"], table td span[class*="link"]').filter({ 
      hasText: /.+/ 
    });
  }

  /**
   * Navigates to the Account Manager Report page.
   * @param {string} baseUrl - The base URL of the application.
   */
  async gotoAccountManagerReport(baseUrl) {
    try {
      // First, try clicking the MRR Reports menu to expand dropdown
      await this.mrrReportsMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.mrrReportsMenu.scrollIntoViewIfNeeded();
      await this.mrrReportsMenu.click();
      await this.page.waitForTimeout(2000);
      
      // Then click on Account Manager Report option - be very specific
      // Wait for the dropdown items to be visible
      await this.page.waitForTimeout(1000);
      
      // Use more specific locator targeting the exact routerlink
      const accountManagerLink = this.page.locator('li[ng-reflect-router-link="/mrr-reports/accountManagerReport"]').first();
      const isVisible = await accountManagerLink.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isVisible) {
        await accountManagerLink.scrollIntoViewIfNeeded();
        await accountManagerLink.click();
      } else {
        // Fallback: find by text but exclude other options
        const accountManagerByText = this.page.locator('li:has-text("Account Manager")').filter({ 
          hasNot: this.page.locator(':has-text("MRR Report"), :has-text("Partner Report")') 
        }).first();
        await accountManagerByText.waitFor({ state: 'visible', timeout: 10000 });
        await accountManagerByText.scrollIntoViewIfNeeded();
        await accountManagerByText.click();
      }
      
      // Wait for navigation
      await this.page.waitForTimeout(3000);
      await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If clicking fails, try direct navigation
      try {
        const url = baseUrl.replace('/login', '').replace('/login/', '');
        const accountManagerReportUrl = url.endsWith('/') ? `${url}mrr-reports/accountManagerReport` : `${url}/mrr-reports/accountManagerReport`;
        await this.page.goto(accountManagerReportUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
      } catch (navError) {
        throw new Error(`Failed to navigate to Account Manager Report page: ${error.message}`);
      }
    }
  }

  /**
   * Verifies if the Account Manager Report page is loaded.
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Check URL
      const currentUrl = this.page.url();
      if (currentUrl.includes('accountManagerReport') || currentUrl.includes('account-manager-report')) {
        // URL matches, now check for page elements
        let retries = 3;
        while (retries > 0) {
          const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
          if (isHeadingVisible) {
            return true;
          }
          
          // Fallback: check for other page elements
          const isTableVisible = await this.reportTable.isVisible({ timeout: 3000 }).catch(() => false);
          const isAccountManagerDropdownVisible = await this.accountManagerDropdown.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isTableVisible || isAccountManagerDropdownVisible) {
            return true;
          }
          
          await this.page.waitForTimeout(2000);
          retries--;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Retrieves the page heading text.
   * @returns {Promise<string>}
   */
  async getPageHeading() {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
      const headingText = await this.pageHeading.textContent();
      return headingText ? headingText.trim() : '';
    } catch {
      return '';
    }
  }

  // ==================== ACCOUNT MANAGER DROPDOWN METHODS ====================

  /**
   * Clicks the Account Manager dropdown to open it
   */
  async clickAccountManagerDropdown() {
    try {
      // Material Design mat-select component
      // First, find the mat-form-field that contains "Account Manager" label
      const matFormField = this.page.locator('mat-form-field').filter({ 
        has: this.page.locator('mat-label:has-text("Account Manager")') 
      }).first();
      
      // Then find the mat-select within that form field
      const matSelect = matFormField.locator('mat-select').first();
      
      // Wait for it to be visible
      await matSelect.waitFor({ state: 'visible', timeout: 10000 });
      await matSelect.scrollIntoViewIfNeeded();
      
      // Click to open the dropdown
      await matSelect.click();
      
      // Wait for Material Design overlay panel to open
      await this.page.waitForTimeout(2000);
      
      // Verify the overlay panel is open
      const overlayPanel = this.page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
      await overlayPanel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
        // If overlay doesn't appear, try clicking again
        console.log('Overlay not visible, retrying click...');
        return matSelect.click();
      });
    } catch (error) {
      throw new Error(`Failed to click Account Manager dropdown: ${error.message}`);
    }
  }

  /**
   * Verifies if Account Manager dropdown panel is open
   * @returns {Promise<boolean>}
   */
  async isAccountManagerDropdownOpen() {
    try {
      // Check for Material Design overlay panel
      const overlayPanel = this.page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
      const isPanelVisible = await overlayPanel.isVisible({ timeout: 3000 }).catch(() => false);
      if (isPanelVisible) {
        return true;
      }
      
      // Check for search field or Select All mat-option visibility
      const isSearchVisible = await this.accountManagerSearchField.isVisible({ timeout: 3000 }).catch(() => false);
      const isSelectAllVisible = await this.accountManagerSelectAllOption.isVisible({ timeout: 3000 }).catch(() => false);
      return isSearchVisible || isSelectAllVisible;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the "Select All" mat-option in Account Manager dropdown
   */
  async clickSelectAllAccountManager() {
    try {
      // Wait for overlay panel to be visible
      await this.page.waitForTimeout(1000);
      
      // Find Select All mat-option in the Material Design overlay panel
      const selectAllOption = this.page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
      
      await selectAllOption.waitFor({ state: 'visible', timeout: 10000 });
      await selectAllOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await selectAllOption.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click Select All option: ${error.message}`);
    }
  }

  /**
   * Verifies if "Select All" mat-option is selected
   * @returns {Promise<boolean>}
   */
  async isSelectAllAccountManagerChecked() {
    try {
      const selectAllOption = this.page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
      // Check if the mat-option has aria-selected="true" or if the pseudo-checkbox is checked
      const ariaSelected = await selectAllOption.getAttribute('aria-selected');
      if (ariaSelected === 'true') {
        return true;
      }
      // Alternative: check the pseudo-checkbox state
      const pseudoCheckbox = selectAllOption.locator('mat-pseudo-checkbox').first();
      const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state');
      return checkboxState === 'checked';
    } catch {
      return false;
    }
  }

  /**
   * Gets all account manager mat-options (excluding Select All)
   * @returns {Promise<Array>} Array of mat-option locators
   */
  async getAllAccountManagerCheckboxes() {
    try {
      // Get all mat-options in the Material Design overlay panel, excluding Select All
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      return allOptions;
    } catch {
      return this.page.locator('mat-option');
    }
  }

  /**
   * Verifies if all account manager mat-options are selected (excluding Select All)
   * @returns {Promise<boolean>}
   */
  async areAllAccountManagerCheckboxesChecked() {
    try {
      // Get all mat-options in the Material Design overlay panel
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      const count = await allOptions.count();
      
      if (count <= 1) {
        // Only Select All option exists, or no options
        return false;
      }
      
      // Check all options except the first one (Select All)
      for (let i = 1; i < count; i++) {
        const option = allOptions.nth(i);
        const isVisible = await option.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          // Check aria-selected attribute
          const ariaSelected = await option.getAttribute('aria-selected');
          if (ariaSelected !== 'true') {
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
   * Unchecks all account manager mat-options
   */
  async uncheckAllAccountManagerCheckboxes() {
    try {
      // First uncheck Select All
      const isSelectAllChecked = await this.isSelectAllAccountManagerChecked();
      if (isSelectAllChecked) {
        await this.clickSelectAllAccountManager();
        await this.page.waitForTimeout(500);
      }
      
      // Then uncheck individual mat-options in the overlay panel
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      const count = await allOptions.count();
      
      // Start from index 1 to skip Select All option
      for (let i = 1; i < count; i++) {
        const option = allOptions.nth(i);
        const isVisible = await option.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          // Check if option is selected
          const ariaSelected = await option.getAttribute('aria-selected');
          if (ariaSelected === 'true') {
            await option.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(200);
            await option.click();
            await this.page.waitForTimeout(200);
          }
        }
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to uncheck all account manager options: ${error.message}`);
    }
  }

  /**
   * Verifies if all account manager mat-options are unchecked (excluding Select All)
   * @returns {Promise<boolean>}
   */
  async areAllAccountManagerCheckboxesUnchecked() {
    try {
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      const count = await allOptions.count();
      
      if (count <= 1) {
        // Only Select All option exists, or no options
        return true;
      }
      
      // Check all options except the first one (Select All)
      for (let i = 1; i < count; i++) {
        const option = allOptions.nth(i);
        const isVisible = await option.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          // Check aria-selected attribute
          const ariaSelected = await option.getAttribute('aria-selected');
          if (ariaSelected === 'true') {
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
   * Clicks the OK button in Account Manager dropdown
   */
  async clickAccountManagerOk() {
    try {
      // Find OK button in the Material Design overlay panel
      const okButton = this.page.locator('div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button:has-text("OK"), div.mat-mdc-select-panel button:has-text("Ok")').first();
      await okButton.waitFor({ state: 'visible', timeout: 10000 });
      await okButton.scrollIntoViewIfNeeded();
      await okButton.click();
      await this.page.waitForTimeout(2000); // Wait for overlay to close
    } catch (error) {
      throw new Error(`Failed to click Account Manager OK button: ${error.message}`);
    }
  }

  // ==================== EXPORT BUTTON METHODS ====================

  /**
   * Verifies if Export to Excel button is visible
   * @returns {Promise<boolean>}
   */
  async isExportButtonVisible() {
    try {
      const isVisible = await this.exportButton.isVisible({ timeout: 5000 });
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies if Export to Excel button is enabled/clickable
   * @returns {Promise<boolean>}
   */
  async isExportButtonEnabled() {
    try {
      const isEnabled = await this.exportButton.isEnabled();
      return isEnabled;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Export to Excel button and waits for download
   * @returns {Promise<import('@playwright/test').Download>}
   */
  async clickExportButton() {
    try {
      // Wait for the button to be visible and enabled
      await this.exportButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.exportButton.scrollIntoViewIfNeeded();
      
      // Set up download listener before clicking
      const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 });
      
      // Click the export button
      await this.exportButton.click();
      
      // Wait for download to start
      const download = await downloadPromise;
      
      return download;
    } catch (error) {
      throw new Error(`Failed to click Export button or download not triggered: ${error.message}`);
    }
  }

  /**
   * Gets the Export button text
   * @returns {Promise<string>}
   */
  async getExportButtonText() {
    try {
      await this.exportButton.waitFor({ state: 'visible', timeout: 10000 });
      const buttonText = await this.exportButton.textContent();
      return buttonText ? buttonText.trim() : '';
    } catch {
      return '';
    }
  }

  // ==================== TABLE INTERACTION METHODS ====================

  /**
   * Gets all Account Manager column values from the table
   * @returns {Promise<Array>} Array of account manager names
   */
  async getAccountManagerColumnValues() {
    try {
      await this.reportTable.waitFor({ state: 'visible', timeout: 10000 });
      const values = [];
      
      // Try to find clickable account manager values
      const clickableValues = await this.accountManagerColumnValues.all();
      for (const value of clickableValues) {
        const text = await value.textContent();
        if (text && text.trim() && !text.trim().match(/^\d+$/) && text.trim() !== '-') {
          values.push(text.trim());
        }
      }
      
      // If no clickable values found, try getting from table cells
      if (values.length === 0) {
        const cells = await this.accountManagerColumnCells.all();
        for (let i = 0; i < Math.min(cells.length, 10); i++) {
          const text = await cells[i].textContent();
          if (text && text.trim() && !text.trim().match(/^\d+$/) && text.trim() !== '-') {
            values.push(text.trim());
          }
        }
      }
      
      return values;
    } catch {
      return [];
    }
  }

  /**
   * Clicks on an Account Manager column value
   * @param {string} accountManagerName - The name of the account manager to click (optional, clicks first available if not provided)
   * @returns {Promise<void>}
   */
  async clickAccountManagerColumnValue(accountManagerName = null) {
    try {
      await this.reportTable.waitFor({ state: 'visible', timeout: 10000 });
      
      let targetElement = null;
      
      if (accountManagerName) {
        // Find the specific account manager by name
        // Try clickable elements first
        const clickableElement = this.page.locator(`table td a:has-text("${accountManagerName}"), table td[class*="pointer"]:has-text("${accountManagerName}"), table td span[class*="pointer"]:has-text("${accountManagerName}")`).first();
        const isVisible = await clickableElement.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (isVisible) {
          targetElement = clickableElement;
        } else {
          // Fallback: find in table cells
          const cellElement = this.page.locator(`table td:has-text("${accountManagerName}")`).first();
          const isCellVisible = await cellElement.isVisible({ timeout: 3000 }).catch(() => false);
          if (isCellVisible) {
            targetElement = cellElement;
          }
        }
      } else {
        // Click the first available account manager value
        const firstClickable = this.accountManagerColumnValues.first();
        const isVisible = await firstClickable.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (isVisible) {
          targetElement = firstClickable;
        } else {
          // Fallback: get first non-numeric, non-dash cell
          const cells = await this.accountManagerColumnCells.all();
          for (const cell of cells) {
            const text = await cell.textContent();
            if (text && text.trim() && !text.trim().match(/^\d+$/) && text.trim() !== '-') {
              targetElement = cell;
              break;
            }
          }
        }
      }
      
      if (!targetElement) {
        throw new Error('No account manager value found to click');
      }
      
      await targetElement.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await targetElement.click();
      
      // Wait for navigation
      await this.page.waitForTimeout(3000);
      await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to click Account Manager column value: ${error.message}`);
    }
  }

  /**
   * Verifies if current page is MRR Report page
   * @returns {Promise<boolean>}
   */
  async isMRRReportPage() {
    try {
      // Check URL
      const currentUrl = this.page.url();
      if (currentUrl.includes('mrrReport') || currentUrl.includes('mrr-report')) {
        return true;
      }
      
      // Check for MRR Report page heading
      const mrrReportHeading = this.page.locator('h1:has-text("MRR Report"), h2:has-text("MRR Report"), *:has-text("MRR Report"):not(div.dropdown-sidebar-items):not(li):not(script):not(style)').first();
      const isHeadingVisible = await mrrReportHeading.isVisible({ timeout: 5000 }).catch(() => false);
      
      return isHeadingVisible;
    } catch {
      return false;
    }
  }

  // ==================== DATE PICKER METHODS ====================

  /**
   * Formats month to two digits (e.g., 1 -> "01", 12 -> "12")
   * @param {number} month - The month (1-12)
   * @returns {string} Formatted month string
   */
  formatMonth(month) {
    return month.toString().padStart(2, '0');
  }

  /**
   * Formats date as MM/YYYY
   * @param {number} month - The month (1-12)
   * @param {number} year - The year
   * @returns {string} Formatted date string (MM/YYYY)
   */
  formatDate(month, year) {
    return `${this.formatMonth(month)}/${year}`;
  }

  /**
   * Sets the date picker by typing directly into the input field
   * @param {number} month - The month to select (1-12)
   * @param {number} year - The year to select
   */
  async setDatePicker(month, year) {
    try {
      await this.datePickerInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.datePickerInput.scrollIntoViewIfNeeded();
      
      // Check if date is prefilled
      const currentValue = await this.datePickerInput.inputValue();
      console.log(`Current date picker value: "${currentValue}"`);
      
      // Clear the input if it has a value
      if (currentValue && currentValue.trim()) {
        await this.datePickerInput.click();
        await this.page.waitForTimeout(300);
        // Select all and clear
        await this.page.keyboard.press('Control+A');
        await this.page.waitForTimeout(200);
        await this.page.keyboard.press('Delete');
        await this.page.waitForTimeout(300);
      }
      
      // Format the date as MM/YYYY
      const dateString = this.formatDate(month, year);
      console.log(`Setting date picker to: "${dateString}"`);
      
      // Type the date
      await this.datePickerInput.fill(dateString);
      await this.page.waitForTimeout(500);
      
      // Press Enter to confirm
      await this.datePickerInput.press('Enter');
      await this.page.waitForTimeout(1000);
      
      // Verify the value was set
      const newValue = await this.datePickerInput.inputValue();
      console.log(`Date picker value after setting: "${newValue}"`);
    } catch (error) {
      throw new Error(`Failed to set date picker to ${month}/${year}: ${error.message}`);
    }
  }

  /**
   * Opens the date picker calendar (alternative method if direct input doesn't work)
   */
  async openDatePicker() {
    try {
      await this.datePickerInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.datePickerInput.scrollIntoViewIfNeeded();
      await this.datePickerInput.click();
      await this.page.waitForTimeout(1000); // Wait for calendar to open
      
      // Verify calendar panel is open
      const isPanelOpen = await this.datePickerPanel.isVisible({ timeout: 5000 }).catch(() => false);
      if (!isPanelOpen) {
        // Try clicking again
        await this.datePickerInput.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      throw new Error(`Failed to open date picker: ${error.message}`);
    }
  }

  /**
   * Selects a year in the date picker calendar (alternative method)
   * @param {number} year - The year to select (e.g., 2024)
   */
  async selectYear(year) {
    try {
      // Wait for calendar panel to be visible
      await this.datePickerPanel.waitFor({ state: 'visible', timeout: 10000 });
      
      // Find and click the year
      const yearButton = this.page.locator(`div.cdk-overlay-pane button:has-text("${year}"), div.cdk-overlay-pane td:has-text("${year}"), div.cdk-overlay-pane [class*="year-cell"]:has-text("${year}")`).first();
      
      await yearButton.waitFor({ state: 'visible', timeout: 10000 });
      await yearButton.scrollIntoViewIfNeeded();
      await yearButton.click();
      await this.page.waitForTimeout(1000); // Wait for month selection to appear
    } catch (error) {
      throw new Error(`Failed to select year ${year}: ${error.message}`);
    }
  }

  /**
   * Selects a month in the date picker calendar (alternative method)
   * @param {number} month - The month to select (1-12, where 1 = January)
   */
  async selectMonth(month) {
    try {
      // Month names array
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[month - 1];
      
      // Find and click the month
      const monthButton = this.page.locator(`div.cdk-overlay-pane button:has-text("${monthName}"), div.cdk-overlay-pane td:has-text("${monthName}"), div.cdk-overlay-pane [class*="month-cell"]:has-text("${monthName}")`).first();
      
      await monthButton.waitFor({ state: 'visible', timeout: 10000 });
      await monthButton.scrollIntoViewIfNeeded();
      await monthButton.click();
      await this.page.waitForTimeout(2000); // Wait for calendar to close and table to update
    } catch (error) {
      throw new Error(`Failed to select month ${month}: ${error.message}`);
    }
  }

  /**
   * Gets the current value from the date picker input
   * @returns {Promise<string>}
   */
  async getDatePickerValue() {
    try {
      await this.datePickerInput.waitFor({ state: 'visible', timeout: 10000 });
      const value = await this.datePickerInput.inputValue();
      return value || '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies if the table has data rows
   * @returns {Promise<boolean>}
   */
  async hasTableData() {
    try {
      await this.reportTable.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get table rows (excluding header)
      const rows = this.reportTable.locator('tbody tr, tr:not(thead tr)');
      const rowCount = await rows.count();
      
      return rowCount > 0;
    } catch {
      return false;
    }
  }

  /**
   * Gets the number of data rows in the table
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      await this.reportTable.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get table rows (excluding header)
      const rows = this.reportTable.locator('tbody tr, tr:not(thead tr)');
      const rowCount = await rows.count();
      
      return rowCount;
    } catch {
      return 0;
    }
  }

  /**
   * Waits for table to update after date selection
   * @param {number} timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForTableUpdate(timeout = 10000) {
    try {
      // Wait for any loading indicators to disappear
      await this.page.waitForTimeout(2000);
      
      // Wait for table to be visible and stable
      await this.reportTable.waitFor({ state: 'visible', timeout });
      
      // Additional wait for data to load
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log(`Warning: Table update wait completed with potential timeout: ${error.message}`);
    }
  }
}

module.exports = { AccountManagerReportPage };

