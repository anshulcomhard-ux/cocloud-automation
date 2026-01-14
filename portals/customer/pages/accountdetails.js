class AccountDetailsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Account Details menu
    this.accountDetailsMenu = page.locator('a:has-text("Account Details"), button:has-text("Account Details"), a[href*="account-details"], a[href*="accountdetails"]').first();
    
    // Page wrapper
    this.accountDetailsWrapper = page.locator('.account-details-wrapper, .account-details, [class*="account-details"]').first();
    
    // Page Header
    // HTML: <h2 class="page-title-modern">Account Details</h2> inside <div class="header-left">
    this.pageHeader = page.locator('.page-header-modern:has-text("Account Details"), .header-left:has-text("Account Details"), h1:has-text("Account Details"), h2:has-text("Account Details")').first();
    this.pageHeading = page.locator('h2.page-title-modern:has-text("Account Details"), .header-left h2.page-title-modern, h6.page-title-modern:has-text("Account Details"), h1:has-text("Account Details"), h2:has-text("Account Details"), .page-heading:has-text("Account Details")').first();
    
    // Sections
    // HTML: Profile Details section - look for card with Profile Details title
    this.profileDetailsSection = page.locator('.card-body:has(.card-title-modern:has-text("Profile Details")), .card-body:has(h5.card-title-modern:has-text("Profile Details")), .profile-details, [class*="profile-details"], section:has-text("Profile Details"), .section:has-text("Profile Details")').first();
    this.subscriptionDetailsSection = page.locator('.card-body:has(.card-title-modern:has-text("Subscription Details")), .subscription-details, [class*="subscription-details"], section:has-text("Subscription Details"), .section:has-text("Subscription Details")').first();
    this.billingDetailsSection = page.locator('.card-body:has(.card-title-modern:has-text("Billing Details")), .billing-details, [class*="billing-details"], section:has-text("Billing Details"), .section:has-text("Billing Details"), div:has-text("Billing Details"), [id*="billing"], [class*="billing"]').first();
    // HTML: Order History section - <div class="card-body"> with <h5 class="card-title-modern mb-0">Order History</h5>
    this.orderHistorySection = page.locator('.card-body:has(.card-title-modern:has-text("Order History")), .card-body:has(h5.card-title-modern:has-text("Order History")), .order-history, [class*="order-history"], section:has-text("Order History"), .section:has-text("Order History")').first();
    
    // Profile Details section
    // HTML: <a class="edit-link-modern">Edit</a> within Profile Details card
    this.profileDetailsEditButton = page.locator('.card-body:has(.card-title-modern:has-text("Profile Details")) a.edit-link-modern, .card-body:has(h5.card-title-modern:has-text("Profile Details")) a.edit-link-modern, .profile-details a.edit-link-modern, [class*="profile-details"] a.edit-link-modern, button:has-text("Edit"), button[aria-label*="Edit"], i.bi-pencil-square, i.bi-pencil, button:has(i.bi-pencil)').first();
    // HTML: <div class="common-modal modern-modal p-3"> with <h5 class="modal-title-modern">Edit Profile</h5>
    // HTML: <div class="common-modal modern-modal p-3"> with <h5 class="modal-title-modern">Edit Profile</h5>
    this.profileDetailsEditModal = page.locator('.common-modal.modern-modal:has-text("Edit Profile"), .common-modal.modern-modal:has(h5.modal-title-modern:has-text("Edit Profile")), .modal:has-text("Edit Profile"), .modal:has-text("Profile Details"), .modal-dialog:has-text("Profile"), [role="dialog"]:has-text("Profile")').first();
    // HTML: <input ng-reflect-name="name" placeholder="Enter full name"> inside app-dynamic-form
    this.profileModalNameField = page.locator('.common-modal.modern-modal input[ng-reflect-name="name"], .modal:has-text("Edit Profile") input[ng-reflect-name="name"], app-dynamic-form input[ng-reflect-name="name"], input[name*="name"], input[id*="name"], input[placeholder*="full name"], input[placeholder*="Name"], input[ng-reflect-name="name"]').first();
    // HTML: <input ng-reflect-name="companyName" placeholder="Enter company Name"> inside app-dynamic-form
    this.profileModalCompanyField = page.locator('.common-modal.modern-modal input[ng-reflect-name="companyName"], .modal:has-text("Edit Profile") input[ng-reflect-name="companyName"], app-dynamic-form input[ng-reflect-name="companyName"], input[name*="companyName"], input[id*="companyName"], input[placeholder*="company Name"], input[placeholder*="Company"], input[ng-reflect-name="companyName"]').first();
    // HTML: <button class="btn secondary-btn" type="button">Cancel</button> inside app-dynamic-form
    this.profileModalCloseButton = page.locator('.common-modal.modern-modal button.secondary-btn:has-text("Cancel"), .modal:has-text("Edit Profile") button:has-text("Cancel"), app-dynamic-form button:has-text("Cancel"), button[aria-label="Close"], button:has-text("Close"), .modal-header button.close').first();
    
    // Billing Details section - Edit button must be within Billing Details card
    this.billingDetailsEditButton = page.locator('.card-body:has(.card-title-modern:has-text("Billing Details")) .edit-link-modern, .card-body:has(h5.card-title-modern:has-text("Billing Details")) a.edit-link-modern, .card-header-section:has(h5.card-title-modern:has-text("Billing Details")) .edit-link-modern, .billing-details .edit-link-modern, .billing-details a.edit-link-modern').first();
    this.billingDetailsForm = page.locator('.billing-form, form:has-text("Billing Details"), .billing-details-form, [class*="billing-form"], .modal:has-text("Billing Details")').first();
    this.billingFormModal = page.locator('.modal:has-text("Billing Details"), [role="dialog"]:has-text("Billing Details")').first();
    
    // Billing form fields - Column 1 (using ng-reflect-name for Angular forms)
    this.billingFormCompanyField = page.locator('input[ng-reflect-name="companyName"], input[name*="company"], input[id*="company"], input[placeholder*="Company"], input[placeholder*="Company/Individual"], label:has-text("Company") + input, label:has-text("Company/Individual") + input').first();
    this.billingFormEmailField = page.locator('input[type="email"][ng-reflect-name="email"], input[type="email"], input[name*="email"], input[id*="email"], input[placeholder*="Email"], label:has-text("Email") + input').first();
    this.billingFormRegisteredCompanyField = page.locator('input[ng-reflect-name="registeredCompanyName"], input[name*="registered"], input[id*="registered"], input[placeholder*="Registered Company"], label:has-text("Registered Company") + input').first();
    this.billingFormAddressField = page.locator('input[ng-reflect-name="address"], textarea[ng-reflect-name="address"], input[name*="address"], textarea[name*="address"], input[id*="address"], textarea[id*="address"], input[placeholder*="Address"], textarea[placeholder*="Address"], label:has-text("Address") + input, label:has-text("Address") + textarea').first();
    this.billingFormStateDropdown = page.locator('select[ng-reflect-name="state"], select[name*="state"], select[id*="state"], .form-select:has(option:has-text("Jharkhand")), label:has-text("State") + select, label:has-text("State") + .form-select').first();
    
    // Billing form fields - Column 2
    this.billingFormNameField = page.locator('input[ng-reflect-name="name"], input[name*="name"], input[id*="name"], input[placeholder*="Name"], label:has-text("Name") + input').first();
    this.billingFormGstTreatmentDropdown = page.locator('select[ng-reflect-name="gstTreatment"], select[name*="gst"], select[id*="gst"], select[name*="treatment"], .form-select:has(option:has-text("Unregistered")), label:has-text("GST Treatment") + select').first();
    this.billingFormCompanyTypeDropdown = page.locator('select[ng-reflect-name="organizationType"], select[name*="type"], select[id*="type"], .form-select:has(option:has-text("Company")), label:has-text("Company Type") + select').first();
    this.billingFormCountryDropdown = page.locator('select[ng-reflect-name="country"], select[name*="country"], select[id*="country"], .form-select:has(option:has-text("India")), label:has-text("Country") + select').first();
    this.billingFormCityDropdown = page.locator('select[ng-reflect-name="city"], select[name*="city"], select[id*="city"], .form-select:has(option:has-text("Godda")), label:has-text("City") + select').first();
    
    // Billing form fields - Column 3
    this.billingFormMobileField = page.locator('input[type="tel"][ng-reflect-name="mobile"], input[ng-reflect-name="mobile"], input[name*="mobile"], input[name*="phone"], input[id*="mobile"], input[id*="phone"], input[placeholder*="Mobile"], input[placeholder*="Phone"], label:has-text("Mobile") + input').first();
    this.billingFormGstinField = page.locator('input[ng-reflect-name="gstInNo"], input[name*="gstin"], input[id*="gstin"], input[placeholder*="GSTIN"], input[placeholder*="Enter GSTIN"], label:has-text("GSTIN") + input').first();
    this.billingFormPanField = page.locator('input[ng-reflect-name="panCardNo"], input[name*="pan"], input[id*="pan"], input[placeholder*="PAN"], input[placeholder*="Enter PAN"], label:has-text("PAN") + input').first();
    this.billingFormZipField = page.locator('input[type="pinCode"][ng-reflect-name="pinCode"], input[ng-reflect-name="pinCode"], input[name*="zip"], input[name*="pin"], input[id*="zip"], input[id*="pin"], input[placeholder*="Zip"], input[placeholder*="Pin"], input[placeholder*="pincode"], label:has-text("Zip") + input, label:has-text("Pin") + input').first();
    
    // Billing form buttons
    this.billingFormSubmitButton = page.locator('.billing-form button:has-text("Submit"), .modal button:has-text("Submit"), button.btn-primary:has-text("Submit"), button:has-text("Submit"):not(:has-text("Cancel"))').first();
    this.billingFormCancelButton = page.locator('.billing-form button:has-text("Cancel"), .modal button:has-text("Cancel"), button.btn-secondary:has-text("Cancel")').first();
    
    // Billing details card (display section)
    this.billingDetailsCard = page.locator('.card-body:has(.card-title-modern:has-text("Billing Details")), .billing-details .card, .billing-card, [class*="billing-card"], .details-card').first();
    
    // Purchase Users button
    this.purchaseUsersButton = page.locator('button:has-text("Purchase Users"), a:has-text("Purchase Users"), button[aria-label*="Purchase Users"], .purchase-users-btn').first();
    
    // Order History section
    // HTML: <app-dynamic-table> with <table class="mat-mdc-table mdc-data-table__table cdk-table modern-table">
    this.orderHistoryTable = page.locator('app-dynamic-table table.mat-mdc-table, app-dynamic-table table, .order-history table, .card-body:has(.card-title-modern:has-text("Order History")) table, table.mat-mdc-table, table').first();
    this.orderHistoryRows = page.locator('app-dynamic-table table tbody tr, app-dynamic-table table.mat-mdc-table tbody tr, .order-history table tbody tr, table tbody tr, mat-table tbody mat-row');
    this.orderHistoryHeaders = page.locator('app-dynamic-table table thead th, app-dynamic-table table.mat-mdc-table thead th, .order-history table thead th, table thead th, mat-table thead mat-header-cell');
    
    // Order History columns
    // HTML: <th class="mat-mdc-header-cell" mat-header-cell class="mat-column-Date---Time">Date & Time</th>
    this.dateTimeColumn = page.locator('th.mat-column-Date---Time, th:has-text("Date & Time"), th:has-text("Date"), th:has-text("Time"), .mat-column-dateTime').first();
    this.orderIdColumn = page.locator('th.mat-column-Order-Id, th:has-text("Order Id"), th:has-text("Order ID"), th:has-text("Order"), .mat-column-orderId').first();
    this.subIdColumn = page.locator('th.mat-column-Sub-Id, th:has-text("Sub Id"), th:has-text("Sub ID"), th:has-text("Subscription Id"), .mat-column-subId').first();
    this.planNameColumn = page.locator('th.mat-column-Plan-Name, th:has-text("Plan Name"), th:has-text("Plan"), .mat-column-planName').first();
    this.amountColumn = page.locator('th.mat-column-Amount, th:has-text("Amount"), th:has-text("Price"), .mat-column-amount').first();
    this.statusColumn = page.locator('th.mat-column-Status, th:has-text("Status"), .mat-column-status').first();
    
    // No data message
    this.noDataFoundMessage = this.orderHistorySection.locator('text=No data found, text=No Data Found, .no-data, .empty-state, div:has-text("No data found")').first();
    
    // Select Headers functionality
    // HTML: <button class="btn-modern dropdown-toggle-modern">Select Headers</button>
    // HTML: <ul class="dropdown-menu-modern p-1"> with checkboxes
    this.selectHeadersButton = page.locator('button.btn-modern.dropdown-toggle-modern:has-text("Select Headers"), app-dynamic-table button:has-text("Select Headers"), .order-history button:has-text("Select Headers"), button:has-text("Select Headers"), button:has-text("Select Columns"), .select-headers-btn, [aria-label*="Select Headers"]').first();
    this.selectHeadersDropdown = page.locator('ul.dropdown-menu-modern, ul.dropdown-menu-modern.p-1, .dropdown-menu:has-text("Select"), .select-headers-dropdown, [role="menu"]:has-text("Select")').first();
    this.selectHeadersModal = page.locator('.modal:has-text("Select Headers"), .modal:has-text("Select Columns"), [role="dialog"]:has-text("Select")').first();
    this.headerCheckboxes = this.selectHeadersModal.locator('.modal input[type="checkbox"], .modal mat-checkbox, [role="checkbox"]').first();
    this.modalCloseButton = this.selectHeadersModal.locator('button[aria-label="Close"], .modal-header button.close').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
    
    // Validation errors in billing form
    this.billingFormValidationErrors = page.locator('.billing-form .text-danger, .billing-form small.text-danger, .billing-form .alert-danger, .billing-form .error-message, form:has-text("Billing Details") .text-danger, form:has-text("Billing Details") small.text-danger, .modal:has-text("Billing Details") .text-danger, .modal:has-text("Billing Details") small.text-danger');
    this.billingFormRequiredFieldErrors = page.locator('.billing-form small:has-text("required"), .billing-form small:has-text("mandatory"), .billing-form .text-danger:has-text("required"), form:has-text("Billing Details") small:has-text("required"), .modal:has-text("Billing Details") small:has-text("required")');
  }

  /**
   * Navigates to Account Details page
   */
  async gotoAccountDetails() {
    try {
      // Try clicking on Account Details menu
      const menuVisible = await this.accountDetailsMenu.isVisible({ timeout: 5000 }).catch(() => false);
      if (menuVisible) {
        await this.accountDetailsMenu.click();
        await this.page.waitForTimeout(2000);
      } else {
        // If menu not found, try navigating directly
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        await this.page.goto(`${baseUrl}/account-details`);
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      // Fallback: navigate directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/account-details`);
      await this.page.waitForTimeout(2000);
    }
    
    // Wait for page to load
    await Promise.race([
      this.accountDetailsWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Account Details page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageHeading.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.accountDetailsWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets current page URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Verifies page URL contains "/account-details"
   * @returns {Promise<boolean>}
   */
  async verifyUrl() {
    const url = await this.getCurrentUrl();
    return url.toLowerCase().includes('/account-details') || url.toLowerCase().includes('accountdetails');
  }

  /**
   * Verifies all sections are visible
   * @returns {Promise<{profileDetails: boolean, subscriptionDetails: boolean, billingDetails: boolean, orderHistory: boolean}>}
   */
  async verifySections() {
    try {
      // Strategy 1: Check for card sections with card-title-modern
      const profileDetailsCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Profile Details")), .card-body:has(h5.card-title-modern:has-text("Profile Details"))').first();
      const profileDetails = await profileDetailsCard.isVisible({ timeout: 5000 }).catch(() => false) ||
                            await this.profileDetailsSection.isVisible({ timeout: 3000 }).catch(() => false);
      
      const subscriptionDetailsCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Subscription Details")), .card-body:has(h5.card-title-modern:has-text("Subscription Details"))').first();
      const subscriptionDetails = await subscriptionDetailsCard.isVisible({ timeout: 5000 }).catch(() => false) ||
                                 await this.subscriptionDetailsSection.isVisible({ timeout: 3000 }).catch(() => false);
      
      const billingDetails = await this.billingDetailsSection.isVisible({ timeout: 5000 }).catch(() => false);
      
      // Order History: Check for card with Order History title or the table itself
      const orderHistoryCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Order History")), .card-body:has(h5.card-title-modern:has-text("Order History"))').first();
      const orderHistory = await orderHistoryCard.isVisible({ timeout: 5000 }).catch(() => false) ||
                          await this.orderHistorySection.isVisible({ timeout: 3000 }).catch(() => false) ||
                          await this.orderHistoryTable.isVisible({ timeout: 3000 }).catch(() => false);
      
      return {
        profileDetails: profileDetails,
        subscriptionDetails: subscriptionDetails,
        billingDetails: billingDetails,
        orderHistory: orderHistory
      };
    } catch (error) {
      return {
        profileDetails: false,
        subscriptionDetails: false,
        billingDetails: false,
        orderHistory: false
      };
    }
  }

  /**
   * Clicks on Purchase Users button
   */
  async clickPurchaseUsers() {
    try {
      await this.purchaseUsersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.purchaseUsersButton.click();
      await this.page.waitForTimeout(2000); // Wait for navigation
    } catch (error) {
      throw new Error(`Failed to click Purchase Users button: ${error.message}`);
    }
  }

  /**
   * Verifies navigation to payment page
   * @returns {Promise<boolean>}
   */
  async verifyPaymentPageNavigation() {
    const url = await this.getCurrentUrl();
    return url.toLowerCase().includes('payment');
  }

  /**
   * Clicks on Profile Details Edit button
   */
  async clickProfileDetailsEdit() {
    try {
      // Strategy 1: Try primary locator (Edit link in Profile Details card)
      const editButtonVisible = await this.profileDetailsEditButton.isVisible({ timeout: 5000 }).catch(() => false);
      if (editButtonVisible) {
        await this.profileDetailsEditButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.profileDetailsEditButton.click();
        await this.page.waitForTimeout(1000);
        return;
      }
      
      // Strategy 2: Find Profile Details card and look for Edit link inside
      const profileCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Profile Details")), .card-body:has(h5.card-title-modern:has-text("Profile Details"))').first();
      const cardVisible = await profileCard.isVisible({ timeout: 5000 }).catch(() => false);
      if (cardVisible) {
        const editInCard = profileCard.locator('a.edit-link-modern, .edit-link-modern').first();
        const editVisible = await editInCard.isVisible({ timeout: 3000 }).catch(() => false);
        if (editVisible) {
          await editInCard.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await editInCard.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      }
      
      // Strategy 3: Fallback to original locator
      await this.profileDetailsEditButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.profileDetailsEditButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.profileDetailsEditButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Profile Details Edit button: ${error.message}`);
    }
  }

  /**
   * Verifies Profile Details Edit modal is open
   * @returns {Promise<boolean>}
   */
  async isProfileEditModalOpen() {
    try {
      return await this.profileDetailsEditModal.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies Name field is visible in Profile Edit modal
   * @returns {Promise<boolean>}
   */
  async isProfileModalNameFieldVisible() {
    try {
      // Strategy 1: Try primary locator
      const isVisible = await this.profileModalNameField.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) return true;
      
      // Strategy 2: Look for name field in modal
      const modal = this.page.locator('.common-modal.modern-modal:has-text("Edit Profile"), .modal:has-text("Edit Profile")').first();
      const modalVisible = await modal.isVisible({ timeout: 3000 }).catch(() => false);
      if (modalVisible) {
        const nameFieldInModal = modal.locator('input[ng-reflect-name="name"], input[placeholder*="full name"], label:has-text("Full Name") + input').first();
        return await nameFieldInModal.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      // Strategy 3: Look in app-dynamic-form
      const dynamicForm = this.page.locator('app-dynamic-form').first();
      const formVisible = await dynamicForm.isVisible({ timeout: 3000 }).catch(() => false);
      if (formVisible) {
        const nameFieldInForm = dynamicForm.locator('input[ng-reflect-name="name"], label:has-text("Full Name") + input').first();
        return await nameFieldInForm.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies Company field is visible in Profile Edit modal
   * @returns {Promise<boolean>}
   */
  async isProfileModalCompanyFieldVisible() {
    try {
      // Strategy 1: Try primary locator
      const isVisible = await this.profileModalCompanyField.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) return true;
      
      // Strategy 2: Look for companyName field in modal
      const modal = this.page.locator('.common-modal.modern-modal:has-text("Edit Profile"), .modal:has-text("Edit Profile")').first();
      const modalVisible = await modal.isVisible({ timeout: 3000 }).catch(() => false);
      if (modalVisible) {
        const companyFieldInModal = modal.locator('input[ng-reflect-name="companyName"], input[placeholder*="company Name"], label:has-text("Company Name") + input').first();
        return await companyFieldInModal.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      // Strategy 3: Look in app-dynamic-form
      const dynamicForm = this.page.locator('app-dynamic-form').first();
      const formVisible = await dynamicForm.isVisible({ timeout: 3000 }).catch(() => false);
      if (formVisible) {
        const companyFieldInForm = dynamicForm.locator('input[ng-reflect-name="companyName"], label:has-text("Company Name") + input').first();
        return await companyFieldInForm.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Closes Profile Details Edit modal
   */
  async closeProfileEditModal() {
    try {
      // Strategy 1: Try Cancel button
      const cancelButton = this.page.locator('.common-modal.modern-modal button.secondary-btn:has-text("Cancel"), .modal:has-text("Edit Profile") button:has-text("Cancel"), app-dynamic-form button:has-text("Cancel")').first();
      const cancelVisible = await cancelButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (cancelVisible) {
        await cancelButton.click();
        await this.page.waitForTimeout(500);
        return;
      }
      
      // Strategy 2: Try primary close button locator
      const closeButtonVisible = await this.profileModalCloseButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (closeButtonVisible) {
        await this.profileModalCloseButton.click();
        await this.page.waitForTimeout(500);
        return;
      }
      
      // Strategy 3: Press Escape or click outside
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Clicks on Billing Details Edit button
   */
  async clickBillingDetailsEdit() {
    try {
      // Wait for page to be ready after any navigation/reload
      await this.page.waitForTimeout(2000);
      
      // Wait for billing details section to be visible (might need to reload)
      let billingCardVisible = false;
      for (let retry = 0; retry < 3; retry++) {
        const billingCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Billing Details")), .card-body:has(h5.card-title-modern:has-text("Billing Details"))').first();
        billingCardVisible = await billingCard.isVisible({ timeout: 3000 }).catch(() => false);
        if (billingCardVisible) {
          break;
        }
        // If not visible, try reloading the page
        if (retry < 2) {
          await this.page.reload({ waitUntil: 'networkidle' }).catch(() => {});
          await this.page.waitForTimeout(2000);
        }
      }
      
      if (!billingCardVisible) {
        // Try navigating to account details page again
        await this.gotoAccountDetails();
        await this.page.waitForTimeout(2000);
      }
      
      // Find the billing details card
      const billingCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Billing Details")), .card-body:has(h5.card-title-modern:has-text("Billing Details"))').first();
      
      // Wait for billing card to be visible
      await billingCard.waitFor({ state: 'visible', timeout: 10000 });
      
      // Find Edit button within the billing card
      const editButtonInCard = billingCard.locator('a.edit-link-modern, .edit-link-modern').first();
      
      // Try the scoped locator first with retry
      let editButtonClicked = false;
      for (let retry = 0; retry < 3; retry++) {
        try {
          await editButtonInCard.waitFor({ state: 'visible', timeout: 5000 });
          await editButtonInCard.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await editButtonInCard.click();
          editButtonClicked = true;
          break;
        } catch (error) {
          if (retry < 2) {
            // Try scrolling to the card first
            await billingCard.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
          } else {
            // Fallback to the main locator
            try {
              await this.billingDetailsEditButton.waitFor({ state: 'visible', timeout: 5000 });
              await this.billingDetailsEditButton.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(500);
              await this.billingDetailsEditButton.click();
              editButtonClicked = true;
              break;
            } catch (error2) {
              throw new Error(`Edit button not found in Billing Details section: ${error2.message}`);
            }
          }
        }
      }

      if (!editButtonClicked) {
        throw new Error('Edit button not found after retries');
      }

      // Wait for form to appear - check for form fields
      await this.page.waitForTimeout(2000);
      
      // Wait for at least one form field to be visible
      let formFieldVisible = false;
      for (let i = 0; i < 5; i++) {
        formFieldVisible = await this.billingFormCompanyField.isVisible({ timeout: 1000 }).catch(() => false) ||
                          await this.billingFormEmailField.isVisible({ timeout: 1000 }).catch(() => false) ||
                          await this.billingFormNameField.isVisible({ timeout: 1000 }).catch(() => false);
        if (formFieldVisible) {
          break;
        }
        await this.page.waitForTimeout(500);
      }
      
      if (!formFieldVisible) {
        console.log('Warning: Form fields not immediately visible after clicking Edit');
      }
    } catch (error) {
      throw new Error(`Failed to click Billing Details Edit button: ${error.message}`);
    }
  }

  /**
   * Verifies Billing Details form/page is visible
   * @returns {Promise<boolean>}
   */
  async isBillingFormVisible() {
    try {
      // First check if form container is visible
      const formVisible = await this.billingDetailsForm.isVisible({ timeout: 3000 }).catch(() => false);
      if (formVisible) {
        return true;
      }

      // Check if form modal is visible
      const modalVisible = await this.billingFormModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (modalVisible) {
        return true;
      }

      // Check if form fields are visible (more reliable indicator)
      const companyFieldVisible = await this.billingFormCompanyField.isVisible({ timeout: 3000 }).catch(() => false);
      const emailFieldVisible = await this.billingFormEmailField.isVisible({ timeout: 3000 }).catch(() => false);
      const nameFieldVisible = await this.billingFormNameField.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (companyFieldVisible || emailFieldVisible || nameFieldVisible) {
        return true;
      }

      // Check if submit button is visible (indicates form is open)
      const submitButtonVisible = await this.billingFormSubmitButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (submitButtonVisible) {
        return true;
      }

      // Last resort: check URL
      const url = await this.getCurrentUrl();
      return url.toLowerCase().includes('billing') || url.toLowerCase().includes('edit');
    } catch (error) {
      // Final fallback: check if any form field is visible
      try {
        const anyFieldVisible = await this.billingFormCompanyField.isVisible({ timeout: 2000 }).catch(() => false) ||
                                await this.billingFormEmailField.isVisible({ timeout: 2000 }).catch(() => false) ||
                                await this.billingFormNameField.isVisible({ timeout: 2000 }).catch(() => false);
        return anyFieldVisible;
      } catch {
        return false;
      }
    }
  }

  /**
   * Verifies billing form fields are visible
   * @returns {Promise<{name: boolean, company: boolean, mobile: boolean, address: boolean}>}
   */
  async verifyBillingFormFields() {
    try {
      const name = await this.billingFormNameField.isVisible({ timeout: 3000 }).catch(() => false);
      const company = await this.billingFormCompanyField.isVisible({ timeout: 3000 }).catch(() => false);
      const mobile = await this.billingFormMobileField.isVisible({ timeout: 3000 }).catch(() => false);
      const address = await this.billingFormAddressField.isVisible({ timeout: 3000 }).catch(() => false);
      
      return {
        name: name,
        company: company,
        mobile: mobile,
        address: address
      };
    } catch (error) {
      return {
        name: false,
        company: false,
        mobile: false,
        address: false
      };
    }
  }

  /**
   * Verifies Order History table is visible
   * @returns {Promise<boolean>}
   */
  async isOrderHistoryTableVisible() {
    try {
      // Strategy 1: Check for app-dynamic-table with table
      const appDynamicTable = this.page.locator('app-dynamic-table[tableusedcomponent="order-history"], app-dynamic-table').first();
      const appTableVisible = await appDynamicTable.isVisible({ timeout: 3000 }).catch(() => false);
      if (appTableVisible) {
        // Check if table inside is visible
        const tableInside = appDynamicTable.locator('table.mat-mdc-table, table').first();
        const tableVisible = await tableInside.isVisible({ timeout: 3000 }).catch(() => false);
        if (tableVisible) return true;
      }
      
      // Strategy 2: Check for table directly
      const tableVisible = await this.orderHistoryTable.isVisible({ timeout: 3000 }).catch(() => false);
      if (tableVisible) return true;
      
      // Strategy 3: Check for Order History section card
      const orderHistoryCard = this.page.locator('.card-body:has(.card-title-modern:has-text("Order History")), .card-body:has(h5.card-title-modern:has-text("Order History"))').first();
      const cardVisible = await orderHistoryCard.isVisible({ timeout: 3000 }).catch(() => false);
      if (cardVisible) {
        // Check if table exists inside the card
        const tableInCard = orderHistoryCard.locator('table, app-dynamic-table table').first();
        return await tableInCard.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets Order History table row count
   * @returns {Promise<number>}
   */
  async getOrderHistoryRowCount() {
    try {
      return await this.orderHistoryRows.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Verifies Order History table has data or shows "No data found"
   * @returns {Promise<{hasData: boolean, rowCount: number, noDataMessageVisible: boolean}>}
   */
  async verifyOrderHistoryData() {
    try {
      const rowCount = await this.getOrderHistoryRowCount();
      const noDataMessageVisible = await this.noDataFoundMessage.isVisible({ timeout: 2000 }).catch(() => false);
      const hasData = rowCount > 0;
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        noDataMessageVisible: noDataMessageVisible
      };
    } catch (error) {
      return {
        hasData: false,
        rowCount: 0,
        noDataMessageVisible: false
      };
    }
  }

  /**
   * Verifies Order History table columns are visible
   * @returns {Promise<{dateTime: boolean, orderId: boolean, subId: boolean, planName: boolean, amount: boolean, status: boolean}>}
   */
  async verifyOrderHistoryColumns() {
    try {
      const dateTime = await this.dateTimeColumn.isVisible({ timeout: 2000 }).catch(() => false);
      const orderId = await this.orderIdColumn.isVisible({ timeout: 2000 }).catch(() => false);
      const subId = await this.subIdColumn.isVisible({ timeout: 2000 }).catch(() => false);
      const planName = await this.planNameColumn.isVisible({ timeout: 2000 }).catch(() => false);
      const amount = await this.amountColumn.isVisible({ timeout: 2000 }).catch(() => false);
      const status = await this.statusColumn.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        dateTime: dateTime,
        orderId: orderId,
        subId: subId,
        planName: planName,
        amount: amount,
        status: status
      };
    } catch (error) {
      return {
        dateTime: false,
        orderId: false,
        subId: false,
        planName: false,
        amount: false,
        status: false
      };
    }
  }

  /**
   * Clicks on Select Headers button
   */
  async clickSelectHeaders() {
    try {
      // Strategy 1: Try primary locator
      const buttonVisible = await this.selectHeadersButton.isVisible({ timeout: 5000 }).catch(() => false);
      if (buttonVisible) {
        await this.selectHeadersButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.selectHeadersButton.click();
        await this.page.waitForTimeout(1000);
        
        // Wait for dropdown or modal to open
        await Promise.race([
          this.selectHeadersDropdown.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
          this.selectHeadersModal.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {})
        ]);
        return;
      }
      
      // Strategy 2: Find button in app-dynamic-table
      const appDynamicTable = this.page.locator('app-dynamic-table[tableusedcomponent="order-history"], app-dynamic-table').first();
      const tableVisible = await appDynamicTable.isVisible({ timeout: 5000 }).catch(() => false);
      if (tableVisible) {
        const buttonInTable = appDynamicTable.locator('button.btn-modern.dropdown-toggle-modern:has-text("Select Headers"), button:has-text("Select Headers")').first();
        const buttonInTableVisible = await buttonInTable.isVisible({ timeout: 3000 }).catch(() => false);
        if (buttonInTableVisible) {
          await buttonInTable.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await buttonInTable.click();
          await this.page.waitForTimeout(1000);
          
          // Wait for dropdown to open
          await this.selectHeadersDropdown.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
          return;
        }
      }
      
      // Strategy 3: Fallback to original
      await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectHeadersButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.selectHeadersButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for dropdown or modal to open
      await Promise.race([
        this.selectHeadersDropdown.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
        this.selectHeadersModal.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {})
      ]);
    } catch (error) {
      throw new Error(`Failed to click Select Headers button: ${error.message}`);
    }
  }

  /**
   * Verifies Select Headers dropdown/modal is open
   * @returns {Promise<boolean>}
   */
  async isSelectHeadersOpen() {
    try {
      const dropdownVisible = await this.selectHeadersDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      const modalVisible = await this.selectHeadersModal.isVisible({ timeout: 2000 }).catch(() => false);
      return dropdownVisible || modalVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all header checkbox options
   * @returns {Promise<Array<{label: string, checked: boolean}>>}
   */
  async getHeaderOptions() {
    try {
      // Try modal first
      const modalVisible = await this.selectHeadersModal.isVisible({ timeout: 2000 }).catch(() => false);
      const container = modalVisible ? this.selectHeadersModal : this.selectHeadersDropdown;
      
      // HTML: <li><label><input type="checkbox" value="Date & Time"><span>Date & Time</span></label></li>
      const checkboxes = container.locator('input[type="checkbox"], mat-checkbox, [role="checkbox"]');
      const count = await checkboxes.count();
      const options = [];
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const label = await checkbox.evaluate(el => {
          // Try to get label from parent label element
          const labelEl = el.closest('label') || el.parentElement?.querySelector('label');
          if (labelEl) {
            // Get text from span inside label or from label itself
            const span = labelEl.querySelector('span');
            if (span) {
              return span.textContent?.trim() || '';
            }
            return labelEl.textContent?.trim() || '';
          }
          // Fallback: get value attribute
          return el.getAttribute('value') || '';
        }).catch(() => '');
        const checked = await checkbox.isChecked().catch(() => false);
        options.push({ label, checked });
      }
      
      return options;
    } catch (error) {
      return [];
    }
  }

  /**
   * Toggles a header checkbox by index
   * @param {number} index - Index of the checkbox to toggle
   */
  async toggleHeaderCheckbox(index) {
    try {
      const modalVisible = await this.selectHeadersModal.isVisible({ timeout: 2000 }).catch(() => false);
      const container = modalVisible ? this.selectHeadersModal : this.selectHeadersDropdown;
      
      const checkboxes = container.locator('input[type="checkbox"], mat-checkbox, [role="checkbox"]');
      const checkbox = checkboxes.nth(index);
      
      const isChecked = await checkbox.isChecked().catch(() => false);
      if (isChecked) {
        await checkbox.uncheck();
      } else {
        await checkbox.check();
      }
      await this.page.waitForTimeout(1000); // Wait for table to update
    } catch (error) {
      throw new Error(`Failed to toggle header checkbox: ${error.message}`);
    }
  }

  /**
   * Closes Select Headers dropdown/modal
   */
  async closeSelectHeaders() {
    try {
      const modalVisible = await this.selectHeadersModal.isVisible({ timeout: 2000 }).catch(() => false);
      if (modalVisible) {
        const closeButtonVisible = await this.modalCloseButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (closeButtonVisible) {
          await this.modalCloseButton.click();
        } else {
          await this.page.keyboard.press('Escape');
        }
      } else {
        // For dropdown, click outside or press Escape
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors
    }
  }

  /**
   * Gets the count of visible table columns
   * @returns {Promise<number>}
   */
  async getVisibleColumnCount() {
    try {
      return await this.orderHistoryHeaders.count();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Verifies required fields in billing form
   * @returns {Promise<{allRequiredVisible: boolean, company: boolean, email: boolean, name: boolean, mobile: boolean, address: boolean, state: boolean, country: boolean, city: boolean, zip: boolean, gstTreatment: boolean, companyType: boolean}>}
   */
  async verifyBillingRequiredFields() {
    try {
      const company = await this.billingFormCompanyField.isVisible({ timeout: 3000 }).catch(() => false);
      const email = await this.billingFormEmailField.isVisible({ timeout: 3000 }).catch(() => false);
      const name = await this.billingFormNameField.isVisible({ timeout: 3000 }).catch(() => false);
      const mobile = await this.billingFormMobileField.isVisible({ timeout: 3000 }).catch(() => false);
      const address = await this.billingFormAddressField.isVisible({ timeout: 3000 }).catch(() => false);
      const state = await this.billingFormStateDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      const country = await this.billingFormCountryDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      const city = await this.billingFormCityDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      const zip = await this.billingFormZipField.isVisible({ timeout: 3000 }).catch(() => false);
      const gstTreatment = await this.billingFormGstTreatmentDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      const companyType = await this.billingFormCompanyTypeDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      
      const allRequiredVisible = company && email && name && mobile && address && state && country && city && zip && gstTreatment && companyType;
      
      return {
        allRequiredVisible,
        company,
        email,
        name,
        mobile,
        address,
        state,
        country,
        city,
        zip,
        gstTreatment,
        companyType
      };
    } catch (error) {
      return {
        allRequiredVisible: false,
        company: false,
        email: false,
        name: false,
        mobile: false,
        address: false,
        state: false,
        country: false,
        city: false,
        zip: false,
        gstTreatment: false,
        companyType: false
      };
    }
  }

  /**
   * Gets the selected country value
   * @returns {Promise<string>}
   */
  async getSelectedCountry() {
    try {
      // Use timeout to prevent hanging
      const getCountryPromise = (async () => {
        // First try to get the selected option text (country name)
        const selectedOptionText = await this.billingFormCountryDropdown.locator('option:checked, option[selected]').textContent().catch(() => '');
        if (selectedOptionText && selectedOptionText.trim() && !selectedOptionText.includes('Select an option')) {
          return selectedOptionText.trim();
        }
        
        // Fallback: get the value attribute (might be country code)
        const value = await this.billingFormCountryDropdown.inputValue().catch(() => '');
        if (value && value.trim()) {
          // If value is a country code like "IN", try to find the corresponding country name
          if (value.length === 2) {
            // It's a country code, try to get the text of the selected option
            const optionText = await this.billingFormCountryDropdown.locator(`option[value="${value}"]`).textContent().catch(() => '');
            if (optionText && optionText.trim()) {
              return optionText.trim();
            }
          }
          return value;
        }
        
        // Last resort: evaluate to get selected option
        const country = await this.billingFormCountryDropdown.evaluate((select) => {
          const selectedOption = select.options[select.selectedIndex];
          if (selectedOption && selectedOption.text) {
            return selectedOption.text.trim();
          }
          return '';
        }).catch(() => '');
        
        return country || '';
      })();
      
      return await Promise.race([
        getCountryPromise,
        new Promise((resolve) => setTimeout(() => resolve(''), 5000)) // Max 5 seconds
      ]);
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if mobile field has correct length validation based on country
   * @returns {Promise<{isValid: boolean, country: string, mobileLength: number, expectedLength: string}>}
   */
  async verifyMobileFormat() {
    try {
      const country = await this.getSelectedCountry();
      const mobileValue = await this.billingFormMobileField.inputValue().catch(() => '');
      const mobileLength = mobileValue.length;
      
      let isValid = false;
      let expectedLength = '';
      
      if (country.toLowerCase().includes('india')) {
        expectedLength = '10';
        isValid = mobileLength === 10;
      } else {
        // For non-India countries, allow 5-15 digits (some countries have longer numbers)
        expectedLength = '5-15';
        isValid = mobileLength >= 5 && mobileLength <= 15;
      }
      
      return {
        isValid,
        country,
        mobileLength,
        expectedLength
      };
    } catch (error) {
      return {
        isValid: false,
        country: '',
        mobileLength: 0,
        expectedLength: '',
        error: error.message
      };
    }
  }

  /**
   * Checks if email field has valid format
   * @returns {Promise<boolean>}
   */
  async verifyEmailFormat() {
    try {
      const emailValue = await this.billingFormEmailField.inputValue().catch(() => '');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(emailValue);
    } catch (error) {
      return false;
    }
  }

  /**
   * Fills all billing form fields
   * @param {Object} billingData - Object containing billing form data
   */
  async fillBillingForm(billingData) {
    try {
      // Column 1
      if (billingData.company) {
        await this.billingFormCompanyField.clear();
        await this.billingFormCompanyField.fill(billingData.company);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.email) {
        await this.billingFormEmailField.clear();
        await this.billingFormEmailField.fill(billingData.email);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.registeredCompany) {
        await this.billingFormRegisteredCompanyField.clear();
        await this.billingFormRegisteredCompanyField.fill(billingData.registeredCompany);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.address) {
        await this.billingFormAddressField.clear();
        await this.billingFormAddressField.fill(billingData.address);
        await this.page.waitForTimeout(300);
      }
      
      // Column 2
      if (billingData.name) {
        await this.billingFormNameField.clear();
        await this.billingFormNameField.fill(billingData.name);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.gstTreatment) {
        await this.billingFormGstTreatmentDropdown.selectOption(billingData.gstTreatment);
        await this.page.waitForTimeout(500); // Wait for GSTIN field to enable/disable
      }
      
      if (billingData.companyType) {
        await this.billingFormCompanyTypeDropdown.selectOption(billingData.companyType);
        await this.page.waitForTimeout(300);
      }
      
      // Select country first, then state, then city (city depends on state)
      if (billingData.country) {
        await this.billingFormCountryDropdown.selectOption(billingData.country);
        await this.page.waitForTimeout(1000); // Wait for state/city to enable/disable and populate
      }
      
      // Select state after country, as city dropdown depends on state
      if (billingData.state) {
        await this.billingFormStateDropdown.selectOption(billingData.state);
        await this.page.waitForTimeout(1000); // Wait for city dropdown to populate based on state
      }
      
      // Select city last, after state is selected and city options are populated
      if (billingData.city) {
        // Wait for city dropdown to have options before selecting (with timeout)
        let cityOptionsAvailable = false;
        const cityWaitPromise = (async () => {
          for (let i = 0; i < 5; i++) {
            const optionCount = await this.billingFormCityDropdown.locator('option:not([disabled]):not([value=""])').count();
            if (optionCount > 0) {
              cityOptionsAvailable = true;
              break;
            }
            await this.page.waitForTimeout(500);
          }
        })();
        
        // Race condition: wait for options or timeout after 3 seconds
        await Promise.race([
          cityWaitPromise,
          new Promise((resolve) => setTimeout(resolve, 3000))
        ]);
        
        if (cityOptionsAvailable) {
          await this.billingFormCityDropdown.selectOption(billingData.city).catch(() => {
            console.log('  Warning: Could not select city, continuing anyway');
          });
          await this.page.waitForTimeout(300);
        } else {
          console.log('  Warning: City dropdown has no options, skipping city selection');
        }
      }
      
      // Column 3
      if (billingData.mobile) {
        await this.billingFormMobileField.clear();
        await this.billingFormMobileField.fill(billingData.mobile);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.gstin) {
        await this.billingFormGstinField.clear();
        await this.billingFormGstinField.fill(billingData.gstin);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.pan) {
        await this.billingFormPanField.clear();
        await this.billingFormPanField.fill(billingData.pan);
        await this.page.waitForTimeout(300);
      }
      
      if (billingData.zip) {
        await this.billingFormZipField.clear();
        await this.billingFormZipField.fill(billingData.zip);
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      throw new Error(`Failed to fill billing form: ${error.message}`);
    }
  }

  /**
   * Gets all billing form field values
   * @returns {Promise<Object>}
   */
  async getBillingFormValues() {
    try {
      // Use Promise.allSettled with timeouts to prevent hanging
      const getValueWithTimeout = async (promise, timeout = 3000) => {
        return Promise.race([
          promise,
          new Promise((resolve) => setTimeout(() => resolve(''), timeout))
        ]).catch(() => '');
      };

      const values = await Promise.allSettled([
        getValueWithTimeout(this.billingFormCompanyField.inputValue()),
        getValueWithTimeout(this.billingFormEmailField.inputValue()),
        getValueWithTimeout(this.billingFormRegisteredCompanyField.inputValue()),
        getValueWithTimeout(this.billingFormAddressField.inputValue()),
        getValueWithTimeout(this.billingFormNameField.inputValue()),
        getValueWithTimeout(this.billingFormMobileField.inputValue()),
        getValueWithTimeout(this.billingFormGstinField.inputValue()),
        getValueWithTimeout(this.billingFormPanField.inputValue()),
        getValueWithTimeout(this.billingFormZipField.inputValue()),
        getValueWithTimeout(
          this.billingFormStateDropdown.inputValue().catch(async () => {
            const selected = await this.billingFormStateDropdown.locator('option:checked').textContent().catch(() => '');
            return selected.trim();
          })
        ),
        getValueWithTimeout(
          this.billingFormGstTreatmentDropdown.inputValue().catch(async () => {
            const selected = await this.billingFormGstTreatmentDropdown.locator('option:checked').textContent().catch(() => '');
            return selected.trim();
          })
        ),
        getValueWithTimeout(
          this.billingFormCompanyTypeDropdown.inputValue().catch(async () => {
            const selected = await this.billingFormCompanyTypeDropdown.locator('option:checked').textContent().catch(() => '');
            return selected.trim();
          })
        ),
        getValueWithTimeout(
          this.billingFormCountryDropdown.inputValue().catch(async () => {
            const selected = await this.billingFormCountryDropdown.locator('option:checked').textContent().catch(() => '');
            return selected.trim();
          })
        ),
        getValueWithTimeout(
          this.billingFormCityDropdown.inputValue().catch(async () => {
            const selected = await this.billingFormCityDropdown.locator('option:checked').textContent().catch(() => '');
            return selected.trim();
          })
        )
      ]);

      return {
        company: values[0].status === 'fulfilled' ? values[0].value : '',
        email: values[1].status === 'fulfilled' ? values[1].value : '',
        registeredCompany: values[2].status === 'fulfilled' ? values[2].value : '',
        address: values[3].status === 'fulfilled' ? values[3].value : '',
        name: values[4].status === 'fulfilled' ? values[4].value : '',
        mobile: values[5].status === 'fulfilled' ? values[5].value : '',
        gstin: values[6].status === 'fulfilled' ? values[6].value : '',
        pan: values[7].status === 'fulfilled' ? values[7].value : '',
        zip: values[8].status === 'fulfilled' ? values[8].value : '',
        state: values[9].status === 'fulfilled' ? values[9].value : '',
        gstTreatment: values[10].status === 'fulfilled' ? values[10].value : '',
        companyType: values[11].status === 'fulfilled' ? values[11].value : '',
        country: values[12].status === 'fulfilled' ? values[12].value : '',
        city: values[13].status === 'fulfilled' ? values[13].value : ''
      };
    } catch (error) {
      console.log(`Warning: Error getting billing form values: ${error.message}`);
      return {};
    }
  }

  /**
   * Clears all billing form fields
   */
  async clearAllBillingFormFields() {
    try {
      // Clear text input fields with strict timeout to prevent hanging
      const clearField = async (field) => {
        try {
          // Use Promise.race with timeout to prevent hanging
          const clearPromise = (async () => {
            const isVisible = await field.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              const isDisabled = await field.isDisabled().catch(() => false);
              if (!isDisabled) {
                await field.clear({ timeout: 1000 }).catch(() => {});
              }
            }
          })();
          
          await Promise.race([
            clearPromise,
            new Promise((resolve) => setTimeout(resolve, 2000)) // Max 2 seconds per field
          ]);
        } catch (error) {
          // Silently continue - field may be disabled or not clearable
        }
      };

      // Clear all fields sequentially with timeout to prevent hanging
      const clearWithTimeout = Promise.race([
        Promise.allSettled([
          clearField(this.billingFormCompanyField),
          clearField(this.billingFormEmailField),
          clearField(this.billingFormRegisteredCompanyField),
          clearField(this.billingFormAddressField),
          clearField(this.billingFormNameField),
          clearField(this.billingFormMobileField),
          clearField(this.billingFormGstinField), // May be disabled, continue anyway
          clearField(this.billingFormPanField),
          clearField(this.billingFormZipField)
        ]),
        new Promise((resolve) => setTimeout(resolve, 10000)) // Max 10 seconds total
      ]);
      
      await clearWithTimeout;
      
      // Reset dropdowns to first option or empty with strict timeout
      const resetDropdown = async (dropdown) => {
        try {
          const resetPromise = (async () => {
            const isVisible = await dropdown.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              const isDisabled = await dropdown.isDisabled().catch(() => false);
              if (!isDisabled) {
                await dropdown.selectOption({ index: 0 }).catch(() => {
                  // Try selecting empty value if index 0 doesn't work
                  dropdown.evaluate(el => {
                    if (el.tagName === 'SELECT' && el.options.length > 0) {
                      el.selectedIndex = 0;
                      el.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                  }).catch(() => {});
                });
              }
            }
          })();
          
          await Promise.race([
            resetPromise,
            new Promise((resolve) => setTimeout(resolve, 2000)) // Max 2 seconds per dropdown
          ]);
        } catch (error) {
          // Silently continue - dropdown may be disabled or not resettable
        }
      };

      // Reset all dropdowns with timeout
      const resetWithTimeout = Promise.race([
        Promise.allSettled([
          resetDropdown(this.billingFormStateDropdown),
          resetDropdown(this.billingFormCountryDropdown),
          resetDropdown(this.billingFormCityDropdown),
          resetDropdown(this.billingFormGstTreatmentDropdown),
          resetDropdown(this.billingFormCompanyTypeDropdown)
        ]),
        new Promise((resolve) => setTimeout(resolve, 10000)) // Max 10 seconds total
      ]);
      
      await resetWithTimeout;
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Don't throw error, just continue
      // Some fields may be disabled or not clearable, which is okay
    }
  }

  /**
   * Gets all validation errors from billing form
   * @returns {Promise<Array<string>>}
   */
  async getBillingFormValidationErrors() {
    try {
      // Wait for validation errors to appear with retry
      let errors = [];
      for (let i = 0; i < 3; i++) {
        await this.page.waitForTimeout(1000);
        
        errors = [];
        
        // Get all validation error elements
        const errorElements = await this.billingFormValidationErrors.all();
        for (const errorEl of errorElements) {
          const isVisible = await errorEl.isVisible({ timeout: 500 }).catch(() => false);
          if (isVisible) {
            const errorText = await errorEl.textContent().catch(() => '');
            if (errorText && errorText.trim()) {
              errors.push(errorText.trim());
            }
          }
        }
        
        // Also check for required field errors
        const requiredErrors = await this.billingFormRequiredFieldErrors.all();
        for (const errorEl of requiredErrors) {
          const isVisible = await errorEl.isVisible({ timeout: 500 }).catch(() => false);
          if (isVisible) {
            const errorText = await errorEl.textContent().catch(() => '');
            if (errorText && errorText.trim() && !errors.includes(errorText.trim())) {
              errors.push(errorText.trim());
            }
          }
        }
        
        // Check for ng-invalid classes on required fields
        const invalidFields = await this.page.locator('.billing-form input.ng-invalid, form:has-text("Billing Details") input.ng-invalid, .modal:has-text("Billing Details") input.ng-invalid, input.ng-invalid').all();
        if (invalidFields.length > 0) {
          // If we have invalid fields but no error messages, return a generic message
          if (errors.length === 0) {
            errors.push(`Required fields validation triggered (${invalidFields.length} invalid field(s))`);
          }
        }
        
        if (errors.length > 0 || invalidFields.length > 0) {
          break; // Found errors, exit retry loop
        }
      }
      
      return errors;
    } catch (error) {
      return [];
    }
  }

  /**
   * Clicks Submit button in billing form
   */
  async clickBillingFormSubmit() {
    try {
      await this.billingFormSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.billingFormSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.billingFormSubmitButton.click();
      await this.page.waitForTimeout(2000); // Wait for form to submit and close
    } catch (error) {
      throw new Error(`Failed to click billing form Submit button: ${error.message}`);
    }
  }

  /**
   * Checks if state and city dropdowns are disabled when country is India
   * @returns {Promise<{stateDisabled: boolean, cityDisabled: boolean, country: string, isIndia: boolean}>}
   */
  async checkStateCityDisabledForIndia() {
    try {
      // Wait a bit for country selection to take effect and state/city to update
      await this.page.waitForTimeout(2000);
      
      const country = await this.getSelectedCountry();
      // Check if country is India (case-insensitive, also check for country code "IN")
      const isIndia = country.toLowerCase().includes('india') || 
                      country.toLowerCase() === 'in' ||
                      country === 'IN';
      
      // Check disabled status using multiple methods
      const checkDisabled = async (dropdown) => {
        try {
          // Method 1: Use isDisabled() method
          const isDisabledMethod = await dropdown.isDisabled().catch(() => false);
          if (isDisabledMethod) {
            return true;
          }
          
          // Method 2: Check disabled attribute
          const hasDisabledAttr = await dropdown.evaluate((el) => {
            return el.hasAttribute('disabled') || el.disabled === true;
          }).catch(() => false);
          if (hasDisabledAttr) {
            return true;
          }
          
          // Method 3: Check for disabled class or readonly
          const hasDisabledClass = await dropdown.evaluate((el) => {
            return el.classList.contains('disabled') || 
                   el.classList.contains('ng-disabled') ||
                   el.hasAttribute('readonly') ||
                   el.readOnly === true;
          }).catch(() => false);
          if (hasDisabledClass) {
            return true;
          }
          
          // Method 4: Check if pointer-events is none (CSS disabled)
          const pointerEventsNone = await dropdown.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.pointerEvents === 'none' || style.opacity < '0.5';
          }).catch(() => false);
          if (pointerEventsNone) {
            return true;
          }
          
          return false;
        } catch (error) {
          return false;
        }
      };
      
      // Get state and city disabled status with timeout
      const stateDisabledPromise = checkDisabled(this.billingFormStateDropdown);
      const cityDisabledPromise = checkDisabled(this.billingFormCityDropdown);
      
      const [stateDisabled, cityDisabled] = await Promise.all([
        Promise.race([stateDisabledPromise, new Promise((resolve) => setTimeout(() => resolve(false), 5000))]),
        Promise.race([cityDisabledPromise, new Promise((resolve) => setTimeout(() => resolve(false), 5000))])
      ]);
      
      return {
        stateDisabled,
        cityDisabled,
        country,
        isIndia
      };
    } catch (error) {
      return {
        stateDisabled: false,
        cityDisabled: false,
        country: '',
        isIndia: false
      };
    }
  }

  /**
   * Checks if GSTIN field is enabled/disabled based on GST Treatment
   * @returns {Promise<{gstinEnabled: boolean, gstTreatment: string, isRegistered: boolean}>}
   */
  async checkGstinFieldState() {
    try {
      // Wait a bit for GST Treatment selection to take effect
      await this.page.waitForTimeout(1000);
      
      const gstTreatment = await this.billingFormGstTreatmentDropdown.inputValue().catch(async () => {
        const selected = await this.billingFormGstTreatmentDropdown.locator('option:checked').textContent().catch(() => '');
        return selected.trim();
      });
      
      const isRegistered = gstTreatment.toLowerCase().includes('registered');
      
      // Check disabled status using multiple methods (similar to state/city check)
      const checkGstinDisabled = async () => {
        try {
          // Method 1: Use isDisabled() method
          const isDisabledMethod = await this.billingFormGstinField.isDisabled().catch(() => false);
          if (isDisabledMethod) {
            return true;
          }
          
          // Method 2: Check disabled attribute
          const hasDisabledAttr = await this.billingFormGstinField.evaluate((el) => {
            return el.hasAttribute('disabled') || el.disabled === true;
          }).catch(() => false);
          if (hasDisabledAttr) {
            return true;
          }
          
          // Method 3: Check for disabled class or readonly
          const hasDisabledClass = await this.billingFormGstinField.evaluate((el) => {
            return el.classList.contains('disabled') || 
                   el.classList.contains('ng-disabled') ||
                   el.hasAttribute('readonly') ||
                   el.readOnly === true;
          }).catch(() => false);
          if (hasDisabledClass) {
            return true;
          }
          
          // Method 4: Check if pointer-events is none (CSS disabled)
          const pointerEventsNone = await this.billingFormGstinField.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.pointerEvents === 'none' || style.opacity < '0.5';
          }).catch(() => false);
          if (pointerEventsNone) {
            return true;
          }
          
          return false;
        } catch (error) {
          return false;
        }
      };
      
      const gstinDisabled = await Promise.race([
        checkGstinDisabled(),
        new Promise((resolve) => setTimeout(() => resolve(false), 5000))
      ]);
      
      const gstinEnabled = !gstinDisabled;
      
      return {
        gstinEnabled,
        gstTreatment,
        isRegistered
      };
    } catch (error) {
      return {
        gstinEnabled: false,
        gstTreatment: '',
        isRegistered: false
      };
    }
  }

  /**
   * Gets billing details from the card/display section
   * @returns {Promise<Object>}
   */
  async getBillingDetailsFromCard() {
    try {
      await this.billingDetailsCard.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Extract billing details from the card using evaluate
      const details = await this.page.evaluate(() => {
        const card = document.querySelector('.card-body:has(.card-title-modern:has-text("Billing Details")), .billing-details .card, .billing-details [class*="card"], .billing-details-section .card');
        if (!card) return {};
        
        const details = {};
        
        // Extract fields from detail-row-modern structure
        const detailRows = Array.from(card.querySelectorAll('.detail-row-modern'));
        detailRows.forEach(row => {
          const labelElement = row.querySelector('.detail-label-modern p, .detail-label-modern');
          const valueElement = row.querySelector('.detail-value-modern p, .detail-value-modern');
          
          if (labelElement && valueElement) {
            const labelText = (labelElement.textContent || '').toLowerCase().replace(':', '').trim();
            const value = (valueElement.textContent || '').trim();
            
            if (labelText.includes('name') && !details.name) details.name = value;
            if (labelText.includes('company') && !details.company) details.company = value;
            if (labelText.includes('mobile') && !details.mobile) details.mobile = value;
            if (labelText.includes('email') && !details.email) details.email = value;
            if (labelText.includes('address') && !details.address) details.address = value;
            if (labelText.includes('city') && !details.city) details.city = value;
            if (labelText.includes('state') && !details.state && value) details.state = value;
            if (labelText.includes('country') && !details.country) details.country = value;
            if ((labelText.includes('pin') || labelText.includes('zip')) && !details.zip) details.zip = value;
          }
        });
        
        // Fallback: Extract common fields from text if not found above
        if (!details.email) {
          const text = card.textContent || '';
          const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
          if (emailMatch) details.email = emailMatch[0];
        }
        
        if (!details.mobile) {
          const text = card.textContent || '';
          const mobileMatch = text.match(/\b\d{10,12}\b|\b\d{5,10}\b/);
          if (mobileMatch) details.mobile = mobileMatch[0];
        }
        
        return details;
      });
      
      return details;
    } catch (error) {
      return {};
    }
  }
}

module.exports = { AccountDetailsPage };

