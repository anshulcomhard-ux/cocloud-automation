class FileManagerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.fileManagerMenu = page.locator('a:has-text("File Manager"), button:has-text("File Manager"), a[href*="file-manager"], a[href*="filemanager"]').first();
    
    // Page wrapper
    this.fileManagerWrapper = page.locator('.file-manager-wrapper, .file-manager, [class*="file-manager"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("File Manager"), .header-left:has-text("File Manager"), h1:has-text("File Manager"), h2:has-text("File Manager")').first();
    this.pageTitle = page.locator('h6.page-title-modern:has-text("File Manager"), h1:has-text("File Manager"), h2:has-text("File Manager")').first();
    
    // View toggle buttons - based on actual HTML structure
    // Grid View: button.view-btn-modern with icon bi-grid-3x3-gap-fill
    this.gridViewButton = page.locator('button.view-btn-modern:has(i.bi-grid-3x3-gap-fill), button[ng-reflect-message="Grid View"], button.view-btn-modern:has(i.bi-grid)').first();
    // List View: button.view-btn-modern with icon bi-list-ul
    this.listViewButton = page.locator('button.view-btn-modern:has(i.bi-list-ul), button[ng-reflect-message="List View"], button.view-btn-modern:has(i.bi-list)').first();
    this.viewToggleButtons = page.locator('.view-toggle-modern button, .view-toggle button, button.view-btn-modern').first();
    
    // View containers
    this.listViewContainer = page.locator('.list-view, [class*="list-view"], .file-list, table, .table-view').first();
    this.gridViewContainer = page.locator('.grid-view, [class*="grid-view"], .file-grid, .grid-container, .card-grid').first();
    
    // Active view indicator - button with active class
    this.activeListView = page.locator('button.view-btn-modern.active:has(i.bi-list-ul), button.view-btn-modern.active[ng-reflect-message="List View"], button.active:has(i.bi-list-ul)').first();
    this.activeGridView = page.locator('button.view-btn-modern.active:has(i.bi-grid-3x3-gap-fill), button.view-btn-modern.active[ng-reflect-message="Grid View"], button.active:has(i.bi-grid-3x3-gap-fill)').first();
    
    // File operations dropdown (not search operation)
    this.fileOperationsDropdown = page.locator('button:has-text("File Operations"), button:has-text("Operations"), button[aria-label*="File Operations"], button[aria-label*="Operations"], .file-operations-dropdown, .operations-dropdown, button.dropdown-toggle:has-text("Operations"), button[data-bs-toggle="dropdown"]:has-text("Operations"), button.dropdown-toggle-modern, button[data-bs-toggle="dropdown"]').first();
    this.fileOperationsDropdownMenu = page.locator('ul.dropdown-menu.file-operations-menu.show, .dropdown-menu.file-operations-menu.show, .dropdown-menu:has-text("Upload"), .dropdown-menu:has-text("New Directory"), .dropdown-menu:has-text("New Blank File"), .dropdown-menu.show, [role="menu"], ul.dropdown-menu-modern.show').first();
    
    // Dropdown options - using HTML structure with icons
    this.uploadOption = page.locator('a.dropdown-item:has(i.bi-upload):has-text("Upload"), .dropdown-item:has-text("Upload"), [role="menuitem"]:has-text("Upload"), a:has-text("Upload"), button:has-text("Upload")').first();
    this.newDirectoryOption = page.locator('a.dropdown-item:has(i.bi-folder):has-text("New Directory"), .dropdown-item:has-text("New Directory"), [role="menuitem"]:has-text("New Directory"), a:has-text("New Directory"), button:has-text("New Directory")').first();
    this.newBlankFileOption = page.locator('a.dropdown-item:has(i.bi-file-earmark):has-text("New Blank File"), .dropdown-item:has-text("New Blank File"), [role="menuitem"]:has-text("New Blank File"), a:has-text("New Blank File"), button:has-text("New Blank File")').first();
    
    // Upload modal locators
    this.uploadModal = page.locator('.upload-modal, .modal:has-text("Upload File"), [class*="upload-modal"]').first();
    this.uploadModalTitle = page.locator('.upload-modal-title:has-text("Upload File"), h3:has-text("Upload File")').first();
    this.uploadModalClose = page.locator('.upload-modal-close, button:has(i.bi-x-lg), .modal .close, button[aria-label*="close"]').first();
    
    // Upload type buttons
    this.uploadFilesButton = page.locator('button:has(i.bi-file-earmark):has-text("Upload Files"), button.btn:has-text("Upload Files")').first();
    this.uploadFolderButton = page.locator('button:has(i.bi-folder):has-text("Upload Folder"), button.btn:has-text("Upload Folder")').first();
    this.uploadZipButton = page.locator('button:has(i.bi-file-zip):has-text("Upload Zip"), button.btn:has-text("Upload Zip")').first();
    this.clearButton = page.locator('button.clear-btn, button:has-text("Clear"), .btn-secondary.clear-btn').first();
    
    // Upload file inputs (hidden)
    this.uploadFilesInput = page.locator('input[type="file"][multiple]:not([webkitdirectory]):not([accept*="zip"])').first();
    this.uploadFolderInput = page.locator('input[type="file"][webkitdirectory][multiple]').first();
    this.uploadZipInput = page.locator('input[type="file"][accept*="zip"], input[type="file"][accept*=".zip"]').first();
    
    // Dropzone
    this.uploadDropzone = page.locator('.upload-dropzone, .dropzone, [class*="dropzone"]').first();
    this.dropzoneContent = page.locator('.dropzone-content, .dropzone').first();
    this.dropzoneBrowseLink = page.locator('.dropzone-subtext, p:has-text("click here to browse"), .dropzone p:has-text("browse")').first();
    
    // Modal footer buttons
    this.uploadCancelButton = page.locator('.upload-modal-footer button:has-text("Cancel"), .modal-footer button:has-text("Cancel"), button.btn-secondary:has-text("Cancel")').first();
    this.confirmUploadButton = page.locator('.upload-modal-footer button:has-text("Confirm Upload"), button.btn-success:has-text("Confirm Upload"), button:has-text("Confirm Upload")').first();
    
    // New Directory modal/input locators
    this.newDirectoryModal = page.locator('.modal:has-text("New Directory"), .modal:has-text("Create Directory"), .modal-content:has-text("Directory"), [role="dialog"]:has-text("Directory")').first();
    this.newDirectoryInput = page.locator('input[placeholder*="Directory"], input[placeholder*="directory"], input[placeholder*="name"], input[ng-model*="directory"], input[formcontrolname*="directory"], input[formcontrolname*="name"], .modal input[type="text"]').first();
    this.newDirectorySubmitButton = page.locator('.modal button:has-text("Create"), .modal button:has-text("Submit"), .modal button:has-text("OK"), .modal button[type="submit"], button.primary-btn:has-text("Create")').first();
    this.newDirectoryCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button[type="button"]:has-text("Cancel"), button.secondary-btn:has-text("Cancel")').first();
    
    // Table inline input for new directory (first row, first column after checkbox)
    this.tableNewDirectoryInput = page.locator('table tbody tr:first-child td input[type="text"], table tbody tr:first-child td input:not([type="checkbox"]), .table tbody tr:first-child td input[type="text"]').first();
    
    // Upload modal locators
    this.uploadModal = page.locator('.modal:has-text("Upload File"), .modal:has-text("Upload"), .modal-content:has-text("Upload File"), [role="dialog"]:has-text("Upload File"), .modal:has-text("Upload Files")').first();
    this.uploadFilesButton = page.locator('label:has-text("Upload Files"), label.btn:has-text("Upload Files"), button:has-text("Upload Files"), .upload-type-btn:has-text("Upload Files"), button[aria-label*="Upload Files"], .modal button:has-text("Upload Files")').first();
    this.uploadFolderButton = page.locator('label:has-text("Upload Folder"), label.btn:has-text("Upload Folder"), button:has-text("Upload Folder"), .upload-type-btn:has-text("Upload Folder"), button[aria-label*="Upload Folder"], .modal button:has-text("Upload Folder")').first();
    this.uploadZipButton = page.locator('label:has-text("Upload Zip"), label.btn:has-text("Upload Zip"), button:has-text("Upload Zip"), .upload-type-btn:has-text("Upload Zip"), button[aria-label*="Upload Zip"], .modal button:has-text("Upload Zip")').first();
    this.uploadFileInput = page.locator('input[type="file"], .modal input[type="file"], input[accept], .file-input, input[type="file"][multiple]').first();
    this.uploadDragDropArea = page.locator('.drag-drop-area, .dropzone, .upload-area, [class*="drag"], [class*="drop"]').first();
    this.confirmUploadButton = page.locator('.modal button:has-text("Confirm Upload"), button:has-text("Confirm Upload"), .modal button:has-text("Upload"), button.primary-btn:has-text("Confirm"), button:has-text("Confirm")').first();
    this.cancelUploadButton = page.locator('.modal button:has-text("Cancel"), .modal button[type="button"]:has-text("Cancel"), button.secondary-btn:has-text("Cancel"), .upload-modal button:has-text("Cancel")').first();
    this.uploadModalCloseButton = page.locator('.modal .close, .modal button.close, .modal [aria-label="Close"], button:has-text("×"), .modal-header button').first();
    
    // Search feature locators
    this.searchInput = page.locator('input[type="text"][placeholder="Search Files"], input.search-field-modern[placeholder="Search Files"], input.form-control.search-field-modern').first();
    this.searchButton = page.locator('button.search-btn-modern, button:has(i.bi-search), button[type="button"]:has(i.bi-search)').first();
    // Include Subdirectory checkbox near search (for recursive search)
    // HTML: <input type="checkbox" ng-reflect-model="false" class="ng-valid ng-dirty ng-touched">
    this.includeSubdirectoryCheckbox = page
      .locator(
        'label:has-text("Include Subdirectory") input[type="checkbox"], ' +
          'label:has-text("Include subdirectory") input[type="checkbox"], ' +
          '*:has-text("Include Subdirectory") input[type="checkbox"][ng-reflect-model], ' +
          '*:has-text("Include subdirectory") input[type="checkbox"][ng-reflect-model], ' +
          'input[type="checkbox"][ng-reflect-model], ' +
          'input[type="checkbox"][ng-reflect-name*="subdirectory" i], ' +
          'input[type="checkbox"][formcontrolname*="subdirectory" i]'
      )
      .first();
    
    // Table locators
    this.table = page.locator('table, .table, table.table').first();
    this.tableBody = page.locator('table tbody, .table tbody').first();
    this.tableRows = page.locator('table tbody tr, .table tbody tr').first();
    this.fileNameColumnHeader = page.locator('th:has-text("File Name"), th:has-text("FileName"), thead th:has-text("File Name")').first();
    this.operationColumnHeader = page.locator('th:has-text("Operation"), th:has-text("Operations"), thead th:has-text("Operation")').first();
    this.sizeColumnHeader = page.locator('th:has-text("Size"), th.sortable-header:has-text("Size"), thead th:has-text("Size")').first();
    
    // Operation column dropdown locators (appears on hover)
    this.operationColumnCell = page.locator('td:has-text("Operation"), td[class*="operation"], table tbody tr td:last-child').first();
    this.operationDropdown = page.locator('.operation-dropdown, .dropdown-menu:has-text("Rename"), .dropdown-menu:has-text("Delete"), button[aria-haspopup="true"]:has(i), .operation-btn').first();
    this.operationDropdownMenu = page.locator('.dropdown-menu.show:has-text("Rename"), .dropdown-menu.show:has-text("Delete"), ul.dropdown-menu.show, [role="menu"].show').first();
    
    // Operation dropdown options
    this.renameOption = page.locator('a.dropdown-item:has-text("Rename"), .dropdown-item:has-text("Rename"), [role="menuitem"]:has-text("Rename"), button:has-text("Rename"), a:has(i.bi-pencil):has-text("Rename")').first();
    this.deleteOption = page.locator('a.dropdown-item:has-text("Delete"), .dropdown-item:has-text("Delete"), [role="menuitem"]:has-text("Delete"), button:has-text("Delete"), a:has(i.bi-trash):has-text("Delete")').first();
    this.copyOption = page.locator('a.dropdown-item:has-text("Copy"), .dropdown-item:has-text("Copy"), [role="menuitem"]:has-text("Copy"), button:has-text("Copy"), a:has(i.bi-files):has-text("Copy")').first();
    this.cutOption = page.locator('a.dropdown-item:has-text("Cut"), .dropdown-item:has-text("Cut"), [role="menuitem"]:has-text("Cut"), button:has-text("Cut")').first();
    this.compressOption = page.locator('a.dropdown-item:has-text("Compress"), .dropdown-item:has-text("Compress"), [role="menuitem"]:has-text("Compress"), button:has-text("Compress")').first();
    
    // Rename modal locators
    this.renameModal = page.locator('.modal:has-text("Rename"), .modal:has-text("Rename File"), .modal:has-text("Rename Folder"), [role="dialog"]:has-text("Rename")').first();
    this.renameInput = page.locator('.modal input[type="text"], .modal input[placeholder*="name"], .modal input[placeholder*="Name"], input[formcontrolname*="name"]').first();
    this.renameConfirmButton = page.locator('.modal button:has-text("Rename"), .modal button:has-text("Confirm"), .modal button:has-text("Save"), .modal button[type="submit"]').first();
    this.renameCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button[type="button"]:has-text("Cancel")').first();
    
    // Delete confirmation modal locators
    this.deleteModal = page.locator('.modal:has-text("Delete Confirmation"), .modal:has-text("Delete"), .modal:has-text("Confirm Delete"), [role="dialog"]:has-text("Delete")').first();
    this.deleteConfirmInput = page.locator('.modal input[type="text"][placeholder*="delete"], .modal input[placeholder*="Delete"], input[placeholder*="type"], input[formcontrolname*="confirm"]').first();
    this.deleteConfirmButton = page.locator('.modal button:has-text("Delete"), .modal button.btn-danger:has-text("Delete"), button:has-text("Delete"):not(:has-text("Cancel"))').first();
    this.deleteCancelButton = page.locator('.modal button:has-text("Cancel"), .modal button[type="button"]:has-text("Cancel")').first();
    
    // File selection locators
    this.fileCheckboxes = page.locator('table tbody tr input[type="checkbox"], .table tbody tr input[type="checkbox"]');
    this.selectedCountIndicator = page.locator('button:has-text("selected"), .selected-count, [class*="selected-count"], button:has-text(/\\d+ selected/)').first();
    
    // Header action buttons (appear when multiple files selected)
    this.permissionButton = page.locator('button:has-text("Permission"), button:has(i.bi-shield), button[aria-label*="Permission"], .permission-btn').first();
    
    // Permission modal locators
    this.permissionModal = page.locator('.permission-modal-modern, .modal:has-text("User Permission"), .modal:has-text("Permission"), [role="dialog"]:has-text("User Permission"), [role="dialog"]:has-text("Permission")').first();
    this.permissionModalTitle = page.locator('.modal-title-modern:has-text("User Permission"), .modal-title:has-text("User Permission"), h5:has-text("User Permission"), h3:has-text("User Permission"), h4:has-text("User Permission"), .modal-header:has-text("User Permission")').first();
    
    // Permission modal user rows (table rows with radio buttons)
    this.permissionUserRows = page.locator('.permission-modal-modern tbody tr.table-row-modern, .permission-modal-modern table tbody tr, .modal tbody tr:has(input[type="radio"]), .modal table tbody tr:has(input[type="radio"]), [role="dialog"] tbody tr:has(input[type="radio"]), .permission-user-row, tr:has(input[type="radio"])');
    this.permissionFirstUserRow = page.locator('.permission-modal-modern tbody tr.table-row-modern:first-child, .permission-modal-modern table tbody tr:first-child, .modal tbody tr:first-child:has(input[type="radio"]), .modal table tbody tr:first-child:has(input[type="radio"])').first();
    
    // Permission radio buttons (general locators)
    this.allowRadioButton = page.locator('input[type="radio"][id^="allow"], input[type="radio"][name*="allow"], input[type="radio"][value*="allow"]').first();
    this.denyRadioButton = page.locator('input[type="radio"][id^="deny"], input[type="radio"][name*="deny"], input[type="radio"][value*="deny"]').first();
    
    // Permission modal buttons
    this.permissionSubmitButton = page.locator('.permission-modal-modern button.btn-primary-modern:has-text("Submit"), .permission-modal-modern button:has(i.bi-check-circle-fill), .modal button:has-text("Submit"), .modal button.btn-success:has-text("Submit"), button:has-text("Submit"):has(i.bi-check), button.btn-primary:has-text("Submit")').first();
    this.permissionCancelButton = page.locator('.permission-modal-modern button.btn-secondary-modern:has-text("Cancel"), .permission-modal-modern button:has-text("Cancel"), .modal button:has-text("Cancel"), .modal button.btn-secondary:has-text("Cancel"), .modal button[type="button"]:has-text("Cancel"), .permission-modal button:has-text("Cancel")').first();
    
    // Permission warning note
    this.permissionWarningNote = page.locator('.warning-note-modern, .permission-modal-modern .warning-note-modern, .modal .alert-warning, .modal .warning, .modal:has-text("child folder permissions"), *:has-text("child folder permissions"), *:has-text("child folder")').first();
    this.cutButton = page.locator('button:has-text("Cut"), button:has(i.bi-scissors), button[aria-label*="Cut"], .cut-btn').first();
    this.copyButton = page.locator('button:has-text("Copy"), button:has(i.bi-files), button[aria-label*="Copy"], .copy-btn').first();
    this.compressButton = page.locator('button:has-text("Compress"), button:has(i.bi-file-zip), button[aria-label*="Compress"], .compress-btn').first();
    this.deleteButton = page.locator('button:has-text("Delete"):not(.dropdown-item), button:has(i.bi-trash):not(.dropdown-item), button[aria-label*="Delete"]:not(.dropdown-item), .delete-btn').first();
    this.pasteButton = page.locator('button:has-text("Paste"), button:has(i.bi-clipboard), button[aria-label*="Paste"], .paste-btn').first();
    
    // No data found message
    this.noDataFoundMessage = page.locator('*:has-text("No data found"), *:has-text("No Data Found"), *:has-text("No data"), .no-data, .empty-state, td:has-text("No data found")').first();
    
    // Pagination locators - using multiple strategies
    this.paginationContainer = page.locator('.pagination, .pagination-modern, [class*="pagination"], .pagination-wrapper, .pager, [class*="pager"]').first();
    this.pageNumberIndicator = page.locator('.page-number, .current-page, [class*="page-number"], .pagination-info, span:has-text("Page"), div:has-text("Page"), .page-info, [class*="page-info"]').first();
    this.nextButton = page.locator('button:has-text("Next"), button:has-text(">"), .pagination button:has(i.bi-chevron-right), .pagination button:has(i.bi-arrow-right), button[aria-label*="Next"], button.next-page, .pagination-next, a:has-text("Next"), a:has-text(">"), .pagination a:has(i.bi-chevron-right), button[title*="Next"], a[title*="Next"]').first();
    this.previousButton = page.locator('button:has-text("Previous"), button:has-text("<"), .pagination button:has(i.bi-chevron-left), .pagination button:has(i.bi-arrow-left), button[aria-label*="Previous"], button.prev-page, .pagination-prev, a:has-text("Previous"), a:has-text("<"), .pagination a:has(i.bi-chevron-left), button[title*="Previous"], a[title*="Previous"]').first();
    this.itemsPerPageDropdown = page.locator('select[aria-label*="Items per page"], select:has(option:has-text("10")), .items-per-page select, select.items-per-page, mat-select:has-text("Items per page"), select, select[ng-model*="pageSize"], select[formcontrolname*="pageSize"]').first();
    this.itemsPerPageLabel = page.locator('*:has-text("Items per page"), *:has-text("items per page"), label:has-text("Items per page")').first();
    this.gotoPageInput = page.locator('input[type="number"][placeholder*="Page"], input.goto-input, input[placeholder*="Goto"], input[placeholder*="Go to"], input[placeholder*="page"], input.goto-page, input.page-number-input, input[ng-model*="page"], input[formcontrolname*="page"]').first();
    this.gotoPageLabel = page.locator('*:has-text("Goto page"), *:has-text("Go to page"), label:has-text("Goto")').first();
    this.activePageNumber = page.locator('span.page-number.active, .page-number.active, .pagination .active, .pagination .page-item.active, .pagination button.active, [class*="active"][class*="page"], .pagination li.active, .pagination a.active').first();
    this.paginationInfo = page.locator('.pagination-info, .page-info, [class*="pagination-info"], span:has-text("of"), div:has-text("of"), [class*="pagination"] span, [class*="pagination"] div').first();
    
    // Breadcrumb locators
    this.homeBreadcrumb = page.locator('a.breadcrumb-item-modern:has-text("Home"), a:has-text("Home").breadcrumb-item-modern, a.breadcrumb-item:has-text("Home"), a:has-text("Home")').first();
    
    // Tab locators
    this.tabsContainer = page.locator('.fm-tabs, div[class*="fm-tabs"], [class*="tabs"]').first();
    this.addTabButton = page.locator('button.fm-tab-add, button:has(i.bi-plus-lg), button[ng-reflect-message="Open new tab"], button[aria-label*="new tab" i]').first();
    // Match tabs (excluding the + button)
    this.tabs = page.locator('.fm-tabs button.fm-tab:not(.fm-tab-add), button.fm-tab:not(.fm-tab-add)');
    this.activeTab = page.locator('button.fm-tab.active, button.fm-tab[class*="active"]').first();
    this.tabLabels = page.locator('.fm-tab-label, span.fm-tab-label, button.fm-tab span');
    // Tab close button (X icon inside tab)
    this.tabCloseButtons = page.locator('button.fm-tab button.fm-tab-icon:has(i.bi-x), button.fm-tab button:has(i.bi-x), button.fm-tab-icon:has(i.bi-x)');
  }

  /**
   * Navigates to File Manager page
   */
  async gotoFileManager() {
    try {
      await this.fileManagerMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.fileManagerMenu.click();
    } catch (error) {
      // If menu item not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/file-manager`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load
    await Promise.race([
      this.fileManagerWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Clicks on the Home breadcrumb to navigate back to root File Manager
   */
  async clickHomeBreadcrumb() {
    try {
      await this.homeBreadcrumb.waitFor({ state: 'visible', timeout: 10000 });
      await this.homeBreadcrumb.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.homeBreadcrumb.click();
      await this.page.waitForTimeout(2000);
      // Wait for navigation to complete
      await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click Home breadcrumb: ${error.message}`);
    }
  }

  /**
   * Gets the count of visible tabs (excluding the + button)
   * @returns {Promise<number>}
   */
  async getTabCount() {
    try {
      // Get all tabs and filter to only visible ones
      const allTabs = await this.tabs.all();
      let visibleCount = 0;
      
      for (const tab of allTabs) {
        const isVisible = await tab.isVisible({ timeout: 500 }).catch(() => false);
        if (isVisible) {
          visibleCount++;
        }
      }
      
      return visibleCount;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clicks on the + button to open a new tab
   */
  async clickAddTabButton() {
    try {
      await this.addTabButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addTabButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.addTabButton.click();
      await this.page.waitForTimeout(1000); // Wait for new tab to be created
    } catch (error) {
      throw new Error(`Failed to click Add Tab button: ${error.message}`);
    }
  }

  /**
   * Clicks on a tab by index (0-based)
   * @param {number} index - Tab index (0-based)
   */
  async clickTabByIndex(index) {
    try {
      const tabs = await this.tabs.all();
      if (index >= tabs.length) {
        throw new Error(`Tab index ${index} is out of range. Total tabs: ${tabs.length}`);
      }
      await tabs[index].scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await tabs[index].click();
      await this.page.waitForTimeout(1000); // Wait for tab to activate
    } catch (error) {
      throw new Error(`Failed to click tab at index ${index}: ${error.message}`);
    }
  }

  /**
   * Gets the label text of a tab by index
   * @param {number} index - Tab index (0-based)
   * @returns {Promise<string>}
   */
  async getTabLabel(index) {
    try {
      const tabs = await this.tabs.all();
      if (index >= tabs.length) {
        return '';
      }
      const tabLabel = tabs[index].locator('.fm-tab-label, span.fm-tab-label').first();
      const labelText = await tabLabel.textContent();
      return labelText ? labelText.trim() : '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Closes a tab by clicking the X (close) button on the tab
   * @param {number} index - Tab index (0-based)
   */
  async closeTabByIndex(index) {
    try {
      const tabs = await this.tabs.all();
      if (index >= tabs.length) {
        throw new Error(`Tab index ${index} is out of range. Total tabs: ${tabs.length}`);
      }
      
      // Find the close button (X icon) inside the tab
      const tab = tabs[index];
      const closeButton = tab.locator('button.fm-tab-icon:has(i.bi-x), button:has(i.bi-x), i.bi-x').first();
      
      await closeButton.waitFor({ state: 'visible', timeout: 5000 });
      await closeButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await closeButton.click();
      await this.page.waitForTimeout(1000); // Wait for tab to close
    } catch (error) {
      throw new Error(`Failed to close tab at index ${index}: ${error.message}`);
    }
  }

  /**
   * Clicks the Calculate link for a specific directory/file in the Size column
   * @param {string} fileName - Name of the directory/file
   */
  async clickCalculateSize(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);

      // Find the row containing the file/directory name
      const rowLocator = this.page.locator(`table tbody tr:has-text("${fileName}"), .table tbody tr:has-text("${fileName}")`).first();
      await rowLocator.waitFor({ state: 'visible', timeout: 10000 });

      // Find the Calculate link in the Size column of that row
      const calculateLink = rowLocator.locator('span.fm-calculate-link:has-text("Calculate"), a:has-text("Calculate"), span:has-text("Calculate")').first();
      await calculateLink.waitFor({ state: 'visible', timeout: 5000 });
      await calculateLink.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await calculateLink.click();
      await this.page.waitForTimeout(2000); // Wait for size calculation to complete
    } catch (error) {
      throw new Error(`Failed to click Calculate for "${fileName}": ${error.message}`);
    }
  }

  /**
   * Gets the size value displayed in the Size column for a specific directory/file
   * @param {string} fileName - Name of the directory/file
   * @returns {Promise<string>} Size value (e.g., "1.5 MB", "500 KB")
   */
  async getSizeValue(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);

      // Find the row containing the file/directory name
      const rowLocator = this.page.locator(`table tbody tr:has-text("${fileName}"), .table tbody tr:has-text("${fileName}")`).first();
      await rowLocator.waitFor({ state: 'visible', timeout: 10000 });

      // Find the Size column cell in that row
      // First, find the Size column index
      const sizeColumnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('size')) {
            return i;
          }
        }
        return -1;
      });

      if (sizeColumnIndex === -1) {
        throw new Error('Size column not found');
      }

      // Get the size cell value
      const sizeCell = rowLocator.locator('td').nth(sizeColumnIndex);
      const sizeText = await sizeCell.textContent();
      return sizeText ? sizeText.trim() : '';
    } catch (error) {
      throw new Error(`Failed to get size value for "${fileName}": ${error.message}`);
    }
  }

  /**
   * Checks if the File Manager page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.fileManagerWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the current active view (list or grid)
   * @returns {Promise<string>} Returns 'list', 'grid', or 'unknown'
   */
  async getCurrentView() {
    try {
      // Check for active list view button
      const listViewActive = await this.activeListView.isVisible({ timeout: 2000 }).catch(() => false);
      if (listViewActive) {
        return 'list';
      }

      // Check for active grid view button
      const gridViewActive = await this.activeGridView.isVisible({ timeout: 2000 }).catch(() => false);
      if (gridViewActive) {
        return 'grid';
      }

      // Check by container visibility
      const listContainerVisible = await this.listViewContainer.isVisible({ timeout: 2000 }).catch(() => false);
      const gridContainerVisible = await this.gridViewContainer.isVisible({ timeout: 2000 }).catch(() => false);

      if (listContainerVisible && !gridContainerVisible) {
        return 'list';
      }
      if (gridContainerVisible && !listContainerVisible) {
        return 'grid';
      }

      // Check button states
      const listButtonPressed = await this.listViewButton.getAttribute('aria-pressed').catch(() => null);
      const gridButtonPressed = await this.gridViewButton.getAttribute('aria-pressed').catch(() => null);

      if (listButtonPressed === 'true') {
        return 'list';
      }
      if (gridButtonPressed === 'true') {
        return 'grid';
      }

      return 'unknown';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Checks if list view button is visible
   * @returns {Promise<boolean>}
   */
  async isListViewButtonVisible() {
    try {
      return await this.listViewButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if grid view button is visible
   * @returns {Promise<boolean>}
   */
  async isGridViewButtonVisible() {
    try {
      return await this.gridViewButton.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the list view button
   */
  async clickListViewButton() {
    try {
      await this.listViewButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.listViewButton.scrollIntoViewIfNeeded();
      await this.listViewButton.click();
      await this.page.waitForTimeout(1500); // Wait for view to change
    } catch (error) {
      throw new Error(`Failed to click List View button: ${error.message}`);
    }
  }

  /**
   * Clicks the grid view button
   */
  async clickGridViewButton() {
    try {
      await this.gridViewButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.gridViewButton.scrollIntoViewIfNeeded();
      await this.gridViewButton.click();
      await this.page.waitForTimeout(1500); // Wait for view to change
    } catch (error) {
      throw new Error(`Failed to click Grid View button: ${error.message}`);
    }
  }

  /**
   * Verifies that list view is active
   * @returns {Promise<boolean>}
   */
  async verifyListViewActive() {
    try {
      const currentView = await this.getCurrentView();
      if (currentView === 'list') {
        return true;
      }

      // Additional checks
      const listContainerVisible = await this.listViewContainer.isVisible({ timeout: 2000 }).catch(() => false);
      const gridContainerVisible = await this.gridViewContainer.isVisible({ timeout: 2000 }).catch(() => false);

      return listContainerVisible && !gridContainerVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies that grid view is active
   * @returns {Promise<boolean>}
   */
  async verifyGridViewActive() {
    try {
      const currentView = await this.getCurrentView();
      if (currentView === 'grid') {
        return true;
      }

      // Additional checks
      const listContainerVisible = await this.listViewContainer.isVisible({ timeout: 2000 }).catch(() => false);
      const gridContainerVisible = await this.gridViewContainer.isVisible({ timeout: 2000 }).catch(() => false);

      return gridContainerVisible && !listContainerVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Switches to list view
   */
  async switchToListView() {
    const currentView = await this.getCurrentView();
    if (currentView !== 'list') {
      await this.clickListViewButton();
    }
  }

  /**
   * Switches to grid view
   */
  async switchToGridView() {
    const currentView = await this.getCurrentView();
    if (currentView !== 'grid') {
      await this.clickGridViewButton();
    }
  }

  /**
   * Verifies view change after clicking a view button
   * @param {string} targetView - 'list' or 'grid'
   * @returns {Promise<{changed: boolean, currentView: string, targetView: string}>}
   */
  async verifyViewChange(targetView) {
    try {
      const currentView = await this.getCurrentView();
      const changed = currentView === targetView;

      return {
        changed: changed,
        currentView: currentView,
        targetView: targetView
      };
    } catch (error) {
      return {
        changed: false,
        currentView: 'unknown',
        targetView: targetView,
        error: error.message
      };
    }
  }

  /**
   * Checks if file operations dropdown is visible
   * @returns {Promise<boolean>}
   */
  async isFileOperationsDropdownVisible() {
    try {
      // Strategy 1: Try main locator
      const visible = await this.fileOperationsDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      if (visible) {
        return true;
      }

      // Strategy 2: Use evaluate to find dropdown button that opens menu with Upload/New Directory/New Blank File
      const found = await this.page.evaluate(() => {
        // Find all dropdown toggle buttons
        const dropdownButtons = Array.from(document.querySelectorAll('button[data-bs-toggle="dropdown"], button.dropdown-toggle, button.dropdown-toggle-modern'));
        for (const button of dropdownButtons) {
          // Check if clicking this button would show a menu with Upload, New Directory, New Blank File
          const buttonId = button.id;
          const buttonAria = button.getAttribute('aria-haspopup') || button.getAttribute('aria-expanded');
          
          // Look for dropdown menu associated with this button
          const menu = document.querySelector(`ul.dropdown-menu[aria-labelledby="${buttonId}"], .dropdown-menu`);
          if (menu) {
            const menuText = menu.textContent || '';
            if (menuText.includes('Upload') && (menuText.includes('Directory') || menuText.includes('Blank File'))) {
              return true;
            }
          }
        }
        return false;
      }).catch(() => false);

      return found;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks the file operations dropdown to open it
   */
  async clickFileOperationsDropdown() {
    try {
      let clicked = false;

      // Strategy 1: Try the main locator
      try {
        await this.fileOperationsDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.fileOperationsDropdown.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.fileOperationsDropdown.click();
        clicked = true;
      } catch (error) {
        // Strategy 1 failed, try next
      }

      // Strategy 2: Use evaluate to find and click the dropdown button by finding menu with Upload/New Directory/New Blank File
      if (!clicked) {
        try {
          const result = await this.page.evaluate(() => {
            // Find all dropdown menus first
            const menus = Array.from(document.querySelectorAll('.dropdown-menu, ul.dropdown-menu-modern, [role="menu"]'));
            for (const menu of menus) {
              const menuText = menu.textContent || '';
              // Check if menu contains Upload, New Directory, and New Blank File
              if (menuText.includes('Upload') && (menuText.includes('Directory') || menuText.includes('Blank File'))) {
                // Find the button that controls this menu
                // Try multiple ways to find the associated button
                const menuId = menu.id;
                const menuClass = menu.className;
                
                // Method 1: Find by aria-labelledby
                if (menuId) {
                  const button1 = document.querySelector(`button[aria-labelledby="${menuId}"]`);
                  if (button1) {
                    button1.click();
                    return true;
                  }
                }
                
                // Method 2: Find by data-bs-target
                if (menuId) {
                  const button2 = document.querySelector(`button[data-bs-target="#${menuId}"]`);
                  if (button2) {
                    button2.click();
                    return true;
                  }
                }
                
                // Method 3: Find button with aria-controls
                const button3 = document.querySelector(`button[aria-controls="${menuId}"]`);
                if (button3) {
                  button3.click();
                  return true;
                }
                
                // Method 4: Find closest button with dropdown-toggle
                const parent = menu.closest('.dropdown, .btn-group');
                if (parent) {
                  const button4 = parent.querySelector('button[data-bs-toggle="dropdown"], button.dropdown-toggle, button.dropdown-toggle-modern');
                  if (button4) {
                    button4.click();
                    return true;
                  }
                }
              }
            }
            
            // Fallback: Find all dropdown toggle buttons and check their associated menus
            const dropdownButtons = Array.from(document.querySelectorAll('button[data-bs-toggle="dropdown"], button.dropdown-toggle, button.dropdown-toggle-modern'));
            for (const button of dropdownButtons) {
              // Try to find associated menu by various methods
              const buttonId = button.id;
              const buttonAriaControls = button.getAttribute('aria-controls');
              const buttonDataTarget = button.getAttribute('data-bs-target');
              
              let menu = null;
              if (buttonId) {
                menu = document.querySelector(`ul.dropdown-menu[aria-labelledby="${buttonId}"]`);
              }
              if (!menu && buttonAriaControls) {
                menu = document.querySelector(`#${buttonAriaControls}, [id="${buttonAriaControls}"]`);
              }
              if (!menu && buttonDataTarget) {
                menu = document.querySelector(buttonDataTarget);
              }
              if (!menu) {
                // Try finding menu near the button
                const parent = button.closest('.dropdown, .btn-group');
                if (parent) {
                  menu = parent.querySelector('.dropdown-menu, ul.dropdown-menu-modern');
                }
              }
              
              if (menu) {
                const menuText = menu.textContent || '';
                if (menuText.includes('Upload') && (menuText.includes('Directory') || menuText.includes('Blank File'))) {
                  button.click();
                  return true;
                }
              }
            }
            
            return false;
          });
          
          if (result) {
            clicked = true;
            await this.page.waitForTimeout(1000); // Wait for dropdown to open
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }

      if (!clicked) {
        throw new Error('Could not find or click file operations dropdown using any strategy');
      }

      await this.page.waitForTimeout(1000); // Wait for dropdown to open
      
      // Wait for dropdown menu to be visible
      await this.fileOperationsDropdownMenu.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click file operations dropdown: ${error.message}`);
    }
  }

  /**
   * Checks if dropdown menu is open/visible
   * @returns {Promise<boolean>}
   */
  async isDropdownMenuOpen() {
    try {
      return await this.fileOperationsDropdownMenu.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies all three options are visible in the dropdown
   * @returns {Promise<{allOptionsVisible: boolean, uploadVisible: boolean, newDirectoryVisible: boolean, newBlankFileVisible: boolean}>}
   */
  async verifyDropdownOptions() {
    try {
      const uploadVisible = await this.uploadOption.isVisible({ timeout: 2000 }).catch(() => false);
      const newDirectoryVisible = await this.newDirectoryOption.isVisible({ timeout: 2000 }).catch(() => false);
      const newBlankFileVisible = await this.newBlankFileOption.isVisible({ timeout: 2000 }).catch(() => false);
      
      const allOptionsVisible = uploadVisible && newDirectoryVisible && newBlankFileVisible;
      
      return {
        allOptionsVisible: allOptionsVisible,
        uploadVisible: uploadVisible,
        newDirectoryVisible: newDirectoryVisible,
        newBlankFileVisible: newBlankFileVisible
      };
    } catch (error) {
      return {
        allOptionsVisible: false,
        uploadVisible: false,
        newDirectoryVisible: false,
        newBlankFileVisible: false,
        error: error.message
      };
    }
  }

  /**
   * Gets the text content of all dropdown options
   * @returns {Promise<{uploadText: string, newDirectoryText: string, newBlankFileText: string}>}
   */
  async getDropdownOptionTexts() {
    try {
      const uploadText = await this.uploadOption.textContent().catch(() => '');
      const newDirectoryText = await this.newDirectoryOption.textContent().catch(() => '');
      const newBlankFileText = await this.newBlankFileOption.textContent().catch(() => '');
      
      return {
        uploadText: uploadText?.trim() || '',
        newDirectoryText: newDirectoryText?.trim() || '',
        newBlankFileText: newBlankFileText?.trim() || ''
      };
    } catch (error) {
      return {
        uploadText: '',
        newDirectoryText: '',
        newBlankFileText: '',
        error: error.message
      };
    }
  }

  /**
   * Closes the dropdown by clicking outside or pressing Escape
   */
  async closeDropdown() {
    try {
      // Try pressing Escape first
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
      
      // If still open, click outside
      const isOpen = await this.isDropdownMenuOpen();
      if (isOpen) {
        await this.page.click('body');
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      // Ignore errors when closing
    }
  }

  /**
   * Ensures we're in list view (table view) for search functionality
   */
  async ensureListView() {
    try {
      const currentView = await this.getCurrentView();
      if (currentView !== 'list') {
        await this.switchToListView();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      // If switching fails, continue anyway
    }
  }

  /**
   * Gets all file names from the table
   * @returns {Promise<string[]>} Array of file names
   */
  async getFileNames() {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1; // Default to second column (usually File Name is second after checkbox)
      });

      // Get all file names from the table
      const fileNames = await this.page.evaluate((colIndex) => {
        const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
        const names = [];
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length > colIndex) {
            const cellText = cells[colIndex].textContent || '';
            const name = cellText.trim();
            if (name && name !== 'No data found') {
              names.push(name);
            }
          }
        }
        return names;
      }, columnIndex);

      return fileNames;
    } catch (error) {
      console.error('Error getting file names:', error);
      return [];
    }
  }

  /**
   * Clicks on the search input field
   */
  async clickSearchInput() {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.searchInput.click();
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to click search input: ${error.message}`);
    }
  }

  /**
   * Enters text in the search input field
   * @param {string} searchText - The text to search for
   */
  async enterSearchText(searchText) {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.clear();
      await this.page.waitForTimeout(200);
      await this.searchInput.fill(searchText);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter search text: ${error.message}`);
    }
  }

  /**
   * Clears the search input field
   */
  async clearSearchInput() {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.clear();
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to clear search input: ${error.message}`);
    }
  }

  /**
   * Clicks the search button
   */
  async clickSearchButton() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.searchButton.click();
      await this.page.waitForTimeout(1500); // Wait for search results to load
    } catch (error) {
      throw new Error(`Failed to click search button: ${error.message}`);
    }
  }

  /**
   * Sets the Include Subdirectory checkbox state
   * @param {boolean} checked - true to check, false to uncheck
   */
  async setIncludeSubdirectory(checked) {
    try {
      const checkbox = this.includeSubdirectoryCheckbox;
      const exists = await checkbox.isVisible({ timeout: 3000 }).catch(() => false);
      if (!exists) {
        console.log('Include Subdirectory checkbox not found, skipping toggle');
        return;
      }

      const isChecked = await checkbox.isChecked().catch(() => false);
      if (isChecked !== checked) {
        await checkbox.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
        await checkbox.click();
        await this.page.waitForTimeout(300);
      }
    } catch (error) {
      throw new Error(`Failed to set Include Subdirectory checkbox: ${error.message}`);
    }
  }

  /**
   * Returns whether Include Subdirectory checkbox is checked
   * @returns {Promise<boolean>}
   */
  async isIncludeSubdirectoryChecked() {
    try {
      return await this.includeSubdirectoryCheckbox.isChecked();
    } catch {
      return false;
    }
  }

  /**
   * Checks if "No data found" message is displayed
   * @returns {Promise<boolean>}
   */
  async isNoDataFoundMessageVisible() {
    try {
      return await this.noDataFoundMessage.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the count of table rows (excluding header)
   * @returns {Promise<number>}
   */
  async getTableRowCount() {
    try {
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      const rowCount = await this.page.evaluate(() => {
        const rows = document.querySelectorAll('table tbody tr, .table tbody tr');
        return rows.length;
      });
      return rowCount;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Verifies search results
   * @param {string} searchText - The search text used
   * @returns {Promise<{hasResults: boolean, rowCount: number, noDataFound: boolean}>}
   */
  async verifySearchResults(searchText) {
    try {
      await this.page.waitForTimeout(1000); // Wait for results to load
      
      const noDataFound = await this.isNoDataFoundMessageVisible();
      const rowCount = await this.getTableRowCount();
      
      // If no data found message is visible, there are no results
      if (noDataFound) {
        return {
          hasResults: false,
          rowCount: 0,
          noDataFound: true
        };
      }
      
      // If there are rows, check if they match the search text
      if (rowCount > 0) {
        const fileNames = await this.getFileNames();
        const matchingFiles = fileNames.filter(name => 
          name.toLowerCase().includes(searchText.toLowerCase())
        );
        
        return {
          hasResults: matchingFiles.length > 0,
          rowCount: rowCount,
          noDataFound: false,
          matchingCount: matchingFiles.length
        };
      }
      
      return {
        hasResults: false,
        rowCount: 0,
        noDataFound: false
      };
    } catch (error) {
      return {
        hasResults: false,
        rowCount: 0,
        noDataFound: false,
        error: error.message
      };
    }
  }

  /**
   * Checks if pagination controls are visible
   * @returns {Promise<{allVisible: boolean, pageNumberVisible: boolean, nextVisible: boolean, previousVisible: boolean, itemsPerPageVisible: boolean, gotoPageVisible: boolean}>}
   */
  async verifyPaginationControlsVisible() {
    try {
      const pageNumberVisible = await this.pageNumberIndicator.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Use evaluate to find Next and Previous buttons with multiple strategies
      const navigationButtons = await this.page.evaluate(() => {
        // Find Next button
        const nextSelectors = [
          'button:has-text("Next")',
          'button:has-text(">")',
          'a:has-text("Next")',
          'a:has-text(">")',
          '[aria-label*="Next"]',
          '[title*="Next"]',
          '.pagination-next',
          'button.next-page',
          'a.next-page'
        ];
        
        let nextFound = false;
        for (const selector of nextSelectors) {
          try {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null) {
              nextFound = true;
              break;
            }
          } catch (e) {}
        }
        
        // Also check for icon-based buttons
        if (!nextFound) {
          const allButtons = Array.from(document.querySelectorAll('button, a'));
          for (const btn of allButtons) {
            const icon = btn.querySelector('i.bi-chevron-right, i.bi-arrow-right, i.fa-chevron-right, i.fa-angle-right');
            if (icon && btn.offsetParent !== null) {
              nextFound = true;
              break;
            }
          }
        }
        
        // Find Previous button
        const prevSelectors = [
          'button:has-text("Previous")',
          'button:has-text("<")',
          'a:has-text("Previous")',
          'a:has-text("<")',
          '[aria-label*="Previous"]',
          '[title*="Previous"]',
          '.pagination-prev',
          'button.prev-page',
          'a.prev-page'
        ];
        
        let prevFound = false;
        for (const selector of prevSelectors) {
          try {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null) {
              prevFound = true;
              break;
            }
          } catch (e) {}
        }
        
        // Also check for icon-based buttons
        if (!prevFound) {
          const allButtons = Array.from(document.querySelectorAll('button, a'));
          for (const btn of allButtons) {
            const icon = btn.querySelector('i.bi-chevron-left, i.bi-arrow-left, i.fa-chevron-left, i.fa-angle-left');
            if (icon && btn.offsetParent !== null) {
              prevFound = true;
              break;
            }
          }
        }
        
        return { nextFound, prevFound };
      }).catch(() => ({ nextFound: false, prevFound: false }));
      
      const nextVisible = await this.nextButton.isVisible({ timeout: 3000 }).catch(() => false) || navigationButtons.nextFound;
      const previousVisible = await this.previousButton.isVisible({ timeout: 3000 }).catch(() => false) || navigationButtons.prevFound;
      
      const itemsPerPageVisible = await this.itemsPerPageDropdown.isVisible({ timeout: 3000 }).catch(() => false);
      
      // Use evaluate to find Goto page input
      const gotoPageFound = await this.page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input[type="number"], input[type="text"]'));
        for (const input of inputs) {
          const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
          const name = (input.getAttribute('name') || '').toLowerCase();
          const id = (input.getAttribute('id') || '').toLowerCase();
          if (placeholder.includes('goto') || placeholder.includes('go to') || placeholder.includes('page') ||
              name.includes('page') || id.includes('page') || id.includes('goto')) {
            if (input.offsetParent !== null) {
              return true;
            }
          }
        }
        return false;
      }).catch(() => false);
      
      const gotoPageVisible = await this.gotoPageInput.isVisible({ timeout: 3000 }).catch(() => false) || gotoPageFound;
      
      // Note: Next/Previous buttons may not be visible if there's only one page
      // Items per page and page number indicator are more critical
      const criticalVisible = pageNumberVisible && itemsPerPageVisible;
      
      return {
        allVisible: criticalVisible && (nextVisible || previousVisible), // At least one navigation button should exist
        pageNumberVisible,
        nextVisible,
        previousVisible,
        itemsPerPageVisible,
        gotoPageVisible
      };
    } catch (error) {
      return {
        allVisible: false,
        pageNumberVisible: false,
        nextVisible: false,
        previousVisible: false,
        itemsPerPageVisible: false,
        gotoPageVisible: false
      };
    }
  }

  /**
   * Gets the current page number
   * @returns {Promise<number>}
   */
  async getCurrentPageNumber() {
    try {
      // Strategy 1: Get from active page number element (most reliable)
      try {
        const activePage = this.page.locator('span.page-number.active, .page-number.active, .pagination .active, .pagination .page-item.active, .pagination button.active').first();
        const activePageText = await activePage.textContent({ timeout: 3000 });
        if (activePageText) {
          const match = activePageText.trim().match(/^\s*(\d+)\s*$/);
          if (match) {
            return parseInt(match[1]);
          }
        }
      } catch (error) {
        // Strategy 1 failed
      }
      
      // Strategy 2: Get from goto page input (ng-reflect-model or value)
      try {
        const gotoInput = this.page.locator('input[type="number"][placeholder*="Page"], input.goto-input, input[ng-reflect-model]').first();
        const gotoValue = await gotoInput.inputValue({ timeout: 3000 }).catch(async () => {
          // Try getting from ng-reflect-model attribute
          const modelValue = await gotoInput.getAttribute('ng-reflect-model');
          return modelValue;
        });
        if (gotoValue && gotoValue.trim() !== '') {
          const pageNum = parseInt(gotoValue.trim());
          if (!isNaN(pageNum) && pageNum > 0) {
            return pageNum;
          }
        }
      } catch (error) {
        // Strategy 2 failed
      }
      
      // Strategy 3: Use evaluate to find active page number
      const pageNumber = await this.page.evaluate(() => {
        // First, look for active page number span
        const activePageSpans = Array.from(document.querySelectorAll('span.page-number.active, .page-number.active'));
        for (const span of activePageSpans) {
          const text = (span.textContent || '').trim();
          const match = text.match(/^\s*(\d+)\s*$/);
          if (match) {
            return parseInt(match[1]);
          }
        }
        
        // Second, check goto page input
        const gotoInputs = Array.from(document.querySelectorAll('input[type="number"][placeholder*="Page"], input.goto-input'));
        for (const input of gotoInputs) {
          const value = input.value || input.getAttribute('ng-reflect-model') || '';
          if (value.trim() !== '') {
            const pageNum = parseInt(value.trim());
            if (!isNaN(pageNum) && pageNum > 0) {
              return pageNum;
            }
          }
        }
        
        // Third, look for active page in pagination
        const activePage = document.querySelector('.pagination .active, .pagination .page-item.active, .pagination button.active, .pagination a.active');
        if (activePage) {
          const text = (activePage.textContent || '').trim();
          const match = text.match(/^\s*(\d+)\s*$/);
          if (match) {
            return parseInt(match[1]);
          }
        }
        
        return 1; // Default to page 1
      });
      
      return pageNumber || 1;
    } catch (error) {
      return 1; // Default to page 1
    }
  }

  /**
   * Gets the current items per page value
   * @returns {Promise<number>}
   */
  async getItemsPerPage() {
    try {
      const value = await this.itemsPerPageDropdown.inputValue().catch(async () => {
        // Try getting selected option text
        const selectedOption = await this.itemsPerPageDropdown.locator('option:checked, option[selected]').textContent().catch(() => '');
        return selectedOption.trim();
      });
      
      if (typeof value === 'string') {
        const match = value.match(/(\d+)/);
        return match ? parseInt(match[1]) : 10;
      }
      
      return parseInt(value) || 10;
    } catch (error) {
      // Fallback: use evaluate
      return await this.page.evaluate(() => {
        const select = document.querySelector('select[aria-label*="Items per page"], select.items-per-page, select');
        if (select) {
          const selectedValue = select.value || select.options[select.selectedIndex]?.value || select.options[select.selectedIndex]?.textContent;
          const match = selectedValue.match(/(\d+)/);
          return match ? parseInt(match[1]) : 10;
        }
        return 10;
      });
    }
  }

  /**
   * Gets the total number of pages
   * @returns {Promise<number>}
   */
  async getTotalPages() {
    try {
      const paginationText = await this.paginationInfo.textContent({ timeout: 3000 }).catch(() => '');
      if (paginationText) {
        // Look for patterns like "of 5", "Page 1 of 5", etc.
        const match = paginationText.match(/of\s+(\d+)|(\d+)\s+pages?/i);
        if (match) {
          return parseInt(match[1] || match[2]);
        }
      }
      
      // Fallback: calculate from row count and items per page
      const rowCount = await this.getTableRowCount();
      const itemsPerPage = await this.getItemsPerPage();
      if (rowCount > 0 && itemsPerPage > 0) {
        // We need total count, not just current page count
        // This is a simplified calculation
        return Math.ceil(rowCount / itemsPerPage);
      }
      
      return 1;
    } catch (error) {
      return 1;
    }
  }

  /**
   * Clicks the Next button
   */
  async clickNextButton() {
    try {
      await this.nextButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.nextButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.nextButton.click();
      await this.page.waitForTimeout(1500); // Wait for page to load
    } catch (error) {
      throw new Error(`Failed to click Next button: ${error.message}`);
    }
  }

  /**
   * Clicks the Previous button
   */
  async clickPreviousButton() {
    try {
      await this.previousButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.previousButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.previousButton.click();
      await this.page.waitForTimeout(1500); // Wait for page to load
    } catch (error) {
      throw new Error(`Failed to click Previous button: ${error.message}`);
    }
  }

  /**
   * Checks if Next button is disabled
   * @returns {Promise<boolean>}
   */
  async isNextButtonDisabled() {
    try {
      const disabled = await this.nextButton.getAttribute('disabled');
      if (disabled !== null) {
        return true;
      }
      
      // Check for disabled class
      const hasDisabledClass = await this.nextButton.evaluate(el => {
        return el.classList.contains('disabled') || 
               el.classList.contains('pagination-disabled') ||
               el.hasAttribute('disabled') ||
               el.getAttribute('aria-disabled') === 'true';
      });
      
      return hasDisabledClass;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Previous button is disabled
   * @returns {Promise<boolean>}
   */
  async isPreviousButtonDisabled() {
    try {
      const disabled = await this.previousButton.getAttribute('disabled');
      if (disabled !== null) {
        return true;
      }
      
      // Check for disabled class
      const hasDisabledClass = await this.previousButton.evaluate(el => {
        return el.classList.contains('disabled') || 
               el.classList.contains('pagination-disabled') ||
               el.hasAttribute('disabled') ||
               el.getAttribute('aria-disabled') === 'true';
      });
      
      return hasDisabledClass;
    } catch (error) {
      return false;
    }
  }

  /**
   * Changes items per page value
   * @param {number} itemsPerPage - Number of items per page (e.g., 10, 25, 50)
   */
  async changeItemsPerPage(itemsPerPage) {
    try {
      await this.itemsPerPageDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.itemsPerPageDropdown.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Try selecting by value first
      try {
        await this.itemsPerPageDropdown.selectOption(String(itemsPerPage));
      } catch (error) {
        // If that fails, try selecting by label
        await this.itemsPerPageDropdown.selectOption({ label: String(itemsPerPage) });
      }
      
      await this.page.waitForTimeout(2000); // Wait for pagination to recalculate
    } catch (error) {
      throw new Error(`Failed to change items per page: ${error.message}`);
    }
  }

  /**
   * Gets available items per page options
   * @returns {Promise<number[]>}
   */
  async getItemsPerPageOptions() {
    try {
      return await this.page.evaluate(() => {
        const select = document.querySelector('select[aria-label*="Items per page"], select.items-per-page, select');
        if (select) {
          const options = Array.from(select.options);
          return options.map(opt => {
            const text = opt.textContent || opt.value;
            const match = text.match(/(\d+)/);
            return match ? parseInt(match[1]) : null;
          }).filter(val => val !== null);
        }
        return [10, 25, 50, 100]; // Default options
      });
    } catch (error) {
      return [10, 25, 50, 100];
    }
  }

  /**
   * Enters page number in Goto page field and presses Enter
   * @param {number} pageNumber - Page number to navigate to
   */
  async gotoPage(pageNumber) {
    try {
      await this.gotoPageInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.gotoPageInput.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.gotoPageInput.clear();
      await this.page.waitForTimeout(200);
      await this.gotoPageInput.fill(String(pageNumber));
      await this.page.waitForTimeout(300);
      await this.gotoPageInput.press('Enter');
      await this.page.waitForTimeout(1500); // Wait for navigation
    } catch (error) {
      throw new Error(`Failed to goto page ${pageNumber}: ${error.message}`);
    }
  }

  /**
   * Verifies default pagination state
   * @returns {Promise<{pageNumber: number, itemsPerPage: number, hasFiles: boolean}>}
   */
  async verifyDefaultPaginationState() {
    try {
      const pageNumber = await this.getCurrentPageNumber();
      const itemsPerPage = await this.getItemsPerPage();
      const rowCount = await this.getTableRowCount();
      const hasFiles = rowCount > 0;
      
      return {
        pageNumber,
        itemsPerPage,
        hasFiles,
        rowCount
      };
    } catch (error) {
      return {
        pageNumber: 1,
        itemsPerPage: 10,
        hasFiles: false,
        rowCount: 0,
        error: error.message
      };
    }
  }

  /**
   * Clicks on New Directory option from file operations dropdown
   */
  async clickNewDirectoryOption() {
    try {
      await this.newDirectoryOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.newDirectoryOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.newDirectoryOption.click();
      await this.page.waitForTimeout(1000); // Wait for modal/input to appear
    } catch (error) {
      throw new Error(`Failed to click New Directory option: ${error.message}`);
    }
  }

  /**
   * Checks if New Directory input field is visible (in table first column)
   * @returns {Promise<boolean>}
   */
  async isNewDirectoryModalVisible() {
    try {
      // Check for modal first
      const modalVisible = await this.newDirectoryModal.isVisible({ timeout: 2000 }).catch(() => false);
      if (modalVisible) {
        return true;
      }
      
      // Check for input field in table first column (inline editing)
      const inputInTable = await this.page.evaluate(() => {
        // Look for input in the first data row, first column (after checkbox column)
        const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
        if (rows.length > 0) {
          const firstRow = rows[0];
          const cells = firstRow.querySelectorAll('td');
          // First column might be checkbox, so check second column (index 1) or first if no checkbox
          for (let i = 0; i < Math.min(2, cells.length); i++) {
            const cell = cells[i];
            const input = cell.querySelector('input[type="text"], input:not([type="checkbox"])');
            if (input && input.offsetParent !== null) {
              return true;
            }
          }
        }
        return false;
      });
      
      if (inputInTable) {
        return true;
      }
      
      // Check for standalone input field
      const inputVisible = await this.newDirectoryInput.isVisible({ timeout: 2000 }).catch(() => false);
      return inputVisible;
    } catch (error) {
      return false;
    }
  }

  /**
   * Enters directory name in the input field (in table first column)
   * @param {string} directoryName - The name of the directory to create
   */
  async enterDirectoryName(directoryName) {
    try {
      await this.page.waitForTimeout(1000); // Wait for input to appear
      
      // Strategy 1: Try using table input locator (most direct)
      let inputFound = false;
      try {
        await this.tableNewDirectoryInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.tableNewDirectoryInput.clear();
        await this.page.waitForTimeout(200);
        await this.tableNewDirectoryInput.fill(directoryName);
        await this.page.waitForTimeout(300);
        inputFound = true;
      } catch (error) {
        // Strategy 1 failed, try next
      }
      
      // Strategy 2: Try finding input in table first column using evaluate
      if (!inputFound) {
        try {
          const inputInTable = await this.page.evaluate((dirName) => {
            // Look for input in the first data row, File Name column
            const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
            if (rows.length > 0) {
              const firstRow = rows[0];
              const cells = firstRow.querySelectorAll('td');
              // Find the File Name column (usually second column after checkbox, or first if no checkbox)
              for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input && input.offsetParent !== null) {
                  // Focus and enter the directory name
                  input.focus();
                  input.value = '';
                  input.value = dirName;
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                  return true;
                }
              }
            }
            return false;
          }, directoryName);
          
          if (inputInTable) {
            inputFound = true;
            await this.page.waitForTimeout(300);
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }
      
      // Strategy 3: Try modal input
      if (!inputFound) {
        try {
          await this.newDirectoryInput.waitFor({ state: 'visible', timeout: 5000 });
          await this.newDirectoryInput.clear();
          await this.page.waitForTimeout(200);
          await this.newDirectoryInput.fill(directoryName);
          await this.page.waitForTimeout(300);
          inputFound = true;
        } catch (error) {
          // Strategy 3 failed
        }
      }
      
      if (!inputFound) {
        throw new Error('Could not find directory name input field in table');
      }
    } catch (error) {
      throw new Error(`Failed to enter directory name: ${error.message}`);
    }
  }

  /**
   * Submits the directory creation (presses Enter on the input field in table)
   */
  async submitDirectoryCreation() {
    try {
      // Strategy 1: Press Enter on table input using locator
      let submitted = false;
      try {
        await this.tableNewDirectoryInput.waitFor({ state: 'visible', timeout: 3000 });
        await this.tableNewDirectoryInput.press('Enter');
        submitted = true;
        await this.page.waitForTimeout(1500);
      } catch (error) {
        // Strategy 1 failed, try next
      }
      
      // Strategy 2: Press Enter on input in table first column using evaluate
      if (!submitted) {
        try {
          const enterPressed = await this.page.evaluate(() => {
            // Find input in first row, File Name column
            const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
            if (rows.length > 0) {
              const firstRow = rows[0];
              const cells = firstRow.querySelectorAll('td');
              for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input && input.offsetParent !== null && input.value) {
                  // Press Enter on the input
                  const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true });
                  input.dispatchEvent(enterEvent);
                  const enterEvent2 = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
                  input.dispatchEvent(enterEvent2);
                  // Also trigger keypress for compatibility
                  const enterEvent3 = new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
                  input.dispatchEvent(enterEvent3);
                  return true;
                }
              }
            }
            return false;
          });
          
          if (enterPressed) {
            submitted = true;
            await this.page.waitForTimeout(1500);
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }
      
      // Strategy 3: Try pressing Enter on modal input
      if (!submitted) {
        try {
          await this.newDirectoryInput.waitFor({ state: 'visible', timeout: 2000 });
          await this.newDirectoryInput.press('Enter');
          submitted = true;
          await this.page.waitForTimeout(1500);
        } catch (error) {
          // Strategy 3 failed
        }
      }
      
      // Strategy 4: Try clicking submit button if modal is visible
      if (!submitted) {
        const modalStillVisible = await this.newDirectoryModal.isVisible({ timeout: 1000 }).catch(() => false);
        if (modalStillVisible) {
          const submitVisible = await this.newDirectorySubmitButton.isVisible({ timeout: 2000 }).catch(() => false);
          if (submitVisible) {
            await this.newDirectorySubmitButton.click();
            submitted = true;
            await this.page.waitForTimeout(1500);
          }
        }
      }
      
      if (!submitted) {
        throw new Error('Could not submit directory creation');
      }
    } catch (error) {
      throw new Error(`Failed to submit directory creation: ${error.message}`);
    }
  }

  /**
   * Verifies if a directory exists in the table by name
   * @param {string} directoryName - The name of the directory to check
   * @returns {Promise<boolean>}
   */
  async verifyDirectoryExistsInTable(directoryName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1; // Default to second column (usually File Name is second after checkbox)
      });

      // Check if directory name exists in the table
      const directoryExists = await this.page.evaluate(({ colIndex, dirName }) => {
        const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length > colIndex) {
            const cellText = (cells[colIndex].textContent || '').trim();
            // Check if it matches the directory name (exact match or contains)
            if (cellText === dirName || cellText.includes(dirName)) {
              // Also check if it's a directory (might have folder icon or specific class)
              const hasFolderIcon = cells[colIndex].querySelector('i.bi-folder, i.fa-folder, [class*="folder"]');
              return true; // Found matching name
            }
          }
        }
        return false;
      }, { colIndex: columnIndex, dirName: directoryName });

      return directoryExists;
    } catch (error) {
      console.error('Error verifying directory exists:', error);
      return false;
    }
  }

  /**
   * Gets all directory names from the table
   * @returns {Promise<string[]>} Array of directory names
   */
  async getDirectoryNames() {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1;
      });

      // Get all directory names (items with folder icon or directory indicator)
      const directoryNames = await this.page.evaluate(({ colIndex }) => {
        const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
        const dirNames = [];
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length > colIndex) {
            const cell = cells[colIndex];
            const cellText = (cell.textContent || '').trim();
            // Check if it's a directory (has folder icon or specific indicator)
            const hasFolderIcon = cell.querySelector('i.bi-folder, i.fa-folder, [class*="folder"]');
            // Or check if row/cell has directory class
            const isDirectory = row.classList.contains('directory') || cell.classList.contains('directory');
            
            if (cellText && (hasFolderIcon || isDirectory)) {
              // Extract just the name (remove icon text if any)
              const name = cellText.replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
              if (name && name !== 'No data found') {
                dirNames.push(name);
              }
            }
          }
        }
        return dirNames;
      }, { colIndex: columnIndex });

      return directoryNames;
    } catch (error) {
      console.error('Error getting directory names:', error);
      return [];
    }
  }

  /**
   * Clicks on New Blank File option from file operations dropdown
   */
  async clickNewBlankFileOption() {
    try {
      await this.newBlankFileOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.newBlankFileOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.newBlankFileOption.click();
      await this.page.waitForTimeout(1000); // Wait for input field to appear
    } catch (error) {
      throw new Error(`Failed to click New Blank File option: ${error.message}`);
    }
  }

  /**
   * Enters file name in the input field (in table file name column)
   * @param {string} fileName - The name of the file to create
   */
  async enterFileName(fileName) {
    try {
      await this.page.waitForTimeout(1000); // Wait for input to appear
      
      // Strategy 1: Try using table input locator (most direct)
      let inputFound = false;
      try {
        await this.tableNewDirectoryInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.tableNewDirectoryInput.clear();
        await this.page.waitForTimeout(200);
        await this.tableNewDirectoryInput.fill(fileName);
        await this.page.waitForTimeout(300);
        inputFound = true;
      } catch (error) {
        // Strategy 1 failed, try next
      }
      
      // Strategy 2: Try finding input in table file name column using evaluate
      if (!inputFound) {
        try {
          const inputInTable = await this.page.evaluate((fName) => {
            // Look for input in the first data row, File Name column
            const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
            if (rows.length > 0) {
              const firstRow = rows[0];
              const cells = firstRow.querySelectorAll('td');
              // Find the File Name column (usually second column after checkbox, or first if no checkbox)
              for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input && input.offsetParent !== null) {
                  // Focus and enter the file name
                  input.focus();
                  input.value = '';
                  input.value = fName;
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                  return true;
                }
              }
            }
            return false;
          }, fileName);
          
          if (inputInTable) {
            inputFound = true;
            await this.page.waitForTimeout(300);
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }
      
      // Strategy 3: Try modal input
      if (!inputFound) {
        try {
          await this.newDirectoryInput.waitFor({ state: 'visible', timeout: 5000 });
          await this.newDirectoryInput.clear();
          await this.page.waitForTimeout(200);
          await this.newDirectoryInput.fill(fileName);
          await this.page.waitForTimeout(300);
          inputFound = true;
        } catch (error) {
          // Strategy 3 failed
        }
      }
      
      if (!inputFound) {
        throw new Error('Could not find file name input field in table');
      }
    } catch (error) {
      throw new Error(`Failed to enter file name: ${error.message}`);
    }
  }

  /**
   * Submits the file creation (presses Enter on the input field in table)
   */
  async submitFileCreation() {
    try {
      // Strategy 1: Press Enter on table input using locator
      let submitted = false;
      try {
        await this.tableNewDirectoryInput.waitFor({ state: 'visible', timeout: 3000 });
        await this.tableNewDirectoryInput.press('Enter');
        submitted = true;
        await this.page.waitForTimeout(1500);
      } catch (error) {
        // Strategy 1 failed, try next
      }
      
      // Strategy 2: Press Enter on input in table file name column using evaluate
      if (!submitted) {
        try {
          const enterPressed = await this.page.evaluate(() => {
            // Find input in first row, File Name column
            const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
            if (rows.length > 0) {
              const firstRow = rows[0];
              const cells = firstRow.querySelectorAll('td');
              for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input && input.offsetParent !== null && input.value) {
                  // Press Enter on the input
                  const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true });
                  input.dispatchEvent(enterEvent);
                  const enterEvent2 = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
                  input.dispatchEvent(enterEvent2);
                  // Also trigger keypress for compatibility
                  const enterEvent3 = new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
                  input.dispatchEvent(enterEvent3);
                  return true;
                }
              }
            }
            return false;
          });
          
          if (enterPressed) {
            submitted = true;
            await this.page.waitForTimeout(1500);
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }
      
      // Strategy 3: Try pressing Enter on modal input
      if (!submitted) {
        try {
          await this.newDirectoryInput.waitFor({ state: 'visible', timeout: 2000 });
          await this.newDirectoryInput.press('Enter');
          submitted = true;
          await this.page.waitForTimeout(1500);
        } catch (error) {
          // Strategy 3 failed
        }
      }
      
      // Strategy 4: Try clicking submit button if modal is visible
      if (!submitted) {
        const modalStillVisible = await this.newDirectoryModal.isVisible({ timeout: 1000 }).catch(() => false);
        if (modalStillVisible) {
          const submitVisible = await this.newDirectorySubmitButton.isVisible({ timeout: 2000 }).catch(() => false);
          if (submitVisible) {
            await this.newDirectorySubmitButton.click();
            submitted = true;
            await this.page.waitForTimeout(1500);
          }
        }
      }
      
      if (!submitted) {
        throw new Error('Could not submit file creation');
      }
    } catch (error) {
      throw new Error(`Failed to submit file creation: ${error.message}`);
    }
  }

  /**
   * Verifies if a file exists in the table by name
   * @param {string} fileName - The name of the file to check
   * @returns {Promise<boolean>}
   */
  async verifyFileExistsInTable(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1; // Default to second column (usually File Name is second after checkbox)
      });

      // Check if file name exists in the table
      const fileExists = await this.page.evaluate(({ colIndex, fName }) => {
        const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length > colIndex) {
            const cellText = (cells[colIndex].textContent || '').trim();
            // Check if it matches the file name (exact match or contains)
            if (cellText === fName || cellText.includes(fName)) {
              return true; // Found matching name
            }
          }
        }
        return false;
      }, { colIndex: columnIndex, fName: fileName });

      return fileExists;
    } catch (error) {
      console.error('Error verifying file exists:', error);
      return false;
    }
  }

  /**
   * Counts the number of files with a specific name in the table
   * Handles copied files with pattern: filename(n).extension where n is the copy number
   * @param {string} fileName - The name of the file to count (e.g., "Career Growth.png")
   * @returns {Promise<number>} Number of files with the given name (including copies)
   */
  async countFilesWithName(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1; // Default to second column (usually File Name is second after checkbox)
      });

      // Extract base name and extension from fileName
      // Example: "Career Growth.png" -> baseName: "Career Growth", extension: ".png"
      const lastDotIndex = fileName.lastIndexOf('.');
      const baseName = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
      const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';

      // Count files with matching name (including copies with pattern filename(n).extension)
      const count = await this.page.evaluate(({ colIndex, baseName, extension, originalName }) => {
        const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
        let matchCount = 0;
        
        // Create regex pattern to match:
        // 1. Exact match: "Career Growth.png"
        // 2. Copy pattern: "Career Growth (1).png", "Career Growth (2).png", etc.
        const baseNameEscaped = baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const extensionEscaped = extension.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Pattern: baseName (optional number).extension
        // Matches: "Career Growth.png" or "Career Growth (1).png" or "Career Growth (2).png"
        const exactPattern = new RegExp(`^${baseNameEscaped}${extensionEscaped}$`);
        const copyPattern = new RegExp(`^${baseNameEscaped}\\s*\\(\\d+\\)${extensionEscaped}$`);
        
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length > colIndex) {
            const cellText = (cells[colIndex].textContent || '').trim();
            
            // Check for exact match
            if (cellText === originalName) {
              matchCount++;
            }
            // Check for copy pattern (filename(n).extension)
            else if (copyPattern.test(cellText)) {
              matchCount++;
            }
            // Also check if it starts with base name and ends with extension (fallback)
            else if (cellText.startsWith(baseName) && cellText.endsWith(extension)) {
              matchCount++;
            }
          }
        }
        return matchCount;
      }, { colIndex: columnIndex, baseName: baseName, extension: extension, originalName: fileName });

      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return 0;
    }
  }

  /**
   * Clicks on Upload option from file operations dropdown
   */
  async clickUploadOption() {
    try {
      await this.uploadOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.uploadOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.uploadOption.click();
      await this.page.waitForTimeout(1000); // Wait for modal to appear
    } catch (error) {
      throw new Error(`Failed to click Upload option: ${error.message}`);
    }
  }

  /**
   * Checks if Upload modal is visible
   * @returns {Promise<boolean>}
   */
  async isUploadModalVisible() {
    try {
      return await this.uploadModal.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks on "Upload Files" button in the upload modal
   */
  async clickUploadFilesButton() {
    try {
      // Wait for modal to be fully loaded
      await this.uploadModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000); // Give modal time to fully render
      
      // Try multiple locator strategies - note: it's a <label>, not a <button>
      const buttonLocators = [
        // Label-based locators (primary - based on actual HTML)
        this.page.locator('label:has-text("Upload Files")').first(),
        this.page.locator('label.btn:has-text("Upload Files")').first(),
        this.page.locator('label.btn-sm.btn-outline-primary:has-text("Upload Files")').first(),
        this.page.locator('label:has(i.bi-file-earmark):has-text("Upload Files")').first(),
        this.page.locator('.upload-type-buttons label:has-text("Upload Files")').first(),
        this.uploadModal.locator('label:has-text("Upload Files")').first(),
        // Button-based locators (fallback)
        this.page.locator('button:has-text("Upload Files")').first(),
        this.page.locator('.upload-type-btn:has-text("Upload Files")').first(),
        this.page.locator('button[aria-label*="Upload Files"]').first(),
        this.page.locator('.modal button:has-text("Upload Files")').first(),
        // Case-insensitive fallback
        this.page.locator('label').filter({ hasText: /Upload Files/i }).first(),
        this.page.locator('button').filter({ hasText: /Upload Files/i }).first()
      ];
      
      let clicked = false;
      for (const locator of buttonLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await locator.click({ timeout: 5000 });
            clicked = true;
            break;
          }
        } catch (error) {
          // Try next locator
          continue;
        }
      }
      
      if (!clicked) {
        // Last resort: try to find any label or button with "Files" text
        const filesElement = this.page.locator('label, button').filter({ hasText: /Upload Files/i }).first();
        const isVisible = await filesElement.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await filesElement.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          await filesElement.click({ timeout: 5000 });
          clicked = true;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find Upload Files button in modal');
      }
      
      await this.page.waitForTimeout(1000); // Wait for file input to be activated
    } catch (error) {
      throw new Error(`Failed to click Upload Files button: ${error.message}`);
    }
  }

  /**
   * Uploads a file by setting the file input
   * @param {string} filePath - Path to the file to upload (relative to project root or absolute path)
   */
  async uploadFile(filePath) {
    try {
      await this.page.waitForTimeout(1000); // Wait for input to be ready after clicking Upload Files button
      
      // Strategy 1: Try using the uploadFilesInput locator (for files, not folders or zip)
      let fileUploaded = false;
      try {
        // File inputs are hidden, so wait for 'attached' state
        await this.uploadFilesInput.waitFor({ state: 'attached', timeout: 5000 });
        await this.uploadFilesInput.setInputFiles(filePath);
        fileUploaded = true;
        await this.page.waitForTimeout(1000);
      } catch (error) {
        // Strategy 1 failed, try next
      }

      // Strategy 2: Try finding the correct file input by iterating through all inputs
      if (!fileUploaded) {
        try {
          const allFileInputs = this.page.locator('input[type="file"]');
          const count = await allFileInputs.count();
          
          for (let i = 0; i < count; i++) {
            const input = allFileInputs.nth(i);
            try {
              // Check if this is the files input (not folder, not zip)
              const isFolder = await input.evaluate(el => el.hasAttribute('webkitdirectory'));
              const accept = await input.getAttribute('accept').catch(() => '');
              const isZip = accept && accept.includes('zip');
              
              if (!isFolder && !isZip) {
                // This is the files input
                await input.waitFor({ state: 'attached', timeout: 3000 });
                await input.setInputFiles(filePath);
                fileUploaded = true;
                await this.page.waitForTimeout(1000);
                break;
              }
            } catch (error) {
              // Skip this input and try next
              continue;
            }
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }

      // Strategy 3: Try clicking dropzone browse link to trigger file input
      if (!fileUploaded) {
        try {
          const dropzoneVisible = await this.uploadDropzone.isVisible({ timeout: 3000 }).catch(() => false);
          if (dropzoneVisible) {
            // Click on the dropzone browse link to trigger file input
            await this.dropzoneBrowseLink.click();
            await this.page.waitForTimeout(1000);
            
            // Now try to set the file input
            await this.uploadFilesInput.waitFor({ state: 'attached', timeout: 3000 });
            await this.uploadFilesInput.setInputFiles(filePath);
            fileUploaded = true;
            await this.page.waitForTimeout(1000);
          }
        } catch (error) {
          // Strategy 3 failed
        }
      }

      // Strategy 4: Try clicking the dropzone area itself
      if (!fileUploaded) {
        try {
          const dropzoneVisible = await this.uploadDropzone.isVisible({ timeout: 3000 }).catch(() => false);
          if (dropzoneVisible) {
            // Click on the dropzone area to trigger file input
            await this.uploadDropzone.click();
            await this.page.waitForTimeout(1000);
            
            // Try all file inputs again
            const allFileInputs = this.page.locator('input[type="file"]');
            const count = await allFileInputs.count();
            
            for (let i = 0; i < count; i++) {
              const input = allFileInputs.nth(i);
              try {
                const isFolder = await input.evaluate(el => el.hasAttribute('webkitdirectory'));
                const accept = await input.getAttribute('accept').catch(() => '');
                const isZip = accept && accept.includes('zip');
                
                if (!isFolder && !isZip) {
                  await input.setInputFiles(filePath);
                  fileUploaded = true;
                  await this.page.waitForTimeout(1000);
                  break;
                }
              } catch (error) {
                continue;
              }
            }
          }
        } catch (error) {
          // Strategy 4 failed
        }
      }

      if (!fileUploaded) {
        throw new Error('Could not find file input to upload file. Make sure Upload Files button was clicked first.');
      }
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Clicks on "Confirm Upload" button in the upload modal
   */
  async clickConfirmUploadButton() {
    try {
      await this.confirmUploadButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.confirmUploadButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.confirmUploadButton.click();
      await this.page.waitForTimeout(2000); // Wait for upload to complete and modal to close
    } catch (error) {
      throw new Error(`Failed to click Confirm Upload button: ${error.message}`);
    }
  }

  /**
   * Closes the upload modal by clicking Cancel or Close button
   */
  async closeUploadModal() {
    try {
      // Try Cancel button first
      const cancelVisible = await this.cancelUploadButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (cancelVisible) {
        await this.cancelUploadButton.click();
        await this.page.waitForTimeout(500);
        return;
      }

      // Try Close button
      const closeVisible = await this.uploadModalCloseButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (closeVisible) {
        await this.uploadModalCloseButton.click();
        await this.page.waitForTimeout(500);
        return;
      }

      // Try pressing Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors when closing
    }
  }

  /**
   * Clicks on Upload option from file operations dropdown
   */
  async clickUploadOption() {
    try {
      await this.uploadOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.uploadOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.uploadOption.click();
      await this.page.waitForTimeout(1000); // Wait for modal to appear
    } catch (error) {
      throw new Error(`Failed to click Upload option: ${error.message}`);
    }
  }

  /**
   * Checks if upload modal is visible
   * @returns {Promise<boolean>}
   */
  async isUploadModalVisible() {
    try {
      return await this.uploadModal.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks on Upload Folder button in the modal
   */
  async clickUploadFolderButton() {
    try {
      // Wait for modal to be fully loaded
      await this.uploadModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000); // Give modal time to fully render
      
      // Try multiple locator strategies - note: it's a <label>, not a <button>
      const buttonLocators = [
        // Label-based locators (primary - based on actual HTML)
        this.page.locator('label:has-text("Upload Folder")').first(),
        this.page.locator('label.btn:has-text("Upload Folder")').first(),
        this.page.locator('label.btn-sm.btn-outline-primary:has-text("Upload Folder")').first(),
        this.page.locator('label:has(i.bi-folder):has-text("Upload Folder")').first(),
        this.page.locator('.upload-type-buttons label:has-text("Upload Folder")').first(),
        this.uploadModal.locator('label:has-text("Upload Folder")').first(),
        // Button-based locators (fallback)
        this.page.locator('button:has-text("Upload Folder")').first(),
        this.page.locator('.upload-type-btn:has-text("Upload Folder")').first(),
        this.page.locator('button[aria-label*="Upload Folder"]').first(),
        this.page.locator('.modal button:has-text("Upload Folder")').first(),
        this.page.locator('button:has(i.bi-folder):has-text("Upload Folder")').first(),
        // Case-insensitive fallback
        this.page.locator('label').filter({ hasText: /Upload Folder/i }).first(),
        this.page.locator('button').filter({ hasText: /Upload Folder/i }).first()
      ];
      
      let clicked = false;
      for (const locator of buttonLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await locator.click({ timeout: 5000 });
            clicked = true;
            break;
          }
        } catch (error) {
          // Try next locator
          continue;
        }
      }
      
      if (!clicked) {
        // Last resort: try to find any label or button with "Folder" text
        const folderElement = this.page.locator('label, button').filter({ hasText: /Folder/i }).first();
        const isVisible = await folderElement.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await folderElement.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          await folderElement.click({ timeout: 5000 });
          clicked = true;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find Upload Folder button in modal');
      }
      
      await this.page.waitForTimeout(1000); // Wait for folder input to be activated
    } catch (error) {
      throw new Error(`Failed to click Upload Folder button: ${error.message}`);
    }
  }

  /**
   * Clicks on Upload Zip button in the modal
   */
  async clickUploadZipButton() {
    try {
      // Wait for modal to be fully loaded
      await this.uploadModal.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000); // Give modal time to fully render
      
      // Try multiple locator strategies - note: it's a <label>, not a <button>
      const buttonLocators = [
        // Label-based locators (primary - based on actual HTML)
        this.page.locator('label:has-text("Upload Zip")').first(),
        this.page.locator('label.btn:has-text("Upload Zip")').first(),
        this.page.locator('label.btn-sm.btn-outline-primary:has-text("Upload Zip")').first(),
        this.page.locator('label:has(i.bi-file-zip):has-text("Upload Zip")').first(),
        this.page.locator('.upload-type-buttons label:has-text("Upload Zip")').first(),
        this.uploadModal.locator('label:has-text("Upload Zip")').first(),
        // Button-based locators (fallback)
        this.page.locator('button:has-text("Upload Zip")').first(),
        this.page.locator('.upload-type-btn:has-text("Upload Zip")').first(),
        this.page.locator('button[aria-label*="Upload Zip"]').first(),
        this.page.locator('.modal button:has-text("Upload Zip")').first(),
        // Case-insensitive fallback
        this.page.locator('label').filter({ hasText: /Upload Zip/i }).first(),
        this.page.locator('button').filter({ hasText: /Upload Zip/i }).first()
      ];
      
      let clicked = false;
      for (const locator of buttonLocators) {
        try {
          const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await locator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await locator.click({ timeout: 5000 });
            clicked = true;
            break;
          }
        } catch (error) {
          // Try next locator
          continue;
        }
      }
      
      if (!clicked) {
        // Last resort: try to find any label or button with "Zip" text
        const zipElement = this.page.locator('label, button').filter({ hasText: /Upload Zip/i }).first();
        const isVisible = await zipElement.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          await zipElement.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(300);
          await zipElement.click({ timeout: 5000 });
          clicked = true;
        }
      }
      
      if (!clicked) {
        throw new Error('Could not find Upload Zip button in modal');
      }
      
      await this.page.waitForTimeout(1000); // Wait for zip input to be activated
    } catch (error) {
      throw new Error(`Failed to click Upload Zip button: ${error.message}`);
    }
  }

  /**
   * Uploads a folder by selecting it from the file system
   * @param {string} folderPath - Path to the folder to upload
   */
  async uploadFolder(folderPath) {
    try {
      await this.page.waitForTimeout(1000); // Wait for input to be ready after clicking Upload Folder button
      
      // Strategy 1: Try using the uploadFolderInput locator (for folders with webkitdirectory)
      let folderUploaded = false;
      try {
        // Folder inputs are hidden, so wait for 'attached' state
        await this.uploadFolderInput.waitFor({ state: 'attached', timeout: 5000 });
        await this.uploadFolderInput.setInputFiles(folderPath);
        folderUploaded = true;
        await this.page.waitForTimeout(1000);
      } catch (error) {
        // Strategy 1 failed, try next
      }

      // Strategy 2: Try finding the correct folder input by iterating through all inputs
      if (!folderUploaded) {
        try {
          const allFileInputs = this.page.locator('input[type="file"]');
          const count = await allFileInputs.count();
          
          for (let i = 0; i < count; i++) {
            const input = allFileInputs.nth(i);
            try {
              // Check if this is the folder input (has webkitdirectory attribute)
              const isFolder = await input.evaluate(el => el.hasAttribute('webkitdirectory'));
              
              if (isFolder) {
                // This is the folder input
                await input.waitFor({ state: 'attached', timeout: 3000 });
                await input.setInputFiles(folderPath);
                folderUploaded = true;
                await this.page.waitForTimeout(1000);
                break;
              }
            } catch (error) {
              // Skip this input and try next
              continue;
            }
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }

      // Strategy 3: Try using file chooser API as fallback (for native dialogs)
      if (!folderUploaded) {
        try {
          // Set up file chooser listener BEFORE clicking the label
          const fileChooserPromise = this.page.waitForEvent('filechooser', { timeout: 5000 });
          
          // Click the label to trigger file chooser
          const folderLabel = this.page.locator('label:has-text("Upload Folder")').first();
          const labelVisible = await folderLabel.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (labelVisible) {
            await folderLabel.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await folderLabel.click();
            
            // Wait for and handle the file chooser
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(folderPath);
            folderUploaded = true;
            await this.page.waitForTimeout(1000);
          }
        } catch (error) {
          // Strategy 3 failed
        }
      }

      // Strategy 4: Direct locator with webkitdirectory attribute
      if (!folderUploaded) {
        try {
          const folderInput = this.page.locator('input[type="file"][webkitdirectory]').first();
          await folderInput.waitFor({ state: 'attached', timeout: 5000 });
          await folderInput.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await folderInput.setInputFiles(folderPath);
          folderUploaded = true;
          await this.page.waitForTimeout(1000);
        } catch (error) {
          // Strategy 4 failed
        }
      }

      if (!folderUploaded) {
        throw new Error('Could not find folder input or upload folder. Make sure Upload Folder button was clicked first.');
      }

      await this.page.waitForTimeout(2000); // Wait for files to be processed
    } catch (error) {
      throw new Error(`Failed to upload folder: ${error.message}`);
    }
  }

  /**
   * Uploads a ZIP file by selecting it from the file system
   * @param {string} zipFilePath - Path to the ZIP file to upload
   */
  async uploadZipFile(zipFilePath) {
    try {
      await this.page.waitForTimeout(1500); // Wait for input to be ready after clicking Upload Zip button
      
      // Strategy 1: Click dropzone/browse link first to trigger zip input, then set files
      let zipUploaded = false;
      try {
        const dropzoneVisible = await this.uploadDropzone.isVisible({ timeout: 3000 }).catch(() => false);
        if (dropzoneVisible) {
          // Click on the dropzone browse link to trigger zip input
          await this.dropzoneBrowseLink.click();
          await this.page.waitForTimeout(1000);
          
          // Now try to set the zip input
          await this.uploadZipInput.waitFor({ state: 'attached', timeout: 5000 });
          await this.uploadZipInput.setInputFiles(zipFilePath);
          zipUploaded = true;
          await this.page.waitForTimeout(1000);
        }
      } catch (error) {
        // Strategy 1 failed, try next
      }

      // Strategy 2: Try clicking dropzone area to trigger zip input
      if (!zipUploaded) {
        try {
          const dropzoneVisible = await this.uploadDropzone.isVisible({ timeout: 3000 }).catch(() => false);
          if (dropzoneVisible) {
            // Click on the dropzone area to trigger zip input
            await this.uploadDropzone.click();
            await this.page.waitForTimeout(1000);
            
            // Now try to set the zip input
            await this.uploadZipInput.waitFor({ state: 'attached', timeout: 5000 });
            await this.uploadZipInput.setInputFiles(zipFilePath);
            zipUploaded = true;
            await this.page.waitForTimeout(1000);
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }

      // Strategy 3: Try using the uploadZipInput locator directly
      if (!zipUploaded) {
        try {
          // Zip inputs are hidden, so wait for 'attached' state
          await this.uploadZipInput.waitFor({ state: 'attached', timeout: 5000 });
          await this.uploadZipInput.setInputFiles(zipFilePath);
          zipUploaded = true;
          await this.page.waitForTimeout(1000);
        } catch (error) {
          // Strategy 3 failed
        }
      }

      // Strategy 4: Try finding the zip input by iterating through all inputs
      if (!zipUploaded) {
        try {
          const allFileInputs = this.page.locator('input[type="file"]');
          const count = await allFileInputs.count();
          
          for (let i = 0; i < count; i++) {
            const input = allFileInputs.nth(i);
            try {
              // Check if this is the zip input (has accept attribute with zip)
              const accept = await input.getAttribute('accept').catch(() => '');
              const isZip = accept && accept.includes('zip');
              
              if (isZip) {
                // This is the zip input
                await input.waitFor({ state: 'attached', timeout: 3000 });
                await input.setInputFiles(zipFilePath);
                zipUploaded = true;
                await this.page.waitForTimeout(1000);
                break;
              }
            } catch (error) {
              // Skip this input and try next
              continue;
            }
          }
        } catch (error) {
          // Strategy 4 failed
        }
      }

      if (!zipUploaded) {
        throw new Error('Could not find zip input to upload zip file. Make sure Upload Zip button was clicked first and try clicking the dropzone area.');
      }
    } catch (error) {
      throw new Error(`Failed to upload zip file: ${error.message}`);
    }
  }

  /**
   * Clicks on Confirm Upload button
   */
  async clickConfirmUploadButton() {
    try {
      await this.confirmUploadButton.waitFor({ state: 'visible', timeout: 10000 });
      // Wait for button to be enabled
      let attempts = 0;
      while (attempts < 10) {
        const isDisabled = await this.confirmUploadButton.isDisabled();
        if (!isDisabled) {
          break;
        }
        await this.page.waitForTimeout(500);
        attempts++;
      }
      
      await this.confirmUploadButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.confirmUploadButton.click();
      await this.page.waitForTimeout(2000); // Wait for upload to start
    } catch (error) {
      throw new Error(`Failed to click Confirm Upload button: ${error.message}`);
    }
  }

  /**
   * Verifies if a folder/file exists in the table by name
   * @param {string} name - The name of the folder/file to check
   * @returns {Promise<boolean>}
   */
  async verifyFileOrFolderExistsInTable(name) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 15000 });
      
      // Wait for at least one table row to be visible (indicates table has loaded)
      const tableRows = this.page.locator('table tbody tr, .table tbody tr');
      await tableRows.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      await this.page.waitForTimeout(500);
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1; // Default to second column (usually File Name is second after checkbox)
      });

      // Retry mechanism: check up to 3 times with delays
      for (let attempt = 0; attempt < 3; attempt++) {
        // Check if name exists in the table
        const exists = await this.page.evaluate(({ colIndex, fileName }) => {
          const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
          for (const row of rows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > colIndex) {
              const cellText = (cells[colIndex].textContent || '').trim();
              // Check if it matches the name (exact match or contains)
              if (cellText === fileName || cellText.includes(fileName) || fileName.includes(cellText)) {
                return true;
              }
            }
          }
          return false;
        }, { colIndex: columnIndex, fileName: name });

        if (exists) {
          return true;
        }

        // If not found and not last attempt, wait and retry
        if (attempt < 2) {
          await this.page.waitForTimeout(1000);
        }
      }

      return false;
    } catch (error) {
      console.error('Error verifying file/folder exists:', error);
      return false;
    }
  }

  /**
   * Gets the operation column cell for a specific file/folder by name
   * @param {string} fileName - Name of the file/folder
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async getOperationCellForFile(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      
      // Return locator for operation cell in the row containing the file
      // Use multiple strategies to find the operation column
      return this.page.locator(`table tbody tr:has-text("${fileName}") td:last-child, .table tbody tr:has-text("${fileName}") td:last-child, table tbody tr:has(td:has-text("${fileName}")) td[class*="operation"], table tbody tr:has(td:has-text("${fileName}")) td:has(button)`).first();
    } catch (error) {
      throw new Error(`Failed to get operation cell for file ${fileName}: ${error.message}`);
    }
  }

  /**
   * Hovers on operation column cell for a specific file/folder
   * @param {string} fileName - Name of the file/folder
   */
  async hoverOnOperationCell(fileName) {
    try {
      const operationCell = await this.getOperationCellForFile(fileName);
      await operationCell.waitFor({ state: 'visible', timeout: 15000 }); // Increased timeout
      await operationCell.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await operationCell.hover();
      await this.page.waitForTimeout(1000); // Increased wait time for dropdown to appear on hover
    } catch (error) {
      throw new Error(`Failed to hover on operation cell for ${fileName}: ${error.message}`);
    }
  }

  /**
   * Clicks on operation dropdown button (appears on hover)
   * @param {string} fileName - Name of the file/folder (optional, for context)
   */
  async clickOperationDropdown(fileName = '') {
    try {
      // Wait a bit more after hover to ensure dropdown button appears
      await this.page.waitForTimeout(1000);
      
      let clicked = false;
      
      // Strategy 1: If fileName is provided, scope the search to that specific row
      if (fileName) {
        try {
          // Get the operation cell for the specific file
          const operationCell = await this.getOperationCellForFile(fileName);
          
          // Try to find dropdown button within the operation cell
          const dropdownButtonInCell = operationCell.locator('button[aria-haspopup="true"], button.dropdown-toggle, .operation-btn, button:has(i), button:has(i.bi-three-dots), button:has(i.bi-list)').first();
          const isVisible = await dropdownButtonInCell.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (isVisible) {
            await dropdownButtonInCell.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await dropdownButtonInCell.click({ timeout: 5000 });
            clicked = true;
            await this.page.waitForTimeout(500);
          } else {
            // Try clicking the operation cell itself (might trigger dropdown)
            await operationCell.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await operationCell.click({ timeout: 5000 });
            clicked = true;
            await this.page.waitForTimeout(500);
          }
        } catch (error) {
          // Strategy 1 failed, try next
        }
      }
      
      // Strategy 2: Try using evaluate to find dropdown button in the row containing fileName
      if (!clicked && fileName) {
        try {
          const found = await this.page.evaluate(({ fName }) => {
            // Find the row containing the file name
            const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
            for (const row of rows) {
              const rowText = row.textContent || '';
              if (rowText.includes(fName)) {
                // Find dropdown button in this row
                const buttons = row.querySelectorAll('button[aria-haspopup="true"], button.dropdown-toggle, .operation-btn, button:has(i), button:has(i.bi-three-dots), button:has(i.bi-list)');
                for (const btn of buttons) {
                  if (btn.offsetParent !== null) {
                    btn.click();
                    return true;
                  }
                }
                // If no button found, try clicking the last cell (operation cell)
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                  const lastCell = cells[cells.length - 1];
                  lastCell.click();
                  return true;
                }
              }
            }
            return false;
          }, { fName: fileName });
          
          if (found) {
            clicked = true;
            await this.page.waitForTimeout(500);
          }
        } catch (error) {
          // Strategy 2 failed
        }
      }

      // Strategy 3: Try using the generic operation dropdown locator (scoped to visible elements)
      if (!clicked) {
        try {
          // Check if any operation dropdown is visible
          const isVisible = await this.operationDropdown.isVisible({ timeout: 3000 }).catch(() => false);
          if (isVisible) {
            await this.operationDropdown.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await this.operationDropdown.click({ timeout: 5000 });
            clicked = true;
            await this.page.waitForTimeout(500);
          }
        } catch (error) {
          // Strategy 3 failed
        }
      }

      // Strategy 4: Try finding dropdown button using evaluate (generic search)
      if (!clicked) {
        try {
          const found = await this.page.evaluate(() => {
            // Find buttons with dropdown indicators (three dots, menu icon, etc.)
            const buttons = Array.from(document.querySelectorAll('button[aria-haspopup="true"], button.dropdown-toggle, .operation-btn, button:has(i.bi-three-dots), button:has(i.bi-list)'));
            for (const btn of buttons) {
              if (btn.offsetParent !== null) {
                btn.click();
                return true;
              }
            }
            return false;
          });
          
          if (found) {
            clicked = true;
            await this.page.waitForTimeout(500);
          }
        } catch (error) {
          // Strategy 4 failed
        }
      }

      if (!clicked) {
        throw new Error('Could not find or click operation dropdown');
      }

      // Wait for dropdown menu to be visible
      await this.operationDropdownMenu.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    } catch (error) {
      throw new Error(`Failed to click operation dropdown: ${error.message}`);
    }
  }

  /**
   * Clicks on Rename option from operation dropdown
   */
  async clickRenameOption() {
    try {
      await this.renameOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.renameOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.renameOption.click();
      await this.page.waitForTimeout(1000); // Wait for rename modal to appear
    } catch (error) {
      throw new Error(`Failed to click Rename option: ${error.message}`);
    }
  }

  /**
   * Clicks on Copy option from operation dropdown
   */
  async clickCopyOption() {
    try {
      await this.copyOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.copyOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.copyOption.click();
      await this.page.waitForTimeout(2000); // Wait for copy operation to complete
    } catch (error) {
      throw new Error(`Failed to click Copy option: ${error.message}`);
    }
  }

  /**
   * Clicks on Cut option from operation dropdown
   */
  async clickCutOption() {
    try {
      await this.cutOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.cutOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.cutOption.click();
      await this.page.waitForTimeout(1000); // Wait for cut operation to complete (file copied to clipboard)
    } catch (error) {
      throw new Error(`Failed to click Cut option: ${error.message}`);
    }
  }

  /**
   * Clicks on a file/directory name in the table to navigate into it
   * @param {string} fileName - Name of the file/directory to click
   */
  async clickOnFileName(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 15000 }); // Increased timeout
      await this.page.waitForTimeout(1500); // Increased wait time
      
      // First, verify the file/directory exists in the table
      const fileExists = await this.verifyFileOrFolderExistsInTable(fileName);
      if (!fileExists) {
        throw new Error(`File/directory "${fileName}" not found in the table`);
      }
      
      // Find the File Name column index
      const columnIndex = await this.page.evaluate(() => {
        const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
        for (let i = 0; i < headers.length; i++) {
          const headerText = headers[i].textContent || '';
          if (headerText.trim().toLowerCase().includes('file name') || headerText.trim().toLowerCase().includes('filename')) {
            return i;
          }
        }
        return 1; // Default to second column (usually File Name is second after checkbox)
      });

      let clicked = false;
      
      // Strategy 1: Try using evaluate to find and click the span.file-name-text element
      try {
        const result = await this.page.evaluate(({ fName }) => {
          // First, try to find the span with class "file-name-text" containing the file/directory name
          const spans = Array.from(document.querySelectorAll('span.file-name-text, span.cursor.file-name-text'));
          for (const span of spans) {
            const spanText = (span.textContent || '').trim();
            // Check if it matches the file/directory name
            if (spanText === fName || spanText.includes(fName) || fName.includes(spanText)) {
              span.click();
              return true;
            }
          }
          
          // Fallback: Try finding in table cells
          const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
          for (const row of rows) {
            const cells = row.querySelectorAll('td');
            for (let i = 0; i < cells.length; i++) {
              const cellText = (cells[i].textContent || '').trim();
              // Check if it matches the file/directory name
              if (cellText === fName || cellText.includes(fName) || fName.includes(cellText)) {
                const cell = cells[i];
                // Try to find the span.file-name-text first
                const span = cell.querySelector('span.file-name-text, span.cursor.file-name-text');
                if (span) {
                  span.click();
                  return true;
                }
                // Try to find a clickable element (link, button, or the cell itself)
                const link = cell.querySelector('a, button, [role="link"]');
                if (link) {
                  link.click();
                  return true;
                } else {
                  // Click on the cell itself
                  cell.click();
                  return true;
                }
              }
            }
          }
          return false;
        }, { fName: fileName });
        
        if (result) {
          clicked = true;
          // Wait for navigation to complete after clicking
          await this.page.waitForTimeout(1000);
          await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
        }
      } catch (error) {
        // Strategy 1 failed, try next
      }

      // Strategy 2: Use locator to find and click the span.file-name-text element (primary strategy for directory navigation)
      if (!clicked) {
        try {
          // Target the span with class "file-name-text" or "cursor file-name-text" containing the file/directory name
          const spanLocators = [
            this.page.locator(`span.file-name-text:has-text("${fileName}")`).first(),
            this.page.locator(`span.cursor.file-name-text:has-text("${fileName}")`).first(),
            this.page.locator(`span.mat-mdc-tooltip-trigger.file-name-text:has-text("${fileName}")`).first(),
            this.page.locator(`span[ng-reflect-message="${fileName}"]`).first(),
            this.page.locator(`span.file-name-text`).filter({ hasText: fileName }).first()
          ];
          
          for (const locator of spanLocators) {
            try {
              // Check if element exists first before waiting
              const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
              if (!isVisible) {
                continue;
              }
              
              await locator.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(500); // Increased wait time
              
              // Click the span element
              await locator.click({ timeout: 5000 });
              clicked = true;
              
              // Wait for navigation to complete (directory navigation may change URL or page state)
              await this.page.waitForTimeout(1000);
              await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
              break;
            } catch (error) {
              // Try next locator
              continue;
            }
          }
        } catch (error) {
          // Strategy 2 failed, try fallback
        }
      }

      // Strategy 2b: Fallback to table cell locators
      if (!clicked) {
        try {
          // Try multiple locator strategies for table cells
          const locators = [
            this.page.locator(`table tbody tr:has-text("${fileName}") td:nth-child(${columnIndex + 1})`).first(),
            this.page.locator(`.table tbody tr:has-text("${fileName}") td:nth-child(${columnIndex + 1})`).first(),
            this.page.locator(`table tbody tr:has-text("${fileName}") td`).nth(columnIndex),
            this.page.locator(`table tbody tr td:has-text("${fileName}")`).first()
          ];
          
          for (const locator of locators) {
            try {
              // Check if element exists first before waiting
              const isVisible = await locator.isVisible({ timeout: 3000 }).catch(() => false);
              if (!isVisible) {
                continue;
              }
              
              await locator.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(500); // Increased wait time
              await locator.click({ timeout: 5000 });
              clicked = true;
              break;
            } catch (error) {
              // Try next locator
              continue;
            }
          }
        } catch (error) {
          // Strategy 2b failed
        }
      }

      // Strategy 3: Try finding by row text and clicking the file name cell or span
      if (!clicked) {
        try {
          const rowLocator = this.page.locator(`table tbody tr:has-text("${fileName}"), .table tbody tr:has-text("${fileName}")`).first();
          const rowVisible = await rowLocator.isVisible({ timeout: 5000 }).catch(() => false);
          
          if (!rowVisible) {
            throw new Error('Row not visible');
          }
          
          // First try to find span.file-name-text within the row
          const spanInRow = rowLocator.locator('span.file-name-text, span.cursor.file-name-text').first();
          const spanExists = await spanInRow.isVisible({ timeout: 3000 }).catch(() => false);
          
          if (spanExists) {
            await spanInRow.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500); // Increased wait time
            await spanInRow.click({ timeout: 5000 });
            clicked = true;
            await this.page.waitForTimeout(1000);
            await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
          } else {
            // Fallback to cell click
            const cellLocator = rowLocator.locator('td').nth(columnIndex);
            await cellLocator.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500); // Increased wait time
            await cellLocator.click({ timeout: 5000 });
            clicked = true;
            await this.page.waitForTimeout(1000);
          }
        } catch (error) {
          // Strategy 3 failed
        }
      }

      if (!clicked) {
        throw new Error(`Could not find or click file/directory name "${fileName}" in the table`);
      }

      await this.page.waitForTimeout(2000); // Wait for navigation to complete
    } catch (error) {
      throw new Error(`Failed to click on file name "${fileName}": ${error.message}`);
    }
  }

  /**
   * Clicks on Delete option from operation dropdown
   */
  async clickDeleteOption() {
    try {
      await this.deleteOption.waitFor({ state: 'visible', timeout: 10000 });
      await this.deleteOption.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.deleteOption.click();
      await this.page.waitForTimeout(1000); // Wait for delete modal to appear
    } catch (error) {
      throw new Error(`Failed to click Delete option: ${error.message}`);
    }
  }

  /**
   * Checks if rename input is visible (in table first column or modal)
   * @param {string} fileName - Optional file name to find the specific row
   * @returns {Promise<boolean>}
   */
  async isRenameModalVisible(fileName = '') {
    try {
      await this.page.waitForTimeout(1500); // Wait for input to appear
      
      // Check for modal first
      const modalVisible = await this.renameModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (modalVisible) {
        return true;
      }
      
      // Check for inline input in table File Name column
      // Try multiple times with increasing wait times
      for (let attempt = 0; attempt < 3; attempt++) {
        const inputInTable = await this.page.evaluate((fileName) => {
          const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
          
          // If fileName provided, find that specific row; otherwise check all rows
          const rowsToCheck = fileName 
            ? rows.filter(row => {
                const rowText = row.textContent || '';
                return rowText.includes(fileName) || rowText.includes(fileName.replace(/[()]/g, ''));
              })
            : rows;
          
          for (const row of rowsToCheck) {
            const cells = row.querySelectorAll('td');
            // Find the File Name column (usually second column after checkbox, or first if no checkbox)
            // Check all cells to find the one with an input field
            for (let i = 0; i < cells.length; i++) {
              const cell = cells[i];
              const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
              if (input) {
                // Check if input is visible (not hidden)
                const style = window.getComputedStyle(input);
                if (input.offsetParent !== null && style.display !== 'none' && style.visibility !== 'hidden') {
                  return true;
                }
              }
            }
          }
          return false;
        }, fileName);
        
        if (inputInTable) {
          return true;
        }
        
        // Wait a bit more before next attempt
        if (attempt < 2) {
          await this.page.waitForTimeout(1000);
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Enters new name in rename input (table first column or modal)
   * @param {string} newName - The new name for the file/folder
   * @param {string} oldName - The old name of the file/folder (for finding the row)
   */
  async enterNewName(newName, oldName = '') {
    try {
      await this.page.waitForTimeout(1500); // Wait for input to appear
      
      // Strategy 1: Try finding input in filename column for the specific file row
      let nameEntered = false;
      try {
        const inputInTable = await this.page.evaluate(({ newName, oldName }) => {
          // Find the row containing the file/folder to rename
          const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
          
          // Find the File Name column index from header
          const headers = Array.from(document.querySelectorAll('table thead th, .table thead th'));
          let fileNameColumnIndex = -1;
          for (let i = 0; i < headers.length; i++) {
            const headerText = (headers[i].textContent || '').trim().toLowerCase();
            if (headerText.includes('file name') || headerText.includes('filename')) {
              fileNameColumnIndex = i;
              break;
            }
          }
          
          // If column index not found, default to second column (after checkbox)
          if (fileNameColumnIndex === -1) {
            fileNameColumnIndex = 1;
          }
          
          for (const row of rows) {
            const rowText = row.textContent || '';
            // If oldName provided, find that row; otherwise use first row with input
            const matchesRow = !oldName || rowText.includes(oldName) || rowText.includes(oldName.replace(/[()]/g, ''));
            
            if (matchesRow) {
              const cells = row.querySelectorAll('td');
              // Go to filename column (selected column cell)
              if (cells.length > fileNameColumnIndex) {
                const fileNameCell = cells[fileNameColumnIndex];
                const input = fileNameCell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input) {
                  const style = window.getComputedStyle(input);
                  if (input.offsetParent !== null && style.display !== 'none' && style.visibility !== 'hidden') {
                    // Clear file name and enter new file name
                    input.focus();
                    input.select();
                    input.value = '';
                    input.value = newName;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    input.dispatchEvent(new Event('blur', { bubbles: true }));
                    return true;
                  }
                }
              }
              
              // Fallback: check all cells in the row
              for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input) {
                  const style = window.getComputedStyle(input);
                  if (input.offsetParent !== null && style.display !== 'none' && style.visibility !== 'hidden') {
                    input.focus();
                    input.select();
                    input.value = '';
                    input.value = newName;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    return true;
                  }
                }
              }
            }
          }
          return false;
        }, { newName, oldName });
        
        if (inputInTable) {
          nameEntered = true;
          await this.page.waitForTimeout(500);
        }
      } catch (error) {
        console.error('Strategy 1 failed:', error.message);
      }
      
      // Strategy 2: Try using locator to find input in table (for the specific file row)
      if (!nameEntered && oldName) {
        try {
          const tableInput = this.table.locator(`tbody tr:has-text("${oldName}") td input[type="text"], tbody tr:has-text("${oldName}") td input:not([type="checkbox"])`).first();
          await tableInput.waitFor({ state: 'visible', timeout: 5000 });
          await tableInput.clear();
          await this.page.waitForTimeout(200);
          await tableInput.fill(newName);
          nameEntered = true;
          await this.page.waitForTimeout(300);
        } catch (error) {
          // Strategy 2 failed
        }
      }
      
      // Strategy 3: Try using locator to find input in first row
      if (!nameEntered) {
        try {
          const tableInput = this.table.locator('tbody tr:first-child td input[type="text"], tbody tr:first-child td input:not([type="checkbox"])').first();
          await tableInput.waitFor({ state: 'visible', timeout: 5000 });
          await tableInput.clear();
          await this.page.waitForTimeout(200);
          await tableInput.fill(newName);
          nameEntered = true;
          await this.page.waitForTimeout(300);
        } catch (error) {
          // Strategy 3 failed
        }
      }
      
      // Strategy 4: Try modal input (fallback)
      if (!nameEntered) {
        try {
          await this.renameInput.waitFor({ state: 'visible', timeout: 5000 });
          await this.renameInput.clear();
          await this.page.waitForTimeout(200);
          await this.renameInput.fill(newName);
          nameEntered = true;
          await this.page.waitForTimeout(300);
        } catch (error) {
          // Strategy 4 failed
        }
      }
      
      if (!nameEntered) {
        throw new Error('Could not find rename input field in table filename column or modal');
      }
    } catch (error) {
      throw new Error(`Failed to enter new name: ${error.message}`);
    }
  }

  /**
   * Confirms rename operation (presses Enter on input field)
   * @param {string} fileName - Optional file name to find the specific row
   */
  async confirmRename(fileName = '') {
    try {
      // Strategy 1: Press Enter on input in table (find row by fileName if provided)
      let confirmed = false;
      try {
        const enterPressed = await this.page.evaluate((fileName) => {
          // Find input in the row containing the file to rename
          const rows = Array.from(document.querySelectorAll('table tbody tr, .table tbody tr'));
          
          // If fileName provided, find that specific row; otherwise use first row with input
          let targetRow = null;
          if (fileName) {
            targetRow = rows.find(row => (row.textContent || '').includes(fileName));
          }
          if (!targetRow && rows.length > 0) {
            // Find first row with an input field
            for (const row of rows) {
              const cells = row.querySelectorAll('td');
              for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
                if (input && input.offsetParent !== null && input.value) {
                  targetRow = row;
                  break;
                }
              }
              if (targetRow) break;
            }
          }
          
          if (targetRow) {
            const cells = targetRow.querySelectorAll('td');
            for (let i = 0; i < cells.length; i++) {
              const cell = cells[i];
              const input = cell.querySelector('input[type="text"], input:not([type="checkbox"]), input');
              if (input && input.offsetParent !== null && input.value) {
                // Press Enter on the input
                input.focus();
                const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true });
                input.dispatchEvent(enterEvent);
                const enterEvent2 = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
                input.dispatchEvent(enterEvent2);
                const enterEvent3 = new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true });
                input.dispatchEvent(enterEvent3);
                return true;
              }
            }
          }
          return false;
        }, fileName);
        
        if (enterPressed) {
          confirmed = true;
          await this.page.waitForTimeout(1500);
        }
      } catch (error) {
        // Strategy 1 failed
      }
      
      // Strategy 2: Try using locator to find and press Enter (with fileName if provided)
      if (!confirmed) {
        try {
          const tableInput = fileName 
            ? this.table.locator(`tbody tr:has-text("${fileName}") td input[type="text"], tbody tr:has-text("${fileName}") td input:not([type="checkbox"])`).first()
            : this.table.locator('tbody tr:first-child td input[type="text"], tbody tr:first-child td input:not([type="checkbox"])').first();
          await tableInput.waitFor({ state: 'visible', timeout: 2000 });
          await tableInput.press('Enter');
          confirmed = true;
          await this.page.waitForTimeout(1500);
        } catch (error) {
          // Strategy 2 failed
        }
      }
      
      // Strategy 3: Try clicking confirm button if modal is visible
      if (!confirmed) {
        try {
          const modalVisible = await this.renameModal.isVisible({ timeout: 2000 }).catch(() => false);
          if (modalVisible) {
            await this.renameConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.renameConfirmButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await this.renameConfirmButton.click();
            confirmed = true;
            await this.page.waitForTimeout(2000);
          }
        } catch (error) {
          // Strategy 3 failed
        }
      }
      
      if (!confirmed) {
        throw new Error('Could not confirm rename operation');
      }
    } catch (error) {
      throw new Error(`Failed to confirm rename: ${error.message}`);
    }
  }

  /**
   * Checks if delete confirmation modal is visible
   * @returns {Promise<boolean>}
   */
  async isDeleteModalVisible() {
    try {
      return await this.deleteModal.isVisible({ timeout: 3000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Enters "delete" in delete confirmation input field
   */
  async enterDeleteConfirmation() {
    try {
      await this.deleteConfirmInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.deleteConfirmInput.clear();
      await this.page.waitForTimeout(200);
      await this.deleteConfirmInput.fill('delete');
      await this.page.waitForTimeout(500); // Wait for button to be enabled
    } catch (error) {
      throw new Error(`Failed to enter delete confirmation: ${error.message}`);
    }
  }

  /**
   * Confirms delete operation
   */
  async confirmDelete() {
    try {
      // Wait for delete button to be enabled (after typing "delete")
      let attempts = 0;
      while (attempts < 10) {
        const isDisabled = await this.deleteConfirmButton.isDisabled().catch(() => true);
        if (!isDisabled) {
          break;
        }
        await this.page.waitForTimeout(500);
        attempts++;
      }
      
      await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.deleteConfirmButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      await this.deleteConfirmButton.click();
      await this.page.waitForTimeout(2000); // Wait for delete to complete
    } catch (error) {
      throw new Error(`Failed to confirm delete: ${error.message}`);
    }
  }

  /**
   * Renames a file/folder
   * @param {string} oldName - Current name of the file/folder
   * @param {string} newName - New name for the file/folder
   */
  async renameFileOrFolder(oldName, newName) {
    try {
      await this.hoverOnOperationCell(oldName);
      await this.clickOperationDropdown(oldName);
      await this.clickRenameOption();
      await this.page.waitForTimeout(1000); // Wait for input field to appear in table
      await this.enterNewName(newName, oldName);
      await this.confirmRename(oldName);
    } catch (error) {
      throw new Error(`Failed to rename ${oldName} to ${newName}: ${error.message}`);
    }
  }

  /**
   * Deletes a file/folder
   * @param {string} fileName - Name of the file/folder to delete
   */
  async deleteFileOrFolder(fileName) {
    try {
      await this.hoverOnOperationCell(fileName);
      await this.clickOperationDropdown(fileName);
      await this.clickDeleteOption();
      await this.enterDeleteConfirmation();
      await this.confirmDelete();
    } catch (error) {
      throw new Error(`Failed to delete ${fileName}: ${error.message}`);
    }
  }

  /**
   * Gets the checkbox for a specific file/folder by name
   * @param {string} fileName - Name of the file/folder
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async getCheckboxForFile(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      
      // Return locator for checkbox in the row containing the file
      return this.page.locator(`table tbody tr:has-text("${fileName}") input[type="checkbox"], .table tbody tr:has-text("${fileName}") input[type="checkbox"]`).first();
    } catch (error) {
      throw new Error(`Failed to get checkbox for file ${fileName}: ${error.message}`);
    }
  }

  /**
   * Selects a file/folder by clicking its checkbox
   * @param {string} fileName - Name of the file/folder to select
   */
  async selectFile(fileName) {
    try {
      const checkbox = await this.getCheckboxForFile(fileName);
      await checkbox.waitFor({ state: 'visible', timeout: 10000 });
      const isChecked = await checkbox.isChecked();
      if (!isChecked) {
        await checkbox.click();
        await this.page.waitForTimeout(500); // Wait for selection to register
      }
    } catch (error) {
      throw new Error(`Failed to select file ${fileName}: ${error.message}`);
    }
  }

  /**
   * Deselects a file/folder by unchecking its checkbox
   * @param {string} fileName - Name of the file/folder to deselect
   */
  async deselectFile(fileName) {
    try {
      const checkbox = await this.getCheckboxForFile(fileName);
      await checkbox.waitFor({ state: 'visible', timeout: 10000 });
      const isChecked = await checkbox.isChecked();
      if (isChecked) {
        await checkbox.click();
        await this.page.waitForTimeout(500); // Wait for deselection to register
      }
    } catch (error) {
      throw new Error(`Failed to deselect file ${fileName}: ${error.message}`);
    }
  }

  /**
   * Selects multiple files/folders
   * @param {string[]} fileNames - Array of file/folder names to select
   */
  async selectMultipleFiles(fileNames) {
    try {
      // First, deselect all files
      await this.deselectAllFiles();
      
      // Then select the specified files
      for (const fileName of fileNames) {
        await this.selectFile(fileName);
      }
      await this.page.waitForTimeout(1000); // Wait for all selections to register
    } catch (error) {
      throw new Error(`Failed to select multiple files: ${error.message}`);
    }
  }

  /**
   * Deselects all files
   */
  async deselectAllFiles() {
    try {
      const checkboxes = this.fileCheckboxes;
      const count = await checkboxes.count();
      for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const isChecked = await checkbox.isChecked().catch(() => false);
        if (isChecked) {
          await checkbox.click();
        }
      }
      await this.page.waitForTimeout(500);
    } catch (error) {
      // Ignore errors when deselecting
    }
  }

  /**
   * Gets the count of selected files
   * @returns {Promise<number>}
   */
  async getSelectedCount() {
    try {
      const selectedText = await this.selectedCountIndicator.textContent({ timeout: 3000 }).catch(() => '');
      if (selectedText) {
        const match = selectedText.match(/(\d+)\s+selected/i);
        if (match) {
          return parseInt(match[1]);
        }
      }
      
      // Fallback: count checked checkboxes
      const checkboxes = this.fileCheckboxes;
      const count = await checkboxes.count();
      let selectedCount = 0;
      for (let i = 0; i < count; i++) {
        const isChecked = await checkboxes.nth(i).isChecked().catch(() => false);
        if (isChecked) {
          selectedCount++;
        }
      }
      return selectedCount;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Checks if permission button is visible
   * @returns {Promise<boolean>}
   */
  async isPermissionButtonVisible() {
    try {
      return await this.permissionButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Selects a file/folder by name
   * @param {string} fileName - Name of the file/folder to select
   */
  async selectFile(fileName) {
    try {
      await this.ensureListView();
      await this.table.waitFor({ state: 'visible', timeout: 10000 });
      
      // Find the checkbox in the row containing the file
      const fileCheckbox = this.page.locator(`table tbody tr:has-text("${fileName}") input[type="checkbox"], .table tbody tr:has-text("${fileName}") input[type="checkbox"]`).first();
      await fileCheckbox.waitFor({ state: 'visible', timeout: 10000 });
      await fileCheckbox.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(300);
      
      // Check if already selected
      const isChecked = await fileCheckbox.isChecked();
      if (!isChecked) {
        await fileCheckbox.check();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to select file ${fileName}: ${error.message}`);
    }
  }

  /**
   * Clicks on Permission button
   */
  async clickPermissionButton() {
    try {
      await this.permissionButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.permissionButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.permissionButton.click();
      await this.page.waitForTimeout(1000); // Wait for modal to appear
    } catch (error) {
      throw new Error(`Failed to click Permission button: ${error.message}`);
    }
  }

  /**
   * Checks if permission modal is visible
   * @returns {Promise<boolean>}
   */
  async isPermissionModalVisible() {
    try {
      return await this.permissionModal.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets all user rows in permission modal
   * @returns {Promise<number>} Number of user rows
   */
  async getUserRowCount() {
    try {
      // Wait for modal to be visible
      await this.permissionModal.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
      
      // Try multiple strategies to count rows
      const count1 = await this.permissionUserRows.count();
      if (count1 > 0) {
        return count1;
      }
      
      // Strategy 2: Use evaluate to count rows
      const count2 = await this.page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.permission-modal-modern tbody tr.table-row-modern, .permission-modal-modern table tbody tr, .modal tbody tr:has(input[type="radio"])'));
        return rows.length;
      });
      
      return count2 || 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Checks if first row radio buttons are disabled (not editable)
   * @returns {Promise<{allowDisabled: boolean, denyDisabled: boolean, isNotEditable: boolean}>}
   */
  async checkFirstRowRadioButtonsDisabled() {
    try {
      await this.page.waitForTimeout(500);
      
      // Use evaluate to check the actual state
      const result = await this.page.evaluate(() => {
        const firstRow = document.querySelector('.permission-modal-modern tbody tr.table-row-modern:first-child, .permission-modal-modern table tbody tr:first-child');
        if (firstRow) {
          const allowRadio = firstRow.querySelector('input[type="radio"][id^="allow"]');
          const denyRadio = firstRow.querySelector('input[type="radio"][id^="deny"]');
          
          const allowDisabled = allowRadio ? allowRadio.disabled : true;
          const denyDisabled = denyRadio ? denyRadio.disabled : true;
          
          // First row is not editable if:
          // 1. Deny is disabled (always true for first row)
          // 2. Allow might be checked and can't be changed, or both are disabled
          // The key indicator is that deny is disabled
          const isNotEditable = denyDisabled; // If deny is disabled, row is not editable
          
          return {
            allowDisabled,
            denyDisabled,
            isNotEditable
          };
        }
        return { allowDisabled: true, denyDisabled: true, isNotEditable: true };
      });
      
      return result;
    } catch (error) {
      return { allowDisabled: true, denyDisabled: true, isNotEditable: true };
    }
  }

  /**
   * Sets permission (ALLOW or DENY) for a user by row index
   * @param {number} rowIndex - Index of the user row (0-based, excluding first row)
   * @param {string} permission - 'allow' or 'deny'
   */
  async setUserPermission(rowIndex, permission) {
    try {
      await this.page.waitForTimeout(500);
      
      // Get all user rows
      const userRows = this.permissionUserRows;
      const count = await userRows.count();
      
      // If count is 0, try using evaluate
      let actualCount = count;
      if (count === 0) {
        actualCount = await this.page.evaluate(() => {
          return document.querySelectorAll('.permission-modal-modern tbody tr.table-row-modern, .permission-modal-modern table tbody tr').length;
        });
      }
      
      if (rowIndex + 1 >= actualCount) {
        throw new Error(`Row index ${rowIndex} is out of range. Total rows: ${actualCount}`);
      }
      
      // Get the specific row (rowIndex + 1 because first row is index 0 but not editable)
      const targetRowIndex = rowIndex + 1;
      const targetRow = userRows.nth(targetRowIndex);
      
      const permissionLower = permission.toLowerCase();
      if (permissionLower === 'allow') {
        // Try multiple locator strategies
        let allowRadio = targetRow.locator('input[type="radio"][id^="allow"]').first();
        let found = false;
        
        try {
          await allowRadio.waitFor({ state: 'visible', timeout: 3000 });
          await allowRadio.check();
          found = true;
          await this.page.waitForTimeout(300);
        } catch (error) {
          // Try alternative locator
          allowRadio = targetRow.locator('input[type="radio"][name*="allow"]').first();
          await allowRadio.waitFor({ state: 'visible', timeout: 3000 });
          await allowRadio.check();
          found = true;
          await this.page.waitForTimeout(300);
        }
        
        if (!found) {
          // Use evaluate as fallback
          await this.page.evaluate((rowIdx) => {
            const rows = Array.from(document.querySelectorAll('.permission-modal-modern tbody tr.table-row-modern, .permission-modal-modern table tbody tr'));
            if (rows[rowIdx + 1]) {
              const allowRadio = rows[rowIdx + 1].querySelector('input[type="radio"][id^="allow"]');
              if (allowRadio && !allowRadio.disabled) {
                allowRadio.click();
              }
            }
          }, rowIndex);
          await this.page.waitForTimeout(300);
        }
      } else if (permissionLower === 'deny') {
        // Try multiple locator strategies
        let denyRadio = targetRow.locator('input[type="radio"][id^="deny"]').first();
        let found = false;
        
        try {
          await denyRadio.waitFor({ state: 'visible', timeout: 3000 });
          await denyRadio.check();
          found = true;
          await this.page.waitForTimeout(300);
        } catch (error) {
          // Try alternative locator
          denyRadio = targetRow.locator('input[type="radio"][name*="deny"]').first();
          await denyRadio.waitFor({ state: 'visible', timeout: 3000 });
          await denyRadio.check();
          found = true;
          await this.page.waitForTimeout(300);
        }
        
        if (!found) {
          // Use evaluate as fallback
          await this.page.evaluate((rowIdx) => {
            const rows = Array.from(document.querySelectorAll('.permission-modal-modern tbody tr.table-row-modern, .permission-modal-modern table tbody tr'));
            if (rows[rowIdx + 1]) {
              const denyRadio = rows[rowIdx + 1].querySelector('input[type="radio"][id^="deny"]');
              if (denyRadio && !denyRadio.disabled) {
                denyRadio.click();
              }
            }
          }, rowIndex);
          await this.page.waitForTimeout(300);
        }
      } else {
        throw new Error(`Invalid permission: ${permission}. Must be 'allow' or 'deny'`);
      }
    } catch (error) {
      throw new Error(`Failed to set user permission: ${error.message}`);
    }
  }

  /**
   * Gets the current permission (ALLOW or DENY) for a user by row index
   * @param {number} rowIndex - Index of the user row (0-based, excluding first row)
   * @returns {Promise<string>} 'allow' or 'deny'
   */
  async getUserPermission(rowIndex) {
    try {
      await this.page.waitForTimeout(500);
      
      // Strategy 1: Use locator
      const userRows = this.permissionUserRows;
      const count = await userRows.count();
      
      // If count is 0, use evaluate
      if (count === 0) {
        const result = await this.page.evaluate((rowIdx) => {
          const rows = Array.from(document.querySelectorAll('.permission-modal-modern tbody tr.table-row-modern, .permission-modal-modern table tbody tr'));
          if (rows[rowIdx + 1]) {
            const allowRadio = rows[rowIdx + 1].querySelector('input[type="radio"][id^="allow"]');
            const denyRadio = rows[rowIdx + 1].querySelector('input[type="radio"][id^="deny"]');
            
            if (allowRadio && allowRadio.checked) {
              return 'allow';
            } else if (denyRadio && denyRadio.checked) {
              return 'deny';
            }
          }
          return 'none';
        }, rowIndex);
        return result;
      }
      
      if (rowIndex + 1 >= count) {
        throw new Error(`Row index ${rowIndex} is out of range. Total rows: ${count}`);
      }
      
      // Get the specific row
      const targetRow = userRows.nth(rowIndex + 1);
      
      const allowRadio = targetRow.locator('input[type="radio"][id^="allow"]').first();
      const denyRadio = targetRow.locator('input[type="radio"][id^="deny"]').first();
      
      const isAllowChecked = await allowRadio.isChecked().catch(() => false);
      const isDenyChecked = await denyRadio.isChecked().catch(() => false);
      
      if (isAllowChecked) {
        return 'allow';
      } else if (isDenyChecked) {
        return 'deny';
      } else {
        return 'none'; // Neither is checked
      }
    } catch (error) {
      throw new Error(`Failed to get user permission: ${error.message}`);
    }
  }

  /**
   * Clicks Submit button in permission modal
   */
  async clickPermissionSubmit() {
    try {
      await this.permissionSubmitButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.permissionSubmitButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.permissionSubmitButton.click();
      await this.page.waitForTimeout(2000); // Wait for modal to close and changes to save
    } catch (error) {
      throw new Error(`Failed to click Permission Submit button: ${error.message}`);
    }
  }

  /**
   * Checks if cut button is visible
   * @returns {Promise<boolean>}
   */
  async isCutButtonVisible() {
    try {
      return await this.cutButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if copy button is visible
   * @returns {Promise<boolean>}
   */
  async isCopyButtonVisible() {
    try {
      return await this.copyButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if compress button is visible
   * @returns {Promise<boolean>}
   */
  async isCompressButtonVisible() {
    try {
      return await this.compressButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if delete button (header) is visible
   * @returns {Promise<boolean>}
   */
  async isDeleteButtonVisible() {
    try {
      return await this.deleteButton.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies button visibility based on selection count
   * @returns {Promise<{permissionVisible: boolean, cutVisible: boolean, copyVisible: boolean, compressVisible: boolean, deleteVisible: boolean, selectedCount: number}>}
   */
  async verifyButtonVisibility() {
    try {
      const selectedCount = await this.getSelectedCount();
      const permissionVisible = await this.isPermissionButtonVisible();
      const cutVisible = await this.isCutButtonVisible();
      const copyVisible = await this.isCopyButtonVisible();
      const compressVisible = await this.isCompressButtonVisible();
      const deleteVisible = await this.isDeleteButtonVisible();
      
      return {
        selectedCount,
        permissionVisible,
        cutVisible,
        copyVisible,
        compressVisible,
        deleteVisible
      };
    } catch (error) {
      return {
        selectedCount: 0,
        permissionVisible: false,
        cutVisible: false,
        copyVisible: false,
        compressVisible: false,
        deleteVisible: false,
        error: error.message
      };
    }
  }
}

module.exports = { FileManagerPage };

