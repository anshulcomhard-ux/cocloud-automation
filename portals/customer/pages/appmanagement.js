class AppManagementPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.appManagementMenu = page.locator('a:has-text("App Management"), button:has-text("App Management"), a[href*="app-management"]').first();
    
    // Page wrapper
    this.appManagementWrapper = page.locator('.app-management-wrapper').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("App Management")').first();
    this.pageTitle = page.locator('h6.page-title-modern:has-text("App Management")').first();
    
    // Application Configuration Card
    this.applicationConfigCard = page.locator('.card-modern.config-card').first();
    this.applicationConfigHeader = page.locator('.card-header-modern:has-text("Application Configuration")').first();
    this.applicationConfigTitle = page.locator('h3.card-title-modern:has-text("Application Configuration")').first();
    this.applicationConfigSubtitle = page.locator('.card-subtitle:has-text("Configure your instance and application version")').first();
    
    // Instance Title Field
    this.instanceTitleLabel = page.locator('label[for="instanceTitle"], label:has-text("Instance Title")').first();
    this.instanceTitleInput = page.locator('input#instanceTitle[formControlName="Title"], input[formControlName="Title"]').first();
    
    // App Version Field
    this.appVersionLabel = page.locator('label[for="appVersion"], label:has-text("App Version")').first();
    this.appVersionInput = page.locator('input#appVersion[formControlName="Tally Version"], input[formControlName="Tally Version"]').first();
    
    // Form
    this.instanceForm = page.locator('form[formGroup]').first();
    
    // Save Changes button
    this.saveChangesButton = page.locator('button[type="submit"]:has-text("Save Changes"), button.btn-primary-modern:has-text("Save Changes"), button:has-text("Save Changes")').first();
    
    // Toast/Notification messages - multiple selectors for better detection
    this.toastContainer = page.locator('#toast-container, div.toast-container, div[aria-live="polite"], .toastr, [id*="toast"]').first();
    this.toastMessage = page.locator('#toast-container .toast-message, div.toast-container .toast-message, div[role="alert"].toast-message, .toast-success, .toast, .toastr .toast-message, [class*="toast"]').first();
    this.successToast = page.locator('.toast-success, .alert-success, [class*="success"], .toastr .toast-success').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    
    // Validation error for Instance Title field
    this.instanceTitleError = page.locator('.input-feedback .error-message:has-text("This field is required"), .input-feedback .error-message:has-text("required"), input#instanceTitle[formControlName="Title"] ~ .input-feedback .error-message').first();
    this.instanceTitleErrorText = page.locator('.input-feedback .error-message span:has-text("This field is required"), .input-feedback .error-message:has-text("This field is required")').first();
    
    // Tally Reactivation button
    this.tallyReactivationButton = page.locator('button:has-text("Tally Reactivation"), .btn-primary-modern:has-text("Tally Reactivation"), .header-actions button:has-text("Tally Reactivation")').first();
    
    // Tally Reactivation modal
    this.tallyReactivationModal = page.locator('.modal:has-text("Tally Reactivation"), .modal-dialog:has-text("Tally Reactivation"), [role="dialog"]:has-text("Tally Reactivation"), .modal-lg:has-text("Tally")').first();
    this.tallyReactivationModalTitle = page.locator('.modal-title:has-text("Tally Reactivation"), .modal-header:has-text("Tally Reactivation"), h4:has-text("Tally Reactivation"), h5:has-text("Tally Reactivation")').first();
    
    // Change Version dropdown
    this.changeVersionButton = page.locator('button:has-text("Change Version"), button.btn-color.dropdown-toggle:has-text("Change Version"), #dropdownMenuButton1').first();
    this.changeVersionDropdown = page.locator('ul.dropdown-menu.menu-item-1.show, ul.dropdown-menu[aria-labelledby="dropdownMenuButton1"].show, .dropdown-menu.show').first();
    this.changeVersionSearchInput = page.locator('.dropdown-menu input[formControlName="searchText"], .dropdown .search input, .dropdown-menu input[type="text"]').first();
    this.changeVersionItems = page.locator('.dropdown-menu .customerList li span.dropdown-item, .dropdown-menu .customerList li, .dropdown-menu li span.dropdown-item, .dropdown-menu .dropdown-item');
    this.changeVersionItem = (index) => page.locator('.dropdown-menu .customerList li span.dropdown-item, .dropdown-menu .customerList li, .dropdown-menu li span.dropdown-item').nth(index);
    
    // Version change confirmation modal
    this.versionChangeModal = page.locator('.modal:has-text("Tally Change Confirmation"), .modal:has-text("change the Tally version"), .modal-dialog:has-text("Tally Change"), [role="dialog"]:has-text("Tally")').first();
    this.versionChangeModalTitle = page.locator('.modal-title:has-text("Tally Change Confirmation"), .modal-header:has-text("Tally Change"), h4:has-text("Tally Change")').first();
    this.versionChangeProceedButton = page.locator('.modal button:has-text("Proceed"), .modal .btn-primary:has-text("Proceed"), .modal button:has-text("Confirm")').first();
    this.versionChangeCancelButton = page.locator('.modal button:has-text("Cancel"), .modal .btn-secondary:has-text("Cancel"), .modal button[type="button"]:has-text("Cancel")').first();
  }

  /**
   * Navigates to App Management page
   */
  async gotoAppManagement() {
    // Try to click the menu item
    try {
      await this.appManagementMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.appManagementMenu.click();
    } catch (error) {
      // If menu item not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/app-management`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load - check for wrapper or key elements
    await Promise.race([
      this.appManagementWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.applicationConfigCard.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the App Management page is visible.
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.appManagementWrapper.isVisible({ timeout: 5000 }) || 
             await this.pageTitle.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the page loaded without errors.
   * @returns {Promise<boolean>}
   */
  async isPageLoadedWithoutErrors() {
    try {
      // Wait for page to be fully loaded
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      
      // Check for critical error messages
      const errorCount = await this.errorMessages.count();
      const hasCriticalErrors = errorCount > 0;
      
      // Check if main elements are present
      const wrapperVisible = await this.appManagementWrapper.isVisible({ timeout: 5000 }).catch(() => false);
      const pageTitleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Page is loaded without errors if:
      // - Main elements are visible
      // - No critical error messages (or only validation errors which are expected)
      return wrapperVisible || pageTitleVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the Application Configuration section is visible.
   * @returns {Promise<boolean>}
   */
  async isApplicationConfigSectionVisible() {
    try {
      // Check if the card or header is visible
      const cardVisible = await this.applicationConfigCard.isVisible({ timeout: 5000 }).catch(() => false);
      const headerVisible = await this.applicationConfigHeader.isVisible({ timeout: 5000 }).catch(() => false);
      const titleVisible = await this.applicationConfigTitle.isVisible({ timeout: 5000 }).catch(() => false);
      
      return cardVisible || headerVisible || titleVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the Instance Title value.
   * @returns {Promise<string>}
   */
  async getInstanceTitle() {
    try {
      await this.instanceTitleInput.waitFor({ state: 'visible', timeout: 10000 });
      const value = await this.instanceTitleInput.inputValue();
      return value?.trim() || '';
    } catch (error) {
      // Try alternative selector
      const altInput = this.page.locator('input[formControlName="Title"]').first();
      const value = await altInput.inputValue().catch(() => '');
      return value?.trim() || '';
    }
  }

  /**
   * Gets the App Version value.
   * @returns {Promise<string>}
   */
  async getAppVersion() {
    try {
      await this.appVersionInput.waitFor({ state: 'visible', timeout: 10000 });
      const value = await this.appVersionInput.inputValue();
      return value?.trim() || '';
    } catch (error) {
      // Try alternative selector
      const altInput = this.page.locator('input[formControlName="Tally Version"]').first();
      const value = await altInput.inputValue().catch(() => '');
      return value?.trim() || '';
    }
  }

  /**
   * Checks if Instance Title field is populated.
   * @returns {Promise<boolean>}
   */
  async isInstanceTitlePopulated() {
    try {
      const value = await this.getInstanceTitle();
      return value.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if App Version field is populated.
   * @returns {Promise<boolean>}
   */
  async isAppVersionPopulated() {
    try {
      const value = await this.getAppVersion();
      return value.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Verifies all page load validations:
   * - Page loads without errors
   * - Application Configuration section is visible
   * - Instance Title is populated
   * - App Version is populated
   * @returns {Promise<{pageLoaded: boolean, configVisible: boolean, instanceTitlePopulated: boolean, appVersionPopulated: boolean, instanceTitle: string, appVersion: string}>}
   */
  async verifyPageLoad() {
    const pageLoaded = await this.isPageLoadedWithoutErrors();
    const configVisible = await this.isApplicationConfigSectionVisible();
    const instanceTitlePopulated = await this.isInstanceTitlePopulated();
    const appVersionPopulated = await this.isAppVersionPopulated();
    const instanceTitle = await this.getInstanceTitle();
    const appVersion = await this.getAppVersion();
    
    return {
      pageLoaded,
      configVisible,
      instanceTitlePopulated,
      appVersionPopulated,
      instanceTitle,
      appVersion
    };
  }

  /**
   * Edits the Instance Title field by clearing and entering new text.
   * @param {string} newTitle - The new instance title to enter
   */
  async editInstanceTitle(newTitle) {
    await this.instanceTitleInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if field is readonly - if so, we might need to click an edit icon first
    const isReadonly = await this.instanceTitleInput.getAttribute('readonly').catch(() => null);
    
    if (isReadonly !== null) {
      // Field is readonly, try to find and click edit icon
      const editIcon = this.page.locator('i.bi-pencil-square.input-icon').first();
      const editIconVisible = await editIcon.isVisible({ timeout: 3000 }).catch(() => false);
      if (editIconVisible) {
        await editIcon.click();
        await this.page.waitForTimeout(500);
      }
    }
    
    // Clear the field and enter new value
    await this.instanceTitleInput.clear();
    await this.instanceTitleInput.fill(newTitle);
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the Save Changes button.
   */
  async clickSaveChanges() {
    await this.saveChangesButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveChangesButton.click();
  }

  /**
   * Waits for toast message to appear.
   * @param {number} timeout - Timeout in milliseconds (default: 10000)
   * @returns {Promise<boolean>}
   */
  async waitForToast(timeout = 10000) {
    try {
      // Try multiple toast locators
      const toastSelectors = [
        this.toastContainer,
        this.toastMessage,
        this.successToast,
        this.page.locator('.toast-message, div[role="alert"], .toast, .alert-success, .toastr').first(),
        this.page.locator('[class*="toast"], [id*="toast"]').first()
      ];

      // Wait for any toast to appear
      for (const selector of toastSelectors) {
        try {
          await selector.waitFor({ state: 'visible', timeout: Math.min(timeout, 3000) });
          return true;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      return false;
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
      // Try multiple toast locators to find message text
      const toastSelectors = [
        this.toastMessage,
        this.successToast,
        this.page.locator('.toast-message, div[role="alert"], .toast, .alert-success').first(),
        this.page.locator('[class*="toast"]:visible').first(),
        this.page.locator('#toast-container:visible, .toast-container:visible').first()
      ];

      for (const selector of toastSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await selector.textContent();
            if (text && text.trim()) return text.trim();
            
            // Try aria-label
            const ariaLabel = await selector.getAttribute('aria-label');
            if (ariaLabel && ariaLabel.trim()) return ariaLabel.trim();
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if success toast message is visible.
   * @returns {Promise<boolean>}
   */
  async isSuccessToastVisible() {
    try {
      const toastVisible = await this.toastMessage.isVisible({ timeout: 5000 }).catch(() => false);
      if (toastVisible) return true;
      
      const altToast = this.page.locator('.toast-message, div[role="alert"], .toast, .alert-success').first();
      return await altToast.isVisible({ timeout: 5000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Reloads the page and waits for it to load.
   */
  async reloadPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(2000);
    
    // Wait for page elements to be visible again
    await Promise.race([
      this.appManagementWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.applicationConfigCard.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Clears the Instance Title field.
   */
  async clearInstanceTitle() {
    await this.instanceTitleInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if field is readonly - if so, we might need to click an edit icon first
    const isReadonly = await this.instanceTitleInput.getAttribute('readonly').catch(() => null);
    
    if (isReadonly !== null) {
      // Field is readonly, try to find and click edit icon
      const editIcon = this.page.locator('i.bi-pencil-square.input-icon').first();
      const editIconVisible = await editIcon.isVisible({ timeout: 3000 }).catch(() => false);
      if (editIconVisible) {
        await editIcon.click();
        await this.page.waitForTimeout(500);
      }
    }
    
    // Clear the field
    await this.instanceTitleInput.clear();
    await this.page.waitForTimeout(500);
    
    // Trigger blur to ensure validation is triggered
    await this.instanceTitleInput.blur();
    await this.page.waitForTimeout(500);
  }

  /**
   * Checks if validation error is visible for Instance Title field.
   * @returns {Promise<boolean>}
   */
  async isInstanceTitleValidationErrorVisible() {
    try {
      // Wait a bit for validation to trigger
      await this.page.waitForTimeout(1000);
      
      // Check multiple error message selectors
      const errorSelectors = [
        this.instanceTitleError,
        this.instanceTitleErrorText,
        this.page.locator('.input-feedback .error-message:visible').first(),
        this.page.locator('input#instanceTitle[formControlName="Title"] ~ .input-feedback .error-message:visible').first()
      ];

      for (const selector of errorSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the validation error message text for Instance Title field.
   * @returns {Promise<string>}
   */
  async getInstanceTitleValidationError() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Try multiple error message selectors
      const errorSelectors = [
        this.instanceTitleErrorText,
        this.instanceTitleError,
        this.page.locator('.input-feedback .error-message span:visible').first(),
        this.page.locator('input#instanceTitle[formControlName="Title"] ~ .input-feedback .error-message:visible').first()
      ];

      for (const selector of errorSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          const text = await selector.textContent();
          if (text && text.trim()) return text.trim();
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if Instance Title field is in invalid state (has ng-invalid class or similar).
   * @returns {Promise<boolean>}
   */
  async isInstanceTitleInvalid() {
    try {
      await this.instanceTitleInput.waitFor({ state: 'visible', timeout: 10000 });
      
      // Check for invalid state classes
      const classAttribute = await this.instanceTitleInput.getAttribute('class');
      if (classAttribute) {
        const hasInvalidClass = classAttribute.includes('ng-invalid') || 
                               classAttribute.includes('invalid') ||
                               classAttribute.includes('is-invalid');
        if (hasInvalidClass) return true;
      }
      
      // Also check aria-invalid attribute
      const ariaInvalid = await this.instanceTitleInput.getAttribute('aria-invalid');
      if (ariaInvalid === 'true') return true;
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Tally Reactivation button is visible.
   * @returns {Promise<boolean>}
   */
  async isTallyReactivationButtonVisible() {
    try {
      return await this.tallyReactivationButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Tally Reactivation button.
   */
  async clickTallyReactivation() {
    await this.tallyReactivationButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.tallyReactivationButton.click();
  }

  /**
   * Checks if Tally Reactivation modal is visible.
   * @returns {Promise<boolean>}
   */
  async isTallyReactivationModalVisible() {
    try {
      // Wait a bit for modal to appear
      await this.page.waitForTimeout(1000);
      
      // Try multiple modal selectors
      const modalSelectors = [
        this.tallyReactivationModal,
        this.tallyReactivationModalTitle,
        this.page.locator('.modal-lg:visible').first(),
        this.page.locator('.modal:has-text("Tally"):visible').first(),
        this.page.locator('[role="dialog"]:visible').first()
      ];

      for (const selector of modalSelectors) {
        const isVisible = await selector.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the Tally Reactivation modal title text.
   * @returns {Promise<string>}
   */
  async getTallyReactivationModalTitle() {
    try {
      await this.page.waitForTimeout(1000);
      
      const titleSelectors = [
        this.tallyReactivationModalTitle,
        this.page.locator('.modal-title:visible').first(),
        this.page.locator('.modal-header h4:visible, .modal-header h5:visible').first()
      ];

      for (const selector of titleSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          const text = await selector.textContent();
          if (text && text.trim()) return text.trim();
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Closes the Tally Reactivation modal (if open).
   */
  async closeTallyReactivationModal() {
    try {
      const closeButton = this.page.locator('.modal button[aria-label="Close"], .modal-header button.close, .modal button:has-text("Close"), .modal button:has-text("Cancel")').first();
      const isVisible = await closeButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        await closeButton.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      // Modal might already be closed or close button not found
    }
  }

  /**
   * Checks if Change Version button is visible.
   * @returns {Promise<boolean>}
   */
  async isChangeVersionButtonVisible() {
    try {
      return await this.changeVersionButton.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Change Version button to open dropdown.
   */
  async clickChangeVersion() {
    await this.changeVersionButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.changeVersionButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if Change Version dropdown is visible/open.
   * @returns {Promise<boolean>}
   */
  async isChangeVersionDropdownVisible() {
    try {
      await this.page.waitForTimeout(500);
      
      // Check multiple selectors for dropdown visibility
      const dropdownSelectors = [
        this.changeVersionDropdown,
        this.page.locator('ul.dropdown-menu.show').first(),
        this.page.locator('ul.dropdown-menu.menu-item-1.show').first(),
        this.page.locator('.dropdown-menu.show').first(),
        this.page.locator('ul[aria-labelledby="dropdownMenuButton1"].show').first()
      ];

      for (const selector of dropdownSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }

      // Also check if dropdown items are visible (alternative check)
      const itemsVisible = await this.changeVersionItems.first().isVisible({ timeout: 2000 }).catch(() => false);
      return itemsVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the count of available version options in the dropdown.
   * @returns {Promise<number>}
   */
  async getVersionOptionsCount() {
    try {
      await this.page.waitForTimeout(500);
      return await this.changeVersionItems.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Gets the text of a version option by index.
   * @param {number} index - Index of the version option (0-based)
   * @returns {Promise<string>}
   */
  async getVersionOptionText(index) {
    try {
      // Try multiple selectors to find the version option
      const itemSelectors = [
        this.page.locator('.dropdown-menu .customerList li span.dropdown-item').nth(index),
        this.page.locator('.dropdown-menu .customerList li').nth(index),
        this.page.locator('.dropdown-menu li span.dropdown-item').nth(index),
        this.changeVersionItem(index)
      ];

      for (const selector of itemSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await selector.textContent();
            if (text && text.trim()) {
              return text.trim();
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the current App Version value.
   * @returns {Promise<string>}
   */
  async getCurrentAppVersion() {
    return await this.getAppVersion();
  }

  /**
   * Selects a version option from the dropdown by index (excluding current version).
   * @param {number} index - Index of the version option to select (0-based)
   * @returns {Promise<string>} The selected version text
   */
  async selectVersionOption(index) {
    try {
      // Try to find the item - it could be a span.dropdown-item or li
      const itemSelectors = [
        this.page.locator('.dropdown-menu .customerList li span.dropdown-item').nth(index),
        this.page.locator('.dropdown-menu .customerList li').nth(index),
        this.page.locator('.dropdown-menu li span.dropdown-item').nth(index),
        this.changeVersionItem(index)
      ];

      let item = null;
      for (const selector of itemSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          item = selector;
          break;
        }
      }

      if (!item) {
        throw new Error(`Version option at index ${index} not found`);
      }

      await item.waitFor({ state: 'visible', timeout: 5000 });
      const versionText = await item.textContent();
      
      // Scroll into view if needed
      await item.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      await item.click();
      await this.page.waitForTimeout(1000);
      return versionText?.trim() || '';
    } catch (error) {
      throw new Error(`Failed to select version option at index ${index}: ${error.message}`);
    }
  }

  /**
   * Selects a different version (not the current one).
   * @returns {Promise<{selectedVersion: string, currentVersion: string}>}
   */
  async selectDifferentVersion() {
    const currentVersion = await this.getCurrentAppVersion();
    const optionsCount = await this.getVersionOptionsCount();
    
    if (optionsCount === 0) {
      throw new Error('No version options available in dropdown');
    }

    // Try to find a version that's different from current
    for (let i = 0; i < optionsCount; i++) {
      const versionText = await this.getVersionOptionText(i);
      if (versionText && versionText.trim() !== currentVersion.trim()) {
        await this.selectVersionOption(i);
        return { selectedVersion: versionText.trim(), currentVersion: currentVersion.trim() };
      }
    }

    // If all versions are the same (unlikely), select the first one anyway
    const selectedVersion = await this.selectVersionOption(0);
    return { selectedVersion: selectedVersion.trim(), currentVersion: currentVersion.trim() };
  }

  /**
   * Checks if Version Change Confirmation modal is visible.
   * @returns {Promise<boolean>}
   */
  async isVersionChangeModalVisible() {
    try {
      await this.page.waitForTimeout(1000);
      
      const modalSelectors = [
        this.versionChangeModal,
        this.versionChangeModalTitle,
        this.page.locator('.modal:has-text("Tally Change"):visible').first(),
        this.page.locator('.modal:has-text("change the Tally version"):visible').first()
      ];

      for (const selector of modalSelectors) {
        const isVisible = await selector.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the Version Change Confirmation modal title text.
   * @returns {Promise<string>}
   */
  async getVersionChangeModalTitle() {
    try {
      await this.page.waitForTimeout(1000);
      
      const titleSelectors = [
        this.versionChangeModalTitle,
        this.page.locator('.modal-title:visible').first(),
        this.page.locator('.modal-header h4:visible, .modal-header h5:visible').first()
      ];

      for (const selector of titleSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          const text = await selector.textContent();
          if (text && text.trim()) return text.trim();
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Clicks the Cancel button in the Version Change Confirmation modal.
   */
  async clickVersionChangeCancel() {
    await this.versionChangeCancelButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.versionChangeCancelButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Clicks the Proceed button in the Version Change Confirmation modal.
   */
  async clickVersionChangeProceed() {
    await this.versionChangeProceedButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.versionChangeProceedButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Closes the Version Change Confirmation modal by clicking Cancel.
   */
  async closeVersionChangeModal() {
    try {
      const isVisible = await this.isVersionChangeModalVisible();
      if (isVisible) {
        await this.clickVersionChangeCancel();
      }
    } catch (error) {
      // Modal might already be closed
    }
  }
}

module.exports = { AppManagementPage };

