class TallyReleasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div class="nav-link sidebar-items" routerlink="/tally-release">
    this.tallyReleaseLink = page.locator('div.nav-link.sidebar-items[routerlink="/tally-release"], div.nav-link.sidebar-items:has-text("Tally Release"), a[routerlink="/tally-release"], .sidebar-items:has-text("Tally Release")').first();
    
    // Page elements
    this.pageWrapper = page.locator('app-root, app-tally-release, [class*="tally-release"]').first();
    // HTML: <p class="sub fs-5 my-3">Tally Release</p>
    this.pageHeading = page.locator('p.sub.fs-5.my-3:has-text("Tally Release"), p:has-text("Tally Release"), h1:has-text("Tally Release"), h2:has-text("Tally Release")').first();
    
    // Table locators
    this.tallyReleaseTable = page.locator('mat-table, table.table, table').first();
    this.tableRows = page.locator('mat-table mat-row, table tbody tr').first();
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th');
    
    // Column header locators
    // HTML: <th class="mat-column-index"> S. No. </th>
    this.sNoHeader = page.locator('th.mat-column-index, th:has-text("S. No."), th:has-text("S No")').first();
    // HTML: <th class="mat-column-Version-Name"> Version Name </th>
    this.versionNameHeader = page.locator('th.mat-column-Version-Name, th:has-text("Version Name"), th:has-text("Version")').first();
    // HTML: <th class="mat-column-Link"> Link </th>
    this.linkHeader = page.locator('th.mat-column-Link, th:has-text("Link")').first();
    // HTML: <th class="mat-column-Update-Link"> Update Link </th>
    this.updateLinkHeader = page.locator('th.mat-column-Update-Link, th:has-text("Update Link")').first();
    // HTML: <th class="mat-column-Action"> Action </th>
    this.actionHeader = page.locator('th.mat-column-Action, th:has-text("Action")').first();
    
    // No data message locator
    this.noDataMessage = page.locator('*:has-text("No data found"), *:has-text("No releases available"), *:has-text("No data"), p:has-text("No data found")').first();
    
    // Add New Tally Release button
    // HTML: <button class="comman-btn1 btn-primary me-2">+ Tally Release</button>
    this.addTallyReleaseButton = page.locator('button.comman-btn1.btn-primary:has-text("+ Tally Release"), button:has-text("+ Tally Release"), button:has-text("Tally Release")').first();
    
    // Modal locators
    // HTML: <div class="modal-heading">New Tally Release:</div>
    this.modalHeading = page.locator('div.modal-heading:has-text("New Tally Release"), div.modal-heading, *:has-text("New Tally Release")').first();
    // HTML: <div class="modal-heading">Update Tally Release</div>
    this.updateModalHeading = page.locator('div.modal-heading:has-text("Update Tally Release"), div.modal-heading:has-text("Update"), *:has-text("Update Tally Release")').first();
    this.modal = page.locator('div.modal-section, .modal, [class*="modal"]').first();
    
    // Edit icon locator
    // HTML: <i class="bi bi-pencil-fill text-primary ms-1 fs-5">
    this.editIcon = page.locator('i.bi-pencil-fill.text-primary, i.bi-pencil-fill, i:has-text(""), button:has(i.bi-pencil-fill), td.mat-column-Action i.bi-pencil-fill').first();
    this.allEditIcons = page.locator('i.bi-pencil-fill.text-primary, i.bi-pencil-fill, td.mat-column-Action i.bi-pencil-fill');
    
    // Form field locators
    // HTML: <input id="versionName" placeholder="Enter Version Name">
    this.fullNameInput = page.locator('input#versionName[placeholder="Enter Version Name"], input#versionName, input[ng-reflect-name="versionName"]').first();
    // HTML: <input id="link" placeholder="Enter Download Link">
    this.downloadLinkInput = page.locator('input#link[placeholder="Enter Download Link"], input#link, input[ng-reflect-name="link"]').first();
    // HTML: <input id="updateLink" placeholder="Enter Update Link">
    this.updateLinkInput = page.locator('input#updateLink[placeholder="Enter Update Link"], input#updateLink, input[ng-reflect-name="updateLink"]').first();
    
    // Form buttons
    // HTML: <button type="submit" class="btn search-btn">Submit</button>
    this.submitButton = page.locator('button.btn.search-btn[type="submit"], button:has-text("Submit")').first();
    // HTML: <button type="button" class="btn reset-btn mx-3">Cancel</button>
    this.cancelButton = page.locator('button.btn.reset-btn[type="button"], button:has-text("Cancel")').first();
  }

  /**
   * Navigates to the Tally Release page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoTallyRelease(baseUrl) {
    // Navigate to tally release page
    await this.tallyReleaseLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.tallyReleaseLink.scrollIntoViewIfNeeded();
    await this.tallyReleaseLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Wait for tally release page to load
    await this.tallyReleaseTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Tally Release page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnTallyReleasePage = url.includes('/tally-release');
      const isTableVisible = await this.tallyReleaseTable.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnTallyReleasePage && isTableVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the page heading is visible
   * @returns {Promise<boolean>}
   */
  async isHeadingVisible() {
    try {
      return await this.pageHeading.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets the page heading text
   * @returns {Promise<string>}
   */
  async getHeadingText() {
    try {
      const text = await this.pageHeading.textContent();
      return text?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies the table is visible
   * @returns {Promise<boolean>}
   */
  async isTableVisible() {
    try {
      return await this.tallyReleaseTable.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Verifies all expected column headers are present
   * @returns {Promise<{sNo: boolean, versionName: boolean, link: boolean, updateLink: boolean, action: boolean}>}
   */
  async verifyTableColumns() {
    try {
      const results = {
        sNo: await this.sNoHeader.isVisible({ timeout: 3000 }).catch(() => false),
        versionName: await this.versionNameHeader.isVisible({ timeout: 3000 }).catch(() => false),
        link: await this.linkHeader.isVisible({ timeout: 3000 }).catch(() => false),
        updateLink: await this.updateLinkHeader.isVisible({ timeout: 3000 }).catch(() => false),
        action: await this.actionHeader.isVisible({ timeout: 3000 }).catch(() => false)
      };
      
      return results;
    } catch {
      return {
        sNo: false,
        versionName: false,
        link: false,
        updateLink: false,
        action: false
      };
    }
  }

  /**
   * Gets all column header texts
   * @returns {Promise<Array<string>>}
   */
  async getAllColumnHeaders() {
    try {
      const headers = [];
      const count = await this.tableHeaders.count();
      
      for (let i = 0; i < count; i++) {
        const header = this.tableHeaders.nth(i);
        const text = await header.textContent();
        if (text) {
          headers.push(text.trim());
        }
      }
      
      return headers;
    } catch {
      return [];
    }
  }

  /**
   * Verifies table has data or shows empty state
   * @returns {Promise<{hasData: boolean, rowCount: number, noDataMessageVisible: boolean}>}
   */
  async verifyTableDataOrEmpty() {
    try {
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      const noDataMessageVisible = await this.noDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        noDataMessageVisible: noDataMessageVisible
      };
    } catch {
      return {
        hasData: false,
        rowCount: 0,
        noDataMessageVisible: false
      };
    }
  }

  /**
   * Refreshes the Tally Release page
   */
  async refreshPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(2000);
  }

  // ==================== ADD NEW TALLY RELEASE MODAL METHODS ====================

  /**
   * Clicks on the "+ Tally Release" button to open the modal
   */
  async clickAddTallyReleaseButton() {
    try {
      await this.addTallyReleaseButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addTallyReleaseButton.scrollIntoViewIfNeeded();
      await this.addTallyReleaseButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for modal to open
      await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Add Tally Release button: ${error.message}`);
    }
  }

  /**
   * Verifies the modal is open and visible
   * @returns {Promise<boolean>}
   */
  async isModalOpen() {
    try {
      return await this.modal.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Verifies the modal heading is visible
   * @returns {Promise<boolean>}
   */
  async isModalHeadingVisible() {
    try {
      return await this.modalHeading.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets the modal heading text
   * @returns {Promise<string>}
   */
  async getModalHeadingText() {
    try {
      const text = await this.modalHeading.textContent();
      return text?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies all form fields are visible in the modal
   * @returns {Promise<{fullName: boolean, downloadLink: boolean, updateLink: boolean}>}
   */
  async verifyFormFields() {
    try {
      const results = {
        fullName: await this.fullNameInput.isVisible({ timeout: 3000 }).catch(() => false),
        downloadLink: await this.downloadLinkInput.isVisible({ timeout: 3000 }).catch(() => false),
        updateLink: await this.updateLinkInput.isVisible({ timeout: 3000 }).catch(() => false)
      };
      
      return results;
    } catch {
      return {
        fullName: false,
        downloadLink: false,
        updateLink: false
      };
    }
  }

  /**
   * Verifies Submit and Cancel buttons are visible
   * @returns {Promise<{submit: boolean, cancel: boolean}>}
   */
  async verifyModalButtons() {
    try {
      const results = {
        submit: await this.submitButton.isVisible({ timeout: 3000 }).catch(() => false),
        cancel: await this.cancelButton.isVisible({ timeout: 3000 }).catch(() => false)
      };
      
      return results;
    } catch {
      return {
        submit: false,
        cancel: false
      };
    }
  }

  /**
   * Clicks the Cancel button to close the modal
   */
  async clickCancelButton() {
    try {
      await this.cancelButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cancelButton.scrollIntoViewIfNeeded();
      await this.cancelButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for modal to close
      await this.modal.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Cancel button: ${error.message}`);
    }
  }

  /**
   * Enters value in Full Name field
   * @param {string} value - Full Name value
   */
  async enterFullName(value) {
    try {
      await this.fullNameInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.fullNameInput.scrollIntoViewIfNeeded();
      await this.fullNameInput.clear();
      await this.fullNameInput.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Full Name: ${error.message}`);
    }
  }

  /**
   * Enters value in Download Link field
   * @param {string} value - Download Link value
   */
  async enterDownloadLink(value) {
    try {
      await this.downloadLinkInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.downloadLinkInput.scrollIntoViewIfNeeded();
      await this.downloadLinkInput.clear();
      await this.downloadLinkInput.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Download Link: ${error.message}`);
    }
  }

  /**
   * Enters value in Update Link field
   * @param {string} value - Update Link value
   */
  async enterUpdateLink(value) {
    try {
      await this.updateLinkInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateLinkInput.scrollIntoViewIfNeeded();
      await this.updateLinkInput.clear();
      await this.updateLinkInput.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Update Link: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button
   */
  async clickSubmitButton() {
    try {
      await this.submitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.submitButton.scrollIntoViewIfNeeded();
      await this.submitButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Checks if validation errors are visible for form fields
   * @returns {Promise<{fullName: boolean, downloadLink: boolean, updateLink: boolean}>}
   */
  async checkValidationErrors() {
    try {
      // Check for validation errors near each field
      const fullNameError = await this.fullNameInput.locator('..').locator('.text-danger, .invalid-feedback, .error-message').isVisible({ timeout: 1000 }).catch(() => false);
      const downloadLinkError = await this.downloadLinkInput.locator('..').locator('.text-danger, .invalid-feedback, .error-message').isVisible({ timeout: 1000 }).catch(() => false);
      const updateLinkError = await this.updateLinkInput.locator('..').locator('.text-danger, .invalid-feedback, .error-message').isVisible({ timeout: 1000 }).catch(() => false);
      
      // Also check for aria-invalid attribute
      const fullNameInvalid = await this.fullNameInput.getAttribute('aria-invalid').catch(() => null);
      const downloadLinkInvalid = await this.downloadLinkInput.getAttribute('aria-invalid').catch(() => null);
      const updateLinkInvalid = await this.updateLinkInput.getAttribute('aria-invalid').catch(() => null);
      
      return {
        fullName: fullNameError || fullNameInvalid === 'true',
        downloadLink: downloadLinkError || downloadLinkInvalid === 'true',
        updateLink: updateLinkError || updateLinkInvalid === 'true'
      };
    } catch {
      return {
        fullName: false,
        downloadLink: false,
        updateLink: false
      };
    }
  }

  /**
   * Checks if success toast message is visible
   * @returns {Promise<boolean>}
   */
  async isSuccessToastVisible() {
    try {
      const toast = this.page.locator('#toast-container .toast-success, #toast-container .toastr-success, div[role="alert"].toast-success, *:has-text("success")').first();
      return await toast.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets success toast message text
   * @returns {Promise<string>}
   */
  async getSuccessToastMessage() {
    try {
      const toast = this.page.locator('#toast-container .toast-success, #toast-container .toastr-success, div[role="alert"].toast-success').first();
      if (await this.isSuccessToastVisible()) {
        const text = await toast.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Gets the current row count in the table
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      return await this.allTableRows.count();
    } catch {
      return 0;
    }
  }

  /**
   * Verifies if a new row was added to the table
   * @param {number} initialCount - Initial row count before adding
   * @returns {Promise<boolean>}
   */
  async verifyNewRowAdded(initialCount) {
    try {
      await this.page.waitForTimeout(2000); // Wait for table to update
      const newCount = await this.getTableRowCount();
      return newCount > initialCount;
    } catch {
      return false;
    }
  }

  /**
   * Checks if loader is visible
   * @returns {Promise<boolean>}
   */
  async isLoaderVisible() {
    try {
      const loader = this.page.locator('.loader, .spinner, [class*="loading"], [class*="spinner"]').first();
      return await loader.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  // ==================== EDIT TALLY RELEASE METHODS ====================

  /**
   * Clicks on the Edit icon for a specific row (first row by default)
   * @param {number} rowIndex - Index of the row to edit (0-based, default: 0)
   */
  async clickEditIcon(rowIndex = 0) {
    try {
      // Get all edit icons
      const editIcons = this.allEditIcons;
      const count = await editIcons.count();
      
      if (count === 0) {
        throw new Error('No edit icons found in the table');
      }
      
      // Click on the edit icon at the specified index
      const editIcon = editIcons.nth(rowIndex);
      await editIcon.waitFor({ state: 'visible', timeout: 10000 });
      await editIcon.scrollIntoViewIfNeeded();
      await editIcon.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for modal to open
      await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Edit icon: ${error.message}`);
    }
  }

  /**
   * Verifies the Update modal heading is visible
   * @returns {Promise<boolean>}
   */
  async isUpdateModalHeadingVisible() {
    try {
      return await this.updateModalHeading.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets the Update modal heading text
   * @returns {Promise<string>}
   */
  async getUpdateModalHeadingText() {
    try {
      const text = await this.updateModalHeading.textContent();
      return text?.trim() || '';
    } catch {
      return '';
    }
  }

  /**
   * Gets the current value of Full Name field
   * @returns {Promise<string>}
   */
  async getFullNameValue() {
    try {
      return await this.fullNameInput.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Gets the current value of Download Link field
   * @returns {Promise<string>}
   */
  async getDownloadLinkValue() {
    try {
      return await this.downloadLinkInput.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Gets the current value of Update Link field
   * @returns {Promise<string>}
   */
  async getUpdateLinkValue() {
    try {
      return await this.updateLinkInput.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Verifies pre-filled data in edit modal
   * @param {string} expectedFullName - Expected Full Name value
   * @param {string} expectedDownloadLink - Expected Download Link value
   * @param {string} expectedUpdateLink - Expected Update Link value
   * @returns {Promise<{fullNameMatches: boolean, downloadLinkMatches: boolean, updateLinkMatches: boolean}>}
   */
  async verifyPreFilledData(expectedFullName, expectedDownloadLink, expectedUpdateLink) {
    try {
      const actualFullName = await this.getFullNameValue();
      const actualDownloadLink = await this.getDownloadLinkValue();
      const actualUpdateLink = await this.getUpdateLinkValue();
      
      return {
        fullNameMatches: actualFullName === expectedFullName,
        downloadLinkMatches: actualDownloadLink === expectedDownloadLink,
        updateLinkMatches: actualUpdateLink === expectedUpdateLink,
        actualFullName: actualFullName,
        actualDownloadLink: actualDownloadLink,
        actualUpdateLink: actualUpdateLink
      };
    } catch {
      return {
        fullNameMatches: false,
        downloadLinkMatches: false,
        updateLinkMatches: false,
        actualFullName: '',
        actualDownloadLink: '',
        actualUpdateLink: ''
      };
    }
  }

  /**
   * Gets data from a specific table row
   * @param {number} rowIndex - Index of the row (0-based)
   * @returns {Promise<{versionName: string, link: string, updateLink: string}>}
   */
  async getRowData(rowIndex = 0) {
    try {
      const row = this.allTableRows.nth(rowIndex);
      const cells = row.locator('td');
      const cellCount = await cells.count();
      
      const rowData = {
        versionName: '',
        link: '',
        updateLink: ''
      };
      
      // Try to find Version Name, Link, and Update Link columns
      // Version Name is typically in mat-column-Version-Name
      const versionNameCell = row.locator('td.mat-column-Version-Name, td:has-text("Tally")');
      if (await versionNameCell.count() > 0) {
        rowData.versionName = await versionNameCell.first().textContent() || '';
      }
      
      // Link is typically in mat-column-Link
      const linkCell = row.locator('td.mat-column-Link');
      if (await linkCell.count() > 0) {
        rowData.link = await linkCell.first().textContent() || '';
      }
      
      // Update Link is typically in mat-column-Update-Link
      const updateLinkCell = row.locator('td.mat-column-Update-Link');
      if (await updateLinkCell.count() > 0) {
        rowData.updateLink = await updateLinkCell.first().textContent() || '';
      }
      
      return {
        versionName: rowData.versionName.trim(),
        link: rowData.link.trim(),
        updateLink: rowData.updateLink.trim()
      };
    } catch {
      return {
        versionName: '',
        link: '',
        updateLink: ''
      };
    }
  }

  /**
   * Clears all form fields
   */
  async clearAllFields() {
    try {
      await this.fullNameInput.clear();
      await this.downloadLinkInput.clear();
      await this.updateLinkInput.clear();
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to clear all fields: ${error.message}`);
    }
  }
}

module.exports = { TallyReleasePage };

