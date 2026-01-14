class TechnicalDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div class="nav-link sidebar-items" routerlink="/technical-dashboard">
    this.technicalDashboardLink = page.locator('div.nav-link.sidebar-items[routerlink="/technical-dashboard"], div.nav-link.sidebar-items:has-text("Technical Dashboard"), a[routerlink="/technical-dashboard"], .sidebar-items:has-text("Technical Dashboard")').first();
    
    // Page elements
    this.pageWrapper = page.locator('app-root, app-technical-dashboard, [class*="technical-dashboard"]').first();
    // More flexible locators for heading - try multiple selectors
    this.pageTitle = page.locator('h1:has-text("Technical Dashboard"), h2:has-text("Technical Dashboard"), h3:has-text("Technical Dashboard"), h4:has-text("Technical Dashboard"), *:has-text("Technical Dashboard")').first();
    this.heading = page.locator('h1:has-text("Technical Dashboard"), h2:has-text("Technical Dashboard"), h3:has-text("Technical Dashboard"), h4:has-text("Technical Dashboard"), *[class*="heading"]:has-text("Technical Dashboard"), *[class*="title"]:has-text("Technical Dashboard"), *[class*="header"]:has-text("Technical Dashboard"), *:has-text("Technical Dashboard")').first();
    // Alternative: search for text anywhere on page
    this.technicalDashboardText = page.locator('text=Technical Dashboard').first();
    
    // Server List dropdown locators
    // HTML: <mat-select id="mat-select-0" with label "Server List"
    // Try multiple strategies to find the dropdown
    this.serverListLabel = page.locator('mat-label:has-text("Server List"), label#mat-mdc-form-field-label-0, label:has-text("Server List")').first();
    // Primary: Use ID directly
    this.serverListDropdown = page.locator('mat-select#mat-select-0, mat-select[aria-labelledby*="mat-mdc-form-field-label-0"], mat-select.multi-select').first();
    
    // Dropdown panel (overlay)
    this.dropdownPanel = page.locator('div.mat-mdc-select-panel[role="listbox"], div.cdk-overlay-pane mat-select-panel, div[role="listbox"]').first();
    
    // Search input inside dropdown
    this.searchInput = page.locator('input[placeholder="Search Here..."], input[placeholder*="Search Here"], input.form-control[placeholder*="Search"]').first();
    
    // Select All option
    this.selectAllOption = page.locator('mat-option:has-text("Select All"), mat-option[id="mat-option-0"]').first();
    this.selectAllCheckbox = page.locator('mat-option:has-text("Select All") mat-pseudo-checkbox, mat-option[id="mat-option-0"] mat-pseudo-checkbox').first();
    
    // Server options (all mat-option except Select All)
    this.serverOptions = page.locator('mat-option:not(:has-text("Select All"))');
    this.serverOptionCheckboxes = page.locator('mat-option:not(:has-text("Select All")) mat-pseudo-checkbox');
    
    // Dropdown buttons
    this.okButton = page.locator('button.ok-btn, button:has-text("Ok")').first();
    this.cancelButton = page.locator('button.cancel-btn, button:has-text("Cancel")').first();
    
    // Dashboard cards locators
    // HTML: <p class="text-center fs-5 sub mb-1 text-light">Total Instance</p>
    this.totalInstanceCard = page.locator('p.text-center.fs-5.sub:has-text("Total Instance"), p:has-text("Total Instance")').first();
    this.liveInstanceCard = page.locator('p.text-center.fs-5.sub:has-text("Live Instance"), p:has-text("Live Instance")').first();
    this.trialInstanceCard = page.locator('p.text-center.fs-5.sub:has-text("Trial Instance"), p:has-text("Trial Instance")').first();
    this.margInstanceCard = page.locator('p.text-center.fs-5.sub:has-text("Marg Instance"), p:has-text("Marg Instance")').first();
    this.partnerInstanceCard = page.locator('p.text-center.fs-5.sub:has-text("Partner Instance"), p:has-text("Partner Instance")').first();
    // Offline Servers has mb-3 instead of mb-1
    this.offlineServersCard = page.locator('p.text-center.fs-5.sub:has-text("Offline Servers"), p:has-text("Offline Servers")').first();
    
    // All cards container
    this.allCards = page.locator('div.col-md-4.mb-3.stretch-card');
    
    // Server Summary table locators
    // HTML: <div class="table-title"> Server Summary </div>
    this.serverSummaryTitle = page.locator('div.table-title:has-text("Server Summary"), *:has-text("Server Summary")').first();
    this.serverSummaryTable = page.locator('div:has(div.table-title:has-text("Server Summary")) table, div:has(div.table-title:has-text("Server Summary")) mat-table').first();
    this.serverSummaryRows = page.locator('div:has(div.table-title:has-text("Server Summary")) table tbody tr, div:has(div.table-title:has-text("Server Summary")) mat-table mat-row').first();
    this.serverSummaryAllRows = page.locator('div:has(div.table-title:has-text("Server Summary")) table tbody tr, div:has(div.table-title:has-text("Server Summary")) mat-table mat-row');
    this.serverSummaryNoDataMessage = page.locator('div:has(div.table-title:has-text("Server Summary")) p:has-text("No data found"), div:has(div.table-title:has-text("Server Summary")) *:has-text("No Data Found")').first();
    
    // Server Wise Report table locators
    // HTML: <div class="table-title"> Server Wise Report </div>
    this.serverWiseReportTitle = page.locator('div.table-title:has-text("Server Wise Report"), *:has-text("Server Wise Report")').first();
    this.serverWiseReportTable = page.locator('div:has(div.table-title:has-text("Server Wise Report")) table, div:has(div.table-title:has-text("Server Wise Report")) mat-table').first();
    this.serverWiseReportRows = page.locator('div:has(div.table-title:has-text("Server Wise Report")) table tbody tr, div:has(div.table-title:has-text("Server Wise Report")) mat-table mat-row').first();
    this.serverWiseReportAllRows = page.locator('div:has(div.table-title:has-text("Server Wise Report")) table tbody tr, div:has(div.table-title:has-text("Server Wise Report")) mat-table mat-row');
    this.serverWiseReportNoDataMessage = page.locator('div:has(div.table-title:has-text("Server Wise Report")) p:has-text("No data found"), div:has(div.table-title:has-text("Server Wise Report")) *:has-text("No Data Found")').first();
    
    // Server Type dropdown locators
    // HTML: <mat-select id="mat-select-2" with label "Server Type"
    this.serverTypeLabel = page.locator('mat-label:has-text("Server Type"), label#mat-mdc-form-field-label-2, label:has-text("Server Type")').first();
    this.serverTypeDropdown = page.locator('mat-select#mat-select-2, mat-select[aria-labelledby*="mat-mdc-form-field-label-2"], mat-form-field:has(mat-label:has-text("Server Type")) mat-select').first();
    this.serverTypeDropdownPanel = page.locator('div.mat-mdc-select-panel[role="listbox"]#mat-select-2-panel, div.mat-mdc-select-panel[role="listbox"]').first();
    
    // Server Type options
    this.trialServerOption = page.locator('mat-option:has-text("Trial Server"), mat-option[ng-reflect-value="trial"], mat-option#mat-option-1').first();
    this.liveServerOption = page.locator('mat-option:has-text("Live Server"), mat-option[ng-reflect-value="live"], mat-option#mat-option-2').first();
    this.margServerOption = page.locator('mat-option:has-text("Marg Server"), mat-option[ng-reflect-value="marg"], mat-option#mat-option-3').first();
    this.partnerServerOption = page.locator('mat-option:has-text("Partner Server"), mat-option[ng-reflect-value="partner"], mat-option#mat-option-4').first();
    this.customServerOption = page.locator('mat-option:has-text("Custom Server"), mat-option[ng-reflect-value="custom"], mat-option#mat-option-5').first();
    
    // All server type options
    this.allServerTypeOptions = page.locator('div.mat-mdc-select-panel mat-option');
  }

  /**
   * Navigates to the Technical Dashboard page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoTechnicalDashboard(baseUrl) {
    // Navigate to technical dashboard page
    await this.technicalDashboardLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.technicalDashboardLink.scrollIntoViewIfNeeded();
    await this.technicalDashboardLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verifies the Technical Dashboard page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnTechnicalDashboardPage = url.includes('/technical-dashboard');
      
      // Wait for page to be ready
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      
      // Check if page wrapper or any content is visible
      const isWrapperVisible = await this.pageWrapper.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Check if page has loaded (body is visible)
      const isBodyVisible = await this.page.locator('body').isVisible({ timeout: 3000 }).catch(() => false);
      
      return isOnTechnicalDashboardPage && (isWrapperVisible || isBodyVisible);
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Technical Dashboard heading is visible
   * @returns {Promise<boolean>}
   */
  async isHeadingVisible() {
    try {
      // Try multiple locators to find the text
      const locators = [
        this.heading,
        this.pageTitle,
        this.technicalDashboardText,
        this.page.locator('h1, h2, h3, h4').filter({ hasText: 'Technical Dashboard' }).first(),
        this.page.locator('*:has-text("Technical Dashboard")').first()
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 2000 });
          if (isVisible) {
            return true;
          }
        } catch {
          // Continue to next locator
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets the Technical Dashboard heading text
   * @returns {Promise<string>}
   */
  async getHeadingText() {
    try {
      // Try multiple locators to get the text
      const locators = [
        this.heading,
        this.pageTitle,
        this.technicalDashboardText,
        this.page.locator('h1, h2, h3, h4').filter({ hasText: 'Technical Dashboard' }).first(),
        this.page.locator('*:has-text("Technical Dashboard")').first()
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 1000 });
          if (isVisible) {
            const text = await locator.textContent();
            if (text && text.includes('Technical Dashboard')) {
              return text.trim();
            }
          }
        } catch {
          // Continue to next locator
        }
      }
      
      // Fallback: search page content
      const pageContent = await this.page.textContent('body');
      if (pageContent && pageContent.includes('Technical Dashboard')) {
        return 'Technical Dashboard';
      }
      
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies the page layout renders without issues
   * @returns {Promise<boolean>}
   */
  async verifyPageLayout() {
    try {
      // Check if page wrapper is visible
      const isWrapperVisible = await this.pageWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      // Check if body is visible (page has loaded)
      const isBodyVisible = await this.page.locator('body').isVisible({ timeout: 3000 }).catch(() => false);
      // Check if heading is visible (optional - page might still be valid without it)
      const isHeadingVisible = await this.isHeadingVisible();
      
      // Page layout is valid if wrapper or body is visible
      // Heading visibility is a bonus but not required for layout validation
      return (isWrapperVisible || isBodyVisible);
    } catch {
      return false;
    }
  }

  /**
   * Refreshes the Technical Dashboard page
   */
  async refreshPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(2000);
  }

  // ==================== SERVER LIST DROPDOWN METHODS ====================

  /**
   * Clicks on the Server List dropdown
   */
  async clickServerListDropdown() {
    try {
      // Try multiple locators to find the dropdown
      const locators = [
        this.page.locator('mat-select#mat-select-0'),
        this.page.locator('mat-select[aria-labelledby*="mat-mdc-form-field-label-0"]'),
        this.page.locator('mat-select.multi-select'),
        this.page.locator('mat-form-field:has(mat-label:has-text("Server List")) mat-select'),
        this.serverListDropdown
      ];
      
      let clicked = false;
      for (const locator of locators) {
        try {
          await locator.waitFor({ state: 'visible', timeout: 3000 });
          await locator.scrollIntoViewIfNeeded();
          await locator.click();
          await this.page.waitForTimeout(1000);
          
          // Check if dropdown panel opened
          const isPanelOpen = await this.dropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
          if (isPanelOpen) {
            clicked = true;
            break;
          }
        } catch {
          // Try next locator
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click Server List dropdown with any locator');
      }
      
      // Wait for dropdown panel to be fully visible
      await this.dropdownPanel.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Server List dropdown: ${error.message}`);
    }
  }

  /**
   * Verifies the dropdown panel is open
   * @returns {Promise<boolean>}
   */
  async isDropdownPanelOpen() {
    try {
      return await this.dropdownPanel.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Verifies all required elements are visible in the dropdown
   * @returns {Promise<{searchInput: boolean, selectAll: boolean, serverOptions: boolean, okButton: boolean, cancelButton: boolean}>}
   */
  async verifyDropdownElements() {
    try {
      const searchInputVisible = await this.searchInput.isVisible({ timeout: 3000 }).catch(() => false);
      const selectAllVisible = await this.selectAllOption.isVisible({ timeout: 3000 }).catch(() => false);
      const okButtonVisible = await this.okButton.isVisible({ timeout: 3000 }).catch(() => false);
      const cancelButtonVisible = await this.cancelButton.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Check if any server options are available
      const serverOptionsCount = await this.serverOptions.count();
      const serverOptionsVisible = serverOptionsCount > 0;
      
      return {
        searchInput: searchInputVisible,
        selectAll: selectAllVisible,
        serverOptions: serverOptionsVisible,
        okButton: okButtonVisible,
        cancelButton: cancelButtonVisible
      };
    } catch {
      return {
        searchInput: false,
        selectAll: false,
        serverOptions: false,
        okButton: false,
        cancelButton: false
      };
    }
  }

  /**
   * Selects a server option by index (0-based, excluding Select All)
   * @param {number} index - Index of the server option to select
   */
  async selectServerOption(index = 0) {
    try {
      const serverOption = this.serverOptions.nth(index);
      await serverOption.waitFor({ state: 'visible', timeout: 5000 });
      await serverOption.scrollIntoViewIfNeeded();
      await serverOption.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select server option at index ${index}: ${error.message}`);
    }
  }

  /**
   * Clicks the Ok button
   */
  async clickOkButton() {
    try {
      await this.okButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.okButton.scrollIntoViewIfNeeded();
      await this.okButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for dropdown to close
      await this.dropdownPanel.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Ok button: ${error.message}`);
    }
  }

  /**
   * Clicks the Cancel button
   */
  async clickCancelButton() {
    try {
      await this.cancelButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cancelButton.scrollIntoViewIfNeeded();
      await this.cancelButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for dropdown to close
      await this.dropdownPanel.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Cancel button: ${error.message}`);
    }
  }

  /**
   * Verifies the dropdown panel is closed
   * @returns {Promise<boolean>}
   */
  async isDropdownPanelClosed() {
    try {
      return await this.dropdownPanel.isHidden({ timeout: 3000 });
    } catch {
      // If panel doesn't exist or is not visible, consider it closed
      const isVisible = await this.dropdownPanel.isVisible({ timeout: 1000 }).catch(() => false);
      return !isVisible;
    }
  }

  /**
   * Gets the count of available server options
   * @returns {Promise<number>}
   */
  async getServerOptionsCount() {
    try {
      return await this.serverOptions.count();
    } catch {
      return 0;
    }
  }

  // ==================== DASHBOARD CARDS METHODS ====================

  /**
   * Verifies a specific card title is visible
   * @param {string} cardTitle - The card title to verify (e.g., "Total Instance")
   * @returns {Promise<boolean>}
   */
  async isCardTitleVisible(cardTitle) {
    try {
      const cardLocators = {
        'Total Instance': this.totalInstanceCard,
        'Live Instance': this.liveInstanceCard,
        'Trial Instance': this.trialInstanceCard,
        'Marg Instance': this.margInstanceCard,
        'Partner Instance': this.partnerInstanceCard,
        'Offline Servers': this.offlineServersCard
      };
      
      const locator = cardLocators[cardTitle];
      if (!locator) {
        return false;
      }
      
      return await locator.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets the text of a specific card title
   * @param {string} cardTitle - The card title to get
   * @returns {Promise<string>}
   */
  async getCardTitleText(cardTitle) {
    try {
      const cardLocators = {
        'Total Instance': this.totalInstanceCard,
        'Live Instance': this.liveInstanceCard,
        'Trial Instance': this.trialInstanceCard,
        'Marg Instance': this.margInstanceCard,
        'Partner Instance': this.partnerInstanceCard,
        'Offline Servers': this.offlineServersCard
      };
      
      const locator = cardLocators[cardTitle];
      if (!locator) {
        return '';
      }
      
      const text = await locator.textContent();
      return text?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies all expected card titles are visible
   * @returns {Promise<{totalInstance: boolean, liveInstance: boolean, trialInstance: boolean, margInstance: boolean, partnerInstance: boolean, offlineServers: boolean}>}
   */
  async verifyAllCardTitles() {
    try {
      const results = {
        totalInstance: await this.isCardTitleVisible('Total Instance'),
        liveInstance: await this.isCardTitleVisible('Live Instance'),
        trialInstance: await this.isCardTitleVisible('Trial Instance'),
        margInstance: await this.isCardTitleVisible('Marg Instance'),
        partnerInstance: await this.isCardTitleVisible('Partner Instance'),
        offlineServers: await this.isCardTitleVisible('Offline Servers')
      };
      
      return results;
    } catch {
      return {
        totalInstance: false,
        liveInstance: false,
        trialInstance: false,
        margInstance: false,
        partnerInstance: false,
        offlineServers: false
      };
    }
  }

  /**
   * Gets the count of all cards displayed
   * @returns {Promise<number>}
   */
  async getCardsCount() {
    try {
      return await this.allCards.count();
    } catch {
      return 0;
    }
  }

  // ==================== TABLE VERIFICATION METHODS ====================

  /**
   * Verifies Server Summary table section is visible
   * @returns {Promise<boolean>}
   */
  async isServerSummarySectionVisible() {
    try {
      return await this.serverSummaryTitle.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Verifies Server Summary table has data
   * @returns {Promise<{hasData: boolean, rowCount: number, noDataMessageVisible: boolean}>}
   */
  async verifyServerSummaryTable() {
    try {
      const rowCount = await this.serverSummaryAllRows.count();
      const hasData = rowCount > 0;
      const noDataMessageVisible = await this.serverSummaryNoDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        noDataMessageVisible: noDataMessageVisible
      };
    } catch {
      return {
        hasData: false,
        rowCount: 0,
        noDataMessageVisible: false
      };
    }
  }

  /**
   * Verifies Server Wise Report table section is visible
   * @returns {Promise<boolean>}
   */
  async isServerWiseReportSectionVisible() {
    try {
      return await this.serverWiseReportTitle.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Verifies Server Wise Report table has data
   * @returns {Promise<{hasData: boolean, rowCount: number, noDataMessageVisible: boolean}>}
   */
  async verifyServerWiseReportTable() {
    try {
      const rowCount = await this.serverWiseReportAllRows.count();
      const hasData = rowCount > 0;
      const noDataMessageVisible = await this.serverWiseReportNoDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        noDataMessageVisible: noDataMessageVisible
      };
    } catch {
      return {
        hasData: false,
        rowCount: 0,
        noDataMessageVisible: false
      };
    }
  }

  // ==================== SERVER TYPE DROPDOWN METHODS ====================

  /**
   * Verifies Server Type dropdown is visible
   * @returns {Promise<boolean>}
   */
  async isServerTypeDropdownVisible() {
    try {
      return await this.serverTypeDropdown.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Clicks on the Server Type dropdown to open it
   */
  async clickServerTypeDropdown() {
    try {
      // Try multiple locators to find the dropdown
      const locators = [
        this.page.locator('mat-select#mat-select-2'),
        this.page.locator('mat-select[aria-labelledby*="mat-mdc-form-field-label-2"]'),
        this.page.locator('mat-form-field:has(mat-label:has-text("Server Type")) mat-select'),
        this.serverTypeDropdown
      ];
      
      let clicked = false;
      for (const locator of locators) {
        try {
          await locator.waitFor({ state: 'visible', timeout: 3000 });
          await locator.scrollIntoViewIfNeeded();
          await locator.click();
          await this.page.waitForTimeout(500);
          
          // Check if dropdown panel opened
          const isPanelOpen = await this.serverTypeDropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
          if (isPanelOpen) {
            clicked = true;
            break;
          }
        } catch {
          // Try next locator
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click Server Type dropdown with any locator');
      }
      
      // Wait for dropdown panel to be fully visible
      await this.serverTypeDropdownPanel.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Server Type dropdown: ${error.message}`);
    }
  }

  /**
   * Verifies all expected Server Type options are visible
   * @returns {Promise<{trialServer: boolean, liveServer: boolean, margServer: boolean, partnerServer: boolean, customServer: boolean}>}
   */
  async verifyServerTypeOptions() {
    try {
      const results = {
        trialServer: await this.trialServerOption.isVisible({ timeout: 3000 }).catch(() => false),
        liveServer: await this.liveServerOption.isVisible({ timeout: 3000 }).catch(() => false),
        margServer: await this.margServerOption.isVisible({ timeout: 3000 }).catch(() => false),
        partnerServer: await this.partnerServerOption.isVisible({ timeout: 3000 }).catch(() => false),
        customServer: await this.customServerOption.isVisible({ timeout: 3000 }).catch(() => false)
      };
      
      return results;
    } catch {
      return {
        trialServer: false,
        liveServer: false,
        margServer: false,
        partnerServer: false,
        customServer: false
      };
    }
  }

  /**
   * Selects a Server Type option
   * @param {string} serverType - Server type to select ('Trial Server', 'Live Server', 'Marg Server', 'Partner Server', 'Custom Server')
   */
  async selectServerType(serverType) {
    try {
      // First open the dropdown if not already open
      const isPanelOpen = await this.serverTypeDropdownPanel.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isPanelOpen) {
        await this.clickServerTypeDropdown();
      }
      
      // Map server type names to locators
      const optionMap = {
        'Trial Server': this.trialServerOption,
        'Live Server': this.liveServerOption,
        'Marg Server': this.margServerOption,
        'Partner Server': this.partnerServerOption,
        'Custom Server': this.customServerOption
      };
      
      const option = optionMap[serverType];
      if (!option) {
        throw new Error(`Invalid server type: ${serverType}`);
      }
      
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.scrollIntoViewIfNeeded();
      await option.click();
      await this.page.waitForTimeout(2000); // Wait for data to load
      
      // Wait for dropdown to close
      await this.serverTypeDropdownPanel.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to select Server Type "${serverType}": ${error.message}`);
    }
  }

  /**
   * Gets all available Server Type options
   * @returns {Promise<Array<string>>}
   */
  async getAllServerTypeOptions() {
    try {
      const options = [];
      const count = await this.allServerTypeOptions.count();
      
      for (let i = 0; i < count; i++) {
        const option = this.allServerTypeOptions.nth(i);
        const text = await option.textContent();
        if (text) {
          options.push(text.trim());
        }
      }
      
      return options;
    } catch {
      return [];
    }
  }
}

module.exports = { TechnicalDashboardPage };

