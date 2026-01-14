class BrandingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Page heading "Branding"
    this.brandingHeading = page.locator('div.branding-header h1.branding-title:has-text("Branding"), h1.branding-title:has-text("Branding")').first();

    // Left-side Branding navigation tabs
    // Domain tab
    this.domainTab = page.locator('div.sidebar-menu-header:has(i.bi-globe):has(span:has-text("Domain")), div.sidebar-menu-header:has-text("Domain")').first();
    
    // Website tab
    this.websiteTab = page.locator('div.sidebar-menu-header:has(i.bi-building):has(span:has-text("Website")), div.sidebar-menu-header:has-text("Website")').first();
    
    // Brand Name section - using HTML structure: div.sidebar-submenu-item with span containing "Brand Name"
    this.brandNameOption = page.locator('div.sidebar-submenu-item:has(span:has-text("Brand Name")), div.sidebar-submenu-item.active:has(span:has-text("Brand Name")), div:has-text("Brand Name"), a:has-text("Brand Name"), span:has-text("Brand Name")').first();
    this.brandNameInput = page.locator('input[formcontrolname="brandName"], input[ng-reflect-name="brandName"]').first();
    this.changeButton = page.locator('button.btn-primary:has-text("Change"), button:has-text("Change")').first();
    this.saveButton = page.locator('button.btn-primary:has-text("Save"), button:has-text("Save")').first();
    
    // Toast messages
    this.successToast = page.locator('#toast-container .toast-success, .toast-success, [class*="toast-success"]').first();
    this.toastMessage = page.locator('#toast-container .toast-message, .toast-message, [class*="toast"]').first();
  }

  /**
   * Navigates to Branding module from the left-side menu
   */
  async navigateToBranding() {
    try {
      // Use HTML locator: div with router-link="/branding" or span with "Branding" text
      const brandingLink = this.page.locator('div.sidebar-items[ng-reflect-router-link="/branding"], div[routerlink="/branding"], div.sidebar-items:has(span.title:has-text("Branding")), div.sidebar-items:has-text("Branding")').first();
      
      // Check if it's visible
      const isVisible = await brandingLink.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (isVisible) {
        await brandingLink.scrollIntoViewIfNeeded();
        await brandingLink.click();
        await this.page.waitForTimeout(2000); // Wait for navigation
      } else {
        // Try alternative: click on the span with "Branding" text
        const brandingSpan = this.page.locator('span.title.fs-6:has-text("Branding"), span:has-text("Branding")').first();
        const spanVisible = await brandingSpan.isVisible({ timeout: 5000 }).catch(() => false);
        if (spanVisible) {
          await brandingSpan.scrollIntoViewIfNeeded();
          await brandingSpan.click();
          await this.page.waitForTimeout(2000);
        } else {
          // Try parent div
          const parentDiv = this.page.locator('div.sidebar-items:has(span:has-text("Branding"))').first();
          const parentVisible = await parentDiv.isVisible({ timeout: 5000 }).catch(() => false);
          if (parentVisible) {
            await parentDiv.scrollIntoViewIfNeeded();
            await parentDiv.click();
            await this.page.waitForTimeout(2000);
          } else {
            throw new Error('Branding link not found in sidebar menu');
          }
        }
      }
    } catch (error) {
      throw new Error(`Failed to navigate to Branding module: ${error.message}`);
    }
  }

  /**
   * Verifies the Branding page heading is visible
   * @returns {Promise<boolean>}
   */
  async verifyBrandingHeading() {
    try {
      await this.brandingHeading.waitFor({ state: 'visible', timeout: 10000 });
      return await this.brandingHeading.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies the Domain tab is visible
   * @returns {Promise<boolean>}
   */
  async verifyDomainTab() {
    try {
      await this.domainTab.waitFor({ state: 'visible', timeout: 5000 });
      return await this.domainTab.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies the Website tab is visible
   * @returns {Promise<boolean>}
   */
  async verifyWebsiteTab() {
    try {
      await this.websiteTab.waitFor({ state: 'visible', timeout: 5000 });
      return await this.websiteTab.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies all required elements on the Branding page
   * @returns {Promise<{headingVisible: boolean, domainTabVisible: boolean, websiteTabVisible: boolean}>}
   */
  async verifyBrandingPageElements() {
    const headingVisible = await this.verifyBrandingHeading();
    const domainTabVisible = await this.verifyDomainTab();
    const websiteTabVisible = await this.verifyWebsiteTab();

    return {
      headingVisible,
      domainTabVisible,
      websiteTabVisible
    };
  }

  /**
   * Clicks on Website tab/dropdown
   */
  async clickWebsiteTab() {
    try {
      await this.websiteTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.websiteTab.click();
      await this.page.waitForTimeout(1000); // Wait for dropdown to expand
    } catch (error) {
      throw new Error(`Failed to click Website tab: ${error.message}`);
    }
  }

  /**
   * Selects Brand Name option
   */
  async selectBrandNameOption() {
    try {
      // Strategy 1: Try the main locator with sidebar-submenu-item class
      let clicked = false;
      try {
        const brandNameDiv = this.page.locator('div.sidebar-submenu-item:has(span:has-text("Brand Name"))').first();
        await brandNameDiv.waitFor({ state: 'visible', timeout: 10000 });
        await brandNameDiv.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await brandNameDiv.click();
        clicked = true;
      } catch (error) {
        // Strategy 1 failed, try next
      }

      // Strategy 2: Try using evaluate to find and click the element directly
      if (!clicked) {
        try {
          const result = await this.page.evaluate(() => {
            // Find all sidebar-submenu-item divs
            const submenuItems = Array.from(document.querySelectorAll('div.sidebar-submenu-item'));
            for (const item of submenuItems) {
              const span = item.querySelector('span');
              if (span && span.textContent && span.textContent.trim() === 'Brand Name') {
                item.click();
                return true;
              }
            }
            return false;
          });
          if (result) {
            clicked = true;
          }
        } catch (error) {
          // Strategy 2 failed, try next
        }
      }

      // Strategy 3: Fallback to original locator
      if (!clicked) {
        await this.brandNameOption.waitFor({ state: 'visible', timeout: 10000 });
        await this.brandNameOption.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.brandNameOption.click();
        clicked = true;
      }

      if (!clicked) {
        throw new Error('Could not click Brand Name option using any strategy');
      }
      
      // Wait for Brand Name section to load (input field should appear)
      await this.page.waitForTimeout(1500);
      
      // Wait for the input field to be attached to DOM (even if readonly)
      await this.brandNameInput.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {
        // If not found, wait a bit more
        return this.page.waitForTimeout(1000);
      });
    } catch (error) {
      throw new Error(`Failed to select Brand Name option: ${error.message}`);
    }
  }

  /**
   * Clicks Change button to enable brand name input field
   */
  async clickChangeButton() {
    try {
      await this.changeButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.changeButton.scrollIntoViewIfNeeded();
      await this.changeButton.click();
      await this.page.waitForTimeout(800); // Wait for input to become editable
      
      // Verify input is now editable (readonly attribute should be removed)
      const isReadonly = await this.brandNameInput.getAttribute('readonly');
      if (isReadonly !== null) {
        // If still readonly, wait a bit more
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Failed to click Change button: ${error.message}`);
    }
  }

  /**
   * Gets the current brand name value (works even if input is readonly)
   * @returns {Promise<string>}
   */
  async getBrandName() {
    try {
      // Wait for input to be attached to DOM (works for both visible and readonly inputs)
      await this.brandNameInput.waitFor({ state: 'attached', timeout: 15000 });
      
      // Try to get value - inputValue() works on readonly inputs too
      const value = await this.brandNameInput.inputValue();
      return value.trim();
    } catch (error) {
      // Fallback: try to get value using evaluate
      try {
        const value = await this.page.evaluate(() => {
          const input = document.querySelector('input[formcontrolname="brandName"], input[ng-reflect-name="brandName"]');
          return input ? input.value : '';
        });
        return value.trim();
      } catch (evalError) {
        throw new Error(`Failed to get brand name: ${error.message}`);
      }
    }
  }

  /**
   * Sets the brand name value
   * @param {string} brandName - The brand name to set
   */
  async setBrandName(brandName) {
    try {
      await this.brandNameInput.waitFor({ state: 'visible', timeout: 10000 });
      
      // Clear the field first
      await this.brandNameInput.clear();
      await this.page.waitForTimeout(200);
      
      // Enter new brand name
      await this.brandNameInput.fill(brandName);
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Failed to set brand name: ${error.message}`);
    }
  }

  /**
   * Clicks Save button
   */
  async clickSaveButton() {
    try {
      await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.saveButton.click();
      await this.page.waitForTimeout(1000); // Wait for save operation
    } catch (error) {
      throw new Error(`Failed to click Save button: ${error.message}`);
    }
  }

  /**
   * Verifies success toast message is displayed
   * @returns {Promise<boolean>}
   */
  async verifySuccessToast() {
    try {
      await this.successToast.waitFor({ state: 'visible', timeout: 5000 });
      return await this.successToast.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the toast message text
   * @returns {Promise<string>}
   */
  async getToastMessage() {
    try {
      const message = await this.toastMessage.textContent({ timeout: 3000 });
      return message?.trim() || '';
    } catch (error) {
      return '';
    }
  }
}

module.exports = { BrandingPage };

