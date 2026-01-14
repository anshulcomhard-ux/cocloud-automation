const { expect } = require('@playwright/test');

class ServiceRequestAllRequestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Service Request → All Requests
    this.serviceRequestMenuItem = page
      .locator(
        'div.dropdown-sidebar-items.dropdown-section:has(span.title:has-text("Service Request")), ' +
        'div.dropdown-section:has(span.title:has-text("Service Request")):has(i.bi-list-ol)'
      )
      .first();
    
    this.allRequestsSubMenuItem = page
      .locator(
        'li[ng-reflect-router-link="/service-request/all-requests"], ' +
        'div.sub-items.active-dropdown-subItems li[ng-reflect-router-link="/service-request/all-requests"], ' +
        'li.active-li:has-text("All Requests")'
      )
      .first();
    
    // Submenu container to check if it's expanded
    this.subMenuContainer = page.locator(
      'div.sub-items.active-dropdown-subItems, ' +
      'div.dropdown-sidebar-items.active-dropdown div.sub-items'
    ).first();

    // Page title
    this.pageTitle = page.locator(
      'h1:has-text("All Requests"), ' +
      'h2:has-text("All Requests"), ' +
      'span.title:has-text("All Requests"), ' +
      '*:has-text("All Requests"):visible'
    ).first();

    // Ticket status cards
    this.totalTicketsCard = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Total Tickets"))').first();
    this.openTicketsCard = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Open Tickets"))').first();
    this.inProgressTicketsCard = page.locator('div.ticket-section-card:has(div.section-heading:has-text("In Progress Tickets"))').first();
    this.resolvedTicketsCard = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Resolved Tickets"))').first();
    this.closedTicketsCard = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Closed Tickets"))').first();

    // Ticket count spans (inside cards)
    this.totalTicketsCount = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Total Tickets")) span:first-child').first();
    this.openTicketsCount = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Open Tickets")) span:first-child').first();
    this.inProgressTicketsCount = page.locator('div.ticket-section-card:has(div.section-heading:has-text("In Progress Tickets")) span:first-child').first();
    this.resolvedTicketsCount = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Resolved Tickets")) span:first-child').first();
    this.closedTicketsCount = page.locator('div.ticket-section-card:has(div.section-heading:has-text("Closed Tickets")) span:first-child').first();

    // Search section toggle button
    this.searchToggleButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here")').first();

    // Search fields area
    this.searchFieldArea = page.locator('div.search-field-area').first();

    // Search form fields
    this.subIdField = page.locator('input#subId[placeholder="Sub Id"]').first();
    this.ticketIdField = page.locator('input#ticketId[placeholder="Ticket Id"]').first();

    // Search and Reset buttons
    this.searchButton = page.locator('button.search-btn:has-text("Search"), button[type="submit"]:has-text("Search")').first();
    this.resetButton = page.locator('button.reset-btn:has-text("Reset"), button[type="button"]:has-text("Reset")').first();

    // Table elements
    this.serviceRequestTable = page.locator('table, mat-table').first();
    this.tableRows = page.locator('tr[mat-row], tr[role="row"]:not([mat-header-row])');
    this.tableHeaders = page.locator('th[mat-header-cell], th[role="columnheader"]');
    
    // Table columns
    this.ticketIdColumn = page.locator('td[mat-cell].mat-column-Ticket-Id, td.cdk-column-Ticket-Id');
    this.subIdColumn = page.locator('td[mat-cell].mat-column-Sub-Id, td.cdk-column-Sub-Id');
    this.ticketStatusColumn = page.locator('td[mat-cell].mat-column-Ticket-Status, td.cdk-column-Ticket-Status');

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
    this.noDataMessage = page.locator('div:has-text("No Data Found")').first();
    
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
      'div:has-text("No columns selected")'
    ).first();

    // Raise Service Request button
    this.raiseServiceRequestButton = page.locator(
      'button.btn.add-btn:has-text("Raise Service Request"), ' +
      'button[routerlink="/service-request/raise-service-request"], ' +
      'button[ng-reflect-router-link="/service-request/raise-service-request"]'
    ).first();

    // Raise Service Request page elements
    this.raiseServiceRequestPageHeading = page.locator(
      'div.heading.ps-2.fs-5:has-text("Raise Service Request"), ' +
      'div.heading:has-text("Raise Service Request"), ' +
      'h1:has-text("Raise Service Request"), ' +
      'h2:has-text("Raise Service Request")'
    ).first();
  }

  /**
   * Navigates to Service Request → All Requests page
   */
  async navigateToAllRequests() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Step 1: Click on Service Request menu item to expand dropdown
      console.log('Step 1: Clicking Service Request menu to expand dropdown...');
      await this.serviceRequestMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.serviceRequestMenuItem.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Click to expand the Service Request menu
      await this.serviceRequestMenuItem.click();
      console.log('✓ Clicked Service Request menu item');
      
      // Step 2: Wait for submenu dropdown to open
      console.log('Step 2: Waiting for submenu dropdown to open...');
      await this.page.waitForTimeout(800); // Wait a bit longer for dropdown animation
      
      // Wait for submenu to appear - try multiple locators
      let subMenuAppeared = false;
      
      // Try waiting for submenu container with active-dropdown-subItems class
      try {
        const activeSubMenu = this.page.locator('div.sub-items.active-dropdown-subItems').first();
        await activeSubMenu.waitFor({ state: 'visible', timeout: 3000 });
        subMenuAppeared = true;
        console.log('✓ Submenu container is visible (active-dropdown-subItems)');
      } catch (e) {
        console.log('⚠ Submenu container not found with active-dropdown-subItems');
      }
      
      // Try waiting for submenu container in active dropdown
      if (!subMenuAppeared) {
        try {
          const subMenuInActive = this.page.locator('div.dropdown-sidebar-items.active-dropdown div.sub-items').first();
          await subMenuInActive.waitFor({ state: 'visible', timeout: 3000 });
          subMenuAppeared = true;
          console.log('✓ Submenu found in active dropdown');
        } catch (e) {
          console.log('⚠ Submenu not found in active dropdown');
        }
      }
      
      // Try waiting for any submenu item
      if (!subMenuAppeared) {
        try {
          const anySubMenu = this.page.locator('ul.sub-items, div.sub-items').first();
          await anySubMenu.waitFor({ state: 'visible', timeout: 3000 });
          subMenuAppeared = true;
          console.log('✓ Submenu found with general locator');
        } catch (e) {
          console.log('⚠ Submenu not found with general locator');
        }
      }
      
      // Step 3: Click on "All Requests" submenu item
      console.log('Step 3: Clicking on All Requests submenu item...');
      
      // Try multiple strategies to find and click "All Requests"
      let clicked = false;
      
      // Strategy 1: Use the specific locator with router-link
      try {
        await this.allRequestsSubMenuItem.waitFor({ state: 'visible', timeout: 3000 });
        await this.allRequestsSubMenuItem.scrollIntoViewIfNeeded();
        await this.allRequestsSubMenuItem.click();
        clicked = true;
        console.log('✓ Clicked All Requests using router-link locator');
      } catch (e) {
        console.log('⚠ Strategy 1 failed, trying alternative...');
      }
      
      // Strategy 2: Find by router-link within active submenu
      if (!clicked) {
        try {
          const allRequestsInActiveSubMenu = this.page.locator('div.sub-items.active-dropdown-subItems li[ng-reflect-router-link="/service-request/all-requests"]').first();
          await allRequestsInActiveSubMenu.waitFor({ state: 'visible', timeout: 3000 });
          await allRequestsInActiveSubMenu.scrollIntoViewIfNeeded();
          await allRequestsInActiveSubMenu.click();
          clicked = true;
          console.log('✓ Clicked All Requests using active submenu router-link locator');
        } catch (e) {
          console.log('⚠ Strategy 2 failed, trying alternative...');
        }
      }
      
      // Strategy 3: Find by text within submenu
      if (!clicked) {
        try {
          const allRequestsInSubMenu = this.page.locator('div.sub-items.active-dropdown-subItems li:has-text("All Requests"), ul.sub-items li:has-text("All Requests")').first();
          await allRequestsInSubMenu.waitFor({ state: 'visible', timeout: 3000 });
          await allRequestsInSubMenu.scrollIntoViewIfNeeded();
          await allRequestsInSubMenu.click();
          clicked = true;
          console.log('✓ Clicked All Requests using submenu text locator');
        } catch (e) {
          console.log('⚠ Strategy 3 failed, trying alternative...');
        }
      }
      
      // Strategy 4: Find active-li with "All Requests" text
      if (!clicked) {
        try {
          const allRequestsActiveLi = this.page.locator('li.active-li:has-text("All Requests")').first();
          await allRequestsActiveLi.waitFor({ state: 'visible', timeout: 3000 });
          await allRequestsActiveLi.scrollIntoViewIfNeeded();
          await allRequestsActiveLi.click();
          clicked = true;
          console.log('✓ Clicked All Requests using active-li locator');
        } catch (e) {
          console.log('⚠ Strategy 4 failed, trying last resort...');
        }
      }
      
      // Strategy 5: Use getByText (Playwright's text locator) within submenu
      if (!clicked) {
        try {
          const subMenuContainer = this.page.locator('div.sub-items.active-dropdown-subItems, div.dropdown-sidebar-items.active-dropdown').first();
          const allRequestsText = subMenuContainer.getByText('All Requests', { exact: false }).first();
          await allRequestsText.waitFor({ state: 'visible', timeout: 3000 });
          await allRequestsText.scrollIntoViewIfNeeded();
          await allRequestsText.click();
          clicked = true;
          console.log('✓ Clicked All Requests using getByText within submenu');
        } catch (e) {
          console.log('⚠ Strategy 5 failed');
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click "All Requests" submenu item after trying all strategies');
      }
      
      // Step 4: Wait for page to load
      console.log('Step 4: Waiting for page to load...');
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for page content to render
      console.log('✓ Navigated to Service Request → All Requests page');
    } catch (error) {
      console.error('Error navigating to All Requests page:', error);
      throw error;
    }
  }

  /**
   * Verifies that the All Requests page is visible
   * @returns {Promise<boolean>}
   */
  async isAllRequestsPageVisible() {
    try {
      // Wait a bit for page to load
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to verify page is loaded
      const titleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (titleVisible) {
        return true;
      }
      
      // Fallback: check URL
      const currentUrl = this.page.url();
      if (currentUrl.includes('service-request') || currentUrl.includes('all-requests')) {
        console.log('✓ Page verified by URL');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking page visibility:', error);
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
   * Gets the ticket count from Total Tickets card
   * @returns {Promise<number>}
   */
  async getTotalTicketsCount() {
    try {
      await this.page.waitForTimeout(500);
      const countText = await this.totalTicketsCount.textContent().catch(() => '0');
      const count = parseInt(countText.trim(), 10) || 0;
      console.log(`Total Tickets count: ${count}`);
      return count;
    } catch (error) {
      console.error('Error getting Total Tickets count:', error);
      return 0;
    }
  }

  /**
   * Gets the ticket count from a specific status card
   * @param {string} status - Status name: 'Open', 'In Progress', 'Resolved', 'Closed'
   * @returns {Promise<number>}
   */
  async getStatusTicketsCount(status) {
    try {
      await this.page.waitForTimeout(500);
      let countLocator;
      
      switch (status.toLowerCase()) {
        case 'open':
          countLocator = this.openTicketsCount;
          break;
        case 'in progress':
          countLocator = this.inProgressTicketsCount;
          break;
        case 'resolved':
          countLocator = this.resolvedTicketsCount;
          break;
        case 'closed':
          countLocator = this.closedTicketsCount;
          break;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
      
      const countText = await countLocator.textContent().catch(() => '0');
      const count = parseInt(countText.trim(), 10) || 0;
      console.log(`${status} Tickets count: ${count}`);
      return count;
    } catch (error) {
      console.error(`Error getting ${status} Tickets count:`, error);
      return 0;
    }
  }

  /**
   * Clicks on a status card
   * @param {string} status - Status name: 'Open', 'In Progress', 'Resolved', 'Closed'
   */
  async clickStatusCard(status) {
    try {
      await this.page.waitForTimeout(500);
      let cardLocator;
      
      switch (status.toLowerCase()) {
        case 'open':
          cardLocator = this.openTicketsCard;
          break;
        case 'in progress':
          cardLocator = this.inProgressTicketsCard;
          break;
        case 'resolved':
          cardLocator = this.resolvedTicketsCard;
          break;
        case 'closed':
          cardLocator = this.closedTicketsCard;
          break;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
      
      await cardLocator.waitFor({ state: 'visible', timeout: 5000 });
      await cardLocator.scrollIntoViewIfNeeded();
      await cardLocator.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for table to update
      console.log(`✓ Clicked ${status} Tickets card`);
    } catch (error) {
      console.error(`Error clicking ${status} Tickets card:`, error);
      throw error;
    }
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
   * Fills the Ticket Id search field
   * @param {string} ticketId - The Ticket Id to search for
   */
  async fillTicketIdField(ticketId) {
    await this.openSearchSection();
    await this.ticketIdField.waitFor({ state: 'visible', timeout: 5000 });
    await this.ticketIdField.fill(ticketId);
    console.log(`✓ Filled Ticket Id field with: "${ticketId}"`);
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
      await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.resetButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      console.log('✓ Reset button clicked');
    } catch (error) {
      console.error('Error clicking Reset button:', error);
      throw error;
    }
  }

  /**
   * Verifies all search fields are empty
   * @returns {Promise<boolean>}
   */
  async areSearchFieldsEmpty() {
    try {
      await this.openSearchSection();
      
      const subIdValue = await this.subIdField.inputValue().catch(() => '');
      const ticketIdValue = await this.ticketIdField.inputValue().catch(() => '');

      console.log(`Sub Id field empty: ${subIdValue === ''}`);
      console.log(`Ticket Id field empty: ${ticketIdValue === ''}`);

      return subIdValue === '' && ticketIdValue === '';
    } catch (error) {
      console.error('Error checking if search fields are empty:', error);
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
      
      // Try pattern: "Showing 1 to 20 of 41 records"
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
   * Gets all Ticket Id values from the table
   * @returns {Promise<string[]>}
   */
  async getTicketIdValues() {
    try {
      await this.page.waitForTimeout(1000);
      
      const ticketIds = await this.page.evaluate(() => {
        const values = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        
        for (const row of rows) {
          const cell = row.querySelector('td.mat-column-Ticket-Id, td.cdk-column-Ticket-Id');
          if (cell) {
            const text = (cell.textContent || '').trim();
            if (text) {
              values.push(text);
            }
          }
        }
        
        return values;
      }).catch(() => []);
      
      console.log(`Extracted ${ticketIds.length} Ticket Id values`);
      return ticketIds;
    } catch (error) {
      console.error('Error getting Ticket Id values:', error);
      return [];
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
            const text = (cell.textContent || '').trim();
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
   * Gets the first row's Ticket Id value
   * @returns {Promise<string>}
   */
  async getFirstRowTicketId() {
    try {
      await this.page.waitForTimeout(500);
      
      const ticketId = await this.page.evaluate(() => {
        const firstRow = document.querySelector('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        if (firstRow) {
          const cell = firstRow.querySelector('td.mat-column-Ticket-Id, td.cdk-column-Ticket-Id');
          if (cell) {
            const text = (cell.textContent || '').trim();
            return text || '';
          }
        }
        return '';
      }).catch(() => '');
      
      console.log(`First row Ticket Id: "${ticketId}"`);
      return ticketId;
    } catch (error) {
      console.error('Error getting first row Ticket Id:', error);
      return '';
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
            const text = (cell.textContent || '').trim();
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
   * Internal helper to get first-row cell text by header semantics
   * @param {'issueType'|'subIssueType'|'createdAt'} kind
   * @returns {Promise<string>}
   */
  async getFirstRowCellByHeaderKind(kind) {
    try {
      const value = await this.page.evaluate((k) => {
        const headerCells = Array.from(
          document.querySelectorAll('th[mat-header-cell], th[role="columnheader"]'),
        );
        if (!headerCells.length) return '';

        const normalize = (t) => (t || '').trim().toLowerCase();

        let targetIndex = -1;
        headerCells.forEach((cell, idx) => {
          const text = normalize(cell.textContent);
          if (!text) return;

          if (k === 'issueType') {
            if (text.includes('issue') && !text.includes('sub')) {
              targetIndex = idx;
            }
          } else if (k === 'subIssueType') {
            if (text.includes('issue') && text.includes('sub')) {
              targetIndex = idx;
            }
          } else if (k === 'createdAt') {
            if (text.includes('created')) {
              targetIndex = idx;
            }
          }
        });

        if (targetIndex === -1) return '';

        const firstRow =
          document.querySelector('tr[mat-row]') ||
          document.querySelector('tr[role="row"]:not([mat-header-row])');
        if (!firstRow) return '';

        const dataCells = Array.from(firstRow.querySelectorAll('td[mat-cell], td[role="gridcell"], td'));
        const cell = dataCells[targetIndex];
        if (!cell) return '';

        return (cell.textContent || '').trim();
      }, kind);

      return value || '';
    } catch (error) {
      console.error(`Error getting first row cell for ${kind}:`, error);
      return '';
    }
  }

  /**
   * Gets the first row's Issue Type text
   * @returns {Promise<string>}
   */
  async getFirstRowIssueType() {
    return this.getFirstRowCellByHeaderKind('issueType');
  }

  /**
   * Gets the first row's Sub-Issue Type text
   * @returns {Promise<string>}
   */
  async getFirstRowSubIssueType() {
    return this.getFirstRowCellByHeaderKind('subIssueType');
  }

  /**
   * Gets the first row's Created At text
   * @returns {Promise<string>}
   */
  async getFirstRowCreatedAt() {
    return this.getFirstRowCellByHeaderKind('createdAt');
  }

  /**
   * Verifies that all rows contain the searched Ticket Id
   * @param {string} searchTicketId - The Ticket Id to verify
   * @returns {Promise<boolean>}
   */
  async verifyTicketIdInAllRows(searchTicketId) {
    try {
      const ticketIds = await this.getTicketIdValues();
      
      if (ticketIds.length === 0) {
        console.log('⚠ No rows found in table');
        return false;
      }
      
      const searchLower = searchTicketId.toLowerCase();
      const allMatch = ticketIds.every(ticketId => {
        const ticketIdLower = ticketId.toLowerCase();
        return ticketIdLower.includes(searchLower) || searchLower.includes(ticketIdLower);
      });
      
      if (!allMatch) {
        console.log(`Some rows don't contain "${searchTicketId}"`);
        console.log(`Sample Ticket Ids:`, ticketIds.slice(0, 5));
      } else {
        console.log(`✓ All ${ticketIds.length} rows contain Ticket Id "${searchTicketId}"`);
      }
      
      return allMatch;
    } catch (error) {
      console.error('Error verifying Ticket Id in rows:', error);
      return false;
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
   * Checks if "No Data Found" message is visible
   * @returns {Promise<boolean>}
   */
  async isNoDataMessageVisible() {
    try {
      await this.page.waitForTimeout(1500);
      const isVisible = await this.noDataMessage.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        console.log('✓ "No Data Found" message is visible');
      }
      return isVisible;
    } catch (error) {
      console.error('Error checking for "No Data Found" message:', error);
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
   * Verifies table is visible
   * @returns {Promise<boolean>}
   */
  async isTableVisible() {
    try {
      const isVisible = await this.serviceRequestTable.isVisible({ timeout: 5000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      console.error('Error checking table visibility:', error);
      return false;
    }
  }

  /**
   * Verifies Search and Reset buttons are visible and clickable
   * @returns {Promise<{searchVisible: boolean, resetVisible: boolean, searchEnabled: boolean, resetEnabled: boolean}>}
   */
  async verifyButtonsVisibleAndClickable() {
    try {
      await this.openSearchSection();
      
      const searchVisible = await this.searchButton.isVisible({ timeout: 3000 }).catch(() => false);
      const resetVisible = await this.resetButton.isVisible({ timeout: 3000 }).catch(() => false);
      const searchEnabled = await this.searchButton.isEnabled().catch(() => false);
      const resetEnabled = await this.resetButton.isEnabled().catch(() => false);
      
      return {
        searchVisible,
        resetVisible,
        searchEnabled,
        resetEnabled
      };
    } catch (error) {
      console.error('Error verifying buttons:', error);
      return {
        searchVisible: false,
        resetVisible: false,
        searchEnabled: false,
        resetEnabled: false
      };
    }
  }

  /**
   * Verifies table headers are visible
   * @returns {Promise<boolean>}
   */
  async verifyTableHeadersVisible() {
    try {
      const headerCount = await this.tableHeaders.count();
      const isVisible = headerCount > 0;
      console.log(`Found ${headerCount} table headers`);
      return isVisible;
    } catch (error) {
      console.error('Error verifying table headers:', error);
      return false;
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
      const ariaExpanded = await this.selectHeadersButton.getAttribute('aria-expanded').catch(() => null);
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
      
      // Try pattern: "Showing 1 to 20 of 41 records"
      let matches = paginationText.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)\s+records/i);
      if (matches) {
        return {
          start: parseInt(matches[1], 10),
          end: parseInt(matches[2], 10),
          total: parseInt(matches[3], 10)
        };
      }
      
      // Try pattern: "1 – 20 of 41" (from range label)
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
   * Verifies the number of rows displayed matches the page size or total records (whichever is less)
   * @param {number} expectedPageSize - Expected number of rows (page size)
   * @returns {Promise<boolean>}
   */
  async verifyRowsDisplayed(expectedPageSize) {
    try {
      await this.page.waitForTimeout(1500);
      const rowCount = await this.getTableRowCount();
      
      // Get total records from pagination
      const totalRecords = await this.getTotalRecords();
      
      // Expected rows should be the minimum of page size and total records
      const expectedRows = Math.min(expectedPageSize, totalRecords);
      const matches = rowCount === expectedRows;
      
      if (matches) {
        if (totalRecords < expectedPageSize) {
          console.log(`✓ Table displays ${rowCount} rows (matches total records ${totalRecords}, which is less than page size ${expectedPageSize})`);
        } else {
          console.log(`✓ Table displays ${rowCount} rows (matches page size ${expectedPageSize})`);
        }
      } else {
        console.log(`⚠ Row count mismatch. Expected: ${expectedRows} (min of page size ${expectedPageSize} and total ${totalRecords}), Got: ${rowCount}`);
      }
      
      return matches;
    } catch (error) {
      console.error('Error verifying rows displayed:', error);
      return false;
    }
  }

  /**
   * Gets all Ticket Status values from the table
   * @returns {Promise<string[]>}
   */
  async getAllTicketStatuses() {
    try {
      await this.page.waitForTimeout(1000);
      
      const statuses = await this.page.evaluate(() => {
        const values = [];
        const rows = document.querySelectorAll('tr[mat-row], tr[role="row"]:not([mat-header-row])');
        
        for (const row of rows) {
          const cell = row.querySelector('td.mat-column-Ticket-Status, td.cdk-column-Ticket-Status');
          if (cell) {
            // Look for the status text in the cell
            // The status is in a span with class "ticket-title"
            const statusSpan = cell.querySelector('span.ticket-title');
            if (statusSpan) {
              const text = (statusSpan.textContent || '').trim();
              if (text) {
                values.push(text);
              }
            } else {
              // Fallback: get text from cell directly
              const text = (cell.textContent || '').trim();
              if (text) {
                values.push(text);
              }
            }
          }
        }
        
        return values;
      }).catch(() => []);
      
      console.log(`Extracted ${statuses.length} Ticket Status values`);
      if (statuses.length > 0) {
        const uniqueStatuses = [...new Set(statuses)];
        console.log(`Unique statuses found: ${uniqueStatuses.join(', ')}`);
      }
      return statuses;
    } catch (error) {
      console.error('Error getting Ticket Status values:', error);
      return [];
    }
  }

  /**
   * Asserts that all ticket statuses in the table equal the expected status
   * @param {string} expectedStatus - The expected status (e.g., "Open", "In Progress", "Resolved", "Closed")
   * @returns {Promise<boolean>}
   */
  async assertAllStatusesEqual(expectedStatus) {
    try {
      const statuses = await this.getAllTicketStatuses();
      
      if (statuses.length === 0) {
        console.log('⚠ No ticket statuses found in table');
        return false;
      }
      
      const expectedLower = expectedStatus.toLowerCase().trim();
      const allMatch = statuses.every(status => {
        const statusLower = status.toLowerCase().trim();
        return statusLower === expectedLower;
      });
      
      if (!allMatch) {
        const uniqueStatuses = [...new Set(statuses)];
        const mismatched = uniqueStatuses.filter(s => s.toLowerCase().trim() !== expectedLower);
        console.log(`✗ Status mismatch. Expected all "${expectedStatus}", but found: ${mismatched.join(', ')}`);
        console.log(`All statuses: ${statuses.join(', ')}`);
      } else {
        console.log(`✓ All ${statuses.length} rows have status "${expectedStatus}"`);
      }
      
      return allMatch;
    } catch (error) {
      console.error(`Error asserting all statuses equal "${expectedStatus}":`, error);
      return false;
    }
  }

  /**
   * Verifies that ticket statuses include only valid values
   * Valid statuses: Open, In Progress, Resolved, Closed
   * @returns {Promise<boolean>}
   */
  async verifyValidTicketStatuses() {
    try {
      const statuses = await this.getAllTicketStatuses();
      
      if (statuses.length === 0) {
        console.log('⚠ No ticket statuses found in table');
        return false;
      }
      
      const validStatuses = ['open', 'in progress', 'resolved', 'closed'];
      const uniqueStatuses = [...new Set(statuses.map(s => s.toLowerCase().trim()))];
      
      const invalidStatuses = uniqueStatuses.filter(status => 
        !validStatuses.some(valid => valid === status)
      );
      
      if (invalidStatuses.length > 0) {
        console.log(`✗ Invalid statuses found: ${invalidStatuses.join(', ')}`);
        console.log(`Valid statuses should be: Open, In Progress, Resolved, Closed`);
        return false;
      } else {
        console.log(`✓ All statuses are valid: ${uniqueStatuses.join(', ')}`);
        return true;
      }
    } catch (error) {
      console.error('Error verifying valid ticket statuses:', error);
      return false;
    }
  }

  /**
   * Verifies Ticket Status column is visible
   * @returns {Promise<boolean>}
   */
  async isTicketStatusColumnVisible() {
    try {
      const isVisible = await this.ticketStatusColumn.first().isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        console.log('✓ Ticket Status column is visible');
      }
      return isVisible;
    } catch (error) {
      console.error('Error checking Ticket Status column visibility:', error);
      return false;
    }
  }

  /**
   * Clicks the "Raise Service Request" button
   */
  async clickRaiseServiceRequestButton() {
    try {
      await this.raiseServiceRequestButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.raiseServiceRequestButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.raiseServiceRequestButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for navigation
      console.log('✓ Clicked Raise Service Request button');
    } catch (error) {
      console.error('Error clicking Raise Service Request button:', error);
      throw error;
    }
  }

  /**
   * Verifies that the Raise Service Request page is visible
   * @returns {Promise<boolean>}
   */
  async isRaiseServiceRequestPageVisible() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check URL
      const currentUrl = this.page.url();
      const urlMatches = currentUrl.includes('service-request/raise') || 
                        currentUrl.includes('service-request/raise-service') ||
                        currentUrl.includes('service-request/raise-request');
      
      if (urlMatches) {
        console.log(`✓ URL matches Raise Service Request page: ${currentUrl}`);
      }
      
      // Check page heading
      const headingVisible = await this.raiseServiceRequestPageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (headingVisible) {
        console.log('✓ Raise Service Request page heading is visible');
        return true;
      }
      
      if (urlMatches) {
        console.log('✓ Page verified by URL (heading not found but URL matches)');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking Raise Service Request page visibility:', error);
      return false;
    }
  }

  /**
   * Gets the current page URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = { ServiceRequestAllRequestPage };

