class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/product" class="nav-link sidebar-items">
    this.productLink = page.locator('div.nav-link.sidebar-items[routerlink="/product"], div.nav-link.sidebar-items:has-text("Product"), a[routerlink="/product"], .sidebar-items:has-text("Product")').first();
    
    // Page elements
    // HTML: <p class="sub fs-5">All Product</p>
    this.pageTitle = page.locator('p.sub.fs-5:has-text("All Product"), p.sub.fs-5:has-text("Product"), h1:has-text("All Product"), h2:has-text("All Product"), *:has-text("All Product")').first();
    this.pageWrapper = page.locator('app-root, app-product, [class*="product"]').first();
    
    // Table locators
    this.productTable = page.locator('mat-table, table.table, table').first();
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th');
    
    // Record count text
    // HTML: "Showing 1 to 20 of 377 records"
    this.recordCountText = page.locator('*:has-text("Showing"), *:has-text("records")').first();
    
    // Add Product button
    // HTML: <button type="button" class="comman-btn1 btn-primary me-2">+ Product</button>
    this.addProductButton = page.locator('button.comman-btn1:has-text("+ Product"), button:has-text("+ Product"), button:has-text("Product"):has-text("+")').first();
    
    // Select Headers button
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), .btn:has-text("Select Headers")').first();
    
    // No data message (if exists)
    this.noDataMessage = page.locator('p.error-msg, *:has-text("No data"), *:has-text("No records"), *:has-text("No Data Found"), *:has-text("No data found")').first();
    
    // Table column locators for retrieving values
    this.nameCells = page.locator('td.mat-column-Name, td:has-text("Cloud")');
    this.noOfPlansCells = page.locator('td.mat-column-No-of-Plans, td.mat-column-NoOfPlans');
    this.noOfAddOnsCells = page.locator('td.mat-column-No-of-Add-Ons, td.mat-column-NoOfAddOns');
    this.statusCells = page.locator('td.mat-column-Status');
    
    // Action column delete icon locator
    // HTML: Delete icon (trash) in Action column
    this.deleteIcon = page.locator('td.mat-column-Action button:has([class*="bi-trash"]), td.mat-column-Action i[class*="bi-trash"], td.mat-column-Action i[class*="trash"], td.mat-column-Action button[title*="Delete"], td.mat-column-Action button[aria-label*="Delete"]').first();
    this.deleteIcons = page.locator('td.mat-column-Action button:has([class*="bi-trash"]), td.mat-column-Action i[class*="bi-trash"], td.mat-column-Action i[class*="trash"], td.mat-column-Action button[title*="Delete"], td.mat-column-Action button[aria-label*="Delete"]');
    
    // Delete Product Modal locators
    this.deleteProductModal = page.locator('div.modal:has-text("Delete"), .modal-dialog:has-text("Delete"), [role="dialog"]:has-text("Delete")').first();
    this.deleteProductModalTitle = page.locator('h1:has-text("Delete"), h2:has-text("Delete"), h3:has-text("Delete"), h4:has-text("Delete"), h5:has-text("Delete"), .modal-title:has-text("Delete"), *:has-text("Delete")').first();
    this.deleteProductModalYesButton = page.locator('button:has-text("Yes"), button.btn:has-text("Yes"), button.btn-primary:has-text("Yes")').first();
    this.deleteProductModalNoButton = page.locator('button:has-text("No"), button.btn:has-text("No"), button.btn-secondary:has-text("No")').first();
    
    // Add New Product Modal locators
    // HTML: <div class="modal-section p-4"> with <div class="modal-heading">Add New Product</div>
    this.addProductModal = page.locator('div.modal-section:has-text("Add New Product"), .modal-section').first();
    this.addProductModalTitle = page.locator('div.modal-heading:has-text("Add New Product"), .modal-heading').first();
    this.addProductModalSubmit = page.locator('button.search-btn:has-text("Submit"), button:has-text("Submit"), button[type="submit"]').first();
    this.addProductModalCancel = page.locator('button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Add New Product form field locators
    // HTML: <input id="name" placeholder="Enter Name">
    this.addProductFullNameField = page.locator('input#name[placeholder="Enter Name"], input#name').first();
    // HTML: <textarea id="description" placeholder="Description">
    this.addProductDescriptionField = page.locator('textarea#description[placeholder="Description"], textarea#description').first();
    
    // Required field error message
    this.requiredFieldError = page.locator('div.text-danger.mb-1 small:has-text("It is required field"), .text-danger:has-text("It is required field")').first();
    this.requiredFieldErrors = page.locator('div.text-danger.mb-1 small:has-text("It is required field"), .text-danger:has-text("It is required field")');
    
    // Product Details page locators (after adding product, navigates to details page)
    // HTML: <p class="heading mb-0">Product Details</p>
    this.productDetailsHeading = page.locator('p.heading:has-text("Product Details"), .heading:has-text("Product Details"), h1:has-text("Product Details"), h2:has-text("Product Details")').first();
    // HTML: <input id="name" placeholder="Enter name">
    this.productDetailsFullNameField = page.locator('input#name[placeholder="Enter name"], input#name').first();
    // HTML: <textarea id="description" placeholder="Description...">
    this.productDetailsDescriptionField = page.locator('textarea#description[placeholder="Description..."], textarea#description').first();
    // Update button on Product Details page (for product, not plan)
    // HTML: <button type="submit" class="comman-btn1 btn-primary text-light">Update</button>
    this.productDetailsUpdateButton = page.locator('button.comman-btn1.btn-primary:has-text("Update"), button:has-text("Update")[type="submit"]').first();
    
    // Add Plan button on Product Details page
    // HTML: <button type="button" class="comman-btn1 btn-primary">+ Plan</button>
    this.addPlanButton = page.locator('button.comman-btn1:has-text("+ Plan"), button:has-text("+ Plan")').first();
    
    // Add Plan Modal locators
    // HTML: <div class="modal-heading">Add Plan</div>
    this.addPlanModal = page.locator('div.modal-section:has-text("Add Plan"), .modal-section').first();
    this.addPlanModalTitle = page.locator('div.modal-heading:has-text("Add Plan"), .modal-heading:has-text("Add Plan")').first();
    // HTML: <button type="submit" class="btn search-btn">Submit</button>
    this.addPlanModalSubmit = page.locator('div.modal-section button.search-btn:has-text("Submit"), button.search-btn:has-text("Submit"), button[type="submit"]:has-text("Submit"), button:has-text("Submit")').first();
    this.addPlanModalCancel = page.locator('button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Add Plan form field locators - scoped to Add Plan modal
    // HTML: <input id="name" placeholder="Enter Plan Name">
    this.addPlanNameField = page.locator('div.modal-section:has-text("Add Plan") input#name[placeholder="Enter Plan Name"], div.modal-section input#name[placeholder="Enter Plan Name"], input#name[placeholder="Enter Plan Name"]').first();
    // HTML: <input id="code" placeholder="Enter Code">
    this.addPlanCodeField = page.locator('div.modal-section:has-text("Add Plan") input#code[placeholder="Enter Code"], div.modal-section input#code[placeholder="Enter Code"], input#code[placeholder="Enter Code"]').first();
    // HTML: <input id="price" placeholder="Enter Price">
    this.addPlanPriceField = page.locator('div.modal-section:has-text("Add Plan") input#price[placeholder="Enter Price"], div.modal-section input#price[placeholder="Enter Price"], input#price[placeholder="Enter Price"]').first();
    // HTML: <input id="description" placeholder="Description...">
    this.addPlanDescriptionField = page.locator('div.modal-section:has-text("Add Plan") input#description[placeholder="Description..."], div.modal-section input#description[placeholder="Description..."], input#description[placeholder="Description..."]').first();
    // HTML: <input id="billEvery" type="number" placeholder="0">
    this.addPlanBillEveryField = page.locator('div.modal-section:has-text("Add Plan") input#billEvery[placeholder="0"], div.modal-section input#billEvery[placeholder="0"], input#billEvery[placeholder="0"], input#billEvery[type="number"]').first();
    // HTML: <select id="unit">
    this.addPlanUnitDropdown = page.locator('div.modal-section:has-text("Add Plan") select#unit, div.modal-section select#unit, select#unit').first();
    // HTML: <select id="billingCycle">
    this.addPlanBillingCycleDropdown = page.locator('div.modal-section:has-text("Add Plan") select#billingCycle, div.modal-section select#billingCycle, select#billingCycle').first();
    // HTML: <input id="isShow" type="checkbox">
    this.addPlanShowToAllPartnersCheckbox = page.locator('div.modal-section:has-text("Add Plan") input#isShow[type="checkbox"], div.modal-section input#isShow[type="checkbox"], input#isShow[type="checkbox"]').first();
    
    // Add Add-on button on Product Details page
    // HTML: <button type="button" class="comman-btn1 btn-primary">+ Add-on</button>
    this.addAddonButton = page.locator('button.comman-btn1:has-text("+ Add-on"), button:has-text("+ Add-on"), button:has-text("Add-on"):has-text("+")').first();
    
    // Add Addon Modal locators
    // HTML: <div class="modal-heading">Add Addon</div>
    this.addAddonModal = page.locator('div.modal-section:has-text("Add Addon"), .modal-section').first();
    this.addAddonModalTitle = page.locator('div.modal-heading:has-text("Add Addon"), .modal-heading:has-text("Add Addon")').first();
    this.addAddonModalSubmit = page.locator('div.modal-section:has-text("Add Addon") button.search-btn:has-text("Submit"), button.search-btn:has-text("Submit"), button[type="submit"]:has-text("Submit")').first();
    this.addAddonModalCancel = page.locator('div.modal-section:has-text("Add Addon") button.reset-btn:has-text("Cancel"), button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Add Addon form field locators - scoped to Add Addon modal
    // HTML: <input id="name" placeholder="Enter Add-on Name">
    this.addAddonNameField = page.locator('div.modal-section:has-text("Add Addon") input#name[placeholder="Enter Add-on Name"], div.modal-section input#name[placeholder="Enter Add-on Name"], input#name[placeholder="Enter Add-on Name"]').first();
    // HTML: <input id="code" placeholder="Enter Add-on Code">
    this.addAddonCodeField = page.locator('div.modal-section:has-text("Add Addon") input#code[placeholder="Enter Add-on Code"], div.modal-section input#code[placeholder="Enter Add-on Code"], input#code[placeholder="Enter Add-on Code"]').first();
    // HTML: <input id="description" placeholder="Description...">
    this.addAddonDescriptionField = page.locator('div.modal-section:has-text("Add Addon") input#description[placeholder="Description..."], div.modal-section input#description[placeholder="Description..."], input#description[placeholder="Description..."]').first();
    // HTML: <input id="price" placeholder="Enter Price">
    this.addAddonPriceField = page.locator('div.modal-section:has-text("Add Addon") input#price[placeholder="Enter Price"], div.modal-section input#price[placeholder="Enter Price"], input#price[placeholder="Enter Price"]').first();
    // HTML: <input id="pricingEvery" type="number" placeholder="Pricing Interval">
    this.addAddonPriceIntervalField = page.locator('div.modal-section:has-text("Add Addon") input#pricingEvery[placeholder="Pricing Interval"], div.modal-section input#pricingEvery, input#pricingEvery[placeholder="Pricing Interval"], input#pricingEvery[type="number"]').first();
    // HTML: <select id="unit">
    this.addAddonUnitDropdown = page.locator('div.modal-section:has-text("Add Addon") select#unit, div.modal-section select#unit, select#unit').first();
    // HTML: <select id="pricingInterval">
    this.addAddonPricingEveryDropdown = page.locator('div.modal-section:has-text("Add Addon") select#pricingInterval, div.modal-section select#pricingInterval, select#pricingInterval').first();
    // HTML: Radio buttons for Add-on Type
    // <input type="radio" id="type_oneTime">
    this.addAddonTypeOneTimeRadio = page.locator('div.modal-section:has-text("Add Addon") input#type_oneTime[type="radio"], input#type_oneTime[type="radio"]').first();
    // <input type="radio" id="type_recurring">
    this.addAddonTypeRecurringRadio = page.locator('div.modal-section:has-text("Add Addon") input#type_recurring[type="radio"], input#type_recurring[type="radio"]').first();
    
    // Add-on section and table on Product Details page
    // Find all tables and use the second one (first is Plan table, second is Add-on table)
    this.addonTable = page.locator('table.mat-mdc-table').nth(1);
    this.addonTableRows = page.locator('table.mat-mdc-table').nth(1).locator('mat-row, tbody tr');
    this.addonTableNameCells = page.locator('table.mat-mdc-table').nth(1).locator('td.mat-column-Name');
    
    // Add-on table action column edit and delete icons
    // HTML: <i class="bi bi-pencil-fill text-primary editCursor">
    this.addonEditIcon = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has(i[class*="pencil"])').first();
    this.addonEditIcons = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"]');
    // HTML: <i class="bi bi-trash3-fill text-danger editCursor">
    this.addonDeleteIcon = page.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"], td.mat-column-Action button:has(i[class*="trash"])').first();
    this.addonDeleteIcons = page.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"]');
    
    // Update Addon Modal locators
    // HTML: <div class="modal-heading">Update Addon</div>
    this.updateAddonModal = page.locator('div.modal-section:has-text("Update Addon"), .modal-section').first();
    this.updateAddonModalTitle = page.locator('div.modal-heading:has-text("Update Addon"), .modal-heading:has-text("Update Addon")').first();
    this.updateAddonModalSubmit = page.locator('div.modal-section:has-text("Update Addon") button.search-btn:has-text("Submit"), button.search-btn:has-text("Submit"), button[type="submit"]:has-text("Submit")').first();
    this.updateAddonModalCancel = page.locator('div.modal-section:has-text("Update Addon") button.reset-btn:has-text("Cancel"), button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Update Addon form field locators - scoped to Update Addon modal
    this.updateAddonNameField = page.locator('div.modal-section:has-text("Update Addon") input#name[placeholder="Enter Add-on Name"], div.modal-section:has-text("Update Addon") input#name, input#name[placeholder="Enter Add-on Name"]').first();
    this.updateAddonCodeField = page.locator('div.modal-section:has-text("Update Addon") input#code[placeholder="Enter Add-on Code"], div.modal-section:has-text("Update Addon") input#code, input#code[placeholder="Enter Add-on Code"]').first();
    this.updateAddonDescriptionField = page.locator('div.modal-section:has-text("Update Addon") input#description[placeholder="Description..."], div.modal-section:has-text("Update Addon") input#description, input#description[placeholder="Description..."]').first();
    this.updateAddonPriceField = page.locator('div.modal-section:has-text("Update Addon") input#price[placeholder="Enter Price"], div.modal-section:has-text("Update Addon") input#price, input#price[placeholder="Enter Price"]').first();
    this.updateAddonPriceIntervalField = page.locator('div.modal-section:has-text("Update Addon") input#pricingEvery[placeholder="Pricing Interval"], div.modal-section:has-text("Update Addon") input#pricingEvery, input#pricingEvery[placeholder="Pricing Interval"], input#pricingEvery[type="number"]').first();
    this.updateAddonUnitDropdown = page.locator('div.modal-section:has-text("Update Addon") select#unit, div.modal-section:has-text("Update Addon") select#unit, select#unit').first();
    this.updateAddonPricingEveryDropdown = page.locator('div.modal-section:has-text("Update Addon") select#pricingInterval, div.modal-section:has-text("Update Addon") select#pricingInterval, select#pricingInterval').first();
    // Radio buttons for Add-on Type in Update Addon modal
    this.updateAddonTypeOneTimeRadio = page.locator('div.modal-section:has-text("Update Addon") input#type_oneTime[type="radio"], input#type_oneTime[type="radio"]').first();
    this.updateAddonTypeRecurringRadio = page.locator('div.modal-section:has-text("Update Addon") input#type_recurring[type="radio"], input#type_recurring[type="radio"]').first();
    
    // Delete Addon Modal locators
    this.deleteAddonModal = page.locator('div.modal:has-text("Delete"), .modal-dialog:has-text("Delete"), [role="dialog"]:has-text("Delete")').first();
    this.deleteAddonModalTitle = page.locator('h1:has-text("Delete"), h2:has-text("Delete"), h3:has-text("Delete"), .modal-title:has-text("Delete"), *:has-text("Delete")').first();
    this.deleteAddonModalYesButton = page.locator('button:has-text("Yes"), button.btn:has-text("Yes"), button.btn-primary:has-text("Yes")').first();
    this.deleteAddonModalNoButton = page.locator('button:has-text("No"), button.btn:has-text("No"), button.btn-secondary:has-text("No")').first();
    
    // Plan table on Product Details page
    this.planTable = page.locator('table.mat-mdc-table, table').first();
    this.planTableRows = page.locator('table.mat-mdc-table mat-row, table tbody tr');
    this.planTableNameCells = page.locator('td.mat-column-Name');
    this.planTableCodeCells = page.locator('td.mat-column-Code');
    this.planTableUnitCells = page.locator('td.mat-column-Unit');
    this.planTablePriceCells = page.locator('td.mat-column-Price');
    
    // Plan table action column edit and delete icons
    // HTML: <i class="bi bi-pencil-fill text-primary editCursor">
    this.planEditIcon = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"], td.mat-column-Action button:has(i[class*="pencil"])').first();
    this.planEditIcons = page.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"]');
    // HTML: <i class="bi bi-trash3-fill text-danger editCursor">
    this.planDeleteIcon = page.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"], td.mat-column-Action button:has(i[class*="trash"])').first();
    this.planDeleteIcons = page.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"]');
    
    // Update Plan Modal locators
    // HTML: <div class="modal-heading">Update Plan</div>
    this.updatePlanModal = page.locator('div.modal-section:has-text("Update Plan"), .modal-section').first();
    this.updatePlanModalTitle = page.locator('div.modal-heading:has-text("Update Plan"), .modal-heading:has-text("Update Plan")').first();
    this.updatePlanModalSubmit = page.locator('div.modal-section:has-text("Update Plan") button.search-btn:has-text("Submit"), button.search-btn:has-text("Submit"), button[type="submit"]:has-text("Submit")').first();
    this.updatePlanModalCancel = page.locator('div.modal-section:has-text("Update Plan") button.reset-btn:has-text("Cancel"), button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Update Plan form field locators - scoped to Update Plan modal
    this.updatePlanNameField = page.locator('div.modal-section:has-text("Update Plan") input#name[placeholder="Enter Plan Name"], div.modal-section:has-text("Update Plan") input#name, input#name[placeholder="Enter Plan Name"]').first();
    this.updatePlanCodeField = page.locator('div.modal-section:has-text("Update Plan") input#code[placeholder="Enter Code"], div.modal-section:has-text("Update Plan") input#code, input#code[placeholder="Enter Code"]').first();
    this.updatePlanPriceField = page.locator('div.modal-section:has-text("Update Plan") input#price[placeholder="Enter Price"], div.modal-section:has-text("Update Plan") input#price, input#price[placeholder="Enter Price"]').first();
    this.updatePlanDescriptionField = page.locator('div.modal-section:has-text("Update Plan") input#description[placeholder="Description..."], div.modal-section:has-text("Update Plan") input#description, input#description[placeholder="Description..."]').first();
    this.updatePlanBillEveryField = page.locator('div.modal-section:has-text("Update Plan") input#billEvery[placeholder="0"], div.modal-section:has-text("Update Plan") input#billEvery, input#billEvery[placeholder="0"], input#billEvery[type="number"]').first();
    this.updatePlanUnitDropdown = page.locator('div.modal-section:has-text("Update Plan") select#unit, div.modal-section:has-text("Update Plan") select#unit, select#unit').first();
    this.updatePlanBillingCycleDropdown = page.locator('div.modal-section:has-text("Update Plan") select#billingCycle, div.modal-section:has-text("Update Plan") select#billingCycle, select#billingCycle').first();
    
    // Delete Plan Modal locators
    this.deletePlanModal = page.locator('div.modal:has-text("Delete"), .modal-dialog:has-text("Delete"), [role="dialog"]:has-text("Delete")').first();
    this.deletePlanModalTitle = page.locator('h1:has-text("Delete"), h2:has-text("Delete"), h3:has-text("Delete"), .modal-title:has-text("Delete"), *:has-text("Delete")').first();
    this.deletePlanModalYesButton = page.locator('button:has-text("Yes"), button.btn:has-text("Yes"), button.btn-primary:has-text("Yes")').first();
    this.deletePlanModalNoButton = page.locator('button:has-text("No"), button.btn:has-text("No"), button.btn-secondary:has-text("No")').first();
  }

  /**
   * Navigates to the Product page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoProduct(baseUrl) {
    // Navigate to product page
    await this.productLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.productLink.scrollIntoViewIfNeeded();
    await this.productLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Wait for product page to load
    await this.productTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Product page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnProductPage = url.includes('/product');
      const isTitleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnProductPage && isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Product table is visible with data
   * @returns {Promise<{visible: boolean, hasData: boolean, rowCount: number}>}
   */
  async verifyTableWithData() {
    try {
      const isTableVisible = await this.productTable.isVisible({ timeout: 5000 }).catch(() => false);
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      
      return {
        visible: isTableVisible,
        hasData: hasData,
        rowCount: rowCount
      };
    } catch {
      return {
        visible: false,
        hasData: false,
        rowCount: 0
      };
    }
  }

  /**
   * Verifies table has data or shows empty message
   * @returns {Promise<{hasData: boolean, rowCount: number, messageVisible: boolean}>}
   */
  async verifyTableDataOrEmpty() {
    try {
      const rowCount = await this.allTableRows.count();
      const hasData = rowCount > 0;
      const messageVisible = await this.noDataMessage.isVisible({ timeout: 2000 }).catch(() => false);
      
      return {
        hasData: hasData,
        rowCount: rowCount,
        messageVisible: messageVisible
      };
    } catch {
      return {
        hasData: false,
        rowCount: 0,
        messageVisible: false
      };
    }
  }

  // ==================== ADD NEW PRODUCT MODAL METHODS ====================

  /**
   * Clicks the Add Product button to open Add New Product modal
   */
  async clickAddProductButton() {
    try {
      await this.addProductButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addProductButton.scrollIntoViewIfNeeded();
      await this.addProductButton.click();
      
      // Wait for modal to appear
      await this.addProductModalTitle.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
        // If title doesn't appear, wait a bit more
        return this.page.waitForTimeout(2000);
      });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Add Product button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add New Product modal is open
   * @returns {Promise<boolean>}
   */
  async isAddProductModalOpen() {
    try {
      // Check for modal section first
      const isModalVisible = await this.addProductModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (!isModalVisible) {
        // Try checking for title directly
        const isTitleVisible = await this.addProductModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
        return isTitleVisible;
      }
      
      // Verify title is visible
      const isTitleVisible = await this.addProductModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      return isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Fills the Full Name field
   * @param {string} value - The full name value
   */
  async fillFullName(value) {
    try {
      await this.addProductFullNameField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addProductFullNameField.scrollIntoViewIfNeeded();
      await this.addProductFullNameField.clear();
      await this.addProductFullNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Full Name: ${error.message}`);
    }
  }

  /**
   * Fills the Description field
   * @param {string} value - The description value
   */
  async fillDescription(value) {
    try {
      await this.addProductDescriptionField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addProductDescriptionField.scrollIntoViewIfNeeded();
      await this.addProductDescriptionField.clear();
      await this.addProductDescriptionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Description: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in the Add New Product modal
   */
  async submitAddProductForm() {
    try {
      await this.addProductModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.addProductModalSubmit.scrollIntoViewIfNeeded();
      await this.addProductModalSubmit.click();
      await this.page.waitForTimeout(3000); // Wait for form submission and modal to close
    } catch (error) {
      throw new Error(`Failed to submit Add Product form: ${error.message}`);
    }
  }

  /**
   * Checks if required field error is visible
   * @returns {Promise<boolean>}
   */
  async isRequiredFieldErrorVisible() {
    try {
      const errorCount = await this.requiredFieldErrors.count();
      if (errorCount > 0) {
        const firstError = this.requiredFieldErrors.first();
        return await firstError.isVisible({ timeout: 2000 }).catch(() => false);
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets all validation error messages
   * @returns {Promise<string[]>}
   */
  async getAllValidationErrors() {
    try {
      const errorCount = await this.requiredFieldErrors.count();
      const errors = [];
      for (let i = 0; i < errorCount; i++) {
        const error = this.requiredFieldErrors.nth(i);
        const isVisible = await error.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          const text = await error.textContent().catch(() => '');
          if (text && text.trim()) {
            errors.push(text.trim());
          }
        }
      }
      return errors;
    } catch {
      return [];
    }
  }

  /**
   * Gets the Name from table (first row)
   * @returns {Promise<string>}
   */
  async getNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const nameCell = firstRow.locator('td.mat-column-Name').first();
        const text = await nameCell.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  /**
   * Verifies if a product with the given name exists in the table
   * @param {string} productName - The product name to search for
   * @returns {Promise<boolean>}
   */
  async verifyProductInTable(productName) {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        return false;
      }

      // Check all rows for the product name
      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(productName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Closes the Add New Product modal
   */
  async closeAddProductModal() {
    try {
      const cancelButton = this.addProductModalCancel;
      const isCancelVisible = await cancelButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isCancelVisible) {
        await cancelButton.click();
        await this.page.waitForTimeout(500);
      } else {
        // Try close button or Escape key
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      // If closing fails, try pressing Escape as fallback
      try {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      } catch {
        // Ignore errors
      }
    }
  }

  // ==================== PRODUCT DETAILS PAGE METHODS ====================

  /**
   * Verifies if the Product Details page is loaded
   * @returns {Promise<boolean>}
   */
  async isProductDetailsPageLoaded() {
    try {
      const isHeadingVisible = await this.productDetailsHeading.isVisible({ timeout: 5000 }).catch(() => false);
      return isHeadingVisible;
    } catch {
      return false;
    }
  }

  /**
   * Gets the Full Name value from Product Details page
   * @returns {Promise<string>}
   */
  async getProductDetailsFullName() {
    try {
      await this.productDetailsFullNameField.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.productDetailsFullNameField.inputValue().catch(() => '');
      return value || '';
    } catch {
      return '';
    }
  }

  /**
   * Gets the Description value from Product Details page
   * @returns {Promise<string>}
   */
  async getProductDetailsDescription() {
    try {
      await this.productDetailsDescriptionField.waitFor({ state: 'visible', timeout: 5000 });
      const value = await this.productDetailsDescriptionField.inputValue().catch(() => '');
      return value || '';
    } catch {
      return '';
    }
  }

  /**
   * Edits the Full Name field on Product Details page
   * @param {string} value - The new full name value
   */
  async editProductDetailsFullName(value) {
    try {
      await this.productDetailsFullNameField.waitFor({ state: 'visible', timeout: 5000 });
      await this.productDetailsFullNameField.scrollIntoViewIfNeeded();
      await this.productDetailsFullNameField.clear();
      await this.productDetailsFullNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Full Name: ${error.message}`);
    }
  }

  /**
   * Edits the Description field on Product Details page
   * @param {string} value - The new description value
   */
  async editProductDetailsDescription(value) {
    try {
      await this.productDetailsDescriptionField.waitFor({ state: 'visible', timeout: 5000 });
      await this.productDetailsDescriptionField.scrollIntoViewIfNeeded();
      await this.productDetailsDescriptionField.clear();
      await this.productDetailsDescriptionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Description: ${error.message}`);
    }
  }

  /**
   * Clicks the Update button on Product Details page
   */
  async clickProductDetailsUpdateButton() {
    try {
      await this.productDetailsUpdateButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.productDetailsUpdateButton.scrollIntoViewIfNeeded();
      await this.productDetailsUpdateButton.click();
      await this.page.waitForTimeout(3000); // Wait for navigation back to product list
    } catch (error) {
      throw new Error(`Failed to click Update button: ${error.message}`);
    }
  }

  // ==================== DELETE PRODUCT METHODS ====================

  /**
   * Clicks on the delete icon in the Action column of the first row
   */
  async clickDeleteIcon() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        throw new Error('No rows available in table');
      }
      
      const firstRow = this.allTableRows.first();
      const deleteIconInRow = firstRow.locator('td.mat-column-Action button:has([class*="bi-trash"]), td.mat-column-Action i[class*="bi-trash"], td.mat-column-Action i[class*="trash"], td.mat-column-Action button[title*="Delete"], td.mat-column-Action button[aria-label*="Delete"]').first();
      
      await deleteIconInRow.waitFor({ state: 'visible', timeout: 5000 });
      await deleteIconInRow.scrollIntoViewIfNeeded();
      await deleteIconInRow.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click delete icon: ${error.message}`);
    }
  }

  /**
   * Clicks on the delete icon for a specific product by name
   * @param {string} productName - The product name to delete
   */
  async clickDeleteIconForProduct(productName) {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        throw new Error('No rows available in table');
      }

      // Find the row with the matching product name
      let found = false;
      for (let i = 0; i < rowCount; i++) {
        const row = this.allTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        
        if (cellText && cellText.trim().toLowerCase().includes(productName.toLowerCase())) {
          // Found the row, click delete icon in this row
          const deleteIconInRow = row.locator('td.mat-column-Action button:has([class*="bi-trash"]), td.mat-column-Action i[class*="bi-trash"], td.mat-column-Action i[class*="trash"], td.mat-column-Action button[title*="Delete"], td.mat-column-Action button[aria-label*="Delete"]').first();
          
          await deleteIconInRow.waitFor({ state: 'visible', timeout: 5000 });
          await deleteIconInRow.scrollIntoViewIfNeeded();
          await deleteIconInRow.click();
          await this.page.waitForTimeout(1000);
          found = true;
          break;
        }
      }

      if (!found) {
        throw new Error(`Product "${productName}" not found in table`);
      }
    } catch (error) {
      throw new Error(`Failed to click delete icon for product: ${error.message}`);
    }
  }

  /**
   * Verifies if the Delete Product modal is open
   * @returns {Promise<boolean>}
   */
  async isDeleteProductModalOpen() {
    try {
      const isModalVisible = await this.deleteProductModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      const isTitleVisible = await this.deleteProductModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
      return isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Clicks Yes button in Delete Product modal to confirm deletion
   */
  async confirmDeleteProduct() {
    try {
      await this.deleteProductModalYesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteProductModalYesButton.scrollIntoViewIfNeeded();
      await this.deleteProductModalYesButton.click();
      await this.page.waitForTimeout(2000); // Wait for deletion to complete
    } catch (error) {
      throw new Error(`Failed to confirm delete: ${error.message}`);
    }
  }

  // ==================== ADD PLAN METHODS ====================

  /**
   * Clicks the Add Plan button on Product Details page
   */
  async clickAddPlanButton() {
    try {
      await this.addPlanButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addPlanButton.scrollIntoViewIfNeeded();
      await this.addPlanButton.click();
      
      // Wait for modal to appear
      await this.addPlanModalTitle.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
        return this.page.waitForTimeout(2000);
      });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Add Plan button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add Plan modal is open
   * @returns {Promise<boolean>}
   */
  async isAddPlanModalOpen() {
    try {
      // Check if modal section is visible
      const isModalVisible = await this.addPlanModal.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      // Check if modal title is visible
      const isTitleVisible = await this.addPlanModalTitle.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isTitleVisible) {
        return false;
      }
      
      // Also check if submit button is visible (to ensure modal is fully loaded)
      const isSubmitVisible = await this.addPlanModalSubmit.isVisible({ timeout: 1000 }).catch(() => false);
      return isSubmitVisible;
    } catch {
      return false;
    }
  }

  /**
   * Fills the Plan Name field
   * @param {string} value - The plan name value
   */
  async fillPlanName(value) {
    try {
      await this.addPlanNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addPlanNameField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Clear the field
      await this.addPlanNameField.clear();
      await this.page.waitForTimeout(200);
      
      // Fill the field
      await this.addPlanNameField.fill(value);
      await this.page.waitForTimeout(300);
      
      // Verify the value was filled
      const filledValue = await this.addPlanNameField.inputValue().catch(() => '');
      if (filledValue !== value) {
        // Try filling again
        await this.addPlanNameField.clear();
        await this.addPlanNameField.fill(value);
        await this.page.waitForTimeout(300);
        const retryValue = await this.addPlanNameField.inputValue().catch(() => '');
        if (retryValue !== value) {
          throw new Error(`Plan Name field value mismatch. Expected: "${value}", Got: "${retryValue}"`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to fill Plan Name: ${error.message}`);
    }
  }

  /**
   * Fills the Plan Code field
   * @param {string} value - The plan code value
   */
  async fillPlanCode(value) {
    try {
      await this.addPlanCodeField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanCodeField.scrollIntoViewIfNeeded();
      await this.addPlanCodeField.clear();
      await this.addPlanCodeField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Plan Code: ${error.message}`);
    }
  }

  /**
   * Fills the Price field
   * @param {string} value - The price value
   */
  async fillPlanPrice(value) {
    try {
      await this.addPlanPriceField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanPriceField.scrollIntoViewIfNeeded();
      await this.addPlanPriceField.clear();
      await this.addPlanPriceField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Price: ${error.message}`);
    }
  }

  /**
   * Fills the Plan Description field
   * @param {string} value - The description value
   */
  async fillPlanDescription(value) {
    try {
      await this.addPlanDescriptionField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanDescriptionField.scrollIntoViewIfNeeded();
      await this.addPlanDescriptionField.clear();
      await this.addPlanDescriptionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Plan Description: ${error.message}`);
    }
  }

  /**
   * Fills the Bill Every field
   * @param {string} value - The bill every value
   */
  async fillPlanBillEvery(value) {
    try {
      await this.addPlanBillEveryField.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanBillEveryField.scrollIntoViewIfNeeded();
      await this.addPlanBillEveryField.clear();
      await this.addPlanBillEveryField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Bill Every: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Unit dropdown
   * @param {string} value - The unit value to select (e.g., "GB", "MB", "Nos")
   */
  async selectPlanUnit(value) {
    try {
      await this.addPlanUnitDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanUnitDropdown.scrollIntoViewIfNeeded();
      await this.addPlanUnitDropdown.selectOption({ label: value }).catch(async () => {
        await this.addPlanUnitDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Unit: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Billing Cycle dropdown
   * @param {string} value - The billing cycle value to select (e.g., "Week(s)", "Month(s)", "Year(s)")
   */
  async selectPlanBillingCycle(value) {
    try {
      await this.addPlanBillingCycleDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanBillingCycleDropdown.scrollIntoViewIfNeeded();
      await this.addPlanBillingCycleDropdown.selectOption({ label: value }).catch(async () => {
        await this.addPlanBillingCycleDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Billing Cycle: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in Add Plan modal (without waiting for submission)
   */
  async clickAddPlanSubmitButton() {
    try {
      // Wait for button to be visible
      await this.addPlanModalSubmit.waitFor({ state: 'visible', timeout: 10000 });
      await this.addPlanModalSubmit.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Use JavaScript click to avoid hanging on form submission
      // This is safer when we expect validation errors
      await this.addPlanModalSubmit.evaluate(el => {
        if (el && typeof el.click === 'function') {
          el.click();
        }
      });
      
      await this.page.waitForTimeout(500); // Short wait for click to register
    } catch (error) {
      // If JavaScript click fails, try regular click
      try {
        await this.addPlanModalSubmit.click({ timeout: 3000 });
        await this.page.waitForTimeout(500);
      } catch (clickError) {
        console.log(`  ⚠ Click attempt: ${error.message}`);
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Submits the Add Plan form
   */
  async submitAddPlanForm() {
    try {
      await this.addPlanModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.addPlanModalSubmit.scrollIntoViewIfNeeded();
      
      // Check if button is enabled before clicking
      const isEnabled = await this.addPlanModalSubmit.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      
      // Use regular click (not JavaScript) for form submission
      await this.addPlanModalSubmit.click({ timeout: 5000 });
      
      // Wait for modal to close - check if modal disappears
      let modalClosed = false;
      for (let i = 0; i < 30; i++) {
        await this.page.waitForTimeout(500);
        const isModalOpen = await this.isAddPlanModalOpen();
        if (!isModalOpen) {
          modalClosed = true;
          break;
        }
      }
      
      if (!modalClosed) {
        // Modal might still be visible, wait a bit more
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to submit Add Plan form: ${error.message}`);
    }
  }

  /**
   * Verifies if a plan with the given name exists in the plan table
   * @param {string} planName - The plan name to search for
   * @returns {Promise<boolean>}
   */
  async verifyPlanInTable(planName) {
    try {
      const rowCount = await this.planTableRows.count();
      if (rowCount === 0) {
        return false;
      }

      // Check all rows for the plan name
      for (let i = 0; i < rowCount; i++) {
        const row = this.planTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(planName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets the plan name from the plan table (first row)
   * @returns {Promise<string>}
   */
  async getPlanNameFromTable() {
    try {
      const count = await this.planTableRows.count();
      if (count > 0) {
        const firstRow = this.planTableRows.first();
        const nameCell = firstRow.locator('td.mat-column-Name').first();
        const text = await nameCell.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  // ==================== ADD ADD-ON METHODS ====================

  /**
   * Clicks the Add Add-on button on Product Details page
   */
  async clickAddAddonButton() {
    try {
      await this.addAddonButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonButton.scrollIntoViewIfNeeded();
      await this.addAddonButton.click();
      
      // Wait for modal to appear
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Add Add-on button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add Addon modal is open
   * @returns {Promise<boolean>}
   */
  async isAddAddonModalOpen() {
    try {
      const isModalVisible = await this.addAddonModal.isVisible({ timeout: 2000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      const isTitleVisible = await this.addAddonModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
      if (!isTitleVisible) {
        return false;
      }
      
      const isSubmitVisible = await this.addAddonModalSubmit.isVisible({ timeout: 2000 }).catch(() => false);
      return isSubmitVisible;
    } catch {
      return false;
    }
  }

  /**
   * Fills the Add-on Name field in Add Addon modal
   * @param {string} value - The add-on name value
   */
  async fillAddonName(value) {
    try {
      await this.addAddonNameField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonNameField.scrollIntoViewIfNeeded();
      await this.addAddonNameField.clear();
      await this.addAddonNameField.fill(value);
      await this.page.waitForTimeout(300);
      const filledValue = await this.addAddonNameField.inputValue();
      if (filledValue !== value) {
        console.log(`  ⚠ Retrying fill for Add-on Name. Expected: "${value}", Actual: "${filledValue}"`);
        await this.addAddonNameField.clear();
        await this.addAddonNameField.fill(value);
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to fill Add-on Name: ${error.message}`);
    }
  }

  /**
   * Fills the Add-on Code field in Add Addon modal
   * @param {string} value - The add-on code value
   */
  async fillAddonCode(value) {
    try {
      await this.addAddonCodeField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonCodeField.scrollIntoViewIfNeeded();
      await this.addAddonCodeField.clear();
      await this.addAddonCodeField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Add-on Code: ${error.message}`);
    }
  }

  /**
   * Fills the Description field in Add Addon modal
   * @param {string} value - The description value
   */
  async fillAddonDescription(value) {
    try {
      await this.addAddonDescriptionField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonDescriptionField.scrollIntoViewIfNeeded();
      await this.addAddonDescriptionField.clear();
      await this.addAddonDescriptionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Description: ${error.message}`);
    }
  }

  /**
   * Fills the Price field in Add Addon modal
   * @param {string} value - The price value
   */
  async fillAddonPrice(value) {
    try {
      await this.addAddonPriceField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonPriceField.scrollIntoViewIfNeeded();
      await this.addAddonPriceField.clear();
      await this.addAddonPriceField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Price: ${error.message}`);
    }
  }

  /**
   * Fills the Price Interval field in Add Addon modal
   * @param {string} value - The price interval value
   */
  async fillAddonPriceInterval(value) {
    try {
      await this.addAddonPriceIntervalField.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonPriceIntervalField.scrollIntoViewIfNeeded();
      await this.addAddonPriceIntervalField.clear();
      await this.addAddonPriceIntervalField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to fill Price Interval: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Unit dropdown in Add Addon modal
   * @param {string} value - The unit value to select (e.g., "GB", "MB", "Nos")
   */
  async selectAddonUnit(value) {
    try {
      await this.addAddonUnitDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonUnitDropdown.scrollIntoViewIfNeeded();
      await this.addAddonUnitDropdown.selectOption({ label: value }).catch(async () => {
        await this.addAddonUnitDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Unit: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Pricing Every dropdown in Add Addon modal
   * @param {string} value - The pricing every value to select (e.g., "Week(s)", "Month(s)", "Year(s)")
   */
  async selectAddonPricingEvery(value) {
    try {
      await this.addAddonPricingEveryDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.addAddonPricingEveryDropdown.scrollIntoViewIfNeeded();
      await this.addAddonPricingEveryDropdown.selectOption({ label: value }).catch(async () => {
        await this.addAddonPricingEveryDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Pricing Every: ${error.message}`);
    }
  }

  /**
   * Selects the Add-on Type radio button (One Time or Recurring)
   * @param {string} type - The add-on type: "oneTime" or "recurring"
   */
  async selectAddonType(type) {
    try {
      if (type === 'oneTime' || type === 'One Time') {
        await this.addAddonTypeOneTimeRadio.waitFor({ state: 'visible', timeout: 10000 });
        await this.addAddonTypeOneTimeRadio.scrollIntoViewIfNeeded();
        await this.addAddonTypeOneTimeRadio.click();
        await this.page.waitForTimeout(300);
      } else if (type === 'recurring' || type === 'Recurring') {
        await this.addAddonTypeRecurringRadio.waitFor({ state: 'visible', timeout: 10000 });
        await this.addAddonTypeRecurringRadio.scrollIntoViewIfNeeded();
        await this.addAddonTypeRecurringRadio.click();
        await this.page.waitForTimeout(300);
      } else {
        throw new Error(`Invalid add-on type: ${type}. Must be "oneTime" or "recurring"`);
      }
    } catch (error) {
      throw new Error(`Failed to select Add-on Type: ${error.message}`);
    }
  }

  /**
   * Clicks the Submit button in Add Addon modal (without waiting for submission)
   */
  async clickAddAddonSubmitButton() {
    try {
      await this.addAddonModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.addAddonModalSubmit.scrollIntoViewIfNeeded();
      
      const isEnabled = await this.addAddonModalSubmit.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      
      // Use JavaScript click for robustness
      await this.addAddonModalSubmit.evaluate((el) => el.click());
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to click Add Addon submit button: ${error.message}`);
    }
  }

  /**
   * Submits the Add Addon form
   */
  async submitAddAddonForm() {
    try {
      await this.addAddonModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.addAddonModalSubmit.scrollIntoViewIfNeeded();
      
      const isEnabled = await this.addAddonModalSubmit.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      
      await this.addAddonModalSubmit.click({ timeout: 5000 });
      
      // Wait for modal to close
      let modalClosed = false;
      for (let i = 0; i < 30; i++) {
        await this.page.waitForTimeout(500);
        const isModalOpen = await this.isAddAddonModalOpen();
        if (!isModalOpen) {
          modalClosed = true;
          break;
        }
      }
      
      if (!modalClosed) {
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to submit Add Addon form: ${error.message}`);
    }
  }

  /**
   * Verifies if an add-on with the given name exists in the add-on table
   * @param {string} addonName - The add-on name to search for
   * @returns {Promise<boolean>}
   */
  async verifyAddonInTable(addonName) {
    try {
      const rowCount = await this.addonTableRows.count();
      if (rowCount === 0) {
        return false;
      }

      // Check all rows for the add-on name
      for (let i = 0; i < rowCount; i++) {
        const row = this.addonTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const cellText = await nameCell.textContent();
        if (cellText && cellText.trim().toLowerCase().includes(addonName.toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Gets the add-on name from the add-on table (first row)
   * @returns {Promise<string>}
   */
  async getAddonNameFromTable() {
    try {
      const count = await this.addonTableRows.count();
      if (count > 0) {
        const firstRow = this.addonTableRows.first();
        const nameCell = firstRow.locator('td.mat-column-Name').first();
        const text = await nameCell.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
      return '';
    } catch {
      return '';
    }
  }

  // ==================== EDIT ADDON METHODS ====================

  /**
   * Clicks on the edit icon in the Action column of the first add-on row
   */
  async clickAddonEditIcon() {
    try {
      const rowCount = await this.addonTableRows.count();
      if (rowCount === 0) {
        throw new Error('No add-on rows available in table');
      }
      
      const firstRow = this.addonTableRows.first();
      const editIconInRow = firstRow.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"]').first();
      
      await editIconInRow.waitFor({ state: 'visible', timeout: 5000 });
      await editIconInRow.scrollIntoViewIfNeeded();
      await editIconInRow.click();
      await this.page.waitForTimeout(2000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click add-on edit icon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Update Addon modal is open
   * @returns {Promise<boolean>}
   */
  async isUpdateAddonModalOpen() {
    try {
      const isModalVisible = await this.updateAddonModal.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      const isTitleVisible = await this.updateAddonModalTitle.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isTitleVisible) {
        return false;
      }
      
      const isSubmitVisible = await this.updateAddonModalSubmit.isVisible({ timeout: 1000 }).catch(() => false);
      return isSubmitVisible;
    } catch {
      return false;
    }
  }

  /**
   * Edits the Add-on Name field in Update Addon modal
   * @param {string} value - The new add-on name value
   */
  async editAddonName(value) {
    try {
      await this.updateAddonNameField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonNameField.scrollIntoViewIfNeeded();
      await this.updateAddonNameField.clear();
      await this.updateAddonNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Add-on Name: ${error.message}`);
    }
  }

  /**
   * Edits the Add-on Code field in Update Addon modal
   * @param {string} value - The new add-on code value
   */
  async editAddonCode(value) {
    try {
      await this.updateAddonCodeField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonCodeField.scrollIntoViewIfNeeded();
      await this.updateAddonCodeField.clear();
      await this.updateAddonCodeField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Add-on Code: ${error.message}`);
    }
  }

  /**
   * Edits the Description field in Update Addon modal
   * @param {string} value - The new description value
   */
  async editAddonDescription(value) {
    try {
      await this.updateAddonDescriptionField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonDescriptionField.scrollIntoViewIfNeeded();
      await this.updateAddonDescriptionField.clear();
      await this.updateAddonDescriptionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Description: ${error.message}`);
    }
  }

  /**
   * Edits the Price field in Update Addon modal
   * @param {string} value - The new price value
   */
  async editAddonPrice(value) {
    try {
      await this.updateAddonPriceField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonPriceField.scrollIntoViewIfNeeded();
      await this.updateAddonPriceField.clear();
      await this.updateAddonPriceField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Price: ${error.message}`);
    }
  }

  /**
   * Edits the Price Interval field in Update Addon modal
   * @param {string} value - The new price interval value
   */
  async editAddonPriceInterval(value) {
    try {
      await this.updateAddonPriceIntervalField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonPriceIntervalField.scrollIntoViewIfNeeded();
      await this.updateAddonPriceIntervalField.clear();
      await this.updateAddonPriceIntervalField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Price Interval: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Unit dropdown in Update Addon modal
   * @param {string} value - The unit value to select
   */
  async selectUpdateAddonUnit(value) {
    try {
      await this.updateAddonUnitDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonUnitDropdown.scrollIntoViewIfNeeded();
      await this.updateAddonUnitDropdown.selectOption({ label: value }).catch(async () => {
        await this.updateAddonUnitDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Unit: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Pricing Every dropdown in Update Addon modal
   * @param {string} value - The pricing every value to select
   */
  async selectUpdateAddonPricingEvery(value) {
    try {
      await this.updateAddonPricingEveryDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonPricingEveryDropdown.scrollIntoViewIfNeeded();
      await this.updateAddonPricingEveryDropdown.selectOption({ label: value }).catch(async () => {
        await this.updateAddonPricingEveryDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Pricing Every: ${error.message}`);
    }
  }

  /**
   * Selects the Add-on Type radio button in Update Addon modal (One Time or Recurring)
   * @param {string} type - The add-on type: "oneTime" or "recurring"
   */
  async selectUpdateAddonType(type) {
    try {
      if (type === 'oneTime' || type === 'One Time') {
        await this.updateAddonTypeOneTimeRadio.waitFor({ state: 'visible', timeout: 10000 });
        await this.updateAddonTypeOneTimeRadio.scrollIntoViewIfNeeded();
        await this.updateAddonTypeOneTimeRadio.click();
        await this.page.waitForTimeout(300);
      } else if (type === 'recurring' || type === 'Recurring') {
        await this.updateAddonTypeRecurringRadio.waitFor({ state: 'visible', timeout: 10000 });
        await this.updateAddonTypeRecurringRadio.scrollIntoViewIfNeeded();
        await this.updateAddonTypeRecurringRadio.click();
        await this.page.waitForTimeout(300);
      } else {
        throw new Error(`Invalid add-on type: ${type}. Must be "oneTime" or "recurring"`);
      }
    } catch (error) {
      throw new Error(`Failed to select Add-on Type: ${error.message}`);
    }
  }

  /**
   * Submits the Update Addon form
   */
  async submitUpdateAddonForm() {
    try {
      await this.updateAddonModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.updateAddonModalSubmit.scrollIntoViewIfNeeded();
      
      const isEnabled = await this.updateAddonModalSubmit.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      
      await this.updateAddonModalSubmit.click({ timeout: 5000 });
      
      // Wait for modal to close
      let modalClosed = false;
      for (let i = 0; i < 30; i++) {
        await this.page.waitForTimeout(500);
        const isModalOpen = await this.isUpdateAddonModalOpen();
        if (!isModalOpen) {
          modalClosed = true;
          break;
        }
      }
      
      if (!modalClosed) {
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to submit Update Addon form: ${error.message}`);
    }
  }

  // ==================== DELETE ADDON METHODS ====================

  /**
   * Clicks on the delete icon in the Action column of the first add-on row
   */
  async clickAddonDeleteIcon() {
    try {
      const rowCount = await this.addonTableRows.count();
      if (rowCount === 0) {
        throw new Error('No add-on rows available in table');
      }
      
      const firstRow = this.addonTableRows.first();
      const deleteIconInRow = firstRow.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"]').first();
      
      await deleteIconInRow.waitFor({ state: 'visible', timeout: 5000 });
      await deleteIconInRow.scrollIntoViewIfNeeded();
      await deleteIconInRow.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click add-on delete icon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Delete Addon modal is open
   * @returns {Promise<boolean>}
   */
  async isDeleteAddonModalOpen() {
    try {
      const isModalVisible = await this.deleteAddonModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      const isTitleVisible = await this.deleteAddonModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
      return isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Clicks Yes button in Delete Addon modal to confirm deletion
   */
  async confirmDeleteAddon() {
    try {
      await this.deleteAddonModalYesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteAddonModalYesButton.scrollIntoViewIfNeeded();
      await this.deleteAddonModalYesButton.click();
      await this.page.waitForTimeout(2000); // Wait for deletion to complete
    } catch (error) {
      throw new Error(`Failed to confirm delete addon: ${error.message}`);
    }
  }

  // ==================== EDIT PLAN METHODS ====================

  /**
   * Clicks on the edit icon in the Action column of the first plan row
   */
  async clickPlanEditIcon() {
    try {
      const rowCount = await this.planTableRows.count();
      if (rowCount === 0) {
        throw new Error('No plan rows available in table');
      }
      
      const firstRow = this.planTableRows.first();
      const editIconInRow = firstRow.locator('td.mat-column-Action i.bi-pencil-fill, td.mat-column-Action i[class*="pencil"]').first();
      
      await editIconInRow.waitFor({ state: 'visible', timeout: 5000 });
      await editIconInRow.scrollIntoViewIfNeeded();
      await editIconInRow.click();
      await this.page.waitForTimeout(2000); // Wait for modal to open
    } catch (error) {
      throw new Error(`Failed to click plan edit icon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Update Plan modal is open
   * @returns {Promise<boolean>}
   */
  async isUpdatePlanModalOpen() {
    try {
      const isModalVisible = await this.updatePlanModal.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      const isTitleVisible = await this.updatePlanModalTitle.isVisible({ timeout: 1000 }).catch(() => false);
      if (!isTitleVisible) {
        return false;
      }
      
      const isSubmitVisible = await this.updatePlanModalSubmit.isVisible({ timeout: 1000 }).catch(() => false);
      return isSubmitVisible;
    } catch {
      return false;
    }
  }

  /**
   * Edits the Plan Name field in Update Plan modal
   * @param {string} value - The new plan name value
   */
  async editPlanName(value) {
    try {
      await this.updatePlanNameField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanNameField.scrollIntoViewIfNeeded();
      await this.updatePlanNameField.clear();
      await this.updatePlanNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Plan Name: ${error.message}`);
    }
  }

  /**
   * Edits the Plan Code field in Update Plan modal
   * @param {string} value - The new plan code value
   */
  async editPlanCode(value) {
    try {
      await this.updatePlanCodeField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanCodeField.scrollIntoViewIfNeeded();
      await this.updatePlanCodeField.clear();
      await this.updatePlanCodeField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Plan Code: ${error.message}`);
    }
  }

  /**
   * Edits the Price field in Update Plan modal
   * @param {string} value - The new price value
   */
  async editPlanPrice(value) {
    try {
      await this.updatePlanPriceField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanPriceField.scrollIntoViewIfNeeded();
      await this.updatePlanPriceField.clear();
      await this.updatePlanPriceField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Price: ${error.message}`);
    }
  }

  /**
   * Edits the Plan Description field in Update Plan modal
   * @param {string} value - The new description value
   */
  async editPlanDescription(value) {
    try {
      await this.updatePlanDescriptionField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanDescriptionField.scrollIntoViewIfNeeded();
      await this.updatePlanDescriptionField.clear();
      await this.updatePlanDescriptionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Plan Description: ${error.message}`);
    }
  }

  /**
   * Edits the Bill Every field in Update Plan modal
   * @param {string} value - The new bill every value
   */
  async editPlanBillEvery(value) {
    try {
      await this.updatePlanBillEveryField.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanBillEveryField.scrollIntoViewIfNeeded();
      await this.updatePlanBillEveryField.clear();
      await this.updatePlanBillEveryField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to edit Bill Every: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Unit dropdown in Update Plan modal
   * @param {string} value - The unit value to select
   */
  async selectUpdatePlanUnit(value) {
    try {
      await this.updatePlanUnitDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanUnitDropdown.scrollIntoViewIfNeeded();
      await this.updatePlanUnitDropdown.selectOption({ label: value }).catch(async () => {
        await this.updatePlanUnitDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Unit: ${error.message}`);
    }
  }

  /**
   * Selects a value in the Billing Cycle dropdown in Update Plan modal
   * @param {string} value - The billing cycle value to select
   */
  async selectUpdatePlanBillingCycle(value) {
    try {
      await this.updatePlanBillingCycleDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanBillingCycleDropdown.scrollIntoViewIfNeeded();
      await this.updatePlanBillingCycleDropdown.selectOption({ label: value }).catch(async () => {
        await this.updatePlanBillingCycleDropdown.selectOption(value);
      });
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Billing Cycle: ${error.message}`);
    }
  }

  /**
   * Submits the Update Plan form
   */
  async submitUpdatePlanForm() {
    try {
      await this.updatePlanModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.updatePlanModalSubmit.scrollIntoViewIfNeeded();
      
      const isEnabled = await this.updatePlanModalSubmit.isEnabled().catch(() => true);
      if (!isEnabled) {
        throw new Error('Submit button is disabled');
      }
      
      await this.updatePlanModalSubmit.click({ timeout: 5000 });
      
      // Wait for modal to close
      let modalClosed = false;
      for (let i = 0; i < 30; i++) {
        await this.page.waitForTimeout(500);
        const isModalOpen = await this.isUpdatePlanModalOpen();
        if (!isModalOpen) {
          modalClosed = true;
          break;
        }
      }
      
      if (!modalClosed) {
        await this.page.waitForTimeout(2000);
      }
    } catch (error) {
      throw new Error(`Failed to submit Update Plan form: ${error.message}`);
    }
  }

  // ==================== DELETE PLAN METHODS ====================

  /**
   * Clicks on the delete icon in the Action column of the first plan row
   */
  async clickPlanDeleteIcon() {
    try {
      const rowCount = await this.planTableRows.count();
      if (rowCount === 0) {
        throw new Error('No plan rows available in table');
      }
      
      const firstRow = this.planTableRows.first();
      const deleteIconInRow = firstRow.locator('td.mat-column-Action i.bi-trash3-fill, td.mat-column-Action i[class*="trash"]').first();
      
      await deleteIconInRow.waitFor({ state: 'visible', timeout: 5000 });
      await deleteIconInRow.scrollIntoViewIfNeeded();
      await deleteIconInRow.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click plan delete icon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Delete Plan modal is open
   * @returns {Promise<boolean>}
   */
  async isDeletePlanModalOpen() {
    try {
      const isModalVisible = await this.deletePlanModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      const isTitleVisible = await this.deletePlanModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
      return isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Clicks Yes button in Delete Plan modal to confirm deletion
   */
  async confirmDeletePlan() {
    try {
      await this.deletePlanModalYesButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deletePlanModalYesButton.scrollIntoViewIfNeeded();
      await this.deletePlanModalYesButton.click();
      await this.page.waitForTimeout(2000); // Wait for deletion to complete
    } catch (error) {
      throw new Error(`Failed to confirm delete plan: ${error.message}`);
    }
  }
}

module.exports = { ProductPage };

