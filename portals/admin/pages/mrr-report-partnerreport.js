class PartnerReportPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div class="dropdown-sidebar-items dropdown-section"> with title "MRR Reports"
    this.mrrReportsMenu = page.locator('div.dropdown-sidebar-items:has-text("MRR Reports"), .dropdown-section:has-text("MRR Reports")').first();
    
    // Partner Report option in dropdown
    // HTML: <li routerlink="/mrr-reports/partnerReport"> Partner Report </li>
    this.partnerReportOption = page.locator('li[ng-reflect-router-link="/mrr-reports/partnerReport"], li[routerlink="/mrr-reports/partnerReport"], li:has-text("Partner Report"):not(:has-text("MRR Report")):not(:has-text("Account Manager"))').first();
    
    // Page elements
    // HTML: Page heading "Partner Report"
    this.pageHeading = page.locator('h1:has-text("Partner Report"), h2:has-text("Partner Report"), .heading:has-text("Partner Report"), *:has-text("Partner Report"):not(div.dropdown-sidebar-items):not(li):not(script):not(style)').first();
    this.pageWrapper = page.locator('app-root, app-partner-report, [class*="partner-report"], [class*="partnerReport"]').first();
    
    // Filter elements
    // Date picker elements
    // HTML: <input matinput placeholder="MM/YYYY" mat-datepicker>
    this.datePickerInput = page.locator('input[placeholder="MM/YYYY"], input[placeholder*="month"], input[placeholder*="year"], input.mat-datepicker-input').first();
    this.datePickerLabel = page.locator('mat-label:has-text("Choose a month and year")').first();
    
    // Account Manager dropdown - Material Design mat-select
    this.accountManagerDropdownButton = page.locator('mat-select').filter({ has: page.locator('mat-label:has-text("Account Manager")') }).first();
    
    // Tab buttons
    this.mrrTab = page.locator('button:has-text("MRR"), .btn:has-text("MRR")').first();
    this.subscriptionTab = page.locator('button:has-text("Subscription"), .btn:has-text("Subscription")').first();
    
    // Export button
    this.exportButton = page.locator('button:has-text("EXPORT TO EXCEL"), button:has-text("Export"), .btn:has-text("EXPORT")').first();
    
    // Table elements
    this.reportTable = page.locator('table, [class*="table"], [role="table"]').first();
    
    // Company Name column cells (clickable values)
    // These are typically in the Company Name column and are clickable links
    this.companyNameColumnCells = page.locator('table td, [role="cell"]').filter({ 
      hasText: /.+/ 
    }).filter({ 
      hasNot: page.locator(':has-text("S. No."), :has-text("Company Name"), :has-text("Account Manager"), :has-text("Price"), :has-text("Schedu")') 
    });
    
    // Company Name column values (specifically targeting clickable company names)
    // These are usually links or clickable elements within the Company Name column
    this.companyNameColumnValues = page.locator('table td a, table td[class*="pointer"], table td[class*="link"], table td span[class*="pointer"], table td span[class*="link"]').filter({ 
      hasText: /.+/ 
    });
  }

  /**
   * Navigates to the Partner Report page.
   * @param {string} baseUrl - The base URL of the application.
   */
  async gotoPartnerReport(baseUrl) {
    try {
      // First, try clicking the MRR Reports menu to expand dropdown
      await this.mrrReportsMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.mrrReportsMenu.scrollIntoViewIfNeeded();
      await this.mrrReportsMenu.click();
      await this.page.waitForTimeout(2000);
      
      // Then click on Partner Report option - be very specific
      // Wait for the dropdown items to be visible
      await this.page.waitForTimeout(1000);
      
      // Use more specific locator targeting the exact routerlink
      const partnerReportLink = this.page.locator('li[ng-reflect-router-link="/mrr-reports/partnerReport"]').first();
      const isVisible = await partnerReportLink.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isVisible) {
        await partnerReportLink.scrollIntoViewIfNeeded();
        await partnerReportLink.click();
      } else {
        // Fallback: find by text but exclude other options
        const partnerReportByText = this.page.locator('li:has-text("Partner Report")').filter({ 
          hasNot: this.page.locator(':has-text("MRR Report"), :has-text("Account Manager")') 
        }).first();
        await partnerReportByText.waitFor({ state: 'visible', timeout: 10000 });
        await partnerReportByText.scrollIntoViewIfNeeded();
        await partnerReportByText.click();
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
        const partnerReportUrl = url.endsWith('/') ? `${url}mrr-reports/partnerReport` : `${url}/mrr-reports/partnerReport`;
        await this.page.goto(partnerReportUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
      } catch (navError) {
        throw new Error(`Failed to navigate to Partner Report page: ${error.message}`);
      }
    }
  }

  /**
   * Verifies if the Partner Report page is loaded.
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Check URL
      const currentUrl = this.page.url();
      if (currentUrl.includes('partnerReport') || currentUrl.includes('partner-report')) {
        // URL matches, now check for page elements
        let retries = 3;
        while (retries > 0) {
          const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
          if (isHeadingVisible) {
            return true;
          }
          
          // Fallback: check for other page elements
          const isTableVisible = await this.reportTable.isVisible({ timeout: 3000 }).catch(() => false);
          const isDatePickerVisible = await this.datePickerInput.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isTableVisible || isDatePickerVisible) {
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

  // ==================== TABLE INTERACTION METHODS ====================

  /**
   * Gets all Company Name column values from the table
   * @returns {Promise<Array>} Array of company names
   */
  async getCompanyNameColumnValues() {
    try {
      await this.reportTable.waitFor({ state: 'visible', timeout: 10000 });
      const values = [];
      
      // Try to find clickable company name values
      const clickableValues = await this.companyNameColumnValues.all();
      for (const value of clickableValues) {
        const text = await value.textContent();
        if (text && text.trim() && !text.trim().match(/^\d+$/) && text.trim() !== '-') {
          values.push(text.trim());
        }
      }
      
      // If no clickable values found, try getting from table cells
      // Look for cells that are likely in the Company Name column (first data column after S. No.)
      if (values.length === 0) {
        const rows = this.reportTable.locator('tbody tr, tr:not(thead tr)');
        const rowCount = await rows.count();
        
        for (let i = 0; i < Math.min(rowCount, 10); i++) {
          const row = rows.nth(i);
          // Company Name is typically the second column (index 1) after S. No.
          const companyNameCell = row.locator('td').nth(1);
          const isVisible = await companyNameCell.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            const text = await companyNameCell.textContent();
            if (text && text.trim() && !text.trim().match(/^\d+$/) && text.trim() !== '-') {
              values.push(text.trim());
            }
          }
        }
      }
      
      return values;
    } catch {
      return [];
    }
  }

  /**
   * Clicks on a Company Name column value
   * @param {string} companyName - The name of the company to click (optional, clicks first available if not provided)
   * @returns {Promise<void>}
   */
  async clickCompanyNameColumnValue(companyName = null) {
    try {
      await this.reportTable.waitFor({ state: 'visible', timeout: 10000 });
      
      let targetElement = null;
      
      if (companyName) {
        // Find the specific company by name
        // Try clickable elements first
        const clickableElement = this.page.locator(`table td a:has-text("${companyName}"), table td[class*="pointer"]:has-text("${companyName}"), table td span[class*="pointer"]:has-text("${companyName}")`).first();
        const isVisible = await clickableElement.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (isVisible) {
          targetElement = clickableElement;
        } else {
          // Fallback: find in table cells (Company Name is typically the second column)
          const rows = this.reportTable.locator('tbody tr, tr:not(thead tr)');
          const rowCount = await rows.count();
          
          for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const companyNameCell = row.locator('td').nth(1);
            const cellText = await companyNameCell.textContent();
            if (cellText && cellText.trim() === companyName) {
              targetElement = companyNameCell;
              break;
            }
          }
        }
      } else {
        // Click the first available company name value
        const firstClickable = this.companyNameColumnValues.first();
        const isVisible = await firstClickable.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (isVisible) {
          targetElement = firstClickable;
        } else {
          // Fallback: get first company name from table (second column)
          const rows = this.reportTable.locator('tbody tr, tr:not(thead tr)');
          const firstRow = rows.first();
          const companyNameCell = firstRow.locator('td').nth(1);
          const isCellVisible = await companyNameCell.isVisible({ timeout: 3000 }).catch(() => false);
          if (isCellVisible) {
            targetElement = companyNameCell;
          }
        }
      }
      
      if (!targetElement) {
        throw new Error('No company name value found to click');
      }
      
      await targetElement.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await targetElement.click();
      
      // Wait for navigation
      await this.page.waitForTimeout(3000);
      await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await this.page.waitForLoadState('domcontentloaded');
    } catch (error) {
      throw new Error(`Failed to click Company Name column value: ${error.message}`);
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
}

module.exports = { PartnerReportPage };

