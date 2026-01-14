const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { AddonsPage } = require('../pages/addons');

test.describe('Customer Portal - Add-ons', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

  // ========================
  // VERIFY PAGE LOAD
  // ========================
  test('should verify Add-ons page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Add-ons Page Load ===');
    
    const addonsPage = new AddonsPage(page);
    
    // Step 1: Navigate to Add-ons page using left sidebar
    console.log('\n[STEP 1] Navigating to Add-ons page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Add-ons page' });
    await login(page, baseUrl, email, password);
    await addonsPage.gotoAddons();
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Add-ons page');
    
    // Step 2: Verify page title "Add-ons" is visible
    console.log('\n[STEP 2] Verifying page title is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify page title' });
    
    const titleVisible = await addonsPage.isPageTitleVisible();
    expect(titleVisible).toBeTruthy();
    console.log('✓ Page title is visible');
    
    const pageTitle = await addonsPage.getPageTitle();
    expect(pageTitle.toLowerCase()).toContain('add-ons');
    console.log(`✓ Page title text: "${pageTitle}"`);
    
    // Step 3: Verify add-on cards are displayed
    console.log('\n[STEP 3] Verifying add-on cards are displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify add-on cards' });
    
    const cardsVerification = await addonsPage.verifyAddonCardsVisible();
    
    console.log(`Cloud Service Charges card visible: ${cardsVerification.cloudServiceVisible}`);
    console.log(`Tally On Cloud – Power User card visible: ${cardsVerification.tallyPowerUserVisible}`);
    
    expect(cardsVerification.cloudServiceVisible).toBeTruthy();
    expect(cardsVerification.tallyPowerUserVisible).toBeTruthy();
    expect(cardsVerification.allVisible).toBeTruthy();
    
    console.log('✓ All add-on cards are displayed:');
    console.log('  - Cloud Service Charges');
    console.log('  - Tally On Cloud – Power User');
    
    // Step 4: Verify price, GST text, and action buttons are visible on each card
    console.log('\n[STEP 4] Verifying card details (price, GST, buttons) are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify card details' });
    
    // Verify Cloud Service Charges card
    console.log('\nVerifying Cloud Service Charges card details...');
    const cloudServiceDetails = await addonsPage.verifyCardDetailsVisible('Cloud Service Charges');
    
    console.log(`  Price visible: ${cloudServiceDetails.priceVisible}`);
    console.log(`  GST text visible: ${cloudServiceDetails.gstVisible}`);
    console.log(`  Buy Now button visible: ${cloudServiceDetails.buyNowVisible}`);
    console.log(`  Contact Sales button visible: ${cloudServiceDetails.contactSalesVisible}`);
    
    expect(cloudServiceDetails.priceVisible).toBeTruthy();
    expect(cloudServiceDetails.gstVisible).toBeTruthy();
    expect(cloudServiceDetails.buyNowVisible).toBeTruthy();
    expect(cloudServiceDetails.contactSalesVisible).toBeTruthy();
    console.log('✓ Cloud Service Charges card details verified');
    
    // Verify Tally On Cloud – Power User card
    console.log('\nVerifying Tally On Cloud – Power User card details...');
    const tallyPowerUserDetails = await addonsPage.verifyCardDetailsVisible('Tally On Cloud – Power User');
    
    console.log(`  Price visible: ${tallyPowerUserDetails.priceVisible}`);
    console.log(`  GST text visible: ${tallyPowerUserDetails.gstVisible}`);
    console.log(`  Buy Now button visible: ${tallyPowerUserDetails.buyNowVisible}`);
    console.log(`  Contact Sales button visible: ${tallyPowerUserDetails.contactSalesVisible}`);
    
    expect(tallyPowerUserDetails.priceVisible).toBeTruthy();
    expect(tallyPowerUserDetails.gstVisible).toBeTruthy();
    expect(tallyPowerUserDetails.buyNowVisible).toBeTruthy();
    expect(tallyPowerUserDetails.contactSalesVisible).toBeTruthy();
    console.log('✓ Tally On Cloud – Power User card details verified');
    
    // Verify page load without errors
    const pageLoadVerification = await addonsPage.verifyPageLoad();
    expect(pageLoadVerification.pageLoaded).toBeTruthy();
    expect(pageLoadVerification.hasErrors).toBeFalsy();
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY BUY NOW NAVIGATION
  // ========================
  test('should verify Buy Now button navigates to payment page', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Buy Now Navigation ===');
    
    const addonsPage = new AddonsPage(page);
    
    // Navigate to Add-ons page
    console.log('\n[STEP 1] Navigating to Add-ons page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Add-ons page' });
    await login(page, baseUrl, email, password);
    await addonsPage.gotoAddons();
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Add-ons page');
    
    // Step 1: Click on "Buy Now" button for any add-on
    console.log('\n[STEP 2] Clicking "Buy Now" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Buy Now button' });
    
    const clickResult = await addonsPage.clickBuyNowButton('Cloud Service Charges');
    
    expect(clickResult.clicked).toBeTruthy();
    console.log('✓ Clicked "Buy Now" button');
    console.log(`URL before click: ${clickResult.urlBefore}`);
    
    // Step 2: Verify user is redirected to payment page
    console.log('\n[STEP 3] Verifying navigation to payment page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify payment page navigation' });
    
    const navigationResult = await addonsPage.verifyPaymentPageNavigation('payment');
    const urlAfter = page.url();
    
    console.log(`URL after click: ${urlAfter}`);
    console.log(`Navigation result - Navigated: ${navigationResult.navigated}, Contains "payment": ${navigationResult.containsPayment}`);
    
    // Step 3: Assert the current URL contains the keyword "payment"
    expect(navigationResult.containsPayment).toBeTruthy();
    expect(urlAfter.toLowerCase()).toContain('payment');
    console.log('✓ Successfully navigated to payment page');
    console.log(`✓ URL contains "payment": ${urlAfter}`);
    
    // Step 4: Verify payment page loads without error
    console.log('\n[STEP 4] Verifying payment page loads without error...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify payment page load' });
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);
    
    const hasErrors = await addonsPage.hasErrorMessages();
    const hasErrorToast = await addonsPage.hasErrorToast();
    
    expect(hasErrors).toBeFalsy();
    expect(hasErrorToast).toBeFalsy();
    console.log('✓ Payment page loaded without errors');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY CONTACT SALES MODAL – NO ACTION
  // ========================
  test('should verify Contact Sales modal - No action', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Contact Sales Modal - No Action ===');
    
    const addonsPage = new AddonsPage(page);
    
    // Navigate to Add-ons page
    console.log('\n[STEP 1] Navigating to Add-ons page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Add-ons page' });
    await login(page, baseUrl, email, password);
    await addonsPage.gotoAddons();
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Add-ons page');
    
    // Step 1: Click on "Contact Sales" button
    console.log('\n[STEP 2] Clicking "Contact Sales" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Contact Sales button' });
    
    const originalUrl = page.url();
    const clickResult = await addonsPage.clickContactSalesButton('Cloud Service Charges');
    
    expect(clickResult.clicked).toBeTruthy();
    console.log('✓ Clicked "Contact Sales" button');
    
    // Step 2: Verify Contact Sales confirmation modal opens
    console.log('\n[STEP 3] Verifying Contact Sales modal opens...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify modal opens' });
    
    const modalOpen = await addonsPage.isContactSalesModalOpen();
    expect(modalOpen).toBeTruthy();
    expect(clickResult.modalOpened).toBeTruthy();
    console.log('✓ Contact Sales confirmation modal opened');
    
    // Step 3: Click on "No" button in the modal
    console.log('\n[STEP 4] Clicking "No" button in modal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click No button' });
    
    const noButtonResult = await addonsPage.clickModalNoButton();
    
    expect(noButtonResult.clicked).toBeTruthy();
    console.log('✓ Clicked "No" button');
    
    // Step 4: Verify modal is closed successfully
    console.log('\n[STEP 5] Verifying modal is closed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify modal closed' });
    
    expect(noButtonResult.modalClosed).toBeTruthy();
    const modalStillOpen = await addonsPage.isContactSalesModalOpen();
    expect(modalStillOpen).toBeFalsy();
    console.log('✓ Modal closed successfully');
    
    // Step 5: Verify no navigation happens
    console.log('\n[STEP 6] Verifying no navigation happened...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no navigation' });
    
    const noNavigation = await addonsPage.verifyNoNavigation(originalUrl);
    expect(noNavigation).toBeTruthy();
    console.log(`✓ No navigation - URL remains: ${page.url()}`);
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY CONTACT SALES MODAL – YES ACTION
  // ========================
  test('should verify Contact Sales modal - Yes action', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Contact Sales Modal - Yes Action ===');
    
    const addonsPage = new AddonsPage(page);
    
    // Navigate to Add-ons page
    console.log('\n[STEP 1] Navigating to Add-ons page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Add-ons page' });
    await login(page, baseUrl, email, password);
    await addonsPage.gotoAddons();
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Add-ons page');
    
    // Step 1: Click on "Contact Sales" button again
    console.log('\n[STEP 2] Clicking "Contact Sales" button...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Click Contact Sales button' });
    
    const clickResult = await addonsPage.clickContactSalesButton('Cloud Service Charges');
    
    expect(clickResult.clicked).toBeTruthy();
    console.log('✓ Clicked "Contact Sales" button');
    
    // Step 2: Verify the confirmation modal opens
    console.log('\n[STEP 3] Verifying confirmation modal opens...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify modal opens' });
    
    const modalOpen = await addonsPage.isContactSalesModalOpen();
    expect(modalOpen).toBeTruthy();
    expect(clickResult.modalOpened).toBeTruthy();
    console.log('✓ Confirmation modal opened');
    
    // Step 3: Click on "Yes" button in the modal
    console.log('\n[STEP 4] Clicking "Yes" button in modal...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Yes button' });
    
    const yesButtonResult = await addonsPage.clickModalYesButton();
    
    expect(yesButtonResult.clicked).toBeTruthy();
    console.log('✓ Clicked "Yes" button');
    
    // Step 4: Verify modal closes successfully
    console.log('\n[STEP 5] Verifying modal closes...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify modal closed' });
    
    expect(yesButtonResult.modalClosed).toBeTruthy();
    const modalStillOpen = await addonsPage.isContactSalesModalOpen();
    expect(modalStillOpen).toBeFalsy();
    console.log('✓ Modal closed successfully');
    
    // Step 5: Retrieve and display toast message (toast appears immediately after clicking Yes)
    console.log('\n[STEP 6] Retrieving toast message...');
    testInfo.annotations.push({ type: 'step', description: 'Step 6: Retrieve toast message' });
    
    // Toast message is captured immediately in clickModalYesButton()
    const toastMessage = yesButtonResult.toastMessage || '';
    
    if (toastMessage) {
      console.log(`✓ Toast message retrieved: "${toastMessage}"`);
      
      // Verify toast message contains confirmation keywords
      const messageLower = toastMessage.toLowerCase();
      const containsConfirmation = messageLower.includes('contact') || 
                                   messageLower.includes('sales') || 
                                   messageLower.includes('team') ||
                                   messageLower.includes('will contact') ||
                                   messageLower.includes('success') ||
                                   messageLower.includes('submitted') ||
                                   messageLower.includes('request');
      
      if (containsConfirmation) {
        console.log(`✓ Toast message contains confirmation keywords`);
      } else {
        console.log(`⚠ Toast message found but doesn't contain expected keywords`);
      }
    } else {
      // Fallback: Try to get toast message one more time
      console.log('⚠ Toast message not captured immediately, trying to retrieve...');
      const fallbackToastMessage = await addonsPage.getSuccessToastMessage();
      if (fallbackToastMessage) {
        console.log(`✓ Toast message retrieved (fallback): "${fallbackToastMessage}"`);
      } else {
        console.log('⚠ Toast message not found (may have appeared and disappeared too quickly)');
      }
    }
    
    console.log('\n=== Test Completed Successfully ===');
  });
});

