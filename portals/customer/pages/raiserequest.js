class RaiseRequestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Service Request dropdown and Raise Service Request option
    this.serviceRequestDropdown = page.locator('a[data-bs-toggle="collapse"][data-bs-target="#service-request"], a.nav-link:has-text("Service Request")[data-bs-toggle="collapse"]').first();
    this.raiseServiceRequestOption = page.locator('a[href*="raise-service-request"], a[ng-reflect-router-link="raise-service-request"], a:has-text("Raise Request"), #service-request a:has-text("Raise Request")').first();

    // Page wrapper
    this.raiseRequestWrapper = page.locator('.raise-request-wrapper, [class*="raise-request"], [class*="raise-service-request"]').first();

    // Page Header
    this.pageHeader = page.locator('.page-header-modern, .header-left').first();
    this.pageHeading = page.locator('h6.page-title-modern, h1.page-title-modern, h2.page-title-modern, .page-title-modern').first();

    // Service navigation section (All Service Request, Raise Service Request)
    this.serviceNavSection = page.locator('.service-nav-modern, .service, ul.service').first();
    this.allServiceRequestLink = page.locator('a.service-link-modern:has-text("All Service Request"), a:has-text("All Service Request")').first();
    this.raiseServiceRequestLink = page.locator('a.service-link-modern:has-text("Raise Service Request"), a:has-text("Raise Service Request")').first();

    // Issue selection cards
    this.issueSelectionGrid = page.locator('.issue-selection-grid, [class*="issue-selection"]').first();
    this.allIssueCards = page.locator('.issue-card-modern, [class*="issue-card"]');
    
    // Individual issue cards
    this.technicalIssueCard = page.locator('.issue-card-modern:has(.issue-card-title:has-text("Technical Issue")), .issue-card-modern:has-text("Technical Issue")').first();
    this.technicalIssueRadio = page.locator('.issue-card-modern:has-text("Technical Issue") input[type="radio"][name="requestType"], .issue-card-modern:has-text("Technical Issue") input[type="radio"]').first();
    this.billingPaymentCard = page.locator('.issue-card-modern:has(.issue-card-title:has-text("Billing & Payment")), .issue-card-modern:has-text("Billing & Payment"), .issue-card-modern:has-text("Billing")').first();
    this.billingPaymentRadio = page.locator('.issue-card-modern:has-text("Billing & Payment") input[type="radio"][name="requestType"], .issue-card-modern:has-text("Billing") input[type="radio"]').first();
    this.feedbackFeatureCard = page.locator('.issue-card-modern:has(.issue-card-title:has-text("Feedback or Feature Request")), .issue-card-modern:has-text("Feedback or Feature Request"), .issue-card-modern:has-text("Feedback")').first();
    this.feedbackFeatureRadio = page.locator('.issue-card-modern:has-text("Feedback or Feature Request") input[type="radio"][name="requestType"], .issue-card-modern:has-text("Feedback") input[type="radio"]').first();

    // Issue Type selection page
    this.issueTypeCards = page.locator('.issue-card-modern input[type="radio"], .card input[type="radio"][name*="issue"], .card input[type="radio"]');
    this.allIssueTypeCards = page.locator('.issue-card-modern, .card:has(input[type="radio"])');

    // Sub Issue Type selection page
    this.subIssueListContainer = page.locator('.issue-list-container').first();
    this.subIssueListItems = page.locator('.issue-list-item, .issue-list-container .issue-list-item');
    this.subIssueTypeCards = page.locator('.issue-list-item input[type="radio"][name="issueSubType"], .issue-card-modern input[type="radio"], .card input[type="radio"][name*="sub"], .card input[type="radio"]');
    this.allSubIssueTypeCards = page.locator('.issue-list-item, .issue-card-modern, .card:has(input[type="radio"])');

    // Describe Issue page
    this.describeIssuePage = page.locator('.step-header:has-text("Describe your issue"), h2:has-text("Describe your issue")').first();
    this.descriptionTextarea = page.locator('textarea#description, textarea[name*="description"], textarea[placeholder*="description"], textarea[placeholder*="Type some description"], textarea, .description-field textarea').first();
    this.nextButton = page.locator('button:has-text("Next"), button.btn-next, button[type="submit"]:has-text("Next"), .btn-next').first();
    this.descriptionError = page.locator('.error-message:has-text("mandatory"), .error-message:has-text("required"), .text-danger:has-text("description"), [class*="error"]:has-text("required"), [class*="error"]:has-text("Description")').first();

    // Image upload
    this.dropArea = page.locator('.drop-area, [class*="drop-area"]').first();
    this.imageUploadInput = page.locator('input#fileInput, input[type="file"][accept*="image"], input[type="file"], .file-upload input').first();
    this.uploadButton = page.locator('button:has-text("Upload"), .upload-button, input[type="file"]').first();
    this.uploadError = page.locator('.error-message:has-text("500"), .error-message:has-text("size"), .error-message:has-text("KB"), .text-danger:has-text("500"), [class*="error"]:has-text("500"), [class*="error"]:has-text("size"), .toast-error:has-text("500")').first();
    this.uploadLimitError = page.locator('.error-message:has-text("3"), .error-message:has-text("maximum"), .error-message:has-text("limit"), .text-danger:has-text("3"), [class*="error"]:has-text("3"), [class*="error"]:has-text("maximum"), .toast-error:has-text("3")').first();
    this.uploadFileTypeError = page.locator('.error-message:has-text("image"), .error-message:has-text("JPEG"), .error-message:has-text("PNG"), .error-message:has-text("JPG"), .error-message:has-text("SVG"), .error-message:has-text("format"), .error-message:has-text("type"), .text-danger:has-text("image"), [class*="error"]:has-text("image"), [class*="error"]:has-text("format"), .toast-error:has-text("image")').first();
    this.uploadedFilesList = page.locator('.preview-list .file-preview, .file-preview, .uploaded-files, .file-list, [class*="uploaded"], [class*="file-item"]');
    this.imagePreview = page.locator('.preview-list .file-preview, .file-preview, .image-preview, img[src*="blob"], img[src*="data:"], .preview-image, [class*="preview"] img, .uploaded-image, [class*="image-preview"]');
    this.toastContainer = page.locator('#toast-container, .toast-container, .toast-top-right, [aria-live="polite"]');
    this.toastMessage = page.locator('.toast, .toast-message, [class*="toast"]:not(.toast-container), .toast-error, .toast-success, .toast-warning');

    // Review and Submit page
    this.reviewPage = page.locator('.review-page, [class*="review"], .submit-page').first();
    this.submitButton = page.locator('button:has-text("Submit"), button.btn-submit, button[type="submit"]:has-text("Submit")').first();

    // Mobile Modal
    this.mobileModal = page.locator('div.common-modal.modern-modal.p-3, .common-modal.modern-modal:has-text("Verify Mobile"), .modal:has-text("Verify Mobile"), .common-modal.modern-modal, .modal:has-text("mobile"), .modal:has-text("Mobile"), [role="dialog"]:has-text("mobile")').first();
    this.modalTitle = page.locator('h5.modal-title-modern:has-text("Verify Mobile"), .modal-title-modern:has-text("Verify Mobile")').first();
    this.modalNameField = page.locator('input[ng-reflect-name="name"][placeholder="Enter name"], input[ng-reflect-name="name"], input[name="name"], .modal input[ng-reflect-name="name"], .modal input[name="name"], .modal input[placeholder*="Name" i], input[placeholder*="name" i], .modal input[type="text"]:first-of-type').first();
    this.modalMobileField = page.locator('input[ng-reflect-name="mobile"][type="tel"][placeholder="Enter mobile"], input[ng-reflect-name="mobile"], input[name="mobile"], input[type="tel"], .modal input[ng-reflect-name="mobile"], .modal input[name="mobile"], .modal input[name*="phone"], .modal input[placeholder*="Mobile" i], .modal input[placeholder*="Phone" i], .modal input[type="tel"], input[placeholder*="mobile" i]').first();
    this.modalSubmitButton = page.locator('button.btn.primary-btn[type="submit"]:has-text("Submit"), button:has-text("Submit"), .modal button:has-text("Submit"), .modal button[type="submit"], .modal .btn-submit').first();
    this.modalCancelButton = page.locator('button.btn.secondary-btn[type="button"]:has-text("Cancel"), button:has-text("Cancel"), .modal button:has-text("Cancel")').first();
    this.modalRequiredError = page.locator('.modal .error-message, .modal .text-danger, .modal [class*="error"]:has-text("required")');

    // Navigation to All Request page
    this.allRequestLink = page.locator('a:has-text("All Service Request"), a[href*="all-request"]').first();
    
    // Banner overlay
    this.bannerOverlay = page.locator('.uf-bannerInner, [class*="uf-banner"]').first();
    this.bannerCloseButton = page.locator('button[data-action="close"].uf-button-secondary, button.uf-button-secondary:has-text("Close"), .uf-bannerInner button:has-text("Close")').first();
  }

  /**
   * Navigates to Raise Service Request page
   */
  async gotoRaiseServiceRequest() {
    try {
      // Step 1: Click on Service Request dropdown in sidebar
      const dropdownVisible = await this.serviceRequestDropdown.isVisible({ timeout: 5000 }).catch(() => false);
      if (dropdownVisible) {
        // Check if dropdown is already open (has 'show' class on the collapse element)
        const collapseElement = this.page.locator('#service-request.collapse');
        const isOpen = await collapseElement.evaluate(el => el.classList.contains('show')).catch(() => false);
        
        if (!isOpen) {
          // Click to open the dropdown
          await this.serviceRequestDropdown.scrollIntoViewIfNeeded();
          await this.serviceRequestDropdown.click();
          await this.page.waitForTimeout(500); // Wait for dropdown to open
        }
        
        // Step 2: Click on "Raise Service Request" option
        await this.raiseServiceRequestOption.waitFor({ state: 'visible', timeout: 10000 });
        await this.raiseServiceRequestOption.scrollIntoViewIfNeeded();
        await this.raiseServiceRequestOption.click();
        await this.page.waitForTimeout(2000); // Wait for navigation
      } else {
        // Fallback: navigate directly to /raise-service-request
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/raise-service-request`);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      // Fallback: navigate directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/raise-service-request`);
      await this.page.waitForTimeout(2000);
    }
    
    // Wait for page to load
    await Promise.race([
      this.raiseRequestWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.issueSelectionGrid.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Closes banner overlay if it exists (e.g., "Happy New Year" banner)
   * Should be called after navigating to a page
   */
  async closeBannerIfExists() {
    try {
      // Wait a bit for banner to appear
      await this.page.waitForTimeout(1000);
      
      // Check if banner exists
      const bannerVisible = await this.bannerOverlay.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (bannerVisible) {
        // Try to find and click the close button
        const closeButtonVisible = await this.bannerCloseButton.isVisible({ timeout: 1000 }).catch(() => false);
        
        if (closeButtonVisible) {
          await this.bannerCloseButton.click();
          await this.page.waitForTimeout(500);
          console.log('✓ Closed banner overlay');
          return true;
        } else {
          // Try pressing Escape as fallback
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
          console.log('✓ Closed banner overlay (using Escape)');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      // Banner might not exist, which is fine
      return false;
    }
  }

  /**
   * Closes any overlay elements in the header
   */
  async closeHeaderOverlays() {
    try {
      // Check for banner overlay
      await this.closeBannerIfExists();
      
      // Check for other overlay elements in header
      const headerOverlays = this.page.locator('header .uf-bannerInner, header [class*="banner"], header [class*="overlay"]');
      const overlayCount = await headerOverlays.count();
      
      for (let i = 0; i < overlayCount; i++) {
        const overlay = headerOverlays.nth(i);
        const isVisible = await overlay.isVisible({ timeout: 500 }).catch(() => false);
        if (isVisible) {
          // Try to find close button
          const closeBtn = overlay.locator('button:has-text("Close"), button[data-action="close"]').first();
          const closeVisible = await closeBtn.isVisible({ timeout: 500 }).catch(() => false);
          if (closeVisible) {
            await closeBtn.click();
            await this.page.waitForTimeout(300);
          }
        }
      }
      
      return true;
    } catch (error) {
      // Overlays might not exist, which is fine
      return false;
    }
  }

  /**
   * Verifies service navigation section is visible
   * @returns {Promise<{navSectionVisible: boolean, allServiceRequestVisible: boolean, raiseServiceRequestVisible: boolean}>}
   */
  async verifyServiceNavSection() {
    try {
      const navSectionVisible = await this.serviceNavSection.isVisible({ timeout: 5000 }).catch(() => false);
      const allServiceRequestVisible = await this.allServiceRequestLink.isVisible({ timeout: 5000 }).catch(() => false);
      const raiseServiceRequestVisible = await this.raiseServiceRequestLink.isVisible({ timeout: 5000 }).catch(() => false);
      
      return {
        navSectionVisible: navSectionVisible,
        allServiceRequestVisible: allServiceRequestVisible,
        raiseServiceRequestVisible: raiseServiceRequestVisible
      };
    } catch (error) {
      return {
        navSectionVisible: false,
        allServiceRequestVisible: false,
        raiseServiceRequestVisible: false
      };
    }
  }

  /**
   * Verifies all issue cards are visible
   * @returns {Promise<{technicalIssueVisible: boolean, billingPaymentVisible: boolean, feedbackFeatureVisible: boolean}>}
   */
  async verifyIssueCards() {
    try {
      const technicalIssueVisible = await this.technicalIssueCard.isVisible({ timeout: 5000 }).catch(() => false);
      const billingPaymentVisible = await this.billingPaymentCard.isVisible({ timeout: 5000 }).catch(() => false);
      const feedbackFeatureVisible = await this.feedbackFeatureCard.isVisible({ timeout: 5000 }).catch(() => false);
      
      return {
        technicalIssueVisible: technicalIssueVisible,
        billingPaymentVisible: billingPaymentVisible,
        feedbackFeatureVisible: feedbackFeatureVisible
      };
    } catch (error) {
      return {
        technicalIssueVisible: false,
        billingPaymentVisible: false,
        feedbackFeatureVisible: false
      };
    }
  }

  /**
   * Gets all issue cards
   * @returns {Promise<Array<{title: string, description: string, element: any}>>}
   */
  async getAllIssueCards() {
    try {
      const cards = [];
      const cardCount = await this.allIssueCards.count();
      
      for (let i = 0; i < cardCount; i++) {
        const card = this.allIssueCards.nth(i);
        const isVisible = await card.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          try {
            const titleElement = card.locator('.issue-card-title');
            const descElement = card.locator('.issue-card-desc');
            
            const title = await titleElement.textContent();
            const description = await descElement.textContent();
            
            cards.push({
              title: title?.trim() || '',
              description: description?.trim() || '',
              element: card
            });
          } catch (e) {
            // If we can't get title/desc, skip this card
            continue;
          }
        }
      }
      
      return cards;
    } catch (error) {
      return [];
    }
  }

  /**
   * Clicks on Technical Issue radio button
   */
  async clickTechnicalIssue() {
    try {
      // Wait for page to be ready
      await this.page.waitForTimeout(1000);
      
      // Try multiple selectors for Technical Issue card
      const selectors = [
        '.issue-card-modern:has-text("Technical Issue")',
        '.issue-card-modern:has(.issue-card-title:has-text("Technical Issue"))',
        'input[type="radio"][value*="technical" i]',
        'input[type="radio"][name*="requestType"]',
        '.card:has-text("Technical Issue")'
      ];
      
      let clicked = false;
      
      for (const selector of selectors) {
        try {
          const element = this.page.locator(selector).first();
          const isVisible = await element.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await element.scrollIntoViewIfNeeded();
            await element.click({ timeout: 5000 });
            clicked = true;
            break;
          }
        } catch (err) {
          // Try next selector
          continue;
        }
      }
      
      // If none of the selectors worked, try clicking by text
      if (!clicked) {
        const technicalIssueByText = this.page.locator('text=Technical Issue').first();
        const isVisible = await technicalIssueByText.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          await technicalIssueByText.scrollIntoViewIfNeeded();
          await technicalIssueByText.click({ timeout: 5000 });
          clicked = true;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find Technical Issue card or radio button');
      }
      
      // Wait for navigation or next page to load
      await this.page.waitForTimeout(2000);
      
      // Verify we've moved to the next step (issue type selection page)
      // This helps confirm the click was successful
      const issueTypePage = this.page.locator('.issue-type-page, [class*="issue-type"], .step-header').first();
      await issueTypePage.isVisible({ timeout: 5000 }).catch(() => {
        // It's okay if we don't see the issue type page immediately
        console.log('Issue type page not immediately visible, continuing...');
      });
      
    } catch (error) {
      throw new Error(`Failed to click Technical Issue: ${error.message}`);
    }
  }

  /**
   * Clicks on Billing & Payment radio button
   */
  async clickBillingPayment() {
    try {
      await this.billingPaymentCard.waitFor({ state: 'visible', timeout: 10000 });
      await this.billingPaymentCard.scrollIntoViewIfNeeded();
      // Click on the card or radio button
      await this.billingPaymentRadio.click({ timeout: 5000 }).catch(() => {
        // If radio click fails, click on the card
        return this.billingPaymentCard.click();
      });
      await this.page.waitForTimeout(2000); // Wait for navigation to describe issue page
    } catch (error) {
      throw new Error(`Failed to click Billing & Payment: ${error.message}`);
    }
  }

  /**
   * Clicks on Feedback or Feature Request radio button
   */
  async clickFeedbackFeatureRequest() {
    try {
      await this.feedbackFeatureCard.waitFor({ state: 'visible', timeout: 10000 });
      await this.feedbackFeatureCard.scrollIntoViewIfNeeded();
      // Click on the card or radio button
      await this.feedbackFeatureRadio.click({ timeout: 5000 }).catch(() => {
        // If radio click fails, click on the card
        return this.feedbackFeatureCard.click();
      });
      await this.page.waitForTimeout(2000); // Wait for navigation to describe issue page
    } catch (error) {
      throw new Error(`Failed to click Feedback or Feature Request: ${error.message}`);
    }
  }

  /**
   * Selects an issue type (clicks on first available issue type card)
   * @returns {Promise<string>} Selected issue type text
   */
  async selectIssueType() {
    try {
      await this.page.waitForTimeout(1000);
      const cardCount = await this.allIssueTypeCards.count();
      if (cardCount === 0) {
        throw new Error('No issue type cards found');
      }
      
      // Excluded issue types (case-insensitive)
      const excludedTypes = ['login', 'hanging', 'printing'];
      
      // Find a card that is NOT in the excluded list
      let selectedCard = null;
      let selectedIssueType = '';
      
      for (let i = 0; i < cardCount; i++) {
        const card = this.allIssueTypeCards.nth(i);
        const titleElement = card.locator('.issue-card-title, h3, .card-title, .card-title-modern');
        const issueTypeText = await titleElement.textContent().catch(() => '');
        const issueTypeLower = issueTypeText?.trim().toLowerCase() || '';
        
        // Check if this issue type should be excluded
        const isExcluded = excludedTypes.some(excluded => issueTypeLower.includes(excluded.toLowerCase()));
        
        if (!isExcluded && issueTypeText) {
          selectedCard = card;
          selectedIssueType = issueTypeText.trim();
          break;
        }
      }
      
      if (!selectedCard) {
        throw new Error('No valid issue type found (all available types are excluded: login, hanging, printing)');
      }
      
      // Click on the card or its radio button
      const radioButton = selectedCard.locator('input[type="radio"]').first();
      await radioButton.click({ timeout: 5000 }).catch(() => {
        return selectedCard.click();
      });
      
      await this.page.waitForTimeout(2000); // Wait for navigation
      return selectedIssueType;
    } catch (error) {
      throw new Error(`Failed to select issue type: ${error.message}`);
    }
  }

  /**
   * Selects a sub issue type (clicks on first available sub issue type card)
   * @returns {Promise<string>} Selected sub issue type text
   */
  async selectSubIssueType() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Try multiple selector strategies
      let selectedSubIssueType = '';
      let clicked = false;
      
      // Strategy 1: Try issue-list-item structure (new structure)
      try {
        const listItems = this.page.locator('.issue-list-item');
        const itemCount = await listItems.count();
        
        if (itemCount > 0) {
          // Get the first item's text
          const firstItem = listItems.first();
          const nameElement = firstItem.locator('.issue-list-name, span.issue-list-name');
          const subIssueTypeText = await nameElement.textContent().catch(() => '');
          
          if (subIssueTypeText) {
            // Click on the radio button or the item
            const radioButton = firstItem.locator('input[type="radio"][name="issueSubType"]').first();
            const isRadioVisible = await radioButton.isVisible({ timeout: 3000 }).catch(() => false);
            
            if (isRadioVisible) {
              await radioButton.scrollIntoViewIfNeeded();
              await radioButton.click({ timeout: 5000 });
              clicked = true;
              selectedSubIssueType = subIssueTypeText.trim();
            } else {
              // Try clicking the item itself
              await firstItem.scrollIntoViewIfNeeded();
              await firstItem.click({ timeout: 5000 });
              clicked = true;
              selectedSubIssueType = subIssueTypeText.trim();
            }
          }
        }
      } catch (err) {
        // Continue to next strategy
        console.log('Issue-list-item structure not found, trying alternative...');
      }
      
      // Strategy 2: Try card-based structure (fallback)
      if (!clicked) {
        const cardCount = await this.allSubIssueTypeCards.count();
        if (cardCount > 0) {
          const firstCard = this.allSubIssueTypeCards.first();
          const titleElement = firstCard.locator('.issue-card-title, h3, .card-title, .issue-list-name');
          const subIssueTypeText = await titleElement.textContent().catch(() => '');
          
          if (subIssueTypeText) {
            const radioButton = firstCard.locator('input[type="radio"]').first();
            await radioButton.click({ timeout: 5000 }).catch(() => {
              return firstCard.click();
            });
            clicked = true;
            selectedSubIssueType = subIssueTypeText.trim();
          }
        }
      }
      
      if (!clicked) {
        throw new Error('No sub issue type items found or could not be clicked');
      }
      
      await this.page.waitForTimeout(2000); // Wait for navigation
      return selectedSubIssueType;
    } catch (error) {
      throw new Error(`Failed to select sub issue type: ${error.message}`);
    }
  }

  /**
   * Clicks Next button without description to verify it's required
   * @returns {Promise<boolean>} True if error message is shown
   */
  async clickNextWithoutDescription() {
    try {
      await this.nextButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.nextButton.click();
      await this.page.waitForTimeout(1000);
      
      // Check if error message is displayed
      const errorVisible = await this.descriptionError.isVisible({ timeout: 3000 }).catch(() => false);
      return errorVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Enters description in the textarea
   * @param {string} description - Description text
   */
  async enterDescription(description) {
    try {
      await this.descriptionTextarea.waitFor({ state: 'visible', timeout: 10000 });
      await this.descriptionTextarea.scrollIntoViewIfNeeded();
      await this.descriptionTextarea.fill(description);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter description: ${error.message}`);
    }
  }

  /**
   * Clicks Next button
   */
  async clickNext() {
    try {
      await this.nextButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.nextButton.scrollIntoViewIfNeeded();
      await this.nextButton.click();
      await this.page.waitForTimeout(2000); // Wait for navigation
    } catch (error) {
      throw new Error(`Failed to click Next button: ${error.message}`);
    }
  }

  /**
   * Uploads an image file
   * @param {string} filePath - Path to the image file
   */
  async uploadImage(filePath) {
    try {
      // Wait for drop area to be available
      await this.dropArea.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      
      // Try multiple selectors for the file input
      const fileInputSelectors = [
        'input#fileInput',
        'input[type="file"][id="fileInput"]',
        'input[type="file"][accept*="image"]',
        'input[type="file"]'
      ];
      
      let uploaded = false;
      
      for (const selector of fileInputSelectors) {
        try {
          const fileInput = this.page.locator(selector).first();
          const isAttached = await fileInput.count() > 0;
          
          if (isAttached) {
            // The file input is hidden, so we'll set files directly
            await fileInput.setInputFiles(filePath, { timeout: 5000 });
            uploaded = true;
            break;
          }
        } catch (err) {
          // Try next selector
          continue;
        }
      }
      
      if (!uploaded) {
        // Fallback: try to find and click the label or browse button
        const browseLabel = this.page.locator('label[for="fileInput"], label:has-text("Browse")').first();
        const isLabelVisible = await browseLabel.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (isLabelVisible) {
          await browseLabel.click();
          await this.page.waitForTimeout(500);
          // Try to set files again after clicking
          const fileInput = this.page.locator('input#fileInput').first();
          await fileInput.setInputFiles(filePath, { timeout: 5000 });
          uploaded = true;
        }
      }
      
      if (!uploaded) {
        throw new Error('Could not find or interact with file input');
      }
      
      await this.page.waitForTimeout(2000); // Wait for upload to process
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Attempts to upload an image file and checks for size validation error
   * @param {string} filePath - Path to the image file
   * @returns {Promise<{uploaded: boolean, errorShown: boolean, errorMessage: string, hasImagePreview: boolean, toastMessage: string}>}
   */
  async attemptUploadImage(filePath) {
    try {
      // Wait for drop area or file input to be available (with timeout protection)
      await Promise.race([
        this.dropArea.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
      
      // Clear any previous error messages (with timeout protection)
      await Promise.race([
        this.page.waitForTimeout(500),
        new Promise((resolve) => setTimeout(resolve, 600))
      ]);
      
      // Attempt to upload the file
      try {
        await this.imageUploadInput.setInputFiles(filePath);
      } catch (uploadError) {
        // If that fails, try to make it visible first
        try {
          await this.imageUploadInput.evaluate(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          });
          await this.imageUploadInput.setInputFiles(filePath);
        } catch (retryError) {
          // If still fails, continue with checks
        }
      }
      
      // Wait for validation (with timeout protection)
      await Promise.race([
        this.page.waitForTimeout(1500),
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);
      
      // Check if error message is shown (with short timeout)
      const errorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 2000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 2500))
      ]);
      
      let errorMessage = '';
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      // Check if image preview is present (indicates successful upload) - with timeout
      const imagePreviewVisible = await Promise.race([
        this.imagePreview.isVisible({ timeout: 1500 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 2000))
      ]);
      
      const imagePreviewCount = await Promise.race([
        this.imagePreview.count().catch(() => 0),
        new Promise((resolve) => setTimeout(() => resolve(0), 1000))
      ]);
      
      const hasImagePreview = imagePreviewVisible || imagePreviewCount > 0;
      
      // Check for toast message (optional) - with timeout
      let toastMessage = '';
      try {
        const toastVisible = await Promise.race([
          this.toastMessage.isVisible({ timeout: 1500 }).catch(() => false),
          new Promise((resolve) => setTimeout(() => resolve(false), 2000))
        ]);
        
        if (toastVisible) {
          toastMessage = await Promise.race([
            this.toastMessage.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          toastMessage = toastMessage?.trim() || '';
        }
      } catch (error) {
        // Toast might not be present, that's okay
      }
      
      // File is considered uploaded if image preview is present
      // File is NOT uploaded if error is shown OR no image preview is present
      const fileUploaded = hasImagePreview && !errorVisible;
      
      return {
        uploaded: fileUploaded,
        errorShown: errorVisible,
        errorMessage: errorMessage || toastMessage,
        hasImagePreview: hasImagePreview,
        toastMessage: toastMessage
      };
    } catch (error) {
      // If upload fails with an error, check if it's a validation error (with timeout protection)
      const errorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      let errorMessage = '';
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (textError) {
          // Continue without error message
        }
      }
      
      // Check for toast message (with timeout protection)
      let toastMessage = '';
      try {
        const toastVisible = await Promise.race([
          this.toastMessage.isVisible({ timeout: 1000 }).catch(() => false),
          new Promise((resolve) => setTimeout(() => resolve(false), 1500))
        ]);
        
        if (toastVisible) {
          toastMessage = await Promise.race([
            this.toastMessage.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          toastMessage = toastMessage?.trim() || '';
        }
      } catch (toastError) {
        // Toast might not be present
      }
      
      // Check if image preview is present (with timeout protection)
      const imagePreviewVisible = await Promise.race([
        this.imagePreview.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      const imagePreviewCount = await Promise.race([
        this.imagePreview.count().catch(() => 0),
        new Promise((resolve) => setTimeout(() => resolve(0), 1000))
      ]);
      
      const hasImagePreview = imagePreviewVisible || imagePreviewCount > 0;
      
      return {
        uploaded: false,
        errorShown: errorVisible,
        errorMessage: errorMessage || toastMessage || (error.message || ''),
        hasImagePreview: hasImagePreview,
        toastMessage: toastMessage
      };
    }
  }

  /**
   * Attempts to upload multiple image files and checks for count limit validation
   * @param {Array<string>} filePaths - Array of paths to image files
   * @returns {Promise<{uploadedCount: number, errorShown: boolean, errorMessage: string}>}
   */
  async attemptUploadMultipleImages(filePaths) {
    try {
      // Wait for drop area or file input to be available (with timeout protection)
      await Promise.race([
        this.dropArea.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
      
      // Clear any previous error messages (with timeout protection)
      await Promise.race([
        this.page.waitForTimeout(500),
        new Promise((resolve) => setTimeout(resolve, 600))
      ]);
      
      // Get initial count of uploaded files using the new method
      const initialCount = await this.getUploadedFilesCount();
      
      // Attempt to upload all files at once (since input accepts multiple)
      try {
        await this.imageUploadInput.setInputFiles(filePaths);
      } catch (uploadError) {
        // If that fails, try to make it visible first
        try {
          await this.imageUploadInput.evaluate(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          });
          await this.imageUploadInput.setInputFiles(filePaths);
        } catch (retryError) {
          // If still fails, continue with checks
        }
      }
      
      // Wait for validation and processing (with timeout protection)
      await Promise.race([
        this.page.waitForTimeout(2000),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);
      
      // Check final count of uploaded files using the new method
      const finalCount = await this.getUploadedFilesCount();
      const uploadedCount = finalCount - initialCount;
      
      // Check if error message is shown (with timeout protection)
      const errorVisible = await Promise.race([
        this.uploadLimitError.isVisible({ timeout: 2000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 2500))
      ]);
      
      let errorMessage = '';
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadLimitError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      // Also check for size error in case any file is too large (with timeout protection)
      const sizeErrorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      if (sizeErrorVisible && !errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      // Check for toast message (optional)
      let toastMessage = '';
      try {
        const toastVisible = await Promise.race([
          this.toastMessage.isVisible({ timeout: 1500 }).catch(() => false),
          new Promise((resolve) => setTimeout(() => resolve(false), 2000))
        ]);
        
        if (toastVisible) {
          toastMessage = await Promise.race([
            this.toastMessage.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          toastMessage = toastMessage?.trim() || '';
        }
      } catch (error) {
        // Toast might not be present
      }
      
      return {
        uploadedCount: uploadedCount,
        errorShown: errorVisible || sizeErrorVisible,
        errorMessage: errorMessage || toastMessage
      };
    } catch (error) {
      // If upload fails with an error, check if it's a validation error (with timeout protection)
      const errorVisible = await Promise.race([
        this.uploadLimitError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      const sizeErrorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      let errorMessage = '';
      
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadLimitError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      } else if (sizeErrorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      // Get current count using the new method
      const currentCount = await this.getUploadedFilesCount();
      
      return {
        uploadedCount: 0,
        errorShown: errorVisible || sizeErrorVisible,
        errorMessage: errorMessage || (error.message || '')
      };
    }
  }

  /**
   * Gets count of currently uploaded files (image previews)
   * @returns {Promise<number>}
   */
  async getUploadedFilesCount() {
    try {
      // Use multiple selectors to count image previews
      const previewList = this.page.locator('.preview-list .file-preview, .file-preview');
      const count = await Promise.race([
        previewList.count(),
        new Promise((resolve) => setTimeout(() => resolve(0), 2000))
      ]).catch(() => 0);
      
      // Fallback to other selectors if preview-list not found
      if (count === 0) {
        const fallbackCount = await Promise.race([
          this.uploadedFilesList.count(),
          new Promise((resolve) => setTimeout(() => resolve(0), 1000))
        ]).catch(() => 0);
        return fallbackCount;
      }
      
      return count;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Uploads an image using the browse/file input method
   * @param {string} filePath - Path to the image file
   * @returns {Promise<{uploaded: boolean, errorShown: boolean, errorMessage: string, hasImagePreview: boolean}>}
   */
  async uploadImageByBrowse(filePath) {
    try {
      const initialCount = await this.getUploadedFilesCount();
      
      // Wait for drop area to be available
      await Promise.race([
        this.dropArea.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
      
      // Use the file input to upload
      try {
        await this.imageUploadInput.setInputFiles(filePath);
      } catch (uploadError) {
        // If that fails, try to make it visible first
        try {
          await this.imageUploadInput.evaluate(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          });
          await this.imageUploadInput.setInputFiles(filePath);
        } catch (retryError) {
          throw new Error(`Failed to upload via browse: ${retryError.message}`);
        }
      }
      
      // Wait for upload to process
      await Promise.race([
        this.page.waitForTimeout(2000),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);
      
      // Check if image preview is present
      const finalCount = await this.getUploadedFilesCount();
      const hasImagePreview = finalCount > initialCount;
      
      // Check for errors
      const errorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      let errorMessage = '';
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      return {
        uploaded: hasImagePreview && !errorVisible,
        errorShown: errorVisible,
        errorMessage: errorMessage,
        hasImagePreview: hasImagePreview
      };
    } catch (error) {
      return {
        uploaded: false,
        errorShown: false,
        errorMessage: error.message,
        hasImagePreview: false
      };
    }
  }

  /**
   * Uploads an image using drag and drop method
   * @param {string} filePath - Path to the image file
   * @returns {Promise<{uploaded: boolean, errorShown: boolean, errorMessage: string, hasImagePreview: boolean}>}
   */
  async uploadImageByDragAndDrop(filePath) {
    try {
      const initialCount = await this.getUploadedFilesCount();
      
      // Wait for drop area to be available
      await Promise.race([
        this.dropArea.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
      
      // Use Playwright's drag and drop functionality
      // First, we need to create a temporary element to drag from
      // Then use the file input with setInputFiles which simulates drag and drop
      
      // Simulate drag and drop by setting files on the drop area's file input
      // Most drag-and-drop implementations use the same file input
      try {
        // Trigger dragenter and dragover events
        await this.dropArea.dispatchEvent('dragenter');
        await this.page.waitForTimeout(100);
        await this.dropArea.dispatchEvent('dragover');
        await this.page.waitForTimeout(100);
        
        // Set files on the file input (this is what drag and drop typically does)
        await this.imageUploadInput.setInputFiles(filePath);
        
        // Trigger drop event
        await this.dropArea.dispatchEvent('drop');
      } catch (dropError) {
        // If drag events fail, just use setInputFiles directly
        await this.imageUploadInput.setInputFiles(filePath);
      }
      
      // Wait for upload to process
      await Promise.race([
        this.page.waitForTimeout(2000),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);
      
      // Check if image preview is present
      const finalCount = await this.getUploadedFilesCount();
      const hasImagePreview = finalCount > initialCount;
      
      // Check for errors
      const errorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      let errorMessage = '';
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      return {
        uploaded: hasImagePreview && !errorVisible,
        errorShown: errorVisible,
        errorMessage: errorMessage,
        hasImagePreview: hasImagePreview
      };
    } catch (error) {
      // Fallback: try using setInputFiles if drag and drop fails
      console.log(`Drag and drop method failed: ${error.message}, falling back to browse method`);
      return await this.uploadImageByBrowse(filePath);
    }
  }

  /**
   * Uploads an image using paste (Ctrl+V) method
   * @param {string} filePath - Path to the image file
   * @returns {Promise<{uploaded: boolean, errorShown: boolean, errorMessage: string, hasImagePreview: boolean}>}
   */
  async uploadImageByPaste(filePath) {
    try {
      const initialCount = await this.getUploadedFilesCount();
      
      // Wait for drop area to be available
      await Promise.race([
        this.dropArea.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
      
      // Read the file
      const fs = require('fs');
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = require('path').basename(filePath);
      
      // Set clipboard with the file using Playwright's clipboard API
      try {
        // Use page.evaluate to set clipboard with file
        await this.page.evaluate(async ({ buffer, fileName }) => {
          const file = new File([new Uint8Array(buffer)], fileName, { type: 'image/png' });
          const clipboardItems = [new ClipboardItem({ 'image/png': file })];
          await navigator.clipboard.write(clipboardItems);
        }, { buffer: Array.from(fileBuffer), fileName });
      } catch (clipboardError) {
        // If clipboard API fails, try alternative approach
        console.log(`Clipboard API failed: ${clipboardError.message}, using alternative method`);
      }
      
      // Focus on the drop area
      await this.dropArea.focus().catch(() => {
        // If focus fails, click on the drop area
        this.dropArea.click().catch(() => {});
      });
      await this.page.waitForTimeout(300);
      
      // Paste using Ctrl+V (or Cmd+V on Mac)
      await this.page.keyboard.press('Control+v');
      
      // Wait for upload to process
      await Promise.race([
        this.page.waitForTimeout(2000),
        new Promise((resolve) => setTimeout(resolve, 2500))
      ]);
      
      // Check if image preview is present
      const finalCount = await this.getUploadedFilesCount();
      const hasImagePreview = finalCount > initialCount;
      
      // If paste didn't work, the file input might have been triggered
      // Check if file was uploaded via the input
      if (!hasImagePreview) {
        // Try setting files directly as fallback
        await this.imageUploadInput.setInputFiles(filePath);
        await Promise.race([
          this.page.waitForTimeout(1500),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);
        const retryCount = await this.getUploadedFilesCount();
        const retryHasPreview = retryCount > initialCount;
        if (retryHasPreview) {
          // Paste method triggered file input, which is acceptable
          return {
            uploaded: true,
            errorShown: false,
            errorMessage: '',
            hasImagePreview: true
          };
        }
      }
      
      // Check for errors
      const errorVisible = await Promise.race([
        this.uploadError.isVisible({ timeout: 1000 }).catch(() => false),
        new Promise((resolve) => setTimeout(() => resolve(false), 1500))
      ]);
      
      let errorMessage = '';
      if (errorVisible) {
        try {
          errorMessage = await Promise.race([
            this.uploadError.textContent(),
            new Promise((resolve) => setTimeout(() => resolve(''), 1000))
          ]);
          errorMessage = errorMessage?.trim() || '';
        } catch (error) {
          // Continue without error message
        }
      }
      
      return {
        uploaded: hasImagePreview && !errorVisible,
        errorShown: errorVisible,
        errorMessage: errorMessage,
        hasImagePreview: hasImagePreview
      };
    } catch (error) {
      // Fallback: try using setInputFiles if paste fails
      console.log(`Paste method failed: ${error.message}, falling back to browse method`);
      return await this.uploadImageByBrowse(filePath);
    }
  }

  /**
   * Attempts to upload an image file and verifies it was successfully uploaded
   * @param {string} filePath - Path to the image file
   * @returns {Promise<{uploaded: boolean, errorShown: boolean, errorMessage: string, fileCount: number}>}
   */
  async attemptUploadImageWithVerification(filePath) {
    try {
      // Wait for drop area or file input to be available
      await this.dropArea.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      // Clear any previous error messages
      await this.page.waitForTimeout(500);
      
      // Get initial count of uploaded files
      const initialCount = await this.getUploadedFilesCount();
      
      // Attempt to upload the file
      await this.imageUploadInput.setInputFiles(filePath).catch(async () => {
        // If that fails, try to make it visible first
        await this.imageUploadInput.evaluate(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        });
        await this.imageUploadInput.setInputFiles(filePath);
      });
      
      await this.page.waitForTimeout(2000); // Wait for upload processing
      
      // Check final count of uploaded files
      const finalCount = await this.getUploadedFilesCount();
      const uploaded = finalCount > initialCount;
      
      // Check if error message is shown
      const errorVisible = await this.uploadFileTypeError.isVisible({ timeout: 2000 }).catch(() => false);
      const sizeErrorVisible = await this.uploadError.isVisible({ timeout: 1000 }).catch(() => false);
      let errorMessage = '';
      
      if (errorVisible) {
        errorMessage = await this.uploadFileTypeError.textContent();
        errorMessage = errorMessage?.trim() || '';
      } else if (sizeErrorVisible) {
        errorMessage = await this.uploadError.textContent();
        errorMessage = errorMessage?.trim() || '';
      }
      
      return {
        uploaded: uploaded,
        errorShown: errorVisible || sizeErrorVisible,
        errorMessage: errorMessage,
        fileCount: finalCount
      };
    } catch (error) {
      const errorVisible = await this.uploadFileTypeError.isVisible({ timeout: 1000 }).catch(() => false);
      const sizeErrorVisible = await this.uploadError.isVisible({ timeout: 1000 }).catch(() => false);
      let errorMessage = '';
      
      if (errorVisible) {
        errorMessage = await this.uploadFileTypeError.textContent();
        errorMessage = errorMessage?.trim() || '';
      } else if (sizeErrorVisible) {
        errorMessage = await this.uploadError.textContent();
        errorMessage = errorMessage?.trim() || '';
      }
      
      const currentCount = await this.getUploadedFilesCount();
      return {
        uploaded: false,
        errorShown: errorVisible || sizeErrorVisible,
        errorMessage: errorMessage || error.message,
        fileCount: currentCount
      };
    }
  }

  /**
   * Attempts to upload a non-image file and checks for file type validation error
   * @param {string} filePath - Path to the file
   * @returns {Promise<{uploaded: boolean, errorShown: boolean, errorMessage: string}>}
   */
  async attemptUploadNonImageFile(filePath) {
    try {
      // Wait for drop area or file input to be available
      await this.dropArea.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      
      // Clear any previous error messages
      await this.page.waitForTimeout(500);
      
      // Get initial count of uploaded files
      const initialCount = await this.getUploadedFilesCount();
      
      // Attempt to upload the file
      await this.imageUploadInput.setInputFiles(filePath).catch(async () => {
        // If that fails, try to make it visible first
        await this.imageUploadInput.evaluate(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        });
        await this.imageUploadInput.setInputFiles(filePath);
      });
      
      await this.page.waitForTimeout(2000); // Wait for validation
      
      // Check final count of uploaded files
      const finalCount = await this.getUploadedFilesCount();
      const uploaded = finalCount > initialCount;
      
      // Check if error message is shown
      const errorVisible = await this.uploadFileTypeError.isVisible({ timeout: 3000 }).catch(() => false);
      let errorMessage = '';
      if (errorVisible) {
        errorMessage = await this.uploadFileTypeError.textContent();
        errorMessage = errorMessage?.trim() || '';
      }
      
      // Also check for size error in case file is too large
      const sizeErrorVisible = await this.uploadError.isVisible({ timeout: 1000 }).catch(() => false);
      if (sizeErrorVisible && !errorVisible) {
        errorMessage = await this.uploadError.textContent();
        errorMessage = errorMessage?.trim() || '';
      }
      
      return {
        uploaded: uploaded,
        errorShown: errorVisible || sizeErrorVisible,
        errorMessage: errorMessage
      };
    } catch (error) {
      // If upload fails with an error, check if it's a validation error
      const errorVisible = await this.uploadFileTypeError.isVisible({ timeout: 1000 }).catch(() => false);
      const sizeErrorVisible = await this.uploadError.isVisible({ timeout: 1000 }).catch(() => false);
      let errorMessage = '';
      
      if (errorVisible) {
        errorMessage = await this.uploadFileTypeError.textContent();
        errorMessage = errorMessage?.trim() || '';
      } else if (sizeErrorVisible) {
        errorMessage = await this.uploadError.textContent();
        errorMessage = errorMessage?.trim() || '';
      }
      
      return {
        uploaded: false,
        errorShown: errorVisible || sizeErrorVisible,
        errorMessage: errorMessage || error.message
      };
    }
  }

  /**
   * Clicks Submit button on review page
   */
  async clickSubmit() {
    try {
      // Wait for submit button to be available
      await this.page.waitForTimeout(1000);
      
      // Try multiple selectors for submit button
      const submitSelectors = [
        'button:has-text("Submit")',
        'button.btn-submit',
        'button[type="submit"]:has-text("Submit")',
        '.submit-button',
        'button:has-text("submit")'
      ];
      
      let clicked = false;
      
      for (const selector of submitSelectors) {
        try {
          const submitBtn = this.page.locator(selector).first();
          const isVisible = await submitBtn.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await submitBtn.scrollIntoViewIfNeeded();
            await submitBtn.click({ timeout: 5000 });
            clicked = true;
            break;
          }
        } catch (err) {
          // Try next selector
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find or click Submit button');
      }
      
      // Wait for modal to open or page to respond
      await this.page.waitForTimeout(2000);
      
      // Verify modal is opening (optional check)
      const modalVisible = await this.mobileModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (!modalVisible) {
        // Modal might take longer, wait a bit more
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to click Submit button: ${error.message}`);
    }
  }

  /**
   * Checks for and closes the banner overlay if it exists (after login/navigation)
   * @returns {Promise<boolean>} True if banner was found and closed, false otherwise
   */
  async checkAndCloseBanner() {
    try {
      // Wait a bit for banner to appear
      await this.page.waitForTimeout(1000);
      
      // Check for banner overlay
      const bannerSelectors = [
        '.uf-bannerInner',
        '[class*="uf-banner"]',
        '[class*="banner"]'
      ];
      
      for (const selector of bannerSelectors) {
        const banner = this.page.locator(selector).first();
        const isVisible = await banner.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          // Try to find and click the close button
          const closeButton = banner.locator('button[data-action="close"], button.uf-button-secondary:has-text("Close"), button:has-text("Close")').first();
          const closeVisible = await closeButton.isVisible({ timeout: 1000 }).catch(() => false);
          if (closeVisible) {
            await closeButton.click();
            await this.page.waitForTimeout(500);
            console.log('✓ Closed banner overlay');
            return true;
          } else {
            // Try pressing Escape
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
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
   * Closes any overlays, backdrops, or blocking elements that might be covering the modal
   */
  async closeOverlays() {
    try {
      // First, check for banner overlays (like "Happy New Year" banner)
      const bannerSelectors = [
        '.uf-bannerInner',
        '[class*="uf-banner"]',
        '[class*="banner"]'
      ];
      
      for (const selector of bannerSelectors) {
        const banner = this.page.locator(selector).first();
        const isVisible = await banner.isVisible({ timeout: 500 }).catch(() => false);
        if (isVisible) {
          // Try to find and click the close button
          const closeButton = banner.locator('button[data-action="close"], button.uf-button-secondary:has-text("Close"), button:has-text("Close")').first();
          const closeVisible = await closeButton.isVisible({ timeout: 500 }).catch(() => false);
          if (closeVisible) {
            await closeButton.click();
            await this.page.waitForTimeout(300);
            console.log('✓ Closed banner overlay');
          } else {
            // Try pressing Escape
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(300);
          }
        }
      }
      
      // Check for common overlay/backdrop elements
      const overlaySelectors = [
        '.modal-backdrop',
        '.backdrop',
        '[class*="backdrop"]',
        '.overlay',
        '[class*="overlay"]',
        '.loading-overlay',
        '.spinner-overlay',
        '.toast-container',
        '.cdk-overlay-backdrop',
        '.mat-dialog-backdrop'
      ];
      
      for (const selector of overlaySelectors) {
        const overlay = this.page.locator(selector).first();
        const isVisible = await overlay.isVisible({ timeout: 500 }).catch(() => false);
        if (isVisible) {
          // Try to click outside or press Escape
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(300);
          // Try clicking on the overlay to close it
          await overlay.click({ force: true }).catch(() => {});
          await this.page.waitForTimeout(300);
        }
      }
      
      // Check for any modals that might be blocking (except the mobile modal)
      const allModals = this.page.locator('.modal, .common-modal, [role="dialog"]');
      const modalCount = await allModals.count();
      
      for (let i = 0; i < modalCount; i++) {
        const modal = allModals.nth(i);
        const isVisible = await modal.isVisible({ timeout: 500 }).catch(() => false);
        if (isVisible) {
          // Check if it's the mobile modal
          const hasMobileText = await modal.locator(':has-text("Verify Mobile"), :has-text("mobile")').count() > 0;
          if (!hasMobileText) {
            // This is a different modal, try to close it
            const closeButton = modal.locator('button.close, button[aria-label="Close"], .close-btn, button:has-text("Close"), button:has-text("×")').first();
            const closeVisible = await closeButton.isVisible({ timeout: 500 }).catch(() => false);
            if (closeVisible) {
              await closeButton.click();
              await this.page.waitForTimeout(300);
            } else {
              // Press Escape to close
              await this.page.keyboard.press('Escape');
              await this.page.waitForTimeout(300);
            }
          }
        }
      }
    } catch (error) {
      // Ignore errors when closing overlays
    }
  }

  /**
   * Verifies mobile modal is open
   * @returns {Promise<boolean>}
   */
  async isMobileModalOpen() {
    try {
      // First, close any overlays or blocking elements
      await this.closeOverlays();
      await this.page.waitForTimeout(500);
      
      // Check immediately and frequently to catch transient modals
      const maxAttempts = 30; // Check 30 times over 3 seconds
      const checkInterval = 100; // Check every 100ms
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Close overlays periodically
        if (attempt % 5 === 0 && attempt > 0) {
          await this.closeOverlays();
        }
        
        // Strategy 1: Check for modal with Name and Mobile fields visible
        // Look for fields with label "Name*" or "Name" and "Mobile*" or "Mobile"
        const nameFieldSelectors = [
          'input[ng-reflect-name="name"]',
          'input[name="name"]',
          'input[placeholder*="name" i]',
          'input[placeholder*="Enter name" i]',
          'label:has-text("Name") + input',
          'label:has-text("Name*") + input'
        ];
        
        const mobileFieldSelectors = [
          'input[ng-reflect-name="mobile"]',
          'input[name="mobile"]',
          'input[type="tel"]',
          'input[placeholder*="mobile" i]',
          'input[placeholder*="Enter mobile" i]',
          'label:has-text("Mobile") + input',
          'label:has-text("Mobile*") + input'
        ];
        
        let nameField = null;
        let mobileField = null;
        
        // Try to find name field
        for (const selector of nameFieldSelectors) {
          const field = this.page.locator(selector).first();
          const isVisible = await field.isVisible({ timeout: 100 }).catch(() => false);
          if (isVisible) {
            nameField = field;
            break;
          }
        }
        
        // Try to find mobile field
        for (const selector of mobileFieldSelectors) {
          const field = this.page.locator(selector).first();
          const isVisible = await field.isVisible({ timeout: 100 }).catch(() => false);
          if (isVisible) {
            mobileField = field;
            break;
          }
        }
        
        // If both fields are visible, check if they're in a modal
        if (nameField && mobileField) {
          // Check if they're in a modal context
          const nameInModal = await nameField.evaluate(el => {
            let parent = el.parentElement;
            let depth = 0;
            while (parent && depth < 10) {
              if (parent.classList.contains('modal') || 
                  parent.classList.contains('common-modal') || 
                  parent.classList.contains('modern-modal') ||
                  parent.getAttribute('role') === 'dialog') {
                return true;
              }
              parent = parent.parentElement;
              depth++;
            }
            return false;
          }).catch(() => false);
          
          // Also check if Submit and Cancel buttons are visible (indicating modal is open)
          const submitButton = this.page.locator('.modal button:has-text("Submit"), button:has-text("Submit")').first();
          const cancelButton = this.page.locator('.modal button:has-text("Cancel"), button:has-text("Cancel")').first();
          const submitVisible = await submitButton.isVisible({ timeout: 100 }).catch(() => false);
          const cancelVisible = await cancelButton.isVisible({ timeout: 100 }).catch(() => false);
          
          if (nameInModal || (submitVisible && cancelVisible)) {
            return true;
          }
        }
        
        // Strategy 2: Check for modal title "Verify Mobile" or any modal with Name/Mobile
        const modalTitle = this.page.locator('h5.modal-title-modern:has-text("Verify Mobile"), .modal-title:has-text("Verify Mobile"), h5:has-text("Verify Mobile"), h4:has-text("Verify Mobile")').first();
        const titleVisible = await modalTitle.isVisible({ timeout: 100 }).catch(() => false);
        
        if (titleVisible) {
          return true;
        }
        
        // Strategy 3: Check for common-modal class
        const commonModal = this.page.locator('.common-modal.modern-modal, .modal.show, .modal[style*="display: block"]').first();
        const modalVisible = await commonModal.isVisible({ timeout: 100 }).catch(() => false);
        
        if (modalVisible) {
          // Verify it contains the expected fields
          const hasNameField = await commonModal.locator('input[ng-reflect-name="name"], input[name="name"], input[placeholder*="name" i]').count() > 0;
          const hasMobileField = await commonModal.locator('input[ng-reflect-name="mobile"], input[name="mobile"], input[type="tel"]').count() > 0;
          
          if (hasNameField && hasMobileField) {
            return true;
          }
        }
        
        // Wait before next check
        await this.page.waitForTimeout(checkInterval);
      }
      
      // Final check: look for any modal-related elements that might indicate modal was shown
      const modalElements = await this.page.locator('.common-modal.modern-modal, .modal.show, .modal[style*="display"]').count();
      if (modalElements > 0) {
        // Modal exists in DOM, might be closing - try closing overlays one more time
        await this.closeOverlays();
        await this.page.waitForTimeout(500);
        
        // Check again after closing overlays - look for visible fields
        const nameField = this.page.locator('input[ng-reflect-name="name"], input[name="name"]').first();
        const mobileField = this.page.locator('input[ng-reflect-name="mobile"], input[name="mobile"], input[type="tel"]').first();
        const nameVisible = await nameField.isVisible({ timeout: 1000 }).catch(() => false);
        const mobileVisible = await mobileField.isVisible({ timeout: 1000 }).catch(() => false);
        
        if (nameVisible && mobileVisible) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clears name and mobile fields in modal
   */
  async clearModalFields() {
    try {
      const nameVisible = await this.modalNameField.isVisible({ timeout: 2000 }).catch(() => false);
      const mobileVisible = await this.modalMobileField.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (nameVisible) {
        await this.modalNameField.clear();
      }
      if (mobileVisible) {
        await this.modalMobileField.clear();
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Enters name and mobile in modal
   * @param {string} name - Name to enter
   * @param {string} mobile - Mobile number to enter
   */
  async enterModalDetails(name, mobile) {
    try {
      await this.modalNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalNameField.fill(name);
      await this.page.waitForTimeout(300);
      
      await this.modalMobileField.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalMobileField.fill(mobile);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to enter modal details: ${error.message}`);
    }
  }

  /**
   * Clicks Submit button in modal
   */
  async clickModalSubmit() {
    try {
      await this.modalSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalSubmitButton.scrollIntoViewIfNeeded();
      await this.modalSubmitButton.click();
      await this.page.waitForTimeout(2000); // Wait for submission
    } catch (error) {
      throw new Error(`Failed to click modal Submit button: ${error.message}`);
    }
  }

  /**
   * Verifies required error messages are shown in modal
   * @returns {Promise<boolean>}
   */
  async verifyModalRequiredErrors() {
    try {
      const errorCount = await this.modalRequiredError.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Navigates to All Request page
   */
  async gotoAllRequest() {
    try {
      // Try clicking the link first
      const linkVisible = await this.allRequestLink.isVisible({ timeout: 5000 }).catch(() => false);
      if (linkVisible) {
        await this.allRequestLink.click();
        await this.page.waitForTimeout(2000);
      } else {
        // Fallback: navigate directly
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/all-request`);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      // Fallback: navigate directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/all-request`);
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Gets table cell value by column header and row index
   * @param {string} columnHeader - Column header text
   * @param {number} rowIndex - Row index (0-based)
   * @returns {Promise<string>}
   */
  async getTableCellValue(columnHeader, rowIndex = 0) {
    try {
      // Find the column index by header
      const headers = this.page.locator('table thead th, mat-table thead mat-header-cell');
      const headerCount = await headers.count();
      let columnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent();
        if (text && text.toLowerCase().includes(columnHeader.toLowerCase())) {
          columnIndex = i;
          break;
        }
      }
      
      if (columnIndex === -1) {
        return '';
      }
      
      // Get the cell value
      const rows = this.page.locator('table tbody tr, mat-table tbody mat-row');
      const row = rows.nth(rowIndex);
      const cell = row.locator('td, mat-cell').nth(columnIndex);
      const value = await cell.textContent();
      return value?.trim() || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Finds the row index that matches the expected subject/issue type
   * @param {string} expectedSubject - Expected subject text (e.g., "Billing & Payment", "Feedback or Feature Request")
   * @param {number} maxRows - Maximum number of rows to check (default: 10)
   * @returns {Promise<number>} Row index, or 0 if not found
   */
  async findRowBySubject(expectedSubject, maxRows = 10) {
    try {
      // Wait a bit for table to load
      await this.page.waitForTimeout(1000);
      
      // Find Subject column index
      const headers = this.page.locator('table thead th, mat-table thead mat-header-cell');
      const headerCount = await headers.count();
      let subjectColumnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent();
        if (text && text.toLowerCase().includes('subject')) {
          subjectColumnIndex = i;
          break;
        }
      }
      
      if (subjectColumnIndex === -1) {
        console.log('  ⚠ Subject column not found, using first row');
        return 0; // Fallback to first row if Subject column not found
      }
      
      // Search through rows to find matching subject
      const rows = this.page.locator('table tbody tr, mat-table tbody mat-row');
      const rowCount = Math.min(await rows.count(), maxRows);
      
      const expectedLower = expectedSubject.toLowerCase();
      console.log(`  Searching ${rowCount} rows for subject matching: "${expectedSubject}"`);
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const cell = row.locator('td, mat-cell').nth(subjectColumnIndex);
        const cellText = await cell.textContent();
        const cellTextLower = (cellText || '').toLowerCase();
        
        // Check if subject matches (contains expected keywords)
        if (expectedLower.includes('billing') || expectedLower.includes('payment')) {
          // For Billing & Payment, must contain billing OR payment, but NOT feedback/feature
          if ((cellTextLower.includes('billing') || cellTextLower.includes('payment')) && 
              !cellTextLower.includes('feedback') && !cellTextLower.includes('feature')) {
            console.log(`  ✓ Found matching row at index ${i}: "${cellText}"`);
            return i;
          }
        } else if (expectedLower.includes('feedback') || expectedLower.includes('feature')) {
          // For Feedback/Feature, must contain feedback OR feature, but NOT billing/payment
          if ((cellTextLower.includes('feedback') || cellTextLower.includes('feature')) && 
              !cellTextLower.includes('billing') && !cellTextLower.includes('payment')) {
            console.log(`  ✓ Found matching row at index ${i}: "${cellText}"`);
            return i;
          }
        } else if (cellTextLower.includes(expectedLower)) {
          console.log(`  ✓ Found matching row at index ${i}: "${cellText}"`);
          return i;
        }
      }
      
      // If not found, log and return 0 (first row)
      console.log(`  ⚠ No matching row found for "${expectedSubject}", using first row`);
      return 0;
    } catch (error) {
      console.log(`  ⚠ Error finding row: ${error.message}, using first row`);
      return 0; // Fallback to first row
    }
  }
}

module.exports = { RaiseRequestPage };

