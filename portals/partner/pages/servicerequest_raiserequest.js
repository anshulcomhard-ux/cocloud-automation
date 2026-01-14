const { expect } = require('@playwright/test');

class ServiceRequestRaiseRequestPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Service Request → Raise Service Request
    this.serviceRequestMenuItem = page
      .locator(
        'div.dropdown-sidebar-items.dropdown-section:has(span.title:has-text("Service Request")), ' +
          'div.dropdown-section:has(span.title:has-text("Service Request")):has(i.bi-list-ol)'
      )
      .first();

    this.raiseServiceRequestMenuItem = page
      .locator(
        'li[ng-reflect-router-link="/service-request/raise-service-request"], ' +
          'div.sub-items.active-dropdown-subItems li[ng-reflect-router-link="/service-request/raise-service-request"], ' +
          'li:has-text("Raise Service Request")'
      )
      .first();

    this.subMenuContainer = page.locator(
      'div.sub-items.active-dropdown-subItems, ' + 'div.dropdown-sidebar-items.active-dropdown div.sub-items'
    ).first();

    // Breadcrumbs / sections
    this.myServiceRequestsSection = page
      .locator('div.heading-section:has(div.main-heading:has-text("My Service Requests"))')
      .first();
    this.allRequestsTab = page.locator(
      'div.sub-heading[routerlink="/service-request/all-requests"], div.sub-heading:has-text("All Requests")'
    );
    this.raiseServiceRequestTab = page.locator('div.sub-heading.sub-heading-active:has-text("Raise Service Request")');

    // Raise Request section
    this.raiseRequestHeading = page.locator(
      'div.heading-section:has(div.main-heading:has-text("Raise Request")) div.main-heading, ' +
        'div.main-heading:has-text("Raise Request")'
    );

    // Category cards
    this.categoryCards = page.locator('div.category');
    this.categoryTitles = page.locator('div.category-title');
    this.categoryDescriptions = page.locator('div.category-title + div.desc');
    this.categoryRadioInputs = page.locator('div.category input[type="radio"][name="flexRadioDefault"]');

    // Page heading for final validation
    this.pageHeading = page.locator(
      'div.heading.ps-2.fs-5:has-text("Raise Service Request"), ' +
        'div.heading:has-text("Raise Service Request"), ' +
        'h1:has-text("Raise Service Request"), ' +
        'h2:has-text("Raise Service Request")'
    ).first();

    // Technical Issue category specific locators
    this.technicalIssueCategory = page.locator('div.category').filter({
      has: page.locator('div.category-title:has-text("Technical Issue")'),
    });
    this.technicalIssueRadio = this.technicalIssueCategory.locator('input[type="radio"][name="flexRadioDefault"]');

    // Progressive form fields (appear after selecting Technical Issue)
    // Sub ID dropdown - Bootstrap dropdown button
    this.subIdDropdownButton = page.locator(
      'div.search-select:has(span:has-text("Select Sub Id")), ' +
        'div[class*="search-select"]:has(span:has-text("Select Sub Id")), ' +
        'div[type="button"][class*="search-select"]:has(span:has-text("Select Sub Id"))'
    ).first();
    this.subIdDropdownMenu = page.locator('div.dropdown-menu.show, ul.dropdown-menu.show').first();
    // Search input inside Sub Id dropdown
    this.subIdSearchInput = page
      .locator(
        'div.input-group.mb-3.px-2 input[placeholder="Search..."][aria-label="search"], ' +
          'input[placeholder="Search..."][aria-label="search"]'
      )
      .first();
    // All Sub Id options (we'll pick first visible one when needed)
    this.subIdOptions = page.locator('li.ng-star-inserted').filter({ hasText: 'SUB-' });

    // Issue Type dropdown - native select element
    this.issueTypeDropdown = page.locator('select#issueType, select[formcontrolname="issueType"], select[id="issueType"]').first();
    this.issueTypeSearchInput = page.locator('select#issueType ~ div.input-group input[placeholder*="Search"], select#issueType + div input[placeholder*="Search"]').first();
    this.issueTypeOptions = page.locator('select#issueType option.ng-star-inserted').first();

    // Issue Sub-Type dropdown - native select element
    this.issueSubTypeDropdown = page.locator('select#issueSubType, select[formcontrolname="issueSubType"], select[id="issueSubType"]').first();
    this.issueSubTypeSearchInput = page.locator('select#issueSubType ~ div.input-group input[placeholder*="Search"], select#issueSubType + div input[placeholder*="Search"]').first();
    this.issueSubTypeOptions = page.locator('select#issueSubType option.ng-star-inserted');

    // Description textarea (shared across categories, including Feedback & Feature)
    // <textarea id="description" placeholder="Type some description here..." class="ticket-desc ..."></textarea>
    this.descriptionTextArea = page
      .locator(
        'textarea#description, ' +
          'textarea[id="description"], ' +
          'textarea[placeholder="Type some description here..."], ' +
          'textarea[placeholder*="Type some description here"], ' +
      'textarea[formcontrolname="description"], ' +
        'textarea[placeholder*="Description"], ' +
        'textarea[placeholder*="description"]'
      )
      .first();

    // Billing & Payment category - image upload (specific to provided HTML)
    // <div class="drop-area mt-2"> ... <input type="file" id="fileInput" multiple hidden accept="image/*">
    this.imageUploadSection = page
      .locator(
        'div.drop-area.mt-2, ' +
          'div.drop-area:has(label[for="fileInput"]), ' +
          'div.upload-instructions:has-text("Drag & drop files here")'
      )
      .first();
    this.imageUploadInput = page
      .locator('input#fileInput[type="file"][accept*="image/"], input#fileInput[type="file"]')
      .first();
    // Image upload text locator
    this.imageUploadText = page.locator(
      'div:has-text("Drag & drop files here"), ' +
        'div:has-text("browse"), ' +
        'div:has-text("paste"), ' +
        'div:has-text("Ctrl+V"), ' +
        '*:has-text("Drag & drop files here, or browse or paste (Ctrl+V)")'
    ).first();
    // Uploaded image preview/filename locator
    this.uploadedImagePreview = page
      .locator(
        'img[src*="blob"], ' +
          'img[src*="data:"], ' +
          'div[class*="preview"], ' +
          'div[class*="image-preview"], ' +
          'span[class*="filename"], ' +
          'div:has-text(".jpg"), ' +
          'div:has-text(".png"), ' +
          'div:has-text(".jpeg")'
      )
      .first();

    // Toast container (for duplicate request / error messages)
    this.toastContainer = page
      .locator('div#toast-container, div.toast-container, div[class*="toast-container"]')
      .first();

    // Cancel button
    this.cancelButton = page
      .locator(
        'button.btn.reset-btn.mx-3:has-text("Cancel"), ' +
          'button.btn.reset-btn:has-text("Cancel"), ' +
          'button[type="button"]:has-text("Cancel")'
      )
      .first();

    this.submitButton = page
      .locator('button[type="submit"]:has-text("Submit"), button.btn:has-text("Submit")')
      .first();
  }

  /**
   * Navigates directly to Raise Service Request page via sidebar menu.
   */
  async navigateToRaiseServiceRequest() {
    await this.page.waitForTimeout(1000);
    await this.serviceRequestMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.serviceRequestMenuItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    await this.serviceRequestMenuItem.click();
    await this.page.waitForTimeout(800);

    // Ensure submenu visible (allow more time)
    try {
      await this.subMenuContainer.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // ignore
    }

    // Click Raise Service Request submenu
    const targets = [
      this.raiseServiceRequestMenuItem,
      this.page.locator('div.sub-items.active-dropdown-subItems li[ng-reflect-router-link*="raise"]').first(),
      this.page.locator('div.sub-items.active-dropdown-subItems li:has-text("Raise Service Request")').first(),
      this.page.locator('li[ng-reflect-router-link*="raise-service"]').first(),
    ];

    let clicked = false;
    for (const target of targets) {
      try {
        await target.waitFor({ state: 'visible', timeout: 5000 });
        await target.scrollIntoViewIfNeeded();
        await target.click();
        clicked = true;
        break;
      } catch {
        // try next
      }
    }

    if (!clicked) {
      // last resort: broader getByText in sidebar
      const sidebar = this.page.locator('div.dropdown-sidebar-items, div.dropdown-section').first();
      const textLocator = sidebar.getByText('Raise Service Request', { exact: false }).first();
      await textLocator.waitFor({ state: 'visible', timeout: 5000 });
      await textLocator.scrollIntoViewIfNeeded();
      await textLocator.click();
    }

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verifies Raise Service Request page is visible
   * @returns {Promise<boolean>}
   */
  async isRaiseServiceRequestPageVisible() {
    await this.page.waitForTimeout(1000);
    const headingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
    const url = this.page.url();
    const urlMatches =
      url.includes('/service-request/raise-service-request') ||
      url.includes('/service-request/raise-request') ||
      url.includes('/service-request/raise-service');
    return headingVisible || urlMatches;
  }

  /**
   * Returns category info list
   * @returns {Promise<Array<{title: string, description: string, selected: boolean}>>}
   */
  async getCategoryInfo() {
    return this.page.evaluate(() => {
      const cards = document.querySelectorAll('div.category');
      const results = [];
      for (const card of cards) {
        const title = card.querySelector('div.category-title')?.textContent?.trim() || '';
        const description = card.querySelector('div.desc')?.textContent?.trim() || '';
        const radio = card.querySelector('input[type="radio"][name="flexRadioDefault"]');
        const selected = !!(radio && radio.checked);
        if (title) {
          results.push({ title, description, selected });
        }
      }
      return results;
    });
  }

  /**
   * Returns whether any category is selected
   */
  async isAnyCategorySelected() {
    const info = await this.getCategoryInfo();
    return info.some((c) => c.selected);
  }

  /**
   * Selects a category by clicking its card
   * @param {string} title
   */
  async selectCategoryByTitle(title) {
    const card = this.page.locator('div.category').filter({ has: this.page.locator(`div.category-title:has-text("${title}")`) }).first();
    await card.waitFor({ state: 'visible', timeout: 5000 });
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Verifies only one radio is selected
   * @returns {Promise<boolean>}
   */
  async verifyOnlyOneSelected() {
    const info = await this.getCategoryInfo();
    const selected = info.filter((c) => c.selected);
    return selected.length === 1;
  }

  /**
   * Checks for console errors collected
   * @param {Array} consoleErrors
   */
  async hasConsoleErrors(consoleErrors) {
    return consoleErrors.length > 0;
  }

  /**
   * Checks if Sub ID dropdown is visible
   * @returns {Promise<boolean>}
   */
  async isSubIdDropdownVisible() {
    try {
      // Use page.evaluate to check DOM directly
      const result = await this.page.evaluate(() => {
        // Check for search-select button with "Select Sub Id"
        const button = Array.from(document.querySelectorAll('div.search-select, div[class*="search-select"]')).find(
          (el) => el.textContent?.includes('Select Sub Id') || el.textContent?.includes('Sub Id')
        );
        if (button && button.offsetParent !== null) return true;
        
        // Check for ng-select with formcontrolname="subId"
        const ngSelect = document.querySelector('ng-select[formcontrolname="subId"]');
        if (ngSelect && ngSelect.offsetParent !== null) return true;
        
        // Check for select with formcontrolname="subId"
        const select = document.querySelector('select[formcontrolname="subId"]');
        if (select && select.offsetParent !== null) return true;
        
        return false;
      });
      
      if (result) return true;
      
      // Fallback to locator approach
      const locators = [
        this.subIdDropdownButton,
        this.page.locator('ng-select[formcontrolname="subId"]').first(),
        this.page.locator('select[formcontrolname="subId"]').first(),
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) return true;
        } catch {
          continue;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Sub ID dropdown button to open it
   */
  async clickSubIdDropdown() {
    await this.subIdDropdownButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.subIdDropdownButton.scrollIntoViewIfNeeded();
    await this.subIdDropdownButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Searches for a Sub ID in the search input
   * @param {string} subId - The Sub ID to search for (e.g., "SUB-02801")
   */
  async searchSubId(subId) {
    await this.subIdSearchInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.subIdSearchInput.fill(subId);
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects a Sub ID from the dropdown
   * @param {string} subId - The Sub ID to select (e.g., "SUB-02801"). If not provided, selects first option
   */
  async selectSubId(subId = null) {
    // Click the dropdown button to open it
    await this.clickSubIdDropdown();
    
    // Wait for dropdown menu to appear
    await this.page.waitForTimeout(500);
    
    if (subId) {
      // Search for the specific Sub ID
      await this.searchSubId(subId);

      // Wait for options to filter
      await this.page.waitForTimeout(500);

      // Select the option with the matching text
      const option = this.page.locator(`li:has-text("${subId}"), li.ng-star-inserted:has-text("${subId}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.scrollIntoViewIfNeeded();
      await option.click();
    } else {
      // Select first visible Sub Id option
      const options = this.subIdOptions;
      const count = await options.count();
      let clicked = false;
      for (let i = 0; i < count; i++) {
        const opt = options.nth(i);
        if (await opt.isVisible().catch(() => false)) {
          await opt.scrollIntoViewIfNeeded().catch(() => {});
          await opt.click();
          clicked = true;
          break;
        }
      }
      if (!clicked) {
        throw new Error('No visible Sub Id options found to select');
      }
    }
    
    await this.page.waitForTimeout(500);
  }

  /**
   * Gets the currently selected Sub Id text from the dropdown button
   * @returns {Promise<string>}
   */
  async getSelectedSubIdText() {
    try {
      // Read directly from DOM instead of relying on the "Select Sub Id" text (which changes after selection)
      const textFromDom = await this.page.evaluate(() => {
        const containerCandidates = Array.from(
          document.querySelectorAll('div.search-select, div[class*="search-select"]'),
        );
        if (!containerCandidates.length) return '';

        // Prefer a container that currently shows a concrete Sub Id (text containing "SUB-")
        let container =
          containerCandidates.find((el) => (el.textContent || '').includes('SUB-')) ||
          containerCandidates[0];

        // Try span elements inside the container first
        const spanWithSubId = Array.from(container.querySelectorAll('span')).find((span) =>
          (span.textContent || '').includes('SUB-'),
        );
        if (spanWithSubId) {
          return (spanWithSubId.textContent || '').trim();
        }

        const anySpan = container.querySelector('span');
        if (anySpan && anySpan.textContent) {
          return anySpan.textContent.trim();
        }

        // Fallback to container text itself
        return (container.textContent || '').trim();
      });
      return textFromDom || '';
    } catch {
      return '';
    }
  }

  /**
   * Checks if Issue Type dropdown is visible
   * @returns {Promise<boolean>}
   */
  async isIssueTypeDropdownVisible() {
    try {
      // Use page.evaluate to check DOM directly
      const result = await this.page.evaluate(() => {
        // Check for select with id="issueType"
        const select = document.querySelector('select#issueType, select[id="issueType"]');
        if (select && select.offsetParent !== null) return true;
        
        // Check for select with formcontrolname="issueType"
        const selectByName = document.querySelector('select[formcontrolname="issueType"]');
        if (selectByName && selectByName.offsetParent !== null) return true;
        
        return false;
      });
      
      if (result) return true;
      
      // Fallback to locator approach
      const locators = [
        this.issueTypeDropdown,
        this.page.locator('select#issueType').first(),
        this.page.locator('select[formcontrolname="issueType"]').first(),
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) return true;
        } catch {
          continue;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Checks if Issue Sub Type dropdown is visible
   * @returns {Promise<boolean>}
   */
  async isIssueSubTypeDropdownVisible() {
    try {
      // Use page.evaluate to check DOM directly
      const result = await this.page.evaluate(() => {
        // Check for select with id="issueSubType"
        const select = document.querySelector('select#issueSubType, select[id="issueSubType"]');
        if (select && select.offsetParent !== null) return true;
        
        // Check for select with formcontrolname="issueSubType"
        const selectByName = document.querySelector('select[formcontrolname="issueSubType"]');
        if (selectByName && selectByName.offsetParent !== null) return true;
        
        return false;
      });
      
      if (result) return true;
      
      // Fallback to locator approach
      const locators = [
        this.issueSubTypeDropdown,
        this.page.locator('select#issueSubType').first(),
        this.page.locator('select[formcontrolname="issueSubType"]').first(),
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) return true;
        } catch {
          continue;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Checks if Description textarea is visible
   * @returns {Promise<boolean>}
   */
  async isDescriptionVisible() {
    try {
      // Use page.evaluate to check DOM directly
      const result = await this.page.evaluate(() => {
        // Prefer explicit description textarea by id / placeholder
        const explicit =
          document.querySelector('textarea#description') ||
          document.querySelector('textarea[id="description"]') ||
          document.querySelector('textarea[placeholder="Type some description here..."]');
        if (explicit && explicit.offsetParent !== null) return true;

        // Check for textarea with formcontrolname="description"
        const textarea = document.querySelector('textarea[formcontrolname="description"]');
        if (textarea && textarea.offsetParent !== null) return true;
        
        // Fallback: any visible textarea
        const anyTextarea = Array.from(document.querySelectorAll('textarea')).find(
          (el) => el.offsetParent !== null,
        );
        if (anyTextarea) return true;
        
        return false;
      });
      
      if (result) return true;
      
      // Fallback to locator approach
      const locators = [
        this.page.locator('textarea#description').first(),
        this.page.locator('textarea[id="description"]').first(),
        this.page.locator('textarea[placeholder="Type some description here..."]').first(),
        this.page.locator('textarea[formcontrolname="description"]').first(),
        this.page.locator('textarea[placeholder*="Description"]').first(),
        this.page.locator('textarea[placeholder*="description"]').first(),
        this.page.locator('textarea').first(),
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) return true;
        } catch {
          continue;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Checks if Image Upload section is visible
   * @returns {Promise<boolean>}
   */
  async isImageUploadVisible() {
    try {
      // Use page.evaluate to check DOM directly
      const result = await this.page.evaluate(() => {
        // Prefer the specific Billing & Payment upload input
        const fileInput =
          document.querySelector('input#fileInput[type="file"][accept*="image/"]') ||
          document.querySelector('input#fileInput[type="file"]');
        if (fileInput && fileInput.offsetParent !== null) return true;
        
        // Check for upload/image related divs
        const uploadDivs = Array.from(document.querySelectorAll('div')).find(
          (div) =>
            (div.className && (div.className.includes('upload') || div.className.includes('image'))) ||
            div.textContent?.includes('Upload') ||
            div.textContent?.includes('Image')
        );
        if (uploadDivs && uploadDivs.offsetParent !== null) return true;
        
        return false;
      });
      
      if (result) return true;
      
      // Fallback to locator approach
      const locators = [
        this.page.locator('input[type="file"]').first(),
        this.page.locator('div[class*="upload"]').first(),
        this.page.locator('div[class*="image"]').first(),
      ];
      
      for (const locator of locators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) return true;
        } catch {
          continue;
        }
      }
      return false;
    } catch {
      return false;
    }
  }


  /**
   * Selects an Issue Type from the dropdown
   * @param {string} issueType - The Issue Type to select (optional, if not provided selects first option)
   */
  async selectIssueType(issueType = null) {
    await this.issueTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
    await this.issueTypeDropdown.scrollIntoViewIfNeeded();
    
    if (issueType) {
      // Select specific issue type by text
      await this.issueTypeDropdown.selectOption({ label: issueType });
    } else {
      // Select first available option (skip the disabled "Select issue type" option)
      const options = await this.page.evaluate(() => {
        const select = document.querySelector('select#issueType');
        if (!select) return [];
        const opts = Array.from(select.options);
        return opts
          .filter(opt => opt.value && !opt.disabled && opt.textContent?.trim())
          .map(opt => ({ value: opt.value, text: opt.textContent?.trim() }));
      });
      
      if (options.length > 0) {
        await this.issueTypeDropdown.selectOption(options[0].value);
      } else {
        // Fallback: select first option with value
        await this.issueTypeDropdown.selectOption({ index: 1 }); // Skip index 0 (disabled option)
      }
    }
    
    await this.page.waitForTimeout(500);
  }

  /**
   * Changes Issue Type to a different option than currently selected (if available)
   * @returns {Promise<boolean>} true if changed, false if only one option available
   */
  async changeIssueTypeToDifferent() {
    try {
      await this.issueTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.issueTypeDropdown.scrollIntoViewIfNeeded();

      const changed = await this.page.evaluate(() => {
        const select =
          document.querySelector('select#issueType') ||
          document.querySelector('select[id="issueType"]') ||
          document.querySelector('select[formcontrolname="issueType"]');
        if (!select) return false;

        const currentValue = select.value;
        const candidates = Array.from(select.options).filter(
          (opt) =>
            opt.value &&
            !opt.disabled &&
            opt.value !== currentValue &&
            (opt.textContent || '').trim().length > 0,
        );

        if (candidates.length === 0) {
          return false;
        }

        const next = candidates[0];
        select.value = next.value;
        const evt = new Event('change', { bubbles: true });
        select.dispatchEvent(evt);
        return true;
      });

      await this.page.waitForTimeout(800);
      return changed;
    } catch {
      return false;
    }
  }

  /**
   * Selects an Issue Sub Type from the dropdown
   * @param {string} issueSubType - The Issue Sub Type to select (optional, if not provided selects first option)
   */
  async selectIssueSubType(issueSubType = null) {
    await this.issueSubTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
    await this.issueSubTypeDropdown.scrollIntoViewIfNeeded();
    
    if (issueSubType) {
      // Select specific issue sub type by text
      await this.issueSubTypeDropdown.selectOption({ label: issueSubType });
    } else {
      // Select first available option (skip the disabled "Select issue sub-type" option)
      const options = await this.page.evaluate(() => {
        const select = document.querySelector('select#issueSubType');
        if (!select) return [];
        const opts = Array.from(select.options);
        return opts
          .filter(opt => opt.value && !opt.disabled && opt.textContent?.trim())
          .map(opt => ({ value: opt.value, text: opt.textContent?.trim() }));
      });
      
      if (options.length > 0) {
        await this.issueSubTypeDropdown.selectOption(options[0].value);
      } else {
        // Fallback: select first option with value
        await this.issueSubTypeDropdown.selectOption({ index: 1 }); // Skip index 0 (disabled option)
      }
    }
    
    await this.page.waitForTimeout(500);
  }

  /**
   * Returns whether a concrete Issue Sub-Type is currently selected (non-default)
   * @returns {Promise<boolean>}
   */
  async isIssueSubTypeSelected() {
    try {
      const selected = await this.page.evaluate(() => {
        const select =
          document.querySelector('select#issueSubType') ||
          document.querySelector('select[id="issueSubType"]') ||
          document.querySelector('select[formcontrolname="issueSubType"]');
        if (!select) return false;

        const selectedOption = select.options[select.selectedIndex];
        if (!selectedOption) return false;

        const value = (selectedOption.value || '').trim();
        const text = (selectedOption.textContent || '').trim().toLowerCase();

        // Treat empty value or placeholder like "select" as not selected
        if (!value) return false;
        if (text.startsWith('select')) return false;

        return true;
      });
      return !!selected;
    } catch {
      return false;
    }
  }

  /**
   * Gets latest toast text from toast container, if any
   * @returns {Promise<string>}
   */
  async getLatestToastText() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Use page.evaluate to search for toast messages with multiple strategies
      const toastText = await this.page.evaluate(() => {
        // Strategy 1: Look for toast-container and get all visible toast divs
        const toastContainer = document.querySelector('div#toast-container, div.toast-container, div[class*="toast-container"]');
        if (toastContainer) {
          // Get all direct child divs
          const toastDivs = Array.from(toastContainer.children).filter(child => 
            child.tagName === 'DIV' && 
            child.offsetParent !== null && // visible
            (child.textContent || '').trim().length > 0
          );
          
          if (toastDivs.length > 0) {
            // Return the last (most recent) toast text
            const latestToast = toastDivs[toastDivs.length - 1];
            return (latestToast.textContent || '').trim();
          }
          
          // Also try to find toast messages in nested structures
          const nestedToasts = toastContainer.querySelectorAll('div[role="alert"], div.toast-message, div.toast, div[class*="toast"]');
          for (let i = nestedToasts.length - 1; i >= 0; i--) {
            const toast = nestedToasts[i];
            if (toast.offsetParent !== null) {
              const text = (toast.textContent || '').trim();
              if (text) return text;
            }
          }
        }
        
        // Strategy 2: Search entire document for toast-like elements with the expected text pattern
        const allDivs = Array.from(document.querySelectorAll('div'));
        for (let i = allDivs.length - 1; i >= 0; i--) {
          const div = allDivs[i];
          const text = (div.textContent || '').trim();
          // Look for toast messages containing keywords like "already open", "ticket ID", etc.
          if (
            text && 
            div.offsetParent !== null &&
            (text.includes('already open') || 
             text.includes('ticket ID') || 
             text.includes('received your request') ||
             text.includes('Your request'))
          ) {
            // Make sure it's not inside a modal or form
            const isInModal = div.closest('div.modal, div.modal-section, div[class*="modal"]');
            if (!isInModal) {
              return text;
            }
          }
        }
        
        return '';
      });
      
      return toastText || '';
    } catch (error) {
      console.log('⚠ Error getting toast text:', error.message);
      return '';
    }
  }

  /**
   * Checks if a duplicate / same request toast is visible
   * @returns {Promise<boolean>}
   */
  async isDuplicateRequestToastVisible() {
    try {
      await this.page.waitForTimeout(1000);
      const text = (await this.getLatestToastText()).toLowerCase();
      if (!text) return false;

      // Heuristics for duplicate/same-request messages
      const keywords = ['already', 'duplicate', 'same request', 'exists', 'existing'];
      return keywords.some((k) => text.includes(k));
    } catch {
      return false;
    }
  }

  /**
   * Fills the Description textarea
   * @param {string} description - The description text
   */
  async fillDescription(description) {
    await this.descriptionTextArea.waitFor({ state: 'visible', timeout: 5000 });
    await this.descriptionTextArea.scrollIntoViewIfNeeded();
    await this.descriptionTextArea.fill(description);
    await this.page.waitForTimeout(300);
  }

  /**
   * Uploads an image file
   * @param {string} filePath - Path to the image file (can also be an array for multiple files)
   */
  async uploadImage(filePath) {
    // Some file inputs are hidden; we don't require visibility, only attachment
    try {
      // Try clicking the visible upload section to ensure input is in DOM
      await this.imageUploadSection.scrollIntoViewIfNeeded().catch(() => {});
      await this.imageUploadSection.click({ force: true }).catch(() => {});

    // Wait for the input to be attached (it may remain hidden)
      await this.imageUploadInput.waitFor({ state: 'attached', timeout: 7000 });

      // Set files even if input is hidden (Playwright supports this) – uses the specific #fileInput control
    await this.imageUploadInput.setInputFiles(filePath);
    await this.page.waitForTimeout(1000); // Wait for upload to process
    } catch (error) {
      console.log('⚠ Error during image upload:', error.message);
      throw error;
    }
  }

  /**
   * Uploads multiple image files at once
   * @param {Array<string>} filePaths - Array of paths to image files
   */
  async uploadMultipleImages(filePaths) {
    try {
      await this.imageUploadSection.scrollIntoViewIfNeeded().catch(() => {});
      await this.imageUploadSection.click({ force: true }).catch(() => {});

      await this.imageUploadInput.waitFor({ state: 'attached', timeout: 7000 });

      // Upload all files at once
      await this.imageUploadInput.setInputFiles(filePaths);
      await this.page.waitForTimeout(2000); // Wait for all uploads to process
    } catch (error) {
      console.log('⚠ Error during multiple image upload:', error.message);
      throw error;
    }
  }

  /**
   * Uploads an image using drag and drop method
   * @param {string} filePath - Path to the image file
   */
  async uploadImageViaDragAndDrop(filePath) {
    try {
      await this.imageUploadSection.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Wait for the input to be attached
      await this.imageUploadInput.waitFor({ state: 'attached', timeout: 7000 });
      
      // Simulate drag and drop by creating a DataTransfer and dispatching drop event
      await this.page.evaluate(({ filePath }) => {
        return new Promise((resolve, reject) => {
          const input = document.querySelector('input#fileInput[type="file"]');
          if (!input) {
            reject(new Error('File input not found'));
            return;
          }
          
          // Create a File object from the path (this is a simplified approach)
          // In a real browser, we'd need to use FileReader or similar
          const file = new File([''], filePath.split(/[/\\]/).pop(), { type: 'image/png' });
          
          // Create DataTransfer object
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          
          // Dispatch dragenter, dragover, and drop events
          const dropArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]') || input.closest('div');
          if (dropArea) {
            const dragEnterEvent = new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer });
            const dragOverEvent = new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer });
            const dropEvent = new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer });
            
            dropArea.dispatchEvent(dragEnterEvent);
            dropArea.dispatchEvent(dragOverEvent);
            dropArea.dispatchEvent(dropEvent);
          }
          
          // Also try setting files directly on input (fallback)
          if (input.files) {
            const fileList = dataTransfer.files;
            Object.defineProperty(input, 'files', { value: fileList, writable: false });
            const changeEvent = new Event('change', { bubbles: true });
            input.dispatchEvent(changeEvent);
          }
          
          resolve();
        });
      }, { filePath });
      
      // Fallback: Use setInputFiles as it's more reliable
      await this.imageUploadInput.setInputFiles(filePath);
      await this.page.waitForTimeout(2000); // Wait for upload to process
    } catch (error) {
      console.log('⚠ Error during drag and drop upload, using fallback:', error.message);
      // Fallback to regular upload if drag and drop fails
      await this.uploadImage(filePath);
    }
  }

  /**
   * Uploads an image using browse method (clicking to open file picker)
   * @param {string} filePath - Path to the image file
   */
  async uploadImageViaBrowse(filePath) {
    try {
      // Click the upload section to trigger file picker
      await this.imageUploadSection.scrollIntoViewIfNeeded();
      await this.imageUploadSection.click({ force: true });
      await this.page.waitForTimeout(500);
      
      // Wait for the input to be attached
      await this.imageUploadInput.waitFor({ state: 'attached', timeout: 7000 });
      
      // Set files using the file input (this simulates browsing and selecting)
      await this.imageUploadInput.setInputFiles(filePath);
      await this.page.waitForTimeout(2000); // Wait for upload to process
    } catch (error) {
      console.log('⚠ Error during browse upload:', error.message);
      throw error;
    }
  }

  /**
   * Uploads an image using Ctrl+V (paste) method
   * @param {string} filePath - Path to the image file
   */
  async uploadImageViaPaste(filePath) {
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Read the file as a buffer
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      
      // Focus on the upload section or page
      await this.imageUploadSection.scrollIntoViewIfNeeded();
      await this.imageUploadSection.click({ force: true });
      await this.page.waitForTimeout(300);
      
      // Create a ClipboardItem with the file and write to clipboard
      await this.page.evaluate(async ({ fileBuffer, fileName }) => {
        try {
          const file = new File([new Uint8Array(fileBuffer)], fileName, { type: 'image/png' });
          const clipboardItem = new ClipboardItem({ 'image/png': file });
          await navigator.clipboard.write([clipboardItem]);
          return true;
        } catch (error) {
          console.log('Clipboard write error:', error);
          return false;
        }
      }, { fileBuffer: Array.from(fileBuffer), fileName });
      
      // Wait a bit for clipboard to be ready
      await this.page.waitForTimeout(500);
      
      // Focus on the upload area and simulate Ctrl+V keypress
      await this.imageUploadSection.focus();
      await this.page.keyboard.press('Control+v');
      await this.page.waitForTimeout(2000); // Wait for paste to process
      
      // Check if paste worked, if not use fallback
      const pasteWorked = await this.page.evaluate(() => {
        const fileInput = document.querySelector('input#fileInput[type="file"]');
        return fileInput && fileInput.files && fileInput.files.length > 0;
      });
      
      if (!pasteWorked) {
        console.log('  ⚠ Paste method may not have worked, using fallback...');
        // Fallback: try setting file directly to input
        await this.imageUploadInput.waitFor({ state: 'attached', timeout: 5000 });
        await this.imageUploadInput.setInputFiles(filePath);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      console.log('⚠ Error during paste upload, using fallback:', error.message);
      // Fallback: try setting file directly to input if paste doesn't work
      try {
        await this.imageUploadInput.waitFor({ state: 'attached', timeout: 5000 });
        await this.imageUploadInput.setInputFiles(filePath);
        await this.page.waitForTimeout(2000);
      } catch (fallbackError) {
        console.log('⚠ Fallback upload also failed:', fallbackError.message);
        throw error;
      }
    }
  }

  /**
   * Verifies image upload section text is visible
   * @param {string} expectedText - Expected text (default: "Drag & drop files here, or browse or paste (Ctrl+V)")
   * @returns {Promise<boolean>}
   */
  async verifyImageUploadText(expectedText = 'Drag & drop files here, or browse or paste (Ctrl+V)') {
    try {
      // Use page.evaluate to check for the text
      const result = await this.page.evaluate((text) => {
        const bodyText = document.body.textContent || '';
        return bodyText.includes('Drag & drop') || bodyText.includes('browse') || bodyText.includes('paste');
      }, expectedText);
      
      if (result) return true;
      
      // Try locator approach
      const isVisible = await this.imageUploadText.isVisible({ timeout: 3000 }).catch(() => false);
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Checks if file size error message is visible (for files > 500KB)
   * @returns {Promise<boolean>}
   */
  async isFileSizeErrorVisible() {
    try {
      // Check for file size error messages in various locations
      const errorTexts = await this.page.evaluate(() => {
        const bodyText = document.body.textContent || '';
        const errorMessages = [
          '500 KB',
          'under 500 KB',
          'must be under 500',
          'exceeds 500',
          'maximum file size',
          'file size limit',
          'too large',
          'larger than',
        ];
        
        // Check if any error message keywords are present
        const hasError = errorMessages.some(msg => 
          bodyText.toLowerCase().includes(msg.toLowerCase())
        );
        
        if (!hasError) return false;
        
        // Check for error message in upload area specifically
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]');
        if (uploadArea) {
          const uploadText = (uploadArea.textContent || '').toLowerCase();
          return errorMessages.some(msg => uploadText.includes(msg.toLowerCase()));
        }
        
        // Check for error message near file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          const parent = fileInput.closest('div');
          if (parent) {
            const parentText = (parent.textContent || '').toLowerCase();
            return errorMessages.some(msg => parentText.includes(msg.toLowerCase()));
          }
        }
        
        return false;
      });
      
      return errorTexts || false;
    } catch {
      return false;
    }
  }

  /**
   * Gets file size error message text if visible
   * @returns {Promise<string>}
   */
  async getFileSizeErrorText() {
    try {
      const errorText = await this.page.evaluate(() => {
        // Look for error messages containing file size keywords
        const errorMessages = [
          '500 KB',
          'under 500 KB',
          'must be under 500',
          'exceeds 500',
          'maximum file size',
          'file size limit',
        ];
        
        // Check upload area first
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]');
        if (uploadArea) {
          const text = uploadArea.textContent || '';
          for (const msg of errorMessages) {
            if (text.toLowerCase().includes(msg.toLowerCase())) {
              // Try to find the specific error text
              const errorDivs = uploadArea.querySelectorAll('div, span, p');
              for (const div of errorDivs) {
                const divText = (div.textContent || '').trim();
                if (divText && errorMessages.some(m => divText.toLowerCase().includes(m.toLowerCase()))) {
                  return divText;
                }
              }
              return text;
            }
          }
        }
        
        // Check for error messages in toast
        const toastContainer = document.querySelector('div#toast-container, div.toast-container');
        if (toastContainer) {
          const toastText = (toastContainer.textContent || '').trim();
          if (errorMessages.some(msg => toastText.toLowerCase().includes(msg.toLowerCase()))) {
            return toastText;
          }
        }
        
        return '';
      });
      
      return errorText || '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies uploaded image preview or filename is visible
   * Specifically checks within the upload area to avoid false positives
   * @returns {Promise<boolean>}
   */
  async isUploadedImagePreviewVisible() {
    try {
      // Use page.evaluate to check for image preview within the upload area
      const result = await this.page.evaluate(() => {
        // First, find the upload area (drop-area or file input container)
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]') ||
                           document.querySelector('input#fileInput')?.closest('div');
        
        if (!uploadArea) {
          // If no upload area found, check for any image preview
        const images = Array.from(document.querySelectorAll('img'));
          return images.some(img => 
            (img.src?.includes('blob:') || img.src?.startsWith('data:')) &&
          img.offsetParent !== null
        );
        }
        
        // Check for image elements with blob or data URLs within the upload area
        const imagesInArea = Array.from(uploadArea.querySelectorAll('img'));
        const hasImagePreview = imagesInArea.some(img => 
          (img.src?.includes('blob:') || img.src?.startsWith('data:')) &&
          img.offsetParent !== null
        );
        
        if (hasImagePreview) return true;
        
        // Check for filename or preview divs within the upload area
        const previewDivs = Array.from(uploadArea.querySelectorAll('div, span')).find(el => {
          const text = (el.textContent || '').trim();
          const className = (el.className || '').toLowerCase();
          
          // Look for file extensions in text (but not in the instruction text)
          const hasFileExtension = /\.(jpg|jpeg|png|gif|bmp|webp)/i.test(text) && 
                                   !text.includes('Drag & drop') && 
                                   !text.includes('browse') &&
                                   !text.includes('paste');
          
          // Look for preview-related class names
          const hasPreviewClass = className.includes('preview') || 
                                 className.includes('image-preview') ||
                                 className.includes('uploaded') ||
                                 className.includes('filename');
        
          return (hasFileExtension || hasPreviewClass) && el.offsetParent !== null;
        });
        
        return !!previewDivs;
      });
      
      if (result) return true;
      
      // Try locator approach as fallback
      const isVisible = await this.uploadedImagePreview.isVisible({ timeout: 3000 }).catch(() => false);
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Checks if Submit button is enabled
   * @returns {Promise<boolean>}
   */
  async isSubmitButtonEnabled() {
    try {
      const button = this.submitButton.first();
      await button.waitFor({ state: 'visible', timeout: 3000 });
      const isEnabled = await button.isEnabled();
      return isEnabled;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Cancel button on the Raise Request form
   */
  async clickCancelButton() {
    try {
      const button = this.cancelButton.first();
      await button.waitFor({ state: 'visible', timeout: 5000 });
      await button.scrollIntoViewIfNeeded();
      await button.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log('⚠ Error clicking Cancel button:', error.message);
      throw error;
    }
  }

  /**
   * Gets the current URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Returns whether any category with the given title is selected
   * @param {string} title
   * @returns {Promise<boolean>}
   */
  async isCategorySelected(title) {
    const info = await this.getCategoryInfo();
    const match = info.find((c) => c.title.toLowerCase() === title.toLowerCase());
    return !!(match && match.selected);
  }

  /**
   * Reloads the page and waits for Raise Service Request page to be visible again
   */
  async refreshPageAndWait() {
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.page.waitForTimeout(1500);
  }

  /**
   * Counts the number of uploaded image previews in the upload area
   * @returns {Promise<number>}
   */
  async countImagePreviews() {
    try {
      const count = await this.page.evaluate(() => {
        // Strategy 1: Count all img elements with blob/data URLs (most reliable)
        const allImages = Array.from(document.querySelectorAll('img'));
        const blobDataImages = allImages.filter(img => {
          const src = img.src || '';
          return (src.includes('blob:') || src.startsWith('data:image')) && img.offsetParent !== null;
        });
        
        if (blobDataImages.length > 0) {
          return blobDataImages.length;
        }
        
        // Strategy 2: Find upload area and count previews within it
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]') ||
                           document.querySelector('input#fileInput')?.closest('div');
        
        if (uploadArea) {
          // Count images within upload area
          const imagesInArea = Array.from(uploadArea.querySelectorAll('img'));
          const imagePreviews = imagesInArea.filter(img => {
            const src = img.src || '';
            return (src.includes('blob:') || src.startsWith('data:image')) && img.offsetParent !== null;
          });
          
          if (imagePreviews.length > 0) {
            return imagePreviews.length;
          }
          
          // Count preview containers (divs/spans with file-related content)
          const previewContainers = Array.from(uploadArea.querySelectorAll('div, span, li')).filter(el => {
            if (el.offsetParent === null) return false;
            
            const text = (el.textContent || '').trim();
            const className = (el.className || '').toLowerCase();
            const id = (el.id || '').toLowerCase();
            
            // Skip instruction text
            if (text.includes('Drag & drop') || text.includes('browse') || text.includes('paste') || text.includes('Ctrl+V')) {
              return false;
            }
            
            // Look for file extensions in text
            const hasFileExtension = /\.(jpg|jpeg|png|gif|bmp|webp)/i.test(text);
            
            // Look for preview-related class names or IDs
            const hasPreviewIndicator = 
              className.includes('preview') || 
              className.includes('image-preview') ||
              className.includes('uploaded') ||
              className.includes('filename') ||
              className.includes('file-item') ||
              id.includes('preview') ||
              id.includes('uploaded');
            
            return (hasFileExtension || hasPreviewIndicator) && text.length > 0;
          });
          
          if (previewContainers.length > 0) {
            return previewContainers.length;
          }
        }
        
        // Strategy 3: Look for file list containers (common patterns)
        const fileListContainers = [
          document.querySelector('ul[class*="file"]'),
          document.querySelector('div[class*="file-list"]'),
          document.querySelector('div[class*="uploaded-files"]'),
          document.querySelector('div[class*="image-list"]'),
        ].filter(Boolean);
        
        for (const container of fileListContainers) {
          const children = container.querySelectorAll('li, div, span');
          if (children.length > 0) {
            return children.length;
          }
        }
        
        // Strategy 4: Count elements with background-image (blob/data URLs)
        const elementsWithBgImage = Array.from(document.querySelectorAll('div, span')).filter(el => {
          const bgImage = window.getComputedStyle(el).backgroundImage || '';
          return (bgImage.includes('blob:') || bgImage.includes('data:image')) && el.offsetParent !== null;
        });
        
        if (elementsWithBgImage.length > 0) {
          return elementsWithBgImage.length;
        }
        
        return 0;
      });
      
      return count || 0;
    } catch (error) {
      console.log('⚠ Error counting image previews:', error.message);
      return 0;
    }
  }

  /**
   * Checks if image limit error toast is visible (e.g., "cannot upload more than 3 images")
   * @returns {Promise<boolean>}
   */
  async isImageLimitErrorVisible() {
    try {
      await this.page.waitForTimeout(1000);
      
      const errorVisible = await this.page.evaluate(() => {
        const bodyText = (document.body.textContent || '').toLowerCase();
        const errorKeywords = [
          'cannot upload more than 3',
          'maximum 3 images',
          'limit of 3 images',
          'only 3 images',
          '3 images allowed',
          'exceeded 3 images',
          'maximum 3 files',
        ];
        
        // Check if any error keyword is present
        const hasErrorKeyword = errorKeywords.some(keyword => 
          bodyText.includes(keyword.toLowerCase())
        );
        
        if (!hasErrorKeyword) return false;
        
        // Check for error message in toast container
        const toastContainer = document.querySelector('div#toast-container, div.toast-container, div[class*="toast-container"]');
        if (toastContainer) {
          const toastText = (toastContainer.textContent || '').toLowerCase();
          return errorKeywords.some(keyword => toastText.includes(keyword.toLowerCase()));
        }
        
        // Check for error message in upload area
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]');
        if (uploadArea) {
          const uploadText = (uploadArea.textContent || '').toLowerCase();
          return errorKeywords.some(keyword => uploadText.includes(keyword.toLowerCase()));
        }
        
        return false;
      });
      
      return errorVisible || false;
    } catch {
      return false;
    }
  }

  /**
   * Gets image limit error message text if visible
   * @returns {Promise<string>}
   */
  async getImageLimitErrorText() {
    try {
      await this.page.waitForTimeout(1000);
      
      const errorText = await this.page.evaluate(() => {
        const errorKeywords = [
          'cannot upload more than 3',
          'maximum 3 images',
          'limit of 3 images',
          'only 3 images',
          '3 images allowed',
          'exceeded 3 images',
          'maximum 3 files',
        ];
        
        // Check toast container first
        const toastContainer = document.querySelector('div#toast-container, div.toast-container, div[class*="toast-container"]');
        if (toastContainer) {
          const toastText = (toastContainer.textContent || '').trim();
          if (errorKeywords.some(keyword => toastText.toLowerCase().includes(keyword.toLowerCase()))) {
            return toastText;
          }
        }
        
        // Check upload area
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]');
        if (uploadArea) {
          const uploadText = (uploadArea.textContent || '').trim();
          for (const keyword of errorKeywords) {
            if (uploadText.toLowerCase().includes(keyword.toLowerCase())) {
              // Try to find the specific error text element
              const errorDivs = uploadArea.querySelectorAll('div, span, p');
              for (const div of errorDivs) {
                const divText = (div.textContent || '').trim();
                if (divText && errorKeywords.some(k => divText.toLowerCase().includes(k.toLowerCase()))) {
                  return divText;
                }
              }
              return uploadText;
            }
          }
        }
        
        return '';
      });
      
      return errorText || '';
    } catch {
      return '';
    }
  }

  /**
   * Checks if file type error message is visible (for non-image files)
   * Distinguishes between actual errors and informational text
   * @returns {Promise<boolean>}
   */
  async isFileTypeErrorVisible() {
    try {
      await this.page.waitForTimeout(1000);
      
      const errorVisible = await this.page.evaluate(() => {
        // Check for actual error messages (not just informational text)
        const errorKeywords = [
          'invalid file type',
          'file type not supported',
          'file type not allowed',
          'unsupported file type',
          'not an image file',
          'only image files are allowed', // More specific than just "only image files"
        ];
        
        // Check for error message in toast container (toasts are usually actual errors)
        const toastContainer = document.querySelector('div#toast-container, div.toast-container, div[class*="toast-container"]');
        if (toastContainer) {
          const toastText = (toastContainer.textContent || '').toLowerCase();
          // In toast, look for actual error keywords
          const hasErrorInToast = errorKeywords.some(keyword => 
            toastText.includes(keyword.toLowerCase())
          );
          if (hasErrorInToast) return true;
          
          // Also check for error-like patterns in toast (not just informational)
          if (toastText.includes('invalid') || 
              toastText.includes('not supported') || 
              toastText.includes('not allowed') ||
              (toastText.includes('file type') && (toastText.includes('error') || toastText.includes('invalid')))) {
            return true;
          }
        }
        
        // Check upload area for actual error messages (not informational text)
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]');
        if (uploadArea) {
          const uploadText = (uploadArea.textContent || '').toLowerCase();
          
          // Look for actual error keywords
          const hasErrorKeyword = errorKeywords.some(keyword => 
            uploadText.includes(keyword.toLowerCase())
          );
          if (hasErrorKeyword) return true;
          
          // Check for error message elements (div.error, span.error, etc.)
          const errorElements = uploadArea.querySelectorAll('div.error, span.error, div.error-message, span.error-message, p.error, div[class*="error-message"]');
          for (const errorEl of errorElements) {
            const errorText = (errorEl.textContent || '').toLowerCase();
            // If error element contains file type related error, it's a real error
            if (errorText.includes('file type') || 
                errorText.includes('invalid') || 
                errorText.includes('not supported') ||
                errorText.includes('not allowed')) {
              return true;
            }
          }
        }
        
        // Check for error messages in form validation areas
        const errorMessages = document.querySelectorAll('div.error-message, span.error-message, div[class*="error"], span[class*="error"]');
        for (const errorMsg of errorMessages) {
          const errorText = (errorMsg.textContent || '').toLowerCase();
          if (errorKeywords.some(keyword => errorText.includes(keyword.toLowerCase()))) {
            // Make sure it's not just informational text
            if (!errorText.includes('drag & drop') && 
                !errorText.includes('browse') && 
                !errorText.includes('paste')) {
              return true;
            }
          }
        }
        
        return false;
      });
      
      return errorVisible || false;
    } catch {
      return false;
    }
  }

  /**
   * Gets the file name(s) from the file input
   * @returns {Promise<Array<string>>}
   */
  async getUploadedFileNames() {
    try {
      const fileNames = await this.page.evaluate(() => {
        const fileInput = document.querySelector('input#fileInput[type="file"]');
        if (fileInput && fileInput.files) {
          return Array.from(fileInput.files).map(file => file.name);
        }
        return [];
      });
      return fileNames || [];
    } catch {
      return [];
    }
  }

  /**
   * Gets file type error message text if visible
   * @returns {Promise<string>}
   */
  async getFileTypeErrorText() {
    try {
      await this.page.waitForTimeout(1000);
      
      const errorText = await this.page.evaluate(() => {
        const errorKeywords = [
          'only image files',
          'jpeg, png, jpg, svg',
          'image files allowed',
          'invalid file type',
          'file type not supported',
          'only jpeg',
          'only png',
          'only jpg',
          'only svg',
          'image format',
          'supported formats',
        ];
        
        // Check toast container first
        const toastContainer = document.querySelector('div#toast-container, div.toast-container, div[class*="toast-container"]');
        if (toastContainer) {
          const toastText = (toastContainer.textContent || '').trim();
          if (errorKeywords.some(keyword => toastText.toLowerCase().includes(keyword.toLowerCase()))) {
            return toastText;
          }
        }
        
        // Check upload area
        const uploadArea = document.querySelector('div.drop-area, div.upload-instructions, div[class*="upload"]');
        if (uploadArea) {
          const uploadText = (uploadArea.textContent || '').trim();
          for (const keyword of errorKeywords) {
            if (uploadText.toLowerCase().includes(keyword.toLowerCase())) {
              // Try to find the specific error text element
              const errorDivs = uploadArea.querySelectorAll('div, span, p');
              for (const div of errorDivs) {
                const divText = (div.textContent || '').trim();
                if (divText && errorKeywords.some(k => divText.toLowerCase().includes(k.toLowerCase()))) {
                  return divText;
                }
              }
              return uploadText;
            }
          }
        }
        
        return '';
      });
      
      return errorText || '';
    } catch {
      return '';
    }
  }
}

module.exports = { ServiceRequestRaiseRequestPage };

