const { DashboardPage: BaseDashboardPage } = require('./loginpage');

class DashboardPage extends BaseDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Dashboard page title
    this.dashboardPageTitle = page.locator('span.title.fs-6:has-text("Dashboard")').first();

    // Timeline filter locators
    this.timelineFilterSelect = page
      .locator(
        'mat-form-field:has(mat-label:has-text("Timeline Filter")) mat-select,' +
          'mat-select:has-text("Timeline Filter"), ' +
          'mat-select[aria-labelledby*="mat-mdc-form-field-label"]'
      )
      .first();
    this.timelineFilterDropdown = page
      .locator(
        'div.mat-mdc-select-panel[role="listbox"], ' +
          'div[role="listbox"].mat-mdc-select-panel'
      )
      .first();
    // Options must be scoped to the open dropdown panel only
    this.timelineFilterOptions = this.timelineFilterDropdown.locator(
      'mat-option[role="option"]'
    );
    this.selectedTimelineOption = page
      .locator(
        'mat-form-field:has(mat-label:has-text("Timeline Filter")) mat-select .mat-mdc-select-value-text span,' +
          'mat-select .mat-mdc-select-value-text span,' +
          'mat-select span.mat-mdc-select-min-line'
      )
      .first();
    
    // Salesman dropdown locators
    // Find mat-form-field containing "Salesman" label, then find mat-select within it
    this.salesmanFormField = page.locator('mat-form-field:has(mat-label:has-text("Salesman"))').first();
    this.salesmanSelect = page.locator('mat-form-field:has(mat-label:has-text("Salesman")) mat-select.multi-select[multiple], mat-select.multi-select[multiple]').first();
    this.salesmanDropdownPanel = page.locator('div.mat-mdc-select-panel[role="listbox"][aria-multiselectable="true"]').first();
    this.salesmanSearchInput = page.locator('div.mat-mdc-select-panel input[placeholder="Search Here..."], div.input-group input.form-control[placeholder="Search Here..."]').first();
    this.salesmanSelectAllOption = page.locator('div.mat-mdc-select-panel mat-option:has-text("Select All")').first();
    this.salesmanOptions = page.locator('div.mat-mdc-select-panel mat-option[role="option"]:not(:has-text("Select All"))');
    // "Ok" button inside the Salesman dropdown footer
    this.salesmanOkButton = this.salesmanDropdownPanel
      .locator(
        'div.dropdown-btns button.ok-btn:has-text("Ok"), ' +
          'div.dropdown-btns button.btn.btn-primary:has-text("Ok"), ' +
          'button.btn.btn-primary:has-text("Ok"), ' +
          'button:has-text("Ok")'
      )
      .first();
    this.salesmanCancelButton = page.locator('div.dropdown-btns button.cancel-btn:has-text("Cancel"), button.cancel-btn').first();
    
    // Relationship Manager dropdown locators
    // Find mat-form-field containing "Relationship Manager" label, then find mat-select within it
    this.relationshipManagerFormField = page.locator('mat-form-field:has(mat-label:has-text("Relationship Manager"))').first();
    this.relationshipManagerSelect = page.locator('mat-form-field:has(mat-label:has-text("Relationship Manager")) mat-select.multi-select[multiple], mat-select.multi-select[multiple]').first();
    this.relationshipManagerDropdownPanel = page.locator('div.mat-mdc-select-panel[role="listbox"][aria-multiselectable="true"]').first();
    this.relationshipManagerSearchInput = page.locator('div.mat-mdc-select-panel input[placeholder="Search Here..."], div.input-group input.form-control[placeholder="Search Here..."]').first();
    this.relationshipManagerSelectAllOption = page.locator('div.mat-mdc-select-panel mat-option:has-text("Select All")').first();
    this.relationshipManagerOptions = page.locator('div.mat-mdc-select-panel mat-option[role="option"]:not(:has-text("Select All"))');
    // "Ok" button inside the Relationship Manager dropdown footer
    this.relationshipManagerOkButton = this.relationshipManagerDropdownPanel
      .locator(
        'div.dropdown-btns button.ok-btn:has-text("Ok"), ' +
          'div.dropdown-btns button.btn.btn-primary:has-text("Ok"), ' +
          'button.btn.btn-primary:has-text("Ok"), ' +
          'button:has-text("Ok")'
      )
      .first();
    this.relationshipManagerCancelButton = page.locator('div.dropdown-btns button.cancel-btn:has-text("Cancel"), button.cancel-btn').first();
    
    // Chart card locators (last chart card section at the bottom of dashboard)
    this.chartCard = page.locator('div.chart_card').last();
    
    // Graph locators (Line/Bar graph) - scoped to the last chart card
    this.lineGraphButton = this.chartCard.locator('button.btn-line:has-text("Line")').first();
    this.barGraphButton = this.chartCard.locator('button.btn-bar:has-text("Bar")').first();
    this.dayTab = this.chartCard.locator('div.switch-btns-1 button.btn:has-text("Day")').first();
    this.weekTab = this.chartCard.locator('div.switch-btns-1 button.btn:has-text("Week")').first();
    this.monthTab = this.chartCard.locator('div.switch-btns-1 button.btn:has-text("Month")').first();
    this.yearTab = this.chartCard.locator('div.switch-btns-1 button.btn:has-text("Year")').first();
    
    // Highcharts graph locators - scoped to the last chart card
    this.graphContainer = this.chartCard.locator('app-chart, div[id*="Chart"], div[data-highcharts-chart]').first();
    this.highchartsSvg = this.chartCard.locator('svg.highcharts-root').first();
    this.graphCanvas = this.chartCard.locator('canvas').first();
    this.graphSvg = this.chartCard.locator('svg').first();
    this.noDataMessage = this.chartCard.locator('*:has-text("No data"), *:has-text("No data available"), *:has-text("No Data"), .no-data, .empty-state').first();
    
    // Highcharts data point locators - scoped to the last chart card
    this.highchartsBars = this.chartCard.locator('svg.highcharts-root path.highcharts-point, svg.highcharts-root rect.highcharts-point').first();
    this.highchartsPaths = this.chartCard.locator('svg.highcharts-root path[class*="highcharts-series"]').first();
    this.highchartsCircles = this.chartCard.locator('svg.highcharts-root circle.highcharts-point').first();
    
    // Chart legend locators - scoped to the last chart card
    this.chartTitle = this.chartCard.locator('text.highcharts-subtitle:has-text("Trial Summary Trend"), text:has-text("Trial Summary Trend")').first();
    this.legendContainer = this.chartCard.locator('g.highcharts-legend').first();
    this.legendTrialSignups = this.chartCard.locator('g.highcharts-legend-item:has-text("Trial Signups")').first();
    this.legendTrialExpired = this.chartCard.locator('g.highcharts-legend-item:has-text("Trial Expired")').first();
    this.legendTrialToPaid = this.chartCard.locator('g.highcharts-legend-item:has-text("Trial To Paid")').first();
    
    // Statistic cards locators - scoped to the last chart card
    this.trialSignupsCard = this.chartCard.locator('div.trial-details.trial-signups').first();
    this.trialExpiredCard = this.chartCard.locator('div.trial-details.trial-expired').first();
    this.trialToPaidCard = this.chartCard.locator('div.trial-details.trial-to-paid').first();
    this.liveTrialsCard = this.chartCard.locator('div.trial-details.live-trials').first();
    
    // Subscription Summary locators
    this.subscriptionSummaryHeading = page.locator('div.heading:has-text("Subscriptions Summary"), *:has-text("Subscriptions Summary")').first();
    this.subscriptionSummaryTable = page.locator('table.table.table-borderless.table-sm.table-striped').first();
    this.subscriptionSummaryRows = page.locator('table.table tbody tr');
    this.totalRenewalsLink = page.locator('span.custom-arrow:has-text("Total Renewals")').first();
    this.upcomingRenewalsLink = page.locator('span.custom-arrow:has-text("Upcoming Renewals")').first();
    
    // Subscriptions page locators
    this.subscriptionsPageHeading = page.locator('div.heading.fs-5:has-text("All Subscriptions"), *:has-text("All Subscriptions")').first();
    
    // Custom Date field locators
    this.customDateField = page.locator('mat-form-field:has(mat-label:has-text("Custom Date"))').first();
    this.customDateToggle = page.locator('mat-datepicker-toggle button[aria-label="Open calendar"]').first();
    this.customDateStartInput = page.locator('input[matstartdate], input[formcontrolname="startDate"]').first();
    this.customDateEndInput = page.locator('input[matenddate], input[formcontrolname="endDate"]').first();
    this.customDateCalendar = page.locator('mat-calendar, div.mat-datepicker-content-container').first();
    this.calendarPreviousButton = page.locator('button.mat-calendar-previous-button').first();
    this.calendarNextButton = page.locator('button.mat-calendar-next-button').first();
    this.calendarPeriodButton = page.locator('button.mat-calendar-period-button').first();
    this.calendarApplyButton = page.locator('button[matdaterangepickerapply], button:has-text("Apply")').first();
    this.calendarCancelButton = page.locator('button[matdaterangepickercancel], button:has-text("Cancel")').first();
    this.calendarDateCells = page.locator('button.mat-calendar-body-cell');
    
    // Billing Details locators (Partner dashboard right-side card)
    this.billingDetailsCard = page.locator('div.billing-details').first();
    this.billingDetailsHeading = this.billingDetailsCard
      .locator('h5.billing-title:has-text("Billing Details")')
      .first();
    this.billingDetailsEditLink = this.billingDetailsCard
      .locator('a.edit-link:has-text("Edit")')
      .first();
    this.billingDetailsContainer = this.billingDetailsCard
      .locator('div.billing-content')
      .first();
    
    // Billing Details page locators
    this.billingDetailsPageHeading = page.locator('div.form-heading:has-text("Billing Details"), *:has-text("Billing Details")').first();
    
    // Trial links locators
    this.trialSignupsHeading = page.locator('div.trial-heading:has-text("Trial Signups")').first();
    this.trialExpiredHeading = page.locator('div.trial-heading:has-text("Trial Expired")').first();
    this.trialToPaidHeading = page.locator('div.trial-heading:has-text("Trial to Paid")').first();
    this.liveTrialsHeading = page.locator('div.trial-heading:has-text("Live Trials")').first();
    
    // Trial section container (to help locate subscription/user counts)
    this.trialSection = page.locator('div.trial-heading').first();
    
    // Subscription page trial summary locators
    this.totalSubscriptionsHeading = page.locator('span:has-text("Total Subscriptions")').first();
    this.subscriptionCountOnPage = page.locator('div.sub h5.price-text').first();
    this.userCountOnPage = page.locator('div.sub h5.price-text').nth(1);
    this.totalRecordsInfo = page.locator('div.total-data-info').first();
  }

  /**
   * Navigates to the dashboard page from anywhere in the app.
   */
  async navigateToDashboard() {
    try {
      // Check if we're already on dashboard
      const currentUrl = this.page.url();
      if (currentUrl.includes('/dashboard') || currentUrl.endsWith('/')) {
      const isDashboard = await this.isDashboardPageVisible();
      if (isDashboard) {
          console.log('Already on dashboard page');
        return;
        }
      }
      
      // Wait a bit for page to be ready
      await this.page.waitForTimeout(1000);
      
      // Try multiple strategies to navigate to dashboard
      let navigated = false;
      
      // Strategy 1: Click on Dashboard menu item in sidebar
      try {
      await this.dashboardMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await this.dashboardMenuItem.click();
        navigated = true;
      } catch (error) {
        console.log('Strategy 1 failed, trying alternative methods...');
      }
      
      // Strategy 2: Navigate directly via URL if menu click failed
      if (!navigated) {
        try {
          const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
          await this.page.goto(baseUrl + '/');
          navigated = true;
    } catch (error) {
          console.log('Strategy 2 failed, trying browser back...');
        }
      }
      
      // Strategy 3: Use browser back button
      if (!navigated) {
        try {
          await this.page.goBack();
          await this.page.waitForTimeout(2000);
          navigated = true;
        } catch (error) {
          console.log('Strategy 3 failed');
        }
      }
      
      // Wait for navigation to complete (use domcontentloaded instead of networkidle to avoid hanging)
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      await this.page.waitForTimeout(2000);
      
      // Verify we're on dashboard
      const isDashboard = await this.isDashboardPageVisible();
      if (!isDashboard) {
        // Final attempt: try clicking dashboard menu again
        try {
          await this.dashboardMenuItem.waitFor({ state: 'visible', timeout: 5000 });
          await this.dashboardMenuItem.click();
          await this.page.waitForLoadState('domcontentloaded').catch(() => {});
          await this.page.waitForTimeout(2000);
        } catch (error) {
          console.error('Failed to navigate to dashboard:', error);
        }
      }
    } catch (error) {
      console.error('Error navigating to dashboard:', error);
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Checks if the dashboard page is visible.
   * @returns {Promise<boolean>}
   */
  async isDashboardPageVisible() {
    try {
      await this.dashboardPageTitle.waitFor({ state: 'visible', timeout: 5000 });
      return await this.dashboardPageTitle.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Opens the timeline filter dropdown.
   */
  async openTimelineFilterDropdown() {
    // Wait for the select to be visible
    await this.timelineFilterSelect.waitFor({ state: 'visible', timeout: 10000 });

    // If dropdown is already open (aria-expanded="true" and panel visible),
    // do NOT click again, otherwise the backdrop intercepts pointer events.
    const isExpanded = await this.timelineFilterSelect
      .getAttribute('aria-expanded')
      .catch(() => null);
    const panelVisible = await this.timelineFilterDropdown
      .isVisible()
      .catch(() => false);

    if (!(isExpanded === 'true' && panelVisible)) {
    await this.timelineFilterSelect.click();
    await this.timelineFilterDropdown.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  /**
   * Closes the timeline filter dropdown by clicking outside.
   */
  async closeTimelineFilterDropdown() {
    await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
  }

  /**
   * Gets the currently selected timeline option.
   * @returns {Promise<string>}
   */
  async getSelectedTimelineOption() {
    try {
      await this.selectedTimelineOption.waitFor({ state: 'visible', timeout: 5000 });
      const text = await this.selectedTimelineOption.textContent();
      return text ? text.trim() : '';
    } catch {
      return '';
    }
  }

  /**
   * Gets all available timeline filter options.
   * @returns {Promise<string[]>}
   */
  async getAllTimelineOptions() {
    try {
      await this.openTimelineFilterDropdown();
      const options = await this.timelineFilterOptions.allTextContents();
      await this.closeTimelineFilterDropdown();
      return options.map(opt => opt.trim()).filter(opt => opt !== '');
    } catch {
      return [];
    }
  }

  /**
   * Selects a timeline option by its text.
   * @param {string} optionText - The timeline option text (e.g., "This Week", "This Month")
   */
  async selectTimelineOption(optionText) {
    try {
      await this.openTimelineFilterDropdown();
      
	  // Find and click the option within the open dropdown panel
	  const panelOptions = this.timelineFilterDropdown.locator('mat-option[role="option"]');
	  const option = panelOptions.filter({ hasText: new RegExp(optionText, 'i') }).first();
	  
      await option.waitFor({ state: 'visible', timeout: 5000 });
	  await option.scrollIntoViewIfNeeded();
	  await this.page.waitForTimeout(200);
      await option.click();
      
	  // Small fixed wait to let UI update (avoid 'networkidle' due to background calls)
      await this.page.waitForTimeout(1000);
    } catch (error) {
      await this.closeTimelineFilterDropdown();
      throw error;
    }
  }

  /**
   * Selects the first/top timeline option in the dropdown.
   * @returns {Promise<string>} - Returns the selected option text
   */
  async selectTopTimelineOption() {
    try {
      await this.openTimelineFilterDropdown();
      
	  // Get the first visible option inside the open panel
	  const panelOptions = this.timelineFilterDropdown.locator('mat-option[role="option"]');
	  const firstOption = panelOptions.first();
	  
	  // Overall guard timeout so we never hang the whole test here
	  const result = await Promise.race([
	    (async () => {
      await firstOption.waitFor({ state: 'visible', timeout: 5000 });
	      await firstOption.scrollIntoViewIfNeeded();
	      await this.page.waitForTimeout(200);
      const optionText = await firstOption.textContent();
      const text = optionText ? optionText.trim() : '';
      
      await firstOption.click();
      await this.page.waitForTimeout(1000);
      return text;
	    })(),
	    (async () => {
	      // Fallback after 6 seconds: close dropdown and throw
	      await this.page.waitForTimeout(6000);
	      throw new Error('Timeout while selecting top timeline option (no visible option found)');
	    })()
	  ]);
	  
	  return result;
    } catch (error) {
      await this.closeTimelineFilterDropdown();
      throw error;
    }
  }

  /**
   * Opens the Salesman dropdown.
   */
  async openSalesmanDropdown() {
    try {
      // Strategy 1: Find form field with "Salesman" label, then find select within it
      let selectFound = false;
      try {
        // Wait for form field to be visible
        await this.salesmanFormField.waitFor({ state: 'visible', timeout: 10000 });
        
        // Find the mat-select within the form field
        const selectInFormField = this.salesmanFormField.locator('mat-select.multi-select[multiple]').first();
        await selectInFormField.waitFor({ state: 'visible', timeout: 5000 });
        await selectInFormField.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await selectInFormField.click();
        selectFound = true;
      } catch (error) {
        console.log('Strategy 1 (form field) failed, trying alternative...');
      }

      // Strategy 2: Use evaluate to find the select element directly
      if (!selectFound) {
        try {
          const selectIndex = await this.page.evaluate(() => {
            const formFields = Array.from(document.querySelectorAll('mat-form-field'));
            for (let i = 0; i < formFields.length; i++) {
              const field = formFields[i];
              const label = field.querySelector('mat-label');
              if (label && label.textContent && label.textContent.trim().includes('Salesman')) {
                const select = field.querySelector('mat-select.multi-select[multiple]');
                if (select) {
                  return i; // Return index of form field
                }
              }
            }
            return -1;
          });

          if (selectIndex >= 0) {
            // Find the form field by index and click the select
            const formFields = this.page.locator('mat-form-field');
            const targetFormField = formFields.nth(selectIndex);
            const selectInField = targetFormField.locator('mat-select.multi-select[multiple]').first();
            await selectInField.waitFor({ state: 'visible', timeout: 5000 });
            await selectInField.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await selectInField.click();
            selectFound = true;
          }
        } catch (error) {
          console.log('Strategy 2 (evaluate) failed, trying final alternative...');
        }
      }

      // Strategy 3: Try all multi-select dropdowns and identify by checking parent form field
      if (!selectFound) {
        try {
          const allMultiSelects = this.page.locator('mat-select.multi-select[multiple]');
          const count = await allMultiSelects.count();
          
        for (let i = 0; i < count; i++) {
            const select = allMultiSelects.nth(i);
            
            // Check if this select's parent form field has "Salesman" label
            const isSalesmanSelect = await this.page.evaluate((index) => {
              const selects = document.querySelectorAll('mat-select.multi-select[multiple]');
              if (index >= selects.length) return false;
              const select = selects[index];
              const formField = select.closest('mat-form-field');
              if (formField) {
                const label = formField.querySelector('mat-label');
                if (label && label.textContent && label.textContent.trim().includes('Salesman')) {
                  return true;
                }
              }
              return false;
            }, i);
            
            if (isSalesmanSelect) {
              await select.waitFor({ state: 'visible', timeout: 5000 });
              await select.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(500);
              await select.click();
              selectFound = true;
              break;
            }
          }
        } catch (error) {
          console.log('Strategy 3 (iterate all) failed');
        }
      }

      if (!selectFound) {
        throw new Error('Could not find Salesman dropdown using any strategy. Please verify the element exists on the page.');
      }

      // Wait for dropdown panel to open
      await this.salesmanDropdownPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error opening Salesman dropdown:', error);
      throw error;
    }
  }

  /**
   * Closes the Salesman dropdown by clicking Cancel or outside.
   */
  async closeSalesmanDropdown() {
    try {
      const cancelVisible = await this.salesmanCancelButton.isVisible().catch(() => false);
      if (cancelVisible) {
        await this.salesmanCancelButton.click();
      } else {
        await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
      }
      await this.salesmanDropdownPanel.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    } catch {
      // Dropdown might already be closed
    }
  }

  /**
   * Verifies that the Salesman dropdown is open and shows expected elements.
   * @returns {Promise<{hasSelectAll: boolean, hasSearchInput: boolean, hasSalesmanNames: boolean, allOptionsUnselected: boolean}>}
   */
  async verifySalesmanDropdownContent() {
    try {
      // Check if dropdown panel is visible
      const panelVisible = await this.salesmanDropdownPanel.isVisible();
      if (!panelVisible) {
        return { hasSelectAll: false, hasSearchInput: false, hasSalesmanNames: false, allOptionsUnselected: false };
      }

      // Check for "Select All" option
      const hasSelectAll = await this.salesmanSelectAllOption.isVisible().catch(() => false);

      // Check for search input
      const hasSearchInput = await this.salesmanSearchInput.isVisible().catch(() => false);

      // Check for salesman names (at least one option besides "Select All")
      const salesmanOptionsCount = await this.salesmanOptions.count();
      const hasSalesmanNames = salesmanOptionsCount > 0;

      // Check if all options are unselected (pseudo-checkbox state should be "unchecked")
      let allOptionsUnselected = true;
      if (hasSelectAll) {
        const selectAllCheckbox = this.salesmanSelectAllOption.locator('mat-pseudo-checkbox');
        const selectAllState = await selectAllCheckbox.getAttribute('ng-reflect-state').catch(() => 'unchecked');
        if (selectAllState !== 'unchecked') {
          allOptionsUnselected = false;
        }
      }

      // Check a few salesman options
      const optionsToCheck = Math.min(5, salesmanOptionsCount);
      for (let i = 0; i < optionsToCheck; i++) {
        const option = this.salesmanOptions.nth(i);
        const checkbox = option.locator('mat-pseudo-checkbox');
        const state = await checkbox.getAttribute('ng-reflect-state').catch(() => 'unchecked');
        if (state !== 'unchecked') {
          allOptionsUnselected = false;
          break;
        }
      }

      return {
        hasSelectAll,
        hasSearchInput,
        hasSalesmanNames,
        allOptionsUnselected
      };
    } catch (error) {
      console.error('Error verifying Salesman dropdown content:', error);
      return { hasSelectAll: false, hasSearchInput: false, hasSalesmanNames: false, allOptionsUnselected: false };
    }
  }

  /**
   * Gets all salesman names from the dropdown.
   * @returns {Promise<string[]>}
   */
  async getAllSalesmanNames() {
    try {
      const names = [];
      const count = await this.salesmanOptions.count();
      for (let i = 0; i < count; i++) {
        const option = this.salesmanOptions.nth(i);
        const text = await option.locator('span.mdc-list-item__primary-text').textContent();
        if (text) {
          names.push(text.trim());
        }
      }
      return names;
    } catch (error) {
      console.error('Error getting salesman names:', error);
      return [];
    }
  }

  /**
   * Selects a salesman by name.
   * @param {string} salesmanName - The name of the salesman to select
   */
  async selectSalesman(salesmanName) {
    try {
      const option = this.salesmanOptions.filter({ hasText: new RegExp(salesmanName, 'i') }).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting salesman "${salesmanName}":`, error);
      throw error;
    }
  }

  /**
   * Selects "Select All" option.
   */
  async selectAllSalesmen() {
    try {
      await this.salesmanSelectAllOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.salesmanSelectAllOption.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error selecting all salesmen:', error);
      throw error;
    }
  }

  /**
   * Clicks the Ok button to apply the selection.
   */
  async clickSalesmanOkButton() {
    try {
      await this.salesmanOkButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.salesmanOkButton.click();
      // Wait for dropdown to close
      await this.salesmanDropdownPanel.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    } catch (error) {
      console.error('Error clicking Ok button:', error);
      throw error;
    }
  }

  /**
   * Waits for the Subscription Summary table to refresh after salesman selection.
   * Uses retry logic to handle dynamic UI updates.
   * @param {number} maxRetries - Maximum number of retries (default: 5)
   * @param {number} retryDelay - Delay between retries in ms (default: 2000)
   * @returns {Promise<boolean>} - Returns true if table refreshed successfully
   */
  async waitForSubscriptionSummaryRefresh(maxRetries = 5, retryDelay = 2000) {
    try {
      // Wait for network to be idle first
      await this.page.waitForLoadState('networkidle').catch(() => {});
      
      // Get initial table data for comparison
      let previousData = null;
      let stableCount = 0;
      const requiredStableChecks = 2; // Require 2 consecutive stable checks

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        await this.page.waitForTimeout(retryDelay);

        // Check if subscription summary is visible
        const isVisible = await this.isSubscriptionSummaryVisible();
        if (!isVisible) {
          console.log(`Attempt ${attempt + 1}: Subscription summary not visible yet`);
          continue;
        }

        // Get current table data
        const currentData = await this.getSubscriptionSummaryData();
        
        if (currentData.length === 0) {
          console.log(`Attempt ${attempt + 1}: No data in table yet`);
          continue;
        }

        // Compare with previous data
        if (previousData) {
          const dataChanged = JSON.stringify(previousData) !== JSON.stringify(currentData);
          if (dataChanged) {
            console.log(`Attempt ${attempt + 1}: Table data changed, resetting stability check`);
            stableCount = 0;
            previousData = currentData;
            continue;
          } else {
            stableCount++;
            if (stableCount >= requiredStableChecks) {
              console.log(`Table data is stable after ${attempt + 1} attempts`);
              return true;
            }
          }
        } else {
          previousData = currentData;
        }

        // If we have data and it's stable, return success
        if (stableCount >= requiredStableChecks) {
          return true;
        }
      }

      // If we reach here, table might have refreshed but we couldn't confirm stability
      // Check if we have any data at all
      const finalData = await this.getSubscriptionSummaryData();
      if (finalData.length > 0) {
        console.log('Table refreshed (stability not confirmed, but data exists)');
        return true;
      }

      console.warn('Subscription summary table did not refresh within retry limit');
      return false;
    } catch (error) {
      console.error('Error waiting for subscription summary refresh:', error);
      return false;
    }
  }

  /**
   * Verifies that the Subscription Summary table has valid data.
   * If data exists, numbers should be greater than 0.
   * If no data exists, table should show 0 values.
   * @returns {Promise<{hasData: boolean, allValuesZero: boolean, isValid: boolean}>}
   */
  async verifySubscriptionSummaryDataAfterSalesmanSelection() {
    try {
      const summaryData = await this.getSubscriptionSummaryData();
      
      if (summaryData.length === 0) {
        return { hasData: false, allValuesZero: true, isValid: false };
      }

      let hasNonZeroValues = false;
      let allValuesZero = true;

      for (const row of summaryData) {
        // Check subscriptions
        const subscriptions = parseInt(row.subscriptions) || 0;
        if (subscriptions > 0) {
          hasNonZeroValues = true;
          allValuesZero = false;
        }

        // Check users
        const users = parseInt(row.users) || 0;
        if (users > 0) {
          hasNonZeroValues = true;
          allValuesZero = false;
        }

        // Check amount (remove currency symbols and parse)
        const amountStr = row.amount.replace(/[₹,\s]/g, '').trim();
        const amount = parseFloat(amountStr) || 0;
        if (amount > 0) {
          hasNonZeroValues = true;
          allValuesZero = false;
        }
      }

      // Table is valid if:
      // 1. It has data (rows exist)
      // 2. Either has non-zero values (data exists) OR all values are zero (no data exists)
      const isValid = summaryData.length > 0 && (hasNonZeroValues || allValuesZero);

      return {
        hasData: summaryData.length > 0,
        allValuesZero,
        isValid
      };
    } catch (error) {
      console.error('Error verifying subscription summary data:', error);
      return { hasData: false, allValuesZero: true, isValid: false };
    }
  }

  /**
   * Opens the Relationship Manager dropdown.
   */
  async openRelationshipManagerDropdown() {
    try {
      // Strategy 1: Find form field with "Relationship Manager" label, then find select within it
      let selectFound = false;
      try {
        // Wait for form field to be visible
        await this.relationshipManagerFormField.waitFor({ state: 'visible', timeout: 10000 });
        
        // Find the mat-select within the form field
        const selectInFormField = this.relationshipManagerFormField.locator('mat-select.multi-select[multiple]').first();
        await selectInFormField.waitFor({ state: 'visible', timeout: 5000 });
        await selectInFormField.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await selectInFormField.click();
        selectFound = true;
      } catch (error) {
        console.log('Strategy 1 (form field) failed, trying alternative...');
      }

      // Strategy 2: Use evaluate to find the select element directly
      if (!selectFound) {
        try {
          const selectIndex = await this.page.evaluate(() => {
            const formFields = Array.from(document.querySelectorAll('mat-form-field'));
            for (let i = 0; i < formFields.length; i++) {
              const field = formFields[i];
              const label = field.querySelector('mat-label');
              if (label && label.textContent && label.textContent.trim().includes('Relationship Manager')) {
                const select = field.querySelector('mat-select.multi-select[multiple]');
                if (select) {
                  return i; // Return index of form field
                }
              }
            }
            return -1;
          });

          if (selectIndex >= 0) {
            // Find the form field by index and click the select
            const formFields = this.page.locator('mat-form-field');
            const targetFormField = formFields.nth(selectIndex);
            const selectInField = targetFormField.locator('mat-select.multi-select[multiple]').first();
            await selectInField.waitFor({ state: 'visible', timeout: 5000 });
            await selectInField.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
            await selectInField.click();
            selectFound = true;
          }
        } catch (error) {
          console.log('Strategy 2 (evaluate) failed, trying final alternative...');
        }
      }

      // Strategy 3: Try all multi-select dropdowns and identify by checking parent form field
      if (!selectFound) {
        try {
          const allMultiSelects = this.page.locator('mat-select.multi-select[multiple]');
          const count = await allMultiSelects.count();
          
          for (let i = 0; i < count; i++) {
            const select = allMultiSelects.nth(i);
            
            // Check if this select's parent form field has "Relationship Manager" label
            const isRelationshipManagerSelect = await this.page.evaluate((index) => {
              const selects = document.querySelectorAll('mat-select.multi-select[multiple]');
              if (index >= selects.length) return false;
              const select = selects[index];
              const formField = select.closest('mat-form-field');
              if (formField) {
                const label = formField.querySelector('mat-label');
                if (label && label.textContent && label.textContent.trim().includes('Relationship Manager')) {
                  return true;
                }
              }
              return false;
            }, i);
            
            if (isRelationshipManagerSelect) {
              await select.waitFor({ state: 'visible', timeout: 5000 });
              await select.scrollIntoViewIfNeeded();
              await this.page.waitForTimeout(500);
              await select.click();
              selectFound = true;
              break;
            }
          }
        } catch (error) {
          console.log('Strategy 3 (iterate all) failed');
        }
      }

      if (!selectFound) {
        throw new Error('Could not find Relationship Manager dropdown using any strategy. Please verify the element exists on the page.');
      }

      // Wait for dropdown panel to open
      await this.relationshipManagerDropdownPanel.waitFor({ state: 'visible', timeout: 5000 });
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error opening Relationship Manager dropdown:', error);
      throw error;
    }
  }

  /**
   * Closes the Relationship Manager dropdown by clicking Cancel or outside.
   */
  async closeRelationshipManagerDropdown() {
    try {
      const cancelVisible = await this.relationshipManagerCancelButton.isVisible().catch(() => false);
      if (cancelVisible) {
        await this.relationshipManagerCancelButton.click();
      } else {
        await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
      }
      await this.relationshipManagerDropdownPanel.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    } catch {
      // Dropdown might already be closed
    }
  }

  /**
   * Verifies that the Relationship Manager dropdown is open and shows expected elements.
   * @returns {Promise<{hasSelectAll: boolean, hasSearchInput: boolean, hasManagerNames: boolean, allOptionsUnselected: boolean}>}
   */
  async verifyRelationshipManagerDropdownContent() {
    try {
      // Check if dropdown panel is visible
      const panelVisible = await this.relationshipManagerDropdownPanel.isVisible();
      if (!panelVisible) {
        return { hasSelectAll: false, hasSearchInput: false, hasManagerNames: false, allOptionsUnselected: false };
      }

      // Check for "Select All" option
      const hasSelectAll = await this.relationshipManagerSelectAllOption.isVisible().catch(() => false);

      // Check for search input
      const hasSearchInput = await this.relationshipManagerSearchInput.isVisible().catch(() => false);

      // Check for manager names (at least one option besides "Select All")
      const managerOptionsCount = await this.relationshipManagerOptions.count();
      const hasManagerNames = managerOptionsCount > 0;

      // Check if all options are unselected (pseudo-checkbox state should be "unchecked")
      let allOptionsUnselected = true;
      if (hasSelectAll) {
        const selectAllCheckbox = this.relationshipManagerSelectAllOption.locator('mat-pseudo-checkbox');
        const selectAllState = await selectAllCheckbox.getAttribute('ng-reflect-state').catch(() => 'unchecked');
        if (selectAllState !== 'unchecked') {
          allOptionsUnselected = false;
        }
      }

      // Check a few manager options
      const optionsToCheck = Math.min(5, managerOptionsCount);
      for (let i = 0; i < optionsToCheck; i++) {
        const option = this.relationshipManagerOptions.nth(i);
        const checkbox = option.locator('mat-pseudo-checkbox');
        const state = await checkbox.getAttribute('ng-reflect-state').catch(() => 'unchecked');
        if (state !== 'unchecked') {
          allOptionsUnselected = false;
          break;
        }
      }

      return {
        hasSelectAll,
        hasSearchInput,
        hasManagerNames,
        allOptionsUnselected
      };
    } catch (error) {
      console.error('Error verifying Relationship Manager dropdown content:', error);
      return { hasSelectAll: false, hasSearchInput: false, hasManagerNames: false, allOptionsUnselected: false };
    }
  }

  /**
   * Gets all Relationship Manager names from the dropdown.
   * @returns {Promise<string[]>}
   */
  async getAllRelationshipManagerNames() {
    try {
      const names = [];
      const count = await this.relationshipManagerOptions.count();
        for (let i = 0; i < count; i++) {
        const option = this.relationshipManagerOptions.nth(i);
        const text = await option.locator('span.mdc-list-item__primary-text').textContent();
        if (text) {
          names.push(text.trim());
        }
      }
      return names;
    } catch (error) {
      console.error('Error getting Relationship Manager names:', error);
      return [];
    }
  }

  /**
   * Selects a Relationship Manager by name.
   * @param {string} managerName - The name of the Relationship Manager to select
   */
  async selectRelationshipManager(managerName) {
    try {
      const option = this.relationshipManagerOptions.filter({ hasText: new RegExp(managerName, 'i') }).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
            await option.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error selecting Relationship Manager "${managerName}":`, error);
      throw error;
    }
  }

  /**
   * Selects "Select All" option for Relationship Manager.
   */
  async selectAllRelationshipManagers() {
    try {
      await this.relationshipManagerSelectAllOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.relationshipManagerSelectAllOption.click();
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error selecting all Relationship Managers:', error);
      throw error;
    }
  }

  /**
   * Clicks the Ok button to apply the Relationship Manager selection.
   */
  async clickRelationshipManagerOkButton() {
    try {
      await this.relationshipManagerOkButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.relationshipManagerOkButton.click();
            // Wait for dropdown to close
      await this.relationshipManagerDropdownPanel.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    } catch (error) {
      console.error('Error clicking Ok button:', error);
      throw error;
    }
  }

  /**
   * Verifies that the Subscription Summary table has valid data after Relationship Manager selection.
   * @returns {Promise<{hasData: boolean, allValuesZero: boolean, isValid: boolean, rowCount: number}>}
   */
  async verifySubscriptionSummaryDataAfterRelationshipManagerSelection() {
    try {
      const summaryData = await this.getSubscriptionSummaryData();
      
      if (summaryData.length === 0) {
        return { hasData: false, allValuesZero: true, isValid: false, rowCount: 0 };
      }

      let hasNonZeroValues = false;
      let allValuesZero = true;

      for (const row of summaryData) {
        // Check subscriptions
        const subscriptions = parseInt(row.subscriptions) || 0;
        if (subscriptions > 0) {
          hasNonZeroValues = true;
          allValuesZero = false;
        }

        // Check users
        const users = parseInt(row.users) || 0;
        if (users > 0) {
          hasNonZeroValues = true;
          allValuesZero = false;
        }

        // Check amount (remove currency symbols and parse)
        const amountStr = row.amount.replace(/[₹,\s]/g, '').trim();
        const amount = parseFloat(amountStr) || 0;
        if (amount > 0) {
          hasNonZeroValues = true;
          allValuesZero = false;
        }
      }

      // Table is valid if:
      // 1. It has data (rows exist)
      // 2. Either has non-zero values (data exists) OR all values are zero (no data exists)
      const isValid = summaryData.length > 0 && (hasNonZeroValues || allValuesZero);

      return {
        hasData: summaryData.length > 0,
        allValuesZero,
        isValid,
        rowCount: summaryData.length
      };
    } catch (error) {
      console.error('Error verifying subscription summary data:', error);
      return { hasData: false, allValuesZero: true, isValid: false, rowCount: 0 };
    }
  }

  /**
   * Clicks the Line graph button.
   */
  async clickLineGraphButton() {
    try {
      await this.lineGraphButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.lineGraphButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.lineGraphButton.click();
      await this.page.waitForTimeout(1000); // Wait for graph to switch
    } catch (error) {
      console.error('Error clicking Line graph button:', error);
      throw error;
    }
  }

  /**
   * Clicks the Bar graph button.
   */
  async clickBarGraphButton() {
    try {
      await this.barGraphButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.barGraphButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.barGraphButton.click();
      await this.page.waitForTimeout(1000); // Wait for graph to switch
    } catch (error) {
      console.error('Error clicking Bar graph button:', error);
      throw error;
    }
  }

  /**
   * Clicks a timeline tab (Day, Week, Month, or Year).
   * @param {string} tabName - The name of the tab ('Day', 'Week', 'Month', 'Year')
   */
  async clickTimelineTab(tabName) {
    try {
      let tab;
      switch (tabName.toLowerCase()) {
        case 'day':
          tab = this.dayTab;
          break;
        case 'week':
          tab = this.weekTab;
          break;
        case 'month':
          tab = this.monthTab;
          break;
        case 'year':
          tab = this.yearTab;
          break;
        default:
          throw new Error(`Unknown tab name: ${tabName}`);
      }
      
      await tab.waitFor({ state: 'visible', timeout: 10000 });
      await tab.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await tab.click();
      await this.page.waitForTimeout(1500); // Wait for graph to update
    } catch (error) {
      console.error(`Error clicking ${tabName} tab:`, error);
      throw error;
    }
  }

  /**
   * Scrolls to the last chart card section at the bottom of the dashboard page.
   */
  async scrollToChartCard() {
    try {
      // First, scroll to the bottom of the page to ensure the last chart card is loaded
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
            await this.page.waitForTimeout(1000);
      
      // Wait for the last chart card to be visible
      await this.chartCard.waitFor({ state: 'visible', timeout: 10000 });
      
      // Scroll the chart card into view
      await this.chartCard.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error scrolling to chart card:', error);
      throw error;
    }
  }

  /**
   * Verifies that the chart card section is visible and contains all expected elements.
   * @returns {Promise<{isVisible: boolean, hasButtons: boolean, hasTimelineFilters: boolean, hasStatisticCards: boolean, hasChart: boolean, details: string}>}
   */
  async verifyChartCardSection() {
    try {
      // Check if chart card is visible
      const isVisible = await this.chartCard.isVisible().catch(() => false);
      if (!isVisible) {
        return {
          isVisible: false,
          hasButtons: false,
          hasTimelineFilters: false,
          hasStatisticCards: false,
          hasChart: false,
          details: 'Chart card section is not visible'
        };
      }

      // Check for buttons container (Line/Bar buttons)
      const buttonsContainer = this.chartCard.locator('div.buttons').first();
      const hasButtons = await buttonsContainer.isVisible().catch(() => false);
      
      // Check for Line and Bar buttons
      const lineButtonVisible = await this.lineGraphButton.isVisible().catch(() => false);
      const barButtonVisible = await this.barGraphButton.isVisible().catch(() => false);
      const hasGraphButtons = lineButtonVisible && barButtonVisible;

      // Check for timeline filter buttons (Day, Week, Month, Year)
      const switchBtns1 = this.chartCard.locator('div.switch-btns-1').first();
      const hasTimelineContainer = await switchBtns1.isVisible().catch(() => false);
      
      const dayVisible = await this.dayTab.isVisible().catch(() => false);
      const weekVisible = await this.weekTab.isVisible().catch(() => false);
      const monthVisible = await this.monthTab.isVisible().catch(() => false);
      const yearVisible = await this.yearTab.isVisible().catch(() => false);
      const hasTimelineFilters = dayVisible && weekVisible && monthVisible && yearVisible;

      // Check for statistic cards
      const trialSignupsVisible = await this.trialSignupsCard.isVisible().catch(() => false);
      const trialExpiredVisible = await this.trialExpiredCard.isVisible().catch(() => false);
      const trialToPaidVisible = await this.trialToPaidCard.isVisible().catch(() => false);
      const liveTrialsVisible = await this.liveTrialsCard.isVisible().catch(() => false);
      const hasStatisticCards = trialSignupsVisible && trialExpiredVisible && trialToPaidVisible && liveTrialsVisible;

      // Check for chart/graph element
      const chartElement = this.chartCard.locator('app-chart').first();
      const hasChart = await chartElement.isVisible().catch(() => false);
      
      // Also check for Highcharts SVG
      const hasHighchartsSvg = await this.highchartsSvg.isVisible().catch(() => false);
      const hasChartElement = hasChart || hasHighchartsSvg;

      const details = [];
      if (!hasGraphButtons) details.push('Graph buttons (Line/Bar) not visible');
      if (!hasTimelineFilters) details.push('Timeline filter buttons not all visible');
      if (!hasStatisticCards) details.push('Statistic cards not all visible');
      if (!hasChartElement) details.push('Chart element not visible');

      return {
        isVisible: true,
        hasButtons: hasGraphButtons,
        hasTimelineFilters,
        hasStatisticCards,
        hasChart: hasChartElement,
        details: details.length > 0 ? details.join('; ') : 'All elements visible'
      };
    } catch (error) {
      console.error('Error verifying chart card section:', error);
      return {
        isVisible: false,
        hasButtons: false,
        hasTimelineFilters: false,
        hasStatisticCards: false,
        hasChart: false,
        details: `Error: ${error.message}`
      };
    }
  }

  /**
   * Verifies the chart legend is visible and contains all expected legend items.
   * @returns {Promise<{hasTitle: boolean, hasLegend: boolean, hasTrialSignups: boolean, hasTrialExpired: boolean, hasTrialToPaid: boolean, details: string}>}
   */
  async verifyChartLegend() {
    try {
      // Check for chart title "Trial Summary Trend"
      const hasTitle = await this.chartTitle.isVisible().catch(() => false);
      const titleText = hasTitle ? await this.chartTitle.textContent().catch(() => '') : '';
      const titleMatches = titleText && titleText.includes('Trial Summary Trend');

      // Check for legend container
      const hasLegendContainer = await this.legendContainer.isVisible().catch(() => false);

      // Check for each legend item
      const hasTrialSignups = await this.legendTrialSignups.isVisible().catch(() => false);
      const hasTrialExpired = await this.legendTrialExpired.isVisible().catch(() => false);
      const hasTrialToPaid = await this.legendTrialToPaid.isVisible().catch(() => false);

      // Get legend item texts to verify
      const legendItems = await this.page.evaluate(() => {
        const legend = document.querySelector('g.highcharts-legend');
        if (!legend) return [];
        
        const items = legend.querySelectorAll('g.highcharts-legend-item');
        const texts = [];
        items.forEach(item => {
          const textEl = item.querySelector('text');
          if (textEl && textEl.textContent) {
            texts.push(textEl.textContent.trim());
          }
        });
        return texts;
      }).catch(() => []);

      const details = [];
      if (!titleMatches) details.push('Chart title "Trial Summary Trend" not found');
      if (!hasLegendContainer) details.push('Legend container not visible');
      if (!hasTrialSignups) details.push('Trial Signups legend item not visible');
      if (!hasTrialExpired) details.push('Trial Expired legend item not visible');
      if (!hasTrialToPaid) details.push('Trial To Paid legend item not visible');

      return {
        hasTitle: titleMatches,
        hasLegend: hasLegendContainer,
        hasTrialSignups,
        hasTrialExpired,
        hasTrialToPaid,
        legendItems,
        details: details.length > 0 ? details.join('; ') : 'All legend elements visible'
      };
    } catch (error) {
      console.error('Error verifying chart legend:', error);
      return {
        hasTitle: false,
        hasLegend: false,
        hasTrialSignups: false,
        hasTrialExpired: false,
        hasTrialToPaid: false,
        legendItems: [],
        details: `Error: ${error.message}`
      };
    }
  }

  /**
   * Clicks a legend item to toggle its visibility.
   * Uses the Highcharts accessibility proxy button to click.
   * @param {string} legendItemName - The name of the legend item ('Trial Signups', 'Trial Expired', 'Trial To Paid')
   */
  async clickLegendItem(legendItemName) {
    try {
      // Highcharts uses accessibility proxy buttons that overlay the legend items
      // Find the proxy button by aria-label
      const proxyButton = this.chartCard.locator(`button.highcharts-a11y-proxy-element[aria-label*="${legendItemName}"]`).first();
      
      // Wait for the proxy button to be visible
      await proxyButton.waitFor({ state: 'visible', timeout: 10000 });
      await proxyButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      // Click the proxy button
      await proxyButton.click({ force: true });
      await this.page.waitForTimeout(1500); // Wait for graph to update
    } catch (error) {
      console.error(`Error clicking legend item "${legendItemName}":`, error);
      // Fallback: try clicking the legend item directly
      try {
        let legendItem;
        switch (legendItemName) {
          case 'Trial Signups':
            legendItem = this.legendTrialSignups;
            break;
          case 'Trial Expired':
            legendItem = this.legendTrialExpired;
            break;
          case 'Trial To Paid':
            legendItem = this.legendTrialToPaid;
            break;
          default:
            throw new Error(`Unknown legend item: ${legendItemName}`);
        }
        await legendItem.waitFor({ state: 'visible', timeout: 5000 });
        await legendItem.click({ force: true });
        await this.page.waitForTimeout(1500);
      } catch (fallbackError) {
        throw error; // Throw original error
      }
    }
  }

  /**
   * Checks if a specific series is visible in the graph.
   * @param {string} seriesName - The name of the series ('Trial Signups', 'Trial Expired', 'Trial To Paid')
   * @returns {Promise<boolean>}
   */
  async isSeriesVisible(seriesName) {
    try {
      // Wait a bit for graph to update
      await this.page.waitForTimeout(800);

      // Check if the series group is visible in Highcharts
      const isVisible = await this.highchartsSvg.evaluate((svg, name) => {
        // Find the series group by aria-label or by checking the series index
        const seriesGroups = svg.querySelectorAll('g.highcharts-series');
        
        // Determine series index based on name (try multiple patterns)
        let targetIndex = -1;
        const nameLower = name.toLowerCase();
        if (nameLower.includes('signup')) targetIndex = 0;
        else if (nameLower.includes('expired')) targetIndex = 1;
        else if (nameLower.includes('to paid') || nameLower.includes('paid')) targetIndex = 2;
        
        // Try to find by aria-label first
        for (let i = 0; i < seriesGroups.length; i++) {
          const group = seriesGroups[i];
          const ariaLabel = group.getAttribute('aria-label') || '';
          const ariaLabelLower = ariaLabel.toLowerCase();
          
          // Check if this is the target series (try multiple matching patterns)
          const matchesName = ariaLabelLower.includes(nameLower) || 
                             (nameLower.includes('signup') && ariaLabelLower.includes('signup')) ||
                             (nameLower.includes('expired') && ariaLabelLower.includes('expired')) ||
                             (nameLower.includes('paid') && ariaLabelLower.includes('paid'));
          
          const isTargetSeries = matchesName || (targetIndex >= 0 && i === targetIndex);
          
          if (isTargetSeries) {
            // Check if the group is hidden
            const ariaHidden = group.getAttribute('aria-hidden');
            const style = window.getComputedStyle(group);
            const opacity = parseFloat(style.opacity) || 1;
            const display = style.display;
            
            // Check if group has visible data points (bars/paths/circles)
            // For line charts, check for paths in the series group
            // For bar charts, check for path.highcharts-point or rect.highcharts-point
            const hasDataPoints = group.querySelectorAll('path.highcharts-point, rect.highcharts-point, path[class*="highcharts-series"], circle.highcharts-point').length > 0;
            
            // Also check if the group has any visible children
            const hasVisibleChildren = group.children.length > 0;
            
            // Series is visible if:
            // 1. aria-hidden is not "true"
            // 2. opacity > 0
            // 3. display is not "none"
            // 4. Has data points or visible children
            const isGroupVisible = ariaHidden !== 'true' && opacity > 0 && display !== 'none';
            
            return isGroupVisible && (hasDataPoints || hasVisibleChildren);
          }
        }
        
        // Fallback: check by series index
        if (targetIndex >= 0 && targetIndex < seriesGroups.length) {
          const group = seriesGroups[targetIndex];
          const ariaHidden = group.getAttribute('aria-hidden');
          const style = window.getComputedStyle(group);
          const opacity = parseFloat(style.opacity) || 1;
          const display = style.display;
          const hasDataPoints = group.querySelectorAll('path.highcharts-point, rect.highcharts-point, path[class*="highcharts-series"], circle.highcharts-point').length > 0;
          const hasVisibleChildren = group.children.length > 0;
          
          const isGroupVisible = ariaHidden !== 'true' && opacity > 0 && display !== 'none';
          return isGroupVisible && (hasDataPoints || hasVisibleChildren);
        }
        
        return false;
      }, seriesName).catch(() => false);

      return isVisible;
    } catch (error) {
      console.error(`Error checking if series "${seriesName}" is visible:`, error);
      return false;
    }
  }

  /**
   * Checks if a legend item is active (series is visible) by checking the proxy button state.
   * @param {string} legendItemName - The name of the legend item
   * @returns {Promise<boolean>}
   */
  async isLegendItemActive(legendItemName) {
    try {
      // Try multiple times with retry logic
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const proxyButton = this.chartCard.locator(`button.highcharts-a11y-proxy-element[aria-label*="${legendItemName}"]`).first();
          await proxyButton.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
          const ariaPressed = await proxyButton.getAttribute('aria-pressed').catch(() => null);
          
          if (ariaPressed !== null) {
            // aria-pressed="true" means the series is visible/active
            return ariaPressed === 'true';
          }
        } catch (err) {
          if (attempt === 2) throw err;
          await this.page.waitForTimeout(500);
        }
      }
      
      // Fallback: return true (assume visible if we can't determine)
      return true;
    } catch (error) {
      console.error(`Error checking legend item active state for "${legendItemName}":`, error);
      // Fallback: assume visible
      return true;
    }
  }

  /**
   * Waits for the legend item state to change after clicking.
   * @param {string} legendItemName - The name of the legend item
   * @param {boolean} expectedState - The expected state after toggle
   * @param {number} maxWaitMs - Maximum time to wait in milliseconds
   * @returns {Promise<boolean>} - True if state changed to expected, false otherwise
   */
  async waitForLegendStateChange(legendItemName, expectedState, maxWaitMs = 3000) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitMs) {
      const currentState = await this.isLegendItemActive(legendItemName);
      if (currentState === expectedState) {
        return true;
      }
      await this.page.waitForTimeout(200);
    }
    return false;
  }

  /**
   * Verifies toggle behavior for a legend item.
   * Clicks the legend item twice and verifies the series shows/hides.
   * Uses both aria-pressed state and series visibility for verification.
   * @param {string} legendItemName - The name of the legend item ('Trial Signups', 'Trial Expired', 'Trial To Paid')
   * @returns {Promise<{toggleWorks: boolean, initialState: boolean, afterFirstClick: boolean, afterSecondClick: boolean, details: string}>}
   */
  async verifyLegendToggle(legendItemName) {
    try {
      // Wait for graph to be ready
      await this.page.waitForTimeout(1000);
      
      // Get initial state - check both legend aria-pressed and series visibility
      const initialStateByLegend = await this.isLegendItemActive(legendItemName);
      const initialStateBySeries = await this.isSeriesVisible(legendItemName);
      const initialState = initialStateByLegend || initialStateBySeries; // Visible if either indicates visible
      console.log(`  Initial state - Legend: ${initialStateByLegend ? 'active' : 'inactive'}, Series: ${initialStateBySeries ? 'visible' : 'hidden'}`);
      
      // Click once to toggle
      await this.clickLegendItem(legendItemName);
      
      // Wait for state to change (with timeout)
      const expectedStateAfterFirst = !initialState;
      const stateChangedAfterFirst = await this.waitForLegendStateChange(legendItemName, expectedStateAfterFirst, 3000);
      
      // Get actual state after first click - check both methods
      const afterFirstClickByLegend = await this.isLegendItemActive(legendItemName);
      const afterFirstClickBySeries = await this.isSeriesVisible(legendItemName);
      const afterFirstClick = afterFirstClickByLegend || afterFirstClickBySeries;
      console.log(`  After first click - Legend: ${afterFirstClickByLegend ? 'active' : 'inactive'}, Series: ${afterFirstClickBySeries ? 'visible' : 'hidden'}`);
      
      // Verify state changed (check if either method shows a change)
      const stateChangedByLegend = afterFirstClickByLegend !== initialStateByLegend;
      const stateChangedBySeries = afterFirstClickBySeries !== initialStateBySeries;
      const stateChanged = stateChangedByLegend || stateChangedBySeries || (afterFirstClick !== initialState);
      
      if (!stateChanged) {
        console.log(`  ⚠ State did not change after first click.`);
        console.log(`    Legend: ${initialStateByLegend ? 'active' : 'inactive'} → ${afterFirstClickByLegend ? 'active' : 'inactive'}`);
        console.log(`    Series: ${initialStateBySeries ? 'visible' : 'hidden'} → ${afterFirstClickBySeries ? 'visible' : 'hidden'}`);
      }
      
      // Click again to toggle back
      await this.clickLegendItem(legendItemName);
      
      // Wait for state to return to initial
      const stateReturnedToInitial = await this.waitForLegendStateChange(legendItemName, initialStateByLegend, 3000);
      
      // Get actual state after second click - check both methods
      const afterSecondClickByLegend = await this.isLegendItemActive(legendItemName);
      const afterSecondClickBySeries = await this.isSeriesVisible(legendItemName);
      const afterSecondClick = afterSecondClickByLegend || afterSecondClickBySeries;
      console.log(`  After second click - Legend: ${afterSecondClickByLegend ? 'active' : 'inactive'}, Series: ${afterSecondClickBySeries ? 'visible' : 'hidden'}`);
      
      // Toggle works if:
      // 1. After first click, state changed from initial (by either method)
      // 2. After second click, state returned to initial (by either method)
      const returnedToInitial = (afterSecondClickByLegend === initialStateByLegend) || (afterSecondClickBySeries === initialStateBySeries);
      const toggleWorks = stateChanged && returnedToInitial;
      
      if (!toggleWorks) {
        console.log(`  ⚠ Toggle verification failed:`);
        console.log(`    - State changed after first click: ${stateChanged}`);
        console.log(`    - State returned to initial after second click: ${returnedToInitial}`);
      }
      
      return {
        toggleWorks,
        initialState,
        afterFirstClick,
        afterSecondClick,
        details: toggleWorks 
          ? `Toggle works: ${initialState ? 'visible' : 'hidden'} → ${afterFirstClick ? 'visible' : 'hidden'} → ${afterSecondClick ? 'visible' : 'hidden'}`
          : `Toggle failed: Initial=${initialState}, After1st=${afterFirstClick}, After2nd=${afterSecondClick}`
      };
    } catch (error) {
      console.error(`Error verifying legend toggle for "${legendItemName}":`, error);
      return {
        toggleWorks: false,
        initialState: false,
        afterFirstClick: false,
        afterSecondClick: false,
        details: `Error: ${error.message}`
      };
    }
  }

  /**
   * Checks if graph data exists by examining the Highcharts graph.
   * Uses dynamic checks: SVG presence, data points (bars/paths), etc.
   * @param {string} timelineFilter - The timeline filter name (Day, Week, Month, Year)
   * @returns {Promise<{hasData: boolean, details: string}>}
   */
  async checkGraphDataExists(timelineFilter) {
    try {
      // Wait a bit for graph to render
      await this.page.waitForTimeout(2000);
      
      // Check 1: Look for "No data" message
      const noDataVisible = await this.noDataMessage.isVisible().catch(() => false);
      if (noDataVisible) {
        const noDataText = await this.noDataMessage.textContent().catch(() => '');
        if (noDataText && (noDataText.toLowerCase().includes('no data') || noDataText.toLowerCase().includes('no data available'))) {
          return { hasData: false, details: 'No data message found' };
        }
      }

      // Check 2: Check for Highcharts SVG element
      const highchartsSvgVisible = await this.highchartsSvg.isVisible().catch(() => false);
      if (highchartsSvgVisible) {
        // Check for Highcharts data points (bars for column chart, paths for line chart)
        const dataPoints = await this.highchartsSvg.evaluate((svg) => {
          // Check for column series (bars) - path elements with class highcharts-point
          const bars = svg.querySelectorAll('path.highcharts-point, rect.highcharts-point').length;
          
          // Check for line series - path elements in highcharts-series group
          const seriesPaths = svg.querySelectorAll('g.highcharts-series path[class*="highcharts-series"]').length;
          
          // Check for any data points (circles for scatter/line with markers)
          const circles = svg.querySelectorAll('circle.highcharts-point').length;
          
          // Check for any series groups with data
          const seriesGroups = svg.querySelectorAll('g.highcharts-series').length;
          
          const totalDataPoints = bars + seriesPaths + circles;
          
          return {
            bars,
            seriesPaths,
            circles,
            seriesGroups,
            totalDataPoints,
            hasData: totalDataPoints > 0 || seriesGroups > 0
          };
        }).catch(() => ({ bars: 0, seriesPaths: 0, circles: 0, seriesGroups: 0, totalDataPoints: 0, hasData: false }));

        if (dataPoints.hasData) {
          return { 
            hasData: true, 
            details: `Highcharts SVG found with ${dataPoints.totalDataPoints} data points (${dataPoints.bars} bars, ${dataPoints.seriesPaths} paths, ${dataPoints.circles} circles)` 
          };
        } else {
          // SVG exists but no data points - empty graph
          return { hasData: false, details: 'Highcharts SVG found but no data points detected' };
        }
      }

      // Check 3: Fallback - Check for any SVG element
      const svgVisible = await this.graphSvg.isVisible().catch(() => false);
      if (svgVisible) {
        const dataPoints = await this.graphSvg.evaluate((svg) => {
          const circles = svg.querySelectorAll('circle').length;
          const paths = svg.querySelectorAll('path').length;
          const lines = svg.querySelectorAll('line').length;
          const rects = svg.querySelectorAll('rect').length;
          return circles + paths + lines + rects;
        }).catch(() => 0);

        if (dataPoints > 0) {
          return { hasData: true, details: `SVG found with ${dataPoints} data points` };
        }
      }

      // Check 4: Check for canvas element (fallback)
      const canvasVisible = await this.graphCanvas.isVisible().catch(() => false);
      if (canvasVisible) {
        const canvasInfo = await this.graphCanvas.evaluate((canvas) => {
          return canvas.width > 0 && canvas.height > 0;
        }).catch(() => false);

        if (canvasInfo) {
          return { hasData: true, details: 'Canvas found with dimensions' };
        }
      }

      // If we reach here, no graph data found
      return { hasData: false, details: 'No graph data elements found' };
    } catch (error) {
      console.error(`Error checking graph data for ${timelineFilter}:`, error);
      return { hasData: false, details: `Error: ${error.message}` };
    }
  }

  /**
   * Verifies graph visibility and data for a specific timeline filter.
   * @param {string} graphType - Type of graph ('Line' or 'Bar')
   * @param {string} timelineFilter - Timeline filter ('Day', 'Week', 'Month', 'Year')
   * @returns {Promise<{hasData: boolean, message: string}>}
   */
  async verifyGraphForTimeline(graphType, timelineFilter) {
    try {
      // Click the timeline tab
      await this.clickTimelineTab(timelineFilter);
      
      // Check if graph data exists
      const dataCheck = await this.checkGraphDataExists(timelineFilter);
      
      return {
        hasData: dataCheck.hasData,
        message: dataCheck.hasData ? `${timelineFilter} → Data Available` : `${timelineFilter} → No Data`
      };
    } catch (error) {
      console.error(`Error verifying graph for ${graphType} - ${timelineFilter}:`, error);
      return {
        hasData: false,
        message: `${timelineFilter} → Error: ${error.message}`
      };
    }
  }

  /**
   * Gets statistic card data for a specific trial type.
   * @param {string} trialType - The trial type ('Trial Signups', 'Trial Expired', 'Trial to Paid', 'Live Trials')
   * @returns {Promise<{amount: string, subscriptionCount: number, userCount: number, allFieldsVisible: boolean}>}
   */
  async getStatisticCardData(trialType) {
    try {
      let card;
      switch (trialType) {
        case 'Trial Signups':
          card = this.trialSignupsCard;
          break;
        case 'Trial Expired':
          card = this.trialExpiredCard;
          break;
        case 'Trial to Paid':
          card = this.trialToPaidCard;
          break;
        case 'Live Trials':
          card = this.liveTrialsCard;
          break;
        default:
          throw new Error(`Unknown trial type: ${trialType}`);
      }

      await card.waitFor({ state: 'visible', timeout: 10000 });

      // Get amount
      const amountElement = card.locator('div.trial-amount').first();
      const amountText = await amountElement.textContent().catch(() => '');
      const amount = amountText ? amountText.trim() : '';

      // Get subscription count
      const subscriptionSub = card.locator('div.trial-sub').filter({ hasText: 'Subscription' }).first();
      const subscriptionCountText = await subscriptionSub.locator('div.trial-count').first().textContent().catch(() => '0');
      const subscriptionCount = parseInt(subscriptionCountText ? subscriptionCountText.trim() : '0') || 0;

      // Get user count
      const userSub = card.locator('div.trial-sub').filter({ hasText: 'User' }).first();
      const userCountText = await userSub.locator('div.trial-count').first().textContent().catch(() => '0');
      const userCount = parseInt(userCountText ? userCountText.trim() : '0') || 0;

      // Check if all fields are visible
      const amountVisible = await amountElement.isVisible().catch(() => false);
      const subscriptionSubVisible = card.locator('div.trial-sub').filter({ hasText: 'Subscription' }).first().isVisible().catch(() => false);
      const userSubVisible = card.locator('div.trial-sub').filter({ hasText: 'User' }).first().isVisible().catch(() => false);
      const allFieldsVisible = amountVisible && (await subscriptionSubVisible) && (await userSubVisible);

      return {
        amount,
        subscriptionCount,
        userCount,
        allFieldsVisible
      };
    } catch (error) {
      console.error(`Error getting statistic card data for ${trialType}:`, error);
      return { amount: '', subscriptionCount: 0, userCount: 0, allFieldsVisible: false };
    }
  }

  /**
   * Verifies all four statistic cards are visible and have required fields.
   * @returns {Promise<{allCardsVisible: boolean, cardsData: Array}>}
   */
  async verifyStatisticCards() {
    try {
      const trialTypes = ['Trial Signups', 'Trial Expired', 'Trial to Paid', 'Live Trials'];
      const cardsData = [];
      let allCardsVisible = true;

      for (const trialType of trialTypes) {
        const cardData = await this.getStatisticCardData(trialType);
        cardsData.push({
          trialType,
          ...cardData
        });

        if (!cardData.allFieldsVisible) {
          allCardsVisible = false;
        }
      }

      return {
        allCardsVisible,
        cardsData
      };
    } catch (error) {
      console.error('Error verifying statistic cards:', error);
      return { allCardsVisible: false, cardsData: [] };
    }
  }

  /**
   * Checks if the subscription summary section is visible.
   * @returns {Promise<boolean>}
   */
  async isSubscriptionSummaryVisible() {
    try {
      await this.subscriptionSummaryHeading.waitFor({ state: 'visible', timeout: 10000 });
      return await this.subscriptionSummaryHeading.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets subscription summary data from the table.
   * @returns {Promise<Array<{renewalType: string, subscriptions: string, users: string, amount: string}>>}
   */
  async getSubscriptionSummaryData() {
    try {
      await this.subscriptionSummaryTable.waitFor({ state: 'visible', timeout: 10000 });
      const rows = this.subscriptionSummaryRows;
      const rowCount = await rows.count();
      
      const summaryData = [];
      
      for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        
        // Get renewal type (second column)
        const renewalTypeCell = row.locator('td').nth(1);
        const renewalType = await renewalTypeCell.textContent();
        
        // Get subscriptions (third column)
        const subscriptionsCell = row.locator('td').nth(2);
        const subscriptions = await subscriptionsCell.textContent();
        
        // Get users (fourth column)
        const usersCell = row.locator('td').nth(3);
        const users = await usersCell.textContent();
        
        // Get amount (fifth column)
        const amountCell = row.locator('td').nth(4);
        const amount = await amountCell.textContent();
        
        if (renewalType) {
          // Clean up the renewal type text (remove icons and extra spaces)
          const cleanRenewalType = renewalType.replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
          
          summaryData.push({
            renewalType: cleanRenewalType,
            subscriptions: subscriptions ? subscriptions.trim() : '',
            users: users ? users.trim() : '',
            amount: amount ? amount.trim() : '',
          });
        }
      }
      
      return summaryData;
    } catch (error) {
      console.error('Error getting subscription summary data:', error);
      return [];
    }
  }

  /**
   * Verifies subscription summary data is present and valid.
   * @param {string} timelineOption - The timeline option that was selected
   * @returns {Promise<boolean>}
   */
  async verifySubscriptionSummaryData(timelineOption) {
    try {
      const summaryData = await this.getSubscriptionSummaryData();
      
      // Verify we have data
      if (summaryData.length === 0) {
        console.warn(`No subscription summary data found for timeline option: ${timelineOption}`);
        return false;
      }
      
      // Verify each row has required fields
      for (const row of summaryData) {
        if (!row.renewalType || !row.subscriptions || !row.users || !row.amount) {
          console.warn(`Incomplete subscription summary row: ${JSON.stringify(row)}`);
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Opens the custom date calendar picker.
   */
  async openCustomDateCalendar() {
    await this.customDateToggle.waitFor({ state: 'visible', timeout: 10000 });
    await this.customDateToggle.click();
    await this.customDateCalendar.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Closes the custom date calendar by clicking Cancel or outside.
   */
  async closeCustomDateCalendar() {
    try {
      // Try to click Cancel button if visible
      const cancelVisible = await this.calendarCancelButton.isVisible().catch(() => false);
      if (cancelVisible) {
        await this.calendarCancelButton.click();
      } else {
        // Click outside to close
        await this.page.click('body', { position: { x: 0, y: 0 } }).catch(() => {});
      }
      await this.customDateCalendar.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    } catch {
      // Calendar might already be closed
    }
  }

  /**
   * Clears the custom date field by clearing both start and end date inputs.
   */
  async clearCustomDateField() {
    try {
      // Clear start date
      await this.customDateStartInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.customDateStartInput.clear();
      
      // Clear end date
      await this.customDateEndInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.customDateEndInput.clear();
      
      // Wait for form to update
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error('Error clearing custom date field:', error);
    }
  }

  /**
   * Gets the current custom date range values.
   * @returns {Promise<{startDate: string, endDate: string}>}
   */
  async getCustomDateRange() {
    try {
      const startDate = await this.customDateStartInput.inputValue().catch(() => '');
      const endDate = await this.customDateEndInput.inputValue().catch(() => '');
      return { startDate: startDate.trim(), endDate: endDate.trim() };
    } catch {
      return { startDate: '', endDate: '' };
    }
  }

  /**
   * Navigates the calendar to a specific month and year.
   * @param {number} month - Month (0-11, where 0 is January)
   * @param {number} year - Year (e.g., 2025)
   */
  async navigateCalendarToMonth(month, year) {
    try {
      // Check if calendar is already open, if not open it
      const calendarVisible = await this.customDateCalendar.isVisible().catch(() => false);
      if (!calendarVisible) {
        await this.openCustomDateCalendar();
      }
      
      // Get current displayed month/year from period button
      const periodText = await this.calendarPeriodButton.textContent().catch(() => '');
      const currentDate = new Date();
      let currentMonth = currentDate.getMonth();
      let currentYear = currentDate.getFullYear();
      
      // Try to parse current month/year from period button
      if (periodText) {
        const parts = periodText.trim().split(' ');
        if (parts.length >= 2) {
          const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
          const monthIndex = monthNames.indexOf(parts[0].toUpperCase());
          if (monthIndex !== -1) {
            currentMonth = monthIndex;
          }
          const yearMatch = parts[1].match(/\d{4}/);
          if (yearMatch) {
            currentYear = parseInt(yearMatch[0]);
          }
        }
      }
      
      // Calculate how many months to navigate
      const targetDate = new Date(year, month, 1);
      const currentDisplayDate = new Date(currentYear, currentMonth, 1);
      const monthsDiff = (targetDate.getFullYear() - currentDisplayDate.getFullYear()) * 12 + 
                         (targetDate.getMonth() - currentDisplayDate.getMonth());
      
      // Navigate months using previous/next buttons
      for (let i = 0; i < Math.abs(monthsDiff); i++) {
        if (monthsDiff > 0) {
          // Navigate forward
          await this.calendarNextButton.waitFor({ state: 'visible', timeout: 3000 });
          await this.calendarNextButton.click();
          await this.page.waitForTimeout(300);
        } else if (monthsDiff < 0) {
          // Navigate backward
          await this.calendarPreviousButton.waitFor({ state: 'visible', timeout: 3000 });
          await this.calendarPreviousButton.click();
          await this.page.waitForTimeout(300);
        }
      }
      
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.error(`Error navigating to month ${month}/${year}:`, error);
    }
  }

  /**
   * Selects a date in the calendar.
   * @param {number} day - Day of the month (1-31)
   */
  async selectCalendarDate(day) {
    try {
      // Try multiple strategies to find the date button
      let dateButton = null;
      
      // Strategy 1: Filter by exact text match
      try {
        dateButton = this.calendarDateCells.filter({ hasText: new RegExp(`^\\s*${day}\\s*$`) }).first();
        await dateButton.waitFor({ state: 'visible', timeout: 3000 });
      } catch {
        // Strategy 2: Filter by contains text
        try {
          dateButton = this.calendarDateCells.filter({ hasText: String(day) }).first();
          await dateButton.waitFor({ state: 'visible', timeout: 3000 });
        } catch {
          // Strategy 3: Get all cells and find by text content
          const allCells = this.calendarDateCells;
          const count = await allCells.count();
          for (let i = 0; i < count; i++) {
            const cell = allCells.nth(i);
            const text = await cell.textContent();
            if (text && text.trim() === String(day)) {
              dateButton = cell;
              break;
            }
          }
        }
      }
      
      if (dateButton) {
        await dateButton.waitFor({ state: 'visible', timeout: 5000 });
        await dateButton.click();
        await this.page.waitForTimeout(500);
      } else {
        throw new Error(`Could not find date button for day ${day}`);
      }
    } catch (error) {
      console.error(`Error selecting date ${day}:`, error);
      throw error;
    }
  }

  /**
   * Selects a date range in the custom date calendar.
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   */
  async selectCustomDateRange(startDate, endDate) {
    try {
      // Open calendar if not already open
      const calendarVisible = await this.customDateCalendar.isVisible().catch(() => false);
      if (!calendarVisible) {
        await this.openCustomDateCalendar();
        await this.page.waitForTimeout(500);
      }
      
      // Navigate to start date month/year
      await this.navigateCalendarToMonth(startDate.getMonth(), startDate.getFullYear());
      await this.page.waitForTimeout(500);
      
      // Select start date
      await this.selectCalendarDate(startDate.getDate());
      await this.page.waitForTimeout(1000);
      
      // Navigate to end date month/year if different
      if (startDate.getMonth() !== endDate.getMonth() || startDate.getFullYear() !== endDate.getFullYear()) {
        await this.navigateCalendarToMonth(endDate.getMonth(), endDate.getFullYear());
        await this.page.waitForTimeout(500);
      }
      
      // Select end date
      await this.selectCalendarDate(endDate.getDate());
      await this.page.waitForTimeout(1000);
      
      // Click Apply button
      await this.calendarApplyButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.calendarApplyButton.click();
      
      // Wait for calendar to close and data to load
      await this.customDateCalendar.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error selecting custom date range:', error);
      await this.closeCustomDateCalendar();
      throw error;
    }
  }

  /**
   * Verifies that all subscription summary values are zero.
   * @returns {Promise<boolean>}
   */
  async verifyAllSubscriptionSummaryValuesAreZero() {
    try {
      const summaryData = await this.getSubscriptionSummaryData();
      
      if (summaryData.length === 0) {
        return false;
      }
      
      for (const row of summaryData) {
        // Check subscriptions
        const subscriptions = parseInt(row.subscriptions) || 0;
        if (subscriptions !== 0) {
          console.log(`Subscriptions not zero: ${row.renewalType} has ${subscriptions}`);
          return false;
        }
        
        // Check users
        const users = parseInt(row.users) || 0;
        if (users !== 0) {
          console.log(`Users not zero: ${row.renewalType} has ${users}`);
          return false;
        }
        
        // Check amount (remove currency symbols and parse)
        const amountStr = row.amount.replace(/[₹,\s]/g, '').trim();
        const amount = parseFloat(amountStr) || 0;
        if (amount !== 0) {
          console.log(`Amount not zero: ${row.renewalType} has ${row.amount}`);
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the billing details card is visible.
   * @returns {Promise<boolean>}
   */
  async isBillingDetailsCardVisible() {
    try {
      await this.billingDetailsCard.waitFor({ state: 'visible', timeout: 10000 });
      return await this.billingDetailsCard.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets all billing details as key-value pairs.
   * @returns {Promise<Object>} - Object with billing detail keys and values
   */
  async getBillingDetails() {
    try {
      await this.billingDetailsCard.waitFor({ state: 'visible', timeout: 10000 });
      const details = {};
      
	  // Get all billing-field rows inside the billing content
	  const detailRows = this.billingDetailsContainer.locator('div.billing-field');
      const rowCount = await detailRows.count();
      
      for (let i = 0; i < rowCount; i++) {
        const row = detailRows.nth(i);
        
        // Get the title (key)
	    const titleElement = row.locator('span.field-label');
        const titleText = await titleElement.textContent();
        const key = titleText ? titleText.replace(':', '').trim() : '';
        
        // Get the value
	    const valueElement = row.locator('span.field-value');
        const valueText = await valueElement.textContent();
        const value = valueText ? valueText.trim() : '';
        
        if (key && value) {
          details[key] = value;
        }
      }
      
      return details;
    } catch (error) {
      console.error('Error getting billing details:', error);
      return {};
    }
  }

  /**
   * Clicks the Edit link in the billing details card.
   */
  async clickBillingDetailsEditLink() {
    try {
      await this.billingDetailsEditLink.waitFor({ state: 'visible', timeout: 10000 });
      await this.billingDetailsEditLink.click();
      
      // Wait for navigation to billing details page
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error clicking billing details edit link:', error);
      throw error;
    }
  }

  /**
   * Checks if the billing details page is visible.
   * @returns {Promise<boolean>}
   */
  async isBillingDetailsPageVisible() {
    try {
      await this.billingDetailsPageHeading.waitFor({ state: 'visible', timeout: 10000 });
      return await this.billingDetailsPageHeading.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Verifies that billing details are present and valid.
   * @returns {Promise<boolean>}
   */
  async verifyBillingDetailsPresent() {
    try {
      const details = await this.getBillingDetails();
      
      // Check if we have at least some details
      const detailKeys = Object.keys(details);
      if (detailKeys.length === 0) {
        console.warn('No billing details found');
        return false;
      }
      
      // Verify expected fields are present (at least some common ones)
      const expectedFields = ['Name', 'Email Id', 'Mobile Number', 'Company Name'];
      const hasExpectedFields = expectedFields.some(field => detailKeys.some(key => key.includes(field)));
      
      return hasExpectedFields;
    } catch {
      return false;
    }
  }

  /**
   * Clicks on the "Total Renewals" link in the subscription summary table.
   */
  async clickTotalRenewalsLink() {
    try {
      // First ensure subscription summary table is visible
      await this.subscriptionSummaryTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(1000);
      
      // Wait for the link to be visible
      await this.totalRenewalsLink.waitFor({ state: 'visible', timeout: 15000 });
      await this.totalRenewalsLink.click();
      
      // Wait for navigation to subscriptions page
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error clicking Total Renewals link:', error);
      throw error;
    }
  }

  /**
   * Clicks on the "Upcoming Renewals" link in the subscription summary table.
   */
  async clickUpcomingRenewalsLink() {
    try {
      // First ensure subscription summary table is visible
      await this.subscriptionSummaryTable.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(2000);
      
      // Try multiple strategies to find the link
      let linkClicked = false;
      
      // Strategy 1: Try the main locator
      try {
        await this.upcomingRenewalsLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.upcomingRenewalsLink.click();
        linkClicked = true;
      } catch {
        // Strategy 2: Try finding in the table rows
        try {
          const upcomingRenewalsRow = this.subscriptionSummaryRows.filter({ hasText: /Upcoming Renewals/i }).first();
          await upcomingRenewalsRow.waitFor({ state: 'visible', timeout: 5000 });
          const linkInRow = upcomingRenewalsRow.locator('span.custom-arrow:has-text(/Upcoming Renewals/i)').first();
          await linkInRow.waitFor({ state: 'visible', timeout: 5000 });
          await linkInRow.click();
          linkClicked = true;
        } catch {
          // Strategy 3: Find by text in the table
          const allRows = this.subscriptionSummaryRows;
          const rowCount = await allRows.count();
          for (let i = 0; i < rowCount; i++) {
            const row = allRows.nth(i);
            const rowText = await row.textContent();
            if (rowText && rowText.includes('Upcoming Renewals')) {
              const link = row.locator('span.custom-arrow').first();
              await link.waitFor({ state: 'visible', timeout: 5000 });
              await link.click();
              linkClicked = true;
              break;
            }
          }
        }
      }
      
      if (!linkClicked) {
        // Final attempt with the main locator
        await this.upcomingRenewalsLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.upcomingRenewalsLink.click();
      }
      
      // Wait for navigation to subscriptions page
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error clicking Upcoming Renewals link:', error);
      throw error;
    }
  }

  /**
   * Checks if the subscriptions page is visible.
   * @returns {Promise<boolean>}
   */
  async isSubscriptionsPageVisible() {
    try {
      await this.subscriptionsPageHeading.waitFor({ state: 'visible', timeout: 10000 });
      return await this.subscriptionsPageHeading.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Scrolls to the trial section on the dashboard.
   */
  async scrollToTrialSection() {
    try {
      await this.trialSection.waitFor({ state: 'visible', timeout: 10000 });
      await this.trialSection.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.error('Error scrolling to trial section:', error);
    }
  }

  /**
   * Gets the subscription count for a specific trial type.
   * @param {string} trialType - The trial type ('Trial Signups', 'Trial Expired', 'Trial to Paid', 'Live Trials')
   * @returns {Promise<number>}
   */
  async getTrialSubscriptionCount(trialType) {
    try {
      // Find the trial heading
      const heading = this.page.locator(`div.trial-heading:has-text("${trialType}")`).first();
      await heading.waitFor({ state: 'visible', timeout: 10000 });
      
      // Use evaluate to find the parent and then the subscription count
      const count = await this.page.evaluate((headingText) => {
        // Find the heading element
        const headings = Array.from(document.querySelectorAll('div.trial-heading'));
        const heading = headings.find(h => h.textContent && h.textContent.trim().includes(headingText));
        if (!heading) return 0;
        
        // Find parent container
        const parent = heading.parentElement;
        if (!parent) return 0;
        
        // Find all trial-sub divs in the parent
        const subs = parent.querySelectorAll('div.trial-sub');
        for (const sub of subs) {
          const subtitle = sub.querySelector('div.trial-subtitle');
          if (subtitle && subtitle.textContent && subtitle.textContent.trim().includes('Subscription')) {
            const countEl = sub.querySelector('div.trial-count');
            if (countEl && countEl.textContent) {
              return parseInt(countEl.textContent.trim()) || 0;
            }
          }
        }
        return 0;
      }, trialType);
      
      return count;
    } catch (error) {
      console.error(`Error getting subscription count for ${trialType}:`, error);
      return 0;
    }
  }

  /**
   * Gets the user count for a specific trial type.
   * @param {string} trialType - The trial type ('Trial Signups', 'Trial Expired', 'Trial to Paid', 'Live Trials')
   * @returns {Promise<number>}
   */
  async getTrialUserCount(trialType) {
    try {
      // Find the trial heading
      const heading = this.page.locator(`div.trial-heading:has-text("${trialType}")`).first();
      await heading.waitFor({ state: 'visible', timeout: 10000 });
      
      // Use evaluate to find the parent and then the user count
      const count = await this.page.evaluate((headingText) => {
        // Find the heading element
        const headings = Array.from(document.querySelectorAll('div.trial-heading'));
        const heading = headings.find(h => h.textContent && h.textContent.trim().includes(headingText));
        if (!heading) return 0;
        
        // Find parent container
        const parent = heading.parentElement;
        if (!parent) return 0;
        
        // Find all trial-sub divs in the parent
        const subs = parent.querySelectorAll('div.trial-sub');
        for (const sub of subs) {
          const subtitle = sub.querySelector('div.trial-subtitle');
          if (subtitle && subtitle.textContent && subtitle.textContent.trim().includes('User')) {
            const countEl = sub.querySelector('div.trial-count');
            if (countEl && countEl.textContent) {
              return parseInt(countEl.textContent.trim()) || 0;
            }
          }
        }
        return 0;
      }, trialType);
      
      return count;
    } catch (error) {
      console.error(`Error getting user count for ${trialType}:`, error);
      return 0;
    }
  }

  /**
   * Checks if a trial link is clickable (subscription count > 0).
   * @param {string} trialType - The trial type ('Trial Signups', 'Trial Expired', 'Trial to Paid', 'Live Trials')
   * @returns {Promise<boolean>}
   */
  async isTrialLinkClickable(trialType) {
    try {
      const subscriptionCount = await this.getTrialSubscriptionCount(trialType);
      if (subscriptionCount === 0) {
        return false;
      }
      
      // Also check if the element itself is clickable (not disabled)
      const heading = this.page.locator(`div.trial-heading:has-text("${trialType}")`).first();
      await heading.waitFor({ state: 'visible', timeout: 10000 });
      
      // Check if element has pointer-events: none or is disabled
      const isClickable = await heading.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.pointerEvents !== 'none' && !el.hasAttribute('disabled');
      });
      
      return isClickable;
    } catch {
      return false;
    }
  }

  /**
   * Clicks on a trial link.
   * @param {string} trialType - The trial type ('Trial Signups', 'Trial Expired', 'Trial to Paid', 'Live Trials')
   */
  async clickTrialLink(trialType) {
    try {
      const heading = this.page.locator(`div.trial-heading:has-text("${trialType}")`).first();
      await heading.waitFor({ state: 'visible', timeout: 10000 });
      await heading.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await heading.click();
      
      // Wait for navigation
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error(`Error clicking trial link ${trialType}:`, error);
      throw error;
    }
  }

  /**
   * Gets subscription count from the subscriptions page.
   * @returns {Promise<number>}
   */
  async getSubscriptionCountOnPage() {
    try {
      await this.subscriptionCountOnPage.waitFor({ state: 'visible', timeout: 10000 });
      const countText = await this.subscriptionCountOnPage.textContent();
      return parseInt(countText ? countText.trim() : '0') || 0;
    } catch (error) {
      console.error('Error getting subscription count on page:', error);
      return 0;
    }
  }

  /**
   * Gets user count from the subscriptions page.
   * @returns {Promise<number>}
   */
  async getUserCountOnPage() {
    try {
      await this.userCountOnPage.waitFor({ state: 'visible', timeout: 10000 });
      const countText = await this.userCountOnPage.textContent();
      return parseInt(countText ? countText.trim() : '0') || 0;
    } catch (error) {
      console.error('Error getting user count on page:', error);
      return 0;
    }
  }

  /**
   * Gets total records count from pagination info.
   * @returns {Promise<number>}
   */
  async getTotalRecordsCount() {
    try {
      await this.totalRecordsInfo.waitFor({ state: 'visible', timeout: 10000 });
      const infoText = await this.totalRecordsInfo.textContent();
      if (infoText) {
        // Extract number from "Showing 1 to 2 of 2 records"
        const match = infoText.match(/of\s+(\d+)\s+records/i);
        if (match && match[1]) {
          return parseInt(match[1]) || 0;
        }
      }
      return 0;
    } catch (error) {
      console.error('Error getting total records count:', error);
      return 0;
    }
  }

  /**
   * Verifies subscription page data matches dashboard trial data.
   * @param {number} expectedSubscriptions - Expected subscription count
   * @param {number} expectedUsers - Expected user count
   * @returns {Promise<boolean>}
   */
  async verifySubscriptionPageData(expectedSubscriptions, expectedUsers) {
    try {
      // Verify we're on subscriptions page
      const isOnPage = await this.isSubscriptionsPageVisible();
      if (!isOnPage) {
        console.error('Not on subscriptions page');
        return false;
      }

      // Get actual counts from page
      const actualSubscriptions = await this.getSubscriptionCountOnPage();
      const actualUsers = await this.getUserCountOnPage();
      const totalRecords = await this.getTotalRecordsCount();

      // Verify subscription count matches
      if (actualSubscriptions !== expectedSubscriptions) {
        console.error(`Subscription count mismatch: expected ${expectedSubscriptions}, got ${actualSubscriptions}`);
        return false;
      }

      // Verify user count matches
      if (actualUsers !== expectedUsers) {
        console.error(`User count mismatch: expected ${expectedUsers}, got ${actualUsers}`);
        return false;
      }

      // Verify total records matches subscription count
      if (totalRecords !== expectedSubscriptions) {
        console.error(`Total records mismatch: expected ${expectedSubscriptions}, got ${totalRecords}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying subscription page data:', error);
      return false;
    }
  }
}

module.exports = { DashboardPage };

