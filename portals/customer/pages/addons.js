class AddonsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.addonsMenu = page.locator('a:has-text("Add-ons"), a:has-text("Addons"), button:has-text("Add-ons"), a[href*="add-ons"], a[href*="addons"]').first();
    
    // Page wrapper
    this.addonsWrapper = page.locator('.addons-wrapper, .add-ons-wrapper, .addons, [class*="add-ons"], [class*="addons"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("Add-ons"), .header-left:has-text("Add-ons"), h1:has-text("Add-ons"), h2:has-text("Add-ons")').first();
    this.pageTitle = page.locator('h6.page-title-modern:has-text("Add-ons"), h1:has-text("Add-ons"), h2:has-text("Add-ons"), .page-title:has-text("Add-ons")').first();
    
    // Add-on cards - using actual HTML structure
    this.cloudServiceChargesCard = page.locator('.addon-item:has(.addon-name-modern:has-text("Cloud Service Charges")), .addon-card-modern:has(.addon-name-modern:has-text("Cloud Service Charges"))').first();
    this.tallyPowerUserCard = page.locator('.addon-item:has(.addon-name-modern:has-text("Tally On Cloud")), .addon-item:has(.addon-name-modern:has-text("Power User")), .addon-card-modern:has(.addon-name-modern:has-text("Tally"))').first();
    
    // Price elements
    this.priceText = page.locator('.addon-price-modern, .price-value-modern, [class*="price"]').first();
    this.gstText = page.locator('.price-suffix-modern:has-text("GST"), text=/GST/i, text=/gst/i, .gst-text, [class*="gst"]').first();
    
    // Buttons - Buy Now buttons - scoped to card
    this.buyNowButtons = page.locator('button.btn-buy-now-modern, button:has-text("Buy Now")').first();
    this.cloudServiceBuyNowButton = this.cloudServiceChargesCard.locator('button.btn-buy-now-modern, .addon-actions-modern button.btn-buy-now-modern, button:has-text("Buy Now")').first();
    this.tallyPowerUserBuyNowButton = this.tallyPowerUserCard.locator('button.btn-buy-now-modern, .addon-actions-modern button.btn-buy-now-modern, button:has-text("Buy Now")').first();
    
    // Buttons - Contact Sales buttons - scoped to card
    this.contactSalesButtons = page.locator('button.btn-contact-sales-modern, button:has-text("Contact Sales")').first();
    this.cloudServiceContactSalesButton = this.cloudServiceChargesCard.locator('button.btn-contact-sales-modern, .addon-actions-modern button.btn-contact-sales-modern, button:has-text("Contact Sales")').first();
    this.tallyPowerUserContactSalesButton = this.tallyPowerUserCard.locator('button.btn-contact-sales-modern, .addon-actions-modern button.btn-contact-sales-modern, button:has-text("Contact Sales")').first();
    
    // Contact Sales Modal - more flexible selectors
    this.contactSalesModal = page.locator('.modal.show, .modal[style*="display: block"], .modal-dialog.show, [role="dialog"].show, .modal:not([style*="display: none"]), .modal').first();
    this.contactSalesModalTitle = page.locator('.modal .modal-title, .modal h4, .modal h5, .modal-header h4, .modal-header h5').first();
    
    // Modal buttons - scoped to any visible modal
    this.modalYesButton = page.locator('.modal button:has-text("Yes"), .modal button:has-text("Confirm"), .modal .btn-primary:has-text("Yes"), .modal button[type="submit"]:has-text("Yes")').first();
    this.modalNoButton = page.locator('.modal button:has-text("No"), .modal button:has-text("Cancel"), .modal .btn-secondary:has-text("No"), .modal button:has-text("Cancel")').first();
    this.modalCloseButton = page.locator('.modal button[aria-label="Close"], .modal button.close, .modal-header button').first();
    
    // Success toast/notification - targeting toast-container
    this.toastContainer = page.locator('#toast-container, .toast-container, .toast-top-right').first();
    this.successToast = page.locator('#toast-container .toast, .toast-container .toast, .toast-success, .alert-success, .toast:has-text("success"), [class*="toast-success"], [class*="alert-success"], .toast-body:has-text("contact")').first();
    this.toastMessage = page.locator('#toast-container .toast-body, .toast-container .toast-body, .toast-body, .toast-message, .alert-message, [class*="toast"]').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
  }

  /**
   * Navigates to Add-ons page
   */
  async gotoAddons() {
    try {
      await this.addonsMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.addonsMenu.click();
    } catch (error) {
      // If menu item not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/add-ons`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load
    await Promise.race([
      this.addonsWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Add-ons page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.addonsWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page title "Add-ons" is visible
   * @returns {Promise<boolean>}
   */
  async isPageTitleVisible() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the page title text
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    try {
      const titleVisible = await this.pageTitle.isVisible({ timeout: 5000 });
      if (titleVisible) {
        const text = await this.pageTitle.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies add-on cards are displayed
   * @returns {Promise<{allVisible: boolean, cloudServiceVisible: boolean, tallyPowerUserVisible: boolean}>}
   */
  async verifyAddonCardsVisible() {
    try {
      const cloudServiceVisible = await this.cloudServiceChargesCard.isVisible({ timeout: 3000 }).catch(() => false);
      const tallyPowerUserVisible = await this.tallyPowerUserCard.isVisible({ timeout: 3000 }).catch(() => false);
      
      const allVisible = cloudServiceVisible && tallyPowerUserVisible;
      
      return {
        allVisible: allVisible,
        cloudServiceVisible: cloudServiceVisible,
        tallyPowerUserVisible: tallyPowerUserVisible
      };
    } catch (error) {
      return {
        allVisible: false,
        cloudServiceVisible: false,
        tallyPowerUserVisible: false,
        error: error.message
      };
    }
  }

  /**
   * Verifies price, GST text, and action buttons are visible on a card
   * @param {string} cardName - Name of the card ("Cloud Service Charges" or "Tally On Cloud – Power User")
   * @returns {Promise<{priceVisible: boolean, gstVisible: boolean, buyNowVisible: boolean, contactSalesVisible: boolean}>}
   */
  async verifyCardDetailsVisible(cardName) {
    try {
      let card;
      let buyNowButton;
      let contactSalesButton;
      
      if (cardName.includes('Cloud Service') || cardName.includes('Cloud Service Charges')) {
        card = this.cloudServiceChargesCard;
        buyNowButton = this.cloudServiceBuyNowButton;
        contactSalesButton = this.cloudServiceContactSalesButton;
      } else if (cardName.includes('Tally') || cardName.includes('Power User')) {
        card = this.tallyPowerUserCard;
        buyNowButton = this.tallyPowerUserBuyNowButton;
        contactSalesButton = this.tallyPowerUserContactSalesButton;
      } else {
        card = this.page.locator(`.addon-item:has(.addon-name-modern:has-text("${cardName}"))`).first();
        buyNowButton = card.locator('button.btn-buy-now-modern, button:has-text("Buy Now")').first();
        contactSalesButton = card.locator('button.btn-contact-sales-modern, button:has-text("Contact Sales")').first();
      }
      
      // Check price within the card - look for .addon-price-modern which contains the entire price structure
      const priceInCard = card.locator('.addon-price-modern').first();
      let priceVisible = await priceInCard.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Also check if price value is visible as fallback
      if (!priceVisible) {
        const priceValue = card.locator('.price-value-modern, .currency-modern').first();
        priceVisible = await priceValue.isVisible({ timeout: 1000 }).catch(() => false);
      }
      
      // Check GST text within the card - look for .price-suffix-modern which contains "+ GST"
      const gstInCard = card.locator('.price-suffix-modern').first();
      let gstVisible = await gstInCard.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Also check if GST text is present in the price suffix or price container
      if (!gstVisible) {
        const gstText = await gstInCard.textContent().catch(() => '');
        if (gstText && gstText.toLowerCase().includes('gst')) {
          gstVisible = true;
        } else {
          // Check if GST is in the price container text
          const priceText = await priceInCard.textContent().catch(() => '');
          if (priceText && priceText.toLowerCase().includes('gst')) {
            gstVisible = true;
          }
        }
      }
      
      // Check buttons - use .addon-actions-modern scope
      const buyNowVisible = await buyNowButton.isVisible({ timeout: 2000 }).catch(() => false);
      const contactSalesVisible = await contactSalesButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        priceVisible: priceVisible,
        gstVisible: gstVisible,
        buyNowVisible: buyNowVisible,
        contactSalesVisible: contactSalesVisible
      };
    } catch (error) {
      return {
        priceVisible: false,
        gstVisible: false,
        buyNowVisible: false,
        contactSalesVisible: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks on "Buy Now" button for an add-on
   * @param {string} addonName - Name of the add-on ("Cloud Service Charges" or "Tally On Cloud – Power User")
   * @returns {Promise<{clicked: boolean, urlBefore: string, urlAfter: string}>}
   */
  async clickBuyNowButton(addonName) {
    try {
      let buyNowButton;
      
      if (addonName.includes('Cloud Service') || addonName.includes('Cloud Service Charges')) {
        buyNowButton = this.cloudServiceBuyNowButton;
      } else if (addonName.includes('Tally') || addonName.includes('Power User')) {
        buyNowButton = this.tallyPowerUserBuyNowButton;
      } else {
        // Find card by name and then find button
        const card = this.page.locator(`.addon-item:has(.addon-name-modern:has-text("${addonName}"))`).first();
        buyNowButton = card.locator('button.btn-buy-now-modern, .addon-actions-modern button.btn-buy-now-modern, button:has-text("Buy Now")').first();
      }
      
      const urlBefore = this.page.url();
      
      await buyNowButton.waitFor({ state: 'visible', timeout: 10000 });
      await buyNowButton.scrollIntoViewIfNeeded();
      await buyNowButton.click();
      
      // Wait for navigation
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(2000);
      
      const urlAfter = this.page.url();
      
      return {
        clicked: true,
        urlBefore: urlBefore,
        urlAfter: urlAfter
      };
    } catch (error) {
      return {
        clicked: false,
        urlBefore: this.page.url(),
        urlAfter: this.page.url(),
        error: error.message
      };
    }
  }

  /**
   * Verifies navigation to payment page
   * @param {string} expectedUrlText - Expected text in URL (default: "payment")
   * @returns {Promise<{navigated: boolean, url: string, containsPayment: boolean}>}
   */
  async verifyPaymentPageNavigation(expectedUrlText = 'payment') {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(2000);
      
      const currentUrl = this.page.url().toLowerCase();
      const containsPayment = currentUrl.includes(expectedUrlText.toLowerCase());
      
      return {
        navigated: true,
        url: currentUrl,
        containsPayment: containsPayment
      };
    } catch (error) {
      return {
        navigated: false,
        url: this.page.url(),
        containsPayment: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks on "Contact Sales" button
   * @param {string} addonName - Name of the add-on (optional)
   * @returns {Promise<{clicked: boolean, modalOpened: boolean}>}
   */
  async clickContactSalesButton(addonName = '') {
    try {
      let contactSalesButton;
      
      if (addonName.includes('Cloud Service') || addonName.includes('Cloud Service Charges')) {
        contactSalesButton = this.cloudServiceContactSalesButton;
      } else if (addonName.includes('Tally') || addonName.includes('Power User')) {
        contactSalesButton = this.tallyPowerUserContactSalesButton;
      } else {
        // Find card by name and then find button
        if (addonName) {
          const card = this.page.locator(`.addon-item:has(.addon-name-modern:has-text("${addonName}"))`).first();
          contactSalesButton = card.locator('button.btn-contact-sales-modern, .addon-actions-modern button.btn-contact-sales-modern, button:has-text("Contact Sales")').first();
        } else {
          // Use first available Contact Sales button
          contactSalesButton = this.contactSalesButtons;
        }
      }
      
      await contactSalesButton.waitFor({ state: 'visible', timeout: 10000 });
      await contactSalesButton.scrollIntoViewIfNeeded();
      await contactSalesButton.click();
      await this.page.waitForTimeout(1500); // Wait a bit longer for modal to appear
      
      // Wait for modal to open - try multiple selectors
      let modalOpened = false;
      const modalSelectors = [
        this.page.locator('.modal.show').first(),
        this.page.locator('.modal[style*="display: block"]').first(),
        this.page.locator('.modal-dialog.show').first(),
        this.page.locator('[role="dialog"].show').first(),
        this.page.locator('.modal:not([style*="display: none"])').first(),
        this.contactSalesModal
      ];
      
      for (const selector of modalSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          modalOpened = true;
          break;
        }
      }
      
      return {
        clicked: true,
        modalOpened: modalOpened
      };
    } catch (error) {
      return {
        clicked: false,
        modalOpened: false,
        error: error.message
      };
    }
  }

  /**
   * Verifies Contact Sales modal is open
   * @returns {Promise<boolean>}
   */
  async isContactSalesModalOpen() {
    try {
      // Try multiple modal selectors
      const modalSelectors = [
        this.contactSalesModal,
        this.page.locator('.modal.show').first(),
        this.page.locator('.modal[style*="display: block"]').first(),
        this.page.locator('.modal-dialog.show').first(),
        this.page.locator('[role="dialog"].show').first(),
        this.page.locator('.modal:not([style*="display: none"])').first(),
        this.page.locator('.modal').first()
      ];
      
      for (const selector of modalSelectors) {
        const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          // Verify it's actually a modal (has modal structure)
          const hasModalStructure = await selector.locator('.modal-dialog, .modal-content, .modal-header, .modal-body').first().isVisible({ timeout: 1000 }).catch(() => false);
          if (hasModalStructure) {
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
   * Clicks "No" button in Contact Sales modal
   * @returns {Promise<{clicked: boolean, modalClosed: boolean}>}
   */
  async clickModalNoButton() {
    try {
      await this.modalNoButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.modalNoButton.click();
      await this.page.waitForTimeout(1000);
      
      // Verify modal is closed
      const modalClosed = !(await this.contactSalesModal.isVisible({ timeout: 2000 }).catch(() => false));
      
      return {
        clicked: true,
        modalClosed: modalClosed
      };
    } catch (error) {
      return {
        clicked: false,
        modalClosed: false,
        error: error.message
      };
    }
  }

  /**
   * Clicks "Yes" button in Contact Sales modal
   * @returns {Promise<{clicked: boolean, modalClosed: boolean, toastMessage: string}>}
   */
  async clickModalYesButton() {
    try {
      await this.modalYesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.modalYesButton.click();
      
      // Toast appears immediately after clicking Yes, so capture it right away
      // Wait a very short time for toast to appear (100-200ms)
      await this.page.waitForTimeout(200);
      
      // Try to capture toast message immediately (toast appears for 1-2 seconds)
      let toastMessage = '';
      const toastSelectors = [
        this.page.locator('#toast-container .toast-body').first(),
        this.page.locator('.toast-container .toast-body').first(),
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast-body').first(),
        this.page.locator('.toast-message').first(),
        this.page.locator('.toast').first(),
        this.page.locator('.toast-success').first(),
        this.page.locator('.alert-success').first(),
        this.page.locator('[class*="toast"]').first(),
        this.page.locator('mat-snack-bar-container').first(),
        this.page.locator('[role="alert"]').first(),
        this.page.locator('[role="status"]').first()
      ];
      
      // Check multiple times quickly to catch the toast (it appears immediately)
      for (let attempt = 0; attempt < 5; attempt++) {
        for (const selector of toastSelectors) {
          try {
            const isVisible = await selector.isVisible({ timeout: 300 }).catch(() => false);
            if (isVisible) {
              const text = await selector.textContent().catch(() => '');
              if (text && text.trim()) {
                toastMessage = text.trim();
                break;
              }
            }
          } catch (e) {
            // Continue
          }
        }
        if (toastMessage) break;
        await this.page.waitForTimeout(100); // Small delay between attempts
      }
      
      // Wait a bit more for modal to close
      await this.page.waitForTimeout(1500);
      
      // Verify modal is closed
      const modalClosed = !(await this.contactSalesModal.isVisible({ timeout: 2000 }).catch(() => false));
      
      return {
        clicked: true,
        modalClosed: modalClosed,
        toastMessage: toastMessage
      };
    } catch (error) {
      return {
        clicked: false,
        modalClosed: false,
        toastMessage: '',
        error: error.message
      };
    }
  }

  /**
   * Verifies success toast/notification is displayed
   * @param {string} expectedMessage - Expected message text (partial match)
   * @returns {Promise<boolean>}
   */
  async verifySuccessToast(expectedMessage = 'contact') {
    try {
      // Wait for toast container to appear first, then check for toast
      // Toast appears immediately for 1-2 seconds, so we need to check quickly
      await this.page.waitForTimeout(500); // Small delay for toast to render
      
      // First, check toast-container specifically
      const toastContainerVisible = await this.toastContainer.isVisible({ timeout: 2000 }).catch(() => false);
      if (toastContainerVisible) {
        // Check for toast inside container
        const toastInContainer = this.toastContainer.locator('.toast, .toast-body, [class*="toast"]').first();
        const toastVisible = await toastInContainer.isVisible({ timeout: 1000 }).catch(() => false);
        if (toastVisible) {
          if (expectedMessage) {
            const toastText = await toastInContainer.textContent().catch(() => '');
            if (toastText && toastText.toLowerCase().includes(expectedMessage.toLowerCase())) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
      
      // Comprehensive list of toast selectors
      const toastSelectors = [
        // Toast container specific
        this.toastContainer.locator('.toast').first(),
        this.toastContainer.locator('.toast-body').first(),
        // Standard toast classes
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast').first(),
        this.page.locator('.toast-success').first(),
        this.page.locator('.toast-body').first(),
        this.page.locator('.toast-message').first(),
        this.page.locator('.alert-success').first(),
        this.page.locator('.alert').first(),
        // Generic toast patterns
        this.page.locator('[class*="toast"]').first(),
        this.page.locator('[class*="toast-success"]').first(),
        this.page.locator('[class*="alert-success"]').first(),
        this.page.locator('[class*="notification"]').first(),
        this.page.locator('[class*="snackbar"]').first(),
        // Angular Material toast
        this.page.locator('mat-snack-bar-container').first(),
        this.page.locator('.mat-snack-bar-container').first(),
        // Bootstrap toast
        this.page.locator('.toast.show').first(),
        this.page.locator('[role="alert"]').first(),
        this.page.locator('[role="status"]').first(),
        // Custom success toast
        this.successToast
      ];

      // First, try to find any visible toast/notification
      for (const selector of toastSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            // If expectedMessage is provided, check if it contains the message
            if (expectedMessage) {
              const toastText = await selector.textContent().catch(() => '');
              if (toastText && toastText.toLowerCase().includes(expectedMessage.toLowerCase())) {
                return true;
              }
            } else {
              // If no expected message, just return true if toast is visible
              return true;
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // Also try to find any element that looks like a toast/notification
      const allToasts = this.page.locator('.toast, .alert, [class*="toast"], [class*="alert"], [role="alert"], [role="status"], mat-snack-bar-container');
      const toastCount = await allToasts.count();
      
      for (let i = 0; i < toastCount; i++) {
        const toast = allToasts.nth(i);
        const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          if (expectedMessage) {
            const toastText = await toast.textContent().catch(() => '');
            if (toastText && toastText.toLowerCase().includes(expectedMessage.toLowerCase())) {
              return true;
            }
          } else {
            return true;
          }
        }
      }

      // Last resort: check for any visible notification-like element
      const anyNotification = this.page.locator('[class*="success"], [class*="toast"], [class*="alert"], [class*="notification"]').first();
      const notificationVisible = await anyNotification.isVisible({ timeout: 2000 }).catch(() => false);
      
      return notificationVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the text content of the success toast message
   * @returns {Promise<string>}
   */
  async getSuccessToastMessage() {
    try {
      // Check immediately as toast appears for only 1-2 seconds
      await this.page.waitForTimeout(500);
      
      // First check toast-container
      const toastContainerVisible = await this.toastContainer.isVisible({ timeout: 2000 }).catch(() => false);
      if (toastContainerVisible) {
        const toastInContainer = this.toastContainer.locator('.toast, .toast-body, [class*="toast"]').first();
        const isVisible = await toastInContainer.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await toastInContainer.textContent().catch(() => '');
          if (text && text.trim()) {
            return text.trim();
          }
        }
      }
      
      // Comprehensive list of toast selectors
      const toastSelectors = [
        this.page.locator('#toast-container .toast-body').first(),
        this.page.locator('.toast-container .toast-body').first(),
        this.page.locator('#toast-container .toast').first(),
        this.page.locator('.toast-container .toast').first(),
        this.page.locator('.toast-body').first(),
        this.page.locator('.toast-message').first(),
        this.page.locator('.toast').first(),
        this.page.locator('.toast-success').first(),
        this.page.locator('.alert-success').first(),
        this.page.locator('.alert').first(),
        this.page.locator('[class*="toast"]').first(),
        this.page.locator('[class*="toast-body"]').first(),
        this.page.locator('mat-snack-bar-container').first(),
        this.page.locator('[role="alert"]').first(),
        this.page.locator('[role="status"]').first(),
        this.successToast
      ];

      for (const selector of toastSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await selector.textContent().catch(() => '');
            if (text && text.trim()) {
              return text.trim();
            }
          }
        } catch (e) {
          // Continue
        }
      }

      // Try to get text from any visible toast
      const allToasts = this.page.locator('.toast, .alert, [class*="toast"], [class*="alert"], [role="alert"], [role="status"]');
      const toastCount = await allToasts.count();
      
      for (let i = 0; i < toastCount; i++) {
        const toast = allToasts.nth(i);
        const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
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
   * Verifies no navigation happened (URL remains the same)
   * @param {string} originalUrl - Original URL before action
   * @returns {Promise<boolean>}
   */
  async verifyNoNavigation(originalUrl) {
    try {
      await this.page.waitForTimeout(1000);
      const currentUrl = this.page.url();
      return currentUrl === originalUrl;
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

module.exports = { AddonsPage };

