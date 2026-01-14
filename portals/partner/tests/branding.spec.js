const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { BrandingPage } = require('../pages/branding');

test.describe('Partner Portal - Branding', () => {
  const baseUrl = process.env.PARTNER_PORTAL_URL || 'https://dev.partner.cocloud.in';
  const email = process.env.PARTNER_EMAIL || 'contact@comhard.co.in';
  const password = process.env.PARTNER_PASSWORD || 'hrhk@1111';

  // ========================
  // VERIFY BRANDING PAGE LOADS SUCCESSFULLY
  // ========================
  test('should verify Branding page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Branding Page Load ===');
    
    const dashboardPage = new DashboardPage(page);
    const brandingPage = new BrandingPage(page);
    
    // Step 1: Login to Partner Portal
    console.log('\n[STEP 1] Logging in to Partner Portal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(email, password);
    console.log('✓ Navigated to login page and submitted credentials');
    
    // Verify login was successful
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
    console.log('✓ Login successful');
    
    // Step 2: Navigate to Branding module from the left-side menu
    console.log('\n[STEP 2] Navigating to Branding module...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Branding module' });
    await brandingPage.navigateToBranding();
    console.log('✓ Navigated to Branding module');
    await page.waitForTimeout(2000);
    
    // Step 3: Verify the following elements are visible on the Branding page
    console.log('\n[STEP 3] Verifying Branding page elements...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify Branding page elements' });
    
    // Verify page heading "Branding"
    console.log('  Verifying page heading "Branding"...');
    const headingVisible = await brandingPage.verifyBrandingHeading();
    expect(headingVisible).toBeTruthy();
    console.log('✓ Page heading "Branding" is visible');
    
    // Verify Domain tab
    console.log('  Verifying Domain tab...');
    const domainTabVisible = await brandingPage.verifyDomainTab();
    expect(domainTabVisible).toBeTruthy();
    console.log('✓ Domain tab is visible');
    
    // Verify Website tab
    console.log('  Verifying Website tab...');
    const websiteTabVisible = await brandingPage.verifyWebsiteTab();
    expect(websiteTabVisible).toBeTruthy();
    console.log('✓ Website tab is visible');
    
    // Verify all elements using the combined method
    const elements = await brandingPage.verifyBrandingPageElements();
    expect(elements.headingVisible).toBeTruthy();
    expect(elements.domainTabVisible).toBeTruthy();
    expect(elements.websiteTabVisible).toBeTruthy();
    
    console.log('\n=== Test Completed Successfully ===');
    console.log('Summary:');
    console.log(`  ✓ Page heading "Branding": ${elements.headingVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
    console.log(`  ✓ Domain tab: ${elements.domainTabVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
    console.log(`  ✓ Website tab: ${elements.websiteTabVisible ? 'VISIBLE' : 'NOT VISIBLE'}`);
  });

  // ========================
  // VERIFY CHANGE OF BRAND NAME AND REFLECTION IN CUSTOMER PORTAL
  // ========================
  test('should verify change of Brand Name and reflection in Customer Portal header', async ({ browser }, testInfo) => {
    test.setTimeout(120000);
    console.log('=== Test: Verify Change of Brand Name and Reflection in Customer Portal ===');
    
    // Customer Portal credentials
    const customerBaseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
    const customerEmail = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';
    
    // Store original brand name for revert
    let originalBrandName = '';
    const testBrandName = 'CoCloud Test';
    
    // Create Partner Portal context
    const partnerContext = await browser.newContext();
    const partnerPage = await partnerContext.newPage();
    const dashboardPage = new DashboardPage(partnerPage);
    const brandingPage = new BrandingPage(partnerPage);
    
    try {
      // Step 1: Login to Partner Portal
      console.log('\n[STEP 1] Logging in to Partner Portal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Login to Partner Portal' });
      await dashboardPage.goto(baseUrl);
      await dashboardPage.login(email, password);
      console.log('✓ Navigated to login page and submitted credentials');
      
      // Verify login was successful
      await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 15000 });
      console.log('✓ Login successful');
      
      // Step 2: Navigate to Branding module
      console.log('\n[STEP 2] Navigating to Branding module...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Navigate to Branding module' });
      await brandingPage.navigateToBranding();
      console.log('✓ Navigated to Branding module');
      await partnerPage.waitForTimeout(2000);
      
      // Step 3: Click on Website tab/dropdown
      console.log('\n[STEP 3] Clicking on Website tab...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click on Website tab' });
      await brandingPage.clickWebsiteTab();
      console.log('✓ Clicked Website tab');
      await partnerPage.waitForTimeout(1000);
      
      // Step 4: Click on Brand Name option
      console.log('\n[STEP 4] Selecting Brand Name option...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Select Brand Name option' });
      await brandingPage.selectBrandNameOption();
      console.log('✓ Selected Brand Name option');
      await partnerPage.waitForTimeout(1000);
      
      // Step 5: Click change button to enable brand name input field
      console.log('\n[STEP 5] Clicking Change button to enable brand name input field...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Click Change button' });
      
      // Capture and store the existing brand name value
      originalBrandName = await brandingPage.getBrandName();
      console.log(`✓ Captured original brand name: "${originalBrandName}"`);
      
      // Click Change button to enable the field
      await brandingPage.clickChangeButton();
      console.log('✓ Clicked Change button - input field is now enabled');
      await partnerPage.waitForTimeout(500);
      
      // Clear the field and enter a new brand name
      console.log(`  Entering new brand name: "${testBrandName}"...`);
      await brandingPage.setBrandName(testBrandName);
      console.log(`✓ Entered new brand name: "${testBrandName}"`);
      
      // Click on Save button
      console.log('  Clicking Save button...');
      await brandingPage.clickSaveButton();
      console.log('✓ Clicked Save button');
      await partnerPage.waitForTimeout(2000);
      
      // Step 6: Verify success toast message and brand name update
      console.log('\n[STEP 6] Verifying success toast message and brand name update...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify success toast and brand name update' });
      
      // Verify success toast message is displayed
      const toastVisible = await brandingPage.verifySuccessToast();
      if (toastVisible) {
        const toastMessage = await brandingPage.getToastMessage();
        console.log(`✓ Success toast message is displayed: "${toastMessage}"`);
      } else {
        console.log('⚠ Success toast message not immediately visible (may be optional)');
      }
      
      // Verify brand name is updated in the input field
      const updatedBrandName = await brandingPage.getBrandName();
      expect(updatedBrandName).toBe(testBrandName);
      console.log(`✓ Brand name updated successfully to: "${updatedBrandName}"`);
      
      // Step 7: Open Customer Portal dashboard (new tab or new context)
      console.log('\n[STEP 7] Opening Customer Portal dashboard...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Open Customer Portal dashboard' });
      
      // Create Customer Portal context
      const customerContext = await browser.newContext();
      const customerPage = await customerContext.newPage();
      
      // Import login helper for Customer Portal
      const { login } = require('../../../helpers/login');
      
      // Login to Customer Portal
      await login(customerPage, customerBaseUrl, customerEmail, customerPassword);
      console.log('✓ Logged in to Customer Portal');
      
      // Navigate to dashboard if not already there
      await customerPage.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await customerPage.waitForTimeout(2000);
      
      // Step 8: Verify in Customer Portal header section
      console.log('\n[STEP 8] Verifying updated brand name in Customer Portal header...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Verify brand name in Customer Portal header' });
      
      // Locator for brand name in header: p.text-truncate.mb-2.text-light.heading-portal
      const brandNameHeader = customerPage.locator('p.text-truncate.mb-2.text-light.heading-portal, p.heading-portal:has-text("Welcome to"), p:has-text("Welcome to")').first();
      await brandNameHeader.waitFor({ state: 'visible', timeout: 10000 });
      
      const headerText = await brandNameHeader.textContent();
      console.log(`  Header text: "${headerText}"`);
      
      expect(headerText).toContain(testBrandName);
      console.log(`✓ Updated brand name "${testBrandName}" is displayed in Customer Portal header`);
      
      // Step 9: Revert the brand name to original value
      console.log('\n[STEP 9] Reverting brand name to original value...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Revert brand name' });
      
      // Navigate back to Partner Portal → Branding → Website → Brand Name
      // (We should still be on the Brand Name page, but refresh to ensure)
      await partnerPage.reload();
      await partnerPage.waitForTimeout(2000);
      await brandingPage.navigateToBranding();
      await partnerPage.waitForTimeout(1000);
      await brandingPage.clickWebsiteTab();
      await partnerPage.waitForTimeout(1000);
      await brandingPage.selectBrandNameOption();
      await partnerPage.waitForTimeout(1000);
      
      // Click Change button to enable the field
      await brandingPage.clickChangeButton();
      await partnerPage.waitForTimeout(500);
      
      // Clear the field and enter the previously stored original brand name
      console.log(`  Entering original brand name: "${originalBrandName}"...`);
      await brandingPage.setBrandName(originalBrandName);
      console.log(`✓ Entered original brand name: "${originalBrandName}"`);
      
      // Click Save button
      console.log('  Clicking Save button...');
      await brandingPage.clickSaveButton();
      console.log('✓ Clicked Save button');
      await partnerPage.waitForTimeout(2000);
      
      // Step 10: Verify success toast message and original brand name restored
      console.log('\n[STEP 10] Verifying success toast message and original brand name restored...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Verify revert success' });
      
      // Verify success toast message is displayed (optional)
      const toastVisible2 = await brandingPage.verifySuccessToast();
      if (toastVisible2) {
        const toastMessage2 = await brandingPage.getToastMessage();
        console.log(`✓ Success toast message is displayed: "${toastMessage2}"`);
      } else {
        console.log('⚠ Success toast message not immediately visible (optional verification)');
      }
      
      // Verify original brand name is restored in input field
      const restoredBrandName = await brandingPage.getBrandName();
      expect(restoredBrandName).toBe(originalBrandName);
      console.log(`✓ Original brand name restored successfully: "${restoredBrandName}"`);
      
      // Step 11: Navigate to Customer Portal dashboard
      console.log('\n[STEP 11] Navigating to Customer Portal dashboard...');
      testInfo.annotations.push({ type: 'step', description: 'Step 11: Navigate to Customer Portal dashboard' });
      
      // Refresh Customer Portal page to see updated brand name
      await customerPage.reload();
      await customerPage.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await customerPage.waitForTimeout(2000);
      console.log('✓ Navigated to Customer Portal dashboard');
      
      // Step 12: Verify in Customer Portal header section
      console.log('\n[STEP 12] Verifying changed brand name in Customer Portal header...');
      testInfo.annotations.push({ type: 'step', description: 'Step 12: Verify brand name in Customer Portal header' });
      
      // Locator for brand name in header
      const brandNameHeader2 = customerPage.locator('p.text-truncate.mb-2.text-light.heading-portal, p.heading-portal:has-text("Welcome to"), p:has-text("Welcome to")').first();
      await brandNameHeader2.waitFor({ state: 'visible', timeout: 10000 });
      
      const headerText2 = await brandNameHeader2.textContent();
      console.log(`  Header text: "${headerText2}"`);
      
      expect(headerText2).toContain(originalBrandName);
      console.log(`✓ Changed brand name "${originalBrandName}" is displayed in Customer Portal header`);
      
      // Close Customer Portal context
      await customerContext.close();
      
      console.log('\n=== Test Completed Successfully ===');
    } catch (error) {
      console.error('\n=== Test Failed ===');
      console.error(`Error: ${error.message}`);
      
      // Cleanup: Try to revert brand name if test failed
      if (originalBrandName) {
        try {
          console.log('\n[CLEANUP] Attempting to revert brand name to original value...');
          await brandingPage.navigateToBranding();
          await partnerPage.waitForTimeout(1000);
          await brandingPage.clickWebsiteTab();
          await partnerPage.waitForTimeout(1000);
          await brandingPage.selectBrandNameOption();
          await partnerPage.waitForTimeout(1000);
          await brandingPage.clickChangeButton();
          await partnerPage.waitForTimeout(500);
          await brandingPage.setBrandName(originalBrandName);
          await brandingPage.clickSaveButton();
          await partnerPage.waitForTimeout(2000);
          console.log('✓ Brand name reverted to original value during cleanup');
        } catch (cleanupError) {
          console.log(`⚠ Failed to revert brand name during cleanup: ${cleanupError.message}`);
        }
      }
      
      throw error;
    } finally {
      // Close contexts
      await partnerContext.close();
    }
  });

});

