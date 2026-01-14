class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: Sidebar menu item for Dashboard
    this.dashboardLink = page.locator('div.nav-link.sidebar-items[routerlink="/dashboard"], div.nav-link.sidebar-items:has-text("Dashboard"), a[routerlink="/dashboard"], a[href*="/dashboard"], .sidebar-items:has-text("Dashboard"), *:has-text("Dashboard"):has([routerlink="/dashboard"])').first();
    
    // Page elements
    // HTML: <p class="sub fs-5 mb-3">Dashboard & Statistics</p>
    this.pageHeading = page.locator('p.sub.fs-5.mb-3:has-text("Dashboard"), p.sub.fs-5.mb-3:has-text("Dashboard & Statistics"), p.sub.fs-5.mb-3:has-text("Dashboard and Statistics"), p.sub:has-text("Dashboard & Statistics"), p.sub:has-text("Dashboard")').first();
    this.pageTitle = page.locator('p.sub.fs-5.mb-3:has-text("Dashboard"), p.sub.fs-5.mb-3:has-text("Dashboard & Statistics"), h1:has-text("Dashboard"), h2:has-text("Dashboard")').first();
    this.pageWrapper = page.locator('app-root, app-dashboard, [class*="dashboard"]').first();
    
    // Dashboard content sections
    this.dashboardContainer = page.locator('app-root, app-dashboard').first();
    this.dashboardSidebar = page.locator('div[class*="sidebar"], nav[class*="sidebar"], aside[class*="sidebar"]').first();
    
    // Account Manager dropdown locators
    // HTML: mat-select with label "Account Manager"
    // Strategy 1: Find mat-form-field with mat-label containing "Account Manager", then find mat-select inside
    // Strategy 2: Find mat-select by aria-labelledby containing "Account Manager"
    // Strategy 3: Find mat-select that is a sibling or child of mat-label with "Account Manager"
    this.accountManagerFormField = page.locator('mat-form-field:has(mat-label:has-text("Account Manager"))').first();
    this.accountManagerDropdown = page.locator('mat-form-field:has(mat-label:has-text("Account Manager")) mat-select, mat-select[aria-labelledby*="Account Manager"], mat-select[aria-labelledby*="mat-mdc-form-field-label"]').first();
    this.accountManagerMatSelect = this.accountManagerDropdown;
    
    // Account Manager dropdown panel (Material Design overlay panel when open)
    this.accountManagerDropdownPanel = page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
    
    // Select All mat-option in Material Design panel
    this.accountManagerSelectAllOption = page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
    
    // All account manager mat-options in panel (excluding Select All)
    this.accountManagerOptions = page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
    
    // OK button in dropdown panel
    // HTML: <button class="btn ok-btn">Ok</button>
    this.accountManagerOkButton = page.locator('div.cdk-overlay-pane button.ok-btn:has-text("Ok"), div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button.ok-btn, div.mat-mdc-select-panel button.ok-btn, button.ok-btn').first();
    
    // Partner dropdown locators
    // HTML: mat-select with label "Partner"
    this.partnerFormField = page.locator('mat-form-field:has(mat-label:has-text("Partner"))').first();
    this.partnerDropdown = page.locator('mat-form-field:has(mat-label:has-text("Partner")) mat-select, mat-select[aria-labelledby*="Partner"], mat-select[aria-labelledby*="mat-mdc-form-field-label"]').first();
    this.partnerMatSelect = this.partnerDropdown;
    
    // Partner dropdown panel (Material Design overlay panel when open)
    this.partnerDropdownPanel = page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
    
    // Select All mat-option in Material Design panel for Partner
    this.partnerSelectAllOption = page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
    
    // All partner mat-options in panel (excluding Select All)
    this.partnerOptions = page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
    
    // OK button in Partner dropdown panel
    this.partnerOkButton = page.locator('div.cdk-overlay-pane button.ok-btn:has-text("Ok"), div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button.ok-btn, div.mat-mdc-select-panel button.ok-btn, button.ok-btn').first();
    
    // Timeline Filter dropdown locators
    // HTML: mat-select with label "Timeline Filter" or containing timeline options
    this.timelineFilterFormField = page.locator('mat-form-field:has(mat-label:has-text("Timeline Filter")), mat-form-field:has(mat-label:has-text("Timeline"))').first();
    this.timelineFilterDropdown = page.locator('mat-form-field:has(mat-label:has-text("Timeline Filter")) mat-select, mat-form-field:has(mat-label:has-text("Timeline")) mat-select, mat-select[aria-labelledby*="Timeline"], mat-select').filter({ has: page.locator('mat-option:has-text("This Week"), mat-option:has-text("Last Week"), mat-option:has-text("This Month")') }).first();
    
    // Timeline Filter dropdown panel (Material Design overlay panel when open)
    this.timelineFilterDropdownPanel = page.locator('div.cdk-overlay-pane.mat-mdc-select-panel, div.mat-mdc-select-panel[role="listbox"]').first();
    
    // All timeline filter mat-options in panel
    this.timelineFilterOptions = page.locator('div.cdk-overlay-pane.mat-mdc-select-panel mat-option, div.mat-mdc-select-panel[role="listbox"] mat-option, mat-option[ng-reflect-value*="week"], mat-option[ng-reflect-value*="month"], mat-option[ng-reflect-value*="year"]');

    // Renewal Summary table locators
    // HTML: table with header columns: S. No., Renewals, Subscriptions, Users, Amount
    this.renewalSummarySection = page
      .locator('div.card-body:has-text("Renewal Summary"), *:has-text("Renewal Summary")')
      .first();
    this.renewalSummaryTable = this.renewalSummarySection
      .locator('table:has(th:has-text("Renewals")):has(th:has-text("Subscriptions")):has(th:has-text("Users")):has(th:has-text("Amount"))')
      .first();
    this.totalRenewalsRow = this.renewalSummaryTable
      .locator('tr:has(td:has-text("Total Renewals")), tr:has(th:has-text("Total Renewals"))')
      .first();
    this.totalRenewalsLink = this.totalRenewalsRow
      .locator('span.custom-arrow:has-text("Total Renewals"), td:has-text("Total Renewals"), th:has-text("Total Renewals")')
      .first();

    // Upcoming Renewals row and link
    this.upcomingRenewalsRow = this.renewalSummaryTable
      .locator('tr:has(td:has-text("Upcoming Renewals")), tr:has(th:has-text("Upcoming Renewals"))')
      .first();
    this.upcomingRenewalsLink = this.upcomingRenewalsRow
      .locator('span.custom-arrow:has-text("Upcoming Renewals"), td:has-text("Upcoming Renewals"), th:has-text("Upcoming Renewals")')
      .first();

    // Total Subscriptions card on Subscriptions page
    // HTML: <div class="report-card"> ... <span class="report-heading">Total Subscriptions</span> ... </div>
    this.totalSubscriptionsCard = page
      .locator('div.report-card:has(span.report-heading:has-text("Total Subscriptions"))')
      .first();
    
    // Trial Signups link
    // HTML: <p class="card-heading card-heading1 mb-1 fw-medium cursor-pointer text-decoration-underline">Trial Signups</p>
    // Also try parent container that might have the click handler
    this.trialSignupsLink = page
      .locator('p.card-heading.card-heading1:has-text("Trial Signups"), p.card-heading:has-text("Trial Signups"), p.cursor-pointer.text-decoration-underline:has-text("Trial Signups"), p:has-text("Trial Signups")')
      .first();
    this.trialSignupsContainer = page
      .locator('div.col-xl-3.col-sm-3.box-1:has(p:has-text("Trial Signups")), div:has(p.card-heading:has-text("Trial Signups"))')
      .first();
    
    // Trial Expired link
    // HTML: <p class="card-heading card-heading2 mb-1 fw-medium">Trial Expired</p>
    // Container: <div class="col-xl-3 col-sm-3 box-2">
    // Use same pattern as Trial Signups
    this.trialExpiredLink = page
      .locator('p.card-heading.card-heading2:has-text("Trial Expired"), p.card-heading:has-text("Trial Expired"), p.cursor-pointer.text-decoration-underline:has-text("Trial Expired") , p:has-text("Trial Expired")')
      .first();
    this.trialExpiredContainer = page
      .locator('div.col-xl-3.col-sm-3.box-2:has(p:has-text("Trial Expired")), div:has(p.card-heading:has-text("Trial Expired"))')
      .first();
    
    // Trial to Paid link
    // HTML: <p class="card-heading card-heading1 mb-1 fw-medium cursor-pointer text-decoration-underline">Trial to Paid</p>
    // Also try parent container that might have the click handler
    this.trialToPaidLink = page
      .locator('p.card-heading.card-heading1:has-text("Trial to Paid"), p.card-heading:has-text("Trial to Paid"), p.cursor-pointer.text-decoration-underline:has-text("Trial to Paid"), p:has-text("Trial to Paid")')
      .first();
    this.trialToPaidContainer = page
      .locator('div.col-xl-3.col-sm-3.box-1:has(p:has-text("Trial to Paid")), div:has(p.card-heading:has-text("Trial to Paid"))')
      .first();
    
    // Live Trial link
    this.liveTrialLink = page
      .locator('p.card-heading.card-heading1:has-text("Live Trial"), p.card-heading:has-text("Live Trial"), p.cursor-pointer.text-decoration-underline:has-text("Live Trial"), p:has-text("Live Trial")')
      .first();
    this.liveTrialContainer = page
      .locator('div.col-xl-3.col-sm-3.box-1:has(p:has-text("Live Trial")), div:has(p.card-heading:has-text("Live Trial"))')
      .first();
  }

  /**
   * Navigates to the Dashboard page
   * @param {string} baseUrl - The base URL of the admin portal
   * @returns {Promise<void>}
   */
  async gotoDashboard(baseUrl) {
    try {
      const dashboardUrl = baseUrl.includes('/login') ? baseUrl.replace('/login', '/dashboard') : `${baseUrl}/dashboard`;
      await this.page.goto(dashboardUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000); // Wait for Angular to render
    } catch (error) {
      throw new Error(`Failed to navigate to Dashboard page: ${error.message}`);
    }
  }

  /**
   * Clicks on the Dashboard menu item in the sidebar
   * @returns {Promise<void>}
   */
  async clickDashboardMenuItem() {
    try {
      await this.dashboardLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.dashboardLink.scrollIntoViewIfNeeded();
      await this.dashboardLink.click();
      await this.page.waitForTimeout(2000); // Wait for navigation
    } catch (error) {
      throw new Error(`Failed to click Dashboard menu item: ${error.message}`);
    }
  }

  /**
   * Checks if the Dashboard page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Check if page heading is visible
      const headingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (headingVisible) {
        return true;
      }
      
      // Fallback: check if dashboard container is visible
      const containerVisible = await this.pageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      return containerVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the page heading text
   * @returns {Promise<string>} The page heading text or empty string if not found
   */
  async getPageHeading() {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
      const headingText = await this.pageHeading.textContent();
      return headingText ? headingText.trim() : '';
    } catch (error) {
      console.log(`Error getting page heading: ${error.message}`);
      // Try alternative locators
      const altHeading = this.page.locator('p.sub.fs-5.mb-3, p.sub:has-text("Dashboard"), h1:has-text("Dashboard"), h2:has-text("Dashboard")').first();
      const isVisible = await altHeading.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const text = await altHeading.textContent();
        return text ? text.trim() : '';
      }
      return '';
    }
  }

  /**
   * Clicks the Account Manager dropdown to open it
   * @returns {Promise<void>}
   */
  async clickAccountManagerDropdown() {
    try {
      // Check if dropdown is already open
      const isOpen = await this.isAccountManagerDropdownOpen();
      if (isOpen) {
        return;
      }
      
      // Try multiple locator strategies
      const strategies = [
        // Strategy 1: mat-form-field with mat-label containing "Account Manager", then mat-select inside
        this.page.locator('mat-form-field:has(mat-label:has-text("Account Manager")) mat-select').first(),
        // Strategy 2: mat-select by aria-labelledby containing "Account Manager"
        this.page.locator('mat-select[aria-labelledby*="Account Manager"]').first(),
        // Strategy 3: Find mat-form-field first, then mat-select inside it
        this.accountManagerFormField.locator('mat-select').first(),
        // Strategy 4: mat-select that is a sibling of mat-label with "Account Manager"
        this.page.locator('mat-form-field:has(mat-label:has-text("Account Manager"))').locator('mat-select').first(),
        // Strategy 5: Generic mat-select with multiple attribute (fallback - use with caution)
        this.page.locator('mat-select.multi-select[multiple]').first()
      ];
      
      let clicked = false;
      for (const strategy of strategies) {
        try {
          const isVisible = await strategy.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await strategy.scrollIntoViewIfNeeded();
            await strategy.click();
            await this.page.waitForTimeout(1000); // Wait for panel to open
            
            // Verify panel opened
            const panelVisible = await this.accountManagerDropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
            if (panelVisible) {
              clicked = true;
              break;
            }
          }
        } catch (err) {
          // Try next strategy
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click Account Manager dropdown with any strategy');
      }
      
      // Wait for dropdown panel to be visible
      await this.accountManagerDropdownPanel.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Account Manager dropdown: ${error.message}`);
    }
  }

  /**
   * Checks if the Account Manager dropdown is open
   * @returns {Promise<boolean>}
   */
  async isAccountManagerDropdownOpen() {
    try {
      const overlayPanel = this.page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
      const isVisible = await overlayPanel.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        // Also check for Select All option visibility
        const isSelectAllVisible = await this.accountManagerSelectAllOption.isVisible({ timeout: 2000 }).catch(() => false);
        return isSelectAllVisible;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the "Select All" mat-option in Account Manager dropdown
   * @returns {Promise<void>}
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
   * Clicks the OK button in Account Manager dropdown panel
   * @returns {Promise<void>}
   */
  async clickAccountManagerOkButton() {
    try {
      // Wait for OK button to be visible
      const okButton = this.page.locator('div.cdk-overlay-pane button.ok-btn:has-text("Ok"), div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button.ok-btn, button.ok-btn').first();
      await okButton.waitFor({ state: 'visible', timeout: 10000 });
      await okButton.scrollIntoViewIfNeeded();
      await okButton.click();
      await this.page.waitForTimeout(1000); // Wait for panel to close
    } catch (error) {
      throw new Error(`Failed to click OK button: ${error.message}`);
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
          
          // Alternative: check the pseudo-checkbox state
          const pseudoCheckbox = option.locator('mat-pseudo-checkbox').first();
          const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state').catch(() => null);
          if (checkboxState && checkboxState !== 'checked') {
            return false;
          }
        }
      }
      
      return true;
    } catch (error) {
      console.log(`Error checking if all checkboxes are checked: ${error.message}`);
      return false;
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
   * Verifies if all account manager mat-options are unchecked (excluding Select All)
   * @returns {Promise<boolean>}
   */
  async areAllAccountManagerCheckboxesUnchecked() {
    try {
      // Get all mat-options in the Material Design overlay panel
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      const count = await allOptions.count();
      
      if (count <= 1) {
        // Only Select All option exists, or no options - consider as unchecked
        return true;
      }
      
      // Check all options except the first one (Select All)
      for (let i = 1; i < count; i++) {
        const option = allOptions.nth(i);
        const isVisible = await option.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          // Check aria-selected attribute - should be false or null
          const ariaSelected = await option.getAttribute('aria-selected');
          if (ariaSelected === 'true') {
            return false;
          }
          
          // Alternative: check the pseudo-checkbox state - should not be 'checked'
          const pseudoCheckbox = option.locator('mat-pseudo-checkbox').first();
          const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state').catch(() => null);
          if (checkboxState === 'checked') {
            return false;
          }
        }
      }
      
      return true;
    } catch (error) {
      console.log(`Error checking if all checkboxes are unchecked: ${error.message}`);
      return false;
    }
  }

  /**
   * Verifies if "Select All" mat-option is unchecked
   * @returns {Promise<boolean>}
   */
  async isSelectAllAccountManagerUnchecked() {
    try {
      const selectAllOption = this.page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
      // Check if the mat-option has aria-selected="false" or if the pseudo-checkbox is unchecked
      const ariaSelected = await selectAllOption.getAttribute('aria-selected');
      if (ariaSelected === 'true') {
        return false;
      }
      // Alternative: check the pseudo-checkbox state
      const pseudoCheckbox = selectAllOption.locator('mat-pseudo-checkbox').first();
      const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state');
      return checkboxState !== 'checked';
    } catch {
      return true; // If we can't find it, assume unchecked
    }
  }

  /**
   * Clicks the Partner dropdown to open it
   * @returns {Promise<void>}
   */
  async clickPartnerDropdown() {
    try {
      // Check if dropdown is already open
      const isOpen = await this.isPartnerDropdownOpen();
      if (isOpen) {
        return;
      }
      
      // Try multiple locator strategies
      const strategies = [
        // Strategy 1: mat-form-field with mat-label containing "Partner", then mat-select inside
        this.page.locator('mat-form-field:has(mat-label:has-text("Partner")) mat-select').first(),
        // Strategy 2: mat-select by aria-labelledby containing "Partner"
        this.page.locator('mat-select[aria-labelledby*="Partner"]').first(),
        // Strategy 3: Find mat-form-field first, then mat-select inside it
        this.partnerFormField.locator('mat-select').first(),
        // Strategy 4: mat-select that is a sibling of mat-label with "Partner"
        this.page.locator('mat-form-field:has(mat-label:has-text("Partner"))').locator('mat-select').first(),
        // Strategy 5: Generic mat-select with multiple attribute (fallback - use with caution)
        this.page.locator('mat-select.multi-select[multiple]').first()
      ];
      
      let clicked = false;
      for (const strategy of strategies) {
        try {
          const isVisible = await strategy.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await strategy.scrollIntoViewIfNeeded();
            await strategy.click();
            await this.page.waitForTimeout(1000); // Wait for panel to open
            
            // Verify panel opened
            const panelVisible = await this.partnerDropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
            if (panelVisible) {
              clicked = true;
              break;
            }
          }
        } catch (err) {
          // Try next strategy
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click Partner dropdown with any strategy');
      }
      
      // Wait for dropdown panel to be visible
      await this.partnerDropdownPanel.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Partner dropdown: ${error.message}`);
    }
  }

  /**
   * Checks if the Partner dropdown is open
   * @returns {Promise<boolean>}
   */
  async isPartnerDropdownOpen() {
    try {
      const overlayPanel = this.page.locator('div.cdk-overlay-pane:has-text("Select All"), div.cdk-overlay-pane:has-text("Search Here"), div.mat-mdc-select-panel').first();
      const isVisible = await overlayPanel.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        // Also check for Select All option visibility
        const isSelectAllVisible = await this.partnerSelectAllOption.isVisible({ timeout: 2000 }).catch(() => false);
        return isSelectAllVisible;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the "Select All" mat-option in Partner dropdown
   * @returns {Promise<void>}
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
   * Clicks the OK button in Partner dropdown panel
   * @returns {Promise<void>}
   */
  async clickPartnerOkButton() {
    try {
      // Wait for OK button to be visible
      const okButton = this.page.locator('div.cdk-overlay-pane button.ok-btn:has-text("Ok"), div.cdk-overlay-pane button:has-text("Ok"), div.cdk-overlay-pane button.ok-btn, button.ok-btn').first();
      await okButton.waitFor({ state: 'visible', timeout: 10000 });
      await okButton.scrollIntoViewIfNeeded();
      await okButton.click();
      await this.page.waitForTimeout(1000); // Wait for panel to close
    } catch (error) {
      throw new Error(`Failed to click OK button: ${error.message}`);
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
          
          // Alternative: check the pseudo-checkbox state
          const pseudoCheckbox = option.locator('mat-pseudo-checkbox').first();
          const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state').catch(() => null);
          if (checkboxState && checkboxState !== 'checked') {
            return false;
          }
        }
      }
      
      return true;
    } catch (error) {
      console.log(`Error checking if all checkboxes are checked: ${error.message}`);
      return false;
    }
  }

  /**
   * Verifies if all partner mat-options are unchecked (excluding Select All)
   * @returns {Promise<boolean>}
   */
  async areAllPartnerCheckboxesUnchecked() {
    try {
      // Get all mat-options in the Material Design overlay panel
      const allOptions = this.page.locator('div.cdk-overlay-pane mat-option, div.mat-mdc-select-panel mat-option');
      const count = await allOptions.count();
      
      if (count <= 1) {
        // Only Select All option exists, or no options - consider as unchecked
        return true;
      }
      
      // Check all options except the first one (Select All)
      for (let i = 1; i < count; i++) {
        const option = allOptions.nth(i);
        const isVisible = await option.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          // Check aria-selected attribute - should be false or null
          const ariaSelected = await option.getAttribute('aria-selected');
          if (ariaSelected === 'true') {
            return false;
          }
          
          // Alternative: check the pseudo-checkbox state - should not be 'checked'
          const pseudoCheckbox = option.locator('mat-pseudo-checkbox').first();
          const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state').catch(() => null);
          if (checkboxState === 'checked') {
            return false;
          }
        }
      }
      
      return true;
    } catch (error) {
      console.log(`Error checking if all checkboxes are unchecked: ${error.message}`);
      return false;
    }
  }

  /**
   * Verifies if "Select All" mat-option is selected for Partner
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
   * Verifies if "Select All" mat-option is unchecked for Partner
   * @returns {Promise<boolean>}
   */
  async isSelectAllPartnerUnchecked() {
    try {
      const selectAllOption = this.page.locator('div.cdk-overlay-pane mat-option:has-text("Select All"), div.mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[ng-reflect-value="Select All"]').first();
      // Check if the mat-option has aria-selected="false" or if the pseudo-checkbox is unchecked
      const ariaSelected = await selectAllOption.getAttribute('aria-selected');
      if (ariaSelected === 'true') {
        return false;
      }
      // Alternative: check the pseudo-checkbox state
      const pseudoCheckbox = selectAllOption.locator('mat-pseudo-checkbox').first();
      const checkboxState = await pseudoCheckbox.getAttribute('ng-reflect-state');
      return checkboxState !== 'checked';
    } catch {
      return true; // If we can't find it, assume unchecked
    }
  }

  /**
   * Clicks the Timeline Filter dropdown to open it
   * @returns {Promise<void>}
   */
  async clickTimelineFilterDropdown() {
    try {
      // Check if dropdown is already open
      const isOpen = await this.isTimelineFilterDropdownOpen();
      if (isOpen) {
        return;
      }
      
      // Try multiple locator strategies
      const strategies = [
        // Strategy 1: mat-form-field with mat-label containing "Timeline Filter", then mat-select inside
        this.page.locator('mat-form-field:has(mat-label:has-text("Timeline Filter")) mat-select').first(),
        // Strategy 2: mat-form-field with mat-label containing "Timeline", then mat-select inside
        this.page.locator('mat-form-field:has(mat-label:has-text("Timeline")) mat-select').first(),
        // Strategy 3: mat-select that contains timeline options
        this.page.locator('mat-select').filter({ has: this.page.locator('mat-option:has-text("This Week"), mat-option:has-text("Last Week"), mat-option:has-text("This Month")') }).first(),
        // Strategy 4: Find mat-form-field first, then mat-select inside it
        this.timelineFilterFormField.locator('mat-select').first(),
        // Strategy 5: Generic mat-select (fallback)
        this.page.locator('mat-select').first()
      ];
      
      let clicked = false;
      for (const strategy of strategies) {
        try {
          const isVisible = await strategy.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await strategy.scrollIntoViewIfNeeded();
            await strategy.click();
            await this.page.waitForTimeout(1000); // Wait for panel to open
            
            // Verify panel opened
            const panelVisible = await this.timelineFilterDropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
            if (panelVisible) {
              clicked = true;
              break;
            }
          }
        } catch (err) {
          // Try next strategy
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click Timeline Filter dropdown with any strategy');
      }
      
      // Wait for dropdown panel to be visible
      await this.timelineFilterDropdownPanel.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500); // Additional wait for options to render
    } catch (error) {
      throw new Error(`Failed to click Timeline Filter dropdown: ${error.message}`);
    }
  }

  /**
   * Checks if the Timeline Filter dropdown is open
   * @returns {Promise<boolean>}
   */
  async isTimelineFilterDropdownOpen() {
    try {
      const overlayPanel = this.page.locator('div.cdk-overlay-pane.mat-mdc-select-panel, div.mat-mdc-select-panel[role="listbox"]').first();
      const isVisible = await overlayPanel.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        // Also check for timeline options visibility
        const hasOptions = await this.timelineFilterOptions.first().isVisible({ timeout: 2000 }).catch(() => false);
        return hasOptions;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets all timeline filter options
   * @returns {Promise<Array<string>>} Array of option texts
   */
  async getAllTimelineFilterOptions() {
    try {
      const options = this.page.locator('div.cdk-overlay-pane.mat-mdc-select-panel mat-option, div.mat-mdc-select-panel[role="listbox"] mat-option');
      const count = await options.count();
      const optionTexts = [];
      
      for (let i = 0; i < count; i++) {
        const option = options.nth(i);
        const isVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          const text = await option.locator('span.mdc-list-item__primary-text').textContent().catch(() => '');
          if (text && text.trim()) {
            optionTexts.push(text.trim());
          }
        }
      }
      
      return optionTexts;
    } catch (error) {
      console.log(`Error getting timeline filter options: ${error.message}`);
      return [];
    }
  }

  /**
   * Selects a timeline filter option by index (0-based)
   * @param {number} index - Index of the option to select
   * @returns {Promise<string>} The text of the selected option
   */
  async selectTimelineFilterOptionByIndex(index) {
    try {
      // Ensure dropdown is still open
      const isOpen = await this.isTimelineFilterDropdownOpen();
      if (!isOpen) {
        await this.clickTimelineFilterDropdown();
        await this.page.waitForTimeout(500);
      }
      
      // Get all options
      const options = this.page.locator('div.cdk-overlay-pane.mat-mdc-select-panel mat-option, div.mat-mdc-select-panel[role="listbox"] mat-option');
      const count = await options.count();
      
      if (index >= count) {
        throw new Error(`Index ${index} is out of range. Only ${count} options available.`);
      }
      
      const option = options.nth(index);
      
      // Wait for option to be attached to DOM (not necessarily visible)
      await option.waitFor({ state: 'attached', timeout: 5000 });
      
      // Scroll the option into view using multiple strategies
      try {
        await option.scrollIntoViewIfNeeded({ timeout: 3000 });
      } catch (scrollError) {
        // If scrollIntoViewIfNeeded fails, try scrolling the panel
        const panel = this.page.locator('div.cdk-overlay-pane.mat-mdc-select-panel, div.mat-mdc-select-panel[role="listbox"]').first();
        await panel.evaluate((el, idx) => {
          const options = el.querySelectorAll('mat-option');
          if (options[idx]) {
            options[idx].scrollIntoView({ block: 'center', behavior: 'instant' });
          }
        }, index);
        await this.page.waitForTimeout(300);
      }
      
      // Wait for option to be visible after scrolling
      await option.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the text before clicking
      const optionText = await option.locator('span.mdc-list-item__primary-text').textContent();
      const text = optionText ? optionText.trim() : '';
      
      // Click the option
      await option.click({ timeout: 5000 });
      
      // Wait for selection to apply (shorter timeout)
      await this.page.waitForTimeout(500);
      
      return text;
    } catch (error) {
      throw new Error(`Failed to select timeline filter option at index ${index}: ${error.message}`);
    }
  }

  /**
   * Gets the currently selected timeline filter option text
   * @returns {Promise<string>} The selected option text
   */
  async getSelectedTimelineFilterOption() {
    try {
      const selectedValue = this.page.locator('mat-form-field:has(mat-label:has-text("Timeline Filter")) mat-select .mat-mdc-select-value-text span, mat-form-field:has(mat-label:has-text("Timeline")) mat-select .mat-mdc-select-value-text span, mat-select .mat-mdc-select-value-text span').first();
      const text = await selectedValue.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      console.log(`Error getting selected timeline filter option: ${error.message}`);
      return '';
    }
  }

  /**
   * Gets Subscriptions, Users and Amount values from the "Total Renewals" row
   * in the Renewal Summary table on the Dashboard.
   * @returns {Promise<{subscriptions: string, users: string, amount: string}>}
   */
  async getTotalRenewalsSummary() {
    try {
      // Ensure the Renewal Summary section is in view
      await this.renewalSummarySection.scrollIntoViewIfNeeded().catch(() => {});

      await this.renewalSummaryTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.totalRenewalsRow.waitFor({ state: 'visible', timeout: 10000 });

      // Collect all cell texts from the Total Renewals row
      const cells = this.totalRenewalsRow.locator('td');
      const cellTexts = (await cells.allTextContents()).map(t => t.trim()).filter(Boolean);

      // Expected order: [S. No., Renewals, Subscriptions, Users, Amount]
      const subscriptions = cellTexts[2] || '';
      const users = cellTexts[3] || '';
      const amount = cellTexts[4] || cellTexts[cellTexts.length - 1] || '';

      return {
        subscriptions,
        users,
        amount
      };
    } catch (error) {
      console.log(`Error getting Total Renewals summary row: ${error.message}`);
      return { subscriptions: '', users: '', amount: '' };
    }
  }

  /**
   * Gets Subscriptions, Users and Amount values from the "Upcoming Renewals" row
   * in the Renewal Summary table on the Dashboard.
   * @returns {Promise<{subscriptions: string, users: string, amount: string}>}
   */
  async getUpcomingRenewalsSummary() {
    try {
      await this.renewalSummarySection.scrollIntoViewIfNeeded().catch(() => {});

      await this.renewalSummaryTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.upcomingRenewalsRow.waitFor({ state: 'visible', timeout: 10000 });

      const cells = this.upcomingRenewalsRow.locator('td');
      const cellTexts = (await cells.allTextContents()).map(t => t.trim()).filter(Boolean);

      // Expected order: [S. No., Renewals, Subscriptions, Users, Amount]
      const subscriptions = cellTexts[2] || '';
      const users = cellTexts[3] || '';
      const amount = cellTexts[4] || cellTexts[cellTexts.length - 1] || '';

      return { subscriptions, users, amount };
    } catch (error) {
      console.log(`Error getting Upcoming Renewals summary row: ${error.message}`);
      return { subscriptions: '', users: '', amount: '' };
    }
  }

  /**
   * Clicks on the "Total Renewals" link in the Renewal Summary table
   * and waits for navigation to the Subscriptions page.
   * @returns {Promise<void>}
   */
  async clickTotalRenewalsAndNavigate() {
    try {
      await this.totalRenewalsLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.totalRenewalsLink.scrollIntoViewIfNeeded();

      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
        this.totalRenewalsLink.click()
      ]);

      // Small wait for Subscriptions page widgets to render
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Total Renewals link and navigate: ${error.message}`);
    }
  }

  /**
   * Clicks on the "Upcoming Renewals" link in the Renewal Summary table
   * and waits for navigation to the Subscriptions page.
   * @returns {Promise<void>}
   */
  async clickUpcomingRenewalsAndNavigate() {
    try {
      await this.upcomingRenewalsLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.upcomingRenewalsLink.scrollIntoViewIfNeeded();

      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
        this.upcomingRenewalsLink.click()
      ]);

      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Upcoming Renewals link and navigate: ${error.message}`);
    }
  }

  /**
   * Gets Subscriptions, Users and Amount values from the "Total Subscriptions"
   * card on the Subscriptions page.
   * @returns {Promise<{subscriptions: string, users: string, amount: string}>}
   */
  async getTotalSubscriptionsCardData() {
    try {
      await this.totalSubscriptionsCard.waitFor({ state: 'visible', timeout: 15000 });

      const getMetricValue = async (label) => {
        const valueLocator = this.totalSubscriptionsCard
          .locator('div.sub')
          .filter({ has: this.page.locator(`div.sub-title:has-text("${label}")`) })
          .locator('h5.price-text')
          .first();

        const isVisible = await valueLocator.isVisible({ timeout: 5000 }).catch(() => false);
        if (!isVisible) return '';

        const text = await valueLocator.textContent();
        return text ? text.trim() : '';
      };

      const subscriptions = await getMetricValue('Subscriptions');
      const users = await getMetricValue('Users');
      const amount = await getMetricValue('Amount');

      return { subscriptions, users, amount };
    } catch (error) {
      console.log(`Error getting Total Subscriptions card data: ${error.message}`);
      return { subscriptions: '', users: '', amount: '' };
    }
  }

  /**
   * Clicks on the "Trial Signups" link on the Dashboard
   * and waits for navigation to the Subscriptions page.
   * @returns {Promise<void>}
   */
  async clickTrialSignupsAndNavigate() {
    try {
      // Wait for element to be visible and actionable
      await this.trialSignupsLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.trialSignupsLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500); // Small wait after scrolling

      // Get current URL before clicking
      const currentUrl = this.page.url();
      
      // Try multiple click strategies
      let clicked = false;
      
      // Strategy 1: Normal click on the paragraph element
      try {
        await this.trialSignupsLink.click({ timeout: 5000 });
        clicked = true;
      } catch (err) {
        console.log('Normal click on paragraph failed, trying force click...');
      }
      
      // Strategy 2: Force click on paragraph
      if (!clicked) {
        try {
          await this.trialSignupsLink.click({ force: true, timeout: 5000 });
          clicked = true;
        } catch (err) {
          console.log('Force click on paragraph failed, trying container...');
        }
      }
      
      // Strategy 3: Try clicking the container
      if (!clicked) {
        try {
          const containerVisible = await this.trialSignupsContainer.isVisible({ timeout: 3000 }).catch(() => false);
          if (containerVisible) {
            await this.trialSignupsContainer.scrollIntoViewIfNeeded();
            await this.trialSignupsContainer.click({ timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Container click failed, trying JavaScript click...');
        }
      }
      
      // Strategy 4: JavaScript click on paragraph
      if (!clicked) {
        try {
          await this.trialSignupsLink.evaluate((el) => {
            el.click();
          });
          clicked = true;
        } catch (err) {
          console.log('JavaScript click failed, trying dispatchEvent...');
        }
      }
      
      // Strategy 5: Dispatch click event on paragraph
      if (!clicked) {
        await this.trialSignupsLink.evaluate((el) => {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          el.dispatchEvent(clickEvent);
        });
        clicked = true;
      }
      
      if (!clicked) {
        throw new Error('All click strategies failed');
      }
      
      // Wait for URL to change - poll every 500ms for up to 15 seconds
      let urlChanged = false;
      const maxAttempts = 30; // 30 * 500ms = 15 seconds
      
      for (let i = 0; i < maxAttempts; i++) {
        await this.page.waitForTimeout(500);
        const newUrl = this.page.url();
        
        // Check if URL changed or contains 'subscription'
        if (newUrl !== currentUrl || newUrl.toLowerCase().includes('subscription')) {
          urlChanged = true;
          break;
        }
      }
      
      if (!urlChanged) {
        // If URL still didn't change, wait a bit more for client-side routing
        await this.page.waitForTimeout(2000);
      }

      // Small wait for Subscriptions page widgets to render
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Trial Signups link and navigate: ${error.message}`);
    }
  }

  /**
   * Clicks on the "Trial Expired" link on the Dashboard
   * and waits for navigation to the Subscriptions page.
   * @returns {Promise<void>}
   */
  async clickTrialExpiredAndNavigate() {
    try {
      await this.trialExpiredLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.trialExpiredLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500); // Small wait after scrolling

      // Get current URL before clicking
      const currentUrl = this.page.url();
      
      // Try multiple click strategies (same as Trial Signups)
      let clicked = false;
      
      // Strategy 1: Try clicking container first (might have the actual click handler)
      try {
        const containerVisible = await this.trialExpiredContainer.isVisible({ timeout: 3000 }).catch(() => false);
        if (containerVisible) {
          await this.trialExpiredContainer.scrollIntoViewIfNeeded();
          // Try JavaScript click first
          await this.trialExpiredContainer.evaluate((el) => {
            el.click();
          });
          await this.page.waitForTimeout(300);
          clicked = true;
        }
      } catch (err) {
        console.log('Container click failed, trying paragraph...');
      }
      
      // Strategy 1b: Normal click on the paragraph element
      if (!clicked) {
        try {
          await this.trialExpiredLink.click({ timeout: 5000 });
          clicked = true;
        } catch (err) {
          console.log('Normal click on paragraph failed, trying force click...');
        }
      }
      
      // Strategy 2: Force click on paragraph
      if (!clicked) {
        try {
          await this.trialExpiredLink.click({ force: true, timeout: 5000 });
          clicked = true;
        } catch (err) {
          console.log('Force click on paragraph failed, trying container...');
        }
      }
      
      // Strategy 3: Try clicking the container
      if (!clicked) {
        try {
          const containerVisible = await this.trialExpiredContainer.isVisible({ timeout: 3000 }).catch(() => false);
          if (containerVisible) {
            await this.trialExpiredContainer.scrollIntoViewIfNeeded();
            // Try JavaScript click first (might work better for Angular)
            await this.trialExpiredContainer.evaluate((el) => {
              el.click();
            });
            await this.page.waitForTimeout(500);
            clicked = true;
          }
        } catch (err) {
          console.log('Container JavaScript click failed, trying regular click...');
          try {
            await this.trialExpiredContainer.click({ timeout: 5000 });
            clicked = true;
          } catch (err2) {
            console.log('Container click failed, trying JavaScript click...');
          }
        }
      }
      
      // Strategy 3b: Look for router link wrapper
      if (!clicked) {
        try {
          const routerLinkWrapper = this.page.locator('[routerlink]:has(div.box-2:has(p:has-text("Trial Expired"))), a:has(div.box-2:has(p:has-text("Trial Expired"))), [routerlink*="subscription"]:has-text("Trial Expired")').first();
          const isVisible = await routerLinkWrapper.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await routerLinkWrapper.scrollIntoViewIfNeeded();
            await routerLinkWrapper.click({ timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Router link wrapper not found...');
        }
      }
      
      // Strategy 4: JavaScript click on paragraph
      if (!clicked) {
        try {
          await this.trialExpiredLink.evaluate((el) => {
            el.click();
          });
          clicked = true;
        } catch (err) {
          console.log('JavaScript click failed, trying dispatchEvent...');
        }
      }
      
      // Strategy 5: Dispatch click event on paragraph
      if (!clicked) {
        await this.trialExpiredLink.evaluate((el) => {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          el.dispatchEvent(clickEvent);
        });
        clicked = true;
      }
      
      // Strategy 6: Try to find and click router link by traversing up from container
      if (!clicked) {
        try {
          const routerLink = await this.trialExpiredContainer.evaluateHandle((el) => {
            let current = el;
            while (current && current !== document.body) {
              if (current.hasAttribute && (current.hasAttribute('routerlink') || current.hasAttribute('routerLink') || current.hasAttribute('ng-reflect-router-link') || current.tagName === 'A')) {
                return current;
              }
              current = current.parentElement;
            }
            return null;
          });
          
          if (routerLink && routerLink.asElement()) {
            await routerLink.asElement().click({ timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Router link traversal failed...');
        }
      }
      
      // Strategy 7: Try clicking container with force
      if (!clicked) {
        try {
          const containerVisible = await this.trialExpiredContainer.isVisible({ timeout: 3000 }).catch(() => false);
          if (containerVisible) {
            await this.trialExpiredContainer.click({ force: true, timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Force container click failed...');
        }
      }
      
      // Strategy 8: Try to find clickable element by checking for click handlers
      if (!clicked) {
        try {
          const clickableElement = await this.trialExpiredContainer.evaluateHandle((el) => {
            // Check if container itself has click handler
            if (el.onclick || el.getAttribute('(click)') || el.getAttribute('ng-reflect-router-link')) {
              return el;
            }
            // Check children
            const children = el.querySelectorAll('*');
            for (const child of children) {
              if (child.onclick || child.getAttribute('(click)') || child.getAttribute('routerlink') || child.getAttribute('routerLink') || child.tagName === 'A') {
                return child;
              }
            }
            return null;
          });
          
          if (clickableElement && clickableElement.asElement()) {
            await clickableElement.asElement().click({ timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Clickable element search failed...');
        }
      }
      
      if (!clicked) {
        throw new Error('All click strategies failed');
      }
      
      console.log(`✓ Trial Expired link clicked successfully`);
      await this.page.waitForTimeout(300); // Small wait after click
      console.log(`Waiting for navigation... Current URL: ${currentUrl}`);
      
      // Wait for URL to change - poll every 500ms for up to 8 seconds
      let urlChanged = false;
      const maxAttempts = 16; // 16 * 500ms = 8 seconds
      
      for (let i = 0; i < maxAttempts; i++) {
        await this.page.waitForTimeout(500);
        const newUrl = this.page.url();
        
        // Check if URL changed or contains 'subscription'
        if (newUrl !== currentUrl || newUrl.toLowerCase().includes('subscription')) {
          urlChanged = true;
          console.log(`✓ URL changed to: ${newUrl}`);
          break;
        }
        
        // Log progress every 2 seconds
        if ((i + 1) % 4 === 0) {
          console.log(`Still waiting for navigation... (${(i + 1) * 500}ms elapsed, URL: ${newUrl})`);
        }
      }
      
      if (!urlChanged) {
        const finalUrl = this.page.url();
        console.log(`⚠ URL did not change after ${maxAttempts * 500}ms. Final URL: ${finalUrl}`);
        // If URL still didn't change, wait a bit more for client-side routing
        await this.page.waitForTimeout(2000);
        const finalUrlAfterWait = this.page.url();
        if (finalUrlAfterWait !== currentUrl || finalUrlAfterWait.toLowerCase().includes('subscription')) {
          urlChanged = true;
          console.log(`✓ URL changed after additional wait: ${finalUrlAfterWait}`);
        } else {
          console.log(`⚠ URL still did not change after additional wait: ${finalUrlAfterWait}`);
          // Try to navigate programmatically as fallback
          try {
            const baseUrl = finalUrlAfterWait.split('/').slice(0, 3).join('/');
            const subscriptionUrl = `${baseUrl}/subscription`;
            console.log(`Attempting programmatic navigation to: ${subscriptionUrl}`);
            await this.page.goto(subscriptionUrl, { waitUntil: 'networkidle', timeout: 10000 });
            urlChanged = true;
            console.log(`✓ Navigated programmatically to subscription page`);
          } catch (navError) {
            console.log(`⚠ Programmatic navigation failed: ${navError.message}`);
          }
        }
      }

      // Small wait for Subscriptions page widgets to render (only if navigation happened)
      if (urlChanged) {
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      throw new Error(`Failed to click Trial Expired link and navigate: ${error.message}`);
    }
  }

  /**
   * Clicks on the "Trial to Paid" link on the Dashboard
   * and waits for navigation to the Subscriptions page.
   * @returns {Promise<void>}
   */
  async clickTrialToPaidAndNavigate() {
    try {
      // Wait for element to be visible and actionable
      await this.trialToPaidLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.trialToPaidLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500); // Small wait after scrolling

      // Get current URL before clicking
      const currentUrl = this.page.url();
      
      // Try multiple click strategies
      let clicked = false;
      
      // Strategy 1: Normal click on the paragraph element
      try {
        await this.trialToPaidLink.click({ timeout: 5000 });
        clicked = true;
      } catch (err) {
        console.log('Normal click on paragraph failed, trying force click...');
      }
      
      // Strategy 2: Force click on paragraph
      if (!clicked) {
        try {
          await this.trialToPaidLink.click({ force: true, timeout: 5000 });
          clicked = true;
        } catch (err) {
          console.log('Force click on paragraph failed, trying container...');
        }
      }
      
      // Strategy 3: Try clicking the container
      if (!clicked) {
        try {
          const containerVisible = await this.trialToPaidContainer.isVisible({ timeout: 3000 }).catch(() => false);
          if (containerVisible) {
            await this.trialToPaidContainer.scrollIntoViewIfNeeded();
            await this.trialToPaidContainer.click({ timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Container click failed, trying JavaScript click...');
        }
      }
      
      // Strategy 4: JavaScript click on paragraph
      if (!clicked) {
        try {
          await this.trialToPaidLink.evaluate((el) => {
            el.click();
          });
          clicked = true;
        } catch (err) {
          console.log('JavaScript click failed, trying dispatchEvent...');
        }
      }
      
      // Strategy 5: Dispatch click event on paragraph
      if (!clicked) {
        await this.trialToPaidLink.evaluate((el) => {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          el.dispatchEvent(clickEvent);
        });
        clicked = true;
      }
      
      if (!clicked) {
        throw new Error('All click strategies failed');
      }
      
      // Wait for URL to change - poll every 500ms for up to 15 seconds
      let urlChanged = false;
      const maxAttempts = 30; // 30 * 500ms = 15 seconds
      
      for (let i = 0; i < maxAttempts; i++) {
        await this.page.waitForTimeout(500);
        const newUrl = this.page.url();
        
        // Check if URL changed or contains 'subscription'
        if (newUrl !== currentUrl || newUrl.toLowerCase().includes('subscription')) {
          urlChanged = true;
          break;
        }
      }
      
      if (!urlChanged) {
        // If URL still didn't change, wait a bit more for client-side routing
        await this.page.waitForTimeout(2000);
      }

      // Small wait for Subscriptions page widgets to render
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Trial to Paid link and navigate: ${error.message}`);
    }
  }

  /**
   * Clicks on the "Live Trial" link on the Dashboard
   * and waits for navigation to the Subscriptions page.
   * Uses the same approach as Trial Signups.
   * @returns {Promise<void>}
   */
  async clickLiveTrialAndNavigate() {
    try {
      // Wait for element to be visible and actionable
      await this.liveTrialLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.liveTrialLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500); // Small wait after scrolling

      // Get current URL before clicking
      const currentUrl = this.page.url();
      
      // Try multiple click strategies
      let clicked = false;
      
      // Strategy 1: Normal click on the paragraph element
      try {
        await this.liveTrialLink.click({ timeout: 5000 });
        clicked = true;
      } catch (err) {
        console.log('Normal click on paragraph failed, trying force click...');
      }
      
      // Strategy 2: Force click on paragraph
      if (!clicked) {
        try {
          await this.liveTrialLink.click({ force: true, timeout: 5000 });
          clicked = true;
        } catch (err) {
          console.log('Force click on paragraph failed, trying container...');
        }
      }
      
      // Strategy 3: Try clicking the container
      if (!clicked) {
        try {
          const containerVisible = await this.liveTrialContainer.isVisible({ timeout: 3000 }).catch(() => false);
          if (containerVisible) {
            await this.liveTrialContainer.scrollIntoViewIfNeeded();
            await this.liveTrialContainer.click({ timeout: 5000 });
            clicked = true;
          }
        } catch (err) {
          console.log('Container click failed, trying JavaScript click...');
        }
      }
      
      // Strategy 4: JavaScript click on paragraph
      if (!clicked) {
        try {
          await this.liveTrialLink.evaluate((el) => {
            el.click();
          });
          clicked = true;
        } catch (err) {
          console.log('JavaScript click failed, trying dispatchEvent...');
        }
      }
      
      // Strategy 5: Dispatch click event on paragraph
      if (!clicked) {
        await this.liveTrialLink.evaluate((el) => {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          el.dispatchEvent(clickEvent);
        });
        clicked = true;
      }
      
      if (!clicked) {
        throw new Error('All click strategies failed');
      }
      
      // Wait for URL to change - poll every 500ms for up to 15 seconds
      let urlChanged = false;
      const maxAttempts = 30; // 30 * 500ms = 15 seconds
      
      for (let i = 0; i < maxAttempts; i++) {
        await this.page.waitForTimeout(500);
        const newUrl = this.page.url();
        
        // Check if URL changed or contains 'subscription'
        if (newUrl !== currentUrl || newUrl.toLowerCase().includes('subscription')) {
          urlChanged = true;
          break;
        }
      }
      
      if (!urlChanged) {
        // If URL still didn't change, wait a bit more for client-side routing
        await this.page.waitForTimeout(2000);
      }

      // Small wait for Subscriptions page widgets to render
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Live Trial link and navigate: ${error.message}`);
    }
  }
}

module.exports = { DashboardPage };

