class AllRequestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Service Request dropdown and All Requests option
    this.serviceRequestDropdown = page.locator('a[data-bs-toggle="collapse"][data-bs-target="#service-request"], a.nav-link:has-text("Service Request")[data-bs-toggle="collapse"]').first();
    this.allRequestsOption = page.locator('a[href="/all-request"], a[ng-reflect-router-link="all-request"], a:has-text("All Requests"), #service-request a:has-text("All Requests")').first();
    
    // Page wrapper
    this.serviceRequestWrapper = page.locator('.service-request-wrapper, .service-request, [class*="service-request"], [class*="allrequest"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern, .header-left').first();
    this.pageHeading = page.locator('h6.page-title-modern, h1.page-title-modern, h2.page-title-modern, .page-title-modern').first();
    this.pageTitle = page.locator('title, .page-title').first();
    
    // Summary cards - Service Request ticket cards
    this.summaryCardsContainer = page.locator('.tickets-tab, .row.mt-2:has(.ticket-card-modern)').first();
    this.allSummaryCards = page.locator('.ticket-card-modern, .card.ticket-card-modern');
    
    // Individual summary cards (common patterns)
    this.allCard = page.locator('.card:has-text("All"), button:has-text("All"), .summary-card:has-text("All"), [class*="card"]:has-text("All")').first();
    this.openCard = page.locator('.card:has-text("Open"), button:has-text("Open"), .summary-card:has-text("Open"), [class*="card"]:has-text("Open")').first();
    this.closedCard = page.locator('.card:has-text("Closed"), button:has-text("Closed"), .summary-card:has-text("Closed"), [class*="card"]:has-text("Closed")').first();
    this.inProgressCard = page.locator('.card:has-text("In Progress"), button:has-text("In Progress"), .summary-card:has-text("In Progress"), [class*="card"]:has-text("In Progress"), .card:has-text("InProgress")').first();
    this.pendingCard = page.locator('.card:has-text("Pending"), button:has-text("Pending"), .summary-card:has-text("Pending"), [class*="card"]:has-text("Pending")').first();
    
    // Active/selected card indicator
    this.activeCard = page.locator('.card.active, .card.selected, button.active, [class*="card"][class*="active"], [class*="card"][class*="selected"]').first();
    
    // Table
    this.serviceRequestTable = page.locator('table, app-table table, mat-table').first();
    this.tableRows = page.locator('table tbody tr, app-table table tbody tr, mat-table tbody mat-row').first();
    this.allTableRows = page.locator('table tbody tr, app-table table tbody tr, mat-table tbody mat-row');
    this.tableHeaders = page.locator('table thead th, app-table thead th, mat-table thead mat-header-cell');
    
    // Search functionality
    this.searchInput = page.locator('input[placeholder*="Search"], input[placeholder*="Email"], input[type="text"][placeholder*="search"], input[type="email"], app-search-form input, input[name*="email"], input[id*="email"]').first();
    this.searchButton = page.locator('button:has-text("Search"), button[type="submit"]:has-text("Search"), .search-button, button:has(i.bi-search)').first();
    this.clearSearchButton = page.locator('button:has-text("Clear"), button:has-text("Reset"), .clear-button, .reset-button, button:has(i.bi-x), button[aria-label*="Clear"]').first();
    
    // No data message
    this.noDataFoundMessage = page.locator('p.request:has-text("No Service Request !"), p.request, text=No Service Request !, text=No Service Request, text=No data found, text=No Data Found, .no-data, .empty-state, div:has-text("No Service Request")').first();
    
    // Select Headers functionality
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), button:has-text("Select Columns"), .select-headers-btn, button.dropdown-toggle-modern:has-text("Select Headers"), [aria-label*="Select Headers"]').first();
    this.selectHeadersDropdown = page.locator('ul.dropdown-menu-modern.show, ul.dropdown-menu-modern:has(.dropdown-item-modern), .dropdown-menu-modern.p-1.show, [class*="dropdown-menu-modern"].show').first();
    this.selectHeadersModal = page.locator('.modal:has-text("Select Headers"), .modal:has-text("Select Columns"), [role="dialog"]:has-text("Select")').first();
    this.headerCheckboxes = page.locator('ul.dropdown-menu-modern.show input[type="checkbox"], ul.dropdown-menu-modern.show mat-checkbox, .dropdown-menu-modern input[type="checkbox"]');
    this.modalCloseButton = this.selectHeadersModal.locator('button[aria-label="Close"], .modal-header button.close').first();
    
    // Pagination - Angular Material paginator
    this.paginationContainer = page.locator('.mat-mdc-paginator-container, .pagination, [class*="pagination"], .pagination-controls').first();
    this.itemsPerPageDropdown = page.locator('mat-select[aria-labelledby*="paginator-page-size"], .mat-mdc-paginator-page-size mat-select, mat-select').first();
    this.paginationText = page.locator('.mat-mdc-paginator-range-label, [aria-live="polite"]:has-text("–"), text=/\\d+.*–.*\\d+.*of.*\\d+/i').first();
    this.nextButton = page.locator('button.mat-mdc-paginator-navigation-next, button[aria-label="Next page"], button:has-text("Next"), .pagination-next').first();
    this.previousButton = page.locator('button.mat-mdc-paginator-navigation-previous, button[aria-label="Previous page"], button:has-text("Previous"), .pagination-prev').first();
    this.pageNumber = page.locator('.page-number, [class*="page-number"], .pagination-current, .page-item.active .page-link').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
  }

  /**
   * Navigates to Service Request page (All Requests)
   */
  async gotoServiceRequest() {
    try {
      // Step 1: Click on Service Request dropdown in sidebar
      const dropdownVisible = await this.serviceRequestDropdown.isVisible({ timeout: 5000 }).catch(() => false);
      if (dropdownVisible) {
        // Check if dropdown is already open (has 'show' class on the collapse element)
        const collapseElement = this.page.locator('#service-request.collapse');
        const isOpen = await collapseElement.evaluate(el => el.classList.contains('show')).catch(() => false);
        
        if (!isOpen) {
          // Click to open the dropdown
          await this.serviceRequestDropdown.scrollIntoViewIfNeeded();
          await this.serviceRequestDropdown.click();
          await this.page.waitForTimeout(500); // Wait for dropdown to open
        }
        
        // Step 2: Click on "All Requests" option
        await this.allRequestsOption.waitFor({ state: 'visible', timeout: 10000 });
        await this.allRequestsOption.scrollIntoViewIfNeeded();
        await this.allRequestsOption.click();
        await this.page.waitForTimeout(2000); // Wait for navigation
      } else {
        // Fallback: navigate directly to /all-request
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/all-request`);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      // Fallback: navigate directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/all-request`);
      await this.page.waitForTimeout(2000);
    }
    
    // Wait for page to load
    await Promise.race([
      this.serviceRequestWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.serviceRequestTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Service Request page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageHeading.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.serviceRequestWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets current page URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Verifies page URL contains "/service-request" or "/all-request"
   * @returns {Promise<boolean>}
   */
  async verifyUrl() {
    const url = await this.getCurrentUrl();
    const urlLower = url.toLowerCase();
    return urlLower.includes('/service-request') || 
           urlLower.includes('/all-request') ||
           urlLower.includes('servicerequest') ||
           urlLower.includes('allrequest');
  }

  /**
   * Verifies page title or heading is visible (accepts "Service Request" or "All Request")
   * @returns {Promise<{visible: boolean, text: string}>}
   */
  async verifyPageTitle() {
    try {
      const headingVisible = await this.pageHeading.isVisible({ timeout: 5000 });
      const headerVisible = await this.pageHeader.isVisible({ timeout: 5000 });
      const visible = headingVisible || headerVisible;
      
      let text = '';
      if (headingVisible) {
        text = await this.pageHeading.textContent();
      } else if (headerVisible) {
        text = await this.pageHeader.textContent();
      }
      text = text?.trim() || '';
      
      return {
        visible: visible,
        text: text
      };
    } catch (error) {
      return {
        visible: false,
        text: ''
      };
    }
  }

  /**
   * Verifies summary cards and table are displayed
   * @returns {Promise<{summaryCardsVisible: boolean, tableVisible: boolean}>}
   */
  async verifySummaryCardsAndTable() {
    try {
      const summaryCardsVisible = await this.summaryCardsContainer.isVisible({ timeout: 5000 }).catch(() => false) ||
                                  await this.allSummaryCards.first().isVisible({ timeout: 5000 }).catch(() => false);
      const tableVisible = await this.serviceRequestTable.isVisible({ timeout: 5000 }).catch(() => false);
      
      return {
        summaryCardsVisible: summaryCardsVisible,
        tableVisible: tableVisible
      };
    } catch (error) {
      return {
        summaryCardsVisible: false,
        tableVisible: false
      };
    }
  }

  /**
   * Gets all summary cards (ticket cards)
   * @returns {Promise<Array<{text: string, element: any}>>}
   */
  async getAllSummaryCards() {
    try {
      const cards = [];
      
      // Wait a bit for cards to load
      await this.page.waitForTimeout(1000);
      
      // Use the ticket-card-modern selector
      const cardCount = await this.allSummaryCards.count();
      
      // Extract card information - get only the count and title from each card
      for (let i = 0; i < cardCount; i++) {
        const card = this.allSummaryCards.nth(i);
        const isVisible = await card.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          let cardText = '';
          try {
            // Get the ticket count (e.g., "5", "1", "0")
            const countElement = card.locator('.ticket-count-modern');
            const count = await countElement.textContent();
            const countText = count?.trim() || '';
            
            // Get the ticket title (e.g., "Open Tickets", "Total Tickets")
            const titleElement = card.locator('.ticket-title-modern');
            const title = await titleElement.textContent();
            const titleText = title?.trim() || '';
            
            // Combine count and title (e.g., "1Open Tickets")
            cardText = `${countText}${titleText}`.trim();
          } catch (e) {
            // If we can't get count/title separately, try to extract from card body
            try {
              const cardBody = card.locator('.card-body');
              const bodyText = await cardBody.textContent();
              // Extract just the number and title, ignore icons and other content
              const match = bodyText?.match(/(\d+)\s*([A-Za-z\s]+Tickets?)/i);
              if (match) {
                cardText = `${match[1]}${match[2]}`.trim();
              } else {
                cardText = bodyText?.trim() || '';
              }
            } catch (e2) {
              // Last resort: get minimal text
              cardText = await card.textContent();
              cardText = cardText?.trim() || '';
            }
          }
          
          // Only add if we have meaningful text and it looks like a ticket card
          if (cardText && (cardText.includes('Ticket') || cardText.match(/^\d+/))) {
            cards.push({
              text: cardText,
              element: card
            });
          }
        }
      }
      
      return cards;
    } catch (error) {
      console.log(`Error getting summary cards: ${error.message}`);
      return [];
    }
  }

  /**
   * Clicks on a summary card by text (partial match)
   * @param {string} cardText - Text of the card to click (can be partial)
   */
  async clickSummaryCard(cardText) {
    try {
      // Try to find card by ticket title (e.g., "Open Tickets", "Total Tickets")
      // The cardText might be like "1Open Tickets" or "5Total Tickets"
      let card = null;
      
      // Try exact match first
      card = this.page.locator(`.ticket-card-modern:has-text("${cardText}")`).first();
      const exactMatch = await card.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!exactMatch) {
        // Try partial match - extract key words like "Open", "Total", "Closed", etc.
        const keywords = ['Total', 'Open', 'Closed', 'Resolved', 'Inprogress', 'In Progress'];
        let matchedKeyword = '';
        for (const keyword of keywords) {
          if (cardText.includes(keyword)) {
            matchedKeyword = keyword;
            break;
          }
        }
        
        if (matchedKeyword) {
          // Find card by ticket title
          card = this.page.locator(`.ticket-card-modern:has(.ticket-title-modern:has-text("${matchedKeyword}"))`).first();
        } else {
          // Fallback to any card containing the text
          card = this.page.locator(`.ticket-card-modern:has-text("${cardText}")`).first();
        }
      }
      
      await card.waitFor({ state: 'visible', timeout: 10000 });
      await card.scrollIntoViewIfNeeded();
      await card.click();
      await this.page.waitForTimeout(2000); // Wait for table to update
    } catch (error) {
      throw new Error(`Failed to click summary card "${cardText}": ${error.message}`);
    }
  }

  /**
   * Gets table row count
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      return await this.allTableRows.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Verifies table has data
   * @returns {Promise<{hasData: boolean, rowCount: number}>}
   */
  async verifyTableData() {
    try {
      const rowCount = await this.getTableRowCount();
      const hasData = rowCount > 0;
      
      return {
        hasData: hasData,
        rowCount: rowCount
      };
    } catch (error) {
      return {
        hasData: false,
        rowCount: 0
      };
    }
  }

  /**
   * Gets email value from first table row
   * @returns {Promise<string>}
   */
  async getEmailFromTable() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        return '';
      }
      
      // Try to find email in any row
      for (let rowIndex = 0; rowIndex < Math.min(rowCount, 5); rowIndex++) {
        const row = this.allTableRows.nth(rowIndex);
        const cellCount = await row.locator('td, mat-cell').count();
        
        // Try different columns
        for (let i = 0; i < cellCount; i++) {
          const cell = row.locator('td, mat-cell').nth(i);
          const text = await cell.textContent();
          if (text) {
            // Check if text contains email pattern
            const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
            if (emailMatch) {
              return emailMatch[0].trim();
            }
          }
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Enters email in search field
   * @param {string} email
   */
  async enterEmailSearch(email) {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.fill(email);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter email search: ${error.message}`);
    }
  }

  /**
   * Clicks Search button
   */
  async clickSearch() {
    try {
      const searchButtonVisible = await this.searchButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (searchButtonVisible) {
        await this.searchButton.click();
      } else {
        // If no search button, press Enter
        await this.page.keyboard.press('Enter');
      }
      await this.page.waitForTimeout(2000); // Wait for search results
    } catch (error) {
      throw new Error(`Failed to click Search button: ${error.message}`);
    }
  }

  /**
   * Clears search input
   */
  async clearSearch() {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.clear();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to clear search: ${error.message}`);
    }
  }

  /**
   * Clicks Clear/Reset button
   */
  async clickClearSearch() {
    try {
      const clearButtonVisible = await this.clearSearchButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (clearButtonVisible) {
        await this.clearSearchButton.click();
      } else {
        // If no clear button, clear input and press Enter
        await this.clearSearch();
        await this.page.keyboard.press('Enter');
      }
      await this.page.waitForTimeout(2000); // Wait for data to restore
    } catch (error) {
      throw new Error(`Failed to click Clear button: ${error.message}`);
    }
  }

  /**
   * Verifies "No Service Request !" message is displayed
   * @returns {Promise<boolean>}
   */
  async isNoDataMessageVisible() {
    try {
      // Wait a bit for the message to appear after search
      await this.page.waitForTimeout(1000);
      
      // Try multiple selectors to find the message
      const selectors = [
        'p.request:has-text("No Service Request !")',
        'p.request',
        'text=No Service Request !',
        'text=No Service Request',
        '.no-data',
        '.empty-state'
      ];
      
      for (const selector of selectors) {
        const element = this.page.locator(selector).first();
        const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          const text = await element.textContent().catch(() => '');
          if (text && text.includes('No Service Request')) {
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks on Select Headers button
   */
  async clickSelectHeaders() {
    try {
      await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectHeadersButton.scrollIntoViewIfNeeded();
      await this.selectHeadersButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for dropdown to open (check for 'show' class)
      try {
        await this.selectHeadersDropdown.waitFor({ state: 'visible', timeout: 3000 });
        // Verify it has the 'show' class
        await this.page.waitForFunction(
          (selector) => {
            const element = document.querySelector(selector);
            return element && element.classList.contains('show');
          },
          'ul.dropdown-menu-modern',
          { timeout: 2000 }
        ).catch(() => {});
      } catch (e) {
        // Fallback: check for modal
        await this.selectHeadersModal.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
      }
    } catch (error) {
      throw new Error(`Failed to click Select Headers button: ${error.message}`);
    }
  }

  /**
   * Verifies Select Headers dropdown/modal is open
   * @returns {Promise<boolean>}
   */
  async isSelectHeadersOpen() {
    try {
      // Check if dropdown has 'show' class and is visible
      const dropdownVisible = await this.selectHeadersDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      if (dropdownVisible) {
        // Also verify it has the 'show' class
        const hasShowClass = await this.selectHeadersDropdown.evaluate(el => el.classList.contains('show')).catch(() => false);
        if (hasShowClass) {
          return true;
        }
      }
      
      // Fallback: check modal
      const modalVisible = await this.selectHeadersModal.isVisible({ timeout: 2000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all header checkbox options
   * @returns {Promise<Array<{label: string, checked: boolean}>>}
   */
  async getHeaderOptions() {
    try {
      // Try dropdown first (more common)
      const dropdownVisible = await this.selectHeadersDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      const container = dropdownVisible ? this.selectHeadersDropdown : this.selectHeadersModal;
      
      const checkboxes = container.locator('input[type="checkbox"], mat-checkbox, [role="checkbox"]');
      const count = await checkboxes.count();
      const options = [];
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        try {
          // Get label text from the span next to checkbox
          const label = await checkbox.evaluate(el => {
            const labelEl = el.closest('label');
            if (labelEl) {
              const span = labelEl.querySelector('span');
              return span?.textContent?.trim() || labelEl.textContent?.trim() || '';
            }
            return '';
          }).catch(() => '');
          
          // Also try getting from value attribute
          const valueAttr = await checkbox.getAttribute('value').catch(() => '');
          const finalLabel = label || valueAttr;
          
          const checked = await checkbox.isChecked().catch(() => false);
          if (finalLabel) {
            options.push({ label: finalLabel, checked });
          }
        } catch (e) {
          // Skip this checkbox if we can't get its info
          continue;
        }
      }
      
      return options;
    } catch (error) {
      return [];
    }
  }

  /**
   * Toggles a header checkbox by index
   * @param {number} index - Index of the checkbox to toggle
   */
  async toggleHeaderCheckbox(index) {
    try {
      const dropdownVisible = await this.selectHeadersDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      const container = dropdownVisible ? this.selectHeadersDropdown : this.selectHeadersModal;
      
      const checkboxes = container.locator('input[type="checkbox"], mat-checkbox, [role="checkbox"]');
      const checkbox = checkboxes.nth(index);
      
      await checkbox.scrollIntoViewIfNeeded();
      const isChecked = await checkbox.isChecked().catch(() => false);
      if (isChecked) {
        await checkbox.uncheck();
      } else {
        await checkbox.check();
      }
      await this.page.waitForTimeout(1000); // Wait for table to update
    } catch (error) {
      throw new Error(`Failed to toggle header checkbox: ${error.message}`);
    }
  }

  /**
   * Closes Select Headers dropdown/modal
   */
  async closeSelectHeaders() {
    try {
      const dropdownVisible = await this.selectHeadersDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      const modalVisible = await this.selectHeadersModal.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (modalVisible) {
        const closeButtonVisible = await this.modalCloseButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (closeButtonVisible) {
          await this.modalCloseButton.click();
        } else {
          await this.page.keyboard.press('Escape');
        }
      } else if (dropdownVisible) {
        // For dropdown, press Escape or click outside
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
        
        // Verify dropdown is closed
        const stillOpen = await this.selectHeadersDropdown.isVisible({ timeout: 1000 }).catch(() => false);
        if (stillOpen) {
          // Click outside the dropdown
          await this.page.click('body', { position: { x: 0, y: 0 } });
        }
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Gets the count of visible table columns
   * @returns {Promise<number>}
   */
  async getVisibleColumnCount() {
    try {
      return await this.tableHeaders.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Verifies pagination controls are visible
   * @returns {Promise<boolean>}
   */
  async isPaginationVisible() {
    try {
      return await this.paginationContainer.isVisible({ timeout: 3000 }) ||
             await this.nextButton.isVisible({ timeout: 3000 }).catch(() => false) ||
             await this.previousButton.isVisible({ timeout: 3000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets current page number
   * @returns {Promise<number>}
   */
  async getCurrentPageNumber() {
    try {
      const pageNumberVisible = await this.pageNumber.isVisible({ timeout: 2000 }).catch(() => false);
      if (pageNumberVisible) {
        const text = await this.pageNumber.textContent();
        const match = text?.match(/\d+/);
        return match ? parseInt(match[0], 10) : 1;
      }
      return 1;
    } catch (error) {
      return 1;
    }
  }

  /**
   * Clicks Next pagination button
   */
  async clickNextButton() {
    try {
      await this.nextButton.waitFor({ state: 'visible', timeout: 10000 });
      
      // Check if button is enabled
      const isEnabled = await this.isNextButtonEnabled();
      if (!isEnabled) {
        throw new Error('Next button is disabled (no more pages available)');
      }
      
      await this.nextButton.scrollIntoViewIfNeeded();
      await this.nextButton.click();
      await this.page.waitForTimeout(2000); // Wait for page to load
    } catch (error) {
      throw new Error(`Failed to click Next button: ${error.message}`);
    }
  }

  /**
   * Clicks Previous pagination button
   */
  async clickPreviousButton() {
    try {
      await this.previousButton.waitFor({ state: 'visible', timeout: 10000 });
      
      // Check if button is enabled
      const isEnabled = await this.isPreviousButtonEnabled();
      if (!isEnabled) {
        throw new Error('Previous button is disabled (already on first page)');
      }
      
      await this.previousButton.scrollIntoViewIfNeeded();
      await this.previousButton.click();
      await this.page.waitForTimeout(2000); // Wait for page to load
    } catch (error) {
      throw new Error(`Failed to click Previous button: ${error.message}`);
    }
  }

  /**
   * Gets first row ID from table
   * @returns {Promise<string>}
   */
  async getFirstRowId() {
    try {
      const firstRow = this.allTableRows.first();
      // ID is usually in the first column
      const idCell = firstRow.locator('td').first().or(firstRow.locator('mat-cell').first());
      const text = await idCell.textContent();
      return text?.trim() || '';
    } catch (error) {
      return '';
    }
  }
}

module.exports = { AllRequestPage };

