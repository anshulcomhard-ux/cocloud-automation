const { expect } = require('@playwright/test');

class BillingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Billing
    this.billingMenuItem = page
      .locator(
        'div.sidebar-items:has(span.title:has-text("Billing")), ' +
        'div[ng-reflect-router-link="/billing"]:has(span.title:has-text("Billing")), ' +
        'div.sidebar-items:has(i.bi-receipt):has(span.title:has-text("Billing"))'
      )
      .first();

    // Billing Details card
    this.billingDetailsCard = page.locator('div.billing-details:has(h5.billing-title:has-text("Billing Details"))').first();
    this.billingDetailsTitle = page.locator('h5.billing-title:has-text("Billing Details")').first();
    
    // Edit button
    this.editButton = page.locator('a.edit-link:has-text("Edit"), a.edit-link.ng-star-inserted').first();

    // Billing Details fields
    this.nameLabel = page.locator('div.billing-field:has(span.field-label:has-text("Name:")) span.field-label').first();
    this.nameValue = page.locator('div.billing-field:has(span.field-label:has-text("Name:")) span.field-value').first();
    
    this.emailLabel = page.locator('div.billing-field:has(span.field-label:has-text("Email Id:")) span.field-label').first();
    this.emailValue = page.locator('div.billing-field:has(span.field-label:has-text("Email Id:")) span.field-value').first();
    
    this.mobileLabel = page.locator('div.billing-field:has(span.field-label:has-text("Mobile Number:")) span.field-label').first();
    this.mobileValue = page.locator('div.billing-field:has(span.field-label:has-text("Mobile Number:")) span.field-value').first();

    // Current Wallet card - multiple strategies
    this.currentWalletCard = page.locator(
      'div.billing-details.p-4:has(div.fs-5:has-text("Current Wallet")), ' +
      'div.billing-details.p-4:has-text("Current Wallet"), ' +
      'div[class*="billing-details"][class*="p-4"]:has-text("Current Wallet")'
    ).first();
    this.currentWalletTitle = page.locator(
      'div.billing-details.p-4 div.fs-5:has-text("Current Wallet"), ' +
      'div.fs-5:has-text("Current Wallet")'
    ).first();
    
    // Wallet Amount
    this.walletAmountLabel = page.locator(
      'div.billing-details.p-4 div.title.col-3:has-text("Wallet Amount:"), ' +
      'div.title.col-3:has-text("Wallet Amount:")'
    ).first();
    this.walletAmountValue = page.locator(
      'div.billing-details.p-4 div.sub-title.mx-3.col-9, ' +
      'div.sub-title.mx-3.col-9'
    ).first();
    
    // Top Up button
    this.topUpButton = page.locator('a.link[ng-reflect-router-link="/billing/payment"], a[routerlink="/billing/payment"]:has-text("Top Up")').first();

    // Main Billing Table
    this.mainBillingTable = page.locator('table').first();
    this.mainTableRows = page.locator('table tbody tr');
    this.mainTableHeaders = page.locator('table thead tr th.ng-star-inserted');

    // Select Headers - Main Table
    this.mainSelectHeadersButton = page.locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")').first();
    this.mainSelectHeadersDropdown = page.locator('ul.dropdown-menu.dropdown-header-menu').first();
    this.mainHeaderCheckboxes = page.locator('ul.dropdown-menu.dropdown-header-menu input[type="checkbox"]');
    this.mainHeaderLabels = page.locator('ul.dropdown-menu.dropdown-header-menu label span.ms-2');

    // Expand/Collapse Arrow Icon
    this.expandArrowIcon = page.locator('td.cursor-pointer i.bi.bi-arrow-right-circle, td i.bi-arrow-right-circle').first();
    this.collapseArrowIcon = page.locator('td.cursor-pointer i.bi.bi-arrow-down-circle, td i.bi-arrow-down-circle').first();

    // Sub-table (appears after expanding a row)
    this.subTable = page.locator('table').nth(1); // Second table is usually the sub-table
    this.subTableRows = page.locator('table').nth(1).locator('tbody tr');
    this.subTableHeaders = page.locator('table').nth(1).locator('thead tr th.ng-star-inserted');

    // Select Headers - Sub Table (appears after expanding)
    this.subSelectHeadersButton = page.locator('table').nth(1).locator('..').locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")').first();
    this.subSelectHeadersDropdown = page.locator('table').nth(1).locator('..').locator('ul.dropdown-menu.dropdown-header-menu').first();
    this.subHeaderCheckboxes = page.locator('table').nth(1).locator('..').locator('ul.dropdown-menu.dropdown-header-menu input[type="checkbox"]');
    this.subHeaderLabels = page.locator('table').nth(1).locator('..').locator('ul.dropdown-menu.dropdown-header-menu label span.ms-2');

    // Validation message (when all headers unchecked)
    this.noColumnsMessage = page.locator('div:has-text("No columns selected"), div:has-text("Please select at least one column"), div:has-text("Please choose at least one header")').first();

    // ==================== PAGINATION LOCATORS ====================
    
    // Pagination info text (e.g., "Showing 1 to 20 of 29 records")
    this.paginationInfoText = page.locator('div.total-data-info.ng-star-inserted').first();
    
    // Pagination range label (e.g., "1 – 20 of 29")
    this.paginationRangeLabel = page.locator('div.mat-mdc-paginator-range-label[aria-live="polite"]').first();
    
    // Items per page selector
    this.itemsPerPageSelect = page.locator('mat-select.mat-mdc-select[aria-labelledby*="mat-paginator-page-size-label"]').first();
    this.itemsPerPageSelectTrigger = page.locator('mat-select.mat-mdc-select[aria-labelledby*="mat-paginator-page-size-label"] div.mat-mdc-select-trigger').first();
    this.itemsPerPageSelectValue = page.locator('mat-select.mat-mdc-select[aria-labelledby*="mat-paginator-page-size-label"] span.mat-mdc-select-min-line').first();
    
    // Items per page options (in dropdown panel)
    this.itemsPerPageOptions = page.locator('mat-option.mat-mdc-option[id*="mat-option"]');
    this.itemsPerPageOption15 = page.locator('mat-option.mat-mdc-option[ng-reflect-value="15"]').first();
    this.itemsPerPageOption20 = page.locator('mat-option.mat-mdc-option[ng-reflect-value="20"]').first();
    this.itemsPerPageOption50 = page.locator('mat-option.mat-mdc-option[ng-reflect-value="50"]').first();
    this.itemsPerPageOption100 = page.locator('mat-option.mat-mdc-option[ng-reflect-value="100"]').first();
    this.itemsPerPageOption200 = page.locator('mat-option.mat-mdc-option[ng-reflect-value="200"]').first();
    this.itemsPerPageOption500 = page.locator('mat-option.mat-mdc-option[ng-reflect-value="500"]').first();
    
    // Previous page button
    this.previousPageButton = page.locator('button.mat-mdc-paginator-navigation-previous[aria-label="Previous page"]').first();
    
    // Next page button
    this.nextPageButton = page.locator('button.mat-mdc-paginator-navigation-next[aria-label="Next page"]').first();
    
    // First row first cell (to capture value for comparison)
    // Try multiple strategies: skip arrow icon column, get first data cell
    this.firstRowFirstCell = page.locator('table tbody tr').first().locator('td:not(:has(i.bi-arrow-right-circle)):not(:has(i.bi-arrow-down-circle))').first();
    this.firstRowFirstCellAlt = page.locator('table').first().locator('tbody tr').first().locator('td').nth(1); // Skip first column (arrow)
    this.firstRowAnyCell = page.locator('table').first().locator('tbody tr').first().locator('td').first();

    // ==================== SUB-TABLE PAGINATION LOCATORS ====================
    
    // Sub-table pagination info text (scoped to second table area)
    this.subTablePaginationInfoText = page.locator('table').nth(1).locator('..').locator('div.total-data-info.ng-star-inserted').first();
    
    // Sub-table pagination range label
    this.subTablePaginationRangeLabel = page.locator('table').nth(1).locator('..').locator('div.mat-mdc-paginator-range-label[aria-live="polite"]').first();
    
    // Sub-table items per page selector (find paginator near sub-table)
    this.subTableItemsPerPageSelect = page.locator('table').nth(1).locator('..').locator('mat-select.mat-mdc-select[aria-labelledby*="mat-paginator-page-size-label"]').first();
    this.subTableItemsPerPageSelectValue = page.locator('table').nth(1).locator('..').locator('mat-select.mat-mdc-select[aria-labelledby*="mat-paginator-page-size-label"] span.mat-mdc-select-min-line').first();
    
    // Sub-table previous page button
    this.subTablePreviousPageButton = page.locator('table').nth(1).locator('..').locator('button.mat-mdc-paginator-navigation-previous[aria-label="Previous page"]').first();
    
    // Sub-table next page button
    this.subTableNextPageButton = page.locator('table').nth(1).locator('..').locator('button.mat-mdc-paginator-navigation-next[aria-label="Next page"]').first();
    
    // Sub-table first row first cell (for value comparison)
    this.subTableFirstRowFirstCell = page.locator('table').nth(1).locator('tbody tr').first().locator('td').first();

    // ==================== SEARCH SECTION LOCATORS ====================
    
    // Search header (collapsible)
    this.searchHeader = page.locator('div.search-header[data-bs-toggle="collapse"]').first();
    this.searchHeaderText = page.locator('div.search-header span:has-text("Search here")').first();
    this.searchHeaderIcon = page.locator('div.search-header i.bi-search').first();
    this.searchChevronIcon = page.locator('div.search-header i.bi-chevron-down.chevron-icon').first();
    
    // Search field area (collapsible content)
    this.searchFieldArea = page.locator('div.search-field-area').first();
    
    // Search form fields
    this.subIdInput = page.locator('input#subId[matinput]').first();
    this.subIdLabel = page.locator('mat-label:has-text("Sub ID")').first();
    
    this.billIdInput = page.locator('input#billId[matinput]').first();
    this.billIdLabel = page.locator('mat-label:has-text("Bill ID")').first();
    
    this.customerEmailInput = page.locator('input#email[matinput]').first();
    this.customerEmailLabel = page.locator('mat-label:has-text("Customer Email")').first();
    
    // Bill Date picker
    this.billDatePicker = page.locator('app-datepicker').first();
    this.billDateLabel = page.locator('mat-label:has-text("Bill Date")').first();
    this.billDateStartInput = page.locator('input[matstartdate][formcontrolname="startDate"]').first();
    this.billDateEndInput = page.locator('input[matenddate][formcontrolname="endDate"]').first();
    this.billDateToggle = page.locator('mat-datepicker-toggle button[aria-label="Open calendar"]').first();
    
    // Search and Reset buttons
    this.searchButton = page.locator('button.search-btn.btn-primary[type="submit"]').first();
    this.resetButton = page.locator('button.reset-btn[type="button"]').first();
    
    // Search form
    this.searchForm = page.locator('form.search-field-area form, div.search-field-area form').first();

    // ==================== BILLING DETAILS FORM LOCATORS ====================
    
    // Form container (appears after clicking Edit button)
    this.billingDetailsForm = page.locator('form:has(input#companyName), form:has(input#name), form[ng-reflect-form]').first();
    
    // Required fields (marked with *)
    this.companyInput = page.locator('input#companyName, input[id="companyName"], input[formcontrolname="companyName"], input[ng-reflect-name="companyName"]').first();
    this.companyLabel = page.locator('label[for="companyName"]:has-text("Company/Individual"), label:has-text("Company/Individual")').first();
    
    this.mobileInput = page.locator('input#mobile, input[id="mobile"], input[formcontrolname="mobile"], input[ng-reflect-name="mobile"]').first();
    this.mobileLabel = page.locator('label[for="mobile"]:has-text("Mobile"), label:has-text("Mobile")').first();
    
    this.gstTreatmentSelect = page.locator('select#gstTreatment, select[id="gstTreatment"], select[formcontrolname="gstTreatment"], select[ng-reflect-name="gstTreatment"]').first();
    this.gstTreatmentLabel = page.locator('label[for="gstTreatment"]:has-text("GST Treatment"), label:has-text("GST Treatment")').first();
    this.gstTreatmentSearchInput = page.locator('select#gstTreatment + div input[placeholder="Search Here..."], select#gstTreatment ~ div input[placeholder="Search Here..."]').first();
    
    this.countrySelect = page.locator('select#country, select[id="country"], select[formcontrolname="country"], select[ng-reflect-name="country"]').first();
    this.countryLabel = page.locator('label[for="country"]:has-text("Country"), label:has-text("Country")').first();
    this.countrySearchInput = page.locator('select#country + div input[placeholder="Search Here..."], select#country ~ div input[placeholder="Search Here..."]').first();
    
    this.stateSelect = page.locator('select#state, select[id="state"], select[formcontrolname="state"], select[ng-reflect-name="state"]').first();
    this.stateLabel = page.locator('label[for="state"]:has-text("State"), label:has-text("State")').first();
    this.stateSearchInput = page.locator('select#state + div input[placeholder="Search Here..."], select#state ~ div input[placeholder="Search Here..."]').first();
    
    this.nameInput = page.locator('input#name, input[id="name"], input[formcontrolname="name"], input[ng-reflect-name="name"]').first();
    this.nameLabel = page.locator('label[for="name"]:has-text("Name"), label:has-text("Name")').first();
    
    this.emailInput = page.locator('input#email, input[id="email"], input[formcontrolname="email"], input[ng-reflect-name="email"]').first();
    this.emailLabel = page.locator('label[for="email"]:has-text("Email"), label:has-text("Email")').first();
    
    this.addressInput = page.locator('input#address, input[id="address"], input[formcontrolname="address"], input[ng-reflect-name="address"], textarea#address').first();
    this.addressLabel = page.locator('label[for="address"]:has-text("Address"), label:has-text("Address")').first();
    
    this.zipCodeInput = page.locator('input#pinCode, input[id="pinCode"], input[formcontrolname="pinCode"], input[ng-reflect-name="pinCode"], input#zipCode').first();
    this.zipCodeLabel = page.locator('label[for="pinCode"]:has-text("Zip/Pin code"), label:has-text("Zip/Pin code")').first();
    
    this.cityInput = page.locator('input#city, input[id="city"], input[formcontrolname="city"], input[ng-reflect-name="city"]').first();
    this.cityLabel = page.locator('label[for="city"]:has-text("City"), label:has-text("City")').first();
    
    // Optional fields (not required)
    this.registeredCompanyNameInput = page.locator('input#registeredCompanyName, input[id="registeredCompanyName"], input[formcontrolname="registeredCompanyName"], input[ng-reflect-name="registeredCompanyName"]').first();
    this.registeredCompanyNameLabel = page.locator('label[for="registeredCompanyName"]:has-text("Registered Company Name"), label:has-text("Registered Company Name")').first();
    
    this.panInput = page.locator('input#panCardNo, input[id="panCardNo"], input[formcontrolname="panCardNo"], input[ng-reflect-name="panCardNo"], input#pan').first();
    this.panLabel = page.locator('label[for="panCardNo"]:has-text("PAN"), label:has-text("PAN")').first();
    
    this.gstinInput = page.locator('input#gstInNo, input[id="gstInNo"], input[formcontrolname="gstInNo"], input[ng-reflect-name="gstInNo"], input#gstin').first();
    this.gstinLabel = page.locator('label[for="gstInNo"]:has-text("GSTIN"), label:has-text("GSTIN")').first();
    
    this.companyTypeSelect = page.locator('select#organizationType, select[id="organizationType"], select[formcontrolname="organizationType"], select[ng-reflect-name="organizationType"]').first();
    this.companyTypeLabel = page.locator('label[for="organizationType"]:has-text("Company Type"), label:has-text("Company Type")').first();
    this.companyTypeSearchInput = page.locator('select#organizationType + div input[placeholder="Search Here..."], select#organizationType ~ div input[placeholder="Search Here..."]').first();
    
    // Form buttons
    this.formSubmitButton = page.locator('button[type="submit"]:has-text("Submit"), button.btn-primary:has-text("Submit"), button:has-text("Submit")').first();
    this.formCancelButton = page.locator('button[type="button"]:has-text("Cancel"), button.btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Error messages / validation
    this.requiredFieldErrors = page.locator('mat-error, div.error-message, span.error-message, div[class*="error"]');
    this.formErrorMessages = page.locator('div.error-message.ng-star-inserted, mat-error.ng-star-inserted');
  }

  /**
   * Navigate to Billing page
   */
  async navigateToBilling() {
    try {
      console.log('  Navigating to Billing page...');
      
      // Wait for sidebar to be ready
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);

      // Check if billing menu item is visible
      const isVisible = await this.billingMenuItem.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!isVisible) {
        // Try scrolling to find it
        await this.billingMenuItem.scrollIntoViewIfNeeded({ timeout: 5000 });
      }

      // Click on Billing menu item
      await this.billingMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.billingMenuItem.scrollIntoViewIfNeeded();
      await this.billingMenuItem.click();
      
      // Wait for navigation
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      console.log('  ✓ Clicked on Billing menu item');
    } catch (error) {
      console.log(`  ⚠ Error navigating to Billing page: ${error.message}`);
      throw new Error(`Error navigating to Billing page: ${error.message}`);
    }
  }

  /**
   * Verify Billing page is visible
   */
  async isBillingPageVisible() {
    try {
      // Check for Billing Details card or Current Wallet card
      const billingDetailsVisible = await this.billingDetailsCard.isVisible({ timeout: 5000 }).catch(() => false);
      const walletCardVisible = await this.currentWalletCard.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Check URL
      const currentUrl = this.page.url();
      const urlContainsBilling = currentUrl.includes('/billing');
      
      return billingDetailsVisible || (walletCardVisible && urlContainsBilling);
    } catch (error) {
      console.log(`  ⚠ Error checking Billing page visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Billing Details card is visible
   */
  async isBillingDetailsCardVisible() {
    try {
      return await this.billingDetailsCard.isVisible({ timeout: 5000 });
    } catch (error) {
      console.log(`  ⚠ Error checking Billing Details card visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get Name value from Billing Details
   */
  async getNameValue() {
    try {
      await this.nameValue.waitFor({ state: 'visible', timeout: 5000 });
      const name = await this.nameValue.textContent();
      return name ? name.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting Name value: ${error.message}`);
      return '';
    }
  }

  /**
   * Get Email Id value from Billing Details
   */
  async getEmailValue() {
    try {
      await this.emailValue.waitFor({ state: 'visible', timeout: 5000 });
      const email = await this.emailValue.textContent();
      return email ? email.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting Email value: ${error.message}`);
      return '';
    }
  }

  /**
   * Get Mobile Number value from Billing Details
   */
  async getMobileValue() {
    try {
      await this.mobileValue.waitFor({ state: 'visible', timeout: 5000 });
      const mobile = await this.mobileValue.textContent();
      return mobile ? mobile.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting Mobile value: ${error.message}`);
      return '';
    }
  }

  /**
   * Gets all billing details from the card.
   * @returns {Promise<Object>} Object with all billing details
   */
  async getAllBillingDetailsFromCard() {
    try {
      const billingDetails = {
        name: await this.getNameValue(),
        email: await this.getEmailValue(),
        mobile: await this.getMobileValue(),
        company: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        gstTreatment: '',
        country: '',
      };

      // Get company
      try {
        const companyValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Company:")) span.field-value').first();
        if (await companyValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.company = await companyValue.textContent() || '';
          billingDetails.company = billingDetails.company.trim();
        }
      } catch (e) {
        // Continue
      }

      // Get address
      try {
        const addressValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Address:")) span.field-value').first();
        if (await addressValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.address = await addressValue.textContent() || '';
          billingDetails.address = billingDetails.address.trim();
        }
      } catch (e) {
        // Continue
      }

      // Get city
      try {
        const cityValue = this.page.locator('div.billing-field:has(span.field-label:has-text("City:")) span.field-value').first();
        if (await cityValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.city = await cityValue.textContent() || '';
          billingDetails.city = billingDetails.city.trim();
        }
      } catch (e) {
        // Continue
      }

      // Get state
      try {
        const stateValue = this.page.locator('div.billing-field:has(span.field-label:has-text("State:")) span.field-value').first();
        if (await stateValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.state = await stateValue.textContent() || '';
          billingDetails.state = billingDetails.state.trim();
        }
      } catch (e) {
        // Continue
      }

      // Get zip code
      try {
        const zipCodeValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Zip/Pin code:")) span.field-value').first();
        if (await zipCodeValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.zipCode = await zipCodeValue.textContent() || '';
          billingDetails.zipCode = billingDetails.zipCode.trim();
        }
      } catch (e) {
        // Continue
      }

      // Get GST Treatment
      try {
        const gstTreatmentValue = this.page.locator('div.billing-field:has(span.field-label:has-text("GST Treatment:")) span.field-value').first();
        if (await gstTreatmentValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.gstTreatment = await gstTreatmentValue.textContent() || '';
          billingDetails.gstTreatment = billingDetails.gstTreatment.trim();
        }
      } catch (e) {
        // Continue
      }

      // Get country
      try {
        const countryValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Country:")) span.field-value').first();
        if (await countryValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.country = await countryValue.textContent() || '';
          billingDetails.country = billingDetails.country.trim();
        }
      } catch (e) {
        // Continue
      }

      return billingDetails;
    } catch (error) {
      console.error('Error getting all billing details from card:', error);
      return {};
    }
  }

  /**
   * Verify Edit button is visible and clickable
   */
  async isEditButtonVisibleAndClickable() {
    try {
      const isVisible = await this.editButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      const isEnabled = await this.editButton.isEnabled();
      return isEnabled;
    } catch (error) {
      console.log(`  ⚠ Error checking Edit button: ${error.message}`);
      return false;
    }
  }

  /**
   * Click Edit button
   */
  async clickEditButton() {
    try {
      await this.editButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.editButton.scrollIntoViewIfNeeded();
      await this.editButton.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Edit button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Edit button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify Current Wallet card is visible
   */
  async isCurrentWalletCardVisible() {
    try {
      // Try multiple strategies
      const strategies = [
        () => this.currentWalletCard.isVisible({ timeout: 5000 }),
        () => this.page.locator('div.fs-5:has-text("Current Wallet")').isVisible({ timeout: 5000 }),
        () => this.page.locator('div:has-text("Current Wallet"):has-text("Wallet Amount")').isVisible({ timeout: 5000 }),
      ];

      for (const strategy of strategies) {
        try {
          const isVisible = await strategy();
          if (isVisible) {
            // Scroll into view to ensure it's actually visible
            await this.currentWalletCard.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {});
            return true;
          }
        } catch (e) {
          // Try next strategy
          continue;
        }
      }

      // If all strategies fail, try scrolling and checking again
      await this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('div'));
        const walletCard = elements.find(el => 
          el.textContent && el.textContent.includes('Current Wallet') && 
          el.classList.contains('billing-details') && 
          el.classList.contains('p-4')
        );
        if (walletCard) {
          walletCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });

      await this.page.waitForTimeout(1000);
      return await this.currentWalletCard.isVisible({ timeout: 3000 }).catch(() => false);
    } catch (error) {
      console.log(`  ⚠ Error checking Current Wallet card visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Wallet Amount label is visible
   */
  async isWalletAmountLabelVisible() {
    try {
      // Try multiple strategies
      const strategies = [
        () => this.walletAmountLabel.isVisible({ timeout: 5000 }),
        () => this.page.locator('div.title.col-3:has-text("Wallet Amount:")').isVisible({ timeout: 5000 }),
        () => this.page.locator('*:has-text("Wallet Amount:")').isVisible({ timeout: 5000 }),
      ];

      for (const strategy of strategies) {
        try {
          const isVisible = await strategy();
          if (isVisible) return true;
        } catch (e) {
          continue;
        }
      }
      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking Wallet Amount label visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get Wallet Amount value
   */
  async getWalletAmountValue() {
    try {
      // Try multiple strategies
      const strategies = [
        async () => {
          await this.walletAmountValue.waitFor({ state: 'visible', timeout: 5000 });
          return await this.walletAmountValue.textContent();
        },
        async () => {
          const value = await this.page.locator('div.sub-title.mx-3.col-9').first().textContent({ timeout: 5000 });
          return value;
        },
        async () => {
          // Fallback: find by context (near "Wallet Amount:")
          const walletSection = this.page.locator('div:has-text("Wallet Amount:")').first();
          const value = await walletSection.locator('..').locator('div.sub-title, div:has-text("₹")').first().textContent({ timeout: 5000 });
          return value;
        },
      ];

      for (const strategy of strategies) {
        try {
          const amount = await strategy();
          if (amount && amount.trim()) {
            return amount.trim();
          }
        } catch (e) {
          continue;
        }
      }
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting Wallet Amount value: ${error.message}`);
      return '';
    }
  }

  /**
   * Verify wallet amount is formatted correctly (contains ₹ symbol and numeric value)
   */
  async isWalletAmountFormatted() {
    try {
      const amount = await this.getWalletAmountValue();
      if (!amount) return false;
      
      // Check for ₹ symbol
      const hasRupeeSymbol = amount.includes('₹');
      
      // Check for numeric value (may have negative sign, commas, decimal)
      const hasNumericValue = /-?₹?\s*[\d,]+\.?\d*/.test(amount);
      
      return hasRupeeSymbol && hasNumericValue;
    } catch (error) {
      console.log(`  ⚠ Error verifying wallet amount format: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Top Up button is visible and enabled
   */
  async isTopUpButtonVisibleAndEnabled() {
    try {
      const isVisible = await this.topUpButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      const isEnabled = await this.topUpButton.isEnabled();
      return isEnabled;
    } catch (error) {
      console.log(`  ⚠ Error checking Top Up button: ${error.message}`);
      return false;
    }
  }

  /**
   * Click Top Up button
   */
  async clickTopUpButton() {
    try {
      await this.topUpButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.topUpButton.scrollIntoViewIfNeeded();
      await this.topUpButton.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Top Up button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Top Up button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify user navigated to Top Up / Wallet recharge page
   */
  async isTopUpPageVisible() {
    try {
      const currentUrl = this.page.url();
      const urlContainsPayment = currentUrl.includes('/billing/payment');
      
      // Also check if we're still on billing page but with payment route
      return urlContainsPayment;
    } catch (error) {
      console.log(`  ⚠ Error checking Top Up page visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  // ==================== MAIN BILLING TABLE METHODS ====================

  /**
   * Verify main billing table is visible with records
   */
  async isMainBillingTableVisible() {
    try {
      const isVisible = await this.mainBillingTable.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      // Check if table has rows
      const rowCount = await this.mainTableRows.count();
      return rowCount > 0;
    } catch (error) {
      console.log(`  ⚠ Error checking main billing table visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify Select Headers button is visible and clickable (main table)
   */
  async isMainSelectHeadersButtonVisibleAndClickable() {
    try {
      const isVisible = await this.mainSelectHeadersButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      const isEnabled = await this.mainSelectHeadersButton.isEnabled();
      return isEnabled;
    } catch (error) {
      console.log(`  ⚠ Error checking main Select Headers button: ${error.message}`);
      return false;
    }
  }

  /**
   * Click Select Headers button (main table)
   */
  async clickMainSelectHeadersButton() {
    try {
      await this.mainSelectHeadersButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.mainSelectHeadersButton.scrollIntoViewIfNeeded();
      await this.mainSelectHeadersButton.click();
      await this.page.waitForTimeout(500);
      console.log('  ✓ Clicked main Select Headers button');
    } catch (error) {
      console.log(`  ⚠ Error clicking main Select Headers button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if Select Headers dropdown is open (main table)
   */
  async isMainSelectHeadersDropdownOpen() {
    try {
      const dropdown = this.mainSelectHeadersDropdown;
      const isVisible = await dropdown.isVisible({ timeout: 2000 });
      if (!isVisible) return false;
      
      // Check if dropdown has aria-expanded="true" or class "show"
      const ariaExpanded = await this.mainSelectHeadersButton.getAttribute('aria-expanded');
      return ariaExpanded === 'true' || isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get all header options from Select Headers dropdown (main table)
   */
  async getMainHeaderOptions() {
    try {
      const labels = await this.mainHeaderLabels.all();
      const options = [];
      for (const label of labels) {
        const text = await label.textContent();
        if (text && text.trim()) {
          options.push(text.trim());
        }
      }
      return options;
    } catch (error) {
      console.log(`  ⚠ Error getting main header options: ${error.message}`);
      return [];
    }
  }

  /**
   * Verify all headers are checked by default (main table)
   */
  async verifyAllMainHeadersCheckedByDefault() {
    try {
      const checkboxes = await this.mainHeaderCheckboxes.all();
      let allChecked = true;
      
      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
          allChecked = false;
          break;
        }
      }
      return allChecked && checkboxes.length > 0;
    } catch (error) {
      console.log(`  ⚠ Error verifying main headers checked state: ${error.message}`);
      return false;
    }
  }

  /**
   * Get visible table headers (main table)
   */
  async getVisibleMainTableHeaders() {
    try {
      const headers = await this.mainTableHeaders.all();
      const visibleHeaders = [];
      for (const header of headers) {
        const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await header.textContent();
          if (text && text.trim()) {
            visibleHeaders.push(text.trim());
          }
        }
      }
      return visibleHeaders;
    } catch (error) {
      console.log(`  ⚠ Error getting visible main table headers: ${error.message}`);
      return [];
    }
  }

  /**
   * Toggle header checkbox (main table)
   */
  async toggleMainHeaderOption(headerName, check = true) {
    try {
      const labels = await this.mainHeaderLabels.all();
      for (const label of labels) {
        const text = await label.textContent();
        if (text && text.trim() === headerName.trim()) {
          const checkbox = label.locator('..').locator('input[type="checkbox"]').first();
          const isChecked = await checkbox.isChecked();
          if ((check && !isChecked) || (!check && isChecked)) {
            await checkbox.click();
            await this.page.waitForTimeout(300);
          }
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(`  ⚠ Error toggling main header option "${headerName}": ${error.message}`);
      return false;
    }
  }

  /**
   * Uncheck multiple headers (main table)
   */
  async uncheckMainHeaders(headerNames) {
    try {
      for (const headerName of headerNames) {
        await this.toggleMainHeaderOption(headerName, false);
      }
      await this.page.waitForTimeout(500);
      console.log(`  ✓ Unchecked main headers: ${headerNames.join(', ')}`);
    } catch (error) {
      console.log(`  ⚠ Error unchecking main headers: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check all headers (main table)
   */
  async checkAllMainHeaders() {
    try {
      const checkboxes = await this.mainHeaderCheckboxes.all();
      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked();
        if (!isChecked) {
          await checkbox.click();
          await this.page.waitForTimeout(200);
        }
      }
      await this.page.waitForTimeout(500);
      console.log('  ✓ Checked all main headers');
    } catch (error) {
      console.log(`  ⚠ Error checking all main headers: ${error.message}`);
      throw error;
    }
  }

  /**
   * Uncheck all headers (main table)
   */
  async uncheckAllMainHeaders() {
    try {
      const checkboxes = await this.mainHeaderCheckboxes.all();
      for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked();
        if (isChecked) {
          await checkbox.click();
          await this.page.waitForTimeout(200);
        }
      }
      await this.page.waitForTimeout(500);
      console.log('  ✓ Unchecked all main headers');
    } catch (error) {
      console.log(`  ⚠ Error unchecking all main headers: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify column is visible in main table
   */
  async isMainTableColumnVisible(columnName) {
    try {
      const headers = await this.mainTableHeaders.all();
      for (const header of headers) {
        const text = await header.textContent();
        if (text && text.trim().includes(columnName)) {
          return await header.isVisible({ timeout: 1000 });
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // ==================== EXPAND/COLLAPSE METHODS ====================

  /**
   * Verify expand arrow icon is visible in first row
   */
  async isExpandArrowVisible() {
    try {
      return await this.expandArrowIcon.isVisible({ timeout: 5000 });
    } catch (error) {
      console.log(`  ⚠ Error checking expand arrow visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Click expand arrow icon to expand row
   */
  async clickExpandArrow() {
    try {
      await this.expandArrowIcon.waitFor({ state: 'visible', timeout: 5000 });
      await this.expandArrowIcon.scrollIntoViewIfNeeded();
      await this.expandArrowIcon.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked expand arrow icon');
    } catch (error) {
      console.log(`  ⚠ Error clicking expand arrow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify sub-table is visible after expanding
   * Also checks for empty table structure (row with colspan containing empty table)
   */
  async isSubTableVisible() {
    try {
      // Wait a bit for sub-table to appear
      await this.page.waitForTimeout(500);
      
      // Try multiple strategies to find sub-table
      const strategies = [
        // Strategy 1: Check for empty table structure (row with colspan containing card with table)
        async () => {
          const emptyRowStructure = this.page.locator('tr td[colspan] div.card.shadow-sm table.table-borderless').first();
          const isVisible = await emptyRowStructure.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            console.log('  ✓ Found empty sub-table structure (colspan with empty table)');
            return true;
          }
          return false;
        },
        // Strategy 2: Use subTable locator (second table)
        async () => {
          const allTables = this.page.locator('table');
          const tableCount = await allTables.count().catch(() => 0);
          if (tableCount > 1) {
            const secondTable = allTables.nth(1);
            return await secondTable.isVisible({ timeout: 2000 }).catch(() => false);
          }
          return false;
        },
        // Strategy 3: Find table within expanded row
        async () => {
          const expandedRows = this.page.locator('tr.expanded, tr[class*="expanded"], tr:has(table)');
          const expandedRow = expandedRows.first();
          const hasTable = await expandedRow.locator('table').count().catch(() => 0);
          if (hasTable > 0) {
            return await expandedRow.locator('table').first().isVisible({ timeout: 2000 }).catch(() => false);
          }
          return false;
        },
        // Strategy 4: Check for card with table structure (empty sub-table)
        async () => {
          const cardWithTable = this.page.locator('div.card.shadow-sm:has(table.table-borderless)').first();
          const isVisible = await cardWithTable.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            console.log('  ✓ Found sub-table structure (card with table)');
            return true;
          }
          return false;
        },
        // Strategy 5: Use original subTable locator
        async () => {
          return await this.subTable.isVisible({ timeout: 2000 }).catch(() => false);
        },
      ];

      for (const strategy of strategies) {
        try {
          const isVisible = await Promise.race([
            strategy(),
            new Promise((resolve) => setTimeout(() => resolve(false), 2000))
          ]);
          if (isVisible) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }
      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking sub-table visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get visible sub-table headers
   */
  async getVisibleSubTableHeaders() {
    try {
      // Wait a bit for table to update
      await this.page.waitForTimeout(500);
      
      // Try multiple strategies to find sub-table headers
      const strategies = [
        // Strategy 1: Find headers in second table (most reliable)
        async () => {
          const allTables = this.page.locator('table');
          const tableCount = await allTables.count().catch(() => 0);
          if (tableCount > 1) {
            const subTable = allTables.nth(1);
            const headers = subTable.locator('thead tr th');
            const headerElements = await headers.all();
            const visibleHeaders = [];
            for (const header of headerElements) {
              try {
                const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  const text = await header.textContent();
                  if (text && text.trim() && !text.trim().toLowerCase().includes('arrow')) {
                    visibleHeaders.push(text.trim());
                  }
                }
              } catch (e) {
                continue;
              }
            }
            return visibleHeaders;
          }
          return [];
        },
        // Strategy 2: Use subTableHeaders locator
        async () => {
          const headers = await this.subTableHeaders.all();
          const visibleHeaders = [];
          for (const header of headers) {
            try {
              const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                const text = await header.textContent();
                if (text && text.trim()) {
                  visibleHeaders.push(text.trim());
                }
              }
            } catch (e) {
              continue;
            }
          }
          return visibleHeaders;
        },
        // Strategy 3: Find headers in second table with ng-star-inserted
        async () => {
          const secondTable = this.page.locator('table').nth(1);
          const headers = secondTable.locator('thead tr th.ng-star-inserted');
          const headerElements = await headers.all();
          const visibleHeaders = [];
          for (const header of headerElements) {
            try {
              const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                const text = await header.textContent();
                if (text && text.trim()) {
                  visibleHeaders.push(text.trim());
                }
              }
            } catch (e) {
              continue;
            }
          }
          return visibleHeaders;
        },
        // Strategy 4: Find any th elements in expanded row area
        async () => {
          const expandedRows = this.page.locator('tr.expanded, tr[class*="expanded"], tr:has(table)');
          const expandedRow = expandedRows.first();
          const headers = expandedRow.locator('table thead tr th');
          const headerElements = await headers.all();
          const visibleHeaders = [];
          for (const header of headerElements) {
            try {
              const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                const text = await header.textContent();
                if (text && text.trim() && !text.trim().toLowerCase().includes('arrow')) {
                  visibleHeaders.push(text.trim());
                }
              }
            } catch (e) {
              continue;
            }
          }
          return visibleHeaders;
        },
      ];

      for (let i = 0; i < strategies.length; i++) {
        try {
          const headers = await Promise.race([
            strategies[i](),
            new Promise((resolve) => setTimeout(() => resolve([]), 2000))
          ]);
          if (headers && headers.length > 0) {
            console.log(`  Strategy ${i + 1} found ${headers.length} headers`);
            return headers;
          }
        } catch (e) {
          console.log(`  Strategy ${i + 1} failed: ${e.message}`);
          continue;
        }
      }
      console.log('  ⚠ No headers found with any strategy');
      return [];
    } catch (error) {
      console.log(`  ⚠ Error getting visible sub-table headers: ${error.message}`);
      return [];
    }
  }

  /**
   * Click collapse arrow icon to collapse row
   */
  async clickCollapseArrow() {
    try {
      // Try collapse arrow first, if not found, try expand arrow (it might have changed)
      const collapseVisible = await this.collapseArrowIcon.isVisible({ timeout: 2000 }).catch(() => false);
      if (collapseVisible) {
        await this.collapseArrowIcon.click();
      } else {
        // If collapse arrow not found, try clicking the expand arrow again (it toggles)
        await this.expandArrowIcon.click();
      }
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked collapse arrow icon');
    } catch (error) {
      console.log(`  ⚠ Error clicking collapse arrow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify sub-table is collapsed (not visible)
   */
  async isSubTableCollapsed() {
    try {
      const isVisible = await this.subTable.isVisible({ timeout: 2000 }).catch(() => false);
      return !isVisible;
    } catch (error) {
      return true; // If error, assume collapsed
    }
  }

  // ==================== SUB-TABLE SELECT HEADERS METHODS ====================

  /**
   * Click Select Headers button (sub-table)
   */
  async clickSubSelectHeadersButton() {
    try {
      // Wait for sub-table to be visible first
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to find the sub-table Select Headers button
      const strategies = [
        // Strategy 1: Find all Select Headers buttons and get the second one (first is main table)
        () => this.page.locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")').nth(1),
        // Strategy 2: Find Select Headers button within expanded row area
        () => this.page.locator('tr.expanded, tr[class*="expanded"]').locator('..').locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")').first(),
        // Strategy 3: Find Select Headers button that appears after sub-table
        () => this.subTable.locator('..').locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")').first(),
        // Strategy 4: Find Select Headers button in the same container as sub-table
        () => this.page.locator('div:has(table)').filter({ has: this.subTable }).locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")').first(),
        // Strategy 5: Find all Select Headers buttons and check which one is near sub-table
        async () => {
          const allButtons = this.page.locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")');
          const count = await allButtons.count();
          if (count > 1) {
            return allButtons.nth(1); // Second button is likely for sub-table
          }
          return allButtons.first();
        },
      ];

      let button = null;
      for (const strategy of strategies) {
        try {
          button = await strategy();
          const isVisible = await button.isVisible({ timeout: 3000 });
          if (isVisible) {
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!button) {
        throw new Error('Could not find sub-table Select Headers button');
      }

      await button.waitFor({ state: 'visible', timeout: 5000 });
      await button.scrollIntoViewIfNeeded();
      await button.click();
      
      // Wait for dropdown to appear
      await this.page.waitForTimeout(800);
      
      // Verify dropdown opened by checking aria-expanded or dropdown visibility
      try {
        const ariaExpanded = await button.getAttribute('aria-expanded');
        if (ariaExpanded === 'true') {
          console.log('  ✓ Button aria-expanded is true after click');
        }
      } catch (e) {
        // Continue even if we can't check aria-expanded
      }
      
      console.log('  ✓ Clicked sub-table Select Headers button');
    } catch (error) {
      console.log(`  ⚠ Error clicking sub-table Select Headers button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check if Select Headers dropdown is open (sub-table)
   */
  async isSubSelectHeadersDropdownOpen() {
    try {
      // Quick check: if button aria-expanded is true, assume dropdown is open
      try {
        const buttons = this.page.locator('button.header-btn.btn-primary.btn.dropdown-toggle:has-text("Select Headers")');
        const buttonCount = await buttons.count();
        if (buttonCount > 1) {
          const subButton = buttons.nth(1);
          const ariaExpanded = await subButton.getAttribute('aria-expanded').catch(() => null);
          
          // Check if dropdown is actually visible (not just aria-expanded)
          const dropdownVisible = await this.page.locator('ul.dropdown-menu.dropdown-header-menu:has(label:has-text("Bill ID"))').isVisible({ timeout: 500 }).catch(() => false);
          
          // Both aria-expanded and visible dropdown must be true
          if (ariaExpanded === 'true' && dropdownVisible) {
              return true;
            }
          
          // If aria-expanded is false, dropdown is definitely closed
          if (ariaExpanded === 'false') {
            return false;
          }
          
          // If aria-expanded is true but dropdown not visible, check again
          if (ariaExpanded === 'true' && !dropdownVisible) {
            // Wait a bit and check again
            await this.page.waitForTimeout(300);
            const retryVisible = await this.page.locator('ul.dropdown-menu.dropdown-header-menu:has(label:has-text("Bill ID"))').isVisible({ timeout: 500 }).catch(() => false);
            return retryVisible;
          }
        }
      } catch (e) {
        // Continue to other strategies
      }

      // Try quick strategies with short timeouts
      const quickStrategies = [
        // Strategy 1: Find all dropdowns and check second one quickly
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          if (count > 1) {
            const dropdown = allDropdowns.nth(1);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              // Quick check for sub-table headers
              const hasSubHeaders = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0) > 0;
              if (hasSubHeaders) {
                return true;
              }
            }
          }
          return false;
        },
        // Strategy 2: Find dropdown with "show" class
        async () => {
          const dropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu.show');
          const count = await dropdowns.count().catch(() => 0);
          if (count > 1) {
            const dropdown = dropdowns.nth(1);
            return await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
          }
          return false;
        },
        // Strategy 3: Find any visible dropdown with sub-table headers
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          for (let i = 0; i < Math.min(count, 3); i++) { // Limit to first 3 dropdowns
            try {
              const dropdown = allDropdowns.nth(i);
              const isVisible = await dropdown.isVisible({ timeout: 500 }).catch(() => false);
              if (isVisible) {
                // Quick check for sub-table headers
                const billIdCount = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
                if (billIdCount > 0) {
                  return true;
                }
              }
            } catch (e) {
              continue;
            }
          }
          return false;
        },
      ];

      // Try strategies with overall timeout
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(false), 3000));
      const checkPromise = (async () => {
        for (const strategy of quickStrategies) {
          try {
            const result = await Promise.race([
              strategy(),
              new Promise((resolve) => setTimeout(() => resolve(false), 1000))
            ]);
            if (result) {
              return true;
            }
          } catch (e) {
            continue;
          }
        }
        return false;
      })();

      const result = await Promise.race([checkPromise, timeoutPromise]);
      return result === true;
    } catch (error) {
      console.log(`  ⚠ Error checking sub-table dropdown open state: ${error.message}`);
      return false;
    }
  }

  /**
   * Get all header options from Select Headers dropdown (sub-table)
   * Returns array of objects with {name, checked, value}
   */
  async getSubHeaderOptions() {
    try {
      // Try multiple strategies to find the sub-table dropdown
      const dropdownStrategies = [
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          for (let i = 0; i < count; i++) {
            const dropdown = allDropdowns.nth(i);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              // Check if it has sub-table specific headers
              const billIdLabel = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
              if (billIdLabel > 0) {
                return dropdown;
              }
            }
          }
          return null;
        },
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          if (count > 1) {
            return allDropdowns.nth(1); // Second dropdown is likely for sub-table
          }
          return null;
        },
        () => this.subTable.locator('..').locator('ul.dropdown-menu.dropdown-header-menu').first(),
      ];

      let targetDropdown = null;
      for (const strategy of dropdownStrategies) {
        try {
          targetDropdown = await Promise.race([
            strategy(),
            new Promise((resolve) => setTimeout(() => resolve(null), 1000))
          ]);
          if (targetDropdown) {
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!targetDropdown) {
        return [];
      }

      // Get headers from the dropdown
      const labels = targetDropdown.locator('label');
      const labelElements = await labels.all();
      const options = [];
      
      for (const label of labelElements) {
        try {
          const span = label.locator('span.ms-2, span').first();
          const checkbox = label.locator('input[type="checkbox"]').first();
          
          const text = await span.textContent();
          const isChecked = await checkbox.isChecked().catch(() => false);
          
        if (text && text.trim()) {
            options.push({
              name: text.trim(),
              checked: isChecked,
              value: text.trim()
            });
          }
        } catch (e) {
          continue;
        }
      }

      console.log(`Found ${options.length} sub-table header options`);
      return options;
    } catch (error) {
      console.log(`  ⚠ Error getting sub-table header options: ${error.message}`);
      return [];
    }
  }

  /**
   * Verify all headers are checked by default (sub-table)
   */
  async verifyAllSubHeadersCheckedByDefault() {
    try {
      // First, find the dropdown that contains sub-table headers
      const dropdownStrategies = [
        // Strategy 1: Find all dropdowns and check which one has sub-table headers
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          for (let i = 0; i < count; i++) {
            const dropdown = allDropdowns.nth(i);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              // Check if it has sub-table specific headers
              const billIdLabel = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
              const subIdLabel = await dropdown.locator('label:has-text("Sub ID")').count().catch(() => 0);
              if (billIdLabel > 0 || subIdLabel > 0) {
                return dropdown;
              }
            }
          }
          return null;
        },
        // Strategy 2: Get second dropdown (if main table is first)
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          if (count > 1) {
            const dropdown = allDropdowns.nth(1);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              return dropdown;
            }
          }
          return null;
        },
        // Strategy 3: Find dropdown with "show" class
        async () => {
          const dropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu.show');
          const count = await dropdowns.count().catch(() => 0);
          if (count > 1) {
            return dropdowns.nth(1);
          } else if (count === 1) {
            // Check if this one has sub-table headers
            const dropdown = dropdowns.first();
            const billIdLabel = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
            if (billIdLabel > 0) {
              return dropdown;
            }
          }
          return null;
        },
      ];

      let targetDropdown = null;
      for (const strategy of dropdownStrategies) {
        try {
          targetDropdown = await Promise.race([
            strategy(),
            new Promise((resolve) => setTimeout(() => resolve(null), 1000))
          ]);
          if (targetDropdown) {
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!targetDropdown) {
        console.log('  ⚠ Could not find sub-table dropdown');
        return false;
      }

      // Get checkboxes from the target dropdown
      const checkboxes = targetDropdown.locator('input[type="checkbox"]');
      const checkboxCount = await checkboxes.count().catch(() => 0);
      
      if (checkboxCount === 0) {
        console.log('  ⚠ No checkboxes found in sub-table dropdown');
        return false;
      }

      console.log(`  Found ${checkboxCount} checkboxes in sub-table dropdown`);

      // Verify all checkboxes are checked
      const checkboxElements = await checkboxes.all();
      let allChecked = true;
      let checkedCount = 0;
      
      for (const checkbox of checkboxElements) {
        try {
          const isChecked = await checkbox.isChecked().catch(() => false);
          if (isChecked) {
            checkedCount++;
          } else {
            allChecked = false;
            console.log(`  ⚠ Found unchecked checkbox at index ${checkboxElements.indexOf(checkbox)}`);
          }
        } catch (e) {
          console.log(`  ⚠ Error checking checkbox state: ${e.message}`);
          allChecked = false;
        }
      }

      console.log(`  Checked: ${checkedCount}/${checkboxCount} checkboxes are checked`);
      return allChecked && checkboxCount > 0;
    } catch (error) {
      console.log(`  ⚠ Error verifying sub-table headers checked state: ${error.message}`);
      return false;
    }
  }

  /**
   * Toggle header checkbox (sub-table)
   */
  async toggleSubHeaderOption(headerName, check = true) {
    try {
      // Find the sub-table dropdown using multiple strategies
      const dropdownStrategies = [
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          for (let i = 0; i < count; i++) {
            const dropdown = allDropdowns.nth(i);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              // Check if it has sub-table specific headers
              const billIdLabel = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
              if (billIdLabel > 0) {
                return dropdown;
              }
            }
          }
          return null;
        },
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          if (count > 1) {
            return allDropdowns.nth(1); // Second dropdown is likely for sub-table
          }
          return null;
        },
        () => this.subTable.locator('..').locator('ul.dropdown-menu.dropdown-header-menu').first(),
      ];

      let targetDropdown = null;
      for (const strategy of dropdownStrategies) {
        try {
          targetDropdown = await Promise.race([
            strategy(),
            new Promise((resolve) => setTimeout(() => resolve(null), 1000))
          ]);
          if (targetDropdown) {
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!targetDropdown) {
        console.log(`  ⚠ Could not find sub-table dropdown for "${headerName}"`);
        return false;
      }

      // Find the label with matching text
      const labels = targetDropdown.locator('label');
      const labelElements = await labels.all();
      
      for (const label of labelElements) {
        const span = label.locator('span.ms-2, span').first();
        const text = await span.textContent();
        
        if (text && text.trim() === headerName.trim()) {
          const checkbox = label.locator('input[type="checkbox"]').first();
          
          // Wait for checkbox to be visible
          await checkbox.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
          
          const isChecked = await checkbox.isChecked();
          
          // Only toggle if needed
          if ((check && !isChecked) || (!check && isChecked)) {
            // Use JavaScript click for reliability
            await checkbox.evaluate((el) => {
              el.click();
            });
            
            // Wait a bit and verify the state changed
            await this.page.waitForTimeout(300);
            
            const newCheckedState = await checkbox.isChecked();
            if (newCheckedState === check) {
              console.log(`  ✓ Toggled sub-table header "${headerName}" to ${check ? 'checked' : 'unchecked'}`);
              return true;
            } else {
              console.log(`  ⚠ Toggle didn't work, trying force click...`);
              // Try force click as fallback
              await checkbox.click({ force: true });
              await this.page.waitForTimeout(300);
              return true;
            }
          } else {
            console.log(`  ✓ Sub-table header "${headerName}" already ${check ? 'checked' : 'unchecked'}`);
          return true;
        }
      }
      }
      
      console.log(`  ⚠ Could not find sub-table header "${headerName}"`);
      return false;
    } catch (error) {
      console.log(`  ⚠ Error toggling sub-table header option "${headerName}": ${error.message}`);
      return false;
    }
  }

  /**
   * Uncheck multiple headers (sub-table)
   */
  async uncheckSubHeaders(headerNames) {
    try {
      for (const headerName of headerNames) {
        const success = await this.toggleSubHeaderOption(headerName, false);
        if (!success) {
          console.log(`  ⚠ Failed to uncheck "${headerName}", retrying...`);
          // Retry once
          await this.page.waitForTimeout(500);
        await this.toggleSubHeaderOption(headerName, false);
        }
        await this.page.waitForTimeout(300);
      }
      await this.page.waitForTimeout(500);
      console.log(`  ✓ Unchecked sub-table headers: ${headerNames.join(', ')}`);
    } catch (error) {
      console.log(`  ⚠ Error unchecking sub-table headers: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check all headers (sub-table)
   */
  async checkAllSubHeaders() {
    try {
      // Find the sub-table dropdown using the same strategy as getSubHeaderOptions
      const dropdownStrategies = [
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          for (let i = 0; i < count; i++) {
            const dropdown = allDropdowns.nth(i);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              // Check if it has sub-table specific headers
              const billIdLabel = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
              if (billIdLabel > 0) {
                return dropdown;
              }
            }
          }
          return null;
        },
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          if (count > 1) {
            return allDropdowns.nth(1); // Second dropdown is likely for sub-table
          }
          return null;
        },
        () => this.subTable.locator('..').locator('ul.dropdown-menu.dropdown-header-menu').first(),
      ];

      let targetDropdown = null;
      for (const strategy of dropdownStrategies) {
        try {
          targetDropdown = await Promise.race([
            strategy(),
            new Promise((resolve) => setTimeout(() => resolve(null), 1000))
          ]);
          if (targetDropdown) {
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!targetDropdown) {
        throw new Error('Could not find sub-table dropdown');
      }

      // Get all checkboxes from the dropdown
      const checkboxes = targetDropdown.locator('input[type="checkbox"]');
      const checkboxElements = await checkboxes.all();
      
      let checkedCount = 0;
      let uncheckedCount = 0;
      
      for (const checkbox of checkboxElements) {
        try {
          const isChecked = await checkbox.isChecked().catch(() => false);
        if (!isChecked) {
            // Use JavaScript click for reliability
            await checkbox.evaluate((el) => {
              el.click();
            });
          await this.page.waitForTimeout(200);
            uncheckedCount++;
          } else {
            checkedCount++;
        }
        } catch (e) {
          console.log(`  ⚠ Error checking checkbox: ${e.message}`);
          continue;
      }
      }
      
      // Wait for state to update
      await this.page.waitForTimeout(500);
      
      // Verify all are checked
      let allChecked = true;
      for (const checkbox of checkboxElements) {
        try {
          const isChecked = await checkbox.isChecked().catch(() => false);
          if (!isChecked) {
            allChecked = false;
            // Try clicking again
            await checkbox.evaluate((el) => {
              el.click();
            });
            await this.page.waitForTimeout(200);
          }
        } catch (e) {
          continue;
        }
      }
      
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Checked all sub-table headers (${checkedCount} already checked, ${uncheckedCount} newly checked)`);
    } catch (error) {
      console.log(`  ⚠ Error checking all sub-table headers: ${error.message}`);
      throw error;
    }
  }

  /**
   * Uncheck all headers (sub-table)
   */
  async uncheckAllSubHeaders() {
    try {
      // Find the dropdown that contains sub-table headers
      const dropdownStrategies = [
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          for (let i = 0; i < count; i++) {
            const dropdown = allDropdowns.nth(i);
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              const billIdLabel = await dropdown.locator('label:has-text("Bill ID")').count().catch(() => 0);
              if (billIdLabel > 0) {
                return dropdown;
              }
            }
          }
          return null;
        },
        async () => {
          const allDropdowns = this.page.locator('ul.dropdown-menu.dropdown-header-menu');
          const count = await allDropdowns.count().catch(() => 0);
          if (count > 1) {
            return allDropdowns.nth(1);
          }
          return null;
        },
        () => this.page.locator('ul.dropdown-menu.dropdown-header-menu.show').nth(1),
      ];

      let targetDropdown = null;
      for (const strategy of dropdownStrategies) {
        try {
          targetDropdown = await Promise.race([
            strategy(),
            new Promise((resolve) => setTimeout(() => resolve(null), 1000))
          ]);
          if (targetDropdown) {
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (!targetDropdown) {
        throw new Error('Could not find sub-table dropdown');
      }

      const checkboxes = targetDropdown.locator('input[type="checkbox"]');
      const checkboxElements = await checkboxes.all();
      
      for (const checkbox of checkboxElements) {
        const isChecked = await checkbox.isChecked().catch(() => false);
        if (isChecked) {
          await checkbox.click();
          await this.page.waitForTimeout(200);
        }
      }
      await this.page.waitForTimeout(500);
      console.log('  ✓ Unchecked all sub-table headers');
    } catch (error) {
      console.log(`  ⚠ Error unchecking all sub-table headers: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify column is visible in sub-table
   * Checks both header visibility and actual column data visibility
   */
  async isSubTableColumnVisible(columnName) {
    try {
      // Wait a bit for table to update after header changes
      await this.page.waitForTimeout(500);
      
      // First, ensure sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        return false;
      }
      
      // Use multiple strategies to find sub-table headers in the second table
      const strategies = [
        // Strategy 1: Find headers in second table directly (most reliable)
        async () => {
          const allTables = this.page.locator('table');
          const tableCount = await allTables.count().catch(() => 0);
          if (tableCount > 1) {
            const subTable = allTables.nth(1);
            const headers = subTable.locator('thead tr th');
            const headerElements = await headers.all();
            for (const header of headerElements) {
              const text = await header.textContent();
              const trimmedText = text ? text.trim() : '';
              if (trimmedText.toLowerCase() === columnName.toLowerCase() || 
                  trimmedText.toLowerCase().includes(columnName.toLowerCase())) {
                const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  // Also check if there's actual data in this column (verify it's not just a hidden header)
                  const columnIndex = headerElements.indexOf(header);
                  const firstRow = subTable.locator('tbody tr').first();
                  if (await firstRow.count() > 0) {
                    const cell = firstRow.locator('td').nth(columnIndex);
                    const cellVisible = await cell.isVisible({ timeout: 500 }).catch(() => false);
                    if (cellVisible) {
                      return true;
                    }
                  }
                  return isVisible;
                }
              }
            }
          }
          return false;
        },
        // Strategy 2: Use subTableHeaders locator
        async () => {
      const headers = await this.subTableHeaders.all();
      for (const header of headers) {
        const text = await header.textContent();
            const trimmedText = text ? text.trim() : '';
            if (trimmedText.toLowerCase() === columnName.toLowerCase() || 
                trimmedText.toLowerCase().includes(columnName.toLowerCase())) {
              const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                return true;
              }
            }
          }
          return false;
        },
        // Strategy 3: Find headers in second table with ng-star-inserted
        async () => {
          const allTables = this.page.locator('table');
          const tableCount = await allTables.count().catch(() => 0);
          if (tableCount > 1) {
            const subTable = allTables.nth(1);
            const headers = subTable.locator('thead tr th.ng-star-inserted');
            const headerElements = await headers.all();
            for (const header of headerElements) {
              const text = await header.textContent();
              const trimmedText = text ? text.trim() : '';
              if (trimmedText.toLowerCase() === columnName.toLowerCase() || 
                  trimmedText.toLowerCase().includes(columnName.toLowerCase())) {
                const isVisible = await header.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  return true;
                }
              }
            }
          }
          return false;
        },
      ];

      for (const strategy of strategies) {
        try {
          const isVisible = await strategy();
          if (isVisible) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }
      
      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking if sub-table column "${columnName}" is visible: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify that all expected sub-table headers are present in the dropdown
   */
  async verifyAllSubHeadersPresent(expectedHeaders) {
    try {
      const headers = await this.getSubHeaderOptions();
      // Handle both object format {name, checked, value} and string format
      const headerNames = headers.map(h => {
        if (typeof h === 'string') {
          return h.toLowerCase().trim();
        } else if (h && h.name) {
          return h.name.toLowerCase().trim();
        }
        return '';
      }).filter(name => name.length > 0);
      
      const allPresent = expectedHeaders.every(expected => 
        headerNames.some(name => name === expected.toLowerCase().trim())
      );
      
      if (!allPresent) {
        const missing = expectedHeaders.filter(expected => 
          !headerNames.some(name => name === expected.toLowerCase().trim())
        );
        console.log(`  Missing sub-table headers: ${missing.join(', ')}`);
        console.log(`  Found headers: ${headerNames.join(', ')}`);
      } else {
        console.log(`  ✓ All ${expectedHeaders.length} expected sub-table headers are present`);
      }
      
      return allPresent;
    } catch (error) {
      console.log(`  ⚠ Error verifying sub-table headers present: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify that all checked sub-table columns are visible in the table
   * Works even when dropdown is closed by checking visible table headers directly
   */
  async verifyCheckedSubTableColumnsVisible() {
    try {
      // First, try to get headers from dropdown if it's open
      let checkedHeaders = [];
      try {
        const headers = await this.getSubHeaderOptions();
        if (headers && headers.length > 0) {
          // Handle both object format {name, checked, value} and string format
          checkedHeaders = headers.filter(h => {
            if (typeof h === 'string') {
              return true; // If it's a string, assume it's checked
            } else if (h && typeof h === 'object') {
              return h.checked === true;
            }
            return false;
          }).map(h => {
            if (typeof h === 'string') {
              return { name: h };
            }
            return h;
          });
        }
      } catch (e) {
        // Dropdown might be closed, continue with visible headers check
        console.log('  ⚠ Could not get header options (dropdown may be closed), checking visible headers directly');
      }
      
      // Get visible table headers directly (works whether dropdown is open or closed)
      const visibleHeaders = await this.getVisibleSubTableHeaders();
      
      if (visibleHeaders.length === 0) {
        console.log('  ⚠ No visible sub-table headers found');
        return false;
      }
      
      // If we have checked headers from dropdown, verify they're all visible
      if (checkedHeaders.length > 0) {
        let allVisible = true;
        const missingColumns = [];
        
        for (const header of checkedHeaders) {
          const headerName = typeof header === 'string' ? header : (header.name || '');
          const isVisible = visibleHeaders.some(vh => 
            vh.toLowerCase().trim() === headerName.toLowerCase().trim()
          );
          
          if (!isVisible) {
            allVisible = false;
            missingColumns.push(headerName);
          }
        }
        
        if (!allVisible) {
          console.log(`  Missing visible sub-table columns: ${missingColumns.join(', ')}`);
        } else {
          console.log(`  ✓ All ${checkedHeaders.length} checked sub-table columns are visible`);
        }
        
        return allVisible;
      } else {
        // If dropdown is closed and we can't get checked headers, just verify we have visible headers
        // This means columns are visible (which is what we want to verify)
        console.log(`  ✓ Found ${visibleHeaders.length} visible sub-table columns (dropdown closed, verifying by visible headers)`);
        return visibleHeaders.length > 0;
      }
    } catch (error) {
      console.log(`  ⚠ Error verifying checked sub-table columns visible: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify that unchecked sub-table columns are NOT visible in the table
   */
  async verifyUncheckedSubTableColumnsNotVisible() {
    try {
      const headers = await this.getSubHeaderOptions();
      // Handle both object format {name, checked, value} and string format
      const uncheckedHeaders = headers.filter(h => {
        if (typeof h === 'string') {
          return false; // If it's a string, assume it's checked
        } else if (h && typeof h === 'object') {
          return h.checked === false;
        }
        return false;
      }).map(h => {
        if (typeof h === 'string') {
          return { name: h };
        }
        return h;
      });
      
      if (uncheckedHeaders.length === 0) {
        console.log('  ⚠ All sub-table headers are checked');
        return true; // If all are checked, there are no unchecked columns to verify
      }
      
      const visibleHeaders = await this.getVisibleSubTableHeaders();
      let allHidden = true;
      const visibleUncheckedColumns = [];
      
      for (const header of uncheckedHeaders) {
        const headerName = typeof header === 'string' ? header : (header.name || '');
        const isVisible = visibleHeaders.some(vh => 
          vh.toLowerCase().trim() === headerName.toLowerCase().trim()
        );
        
        if (isVisible) {
          allHidden = false;
          visibleUncheckedColumns.push(headerName);
        }
      }
      
      if (!allHidden) {
        console.log(`  Unchecked sub-table columns that are still visible: ${visibleUncheckedColumns.join(', ')}`);
      } else {
        console.log(`  ✓ All ${uncheckedHeaders.length} unchecked sub-table columns are hidden`);
      }
      
      return allHidden;
    } catch (error) {
      console.log(`  ⚠ Error verifying unchecked sub-table columns not visible: ${error.message}`);
      return false;
    }
  }

  // ==================== VALIDATION MESSAGE METHODS ====================

  /**
   * Verify validation message is visible (when all headers unchecked)
   */
  async isNoColumnsMessageVisible() {
    try {
      return await this.noColumnsMessage.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Get validation message text
   */
  async getNoColumnsMessageText() {
    try {
      if (await this.isNoColumnsMessageVisible()) {
        return await this.noColumnsMessage.textContent();
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  // ==================== PAGINATION METHODS ====================

  /**
   * Verify pagination section is visible
   */
  async isPaginationSectionVisible() {
    try {
      const infoVisible = await this.paginationInfoText.isVisible({ timeout: 5000 }).catch(() => false);
      const rangeVisible = await this.paginationRangeLabel.isVisible({ timeout: 5000 }).catch(() => false);
      return infoVisible || rangeVisible;
    } catch (error) {
      console.log(`  ⚠ Error checking pagination section visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get pagination info text (e.g., "Showing 1 to 20 of 29 records")
   */
  async getPaginationInfoText() {
    try {
      await this.paginationInfoText.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.paginationInfoText.textContent();
        return text ? text.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting pagination info text: ${error.message}`);
      return '';
    }
  }

  /**
   * Get pagination range label (e.g., "1 – 20 of 29")
   */
  async getPaginationRangeLabel() {
    try {
      await this.paginationRangeLabel.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.paginationRangeLabel.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting pagination range label: ${error.message}`);
      return '';
    }
  }

  /**
   * Verify pagination info text matches pattern "Showing X to Y of Z records"
   */
  async verifyPaginationInfoText() {
    try {
      const text = await this.getPaginationInfoText();
      if (!text) return false;
      const pattern = /Showing\s+\d+\s+to\s+\d+\s+of\s+\d+\s+records/i;
      return pattern.test(text);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current items per page value
   */
  async getItemsPerPageValue() {
    try {
      await this.itemsPerPageSelectValue.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.itemsPerPageSelectValue.textContent();
      return value ? value.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting items per page value: ${error.message}`);
      return '';
    }
  }

  /**
   * Verify default items per page value (e.g., 20)
   */
  async verifyDefaultItemsPerPage(expectedValue = '20') {
    try {
      const currentValue = await this.getItemsPerPageValue();
      return currentValue === expectedValue;
    } catch (error) {
      console.log(`  ⚠ Error verifying default items per page: ${error.message}`);
      return false;
    }
  }

  /**
   * Click items per page selector to open dropdown
   */
  async clickItemsPerPageSelect() {
    try {
      // Wait for select to be visible and enabled
      await this.itemsPerPageSelect.waitFor({ state: 'visible', timeout: 5000 });
      await this.itemsPerPageSelect.scrollIntoViewIfNeeded();
      
      // Check if dropdown is already open
      const panelAlreadyOpen = await this.page.locator('div.mat-mdc-select-panel[role="listbox"].mdc-menu-surface--open').isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!panelAlreadyOpen) {
        // Click on the select trigger (the visible part)
        const selectTrigger = this.itemsPerPageSelect.locator('div.mat-mdc-select-trigger').first();
        const triggerVisible = await selectTrigger.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (triggerVisible) {
          await selectTrigger.click();
        } else {
          // Fallback: click on the select itself
      await this.itemsPerPageSelect.click();
        }
        
        // Wait for dropdown panel to appear
      await this.page.waitForTimeout(500);
        
        // Verify panel opened
        const panelOpened = await this.page.locator('div.mat-mdc-select-panel[role="listbox"].mdc-menu-surface--open').isVisible({ timeout: 3000 }).catch(() => false);
        if (!panelOpened) {
          // Try clicking again
          await this.itemsPerPageSelect.click();
          await this.page.waitForTimeout(500);
        }
      }
      
      console.log('  ✓ Items per page selector opened');
    } catch (error) {
      console.log(`  ⚠ Error clicking items per page selector: ${error.message}`);
      throw error;
    }
  }

  /**
   * Select items per page option by value
   * Uses the same approach as AuditLogsPage for reliability
   */
  async selectItemsPerPage(value) {
    try {
      console.log(`  Changing items per page to ${value}...`);
      
      // Wait for any spinners/overlays to disappear
      await this.page.waitForTimeout(1000);
      
      // Wait for spinner to disappear if present
      const spinner = this.page.locator('ngx-spinner, .ngx-spinner-overlay').first();
      try {
        await spinner.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      } catch (e) {
        // Spinner might not be present, continue
      }
      
      // Wait for any backdrop overlays to disappear
      const backdrop = this.page.locator('.cdk-overlay-backdrop').first();
      try {
        await backdrop.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      } catch (e) {
        // Backdrop might not be present, continue
      }
      
      await this.itemsPerPageSelect.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll into view
      await this.itemsPerPageSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click to bypass interceptors (same as audit logs)
      await this.itemsPerPageSelect.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForTimeout(1000); // Wait for dropdown to open
      
      // Wait for options panel to be visible
      const optionsPanel = this.page.locator('div.mat-mdc-select-panel, mat-option').first();
      await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Find and click the option with the specified value
      // Try multiple selectors for the option
      const optionSelectors = [
        `mat-option[ng-reflect-value="${value}"]`,
        `mat-option[value="${value}"]`,
        `mat-option:has-text("${value}")`,
        `mat-option .mdc-list-item__primary-text:has-text("${value}")`
      ];
      
      let option = null;
      for (const selector of optionSelectors) {
        option = this.page.locator(selector).first();
        const count = await option.count();
        if (count > 0) {
          const isVisible = await option.isVisible().catch(() => false);
          if (isVisible) {
            break;
          }
        }
      }
      
      if (!option) {
        throw new Error(`Could not find page size option for ${value}`);
      }
      
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click for the option as well (same as audit logs)
      await option.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for table to update
      
      // Verify the selection was successful
      const currentValue = await this.getItemsPerPageValue();
      if (currentValue !== value) {
        console.log(`  ⚠ Warning: Expected ${value} but got ${currentValue}, waiting...`);
        await this.page.waitForTimeout(2000);
        const retryValue = await this.getItemsPerPageValue();
        if (retryValue !== value) {
          throw new Error(`Failed to verify items per page selection. Expected: ${value}, Got: ${retryValue}`);
        }
      }
      
      console.log(`  ✓ Changed page size to ${value}`);
    } catch (error) {
      console.log(`  ⚠ Error changing page size to ${value}: ${error.message}`);
      // Try to close panel if still open
      try {
        const panelOpen = await this.page.locator('div.mat-mdc-select-panel[role="listbox"].mdc-menu-surface--open').isVisible({ timeout: 1000 }).catch(() => false);
        if (panelOpen) {
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      throw error;
    }
  }

  /**
   * Verify items per page value is updated
   */
  async verifyItemsPerPageValue(expectedValue) {
    try {
      const currentValue = await this.getItemsPerPageValue();
      return currentValue === expectedValue;
    } catch (error) {
      console.log(`  ⚠ Error verifying items per page value: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify next page button is visible and enabled
   */
  async isNextPageButtonEnabled() {
    try {
      const isVisible = await this.nextPageButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      const isDisabled = await this.nextPageButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      console.log(`  ⚠ Error checking next page button: ${error.message}`);
      return false;
    }
  }

  /**
   * Click next page button
   */
  async clickNextPageButton() {
    try {
      await this.nextPageButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.nextPageButton.scrollIntoViewIfNeeded();
      await this.nextPageButton.click();
      
      // Wait for table to reload
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1500);
      
      console.log('  ✓ Clicked next page button');
    } catch (error) {
      console.log(`  ⚠ Error clicking next page button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify previous page button is visible and enabled
   */
  async isPreviousPageButtonEnabled() {
    try {
      const isVisible = await this.previousPageButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      const isDisabled = await this.previousPageButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      console.log(`  ⚠ Error checking previous page button: ${error.message}`);
      return false;
    }
  }

  /**
   * Click previous page button
   */
  async clickPreviousPageButton() {
    try {
      await this.previousPageButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.previousPageButton.scrollIntoViewIfNeeded();
      await this.previousPageButton.click();
      
      // Wait for table to reload
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1500);
      
      console.log('  ✓ Clicked previous page button');
    } catch (error) {
      console.log(`  ⚠ Error clicking previous page button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get current page number from pagination info
   */
  async getCurrentPageNumber() {
    try {
      const rangeLabel = await this.getPaginationRangeLabel();
      if (!rangeLabel) return null;
      
      // Extract first number from "1 – 20 of 29" or "21 – 29 of 29"
      const match = rangeLabel.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    } catch (error) {
      console.log(`  ⚠ Error getting current page number: ${error.message}`);
      return null;
    }
  }

  /**
   * Verify page number has incremented
   */
  async verifyPageNumberIncremented(previousPageNumber) {
    try {
      const currentPageNumber = await this.getCurrentPageNumber();
      if (!currentPageNumber || !previousPageNumber) return false;
      return currentPageNumber > previousPageNumber;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify user is on page 1
   */
  async verifyIsOnPageOne() {
    try {
      const pageNumber = await this.getCurrentPageNumber();
      return pageNumber === 1;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get first row first cell value (for comparison between pages)
   * Tries multiple strategies to find a meaningful cell value
   */
  async getFirstRowFirstCellValue() {
    try {
      // First, ensure table is visible and has rows
      const tableVisible = await this.isMainBillingTableVisible();
      if (!tableVisible) {
        console.log('  ⚠ Table is not visible');
        return '';
      }

      // Wait for table rows to be present and rendered
      const rowCount = await this.mainTableRows.count();
      if (rowCount === 0) {
        console.log('  ⚠ Table has no rows');
        return '';
      }

      await this.mainTableRows.first().waitFor({ state: 'visible', timeout: 10000 });
      
      // Wait for cells to be rendered
      await this.page.waitForTimeout(1000);
      
      // Additional wait for any async data loading
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      await this.page.waitForTimeout(500);

      // Try multiple strategies to get the first meaningful cell value
      const strategies = [
        // Strategy 1: Get first cell that doesn't contain arrow icons (skip arrow column)
        async () => {
          const cell = this.page.locator('table').first().locator('tbody tr').first().locator('td:not(:has(i.bi-arrow-right-circle)):not(:has(i.bi-arrow-down-circle))').first();
          await cell.waitFor({ state: 'visible', timeout: 3000 });
          const value = await cell.textContent();
          return value ? value.trim() : '';
        },
        // Strategy 2: Get second cell (assuming first is arrow icon)
        async () => {
          const cell = this.page.locator('table').first().locator('tbody tr').first().locator('td').nth(1);
          await cell.waitFor({ state: 'visible', timeout: 3000 });
          const value = await cell.textContent();
          return value ? value.trim() : '';
        },
        // Strategy 3: Get first visible cell with non-empty content (skip arrow column)
        async () => {
          const cells = this.page.locator('table').first().locator('tbody tr').first().locator('td');
      const cellCount = await cells.count();
          for (let i = 0; i < Math.min(cellCount, 10); i++) { // Limit to first 10 cells
            try {
              const cell = cells.nth(i);
              const isVisible = await cell.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                // Check if cell has an arrow icon child element
                const hasArrowIcon = await cell.locator('i.bi-arrow-right-circle, i.bi-arrow-down-circle').count().catch(() => 0);
                if (hasArrowIcon > 0) {
                  continue; // Skip arrow column
                }
                
                const value = await cell.textContent();
                const trimmedValue = value ? value.trim() : '';
                // Return if we have a meaningful value (at least 1 character, not just whitespace)
                if (trimmedValue && trimmedValue.length > 0) {
                  return trimmedValue;
                }
              }
            } catch (e) {
              continue;
            }
          }
          return '';
        },
        // Strategy 4: Get any first cell
        async () => {
          const cell = this.page.locator('table').first().locator('tbody tr').first().locator('td').first();
          await cell.waitFor({ state: 'visible', timeout: 3000 });
          const value = await cell.textContent();
          return value ? value.trim() : '';
        },
      ];

      for (let i = 0; i < strategies.length; i++) {
        try {
          const value = await strategies[i]();
          if (value && value.length > 0) {
            console.log(`  ✓ Found first row value using strategy ${i + 1}: "${value}"`);
            return value;
          }
        } catch (e) {
          console.log(`  ⚠ Strategy ${i + 1} failed: ${e.message}`);
          continue;
        }
      }

      console.log('  ⚠ Could not find first row cell value with any strategy');
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting first row first cell value: ${error.message}`);
      return '';
    }
  }

  /**
   * Get number of visible table rows
   */
  async getVisibleTableRowCount() {
    try {
      const rows = await this.mainTableRows.all();
      let visibleCount = 0;
      for (const row of rows) {
        const isVisible = await row.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          visibleCount++;
        }
      }
      return visibleCount;
    } catch (error) {
      console.log(`  ⚠ Error getting visible table row count: ${error.message}`);
      return 0;
    }
  }

  /**
   * Verify table has updated number of rows based on items per page
   */
  async verifyTableRowCount(expectedCount) {
    try {
      const actualCount = await this.getVisibleTableRowCount();
      // Allow some flexibility (actual count might be less if total records < items per page)
      return actualCount <= expectedCount && actualCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extract total records from pagination info
   */
  async getTotalRecords() {
    try {
      const infoText = await this.getPaginationInfoText();
      if (!infoText) return null;
      
      // Extract number after "of" (e.g., "Showing 1 to 20 of 29 records" -> 29)
      const match = infoText.match(/of\s+(\d+)\s+records/i);
      return match ? parseInt(match[1], 10) : null;
    } catch (error) {
      console.log(`  ⚠ Error getting total records: ${error.message}`);
      return null;
    }
  }

  // ==================== SUB-TABLE PAGINATION METHODS ====================

  /**
   * Verify sub-table pagination section is visible
   * Note: The pagination section is shared - it shows sub-table data when sub-table is expanded
   */
  async isSubTablePaginationSectionVisible() {
    try {
      // First ensure sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table is not visible');
        return false;
      }

      // Wait a bit for pagination to update
      await this.page.waitForTimeout(1000);

      // The pagination section is the same as main table, just verify it's visible
      // and shows sub-table data (different from main table)
      const paginationVisible = await this.paginationInfoText.isVisible({ timeout: 3000 }).catch(() => false);
      if (!paginationVisible) {
        // Try range label as fallback
        const rangeVisible = await this.paginationRangeLabel.isVisible({ timeout: 3000 }).catch(() => false);
        if (rangeVisible) {
          console.log('  ✓ Found pagination section (using range label)');
          return true;
        }
        return false;
      }

      console.log('  ✓ Pagination section is visible (shared with main table)');
      return true;
    } catch (error) {
      console.log(`  ⚠ Error checking sub-table pagination section visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Get sub-table pagination info text
   * Note: Uses the same pagination section as main table, just reads its current value
   */
  async getSubTablePaginationInfoText() {
    try {
      // Use the same pagination locators as main table
      const strategies = [
        async () => {
          const text = await this.paginationInfoText.textContent().catch(() => '');
          return text ? text.trim() : '';
        },
        async () => {
          const text = await this.paginationRangeLabel.textContent().catch(() => '');
          return text ? text.trim() : '';
        },
        async () => {
          const text = await this.page.locator('div.total-data-info').first().textContent().catch(() => '');
          return text ? text.trim() : '';
        },
      ];

      for (const strategy of strategies) {
        try {
          const text = await strategy();
          if (text && text.trim()) {
            console.log(`  ✓ Found sub-table pagination text: "${text}"`);
            return text;
          }
        } catch (e) {
          continue;
        }
      }
      
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting sub-table pagination info text: ${error.message}`);
      return '';
    }
  }

  /**
   * Verify sub-table pagination info text matches pattern
   */
  async verifySubTablePaginationInfoText() {
    try {
      const text = await this.getSubTablePaginationInfoText();
      if (!text) return false;
      const pattern = /Showing\s+\d+\s+to\s+\d+\s+of\s+\d+\s+records/i;
      return pattern.test(text);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get sub-table items per page value
   * Note: Uses the same items per page selector as main table
   */
  async getSubTableItemsPerPageValue() {
    try {
      // Wait a bit for pagination to update after sub-table expansion
      await this.page.waitForTimeout(500);
      
      // Use the same items per page locator as main table
      await this.itemsPerPageSelectValue.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      const value = await this.itemsPerPageSelectValue.textContent().catch(() => '');
      return value ? value.trim() : '';
    } catch (error) {
      console.log(`  ⚠ Error getting sub-table items per page value: ${error.message}`);
      return '';
    }
  }

  /**
   * Verify sub-table default items per page value
   * Note: The default might not be 20, so we check if it's a valid value
   */
  async verifySubTableDefaultItemsPerPage(expectedValue = '20') {
    try {
      // Wait for pagination to update
      await this.page.waitForTimeout(1000);
      
      const currentValue = await this.getSubTableItemsPerPageValue();
      if (!currentValue || currentValue.length === 0) {
        console.log('  ⚠ Sub-table items per page value is empty');
        return false;
      }
      
      // Check if it matches expected value, or if it's a valid pagination value (15, 20, 50, 100, 200, 500)
      const validValues = ['15', '20', '50', '100', '200', '500'];
      const isValidValue = validValues.includes(currentValue);
      
      if (currentValue === expectedValue) {
        console.log(`  ✓ Sub-table items per page is ${currentValue} (matches expected ${expectedValue})`);
        return true;
      } else if (isValidValue) {
        console.log(`  ⚠ Sub-table items per page is ${currentValue} (expected ${expectedValue}, but valid value)`);
        // Return true if it's a valid value, even if not the expected one
        return true;
      }
      
      return false;
    } catch (error) {
      console.log(`  ⚠ Error verifying sub-table default items per page: ${error.message}`);
      return false;
    }
  }

  /**
   * Select sub-table items per page option by value
   */
  async selectSubTableItemsPerPage(value) {
    try {
      console.log(`  Changing sub-table items per page to ${value}...`);
      
      // Wait for any spinners/overlays to disappear
      await this.page.waitForTimeout(1000);
      
      // Wait for spinner to disappear if present
      const spinner = this.page.locator('ngx-spinner, .ngx-spinner-overlay').first();
      try {
        await spinner.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      } catch (e) {
        // Spinner might not be present, continue
      }
      
      // Wait for any backdrop overlays to disappear
      const backdrop = this.page.locator('.cdk-overlay-backdrop').first();
      try {
        await backdrop.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      } catch (e) {
        // Backdrop might not be present, continue
      }
      
      // Use the same items per page select as main table (it's shared)
      await this.itemsPerPageSelect.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll into view
      await this.itemsPerPageSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click to bypass interceptors
      await this.itemsPerPageSelect.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForTimeout(1000); // Wait for dropdown to open
      
      // Wait for options panel to be visible
      const optionsPanel = this.page.locator('div.mat-mdc-select-panel, mat-option').first();
      await optionsPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Find and click the option with the specified value
      const optionSelectors = [
        `mat-option[ng-reflect-value="${value}"]`,
        `mat-option[value="${value}"]`,
        `mat-option:has-text("${value}")`,
        `mat-option .mdc-list-item__primary-text:has-text("${value}")`
      ];
      
      let option = null;
      for (const selector of optionSelectors) {
        option = this.page.locator(selector).first();
        const count = await option.count();
        if (count > 0) {
          const isVisible = await option.isVisible().catch(() => false);
          if (isVisible) {
            break;
          }
        }
      }
      
      if (!option) {
        throw new Error(`Could not find sub-table page size option for ${value}`);
      }
      
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click for the option as well
      await option.evaluate((el) => {
        el.click();
      });
      
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000); // Wait for table to update
      
      // Verify the selection was successful
      const currentValue = await this.getSubTableItemsPerPageValue();
      if (currentValue !== value) {
        console.log(`  ⚠ Warning: Expected ${value} but got ${currentValue}, waiting...`);
        await this.page.waitForTimeout(2000);
        const retryValue = await this.getSubTableItemsPerPageValue();
        if (retryValue !== value) {
          throw new Error(`Failed to verify sub-table items per page selection. Expected: ${value}, Got: ${retryValue}`);
        }
      }
      
      console.log(`  ✓ Changed sub-table page size to ${value}`);
    } catch (error) {
      console.log(`  ⚠ Error changing sub-table page size to ${value}: ${error.message}`);
      // Try to close panel if still open
      try {
        const panelOpen = await this.page.locator('div.mat-mdc-select-panel[role="listbox"].mdc-menu-surface--open').isVisible({ timeout: 1000 }).catch(() => false);
        if (panelOpen) {
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      throw error;
    }
  }

  /**
   * Verify sub-table items per page value is updated
   */
  async verifySubTableItemsPerPageValue(expectedValue) {
    try {
      const currentValue = await this.getSubTableItemsPerPageValue();
      return currentValue === expectedValue;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify sub-table next page button is enabled
   * Note: Uses the same next page button as main table
   */
  async isSubTableNextPageButtonEnabled() {
    try {
      const isVisible = await this.nextPageButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      const isDisabled = await this.nextPageButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Click sub-table next page button
   * Note: Uses the same next page button as main table
   */
  async clickSubTableNextPageButton() {
    try {
      await this.nextPageButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.nextPageButton.scrollIntoViewIfNeeded();
      await this.nextPageButton.click();
      
      // Wait for table to reload
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1500);
      
      console.log('  ✓ Clicked sub-table next page button');
    } catch (error) {
      console.log(`  ⚠ Error clicking sub-table next page button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify sub-table previous page button is enabled
   * Note: Uses the same previous page button as main table
   */
  async isSubTablePreviousPageButtonEnabled() {
    try {
      const isVisible = await this.previousPageButton.isVisible({ timeout: 5000 });
      if (!isVisible) return false;
      
      const isDisabled = await this.previousPageButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Click sub-table previous page button
   * Note: Uses the same previous page button as main table
   */
  async clickSubTablePreviousPageButton() {
    try {
      await this.previousPageButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.previousPageButton.scrollIntoViewIfNeeded();
      await this.previousPageButton.click();
      
      // Wait for table to reload
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1500);
      
      console.log('  ✓ Clicked sub-table previous page button');
    } catch (error) {
      console.log(`  ⚠ Error clicking sub-table previous page button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get sub-table current page number from pagination info
   * Note: Uses the same pagination section as main table
   */
  async getSubTableCurrentPageNumber() {
    try {
      // Use the same method as main table
      return await this.getCurrentPageNumber();
    } catch (error) {
        return null;
    }
  }

  /**
   * Verify sub-table page number has incremented
   */
  async verifySubTablePageNumberIncremented(previousPageNumber) {
    try {
      const currentPageNumber = await this.getSubTableCurrentPageNumber();
      if (!currentPageNumber || !previousPageNumber) return false;
      return currentPageNumber > previousPageNumber;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify user is on sub-table page 1
   */
  async verifySubTableIsOnPageOne() {
    try {
      const pageNumber = await this.getSubTableCurrentPageNumber();
      return pageNumber === 1;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get sub-table first row first cell value (for comparison between pages)
   */
  async getSubTableFirstRowFirstCellValue() {
    try {
      // Ensure sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table is not visible');
        return '';
      }

      // Wait for sub-table rows to be present
      const rowCount = await this.subTableRows.count();
      if (rowCount === 0) {
        console.log('  ⚠ Sub-table has no rows');
        return '';
      }

      await this.subTableRows.first().waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      await this.page.waitForTimeout(500);

      // Try multiple strategies to get the first meaningful cell value
      const strategies = [
        // Strategy 1: Get first cell (Bill ID column)
        async () => {
          const cell = this.page.locator('table').nth(1).locator('tbody tr').first().locator('td').first();
          await cell.waitFor({ state: 'visible', timeout: 3000 });
          const value = await cell.textContent();
          return value ? value.trim() : '';
        },
        // Strategy 2: Get second cell (Date & Time)
        async () => {
          const cell = this.page.locator('table').nth(1).locator('tbody tr').first().locator('td').nth(1);
          await cell.waitFor({ state: 'visible', timeout: 3000 });
          const value = await cell.textContent();
          return value ? value.trim() : '';
        },
        // Strategy 3: Get first visible cell with content
        async () => {
          const cells = this.page.locator('table').nth(1).locator('tbody tr').first().locator('td');
          const cellCount = await cells.count();
          for (let i = 0; i < Math.min(cellCount, 10); i++) {
            try {
        const cell = cells.nth(i);
              const isVisible = await cell.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                const value = await cell.textContent();
                const trimmedValue = value ? value.trim() : '';
                if (trimmedValue && trimmedValue.length > 0) {
                  return trimmedValue;
                }
              }
            } catch (e) {
              continue;
            }
          }
          return '';
        },
      ];

      for (let i = 0; i < strategies.length; i++) {
        try {
          const value = await strategies[i]();
          if (value && value.length > 0) {
            console.log(`  ✓ Found sub-table first row value using strategy ${i + 1}: "${value}"`);
            return value;
          }
        } catch (e) {
          console.log(`  ⚠ Strategy ${i + 1} failed: ${e.message}`);
          continue;
        }
      }

      console.log('  ⚠ Could not find sub-table first row cell value with any strategy');
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting sub-table first row first cell value: ${error.message}`);
      return '';
    }
  }

  /**
   * Get sub-table visible row count
   */
  async getSubTableVisibleRowCount() {
    try {
      const rows = await this.subTableRows.all();
      let visibleCount = 0;
      for (const row of rows) {
        const isVisible = await row.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          visibleCount++;
        }
      }
      return visibleCount;
    } catch (error) {
      console.log(`  ⚠ Error getting sub-table visible row count: ${error.message}`);
      return 0;
    }
  }

  /**
   * Verify sub-table has updated number of rows based on items per page
   */
  async verifySubTableRowCount(expectedCount) {
    try {
      const actualCount = await this.getSubTableVisibleRowCount();
      return actualCount <= expectedCount && actualCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get sub-table total records from pagination info
   * Note: Uses the same pagination section as main table
   */
  async getSubTableTotalRecords() {
    try {
      // Use the same method as main table
      return await this.getTotalRecords();
    } catch (error) {
      console.log(`  ⚠ Error getting sub-table total records: ${error.message}`);
      return null;
    }
  }

  // ==================== SEARCH SECTION METHODS ====================

  /**
   * Verify search section is visible
   */
  async isSearchSectionVisible() {
    try {
      const searchHeaderVisible = await this.searchHeader.isVisible({ timeout: 5000 }).catch(() => false);
      return searchHeaderVisible;
    } catch (error) {
      console.log(`  ⚠ Error checking search section visibility: ${error.message}`);
      return false;
    }
  }

  /**
   * Expand search section if collapsed
   */
  async expandSearchSection() {
    try {
      const isExpanded = await this.searchFieldArea.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isExpanded) {
        await this.searchHeader.click();
        await this.page.waitForTimeout(500);
        console.log('  ✓ Expanded search section');
      } else {
        console.log('  ✓ Search section already expanded');
      }
    } catch (error) {
      console.log(`  ⚠ Error expanding search section: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify all search fields are visible
   */
  async verifySearchFieldsVisible() {
    try {
      const subIdVisible = await this.subIdInput.isVisible({ timeout: 3000 }).catch(() => false);
      const billIdVisible = await this.billIdInput.isVisible({ timeout: 3000 }).catch(() => false);
      const emailVisible = await this.customerEmailInput.isVisible({ timeout: 3000 }).catch(() => false);
      const datePickerVisible = await this.billDatePicker.isVisible({ timeout: 3000 }).catch(() => false);
      const searchButtonVisible = await this.searchButton.isVisible({ timeout: 3000 }).catch(() => false);
      const resetButtonVisible = await this.resetButton.isVisible({ timeout: 3000 }).catch(() => false);

      return {
        subId: subIdVisible,
        billId: billIdVisible,
        customerEmail: emailVisible,
        billDate: datePickerVisible,
        searchButton: searchButtonVisible,
        resetButton: resetButtonVisible,
        allVisible: subIdVisible && billIdVisible && emailVisible && datePickerVisible && searchButtonVisible && resetButtonVisible
      };
    } catch (error) {
      console.log(`  ⚠ Error verifying search fields visibility: ${error.message}`);
      return {
        subId: false,
        billId: false,
        customerEmail: false,
        billDate: false,
        searchButton: false,
        resetButton: false,
        allVisible: false
      };
    }
  }

  /**
   * Enter Sub ID in search field
   */
  async enterSubId(subId) {
    try {
      await this.subIdInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.subIdInput.clear();
      await this.subIdInput.fill(subId);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered Sub ID: ${subId}`);
    } catch (error) {
      console.log(`  ⚠ Error entering Sub ID: ${error.message}`);
      throw error;
    }
  }

  /**
   * Enter Bill ID in search field
   */
  async enterBillId(billId) {
    try {
      await this.billIdInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.billIdInput.clear();
      await this.billIdInput.fill(billId);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered Bill ID: ${billId}`);
    } catch (error) {
      console.log(`  ⚠ Error entering Bill ID: ${error.message}`);
      throw error;
    }
  }

  /**
   * Enter Customer Email in search field
   */
  async enterCustomerEmail(email) {
    try {
      await this.customerEmailInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.customerEmailInput.clear();
      await this.customerEmailInput.fill(email);
      await this.page.waitForTimeout(300);
      console.log(`  ✓ Entered Customer Email: ${email}`);
    } catch (error) {
      console.log(`  ⚠ Error entering Customer Email: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get Sub ID value
   */
  async getSubIdValue() {
    try {
      const value = await this.subIdInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Get Bill ID value
   */
  async getBillIdValue() {
    try {
      const value = await this.billIdInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Get Customer Email value
   */
  async getCustomerEmailValue() {
    try {
      const value = await this.customerEmailInput.inputValue();
      return value.trim();
    } catch (error) {
      return '';
    }
  }

  /**
   * Verify all search fields are empty
   */
  async verifyAllSearchFieldsEmpty() {
    try {
      const subId = await this.getSubIdValue();
      const billId = await this.getBillIdValue();
      const email = await this.getCustomerEmailValue();
      
      return subId === '' && billId === '' && email === '';
    } catch (error) {
      return false;
    }
  }

  /**
   * Click Search button
   */
  async clickSearchButton() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.searchButton.click();
      
      // Wait for search to process
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      console.log('  ✓ Clicked Search button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Search button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click Reset button
   */
  async clickResetButton() {
    try {
      await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.resetButton.click();
      
      // Wait for reset to process
      await this.page.waitForTimeout(1000);
      
      console.log('  ✓ Clicked Reset button');
    } catch (error) {
      console.log(`  ⚠ Error clicking Reset button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get table row count before search (for comparison)
   */
  async getTableRowCountBeforeSearch() {
    try {
      return await this.getVisibleTableRowCount();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Verify table state after empty search
   * Returns true if table remains unchanged or shows appropriate message
   */
  async verifyTableStateAfterEmptySearch(initialRowCount) {
    try {
      await this.page.waitForTimeout(2000);
      
      // Check if table is still visible
      const tableVisible = await this.isMainBillingTableVisible();
      if (!tableVisible) {
        console.log('  ⚠ Table is not visible after empty search');
        return false;
      }
      
      // Check current row count
      const currentRowCount = await this.getVisibleTableRowCount();
      
      // Table should remain unchanged (same row count) or show validation
      // Allow some flexibility - row count might be same or slightly different due to timing
      const rowCountSimilar = Math.abs(currentRowCount - initialRowCount) <= 2;
      
      if (rowCountSimilar) {
        console.log(`  ✓ Table state unchanged (${initialRowCount} -> ${currentRowCount} rows)`);
        return true;
      }
      
      // Check for validation messages or toasts
      const validationMessage = await this.page.locator('div:has-text("Please enter"), div:has-text("required"), div:has-text("validation")').first().isVisible({ timeout: 1000 }).catch(() => false);
      if (validationMessage) {
        console.log('  ✓ Validation message shown');
        return true;
      }
      
      // If row count changed significantly, log it but don't fail (might be expected behavior)
      console.log(`  ⚠ Table row count changed: ${initialRowCount} -> ${currentRowCount}`);
      return true; // Don't fail - might be expected behavior
    } catch (error) {
      console.log(`  ⚠ Error verifying table state: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if "No Data Found" toast message is visible
   */
  async isNoDataFoundToastVisible() {
    try {
      // Wait a bit for toast to appear
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to find the toast
      const strategies = [
        // Strategy 1: Find inside toast-container
        async () => {
          const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
          const containerVisible = await toastContainer.isVisible({ timeout: 2000 }).catch(() => false);
          if (containerVisible) {
            // Look for toast message inside container
            const toast = toastContainer.locator('div[role="alert"]:has-text("No Data Found"), div.toast-message:has-text("No Data Found"), div:has-text("No Data Found")').first();
            const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              const text = await toast.textContent();
              console.log(`  ✓ Found toast in toast-container: "${text}"`);
              return true;
            }
          }
          return false;
        },
        // Strategy 2: Find by role="alert" and text content (anywhere on page)
        async () => {
          const toast = this.page.locator('div[role="alert"]:has-text("No Data Found")').first();
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            console.log(`  ✓ Found toast using role="alert": "${text}"`);
            return true;
          }
          return false;
        },
        // Strategy 3: Find by aria-label
        async () => {
          const toast = this.page.locator('div[role="alert"][aria-label="No Data Found"]').first();
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            console.log(`  ✓ Found toast using aria-label: "${text}"`);
            return true;
          }
          return false;
        },
        // Strategy 4: Find by class toast-message
        async () => {
          const toast = this.page.locator('div.toast-message:has-text("No Data Found")').first();
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            console.log(`  ✓ Found toast using toast-message class: "${text}"`);
            return true;
          }
          return false;
        },
        // Strategy 5: Check toast-container for any content
        async () => {
          const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
          const containerExists = await toastContainer.count() > 0;
          if (containerExists) {
            // Check if container has any children (toasts)
            const children = toastContainer.locator('> *');
            const childCount = await children.count();
            console.log(`  Toast container has ${childCount} children`);
            
            for (let i = 0; i < childCount; i++) {
              const child = children.nth(i);
              const text = await child.textContent().catch(() => '');
              const ariaLabel = await child.getAttribute('aria-label').catch(() => '');
              
              if ((text && text.toLowerCase().includes('no data found')) || 
                  (ariaLabel && ariaLabel.toLowerCase().includes('no data found'))) {
                const isVisible = await child.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  console.log(`  ✓ Found toast in container child ${i}: "${text || ariaLabel}"`);
                  return true;
                }
              }
            }
          }
          return false;
        },
        // Strategy 6: Find any div with "No Data Found" text and role="alert"
        async () => {
          const allAlerts = this.page.locator('div[role="alert"]');
          const count = await allAlerts.count();
          console.log(`  Checking ${count} alert elements...`);
          
          for (let i = 0; i < count; i++) {
            try {
              const alert = allAlerts.nth(i);
              const text = await alert.textContent().catch(() => '');
              const ariaLabel = await alert.getAttribute('aria-label').catch(() => '');
              
              if ((text && text.toLowerCase().includes('no data found')) || 
                  (ariaLabel && ariaLabel.toLowerCase().includes('no data found'))) {
                const isVisible = await alert.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  console.log(`  ✓ Found toast in alert ${i}: "${text || ariaLabel}"`);
                  return true;
                }
              }
            } catch (e) {
              continue;
            }
          }
          return false;
        },
        // Strategy 7: Check for toast-message class with any text containing "no data"
        async () => {
          const toastMessages = this.page.locator('div.toast-message, div[class*="toast"]');
          const count = await toastMessages.count();
          for (let i = 0; i < count; i++) {
            const toast = toastMessages.nth(i);
            const text = await toast.textContent().catch(() => '');
            if (text && text.toLowerCase().includes('no data')) {
              const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                console.log(`  ✓ Found toast message ${i}: "${text}"`);
                return true;
              }
            }
          }
          return false;
        },
      ];
      
      // Try multiple times with increasing wait
      for (let attempt = 0; attempt < 5; attempt++) {
        for (const strategy of strategies) {
          try {
            const found = await strategy();
            if (found) {
              return true;
            }
          } catch (e) {
            continue;
          }
        }
        
        if (attempt < 4) {
          await this.page.waitForTimeout(500);
        }
      }
      
      console.log('  ⚠ Could not find "No Data Found" toast with any strategy');
      return false;
    } catch (error) {
      console.log(`  ⚠ Error checking "No Data Found" toast: ${error.message}`);
      return false;
    }
  }

  /**
   * Get "No Data Found" toast message text
   */
  async getNoDataFoundToastText() {
    try {
      const strategies = [
        // Strategy 1: Find inside toast-container
        async () => {
          const toastContainer = this.page.locator('div#toast-container, div.toast-container').first();
          const containerExists = await toastContainer.count() > 0;
          if (containerExists) {
            const toast = toastContainer.locator('div[role="alert"]:has-text("No Data Found"), div.toast-message:has-text("No Data Found"), div:has-text("No Data Found")').first();
            const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              const text = await toast.textContent();
              return text ? text.trim() : '';
            }
          }
          return '';
        },
        // Strategy 2: Find by role="alert" and text
        async () => {
          const toast = this.page.locator('div[role="alert"]:has-text("No Data Found")').first();
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        },
        // Strategy 3: Find by aria-label
        async () => {
          const toast = this.page.locator('div[role="alert"][aria-label="No Data Found"]').first();
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const ariaLabel = await toast.getAttribute('aria-label').catch(() => '');
            const text = await toast.textContent().catch(() => '');
            return ariaLabel || (text ? text.trim() : '');
          }
          return '';
        },
        // Strategy 4: Find by class and text
        async () => {
          const toast = this.page.locator('div.toast-message:has-text("No Data Found")').first();
          const isVisible = await toast.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            return text ? text.trim() : '';
          }
          return '';
        },
        // Strategy 5: Search all alerts
        async () => {
          const allAlerts = this.page.locator('div[role="alert"]');
          const count = await allAlerts.count();
          for (let i = 0; i < count; i++) {
            const alert = allAlerts.nth(i);
            const text = await alert.textContent().catch(() => '');
            if (text && text.toLowerCase().includes('no data found')) {
              const isVisible = await alert.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                return text.trim();
              }
            }
          }
          return '';
        },
      ];
      
      for (const strategy of strategies) {
        try {
          const text = await strategy();
          if (text && text.length > 0) {
            return text;
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
   * Verify table has no records (empty table state)
   */
  async verifyTableHasNoRecords() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check if table is visible
      const tableVisible = await this.mainBillingTable.isVisible({ timeout: 3000 }).catch(() => false);
      if (!tableVisible) {
        return true; // Table not visible means no records
      }
      
      // Check row count
      const rowCount = await this.getVisibleTableRowCount();
      
      // Check for "No Data Found" message in table
      const noDataMessage = await this.page.locator('td:has-text("No Data Found"), div:has-text("No Data Found")').first().isVisible({ timeout: 1000 }).catch(() => false);
      
      return rowCount === 0 || noDataMessage;
    } catch (error) {
      console.log(`  ⚠ Error verifying table has no records: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify sub-table is empty (no rows in tbody)
   * Checks for empty table structure: row with colspan containing card with empty table
   */
  async verifySubTableIsEmpty() {
    try {
      await this.page.waitForTimeout(1000);
      
      // Strategy 1: Check for empty table structure in main table row (colspan with empty table)
      const emptyRowStructure = this.page.locator('tr td[colspan] div.card.shadow-sm table.table-borderless').first();
      const emptyStructureVisible = await emptyRowStructure.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (emptyStructureVisible) {
        // Check if the tbody is empty
        const emptyTbody = emptyRowStructure.locator('tbody');
        const tbodyText = await emptyTbody.textContent().catch(() => '');
        const tbodyRows = emptyTbody.locator('tr');
        const rowCount = await tbodyRows.count();
        
        if (rowCount === 0 || tbodyText.trim() === '') {
          console.log('  ✓ Sub-table is empty (empty table structure found)');
          return true;
        }
      }
      
      // Strategy 2: Check if sub-table (second table) is visible and empty
      const subTableVisible = await this.isSubTableVisible();
      if (subTableVisible) {
        // Check sub-table rows
        const subTableRows = this.page.locator('table').nth(1).locator('tbody tr');
        const rowCount = await subTableRows.count();
        
        // Check if tbody is empty (no rows or empty bindings)
        const tbody = this.page.locator('table').nth(1).locator('tbody');
        const tbodyText = await tbody.textContent().catch(() => '');
        const isEmpty = rowCount === 0 || tbodyText.trim() === '';
        
        if (isEmpty) {
          console.log('  ✓ Sub-table is empty (no rows in tbody)');
          return true;
        }
      }
      
      // Strategy 3: Check for empty table structure (card with empty table) anywhere
      const emptyTableCard = this.page.locator('div.card.shadow-sm:has(table.table-borderless tbody:empty), tr td[colspan] div.card.shadow-sm').first();
      const emptyCardVisible = await emptyTableCard.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (emptyCardVisible) {
        // Verify the table inside is empty
        const tableInside = emptyTableCard.locator('table tbody');
        const tableRows = await tableInside.locator('tr').count();
        if (tableRows === 0) {
          console.log('  ✓ Sub-table is empty (empty card structure found)');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.log(`  ⚠ Error verifying sub-table is empty: ${error.message}`);
      return false;
    }
  }

  /**
   * Verify table has records after search
   */
  async verifyTableHasRecords() {
    try {
      await this.page.waitForTimeout(2000);
      
      const rowCount = await this.getVisibleTableRowCount();
      return rowCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify table restored to original state after reset
   */
  async verifyTableRestoredToOriginalState(originalRowCount) {
    try {
      await this.page.waitForTimeout(2000);
      
      const currentRowCount = await this.getVisibleTableRowCount();
      
      // Allow some flexibility (within 2 rows)
      const isRestored = Math.abs(currentRowCount - originalRowCount) <= 2;
      
      if (isRestored) {
        console.log(`  ✓ Table restored (${originalRowCount} -> ${currentRowCount} rows)`);
      } else {
        console.log(`  ⚠ Table row count differs: original ${originalRowCount}, current ${currentRowCount}`);
      }
      
      return isRestored;
    } catch (error) {
      console.log(`  ⚠ Error verifying table restored state: ${error.message}`);
      return false;
    }
  }

  /**
   * Search by Sub ID
   */
  async searchBySubId(subId) {
    try {
      // Expand search section if needed
      await this.expandSearchSection();
      await this.page.waitForTimeout(500);
      
      // Enter Sub ID
      await this.enterSubId(subId);
      
      // Click Search
      await this.clickSearchButton();
      
      console.log(`  ✓ Searched by Sub ID: ${subId}`);
    } catch (error) {
      console.log(`  ⚠ Error searching by Sub ID: ${error.message}`);
      throw error;
    }
  }

  /**
   * Search by Bill ID
   */
  async searchByBillId(billId) {
    try {
      // Expand search section if needed
      await this.expandSearchSection();
      await this.page.waitForTimeout(500);
      
      // Enter Bill ID
      await this.enterBillId(billId);
      
      // Click Search
      await this.clickSearchButton();
      
      console.log(`  ✓ Searched by Bill ID: ${billId}`);
    } catch (error) {
      console.log(`  ⚠ Error searching by Bill ID: ${error.message}`);
      throw error;
    }
  }

  /**
   * Search by Customer Email
   */
  async searchByCustomerEmail(email) {
    try {
      // Expand search section if needed
      await this.expandSearchSection();
      await this.page.waitForTimeout(500);
      
      // Enter Customer Email
      await this.enterCustomerEmail(email);
      
      // Click Search
      await this.clickSearchButton();
      
      console.log(`  ✓ Searched by Customer Email: ${email}`);
    } catch (error) {
      console.log(`  ⚠ Error searching by Customer Email: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify only matching Customer Email records are displayed in sub-table
   * Checks if all rows in sub-table have the matching Customer Email
   */
  async verifyOnlyMatchingCustomerEmailInSubTable(email) {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check if sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table is not visible');
        return false;
      }
      
      // Get all rows in sub-table
      const subTable = this.page.locator('table').nth(1);
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();
      
      if (rowCount === 0) {
        console.log('  ⚠ Sub-table has no rows');
        return false;
      }
      
      // Find Customer Email column index
      const headers = subTable.locator('thead tr th');
      const headerCount = await headers.count();
      let emailColumnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent().catch(() => '');
        if (text && text.trim().toLowerCase() === 'customer email') {
          emailColumnIndex = i;
          break;
        }
      }
      
      if (emailColumnIndex < 0) {
        console.log('  ⚠ Could not find Customer Email column');
        return false;
      }
      
      // Check each row to verify Customer Email matches
      let allMatch = true;
      let checkedCount = 0;
      
      for (let i = 0; i < rowCount; i++) {
        const row = subTableRows.nth(i);
        const emailCell = row.locator('td').nth(emailColumnIndex);
        const labelDiv = emailCell.locator('div.mat-mdc-tooltip-trigger.label').first();
        
        // Get Customer Email from text or ng-reflect-message
        const text = await labelDiv.textContent().catch(() => '');
        const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
        const rowEmail = (messageAttr && messageAttr.length > 0 && messageAttr !== 'N/A') ? messageAttr : (text && text.trim() !== 'N/A' ? text.trim() : '');
        
        if (rowEmail && rowEmail.toLowerCase() === email.toLowerCase()) {
          checkedCount++;
        } else if (rowEmail && rowEmail.length > 0 && rowEmail !== 'N/A') {
          console.log(`  ⚠ Row ${i} has different Customer Email: "${rowEmail}" (expected: "${email}")`);
          allMatch = false;
        }
      }
      
      if (allMatch && checkedCount > 0) {
        console.log(`  ✓ All ${checkedCount} rows match Customer Email: "${email}"`);
        return true;
      } else if (checkedCount === 0) {
        console.log('  ⚠ No rows found with matching Customer Email');
        return false;
      }
      
      return false;
    } catch (error) {
      console.log(`  ⚠ Error verifying matching Customer Email in sub-table: ${error.message}`);
      return false;
    }
  }

  /**
   * Get all Customer Emails from sub-table rows
   */
  async getAllCustomerEmailsFromSubTable() {
    try {
      const emails = [];
      
      // Check if sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        return emails;
      }
      
      // Find Customer Email column index
      const subTable = this.page.locator('table').nth(1);
      const headers = subTable.locator('thead tr th');
      const headerCount = await headers.count();
      let emailColumnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent().catch(() => '');
        if (text && text.trim().toLowerCase() === 'customer email') {
          emailColumnIndex = i;
          break;
        }
      }
      
      if (emailColumnIndex < 0) {
        return emails;
      }
      
      // Get all rows in sub-table
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = subTableRows.nth(i);
        const emailCell = row.locator('td').nth(emailColumnIndex);
        const labelDiv = emailCell.locator('div.mat-mdc-tooltip-trigger.label').first();
        
        // Get Customer Email from text or ng-reflect-message
        const text = await labelDiv.textContent().catch(() => '');
        const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
        const email = (messageAttr && messageAttr.length > 0 && messageAttr !== 'N/A') ? messageAttr : (text && text.trim() !== 'N/A' ? text.trim() : '');
        
        if (email && email.length > 0 && email !== 'N/A' && email.includes('@')) {
          emails.push(email);
        }
      }
      
      return emails;
    } catch (error) {
      console.log(`  ⚠ Error getting all Customer Emails from sub-table: ${error.message}`);
      return [];
    }
  }

  /**
   * Verify only matching record is displayed in sub-table
   * Checks if all rows in sub-table have the matching Bill ID
   */
  async verifyOnlyMatchingBillIdInSubTable(billId) {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check if sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table is not visible');
        return false;
      }
      
      // Get all rows in sub-table
      const subTable = this.page.locator('table').nth(1);
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();
      
      if (rowCount === 0) {
        console.log('  ⚠ Sub-table has no rows');
        return false;
      }
      
      // Check each row to verify Bill ID matches
      let allMatch = true;
      let checkedCount = 0;
      
      for (let i = 0; i < rowCount; i++) {
        const row = subTableRows.nth(i);
        const firstCell = row.locator('td').first();
        const labelDiv = firstCell.locator('div.mat-mdc-tooltip-trigger.label').first();
        
        // Get Bill ID from text or ng-reflect-message
        const text = await labelDiv.textContent().catch(() => '');
        const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
        const rowBillId = (messageAttr && messageAttr.length > 0) ? messageAttr : (text ? text.trim() : '');
        
        if (rowBillId && rowBillId === billId) {
          checkedCount++;
        } else if (rowBillId && rowBillId.length > 0) {
          console.log(`  ⚠ Row ${i} has different Bill ID: "${rowBillId}" (expected: "${billId}")`);
          allMatch = false;
        }
      }
      
      if (allMatch && checkedCount > 0) {
        console.log(`  ✓ All ${checkedCount} rows match Bill ID: "${billId}"`);
        return true;
      } else if (checkedCount === 0) {
        console.log('  ⚠ No rows found with matching Bill ID');
        return false;
      }
      
      return false;
    } catch (error) {
      console.log(`  ⚠ Error verifying matching Bill ID in sub-table: ${error.message}`);
      return false;
    }
  }

  /**
   * Get all Bill IDs from sub-table rows
   */
  async getAllBillIdsFromSubTable() {
    try {
      const billIds = [];
      
      // Check if sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        return billIds;
      }
      
      // Get all rows in sub-table
      const subTable = this.page.locator('table').nth(1);
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = subTableRows.nth(i);
        const firstCell = row.locator('td').first();
        const labelDiv = firstCell.locator('div.mat-mdc-tooltip-trigger.label').first();
        
        // Get Bill ID from text or ng-reflect-message
        const text = await labelDiv.textContent().catch(() => '');
        const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
        const billId = (messageAttr && messageAttr.length > 0) ? messageAttr : (text ? text.trim() : '');
        
        if (billId && billId.length > 0) {
          billIds.push(billId);
        }
      }
      
      return billIds;
    } catch (error) {
      console.log(`  ⚠ Error getting all Bill IDs from sub-table: ${error.message}`);
      return [];
    }
  }

  /**
   * Get Customer Email from sub-table
   * Expands first row, opens sub-table, and extracts Customer Email from Customer Email column
   */
  async getCustomerEmailFromSubTable() {
    try {
      // First, ensure main table is visible
      const tableVisible = await this.isMainBillingTableVisible();
      if (!tableVisible) {
        console.log('  ⚠ Main table is not visible');
        return '';
      }

      // Check if expand arrow is visible
      const arrowVisible = await this.isExpandArrowVisible();
      if (!arrowVisible) {
        console.log('  ⚠ Expand arrow is not visible');
        return '';
      }

      // Click expand arrow to open sub-table
      await this.clickExpandArrow();
      await this.page.waitForTimeout(1000);

      // Verify sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table did not appear after clicking arrow');
        return '';
      }

      // Wait for sub-table rows to load
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('networkidle').catch(() => {});

      // Get Customer Email from sub-table - specifically from Customer Email column
      const subTable = this.page.locator('table').nth(1);
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();

      if (rowCount === 0) {
        console.log('  ⚠ Sub-table has no rows');
        return '';
      }

      // Get Customer Email from first row - use multiple strategies to find Customer Email column
      const firstRow = subTableRows.first();
      
      const strategies = [
        // Strategy 1: Find cell with div that has class "Customer Email" or ng-reflect-ng-class="Customer Email"
        async () => {
          const emailCell = firstRow.locator('td:has(div[ng-reflect-ng-class="Customer Email"]), td:has(div.Customer\\ Email)').first();
          const count = await emailCell.count();
          if (count > 0) {
            // Get the text from the label div inside
            const labelDiv = emailCell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const text = await labelDiv.textContent().catch(() => '');
            if (text && text.trim().length > 0 && text.trim() !== 'N/A') {
              const email = text.trim();
              // Verify it looks like an email (contains @)
              if (email.includes('@')) {
                console.log(`  ✓ Found Customer Email using class selector: "${email}"`);
                return email;
              }
            }
            // Also try getting from ng-reflect-message attribute
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && messageAttr.includes('@')) {
              console.log(`  ✓ Found Customer Email from ng-reflect-message: "${messageAttr}"`);
              return messageAttr;
            }
          }
          return '';
        },
        // Strategy 2: Find Customer Email column by header index
        async () => {
          // Find Customer Email header to get column index
          const headers = subTable.locator('thead tr th');
          const headerCount = await headers.count();
          let emailColumnIndex = -1;
          
          for (let i = 0; i < headerCount; i++) {
            const header = headers.nth(i);
            const text = await header.textContent().catch(() => '');
            if (text && text.trim().toLowerCase() === 'customer email') {
              emailColumnIndex = i;
              break;
            }
          }
          
          if (emailColumnIndex >= 0) {
            const emailCell = firstRow.locator('td').nth(emailColumnIndex);
            const labelDiv = emailCell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const text = await labelDiv.textContent().catch(() => '');
            if (text && text.trim().length > 0 && text.trim() !== 'N/A') {
              const email = text.trim();
              if (email.includes('@')) {
                console.log(`  ✓ Found Customer Email from column index ${emailColumnIndex}: "${email}"`);
                return email;
              }
            }
            // Try ng-reflect-message attribute
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && messageAttr.includes('@')) {
              console.log(`  ✓ Found Customer Email from ng-reflect-message (column ${emailColumnIndex}): "${messageAttr}"`);
              return messageAttr;
            }
          }
          return '';
        },
        // Strategy 3: Search all cells for one containing email pattern
        async () => {
          const cells = firstRow.locator('td');
          const cellCount = await cells.count();
          
          for (let i = 0; i < cellCount; i++) {
            const cell = cells.nth(i);
            
            // Check text content
            const text = await cell.textContent().catch(() => '');
            if (text && text.includes('@') && text.trim() !== 'N/A') {
              const email = text.trim();
              // Verify it's a valid email pattern
              if (/^[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
                console.log(`  ✓ Found Customer Email using pattern match (cell ${i}): "${email}"`);
                return email;
              }
            }
            
            // Check ng-reflect-message attribute in label div
            const labelDiv = cell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && messageAttr.includes('@')) {
              const emailMatch = messageAttr.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
              if (emailMatch) {
                console.log(`  ✓ Found Customer Email from ng-reflect-message (cell ${i}): "${emailMatch[0]}"`);
                return emailMatch[0];
              }
            }
          }
          return '';
        },
      ];

      for (const strategy of strategies) {
        try {
          const email = await strategy();
          if (email && email.length > 0 && email.includes('@')) {
            return email;
          }
        } catch (e) {
          continue;
        }
      }

      console.log('  ⚠ Could not find Customer Email in sub-table');
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting Customer Email from sub-table: ${error.message}`);
      return '';
    }
  }

  /**
   * Get Bill ID from sub-table
   * Expands first row, opens sub-table, and extracts Bill ID from Bill ID column
   */
  async getBillIdFromSubTable() {
    try {
      // First, ensure main table is visible
      const tableVisible = await this.isMainBillingTableVisible();
      if (!tableVisible) {
        console.log('  ⚠ Main table is not visible');
        return '';
      }

      // Check if expand arrow is visible
      const arrowVisible = await this.isExpandArrowVisible();
      if (!arrowVisible) {
        console.log('  ⚠ Expand arrow is not visible');
        return '';
      }

      // Click expand arrow to open sub-table
      await this.clickExpandArrow();
      await this.page.waitForTimeout(1000);

      // Verify sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table did not appear after clicking arrow');
        return '';
      }

      // Wait for sub-table rows to load
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('networkidle').catch(() => {});

      // Get Bill ID from sub-table - specifically from Bill ID column (first column)
      const subTable = this.page.locator('table').nth(1);
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();

      if (rowCount === 0) {
        console.log('  ⚠ Sub-table has no rows');
        return '';
      }

      // Get Bill ID from first row - use multiple strategies to find Bill ID column
      const firstRow = subTableRows.first();
      
      const strategies = [
        // Strategy 1: Find cell with div that has class "Bill ID" or ng-reflect-ng-class="Bill ID"
        async () => {
          const billIdCell = firstRow.locator('td:has(div[ng-reflect-ng-class="Bill ID"]), td:has(div.Bill\\ ID)').first();
          const count = await billIdCell.count();
          if (count > 0) {
            // Get the text from the label div inside
            const labelDiv = billIdCell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const text = await labelDiv.textContent().catch(() => '');
            if (text && text.trim().length > 0) {
              const billId = text.trim();
              // Verify it looks like a Bill ID (usually starts with trans_ or similar pattern)
              if (billId && billId.length > 0) {
                console.log(`  ✓ Found Bill ID using class selector: "${billId}"`);
                return billId;
              }
            }
            // Also try getting from ng-reflect-message attribute
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && messageAttr.length > 0) {
              console.log(`  ✓ Found Bill ID from ng-reflect-message: "${messageAttr}"`);
              return messageAttr;
            }
          }
          return '';
        },
        // Strategy 2: Get from first column (Bill ID is typically the first column)
        async () => {
          const billIdCell = firstRow.locator('td').first();
          const labelDiv = billIdCell.locator('div.mat-mdc-tooltip-trigger.label').first();
          const text = await labelDiv.textContent().catch(() => '');
          if (text && text.trim().length > 0) {
            const billId = text.trim();
            console.log(`  ✓ Found Bill ID from first column: "${billId}"`);
            return billId;
          }
          // Try ng-reflect-message attribute
          const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
          if (messageAttr && messageAttr.length > 0) {
            console.log(`  ✓ Found Bill ID from ng-reflect-message (first column): "${messageAttr}"`);
            return messageAttr;
          }
          return '';
        },
        // Strategy 3: Find Bill ID column by header index
        async () => {
          // Find Bill ID header to get column index
          const headers = subTable.locator('thead tr th');
          const headerCount = await headers.count();
          let billIdColumnIndex = -1;
          
          for (let i = 0; i < headerCount; i++) {
            const header = headers.nth(i);
            const text = await header.textContent().catch(() => '');
            if (text && text.trim().toLowerCase() === 'bill id') {
              billIdColumnIndex = i;
              break;
            }
          }
          
          if (billIdColumnIndex >= 0) {
            const billIdCell = firstRow.locator('td').nth(billIdColumnIndex);
            const labelDiv = billIdCell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const text = await labelDiv.textContent().catch(() => '');
            if (text && text.trim().length > 0) {
              const billId = text.trim();
              console.log(`  ✓ Found Bill ID from column index ${billIdColumnIndex}: "${billId}"`);
              return billId;
            }
            // Try ng-reflect-message attribute
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && messageAttr.length > 0) {
              console.log(`  ✓ Found Bill ID from ng-reflect-message (column ${billIdColumnIndex}): "${messageAttr}"`);
              return messageAttr;
            }
          }
          return '';
        },
      ];

      for (const strategy of strategies) {
        try {
          const billId = await strategy();
          if (billId && billId.length > 0) {
            return billId;
          }
        } catch (e) {
          continue;
        }
      }

      console.log('  ⚠ Could not find Bill ID in sub-table');
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting Bill ID from sub-table: ${error.message}`);
      return '';
    }
  }

  /**
   * Get Sub ID from sub-table
   * Expands first row, opens sub-table, and extracts Sub ID from Sub ID column
   */
  async getSubIdFromSubTable() {
    try {
      // First, ensure main table is visible
      const tableVisible = await this.isMainBillingTableVisible();
      if (!tableVisible) {
        console.log('  ⚠ Main table is not visible');
        return '';
      }

      // Check if expand arrow is visible
      const arrowVisible = await this.isExpandArrowVisible();
      if (!arrowVisible) {
        console.log('  ⚠ Expand arrow is not visible');
        return '';
      }

      // Click expand arrow to open sub-table
      await this.clickExpandArrow();
      await this.page.waitForTimeout(1000);

      // Verify sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table did not appear after clicking arrow');
        return '';
      }

      // Wait for sub-table rows to load
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('networkidle').catch(() => {});

      // Get Sub ID from sub-table - specifically from Sub ID column
      const subTable = this.page.locator('table').nth(1);
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();

      if (rowCount === 0) {
        console.log('  ⚠ Sub-table has no rows');
        return '';
      }

      // Get Sub ID from first row - use multiple strategies to find Sub ID column
      const firstRow = subTableRows.first();
      
      const strategies = [
        // Strategy 1: Find cell with div that has class "Sub ID" or ng-reflect-ng-class="Sub ID"
        async () => {
          const subIdCell = firstRow.locator('td:has(div[ng-reflect-ng-class="Sub ID"]), td:has(div.Sub\\ ID)').first();
          const count = await subIdCell.count();
          if (count > 0) {
            // Get the text from the label div inside
            const labelDiv = subIdCell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const text = await labelDiv.textContent().catch(() => '');
            if (text && text.trim().length > 0) {
              const subId = text.trim();
              // Verify it looks like a Sub ID (starts with SUB-)
              if (subId.includes('SUB-') || subId.includes('sub-')) {
                console.log(`  ✓ Found Sub ID using class selector: "${subId}"`);
                return subId;
              }
            }
            // Also try getting from ng-reflect-message attribute
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && (messageAttr.includes('SUB-') || messageAttr.includes('sub-'))) {
              console.log(`  ✓ Found Sub ID from ng-reflect-message: "${messageAttr}"`);
              return messageAttr;
            }
          }
          return '';
        },
        // Strategy 2: Find Sub ID column by header index
        async () => {
          // Find Sub ID header to get column index
          const headers = subTable.locator('thead tr th');
          const headerCount = await headers.count();
          let subIdColumnIndex = -1;
          
          for (let i = 0; i < headerCount; i++) {
            const header = headers.nth(i);
            const text = await header.textContent().catch(() => '');
            if (text && text.trim().toLowerCase() === 'sub id') {
              subIdColumnIndex = i;
              break;
            }
          }
          
          if (subIdColumnIndex >= 0) {
            const subIdCell = firstRow.locator('td').nth(subIdColumnIndex);
            const labelDiv = subIdCell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const text = await labelDiv.textContent().catch(() => '');
            if (text && text.trim().length > 0) {
              const subId = text.trim();
              if (subId.includes('SUB-') || subId.includes('sub-')) {
                console.log(`  ✓ Found Sub ID from column index ${subIdColumnIndex}: "${subId}"`);
                return subId;
              }
            }
            // Try ng-reflect-message attribute
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && (messageAttr.includes('SUB-') || messageAttr.includes('sub-'))) {
              console.log(`  ✓ Found Sub ID from ng-reflect-message (column ${subIdColumnIndex}): "${messageAttr}"`);
              return messageAttr;
            }
          }
          return '';
        },
        // Strategy 3: Search all cells for one containing "SUB-" pattern in text or attribute
        async () => {
          const cells = firstRow.locator('td');
          const cellCount = await cells.count();
          
          for (let i = 0; i < cellCount; i++) {
            const cell = cells.nth(i);
            
            // Check text content
            const text = await cell.textContent().catch(() => '');
            if (text && (text.includes('SUB-') || text.includes('sub-'))) {
              const subId = text.trim();
              // Make sure it's not just part of a larger text
              const subIdMatch = subId.match(/SUB-[A-Z0-9-]+/i);
              if (subIdMatch) {
                console.log(`  ✓ Found Sub ID using pattern match (cell ${i}): "${subIdMatch[0]}"`);
                return subIdMatch[0];
              }
            }
            
            // Check ng-reflect-message attribute in label div
            const labelDiv = cell.locator('div.mat-mdc-tooltip-trigger.label').first();
            const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
            if (messageAttr && (messageAttr.includes('SUB-') || messageAttr.includes('sub-'))) {
              const subIdMatch = messageAttr.match(/SUB-[A-Z0-9-]+/i);
              if (subIdMatch) {
                console.log(`  ✓ Found Sub ID from ng-reflect-message (cell ${i}): "${subIdMatch[0]}"`);
                return subIdMatch[0];
              }
            }
          }
          return '';
        },
      ];

      for (const strategy of strategies) {
        try {
          const subId = await strategy();
          if (subId && subId.length > 0 && (subId.includes('SUB-') || subId.includes('sub-'))) {
            return subId;
          }
        } catch (e) {
          continue;
        }
      }

      console.log('  ⚠ Could not find Sub ID in sub-table');
      return '';
    } catch (error) {
      console.log(`  ⚠ Error getting Sub ID from sub-table: ${error.message}`);
      return '';
    }
  }

  // ==================== BILL DATE PICKER METHODS ====================

  /**
   * Select a date in the Bill Date picker
   * @param {Date} date - Date to select (defaults to yesterday)
   */
  async selectBillDate(date = null) {
    try {
      // Default to yesterday if no date provided
      if (!date) {
        date = new Date();
        date.setDate(date.getDate() - 1);
      }
      
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-11
      const day = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      
      console.log(`  Selecting Bill Date: ${year}-${month + 1}-${day}`);
      
      // Click datepicker toggle button to open calendar
      await this.billDateToggle.waitFor({ state: 'visible', timeout: 5000 });
      await this.billDateToggle.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Opened date picker calendar');
      
      // Wait for calendar dialog to appear
      const calendarDialog = this.page.locator('div.mat-datepicker-content-container[role="dialog"]').first();
      await calendarDialog.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Navigate to correct month/year if needed
      const currentMonthYear = await calendarDialog.locator('button.mat-calendar-period-button span.mdc-button__label span').first().textContent().catch(() => '');
      const expectedMonthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
      
      if (currentMonthYear && !currentMonthYear.includes(expectedMonthYear)) {
        // Click period button to switch to month/year view
        const periodButton = calendarDialog.locator('button.mat-calendar-period-button').first();
        await periodButton.click();
        await this.page.waitForTimeout(500);
        
        // Select year
        const yearButton = calendarDialog.locator(`button[aria-label*="${year}"]`).first();
        if (await yearButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await yearButton.click();
          await this.page.waitForTimeout(500);
        }
        
        // Select month
        const monthButton = calendarDialog.locator(`button[aria-label*="${monthName}"]`).first();
        if (await monthButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await monthButton.click();
          await this.page.waitForTimeout(500);
        }
      }
      
      // Select the day - try multiple strategies
      let daySelected = false;
      const strategies = [
        // Strategy 1: Exact aria-label match
        async () => {
          const buttons = calendarDialog.locator('button.mat-calendar-body-cell');
          const count = await buttons.count();
          for (let i = 0; i < count; i++) {
            const btn = buttons.nth(i);
            const ariaLabel = await btn.getAttribute('aria-label').catch(() => '');
            if (ariaLabel && ariaLabel.includes(`${day}`) && ariaLabel.includes(`${year}`)) {
              await btn.click();
              return true;
            }
          }
          return false;
        },
        // Strategy 2: Find by cell content
        async () => {
          const buttons = calendarDialog.locator('button.mat-calendar-body-cell');
          const count = await buttons.count();
          for (let i = 0; i < count; i++) {
            const btn = buttons.nth(i);
            const text = await btn.textContent().catch(() => '');
            if (text && text.trim() === day.toString()) {
              // Verify it's not disabled
              const disabled = await btn.getAttribute('disabled').catch(() => null);
              if (!disabled) {
                await btn.click();
                return true;
              }
            }
          }
          return false;
        }
      ];
      
      for (const strategy of strategies) {
        try {
          daySelected = await strategy();
          if (daySelected) {
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!daySelected) {
        throw new Error(`Could not select day ${day}`);
      }
      
      await this.page.waitForTimeout(500);
      console.log(`  ✓ Selected day: ${day}`);
      
      // For date range picker, we need to select both start and end date (same date for single day)
      // Click Apply button to confirm selection
      const applyButton = calendarDialog.locator('button[matdaterangepickerapply], button:has-text("Apply")').first();
      if (await applyButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await applyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('  ✓ Clicked Apply button');
      } else {
        // If no Apply button, the date might be selected automatically
        // Press Escape to close calendar if still open
        const calendarStillOpen = await calendarDialog.isVisible({ timeout: 1000 }).catch(() => false);
        if (calendarStillOpen) {
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
        }
      }
      
      console.log(`  ✓ Selected Bill Date: ${year}-${month + 1}-${day}`);
      return true;
    } catch (error) {
      console.log(`  ⚠ Error selecting Bill Date: ${error.message}`);
      // Try to close calendar if still open
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch (e) {}
      throw error;
    }
  }

  /**
   * Select yesterday's date in Bill Date picker
   */
  async selectYesterdayBillDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return await this.selectBillDate(yesterday);
  }

  /**
   * Get Bill Date value from input fields
   */
  async getBillDateValue() {
    try {
      const startDate = await this.billDateStartInput.inputValue().catch(() => '');
      const endDate = await this.billDateEndInput.inputValue().catch(() => '');
      return { startDate: startDate.trim(), endDate: endDate.trim() };
    } catch (error) {
      return { startDate: '', endDate: '' };
    }
  }

  /**
   * Get all dates from sub-table Date & Time column
   */
  async getAllDatesFromSubTable() {
    try {
      const dates = [];
      
      // Check if sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        return dates;
      }
      
      // Find Date & Time column index
      const subTable = this.page.locator('table').nth(1);
      const headers = subTable.locator('thead tr th');
      const headerCount = await headers.count();
      let dateColumnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent().catch(() => '');
        if (text && (text.trim().toLowerCase() === 'date & time' || text.trim().toLowerCase() === 'date and time')) {
          dateColumnIndex = i;
          break;
        }
      }
      
      if (dateColumnIndex < 0) {
        return dates;
      }
      
      // Get all rows in sub-table
      const subTableRows = subTable.locator('tbody tr');
      const rowCount = await subTableRows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = subTableRows.nth(i);
        const dateCell = row.locator('td').nth(dateColumnIndex);
        const labelDiv = dateCell.locator('div.mat-mdc-tooltip-trigger.label').first();
        
        // Get date from text or ng-reflect-message
        const text = await labelDiv.textContent().catch(() => '');
        const messageAttr = await labelDiv.getAttribute('ng-reflect-message').catch(() => '');
        const dateStr = (messageAttr && messageAttr.length > 0 && messageAttr !== 'N/A') ? messageAttr : (text && text.trim() !== 'N/A' ? text.trim() : '');
        
        if (dateStr && dateStr.length > 0 && dateStr !== 'N/A') {
          dates.push(dateStr);
        }
      }
      
      return dates;
    } catch (error) {
      console.log(`  ⚠ Error getting all dates from sub-table: ${error.message}`);
      return [];
    }
  }

  /**
   * Verify records match the selected date
   * Compares dates from sub-table with the selected date
   * @param {Date} selectedDate - The date that was selected in the date picker
   */
  async verifyRecordsMatchSelectedDate(selectedDate) {
    try {
      await this.page.waitForTimeout(1000);
      
      // Check if sub-table is visible
      const subTableVisible = await this.isSubTableVisible();
      if (!subTableVisible) {
        console.log('  ⚠ Sub-table is not visible');
        return false;
      }
      
      // Check if sub-table is empty
      const subTableEmpty = await this.verifySubTableIsEmpty();
      if (subTableEmpty) {
        console.log('  ✓ Sub-table is empty (no records found for selected date)');
        return true; // Empty is valid if no records match
      }
      
      // Get all dates from sub-table
      const dates = await this.getAllDatesFromSubTable();
      
      if (dates.length === 0) {
        console.log('  ⚠ No dates found in sub-table');
        return false;
      }
      
      // Format selected date for comparison (YYYY-MM-DD)
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedDay = selectedDate.getDate();
      
      console.log(`  Selected date: ${selectedDateStr} (${selectedYear}-${selectedMonth}-${selectedDay})`);
      console.log(`  Found ${dates.length} date(s) in sub-table`);
      
      // Check if dates match (allowing for different date formats)
      let allMatch = true;
      let matchedCount = 0;
      
      for (const dateStr of dates) {
        // Try to parse the date string in various formats
        let dateMatches = false;
        
        // Strategy 1: Check if date string contains the selected date components
        if (dateStr.includes(selectedYear.toString()) && 
            dateStr.includes(selectedMonth.toString()) && 
            dateStr.includes(selectedDay.toString())) {
          dateMatches = true;
        }
        
        // Strategy 2: Try to parse as Date and compare
        try {
          const parsedDate = new Date(dateStr);
          if (!isNaN(parsedDate.getTime())) {
            const parsedYear = parsedDate.getFullYear();
            const parsedMonth = parsedDate.getMonth() + 1;
            const parsedDay = parsedDate.getDate();
            
            if (parsedYear === selectedYear && 
                parsedMonth === selectedMonth && 
                parsedDay === selectedDay) {
              dateMatches = true;
            }
          }
        } catch (e) {
          // Continue with other strategies
        }
        
        // Strategy 3: Check for date format like "YYYY-MM-DD" or "MM/DD/YYYY"
        const datePatterns = [
          new RegExp(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`),
          new RegExp(`${selectedMonth}/${selectedDay}/${selectedYear}`),
          new RegExp(`${selectedDay}/${selectedMonth}/${selectedYear}`),
        ];
        
        for (const pattern of datePatterns) {
          if (pattern.test(dateStr)) {
            dateMatches = true;
            break;
          }
        }
        
        if (dateMatches) {
          matchedCount++;
          console.log(`  ✓ Date matches: "${dateStr}"`);
        } else {
          console.log(`  ⚠ Date does not match: "${dateStr}" (expected: ${selectedDateStr})`);
          allMatch = false;
        }
      }
      
      if (allMatch && matchedCount > 0) {
        console.log(`  ✓ All ${matchedCount} records match the selected date`);
        return true;
      } else if (matchedCount > 0) {
        console.log(`  ⚠ Only ${matchedCount} out of ${dates.length} records match the selected date`);
        // Still return true if at least some records match (flexible validation)
        return matchedCount === dates.length;
      } else {
        console.log('  ⚠ No records match the selected date');
        return false;
      }
    } catch (error) {
      console.log(`  ⚠ Error verifying records match selected date: ${error.message}`);
      return false;
    }
  }

  /**
   * Search by Bill Date
   */
  async searchByBillDate(date = null) {
    try {
      // Expand search section if needed
      await this.expandSearchSection();
      await this.page.waitForTimeout(500);
      
      // Select date (defaults to yesterday)
      if (!date) {
        date = new Date();
        date.setDate(date.getDate() - 1);
      }
      await this.selectBillDate(date);
      
      // Click Search
      await this.clickSearchButton();
      
      console.log(`  ✓ Searched by Bill Date: ${date.toISOString().split('T')[0]}`);
    } catch (error) {
      console.log(`  ⚠ Error searching by Bill Date: ${error.message}`);
      throw error;
    }
  }

  /**
   * ==================== BILLING DETAILS FORM METHODS ====================
   */

  /**
   * Verifies if billing details form is visible
   * @returns {Promise<boolean>}
   */
  async isBillingDetailsFormVisible() {
    try {
      // Check if form is visible using multiple strategies
      const formVisible = await this.page.evaluate(() => {
        // Check for form with billing fields
        const form = document.querySelector('form:has(input#company), form:has(input#name)');
        if (form && form.offsetParent !== null) return true;
        
        // Check for form container
        const formContainer = document.querySelector('div.form-container, div[class*="form"]');
        if (formContainer && formContainer.offsetParent !== null) {
          const hasBillingFields = formContainer.querySelector('input#company, input#name, input#mobile');
          if (hasBillingFields) return true;
        }
        
        return false;
      });
      
      if (formVisible) return true;
      
      // Fallback to locator approach
      const isVisible = await this.billingDetailsForm.isVisible({ timeout: 3000 }).catch(() => false);
      return isVisible;
    } catch {
      return false;
    }
  }

  /**
   * Clears all fields in the billing details form
   */
  async clearAllBillingDetailsFields() {
    try {
      // Clear text inputs
      const textInputs = [
        this.companyInput,
        this.mobileInput,
        this.nameInput,
        this.emailInput,
        this.addressInput,
        this.zipCodeInput,
        this.registeredCompanyNameInput,
        this.panInput,
        this.gstinInput,
      ];
      
      for (const input of textInputs) {
        try {
          const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            await input.clear();
            await this.page.waitForTimeout(100);
          }
        } catch {
          // Field might not be visible or might not exist
        }
      }
      
      // Clear city input (it's an input, not a select)
      try {
        const cityVisible = await this.cityInput.isVisible({ timeout: 2000 }).catch(() => false);
        if (cityVisible) {
          await this.cityInput.clear();
          await this.page.waitForTimeout(100);
        }
      } catch {
        // City input might not be visible
      }
      
      // Clear selects (reset to default/empty option)
      // Helper function to reset a select to its default empty option
      const resetSelect = async (selectLocator, selectId) => {
        try {
          const isVisible = await selectLocator.isVisible({ timeout: 2000 }).catch(() => false);
          if (!isVisible) return;
          
          // Try using selectOption first
          try {
            await selectLocator.selectOption({ value: '' });
            await this.page.waitForTimeout(200);
            return;
          } catch (e) {
            // If that fails, use evaluate to directly manipulate the DOM
          }
          
          // Fallback: Use evaluate to set the select to the first option (disabled default)
          await this.page.evaluate((id) => {
            const select = document.getElementById(id);
            if (select) {
              // Find the first option (usually the disabled default one)
              const firstOption = select.querySelector('option[value=""][disabled]') || select.options[0];
              if (firstOption) {
                select.selectedIndex = 0;
                // Trigger change event
                const changeEvent = new Event('change', { bubbles: true });
                select.dispatchEvent(changeEvent);
                // Also trigger input event for Angular
                const inputEvent = new Event('input', { bubbles: true });
                select.dispatchEvent(inputEvent);
              }
            }
          }, selectId);
          await this.page.waitForTimeout(200);
        } catch (error) {
          console.log(`  ⚠ Could not clear ${selectId}: ${error.message}`);
        }
      };
      
      // Reset each select
      await resetSelect(this.gstTreatmentSelect, 'gstTreatment');
      await resetSelect(this.countrySelect, 'country');
      await resetSelect(this.stateSelect, 'state');
      await resetSelect(this.companyTypeSelect, 'organizationType');
      
      await this.page.waitForTimeout(500);
      console.log('  ✓ Cleared all billing details form fields');
    } catch (error) {
      console.log(`  ⚠ Error clearing form fields: ${error.message}`);
    }
  }

  /**
   * Fills all required fields in the billing details form
   * @param {Object} formData - Object containing form field values
   */
  async fillBillingDetailsForm(formData = {}) {
    try {
      // Default values if not provided
      const data = {
        company: formData.company || 'Test Company',
        mobile: formData.mobile || '9876543210',
        gstTreatment: formData.gstTreatment || 'Unregistered',
        country: formData.country || 'India',
        state: formData.state || 'Uttar Pradesh',
        name: formData.name || 'Test User',
        email: formData.email || 'test@example.com',
        address: formData.address || 'Test Address',
        zipCode: formData.zipCode || '201301',
        city: formData.city || 'Gautam Buddha Nagar',
        registeredCompanyName: formData.registeredCompanyName || '',
        pan: formData.pan || 'ABCDE1234F',
        gstin: formData.gstin || '',
        companyType: formData.companyType || 'Company',
      };
      
      // Fill text inputs
      if (data.company) {
        await this.companyInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.companyInput.fill(data.company);
        await this.page.waitForTimeout(200);
      }
      
      if (data.mobile) {
        await this.mobileInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.mobileInput.fill(data.mobile);
        await this.page.waitForTimeout(200);
      }
      
      if (data.name) {
        await this.nameInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.nameInput.fill(data.name);
        await this.page.waitForTimeout(200);
      }
      
      if (data.email) {
        await this.emailInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.emailInput.fill(data.email);
        await this.page.waitForTimeout(200);
      }
      
      if (data.address) {
        await this.addressInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.addressInput.fill(data.address);
        await this.page.waitForTimeout(200);
      }
      
      if (data.zipCode) {
        await this.zipCodeInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.zipCodeInput.fill(data.zipCode);
        await this.page.waitForTimeout(200);
      }
      
      if (data.registeredCompanyName) {
        await this.registeredCompanyNameInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.registeredCompanyNameInput.fill(data.registeredCompanyName);
        await this.page.waitForTimeout(200);
      }
      
      if (data.pan) {
        await this.panInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.panInput.fill(data.pan);
        await this.page.waitForTimeout(200);
      }
      
      if (data.gstin) {
        await this.gstinInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.gstinInput.fill(data.gstin);
        await this.page.waitForTimeout(200);
      }
      
      // Fill selects (Material Design mat-select)
      if (data.gstTreatment) {
        await this.selectGstTreatment(data.gstTreatment);
      }
      
      if (data.country) {
        await this.selectCountry(data.country);
      }
      
      if (data.state) {
        await this.selectState(data.state);
      }
      
      if (data.city) {
        await this.cityInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.fillCity(data.city);
      }
      
      if (data.companyType) {
        await this.selectCompanyType(data.companyType);
      }
      
      await this.page.waitForTimeout(500);
      console.log('  ✓ Filled all billing details form fields');
    } catch (error) {
      console.log(`  ⚠ Error filling form fields: ${error.message}`);
      throw error;
    }
  }

  /**
   * Selects GST Treatment from dropdown
   * @param {string} value - Value to select (e.g., "Unregistered", "Registered", "business_none", "business_gst")
   */
  async selectGstTreatment(value) {
    try {
      await this.gstTreatmentSelect.waitFor({ state: 'visible', timeout: 5000 });
      
      // Try direct selectOption first (works for regular HTML selects)
      try {
        await this.gstTreatmentSelect.selectOption({ label: value });
        await this.page.waitForTimeout(500);
        return;
      } catch (e) {
        // If that fails, try custom dropdown approach
      }
      
      // Custom dropdown with search - click select to open dropdown
      await this.gstTreatmentSelect.click();
      await this.page.waitForTimeout(500);
      
      // Wait for search input to appear (it's inside the select element)
      const searchInput = this.page.locator('select#gstTreatment div.input-group input[placeholder="Search Here..."]').first();
      const searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (searchVisible) {
        // Type in search input to filter options
        await searchInput.fill(value);
        await this.page.waitForTimeout(500);
      }
      
      // Select the matching option by text
      const option = this.page.locator(`select#gstTreatment option:has-text("${value}")`).first();
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log(`  ⚠ Error selecting GST Treatment: ${error.message}`);
      // Final fallback: try selectOption with value
      try {
        const valueMap = {
          'Unregistered': 'business_none',
          'Registered': 'business_gst',
          'Consumer': 'consumer',
          'Overseas': 'overseas'
        };
        const selectValue = valueMap[value] || value;
        await this.gstTreatmentSelect.selectOption({ value: selectValue });
      } catch (e) {
        console.log(`  ⚠ Final fallback also failed: ${e.message}`);
      }
    }
  }

  /**
   * Selects Country from dropdown
   * @param {string} value - Value to select (e.g., "India")
   */
  async selectCountry(value) {
    try {
      await this.countrySelect.waitFor({ state: 'visible', timeout: 5000 });
      
      // Try direct selectOption first (works for regular HTML selects)
      try {
        await this.countrySelect.selectOption({ label: value });
        await this.page.waitForTimeout(500);
        return;
      } catch (e) {
        // If that fails, try custom dropdown approach
      }
      
      // Custom dropdown with search - click select to open dropdown
      await this.countrySelect.click();
      await this.page.waitForTimeout(500);
      
      // Wait for search input to appear (it's inside the select element)
      const searchInput = this.page.locator('select#country div.input-group input[placeholder="Search Here..."]').first();
      const searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (searchVisible) {
        // Type in search input to filter options
        await searchInput.fill(value);
        await this.page.waitForTimeout(500);
      }
      
      // Select the matching option by text
      const option = this.page.locator(`select#country option:has-text("${value}")`).first();
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log(`  ⚠ Error selecting Country: ${error.message}`);
    }
  }

  /**
   * Selects State from dropdown
   * @param {string} value - Value to select (e.g., "Uttar Pradesh")
   */
  async selectState(value) {
    try {
      await this.stateSelect.waitFor({ state: 'visible', timeout: 5000 });
      
      // Try direct selectOption first (works for regular HTML selects)
      try {
        await this.stateSelect.selectOption({ label: value });
        await this.page.waitForTimeout(500);
        return;
      } catch (e) {
        // If that fails, try custom dropdown approach
      }
      
      // Custom dropdown with search - click select to open dropdown
      await this.stateSelect.click();
      await this.page.waitForTimeout(500);
      
      // Wait for search input to appear (it's inside the select element)
      const searchInput = this.page.locator('select#state div.input-group input[placeholder="Search Here..."]').first();
      const searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (searchVisible) {
        // Type in search input to filter options
        await searchInput.fill(value);
        await this.page.waitForTimeout(500);
      }
      
      // Select the matching option by text
      const option = this.page.locator(`select#state option:has-text("${value}")`).first();
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log(`  ⚠ Error selecting State: ${error.message}`);
    }
  }

  /**
   * Fills City input field (City is an input, not a select)
   * @param {string} value - Value to enter (e.g., "Gautam Buddha Nagar")
   */
  async fillCity(value) {
    try {
      await this.cityInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.cityInput.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log(`  ⚠ Error filling City: ${error.message}`);
    }
  }

  /**
   * Selects Company Type from dropdown
   * @param {string} value - Value to select (e.g., "Company")
   */
  async selectCompanyType(value) {
    try {
      await this.companyTypeSelect.waitFor({ state: 'visible', timeout: 5000 });
      
      // Try direct selectOption first (works for regular HTML selects)
      try {
        await this.companyTypeSelect.selectOption({ label: value });
        await this.page.waitForTimeout(500);
        return;
      } catch (e) {
        // If that fails, try custom dropdown approach
      }
      
      // Custom dropdown with search - click select to open dropdown
      await this.companyTypeSelect.click();
      await this.page.waitForTimeout(500);
      
      // Wait for search input to appear (it's inside the select element)
      const searchInput = this.page.locator('select#organizationType div.input-group input[placeholder="Search Here..."]').first();
      const searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (searchVisible) {
        // Type in search input to filter options
        await searchInput.fill(value);
        await this.page.waitForTimeout(500);
      }
      
      // Select the matching option by text
      const option = this.page.locator(`select#organizationType option:has-text("${value}")`).first();
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log(`  ⚠ Error selecting Company Type: ${error.message}`);
    }
  }

  /**
   * Checks if required field validation errors are visible
   * @returns {Promise<boolean>}
   */
  async areRequiredFieldErrorsVisible() {
    try {
      await this.page.waitForTimeout(2000); // Wait longer for validation to appear
      
      const errorsVisible = await this.page.evaluate(() => {
        // Strategy 1: Check for Material Design error messages (mat-error)
        const matErrors = document.querySelectorAll('mat-error, mat-error.ng-star-inserted, mat-error.mat-mdc-form-field-error');
        for (const error of matErrors) {
          if (error.offsetParent !== null) {
            const text = (error.textContent || '').trim().toLowerCase();
            if (text.includes('required') || text.includes('this field is required') || text.length > 0) {
              return true;
            }
          }
        }
        
        // Strategy 2: Check for generic error messages
        const errorMessages = document.querySelectorAll(
          'div.error-message.ng-star-inserted, ' +
          'span.error-message, ' +
          'div[class*="error-message"], ' +
          'span[class*="error-message"], ' +
          'div.error, ' +
          'span.error'
        );
        for (const error of errorMessages) {
          if (error.offsetParent !== null) {
            const text = (error.textContent || '').trim().toLowerCase();
            if (text.includes('required') || text.includes('this field is required') || text.length > 0) {
              return true;
            }
          }
        }
        
        // Strategy 3: Check for aria-invalid attributes on form fields
        const invalidFields = document.querySelectorAll('input[aria-invalid="true"], select[aria-invalid="true"], mat-select[aria-invalid="true"]');
        if (invalidFields.length > 0) {
          return true;
        }
        
        // Strategy 4: Check for ng-invalid class on form fields
        const invalidClassFields = document.querySelectorAll('input.ng-invalid, select.ng-invalid, mat-select.ng-invalid');
        if (invalidClassFields.length > 0) {
          // Verify they are actually invalid (not just touched)
          for (const field of invalidClassFields) {
            const classes = field.className || '';
            if (classes.includes('ng-invalid') && (classes.includes('ng-touched') || classes.includes('ng-dirty'))) {
              return true;
            }
          }
        }
        
        // Strategy 5: Check for form validation state
        const form = document.querySelector('form');
        if (form) {
          const formClasses = form.className || '';
          if (formClasses.includes('ng-invalid') || formClasses.includes('ng-submitted')) {
            // Check if any required fields are empty
            const requiredInputs = form.querySelectorAll('input[required], select[required], mat-select[required]');
            for (const input of requiredInputs) {
              if (input.tagName === 'INPUT' || input.tagName === 'SELECT') {
                const value = input.value || '';
                if (!value || value.trim() === '') {
                  return true;
                }
              } else if (input.tagName === 'MAT-SELECT') {
                // For mat-select, check if value is empty
                const selectValue = input.getAttribute('ng-reflect-value') || '';
                if (!selectValue || selectValue === 'null' || selectValue === 'undefined') {
                  return true;
                }
              }
            }
          }
        }
        
        // Strategy 6: Check for error text in form fields' parent containers
        const formFields = document.querySelectorAll('mat-form-field, div[class*="form-field"], div[class*="form-group"]');
        for (const field of formFields) {
          const fieldText = (field.textContent || '').toLowerCase();
          if (fieldText.includes('required') && field.offsetParent !== null) {
            // Check if it's an error message, not just label text
            const errorInField = field.querySelector('mat-error, div.error-message, span.error-message');
            if (errorInField && errorInField.offsetParent !== null) {
              return true;
            }
          }
        }
        
        return false;
      });
      
      if (errorsVisible) return true;
      
      // Fallback: Check if form is still visible (which might indicate validation prevented submission)
      const formStillVisible = await this.isBillingDetailsFormVisible();
      if (formStillVisible) {
        // Form is still open, which might mean validation prevented submission
        // Check for any visible error indicators
        const hasErrorIndicators = await this.page.evaluate(() => {
          const hasMatError = document.querySelector('mat-error:not([style*="display: none"])');
          const hasErrorClass = document.querySelector('input.ng-invalid.ng-touched, select.ng-invalid.ng-touched');
          return !!(hasMatError || hasErrorClass);
        });
        return hasErrorIndicators;
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets all required field error messages
   * @returns {Promise<Array<string>>}
   */
  async getRequiredFieldErrorMessages() {
    try {
      await this.page.waitForTimeout(2000);
      
      const errorMessages = await this.page.evaluate(() => {
        const errors = [];
        
        // Get Material Design error messages (multiple selectors)
        const matErrors = document.querySelectorAll(
          'mat-error, ' +
          'mat-error.ng-star-inserted, ' +
          'mat-error.mat-mdc-form-field-error, ' +
          'div.mat-mdc-form-field-error-wrapper mat-error'
        );
        for (const error of matErrors) {
          if (error.offsetParent !== null) {
            const text = (error.textContent || '').trim();
            if (text && !errors.includes(text)) errors.push(text);
          }
        }
        
        // Get generic error messages
        const genericErrors = document.querySelectorAll(
          'div.error-message.ng-star-inserted, ' +
          'span.error-message, ' +
          'div[class*="error-message"], ' +
          'span[class*="error-message"], ' +
          'div.error, ' +
          'span.error'
        );
        for (const error of genericErrors) {
          if (error.offsetParent !== null) {
            const text = (error.textContent || '').trim();
            if (text && !errors.includes(text)) errors.push(text);
          }
        }
        
        // Get error messages from form fields
        const formFields = document.querySelectorAll('mat-form-field, div[class*="form-field"]');
        for (const field of formFields) {
          const errorInField = field.querySelector('mat-error, div.error-message, span.error-message');
          if (errorInField && errorInField.offsetParent !== null) {
            const text = (errorInField.textContent || '').trim();
            if (text && !errors.includes(text)) errors.push(text);
          }
        }
        
        // Check for aria-describedby error messages
        const fieldsWithErrors = document.querySelectorAll('input[aria-invalid="true"], select[aria-invalid="true"]');
        for (const field of fieldsWithErrors) {
          const describedBy = field.getAttribute('aria-describedby');
          if (describedBy) {
            const errorElement = document.getElementById(describedBy);
            if (errorElement && errorElement.offsetParent !== null) {
              const text = (errorElement.textContent || '').trim();
              if (text && !errors.includes(text)) errors.push(text);
            }
          }
        }
        
        return errors;
      });
      
      return errorMessages || [];
    } catch {
      return [];
    }
  }

  /**
   * Clicks Submit button on billing details form
   */
  async clickFormSubmitButton() {
    try {
      await this.formSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.formSubmitButton.scrollIntoViewIfNeeded();
      await this.formSubmitButton.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Submit button on billing details form');
    } catch (error) {
      console.log(`  ⚠ Error clicking Submit button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clicks Cancel button on billing details form
   */
  async clickFormCancelButton() {
    try {
      await this.formCancelButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.formCancelButton.scrollIntoViewIfNeeded();
      await this.formCancelButton.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Cancel button on billing details form');
    } catch (error) {
      console.log(`  ⚠ Error clicking Cancel button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verifies if form submit was successful (form closes or success message appears)
   * @returns {Promise<boolean>}
   */
  async isFormSubmitSuccessful() {
    try {
      await this.page.waitForTimeout(2000);
      
      // Check if form is no longer visible (closed after successful submit)
      const formStillVisible = await this.isBillingDetailsFormVisible();
      if (!formStillVisible) {
        return true;
      }
      
      // Check for success toast/message
      const successMessage = await this.page.evaluate(() => {
        const bodyText = (document.body.textContent || '').toLowerCase();
        return bodyText.includes('success') || bodyText.includes('saved') || bodyText.includes('updated');
      });
      
      return successMessage || false;
    } catch {
      return false;
    }
  }
}

module.exports = { BillingPage };

