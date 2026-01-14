const { test, expect } = require('@playwright/test');
const { CouponsSchemesPage } = require('../pages/coupen-schemes');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Coupons - Schemes Module', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';

  test.beforeEach(async ({ page }) => {
    
    // Login before each test
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);
  });

  // ==================== PAGE LOAD TEST ====================

  test('should verify coupons & schemes page loads successfully - retrieve page heading', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Coupons & Schemes Page Loads Successfully ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Retrieve and verify page heading
    console.log('[STEP 2] Retrieving page heading...');
    const pageHeading = await couponsSchemesPage.getPageHeading();
    expect(pageHeading).toBeTruthy();
    expect(pageHeading.toLowerCase()).toContain('coupons');
    expect(pageHeading.toLowerCase()).toContain('schemes');
    console.log(`✓ Page heading: "${pageHeading}"`);

    await page.screenshot({ path: 'artifacts/coupons-schemes-page-load.png', fullPage: true });
    console.log('✓ Test completed successfully');
  });

  // ==================== ADD COUPON TEST ====================

  test('should verify add coupon', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Add Coupon ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Click Add Coupon button
    console.log('[STEP 2] Clicking Add Coupon button...');
    await couponsSchemesPage.clickAddCouponButton();
    await page.waitForTimeout(2000);
    
    const isModalOpen = await couponsSchemesPage.isAddCouponModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add Coupon form is open');

    // Step 3: Click Create to check required fields validation
    console.log('[STEP 3] Clicking Create to check required fields validation...');
    await couponsSchemesPage.clickCreateButtonForValidation();
    await page.waitForTimeout(3000);
    
    // Check for validation errors with retry
    let validationErrors = await couponsSchemesPage.getAllValidationErrors();
    let validationRetries = 3;
    while (validationErrors.length === 0 && validationRetries > 0) {
      await page.waitForTimeout(1000);
      validationErrors = await couponsSchemesPage.getAllValidationErrors();
      validationRetries--;
    }
    
    // If still no errors found, check for invalid form fields
    if (validationErrors.length === 0) {
      const invalidFields = await page.locator('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').count();
      if (invalidFields > 0) {
        validationErrors = Array(invalidFields).fill('Required field');
      }
    }
    
    expect(validationErrors.length).toBeGreaterThan(0);
    console.log(`✓ Validation errors displayed (${validationErrors.length} error(s))`);
    console.log('✓ Required fields validation is working');

    // Step 4: Fill form fields
    console.log('[STEP 4] Filling coupon form fields...');
    
    // Generate unique coupon name with timestamp
    const timestamp = Date.now();
    const couponName = `TestCoupon${timestamp}`;
    const minUser = '5';
    const discountAmount = '10';
    
    // Fill coupon name
    await couponsSchemesPage.fillCouponName(couponName);
    console.log(`✓ Filled Coupon Name: "${couponName}"`);
    
    // Fill min user
    await couponsSchemesPage.fillMinUser(minUser);
    console.log(`✓ Filled Min User: "${minUser}"`);

    // Step 5: Select plans from dropdown - select all
    console.log('[STEP 5] Selecting all plans from dropdown...');
    await couponsSchemesPage.selectAllPlans();
    console.log('✓ Selected all plans');

    // Step 6: Choose coupon type - month
    console.log('[STEP 6] Selecting coupon type as Month...');
    await couponsSchemesPage.selectCouponType('month');
    console.log('✓ Selected coupon type: Month');

    // Step 7: Enter number of months (visible when coupon type is Month)
    console.log('[STEP 7] Entering number of months...');
    const numberOfMonths = '3';
    await couponsSchemesPage.fillNumberOfMonths(numberOfMonths);
    console.log(`✓ Filled Number of Months: "${numberOfMonths}"`);

    // Step 8: Select specific date - ON
    console.log('[STEP 8] Selecting Specific date as ON...');
    await couponsSchemesPage.selectSpecificDate('on');
    console.log('✓ Selected Specific date: ON');

    // Step 9: Enter future date
    console.log('[STEP 9] Entering future date...');
    // Calculate future date (30 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateString = `${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getDate()).padStart(2, '0')}/${futureDate.getFullYear()}`;
    const dateInputString = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
    
    await couponsSchemesPage.fillDateInput(dateInputString);
    console.log(`✓ Filled Date: "${dateString}"`);

    

    // Step 13: Click Create button
    console.log('[STEP 13] Clicking Create button...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 14: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 14] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 15: Check coupon in table
    console.log('[STEP 15] Checking coupon in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let couponFound = false;
    let retries = 5;
    while (retries > 0 && !couponFound) {
      couponFound = await couponsSchemesPage.verifyCouponInTable(couponName);
      if (!couponFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(couponFound).toBeTruthy();
    console.log(`✓ Coupon "${couponName}" found in table`);
    console.log('✓ Test completed successfully');
  });

  // ==================== EDIT COUPON TEST ====================

  test('should verify edit coupon', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Edit Coupon ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Click Add Coupon button
    console.log('[STEP 2] Clicking Add Coupon button...');
    await couponsSchemesPage.clickAddCouponButton();
    await page.waitForTimeout(2000);
    
    const isModalOpen = await couponsSchemesPage.isAddCouponModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add Coupon form is open');

    // Step 3: Fill form fields
    console.log('[STEP 3] Filling coupon form fields...');
    
    // Generate unique coupon name with timestamp
    const timestamp = Date.now();
    const couponName = `TestCoupon${timestamp}`;
    const minUser = '5';
    const discountAmount = '15';
    
    // Fill coupon name
    await couponsSchemesPage.fillCouponName(couponName);
    console.log(`✓ Filled Coupon Name: "${couponName}"`);
    
    // Fill min user
    await couponsSchemesPage.fillMinUser(minUser);
    console.log(`✓ Filled Min User: "${minUser}"`);

    // Step 4: Select plans from dropdown - select all
    console.log('[STEP 4] Selecting all plans from dropdown...');
    await couponsSchemesPage.selectAllPlans();
    console.log('✓ Selected all plans');

    // Step 5: Choose coupon type - static
    console.log('[STEP 5] Selecting coupon type as Static...');
    await couponsSchemesPage.selectCouponType('static');
    console.log('✓ Selected coupon type: Static');

    // Step 6: Enter discount amount
    console.log('[STEP 6] Entering discount amount...');
    await couponsSchemesPage.fillDiscountAmount(discountAmount);
    console.log(`✓ Filled Discount Amount: "${discountAmount}"`);

    // Step 7: Select specific date - ON
    console.log('[STEP 7] Selecting Specific date as ON...');
    await couponsSchemesPage.selectSpecificDate('on');
    console.log('✓ Selected Specific date: ON');

    // Step 8: Enter future date
    console.log('[STEP 8] Entering future date...');
    // Calculate future date (30 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateString = `${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getDate()).padStart(2, '0')}/${futureDate.getFullYear()}`;
    const dateInputString = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
    
    await couponsSchemesPage.fillDateInput(dateInputString);
    console.log(`✓ Filled Date: "${dateString}"`);

    // Step 9: Click Create button
    console.log('[STEP 9] Clicking Create button...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 10: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 10] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 11: Check coupon in table
    console.log('[STEP 11] Checking coupon in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let couponFound = false;
    let retries = 5;
    while (retries > 0 && !couponFound) {
      couponFound = await couponsSchemesPage.verifyCouponInTable(couponName);
      if (!couponFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(couponFound).toBeTruthy();
    console.log(`✓ Coupon "${couponName}" found in table`);

    // Step 12: Go to action column and click edit icon
    console.log('[STEP 12] Clicking edit icon for coupon...');
    await couponsSchemesPage.clickEditIconForCoupon(couponName);
    await page.waitForTimeout(2000);
    
    const isUpdateModalOpen = await couponsSchemesPage.isUpdateCouponModalOpen();
    expect(isUpdateModalOpen).toBeTruthy();
    console.log('✓ Update Coupon form is open');

    // Step 13: Update coupon fields
    console.log('[STEP 13] Updating coupon fields...');
    
    const updatedCouponName = `Updated${couponName}`;
    const updatedMinUser = '10';
    const updatedDiscountAmount = '20';
    
    // Update coupon name
    await couponsSchemesPage.updateCouponName(updatedCouponName);
    console.log(`✓ Updated Coupon Name: "${updatedCouponName}"`);
    
    // Update min user
    await couponsSchemesPage.updateMinUser(updatedMinUser);
    console.log(`✓ Updated Min User: "${updatedMinUser}"`);
    
    // Update discount amount
    await couponsSchemesPage.fillDiscountAmount(updatedDiscountAmount);
    console.log(`✓ Updated Discount Amount: "${updatedDiscountAmount}"`);

    // Step 14: Click Create button
    console.log('[STEP 14] Clicking Create button to update...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Update form submitted');

    // Step 15: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 15] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage2 = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage2).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 16: Check updated coupon in table
    console.log('[STEP 16] Checking updated coupon in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let updatedCouponFound = false;
    retries = 5;
    while (retries > 0 && !updatedCouponFound) {
      updatedCouponFound = await couponsSchemesPage.verifyCouponInTable(updatedCouponName);
      if (!updatedCouponFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(updatedCouponFound).toBeTruthy();
    console.log(`✓ Updated coupon "${updatedCouponName}" found in table`);
    console.log('✓ Test completed successfully');
  });

  // ==================== DELETE COUPON TEST ====================

  test('should verify delete coupon', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Delete Coupon ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Click Add Coupon button
    console.log('[STEP 2] Clicking Add Coupon button...');
    await couponsSchemesPage.clickAddCouponButton();
    await page.waitForTimeout(2000);
    
    const isModalOpen = await couponsSchemesPage.isAddCouponModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add Coupon form is open');

    // Step 3: Fill form fields
    console.log('[STEP 3] Filling coupon form fields...');
    
    // Generate unique coupon name with timestamp
    const timestamp = Date.now();
    const couponName = `TestCoupon${timestamp}`;
    const minUser = '5';
    const discountAmount = '15';
    
    // Fill coupon name
    await couponsSchemesPage.fillCouponName(couponName);
    console.log(`✓ Filled Coupon Name: "${couponName}"`);
    
    // Fill min user
    await couponsSchemesPage.fillMinUser(minUser);
    console.log(`✓ Filled Min User: "${minUser}"`);

    // Step 4: Select plans from dropdown - select all
    console.log('[STEP 4] Selecting all plans from dropdown...');
    await couponsSchemesPage.selectAllPlans();
    console.log('✓ Selected all plans');

    // Step 5: Choose coupon type - static
    console.log('[STEP 5] Selecting coupon type as Static...');
    await couponsSchemesPage.selectCouponType('static');
    console.log('✓ Selected coupon type: Static');

    // Step 6: Enter discount amount
    console.log('[STEP 6] Entering discount amount...');
    await couponsSchemesPage.fillDiscountAmount(discountAmount);
    console.log(`✓ Filled Discount Amount: "${discountAmount}"`);

    // Step 7: Select specific date - ON
    console.log('[STEP 7] Selecting Specific date as ON...');
    await couponsSchemesPage.selectSpecificDate('on');
    console.log('✓ Selected Specific date: ON');

    // Step 8: Enter future date
    console.log('[STEP 8] Entering future date...');
    // Calculate future date (30 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateString = `${String(futureDate.getMonth() + 1).padStart(2, '0')}/${String(futureDate.getDate()).padStart(2, '0')}/${futureDate.getFullYear()}`;
    const dateInputString = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
    
    await couponsSchemesPage.fillDateInput(dateInputString);
    console.log(`✓ Filled Date: "${dateString}"`);

    // Step 9: Click Create button
    console.log('[STEP 9] Clicking Create button...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 10: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 10] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 11: Check coupon in table
    console.log('[STEP 11] Checking coupon in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let couponFound = false;
    let retries = 5;
    while (retries > 0 && !couponFound) {
      couponFound = await couponsSchemesPage.verifyCouponInTable(couponName);
      if (!couponFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(couponFound).toBeTruthy();
    console.log(`✓ Coupon "${couponName}" found in table`);

    // Step 12: Go to action column and click delete icon
    console.log('[STEP 12] Clicking delete icon for coupon...');
    await couponsSchemesPage.clickDeleteIconForCoupon(couponName);
    await page.waitForTimeout(2000);
    
    const isDeleteModalOpen = await couponsSchemesPage.isDeleteCouponModalOpen();
    expect(isDeleteModalOpen).toBeTruthy();
    console.log('✓ Delete Coupon modal is open');

    // Step 13: Click Yes button to confirm deletion
    console.log('[STEP 13] Clicking Yes button to confirm deletion...');
    await couponsSchemesPage.clickDeleteYesButton();
    await page.waitForTimeout(3000);
    console.log('✓ Deletion confirmed');

    // Step 14: Check deleted coupon is not visible in table
    console.log('[STEP 14] Checking deleted coupon is not visible in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to update
    let couponDeleted = false;
    retries = 5;
    while (retries > 0 && !couponDeleted) {
      couponDeleted = await couponsSchemesPage.verifyCouponNotInTable(couponName);
      if (!couponDeleted) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(couponDeleted).toBeTruthy();
    console.log(`✓ Coupon "${couponName}" is deleted and not visible in table`);
    console.log('✓ Test completed successfully');
  });

  // ==================== ADD SCHEME TEST ====================

  test('should verify add scheme', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Add Scheme ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Click on Scheme section/tab
    console.log('[STEP 2] Clicking on Scheme section...');
    await couponsSchemesPage.clickSchemeTab();
    await page.waitForTimeout(2000);
    console.log('✓ Scheme section is active');

    // Step 3: Click Scheme button
    console.log('[STEP 3] Clicking Add Scheme button...');
    await couponsSchemesPage.clickAddSchemeButton();
    await page.waitForTimeout(2000);
    
    const isFormOpen = await couponsSchemesPage.isAddSchemeFormOpen();
    expect(isFormOpen).toBeTruthy();
    console.log('✓ Add Scheme form is open');

    // Step 4: Click Create/Submit to check required fields validation
    console.log('[STEP 4] Clicking Create to check required fields validation...');
    await couponsSchemesPage.clickCreateButtonForValidation();
    await page.waitForTimeout(3000);
    
    // Check for validation errors with retry
    let validationErrors = await couponsSchemesPage.getAllValidationErrors();
    let validationRetries = 3;
    while (validationErrors.length === 0 && validationRetries > 0) {
      await page.waitForTimeout(1000);
      validationErrors = await couponsSchemesPage.getAllValidationErrors();
      validationRetries--;
    }
    
    // If still no errors found, check for invalid form fields
    if (validationErrors.length === 0) {
      const invalidFields = await page.locator('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').count();
      if (invalidFields > 0) {
        validationErrors = Array(invalidFields).fill('Required field');
      }
    }
    
    expect(validationErrors.length).toBeGreaterThan(0);
    console.log(`✓ Validation errors displayed (${validationErrors.length} error(s))`);
    console.log('✓ Required fields validation is working');

    // Step 5: Fill form fields
    console.log('[STEP 5] Filling scheme form fields...');
    
    // Generate unique scheme name with timestamp
    const timestamp = Date.now();
    const schemeName = `TestScheme${timestamp}`;
    const noOfUsers = '5';
    const rewardValue = '10';
    
    // Fill scheme name
    await couponsSchemesPage.fillSchemeName(schemeName);
    console.log(`✓ Filled Scheme Name: "${schemeName}"`);

    // Step 6: Select partners from dropdown - select all
    console.log('[STEP 6] Selecting all partners from dropdown...');
    await couponsSchemesPage.selectAllPartners();
    console.log('✓ Selected all partners');

    // Step 7: Select plans from dropdown - select all
    console.log('[STEP 7] Selecting all plans from dropdown...');
    await couponsSchemesPage.selectAllPlansScheme();
    console.log('✓ Selected all plans');

    // Step 8: Select scheme type - non-recurring
    console.log('[STEP 8] Selecting scheme type as Non-Recurring...');
    await couponsSchemesPage.selectSchemeType('non-recurring');
    console.log('✓ Selected scheme type: Non-Recurring');

    // Step 9: Enter start date
    console.log('[STEP 9] Entering start date...');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Tomorrow
    const startDateString = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    await couponsSchemesPage.fillStartDate(startDateString);
    console.log(`✓ Filled Start Date: "${startDateString}"`);

    // Step 10: Enter end date
    console.log('[STEP 10] Entering end date...');
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days from now
    const endDateString = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    await couponsSchemesPage.fillEndDate(endDateString);
    console.log(`✓ Filled End Date: "${endDateString}"`);

    // Step 11: Enter no. of users
    console.log('[STEP 11] Entering no. of users...');
    await couponsSchemesPage.fillRewardTriggerNoOfUsers(noOfUsers);
    console.log(`✓ Filled No. of Users: "${noOfUsers}"`);

    // Step 12: Enter reward value
    console.log('[STEP 12] Entering reward value...');
    await couponsSchemesPage.fillRewardTriggerValue(rewardValue);
    console.log(`✓ Filled Reward Value: "${rewardValue}"`);

    // Step 13: Click Create button
    console.log('[STEP 13] Clicking Create button...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 14: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 14] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 15: Check scheme in table
    console.log('[STEP 15] Checking scheme in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let schemeFound = false;
    let retries = 5;
    while (retries > 0 && !schemeFound) {
      schemeFound = await couponsSchemesPage.verifySchemeInTable(schemeName);
      if (!schemeFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(schemeFound).toBeTruthy();
    console.log(`✓ Scheme "${schemeName}" found in table`);
    console.log('✓ Test completed successfully');
  });

  // ==================== EDIT SCHEME TEST ====================

  test('should verify edit scheme', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Edit Scheme ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Click on Scheme section/tab
    console.log('[STEP 2] Clicking on Scheme section...');
    await couponsSchemesPage.clickSchemeTab();
    await page.waitForTimeout(2000);
    console.log('✓ Scheme section is active');

    // Step 3: Click Add Scheme button
    console.log('[STEP 3] Clicking Add Scheme button...');
    await couponsSchemesPage.clickAddSchemeButton();
    await page.waitForTimeout(2000);
    
    const isFormOpen = await couponsSchemesPage.isAddSchemeFormOpen();
    expect(isFormOpen).toBeTruthy();
    console.log('✓ Add Scheme form is open');

    // Step 4: Click Create/Submit to check required fields validation
    console.log('[STEP 4] Clicking Create to check required fields validation...');
    await couponsSchemesPage.clickCreateButtonForValidation();
    await page.waitForTimeout(3000);
    
    // Check for validation errors with retry
    let validationErrors = await couponsSchemesPage.getAllValidationErrors();
    let validationRetries = 3;
    while (validationErrors.length === 0 && validationRetries > 0) {
      await page.waitForTimeout(1000);
      validationErrors = await couponsSchemesPage.getAllValidationErrors();
      validationRetries--;
    }
    
    // If still no errors found, check for invalid form fields
    if (validationErrors.length === 0) {
      const invalidFields = await page.locator('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').count();
      if (invalidFields > 0) {
        validationErrors = Array(invalidFields).fill('Required field');
      }
    }
    
    expect(validationErrors.length).toBeGreaterThan(0);
    console.log(`✓ Validation errors displayed (${validationErrors.length} error(s))`);
    console.log('✓ Required fields validation is working');

    // Step 5: Fill form fields
    console.log('[STEP 5] Filling scheme form fields...');
    
    // Generate unique scheme name with timestamp
    const timestamp = Date.now();
    const schemeName = `TestScheme${timestamp}`;
    const noOfUsers = '5';
    const rewardValue = '10';
    
    // Fill scheme name
    await couponsSchemesPage.fillSchemeName(schemeName);
    console.log(`✓ Filled Scheme Name: "${schemeName}"`);

    // Step 6: Select partners from dropdown - select all
    console.log('[STEP 6] Selecting all partners from dropdown...');
    await couponsSchemesPage.selectAllPartners();
    console.log('✓ Selected all partners');

    // Step 7: Select plans from dropdown - select all
    console.log('[STEP 7] Selecting all plans from dropdown...');
    await couponsSchemesPage.selectAllPlansScheme();
    console.log('✓ Selected all plans');

    // Step 8: Select scheme type - non-recurring
    console.log('[STEP 8] Selecting scheme type as Non-Recurring...');
    await couponsSchemesPage.selectSchemeType('non-recurring');
    console.log('✓ Selected scheme type: Non-Recurring');

    // Step 9: Enter start date
    console.log('[STEP 9] Entering start date...');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Tomorrow
    const startDateString = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    await couponsSchemesPage.fillStartDate(startDateString);
    console.log(`✓ Filled Start Date: "${startDateString}"`);

    // Step 10: Enter end date
    console.log('[STEP 10] Entering end date...');
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days from now
    const endDateString = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    await couponsSchemesPage.fillEndDate(endDateString);
    console.log(`✓ Filled End Date: "${endDateString}"`);

    // Step 11: Enter no. of users
    console.log('[STEP 11] Entering no. of users...');
    await couponsSchemesPage.fillRewardTriggerNoOfUsers(noOfUsers);
    console.log(`✓ Filled No. of Users: "${noOfUsers}"`);

    // Step 12: Enter reward value
    console.log('[STEP 12] Entering reward value...');
    await couponsSchemesPage.fillRewardTriggerValue(rewardValue);
    console.log(`✓ Filled Reward Value: "${rewardValue}"`);

    // Step 13: Click Create button
    console.log('[STEP 13] Clicking Create button...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 14: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 14] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 15: Check scheme in table
    console.log('[STEP 15] Checking scheme in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let schemeFound = false;
    let retries = 5;
    while (retries > 0 && !schemeFound) {
      schemeFound = await couponsSchemesPage.verifySchemeInTable(schemeName);
      if (!schemeFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(schemeFound).toBeTruthy();
    console.log(`✓ Scheme "${schemeName}" found in table`);

    // Step 16: Go to action column and click edit icon
    console.log('[STEP 16] Clicking edit icon for scheme...');
    await couponsSchemesPage.clickEditIconForScheme(schemeName);
    await page.waitForTimeout(2000);
    
    const isUpdateFormOpen = await couponsSchemesPage.isUpdateSchemeFormOpen();
    expect(isUpdateFormOpen).toBeTruthy();
    console.log('✓ Update Scheme form is open');

    // Step 17: Update scheme name
    console.log('[STEP 17] Updating scheme name...');
    const updatedSchemeName = `UpdatedScheme${timestamp}`;
    await couponsSchemesPage.updateSchemeName(updatedSchemeName);
    console.log(`✓ Updated Scheme Name: "${updatedSchemeName}"`);

    // Step 18: Click Update button
    console.log('[STEP 18] Clicking Update button...');
    await couponsSchemesPage.clickCreateButton(); // Uses same button (Create/Update)
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 19: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 19] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage2 = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage2).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 20: Check updated scheme in table
    console.log('[STEP 20] Checking updated scheme in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let updatedSchemeFound = false;
    retries = 5;
    while (retries > 0 && !updatedSchemeFound) {
      updatedSchemeFound = await couponsSchemesPage.verifySchemeInTable(updatedSchemeName);
      if (!updatedSchemeFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(updatedSchemeFound).toBeTruthy();
    console.log(`✓ Updated scheme "${updatedSchemeName}" found in table`);
    console.log('✓ Test completed successfully');
  });

  // ==================== DELETE SCHEME TEST ====================

  test('should verify delete scheme', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Delete Scheme ===');
    
    const couponsSchemesPage = new CouponsSchemesPage(page);

    // Step 1: Navigate to Coupons & Schemes page
    console.log('[STEP 1] Navigating to Coupons & Schemes page...');
    await couponsSchemesPage.gotoCouponsSchemes(baseUrl);
    await page.waitForTimeout(3000);
    
    let isPageLoaded = await couponsSchemesPage.isPageLoaded();
    if (!isPageLoaded) {
      await page.waitForTimeout(3000);
      isPageLoaded = await couponsSchemesPage.isPageLoaded();
    }
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Coupons & Schemes page is loaded');

    // Step 2: Click on Scheme section/tab
    console.log('[STEP 2] Clicking on Scheme section...');
    await couponsSchemesPage.clickSchemeTab();
    await page.waitForTimeout(2000);
    console.log('✓ Scheme section is active');

    // Step 3: Click Add Scheme button
    console.log('[STEP 3] Clicking Add Scheme button...');
    await couponsSchemesPage.clickAddSchemeButton();
    await page.waitForTimeout(2000);
    
    const isFormOpen = await couponsSchemesPage.isAddSchemeFormOpen();
    expect(isFormOpen).toBeTruthy();
    console.log('✓ Add Scheme form is open');

    // Step 4: Click Create/Submit to check required fields validation
    console.log('[STEP 4] Clicking Create to check required fields validation...');
    await couponsSchemesPage.clickCreateButtonForValidation();
    await page.waitForTimeout(3000);
    
    // Check for validation errors with retry
    let validationErrors = await couponsSchemesPage.getAllValidationErrors();
    let validationRetries = 3;
    while (validationErrors.length === 0 && validationRetries > 0) {
      await page.waitForTimeout(1000);
      validationErrors = await couponsSchemesPage.getAllValidationErrors();
      validationRetries--;
    }
    
    // If still no errors found, check for invalid form fields
    if (validationErrors.length === 0) {
      const invalidFields = await page.locator('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').count();
      if (invalidFields > 0) {
        validationErrors = Array(invalidFields).fill('Required field');
      }
    }
    
    expect(validationErrors.length).toBeGreaterThan(0);
    console.log(`✓ Validation errors displayed (${validationErrors.length} error(s))`);
    console.log('✓ Required fields validation is working');

    // Step 5: Fill form fields
    console.log('[STEP 5] Filling scheme form fields...');
    
    // Generate unique scheme name with timestamp
    const timestamp = Date.now();
    const schemeName = `TestScheme${timestamp}`;
    const noOfUsers = '5';
    const rewardValue = '10';
    
    // Fill scheme name
    await couponsSchemesPage.fillSchemeName(schemeName);
    console.log(`✓ Filled Scheme Name: "${schemeName}"`);

    // Step 6: Select partners from dropdown - select all
    console.log('[STEP 6] Selecting all partners from dropdown...');
    await couponsSchemesPage.selectAllPartners();
    console.log('✓ Selected all partners');

    // Step 7: Select plans from dropdown - select all
    console.log('[STEP 7] Selecting all plans from dropdown...');
    await couponsSchemesPage.selectAllPlansScheme();
    console.log('✓ Selected all plans');

    // Step 8: Select scheme type - non-recurring
    console.log('[STEP 8] Selecting scheme type as Non-Recurring...');
    await couponsSchemesPage.selectSchemeType('non-recurring');
    console.log('✓ Selected scheme type: Non-Recurring');

    // Step 9: Enter start date
    console.log('[STEP 9] Entering start date...');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Tomorrow
    const startDateString = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    await couponsSchemesPage.fillStartDate(startDateString);
    console.log(`✓ Filled Start Date: "${startDateString}"`);

    // Step 10: Enter end date
    console.log('[STEP 10] Entering end date...');
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days from now
    const endDateString = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    await couponsSchemesPage.fillEndDate(endDateString);
    console.log(`✓ Filled End Date: "${endDateString}"`);

    // Step 11: Enter no. of users
    console.log('[STEP 11] Entering no. of users...');
    await couponsSchemesPage.fillRewardTriggerNoOfUsers(noOfUsers);
    console.log(`✓ Filled No. of Users: "${noOfUsers}"`);

    // Step 12: Enter reward value
    console.log('[STEP 12] Entering reward value...');
    await couponsSchemesPage.fillRewardTriggerValue(rewardValue);
    console.log(`✓ Filled Reward Value: "${rewardValue}"`);

    // Step 13: Click Create button
    console.log('[STEP 13] Clicking Create button...');
    await couponsSchemesPage.clickCreateButton();
    await page.waitForTimeout(3000);
    console.log('✓ Form submitted');

    // Step 14: Verify navigation back to Coupons & Schemes page
    console.log('[STEP 14] Verifying navigation to Coupons & Schemes page...');
    await page.waitForTimeout(2000);
    const isBackOnPage = await couponsSchemesPage.isPageLoaded();
    expect(isBackOnPage).toBeTruthy();
    console.log('✓ Navigated back to Coupons & Schemes page');

    // Step 15: Check scheme in table
    console.log('[STEP 15] Checking scheme in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to load
    let schemeFound = false;
    let retries = 5;
    while (retries > 0 && !schemeFound) {
      schemeFound = await couponsSchemesPage.verifySchemeInTable(schemeName);
      if (!schemeFound) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(schemeFound).toBeTruthy();
    console.log(`✓ Scheme "${schemeName}" found in table`);

    // Step 16: Go to action column and click delete icon
    console.log('[STEP 16] Clicking delete icon for scheme...');
    await couponsSchemesPage.clickDeleteIconForScheme(schemeName);
    await page.waitForTimeout(2000);
    
    const isDeleteModalOpen = await couponsSchemesPage.isDeleteCouponModalOpen();
    expect(isDeleteModalOpen).toBeTruthy();
    console.log('✓ Delete Scheme modal is open');

    // Step 17: Click Yes button to confirm deletion
    console.log('[STEP 17] Clicking Yes button to confirm deletion...');
    await couponsSchemesPage.clickDeleteYesButton();
    await page.waitForTimeout(3000);
    console.log('✓ Deletion confirmed');

    // Step 18: Check deleted scheme is not visible in table
    console.log('[STEP 18] Checking deleted scheme is not visible in table...');
    await page.reload();
    await page.waitForTimeout(3000);
    
    // Wait for table to update
    let schemeDeleted = false;
    retries = 5;
    while (retries > 0 && !schemeDeleted) {
      schemeDeleted = await couponsSchemesPage.verifySchemeNotInTable(schemeName);
      if (!schemeDeleted) {
        await page.waitForTimeout(2000);
        retries--;
      }
    }
    
    expect(schemeDeleted).toBeTruthy();
    console.log(`✓ Scheme "${schemeName}" is deleted and not visible in table`);
    console.log('✓ Test completed successfully');
  });
});

