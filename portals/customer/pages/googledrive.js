class GoogleDrivePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.googleDriveMenu = page.locator('a:has-text("Google Drive"), button:has-text("Google Drive"), a[href*="google-drive"], a[href*="googledrive"]').first();
    
    // Page wrapper
    this.googleDriveWrapper = page.locator('.google-drive-wrapper, .google-drive, [class*="google-drive"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("Google Drive"), .header-left:has-text("Google Drive"), h1:has-text("Google Drive"), h2:has-text("Google Drive")').first();
    this.pageTitle = page.locator('h6.page-title-modern:has-text("Google Drive"), h1:has-text("Google Drive"), h2:has-text("Google Drive")').first();
    
    // Delete Configuration button
    this.deleteConfigurationButton = page.locator('button:has-text("Delete Configuration"), button.btn-primary-modern:has-text("Delete Configuration"), button.btn-danger:has-text("Delete Configuration")').first();
    
    // Delete Configuration Confirmation Modal
    this.deleteConfirmationModal = page.locator('.modal:has-text("Delete"), .modal:has-text("Are you sure"), .modal:has-text("confirm"), [class*="delete-modal"], [class*="confirmation-modal"], .modal-dialog:has-text("Delete")').first();
    this.deleteConfirmationDeleteButton = page.locator('.modal button:has-text("Delete"):not(:has-text("Configuration")), .modal-dialog button:has-text("Delete"), button.btn-primary:has-text("Delete"), button.btn-danger:has-text("Delete"), button:has-text("Delete"):not(:has-text("Configuration"))').first();
    this.deleteConfirmationCancelButton = page.locator('.modal button:has-text("Cancel"), .modal-dialog button:has-text("Cancel"), button.btn-secondary:has-text("Cancel"), button:has-text("No")').first();
    
    // Add Scheduler button
    this.addSchedulerButton = page.locator('button:has-text("Add Scheduler"), button.btn-primary-modern:has-text("Add Scheduler"), button:has-text("Add Schedule")').first();
    
    // Update Scheduler button
    this.updateSchedulerButton = page.locator('button.btn-primary-modern.fs-6:has-text("Update Scheduler"), button:has-text("Update Scheduler")').first();
    
    // Add Schedule Modal
    this.addScheduleModal = page.locator('div.common-modal.modern-modal-schedule:has-text("Add Schedule"), .modal:has-text("Add Schedule"), div.common-modal:has(h5:has-text("Add Schedule"))').first();
    this.addScheduleModalTitle = page.locator('h5.modal-title-modern:has-text("Add Schedule"), .modal-header:has-text("Add Schedule")').first();
    
    // Update Schedule Modal
    this.updateScheduleModal = page.locator('div.common-modal.modern-modal-schedule, .modal:has-text("Update Schedule"), [class*="modal-schedule"]').first();
    this.updateScheduleModalTitle = page.locator('h5.modal-title-modern:has-text("Update Schedule"), .modal-header:has-text("Update Schedule")').first();
    
    // Form fields in modal
    this.folderDropdown = page.locator('select[formcontrolname="folderPath"], select#folderPath').first();
    this.timeDropdown = page.locator('select[formcontrolname="rangeId"], select#rangeId').first();
    this.scheduleTypeField = page.locator('input[formcontrolname="scheduleType"]').first();
    this.dataRetentionField = page.locator('input[formcontrolname="retentionPeriod"], input[type="number"][formcontrolname="retentionPeriod"]').first();
    this.passwordDropdown = page.locator('select[formcontrolname="password"], select#password').first();
    this.successEmailCheckbox = page.locator('input[formcontrolname="successEmail"], input#successEmail').first();
    this.failureEmailCheckbox = page.locator('input[formcontrolname="failureEmail"], input#failureEmail').first();
    
    // Modal buttons
    this.submitButton = page.locator('button.btn-modal-primary:has-text("Submit"), button:has-text("Submit"):not(:has-text("Cancel"))').first();
    this.cancelButton = page.locator('button.btn-modal-secondary:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Scheduler Details Section
    this.schedulerDetailsSection = page.locator('.scheduler-details, [class*="scheduler-details"], .row:has-text("Task Name")').first();
    this.taskNameDetail = page.locator('p.detail-item:has(b.details:has-text("Task Name"))').first();
    this.dataRetentionDetail = page.locator('p.detail-item:has(b.details:has-text("Data Retention"))').first();
    this.passwordDetail = page.locator('p.detail-item:has(b.details:has-text("Password"))').first();
    this.lastExecutedDetail = page.locator('p.detail-item:has(b.details:has-text("Last Executed"))').first();
    this.fileNameDetail = page.locator('p.detail-item:has(b.details:has-text("File Name"))').first();
    this.scheduleTimeDetail = page.locator('p.detail-item:has(b.details:has-text("Schedule Time"))').first();
    this.emailOnDetail = page.locator('p.detail-item:has(b.details:has-text("Email On"))').first();
  }

  /**
   * Navigates to Google Drive page
   */
  async gotoGoogleDrive() {
    try {
      // Try clicking on Google Drive menu
      const menuVisible = await this.googleDriveMenu.isVisible({ timeout: 5000 }).catch(() => false);
      if (menuVisible) {
        await this.googleDriveMenu.click();
        await this.page.waitForTimeout(2000);
      } else {
        // If menu not found, try navigating directly
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/google-drive`);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      // Fallback: navigate directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/google-drive`);
      await this.page.waitForTimeout(2000);
    }
    
    // Wait for page to load
    await Promise.race([
      this.googleDriveWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Google Drive page is visible
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.googleDriveWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Delete Configuration button is visible
   * @returns {Promise<boolean>}
   */
  async isDeleteConfigurationButtonVisible() {
    try {
      return await this.deleteConfigurationButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Delete Configuration button
   */
  async clickDeleteConfiguration() {
    try {
      await this.deleteConfigurationButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.deleteConfigurationButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.deleteConfigurationButton.click();
      await this.page.waitForTimeout(2000); // Wait for confirmation modal to open
    } catch (error) {
      throw new Error(`Failed to click Delete Configuration button: ${error.message}`);
    }
  }

  /**
   * Checks if Delete Configuration confirmation modal is open
   * @returns {Promise<boolean>}
   */
  async isDeleteConfirmationModalOpen() {
    try {
      const modalVisible = await this.deleteConfirmationModal.isVisible({ timeout: 3000 }).catch(() => false);
      const deleteButtonVisible = await this.deleteConfirmationDeleteButton.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible || deleteButtonVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks Delete button in the Delete Configuration confirmation modal
   */
  async clickDeleteConfirmationDelete() {
    try {
      // Wait for modal to be fully visible
      await this.page.waitForTimeout(1000);
      
      // First, ensure modal is visible
      const modalVisible = await this.deleteConfirmationModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (!modalVisible) {
        // Try alternative modal locators
        const altModal = this.page.locator('.modal.show, .modal-dialog.show, [class*="modal"][style*="display: block"]').first();
        await altModal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      }
      
      // Try multiple locator strategies with better scoping
      let deleteButton = null;
      const locators = [
        // Scoped to modal
        this.page.locator('.modal.show button:has-text("Delete"):not(:has-text("Configuration"))'),
        this.page.locator('.modal-dialog.show button:has-text("Delete"):not(:has-text("Configuration"))'),
        this.page.locator('.modal button.btn-primary:has-text("Delete")'),
        this.page.locator('.modal button.btn-danger:has-text("Delete")'),
        this.page.locator('.modal-footer button:has-text("Delete")'),
        // Original locator
        this.deleteConfirmationDeleteButton,
        // Fallback: any button with Delete text (excluding the main Delete Configuration button)
        this.page.locator('button:has-text("Delete"):not(:has-text("Configuration"))').filter({ 
          hasNot: this.deleteConfigurationButton 
        })
      ];
      
      for (let i = 0; i < locators.length; i++) {
        try {
          const locator = locators[i];
          const count = await locator.count();
          if (count > 0) {
            const isVisible = await locator.first().isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              deleteButton = locator.first();
              break;
            }
          }
        } catch (error) {
          continue;
        }
      }
      
      if (!deleteButton) {
        // Last resort: find all buttons in modal and filter for Delete
        const allModalButtons = this.page.locator('.modal button, .modal-dialog button');
        const count = await allModalButtons.count();
        for (let i = 0; i < count; i++) {
          const button = allModalButtons.nth(i);
          const text = await button.textContent().catch(() => '');
          if (text && text.trim() === 'Delete' && !text.includes('Configuration')) {
            deleteButton = button;
            break;
          }
        }
      }
      
      if (!deleteButton) {
        throw new Error('Delete button not found in confirmation modal');
      }
      
      await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
      await deleteButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Try normal click first, then force click if needed
      try {
        await deleteButton.click({ timeout: 5000 });
      } catch (error) {
        // If normal click fails, try force click
        await deleteButton.click({ force: true, timeout: 5000 });
      }
      
      await this.page.waitForTimeout(3000); // Wait for deletion to complete and modal to close
    } catch (error) {
      throw new Error(`Failed to click Delete button in delete confirmation modal: ${error.message}`);
    }
  }

  /**
   * Checks if Add Scheduler button is visible
   * @returns {Promise<boolean>}
   */
  async isAddSchedulerButtonVisible() {
    try {
      return await this.addSchedulerButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Add Scheduler button
   */
  async clickAddScheduler() {
    try {
      await this.addSchedulerButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addSchedulerButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.addSchedulerButton.click();
      await this.page.waitForTimeout(2000); // Wait for modal to open
      
      // Wait for form fields to be ready in the modal
      await this.waitForFormFieldsReady();
    } catch (error) {
      throw new Error(`Failed to click Add Scheduler button: ${error.message}`);
    }
  }

  /**
   * Waits for form fields to be ready in the modal
   */
  async waitForFormFieldsReady() {
    try {
      // Wait for at least one form field to be visible
      await Promise.race([
        this.folderDropdown.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}),
        this.timeDropdown.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}),
        this.dataRetentionField.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {})
      ]);
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Continue even if fields are not immediately visible
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Checks if Add Schedule modal is open
   * @returns {Promise<boolean>}
   */
  async isAddScheduleModalOpen() {
    try {
      const modalVisible = await this.addScheduleModal.isVisible({ timeout: 3000 }).catch(() => false);
      const titleVisible = await this.addScheduleModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible || titleVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Update Scheduler button is visible
   * @returns {Promise<boolean>}
   */
  async isUpdateSchedulerButtonVisible() {
    try {
      return await this.updateSchedulerButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Update Scheduler button
   */
  async clickUpdateScheduler() {
    try {
      await this.updateSchedulerButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.updateSchedulerButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.updateSchedulerButton.click();
      await this.page.waitForTimeout(2000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click Update Scheduler button: ${error.message}`);
    }
  }

  /**
   * Checks if Update Schedule modal is open
   * @returns {Promise<boolean>}
   */
  async isUpdateScheduleModalOpen() {
    try {
      const modalVisible = await this.updateScheduleModal.isVisible({ timeout: 3000 }).catch(() => false);
      const titleVisible = await this.updateScheduleModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible || titleVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects folder from dropdown
   * @param {string} folderName - Folder name to select (e.g., "Full Drive", "Data", "Export", "Tally")
   */
  async selectFolder(folderName) {
    try {
      // Wait for dropdown to be visible and enabled
      await this.folderDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.folderDropdown.waitFor({ state: 'attached', timeout: 5000 });
      
      // Check if dropdown is enabled
      const isEnabled = await this.folderDropdown.isEnabled().catch(() => false);
      if (!isEnabled) {
        await this.page.waitForTimeout(1000);
      }
      
      // Try selecting by value first, then by label
      try {
        await this.folderDropdown.selectOption({ value: folderName });
      } catch (error) {
        await this.folderDropdown.selectOption({ label: folderName });
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select folder "${folderName}": ${error.message}`);
    }
  }

  /**
   * Selects time from dropdown
   * @param {string} timeRange - Time range to select (e.g., "10PM - 11PM", "11PM - 12AM")
   */
  async selectTime(timeRange) {
    try {
      // Wait for dropdown to be visible and enabled
      await this.timeDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.timeDropdown.waitFor({ state: 'attached', timeout: 5000 });
      
      // Check if dropdown is enabled
      const isEnabled = await this.timeDropdown.isEnabled().catch(() => false);
      if (!isEnabled) {
        await this.page.waitForTimeout(1000);
      }
      
      // Try selecting by label (trimmed to handle whitespace)
      const trimmedTimeRange = timeRange.trim();
      await this.timeDropdown.selectOption({ label: trimmedTimeRange });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select time "${timeRange}": ${error.message}`);
    }
  }

  /**
   * Fills data retention period
   * @param {string|number} days - Number of days for data retention
   */
  async fillDataRetentionPeriod(days) {
    try {
      // Wait for field to be visible and enabled
      await this.dataRetentionField.waitFor({ state: 'visible', timeout: 10000 });
      await this.dataRetentionField.waitFor({ state: 'attached', timeout: 5000 });
      
      // Check if field is enabled
      const isEnabled = await this.dataRetentionField.isEnabled().catch(() => false);
      if (!isEnabled) {
        await this.page.waitForTimeout(1000);
      }
      
      await this.dataRetentionField.clear({ timeout: 5000 });
      await this.page.waitForTimeout(300);
      await this.dataRetentionField.fill(String(days), { timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill data retention period: ${error.message}`);
    }
  }

  /**
   * Selects password option
   * @param {string} option - "Enable" or "Disable"
   */
  async selectPassword(option) {
    try {
      // Wait for dropdown to be visible and enabled
      await this.passwordDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.passwordDropdown.waitFor({ state: 'attached', timeout: 5000 });
      
      // Check if dropdown is enabled
      const isEnabled = await this.passwordDropdown.isEnabled().catch(() => false);
      if (!isEnabled) {
        await this.page.waitForTimeout(1000);
      }
      
      const value = option.toLowerCase() === 'enable' ? 'enable' : 'disable';
      await this.passwordDropdown.selectOption({ value: value });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select password option "${option}": ${error.message}`);
    }
  }

  /**
   * Sets email notification checkboxes
   * @param {Object} options - Object with success and failure boolean values
   * @param {boolean} options.success - Whether to check Success email checkbox
   * @param {boolean} options.failure - Whether to check Failure email checkbox
   */
  async setEmailNotifications(options) {
    try {
      if (options.success !== undefined) {
        await this.successEmailCheckbox.waitFor({ state: 'visible', timeout: 5000 });
        if (options.success) {
          await this.successEmailCheckbox.check();
        } else {
          await this.successEmailCheckbox.uncheck();
        }
        await this.page.waitForTimeout(300);
      }
      
      if (options.failure !== undefined) {
        await this.failureEmailCheckbox.waitFor({ state: 'visible', timeout: 5000 });
        if (options.failure) {
          await this.failureEmailCheckbox.check();
        } else {
          await this.failureEmailCheckbox.uncheck();
        }
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      throw new Error(`Failed to set email notifications: ${error.message}`);
    }
  }

  /**
   * Clicks Submit button in the modal
   */
  async clickSubmit() {
    try {
      await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.submitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.submitButton.click();
      await this.page.waitForTimeout(2000); // Wait for modal to close
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Clicks Cancel button in the modal
   */
  async clickCancel() {
    try {
      await this.cancelButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cancelButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // Ignore if cancel button not found
    }
  }

  /**
   * Gets scheduler details from the scheduler details section
   * @returns {Promise<Object>}
   */
  async getSchedulerDetails() {
    try {
      await this.page.waitForTimeout(1000);
      
      const details = {};
      
      // Get Task Name
      const taskNameText = await this.taskNameDetail.textContent().catch(() => '');
      if (taskNameText) {
        const match = taskNameText.match(/Task Name:\s*(.+)/);
        if (match) {
          details.taskName = match[1].trim();
        }
      }
      
      // Get Data Retention
      const dataRetentionText = await this.dataRetentionDetail.textContent().catch(() => '');
      if (dataRetentionText) {
        const match = dataRetentionText.match(/Data Retention[^:]*:\s*(\d+)/);
        if (match) {
          details.dataRetention = match[1].trim();
        }
      }
      
      // Get Password
      const passwordText = await this.passwordDetail.textContent().catch(() => '');
      if (passwordText) {
        const match = passwordText.match(/Password:\s*(.+)/);
        if (match) {
          details.password = match[1].trim();
        }
      }
      
      // Get Last Executed
      const lastExecutedText = await this.lastExecutedDetail.textContent().catch(() => '');
      if (lastExecutedText) {
        const match = lastExecutedText.match(/Last Executed:\s*(.+)/);
        if (match) {
          details.lastExecuted = match[1].trim();
        }
      }
      
      // Get File Name
      const fileNameText = await this.fileNameDetail.textContent().catch(() => '');
      if (fileNameText) {
        const match = fileNameText.match(/File Name:\s*(.+)/);
        if (match) {
          details.fileName = match[1].trim();
        }
      }
      
      // Get Schedule Time
      const scheduleTimeText = await this.scheduleTimeDetail.textContent().catch(() => '');
      if (scheduleTimeText) {
        const match = scheduleTimeText.match(/Schedule Time:\s*(.+)/);
        if (match) {
          details.scheduleTime = match[1].trim();
        }
      }
      
      // Get Email On
      const emailOnText = await this.emailOnDetail.textContent().catch(() => '');
      if (emailOnText) {
        const match = emailOnText.match(/Email On:\s*(.+)/);
        if (match) {
          details.emailOn = match[1].trim();
        }
      }
      
      return details;
    } catch (error) {
      return {};
    }
  }
}

module.exports = { GoogleDrivePage };

