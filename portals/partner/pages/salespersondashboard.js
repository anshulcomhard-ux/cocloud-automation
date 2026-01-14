const { DashboardPage } = require('./DashboardPage');

class SalespersonDashboardPage extends DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Sidebar menu module locators
    // Dashboard module
    this.dashboardModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("Dashboard"), a:has-text("Dashboard"), div:has-text("Dashboard"), li:has-text("Dashboard")').first();
    
    // Cloud User module
    this.cloudUserModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("Cloud User"), a:has-text("Cloud User"), div:has-text("Cloud User"), li:has-text("Cloud User")').first();
    
    // Reports module
    this.reportsModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("Reports"), a:has-text("Reports"), div:has-text("Reports"), li:has-text("Reports")').first();
    
    // Service Request module
    this.serviceRequestModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("Service Request"), a:has-text("Service Request"), div:has-text("Service Request"), li:has-text("Service Request")').first();
    
    // Subscriptions module
    this.subscriptionsModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("Subscriptions"), a:has-text("Subscriptions"), div:has-text("Subscriptions"), li:has-text("Subscriptions")').first();
    
    // License Details module (for Sales Manager)
    this.licenseDetailsModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("License Details"), a:has-text("License Details"), div:has-text("License Details"), li:has-text("License Details")').first();
    
    // Knowledge Base module (for Sales Manager)
    this.knowledgeBaseModule = page.locator('div.sidebar, nav.sidebar, aside.sidebar').locator('span:has-text("Knowledge Base"), a:has-text("Knowledge Base"), div:has-text("Knowledge Base"), li:has-text("Knowledge Base")').first();
  }

  /**
   * Checks if Dashboard module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isDashboardModuleVisible() {
    try {
      await this.dashboardModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.dashboardModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Cloud User module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isCloudUserModuleVisible() {
    try {
      await this.cloudUserModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.cloudUserModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Reports module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isReportsModuleVisible() {
    try {
      await this.reportsModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.reportsModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Service Request module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isServiceRequestModuleVisible() {
    try {
      await this.serviceRequestModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.serviceRequestModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Subscriptions module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isSubscriptionsModuleVisible() {
    try {
      await this.subscriptionsModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.subscriptionsModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the text of Dashboard module
   * @returns {Promise<string>}
   */
  async getDashboardModuleText() {
    try {
      await this.dashboardModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.dashboardModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the text of Cloud User module
   * @returns {Promise<string>}
   */
  async getCloudUserModuleText() {
    try {
      await this.cloudUserModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.cloudUserModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the text of Reports module
   * @returns {Promise<string>}
   */
  async getReportsModuleText() {
    try {
      await this.reportsModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.reportsModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the text of Service Request module
   * @returns {Promise<string>}
   */
  async getServiceRequestModuleText() {
    try {
      await this.serviceRequestModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.serviceRequestModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the text of Subscriptions module
   * @returns {Promise<string>}
   */
  async getSubscriptionsModuleText() {
    try {
      await this.subscriptionsModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.subscriptionsModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Checks if License Details module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isLicenseDetailsModuleVisible() {
    try {
      await this.licenseDetailsModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.licenseDetailsModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if Knowledge Base module is visible in the sidebar
   * @returns {Promise<boolean>}
   */
  async isKnowledgeBaseModuleVisible() {
    try {
      await this.knowledgeBaseModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.knowledgeBaseModule.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the text of License Details module
   * @returns {Promise<string>}
   */
  async getLicenseDetailsModuleText() {
    try {
      await this.licenseDetailsModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.licenseDetailsModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Gets the text of Knowledge Base module
   * @returns {Promise<string>}
   */
  async getKnowledgeBaseModuleText() {
    try {
      await this.knowledgeBaseModule.waitFor({ state: 'visible', timeout: 5000 });
      return await this.knowledgeBaseModule.textContent();
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies all expected salesperson modules are visible
   * @returns {Promise<Object>} Object with visibility status for each module
   */
  async verifyAllSalespersonModules() {
    const modules = {
      dashboard: await this.isDashboardModuleVisible(),
      cloudUser: await this.isCloudUserModuleVisible(),
      reports: await this.isReportsModuleVisible(),
      serviceRequest: await this.isServiceRequestModuleVisible(),
      subscriptions: await this.isSubscriptionsModuleVisible(),
    };

    return modules;
  }

  /**
   * Verifies all expected sales manager modules are visible
   * @returns {Promise<Object>} Object with visibility status for each module
   */
  async verifyAllSalesManagerModules() {
    const modules = {
      dashboard: await this.isDashboardModuleVisible(),
      cloudUser: await this.isCloudUserModuleVisible(),
      reports: await this.isReportsModuleVisible(),
      serviceRequest: await this.isServiceRequestModuleVisible(),
      licenseDetails: await this.isLicenseDetailsModuleVisible(),
      knowledgeBase: await this.isKnowledgeBaseModuleVisible(),
      subscriptions: await this.isSubscriptionsModuleVisible(),
    };

    return modules;
  }

  /**
   * Verifies all expected relationship manager modules are visible
   * @returns {Promise<Object>} Object with visibility status for each module
   */
  async verifyAllRelationshipManagerModules() {
    const modules = {
      dashboard: await this.isDashboardModuleVisible(),
      cloudUser: await this.isCloudUserModuleVisible(),
      reports: await this.isReportsModuleVisible(),
      serviceRequest: await this.isServiceRequestModuleVisible(),
      licenseDetails: await this.isLicenseDetailsModuleVisible(),
      knowledgeBase: await this.isKnowledgeBaseModuleVisible(),
      subscriptions: await this.isSubscriptionsModuleVisible(),
    };

    return modules;
  }

  /**
   * Opens the Salesperson dropdown on the dashboard.
   */
  async openSalespersonDropdown() {
    await this.openSalesmanDropdown();
  }

  /**
   * Gets all options from the Salesperson dropdown.
   * @returns {Promise<Array<{text: string, isSelected: boolean, isEnabled: boolean}>>}
   */
  async getSalespersonDropdownOptions() {
    try {
      // Open the dropdown if not already open
      const isPanelVisible = await this.salesmanDropdownPanel.isVisible({ timeout: 2000 }).catch(() => false);
      if (!isPanelVisible) {
        await this.openSalespersonDropdown();
        await this.page.waitForTimeout(1000);
      }

      // Wait for dropdown panel to be visible
      await this.salesmanDropdownPanel.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get all options (excluding "Select All")
      const options = this.salesmanOptions;
      const count = await options.count();
      const optionList = [];

      for (let i = 0; i < count; i++) {
        try {
          const option = options.nth(i);
          const text = await option.textContent();
          const isSelected = await option.getAttribute('aria-selected') === 'true';
          const isDisabled = await option.getAttribute('aria-disabled') === 'true';
          
          if (text && text.trim()) {
            optionList.push({
              text: text.trim(),
              isSelected: isSelected || false,
              isEnabled: !isDisabled,
            });
          }
        } catch (error) {
          // Skip this option if there's an error
          continue;
        }
      }

      console.log(`Found ${optionList.length} options in Salesperson dropdown`);
      return optionList;
    } catch (error) {
      console.error('Error getting Salesperson dropdown options:', error);
      return [];
    }
  }

  /**
   * Verifies that all assigned users are present in the Salesperson dropdown.
   * @param {Array<{name: string, email: string}>} assignedUsers - List of assigned users with name and email
   * @returns {Promise<{allPresent: boolean, missingUsers: string[], foundUsers: string[]}>}
   */
  async verifyAssignedUsersInDropdown(assignedUsers) {
    try {
      const dropdownOptions = await this.getSalespersonDropdownOptions();
      const optionTexts = dropdownOptions.map(opt => opt.text.toLowerCase());
      
      const foundUsers = [];
      const missingUsers = [];

      for (const assignedUser of assignedUsers) {
        const userName = (assignedUser.name || '').toLowerCase();
        const userEmail = (assignedUser.email || '').toLowerCase();
        
        // Try to match by name first, then by email
        const foundByName = userName && optionTexts.some(optText => 
          optText.includes(userName) || userName.includes(optText)
        );
        const foundByEmail = userEmail && optionTexts.some(optText => 
          optText.includes(userEmail) || userEmail.includes(optText)
        );
        
        if (foundByName || foundByEmail) {
          foundUsers.push(assignedUser.name || assignedUser.email);
        } else {
          missingUsers.push(assignedUser.name || assignedUser.email);
        }
      }

      const allPresent = missingUsers.length === 0;
      
      return {
        allPresent,
        missingUsers,
        foundUsers,
        totalOptions: dropdownOptions.length,
      };
    } catch (error) {
      console.error('Error verifying assigned users in dropdown:', error);
      return {
        allPresent: false,
        missingUsers: assignedUsers.map(u => u.name || u.email),
        foundUsers: [],
        totalOptions: 0,
      };
    }
  }

  /**
   * Verifies that all options in the Salesperson dropdown are selectable.
   * @returns {Promise<{allSelectable: boolean, nonSelectableOptions: string[]}>}
   */
  async verifyAllOptionsAreSelectable() {
    try {
      const dropdownOptions = await this.getSalespersonDropdownOptions();
      const nonSelectableOptions = [];

      for (const option of dropdownOptions) {
        if (!option.isEnabled) {
          nonSelectableOptions.push(option.text);
        }
      }

      const allSelectable = nonSelectableOptions.length === 0;

      return {
        allSelectable,
        nonSelectableOptions,
        totalOptions: dropdownOptions.length,
        selectableCount: dropdownOptions.length - nonSelectableOptions.length,
      };
    } catch (error) {
      console.error('Error verifying options are selectable:', error);
      return {
        allSelectable: false,
        nonSelectableOptions: [],
        totalOptions: 0,
        selectableCount: 0,
      };
    }
  }

  /**
   * Clicks the OK button in the Salesperson dropdown.
   */
  async clickSalespersonDropdownOk() {
    try {
      await this.salesmanOkButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.salesmanOkButton.scrollIntoViewIfNeeded();
      await this.salesmanOkButton.click();
      await this.page.waitForTimeout(1000);
      console.log('✓ Clicked OK button in Salesperson dropdown');
    } catch (error) {
      console.error('Error clicking OK button in Salesperson dropdown:', error);
      throw error;
    }
  }

  /**
   * Checks if Billing Details card is visible on the dashboard.
   * @returns {Promise<boolean>}
   */
  async isBillingDetailsCardVisible() {
    try {
      const billingDetailsCard = this.page.locator('div.billing-details:has(h5.billing-title:has-text("Billing Details"))').first();
      await billingDetailsCard.waitFor({ state: 'visible', timeout: 5000 });
      return await billingDetailsCard.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets billing details from the card on dashboard.
   * @returns {Promise<Object>} Object with billing details (name, email, mobile, etc.)
   */
  async getBillingDetailsFromCard() {
    try {
      const billingDetails = {
        name: '',
        email: '',
        mobile: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        gstTreatment: '',
        country: '',
      };

      // Get name
      try {
        const nameValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Name:")) span.field-value').first();
        if (await nameValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.name = await nameValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get email
      try {
        const emailValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Email Id:")) span.field-value').first();
        if (await emailValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.email = await emailValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get mobile
      try {
        const mobileValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Mobile Number:")) span.field-value').first();
        if (await mobileValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.mobile = await mobileValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get company
      try {
        const companyValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Company:")) span.field-value').first();
        if (await companyValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.company = await companyValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get address
      try {
        const addressValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Address:")) span.field-value').first();
        if (await addressValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.address = await addressValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get city
      try {
        const cityValue = this.page.locator('div.billing-field:has(span.field-label:has-text("City:")) span.field-value').first();
        if (await cityValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.city = await cityValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get state
      try {
        const stateValue = this.page.locator('div.billing-field:has(span.field-label:has-text("State:")) span.field-value').first();
        if (await stateValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.state = await stateValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get zip code
      try {
        const zipCodeValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Zip/Pin code:")) span.field-value').first();
        if (await zipCodeValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.zipCode = await zipCodeValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get GST Treatment
      try {
        const gstTreatmentValue = this.page.locator('div.billing-field:has(span.field-label:has-text("GST Treatment:")) span.field-value').first();
        if (await gstTreatmentValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.gstTreatment = await gstTreatmentValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      // Get country
      try {
        const countryValue = this.page.locator('div.billing-field:has(span.field-label:has-text("Country:")) span.field-value').first();
        if (await countryValue.isVisible({ timeout: 2000 }).catch(() => false)) {
          billingDetails.country = await countryValue.textContent() || '';
        }
      } catch (e) {
        // Continue
      }

      return billingDetails;
    } catch (error) {
      console.error('Error getting billing details from card:', error);
      return {};
    }
  }

  /**
   * Checks if Edit button is visible on Billing Details card.
   * @returns {Promise<boolean>}
   */
  async isEditButtonVisibleOnBillingCard() {
    try {
      const editButton = this.page.locator('div.billing-details:has(h5.billing-title:has-text("Billing Details")) a.edit-link:has-text("Edit"), a.edit-link.ng-star-inserted').first();
      return await editButton.isVisible({ timeout: 2000 }).catch(() => false);
    } catch (error) {
      return false;
    }
  }
}

module.exports = { SalespersonDashboardPage };

