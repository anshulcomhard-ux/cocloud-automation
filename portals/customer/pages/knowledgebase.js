class KnowledgeBasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation - Knowledge Base menu item in side menu
    this.knowledgeBaseMenu = page.locator('a:has-text("Knowledge Base"), button:has-text("Knowledge Base"), a[href*="knowledge"], a[href*="docs"], li:has-text("Knowledge Base") a, .sidebar a:has-text("Knowledge Base"), nav a:has-text("Knowledge Base")').first();
    
    // Expected URL
    this.expectedUrl = 'https://docs.cocloud.in/introduction/introduction';
  }

  /**
   * Clicks on Knowledge Base menu item in side menu
   * @returns {Promise<import('@playwright/test').Page|null>} Returns the new page if opened in new tab, null otherwise
   */
  async clickKnowledgeBaseMenu() {
    try {
      await this.knowledgeBaseMenu.waitFor({ state: 'visible', timeout: 10000 });
      await this.knowledgeBaseMenu.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      
      const context = this.page.context();
      const pagesBefore = context.pages().length;
      
      // Always wait for potential new page event (link might open in new tab via JavaScript)
      // Use Promise.race to handle both cases: new tab opens OR regular navigation
      let newPage = null;
      
      try {
        // Set up listener for new page before clicking
        const pagePromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);
        
        // Click the menu item
        await this.knowledgeBaseMenu.click();
        
        // Wait a bit to see if a new page opens
        newPage = await pagePromise;
        
        if (newPage) {
          await newPage.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
          await newPage.waitForTimeout(2000);
          return newPage;
        }
      } catch (error) {
        // No new page opened, continue with regular navigation check
      }
      
      // Check if a new page was actually created (even if event wasn't caught)
      // Wait a bit for the page to be created
      await this.page.waitForTimeout(1000);
      const pagesAfter = context.pages().length;
      if (pagesAfter > pagesBefore) {
        // A new page was created, find it
        const pages = context.pages();
        newPage = pages[pages.length - 1]; // Get the last page (newest)
        if (newPage !== this.page) {
          await newPage.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
          await newPage.waitForTimeout(2000);
          return newPage;
        }
      }
      
      // Regular navigation - wait for current page to navigate
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await this.page.waitForTimeout(2000);
      return null;
    } catch (error) {
      throw new Error(`Failed to click Knowledge Base menu: ${error.message}`);
    }
  }

  /**
   * Verifies the current URL matches the expected Knowledge Base URL
   * @param {import('@playwright/test').Page} pageToCheck - Optional page to check (defaults to this.page)
   * @returns {Promise<boolean>}
   */
  async verifyNavigationToKnowledgeBase(pageToCheck = null) {
    try {
      const targetPage = pageToCheck || this.page;
      // Wait for navigation to complete
      await targetPage.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await targetPage.waitForTimeout(2000);
      
      const currentUrl = targetPage.url();
      // Check if URL matches (exact match or contains the expected path)
      return currentUrl.includes('docs.cocloud.in') && currentUrl.includes('introduction');
    } catch (error) {
      return false;
    }
  }
}

module.exports = { KnowledgeBasePage };

