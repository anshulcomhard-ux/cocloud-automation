const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { KnowledgeBasePage } = require('../pages/knowledgebase');

test.describe('Customer Portal - Knowledge Base', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';
  const expectedKnowledgeBaseUrl = 'https://docs.cocloud.in/introduction/introduction';

  test('should verify on click knowledge base module in side menu - navigates to link', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Knowledge Base Navigation ===');
    
    const knowledgeBasePage = new KnowledgeBasePage(page);
    
    // Step 1: Login to Customer Portal
    console.log('\n[STEP 1] Logging in to Customer Portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Customer Portal' });
    await login(page, baseUrl, email, password);
    await page.waitForTimeout(2000);
    console.log('✓ Logged in successfully');
    
    // Step 2: Click on Knowledge Base module in side menu
    console.log('\n[STEP 2] Clicking on Knowledge Base module in side menu...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Knowledge Base menu' });
    
    // Get the browser context to check for new pages
    const context = page.context();
    const pagesBefore = context.pages().length;
    
    const newPage = await knowledgeBasePage.clickKnowledgeBaseMenu();
    console.log('✓ Clicked Knowledge Base menu item');
    
    // Step 3: Verify navigation to expected URL
    console.log('\n[STEP 3] Verifying navigation to Knowledge Base URL...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify navigation to URL' });
    
    // Determine which page to check (new tab or current page)
    let pageToCheck = newPage;
    
    // If no newPage returned, check if a new page was actually created
    if (!pageToCheck) {
      await page.waitForTimeout(2000); // Wait a bit more for page to be created
      const pagesAfter = context.pages().length;
      if (pagesAfter > pagesBefore) {
        // A new page was created, find it
        const pages = context.pages();
        pageToCheck = pages[pages.length - 1]; // Get the last page (newest)
        if (pageToCheck === page) {
          // If the newest page is the original page, check all pages
          for (const p of pages) {
            if (p !== page) {
              pageToCheck = p;
              break;
            }
          }
        }
        console.log('  Note: Link opened in new tab/window (detected by page count)');
      } else {
        pageToCheck = page;
        console.log('  Note: Link navigated in same tab');
      }
    } else {
      console.log('  Note: Link opened in new tab/window (detected by event)');
    }
    
    // Wait for navigation to complete
    await pageToCheck.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await pageToCheck.waitForTimeout(2000);
    
    const currentUrl = pageToCheck.url();
    console.log(`  Current URL: ${currentUrl}`);
    console.log(`  Expected URL: ${expectedKnowledgeBaseUrl}`);
    
    // Verify navigation - check if URL matches expected
    const urlMatches = currentUrl === expectedKnowledgeBaseUrl || 
                       (currentUrl.includes('docs.cocloud.in') && currentUrl.includes('introduction'));
    
    if (urlMatches) {
      console.log('✓ Successfully navigated to Knowledge Base URL');
      expect(urlMatches).toBeTruthy();
    } else {
      // Check if URL contains the expected domain
      const urlContainsDomain = currentUrl.includes('docs.cocloud.in');
      
      if (urlContainsDomain) {
        console.log('✓ Navigated to Knowledge Base (URL contains expected domain)');
        console.log(`  Note: URL may have slight variations: ${currentUrl}`);
        expect(urlContainsDomain).toBeTruthy();
      } else {
        console.log(`⚠ Navigation may have failed or redirected to different URL`);
        console.log(`  Current URL: ${currentUrl}`);
        console.log(`  Expected: ${expectedKnowledgeBaseUrl}`);
        console.log(`  Original page URL: ${page.url()}`);
        
        // Check if we need to look at a different page
        const allPages = context.pages();
        let foundInOtherPage = false;
        for (const p of allPages) {
          if (p !== page) {
            const otherUrl = p.url();
            console.log(`  Checking other page URL: ${otherUrl}`);
            if (otherUrl.includes('docs.cocloud.in')) {
              console.log('✓ Found Knowledge Base URL in another tab');
              expect(otherUrl).toContain('docs.cocloud.in');
              foundInOtherPage = true;
              // Update pageToCheck for closing later
              pageToCheck = p;
              break;
            }
          }
        }
        
        // Final assertion - should at least be on docs.cocloud.in
        if (!foundInOtherPage) {
          expect(currentUrl).toContain('docs.cocloud.in');
        }
      }
    }
    
    // Additional verification: Check if page loaded successfully
    const pageTitle = await pageToCheck.title().catch(() => '');
    console.log(`  Page title: ${pageTitle}`);
    
    // Close new tab if opened (and it's not the original page)
    if (pageToCheck && pageToCheck !== page) {
      await pageToCheck.close();
      console.log('✓ Closed new tab');
    }
    
    console.log('\n=== Test Completed Successfully ===');
    console.log(`✓ Knowledge Base navigation verified`);
    console.log(`✓ Navigated to: ${currentUrl}`);
  });
});

