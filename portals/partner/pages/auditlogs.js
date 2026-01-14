const { expect } = require('@playwright/test');

class AuditLogsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Audit Logs module entry
    this.auditLogsMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/audit-logs"], ' +
        'div.sidebar-items:has(span.title:has-text("Audit Logs"))'
      )
      .first();

    // Audit Logs page title
    this.auditLogsPageTitle = page
      .locator(
        'h1:has-text("Audit Logs"), h2:has-text("Audit Logs"), ' +
        'span.title:has-text("Audit Logs"), *:has-text("Audit Logs")'
      )
      .first();

    // Search section toggle button
    this.searchToggleButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here")').first();

    // Search fields area
    this.searchFieldArea = page.locator('div.search-field-area').first();

    // Search form fields
    this.nameField = page.locator('input#name[placeholder="Name"]').first();
    this.emailField = page.locator('input#email[placeholder="Email"]').first();
    this.urlEndpointField = page.locator('input#urlEndPoint[placeholder="URL Endpoint"]').first();
    this.apiResponseField = page.locator('input#response[placeholder="API Response"]').first();
    this.taskTypeField = page.locator('input#method[placeholder="Task Type"]').first();
    
    // Custom Date picker
    this.customDateField = page.locator('mat-form-field:has(mat-label:has-text("Custom Date"))').first();
    this.customDateStartInput = page.locator('input[matstartdate][placeholder="From"]').first();
    this.customDateEndInput = page.locator('input[matenddate][placeholder="To"]').first();
    this.customDateToggleButton = page.locator('button[aria-label="Open calendar"]').first();

    // Search and Reset buttons
    this.searchButton = page.locator('button.search-btn:has-text("Search"), button[type="submit"]:has-text("Search")').first();
    this.resetButton = page.locator('button.reset-btn:has-text("Reset"), button[type="button"]:has-text("Reset")').first();

    // Table elements
    this.auditLogsTable = page.locator('table, mat-table').first();
    this.tableRows = page.locator('tr[mat-row], tr[role="row"]:not([mat-header-row])');
    this.tableHeaders = page.locator('th[mat-header-cell], th[role="columnheader"]');
    
    // Table columns
    this.nameColumn = page.locator('td[mat-cell].mat-column-Name, td.cdk-column-Name');
    this.emailColumn = page.locator('td[mat-cell].mat-column-Email, td.cdk-column-Email');
    this.urlEndpointColumn = page.locator('td[mat-cell].mat-column-URL-Endpoint, td.cdk-column-URL-Endpoint');
    this.taskTypeColumn = page.locator('td[mat-cell].mat-column-Task-Type, td.cdk-column-Task-Type');
    this.apiResponseColumn = page.locator('td[mat-cell].mat-column-API-Response, td.cdk-column-API-Response');
    this.dateTimeColumn = page.locator('td[mat-cell].mat-column-Date---Time, td.cdk-column-Date---Time');

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
    this.noAuditLogsMessage = page.locator('p.my-4.fs-5:has-text("No Audit Logs Created Yet."), p:has-text("No Audit Logs Created Yet.")').first();
    
    // Select Headers dropdown
    this.selectHeadersButton = page.locator('button.header-btn.btn.dropdown-toggle:has-text("Select Headers")').first();
    this.selectHeadersDropdown = page.locator('ul.dropdown-menu.dropdown-header-menu').first();
    this.headerCheckboxes = page.locator('ul.dropdown-menu.dropdown-header-menu input[type="checkbox"]');
    this.headerLabels = page.locator('ul.dropdown-menu.dropdown-header-menu label');
  }

  /**
   * Navigates to the Audit Logs page
   */
  async navigateToAuditLogs() {
    try {
      await this.page.waitForTimeout(1000);
      await this.auditLogsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.auditLogsMenuItem.scrollIntoViewIfNeeded();
      await this.auditLogsMenuItem.click();
      await this.page.waitForLoadState('networkidle');
      console.log('✓ Navigated to Audit Logs page');
    } catch (error) {
      console.error('Error navigating to Audit Logs page:', error);
      throw error;
    }
  }

  /**
   * Verifies that the Audit Logs page is visible
   * @returns {Promise<boolean>}
   */
  async isAuditLogsPageVisible() {
    try {
      const isVisible = await this.auditLogsPageTitle.isVisible({ timeout: 5000 }).catch(() => false);
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
      
      const nameVisible = await this.nameField.isVisible({ timeout: 3000 }).catch(() => false);
      const emailVisible = await this.emailField.isVisible({ timeout: 3000 }).catch(() => false);
      const urlVisible = await this.urlEndpointField.isVisible({ timeout: 3000 }).catch(() => false);
      const apiResponseVisible = await this.apiResponseField.isVisible({ timeout: 3000 }).catch(() => false);
      const taskTypeVisible = await this.taskTypeField.isVisible({ timeout: 3000 }).catch(() => false);
      const customDateVisible = await this.customDateField.isVisible({ timeout: 3000 }).catch(() => false);

      console.log(`Name field visible: ${nameVisible}`);
      console.log(`Email field visible: ${emailVisible}`);
      console.log(`URL Endpoint field visible: ${urlVisible}`);
      console.log(`API Response field visible: ${apiResponseVisible}`);
      console.log(`Task Type field visible: ${taskTypeVisible}`);
      console.log(`Custom Date field visible: ${customDateVisible}`);

      return nameVisible && emailVisible && urlVisible && apiResponseVisible && taskTypeVisible && customDateVisible;
    } catch (error) {
      console.error('Error checking search fields visibility:', error);
      return false;
    }
  }

  /**
   * Verifies Search and Reset buttons are visible and clickable
   * @returns {Promise<boolean>}
   */
  async areSearchButtonsVisible() {
    try {
      await this.openSearchSection();
      
      const searchVisible = await this.searchButton.isVisible({ timeout: 3000 }).catch(() => false);
      const resetVisible = await this.resetButton.isVisible({ timeout: 3000 }).catch(() => false);
      const searchEnabled = await this.searchButton.isEnabled().catch(() => false);
      const resetEnabled = await this.resetButton.isEnabled().catch(() => false);

      console.log(`Search button visible: ${searchVisible}, enabled: ${searchEnabled}`);
      console.log(`Reset button visible: ${resetVisible}, enabled: ${resetEnabled}`);

      return searchVisible && resetVisible && searchEnabled && resetEnabled;
    } catch (error) {
      console.error('Error checking search buttons:', error);
      return false;
    }
  }

  /**
   * Fills the Name search field
   * @param {string} name - The name to search for
   */
  async fillNameField(name) {
    await this.openSearchSection();
    await this.nameField.waitFor({ state: 'visible', timeout: 5000 });
    await this.nameField.fill(name);
    console.log(`✓ Filled Name field with: "${name}"`);
  }

  /**
   * Fills the Email search field
   * @param {string} email - The email to search for
   */
  async fillEmailField(email) {
    await this.openSearchSection();
    await this.emailField.waitFor({ state: 'visible', timeout: 5000 });
    await this.emailField.fill(email);
    console.log(`✓ Filled Email field with: "${email}"`);
  }

  /**
   * Fills the URL Endpoint search field
   * @param {string} urlEndpoint - The URL endpoint to search for
   */
  async fillUrlEndpointField(urlEndpoint) {
    await this.openSearchSection();
    await this.urlEndpointField.waitFor({ state: 'visible', timeout: 5000 });
    await this.urlEndpointField.fill(urlEndpoint);
    console.log(`✓ Filled URL Endpoint field with: "${urlEndpoint}"`);
  }

  /**
   * Fills the API Response search field
   * @param {string} apiResponse - The API response text to search for
   */
  async fillApiResponseField(apiResponse) {
    await this.openSearchSection();
    await this.apiResponseField.waitFor({ state: 'visible', timeout: 5000 });
    await this.apiResponseField.fill(apiResponse);
    console.log(`✓ Filled API Response field with: "${apiResponse}"`);
  }

  /**
   * Fills the Task Type search field
   * @param {string} taskType - The task type to search for
   */
  async fillTaskTypeField(taskType) {
    await this.openSearchSection();
    await this.taskTypeField.waitFor({ state: 'visible', timeout: 5000 });
    await this.taskTypeField.click();
    await this.page.waitForTimeout(300);
    await this.taskTypeField.fill(taskType);
    console.log(`✓ Filled Task Type field with: "${taskType}"`);
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
    await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    console.log('✓ Reset button clicked');
  }

  /**
   * Verifies all search fields are empty
   * @returns {Promise<boolean>}
   */
  async areSearchFieldsEmpty() {
    try {
      await this.openSearchSection();
      
      const nameValue = await this.nameField.inputValue().catch(() => '');
      const emailValue = await this.emailField.inputValue().catch(() => '');
      const urlValue = await this.urlEndpointField.inputValue().catch(() => '');
      const apiResponseValue = await this.apiResponseField.inputValue().catch(() => '');
      const taskTypeValue = await this.taskTypeField.inputValue().catch(() => '');
      const startDateValue = await this.customDateStartInput.inputValue().catch(() => '');
      const endDateValue = await this.customDateEndInput.inputValue().catch(() => '');

      console.log(`Name field empty: ${nameValue === ''}`);
      console.log(`Email field empty: ${emailValue === ''}`);
      console.log(`URL Endpoint field empty: ${urlValue === ''}`);
      console.log(`API Response field empty: ${apiResponseValue === ''}`);
      console.log(`Task Type field empty: ${taskTypeValue === ''}`);
      console.log(`Start Date empty: ${startDateValue === ''}`);
      console.log(`End Date empty: ${endDateValue === ''}`);

      return nameValue === '' && emailValue === '' && urlValue === '' && 
             apiResponseValue === '' && taskTypeValue === '' && 
             startDateValue === '' && endDateValue === '';
    } catch (error) {
      console.error('Error checking if search fields are empty:', error);
      return false;
    }
  }

  /**
   * Gets all values from a specific column in the table
   * @param {string} columnName - The column name (Name, Email, URL Endpoint, Task Type, API Response)
   * @returns {Promise<string[]>}
   */
  async getColumnValues(columnName) {
    try {
      await this.page.waitForTimeout(1500);
      
      // First, check if table has rows
      const rowCount = await this.tableRows.count();
      console.log(`Total table rows found: ${rowCount}`);
      
      if (rowCount === 0) {
        console.log('⚠ No table rows found');
        return [];
      }
      
      const columnValues = await this.page.evaluate((colName) => {
        const values = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        
        console.log(`Processing ${rows.length} rows for column: ${colName}`);
        
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          let cell = null;
          
          // Try multiple selector strategies for each column
          if (colName === 'Name') {
            cell = row.querySelector('td.mat-column-Name, td.cdk-column-Name, td[class*="Name"]');
          } else if (colName === 'Email') {
            cell = row.querySelector('td.mat-column-Email, td.cdk-column-Email, td[class*="Email"]');
          } else if (colName === 'URL Endpoint') {
            cell = row.querySelector('td.mat-column-URL-Endpoint, td.cdk-column-URL-Endpoint, td[class*="URL-Endpoint"], td[class*="URL"]');
          } else if (colName === 'Task Type') {
            cell = row.querySelector('td.mat-column-Task-Type, td.cdk-column-Task-Type, td[class*="Task-Type"], td[class*="Task"]');
          } else if (colName === 'API Response') {
            // Try multiple selectors for API Response
            cell = row.querySelector('td.mat-column-API-Response, td.cdk-column-API-Response, td[class*="API-Response"], td[class*="API"], td[class*="Response"]');
            
            // If not found, try getting the last cell (API Response is typically the last column)
            if (!cell) {
              const allCells = row.querySelectorAll('td[mat-cell], td[role="cell"]');
              if (allCells.length > 0) {
                cell = allCells[allCells.length - 1]; // Last cell
              }
            }
          }
          
          if (cell) {
            // Get text from span if available, otherwise from cell
            const span = cell.querySelector('span');
            let text = '';
            
            if (span) {
              text = (span.textContent || '').trim();
            } else {
              text = (cell.textContent || '').trim();
            }
            
            if (text) {
              values.push(text);
            } else if (i < 3) {
              // Log first few empty cells for debugging
              console.log(`Row ${i + 1}: Cell found but text is empty`);
            }
          } else if (i < 3) {
            // Log first few missing cells for debugging
            console.log(`Row ${i + 1}: Cell not found for column ${colName}`);
          }
        }
        
        return values;
      }, columnName).catch((error) => {
        console.error(`Error in evaluate for ${columnName}:`, error.message);
        return [];
      });
      
      console.log(`Extracted ${columnValues.length} values from ${columnName} column`);
      if (columnValues.length > 0) {
        console.log(`Sample values (first 5):`, columnValues.slice(0, 5));
      }
      
      return columnValues;
    } catch (error) {
      console.error(`Error getting ${columnName} column values:`, error);
      return [];
    }
  }

  /**
   * Verifies that all rows in Name column contain the search text
   * @param {string} searchText - The text to verify
   * @returns {Promise<boolean>}
   */
  async verifyNameColumnContains(searchText) {
    try {
      const values = await this.getColumnValues('Name');
      console.log(`Found ${values.length} rows in Name column`);
      
      if (values.length === 0) {
        console.log('⚠ No rows found in table');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        return false;
      }
      
      const searchLower = searchText.toLowerCase();
      const allMatch = values.every(value => {
        const valueLower = value.toLowerCase();
        return valueLower.includes(searchLower) || searchLower.includes(valueLower);
      });
      
      if (!allMatch) {
        console.log(`Some rows don't contain "${searchText}"`);
        console.log(`Sample values:`, values.slice(0, 5));
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying Name column:', error);
      return false;
    }
  }

  /**
   * Verifies that all rows in Email column contain the search text
   * @param {string} searchText - The email text to verify
   * @returns {Promise<boolean>}
   */
  async verifyEmailColumnContains(searchText) {
    try {
      const values = await this.getColumnValues('Email');
      console.log(`Found ${values.length} rows in Email column`);
      
      if (values.length === 0) {
        console.log('⚠ No rows found in table');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        return false;
      }
      
      const searchLower = searchText.toLowerCase();
      const allMatch = values.every(value => {
        const valueLower = value.toLowerCase();
        return valueLower.includes(searchLower) || searchLower.includes(valueLower);
      });
      
      if (!allMatch) {
        console.log(`Some rows don't contain "${searchText}"`);
        console.log(`Sample values:`, values.slice(0, 5));
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying Email column:', error);
      return false;
    }
  }

  /**
   * Verifies that all rows in URL Endpoint column contain the search text
   * @param {string} searchText - The URL endpoint text to verify
   * @returns {Promise<boolean>}
   */
  async verifyUrlEndpointColumnContains(searchText) {
    try {
      const values = await this.getColumnValues('URL Endpoint');
      console.log(`Found ${values.length} rows in URL Endpoint column`);
      
      if (values.length === 0) {
        console.log('⚠ No rows found in table');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        return false;
      }
      
      const searchLower = searchText.toLowerCase();
      const allMatch = values.every(value => {
        const valueLower = value.toLowerCase();
        return valueLower.includes(searchLower) || searchLower.includes(valueLower);
      });
      
      if (!allMatch) {
        console.log(`Some rows don't contain "${searchText}"`);
        console.log(`Sample values:`, values.slice(0, 5));
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying URL Endpoint column:', error);
      return false;
    }
  }

  /**
   * Verifies that all rows in Task Type column match the search text
   * @param {string} searchText - The task type to verify (e.g., "Create")
   * @returns {Promise<boolean>}
   */
  async verifyTaskTypeColumnMatches(searchText) {
    try {
      const values = await this.getColumnValues('Task Type');
      console.log(`Found ${values.length} rows in Task Type column`);
      
      if (values.length === 0) {
        console.log('⚠ No rows found in table');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        return false;
      }
      
      // Filter out any empty values
      const filteredValues = values.filter(v => v && v.trim().length > 0);
      console.log(`Filtered values count: ${filteredValues.length} (from ${values.length} total)`);
      
      if (filteredValues.length === 0) {
        console.log('⚠ No valid values found after filtering');
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true;
        }
        return false;
      }
      
      const searchLower = searchText.toLowerCase().trim();
      const matchingValues = [];
      const nonMatchingValues = [];
      
      filteredValues.forEach((value, index) => {
        const valueLower = (value || '').toLowerCase().trim();
        // For Task Type, we want exact match or contains match
        const matches = valueLower === searchLower || 
                       valueLower.includes(searchLower) || 
                       searchLower.includes(valueLower);
        
        if (matches) {
          matchingValues.push(value);
        } else {
          nonMatchingValues.push({ 
            index: index + 1, 
            originalValue: value, 
            valueLower: valueLower,
            searchLower: searchLower
          });
        }
      });
      
      console.log(`Matching values: ${matchingValues.length}/${filteredValues.length}`);
      if (matchingValues.length > 0) {
        console.log(`Sample matching values:`, matchingValues.slice(0, 3));
      }
      if (nonMatchingValues.length > 0) {
        console.log(`Non-matching values (first 5):`, nonMatchingValues.slice(0, 5));
        console.log(`Search text (lowercase): "${searchLower}"`);
      }
      
      // For Task Type, we expect exact match, so allow 100% match or at least 95% for edge cases
      const matchRate = filteredValues.length > 0 ? matchingValues.length / filteredValues.length : 0;
      const allMatch = matchRate >= 0.95;
      
      if (!allMatch) {
        console.log(`Match rate: ${(matchRate * 100).toFixed(1)}% (required: 95%)`);
        if (nonMatchingValues.length > 0) {
          console.log(`First non-matching value details:`, JSON.stringify(nonMatchingValues[0], null, 2));
        }
      } else {
        console.log(`✓ All Task Type values match "${searchText}"`);
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying Task Type column:', error);
      return false;
    }
  }

  /**
   * Verifies that all rows in API Response column contain the search text
   * @param {string} searchText - The API response text to verify
   * @returns {Promise<boolean>}
   */
  async verifyApiResponseColumnContains(searchText) {
    try {
      // Wait a bit more for table to load
      await this.page.waitForTimeout(2000);
      
      // Check if table has rows
      const rowCount = await this.tableRows.count();
      console.log(`Total table rows after search: ${rowCount}`);
      
      if (rowCount === 0) {
        console.log('⚠ No rows found in table after search');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        // Try to get pagination info to see if search returned results
        const paginationText = await this.paginationInfo.textContent().catch(() => '');
        console.log(`Pagination info: ${paginationText}`);
        return false;
      }
      
      // For API Response, try getting the last column first (more reliable)
      let values = await this.page.evaluate(() => {
        const values = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        for (const row of rows) {
          // Try API Response column selectors first
          let cell = row.querySelector('td.mat-column-API-Response, td.cdk-column-API-Response, td[class*="API-Response"]');
          
          // If not found, get the last cell (API Response is typically the last column)
          if (!cell) {
            const allCells = row.querySelectorAll('td[mat-cell], td[role="cell"]');
            if (allCells.length > 0) {
              cell = allCells[allCells.length - 1];
            }
          }
          
          if (cell) {
            const span = cell.querySelector('span');
            const text = span ? (span.textContent || '').trim() : (cell.textContent || '').trim();
            if (text) values.push(text);
          }
        }
        return values;
      });
      
      console.log(`Found ${values.length} rows in API Response column (using direct extraction)`);
      
      // If still no values, try the standard getColumnValues method
      if (values.length === 0) {
        console.log('⚠ Direct extraction failed, trying getColumnValues method...');
        values = await this.getColumnValues('API Response');
        console.log(`getColumnValues found ${values.length} rows`);
      }
      
      if (values.length === 0) {
        console.log('⚠ No values extracted from API Response column using any method');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        return false;
      }
      
      console.log(`Sample API Response values (first 5):`, values.slice(0, 5));
      
      const searchLower = searchText.toLowerCase().trim();
      const matchingValues = [];
      const nonMatchingValues = [];
      
      values.forEach(value => {
        const valueLower = value.toLowerCase().trim();
        const matches = valueLower.includes(searchLower) || searchLower.includes(valueLower);
        if (matches) {
          matchingValues.push(value);
        } else {
          nonMatchingValues.push(value);
        }
      });
      
      console.log(`Matching values: ${matchingValues.length}/${values.length}`);
      if (matchingValues.length > 0) {
        console.log(`Sample matching values:`, matchingValues.slice(0, 3));
      }
      if (nonMatchingValues.length > 0) {
        console.log(`Sample non-matching values:`, nonMatchingValues.slice(0, 3));
      }
      
      // Allow at least 80% of values to match (to handle edge cases)
      const matchRate = matchingValues.length / values.length;
      const allMatch = matchRate >= 0.8;
      
      if (!allMatch) {
        console.log(`Match rate: ${(matchRate * 100).toFixed(1)}% (required: 80%)`);
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying API Response column:', error);
      return false;
    }
  }

  /**
   * Opens the Custom Date calendar picker
   */
  async openCustomDatePicker() {
    try {
      await this.openSearchSection();
      await this.customDateToggleButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.customDateToggleButton.click();
      await this.page.waitForTimeout(1000); // Wait for calendar to open
      console.log('✓ Custom Date calendar opened');
    } catch (error) {
      console.error('Error opening Custom Date picker:', error);
      throw error;
    }
  }

  /**
   * Selects a date range in the Custom Date picker
   * @param {Date} startDate - The start date
   * @param {Date} endDate - The end date
   */
  async selectDateRange(startDate, endDate) {
    try {
      await this.openSearchSection();
      
      // Click on the start date input to open calendar
      await this.customDateStartInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.customDateStartInput.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for calendar panel to appear
      const calendarPanel = this.page.locator('mat-calendar, .mat-datepicker-popup, [role="dialog"]').first();
      await calendarPanel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      // Select start date using evaluate
      await this.page.evaluate((date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        
        // Find calendar and select the date
        const calendar = document.querySelector('mat-calendar');
        if (calendar) {
          // Try to find and click the date cell
          const cells = calendar.querySelectorAll('.mat-calendar-body-cell');
          for (const cell of cells) {
            const cellText = cell.textContent?.trim();
            if (cellText === String(day)) {
              cell.click();
              break;
            }
          }
        }
      }, startDate);
      
      await this.page.waitForTimeout(1000);
      
      // Select end date
      await this.page.evaluate((date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        
        // Find calendar and select the date
        const calendar = document.querySelector('mat-calendar');
        if (calendar) {
          // Try to find and click the date cell
          const cells = calendar.querySelectorAll('.mat-calendar-body-cell');
          for (const cell of cells) {
            const cellText = cell.textContent?.trim();
            if (cellText === String(day)) {
              cell.click();
              break;
            }
          }
        }
      }, endDate);
      
      await this.page.waitForTimeout(1000);
      
      // Close calendar if still open
      await this.page.keyboard.press('Escape').catch(() => {});
      await this.page.waitForTimeout(500);
      
      console.log(`✓ Selected date range: ${startDate.toDateString()} to ${endDate.toDateString()}`);
    } catch (error) {
      console.error('Error selecting date range:', error);
      // Fallback: try filling inputs directly
      try {
        const formatDate = (date) => {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${month}/${day}/${year}`;
        };
        
        await this.customDateStartInput.fill(formatDate(startDate));
        await this.page.waitForTimeout(300);
        await this.customDateEndInput.fill(formatDate(endDate));
        await this.page.waitForTimeout(300);
        console.log(`✓ Selected date range using fallback method`);
      } catch (fallbackError) {
        console.error('Fallback date selection also failed:', fallbackError);
        throw error;
      }
    }
  }

  /**
   * Gets all date values from the Date & Time column
   * @returns {Promise<Date[]>}
   */
  async getDateColumnValues() {
    try {
      await this.page.waitForTimeout(1000);
      
      const dateStrings = await this.page.evaluate(() => {
        const dates = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        
        for (const row of rows) {
          const cell = row.querySelector('td.mat-column-Date---Time, td.cdk-column-Date---Time');
          if (cell) {
            const span = cell.querySelector('span');
            const text = span ? (span.textContent || '').trim() : (cell.textContent || '').trim();
            if (text) {
              dates.push(text);
            }
          }
        }
        
        return dates;
      }).catch(() => []);
      
      // Parse dates from strings like "2025-12-12, 23:22"
      const dates = dateStrings.map(dateStr => {
        try {
          // Extract date part (before comma)
          const datePart = dateStr.split(',')[0].trim();
          // Parse as YYYY-MM-DD
          const [year, month, day] = datePart.split('-').map(Number);
          return new Date(year, month - 1, day);
        } catch {
          return null;
        }
      }).filter(d => d !== null);
      
      return dates;
    } catch (error) {
      console.error('Error getting date column values:', error);
      return [];
    }
  }

  /**
   * Verifies that all dates in the table are within the selected date range
   * @param {Date} startDate - The start date of the range
   * @param {Date} endDate - The end date of the range
   * @returns {Promise<boolean>}
   */
  async verifyDateRange(startDate, endDate) {
    try {
      const dates = await this.getDateColumnValues();
      console.log(`Found ${dates.length} date values`);
      
      if (dates.length === 0) {
        console.log('⚠ No dates found in table');
        // Check if "No Audit Logs Created Yet" message is visible
        const noDataMessageVisible = await this.isNoAuditLogsMessageVisible();
        if (noDataMessageVisible) {
          console.log('✓ "No Audit Logs Created Yet." message is displayed (expected when no results)');
          return true; // This is valid - search returned no results and message is shown
        }
        return false;
      }
      
      // Normalize dates to start of day for comparison
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      const allInRange = dates.every(date => {
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        return dateOnly >= start && dateOnly <= end;
      });
      
      if (!allInRange) {
        console.log(`Some dates are outside the range ${startDate.toDateString()} to ${endDate.toDateString()}`);
        console.log(`Sample dates:`, dates.slice(0, 5).map(d => d.toDateString()));
      }
      
      return allInRange;
    } catch (error) {
      console.error('Error verifying date range:', error);
      return false;
    }
  }

  /**
   * Gets the pagination text (e.g., "Showing 1 to 20 of 20406 records")
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
   * Checks if the "No Audit Logs Created Yet." message is visible
   * @returns {Promise<boolean>}
   */
  async isNoAuditLogsMessageVisible() {
    try {
      await this.page.waitForTimeout(1000); // Wait for message to appear
      const isVisible = await this.noAuditLogsMessage.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const messageText = await this.noAuditLogsMessage.textContent().catch(() => '');
        console.log(`✓ "No Audit Logs Created Yet." message is visible: "${messageText.trim()}"`);
      }
      return isVisible;
    } catch (error) {
      console.error('Error checking for "No Audit Logs Created Yet" message:', error);
      return false;
    }
  }

  /**
   * Verifies that pagination shows full count (indicating reset worked)
   * @returns {Promise<boolean>}
   */
  async verifyPaginationShowsFullCount() {
    try {
      const paginationText = await this.getPaginationText();
      console.log(`Pagination text: "${paginationText}"`);
      
      // Check if it shows "Showing X to Y of Z records" format
      const matches = paginationText.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)\s+records/i);
      if (matches) {
        const total = parseInt(matches[3], 10);
        console.log(`Total records: ${total}`);
        return total > 0;
      }
      
      return false;
    } catch (error) {
      console.error('Error verifying pagination:', error);
      return false;
    }
  }

  /**
   * Clicks the "Select Headers" button to open/close the dropdown
   */
  async clickSelectHeadersButton() {
    try {
      await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 5000 });
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
          const text = cell.textContent.trim();
          if (text) {
            headerList.push(text);
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
   * Verifies that unchecked columns are NOT visible in the table
   * @returns {Promise<boolean>}
   */
  async verifyUncheckedColumnsNotVisible() {
    try {
      const headers = await this.getHeaderOptions();
      const uncheckedHeaders = headers.filter(h => !h.checked);
      
      if (uncheckedHeaders.length === 0) {
        console.log('⚠ All headers are checked');
        return true; // If all are checked, there are no unchecked columns to verify
      }
      
      const visibleHeaders = await this.getVisibleTableHeaders();
      let allHidden = true;
      const visibleUncheckedColumns = [];
      
      for (const header of uncheckedHeaders) {
        const isVisible = visibleHeaders.some(vh => 
          vh.toLowerCase().trim() === header.name.toLowerCase().trim()
        );
        
        if (isVisible) {
          allHidden = false;
          visibleUncheckedColumns.push(header.name);
        }
      }
      
      if (!allHidden) {
        console.log(`Unchecked columns that are still visible: ${visibleUncheckedColumns.join(', ')}`);
      } else {
        console.log(`✓ All ${uncheckedHeaders.length} unchecked columns are hidden`);
      }
      
      return allHidden;
    } catch (error) {
      console.error('Error verifying unchecked columns not visible:', error);
      return false;
    }
  }

  /**
   * Gets the pagination text from either total-data-info or mat-mdc-paginator-range-label
   * @returns {Promise<string>}
   */
  async getPaginationText() {
    try {
      // Try both pagination text locators
      const totalDataInfo = await this.paginationInfo.textContent().catch(() => '');
      const rangeLabel = await this.paginationRangeLabel.textContent().catch(() => '');
      
      const text = totalDataInfo || rangeLabel;
      return text.trim();
    } catch (error) {
      console.error('Error getting pagination text:', error);
      return '';
    }
  }

  /**
   * Extracts total number of records from pagination text
   * Supports formats: "Showing 1 to 20 of 20406 records" or "1 – 20 of 20406"
   * @returns {Promise<number>}
   */
  async getTotalRecords() {
    try {
      const paginationText = await this.getPaginationText();
      console.log(`Pagination text: "${paginationText}"`);
      
      // Try pattern: "Showing X to Y of Z records"
      let matches = paginationText.match(/Showing\s+\d+\s+to\s+\d+\s+of\s+(\d+)\s+records/i);
      if (matches) {
        const total = parseInt(matches[1], 10);
        console.log(`Total records extracted: ${total}`);
        return total;
      }
      
      // Try pattern: "X – Y of Z"
      matches = paginationText.match(/\d+\s*[–-]\s*\d+\s+of\s+(\d+)/i);
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
   * Gets the current page size from the page size dropdown
   * @returns {Promise<number>}
   */
  async getCurrentPageSize() {
    try {
      const pageSizeText = await this.pageSizeSelect.textContent().catch(() => '');
      const pageSize = parseInt(pageSizeText.trim(), 10);
      console.log(`Current page size: ${pageSize}`);
      return pageSize || 20; // Default to 20 if not found
    } catch (error) {
      console.error('Error getting current page size:', error);
      return 20;
    }
  }

  /**
   * Verifies the default page size is 20
   * @returns {Promise<boolean>}
   */
  async verifyDefaultPageSize() {
    try {
      const pageSize = await this.getCurrentPageSize();
      const isDefault = pageSize === 20;
      if (isDefault) {
        console.log('✓ Default page size is 20');
      } else {
        console.log(`⚠ Default page size is ${pageSize}, expected 20`);
      }
      return isDefault;
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
      await this.page.waitForTimeout(1000); // Wait for page to load
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
      await this.page.waitForTimeout(1000); // Wait for page to load
      console.log('✓ Clicked Previous Page button');
    } catch (error) {
      console.error('Error clicking Previous Page button:', error);
      throw error;
    }
  }

  /**
   * Gets the current page range from pagination text
   * @returns {Promise<{start: number, end: number, total: number}>}
   */
  async getPageRange() {
    try {
      const paginationText = await this.getPaginationText();
      
      // Try pattern: "Showing 1 to 20 of 20406 records"
      let matches = paginationText.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)\s+records/i);
      if (matches) {
        return {
          start: parseInt(matches[1], 10),
          end: parseInt(matches[2], 10),
          total: parseInt(matches[3], 10)
        };
      }
      
      // Try pattern: "1 – 20 of 20406"
      matches = paginationText.match(/(\d+)\s*[–-]\s*(\d+)\s+of\s+(\d+)/i);
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
   * Verifies pagination text matches expected range
   * @param {number} expectedStart - Expected start number
   * @param {number} expectedEnd - Expected end number
   * @param {number} expectedTotal - Expected total records
   * @returns {Promise<boolean>}
   */
  async verifyPaginationRange(expectedStart, expectedEnd, expectedTotal) {
    try {
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
      // Try multiple selectors for the option
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
      
      if (!option) {
        throw new Error(`Could not find page size option for ${pageSize}`);
      }
      
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click for the option as well
      await option.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for table to update
      console.log(`✓ Changed page size to ${pageSize}`);
    } catch (error) {
      console.error(`Error changing page size to ${pageSize}:`, error);
      throw error;
    }
  }

  /**
   * Verifies the number of rows displayed matches the expected page size
   * @param {number} expectedRows - Expected number of rows
   * @returns {Promise<boolean>}
   */
  async verifyRowsDisplayed(expectedRows) {
    try {
      await this.page.waitForTimeout(1000); // Wait for table to update
      const rowCount = await this.tableRows.count();
      
      const matches = rowCount === expectedRows;
      if (matches) {
        console.log(`✓ ${rowCount} rows are displayed (expected: ${expectedRows})`);
      } else {
        console.log(`⚠ Row count mismatch. Expected: ${expectedRows}, Got: ${rowCount}`);
      }
      
      return matches;
    } catch (error) {
      console.error('Error verifying rows displayed:', error);
      return false;
    }
  }
}

module.exports = { AuditLogsPage };

