const { expect } = require('@playwright/test');

class SettingsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Settings
    this.settingsMenuItem = page
      .locator(
        'div.sidebar-items:has(span.title:has-text("Settings")), ' +
        'div[ng-reflect-router-link="/settings"]:has(span.title:has-text("Settings")), ' +
        'div.sidebar-items:has(i.bi-gear):has(span.title:has-text("Settings"))'
      )
      .first();

    // Page heading - multiple strategies
    this.pageHeading = page.locator(
      'h1:has-text("Settings"), ' +
      'h2:has-text("Settings"), ' +
      'h3:has-text("Settings"), ' +
      'h4:has-text("Settings"), ' +
      'h5:has-text("Settings"), ' +
      'h6:has-text("Settings"), ' +
      'span:has-text("Settings"), ' +
      'div:has-text("Settings"):not(div.sidebar-items), ' +
      '[class*="title"]:has-text("Settings"), ' +
      '[class*="heading"]:has-text("Settings")'
    ).first();

    // ==================== GOOGLE DRIVE SECTION ====================
    
    // Google Drive card/section
    this.googleDriveCard = page.locator('div.card:has-text("Show Google Drive"), div:has-text("Show Google Drive")').first();
    
    // Google Drive descriptive text - multiple strategies
    this.googleDriveDescription = page.locator(
      'text=/.*Google.*authentication.*backup.*/i, ' +
      'text=/.*authenticate.*Google.*/i, ' +
      'text=/.*Google.*Drive.*/i, ' +
      'text=/.*Google.*backup.*/i, ' +
      'p:has-text("Google"), ' +
      'div:has-text("Google"):has-text("authentication"), ' +
      'div:has-text("Google"):has-text("backup"), ' +
      'span:has-text("Google"):has-text("authentication"), ' +
      'span:has-text("Google"):has-text("backup")'
    ).first();
    
    // "See Google Pages" link
    this.seeGooglePagesLink = page.locator('a:has-text("See Google Pages"), link:has-text("See Google Pages"), span:has-text("See Google Pages")').first();
    
    // Show Google Drive checkbox
    this.showGoogleDriveCheckbox = page.locator('input[type="checkbox"][id*="google"], input[type="checkbox"]:near(:has-text("Show google drive")), input[type="checkbox"]:near(:has-text("Show Google Drive"))').first();
    this.showGoogleDriveCheckboxLabel = page.locator('label:has-text("Show google drive"), label:has-text("Show Google Drive")').first();
    
    // Save button (for Google Drive section or general)
    this.saveButton = page.locator('button:has-text("Save"), button[type="submit"]:has-text("Save")').first();
    
    // ==================== TICKET SUPPORT SECTION ====================
    
    // Ticket Support card/section
    this.ticketSupportCard = page.locator('div.card:has-text("Ticket Support"), div:has-text("Ticket Support")').first();
    
    // Ticket Support question text
    this.ticketSupportQuestion = page.locator('text=/.*Do you want to enable ticketing support feature on your customer portal.*/i').first();
    
    // Radio buttons - Yes and No (using concrete HTML structure)
    this.ticketSupportYesRadio = page
      .locator(
        'input[type="radio"][name="enableSupport"][formcontrolname="enableSupport"][ng-reflect-value="true"], ' +
          'input[type="radio"][formcontrolname="enableSupport"][ng-reflect-value="true"]',
      )
      .first();
    this.ticketSupportNoRadio = page
      .locator(
        'input[type="radio"][name="enableSupport"][formcontrolname="enableSupport"][ng-reflect-value="false"], ' +
          'input[type="radio"][formcontrolname="enableSupport"][ng-reflect-value="false"]',
      )
      .first();
    this.ticketSupportYesLabel = page.locator(
      'label:has-text("Yes"), div.fs-6.mt-3 label:nth-of-type(1)',
    ).first();
    this.ticketSupportNoLabel = page.locator(
      'label:has-text("No"), div.fs-6.mt-3 label:nth-of-type(2)',
    ).first();
    
    // Support email input field
    this.supportEmailInput = page.locator('input[type="email"][id*="support"], input[type="email"][id*="email"], input[type="email"]:near(:has-text("support")), input[type="email"]:near(:has-text("email"))').first();
    this.supportEmailLabel = page.locator('label:has-text("Support Email"), label:has-text("Email"), mat-label:has-text("Support Email"), mat-label:has-text("Email")').first();
    
    // ==================== TOAST/SUCCESS MESSAGES ====================
    
    // Success toast/message
    this.successToast = page.locator('div.toast-success, div.toast:has-text("success"), div[role="alert"]:has-text("success"), div:has-text("Settings saved"), div:has-text("Saved successfully")').first();
    
    // Error/validation message
    this.errorMessage = page.locator('div.error, div.text-danger, mat-error, div:has-text("invalid"), div:has-text("error")').first();
    this.emailValidationError = page.locator('mat-error:has-text("email"), div:has-text("invalid email"), div:has-text("email format")').first();
  }

  /**
   * Navigate to Settings page
   */
  async navigateToSettings() {
    try {
      console.log('  Navigating to Settings page...');
      
      // Wait for sidebar to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);

      // Check if settings menu item is visible
      const isVisible = await this.settingsMenuItem.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!isVisible) {
        // Try scrolling to find it
        await this.settingsMenuItem.scrollIntoViewIfNeeded({ timeout: 5000 });
      }

      // Click on Settings menu item
      await this.settingsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.settingsMenuItem.scrollIntoViewIfNeeded();
      await this.settingsMenuItem.click();
      
      // Wait for navigation
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      console.log('  ✓ Clicked on Settings menu item');
    } catch (error) {
      console.log(`  ⚠ Error navigating to Settings page: ${error.message}`);
      throw new Error(`Error navigating to Settings page: ${error.message}`);
    }
  }

  /**
   * Verify Settings page is visible
   */
  async isSettingsPageVisible() {
    try {
      // Try multiple strategies to verify page is loaded
      const strategies = [
        // Strategy 1: Check page heading
        async () => {
          const headingVisible = await this.pageHeading.isVisible({ timeout: 3000 }).catch(() => false);
          if (headingVisible) return true;
          return false;
        },
        // Strategy 2: Check for Google Drive card (indicates Settings page loaded)
        async () => {
          const cardVisible = await this.googleDriveCard.isVisible({ timeout: 3000 }).catch(() => false);
          if (cardVisible) return true;
          return false;
        },
        // Strategy 3: Check for Ticket Support card
        async () => {
          const cardVisible = await this.ticketSupportCard.isVisible({ timeout: 3000 }).catch(() => false);
          if (cardVisible) return true;
          return false;
        },
        // Strategy 4: Check URL contains "settings"
        async () => {
          const url = this.page.url();
          if (url.toLowerCase().includes('settings')) return true;
          return false;
        }
      ];

      for (const strategy of strategies) {
        try {
          const result = await strategy();
          if (result) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking Settings page visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify page heading is visible
   */
  async isPageHeadingVisible() {
    try {
      const headingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      return headingVisible;
    } catch (error) {
      console.log(`  ⚠ Error checking page heading visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get page heading text
   */
  async getPageHeadingText() {
    try {
      const text = await this.pageHeading.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      return '';
    }
  }

  // ==================== GOOGLE DRIVE SECTION METHODS ====================

  /**
   * Verify Google Drive card/section is visible
   */
  async isGoogleDriveCardVisible() {
    try {
      const visible = await this.googleDriveCard.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Google Drive card visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Google Drive descriptive text is visible
   */
  async isGoogleDriveDescriptionVisible() {
    try {
      // Try multiple strategies to find description text
      const strategies = [
        // Strategy 1: Use the main locator
        async () => {
          const visible = await this.googleDriveDescription.isVisible({ timeout: 3000 }).catch(() => false);
          if (visible) return true;
          return false;
        },
        // Strategy 2: Look for any text containing "Google" within the Google Drive card
        async () => {
          const card = this.googleDriveCard;
          if (await card.isVisible({ timeout: 3000 }).catch(() => false)) {
            // Find any text element within the card that mentions Google
            const googleText = card.locator('text=/.*Google.*/i').first();
            const visible = await googleText.isVisible({ timeout: 2000 }).catch(() => false);
            if (visible) {
              const text = await googleText.textContent().catch(() => '');
              // Make sure it's not just the checkbox label
              if (text && !text.toLowerCase().includes('show google drive') && text.length > 10) {
                return true;
              }
            }
          }
          return false;
        },
        // Strategy 3: Look for paragraph or div with description text in the card
        async () => {
          const card = this.googleDriveCard;
          if (await card.isVisible({ timeout: 3000 }).catch(() => false)) {
            const description = card.locator('p, div.description, div:has-text("authentication"), div:has-text("backup")').first();
            const visible = await description.isVisible({ timeout: 2000 }).catch(() => false);
            if (visible) {
              const text = await description.textContent().catch(() => '');
              if (text && text.length > 20) {
                return true;
              }
            }
          }
          return false;
        }
      ];

      for (const strategy of strategies) {
        try {
          const result = await strategy();
          if (result) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking Google Drive description visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get Google Drive description text
   */
  async getGoogleDriveDescriptionText() {
    try {
      // Try to get text from main locator first
      if (await this.googleDriveDescription.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await this.googleDriveDescription.textContent().catch(() => '');
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      }

      // Fallback: Look for description text within the Google Drive card
      const card = this.googleDriveCard;
      if (await card.isVisible({ timeout: 2000 }).catch(() => false)) {
        // Find any text element that mentions Google but is not the checkbox label
        const googleText = card.locator('text=/.*Google.*/i').first();
        if (await googleText.isVisible({ timeout: 1000 }).catch(() => false)) {
          const text = await googleText.textContent().catch(() => '');
          if (text && !text.toLowerCase().includes('show google drive') && text.length > 10) {
            return text.trim();
          }
        }

        // Try to find paragraph or description div
        const description = card.locator('p, div.description, div:has-text("authentication"), div:has-text("backup")').first();
        if (await description.isVisible({ timeout: 1000 }).catch(() => false)) {
          const text = await description.textContent().catch(() => '');
          if (text && text.length > 20) {
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
   * Verify "See Google Pages" link is visible
   */
  async isSeeGooglePagesLinkVisible() {
    try {
      const visible = await this.seeGooglePagesLink.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking See Google Pages link visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Show Google Drive checkbox is visible
   */
  async isShowGoogleDriveCheckboxVisible() {
    try {
      const visible = await this.showGoogleDriveCheckbox.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Show Google Drive checkbox visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if Show Google Drive checkbox is checked
   */
  async isShowGoogleDriveCheckboxChecked() {
    try {
      const checked = await this.showGoogleDriveCheckbox.isChecked();
      return checked;
    } catch (error) {
      console.log(`  ⚠ Error checking Show Google Drive checkbox state: ${error.message}`);
      return false;
    }
  }

  /**
   * Check/uncheck Show Google Drive checkbox
   */
  async toggleShowGoogleDriveCheckbox() {
    try {
      const currentState = await this.isShowGoogleDriveCheckboxChecked();
      await this.showGoogleDriveCheckbox.click();
      await this.page.waitForTimeout(500);
      const newState = await this.isShowGoogleDriveCheckboxChecked();
      console.log(`  ✓ Toggled checkbox from ${currentState} to ${newState}`);
      return newState;
    } catch (error) {
      console.log(`  ⚠ Error toggling Show Google Drive checkbox: ${error.message}`);
      throw error;
    }
  }

  /**
   * Set Show Google Drive checkbox state
   */
  async setShowGoogleDriveCheckbox(checked) {
    try {
      const currentState = await this.isShowGoogleDriveCheckboxChecked();
      if (currentState !== checked) {
        await this.showGoogleDriveCheckbox.click();
        await this.page.waitForTimeout(500);
      }
      const newState = await this.isShowGoogleDriveCheckboxChecked();
      console.log(`  ✓ Set checkbox to ${newState}`);
      return newState === checked;
    } catch (error) {
      console.log(`  ⚠ Error setting Show Google Drive checkbox: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify Save button is visible and enabled
   */
  async isSaveButtonVisible() {
    try {
      const visible = await this.saveButton.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Save button visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Save button is enabled
   */
  async isSaveButtonEnabled() {
    try {
      const enabled = await this.saveButton.isEnabled();
      return enabled;
    } catch (error) {
      console.log(`  ⚠ Error checking Save button enabled state: ${error.message}`);
      return false;
    }
  }

  /**
   * Click Save button
   */
  async clickSaveButton() {
    try {
      await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.saveButton.scrollIntoViewIfNeeded();
      await this.saveButton.click();
      
      // Wait for save to process
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      console.log('  ✓ Clicked Save button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Save button: ${error.message}`);
      throw error;
    }
  }

  // ==================== TICKET SUPPORT SECTION METHODS ====================

  /**
   * Verify Ticket Support card/section is visible
   */
  async isTicketSupportCardVisible() {
    try {
      const visible = await this.ticketSupportCard.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Ticket Support card visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Ticket Support question is visible
   */
  async isTicketSupportQuestionVisible() {
    try {
      const visible = await this.ticketSupportQuestion.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Ticket Support question visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get Ticket Support question text
   */
  async getTicketSupportQuestionText() {
    try {
      const text = await this.ticketSupportQuestion.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify Yes radio button is visible
   */
  async isTicketSupportYesRadioVisible() {
    try {
      const visible = await this.ticketSupportYesRadio.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Yes radio button visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify No radio button is visible
   */
  async isTicketSupportNoRadioVisible() {
    try {
      const visible = await this.ticketSupportNoRadio.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking No radio button visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if Yes radio button is selected
   */
  async isTicketSupportYesRadioSelected() {
    try {
      const selected = await this.ticketSupportYesRadio.isChecked();
      return selected;
    } catch (error) {
      console.log(`  ⚠ Error checking Yes radio button state: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if No radio button is selected
   */
  async isTicketSupportNoRadioSelected() {
    try {
      const selected = await this.ticketSupportNoRadio.isChecked();
      return selected;
    } catch (error) {
      console.log(`  ⚠ Error checking No radio button state: ${error.message}`);
      return false;
    }
  }

  /**
   * Get selected Ticket Support option (Yes or No)
   */
  async getSelectedTicketSupportOption() {
    try {
      const yesSelected = await this.isTicketSupportYesRadioSelected();
      const noSelected = await this.isTicketSupportNoRadioSelected();
      
      if (yesSelected) return 'Yes';
      if (noSelected) return 'No';
      return 'None';
    } catch (error) {
      return 'None';
    }
  }

  /**
   * Select Yes radio button
   */
  async selectTicketSupportYes() {
    try {
      await this.ticketSupportYesRadio.waitFor({ state: 'visible', timeout: 5000 });
      await this.ticketSupportYesRadio.scrollIntoViewIfNeeded();
      await this.ticketSupportYesRadio.click();
      await this.page.waitForTimeout(500);
      const selected = await this.isTicketSupportYesRadioSelected();
      console.log(`  ✓ Selected Yes (checked: ${selected})`);
      return selected;
    } catch (error) {
      console.log(`  ⚠ Error selecting Yes radio button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Select No radio button
   */
  async selectTicketSupportNo() {
    try {
      await this.ticketSupportNoRadio.waitFor({ state: 'visible', timeout: 5000 });
      await this.ticketSupportNoRadio.scrollIntoViewIfNeeded();
      await this.ticketSupportNoRadio.click();
      await this.page.waitForTimeout(500);
      const selected = await this.isTicketSupportNoRadioSelected();
      console.log(`  ✓ Selected No (checked: ${selected})`);
      return selected;
    } catch (error) {
      console.log(`  ⚠ Error selecting No radio button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify Support Email input field is visible
   */
  async isSupportEmailInputVisible() {
    try {
      const visible = await this.supportEmailInput.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Support Email input visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get Support Email input value
   */
  async getSupportEmailValue() {
    try {
      const value = await this.supportEmailInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Enter Support Email
   */
  async enterSupportEmail(email) {
    try {
      await this.supportEmailInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.supportEmailInput.clear();
      await this.supportEmailInput.fill(email);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered Support Email: ${email}`);
    } catch (error) {
      console.log(`  ⚠ Error entering Support Email: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify email format is valid
   */
  isValidEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ==================== TOAST/SUCCESS MESSAGE METHODS ====================

  /**
   * Verify success toast/message is visible
   */
  async isSuccessToastVisible() {
    try {
      // Wait a bit for toast to appear
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to find success message
      const strategies = [
        async () => {
          const toast = this.page.locator('div.toast-success').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        },
        async () => {
          const toast = this.page.locator('div.toast:has-text("success")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        },
        async () => {
          const toast = this.page.locator('div[role="alert"]:has-text("success")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        },
        async () => {
          const toast = this.page.locator('div:has-text("Settings saved")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        },
        async () => {
          const toast = this.page.locator('div:has-text("Saved successfully")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        },
        async () => {
          const toast = this.page.locator('div:has-text("successfully")').first();
          return await toast.isVisible({ timeout: 3000 }).catch(() => false);
        }
      ];

      for (const strategy of strategies) {
        try {
          const visible = await strategy();
          if (visible) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking success toast visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get success toast text
   */
  async getSuccessToastText() {
    try {
      await this.page.waitForTimeout(1000);
      
      const strategies = [
        async () => {
          const toast = this.page.locator('div.toast-success').first();
          if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
            return await toast.textContent();
          }
          return null;
        },
        async () => {
          const toast = this.page.locator('div:has-text("Settings saved"), div:has-text("Saved successfully")').first();
          if (await toast.isVisible({ timeout: 2000 }).catch(() => false)) {
            return await toast.textContent();
          }
          return null;
        }
      ];

      for (const strategy of strategies) {
        try {
          const text = await strategy();
          if (text) {
            return text.trim();
          }
        } catch (e) {
          continue;
        }
      }

      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify error/validation message is visible
   */
  async isErrorMessageVisible() {
    try {
      await this.page.waitForTimeout(500);
      
      const strategies = [
        async () => {
          const error = this.page.locator('mat-error').first();
          return await error.isVisible({ timeout: 2000 }).catch(() => false);
        },
        async () => {
          const error = this.page.locator('div.text-danger').first();
          return await error.isVisible({ timeout: 2000 }).catch(() => false);
        },
        async () => {
          const error = this.page.locator('div:has-text("invalid")').first();
          return await error.isVisible({ timeout: 2000 }).catch(() => false);
        }
      ];

      for (const strategy of strategies) {
        try {
          const visible = await strategy();
          if (visible) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking error message visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get error message text
   */
  async getErrorMessageText() {
    try {
      await this.page.waitForTimeout(500);
      
      const error = this.page.locator('mat-error, div.text-danger, div:has-text("invalid")').first();
      if (await error.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await error.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify email validation error is visible
   */
  async isEmailValidationErrorVisible() {
    try {
      await this.page.waitForTimeout(500);
      
      const strategies = [
        async () => {
          const error = this.page.locator('mat-error:has-text("email")').first();
          return await error.isVisible({ timeout: 2000 }).catch(() => false);
        },
        async () => {
          const error = this.page.locator('div:has-text("invalid email")').first();
          return await error.isVisible({ timeout: 2000 }).catch(() => false);
        },
        async () => {
          const error = this.page.locator('div:has-text("email format")').first();
          return await error.isVisible({ timeout: 2000 }).catch(() => false);
        }
      ];

      for (const strategy of strategies) {
        try {
          const visible = await strategy();
          if (visible) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check for console errors
   */
  async checkConsoleErrors() {
    try {
      const errors = [];
      this.page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      return errors;
    } catch (error) {
      return [];
    }
  }

  // ==================== CUSTOMER PORTAL FEATURE VISIBILITY METHODS ====================

  /**
   * Verify Google Drive module/menu is visible in customer portal
   * This method should be called on the customer portal page context
   */
  async isGoogleDriveModuleVisibleInCustomerPortal(customerPortalPage) {
    try {
      // Wait for page to be ready
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);
      
      // Multiple strategies to find Google Drive menu item
      const strategies = [
        // Strategy 1: Look for sidebar items with "Google Drive" text
        async () => {
          const menuItem = customerPortalPage.locator(
            'div.sidebar-items:has(span:has-text("Google Drive")), ' +
            'div.sidebar-items:has-text("Google Drive"), ' +
            'li:has-text("Google Drive"), ' +
            'a:has-text("Google Drive"), ' +
            'span.title:has-text("Google Drive"), ' +
            'span:has-text("Google Drive")'
          ).first();
          const visible = await menuItem.isVisible({ timeout: 3000 }).catch(() => false);
          if (visible) {
            console.log('  ✓ Found Google Drive using Strategy 1 (text-based)');
            return true;
          }
          return false;
        },
        // Strategy 2: Look for router link containing "google"
        async () => {
          const menuItem = customerPortalPage.locator(
            '[ng-reflect-router-link*="google"], ' +
            '[routerlink*="google"], ' +
            '[ng-reflect-router-link*="Google"], ' +
            '[routerlink*="Google"]'
          ).first();
          const visible = await menuItem.isVisible({ timeout: 3000 }).catch(() => false);
          if (visible) {
            console.log('  ✓ Found Google Drive using Strategy 2 (router link)');
            return true;
          }
          return false;
        },
        // Strategy 3: Look for Google Drive icon
        async () => {
          const menuItem = customerPortalPage.locator(
            'i.bi-google-drive, ' +
            'i.fa-google-drive, ' +
            'i[class*="google-drive"], ' +
            '[class*="google-drive"]'
          ).first();
          const visible = await menuItem.isVisible({ timeout: 3000 }).catch(() => false);
          if (visible) {
            console.log('  ✓ Found Google Drive using Strategy 3 (icon)');
            return true;
          }
          return false;
        },
        // Strategy 4: Look in sidebar for any element containing "Google"
        async () => {
          const sidebar = customerPortalPage.locator('div.sidebar, nav.sidebar, aside.sidebar').first();
          if (await sidebar.isVisible({ timeout: 2000 }).catch(() => false)) {
            const menuItem = sidebar.locator('*:has-text("Google")').first();
            const visible = await menuItem.isVisible({ timeout: 2000 }).catch(() => false);
            if (visible) {
              const text = await menuItem.textContent().catch(() => '');
              if (text && text.toLowerCase().includes('google') && text.toLowerCase().includes('drive')) {
                console.log('  ✓ Found Google Drive using Strategy 4 (sidebar search)');
                return true;
              }
            }
          }
          return false;
        },
        // Strategy 5: Look for any menu item with "Google" in text
        async () => {
          const allMenuItems = customerPortalPage.locator('div.sidebar-items, li.sidebar-item, a.sidebar-link');
          const count = await allMenuItems.count().catch(() => 0);
          for (let i = 0; i < Math.min(count, 20); i++) {
            const item = allMenuItems.nth(i);
            const text = await item.textContent().catch(() => '');
            if (text && text.toLowerCase().includes('google') && text.toLowerCase().includes('drive')) {
              const visible = await item.isVisible({ timeout: 1000 }).catch(() => false);
              if (visible) {
                console.log(`  ✓ Found Google Drive using Strategy 5 (menu item ${i})`);
                return true;
              }
            }
          }
          return false;
        }
      ];

      for (let i = 0; i < strategies.length; i++) {
        try {
          const visible = await Promise.race([
            strategies[i](),
            new Promise((resolve) => setTimeout(() => resolve(false), 3000))
          ]);
          if (visible) {
            return true;
          }
        } catch (e) {
          console.log(`  ⚠ Strategy ${i + 1} failed: ${e.message}`);
          continue;
        }
      }

      console.log('  ⚠ Google Drive module not found with any strategy');
      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking Google Drive module visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Service Request module/menu is visible in customer portal
   * This method should be called on the customer portal page context
   */
  async isServiceRequestModuleVisibleInCustomerPortal(customerPortalPage) {
    try {
      // Scope search strictly to sidebar navigation to avoid matching content on other pages
      const sidebar = customerPortalPage
        .locator('div.sidebar, nav.sidebar, aside.sidebar')
        .first();

      const sidebarVisible = await sidebar.isVisible({ timeout: 5000 }).catch(() => false);
      if (!sidebarVisible) {
        return false;
      }

      // Multiple strategies to find Service Request menu item within sidebar
      const strategies = [
        async () => {
          const menuItem = sidebar
            .locator(
              'div.sidebar-items:has-text("Service Request"), ' +
                'li:has-text("Service Request"), ' +
                'a:has-text("Service Request"), ' +
                'span:has-text("Service Request"), ' +
                '[ng-reflect-router-link*="service"], ' +
                '[routerlink*="service"]',
            )
            .first();
          return await menuItem.isVisible({ timeout: 5000 }).catch(() => false);
        },
        async () => {
          // Check for Service Request icon within sidebar
          const menuItem = sidebar
            .locator('i.bi-ticket, i.fa-ticket, [class*="service-request"]')
            .first();
          return await menuItem.isVisible({ timeout: 5000 }).catch(() => false);
        },
      ];

      for (const strategy of strategies) {
        try {
          const visible = await strategy();
          if (visible) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking Service Request module visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Navigate to Service Request -> All Requests page in customer portal
   */
  async navigateToServiceRequestAllRequests(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      // Locate the Service Request menu item
      const serviceMenu = customerPortalPage.locator(
        'div.sidebar-items:has-text("Service Request"), ' +
          'a:has-text("Service Request"), ' +
          'span:has-text("Service Request"), ' +
          'li:has-text("Service Request")',
      ).first();

      const serviceVisible = await serviceMenu.isVisible({ timeout: 5000 }).catch(() => false);
      if (!serviceVisible) {
        console.log('  ⚠ Service Request menu item not visible');
        return false;
      }

      // Expand/click the Service Request menu
      await serviceMenu.scrollIntoViewIfNeeded();
      await serviceMenu.click();
      await customerPortalPage.waitForTimeout(1000);

      // Locate "All Requests" under Service Request
      const allRequestsLink = customerPortalPage.locator(
        'a:has-text("All Requests"), ' +
          'li:has-text("All Requests"), ' +
          'div.sidebar-items:has-text("All Requests")',
      ).first();

      const allRequestsVisible = await allRequestsLink.isVisible({ timeout: 5000 }).catch(() => false);
      if (!allRequestsVisible) {
        console.log('  ⚠ "All Requests" link under Service Request is not visible');
        return false;
      }

      await allRequestsLink.scrollIntoViewIfNeeded();
      await allRequestsLink.click();

      await customerPortalPage.waitForLoadState('networkidle').catch(() => {});
      await customerPortalPage.waitForTimeout(2000);

      // Verify navigation to All Requests page
      const url = customerPortalPage.url().toLowerCase();
      const onAllRequestsUrl = url.includes('all-request') || url.includes('all-requests');

      const headingVisible = await customerPortalPage
        .locator(
          'h1:has-text("All Requests"), ' +
            'h2:has-text("All Requests"), ' +
            'h3:has-text("All Requests")',
        )
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      if (!onAllRequestsUrl && !headingVisible) {
        console.log('  ⚠ Navigation to "All Requests" page not confirmed');
        return false;
      }

      console.log('  ✓ Navigated to Service Request -> All Requests page');
      return true;
    } catch (error) {
      console.log(`  ⚠ Error navigating to Service Request -> All Requests page: ${error.message}`);
      return false;
    }
  }

  /**
   * Navigate to Service Request -> Raise Request page in customer portal
   */
  async navigateToServiceRequestRaiseRequest(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      // Locate the sidebar
      const sidebar = customerPortalPage
        .locator('div.sidebar, nav.sidebar, aside.sidebar')
        .first();
      const sidebarVisible = await sidebar.isVisible({ timeout: 5000 }).catch(() => false);
      if (!sidebarVisible) {
        console.log('  ⚠ Sidebar not visible when trying to navigate to Raise Request');
        return false;
      }

      // Directly locate "Raise Request" li using routerlink / ng-reflect-router-link
      const raiseRequestLink = sidebar
        .locator(
          'li[ng-reflect-router-link="/service-request/raise-service"], ' +
            'li[routerlink="/service-request/raise-service"], ' +
            'li:has-text("Raise Request")',
        )
        .first();

      const raiseVisible = await raiseRequestLink.isVisible({ timeout: 5000 }).catch(() => false);
      if (!raiseVisible) {
        console.log('  ⚠ "Raise Request" link under Service Request is not visible inside dropdown');
        return false;
      }

      await raiseRequestLink.scrollIntoViewIfNeeded();
      await raiseRequestLink.click();

      await customerPortalPage.waitForLoadState('networkidle').catch(() => {});
      await customerPortalPage.waitForTimeout(2000);

      // Log resulting URL; exact validation happens in tests
      const url = customerPortalPage.url().toLowerCase();
      console.log(`  ✓ After clicking Raise Request, current URL: ${url}`);
      // Let the calling test assert the exact URL and heading
      console.log('  ✓ Clicked Service Request -> Raise Request (navigation will be validated in test)');
      return true;
    } catch (error) {
      console.log(`  ⚠ Error navigating to Service Request -> Raise Request page: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if a module is locked/disabled in customer portal
   * Returns true if module is locked (has disabled class, pointer-events: none, or opacity reduced)
   */
  async isModuleLockedInCustomerPortal(customerPortalPage, moduleName) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      // Find the module by name
      const moduleItem = customerPortalPage.locator(
        `div.sidebar-items:has-text("${moduleName}"), ` +
        `a:has-text("${moduleName}"), ` +
        `span:has-text("${moduleName}"), ` +
        `li:has-text("${moduleName}")`
      ).first();

      const isVisible = await moduleItem.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isVisible) {
        return false; // Module not found, can't determine if locked
      }

      // Check for locked indicators using evaluate
      const locked = await customerPortalPage.evaluate(({ moduleName }) => {
        // Find the module element
        const sidebar = document.querySelector('div.sidebar, nav.sidebar, aside.sidebar');
        if (!sidebar) return false;

        // Find all potential module items
        const allItems = sidebar.querySelectorAll('div.sidebar-items, li.sidebar-item, a.sidebar-link, [ng-reflect-router-link]');
        let targetElement = null;

        for (const item of allItems) {
          const text = item.textContent?.trim() || '';
          if (text && text.toLowerCase().includes(moduleName.toLowerCase())) {
            targetElement = item;
            break;
          }
        }

        if (!targetElement) return false;
        
        const computedStyle = window.getComputedStyle(targetElement);
        const hasDisabledClass = targetElement.classList.contains('disabled') || 
                                 targetElement.classList.contains('locked');
        const hasPointerEventsNone = computedStyle.pointerEvents === 'none';
        const hasReducedOpacity = parseFloat(computedStyle.opacity) < 0.5;
        const hasCursorNotAllowed = computedStyle.cursor === 'not-allowed';
        
        // Check parent elements too
        let parent = targetElement.parentElement;
        while (parent && parent !== document.body) {
          const parentStyle = window.getComputedStyle(parent);
          if (parentStyle.pointerEvents === 'none' || 
              parseFloat(parentStyle.opacity) < 0.5 ||
              parent.classList.contains('disabled') ||
              parent.classList.contains('locked')) {
            return true;
          }
          parent = parent.parentElement;
        }
        
        return hasDisabledClass || hasPointerEventsNone || hasReducedOpacity || hasCursorNotAllowed;
      }, { moduleName });

      return locked;
    } catch (error) {
      console.log(`  ⚠ Error checking if module "${moduleName}" is locked: ${error.message}`);
      return false;
    }
  }

  /**
   * Get all sidebar modules in customer portal
   */
  async getAllSidebarModules(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      const modules = await customerPortalPage.evaluate(() => {
        const moduleItems = [];
        const sidebar = document.querySelector('div.sidebar, nav.sidebar, aside.sidebar');
        if (!sidebar) return [];

        // Find all menu items
        const items = sidebar.querySelectorAll('div.sidebar-items, li.sidebar-item, a.sidebar-link, [ng-reflect-router-link]');
        
        items.forEach((item) => {
          const text = item.textContent?.trim() || '';
          if (text && text.length > 0 && text.length < 50) {
            // Exclude icons and very long text
            const computedStyle = window.getComputedStyle(item);
            const isVisible = computedStyle.display !== 'none' && 
                            computedStyle.visibility !== 'hidden' &&
                            parseFloat(computedStyle.opacity) > 0.1;
            
            if (isVisible && !moduleItems.includes(text)) {
              moduleItems.push(text);
            }
          }
        });

        return moduleItems;
      });

      return modules;
    } catch (error) {
      console.log(`  ⚠ Error getting sidebar modules: ${error.message}`);
      return [];
    }
  }

  /**
   * Verify only Dashboard, Service Request, and Logout modules are accessible
   * All other modules should be locked
   */
  async verifyOnlyAllowedModulesAccessible(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(2000);

      const allModules = await this.getAllSidebarModules(customerPortalPage);
      console.log(`  Found ${allModules.length} modules: ${allModules.join(', ')}`);

      const allowedModules = ['dashboard', 'service request', 'logout', 'service', 'log out', 'sign out'];
      const unlockedModules = [];

      for (const module of allModules) {
        const moduleNameLower = module.toLowerCase().trim();
        const isAllowed = allowedModules.some(allowed => 
          moduleNameLower.includes(allowed) || allowed.includes(moduleNameLower)
        );

        if (!isAllowed && moduleNameLower.length > 0) {
          // Check if this module is locked
          const isLocked = await this.isModuleLockedInCustomerPortal(customerPortalPage, module);
          if (!isLocked) {
            unlockedModules.push(module);
            console.log(`    ⚠ Module "${module}" is NOT locked (should be locked)`);
          } else {
            console.log(`    ✓ Module "${module}" is locked`);
          }
        } else if (isAllowed) {
          console.log(`    ✓ Module "${module}" is allowed and accessible`);
        }
      }

      if (unlockedModules.length > 0) {
        console.log(`  ⚠ Found ${unlockedModules.length} unlocked modules that should be locked: ${unlockedModules.join(', ')}`);
        return false;
      }

      console.log('  ✓ All non-allowed modules are locked');
      return true;
    } catch (error) {
      console.log(`  ⚠ Error verifying module accessibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if Google Drive setup modal is visible in customer portal
   */
  async isGoogleDriveSetupModalVisible(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      const modal = customerPortalPage.locator(
        'div.common-modal:has(h5:has-text("Google Drive")), ' +
        'div.modal:has-text("Google Drive Automated backups"), ' +
        'div.common-modal:has-text("mandatory to setup"), ' +
        'div.modal:has-text("Important:")'
      ).first();

      const visible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Google Drive setup modal visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get Google Drive setup modal text
   */
  async getGoogleDriveSetupModalText(customerPortalPage) {
    try {
      const modal = customerPortalPage.locator(
        'div.common-modal:has(h5:has-text("Google Drive")), ' +
        'div.modal:has-text("Google Drive Automated backups")'
      ).first();

      if (await modal.isVisible({ timeout: 3000 }).catch(() => false)) {
        const text = await modal.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Close Google Drive setup modal
   */
  async closeGoogleDriveSetupModal(customerPortalPage) {
    try {
      const modal = customerPortalPage.locator(
        'div.common-modal:has(h5:has-text("Google Drive")), ' +
        'div.modal:has-text("Google Drive Automated backups")'
      ).first();

      if (await modal.isVisible({ timeout: 3000 }).catch(() => false)) {
        // Try to find close button (X button)
        const closeButton = customerPortalPage.locator(
          'div.common-modal button[aria-label="Close"], ' +
          'div.modal button.close, ' +
          'div.common-modal button:has-text("×"), ' +
          'div.modal button:has-text("×")'
        ).first();

        if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await closeButton.click();
          await customerPortalPage.waitForTimeout(1000);
          console.log('  ✓ Closed Google Drive setup modal');
          return true;
        }

        // If no close button, try clicking outside or pressing Escape
        await customerPortalPage.keyboard.press('Escape');
        await customerPortalPage.waitForTimeout(1000);
        console.log('  ✓ Closed Google Drive setup modal (via Escape)');
        return true;
      }
      return false;
    } catch (error) {
      console.log(`  ⚠ Error closing Google Drive setup modal: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify a specific module is accessible in customer portal
   */
  async isModuleAccessibleInCustomerPortal(customerPortalPage, moduleName) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      const moduleItem = customerPortalPage.locator(
        `div.sidebar-items:has-text("${moduleName}"), ` +
        `a:has-text("${moduleName}"), ` +
        `span:has-text("${moduleName}"), ` +
        `li:has-text("${moduleName}")`
      ).first();

      const isVisible = await moduleItem.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isVisible) {
        return false;
      }

      // Check if module is not locked
      const isLocked = await this.isModuleLockedInCustomerPortal(customerPortalPage, moduleName);
      return !isLocked;
    } catch (error) {
      console.log(`  ⚠ Error checking if module "${moduleName}" is accessible: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify all required modules are accessible when Google Drive is checked
   */
  async verifyAllModulesAccessibleWhenGoogleDriveChecked(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(2000);

      const requiredModules = [
        'Dashboard',
        'Subscriptions',
        'Billing',
        'License Details',
        'Reports',
        'Service Request',
        'Google Drive'
      ];

      const accessibleModules = [];
      const inaccessibleModules = [];

      for (const module of requiredModules) {
        const isAccessible = await this.isModuleAccessibleInCustomerPortal(customerPortalPage, module);
        if (isAccessible) {
          accessibleModules.push(module);
          console.log(`    ✓ Module "${module}" is accessible`);
        } else {
          inaccessibleModules.push(module);
          console.log(`    ⚠ Module "${module}" is NOT accessible`);
        }
      }

      // Verify Logout is accessible
      const logoutAccessible = await customerPortalPage.locator(
        'button:has-text("Logout"), a:has-text("Logout"), span:has-text("Logout"), button:has-text("Log out")'
      ).first().isVisible({ timeout: 3000 }).catch(() => false);
      
      if (logoutAccessible) {
        console.log('    ✓ Logout is accessible');
      } else {
        console.log('    ⚠ Logout is NOT accessible');
        inaccessibleModules.push('Logout');
      }

      if (inaccessibleModules.length > 0) {
        console.log(`  ⚠ Found ${inaccessibleModules.length} inaccessible modules: ${inaccessibleModules.join(', ')}`);
        return false;
      }

      console.log('  ✓ All required modules are accessible');
      return true;
    } catch (error) {
      console.log(`  ⚠ Error verifying module accessibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify user is on Dashboard page
   */
  async isOnDashboardPage(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(1000);

      const strategies = [
        async () => {
          const url = customerPortalPage.url();
          return url.includes('dashboard') || url.endsWith('/') || url.includes('/home');
        },
        async () => {
          const dashboardHeading = customerPortalPage.locator(
            'h1:has-text("Dashboard"), h2:has-text("Dashboard"), h3:has-text("Dashboard")'
          ).first();
          return await dashboardHeading.isVisible({ timeout: 3000 }).catch(() => false);
        },
        async () => {
          const dashboardContent = customerPortalPage.locator('div.dashboard, [class*="dashboard"]').first();
          return await dashboardContent.isVisible({ timeout: 3000 }).catch(() => false);
        }
      ];

      for (const strategy of strategies) {
        try {
          const result = await strategy();
          if (result) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }

      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking if on Dashboard page: ${error.message}`);
      return false;
    }
  }

  /**
   * Click on a module in customer portal
   */
  async clickModuleInCustomerPortal(customerPortalPage, moduleName) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(500);

      let moduleItem;

      // Use a more specific locator for Google Drive (matches provided HTML)
      if (moduleName.toLowerCase() === 'google drive') {
        moduleItem = customerPortalPage.locator(
          'li.nav-item a.nav-link[ng-reflect-router-link="google-drive"]:has(span.text:has-text("Google Drive"))'
        ).first();
      } else {
        moduleItem = customerPortalPage.locator(
          `div.sidebar-items:has-text("${moduleName}"), ` +
          `a:has-text("${moduleName}"), ` +
          `span:has-text("${moduleName}"), ` +
          `li:has-text("${moduleName}")`
        ).first();
      }

      const isVisible = await moduleItem.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isVisible) {
        throw new Error(`Module "${moduleName}" not found or not visible`);
      }

      await moduleItem.scrollIntoViewIfNeeded();
      await moduleItem.click();
      await customerPortalPage.waitForTimeout(1000);
      return true;
    } catch (error) {
      console.log(`  ⚠ Error clicking module "${moduleName}": ${error.message}`);
      return false;
    }
  }

  /**
   * Check if module has a lock icon
   */
  async hasLockIcon(customerPortalPage, moduleName) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(500);

      const hasLock = await customerPortalPage.evaluate(({ moduleName }) => {
        const sidebar = document.querySelector('div.sidebar, nav.sidebar, aside.sidebar');
        if (!sidebar) return false;

        const allItems = sidebar.querySelectorAll('div.sidebar-items, li.sidebar-item, a.sidebar-link, [ng-reflect-router-link]');
        
        for (const item of allItems) {
          const text = item.textContent?.trim() || '';
          if (text && text.toLowerCase().includes(moduleName.toLowerCase())) {
            // Check for lock icon within this item or its children
            const lockIcon = item.querySelector('i.bi-lock, i.fa-lock, i[class*="lock"], svg[class*="lock"], [class*="lock-icon"]');
            if (lockIcon) {
              return true;
            }
            // Check if text contains "lock"
            if (text.toLowerCase().includes('lock')) {
              return true;
            }
            // Check parent for lock icon
            let parent = item.parentElement;
            while (parent && parent !== document.body) {
              const parentLockIcon = parent.querySelector('i.bi-lock, i.fa-lock, i[class*="lock"]');
              if (parentLockIcon) {
                return true;
              }
              parent = parent.parentElement;
            }
            return false;
          }
        }
        return false;
      }, { moduleName });

      return hasLock;
    } catch (error) {
      console.log(`  ⚠ Error checking lock icon for module "${moduleName}": ${error.message}`);
      return false;
    }
  }

  /**
   * Click "Setup Now and Secure Data" button in modal
   */
  async clickSetupNowButton(customerPortalPage) {
    try {
      const setupButton = customerPortalPage.locator(
        'button:has-text("Setup Now and Secure Data"), ' +
        'button.btn-modal-primary:has-text("Setup Now"), ' +
        'div.modal button:has-text("Setup Now and Secure Data"), ' +
        'div.common-modal button:has-text("Setup Now and Secure Data")'
      ).first();

      const isVisible = await setupButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isVisible) {
        return false;
      }

      await setupButton.click();
      await customerPortalPage.waitForLoadState('networkidle').catch(() => {});
      await customerPortalPage.waitForTimeout(2000);
      return true;
    } catch (error) {
      console.log(`  ⚠ Error clicking Setup Now button: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Renew (expired plan) modal is visible in customer portal
   */
  async isRenewPlanModalVisible(customerPortalPage) {
    try {
      await customerPortalPage.waitForLoadState('domcontentloaded');
      await customerPortalPage.waitForTimeout(500);

      const modal = customerPortalPage.locator(
        'div.common-modal:has-text("Your plan has Expired"), ' +
        'div.common-modal:has-text("Your plan has expired"), ' +
        'div.common-modal:has(button:has-text("Renew"))'
      ).first();

      const visible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
      return visible;
    } catch (error) {
      console.log(`  ⚠ Error checking Renew plan modal visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Click Renew button in expired plan modal
   */
  async clickRenewButtonInPlanModal(customerPortalPage) {
    try {
      const modal = customerPortalPage.locator(
        'div.common-modal:has-text("Your plan has Expired"), ' +
        'div.common-modal:has(button:has-text("Renew"))'
      ).first();

      const visible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
      if (!visible) {
        console.log('  ⚠ Renew plan modal is not visible');
        return false;
      }

      const renewButton = modal.locator(
        'button.btn-modal-primary:has-text("Renew"), ' +
        'button:has-text("Renew")'
      ).first();

      const btnVisible = await renewButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (!btnVisible) {
        console.log('  ⚠ Renew button not visible inside plan modal');
        return false;
      }

      await renewButton.click();
      await customerPortalPage.waitForLoadState('networkidle').catch(() => {});
      await customerPortalPage.waitForTimeout(2000);
      console.log('  ✓ Clicked Renew button in expired plan modal');
      return true;
    } catch (error) {
      console.log(`  ⚠ Error clicking Renew button in plan modal: ${error.message}`);
      return false;
    }
  }
}

module.exports = { SettingsPage };

