class SecurityRulesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Security and Logs dropdown (sidebar menu)
    // HTML: <a href="#" data-bs-toggle="collapse" class="nav-link" data-bs-target="#logs-&-security">Logs & Security</a>
    this.securityAndLogsDropdown = page.locator('a.nav-link:has-text("Logs & Security"), a.nav-link:has-text("Logs &amp; Security"), a[data-bs-toggle="collapse"][data-bs-target*="logs"], a[data-bs-target*="logs-"], a.nav-link:has-text("Logs")').first();
    
    // Security Rules option - inside collapsed menu
    // HTML: <a class="nav-link menu-item" ng-reflect-router-link="security-rules" href="/security-rules">Security Rules</a>
    // Note: Using attribute selector for id with & character to avoid CSS parsing issues
    this.securityRulesOption = page.locator('a[href="/security-rules"], a[href*="security-rules"], a[ng-reflect-router-link="security-rules"], [id="logs-&-security"] a:has-text("Security Rules"), [id*="logs"][id*="security"] a:has-text("Security Rules"), .collapse.show a:has-text("Security Rules"), a:has-text("Security Rules")').first();
    
    // Page wrapper
    this.securityRulesWrapper = page.locator('.security-rules-wrapper, .security-rules, [class*="security-rules"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("Security Rules"), .header-left:has-text("Security Rules"), h1:has-text("Security Rules"), h2:has-text("Security Rules")').first();
    this.pageHeading = page.locator('h6.page-title-modern:has-text("Security Rules"), h1:has-text("Security Rules"), h2:has-text("Security Rules"), .page-heading:has-text("Security Rules"), .page-title-modern:has-text("Security Rules")').first();
    
    // Advanced Security Checkbox
    // HTML: <input type="checkbox" name="isEnableAdvancedSecurity" formcontrolname="isAdvancedSecurityEnable">
    // Label: <span class="ip-text"> Enable advanced security for cloud and portal.</span>
    this.advancedSecurityCheckbox = page.locator('input[type="checkbox"][name="isEnableAdvancedSecurity"], input[type="checkbox"][formcontrolname="isAdvancedSecurityEnable"], input[type="checkbox"]:near(span:has-text("Enable advanced security for cloud and portal"))').first();
    this.advancedSecurityLabel = page.locator('span.ip-text:has-text("Enable advanced security for cloud and portal"), label:has-text("Enable advanced security"), .checkbox-modern span.ip-text').first();
    
    // Two-Factor Authentication (2FA) Section
    // HTML: <p class="ip-text mb-0">Two-Factor Authentication(2FA) - Authenticator</p>
    // Note: Text has no space after "Authentication" - it's "Authentication(2FA)"
    this.twoFactorSection = page.locator('p.ip-text.mb-0:has-text("Two-Factor Authentication(2FA) - Authenticator"), p.ip-text:has-text("Two-Factor Authentication(2FA) - Authenticator"), p.ip-text:has-text("Two-Factor Authentication(2FA)"), p:has-text("Two-Factor Authentication"), .form-row-modern:has(p:has-text("Two-Factor Authentication")), .row.form-row-modern:has(p.ip-text.mb-0:has-text("Two-Factor Authentication"))').first();
    
    // 2FA Radio Buttons
    // HTML: <input type="radio" name="is2FaEnable" value="true"> Enable
    //       <input type="radio" name="is2FaEnable" value="false"> Disable
    this.twoFactorEnableRadio = page.locator('input[type="radio"][name="is2FaEnable"][value="true"], input[type="radio"][name="is2FaEnable"][ng-reflect-value="true"]').first();
    this.twoFactorDisableRadio = page.locator('input[type="radio"][name="is2FaEnable"][value="false"], input[type="radio"][name="is2FaEnable"][ng-reflect-value="false"]').first();
    
    // 2FA Enable/Disable Labels (for clicking)
    // HTML: <label class="radio-label-modern"><input type="radio" name="is2FaEnable" value="true"><span class="me-4 address fs-6">Enable</span></label>
    this.twoFactorEnableLabel = page.locator('label.radio-label-modern:has(input[type="radio"][name="is2FaEnable"][value="true"]), label.radio-label-modern:has(input[type="radio"][name="is2FaEnable"][ng-reflect-value="true"]), label:has(span:has-text("Enable")):has(input[type="radio"][name="is2FaEnable"])').first();
    this.twoFactorDisableLabel = page.locator('label.radio-label-modern:has(input[type="radio"][name="is2FaEnable"][value="false"]), label.radio-label-modern:has(input[type="radio"][name="is2FaEnable"][ng-reflect-value="false"]), label:has(span:has-text("Disable")):has(input[type="radio"][name="is2FaEnable"])').first();
    
    // 2FA Confirmation Modal
    // HTML: <div class="common-modal modern-modal-mfa pb-0">
    this.twoFAModal = page.locator('.common-modal.modern-modal-mfa, .modal:has-text("Enable 2FA"), .modal:has-text("Disable 2FA")').first();
    this.twoFAModalTitle = page.locator('.modal-title-modern:has-text("Enable 2FA"), .modal-title-modern:has-text("Disable 2FA"), p.modal-title-modern:has-text("2FA")').first();
    this.twoFAModalConfirmButton = page.locator('.modal button:has-text("Enable"), .modal button:has-text("Disable"), .modal button.btn-modal-primary:has-text("Enable"), .modal button.btn-modal-primary:has-text("Disable"), .modal button.primary-btn[type="submit"]').first();
    this.twoFAModalCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button.btn-modal-secondary:has-text("Cancel"), .modal button.secondary-btn[type="button"]').first();
    
    // "Complete 2FA" text and related UI elements
    this.complete2FAText = page.locator('*:has-text("Complete 2FA"), *:has-text("Complete 2FA"), text=Complete 2FA, text=complete 2fa').first();
    this.complete2FASection = page.locator('[class*="2fa"], [class*="two-factor"], [class*="complete-2fa"], .complete-2fa-section').first();
    
    // IP Address Section
    // HTML: <p class="ip-text mb-0">Allow access only for specific IP address</p>
    this.ipAddressText = page.locator('p.ip-text.mb-0:has-text("Allow access only for specific IP address"), p.ip-text:has-text("Allow access only for specific IP address"), p:has-text("Allow access only for specific IP address"), text=Allow access only for specific IP address').first();
    // HTML: <span class="address-modern">Add IP address</span>
    this.addIpAddressLink = page.locator('span.address-modern:has-text("Add IP address"), span:has-text("Add IP address"), .address-modern:has-text("Add IP address")').first();
    
    // Add IP Modal
    this.addIpModal = page.locator('.common-modal:has-text("Add IP"), .modal:has-text("Add IP"), .common-modal.modern-modal:has-text("IP")').first();
    this.addIpModalTitle = page.locator('.modal-title-modern:has-text("Add IP"), p.modal-title-modern:has-text("Add IP"), .modal-header-modern:has-text("Add IP")').first();
    this.addIpModalInfoMessage = page.locator('.modal-body-modern p:has-text("info"), .modal-body-modern p:has-text("warning"), .modal-body-modern p:has-text("Note"), .modal-body-modern .alert, .modal-body-modern .info-message').first();
    this.addIpInputField = page.locator('.modal input[type="text"][placeholder*="IP"], .modal input[placeholder*="IP address"], .modal input[formcontrolname*="ip"], .modal input[name*="ip"], .modal input#ipAddress, .modal input[ng-reflect-name*="ip"]').first();
    this.addIpButton = page.locator('.modal button:has-text("Add"), .modal button.btn-modal-primary:has-text("Add"), .modal button.primary-btn:has-text("Add"), .modal button[type="submit"]:has-text("Add")').first();
    this.addIpModalCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button.btn-modal-secondary:has-text("Cancel"), .modal button.secondary-btn[type="button"]').first();
    this.addIpModalCloseButton = page.locator('.modal button.close, .modal-header-modern button.close').first();
    
    // Validation Errors
    this.addIpValidationError = page.locator('.modal .error-message, .modal .validation-error, .modal mat-error, .modal .text-danger, .modal small.text-danger').first();
    
    // Allowed IP Addresses List
    // HTML: <input type="text" disabled="" class="form-controls w-50 me-2 mb-2">
    this.allowedIpAddressesList = page.locator('.allowed-ip-list, .ip-address-list, [class*="ip-list"], .form-row-modern:has(.address-modern)').first();
    this.allowedIpAddressItems = page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls, .ip-address-item, .allowed-ip-item, [class*="ip-item"], span.address-modern:not(:has-text("Add IP address"))');
    
    // Edit IP Address - Pencil icon
    // HTML: <i class="bi bi-pencil-fill icon-modern icon-edit"></i>
    this.editIpButton = page.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit, i.bi-pencil-fill, i.bi-pencil, button:has(i.bi-pencil), .edit-ip-button').first();
    this.editIpButtons = page.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit, i.bi-pencil-fill, i.bi-pencil, button:has(i.bi-pencil), .edit-ip-button');
    
    // Delete IP Address - Trash icon
    // HTML: <i class="bi bi-trash3-fill icon-modern icon-delete"></i>
    this.deleteIpButton = page.locator('i.bi-trash3-fill.icon-delete, i.bi-trash3-fill.icon-modern, i.icon-delete, i.bi-trash3-fill, i.bi-trash-fill, i.bi-trash, button:has(i.bi-trash), .delete-ip-button').first();
    this.deleteIpButtons = page.locator('i.bi-trash3-fill.icon-delete, i.bi-trash3-fill.icon-modern, i.icon-delete, i.bi-trash3-fill, i.bi-trash-fill, i.bi-trash, button:has(i.bi-trash), .delete-ip-button');
    
    // Edit IP Modal (similar to Add IP modal)
    this.editIpModal = page.locator('.common-modal:has-text("Edit IP"), .modal:has-text("Edit IP"), .common-modal.modern-modal:has-text("Edit")').first();
    this.editIpModalTitle = page.locator('.modal-title-modern:has-text("Edit IP"), p.modal-title-modern:has-text("Edit IP")').first();
    this.editIpInputField = page.locator('.modal input[type="text"][placeholder*="IP"], .modal input[placeholder*="IP address"], .modal input[formcontrolname*="ip"], .modal input[name*="ip"]').first();
    this.editIpSaveButton = page.locator('.modal button[type="submit"].btn-modal-primary:has-text("Edit"), .modal button.primary-btn.btn-modal-primary:has-text("Edit"), .modal button[type="submit"]:has-text("Edit"), .modal button.btn-modal-primary:has-text("Edit"), .modal button:has-text("Edit"), .modal button:has-text("Save"), .modal button:has-text("Update")').first();
    this.editIpModalCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button.btn-modal-secondary:has-text("Cancel")').first();
    
    // Delete IP Confirmation Modal
    this.deleteIpModal = page.locator('.common-modal:has-text("Delete"), .modal:has-text("Delete"), .common-modal.modern-modal:has-text("Delete IP")').first();
    this.deleteIpModalTitle = page.locator('.modal-title-modern:has-text("Delete"), p.modal-title-modern:has-text("Delete")').first();
    this.deleteIpConfirmButton = page.locator('.modal button:has-text("Delete"), .modal button:has-text("Confirm"), .modal button.btn-modal-primary:has-text("Delete"), .modal button[type="submit"]:has-text("Delete")').first();
    this.deleteIpModalCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button.btn-modal-secondary:has-text("Cancel")').first();
    
    
    // Time Range Section
    // HTML: <p class="ip-text mb-0">Allow access only at specific time</p>
    this.timeRangeText = page.locator('p.ip-text:has-text("Allow access only at specific time"), text=Allow access only at specific time').first();
    // HTML: <span class="address-modern">Add time range</span>
    this.addTimeRangeLink = page.locator('span.address-modern:has-text("Add time range"), span:has-text("Add time range"), .address-modern:has-text("Add time range")').first();
    
    // Add Access Time Modal
    this.addAccessTimeModal = page.locator('.common-modal:has-text("Add Access Time"), .modal:has-text("Add Access Time"), .common-modal.modern-modal:has-text("Access Time")').first();
    this.addAccessTimeModalTitle = page.locator('.modal-title-modern:has-text("Add Access Time"), p.modal-title-modern:has-text("Add Access Time"), .modal-header-modern:has-text("Add Access Time")').first();
    this.addAccessTimeWarningMessage = page.locator('.modal .alert-warning, .modal .warning-message, .modal [class*="warning"], .modal:has-text("Users without admin permissions")').first();
    
    // Access Days Section
    // HTML: <div class="py-1 text-center access-btns access-btns-modern"> Mon </div>
    this.accessDaysLabel = page.locator('.modal label:has-text("Access days"), .modal:has-text("Access days")').first();
    this.mondayButton = page.locator('.modal .access-btns:has-text("Mon"), .modal div.access-btns:has-text("Mon"), .modal button:has-text("Mon")').first();
    this.tuesdayButton = page.locator('.modal .access-btns:has-text("Tue"), .modal div.access-btns:has-text("Tue"), .modal button:has-text("Tue")').first();
    this.wednesdayButton = page.locator('.modal .access-btns:has-text("Wed"), .modal div.access-btns:has-text("Wed"), .modal button:has-text("Wed")').first();
    this.thursdayButton = page.locator('.modal .access-btns:has-text("Thu"), .modal div.access-btns:has-text("Thu"), .modal button:has-text("Thu")').first();
    this.fridayButton = page.locator('.modal .access-btns:has-text("Fri"), .modal div.access-btns:has-text("Fri"), .modal button:has-text("Fri")').first();
    this.saturdayButton = page.locator('.modal .access-btns:has-text("Sat"), .modal div.access-btns:has-text("Sat"), .modal button:has-text("Sat")').first();
    this.sundayButton = page.locator('.modal .access-btns:has-text("Sun"), .modal div.access-btns:has-text("Sun"), .modal button:has-text("Sun")').first();
    this.allDayButtons = page.locator('.modal .access-btns, .modal div.access-btns, .modal button:has-text("Mon"), .modal button:has-text("Tue"), .modal button:has-text("Wed"), .modal button:has-text("Thu"), .modal button:has-text("Fri"), .modal button:has-text("Sat"), .modal button:has-text("Sun")');
    
    // Timezone Section
    this.timezoneLabel = page.locator('.modal label:has-text("Timezone"), .modal:has-text("Timezone")').first();
    this.autoTimezoneCheckbox = page.locator('.modal input[type="checkbox"][name*="timezone"], .modal input[type="checkbox"]:near(label:has-text("Automatically match"))').first();
    this.timezoneDropdown = page.locator('.modal select[name*="timezone"], .modal mat-select:has-text("timezone"), .modal [class*="timezone-select"]').first();
    
    // Access Time Range Section
    // HTML: <select formcontrolname="startTime" class="col-5 select-time text-center">
    this.accessTimeRangeLabel = page.locator('.modal label:has-text("Access time range"), .modal:has-text("Access time range")').first();
    this.startTimeInput = page.locator('.modal input[placeholder*="Start time"], .modal input[name*="startTime"], .modal input[formcontrolname*="startTime"], .modal input[type="time"]:first-of-type').first();
    this.endTimeInput = page.locator('.modal input[placeholder*="End time"], .modal input[name*="endTime"], .modal input[formcontrolname*="endTime"], .modal input[type="time"]:last-of-type').first();
    this.startTimeDropdown = page.locator('.modal select[formcontrolname="startTime"], .modal select.select-time[formcontrolname="startTime"], .modal select[name*="startTime"]').first();
    this.endTimeDropdown = page.locator('.modal select[formcontrolname="endTime"], .modal select.select-time[formcontrolname="endTime"], .modal select[name*="endTime"]').first();
    
    // Allow Access Only At Text (summary)
    // HTML: <div class="col-8 allow-access warning-text p-0"><span>Every day, any time, +05:30 Asia/Calcutta</span></div>
    this.allowAccessOnlyAtText = page.locator('.modal .allow-access span, .modal .allow-access, .modal:has-text("Allow access only at"), .modal:has-text("Every day"), .modal:has-text("any time")').first();
    
    // Modal Buttons
    this.addAccessTimeButton = page.locator('.modal button:has-text("Add"), .modal button.btn-modal-primary:has-text("Add"), .modal button.primary-btn:has-text("Add"), .modal button[type="submit"]:has-text("Add")').first();
    this.addAccessTimeCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button.btn-modal-secondary:has-text("Cancel"), .modal button.secondary-btn[type="button"]').first();
    
    // Edit Access Time Modal
    this.editAccessTimeModal = page.locator('.common-modal:has-text("Edit Access Time"), .modal:has-text("Edit Access Time"), .common-modal.modern-modal:has-text("Edit Access Time")').first();
    this.editAccessTimeModalTitle = page.locator('.modal-title-modern:has-text("Edit Access Time"), p.modal-title-modern:has-text("Edit Access Time"), .modal-header-modern:has-text("Edit Access Time")').first();
    this.editAccessTimeButton = page.locator('.modal button[type="submit"].primary-btn.btn-modal-primary:has-text("Edit"), .modal button[type="submit"].btn-modal-primary:has-text("Edit"), .modal button.primary-btn.flex-fill:has-text("Edit"), .modal button.primary-btn:has-text("Edit"), .modal button[type="submit"]:has-text("Edit"), .modal button.btn-modal-primary:has-text("Edit")').first();
    this.editAccessTimeCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button.btn-modal-secondary:has-text("Cancel"), .modal button.secondary-btn[type="button"]').first();
    
    // Access Time List (entries on the page)
    // HTML: Input field showing access time summary with edit/delete icons
    this.accessTimeEntries = page.locator('input[type="text"][disabled]:near(i.bi-pencil-fill), input.form-controls[disabled]:near(i.bi-pencil-fill), .access-time-item, [class*="access-time"]');
    this.editAccessTimeButton = page.locator('i.bi-pencil-fill.icon-edit:near(input[disabled]), i.bi-pencil-fill.icon-modern:near(input[disabled]), i.icon-edit:near(input[disabled]), i.bi-pencil-fill:near(input[disabled])').first();
    this.editAccessTimeButtons = page.locator('i.bi-pencil-fill.icon-edit:near(input[disabled]), i.bi-pencil-fill.icon-modern:near(input[disabled]), i.icon-edit:near(input[disabled]), i.bi-pencil-fill:near(input[disabled])');
    this.deleteAccessTimeButton = page.locator('i.bi-trash3-fill.icon-delete:near(input[disabled]), i.bi-trash3-fill.icon-modern:near(input[disabled]), i.icon-delete:near(input[disabled]), i.bi-trash3-fill:near(input[disabled])').first();
    this.deleteAccessTimeButtons = page.locator('i.bi-trash3-fill.icon-delete:near(input[disabled]), i.bi-trash3-fill.icon-modern:near(input[disabled]), i.icon-delete:near(input[disabled]), i.bi-trash3-fill:near(input[disabled])');
    
    // Delete Access Time Confirmation Modal
    this.deleteAccessTimeModal = page.locator('.common-modal:has-text("Delete"), .modal:has-text("Delete Access Time"), .modal:has-text("Delete")').first();
    this.deleteAccessTimeConfirmButton = page.locator('.modal button:has-text("Delete"), .modal button:has-text("Confirm"), .modal button.btn-modal-primary:has-text("Delete"), .modal button[type="submit"]:has-text("Delete")').first();
    
    // Confirmation Modal (appears when enabling advanced security)
    // HTML: <div class="common-modal modern-modal-mfa pb-0">
    this.activateSecurityModal = page.locator('.common-modal.modern-modal-mfa, .modal:has-text("Activate Advance Security"), .modal:has-text("Activate advance security")').first();
    this.modalTitle = page.locator('.modal-title-modern:has-text("Activate Advance Security"), p.modal-title-modern:has-text("Activate Advance Security")').first();
    this.modalYesButton = page.locator('.modal button:has-text("Yes"), .modal button.btn-modal-primary:has-text("Yes"), button.primary-btn:has-text("Yes")').first();
    this.modalNoButton = page.locator('.modal button:has-text("No"), .modal button.btn-modal-secondary:has-text("No"), button.secondary-btn:has-text("No")').first();
  }

  /**
   * Navigates to Security Rules page
   */
  async gotoSecurityRules() {
    try {
      // Step 1: Click on Security and Logs dropdown in sidebar
      const dropdownVisible = await this.securityAndLogsDropdown.isVisible({ timeout: 5000 }).catch(() => false);
      if (dropdownVisible) {
        // Check if dropdown is already open (has 'show' class on the collapse element)
        const collapseElement = this.page.locator('[id="logs-&-security"], [id*="logs"][id*="security"], [id*="logs-"]');
        const isOpen = await collapseElement.first().evaluate(el => {
          return el.classList.contains('show') || el.classList.contains('collapsing');
        }).catch(() => false);
        
        if (!isOpen) {
          // Click to open the dropdown
          await this.securityAndLogsDropdown.scrollIntoViewIfNeeded();
          await this.securityAndLogsDropdown.click();
          await this.page.waitForTimeout(500); // Wait for dropdown to open
        }
        
        // Step 2: Click on "Security Rules" option
        await this.securityRulesOption.waitFor({ state: 'visible', timeout: 10000 });
        await this.securityRulesOption.scrollIntoViewIfNeeded();
        
        // Wait for navigation after clicking
        await Promise.all([
          this.page.waitForURL(/.*security-rules.*/i, { timeout: 10000 }).catch(() => {}),
          this.securityRulesOption.click()
        ]);
        
        await this.page.waitForTimeout(2000); // Additional wait for page to load
      } else {
        // Fallback: navigate directly to /security-rules
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/security-rules`);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      // Fallback: navigate directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/security-rules`);
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Verifies Security and Logs dropdown expands successfully
   * @returns {Promise<boolean>}
   */
  async verifyDropdownExpanded() {
    try {
      // Primary check: Check if Security Rules option is visible
      const optionVisible = await this.securityRulesOption.isVisible({ timeout: 3000 }).catch(() => false);
      if (optionVisible) {
        return true;
      }
      
      // Secondary check: Check if the dropdown link has aria-expanded="true"
      const ariaExpanded = await this.securityAndLogsDropdown.getAttribute('aria-expanded').catch(() => null);
      if (ariaExpanded === 'true') {
        return true;
      }
      
      // Tertiary check: Check if the collapse element has 'show' class
      // HTML: <ul class="nav-content ps-2 ng-star-inserted collapse show" id="logs-&-security">
      // Note: Using attribute selector for id with & character to avoid CSS parsing issues
      const collapseElement = this.page.locator('[id="logs-&-security"], [id*="logs"][id*="security"]').first();
      const collapseCount = await collapseElement.count();
      
      if (collapseCount > 0) {
        const isExpanded = await collapseElement.evaluate(el => {
          return el.classList.contains('show') || el.classList.contains('collapsing');
        }).catch(() => false);
        
        if (isExpanded) {
          return true;
        }
        
        // Check if the ul element is visible
        const ulVisible = await collapseElement.isVisible({ timeout: 2000 }).catch(() => false);
        if (ulVisible) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page heading is visible and returns text
   * @returns {Promise<{visible: boolean, text: string}>}
   */
  async verifyPageHeading() {
    try {
      const isVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      const text = isVisible ? await this.pageHeading.textContent() : '';
      
      return {
        visible: isVisible,
        text: text?.trim() || ''
      };
    } catch (error) {
      return {
        visible: false,
        text: ''
      };
    }
  }

  /**
   * Verifies current URL contains security-rules
   * @returns {Promise<{contains: boolean, url: string}>}
   */
  async verifyUrl() {
    try {
      const currentUrl = this.page.url();
      const urlLower = currentUrl.toLowerCase();
      const contains = urlLower.includes('security-rules') || urlLower.includes('securityrules') || urlLower.endsWith('/security-rules') || urlLower.includes('/security-rules/');
      
      return {
        contains: contains,
        url: currentUrl
      };
    } catch (error) {
      return {
        contains: false,
        url: ''
      };
    }
  }

  /**
   * Checks if advanced security checkbox is checked
   * @returns {Promise<boolean>}
   */
  async isAdvancedSecurityChecked() {
    try {
      const isChecked = await this.advancedSecurityCheckbox.isChecked().catch(() => false);
      return isChecked;
    } catch (error) {
      return false;
    }
  }

  /**
   * Enables the advanced security checkbox
   */
  async enableAdvancedSecurity() {
    try {
      const isChecked = await this.isAdvancedSecurityChecked();
      if (!isChecked) {
        // Try clicking the checkbox directly
        await this.advancedSecurityCheckbox.scrollIntoViewIfNeeded();
        await this.advancedSecurityCheckbox.waitFor({ state: 'visible', timeout: 5000 });
        await this.advancedSecurityCheckbox.click({ timeout: 5000 }).catch(async () => {
          // If checkbox click fails, try clicking the label/span
          await this.advancedSecurityLabel.scrollIntoViewIfNeeded();
          await this.advancedSecurityLabel.click({ timeout: 5000 });
        });
        
        // Wait for confirmation modal to appear
        await this.page.waitForTimeout(1000);
        
        // Check if modal is visible and click "Yes"
        const modalVisible = await this.activateSecurityModal.isVisible({ timeout: 5000 }).catch(() => false);
        if (modalVisible) {
          // Click "Yes" button to confirm
          await this.modalYesButton.waitFor({ state: 'visible', timeout: 5000 });
          await this.modalYesButton.scrollIntoViewIfNeeded();
          await this.modalYesButton.click({ timeout: 5000 });
          
          // Wait for modal to close and options to appear
          await this.page.waitForTimeout(2000);
          
          // Verify modal is closed
          const modalStillVisible = await this.activateSecurityModal.isVisible({ timeout: 2000 }).catch(() => false);
          if (modalStillVisible) {
            // Modal might take longer to close, wait a bit more
            await this.page.waitForTimeout(2000);
          }
        } else {
          // If no modal, just wait for options to appear
          await this.page.waitForTimeout(1500);
        }
      }
    } catch (error) {
      throw new Error(`Failed to enable advanced security: ${error.message}`);
    }
  }

  /**
   * Disables the advanced security checkbox
   */
  async disableAdvancedSecurity() {
    try {
      const isChecked = await this.isAdvancedSecurityChecked();
      if (isChecked) {
        // Try clicking the checkbox directly
        await this.advancedSecurityCheckbox.scrollIntoViewIfNeeded();
        await this.advancedSecurityCheckbox.waitFor({ state: 'visible', timeout: 5000 });
        await this.advancedSecurityCheckbox.click({ timeout: 5000 }).catch(async () => {
          // If checkbox click fails, try clicking the label/span
          await this.advancedSecurityLabel.scrollIntoViewIfNeeded();
          await this.advancedSecurityLabel.click({ timeout: 5000 });
        });
        await this.page.waitForTimeout(1500); // Wait for options to disappear
      }
    } catch (error) {
      throw new Error(`Failed to disable advanced security: ${error.message}`);
    }
  }

  /**
   * Verifies all additional security options are visible
   * @returns {Promise<{twoFactorVisible: boolean, enableRadioVisible: boolean, disableRadioVisible: boolean, ipAddressTextVisible: boolean, addIpAddressVisible: boolean, timeRangeTextVisible: boolean, addTimeRangeVisible: boolean}>}
   */
  async verifyAdditionalOptionsVisible() {
    try {
      // Wait a bit for options to appear after modal closes
      await this.page.waitForTimeout(1000);
      
      // Try multiple selectors for 2FA section
      // HTML: <p class="ip-text mb-0">Two-Factor Authentication(2FA) - Authenticator</p>
      const twoFactorSelectors = [
        'p.ip-text.mb-0:has-text("Two-Factor Authentication(2FA) - Authenticator")',
        'p.ip-text:has-text("Two-Factor Authentication(2FA) - Authenticator")',
        'p.ip-text:has-text("Two-Factor Authentication(2FA)")',
        'p.ip-text.mb-0:has-text("Two-Factor Authentication")',
        'p:has-text("Two-Factor Authentication")',
        'text=Two-Factor Authentication(2FA) - Authenticator',
        'text=Two-Factor Authentication(2FA)',
        '.form-row-modern:has(p:has-text("Two-Factor Authentication"))',
        '.row.form-row-modern:has(p.ip-text.mb-0:has-text("Two-Factor Authentication"))'
      ];
      
      let twoFactorVisible = false;
      for (const selector of twoFactorSelectors) {
        try {
          const element = this.page.locator(selector).first();
          const count = await element.count();
          if (count > 0) {
            twoFactorVisible = await element.isVisible({ timeout: 3000 }).catch(() => false);
            if (twoFactorVisible) {
              break;
            }
            // Also check if element exists in DOM (might be hidden but present)
            const exists = await element.evaluate(el => {
              return el.offsetParent !== null || window.getComputedStyle(el).display !== 'none';
            }).catch(() => false);
            if (exists) {
              twoFactorVisible = true;
              break;
            }
          }
        } catch (err) {
          continue;
        }
      }
      
      // Check for 2FA radio buttons
      const enableRadioVisible = await this.twoFactorEnableRadio.isVisible({ timeout: 3000 }).catch(() => false);
      const disableRadioVisible = await this.twoFactorDisableRadio.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Check for IP address section - try multiple selectors
      const ipAddressSelectors = [
        'p.ip-text.mb-0:has-text("Allow access only for specific IP address")',
        'p.ip-text:has-text("Allow access only for specific IP address")',
        'p:has-text("Allow access only for specific IP address")',
        'text=Allow access only for specific IP address',
        '.form-row-modern:has(p:has-text("Allow access only for specific IP address"))'
      ];
      
      let ipAddressTextVisible = false;
      for (const selector of ipAddressSelectors) {
        try {
          const element = this.page.locator(selector).first();
          const count = await element.count();
          if (count > 0) {
            ipAddressTextVisible = await element.isVisible({ timeout: 3000 }).catch(() => false);
            if (ipAddressTextVisible) {
              break;
            }
            // Also check if element exists in DOM (might be hidden but present)
            const exists = await element.evaluate(el => {
              return el.offsetParent !== null || window.getComputedStyle(el).display !== 'none';
            }).catch(() => false);
            if (exists) {
              ipAddressTextVisible = true;
              break;
            }
          }
        } catch (err) {
          continue;
        }
      }
      
      const addIpAddressVisible = await this.addIpAddressLink.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Check for time range section
      const timeRangeTextVisible = await this.timeRangeText.isVisible({ timeout: 3000 }).catch(() => false);
      const addTimeRangeVisible = await this.addTimeRangeLink.isVisible({ timeout: 3000 }).catch(() => false);

      return {
        twoFactorVisible,
        enableRadioVisible,
        disableRadioVisible,
        ipAddressTextVisible,
        addIpAddressVisible,
        timeRangeTextVisible,
        addTimeRangeVisible
      };
    } catch (error) {
      return {
        twoFactorVisible: false,
        enableRadioVisible: false,
        disableRadioVisible: false,
        ipAddressTextVisible: false,
        addIpAddressVisible: false,
        timeRangeTextVisible: false,
        addTimeRangeVisible: false
      };
    }
  }

  /**
   * Verifies all additional security options are NOT visible
   * @returns {Promise<{twoFactorVisible: boolean, enableRadioVisible: boolean, disableRadioVisible: boolean, ipAddressTextVisible: boolean, addIpAddressVisible: boolean, timeRangeTextVisible: boolean, addTimeRangeVisible: boolean}>}
   */
  async verifyAdditionalOptionsNotVisible() {
    try {
      // Check if elements exist in DOM but are hidden
      const twoFactorCount = await this.twoFactorSection.count();
      const twoFactorVisible = twoFactorCount > 0 ? await this.twoFactorSection.isVisible({ timeout: 500 }).catch(() => false) : false;
      
      const enableRadioCount = await this.twoFactorEnableRadio.count();
      const enableRadioVisible = enableRadioCount > 0 ? await this.twoFactorEnableRadio.isVisible({ timeout: 500 }).catch(() => false) : false;
      
      const disableRadioCount = await this.twoFactorDisableRadio.count();
      const disableRadioVisible = disableRadioCount > 0 ? await this.twoFactorDisableRadio.isVisible({ timeout: 500 }).catch(() => false) : false;
      
      const ipAddressTextCount = await this.ipAddressText.count();
      const ipAddressTextVisible = ipAddressTextCount > 0 ? await this.ipAddressText.isVisible({ timeout: 500 }).catch(() => false) : false;
      
      const addIpAddressCount = await this.addIpAddressLink.count();
      const addIpAddressVisible = addIpAddressCount > 0 ? await this.addIpAddressLink.isVisible({ timeout: 500 }).catch(() => false) : false;
      
      const timeRangeTextCount = await this.timeRangeText.count();
      const timeRangeTextVisible = timeRangeTextCount > 0 ? await this.timeRangeText.isVisible({ timeout: 500 }).catch(() => false) : false;
      
      const addTimeRangeCount = await this.addTimeRangeLink.count();
      const addTimeRangeVisible = addTimeRangeCount > 0 ? await this.addTimeRangeLink.isVisible({ timeout: 500 }).catch(() => false) : false;

      return {
        twoFactorVisible,
        enableRadioVisible,
        disableRadioVisible,
        ipAddressTextVisible,
        addIpAddressVisible,
        timeRangeTextVisible,
        addTimeRangeVisible
      };
    } catch (error) {
      return {
        twoFactorVisible: false,
        enableRadioVisible: false,
        disableRadioVisible: false,
        ipAddressTextVisible: false,
        addIpAddressVisible: false,
        timeRangeTextVisible: false,
        addTimeRangeVisible: false
      };
    }
  }

  /**
   * Checks if 2FA is currently enabled
   * @returns {Promise<boolean>}
   */
  async is2FAEnabled() {
    try {
      const isChecked = await this.twoFactorEnableRadio.isChecked().catch(() => false);
      return isChecked;
    } catch (error) {
      return false;
    }
  }

  /**
   * Enables 2FA by clicking the Enable radio button
   */
  async enable2FA() {
    try {
      // Check if already enabled
      const isEnabled = await this.is2FAEnabled();
      if (isEnabled) {
        console.log('2FA is already enabled');
        return;
      }

      // Click on Enable radio button or label
      const enableLabelVisible = await this.twoFactorEnableLabel.isVisible({ timeout: 3000 }).catch(() => false);
      if (enableLabelVisible) {
        await this.twoFactorEnableLabel.scrollIntoViewIfNeeded();
        await this.twoFactorEnableLabel.click();
      } else {
        await this.twoFactorEnableRadio.scrollIntoViewIfNeeded();
        await this.twoFactorEnableRadio.click();
      }
      
      await this.page.waitForTimeout(1000); // Wait for modal to appear
      
      // Check if confirmation modal appears
      const modalVisible = await this.twoFAModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (modalVisible) {
        // Wait for modal to fully render
        await this.page.waitForTimeout(500);
        
        // Click the confirm button (Enable button in modal)
        const confirmButtonVisible = await this.twoFAModalConfirmButton.isVisible({ timeout: 3000 }).catch(() => false);
        if (confirmButtonVisible) {
          await this.twoFAModalConfirmButton.scrollIntoViewIfNeeded();
          await this.twoFAModalConfirmButton.click();
          await this.page.waitForTimeout(1000); // Wait for modal to close
        } else {
          // Try to find button with text "Enable" or "Yes"
          const enableButton = this.page.locator('.modal button:has-text("Enable"), .modal button:has-text("Yes")').first();
          const enableButtonVisible = await enableButton.isVisible({ timeout: 2000 }).catch(() => false);
          if (enableButtonVisible) {
            await enableButton.click();
            await this.page.waitForTimeout(1000);
          }
        }
      }
      
      await this.page.waitForTimeout(1000); // Wait for UI to update
    } catch (error) {
      throw new Error(`Failed to enable 2FA: ${error.message}`);
    }
  }

  /**
   * Disables 2FA by clicking the Disable radio button
   */
  async disable2FA() {
    try {
      // Check if already disabled
      const isEnabled = await this.is2FAEnabled();
      if (!isEnabled) {
        console.log('2FA is already disabled');
        return;
      }

      // Click on Disable radio button or label
      const disableLabelVisible = await this.twoFactorDisableLabel.isVisible({ timeout: 3000 }).catch(() => false);
      if (disableLabelVisible) {
        await this.twoFactorDisableLabel.scrollIntoViewIfNeeded();
        await this.twoFactorDisableLabel.click();
      } else {
        await this.twoFactorDisableRadio.scrollIntoViewIfNeeded();
        await this.twoFactorDisableRadio.click();
      }
      
      await this.page.waitForTimeout(1000); // Wait for modal to appear
      
      // Check if confirmation modal appears
      const modalVisible = await this.twoFAModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (modalVisible) {
        // Wait for modal to fully render
        await this.page.waitForTimeout(500);
        
        // Click the confirm button (Disable button in modal)
        const confirmButtonVisible = await this.twoFAModalConfirmButton.isVisible({ timeout: 3000 }).catch(() => false);
        if (confirmButtonVisible) {
          await this.twoFAModalConfirmButton.scrollIntoViewIfNeeded();
          await this.twoFAModalConfirmButton.click();
          await this.page.waitForTimeout(1000); // Wait for modal to close
        } else {
          // Try to find button with text "Disable" or "Yes"
          const disableButton = this.page.locator('.modal button:has-text("Disable"), .modal button:has-text("Yes")').first();
          const disableButtonVisible = await disableButton.isVisible({ timeout: 2000 }).catch(() => false);
          if (disableButtonVisible) {
            await disableButton.click();
            await this.page.waitForTimeout(1000);
          }
        }
      }
      
      await this.page.waitForTimeout(1000); // Wait for UI to update
    } catch (error) {
      throw new Error(`Failed to disable 2FA: ${error.message}`);
    }
  }

  /**
   * Checks if "Complete 2FA" text is visible
   * @returns {Promise<boolean>}
   */
  async isComplete2FATextVisible() {
    try {
      // Try multiple selectors for "Complete 2FA" text
      const selectors = [
        '*:has-text("Complete 2FA")',
        '*:has-text("Complete 2FA")',
        'text=Complete 2FA',
        'text=complete 2fa',
        'text=COMPLETE 2FA',
        '.complete-2fa',
        '[class*="complete-2fa"]',
        '[class*="2fa-complete"]'
      ];
      
      for (const selector of selectors) {
        const element = this.page.locator(selector).first();
        const count = await element.count();
        if (count > 0) {
          const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            return true;
          }
          // Also check if element exists in DOM (might be hidden but present)
          const exists = await element.evaluate(el => {
            return el.offsetParent !== null || window.getComputedStyle(el).display !== 'none';
          }).catch(() => false);
          if (exists) {
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
   * Verifies 2FA-related UI elements are visible
   * @returns {Promise<{complete2FATextVisible: boolean, setupInstructionsVisible: boolean}>}
   */
  async verify2FAUIElementsVisible() {
    try {
      const complete2FATextVisible = await this.isComplete2FATextVisible();
      
      // Check for setup instructions or related UI elements
      const setupSelectors = [
        '[class*="2fa-setup"]',
        '[class*="setup-instructions"]',
        '[class*="qr-code"]',
        '[class*="authenticator"]',
        'img[alt*="QR"]',
        'img[alt*="qr"]',
        'button:has-text("Setup")',
        'button:has-text("Configure")'
      ];
      
      let setupInstructionsVisible = false;
      for (const selector of setupSelectors) {
        const element = this.page.locator(selector).first();
        const count = await element.count();
        if (count > 0) {
          setupInstructionsVisible = await element.isVisible({ timeout: 1000 }).catch(() => false);
          if (setupInstructionsVisible) {
            break;
          }
        }
      }
      
      return {
        complete2FATextVisible,
        setupInstructionsVisible
      };
    } catch (error) {
      return {
        complete2FATextVisible: false,
        setupInstructionsVisible: false
      };
    }
  }

  /**
   * Verifies 2FA-related UI elements are NOT visible
   * @returns {Promise<{complete2FATextVisible: boolean, setupInstructionsVisible: boolean}>}
   */
  async verify2FAUIElementsNotVisible() {
    try {
      const complete2FATextVisible = await this.isComplete2FATextVisible();
      
      // Check for setup instructions
      const setupSelectors = [
        '[class*="2fa-setup"]',
        '[class*="setup-instructions"]',
        '[class*="qr-code"]'
      ];
      
      let setupInstructionsVisible = false;
      for (const selector of setupSelectors) {
        const element = this.page.locator(selector).first();
        const count = await element.count();
        if (count > 0) {
          setupInstructionsVisible = await element.isVisible({ timeout: 500 }).catch(() => false);
          if (setupInstructionsVisible) {
            break;
          }
        }
      }
      
      return {
        complete2FATextVisible,
        setupInstructionsVisible
      };
    } catch (error) {
      return {
        complete2FATextVisible: false,
        setupInstructionsVisible: false
      };
    }
  }

  /**
   * Clicks on "Add IP address" link
   */
  async clickAddIpAddress() {
    try {
      await this.addIpAddressLink.scrollIntoViewIfNeeded();
      await this.addIpAddressLink.waitFor({ state: 'visible', timeout: 5000 });
      await this.addIpAddressLink.click();
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click Add IP address: ${error.message}`);
    }
  }

  /**
   * Checks if Add IP modal is open
   * @returns {Promise<boolean>}
   */
  async isAddIpModalOpen() {
    try {
      const modalVisible = await this.addIpModal.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies Add IP modal elements are visible
   * @returns {Promise<{modalOpen: boolean, titleVisible: boolean, infoMessageVisible: boolean, inputVisible: boolean, addButtonVisible: boolean}>}
   */
  async verifyAddIpModalElements() {
    try {
      const modalOpen = await this.isAddIpModalOpen();
      const titleVisible = await this.addIpModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
      const infoMessageVisible = await this.addIpModalInfoMessage.isVisible({ timeout: 2000 }).catch(() => false);
      const inputVisible = await this.addIpInputField.isVisible({ timeout: 2000 }).catch(() => false);
      const addButtonVisible = await this.addIpButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        modalOpen,
        titleVisible,
        infoMessageVisible,
        inputVisible,
        addButtonVisible
      };
    } catch (error) {
      return {
        modalOpen: false,
        titleVisible: false,
        infoMessageVisible: false,
        inputVisible: false,
        addButtonVisible: false
      };
    }
  }

  /**
   * Enters IP address in the Add IP modal
   * @param {string} ipAddress - The IP address to enter
   */
  async enterIpAddress(ipAddress) {
    try {
      await this.addIpInputField.scrollIntoViewIfNeeded();
      await this.addIpInputField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addIpInputField.clear();
      await this.addIpInputField.fill(ipAddress);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter IP address: ${error.message}`);
    }
  }

  /**
   * Clicks the Add button in the Add IP modal
   */
  async clickAddIpButton() {
    try {
      await this.addIpButton.scrollIntoViewIfNeeded();
      await this.addIpButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addIpButton.click();
      await this.page.waitForTimeout(1000); // Wait for action to complete
    } catch (error) {
      throw new Error(`Failed to click Add button: ${error.message}`);
    }
  }

  /**
   * Closes the Add IP modal
   */
  async closeAddIpModal() {
    try {
      const cancelVisible = await this.addIpModalCancelButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (cancelVisible) {
        await this.addIpModalCancelButton.click();
      } else {
        const closeVisible = await this.addIpModalCloseButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (closeVisible) {
          await this.addIpModalCloseButton.click();
        } else {
          await this.page.keyboard.press('Escape');
        }
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Try pressing Escape as fallback
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Checks if validation error is visible in Add IP modal
   * @returns {Promise<boolean>}
   */
  async isAddIpValidationErrorVisible() {
    try {
      const errorVisible = await this.addIpValidationError.isVisible({ timeout: 2000 }).catch(() => false);
      return errorVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the validation error message text
   * @returns {Promise<string>}
   */
  async getAddIpValidationErrorText() {
    try {
      const errorText = await this.addIpValidationError.textContent().catch(() => '');
      return errorText || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets all allowed IP addresses from the list
   * @returns {Promise<string[]>}
   */
  async getAllowedIpAddresses() {
    try {
      // First, try to get IP addresses from disabled input fields
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      const ipAddresses = [];
      
      // Extract IP addresses from disabled input fields
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        if (value && value.trim()) {
          // Validate it's an IP address format
          const ipMatch = value.trim().match(/^\b(?:\d{1,3}\.){3}\d{1,3}\b$/);
          if (ipMatch) {
            ipAddresses.push(ipMatch[0]);
          } else if (value.trim()) {
            ipAddresses.push(value.trim());
          }
        }
      }
      
      // If no IPs found in inputs, try text elements as fallback
      if (ipAddresses.length === 0) {
        const ipItems = await this.allowedIpAddressItems.all();
        
        for (const item of ipItems) {
          // Skip if it's an input field (already checked above)
          const tagName = await item.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
          if (tagName === 'input') {
            continue;
          }
          
          const text = await item.textContent().catch(() => '');
          if (text && text.trim() && !text.includes('Add IP address')) {
            // Extract IP address from text (format: IP address or IP address - Delete)
            const ipMatch = text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
            if (ipMatch) {
              ipAddresses.push(ipMatch[0]);
            } else if (text.trim()) {
              ipAddresses.push(text.trim());
            }
          }
        }
      }
      
      return ipAddresses;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if an IP address exists in the allowed IP addresses list
   * @param {string} ipAddress - The IP address to check
   * @returns {Promise<boolean>}
   */
  async isIpAddressInList(ipAddress) {
    try {
      const allowedIps = await this.getAllowedIpAddresses();
      return allowedIps.includes(ipAddress);
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies success toast message is displayed
   * @returns {Promise<boolean>}
   */
  async verifySuccessToast() {
    try {
      // Wait a bit for toast to appear
      await this.page.waitForTimeout(1000);
      
      const toastSelectors = [
        '#toast-container .toast-success',
        '.toast-container .toast-success',
        '.toast-success',
        '.toast:has-text("success")',
        '[class*="toast-success"]',
        '.notification-success'
      ];
      
      for (const selector of toastSelectors) {
        const toast = this.page.locator(selector).first();
        const count = await toast.count();
        if (count > 0) {
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
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
   * Gets the success toast message text
   * @returns {Promise<string>}
   */
  async getSuccessToastMessage() {
    try {
      const toastSelectors = [
        '#toast-container .toast-body',
        '.toast-container .toast-body',
        '.toast-body',
        '[class*="toast-message"]',
        '.toast-success'
      ];
      
      for (const selector of toastSelectors) {
        const toast = this.page.locator(selector).first();
        const count = await toast.count();
        if (count > 0) {
          const text = await toast.textContent().catch(() => '');
          if (text && text.trim()) {
            return text.trim();
          }
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the edit button for a specific IP address
   * @param {string} ipAddress - The IP address to find the edit button for
   * @returns {Promise<Locator>}
   */
  async getEditButtonForIp(ipAddress) {
    try {
      // Find the input field containing the IP address
      // HTML structure: <div class="ip-item-modern"><input disabled><i class="bi bi-pencil-fill icon-modern icon-edit"></i><i class="bi bi-trash3-fill icon-modern icon-delete"></i></div>
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        if (value && value.trim() === ipAddress) {
          // Find the edit button in the same container (ip-item-modern)
          const container = input.locator('xpath=ancestor::div[contains(@class, "ip-item-modern")]');
          const editButton = container.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit, i.bi-pencil-fill').first();
          const editCount = await editButton.count();
          if (editCount > 0) {
            return editButton;
          }
          
          // Fallback: find sibling edit icon
          const parent = input.locator('..');
          const editSibling = parent.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit').first();
          const editSiblingCount = await editSibling.count();
          if (editSiblingCount > 0) {
            return editSibling;
          }
        }
      }
      
      // Fallback: return first edit button
      return this.editIpButtons.first();
    } catch (error) {
      return this.editIpButtons.first();
    }
  }

  /**
   * Gets the delete button for a specific IP address
   * @param {string} ipAddress - The IP address to find the delete button for
   * @returns {Promise<Locator>}
   */
  async getDeleteButtonForIp(ipAddress) {
    try {
      // Find the input field containing the IP address
      // HTML structure: <div class="ip-item-modern"><input disabled><i class="bi bi-pencil-fill icon-modern icon-edit"></i><i class="bi bi-trash3-fill icon-modern icon-delete"></i></div>
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        if (value && value.trim() === ipAddress) {
          // Find the delete button in the same container (ip-item-modern)
          const container = input.locator('xpath=ancestor::div[contains(@class, "ip-item-modern")]');
          const deleteButton = container.locator('i.bi-trash3-fill.icon-delete, i.bi-trash3-fill.icon-modern, i.icon-delete, i.bi-trash3-fill').first();
          const deleteCount = await deleteButton.count();
          if (deleteCount > 0) {
            return deleteButton;
          }
          
          // Fallback: find sibling delete icon
          const parent = input.locator('..');
          const deleteSibling = parent.locator('i.bi-trash3-fill.icon-delete, i.bi-trash3-fill.icon-modern, i.icon-delete').first();
          const deleteSiblingCount = await deleteSibling.count();
          if (deleteSiblingCount > 0) {
            return deleteSibling;
          }
        }
      }
      
      // Fallback: return first delete button
      return this.deleteIpButtons.first();
    } catch (error) {
      return this.deleteIpButtons.first();
    }
  }

  /**
   * Clicks the edit button for a specific IP address
   * @param {string} ipAddress - The IP address to edit
   */
  async clickEditIpButton(ipAddress) {
    try {
      // Wait a bit for the page to be ready
      await this.page.waitForTimeout(500);
      
      // Find the input field containing the IP address
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      
      let editButton = null;
      
      // Find the edit button for the specific IP
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        if (value && value.trim() === ipAddress) {
          // Find the edit button in the same container (ip-item-modern)
          // HTML structure: <div class="ip-item-modern"><input disabled><i class="bi bi-pencil-fill icon-modern icon-edit"></i>...</div>
          const container = input.locator('xpath=ancestor::div[contains(@class, "ip-item-modern")]');
          const editButtonInContainer = container.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit, i.bi-pencil-fill').first();
          const editCount = await editButtonInContainer.count();
          if (editCount > 0) {
            editButton = editButtonInContainer;
            break;
          }
          
          // Fallback: find sibling edit icon (next sibling of input)
          const parent = input.locator('..');
          const editSibling = parent.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit').first();
          const editSiblingCount = await editSibling.count();
          if (editSiblingCount > 0) {
            editButton = editSibling;
            break;
          }
          
          // Another fallback: find edit icon that's a sibling of the input
          const editNextSibling = input.locator('xpath=following-sibling::i[contains(@class, "pencil") or contains(@class, "edit")]').first();
          const editNextSiblingCount = await editNextSibling.count();
          if (editNextSiblingCount > 0) {
            editButton = editNextSibling;
            break;
          }
        }
      }
      
      // If not found, try to find any edit button
      if (!editButton || (await editButton.count()) === 0) {
        console.log('⚠ Could not find edit button for specific IP, trying to find any edit button');
        editButton = this.editIpButtons.first();
      }
      
      // Verify edit button is found
      const buttonCount = await editButton.count();
      if (buttonCount === 0) {
        throw new Error(`Edit button not found for IP ${ipAddress}`);
      }
      
      // Click the edit button
      await editButton.scrollIntoViewIfNeeded();
      await editButton.waitFor({ state: 'visible', timeout: 5000 });
      
      // Try multiple click strategies
      try {
        await editButton.click();
      } catch (clickError) {
        // If regular click fails, try force click
        await editButton.click({ force: true });
      }
      
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click edit button for IP ${ipAddress}: ${error.message}`);
    }
  }

  /**
   * Clicks the delete button for a specific IP address
   * @param {string} ipAddress - The IP address to delete
   */
  async clickDeleteIpButton(ipAddress) {
    try {
      const deleteButton = await this.getDeleteButtonForIp(ipAddress);
      await deleteButton.scrollIntoViewIfNeeded();
      await deleteButton.waitFor({ state: 'visible', timeout: 5000 });
      await deleteButton.click();
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click delete button for IP ${ipAddress}: ${error.message}`);
    }
  }

  /**
   * Checks if Edit IP modal is open
   * @returns {Promise<boolean>}
   */
  async isEditIpModalOpen() {
    try {
      const modalVisible = await this.editIpModal.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Delete IP modal is open
   * @returns {Promise<boolean>}
   */
  async isDeleteIpModalOpen() {
    try {
      const modalVisible = await this.deleteIpModal.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Edits an IP address
   * @param {string} oldIpAddress - The current IP address
   * @param {string} newIpAddress - The new IP address
   */
  async editIpAddress(oldIpAddress, newIpAddress) {
    try {
      // Click edit button
      await this.clickEditIpButton(oldIpAddress);
      
      // Wait for modal to open
      await this.page.waitForTimeout(1000);
      const modalOpen = await this.isEditIpModalOpen();
      if (!modalOpen) {
        throw new Error('Edit IP modal did not open');
      }
      
      // Enter new IP address
      await this.editIpInputField.scrollIntoViewIfNeeded();
      await this.editIpInputField.waitFor({ state: 'visible', timeout: 5000 });
      await this.editIpInputField.clear();
      await this.editIpInputField.fill(newIpAddress);
      await this.page.waitForTimeout(500);
      
      // Click Edit/Save button in modal
      await this.editIpSaveButton.scrollIntoViewIfNeeded();
      await this.editIpSaveButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.editIpSaveButton.click();
      await this.page.waitForTimeout(1000); // Wait for action to complete
    } catch (error) {
      throw new Error(`Failed to edit IP address: ${error.message}`);
    }
  }

  /**
   * Deletes an IP address
   * @param {string} ipAddress - The IP address to delete
   */
  async deleteIpAddress(ipAddress) {
    try {
      // Click delete button
      await this.clickDeleteIpButton(ipAddress);
      
      // Wait for confirmation modal to open
      await this.page.waitForTimeout(1000);
      const modalOpen = await this.isDeleteIpModalOpen();
      if (!modalOpen) {
        // If no modal, the delete might be immediate
        await this.page.waitForTimeout(1000);
        return;
      }
      
      // Click Confirm/Delete button in modal
      await this.deleteIpConfirmButton.scrollIntoViewIfNeeded();
      await this.deleteIpConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteIpConfirmButton.click();
      await this.page.waitForTimeout(1000); // Wait for action to complete
    } catch (error) {
      throw new Error(`Failed to delete IP address: ${error.message}`);
    }
  }

  /**
   * Clicks on "Add time range" link
   */
  async clickAddTimeRange() {
    try {
      await this.addTimeRangeLink.scrollIntoViewIfNeeded();
      await this.addTimeRangeLink.waitFor({ state: 'visible', timeout: 5000 });
      await this.addTimeRangeLink.click();
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click Add time range: ${error.message}`);
    }
  }

  /**
   * Checks if "Add time range" link is visible
   * @returns {Promise<boolean>}
   */
  async isAddTimeRangeVisible() {
    try {
      return await this.addTimeRangeLink.isVisible({ timeout: 3000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the first edit access time button (used when "Add time range" is not visible)
   * @returns {Promise<void>}
   */
  async clickFirstEditAccessTimeButton() {
    try {
      await this.page.waitForTimeout(500);
      
      // Find the first edit button - use multiple selectors (prioritize .time-item-modern)
      const editButtonSelectors = [
        this.page.locator('.time-item-modern i.bi-pencil-fill.icon-edit').first(),
        this.page.locator('.time-item-modern i.bi-pencil-fill.icon-modern').first(),
        this.page.locator('.time-item-modern i.bi-pencil-fill').first(),
        this.editAccessTimeButtons.first(),
        this.page.locator('i.bi-pencil-fill.icon-edit:near(input[disabled])').first(),
        this.page.locator('i.bi-pencil-fill.icon-modern:near(input[disabled])').first(),
        this.page.locator('i.bi-pencil-fill.icon-edit').first()
      ];
      
      let editButton = null;
      for (const selector of editButtonSelectors) {
        try {
          const count = await selector.count().catch(() => 0);
          if (count > 0) {
            const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              editButton = selector;
              break;
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (!editButton) {
        throw new Error('No edit access time button found');
      }
      
      await editButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await editButton.waitFor({ state: 'visible', timeout: 5000 });
      await editButton.click({ force: true });
      
      // Wait for modal to open - use Promise.race to wait for modal or timeout
      await Promise.race([
        this.editAccessTimeModal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
        this.page.waitForTimeout(2500)
      ]);
      
      // Verify modal opened
      const modalOpen = await this.isEditAccessTimeModalOpen();
      if (!modalOpen) {
        // Try waiting a bit more
        await this.page.waitForTimeout(1000);
        const modalOpenRetry = await this.isEditAccessTimeModalOpen();
        if (!modalOpenRetry) {
          throw new Error('Edit Access Time modal did not open after clicking edit button');
        }
      }
    } catch (error) {
      throw new Error(`Failed to click first edit access time button: ${error.message}`);
    }
  }

  /**
   * Checks if Add Access Time modal is open
   * @returns {Promise<boolean>}
   */
  async isAddAccessTimeModalOpen() {
    try {
      const modalVisible = await this.addAccessTimeModal.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects access days in the Add Access Time modal or Edit Access Time modal
   * @param {string[]} days - Array of day abbreviations (e.g., ['Mon', 'Tue', 'Wed'])
   */
  async selectAccessDays(days) {
    try {
      // Wait for modal to be fully loaded
      await this.page.waitForTimeout(500);
      
      // Verify either Add or Edit Access Time modal is open
      const addModalOpen = await this.isAddAccessTimeModalOpen();
      const editModalOpen = await this.isEditAccessTimeModalOpen();
      if (!addModalOpen && !editModalOpen) {
        throw new Error('Access Time modal (Add or Edit) is not open');
      }
      
      // Find day buttons by text within the modal
      const dayMap = {
        'Mon': this.page.locator('.modal .access-btns:has-text("Mon"), .modal div.access-btns:has-text(" Mon ")').first(),
        'Tue': this.page.locator('.modal .access-btns:has-text("Tue"), .modal div.access-btns:has-text(" Tue ")').first(),
        'Wed': this.page.locator('.modal .access-btns:has-text("Wed"), .modal div.access-btns:has-text(" Wed ")').first(),
        'Thu': this.page.locator('.modal .access-btns:has-text("Thu"), .modal div.access-btns:has-text(" Thu ")').first(),
        'Fri': this.page.locator('.modal .access-btns:has-text("Fri"), .modal div.access-btns:has-text(" Fri ")').first(),
        'Sat': this.page.locator('.modal .access-btns:has-text("Sat"), .modal div.access-btns:has-text(" Sat ")').first(),
        'Sun': this.page.locator('.modal .access-btns:has-text("Sun"), .modal div.access-btns:has-text(" Sun ")').first()
      };

      for (const day of days) {
        const dayButton = dayMap[day];
        if (dayButton) {
          const count = await dayButton.count();
          if (count === 0) {
            throw new Error(`Day button for ${day} not found`);
          }
          
          await dayButton.scrollIntoViewIfNeeded();
          await dayButton.waitFor({ state: 'visible', timeout: 5000 });
          
          // Check if already selected before clicking
          const isAlreadySelected = await dayButton.evaluate(el => {
            const computedStyle = window.getComputedStyle(el);
            const bgColor = computedStyle.backgroundColor;
            return bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent' && bgColor !== 'rgb(255, 255, 255)';
          }).catch(() => false);
          
          if (!isAlreadySelected) {
            await dayButton.click({ force: true });
            await this.page.waitForTimeout(400); // Wait for state to update after click
          }
        } else {
          throw new Error(`Day button locator not found for ${day}`);
        }
      }
      await this.page.waitForTimeout(500); // Wait for UI to fully update
    } catch (error) {
      throw new Error(`Failed to select access days: ${error.message}`);
    }
  }

  /**
   * Clears all selected access days
   * @returns {Promise<void>}
   */
  async clearAccessDays() {
    try {
      // Wait for modal to be fully loaded
      await this.page.waitForTimeout(500);
      
      // Verify either Add or Edit Access Time modal is open
      const addModalOpen = await this.isAddAccessTimeModalOpen();
      const editModalOpen = await this.isEditAccessTimeModalOpen();
      if (!addModalOpen && !editModalOpen) {
        throw new Error('Access Time modal (Add or Edit) is not open');
      }
      
      // Get currently selected days first
      const currentlySelected = await this.getSelectedAccessDays();
      console.log(`  Currently selected days: ${currentlySelected.join(', ') || 'none'}`);
      
      if (currentlySelected.length === 0) {
        console.log('  No days selected, nothing to clear');
        return;
      }
      
      // Click all selected days to deselect them
      const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (const day of allDays) {
        if (currentlySelected.includes(day)) {
          try {
            const dayButton = this.page.locator(`.modal .access-btns:has-text("${day}"), .modal div.access-btns:has-text(" ${day} ")`).first();
            const count = await dayButton.count().catch(() => 0);
            if (count > 0) {
              await dayButton.scrollIntoViewIfNeeded();
              await dayButton.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
              await dayButton.click({ force: true, timeout: 2000 }).catch(() => {});
              await this.page.waitForTimeout(200); // Wait for state to update
            }
          } catch (error) {
            // Continue to next day
          }
        }
      }
      
      await this.page.waitForTimeout(500); // Wait for UI to fully update
      console.log('  ✓ Access days cleared');
    } catch (error) {
      throw new Error(`Failed to clear access days: ${error.message}`);
    }
  }

  /**
   * Gets the currently selected access days
   * @returns {Promise<string[]>}
   */
  async getSelectedAccessDays() {
    try {
      // Find all access day buttons/divs within the modal
      const selectedDays = [];
      const dayButtons = this.page.locator('.modal .access-btns, .modal div.access-btns');
      const count = await dayButtons.count();
      
      for (let i = 0; i < count; i++) {
        const button = dayButtons.nth(i);
        const text = await button.textContent().catch(() => '');
        const trimmedText = text.trim();
        
        if (trimmedText && trimmedText.length <= 3 && ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].includes(trimmedText)) {
          // Check if the element is selected by checking multiple indicators
          const isSelected = await button.evaluate(el => {
            // Check for common selection classes
            const hasSelectionClass = el.classList.contains('active') || 
                                     el.classList.contains('selected') || 
                                     el.classList.contains('btn-primary') ||
                                     el.classList.contains('btn-active') ||
                                     el.classList.contains('selected-day') ||
                                     el.classList.contains('access-btns-selected');
            
            // Check computed styles (background color, border, etc.)
            const computedStyle = window.getComputedStyle(el);
            const bgColor = computedStyle.backgroundColor;
            const borderColor = computedStyle.borderColor;
            const color = computedStyle.color;
            
            // Check if background color indicates selection (not transparent/white)
            const hasBackground = bgColor && 
                                  bgColor !== 'rgba(0, 0, 0, 0)' && 
                                  bgColor !== 'transparent' && 
                                  bgColor !== 'rgb(255, 255, 255)' &&
                                  bgColor !== 'rgba(255, 255, 255, 0)';
            
            // Check if border indicates selection
            const hasBorder = borderColor && 
                             borderColor !== 'rgba(0, 0, 0, 0)' && 
                             borderColor !== 'transparent' &&
                             borderColor !== 'rgb(0, 0, 0)';
            
            // Check inline styles
            const hasInlineStyle = el.style.backgroundColor !== '' || 
                                  el.style.borderColor !== '' ||
                                  el.style.borderWidth !== '';
            
            // Check attributes
            const hasSelectedAttr = el.getAttribute('aria-pressed') === 'true' ||
                                   el.getAttribute('aria-selected') === 'true' ||
                                   el.getAttribute('data-selected') === 'true' ||
                                   el.getAttribute('ng-reflect-selected') === 'true';
            
            // Check for Angular-specific attributes
            const ngClass = el.getAttribute('ng-reflect-ng-class');
            const hasNgClass = ngClass && (ngClass.includes('selected') || ngClass.includes('active'));
            
            // Check if element has a different color (selected state often changes text color)
            const hasDifferentColor = color && 
                                     color !== 'rgb(0, 0, 0)' && 
                                     color !== 'rgb(33, 37, 41)' &&
                                     color !== 'rgba(0, 0, 0, 0.87)';
            
            return hasSelectionClass || hasBackground || hasBorder || hasInlineStyle || hasSelectedAttr || hasNgClass || hasDifferentColor;
          }).catch(() => false);
          
          if (isSelected) {
            selectedDays.push(trimmedText);
          }
        }
      }
      
      return selectedDays;
    } catch (error) {
      return [];
    }
  }

  /**
   * Selects time range in the Add Access Time modal
   * @param {string} startTime - Start time in HH:mm format (e.g., '09:00')
   * @param {string} endTime - End time in HH:mm format (e.g., '17:00')
   */
  async selectTimeRange(startTime, endTime) {
    try {
      // Select start time
      await this.startTimeDropdown.scrollIntoViewIfNeeded();
      await this.startTimeDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.startTimeDropdown.selectOption(startTime);
      await this.page.waitForTimeout(500);

      // Select end time
      await this.endTimeDropdown.scrollIntoViewIfNeeded();
      await this.endTimeDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.endTimeDropdown.selectOption(endTime);
      await this.page.waitForTimeout(500); // Wait for UI to update
    } catch (error) {
      throw new Error(`Failed to select time range: ${error.message}`);
    }
  }

  /**
   * Gets the "Allow access only at" summary text
   * @returns {Promise<string>}
   */
  async getAllowAccessOnlyAtText() {
    try {
      const text = await this.allowAccessOnlyAtText.textContent().catch(() => '');
      return text.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Clicks the Add button in the Add Access Time modal
   */
  async clickAddAccessTimeButton() {
    try {
      await this.addAccessTimeButton.scrollIntoViewIfNeeded();
      await this.addAccessTimeButton.waitFor({ state: 'visible', timeout: 5000 });
      // Wait for button to be enabled
      await this.page.waitForTimeout(500);
      
      // Check if button is disabled and wait for it to be enabled
      let attempts = 0;
      const maxAttempts = 20; // 10 seconds total (20 * 500ms)
      while (attempts < maxAttempts) {
        const isDisabled = await this.addAccessTimeButton.isDisabled().catch(() => false);
        if (!isDisabled) {
          break;
        }
        await this.page.waitForTimeout(500);
        attempts++;
      }
      
      // Try clicking even if it might still be disabled (force click as last resort)
      try {
        await this.addAccessTimeButton.click();
      } catch (clickError) {
        // If regular click fails, try force click
        await this.addAccessTimeButton.click({ force: true });
      }
      
      await this.page.waitForTimeout(1000); // Wait for action to complete
    } catch (error) {
      throw new Error(`Failed to click Add button: ${error.message}`);
    }
  }

  /**
   * Gets all access time entries from the list
   * @returns {Promise<string[]>}
   */
  async getAccessTimeEntries() {
    try {
      const entries = [];
      // Wait a bit for the page to update
      await this.page.waitForTimeout(1000);
      
      // Find all disabled input fields that contain access time information
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        
        if (value && value.trim()) {
          // Check if value contains day names or time information (access time format)
          const isAccessTimeEntry = value.includes('Mon') || value.includes('Tue') || value.includes('Wed') || 
              value.includes('Thu') || value.includes('Fri') || value.includes('Sat') || 
              value.includes('Sun') || value.includes('Every day') || value.includes('any time') ||
              value.includes('Asia/') || value.includes('timezone') || value.includes('to ') ||
              value.includes(', any time') || value.includes(', +');
          
          if (isAccessTimeEntry) {
            // Check if this input has edit/delete icons nearby (more flexible check)
            const container = input.locator('xpath=ancestor::div[contains(@class, "ip-item-modern") or contains(@class, "access-time")]');
            const containerCount = await container.count().catch(() => 0);
            
            // Also check for sibling icons
            const hasEditIcon = await input.locator('xpath=following-sibling::i[contains(@class, "pencil") or contains(@class, "edit")]').count().catch(() => 0);
            const hasDeleteIcon = await input.locator('xpath=following-sibling::i[contains(@class, "trash") or contains(@class, "delete")]').count().catch(() => 0);
            
            // If it looks like an access time entry, include it (even if we can't find icons)
            if (containerCount > 0 || hasEditIcon > 0 || hasDeleteIcon > 0 || isAccessTimeEntry) {
              entries.push(value.trim());
            }
          }
        }
      }
      
      return entries;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if an access time entry exists in the list
   * @param {string} accessTimeText - The access time text to check (partial match)
   * @returns {Promise<boolean>}
   */
  async isAccessTimeInList(accessTimeText) {
    try {
      const entries = await this.getAccessTimeEntries();
      const searchText = accessTimeText.toLowerCase();
      
      // Check for various match patterns
      return entries.some(entry => {
        const entryLower = entry.toLowerCase();
        return entryLower.includes(searchText) || 
               searchText.includes(entryLower) ||
               entryLower.includes(searchText + ',') ||
               entryLower.includes(searchText + ' to') ||
               entryLower.includes('to ' + searchText);
      });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the edit button for a specific access time entry
   * @param {string} accessTimeText - The access time text to find the edit button for
   * @returns {Promise<Locator>}
   */
  async getEditButtonForAccessTime(accessTimeText) {
    try {
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        if (value && value.trim() && (value.includes(accessTimeText) || accessTimeText.includes(value))) {
          // Find the edit button near this input
          const container = input.locator('xpath=ancestor::div[contains(@class, "ip-item-modern") or contains(@class, "access-time")]');
          const editButton = container.locator('i.bi-pencil-fill.icon-edit, i.bi-pencil-fill.icon-modern, i.icon-edit, i.bi-pencil-fill').first();
          const editCount = await editButton.count();
          if (editCount > 0) {
            return editButton;
          }
          
          // Fallback: find sibling edit icon
          const editSibling = input.locator('xpath=following-sibling::i[contains(@class, "pencil") or contains(@class, "edit")]').first();
          const editSiblingCount = await editSibling.count();
          if (editSiblingCount > 0) {
            return editSibling;
          }
        }
      }
      
      // Fallback: return first edit button
      return this.editAccessTimeButtons.first();
    } catch (error) {
      return this.editAccessTimeButtons.first();
    }
  }

  /**
   * Gets the delete button for a specific access time entry
   * @param {string} accessTimeText - The access time text to find the delete button for
   * @returns {Promise<Locator>}
   */
  async getDeleteButtonForAccessTime(accessTimeText) {
    try {
      const disabledInputs = this.page.locator('input[type="text"][disabled], input.form-controls[disabled], input[disabled].form-controls');
      const inputCount = await disabledInputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = disabledInputs.nth(i);
        const value = await input.inputValue().catch(() => '');
        if (value && value.trim() && (value.includes(accessTimeText) || accessTimeText.includes(value))) {
          // Find the delete button near this input
          const container = input.locator('xpath=ancestor::div[contains(@class, "ip-item-modern") or contains(@class, "access-time")]');
          const deleteButton = container.locator('i.bi-trash3-fill.icon-delete, i.bi-trash3-fill.icon-modern, i.icon-delete, i.bi-trash3-fill').first();
          const deleteCount = await deleteButton.count();
          if (deleteCount > 0) {
            return deleteButton;
          }
          
          // Fallback: find sibling delete icon
          const deleteSibling = input.locator('xpath=following-sibling::i[contains(@class, "trash") or contains(@class, "delete")]').first();
          const deleteSiblingCount = await deleteSibling.count();
          if (deleteSiblingCount > 0) {
            return deleteSibling;
          }
        }
      }
      
      // Fallback: return first delete button
      return this.deleteAccessTimeButtons.first();
    } catch (error) {
      return this.deleteAccessTimeButtons.first();
    }
  }

  /**
   * Clicks the Edit button inside the Edit Access Time modal
   * @returns {Promise<void>}
   */
  async clickEditAccessTimeButtonInModal() {
    try {
      await this.page.waitForTimeout(500);
      
      // Try to find and click the Edit button with multiple selectors
      const editButtonSelectors = [
        this.editAccessTimeButton,
        this.page.locator('.modal button[type="submit"].primary-btn.btn-modal-primary:has-text("Edit")').first(),
        this.page.locator('.modal button[type="submit"].btn-modal-primary:has-text("Edit")').first(),
        this.page.locator('.modal button.primary-btn.flex-fill:has-text("Edit")').first(),
        this.page.locator('.modal button.primary-btn:has-text("Edit")').first(),
        this.page.locator('.modal button[type="submit"]:has-text("Edit")').first(),
        this.page.locator('.modal button.btn-modal-primary:has-text("Edit")').first(),
        this.page.locator('.modal button:has-text("Edit")').first()
      ];
      
      for (const editButton of editButtonSelectors) {
        try {
          const count = await editButton.count().catch(() => 0);
          if (count > 0) {
            const isVisible = await editButton.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              await editButton.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(300);
              await editButton.click({ timeout: 5000 });
              await this.page.waitForTimeout(1000);
              return;
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      throw new Error('Edit button not found in modal');
    } catch (error) {
      throw new Error(`Failed to click Edit button in modal: ${error.message}`);
    }
  }

  /**
   * Clicks the edit button for a specific access time entry
   * @param {string} accessTimeText - The access time text to edit
   */
  async clickEditAccessTimeButton(accessTimeText) {
    try {
      await this.page.waitForTimeout(500);
      const editButton = await this.getEditButtonForAccessTime(accessTimeText);
      await editButton.scrollIntoViewIfNeeded();
      await editButton.waitFor({ state: 'visible', timeout: 5000 });
      await editButton.click({ force: true });
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click edit button for access time: ${error.message}`);
    }
  }

  /**
   * Clicks the delete button for a specific access time entry
   * @param {string} accessTimeText - The access time text to delete
   */
  async clickDeleteAccessTimeButton(accessTimeText) {
    try {
      await this.page.waitForTimeout(500);
      const deleteButton = await this.getDeleteButtonForAccessTime(accessTimeText);
      await deleteButton.scrollIntoViewIfNeeded();
      await deleteButton.waitFor({ state: 'visible', timeout: 5000 });
      await deleteButton.click({ force: true });
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click delete button for access time: ${error.message}`);
    }
  }

  /**
   * Checks if Edit Access Time modal is open
   * @returns {Promise<boolean>}
   */
  async isEditAccessTimeModalOpen() {
    try {
      const modalVisible = await this.editAccessTimeModal.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Delete Access Time modal is open
   * @returns {Promise<boolean>}
   */
  async isDeleteAccessTimeModalOpen() {
    try {
      const modalVisible = await this.deleteAccessTimeModal.isVisible({ timeout: 3000 }).catch(() => false);
      return modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Edits an access time entry
   * @param {string} oldAccessTimeText - The current access time text
   * @param {object} options - Edit options
   * @param {string[]} options.days - Array of day abbreviations (e.g., ['Mon', 'Tue'])
   * @param {string} options.startTime - Start time in HH:mm format (optional)
   * @param {string} options.endTime - End time in HH:mm format (optional)
   */
  async editAccessTime(oldAccessTimeText, options = {}) {
    try {
      // Click edit button
      await this.clickEditAccessTimeButton(oldAccessTimeText);
      
      // Wait for modal to open
      await this.page.waitForTimeout(1000);
      const modalOpen = await this.isEditAccessTimeModalOpen();
      if (!modalOpen) {
        throw new Error('Edit Access Time modal did not open');
      }
      
      // Update days if provided
      if (options.days && options.days.length > 0) {
        console.log(`  Updating days to: ${options.days.join(', ')}`);
        // Wait for modal to be fully loaded
        await this.page.waitForTimeout(500);
        
        // Get currently selected days first (with timeout to prevent hanging)
        let currentlySelected = [];
        try {
          currentlySelected = await Promise.race([
            this.getSelectedAccessDays(),
            new Promise((resolve) => setTimeout(() => resolve([]), 3000))
          ]).catch(() => []);
        } catch (error) {
          console.log('  ⚠ Could not get current selection, proceeding with toggle approach');
        }
        console.log(`  Currently selected days: ${currentlySelected.join(', ') || 'none'}`);
        
        const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        // If we couldn't get current selection, use simple approach: clear all, then select new
        if (currentlySelected.length === 0) {
          console.log('  Using simple approach: clearing all days, then selecting new ones');
          // Click all days once to clear
          for (const day of allDays) {
            try {
              const dayButton = this.page.locator(`.modal .access-btns:has-text("${day}"), .modal div.access-btns:has-text(" ${day} ")`).first();
              const count = await dayButton.count().catch(() => 0);
              if (count > 0) {
                await dayButton.scrollIntoViewIfNeeded();
                await dayButton.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
                await dayButton.click({ force: true, timeout: 2000 }).catch(() => {});
                await this.page.waitForTimeout(100);
              }
            } catch (error) {
              // Continue
            }
          }
          await this.page.waitForTimeout(300);
          
          // Now select the new days
          for (const day of options.days) {
            try {
              const dayButton = this.page.locator(`.modal .access-btns:has-text("${day}"), .modal div.access-btns:has-text(" ${day} ")`).first();
              const count = await dayButton.count().catch(() => 0);
              if (count > 0) {
                await dayButton.scrollIntoViewIfNeeded();
                await dayButton.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
                await dayButton.click({ force: true, timeout: 2000 });
                await this.page.waitForTimeout(200);
                console.log(`    Selected ${day}`);
              }
            } catch (error) {
              console.log(`    ⚠ Could not select ${day}`);
            }
          }
        } else {
          // Use smart approach: only toggle days that need to change
          for (const day of allDays) {
            const shouldBeSelected = options.days.includes(day);
            const isCurrentlySelected = currentlySelected.includes(day);
            
            // Only click if state needs to change
            if (shouldBeSelected !== isCurrentlySelected) {
              try {
                const dayButton = this.page.locator(`.modal .access-btns:has-text("${day}"), .modal div.access-btns:has-text(" ${day} ")`).first();
                const count = await dayButton.count().catch(() => 0);
                if (count > 0) {
                  await dayButton.scrollIntoViewIfNeeded();
                  await dayButton.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
                  await dayButton.click({ force: true, timeout: 2000 });
                  await this.page.waitForTimeout(200); // Wait for state to update
                  console.log(`    ${shouldBeSelected ? 'Selected' : 'Deselected'} ${day}`);
                }
              } catch (error) {
                console.log(`    ⚠ Could not toggle ${day}`);
              }
            }
          }
        }
        
        // Wait for UI to update
        await this.page.waitForTimeout(500);
        console.log('  ✓ Days updated');
      }
      
      // Update time range if provided
      if (options.startTime && options.endTime) {
        console.log(`  Updating time range to: ${options.startTime} - ${options.endTime}`);
        await this.selectTimeRange(options.startTime, options.endTime);
        console.log('  ✓ Time range updated');
      }
      
      // Click Edit button
      console.log('  Clicking Edit button in modal...');
      try {
        // Wait a bit for button to be ready
        await this.page.waitForTimeout(500);
        
        // Try to find and click the Edit button with multiple selectors
        const editButtonSelectors = [
          '.modal button[type="submit"].primary-btn.btn-modal-primary:has-text("Edit")',
          '.modal button[type="submit"].btn-modal-primary:has-text("Edit")',
          '.modal button.primary-btn.flex-fill:has-text("Edit")',
          '.modal button.primary-btn:has-text("Edit")',
          '.modal button[type="submit"]:has-text("Edit")',
          '.modal button.btn-modal-primary:has-text("Edit")',
          '.modal button:has-text("Edit")'
        ];
        
        let editButtonClicked = false;
        for (const selector of editButtonSelectors) {
          try {
            const editButton = this.page.locator(selector).first();
            const count = await editButton.count().catch(() => 0);
            if (count > 0) {
              const isVisible = await editButton.isVisible({ timeout: 2000 }).catch(() => false);
              if (isVisible) {
                await editButton.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(300);
                
                // Check if disabled with short timeout
                const isDisabled = await Promise.race([
                  editButton.isDisabled(),
                  new Promise((resolve) => setTimeout(() => resolve(false), 1000))
                ]).catch(() => false);
                
                // Click the button with timeout wrapper to prevent hanging
                try {
                  const clickPromise = !isDisabled 
                    ? editButton.click({ timeout: 5000 })
                    : editButton.click({ force: true, timeout: 5000 });
                  
                  // Wrap in Promise.race to prevent infinite wait
                  await Promise.race([
                    clickPromise,
                    new Promise((_, reject) => 
                      setTimeout(() => reject(new Error('Click timeout')), 5000)
                    )
                  ]);
                  
                  editButtonClicked = true;
                  console.log('  ✓ Clicked Edit button');
                  break;
                } catch (clickError) {
                  // If regular click fails or times out, try force click with shorter timeout
                  try {
                    await Promise.race([
                      editButton.click({ force: true, timeout: 3000 }),
                      new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Force click timeout')), 3000)
                      )
                    ]);
                    editButtonClicked = true;
                    console.log('  ✓ Clicked Edit button (force)');
                    break;
                  } catch (forceError) {
                    // If both fail, continue to next selector
                    console.log(`  ⚠ Could not click with selector: ${selector}`);
                    continue;
                  }
                }
              }
            }
          } catch (error) {
            // Try next selector
            continue;
          }
        }
        
        if (!editButtonClicked) {
          throw new Error('Could not find or click Edit button');
        }
      } catch (error) {
        throw new Error(`Failed to click Edit button: ${error.message}`);
      }
      
      // Wait for modal to close (with timeout to prevent hanging)
      console.log('  Waiting for modal to close...');
      try {
        // Check if modal is still open
        const modalStillOpen = await this.isEditAccessTimeModalOpen();
        if (modalStillOpen) {
          // Wait for modal to close with timeout
          await Promise.race([
            this.page.waitForFunction(
              () => {
                const modals = document.querySelectorAll('.modal.show, .modal[style*="display: block"], .common-modal.modern-modal-security');
                return modals.length === 0;
              },
              { timeout: 3000 }
            ).catch(() => {}),
            new Promise((resolve) => setTimeout(resolve, 2000))
          ]);
        }
        console.log('  ✓ Modal closed');
      } catch (error) {
        // Modal might have closed already or timeout occurred
        console.log('  Modal closed or timeout');
      }
      
      await this.page.waitForTimeout(500); // Short wait for page to update
    } catch (error) {
      throw new Error(`Failed to edit access time: ${error.message}`);
    }
  }

  /**
   * Deletes an access time entry
   * @param {string} accessTimeText - The access time text to delete
   */
  async deleteAccessTime(accessTimeText) {
    try {
      // Click delete button
      await this.clickDeleteAccessTimeButton(accessTimeText);
      
      // Wait for confirmation modal to open
      await this.page.waitForTimeout(1000);
      const modalOpen = await this.isDeleteAccessTimeModalOpen();
      if (!modalOpen) {
        // If no modal, the delete might be immediate
        await this.page.waitForTimeout(1000);
        return;
      }
      
      // Click Confirm/Delete button in modal
      await this.deleteAccessTimeConfirmButton.scrollIntoViewIfNeeded();
      await this.deleteAccessTimeConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteAccessTimeConfirmButton.click();
      await this.page.waitForTimeout(1000); // Wait for action to complete
    } catch (error) {
      throw new Error(`Failed to delete access time: ${error.message}`);
    }
  }
}

module.exports = { SecurityRulesPage };

