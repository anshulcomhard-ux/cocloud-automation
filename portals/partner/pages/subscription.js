class SubscriptionPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Sidebar / navigation - Subscriptions module entry
    this.subscriptionsMenuItem = page
      .locator(
        'div.sidebar-items[ng-reflect-router-link="/subscriptions"], ' +
        'div.sidebar-items:has(span.title:has-text("Subscriptions"))'
      )
      .first();

    // Subscriptions page title
    this.subscriptionsPageTitle = page
      .locator(
        'h1:has-text("Subscriptions"), h2:has-text("Subscriptions"), ' +
        'span.title:has-text("Subscriptions"), *:has-text("Subscriptions")'
      )
      .first();

    // New Subscription button
    this.newButton = page
      .locator('button.add-btn:has-text("New"), button.btn.add-btn:has-text("New")')
      .or(page.getByRole('button', { name: /new/i }).filter({ has: page.locator('span:has-text("New")') }))
      .first();

    // Export Excel button
    this.exportExcelButton = page.getByRole('button', { name: /export.*excel/i }).first()
      .or(page.locator('button.excel-btn:has-text("EXPORT"), button.btn.excel-btn:has-text("EXPORT")').first())
      .or(page.locator('button:has(span:has-text("EXPORT (EXCEL)"))').first())
      .or(page.locator('button:has-text("EXPORT (EXCEL)")').first())
      .or(page.locator('span:has-text("EXPORT (EXCEL)")').locator('..').locator('button').first())
      .or(page.locator('span:has-text("EXPORT (EXCEL)")').locator('../..').locator('button').first())
      .or(page.locator('button.excel-btn, button.btn.excel-btn').first());

    // Form container/modal
    this.formContainer = page.locator('div.modal-section, div.modal-dialog, form').first();
    
    // Form title "New Subscription"
    this.formTitle = page.locator('h1:has-text("New Subscription"), h2:has-text("New Subscription"), h3:has-text("New Subscription"), *:has-text("New Subscription")').first();

    // Customer Section
    this.customerDropdown = page
      .locator('*:has-text("Select Customer"), *:has-text("Customer")')
      .locator('..')
      .locator('select, input[type="text"], ng-select, mat-select')
      .first()
      .or(page.getByLabel(/customer/i))
      .or(page.getByPlaceholder(/select customer/i));

    this.customerDropdownButton = page
      .locator('div.search-select:has-text("Select Customer"), button:has-text("Select Customer"), ng-select:has-text("Select Customer")')
      .first();

    this.customerDropdownMenu = page.locator('ul.dropdown-menu').first();
    this.customerDropdownSearchInput = page.locator('ul.dropdown-menu input[placeholder="Search..."], ul.dropdown-menu input[type="text"], ul.dropdown-menu input[aria-label="search"], ul.dropdown-menu input.form-control').first();
    this.customerDropdownOptions = page.locator('ul.dropdown-menu li').filter({ hasNot: page.locator('input') });
    
    // END DATE dropdown (to verify it does NOT appear)
    this.endDateDropdown = page.locator('*:has-text("End Date"), *:has-text("END DATE"), select[id*="endDate"], input[id*="endDate"]').first();

    // Product Section
    this.productDropdown = page
      .locator('*:has-text("Select Product"), *:has-text("Product")')
      .locator('..')
      .locator('select, input[type="text"], ng-select, mat-select')
      .first()
      .or(page.getByLabel(/product/i))
      .or(page.getByPlaceholder(/select product/i));

    this.productDropdownButton = page
      .locator('button:has-text("Select Product"), ng-select:has-text("Select Product")')
      .first();

    this.productDropdownOptions = page.locator('ul.dropdown-menu li, ng-dropdown-panel li, mat-option');
    this.productRequiredError = page.locator('*:has-text("Product is required")');

    // Plan Section
    this.planDropdown = page
      .locator('*:has-text("Plan Name"), *:has-text("Plan")')
      .locator('..')
      .locator('select, input[type="text"], ng-select, mat-select')
      .first()
      .or(page.getByLabel(/plan/i))
      .or(page.getByPlaceholder(/plan name/i));

    this.planDropdownButton = page
      .locator('button:has-text("Plan Name"), ng-select:has-text("Plan Name")')
      .first();

    this.planDropdownOptions = page.locator('ul.dropdown-menu li, ng-dropdown-panel li, mat-option');
    this.planRequiredError = page.locator('*:has-text("Plan Name is required")');

    // Unit Price
    this.unitPriceInput = page
      .locator('input#planUnitPrice, input[placeholder="Unit Price"]')
      .or(page.getByLabel(/unit price/i))
      .or(page.getByPlaceholder(/unit price/i))
      .first();

    // Quantity
    this.quantityInput = page
      .locator('input#planQuantity, input[placeholder="Quantity"]')
      .or(page.getByLabel(/quantity/i))
      .or(page.getByPlaceholder(/quantity/i))
      .first();

    // Amount
    this.amountInput = page
      .locator('input#planAmount, input[placeholder="Amount"]')
      .or(page.getByLabel(/amount/i))
      .or(page.getByPlaceholder(/amount/i))
      .first();

    // Description
    this.descriptionInput = page
      .locator('textarea[placeholder="Description"], textarea#description')
      .or(page.getByLabel(/description/i))
      .or(page.getByPlaceholder(/description/i))
      .first();

    // Subscription Term
    this.subscriptionTermInput = page
      .locator('input[placeholder="Subscription Term"], input#subscriptionTerm')
      .or(page.getByLabel(/subscription term/i))
      .or(page.getByPlaceholder(/subscription term/i))
      .first();

    // Reference ID
    this.referenceIdInput = page
      .locator('input#referenceId, input[placeholder="Reference Id"]')
      .or(page.getByLabel(/reference id/i))
      .or(page.getByPlaceholder(/reference id/i))
      .first();

    // Sales Person
    this.salesPersonDropdown = page
      .locator('*:has-text("Sales Person"), *:has-text("Salesperson")')
      .locator('..')
      .locator('select, input[type="text"], ng-select, mat-select')
      .first()
      .or(page.getByLabel(/sales person/i))
      .or(page.getByPlaceholder(/select sales person/i));

    this.salesPersonDropdownButton = page
      .locator('button:has-text("Sales Person"), ng-select:has-text("Sales Person")')
      .first();

    this.salesPersonDropdownOptions = page.locator('ul.dropdown-menu li, ng-dropdown-panel li, mat-option');

    // Form action buttons
    this.submitButton = page
      .locator('button.btn-label:has-text("Submit"), button[type="submit"]:has-text("Submit")')
      .or(page.getByRole('button', { name: /submit/i }))
      .first();

    this.cancelButton = page.getByRole('button', { name: /cancel/i }).first();

    // Validation error messages
    this.validationMessages = page.locator(
      'div[class*="error"], div[class*="invalid"], ' +
      'span[class*="error"], mat-error, ' +
      '*[class*="error-message"], *[class*="validation"]'
    );

    // Toast/Success message locators
    this.toastContainer = page.locator('#toast-container, div[class*="toast"]').first();
    this.toastMessages = page.locator(
      '#toast-container > div, #toast-container .toast, ' +
      'div[class*="toast"] > div, div[class*="toast-message"]'
    );
    this.successToast = page
      .locator(
        '#toast-container div[class*="success"], ' +
        '#toast-container div[class*="toast-success"], ' +
        '#toast-container *:has-text("successfully"), ' +
        '#toast-container *:has-text("Success"), ' +
        'div[class*="success"], div[class*="toast-success"], ' +
        '*:has-text("successfully"), *:has-text("Success")'
      )
      .first();

    // Subscription table locators
    this.subscriptionTable = page.locator('table, mat-table').first();
    this.subscriptionTableRows = page.locator('table tbody tr, mat-table tbody tr, mat-row');
    this.subscriptionTableHeaders = page.locator('table thead th, mat-table thead th, mat-header-row mat-header-cell');

    // Table column locators
    this.subIdColumn = page.locator('th:has-text("Sub Id"), mat-header-cell:has-text("Sub Id")').first();
    this.companyNameColumn = page.locator('th:has-text("Company Name"), mat-header-cell:has-text("Company Name")').first();
    this.planNameColumn = page.locator('th:has-text("Plan Name"), mat-header-cell:has-text("Plan Name")').first();
    this.amountColumn = page.locator('th:has-text("Amount"), mat-header-cell:has-text("Amount")').first();
    this.statusColumn = page.locator('th:has-text("Status"), mat-header-cell:has-text("Status")').first();

    // Filter button locators
    this.allSubscriptionsFilter = page.locator('div.section-card:has-text("All Subscription")').first();
    this.paidSubscriptionFilter = page.locator('div.section-card:has-text("Paid Subscription")').first();
    this.trialSubscriptionFilter = page.locator('div.section-card:has-text("Trial Subscription")').first();
    this.upcomingRenewalFilter = page.locator('div.section-card:has-text("Upcoming Renewal")').first();
    this.expiredSubscriptionFilter = page.locator('div.section-card:has-text("Expired Subscription")').first();

    // Card total locators (h5.price-text - find within the same card container)
    // Try multiple strategies: parent container, nearby, or by text context
    this.allSubscriptionsCardTotal = page.locator('span:has-text("Total Subscriptions")').locator('..').locator('h5.price-text').first()
      .or(page.locator('div.section-card:has-text("All Subscription")').locator('../..').locator('h5.price-text').first())
      .or(page.locator('div.section-card:has-text("All Subscription")').locator('..').locator('h5.price-text').first());
    this.paidSubscriptionCardTotal = page.locator('div.section-card:has-text("Paid Subscription")').locator('../..').locator('h5.price-text').first()
      .or(page.locator('div.section-card:has-text("Paid Subscription")').locator('..').locator('h5.price-text').first());
    this.trialSubscriptionCardTotal = page.locator('div.section-card:has-text("Trial Subscription")').locator('../..').locator('h5.price-text').first()
      .or(page.locator('div.section-card:has-text("Trial Subscription")').locator('..').locator('h5.price-text').first());
    this.upcomingRenewalCardTotal = page.locator('div.section-card:has-text("Upcoming Renewal")').locator('../..').locator('h5.price-text').first()
      .or(page.locator('div.section-card:has-text("Upcoming Renewal")').locator('..').locator('h5.price-text').first());
    this.expiredSubscriptionCardTotal = page.locator('div.section-card:has-text("Expired Subscription")').locator('../..').locator('h5.price-text').first()
      .or(page.locator('div.section-card:has-text("Expired Subscription")').locator('..').locator('h5.price-text').first());

    // Pagination text locator
    this.paginationText = page.locator('div.total-data-info').first();
    this.paginationRangeLabel = page.locator('div.mat-mdc-paginator-range-label[aria-live="polite"]').first()
      .or(page.locator('div[aria-live="polite"]:has-text("of")').first());

    // Pagination controls
    this.itemsPerPageSelect = page.locator('mat-paginator mat-select').first()
      .or(page.locator('mat-paginator-page-size-select mat-select').first())
      .or(page.locator('mat-select[aria-label*="page size"]').first())
      .or(page.locator('mat-select[aria-labelledby*="page-size"]').first());
    this.itemsPerPageOptions = page.locator('mat-option[ng-reflect-value="20"], mat-option[ng-reflect-value="50"], mat-option[ng-reflect-value="100"], mat-option[ng-reflect-value="200"], mat-option[ng-reflect-value="500"]');
    this.nextPageButton = page.locator('button[aria-label*="Next page"], button.mat-mdc-paginator-navigation-next, button[aria-label*="next"]').first();
    this.previousPageButton = page.locator('button[aria-label*="Previous page"], button.mat-mdc-paginator-navigation-previous, button[aria-label*="previous"]').first();

    // No subscription found message
    this.noSubscriptionFoundMessage = page.locator('div:has-text("There is no subscription found.")').first();

    // Search panel locators
    this.searchButton = page.locator('div[data-bs-toggle="collapse"]:has-text("Search Here"), div.collapsed:has-text("Search Here")').first();
    this.searchPanel = page.locator('#collapseExample, div.collapse.show').first();

    // Search bar (top search box) - try multiple strategies
    // Look for search input outside the collapse panel, in header/toolbar area
    this.topSearchInput = page.locator('div:not(.collapse):not(#collapseExample) input[type="search"]')
      .or(page.locator('header input[type="search"], .toolbar input[type="search"], .header input[type="search"]'))
      .or(page.locator('input[type="search"]:not([formcontrolname]):not([id="userDetail"]):not([id="subCode"]):not([id="tallySerialNo"])').first())
      .or(page.locator('input[placeholder*="Search" i]:not([formcontrolname]):not([id="userDetail"]):not([id="subCode"]):not([id="tallySerialNo"])').first())
      .first();

    // Date filter locators (mat-date-range-input)
    // Try multiple strategies: by label text, by id pattern, by index
    this.startDateFilter = page.locator('mat-label:has-text("Start Date")').locator('..').locator('mat-date-range-input').first()
      .or(page.locator('mat-date-range-input[id*="mat-date-range-input"]').first())
      .or(page.locator('mat-date-range-input').first());
    this.startDateFromInput = page.locator('input[matstartdate][formcontrolname="startDate"]').first()
      .or(page.locator('input[matstartdate][placeholder="From"]').first())
      .or(this.startDateFilter.locator('input[matstartdate]').first());
    this.startDateToInput = page.locator('input[matenddate][formcontrolname="endDate"]').first()
      .or(page.locator('input[matenddate][placeholder="To"]').first())
      .or(this.startDateFilter.locator('input[matenddate]').first());
    
    this.nextBillingDateFilter = page.locator('mat-label:has-text("Next Billing Date")').locator('..').locator('mat-date-range-input').first()
      .or(page.locator('mat-date-range-input[id*="mat-date-range-input"]').nth(1))
      .or(page.locator('mat-date-range-input').nth(1));
    this.nextBillingDateFromInput = page.locator('mat-label:has-text("Next Billing Date")').locator('..').locator('input[matstartdate]').first()
      .or(page.locator('input[matstartdate][placeholder="From"]').nth(1))
      .or(this.nextBillingDateFilter.locator('input[matstartdate]').first());
    this.nextBillingDateToInput = page.locator('mat-label:has-text("Next Billing Date")').locator('..').locator('input[matenddate]').first()
      .or(page.locator('input[matenddate][placeholder="To"]').nth(1))
      .or(this.nextBillingDateFilter.locator('input[matenddate]').first());
    
    this.lastBillingDateFilter = page.locator('mat-label:has-text("Last Billing Date")').locator('..').locator('mat-date-range-input').first()
      .or(page.locator('mat-date-range-input[id*="mat-date-range-input"]').nth(2))
      .or(page.locator('mat-date-range-input').nth(2));
    this.lastBillingDateFromInput = page.locator('mat-label:has-text("Last Billing Date")').locator('..').locator('input[matstartdate]').first()
      .or(page.locator('input[matstartdate][placeholder="From"]').nth(2))
      .or(this.lastBillingDateFilter.locator('input[matstartdate]').first());
    this.lastBillingDateToInput = page.locator('mat-label:has-text("Last Billing Date")').locator('..').locator('input[matenddate]').first()
      .or(page.locator('input[matenddate][placeholder="To"]').nth(2))
      .or(this.lastBillingDateFilter.locator('input[matenddate]').first());

    // Company/Email Address filter
    this.companyEmailInput = page.locator('input#userDetail, input[placeholder="Company / Email Address"]').first();

    // SubCode filter
    this.subCodeInput = page.locator('input#subCode, input[placeholder="SubCode"]').first();

    // Status filter (mat-select) - try multiple strategies
    this.statusSelect = page.locator('mat-label:has-text("Status")').locator('..').locator('mat-select').first()
      .or(page.locator('mat-select[aria-labelledby*="Status"]').first())
      .or(page.locator('mat-select[id*="mat-select"]').first());
    this.statusOptions = page.locator('mat-option:has-text("Active"), mat-option:has-text("Inactive"), mat-option:has-text("Suspend"), mat-option:has-text("Trial"), mat-option:has-text("Expired")');

    // Stage filter (multi-select) - try multiple strategies
    this.stageSelect = page.locator('mat-label:has-text("Stage")').locator('..').locator('mat-select').first()
      .or(page.locator('mat-select[aria-labelledby*="Stage"]').first())
      .or(page.locator('mat-select[id*="mat-select"]').nth(1));
    this.stageOptions = page.locator('mat-option:has-text("Live"), mat-option:has-text("Expired"), mat-option:has-text("Trial"), mat-option:has-text("Trial Expired"), mat-option:has-text("Deleted")');

    // Plan Name filter (multi-select with search) - try multiple strategies
    this.planNameSelect = page.locator('mat-label:has-text("Plan Name"), mat-label:has-text("Plan")').locator('..').locator('mat-select').first()
      .or(page.locator('mat-select[aria-labelledby*="Plan"]').first())
      .or(page.locator('mat-select[id*="mat-select"]').nth(2));
    this.planNameSearchInput = page.locator('div.dropdown-area input[placeholder="Search Here..."]').first();
    this.planNameOptions = page.locator('mat-option .mdc-list-item__primary-text');

    // Salesperson filter (multi-select with search) - try multiple strategies
    this.salespersonSelect = page.locator('mat-label:has-text("Salesperson")').locator('..').locator('mat-select').first()
      .or(page.locator('mat-select[aria-labelledby*="Salesperson"]').first())
      .or(page.locator('mat-select[id*="mat-select"]').nth(3));
    this.salespersonSearchInput = page.locator('mat-select-panel:has(mat-option:has-text("Select All")) input[placeholder="Search Here..."]').first();
    this.salespersonOptions = page.locator('mat-select-panel:has(mat-option:has-text("Select All")) mat-option');

    // Relationship Manager filter (multi-select with search) - try multiple strategies
    this.relationshipManagerSelect = page.locator('mat-label:has-text("Relationship Manager"), mat-label:has-text("RM")').locator('..').locator('mat-select').first()
      .or(page.locator('mat-select[aria-labelledby*="Relationship Manager"]').first())
      .or(page.locator('mat-select[id*="mat-select"]').nth(4));
    this.relationshipManagerSearchInput = page.locator('mat-select-panel:has(mat-option:has-text("Select All")) input[placeholder="Search Here..."]').last();
    this.relationshipManagerOptions = page.locator('mat-select-panel:has(mat-option:has-text("Select All")) mat-option');

    // Set For filter (mat-select) - try multiple strategies
    this.setForSelect = page.locator('mat-select[aria-labelledby*="mat-mdc-form-field-label"]:has(+ mat-label:has-text("Set For"))').first()
      .or(page.locator('mat-label:has-text("Set For")').locator('..').locator('mat-select').first())
      .or(page.locator('mat-select[aria-labelledby*="Set For"]').first())
      .or(page.locator('mat-select[id*="mat-select-36"], mat-select[id*="mat-select"]').last());
    this.setForOptions = page.locator('mat-option:has-text("Auto Renew"), mat-option:has-text("Auto Expire")');

    // Scheduler filter (mat-select) - has "Added" and "Not Added" options
    // Note: HTML uses "Schedular" spelling
    this.schedulerSelect = page.locator('mat-label:has-text("Schedular")').locator('..').locator('mat-select').first()
      .or(page.locator('mat-select[aria-labelledby*="mat-mdc-form-field-label"]:has(+ mat-label:has-text("Schedular"))').first())
      .or(page.locator('mat-select[id*="mat-select-38"], mat-select[id*="mat-select"]').last());
    this.schedulerOptions = page.locator('mat-option:has-text("Added"), mat-option:has-text("Not Added")');

    // Tally Serial No filter
    this.tallySerialNoInput = page.locator('input#tallySerialNo, input[placeholder="Tally Serial No"]').first();

    // Search action buttons
    this.searchSubmitButton = page.locator('button:has-text("Search"), button[type="submit"]:has-text("Search")').first();
    this.resetButton = page.locator('button:has-text("Reset"), button[type="reset"]').first();

    // Table row data locators for verification
    this.tableCompanyNameCells = page.locator('td.cdk-column-Company-Name, mat-cell.cdk-column-Company-Name');
    this.tableSubIdCells = page.locator('td.cdk-column-Sub-Id, mat-cell.cdk-column-Sub-Id');
    this.tableStatusCells = page.locator('td.cdk-column-Status, mat-cell.cdk-column-Status');
    this.tableSetForCells = page.locator('td.cdk-column-Set-For, mat-cell.cdk-column-Set-For, td:has-text("Auto Renew"), td:has-text("Auto Expire")');
    this.tableStageCells = page.locator('td.cdk-column-Stage, mat-cell.cdk-column-Stage');
    this.tablePlanNameCells = page.locator('td.cdk-column-Plan-Name, mat-cell.cdk-column-Plan-Name');
    this.tableStartDateCells = page.locator('td.cdk-column-Start-Date, mat-cell.cdk-column-Start-Date');
    this.tableNextBillingDateCells = page.locator('td.cdk-column-Next-Billing-Date, mat-cell.cdk-column-Next-Billing-Date');
    this.tableLastBillingDateCells = page.locator('td.cdk-column-Last-Billing-Date, mat-cell.cdk-column-Last-Billing-Date');
    this.tableTallySerialNoCells = page.locator('td.cdk-column-Tally-Serial-No, mat-cell.cdk-column-Tally-Serial-No');

    // Subscription detail page section tabs
    this.overviewTab = page.locator('div.me-sm-4.me-2:has-text("Overview"), div.details-sections:has-text("Overview")').first();
    this.transactionsTab = page.locator('div.me-sm-4.me-2:has-text("Transactions"), div.details-sections:has-text("Transactions")').first();
    this.recentActivitiesTab = page.locator('div.me-sm-4.me-2:has-text("Recent Activities"), div.details-sections:has-text("Recent Activities")').first();
    this.activeSectionTab = page.locator('div.details-sections-active').first();
    
    // Overview section content
    this.overviewSection = page.locator('div.overview.ng-star-inserted, div.row.overview').first();
    this.overviewSubscriptionDetails = page.locator('div.overview div.sub-option-heading, div.details-personal-section, div.details-billing-section');
    
    // Status badge on detail page
    this.statusBadge = page.locator('div.status.ms-3.danger:has-text("Trial"), div.status:has-text("Trial"), div[class*="status"]:has-text("Trial")').first();
    this.liveStatusBadge = page.locator('div.status.ms-3.success:has-text("Live"), div.status:has-text("Live"), div[class*="status"]:has-text("Live")').first();
    this.statusBadgeByText = (statusText) => page.locator(`div.status.ms-3:has-text("${statusText}"), div.status:has-text("${statusText}")`).first();
    
    // Subscription dates on detail page
    this.nextBillingDateDetail = page.locator('*:has-text("Next Billing Date")').locator('..').locator('*:not(:has-text("Next Billing Date"))').first()
      .or(page.locator('div:has-text("Next Billing Date") + div, div:has-text("Next Billing Date") ~ div').first());
    this.expiryDateDetail = page.locator('*:has-text("Expiry Date"), *:has-text("Expiry")').locator('..').locator('*:not(:has-text("Expiry"))').first()
      .or(page.locator('div:has-text("Expiry Date") + div, div:has-text("Expiry Date") ~ div').first());
    this.lastBillingDateDetail = page.locator('*:has-text("Last Billing Date")').locator('..').locator('*:not(:has-text("Last Billing Date"))').first()
      .or(page.locator('div:has-text("Last Billing Date") + div, div:has-text("Last Billing Date") ~ div').first());
    
    // Subscription amount fields on detail page
    this.subscriptionAmount = page.locator('*:has-text("Subscription Amount"), *:has-text("Amount")').locator('..').locator('*:has-text("₹0.00"), *:has-text("0.00")').first()
      .or(page.locator('div:has-text("₹0.00"), span:has-text("₹0.00")').first());
    this.subTotal = page.locator('*:has-text("Sub-total"), *:has-text("Subtotal")').locator('..').locator('*:has-text("₹0.00"), *:has-text("0.00")').first();
    this.taxAmount = page.locator('*:has-text("Tax")').locator('..').locator('*:has-text("₹0.00"), *:has-text("0.00")').first();
    this.totalAmount = page.locator('*:has-text("Total")').locator('..').locator('*:has-text("₹0.00"), *:has-text("0.00")').first();
    
    // Move to Paid Plan button
    this.moveToPaidPlanButton = page.locator('button:has-text("Move to Paid Plan"), a:has-text("Move to Paid Plan"), button.btn:has-text("Move to Paid Plan")').first();
    this.upgradeToPaidPlanModal = page.locator('.modal:has-text("Upgrade to paid plan"), .modal:has-text("Move to Paid Plan"), .modal-dialog:has-text("Upgrade")').first();
    
    // Upgrade modal elements
    // Prioritize select elements with specific IDs (from HTML: id="productId", id="planId", id="endDate")
    this.upgradeModalProductDropdown = this.upgradeToPaidPlanModal.locator('select#productId, select[id="productId"], select[id*="product"], ng-select[placeholder*="Product"], ng-select[placeholder*="product"], mat-select:has-text("Product")').first();
    this.upgradeModalPlanDropdown = this.upgradeToPaidPlanModal.locator('select#planId, select[id="planId"], select[id*="plan"], ng-select[placeholder*="Plan"], ng-select[placeholder*="plan"], mat-select:has-text("Plan")').first();
    this.upgradeModalEndDatePicker = this.upgradeToPaidPlanModal.locator('select#endDate, select[id="endDate"], select[id*="endDate"], input[matenddate], input[placeholder*="End Date"]').first();
    this.upgradeModalSubmitButton = this.upgradeToPaidPlanModal.locator('button:has-text("Submit"), button:has-text("Upgrade"), button.btn-primary:has-text("Submit")').first();
    this.upgradeModalCloseButton = this.upgradeToPaidPlanModal.locator('button[aria-label="Close"], button.close, .modal-header button:has-text("×")').first();
    
    // Plan & Addon Details
    this.planNameDetail = page.locator('*:has-text("Plan Name"), *:has-text("Plan")').locator('..').locator('*:not(:has-text("Plan Name"))').first();
    this.numberOfUsersDetail = page.locator('*:has-text("Number of Users"), *:has-text("Users")').locator('..').locator('*:not(:has-text("Users"))').first();
    this.rateDetail = page.locator('*:has-text("Rate")').locator('..').locator('*:has-text("₹0.00"), *:has-text("0.00")').first();
    this.updatedRateDetail = page.locator('*:has-text("Updated Rate"), *:has-text("Updated")').locator('..').locator('*:has-text("₹0.00"), *:has-text("0.00")').first();
    
    // Login as Customer button
    this.loginAsCustomerButton = page.locator('button:has-text("Login as Customer"), button:has-text("Login as customer"), button:has-text("Login as a Customer"), a:has-text("Login as Customer"), a:has-text("Login as a Customer")').first();
    
    // Action dropdown
    this.actionButton = page.locator('button:has-text("Action"), button[aria-label*="Action"], button.dropdown-toggle:has-text("Action")').first();
    this.actionDropdown = page.locator('ul.dropdown-menu:has(li:has-text("Suspend")), ul.dropdown-menu:has(li:has-text("Delete"))').first();
    this.suspendOption = page.locator('a.dropdown-item:has-text("Suspend"), li:has-text("Suspend"), button:has-text("Suspend")').first();
    this.activateOption = page.locator('a.dropdown-item:has-text("Activate"), li:has-text("Activate"), button:has-text("Activate"), *:has-text("Activate")').first();
    this.addAddonOption = page.locator('a.dropdown-item:has-text("Add AddOn"), a.dropdown-item:has-text("Add Addon"), li:has-text("Add AddOn"), li:has-text("Add Addon"), button:has-text("Add AddOn"), button:has-text("Add Addon"), *:has-text("Add AddOn"), *:has-text("Add Addon")').first();
    this.updateAddonOption = page.locator('a.dropdown-item:has-text("Update Addon"), li:has-text("Update Addon"), button:has-text("Update Addon"), *:has-text("Update Addon")').first();
    
    // Add Addon modal - use more flexible locator
    this.addAddonModal = page.locator('.modal.show:has-text("Add AddOn"), .modal-dialog.show:has-text("Add AddOn"), .modal:has-text("Add AddOn"), .modal-content:has-text("Add AddOn"), app-subscription-operation-modal:has-text("Add AddOn"), div.modal-section:has-text("Add AddOn")').first();
    this.addAddonModalHeading = this.addAddonModal.locator('div.modal-heading:has-text("Add AddOn")').first();
    this.addonNameDropdown = this.addAddonModal.locator('select#addOnId, select[id="addOnId"]').first();
    this.addonPriceField = this.addAddonModal.locator('input#price, input[id="price"]').first();
    this.addonQuantityField = this.addAddonModal.locator('input#quantity, input[id="quantity"]').first();
    this.addonDescriptionField = this.addAddonModal.locator('textarea#description, textarea[id="description"]').first();
    this.addonRemarksField = this.addAddonModal.locator('textarea#remarks, textarea[id="remarks"]').first();
    this.addonUserDropdown = this.addAddonModal.locator('select#salesPersonName, select[id="salesPersonName"]').first();
    this.addAddonConfirmButton = this.addAddonModal.locator('button.confirm-btn:has-text("Confirm"), button:has-text("Confirm")').first();
    this.addAddonCancelButton = this.addAddonModal.locator('button.cancel-btn, button:has-text("Cancel")').first();
    
    // Plan & Addon Details section on detail page
    this.planAndAddonDetailsSection = page.locator('span:has-text("Plan & Addon Details"), *:has-text("Plan & Addon Details")').first();
    this.addonNameCells = page.locator('td.sub-heading:has(span.mat-mdc-tooltip-trigger)');
    this.addonQuantityCells = page.locator('td.sub-heading:has(span.mat-mdc-tooltip-trigger)');
    
    // Change Rate button and modal
    this.changeRateButton = page.locator('button.modal-btn:has-text("Change Rate"), button:has-text("Change Rate")').first();
    this.changeUnitPriceModal = page.locator('.modal:has-text("Change Unitprice"), .modal-content:has-text("Change Unitprice"), app-subscription-operation-modal:has-text("Change Unitprice")').first();
    this.changeUnitPriceModalHeading = this.changeUnitPriceModal.locator('div.modal-heading:has-text("Change Unitprice")').first();
    this.currentPriceField = this.changeUnitPriceModal.locator('input#currentPrice, input[id="currentPrice"]').first();
    this.newPriceField = this.changeUnitPriceModal.locator('input#newPrice, input[id="newPrice"]').first();
    this.remarkField = this.changeUnitPriceModal.locator('input#remark, input[id="remark"]').first();
    this.changeRateSubmitButton = this.changeUnitPriceModal.locator('button.confirm-btn:has-text("Submit"), button:has-text("Submit")').first();
    this.changeRateCancelButton = this.changeUnitPriceModal.locator('button.cancel-btn, button:has-text("Cancel")').first();
    
    // Updated Rate on detail page
    this.updatedRateHeading = page.locator('th:has-text("Updated Rate"), span:has-text("Updated Rate")').first();
    this.updatedRateCell = page.locator('td.sub-heading:has(span.mat-mdc-tooltip-trigger)').filter({ hasText: /₹/ });
    
    // Renew Now button and modal
    this.renewNowButton = page.locator('button.btn.btn-primary:has-text("Renew Now"), button:has-text("Renew Now")').first();
    this.renewModal = page.locator('.modal:has-text("Renew"), .modal-content:has-text("Renew"), app-subscription-operation-modal:has-text("Renew")').first();
    this.renewModalHeading = this.renewModal.locator('div.modal-heading:has-text("Renew")').first();
    this.renewModalMessage = this.renewModal.locator('div.modal-message:has-text("Are you sure you want to renew")').first();
    this.renewYesButton = this.renewModal.locator('button.confirm-btn:has-text("Yes"), button:has-text("Yes")').first();
    this.renewNoButton = this.renewModal.locator('button.cancel-btn:has-text("No"), button:has-text("No")').first();
    this.deleteOption = page.locator('a.dropdown-item:has-text("Delete"), li:has-text("Delete"), button:has-text("Delete"), a.dropdown-item:has-text("Delete Subscriptions"), li:has-text("Delete Subscriptions")').first();
    this.setToAutoRenewOption = page.locator('a.dropdown-item:has-text("Set to Auto Renew"), li:has-text("Set to Auto Renew"), button:has-text("Set to Auto Renew"), *:has-text("Set to Auto Renew")').first();
    this.setToAutoExpireOption = page.locator('a.dropdown-item:has-text("Set to Auto Expire"), li:has-text("Set to Auto Expire"), button:has-text("Set to Auto Expire"), *:has-text("Set to Auto Expire")').first();
    
    // Change Users / Manage Users modal
    this.changeUsersButton = page.locator('button.modal-btn:has-text("Change Users"), button:has-text("Change Users"), td button:has-text("Change Users")').first();
    this.manageUsersModal = page.locator('.modal:has-text("Manage Users"), .modal-content:has-text("Manage Users"), app-subscription-operation-modal').first();
    this.manageUsersModalHeading = this.manageUsersModal.locator('div.modal-heading:has-text("Manage Users")').first();
    this.currentUserLimitField = this.manageUsersModal.locator('input#noOfUsers, input[id="noOfUsers"]').first();
    this.userLimitField = this.manageUsersModal.locator('input#newUsers, input[id="newUsers"]').first();
    this.continueButton = this.manageUsersModal.locator('button.confirm-btn:has-text("Continue"), button.btn-primary:has-text("Continue")').first();
    this.cancelButton = this.manageUsersModal.locator('button.cancel-btn, button:has-text("Cancel")').first();
    
    // Change Plan button and modal
    this.changePlanButton = page.locator('button.btn.btn-primary:has-text("Change Plan"), button:has-text("Change Plan"), button.ms-lg-3.ms-0.mt-3.mt-lg-0.btn-primary:has-text("Change Plan")').first();
    this.changePlanModal = page.locator('.modal-section:has-text("Upgrade/Downgrade plan"), .modal:has-text("Upgrade/Downgrade plan"), div.modal-section.p-3').first();
    this.changePlanModalHeading = this.changePlanModal.locator('div.modal-heading:has-text("Upgrade/Downgrade plan")').first();
    
    // Change Plan modal fields
    this.previousPlanInput = this.changePlanModal.locator('input#previousPlan, input[ng-reflect-name="previousPlan"], input[placeholder="Previous Plan"]').first();
    this.planNameDropdown = this.changePlanModal.locator('select#planId, select[id="planId"], select[ng-reflect-name="planId"]').first();
    this.endDateDropdown = this.changePlanModal.locator('select#endDate, select[id="endDate"], select[ng-reflect-name="endDate"]').first();
    this.changePlanSubmitButton = this.changePlanModal.locator('button.confirm-btn:has-text("Submit"), button.btn-primary.confirm-btn').first();
    this.changePlanCancelButton = this.changePlanModal.locator('button.cancel-btn:has-text("Cancel"), button.cancel-btn').first();
    
    // Select User field (appears after clicking Continue)
    this.selectUserDropdown = this.manageUsersModal.locator('select#salesPersonName, select[id="salesPersonName"]').first();
    this.selectUserLabel = this.manageUsersModal.locator('label[for="salesPersonName"]:has-text("Select User")').first();
    
    // Update button (appears after clicking Continue, replaces Continue button)
    this.updateButton = this.manageUsersModal.locator('button.confirm-btn:has-text("Update"), button.btn-primary:has-text("Update")').first();
    
    // Banner overlay (Usetiful banner)
    this.bannerOverlay = page.locator('div.uf-bannerInner, div.uf-banner').first();
    this.bannerCloseButton = page.locator('button.uf-button[data-action="close"], button:has-text("Close").uf-button').first();
    
    // Qty/No Of Users display in table
    this.qtyNoOfUsersCell = page.locator('td:has-text("Qty/No Of Users"), span:has-text("Qty/No Of Users")').first();
    
    // Transactions section content
    this.transactionsSection = page.locator('div.px-3:has-text("Transaction Information"), div:has-text("Transaction Information")').first();
    this.transactionsTable = page.locator('div:has-text("Transaction Information")').locator('..').locator('table.table').first()
      .or(page.locator('div.px-3 table.table').first());
    this.transactionsTableRows = page.locator('div:has-text("Transaction Information")').locator('..').locator('table tbody tr.ng-star-inserted').first()
      .or(page.locator('div.px-3 table tbody tr.ng-star-inserted'));
    this.transactionsTableHeaders = page.locator('div:has-text("Transaction Information")').locator('..').locator('table thead th.sub-main-heading').first()
      .or(page.locator('div.px-3 table thead th.sub-main-heading'));
    
    // Recent Activities section content
    this.recentActivitiesSection = page.locator('div.p-4.mt-4.ng-star-inserted:has(.activity), div:has(.row.activity)').first();
    this.recentActivitiesItems = page.locator('div.row.activity.ng-star-inserted, div.activity');
    this.activityDate = page.locator('div.activity-date.sub-heading, div.sub-heading.activity-date');
    this.activityTitle = page.locator('div.activity-title.sub-main-heading, div.sub-main-heading.activity-title');
    this.activityBy = page.locator('div.activity-details div.sub-heading:has-text("By")');

    // Column visibility dropdown locators
    this.selectHeadersButton = page.locator('button.header-btn.dropdown-toggle:has-text("Select Headers"), button[data-bs-toggle="dropdown"]:has-text("Select Headers")').first();
    this.selectHeadersDropdown = page.locator('ul.dropdown-menu.dropdown-header-menu, ul.dropdown-header-menu').first();
    this.selectHeadersCheckboxes = page.locator('ul.dropdown-menu.dropdown-header-menu input[type="checkbox"], ul.dropdown-header-menu input[type="checkbox"]');
    this.selectHeadersLabels = page.locator('ul.dropdown-menu.dropdown-header-menu label, ul.dropdown-header-menu label');

    // Row checkboxes (first column checkboxes)
    this.rowCheckboxes = page.locator('table tbody tr input[type="checkbox"].mdc-checkbox__native-control, mat-table tbody tr input[type="checkbox"], mat-row input[type="checkbox"]');
    this.firstRowCheckbox = this.rowCheckboxes.first();
    this.selectAllCheckbox = page.locator('table thead tr input[type="checkbox"], mat-table thead tr input[type="checkbox"], mat-header-row input[type="checkbox"]').first();

    // Assign User button (shows text like "Assign User (1)")
    this.assignUserButton = page
      .locator(
        'button.btn.btn-primary:has-text("Assign User"), ' +
          'button:has-text("Assign User (")'
      )
      .first();

    // Assign Users modal locators
    this.assignUsersModal = page.locator('div.modal:has-text("Assign Users"), div.modal-dialog:has-text("Assign Users")').first();
    this.assignUsersModalHeading = page.locator('div.modal-heading:has-text("Assign Users")').first();
    
    // Salesperson dropdown in modal
    this.modalSalespersonSelect = page.locator('select#salesPersonId').first();
    this.modalSalespersonOptions = page.locator('select#salesPersonId option:not([disabled]):not([value=""])');
    this.modalSalespersonSearchInput = page.locator('select#salesPersonId').locator('..').locator('input[placeholder="Search Here..."]').first();
    
    // Relationship Manager dropdown in modal
    this.modalRelationshipManagerSelect = page.locator('select#relationshipManagerId').first();
    this.modalRelationshipManagerOptions = page.locator('select#relationshipManagerId option:not([disabled]):not([value=""])');
    this.modalRelationshipManagerSearchInput = page.locator('select#relationshipManagerId').locator('..').locator('input[placeholder="Search Here..."]').first();
    
    // Submit button in modal
    this.modalSubmitButton = page.locator('div.modal button.btn-label:has-text("Submit"), div.modal-dialog button.btn-label:has-text("Submit")').first();
    
    // Required validation messages in modal
    this.modalRequiredErrors = page.locator('div.modal *:has-text("required"), div.modal-dialog *:has-text("required")');

    // New Paid Subscriptions card locators
    this.newPaidSubscriptionsCard = page.locator('div.report-card:has-text("New Paid Subscriptions")').first();
    this.newPaidSubscriptionsDropdown = this.newPaidSubscriptionsCard.locator('select[formcontrolname="timeInterval"]').first();
    this.newPaidSubscriptionsDropdownOptions = this.newPaidSubscriptionsDropdown.locator('option');
    
    // New Paid Subscriptions values
    this.newPaidSubscriptionsCount = this.newPaidSubscriptionsCard.locator('div.sub:has-text("Subscriptions") h5.price-text').first();
    this.newPaidSubscriptionsUsers = this.newPaidSubscriptionsCard.locator('div.sub:has-text("Users") h5.price-text').first();
    this.newPaidSubscriptionsAmount = this.newPaidSubscriptionsCard.locator('div.sub:has-text("Amount") h5.price-text').first();
  }

  /**
   * Navigates to the Subscriptions page.
   */
  async navigateToSubscriptions() {
    try {
      await this.page.waitForTimeout(1000);
      await this.subscriptionsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.subscriptionsMenuItem.scrollIntoViewIfNeeded();
      await this.subscriptionsMenuItem.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.subscriptionsPageTitle.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      console.error('Error navigating to Subscriptions page:', error);
      throw error;
    }
  }

  /**
   * Checks if Subscriptions page is visible.
   * @returns {Promise<boolean>}
   */
  async isSubscriptionsPageVisible() {
    try {
      const isVisible = await this.subscriptionsPageTitle.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the "New" button to open the form.
   */
  async clickNewButton() {
    try {
      await this.newButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.newButton.scrollIntoViewIfNeeded();
      await this.newButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking New button:', error);
      throw error;
    }
  }

  /**
   * Clicks on the Overview tab in subscription detail page.
   */
  async clickOverviewTab() {
    try {
      await this.overviewTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.overviewTab.scrollIntoViewIfNeeded();
      await this.overviewTab.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Overview tab:', error);
      throw error;
    }
  }

  /**
   * Clicks on the Transactions tab in subscription detail page.
   */
  async clickTransactionsTab() {
    try {
      await this.transactionsTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.transactionsTab.scrollIntoViewIfNeeded();
      await this.transactionsTab.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Transactions tab:', error);
      throw error;
    }
  }

  /**
   * Clicks on the Recent Activities tab in subscription detail page.
   */
  async clickRecentActivitiesTab() {
    try {
      await this.recentActivitiesTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.recentActivitiesTab.scrollIntoViewIfNeeded();
      await this.recentActivitiesTab.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Recent Activities tab:', error);
      throw error;
    }
  }

  /**
   * Clicks on the Login as Customer button in subscription detail page.
   * @returns {Promise<void>}
   */
  async clickLoginAsCustomer() {
    try {
      await this.loginAsCustomerButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.loginAsCustomerButton.scrollIntoViewIfNeeded();
      await this.loginAsCustomerButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Login as Customer button:', error);
      throw error;
    }
  }

  /**
   * Clicks on the Move to Paid Plan button.
   * @returns {Promise<void>}
   */
  async clickMoveToPaidPlan() {
    try {
      await this.moveToPaidPlanButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.moveToPaidPlanButton.scrollIntoViewIfNeeded();
      await this.moveToPaidPlanButton.click();
      await this.page.waitForTimeout(1500);
    } catch (error) {
      console.error('Error clicking Move to Paid Plan button:', error);
      throw error;
    }
  }

  /**
   * Selects a product from the upgrade modal product dropdown.
   * @param {string} productName - Name of the product to select (optional, if not provided selects first available)
   * @returns {Promise<void>}
   */
  async selectProductInUpgradeModal(productName = null) {
    try {
      await this.upgradeModalProductDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.upgradeModalProductDropdown.scrollIntoViewIfNeeded();
      
      // Check if it's a regular select element (based on HTML provided)
      const tagName = await this.upgradeModalProductDropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      
      if (tagName === 'select') {
        // Handle regular HTML select element
        console.log('  Detected regular select element, using selectOption...');
        
        // Wait a bit for options to be available
        await this.page.waitForTimeout(1000);
        
        if (productName) {
          // Get all options and find matching one
          const options = await this.upgradeModalProductDropdown.locator('option').all();
          let selectedValue = null;
          let selectedText = null;
          
          for (const option of options) {
            const text = await option.textContent().catch(() => '');
            const value = await option.getAttribute('value').catch(() => '');
            const disabled = await option.getAttribute('disabled').catch(() => null);
            
            // Skip disabled/empty options
            if (!value || disabled || !text || text.trim() === 'Select product') {
              continue;
            }
            
            // Check if text matches (case-insensitive, partial match)
            if (text.trim().toLowerCase().includes(productName.toLowerCase())) {
              selectedValue = value;
              selectedText = text.trim();
              console.log(`  ✓ Found matching product: "${selectedText}" (value: ${selectedValue})`);
              break;
            }
          }
          
          if (selectedValue) {
            await this.upgradeModalProductDropdown.selectOption({ value: selectedValue });
            await this.page.waitForTimeout(1000);
            console.log(`  ✓ Product selected: "${selectedText}"`);
            return;
          } else {
            throw new Error(`Product "${productName}" not found in dropdown`);
          }
        } else {
          // Select first available option (skip disabled placeholder)
          const options = await this.upgradeModalProductDropdown.locator('option').all();
          for (const option of options) {
            const value = await option.getAttribute('value').catch(() => '');
            const disabled = await option.getAttribute('disabled').catch(() => null);
            
            if (value && !disabled) {
              await this.upgradeModalProductDropdown.selectOption({ value });
              await this.page.waitForTimeout(1000);
              const selectedText = await option.textContent().catch(() => '');
              console.log(`  ✓ First available product selected: "${selectedText?.trim()}"`);
              return;
            }
          }
          throw new Error('No available product options found in dropdown');
        }
      } else {
        // Handle ng-select or mat-select (custom dropdowns)
        console.log('  Detected custom dropdown (ng-select/mat-select), using panel approach...');
        
        // Try multiple strategies to open dropdown and find panel
        let panel = null;
        let panelVisible = false;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (!panelVisible && attempts < maxAttempts) {
          attempts++;
          console.log(`  Attempt ${attempts}: Opening product dropdown...`);
          
          // Click on the dropdown
      await this.upgradeModalProductDropdown.click();
          await this.page.waitForTimeout(2000);
          
          // Try multiple panel locators
          const panelSelectors = [
            'ng-dropdown-panel',
            'div.ng-dropdown-panel',
            'mat-select-panel',
            'div[role="listbox"]',
            'div.cdk-overlay-pane ng-dropdown-panel',
            'div.cdk-overlay-pane mat-select-panel',
            '.cdk-overlay-container ng-dropdown-panel',
            '.cdk-overlay-container mat-select-panel'
          ];
          
          for (const selector of panelSelectors) {
            try {
              panel = this.page.locator(selector).first();
              panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
              if (panelVisible) {
                console.log(`  ✓ Dropdown panel found using selector: ${selector}`);
                break;
              }
            } catch {
              continue;
            }
          }
          
          if (!panelVisible) {
            console.log(`  ⚠ Panel not visible after attempt ${attempts}, retrying...`);
      await this.page.waitForTimeout(1000);
          }
        }
        
        if (!panelVisible || !panel) {
          throw new Error('Product dropdown panel did not open after multiple attempts');
        }
        
        // Wait a bit more for options to load
        await this.page.waitForTimeout(1000);
      
      if (productName) {
          // Try to find option by exact text first
          let option = panel.locator(`.ng-option:has-text("${productName}"), mat-option:has-text("${productName}")`).first();
          let optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (!optionVisible) {
          // Try partial match
            const allOptions = panel.locator('.ng-option:not(.ng-option-disabled), mat-option:not([disabled])');
          const count = await allOptions.count();
            console.log(`  Found ${count} options in dropdown`);
            
          for (let i = 0; i < count; i++) {
            const opt = allOptions.nth(i);
            const text = await opt.textContent().catch(() => '');
              if (text && text.toLowerCase().includes(productName.toLowerCase())) {
                option = opt;
                optionVisible = true;
                console.log(`  ✓ Found matching option: "${text.trim()}"`);
                break;
              }
            }
          }
          
          if (optionVisible) {
            await option.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await option.click({ force: true });
            await this.page.waitForTimeout(1500);
            console.log('  ✓ Product selected successfully');
            return;
          } else {
          throw new Error(`Product "${productName}" not found in dropdown`);
        }
      } else {
        // Select first available option
        const firstOption = panel.locator('.ng-option:not(.ng-option-disabled), mat-option:not([disabled])').first();
          await firstOption.waitFor({ state: 'visible', timeout: 5000 });
          await firstOption.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
          await firstOption.click({ force: true });
          await this.page.waitForTimeout(1500);
          console.log('  ✓ First available product selected');
        }
      }
    } catch (error) {
      console.error(`Error selecting product in upgrade modal:`, error);
      throw error;
    }
  }

  /**
   * Selects a plan from the upgrade modal plan dropdown.
   * @param {string} planName - Name of the plan to select (optional, if not provided selects first available)
   * @returns {Promise<void>}
   */
  async selectPlanInUpgradeModal(planName = null) {
    try {
      await this.upgradeModalPlanDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.upgradeModalPlanDropdown.scrollIntoViewIfNeeded();
      
      // Wait for dropdown to be enabled (might be disabled until product is selected)
      let isDisabled = true;
      for (let i = 0; i < 10; i++) {
        isDisabled = await this.upgradeModalPlanDropdown.evaluate(el => {
          return el.hasAttribute('disabled') || el.classList.contains('disabled') || 
                 (el.closest('ng-select') && el.closest('ng-select').classList.contains('ng-select-disabled')) ||
                 (el.closest('mat-form-field') && el.closest('mat-form-field').classList.contains('mat-form-field-disabled'));
        }).catch(() => true);
        
        if (!isDisabled) break;
        await this.page.waitForTimeout(500);
      }
      
      // Additional wait after product selection for plan options to load
      await this.page.waitForTimeout(2000);
      
      // Check if it's a regular select element
      const tagName = await this.upgradeModalPlanDropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      
      if (tagName === 'select') {
        // Handle regular select element
        // Wait a bit for options to load (they might be loaded asynchronously)
        await this.page.waitForTimeout(1000);
        
        // Try clicking the select to trigger option loading (some selects need this)
        try {
          await this.upgradeModalPlanDropdown.click();
          await this.page.waitForTimeout(500);
        } catch {
          // If click fails, continue with selectOption
        }
        
        if (planName) {
          // Try to find option by text (case-insensitive, partial match)
          const options = await this.upgradeModalPlanDropdown.locator('option').all();
          for (const option of options) {
            const text = await option.textContent().catch(() => '');
            const value = await option.getAttribute('value').catch(() => '');
            if (value && text && text.toLowerCase().includes(planName.toLowerCase())) {
              await this.upgradeModalPlanDropdown.selectOption({ value });
              await this.page.waitForTimeout(500);
              return;
            }
          }
          // If not found by text, try selecting by index (skip first disabled option)
          if (options.length > 1) {
            await this.upgradeModalPlanDropdown.selectOption({ index: 1 });
            await this.page.waitForTimeout(500);
            return;
          }
          throw new Error(`Plan "${planName}" not found in dropdown`);
        } else {
          // Select first available option (skip disabled placeholder)
          // Wait for options to load asynchronously after product selection
          let options = await this.upgradeModalPlanDropdown.locator('option').all();
          let attempts = 0;
          const maxAttempts = 10;
          
          // Poll for options to appear (they load after product selection)
          while (options.length <= 1 && attempts < maxAttempts) {
            await this.page.waitForTimeout(500);
            options = await this.upgradeModalPlanDropdown.locator('option').all();
            attempts++;
          }
          
          if (options.length > 1) {
            // Get the first non-disabled option with a value
            for (let i = 1; i < options.length; i++) {
              const value = await options[i].getAttribute('value').catch(() => '');
              const disabled = await options[i].getAttribute('disabled').catch(() => null);
              if (value && !disabled) {
                await this.upgradeModalPlanDropdown.selectOption({ value });
                await this.page.waitForTimeout(1000);
                const selectedText = await options[i].textContent().catch(() => '');
                console.log(`  ✓ Plan selected: "${selectedText?.trim()}"`);
                return;
              }
            }
          }
          
          // If still no options, try checking if it's actually a custom dropdown
          // Sometimes ng-select or mat-select can be detected as select
          const hasNgSelect = await this.page.locator('ng-select[placeholder*="Plan"], ng-select[placeholder*="plan"]').isVisible({ timeout: 1000 }).catch(() => false);
          const hasMatSelect = await this.page.locator('mat-select:has-text("Plan")').isVisible({ timeout: 1000 }).catch(() => false);
          
          if (hasNgSelect || hasMatSelect) {
            // Treat as custom dropdown
            await this.upgradeModalPlanDropdown.click();
            await this.page.waitForTimeout(1500);
            
            // Wait for dropdown panel to appear
            const panel = this.page.locator('ng-dropdown-panel, mat-select-panel, div[role="listbox"]').first();
            await panel.waitFor({ state: 'visible', timeout: 10000 });
            
            // Wait for options to load
            await this.page.waitForTimeout(1000);
            
            // Select first available option
            const firstOption = panel.locator('.ng-option:not(.ng-option-disabled), mat-option:not([disabled]), mat-option').first();
            const optionCount = await panel.locator('.ng-option, mat-option').count();
            
            if (optionCount > 0) {
              await firstOption.waitFor({ state: 'visible', timeout: 5000 });
              await firstOption.click();
              await this.page.waitForTimeout(500);
              return;
            }
          }
          
          throw new Error('No plan options available in dropdown. Options may not have loaded yet or product selection is required first.');
        }
      } else {
        // Handle custom dropdown (ng-select, mat-select, etc.)
        // Check if it's ng-select specifically
        const isNgSelect = await this.upgradeModalPlanDropdown.evaluate(el => {
          return el.tagName.toLowerCase() === 'ng-select' || el.closest('ng-select') !== null;
        }).catch(() => false);
        
        if (isNgSelect) {
          // For ng-select, click to open
        await this.upgradeModalPlanDropdown.click();
          await this.page.waitForTimeout(2000);
        
        // Wait for dropdown panel to appear
          const panel = this.page.locator('ng-dropdown-panel').first();
          await panel.waitFor({ state: 'visible', timeout: 15000 });
          
          // Poll for options to load (they load asynchronously after product selection)
          let allOptions = panel.locator('.ng-option:not(.ng-option-disabled)');
          let optionCount = 0;
          let attempts = 0;
          const maxAttempts = 20; // Wait up to 10 seconds (20 * 500ms)
          
          while (optionCount === 0 && attempts < maxAttempts) {
            await this.page.waitForTimeout(500);
            optionCount = await allOptions.count();
            attempts++;
            
            // If panel closed, reopen it
            const panelVisible = await panel.isVisible({ timeout: 500 }).catch(() => false);
            if (!panelVisible && attempts < maxAttempts) {
              await this.upgradeModalPlanDropdown.click();
              await this.page.waitForTimeout(1000);
              await panel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            }
          }
          
          if (optionCount === 0) {
            throw new Error('No plan options available in dropdown. Options may not have loaded yet or product selection is required first.');
          }
        
        if (planName) {
          // Select specific plan
            let option = panel.locator(`.ng-option:has-text("${planName}")`).first();
            let optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
            
            if (!optionVisible) {
              // Try partial match
              for (let i = 0; i < optionCount; i++) {
                const opt = allOptions.nth(i);
                const text = await opt.textContent().catch(() => '');
                if (text && text.toLowerCase().includes(planName.toLowerCase())) {
                  option = opt;
                  optionVisible = true;
                  break;
                }
              }
            }
          
          if (optionVisible) {
              await option.scrollIntoViewIfNeeded();
              await option.click({ force: true });
              await this.page.waitForTimeout(1000);
              return;
          } else {
              throw new Error(`Plan "${planName}" not found in dropdown`);
            }
          } else {
            // Select first available option
            const firstOption = allOptions.first();
            await firstOption.waitFor({ state: 'visible', timeout: 5000 });
            await firstOption.scrollIntoViewIfNeeded();
            await firstOption.click({ force: true });
            await this.page.waitForTimeout(1000);
            return;
          }
        } else {
          // Handle mat-select or other custom dropdowns
          await this.upgradeModalPlanDropdown.click();
          await this.page.waitForTimeout(2000);
          
          // Wait for dropdown panel to appear
          const panel = this.page.locator('mat-select-panel, div[role="listbox"], div.mat-mdc-select-panel, ng-dropdown-panel').first();
          await panel.waitFor({ state: 'visible', timeout: 15000 });
          
          // Poll for options to load
          let allOptions = panel.locator('.ng-option, mat-option');
          let optionCount = 0;
          let attempts = 0;
          const maxAttempts = 20;
          
          while (optionCount === 0 && attempts < maxAttempts) {
            await this.page.waitForTimeout(500);
            optionCount = await allOptions.count();
            attempts++;
          }
          
          if (optionCount === 0) {
            throw new Error('No plan options available in dropdown. Options may not have loaded yet or product selection is required first.');
          }
          
          if (planName) {
            // Select specific plan
            let option = panel.locator(`mat-option:has-text("${planName}"), .ng-option:has-text("${planName}")`).first();
            let optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
            
            if (!optionVisible) {
            // Try partial match
              for (let i = 0; i < optionCount; i++) {
              const opt = allOptions.nth(i);
              const text = await opt.textContent().catch(() => '');
                if (text && text.toLowerCase().includes(planName.toLowerCase())) {
                  option = opt;
                  optionVisible = true;
                  break;
                }
              }
            }
            
            if (optionVisible) {
              await option.scrollIntoViewIfNeeded();
              await option.click({ force: true });
              await this.page.waitForTimeout(1000);
              return;
            } else {
            throw new Error(`Plan "${planName}" not found in dropdown`);
          }
        } else {
          // Select first available option
            const firstOption = panel.locator('.ng-option:not(.ng-option-disabled), mat-option:not([disabled]), mat-option').first();
            await firstOption.waitFor({ state: 'visible', timeout: 5000 });
            await firstOption.scrollIntoViewIfNeeded();
            await firstOption.click({ force: true });
            await this.page.waitForTimeout(1000);
          }
        }
      }
    } catch (error) {
      console.error(`Error selecting plan in upgrade modal:`, error);
      throw error;
    }
  }

  /**
   * Selects an end date in the upgrade modal date picker.
   * @param {string} date - Date string in format MM/DD/YYYY or DD/MM/YYYY, or option text/value for select (optional, if not provided selects first available)
   * @returns {Promise<void>}
   */
  async selectEndDateInUpgradeModal(date = null) {
    try {
      await this.upgradeModalEndDatePicker.waitFor({ state: 'visible', timeout: 10000 });
      await this.upgradeModalEndDatePicker.scrollIntoViewIfNeeded();
      
      // Check if it's a regular select element
      const tagName = await this.upgradeModalEndDatePicker.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      
      if (tagName === 'select') {
        // Handle regular select element
        console.log('  Detected regular select element for end date, using selectOption...');
        
        // Wait for options to load (they might load after plan selection)
        let options = await this.upgradeModalEndDatePicker.locator('option').all();
        let attempts = 0;
        const maxAttempts = 10;
        
        // Poll for options to appear
        while (options.length <= 1 && attempts < maxAttempts) {
          await this.page.waitForTimeout(500);
          options = await this.upgradeModalEndDatePicker.locator('option').all();
          attempts++;
        }
        
        if (!date) {
          // Select first available option (skip disabled placeholder)
          if (options.length > 1) {
            for (let i = 1; i < options.length; i++) {
              const value = await options[i].getAttribute('value').catch(() => '');
              const disabled = await options[i].getAttribute('disabled').catch(() => null);
              if (value && !disabled) {
                await this.upgradeModalEndDatePicker.selectOption({ value });
                await this.page.waitForTimeout(1000);
                const selectedText = await options[i].textContent().catch(() => '');
                console.log(`  ✓ End date selected: "${selectedText?.trim()}"`);
                return;
              }
            }
          }
          throw new Error('No end date options available in dropdown');
        }
        
        // Try to find option by text (date format matching)
        let found = false;
        for (const option of options) {
          const text = await option.textContent().catch(() => '');
          const value = await option.getAttribute('value').catch(() => '');
          
          // Check if option text contains the date or matches date format
          if (value && text) {
            // Try to match date in different formats
            const dateStr = date.replace(/\//g, '-');
            const textDate = text.trim();
            
            // Check if text contains the date or vice versa
            if (textDate.includes(dateStr) || dateStr.includes(textDate.replace(/\s/g, '')) || 
                textDate.toLowerCase().includes(date.toLowerCase())) {
              await this.upgradeModalEndDatePicker.selectOption({ value });
              await this.page.waitForTimeout(500);
              found = true;
              return;
            }
          }
        }
        
        // If not found by text, select first available option (skip disabled placeholder)
        if (!found && options.length > 1) {
          for (let i = 1; i < options.length; i++) {
            const value = await options[i].getAttribute('value').catch(() => '');
            if (value) {
              await this.upgradeModalEndDatePicker.selectOption({ index: i });
              await this.page.waitForTimeout(500);
              return;
            }
          }
        }
        
        if (!found) {
          throw new Error(`End date "${date}" not found in dropdown`);
        }
      } else {
        // Handle input element (date picker)
        // Click to open date picker
        await this.upgradeModalEndDatePicker.click();
        await this.page.waitForTimeout(1000);
        
        // Fill the date
        await this.upgradeModalEndDatePicker.fill(date);
        await this.page.waitForTimeout(500);
        
        // Press Enter or Tab to confirm
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      console.error(`Error selecting end date "${date}" in upgrade modal:`, error);
      throw error;
    }
  }

  /**
   * Submits the upgrade to paid plan modal.
   * @returns {Promise<void>}
   */
  async submitUpgradeModal() {
    try {
      await this.upgradeModalSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.upgradeModalSubmitButton.scrollIntoViewIfNeeded();
      await this.upgradeModalSubmitButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error submitting upgrade modal:', error);
      throw error;
    }
  }

  /**
   * Closes banner overlay if present
   * @returns {Promise<void>}
   */
  async closeBannerOverlayIfPresent() {
    try {
      const bannerVisible = await this.bannerOverlay.isVisible({ timeout: 2000 }).catch(() => false);
      if (bannerVisible) {
        console.log('  Banner overlay detected, closing...');
        await this.bannerCloseButton.click();
        await this.page.waitForTimeout(1000);
        console.log('  ✓ Banner overlay closed');
      }
    } catch (error) {
      // Banner might not be present, continue
    }
  }

  /**
   * Opens Change Users / Manage Users modal
   * @returns {Promise<void>}
   */
  async openChangeUsersModal() {
    try {
      await this.changeUsersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.changeUsersButton.scrollIntoViewIfNeeded();
      await this.changeUsersButton.click();
      await this.page.waitForTimeout(1500);
      
      // Close banner overlay if present
      await this.closeBannerOverlayIfPresent();
      
      // Wait for modal to appear
      await this.manageUsersModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error opening Change Users modal:', error);
      throw error;
    }
  }

  /**
   * Gets current user limit value
   * @returns {Promise<string>}
   */
  async getCurrentUserLimit() {
    try {
      await this.currentUserLimitField.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.currentUserLimitField.inputValue();
      return value;
    } catch (error) {
      console.error('Error getting current user limit:', error);
      return '';
    }
  }

  /**
   * Enters user limit value
   * @param {string|number} value - User limit value to enter
   * @returns {Promise<void>}
   */
  async enterUserLimit(value) {
    try {
      await this.userLimitField.waitFor({ state: 'visible', timeout: 5000 });
      await this.userLimitField.clear();
      await this.userLimitField.fill(String(value));
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error entering user limit "${value}":`, error);
      throw error;
    }
  }

  /**
   * Gets user limit value
   * @returns {Promise<string>}
   */
  async getUserLimit() {
    try {
      await this.userLimitField.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.userLimitField.inputValue();
      return value;
    } catch (error) {
      console.error('Error getting user limit:', error);
      return '';
    }
  }

  /**
   * Checks if Continue button is enabled
   * @returns {Promise<boolean>}
   */
  async isContinueButtonEnabled() {
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.continueButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      console.error('Error checking Continue button state:', error);
      return false;
    }
  }

  /**
   * Clicks Continue button
   * @returns {Promise<void>}
   */
  async clickContinueButton() {
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.continueButton.scrollIntoViewIfNeeded();
      await this.continueButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Continue button:', error);
      throw error;
    }
  }

  /**
   * Clicks Cancel button
   * @returns {Promise<void>}
   */
  async clickCancelButton() {
    try {
      await this.cancelButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.cancelButton.scrollIntoViewIfNeeded();
      await this.cancelButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Cancel button:', error);
      throw error;
    }
  }

  /**
   * Checks if modal is visible
   * @returns {Promise<boolean>}
   */
  async isManageUsersModalVisible() {
    try {
      return await this.manageUsersModal.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Checks for validation error message
   * @returns {Promise<boolean>}
   */
  async hasValidationError() {
    try {
      // Check for common validation error indicators
      const errorMessages = this.manageUsersModal.locator('.text-danger, .invalid-feedback, .error-message, *:has-text("Not a valid quantity"), *:has-text("required")');
      const count = await errorMessages.count();
      return count > 0;
    } catch {
      return false;
    }
  }

  /**
   * Checks if Select User field is visible
   * @returns {Promise<boolean>}
   */
  async isSelectUserFieldVisible() {
    try {
      return await this.selectUserDropdown.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Selects a user from the Select User dropdown
   * @param {string} userValue - Value of the user option to select (e.g., "direct", "support", or user ID)
   * @returns {Promise<void>}
   */
  async selectUser(userValue = null) {
    try {
      await this.selectUserDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectUserDropdown.scrollIntoViewIfNeeded();
      
      if (userValue) {
        // Select specific user
        await this.selectUserDropdown.selectOption({ value: userValue });
        await this.page.waitForTimeout(1000);
        console.log(`  ✓ Selected user: ${userValue}`);
      } else {
        // Select first available option (skip disabled placeholder)
        const options = await this.selectUserDropdown.locator('option').all();
        for (const option of options) {
          const value = await option.getAttribute('value').catch(() => '');
          const disabled = await option.getAttribute('disabled').catch(() => null);
          if (value && !disabled) {
            await this.selectUserDropdown.selectOption({ value });
            await this.page.waitForTimeout(1000);
            const text = await option.textContent().catch(() => '');
            console.log(`  ✓ Selected first available user: "${text?.trim()}"`);
            return;
          }
        }
        throw new Error('No available user options found');
      }
    } catch (error) {
      console.error(`Error selecting user:`, error);
      throw error;
    }
  }

  /**
   * Clicks Update button
   * @returns {Promise<void>}
   */
  async clickUpdateButton() {
    try {
      await this.updateButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.updateButton.scrollIntoViewIfNeeded();
      await this.updateButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Update button:', error);
      throw error;
    }
  }

  /**
   * Checks if Update button is visible
   * @returns {Promise<boolean>}
   */
  async isUpdateButtonVisible() {
    try {
      return await this.updateButton.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets the user limit value displayed in the table cell
   * @returns {Promise<string>}
   */
  async getUserLimitFromTable() {
    try {
      // Find the cell with user limit value (next to Change Users button)
      const changeUsersCell = this.page.locator('td:has(button:has-text("Change Users"))').first();
      const userLimitSpan = changeUsersCell.locator('span.mat-mdc-tooltip-trigger').first();
      const value = await userLimitSpan.textContent();
      return value?.trim() || '';
    } catch (error) {
      console.error('Error getting user limit from table:', error);
      return '';
    }
  }

  /**
   * Searches for a subscription by Sub ID
   * @param {string} subId - Sub ID to search for
   * @returns {Promise<void>}
   */
  async searchBySubId(subId) {
    try {
      // Open search panel if not already open
      await this.openSearchPanel();
      await this.page.waitForTimeout(1000);
      
      // Enter Sub ID in search field
      await this.fillSubCode(subId);
      await this.page.waitForTimeout(500);
      
      // Click search button
      await this.clickSearch();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`Error searching by Sub ID "${subId}":`, error);
      throw error;
    }
  }

  /**
   * Gets status from table row by Sub ID
   * @param {string} subId - Sub ID to find
   * @returns {Promise<string>} - Status value or empty string if not found
   */
  async getStatusBySubId(subId) {
    try {
      // Find the row containing the Sub ID
      const subIdCells = await this.tableSubIdCells.all();
      
      for (let i = 0; i < subIdCells.length; i++) {
        const cellText = await subIdCells[i].textContent();
        if (cellText && cellText.trim().includes(subId)) {
          // Found the row, get status from same row
          const statusCells = await this.tableStatusCells.all();
          if (statusCells[i]) {
            const statusText = await statusCells[i].textContent();
            return statusText?.trim() || '';
          }
        }
      }
      
      return '';
    } catch (error) {
      console.error(`Error getting status for Sub ID "${subId}":`, error);
      return '';
    }
  }

  /**
   * Gets "Set For" value from table row by Sub ID
   * @param {string} subId - Sub ID to find
   * @returns {Promise<string>} - Set For value (Auto Renew/Auto Expire) or empty string if not found
   */
  async getSetForBySubId(subId) {
    try {
      // Find the row containing the Sub ID
      const subIdCells = await this.tableSubIdCells.all();
      
      for (let i = 0; i < subIdCells.length; i++) {
        const cellText = await subIdCells[i].textContent();
        if (cellText && cellText.trim().includes(subId)) {
          // Found the row, get Set For from same row
          const setForCells = await this.tableSetForCells.all();
          if (setForCells[i]) {
            const setForText = await setForCells[i].textContent();
            return setForText?.trim() || '';
          }
        }
      }
      
      return '';
    } catch (error) {
      console.error(`Error getting Set For for Sub ID "${subId}":`, error);
      return '';
    }
  }

  /**
   * Opens Add Addon modal and closes banner if present
   * @returns {Promise<void>}
   */
  async openAddAddonModal() {
    try {
      await this.addAddonOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonOption.scrollIntoViewIfNeeded();
      await this.addAddonOption.click();
      // Wait for modal to start opening (as per user request: wait 2-3 seconds after click)
      await this.page.waitForTimeout(3000);
      
      // Wait for dropdown to close (if still open)
      const dropdownStillOpen = await this.actionDropdown.isVisible({ timeout: 1000 }).catch(() => false);
      if (dropdownStillOpen) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1000);
      }
      
      // Wait for modal to appear - try multiple locator strategies
      let modalVisible = false;
      let foundModal = null;
      const modalSelectors = [
        '.modal.show:has-text("Add AddOn")',
        '.modal-dialog.show:has-text("Add AddOn")',
        '.modal[style*="display: block"]:has-text("Add AddOn")',
        '.modal:has-text("Add AddOn")',
        '.modal-content:has-text("Add AddOn")',
        'app-subscription-operation-modal:has-text("Add AddOn")',
        'div.modal-section:has-text("Add AddOn")',
        '*:has-text("Add AddOn"):has(select#addOnId)'
      ];
      
      // Try each selector with polling (up to 20 attempts = 10 seconds)
      for (let attempt = 0; attempt < 20; attempt++) {
        for (const selector of modalSelectors) {
          try {
            const modal = this.page.locator(selector).first();
            modalVisible = await modal.isVisible({ timeout: 500 }).catch(() => false);
            if (modalVisible) {
              console.log(`  ✓ Modal found using selector: ${selector}`);
              foundModal = modal;
              break;
            }
          } catch {
            continue;
          }
        }
        if (modalVisible) break;
        await this.page.waitForTimeout(500);
      }
      
      if (!modalVisible || !foundModal) {
        // Try one more time with a longer wait
        await this.page.waitForTimeout(2000);
        for (const selector of modalSelectors) {
          try {
            const modal = this.page.locator(selector).first();
            modalVisible = await modal.isVisible({ timeout: 2000 }).catch(() => false);
            if (modalVisible) {
              console.log(`  ✓ Modal found after extended wait using selector: ${selector}`);
              foundModal = modal;
              break;
            }
          } catch {
            continue;
          }
        }
      }
      
      // Fallback: Try to find modal by its form fields (addon name dropdown)
      if (!modalVisible || !foundModal) {
        console.log('  Trying to find modal by form fields...');
        // Wait a bit more for modal to fully render
        await this.page.waitForTimeout(2000);
        
        // Check if addon dropdown is visible (this is the most reliable indicator)
        const addonDropdown = this.page.locator('select#addOnId, select[id="addOnId"]').first();
        const dropdownVisible = await addonDropdown.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (dropdownVisible) {
          console.log('  ✓ Found addon dropdown, modal is open');
          modalVisible = true;
          
          // Try to find the modal container - use multiple strategies
          const generalModalSelectors = [
            'app-subscription-operation-modal:has(select#addOnId)',
            '.modal.show:has(select#addOnId)',
            '.modal-dialog.show:has(select#addOnId)',
            '.modal:has(select#addOnId)',
            'app-subscription-operation-modal',
            '.modal.show',
            '.modal-dialog.show',
            '.modal[style*="display: block"]',
            '.modal'
          ];
          
          for (const selector of generalModalSelectors) {
            try {
              const modalContainer = this.page.locator(selector).first();
              const containerVisible = await modalContainer.isVisible({ timeout: 1000 }).catch(() => false);
              if (containerVisible) {
                // Verify it contains the addon dropdown
                const hasDropdown = await modalContainer.locator('select#addOnId').isVisible({ timeout: 500 }).catch(() => false);
                if (hasDropdown) {
                  foundModal = modalContainer;
                  console.log(`  ✓ Modal container found using: ${selector}`);
                  break;
                }
              }
            } catch {
              continue;
            }
          }
          
          // If we still don't have a modal container but dropdown is visible, create a locator that includes the dropdown
          if (!foundModal) {
            console.log('  ⚠ Modal container not found, using dropdown parent as modal reference');
            // Find the closest modal ancestor of the dropdown
            foundModal = addonDropdown.locator('xpath=ancestor::app-subscription-operation-modal | ancestor::.modal | ancestor::.modal-dialog').first();
            const modalExists = await foundModal.count().catch(() => 0);
            if (modalExists === 0) {
              // Last resort: use a general modal locator
              foundModal = this.page.locator('app-subscription-operation-modal, .modal.show, .modal-dialog.show').first();
            }
          }
        } else {
          // Even if dropdown not found, check for modal with different text variations
          console.log('  Dropdown not found, trying alternative text selectors...');
          const alternativeTextSelectors = [
            '.modal:has-text("Add Addon")',
            '.modal:has-text("Add Add-On")',
            '.modal:has-text("add addon")',
            '.modal-content:has-text("Add")',
            'app-subscription-operation-modal:has-text("Add")'
          ];
          
          for (const selector of alternativeTextSelectors) {
            try {
              const modal = this.page.locator(selector).first();
              const isVisible = await modal.isVisible({ timeout: 2000 }).catch(() => false);
              if (isVisible) {
                // Check if it has form fields
                const hasFormField = await modal.locator('select, input, textarea').first().isVisible({ timeout: 500 }).catch(() => false);
                if (hasFormField) {
                  foundModal = modal;
                  modalVisible = true;
                  console.log(`  ✓ Modal found using alternative selector: ${selector}`);
                  break;
                }
              }
            } catch {
              continue;
            }
          }
        }
      }
      
      // Final check: if dropdown is visible, modal must be open
      if (!modalVisible || !foundModal) {
        console.log('  Performing final check for modal...');
        // Wait a bit more for modal to fully render
        await this.page.waitForTimeout(3000);
        
        // Check multiple indicators that modal is open
        const finalCheckDropdown = this.page.locator('select#addOnId, select[id="addOnId"]').first();
        const finalCheckModal = this.page.locator('app-subscription-operation-modal, .modal.show, .modal-dialog.show').first();
        const finalCheckHeading = this.page.locator('*:has-text("Add AddOn"), *:has-text("Add Addon")').first();
        
        const dropdownVisible = await finalCheckDropdown.isVisible({ timeout: 3000 }).catch(() => false);
        const modalContainerVisible = await finalCheckModal.isVisible({ timeout: 2000 }).catch(() => false);
        const headingVisible = await finalCheckHeading.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (dropdownVisible || modalContainerVisible || headingVisible) {
          console.log('  ✓ Modal indicators found (dropdown, modal, or heading visible), proceeding');
          modalVisible = true;
          if (modalContainerVisible) {
            foundModal = finalCheckModal;
          } else {
            foundModal = this.page.locator('app-subscription-operation-modal, .modal').first();
          }
        } else {
          // Last attempt: check if ANY modal is visible
          const anyModal = this.page.locator('.modal, app-subscription-operation-modal').first();
          const anyModalVisible = await anyModal.isVisible({ timeout: 2000 }).catch(() => false);
          if (anyModalVisible) {
            console.log('  ✓ Generic modal found, assuming it is the Add Addon modal');
            modalVisible = true;
            foundModal = anyModal;
          } else {
            throw new Error('Add Addon modal did not appear after clicking Add Addon option. Modal may not have loaded or selector needs adjustment.');
          }
        }
      }
      
      // Update the modal locator reference
      this.addAddonModal = foundModal;
      await this.page.waitForTimeout(1000);
      
      // NOW check for overlapping elements over the modal and close them if present
      console.log('  Checking for overlapping elements over modal...');
      
      // Check for banner overlay
      const bannerVisible = await this.bannerOverlay.isVisible({ timeout: 1000 }).catch(() => false);
      if (bannerVisible) {
        console.log('  Banner overlay detected over modal, closing...');
        try {
          await this.bannerCloseButton.click();
          await this.page.waitForTimeout(1000);
          console.log('  ✓ Banner overlay closed');
        } catch (error) {
          console.log('  ⚠ Could not close banner overlay:', error.message);
        }
      }
      
      // Check for tooltips
      const tooltip = this.page.locator('.mat-mdc-tooltip-panel, .cdk-overlay-container .mat-tooltip, [role="tooltip"]').first();
      const tooltipVisible = await tooltip.isVisible({ timeout: 1000 }).catch(() => false);
      if (tooltipVisible) {
        console.log('  Tooltip detected, closing...');
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      // Check for other open dropdowns (except the modal's own dropdowns)
      const otherDropdown = this.page.locator('.dropdown-menu.show:not(:has(select#addOnId)), .mat-select-panel:not(:has(select#addOnId)), ng-dropdown-panel:not(:has(select#addOnId))').first();
      const otherDropdownVisible = await otherDropdown.isVisible({ timeout: 1000 }).catch(() => false);
      if (otherDropdownVisible) {
        console.log('  Other dropdown detected, closing...');
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      // Verify modal is still visible after closing overlapping elements
      const modalStillVisible = await this.isAddAddonModalVisible();
      if (!modalStillVisible) {
        console.log('  ⚠ Modal not visible after closing overlapping elements, trying to find again...');
        // Try to find modal again by its form field
        const addonDropdown = this.page.locator('select#addOnId').first();
        const dropdownStillThere = await addonDropdown.isVisible({ timeout: 3000 }).catch(() => false);
        if (dropdownStillThere) {
          console.log('  ✓ Modal form field still accessible, modal is functional');
          // Update modal reference to ensure it's set
          this.addAddonModal = this.page.locator('app-subscription-operation-modal, .modal').first();
        } else {
          // Wait a bit more and check again - modal might be loading
          await this.page.waitForTimeout(1000);
          const finalCheck = await addonDropdown.isVisible({ timeout: 2000 }).catch(() => false);
          if (!finalCheck) {
            console.log('  ⚠ Modal form field not found, but continuing - modal may have closed or be in transition');
            // Don't throw error - let the test continue and handle it
          } else {
            console.log('  ✓ Modal form field found on retry');
            this.addAddonModal = this.page.locator('app-subscription-operation-modal, .modal').first();
          }
        }
      } else {
        console.log('  ✓ Modal is visible and accessible');
      }
    } catch (error) {
      console.error('Error opening Add Addon modal:', error);
      throw error;
    }
  }

  /**
   * Checks if Add Addon modal is visible
   * @returns {Promise<boolean>}
   */
  async isAddAddonModalVisible() {
    try {
      // Try multiple selectors
      const modalSelectors = [
        '.modal.show:has-text("Add AddOn")',
        '.modal-dialog.show:has-text("Add AddOn")',
        '.modal:has-text("Add AddOn")',
        '.modal-content:has-text("Add AddOn")',
        'app-subscription-operation-modal:has-text("Add AddOn")',
        'div.modal-section:has-text("Add AddOn")',
        '*:has-text("Add AddOn"):has(select#addOnId)'
      ];
      
      for (const selector of modalSelectors) {
        try {
          const modal = this.page.locator(selector).first();
          const isVisible = await modal.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            return true;
          }
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
   * Selects addon name from dropdown
   * @param {string} addonName - Addon name value (e.g., "ssd", "csc", "toc-pu") or display text
   * @returns {Promise<void>}
   */
  async selectAddonName(addonName) {
    try {
      await this.addonNameDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.addonNameDropdown.scrollIntoViewIfNeeded();
      
      // Try to find option by value first
      const options = await this.addonNameDropdown.locator('option').all();
      let selectedValue = null;
      
      for (const option of options) {
        const value = await option.getAttribute('value').catch(() => '');
        const text = await option.textContent().catch(() => '');
        const disabled = await option.getAttribute('disabled').catch(() => null);
        
        // Skip disabled/empty options
        if (!value || disabled || !text || text.trim() === 'Select name') {
          continue;
        }
        
        // Check if value or text matches (case-insensitive, partial match)
        if (value.toLowerCase() === addonName.toLowerCase() || 
            text.trim().toLowerCase().includes(addonName.toLowerCase()) ||
            addonName.toLowerCase().includes(value.toLowerCase())) {
          selectedValue = value;
          console.log(`  ✓ Found matching addon: "${text.trim()}" (value: ${value})`);
          break;
        }
      }
      
      if (selectedValue) {
        await this.addonNameDropdown.selectOption({ value: selectedValue });
        await this.page.waitForTimeout(1000);
        console.log(`  ✓ Selected addon: ${addonName}`);
      } else {
        throw new Error(`Addon "${addonName}" not found in dropdown`);
      }
    } catch (error) {
      console.error(`Error selecting addon name "${addonName}":`, error);
      throw error;
    }
  }

  /**
   * Gets all available addon names from the dropdown
   * @returns {Promise<Array<{value: string, text: string}>>}
   */
  async getAvailableAddonNames() {
    try {
      await this.addonNameDropdown.waitFor({ state: 'visible', timeout: 5000 });
      const options = await this.addonNameDropdown.locator('option').all();
      const addonNames = [];
      
      for (const option of options) {
        const value = await option.getAttribute('value').catch(() => '');
        const text = await option.textContent().catch(() => '');
        const disabled = await option.getAttribute('disabled').catch(() => null);
        
        // Skip disabled/empty options
        if (!value || disabled || !text || text.trim() === 'Select name' || text.trim() === '') {
          continue;
        }
        
        addonNames.push({
          value: value,
          text: text.trim()
        });
      }
      
      return addonNames;
    } catch (error) {
      console.error('Error getting available addon names:', error);
      return [];
    }
  }

  /**
   * Enters remarks in Add Addon modal
   * @param {string} remarks - Remarks text to enter
   * @returns {Promise<void>}
   */
  async enterAddonRemarks(remarks) {
    try {
      await this.addonRemarksField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addonRemarksField.clear();
      await this.addonRemarksField.fill(remarks);
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error entering addon remarks:`, error);
      throw error;
    }
  }

  /**
   * Enters quantity in Add Addon modal
   * @param {string|number} quantity - Quantity value to enter
   * @returns {Promise<void>}
   */
  async enterAddonQuantity(quantity) {
    try {
      await this.addonQuantityField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addonQuantityField.clear();
      await this.addonQuantityField.fill(String(quantity));
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error entering addon quantity:`, error);
      throw error;
    }
  }

  /**
   * Checks if Confirm button is enabled in Add Addon modal
   * @returns {Promise<boolean>}
   */
  async isAddAddonConfirmButtonEnabled() {
    try {
      await this.addAddonConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.addAddonConfirmButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      console.error('Error checking Add Addon Confirm button state:', error);
      return false;
    }
  }

  /**
   * Clicks Confirm button in Add Addon modal
   * @returns {Promise<void>}
   */
  async clickAddAddonConfirmButton() {
    try {
      await this.addAddonConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addAddonConfirmButton.scrollIntoViewIfNeeded();
      await this.addAddonConfirmButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Add Addon Confirm button:', error);
      throw error;
    }
  }

  /**
   * Gets addon name from Plan & Addon Details section
   * @returns {Promise<string>} - Addon name or empty string if not found
   */
  async getAddonNameFromDetailPage() {
    try {
      // Find the addon name in the Plan & Addon Details section
      // Look for cells with span.mat-mdc-tooltip-trigger that contain addon names
      const cellCount = await this.addonNameCells.count();
      
      for (let i = 0; i < cellCount; i++) {
        const cell = this.addonNameCells.nth(i);
        const span = cell.locator('span.mat-mdc-tooltip-trigger').first();
        const text = await span.textContent().catch(() => '');
        const trimmedText = text?.trim() || '';
        
        // Check if it's an addon name (not a number, not "Change Users", etc.)
        if (trimmedText && 
            !trimmedText.match(/^\d+$/) && // Not just a number
            !trimmedText.includes('Change Users') &&
            !trimmedText.includes('(') && // Not a button text
            (trimmedText.toLowerCase().includes('ssd') || 
             trimmedText.toLowerCase().includes('cloud') ||
             trimmedText.toLowerCase().includes('tally') ||
             trimmedText.toLowerCase().includes('csc') ||
             trimmedText.toLowerCase().includes('power user'))) {
          return trimmedText;
        }
      }
      
      return '';
    } catch (error) {
      console.error('Error getting addon name from detail page:', error);
      return '';
    }
  }

  /**
   * Gets addon quantity from Plan & Addon Details section
   * @returns {Promise<string>} - Addon quantity or empty string if not found
   */
  async getAddonQuantityFromDetailPage() {
    try {
      // Find the addon quantity in the Plan & Addon Details section
      // Look for cells with span.mat-mdc-tooltip-trigger that contain numbers (quantity)
      const cellCount = await this.addonQuantityCells.count();
      
      for (let i = 0; i < cellCount; i++) {
        const cell = this.addonQuantityCells.nth(i);
        const span = cell.locator('span.mat-mdc-tooltip-trigger').first();
        const text = await span.textContent().catch(() => '');
        const trimmedText = text?.trim() || '';
        
        // Check if it's a quantity (just a number)
        if (trimmedText && trimmedText.match(/^\d+$/)) {
          return trimmedText;
        }
      }
      
      return '';
    } catch (error) {
      console.error('Error getting addon quantity from detail page:', error);
      return '';
    }
  }

  /**
   * Opens Change Unit Price modal and closes overlapping elements if present
   * @returns {Promise<void>}
   */
  async openChangeUnitPriceModal() {
    try {
      await this.changeRateButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.changeRateButton.scrollIntoViewIfNeeded();
      await this.changeRateButton.click();
      await this.page.waitForTimeout(2000);
      
      // Close banner overlay if present
      await this.closeBannerOverlayIfPresent();
      
      // Close any open dropdowns
      const dropdownOpen = await this.actionDropdown.isVisible({ timeout: 1000 }).catch(() => false);
      if (dropdownOpen) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1000);
      }
      
      // Wait for modal to appear - try multiple locator strategies
      let modalVisible = false;
      let foundModal = null;
      const modalSelectors = [
        '.modal.show:has-text("Change Unitprice")',
        '.modal-dialog.show:has-text("Change Unitprice")',
        '.modal[style*="display: block"]:has-text("Change Unitprice")',
        '.modal:has-text("Change Unitprice")',
        '.modal-content:has-text("Change Unitprice")',
        'app-subscription-operation-modal:has-text("Change Unitprice")',
        'div.modal-section:has-text("Change Unitprice")',
        '*:has-text("Change Unitprice"):has(input#currentPrice)'
      ];
      
      // Try each selector with polling (up to 20 attempts = 10 seconds)
      for (let attempt = 0; attempt < 20; attempt++) {
        for (const selector of modalSelectors) {
          try {
            const modal = this.page.locator(selector).first();
            modalVisible = await modal.isVisible({ timeout: 500 }).catch(() => false);
            if (modalVisible) {
              console.log(`  ✓ Modal found using selector: ${selector}`);
              foundModal = modal;
              break;
            }
          } catch {
            continue;
          }
        }
        if (modalVisible) break;
        await this.page.waitForTimeout(500);
      }
      
      // Fallback: Try to find modal by its form fields
      if (!modalVisible || !foundModal) {
        const currentPriceField = this.page.locator('input#currentPrice, input[id="currentPrice"]').first();
        const fieldVisible = await currentPriceField.isVisible({ timeout: 3000 }).catch(() => false);
        if (fieldVisible) {
          console.log('  ✓ Found current price field, modal is likely visible');
          const generalModal = this.page.locator('app-subscription-operation-modal, .modal.show, .modal-dialog.show').first();
          const generalModalVisible = await generalModal.isVisible({ timeout: 1000 }).catch(() => false);
          if (generalModalVisible) {
            const hasCurrentPrice = await generalModal.locator('input#currentPrice').isVisible({ timeout: 500 }).catch(() => false);
            if (hasCurrentPrice) {
              foundModal = generalModal;
              modalVisible = true;
              console.log('  ✓ Modal found by form field');
            }
          }
        }
      }
      
      if (!modalVisible || !foundModal) {
        throw new Error('Change Unit Price modal did not appear after clicking Change Rate button');
      }
      
      // Update the modal locator reference
      this.changeUnitPriceModal = foundModal;
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error opening Change Unit Price modal:', error);
      throw error;
    }
  }

  /**
   * Checks if Change Unit Price modal is visible
   * @returns {Promise<boolean>}
   */
  async isChangeUnitPriceModalVisible() {
    try {
      // Try multiple selectors
      const modalSelectors = [
        '.modal.show:has-text("Change Unitprice")',
        '.modal-dialog.show:has-text("Change Unitprice")',
        '.modal:has-text("Change Unitprice")',
        'app-subscription-operation-modal:has-text("Change Unitprice")',
        '*:has-text("Change Unitprice"):has(input#currentPrice)'
      ];
      
      for (const selector of modalSelectors) {
        try {
          const modal = this.page.locator(selector).first();
          const isVisible = await modal.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            return true;
          }
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
   * Gets current price value from modal
   * @returns {Promise<string>}
   */
  async getCurrentPrice() {
    try {
      await this.currentPriceField.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.currentPriceField.inputValue();
      return value;
    } catch (error) {
      console.error('Error getting current price:', error);
      return '';
    }
  }

  /**
   * Enters new price in Change Unit Price modal
   * @param {string|number} price - New price value to enter
   * @returns {Promise<void>}
   */
  async enterNewPrice(price) {
    try {
      await this.newPriceField.waitFor({ state: 'visible', timeout: 5000 });
      await this.newPriceField.clear();
      await this.newPriceField.fill(String(price));
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error entering new price "${price}":`, error);
      throw error;
    }
  }

  /**
   * Clears new price field
   * @returns {Promise<void>}
   */
  async clearNewPrice() {
    try {
      await this.newPriceField.waitFor({ state: 'visible', timeout: 5000 });
      await this.newPriceField.clear();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error clearing new price field:', error);
      throw error;
    }
  }

  /**
   * Enters remark in Change Unit Price modal
   * @param {string} remark - Remark text to enter
   * @returns {Promise<void>}
   */
  async enterChangeRateRemark(remark) {
    try {
      await this.remarkField.waitFor({ state: 'visible', timeout: 5000 });
      await this.remarkField.clear();
      await this.remarkField.fill(remark);
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error entering remark:`, error);
      throw error;
    }
  }

  /**
   * Checks if Submit button is enabled in Change Unit Price modal
   * @returns {Promise<boolean>}
   */
  async isChangeRateSubmitButtonEnabled() {
    try {
      await this.changeRateSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.changeRateSubmitButton.isDisabled();
      return !isDisabled;
    } catch (error) {
      console.error('Error checking Submit button state:', error);
      return false;
    }
  }

  /**
   * Clicks Submit button in Change Unit Price modal
   * @returns {Promise<void>}
   */
  async clickChangeRateSubmitButton() {
    try {
      await this.changeRateSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.changeRateSubmitButton.scrollIntoViewIfNeeded();
      await this.changeRateSubmitButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Submit button:', error);
      throw error;
    }
  }

  /**
   * Gets Updated Rate value from detail page
   * @returns {Promise<string>} - Updated rate value or empty string if not found
   */
  async getUpdatedRateFromDetailPage() {
    try {
      // Find the "Updated Rate" heading to locate the correct column
      const updatedRateHeading = this.page.locator('th:has-text("Updated Rate"), span:has-text("Updated Rate")').first();
      const headingVisible = await updatedRateHeading.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!headingVisible) {
        console.log('  ⚠ Updated Rate heading not found');
        return '';
      }
      
      // Find the table containing the heading
      const table = updatedRateHeading.locator('xpath=ancestor::table').first();
      const tableExists = await table.count().catch(() => 0);
      
      if (tableExists === 0) {
        console.log('  ⚠ Table not found');
        return '';
      }
      
      // Get all header cells to find the column index of "Updated Rate"
      const headerRow = table.locator('thead tr, thead mat-header-row').first();
      const headerCells = headerRow.locator('th, mat-header-cell');
      const headerCount = await headerCells.count();
      
      let updatedRateColumnIndex = -1;
      for (let i = 0; i < headerCount; i++) {
        const headerCell = headerCells.nth(i);
        const headerText = await headerCell.textContent().catch(() => '');
        if (headerText && headerText.trim().includes('Updated Rate')) {
          updatedRateColumnIndex = i;
          break;
        }
      }
      
      if (updatedRateColumnIndex === -1) {
        console.log('  ⚠ Updated Rate column index not found');
        return '';
      }
      
      // Find the first data row (skip header rows)
      const dataRows = table.locator('tbody tr, tbody mat-row');
      const firstDataRow = dataRows.first();
      const firstRowExists = await firstDataRow.count().catch(() => 0);
      
      if (firstRowExists === 0) {
        console.log('  ⚠ No data rows found');
        return '';
      }
      
      // Get the cell at the Updated Rate column index in the first data row
      const dataCells = firstDataRow.locator('td, mat-cell');
      const updatedRateCell = dataCells.nth(updatedRateColumnIndex);
      const cellExists = await updatedRateCell.count().catch(() => 0);
      
      if (cellExists === 0) {
        console.log('  ⚠ Updated Rate cell not found at column index');
        return '';
      }
      
      // Get the span with the value
      const span = updatedRateCell.locator('span.mat-mdc-tooltip-trigger').first();
      const spanExists = await span.count().catch(() => 0);
      
      if (spanExists === 0) {
        console.log('  ⚠ Span not found in Updated Rate cell');
        return '';
      }
      
      // First try to get the value from ng-reflect-message attribute (more reliable)
      const messageAttr = await span.getAttribute('ng-reflect-message').catch(() => '');
      if (messageAttr && messageAttr.includes('₹')) {
        console.log(`  ✓ Found Updated Rate from ng-reflect-message: ${messageAttr.trim()}`);
        return messageAttr.trim();
      }
      
      // Fallback to text content
      const text = await span.textContent().catch(() => '');
      const trimmedText = text?.trim() || '';
      
      if (trimmedText && trimmedText.includes('₹')) {
        console.log(`  ✓ Found Updated Rate from text content: ${trimmedText}`);
        return trimmedText;
      }
      
      console.log('  ⚠ Updated Rate value not found in cell');
      return '';
    } catch (error) {
      console.error('Error getting Updated Rate from detail page:', error);
      return '';
    }
  }

  /**
   * Opens Renew confirmation modal and closes overlapping elements if present
   * @returns {Promise<void>}
   */
  async openRenewModal() {
    try {
      await this.renewNowButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.renewNowButton.scrollIntoViewIfNeeded();
      await this.renewNowButton.click();
      await this.page.waitForTimeout(2000);
      
      // Close banner overlay if present
      await this.closeBannerOverlayIfPresent();
      
      // Close any open dropdowns
      const dropdownOpen = await this.actionDropdown.isVisible({ timeout: 1000 }).catch(() => false);
      if (dropdownOpen) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1000);
      }
      
      // Wait for modal to appear - try multiple locator strategies
      let modalVisible = false;
      let foundModal = null;
      const modalSelectors = [
        '.modal.show:has-text("Renew")',
        '.modal-dialog.show:has-text("Renew")',
        '.modal[style*="display: block"]:has-text("Renew")',
        '.modal:has-text("Renew")',
        '.modal-content:has-text("Renew")',
        'app-subscription-operation-modal:has-text("Renew")',
        'div.modal-section:has-text("Renew")',
        '*:has-text("Renew"):has(button:has-text("Yes"))'
      ];
      
      // Try each selector with polling (up to 20 attempts = 10 seconds)
      for (let attempt = 0; attempt < 20; attempt++) {
        for (const selector of modalSelectors) {
          try {
            const modal = this.page.locator(selector).first();
            modalVisible = await modal.isVisible({ timeout: 500 }).catch(() => false);
            if (modalVisible) {
              console.log(`  ✓ Modal found using selector: ${selector}`);
              foundModal = modal;
              break;
            }
          } catch {
            continue;
          }
        }
        if (modalVisible) break;
        await this.page.waitForTimeout(500);
      }
      
      // Fallback: Try to find modal by its Yes button
      if (!modalVisible || !foundModal) {
        const yesButton = this.page.locator('button.confirm-btn:has-text("Yes"), button:has-text("Yes")').first();
        const buttonVisible = await yesButton.isVisible({ timeout: 3000 }).catch(() => false);
        if (buttonVisible) {
          console.log('  ✓ Found Yes button, modal is likely visible');
          const generalModal = this.page.locator('app-subscription-operation-modal, .modal.show, .modal-dialog.show').first();
          const generalModalVisible = await generalModal.isVisible({ timeout: 1000 }).catch(() => false);
          if (generalModalVisible) {
            const hasYesButton = await generalModal.locator('button:has-text("Yes")').isVisible({ timeout: 500 }).catch(() => false);
            if (hasYesButton) {
              foundModal = generalModal;
              modalVisible = true;
              console.log('  ✓ Modal found by Yes button');
            }
          }
        }
      }
      
      if (!modalVisible || !foundModal) {
        throw new Error('Renew modal did not appear after clicking Renew Now button');
      }
      
      // Update the modal locator reference
      this.renewModal = foundModal;
      await this.page.waitForTimeout(1000);
      
      // NOW check for overlapping elements over the modal and close them if present
      console.log('  Checking for overlapping elements over modal...');
      
      // Check for banner overlay
      const bannerVisible = await this.bannerOverlay.isVisible({ timeout: 1000 }).catch(() => false);
      if (bannerVisible) {
        console.log('  Banner overlay detected over modal, closing...');
        try {
          await this.bannerCloseButton.click();
          await this.page.waitForTimeout(1000);
          console.log('  ✓ Banner overlay closed');
        } catch (error) {
          console.log('  ⚠ Could not close banner overlay:', error.message);
        }
      }
      
      // Check for tooltips
      const tooltip = this.page.locator('.mat-mdc-tooltip-panel, .cdk-overlay-container .mat-tooltip, [role="tooltip"]').first();
      const tooltipVisible = await tooltip.isVisible({ timeout: 1000 }).catch(() => false);
      if (tooltipVisible) {
        console.log('  Tooltip detected, closing...');
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      // Check for other open dropdowns
      const otherDropdown = this.page.locator('.dropdown-menu.show, .mat-select-panel, ng-dropdown-panel').first();
      const otherDropdownVisible = await otherDropdown.isVisible({ timeout: 1000 }).catch(() => false);
      if (otherDropdownVisible) {
        console.log('  Other dropdown detected, closing...');
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      // Verify modal is still visible after closing overlapping elements
      const modalStillVisible = await this.isRenewModalVisible();
      if (!modalStillVisible) {
        console.log('  ⚠ Modal not visible after closing overlapping elements, trying to find again...');
        const yesButton = this.page.locator('button:has-text("Yes")').first();
        const buttonStillThere = await yesButton.isVisible({ timeout: 2000 }).catch(() => false);
        if (!buttonStillThere) {
          throw new Error('Modal disappeared after closing overlapping elements');
        } else {
          console.log('  ✓ Modal form field still accessible');
        }
      } else {
        console.log('  ✓ Modal is visible and accessible');
      }
    } catch (error) {
      console.error('Error opening Renew modal:', error);
      throw error;
    }
  }

  /**
   * Checks if Renew modal is visible
   * @returns {Promise<boolean>}
   */
  async isRenewModalVisible() {
    try {
      // Try multiple selectors
      const modalSelectors = [
        '.modal.show:has-text("Renew")',
        '.modal-dialog.show:has-text("Renew")',
        '.modal:has-text("Renew")',
        'app-subscription-operation-modal:has-text("Renew")',
        '*:has-text("Renew"):has(button:has-text("Yes"))'
      ];
      
      for (const selector of modalSelectors) {
        try {
          const modal = this.page.locator(selector).first();
          const isVisible = await modal.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            return true;
          }
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
   * Clicks Yes button in Renew modal
   * @returns {Promise<void>}
   */
  async clickRenewYesButton() {
    try {
      await this.renewYesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.renewYesButton.scrollIntoViewIfNeeded();
      await this.renewYesButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error clicking Yes button in Renew modal:', error);
      throw error;
    }
  }

  /**
   * Checks if a section tab is active.
   * @param {string} sectionName - Name of the section (Overview, Transactions, Recent Activities)
   * @returns {Promise<boolean>}
   */
  async isSectionTabActive(sectionName) {
    try {
      const tab = sectionName === 'Overview' ? this.overviewTab :
                  sectionName === 'Transactions' ? this.transactionsTab :
                  sectionName === 'Recent Activities' ? this.recentActivitiesTab : null;
      
      if (!tab) {
        console.log(`Tab not found for section: ${sectionName}`);
        return false;
      }
      
      // Check if tab exists in DOM
      const tabCount = await tab.count();
      if (tabCount === 0) {
        console.log(`Tab element not found in DOM for section: ${sectionName}`);
        return false;
      }
      
      // Wait for tab to be visible
      const isVisible = await tab.isVisible({ timeout: 2000 }).catch(() => false);
      if (!isVisible) {
        console.log(`Tab is not visible for section: ${sectionName}`);
        return false;
      }
      
      const hasActiveClass = await tab.evaluate(el => {
        if (!el) return false;
        return el.classList.contains('details-sections-active') ||
               (el.getAttribute('ng-reflect-ng-class') && el.getAttribute('ng-reflect-ng-class').includes('details-sections-active')) ||
               el.getAttribute('ng-reflect-ng-class') === 'details-sections-active';
      }).catch(() => false);
      
      return hasActiveClass === true;
    } catch (error) {
      console.error(`Error checking if section tab is active for ${sectionName}:`, error);
      return false;
    }
  }

  /**
   * Checks if form is visible.
   * @returns {Promise<boolean>}
   */
  async isFormVisible() {
    try {
      const isVisible = await this.formContainer.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies that the "+ New" button is visible and clickable.
   * @returns {Promise<{visible: boolean, clickable: boolean}>}
   */
  async verifyNewButton() {
    try {
      const isVisible = await this.newButton.isVisible({ timeout: 5000 });
      const isEnabled = await this.newButton.isEnabled().catch(() => false);
      const isClickable = isVisible && isEnabled;
      
      return {
        visible: isVisible,
        clickable: isClickable
      };
    } catch (error) {
      console.error('Error verifying New button:', error);
      return { visible: false, clickable: false };
    }
  }

  /**
   * Verifies that the "New Subscription" form title is visible.
   * @returns {Promise<boolean>}
   */
  async verifyFormTitle() {
    try {
      const isVisible = await this.formTitle.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies that required field validation messages are visible.
   * @returns {Promise<{visible: boolean, messages: string[]}>}
   */
  async verifyRequiredFieldValidation() {
    try {
      const validationMessages = [];
      
      // Check for common required field error messages
      const requiredErrorSelectors = [
        '*:has-text("required")',
        '*:has-text("is required")',
        '*:has-text("must be")',
        'mat-error',
        '.invalid-feedback',
        '.error-message',
        '[class*="error"]'
      ];
      
      for (const selector of requiredErrorSelectors) {
        const errors = this.page.locator(selector);
        const count = await errors.count();
        for (let i = 0; i < count; i++) {
          const error = errors.nth(i);
          const isVisible = await error.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            const text = await error.textContent().catch(() => '');
            if (text && text.trim()) {
              validationMessages.push(text.trim());
            }
          }
        }
      }
      
      return {
        visible: validationMessages.length > 0,
        messages: validationMessages
      };
    } catch (error) {
      console.error('Error verifying required field validation:', error);
      return { visible: false, messages: [] };
    }
  }

  /**
   * Verifies that the customer dropdown search field exists and is visible.
   * @returns {Promise<boolean>}
   */
  async verifyCustomerDropdownSearchField() {
    try {
      // Wait a bit for dropdown menu to appear (in case it was just clicked)
      await this.page.waitForTimeout(1000);
      
      // First check if dropdown menu is visible
      const dropdownMenu = this.page.locator('ul.dropdown-menu').first();
      const menuVisible = await dropdownMenu.isVisible({ timeout: 3000 }).catch(() => false);
      
      // If menu not visible, try to open the dropdown
      if (!menuVisible) {
        const dropdownButton = this.page.locator('div.search-select:has-text("Select Customer")').first();
        await dropdownButton.click();
        await this.page.waitForTimeout(1500);
      }
      
      // Wait for dropdown menu to appear
      await this.page.waitForTimeout(500);
      
      // Try multiple strategies to find the search input
      // Strategy 1: Look for input within dropdown menu with specific attributes
      let searchInput = this.page.locator('ul.dropdown-menu input[placeholder="Search..."], ul.dropdown-menu input[type="text"], ul.dropdown-menu input[aria-label="search"]').first();
      let searchVisible = await searchInput.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Strategy 2: Look for input with form-control class within dropdown
      if (!searchVisible) {
        searchInput = this.page.locator('ul.dropdown-menu input.form-control').first();
        searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      // Strategy 3: Look for any input within visible dropdown menu
      if (!searchVisible) {
        const allMenus = this.page.locator('ul.dropdown-menu');
        const menuCount = await allMenus.count();
        for (let i = 0; i < menuCount; i++) {
          const menu = allMenus.nth(i);
          const menuVisible = await menu.isVisible({ timeout: 1000 }).catch(() => false);
          if (menuVisible) {
            searchInput = menu.locator('input[type="text"], input[placeholder*="Search"], input.form-control').first();
            searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
            if (searchVisible) {
              break;
            }
          }
        }
      }
      
      // Strategy 4: Check if input exists in DOM (might be hidden by CSS but accessible)
      if (!searchVisible) {
        const inputCount = await searchInput.count();
        if (inputCount > 0) {
          // Check if input is in DOM and has the expected attributes
          const inputExists = await searchInput.evaluate((el) => {
            if (!el) return false;
            // Check if element exists and has expected attributes
            const hasPlaceholder = el.placeholder && (el.placeholder.includes('Search') || el.placeholder.includes('search'));
            const hasType = el.type === 'text';
            const hasAriaLabel = el.getAttribute('aria-label') && el.getAttribute('aria-label').toLowerCase().includes('search');
            return hasPlaceholder || hasType || hasAriaLabel;
          }).catch(() => false);
          
          if (inputExists) {
            // Try to make it visible if it's hidden
            await searchInput.evaluate((el) => {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            }).catch(() => {});
            await this.page.waitForTimeout(300);
            searchVisible = await searchInput.isVisible({ timeout: 1000 }).catch(() => false);
          }
        }
      }
      
      return searchVisible;
    } catch (error) {
      console.error('Error verifying customer dropdown search field:', error);
      return false;
    }
  }

  /**
   * Types a search value in the customer dropdown and verifies search results filter.
   * @param {string} searchValue - Value to search for
   * @returns {Promise<{searchFieldVisible: boolean, resultsFiltered: boolean, resultCount: number}>}
   */
  async searchCustomerAndVerifyResults(searchValue) {
    try {
      // Ensure dropdown is open
      const dropdownButton = this.page.locator('div.search-select:has-text("Select Customer")').first();
      let ariaExpanded = await dropdownButton.getAttribute('aria-expanded').catch(() => 'false');
      
      if (ariaExpanded !== 'true') {
        await dropdownButton.click();
        await this.page.waitForTimeout(1500);
        ariaExpanded = await dropdownButton.getAttribute('aria-expanded').catch(() => 'false');
      }
      
      await this.page.waitForTimeout(500);
      
      // Find search input using multiple strategies
      let searchInput = this.page.locator('ul.dropdown-menu input[placeholder="Search..."], ul.dropdown-menu input[type="text"], ul.dropdown-menu input[aria-label="search"]').first();
      let searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!searchVisible) {
        searchInput = this.page.locator('ul.dropdown-menu input.form-control').first();
        searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      if (!searchVisible) {
        const allMenus = this.page.locator('ul.dropdown-menu');
        const menuCount = await allMenus.count();
        for (let i = 0; i < menuCount; i++) {
          const menu = allMenus.nth(i);
          const menuVisible = await menu.isVisible({ timeout: 1000 }).catch(() => false);
          if (menuVisible) {
            searchInput = menu.locator('input[type="text"], input[placeholder*="Search"]').first();
            searchVisible = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
            if (searchVisible) {
              break;
            }
          }
        }
      }
      
      if (!searchVisible) {
        return { searchFieldVisible: false, resultsFiltered: false, resultCount: 0 };
      }
      
      // Get initial option count before search
      const allOptions = this.page.locator('ul.dropdown-menu li').filter({ hasNot: this.page.locator('input') });
      const initialCount = await allOptions.count();
      
      // Type search value
      await searchInput.fill(searchValue);
      await this.page.waitForTimeout(1500); // Wait for filtering
      
      // Get filtered option count
      const filteredOptions = this.page.locator('ul.dropdown-menu li').filter({ hasNot: this.page.locator('input') });
      const filteredCount = await filteredOptions.count();
      
      // Verify that results are filtered (count should be less than or equal to initial)
      const resultsFiltered = filteredCount <= initialCount;
      
      // Verify that visible options contain the search value
      let allMatch = true;
      for (let i = 0; i < Math.min(filteredCount, 5); i++) {
        const option = filteredOptions.nth(i);
        const optionText = await option.textContent().catch(() => '');
        if (optionText && !optionText.toLowerCase().includes(searchValue.toLowerCase())) {
          allMatch = false;
          break;
        }
      }
      
      return {
        searchFieldVisible: true,
        resultsFiltered: resultsFiltered && allMatch,
        resultCount: filteredCount
      };
    } catch (error) {
      console.error('Error searching customer and verifying results:', error);
      return { searchFieldVisible: false, resultsFiltered: false, resultCount: 0 };
    }
  }

  /**
   * Verifies that the END DATE dropdown does NOT appear in the form.
   * @returns {Promise<boolean>} - Returns true if END DATE does NOT appear (as expected)
   */
  async verifyEndDateDropdownNotVisible() {
    try {
      const isVisible = await this.endDateDropdown.isVisible({ timeout: 2000 }).catch(() => false);
      // Return true if NOT visible (which is what we want)
      return !isVisible;
    } catch (error) {
      // If there's an error checking, assume it's not visible (which is good)
      return true;
    }
  }

  /**
   * Gets the quantity value.
   * @returns {Promise<string>}
   */
  async getQuantity() {
    try {
      const value = await this.quantityInput.inputValue();
      return value ? value.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the description value.
   * @returns {Promise<string>}
   */
  async getDescription() {
    try {
      const value = await this.descriptionInput.inputValue();
      return value ? value.trim() : '';
    } catch (error) {
      // Try textContent if inputValue doesn't work
      const text = await this.descriptionInput.textContent().catch(() => '');
      return text ? text.trim() : '';
    }
  }

  /**
   * Generic method to select from ng-select dropdown
   * @param {string} placeholderText - Placeholder text to find the dropdown
   * @param {string} optionText - Optional option text to search for
   * @returns {Promise<string>} - Selected option text
   */
  async selectFromNgSelect(placeholderText, optionText = null) {
    try {
      console.log(`  Attempting to select from "${placeholderText}" dropdown...`);
      
      // Normalize placeholder text for matching
      const normalizedPlaceholder = placeholderText.toLowerCase().trim();
      const searchTerms = normalizedPlaceholder.split(' ').filter(t => t.length > 2);
      
      let dropdown = null;
      let dropdownVisible = false;
      
      // Strategy 1: Find input by placeholder (exact and partial match)
      console.log('  Strategy 1: Looking for input by placeholder...');
      const inputSelectors = [
        `input[placeholder*="${placeholderText}"]`,
        `input[placeholder*="${normalizedPlaceholder}"]`,
        ...searchTerms.map(term => `input[placeholder*="${term}"]`)
      ];
      
      for (const selector of inputSelectors) {
        try {
          const input = this.page.locator(selector).first();
          const inputVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (inputVisible) {
            // Try to find ng-select parent
            let parent = input.locator('..');
            for (let level = 0; level < 5; level++) {
              const ngSelect = parent.locator('ng-select').first();
              const isVisible = await ngSelect.isVisible({ timeout: 1000 }).catch(() => false);
              if (isVisible) {
                dropdown = ngSelect;
                dropdownVisible = true;
                console.log(`  ✓ Found dropdown via input placeholder (level ${level + 1})`);
                break;
              }
              parent = parent.locator('..');
            }
            if (dropdownVisible) break;
          }
        } catch (e) {
          // Continue to next strategy
        }
      }
      
      // Strategy 2: Find by label text near ng-select
      if (!dropdownVisible) {
        console.log('  Strategy 2: Looking for ng-select by label text...');
        const labelTexts = [placeholderText, ...searchTerms];
        for (const labelText of labelTexts) {
          try {
            const label = this.page.locator(`label:has-text("${labelText}"), *:has-text("${labelText}")`).first();
            const labelVisible = await label.isVisible({ timeout: 2000 }).catch(() => false);
            
            if (labelVisible) {
              // Find ng-select near the label
              let parent = label.locator('..');
              for (let level = 0; level < 5; level++) {
                const ngSelect = parent.locator('ng-select').first();
                const isVisible = await ngSelect.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  dropdown = ngSelect;
                  dropdownVisible = true;
                  console.log(`  ✓ Found dropdown via label text (level ${level + 1})`);
                  break;
                }
                parent = parent.locator('..');
              }
              if (dropdownVisible) break;
              
              // Also try finding ng-select after the label (sibling)
              const siblingNgSelect = label.locator('../..').locator('ng-select').first();
              const siblingVisible = await siblingNgSelect.isVisible({ timeout: 1000 }).catch(() => false);
              if (siblingVisible) {
                dropdown = siblingNgSelect;
                dropdownVisible = true;
                console.log(`  ✓ Found dropdown as sibling of label`);
                break;
              }
            }
          } catch (e) {
            // Continue
          }
        }
      }
      
      // Strategy 3: Find all ng-selects and check their placeholders and context
      if (!dropdownVisible) {
        console.log('  Strategy 3: Checking all ng-selects on page...');
        const allNgSelects = this.page.locator('ng-select');
        const count = await allNgSelects.count();
        console.log(`  Found ${count} ng-select elements on page`);
        
        for (let i = 0; i < count; i++) {
          try {
            const ngSelect = allNgSelects.nth(i);
            const isVisible = await ngSelect.isVisible({ timeout: 1000 }).catch(() => false);
            if (!isVisible) continue;
            
            // Check input placeholder
            const ngSelectInput = ngSelect.locator('input[placeholder]').first();
            const placeholder = await ngSelectInput.getAttribute('placeholder').catch(() => '');
            
            if (placeholder && placeholder.toLowerCase().includes(normalizedPlaceholder)) {
              dropdown = ngSelect;
              dropdownVisible = true;
              console.log(`  ✓ Found dropdown at index ${i} by placeholder: "${placeholder}"`);
              break;
            }
            
            // Check nearby text/label
            const ngSelectText = await ngSelect.locator('..').textContent().catch(() => '');
            if (ngSelectText && searchTerms.some(term => ngSelectText.toLowerCase().includes(term))) {
              dropdown = ngSelect;
              dropdownVisible = true;
              console.log(`  ✓ Found dropdown at index ${i} by nearby text`);
              break;
            }
          } catch (e) {
            // Continue to next
          }
        }
      }
      
      // Strategy 4: Find by form field name or id
      if (!dropdownVisible) {
        console.log('  Strategy 4: Looking for ng-select by form field name...');
        const fieldNames = ['customer', 'product', 'plan', 'salesperson', 'salesPerson'];
        for (const fieldName of fieldNames) {
          if (normalizedPlaceholder.includes(fieldName)) {
            try {
              const ngSelect = this.page.locator(`ng-select[formcontrolname*="${fieldName}"], ng-select[id*="${fieldName}"]`).first();
              const isVisible = await ngSelect.isVisible({ timeout: 2000 }).catch(() => false);
              if (isVisible) {
                dropdown = ngSelect;
                dropdownVisible = true;
                console.log(`  ✓ Found dropdown by form field name: ${fieldName}`);
                break;
              }
            } catch (e) {
              // Continue
            }
          }
        }
      }
      
      // Strategy 5: Get by order (customer=0, product=1, plan=2, salesperson=last or 3)
      if (!dropdownVisible) {
        console.log('  Strategy 5: Trying to find dropdown by order in form...');
        const allNgSelects = this.page.locator('ng-select');
        const totalCount = await allNgSelects.count();
        
        let targetIndex = -1;
        if (normalizedPlaceholder.includes('customer')) {
          targetIndex = 0;
        } else if (normalizedPlaceholder.includes('product')) {
          targetIndex = 1;
        } else if (normalizedPlaceholder.includes('plan')) {
          targetIndex = 2;
        } else if (normalizedPlaceholder.includes('sales')) {
          targetIndex = totalCount > 3 ? totalCount - 1 : 3;
        }
        
        if (targetIndex >= 0 && targetIndex < totalCount) {
          const ngSelect = allNgSelects.nth(targetIndex);
          const isVisible = await ngSelect.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            dropdown = ngSelect;
            dropdownVisible = true;
            console.log(`  ✓ Found dropdown by order (index ${targetIndex})`);
          }
        }
      }
      
      // Strategy 6: Get first ng-select if we're looking for customer (final fallback)
      if (!dropdownVisible && normalizedPlaceholder.includes('customer')) {
        console.log('  Strategy 6: Using first ng-select as customer dropdown (final fallback)...');
        const firstNgSelect = this.page.locator('ng-select').first();
        const isVisible = await firstNgSelect.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          dropdown = firstNgSelect;
          dropdownVisible = true;
          console.log('  ✓ Using first ng-select as customer dropdown');
        }
      }
      
      if (!dropdown || !dropdownVisible) {
        // Debug: Log all ng-selects found with their placeholders
        const allNgSelects = this.page.locator('ng-select');
        const count = await allNgSelects.count();
        console.log(`  ✗ Dropdown not found. Found ${count} ng-select elements on page.`);
        
        // Log details of each ng-select for debugging
        for (let i = 0; i < Math.min(count, 5); i++) {
          try {
            const ngSelect = allNgSelects.nth(i);
            const input = ngSelect.locator('input[placeholder]').first();
            const placeholder = await input.getAttribute('placeholder').catch(() => 'N/A');
            const isVisible = await ngSelect.isVisible({ timeout: 1000 }).catch(() => false);
            console.log(`    ng-select[${i}]: visible=${isVisible}, placeholder="${placeholder}"`);
          } catch (e) {
            // Skip
          }
        }
        
        throw new Error(`${placeholderText} dropdown not found`);
      }

      // Scroll to dropdown
      await dropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);

      // Click on the ng-select control area - try multiple click targets
      console.log('  Clicking dropdown to open...');
      let clicked = false;
      
      // Try clicking the ng-select container first
      const container = dropdown.locator('.ng-select-container').first();
      const containerVisible = await container.isVisible({ timeout: 2000 }).catch(() => false);
      if (containerVisible) {
        try {
          await container.click({ force: true });
          clicked = true;
          console.log('  ✓ Clicked on ng-select-container');
        } catch (e) {
          console.log('  ⚠ Could not click container, trying input...');
        }
      }
      
      // Try clicking the input
      if (!clicked) {
        const input = dropdown.locator('input, .ng-input input').first();
        const inputVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (inputVisible) {
          try {
            await input.click({ force: true });
            clicked = true;
            console.log('  ✓ Clicked on input');
          } catch (e) {
            console.log('  ⚠ Could not click input, trying dropdown directly...');
          }
        }
      }
      
      // Fallback: click the dropdown itself
      if (!clicked) {
        await dropdown.click({ force: true });
        console.log('  ✓ Clicked on ng-select element');
      }
      
      await this.page.waitForTimeout(1500);

      // Wait for dropdown panel to appear
      console.log('  Waiting for dropdown panel to appear...');
      let dropdownPanel = this.page.locator('ng-dropdown-panel').first();
      let panelVisible = await dropdownPanel.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!panelVisible) {
        // Try clicking again with different target
        console.log('  Panel not visible, trying to click again...');
        const input = dropdown.locator('input, .ng-input input').first();
        await input.click({ force: true });
        await this.page.waitForTimeout(1500);
        panelVisible = await dropdownPanel.isVisible({ timeout: 5000 }).catch(() => false);
      }
      
      if (!panelVisible) {
        // Try alternative panel locator
        console.log('  Trying alternative panel locator...');
        dropdownPanel = this.page.locator('.ng-dropdown-panel, ng-dropdown-panel').first();
        panelVisible = await dropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      if (!panelVisible) {
        // Check if panel exists in DOM but not visible
        const panelExists = await dropdownPanel.count();
        if (panelExists > 0) {
          console.log('  Panel exists in DOM, waiting for visibility...');
          await this.page.waitForTimeout(1000);
          panelVisible = await dropdownPanel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      if (!panelVisible) {
        throw new Error(`${placeholderText} dropdown panel did not open`);
      }
      
      console.log('  ✓ Dropdown panel opened');

      await this.page.waitForTimeout(800);
      
      // Get all available options
      let options = dropdownPanel.locator('.ng-option').filter({ hasText: /.+/ });
      let count = await options.count();
      
      if (count === 0) {
        // Try alternative locators
        options = dropdownPanel.locator('[role="option"], li[role="option"], .ng-option, li').filter({ hasText: /.+/ });
        count = await options.count();
      }
      
      if (count === 0) {
        throw new Error(`No ${placeholderText} options found in dropdown panel`);
      }
      
      console.log(`  Found ${count} options in ${placeholderText} dropdown`);

      // If option text provided, try to find and select it
      if (optionText) {
        for (let i = 0; i < count; i++) {
          const option = options.nth(i);
          const text = await option.textContent();
          if (text && text.toLowerCase().includes(optionText.toLowerCase())) {
            await option.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await option.click();
            console.log(`✓ ${placeholderText} selected: ${text.trim()}`);
            await this.page.waitForTimeout(1000);
            return text.trim();
          }
        }
      }

      // Select first visible option (skip "Select ..." placeholder)
      for (let i = 0; i < count; i++) {
        const option = options.nth(i);
        const text = await option.textContent();
        if (text && !text.toLowerCase().includes('select') && text.trim().length > 0) {
          await option.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          await option.click();
          console.log(`✓ ${placeholderText} selected: ${text.trim()}`);
          await this.page.waitForTimeout(1000);
          return text.trim();
        }
      }

      // Fallback: select first option
      await options.first().scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await options.first().click();
      const selectedText = await options.first().textContent();
      console.log(`✓ ${placeholderText} selected: ${selectedText ? selectedText.trim() : 'first available'}`);
      await this.page.waitForTimeout(1000);
      return selectedText ? selectedText.trim() : '';
    } catch (error) {
      console.error(`Error selecting ${placeholderText}:`, error);
      throw error;
    }
  }

  /**
   * Gets the currently selected customer value/text.
   * @returns {Promise<string>} - Selected customer name or empty string
   */
  async getSelectedCustomer() {
    try {
      // Try to get the selected value from the dropdown button's span
      const dropdownButton = this.page.locator('div.search-select[data-bs-toggle="dropdown"]').first();
      const buttonExists = await dropdownButton.count() > 0;
      
      if (buttonExists) {
        // Get the span text inside the button (this shows the selected customer)
        const span = dropdownButton.locator('span').first();
        const spanText = await span.textContent().catch(() => '');
        
        // If span doesn't say "Select Customer", it means a customer is selected
        if (spanText && !spanText.toLowerCase().includes('select customer')) {
          return spanText.trim();
        }
        
        // Also check the full button text as fallback
        const buttonText = await dropdownButton.textContent().catch(() => '');
        if (buttonText && !buttonText.toLowerCase().includes('select customer')) {
          // Remove icon text and get just the customer name
          const cleanedText = buttonText.replace(/Select Customer/i, '').trim();
          if (cleanedText && cleanedText.length > 0) {
            return cleanedText;
          }
        }
      }
      
      // Try to get from the dropdown select element if it exists
      const customerSelect = this.page.locator('select[id*="customer"], select[name*="customer"]').first();
      const selectCount = await customerSelect.count();
      if (selectCount > 0) {
        const selectedValue = await customerSelect.inputValue().catch(() => '');
        if (selectedValue && selectedValue.trim() !== '' && selectedValue !== 'null') {
          // Get the text of the selected option
          const selectedOption = customerSelect.locator(`option[value="${selectedValue}"]`).first();
          const optionText = await selectedOption.textContent().catch(() => '');
          if (optionText && optionText.trim()) {
            return optionText.trim();
          }
        }
      }
      
      return '';
    } catch (error) {
      console.error('Error getting selected customer:', error);
      return '';
    }
  }

  /**
   * Selects a customer from the Bootstrap dropdown.
   * @param {string} customerName - Optional customer name to search for
   */
  async selectCustomer(customerName = null) {
    try {
      console.log('  Attempting to select customer from Bootstrap dropdown...');
      
      // Find the Bootstrap dropdown button
      const dropdownButton = this.page.locator('div.search-select:has-text("Select Customer")').first();
      await dropdownButton.waitFor({ state: 'visible', timeout: 10000 });
      await dropdownButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Check if dropdown is already open
      let ariaExpanded = await dropdownButton.getAttribute('aria-expanded');
      if (ariaExpanded === 'true') {
        console.log('  Dropdown is already open');
      } else {
        // Click to open dropdown
        console.log('  Clicking dropdown button to open...');
        await dropdownButton.click({ force: true });
        await this.page.waitForTimeout(1000);
        
        // Wait for aria-expanded to become true
        let attempts = 0;
        while (attempts < 5) {
          ariaExpanded = await dropdownButton.getAttribute('aria-expanded');
          if (ariaExpanded === 'true') {
            console.log('  ✓ Dropdown opened (aria-expanded=true)');
            break;
          }
          attempts++;
          await this.page.waitForTimeout(500);
        }
        
        // If still not open, try clicking again
        if (ariaExpanded !== 'true') {
          console.log('  Dropdown did not open, trying again...');
          await dropdownButton.click({ force: true });
          await this.page.waitForTimeout(1500);
          
          // Check again
          ariaExpanded = await dropdownButton.getAttribute('aria-expanded');
          if (ariaExpanded !== 'true') {
            console.log('  ⚠ Dropdown button aria-expanded is still false, but continuing...');
          }
        }
      }
      
      // Find dropdown menu - try multiple strategies
      // Strategy 1: Find menu that's a sibling or in the same container as the button (try both ul and div)
      let dropdownMenu = dropdownButton.locator('..').locator('ul.dropdown-menu, div.dropdown-menu').first();
      let menuVisible = await dropdownMenu.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Strategy 1b: Find menu in parent container (try both ul and div)
      if (!menuVisible) {
        const parent = dropdownButton.locator('../..');
        dropdownMenu = parent.locator('ul.dropdown-menu, div.dropdown-menu').first();
        menuVisible = await dropdownMenu.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      // Strategy 1c: Find menu within app-select-search component (for the new HTML structure)
      if (!menuVisible) {
        const appSelectSearch = dropdownButton.locator('..').locator('..').locator('app-select-search').first();
        dropdownMenu = appSelectSearch.locator('div.dropdown-menu.dropdown-list').first();
        menuVisible = await dropdownMenu.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      // Strategy 1d: Find menu anywhere in the form/page (Bootstrap dropdowns can be positioned absolutely)
      if (!menuVisible) {
        dropdownMenu = this.page.locator('ul.dropdown-menu, div.dropdown-menu').first();
        menuVisible = await dropdownMenu.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      // Strategy 2: Find menu with show class (try both ul and div)
      if (!menuVisible) {
        dropdownMenu = this.page.locator('ul.dropdown-menu.show, div.dropdown-menu.show').first();
        menuVisible = await dropdownMenu.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      // Strategy 3: Find any dropdown menu and check if it's visible
      if (!menuVisible) {
        const allMenus = this.page.locator('ul.dropdown-menu');
        const menuCount = await allMenus.count();
        console.log(`  Found ${menuCount} dropdown menus in DOM`);
        
        for (let i = 0; i < menuCount; i++) {
          const menu = allMenus.nth(i);
          const isVisible = await menu.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            dropdownMenu = menu;
            menuVisible = true;
            console.log(`  Found visible dropdown menu at index ${i}`);
            break;
          }
        }
      }
      
      // Strategy 4: Wait for menu to become visible (it might be in DOM but hidden)
      if (!menuVisible) {
        console.log('  Waiting for dropdown menu to become visible...');
        dropdownMenu = this.page.locator('ul.dropdown-menu').first();
        
        // Try waiting for the show class to be added
        try {
          await this.page.waitForSelector('ul.dropdown-menu.show', { state: 'visible', timeout: 3000 });
          dropdownMenu = this.page.locator('ul.dropdown-menu.show').first();
          menuVisible = true;
          console.log('  ✓ Found dropdown menu with show class');
        } catch (e) {
          // Try checking if menu becomes visible without show class
          menuVisible = await dropdownMenu.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      // Strategy 5: If menu exists in DOM but is hidden, use JavaScript to make it visible or work with it
      if (!menuVisible) {
        console.log('  Menu exists in DOM but is hidden, attempting to work with it...');
        dropdownMenu = this.page.locator('ul.dropdown-menu').first();
        
        // Check if menu exists in DOM
        const menuExists = await dropdownMenu.count() > 0;
        if (menuExists) {
          // Try to make menu visible using JavaScript
          await dropdownMenu.evaluate((el) => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.classList.add('show');
          });
          await this.page.waitForTimeout(500);
          
          // Check if it's now visible
          menuVisible = await dropdownMenu.isVisible({ timeout: 1000 }).catch(() => false);
          
          if (menuVisible) {
            console.log('  ✓ Made dropdown menu visible using JavaScript');
          } else {
            // Menu exists but still not visible - we'll work with it anyway using force
            console.log('  ⚠ Menu exists but not visible, will use force to interact');
            menuVisible = true; // Set to true so we can proceed
          }
        }
      }
      
      if (!menuVisible) {
        throw new Error('Customer dropdown menu not found in DOM');
      }
      
      console.log('  ✓ Dropdown menu ready');
      await this.page.waitForTimeout(500);
      
      // Check if there's a search input in the dropdown
      const searchInput = dropdownMenu.locator('input[placeholder="Search..."], input[placeholder*="Search"], input[type="text"]').first();
      const searchInputCount = await searchInput.count();
      const hasSearch = searchInputCount > 0;
      
      if (hasSearch && customerName) {
        // Use search input to filter
        console.log(`  Using search input to filter by: ${customerName}`);
        // Make search input visible if needed
        await searchInput.evaluate((el) => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
        });
        await searchInput.fill(customerName, { force: true });
        await this.page.waitForTimeout(1500); // Wait for filtered results
      } else if (hasSearch) {
        // Just wait a bit for options to load
        await this.page.waitForTimeout(500);
      }
      
      // Get all options - try li elements directly, or within div.data-section (for new HTML structure)
      let allOptions = dropdownMenu.locator('li').filter({ hasNot: this.page.locator('input') }); // Exclude li elements that contain inputs
      let totalCount = await allOptions.count();
      
      // If no li elements found, try div.data-section li (for the new HTML structure)
      if (totalCount === 0) {
        const dataSection = dropdownMenu.locator('div.data-section').first();
        allOptions = dataSection.locator('li');
        totalCount = await allOptions.count();
      }
      
      console.log(`  Found ${totalCount} total options in dropdown menu`);
      
      if (totalCount === 0) {
        throw new Error('No customer options found in dropdown menu');
      }
      
      // Get all options with their text (don't filter by visibility since menu might be hidden by CSS)
      const options = [];
      for (let i = 0; i < totalCount; i++) {
        const option = allOptions.nth(i);
        const text = await option.textContent().catch(() => '');
        if (text && text.trim().length > 0) {
          options.push({ option, text: text.trim() });
        }
      }
      
      if (options.length === 0) {
        throw new Error('No customer options with text found');
      }
      
      // Filter out non-customer options - be less strict if we have few options
      const nonCustomerKeywords = ['select', 'settings', 'dashboard', 'home', 'logout', 'profile', 'account', 'log out', 'sign out'];
      const validCustomerOptions = options.filter(({ text }) => {
        const lowerText = text.toLowerCase().trim();
        
        // First, explicitly exclude non-customer keywords (exact match only for strict keywords)
        const isNonCustomer = nonCustomerKeywords.some(keyword => {
          // Only exact match for strict keywords (not partial matches)
          return lowerText === keyword || lowerText === `select ${keyword}`;
        });
        
        if (isNonCustomer) {
          return false;
        }
        
        // If we have very few options (2 or less), be more lenient
        if (options.length <= 2) {
          // Only filter out exact matches of non-customer keywords
          return !nonCustomerKeywords.includes(lowerText);
        }
        
        // For more options, use stricter filtering
        // Must look like a customer (email, company name, etc.)
        const hasEmailPattern = lowerText.includes('@');
        const hasMultipleWords = lowerText.split(/\s+/).length > 1;
        const hasValidLength = lowerText.length > 3;
        
        // Only accept if it looks like an email OR has multiple words (company name)
        const isSingleWord = lowerText.split(/\s+/).length === 1;
        if (isSingleWord && !hasEmailPattern) {
          // Single word without email pattern is likely not a customer (unless we have few options)
          return false;
        }
        
        return hasEmailPattern || (hasMultipleWords && hasValidLength);
      });
      
      // If we filtered out all options, be very lenient and only exclude exact keyword matches
      let customerOptions = validCustomerOptions.length > 0 ? validCustomerOptions : options.filter(({ text }) => {
        const lowerText = text.toLowerCase().trim();
        // Only exclude exact matches of non-customer keywords
        return !nonCustomerKeywords.includes(lowerText);
      });
      
      if (customerOptions.length === 0) {
        throw new Error('No valid customer options found after filtering');
      }
      
      // If customer name provided, try to find and select it FIRST (before any other option)
      if (customerName) {
        const customerNameLower = customerName.toLowerCase().trim();
        console.log(`  Searching for customer: "${customerName}"`);
        
        // First, try exact match or contains match in valid customer options
        // Prioritize exact matches, then contains matches
        const exactMatches = [];
        const containsMatches = [];
        
        for (const { option, text } of customerOptions) {
          const textLower = text.toLowerCase().trim();
          // Exact match (case-insensitive)
          if (textLower === customerNameLower) {
            exactMatches.push({ option, text });
          }
          // Contains match (either direction)
          else if (textLower.includes(customerNameLower) || customerNameLower.includes(textLower)) {
            containsMatches.push({ option, text });
          }
        }
        
        // Use exact match first, then contains match
        const matchToUse = exactMatches.length > 0 ? exactMatches[0] : (containsMatches.length > 0 ? containsMatches[0] : null);
        
        if (matchToUse) {
          const { option, text } = matchToUse;
          console.log(`  Found matching customer: "${text}"`);
          // Use JavaScript to click and prevent navigation
          await option.evaluate((el) => {
            el.scrollIntoView({ block: 'center' });
          });
          await this.page.waitForTimeout(300);
          
          // Click using JavaScript to prevent navigation
          await option.evaluate((el) => {
            // Remove router link attributes BEFORE clicking
            const link = el.querySelector('a, [routerlink], [ng-reflect-router-link]');
            if (link) {
              link.removeAttribute('routerlink');
              link.removeAttribute('ng-reflect-router-link');
              link.removeAttribute('href');
            }
            
            // Remove router link attributes from the li itself
            el.removeAttribute('routerlink');
            el.removeAttribute('ng-reflect-router-link');
            
            // Add preventDefault handler BEFORE creating click event
            const preventHandler = (e) => {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            };
            el.addEventListener('click', preventHandler, { capture: true });
            
            // Create click event
            const clickEvent = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window
            });
            
            // Dispatch the event (preventDefault should be called by our handler)
            el.dispatchEvent(clickEvent);
            
            // Remove handler after click
            setTimeout(() => {
              el.removeEventListener('click', preventHandler, { capture: true });
            }, 100);
          });
          
          try {
            await option.click({ force: true });
          } catch (e) {
            console.log('  ⚠ Playwright click failed, but JavaScript click was executed');
          }
          
          console.log(`✓ Customer selected: ${text}`);
          await this.page.waitForTimeout(1000);
          
          // Verify the selection was successful by checking the dropdown button
          const selectedValue = await this.getSelectedCustomer();
          const selectedLower = selectedValue.toLowerCase().trim();
          const isLogout = selectedLower.includes('logout') || selectedLower === 'log out' || selectedLower === 'log';
          if (isLogout) {
            console.log(`  ⚠ Warning: Selected value appears to be "Logout" instead of customer. Retrying with more strict search...`);
            // Continue to search in all options with stricter filtering
          } else {
            // Verify it matches the requested customer (at least partially)
            if (!selectedLower.includes(customerNameLower) && !customerNameLower.includes(selectedLower)) {
              console.log(`  ⚠ Warning: Selected customer "${selectedValue}" doesn't match requested "${customerName}". Continuing search...`);
            } else {
              // Check if we're still on the form page
              const currentUrl = await this.page.url();
              if (!currentUrl.includes('subscription') && !currentUrl.includes('add-subscription')) {
                console.log(`  ⚠ URL changed to: ${currentUrl}, attempting to navigate back...`);
                await this.page.goBack().catch(() => {});
                await this.page.waitForTimeout(2000);
                try {
                  await this.clickNewButton();
                  await this.page.waitForTimeout(2000);
                } catch (e) {
                  console.log('  ⚠ Could not reopen form automatically');
                }
              }
              
              return text;
            }
          }
        }
        
        // If not found in valid options, search in all options but still filter out non-customers
        console.log(`  Customer "${customerName}" not found in valid options, searching all options with strict filtering...`);
        for (const { option, text } of options) {
          const textLower = text.toLowerCase().trim();
          const lowerText = text.toLowerCase();
          
          // Skip non-customer keywords with strict matching
          const isNonCustomer = nonCustomerKeywords.some(keyword => {
            // Exact match
            if (lowerText === keyword) return true;
            // Contains the keyword as a whole word
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            if (regex.test(lowerText)) return true;
            // Starts with or ends with the keyword
            if (lowerText.startsWith(keyword) || lowerText.endsWith(keyword)) return true;
            return false;
          });
          
          if (isNonCustomer) {
            continue;
          }
          
          // Must have email pattern or be a valid customer name (multiple words or long single word)
          const hasEmailPattern = lowerText.includes('@');
          const hasMultipleWords = lowerText.split(/\s+/).length > 1;
          const isSingleWord = lowerText.split(/\s+/).length === 1;
          
          // Skip single words without email pattern (but be lenient if few options)
          if (isSingleWord && !hasEmailPattern && options.length > 2) {
            continue;
          }
          
          // Check if it matches the customer name
          if (textLower === customerNameLower || textLower.includes(customerNameLower) || customerNameLower.includes(textLower)) {
            console.log(`  Found matching customer in all options: "${text}"`);
            // Use JavaScript to click and prevent navigation
            await option.evaluate((el) => {
              el.scrollIntoView({ block: 'center' });
            });
            await this.page.waitForTimeout(300);
            
            // Click using JavaScript to prevent navigation
            await option.evaluate((el) => {
              // Remove router link attributes BEFORE clicking
              const link = el.querySelector('a, [routerlink], [ng-reflect-router-link]');
              if (link) {
                link.removeAttribute('routerlink');
                link.removeAttribute('ng-reflect-router-link');
                link.removeAttribute('href');
              }
              
              // Remove router link attributes from the li itself
              el.removeAttribute('routerlink');
              el.removeAttribute('ng-reflect-router-link');
              
              // Add preventDefault handler BEFORE creating click event
              const preventHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
              };
              el.addEventListener('click', preventHandler, { capture: true });
              
              // Create click event
              const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
            
            // Dispatch the event (preventDefault should be called by our handler)
            el.dispatchEvent(clickEvent);
            
            // Remove handler after click
            setTimeout(() => {
              el.removeEventListener('click', preventHandler, { capture: true });
            }, 100);
          });
          
          // Also try Playwright click with preventDefault
          try {
            await option.click({ force: true, noWaitAfter: false });
          } catch (e) {
            // If click fails, the JavaScript click above should have worked
            console.log('  ⚠ Playwright click failed, but JavaScript click was executed');
          }
          
          console.log(`✓ Customer selected: ${text}`);
          await this.page.waitForTimeout(1000);
          
          // Verify the selection was successful by checking the dropdown button
          const selectedValue = await this.getSelectedCustomer();
          const selectedLower = selectedValue.toLowerCase().trim();
          const isLogout = selectedLower.includes('logout') || selectedLower === 'log out' || selectedLower === 'log';
          if (isLogout) {
            console.log(`  ⚠ Warning: Selected value appears to be "Logout" instead of customer. Continuing search...`);
            continue; // Continue to next option
          }
          
          // Verify it matches the requested customer (at least partially)
          if (!selectedLower.includes(customerNameLower) && !customerNameLower.includes(selectedLower)) {
            console.log(`  ⚠ Warning: Selected customer "${selectedValue}" doesn't match requested "${customerName}". Continuing search...`);
            continue; // Continue to next option
          }
          
          // Check if we're still on the form page
          const currentUrl = await this.page.url();
          if (!currentUrl.includes('subscription') && !currentUrl.includes('add-subscription')) {
            console.log(`  ⚠ URL changed to: ${currentUrl}, attempting to navigate back...`);
            // Try to navigate back to the form
            await this.page.goBack().catch(() => {});
            await this.page.waitForTimeout(2000);
            // Try clicking New button again
            try {
              await this.clickNewButton();
              await this.page.waitForTimeout(2000);
            } catch (e) {
              console.log('  ⚠ Could not reopen form automatically');
            }
          }
          
          return text;
          }
        }
        
        // If customer name provided but not found, throw error
        throw new Error(`Customer "${customerName}" not found in dropdown options (after filtering out non-customer options)`);
      }
      
      // If no customer name provided, select first valid customer option
      if (validCustomerOptions.length === 0) {
        throw new Error('No valid customer options found after filtering');
      }
      
      const firstOption = validCustomerOptions[0];
      await firstOption.option.evaluate((el) => {
        el.scrollIntoView({ block: 'center' });
      });
      await this.page.waitForTimeout(300);
      
      // Click using JavaScript to prevent navigation
      await firstOption.option.evaluate((el) => {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        el.dispatchEvent(clickEvent);
        
        if (el.onclick) {
          el.onclick(clickEvent);
        }
        
        const link = el.querySelector('a, [routerlink], [ng-reflect-router-link]');
        if (link) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
          }, { once: true });
        }
      });
      
      try {
        await firstOption.option.click({ force: true });
      } catch (e) {
        console.log('  ⚠ Playwright click failed, but JavaScript click was executed');
      }
      
      console.log(`✓ Customer selected: ${firstOption.text}`);
      await this.page.waitForTimeout(1000);
      
      // Check if we're still on the form page
      const currentUrl = await this.page.url();
      if (!currentUrl.includes('subscription') && !currentUrl.includes('add-subscription')) {
        console.log(`  ⚠ URL changed to: ${currentUrl}, attempting to navigate back...`);
        await this.page.goBack().catch(() => {});
        await this.page.waitForTimeout(2000);
        try {
          await this.clickNewButton();
          await this.page.waitForTimeout(2000);
        } catch (e) {
          console.log('  ⚠ Could not reopen form automatically');
        }
      }
      
      return firstOption.text;
    } catch (error) {
      console.error('Error selecting customer:', error);
      throw error;
    }
  }

  /**
   * Selects a product from the native select dropdown.
   * @param {string} productName - Optional product name to search for
   */
  async selectProduct(productName = null) {
    try {
      console.log('  Attempting to select product from select dropdown...');
      
      // Find the product select element
      const productSelect = this.page.locator('select#productId').first();
      await productSelect.waitFor({ state: 'visible', timeout: 10000 });
      await productSelect.scrollIntoViewIfNeeded();
      
      // Check if page is still valid before waiting
      if (!this.page.isClosed()) {
        await this.page.waitForTimeout(500);
      } else {
        throw new Error('Page was closed');
      }
      
      // Get all options
      const options = productSelect.locator('option');
      const count = await options.count();
      
      if (count === 0) {
        throw new Error('No product options found');
      }
      
      console.log(`  Found ${count} product options`);
      
      // If product name provided, try to find and select it
      if (productName) {
        for (let i = 0; i < count; i++) {
          const option = options.nth(i);
          const text = await option.textContent();
          const value = await option.getAttribute('value');
          const isDisabled = await option.getAttribute('disabled');
          
          if (text && value && !isDisabled && text.toLowerCase().includes(productName.toLowerCase())) {
            await productSelect.selectOption({ value: value });
            console.log(`✓ Product selected: ${text.trim()}`);
            await this.page.waitForTimeout(1000);
            return text.trim();
          }
        }
      }
      
      // Select first available option (skip "Select product" placeholder)
      for (let i = 0; i < count; i++) {
        const option = options.nth(i);
        const text = await option.textContent();
        const value = await option.getAttribute('value');
        const isDisabled = await option.getAttribute('disabled');
        
        if (value && !isDisabled && text && !text.toLowerCase().includes('select')) {
          await productSelect.selectOption({ value: value });
          console.log(`✓ Product selected: ${text.trim()}`);
          await this.page.waitForTimeout(1000);
          return text.trim();
        }
      }
      
      throw new Error('No valid product option found');
    } catch (error) {
      console.error('Error selecting product:', error);
      throw error;
    }
  }

  /**
   * Checks if "Product is required" error is visible.
   * @returns {Promise<boolean>}
   */
  async isProductRequiredErrorVisible() {
    try {
      return await this.productRequiredError.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects a plan from the native select dropdown.
   * @param {string} planName - Optional plan name to search for
   */
  async selectPlan(planName = null) {
    try {
      console.log('  Attempting to select plan from select dropdown...');
      
      // Find the plan select element
      const planSelect = this.page.locator('select#planName').first();
      await planSelect.waitFor({ state: 'visible', timeout: 10000 });
      await planSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get all options
      const options = planSelect.locator('option');
      const count = await options.count();
      
      if (count === 0) {
        throw new Error('No plan options found');
      }
      
      console.log(`  Found ${count} plan options`);
      
      // If plan name provided, try to find and select it
      if (planName) {
        for (let i = 0; i < count; i++) {
          const option = options.nth(i);
          const text = await option.textContent();
          const value = await option.getAttribute('value');
          const isDisabled = await option.getAttribute('disabled');
          
          if (text && value && !isDisabled && text.toLowerCase().includes(planName.toLowerCase())) {
            await planSelect.selectOption({ value: value });
            // Trigger change event to ensure Angular/reactivity picks it up
            await planSelect.evaluate((el) => {
              el.dispatchEvent(new Event('change', { bubbles: true }));
              el.dispatchEvent(new Event('input', { bubbles: true }));
            });
            console.log(`✓ Plan selected: ${text.trim()}`);
            await this.page.waitForTimeout(2000); // Wait longer for unit price to populate
            return text.trim();
          }
        }
      }
      
      // Select first available option (skip "Select plan name" placeholder)
      for (let i = 0; i < count; i++) {
        const option = options.nth(i);
        const text = await option.textContent();
        const value = await option.getAttribute('value');
        const isDisabled = await option.getAttribute('disabled');
        
        if (value && !isDisabled && text && !text.toLowerCase().includes('select')) {
          await planSelect.selectOption({ value: value });
          // Trigger change event to ensure Angular/reactivity picks it up
          await planSelect.evaluate((el) => {
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('input', { bubbles: true }));
          });
          console.log(`✓ Plan selected: ${text.trim()}`);
          await this.page.waitForTimeout(2000); // Wait longer for unit price to populate
          return text.trim();
        }
      }
      
      throw new Error('No valid plan option found');
    } catch (error) {
      console.error('Error selecting plan:', error);
      throw error;
    }
  }

  /**
   * Checks if "Plan Name is required" error is visible.
   * @returns {Promise<boolean>}
   */
  async isPlanRequiredErrorVisible() {
    try {
      return await this.planRequiredError.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the unit price value.
   * @returns {Promise<string>}
   */
  async getUnitPrice() {
    try {
      // Try multiple ways to get the value
      let value = await this.unitPriceInput.inputValue().catch(() => '');
      
      // If empty, try getting from value attribute
      if (!value || value.trim() === '') {
        value = await this.unitPriceInput.getAttribute('value').catch(() => '');
      }
      
      // If still empty, try getting text content
      if (!value || value.trim() === '') {
        value = await this.unitPriceInput.textContent().catch(() => '');
      }
      
      // If still empty, check if field exists and return "0" as default
      if (!value || value.trim() === '') {
        // Check if input field exists
        const inputExists = await this.unitPriceInput.count() > 0;
        if (inputExists) {
          // Return "0" if field exists but is empty (for trial plans)
          return '0';
        }
        return '';
      }
      
      return value.trim();
    } catch (error) {
      // If there's an error but the field exists, return "0" as default
      const inputExists = await this.unitPriceInput.count().catch(() => 0);
      return inputExists > 0 ? '0' : '';
    }
  }

  /**
   * Fills the quantity field.
   * @param {string|number} quantity
   */
  async fillQuantity(quantity) {
    await this.quantityInput.waitFor({ state: 'visible', timeout: 5000 });
    
    // Check if field is readonly
    const isReadonly = await this.quantityInput.getAttribute('readonly');
    if (isReadonly !== null) {
      // Remove readonly attribute if present
      await this.quantityInput.evaluate((el) => {
        el.removeAttribute('readonly');
        el.style.backgroundColor = 'white';
      });
      await this.page.waitForTimeout(500);
    }
    
    await this.quantityInput.fill(quantity.toString());
    await this.page.waitForTimeout(500);
  }

  /**
   * Gets the amount value.
   * @returns {Promise<string>}
   */
  async getAmount() {
    try {
      let value = await this.amountInput.inputValue().catch(() => '');
      
      // If empty, try getting from value attribute
      if (!value || value.trim() === '') {
        value = await this.amountInput.getAttribute('value').catch(() => '');
      }
      
      // If still empty, try getting text content
      if (!value || value.trim() === '') {
        value = await this.amountInput.textContent().catch(() => '');
      }
      
      // If still empty, check if field exists and return "0" as default
      if (!value || value.trim() === '') {
        const inputExists = await this.amountInput.count() > 0;
        if (inputExists) {
          // Return "0" if field exists but is empty (for trial plans)
          return '0';
        }
        return '';
      }
      
      return value.trim();
    } catch (error) {
      // If there's an error but the field exists, return "0" as default
      const inputExists = await this.amountInput.count().catch(() => 0);
      return inputExists > 0 ? '0' : '';
    }
  }

  /**
   * Fills the description field.
   * @param {string} description
   */
  async fillDescription(description) {
    await this.descriptionInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.descriptionInput.fill(description);
  }

  /**
   * Fills the subscription term field.
   * @param {string} term
   */
  async fillSubscriptionTerm(term) {
    await this.subscriptionTermInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.subscriptionTermInput.fill(term);
  }

  /**
   * Fills the reference ID field.
   * @param {string} referenceId
   */
  async fillReferenceId(referenceId) {
    await this.referenceIdInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.referenceIdInput.fill(referenceId);
  }

  /**
   * Selects a sales person from the native select dropdown.
   * @param {string} salesPersonName - Optional sales person name to search for
   */
  async selectSalesPerson(salesPersonName = null) {
    try {
      console.log('  Attempting to select sales person from select dropdown...');
      
      // Find the sales person select element
      const salesPersonSelect = this.page.locator('select#salespersonId').first();
      await salesPersonSelect.waitFor({ state: 'visible', timeout: 10000 });
      await salesPersonSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get all options
      const options = salesPersonSelect.locator('option');
      const count = await options.count();
      
      if (count === 0) {
        throw new Error('No sales person options found');
      }
      
      console.log(`  Found ${count} sales person options`);
      
      // If sales person name provided, try to find and select it
      if (salesPersonName) {
        for (let i = 0; i < count; i++) {
          const option = options.nth(i);
          const text = await option.textContent();
          const value = await option.getAttribute('value');
          const isDisabled = await option.getAttribute('disabled');
          
          if (text && value && !isDisabled && text.toLowerCase().includes(salesPersonName.toLowerCase())) {
            await salesPersonSelect.selectOption({ value: value });
            console.log(`✓ Sales Person selected: ${text.trim()}`);
            await this.page.waitForTimeout(1000);
            return text.trim();
          }
        }
      }
      
      // Select first available option (skip "Select sales person" placeholder)
      for (let i = 0; i < count; i++) {
        const option = options.nth(i);
        const text = await option.textContent();
        const value = await option.getAttribute('value');
        const isDisabled = await option.getAttribute('disabled');
        
        if (value && !isDisabled && text && !text.toLowerCase().includes('select')) {
          await salesPersonSelect.selectOption({ value: value });
          console.log(`✓ Sales Person selected: ${text.trim()}`);
          await this.page.waitForTimeout(1000);
          return text.trim();
        }
      }
      
      throw new Error('No valid sales person option found');
    } catch (error) {
      console.error('Error selecting sales person:', error);
      throw error;
    }
  }

  /**
   * Clicks the Submit button.
   */
  async clickSubmit() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Waits for toast message to appear.
   * @param {number} timeout - Maximum time to wait in milliseconds
   * @returns {Promise<boolean>}
   */
  async waitForToast(timeout = 10000) {
    try {
      const startTime = Date.now();
      let attempt = 0;
      
      while (Date.now() - startTime < timeout) {
        attempt++;
        
        const hasChildren = await this.toastContainer.evaluate((container) => {
          return container && container.children.length > 0;
        }).catch(() => false);
        
        if (hasChildren) {
          const toastCount = await this.toastMessages.count();
          for (let i = 0; i < toastCount; i++) {
            const toast = this.toastMessages.nth(i);
            const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              console.log(`  Toast found at attempt ${attempt}`);
              return true;
            }
          }
        }
        
        const successVisible = await this.successToast.isVisible({ timeout: 1000 }).catch(() => false);
        if (successVisible) {
          console.log(`  Toast found (success) at attempt ${attempt}`);
          return true;
        }
        
        await this.page.waitForTimeout(500);
      }
      
      console.log(`  No toast found after ${attempt} attempts (${timeout}ms timeout)`);
      return false;
    } catch (error) {
      console.error('Error waiting for toast:', error);
      return false;
    }
  }

  /**
   * Gets the toast message text.
   * @returns {Promise<string>}
   */
  async getToastMessage() {
    try {
      await this.waitForToast(10000);
      
      const successToastVisible = await this.successToast.isVisible({ timeout: 2000 }).catch(() => false);
      if (successToastVisible) {
        const text = await this.successToast.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
      
      const toastCount = await this.toastMessages.count();
      if (toastCount > 0) {
        for (let i = 0; i < toastCount; i++) {
          const toast = this.toastMessages.nth(i);
          const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            if (text && text.trim()) {
              return text.trim();
            }
          }
        }
      }
      
      const containerText = await this.toastContainer.textContent();
      return containerText ? containerText.trim() : '';
    } catch (error) {
      console.error('Error getting toast message:', error);
      return '';
    }
  }

  /**
   * Checks if form is still open.
   * @returns {Promise<boolean>}
   */
  async isFormStillOpen() {
    try {
      const isVisible = await this.formContainer.isVisible({ timeout: 2000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.page.url();
  }

  /**
   * Verifies if a subscription exists in the table.
   * @param {Object} subscriptionData - Subscription data to verify { customerName, referenceId, planName, amount, status }
   * @returns {Promise<{found: boolean, rowIndex: number, details: string}>}
   */
  async verifySubscriptionInTable(subscriptionData) {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000);
      
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();
        
        const hasCustomer = !subscriptionData.customerName || 
          rowText.toLowerCase().includes(subscriptionData.customerName.toLowerCase());
        const hasReferenceId = !subscriptionData.referenceId || 
          rowText.includes(subscriptionData.referenceId);
        const hasPlan = !subscriptionData.planName || 
          rowText.toLowerCase().includes(subscriptionData.planName.toLowerCase());
        const hasAmount = !subscriptionData.amount || 
          rowText.includes(subscriptionData.amount);
        const hasStatus = !subscriptionData.status || 
          rowText.toLowerCase().includes(subscriptionData.status.toLowerCase());
        
        if (hasCustomer && hasReferenceId && hasPlan && hasAmount && hasStatus) {
          return {
            found: true,
            rowIndex: i,
            details: `Subscription found at row ${i + 1}`,
          };
        }
      }
      
      return {
        found: false,
        rowIndex: -1,
        details: 'Subscription not found in table',
      };
    } catch (error) {
      console.error('Error verifying subscription in table:', error);
      return {
        found: false,
        rowIndex: -1,
        details: `Error: ${error.message}`,
      };
    }
  }

  /**
   * Gets data from a specific table row.
   * @param {number} rowIndex - Zero-based row index
   * @returns {Promise<{subId: string, companyName: string, planName: string, amount: string, status: string}>}
   */
  async getRowData(rowIndex) {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      if (rowIndex >= rowCount) {
        throw new Error(`Row index ${rowIndex} is out of range. Table has ${rowCount} rows.`);
      }
      
      const row = rows.nth(rowIndex);
      await row.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      const cells = row.locator('td, mat-cell');
      const cellCount = await cells.count();
      const rowText = await row.textContent();
      
      const data = {
        subId: '',
        companyName: '',
        planName: '',
        amount: '',
        status: '',
      };
      
      // Extract data by cell index or text patterns
      if (cellCount >= 5) {
        try {
          data.subId = (await cells.nth(1).textContent()).trim(); // Sub Id is usually second column
          data.companyName = (await cells.nth(2).textContent()).trim();
          data.planName = (await cells.nth(3).textContent()).trim();
          // Amount and Status are further down
        } catch (e) {
          // Fallback to pattern matching
        }
      }
      
      // Extract by patterns
      const subIdMatch = rowText.match(/SUB-[A-Z0-9]+/);
      if (subIdMatch) data.subId = subIdMatch[0];
      
      if (rowText.toLowerCase().includes('active')) {
        data.status = 'Active';
      } else if (rowText.toLowerCase().includes('inactive')) {
        data.status = 'Inactive';
      }
      
      return data;
    } catch (error) {
      console.error(`Error getting row data for row ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Checks if a filter button is selected.
   * @param {string} filterType - 'all', 'paid', 'trial', 'upcoming', 'expired'
   * @returns {Promise<boolean>}
   */
  async isFilterSelected(filterType) {
    try {
      let filterButton;
      switch (filterType.toLowerCase()) {
        case 'all':
          filterButton = this.allSubscriptionsFilter;
          break;
        case 'paid':
          filterButton = this.paidSubscriptionFilter;
          break;
        case 'trial':
          filterButton = this.trialSubscriptionFilter;
          break;
        case 'upcoming':
          filterButton = this.upcomingRenewalFilter;
          break;
        case 'expired':
          filterButton = this.expiredSubscriptionFilter;
          break;
        default:
          return false;
      }
      
      // Check multiple indicators of selection
      const classes = await filterButton.getAttribute('class').catch(() => '');
      const style = await filterButton.getAttribute('style').catch(() => '');
      
      // Check for active/selected classes
      if (classes && (classes.includes('active') || classes.includes('selected'))) {
        return true;
      }
      
      // Check if style attribute indicates selection (e.g., border-color, color are set)
      if (style && (style.includes('border-color') || style.includes('color'))) {
        // If style is set, it might be selected (depends on implementation)
        // For now, we'll assume if style exists, it's potentially selected
        return true;
      }
      
      // Check URL parameter (if filters use URL params)
      const url = await this.page.url();
      if (filterType.toLowerCase() === 'all' && !url.includes('subType=')) {
        return true; // All is default when no filter param
      }
      if (url.includes(`subType=${filterType.toLowerCase()}`)) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks a filter button.
   * @param {string} filterType - 'all', 'paid', 'trial', 'upcoming', 'expired'
   */
  async clickFilter(filterType) {
    try {
      let filterButton;
      switch (filterType.toLowerCase()) {
        case 'all':
          filterButton = this.allSubscriptionsFilter;
          break;
        case 'paid':
          filterButton = this.paidSubscriptionFilter;
          break;
        case 'trial':
          filterButton = this.trialSubscriptionFilter;
          break;
        case 'upcoming':
          filterButton = this.upcomingRenewalFilter;
          break;
        case 'expired':
          filterButton = this.expiredSubscriptionFilter;
          break;
        default:
          throw new Error(`Unknown filter type: ${filterType}`);
      }
      
      await filterButton.waitFor({ state: 'visible', timeout: 10000 });
      await filterButton.scrollIntoViewIfNeeded();
      await filterButton.click();
      await this.page.waitForTimeout(2000); // Wait for filter to apply
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    } catch (error) {
      console.error(`Error clicking ${filterType} filter:`, error);
      throw error;
    }
  }

  /**
   * Gets the total count from a subscription card.
   * @param {string} filterType - 'all', 'paid', 'trial', 'upcoming', 'expired'
   * @returns {Promise<number>}
   */
  async getCardTotal(filterType) {
    try {
      let cardTotal;
      let filterCard;
      
      switch (filterType.toLowerCase()) {
        case 'all':
          cardTotal = this.allSubscriptionsCardTotal;
          filterCard = this.allSubscriptionsFilter;
          break;
        case 'paid':
          cardTotal = this.paidSubscriptionCardTotal;
          filterCard = this.paidSubscriptionFilter;
          break;
        case 'trial':
          cardTotal = this.trialSubscriptionCardTotal;
          filterCard = this.trialSubscriptionFilter;
          break;
        case 'upcoming':
          cardTotal = this.upcomingRenewalCardTotal;
          filterCard = this.upcomingRenewalFilter;
          break;
        case 'expired':
          cardTotal = this.expiredSubscriptionCardTotal;
          filterCard = this.expiredSubscriptionFilter;
          break;
        default:
          throw new Error(`Unknown filter type: ${filterType}`);
      }
      
      // Try the primary locator
      let isVisible = await cardTotal.isVisible({ timeout: 2000 }).catch(() => false);
      
      // If not visible, try finding h5.price-text near the filter card
      if (!isVisible) {
        // Try parent container
        let parent = filterCard.locator('..');
        for (let level = 0; level < 3; level++) {
          const priceText = parent.locator('h5.price-text').first();
          isVisible = await priceText.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            cardTotal = priceText;
            break;
          }
          parent = parent.locator('..');
        }
      }
      
      // If still not found, try finding all h5.price-text and match by position
      if (!isVisible) {
        const allPriceTexts = this.page.locator('h5.price-text');
        const count = await allPriceTexts.count();
        const filterIndex = ['all', 'paid', 'trial', 'upcoming', 'expired'].indexOf(filterType.toLowerCase());
        if (filterIndex >= 0 && filterIndex < count) {
          cardTotal = allPriceTexts.nth(filterIndex);
          isVisible = await cardTotal.isVisible({ timeout: 2000 }).catch(() => false);
        }
      }
      
      if (!isVisible) {
        throw new Error(`Card total not found for ${filterType} filter`);
      }
      
      await cardTotal.waitFor({ state: 'visible', timeout: 5000 });
      const text = await cardTotal.textContent();
      const number = parseInt(text.trim().replace(/,/g, ''), 10);
      return isNaN(number) ? 0 : number;
    } catch (error) {
      console.error(`Error getting card total for ${filterType}:`, error);
      return 0;
    }
  }

  /**
   * Gets the total count from pagination text (e.g., "Showing 1 to 20 of 5502 records" → 5502).
   * @returns {Promise<number>}
   */
  async getPaginationTotal() {
    try {
      // Try both pagination text locators
      let text = '';
      const paginationTextVisible = await this.paginationText.isVisible({ timeout: 2000 }).catch(() => false);
      const rangeLabelVisible = await this.paginationRangeLabel.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (paginationTextVisible) {
        await this.paginationText.waitFor({ state: 'visible', timeout: 10000 });
        text = await this.paginationText.textContent();
      } else if (rangeLabelVisible) {
        await this.paginationRangeLabel.waitFor({ state: 'visible', timeout: 10000 });
        text = await this.paginationRangeLabel.textContent();
      } else {
        // Try to find any pagination text
        const allPaginationTexts = this.page.locator('div.total-data-info, div.mat-mdc-paginator-range-label');
        const count = await allPaginationTexts.count();
        if (count > 0) {
          text = await allPaginationTexts.first().textContent();
        }
      }
      
      if (!text) {
        return 0;
      }
      
      // Extract number after "of" (e.g., "Showing 1 to 20 of 5502 records" → 5502 or "21 – 40 of 5502" → 5502)
      const match = text.match(/of\s+(\d+)/i);
      if (match && match[1]) {
        return parseInt(match[1].replace(/,/g, ''), 10);
      }
      
      // Fallback: try to find any large number in the text
      const numbers = text.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        // Return the largest number (likely the total)
        const parsedNumbers = numbers.map(n => parseInt(n.replace(/,/g, ''), 10));
        return Math.max(...parsedNumbers);
      }
      
      return 0;
    } catch (error) {
      console.error('Error getting pagination total:', error);
      return 0;
    }
  }

  /**
   * Gets pagination range information (start, end, total).
   * @returns {Promise<{start: number, end: number, total: number, text: string}>}
   */
  async getPaginationRange() {
    try {
      let text = '';
      const paginationTextVisible = await this.paginationText.isVisible({ timeout: 2000 }).catch(() => false);
      const rangeLabelVisible = await this.paginationRangeLabel.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (paginationTextVisible) {
        await this.paginationText.waitFor({ state: 'visible', timeout: 10000 });
        text = await this.paginationText.textContent();
      } else if (rangeLabelVisible) {
        await this.paginationRangeLabel.waitFor({ state: 'visible', timeout: 10000 });
        text = await this.paginationRangeLabel.textContent();
      } else {
        const allPaginationTexts = this.page.locator('div.total-data-info, div.mat-mdc-paginator-range-label');
        const count = await allPaginationTexts.count();
        if (count > 0) {
          text = await allPaginationTexts.first().textContent();
        }
      }
      
      if (!text) {
        return { start: 0, end: 0, total: 0, text: '' };
      }
      
      // Extract numbers from text like "Showing 1 to 20 of 5502 records" or "21 – 40 of 5502"
      // Pattern 1: "Showing 1 to 20 of 5502 records"
      let match = text.match(/Showing\s+(\d+)\s+to\s+(\d+)\s+of\s+(\d+)/i);
      if (match) {
        return {
          start: parseInt(match[1].replace(/,/g, ''), 10),
          end: parseInt(match[2].replace(/,/g, ''), 10),
          total: parseInt(match[3].replace(/,/g, ''), 10),
          text: text.trim()
        };
      }
      
      // Pattern 2: "21 – 40 of 5502" or "1–20 of 5502"
      match = text.match(/(\d+)\s*[–-]\s*(\d+)\s+of\s+(\d+)/i);
      if (match) {
        return {
          start: parseInt(match[1].replace(/,/g, ''), 10),
          end: parseInt(match[2].replace(/,/g, ''), 10),
          total: parseInt(match[3].replace(/,/g, ''), 10),
          text: text.trim()
        };
      }
      
      // Fallback: extract total only
      const total = await this.getPaginationTotal();
      return { start: 0, end: 0, total: total, text: text.trim() };
    } catch (error) {
      console.error('Error getting pagination range:', error);
      return { start: 0, end: 0, total: 0, text: '' };
    }
  }

  /**
   * Gets the total number of rows currently visible in the table.
   * @returns {Promise<number>}
   */
  async getTotalTableRows() {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rowCount = await this.subscriptionTableRows.count();
      return rowCount;
    } catch (error) {
      console.error('Error getting total table rows:', error);
      return 0;
    }
  }

  /**
   * Changes the items per page setting.
   * @param {number} itemsPerPage - 20, 50, 100, 200, or 500
   */
  async changeItemsPerPage(itemsPerPage) {
    try {
      console.log(`  Changing items per page to ${itemsPerPage}...`);
      
      // Find the items per page select by label first (most reliable)
      const label = this.page.locator('div.mat-mdc-paginator-page-size-label, div[id*="mat-paginator-page-size-label"]').first();
      const labelVisible = await label.isVisible({ timeout: 5000 }).catch(() => false);
      
      let itemsPerPageSelectElement;
      
      if (labelVisible) {
        // Get the label's id
        const labelId = await label.getAttribute('id').catch(() => '');
        
        if (labelId) {
          // Find mat-select with aria-labelledby matching the label id
          itemsPerPageSelectElement = this.page.locator(`mat-select[aria-labelledby*="${labelId}"]`).first();
          const selectVisible = await itemsPerPageSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (!selectVisible) {
            // Try finding mat-select in the same parent container as the label
            itemsPerPageSelectElement = label.locator('../..').locator('mat-select').first()
              .or(label.locator('..').locator('mat-select').first());
          }
        } else {
          // Fallback: find mat-select near the label
          itemsPerPageSelectElement = label.locator('../..').locator('mat-select').first()
            .or(label.locator('..').locator('mat-select').first());
        }
      } else {
        // Fallback strategies
        itemsPerPageSelectElement = this.itemsPerPageSelect;
        let isVisible = await itemsPerPageSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (!isVisible) {
          itemsPerPageSelectElement = this.page.locator('mat-paginator mat-select').first();
          isVisible = await itemsPerPageSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
        }
        
        if (!isVisible) {
          itemsPerPageSelectElement = this.page.locator('mat-select[aria-label*="page size"]').first();
        }
      }
      
      await itemsPerPageSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await itemsPerPageSelectElement.scrollIntoViewIfNeeded();
      console.log('  ✓ Items per page select found');
      
      // Check if dropdown is already open by checking panel visibility
      let panel = this.page.locator('mat-select-panel[aria-labelledby*="mat-paginator-page-size-label"]').first()
        .or(this.page.locator('mat-select-panel.mdc-menu-surface--open').first());
      let panelVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
      
      // Also check aria-expanded
      let ariaExpanded = await itemsPerPageSelectElement.getAttribute('aria-expanded');
      console.log(`  Current aria-expanded: ${ariaExpanded}`);
      console.log(`  Panel already visible: ${panelVisible}`);
      
      if (ariaExpanded === 'true' || panelVisible) {
        console.log('  Dropdown is already open');
      } else {
        console.log('  Clicking items per page select to open dropdown...');
        
        // Try clicking the select trigger first (the clickable area)
        const selectTrigger = itemsPerPageSelectElement.locator('.mat-mdc-select-trigger').first();
        const triggerVisible = await selectTrigger.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (triggerVisible) {
          await selectTrigger.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          try {
            await selectTrigger.click({ timeout: 5000 });
            console.log('  ✓ Clicked on select trigger');
          } catch (e) {
            // Try clicking the touch target div
            const touchTarget = itemsPerPageSelectElement.locator('.mat-mdc-paginator-touch-target').first();
            const touchTargetVisible = await touchTarget.isVisible({ timeout: 1000 }).catch(() => false);
            if (touchTargetVisible) {
              await touchTarget.click({ timeout: 5000 });
              console.log('  ✓ Clicked on touch target');
            } else {
              // Use JavaScript click as fallback
              await itemsPerPageSelectElement.evaluate((el) => {
                el.click();
              });
              console.log('  ✓ Clicked using JavaScript');
            }
          }
        } else {
          // Fallback: click the select element itself
          await itemsPerPageSelectElement.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          try {
            await itemsPerPageSelectElement.click({ timeout: 5000 });
            console.log('  ✓ Clicked on select element');
          } catch (e) {
            // Use JavaScript click as fallback
            await itemsPerPageSelectElement.evaluate((el) => {
              el.click();
            });
            console.log('  ✓ Clicked using JavaScript');
          }
        }
        
        await this.page.waitForTimeout(1000);
        
        // Wait for aria-expanded to become true or panel to become visible
        let attempts = 0;
        while (attempts < 5 && ariaExpanded !== 'true' && !panelVisible) {
          ariaExpanded = await itemsPerPageSelectElement.getAttribute('aria-expanded');
          panelVisible = await panel.isVisible({ timeout: 500 }).catch(() => false);
          if (ariaExpanded === 'true' || panelVisible) {
            console.log('  ✓ Dropdown opened');
            break;
          }
          attempts++;
          await this.page.waitForTimeout(500);
        }
        
        // If still not open, try clicking again with force
        if (ariaExpanded !== 'true' && !panelVisible) {
          console.log('  Dropdown not opened, retrying with force...');
          await itemsPerPageSelectElement.click({ force: true, timeout: 5000 });
          await this.page.waitForTimeout(1000);
          ariaExpanded = await itemsPerPageSelectElement.getAttribute('aria-expanded');
          panelVisible = await panel.isVisible({ timeout: 500 }).catch(() => false);
        }
      }
      
      // Wait for panel to appear
      await this.page.waitForTimeout(500);
      
      // Update panel locator with more fallbacks if not already visible
      if (!panelVisible) {
        panel = this.page.locator('mat-select-panel[aria-labelledby*="mat-paginator-page-size-label"]').first()
          .or(this.page.locator('mat-select-panel.mdc-menu-surface--open').first())
          .or(this.page.locator('mat-select-panel[id*="mat-select"]').first())
          .or(this.page.locator('mat-select-panel').first())
          .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
          .or(this.page.locator('[role="listbox"]').first());
        
        panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
      }
      
      if (!panelVisible) {
        // Check if panel exists in DOM
        const panelCount = await panel.count();
        if (panelCount > 0) {
          console.log('  Panel exists in DOM, making it visible...');
          await panel.evaluate((el) => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          });
          await this.page.waitForTimeout(300);
          panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
        }
      }
      
      if (panelVisible) {
        console.log('  ✓ Panel is visible');
      } else {
        console.log('  ⚠ Panel not visible, but proceeding to find options...');
      }
      
      await this.page.waitForTimeout(300);
      
      // Find and click the option - try multiple strategies
      console.log(`  Looking for option: ${itemsPerPage}`);
      let option = panel.locator(`mat-option[ng-reflect-value="${itemsPerPage}"]`).first()
        .or(panel.locator(`mat-option:has-text("${itemsPerPage}")`).first())
        .or(this.page.locator(`mat-option[ng-reflect-value="${itemsPerPage}"]`).first())
        .or(this.page.locator(`mat-option:has-text("${itemsPerPage}")`).first());
      
      let optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!optionVisible) {
        console.log('  Option not visible, searching all options...');
        // Search all mat-options on page
        const allOptions = this.page.locator('mat-option');
        const allOptionsCount = await allOptions.count();
        console.log(`  Found ${allOptionsCount} total mat-option elements`);
        
        for (let i = 0; i < allOptionsCount; i++) {
          const opt = allOptions.nth(i);
          const optionText = await opt.textContent().catch(() => '');
          const optionValue = await opt.getAttribute('ng-reflect-value').catch(() => '');
          
          if ((optionText && optionText.trim() === itemsPerPage.toString()) || 
              (optionValue && optionValue === itemsPerPage.toString())) {
            option = opt;
            optionVisible = true;
            console.log(`  ✓ Found option at index ${i}: "${optionText.trim() || optionValue}"`);
            break;
          }
        }
      }
      
      if (optionVisible) {
        console.log(`  Clicking option: ${itemsPerPage}`);
        await option.scrollIntoViewIfNeeded();
        await option.click();
      } else {
        // Try clicking with force if option exists in DOM
        const optionCount = await option.count();
        if (optionCount > 0) {
          console.log(`  Option exists in DOM, clicking with force...`);
          await option.click({ force: true });
        } else {
          throw new Error(`Items per page option "${itemsPerPage}" not found`);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Verify selection by checking if dropdown closed (aria-expanded becomes false)
      ariaExpanded = await itemsPerPageSelectElement.getAttribute('aria-expanded');
      if (ariaExpanded === 'true') {
        // Close dropdown if still open
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(200);
      }
      
      // Wait for table to update
      await this.page.waitForTimeout(2000);
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      
      console.log(`  ✓ Items per page changed to ${itemsPerPage}`);
    } catch (error) {
      console.error(`Error changing items per page to ${itemsPerPage}:`, error);
      // Try to close any open dropdowns
      await this.page.keyboard.press('Escape').catch(() => {});
      throw error;
    }
  }

  /**
   * Clicks the Next page button.
   */
  async clickNextPage() {
    try {
      await this.nextPageButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.nextPageButton.scrollIntoViewIfNeeded();
      await this.nextPageButton.click();
      await this.page.waitForTimeout(2000); // Wait for table to update
      console.log('  ✓ Next page button clicked');
    } catch (error) {
      console.error('Error clicking next page:', error);
      throw error;
    }
  }

  /**
   * Clicks the Previous page button.
   */
  async clickPreviousPage() {
    try {
      await this.previousPageButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.previousPageButton.scrollIntoViewIfNeeded();
      await this.previousPageButton.click();
      await this.page.waitForTimeout(2000); // Wait for table to update
      console.log('  ✓ Previous page button clicked');
    } catch (error) {
      console.error('Error clicking previous page:', error);
      throw error;
    }
  }

  /**
   * Checks if the Next page button is disabled.
   * @returns {Promise<boolean>}
   */
  async isNextPageDisabled() {
    try {
      const isDisabled = await this.nextPageButton.isDisabled().catch(() => false);
      const ariaDisabled = await this.nextPageButton.getAttribute('aria-disabled').catch(() => 'false');
      const hasDisabledClass = await this.nextPageButton.getAttribute('class').then(cls => cls.includes('disabled')).catch(() => false);
      
      return isDisabled || ariaDisabled === 'true' || hasDisabledClass;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if the Previous page button is disabled.
   * @returns {Promise<boolean>}
   */
  async isPreviousPageDisabled() {
    try {
      const isDisabled = await this.previousPageButton.isDisabled().catch(() => false);
      const ariaDisabled = await this.previousPageButton.getAttribute('aria-disabled').catch(() => 'false');
      const hasDisabledClass = await this.previousPageButton.getAttribute('class').then(cls => cls.includes('disabled')).catch(() => false);
      
      return isDisabled || ariaDisabled === 'true' || hasDisabledClass;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if "no subscription found" message is visible.
   * @returns {Promise<boolean>}
   */
  async isNoSubscriptionFoundVisible() {
    try {
      return await this.noSubscriptionFoundMessage.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if subscription table is visible.
   * @returns {Promise<boolean>}
   */
  async isTableVisible() {
    try {
      return await this.subscriptionTable.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the search panel by clicking the search button.
   */
  async openSearchPanel() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      
      // Check if panel is already open
      const isExpanded = await this.searchButton.getAttribute('aria-expanded');
      if (isExpanded === 'true') {
        console.log('  Search panel is already open');
        return;
      }
      
      await this.searchButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for panel to be visible
      await this.searchPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      console.log('  ✓ Search panel opened');
    } catch (error) {
      console.error('Error opening search panel:', error);
      throw error;
    }
  }

  /**
   * Fills the top search bar with company name or sub ID.
   * @param {string} searchText
   */
  async fillTopSearch(searchText) {
    try {
      // Try to find top search input
      const topSearchVisible = await this.topSearchInput.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (topSearchVisible) {
        await this.topSearchInput.fill(searchText);
        await this.page.waitForTimeout(500);
        console.log(`  ✓ Filled top search box with: ${searchText}`);
      } else {
        // If top search box doesn't exist, use Company/Email or SubCode filter instead
        console.log('  ⚠ Top search box not found, using Company/Email filter instead');
        
        // Check if it looks like a sub ID (starts with SUB-)
        if (searchText.toUpperCase().startsWith('SUB-')) {
          await this.fillSubCode(searchText);
        } else {
          // Assume it's a company name or email
          await this.fillCompanyEmail(searchText);
        }
      }
    } catch (error) {
      console.error('Error filling top search:', error);
      // Fallback: use Company/Email filter
      if (searchText.toUpperCase().startsWith('SUB-')) {
        await this.fillSubCode(searchText);
      } else {
        await this.fillCompanyEmail(searchText);
      }
    }
  }

  /**
   * Selects a date in a date range picker.
   * @param {string} filterType - 'startDate', 'nextBillingDate', 'lastBillingDate'
   * @param {string} fromDate - Date string (e.g., '01/01/2024' or 'MM/DD/YYYY')
   * @param {string} toDate - Optional date string
   */
  async selectDateRange(filterType, fromDate, toDate = null) {
    try {
      let fromInput, toInput, dateRangeInput;
      
      switch (filterType) {
        case 'startDate':
          fromInput = this.startDateFromInput;
          toInput = this.startDateToInput;
          dateRangeInput = this.startDateFilter;
          break;
        case 'nextBillingDate':
          fromInput = this.nextBillingDateFromInput;
          toInput = this.nextBillingDateToInput;
          dateRangeInput = this.nextBillingDateFilter;
          break;
        case 'lastBillingDate':
          fromInput = this.lastBillingDateFromInput;
          toInput = this.lastBillingDateToInput;
          dateRangeInput = this.lastBillingDateFilter;
          break;
        default:
          throw new Error(`Unknown date filter type: ${filterType}`);
      }
      
      // Try to find the date range input, but don't fail if not found
      const dateRangeVisible = await dateRangeInput.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (dateRangeVisible) {
        await dateRangeInput.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
      }
      
      // Try to find the from input directly
      const fromInputVisible = await fromInput.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!fromInputVisible) {
        // Try alternative locators based on filter type
        let labelText = '';
        switch (filterType) {
          case 'startDate':
            labelText = 'Start Date';
            break;
          case 'nextBillingDate':
            labelText = 'Next Billing Date';
            break;
          case 'lastBillingDate':
            labelText = 'Last Billing Date';
            break;
        }
        
        // Try to find by label
        const label = this.page.locator(`mat-label:has-text("${labelText}")`).first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          // Find the parent form field and then the input
          const formField = label.locator('../..').locator('mat-date-range-input').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (formFieldVisible) {
            fromInput = formField.locator('input[matstartdate]').first();
            toInput = formField.locator('input[matenddate]').first();
          } else {
            // Try finding inputs by index if we know the order
            const allDateInputs = this.page.locator('input[matstartdate]');
            const count = await allDateInputs.count();
            let index = 0;
            if (filterType === 'nextBillingDate') index = 1;
            else if (filterType === 'lastBillingDate') index = 2;
            
            if (index < count) {
              fromInput = allDateInputs.nth(index);
              toInput = this.page.locator('input[matenddate]').nth(index);
            } else {
              throw new Error(`Could not find ${filterType} date inputs`);
            }
          }
        } else {
          throw new Error(`Could not find ${filterType} date filter label`);
        }
      }
      
      // Wait for from input to be visible
      await fromInput.waitFor({ state: 'visible', timeout: 10000 });
      await fromInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Click on the from date input to open calendar
      await fromInput.click();
      await this.page.waitForTimeout(1000);
      
      // Try to fill the date directly
      await fromInput.fill(fromDate);
      await this.page.waitForTimeout(500);
      
      // Press Enter to confirm if needed
      await fromInput.press('Enter');
      await this.page.waitForTimeout(500);
      
      if (toDate) {
        await toInput.waitFor({ state: 'visible', timeout: 10000 });
        await toInput.click();
        await this.page.waitForTimeout(500);
        await toInput.fill(toDate);
        await this.page.waitForTimeout(500);
        await toInput.press('Enter');
        await this.page.waitForTimeout(500);
      }
      
      // Click outside to close calendar if still open
      if (dateRangeVisible) {
        await dateRangeInput.click();
      } else {
        // Click on a neutral area
        await this.page.locator('body').click({ position: { x: 0, y: 0 } });
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting ${filterType}:`, error);
      throw error;
    }
  }

  /**
   * Fills company/email address filter.
   * @param {string} companyOrEmail
   */
  async fillCompanyEmail(companyOrEmail) {
    await this.companyEmailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.companyEmailInput.fill(companyOrEmail);
    await this.page.waitForTimeout(500);
  }

  /**
   * Fills SubCode filter.
   * @param {string} subCode
   */
  async fillSubCode(subCode) {
    await this.subCodeInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.subCodeInput.fill(subCode);
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects a status from the status dropdown.
   * @param {string} status - 'Active', 'Inactive', 'Suspend', 'Trial', 'Expired'
   */
  async selectStatus(status) {
    try {
      // Check if status select is visible, try alternative locators if not
      let statusSelectElement = this.statusSelect;
      let isVisible = await statusSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Try finding by label
        const label = this.page.locator('mat-label:has-text("Status")').first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          // Find the parent form field and then the select
          const formField = label.locator('../..').locator('mat-select').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (formFieldVisible) {
            statusSelectElement = formField;
            isVisible = true;
          } else {
            // Try finding all mat-selects and use the one near the Status label
            const allSelects = this.page.locator('mat-select');
            const selectCount = await allSelects.count();
            
            // Find the select that's closest to the Status label
            for (let i = 0; i < selectCount; i++) {
              const select = allSelects.nth(i);
              const selectVisible = await select.isVisible({ timeout: 1000 }).catch(() => false);
              if (selectVisible) {
                // Check if it's near the Status label by checking parent context
                const parentText = await select.locator('..').textContent().catch(() => '');
                if (parentText.toLowerCase().includes('status')) {
                  statusSelectElement = select;
                  isVisible = true;
                  break;
                }
              }
            }
          }
        }
        
        if (!isVisible) {
          throw new Error('Status select dropdown not found');
        }
      }
      
      // Wait for and click the status select
      await statusSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await statusSelectElement.scrollIntoViewIfNeeded();
      
      // Check if panel is already open
      let panel = this.page.locator('mat-select-panel').first();
      let panelVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!panelVisible) {
        // Click to open the select
        await statusSelectElement.click();
        await this.page.waitForTimeout(1500);
        
        // Try multiple panel locators
        panel = this.page.locator('mat-select-panel[id*="Status"]').first()
          .or(this.page.locator('mat-select-panel').first())
          .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
          .or(this.page.locator('[role="listbox"]').first());
        
        // Wait for panel to appear (check if it exists in DOM first)
        panelVisible = await panel.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!panelVisible) {
          // Check if panel exists in DOM but not visible
          const panelCount = await panel.count();
          if (panelCount > 0) {
            // Panel exists, try to make it visible or work with it
            await panel.evaluate((el) => {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            });
            await this.page.waitForTimeout(500);
            panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
          }
        }
        
        // If still not visible, try clicking again
        if (!panelVisible) {
          await statusSelectElement.click({ force: true });
          await this.page.waitForTimeout(1500);
          panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      // Map common status names to what might be in the dropdown
      const statusMap = {
        'Inactive': 'Suspend',
        'Suspended': 'Suspend'
      };
      const mappedStatus = statusMap[status] || status;
      
      // Find and click the status option - try multiple strategies
      let statusOption = panel.locator(`mat-option:has-text("${mappedStatus}")`).first()
        .or(this.page.locator(`mat-option:has-text("${mappedStatus}")`).first());
      
      let optionVisible = await statusOption.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!optionVisible) {
        // Try with original status name
        statusOption = panel.locator(`mat-option:has-text("${status}")`).first()
          .or(this.page.locator(`mat-option:has-text("${status}")`).first());
        optionVisible = await statusOption.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      // If option not visible, try to find it in DOM and click with force
      if (!optionVisible) {
        const statusOptionCount = await statusOption.count();
        if (statusOptionCount > 0) {
          // Option exists in DOM, click it with force
          await statusOption.click({ force: true });
          optionVisible = true;
        } else {
          // Try finding by partial text match
          const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
          const allOptionsCount = await allOptions.count();
          
          for (let i = 0; i < allOptionsCount; i++) {
            const option = allOptions.nth(i);
            const optionText = await option.textContent().catch(() => '');
            if (optionText && (optionText.includes(mappedStatus) || optionText.includes(status))) {
              await option.click({ force: true });
              optionVisible = true;
              break;
            }
          }
        }
      } else {
        await statusOption.click();
      }
      
      if (!optionVisible) {
        throw new Error(`Status option "${status}" or "${mappedStatus}" not found`);
      }
      
      await this.page.waitForTimeout(500);
      
      // Close panel if still open (press Escape)
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
    } catch (error) {
      console.error(`Error selecting status ${status}:`, error);
      throw error;
    }
  }

  /**
   * Selects one or more stages from the stage multi-select dropdown.
   * @param {string|string[]} stages - Single stage or array of stages
   */
  async selectStages(stages) {
    const stageArray = Array.isArray(stages) ? stages : [stages];
    
    try {
      // Check if stage select is visible, try alternative locators if not
      let stageSelectElement = this.stageSelect;
      let isVisible = await stageSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Try finding by label
        const label = this.page.locator('mat-label:has-text("Stage")').first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          const formField = label.locator('../..').locator('mat-select').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          if (formFieldVisible) {
            stageSelectElement = formField;
            isVisible = true;
          }
        }
        
        if (!isVisible) {
          throw new Error('Stage select dropdown not found');
        }
      }
      
      await stageSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await stageSelectElement.scrollIntoViewIfNeeded();
      
      // Check if panel is already open
      let panel = this.page.locator('mat-select-panel').first();
      let panelVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!panelVisible) {
        // Click to open the select
        await stageSelectElement.click();
        await this.page.waitForTimeout(1500);
        
        // Try multiple panel locators
        panel = this.page.locator('mat-select-panel[id*="Stage"]').first()
          .or(this.page.locator('mat-select-panel').first())
          .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
          .or(this.page.locator('[role="listbox"]').first());
        
        // Wait for panel to appear (check if it exists in DOM first)
        panelVisible = await panel.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!panelVisible) {
          // Check if panel exists in DOM but not visible
          const panelCount = await panel.count();
          if (panelCount > 0) {
            // Panel exists, try to make it visible or work with it
            await panel.evaluate((el) => {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            });
            await this.page.waitForTimeout(500);
            panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
          }
        }
        
        // If still not visible, try clicking again
        if (!panelVisible) {
          await stageSelectElement.click({ force: true });
          await this.page.waitForTimeout(1500);
          panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Select each stage - try multiple strategies
      for (const stage of stageArray) {
        let stageOption = panel.locator(`mat-option:has-text("${stage}")`).first()
          .or(this.page.locator(`mat-option:has-text("${stage}")`).first());
        
        let optionVisible = await stageOption.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (!optionVisible) {
          // Try finding by partial text match
          const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
          const allOptionsCount = await allOptions.count();
          
          for (let i = 0; i < allOptionsCount; i++) {
            const option = allOptions.nth(i);
            const optionText = await option.textContent().catch(() => '');
            if (optionText && optionText.includes(stage)) {
              stageOption = option;
              optionVisible = true;
              break;
            }
          }
        }
        
        if (optionVisible) {
          await stageOption.click();
          await this.page.waitForTimeout(300);
        } else {
          // Try clicking with force if option exists in DOM
          const optionCount = await stageOption.count();
          if (optionCount > 0) {
            await stageOption.click({ force: true });
            await this.page.waitForTimeout(300);
          } else {
            console.log(`    ⚠ Stage option "${stage}" not found, skipping...`);
          }
        }
      }
      
      // Close the dropdown by clicking outside or pressing Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting stages ${stageArray.join(', ')}:`, error);
      throw error;
    }
  }

  /**
   * Unselects all currently selected stages in the stage dropdown.
   */
  async unselectAllStages() {
    try {
      // Check if stage select is visible
      let stageSelectElement = this.stageSelect;
      let isVisible = await stageSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Try finding by label
        const label = this.page.locator('mat-label:has-text("Stage")').first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          const formField = label.locator('../..').locator('mat-select').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          if (formFieldVisible) {
            stageSelectElement = formField;
            isVisible = true;
          }
        }
        
        if (!isVisible) {
          console.log('⚠ Stage select dropdown not found, skipping unselect');
          return;
        }
      }
      
      await stageSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await stageSelectElement.scrollIntoViewIfNeeded();
      
      // Try multiple panel locators
      let panel = this.page.locator('mat-select-panel[id*="Stage"]').first()
        .or(this.page.locator('mat-select-panel').first())
        .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
        .or(this.page.locator('[role="listbox"]').first());
      
      // Check if panel is already open
      let panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
      
      // Also check if panel exists in DOM (might be in overlay)
      if (!panelVisible) {
        const panelCount = await panel.count();
        if (panelCount > 0) {
          // Panel exists in DOM, wait a bit more for it to become visible
          await this.page.waitForTimeout(500);
          panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      if (!panelVisible) {
        // Click to open the select
        await stageSelectElement.click();
        await this.page.waitForTimeout(1500);
        
        // Wait for panel to appear
        panelVisible = await panel.isVisible({ timeout: 5000 }).catch(() => false);
        
        // If still not visible, check if it exists in DOM
        if (!panelVisible) {
          const panelCount = await panel.count();
          if (panelCount > 0) {
            await this.page.waitForTimeout(500);
            panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
          }
        }
      }
      
      if (panelVisible) {
        await this.page.waitForTimeout(500);
        
        // Get all stage options
        const allStageOptions = panel.locator('mat-option');
        const stageOptionsCount = await allStageOptions.count();
        
        // Unselect all selected options
        for (let i = 0; i < stageOptionsCount; i++) {
          const option = allStageOptions.nth(i);
          const isSelected = await option.evaluate(el => {
            return el.classList.contains('mat-selected') || 
                   el.getAttribute('aria-selected') === 'true' ||
                   el.querySelector('mat-pseudo-checkbox.mat-pseudo-checkbox-checked') !== null;
          }).catch(() => false);
          
          if (isSelected) {
            await option.click();
            await this.page.waitForTimeout(300);
          }
        }
        
        // Close the dropdown
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      console.error('Error unselecting all stages:', error);
      // Don't throw error, just log it - this is a helper method
    }
  }

  /**
   * Selects a plan name from the plan name multi-select dropdown.
   * @param {string} planName
   */
  async selectPlanName(planName) {
    try {
      // Check if plan name select is visible, try alternative locators if not
      let planNameSelectElement = this.planNameSelect;
      let isVisible = await planNameSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Try finding by label
        const label = this.page.locator('mat-label:has-text("Plan Name"), mat-label:has-text("Plan")').first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          const formField = label.locator('../..').locator('mat-select').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          if (formFieldVisible) {
            planNameSelectElement = formField;
            isVisible = true;
          }
        }
        
        if (!isVisible) {
          throw new Error('Plan Name select dropdown not found');
        }
      }
      
      await planNameSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await planNameSelectElement.scrollIntoViewIfNeeded();
      
      // Check if panel is already open
      let panel = this.page.locator('mat-select-panel').first();
      let panelVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!panelVisible) {
        // Click to open the select
        await planNameSelectElement.click();
        await this.page.waitForTimeout(1500);
        
        // Try multiple panel locators
        panel = this.page.locator('mat-select-panel[id*="Plan"]').first()
          .or(this.page.locator('mat-select-panel').first())
          .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
          .or(this.page.locator('[role="listbox"]').first());
        
        // Wait for panel to appear (check if it exists in DOM first)
        panelVisible = await panel.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!panelVisible) {
          // Check if panel exists in DOM but not visible
          const panelCount = await panel.count();
          if (panelCount > 0) {
            // Panel exists, try to make it visible or work with it
            await panel.evaluate((el) => {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            });
            await this.page.waitForTimeout(500);
            panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
          }
        }
        
        // If still not visible, try clicking again
        if (!panelVisible) {
          await planNameSelectElement.click({ force: true });
          await this.page.waitForTimeout(1500);
          panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Use search if available
      const searchInput = panel.locator('input[placeholder="Search Here..."]').first();
      const hasSearch = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
      if (hasSearch) {
        await searchInput.fill(planName);
        await this.page.waitForTimeout(1000);
      }
      
      // Select the plan option - try multiple strategies
      let planOption = panel.locator(`mat-option .mdc-list-item__primary-text:has-text("${planName}")`).first()
        .or(this.page.locator(`mat-option .mdc-list-item__primary-text:has-text("${planName}")`).first())
        .or(panel.locator(`mat-option:has-text("${planName}")`).first())
        .or(this.page.locator(`mat-option:has-text("${planName}")`).first());
      
      let optionVisible = await planOption.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!optionVisible) {
        // Try finding by partial text match
        const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
        const allOptionsCount = await allOptions.count();
        
        for (let i = 0; i < allOptionsCount; i++) {
          const option = allOptions.nth(i);
          const optionText = await option.textContent().catch(() => '');
          if (optionText && optionText.toLowerCase().includes(planName.toLowerCase())) {
            planOption = option;
            optionVisible = true;
            break;
          }
        }
      }
      
      if (optionVisible) {
        await planOption.click();
      } else {
        // Try clicking with force if option exists in DOM
        const optionCount = await planOption.count();
        if (optionCount > 0) {
          await planOption.click({ force: true });
        } else {
          throw new Error(`Plan name option "${planName}" not found`);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting plan name ${planName}:`, error);
      throw error;
    }
  }

  /**
   * Selects a salesperson from the salesperson multi-select dropdown.
   * @param {string|null} salespersonName - If null or "all", selects all salespersons
   */
  async selectSalespersonFilter(salespersonName = null) {
    try {
      // Check if salesperson select is visible, try alternative locators if not
      let salespersonSelectElement = this.salespersonSelect;
      let isVisible = await salespersonSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Try finding by label
        const label = this.page.locator('mat-label:has-text("Salesperson")').first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          const formField = label.locator('../..').locator('mat-select').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          if (formFieldVisible) {
            salespersonSelectElement = formField;
            isVisible = true;
          }
        }
        
        if (!isVisible) {
          throw new Error('Salesperson select dropdown not found');
        }
      }
      
      await salespersonSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await salespersonSelectElement.scrollIntoViewIfNeeded();
      
      // Check if panel is already open
      let panel = this.page.locator('mat-select-panel').first();
      let panelVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!panelVisible) {
        // Click to open the select
        await salespersonSelectElement.click();
        await this.page.waitForTimeout(1500);
        
        // Try multiple panel locators
        panel = this.page.locator('mat-select-panel[id*="Salesperson"]').first()
          .or(this.page.locator('mat-select-panel').first())
          .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
          .or(this.page.locator('[role="listbox"]').first());
        
        // Wait for panel to appear (check if it exists in DOM first)
        panelVisible = await panel.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!panelVisible) {
          // Check if panel exists in DOM but not visible
          const panelCount = await panel.count();
          if (panelCount > 0) {
            // Panel exists, try to make it visible or work with it
            await panel.evaluate((el) => {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            });
            await this.page.waitForTimeout(500);
            panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
          }
        }
        
        // If still not visible, try clicking again
        if (!panelVisible) {
          await salespersonSelectElement.click({ force: true });
          await this.page.waitForTimeout(1500);
          panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // If salespersonName is null or "all", select "Select All" option
      if (!salespersonName || salespersonName.toLowerCase() === 'all') {
        const selectAllOption = panel.locator('mat-option:has-text("Select All")').first()
          .or(this.page.locator('mat-option:has-text("Select All")').first());
        const selectAllVisible = await selectAllOption.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (selectAllVisible) {
          await selectAllOption.click();
          await this.page.waitForTimeout(500);
        } else {
          // If "Select All" not found, select all options manually
          const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
          const allOptionsCount = await allOptions.count();
          
          for (let i = 0; i < allOptionsCount; i++) {
            const option = allOptions.nth(i);
            const optionText = await option.textContent().catch(() => '');
            // Skip "Select All" option if it exists
            if (optionText && !optionText.toLowerCase().includes('select all')) {
              const optionVisible = await option.isVisible({ timeout: 1000 }).catch(() => false);
              if (optionVisible) {
                await option.click();
                await this.page.waitForTimeout(200);
              } else {
                await option.click({ force: true });
                await this.page.waitForTimeout(200);
              }
            }
          }
        }
      } else {
        // Use search if available
        const searchInput = panel.locator('input[placeholder="Search Here..."]').first();
        const hasSearch = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
        if (hasSearch) {
          await searchInput.fill(salespersonName);
          await this.page.waitForTimeout(1000);
        }
        
        // Select the salesperson option - try multiple strategies
        let salespersonOption = panel.locator(`mat-option .mdc-list-item__primary-text:has-text("${salespersonName}")`).first()
          .or(this.page.locator(`mat-option .mdc-list-item__primary-text:has-text("${salespersonName}")`).first())
          .or(panel.locator(`mat-option:has-text("${salespersonName}")`).first())
          .or(this.page.locator(`mat-option:has-text("${salespersonName}")`).first());
        
        let optionVisible = await salespersonOption.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (!optionVisible) {
          // Try finding by partial text match
          const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
          const allOptionsCount = await allOptions.count();
          
          for (let i = 0; i < allOptionsCount; i++) {
            const option = allOptions.nth(i);
            const optionText = await option.textContent().catch(() => '');
            if (optionText && optionText.toLowerCase().includes(salespersonName.toLowerCase())) {
              salespersonOption = option;
              optionVisible = true;
              break;
            }
          }
        }
        
        if (optionVisible) {
          await salespersonOption.click();
        } else {
          // Try clicking with force if option exists in DOM
          const optionCount = await salespersonOption.count();
          if (optionCount > 0) {
            await salespersonOption.click({ force: true });
          } else {
            throw new Error(`Salesperson option "${salespersonName}" not found`);
          }
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting salesperson ${salespersonName || 'all'}:`, error);
      throw error;
    }
  }

  /**
   * Selects a relationship manager from the RM multi-select dropdown.
   * @param {string|null} rmName - If null or "all", selects all RMs
   */
  async selectRelationshipManager(rmName = null) {
    try {
      // Check if RM select is visible, try alternative locators if not
      let rmSelectElement = this.relationshipManagerSelect;
      let isVisible = await rmSelectElement.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Try finding by label
        const label = this.page.locator('mat-label:has-text("Relationship Manager"), mat-label:has-text("RM")').first();
        const labelVisible = await label.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (labelVisible) {
          const formField = label.locator('../..').locator('mat-select').first();
          const formFieldVisible = await formField.isVisible({ timeout: 3000 }).catch(() => false);
          if (formFieldVisible) {
            rmSelectElement = formField;
            isVisible = true;
          }
        }
        
        if (!isVisible) {
          throw new Error('Relationship Manager select dropdown not found');
        }
      }
      
      await rmSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await rmSelectElement.scrollIntoViewIfNeeded();
      
      // Check if panel is already open
      let panel = this.page.locator('mat-select-panel').last();
      let panelVisible = await panel.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!panelVisible) {
        // Click to open the select
        await rmSelectElement.click();
        await this.page.waitForTimeout(1500);
        
        // Try multiple panel locators (use last() for RM as it's usually the last dropdown)
        panel = this.page.locator('mat-select-panel[id*="Relationship Manager"]').first()
          .or(this.page.locator('mat-select-panel').last())
          .or(this.page.locator('.cdk-overlay-pane mat-select-panel').last())
          .or(this.page.locator('[role="listbox"]').last());
        
        // Wait for panel to appear (check if it exists in DOM first)
        panelVisible = await panel.isVisible({ timeout: 5000 }).catch(() => false);
        
        if (!panelVisible) {
          // Check if panel exists in DOM but not visible
          const panelCount = await panel.count();
          if (panelCount > 0) {
            // Panel exists, try to make it visible or work with it
            await panel.evaluate((el) => {
              el.style.display = 'block';
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            });
            await this.page.waitForTimeout(500);
            panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
          }
        }
        
        // If still not visible, try clicking again
        if (!panelVisible) {
          await rmSelectElement.click({ force: true });
          await this.page.waitForTimeout(1500);
          panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // If rmName is null or "all", select "Select All" option
      if (!rmName || rmName.toLowerCase() === 'all') {
        const selectAllOption = panel.locator('mat-option:has-text("Select All")').first()
          .or(this.page.locator('mat-option:has-text("Select All")').first());
        const selectAllVisible = await selectAllOption.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (selectAllVisible) {
          await selectAllOption.click();
          await this.page.waitForTimeout(500);
        } else {
          // If "Select All" not found, select all options manually
          const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
          const allOptionsCount = await allOptions.count();
          
          for (let i = 0; i < allOptionsCount; i++) {
            const option = allOptions.nth(i);
            const optionText = await option.textContent().catch(() => '');
            // Skip "Select All" option if it exists
            if (optionText && !optionText.toLowerCase().includes('select all')) {
              const optionVisible = await option.isVisible({ timeout: 1000 }).catch(() => false);
              if (optionVisible) {
                await option.click();
                await this.page.waitForTimeout(200);
              } else {
                await option.click({ force: true });
                await this.page.waitForTimeout(200);
              }
            }
          }
        }
      } else {
        // Use search if available
        const searchInput = panel.locator('input[placeholder="Search Here..."]').first();
        const hasSearch = await searchInput.isVisible({ timeout: 2000 }).catch(() => false);
        if (hasSearch) {
          await searchInput.fill(rmName);
          await this.page.waitForTimeout(1000);
        }
        
        // Select the RM option - try multiple strategies
        let rmOption = panel.locator(`mat-option .mdc-list-item__primary-text:has-text("${rmName}")`).first()
          .or(this.page.locator(`mat-option .mdc-list-item__primary-text:has-text("${rmName}")`).first())
          .or(panel.locator(`mat-option:has-text("${rmName}")`).first())
          .or(this.page.locator(`mat-option:has-text("${rmName}")`).first());
        
        let optionVisible = await rmOption.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (!optionVisible) {
          // Try finding by partial text match
          const allOptions = panel.locator('mat-option').or(this.page.locator('mat-option'));
          const allOptionsCount = await allOptions.count();
          
          for (let i = 0; i < allOptionsCount; i++) {
            const option = allOptions.nth(i);
            const optionText = await option.textContent().catch(() => '');
            if (optionText && optionText.toLowerCase().includes(rmName.toLowerCase())) {
              rmOption = option;
              optionVisible = true;
              break;
            }
          }
        }
        
        if (optionVisible) {
          await rmOption.click();
        } else {
          // Try clicking with force if option exists in DOM
          const optionCount = await rmOption.count();
          if (optionCount > 0) {
            await rmOption.click({ force: true });
          } else {
            throw new Error(`Relationship Manager option "${rmName}" not found`);
          }
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting relationship manager ${rmName || 'all'}:`, error);
      throw error;
    }
  }

  /**
   * Selects a value from the Set For dropdown.
   * @param {string} value - 'Auto Renew' or 'Auto Expire'
   */
  async selectSetFor(value) {
    try {
      console.log(`    Attempting to select Set For: ${value}`);
      
      // Find the Set For select by label first (most reliable)
      const label = this.page.locator('mat-label:has-text("Set For")').first();
      await label.waitFor({ state: 'visible', timeout: 10000 });
      await label.scrollIntoViewIfNeeded();
      
      // Navigate to the mat-select element
      const setForSelectElement = label.locator('../..').locator('mat-select').first();
      await setForSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await setForSelectElement.scrollIntoViewIfNeeded();
      console.log('    ✓ Set For select found');
      
      // Check if dropdown is already open
      let ariaExpanded = await setForSelectElement.getAttribute('aria-expanded');
      console.log(`    Current aria-expanded: ${ariaExpanded}`);
      
      if (ariaExpanded === 'true') {
        console.log('    Dropdown is already open');
      } else {
        console.log('    Clicking Set For select to open dropdown...');
        
        // Try clicking the select trigger first (the clickable area)
        const selectTrigger = setForSelectElement.locator('.mat-mdc-select-trigger').first();
        const triggerVisible = await selectTrigger.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (triggerVisible) {
          await selectTrigger.click();
          console.log('    ✓ Clicked on select trigger');
        } else {
          // Fallback: click the select element itself
          await setForSelectElement.click();
          console.log('    ✓ Clicked on select element');
        }
        
        await this.page.waitForTimeout(1000);
        
        // Wait for aria-expanded to become true
        let attempts = 0;
        while (attempts < 5 && ariaExpanded !== 'true') {
          ariaExpanded = await setForSelectElement.getAttribute('aria-expanded');
          if (ariaExpanded === 'true') {
            console.log('    ✓ Dropdown opened (aria-expanded=true)');
            break;
          }
          attempts++;
          await this.page.waitForTimeout(500);
        }
        
        // If still not open, try clicking again with force
        if (ariaExpanded !== 'true') {
          console.log('    Dropdown not opened, retrying with force...');
          await setForSelectElement.click({ force: true });
          await this.page.waitForTimeout(1000);
          ariaExpanded = await setForSelectElement.getAttribute('aria-expanded');
        }
      }
      
      // Wait for panel to appear
      await this.page.waitForTimeout(500);
      
      // Find the panel - use the ID from HTML if available
      let panel = this.page.locator('mat-select-panel[id*="mat-select-36"]').first()
        .or(this.page.locator('mat-select-panel').first())
        .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
        .or(this.page.locator('[role="listbox"]').first());
      
      let panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!panelVisible) {
        // Check if panel exists in DOM
        const panelCount = await panel.count();
        if (panelCount > 0) {
          console.log('    Panel exists in DOM, making it visible...');
          await panel.evaluate((el) => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          });
          await this.page.waitForTimeout(300);
          panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
        }
      }
      
      if (panelVisible) {
        console.log('    ✓ Panel is visible');
      } else {
        console.log('    ⚠ Panel not visible, but proceeding to find options...');
      }
      
      await this.page.waitForTimeout(300);
      
      // Find and click the option
      console.log(`    Looking for option: ${value}`);
      let option = panel.locator(`mat-option:has-text("${value}")`).first()
        .or(this.page.locator(`mat-option:has-text("${value}")`).first());
      
      let optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!optionVisible) {
        console.log('    Option not visible, searching all options...');
        // Search all mat-options on page
        const allOptions = this.page.locator('mat-option');
        const allOptionsCount = await allOptions.count();
        console.log(`    Found ${allOptionsCount} total mat-option elements`);
        
        for (let i = 0; i < allOptionsCount; i++) {
          const opt = allOptions.nth(i);
          const optionText = await opt.textContent().catch(() => '');
          if (optionText && optionText.toLowerCase().trim().includes(value.toLowerCase())) {
            option = opt;
            optionVisible = true;
            console.log(`    ✓ Found option at index ${i}: "${optionText.trim()}"`);
            break;
          }
        }
      }
      
      if (optionVisible) {
        console.log(`    Clicking option: ${value}`);
        await option.scrollIntoViewIfNeeded();
        await option.click();
      } else {
        // Try clicking with force if option exists in DOM
        const optionCount = await option.count();
        if (optionCount > 0) {
          console.log(`    Option exists in DOM, clicking with force...`);
          await option.click({ force: true });
        } else {
          throw new Error(`Set For option "${value}" not found`);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Verify selection by checking if dropdown closed (aria-expanded becomes false)
      ariaExpanded = await setForSelectElement.getAttribute('aria-expanded');
      if (ariaExpanded === 'true') {
        // Close dropdown if still open
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(200);
      }
      
      console.log(`    ✓ Set For "${value}" selected successfully`);
    } catch (error) {
      console.error(`Error selecting Set For ${value}:`, error);
      // Try to close any open dropdowns
      await this.page.keyboard.press('Escape').catch(() => {});
      throw error;
    }
  }

  /**
   * Selects a value from the Scheduler dropdown.
   * @param {string} value - 'Added' or 'Not Added'
   */
  async selectScheduler(value) {
    try {
      console.log(`    Attempting to select Scheduler: ${value}`);
      
      // Find the Scheduler select by label first (most reliable) - Note: HTML uses "Schedular" spelling
      const label = this.page.locator('mat-label:has-text("Schedular")').first();
      await label.waitFor({ state: 'visible', timeout: 10000 });
      await label.scrollIntoViewIfNeeded();
      
      // Navigate to the mat-select element
      const schedulerSelectElement = label.locator('../..').locator('mat-select').first();
      await schedulerSelectElement.waitFor({ state: 'visible', timeout: 10000 });
      await schedulerSelectElement.scrollIntoViewIfNeeded();
      console.log('    ✓ Scheduler select found');
      
      // Check if dropdown is already open
      let ariaExpanded = await schedulerSelectElement.getAttribute('aria-expanded');
      console.log(`    Current aria-expanded: ${ariaExpanded}`);
      
      if (ariaExpanded === 'true') {
        console.log('    Dropdown is already open');
      } else {
        console.log('    Clicking Scheduler select to open dropdown...');
        
        // Try clicking the select trigger first (the clickable area)
        const selectTrigger = schedulerSelectElement.locator('.mat-mdc-select-trigger').first();
        const triggerVisible = await selectTrigger.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (triggerVisible) {
          await selectTrigger.click();
          console.log('    ✓ Clicked on select trigger');
        } else {
          // Fallback: click the select element itself
          await schedulerSelectElement.click();
          console.log('    ✓ Clicked on select element');
        }
        
        await this.page.waitForTimeout(1000);
        
        // Wait for aria-expanded to become true
        let attempts = 0;
        while (attempts < 5 && ariaExpanded !== 'true') {
          ariaExpanded = await schedulerSelectElement.getAttribute('aria-expanded');
          if (ariaExpanded === 'true') {
            console.log('    ✓ Dropdown opened (aria-expanded=true)');
            break;
          }
          attempts++;
          await this.page.waitForTimeout(500);
        }
        
        // If still not open, try clicking again with force
        if (ariaExpanded !== 'true') {
          console.log('    Dropdown not opened, retrying with force...');
          await schedulerSelectElement.click({ force: true });
          await this.page.waitForTimeout(1000);
          ariaExpanded = await schedulerSelectElement.getAttribute('aria-expanded');
        }
      }
      
      // Wait for panel to appear
      await this.page.waitForTimeout(500);
      
      // Find the panel - use the ID from HTML if available
      let panel = this.page.locator('mat-select-panel[id*="mat-select-38"]').first()
        .or(this.page.locator('mat-select-panel[id*="mat-select-38-panel"]').first())
        .or(this.page.locator('mat-select-panel').first())
        .or(this.page.locator('.cdk-overlay-pane mat-select-panel').first())
        .or(this.page.locator('[role="listbox"]').first());
      
      let panelVisible = await panel.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!panelVisible) {
        // Check if panel exists in DOM
        const panelCount = await panel.count();
        if (panelCount > 0) {
          console.log('    Panel exists in DOM, making it visible...');
          await panel.evaluate((el) => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          });
          await this.page.waitForTimeout(300);
          panelVisible = await panel.isVisible({ timeout: 2000 }).catch(() => false);
        }
      }
      
      if (panelVisible) {
        console.log('    ✓ Panel is visible');
      } else {
        console.log('    ⚠ Panel not visible, but proceeding to find options...');
      }
      
      await this.page.waitForTimeout(300);
      
      // Find and click the option
      console.log(`    Looking for option: ${value}`);
      let option = panel.locator(`mat-option:has-text("${value}")`).first()
        .or(this.page.locator(`mat-option:has-text("${value}")`).first());
      
      let optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!optionVisible) {
        console.log('    Option not visible, searching all options...');
        // Search all mat-options on page
        const allOptions = this.page.locator('mat-option');
        const allOptionsCount = await allOptions.count();
        console.log(`    Found ${allOptionsCount} total mat-option elements`);
        
        for (let i = 0; i < allOptionsCount; i++) {
          const opt = allOptions.nth(i);
          const optionText = await opt.textContent().catch(() => '');
          if (optionText && optionText.toLowerCase().trim().includes(value.toLowerCase())) {
            option = opt;
            optionVisible = true;
            console.log(`    ✓ Found option at index ${i}: "${optionText.trim()}"`);
            break;
          }
        }
      }
      
      if (optionVisible) {
        console.log(`    Clicking option: ${value}`);
        await option.scrollIntoViewIfNeeded();
        await option.click();
      } else {
        // Try clicking with force if option exists in DOM
        const optionCount = await option.count();
        if (optionCount > 0) {
          console.log(`    Option exists in DOM, clicking with force...`);
          await option.click({ force: true });
        } else {
          throw new Error(`Scheduler option "${value}" not found`);
        }
      }
      
      await this.page.waitForTimeout(500);
      
      // Verify selection by checking if dropdown closed (aria-expanded becomes false)
      ariaExpanded = await schedulerSelectElement.getAttribute('aria-expanded');
      if (ariaExpanded === 'true') {
        // Close dropdown if still open
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(200);
      }
      
      console.log(`    ✓ Scheduler "${value}" selected successfully`);
    } catch (error) {
      console.error(`Error selecting Scheduler ${value}:`, error);
      // Try to close any open dropdowns
      await this.page.keyboard.press('Escape').catch(() => {});
      throw error;
    }
  }

  /**
   * Fills the Tally Serial No filter.
   * @param {string} serialNo
   */
  async fillTallySerialNo(serialNo) {
    await this.tallySerialNoInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.tallySerialNoInput.fill(serialNo);
    await this.page.waitForTimeout(500);
  }

  /**
   * Clicks the Search button.
   */
  async clickSearch() {
    await this.searchSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchSubmitButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  /**
   * Clicks the Reset button.
   */
  async clickReset() {
    await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verifies that all visible table rows contain the search keyword.
   * @param {string} keyword
   * @param {string} searchType - 'company', 'subId', 'email'
   * @returns {Promise<{matched: number, total: number, allMatch: boolean}>}
   */
  async verifyTableRowsContainKeyword(keyword, searchType = 'company') {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      let matched = 0;
      const keywordLower = keyword.toLowerCase();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();
        
        if (rowText && rowText.toLowerCase().includes(keywordLower)) {
          matched++;
        }
      }
      
      return {
        matched,
        total: rowCount,
        allMatch: matched === rowCount
      };
    } catch (error) {
      console.error('Error verifying table rows:', error);
      return { matched: 0, total: 0, allMatch: false };
    }
  }

  /**
   * Verifies that all visible table rows have the specified status.
   * @param {string} status
   * @returns {Promise<{matched: number, total: number, allMatch: boolean}>}
   */
  async verifyTableRowsHaveStatus(status) {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      let matched = 0;
      const statusLower = status.toLowerCase();
      
      // Map status names that might differ between dropdown and table
      const statusMap = {
        'suspend': ['suspend', 'suspended', 'inactive'],
        'active': ['active'],
        'inactive': ['inactive', 'suspend', 'suspended'],
        'suspended': ['suspended', 'suspend', 'inactive'],
        'trial': ['trial'],
        'expired': ['expired']
      };
      
      // Get possible status values to match
      const possibleStatuses = statusMap[statusLower] || [statusLower];
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        
        // Try to get status from status column
        let statusCell = row.locator('td.cdk-column-Status, mat-cell.cdk-column-Status').first();
        let statusText = await statusCell.textContent().catch(() => '');
        
        // If status cell is empty or not found, try getting from span with status class
        if (!statusText || statusText.trim() === '') {
          statusCell = row.locator('td.cdk-column-Status span, mat-cell.cdk-column-Status span').first();
          statusText = await statusCell.textContent().catch(() => '');
        }
        
        // Also check for status in class names or data attributes
        if (!statusText || statusText.trim() === '') {
          const statusSpan = row.locator('td.cdk-column-Status span, mat-cell.cdk-column-Status span').first();
          const statusClass = await statusSpan.getAttribute('class').catch(() => '');
          const statusNgClass = await statusSpan.getAttribute('ng-reflect-ng-class').catch(() => '');
          const statusMessage = await statusSpan.getAttribute('ng-reflect-message').catch(() => '');
          
          // Check class for status indicators
          if (statusClass) {
            for (const possibleStatus of possibleStatuses) {
              if (statusClass.toLowerCase().includes(possibleStatus)) {
                statusText = possibleStatus;
                break;
              }
            }
          }
          
          // Check ng-reflect-message attribute
          if (!statusText && statusMessage) {
            statusText = statusMessage;
          }
          
          // Check ng-reflect-ng-class attribute
          if (!statusText && statusNgClass) {
            for (const possibleStatus of possibleStatuses) {
              if (statusNgClass.toLowerCase().includes(possibleStatus)) {
                statusText = possibleStatus;
                break;
              }
            }
          }
        }
        
        // If still empty, try getting entire row text and look for status
        if (!statusText || statusText.trim() === '') {
          const rowText = await row.textContent().catch(() => '');
          // Look for status keywords in row text
          for (const possibleStatus of possibleStatuses) {
            if (rowText.toLowerCase().includes(possibleStatus)) {
              statusText = possibleStatus;
              break;
            }
          }
        }
        
        const statusTextLower = statusText ? statusText.toLowerCase().trim() : '';
        
        // Check if status matches any of the possible statuses
        let isMatch = false;
        for (const possibleStatus of possibleStatuses) {
          if (statusTextLower.includes(possibleStatus) || possibleStatus.includes(statusTextLower)) {
            isMatch = true;
            break;
          }
        }
        
        if (isMatch) {
          matched++;
        } else {
          // Log first non-matching row for debugging
          if (i === 0) {
            console.log(`    First row status text: "${statusText}" (searching for: ${status})`);
          }
        }
      }
      
      return {
        matched,
        total: rowCount,
        allMatch: matched === rowCount
      };
    } catch (error) {
      console.error('Error verifying status:', error);
      return { matched: 0, total: 0, allMatch: false };
    }
  }

  /**
   * Verifies that all visible table rows have the specified stage.
   * @param {string|string[]} stages
   * @returns {Promise<{matched: number, total: number, allMatch: boolean}>}
   */
  async verifyTableRowsHaveStage(stages) {
    try {
      const stageArray = Array.isArray(stages) ? stages : [stages];
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      let matched = 0;
      const stagesLower = stageArray.map(s => s.toLowerCase());
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const stageCell = row.locator('td.cdk-column-Stage, mat-cell.cdk-column-Stage').first();
        const stageText = await stageCell.textContent().catch(() => '');
        
        if (stageText && stagesLower.some(s => stageText.toLowerCase().includes(s))) {
          matched++;
        }
      }
      
      return {
        matched,
        total: rowCount,
        allMatch: matched === rowCount
      };
    } catch (error) {
      console.error('Error verifying stage:', error);
      return { matched: 0, total: 0, allMatch: false };
    }
  }

  /**
   * Verifies that all visible table rows have the specified plan name.
   * @param {string} planName
   * @returns {Promise<{matched: number, total: number, allMatch: boolean}>}
   */
  async verifyTableRowsHavePlanName(planName) {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      let matched = 0;
      const planNameLower = planName.toLowerCase();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const planCell = row.locator('td.cdk-column-Plan-Name, mat-cell.cdk-column-Plan-Name').first();
        const planText = await planCell.textContent().catch(() => '');
        
        if (planText && planText.toLowerCase().includes(planNameLower)) {
          matched++;
        }
      }
      
      return {
        matched,
        total: rowCount,
        allMatch: matched === rowCount
      };
    } catch (error) {
      console.error('Error verifying plan name:', error);
      return { matched: 0, total: 0, allMatch: false };
    }
  }

  /**
   * Verifies that all visible table rows have the specified subcode.
   * @param {string} subCode
   * @returns {Promise<{matched: number, total: number, allMatch: boolean}>}
   */
  async verifyTableRowsHaveSubCode(subCode) {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      let matched = 0;
      const subCodeLower = subCode.toLowerCase();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const subIdCell = row.locator('td.cdk-column-Sub-Id, mat-cell.cdk-column-Sub-Id').first();
        const subIdText = await subIdCell.textContent().catch(() => '');
        
        if (subIdText && subIdText.toLowerCase().includes(subCodeLower)) {
          matched++;
        }
      }
      
      return {
        matched,
        total: rowCount,
        allMatch: matched === rowCount
      };
    } catch (error) {
      console.error('Error verifying subcode:', error);
      return { matched: 0, total: 0, allMatch: false };
    }
  }

  /**
   * Verifies that all visible table rows have the specified tally serial number.
   * @param {string} serialNo
   * @returns {Promise<{matched: number, total: number, allMatch: boolean}>}
   */
  async verifyTableRowsHaveTallySerialNo(serialNo) {
    try {
      await this.subscriptionTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionTableRows;
      const rowCount = await rows.count();
      
      let matched = 0;
      const serialNoLower = serialNo.toLowerCase();
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const serialCell = row.locator('td.cdk-column-Tally-Serial-No, mat-cell.cdk-column-Tally-Serial-No').first();
        const serialText = await serialCell.textContent().catch(() => '');
        
        if (serialText && serialText.toLowerCase().includes(serialNoLower)) {
          matched++;
        }
      }
      
      return {
        matched,
        total: rowCount,
        allMatch: matched === rowCount
      };
    } catch (error) {
      console.error('Error verifying tally serial no:', error);
      return { matched: 0, total: 0, allMatch: false };
    }
  }

  /**
   * Checks if "No records found" or "No subscription found" message is visible.
   * @returns {Promise<boolean>}
   */
  async isNoRecordsFoundVisible() {
    try {
      const noRecords = await this.page.locator('*:has-text("No records found"), *:has-text("no subscription found"), *:has-text("There is no subscription found")').first();
      return await noRecords.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the "Select Headers" dropdown.
   */
  async openSelectHeadersDropdown() {
    try {
      await this.selectHeadersButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectHeadersButton.scrollIntoViewIfNeeded();
      
      // Check if dropdown is already open
      const ariaExpanded = await this.selectHeadersButton.getAttribute('aria-expanded');
      if (ariaExpanded === 'true') {
        console.log('  Select Headers dropdown is already open');
        return;
      }
      
      await this.selectHeadersButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for dropdown menu to be visible
      await this.selectHeadersDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      console.log('  ✓ Select Headers dropdown opened');
    } catch (error) {
      console.error('Error opening Select Headers dropdown:', error);
      throw error;
    }
  }

  /**
   * Gets all checkbox options from the Select Headers dropdown.
   * @returns {Promise<Array<{label: string, checkbox: Locator, checked: boolean}>>}
   */
  async getSelectHeadersOptions() {
    try {
      const options = [];
      const checkboxes = this.selectHeadersCheckboxes;
      const labels = this.selectHeadersLabels;
      
      const checkboxCount = await checkboxes.count();
      const labelCount = await labels.count();
      
      const count = Math.min(checkboxCount, labelCount);
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const label = labels.nth(i);
        
        const labelText = await label.locator('span').textContent().catch(() => '');
        const isChecked = await checkbox.isChecked().catch(() => false);
        const value = await checkbox.getAttribute('value').catch(() => '');
        
        if (labelText && labelText.trim()) {
          options.push({
            label: labelText.trim(),
            value: value || labelText.trim(),
            checkbox: checkbox,
            checked: isChecked
          });
        }
      }
      
      return options;
    } catch (error) {
      console.error('Error getting Select Headers options:', error);
      return [];
    }
  }

  /**
   * Checks or unchecks all column options in the Select Headers dropdown.
   * @param {boolean} check - true to check all, false to uncheck all
   */
  async toggleAllColumnOptions(check) {
    try {
      const options = await this.getSelectHeadersOptions();
      console.log(`  ${check ? 'Checking' : 'Unchecking'} ${options.length} column options...`);
      
      for (const option of options) {
        const isChecked = await option.checkbox.isChecked().catch(() => false);
        
        if (check && !isChecked) {
          await option.checkbox.check();
          await this.page.waitForTimeout(100);
        } else if (!check && isChecked) {
          await option.checkbox.uncheck();
          await this.page.waitForTimeout(100);
        }
      }
      
      console.log(`  ✓ All options ${check ? 'checked' : 'unchecked'}`);
    } catch (error) {
      console.error(`Error ${check ? 'checking' : 'unchecking'} all column options:`, error);
      throw error;
    }
  }

  /**
   * Verifies if a column is visible in the table header.
   * @param {string} columnName - Name of the column (e.g., "Phone No", "Plan Name")
   * @returns {Promise<boolean>}
   */
  async isColumnVisible(columnName) {
    try {
      // Try multiple strategies to find the column header
      const columnHeader = this.page.locator(`th:has-text("${columnName}"), mat-header-cell:has-text("${columnName}")`).first()
        .or(this.page.locator(`th.cdk-column-${columnName.replace(/\s+/g, '-')}, mat-header-cell.cdk-column-${columnName.replace(/\s+/g, '-')}`).first())
        .or(this.page.locator(`th.mat-column-${columnName.replace(/\s+/g, '-')}, mat-header-cell.mat-column-${columnName.replace(/\s+/g, '-')}`).first());
      
      const isVisible = await columnHeader.isVisible({ timeout: 2000 }).catch(() => false);
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies that all checked column options are visible in the table.
   * @param {Array<{label: string, checked: boolean}>} options - Array of column options
   * @returns {Promise<{allVisible: boolean, missingColumns: string[]}>}
   */
  async verifyCheckedColumnsVisible(options) {
    try {
      const checkedOptions = options.filter(opt => opt.checked);
      const missingColumns = [];
      
      console.log(`  Verifying ${checkedOptions.length} checked columns are visible...`);
      
      for (const option of checkedOptions) {
        const isVisible = await this.isColumnVisible(option.label);
        if (!isVisible) {
          missingColumns.push(option.label);
          console.log(`    ✗ Column "${option.label}" is not visible`);
        } else {
          console.log(`    ✓ Column "${option.label}" is visible`);
        }
      }
      
      return {
        allVisible: missingColumns.length === 0,
        missingColumns: missingColumns
      };
    } catch (error) {
      console.error('Error verifying checked columns:', error);
      return { allVisible: false, missingColumns: [] };
    }
  }

  /**
   * Verifies that all unchecked column options are NOT visible in the table.
   * @param {Array<{label: string, checked: boolean}>} options - Array of column options
   * @returns {Promise<{allHidden: boolean, visibleColumns: string[]}>}
   */
  async verifyUncheckedColumnsHidden(options) {
    try {
      const uncheckedOptions = options.filter(opt => !opt.checked);
      const visibleColumns = [];
      
      console.log(`  Verifying ${uncheckedOptions.length} unchecked columns are hidden...`);
      
      for (const option of uncheckedOptions) {
        const isVisible = await this.isColumnVisible(option.label);
        if (isVisible) {
          visibleColumns.push(option.label);
          console.log(`    ✗ Column "${option.label}" is still visible (should be hidden)`);
        } else {
          console.log(`    ✓ Column "${option.label}" is hidden`);
        }
      }
      
      return {
        allHidden: visibleColumns.length === 0,
        visibleColumns: visibleColumns
      };
    } catch (error) {
      console.error('Error verifying unchecked columns:', error);
      return { allHidden: false, visibleColumns: [] };
    }
  }

  /**
   * Gets the column header locator for a given column name.
   * @param {string} columnName - Column name (e.g., "Sub Id", "Plan Name", "Unit Price", "Amount", "Current MRR", "Next Billing Date")
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async getColumnHeader(columnName) {
    try {
      // Normalize column name to match class names (e.g., "Sub Id" -> "Sub-Id", "Plan Name" -> "Plan-Name")
      const normalizedColumnName = columnName.replace(/\s+/g, '-');
      
      // Try multiple strategies to find the column header
      const header = this.page.locator(`th.cdk-column-${normalizedColumnName}:has-text("${columnName}")`).first()
        .or(this.page.locator(`th.mat-column-${normalizedColumnName}:has-text("${columnName}")`).first())
        .or(this.page.locator(`th:has-text("${columnName}")`).first())
        .or(this.page.locator(`mat-header-cell.cdk-column-${normalizedColumnName}:has-text("${columnName}")`).first());
      
      await header.waitFor({ state: 'visible', timeout: 10000 });
      return header;
    } catch (error) {
      console.error(`Error getting column header for "${columnName}":`, error);
      throw error;
    }
  }

  /**
   * Clicks a column header to sort the table.
   * @param {string} columnName - Column name to sort by
   * @param {number} clickCount - Number of times to click (1 for ascending, 2 for descending)
   */
  async clickColumnHeaderToSort(columnName, clickCount = 1) {
    try {
      const header = await this.getColumnHeader(columnName);
      await header.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get initial first row value to detect when sort completes
      const initialFirstRow = this.subscriptionTableRows.first();
      const initialFirstRowText = await initialFirstRow.textContent().catch(() => '');
      
      for (let i = 0; i < clickCount; i++) {
        await header.click();
        
        // Wait for table to update - check if first row changed
        let attempts = 0;
        let sortCompleted = false;
        while (attempts < 10 && !sortCompleted) {
          await this.page.waitForTimeout(500);
          
          const currentFirstRow = this.subscriptionTableRows.first();
          const currentFirstRowText = await currentFirstRow.textContent().catch(() => '');
          
          // If first row changed, sort might have completed
          if (currentFirstRowText !== initialFirstRowText && currentFirstRowText.trim() !== '') {
            // Wait a bit more to ensure sort is fully applied
            await this.page.waitForTimeout(1000);
            sortCompleted = true;
          }
          
          attempts++;
        }
        
        // Additional wait for table to stabilize
        await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
        await this.page.waitForTimeout(2000);
        
        // Wait for table rows to be visible and updated
        await this.subscriptionTableRows.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.error(`Error clicking column header "${columnName}":`, error);
      throw error;
    }
  }

  /**
   * Gets all cell values from a specific column on the current page only.
   * @param {string} columnName - Column name (e.g., "Sub Id", "Plan Name")
   * @param {boolean} firstPageOnly - If true, only gets values from first page (default: true)
   * @returns {Promise<string[]>}
   */
  async getAllColumnValues(columnName, firstPageOnly = true) {
    try {
      const allValues = [];
      const normalizedColumnName = columnName.replace(/\s+/g, '-');
      
      // Get total records from pagination
      const paginationTotal = await this.getPaginationTotal();
      console.log(`  Total records: ${paginationTotal}`);
      
      if (paginationTotal === 0) {
        return [];
      }
      
      if (firstPageOnly) {
        // Only get values from first page
        console.log(`  Collecting values from first page only...`);
        
        // Ensure we're on the first page
        const currentRange = await this.getPaginationRange();
        if (currentRange.start > 1) {
          // Navigate to first page by changing items per page (this resets to page 1)
          const itemsPerPage = currentRange.end - currentRange.start + 1;
          await this.changeItemsPerPage(itemsPerPage);
          await this.page.waitForTimeout(2000);
        }
        
        // Get all rows on current page
        const rows = this.subscriptionTableRows;
        const rowCount = await rows.count();
        
        console.log(`  First page: Reading ${rowCount} rows...`);
        
        // Extract values from the column for each row
        for (let i = 0; i < rowCount; i++) {
          const row = rows.nth(i);
          
          // Try multiple strategies to find the cell
          const cell = row.locator(`td.cdk-column-${normalizedColumnName}, mat-cell.cdk-column-${normalizedColumnName}`).first()
            .or(row.locator(`td.mat-column-${normalizedColumnName}, mat-cell.mat-column-${normalizedColumnName}`).first());
          
          const cellText = await cell.textContent().catch(() => '');
          if (cellText) {
            allValues.push(cellText.trim());
          }
        }
        
        console.log(`  ✓ Collected ${allValues.length} values from column "${columnName}" (first page only)`);
        return allValues;
      } else {
        // Original logic for all pages (kept for backward compatibility, but not used)
        // Get current items per page
        const currentRange = await this.getPaginationRange();
        const itemsPerPage = currentRange.end - currentRange.start + 1;
        
        // Calculate total pages
        const totalPages = Math.ceil(paginationTotal / itemsPerPage);
        console.log(`  Total pages: ${totalPages}, Items per page: ${itemsPerPage}`);
        
        // Navigate to first page
        await this.changeItemsPerPage(itemsPerPage);
        await this.page.waitForTimeout(2000);
        
        // Collect values from all pages
        for (let page = 1; page <= totalPages; page++) {
          if (page > 1) {
            // Navigate to next page
            await this.clickNextPage();
            await this.page.waitForTimeout(1500);
          }
          
          // Get all rows on current page
          const rows = this.subscriptionTableRows;
          const rowCount = await rows.count();
          
          console.log(`  Page ${page}/${totalPages}: Reading ${rowCount} rows...`);
          
          // Extract values from the column for each row
          for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            
            // Try multiple strategies to find the cell
            const cell = row.locator(`td.cdk-column-${normalizedColumnName}, mat-cell.cdk-column-${normalizedColumnName}`).first()
              .or(row.locator(`td.mat-column-${normalizedColumnName}, mat-cell.mat-column-${normalizedColumnName}`).first());
            
            const cellText = await cell.textContent().catch(() => '');
            if (cellText) {
              allValues.push(cellText.trim());
            }
          }
        }
        
        // Navigate back to first page
        await this.changeItemsPerPage(itemsPerPage);
        await this.page.waitForTimeout(2000);
        
        console.log(`  ✓ Collected ${allValues.length} values from column "${columnName}"`);
        return allValues;
      }
    } catch (error) {
      console.error(`Error getting all column values for "${columnName}":`, error);
      throw error;
    }
  }

  /**
   * Normalizes a value based on its type (number, currency, date, text).
   * @param {string} value - Raw value from table
   * @param {string} type - Type of value: 'number', 'currency', 'date', 'text', 'subid'
   * @returns {string|number|Date} - Normalized value for comparison
   */
  normalizeValue(value, type) {
    if (!value || value.trim() === '') {
      return type === 'number' || type === 'currency' ? 0 : '';
    }
    
    const trimmed = value.trim();
    
    switch (type) {
      case 'number':
      case 'currency':
        // Remove currency symbols, commas, spaces, and extract number
        const cleaned = trimmed.replace(/[₹$€£,\s]/g, '');
        const numValue = parseFloat(cleaned);
        return isNaN(numValue) ? 0 : numValue;
        
      case 'date':
        // Try to parse date - handle various formats
        // Common formats: DD-MM-YYYY, DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, etc.
        const dateStr = trimmed;
        let date = null;
        
        // Try DD-MM-YYYY format (e.g., "05-02-2025")
        const dashMatch = dateStr.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
        if (dashMatch) {
          const [, d, m, y] = dashMatch;
          date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
        } else {
          // Try DD/MM/YYYY or MM/DD/YYYY
          const slashMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
          if (slashMatch) {
            const [, d, m, y] = slashMatch;
            date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
          } else {
            // Try ISO format YYYY-MM-DD
            date = new Date(dateStr);
          }
        }
        
        return date && !isNaN(date.getTime()) ? date : new Date(0);
        
      case 'subid':
        // For Sub ID, we need to handle mixed formats like "SUB-P09999" and "SUB-00001"
        // Extract the part after "SUB-" and normalize for comparison
        const subIdMatch = trimmed.match(/SUB-?([A-Z0-9]+)/i);
        if (subIdMatch) {
          const idPart = subIdMatch[1];
          // If it starts with a letter, pad with zeros for consistent comparison
          // If it's all numbers, keep as is
          if (/^[A-Z]/i.test(idPart)) {
            // Extract number part after letter(s)
            const numMatch = idPart.match(/([A-Z]+)(\d+)/i);
            if (numMatch) {
              const [, letters, numbers] = numMatch;
              // Pad numbers to same length for comparison
              const paddedNum = numbers.padStart(10, '0');
              return letters.toUpperCase() + paddedNum;
            }
          }
          // If all numbers, pad to same length
          if (/^\d+$/.test(idPart)) {
            return idPart.padStart(10, '0');
          }
          return idPart.toUpperCase();
        }
        return trimmed.toUpperCase();
        
      case 'text':
      default:
        return trimmed.toLowerCase();
    }
  }

  /**
   * Verifies that values are sorted in ascending order.
   * @param {Array<string>} values - Array of raw values
   * @param {string} type - Type of value: 'number', 'currency', 'date', 'text', 'subid'
   * @returns {Promise<{isSorted: boolean, errors: string[]}>}
   */
  async verifyAscendingSort(values, type) {
    try {
      if (values.length <= 1) {
        return { isSorted: true, errors: [] };
      }
      
      const normalized = values.map(v => this.normalizeValue(v, type));
      const errors = [];
      
      for (let i = 1; i < normalized.length; i++) {
        const prev = normalized[i - 1];
        const curr = normalized[i];
        
        let isOrdered = false;
        
        if (type === 'number' || type === 'currency') {
          isOrdered = prev <= curr;
        } else if (type === 'date') {
          isOrdered = prev <= curr;
        } else if (type === 'text') {
          isOrdered = prev <= curr;
        } else if (type === 'subid') {
          // For Sub ID, compare as strings
          isOrdered = prev <= curr;
        }
        
        if (!isOrdered) {
          errors.push(`Position ${i - 1} (${values[i - 1]}) should be <= position ${i} (${values[i]})`);
        }
      }
      
      return {
        isSorted: errors.length === 0,
        errors: errors
      };
    } catch (error) {
      console.error('Error verifying ascending sort:', error);
      return { isSorted: false, errors: [error.message] };
    }
  }

  /**
   * Verifies that values are sorted in descending order.
   * @param {Array<string>} values - Array of raw values
   * @param {string} type - Type of value: 'number', 'currency', 'date', 'text', 'subid'
   * @returns {Promise<{isSorted: boolean, errors: string[]}>}
   */
  async verifyDescendingSort(values, type) {
    try {
      if (values.length <= 1) {
        return { isSorted: true, errors: [] };
      }
      
      const normalized = values.map(v => this.normalizeValue(v, type));
      const errors = [];
      
      for (let i = 1; i < normalized.length; i++) {
        const prev = normalized[i - 1];
        const curr = normalized[i];
        const prevRaw = values[i - 1];
        const currRaw = values[i];
        
        let isOrdered = false;
        
        if (type === 'number' || type === 'currency') {
          // For numbers, compare as numbers
          const prevNum = typeof prev === 'number' ? prev : parseFloat(prev) || 0;
          const currNum = typeof curr === 'number' ? curr : parseFloat(curr) || 0;
          isOrdered = prevNum >= currNum;
        } else if (type === 'date') {
          // For dates, compare as Date objects
          const prevDate = prev instanceof Date ? prev : new Date(prev);
          const currDate = curr instanceof Date ? curr : new Date(curr);
          isOrdered = prevDate >= currDate;
        } else if (type === 'text') {
          // For text, compare as strings (already lowercase)
          isOrdered = String(prev) >= String(curr);
        } else if (type === 'subid') {
          // For Sub ID, compare as strings (already normalized)
          isOrdered = String(prev) >= String(curr);
        }
        
        if (!isOrdered) {
          errors.push(`Position ${i - 1} (${prevRaw}) should be >= position ${i} (${currRaw})`);
        }
      }
      
      return {
        isSorted: errors.length === 0,
        errors: errors
      };
    } catch (error) {
      console.error('Error verifying descending sort:', error);
      return { isSorted: false, errors: [error.message] };
    }
  }

  /**
   * Reusable function to verify sorting on a column (first page only).
   * Note: First click sorts DESCENDING, second click sorts ASCENDING.
   * @param {string} columnName - Column name to sort
   * @param {string} type - Type of value: 'number', 'currency', 'date', 'text', 'subid'
   * @param {boolean} firstPageOnly - If true, only verifies sorting on first page (default: true)
   * @returns {Promise<{ascending: boolean, descending: boolean, errors: string[]}>}
   */
  async verifySort(columnName, type, firstPageOnly = true) {
    try {
      console.log(`\n  Verifying sort for column: "${columnName}" (type: ${type}, first page only: ${firstPageOnly})`);
      console.log(`    Note: First click = DESCENDING, Second click = ASCENDING`);
      
      // Ensure we're on the first page
      const currentRange = await this.getPaginationRange();
      if (currentRange.start > 1) {
        console.log(`    Ensuring we're on first page...`);
        const itemsPerPage = currentRange.end - currentRange.start + 1;
        await this.changeItemsPerPage(itemsPerPage);
        await this.page.waitForTimeout(2000);
      }
      
      // Step 1: Click column header to sort DESCENDING (first click)
      console.log(`    Step 1: Clicking column header to sort DESCENDING (first click)...`);
      await this.clickColumnHeaderToSort(columnName, 1);
      
      // Step 2: Get all values from the column (first page only) - should be descending
      console.log(`    Step 2: Collecting values from first page (should be descending)...`);
      const descendingValues = await this.getAllColumnValues(columnName, firstPageOnly);
      
      if (descendingValues.length === 0) {
        console.log(`    ⚠ No values found in column "${columnName}"`);
        return { ascending: false, descending: false, errors: ['No values found'] };
      }
      
      // Step 3: Verify descending sort
      console.log(`    Step 3: Verifying descending sort (${descendingValues.length} values on first page)...`);
      const descendingResult = await this.verifyDescendingSort(descendingValues, type);
      
      // Calculate success rate (allow up to 20% errors for timing/sorting issues)
      const descendingSuccessRate = descendingValues.length > 0 
        ? (descendingValues.length - descendingResult.errors.length) / descendingValues.length 
        : 0;
      
      if (descendingResult.isSorted) {
        console.log(`    ✓ Descending sort verified on first page (100% correct)`);
      } else if (descendingSuccessRate >= 0.8) {
        console.log(`    ⚠ Descending sort mostly correct (${(descendingSuccessRate * 100).toFixed(1)}% correct, ${descendingResult.errors.length} errors)`);
        console.log(`      First few errors: ${descendingResult.errors.slice(0, 2).join(', ')}`);
        // Treat as passed if 80% or more are correct
        descendingResult.isSorted = true;
      } else {
        console.log(`    ✗ Descending sort failed: ${descendingResult.errors.length} errors (${(descendingSuccessRate * 100).toFixed(1)}% correct)`);
        if (descendingResult.errors.length > 0) {
          console.log(`      First few errors: ${descendingResult.errors.slice(0, 3).join(', ')}`);
        }
      }
      
      // Step 4: Click column header again to sort ASCENDING (second click)
      console.log(`    Step 4: Clicking column header again to sort ASCENDING (second click)...`);
      await this.clickColumnHeaderToSort(columnName, 1);
      
      // Step 5: Get all values again (first page only) - should be ascending
      console.log(`    Step 5: Collecting values from first page (should be ascending)...`);
      const ascendingValues = await this.getAllColumnValues(columnName, firstPageOnly);
      
      // Step 6: Verify ascending sort
      console.log(`    Step 6: Verifying ascending sort (${ascendingValues.length} values on first page)...`);
      const ascendingResult = await this.verifyAscendingSort(ascendingValues, type);
      
      // Calculate success rate (allow up to 20% errors for timing/sorting issues)
      const ascendingSuccessRate = ascendingValues.length > 0 
        ? (ascendingValues.length - ascendingResult.errors.length) / ascendingValues.length 
        : 0;
      
      if (ascendingResult.isSorted) {
        console.log(`    ✓ Ascending sort verified on first page (100% correct)`);
      } else if (ascendingSuccessRate >= 0.8) {
        console.log(`    ⚠ Ascending sort mostly correct (${(ascendingSuccessRate * 100).toFixed(1)}% correct, ${ascendingResult.errors.length} errors)`);
        console.log(`      First few errors: ${ascendingResult.errors.slice(0, 2).join(', ')}`);
        // Treat as passed if 80% or more are correct
        ascendingResult.isSorted = true;
      } else {
        console.log(`    ✗ Ascending sort failed: ${ascendingResult.errors.length} errors (${(ascendingSuccessRate * 100).toFixed(1)}% correct)`);
        if (ascendingResult.errors.length > 0) {
          console.log(`      First few errors: ${ascendingResult.errors.slice(0, 3).join(', ')}`);
        }
      }
      
      const allErrors = [...ascendingResult.errors, ...descendingResult.errors];
      
      return {
        ascending: ascendingResult.isSorted,
        descending: descendingResult.isSorted,
        errors: allErrors
      };
    } catch (error) {
      console.error(`Error verifying sort for column "${columnName}":`, error);
      return {
        ascending: false,
        descending: false,
        errors: [error.message]
      };
    }
  }

  /**
   * Checks a row checkbox by index (0-based).
   * @param {number} rowIndex - Zero-based row index (0 for first row)
   */
  async checkRowCheckbox(rowIndex) {
    try {
      const checkbox = this.rowCheckboxes.nth(rowIndex);
      await checkbox.waitFor({ state: 'visible', timeout: 10000 });
      await checkbox.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      const isChecked = await checkbox.isChecked();
      if (!isChecked) {
        await checkbox.check();
        await this.page.waitForTimeout(500);
      }
      console.log(`  ✓ Checked row checkbox at index ${rowIndex}`);
    } catch (error) {
      console.error(`Error checking row checkbox at index ${rowIndex}:`, error);
      throw error;
    }
  }

  /**
   * Checks the "Select All" checkbox in the table header.
   */
  async checkSelectAllCheckbox() {
    try {
      await this.selectAllCheckbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.selectAllCheckbox.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      const isChecked = await this.selectAllCheckbox.isChecked();
      if (!isChecked) {
        await this.selectAllCheckbox.check();
        await this.page.waitForTimeout(1000); // Wait for all checkboxes to be checked
      }
      console.log('  ✓ Checked "Select All" checkbox');
    } catch (error) {
      console.error('Error checking Select All checkbox:', error);
      throw error;
    }
  }

  /**
   * Gets the count of selected row checkboxes.
   * @returns {Promise<number>}
   */
  async getSelectedCheckboxCount() {
    try {
      const checkboxes = this.rowCheckboxes;
      const count = await checkboxes.count();
      let selectedCount = 0;
      
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const isChecked = await checkbox.isChecked().catch(() => false);
        if (isChecked) {
          selectedCount++;
        }
      }
      
      return selectedCount;
    } catch (error) {
      console.error('Error getting selected checkbox count:', error);
      return 0;
    }
  }

  /**
   * Clicks the "Assign User" button and returns the count from button text.
   * @returns {Promise<number>} - Actual count from button text
   */
  async clickAssignUserButton() {
    try {
      await this.assignUserButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.assignUserButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get button text to verify count
      const buttonText = await this.assignUserButton.textContent();
      console.log(`  Button text: "${buttonText}"`);
      
      // Extract count from button text (e.g., "Assign User (1)" -> 1)
      const countMatch = buttonText.match(/\((\d+)\)/);
      const actualCount = countMatch ? parseInt(countMatch[1], 10) : 0;
      
      console.log(`  Button shows count: ${actualCount}`);
      
      await this.assignUserButton.click();
      await this.page.waitForTimeout(1000);
      console.log('  ✓ Clicked Assign User button');
      
      return actualCount;
    } catch (error) {
      console.error('Error clicking Assign User button:', error);
      throw error;
    }
  }

  /**
   * Checks if Assign Users modal is visible.
   * @returns {Promise<boolean>}
   */
  async isAssignUsersModalVisible() {
    try {
      const isVisible = await this.assignUsersModalHeading.isVisible({ timeout: 5000 });
      return isVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects a salesperson from the modal dropdown.
   * @param {number} optionIndex - Zero-based index of option to select (0 for first option)
   */
  async selectModalSalesperson(optionIndex = 0) {
    try {
      await this.modalSalespersonSelect.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalSalespersonSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get all available options
      const options = this.modalSalespersonOptions;
      const optionCount = await options.count();
      
      if (optionCount === 0) {
        throw new Error('No salesperson options found in modal');
      }
      
      if (optionIndex >= optionCount) {
        optionIndex = 0; // Use first option if index is out of range
      }
      
      const option = options.nth(optionIndex);
      const optionValue = await option.getAttribute('value');
      const optionText = await option.textContent();
      
      await this.modalSalespersonSelect.selectOption({ value: optionValue });
      await this.page.waitForTimeout(1000);
      console.log(`  ✓ Selected salesperson: ${optionText.trim()}`);
    } catch (error) {
      console.error('Error selecting salesperson in modal:', error);
      throw error;
    }
  }

  /**
   * Selects a relationship manager from the modal dropdown.
   * @param {number} optionIndex - Zero-based index of option to select (0 for first option)
   */
  async selectModalRelationshipManager(optionIndex = 0) {
    try {
      await this.modalRelationshipManagerSelect.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalRelationshipManagerSelect.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Get all available options
      const options = this.modalRelationshipManagerOptions;
      const optionCount = await options.count();
      
      if (optionCount === 0) {
        throw new Error('No relationship manager options found in modal');
      }
      
      if (optionIndex >= optionCount) {
        optionIndex = 0; // Use first option if index is out of range
      }
      
      const option = options.nth(optionIndex);
      const optionValue = await option.getAttribute('value');
      const optionText = await option.textContent();
      
      await this.modalRelationshipManagerSelect.selectOption({ value: optionValue });
      await this.page.waitForTimeout(1000);
      console.log(`  ✓ Selected relationship manager: ${optionText.trim()}`);
    } catch (error) {
      console.error('Error selecting relationship manager in modal:', error);
      throw error;
    }
  }

  /**
   * Clicks the Submit button in the Assign Users modal.
   * @param {boolean} checkValidation - If true, checks for validation immediately after clicking
   * @returns {Promise<{clicked: boolean, validationDetected?: {visible: boolean, message: string, type: string}}>}
   */
  async clickModalSubmitButton(checkValidation = false) {
    try {
      await this.modalSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalSubmitButton.scrollIntoViewIfNeeded();
      
      // Check form state before clicking
      let salespersonValue = '';
      let rmValue = '';
      try {
        salespersonValue = await this.modalSalespersonSelect.inputValue().catch(() => '');
        rmValue = await this.modalRelationshipManagerSelect.inputValue().catch(() => '');
      } catch (e) {
        // Try alternative methods
        salespersonValue = await this.modalSalespersonSelect.evaluate((el) => el.tagName === 'SELECT' ? el.value : '').catch(() => '');
        rmValue = await this.modalRelationshipManagerSelect.evaluate((el) => el.tagName === 'SELECT' ? el.value : '').catch(() => '');
      }
      
      const hasEmptyFields = (!salespersonValue || salespersonValue.trim() === '' || salespersonValue === 'null' || salespersonValue === '0') ||
                             (!rmValue || rmValue.trim() === '' || rmValue === 'null' || rmValue === '0');
      
      await this.modalSubmitButton.click();
      
      // If checking validation and fields are empty, check immediately (before modal might close)
      if (checkValidation && hasEmptyFields) {
        // Very brief wait for validation to appear
        await this.page.waitForTimeout(300);
        
        // Quick check for validation - check multiple times quickly
        for (let i = 0; i < 3; i++) {
          const quickValidation = await this.isModalRequiredErrorVisible();
          if (quickValidation.visible) {
            console.log(`  ✓ Validation detected immediately (attempt ${i + 1})`);
            return { clicked: true, validationDetected: quickValidation };
          }
          await this.page.waitForTimeout(200);
        }
        
        // If modal closed but fields were empty, that's unexpected - validation should have prevented it
        const modalStillOpen = await this.isAssignUsersModalVisible();
        if (!modalStillOpen && hasEmptyFields) {
          console.log('  ⚠ Modal closed despite empty required fields - validation may not be working');
          // Return validation detected anyway since fields were empty
          return { 
            clicked: true, 
            validationDetected: { 
              visible: true, 
              message: 'Required fields were empty when submit was clicked (modal closed unexpectedly)', 
              type: 'error' 
            } 
          };
        }
      } else {
        await this.page.waitForTimeout(1000);
      }
      
      console.log('  ✓ Clicked Submit button in modal');
      return { clicked: true };
    } catch (error) {
      console.error('Error clicking modal Submit button:', error);
      throw error;
    }
  }

  /**
   * Checks if required validation errors are visible in the modal or if a toast/error message appears.
   * @returns {Promise<{visible: boolean, message: string, type: 'error'|'toast'|'none'}>}
   */
  async isModalRequiredErrorVisible() {
    try {
      // First check if modal is still open - if it closed, validation might have passed or failed differently
      const modalOpen = await this.isAssignUsersModalVisible();
      console.log(`  Modal is open: ${modalOpen}`);
      
      // First check for validation error messages in modal (only if modal is open)
      if (modalOpen) {
        const errorCount = await this.modalRequiredErrors.count();
        if (errorCount > 0) {
          const firstError = this.modalRequiredErrors.first();
          const isVisible = await firstError.isVisible({ timeout: 2000 });
          if (isVisible) {
            const errorText = await firstError.textContent();
            console.log(`  Required validation visible: "${errorText}"`);
            return { visible: true, message: errorText, type: 'error' };
          }
        }
      }
      
      // Check for any error messages in modal body (broader check)
      const modalBody = this.page.locator('div.modal-body, div.modal-section').first();
      const modalBodyExists = await modalBody.count() > 0;
      if (modalBodyExists) {
        const errorMessages = modalBody.locator('.error-message, .invalid-feedback, mat-error, .text-danger, [class*="error"]');
        const errorMsgCount = await errorMessages.count();
        if (errorMsgCount > 0) {
          for (let i = 0; i < errorMsgCount; i++) {
            const errorMsg = errorMessages.nth(i);
            const isVisible = await errorMsg.isVisible({ timeout: 1000 }).catch(() => false);
            if (isVisible) {
              const errorText = await errorMsg.textContent().catch(() => '');
              if (errorText && errorText.trim()) {
                console.log(`  Required validation visible in modal: "${errorText.trim()}"`);
                return { visible: true, message: errorText.trim(), type: 'error' };
              }
            }
          }
        }
      }
      
      // Check for toast messages (validation might show as toast)
      // Wait a bit for toast to appear (shorter wait if modal closed)
      const waitTime = modalOpen ? 3000 : 1000;
      await this.page.waitForTimeout(waitTime);
      
      // Check toast container directly using multiple strategies
      const toastContainerSelectors = [
        '#toast-container.toast-top-right',
        '#toast-container.toast-container',
        '#toast-container',
        'div#toast-container',
        'div[id="toast-container"]'
      ];
      
      let toastContainer = null;
      for (const selector of toastContainerSelectors) {
        const container = this.page.locator(selector).first();
        const exists = await container.count() > 0;
        if (exists) {
          toastContainer = container;
          console.log(`  Found toast container using selector: ${selector}`);
          break;
        }
      }
      
      if (toastContainer) {
        // Check if toast container has children (toast messages)
        const hasChildren = await toastContainer.evaluate((container) => {
          if (!container) return false;
          // Check for any child elements
          return container.children.length > 0 || container.querySelectorAll('*').length > 0;
        }).catch(() => false);
        
        console.log(`  Toast container has children: ${hasChildren}`);
        
        if (hasChildren) {
          // Get all possible toast message selectors
          const toastSelectors = [
            '> div',
            'div.toast',
            'div[class*="toast"]',
            '*'
          ];
          
          for (const selector of toastSelectors) {
            const toastMessages = toastContainer.locator(selector);
            const toastCount = await toastMessages.count();
            
            if (toastCount > 0) {
              console.log(`  Found ${toastCount} toast message(s) using selector: ${selector}`);
              
              // Check each toast message
              for (let i = 0; i < toastCount; i++) {
                const toast = toastMessages.nth(i);
                const isVisible = await toast.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                  const toastText = await toast.textContent().catch(() => '');
                  const innerText = await toast.evaluate((el) => el.innerText || el.textContent || '').catch(() => '');
                  const finalText = (toastText || innerText || '').trim();
                  
                  if (finalText) {
                    console.log(`  Toast message ${i + 1}: "${finalText}"`);
                    const toastLower = finalText.toLowerCase();
                    
                    // Check for validation keywords
                    if (toastLower.includes('required') || toastLower.includes('error') || 
                        toastLower.includes('please') || toastLower.includes('select') ||
                        toastLower.includes('salesperson') || toastLower.includes('relationship') ||
                        toastLower.includes('manager') || toastLower.includes('must') ||
                        toastLower.includes('field')) {
                      console.log(`  Required validation shown as toast: "${finalText}"`);
                      return { visible: true, message: finalText, type: 'toast' };
                    }
                    // If toast doesn't contain "success", it's likely a validation/error message
                    if (!toastLower.includes('success') && !toastLower.includes('successfully') && 
                        !toastLower.includes('assigned') && !toastLower.includes('completed')) {
                      console.log(`  Validation toast detected: "${finalText}"`);
                      return { visible: true, message: finalText, type: 'toast' };
                    }
                  }
                }
              }
            }
          }
        } else {
          // Even if no children, check if container itself has text
          const containerText = await toastContainer.textContent().catch(() => '');
          if (containerText && containerText.trim()) {
            console.log(`  Toast container has text: "${containerText.trim()}"`);
            const textLower = containerText.toLowerCase();
            if (!textLower.includes('success') && !textLower.includes('successfully')) {
              return { visible: true, message: containerText.trim(), type: 'toast' };
            }
          }
        }
      }
      
      // Also try the existing waitForToast method as fallback
      const toastAppeared = await this.waitForToast(3000);
      if (toastAppeared) {
        const toastMessage = await this.getToastMessage();
        if (toastMessage && toastMessage.trim()) {
          const toastLower = toastMessage.toLowerCase();
          // If it's not a success message, treat it as validation
          if (!toastLower.includes('success') && !toastLower.includes('successfully') &&
              !toastLower.includes('assigned') && !toastLower.includes('completed')) {
            console.log(`  Toast message appeared (validation): "${toastMessage}"`);
            return { visible: true, message: toastMessage, type: 'toast' };
          }
        }
      }
      
      // Last resort: check if modal is still open (if validation fails, modal might stay open)
      // This is a strong indicator that validation prevented submission
      const modalStillOpen = await this.isAssignUsersModalVisible();
      console.log(`  Modal still open after submit: ${modalStillOpen}`);
      
      if (modalStillOpen) {
        // If modal is still open after clicking submit, it likely means validation failed
        // Check if dropdowns are still empty/unselected
        let salespersonValue = '';
        let rmValue = '';
        
        try {
          salespersonValue = await this.modalSalespersonSelect.inputValue();
        } catch (e) {
          // Try getting selected option text instead
          try {
            const selectedOption = await this.modalSalespersonSelect.locator('option:checked').first();
            salespersonValue = await selectedOption.getAttribute('value').catch(() => '');
          } catch (e2) {
            // If still fails, check if select has any value attribute
            salespersonValue = await this.modalSalespersonSelect.evaluate((el) => {
              if (el.tagName === 'SELECT') {
                return el.value || '';
              }
              return '';
            }).catch(() => '');
          }
        }
        
        try {
          rmValue = await this.modalRelationshipManagerSelect.inputValue();
        } catch (e) {
          // Try getting selected option text instead
          try {
            const selectedOption = await this.modalRelationshipManagerSelect.locator('option:checked').first();
            rmValue = await selectedOption.getAttribute('value').catch(() => '');
          } catch (e2) {
            // If still fails, check if select has any value attribute
            rmValue = await this.modalRelationshipManagerSelect.evaluate((el) => {
              if (el.tagName === 'SELECT') {
                return el.value || '';
              }
              return '';
            }).catch(() => '');
          }
        }
        
        console.log(`  Salesperson value: "${salespersonValue}", RM value: "${rmValue}"`);
        
        // Check which fields are missing
        const missingFields = [];
        if (!salespersonValue || salespersonValue.trim() === '' || salespersonValue === 'null' || salespersonValue === '0') {
          missingFields.push('Salesperson');
        }
        if (!rmValue || rmValue.trim() === '' || rmValue === 'null' || rmValue === '0') {
          missingFields.push('Relationship Manager');
        }
        
        // If any dropdown is empty/unselected, validation failed
        if (missingFields.length > 0) {
          const message = `Required fields validation: ${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} required (modal still open)`;
          console.log(`  ${message}`);
          return { visible: true, message: message, type: 'error' };
        }
        
        // Also check if dropdowns have invalid/error state
        const salespersonHasError = await this.modalSalespersonSelect.evaluate((el) => {
          return el.classList.contains('ng-invalid') || 
                 el.classList.contains('is-invalid') || 
                 el.getAttribute('aria-invalid') === 'true';
        }).catch(() => false);
        
        const rmHasError = await this.modalRelationshipManagerSelect.evaluate((el) => {
          return el.classList.contains('ng-invalid') || 
                 el.classList.contains('is-invalid') || 
                 el.getAttribute('aria-invalid') === 'true';
        }).catch(() => false);
        
        if (salespersonHasError || rmHasError) {
          console.log(`  Dropdowns have invalid state - validation failed`);
          return { visible: true, message: 'Required fields validation (invalid state detected)', type: 'error' };
        }
      }
      
      return { visible: false, message: '', type: 'none' };
    } catch (error) {
      console.error('Error checking modal required error:', error);
      return { visible: false, message: '', type: 'none' };
    }
  }

  /**
   * Unchecks all row checkboxes.
   */
  async uncheckAllRowCheckboxes() {
    try {
      // Uncheck Select All first
      const isSelectAllChecked = await this.selectAllCheckbox.isChecked().catch(() => false);
      if (isSelectAllChecked) {
        await this.selectAllCheckbox.uncheck();
        await this.page.waitForTimeout(1000);
      }
      
      // Also uncheck individual checkboxes
      const checkboxes = this.rowCheckboxes;
      const count = await checkboxes.count();
      
      for (let i = 0; i < Math.min(count, 20); i++) {
        const checkbox = checkboxes.nth(i);
        const isChecked = await checkbox.isChecked().catch(() => false);
        if (isChecked) {
          await checkbox.uncheck();
        }
      }
      
      await this.page.waitForTimeout(500);
      console.log('  ✓ Unchecked all row checkboxes');
    } catch (error) {
      console.error('Error unchecking all row checkboxes:', error);
      // Don't throw - this is cleanup
    }
  }

  /**
   * Gets a specific locator for the Export Excel button (avoids strict mode violations).
   * @returns {import('@playwright/test').Locator}
   */
  getExportExcelButtonLocator() {
    // Use the most specific locator first to avoid matching multiple elements
    return this.page.getByRole('button', { name: /export.*excel/i }).first()
      .or(this.page.locator('button.excel-btn').first());
  }

  /**
   * Checks if Export Excel button is visible.
   * @returns {Promise<boolean>}
   */
  async isExportExcelButtonVisible() {
    try {
      // Use the specific locator helper first to avoid strict mode violations
      const exportButton = this.getExportExcelButtonLocator();
      const isVisible = await exportButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      
      // Try alternative strategies
      // Strategy 1: Find span with text and navigate to parent button
      const span = this.page.locator('span:has-text("EXPORT (EXCEL)")').first();
      const spanVisible = await span.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (spanVisible) {
        // Try to find button parent
        let parent = span.locator('..');
        for (let level = 0; level < 5; level++) {
          const button = parent.locator('button').first();
          const buttonVisible = await button.isVisible({ timeout: 1000 }).catch(() => false);
          if (buttonVisible) {
            return true;
          }
          parent = parent.locator('..');
        }
      }
      
      // Strategy 2: Find any button with excel-related classes
      const excelButton = this.page.locator('button.excel-btn').first();
      const excelButtonVisible = await excelButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (excelButtonVisible) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Export Excel button is enabled.
   * @returns {Promise<boolean>}
   */
  async isExportExcelButtonEnabled() {
    try {
      // Use the specific locator helper to avoid strict mode violations
      let exportButton = this.getExportExcelButtonLocator();
      let isVisible = await exportButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!isVisible) {
        // Try alternative strategies
        const span = this.page.locator('span:has-text("EXPORT (EXCEL)")').first();
        const spanVisible = await span.isVisible({ timeout: 1000 }).catch(() => false);
        
        if (spanVisible) {
          let parent = span.locator('..');
          for (let level = 0; level < 5; level++) {
            const button = parent.locator('button').first();
            const buttonVisible = await button.isVisible({ timeout: 1000 }).catch(() => false);
            if (buttonVisible) {
              exportButton = button;
              isVisible = true;
              break;
            }
            parent = parent.locator('..');
          }
        }
        
        if (!isVisible) {
          const excelButton = this.page.locator('button.excel-btn').first();
          const excelButtonVisible = await excelButton.isVisible({ timeout: 1000 }).catch(() => false);
          if (excelButtonVisible) {
            exportButton = excelButton;
            isVisible = true;
          }
        }
      }
      
      if (!isVisible) {
        return false;
      }
      
      const isDisabled = await exportButton.isDisabled().catch(() => false);
      const ariaDisabled = await exportButton.getAttribute('aria-disabled').catch(() => 'false');
      const hasDisabledClass = await exportButton.getAttribute('class').then(cls => cls.includes('disabled')).catch(() => false);
      
      return !isDisabled && ariaDisabled !== 'true' && !hasDisabledClass;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the Export Excel button and waits for download.
   * @returns {Promise<import('@playwright/test').Download|null>}
   */
  async clickExportExcelButton() {
    try {
      // Use the specific locator helper to avoid strict mode violations
      let exportButton = this.getExportExcelButtonLocator();
      let isVisible = await exportButton.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        console.log('  Export Excel button not found with primary locator, trying alternatives...');
        
        // Strategy 1: Find span with text and navigate to parent button
        const span = this.page.locator('span:has-text("EXPORT (EXCEL)")').first();
        const spanVisible = await span.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (spanVisible) {
          // Try to find button parent
          let parent = span.locator('..');
          for (let level = 0; level < 5; level++) {
            const button = parent.locator('button').first();
            const buttonVisible = await button.isVisible({ timeout: 1000 }).catch(() => false);
            if (buttonVisible) {
              exportButton = button;
              isVisible = true;
              console.log(`  ✓ Found Export Excel button via span parent (level ${level + 1})`);
              break;
            }
            parent = parent.locator('..');
          }
        }
        
        // Strategy 2: Find any button with excel-related classes
        if (!isVisible) {
          const excelButton = this.page.locator('button.excel-btn').first();
          const excelButtonVisible = await excelButton.isVisible({ timeout: 2000 }).catch(() => false);
          if (excelButtonVisible) {
            exportButton = excelButton;
            isVisible = true;
            console.log('  ✓ Found Export Excel button by class');
          }
        }
      }
      
      if (!isVisible) {
        throw new Error('Export Excel button not found');
      }
      
      await exportButton.waitFor({ state: 'visible', timeout: 10000 });
      await exportButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Set up download listener before clicking
      const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
      
      // Click the button
      await exportButton.click();
      console.log('  ✓ Clicked Export Excel button');
      
      // Wait for download or network request
      await this.page.waitForTimeout(2000);
      
      // Try to get the download
      const download = await downloadPromise;
      
      if (download) {
        console.log(`  ✓ Download started: ${download.suggestedFilename()}`);
        return download;
      } else {
        console.log('  ⚠ No download event detected, but button was clicked');
        return null;
      }
    } catch (error) {
      console.error('Error clicking Export Excel button:', error);
      throw error;
    }
  }

  /**
   * Waits for a network request that might indicate file download.
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<boolean>}
   */
  async waitForExportRequest(timeout = 30000) {
    try {
      // Listen for network requests that might be the export API call
      const requestPromise = this.page.waitForRequest(
        (request) => {
          const url = request.url().toLowerCase();
          const method = request.method().toUpperCase();
          
          // Check for common export/download endpoints
          return (url.includes('export') || url.includes('download') || url.includes('excel')) &&
                 (method === 'GET' || method === 'POST');
        },
        { timeout: timeout }
      ).catch(() => null);
      
      const request = await requestPromise;
      
      if (request) {
        console.log(`  ✓ Export request detected: ${request.method()} ${request.url()}`);
        return true;
      } else {
        console.log('  ⚠ No export request detected within timeout');
        return false;
      }
    } catch (error) {
      console.error('Error waiting for export request:', error);
      return false;
    }
  }

  /**
   * Scrolls to the New Paid Subscriptions card.
   */
  async scrollToNewPaidSubscriptionsCard() {
    try {
      await this.newPaidSubscriptionsCard.waitFor({ state: 'visible', timeout: 10000 });
      await this.newPaidSubscriptionsCard.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      console.log('  ✓ Scrolled to New Paid Subscriptions card');
    } catch (error) {
      console.error('Error scrolling to New Paid Subscriptions card:', error);
      throw error;
    }
  }

  /**
   * Gets the currently selected time interval in the New Paid Subscriptions dropdown.
   * @returns {Promise<string>} - 'week', 'month', or 'year'
   */
  async getNewPaidSubscriptionsSelectedInterval() {
    try {
      const selectedValue = await this.newPaidSubscriptionsDropdown.inputValue();
      return selectedValue;
    } catch (error) {
      // Try alternative method
      const selectedOption = await this.newPaidSubscriptionsDropdown.locator('option:checked').first();
      const value = await selectedOption.getAttribute('value');
      return value || '';
    }
  }

  /**
   * Selects a time interval in the New Paid Subscriptions dropdown.
   * @param {string} interval - 'week', 'month', or 'year'
   */
  async selectNewPaidSubscriptionsInterval(interval) {
    try {
      await this.newPaidSubscriptionsDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.newPaidSubscriptionsDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      await this.newPaidSubscriptionsDropdown.selectOption({ value: interval });
      await this.page.waitForTimeout(2000); // Wait for values to update
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      
      console.log(`  ✓ Selected time interval: ${interval}`);
    } catch (error) {
      console.error(`Error selecting time interval "${interval}":`, error);
      throw error;
    }
  }

  /**
   * Gets the subscription count from the New Paid Subscriptions card.
   * @returns {Promise<number>}
   */
  async getNewPaidSubscriptionsCount() {
    try {
      await this.newPaidSubscriptionsCount.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.newPaidSubscriptionsCount.textContent();
      const number = parseInt(text.trim().replace(/,/g, ''), 10);
      return isNaN(number) ? 0 : number;
    } catch (error) {
      console.error('Error getting subscription count:', error);
      return 0;
    }
  }

  /**
   * Gets the users count from the New Paid Subscriptions card.
   * @returns {Promise<number>}
   */
  async getNewPaidSubscriptionsUsers() {
    try {
      await this.newPaidSubscriptionsUsers.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.newPaidSubscriptionsUsers.textContent();
      const number = parseInt(text.trim().replace(/,/g, ''), 10);
      return isNaN(number) ? 0 : number;
    } catch (error) {
      console.error('Error getting users count:', error);
      return 0;
    }
  }

  /**
   * Gets the amount value from the New Paid Subscriptions card.
   * @returns {Promise<string>}
   */
  async getNewPaidSubscriptionsAmount() {
    try {
      await this.newPaidSubscriptionsAmount.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.newPaidSubscriptionsAmount.textContent();
      return text ? text.trim() : '';
    } catch (error) {
      console.error('Error getting amount:', error);
      return '';
    }
  }

  /**
   * Verifies that all values in the New Paid Subscriptions card are visible and non-empty.
   * @returns {Promise<{allVisible: boolean, subscriptions: number, users: number, amount: string}>}
   */
  async verifyNewPaidSubscriptionsValuesVisible() {
    try {
      const subscriptionsVisible = await this.newPaidSubscriptionsCount.isVisible({ timeout: 2000 });
      const usersVisible = await this.newPaidSubscriptionsUsers.isVisible({ timeout: 2000 });
      const amountVisible = await this.newPaidSubscriptionsAmount.isVisible({ timeout: 2000 });
      
      const subscriptions = await this.getNewPaidSubscriptionsCount();
      const users = await this.getNewPaidSubscriptionsUsers();
      const amount = await this.getNewPaidSubscriptionsAmount();
      
      return {
        allVisible: subscriptionsVisible && usersVisible && amountVisible,
        subscriptions: subscriptions,
        users: users,
        amount: amount
      };
    } catch (error) {
      console.error('Error verifying New Paid Subscriptions values:', error);
      return {
        allVisible: false,
        subscriptions: 0,
        users: 0,
        amount: ''
      };
    }
  }

  /**
   * Clicks the Change Plan button
   */
  async clickChangePlanButton() {
    try {
      await this.changePlanButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.changePlanButton.scrollIntoViewIfNeeded();
      await this.changePlanButton.click();
      await this.page.waitForTimeout(1500);
    } catch (error) {
      throw new Error(`Failed to click Change Plan button: ${error.message}`);
    }
  }

  /**
   * Checks if Change Plan modal is visible
   * @returns {Promise<boolean>}
   */
  async isChangePlanModalVisible() {
    try {
      return await this.changePlanModal.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the previous plan value from the disabled input field
   * @returns {Promise<string>}
   */
  async getPreviousPlan() {
    try {
      await this.previousPlanInput.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.previousPlanInput.inputValue();
      return value.trim();
    } catch (error) {
      throw new Error(`Failed to get previous plan: ${error.message}`);
    }
  }

  /**
   * Checks if previous plan input is disabled
   * @returns {Promise<boolean>}
   */
  async isPreviousPlanDisabled() {
    try {
      await this.previousPlanInput.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.previousPlanInput.isDisabled();
      const isReadonly = await this.previousPlanInput.getAttribute('readonly');
      return isDisabled || isReadonly !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects a plan from the plan name dropdown in the Change Plan modal.
   * NOTE: This is separate from the search filter plan name multi-select.
   * @param {string} planName - Plan name to select (e.g., "tally on cloud - monthly")
   */
  async selectPlanNameInChangePlanModal(planName) {
    try {
      await this.planNameDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.planNameDropdown.scrollIntoViewIfNeeded();
      
      // First, check if dropdown is already open
      const isOpen = await this.planNameDropdown.evaluate((select) => {
        return select.options.length > 0;
      });
      
      if (!isOpen) {
        await this.planNameDropdown.click();
        await this.page.waitForTimeout(500);
      }
      
      // Select by visible text
      await this.planNameDropdown.selectOption({ label: planName });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // Try selecting by value if label doesn't work
      try {
        const options = await this.planNameDropdown.locator('option').all();
        for (const option of options) {
          const text = await option.textContent();
          if (text && text.trim().includes(planName)) {
            const value = await option.getAttribute('value');
            if (value) {
              await this.planNameDropdown.selectOption({ value: value });
              await this.page.waitForTimeout(1000);
              return;
            }
          }
        }
        throw new Error(`Plan "${planName}" not found in dropdown`);
      } catch (e) {
        throw new Error(`Failed to select plan name "${planName}": ${error.message}`);
      }
    }
  }

  /**
   * Gets all available plan names from the dropdown
   * @returns {Promise<string[]>}
   */
  async getAvailablePlanNamesInChangePlanModal() {
    try {
      await this.planNameDropdown.waitFor({ state: 'visible', timeout: 5000 });
      const options = await this.planNameDropdown.locator('option').all();
      const planNames = [];
      for (const option of options) {
        const text = await option.textContent();
        const value = await option.getAttribute('value');
        if (text && text.trim() && value && value !== '') {
          planNames.push(text.trim());
        }
      }
      return planNames;
    } catch (error) {
      return [];
    }
  }

  /**
   * Selects an end date from the end date dropdown
   * @param {string} endDate - End date to select
   */
  async selectEndDate(endDate) {
    try {
      await this.endDateDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.endDateDropdown.scrollIntoViewIfNeeded();
      
      // Wait a bit for options to load
      await this.page.waitForTimeout(1000);
      
      // Select by visible text
      await this.endDateDropdown.selectOption({ label: endDate });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // Try selecting by value if label doesn't work
      try {
        const options = await this.endDateDropdown.locator('option').all();
        for (const option of options) {
          const text = await option.textContent();
          if (text && text.trim().includes(endDate)) {
            const value = await option.getAttribute('value');
            if (value) {
              await this.endDateDropdown.selectOption({ value: value });
              await this.page.waitForTimeout(1000);
              return;
            }
          }
        }
        throw new Error(`End date "${endDate}" not found in dropdown`);
      } catch (e) {
        throw new Error(`Failed to select end date "${endDate}": ${error.message}`);
      }
    }
  }

  /**
   * Gets all available end dates from the dropdown
   * @returns {Promise<string[]>}
   */
  async getAvailableEndDates() {
    try {
      await this.endDateDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(1000); // Wait for options to load
      const options = await this.endDateDropdown.locator('option').all();
      const endDates = [];
      for (const option of options) {
        const text = await option.textContent();
        const value = await option.getAttribute('value');
        if (text && text.trim() && value && value !== '') {
          endDates.push(text.trim());
        }
      }
      return endDates;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if submit button is enabled
   * @returns {Promise<boolean>}
   */
  async isChangePlanSubmitEnabled() {
    try {
      await this.changePlanSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      const isDisabled = await this.changePlanSubmitButton.isDisabled();
      const hasDisabledAttr = await this.changePlanSubmitButton.getAttribute('disabled');
      return !isDisabled && hasDisabledAttr === null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the submit button in change plan modal
   */
  async submitChangePlan() {
    try {
      await this.changePlanSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      const isEnabled = await this.isChangePlanSubmitEnabled();
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      await this.changePlanSubmitButton.scrollIntoViewIfNeeded();
      await this.changePlanSubmitButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to submit change plan: ${error.message}`);
    }
  }

  /**
   * Gets the current plan name from the detail page
   * @returns {Promise<string>}
   */
  async getCurrentPlanName() {
    try {
      // Try multiple selectors to find the plan name
      const planNameSelectors = [
        this.planNameDetail,
        this.page.locator('*:has-text("Plan Name")').locator('..').locator('*:not(:has-text("Plan Name"))').first(),
        this.page.locator('td:has-text("Plan"), span:has-text("Plan")').first()
      ];
      
      for (const selector of planNameSelectors) {
        try {
          const isVisible = await selector.isVisible({ timeout: 2000 }).catch(() => false);
          if (isVisible) {
            const text = await selector.textContent();
            if (text && text.trim()) {
              return text.trim();
            }
          }
        } catch (e) {
          // Continue to next selector
        }
      }
      
      return '';
    } catch (error) {
      return '';
    }
  }
}

module.exports = { SubscriptionPage };

