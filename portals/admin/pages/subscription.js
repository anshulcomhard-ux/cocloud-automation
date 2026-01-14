const { expect } = require('@playwright/test');

class SubscriptionPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar menu link to open Subscription page
    // HTML: <div class="nav-link sidebar-items" ng-reflect-router-link="/subscriptions">
    //       <i class="bi bi-sliders2-vertical me-3"></i>
    //       <span class="title">Subscription</span>
    //       </div>
    this.subscriptionMenuItem = page
      .locator(
        'div.nav-link.sidebar-items:has(span.title:has-text("Subscription")), div[ng-reflect-router-link="/subscriptions"], div[routerlinkactive]:has(span:has-text("Subscription"))'
      )
      .first();

    // Page heading: <div class="heading fs-5">All Subscriptions</div>
    this.pageHeading = page
      .locator('div.heading.fs-5:has-text("All Subscriptions"), div.heading:has-text("All Subscriptions"), div[class*="heading"]:has-text("All Subscriptions")')
      .first();

    // Total Subscriptions card
    // HTML: <div class="p-3 report-card w-100 d-flex flex-column">
    //       <div class="report-heading"><span class="report-heading">Total Subscriptions</span></div>
    //       <div class="sub text-center"><h5 class="text-white price-text">13056</h5><div class="sub-title text-white">Subscriptions</div></div>
    this.totalSubscriptionsCard = page
      .locator('div.report-card:has(span.report-heading:has-text("Total Subscriptions"))')
      .first();

    // New Paid Subscriptions card
    // HTML: <div class="p-3 report-card w-100 d-flex flex-column">
    //       <div class="report-heading"><span class="report-heading">New Paid Subscriptions</span>
    //       <select formcontrolname="timeInterval" class="select-dropdown">
    this.newPaidSubscriptionsCard = page
      .locator('div.report-card:has(span.report-heading:has-text("New Paid Subscriptions"))')
      .first();
    
    // Dropdown in New Paid Subscriptions card
    this.newPaidSubscriptionsDropdown = this.newPaidSubscriptionsCard
      .locator('select[formcontrolname="timeInterval"], select.select-dropdown')
      .first();

    // Pagination text: <span>Showing 1 to 20 of 13056 records</span>
    this.paginationText = page
      .locator('span:has-text("Showing"), span:has-text("records")')
      .filter({ hasText: /Showing.*records/ })
      .first();

    // No subscription found message
    this.noSubscriptionMessage = page
      .locator('text=There is no subscription found., :has-text("There is no subscription found")')
      .first();

    // Paid Subscription tab/card
    // HTML: <div class="text-center d-flex justify-content-center align-items-center section-card"> Paid Subscription </div>
    this.paidSubscriptionTab = page
      .locator('div.section-card:has-text("Paid Subscription"), div:has-text("Paid Subscription").section-card')
      .first();

    // Trial Subscription tab/card
    // HTML: <div class="text-center d-flex justify-content-center align-items-center section-card"> Trial Subscription </div>
    this.trialSubscriptionTab = page
      .locator('div.section-card:has-text("Trial Subscription"), div:has-text("Trial Subscription").section-card')
      .first();

    // Upcoming Renewal tab/card
    // HTML: <div class="text-center d-flex justify-content-center align-items-center section-card"> Upcoming Renewal </div>
    this.upcomingRenewalTab = page
      .locator('div.section-card:has-text("Upcoming Renewal"), div:has-text("Upcoming Renewal").section-card')
      .first();

    // Expired Subscription tab/card
    // HTML: <div class="text-center d-flex justify-content-center align-items-center section-card"> Expired Subscription </div>
    this.expiredSubscriptionTab = page
      .locator('div.section-card:has-text("Expired Subscription"), div:has-text("Expired Subscription").section-card')
      .first();

    // Export to Excel button
    // HTML: <button class="btn excel-btn">Export To Excel</button>
    this.exportToExcelButton = page
      .locator('button.btn.excel-btn:has-text("Export To Excel"), button:has-text("Export To Excel")')
      .first();

    // Serial No. Mismatch tab
    // HTML: <li class="activate"><a>Serial No. Mismatch </a></li>
    this.serialNoMismatchTab = page
      .locator('li:has(a:has-text("Serial No. Mismatch")), a:has-text("Serial No. Mismatch")')
      .first();

    // Checkbox in table row
    // HTML: <input type="checkbox" class="mdc-checkbox__native-control" id="mat-mdc-checkbox-21-input">
    this.tableCheckbox = page
      .locator('input[type="checkbox"].mdc-checkbox__native-control, input[type="checkbox"][id*="checkbox"]')
      .first();

    // Restrict deletion button (becomes visible after selecting checkbox)
    this.restrictDeletionButton = page
      .locator('button:has-text("Restrict Deletion"), button:has-text("restrict"), button:has-text("Restrict")')
      .first();

    // Sub ID column header
    // HTML: <th class="mat-mdc-header-cell"> Sub Id </th>
    this.subIdColumnHeader = page
      .locator('th:has-text("Sub Id"), th:has-text("Sub ID"), th.mat-column-Sub-Id')
      .first();

    // Sub ID cell with "(Restricted)" text
    // HTML: <td class="mat-mdc-cell">...<small class="text-muted"> (Restricted) </small></td>
    this.subIdCellWithRestricted = page
      .locator('td.mat-column-Sub-Id:has(small:has-text("Restricted")), td:has(small:has-text("(Restricted)"))')
      .first();

    // Toast message container
    this.toastContainer = page
      .locator('div[role="alert"], div.toast, div.toast-container, div[class*="toast"]')
      .first();

    // Search Here toggle/button
    // HTML: <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3">
    // Use same approach as instance.js
    this.searchHereToggle = page
      .locator('div.search-box div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"], div[data-bs-toggle="collapse"]:has(span:has-text("Search Here")), div.py-3:has-text("Search Here")')
      .first();

    // Search panel (collapsible)
    // HTML: <div id="collapseExample" class="collapse">
    // Use same approach as instance.js
    this.searchPanel = page
      .locator('#collapseExample.collapse, #collapseExample.collapse.show, .search-field-area, #collapseExample')
      .first();

    // Search button
    // HTML: <button type="submit" class="btn search-btn">Search</button>
    this.searchButton = page
      .locator('button.search-btn:has-text("Search"), button.btn.search-btn, button[type="submit"].search-btn')
      .first();

    // Reset button
    // HTML: <button type="button" class="btn reset-btn">Reset</button>
    this.resetButton = page
      .locator('button.reset-btn:has-text("Reset"), button.btn.reset-btn, button[type="button"].reset-btn')
      .first();

    // Date range inputs for Start Date
    // HTML: <input matstartdate="" placeholder="From" formcontrolname="startDate">
    this.startDateFromInput = page
      .locator('mat-form-field:has(mat-label:has-text("Start Date")) input[matstartdate][placeholder="From"], input[formcontrolname="startDate"][placeholder="From"]')
      .first();
    this.startDateToInput = page
      .locator('mat-form-field:has(mat-label:has-text("Start Date")) input[matenddate][placeholder="To"], input[formcontrolname="endDate"][placeholder="To"]')
      .first();

    // Date range inputs for Next Billing Date
    this.nextBillingDateFromInput = page
      .locator('mat-form-field:has(mat-label:has-text("Next Billing Date")) input[matstartdate][placeholder="From"], input[formcontrolname="startDate"][placeholder="From"]')
      .nth(1);
    this.nextBillingDateToInput = page
      .locator('mat-form-field:has(mat-label:has-text("Next Billing Date")) input[matenddate][placeholder="To"], input[formcontrolname="endDate"][placeholder="To"]')
      .nth(1);

    // Date range inputs for Last Billing Date
    this.lastBillingDateFromInput = page
      .locator('mat-form-field:has(mat-label:has-text("Last Billing Date")) input[matstartdate][placeholder="From"], input[formcontrolname="startDate"][placeholder="From"]')
      .nth(2);
    this.lastBillingDateToInput = page
      .locator('mat-form-field:has(mat-label:has-text("Last Billing Date")) input[matenddate][placeholder="To"], input[formcontrolname="endDate"][placeholder="To"]')
      .nth(2);

    // Company / Email Address input
    // HTML: <input id="userDetail" placeholder="Company / Email Address">
    this.companyEmailSearchField = page
      .locator('input#userDetail[placeholder="Company / Email Address"], input#userDetail, input[placeholder="Company / Email Address"]')
      .first();

    // Sub ID search field
    // HTML: <input id="subCode" placeholder="SubCode">
    this.subIdSearchField = page
      .locator('input#subCode[placeholder="SubCode"], input#subCode, input[placeholder="SubCode"]')
      .first();

    // Status dropdown
    // HTML: <mat-form-field> with <mat-label>Status</mat-label> and <mat-select>
    this.statusDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Status")) mat-select, mat-select[aria-labelledby*="Status"]')
      .first();
    this.statusOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /Active|Inactive|All/i });

    // Stage dropdown
    this.stageDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Stage")) mat-select, mat-select[aria-labelledby*="Stage"]')
      .first();
    this.stageOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /Live|Trial|Select All/i });
    this.stageSelectAllCheckbox = page
      .locator('div.cdk-overlay-pane mat-pseudo-checkbox, mat-pseudo-checkbox')
      .first();

    // Plan Name dropdown
    this.planNameDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Plan Name")) mat-select, mat-select[aria-labelledby*="Plan Name"]')
      .first();
    this.planNameOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /busy on cloud 7 days trial plan|Select All/i });
    this.planNameSelectAllCheckbox = page
      .locator('div.cdk-overlay-pane mat-pseudo-checkbox')
      .nth(1);

    // Partner dropdown
    this.partnerDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Partner")) mat-select, mat-select[aria-labelledby*="Partner"]')
      .first();
    this.partnerOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /Select All/i });
    this.partnerSelectAllCheckbox = page
      .locator('div.cdk-overlay-pane mat-pseudo-checkbox')
      .nth(2);

    // Account Manager dropdown
    this.accountManagerDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Account Manager")) mat-select, mat-select[aria-labelledby*="Account Manager"]')
      .first();
    this.accountManagerOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /Select All/i });
    this.accountManagerSelectAllCheckbox = page
      .locator('div.cdk-overlay-pane mat-pseudo-checkbox')
      .nth(3);

    // Activate dropdown
    this.activateDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Activate")) mat-select, mat-select[aria-labelledby*="Activate"]')
      .first();
    this.activateOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /Activate/i });

    // Scheduler dropdown
    this.schedulerDropdown = page
      .locator('mat-form-field:has(mat-label:has-text("Schedular")) mat-select, mat-select[aria-labelledby*="Schedular"]')
      .first();
    this.schedulerOptions = page
      .locator('div.cdk-overlay-pane mat-option, mat-option')
      .filter({ hasText: /Added/i });

    // Table column headers for data extraction
    this.partnerEmailColumnHeader = page
      .locator('th:has-text("Partner Email"), th.mat-column-Partner-Email')
      .first();
    this.subIdColumnHeaderForData = page
      .locator('th:has-text("Sub Id"), th.mat-column-Sub-Id')
      .first();
    this.startDateColumnHeader = page
      .locator('th:has-text("Start Date"), th.mat-column-Start-Date')
      .first();
    this.nextBillingDateColumnHeader = page
      .locator('th:has-text("Next Billing Date"), th.mat-column-Next-Billing-Date')
      .first();
    this.lastBillingDateColumnHeader = page
      .locator('th:has-text("Last Billing Date"), th.mat-column-Last-Billing-Date')
      .first();
    this.statusColumnHeader = page
      .locator('th:has-text("Status"), th.mat-column-Status')
      .first();
    this.stageColumnHeader = page
      .locator('th:has-text("Stage"), th.mat-column-Stage')
      .first();

    // Add New Subscription form locators
    // "New" button to open subscription form
    this.newSubscriptionButton = page
      .locator('button:has-text("New"), button:has-text("new"), a:has-text("New"), a:has-text("new"), button.btn-primary:has-text("New")')
      .first();

    // New Subscription form/modal
    this.newSubscriptionForm = page
      .locator('.modal.show, .modal:has-text("New Subscription"), .common-modal:has-text("Subscription"), form:has-text("Partner")')
      .first();

    // Partner dropdown in new subscription form
    // HTML: <app-select-search><div class="search-select" data-bs-toggle="dropdown"><span>Select Partner</span></div></app-select-search>
    this.newSubscriptionPartnerDropdown = page
      .locator('app-select-search div.search-select[data-bs-toggle="dropdown"]:has(span:has-text("Select Partner")), .modal.show app-select-search div.search-select:has(span:has-text("Select Partner")), .modal app-select-search div.search-select[data-bs-toggle="dropdown"]')
      .first();

    // Customer dropdown in new subscription form
    // HTML: <app-select-search><div class="search-select" data-bs-toggle="dropdown"><span>Select Customer</span></div></app-select-search>
    this.newSubscriptionCustomerDropdown = page
      .locator('app-select-search div.search-select[data-bs-toggle="dropdown"]:has(span:has-text("Select Customer")), .modal.show app-select-search div.search-select:has(span:has-text("Select Customer")), .modal app-select-search div.search-select[data-bs-toggle="dropdown"]')
      .nth(1); // Second dropdown (after Partner)

    // Product dropdown in new subscription form
    // HTML: <select id="productName" class="form-select input">
    this.newSubscriptionProductDropdown = page
      .locator('select#productName, select[ng-reflect-name="productName"], .modal.show select#productName, .modal select.form-select[id="productName"]')
      .first();

    // Plan Name dropdown in new subscription form
    // HTML: <select id="planCode" class="form-select input">
    this.newSubscriptionPlanNameDropdown = page
      .locator('select#planCode, select[ng-reflect-name="planCode"], .modal.show select#planCode, .modal select.form-select[id="planCode"]')
      .first();

    // Unit Price input field (auto-filled)
    this.newSubscriptionUnitPriceInput = page
      .locator('.modal.show input[formcontrolname*="unitPrice"], .modal input[formcontrolname*="unitPrice"], form input[formcontrolname*="unitPrice"], .modal.show input[placeholder*="Unit Price"], .modal input[placeholder*="Unit Price"]')
      .first();

    // Quantity input field (auto-filled)
    this.newSubscriptionQuantityInput = page
      .locator('.modal.show input[formcontrolname*="quantity"], .modal input[formcontrolname*="quantity"], form input[formcontrolname*="quantity"], .modal.show input[placeholder*="Quantity"], .modal input[placeholder*="Quantity"]')
      .first();

    // Description input field (auto-filled)
    this.newSubscriptionDescriptionInput = page
      .locator('.modal.show input[formcontrolname*="description"], .modal textarea[formcontrolname*="description"], .modal input[placeholder*="Description"], form textarea[formcontrolname*="description"]')
      .first();

    // Amount input field (auto-filled)
    this.newSubscriptionAmountInput = page
      .locator('.modal.show input[formcontrolname*="amount"], .modal input[formcontrolname*="amount"], form input[formcontrolname*="amount"], .modal.show input[placeholder*="Amount"], .modal input[placeholder*="Amount"]')
      .first();

    // RAM input field
    // HTML: <input id="ram" ng-reflect-name="ram" placeholder="Ram(GB)" type="number" ...>
    this.newSubscriptionRamInput = page
      .locator(
        'input#ram, ' +
        '.modal input#ram, ' +
        '.modal.show input#ram, ' +
        'input[ng-reflect-name="ram"], ' +
        'input[name="ram"], ' +
        '.modal input[placeholder*="Ram"], ' +
        '.modal.show input[placeholder*="Ram"], ' +
        '.modal input[placeholder*="RAM"], ' +
        '.modal input[formcontrolname*="ram"], ' +
        '.modal.show input[formcontrolname*="ram"], ' +
        'form input[formcontrolname*="ram"]'
      )
      .first();

    // CPU input field
    // HTML: <input id="cpu" ng-reflect-name="cpu" placeholder="CPU" type="number" ...>
    this.newSubscriptionCpuInput = page
      .locator(
        'input#cpu, ' +
        '.modal input#cpu, ' +
        '.modal.show input#cpu, ' +
        'input[ng-reflect-name="cpu"], ' +
        'input[name="cpu"], ' +
        '.modal input[placeholder*="CPU"], ' +
        '.modal.show input[placeholder*="CPU"], ' +
        '.modal input[placeholder*="cpu"], ' +
        '.modal input[formcontrolname*="cpu"], ' +
        '.modal.show input[formcontrolname*="cpu"], ' +
        'form input[formcontrolname*="cpu"]'
      )
      .first();

    // Storage input field
    // HTML: <input id="storage" ng-reflect-name="storage" placeholder="Storage(GB)" type="number" ...>
    this.newSubscriptionStorageInput = page
      .locator(
        'input#storage, ' +
        '.modal input#storage, ' +
        '.modal.show input#storage, ' +
        'input[ng-reflect-name="storage"], ' +
        'input[name="storage"], ' +
        '.modal input[placeholder*="Storage"], ' +
        '.modal.show input[placeholder*="Storage"], ' +
        '.modal input[placeholder*="storage"], ' +
        '.modal input[formcontrolname*="storage"], ' +
        '.modal.show input[formcontrolname*="storage"], ' +
        'form input[formcontrolname*="storage"]'
      )
      .first();

    // Next Renewal Date dropdown
    // HTML: <select id="endDate" ng-reflect-name="endDate" class="form-select">
    this.newSubscriptionNextRenewalDateDropdown = page
      .locator(
        'select#endDate, ' +
        'select[ng-reflect-name="endDate"], ' +
        'select[name="endDate"], ' +
        '.modal select#endDate, ' +
        '.modal.show select#endDate, ' +
        '.modal select[ng-reflect-name="endDate"], ' +
        'label:has-text("Next Renewal Date") + select, ' +
        'label:has-text("Select Next Renewal Date") + select, ' +
        'form select[ng-reflect-name="endDate"], ' +
        '.modal.show mat-form-field:has(mat-label:has-text("Next Renewal Date")) mat-select, ' +
        '.modal mat-form-field:has(mat-label:has-text("Next Renewal Date")) mat-select'
      )
      .first();

    // Reference ID input field
    // HTML: <input id="refrenceId" ng-reflect-name="refrenceId" placeholder="Reference Id" type="text" ...>
    // Note: HTML has typo "refrenceId" instead of "referenceId"
    this.newSubscriptionReferenceIdInput = page
      .locator(
        'input#refrenceId, ' +
        'input[ng-reflect-name="refrenceId"], ' +
        'input[name="refrenceId"], ' +
        '.modal input#refrenceId, ' +
        '.modal.show input#refrenceId, ' +
        '.modal input[ng-reflect-name="refrenceId"], ' +
        '.modal input[placeholder*="Reference"], ' +
        '.modal.show input[placeholder*="Reference"], ' +
        '.modal input[formcontrolname*="refrenceId"], ' +
        '.modal.show input[formcontrolname*="referenceId"], ' +
        '.modal input[formcontrolname*="reference"], ' +
        'form input[formcontrolname*="referenceId"], ' +
        'form input[formcontrolname*="refrenceId"]'
      )
      .first();

    // Salesperson dropdown
    // HTML: <select id="salesmanId" ng-reflect-name="salesmanId" class="form-select">
    this.newSubscriptionSalespersonDropdown = page
      .locator(
        'select#salesmanId, ' +
        'select[ng-reflect-name="salesmanId"], ' +
        'select[name="salesmanId"], ' +
        '.modal select#salesmanId, ' +
        '.modal.show select#salesmanId, ' +
        '.modal select[ng-reflect-name="salesmanId"], ' +
        'label:has-text("Sales Person") + select, ' +
        'label:has-text("Select Salesperson") + select, ' +
        'label:has-text("Select sales person") + select, ' +
        'form select[ng-reflect-name="salesmanId"], ' +
        '.modal.show mat-form-field:has(mat-label:has-text("Select Salesperson")) mat-select, ' +
        '.modal mat-form-field:has(mat-label:has-text("Salesperson")) mat-select'
      )
      .first();

    // Submit button in new subscription form
    this.newSubscriptionSubmitButton = page
      .locator('.modal.show button:has-text("Submit"), .modal button:has-text("Submit"), form button[type="submit"], button.btn-primary:has-text("Submit")')
      .first();

    // ==================== Plan Details Page Locators ====================
    
    // Plan details page heading (plan name)
    // HTML: <div class="details-heading fs-3">Tally On Cloud - Quarterly</div>
    this.planDetailsHeading = page
      .locator('div.details-heading.fs-3, div.details-heading')
      .first();

    // Sub ID in plan details page
    // HTML: <div class="subId">#SUB-P013150</div>
    this.planDetailsSubId = page
      .locator('div.subId, div:has-text("#SUB-")')
      .first();

    // Plan status in plan details page
    // HTML: <div class="status ms-3 success"> Live</div>
    this.planDetailsStatus = page
      .locator('div.status.success, div.status:has-text("Live"), div.status.ms-3')
      .first();

    // Show File Manager section
    // HTML: <div class="d-flex flex-row justify-content-between my-2">
    //       <div class="sub-option-heading">Show File Manager</div>
    //       <div class="sub-option-heading"> Yes <button class="modal-btn">Update</button></div>
    //       </div>
    this.showFileManagerSection = page
      .locator('div.sub-option-heading:has-text("Show File Manager")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]')
      .first();

    // Show File Manager value (Yes/No) - the second div.sub-option-heading in the same parent
    this.showFileManagerValue = page
      .locator('div.sub-option-heading:has-text("Show File Manager")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]/div[contains(@class, "sub-option-heading")][2]')
      .first();

    // Show File Manager Update button
    this.showFileManagerUpdateButton = page
      .locator('div.sub-option-heading:has-text("Show File Manager")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]//button[contains(@class, "modal-btn")]')
      .first();

    // Show File Manager modal - any visible modal
    this.showFileManagerModal = page
      .locator('.modal.show, .modal[class*="show"], .modal[style*="display: block"]')
      .first();

    // Yes button in Show File Manager modal
    this.showFileManagerYesButton = page
      .locator('.modal.show button:has-text("Yes"), .modal button:has-text("Yes")')
      .first();

    // No button in Show File Manager modal
    this.showFileManagerNoButton = page
      .locator('.modal.show button:has-text("No"), .modal button:has-text("No")')
      .first();

    // Skip Google Drive section
    // HTML: <div class="d-flex flex-row justify-content-between my-2">
    //       <div class="sub-option-heading">Skip Google Drive</div>
    //       <div class="sub-option-heading"> No <button class="modal-btn">Update</button></div>
    //       </div>
    this.skipGoogleDriveSection = page
      .locator('div.sub-option-heading:has-text("Skip Google Drive")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]')
      .first();

    // Skip Google Drive value (Yes/No) - the second div.sub-option-heading in the same parent
    this.skipGoogleDriveValue = page
      .locator('div.sub-option-heading:has-text("Skip Google Drive")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]/div[contains(@class, "sub-option-heading")][2]')
      .first();

    // Skip Google Drive Update button
    this.skipGoogleDriveUpdateButton = page
      .locator('div.sub-option-heading:has-text("Skip Google Drive")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]//button[contains(@class, "modal-btn")]')
      .first();
  }

  /**
   * Clicks the Subscription menu item in the sidebar
   * @returns {Promise<void>}
   */
  async clickSubscriptionMenuItem() {
    await this.subscriptionMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.subscriptionMenuItem.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for navigation
  }

  /**
   * Navigate via sidebar to Subscription page. Falls back to direct navigation if click fails.
   * @param {string} baseUrl
   */
  async gotoSubscription(baseUrl) {
    const targetUrl = baseUrl.replace(/\/login\/?$/, '') + '/subscriptions';
    try {
      await this.clickSubscriptionMenuItem();
    } catch (err) {
      // Fallback: direct navigation
      await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Checks if Subscription page heading is visible.
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      // Wait for the page heading to be visible
      const isVisible = await this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
      if (!isVisible) {
        // Try waiting a bit more for client-side rendering
        await this.page.waitForTimeout(2000);
        return await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Retrieves the Subscription page heading text.
   * @returns {Promise<string>}
   */
  async getPageHeading() {
    const headingText = await this.pageHeading.textContent();
    return headingText ? headingText.trim() : '';
  }

  /**
   * Gets the Subscriptions count from the Total Subscriptions card.
   * @returns {Promise<number>}
   */
  async getSubscriptionsCountFromCard() {
    try {
      await this.totalSubscriptionsCard.waitFor({ state: 'visible', timeout: 15000 });
      
      // Find the subscriptions value: <h5 class="text-white price-text">13056</h5> with <div class="sub-title text-white">Subscriptions</div>
      const subscriptionsValue = this.totalSubscriptionsCard
        .locator('div.sub:has(div.sub-title:has-text("Subscriptions"))')
        .locator('h5.price-text')
        .first();

      const isVisible = await subscriptionsValue.isVisible({ timeout: 5000 }).catch(() => false);
      if (!isVisible) {
        return 0;
      }

      const text = await subscriptionsValue.textContent();
      if (!text) {
        return 0;
      }

      // Remove commas and parse to number
      const count = parseInt(text.trim().replace(/,/g, ''), 10);
      return isNaN(count) ? 0 : count;
    } catch (error) {
      console.log(`Error getting subscriptions count from card: ${error.message}`);
      return 0;
    }
  }

  /**
   * Gets the total number of records from pagination text.
   * Extracts number from text like "Showing 1 to 20 of 13056 records"
   * @returns {Promise<number>}
   */
  async getTotalRecordsFromPagination() {
    try {
      const isVisible = await this.paginationText.isVisible({ timeout: 10000 }).catch(() => false);
      if (!isVisible) {
        // Check if no subscription message is shown
        const noSubVisible = await this.noSubscriptionMessage.isVisible({ timeout: 3000 }).catch(() => false);
        if (noSubVisible) {
          return 0;
        }
        return 0;
      }

      const text = await this.paginationText.textContent();
      if (!text) {
        return 0;
      }

      // Extract number after "of" and before "records"
      // Pattern: "Showing 1 to 20 of 13056 records"
      const match = text.match(/of\s+([\d,]+)\s+records/i);
      if (match && match[1]) {
        const count = parseInt(match[1].replace(/,/g, ''), 10);
        return isNaN(count) ? 0 : count;
      }

      return 0;
    } catch (error) {
      console.log(`Error getting total records from pagination: ${error.message}`);
      // Check if no subscription message is shown
      const noSubVisible = await this.noSubscriptionMessage.isVisible({ timeout: 3000 }).catch(() => false);
      if (noSubVisible) {
        return 0;
      }
      return 0;
    }
  }

  /**
   * Checks if "There is no subscription found." message is visible.
   * @returns {Promise<boolean>}
   */
  async isNoSubscriptionMessageVisible() {
    return await this.noSubscriptionMessage.isVisible({ timeout: 5000 }).catch(() => false);
  }

  /**
   * Clicks the "Paid Subscription" tab/card.
   * @returns {Promise<void>}
   */
  async clickPaidSubscriptionTab() {
    await this.paidSubscriptionTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.paidSubscriptionTab.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for data to load
  }

  /**
   * Clicks the "Trial Subscription" tab/card.
   * @returns {Promise<void>}
   */
  async clickTrialSubscriptionTab() {
    await this.trialSubscriptionTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.trialSubscriptionTab.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for data to load
  }

  /**
   * Clicks the "Upcoming Renewal" tab/card.
   * @returns {Promise<void>}
   */
  async clickUpcomingRenewalTab() {
    await this.upcomingRenewalTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.upcomingRenewalTab.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for data to load
  }

  /**
   * Clicks the "Expired Subscription" tab/card.
   * @returns {Promise<void>}
   */
  async clickExpiredSubscriptionTab() {
    await this.expiredSubscriptionTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.expiredSubscriptionTab.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for data to load
  }

  /**
   * Clicks the "Serial No. Mismatch" tab.
   * @returns {Promise<void>}
   */
  async clickSerialNoMismatchTab() {
    await this.serialNoMismatchTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.serialNoMismatchTab.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for data to load
  }

  /**
   * Checks if Export To Excel button is visible.
   * @returns {Promise<boolean>}
   */
  async isExportToExcelButtonVisible() {
    return this.exportToExcelButton.isVisible({ timeout: 5000 }).catch(() => false);
  }

  /**
   * Checks if Export To Excel button is clickable (enabled).
   * @returns {Promise<boolean>}
   */
  async isExportToExcelButtonClickable() {
    try {
      const isVisible = await this.exportToExcelButton.isVisible({ timeout: 5000 });
      if (!isVisible) {
        return false;
      }
      const isEnabled = await this.exportToExcelButton.isEnabled();
      return isEnabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Export To Excel button.
   * @returns {Promise<void>}
   */
  async clickExportToExcel() {
    await this.exportToExcelButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.exportToExcelButton.click({ timeout: 5000 });
  }

  /**
   * Gets the selected value from the New Paid Subscriptions dropdown.
   * @returns {Promise<string>} The selected value (week, month, or year)
   */
  async getSelectedNewPaidSubscriptionsDropdownValue() {
    try {
      await this.newPaidSubscriptionsDropdown.waitFor({ state: 'visible', timeout: 10000 });
      const selectedValue = await this.newPaidSubscriptionsDropdown.inputValue();
      return selectedValue;
    } catch (error) {
      console.log(`Error getting selected dropdown value: ${error.message}`);
      return '';
    }
  }

  /**
   * Selects an option from the New Paid Subscriptions dropdown.
   * @param {string} value - The value to select ('week', 'month', or 'year')
   * @returns {Promise<void>}
   */
  async selectNewPaidSubscriptionsDropdownOption(value) {
    await this.newPaidSubscriptionsDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.newPaidSubscriptionsDropdown.selectOption(value);
    await this.page.waitForTimeout(1000); // Wait for selection to apply
  }

  /**
   * Checks if error toast is visible.
   * @returns {Promise<boolean>}
   */
  async isErrorToastVisible() {
    try {
      // Common error toast selectors
      const errorToast = this.page.locator(
        'div[role="alert"]:has-text("error"), ' +
        'div.toast-error, ' +
        'div.error-toast, ' +
        'div:has-text("Error"), ' +
        'div:has-text("error")'
      ).first();
      return await errorToast.isVisible({ timeout: 3000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects a checkbox in the table (first available checkbox).
   * @returns {Promise<void>}
   */
  async selectTableCheckbox() {
    await this.tableCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await this.tableCheckbox.check({ timeout: 5000 });
    await this.page.waitForTimeout(1000); // Wait for selection to apply
  }

  /**
   * Checks if Restrict Deletion button is visible.
   * @returns {Promise<boolean>}
   */
  async isRestrictDeletionButtonVisible() {
    return await this.restrictDeletionButton.isVisible({ timeout: 5000 }).catch(() => false);
  }

  /**
   * Clicks the Restrict Deletion button.
   * @returns {Promise<void>}
   */
  async clickRestrictDeletionButton() {
    await this.restrictDeletionButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.restrictDeletionButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for action to complete
  }

  /**
   * Gets toast message text (if visible).
   * @returns {Promise<string>}
   */
  async getToastText(timeout = 3000) {
    try {
      const isVisible = await this.toastContainer.isVisible({ timeout }).catch(() => false);
      if (isVisible) {
        const text = await this.toastContainer.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if Sub ID shows "(Restricted)" text for the selected row.
   * @returns {Promise<boolean>}
   */
  async isSubIdRestricted() {
    try {
      const isVisible = await this.subIdCellWithRestricted.isVisible({ timeout: 5000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the Sub ID text with "(Restricted)" status.
   * @returns {Promise<string>}
   */
  async getSubIdWithRestrictedText() {
    try {
      const isVisible = await this.subIdCellWithRestricted.isVisible({ timeout: 5000 }).catch(() => false);
      if (isVisible) {
        const text = await this.subIdCellWithRestricted.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Clicks "Search Here" to open the search panel.
   * Uses same approach as instance.js
   * @returns {Promise<void>}
   */
  async clickSearchHere() {
    try {
      // Check if form is already open
      const isFormVisible = await this.searchPanel.isVisible({ timeout: 1000 }).catch(() => false);
      if (isFormVisible) {
        return; // Already open
      }
      
      await this.searchHereToggle.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchHereToggle.scrollIntoViewIfNeeded();
      await this.searchHereToggle.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for form to be visible
      await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
      throw new Error(`Failed to click Search Here: ${error.message}`);
    }
  }

  /**
   * Checks if search panel is open/visible.
   * Uses same approach as instance.js
   * @returns {Promise<boolean>}
   */
  async isSearchPanelOpen() {
    try {
      // Check if form is visible
      return await this.searchPanel.isVisible({ timeout: 3000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }

  /**
   * Closes any open dropdown overlays.
   * @returns {Promise<void>}
   */
  async closeOpenOverlays() {
    try {
      // Check if any overlay backdrop is visible
      const backdrop = this.page.locator('div.cdk-overlay-backdrop.cdk-overlay-backdrop-showing').first();
      const isVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (isVisible) {
        // Try pressing Escape first
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
        
        // Check if still visible
        const stillVisible = await backdrop.isVisible({ timeout: 500 }).catch(() => false);
        if (stillVisible) {
          // Click directly on the backdrop to close it
          await backdrop.click({ force: true });
          await this.page.waitForTimeout(500);
        }
        
        // Final check - if still visible, try clicking outside
        const finalCheck = await backdrop.isVisible({ timeout: 500 }).catch(() => false);
        if (finalCheck) {
          // Click on search panel area to dismiss
          await this.searchPanel.click({ force: true, position: { x: 10, y: 10 } });
          await this.page.waitForTimeout(500);
        }
      }
    } catch (error) {
      // Ignore errors, overlay might already be closed
      // Try one more time with Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Clicks the Search button.
   * Closes any open overlays first to prevent interception.
   * @returns {Promise<void>}
   */
  async clickSearchButton() {
    // Close any open overlays first
    await this.closeOpenOverlays();
    
    await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for search results
  }

  /**
   * Checks if data table has any rows visible.
   * @returns {Promise<boolean>}
   */
  async hasTableData() {
    try {
      // Check for table rows (excluding header)
      const tableRows = this.page.locator('table tbody tr, table tr:not(thead tr), mat-table mat-row');
      const count = await tableRows.count();
      return count > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies table data or empty message is shown.
   * @returns {Promise<{hasData: boolean, isEmpty: boolean}>}
   */
  async verifyTableDataOrEmpty() {
    const hasData = await this.hasTableData();
    const isEmpty = await this.isNoSubscriptionMessageVisible();
    return { hasData, isEmpty };
  }

  /**
   * Clicks the Reset button.
   * @returns {Promise<void>}
   */
  async clickResetButton() {
    await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.resetButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(1000); // Wait for form to clear
  }

  /**
   * Enters start date range.
   * @param {string} fromDate - Start date (format: MM/DD/YYYY)
   * @param {string} toDate - End date (format: MM/DD/YYYY)
   * @returns {Promise<void>}
   */
  async enterStartDate(fromDate, toDate) {
    // Fill the "From" date input
    await this.startDateFromInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.startDateFromInput.click();
    await this.startDateFromInput.fill(fromDate);
    await this.page.waitForTimeout(500);
    
    // Fill the "To" date input
    await this.startDateToInput.click();
    await this.startDateToInput.fill(toDate);
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters next billing date range.
   * @param {string} fromDate - Start date (format: MM/DD/YYYY)
   * @param {string} toDate - End date (format: MM/DD/YYYY)
   * @returns {Promise<void>}
   */
  async enterNextBillingDate(fromDate, toDate) {
    // Fill the "From" date input
    await this.nextBillingDateFromInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.nextBillingDateFromInput.click();
    await this.nextBillingDateFromInput.fill(fromDate);
    await this.page.waitForTimeout(500);
    
    // Fill the "To" date input
    await this.nextBillingDateToInput.click();
    await this.nextBillingDateToInput.fill(toDate);
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters last billing date range.
   * @param {string} fromDate - Start date (format: MM/DD/YYYY)
   * @param {string} toDate - End date (format: MM/DD/YYYY)
   * @returns {Promise<void>}
   */
  async enterLastBillingDate(fromDate, toDate) {
    // Fill the "From" date input
    await this.lastBillingDateFromInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.lastBillingDateFromInput.click();
    await this.lastBillingDateFromInput.fill(fromDate);
    await this.page.waitForTimeout(500);
    
    // Fill the "To" date input
    await this.lastBillingDateToInput.click();
    await this.lastBillingDateToInput.fill(toDate);
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters company/email address in search field.
   * @param {string} email - Email address or company name
   * @returns {Promise<void>}
   */
  async enterCompanyEmailSearch(email) {
    await this.companyEmailSearchField.waitFor({ state: 'visible', timeout: 10000 });
    await this.companyEmailSearchField.fill(email);
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters Sub ID in search field.
   * @param {string} subId - Sub ID
   * @returns {Promise<void>}
   */
  async enterSubIdSearch(subId) {
    await this.subIdSearchField.waitFor({ state: 'visible', timeout: 10000 });
    await this.subIdSearchField.fill(subId);
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects status from dropdown.
   * @param {string} status - Status value (e.g., "Active")
   * @returns {Promise<void>}
   */
  async selectStatus(status) {
    await this.statusDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.statusDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    const option = overlayPanel.locator(`mat-option:has-text("${status}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Unselects all currently selected stages in the stage dropdown.
   * Uses the same approach as Partner Portal.
   * @returns {Promise<void>}
   */
  async unselectAllStages() {
    try {
      await this.stageDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.stageDropdown.scrollIntoViewIfNeeded();
      
      // Click to open the select (always open it fresh)
      await this.stageDropdown.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for panel to appear - use the overlay panel locator
      const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
      await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Get all stage options (excluding "Select All" for now)
      const allStageOptions = overlayPanel.locator('mat-option');
      const stageOptionsCount = Math.min(await allStageOptions.count(), 20);
      
      // First, find all selected stage options (excluding "Select All")
      const selectedOptions = [];
      
      for (let i = 0; i < stageOptionsCount; i++) {
        try {
          const option = allStageOptions.nth(i);
          const optionText = await option.textContent({ timeout: 1000 }).catch(() => '');
          
          // Skip "Select All" option - we'll manually unselect each stage instead
          if (optionText && optionText.toLowerCase().includes('select all')) {
            continue;
          }
          
          const isSelected = await option.evaluate(el => {
            return el.classList.contains('mat-selected') || 
                   el.getAttribute('aria-selected') === 'true' ||
                   el.querySelector('mat-pseudo-checkbox.mat-pseudo-checkbox-checked') !== null;
          }).catch(() => false);
          
          if (isSelected) {
            selectedOptions.push(option);
          }
        } catch (optionError) {
          // Continue with next option if this one fails
          continue;
        }
      }
      
      // Manually unselect each selected stage option
      // This is more reliable than clicking "Select All" which might have unpredictable behavior
      if (selectedOptions.length > 0) {
        console.log(`Unselecting ${selectedOptions.length} selected stage(s)...`);
        for (let idx = 0; idx < selectedOptions.length; idx++) {
          const option = selectedOptions[idx];
          try {
            // Get option text for logging
            const optionText = await option.textContent({ timeout: 1000 }).catch(() => '');
            
            // Try multiple click strategies for better reliability
            const checkbox = option.locator('mat-pseudo-checkbox').first();
            const checkboxExists = await checkbox.count().catch(() => 0);
            
            let unselected = false;
            if (checkboxExists > 0) {
              // Try clicking the checkbox first
              try {
                await checkbox.scrollIntoViewIfNeeded();
                await checkbox.click({ timeout: 2000, force: true });
                await this.page.waitForTimeout(300);
                
                // Verify it's unselected
                const isStillSelected = await option.evaluate(el => {
                  return el.classList.contains('mat-selected') || 
                         el.getAttribute('aria-selected') === 'true' ||
                         el.querySelector('mat-pseudo-checkbox.mat-pseudo-checkbox-checked') !== null;
                }).catch(() => false);
                
                if (!isStillSelected) {
                  unselected = true;
                  console.log(`✓ Unselected stage: ${optionText?.trim() || `Option ${idx + 1}`}`);
                } else {
                  console.log(`⚠ Stage still selected after checkbox click: ${optionText?.trim() || `Option ${idx + 1}`}, trying option click...`);
                }
              } catch (checkboxError) {
                console.log(`⚠ Checkbox click failed for: ${optionText?.trim() || `Option ${idx + 1}`}, trying option click...`);
              }
            }
            
            // If checkbox click didn't work or checkbox doesn't exist, click the option itself
            if (!unselected) {
              try {
                await option.scrollIntoViewIfNeeded();
                await option.click({ timeout: 2000, force: true });
                await this.page.waitForTimeout(300);
                
                // Verify it's unselected
                const isStillSelected = await option.evaluate(el => {
                  return el.classList.contains('mat-selected') || 
                         el.getAttribute('aria-selected') === 'true' ||
                         el.querySelector('mat-pseudo-checkbox.mat-pseudo-checkbox-checked') !== null;
                }).catch(() => false);
                
                if (!isStillSelected) {
                  unselected = true;
                  console.log(`✓ Unselected stage: ${optionText?.trim() || `Option ${idx + 1}`}`);
                } else {
                  // Try clicking again
                  console.log(`⚠ Stage still selected, trying second click: ${optionText?.trim() || `Option ${idx + 1}`}`);
                  await option.click({ timeout: 2000, force: true });
                  await this.page.waitForTimeout(300);
                  
                  // Check again
                  const isStillSelectedAfterSecond = await option.evaluate(el => {
                    return el.classList.contains('mat-selected') || 
                           el.getAttribute('aria-selected') === 'true' ||
                           el.querySelector('mat-pseudo-checkbox.mat-pseudo-checkbox-checked') !== null;
                  }).catch(() => false);
                  
                  if (!isStillSelectedAfterSecond) {
                    unselected = true;
                    console.log(`✓ Unselected stage on second attempt: ${optionText?.trim() || `Option ${idx + 1}`}`);
                  } else {
                    console.log(`✗ Failed to unselect stage: ${optionText?.trim() || `Option ${idx + 1}`}`);
                  }
                }
              } catch (optionError) {
                console.log(`✗ Error clicking option: ${optionText?.trim() || `Option ${idx + 1}`} - ${optionError.message}`);
              }
            }
          } catch (optionError) {
            console.log(`✗ Error processing option ${idx + 1}: ${optionError.message}`);
            // Continue with next option if this one fails
            continue;
          }
        }
        console.log(`✓ Completed unselection attempt for ${selectedOptions.length} stage(s)`);
      } else {
        console.log('✓ No stages selected, nothing to unselect');
      }
      
      // Close the dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error unselecting all stages:', error);
      // Try to close dropdown if it's still open
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch (e) {
        // Ignore
      }
      // Don't throw error, just log it - this is a helper method
    }
  }

  /**
   * Selects stage(s) from dropdown.
   * Uses the same approach as Partner Portal.
   * @param {string|string[]} stages - Stage value(s) (e.g., "Live" or ["Live", "Trial"])
   * @returns {Promise<void>}
   */
  async selectStages(stages) {
    const stageArray = Array.isArray(stages) ? stages : [stages];
    
    try {
      await this.stageDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.stageDropdown.scrollIntoViewIfNeeded();
      
      // Click to open the select (always open it fresh)
      await this.stageDropdown.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for panel to appear - use the overlay panel locator
      const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
      await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Select each stage (excluding "Select All")
      for (const stage of stageArray) {
        // Skip if trying to select "Select All"
        if (stage.toLowerCase().includes('select all')) {
          continue;
        }
        
        // Find the stage option (exclude "Select All" option)
        const allOptions = overlayPanel.locator('mat-option');
        const allOptionsCount = await allOptions.count();
        
        let stageOption = null;
        for (let i = 0; i < allOptionsCount; i++) {
          const option = allOptions.nth(i);
          const optionText = await option.textContent().catch(() => '');
          
          // Skip "Select All" option
          if (optionText && optionText.toLowerCase().includes('select all')) {
            continue;
          }
          
          // Check if this option matches the stage we want
          if (optionText && optionText.toLowerCase().includes(stage.toLowerCase())) {
            stageOption = option;
            break;
          }
        }
        
        if (stageOption) {
          // Check if already selected
          const isSelected = await stageOption.evaluate(el => {
            return el.classList.contains('mat-selected') || 
                   el.getAttribute('aria-selected') === 'true' ||
                   el.querySelector('mat-pseudo-checkbox.mat-pseudo-checkbox-checked') !== null;
          }).catch(() => false);
          
          // Only click if not already selected
          if (!isSelected) {
            await stageOption.click({ timeout: 2000 });
            await this.page.waitForTimeout(300);
          }
        } else {
          console.log(`⚠ Stage option "${stage}" not found`);
        }
      }
      
      // Close the dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting stages ${stageArray.join(', ')}:`, error);
      // Try to close dropdown if it's still open
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch (e) {
        // Ignore
      }
      throw error;
    }
  }

  /**
   * Selects stage from dropdown (with select all handling).
   * First unselects all, then selects "Select All" and the specific stage.
   * @param {string} stage - Stage value (e.g., "Live")
   * @returns {Promise<void>}
   * @deprecated Use unselectAllStages() and selectStages() instead
   */
  async selectStage(stage) {
    await this.unselectAllStages();
    await this.selectStages(stage);
  }

  /**
   * Selects plan name from dropdown.
   * @param {string} planName - Plan name (e.g., "busy on cloud 7 days trial plan")
   * @returns {Promise<void>}
   */
  async selectPlanName(planName) {
    await this.planNameDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.planNameDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    const option = overlayPanel.locator(`mat-option:has-text("${planName}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects "Select All" from Partner dropdown.
   * @returns {Promise<void>}
   */
  async selectPartner(partner = 'Select All') {
    await this.partnerDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.partnerDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    const option = overlayPanel.locator(`mat-option:has-text("${partner}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects "Select All" from Account Manager dropdown.
   * @returns {Promise<void>}
   */
  async selectAccountManager(accountManager = 'Select All') {
    await this.accountManagerDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.accountManagerDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    const option = overlayPanel.locator(`mat-option:has-text("${accountManager}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects from Activate dropdown.
   * @param {string} activate - Activate value (e.g., "Activate")
   * @returns {Promise<void>}
   */
  async selectActivate(activate) {
    await this.activateDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.activateDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    const option = overlayPanel.locator(`mat-option:has-text("${activate}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects from Scheduler dropdown.
   * @param {string} scheduler - Scheduler value (e.g., "Added")
   * @returns {Promise<void>}
   */
  async selectScheduler(scheduler) {
    await this.schedulerDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.schedulerDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
    const option = overlayPanel.locator(`mat-option:has-text("${scheduler}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  /**
   * Clears the search form by clicking reset.
   * @returns {Promise<void>}
   */
  async clearSearchForm() {
    await this.clickResetButton();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Gets data from a specific table column.
   * @param {string} columnName - Column name (e.g., "Partner Email", "Sub Id", "Start Date")
   * @returns {Promise<string[]>} Array of cell values
   */
  async getTableColumnData(columnName) {
    try {
      // Find the column index by header
      const headers = this.page.locator('th.mat-mdc-header-cell, th[role="columnheader"]');
      const headerCount = await headers.count();
      let columnIndex = -1;
      
      for (let i = 0; i < headerCount; i++) {
        const header = headers.nth(i);
        const text = await header.textContent();
        if (text && text.trim().toLowerCase().includes(columnName.toLowerCase())) {
          columnIndex = i;
          break;
        }
      }
      
      if (columnIndex === -1) {
        console.log(`Column "${columnName}" not found`);
        return [];
      }
      
      // Get all rows and extract data from the column
      const rows = this.page.locator('mat-table mat-row, table tbody tr');
      const rowCount = await rows.count();
      const columnData = [];
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const cells = row.locator('td, mat-cell');
        const cell = cells.nth(columnIndex);
        
        // For Sub Id column, try to get text from the link/span first
        if (columnName.toLowerCase().includes('sub id') || columnName.toLowerCase().includes('subid')) {
          const link = cell.locator('a span, a').first();
          const linkText = await link.textContent().catch(() => null);
          if (linkText && linkText.trim()) {
            columnData.push(linkText.trim());
            continue;
          }
        }
        
        // Otherwise, get all text from the cell
        const text = await cell.textContent();
        if (text) {
          columnData.push(text.trim());
        }
      }
      
      return columnData;
    } catch (error) {
      console.log(`Error getting column data for "${columnName}": ${error.message}`);
      return [];
    }
  }

  /**
   * Retrieves partner email, company name, and sub ID from table columns.
   * Cleans Sub IDs by removing "(Restricted)" or similar text.
   * @returns {Promise<{partnerEmails: string[], companyNames: string[], subIds: string[]}>}
   */
  async getPartnerEmailAndSubIdFromTable() {
    const partnerEmails = await this.getTableColumnData('Partner Email');
    const companyNames = await this.getTableColumnData('Company Name');
    let subIds = await this.getTableColumnData('Sub Id');
    
    // Clean Sub IDs: remove "(Restricted)" or similar text, keep only the Sub ID
    subIds = subIds.map(subId => {
      // Remove "(Restricted)" or "(restricted)" text
      let cleaned = subId.replace(/\s*\(Restricted\)/gi, '').trim();
      // If there's a newline or extra spaces, clean them
      cleaned = cleaned.split('\n')[0].trim();
      return cleaned;
    });
    
    return { partnerEmails, companyNames, subIds };
  }

  // ==================== ADD NEW SUBSCRIPTION METHODS ====================

  /**
   * Clicks the "New" button to open the new subscription form.
   * @returns {Promise<void>}
   */
  async clickNewSubscriptionButton() {
    await this.newSubscriptionButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.newSubscriptionButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(1000);
    
    // Wait for form to be visible
    await this.newSubscriptionForm.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  /**
   * Checks if the new subscription form is visible.
   * @returns {Promise<boolean>}
   */
  async isNewSubscriptionFormVisible() {
    return await this.newSubscriptionForm.isVisible({ timeout: 5000 }).catch(() => false);
  }

  /**
   * Selects partner from dropdown in new subscription form.
   * Uses the same approach as Partner Portal subscription test.
   * @param {string} partnerEmail - Partner email (e.g., "contact@comhard.co.in")
   * @returns {Promise<void>}
   */
  async selectNewSubscriptionPartner(partnerEmail) {
    // Find the dropdown button using app-select-search structure (same as Partner Portal)
    const partnerDropdownButton = this.page.locator('app-select-search div.search-select[data-bs-toggle="dropdown"]:has(span:has-text("Select Partner"))').first();
    await partnerDropdownButton.waitFor({ state: 'visible', timeout: 15000 });
    await partnerDropdownButton.scrollIntoViewIfNeeded();
    console.log('✓ Partner dropdown button found');
    
    // Check if dropdown is already open
    const ariaExpanded = await partnerDropdownButton.getAttribute('aria-expanded');
    if (ariaExpanded !== 'true') {
      await partnerDropdownButton.click();
      await this.page.waitForTimeout(1000);
      console.log('✓ Clicked Partner dropdown button');
    } else {
      console.log('✓ Partner dropdown is already open');
    }
    
    // Wait for dropdown menu to be visible (same structure as Partner Portal)
    const dropdownMenu = this.page.locator('app-select-search div.dropdown-menu.dropdown-list').first();
    await dropdownMenu.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✓ Partner dropdown menu is visible');
    
    // Find and fill the search input
    const searchInput = dropdownMenu.locator('input[placeholder="Search..."], input[aria-label="search"]').first();
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await searchInput.fill(partnerEmail);
    await this.page.waitForTimeout(1500); // Wait for search results to filter
    console.log(`✓ Entered search text: ${partnerEmail}`);
    
    // Find options in div.data-section li elements (same as Partner Portal)
    const dataSection = dropdownMenu.locator('div.data-section').first();
    const partnerOptions = dataSection.locator(`li:has-text("${partnerEmail}")`);
    await partnerOptions.first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Click the option
    const option = partnerOptions.first();
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await this.page.waitForTimeout(1000);
    console.log(`✓ Selected partner: ${partnerEmail}`);
  }

  /**
   * Selects customer from dropdown in new subscription form.
   * Uses the same approach as Partner Portal subscription test.
   * @param {string} customerEmail - Customer email (e.g., "ansh.comhard@gmail.com")
   * @returns {Promise<void>}
   */
  async selectNewSubscriptionCustomer(customerEmail) {
    // Find the dropdown button using app-select-search structure (same as Partner Portal)
    // Use nth(1) to get the second app-select-search (Customer, after Partner)
    const customerDropdownButton = this.page.locator('app-select-search div.search-select[data-bs-toggle="dropdown"]:has(span:has-text("Select Customer"))').first();
    await customerDropdownButton.waitFor({ state: 'visible', timeout: 15000 });
    await customerDropdownButton.scrollIntoViewIfNeeded();
    console.log('✓ Customer dropdown button found');
    
    // Check if dropdown is already open
    const ariaExpanded = await customerDropdownButton.getAttribute('aria-expanded');
    if (ariaExpanded !== 'true') {
      await customerDropdownButton.click();
      await this.page.waitForTimeout(1000);
      console.log('✓ Clicked Customer dropdown button');
    } else {
      console.log('✓ Customer dropdown is already open');
    }
    
    // Wait for dropdown menu to be visible (same structure as Partner Portal)
    // Find the second app-select-search dropdown menu (Customer)
    const dropdownMenus = this.page.locator('app-select-search div.dropdown-menu.dropdown-list');
    const dropdownMenu = dropdownMenus.nth(1); // Second dropdown menu (Customer, after Partner)
    await dropdownMenu.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✓ Customer dropdown menu is visible');
    
    // Find and fill the search input
    const searchInput = dropdownMenu.locator('input[placeholder="Search..."], input[aria-label="search"]').first();
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await searchInput.fill(customerEmail);
    await this.page.waitForTimeout(1500); // Wait for search results to filter
    console.log(`✓ Entered search text: ${customerEmail}`);
    
    // Find options in div.data-section li elements (same as Partner Portal)
    const dataSection = dropdownMenu.locator('div.data-section').first();
    const customerOptions = dataSection.locator(`li:has-text("${customerEmail}")`);
    await customerOptions.first().waitFor({ state: 'visible', timeout: 5000 });
    
    // Click the option
    const option = customerOptions.first();
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await this.page.waitForTimeout(1000);
    console.log(`✓ Selected customer: ${customerEmail}`);
  }

  /**
   * Selects product from dropdown in new subscription form.
   * Product dropdown is a standard HTML select element.
   * @param {string} product - Product name (e.g., "Application on Cloud")
   * @returns {Promise<void>}
   */
  async selectNewSubscriptionProduct(product) {
    // Product dropdown is a standard HTML select element with id="productName"
    await this.newSubscriptionProductDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await this.newSubscriptionProductDropdown.scrollIntoViewIfNeeded();
    console.log('✓ Product dropdown found');
    
    // Use selectOption to select the product by value or label
    await this.newSubscriptionProductDropdown.selectOption({ label: product });
    await this.page.waitForTimeout(1000);
    console.log(`✓ Selected product: ${product}`);
  }

  /**
   * Selects plan name from dropdown in new subscription form.
   * Plan Name dropdown is a standard HTML select element.
   * First clicks the dropdown, then waits for options and selects.
   * Handles case-insensitive matching and trims whitespace.
   * @param {string} planName - Plan name (e.g., "Tally on Cloud - Half Yearly")
   * @returns {Promise<void>}
   */
  async selectNewSubscriptionPlanName(planName) {
    // Plan Name dropdown is a standard HTML select element with id="planCode"
    await this.newSubscriptionPlanNameDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await this.newSubscriptionPlanNameDropdown.scrollIntoViewIfNeeded();
    console.log('✓ Plan Name dropdown found');
    
    // First click on the dropdown to open it
    await this.newSubscriptionPlanNameDropdown.click();
    await this.page.waitForTimeout(1000);
    console.log('✓ Clicked Plan Name dropdown');
    
    // Wait for options to be loaded (options are dynamically populated after product selection)
    // Wait for at least one option (other than the default "Select plan name") to appear
    let optionsLoaded = false;
    let matchingOption = null;
    const normalizedPlanName = planName.toLowerCase().trim();
    const maxRetries = 30; // Wait up to 15 seconds (30 * 500ms)
    
    for (let i = 0; i < maxRetries; i++) {
      const optionCount = await this.newSubscriptionPlanNameDropdown.locator('option').count();
      if (optionCount > 1) { // More than just the default "Select plan name" option
        // Get all options and find the one that matches (case-insensitive, trimmed)
        const allOptions = await this.newSubscriptionPlanNameDropdown.locator('option').all();
        for (const option of allOptions) {
          const optionText = await option.textContent();
          const normalizedOptionText = optionText ? optionText.toLowerCase().trim() : '';
          if (normalizedOptionText === normalizedPlanName) {
            matchingOption = option;
            optionsLoaded = true;
            break;
          }
        }
        if (optionsLoaded) break;
      }
      await this.page.waitForTimeout(500);
    }
    
    if (!optionsLoaded || !matchingOption) {
      // Log available options for debugging
      const allOptions = await this.newSubscriptionPlanNameDropdown.locator('option').allTextContents();
      console.log(`Available plan options: ${allOptions.join(', ')}`);
      throw new Error(`Plan option "${planName}" not found. Available options: ${allOptions.join(', ')}`);
    }
    
    // Get the value attribute of the matching option and select by value
    const optionValue = await matchingOption.getAttribute('value');
    if (optionValue) {
      await this.newSubscriptionPlanNameDropdown.selectOption({ value: optionValue });
    } else {
      // Fallback to selecting by label (normalized)
      await this.newSubscriptionPlanNameDropdown.selectOption({ label: planName });
    }
    
    await this.page.waitForTimeout(2000); // Wait for auto-fill fields to populate
    console.log(`✓ Selected plan name: ${planName}`);
  }

  /**
   * Verifies that auto-filled fields (unit price, quantity, description, amount) are populated after selecting plan.
   * @returns {Promise<{unitPrice: string, quantity: string, description: string, amount: string}>}
   */
  async getAutoFilledFields() {
    await this.page.waitForTimeout(1000); // Wait for auto-fill
    
    const unitPrice = await this.newSubscriptionUnitPriceInput.inputValue().catch(() => '');
    const quantity = await this.newSubscriptionQuantityInput.inputValue().catch(() => '');
    const description = await this.newSubscriptionDescriptionInput.inputValue().catch(() => '');
    const amount = await this.newSubscriptionAmountInput.inputValue().catch(() => '');
    
    return { unitPrice, quantity, description, amount };
  }

  /**
   * Enters RAM value in new subscription form.
   * @param {string} ram - RAM value
   * @returns {Promise<void>}
   */
  async enterNewSubscriptionRam(ram) {
    try {
      // Strategy 1: Try primary locator with id
      const ramById = this.page.locator('input#ram');
      const isByIdVisible = await ramById.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByIdVisible) {
        await ramById.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await ramById.fill(ram);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 2: Try with ng-reflect-name
      const ramByNgReflect = this.page.locator('input[ng-reflect-name="ram"]');
      const isByNgReflectVisible = await ramByNgReflect.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByNgReflectVisible) {
        await ramByNgReflect.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await ramByNgReflect.fill(ram);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 3: Try with placeholder
      const ramByPlaceholder = this.page.locator('input[placeholder*="Ram"], input[placeholder*="RAM"]');
      const isByPlaceholderVisible = await ramByPlaceholder.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByPlaceholderVisible) {
        await ramByPlaceholder.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await ramByPlaceholder.fill(ram);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 4: Use the original locator (with modal selectors)
    await this.newSubscriptionRamInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.newSubscriptionRamInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
    await this.newSubscriptionRamInput.fill(ram);
    await this.page.waitForTimeout(500);
    } catch (error) {
      // Final fallback: Try finding by type="number" with id or name containing ram
      const ramFallback = this.page.locator('input[type="number"][id="ram"], input[type="number"][name="ram"], input[type="number"][ng-reflect-name="ram"]').first();
      const isFallbackVisible = await ramFallback.isVisible({ timeout: 5000 }).catch(() => false);
      if (isFallbackVisible) {
        await ramFallback.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await ramFallback.fill(ram);
        await this.page.waitForTimeout(500);
      } else {
        throw new Error(`Failed to find RAM input field: ${error.message}`);
      }
    }
  }

  /**
   * Enters CPU value in new subscription form.
   * @param {string} cpu - CPU value
   * @returns {Promise<void>}
   */
  async enterNewSubscriptionCpu(cpu) {
    try {
      // Strategy 1: Try primary locator with id
      const cpuById = this.page.locator('input#cpu');
      const isByIdVisible = await cpuById.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByIdVisible) {
        await cpuById.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await cpuById.fill(cpu);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 2: Try with ng-reflect-name
      const cpuByNgReflect = this.page.locator('input[ng-reflect-name="cpu"]');
      const isByNgReflectVisible = await cpuByNgReflect.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByNgReflectVisible) {
        await cpuByNgReflect.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await cpuByNgReflect.fill(cpu);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 3: Try with placeholder
      const cpuByPlaceholder = this.page.locator('input[placeholder*="CPU"], input[placeholder*="cpu"]');
      const isByPlaceholderVisible = await cpuByPlaceholder.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByPlaceholderVisible) {
        await cpuByPlaceholder.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await cpuByPlaceholder.fill(cpu);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 4: Use the original locator (with modal selectors)
    await this.newSubscriptionCpuInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.newSubscriptionCpuInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
    await this.newSubscriptionCpuInput.fill(cpu);
    await this.page.waitForTimeout(500);
    } catch (error) {
      // Final fallback: Try finding by type="number" with id or name containing cpu
      const cpuFallback = this.page.locator('input[type="number"][id="cpu"], input[type="number"][name="cpu"], input[type="number"][ng-reflect-name="cpu"]').first();
      const isFallbackVisible = await cpuFallback.isVisible({ timeout: 5000 }).catch(() => false);
      if (isFallbackVisible) {
        await cpuFallback.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await cpuFallback.fill(cpu);
        await this.page.waitForTimeout(500);
      } else {
        throw new Error(`Failed to find CPU input field: ${error.message}`);
      }
    }
  }

  /**
   * Enters Storage value in new subscription form.
   * @param {string} storage - Storage value
   * @returns {Promise<void>}
   */
  async enterNewSubscriptionStorage(storage) {
    try {
      // Strategy 1: Try primary locator with id
      const storageById = this.page.locator('input#storage');
      const isByIdVisible = await storageById.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByIdVisible) {
        await storageById.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await storageById.fill(storage);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 2: Try with ng-reflect-name
      const storageByNgReflect = this.page.locator('input[ng-reflect-name="storage"]');
      const isByNgReflectVisible = await storageByNgReflect.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByNgReflectVisible) {
        await storageByNgReflect.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await storageByNgReflect.fill(storage);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 3: Try with placeholder
      const storageByPlaceholder = this.page.locator('input[placeholder*="Storage"], input[placeholder*="storage"]');
      const isByPlaceholderVisible = await storageByPlaceholder.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByPlaceholderVisible) {
        await storageByPlaceholder.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await storageByPlaceholder.fill(storage);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 4: Use the original locator (with modal selectors)
    await this.newSubscriptionStorageInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.newSubscriptionStorageInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
    await this.newSubscriptionStorageInput.fill(storage);
    await this.page.waitForTimeout(500);
    } catch (error) {
      // Final fallback: Try finding by type="number" with id or name containing storage
      const storageFallback = this.page.locator('input[type="number"][id="storage"], input[type="number"][name="storage"], input[type="number"][ng-reflect-name="storage"]').first();
      const isFallbackVisible = await storageFallback.isVisible({ timeout: 5000 }).catch(() => false);
      if (isFallbackVisible) {
        await storageFallback.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await storageFallback.fill(storage);
        await this.page.waitForTimeout(500);
      } else {
        throw new Error(`Failed to find Storage input field: ${error.message}`);
      }
    }
  }

  /**
   * Selects next renewal date from dropdown in new subscription form.
   * @param {string} renewalDate - Renewal date option (optional, if not provided selects first available)
   * @returns {Promise<void>}
   */
  async selectNewSubscriptionNextRenewalDate(renewalDate) {
    try {
      // Wait for dropdown to be visible
    await this.newSubscriptionNextRenewalDateDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.newSubscriptionNextRenewalDateDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);

      // Strategy 1: Check if it's a regular <select> element
      const isSelectElement = await this.newSubscriptionNextRenewalDateDropdown.evaluate((el) => {
        return el.tagName.toLowerCase() === 'select';
      }).catch(() => false);

      if (isSelectElement) {
        // It's a regular HTML select element
        if (renewalDate) {
          // Try to select by label/text content
          await this.newSubscriptionNextRenewalDateDropdown.selectOption({ label: renewalDate }).catch(async () => {
            // If label doesn't work, try by index or value
            const options = await this.newSubscriptionNextRenewalDateDropdown.locator('option:not([disabled]):not([value=""])').all();
            if (options.length > 0) {
              const optionTexts = await Promise.all(options.map(opt => opt.textContent()));
              const matchingIndex = optionTexts.findIndex(text => text && text.trim().includes(renewalDate.trim()));
              if (matchingIndex >= 0) {
                await this.newSubscriptionNextRenewalDateDropdown.selectOption({ index: matchingIndex + 1 }); // +1 because first option is usually disabled
              } else {
                // Select first available option
                await this.newSubscriptionNextRenewalDateDropdown.selectOption({ index: 1 });
              }
            }
          });
        } else {
          // Select first available option (skip disabled/empty option)
          const firstEnabledOption = this.newSubscriptionNextRenewalDateDropdown.locator('option:not([disabled]):not([value=""])').first();
          const optionValue = await firstEnabledOption.getAttribute('value').catch(() => null);
          if (optionValue) {
            await this.newSubscriptionNextRenewalDateDropdown.selectOption(optionValue);
          } else {
            // Fallback: select by index
            await this.newSubscriptionNextRenewalDateDropdown.selectOption({ index: 1 });
          }
        }
        await this.page.waitForTimeout(1000);
        return;
      }

      // Strategy 2: It's a Material Design mat-select
    await this.newSubscriptionNextRenewalDateDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
      if (renewalDate) {
    const option = overlayPanel.locator(`mat-option:has-text("${renewalDate}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
      } else {
        // Select first available mat-option
        const firstOption = overlayPanel.locator('mat-option').first();
        await firstOption.waitFor({ state: 'visible', timeout: 5000 });
        await firstOption.click();
      }
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select next renewal date: ${error.message}`);
    }
  }

  /**
   * Enters reference ID in new subscription form.
   * @param {string} referenceId - Reference ID
   * @returns {Promise<void>}
   */
  async enterNewSubscriptionReferenceId(referenceId) {
    try {
      // Strategy 1: Try primary locator with id (note: HTML has typo "refrenceId")
      const refIdById = this.page.locator('input#refrenceId');
      const isByIdVisible = await refIdById.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByIdVisible) {
        await refIdById.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await refIdById.fill(referenceId);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 2: Try with ng-reflect-name (typo spelling)
      const refIdByNgReflect = this.page.locator('input[ng-reflect-name="refrenceId"]');
      const isByNgReflectVisible = await refIdByNgReflect.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByNgReflectVisible) {
        await refIdByNgReflect.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await refIdByNgReflect.fill(referenceId);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 3: Try with placeholder
      const refIdByPlaceholder = this.page.locator('input[placeholder*="Reference"], input[placeholder*="reference"]');
      const isByPlaceholderVisible = await refIdByPlaceholder.isVisible({ timeout: 5000 }).catch(() => false);
      if (isByPlaceholderVisible) {
        await refIdByPlaceholder.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await refIdByPlaceholder.fill(referenceId);
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 4: Use the original locator (with modal selectors)
    await this.newSubscriptionReferenceIdInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.newSubscriptionReferenceIdInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
    await this.newSubscriptionReferenceIdInput.fill(referenceId);
    await this.page.waitForTimeout(500);
    } catch (error) {
      // Final fallback: Try finding by type="text" with id or name containing refrenceId/referenceId
      const refIdFallback = this.page.locator('input[type="text"][id="refrenceId"], input[type="text"][id="referenceId"], input[type="text"][name="refrenceId"], input[type="text"][ng-reflect-name="refrenceId"]').first();
      const isFallbackVisible = await refIdFallback.isVisible({ timeout: 5000 }).catch(() => false);
      if (isFallbackVisible) {
        await refIdFallback.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await refIdFallback.fill(referenceId);
        await this.page.waitForTimeout(500);
      } else {
        throw new Error(`Failed to find Reference ID input field: ${error.message}`);
      }
    }
  }

  /**
   * Selects salesperson from dropdown in new subscription form.
   * @param {string} salesperson - Salesperson name (optional, if not provided selects first available)
   * @returns {Promise<void>}
   */
  async selectNewSubscriptionSalesperson(salesperson) {
    try {
      // Wait for dropdown to be visible
    await this.newSubscriptionSalespersonDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.newSubscriptionSalespersonDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);

      // Strategy 1: Check if it's a regular <select> element
      const isSelectElement = await this.newSubscriptionSalespersonDropdown.evaluate((el) => {
        return el.tagName.toLowerCase() === 'select';
      }).catch(() => false);

      if (isSelectElement) {
        // It's a regular HTML select element
        if (salesperson) {
          // Try to select by label/text content
          await this.newSubscriptionSalespersonDropdown.selectOption({ label: salesperson }).catch(async () => {
            // If label doesn't work, try by value or find matching option
            const options = await this.newSubscriptionSalespersonDropdown.locator('option:not([disabled]):not([value=""])').all();
            if (options.length > 0) {
              const optionTexts = await Promise.all(options.map(opt => opt.textContent()));
              const matchingIndex = optionTexts.findIndex(text => text && text.trim().toLowerCase().includes(salesperson.trim().toLowerCase()));
              if (matchingIndex >= 0) {
                await this.newSubscriptionSalespersonDropdown.selectOption({ index: matchingIndex + 1 }); // +1 because first option is usually disabled
              } else {
                // Select first available option
                await this.newSubscriptionSalespersonDropdown.selectOption({ index: 1 });
              }
            }
          });
        } else {
          // Select first available option (skip disabled/empty option)
          const firstEnabledOption = this.newSubscriptionSalespersonDropdown.locator('option:not([disabled]):not([value=""])').first();
          const optionValue = await firstEnabledOption.getAttribute('value').catch(() => null);
          if (optionValue) {
            await this.newSubscriptionSalespersonDropdown.selectOption(optionValue);
          } else {
            // Fallback: select by index
            await this.newSubscriptionSalespersonDropdown.selectOption({ index: 1 });
          }
        }
        await this.page.waitForTimeout(1000);
        return;
      }

      // Strategy 2: It's a Material Design mat-select
    await this.newSubscriptionSalespersonDropdown.click();
    await this.page.waitForTimeout(1000);
    
    const overlayPanel = this.page.locator('div.cdk-overlay-pane').filter({ has: this.page.locator('mat-option') }).first();
    await overlayPanel.waitFor({ state: 'visible', timeout: 5000 });
    
      if (salesperson) {
    const option = overlayPanel.locator(`mat-option:has-text("${salesperson}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
      } else {
        // Select first available mat-option
        const firstOption = overlayPanel.locator('mat-option').first();
        await firstOption.waitFor({ state: 'visible', timeout: 5000 });
        await firstOption.click();
      }
    await this.page.waitForTimeout(1000);
    
    // Close dropdown overlay
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select salesperson: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in new subscription form.
   * @returns {Promise<void>}
   */
  async clickNewSubscriptionSubmit() {
    await this.newSubscriptionSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.newSubscriptionSubmitButton.click({ timeout: 5000 });
    await this.page.waitForTimeout(2000); // Wait for submission
  }

  /**
   * Gets toast message text after submitting new subscription (optional).
   * @returns {Promise<string>}
   */
  async getNewSubscriptionToastText() {
    try {
      const isVisible = await this.toastContainer.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const text = await this.toastContainer.textContent();
        return text ? text.trim() : '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  // ==================== Plan Details Page Methods ====================

  /**
   * Clicks on the first Sub ID cell value in the table.
   * This navigates to the plan details page.
   * @returns {Promise<string>} The Sub ID that was clicked
   */
  async clickFirstSubIdInTable() {
    // Find the Sub Id column index
    const headers = this.page.locator('th.mat-mdc-header-cell, th[role="columnheader"]');
    const headerCount = await headers.count();
    let columnIndex = -1;
    
    for (let i = 0; i < headerCount; i++) {
      const header = headers.nth(i);
      const text = await header.textContent();
      if (text && text.trim().toLowerCase().includes('sub id')) {
        columnIndex = i;
        break;
      }
    }
    
    if (columnIndex === -1) {
      throw new Error('Sub Id column not found in table');
    }
    
    // Get the first row and click on the Sub Id cell
    const rows = this.page.locator('mat-table mat-row, table tbody tr');
    const firstRow = rows.first();
    await firstRow.waitFor({ state: 'visible', timeout: 10000 });
    
    const cells = firstRow.locator('td, mat-cell');
    const subIdCell = cells.nth(columnIndex);
    
    // Find the link or span within the cell and click it
    const subIdLink = subIdCell.locator('a, a span').first();
    const subIdText = await subIdLink.textContent();
    
    await subIdLink.click();
    await this.page.waitForTimeout(2000); // Wait for navigation
    
    return subIdText ? subIdText.trim() : '';
  }

  /**
   * Verifies navigation to plan details page.
   * @returns {Promise<boolean>}
   */
  async isPlanDetailsPageLoaded() {
    try {
      // Check if plan details heading is visible
      const headingVisible = await this.planDetailsHeading.isVisible({ timeout: 10000 }).catch(() => false);
      // Check if URL contains subscription details
      const currentUrl = this.page.url();
      const urlContainsDetails = currentUrl.includes('subscription') && currentUrl.includes('details');
      
      return headingVisible || urlContainsDetails;
    } catch (error) {
      return false;
    }
  }

  /**
   * Retrieves plan details from the plan details page.
   * @returns {Promise<{planName: string, subId: string, status: string}>}
   */
  async getPlanDetails() {
    await this.planDetailsHeading.waitFor({ state: 'visible', timeout: 10000 });
    
    const planName = await this.planDetailsHeading.textContent();
    
    // Extract Sub ID - try to get just the Sub ID value, not all text
    let subId = '';
    try {
      // Try to get text from the subId element
      const subIdText = await this.planDetailsSubId.textContent();
      if (subIdText) {
        // Extract Sub ID pattern (e.g., #SUB-P013150 or SUB-P013150)
        const subIdMatch = subIdText.match(/#?SUB-[A-Z0-9]+/i);
        if (subIdMatch) {
          subId = subIdMatch[0].replace('#', ''); // Remove # if present
        } else {
          // If no match, try to get just the text from the element
          subId = subIdText.trim();
          // Try to extract Sub ID from the text
          const extracted = subId.match(/SUB-[A-Z0-9]+/i);
          if (extracted) {
            subId = extracted[0];
          }
        }
      }
    } catch (error) {
      console.error('Error extracting Sub ID:', error);
    }
    
    const status = await this.planDetailsStatus.textContent();
    
    return {
      planName: planName ? planName.trim() : '',
      subId: subId,
      status: status ? status.trim() : ''
    };
  }

  /**
   * Gets the current "Show File Manager" value (Yes/No).
   * @returns {Promise<string>} "Yes" or "No"
   */
  async getShowFileManagerValue() {
    await this.showFileManagerValue.waitFor({ state: 'visible', timeout: 10000 });
    const valueText = await this.showFileManagerValue.textContent();
    // Extract Yes or No from the text (might have extra whitespace or "Update" button text)
    if (valueText) {
      const trimmed = valueText.trim();
      if (trimmed.toLowerCase().includes('yes')) {
        return 'Yes';
      } else if (trimmed.toLowerCase().includes('no')) {
        return 'No';
      }
      // If contains both, try to get the first one
      const yesIndex = trimmed.toLowerCase().indexOf('yes');
      const noIndex = trimmed.toLowerCase().indexOf('no');
      if (yesIndex !== -1 && (noIndex === -1 || yesIndex < noIndex)) {
        return 'Yes';
      } else if (noIndex !== -1) {
        return 'No';
      }
    }
    return '';
  }

  /**
   * Clicks the "Update" button for Show File Manager.
   * @returns {Promise<void>}
   */
  async clickShowFileManagerUpdate() {
    await this.showFileManagerUpdateButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.showFileManagerUpdateButton.scrollIntoViewIfNeeded();
    await this.showFileManagerUpdateButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Selects "Yes" in the Show File Manager modal.
   * @returns {Promise<void>}
   */
  async selectShowFileManagerYes() {
    // Wait for any modal to appear
    await this.page.waitForTimeout(1000);
    
    // Try to find the Yes button in any visible modal
    const yesButton = this.page.locator('.modal.show button:has-text("Yes"), .modal button:has-text("Yes"), button:has-text("Yes")').first();
    await yesButton.waitFor({ state: 'visible', timeout: 10000 });
    await yesButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Selects "No" in the Show File Manager modal.
   * @returns {Promise<void>}
   */
  async selectShowFileManagerNo() {
    await this.showFileManagerModal.waitFor({ state: 'visible', timeout: 10000 });
    await this.showFileManagerNoButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.showFileManagerNoButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if Show File Manager modal is visible.
   * @returns {Promise<boolean>}
   */
  async isShowFileManagerModalVisible() {
    // Check for any visible modal
    const anyModal = this.page.locator('.modal.show, .modal[class*="show"]').first();
    const modalVisible = await anyModal.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (modalVisible) {
      // Check if it contains Show File Manager text or Yes/No buttons
      const hasFileManagerText = await anyModal.locator('text=/Show File Manager|File Manager/i').isVisible({ timeout: 1000 }).catch(() => false);
      const hasYesButton = await anyModal.locator('button:has-text("Yes")').isVisible({ timeout: 1000 }).catch(() => false);
      return hasFileManagerText || hasYesButton;
    }
    
    return false;
  }

  /**
   * Gets the current "Skip Google Drive" value (Yes/No).
   * Re-queries the element to get fresh text.
   * @returns {Promise<string>} "Yes" or "No"
   */
  async getSkipGoogleDriveValue() {
    // Re-query the element to get fresh reference
    const valueElement = this.page
      .locator('div.sub-option-heading:has-text("Skip Google Drive")')
      .locator('xpath=ancestor::div[contains(@class, "d-flex")]/div[contains(@class, "sub-option-heading")][2]')
      .first();
    
    await valueElement.waitFor({ state: 'visible', timeout: 10000 });
    const valueText = await valueElement.textContent();
    
    // Extract Yes or No from the text (might have extra whitespace or "Update" button text)
    if (valueText) {
      const trimmed = valueText.trim();
      // Remove "Update" button text if present - use regex to remove button and its text
      const cleaned = trimmed.replace(/Update/gi, '').replace(/\s+/g, ' ').trim();
      
      // Get the first word that is either "Yes" or "No"
      const words = cleaned.split(/\s+/);
      for (const word of words) {
        const lowerWord = word.toLowerCase();
        if (lowerWord === 'yes') {
          return 'Yes';
        } else if (lowerWord === 'no') {
          return 'No';
        }
      }
      
      // Fallback: check if contains yes or no
      if (cleaned.toLowerCase().includes('yes')) {
        return 'Yes';
      } else if (cleaned.toLowerCase().includes('no')) {
        return 'No';
      }
    }
    return '';
  }

  /**
   * Clicks the "Update" button for Skip Google Drive.
   * @returns {Promise<void>}
   */
  async clickSkipGoogleDriveUpdate() {
    await this.skipGoogleDriveUpdateButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.skipGoogleDriveUpdateButton.scrollIntoViewIfNeeded();
    await this.skipGoogleDriveUpdateButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Selects "Yes" in the Skip Google Drive modal.
   * @returns {Promise<void>}
   */
  async selectSkipGoogleDriveYes() {
    // Wait for any modal to appear
    await this.page.waitForTimeout(1000);
    
    // Try to find the Yes button in any visible modal
    const yesButton = this.page.locator('.modal.show button:has-text("Yes"), .modal button:has-text("Yes"), button:has-text("Yes")').first();
    await yesButton.waitFor({ state: 'visible', timeout: 10000 });
    await yesButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Selects "No" in the Skip Google Drive modal.
   * @returns {Promise<void>}
   */
  async selectSkipGoogleDriveNo() {
    // Wait for any modal to appear
    await this.page.waitForTimeout(1000);
    
    // Try to find the No button in any visible modal
    const noButton = this.page.locator('.modal.show button:has-text("No"), .modal button:has-text("No"), button:has-text("No")').first();
    await noButton.waitFor({ state: 'visible', timeout: 10000 });
    await noButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if Skip Google Drive modal is visible.
   * @returns {Promise<boolean>}
   */
  async isSkipGoogleDriveModalVisible() {
    // Check for any visible modal
    const anyModal = this.page.locator('.modal.show, .modal[class*="show"]').first();
    const modalVisible = await anyModal.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (modalVisible) {
      // Check if it contains Skip Google Drive text or Yes/No buttons
      const hasSkipGoogleDriveText = await anyModal.locator('text=/Skip Google Drive|Google Drive/i').isVisible({ timeout: 1000 }).catch(() => false);
      const hasYesButton = await anyModal.locator('button:has-text("Yes")').isVisible({ timeout: 1000 }).catch(() => false);
      return hasSkipGoogleDriveText || hasYesButton;
    }
    
    return false;
  }

  // ==================== Login as Customer Button ====================
  
  /**
   * Locator for "Login as Customer" button on plan details page.
   */
  get loginAsCustomerButton() {
    return this.page.locator('button:has-text("Login as a Customer"), button.btn.my-3:has-text("Login as a Customer")');
  }

  /**
   * Checks if "Login as Customer" button is visible.
   * @returns {Promise<boolean>}
   */
  async isLoginAsCustomerButtonVisible() {
    return await this.loginAsCustomerButton.isVisible({ timeout: 5000 }).catch(() => false);
  }

  /**
   * Clicks the "Login as Customer" button and waits for new tab to open.
   * @returns {Promise<Page>} The new page/tab that opens
   */
  async clickLoginAsCustomerButton() {
    // Wait for button to be visible
    await this.loginAsCustomerButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Set up listener for new page before clicking
    const newPagePromise = this.page.context().waitForEvent('page', { timeout: 15000 });
    
    // Click the button
    await this.loginAsCustomerButton.click();
    
    // Wait for new page to open
    const newPage = await newPagePromise;
    
    // Wait for the new page to load
    await newPage.waitForLoadState('domcontentloaded');
    
    return newPage;
  }

  // ==================== Extend Expiry Date ====================
  
  /**
   * Locator for expiry date in the plan details page.
   * The expiry date is in a div with class "sub-heading text-center my-2" under "Expiry on"
   */
  get expiryDate() {
    return this.page.locator('div.sub-main-heading:has-text("Expiry on")').locator('xpath=following-sibling::div[contains(@class, "sub-heading")][contains(@class, "text-center")][contains(@class, "my-2")]').first();
  }

  /**
   * Locator for Action dropdown button.
   */
  get actionDropdownButton() {
    return this.page.locator('button.dropdown-toggle:has-text("Action"), button[data-bs-toggle="dropdown"]:has-text("Action")');
  }

  /**
   * Locator for Action dropdown menu.
   */
  get actionDropdownMenu() {
    return this.page.locator('ul.dropdown-menu.show, ul.dropdown-menu[class*="show"]');
  }

  /**
   * Locator for "Extend Expiry Date" option in dropdown.
   */
  get extendExpiryDateOption() {
    return this.page.locator('a.dropdown-item:has-text("Extend Expiry Date")');
  }

  /**
   * Locator for Extend Expiry Date modal.
   */
  get extendExpiryDateModal() {
    return this.page.locator('.modal.show, .modal[class*="show"]').filter({ has: this.page.locator('div.modal-heading:has-text("Extend Expiry Date")') });
  }

  /**
   * Locator for current expiry date input (read-only).
   */
  get currentExpiryDateInput() {
    return this.page.locator('input#currentEndDate');
  }

  /**
   * Locator for new expiry date input (datetime-local).
   */
  get newExpiryDateInput() {
    return this.page.locator('input#endDate[type="datetime-local"]');
  }

  /**
   * Locator for remarks textarea.
   */
  get remarksTextarea() {
    return this.page.locator('textarea#remark');
  }

  /**
   * Locator for isTempExt checkbox.
   */
  get isTempExtCheckbox() {
    return this.page.locator('input[ng-reflect-name="isTempExt"], input[name="isTempExt"]');
  }

  /**
   * Locator for Confirm button in modal.
   */
  get extendExpiryDateConfirmButton() {
    return this.page.locator('.modal.show button.btn.btn-label:has-text("Confirm"), .modal button:has-text("Confirm")');
  }

  /**
   * Locator for Cancel button in modal.
   */
  get extendExpiryDateCancelButton() {
    return this.page.locator('.modal.show button.cancel-btn:has-text("Cancel"), .modal button:has-text("Cancel")');
  }

  /**
   * Gets the current expiry date from the plan details page.
   * @returns {Promise<string>} The expiry date text
   */
  async getExpiryDate() {
    await this.expiryDate.waitFor({ state: 'visible', timeout: 10000 });
    const dateText = await this.expiryDate.textContent();
    return dateText ? dateText.trim() : '';
  }

  /**
   * Clicks the Action dropdown button to open the dropdown.
   * @returns {Promise<void>}
   */
  async clickActionDropdown() {
    await this.actionDropdownButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.actionDropdownButton.click();
    await this.page.waitForTimeout(500);
    // Wait for dropdown to be visible
    await this.actionDropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Clicks "Extend Expiry Date" option from the Action dropdown.
   * @returns {Promise<void>}
   */
  async clickExtendExpiryDate() {
    await this.extendExpiryDateOption.waitFor({ state: 'visible', timeout: 10000 });
    await this.extendExpiryDateOption.click();
    await this.page.waitForTimeout(1000);
    // Wait for modal to be visible
    await this.extendExpiryDateModal.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Gets the current expiry date from the modal (read-only field).
   * @returns {Promise<string>} The current expiry date
   */
  async getCurrentExpiryDateFromModal() {
    await this.currentExpiryDateInput.waitFor({ state: 'visible', timeout: 10000 });
    const value = await this.currentExpiryDateInput.inputValue();
    return value;
  }

  /**
   * Enters a new expiry date in the modal.
   * @param {string} dateTime - Date and time in format "YYYY-MM-DDTHH:mm" (datetime-local format)
   * @returns {Promise<void>}
   */
  async enterNewExpiryDate(dateTime) {
    await this.newExpiryDateInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.newExpiryDateInput.fill(dateTime);
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters remarks in the modal.
   * @param {string} remarks - The remarks text
   * @returns {Promise<void>}
   */
  async enterRemarks(remarks) {
    await this.remarksTextarea.waitFor({ state: 'visible', timeout: 10000 });
    await this.remarksTextarea.fill(remarks);
    await this.page.waitForTimeout(500);
  }

  /**
   * Checks or unchecks the isTempExt checkbox.
   * @param {boolean} checked - Whether to check (true) or uncheck (false)
   * @returns {Promise<void>}
   */
  async setTempExtCheckbox(checked) {
    await this.isTempExtCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    if (checked) {
      await this.isTempExtCheckbox.check();
    } else {
      await this.isTempExtCheckbox.uncheck();
    }
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the Confirm button in the Extend Expiry Date modal.
   * @returns {Promise<void>}
   */
  async clickExtendExpiryDateConfirm() {
    await this.extendExpiryDateConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.extendExpiryDateConfirmButton.click();
    await this.page.waitForTimeout(2000);
    // Wait for modal to close
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if the Extend Expiry Date modal is visible.
   * @returns {Promise<boolean>}
   */
  async isExtendExpiryDateModalVisible() {
    return await this.extendExpiryDateModal.isVisible({ timeout: 3000 }).catch(() => false);
  }

  // ==================== Change Price ====================
  
  /**
   * Locator for Rate column in the plan details table.
   * Gets the first row's Rate value (main plan rate).
   */
  get rateValue() {
    return this.page.locator('table.table thead th:has-text("Rate")').locator('xpath=following::tbody/tr[1]/td[3]/span').first();
  }

  /**
   * Locator for "Change Price" option in Action dropdown.
   */
  get changePriceOption() {
    return this.page.locator('a.dropdown-item:has-text("Change Price")');
  }

  /**
   * Locator for Change Price modal.
   */
  get changePriceModal() {
    return this.page.locator('.modal.show, .modal[class*="show"]').filter({ has: this.page.locator('div.modal-heading:has-text("Change Sub Pricing")') });
  }

  /**
   * Locator for Plan Name input (read-only) in Change Price modal.
   */
  get changePricePlanNameInput() {
    return this.page.locator('input#name[readonly]');
  }

  /**
   * Locator for Current Price input (read-only) in Change Price modal.
   */
  get changePriceCurrentPriceInput() {
    return this.page.locator('input#currentPrice[readonly]');
  }

  /**
   * Locator for Price input in Change Price modal.
   */
  get changePricePriceInput() {
    return this.page.locator('input#price:not([readonly])');
  }

  /**
   * Locator for Remarks textarea in Change Price modal.
   */
  get changePriceRemarksTextarea() {
    return this.page.locator('.modal.show textarea#remark, .modal[class*="show"] textarea#remark').first();
  }

  /**
   * Locator for Select User dropdown in Change Price modal.
   */
  get changePriceSelectUserDropdown() {
    return this.page.locator('select#salesPersonName');
  }

  /**
   * Locator for Confirm button in Change Price modal.
   */
  get changePriceConfirmButton() {
    return this.page.locator('.modal.show button.btn.btn-label:has-text("Confirm"), .modal[class*="show"] button.btn.btn-label:has-text("Confirm")').first();
  }

  /**
   * Locator for Cancel button in Change Price modal.
   */
  get changePriceCancelButton() {
    return this.page.locator('.modal.show button.cancel-btn:has-text("Cancel"), .modal button:has-text("Cancel")').filter({ has: this.page.locator('div.modal-heading:has-text("Change Sub Pricing")') });
  }

  /**
   * Gets the current rate value from the table (first row, Rate column).
   * @returns {Promise<string>} The rate value (e.g., "₹12,000.00")
   */
  async getRateValue() {
    await this.rateValue.waitFor({ state: 'visible', timeout: 10000 });
    const rateText = await this.rateValue.textContent();
    return rateText ? rateText.trim() : '';
  }

  /**
   * Clicks "Change Price" option from the Action dropdown.
   * @returns {Promise<void>}
   */
  async clickChangePrice() {
    await this.changePriceOption.waitFor({ state: 'visible', timeout: 10000 });
    await this.changePriceOption.click();
    await this.page.waitForTimeout(1000);
    // Wait for modal to be visible
    await this.changePriceModal.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Gets the current price from the Change Price modal (read-only field).
   * @returns {Promise<string>} The current price
   */
  async getCurrentPriceFromModal() {
    await this.changePriceCurrentPriceInput.waitFor({ state: 'visible', timeout: 10000 });
    const value = await this.changePriceCurrentPriceInput.inputValue();
    return value;
  }

  /**
   * Enters a new price in the Change Price modal.
   * @param {string} price - The price value
   * @returns {Promise<void>}
   */
  async enterNewPrice(price) {
    await this.changePricePriceInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.changePricePriceInput.fill(price);
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters remarks in the Change Price modal.
   * @param {string} remarks - The remarks text
   * @returns {Promise<void>}
   */
  async enterChangePriceRemarks(remarks) {
    await this.changePriceRemarksTextarea.waitFor({ state: 'visible', timeout: 10000 });
    await this.changePriceRemarksTextarea.fill(remarks);
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects a user from the Select User dropdown in Change Price modal.
   * @param {string} user - The user to select (e.g., "Direct", "Support", or a user name)
   * @returns {Promise<void>}
   */
  async selectUserInChangePrice(user) {
    await this.changePriceSelectUserDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.changePriceSelectUserDropdown.selectOption({ label: user });
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the Confirm button in the Change Price modal.
   * @returns {Promise<void>}
   */
  async clickChangePriceConfirm() {
    await this.changePriceConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.changePriceConfirmButton.click();
    await this.page.waitForTimeout(2000);
    // Wait for modal to close
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if the Change Price modal is visible.
   * @returns {Promise<boolean>}
   */
  async isChangePriceModalVisible() {
    return await this.changePriceModal.isVisible({ timeout: 3000 }).catch(() => false);
  }

  // ==================== Add Addon ====================
  
  /**
   * Locator for "Add AddOn" option in Action dropdown.
   */
  get addAddonOption() {
    return this.page.locator('a.dropdown-item:has-text("Add AddOn"), a.dropdown-item:has-text("Add Addon")');
  }

  /**
   * Locator for Add Addon modal.
   */
  get addAddonModal() {
    return this.page.locator('.modal.show, .modal[class*="show"]').filter({ has: this.page.locator('div.modal-heading:has-text("Add AddOn"), div.modal-heading:has-text("Add Addon")') });
  }

  /**
   * Locator for Name dropdown in Add Addon modal.
   */
  get addAddonNameDropdown() {
    return this.page.locator('select#addOnId');
  }

  /**
   * Locator for Remarks textarea in Add Addon modal.
   */
  get addAddonRemarksTextarea() {
    return this.page.locator('.modal.show textarea#remarks, .modal[class*="show"] textarea#remarks, .modal.show textarea#remark, .modal[class*="show"] textarea#remark').first();
  }

  /**
   * Locator for Confirm button in Add Addon modal.
   */
  get addAddonConfirmButton() {
    return this.page.locator('.modal.show button.btn.btn-label:has-text("Confirm"), .modal[class*="show"] button.btn.btn-label:has-text("Confirm")').first();
  }

  /**
   * Clicks "Add AddOn" option from the Action dropdown.
   * @returns {Promise<void>}
   */
  async clickAddAddon() {
    await this.addAddonOption.waitFor({ state: 'visible', timeout: 10000 });
    await this.addAddonOption.click();
    await this.page.waitForTimeout(1000);
    // Wait for modal to be visible
    await this.addAddonModal.waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Selects an addon name from the dropdown in Add Addon modal.
   * @param {string} addonName - The addon name to select (e.g., "ssd", "odbc port")
   * @returns {Promise<void>}
   */
  async selectAddonName(addonName) {
    await this.addAddonNameDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.addAddonNameDropdown.selectOption({ label: addonName });
    await this.page.waitForTimeout(500);
  }

  /**
   * Enters remarks in the Add Addon modal.
   * @param {string} remarks - The remarks text
   * @returns {Promise<void>}
   */
  async enterAddAddonRemarks(remarks) {
    await this.addAddonRemarksTextarea.waitFor({ state: 'visible', timeout: 10000 });
    await this.addAddonRemarksTextarea.fill(remarks);
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the Confirm button in the Add Addon modal.
   * @returns {Promise<void>}
   */
  async clickAddAddonConfirm() {
    await this.addAddonConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addAddonConfirmButton.click();
    await this.page.waitForTimeout(2000);
    // Wait for modal to close
    await this.page.waitForTimeout(1000);
  }

  /**
   * Checks if the Add Addon modal is visible.
   * @returns {Promise<boolean>}
   */
  async isAddAddonModalVisible() {
    return await this.addAddonModal.isVisible({ timeout: 3000 }).catch(() => false);
  }
}

module.exports = { SubscriptionPage };

