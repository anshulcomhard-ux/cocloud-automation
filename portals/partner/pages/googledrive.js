class GoogleDrivePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Google Drive module entry
    this.googleDriveMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/googledrive"], ' +
        'div.sidebar-items:has(span.title:has-text("Google Drive")), ' +
        'div.sidebar-items:has-text("Google Drive")'
      )
      .first();

    // Google Drive page title
    this.googleDrivePageTitle = page
      .locator(
        'h1:has-text("Google Drive"), h2:has-text("Google Drive"), ' +
        'span.title:has-text("Google Drive"), *:has-text("Google Drive")'
      )
      .first();

    // Main section title "Schedular Log Report"
    this.schedulerLogReportTitle = page
      .locator(
        'h1:has-text("Schedular Log Report"), ' +
        'h2:has-text("Schedular Log Report"), ' +
        'h3:has-text("Schedular Log Report"), ' +
        '*:has-text("Schedular Log Report")'
      )
      .first();

    // Metric Cards
    // Auth Attempt card
    this.authAttemptCard = page.locator('div.card-body:has(strong:has-text("Auth Attempt")), div.card:has-text("Auth Attempt")').first();
    this.authAttemptLabel = this.authAttemptCard.locator('strong:has-text("Auth Attempt")').first();
    this.authAttemptCount = this.authAttemptCard.locator('div.d-flex strong, div.d-flex.justify-content-between strong, strong').first();
    this.authAttemptIcon = this.authAttemptCard.locator('div.tickets i, i[class*="bi"]').first();

    // Auth Completed card
    this.authCompletedCard = page.locator('div.card-body:has(strong:has-text("Auth Completed")), div.card:has-text("Auth Completed")').first();
    this.authCompletedLabel = this.authCompletedCard.locator('strong:has-text("Auth Completed")').first();
    this.authCompletedCount = this.authCompletedCard.locator('div.d-flex strong, div.d-flex.justify-content-between strong, strong').first();
    this.authCompletedIcon = this.authCompletedCard.locator('div.tickets i, i[class*="bi"]').first();

    // Scheduler Add card (note: might be "Schedular Add" in HTML)
    this.schedulerAddCard = page.locator('div.card-body:has(strong:has-text("Scheduler Add")), div.card-body:has(strong:has-text("Schedular Add")), div.card:has-text("Scheduler Add"), div.card:has-text("Schedular Add")').first();
    this.schedulerAddLabel = this.schedulerAddCard.locator('strong:has-text("Scheduler Add"), strong:has-text("Schedular Add")').first();
    this.schedulerAddCount = this.schedulerAddCard.locator('div.d-flex strong, div.d-flex.justify-content-between strong, strong').first();
    this.schedulerAddIcon = this.schedulerAddCard.locator('div.tickets i, i[class*="bi"]').first();

    // Success Scheduler Log card (note: label is "Success Schedular Log" in HTML)
    this.successSchedulerLogCard = page.locator('div.card-body:has(strong:has-text("Success Schedular Log")), div.card:has-text("Success Schedular Log"), div.card:has-text("Success Scheduler Log")').first();
    this.successSchedulerLogLabel = this.successSchedulerLogCard.locator('strong:has-text("Success Schedular Log"), strong:has-text("Success Scheduler Log")').first();
    this.successSchedulerLogCount = this.successSchedulerLogCard.locator('div.d-flex strong, div.d-flex.justify-content-between strong, strong').first();
    this.successSchedulerLogIcon = this.successSchedulerLogCard.locator('div.tickets i, i[class*="bi"]').first();

    // Failed Scheduler Log card (note: label is "Failed Schedular Log" in HTML)
    this.failedSchedulerLogCard = page.locator('div.card-body:has(strong:has-text("Failed Schedular Log")), div.card:has-text("Failed Schedular Log"), div.card:has-text("Failed Scheduler Log")').first();
    this.failedSchedulerLogLabel = this.failedSchedulerLogCard.locator('strong:has-text("Failed Schedular Log"), strong:has-text("Failed Scheduler Log")').first();
    this.failedSchedulerLogCount = this.failedSchedulerLogCard.locator('div.d-flex strong, div.d-flex.justify-content-between strong, strong').first();
    this.failedSchedulerLogIcon = this.failedSchedulerLogCard.locator('div.tickets i, i[class*="bi"]').first();

    // Delete Scheduler Log card (note: label is "Delete Schedular Log" in HTML)
    this.deleteSchedulerLogCard = page.locator('div.card-body:has(strong:has-text("Delete Schedular Log")), div.card:has-text("Delete Schedular Log"), div.card:has-text("Delete Scheduler Log")').first();
    this.deleteSchedulerLogLabel = this.deleteSchedulerLogCard.locator('strong:has-text("Delete Schedular Log"), strong:has-text("Delete Scheduler Log")').first();
    this.deleteSchedulerLogCount = this.deleteSchedulerLogCard.locator('div.d-flex strong, div.d-flex.justify-content-between strong, strong').first();
    this.deleteSchedulerLogIcon = this.deleteSchedulerLogCard.locator('div.tickets i, i[class*="bi"]').first();

    // Custom Date field
    this.customDateField = page.locator('mat-form-field:has(mat-label:has-text("Custom Date")), *:has-text("Custom Date")').first();
    this.customDateInput = page.locator('mat-date-range-input, input[type="date"], input[placeholder*="date" i]').first();
    this.customDateCalendarIcon = this.customDateField.locator('mat-datepicker-toggle, button[aria-label*="calendar" i], i[class*="calendar"], svg[class*="calendar"]').first();

    // Graph/Chart container
    this.chartContainer = page.locator('div.chart-container, div.chart, canvas, svg[class*="chart"], div[class*="graph"]').first();

    // No Data Found message
    this.noDataFoundMessage = page.locator('*:has-text("No Data Found"), *:has-text("No data found"), *:has-text("no data found")').first();

    // Clickable elements for Success and Failed Schedular Log
    // These are the clickable labels within the cards (with pointer class and underline based on HTML)
    this.successSchedularLogClickable = page.locator('*[class*="pointer"]:has-text("Success Schedular Log"), *[class*="pointer"]:has-text("Success Scheduler Log"), strong:has-text("Success Schedular Log"), strong:has-text("Success Scheduler Log")').first();
    this.failedSchedularLogClickable = page.locator('*[class*="pointer"]:has-text("Failed Schedular Log"), *[class*="pointer"]:has-text("Failed Scheduler Log"), strong:has-text("Failed Schedular Log"), strong:has-text("Failed Scheduler Log")').first();

    // Toast message locators
    this.toastContainer = page.locator('div.toast, div[role="alert"], div.snackbar, div.notification, *[class*="toast"], *[class*="snackbar"]').first();
    this.toastMessages = page.locator('div.toast, div[role="alert"], div.snackbar, div.notification, *[class*="toast"], *[class*="snackbar"]');
    this.successToast = page.locator('div.toast-success, div[class*="success"], *:has-text("success")').first();
    this.errorToast = page.locator('div.toast-error, div[class*="error"], *:has-text("error")').first();

    // Table/list locators for scheduler logs
    this.schedulerLogTable = page.locator('table, mat-table, div[class*="table"], div[role="table"]').first();
    this.schedulerLogTableRows = page.locator('table tbody tr, mat-table tbody tr, div[class*="table"] tbody tr, div[role="row"]').filter({ hasNot: page.locator('[role="columnheader"]') });
    this.schedulerLogList = page.locator('div[class*="list"], ul.list, mat-list, div[role="list"]').first();
    this.schedulerLogListItems = page.locator('div[class*="list-item"], li, mat-list-item, div[role="listitem"]');
  }

  /**
   * Navigates to the Google Drive page.
   */
  async navigateToGoogleDrive() {
    try {
      await this.googleDriveMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.googleDriveMenuItem.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.googleDriveMenuItem.click();
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
      await this.page.waitForTimeout(2000);
      console.log('✓ Navigated to Google Drive page');
    } catch (error) {
      console.error('Error navigating to Google Drive page:', error);
      throw error;
    }
  }

  /**
   * Checks if Google Drive page is visible.
   * @returns {Promise<boolean>}
   */
  async isGoogleDrivePageVisible() {
    try {
      const isVisible = await this.googleDrivePageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      // Alternative check: URL contains 'google-drive' or 'googledrive'
      const url = await this.page.url();
      const urlLower = url.toLowerCase();
      return urlLower.includes('google-drive') || urlLower.includes('googledrive');
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.page.url();
  }

  /**
   * Verifies that the sidebar menu "Google Drive" is visible and active.
   * @returns {Promise<{visible: boolean, active: boolean}>}
   */
  async verifyGoogleDriveMenuItem() {
    try {
      const isVisible = await this.googleDriveMenuItem.isVisible({ timeout: 5000 });
      const hasActiveClass = await this.googleDriveMenuItem.evaluate((el) => {
        return el.classList.contains('active') || 
               el.classList.contains('active-section') ||
               el.getAttribute('class')?.includes('active');
      }).catch(() => false);
      
      return {
        visible: isVisible,
        active: hasActiveClass
      };
    } catch (error) {
      console.error('Error verifying Google Drive menu item:', error);
      return { visible: false, active: false };
    }
  }

  /**
   * Verifies a metric card is visible with label and count.
   * @param {string} cardName - Name of the metric card (e.g., "Auth Attempt")
   * @returns {Promise<{visible: boolean, labelVisible: boolean, countVisible: boolean, count: string}>}
   */
  async verifyMetricCard(cardName) {
    try {
      let card, label, count;
      
      const cardNameLower = cardName.toLowerCase();
      switch (cardNameLower) {
        case 'auth attempt':
          card = this.authAttemptCard;
          label = this.authAttemptLabel;
          count = this.authAttemptCount;
          break;
        case 'auth completed':
          card = this.authCompletedCard;
          label = this.authCompletedLabel;
          count = this.authCompletedCount;
          break;
        case 'scheduler add':
        case 'schedular add':
          card = this.schedulerAddCard;
          label = this.schedulerAddLabel;
          count = this.schedulerAddCount;
          break;
        case 'success scheduler log':
        case 'success schedular log':
          card = this.successSchedulerLogCard;
          label = this.successSchedulerLogLabel;
          count = this.successSchedulerLogCount;
          break;
        case 'failed scheduler log':
        case 'failed schedular log':
          card = this.failedSchedulerLogCard;
          label = this.failedSchedulerLogLabel;
          count = this.failedSchedulerLogCount;
          break;
        case 'delete scheduler log':
        case 'delete schedular log':
          card = this.deleteSchedulerLogCard;
          label = this.deleteSchedulerLogLabel;
          count = this.deleteSchedulerLogCount;
          break;
        default:
          throw new Error(`Unknown metric card: ${cardName}`);
      }

      let cardVisible = await card.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Fallback: If card not found, try to find it by iterating through all card-body elements
      if (!cardVisible) {
        const allCards = this.page.locator('div.card-body');
        const cardCount = await allCards.count();
        const searchTextLower = cardName.toLowerCase();
        // Create search variations (e.g., "scheduler add" -> ["scheduler add", "schedular add"])
        const searchVariations = [searchTextLower];
        if (searchTextLower.includes('scheduler')) {
          searchVariations.push(searchTextLower.replace('scheduler', 'schedular'));
        }
        
        for (let i = 0; i < cardCount; i++) {
          const cardElement = allCards.nth(i);
          const cardText = await cardElement.textContent().catch(() => '');
          const cardTextLower = cardText ? cardText.toLowerCase() : '';
          
          // Check if this card contains any of the search variations
          const matches = searchVariations.some(variation => cardTextLower.includes(variation));
          if (matches) {
            cardVisible = await cardElement.isVisible({ timeout: 2000 }).catch(() => false);
            if (cardVisible) {
              // Update card, label, and count locators to use the found card
              card = cardElement;
              // Find label - try to find strong tag that contains the card name text
              const allStrongTags = cardElement.locator('strong');
              const strongCount = await allStrongTags.count();
              for (let j = 0; j < strongCount; j++) {
                const strongTag = allStrongTags.nth(j);
                const strongText = await strongTag.textContent().catch(() => '');
                const strongTextLower = strongText ? strongText.toLowerCase() : '';
                // Check if this strong tag contains the card name (and is not just a number)
                if (strongTextLower && !/^\s*\d+\s*$/.test(strongText.trim()) && 
                    (strongTextLower.includes(searchTextLower) || 
                     (searchTextLower.includes('scheduler') && strongTextLower.includes('schedular')))) {
                  label = strongTag;
                  break;
                }
              }
              // If label not found, use first strong tag that's not numeric
              let labelFound = false;
              if (label) {
                labelFound = await label.isVisible({ timeout: 100 }).catch(() => false);
              }
              if (!labelFound) {
                for (let j = 0; j < strongCount; j++) {
                  const strongTag = allStrongTags.nth(j);
                  const strongText = await strongTag.textContent().catch(() => '');
                  if (strongText && !/^\s*\d+\s*$/.test(strongText.trim())) {
                    label = strongTag;
                    break;
                  }
                }
              }
              count = cardElement.locator('div.d-flex strong, div.d-flex.justify-content-between strong').first();
              break;
            }
          }
        }
      }
      
      const labelVisible = await label.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Try primary count locator
      let countVisible = await count.isVisible({ timeout: 2000 }).catch(() => false);
      let countText = countVisible ? await count.textContent().catch(() => '') : '';
      
      // Fallback: try to find count within the card using alternative locators
      // The count is in a strong tag within div.d-flex, and should contain only numbers
      if (!countVisible && cardVisible) {
        // Try to find strong tag within d-flex that contains a number
        const fallbackCount = card.locator('div.d-flex strong').first();
        countVisible = await fallbackCount.isVisible({ timeout: 1000 }).catch(() => false);
        if (countVisible) {
          const text = await fallbackCount.textContent().catch(() => '');
          // Verify it's a number (not the label)
          if (text && /^\s*\d+\s*$/.test(text.trim())) {
            countText = text;
          } else {
            countVisible = false;
          }
        }
      }
      
      // Another fallback: find any strong tag with numeric content (excluding label)
      if (!countVisible && cardVisible) {
        const allStrongTags = card.locator('strong');
        const strongCount = await allStrongTags.count();
        for (let i = 0; i < strongCount; i++) {
          const strongTag = allStrongTags.nth(i);
          const text = await strongTag.textContent().catch(() => '');
          // Check if it's a number (count value) and not the label
          if (text && /^\s*\d+\s*$/.test(text.trim())) {
            // Make sure it's not the label by checking parent
            const parent = strongTag.locator('..');
            const parentClass = await parent.getAttribute('class').catch(() => '');
            // Label is usually in text-center, count is in d-flex
            if (!parentClass.includes('text-center') && (parentClass.includes('d-flex') || parentClass.includes('justify-content'))) {
              countVisible = await strongTag.isVisible({ timeout: 1000 }).catch(() => false);
              if (countVisible) {
                countText = text;
                break;
              }
            }
          }
        }
      }

      return {
        visible: cardVisible,
        labelVisible: labelVisible,
        countVisible: countVisible,
        count: countText.trim()
      };
    } catch (error) {
      console.error(`Error verifying metric card "${cardName}":`, error);
      return {
        visible: false,
        labelVisible: false,
        countVisible: false,
        count: ''
      };
    }
  }

  /**
   * Verifies that a metric card has an icon displayed.
   * @param {string} cardName - Name of the metric card
   * @returns {Promise<boolean>}
   */
  async verifyMetricCardIcon(cardName) {
    try {
      let icon;
      
      const cardNameLower = cardName.toLowerCase();
      switch (cardNameLower) {
        case 'auth attempt':
          icon = this.authAttemptIcon;
          break;
        case 'auth completed':
          icon = this.authCompletedIcon;
          break;
        case 'scheduler add':
          icon = this.schedulerAddIcon;
          break;
        case 'success scheduler log':
        case 'success schedular log':
          icon = this.successSchedulerLogIcon;
          break;
        case 'failed scheduler log':
        case 'failed schedular log':
          icon = this.failedSchedulerLogIcon;
          break;
        case 'delete scheduler log':
        case 'delete schedular log':
          icon = this.deleteSchedulerLogIcon;
          break;
        default:
          throw new Error(`Unknown metric card: ${cardName}`);
      }

      const iconVisible = await icon.isVisible({ timeout: 2000 }).catch(() => false);
      return iconVisible;
    } catch (error) {
      console.error(`Error verifying icon for metric card "${cardName}":`, error);
      return false;
    }
  }

  /**
   * Verifies that the Custom Date field is visible with date range selector and calendar icon.
   * @returns {Promise<{fieldVisible: boolean, inputVisible: boolean, calendarIconVisible: boolean}>}
   */
  async verifyCustomDateField() {
    try {
      const fieldVisible = await this.customDateField.isVisible({ timeout: 5000 }).catch(() => false);
      const inputVisible = await this.customDateInput.isVisible({ timeout: 2000 }).catch(() => false);
      const calendarIconVisible = await this.customDateCalendarIcon.isVisible({ timeout: 2000 }).catch(() => false);

      return {
        fieldVisible: fieldVisible,
        inputVisible: inputVisible,
        calendarIconVisible: calendarIconVisible
      };
    } catch (error) {
      console.error('Error verifying Custom Date field:', error);
      return {
        fieldVisible: false,
        inputVisible: false,
        calendarIconVisible: false
      };
    }
  }

  /**
   * Verifies that the main section title "Schedular Log Report" is visible.
   * @returns {Promise<boolean>}
   */
  async verifySchedulerLogReportTitle() {
    try {
      const isVisible = await this.schedulerLogReportTitle.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      console.error('Error verifying Schedular Log Report title:', error);
      return false;
    }
  }

  /**
   * Verifies that the graph/chart container is visible.
   * @returns {Promise<boolean>}
   */
  async verifyChartContainer() {
    try {
      const isVisible = await this.chartContainer.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      console.error('Error verifying chart container:', error);
      return false;
    }
  }

  /**
   * Verifies that "No Data Found" message is visible inside the chart.
   * @returns {Promise<boolean>}
   */
  async verifyNoDataFoundMessage() {
    try {
      // Check if the message is visible within the chart container
      const chartVisible = await this.chartContainer.isVisible({ timeout: 2000 }).catch(() => false);
      if (chartVisible) {
        const noDataInChart = this.chartContainer.locator('*:has-text("No Data Found"), *:has-text("No data found")').first();
        const isVisible = await noDataInChart.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      
      // Fallback: check anywhere on the page
      const isVisible = await this.noDataFoundMessage.isVisible({ timeout: 2000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      console.error('Error verifying No Data Found message:', error);
      return false;
    }
  }

  /**
   * Verifies that Success and Failed Schedular Log elements are visible and clickable.
   * @returns {Promise<{successVisible: boolean, successClickable: boolean, failedVisible: boolean, failedClickable: boolean}>}
   */
  async verifyClickableElements() {
    try {
      // Try to find clickable elements - they might be in the card labels
      const successVisible = await this.successSchedularLogClickable.isVisible({ timeout: 5000 }).catch(() => false);
      const failedVisible = await this.failedSchedularLogClickable.isVisible({ timeout: 5000 }).catch(() => false);
      
      // If not found with primary locator, try using the card labels
      let successClickable = false;
      let failedClickable = false;
      
      if (successVisible) {
        successClickable = await this.successSchedularLogClickable.isEnabled().catch(() => false);
      } else {
        // Try using the card label as clickable
        const successLabel = this.successSchedulerLogLabel;
        const successLabelVisible = await successLabel.isVisible({ timeout: 2000 }).catch(() => false);
        if (successLabelVisible) {
          successClickable = await successLabel.isEnabled().catch(() => false);
        }
      }
      
      if (failedVisible) {
        failedClickable = await this.failedSchedularLogClickable.isEnabled().catch(() => false);
      } else {
        // Try using the card label as clickable
        const failedLabel = this.failedSchedulerLogLabel;
        const failedLabelVisible = await failedLabel.isVisible({ timeout: 2000 }).catch(() => false);
        if (failedLabelVisible) {
          failedClickable = await failedLabel.isEnabled().catch(() => false);
        }
      }
      
      return {
        successVisible: successVisible || await this.successSchedulerLogLabel.isVisible({ timeout: 1000 }).catch(() => false),
        successClickable: successClickable,
        failedVisible: failedVisible || await this.failedSchedulerLogLabel.isVisible({ timeout: 1000 }).catch(() => false),
        failedClickable: failedClickable
      };
    } catch (error) {
      console.error('Error verifying clickable elements:', error);
      return {
        successVisible: false,
        successClickable: false,
        failedVisible: false,
        failedClickable: false
      };
    }
  }

  /**
   * Clicks on Success Schedular Log element.
   */
  async clickSuccessSchedularLog() {
    try {
      // Try primary clickable locator first
      const isVisible = await this.successSchedularLogClickable.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        await this.successSchedularLogClickable.scrollIntoViewIfNeeded();
        await this.successSchedularLogClickable.click();
      } else {
        // Fallback: click on the label
        await this.successSchedulerLogLabel.scrollIntoViewIfNeeded();
        await this.successSchedulerLogLabel.click();
      }
      await this.page.waitForTimeout(1000); // Wait for action to complete
      console.log('  ✓ Clicked on Success Schedular Log');
    } catch (error) {
      console.error('Error clicking Success Schedular Log:', error);
      throw error;
    }
  }

  /**
   * Clicks on Failed Schedular Log element.
   */
  async clickFailedSchedularLog() {
    try {
      // Try primary clickable locator first
      const isVisible = await this.failedSchedularLogClickable.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        await this.failedSchedularLogClickable.scrollIntoViewIfNeeded();
        await this.failedSchedularLogClickable.click();
      } else {
        // Fallback: click on the label
        await this.failedSchedulerLogLabel.scrollIntoViewIfNeeded();
        await this.failedSchedulerLogLabel.click();
      }
      await this.page.waitForTimeout(1000); // Wait for action to complete
      console.log('  ✓ Clicked on Failed Schedular Log');
    } catch (error) {
      console.error('Error clicking Failed Schedular Log:', error);
      throw error;
    }
  }

  /**
   * Waits for a toast message to appear.
   * @param {number} timeout - Timeout in milliseconds (default: 5000)
   * @returns {Promise<boolean>}
   */
  async waitForToast(timeout = 5000) {
    try {
      const toastVisible = await this.toastContainer.isVisible({ timeout }).catch(() => false);
      if (toastVisible) {
        return true;
      }
      // Try alternative toast locators
      const altToast = this.page.locator('div[role="alert"], div.snackbar, div.notification').first();
      return await altToast.isVisible({ timeout: 2000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the toast message text.
   * @returns {Promise<string>}
   */
  async getToastMessage() {
    try {
      const toastCount = await this.toastMessages.count();
      if (toastCount > 0) {
        const firstToast = this.toastMessages.first();
        const text = await firstToast.textContent().catch(() => '');
        return text ? text.trim() : '';
      }
      // Try alternative locators
      const altToast = this.page.locator('div[role="alert"], div.snackbar, div.notification').first();
      const text = await altToast.textContent().catch(() => '');
      return text ? text.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies that a toast message contains specific text (e.g., "No Data Found").
   * @param {string} expectedText - Expected text in the toast message
   * @param {number} timeout - Timeout in milliseconds (default: 5000)
   * @returns {Promise<{visible: boolean, message: string, containsExpected: boolean}>}
   */
  async verifyToastMessage(expectedText, timeout = 5000) {
    try {
      const toastVisible = await this.waitForToast(timeout);
      if (!toastVisible) {
        return { visible: false, message: '', containsExpected: false };
      }
      
      const message = await this.getToastMessage();
      const containsExpected = message.toLowerCase().includes(expectedText.toLowerCase());
      
      return {
        visible: toastVisible,
        message: message,
        containsExpected: containsExpected
      };
    } catch (error) {
      console.error('Error verifying toast message:', error);
      return { visible: false, message: '', containsExpected: false };
    }
  }

  /**
   * Verifies that the scheduler log table or list is visible with at least one record.
   * @returns {Promise<{tableVisible: boolean, hasData: boolean, recordCount: number}>}
   */
  async verifySchedulerLogTable() {
    try {
      // Check for table
      const tableVisible = await this.schedulerLogTable.isVisible({ timeout: 3000 }).catch(() => false);
      let hasData = false;
      let recordCount = 0;
      
      if (tableVisible) {
        const rowCount = await this.schedulerLogTableRows.count();
        recordCount = rowCount;
        hasData = rowCount > 0;
      } else {
        // Check for list
        const listVisible = await this.schedulerLogList.isVisible({ timeout: 3000 }).catch(() => false);
        if (listVisible) {
          const itemCount = await this.schedulerLogListItems.count();
          recordCount = itemCount;
          hasData = itemCount > 0;
        } else {
          // Try to find any table-like structure
          const anyTable = this.page.locator('table, mat-table, div[class*="table"]').first();
          const anyTableVisible = await anyTable.isVisible({ timeout: 2000 }).catch(() => false);
          if (anyTableVisible) {
            const rows = anyTable.locator('tbody tr, tr[role="row"]').filter({ hasNot: this.page.locator('[role="columnheader"]') });
            const rowCount = await rows.count();
            recordCount = rowCount;
            hasData = rowCount > 0;
          }
        }
      }
      
      return {
        tableVisible: tableVisible || await this.schedulerLogList.isVisible({ timeout: 1000 }).catch(() => false),
        hasData: hasData,
        recordCount: recordCount
      };
    } catch (error) {
      console.error('Error verifying scheduler log table:', error);
      return {
        tableVisible: false,
        hasData: false,
        recordCount: 0
      };
    }
  }

  /**
   * Verifies all major elements on the Google Drive page.
   * @returns {Promise<{allElementsVisible: boolean, details: object}>}
   */
  async verifyAllElements() {
    try {
      const menuItem = await this.verifyGoogleDriveMenuItem();
      const schedulerTitle = await this.verifySchedulerLogReportTitle();
      const chartContainer = await this.verifyChartContainer();
      const customDate = await this.verifyCustomDateField();
      
      const metricCards = [
        'Auth Attempt',
        'Auth Completed',
        'Scheduler Add',
        'Success Scheduler Log',
        'Failed Scheduler Log',
        'Delete Scheduler Log'
      ];

      const cardResults = {};
      const iconResults = {};

      for (const cardName of metricCards) {
        cardResults[cardName] = await this.verifyMetricCard(cardName);
        iconResults[cardName] = await this.verifyMetricCardIcon(cardName);
      }

      const allCardsVisible = Object.values(cardResults).every(result => result.visible);
      const allIconsVisible = Object.values(iconResults).every(visible => visible);
      const allElementsVisible = menuItem.visible && 
                                  schedulerTitle && 
                                  chartContainer && 
                                  customDate.fieldVisible &&
                                  allCardsVisible &&
                                  allIconsVisible;

      return {
        allElementsVisible: allElementsVisible,
        details: {
          menuItem: menuItem,
          schedulerTitle: schedulerTitle,
          chartContainer: chartContainer,
          customDate: customDate,
          metricCards: cardResults,
          icons: iconResults
        }
      };
    } catch (error) {
      console.error('Error verifying all elements:', error);
      return {
        allElementsVisible: false,
        details: {}
      };
    }
  }
}

module.exports = { GoogleDrivePage };

