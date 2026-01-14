class AddUserPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Left menu navigation
    // HTML: <a> or <button> with text "User Management"
    this.userManagementMenu = page.locator('a:has-text("User Management"), button:has-text("User Management"), [href*="user-management"], [href*="usermanagement"]').first();

    // "+ User" button on User Management page
    // HTML: <button class="btn btn-primary-modern"><i class="bi bi-plus me-1"></i> User </button>
    this.addUserButton = page.locator('button.btn-primary-modern:has-text("User"), button.btn.btn-primary-modern:has-text("User"), button:has(i.bi-plus):has-text("User"), button:has-text("User"):has(i.bi-plus)').first();

    // Modal fields
    this.displayNameInput = page.locator('input[placeholder="Enter display name"], input[name="displayName"]');
    this.emailInput = page.locator('input[placeholder="Enter email"], input[type="email"]');

    // Modal buttons
    this.submitButton = page.locator('button:has-text("Submit")');
    this.cancelButton = page.locator('button:has-text("Cancel")');

    // Table / grid where users are listed
    this.usersTable = page.locator('table');
  }

  /**
   * Navigates from dashboard to the User Management page.
   */
  async gotoUserManagement() {
    try {
      // Wait for menu to be visible and click
      await this.userManagementMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.userManagementMenu.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.userManagementMenu.click();
      await this.page.waitForTimeout(2000); // Wait for navigation
    } catch (error) {
      // If menu not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/user-management`);
      await this.page.waitForTimeout(2000);
    }
    
    // Wait for the user table or "+ User" button to be visible
    // Try multiple strategies to find the button
    let buttonFound = false;
    const buttonSelectors = [
      this.page.locator('button.btn-primary-modern:has-text("User")').first(),
      this.page.locator('button.btn.btn-primary-modern:has-text("User")').first(),
      this.page.locator('button:has(i.bi-plus):has-text("User")').first(),
      this.page.locator('button:has-text("User"):has(i.bi-plus)').first(),
      this.addUserButton
    ];
    
    for (const selector of buttonSelectors) {
      try {
        const isVisible = await selector.isVisible({ timeout: 5000 }).catch(() => false);
        if (isVisible) {
          buttonFound = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!buttonFound) {
      // Fallback: wait for page to load and check for table or any button
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(2000);
      
      // Try one more time to find the button
      const finalCheck = await this.addUserButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (!finalCheck) {
        console.log('Warning: Add User button not found, but continuing...');
      }
    }
  }

  /**
   * Opens the Add Instance User modal.
   */
  async openAddUserModal() {
    console.log('[openAddUserModal] Opening Add User modal...');
    
    // Try multiple strategies to find and click the button
    let buttonClicked = false;
    const buttonSelectors = [
      this.page.locator('button.btn-primary-modern:has-text("User")').first(),
      this.page.locator('button.btn.btn-primary-modern:has-text("User")').first(),
      this.page.locator('button:has(i.bi-plus):has-text("User")').first(),
      this.addUserButton
    ];
    
    for (const selector of buttonSelectors) {
      try {
        const isVisible = await selector.isVisible({ timeout: 5000 }).catch(() => false);
        if (isVisible) {
          console.log('[openAddUserModal] Found Add User button, clicking...');
          await selector.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await selector.click();
          buttonClicked = true;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!buttonClicked) {
      console.log('[openAddUserModal] Using fallback locator for Add User button...');
      // Fallback to original locator
      await this.addUserButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addUserButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.addUserButton.click();
    }
    
    await this.page.waitForTimeout(1000); // Wait for modal to open
    await this.displayNameInput.waitFor({ state: 'visible', timeout: 10000 });
    console.log('[openAddUserModal] Modal opened successfully');
  }

  /**
   * Adds a user using the modal.
   * @param {string} displayName
   * @param {string} email
   */
  async addUser(displayName, email) {
    console.log(`[addUser] Starting to add user - Display Name: "${displayName}", Email: "${email}"`);
    
    await this.openAddUserModal();

    console.log(`[addUser] Filling display name: "${displayName}"`);
    await this.displayNameInput.fill(displayName);
    await this.page.waitForTimeout(300);
    
    console.log(`[addUser] Filling email: "${email}"`);
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(300);

    console.log('[addUser] Clicking Submit button...');
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);

    // Wait for modal to close and table to update
    console.log('[addUser] Waiting for modal to close and table to update...');
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {
      console.log('[addUser] Warning: networkidle timeout, continuing...');
    });
    await this.page.waitForTimeout(2000); // Additional wait for table to refresh
    
    // Check if modal is closed
    const modalClosed = !(await this.displayNameInput.isVisible({ timeout: 1000 }).catch(() => false));
    console.log(`[addUser] Modal closed: ${modalClosed}`);
    
    console.log('[addUser] User addition process completed');
  }

  /**
   * Verifies that a user with the given email exists in the list.
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async isUserPresent(email) {
    console.log(`[isUserPresent] Checking if user with email "${email}" exists in table...`);
    
    // Wait for table to be visible
    const tableVisible = await this.usersTable.isVisible({ timeout: 5000 }).catch(() => false);
    console.log(`[isUserPresent] Table visible: ${tableVisible}`);
    
    if (!tableVisible) {
      console.log('[isUserPresent] Table not visible, trying to find table with different selectors...');
      const alternativeTable = this.page.locator('table, .table, [role="table"], mat-table').first();
      const altTableVisible = await alternativeTable.isVisible({ timeout: 3000 }).catch(() => false);
      console.log(`[isUserPresent] Alternative table visible: ${altTableVisible}`);
    }
    
    // Get all table rows to see what's in the table
    const allRows = this.page.locator('table tbody tr, .table tbody tr, mat-table tbody tr, [role="table"] tbody tr');
    const rowCount = await allRows.count();
    console.log(`[isUserPresent] Total rows in table: ${rowCount}`);
    
    // Get all email addresses from the table for debugging
    if (rowCount > 0) {
      console.log('[isUserPresent] Retrieving emails from table rows...');
      const emailsInTable = [];
      for (let i = 0; i < Math.min(rowCount, 10); i++) { // Limit to first 10 rows
        try {
          const row = allRows.nth(i);
          const rowText = await row.textContent().catch(() => '');
          if (rowText) {
            // Try to extract email from row text
            const emailMatch = rowText.match(/[\w.-]+@[\w.-]+\.\w+/);
            if (emailMatch) {
              emailsInTable.push(emailMatch[0]);
            }
          }
        } catch (e) {
          // Continue
        }
      }
      console.log(`[isUserPresent] Emails found in table (first 10 rows): ${emailsInTable.length > 0 ? emailsInTable.join(', ') : 'none found'}`);
    }
    
    // Try multiple strategies to find the user row
    const userRowSelectors = [
      this.page.locator(`tr:has-text("${email}")`).first(),
      this.page.locator(`tr`, { hasText: email }).first(),
      this.page.locator(`td:has-text("${email}")`).locator('..').first(), // Parent row of cell with email
      this.page.locator(`*:has-text("${email}")`).locator('..').first() // Parent of any element with email
    ];
    
    for (let i = 0; i < userRowSelectors.length; i++) {
      try {
        const selector = userRowSelectors[i];
        const isVisible = await selector.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          console.log(`[isUserPresent] User found using selector strategy ${i + 1}`);
          return true;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    console.log(`[isUserPresent] User with email "${email}" NOT found in table`);
    return false;
  }
}

module.exports = { AddUserPage };


