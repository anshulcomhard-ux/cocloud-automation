class ConnectivityTestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.connectivityTestMenu = page.locator('a:has-text("Connectivity Test"), button:has-text("Connectivity Test"), a[href*="connectivity-test"], a[href*="connectivitytest"]').first();
    
    // Page wrapper
    this.connectivityTestWrapper = page.locator('.connectivity-test-wrapper, .connectivity-test, [class*="connectivity-test"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("Connectivity Test"), .header-left:has-text("Connectivity Test"), h1:has-text("Connectivity Test"), h2:has-text("Connectivity Test")').first();
    this.pageHeading = page.locator('h1:has-text("Connectivity Test"), h2:has-text("Connectivity Test"), h6.page-title-modern:has-text("Connectivity Test"), .page-heading:has-text("Connectivity Test")').first();
    
    // Sub-heading
    this.subHeading = page.locator('p:has-text("Test your connection performance"), span:has-text("Test your connection performance"), .sub-heading:has-text("Test your connection performance"), [class*="sub-heading"]:has-text("Test your connection performance")').first();
    
    // Test cards
    this.speedTestCard = page.locator('.test-card:has-text("Speed Test"), .speed-test-card, .card:has-text("Speed Test"), [class*="speed-test"]').first();
    this.serverPingCard = page.locator('.test-card:has-text("Server Ping"), .ping-test-card, .card:has-text("Server Ping"), [class*="ping-test"]').first();
    this.pingDropTestCard = page.locator('.test-card:has-text("Ping Drop Test"), .ping-drop-card, .card:has-text("Ping Drop Test"), [class*="ping-drop"]').first();
    
    // Buttons
    // Speed Test button - inside .speed-test-card > .test-card-body > button.btn-test-primary
    this.speedTestStartButton = page.locator('.speed-test-card .test-card-body button.btn-test-primary:has-text("Start Test"), .speed-test-card button.btn-test-primary, .speed-test-card button:has-text("Start Test")').first();
    
    // Server Ping button - inside .ping-test-card > .test-card-body > button.btn-test-primary
    this.serverPingStartButton = page.locator('.ping-test-card .test-card-body button.btn-test-primary:has-text("Start Test"), .ping-test-card button.btn-test-primary, .ping-test-card button:has-text("Start Test")').first();
    
    // Ping Drop Test button - inside .ping-drop-card > .test-card-body > .test-actions > button.btn-test-primary
    this.pingDropStartButton = page.locator('.ping-drop-card .test-card-body .test-actions button.btn-test-primary:has-text("Start"), .ping-drop-card .test-actions button.btn-test-primary, .ping-drop-card button.btn-test-primary:has-text("Start"), .ping-drop-card button:has-text("Start")').first();
    
    // Loaders/Progress indicators
    this.loader = page.locator('.loader, .spinner, [class*="loader"], [class*="spinner"], .progress-indicator').first();
    this.progressBar = page.locator('.progress-bar, .progress, [class*="progress"]').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
  }

  /**
   * Navigates to Connectivity Test page
   */
  async gotoConnectivityTest() {
    try {
      await this.connectivityTestMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.connectivityTestMenu.click();
    } catch (error) {
      // If menu item not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/connectivity-test`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load
    await Promise.race([
      this.connectivityTestWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Connectivity Test page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageHeading.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.connectivityTestWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page heading "Connectivity Test" is visible
   * @returns {Promise<boolean>}
   */
  async isPageHeadingVisible() {
    try {
      return await this.pageHeading.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the page heading text
   * @returns {Promise<string>}
   */
  async getPageHeading() {
    try {
      const headingVisible = await this.pageHeading.isVisible({ timeout: 5000 });
      if (headingVisible) {
        const text = await this.pageHeading.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies sub-heading "Test your connection performance" is displayed
   * @returns {Promise<boolean>}
   */
  async isSubHeadingVisible() {
    try {
      return await this.subHeading.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the sub-heading text
   * @returns {Promise<string>}
   */
  async getSubHeading() {
    try {
      const headingVisible = await this.subHeading.isVisible({ timeout: 5000 });
      if (headingVisible) {
        const text = await this.subHeading.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies all three test cards are visible
   * @returns {Promise<{allVisible: boolean, speedTestVisible: boolean, serverPingVisible: boolean, pingDropTestVisible: boolean}>}
   */
  async verifyTestCardsVisible() {
    try {
      const speedTestVisible = await this.speedTestCard.isVisible({ timeout: 3000 }).catch(() => false);
      const serverPingVisible = await this.serverPingCard.isVisible({ timeout: 3000 }).catch(() => false);
      const pingDropTestVisible = await this.pingDropTestCard.isVisible({ timeout: 3000 }).catch(() => false);
      
      const allVisible = speedTestVisible && serverPingVisible && pingDropTestVisible;
      
      return {
        allVisible: allVisible,
        speedTestVisible: speedTestVisible,
        serverPingVisible: serverPingVisible,
        pingDropTestVisible: pingDropTestVisible
      };
    } catch (error) {
      return {
        allVisible: false,
        speedTestVisible: false,
        serverPingVisible: false,
        pingDropTestVisible: false,
        error: error.message
      };
    }
  }

  /**
   * Verifies "Start Test" button is visible under Speed Test
   * @returns {Promise<boolean>}
   */
  async isSpeedTestStartButtonVisible() {
    try {
      return await this.speedTestStartButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies "Start Test" button is visible under Server Ping
   * @returns {Promise<boolean>}
   */
  async isServerPingStartButtonVisible() {
    try {
      return await this.serverPingStartButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies "Start" button is visible under Ping Drop Test
   * @returns {Promise<boolean>}
   */
  async isPingDropStartButtonVisible() {
    try {
      return await this.pingDropStartButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if a button is enabled and clickable
   * @param {import('@playwright/test').Locator} button
   * @returns {Promise<boolean>}
   */
  async isButtonClickable(button) {
    try {
      const isVisible = await button.isVisible({ timeout: 2000 });
      const isEnabled = await button.isEnabled().catch(() => false);
      return isVisible && isEnabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies all buttons are enabled and clickable
   * @returns {Promise<{allClickable: boolean, speedTestClickable: boolean, serverPingClickable: boolean, pingDropClickable: boolean}>}
   */
  async verifyButtonsClickable() {
    try {
      const speedTestClickable = await this.isButtonClickable(this.speedTestStartButton);
      const serverPingClickable = await this.isButtonClickable(this.serverPingStartButton);
      const pingDropClickable = await this.isButtonClickable(this.pingDropStartButton);
      
      const allClickable = speedTestClickable && serverPingClickable && pingDropClickable;
      
      return {
        allClickable: allClickable,
        speedTestClickable: speedTestClickable,
        serverPingClickable: serverPingClickable,
        pingDropClickable: pingDropClickable
      };
    } catch (error) {
      return {
        allClickable: false,
        speedTestClickable: false,
        serverPingClickable: false,
        pingDropClickable: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks on "Start Test" button under Speed Test
   * @returns {Promise<{clicked: boolean, testInitiated: boolean}>}
   */
  async clickSpeedTestStartButton() {
    try {
      await this.speedTestStartButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.speedTestStartButton.scrollIntoViewIfNeeded();
      await this.speedTestStartButton.click();
      await this.page.waitForTimeout(1000);
      
      // Check if test was initiated (loader/progress/API call)
      const testInitiated = await this.verifyTestInitiated();
      
      return {
        clicked: true,
        testInitiated: testInitiated
      };
    } catch (error) {
      return {
        clicked: false,
        testInitiated: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks on "Start Test" button under Server Ping
   * @returns {Promise<{clicked: boolean, testInitiated: boolean}>}
   */
  async clickServerPingStartButton() {
    try {
      await this.serverPingStartButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.serverPingStartButton.scrollIntoViewIfNeeded();
      await this.serverPingStartButton.click();
      await this.page.waitForTimeout(1000);
      
      // Check if ping test was initiated
      const testInitiated = await this.verifyTestInitiated();
      
      return {
        clicked: true,
        testInitiated: testInitiated
      };
    } catch (error) {
      return {
        clicked: false,
        testInitiated: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks on "Start" button under Ping Drop Test
   * @returns {Promise<{clicked: boolean, testInitiated: boolean}>}
   */
  async clickPingDropStartButton() {
    try {
      await this.pingDropStartButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.pingDropStartButton.scrollIntoViewIfNeeded();
      await this.pingDropStartButton.click();
      await this.page.waitForTimeout(1000);
      
      // Check if ping drop test was initiated
      const testInitiated = await this.verifyTestInitiated();
      
      return {
        clicked: true,
        testInitiated: testInitiated
      };
    } catch (error) {
      return {
        clicked: false,
        testInitiated: false,
        error: error.message
      };
    }
  }

  /**
   * Verifies test initiation (loader / progress / API call triggered)
   * @returns {Promise<boolean>}
   */
  async verifyTestInitiated() {
    try {
      // Check for loader
      const loaderVisible = await this.loader.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Check for progress bar
      const progressVisible = await this.progressBar.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Check for network activity (API calls)
      let apiCallDetected = false;
      try {
        // Wait a bit for network requests
        await this.page.waitForTimeout(500);
        // Check if there are any pending network requests
        const response = await this.page.waitForResponse(
          response => response.status() < 400 && (response.url().includes('test') || response.url().includes('ping') || response.url().includes('speed')),
          { timeout: 3000 }
        ).catch(() => null);
        apiCallDetected = response !== null;
      } catch (e) {
        // Network check failed, continue with other checks
      }
      
      // Test is initiated if any of these indicators are present
      return loaderVisible || progressVisible || apiCallDetected;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if there are any error messages on the page
   * @returns {Promise<boolean>}
   */
  async hasErrorMessages() {
    try {
      const errorCount = await this.errorMessages.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if error toast is visible
   * @returns {Promise<boolean>}
   */
  async hasErrorToast() {
    try {
      return await this.errorToast.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page load without errors
   * @returns {Promise<{pageLoaded: boolean, hasErrors: boolean, hasErrorToast: boolean}>}
   */
  async verifyPageLoad() {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      
      const pageLoaded = await this.isVisible();
      const hasErrors = await this.hasErrorMessages();
      const hasErrorToast = await this.hasErrorToast();
      
      return {
        pageLoaded: pageLoaded,
        hasErrors: hasErrors,
        hasErrorToast: hasErrorToast
      };
    } catch (error) {
      return {
        pageLoaded: false,
        hasErrors: true,
        hasErrorToast: false,
        error: error.message
      };
    }
  }
}

module.exports = { ConnectivityTestPage };

