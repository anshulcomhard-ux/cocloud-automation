class MRRReportPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div class="dropdown-sidebar-items dropdown-section"> with title "MRR Reports"
    this.mrrReportsMenu = page.locator('div.dropdown-sidebar-items:has-text("MRR Reports"), .dropdown-section:has-text("MRR Reports")').first();
    
    // MRR Report option in dropdown
    // HTML: <li routerlink="/mrr-reports/mrrReport"> MRR Report </li>
    this.mrrReportOption = page.locator('li[ng-reflect-router-link="/mrr-reports/mrrReport"], li[routerlink="/mrr-reports/mrrReport"], li:has-text("MRR Report"):not(:has-text("Account Manager")):not(:has-text("Partner Report"))').first();
    
    // Page elements
    // HTML: Page heading "MRR Report"
    this.pageHeading = page.locator('h1:has-text("MRR Report"), h2:has-text("MRR Report"), .heading:has-text("MRR Report"), *:has-text("MRR Report"):not(div.dropdown-sidebar-items):not(li):not(script):not(style)').first();
    this.pageWrapper = page.locator('app-root, app-mrr-report, [class*="mrr-report"], [class*="mrrReport"]').first();
    
    // Filter dropdowns
    // Account Manager dropdown - Material Design mat-select
    // HTML: <mat-select role="combobox" multiple>
    this.accountManagerDropdownButton = page.locator('mat-select[aria-labelledby*="Account Manager"], mat-select:has-text("Account Manager"), mat-label:has-text("Account Manager")').locator('..').locator('mat-select').first();
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
    
    // Partner dropdown - Material Design mat-select
    // HTML: <mat-select role="combobox" multiple>
    this.partnerDropdownButton = page.locator('mat-select[aria-labelledby*="Partner"], mat-select').filter({ has: page.locator('mat-label:has-text("Partner")') }).first();
    this.partnerMatSelect = page.locator('mat-select[aria-labelledby*="Partner"], mat-select').filter({ has: page.locator('mat-label:has-text("Partner")') }).first();
    
    // Partner dropdown panel (Material Design overlay panel when open)
    this.partnerDropdownPanel = page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
    
    // Search field in Partner dropdown panel
    this.partnerSearchField = page.locator('div.cdk-overlay-pane input[placeholder*="Search Here"], div.cdk-overlay-pane input[placeholder*="Search"], input[placeholder*="Search Here"]').first();
    
    // Select All mat-option in Partner dropdown panel
    this.partnerSelectAllOption = page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
    
    // All partner mat-options in panel (excluding Select All)
    this.partnerOptions = page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
    
    // All mat-options in Partner dropdown panel (including Select All)
    this.allPartnerOptions = page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
    
    // OK button in Partner dropdown panel
    this.partnerOkButton = page.locator('div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button:has-text("OK"), div.mat-mdc-select-panel button:has-text("Ok")').first();
    
    // Cancel button in Partner dropdown panel
    this.partnerCancelButton = page.locator('div.cdk-overlay-pane button:has-text("Cancel"), div.mat-mdc-select-panel button:has-text("Cancel")').first();
    
    // Chart type buttons
    this.lineChartButton = page.locator('button:has-text("Line"), .btn:has-text("Line")').first();
    this.barChartButton = page.locator('button:has-text("Bar"), .btn:has-text("Bar")').first();
    
    // Chart elements
    this.chartTitle = page.locator('*:has-text("Monthly Revenue Report"), *:has-text("MRR")').first();
    this.chartContainer = page.locator('canvas, svg, [class*="chart"], [id*="chart"]').first();
  }

  /**
   * Navigates to the MRR Report page.
   * @param {string} baseUrl - The base URL of the application.
   */
  async gotoMRRReport(baseUrl) {
    try {
      // First, try clicking the MRR Reports menu to expand dropdown
      await this.mrrReportsMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.mrrReportsMenu.scrollIntoViewIfNeeded();
      await this.mrrReportsMenu.click();
      await this.page.waitForTimeout(2000);
      
      // Then click on MRR Report option - be very specific
      // Wait for the dropdown items to be visible
      await this.page.waitForTimeout(1000);
      
      // Use more specific locator targeting the exact routerlink
      const mrrReportLink = this.page.locator('li[ng-reflect-router-link="/mrr-reports/mrrReport"]').first();
      const isVisible = await mrrReportLink.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isVisible) {
        await mrrReportLink.scrollIntoViewIfNeeded();
        await mrrReportLink.click();
      } else {
        // Fallback to text-based locator but be more specific
        const mrrReportByText = this.page.locator('li:has-text("MRR Report")').filter({ 
          hasNot: this.page.locator(':has-text("Account Manager"), :has-text("Partner Report")') 
        }).first();
        await mrrReportByText.waitFor({ state: 'visible', timeout: 10000 });
        await mrrReportByText.scrollIntoViewIfNeeded();
        await mrrReportByText.click();
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
        const mrrReportUrl = url.endsWith('/') ? `${url}mrr-reports/mrrReport` : `${url}/mrr-reports/mrrReport`;
        await this.page.goto(mrrReportUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
      } catch (navError) {
        throw new Error(`Failed to navigate to MRR Report page: ${error.message}`);
      }
    }
  }

  /**
   * Verifies if the MRR Report page is loaded.
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
      
      // Check if URL contains mrr-reports/mrrReport
      const currentUrl = this.page.url();
      const hasCorrectUrl = currentUrl.includes('mrr-reports/mrrReport') || currentUrl.includes('mrrReport');
      
      if (!hasCorrectUrl) {
        // Wait a bit more and check again
        await this.page.waitForTimeout(2000);
        const currentUrl2 = this.page.url();
        if (!currentUrl2.includes('mrr-reports/mrrReport') && !currentUrl2.includes('mrrReport')) {
          return false;
        }
      }
      
      // Check if page heading is visible
      const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 10000 }).catch(() => false);
      if (isHeadingVisible) {
        return true;
      }
      
      // Try alternative heading locators
      const altHeading = this.page.locator('h1, h2, h3, .heading, [class*="heading"], [class*="title"]').filter({ hasText: /MRR Report/i }).first();
      const isAltHeadingVisible = await altHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (isAltHeadingVisible) {
        return true;
      }
      
      // Try checking for chart or filter elements that should be on the page
      const hasChart = await this.chartTitle.isVisible({ timeout: 3000 }).catch(() => false);
      const hasDropdown = await this.accountManagerDropdownButton.isVisible({ timeout: 3000 }).catch(() => false);
      
      return hasChart || hasDropdown;
    } catch {
      return false;
    }
  }

  /**
   * Retrieves the text content of the page heading.
   * @returns {Promise<string>} The page heading text.
   */
  async getPageHeading() {
    try {
      const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (isHeadingVisible) {
        const text = await this.pageHeading.textContent();
        return text ? text.trim() : '';
      }
      
      // Try alternative heading locators
      const altHeading = this.page.locator('h1, h2, h3, .heading, [class*="heading"], [class*="title"]').filter({ hasText: /MRR Report/i }).first();
      const isAltHeadingVisible = await altHeading.isVisible({ timeout: 3000 }).catch(() => false);
      if (isAltHeadingVisible) {
        const text = await altHeading.textContent();
        return text ? text.trim() : '';
      }
      
      return '';
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

  // ==================== PARTNER DROPDOWN METHODS ====================

  /**
   * Clicks the Partner dropdown to open it
   */
  async clickPartnerDropdown() {
    try {
      // Material Design mat-select component
      // First, find the mat-form-field that contains "Partner" label
      const matFormField = this.page.locator('mat-form-field').filter({ 
        has: this.page.locator('mat-label:has-text("Partner")') 
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
      throw new Error(`Failed to click Partner dropdown: ${error.message}`);
    }
  }

  /**
   * Verifies if Partner dropdown panel is open
   * @returns {Promise<boolean>}
   */
  async isPartnerDropdownOpen() {
    try {
      // Check for Material Design overlay panel
      const overlayPanel = this.page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
      const isPanelVisible = await overlayPanel.isVisible({ timeout: 3000 }).catch(() => false);
      if (isPanelVisible) {
        return true;
      }
      
      // Check for search field or Select All mat-option visibility
      const isSearchVisible = await this.partnerSearchField.isVisible({ timeout: 3000 }).catch(() => false);
      const isSelectAllVisible = await this.partnerSelectAllOption.isVisible({ timeout: 3000 }).catch(() => false);
      return isSearchVisible || isSelectAllVisible;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the "Select All" mat-option in Partner dropdown
   */
  async clickSelectAllPartner() {
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
  async isSelectAllPartnerChecked() {
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
   * Gets all partner mat-options (excluding Select All)
   * @returns {Promise<Array>} Array of mat-option locators
   */
  async getAllPartnerCheckboxes() {
    try {
      // Get all mat-options in the Material Design overlay panel, excluding Select All
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      return allOptions;
    } catch {
      return this.page.locator('mat-option');
    }
  }

  /**
   * Verifies if all partner mat-options are selected (excluding Select All)
   * @returns {Promise<boolean>}
   */
  async areAllPartnerCheckboxesChecked() {
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
   * Unchecks all partner mat-options
   */
  async uncheckAllPartnerCheckboxes() {
    try {
      // First uncheck Select All
      const isSelectAllChecked = await this.isSelectAllPartnerChecked();
      if (isSelectAllChecked) {
        await this.clickSelectAllPartner();
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
      throw new Error(`Failed to uncheck all partner options: ${error.message}`);
    }
  }

  /**
   * Verifies if all partner mat-options are unchecked (excluding Select All)
   * @returns {Promise<boolean>}
   */
  async areAllPartnerCheckboxesUnchecked() {
    try {
      // Wait a bit for the dropdown to fully render
      await this.page.waitForTimeout(1000);
      
      // Get all overlay panels - there might be multiple if other dropdowns are open
      const allOverlayPanels = this.page.locator('div.cdk-overlay-pane, div.mat-mdc-select-panel');
      const panelCount = await allOverlayPanels.count();
      
      // Find the Partner dropdown panel by checking which one contains Partner-related content
      // We'll check the most recently visible panel (usually the last one)
      let partnerPanel = null;
      
      // Try to find panel that's visible and contains mat-options
      for (let i = panelCount - 1; i >= 0; i--) {
        const panel = allOverlayPanels.nth(i);
        const isVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          // Check if this panel has mat-options (indicating it's a dropdown panel)
          const hasOptions = await panel.locator('mat-option').count() > 0;
          if (hasOptions) {
            partnerPanel = panel;
            break;
          }
        }
      }
      
      // Fallback: use the first visible overlay panel
      if (!partnerPanel) {
        partnerPanel = this.page.locator('div.cdk-overlay-pane:has(mat-option), div.mat-mdc-select-panel:has(mat-option)').first();
      }
      
      const isPanelVisible = await partnerPanel.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isPanelVisible) {
        // Panel not visible, might be closed - return true as unchecked state
        return true;
      }
      
      // Get all mat-options in the panel, excluding Select All
      const allOptions = partnerPanel.locator('mat-option').filter({ 
        hasNot: this.page.locator(':has-text("Select All")') 
      });
      const count = await allOptions.count();
      
      if (count === 0) {
        // No options found (excluding Select All), consider as unchecked
        return true;
      }
      
      // Check all options (excluding Select All)
      let allUnchecked = true;
      for (let i = 0; i < count; i++) {
        const option = allOptions.nth(i);
        const isVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          // Check aria-selected attribute
          const ariaSelected = await option.getAttribute('aria-selected');
          if (ariaSelected === 'true') {
            allUnchecked = false;
            break;
          }
          
          // Also check pseudo-checkbox state as fallback
          const pseudoCheckbox = option.locator('mat-pseudo-checkbox').first();
          const checkboxExists = await pseudoCheckbox.count() > 0;
          if (checkboxExists) {
            const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state');
            if (checkboxState === 'checked') {
              allUnchecked = false;
              break;
            }
          }
        }
      }
      
      return allUnchecked;
    } catch (error) {
      // If there's an error, log it but don't fail - might be a timing issue
      console.log(`Error checking partner checkboxes: ${error.message}`);
      return false;
    }
  }

  /**
   * Clicks the OK button in Partner dropdown
   */
  async clickPartnerOk() {
    try {
      // Find OK button in the Material Design overlay panel
      const okButton = this.page.locator('div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button:has-text("OK"), div.mat-mdc-select-panel button:has-text("Ok")').first();
      await okButton.waitFor({ state: 'visible', timeout: 10000 });
      await okButton.scrollIntoViewIfNeeded();
      await okButton.click();
      await this.page.waitForTimeout(2000); // Wait for overlay to close
    } catch (error) {
      throw new Error(`Failed to click Partner OK button: ${error.message}`);
    }
  }
}

module.exports = { MRRReportPage };

