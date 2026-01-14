class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.dashboardHeader = page.locator('//*[@id="mySidebar"]/ul/li[1]');
    this.welcomeMessage = page.locator('/html/body/app-root/div/app-layout/div/div[2]/div[1]/div/div/div[1]/p[1]');
    
    // Upgrade Now button
    this.upgradeNowButton = page.locator('span.renew-btn-modern:has-text("Upgrade Now"), button:has-text("Upgrade Now")').first();
    
    // Pricing page title
    this.pricingPageTitle = page.locator('h2.page-title-modern:has-text("Pricing"), div.page-header-modern h2.page-title-modern:has-text("Pricing")').first();
    
    // Instance User Update locators
    this.editInstanceUserButton = page.locator('i.bi-pencil-square.text-success[mattooltipposition], i.bi-pencil-square.text-success[ng-reflect-message="Update"]').first();
    this.updateInstanceUserModal = page.locator('.modal-content:has-text("Update Instance User")').first();
    this.modalTitle = page.locator('.modal-title-modern:has-text("Update Instance User")').first();
    this.displayNameField = page.locator('input[ng-reflect-name="userDisplayName"], input[placeholder="Enter display name"]').first();
    this.emailField = page.locator('input[ng-reflect-name="email"][type="email"], input[type="email"][placeholder="Enter email"]').first();
    this.submitButton = page.locator('.modal-content button[type="submit"]:has-text("Submit"), button.primary-btn:has-text("Submit")').first();
    this.cancelButton = page.locator('.modal-content button[type="button"]:has-text("Cancel"), button.secondary-btn:has-text("Cancel")').first();
    
    // Table locators for instance user - more flexible selectors
    this.displayNameTableCell = page.locator('td.mat-column-Display, td[class*="mat-column-Display"]').first();
    this.displayNameTableCellSpan = page.locator('td.mat-column-Display span, td[class*="mat-column-Display"] span').first();
    this.emailTableCell = page.locator('td.mat-column-Email-Id, td[class*="mat-column-Email-Id"]').first();
    this.emailTableCellSpan = page.locator('td.mat-column-Email-Id span, td[class*="mat-column-Email-Id"] span').first();
    
    // Force Logoff locators
    this.forceLogoffButton = page.locator('i.bi-power.text-danger[mattooltipposition], i.bi-power.text-danger[ng-reflect-message="Force Logoff"]').first();
    this.toastContainer = page.locator('#toast-container, div.toast-container, div[aria-live="polite"]').first();
    this.toastMessage = page.locator('#toast-container .toast-message, div.toast-container .toast-message, div[role="alert"].toast-message').first();
    
    // Remote Login and HTML Login locators
    this.remoteLoginButton = page.locator('button:has-text("Remote Login"), a:has-text("Remote Login"), span:has-text("Remote Login"), [href*="remoteapp2.html"]').first();
    this.htmlLoginButton = page.locator('button:has-text("HTML Login"), a:has-text("HTML Login"), span:has-text("HTML Login"), [href*="html5.html"]').first();
    
    // Raise Service Request locators
    this.raiseServiceRequestButton = page.locator('button.raise-service:has-text("Raise Service Request"), button.raise-service, button:has-text("Raise Service Request")').first();
    
    // Account Details card locators
    this.accountDetailsCard = page.locator('.card.modern-card:has-text("Account Details")').first();
    // All fields are in a single .row div, so we need to find the label's parent div, then the next sibling col-md-8
    // Structure: .row > .col-md-4 (label) + .col-md-8 (details) pairs
    const cardBase = '.card.modern-card:has-text("Account Details")';
    // Strategy: Find the label, go up to its parent div.col-md-4, then find the next sibling div.col-md-8
    this.accountDetailsName = page.locator(`${cardBase} p.text-primary:has-text("Name:")`).locator('..').locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]//p[contains(@class, "details")]').first();
    this.accountDetailsEmail = page.locator(`${cardBase} p.text-primary:has-text("Email ID:")`).locator('..').locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]//p[contains(@class, "details")]').first();
    this.accountDetailsCurrentPlan = page.locator(`${cardBase} p.text-primary:has-text("Current Plan:")`).locator('..').locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]//p[contains(@class, "details")]').first();
    this.accountDetailsBillingStatus = page.locator(`${cardBase} p.text-primary:has-text("Billing Status:")`).locator('..').locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]//p[contains(@class, "details")]').first();
    this.viewMoreLink = page.locator('.card.modern-card:has-text("Account Details") a[href="/account-details"]:has-text("View More"), a[ng-reflect-router-link="account-details"]:has-text("View More")').first();
    
    // Header plan dropdown locator
    this.headerPlanDropdown = page.locator('.dropdown-toggle.text-primary[id="Dropdown"], a.dropdown-toggle.text-primary').first();
  }

  /**
   * Checks if the dashboard is visible.
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    return this.dashboardHeader.isVisible();
  }

  /**
   * Returns the welcome message text from the dashboard.
   * @returns {Promise<string>}
   */
  async getWelcomeMessage() {
    return this.welcomeMessage.textContent();
  }

  /**
   * Navigates to the dashboard page.
   * @param {string} baseUrl - The base URL of the customer portal
   */
  async goto(baseUrl) {
    await this.page.goto(baseUrl);
  }

  /**
   * Navigates to the dashboard (if not already there).
   */
  async navigateToDashboard() {
    const currentUrl = await this.page.url();
    if (!currentUrl.includes('/dashboard')) {
      await this.page.goto('/dashboard');
    }
  }

  /**
   * Clicks the "Upgrade Now" button.
   */
  async clickUpgradeNow() {
    await this.upgradeNowButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.upgradeNowButton.click();
  }

  /**
   * Checks if the Pricing page is visible.
   * @returns {Promise<boolean>}
   */
  async isPricingPageVisible() {
    try {
      await this.pricingPageTitle.waitFor({ state: 'visible', timeout: 10000 });
      return await this.pricingPageTitle.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the Pricing page title text.
   * @returns {Promise<string>}
   */
  async getPricingPageTitle() {
    await this.pricingPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    return await this.pricingPageTitle.textContent();
  }

  /**
   * Gets the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Clicks the edit button for instance user.
   */
  async clickEditInstanceUser() {
    await this.editInstanceUserButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editInstanceUserButton.click();
  }

  /**
   * Checks if the Update Instance User modal is visible.
   * @returns {Promise<boolean>}
   */
  async isUpdateInstanceUserModalVisible() {
    try {
      await this.updateInstanceUserModal.waitFor({ state: 'visible', timeout: 10000 });
      return await this.updateInstanceUserModal.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the prefilled Display Name value from the modal.
   * @returns {Promise<string>}
   */
  async getPrefilledDisplayName() {
    await this.displayNameField.waitFor({ state: 'visible', timeout: 10000 });
    return await this.displayNameField.inputValue();
  }

  /**
   * Gets the prefilled Email value from the modal.
   * @returns {Promise<string>}
   */
  async getPrefilledEmail() {
    await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
    return await this.emailField.inputValue();
  }

  /**
   * Gets all prefilled values from the modal.
   * @returns {Promise<{displayName: string, email: string}>}
   */
  async getPrefilledValues() {
    const displayName = await this.getPrefilledDisplayName();
    const email = await this.getPrefilledEmail();
    return { displayName, email };
  }

  /**
   * Clears the Display Name field.
   */
  async clearDisplayName() {
    await this.displayNameField.waitFor({ state: 'visible', timeout: 10000 });
    await this.displayNameField.clear();
  }

  /**
   * Clears the Email field.
   */
  async clearEmail() {
    await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailField.clear();
  }

  /**
   * Clears all fields in the modal.
   */
  async clearAllFields() {
    await this.clearDisplayName();
    await this.clearEmail();
  }

  /**
   * Fills the Display Name field.
   * @param {string} displayName - The display name to enter
   */
  async fillDisplayName(displayName) {
    await this.displayNameField.waitFor({ state: 'visible', timeout: 10000 });
    await this.displayNameField.fill(displayName);
  }

  /**
   * Fills the Email field.
   * @param {string} email - The email to enter
   */
  async fillEmail(email) {
    await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailField.fill(email);
  }

  /**
   * Fills all fields in the modal.
   * @param {string} displayName - The display name to enter
   * @param {string} email - The email to enter
   */
  async fillAllFields(displayName, email) {
    await this.fillDisplayName(displayName);
    await this.fillEmail(email);
  }

  /**
   * Clicks the Submit button in the modal.
   */
  async clickSubmit() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitButton.click();
  }

  /**
   * Clicks the Cancel button in the modal.
   */
  async clickCancel() {
    await this.cancelButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.cancelButton.click();
  }

  /**
   * Gets the Display Name value from the table.
   * @returns {Promise<string>}
   */
  async getDisplayNameFromTable() {
    try {
      // Try to find span first, if not found, use the td directly
      const spanVisible = await this.displayNameTableCellSpan.isVisible({ timeout: 3000 }).catch(() => false);
      if (spanVisible) {
        await this.displayNameTableCellSpan.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.displayNameTableCellSpan.textContent();
        return text?.trim() || '';
      } else {
        await this.displayNameTableCell.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.displayNameTableCell.textContent();
        return text?.trim() || '';
      }
    } catch (error) {
      // Fallback: try to find any element with the text
      const allCells = this.page.locator('td[class*="Display"], td.mat-column-Display');
      const count = await allCells.count();
      if (count > 0) {
        const text = await allCells.first().textContent();
        return text?.trim() || '';
      }
      throw error;
    }
  }

  /**
   * Gets the Email value from the table.
   * @returns {Promise<string>}
   */
  async getEmailFromTable() {
    try {
      // Try to find span first, if not found, use the td directly
      const spanVisible = await this.emailTableCellSpan.isVisible({ timeout: 3000 }).catch(() => false);
      if (spanVisible) {
        await this.emailTableCellSpan.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.emailTableCellSpan.textContent();
        return text?.trim() || '';
      } else {
        await this.emailTableCell.waitFor({ state: 'visible', timeout: 10000 });
        const text = await this.emailTableCell.textContent();
        return text?.trim() || '';
      }
    } catch (error) {
      // Fallback: try to find any element with the text
      const allCells = this.page.locator('td[class*="Email-Id"], td.mat-column-Email-Id');
      const count = await allCells.count();
      if (count > 0) {
        const text = await allCells.first().textContent();
        return text?.trim() || '';
      }
      throw error;
    }
  }

  /**
   * Gets all instance user values from the table.
   * @returns {Promise<{displayName: string, email: string}>}
   */
  async getInstanceUserValuesFromTable() {
    const displayName = await this.getDisplayNameFromTable();
    const email = await this.getEmailFromTable();
    return { displayName, email };
  }

  /**
   * Clicks the Force Logoff button.
   */
  async clickForceLogoff() {
    await this.forceLogoffButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.forceLogoffButton.click();
  }

  /**
   * Waits for toast message to appear.
   * @param {number} timeout - Timeout in milliseconds (default: 10000)
   * @returns {Promise<boolean>}
   */
  async waitForToast(timeout = 10000) {
    try {
      // Wait for toast container to be visible
      await this.toastContainer.waitFor({ state: 'visible', timeout }).catch(() => {});
      
      // Wait for toast message to appear
      await this.toastMessage.waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      // Try alternative locators
      const altToast = this.page.locator('.toast-message, div[role="alert"], .toast').first();
      try {
        await altToast.waitFor({ state: 'visible', timeout });
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  /**
   * Gets the toast message text.
   * @returns {Promise<string>}
   */
  async getToastMessage() {
    try {
      await this.waitForToast(10000);
      
      // Try primary locator
      const isVisible = await this.toastMessage.isVisible().catch(() => false);
      if (isVisible) {
        const text = await this.toastMessage.textContent();
        if (text && text.trim()) return text.trim();
        
        // Try aria-label
        const ariaLabel = await this.toastMessage.getAttribute('aria-label');
        if (ariaLabel) return ariaLabel.trim();
      }
      
      // Try alternative locators
      const altToast = this.page.locator('.toast-message, div[role="alert"], .toast').first();
      const altVisible = await altToast.isVisible().catch(() => false);
      if (altVisible) {
        const text = await altToast.textContent();
        if (text && text.trim()) return text.trim();
        
        const ariaLabel = await altToast.getAttribute('aria-label');
        if (ariaLabel) return ariaLabel.trim();
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if toast message is visible.
   * @returns {Promise<boolean>}
   */
  async isToastVisible() {
    try {
      const toastVisible = await this.toastMessage.isVisible({ timeout: 5000 }).catch(() => false);
      if (toastVisible) return true;
      
      const altToast = this.page.locator('.toast-message, div[role="alert"], .toast').first();
      return await altToast.isVisible({ timeout: 5000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Remote Login button and waits for new page.
   * @param {string} expectedUrl - Expected URL pattern to match
   * @returns {Promise<import('@playwright/test').Page>} The new page
   */
  async clickRemoteLoginAndWaitForNewPage(expectedUrl) {
    // Wait for button to be visible
    await this.remoteLoginButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for page event before clicking
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.remoteLoginButton.click()
    ]);
    
    // Wait for navigation
    await newPage.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await newPage.waitForTimeout(2000); // Additional wait for page to fully load
    
    // Verify URL - check for base URL pattern (remoteapp2.html)
    const actualUrl = newPage.url();
    const baseUrlPattern = expectedUrl ? expectedUrl.split('?')[0].split('/').pop() : 'remoteapp2.html';
    if (expectedUrl && !actualUrl.includes(baseUrlPattern)) {
      throw new Error(`Expected URL to contain "${baseUrlPattern}", but got "${actualUrl}"`);
    }
    
    return newPage;
  }

  /**
   * Clicks the HTML Login button and waits for new page.
   * @param {string} expectedUrl - Expected URL pattern to match
   * @returns {Promise<import('@playwright/test').Page>} The new page
   */
  async clickHtmlLoginAndWaitForNewPage(expectedUrl) {
    // Wait for button to be visible
    await this.htmlLoginButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait for page event before clicking
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.htmlLoginButton.click()
    ]);
    
    // Wait for navigation
    await newPage.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await newPage.waitForTimeout(2000); // Additional wait for page to fully load
    
    // Verify URL - check for base URL pattern (html5.html)
    const actualUrl = newPage.url();
    const baseUrlPattern = expectedUrl ? expectedUrl.split('/').pop() : 'html5.html';
    if (expectedUrl && !actualUrl.includes(baseUrlPattern)) {
      throw new Error(`Expected URL to contain "${baseUrlPattern}", but got "${actualUrl}"`);
    }
    
    return newPage;
  }

  /**
   * Checks if Remote Login button is visible.
   * @returns {Promise<boolean>}
   */
  async isRemoteLoginButtonVisible() {
    try {
      return await this.remoteLoginButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if HTML Login button is visible.
   * @returns {Promise<boolean>}
   */
  async isHtmlLoginButtonVisible() {
    try {
      return await this.htmlLoginButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Raise Service Request button.
   */
  async clickRaiseServiceRequest() {
    await this.raiseServiceRequestButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.raiseServiceRequestButton.click();
  }

  /**
   * Checks if Raise Service Request button is visible.
   * @returns {Promise<boolean>}
   */
  async isRaiseServiceRequestButtonVisible() {
    try {
      return await this.raiseServiceRequestButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if we're on the Raise Service Request page.
   * @returns {Promise<boolean>}
   */
  async isRaiseServiceRequestPage() {
    try {
      const currentUrl = await this.page.url();
      // Check if URL contains service request related keywords
      const urlLower = currentUrl.toLowerCase();
      const urlMatches = urlLower.includes('service') && urlLower.includes('request') || 
                         urlLower.includes('servicerequest') ||
                         urlLower.includes('raise-service') ||
                         urlLower.includes('service-request');
      
      // Also check for page content indicators
      if (urlMatches) return true;
      
      // Try to find page content that indicates service request page
      const serviceRequestIndicators = this.page.locator('h1:has-text("Service Request"), h2:has-text("Service Request"), h1:has-text("Raise Service Request"), .page-title:has-text("Service Request")').first();
      const hasIndicator = await serviceRequestIndicators.isVisible({ timeout: 3000 }).catch(() => false);
      
      return hasIndicator || urlMatches;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current page title or heading to verify Raise Service Request page.
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    try {
      // Try to get page title from h1, h2, or page title element
      const titleElement = this.page.locator('h1, h2, .page-title, .page-header h1, .page-header h2').first();
      const isVisible = await titleElement.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const text = await titleElement.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if Account Details card is visible.
   * @returns {Promise<boolean>}
   */
  async isAccountDetailsCardVisible() {
    try {
      return await this.accountDetailsCard.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the name from Account Details card.
   * @returns {Promise<string>}
   */
  async getAccountDetailsName() {
    try {
      await this.accountDetailsName.waitFor({ state: 'visible', timeout: 10000 });
      const text = await this.accountDetailsName.textContent();
      return text?.trim() || '';
    } catch (error) {
      // Fallback: find the label, go up to parent div.col-md-4, then find next sibling div.col-md-8
      const label = this.accountDetailsCard.locator('p.text-primary:has-text("Name:")').first();
      const parentDiv = label.locator('..'); // Go to parent div.col-md-4
      const detailsDiv = parentDiv.locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]').first();
      const details = detailsDiv.locator('p.details').first();
      const text = await details.textContent();
      return text?.trim() || '';
    }
  }

  /**
   * Gets the email from Account Details card.
   * @returns {Promise<string>}
   */
  async getAccountDetailsEmail() {
    try {
      await this.accountDetailsEmail.waitFor({ state: 'visible', timeout: 10000 });
      const text = await this.accountDetailsEmail.textContent();
      return text?.trim() || '';
    } catch (error) {
      // Fallback: find the label, go up to parent div.col-md-4, then find next sibling div.col-md-8
      const label = this.accountDetailsCard.locator('p.text-primary:has-text("Email ID:")').first();
      const parentDiv = label.locator('..'); // Go to parent div.col-md-4
      const detailsDiv = parentDiv.locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]').first();
      const details = detailsDiv.locator('p.details').first();
      const text = await details.textContent();
      return text?.trim() || '';
    }
  }

  /**
   * Gets the current plan from Account Details card.
   * @returns {Promise<string>}
   */
  async getAccountDetailsCurrentPlan() {
    try {
      await this.accountDetailsCurrentPlan.waitFor({ state: 'visible', timeout: 10000 });
      const text = await this.accountDetailsCurrentPlan.textContent();
      return text?.trim() || '';
    } catch (error) {
      // Fallback: find the label, go up to parent div.col-md-4, then find next sibling div.col-md-8
      const label = this.accountDetailsCard.locator('p.text-primary:has-text("Current Plan:")').first();
      const parentDiv = label.locator('..'); // Go to parent div.col-md-4
      const detailsDiv = parentDiv.locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]').first();
      const details = detailsDiv.locator('p.details').first();
      const text = await details.textContent();
      return text?.trim() || '';
    }
  }

  /**
   * Gets the billing status from Account Details card.
   * @returns {Promise<string>}
   */
  async getAccountDetailsBillingStatus() {
    try {
      await this.accountDetailsBillingStatus.waitFor({ state: 'visible', timeout: 10000 });
      const text = await this.accountDetailsBillingStatus.textContent();
      return text?.trim() || '';
    } catch (error) {
      // Fallback: find the label, go up to parent div.col-md-4, then find next sibling div.col-md-8
      const label = this.accountDetailsCard.locator('p.text-primary:has-text("Billing Status:")').first();
      const parentDiv = label.locator('..'); // Go to parent div.col-md-4
      const detailsDiv = parentDiv.locator('xpath=following-sibling::div[contains(@class, "col-md-8")][1]').first();
      const details = detailsDiv.locator('p.details').first();
      const text = await details.textContent();
      return text?.trim() || '';
    }
  }

  /**
   * Gets all account details from the card.
   * @returns {Promise<{name: string, email: string, currentPlan: string, billingStatus: string}>}
   */
  async getAccountDetails() {
    const name = await this.getAccountDetailsName();
    const email = await this.getAccountDetailsEmail();
    const currentPlan = await this.getAccountDetailsCurrentPlan();
    const billingStatus = await this.getAccountDetailsBillingStatus();
    return { name, email, currentPlan, billingStatus };
  }

  /**
   * Gets the current plan from header dropdown.
   * @returns {Promise<string>}
   */
  async getHeaderCurrentPlan() {
    await this.headerPlanDropdown.waitFor({ state: 'visible', timeout: 10000 });
    
    // Get text content and remove icon elements
    const text = await this.headerPlanDropdown.textContent();
    
    // Remove icon-related text and normalize whitespace
    let planText = text?.trim() || '';
    
    // Remove icon text patterns (bi-caret-down-fill, etc.)
    planText = planText.replace(/bi-[a-z-]+/gi, '').trim();
    
    // Remove any remaining special characters used for icons
    planText = planText.replace(/[▼▲▶◀]/g, '').trim();
    
    // Normalize whitespace
    planText = planText.replace(/\s+/g, ' ').trim();
    
    return planText;
  }

  /**
   * Clicks the View More link in Account Details card.
   */
  async clickViewMore() {
    await this.viewMoreLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.viewMoreLink.click();
  }

  /**
   * Checks if View More link is visible.
   * @returns {Promise<boolean>}
   */
  async isViewMoreLinkVisible() {
    try {
      return await this.viewMoreLink.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if we're on the Account Details page.
   * @returns {Promise<boolean>}
   */
  async isAccountDetailsPage() {
    try {
      const currentUrl = await this.page.url();
      const urlLower = currentUrl.toLowerCase();
      return urlLower.includes('account-details') || urlLower.includes('accountdetails');
    } catch (error) {
      return false;
    }
  }
}

module.exports = { DashboardPage };


