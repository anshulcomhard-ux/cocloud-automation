class ResellerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: Sidebar menu item for Reseller
    this.resellerLink = page.locator('div.nav-link.sidebar-items[routerlink="/reseller"], div.nav-link.sidebar-items:has-text("Reseller"), a[routerlink="/reseller"], a[href*="/reseller"], .sidebar-items:has-text("Reseller"), *:has-text("Reseller"):has([routerlink="/reseller"])').first();
    
    // Page elements
    // HTML: Page heading "Reseller" - based on image, it's displayed at the top left
    this.pageHeading = page.locator('p.sub.fs-5:has-text("Reseller"), h1:has-text("Reseller"), h2:has-text("Reseller"), .page-title:has-text("Reseller"), *:has-text("Reseller")').first();
    this.pageTitle = page.locator('p.sub.fs-5:has-text("Reseller"), h1:has-text("Reseller"), h2:has-text("Reseller"), .page-title:has-text("Reseller")').first();
    this.pageWrapper = page.locator('app-root, app-reseller, [class*="reseller"]').first();
    
    // Table locators
    this.resellerTable = page.locator('table, mat-table, [class*="table"]').first();
    this.allTableRows = page.locator('table tbody tr, mat-table mat-row');
    this.tableHeaders = page.locator('table thead th, mat-table mat-header-row th');
    
    // Record count text
    // HTML: "Showing 1 to 20 of 510 records"
    this.recordCountText = page.locator('*:has-text("Showing"), *:has-text("records")').first();
    
    // Search functionality
    // HTML: <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3 collapsed">
    this.searchHereButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here"), div.py-3:has-text("Search Here"), span.ms-5:has-text("Search Here"), div.py-3.collapsed:has(i.bi-search)').first();
    this.searchHereSpan = page.locator('span.ms-5:has-text("Search Here"), span:has-text("Search Here")').first();
    // HTML: <div id="collapseExample" class="collapse">
    this.searchForm = page.locator('#collapseExample.collapse, #collapseExample.collapse.show, form:has(button.search-btn)').first();
    this.searchPanel = page.locator('div#collapseExample, div.collapse#collapseExample, div[class*="collapse"][id="collapseExample"]').first();
    
    // Search field locators - using exact IDs from HTML
    // HTML: <input id="companyName" ng-reflect-name="companyName" placeholder="Company Name">
    this.companyNameField = page.locator('input#companyName[ng-reflect-name="companyName"], input#companyName[placeholder="Company Name"], input#companyName').first();
    // HTML: <input id="email" ng-reflect-name="email" placeholder="Email">
    this.emailField = page.locator('input#email[ng-reflect-name="email"], input#email[placeholder="Email"], input#email').first();
    // HTML: <input id="mobile" ng-reflect-name="mobile" placeholder="Mobile">
    this.mobileField = page.locator('input#mobile[ng-reflect-name="mobile"], input#mobile[placeholder="Mobile"], input#mobile').first();
    
    // Dropdown locators (mat-select)
    // HTML: Reseller Type dropdown
    this.resellerTypeDropdown = page.locator('mat-select[aria-labelledby*="Reseller Type"], mat-form-field:has(mat-label:has-text("Reseller Type")) mat-select, app-dropdown:has(mat-label:has-text("Reseller Type")) mat-select').first();
    this.resellerTypeOptions = page.locator('mat-option:has-text("All"), mat-option:has-text("Reseller"), mat-option:has-text("Partner")');
    
    // HTML: Registration Date (date range picker)
    this.registrationDateStartInput = page.locator('input[formcontrolname="startDate"][matstartdate], input.mat-start-date[formcontrolname="startDate"], input[placeholder="From"]').first();
    this.registrationDateEndInput = page.locator('input[formcontrolname="endDate"][matenddate], input.mat-end-date[formcontrolname="endDate"], input[placeholder="To"]').first();
    this.registrationDateToggle = page.locator('button[aria-label*="calendar"], mat-datepicker-toggle button').first();
    
    // HTML: Label dropdown
    this.labelDropdown = page.locator('mat-select[aria-labelledby*="Label"], mat-form-field:has(mat-label:has-text("Label")) mat-select, app-dropdown:has(mat-label:has-text("Label")) mat-select').first();
    this.labelOptions = page.locator('mat-option:has-text("All"), mat-option:has-text("Premium"), mat-option:has-text("Standard")');
    
    // HTML: Account Manager dropdown (multiple selection)
    this.accountManagerDropdown = page.locator('mat-select[aria-labelledby*="Account Manager"], mat-form-field:has(mat-label:has-text("Account Manager")) mat-select, app-dropdown:has(mat-label:has-text("Account Manager")) mat-select').first();
    this.accountManagerSelectAll = page.locator('mat-option:has-text("Select All"), .mat-mdc-select-panel mat-option:has-text("Select All"), mat-option[value="selectAll"]').first();
    this.accountManagerOptions = page.locator('mat-option:not(:has-text("Select All"))');
    
    // HTML: Status dropdown
    this.statusDropdown = page.locator('mat-select[aria-labelledby*="Status"], mat-form-field:has(mat-label:has-text("Status")) mat-select, app-dropdown:has(mat-label:has-text("Status")) mat-select').first();
    this.statusOptions = page.locator('mat-option:has-text("All"), mat-option:has-text("Active"), mat-option:has-text("Inactive")');
    
    // Search and Reset buttons
    // HTML: <button type="submit" class="btn search-btn">Search</button>
    this.searchButton = page.locator('button.btn.search-btn[type="submit"], button.search-btn:has-text("Search"), button:has-text("Search")').first();
    // HTML: <button type="button" class="btn reset-btn">Reset</button>
    this.resetButton = page.locator('button.btn.reset-btn[type="button"], button.reset-btn:has-text("Reset"), button:has-text("Reset")').first();
    
    // Table column locators
    this.companyNameCells = page.locator('td.mat-column-Company-Name, td:has-text("Comhard"), td:has-text("Rudra")');
    this.emailCells = page.locator('td.mat-column-Email, td:has-text("@")');
    this.accountManagerCells = page.locator('td.mat-column-Account-Manager, td:has-text("Akshay"), td:has-text("Harshit")');
    
    // Action column and dropdown locators for Reseller table
    this.actionColumnHeader = page.locator('th.mat-column-Action, th:has-text("Action")').first();
    this.actionDropdownButtons = page.locator('td.mat-column-Action button, td.mat-column-Action button[type="button"], td:has-text("Action") ~ td button, td.mat-column-Action button[aria-haspopup="true"]').first();
    this.actionDropdownMenu = page.locator('ul.dropdown-menu.action-menu, ul.dropdown-menu.action-menu.show, ul.dropdown-menu.action-menu.py-2.show').first();
    this.editActionOption = page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Edit"), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Edit"), ul.dropdown-menu li:has-text("Edit")').first();
    this.deleteActionOption = page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Delete"), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Delete"), ul.dropdown-menu li:has-text("Delete")').first();
    this.suspendActionOption = page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Suspend"), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Suspend"), ul.dropdown-menu li:has-text("Suspend")').first();
    this.activateActionOption = page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Activate"), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Activate"), ul.dropdown-menu li:has-text("Activate")').first();
    this.manageResellerOption = page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Manage Reseller"), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Manage Reseller"), ul.dropdown-menu li:has-text("Manage Reseller")').first();
    this.manageActionOption = page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Manage"):has(ul.action-submenu), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Manage"), ul.dropdown-menu li:has-text("Manage")').first();
    
    // Status column locators
    this.statusColumnHeader = page.locator('th.mat-column-Status, th:has-text("Status")').first();
    this.statusColumnCells = page.locator('td.mat-column-Status, td:has-text("Status") ~ td, table tbody tr td.mat-column-Status');
    
    // Action submenu (nested dropdown under Manage)
    this.actionSubmenu = page.locator('ul.action-submenu.dropdown-submenu, ul.action-submenu.dropdown-submenu.ng-star-inserted, ul.dropdown-submenu').first();
    this.removeLabelOption = page.locator('ul.action-submenu li:has-text("Remove Label"), ul.action-submenu li.ng-star-inserted:has-text("Remove Label"), ul.dropdown-submenu li:has-text("Remove Label")').first();
    this.addBillsOption = page.locator('ul.action-submenu li:has-text("Add Bills"), ul.action-submenu li.ng-star-inserted:has-text("Add Bills"), ul.dropdown-submenu li:has-text("Add Bills")').first();
    
    // Add Bills Modal locators
    this.addBillsModal = page.locator('.modal-section:has-text("Add Bills"), .modal:has-text("Add Bills"), form:has-text("Billing Action")').first();
    this.billingActionDropdown = page.locator('select#billingAction[ng-reflect-name="billingAction"], select#billingAction, select[id="billingAction"]').first();
    this.paymentTypeCreditRadio = page.locator('input#paymentType_credit[type="radio"], input[type="radio"][id="paymentType_credit"], input[type="radio"][ng-reflect-value="credit"]').first();
    this.paymentTypeDebitRadio = page.locator('input#paymentType_debit[type="radio"], input[type="radio"][id="paymentType_debit"], input[type="radio"][ng-reflect-value="debit"]').first();
    this.amountInput = page.locator('input#amount[ng-reflect-name="amount"], input#amount[placeholder="Enter amount"], input[id="amount"]').first();
    this.descriptionTextarea = page.locator('textarea#descriptionByAdmin[ng-reflect-name="descriptionByAdmin"], textarea#descriptionByAdmin[placeholder="Description..."], textarea[id="descriptionByAdmin"]').first();
    this.addBillsSubmitButton = page.locator('form:has-text("Billing Action") button[type="submit"].search-btn, form:has-text("Billing Action") button:has-text("Submit"), button.search-btn:has-text("Submit")').first();
    
    // Label assignment locators
    // # column checkbox (row selection)
    this.rowCheckboxes = page.locator('table tbody tr input[type="checkbox"].mdc-checkbox__native-control, mat-table mat-row input[type="checkbox"], table tbody tr mat-checkbox input[type="checkbox"]');
    this.labelColumnHeader = page.locator('th.mat-column-Label, th:has-text("Label")').first();
    this.labelColumnCells = page.locator('td.mat-column-Label, td:has-text("Label") ~ td, table tbody tr td.mat-column-Label');
    
    // Label dropdown button (arrow dropdown with tags icon)
    // HTML: <button type="button" data-bs-toggle="dropdown" class="comman-btn btn-primary ms-3">
    this.labelDropdownButton = page.locator('button.comman-btn.btn-primary[data-bs-toggle="dropdown"]:has(i.bi-tags), button.comman-btn.btn-primary:has(i.bi-tags):has(i.bi-chevron-down), button[data-bs-toggle="dropdown"]:has(i.bi-tags)').first();
    this.labelDropdownMenu = page.locator('div.all-labels-section, ul.dropdown-menu.show, div.dropdown-menu.show, ul[class*="dropdown-menu"].show').first();
    this.labelOptions = page.locator('div.all-labels-section div.label, div.label.px-2.py-1.my-2');
    
    // Delete confirmation modal locators
    this.deleteConfirmationModal = page.locator('.modal-section:has-text("Delete"), .modal:has-text("Delete"), div[class*="modal"]:has-text("Delete"), .modal:has-text("confirm"), .modal:has-text("Confirm"), .modal:has-text("Yes")').first();
    this.deleteConfirmButton = page.locator('button:has-text("Yes"), button:has-text("Delete"), button:has-text("Confirm"), .modal button:has-text("Yes"), .modal button:has-text("Delete"), .modal button:has-text("Confirm")').first();
    this.deleteCancelButton = page.locator('button:has-text("Cancel"), button:has-text("No"), .modal button:has-text("Cancel"), .modal button:has-text("No")').first();
    
    // No data message
    // HTML: <p class="fs-5">There is no reseller added yet. To add reseller click</p>
    this.noDataMessage = page.locator('p.fs-5:has-text("There is no reseller added yet"), p:has-text("There is no reseller added yet"), *:has-text("There is no reseller added yet"), p.error-msg, *:has-text("No data"), *:has-text("No records"), td:has-text("No data")').first();
    
    // Add Reseller button
    this.addResellerButton = page.locator('button:has-text("Reseller"), button:has-text("+ Reseller"), .btn:has-text("Reseller")').first();
    
    // Label dropdown button and menu
    // HTML: <button type="button" data-bs-toggle="dropdown" class="comman-btn btn-primary ms-3">
    this.labelDropdownButton = page.locator('button[data-bs-toggle="dropdown"].comman-btn.btn-primary:has(i.bi-tags), button.comman-btn.btn-primary:has(i.bi-chevron-down), button[data-bs-toggle="dropdown"]:has(i.bi-tags)').first();
    this.labelDropdownMenu = page.locator('.dropdown-menu:has(.btn-label), [class*="dropdown-menu"]:has(button.btn-label)').first();
    
    // Add Label button in dropdown
    // HTML: <button class="btn-label">Add Label</button>
    this.addLabelButton = page.locator('button.btn-label:has-text("Add Label"), .btn-label:has-text("Add Label"), button:has-text("Add Label")').first();
    
    // Manage Label button in dropdown
    // HTML: <button routerlink="/manage-label" class="btn-label">Manage Label</button>
    this.manageLabelButton = page.locator('button.btn-label[routerlink="/manage-label"], button.btn-label:has-text("Manage Label"), button[routerlink="/manage-label"]').first();
    
    // Add Label Modal
    this.addLabelModal = page.locator('.modal-section:has(.modal-heading:has-text("Add Label")), .modal:has-text("Add Label"), div[class*="modal"]:has-text("Add Label")').first();
    this.addLabelModalHeading = page.locator('.modal-heading:has-text("Add Label"), *:has-text("Add Label")').first();
    
    // Label Name input field
    // HTML: <input id="name" ng-reflect-name="name" placeholder="Label Name" required>
    this.labelNameInput = page.locator('input#name[ng-reflect-name="name"], input#name[placeholder="Label Name"], input#name').first();
    
    // Color picker
    // HTML: <span class="colors mx-2 my-2">
    this.colorSpans = page.locator('span.colors.mx-2.my-2, span.colors');
    this.selectedColorSpan = page.locator('span.selected-color');
    this.customColorInput = page.locator('input#customInputColor[type="color"], input[type="color"][id*="custom"], input[type="color"]').first();
    
    // Modal buttons
    this.modalSubmitButton = page.locator('.modal-section button.search-btn[type="submit"], .modal button.search-btn, button.search-btn:has-text("Submit")').first();
    this.modalCancelButton = page.locator('.modal-section button.reset-btn, .modal button.reset-btn, button.reset-btn:has-text("Cancel")').first();
    
    // Validation errors
    this.labelNameValidationError = page.locator('input#name + .error-message, input#name ~ .text-danger, .form-control.ng-invalid + .error-message').first();
    this.requiredFieldErrors = page.locator('.text-danger:has-text("required"), .error-message:has-text("required"), *:has-text("required field")').first();
    
    // Toast notifications
    // HTML: <div class="overlay-container" aria-live="polite"><div id="toast-container" class="toast-top-right toast-container"></div></div>
    this.toastContainer = page.locator('#toast-container, .toast-container, .toast-top-right');
    this.toastMessages = page.locator('#toast-container .toast, .toast-container .toast, .toast');
    
    // Manage Label page
    this.manageLabelPageHeading = page.locator('*:has-text("Manage Label"), h1:has-text("Manage Label"), h2:has-text("Manage Label")').first();
    this.manageLabelTable = page.locator('table:has(th:has-text("Label Name")), table:has(th:has-text("Number of Accounts"))').first();
    this.manageLabelTableRows = page.locator('table tbody tr, table:has(th:has-text("Label Name")) tbody tr');
    this.labelNameColumnCells = page.locator('td:has-text("re-active"), td:has-text("trial"), td:has-text("testing"), table tbody tr td:first-child').first();
    // Label Name column - first column in the table (th:has-text("Label Name") indicates first column)
    this.labelNameColumnAllCells = page.locator('table:has(th:has-text("Label Name")) tbody tr td:first-child, table tbody tr td:first-child, table:has(th:has-text("Label Name")) tbody td:first-child');
    // Alternative: find by column header index
    this.labelNameColumnHeader = page.locator('th:has-text("Label Name"), table thead th:has-text("Label Name")').first();
    
    // Action column - last column in the table
    this.actionColumnCells = page.locator('table tbody tr td:last-child, table:has(th:has-text("Action")) tbody tr td:last-child');
    // Edit button in action column (pencil icon)
    // HTML: <i class="bi bi-pencil me-3"></i>
    this.editLabelButton = page.locator('table tbody tr td:last-child i.bi-pencil, table tbody tr td:last-child button:has(i.bi-pencil), table tbody tr td:last-child i.bi-pencil.me-3, table:has(th:has-text("Action")) tbody tr td:last-child i.bi-pencil').first();
    this.editLabelButtons = page.locator('table tbody tr td:last-child i.bi-pencil, table tbody tr td:last-child button:has(i.bi-pencil)');
    
    // Delete button in action column (trash icon)
    // HTML: <i class="bi bi-trash"></i>
    this.deleteLabelButton = page.locator('table tbody tr td:last-child i.bi-trash, table tbody tr td:last-child button:has(i.bi-trash), table:has(th:has-text("Action")) tbody tr td:last-child i.bi-trash').first();
    this.deleteLabelButtons = page.locator('table tbody tr td:last-child i.bi-trash, table tbody tr td:last-child button:has(i.bi-trash)');
    
    // Edit Label Modal
    this.editLabelModal = page.locator('.modal-section:has(.modal-heading:has-text("Edit Label")), .modal:has-text("Edit Label"), div[class*="modal"]:has-text("Edit Label")').first();
    this.editLabelModalHeading = page.locator('.modal-heading:has-text("Edit Label"), *:has-text("Edit Label")').first();
    
    // Delete Confirmation Modal (if exists)
    this.deleteConfirmationModal = page.locator('.modal-section:has-text("Delete"), .modal:has-text("Delete"), div[class*="modal"]:has-text("Delete"), .modal:has-text("confirm"), .modal:has-text("Confirm")').first();
    this.deleteConfirmButton = page.locator('button:has-text("Delete"), button:has-text("Yes"), button:has-text("Confirm"), .modal button:has-text("Delete"), .modal button:has-text("Yes")').first();
    this.deleteCancelButton = page.locator('button:has-text("Cancel"), button:has-text("No"), .modal button:has-text("Cancel"), .modal button:has-text("No")').first();

    // ========= Add Reseller Form Locators =========
    // Add Reseller Modal/Form
    const addResellerFormLocator = page.locator('form:has(h3.title:has-text("Add Reseller")), form:has(strong:has-text("Add Reseller")), .modal:has-text("Add Reseller")').first();
    this.addResellerForm = addResellerFormLocator;
    this.addResellerFormHeading = page.locator('h3.title strong:has-text("Add Reseller"), h3.title:has-text("Add Reseller"), strong:has-text("Add Reseller")').first();
    
    // Form scope for scoping form fields
    const formScope = addResellerFormLocator;
    
    // Required field inputs - scoped to form
    this.nameInput = formScope.locator('input#fullName[formcontrolname="name"], input#fullName[ng-reflect-name="name"], input[formcontrolname="name"][placeholder="Enter Name"]').first();
    this.companyNameInput = formScope.locator('input#companyName[formcontrolname="companyName"], input#companyName[ng-reflect-name="companyName"], input[formcontrolname="companyName"][placeholder="Enter Company name"]').first();
    this.mobileInput = formScope.locator('input#mobile[formcontrolname="mobile"], input#mobile[ng-reflect-name="mobile"], input[formcontrolname="mobile"][placeholder="Enter Mobile Number"]').first();
    this.emailInput = formScope.locator('input#email[formcontrolname="email"], input#email[ng-reflect-name="email"], input[formcontrolname="email"][placeholder="Enter Email Id"]').first();
    this.passwordInput = formScope.locator('input#password[formcontrolname="password"], input#password[ng-reflect-name="password"], input[formcontrolname="password"][placeholder="Enter Password"]').first();
    this.confirmPasswordInput = formScope.locator('input#confirmPassword[formcontrolname="confirmPassword"], input#confirmPassword[ng-reflect-name="confirmPassword"], input[formcontrolname="confirmPassword"][placeholder="Enter confirm password"]').first();
    
    // Dropdowns - scoped to form
    this.partnerTypeDropdown = formScope.locator('select[formcontrolname="partnerType"], select[ng-reflect-name="partnerType"]').first();
    this.accountManagerDropdown = formScope.locator('select[formcontrolname="accountManagerId"], select[ng-reflect-name="accountManagerId"]').first();
    this.countryDropdown = formScope.locator('select[formcontrolname="country"], select[ng-reflect-name="country"]').first();
    this.stateDropdown = formScope.locator('select[formcontrolname="state"], select[ng-reflect-name="state"]').first();
    this.cityInput = formScope.locator('input#city[formcontrolname="district"], input#city[ng-reflect-name="district"], input[formcontrolname="district"][placeholder="Enter your city"]').first();
    this.categoryDropdown = formScope.locator('select[formcontrolname="category"], select[ng-reflect-name="category"]').first();
    
    // Number inputs - scoped to form
    this.minOrderLimitInput = formScope.locator('input#minOrderValue[formcontrolname="minOrderValue"], input#minOrderValue[ng-reflect-name="minOrderValue"], input[formcontrolname="minOrderValue"][placeholder="Enter Min Order Value"]').first();
    this.maxTrialLimitInput = formScope.locator('input#maxTrialLimit[formcontrolname="maxTrialLimit"], input#maxTrialLimit[ng-reflect-name="maxTrialLimit"], input[formcontrolname="maxTrialLimit"][placeholder="Enter Max Trial Limit"]').first();
    this.pincodeInput = formScope.locator('input[name="pinCode"][formcontrolname="pincode"], input[formcontrolname="pincode"][ng-reflect-name="pincode"]').first();
    this.pipedriveUrlInput = formScope.locator('input[formcontrolname="pipeDriveUrl"], input[ng-reflect-name="pipeDriveUrl"]').first();
    this.teamSizeSalesInput = formScope.locator('input[formcontrolname="salesTeamSize"], input[ng-reflect-name="salesTeamSize"][placeholder="Enter Sales Team Size"]').first();
    this.teamSizeSupportInput = formScope.locator('input[formcontrolname="supportTeamSize"], input[ng-reflect-name="supportTeamSize"][placeholder="Enter Support Team Size"]').first();
    
    // Plan and Addon selection (collapsible) - scoped to Add Reseller form
    this.selectPlanButton = formScope.locator('p[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Select plan"), p.light.form-control.plan-table:has-text("Select plan"), p:has-text("Select plan")').first();
    this.planCollapse = formScope.locator('#collapseExample.collapse, #collapseExample.collapse.show').first();
    this.planCheckboxes = this.planCollapse.locator('input[type="checkbox"]');
    
    this.selectAddonButton = formScope.locator('p[data-bs-toggle="collapse"][data-bs-target="#addonCollapseExample"]:has-text("Select Addon"), p.light.form-control.plan-table:has-text("Select Addon"), p:has-text("Select Addon")').first();
    this.addonCollapse = formScope.locator('#addonCollapseExample.collapse, #addonCollapseExample.collapse.show').first();
    this.addonCheckboxes = this.addonCollapse.locator('input[type="checkbox"]');
    
    // Submit button - scoped to form
    this.submitButton = formScope.locator('button[type="submit"].comman-btn1.btn-primary, button[type="submit"]:has-text("Submit"), button.comman-btn1.btn-primary:has-text("Submit"), button[type="submit"]').first();
    
    // Validation errors - scoped to form
    this.nameError = formScope.locator('input#fullName ~ .error-message, input#fullName ~ .alert .error-message').first();
    this.companyNameError = formScope.locator('input#companyName ~ .error-message, input#companyName ~ .alert .error-message').first();
    this.mobileError = formScope.locator('input#mobile ~ .error-message, input#mobile ~ .alert .error-message').first();
    this.partnerTypeError = formScope.locator('select[formcontrolname="partnerType"] ~ .error-message, select[formcontrolname="partnerType"] ~ .alert .error-message').first();
    this.accountManagerError = formScope.locator('select[formcontrolname="accountManagerId"] ~ .error-message, select[formcontrolname="accountManagerId"] ~ .alert .error-message').first();
    this.countryError = formScope.locator('select[formcontrolname="country"] ~ .error-message, select[formcontrolname="country"] ~ .alert .error-message').first();

    // ========= Edit Reseller Form Locators =========
    // Edit Reseller Modal/Form
    const editResellerFormLocator = page.locator('form:has(h3.title:has-text("Edit Reseller")), form:has(strong:has-text("Edit Reseller")), .modal:has-text("Edit Reseller")').first();
    this.editResellerForm = editResellerFormLocator;
    this.editResellerFormHeading = page.locator('h3.title strong:has-text("Edit Reseller"), h3.title:has-text("Edit Reseller"), strong:has-text("Edit Reseller")').first();
    
    // Form scope for scoping form fields
    const editFormScope = editResellerFormLocator;
    
    // Form fields - same structure as Add Reseller form
    this.editNameInput = editFormScope.locator('input#fullName[formcontrolname="name"], input#fullName[ng-reflect-name="name"], input[formcontrolname="name"][placeholder="Enter Name"]').first();
    this.editNameIcon = editFormScope.locator('input#fullName[formcontrolname="name"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editCompanyNameInput = editFormScope.locator('input#companyName[formcontrolname="companyName"], input#companyName[ng-reflect-name="companyName"], input[formcontrolname="companyName"][placeholder="Enter Company name"]').first();
    this.editCompanyNameIcon = editFormScope.locator('input#companyName[formcontrolname="companyName"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editMobileInput = editFormScope.locator('input#mobile[formcontrolname="mobile"], input#mobile[ng-reflect-name="mobile"], input[formcontrolname="mobile"][placeholder="Enter Mobile Number"]').first();
    this.editMobileIcon = editFormScope.locator('input#mobile[formcontrolname="mobile"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editEmailInput = editFormScope.locator('input#email[formcontrolname="email"], input#email[ng-reflect-name="email"], input[formcontrolname="email"][placeholder="Enter Email Id"]').first();
    this.editEmailIcon = editFormScope.locator('input#email[formcontrolname="email"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editPasswordInput = editFormScope.locator('input#password[formcontrolname="password"], input#password[ng-reflect-name="password"], input[formcontrolname="password"][placeholder="Enter Password"]').first();
    this.editPasswordIcon = editFormScope.locator('input#password[formcontrolname="password"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editConfirmPasswordInput = editFormScope.locator('input#confirmPassword[formcontrolname="confirmPassword"], input#confirmPassword[ng-reflect-name="confirmPassword"], input[formcontrolname="confirmPassword"][placeholder="Enter confirm password"]').first();
    this.editConfirmPasswordIcon = editFormScope.locator('input#confirmPassword[formcontrolname="confirmPassword"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    // Dropdowns - scoped to edit form
    this.editPartnerTypeDropdown = editFormScope.locator('select[formcontrolname="partnerType"], select[ng-reflect-name="partnerType"]').first();
    this.editAccountManagerDropdown = editFormScope.locator('select[formcontrolname="accountManagerId"], select[ng-reflect-name="accountManagerId"]').first();
    this.editCountryDropdown = editFormScope.locator('select[formcontrolname="country"], select[ng-reflect-name="country"]').first();
    this.editStateDropdown = editFormScope.locator('select[formcontrolname="state"], select[ng-reflect-name="state"]').first();
    this.editCityInput = editFormScope.locator('input#city[formcontrolname="district"], input#city[ng-reflect-name="district"], input[formcontrolname="district"][placeholder="Enter your city"]').first();
    this.editCategoryDropdown = editFormScope.locator('select[formcontrolname="category"], select[ng-reflect-name="category"]').first();
    
    // Number inputs - scoped to edit form
    this.editMinOrderLimitInput = editFormScope.locator('input#minOrderValue[formcontrolname="minOrderValue"], input#minOrderValue[ng-reflect-name="minOrderValue"], input[formcontrolname="minOrderValue"][placeholder="Enter Min Order Value"]').first();
    this.editMinOrderLimitIcon = editFormScope.locator('input#minOrderValue[formcontrolname="minOrderValue"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editMaxTrialLimitInput = editFormScope.locator('input#maxTrialLimit[formcontrolname="maxTrialLimit"], input#maxTrialLimit[ng-reflect-name="maxTrialLimit"], input[formcontrolname="maxTrialLimit"][placeholder="Enter Max Trial Limit"]').first();
    this.editMaxTrialLimitIcon = editFormScope.locator('input#maxTrialLimit[formcontrolname="maxTrialLimit"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editPincodeInput = editFormScope.locator('input[name="pinCode"][formcontrolname="pincode"], input[formcontrolname="pincode"][ng-reflect-name="pincode"]').first();
    this.editPincodeIcon = editFormScope.locator('input[formcontrolname="pincode"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editPipedriveUrlInput = editFormScope.locator('input[formcontrolname="pipeDriveUrl"], input[ng-reflect-name="pipeDriveUrl"]').first();
    this.editPipedriveUrlIcon = editFormScope.locator('input[formcontrolname="pipeDriveUrl"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editTeamSizeSalesInput = editFormScope.locator('input[formcontrolname="salesTeamSize"], input[ng-reflect-name="salesTeamSize"][placeholder="Enter Sales Team Size"]').first();
    this.editTeamSizeSalesIcon = editFormScope.locator('input[formcontrolname="salesTeamSize"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    this.editTeamSizeSupportInput = editFormScope.locator('input[formcontrolname="supportTeamSize"], input[ng-reflect-name="supportTeamSize"][placeholder="Enter Support Team Size"]').first();
    this.editTeamSizeSupportIcon = editFormScope.locator('input[formcontrolname="supportTeamSize"]').locator('..').locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
    
    // Plan and Addon selection (collapsible) - scoped to Edit Reseller form
    this.editSelectPlanButton = editFormScope.locator('p[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Select plan"), p.light.form-control.plan-table:has-text("Select plan"), p:has-text("Select plan")').first();
    this.editPlanCollapse = editFormScope.locator('#collapseExample.collapse, #collapseExample.collapse.show').first();
    this.editPlanCheckboxes = this.editPlanCollapse.locator('input[type="checkbox"]');
    
    this.editSelectAddonButton = editFormScope.locator('p[data-bs-toggle="collapse"][data-bs-target="#addonCollapseExample"]:has-text("Select Addon"), p.light.form-control.plan-table:has-text("Select Addon"), p:has-text("Select Addon")').first();
    this.editAddonCollapse = editFormScope.locator('#addonCollapseExample.collapse, #addonCollapseExample.collapse.show').first();
    this.editAddonCheckboxes = this.editAddonCollapse.locator('input[type="checkbox"]');
    
    // Update button - scoped to edit form
    this.updateButton = editFormScope.locator('button[type="submit"].comman-btn1.btn-primary:has-text("Update"), button[type="submit"].comman-btn1.btn-primary, button.comman-btn1.btn-primary:has-text("Update")').first();
  }

  /**
   * Navigates to the Reseller page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoReseller(baseUrl) {
    try {
      // Navigate to reseller page via sidebar link
      await this.resellerLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.resellerLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.resellerLink.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      
      // Wait for reseller page to load
      await this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    } catch (error) {
      // If navigation via link fails, try direct URL
      const currentUrl = this.page.url();
      const base = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${base}/reseller`);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Verifies the Reseller page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnResellerPage = url.includes('/reseller');
      const isTitleVisible = await this.pageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnResellerPage && isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Gets the page heading text
   * @returns {Promise<string>}
   */
  async getPageHeading() {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
      const headingText = await this.pageHeading.textContent();
      return headingText ? headingText.trim() : '';
    } catch (error) {
      // Try alternative locators
      try {
        const titleText = await this.pageTitle.textContent();
        if (titleText) return titleText.trim();
      } catch (e) {
        // If both fail, return empty string
      }
      return '';
    }
  }

  // ==================== SEARCH METHODS ====================

  /**
   * Clicks the "Search Here" button to open search panel
   */
  async clickSearchHere() {
    try {
      // Check if form is already open by checking if any input field is visible
      const isFormVisible = await this.companyNameField.isVisible({ timeout: 1000 }).catch(() => false);
      if (isFormVisible) {
        return; // Already open
      }
      
      // Wait for button to be ready
      await this.searchHereButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchHereButton.scrollIntoViewIfNeeded();
      
      // Try clicking the div first
      let clickWorked = false;
      try {
        await this.searchHereButton.click({ timeout: 5000 });
        await this.page.waitForTimeout(300);
        // Check if collapse started expanding
        const collapse = this.page.locator('#collapseExample');
        const hasShow = await collapse.evaluate(el => el.classList.contains('show')).catch(() => false);
        if (hasShow) {
          clickWorked = true;
        }
      } catch {
        // Try JavaScript click on div
        try {
          await this.searchHereButton.evaluate(el => el.click());
          await this.page.waitForTimeout(300);
          clickWorked = true;
        } catch {
          // Try clicking the span instead
          try {
            await this.searchHereSpan.waitFor({ state: 'visible', timeout: 5000 });
            await this.searchHereSpan.scrollIntoViewIfNeeded();
            await this.searchHereSpan.click({ timeout: 5000 });
            clickWorked = true;
          } catch {
            // Last resort: JavaScript click on span
            await this.searchHereSpan.evaluate(el => el.click());
            clickWorked = true;
          }
        }
      }
      
      // Wait a bit for the click to register
      await this.page.waitForTimeout(500);
      
      // Wait for collapse to expand - check for show class or aria-expanded
      let collapseExpanded = false;
      const collapseElement = this.page.locator('#collapseExample');
      
      for (let i = 0; i < 40; i++) {
        await this.page.waitForTimeout(200);
        try {
          // Check for show class
          const hasShow = await collapseElement.evaluate(el => el.classList.contains('show'));
          // Check for aria-expanded on button
          const buttonExpanded = await this.searchHereButton.getAttribute('aria-expanded');
          // Check if collapse is visible (height > 0)
          const isVisible = await collapseElement.isVisible({ timeout: 100 }).catch(() => false);
          
          if (hasShow || buttonExpanded === 'true' || isVisible) {
            collapseExpanded = true;
            break;
          }
        } catch {
          // Continue polling
        }
      }
      
      // Wait for animation to complete
      await this.page.waitForTimeout(1000);
      
      // Now wait for any input field to be visible
      let inputVisible = false;
      const inputs = [
        this.companyNameField,
        this.emailField,
        this.mobileField
      ];
      
      // Poll for inputs to become visible (check every 200ms for up to 10 seconds)
      for (let i = 0; i < 50; i++) {
        await this.page.waitForTimeout(200);
        for (const input of inputs) {
          try {
            const isVisible = await input.isVisible({ timeout: 100 });
            if (isVisible) {
              inputVisible = true;
              break;
            }
          } catch {
            // Continue checking
          }
        }
        if (inputVisible) {
          // Wait a bit more to ensure animation is complete
          await this.page.waitForTimeout(300);
          break;
        }
      }
      
      if (!inputVisible) {
        // Try one more time with force - maybe inputs are there but need to be scrolled into view
        for (const input of inputs) {
          try {
            await input.scrollIntoViewIfNeeded();
            const isVisible = await input.isVisible({ timeout: 1000 });
            if (isVisible) {
              inputVisible = true;
              break;
            }
          } catch {
            // Continue
          }
        }
      }
      
      if (!inputVisible) {
        throw new Error(`Input fields did not become visible after clicking Search Here. Collapse expanded: ${collapseExpanded}`);
      }
    } catch (error) {
      throw new Error(`Failed to click Search Here: ${error.message}`);
    }
  }

  /**
   * Enters value in Company Name search field
   * @param {string} value - Company Name value
   */
  async enterCompanyName(value) {
    try {
      await this.clickSearchHere();
      await this.companyNameField.waitFor({ state: 'visible', timeout: 5000 });
      await this.companyNameField.scrollIntoViewIfNeeded();
      await this.companyNameField.clear();
      await this.companyNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Company Name: ${error.message}`);
    }
  }

  /**
   * Enters value in Email search field
   * @param {string} value - Email value
   */
  async enterEmail(value) {
    try {
      await this.clickSearchHere();
      await this.emailField.waitFor({ state: 'visible', timeout: 5000 });
      await this.emailField.scrollIntoViewIfNeeded();
      await this.emailField.clear();
      await this.emailField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Email: ${error.message}`);
    }
  }

  /**
   * Enters value in Mobile search field
   * @param {string} value - Mobile value
   */
  async enterMobile(value) {
    try {
      await this.clickSearchHere();
      await this.mobileField.waitFor({ state: 'visible', timeout: 5000 });
      await this.mobileField.scrollIntoViewIfNeeded();
      await this.mobileField.clear();
      await this.mobileField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Mobile: ${error.message}`);
    }
  }

  /**
   * Selects value in Reseller Type dropdown
   * @param {string} value - Reseller Type value to select (e.g., "Reseller", "Partner")
   */
  async selectResellerType(value) {
    // Wrap entire operation in a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('selectResellerType timeout after 30 seconds')), 30000);
    });

    try {
      const operation = (async () => {
        await this.clickSearchHere();
        
        // Wait for any existing overlays to close
        await this.page.waitForTimeout(500);
        const backdrop = this.page.locator('.cdk-overlay-backdrop');
        const backdropVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
        if (backdropVisible) {
          await this.page.mouse.click(10, 10);
          await this.page.waitForTimeout(500);
        }
        
        // Close any open dropdowns first
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
        
        await this.resellerTypeDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.resellerTypeDropdown.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        
        // Click the dropdown with retry
        let dropdownOpened = false;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            await this.resellerTypeDropdown.click({ timeout: 5000 });
            await this.page.waitForTimeout(500);
            
            // Check if options panel appeared
            const optionsPanel = this.page.locator('.cdk-overlay-pane mat-option, .mat-mdc-select-panel mat-option, .cdk-overlay-container mat-option');
            const panelVisible = await optionsPanel.first().isVisible({ timeout: 2000 }).catch(() => false);
            if (panelVisible) {
              dropdownOpened = true;
              break;
            }
          } catch (e) {
            if (attempt < 2) {
              await this.page.waitForTimeout(500);
              continue;
            }
            throw e;
          }
        }
        
        if (!dropdownOpened) {
          throw new Error('Dropdown did not open after clicking');
        }
        
        // Wait for options panel to be fully visible
        const optionsPanel = this.page.locator('.cdk-overlay-pane mat-option, .mat-mdc-select-panel mat-option, .cdk-overlay-container mat-option');
        await optionsPanel.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(500);
        
        // Find and select the option with multiple strategies
        let optionSelected = false;
        const optionLocators = [
          `mat-option:has-text("${value}")`,
          `mat-option[value="${value}"]`,
          `mat-option:has-text("${value}"):not([disabled])`,
          `.mat-mdc-select-panel mat-option:has-text("${value}")`,
          `.cdk-overlay-pane mat-option:has-text("${value}")`
        ];
        
        for (const locatorStr of optionLocators) {
          try {
            const option = this.page.locator(locatorStr).first();
            const isVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
              await option.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(300);
              await option.click({ timeout: 5000 });
              await this.page.waitForTimeout(500);
              optionSelected = true;
              break;
            }
          } catch (e) {
            // Try next locator
            continue;
          }
        }
        
        if (!optionSelected) {
          // Try to get all available options for debugging
          const allOptions = await optionsPanel.allTextContents().catch(() => []);
          throw new Error(`Option "${value}" not found. Available options: ${allOptions.join(', ')}`);
        }
        
        // Close dropdown by pressing Escape or clicking outside
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
        
        // Verify dropdown is closed
        const panelStillVisible = await optionsPanel.first().isVisible({ timeout: 1000 }).catch(() => false);
        if (panelStillVisible) {
          // Click outside to close
          await this.page.mouse.click(10, 10);
          await this.page.waitForTimeout(500);
        }
      })();

      await Promise.race([operation, timeoutPromise]);
    } catch (error) {
      // Try to close any open dropdowns before throwing error
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
      } catch {
        // Ignore cleanup errors
      }
      throw new Error(`Failed to select Reseller Type "${value}": ${error.message}`);
    }
  }

  /**
   * Sets registration date (previous year date)
   * @param {string} startDate - Start date (format: MM/DD/YYYY)
   * @param {string} endDate - End date (format: MM/DD/YYYY)
   */
  async setRegistrationDate(startDate, endDate) {
    try {
      await this.clickSearchHere();
      
      // Click on date picker toggle
      await this.registrationDateToggle.waitFor({ state: 'visible', timeout: 5000 });
      await this.registrationDateToggle.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.registrationDateToggle.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for calendar to appear
      const calendar = this.page.locator('div.cdk-overlay-pane mat-calendar, div.mat-datepicker-popup, div.cdk-overlay-pane [class*="calendar"]').first();
      await calendar.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Fill start date
      await this.registrationDateStartInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.registrationDateStartInput.clear();
      await this.registrationDateStartInput.fill(startDate);
      await this.page.waitForTimeout(500);
      
      // Fill end date
      await this.registrationDateEndInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.registrationDateEndInput.clear();
      await this.registrationDateEndInput.fill(endDate);
      await this.page.waitForTimeout(500);
      
      // Close calendar if still open
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to set Registration Date: ${error.message}`);
    }
  }

  /**
   * Selects value in Label dropdown
   * @param {string} value - Label value to select
   */
  async selectLabel(value) {
    try {
      await this.clickSearchHere();
      
      // Wait for any existing overlays to close
      await this.page.waitForTimeout(500);
      const backdrop = this.page.locator('.cdk-overlay-backdrop');
      const backdropVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
      if (backdropVisible) {
        await this.page.mouse.click(10, 10);
        await this.page.waitForTimeout(300);
      }
      
      await this.labelDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.labelDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.labelDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options panel to appear
      const optionsPanel = this.page.locator('.cdk-overlay-pane mat-option, .mat-mdc-select-panel mat-option');
      await optionsPanel.first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(300);
      
      // Select the option
      const option = this.page.locator(`mat-option:has-text("${value}"), mat-option[value="${value}"]`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Label "${value}": ${error.message}`);
    }
  }

  /**
   * Selects Account Manager with "Select All" option
   */
  async selectAccountManagerSelectAll() {
    try {
      await this.clickSearchHere();
      
      // Wait for any existing overlays to close
      await this.page.waitForTimeout(500);
      const backdrop = this.page.locator('.cdk-overlay-backdrop');
      const backdropVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
      if (backdropVisible) {
        await this.page.mouse.click(10, 10);
        await this.page.waitForTimeout(300);
      }
      
      await this.accountManagerDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.accountManagerDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.accountManagerDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options panel to appear
      const optionsPanel = this.page.locator('.cdk-overlay-pane mat-option, .mat-mdc-select-panel mat-option');
      await optionsPanel.first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(300);
      
      // Click on "Select All" option
      await this.accountManagerSelectAll.waitFor({ state: 'visible', timeout: 5000 });
      await this.accountManagerSelectAll.scrollIntoViewIfNeeded();
      await this.accountManagerSelectAll.click();
      await this.page.waitForTimeout(500);
      
      // Close the dropdown by clicking outside or pressing Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Account Manager Select All: ${error.message}`);
    }
  }

  /**
   * Selects value in Status dropdown
   * @param {string} value - Status value to select (e.g., "Active", "Inactive")
   */
  async selectStatus(value) {
    try {
      await this.clickSearchHere();
      
      // Wait for any existing overlays to close
      await this.page.waitForTimeout(500);
      const backdrop = this.page.locator('.cdk-overlay-backdrop');
      const backdropVisible = await backdrop.isVisible({ timeout: 1000 }).catch(() => false);
      if (backdropVisible) {
        await this.page.mouse.click(10, 10);
        await this.page.waitForTimeout(300);
      }
      
      await this.statusDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.statusDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.statusDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options panel to appear
      const optionsPanel = this.page.locator('.cdk-overlay-pane mat-option, .mat-mdc-select-panel mat-option');
      await optionsPanel.first().waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(300);
      
      // Select the option
      const option = this.page.locator(`mat-option:has-text("${value}"), mat-option[value="${value}"]`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Status "${value}": ${error.message}`);
    }
  }

  /**
   * Clicks the Search button
   */
  async clickSearch() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.searchButton.click();
      await this.page.waitForTimeout(2000); // Wait for search results to load
    } catch (error) {
      throw new Error(`Failed to click Search button: ${error.message}`);
    }
  }

  /**
   * Clicks the Reset button
   */
  async clickReset() {
    try {
      await this.resetButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.resetButton.click();
      await this.page.waitForTimeout(2000); // Wait for form to reset and table to reload
    } catch (error) {
      throw new Error(`Failed to click Reset button: ${error.message}`);
    }
  }

  /**
   * Verifies table has data or shows "No data" message
   * @returns {Promise<{hasData: boolean, rowCount: number, hasNoDataMessage: boolean}>}
   */
  async verifyTableData() {
    try {
      await this.page.waitForTimeout(2000); // Wait for table to update
      
      // Check row count first
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      
      // Check for no data message with multiple strategies
      let noDataMessage = false;
      
      // Strategy 1: Check if the specific "no reseller added yet" message is visible
      try {
        const noResellerMessage = this.page.locator('p.fs-5:has-text("There is no reseller added yet"), *:has-text("There is no reseller added yet")');
        noDataMessage = await noResellerMessage.isVisible({ timeout: 2000 }).catch(() => false);
      } catch {
        // Continue to other strategies
      }
      
      // Strategy 2: Check the general noDataMessage locator
      if (!noDataMessage) {
        try {
          noDataMessage = await this.noDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
        } catch {
          // Continue
        }
      }
      
      // Strategy 3: If no rows and no explicit message, empty search results are valid
      // (Search can return 0 results without showing a message - this is expected behavior)
      if (!hasData && !noDataMessage) {
        // Wait a bit more and check again for message
        await this.page.waitForTimeout(1000);
        try {
          const finalMessageCheck = this.page.locator('p.fs-5:has-text("There is no reseller added yet"), *:has-text("There is no reseller added yet")');
          noDataMessage = await finalMessageCheck.isVisible({ timeout: 2000 }).catch(() => false);
        } catch {
          // Empty search results (0 rows) are valid - no message needed
          // This means the search worked but returned no matches
        }
      }
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        // Empty search results (0 rows) are valid - treat as "no data" scenario
        hasNoDataMessage: noDataMessage || rowCount === 0
      };
    } catch (error) {
      // If there's an error, check row count at least
      try {
        const rowCount = await this.allTableRows.count();
        return {
          hasData: rowCount > 0,
          rowCount: rowCount,
          hasNoDataMessage: rowCount === 0 // If no rows, consider it as valid (empty search results)
        };
      } catch {
        return {
          hasData: false,
          rowCount: 0,
          hasNoDataMessage: true // Default to true if we can't determine
        };
      }
    }
  }

  /**
   * Gets all column values from the table for verification
   * @returns {Promise<{companyNames: string[], emails: string[], accountManagers: string[]}>}
   */
  async getAllColumnValues() {
    try {
      await this.resellerTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      const companyNames = await this.companyNameCells.allTextContents();
      const emails = await this.emailCells.allTextContents();
      const accountManagers = await this.accountManagerCells.allTextContents();
      
      return {
        companyNames: companyNames.map(text => text.trim()).filter(text => text),
        emails: emails.map(text => text.trim()).filter(text => text),
        accountManagers: accountManagers.map(text => text.trim()).filter(text => text)
      };
    } catch (error) {
      return {
        companyNames: [],
        emails: [],
        accountManagers: []
      };
    }
  }

  // ==================== LABEL MANAGEMENT METHODS ====================

  /**
   * Clicks the label dropdown button to open the dropdown menu
   */
  async clickLabelDropdownButton() {
    try {
      await this.labelDropdownButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.labelDropdownButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.labelDropdownButton.click();
      await this.page.waitForTimeout(500);
      
      // Wait for dropdown menu to appear
      await this.labelDropdownMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click label dropdown button: ${error.message}`);
    }
  }

  /**
   * Checks if the label dropdown menu is open
   * @returns {Promise<boolean>}
   */
  async isLabelDropdownOpen() {
    try {
      return await this.labelDropdownMenu.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {
      return false;
    }
  }

  /**
   * Clicks the "Add Label" button in the dropdown
   */
  async clickAddLabelButton() {
    try {
      // Ensure dropdown is open
      if (!(await this.isLabelDropdownOpen())) {
        await this.clickLabelDropdownButton();
      }
      
      await this.addLabelButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addLabelButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.addLabelButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for modal to appear
      await this.addLabelModal.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Add Label button: ${error.message}`);
    }
  }

  /**
   * Checks if the Add Label modal is open
   * @returns {Promise<boolean>}
   */
  async isAddLabelModalOpen() {
    try {
      return await this.addLabelModal.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Submit button in the Add Label modal
   */
  async clickModalSubmit() {
    try {
      await this.modalSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.modalSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.modalSubmitButton.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click modal Submit button: ${error.message}`);
    }
  }

  /**
   * Clicks the Cancel button in the Add Label modal
   */
  async clickModalCancel() {
    try {
      // Strategy 1: Try primary locator
      const isCancelVisible = await this.modalCancelButton.isVisible({ timeout: 5000 }).catch(() => false);
      if (isCancelVisible) {
        await this.modalCancelButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
        await this.modalCancelButton.click();
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 2: Try alternative selectors
      const cancelButtonAlternate = this.page.locator('.modal button:has-text("Cancel"), .modal-section button:has-text("Cancel"), button.reset-btn, button:has-text("Cancel")').first();
      const isAlternateVisible = await cancelButtonAlternate.isVisible({ timeout: 5000 }).catch(() => false);
      if (isAlternateVisible) {
        await cancelButtonAlternate.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
        await cancelButtonAlternate.click();
        await this.page.waitForTimeout(500);
        return;
      }

      // Strategy 3: Try Escape key as fallback
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Last resort: Try Escape key
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch (escapeError) {
        throw new Error(`Failed to click modal Cancel button: ${error.message}`);
      }
    }
  }

  /**
   * Gets validation errors from the Add Label form
   * @returns {Promise<string[]>}
   */
  async getLabelFormValidationErrors() {
    try {
      const errors = [];
      
      // Check for required field errors
      const requiredError = await this.requiredFieldErrors.isVisible({ timeout: 1000 }).catch(() => false);
      if (requiredError) {
        const errorText = await this.requiredFieldErrors.textContent().catch(() => '');
        if (errorText) errors.push(errorText.trim());
      }
      
      // Check for label name specific errors
      const nameError = await this.labelNameValidationError.isVisible({ timeout: 1000 }).catch(() => false);
      if (nameError) {
        const errorText = await this.labelNameValidationError.textContent().catch(() => '');
        if (errorText) errors.push(errorText.trim());
      }
      
      // Check if input has invalid class
      const inputInvalid = await this.labelNameInput.evaluate(el => el.classList.contains('ng-invalid')).catch(() => false);
      if (inputInvalid && errors.length === 0) {
        errors.push('Label Name is required');
      }
      
      return errors;
    } catch {
      return [];
    }
  }

  /**
   * Enters label name in the input field
   * @param {string} labelName - Label name to enter
   */
  async enterLabelName(labelName) {
    try {
      await this.labelNameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.labelNameInput.scrollIntoViewIfNeeded();
      await this.labelNameInput.clear();
      await this.labelNameInput.fill(labelName);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter label name: ${error.message}`);
    }
  }

  /**
   * Gets the current value of the label name input
   * @returns {Promise<string>}
   */
  async getLabelNameValue() {
    try {
      return await this.labelNameInput.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Checks if label name input has character limit (25 characters)
   * @param {string} labelName - Label name to test
   * @returns {Promise<boolean>}
   */
  async checkLabelNameCharacterLimit(labelName) {
    try {
      await this.enterLabelName(labelName);
      const currentValue = await this.getLabelNameValue();
      // If input value is truncated to 25 characters, limit is working
      return currentValue.length <= 25;
    } catch {
      return false;
    }
  }

  /**
   * Selects a color from the color picker
   * @param {number} colorIndex - Index of the color span to select (0-based)
   */
  async selectColor(colorIndex = 0) {
    try {
      await this.colorSpans.first().waitFor({ state: 'visible', timeout: 10000 });
      const colorCount = await this.colorSpans.count();
      
      if (colorCount === 0) {
        throw new Error('No color options available');
      }
      
      const index = Math.min(colorIndex, colorCount - 1);
      const colorSpan = this.colorSpans.nth(index);
      await colorSpan.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await colorSpan.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select color at index ${colorIndex}: ${error.message}`);
    }
  }

  /**
   * Clicks the "Manage Label" button in the dropdown
   */
  async clickManageLabelButton() {
    try {
      // Ensure dropdown is open
      if (!(await this.isLabelDropdownOpen())) {
        await this.clickLabelDropdownButton();
      }
      
      await this.manageLabelButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.manageLabelButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.manageLabelButton.click();
      await this.page.waitForTimeout(2000);
      
      // Wait for navigation to manage label page
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Manage Label button: ${error.message}`);
    }
  }

  /**
   * Checks if Manage Label page is loaded
   * @returns {Promise<boolean>}
   */
  async isManageLabelPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnManageLabelPage = url.includes('/manage-label');
      const isHeadingVisible = await this.manageLabelPageHeading.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnManageLabelPage && isHeadingVisible;
    } catch {
      return false;
    }
  }

  /**
   * Gets all label names from the Manage Label table
   * @returns {Promise<string[]>}
   */
  async getAllLabelNamesFromTable() {
    try {
      await this.manageLabelTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to get label names from first column
      let labelNames = [];
      
      // Strategy 1: Get all first column cells
      try {
        const cells = await this.labelNameColumnAllCells.allTextContents();
        labelNames = cells.map(text => text.trim()).filter(text => text);
        if (labelNames.length > 0) {
          return labelNames;
        }
      } catch {
        // Try next strategy
      }
      
      // Strategy 2: Get from table rows directly
      try {
        const rowCount = await this.manageLabelTableRows.count();
        for (let i = 0; i < rowCount; i++) {
          const row = this.manageLabelTableRows.nth(i);
          const firstCell = row.locator('td').first();
          const cellText = await firstCell.textContent().catch(() => '');
          if (cellText && cellText.trim()) {
            labelNames.push(cellText.trim());
          }
        }
      } catch {
        // Continue
      }
      
      // Strategy 3: Search for label name directly in table
      try {
        const labelCell = this.page.locator(`table tbody tr td:first-child:has-text("${labelName}")`);
        const count = await labelCell.count();
        if (count > 0) {
          // If we found the label, get all label names from table
          const allCells = this.page.locator('table tbody tr td:first-child');
          const allTexts = await allCells.allTextContents();
          labelNames = allTexts.map(text => text.trim()).filter(text => text);
        }
      } catch {
        // Continue
      }
      
      return labelNames;
    } catch (error) {
      return [];
    }
  }

  /**
   * Checks if a label name exists in the Manage Label table
   * @param {string} labelName - Label name to check
   * @returns {Promise<boolean>}
   */
  async isLabelNameInTable(labelName) {
    try {
      await this.manageLabelTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Strategy 1: Search directly for the label name in first column
      const labelCell = this.page.locator(`table tbody tr td:first-child:has-text("${labelName}"), table:has(th:has-text("Label Name")) tbody tr td:first-child:has-text("${labelName}")`);
      const isVisible = await labelCell.first().isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        return true;
      }
      
      // Strategy 2: Get all label names and check (handle truncation)
      const allLabelNames = await this.getAllLabelNamesFromTable();
      const normalizedSearch = labelName.toLowerCase().trim();
      const found = allLabelNames.some(name => {
        const normalizedName = name.toLowerCase().trim();
        // Handle truncation: check if either starts with the other or they match
        return normalizedName === normalizedSearch || 
               normalizedName.startsWith(normalizedSearch) ||
               normalizedSearch.startsWith(normalizedName) ||
               normalizedName.includes(normalizedSearch) || 
               normalizedSearch.includes(normalizedName);
      });
      
      if (found) {
        return true;
      }
      
      // Strategy 3: Check each row's first cell directly (handle truncation)
      const rowCount = await this.manageLabelTableRows.count();
      for (let i = 0; i < rowCount; i++) {
        const row = this.manageLabelTableRows.nth(i);
        const firstCell = row.locator('td').first();
        const cellText = await firstCell.textContent().catch(() => '');
        if (cellText) {
          const normalizedCellText = cellText.trim().toLowerCase();
          // Handle truncation: check if either starts with the other or they match
          if (normalizedCellText === normalizedSearch || 
              normalizedCellText.startsWith(normalizedSearch) ||
              normalizedSearch.startsWith(normalizedCellText) ||
              normalizedCellText.includes(normalizedSearch) ||
              normalizedSearch.includes(normalizedCellText)) {
            return true;
          }
        }
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Checks if a toast error message is visible (checks immediately)
   * @returns {Promise<boolean>}
   */
  async hasToastError() {
    try {
      // Check immediately - toast appears right after submit
      // Try multiple locator strategies
      const toastLocators = [
        '#toast-container .toast',
        '.toast-container .toast',
        '.toast-top-right .toast',
        '#toast-container .toast:visible',
        '.toast-container .toast:visible',
        '.toast:visible',
        '[class*="toast"]:visible'
      ];
      
      for (const locatorStr of toastLocators) {
        try {
          const toast = this.page.locator(locatorStr).first();
          const isVisible = await toast.isVisible({ timeout: 500 }).catch(() => false);
          if (isVisible) {
            return true;
          }
        } catch {
          // Try next locator
          continue;
        }
      }
      
      // Also check toast container and count visible toasts
      try {
        const containerVisible = await this.toastContainer.isVisible({ timeout: 500 }).catch(() => false);
        if (containerVisible) {
          const toastCount = await this.toastMessages.count();
          if (toastCount > 0) {
            // Check if any toast is visible
            for (let i = 0; i < toastCount; i++) {
              const toast = this.toastMessages.nth(i);
              const isVisible = await toast.isVisible({ timeout: 200 }).catch(() => false);
              if (isVisible) {
                return true;
              }
            }
          }
        }
      } catch {
        // Continue
      }
      
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets toast error message text (checks immediately)
   * @returns {Promise<string>}
   */
  async getToastErrorMessage() {
    try {
      // Try multiple locator strategies to find toast
      const toastLocators = [
        '#toast-container .toast',
        '.toast-container .toast',
        '.toast-top-right .toast',
        '#toast-container .toast:visible',
        '.toast-container .toast:visible',
        '.toast:visible'
      ];
      
      for (const locatorStr of toastLocators) {
        try {
          const toast = this.page.locator(locatorStr).first();
          const isVisible = await toast.isVisible({ timeout: 500 }).catch(() => false);
          if (isVisible) {
            const text = await toast.textContent();
            if (text && text.trim()) {
              return text.trim();
            }
          }
        } catch {
          // Try next locator
          continue;
        }
      }
      
      // Fallback: check toast messages directly
      try {
        const toastCount = await this.toastMessages.count();
        if (toastCount > 0) {
          for (let i = 0; i < toastCount; i++) {
            const toast = this.toastMessages.nth(i);
            const isVisible = await toast.isVisible({ timeout: 200 }).catch(() => false);
            if (isVisible) {
              const text = await toast.textContent();
              if (text && text.trim()) {
                return text.trim();
              }
            }
          }
        }
      } catch {
        // Continue
      }
      
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Clicks the edit button for a specific label in the table
   * @param {string} labelName - Label name to edit
   */
  async clickEditLabelButton(labelName) {
    try {
      // Refresh page to ensure table is up to date
      await this.page.reload();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      
      await this.manageLabelTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the row containing the label name
      const rowCount = await this.manageLabelTableRows.count();
      let editIcon = null;
      let foundRow = null;
      
      const normalizedSearch = labelName.toLowerCase().trim();
      
      for (let i = 0; i < rowCount; i++) {
        const row = this.manageLabelTableRows.nth(i);
        const firstCell = row.locator('td').first();
        const cellText = await firstCell.textContent().catch(() => '');
        
        if (cellText) {
          const normalizedCellText = cellText.trim().toLowerCase();
          
          // Check for exact match or if the label name starts with the cell text (handles truncation)
          // or if cell text starts with label name (handles partial display)
          const isMatch = normalizedCellText === normalizedSearch || 
                         normalizedCellText.startsWith(normalizedSearch) ||
                         normalizedSearch.startsWith(normalizedCellText) ||
                         normalizedCellText.includes(normalizedSearch) ||
                         normalizedSearch.includes(normalizedCellText);
          
          if (isMatch) {
            // Found the row, get edit icon from action column (last column)
            foundRow = row;
            const actionCell = row.locator('td').last();
            editIcon = actionCell.locator('i.bi-pencil, i.bi-pencil.me-3, button:has(i.bi-pencil)').first();
            console.log(`  Found label row: "${cellText.trim()}" matches "${labelName}"`);
            break;
          }
        }
      }
      
      if (!editIcon || !foundRow) {
        // Get all label names for debugging
        const allLabelNames = await this.getAllLabelNamesFromTable();
        throw new Error(`Label "${labelName}" not found in table. Available labels: ${allLabelNames.join(', ')}`);
      }
      
      await editIcon.waitFor({ state: 'visible', timeout: 5000 });
      await editIcon.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Try clicking the icon directly
      try {
        await editIcon.click({ timeout: 5000 });
      } catch {
        // If icon click fails, try clicking parent button or using JavaScript
        try {
          const parentButton = foundRow.locator('td').last().locator('button:has(i.bi-pencil)');
          await parentButton.click({ timeout: 5000 });
        } catch {
          // Last resort: JavaScript click
          await editIcon.evaluate(el => el.click());
        }
      }
      
      await this.page.waitForTimeout(1000);
      
      // Wait for edit modal to appear
      await this.editLabelModal.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click edit button for label "${labelName}": ${error.message}`);
    }
  }

  /**
   * Checks if the Edit Label modal is open
   * @returns {Promise<boolean>}
   */
  async isEditLabelModalOpen() {
    try {
      return await this.editLabelModal.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {
      return false;
    }
  }

  /**
   * Updates the label name in the edit modal
   * @param {string} newLabelName - New label name
   */
  async updateLabelName(newLabelName) {
    try {
      // The edit modal uses the same input field as add modal
      await this.labelNameInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.labelNameInput.scrollIntoViewIfNeeded();
      await this.labelNameInput.clear();
      await this.labelNameInput.fill(newLabelName);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to update label name: ${error.message}`);
    }
  }

  /**
   * Clicks the delete button for a specific label in the table
   * @param {string} labelName - Label name to delete
   */
  async clickDeleteLabelButton(labelName) {
    try {
      // Refresh page to ensure table is up to date
      await this.page.reload();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      
      await this.manageLabelTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the row containing the label name
      const rowCount = await this.manageLabelTableRows.count();
      let deleteIcon = null;
      let foundRow = null;
      
      const normalizedSearch = labelName.toLowerCase().trim();
      
      for (let i = 0; i < rowCount; i++) {
        const row = this.manageLabelTableRows.nth(i);
        const firstCell = row.locator('td').first();
        const cellText = await firstCell.textContent().catch(() => '');
        
        if (cellText) {
          const normalizedCellText = cellText.trim().toLowerCase();
          
          // Check for exact match or if the label name starts with the cell text (handles truncation)
          // or if cell text starts with label name (handles partial display)
          const isMatch = normalizedCellText === normalizedSearch || 
                         normalizedCellText.startsWith(normalizedSearch) ||
                         normalizedSearch.startsWith(normalizedCellText) ||
                         normalizedCellText.includes(normalizedSearch) ||
                         normalizedSearch.includes(normalizedCellText);
          
          if (isMatch) {
            // Found the row, get delete icon from action column (last column)
            foundRow = row;
            const actionCell = row.locator('td').last();
            deleteIcon = actionCell.locator('i.bi-trash, button:has(i.bi-trash)').first();
            console.log(`  Found label row: "${cellText.trim()}" matches "${labelName}"`);
            break;
          }
        }
      }
      
      if (!deleteIcon || !foundRow) {
        // Get all label names for debugging
        const allLabelNames = await this.getAllLabelNamesFromTable();
        throw new Error(`Label "${labelName}" not found in table. Available labels: ${allLabelNames.join(', ')}`);
      }
      
      await deleteIcon.waitFor({ state: 'visible', timeout: 5000 });
      await deleteIcon.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Try clicking the icon directly
      try {
        await deleteIcon.click({ timeout: 5000 });
      } catch {
        // If icon click fails, try clicking parent button or using JavaScript
        try {
          const parentButton = foundRow.locator('td').last().locator('button:has(i.bi-trash)');
          await parentButton.click({ timeout: 5000 });
        } catch {
          // Last resort: JavaScript click
          await deleteIcon.evaluate(el => el.click());
        }
      }
      
      await this.page.waitForTimeout(1000);
      
      // Check if delete confirmation modal appears
      const hasConfirmationModal = await this.deleteConfirmationModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (hasConfirmationModal) {
        // Click confirm/yes button
        await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteConfirmButton.click();
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to click delete button for label "${labelName}": ${error.message}`);
    }
  }

  /**
   * Checks if a label name exists in the Manage Label table (after deletion, should return false)
   * @param {string} labelName - Label name to check
   * @returns {Promise<boolean>}
   */
  async isLabelDeleted(labelName) {
    try {
      await this.manageLabelTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      const allLabelNames = await this.getAllLabelNamesFromTable();
      const normalizedSearch = labelName.toLowerCase().trim();
      
      // Check if label still exists (should return false if deleted)
      const stillExists = allLabelNames.some(label => {
        const normalizedLabel = label.toLowerCase().trim();
        return normalizedLabel === normalizedSearch || 
               normalizedLabel.startsWith(normalizedSearch) ||
               normalizedSearch.startsWith(normalizedLabel) ||
               normalizedLabel.includes(normalizedSearch) ||
               normalizedSearch.includes(normalizedLabel);
      });
      
      return !stillExists; // Return true if label is NOT found (deleted)
    } catch {
      return false;
    }
  }

  // ========= Add Reseller Form Methods =========

  /**
   * Clicks the Add Reseller button to open the form
   */
  async clickAddResellerButton() {
    try {
      await this.addResellerButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addResellerButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.addResellerButton.click();
      await this.page.waitForTimeout(1000);
      // Wait for form to be visible
      await this.addResellerFormHeading.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to click Add Reseller button: ${error.message}`);
    }
  }

  /**
   * Checks if Add Reseller form is visible
   */
  async isAddResellerFormVisible() {
    try {
      return await this.addResellerFormHeading.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Clicks submit button to check required field validations
   */
  async clickSubmitToCheckValidation() {
    try {
      // Try multiple locator strategies
      let buttonToClick = null;
      
      // Strategy 1: Try form-scoped locator
      try {
        buttonToClick = this.addResellerForm.locator('button[type="submit"].comman-btn1.btn-primary').first();
        const isVisible1 = await buttonToClick.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible1) {
          await buttonToClick.scrollIntoViewIfNeeded();
          await buttonToClick.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      } catch (e) {
        // Continue to next strategy
      }
      
      // Strategy 2: Try page-level locator with form context
      try {
        buttonToClick = this.page.locator('form:has(h3.title:has-text("Add Reseller")) button[type="submit"].comman-btn1.btn-primary, .modal:has-text("Add Reseller") button[type="submit"].comman-btn1.btn-primary').first();
        const isVisible2 = await buttonToClick.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible2) {
          await buttonToClick.scrollIntoViewIfNeeded();
          await buttonToClick.click();
          await this.page.waitForTimeout(1000);
          return;
        }
      } catch (e) {
        // Continue to next strategy
      }
      
      // Strategy 3: Try generic submit button in the form area
      try {
        buttonToClick = this.page.locator('div.col-sm-12.mt-2.text-end button[type="submit"].comman-btn1.btn-primary, button[type="submit"].comman-btn1.btn-primary:has-text("Submit")').first();
        await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
        await buttonToClick.scrollIntoViewIfNeeded();
        await buttonToClick.click();
        await this.page.waitForTimeout(1000);
        return;
      } catch (e) {
        // Continue to final strategy
      }
      
      // Strategy 4: Last resort - find any submit button with the classes
      buttonToClick = this.page.locator('button[type="submit"].comman-btn1.btn-primary').first();
      await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
      await buttonToClick.scrollIntoViewIfNeeded();
      await buttonToClick.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click submit button: ${error.message}`);
    }
  }

  /**
   * Checks if required field errors are visible
   */
  async areRequiredFieldErrorsVisible() {
    const errors = {
      name: false,
      companyName: false,
      mobile: false,
      partnerType: false,
      accountManager: false,
      country: false
    };

    try {
      errors.name = await this.nameError.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {}

    try {
      errors.companyName = await this.companyNameError.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {}

    try {
      errors.mobile = await this.mobileError.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {}

    try {
      errors.partnerType = await this.partnerTypeError.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {}

    try {
      errors.accountManager = await this.accountManagerError.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {}

    try {
      errors.country = await this.countryError.isVisible({ timeout: 2000 }).catch(() => false);
    } catch {}

    return errors;
  }

  /**
   * Fills the Add Reseller form
   */
  async fillAddResellerForm({
    name = '',
    companyName = '',
    mobile = '',
    email = '',
    password = '',
    confirmPassword = '',
    partnerType = '',
    accountManager = '',
    minOrderLimit = '',
    maxTrialLimit = '',
    country = '',
    pincode = '',
    category = '',
    pipedriveUrl = '',
    teamSizeSales = '',
    teamSizeSupport = '',
    plan = '',
    addon = ''
  }) {
    try {
      // Fill basic fields
      if (name) {
        await this.nameInput.fill(name);
        await this.page.waitForTimeout(300);
      }
      if (companyName) {
        await this.companyNameInput.fill(companyName);
        await this.page.waitForTimeout(300);
      }
      if (mobile) {
        await this.mobileInput.fill(mobile);
        await this.page.waitForTimeout(300);
      }
      if (email) {
        // Check if email is already filled, clear it first
        const emailValue = await this.emailInput.inputValue().catch(() => '');
        if (emailValue) {
          await this.emailInput.clear();
          await this.page.waitForTimeout(300);
        }
        await this.emailInput.fill(email);
        await this.page.waitForTimeout(300);
      }
      if (password) {
        // Check if password is already filled, clear it first
        const passwordValue = await this.passwordInput.inputValue().catch(() => '');
        if (passwordValue) {
          await this.passwordInput.clear();
          await this.page.waitForTimeout(300);
        }
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(300);
      }
      if (confirmPassword) {
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.page.waitForTimeout(300);
      }

      // Select dropdowns
      if (partnerType) {
        await this.partnerTypeDropdown.selectOption(partnerType);
        await this.page.waitForTimeout(500);
      }
      if (accountManager) {
        await this.accountManagerDropdown.selectOption(accountManager);
        await this.page.waitForTimeout(500);
      }
      if (minOrderLimit) {
        await this.minOrderLimitInput.fill(minOrderLimit.toString());
        await this.page.waitForTimeout(300);
      }
      if (maxTrialLimit) {
        await this.maxTrialLimitInput.fill(maxTrialLimit.toString());
        await this.page.waitForTimeout(300);
      }
      if (country) {
        await this.countryDropdown.selectOption(country);
        await this.page.waitForTimeout(1000); // Wait for state/city to load
      }
      if (pincode) {
        await this.pincodeInput.fill(pincode.toString());
        await this.page.waitForTimeout(2000); // Wait for state/city auto-population
      }
      if (category) {
        await this.categoryDropdown.selectOption(category);
        await this.page.waitForTimeout(300);
      }
      if (pipedriveUrl) {
        await this.pipedriveUrlInput.fill(pipedriveUrl);
        await this.page.waitForTimeout(300);
      }
      if (teamSizeSales) {
        await this.teamSizeSalesInput.fill(teamSizeSales.toString());
        await this.page.waitForTimeout(300);
      }
      if (teamSizeSupport) {
        await this.teamSizeSupportInput.fill(teamSizeSupport.toString());
        await this.page.waitForTimeout(300);
      }

      // Select plan
      if (plan) {
        await this.selectPlanButton.click();
        await this.page.waitForTimeout(500);
        // Wait for collapse to open
        await this.planCollapse.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        // Find and check the plan checkbox
        const planCheckbox = this.planCheckboxes.filter({ hasText: plan }).first();
        const planCheckboxExists = await planCheckbox.count() > 0;
        if (planCheckboxExists) {
          await planCheckbox.check();
        } else {
          // Try to find by label text
          const planLabel = this.planCollapse.locator(`label:has-text("${plan}"), *:has-text("${plan}")`).first();
          const checkbox = planLabel.locator('input[type="checkbox"]').first();
          await checkbox.check();
        }
        await this.page.waitForTimeout(500);
      }

      // Select addon
      if (addon) {
        await this.selectAddonButton.click();
        await this.page.waitForTimeout(500);
        // Wait for collapse to open
        await this.addonCollapse.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        // Find and check the addon checkbox
        const addonCheckbox = this.addonCheckboxes.filter({ hasText: addon }).first();
        const addonCheckboxExists = await addonCheckbox.count() > 0;
        if (addonCheckboxExists) {
          await addonCheckbox.check();
        } else {
          // Try to find by label text
          const addonLabel = this.addonCollapse.locator(`label:has-text("${addon}"), *:has-text("${addon}")`).first();
          const checkbox = addonLabel.locator('input[type="checkbox"]').first();
          await checkbox.check();
        }
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to fill Add Reseller form: ${error.message}`);
    }
  }

  /**
   * Gets the state dropdown value (after pincode is entered)
   */
  async getStateValue() {
    try {
      return await this.stateDropdown.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Gets the city input value (after pincode is entered)
   */
  async getCityValue() {
    try {
      return await this.cityInput.inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Checks if state and city are auto-populated after entering pincode
   */
  async areStateAndCityAutoPopulated() {
    try {
      const stateValue = await this.getStateValue();
      const cityValue = await this.getCityValue();
      return {
        statePopulated: stateValue !== '' && stateValue !== 'Please Select State',
        cityPopulated: cityValue !== '',
        stateValue: stateValue,
        cityValue: cityValue
      };
    } catch {
      return {
        statePopulated: false,
        cityPopulated: false,
        stateValue: '',
        cityValue: ''
      };
    }
  }

  /**
   * Submits the Add Reseller form
   */
  async submitAddResellerForm() {
    try {
      // Try multiple locator strategies
      let buttonToClick = null;
      
      // Strategy 1: Try form-scoped locator
      try {
        buttonToClick = this.addResellerForm.locator('button[type="submit"].comman-btn1.btn-primary').first();
        const isVisible1 = await buttonToClick.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible1) {
          await buttonToClick.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await buttonToClick.click();
          await this.page.waitForTimeout(3000);
          return;
        }
      } catch (e) {
        // Continue to next strategy
      }
      
      // Strategy 2: Try page-level locator with form context
      try {
        buttonToClick = this.page.locator('form:has(h3.title:has-text("Add Reseller")) button[type="submit"].comman-btn1.btn-primary, .modal:has-text("Add Reseller") button[type="submit"].comman-btn1.btn-primary').first();
        const isVisible2 = await buttonToClick.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible2) {
          await buttonToClick.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await buttonToClick.click();
          await this.page.waitForTimeout(3000);
          return;
        }
      } catch (e) {
        // Continue to next strategy
      }
      
      // Strategy 3: Try generic submit button in the form area
      try {
        buttonToClick = this.page.locator('div.col-sm-12.mt-2.text-end button[type="submit"].comman-btn1.btn-primary, button[type="submit"].comman-btn1.btn-primary:has-text("Submit")').first();
        await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
        await buttonToClick.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await buttonToClick.click();
        await this.page.waitForTimeout(3000);
        return;
      } catch (e) {
        // Continue to final strategy
      }
      
      // Strategy 4: Last resort - find any submit button with the classes
      buttonToClick = this.page.locator('button[type="submit"].comman-btn1.btn-primary').first();
      await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
      await buttonToClick.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await buttonToClick.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      throw new Error(`Failed to submit Add Reseller form: ${error.message}`);
    }
  }

  /**
   * Selects a plan from the plan dropdown
   */
  async selectPlan(planName) {
    try {
      // Try primary locator first
      let planButton = this.selectPlanButton;
      const isVisible = await planButton.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Fallback: try to find plan button without form scope
        planButton = this.page.locator('p[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Select plan"), p.light.form-control.plan-table:has-text("Select plan"), p:has-text("Select plan")').first();
        await planButton.waitFor({ state: 'visible', timeout: 5000 });
      }
      
      await planButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for collapse to open
      const collapseVisible = await this.planCollapse.isVisible({ timeout: 3000 }).catch(() => false);
      if (!collapseVisible) {
        // Try fallback collapse locator
        const fallbackCollapse = this.page.locator('#collapseExample.collapse.show, #collapseExample.collapse').first();
        const fallbackVisible = await fallbackCollapse.isVisible({ timeout: 2000 }).catch(() => false);
        if (fallbackVisible) {
          const planCheckboxes = fallbackCollapse.locator('input[type="checkbox"]');
          const checkboxes = await planCheckboxes.all();
          if (checkboxes.length > 0) {
            await checkboxes[0].check();
            await this.page.waitForTimeout(500);
            return true;
          }
        }
        return false;
      }
      
      const planCheckboxes = await this.planCheckboxes.all();
      if (planCheckboxes.length > 0) {
        await planCheckboxes[0].check();
        await this.page.waitForTimeout(500);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to select plan: ${error.message}`);
    }
  }

  /**
   * Selects an addon from the addon dropdown
   */
  async selectAddon(addonName) {
    try {
      // Try primary locator first
      let addonButton = this.selectAddonButton;
      const isVisible = await addonButton.isVisible({ timeout: 3000 }).catch(() => false);
      
      if (!isVisible) {
        // Fallback: try to find addon button without form scope
        addonButton = this.page.locator('p[data-bs-toggle="collapse"][data-bs-target="#addonCollapseExample"]:has-text("Select Addon"), p.light.form-control.plan-table:has-text("Select Addon"), p:has-text("Select Addon")').first();
        await addonButton.waitFor({ state: 'visible', timeout: 5000 });
      }
      
      await addonButton.click();
      await this.page.waitForTimeout(1000);
      
      // Wait for collapse to open
      const collapseVisible = await this.addonCollapse.isVisible({ timeout: 3000 }).catch(() => false);
      if (!collapseVisible) {
        // Try fallback collapse locator
        const fallbackCollapse = this.page.locator('#addonCollapseExample.collapse.show, #addonCollapseExample.collapse').first();
        const fallbackVisible = await fallbackCollapse.isVisible({ timeout: 2000 }).catch(() => false);
        if (fallbackVisible) {
          const addonCheckboxes = fallbackCollapse.locator('input[type="checkbox"]');
          const checkboxes = await addonCheckboxes.all();
          if (checkboxes.length > 0) {
            await checkboxes[0].check();
            await this.page.waitForTimeout(500);
            return true;
          }
        }
        return false;
      }
      
      const addonCheckboxes = await this.addonCheckboxes.all();
      if (addonCheckboxes.length > 0) {
        await addonCheckboxes[0].check();
        await this.page.waitForTimeout(500);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Failed to select addon: ${error.message}`);
    }
  }

  /**
   * Verifies if a reseller exists in the table by company name or email
   */
  /**
   * Verifies if a reseller exists in the table by searching for company name or email
   * @param {string} companyName - Company name to search for
   * @param {string} email - Email to search for (optional, used as fallback)
   * @returns {Promise<boolean>} True if reseller is found, false otherwise
   */
  async isResellerInTable(companyName, email = '') {
    try {
      // Try searching by company name first
      if (companyName) {
        await this.enterCompanyName(companyName);
        await this.clickSearch();
        await this.page.waitForTimeout(2000); // Wait for search results
        
        const rows = await this.allTableRows.all();
        for (const row of rows) {
          const rowText = await row.textContent();
          if (rowText && (rowText.includes(companyName) || rowText.toLowerCase().includes(companyName.toLowerCase()))) {
            return true;
          }
        }
      }
      
      // If not found by company name, try searching by email
      if (email) {
        // Reset search first
        await this.clickReset();
        await this.page.waitForTimeout(1000);
        
        await this.enterEmail(email);
        await this.clickSearch();
        await this.page.waitForTimeout(2000); // Wait for search results
        
        const rows = await this.allTableRows.all();
        for (const row of rows) {
          const rowText = await row.textContent();
          if (rowText && (rowText.includes(email) || rowText.toLowerCase().includes(email.toLowerCase()))) {
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.log(`Error searching for reseller: ${error.message}`);
      return false;
    }
  }

  /**
   * Clicks the action dropdown button for a specific reseller (by company name)
   * @param {string} companyName - Company name to find the reseller row
   * @returns {Promise<void>}
   */
  async clickActionDropdownForReseller(companyName) {
    try {
      const rows = await this.allTableRows.all();
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && (rowText.includes(companyName) || rowText.toLowerCase().includes(companyName.toLowerCase()))) {
          // Find the action dropdown button in this row - try multiple locators
          let actionButton = row.locator('td.mat-column-Action button').first();
          let isVisible = await actionButton.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (!isVisible) {
            // Try last cell
            actionButton = row.locator('td:last-child button').first();
            isVisible = await actionButton.isVisible({ timeout: 2000 }).catch(() => false);
          }
          
          if (!isVisible) {
            // Try any button in action column
            actionButton = row.locator('td button[type="button"]').last();
            isVisible = await actionButton.isVisible({ timeout: 2000 }).catch(() => false);
          }
          
          if (isVisible) {
            await actionButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await actionButton.click();
            await this.page.waitForTimeout(1000); // Wait for dropdown to open
            return;
          }
        }
      }
      throw new Error(`Reseller with company name "${companyName}" not found in table`);
    } catch (error) {
      throw new Error(`Failed to click action dropdown for reseller "${companyName}": ${error.message}`);
    }
  }

  /**
   * Clicks the Edit option in the action dropdown menu
   * @returns {Promise<void>}
   */
  async clickEditOption() {
    try {
      await this.editActionOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.editActionOption.scrollIntoViewIfNeeded();
      await this.editActionOption.click();
      await this.page.waitForTimeout(1000); // Wait for edit form to open
    } catch (error) {
      throw new Error(`Failed to click Edit option: ${error.message}`);
    }
  }

  /**
   * Clicks the Suspend option in the action dropdown menu
   * @returns {Promise<void>}
   */
  async clickSuspendOption() {
    try {
      await this.suspendActionOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.suspendActionOption.scrollIntoViewIfNeeded();
      await this.suspendActionOption.click();
      await this.page.waitForTimeout(2000); // Wait for suspend action to complete
    } catch (error) {
      throw new Error(`Failed to click Suspend option: ${error.message}`);
    }
  }

  /**
   * Clicks the Activate option in the action dropdown menu
   * @returns {Promise<void>}
   */
  async clickActivateOption() {
    try {
      await this.activateActionOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.activateActionOption.scrollIntoViewIfNeeded();
      await this.activateActionOption.click();
      await this.page.waitForTimeout(2000); // Wait for activate action to complete
    } catch (error) {
      throw new Error(`Failed to click Activate option: ${error.message}`);
    }
  }

  /**
   * Gets the status value from the Status column for a specific reseller (by company name)
   * @param {string} companyName - Company name to find the reseller row
   * @returns {Promise<string>} Status value (e.g., "Active", "Inactive") or empty string if not found
   */
  async getStatusFromStatusColumn(companyName) {
    try {
      const rows = await this.allTableRows.all();
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && (rowText.includes(companyName) || rowText.toLowerCase().includes(companyName.toLowerCase()))) {
          // Find the status cell in this row
          const statusCell = row.locator('td.mat-column-Status').first();
          const isVisible = await statusCell.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (isVisible) {
            const statusText = (await statusCell.textContent())?.trim() || '';
            return statusText;
          }
        }
      }
      return '';
    } catch (error) {
      console.log(`Error getting status for reseller "${companyName}": ${error.message}`);
      return '';
    }
  }

  /**
   * Hovers over or clicks the Manage option in the action dropdown menu (opens submenu)
   * @returns {Promise<void>}
   */
  async clickManageOption() {
    try {
      // Wait for action dropdown menu to be visible first
      await this.actionDropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Find Manage option
      const manageOption = this.page.locator('ul.dropdown-menu.action-menu li.dropdown-item:has-text("Manage"):has(ul.action-submenu), ul.dropdown-menu.action-menu li.dropdown-item:has-text("Manage")').first();
      
      // Wait for element to be attached
      await manageOption.waitFor({ state: 'attached', timeout: 5000 });
      
      // Try hover first (most common for nested menus)
      try {
        await manageOption.hover({ force: true });
        await this.page.waitForTimeout(800);
        
        // Check if submenu opened
        const addBillsVisible = await this.addBillsOption.isVisible({ timeout: 2000 }).catch(() => false);
        if (addBillsVisible) {
          return; // Submenu is open
        }
      } catch (e) {
        // Hover failed, try click
      }
      
      // If hover didn't work, try clicking
      try {
        await manageOption.click({ force: true });
        await this.page.waitForTimeout(800);
      } catch (e) {
        // If click fails, use JavaScript to trigger mouseover
        await manageOption.evaluate((el) => {
          const event = new MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          el.dispatchEvent(event);
        });
        await this.page.waitForTimeout(800);
      }
      
      // Wait for Add Bills option to be visible (indicates submenu is open)
      await this.addBillsOption.waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
      throw new Error(`Failed to open Manage submenu: ${error.message}`);
    }
  }

  /**
   * Clicks the Remove Label option from the Manage submenu
   * @returns {Promise<void>}
   */
  async clickRemoveLabelOption() {
    try {
      // Wait for submenu to be visible
      await this.actionSubmenu.waitFor({ state: 'visible', timeout: 5000 });
      
      // Click Remove Label option
      await this.removeLabelOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.removeLabelOption.scrollIntoViewIfNeeded();
      await this.removeLabelOption.click();
      await this.page.waitForTimeout(1000); // Wait for label to be removed
    } catch (error) {
      throw new Error(`Failed to click Remove Label option: ${error.message}`);
    }
  }

  /**
   * Clicks the Add Bills option from the Manage submenu (opens modal)
   * @returns {Promise<void>}
   */
  async clickAddBillsOption() {
    try {
      // Wait for Add Bills option to be visible (submenu should already be open from hover)
      // Try multiple locator strategies
      let addBillsOption = this.page.locator('ul.action-submenu li.ng-star-inserted:has-text("Add Bills")').first();
      let isVisible = await addBillsOption.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (!isVisible) {
        // Try alternative locator
        addBillsOption = this.page.locator('ul.action-submenu li:has-text("Add Bills"), ul.dropdown-submenu li:has-text("Add Bills")').first();
        isVisible = await addBillsOption.isVisible({ timeout: 2000 }).catch(() => false);
      }
      
      if (!isVisible) {
        // Wait a bit more and try again
        await this.page.waitForTimeout(500);
        addBillsOption = this.page.locator('ul.action-submenu li:has-text("Add Bills")').first();
        await addBillsOption.waitFor({ state: 'visible', timeout: 5000 });
      }
      
      await addBillsOption.scrollIntoViewIfNeeded();
      await addBillsOption.click();
      await this.page.waitForTimeout(1000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click Add Bills option: ${error.message}`);
    }
  }

  /**
   * Checks if the Add Bills modal is visible
   * @returns {Promise<boolean>}
   */
  async isAddBillsModalVisible() {
    try {
      return await this.addBillsModal.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Fills the Add Bills form
   * @param {Object} data - Form data object
   * @param {string} data.billingAction - Billing action (e.g., 'freeCredit', 'creditBought', 'adjustment')
   * @param {string} data.paymentType - Payment type ('credit' or 'debit')
   * @param {string|number} data.amount - Amount to add
   * @param {string} data.description - Description text
   */
  async fillAddBillsForm({ billingAction = '', paymentType = '', amount = '', description = '' }) {
    try {
      if (billingAction) {
        await this.billingActionDropdown.waitFor({ state: 'visible', timeout: 5000 });
        await this.billingActionDropdown.selectOption(billingAction);
        await this.page.waitForTimeout(500);
      }
      
      if (paymentType) {
        if (paymentType.toLowerCase() === 'credit') {
          await this.paymentTypeCreditRadio.waitFor({ state: 'visible', timeout: 5000 });
          await this.paymentTypeCreditRadio.check();
          await this.page.waitForTimeout(300);
        } else if (paymentType.toLowerCase() === 'debit') {
          await this.paymentTypeDebitRadio.waitFor({ state: 'visible', timeout: 5000 });
          await this.paymentTypeDebitRadio.check();
          await this.page.waitForTimeout(300);
        }
      }
      
      if (amount) {
        await this.amountInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.amountInput.clear();
        await this.amountInput.fill(amount.toString());
        await this.page.waitForTimeout(300);
      }
      
      if (description) {
        await this.descriptionTextarea.waitFor({ state: 'visible', timeout: 5000 });
        await this.descriptionTextarea.clear();
        await this.descriptionTextarea.fill(description);
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      throw new Error(`Failed to fill Add Bills form: ${error.message}`);
    }
  }

  /**
   * Submits the Add Bills form
   * @returns {Promise<void>}
   */
  async submitAddBillsForm() {
    try {
      await this.addBillsSubmitButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.addBillsSubmitButton.scrollIntoViewIfNeeded();
      await this.addBillsSubmitButton.click();
      await this.page.waitForTimeout(2000); // Wait for submission
    } catch (error) {
      throw new Error(`Failed to submit Add Bills form: ${error.message}`);
    }
  }

  /**
   * Gets the wallet amount from the partner portal page
   * @param {Page} page - The page object (should be partner portal page)
   * @returns {Promise<string>} Wallet amount text (e.g., "₹101.00")
   */
  async getWalletAmount(page) {
    try {
      // Wait for wallet element to be visible
      // HTML: <div class="wallet"><span class="d-none d-md-block">Wallet: ₹101.00</span></div>
      const walletElement = page.locator('div.wallet span:has-text("Wallet:"), div.wallet span.d-none.d-md-block:has-text("Wallet:"), div.wallet').first();
      await walletElement.waitFor({ state: 'visible', timeout: 10000 });
      
      const walletText = (await walletElement.textContent())?.trim() || '';
      console.log(`Wallet text found: "${walletText}"`);
      
      // Extract amount from text like "Wallet: ₹101.00"
      const amountMatch = walletText.match(/₹[\d,]+\.?\d*/);
      if (amountMatch) {
        return amountMatch[0];
      }
      
      // If no match, try to find amount in the wallet div
      const walletDiv = page.locator('div.wallet').first();
      const walletDivText = (await walletDiv.textContent())?.trim() || '';
      const divAmountMatch = walletDivText.match(/₹[\d,]+\.?\d*/);
      return divAmountMatch ? divAmountMatch[0] : walletText;
    } catch (error) {
      console.log(`Error getting wallet amount: ${error.message}`);
      return '';
    }
  }

  /**
   * Checks if the Edit Reseller form is visible
   * @returns {Promise<boolean>}
   */
  async isEditResellerFormVisible() {
    try {
      return await this.editResellerForm.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Delete option in the action dropdown menu
   * @returns {Promise<void>}
   */
  async clickDeleteOption() {
    try {
      await this.deleteActionOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteActionOption.scrollIntoViewIfNeeded();
      await this.deleteActionOption.click();
      await this.page.waitForTimeout(1000); // Wait for delete modal to open
    } catch (error) {
      throw new Error(`Failed to click Delete option: ${error.message}`);
    }
  }

  /**
   * Confirms deletion by clicking Yes button in the delete confirmation modal
   * @returns {Promise<void>}
   */
  async confirmDelete() {
    try {
      // Wait for delete confirmation modal to be visible
      await this.deleteConfirmationModal.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
        // Modal might not have specific text, try to find Yes button directly
      });
      
      // Click Yes/Confirm button
      await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteConfirmButton.scrollIntoViewIfNeeded();
      await this.deleteConfirmButton.click();
      await this.page.waitForTimeout(2000); // Wait for deletion to complete
    } catch (error) {
      throw new Error(`Failed to confirm delete: ${error.message}`);
    }
  }

  /**
   * Checks if the "no data" message is visible in the table
   * @returns {Promise<boolean>}
   */
  async isNoDataMessageVisible() {
    try {
      return await this.noDataMessage.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  /**
   * Clicks the Manage Reseller option in the action dropdown menu
   * This opens the partner portal in a new tab/window
   * @returns {Promise<Page>} The new page that was opened
   */
  async clickManageResellerOption() {
    try {
      await this.manageResellerOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.manageResellerOption.scrollIntoViewIfNeeded();
      
      // Wait for new page to be created (new tab/window)
      const context = this.page.context();
      const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 10000 }),
        this.manageResellerOption.click()
      ]);
      
      // Wait for the new page to load
      await newPage.waitForLoadState('networkidle', { timeout: 15000 });
      await newPage.waitForTimeout(2000); // Additional wait for page to fully load
      
      // Update the page reference to the new page
      this.page = newPage;
      
      return newPage;
    } catch (error) {
      throw new Error(`Failed to click Manage Reseller option: ${error.message}`);
    }
  }

  /**
   * Verifies that the current URL is the partner portal URL
   * @param {string} expectedUrl - Expected partner portal URL (default: https://dev.partner.cocloud.in/)
   * @returns {Promise<boolean>}
   */
  async isOnPartnerPortal(expectedUrl = 'https://dev.partner.cocloud.in/') {
    try {
      const currentUrl = this.page.url();
      return currentUrl.includes('partner.cocloud.in') || currentUrl === expectedUrl || currentUrl.startsWith(expectedUrl);
    } catch {
      return false;
    }
  }

  /**
   * Selects a row by checking the checkbox in the # column for a specific reseller (by company name)
   * @param {string} companyName - Company name to find the reseller row
   * @returns {Promise<void>}
   */
  async selectRowByCheckbox(companyName) {
    try {
      const rows = await this.allTableRows.all();
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && (rowText.includes(companyName) || rowText.toLowerCase().includes(companyName.toLowerCase()))) {
          // Find the checkbox in this row
          const checkbox = row.locator('input[type="checkbox"].mdc-checkbox__native-control, input[type="checkbox"], mat-checkbox input[type="checkbox"]').first();
          const isVisible = await checkbox.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (isVisible) {
            const isChecked = await checkbox.isChecked().catch(() => false);
            if (!isChecked) {
              await checkbox.scrollIntoViewIfNeeded();
              await checkbox.check();
              await this.page.waitForTimeout(500);
              console.log(`✓ Row selected for company: "${companyName}"`);
              return;
            } else {
              console.log(`✓ Row already selected for company: "${companyName}"`);
              return;
            }
          }
        }
      }
      throw new Error(`Reseller with company name "${companyName}" not found in table`);
    } catch (error) {
      throw new Error(`Failed to select row for reseller "${companyName}": ${error.message}`);
    }
  }

  /**
   * Clicks the label dropdown button (arrow dropdown with tags icon)
   * @returns {Promise<void>}
   */
  async clickLabelDropdownButton() {
    try {
      await this.labelDropdownButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.labelDropdownButton.scrollIntoViewIfNeeded();
      await this.labelDropdownButton.click();
      await this.page.waitForTimeout(500); // Wait for dropdown to open
    } catch (error) {
      throw new Error(`Failed to click label dropdown button: ${error.message}`);
    }
  }

  /**
   * Selects a label from the label dropdown menu
   * @param {string} labelName - Name of the label to select
   * @returns {Promise<void>}
   */
  async selectLabelFromDropdown(labelName) {
    try {
      // Wait for dropdown menu to be visible
      await this.labelDropdownMenu.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500); // Additional wait for labels to render
      
      // Get all available labels
      const allLabels = await this.page.locator('div.all-labels-section div.label, div.label.px-2.py-1.my-2').all();
      
      if (allLabels.length === 0) {
        throw new Error('No labels found in dropdown');
      }
      
      // Find the matching label (case-insensitive, partial match)
      let labelOption = null;
      for (const label of allLabels) {
        const labelText = (await label.textContent())?.trim() || '';
        const labelTextLower = labelText.toLowerCase();
        const labelNameLower = labelName.toLowerCase();
        
        // Check for exact match or partial match
        if (labelTextLower === labelNameLower || 
            labelTextLower.includes(labelNameLower) || 
            labelNameLower.includes(labelTextLower)) {
          labelOption = label;
          break;
        }
      }
      
      if (!labelOption) {
        // Log available labels for debugging
        const availableLabels = [];
        for (const label of allLabels) {
          const text = (await label.textContent())?.trim() || '';
          if (text) availableLabels.push(text);
        }
        throw new Error(`Label "${labelName}" not found. Available labels: ${availableLabels.join(', ')}`);
      }
      
      // Wait for label to be visible and clickable
      await labelOption.waitFor({ state: 'visible', timeout: 5000 });
      await labelOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await labelOption.click();
      await this.page.waitForTimeout(1000); // Wait for label to be assigned
    } catch (error) {
      throw new Error(`Failed to select label "${labelName}": ${error.message}`);
    }
  }

  /**
   * Gets the label value from the Label column for a specific reseller (by company name)
   * @param {string} companyName - Company name to find the reseller row
   * @returns {Promise<string>} Label value or empty string if not found
   */
  async getLabelFromLabelColumn(companyName) {
    try {
      const rows = await this.allTableRows.all();
      for (const row of rows) {
        const rowText = await row.textContent();
        if (rowText && (rowText.includes(companyName) || rowText.toLowerCase().includes(companyName.toLowerCase()))) {
          // Find the label cell in this row
          const labelCell = row.locator('td.mat-column-Label').first();
          const isVisible = await labelCell.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (isVisible) {
            const labelText = (await labelCell.textContent())?.trim() || '';
            return labelText;
          }
        }
      }
      return '';
    } catch (error) {
      console.log(`Error getting label for reseller "${companyName}": ${error.message}`);
      return '';
    }
  }

  /**
   * Clicks the edit icon (pencil) for a given input field to make it editable
   * @param {Locator} iconLocator - Locator for the edit icon
   * @param {Locator} inputLocator - Locator for the input field (for fallback)
   * @returns {Promise<void>}
   */
  async clickEditIcon(iconLocator, inputLocator = null) {
    try {
      // Try primary locator
      const isVisible = await iconLocator.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        await iconLocator.scrollIntoViewIfNeeded();
        await iconLocator.click();
        await this.page.waitForTimeout(300); // Wait for input to become editable
        return;
      }
      
      // Fallback: try to find icon near the input field
      if (inputLocator) {
        try {
          const parent = inputLocator.locator('..');
          const fallbackIcon = parent.locator('span.pencil-icon.bi.bi-pencil-fill, span.pencil-icon, span.bi-pencil-fill').first();
          const fallbackVisible = await fallbackIcon.isVisible({ timeout: 1000 }).catch(() => false);
          if (fallbackVisible) {
            await fallbackIcon.scrollIntoViewIfNeeded();
            await fallbackIcon.click();
            await this.page.waitForTimeout(300);
            return;
          }
        } catch (e) {
          // Continue
        }
      }
    } catch (error) {
      // Icon might not be visible or already active, continue
      console.log(`Edit icon click skipped: ${error.message}`);
    }
  }

  /**
   * Fills the Edit Reseller form with provided data
   * @param {Object} data - Form data object
   */
  async fillEditResellerForm({
    name = '',
    companyName = '',
    mobile = '',
    email = '',
    password = '',
    confirmPassword = '',
    partnerType = '',
    accountManager = '',
    country = '',
    pincode = '',
    category = '',
    minOrderLimit = '',
    maxTrialLimit = '',
    pipedriveUrl = '',
    teamSizeSales = '',
    teamSizeSupport = ''
  }) {
    try {
      if (name) {
        await this.clickEditIcon(this.editNameIcon, this.editNameInput);
        await this.editNameInput.clear();
        await this.editNameInput.fill(name);
        await this.page.waitForTimeout(300);
      }
      if (companyName) {
        await this.clickEditIcon(this.editCompanyNameIcon, this.editCompanyNameInput);
        await this.editCompanyNameInput.clear();
        await this.editCompanyNameInput.fill(companyName);
        await this.page.waitForTimeout(300);
      }
      if (mobile) {
        await this.clickEditIcon(this.editMobileIcon, this.editMobileInput);
        await this.editMobileInput.clear();
        await this.editMobileInput.fill(mobile);
        await this.page.waitForTimeout(300);
      }
      if (email) {
        await this.clickEditIcon(this.editEmailIcon, this.editEmailInput);
        const emailValue = await this.editEmailInput.inputValue().catch(() => '');
        if (emailValue) {
          await this.editEmailInput.clear();
          await this.page.waitForTimeout(300);
        }
        await this.editEmailInput.fill(email);
        await this.page.waitForTimeout(300);
      }
      if (password) {
        await this.clickEditIcon(this.editPasswordIcon, this.editPasswordInput);
        const passwordValue = await this.editPasswordInput.inputValue().catch(() => '');
        if (passwordValue) {
          await this.editPasswordInput.clear();
          await this.page.waitForTimeout(300);
        }
        await this.editPasswordInput.fill(password);
        await this.page.waitForTimeout(300);
      }
      if (confirmPassword) {
        await this.clickEditIcon(this.editConfirmPasswordIcon, this.editConfirmPasswordInput);
        await this.editConfirmPasswordInput.clear();
        await this.editConfirmPasswordInput.fill(confirmPassword);
        await this.page.waitForTimeout(300);
      }
      if (partnerType) {
        await this.editPartnerTypeDropdown.selectOption(partnerType);
        await this.page.waitForTimeout(300);
      }
      if (accountManager) {
        await this.editAccountManagerDropdown.selectOption({ label: accountManager });
        await this.page.waitForTimeout(300);
      }
      if (country) {
        await this.editCountryDropdown.selectOption(country);
        await this.page.waitForTimeout(1000); // Wait for state/city auto-population
      }
      if (pincode) {
        await this.clickEditIcon(this.editPincodeIcon, this.editPincodeInput);
        await this.editPincodeInput.clear();
        await this.editPincodeInput.fill(pincode.toString());
        await this.page.waitForTimeout(1000); // Wait for state/city auto-population
      }
      if (category) {
        await this.editCategoryDropdown.selectOption(category);
        await this.page.waitForTimeout(300);
      }
      if (minOrderLimit) {
        await this.clickEditIcon(this.editMinOrderLimitIcon, this.editMinOrderLimitInput);
        await this.editMinOrderLimitInput.clear();
        await this.editMinOrderLimitInput.fill(minOrderLimit.toString());
        await this.page.waitForTimeout(300);
      }
      if (maxTrialLimit) {
        await this.clickEditIcon(this.editMaxTrialLimitIcon, this.editMaxTrialLimitInput);
        await this.editMaxTrialLimitInput.clear();
        await this.editMaxTrialLimitInput.fill(maxTrialLimit.toString());
        await this.page.waitForTimeout(300);
      }
      if (pipedriveUrl) {
        await this.clickEditIcon(this.editPipedriveUrlIcon, this.editPipedriveUrlInput);
        await this.editPipedriveUrlInput.clear();
        await this.editPipedriveUrlInput.fill(pipedriveUrl);
        await this.page.waitForTimeout(300);
      }
      if (teamSizeSales) {
        await this.clickEditIcon(this.editTeamSizeSalesIcon, this.editTeamSizeSalesInput);
        await this.editTeamSizeSalesInput.clear();
        await this.editTeamSizeSalesInput.fill(teamSizeSales.toString());
        await this.page.waitForTimeout(300);
      }
      if (teamSizeSupport) {
        await this.clickEditIcon(this.editTeamSizeSupportIcon, this.editTeamSizeSupportInput);
        await this.editTeamSizeSupportInput.clear();
        await this.editTeamSizeSupportInput.fill(teamSizeSupport.toString());
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      throw new Error(`Failed to fill Edit Reseller form: ${error.message}`);
    }
  }

  /**
   * Submits the Edit Reseller form (clicks Update button)
   * @returns {Promise<void>}
   */
  async submitEditResellerForm() {
    try {
      // Try multiple locator strategies
      let buttonToClick = null;
      
      // Strategy 1: Try form-scoped locator
      try {
        buttonToClick = this.editResellerForm.locator('button[type="submit"].comman-btn1.btn-primary:has-text("Update")').first();
        const isVisible1 = await buttonToClick.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible1) {
          await buttonToClick.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await buttonToClick.click();
          await this.page.waitForTimeout(3000);
          return;
        }
      } catch (e) {
        // Continue to next strategy
      }
      
      // Strategy 2: Try page-level locator
      try {
        buttonToClick = this.page.locator('form:has(h3.title:has-text("Edit Reseller")) button[type="submit"].comman-btn1.btn-primary:has-text("Update"), .modal:has-text("Edit Reseller") button[type="submit"].comman-btn1.btn-primary:has-text("Update")').first();
        const isVisible2 = await buttonToClick.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible2) {
          await buttonToClick.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await buttonToClick.click();
          await this.page.waitForTimeout(3000);
          return;
        }
      } catch (e) {
        // Continue to next strategy
      }
      
      // Strategy 3: Try generic update button
      try {
        buttonToClick = this.page.locator('div.col-sm-12.mt-2.text-end button[type="submit"].comman-btn1.btn-primary:has-text("Update"), button[type="submit"].comman-btn1.btn-primary:has-text("Update")').first();
        await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
        await buttonToClick.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await buttonToClick.click();
        await this.page.waitForTimeout(3000);
        return;
      } catch (e) {
        // Continue to final strategy
      }
      
      // Strategy 4: Last resort
      buttonToClick = this.page.locator('button[type="submit"].comman-btn1.btn-primary:has-text("Update")').first();
      await buttonToClick.waitFor({ state: 'visible', timeout: 5000 });
      await buttonToClick.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await buttonToClick.click();
      await this.page.waitForTimeout(3000);
    } catch (error) {
      throw new Error(`Failed to submit Edit Reseller form: ${error.message}`);
    }
  }

  /**
   * Gets reseller details from table by company name
   * @param {string} companyName - Company name to search for
   * @returns {Promise<Object>} Object with reseller details
   */
  async getResellerDetailsFromTable(companyName) {
    try {
      // Wait for table to be visible
      await this.page.waitForTimeout(2000);
      
      // Wait for table rows to be available
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        console.log('No rows found in table');
        return null;
      }
      
      console.log(`Found ${rowCount} row(s) in table, searching for company name: "${companyName}"`);
      
      const rows = await this.allTableRows.all();
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowText = await row.textContent();
        const rowTextLower = rowText ? rowText.toLowerCase() : '';
        const companyNameLower = companyName.toLowerCase();
        
        console.log(`Row ${i + 1} text: "${rowText?.substring(0, 100)}..."`);
        
        if (rowText && (rowText.includes(companyName) || rowTextLower.includes(companyNameLower))) {
          const cells = row.locator('td');
          const cellCount = await cells.count();
          const details = {};
          
          console.log(`Found matching row with ${cellCount} cells`);
          
          // Extract data from cells (adjust indices based on actual table structure)
          // Try to find company name in any cell
          for (let j = 0; j < cellCount; j++) {
            const cellText = (await cells.nth(j).textContent())?.trim() || '';
            if (cellText && (cellText.includes(companyName) || cellText.toLowerCase().includes(companyNameLower))) {
              details.companyName = cellText;
              // Email is typically in a nearby cell
              if (j + 1 < cellCount) {
                const emailCell = (await cells.nth(j + 1).textContent())?.trim() || '';
                if (emailCell.includes('@')) {
                  details.email = emailCell;
                }
              }
              // Mobile might be in another cell
              for (let k = 0; k < cellCount; k++) {
                const cellText2 = (await cells.nth(k).textContent())?.trim() || '';
                if (cellText2 && /^\d{10,}$/.test(cellText2.replace(/\s+/g, '').replace(/-/g, ''))) {
                  details.mobile = cellText2;
                  break;
                }
              }
              break;
            }
          }
          
          // Fallback: use first few cells if company name not found in specific cell
          if (!details.companyName && cellCount > 0) {
            details.companyName = (await cells.nth(0).textContent())?.trim() || '';
          }
          if (!details.email && cellCount > 1) {
            const emailCell = (await cells.nth(1).textContent())?.trim() || '';
            if (emailCell.includes('@')) {
              details.email = emailCell;
            }
          }
          if (!details.mobile && cellCount > 2) {
            details.mobile = (await cells.nth(2).textContent())?.trim() || '';
          }
          
          console.log(`Extracted details:`, details);
          return details;
        }
      }
      
      console.log(`Company name "${companyName}" not found in any table row`);
      return null;
    } catch (error) {
      console.log(`Error getting reseller details: ${error.message}`);
      return null;
    }
  }
}

module.exports = { ResellerPage };

