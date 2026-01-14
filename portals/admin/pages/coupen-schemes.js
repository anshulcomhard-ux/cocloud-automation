class CouponsSchemesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: Sidebar menu item "Coupons & Schemes"
    // Try routerlink first (most reliable)
    this.couponsSchemesRouterLink = page.locator('a[routerlink*="coupons"], div[routerlink*="coupons"], li[routerlink*="coupons"], a[ng-reflect-router-link*="coupons"], div[ng-reflect-router-link*="coupons"], li[ng-reflect-router-link*="coupons"]').first();
    
    // Fallback: find by text content
    this.couponsSchemesLink = page.locator('a:has-text("Coupons"), div:has-text("Coupons"), li:has-text("Coupons"), *:has-text("Coupons & Schemes"), *:has-text("Coupons &amp; Schemes")').filter({ 
      hasNot: page.locator(':has-text("Product"), :has-text("Billing"), :has-text("Google Drive")') 
    }).first();
    
    // Page elements
    // HTML: Page heading "Coupons & Schemes" - <span class="title">Coupons &amp; Schemes</span>
    this.pageHeading = page.locator('span.title, h1, h2, .heading').filter({ 
      hasText: /Coupons.*Schemes/i 
    }).first();
    this.pageWrapper = page.locator('app-root, app-coupons-schemes, [class*="coupons-schemes"], [class*="couponsSchemes"]').first();
    
    // Action buttons
    // HTML: <button type="button" class="comman-btn1 btn-primary">+ Coupon</button>
    this.addCouponButton = page.locator('button.comman-btn1:has-text("+ Coupon"), button:has-text("+ Coupon"), button.btn-primary:has-text("+ Coupon"), .btn:has-text("+ Coupon")').first();
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), .btn:has-text("Select Headers")').first();
    
    // Tabs
    this.couponTab = page.locator('button:has-text("Coupon"), .tab:has-text("Coupon"), [role="tab"]:has-text("Coupon")').first();
    this.schemeTab = page.locator('li a:has-text("Scheme"), li.activate a:has-text("Scheme"), button:has-text("Scheme"), .tab:has-text("Scheme"), [role="tab"]:has-text("Scheme")').first();
    
    // Scheme button
    this.addSchemeButton = page.locator('button:has-text("+ Scheme"), button:has-text("Scheme"), .btn:has-text("+ Scheme"), button.comman-btn1:has-text("+ Scheme")').first();
    
    // Table elements
    this.couponsTable = page.locator('table, [class*="table"], [role="table"]').first();
    this.allTableRows = page.locator('table tbody tr, [role="table"] [role="row"]:not([role="columnheader"])');
    this.tableHeaders = page.locator('table thead th, [role="table"] [role="columnheader"]');
    
    // Action column edit icon locator
    // HTML: Edit icon (pencil) in Action column
    this.editIcon = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has(i[class*="pencil"]), td:has-text("Action") ~ td i[class*="pencil"]').first();
    this.editIcons = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has(i[class*="pencil"])');
    
    // Action column delete icon locator
    // HTML: Delete icon (trash) in Action column
    this.deleteIcon = page.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"], td.mat-column-Action button:has(i[class*="trash"]), td.mat-column-Action button:has([class*="bi-trash"])').first();
    this.deleteIcons = page.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"], td.mat-column-Action button:has(i[class*="trash"])');
    
    // Delete Coupon Modal locators
    this.deleteCouponModal = page.locator('div.modal:has-text("Delete"), .modal-dialog:has-text("Delete"), [role="dialog"]:has-text("Delete")').first();
    this.deleteCouponModalTitle = page.locator('h1:has-text("Delete"), h2:has-text("Delete"), h3:has-text("Delete"), h4:has-text("Delete"), h5:has-text("Delete"), .modal-title:has-text("Delete"), *:has-text("Delete")').first();
    this.deleteCouponModalYesButton = page.locator('button:has-text("Yes"), button.btn:has-text("Yes"), button.btn-primary:has-text("Yes")').first();
    this.deleteCouponModalNoButton = page.locator('button:has-text("No"), button.btn:has-text("No"), button.btn-secondary:has-text("No")').first();
    
    // Pagination info
    this.paginationInfo = page.locator('*:has-text("Showing"), *:has-text("records"), *:has-text("to")').first();
    
    // Add Coupon Modal/Form locators
    // HTML: Modal title "Add Coupon" or page heading
    this.addCouponModal = page.locator('div.modal-section:has-text("Add Coupon"), div.modal:has-text("Add Coupon"), [class*="modal"]:has-text("Add Coupon")').first();
    this.addCouponModalTitle = page.locator('div.modal-heading:has-text("Add Coupon"), h4:has-text("Add Coupon"), h5:has-text("Add Coupon"), h1:has-text("Add Coupon"), h2:has-text("Add Coupon"), .heading:has-text("Add Coupon"), span.title:has-text("Add Coupon")').first();
    
    // Alternative: Check for form fields that should be visible in Add Coupon form
    this.addCouponForm = page.locator('form:has(input[placeholder*="First purchase"]), form:has(input[placeholder*="coupon name"]), [class*="form"]:has(input[placeholder*="First purchase"])').first();
    
    // Update Coupon Modal/Form locators
    // HTML: Modal title "Update Coupon" or page heading
    this.updateCouponModal = page.locator('div.modal-section:has-text("Update Coupon"), div.modal:has-text("Update Coupon"), [class*="modal"]:has-text("Update Coupon"), h1:has-text("Update Coupon"), h2:has-text("Update Coupon"), .heading:has-text("Update Coupon"), span.title:has-text("Update Coupon")').first();
    this.updateCouponModalTitle = page.locator('div.modal-heading:has-text("Update Coupon"), h4:has-text("Update Coupon"), h5:has-text("Update Coupon"), h1:has-text("Update Coupon"), h2:has-text("Update Coupon"), .heading:has-text("Update Coupon"), span.title:has-text("Update Coupon")').first();
    
    // Form fields
    // HTML: Coupon name input - placeholder "E.g First purchase discount"
    this.couponNameField = page.locator('input[placeholder*="First purchase"], input[placeholder*="coupon name"], input#couponName, input[name*="couponName"], input[ng-reflect-name*="couponName"]').first();
    
    // HTML: Min User input - placeholder "e.g 10"
    this.minUserField = page.locator('input[placeholder*="e.g 10"], input[placeholder*="min user"], input#minUser, input[name*="minUser"], input[ng-reflect-name*="minUser"]').first();
    
    // HTML: Select Plans dropdown - Bootstrap dropdown
    // <p id="dropdownMenuButton" data-bs-toggle="dropdown" class="form-select">Select plan</p>
    this.selectPlansDropdown = page.locator('p#dropdownMenuButton[data-bs-toggle="dropdown"], p[data-bs-toggle="dropdown"]:has-text("Select plan"), p.form-select:has-text("Select plan"), *[data-bs-toggle="dropdown"]:has-text("Select plan")').first();
    this.selectPlansDropdownMenu = page.locator('ul.dropdown-menu:has(label:has-text("Select All")), div.dropdown-menu:has(label:has-text("Select All")), [class*="dropdown-menu"]:has(label:has-text("Select All"))').first();
    // HTML: <input type="checkbox" class="me-2"> inside label with "Select All" text
    this.selectAllPlansCheckbox = page.locator('label:has-text("Select All") input[type="checkbox"], .dropdown-menu label:has-text("Select All") input[type="checkbox"], input[type="checkbox"].me-2').first();
    this.selectAllPlansLabel = page.locator('label:has-text("Select All"), .dropdown-menu label:has-text("Select All")').first();
    this.plansOptions = page.locator('.dropdown-menu label, .dropdown-menu input[type="checkbox"]').filter({ hasNot: page.locator(':has-text("Select All")') });
    
    // HTML: Coupon type radio buttons
    this.couponTypeMonthRadio = page.locator('input[type="radio"][value*="month"], input[type="radio"]:has-text("Month"), label:has-text("Month") input[type="radio"], *:has-text("Month"):has(input[type="radio"]) input[type="radio"]').first();
    this.couponTypeStaticRadio = page.locator('input[type="radio"][value*="static"], input[type="radio"]:has-text("Static"), label:has-text("Static") input[type="radio"], *:has-text("Static"):has(input[type="radio"]) input[type="radio"]').first();
    this.couponTypePercentageRadio = page.locator('input[type="radio"][value*="percentage"], input[type="radio"]:has-text("Percentage"), label:has-text("Percentage") input[type="radio"], *:has-text("Percentage"):has(input[type="radio"]) input[type="radio"]').first();
    
    // HTML: Discount amount input (visible for Static and Percentage types)
    this.discountAmountField = page.locator('input[placeholder*="Discount amount"], input#discountAmount, input[name*="discountAmount"], input[ng-reflect-name*="discountAmount"]').first();
    
    // HTML: Number of months input (visible for Month type)
    // <input formcontrolname="value" placeholder="e.g 10">
    this.numberOfMonthsField = page.locator('input[formcontrolname="value"][placeholder*="e.g 10"], input[formcontrolname="value"]:has-text(""), input[placeholder*="e.g 10"], input[placeholder*="month"], input[placeholder*="Month"], input#numberOfMonths, input[name*="numberOfMonths"], input[name*="months"]').first();
    
    // HTML: Specific date dropdown (ON/OFF) - Standard HTML select
    // <select formcontrolname="selectedDate"><option value="off">OFF</option><option value="on">On</option></select>
    this.specificDateDropdown = page.locator('select[formcontrolname="selectedDate"], select:has(option[value="off"]):has(option[value="on"]), *:has-text("Specific date") ~ select, *:has-text("Specific date") + select').first();
    this.specificDateOnOption = page.locator('select[formcontrolname="selectedDate"] option[value="on"], select option[value="on"]').first();
    this.specificDateOffOption = page.locator('select[formcontrolname="selectedDate"] option[value="off"], select option[value="off"]').first();
    
    // HTML: Date input field (appears when Specific date is ON)
    this.dateInputField = page.locator('input[type="date"], input[placeholder*="mm/dd/yyyy"], input[placeholder*="date"], input.mat-datepicker-input').first();
    
    // HTML: Limit dropdown (ON/OFF) - Standard HTML select
    // <select formcontrolname="selectedLimit"><option value="off">OFF</option><option value="on">On</option></select>
    this.limitDropdown = page.locator('select[formcontrolname="selectedLimit"], select:has(option[value="off"]):has(option[value="on"]), *:has-text("Limit") ~ select, *:has-text("Limit") + select').first();
    this.limitOnOption = page.locator('select[formcontrolname="selectedLimit"] option[value="on"], select option[value="on"]').first();
    this.limitOffOption = page.locator('select[formcontrolname="selectedLimit"] option[value="off"], select option[value="off"]').first();
    
    // HTML: Limit input field (appears when Limit is ON)
    // <input type="number" formcontrolname="limit">
    this.limitInputField = page.locator('input[formcontrolname="limit"], input[type="number"][formcontrolname="limit"], input[placeholder*="limit"], input#limit, input[name*="limit"], input[ng-reflect-name*="limit"]').filter({ hasNot: page.locator('[type="date"]') }).first();
    
    // HTML: Email dropdown - Standard HTML select
    // <select formcontrolname="selectedEmail"><option value="off">OFF</option><option value="on">On</option></select>
    this.emailDropdown = page.locator('select[formcontrolname*="Email"], select[formcontrolname*="email"], select:has(option[value="off"]):has(option[value="on"]), *:has-text("Email") ~ select, *:has-text("Email") + select').first();
    this.emailOnOption = page.locator('select[formcontrolname*="Email"] option[value="on"], select[formcontrolname*="email"] option[value="on"], select option[value="on"]').first();
    this.emailOffOption = page.locator('select[formcontrolname*="Email"] option[value="off"], select[formcontrolname*="email"] option[value="off"], select option[value="off"]').first();
    
    // HTML: Create and Cancel buttons
    this.createButton = page.locator('button:has-text("Create"), .btn:has-text("Create"), button[type="submit"]:has-text("Create")').first();
    // HTML: Update button (for edit form)
    this.updateButton = page.locator('button:has-text("Update"), .btn:has-text("Update"), button[type="submit"]:has-text("Update")').first();
    this.cancelButton = page.locator('button:has-text("Cancel"), .btn:has-text("Cancel")').first();
    
    // Validation error messages
    // HTML: <div class="text-danger mb-1"><small>It is required field</small></div>
    this.validationErrors = page.locator('div.text-danger.mb-1 small:has-text("It is required field"), .text-danger:has-text("It is required field"), .text-danger:has-text("It is mandatory field"), .alert:has-text("It is mandatory"), small.text-danger, .invalid-feedback, [class*="error"]:has-text("required"), [class*="error"]:has-text("mandatory")');
    this.requiredFieldErrors = page.locator('div.text-danger.mb-1 small:has-text("It is required field"), .text-danger:has-text("It is required field"), .text-danger:has-text("It is mandatory field"), .alert:has-text("It is mandatory")');
    
    // Add Scheme Modal/Form locators
    // HTML: Form title "Scheme" or page heading
    this.addSchemeModal = page.locator('form:has(input[placeholder*="Enter scheme name"]), form:has(label:has-text("Scheme name")), [class*="form"]:has(input[placeholder*="Enter scheme name"])').first();
    this.addSchemeForm = page.locator('form:has(input[placeholder*="Enter scheme name"]), form:has(label:has-text("Scheme name"))').first();
    
    // Scheme form fields
    // HTML: <input id="fullName" placeholder="Enter scheme name" formcontrolname="name">
    this.schemeNameField = page.locator('input[placeholder*="Enter scheme name"], input#fullName[formcontrolname="name"], input[formcontrolname="name"], input[placeholder*="scheme name"]').first();
    
    // HTML: Select Partners dropdown - Bootstrap dropdown
    // <p id="dropdownMenuButton" data-bs-toggle="dropdown" class="form-select">Select partner</p>
    this.selectPartnersDropdown = page.locator('p[data-bs-toggle="dropdown"]:has-text("Select partner"), p#dropdownMenuButton[data-bs-toggle="dropdown"]:has-text("Select partner"), *[data-bs-toggle="dropdown"]:has-text("Select partner")').first();
    this.selectPartnersDropdownMenu = page.locator('ul.dropdown-menu:has-text("Select All"), div.dropdown-menu:has-text("Select All"), [class*="dropdown-menu"]:has-text("Select All")').first();
    // HTML: <div class="customerList"><input type="checkbox" class="me-2"><label>Select All</label></div>
    this.selectAllPartnersCheckbox = page.locator('.customerList:has-text("Select All") input[type="checkbox"], .customerList:has(label:has-text("Select All")) input[type="checkbox"], label:has-text("Select All") ~ input[type="checkbox"], label:has-text("Select All") + input[type="checkbox"], input[type="checkbox"].me-2').first();
    this.selectAllPartnersLabel = page.locator('.customerList:has-text("Select All") label, .customerList label:has-text("Select All"), label:has-text("Select All")').first();
    
    // HTML: Select Plans dropdown for Scheme - Bootstrap dropdown (similar to coupon)
    this.selectPlansDropdownScheme = page.locator('p[data-bs-toggle="dropdown"]:has-text("Select plan"), p#dropdownMenuButton[data-bs-toggle="dropdown"]:has-text("Select plan"), *[data-bs-toggle="dropdown"]:has-text("Select plan")').filter({ hasNot: page.locator(':has-text("Select partner")') }).first();
    this.selectPlansDropdownMenuScheme = page.locator('ul.dropdown-menu:has-text("Select All"), div.dropdown-menu:has-text("Select All"), [class*="dropdown-menu"]:has-text("Select All")').first();
    // HTML: <div class="customerList"><input type="checkbox" class="me-2"><label>Select All</label></div>
    this.selectAllPlansCheckboxScheme = page.locator('.customerList:has-text("Select All") input[type="checkbox"], .customerList:has(label:has-text("Select All")) input[type="checkbox"], label:has-text("Select All") ~ input[type="checkbox"], label:has-text("Select All") + input[type="checkbox"], input[type="checkbox"].me-2').first();
    this.selectAllPlansLabelScheme = page.locator('.customerList:has-text("Select All") label, .customerList label:has-text("Select All"), label:has-text("Select All")').first();
    
    // HTML: Scheme Type radio buttons
    this.schemeTypeNonRecurringRadio = page.locator('input[type="radio"][value*="non-recurring"], input[type="radio"][formcontrolname="occurrence"][value*="non-recurring"], label:has-text("Non-Recurring") input[type="radio"], *:has-text("Non-Recurring"):has(input[type="radio"]) input[type="radio"]').first();
    this.schemeTypeRecurringRadio = page.locator('input[type="radio"][value*="recurring"], input[type="radio"][formcontrolname="occurrence"][value*="recurring"], label:has-text("Recurring") input[type="radio"], *:has-text("Recurring"):has(input[type="radio"]) input[type="radio"]').first();
    
    // HTML: Start Date and End Date fields
    // <input type="date" formcontrolname="fromDate">
    this.startDateField = page.locator('input[formcontrolname="fromDate"], input[type="date"][formcontrolname="fromDate"], input[type="date"]:has-text("From")').first();
    // <input type="date" formcontrolname="toDate">
    this.endDateField = page.locator('input[formcontrolname="toDate"], input[type="date"][formcontrolname="toDate"], input[type="date"]:has-text("To")').first();
    
    // HTML: Reward Trigger table fields
    // <input type="number" placeholder="Enter number of users" formcontrolname="noOfUsers">
    this.rewardTriggerNoOfUsersField = page.locator('input[formcontrolname="noOfUsers"], input[placeholder*="Enter number of users"], input[type="number"][formcontrolname="noOfUsers"]').first();
    // <input type="number" formcontrolname="value" placeholder="e.g 10">
    this.rewardTriggerValueField = page.locator('input[formcontrolname="value"][placeholder*="e.g 10"], input[formcontrolname="value"]:has-text(""), input[placeholder*="e.g 10"]').filter({ hasNot: page.locator('[formcontrolname="noOfUsers"]') }).first();
  }

  /**
   * Navigates to the Coupons & Schemes page.
   * @param {string} baseUrl - The base URL of the application.
   */
  async gotoCouponsSchemes(baseUrl) {
    try {
      // Strategy 1: Try to find by routerlink (most reliable)
      const routerLinkVisible = await this.couponsSchemesRouterLink.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (routerLinkVisible) {
        await this.couponsSchemesRouterLink.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.couponsSchemesRouterLink.click();
        await this.page.waitForTimeout(3000);
        await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        
        // Verify navigation
        const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
        if (isHeadingVisible) {
          return;
        }
      }
      
      // Strategy 2: Try clicking the sidebar link by text
      await this.couponsSchemesLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.couponsSchemesLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Try multiple click strategies for Chrome compatibility
      try {
        // First try regular click
        await this.couponsSchemesLink.click();
      } catch (clickError) {
        // If regular click fails, try force click
        try {
          await this.couponsSchemesLink.click({ force: true });
        } catch (forceError) {
          // If force click fails, try JavaScript click
          await this.couponsSchemesLink.evaluate((element) => {
            if (element) {
              element.click();
            }
          });
        }
      }
      
      // Wait for navigation
      await this.page.waitForTimeout(3000);
      await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
      
      // Verify we're on the correct page by checking for heading
      const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      if (!isHeadingVisible) {
        // If heading not visible, wait a bit more and check again
        await this.page.waitForTimeout(2000);
        const isHeadingVisible2 = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
        if (!isHeadingVisible2) {
          // If still not visible, try direct navigation
          throw new Error('Page heading not visible after sidebar click');
        }
      }
    } catch (error) {
      // If clicking fails, try direct navigation
      try {
        const url = baseUrl.replace('/login', '').replace('/login/', '');
        const couponsSchemesUrl = url.endsWith('/') ? `${url}coupons-schemes` : `${url}/coupons-schemes`;
        await this.page.goto(couponsSchemesUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
      } catch (navError) {
        throw new Error(`Failed to navigate to Coupons & Schemes page: ${error.message}`);
      }
    }
  }

  /**
   * Verifies if the Coupons & Schemes page is loaded.
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Check URL
      const currentUrl = this.page.url();
      const urlMatches = currentUrl.includes('coupons-schemes') || currentUrl.includes('couponsSchemes') || currentUrl.includes('coupons');
      
      if (urlMatches) {
        // URL matches, now check for page elements
        let retries = 3;
        while (retries > 0) {
          // First check for the page heading
          const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
          if (isHeadingVisible) {
            return true;
          }
          
          // Fallback: check for other page elements
          const isTableVisible = await this.couponsTable.isVisible({ timeout: 3000 }).catch(() => false);
          const isAddButtonVisible = await this.addCouponButton.isVisible({ timeout: 3000 }).catch(() => false);
          const isTabVisible = await this.couponTab.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isTableVisible || isAddButtonVisible || isTabVisible) {
            return true;
          }
          
          await this.page.waitForTimeout(2000);
          retries--;
        }
      } else {
        // If URL doesn't match, still try to check for page elements (might be on the page already)
        const isHeadingVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
        if (isHeadingVisible) {
          return true;
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Retrieves the page heading text.
   * @returns {Promise<string>}
   */
  async getPageHeading() {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
      const headingText = await this.pageHeading.textContent();
      return headingText ? headingText.trim() : '';
    } catch {
      return '';
    }
  }

  // ==================== ADD COUPON FORM METHODS ====================

  /**
   * Clicks the Add Coupon button to open the form.
   */
  async clickAddCouponButton() {
    try {
      await this.addCouponButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addCouponButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.addCouponButton.click();
      
      // Wait for modal/form to appear
      await this.addCouponModalTitle.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
        // If title doesn't appear, wait a bit more and check for form fields
        return this.page.waitForTimeout(2000);
      });
      
      // Also wait for form fields to be visible
      await this.couponNameField.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Add Coupon button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add Coupon modal/form is open.
   * @returns {Promise<boolean>}
   */
  async isAddCouponModalOpen() {
    try {
      // Check for modal section first
      const isModalVisible = await this.addCouponModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (isModalVisible) {
        // Verify title is visible
        const isTitleVisible = await this.addCouponModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
        if (isTitleVisible) {
          return true;
        }
      }
      
      // Try checking for title directly (might be a page, not modal)
      const isTitleVisible = await this.addCouponModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      if (isTitleVisible) {
        return true;
      }
      
      // Fallback: check for form fields that should be visible
      const isFormVisible = await this.addCouponForm.isVisible({ timeout: 3000 }).catch(() => false);
      if (isFormVisible) {
        return true;
      }
      
      // Last fallback: check for coupon name field
      const isCouponNameFieldVisible = await this.couponNameField.isVisible({ timeout: 3000 }).catch(() => false);
      return isCouponNameFieldVisible;
    } catch {
      return false;
    }
  }

  /**
   * Fills the coupon name field.
   * @param {string} value - The coupon name.
   */
  async fillCouponName(value) {
    try {
      await this.couponNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.couponNameField.clear();
      await this.couponNameField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill coupon name: ${error.message}`);
    }
  }

  /**
   * Fills the min user field.
   * @param {string} value - The min user value.
   */
  async fillMinUser(value) {
    try {
      await this.minUserField.waitFor({ state: 'visible', timeout: 10000 });
      await this.minUserField.clear();
      await this.minUserField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill min user: ${error.message}`);
    }
  }

  /**
   * Clicks the Select Plans dropdown and opens it.
   */
  async clickSelectPlansDropdown() {
    try {
      await this.selectPlansDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectPlansDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Click the Bootstrap dropdown button
      await this.selectPlansDropdown.click();
      
      // Wait for dropdown menu to appear (Bootstrap dropdown)
      await this.page.waitForTimeout(1000);
      await this.selectPlansDropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Select Plans dropdown: ${error.message}`);
    }
  }

  /**
   * Selects "Select All" option in the Plans dropdown.
   */
  async selectAllPlans() {
    try {
      await this.clickSelectPlansDropdown();
      await this.page.waitForTimeout(1000);
      
      // Wait for Select All checkbox to be visible
      await this.selectAllPlansCheckbox.waitFor({ state: 'visible', timeout: 10000 });
      
      // Check if checkbox is already checked
      const isChecked = await this.selectAllPlansCheckbox.isChecked().catch(() => false);
      
      if (!isChecked) {
        // Click the checkbox directly
        await this.selectAllPlansCheckbox.click();
        await this.page.waitForTimeout(500);
        
        // Verify it's checked
        const isNowChecked = await this.selectAllPlansCheckbox.isChecked().catch(() => false);
        if (!isNowChecked) {
          // If direct click didn't work, try clicking the label
          await this.selectAllPlansLabel.click();
          await this.page.waitForTimeout(500);
        }
      }
      
      // Click outside to close Bootstrap dropdown
      await this.page.click('body', { position: { x: 0, y: 0 } });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select all plans: ${error.message}`);
    }
  }

  /**
   * Selects coupon type radio button.
   * @param {string} type - The coupon type: "month", "static", or "percentage".
   */
  async selectCouponType(type) {
    try {
      const typeLower = type.toLowerCase();
      let radioButton;
      
      if (typeLower === 'month') {
        radioButton = this.couponTypeMonthRadio;
      } else if (typeLower === 'static') {
        radioButton = this.couponTypeStaticRadio;
      } else if (typeLower === 'percentage') {
        radioButton = this.couponTypePercentageRadio;
      } else {
        throw new Error(`Invalid coupon type: ${type}`);
      }
      
      await radioButton.waitFor({ state: 'visible', timeout: 10000 });
      await radioButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await radioButton.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select coupon type ${type}: ${error.message}`);
    }
  }

  /**
   * Fills the discount amount field.
   * @param {string} value - The discount amount.
   */
  async fillDiscountAmount(value) {
    try {
      // Wait a bit for the field to appear after selecting coupon type
      await this.page.waitForTimeout(1000);
      
      // Try multiple locator strategies - prioritize formcontrolname="value" with discount placeholder
      // For Static/Percentage types, the field uses formcontrolname="value" with placeholder "e.g 10.00"
      const fieldLocator = this.page.locator('input[formcontrolname="value"][placeholder*="10.00"], input[formcontrolname="value"][placeholder*="Discount"], input[formcontrolname="value"]').filter({ 
        hasNot: this.page.locator('[placeholder*="e.g 10"]') 
      }).first();
      
      // Wait for field to be visible
      await fieldLocator.waitFor({ state: 'visible', timeout: 10000 });
      await fieldLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Clear and fill the field
      await fieldLocator.click();
      await this.page.waitForTimeout(300);
      await fieldLocator.clear();
      await this.page.waitForTimeout(300);
      await fieldLocator.fill(value);
      await this.page.waitForTimeout(500);
      
      // Verify the value was filled
      const filledValue = await fieldLocator.inputValue().catch(() => '');
      if (filledValue !== value) {
        // Retry if value didn't set correctly
        await fieldLocator.clear();
        await this.page.waitForTimeout(300);
        await fieldLocator.type(value, { delay: 100 });
        await this.page.waitForTimeout(500);
        
        // Verify again
        const retryValue = await fieldLocator.inputValue().catch(() => '');
        if (retryValue !== value) {
          throw new Error(`Value not set correctly. Expected: ${value}, Got: ${retryValue}`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to fill discount amount: ${error.message}`);
    }
  }

  /**
   * Fills the number of months field (visible when coupon type is "Month").
   * @param {string} value - The number of months.
   */
  async fillNumberOfMonths(value) {
    try {
      // Wait a bit longer for the field to appear after selecting Month type
      await this.page.waitForTimeout(1500);
      
      // Try multiple locator strategies - prioritize formcontrolname="value"
      const fieldLocator = this.page.locator('input[formcontrolname="value"][placeholder*="e.g 10"]').first();
      
      // Wait for field to be visible
      await fieldLocator.waitFor({ state: 'visible', timeout: 10000 });
      await fieldLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Clear and fill the field
      await fieldLocator.click();
      await this.page.waitForTimeout(300);
      await fieldLocator.clear();
      await this.page.waitForTimeout(300);
      await fieldLocator.fill(value);
      await this.page.waitForTimeout(500);
      
      // Verify the value was filled
      const filledValue = await fieldLocator.inputValue().catch(() => '');
      if (filledValue !== value) {
        // Retry if value didn't set correctly
        await fieldLocator.clear();
        await this.page.waitForTimeout(300);
        await fieldLocator.type(value, { delay: 100 });
        await this.page.waitForTimeout(500);
        
        // Verify again
        const retryValue = await fieldLocator.inputValue().catch(() => '');
        if (retryValue !== value) {
          throw new Error(`Value not set correctly. Expected: ${value}, Got: ${retryValue}`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to fill number of months: ${error.message}`);
    }
  }

  /**
   * Selects ON or OFF from the Specific date dropdown (standard HTML select).
   * @param {string} option - "on" or "off".
   */
  async selectSpecificDate(option) {
    try {
      // Wait for the select dropdown to be visible
      await this.specificDateDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.specificDateDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Select the option value directly using selectOption
      const optionLower = option.toLowerCase();
      const optionValue = optionLower === 'on' ? 'on' : 'off';
      
      await this.specificDateDropdown.selectOption({ value: optionValue });
      await this.page.waitForTimeout(1000);
      
      // Verify the selection
      const selectedValue = await this.specificDateDropdown.inputValue();
      if (selectedValue !== optionValue) {
        // Retry if value didn't set correctly
        await this.specificDateDropdown.selectOption({ value: optionValue });
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to select specific date ${option}: ${error.message}`);
    }
  }

  /**
   * Fills the date input field with a future date.
   * @param {string} date - The date in format MM/DD/YYYY or YYYY-MM-DD.
   */
  async fillDateInput(date) {
    try {
      // Wait for date input field to become visible (after selecting ON)
      await this.dateInputField.waitFor({ state: 'visible', timeout: 10000 });
      await this.dateInputField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Clear and fill the date
      await this.dateInputField.clear();
      await this.dateInputField.fill(date);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill date input: ${error.message}`);
    }
  }

  /**
   * Selects ON or OFF from the Limit dropdown (standard HTML select).
   * @param {string} option - "on" or "off".
   */
  async selectLimit(option) {
    try {
      // Wait for the select dropdown to be visible
      await this.limitDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.limitDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Select the option value directly using selectOption
      const optionLower = option.toLowerCase();
      const optionValue = optionLower === 'on' ? 'on' : 'off';
      
      // Try multiple strategies for Chrome compatibility
      let selectedValue = '';
      let retries = 3;
      
      while (selectedValue !== optionValue && retries > 0) {
        // Strategy 1: Use selectOption directly
        try {
          await this.limitDropdown.selectOption({ value: optionValue });
          await this.page.waitForTimeout(1000);
          selectedValue = await this.limitDropdown.inputValue();
        } catch (e) {
          // Strategy 2: Use JavaScript to set value directly
          await this.limitDropdown.evaluate((el, val) => {
            el.value = val;
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, optionValue);
          await this.page.waitForTimeout(1000);
          selectedValue = await this.limitDropdown.inputValue();
        }
        
        if (selectedValue !== optionValue) {
          retries--;
          await this.page.waitForTimeout(500);
        }
      }
      
      if (selectedValue !== optionValue) {
        throw new Error(`Limit dropdown value not set correctly. Expected: ${optionValue}, Got: ${selectedValue}`);
      }
      
      // Wait a bit more for the input field to appear if "on" was selected
      if (optionValue === 'on') {
        await this.page.waitForTimeout(1500);
      }
    } catch (error) {
      throw new Error(`Failed to select limit ${option}: ${error.message}`);
    }
  }

  /**
   * Fills the limit input field.
   * @param {string} value - The limit value.
   */
  async fillLimitInput(value) {
    try {
      // Wait longer for the field to appear after selecting Limit ON
      await this.page.waitForTimeout(2000);
      
      // Try multiple locator strategies - prioritize formcontrolname="limit"
      const fieldLocator = this.page.locator('input[formcontrolname="limit"], input[type="number"][formcontrolname="limit"]').first();
      
      // Wait for field to be visible with longer timeout
      let fieldVisible = false;
      let retries = 5;
      while (!fieldVisible && retries > 0) {
        fieldVisible = await fieldLocator.isVisible({ timeout: 2000 }).catch(() => false);
        if (!fieldVisible) {
          await this.page.waitForTimeout(1000);
          retries--;
        }
      }
      
      if (!fieldVisible) {
        throw new Error('Limit input field not found or not visible after selecting Limit ON');
      }
      
      await fieldLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Clear and fill the field
      await fieldLocator.click();
      await this.page.waitForTimeout(300);
      await fieldLocator.clear();
      await this.page.waitForTimeout(300);
      await fieldLocator.fill(value);
      await this.page.waitForTimeout(500);
      
      // Verify the value was filled
      const filledValue = await fieldLocator.inputValue().catch(() => '');
      if (filledValue !== value) {
        // Retry if value didn't set correctly
        await fieldLocator.clear();
        await this.page.waitForTimeout(300);
        await fieldLocator.type(value, { delay: 100 });
        await this.page.waitForTimeout(500);
        
        // Verify again
        const retryValue = await fieldLocator.inputValue().catch(() => '');
        if (retryValue !== value) {
          throw new Error(`Value not set correctly. Expected: ${value}, Got: ${retryValue}`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to fill limit input: ${error.message}`);
    }
  }

  /**
   * Selects ON or OFF from the Email dropdown (standard HTML select).
   * @param {string} option - "on" or "off".
   */
  async selectEmail(option) {
    try {
      // Wait for the select dropdown to be visible
      await this.emailDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.emailDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Select the option value directly using selectOption
      const optionLower = option.toLowerCase();
      const optionValue = optionLower === 'on' ? 'on' : 'off';
      
      // Select the option
      await this.emailDropdown.selectOption({ value: optionValue });
      await this.page.waitForTimeout(1000);
      
      // Verify the selection
      const selectedValue = await this.emailDropdown.inputValue();
      if (selectedValue !== optionValue) {
        // Retry if value didn't set correctly
        await this.emailDropdown.selectOption({ value: optionValue });
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to select email ${option}: ${error.message}`);
    }
  }

  /**
   * Clicks the Create button to submit the form.
   */
  async clickCreateButton() {
    try {
      // Try Create button first
      const isCreateVisible = await this.createButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isCreateVisible) {
        await this.createButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.createButton.click();
        await this.page.waitForTimeout(3000);
        return;
      }
      
      // If Create button not found, try Update button (for edit form)
      await this.updateButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.updateButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.updateButton.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      throw new Error(`Failed to click Create/Update button: ${error.message}`);
    }
  }

  /**
   * Clicks the Create button to check validation (without waiting for navigation).
   */
  async clickCreateButtonForValidation() {
    try {
      await this.createButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.createButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.createButton.click();
      // Wait longer for validation errors to appear
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Create button: ${error.message}`);
    }
  }

  /**
   * Gets all validation error messages.
   * @returns {Promise<string[]>}
   */
  async getAllValidationErrors() {
    try {
      await this.page.waitForTimeout(2000);
      
      // First try to get required field errors
      const requiredErrors = await this.requiredFieldErrors.all();
      const errorTexts = [];
      
      for (const error of requiredErrors) {
        const text = await error.textContent();
        if (text && text.trim()) {
          errorTexts.push(text.trim());
        }
      }
      
      // If no required field errors found, try general validation errors
      if (errorTexts.length === 0) {
        const errors = await this.validationErrors.all();
        for (const error of errors) {
          const text = await error.textContent();
          if (text && text.trim()) {
            errorTexts.push(text.trim());
          }
        }
      }
      
      // Also check for invalid input fields (ng-invalid class)
      const invalidInputs = await this.page.locator('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').all();
      if (invalidInputs.length > 0 && errorTexts.length === 0) {
        // If we have invalid inputs but no error messages, count the invalid inputs
        for (let i = 0; i < invalidInputs.length; i++) {
          errorTexts.push(`Required field ${i + 1}`);
        }
      }
      
      return errorTexts;
    } catch {
      return [];
    }
  }

  /**
   * Verifies if a coupon exists in the table by name.
   * @param {string} couponName - The coupon name to search for.
   * @returns {Promise<boolean>}
   */
  async verifyCouponInTable(couponName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(couponName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets the number of rows in the coupons table.
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      await this.page.waitForTimeout(1000);
      const count = await this.allTableRows.count();
      return count;
    } catch {
      return 0;
    }
  }

  // ==================== EDIT COUPON METHODS ====================

  /**
   * Clicks the edit icon for a coupon in the table by coupon name.
   * @param {string} couponName - The name of the coupon to edit.
   */
  async clickEditIconForCoupon(couponName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(couponName.toLowerCase())) {
          // Find edit icon in this row
          const editIconInRow = row.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has(i[class*="pencil"])').first();
          const isVisible = await editIconInRow.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await editIconInRow.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await editIconInRow.click();
            await this.page.waitForTimeout(2000);
            return;
          }
        }
      }
      
      throw new Error(`Coupon "${couponName}" not found in table or edit icon not visible`);
    } catch (error) {
      throw new Error(`Failed to click edit icon for coupon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Update Coupon modal/form is open.
   * @returns {Promise<boolean>}
   */
  async isUpdateCouponModalOpen() {
    try {
      // Check for modal section first
      const isModalVisible = await this.updateCouponModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (isModalVisible) {
        // Verify title is visible
        const isTitleVisible = await this.updateCouponModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
        if (isTitleVisible) {
          return true;
        }
      }
      
      // Try checking for title directly (might be a page, not modal)
      const isTitleVisible = await this.updateCouponModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      if (isTitleVisible) {
        return true;
      }
      
      // Fallback: check for form fields that should be visible
      const isCouponNameFieldVisible = await this.couponNameField.isVisible({ timeout: 3000 }).catch(() => false);
      return isCouponNameFieldVisible;
    } catch {
      return false;
    }
  }

  /**
   * Updates coupon name field.
   * @param {string} value - The new coupon name.
   */
  async updateCouponName(value) {
    try {
      await this.couponNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.couponNameField.scrollIntoViewIfNeeded();
      await this.couponNameField.clear();
      await this.couponNameField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to update coupon name: ${error.message}`);
    }
  }

  /**
   * Updates min user field.
   * @param {string} value - The new min user value.
   */
  async updateMinUser(value) {
    try {
      await this.minUserField.waitFor({ state: 'visible', timeout: 10000 });
      await this.minUserField.scrollIntoViewIfNeeded();
      await this.minUserField.clear();
      await this.minUserField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to update min user: ${error.message}`);
    }
  }

  // ==================== DELETE COUPON METHODS ====================

  /**
   * Clicks the delete icon for a coupon in the table by coupon name.
   * @param {string} couponName - The name of the coupon to delete.
   */
  async clickDeleteIconForCoupon(couponName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(couponName.toLowerCase())) {
          // Find delete icon in this row
          const deleteIconInRow = row.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"], td.mat-column-Action button:has(i[class*="trash"])').first();
          const isVisible = await deleteIconInRow.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await deleteIconInRow.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await deleteIconInRow.click();
            await this.page.waitForTimeout(2000);
            return;
          }
        }
      }
      
      throw new Error(`Coupon "${couponName}" not found in table or delete icon not visible`);
    } catch (error) {
      throw new Error(`Failed to click delete icon for coupon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Delete Coupon modal is open.
   * @returns {Promise<boolean>}
   */
  async isDeleteCouponModalOpen() {
    try {
      const isModalVisible = await this.deleteCouponModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (isModalVisible) {
        // Verify title is visible
        const isTitleVisible = await this.deleteCouponModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
        return isTitleVisible;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Yes button in the Delete Coupon modal to confirm deletion.
   */
  async clickDeleteYesButton() {
    try {
      await this.deleteCouponModalYesButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.deleteCouponModalYesButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.deleteCouponModalYesButton.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      throw new Error(`Failed to click Yes button in delete modal: ${error.message}`);
    }
  }

  /**
   * Verifies if a coupon does NOT exist in the table by name.
   * @param {string} couponName - The coupon name to check.
   * @returns {Promise<boolean>} Returns true if coupon is NOT found (deleted), false if still found.
   */
  async verifyCouponNotInTable(couponName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(couponName.toLowerCase())) {
          return false; // Coupon still found
        }
      }
      return true; // Coupon not found (deleted)
    } catch {
      return false;
    }
  }

  // ==================== ADD SCHEME METHODS ====================

  /**
   * Clicks on the Scheme tab/section.
   */
  async clickSchemeTab() {
    try {
      // Try multiple locator strategies
      const schemeTabLocators = [
        this.page.locator('li a:has-text("Scheme")'),
        this.page.locator('li.activate a:has-text("Scheme")'),
        this.page.locator('button:has-text("Scheme")'),
        this.page.locator('.tab:has-text("Scheme")'),
        this.page.locator('[role="tab"]:has-text("Scheme")')
      ];
      
      let clicked = false;
      for (const locator of schemeTabLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await locator.click();
            await this.page.waitForTimeout(2000);
            clicked = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!clicked) {
        throw new Error('Scheme tab not found with any locator strategy');
      }
    } catch (error) {
      throw new Error(`Failed to click Scheme tab: ${error.message}`);
    }
  }

  /**
   * Clicks the Add Scheme button to open the form.
   */
  async clickAddSchemeButton() {
    try {
      await this.addSchemeButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addSchemeButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.addSchemeButton.click();
      
      // Wait for form to appear
      await this.schemeNameField.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Add Scheme button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add Scheme form is open.
   * @returns {Promise<boolean>}
   */
  async isAddSchemeFormOpen() {
    try {
      const isFormVisible = await this.addSchemeForm.isVisible({ timeout: 5000 }).catch(() => false);
      if (isFormVisible) {
        const isSchemeNameFieldVisible = await this.schemeNameField.isVisible({ timeout: 3000 }).catch(() => false);
        return isSchemeNameFieldVisible;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Fills the scheme name field.
   * @param {string} value - The scheme name.
   */
  async fillSchemeName(value) {
    try {
      await this.schemeNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.schemeNameField.scrollIntoViewIfNeeded();
      await this.schemeNameField.clear();
      await this.schemeNameField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill scheme name: ${error.message}`);
    }
  }

  /**
   * Clicks the Select Partners dropdown and opens it.
   */
  async clickSelectPartnersDropdown() {
    try {
      await this.selectPartnersDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectPartnersDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.selectPartnersDropdown.click();
      
      // Wait for dropdown menu to appear
      await this.page.waitForTimeout(1000);
      await this.selectPartnersDropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Select Partners dropdown: ${error.message}`);
    }
  }

  /**
   * Selects "Select All" option in the Partners dropdown.
   */
  async selectAllPartners() {
    try {
      await this.clickSelectPartnersDropdown();
      await this.page.waitForTimeout(1000);
      
      // Try multiple locator strategies for Select All checkbox
      const selectAllCheckboxLocators = [
        this.page.locator('.customerList:has-text("Select All") input[type="checkbox"]'),
        this.page.locator('.customerList:has(label:has-text("Select All")) input[type="checkbox"]'),
        this.page.locator('label:has-text("Select All") ~ input[type="checkbox"]'),
        this.page.locator('label:has-text("Select All") + input[type="checkbox"]'),
        this.page.locator('.customerList input[type="checkbox"].me-2').first()
      ];
      
      let checkboxFound = false;
      let checkboxLocator = null;
      
      for (const locator of selectAllCheckboxLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            checkboxLocator = locator;
            checkboxFound = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!checkboxFound || !checkboxLocator) {
        throw new Error('Select All checkbox not found in Partners dropdown');
      }
      
      // Check if checkbox is already checked
      const isChecked = await checkboxLocator.isChecked().catch(() => false);
      
      if (!isChecked) {
        // Click the checkbox directly
        await checkboxLocator.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await checkboxLocator.click();
        await this.page.waitForTimeout(500);
        
        // Verify it's checked
        const isNowChecked = await checkboxLocator.isChecked().catch(() => false);
        if (!isNowChecked) {
          // If direct click didn't work, try clicking the label
          const labelLocator = this.page.locator('.customerList:has-text("Select All") label, label:has-text("Select All")').first();
          const isLabelVisible = await labelLocator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isLabelVisible) {
            await labelLocator.click();
            await this.page.waitForTimeout(500);
          }
        }
      }
      
      // Click outside to close Bootstrap dropdown
      await this.page.click('body', { position: { x: 0, y: 0 } });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select all partners: ${error.message}`);
    }
  }

  /**
   * Clicks the Select Plans dropdown for Scheme and opens it.
   */
  async clickSelectPlansDropdownScheme() {
    try {
      await this.selectPlansDropdownScheme.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectPlansDropdownScheme.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.selectPlansDropdownScheme.click();
      
      // Wait for dropdown menu to appear
      await this.page.waitForTimeout(1000);
      await this.selectPlansDropdownMenuScheme.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Select Plans dropdown: ${error.message}`);
    }
  }

  /**
   * Selects "Select All" option in the Plans dropdown for Scheme.
   */
  async selectAllPlansScheme() {
    try {
      await this.clickSelectPlansDropdownScheme();
      await this.page.waitForTimeout(1000);
      
      // Try multiple locator strategies for Select All checkbox
      // HTML structure: <div class="search customerList pt-3 pb-2"><input type="checkbox" class="me-2"><label>Select All</label></div>
      const selectAllCheckboxLocators = [
        this.page.locator('.search.customerList input[type="checkbox"]'),
        this.page.locator('.customerList:has-text("Select All") input[type="checkbox"]'),
        this.page.locator('.customerList:has(label:has-text("Select All")) input[type="checkbox"]'),
        this.page.locator('label:has-text("Select All") ~ input[type="checkbox"]'),
        this.page.locator('label:has-text("Select All") + input[type="checkbox"]'),
        this.page.locator('.customerList input[type="checkbox"].me-2').first(),
        this.page.locator('div.search.customerList input[type="checkbox"].me-2')
      ];
      
      let checkboxFound = false;
      let checkboxLocator = null;
      
      for (const locator of selectAllCheckboxLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            checkboxLocator = locator;
            checkboxFound = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!checkboxFound || !checkboxLocator) {
        throw new Error('Select All checkbox not found in Plans dropdown');
      }
      
      // Check if checkbox is already checked
      const isChecked = await checkboxLocator.isChecked().catch(() => false);
      
      if (!isChecked) {
        // Click the checkbox directly
        await checkboxLocator.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await checkboxLocator.click();
        await this.page.waitForTimeout(500);
        
        // Verify it's checked
        const isNowChecked = await checkboxLocator.isChecked().catch(() => false);
        if (!isNowChecked) {
          // If direct click didn't work, try clicking the label
          const labelLocators = [
            this.page.locator('.search.customerList label:has-text("Select All")'),
            this.page.locator('.customerList:has-text("Select All") label'),
            this.page.locator('label:has-text("Select All")')
          ];
          
          for (const labelLocator of labelLocators) {
            try {
              const isLabelVisible = await labelLocator.isVisible({ timeout: 3000 }).catch(() => false);
              if (isLabelVisible) {
                await labelLocator.click();
                await this.page.waitForTimeout(500);
                break;
              }
            } catch {
              continue;
            }
          }
        }
      }
      
      // Click outside to close Bootstrap dropdown
      await this.page.click('body', { position: { x: 0, y: 0 } });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select all plans: ${error.message}`);
    }
  }

  /**
   * Selects scheme type radio button.
   * @param {string} type - The scheme type: "non-recurring" or "recurring".
   */
  async selectSchemeType(type) {
    try {
      const typeLower = type.toLowerCase();
      let radioButton;
      
      if (typeLower === 'non-recurring' || typeLower === 'nonrecurring') {
        radioButton = this.schemeTypeNonRecurringRadio;
      } else if (typeLower === 'recurring') {
        radioButton = this.schemeTypeRecurringRadio;
      } else {
        throw new Error(`Invalid scheme type: ${type}`);
      }
      
      await radioButton.waitFor({ state: 'visible', timeout: 10000 });
      await radioButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await radioButton.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select scheme type ${type}: ${error.message}`);
    }
  }

  /**
   * Fills the start date field.
   * @param {string} date - The date in format YYYY-MM-DD.
   */
  async fillStartDate(date) {
    try {
      await this.startDateField.waitFor({ state: 'visible', timeout: 10000 });
      await this.startDateField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.startDateField.clear();
      await this.startDateField.fill(date);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill start date: ${error.message}`);
    }
  }

  /**
   * Fills the end date field.
   * @param {string} date - The date in format YYYY-MM-DD.
   */
  async fillEndDate(date) {
    try {
      await this.endDateField.waitFor({ state: 'visible', timeout: 10000 });
      await this.endDateField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.endDateField.clear();
      await this.endDateField.fill(date);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill end date: ${error.message}`);
    }
  }

  /**
   * Fills the reward trigger "No. of Users" field.
   * @param {string} value - The number of users.
   */
  async fillRewardTriggerNoOfUsers(value) {
    try {
      await this.rewardTriggerNoOfUsersField.waitFor({ state: 'visible', timeout: 10000 });
      await this.rewardTriggerNoOfUsersField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.rewardTriggerNoOfUsersField.clear();
      await this.rewardTriggerNoOfUsersField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill reward trigger no. of users: ${error.message}`);
    }
  }

  /**
   * Fills the reward trigger "Reward Value" field.
   * @param {string} value - The reward value.
   */
  async fillRewardTriggerValue(value) {
    try {
      await this.rewardTriggerValueField.waitFor({ state: 'visible', timeout: 10000 });
      await this.rewardTriggerValueField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.rewardTriggerValueField.clear();
      await this.rewardTriggerValueField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to fill reward trigger value: ${error.message}`);
    }
  }

  /**
   * Verifies if a scheme exists in the table by name.
   * @param {string} schemeName - The scheme name to search for.
   * @returns {Promise<boolean>}
   */
  async verifySchemeInTable(schemeName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(schemeName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  // ==================== EDIT SCHEME METHODS ====================

  /**
   * Clicks the edit icon for a scheme in the table by scheme name.
   * @param {string} schemeName - The name of the scheme to edit.
   */
  async clickEditIconForScheme(schemeName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(schemeName.toLowerCase())) {
          // Find edit icon in this row
          const editIconInRow = row.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has(i[class*="pencil"])').first();
          const isVisible = await editIconInRow.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await editIconInRow.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await editIconInRow.click();
            await this.page.waitForTimeout(2000);
            return;
          }
        }
      }
      
      throw new Error(`Scheme "${schemeName}" not found in table or edit icon not visible`);
    } catch (error) {
      throw new Error(`Failed to click edit icon for scheme: ${error.message}`);
    }
  }

  /**
   * Verifies if the Update Scheme form is open.
   * @returns {Promise<boolean>}
   */
  async isUpdateSchemeFormOpen() {
    try {
      const isFormVisible = await this.addSchemeForm.isVisible({ timeout: 5000 }).catch(() => false);
      if (isFormVisible) {
        // Check if scheme name field is visible and has a value (indicating it's an update form)
        const isSchemeNameFieldVisible = await this.schemeNameField.isVisible({ timeout: 3000 }).catch(() => false);
        if (isSchemeNameFieldVisible) {
          const fieldValue = await this.schemeNameField.inputValue().catch(() => '');
          // If form is visible and has a value, it's likely the update form
          return fieldValue.length > 0;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Updates the scheme name field.
   * @param {string} value - The new scheme name.
   */
  async updateSchemeName(value) {
    try {
      await this.schemeNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.schemeNameField.scrollIntoViewIfNeeded();
      await this.schemeNameField.clear();
      await this.schemeNameField.fill(value);
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to update scheme name: ${error.message}`);
    }
  }

  // ==================== DELETE SCHEME METHODS ====================

  /**
   * Clicks the delete icon for a scheme in the table by scheme name.
   * @param {string} schemeName - The name of the scheme to delete.
   */
  async clickDeleteIconForScheme(schemeName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(schemeName.toLowerCase())) {
          // Find delete icon in this row
          const deleteIconInRow = row.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"], td.mat-column-Action button:has(i[class*="trash"])').first();
          const isVisible = await deleteIconInRow.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await deleteIconInRow.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await deleteIconInRow.click();
            await this.page.waitForTimeout(2000);
            return;
          }
        }
      }
      
      throw new Error(`Scheme "${schemeName}" not found in table or delete icon not visible`);
    } catch (error) {
      throw new Error(`Failed to click delete icon for scheme: ${error.message}`);
    }
  }

  /**
   * Verifies if a scheme does NOT exist in the table by name.
   * @param {string} schemeName - The scheme name to check.
   * @returns {Promise<boolean>} Returns true if scheme is NOT found (deleted), false if still found.
   */
  async verifySchemeNotInTable(schemeName) {
    try {
      await this.page.waitForTimeout(2000);
      const rows = await this.allTableRows.all();
      
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && rowText.toLowerCase().includes(schemeName.toLowerCase())) {
          return false; // Scheme still found
        }
      }
      return true; // Scheme not found (deleted)
    } catch {
      return false;
    }
  }
}

module.exports = { CouponsSchemesPage };

