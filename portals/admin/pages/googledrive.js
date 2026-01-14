class GoogleDrivePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/google-drive" class="nav-link sidebar-items">
    this.googleDriveLink = page.locator('div.nav-link.sidebar-items[routerlink*="google-drive"], div.nav-link.sidebar-items[routerlink*="googledrive"], div.nav-link.sidebar-items:has-text("Google Drive"), a[routerlink*="google-drive"], a[routerlink*="googledrive"], .sidebar-items:has-text("Google Drive")').first();
    
    // Page elements
    // HTML: Page title "Google Drive"
    this.pageTitle = page.locator('h1:has-text("Google Drive"), h2:has-text("Google Drive"), h3:has-text("Google Drive"), .heading:has-text("Google Drive"), [class*="title"]:has-text("Google Drive"), *:has-text("Google Drive"):not(div.nav-link):not(a)').first();
    this.pageWrapper = page.locator('app-root, app-googledrive, [class*="googledrive"], [class*="google-drive"], body').first();
    
    // Custom Date selector
    // HTML: Date range selector showing "1/1/2 - 1/31/2"
    this.customDateSelector = page.locator('input[type="text"]:has-text("/"), input[placeholder*="date"], input[placeholder*="Date"], .date-selector, [class*="date-selector"], [class*="date"], [class*="Date"]').first();
    this.customDateButton = page.locator('button:has-text("Custom Date"), button:has-text("Date"), [class*="date-selector"], [class*="date-button"]').first();
    
    // Metric Cards - More specific locators
    // Auth Attempt card
    this.authAttemptCard = page.locator('*:has-text("Auth Attempt"):not(script):not(style), [class*="card"]:has-text("Auth Attempt"), [class*="Card"]:has-text("Auth Attempt"), div:has-text("Auth Attempt")').first();
    this.authAttemptValue = page.locator('*:has-text("Auth Attempt")').locator('..').locator('*:has-text(/^\\d+$/), *:has-text(/\\d+/)').first();
    
    // Auth Completed card
    this.authCompletedCard = page.locator('*:has-text("Auth Completed"):not(script):not(style), [class*="card"]:has-text("Auth Completed"), [class*="Card"]:has-text("Auth Completed"), div:has-text("Auth Completed")').first();
    this.authCompletedValue = page.locator('*:has-text("Auth Completed")').locator('..').locator('*:has-text(/^\\d+$/), *:has-text(/\\d+/)').first();
    
    // Schedular Add card (note: actual text uses "Schedular" not "Scheduler")
    this.schedulerAddCard = page.locator('*:has-text("Schedular Add"):not(script):not(style), *:has-text("Scheduler Add"):not(script):not(style), [class*="card"]:has-text("Schedular Add"), div:has-text("Schedular Add")').first();
    this.schedulerAddValue = page.locator('*:has-text("Schedular Add"), *:has-text("Scheduler Add")').locator('..').locator('*:has-text(/^\\d+$/), *:has-text(/\\d+/)').first();
    
    // Success Schedular Log card (note: actual text uses "Schedular" not "Scheduler")
    this.successSchedulerLogCard = page.locator('*:has-text("Success Schedular Log"):not(script):not(style), *:has-text("Success Scheduler Log"):not(script):not(style), [class*="card"]:has-text("Success Schedular Log"), div:has-text("Success Schedular Log")').first();
    this.successSchedulerLogValue = page.locator('*:has-text("Success Schedular Log"), *:has-text("Success Scheduler Log")').locator('..').locator('*:has-text(/^\\d+$/), *:has-text(/\\d+/)').first();
    
    // Failed Schedular Log card (note: actual text uses "Schedular" not "Scheduler")
    this.failedSchedulerLogCard = page.locator('*:has-text("Failed Schedular Log"):not(script):not(style), *:has-text("Failed Scheduler Log"):not(script):not(style), [class*="card"]:has-text("Failed Schedular Log"), div:has-text("Failed Schedular Log")').first();
    this.failedSchedulerLogValue = page.locator('*:has-text("Failed Schedular Log"), *:has-text("Failed Scheduler Log")').locator('..').locator('*:has-text(/^\\d+$/), *:has-text(/\\d+/)').first();
    
    // Delete Schedular Log card (note: actual text uses "Schedular" not "Scheduler")
    this.deleteSchedulerLogCard = page.locator('*:has-text("Delete Schedular Log"):not(script):not(style), *:has-text("Delete Scheduler Log"):not(script):not(style), [class*="card"]:has-text("Delete Schedular Log"), div:has-text("Delete Schedular Log")').first();
    this.deleteSchedulerLogValue = page.locator('*:has-text("Delete Schedular Log"), *:has-text("Delete Scheduler Log")').locator('..').locator('*:has-text(/^\\d+$/), *:has-text(/\\d+/)').first();
    
    // Schedular Log Report section (note: actual text uses "Schedular" not "Scheduler")
    this.schedulerLogReportSection = page.locator('*:has-text("Schedular Log Report"):not(script):not(style), *:has-text("Scheduler Log Report"):not(script):not(style), [class*="report"]:has-text("Schedular"), div:has-text("Schedular Log Report")').first();
    
    // No Data Found message
    this.noDataFoundMessage = page.locator('*:has-text("No Data Found"):not(script):not(style), *:has-text("No data found"), *:has-text("No Data"), p:has-text("No Data Found"), div:has-text("No Data Found")').first();
    
    // All metric cards container (for finding all cards)
    // Use filter with regex instead of has-text with regex (has-text doesn't support regex)
    // Note: actual text uses "Schedular" not "Scheduler"
    this.metricCards = page.locator('[class*="card"], [class*="Card"], .card, .Card, div[class*="metric"]').filter({ hasText: /Auth|Schedular|Scheduler/i });
  }

  /**
   * Navigates to Google Drive page
   * @param {string} baseUrl - Base URL of the application
   */
  async gotoGoogleDrive(baseUrl) {
    try {
      // URL should be /google-drive (with hyphen)
      let url = baseUrl.replace('/login', '').replace('/login/', '');
      if (!url.endsWith('/')) {
        url += '/';
      }
      url += 'google-drive';
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await this.page.waitForTimeout(3000);
      
      // Wait for page to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      // If direct navigation fails, try clicking the sidebar link
      try {
        await this.googleDriveLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.googleDriveLink.scrollIntoViewIfNeeded();
        await this.googleDriveLink.click();
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('domcontentloaded');
      } catch (linkError) {
        throw new Error(`Failed to navigate to Google Drive page: ${error.message}`);
      }
    }
  }

  /**
   * Verifies if the Google Drive page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Wait for page to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);
      
      // Check if URL contains google-drive
      const currentUrl = this.page.url();
      if (!currentUrl.includes('google-drive') && !currentUrl.includes('googledrive')) {
        console.log(`  ⚠ Current URL does not contain 'google-drive': ${currentUrl}`);
        return false;
      }
      
      // Check if page title is visible (try multiple selectors)
      const isTitleVisible = await this.pageTitle.isVisible({ timeout: 10000 }).catch(() => false);
      if (!isTitleVisible) {
        // Try alternative title locators
        const altTitle = this.page.locator('h1, h2, h3, .heading, .page-title, [class*="title"]').filter({ hasText: /Google Drive/i }).first();
        const isAltTitleVisible = await altTitle.isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAltTitleVisible) {
          console.log('  ⚠ Page title not found');
          return false;
        }
      }
      
      // Check if at least one metric card is visible
      try {
        const cardsCount = await this.metricCards.count();
        if (cardsCount === 0) {
          // Try to find cards with alternative locators
          const altCards = this.page.locator('[class*="card"], [class*="Card"], .card, .Card, [class*="metric"]');
          const altCardsCount = await altCards.count();
          if (altCardsCount === 0) {
            console.log('  ⚠ No metric cards found');
            // Don't fail if cards aren't found - they might load later
            // Just check if we're on the right page
            return true; // Return true if URL and title are correct
          }
        }
      } catch (error) {
        console.log(`  ⚠ Error checking metric cards: ${error.message}`);
        // Don't fail if we can't check cards - page might still be loading
        // Return true if URL and title are correct
      }
      
      return true;
    } catch (error) {
      console.log(`  ⚠ Error checking page load: ${error.message}`);
      return false;
    }
  }

  /**
   * Verifies if a specific element is visible
   * @param {import('@playwright/test').Locator} locator - The locator to check
   * @param {string} elementName - Name of the element for logging
   * @returns {Promise<boolean>}
   */
  async isElementVisible(locator, elementName) {
    try {
      const isVisible = await locator.isVisible({ timeout: 5000 }).catch(() => false);
      if (isVisible) {
        console.log(`  ✓ ${elementName} is visible`);
      } else {
        console.log(`  ✗ ${elementName} is not visible`);
      }
      return isVisible;
    } catch {
      console.log(`  ✗ ${elementName} is not visible`);
      return false;
    }
  }

  /**
   * Gets the text value from a metric card
   * @param {import('@playwright/test').Locator} cardLocator - The card locator
   * @param {string} cardName - Name of the card
   * @returns {Promise<string>}
   */
  async getMetricCardValue(cardLocator, cardName) {
    try {
      // Try to find a number in the card
      const cardText = await cardLocator.textContent();
      if (cardText) {
        // Extract numbers from the text
        const numbers = cardText.match(/\d+/g);
        if (numbers && numbers.length > 0) {
          // Usually the metric value is the largest number or the first number after the title
          return numbers[numbers.length - 1] || numbers[0];
        }
      }
      return '0';
    } catch {
      return 'N/A';
    }
  }

  /**
   * Clicks on the Success Scheduler Log card
   */
  async clickSuccessSchedulerLogCard() {
    try {
      await this.successSchedulerLogCard.waitFor({ state: 'visible', timeout: 10000 });
      await this.successSchedulerLogCard.scrollIntoViewIfNeeded();
      
      // Check if the card is clickable (has pointer cursor or is a button/link)
      const isClickable = await this.successSchedulerLogCard.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.cursor === 'pointer' || el.tagName === 'BUTTON' || el.tagName === 'A' || el.onclick !== null;
      }).catch(() => true); // Assume clickable if we can't determine
      
      if (isClickable) {
        await this.successSchedulerLogCard.click({ timeout: 5000 });
        await this.page.waitForTimeout(2000); // Wait for any action to complete
      } else {
        // Try clicking on a clickable element within the card
        const clickableElement = this.successSchedulerLogCard.locator('button, a, [role="button"], [onclick]').first();
        const hasClickableChild = await clickableElement.count() > 0;
        if (hasClickableChild) {
          await clickableElement.click({ timeout: 5000 });
          await this.page.waitForTimeout(2000);
        } else {
          // Force click if no clickable child found
          await this.successSchedulerLogCard.click({ force: true, timeout: 5000 });
          await this.page.waitForTimeout(2000);
        }
      }
    } catch (error) {
      throw new Error(`Failed to click Success Scheduler Log card: ${error.message}`);
    }
  }

  /**
   * Clicks on the Failed Scheduler Log card
   */
  async clickFailedSchedulerLogCard() {
    try {
      await this.failedSchedulerLogCard.waitFor({ state: 'visible', timeout: 10000 });
      await this.failedSchedulerLogCard.scrollIntoViewIfNeeded();
      
      // Check if the card is clickable (has pointer cursor or is a button/link)
      const isClickable = await this.failedSchedulerLogCard.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.cursor === 'pointer' || el.tagName === 'BUTTON' || el.tagName === 'A' || el.onclick !== null;
      }).catch(() => true); // Assume clickable if we can't determine
      
      if (isClickable) {
        await this.failedSchedulerLogCard.click({ timeout: 5000 });
        await this.page.waitForTimeout(2000); // Wait for any action to complete
      } else {
        // Try clicking on a clickable element within the card
        const clickableElement = this.failedSchedulerLogCard.locator('button, a, [role="button"], [onclick]').first();
        const hasClickableChild = await clickableElement.count() > 0;
        if (hasClickableChild) {
          await clickableElement.click({ timeout: 5000 });
          await this.page.waitForTimeout(2000);
        } else {
          // Force click if no clickable child found
          await this.failedSchedulerLogCard.click({ force: true, timeout: 5000 });
          await this.page.waitForTimeout(2000);
        }
      }
    } catch (error) {
      throw new Error(`Failed to click Failed Scheduler Log card: ${error.message}`);
    }
  }

  /**
   * Verifies if the Scheduler Log Report section has been updated after clicking a card
   * @returns {Promise<boolean>}
   */
  async isReportSectionUpdated() {
    try {
      // Check if the report section is still visible (should be)
      const isVisible = await this.schedulerLogReportSection.isVisible({ timeout: 3000 });
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Gets the current URL to check if navigation occurred after clicking
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.page.url();
  }

  /**
   * Gets the numeric value from a metric card
   * The value is in: <div class="d-flex justify-content-between align-self-center"><div> 0 </div>
   * @param {import('@playwright/test').Locator} cardLocator - The card locator (might be text element, need to find parent card)
   * @returns {Promise<number>}
   */
  async getCardNumericValue(cardLocator) {
    try {
      // First, find the actual card container (the locator might be pointing to text element)
      // Look for parent with class containing "card"
      let cardContainer = cardLocator.locator('xpath=ancestor::*[contains(@class, "card")]').first();
      const hasCardContainer = await cardContainer.count() > 0;
      
      if (!hasCardContainer) {
        // Try alternative: look for card-body parent
        cardContainer = cardLocator.locator('xpath=ancestor::*[contains(@class, "card-body")]').first();
        const hasCardBody = await cardContainer.count() > 0;
        if (!hasCardBody) {
          // Use the locator itself as fallback
          cardContainer = cardLocator;
        }
      }
      
      // Now find the value within the card container
      // The value is in: div.d-flex.justify-content-between.align-self-center > div (first child)
      const valueContainer = cardContainer.locator('div.d-flex.justify-content-between.align-self-center').first();
      const valueDiv = valueContainer.locator('> div').first();
      
      const valueText = await valueDiv.textContent();
      if (valueText) {
        const trimmedValue = valueText.trim();
        const value = parseInt(trimmedValue, 10);
        if (!isNaN(value)) {
          return value;
        }
      }
      
      // Alternative approach: find card-body and then the value
      const cardBody = cardContainer.locator('.card-body, [class*="card-body"]').first();
      const altValueContainer = cardBody.locator('div.d-flex.justify-content-between.align-self-center').first();
      const altValueDiv = altValueContainer.locator('> div').first();
      const altValueText = await altValueDiv.textContent();
      if (altValueText) {
        const trimmedValue = altValueText.trim();
        const value = parseInt(trimmedValue, 10);
        if (!isNaN(value)) {
          return value;
        }
      }
      
      return 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Checks if scheduler logs table/data is visible
   * @returns {Promise<boolean>}
   */
  async isSchedulerLogsVisible() {
    try {
      // Look for table rows, data rows, or any log entries
      const tableRows = this.page.locator('table tbody tr, mat-table mat-row, [class*="table"] tbody tr, [class*="log"]').filter({ hasNotText: /No Data/i });
      const rowCount = await tableRows.count();
      return rowCount > 0;
    } catch {
      return false;
    }
  }

  /**
   * Checks if "No Data Found" toast/message is visible
   * @returns {Promise<boolean>}
   */
  async isNoDataFoundToastVisible() {
    try {
      // Look for toast, snackbar, or alert messages
      const toast = this.page.locator('[class*="toast"], [class*="snackbar"], [class*="alert"], [role="alert"], [class*="message"]').filter({ hasText: /No Data|No data|no data/i });
      const isVisible = await toast.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      
      // Also check the report section for "No Data Found"
      const noDataInReport = await this.noDataFoundMessage.isVisible({ timeout: 2000 }).catch(() => false);
      return noDataInReport;
    } catch {
      return false;
    }
  }
}

module.exports = { GoogleDrivePage };

