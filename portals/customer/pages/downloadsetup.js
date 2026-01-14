class DownloadSetupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.downloadSetupMenu = page.locator('a:has-text("Download Setup"), button:has-text("Download Setup"), a[href*="download-setup"], a[href*="downloadsetup"]').first();
    
    // Page wrapper
    this.downloadSetupWrapper = page.locator('.download-setup-wrapper, .download-setup, [class*="download-setup"]').first();
    
    // Page Header
    this.pageHeader = page.locator('.page-header-modern:has-text("Download Setup"), .header-left:has-text("Download Setup"), h1:has-text("Download Setup"), h2:has-text("Download Setup")').first();
    this.pageTitle = page.locator('h6.page-title-modern:has-text("Download Setup"), h1:has-text("Download Setup"), h2:has-text("Download Setup"), .page-title:has-text("Download Setup")').first();
    
    // Section heading
    this.sectionHeading = page.locator('h3:has-text("Download Setup Link"), h4:has-text("Download Setup Link"), h5:has-text("Download Setup Link"), h6:has-text("Download Setup Link"), .section-heading:has-text("Download Setup Link"), [class*="section-heading"]:has-text("Download Setup Link")').first();
    
    // Download cards/links
    this.printerClientCard = page.locator('.download-card:has-text("CoCloud-Printer-Client.exe"), .card:has-text("CoCloud-Printer-Client.exe"), a:has-text("CoCloud-Printer-Client.exe"), button:has-text("CoCloud-Printer-Client.exe"), [class*="download"]:has-text("CoCloud-Printer-Client.exe")').first();
    this.remoteAppClientCard = page.locator('.download-card:has-text("CoCloud-RemoteAppClient.exe"), .card:has-text("CoCloud-RemoteAppClient.exe"), a:has-text("CoCloud-RemoteAppClient.exe"), button:has-text("CoCloud-RemoteAppClient.exe"), [class*="download"]:has-text("CoCloud-RemoteAppClient.exe")').first();
    this.clientFileSetupCard = page.locator('.download-card:has-text("CoCloud-Client-File-Setup"), .card:has-text("CoCloud-Client-File-Setup"), a:has-text("CoCloud-Client-File-Setup"), button:has-text("CoCloud-Client-File-Setup"), [class*="download"]:has-text("CoCloud-Client-File-Setup")').first();
    
    // All download links/cards container
    this.downloadCardsContainer = page.locator('.download-cards, .download-links, [class*="download-card"], [class*="download-link"]').first();
    
    // Error indicators
    this.errorMessages = page.locator('.error-message, .text-danger, [class*="error"]');
    this.errorToast = page.locator('.toast-error, .alert-error, .toast-danger, [class*="toast-error"], [class*="alert-error"]').first();
  }

  /**
   * Navigates to Download Setup page
   */
  async gotoDownloadSetup() {
    try {
      await this.downloadSetupMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.downloadSetupMenu.click();
    } catch (error) {
      // If menu item not found, try navigating directly
      const currentUrl = this.page.url();
      const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
      await this.page.goto(`${baseUrl}/download-setup`);
    }
    
    await this.page.waitForTimeout(2000);
    
    // Wait for page to load
    await Promise.race([
      this.downloadSetupWrapper.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageTitle.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.pageHeader.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {})
    ]);
  }

  /**
   * Checks if the Download Setup page is visible
   * @returns {Promise<boolean>}
   */
  async isVisible() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 }) || 
             await this.pageHeader.isVisible({ timeout: 5000 }) ||
             await this.downloadSetupWrapper.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page title is visible
   * @returns {Promise<boolean>}
   */
  async isPageTitleVisible() {
    try {
      return await this.pageTitle.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the page title text
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    try {
      const titleVisible = await this.pageTitle.isVisible({ timeout: 5000 });
      if (titleVisible) {
        const text = await this.pageTitle.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies section heading "Download Setup Link" is displayed
   * @returns {Promise<boolean>}
   */
  async isSectionHeadingVisible() {
    try {
      return await this.sectionHeading.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the section heading text
   * @returns {Promise<string>}
   */
  async getSectionHeading() {
    try {
      const headingVisible = await this.sectionHeading.isVisible({ timeout: 5000 });
      if (headingVisible) {
        const text = await this.sectionHeading.textContent();
        return text?.trim() || '';
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Verifies all download cards/links are visible
   * @returns {Promise<{allVisible: boolean, printerClientVisible: boolean, remoteAppClientVisible: boolean, clientFileSetupVisible: boolean}>}
   */
  async verifyDownloadCardsVisible() {
    try {
      const printerClientVisible = await this.printerClientCard.isVisible({ timeout: 3000 }).catch(() => false);
      const remoteAppClientVisible = await this.remoteAppClientCard.isVisible({ timeout: 3000 }).catch(() => false);
      const clientFileSetupVisible = await this.clientFileSetupCard.isVisible({ timeout: 3000 }).catch(() => false);
      
      const allVisible = printerClientVisible && remoteAppClientVisible && clientFileSetupVisible;
      
      return {
        allVisible: allVisible,
        printerClientVisible: printerClientVisible,
        remoteAppClientVisible: remoteAppClientVisible,
        clientFileSetupVisible: clientFileSetupVisible
      };
    } catch (error) {
      return {
        allVisible: false,
        printerClientVisible: false,
        remoteAppClientVisible: false,
        clientFileSetupVisible: false,
        error: error.message
      };
    }
  }

  /**
   * Checks if there are any console errors
   * @returns {Promise<boolean>}
   */
  async hasConsoleErrors() {
    try {
      // Listen for console errors
      const consoleErrors = [];
      this.page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Check for existing errors in page
      const pageErrors = await this.page.evaluate(() => {
        return window.consoleErrors || [];
      });
      
      return consoleErrors.length > 0 || pageErrors.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if there are any error messages on the page
   * @returns {Promise<boolean>}
   */
  async hasErrorMessages() {
    try {
      const errorCount = await this.errorMessages.count();
      return errorCount > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if error toast is visible
   * @returns {Promise<boolean>}
   */
  async hasErrorToast() {
    try {
      return await this.errorToast.isVisible({ timeout: 2000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Clicks on a download link and waits for download
   * @param {string} fileName - Name of the file to download (e.g., "CoCloud-Printer-Client.exe")
   * @returns {Promise<{clicked: boolean, downloadStarted: boolean, downloadedFileName: string}>}
   */
  async clickDownloadLink(fileName) {
    try {
      let downloadLink;
      
      if (fileName.includes('Printer-Client')) {
        downloadLink = this.printerClientCard;
      } else if (fileName.includes('RemoteAppClient')) {
        downloadLink = this.remoteAppClientCard;
      } else if (fileName.includes('Client-File-Setup')) {
        downloadLink = this.clientFileSetupCard;
      } else {
        // Try to find by text
        downloadLink = this.page.locator(`a:has-text("${fileName}"), button:has-text("${fileName}"), .download-card:has-text("${fileName}")`).first();
      }
      
      // Set up download listener BEFORE clicking
      const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
      
      // Click the download link
      await downloadLink.waitFor({ state: 'visible', timeout: 10000 });
      await downloadLink.scrollIntoViewIfNeeded();
      
      // For links, we might need to use a different approach
      const tagName = await downloadLink.evaluate(el => el.tagName.toLowerCase()).catch(() => '');
      
      if (tagName === 'a') {
        // For anchor tags, get the href and verify it's a download link
        const href = await downloadLink.getAttribute('href').catch(() => '');
        console.log(`Download link href: ${href}`);
      }
      
      await downloadLink.click();
      await this.page.waitForTimeout(1000); // Wait a bit for download to initiate
      
      // Wait for download to start
      const download = await downloadPromise;
      
      if (download) {
        const downloadedFileName = download.suggestedFilename();
        // Save the download path (optional - for verification)
        const path = await download.path().catch(() => '');
        return {
          clicked: true,
          downloadStarted: true,
          downloadedFileName: downloadedFileName,
          downloadPath: path
        };
      } else {
        // Download might have started but not captured, or browser handles it differently
        // Check if link was clicked successfully
        return {
          clicked: true,
          downloadStarted: false,
          downloadedFileName: '',
          note: 'Download may be handled by browser differently'
        };
      }
    } catch (error) {
      return {
        clicked: false,
        downloadStarted: false,
        downloadedFileName: '',
        error: error.message
      };
    }
  }

  /**
   * Verifies download link is clickable
   * @param {string} fileName - Name of the file
   * @returns {Promise<boolean>}
   */
  async isDownloadLinkClickable(fileName) {
    try {
      let downloadLink;
      
      if (fileName.includes('Printer-Client')) {
        downloadLink = this.printerClientCard;
      } else if (fileName.includes('RemoteAppClient')) {
        downloadLink = this.remoteAppClientCard;
      } else if (fileName.includes('Client-File-Setup')) {
        downloadLink = this.clientFileSetupCard;
      } else {
        downloadLink = this.page.locator(`a:has-text("${fileName}"), button:has-text("${fileName}")`).first();
      }
      
      const isVisible = await downloadLink.isVisible({ timeout: 3000 });
      const isEnabled = await downloadLink.isEnabled().catch(() => false);
      
      return isVisible && isEnabled;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verifies page load without errors
   * @returns {Promise<{pageLoaded: boolean, hasErrors: boolean, hasConsoleErrors: boolean, hasErrorToast: boolean}>}
   */
  async verifyPageLoad() {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      
      const pageLoaded = await this.isVisible();
      const hasErrors = await this.hasErrorMessages();
      const hasConsoleErrors = await this.hasConsoleErrors();
      const hasErrorToast = await this.hasErrorToast();
      
      return {
        pageLoaded: pageLoaded,
        hasErrors: hasErrors,
        hasConsoleErrors: hasConsoleErrors,
        hasErrorToast: hasErrorToast
      };
    } catch (error) {
      return {
        pageLoaded: false,
        hasErrors: true,
        hasConsoleErrors: false,
        hasErrorToast: false,
        error: error.message
      };
    }
  }
}

module.exports = { DownloadSetupPage };

