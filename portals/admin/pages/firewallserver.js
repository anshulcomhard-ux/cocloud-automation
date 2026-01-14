class FirewallServerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/firewallserver" class="nav-link sidebar-items">
    this.firewallServerLink = page.locator('div.nav-link.sidebar-items[routerlink="/firewallserver"], div.nav-link.sidebar-items:has-text("Firewall Server"), a[routerlink="/firewallserver"], .sidebar-items:has-text("Firewall Server")').first();
    
    // Page elements
    // HTML: <div class="col-4"><p class="sub fs-5">Firewall Server</p></div>
    this.pageTitle = page.locator('p.sub.fs-5:has-text("Firewall Server"), h1:has-text("Firewall Server"), h2:has-text("Firewall Server"), *:has-text("Firewall Server")').first();
    this.pageWrapper = page.locator('app-root, app-firewallserver, [class*="firewall"]').first();
    
    // Table locators
    this.firewallServerTable = page.locator('mat-table, table.table, table').first();
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th');
    
    // Record count text
    // HTML: "Showing 1 to 9 of 9 records"
    this.recordCountText = page.locator('*:has-text("Showing"), *:has-text("records")').first();
    
    // Add Server button - exact match: button.comman-btn1.btn-primary.me-2 with text "+ Server"
    this.addServerButton = page.locator('button.comman-btn1.btn-primary.me-2:has-text("+ Server"), button.comman-btn1.btn-primary:has-text("+ Server"), button.comman-btn1:has-text("+ Server"), button.btn-primary:has-text("+ Server"), button:has-text("+ Server")').first();
    
    // Select Headers button
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), .btn:has-text("Select Headers")').first();
    
    // No data message (if exists)
    this.noDataMessage = page.locator('p.error-msg, *:has-text("No data"), *:has-text("No records"), *:has-text("No Data Found"), *:has-text("No data found")').first();
    
    // Table column locators for retrieving values
    this.nameCells = page.locator('td.mat-column-Name, td:has-text("Test"), td:has-text("Ansh")');
    
    // Update Firewall Server Modal locators
    // HTML: Modal with title "Update Firewall Server"
    this.updateFirewallServerModal = page.locator('div.modal-section:has-text("Update Firewall Server"), div.modal:has-text("Update Firewall Server"), .modal-dialog:has-text("Update Firewall Server"), [role="dialog"]:has-text("Update Firewall Server")').first();
    this.updateFirewallServerModalTitle = page.locator('div.modal-heading:has-text("Update Firewall Server"), h1:has-text("Update Firewall Server"), h2:has-text("Update Firewall Server"), h3:has-text("Update Firewall Server"), h4:has-text("Update Firewall Server"), h5:has-text("Update Firewall Server"), .modal-title:has-text("Update Firewall Server"), *:has-text("Update Firewall Server")').first();
    this.updateFirewallServerModalClose = page.locator('button:has-text("Cancel"), button.close, .modal-header button[aria-label="Close"], .modal-header .close').first();
    
    // Action column edit icon locator
    // HTML: Edit icon (pencil) in Action column - <i class="bi bi-pencil-fill text-primary editCursor">
    this.editIcon = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="bi-pencil"], td.mat-column-Action i.editCursor, td.mat-column-Action button:has([class*="bi-pencil"]), td.mat-column-Action i[class*="pencil"], td.mat-column-Action button[title*="Edit"], td.mat-column-Action button[aria-label*="Edit"]').first();
    this.editIcons = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="bi-pencil"], td.mat-column-Action i.editCursor, td.mat-column-Action button:has([class*="bi-pencil"]), td.mat-column-Action i[class*="pencil"], td.mat-column-Action button[title*="Edit"], td.mat-column-Action button[aria-label*="Edit"]');
    
    // Add New Firewall Server Modal locators
    // HTML: Modal with title "Add New Firewall Server"
    this.addNewFirewallServerModal = page.locator('div.modal-section:has-text("Add New Firewall Server"), div.modal:has-text("Add New Firewall Server"), .modal-dialog:has-text("Add New Firewall Server"), [role="dialog"]:has-text("Add New Firewall Server")').first();
    this.addNewFirewallServerModalTitle = page.locator('div.modal-heading:has-text("Add New Firewall Server"), h1:has-text("Add New Firewall Server"), h2:has-text("Add New Firewall Server"), h3:has-text("Add New Firewall Server"), h4:has-text("Add New Firewall Server"), h5:has-text("Add New Firewall Server"), .modal-title:has-text("Add New Firewall Server"), *:has-text("Add New Firewall Server")').first();
    
    // Add New Firewall Server form field locators
    // Using exact IDs from HTML: id="name", id="hostName", id="ip", id="publicIp", id="ram", id="cpu", id="storage", id="rdpPort", id="description", id="port"
    this.fullNameField = page.locator('input#name[ng-reflect-name="name"], input#name[placeholder="Enter Name"], input#name').first();
    this.hostnameField = page.locator('input#hostName[ng-reflect-name="hostName"], input#hostName[placeholder="Enter Hostname"], input#hostName').first();
    this.ipAddressField = page.locator('input#ip[ng-reflect-name="ip"], input#ip[placeholder="Enter IP Address"], input#ip').first();
    this.publicIpField = page.locator('input#publicIp[ng-reflect-name="publicIp"], input#publicIp[placeholder="Enter Public IP Address"], input#publicIp').first();
    this.ramField = page.locator('input#ram[ng-reflect-name="ram"], input#ram[placeholder="RAM"], input#ram').first();
    this.cpuField = page.locator('input#cpu[ng-reflect-name="cpu"], input#cpu[placeholder="CPU"], input#cpu').first();
    this.storageField = page.locator('input#storage[ng-reflect-name="storage"], input#storage[placeholder="Storage"], input#storage').first();
    this.rdpPortField = page.locator('input#rdpPort[ng-reflect-name="rdpPort"], input#rdpPort[placeholder="Enter RDP Port"], input#rdpPort').first();
    this.descriptionField = page.locator('textarea#description[ng-reflect-name="description"], textarea#description[placeholder="Description"], textarea#description').first();
    this.portField = page.locator('input#port[ng-reflect-name="port"], input#port[placeholder="Enter Port"], input#port').first();
    
    // Add New Firewall Server modal buttons
    this.addFirewallServerSubmitButton = page.locator('button.search-btn:has-text("Submit"), button.btn.search-btn[type="submit"], button:has-text("Submit")').first();
    this.addFirewallServerCancelButton = page.locator('button.reset-btn:has-text("Cancel"), button.btn.reset-btn[type="button"], button:has-text("Cancel")').first();
  }

  /**
   * Navigates to the Firewall Server page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoFirewallServer(baseUrl) {
    // Navigate to firewall server page
    await this.firewallServerLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.firewallServerLink.scrollIntoViewIfNeeded();
    await this.firewallServerLink.click();
    
    // Wait for load state with a shorter timeout, don't fail if it times out
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      // If networkidle times out, just wait a bit and continue
      return this.page.waitForTimeout(2000);
    });
    await this.page.waitForTimeout(2000);
    
    // Wait for firewall server page to load
    await this.firewallServerTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Firewall Server page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnFirewallServerPage = url.includes('/firewallserver') || url.includes('/firewall-server');
      const isTitleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnFirewallServerPage && isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Firewall Server table is visible with data
   * @returns {Promise<{visible: boolean, hasData: boolean, rowCount: number}>}
   */
  async verifyTableWithData() {
    try {
      const isTableVisible = await this.firewallServerTable.isVisible({ timeout: 5000 }).catch(() => false);
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      
      return {
        visible: isTableVisible,
        hasData: hasData,
        rowCount: rowCount
      };
    } catch {
      return {
        visible: false,
        hasData: false,
        rowCount: 0
      };
    }
  }

  /**
   * Verifies table has data or shows empty message
   * @returns {Promise<{hasData: boolean, rowCount: number, messageVisible: boolean}>}
   */
  async verifyTableDataOrEmpty() {
    try {
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      const messageVisible = await this.noDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        messageVisible: messageVisible
      };
    } catch {
      return {
        hasData: false,
        rowCount: 0,
        messageVisible: false
      };
    }
  }

  // ==================== UPDATE FIREWALL SERVER MODAL METHODS ====================

  /**
   * Clicks on the Name column value in the first row to open Update Firewall Server modal
   */
  async clickNameColumnValue() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        throw new Error('No rows available in table');
      }
      
      const firstRow = this.allTableRows.first();
      // Try to find the clickable link inside the Name cell first
      const nameLink = firstRow.locator('td.mat-column-Name a.text-primary, td.mat-column-Name a.pointer, td.mat-column-Name a').first();
      const isLinkVisible = await nameLink.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isLinkVisible) {
        await nameLink.waitFor({ state: 'visible', timeout: 5000 });
        await nameLink.scrollIntoViewIfNeeded();
        await nameLink.click();
      } else {
        // Fallback: click on the cell itself
        const nameCell = firstRow.locator('td.mat-column-Name').first();
        await nameCell.waitFor({ state: 'visible', timeout: 5000 });
        await nameCell.scrollIntoViewIfNeeded();
        await nameCell.click();
      }
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Name column value: ${error.message}`);
    }
  }

  /**
   * Clicks on the edit icon in the Action column of the first row
   */
  async clickEditIcon() {
    try {
      // Wait for page to stabilize and table to be visible
      await this.firewallServerTable.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
      
      // Wait for load state to ensure page is ready
      await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
      
      // Re-query table rows to ensure we have fresh references
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        throw new Error('No rows available in table');
      }
      
      // Get fresh reference to first row
      const firstRow = this.allTableRows.first();
      
      // Wait for the row to be visible
      await firstRow.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      // Try to find the edit icon with more specific selectors
      const editIconInRow = firstRow.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i.editCursor, td.mat-column-Action i[class*="bi-pencil"], td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has([class*="bi-pencil"]), td.mat-column-Action button[title*="Edit"], td.mat-column-Action button[aria-label*="Edit"]').first();
      
      await editIconInRow.waitFor({ state: 'visible', timeout: 10000 });
      await editIconInRow.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await editIconInRow.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // If error occurs, try one more time after waiting
      try {
        await this.page.waitForTimeout(2000);
        await this.firewallServerTable.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        
        const firstRow = this.allTableRows.first();
        const editIconInRow = firstRow.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i.editCursor, td.mat-column-Action i[class*="bi-pencil"]').first();
        
        await editIconInRow.waitFor({ state: 'visible', timeout: 5000 });
        await editIconInRow.scrollIntoViewIfNeeded();
        await editIconInRow.click();
        await this.page.waitForTimeout(1000);
      } catch (retryError) {
        throw new Error(`Failed to click edit icon: ${error.message}. Retry also failed: ${retryError.message}`);
      }
    }
  }

  /**
   * Verifies if the Update Firewall Server modal is open
   * @returns {Promise<boolean>}
   */
  async isUpdateFirewallServerModalOpen() {
    try {
      // Use very short timeout for faster detection (200ms)
      // Check if modal title is visible first (more reliable)
      const isTitleVisible = await this.updateFirewallServerModalTitle.isVisible({ timeout: 200 }).catch(() => false);
      if (isTitleVisible) {
        return true;
      }
      
      // Fallback: Check if modal section is visible (also fast)
      const isModalVisible = await this.updateFirewallServerModal.isVisible({ timeout: 200 }).catch(() => false);
      return isModalVisible;
    } catch {
      return false;
    }
  }

  /**
   * Closes the Update Firewall Server modal by clicking Cancel or Close button
   */
  async closeUpdateFirewallServerModal() {
    try {
      // Try to find and click Cancel button first - exact match: button.btn.reset-btn.mx-3 with text "Cancel"
      const cancelButton = this.page.locator('button.btn.reset-btn.mx-3:has-text("Cancel"), button.reset-btn.mx-3:has-text("Cancel"), button.btn.reset-btn:has-text("Cancel"), button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
      const isCancelVisible = await cancelButton.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isCancelVisible) {
        await cancelButton.scrollIntoViewIfNeeded();
        await cancelButton.click({ timeout: 5000 });
        await this.page.waitForTimeout(1500);
      } else {
        // Try alternative Cancel button locators
        const cancelButtonAlt = this.page.locator('button[type="button"].reset-btn:has-text("Cancel"), button[type="button"]:has-text("Cancel")').first();
        const isCancelAltVisible = await cancelButtonAlt.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (isCancelAltVisible) {
          await cancelButtonAlt.scrollIntoViewIfNeeded();
          await cancelButtonAlt.click({ timeout: 5000 });
          await this.page.waitForTimeout(1500);
        } else {
          // Try close button
          const closeButton = this.page.locator('button.close, .modal-header button[aria-label="Close"], .modal-header .close').first();
          const isCloseVisible = await closeButton.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (isCloseVisible) {
            await closeButton.scrollIntoViewIfNeeded();
            await closeButton.click({ timeout: 5000 });
            await this.page.waitForTimeout(1500);
          } else {
            // Try pressing Escape key
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(1500);
          }
        }
      }
      
      // Wait for modal to actually close - try waiting for it to be hidden first (fast)
      try {
        await this.updateFirewallServerModalTitle.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
        await this.updateFirewallServerModal.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      } catch {
        // Continue with polling if waitFor hidden doesn't work
      }
      
      // Check quickly if modal is already closed (fast detection with 200ms timeout)
      let modalClosed = false;
      const isModalOpenImmediate = await this.isUpdateFirewallServerModalOpen();
      if (!isModalOpenImmediate) {
        modalClosed = true;
      } else {
        // If still open, check a few more times with shorter intervals
        for (let i = 0; i < 5; i++) {
          await this.page.waitForTimeout(300);
          const isModalOpen = await this.isUpdateFirewallServerModalOpen();
          if (!isModalOpen) {
            modalClosed = true;
            break;
          }
        }
      }
      
      // If modal is still open, try clicking Cancel button again with force
      if (!modalClosed) {
        const cancelButtonRetry = this.page.locator('button.btn.reset-btn.mx-3:has-text("Cancel"), button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
        const isCancelRetryVisible = await cancelButtonRetry.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (isCancelRetryVisible) {
          await cancelButtonRetry.scrollIntoViewIfNeeded();
          await cancelButtonRetry.click({ force: true, timeout: 5000 });
          await this.page.waitForTimeout(2000);
        } else {
          // Try Escape key
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(2000);
        }
        
        // Check one more time after retry (faster)
        for (let i = 0; i < 5; i++) {
          await this.page.waitForTimeout(300);
          const isModalOpen = await this.isUpdateFirewallServerModalOpen();
          if (!isModalOpen) {
            modalClosed = true;
            break;
          }
        }
      }
      
      // Wait a bit more to ensure modal is fully closed
      await this.page.waitForTimeout(500);
    } catch (error) {
      // If closing fails, try pressing Escape as fallback
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1000);
        
        // Wait for modal to close
        for (let i = 0; i < 5; i++) {
          await this.page.waitForTimeout(300);
          const isModalOpen = await this.isUpdateFirewallServerModalOpen();
          if (!isModalOpen) {
            break;
          }
        }
      } catch {
        // Ignore errors
      }
    }
  }

  // ==================== ADD NEW FIREWALL SERVER MODAL METHODS ====================

  /**
   * Clicks the Add Server button to open Add New Firewall Server modal
   */
  async clickAddServerButton() {
    try {
      // Wait for button to be visible and actionable
      await this.addServerButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addServerButton.waitFor({ state: 'attached', timeout: 5000 });
      await this.addServerButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Check if button is enabled
      const isEnabled = await this.addServerButton.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Add Server button is disabled');
      }
      
      // Check if button is actually in viewport
      const boundingBox = await this.addServerButton.boundingBox().catch(() => null);
      if (!boundingBox) {
        throw new Error('Add Server button is not in viewport');
      }
      
      // Wait for any overlays or loading states to clear
      await this.page.waitForTimeout(300);
      
      // Try clicking the button - use multiple strategies
      let clickAttempted = false;
      try {
        // First try normal click with wait for actionability
        await this.addServerButton.click({ timeout: 5000, noWaitAfter: false });
        clickAttempted = true;
      } catch (clickError) {
        // If normal click fails, try force click
        try {
          await this.addServerButton.click({ force: true, timeout: 5000, noWaitAfter: false });
          clickAttempted = true;
        } catch (forceError) {
          // If force click fails, try JavaScript click
          try {
            await this.addServerButton.evaluate(el => {
              // Trigger both click and mousedown/mouseup events
              el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
              el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
              el.click();
            });
            clickAttempted = true;
          } catch (jsError) {
            throw new Error(`All click methods failed. Normal: ${clickError.message}, Force: ${forceError.message}, JS: ${jsError.message}`);
          }
        }
      }
      
      if (!clickAttempted) {
        throw new Error('Button click did not register');
      }
      
      // Wait a moment for click to register
      await this.page.waitForTimeout(500);
      
      // Wait for modal to appear - check for title or form field with polling
      let modalAppeared = false;
      for (let i = 0; i < 20; i++) {
        await this.page.waitForTimeout(300);
        
        // Check if modal title is visible
        const isTitleVisible = await this.addNewFirewallServerModalTitle.isVisible({ timeout: 200 }).catch(() => false);
        if (isTitleVisible) {
          modalAppeared = true;
          break;
        }
        
        // Check if form field is visible (most reliable)
        const isFieldVisible = await this.fullNameField.isVisible({ timeout: 200 }).catch(() => false);
        if (isFieldVisible) {
          modalAppeared = true;
          break;
        }
        
        // Check if modal section is visible
        const isModalVisible = await this.addNewFirewallServerModal.isVisible({ timeout: 200 }).catch(() => false);
        if (isModalVisible) {
          modalAppeared = true;
          break;
        }
        
        // Check if submit button is visible (indicates modal is open)
        const isSubmitVisible = await this.addFirewallServerSubmitButton.isVisible({ timeout: 200 }).catch(() => false);
        if (isSubmitVisible) {
          modalAppeared = true;
          break;
        }
      }
      
      if (!modalAppeared) {
        // Wait a bit more and check one last time with longer timeout
        await this.page.waitForTimeout(2000);
        const finalCheck = await Promise.race([
          this.fullNameField.isVisible({ timeout: 3000 }).catch(() => false),
          this.addNewFirewallServerModalTitle.isVisible({ timeout: 3000 }).catch(() => false),
          this.addFirewallServerSubmitButton.isVisible({ timeout: 3000 }).catch(() => false)
        ]);
        
        if (!finalCheck) {
          // Check if button is still there (maybe it was clicked but modal didn't open)
          const buttonStillVisible = await this.addServerButton.isVisible({ timeout: 1000 }).catch(() => false);
          throw new Error(`Modal did not appear after clicking Add Server button. Button still visible: ${buttonStillVisible}`);
        }
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click Add Server button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add New Firewall Server modal is open
   * @returns {Promise<boolean>}
   */
  async isAddNewFirewallServerModalOpen() {
    try {
      // First check if any form field is visible (most reliable indicator)
      const isFormFieldVisible = await this.fullNameField.isVisible({ timeout: 3000 }).catch(() => false);
      if (isFormFieldVisible) {
        return true;
      }
      
      // Check if modal title is visible
      const isTitleVisible = await this.addNewFirewallServerModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      if (isTitleVisible) {
        return true;
      }
      
      // Check if modal section is visible
      const isModalVisible = await this.addNewFirewallServerModal.isVisible({ timeout: 2000 }).catch(() => false);
      if (isModalVisible) {
        return true;
      }
      
      // Last resort: Check if submit button is visible (indicates modal is open)
      const isSubmitVisible = await this.addFirewallServerSubmitButton.isVisible({ timeout: 2000 }).catch(() => false);
      return isSubmitVisible;
    } catch {
      return false;
    }
  }

  /**
   * Fills a field only if it's empty (leaves pre-filled values)
   * @param {import('@playwright/test').Locator} field - The field locator
   * @param {string} value - The value to fill
   */
  async fillFieldIfEmpty(field, value) {
    try {
      await field.waitFor({ state: 'visible', timeout: 5000 });
      await field.scrollIntoViewIfNeeded();
      const currentValue = await field.inputValue().catch(() => '');
      if (!currentValue || currentValue.trim() === '') {
        await field.clear();
        await field.fill(value);
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      // Field might not exist or be visible, ignore
      console.log(`Warning: Could not fill field: ${error.message}`);
    }
  }

  /**
   * Gets the current value of a field
   * @param {import('@playwright/test').Locator} field - The field locator
   * @returns {Promise<string>}
   */
  async getFieldValue(field) {
    try {
      // For textarea, use textContent instead of inputValue
      const tagName = await field.evaluate(el => el.tagName.toLowerCase()).catch(() => 'input');
      if (tagName === 'textarea') {
        return await field.inputValue().catch(() => '');
      }
      return await field.inputValue().catch(() => '');
    } catch {
      return '';
    }
  }

  /**
   * Fills empty required fields in Add New Firewall Server form (leaves pre-filled fields)
   * @param {Object} formData - Object with field values
   */
  async fillAddNewFirewallServerForm(formData) {
    try {
      // Fill text fields only if empty
      if (formData.fullName) {
        await this.fillFieldIfEmpty(this.fullNameField, formData.fullName);
      }
      if (formData.hostname) {
        await this.fillFieldIfEmpty(this.hostnameField, formData.hostname);
      }
      if (formData.ipAddress) {
        await this.fillFieldIfEmpty(this.ipAddressField, formData.ipAddress);
      }
      if (formData.publicIp) {
        await this.fillFieldIfEmpty(this.publicIpField, formData.publicIp);
      }
      if (formData.rdpPort) {
        await this.fillFieldIfEmpty(this.rdpPortField, formData.rdpPort);
      }
      if (formData.description) {
        await this.fillFieldIfEmpty(this.descriptionField, formData.description);
      }
      if (formData.port) {
        await this.fillFieldIfEmpty(this.portField, formData.port);
      }
      
      // Note: RAM, CPU, Storage are left as they are (pre-filled values are kept)
    } catch (error) {
      throw new Error(`Failed to fill Add New Firewall Server form: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in Add New Firewall Server modal
   */
  async clickSubmitButton() {
    try {
      await this.addFirewallServerSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addFirewallServerSubmitButton.scrollIntoViewIfNeeded();
      await this.addFirewallServerSubmitButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Closes the Add New Firewall Server modal by clicking Cancel button
   */
  async closeAddNewFirewallServerModal() {
    try {
      const cancelButton = this.addFirewallServerCancelButton;
      const isCancelVisible = await cancelButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isCancelVisible) {
        await cancelButton.click();
        await this.page.waitForTimeout(500);
      } else {
        // Try pressing Escape key
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      // Wait for modal to close
      await this.page.waitForTimeout(500);
    } catch (error) {
      // If closing fails, try pressing Escape as fallback
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch {
        // Ignore errors
      }
    }
  }

  /**
   * Verifies if a firewall server with the given name exists in the table
   * @param {string} serverName - The name of the firewall server to verify
   * @returns {Promise<boolean>}
   */
  async verifyServerInTable(serverName) {
    try {
      const rowCount = await this.allTableRows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        
        // Try to get text from link first, then fallback to cell
        const nameLink = nameCell.locator('a').first();
        const isLinkVisible = await nameLink.isVisible({ timeout: 500 }).catch(() => false);
        
        let cellText = '';
        if (isLinkVisible) {
          cellText = await nameLink.textContent();
        } else {
          cellText = await nameCell.textContent();
        }
        
        if (cellText && cellText.trim().toLowerCase().includes(serverName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }
}

module.exports = { FirewallServerPage };

