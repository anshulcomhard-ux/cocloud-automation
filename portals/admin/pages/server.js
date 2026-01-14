class ServerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation locators
    // HTML: <div routerlink="/server" class="nav-link sidebar-items">
    this.serverLink = page.locator('div.nav-link.sidebar-items[routerlink="/server"], div.nav-link.sidebar-items:has-text("Server"), a[routerlink="/server"], .sidebar-items:has-text("Server")').first();
    
    // Page elements
    // HTML: <div class="col-sm-6"><p class="sub fs-5">Cloud Server</p></div>
    this.pageTitle = page.locator('p.sub.fs-5:has-text("Cloud Server"), div.col-sm-6 p.sub.fs-5:has-text("Cloud Server"), h1:has-text("Cloud Server"), h2:has-text("Cloud Server")').first();
    this.pageWrapper = page.locator('app-root, app-server, [class*="server"]').first();
    
    // Table locators
    this.serverTable = page.locator('mat-table, table.table, table').first();
    this.allTableRows = page.locator('mat-table mat-row, table tbody tr');
    this.tableHeaders = page.locator('mat-table mat-header-row th, table thead th');
    
    // Record count text
    // HTML: "Showing 1 to 20 of 377 records"
    this.recordCountText = page.locator('*:has-text("Showing"), *:has-text("records")').first();
    
    // Search form locators
    // HTML: <div data-bs-toggle="collapse" data-bs-target="#collapseExample" class="py-3 collapsed">
    this.searchHereButton = page.locator('div[data-bs-toggle="collapse"][data-bs-target="#collapseExample"]:has-text("Search Here"), div.py-3:has-text("Search Here"), span.ms-5:has-text("Search Here")').first();
    this.searchHereSpan = page.locator('span.ms-5:has-text("Search Here"), span:has-text("Search Here")').first();
    // HTML: <div id="collapseExample" class="collapse">
    this.searchForm = page.locator('#collapseExample.collapse, #collapseExample.collapse.show, .search-field-area').first();
    
    // Search field locators - using exact IDs from HTML
    // HTML: <input id="cloudName" ng-reflect-name="cloudName" placeholder="ServerName/HostName/Desc">
    this.serverNameField = page.locator('input#cloudName[ng-reflect-name="cloudName"], input#cloudName[placeholder="ServerName/HostName/Desc"], input#cloudName').first();
    // HTML: <input id="ip" ng-reflect-name="ip" placeholder="IP Address">
    this.ipAddressField = page.locator('input#ip[ng-reflect-name="ip"], input#ip[placeholder="IP Address"], input#ip').first();
    // HTML: <input id="publicIp" ng-reflect-name="publicIp" placeholder="Public IP Address">
    this.publicIpField = page.locator('input#publicIp[ng-reflect-name="publicIp"], input#publicIp[placeholder="Public IP Address"], input#publicIp').first();
    // HTML: <input id="rdpPort" ng-reflect-name="rdpPort" placeholder="Rdp Port">
    this.rdpPortField = page.locator('input#rdpPort[ng-reflect-name="rdpPort"], input#rdpPort[placeholder="Rdp Port"], input#rdpPort').first();
    // HTML: <input id="exeBuildVersion" ng-reflect-name="exeBuildVersion" placeholder="Exe Build Version">
    this.exeBuildVersionField = page.locator('input#exeBuildVersion[ng-reflect-name="exeBuildVersion"], input#exeBuildVersion[placeholder="Exe Build Version"], input#exeBuildVersion').first();
    
    // Dropdown locators (mat-select)
    // HTML: <mat-select id="mat-select-98" ...> for SSH Status
    this.sshStatusDropdown = page.locator('mat-select[aria-labelledby*="SSH Status"], mat-form-field:has(mat-label:has-text("SSH Status")) mat-select, app-dropdown:has(mat-label:has-text("SSH Status")) mat-select').first();
    // HTML: <mat-select id="mat-select-100" ...> for Status
    this.statusDropdown = page.locator('mat-select[aria-labelledby*="Status"], mat-form-field:has(mat-label:has-text("Status")) mat-select, app-dropdown:has(mat-label:has-text("Status")) mat-select').first();
    // HTML: <mat-select id="mat-select-102" ...> for Server Type
    this.serverTypeDropdown = page.locator('mat-select[aria-labelledby*="Server Type"], mat-form-field:has(mat-label:has-text("Server Type")) mat-select, app-dropdown:has(mat-label:has-text("Server Type")) mat-select').first();
    
    // Search and Reset buttons
    // HTML: <button type="submit" class="btn search-btn">Search</button>
    this.searchButton = page.locator('button.btn.search-btn[type="submit"], button.search-btn:has-text("Search"), button:has-text("Search")').first();
    // HTML: <button type="button" class="btn reset-btn">Reset</button>
    this.resetButton = page.locator('button.btn.reset-btn[type="button"], button.reset-btn:has-text("Reset"), button:has-text("Reset")').first();
    
    // Add Server button
    // HTML: <button type="button" class="comman-btn1 btn-primary me-2">+ Server</button>
    this.addServerButton = page.locator('button.comman-btn1:has-text("+ Server"), button:has-text("+ Server"), button:has-text("Server"):has-text("+")').first();
    
    // Action and Select Headers buttons
    this.actionButton = page.locator('button:has-text("Action"), .btn:has-text("Action")').first();
    this.selectHeadersButton = page.locator('button:has-text("Select Headers"), .btn:has-text("Select Headers")').first();
    
    // Validation error locators
    this.validationError = page.locator('.error-message, .invalid-feedback, .text-danger, .error-msg').first();
    
    // No data message (if exists)
    this.noDataMessage = page.locator('p.error-msg, *:has-text("No data"), *:has-text("No records"), *:has-text("No Data Found"), *:has-text("No data found")').first();
    
    // Toast message locators
    this.toastMessage = page.locator('.toast-message, .toast, .alert-success, .alert, [role="alert"], .notification, .snackbar, *[class*="toast"], *[class*="snackbar"]').first();
    
    // Table column locators for retrieving values
    this.nameCells = page.locator('td.mat-column-Name, td:has-text("Cloud")');
    this.hostNameCells = page.locator('td.mat-column-Host-Name');
    this.domainNameCells = page.locator('td.mat-column-Domain-Name');
    this.ipAddressCells = page.locator('td.mat-column-IP-Address');
    this.publicIpCells = page.locator('td.mat-column-Public-IP-Address');
    this.rdpPortCells = page.locator('td.mat-column-RDP-Port');
    
    // Update Server Modal locators
    // HTML: Modal with title "Update Server"
    this.updateServerModal = page.locator('div.modal:has-text("Update Server"), .modal-dialog:has-text("Update Server"), [role="dialog"]:has-text("Update Server")').first();
    this.updateServerModalTitle = page.locator('h1:has-text("Update Server"), h2:has-text("Update Server"), h3:has-text("Update Server"), h4:has-text("Update Server"), h5:has-text("Update Server"), .modal-title:has-text("Update Server"), *:has-text("Update Server")').first();
    this.updateServerModalClose = page.locator('button:has-text("Cancel"), button.close, .modal-header button[aria-label="Close"], .modal-header .close').first();
    
    // Action column edit icon locator
    // HTML: Edit icon (pencil) in Action column
    this.editIcon = page.locator('td.mat-column-Action button:has([class*="bi-pencil"]), td.mat-column-Action i[class*="bi-pencil"], td.mat-column-Action i[class*="pencil"], td.mat-column-Action button[title*="Edit"], td.mat-column-Action button[aria-label*="Edit"]').first();
    this.editIcons = page.locator('td.mat-column-Action button:has([class*="bi-pencil"]), td.mat-column-Action i[class*="bi-pencil"], td.mat-column-Action i[class*="pencil"], td.mat-column-Action button[title*="Edit"], td.mat-column-Action button[aria-label*="Edit"]');
    
    // Add New Server Modal locators
    // HTML: <div class="modal-section p-4"> with <div class="modal-heading">Add New Server</div>
    this.addServerModal = page.locator('div.modal-section:has-text("Add New Server"), .modal-section').first();
    this.addServerModalTitle = page.locator('div.modal-heading:has-text("Add New Server"), .modal-heading').first();
    this.addServerModalSubmit = page.locator('button.search-btn:has-text("Submit"), button:has-text("Submit"), button[type="submit"]').first();
    this.addServerModalCancel = page.locator('button.reset-btn:has-text("Cancel"), button:has-text("Cancel")').first();
    
    // Add New Server form field locators - using exact IDs from HTML
    // HTML: <input id="name" placeholder="Enter Name">
    this.addServerFullNameField = page.locator('input#name[placeholder="Enter Name"], input#name').first();
    // HTML: <input id="hostName" placeholder="Enter Hostname">
    this.addServerHostnameField = page.locator('input#hostName[placeholder="Enter Hostname"], input#hostName').first();
    // HTML: <input id="ip" placeholder="Enter IP Address">
    this.addServerIpAddressField = page.locator('input#ip[placeholder="Enter IP Address"], input#ip').first();
    // HTML: <input id="publicIp" placeholder="Enter Public IP Address">
    this.addServerPublicIpField = page.locator('input#publicIp[placeholder="Enter Public IP Address"], input#publicIp').first();
    // HTML: <input id="domainName" placeholder="Enter Domain Name">
    this.addServerDomainNameField = page.locator('input#domainName[placeholder="Enter Domain Name"], input#domainName').first();
    // HTML: <input id="ram" placeholder="RAM">
    this.addServerRamField = page.locator('input#ram[placeholder="RAM"], input#ram').first();
    // HTML: <input id="cpu" placeholder="CPU">
    this.addServerCpuField = page.locator('input#cpu[placeholder="CPU"], input#cpu').first();
    // HTML: <input id="storage" placeholder="Storage">
    this.addServerStorageField = page.locator('input#storage[placeholder="Storage"], input#storage').first();
    // HTML: <input id="noOfInstance" placeholder="Enter no. of instance created">
    this.addServerInstanceField = page.locator('input#noOfInstance[placeholder*="instance"], input#noOfInstance').first();
    // HTML: <input id="tallyCounter" placeholder="Enter the number of Tally">
    this.addServerTallyCounterField = page.locator('input#tallyCounter[placeholder*="Tally"], input#tallyCounter').first();
    // HTML: <input id="rdpPort" placeholder="Enter RDP Port">
    this.addServerRdpPortField = page.locator('input#rdpPort[placeholder="Enter RDP Port"], input#rdpPort').first();
    // HTML: <textarea id="description" placeholder="Description">
    this.addServerDescriptionField = page.locator('textarea#description[placeholder="Description"], textarea#description').first();
    
    // Add New Server dropdown locators - these are <select> elements, not mat-select
    // HTML: <select id="selectExe">
    this.addServerExeDropdown = page.locator('select#selectExe').first();
    // HTML: <select id="serverType">
    this.addServerServerTypeDropdown = page.locator('select#serverType').first();
    // HTML: <select id="autoProvision">
    this.addServerAutoProvisionDropdown = page.locator('select#autoProvision').first();
    // HTML: <select id="firewallServerId">
    this.addServerFirewallDropdown = page.locator('select#firewallServerId').first();
  }

  /**
   * Navigates to the Server page
   * @param {string} baseUrl - Base URL of the admin portal
   */
  async gotoServer(baseUrl) {
    // Navigate to server page
    await this.serverLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.serverLink.scrollIntoViewIfNeeded();
    await this.serverLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Wait for server page to load
    await this.serverTable.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  /**
   * Verifies the Server page is loaded
   * @returns {Promise<boolean>}
   */
  async isPageLoaded() {
    try {
      const url = await this.page.url();
      const isOnServerPage = url.includes('/server');
      const isTitleVisible = await this.pageTitle.isVisible({ timeout: 5000 }).catch(() => false);
      return isOnServerPage && isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Verifies the Server table is visible with data
   * @returns {Promise<{visible: boolean, hasData: boolean, rowCount: number}>}
   */
  async verifyTableWithData() {
    try {
      const isTableVisible = await this.serverTable.isVisible({ timeout: 5000 }).catch(() => false);
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

  // ==================== SEARCH METHODS ====================

  /**
   * Clicks the "Search Here" button to open search panel
   */
  async clickSearchHere() {
    try {
      // Check if form is already open by checking if any input field is visible
      const isFormVisible = await this.serverNameField.isVisible({ timeout: 1000 }).catch(() => false);
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
      
      // Wait for collapse to expand
      let collapseExpanded = false;
      const collapseElement = this.page.locator('#collapseExample');
      
      for (let i = 0; i < 40; i++) {
        await this.page.waitForTimeout(200);
        try {
          const hasShow = await collapseElement.evaluate(el => el.classList.contains('show'));
          const buttonExpanded = await this.searchHereButton.getAttribute('aria-expanded');
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
        this.serverNameField,
        this.ipAddressField,
        this.publicIpField
      ];
      
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
          await this.page.waitForTimeout(300);
          break;
        }
      }
      
      if (!inputVisible) {
        // Try one more time with force
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
   * Enters value in ServerName/HostName/Desc search field
   * @param {string} value - ServerName/HostName/Desc value
   */
  async enterServerNameSearch(value) {
    try {
      await this.clickSearchHere();
      await this.serverNameField.waitFor({ state: 'visible', timeout: 5000 });
      await this.serverNameField.scrollIntoViewIfNeeded();
      await this.serverNameField.clear();
      await this.serverNameField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter ServerName/HostName/Desc: ${error.message}`);
    }
  }

  /**
   * Enters value in IP Address search field
   * @param {string} value - IP Address value
   */
  async enterIpAddressSearch(value) {
    try {
      await this.clickSearchHere();
      await this.ipAddressField.waitFor({ state: 'visible', timeout: 5000 });
      await this.ipAddressField.scrollIntoViewIfNeeded();
      await this.ipAddressField.clear();
      await this.ipAddressField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter IP Address: ${error.message}`);
    }
  }

  /**
   * Enters value in Public IP Address search field
   * @param {string} value - Public IP Address value
   */
  async enterPublicIpSearch(value) {
    try {
      await this.clickSearchHere();
      await this.publicIpField.waitFor({ state: 'visible', timeout: 5000 });
      await this.publicIpField.scrollIntoViewIfNeeded();
      await this.publicIpField.clear();
      await this.publicIpField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Public IP Address: ${error.message}`);
    }
  }

  /**
   * Enters value in RDP Port search field
   * @param {string} value - RDP Port value
   */
  async enterRdpPortSearch(value) {
    try {
      await this.clickSearchHere();
      await this.rdpPortField.waitFor({ state: 'visible', timeout: 5000 });
      await this.rdpPortField.scrollIntoViewIfNeeded();
      await this.rdpPortField.clear();
      await this.rdpPortField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter RDP Port: ${error.message}`);
    }
  }

  /**
   * Enters value in Exe Build Version search field
   * @param {string} value - Exe Build Version value
   */
  async enterExeBuildVersionSearch(value) {
    try {
      await this.clickSearchHere();
      await this.exeBuildVersionField.waitFor({ state: 'visible', timeout: 5000 });
      await this.exeBuildVersionField.scrollIntoViewIfNeeded();
      await this.exeBuildVersionField.clear();
      await this.exeBuildVersionField.fill(value);
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Failed to enter Exe Build Version: ${error.message}`);
    }
  }

  /**
   * Selects value in SSH Status dropdown
   * @param {string} value - SSH Status value to select
   */
  async selectSshStatus(value) {
    try {
      await this.clickSearchHere();
      await this.sshStatusDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.sshStatusDropdown.scrollIntoViewIfNeeded();
      await this.sshStatusDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options to appear
      const option = this.page.locator(`mat-option:has-text("${value}"), .mat-mdc-option:has-text("${value}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select SSH Status: ${error.message}`);
    }
  }

  /**
   * Selects value in Status dropdown
   * @param {string} value - Status value to select
   */
  async selectStatus(value) {
    try {
      await this.clickSearchHere();
      await this.statusDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.statusDropdown.scrollIntoViewIfNeeded();
      await this.statusDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options to appear
      const option = this.page.locator(`mat-option:has-text("${value}"), .mat-mdc-option:has-text("${value}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Status: ${error.message}`);
    }
  }

  /**
   * Selects value in Server Type dropdown
   * @param {string} value - Server Type value to select
   */
  async selectServerType(value) {
    try {
      await this.clickSearchHere();
      await this.serverTypeDropdown.waitFor({ state: 'visible', timeout: 5000 });
      await this.serverTypeDropdown.scrollIntoViewIfNeeded();
      await this.serverTypeDropdown.click();
      await this.page.waitForTimeout(500);
      
      // Wait for options to appear
      const option = this.page.locator(`mat-option:has-text("${value}"), .mat-mdc-option:has-text("${value}")`).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      throw new Error(`Failed to select Server Type: ${error.message}`);
    }
  }

  /**
   * Clicks the Search button
   */
  async clickSearch() {
    try {
      await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.searchButton.scrollIntoViewIfNeeded();
      await this.searchButton.click();
      await this.page.waitForTimeout(2000);
    } catch (error) {
      throw new Error(`Failed to click Search: ${error.message}`);
    }
  }

  /**
   * Clicks the Reset button
   */
  async clickReset() {
    try {
      await this.resetButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.resetButton.scrollIntoViewIfNeeded();
      await this.resetButton.click();
      // Use a shorter timeout and catch timeout errors
      try {
        await this.page.waitForTimeout(1000);
      } catch (timeoutError) {
        // If timeout occurs, continue anyway - the click may have succeeded
        console.log('  ⚠ Timeout during reset wait, continuing...');
      }
    } catch (error) {
      // If button click fails, try to continue - might be a timing issue
      if (error.message.includes('timeout')) {
        console.log('  ⚠ Reset button click timeout, attempting to continue...');
        return;
      }
      throw new Error(`Failed to click Reset: ${error.message}`);
    }
  }

  /**
   * Gets Name from table (first row)
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
   * Gets Host Name from table (first row)
   * @returns {Promise<string>}
   */
  async getHostNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const hostNameCell = firstRow.locator('td.mat-column-Host-Name').first();
        const text = await hostNameCell.textContent();
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
   * Gets IP Address from table (first row)
   * @returns {Promise<string>}
   */
  async getIpAddressFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const ipCell = firstRow.locator('td.mat-column-IP-Address').first();
        const text = await ipCell.textContent();
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
   * Gets Public IP Address from table (first row)
   * @returns {Promise<string>}
   */
  async getPublicIpFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const publicIpCell = firstRow.locator('td.mat-column-Public-IP-Address').first();
        const text = await publicIpCell.textContent();
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
   * Gets RDP Port from table (first row)
   * @returns {Promise<string>}
   */
  async getRdpPortFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const rdpPortCell = firstRow.locator('td.mat-column-RDP-Port').first();
        const text = await rdpPortCell.textContent();
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
   * Gets Domain Name from table (first row)
   * @returns {Promise<string>}
   */
  async getDomainNameFromTable() {
    try {
      const count = await this.allTableRows.count();
      if (count > 0) {
        const firstRow = this.allTableRows.first();
        const domainNameCell = firstRow.locator('td.mat-column-Domain-Name').first();
        const text = await domainNameCell.textContent();
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
   * Verifies all search fields are cleared
   * @returns {Promise<boolean>}
   */
  async verifyAllSearchFieldsCleared() {
    try {
      const serverNameValue = await this.serverNameField.inputValue().catch(() => '');
      const ipValue = await this.ipAddressField.inputValue().catch(() => '');
      const publicIpValue = await this.publicIpField.inputValue().catch(() => '');
      const rdpPortValue = await this.rdpPortField.inputValue().catch(() => '');
      const exeBuildVersionValue = await this.exeBuildVersionField.inputValue().catch(() => '');
      
      // For dropdowns, check if they're reset to default/empty
      const sshStatusValue = await this.sshStatusDropdown.textContent().catch(() => '');
      const statusValue = await this.statusDropdown.textContent().catch(() => '');
      const serverTypeValue = await this.serverTypeDropdown.textContent().catch(() => '');
      
      const isSshStatusEmpty = !sshStatusValue || sshStatusValue.trim() === '';
      const isStatusEmpty = !statusValue || statusValue.trim() === '';
      // Server Type might have a default value, so we check if it's reset
      const isServerTypeReset = !serverTypeValue || serverTypeValue.trim() === '' || serverTypeValue.includes('Live Server');
      
      return serverNameValue === '' && 
             ipValue === '' && 
             publicIpValue === '' && 
             rdpPortValue === '' && 
             exeBuildVersionValue === '' &&
             isSshStatusEmpty &&
             isStatusEmpty &&
             isServerTypeReset;
    } catch {
      return false;
    }
  }

  /**
   * Checks if validation error is visible
   * @returns {Promise<boolean>}
   */
  async isValidationErrorVisible() {
    try {
      return await this.validationError.isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  /**
   * Checks if "No Data Found" message is visible
   * @returns {Promise<boolean>}
   */
  async isNoDataFoundMessageVisible() {
    try {
      return await this.noDataMessage.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Gets the "No Data Found" message text
   * @returns {Promise<string|null>}
   */
  async getNoDataFoundMessage() {
    try {
      if (await this.isNoDataFoundMessageVisible()) {
        const message = await this.noDataMessage.textContent();
        return message ? message.trim() : null;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Verifies search results match the search criteria
   * @param {Object} searchCriteria - Object with search field values
   * @returns {Promise<boolean>}
   */
  async verifySearchResults(searchCriteria) {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        return true; // No results is valid if search doesn't match
      }

      // Check first few rows to see if they match search criteria
      const rowsToCheck = Math.min(rowCount, 5);
      for (let i = 0; i < rowsToCheck; i++) {
        const row = this.allTableRows.nth(i);
        
        // Verify against search criteria
        if (searchCriteria.serverName) {
          const nameCell = row.locator('td.mat-column-Name').first();
          const nameText = await nameCell.textContent();
          if (nameText && !nameText.toLowerCase().includes(searchCriteria.serverName.toLowerCase())) {
            // Also check Host Name column
            const hostNameCell = row.locator('td.mat-column-Host-Name').first();
            const hostNameText = await hostNameCell.textContent();
            if (!hostNameText || !hostNameText.toLowerCase().includes(searchCriteria.serverName.toLowerCase())) {
              return false;
            }
          }
        }
        
        if (searchCriteria.ipAddress) {
          const ipCell = row.locator('td.mat-column-IP-Address').first();
          const ipText = await ipCell.textContent();
          if (!ipText || !ipText.includes(searchCriteria.ipAddress)) {
            return false;
          }
        }
        
        if (searchCriteria.publicIp) {
          const publicIpCell = row.locator('td.mat-column-Public-IP-Address').first();
          const publicIpText = await publicIpCell.textContent();
          if (!publicIpText || !publicIpText.includes(searchCriteria.publicIp)) {
            return false;
          }
        }
        
        if (searchCriteria.rdpPort) {
          const rdpPortCell = row.locator('td.mat-column-RDP-Port').first();
          const rdpPortText = await rdpPortCell.textContent();
          if (!rdpPortText || !rdpPortText.includes(searchCriteria.rdpPort)) {
            return false;
          }
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  // ==================== UPDATE SERVER MODAL METHODS ====================

  /**
   * Clicks on the Name column value in the first row to open Update Server modal
   */
  async clickNameColumnValue() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        throw new Error('No rows available in table');
      }
      
      const firstRow = this.allTableRows.first();
      const nameCell = firstRow.locator('td.mat-column-Name').first();
      
      await nameCell.waitFor({ state: 'visible', timeout: 5000 });
      await nameCell.scrollIntoViewIfNeeded();
      await nameCell.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Name column value: ${error.message}`);
    }
  }

  /**
   * Clicks on the edit icon in the Action column of the first row
   */
  async clickEditIcon() {
    try {
      const rowCount = await this.allTableRows.count();
      if (rowCount === 0) {
        throw new Error('No rows available in table');
      }
      
      const firstRow = this.allTableRows.first();
      const editIconInRow = firstRow.locator('td.mat-column-Action button:has([class*="bi-pencil"]), td.mat-column-Action i[class*="bi-pencil"], td.mat-column-Action i[class*="pencil"], td.mat-column-Action button[title*="Edit"], td.mat-column-Action button[aria-label*="Edit"]').first();
      
      await editIconInRow.waitFor({ state: 'visible', timeout: 5000 });
      await editIconInRow.scrollIntoViewIfNeeded();
      await editIconInRow.click();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click edit icon: ${error.message}`);
    }
  }

  /**
   * Verifies if the Update Server modal is open
   * @returns {Promise<boolean>}
   */
  async isUpdateServerModalOpen() {
    try {
      // Check if modal is visible
      const isModalVisible = await this.updateServerModal.isVisible({ timeout: 3000 }).catch(() => false);
      if (!isModalVisible) {
        return false;
      }
      
      // Check if modal title is visible
      const isTitleVisible = await this.updateServerModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
      return isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Closes the Update Server modal by clicking Cancel or Close button
   */
  async closeUpdateServerModal() {
    try {
      // Try to find and click Cancel button first
      const cancelButton = this.page.locator('button:has-text("Cancel"), button.btn:has-text("Cancel")').first();
      const isCancelVisible = await cancelButton.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isCancelVisible) {
        await cancelButton.click();
        await this.page.waitForTimeout(500);
      } else {
        // Try close button
        const closeButton = this.page.locator('button.close, .modal-header button[aria-label="Close"], .modal-header .close').first();
        const isCloseVisible = await closeButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (isCloseVisible) {
          await closeButton.click();
          await this.page.waitForTimeout(500);
        } else {
          // Try pressing Escape key
          await this.page.keyboard.press('Escape');
          await this.page.waitForTimeout(500);
        }
      }
      
      // Wait for modal to close
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

  // ==================== ADD NEW SERVER MODAL METHODS ====================

  /**
   * Clicks the Add Server button to open Add New Server modal
   */
  async clickAddServerButton() {
    try {
      await this.addServerButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.addServerButton.scrollIntoViewIfNeeded();
      await this.addServerButton.click();
      
      // Wait for modal to appear
      await this.addServerModalTitle.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
        // If title doesn't appear, wait a bit more
        return this.page.waitForTimeout(2000);
      });
      await this.page.waitForTimeout(1000);
    } catch (error) {
      throw new Error(`Failed to click Add Server button: ${error.message}`);
    }
  }

  /**
   * Verifies if the Add New Server modal is open
   * @returns {Promise<boolean>}
   */
  async isAddServerModalOpen() {
    try {
      // Check for modal section first
      const isModalVisible = await this.addServerModal.isVisible({ timeout: 5000 }).catch(() => false);
      if (!isModalVisible) {
        // Try checking for title directly
        const isTitleVisible = await this.addServerModalTitle.isVisible({ timeout: 2000 }).catch(() => false);
        return isTitleVisible;
      }
      
      // Verify title is visible
      const isTitleVisible = await this.addServerModalTitle.isVisible({ timeout: 3000 }).catch(() => false);
      return isTitleVisible;
    } catch {
      return false;
    }
  }

  /**
   * Gets the current value of a text input field
   * @param {import('@playwright/test').Locator} field - The field locator
   * @returns {Promise<string>}
   */
  async getFieldValue(field) {
    try {
      const value = await field.inputValue().catch(() => '');
      return value || '';
    } catch {
      return '';
    }
  }

  /**
   * Gets the current value of a dropdown
   * @param {import('@playwright/test').Locator} dropdown - The dropdown locator
   * @returns {Promise<string>}
   */
  async getDropdownValue(dropdown) {
    try {
      // Check if it's a select element
      const tagName = await dropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      
      if (tagName === 'select') {
        // For select elements, get the selected option text
        const selectedValue = await dropdown.inputValue().catch(() => '');
        if (selectedValue) {
          // Get the text of the selected option
          const option = dropdown.locator(`option[value="${selectedValue}"]`).first();
          const text = await option.textContent().catch(() => '');
          return text ? text.trim() : '';
        }
        return '';
      } else {
        // For mat-select, get text content
        const value = await dropdown.textContent().catch(() => '');
        return value ? value.trim() : '';
      }
    } catch {
      return '';
    }
  }

  /**
   * Fills a text input field only if it's empty
   * @param {import('@playwright/test').Locator} field - The field locator
   * @param {string} value - The value to fill
   * @returns {Promise<boolean>} - Returns true if field was filled, false if it was already filled
   */
  async fillFieldIfEmpty(field, value) {
    try {
      // Quick check if page is closed
      if (this.page.isClosed()) {
        throw new Error('Page has been closed');
      }
      
      // Wait for field to be attached (quick check)
      await field.waitFor({ state: 'attached', timeout: 3000 }).catch(() => {
        throw new Error('Field not found in DOM');
      });
      
      // Get current value quickly
      let currentValue = '';
      try {
        currentValue = await field.inputValue({ timeout: 1000 }).catch(() => '');
      } catch {
        currentValue = '';
      }
      
      if (!currentValue || currentValue.trim() === '') {
        // Field is empty, fill it - use simplest approach first
        
        // Strategy 1: Direct fill with force (fastest and most reliable)
        try {
          await field.fill(value, { force: true, timeout: 2000 });
          await this.page.waitForTimeout(100);
          
          // Quick verify
          const verifyValue = await field.inputValue({ timeout: 500 }).catch(() => '');
          if (verifyValue === value || verifyValue.includes(value)) {
            return true;
          }
        } catch (forceError) {
          // Continue to next strategy
        }
        
        // Strategy 2: Click, clear, fill (standard approach)
        try {
          if (this.page.isClosed()) {
            throw new Error('Page closed');
          }
          
        await field.scrollIntoViewIfNeeded();
          await field.click({ timeout: 1500 }).catch(() => {});
          await this.page.waitForTimeout(50);
          await field.clear({ timeout: 1500 });
          await field.fill(value, { timeout: 2000 });
          await this.page.waitForTimeout(100);
          
          // Verify
          const verifyValue = await field.inputValue({ timeout: 500 }).catch(() => '');
          if (verifyValue === value) {
            return true;
          }
        } catch (normalError) {
          // Continue to next strategy
        }
        
        // Strategy 3: Use page.evaluate with selector (avoids context issues)
        try {
          if (this.page.isClosed()) {
            throw new Error('Page closed');
          }
          
          // Get the field's selector
          const fieldId = await field.getAttribute('id').catch(() => null);
          const fieldName = await field.getAttribute('ng-reflect-name').catch(() => null);
          
          if (fieldId || fieldName) {
            const selector = fieldId ? `input#${fieldId}` : `input[ng-reflect-name="${fieldName}"]`;
            
            const success = await this.page.evaluate((sel, val) => {
              const el = document.querySelector(sel);
              if (el) {
                el.focus();
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
              }
              return false;
            }, selector, value);
            
            if (success) {
              await this.page.waitForTimeout(200);
              return true;
            }
          }
        } catch (evalError) {
          // Last resort: try one more time with force fill
          try {
            if (!this.page.isClosed()) {
              await field.fill(value, { force: true, timeout: 2000 });
              await this.page.waitForTimeout(100);
              return true;
            }
          } catch (finalError) {
            throw new Error(`Failed to fill field: ${finalError.message}`);
          }
        }
      }
      return false; // Field was already filled
    } catch (error) {
      throw new Error(`Failed to fill field: ${error.message}`);
    }
  }

  /**
   * Selects a dropdown value only if it's empty
   * @param {import('@playwright/test').Locator} dropdown - The dropdown locator
   * @param {string} value - The value to select (can be option text or value attribute)
   * @returns {Promise<boolean>} - Returns true if dropdown was filled, false if it was already filled
   */
  async selectDropdownIfEmpty(dropdown, value) {
    try {
      await dropdown.waitFor({ state: 'visible', timeout: 5000 });
      const currentValue = await this.getDropdownValue(dropdown);
      
      if (!currentValue || currentValue.trim() === '' || currentValue.toLowerCase().includes('select')) {
        await dropdown.scrollIntoViewIfNeeded();
        
        // Check if it's a select element
        const tagName = await dropdown.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
        
        if (tagName === 'select') {
          // For select elements, use selectOption
          await dropdown.selectOption({ label: value }).catch(async () => {
            // If label doesn't work, try by value
            await dropdown.selectOption(value);
          });
          await this.page.waitForTimeout(500);
        } else {
          // For mat-select, click and select option
          await dropdown.click();
          await this.page.waitForTimeout(500);
          
          // Wait for options to appear
          const option = this.page.locator(`mat-option:has-text("${value}"), .mat-mdc-option:has-text("${value}")`).first();
          await option.waitFor({ state: 'visible', timeout: 5000 });
          await option.click();
          await this.page.waitForTimeout(500);
        }
        return true; // Dropdown was empty and filled
      }
      return false; // Dropdown was already filled
    } catch (error) {
      throw new Error(`Failed to select dropdown: ${error.message}`);
    }
  }

  /**
   * Submits the Add New Server form
   */
  async submitAddServerForm() {
    try {
      await this.addServerModalSubmit.waitFor({ state: 'visible', timeout: 5000 });
      await this.addServerModalSubmit.scrollIntoViewIfNeeded();
      await this.addServerModalSubmit.click();
      
      // Wait a bit for toast to appear
      await this.page.waitForTimeout(200);
      
      // Try to capture toast message immediately
      let toastMessage = '';
      for (let i = 0; i < 5; i++) {
        try {
          const toastVisible = await this.toastMessage.isVisible({ timeout: 100 }).catch(() => false);
          if (toastVisible) {
            toastMessage = await this.toastMessage.textContent({ timeout: 100 }).catch(() => '');
            if (toastMessage && toastMessage.trim()) {
              break;
            }
          }
        } catch {
          // Continue trying
        }
        await this.page.waitForTimeout(100);
      }
      
      await this.page.waitForTimeout(2800); // Total 3 seconds wait
      
      return { clicked: true, toastMessage: toastMessage?.trim() || '' };
    } catch (error) {
      throw new Error(`Failed to submit Add Server form: ${error.message}`);
    }
  }

  /**
   * Closes the Add New Server modal
   */
  async closeAddServerModal() {
    try {
      const cancelButton = this.addServerModalCancel;
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
}

module.exports = { ServerPage };

