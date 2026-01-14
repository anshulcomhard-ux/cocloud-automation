const { expect } = require('@playwright/test');

/**
 * Billing Page Object Model
 * Handles all interactions with the Billing page
 */
class BillingPage {
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: Sidebar menu item for Billing
    this.billingRouterLink = page.locator('a[ng-reflect-router-link="/billing"], a[href*="/billing"], [routerlink="/billing"]').first();
    this.billingLink = page.locator('*:has-text("Billing")').filter({ hasNot: page.locator('*:has-text("MRR Reports")') }).first();

    // Page elements
    // HTML: Page heading "Billing" - specific to <p class="fs-5 sub">Billing</p>
    // Also in <div class="col-md-6 mb-2 mt-4"><p class="fs-5 sub">Billing</p></div>
    this.pageHeading = page.locator('p.fs-5.sub:has-text("Billing"), p.sub:has-text("Billing"), div.col-md-6 p.fs-5.sub:has-text("Billing")').first();
    this.pageWrapper = page.locator('*:has-text("Billing")').first();

    // Search panel elements
    // HTML: Search Here button/div that opens search panel (collapsible)
    // <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3">
    this.searchHereButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here"), div[data-bs-toggle="collapse"]:has-text("Search Here"), div:has-text("Search Here"):has(i.bi-search)').first();
    this.searchHereSpan = page.locator('span:has-text("Search Here"), *:has-text("Search Here")').first();
    // HTML: Collapse panel with id="collapseExample"
    this.searchPanel = page.locator('div#collapseExample, div.collapse#collapseExample, div[class*="collapse"][id="collapseExample"]').first();
    this.searchForm = page.locator('div#collapseExample form, div.collapse form, form:has(button.search-btn), form:has(button.reset-btn)').first();
    this.searchFieldArea = page.locator('div.search-field-area, div#collapseExample div.search-field-area').first();
    
    // Search form fields
    // HTML: Date picker (Material Design date range input)
    // Look for date picker with label "Date" in the billing search form
    this.datePickerInput = page.locator('div#collapseExample input[formcontrolname="startDate"], div#collapseExample input.mat-start-date, div#collapseExample input[placeholder*="From"], mat-form-field:has(mat-label:has-text("Date")) input[formcontrolname="startDate"]').first();
    this.datePickerEndInput = page.locator('div#collapseExample input[formcontrolname="endDate"], div#collapseExample input.mat-end-date, div#collapseExample input[placeholder*="To"], mat-form-field:has(mat-label:has-text("Date")) input[formcontrolname="endDate"]').first();
    this.datePickerToggle = page.locator('div#collapseExample button[aria-label*="calendar"], div#collapseExample mat-datepicker-toggle button').first();
    
    // HTML: Action Type dropdown (Material Design mat-select)
    // Look for mat-select with label "Action Type" in the billing search form
    this.actionTypeDropdown = page.locator('div#collapseExample mat-select[aria-labelledby*="Action Type"], div#collapseExample mat-form-field:has(mat-label:has-text("Action Type")) mat-select, mat-form-field:has(mat-label:has-text("Action Type")) mat-select').first();
    this.actionTypeDropdownPanel = page.locator('div.cdk-overlay-pane mat-option, div[class*="cdk-overlay"] mat-option').first();
    this.actionTypeOptions = page.locator('mat-option:has-text("Free Credit"), mat-option:has-text("Credit Bought"), mat-option:has-text("Adjustment")');
    
    // HTML: Partner Email input field
    this.partnerEmailInput = page.locator('input[placeholder*="Partner Email"], input[id*="partnerEmail"], input[formcontrolname*="partnerEmail"], input[name*="partnerEmail"]').first();
    
    // Search and Reset buttons
    this.searchButton = page.locator('button:has-text("Search"), button[type="submit"]:has-text("Search"), .search-btn, button.btn.search-btn').first();
    this.resetButton = page.locator('button:has-text("Reset"), button.reset-btn, button.btn.reset-btn').first();

    // Table elements
    this.billingTable = page.locator('table, [class*="table"], [role="table"]').first();
    this.allTableRows = page.locator('table tbody tr, [role="table"] [role="row"]:not([role="columnheader"])');
    this.tableHeaders = page.locator('table thead th, [role="table"] [role="columnheader"]');
    
    // Arrow button to expand/collapse sub-table
    // HTML: <i class="bold bi bi-arrow-right-circle">
    this.arrowButton = page.locator('i.bi-arrow-right-circle, i.bold.bi-arrow-right-circle, td:has(i.bi-arrow-right-circle), button:has(i.bi-arrow-right-circle)').first();
    this.arrowButtons = page.locator('i.bi-arrow-right-circle, i.bold.bi-arrow-right-circle');
    
    // Sub-table elements (expanded sub-table)
    this.subTable = page.locator('div.card.shadow-sm table, div[class*="card"] table, tr td[colspan] table').first();
    this.subTableRows = page.locator('div.card.shadow-sm table tbody tr, tr td[colspan] table tbody tr').first();
    this.subTableCards = page.locator('div.card.shadow-sm, tr td[colspan] div.card').first();
    
    // Sub-table columns
    this.subTableDateColumn = page.locator('td[class*="Date & Time"], td:has-text("Dec"), td:has-text("Date")').first();
    this.subTableActionColumn = page.locator('td[class*="Action"], td:has-text("creditBought"), td:has-text("Free Credit")').first();
    
    // Empty sub-table message/card
    this.emptySubTableCard = page.locator('div.card:has-text("No Data"), div.card:has-text("No data"), div.card:has-text("empty"), tr td[colspan]:has-text("No Data")').first();

    // Action buttons
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), .btn:has-text("Select Headers")').first();

    // Pagination info
    this.paginationInfo = page.locator('*:has-text("Showing"), *:has-text("records"), *:has-text("to")').first();
    
    // Error messages
    this.errorMessages = page.locator('.alert-danger, .text-danger, .error-message, *:has-text("error"), *:has-text("Error")').first();
    this.noDataMessage = page.locator('*:has-text("No Data Found"), *:has-text("No data found"), *:has-text("No Data"), *:has-text("No data")').first();
  }

  /**
   * Navigates to the Billing page.
   * @param {string} baseUrl - The base URL of the application.
   */
  async gotoBilling(baseUrl) {
    try {
      const url = `${baseUrl}/billing`;
      
      // Try multiple navigation strategies
      try {
        // Strategy 1: Click on Billing link in sidebar
        const isBillingLinkVisible = await this.billingRouterLink.isVisible({ timeout: 3000 }).catch(() => false);
        if (isBillingLinkVisible) {
          await this.billingRouterLink.click();
          await this.page.waitForTimeout(2000);
          await this.page.waitForLoadState('networkidle');
          return;
        }
      } catch {
        // Continue to next strategy
      }

      try {
        // Strategy 2: Click on text-based Billing link
        const isBillingTextLinkVisible = await this.billingLink.isVisible({ timeout: 3000 }).catch(() => false);
        if (isBillingTextLinkVisible) {
          await this.billingLink.click();
          await this.page.waitForTimeout(2000);
          await this.page.waitForLoadState('networkidle');
          return;
        }
      } catch {
        // Continue to next strategy
      }

      // Strategy 3: Direct URL navigation
      await this.page.goto(url, { waitUntil: 'networkidle' });
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to navigate to Billing page: ${error.message}`);
    }
  }

  /**
   * Verifies if the Billing page is loaded.
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Check URL
      const url = this.page.url();
      const isUrlCorrect = url.includes('/billing');
      
      if (!isUrlCorrect) {
        return false;
      }

      // Check for page heading with retry
      let isHeadingVisible = false;
      for (let i = 0; i < 3; i++) {
        isHeadingVisible = await this.pageHeading.isVisible({ timeout: 2000 }).catch(() => false);
        if (isHeadingVisible) {
          break;
        }
        await this.page.waitForTimeout(1000);
      }

      // Fallback: Check for other page elements
      if (!isHeadingVisible) {
        const isTableVisible = await this.billingTable.isVisible({ timeout: 3000 }).catch(() => false);
        const isSearchVisible = await this.searchHereButton.isVisible({ timeout: 3000 }).catch(() => false);
        return isTableVisible || isSearchVisible;
      }

      return isHeadingVisible;
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
      const heading = await this.pageHeading.textContent();
      return heading ? heading.trim() : '';
    } catch (error) {
      throw new Error(`Failed to retrieve page heading: ${error.message}`);
    }
  }

  // ==================== SEARCH METHODS ====================

  /**
   * Clicks the "Search Here" button to open the search panel.
   */
  async clickSearchHere() {
    try {
      // Check if panel is already open
      const isAlreadyOpen = await this.isSearchPanelOpen();
      if (isAlreadyOpen) {
        return; // Already open
      }
      
      // Try multiple strategies to find and click Search Here
      const searchHereLocators = [
        this.page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]'),
        this.searchHereButton,
        this.searchHereSpan,
        this.page.locator('*:has-text("Search Here"):has(i.bi-search)')
      ];
      
      let clicked = false;
      for (const locator of searchHereLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await locator.click();
            await this.page.waitForTimeout(2000);
            clicked = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Search Here button not found');
      }
      
      // Wait for search panel to be visible with retry
      let isOpen = false;
      for (let i = 0; i < 5; i++) {
        isOpen = await this.isSearchPanelOpen();
        if (isOpen) {
          break;
        }
        await this.page.waitForTimeout(500);
      }
      
      if (!isOpen) {
        // Last attempt - check if button aria-expanded changed
        const button = this.page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]');
        const ariaExpanded = await button.getAttribute('aria-expanded').catch(() => 'false');
        if (ariaExpanded === 'true') {
          // Button says it's expanded, wait a bit more for animation
          await this.page.waitForTimeout(1000);
          isOpen = await this.isSearchPanelOpen();
        }
      }
    } catch (error) {
      throw new Error(`Failed to click Search Here: ${error.message}`);
    }
  }

  /**
   * Verifies if the search panel is open.
   * @returns {Promise<boolean>}
   */
  async isSearchPanelOpen() {
    try {
      // Strategy 1: Check if collapse panel has 'show' class (Bootstrap collapse)
      const collapsePanel = this.page.locator('div#collapseExample');
      const hasShowClass = await collapsePanel.evaluate(el => el.classList.contains('show')).catch(() => false);
      
      if (hasShowClass) {
        // Also verify form is visible
        const isFormVisible = await this.searchForm.isVisible({ timeout: 2000 }).catch(() => false);
        if (isFormVisible) {
          return true;
        }
        // Check if search field area is visible
        const isSearchFieldAreaVisible = await this.searchFieldArea.isVisible({ timeout: 2000 }).catch(() => false);
        if (isSearchFieldAreaVisible) {
          return true;
        }
      }
      
      // Strategy 2: Check button aria-expanded attribute
      const button = this.page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]');
      const ariaExpanded = await button.getAttribute('aria-expanded').catch(() => 'false');
      if (ariaExpanded === 'true') {
        // Button says it's expanded, check if form is visible
        const isFormVisible = await this.searchForm.isVisible({ timeout: 2000 }).catch(() => false);
        if (isFormVisible) {
          return true;
        }
        const isSearchFieldAreaVisible = await this.searchFieldArea.isVisible({ timeout: 2000 }).catch(() => false);
        if (isSearchFieldAreaVisible) {
          return true;
        }
      }
      
      // Strategy 3: Check if search field area is visible
      const isSearchFieldAreaVisible = await this.searchFieldArea.isVisible({ timeout: 2000 }).catch(() => false);
      if (isSearchFieldAreaVisible) {
        return true;
      }
      
      // Strategy 4: Check if form is visible
      const isFormVisible = await this.searchForm.isVisible({ timeout: 2000 }).catch(() => false);
      if (isFormVisible) {
        return true;
      }
      
      // Strategy 5: Check if search panel is visible and has content
      const isPanelVisible = await this.searchPanel.isVisible({ timeout: 2000 }).catch(() => false);
      if (isPanelVisible) {
        // Check if it has form content
        const hasForm = await this.searchPanel.locator('form').isVisible({ timeout: 1000 }).catch(() => false);
        return hasForm;
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Fills the date picker with a date range.
   * @param {string} startDate - Start date in format YYYY-MM-DD
   * @param {string} endDate - End date in format YYYY-MM-DD
   */
  async fillDateRange(startDate, endDate) {
    try {
      // Try to fill start date
      const startDateVisible = await this.datePickerInput.isVisible({ timeout: 5000 }).catch(() => false);
      if (startDateVisible) {
        await this.datePickerInput.click();
        await this.page.waitForTimeout(500);
        await this.datePickerInput.fill(startDate);
        await this.page.waitForTimeout(500);
      }
      
      // Try to fill end date
      const endDateVisible = await this.datePickerEndInput.isVisible({ timeout: 5000 }).catch(() => false);
      if (endDateVisible) {
        await this.datePickerEndInput.click();
        await this.page.waitForTimeout(500);
        await this.datePickerEndInput.fill(endDate);
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to fill date range: ${error.message}`);
    }
  }

  /**
   * Selects an action type from the dropdown.
   * @param {string} actionType - The action type to select (e.g., "Free Credit", "Credit Bought", "Adjustment")
   */
  async selectActionType(actionType) {
    try {
      await this.actionTypeDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.actionTypeDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.actionTypeDropdown.click();
      
      // Wait for dropdown panel to appear
      await this.page.waitForTimeout(1000);
      await this.actionTypeDropdownPanel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      // Select the option
      const option = this.page.locator(`mat-option:has-text("${actionType}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select action type ${actionType}: ${error.message}`);
    }
  }

  /**
   * Fills the partner email input field.
   * @param {string} email - The partner email address.
   */
  async fillPartnerEmail(email) {
    try {
      await this.partnerEmailInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.partnerEmailInput.scrollIntoViewIfNeeded();
      await this.partnerEmailInput.clear();
      await this.partnerEmailInput.fill(email);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill partner email: ${error.message}`);
    }
  }

  /**
   * Clicks the Search button.
   */
  async clickSearchButton() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.searchButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Search button: ${error.message}`);
    }
  }

  /**
   * Clicks the Reset button.
   */
  async clickResetButton() {
    try {
      await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.resetButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Reset button: ${error.message}`);
    }
  }

  /**
   * Clicks the arrow button to expand/collapse sub-table for the first row.
   */
  async clickArrowButton() {
    try {
      // Try multiple locator strategies
      const arrowButtonLocators = [
        this.page.locator('i.bi-arrow-right-circle').first(),
        this.page.locator('i.bold.bi-arrow-right-circle').first(),
        this.page.locator('td:has(i.bi-arrow-right-circle)').first(),
        this.page.locator('td.cursor-pointer:has(i.bi-arrow-right-circle)').first(),
        this.arrowButton
      ];
      
      let clicked = false;
      for (const locator of arrowButtonLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await locator.click();
            await this.page.waitForTimeout(2000);
            clicked = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Arrow button not found');
      }
    } catch (error) {
      throw new Error(`Failed to click arrow button: ${error.message}`);
    }
  }

  /**
   * Checks if sub-table has data by checking Date & Time column.
   * @returns {Promise<boolean>} Returns true if data is available, false if empty.
   */
  async hasSubTableDateData() {
    try {
      await this.page.waitForTimeout(1000);
      // Check if sub-table card exists
      const subTableCardVisible = await this.subTableCards.isVisible({ timeout: 3000 }).catch(() => false);
      if (!subTableCardVisible) {
        return false;
      }
      
      // Check if empty message exists
      const emptyMessageVisible = await this.emptySubTableCard.isVisible({ timeout: 2000 }).catch(() => false);
      if (emptyMessageVisible) {
        return false;
      }
      
      // Check if Date & Time column has data
      const dateColumnVisible = await this.subTableDateColumn.isVisible({ timeout: 3000 }).catch(() => false);
      if (dateColumnVisible) {
        const dateText = await this.subTableDateColumn.textContent().catch(() => '');
        return dateText.trim().length > 0 && !dateText.toLowerCase().includes('no data');
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Checks if sub-table has data by checking Action column.
   * @returns {Promise<boolean>} Returns true if data is available, false if empty.
   */
  async hasSubTableActionData() {
    try {
      await this.page.waitForTimeout(1000);
      // Check if sub-table card exists
      const subTableCardVisible = await this.subTableCards.isVisible({ timeout: 3000 }).catch(() => false);
      if (!subTableCardVisible) {
        return false;
      }
      
      // Check if empty message exists
      const emptyMessageVisible = await this.emptySubTableCard.isVisible({ timeout: 2000 }).catch(() => false);
      if (emptyMessageVisible) {
        return false;
      }
      
      // Check if Action column has data
      const actionColumnVisible = await this.subTableActionColumn.isVisible({ timeout: 3000 }).catch(() => false);
      if (actionColumnVisible) {
        const actionText = await this.subTableActionColumn.textContent().catch(() => '');
        return actionText.trim().length > 0 && !actionText.toLowerCase().includes('no data');
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Verifies if all search fields are cleared after reset.
   * @returns {Promise<boolean>}
   */
  async areAllFieldsCleared() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check date inputs
      const startDateValue = await this.datePickerInput.inputValue().catch(() => '');
      const endDateValue = await this.datePickerEndInput.inputValue().catch(() => '');
      
      // Check partner email
      const emailValue = await this.partnerEmailInput.inputValue().catch(() => '');
      
      // Check action type (should be empty/placeholder)
      const actionTypeText = await this.actionTypeDropdown.textContent().catch(() => '');
      const isActionTypeEmpty = !actionTypeText || actionTypeText.trim() === '' || actionTypeText.includes('Please Select');
      
      return startDateValue === '' && endDateValue === '' && emailValue === '' && isActionTypeEmpty;
    } catch {
      return false;
    }
  }

  /**
   * Checks if there are any error messages visible on the page.
   * @returns {Promise<boolean>}
   */
  async hasErrorMessages() {
    try {
      const isErrorVisible = await this.errorMessages.isVisible({ timeout: 2000 }).catch(() => false);
      return isErrorVisible;
    } catch {
      return false;
    }
  }

  /**
   * Gets the table row count.
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      await this.page.waitForTimeout(1000);
      const rows = await this.allTableRows.all();
      return rows.length;
    } catch {
      return 0;
    }
  }

  /**
   * Checks if the table has data (rows).
   * @returns {Promise<boolean>}
   */
  async hasTableData() {
    try {
      await this.page.waitForTimeout(1000);
      const rowCount = await this.getTableRowCount();
      return rowCount > 0;
    } catch {
      return false;
    }
  }
}

module.exports = { BillingPage };

