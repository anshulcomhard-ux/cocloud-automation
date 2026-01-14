const { expect } = require('@playwright/test');

class LicenseDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - License Details module entry
    this.licenseDetailsMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/license-details"], ' +
        'div.sidebar-items:has(span.title:has-text("License Details"))'
      )
      .first();

    // License Details page title
    this.licenseDetailsPageTitle = page
      .locator(
        'h1:has-text("License Details"), h2:has-text("License Details"), ' +
        'span.title:has-text("License Details"), *:has-text("License Details")'
      )
      .first();

    // Search section toggle button
    this.searchToggleButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here")').first();

    // Search fields area
    this.searchFieldArea = page.locator('div.search-field-area').first();

    // Search form fields
    this.tssSerialNumberField = page.locator('input#serialNumber[placeholder="TSS S.no"]').first();
    this.subIdField = page.locator('input#subId[placeholder="Sub Id"]').first();
    this.expiryDateField = page.locator('input[placeholder="MM/YYYY"]').first();
    this.expiryDateToggleButton = page.locator('button[aria-label="Open calendar"]').first();

    // Search and Reset buttons
    this.searchButton = page.locator('button.search-btn:has-text("Search"), button[type="submit"]:has-text("Search")').first();
    this.resetButton = page.locator('button.reset-btn.ms-3:has-text("Reset"), button.reset-btn:has-text("Reset"), button[type="button"].reset-btn').first();

    // Table elements
    this.licenseDetailsTable = page.locator('table, mat-table').first();
    this.tableRows = page.locator('tr[mat-row], tr[role="row"]:not([mat-header-row])');
    this.tableHeaders = page.locator('th[mat-header-cell], th[role="columnheader"]');
    
    // Table columns
    this.subIdColumn = page.locator('td[mat-cell].mat-column-Sub-Id, td.cdk-column-Sub-Id');
    this.tssSerialNumberColumn = page.locator('td[mat-cell].mat-column-Tally-S-No, td.cdk-column-Tally-S-No');
    this.expiryColumn = page.locator('td[mat-cell].mat-column-TSS-Expiry, td.cdk-column-TSS-Expiry');

    // Pagination info
    this.paginationInfo = page.locator('div.total-data-info').first();
    this.paginationRangeLabel = page.locator('div.mat-mdc-paginator-range-label').first();
    
    // Pagination buttons
    this.nextPageButton = page.locator('button.mat-mdc-paginator-navigation-next').first();
    this.previousPageButton = page.locator('button.mat-mdc-paginator-navigation-previous').first();
    
    // Page size dropdown
    this.pageSizeSelect = page.locator('mat-select[aria-labelledby*="mat-paginator-page-size-label"]').first();
    this.pageSizeOptions = page.locator('mat-option[role="option"]');
    
    // No data message
    this.noDataMessage = page.locator('div.my-4.fs-5:has-text("There is no Tally Data Created Yet."), div:has-text("There is no Tally Data Created Yet.")').first();
    
    // Select Headers dropdown
    this.selectHeadersButton = page.locator(
      'button.header-btn.btn.dropdown-toggle:has-text("Select Headers"), ' +
      'button[data-bs-toggle="dropdown"].header-btn:has-text("Select Headers"), ' +
      'button.dropdown-toggle:has-text("Select Headers")'
    ).first();
    this.selectHeadersDropdown = page.locator('ul.dropdown-menu.dropdown-header-menu').first();
    this.headerCheckboxes = page.locator('ul.dropdown-menu.dropdown-header-menu input[type="checkbox"]');
    this.headerLabels = page.locator('ul.dropdown-menu.dropdown-header-menu label');
    this.noColumnsMessage = page.locator(
      'div:has-text("No columns selected. Please choose at least one header to display data."), ' +
      'div:has-text("No columns selected"), ' +
      '*:has-text("No columns selected. Please choose at least one header to display data.")'
    ).first();
  }

  /**
   * Navigates to the License Details page
   */
  async navigateToLicenseDetails() {
    try {
      await this.page.waitForTimeout(1000);
      await this.licenseDetailsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.licenseDetailsMenuItem.scrollIntoViewIfNeeded();
      await this.licenseDetailsMenuItem.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for page content to render
      console.log('✓ Navigated to License Details page');
    } catch (error) {
      console.error('Error navigating to License Details page:', error);
      throw error;
    }
  }

  /**
   * Verifies that the License Details page is visible
   * @returns {Promise<boolean>}
   */
  async isLicenseDetailsPageVisible() {
    try {
      const isVisible = await this.licenseDetailsPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Opens the search section if it's collapsed
   */
  async openSearchSection() {
    try {
      const isExpanded = await this.searchToggleButton.getAttribute('aria-expanded');
      if (isExpanded !== 'true') {
        await this.searchToggleButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Search section opened');
      } else {
        console.log('✓ Search section already open');
      }
    } catch (error) {
      console.error('Error opening search section:', error);
    }
  }

  /**
   * Verifies all search fields are visible
   * @returns {Promise<boolean>}
   */
  async areAllSearchFieldsVisible() {
    try {
      await this.openSearchSection();
      
      const searchToggleVisible = await this.searchToggleButton.isVisible({ timeout: 3000 }).catch(() => false);
      const tssSerialVisible = await this.tssSerialNumberField.isVisible({ timeout: 3000 }).catch(() => false);
      const subIdVisible = await this.subIdField.isVisible({ timeout: 3000 }).catch(() => false);
      const expiryVisible = await this.expiryDateField.isVisible({ timeout: 3000 }).catch(() => false);
      const searchButtonVisible = await this.searchButton.isVisible({ timeout: 3000 }).catch(() => false);
      const resetButtonVisible = await this.resetButton.isVisible({ timeout: 3000 }).catch(() => false);

      console.log(`Search Here toggle visible: ${searchToggleVisible}`);
      console.log(`TSS S.no field visible: ${tssSerialVisible}`);
      console.log(`Sub Id field visible: ${subIdVisible}`);
      console.log(`Expiry date field visible: ${expiryVisible}`);
      console.log(`Search button visible: ${searchButtonVisible}`);
      console.log(`Reset button visible: ${resetButtonVisible}`);

      return searchToggleVisible && tssSerialVisible && subIdVisible && expiryVisible && searchButtonVisible && resetButtonVisible;
    } catch (error) {
      console.error('Error checking search fields visibility:', error);
      return false;
    }
  }

  /**
   * Fills the TSS S.no search field
   * @param {string} tssSerialNumber - The TSS S.no to search for
   */
  async fillTssSerialNumberField(tssSerialNumber) {
    await this.openSearchSection();
    await this.tssSerialNumberField.waitFor({ state: 'visible', timeout: 5000 });
    await this.tssSerialNumberField.fill(tssSerialNumber);
    console.log(`✓ Filled TSS S.no field with: "${tssSerialNumber}"`);
  }

  /**
   * Fills the Sub Id search field
   * @param {string} subId - The Sub Id to search for
   */
  async fillSubIdField(subId) {
    await this.openSearchSection();
    await this.subIdField.waitFor({ state: 'visible', timeout: 5000 });
    await this.subIdField.fill(subId);
    console.log(`✓ Filled Sub Id field with: "${subId}"`);
  }

  /**
   * Opens the Expiry date picker
   */
  async openExpiryDatePicker() {
    try {
      await this.openSearchSection();
      await this.expiryDateToggleButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.expiryDateToggleButton.click();
      await this.page.waitForTimeout(1000); // Wait for calendar to open
      console.log('✓ Expiry date picker opened');
    } catch (error) {
      console.error('Error opening Expiry date picker:', error);
      throw error;
    }
  }

  /**
   * Selects a month and year from the month-year picker
   * @param {string} monthYear - Format: "MM/YYYY" (e.g., "08/2025")
   */
  async selectExpiryDate(monthYear) {
    try {
      await this.openSearchSection();
      
      // Click on the date input to open calendar
      await this.expiryDateField.waitFor({ state: 'visible', timeout: 5000 });
      await this.expiryDateField.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for calendar panel to appear
      const calendarPanel = this.page.locator('mat-calendar, .mat-datepicker-popup, [role="dialog"]').first();
      await calendarPanel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      // Parse month and year
      const [month, year] = monthYear.split('/').map(Number);
      
      // Select month and year using evaluate
      await this.page.evaluate(({ month, year }) => {
        const calendar = document.querySelector('mat-calendar');
        if (calendar) {
          // Try to find and click the month/year cell
          const cells = calendar.querySelectorAll('.mat-calendar-body-cell, .mat-calendar-body-label');
          for (const cell of cells) {
            const cellText = cell.textContent?.trim();
            // This is a simplified approach - may need adjustment based on actual calendar structure
            if (cellText && (cellText.includes(String(month)) || cellText.includes(String(year)))) {
              cell.click();
              break;
            }
          }
        }
      }, { month, year });
      
      await this.page.waitForTimeout(1000);
      
      // Close calendar if still open
      await this.page.keyboard.press('Escape').catch(() => {});
      await this.page.waitForTimeout(500);
      
      // Fallback: try filling input directly
      try {
        await this.expiryDateField.fill(monthYear);
        await this.page.waitForTimeout(300);
        console.log(`✓ Selected expiry date: ${monthYear}`);
      } catch (fallbackError) {
        console.log(`✓ Attempted to select expiry date: ${monthYear}`);
      }
    } catch (error) {
      console.error('Error selecting expiry date:', error);
      // Fallback: try filling input directly
      try {
        await this.expiryDateField.fill(monthYear);
        await this.page.waitForTimeout(300);
        console.log(`✓ Selected expiry date using fallback: ${monthYear}`);
      } catch (fallbackError) {
        console.error('Fallback date selection also failed:', fallbackError);
        throw error;
      }
    }
  }

  /**
   * Clicks the Search button
   */
  async clickSearchButton() {
    await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000); // Wait for search results to load
    console.log('✓ Search button clicked');
  }

  /**
   * Clicks the Reset button
   */
  async clickResetButton() {
    try {
      // Wait for any spinners/overlays to disappear first
      try {
        await this.page.waitForTimeout(1000);
      } catch (error) {
        if (error.message && error.message.includes('closed')) {
          throw error;
        }
      }
      
      // Wait for spinner to disappear if present
      const spinner = this.page.locator('ngx-spinner, .ngx-spinner-overlay').first();
      try {
        await spinner.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      } catch (e) {
        // Spinner might not be present, continue
      }
      
      await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll into view if needed
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click to bypass any interceptors
      await this.resetButton.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log('✓ Reset button clicked');
    } catch (error) {
      // If it's a page closed error, re-throw it
      if (error.message && error.message.includes('closed')) {
        throw error;
      }
      // Otherwise, try regular click as fallback
      try {
        await this.resetButton.click({ timeout: 5000 });
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        console.log('✓ Reset button clicked (fallback method)');
      } catch (retryError) {
        console.error('Error clicking Reset button:', retryError);
        throw retryError;
      }
    }
  }

  /**
   * Verifies all search fields are empty
   * @returns {Promise<boolean>}
   */
  async areSearchFieldsEmpty() {
    try {
      await this.openSearchSection();
      
      const tssSerialValue = await this.tssSerialNumberField.inputValue().catch(() => '');
      const subIdValue = await this.subIdField.inputValue().catch(() => '');
      const expiryValue = await this.expiryDateField.inputValue().catch(() => '');

      console.log(`TSS S.no field empty: ${tssSerialValue === ''}`);
      console.log(`Sub Id field empty: ${subIdValue === ''}`);
      console.log(`Expiry date field empty: ${expiryValue === ''}`);

      return tssSerialValue === '' && subIdValue === '' && expiryValue === '';
    } catch (error) {
      console.error('Error checking if search fields are empty:', error);
      return false;
    }
  }

  /**
   * Verifies table is visible
   * @returns {Promise<boolean>}
   */
  async isTableVisible() {
    try {
      const isVisible = await this.licenseDetailsTable.isVisible({ timeout: 5000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      console.error('Error checking table visibility:', error);
      return false;
    }
  }

  /**
   * Gets the pagination text
   * @returns {Promise<string>}
   */
  async getPaginationText() {
    try {
      const text = await this.paginationInfo.textContent().catch(() => '');
      return text.trim();
    } catch (error) {
      console.error('Error getting pagination text:', error);
      return '';
    }
  }

  /**
   * Extracts total number of records from pagination text
   * @returns {Promise<number>}
   */
  async getTotalRecords() {
    try {
      const paginationText = await this.getPaginationText();
      console.log(`Pagination text: "${paginationText}"`);
      
      // Try pattern: "Showing 1 to 20 of 20406 records"
      const matches = paginationText.match(/Showing\s+\d+\s+to\s+\d+\s+of\s+(\d+)\s+records/i);
      if (matches) {
        const total = parseInt(matches[1], 10);
        console.log(`Total records extracted: ${total}`);
        return total;
      }
      
      console.log('⚠ Could not extract total records from pagination text');
      return 0;
    } catch (error) {
      console.error('Error extracting total records:', error);
      return 0;
    }
  }

  /**
   * Gets all Sub Id values from the table
   * @returns {Promise<string[]>}
   */
  async getSubIdValues() {
    try {
      await this.page.waitForTimeout(1000);
      
      const subIds = await this.page.evaluate(() => {
        const values = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        
        for (const row of rows) {
          const cell = row.querySelector('td.mat-column-Sub-Id, td.cdk-column-Sub-Id');
          if (cell) {
            const link = cell.querySelector('a.sub-link span');
            const text = link ? (link.textContent || '').trim() : (cell.textContent || '').trim();
            if (text) {
              values.push(text);
            }
          }
        }
        
        return values;
      }).catch(() => []);
      
      console.log(`Extracted ${subIds.length} Sub Id values`);
      return subIds;
    } catch (error) {
      console.error('Error getting Sub Id values:', error);
      return [];
    }
  }

  /**
   * Gets all TSS S.no values from the table
   * @returns {Promise<string[]>}
   */
  async getTssSerialNumberValues() {
    try {
      await this.page.waitForTimeout(1000);
      
      const tssSerials = await this.page.evaluate(() => {
        const values = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        
        for (const row of rows) {
          const cell = row.querySelector('td.mat-column-Tally-S-No, td.cdk-column-Tally-S-No');
          if (cell) {
            const span = cell.querySelector('span');
            const text = span ? (span.textContent || '').trim() : (cell.textContent || '').trim();
            if (text) {
              values.push(text);
            }
          }
        }
        
        return values;
      }).catch(() => []);
      
      console.log(`Extracted ${tssSerials.length} TSS S.no values`);
      return tssSerials;
    } catch (error) {
      console.error('Error getting TSS S.no values:', error);
      return [];
    }
  }

  /**
   * Gets the first row's Sub Id value
   * @returns {Promise<string>}
   */
  async getFirstRowSubId() {
    try {
      await this.page.waitForTimeout(500);
      
      const subId = await this.page.evaluate(() => {
        const firstRow = document.querySelector('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        if (firstRow) {
          const cell = firstRow.querySelector('td.mat-column-Sub-Id, td.cdk-column-Sub-Id');
          if (cell) {
            const link = cell.querySelector('a.sub-link span');
            const text = link ? (link.textContent || '').trim() : (cell.textContent || '').trim();
            return text || '';
          }
        }
        return '';
      }).catch(() => '');
      
      console.log(`First row Sub Id: "${subId}"`);
      return subId;
    } catch (error) {
      console.error('Error getting first row Sub Id:', error);
      return '';
    }
  }

  /**
   * Gets the first row's TSS S.no value
   * @returns {Promise<string>}
   */
  async getFirstRowTssSerialNumber() {
    try {
      await this.page.waitForTimeout(500);
      
      const tssSerial = await this.page.evaluate(() => {
        const firstRow = document.querySelector('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        if (firstRow) {
          const cell = firstRow.querySelector('td.mat-column-Tally-S-No, td.cdk-column-Tally-S-No');
          if (cell) {
            const span = cell.querySelector('span');
            const text = span ? (span.textContent || '').trim() : (cell.textContent || '').trim();
            return text || '';
          }
        }
        return '';
      }).catch(() => '');
      
      console.log(`First row TSS S.no: "${tssSerial}"`);
      return tssSerial;
    } catch (error) {
      console.error('Error getting first row TSS S.no:', error);
      return '';
    }
  }

  /**
   * Verifies that all rows contain the searched Sub Id
   * @param {string} searchSubId - The Sub Id to verify
   * @returns {Promise<boolean>}
   */
  async verifySubIdInAllRows(searchSubId) {
    try {
      const subIds = await this.getSubIdValues();
      
      if (subIds.length === 0) {
        console.log('⚠ No rows found in table');
        return false;
      }
      
      const searchLower = searchSubId.toLowerCase();
      const allMatch = subIds.every(subId => {
        const subIdLower = subId.toLowerCase();
        return subIdLower.includes(searchLower) || searchLower.includes(subIdLower);
      });
      
      if (!allMatch) {
        console.log(`Some rows don't contain "${searchSubId}"`);
        console.log(`Sample Sub Ids:`, subIds.slice(0, 5));
      } else {
        console.log(`✓ All ${subIds.length} rows contain Sub Id "${searchSubId}"`);
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying Sub Id in rows:', error);
      return false;
    }
  }

  /**
   * Verifies that all rows contain the searched TSS S.no
   * @param {string} searchTssSerial - The TSS S.no to verify
   * @returns {Promise<boolean>}
   */
  async verifyTssSerialInAllRows(searchTssSerial) {
    try {
      const tssSerials = await this.getTssSerialNumberValues();
      
      if (tssSerials.length === 0) {
        console.log('⚠ No rows found in table');
        return false;
      }
      
      const searchLower = searchTssSerial.toLowerCase();
      const allMatch = tssSerials.every(tssSerial => {
        const tssSerialLower = tssSerial.toLowerCase();
        return tssSerialLower.includes(searchLower) || searchLower.includes(tssSerialLower);
      });
      
      if (!allMatch) {
        console.log(`Some rows don't contain "${searchTssSerial}"`);
        console.log(`Sample TSS S.nos:`, tssSerials.slice(0, 5));
      } else {
        console.log(`✓ All ${tssSerials.length} rows contain TSS S.no "${searchTssSerial}"`);
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying TSS S.no in rows:', error);
      return false;
    }
  }

  /**
   * Checks if "There is no Tally Data Created Yet." message is visible
   * @returns {Promise<boolean>}
   */
  async isNoDataMessageVisible() {
    try {
      await this.page.waitForTimeout(1500);
      const isVisible = await this.noDataMessage.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        // Extract only the message text, not the entire page content
        const messageText = await this.page.evaluate(() => {
          // Try to find the message div more specifically
          const allDivs = document.querySelectorAll('div.my-4.fs-5');
          for (const div of allDivs) {
            const text = div.textContent.trim();
            if (text.includes('There is no Tally Data Created Yet')) {
              // Return only the relevant part of the text
              const match = text.match(/There is no Tally Data Created Yet[^]*?/);
              return match ? match[0].substring(0, 50) : 'There is no Tally Data Created Yet.';
            }
          }
          return '';
        }).catch(() => '');
        
        // Log without showing the entire page content
        console.log(`✓ "There is no Tally Data Created Yet." message is visible`);
      } else {
        // Also check if table has no rows
        const rowCount = await this.getTableRowCount();
        if (rowCount === 0) {
          console.log('✓ No rows found in table (indicating no data)');
          return true;
        }
      }
      return isVisible;
    } catch (error) {
      console.error('Error checking for "No Data" message:', error);
      // Fallback: check if table has no rows
      try {
        const rowCount = await this.getTableRowCount();
        return rowCount === 0;
      } catch {
        return false;
      }
    }
  }

  /**
   * Gets the number of table rows
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      const count = await this.tableRows.count();
      return count;
    } catch (error) {
      console.error('Error getting table row count:', error);
      return 0;
    }
  }

  /**
   * Clicks the "Select Headers" button to open/close the dropdown
   */
  async clickSelectHeadersButton() {
    try {
      // Wait for page to be fully loaded
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
      
      // Scroll into view if needed
      await this.selectHeadersButton.scrollIntoViewIfNeeded();
      await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectHeadersButton.click();
      await this.page.waitForTimeout(500); // Wait for dropdown to open/close
      console.log('✓ Clicked Select Headers button');
    } catch (error) {
      console.error('Error clicking Select Headers button:', error);
      throw error;
    }
  }

  /**
   * Checks if the Select Headers dropdown is open
   * @returns {Promise<boolean>}
   */
  async isSelectHeadersDropdownOpen() {
    try {
      const isVisible = await this.selectHeadersDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      const ariaExpanded = await this.selectHeadersButton.getAttribute('aria-expanded');
      return isVisible && ariaExpanded === 'true';
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the Select Headers dropdown if it's not already open
   */
  async openSelectHeadersDropdown() {
    try {
      const isOpen = await this.isSelectHeadersDropdownOpen();
      if (!isOpen) {
        await this.clickSelectHeadersButton();
        await this.page.waitForTimeout(500);
      }
      console.log('✓ Select Headers dropdown is open');
    } catch (error) {
      console.error('Error opening Select Headers dropdown:', error);
      throw error;
    }
  }

  /**
   * Gets all header options from the dropdown
   * @returns {Promise<Array<{name: string, checked: boolean, value: string}>>}
   */
  async getHeaderOptions() {
    try {
      await this.openSelectHeadersDropdown();
      
      const headers = await this.page.evaluate(() => {
        const headerList = [];
        const labels = document.querySelectorAll('ul.dropdown-menu.dropdown-header-menu label');
        
        for (const label of labels) {
          const checkbox = label.querySelector('input[type="checkbox"]');
          const span = label.querySelector('span');
          
          if (checkbox && span) {
            headerList.push({
              name: span.textContent.trim(),
              checked: checkbox.checked,
              value: checkbox.value || span.textContent.trim()
            });
          }
        }
        
        return headerList;
      });
      
      console.log(`Found ${headers.length} header options:`, headers.map(h => `${h.name} (${h.checked ? 'checked' : 'unchecked'})`).join(', '));
      return headers;
    } catch (error) {
      console.error('Error getting header options:', error);
      return [];
    }
  }

  /**
   * Verifies that all expected headers are present
   * @param {string[]} expectedHeaders - Array of expected header names
   * @returns {Promise<boolean>}
   */
  async verifyAllHeadersPresent(expectedHeaders) {
    try {
      const headers = await this.getHeaderOptions();
      const headerNames = headers.map(h => h.name);
      
      const allPresent = expectedHeaders.every(expected => 
        headerNames.some(name => name.toLowerCase() === expected.toLowerCase())
      );
      
      if (!allPresent) {
        const missing = expectedHeaders.filter(expected => 
          !headerNames.some(name => name.toLowerCase() === expected.toLowerCase())
        );
        console.log(`Missing headers: ${missing.join(', ')}`);
      }
      
      return allPresent;
    } catch (error) {
      console.error('Error verifying headers present:', error);
      return false;
    }
  }

  /**
   * Verifies that all headers are checked by default
   * @returns {Promise<boolean>}
   */
  async verifyAllHeadersCheckedByDefault() {
    try {
      const headers = await this.getHeaderOptions();
      
      if (headers.length === 0) {
        console.log('⚠ No headers found');
        return false;
      }
      
      const allChecked = headers.every(h => h.checked);
      
      if (!allChecked) {
        const unchecked = headers.filter(h => !h.checked).map(h => h.name);
        console.log(`Unchecked headers: ${unchecked.join(', ')}`);
      } else {
        console.log(`✓ All ${headers.length} headers are checked by default`);
      }
      
      return allChecked;
    } catch (error) {
      console.error('Error verifying headers checked by default:', error);
      return false;
    }
  }

  /**
   * Checks or unchecks a header option by name
   * @param {string} headerName - The name of the header to check/uncheck
   * @param {boolean} check - true to check, false to uncheck
   */
  async toggleHeaderOption(headerName, check = true) {
    try {
      await this.openSelectHeadersDropdown();
      
      await this.page.evaluate(({ name, shouldCheck }) => {
        const labels = document.querySelectorAll('ul.dropdown-menu.dropdown-header-menu label');
        
        for (const label of labels) {
          const span = label.querySelector('span');
          const checkbox = label.querySelector('input[type="checkbox"]');
          
          if (span && checkbox && span.textContent.trim().toLowerCase() === name.toLowerCase()) {
            if (checkbox.checked !== shouldCheck) {
              checkbox.click();
            }
            break;
          }
        }
      }, { name: headerName, shouldCheck: check });
      
      await this.page.waitForTimeout(300); // Wait for UI to update
      console.log(`✓ ${check ? 'Checked' : 'Unchecked'} header: "${headerName}"`);
    } catch (error) {
      console.error(`Error toggling header option "${headerName}":`, error);
      throw error;
    }
  }

  /**
   * Unchecks all header options
   */
  async uncheckAllHeaders() {
    try {
      await this.openSelectHeadersDropdown();
      
      const headers = await this.getHeaderOptions();
      for (const header of headers) {
        if (header.checked) {
          await this.toggleHeaderOption(header.name, false);
        }
      }
      
      console.log(`✓ Unchecked all ${headers.length} headers`);
    } catch (error) {
      console.error('Error unchecking all headers:', error);
      throw error;
    }
  }

  /**
   * Checks all header options
   */
  async checkAllHeaders() {
    try {
      await this.openSelectHeadersDropdown();
      
      const headers = await this.getHeaderOptions();
      for (const header of headers) {
        if (!header.checked) {
          await this.toggleHeaderOption(header.name, true);
        }
      }
      
      console.log(`✓ Checked all ${headers.length} headers`);
    } catch (error) {
      console.error('Error checking all headers:', error);
      throw error;
    }
  }

  /**
   * Gets all visible table header names
   * @returns {Promise<string[]>}
   */
  async getVisibleTableHeaders() {
    try {
      await this.page.waitForTimeout(500);
      
      const headers = await this.page.evaluate(() => {
        const headerList = [];
        const headerCells = document.querySelectorAll('th[mat-header-cell], th[role="columnheader"]');
        
        for (const cell of headerCells) {
          // Get text content, excluding tooltip icons
          const text = cell.textContent.trim();
          // Remove any icon text or extra whitespace
          const cleanText = text.split('\n')[0].trim();
          if (cleanText) {
            headerList.push(cleanText);
          }
        }
        
        return headerList;
      });
      
      console.log(`Visible table headers: ${headers.join(', ')}`);
      return headers;
    } catch (error) {
      console.error('Error getting visible table headers:', error);
      return [];
    }
  }

  /**
   * Verifies if a specific column is visible in the table
   * @param {string} columnName - The name of the column to check
   * @returns {Promise<boolean>}
   */
  async isColumnVisible(columnName) {
    try {
      const visibleHeaders = await this.getVisibleTableHeaders();
      const isVisible = visibleHeaders.some(header => 
        header.toLowerCase().trim() === columnName.toLowerCase().trim()
      );
      
      return isVisible;
    } catch (error) {
      console.error(`Error checking if column "${columnName}" is visible:`, error);
      return false;
    }
  }

  /**
   * Verifies that all checked columns are visible in the table
   * @returns {Promise<boolean>}
   */
  async verifyCheckedColumnsVisible() {
    try {
      const headers = await this.getHeaderOptions();
      const checkedHeaders = headers.filter(h => h.checked);
      
      if (checkedHeaders.length === 0) {
        console.log('⚠ No headers are checked');
        return false;
      }
      
      const visibleHeaders = await this.getVisibleTableHeaders();
      let allVisible = true;
      const missingColumns = [];
      
      for (const header of checkedHeaders) {
        const isVisible = visibleHeaders.some(vh => 
          vh.toLowerCase().trim() === header.name.toLowerCase().trim()
        );
        
        if (!isVisible) {
          allVisible = false;
          missingColumns.push(header.name);
        }
      }
      
      if (!allVisible) {
        console.log(`Missing visible columns: ${missingColumns.join(', ')}`);
      } else {
        console.log(`✓ All ${checkedHeaders.length} checked columns are visible in the table`);
      }
      
      return allVisible;
    } catch (error) {
      console.error('Error verifying checked columns visible:', error);
      return false;
    }
  }

  /**
   * Verifies that no table columns are visible
   * @returns {Promise<boolean>}
   */
  async verifyNoColumnsVisible() {
    try {
      const visibleHeaders = await this.getVisibleTableHeaders();
      const noColumns = visibleHeaders.length === 0;
      
      if (noColumns) {
        console.log('✓ No table columns are visible');
      } else {
        console.log(`⚠ Found ${visibleHeaders.length} visible columns: ${visibleHeaders.join(', ')}`);
      }
      
      return noColumns;
    } catch (error) {
      console.error('Error verifying no columns visible:', error);
      return false;
    }
  }

  /**
   * Checks if the "No columns selected" message is visible
   * @returns {Promise<boolean>}
   */
  async isNoColumnsMessageVisible() {
    try {
      await this.page.waitForTimeout(1500);
      
      // Try multiple strategies to find the message
      const isVisible = await this.noColumnsMessage.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!isVisible) {
        // Fallback: search for the message text in the page
        const messageFound = await this.page.evaluate(() => {
          const allDivs = document.querySelectorAll('div');
          for (const div of allDivs) {
            const text = div.textContent.trim();
            if (text.includes('No columns selected') && text.includes('Please choose at least one header')) {
              return true;
            }
          }
          return false;
        }).catch(() => false);
        
        if (messageFound) {
          console.log('✓ "No columns selected" message found in page');
          return true;
        }
      }
      
      if (isVisible) {
        const messageText = await this.noColumnsMessage.textContent().catch(() => '');
        if (messageText.includes('No columns selected')) {
          console.log(`✓ "No columns selected" message is visible: "${messageText.trim()}"`);
        }
      }
      
      return isVisible;
    } catch (error) {
      console.error('Error checking for "No columns selected" message:', error);
      return false;
    }
  }

  /**
   * Verifies pagination section is visible
   * @returns {Promise<boolean>}
   */
  async isPaginationVisible() {
    try {
      const isVisible = await this.paginationInfo.isVisible({ timeout: 5000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      console.error('Error checking pagination visibility:', error);
      return false;
    }
  }

  /**
   * Gets the current page range from pagination text
   * @returns {Promise<{start: number, end: number, total: number}>}
   */
  async getPageRange() {
    try {
      const paginationText = await this.getPaginationText();
      
      // Try pattern: "Showing 1 to 20 of 3345 records"
      let matches = paginationText.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)\s+records/i);
      if (matches) {
        return {
          start: parseInt(matches[1], 10),
          end: parseInt(matches[2], 10),
          total: parseInt(matches[3], 10)
        };
      }
      
      // Try pattern: "1 – 20 of 3345" (from range label)
      const rangeLabelText = await this.paginationRangeLabel.textContent().catch(() => '');
      matches = rangeLabelText.match(/(\d+)\s*[–-]\s*(\d+)\s+of\s+(\d+)/i);
      if (matches) {
        return {
          start: parseInt(matches[1], 10),
          end: parseInt(matches[2], 10),
          total: parseInt(matches[3], 10)
        };
      }
      
      console.log('⚠ Could not extract page range from pagination text');
      return { start: 0, end: 0, total: 0 };
    } catch (error) {
      console.error('Error getting page range:', error);
      return { start: 0, end: 0, total: 0 };
    }
  }

  /**
   * Gets the current page size from the dropdown
   * @returns {Promise<number>}
   */
  async getCurrentPageSize() {
    try {
      const pageSizeText = await this.pageSizeSelect.textContent().catch(() => '');
      const matches = pageSizeText.match(/(\d+)/);
      if (matches) {
        const size = parseInt(matches[1], 10);
        console.log(`Current page size: ${size}`);
        return size;
      }
      
      // Alternative: get from selected option
      const selectedOption = this.page.locator('mat-option[aria-selected="true"]').first();
      const optionText = await selectedOption.textContent().catch(() => '');
      const optionMatches = optionText.match(/(\d+)/);
      if (optionMatches) {
        const size = parseInt(optionMatches[1], 10);
        console.log(`Current page size (from option): ${size}`);
        return size;
      }
      
      console.log('⚠ Could not extract current page size');
      return 0;
    } catch (error) {
      console.error('Error getting current page size:', error);
      return 0;
    }
  }

  /**
   * Verifies default page size
   * @param {number} expectedSize - Expected default page size (e.g., 20)
   * @returns {Promise<boolean>}
   */
  async verifyDefaultPageSize(expectedSize = 20) {
    try {
      const currentSize = await this.getCurrentPageSize();
      const matches = currentSize === expectedSize;
      
      if (matches) {
        console.log(`✓ Default page size is ${expectedSize}`);
      } else {
        console.log(`⚠ Page size mismatch. Expected: ${expectedSize}, Got: ${currentSize}`);
      }
      
      return matches;
    } catch (error) {
      console.error('Error verifying default page size:', error);
      return false;
    }
  }

  /**
   * Verifies Next Page button is visible and clickable
   * @returns {Promise<boolean>}
   */
  async isNextPageButtonAvailable() {
    try {
      const isVisible = await this.nextPageButton.isVisible({ timeout: 3000 }).catch(() => false);
      const isEnabled = await this.nextPageButton.isEnabled().catch(() => false);
      const isDisabled = await this.nextPageButton.getAttribute('disabled').catch(() => null);
      
      const available = isVisible && isEnabled && isDisabled !== 'true';
      console.log(`Next Page button - visible: ${isVisible}, enabled: ${isEnabled}, disabled: ${isDisabled}`);
      return available;
    } catch (error) {
      console.error('Error checking Next Page button:', error);
      return false;
    }
  }

  /**
   * Clicks the Next Page button
   */
  async clickNextPage() {
    try {
      await this.nextPageButton.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.nextPageButton.getAttribute('disabled');
      
      if (isDisabled === 'true') {
        console.log('⚠ Next Page button is disabled');
        return;
      }
      
      await this.nextPageButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for page to load
      console.log('✓ Clicked Next Page button');
    } catch (error) {
      console.error('Error clicking Next Page button:', error);
      throw error;
    }
  }

  /**
   * Verifies Previous Page button is visible and clickable
   * @returns {Promise<boolean>}
   */
  async isPreviousPageButtonAvailable() {
    try {
      const isVisible = await this.previousPageButton.isVisible({ timeout: 3000 }).catch(() => false);
      const isEnabled = await this.previousPageButton.isEnabled().catch(() => false);
      const isDisabled = await this.previousPageButton.getAttribute('disabled').catch(() => null);
      
      const available = isVisible && isEnabled && isDisabled !== 'true';
      console.log(`Previous Page button - visible: ${isVisible}, enabled: ${isEnabled}, disabled: ${isDisabled}`);
      return available;
    } catch (error) {
      console.error('Error checking Previous Page button:', error);
      return false;
    }
  }

  /**
   * Clicks the Previous Page button
   */
  async clickPreviousPage() {
    try {
      await this.previousPageButton.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.previousPageButton.getAttribute('disabled');
      
      if (isDisabled === 'true') {
        console.log('⚠ Previous Page button is disabled');
        return;
      }
      
      await this.previousPageButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for page to load
      console.log('✓ Clicked Previous Page button');
    } catch (error) {
      console.error('Error clicking Previous Page button:', error);
      throw error;
    }
  }

  /**
   * Verifies pagination text matches expected range
   * @param {number} expectedStart - Expected start number
   * @param {number} expectedEnd - Expected end number
   * @param {number} expectedTotal - Expected total records
   * @returns {Promise<boolean>}
   */
  async verifyPaginationRange(expectedStart, expectedEnd, expectedTotal) {
    try {
      await this.page.waitForTimeout(1000);
      const range = await this.getPageRange();
      const matches = range.start === expectedStart && 
                     range.end === expectedEnd && 
                     range.total === expectedTotal;
      
      if (matches) {
        console.log(`✓ Pagination range matches: ${expectedStart} - ${expectedEnd} of ${expectedTotal}`);
      } else {
        console.log(`⚠ Pagination range mismatch. Expected: ${expectedStart} - ${expectedEnd} of ${expectedTotal}, Got: ${range.start} - ${range.end} of ${range.total}`);
      }
      
      return matches;
    } catch (error) {
      console.error('Error verifying pagination range:', error);
      return false;
    }
  }

  /**
   * Changes the page size by selecting an option from the dropdown
   * @param {number} pageSize - The page size to select (20, 50, 100, 200, 500)
   */
  async changePageSize(pageSize) {
    try {
      // Wait for any spinners/overlays to disappear
      await this.page.waitForTimeout(1000);
      
      // Wait for spinner to disappear if present
      const spinner = this.page.locator('ngx-spinner, .ngx-spinner-overlay').first();
      try {
        await spinner.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      } catch (e) {
        // Spinner might not be present, continue
      }
      
      // Wait for any backdrop overlays to disappear
      const backdrop = this.page.locator('.cdk-overlay-backdrop').first();
      try {
        await backdrop.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      } catch (e) {
        // Backdrop might not be present, continue
      }
      
      await this.pageSizeSelect.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll into view
      await this.pageSizeSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click to bypass interceptors
      await this.pageSizeSelect.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForTimeout(1000); // Wait for dropdown to open
      
      // Wait for options panel to be visible
      const optionsPanel = this.page.locator('div.mat-mdc-select-panel, mat-option').first();
      await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Find and click the option with the specified value
      const optionSelectors = [
        `mat-option[ng-reflect-value="${pageSize}"]`,
        `mat-option[value="${pageSize}"]`,
        `mat-option:has-text("${pageSize}")`,
        `mat-option .mdc-list-item__primary-text:has-text("${pageSize}")`
      ];
      
      let option = null;
      for (const selector of optionSelectors) {
        option = this.page.locator(selector).first();
        const count = await option.count();
        if (count > 0) {
          const isVisible = await option.isVisible().catch(() => false);
          if (isVisible) {
            break;
          }
        }
      }
      
      if (!option || (await option.count()) === 0) {
        throw new Error(`Page size option ${pageSize} not found`);
      }
      
      // Use JavaScript click for the option as well
      await option.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for table to reload
      console.log(`✓ Changed page size to ${pageSize}`);
    } catch (error) {
      console.error(`Error changing page size to ${pageSize}:`, error);
      throw error;
    }
  }

  /**
   * Verifies the number of rows displayed matches the page size
   * @param {number} expectedPageSize - Expected number of rows
   * @returns {Promise<boolean>}
   */
  async verifyRowsDisplayed(expectedPageSize) {
    try {
      await this.page.waitForTimeout(1500);
      const rowCount = await this.getTableRowCount();
      const matches = rowCount === expectedPageSize;
      
      if (matches) {
        console.log(`✓ Table displays ${rowCount} rows (matches page size ${expectedPageSize})`);
      } else {
        console.log(`⚠ Row count mismatch. Expected: ${expectedPageSize}, Got: ${rowCount}`);
      }
      
      return matches;
    } catch (error) {
      console.error('Error verifying rows displayed:', error);
      return false;
    }
  }
}

module.exports = { LicenseDetailsPage };

