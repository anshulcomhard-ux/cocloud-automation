class CustomersPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Customer module entry
    this.customersMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/customer"], ' +
        'div.sidebar-items:has(span.title:has-text("Customer"))'
      )
      .first();

    
    // Customers page title
    this.customersPageTitle = page
      .locator(
        'h1:has-text("Customer"), h2:has-text("Customer"), span.title:has-text("Customer"), *:has-text("Customer")'
      )
      .first();

    // "+ Customer" button (add customer)
    this.addCustomerButton = page.locator('button.btn.add-btn:has-text("Customer")');

    // Add Customer / Update Customer modal container
    this.modalDialog = page.locator('div.modal-section');

    // Form field locators inside modal - using IDs from provided HTML
    this.customerNameInput = page.locator('div.modal-section input#nameInput');
    this.emailInput = page.locator('div.modal-section input#emailInput');
    this.phoneInput = page.locator('div.modal-section input#mobileInput');
    this.companyInput = page.locator('div.modal-section input#companyName');
    this.passwordInput = page.locator('#password, input[placeholder="Password"]');
    this.confirmPasswordInput = page.locator('#confirmPassword, input[placeholder="Confirm Password"]');
    this.addressInput = page
      .locator(
        'div.modal-section textarea[formcontrolname="address"], div.modal-section textarea[placeholder*="Address"], div.modal-section textarea[name="address"]'
      )
      .first();

    // Label assignment controls
    this.labelDropdownButton = page.locator('button:has(i.bi-tags)').first();
    this.manageLabelButton = page.locator('button.btn-label[routerlink="/customer/manage-label"], button.btn-label:has-text("Manage Label")').first();
    this.addLabelButton = page.locator('div.btn-label:has(i.bi-plus-lg), button.btn-label:has(i.bi-plus-lg), div.btn-label:has-text("Label")').first();
    this.labelNameInput = page.locator('input#name[placeholder="Label Name"], input[placeholder="Label Name"]').first();
    this.customColorInput = page.locator('input#customInputColor[type="color"], input[type="color"][title*="color"]').first();
    this.labelSubmitButton = page.locator('button.btn-label[type="submit"]:has-text("Submit"), button:has-text("Submit")').first();
    this.labelSearchInput = page.locator('input[placeholder="Label..."], input[placeholder*="Label"]').first();
    this.labelDropdownMenu = page.locator('div.dropdown-menu:has(input[placeholder*="Label"]), ul.dropdown-menu:has(input[placeholder*="Label"])').first();
    this.allLabelsSection = page.locator('div.all-labels-section');

    // Subscriptions / toast locators
    this.subscriptionsSidebarItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/subscriptions"], div.sidebar-items:has(span.title:has-text("Subscriptions"))'
      )
      .first();
    this.toastContainer = page.locator('#toast-container');
    this.noSubscriptionMessage = page
      .locator('div:has-text("There is no subscription found.")')
      .first();

    // Total records info (e.g. "Showing 1 to 20 of 5515 records")
    this.totalDataInfo = page.locator('div.total-data-info');

    // Search panel locators
    this.searchToggle = page.locator('div.py-3.px-3:has(i.bi-search), div[data-bs-toggle="collapse"]:has(i.bi-search), button[data-bs-toggle="collapse"]:has(i.bi-search), div:has(i.bi-search):has-text("Search"), div:has(i.bi-search)').first();
    this.searchPanel = page.locator('#collapseExample');
    this.searchCompanyInput = page.locator('input#name, input[ng-reflect-name="name"], input[name="name"], input[formcontrolname="name"], input#name[placeholder*="Name" i], input[placeholder*="Name/Company Name" i], input[placeholder*="Company Name" i]').first();
    this.searchEmailInput = page.locator('input#email, input[ng-reflect-name="email"], input[name="email"], input[formcontrolname="email"], input#email[placeholder*="Email" i], input[placeholder="Email"]').first();
    this.searchMobileInput = page.locator('input#mobile, input[ng-reflect-name="mobile"], input[name="mobile"], input[formcontrolname="mobile"], input#mobile[placeholder*="Mobile" i], input[placeholder="Mobile"]').first();
    this.searchLabelSelect = page.locator(
      'mat-form-field:has(mat-label:text("Label Name")) mat-select, mat-form-field:has-text("Label Name") mat-select'
    );
    this.searchStatusSelect = page.locator(
      'mat-form-field:has(mat-label:text("Status")) mat-select, mat-form-field:has-text("Status") mat-select'
    );
    this.searchButton = page.locator('button.btn.search-btn');
    this.resetButton = page.locator('button.btn.reset-btn');

    // Modal action buttons
    this.submitButton = page.locator('button.btn-label:has-text("Submit")');
    this.cancelButton = page.locator('button.cancel-btn:has-text("Cancel")');
    
    // Success message locators
    this.successMessage = page
      .locator(
        'div[class*="success"], div[class*="alert-success"], *:has-text("Customer created successfully"), *:has-text("successfully")'
      )
      .first();
    this.errorMessage = page.locator('div[class*="error"], div[class*="alert-danger"], *[class*="error-message"]').first();

    // Customer table header controls (Select Headers dropdown)
    this.selectHeadersButton = page
      .locator(
        'button.header-btn.btn.dropdown-toggle:has-text("Select Headers"), button.header-btn.dropdown-toggle:has-text("Select Headers")'
      )
      .first();
    this.headersDropdownMenu = page.locator('ul.dropdown-menu.dropdown-header-menu');

    // Pagination locators
    this.itemsPerPageSelect = page.locator(
      'mat-form-field.mat-mdc-paginator-page-size-select mat-select, ' +
      'mat-select[aria-labelledby*="mat-paginator-page-size-label"], ' +
      'div.mat-mdc-paginator-page-size mat-select'
    ).first();
    this.paginatorRangeLabel = page.locator('div.mat-mdc-paginator-range-label');
    this.previousPageButton = page.locator('button.mat-mdc-paginator-navigation-previous[aria-label="Previous page"]');
    this.nextPageButton = page.locator('button.mat-mdc-paginator-navigation-next[aria-label="Next page"]');
    this.customerTableRows = page.locator('tr.mat-mdc-row.mdc-data-table__row.cdk-row');
  }

  /**
   * Navigates to the Customers page from the dashboard.
   * Assumes user is already logged in and on the dashboard.
   */
  async navigateToCustomers() {
    try {
      // Click on the Customer module in sidebar
      await this.customersMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.customersMenuItem.click();

      // Wait for navigation to complete
      await this.page.waitForLoadState('networkidle');
      
    } catch (error) {      
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Clicks the "Add Customer" button to open the modal.
   */
  async clickAddCustomer() {
    await this.addCustomerButton.waitFor({ state: 'visible', timeout: 2000 });
    await this.addCustomerButton.click();
    // Wait for modal to appear
    await this.modalDialog.waitFor({ state: 'visible', timeout: 2000 });
  }

  /**
   * Fills in the customer name field.
   * @param {string} name - The customer name
   */
  async fillCustomerName(name) {
    await this.customerNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.customerNameInput.fill(name);
  }

  /**
   * Fills in the email field.
   * @param {string} email - The email address
   */
  async fillEmail(email) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.emailInput.fill(email);
  }

  /**
   * Fills in the phone field.
   * @param {string} phone - The phone number
   */
  async fillPhone(phone) {
    if (await this.phoneInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.phoneInput.fill(phone);
    }
  }

  /**
   * Fills in the company field.
   * @param {string} company - The company name
   */
  async fillCompany(company) {
    if (await this.companyInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.companyInput.fill(company);
    }
  }

  /**
   * Fills in the password field.
   * @param {string} password - The password
   */
  async fillPassword(password) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.passwordInput.fill(password);
  }

  /**
   * Fills in the confirm password field.
   * @param {string} confirmPassword - The confirm password value
   */
  async fillConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  /**
   * Fills in the address field.
   * @param {string} address - The address
   */
  async fillAddress(address) {
    if (await this.addressInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.addressInput.fill(address);
    }
  }

  
  /**
   * Submits the Add Customer form.
   */
  async submitForm() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.submitButton.click();
    
    // Wait for form submission to complete
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fills the complete customer form and submits.
   * @param {Object} customerData - Object containing customer information
   * @param {string} customerData.name - Customer name (required)
   * @param {string} customerData.email - Email address (required)
   * @param {string} customerData.phone - Phone number (optional)
   * @param {string} customerData.company - Company name (optional)
   * @param {string} customerData.address - Address (optional)
   * @param {Object} customerData.additional - Additional fields (optional)
   */
  async createCustomer(customerData) {
    await this.fillCustomerName(customerData.name);
    await this.fillEmail(customerData.email);
    await this.fillPhone(customerData.phone);
    await this.fillCompany(customerData.company);
    await this.fillPassword(customerData.password || customerData.name);
    await this.fillConfirmPassword(customerData.confirmPassword || customerData.password || customerData.name);
    
    if (customerData.address) {
      await this.fillAddress(customerData.address);
    }

    await this.submitForm();
  }

  /**
   * Checks if the customers page is visible.
   * @returns {Promise<boolean>}
   */
  async isCustomersPageVisible() {
    try {
      await this.customersPageTitle.waitFor({ state: 'visible', timeout: 5000 });
      return await this.customersPageTitle.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the Add Customer modal is visible.
   * @returns {Promise<boolean>}
   */
  async isModalVisible() {
    try {
      return await this.modalDialog.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if a success message is displayed.
   * @returns {Promise<boolean>}
   */
  async isSuccessMessageVisible() {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.successMessage.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the success message text.
   * @returns {Promise<string>}
   */
  async getSuccessMessage() {
    if (await this.isSuccessMessageVisible()) {
      return await this.successMessage.textContent();
    }
    return null;
  }

  /**
   * Closes the modal by clicking cancel or close button.
   */
  async closeModal() {
    if (await this.cancelButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.cancelButton.click();
    }
    // Wait for modal to close
    await this.modalDialog.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  /**
   * Verifies that a customer appears in the customer list.
   * @param {string} customerName - The name of the customer to verify
   * @returns {Promise<boolean>}
   */
  async verifyCustomerInList(customerName) {
    try {
      const customerRow = this.page.locator(`*:has-text("${customerName}")`).first();
      await customerRow.waitFor({ state: 'visible', timeout: 10000 });
      return await customerRow.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Returns the table row for a given customer name.
   * @param {string} customerName
   * @returns {import('@playwright/test').Locator}
   */
  getCustomerRow(customerName) {
    return this.page.locator(`tr:has-text("${customerName}")`).first();
  }

  /**
   * Opens the action dropdown for a given customer.
   * @param {string} customerName
   */
  async openActionDropdown(customerName) {
    const row = this.getCustomerRow(customerName);
    await row.waitFor({ state: 'visible', timeout: 10000 });
    const actionButton = row.locator('button.action-btn');
    await actionButton.waitFor({ state: 'visible', timeout: 5000 });
    await actionButton.click();
  }

  /**
   * Opens the Edit Account modal from the action dropdown for a given customer.
   * @param {string} customerName
   */
  async openEditCustomerModal(customerName) {
    await this.openActionDropdown(customerName);

    // Hover on Manage option to reveal submenu
    const manageItem = this.page.locator('li:has-text("Manage")').first();
    await manageItem.waitFor({ state: 'visible', timeout: 5000 });
    await manageItem.hover();

    // Click Edit Account in the submenu
    const editAccountItem = this.page
      .locator('ul.dropdown-menu.dropdown-submenu li:has-text("Edit Account")')
      .first();
    await editAccountItem.waitFor({ state: 'visible', timeout: 5000 });
    await editAccountItem.click();

    // Wait for Update Customer modal to appear
    await this.modalDialog.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Edits an existing customer details using the Update Customer modal.
   * @param {string} originalName - Existing customer name in the list
   * @param {Object} updatedData - Updated customer details
   */
  async editCustomer(originalName, updatedData) {
    await this.openEditCustomerModal(originalName);

    if (updatedData.name) {
      await this.fillCustomerName(updatedData.name);
    }
    if (updatedData.email) {
      await this.fillEmail(updatedData.email);
    }
    if (updatedData.phone) {
      await this.fillPhone(updatedData.phone);
    }
    if (updatedData.company) {
      await this.fillCompany(updatedData.company);
    }

    await this.submitForm();
  }

  /**
   * Returns the checkbox element for a given customer row (for '#' column).
   * @param {string} customerName
   * @returns {import('@playwright/test').Locator}
   */
  getCustomerCheckbox(customerName) {
    const row = this.getCustomerRow(customerName);
    return row.locator('input[type="checkbox"]');
  }

  /**
   * Selects the customer in the "#" column by checking its checkbox.
   * @param {string} customerName
   */
  async selectCustomerCheckbox(customerName) {
    const checkbox = this.getCustomerCheckbox(customerName);
    await checkbox.waitFor({ state: 'visible', timeout: 5000 });
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (!isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Opens the label dropdown (global label button above table).
   */
  async openLabelDropdown() {
    await this.labelDropdownButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.labelDropdownButton.click();
    // Wait for dropdown menu to appear
    await this.labelDropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }

  /**
   * Selects a label from the label dropdown by its visible text.
   * @param {string} labelName
   */
  async selectLabelFromDropdown(labelName) {
    const labelOption = this.page
      .locator('div.dropdown-menu .all-labels-section div.label:has-text("' + labelName + '")')
      .first();
    await labelOption.waitFor({ state: 'visible', timeout: 5000 });
    await labelOption.click();
  }

  /**
   * Verifies that a particular label is shown in the Label column for a customer.
   * @param {string} customerName
   * @param {string} labelName
   * @returns {Promise<boolean>}
   */
  async verifyLabelAssigned(customerName, labelName) {
    try {
      const row = this.getCustomerRow(customerName);
      const labelCell = row.locator('td.cdk-column-Label div.label:has-text("' + labelName + '")');
      await labelCell.waitFor({ state: 'visible', timeout: 10000 });
      return await labelCell.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Full flow: select customer via '#', open label dropdown, pick label.
   * @param {string} customerName
   * @param {string} labelName
   */
  async assignLabelToCustomer(customerName, labelName) {
    await this.selectCustomerCheckbox(customerName);
    await this.openLabelDropdown();
    await this.selectLabelFromDropdown(labelName);
  }

  /**
   * Removes a label from a customer using the Action dropdown.
   * @param {string} customerName
   * @param {string} labelName
   */
  async removeLabelFromCustomer(customerName, labelName) {
    await this.openActionDropdown(customerName);
    const removeLabelOption = this.page
      .locator('li:has-text("Remove Label"), button:has-text("Remove Label")')
      .first();
    await removeLabelOption.waitFor({ state: 'visible', timeout: 5000 });
    await removeLabelOption.click();
    // Optionally wait for label to disappear
    await this.verifyLabelRemoved(customerName, labelName);
  }

  /**
   * Verifies that a label is no longer shown for the customer.
   * @param {string} customerName
   * @param {string} labelName
   * @returns {Promise<boolean>}
   */
  async verifyLabelRemoved(customerName, labelName) {
    const row = this.getCustomerRow(customerName);
    const labelCell = row.locator('td.cdk-column-Label div.label:has-text("' + labelName + '")');
    try {
      await labelCell.waitFor({ state: 'hidden', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Returns the Status cell element for a given customer row.
   * @param {string} customerName
   * @returns {import('@playwright/test').Locator}
   */
  getStatusCell(customerName) {
    const row = this.getCustomerRow(customerName);
    return row.locator('td.cdk-column-Status span');
  }

  /**
   * Suspends a customer via Action -> Manage -> Suspend.
   * @param {string} customerName
   */
  async suspendCustomer(customerName) {
    await this.openActionDropdown(customerName);

    // Hover on Manage to open submenu
    const manageItem = this.page.locator('li:has-text("Manage")').first();
    await manageItem.waitFor({ state: 'visible', timeout: 5000 });
    await manageItem.hover();

    // Click Suspend from submenu
    const suspendItem = this.page
      .locator('ul.dropdown-menu.dropdown-submenu li:has-text("Suspend")')
      .first();
    await suspendItem.waitFor({ state: 'visible', timeout: 5000 });
    await suspendItem.click();
  }

  /**
   * Checks if "customer suspended successfully" toast/message is visible.
   * @returns {Promise<boolean>}
   */
  async isSuspendToastVisible() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      const toastMessage = this.page
        .locator('#toast-container *:has-text("suspended successfully")')
        .first();
      await toastMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await toastMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifies that a customer's status is Inactive in the Status column.
   * @param {string} customerName
   * @returns {Promise<boolean>}
   */
  async isCustomerInactive(customerName) {
    try {
      const statusCell = this.getStatusCell(customerName);
      await statusCell.waitFor({ state: 'visible', timeout: 10000 });
      const text = (await statusCell.textContent()) || '';
      return text.toLowerCase().includes('inactive');
    } catch {
      return false;
    }
  }

  /**
   * Activates a suspended customer via Action -> Manage -> Activate.
   * @param {string} customerName
   */
  async activateCustomer(customerName) {
    await this.openActionDropdown(customerName);

    // Hover on Manage to open submenu
    const manageItem = this.page.locator('li:has-text("Manage")').first();
    await manageItem.waitFor({ state: 'visible', timeout: 5000 });
    await manageItem.hover();

    // Click Activate from submenu
    const activateItem = this.page
      .locator('ul.dropdown-menu.dropdown-submenu li:has-text("Activate")')
      .first();
    await activateItem.waitFor({ state: 'visible', timeout: 5000 });
    await activateItem.click();
  }

  /**
   * Verifies that a customer's status is Active in the Status column.
   * @param {string} customerName
   * @returns {Promise<boolean>}
   */
  async isCustomerActive(customerName) {
    try {
      const statusCell = this.getStatusCell(customerName);
      await statusCell.waitFor({ state: 'visible', timeout: 10000 });
      const text = (await statusCell.textContent()) || '';
      return text.toLowerCase().includes('active');
    } catch {
      return false;
    }
  }

  /**
   * Parses the total records count from the footer text.
   * Example text: "Showing 1 to 20 of 5515 records"
   * @returns {Promise<number|null>}
   */
  async getTotalRecordsCount() {
    try {
      await this.totalDataInfo.waitFor({ state: 'visible', timeout: 10000 });
      const text = (await this.totalDataInfo.textContent()) || '';
      const match = text.match(/of\s+(\d+)\s+records/i);
      if (match) {
        return parseInt(match[1], 10);
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Opens the Delete Account modal for the given customer.
   * @param {string} customerName
   */
  async openDeleteCustomerModal(customerName) {
    await this.openActionDropdown(customerName);

    // Hover on Manage to open submenu
    const manageItem = this.page.locator('li:has-text("Manage")').first();
    await manageItem.waitFor({ state: 'visible', timeout: 5000 });
    await manageItem.hover();

    // Click Delete Account from submenu
    const deleteItem = this.page
      .locator('ul.dropdown-menu.dropdown-submenu li:has-text("Delete Account")')
      .first();
    await deleteItem.waitFor({ state: 'visible', timeout: 5000 });
    await deleteItem.click();

    // Wait for Delete modal
    const deleteHeading = this.page
      .locator('div.modal-section .modal-heading:has-text("Delete")')
      .first();
    await deleteHeading.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Confirms deletion in the delete modal by clicking Yes.
   */
  async confirmDeleteCustomer() {
    const yesButton = this.page
      .locator('div.modal-section button.btn-label:has-text("Yes")')
      .first();
    await yesButton.waitFor({ state: 'visible', timeout: 5000 });
    await yesButton.click();
  }

  /**
   * Checks if delete toast is visible.
   * @returns {Promise<boolean>}
   */
  async isDeleteToastVisible() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      const toastMessage = this.page
        .locator('#toast-container *:has-text("deleted successfully")')
        .first();
      await toastMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await toastMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifies that a customer no longer appears in the list.
   * @param {string} customerName
   * @returns {Promise<boolean>}
   */
  async isCustomerDeleted(customerName) {
    const row = this.getCustomerRow(customerName);
    try {
      // Wait for the row to disappear or become non-visible
      await this.page.waitForTimeout(2000);
      const count = await row.count();
      if (count === 0) return true;
      return !(await row.isVisible().catch(() => false));
    } catch {
      return false;
    }
  }

  /**
   * Opens the Subscriptions page for a given customer via the Action dropdown.
   * @param {string} customerName
   */
  async openSubscriptionsForCustomer(customerName) {
    await this.openActionDropdown(customerName);
    const subscriptionsOption = this.page
      .locator('li:has-text("Subscriptions"), button:has-text("Subscriptions")')
      .first();
    await subscriptionsOption.waitFor({ state: 'visible', timeout: 5000 });
    await subscriptionsOption.click();

    // Wait for navigation to subscriptions page
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verifies that the user is on the subscriptions page.
   * @returns {Promise<boolean>}
   */
  async isOnSubscriptionsPage() {
    try {
      // Sidebar item active or URL contains /subscriptions
      const url = await this.getCurrentUrl();
      if (url.includes('/subscriptions')) return true;
      await this.subscriptionsSidebarItem.waitFor({ state: 'visible', timeout: 5000 });
      return await this.subscriptionsSidebarItem.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifies that "no subscription found" toast/message is shown.
   * @returns {Promise<boolean>}
   */
  async isNoSubscriptionToastVisible() {
    try {
      // Wait a bit for toast to appear
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.noSubscriptionMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.noSubscriptionMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Ensures the search panel is expanded/visible.
   */
  async openSearchPanel() {
    // Check if panel is visible and has 'show' class (fully expanded)
    const visible = await this.searchPanel.isVisible().catch(() => false);
    const hasShowClass = await this.searchPanel.evaluate(el => el.classList.contains('show')).catch(() => false);
    
    if (!visible || !hasShowClass) {
      // Try multiple locator strategies for search toggle
      const toggleLocators = [
        'div.py-3.px-3:has(i.bi-search)',
        'div[data-bs-toggle="collapse"]:has(i.bi-search)',
        'button[data-bs-toggle="collapse"]:has(i.bi-search)',
        'div:has(i.bi-search):has-text("Search")',
        'div:has(i.bi-search)',
        'i.bi-search',
        '[data-bs-target="#collapseExample"]',
        'button:has(i.bi-search)'
      ];
      
      let toggleFound = false;
      let toggleElement = null;
      
      for (const locatorStr of toggleLocators) {
        try {
          const toggle = this.page.locator(locatorStr).first();
          const isVisible = await toggle.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            toggleElement = toggle;
            toggleFound = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!toggleFound) {
        // Fallback: try the original locator with longer timeout
        await this.searchToggle.waitFor({ state: 'visible', timeout: 10000 });
        toggleElement = this.searchToggle;
      }
      
      // Scroll into view and wait
      await toggleElement.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Try multiple click strategies
      let clicked = false;
      try {
        await toggleElement.click({ timeout: 5000 });
        clicked = true;
      } catch {
        // Try JavaScript click
        try {
          await toggleElement.evaluate(el => el.click());
          clicked = true;
        } catch {
          // Try clicking the icon directly if it's a parent element
          try {
            const icon = toggleElement.locator('i.bi-search').first();
            const iconVisible = await icon.isVisible({ timeout: 2000 }).catch(() => false);
            if (iconVisible) {
              await icon.click({ timeout: 5000 });
              clicked = true;
            } else {
              // Last resort: force click
              await toggleElement.click({ force: true, timeout: 5000 });
              clicked = true;
            }
          } catch {
            // Final fallback: force click on toggle
            await toggleElement.click({ force: true, timeout: 5000 });
            clicked = true;
          }
        }
      }
      
      if (!clicked) {
        throw new Error('Failed to click search toggle after multiple attempts');
      }
      
      // Wait for panel to be visible
      await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
      
      // Wait for 'show' class to be added (panel fully expanded)
      let showClassAdded = false;
      for (let i = 0; i < 20; i++) {
        await this.page.waitForTimeout(200);
        const hasShow = await this.searchPanel.evaluate(el => el.classList.contains('show')).catch(() => false);
        if (hasShow) {
          showClassAdded = true;
          break;
        }
      }
      
      // Wait a bit more for form fields to be ready and rendered
      await this.page.waitForTimeout(500);
    } else {
      // Even if visible, wait a bit for fields to be ready
      await this.page.waitForTimeout(300);
    }
  }

  async setSearchCompany(companyName) {
    await this.openSearchPanel();
    
    // Ensure search panel is visible and expanded
    await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    // Try multiple locator strategies, scoped to search panel
    let inputFound = false;
    const locators = [
      '#collapseExample input#name',
      '#collapseExample input[ng-reflect-name="name"]',
      '#collapseExample input[name="name"]',
      '#collapseExample input[formcontrolname="name"]',
      '#collapseExample input[placeholder*="Name" i]',
      '#collapseExample input[type="text"]:first-of-type',
      'input#name',
      'input[ng-reflect-name="name"]',
      'input[name="name"]',
      'input[formcontrolname="name"]',
      'input#name[placeholder*="Name" i]'
    ];
    
    for (const locatorStr of locators) {
      try {
        const input = this.page.locator(locatorStr).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await input.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(200);
          await input.fill(companyName);
          inputFound = true;
          break;
        }
      } catch {
        continue;
      }
    }
    
    if (!inputFound) {
      // Fallback: try the original locator with longer timeout, scoped to search panel
      const fallbackInput = this.searchPanel.locator('input#name, input[ng-reflect-name="name"], input[name="name"]').first();
      await fallbackInput.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await fallbackInput.fill(companyName);
    }
  }

  async setSearchEmail(email) {
    await this.openSearchPanel();
    
    // Ensure search panel is visible and expanded
    await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    // Try multiple locator strategies, scoped to search panel
    let inputFound = false;
    const locators = [
      '#collapseExample input#email',
      '#collapseExample input[ng-reflect-name="email"]',
      '#collapseExample input[name="email"]',
      '#collapseExample input[formcontrolname="email"]',
      '#collapseExample input[type="email"]',
      '#collapseExample input[placeholder*="Email" i]',
      'input#email',
      'input[ng-reflect-name="email"]',
      'input[name="email"]',
      'input[formcontrolname="email"]'
    ];
    
    for (const locatorStr of locators) {
      try {
        const input = this.page.locator(locatorStr).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await input.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(200);
          await input.fill(email);
          inputFound = true;
          break;
        }
      } catch {
        continue;
      }
    }
    
    if (!inputFound) {
      // Fallback: try the original locator with longer timeout, scoped to search panel
      const fallbackInput = this.searchPanel.locator('input#email, input[ng-reflect-name="email"], input[name="email"]').first();
      await fallbackInput.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await fallbackInput.fill(email);
    }
  }

  async setSearchMobile(mobile) {
    await this.openSearchPanel();
    
    // Ensure search panel is visible and expanded
    await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    // Try multiple locator strategies, scoped to search panel
    let inputFound = false;
    const locators = [
      '#collapseExample input#mobile',
      '#collapseExample input[ng-reflect-name="mobile"]',
      '#collapseExample input[name="mobile"]',
      '#collapseExample input[formcontrolname="mobile"]',
      '#collapseExample input[placeholder*="Mobile" i]',
      '#collapseExample input[type="text"]:last-of-type',
      'input#mobile',
      'input[ng-reflect-name="mobile"]',
      'input[name="mobile"]',
      'input[formcontrolname="mobile"]'
    ];
    
    for (const locatorStr of locators) {
      try {
        const input = this.page.locator(locatorStr).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await input.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(200);
          await input.fill(mobile);
          inputFound = true;
          break;
        }
      } catch {
        continue;
      }
    }
    
    if (!inputFound) {
      // Fallback: try the original locator with longer timeout, scoped to search panel
      const fallbackInput = this.searchPanel.locator('input#mobile, input[ng-reflect-name="mobile"], input[name="mobile"]').first();
      await fallbackInput.waitFor({ state: 'visible', timeout: 10000 });
      await fallbackInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await fallbackInput.fill(mobile);
    }
  }

  async setSearchLabel(labelName) {
    await this.openSearchPanel();
    await this.searchLabelSelect.click();
    const option = this.page
      .locator('mat-option, span.mat-option-text')
      .filter({ hasText: labelName })
      .first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async setSearchStatus(statusText) {
    await this.openSearchPanel();
    await this.searchStatusSelect.click();
    const option = this.page
      .locator('mat-option, span.mat-option-text')
      .filter({ hasText: statusText })
      .first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async clickSearch() {
    await this.openSearchPanel();
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async clickReset() {
    await this.openSearchPanel();
    await this.resetButton.click();
  }

  /**
   * Checks whether all search fields are reset/empty.
   * @returns {Promise<boolean>}
   */
  async areSearchFieldsEmpty() {
    await this.openSearchPanel();
    const company = await this.searchCompanyInput.inputValue().catch(() => '');
    const email = await this.searchEmailInput.inputValue().catch(() => '');
    const mobile = await this.searchMobileInput.inputValue().catch(() => '');

    const labelText = await this.searchLabelSelect.textContent().catch(() => '');
    const statusText = await this.searchStatusSelect.textContent().catch(() => '');

    const labelIsDefault = labelText.toLowerCase().includes('all labels') || labelText.trim() === '';
    const statusIsDefault = statusText.toLowerCase().includes('all') || statusText.trim() === '';

    return (
      company.trim() === '' &&
      email.trim() === '' &&
      mobile.trim() === '' &&
      labelIsDefault &&
      statusIsDefault
    );
  }

  /**
   * Gets the current page URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Opens the "Select Headers" dropdown above the customer table.
   */
  async openSelectHeadersDropdown() {
    await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.selectHeadersButton.click();
    await this.headersDropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Returns a locator for a header checkbox inside the Select Headers dropdown.
   * @param {string} headerLabel - The visible label text of the header (e.g. "Name")
   * @returns {import('@playwright/test').Locator}
   */
  getHeaderCheckbox(headerLabel) {
    return this.headersDropdownMenu
      .locator('li label')
      .filter({ has: this.page.locator('span.ms-2', { hasText: headerLabel }) })
      .locator('input[type="checkbox"]');
  }

  /**
   * Sets a given header checkbox to checked/unchecked state.
   * @param {string} headerLabel
   * @param {boolean} shouldBeChecked
   */
  async setHeaderCheckboxState(headerLabel, shouldBeChecked) {
    const checkbox = this.getHeaderCheckbox(headerLabel);
    await checkbox.waitFor({ state: 'visible', timeout: 5000 });
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (shouldBeChecked !== isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Unselects all optional headers in the Select Headers dropdown.
   * This hides all optional columns, leaving only mandatory ones like #, Company, Email, Action.
   */
  async unselectAllOptionalHeaders() {
    const optionalHeaders = [
      'Name',
      'Mobile',
      'Label',
      'Last Login',
      'Status',
      'Customer Type',
      'Created At',
      'Country',
    ];
    await this.openSelectHeadersDropdown();
    for (const label of optionalHeaders) {
      await this.setHeaderCheckboxState(label, false);
    }
    // Click outside to close dropdown
    await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
  }

  /**
   * Selects all optional headers in the Select Headers dropdown.
   * This shows all optional columns in the customer table.
   */
  async selectAllOptionalHeaders() {
    const optionalHeaders = [
      'Name',
      'Mobile',
      'Label',
      'Last Login',
      'Status',
      'Customer Type',
      'Created At',
      'Country',
    ];
    await this.openSelectHeadersDropdown();
    for (const label of optionalHeaders) {
      await this.setHeaderCheckboxState(label, true);
    }
    // Click outside to close dropdown
    await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
  }

  /**
   * Returns the visible column header texts from the customer table.
   * @returns {Promise<string[]>}
   */
  async getVisibleHeaderTexts() {
    const headers = await this.page
      .locator('thead tr[role="row"] th[role="columnheader"]')
      .allTextContents();
    return headers.map((h) => h.trim()).filter((h) => h !== '');
  }

  /**
   * Checks whether a specific column header is visible in the customer table.
   * @param {string} headerText
   * @returns {Promise<boolean>}
   */
  async isHeaderVisible(headerText) {
    const headers = await this.getVisibleHeaderTexts();
    return headers.some((h) => h.toLowerCase().includes(headerText.toLowerCase()));
  }

  /**
   * Gets the current items per page value from the paginator.
   * @returns {Promise<number>}
   */
  async getItemsPerPage() {
    // First wait for paginator container to be visible
    const paginatorContainer = this.page.locator('div.mat-mdc-paginator-container');
    await paginatorContainer.waitFor({ state: 'visible', timeout: 10000 });
    
    // Try multiple locator strategies
    let selectElement = null;
    
    // Strategy 1: Try finding by paginator container (most reliable)
    try {
      selectElement = paginatorContainer.locator('mat-select').first();
      await selectElement.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Strategy 2: Try the main locator
      try {
        await this.itemsPerPageSelect.waitFor({ state: 'visible', timeout: 5000 });
        selectElement = this.itemsPerPageSelect;
      } catch {
        // Strategy 3: Try finding by form field and then select
        const formField = this.page.locator('mat-form-field.mat-mdc-paginator-page-size-select');
        await formField.waitFor({ state: 'visible', timeout: 5000 });
        selectElement = formField.locator('mat-select');
        await selectElement.waitFor({ state: 'visible', timeout: 5000 });
      }
    }
    
    if (!selectElement) {
      throw new Error('Could not find items per page select element');
    }
    
    const text = await selectElement.textContent();
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  /**
   * Sets the items per page by selecting a value from the dropdown.
   * @param {number} itemsPerPage - The number of items per page (e.g., 10, 20, 50, 100)
   */
  async setItemsPerPage(itemsPerPage) {
    // First wait for paginator container to be visible
    const paginatorContainer = this.page.locator('div.mat-mdc-paginator-container');
    await paginatorContainer.waitFor({ state: 'visible', timeout: 10000 });
    
    // Try multiple locator strategies to find the select element
    let selectElement = null;
    
    // Strategy 1: Try finding by paginator container (most reliable)
    try {
      selectElement = paginatorContainer.locator('mat-select').first();
      await selectElement.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Strategy 2: Try the main locator
      try {
        await this.itemsPerPageSelect.waitFor({ state: 'visible', timeout: 5000 });
        selectElement = this.itemsPerPageSelect;
      } catch {
        // Strategy 3: Try finding by form field and then select
        const formField = this.page.locator('mat-form-field.mat-mdc-paginator-page-size-select');
        await formField.waitFor({ state: 'visible', timeout: 5000 });
        selectElement = formField.locator('mat-select');
        await selectElement.waitFor({ state: 'visible', timeout: 5000 });
      }
    }
    
    if (!selectElement) {
      throw new Error('Could not find items per page select element');
    }
    
    // Try multiple approaches to click the select dropdown
    // Approach 1: Click on the select value text area (avoids touch target)
    const selectValue = selectElement.locator('div.mat-mdc-select-value');
    let clicked = false;
    
    try {
      await selectValue.click({ timeout: 3000 });
      clicked = true;
    } catch {
      // Approach 2: Click on the arrow icon wrapper
      try {
        const arrowWrapper = selectElement.locator('div.mat-mdc-select-arrow-wrapper');
        await arrowWrapper.click({ timeout: 3000 });
        clicked = true;
      } catch {
        // Approach 3: Click on the select trigger
        try {
          const selectTrigger = selectElement.locator('div.mat-mdc-select-trigger');
          await selectTrigger.click({ timeout: 3000 });
          clicked = true;
        } catch {
          // Approach 4: Use JavaScript click to bypass touch target interception
          try {
            await selectElement.evaluate((el) => el.click());
            clicked = true;
          } catch {
            // Approach 5: Use force click on the select
            try {
              await selectElement.click({ force: true, timeout: 3000 });
              clicked = true;
            } catch {
              // Approach 6: Click on the form field wrapper
              const formField = this.page.locator('mat-form-field.mat-mdc-paginator-page-size-select');
              await formField.click({ timeout: 3000 });
              clicked = true;
            }
          }
        }
      }
    }
    
    if (!clicked) {
      throw new Error('Failed to open items per page dropdown');
    }
    
    // Wait for the options panel to appear
    const selectPanel = this.page.locator('div.mat-mdc-select-panel.mdc-menu-surface--open, div[id*="mat-select"][id*="-panel"]');
    await selectPanel.waitFor({ state: 'visible', timeout: 10000 });
    
    // Select the option with the specified value
    // Options have text in span.mdc-list-item__primary-text
    // Try multiple locator strategies
    let optionClicked = false;
    
    // Strategy 1: Click directly on the span (most reliable)
    try {
      const spanOption = this.page
        .locator(`span.mdc-list-item__primary-text:has-text("${itemsPerPage}")`)
        .first();
      await spanOption.waitFor({ state: 'visible', timeout: 5000 });
      await spanOption.click();
      optionClicked = true;
    } catch {
      // Strategy 2: Find mat-option that contains span with the text
      try {
        const spanLocator = this.page.locator(`span.mdc-list-item__primary-text:has-text("${itemsPerPage}")`);
        const option = this.page
          .locator('mat-option')
          .filter({ has: spanLocator })
          .first();
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
        optionClicked = true;
      } catch {
        // Strategy 3: Find by mat-option with text content
        const option = this.page
          .locator('mat-option')
          .filter({ hasText: itemsPerPage.toString() })
          .first();
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
        optionClicked = true;
      }
    }
    
    if (!optionClicked) {
      throw new Error(`Could not find or click option for items per page: ${itemsPerPage}`);
    }
    
    // Wait for the panel to close
    await selectPanel.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    
    // Wait for the table to update
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(1000);
  }

  /**
   * Gets the current page range from the paginator range label.
   * Example: "1 – 20 of 5519" returns { start: 1, end: 20, total: 5519 }
   * @returns {Promise<{start: number, end: number, total: number}|null>}
   */
  async getPageRange() {
    try {
      await this.paginatorRangeLabel.waitFor({ state: 'visible', timeout: 10000 });
      const text = (await this.paginatorRangeLabel.textContent()) || '';
      // Match format like "1 – 20 of 5519" or "21 – 40 of 5519"
      const match = text.match(/(\d+)\s*[–-]\s*(\d+)\s+of\s+(\d+)/i);
      if (match) {
        return {
          start: parseInt(match[1], 10),
          end: parseInt(match[2], 10),
          total: parseInt(match[3], 10),
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Gets the total records count from the total-data-info div.
   * Example: "Showing 1 to 20 of 5519 records" returns 5519
   * @returns {Promise<number|null>}
   */
  async getTotalRecordsFromInfo() {
    try {
      await this.totalDataInfo.waitFor({ state: 'visible', timeout: 10000 });
      const text = (await this.totalDataInfo.textContent()) || '';
      const match = text.match(/of\s+(\d+)\s+records/i);
      if (match) {
        return parseInt(match[1], 10);
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Gets the current page range from the total-data-info div.
   * Example: "Showing 1 to 20 of 5519 records" returns { start: 1, end: 20, total: 5519 }
   * @returns {Promise<{start: number, end: number, total: number}|null>}
   */
  async getPageRangeFromInfo() {
    try {
      await this.totalDataInfo.waitFor({ state: 'visible', timeout: 10000 });
      const text = (await this.totalDataInfo.textContent()) || '';
      // Match format like "Showing 1 to 20 of 5519 records"
      const match = text.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)\s+records/i);
      if (match) {
        return {
          start: parseInt(match[1], 10),
          end: parseInt(match[2], 10),
          total: parseInt(match[3], 10),
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Clicks the next page button.
   */
  async clickNextPage() {
    await this.nextPageButton.waitFor({ state: 'visible', timeout: 10000 });
    const isDisabled = await this.nextPageButton.isDisabled().catch(() => false);
    if (!isDisabled) {
      await this.nextPageButton.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Clicks the previous page button.
   */
  async clickPreviousPage() {
    await this.previousPageButton.waitFor({ state: 'visible', timeout: 10000 });
    const isDisabled = await this.previousPageButton.isDisabled().catch(() => false);
    if (!isDisabled) {
      await this.previousPageButton.click();
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Checks if the next page button is enabled.
   * @returns {Promise<boolean>}
   */
  async isNextPageEnabled() {
    try {
      await this.nextPageButton.waitFor({ state: 'visible', timeout: 10000 });
      return !(await this.nextPageButton.isDisabled());
    } catch {
      return false;
    }
  }

  /**
   * Checks if the previous page button is enabled.
   * @returns {Promise<boolean>}
   */
  async isPreviousPageEnabled() {
    try {
      await this.previousPageButton.waitFor({ state: 'visible', timeout: 10000 });
      return !(await this.previousPageButton.isDisabled());
    } catch {
      return false;
    }
  }

  /**
   * Gets the count of visible customer rows in the table.
   * @returns {Promise<number>}
   */
  async getVisibleRowCount() {
    await this.customerTableRows.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    return await this.customerTableRows.count();
  }

  /**
   * Clicks the "Manage Label" button from the label dropdown.
   */
  async clickManageLabel() {
    await this.manageLabelButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.manageLabelButton.click();
    // Wait for navigation to manage label page
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /**
   * Clicks the "+ Label" button to open the add label modal.
   */
  async clickAddLabel() {
    await this.addLabelButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addLabelButton.click();
    // Wait for modal to appear
    await this.labelNameInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  }

  /**
   * Fills in the label name field.
   * @param {string} labelName - The label name
   */
  async fillLabelName(labelName) {
    await this.labelNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.labelNameInput.fill(labelName);
  }

  /**
   * Selects a custom color using the color picker.
   * @param {string} colorHex - The color in hex format (e.g., "#FF5733")
   */
  async selectCustomColor(colorHex) {
    await this.customColorInput.waitFor({ state: 'visible', timeout: 5000 });
    // Color inputs require setting the value property directly via JavaScript
    await this.customColorInput.evaluate((input, color) => {
      input.value = color;
      // Trigger input and change events to ensure the form recognizes the change
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, colorHex);
  }

  /**
   * Submits the label form.
   */
  async submitLabelForm() {
    await this.labelSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.labelSubmitButton.click();
    // Wait for form submission to complete
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /**
   * Verifies that a label appears in the manage label table with the correct name and color.
   * @param {string} labelName - The label name to verify
   * @param {string} colorHex - The expected color in hex format
   * @returns {Promise<boolean>}
   */
  async verifyLabelInManageLabelTable(labelName, colorHex) {
    try {
      console.log(`\n[VERIFY LABEL] Searching for label: "${labelName}"${colorHex ? ` with color: "${colorHex}"` : ''}`);
      
      // Wait for table to be visible and updated (reduced wait time)
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(500); // Reduced from 2000 to 500ms
      
      // Use a single evaluate call to get all label names and colors at once (avoids page closure issues)
      const labelData = await this.page.evaluate((searchColorHex) => {
        const labels = [];
        // Get all table rows (excluding header rows)
        const rows = document.querySelectorAll('tbody tr, tr');
        
        for (const row of rows) {
          // Skip header rows
          if (row.querySelector('th')) {
            continue;
          }
          
          // Get first cell (label name column)
          const firstCell = row.querySelector('td');
          if (!firstCell) {
            continue;
          }
          
          // Try to get text from span first, then from cell
          const span = firstCell.querySelector('span');
          let nameText = '';
          
          if (span && span.textContent) {
            nameText = span.textContent.trim();
          } else if (firstCell.textContent) {
            nameText = firstCell.textContent.trim();
          }
          
          if (!nameText) {
            continue;
          }
          
          // Get color from third column if color verification is needed
          let colorInfo = null;
          if (searchColorHex) {
            const colorCell = row.querySelectorAll('td')[2]; // Third column (0-indexed)
            if (colorCell) {
              const colorSpan = colorCell.querySelector('span.label');
              if (colorSpan) {
                // Get color from style attribute
                const styleAttr = colorSpan.getAttribute('style') || '';
                const bgColorMatch = styleAttr.match(/background-color:\s*([^;]+)/i);
                if (bgColorMatch) {
                  colorInfo = bgColorMatch[1].trim();
                } else {
                  // Fallback to computed style
                  const computedColor = window.getComputedStyle(colorSpan).backgroundColor;
                  colorInfo = computedColor;
                }
              }
            }
          }
          
          labels.push({ name: nameText, color: colorInfo });
        }
        
        return labels;
      }, colorHex).catch((error) => {
        console.error('Error extracting label data:', error.message);
        return [];
      });
      
      console.log(`Found ${labelData.length} labels in table`);
      console.log(`Sample label names (first 10):`, labelData.slice(0, 10).map(l => l.name));
      
      // Helper function to convert rgb/rgba to hex
      const rgbToHex = (colorStr) => {
        if (!colorStr) return '';
        // If already hex, return it
        if (colorStr.startsWith('#')) {
          return colorStr.toUpperCase();
        }
        // Handle rgb() and rgba() formats
        const rgbMatch = colorStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        const rgbaMatch = colorStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        const match = rgbMatch || rgbaMatch;
        if (!match) return '';
        const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
        const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
        const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`.toUpperCase();
      };
      
      // Helper function to convert hex to RGB object
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };
      
      // Check if the label exists (with optional color verification)
      const labelNameLower = labelName.toLowerCase();
      const found = labelData.some((label) => {
        const nameLower = label.name.toLowerCase();
        const nameMatches = (
          nameLower === labelNameLower ||
          nameLower.includes(labelNameLower) ||
          labelNameLower.includes(nameLower)
        );
        
        if (!nameMatches) {
          return false;
        }
        
        // If color is provided, verify it matches
        if (colorHex) {
          if (!label.color) {
            return false; // Color not found in table
          }
          
          const actualColorHex = rgbToHex(label.color);
          const expectedColorHex = colorHex.toUpperCase();
          
          // First try exact match
          if (actualColorHex === expectedColorHex) {
            return true;
          }
          
          // If exact match fails, check if colors are very close (within tolerance)
          const actualRgb = hexToRgb(actualColorHex);
          const expectedRgb = hexToRgb(expectedColorHex);
          
          if (actualRgb && expectedRgb) {
            const tolerance = 3; // Allow 3 RGB units difference for slight variations
            const rDiff = Math.abs(actualRgb.r - expectedRgb.r);
            const gDiff = Math.abs(actualRgb.g - expectedRgb.g);
            const bDiff = Math.abs(actualRgb.b - expectedRgb.b);
            
            return rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance;
          }
          
          return false; // Color doesn't match
        }
        
        // If no color provided, just check name
        return true;
      });
      
      if (found) {
        console.log(`✓ Label "${labelName}"${colorHex ? ` with color "${colorHex}"` : ''} found in table`);
        return true;
      } else {
        console.log(`✗ Label "${labelName}"${colorHex ? ` with color "${colorHex}"` : ''} not found in table`);
        if (!colorHex) {
          console.log(`All label names:`, labelData.map(l => l.name));
        }
        return false;
      }
    } catch (error) {
      console.error('Error verifying label in table:', error);
      return false;
    }
  }

  /**
   * Navigates back to the customers page from manage label page.
   */
  async navigateBackToCustomers() {
    // Click on the Customer module in sidebar
    await this.customersMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.customersMenuItem.click();
    // Wait for navigation to complete
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /**
   * Fills in the label search input in the label dropdown.
   * @param {string} labelName - The label name to search for
   */
  async fillLabelSearchInput(labelName) {
    await this.labelSearchInput.waitFor({ state: 'visible', timeout: 5000 });
    // Convert to lowercase since search is case-sensitive
    const searchText = labelName.toLowerCase();
    console.log(`Filling search input with lowercase: "${searchText}"`);
    await this.labelSearchInput.fill(searchText);
    // Wait a bit for search results to filter
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verifies that a label appears in the label dropdown search results.
   * @param {string} labelName - The label name to verify
   * @returns {Promise<boolean>}
   */
  async verifyLabelInDropdown(labelName) {
    try {
      console.log(`\n[VERIFY DROPDOWN] Searching for label "${labelName}" in dropdown...`);
      
      // Convert to lowercase for case-sensitive search
      const searchNameLower = labelName.toLowerCase();
      console.log(`Searching with lowercase: "${searchNameLower}"`);
      
      // Wait a bit for search results to filter
      await this.page.waitForTimeout(1500);
      
      // Verify dropdown is open
      const dropdownOpen = await this.page.evaluate(() => {
        const dropdown = document.querySelector('div.dropdown-menu.show, ul.dropdown-menu.show, [class*="dropdown"].show');
        return dropdown !== null;
      }).catch(() => false);
      
      if (!dropdownOpen) {
        console.log('⚠ Dropdown might not be open, checking for any visible dropdown...');
      }
      
      // Try multiple strategies to find the label
      let labelElement = null;
      let found = false;
      
      // Strategy 1: Check in allLabelsSection
      try {
        const allLabelsExists = await this.allLabelsSection.count() > 0;
        if (allLabelsExists) {
          console.log('Checking in allLabelsSection...');
          labelElement = this.allLabelsSection.locator(`div.label:has-text("${labelName}")`).first();
          const count = await labelElement.count();
          if (count > 0) {
            const isVisible = await labelElement.isVisible({ timeout: 3000 }).catch(() => false);
            if (isVisible) {
              console.log(`✓ Label found in allLabelsSection`);
              found = true;
            }
          }
        }
      } catch (e) {
        console.log(`Strategy 1 failed: ${e.message}`);
      }
      
      // Strategy 2: Check in dropdown menu (any div or span with the label text)
      if (!found) {
        try {
          console.log('Checking in dropdown menu...');
          const dropdownMenu = this.labelDropdownMenu.or(this.page.locator('div.dropdown-menu, ul.dropdown-menu').first());
          const menuExists = await dropdownMenu.count() > 0;
          if (menuExists) {
            // Try multiple selectors
            const selectors = [
              `div.label:has-text("${labelName}")`,
              `span:has-text("${labelName}")`,
              `div:has-text("${labelName}")`,
              `*:has-text("${labelName}")`
            ];
            
            for (const selector of selectors) {
              labelElement = dropdownMenu.locator(selector).first();
              const count = await labelElement.count();
              if (count > 0) {
                const isVisible = await labelElement.isVisible({ timeout: 2000 }).catch(() => false);
                if (isVisible) {
                  console.log(`✓ Label found with selector: ${selector}`);
                  found = true;
                  break;
                }
              }
            }
          }
        } catch (e) {
          console.log(`Strategy 2 failed: ${e.message}`);
        }
      }
      
      // Strategy 3: Use evaluate to search all dropdown content (case-insensitive)
      if (!found) {
        try {
          console.log('Checking using evaluate (searching all dropdown content)...');
          const searchNameLower = labelName.toLowerCase();
          const labelExists = await this.page.evaluate((searchName) => {
            // Find dropdown menu - try multiple selectors
            let dropdown = document.querySelector('div.dropdown-menu');
            if (!dropdown) {
              dropdown = document.querySelector('ul.dropdown-menu');
            }
            if (!dropdown) {
              dropdown = document.querySelector('div.all-labels-section');
            }
            if (!dropdown) {
              // Try to find any visible dropdown
              const allDropdowns = document.querySelectorAll('div.dropdown-menu, ul.dropdown-menu, [class*="dropdown"]');
              for (const d of allDropdowns) {
                const style = window.getComputedStyle(d);
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                  dropdown = d;
                  break;
                }
              }
            }
            
            if (!dropdown) {
              console.log('No dropdown found');
              return false;
            }
            
            // Search for label text in all elements (case-insensitive)
            const allElements = dropdown.querySelectorAll('*');
            for (const el of allElements) {
              const text = (el.textContent || '').trim();
              if (text && text.toLowerCase().includes(searchName)) {
                // Check if it's visible
                const style = window.getComputedStyle(el);
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                  console.log(`Found matching label: "${text}"`);
                  return true;
                }
              }
            }
            return false;
          }, searchNameLower);
          
          if (labelExists) {
            console.log(`✓ Label found using evaluate`);
            found = true;
          }
        } catch (e) {
          console.log(`Strategy 3 failed: ${e.message}`);
        }
      }
      
      if (found) {
        console.log(`✓ Label "${labelName}" verified in dropdown`);
        return true;
      } else {
        console.log(`✗ Label "${labelName}" not found in dropdown`);
        // Debug: Show what's actually in the dropdown
        const dropdownContent = await this.page.evaluate(() => {
          let dropdown = document.querySelector('div.dropdown-menu, ul.dropdown-menu, div.all-labels-section');
          if (!dropdown) {
            const allDropdowns = document.querySelectorAll('div.dropdown-menu, ul.dropdown-menu, [class*="dropdown"]');
            for (const d of allDropdowns) {
              const style = window.getComputedStyle(d);
              if (style.display !== 'none' && style.visibility !== 'hidden') {
                dropdown = d;
                break;
              }
            }
          }
          if (!dropdown) return 'No dropdown found';
          const labels = Array.from(dropdown.querySelectorAll('div.label, span, div, li')).map(el => {
            const text = el.textContent?.trim();
            return text;
          }).filter(t => t && t.length > 0);
          return labels.slice(0, 20);
        }).catch(() => []);
        console.log(`Dropdown content (first 20 items):`, dropdownContent);
        return false;
      }
    } catch (error) {
      console.error('Error verifying label in dropdown:', error);
      return false;
    }
  }

  /**
   * Clicks the edit button (pencil icon) for a specific label in the manage label table.
   * @param {string} labelName - The name of the label to edit
   */
  async clickEditLabel(labelName) {
    try {
      // Find the row containing the label name
      let labelRow = null;
      
      // Strategy 1: Find by exact text match
      try {
        labelRow = this.page.locator(`tr:has-text("${labelName}")`).first();
        await labelRow.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        // Strategy 2: Find by partial text match
        try {
          labelRow = this.page.locator(`tr`).filter({ hasText: labelName }).first();
          await labelRow.waitFor({ state: 'visible', timeout: 5000 });
        } catch {
          // Strategy 3: Find all rows and check text content
          const allRows = this.page.locator('tr').all();
          const rows = await allRows;
          for (const row of rows) {
            const text = await row.textContent();
            if (text && text.includes(labelName)) {
              labelRow = row;
              break;
            }
          }
        }
      }
      
      if (!labelRow) {
        throw new Error(`Label row with name "${labelName}" not found`);
      }
      
      // Find the edit button (pencil icon) in the last column
      const editButton = labelRow.locator('i.bi-pencil').first();
      await editButton.waitFor({ state: 'visible', timeout: 5000 });
      await editButton.click();
      
      // Wait for edit modal to appear
      await this.labelNameInput.waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
      throw new Error(`Failed to click edit button for label "${labelName}": ${error.message}`);
    }
  }

  /**
   * Updates the label name in the edit modal.
   * @param {string} newLabelName - The new label name
   */
  async updateLabelName(newLabelName) {
    await this.labelNameInput.waitFor({ state: 'visible', timeout: 5000 });
    // Clear existing value and fill new name
    await this.labelNameInput.clear();
    await this.labelNameInput.fill(newLabelName);
  }

  /**
   * Updates the label color in the edit modal.
   * @param {string} colorHex - The new color in hex format (e.g., "#FF5733")
   */
  async updateLabelColor(colorHex) {
    await this.customColorInput.waitFor({ state: 'visible', timeout: 5000 });
    // Color inputs require setting the value property directly via JavaScript
    await this.customColorInput.evaluate((input, color) => {
      input.value = color;
      // Trigger input and change events to ensure the form recognizes the change
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, colorHex);
  }

  /**
   * Edits an existing label by updating its name and/or color.
   * @param {string} originalLabelName - The current label name
   * @param {Object} updatedData - Object containing updated label information
   * @param {string} updatedData.name - New label name (optional)
   * @param {string} updatedData.color - New label color in hex format (optional)
   */
  async editLabel(originalLabelName, updatedData) {
    // Click edit button for the label
    await this.clickEditLabel(originalLabelName);
    
    // Update name if provided
    if (updatedData.name) {
      await this.updateLabelName(updatedData.name);
    }
    
    // Update color if provided
    if (updatedData.color) {
      await this.updateLabelColor(updatedData.color);
    }
    
    // Submit the form
    await this.submitLabelForm();
  }

  /**
   * Clicks the delete button (trash icon) for a specific label in the manage label table.
   * @param {string} labelName - The name of the label to delete
   */
  async clickDeleteLabel(labelName) {
    try {
      // Find the row containing the label name
      let labelRow = null;
      
      // Strategy 1: Find by exact text match
      try {
        labelRow = this.page.locator(`tr:has-text("${labelName}")`).first();
        await labelRow.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        // Strategy 2: Find by partial text match
        try {
          labelRow = this.page.locator(`tr`).filter({ hasText: labelName }).first();
          await labelRow.waitFor({ state: 'visible', timeout: 5000 });
        } catch {
          // Strategy 3: Find all rows and check text content
          const allRows = this.page.locator('tr').all();
          const rows = await allRows;
          for (const row of rows) {
            const text = await row.textContent();
            if (text && text.includes(labelName)) {
              labelRow = row;
              break;
            }
          }
        }
      }
      
      if (!labelRow) {
        throw new Error(`Label row with name "${labelName}" not found`);
      }
      
      // Find the delete button (trash icon) in the last column
      const deleteButton = labelRow.locator('i.bi-trash3').first();
      await deleteButton.waitFor({ state: 'visible', timeout: 5000 });
      await deleteButton.click();
      
      // Wait for delete confirmation modal to appear
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click delete button for label "${labelName}": ${error.message}`);
    }
  }

  /**
   * Confirms deletion in the delete confirmation modal by clicking Yes.
   */
  async confirmDeleteLabel() {
    const yesButton = this.page.locator('button.btn-label:has-text("Yes")').first();
    await yesButton.waitFor({ state: 'visible', timeout: 5000 });
    await yesButton.click();
    // Wait for deletion to complete
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /**
   * Verifies that a label is deleted (no longer appears in the manage label table).
   * @param {string} labelName - The label name to verify is deleted
   * @returns {Promise<boolean>} - Returns true if label is not found (deleted), false if still exists
   */
  async verifyLabelDeleted(labelName) {
    try {
      // Wait for table to refresh
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(1000);
      
      // Try to find the label row
      let labelRow = null;
      
      // Strategy 1: Try to find by exact text match
      try {
        labelRow = this.page.locator(`tr:has-text("${labelName}")`).first();
        await labelRow.waitFor({ state: 'visible', timeout: 2000 });
      } catch {
        // Strategy 2: Try to find by partial text match
        try {
          labelRow = this.page.locator(`tr`).filter({ hasText: labelName }).first();
          await labelRow.waitFor({ state: 'visible', timeout: 2000 });
        } catch {
          // Strategy 3: Check all rows
          const allRows = this.page.locator('tr').all();
          const rows = await allRows;
          for (const row of rows) {
            const text = await row.textContent();
            if (text && text.includes(labelName)) {
              labelRow = row;
              break;
            }
          }
        }
      }
      
      // If label row is found, it means label still exists (not deleted)
      if (labelRow) {
        const isVisible = await labelRow.isVisible().catch(() => false);
        return !isVisible; // Return true if not visible (deleted), false if visible (still exists)
      }
      
      // If label row is not found, it means label is deleted
      return true;
    } catch {
      // If we can't find the label, assume it's deleted
      return true;
    }
  }

  /**
   * Deletes a label by clicking delete button and confirming deletion.
   * @param {string} labelName - The name of the label to delete
   */
  async deleteLabel(labelName) {
    await this.clickDeleteLabel(labelName);
    await this.confirmDeleteLabel();
  }

  /**
   * Checks if an error toast message is visible in the toast container.
   * @returns {Promise<boolean>}
   */
  async isErrorToastVisible() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 });
      // Look for error toast messages in the toast container
      const errorToast = this.toastContainer
        .locator('div[class*="error"], div[class*="danger"], div[class*="toast-error"], *:has-text("error"), *:has-text("already"), *:has-text("duplicate"), *:has-text("exists")')
        .first();
      await errorToast.waitFor({ state: 'visible', timeout: 5000 });
      return await errorToast.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets the error toast message text.
   * @returns {Promise<string|null>}
   */
  async getErrorToastMessage() {
    try {
      await this.toastContainer.waitFor({ state: 'visible', timeout: 5000 });
      const errorToast = this.toastContainer
        .locator('div[class*="error"], div[class*="danger"], div[class*="toast-error"], *:has-text("error"), *:has-text("already"), *:has-text("duplicate"), *:has-text("exists")')
        .first();
      await errorToast.waitFor({ state: 'visible', timeout: 5000 });
      return await errorToast.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Counts how many labels with a specific name exist in the manage label table.
   * @param {string} labelName - The label name to count
   * @returns {Promise<number>}
   */
  async countLabelsByName(labelName) {
    try {
      console.log(`\n[COUNT LABELS] Counting labels with name: "${labelName}"`);
      
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(500);
      
      // Use a single evaluate call to count all matching labels (avoids page closure issues)
      const count = await this.page.evaluate((searchName) => {
        let matchCount = 0;
        // Get all table rows (excluding header rows)
        const rows = document.querySelectorAll('tbody tr, tr');
        
        for (const row of rows) {
          // Skip header rows
          if (row.querySelector('th')) {
            continue;
          }
          
          // Get first cell (label name column)
          const firstCell = row.querySelector('td');
          if (!firstCell) {
            continue;
          }
          
          // Try to get text from span first, then from cell
          const span = firstCell.querySelector('span');
          let nameText = '';
          
          if (span && span.textContent) {
            nameText = span.textContent.trim();
          } else if (firstCell.textContent) {
            nameText = firstCell.textContent.trim();
          }
          
          // Check if name matches (case-insensitive)
          if (nameText) {
            const nameLower = nameText.toLowerCase();
            const searchLower = searchName.toLowerCase();
            if (nameLower === searchLower || nameLower.includes(searchLower) || searchLower.includes(nameLower)) {
              matchCount++;
            }
          }
        }
        
        return matchCount;
      }, labelName).catch((error) => {
        console.error('Error counting labels:', error.message);
        return 0;
      });
      
      console.log(`Found ${count} label(s) with name "${labelName}"`);
      return count;
    } catch (error) {
      console.error('Error counting labels by name:', error);
      return 0;
    }
  }
}

module.exports = { CustomersPage };

