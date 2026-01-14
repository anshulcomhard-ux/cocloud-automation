const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/product');
const { DashboardPage } = require('../pages/login');

test.describe('Admin Portal - Product Module', () => {
  const baseUrl = process.env.ADMIN_PORTAL_URL || 'https://dev.admin.cocloud.in/login';
  const validEmail = process.env.ADMIN_EMAIL || 'contact@comhard.co.in';
  const validPassword = process.env.ADMIN_PASSWORD || 'hrhk@1111';

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000); // Increase timeout for beforeEach
    // Login before each test
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto(baseUrl);
    await dashboardPage.login(validEmail, validPassword);
    await page.waitForTimeout(3000);
  });

  // ==================== PAGE LOAD TEST ====================

  test('should verify product page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('\n=== Test: Verify Product Page Loads Successfully ===');
    
    const productPage = new ProductPage(page);

    // Navigate to Product page
    console.log('[STEP 1] Navigating to Product page...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    // Verify page is loaded
    console.log('\n[STEP 2] Verifying page is loaded...');
    const isPageLoaded = await productPage.isPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    console.log('✓ Product page is loaded');

    // Verify page title is visible
    console.log('\n[STEP 3] Verifying page title...');
    const isTitleVisible = await productPage.pageTitle.isVisible({ timeout: 5000 });
    expect(isTitleVisible).toBeTruthy();
    const titleText = await productPage.pageTitle.textContent();
    console.log(`✓ Page title is visible: "${titleText?.trim()}"`);

    // Verify table is visible
    console.log('\n[STEP 4] Verifying product table is visible...');
    const tableInfo = await productPage.verifyTableWithData();
    expect(tableInfo.visible).toBeTruthy();
    console.log(`✓ Product table is visible`);
    console.log(`✓ Table has ${tableInfo.rowCount} row(s)`);

    // Verify Add Product button is visible
    console.log('\n[STEP 5] Verifying Add Product button...');
    const isAddProductVisible = await productPage.addProductButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (isAddProductVisible) {
      console.log('✓ "+ Product" button is visible');
    } else {
      console.log('⚠ "+ Product" button not found (may be optional)');
    }

    // Verify Select Headers button is visible
    console.log('\n[STEP 6] Verifying Select Headers button...');
    const isSelectHeadersVisible = await productPage.selectHeadersButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (isSelectHeadersVisible) {
      console.log('✓ "Select Headers" button is visible');
    } else {
      console.log('⚠ "Select Headers" button not found (may be optional)');
    }

    // Verify record count text is visible (if data exists)
    console.log('\n[STEP 7] Verifying record count information...');
    const isRecordCountVisible = await productPage.recordCountText.isVisible({ timeout: 5000 }).catch(() => false);
    if (isRecordCountVisible) {
      const recordText = await productPage.recordCountText.textContent();
      console.log(`✓ Record count text is visible: "${recordText?.trim()}"`);
    } else {
      console.log('⚠ Record count text not found (may be optional)');
    }

    await page.screenshot({ path: 'artifacts/product-page-load.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== ADD NEW PRODUCT TEST ====================

  test('should verify add new product - click button, modal opens, check required message, enter values, submit, verify in table', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Add New Product - Complete Flow ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;

    // Navigate to Product page
    console.log('[STEP 1] Navigating to Product page...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    // Get initial table data
    console.log('\n[STEP 2] Getting initial table data...');
    const initialTableInfo = await productPage.verifyTableDataOrEmpty();
    const initialRowCount = initialTableInfo.rowCount;
    console.log(`✓ Initial row count: ${initialRowCount}`);

    // Click Add Product button
    console.log('\n[STEP 3] Clicking Add Product button...');
    await productPage.clickAddProductButton();
    console.log('✓ Clicked Add Product button');

    // Verify Add New Product modal is open
    console.log('\n[STEP 4] Verifying Add New Product modal is open...');
    await page.waitForTimeout(2000);
    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    // Verify modal title
    const modalTitle = await productPage.addProductModalTitle.textContent();
    expect(modalTitle).toBeTruthy();
    expect(modalTitle?.trim().toLowerCase()).toContain('add new product');
    console.log(`✓ Modal title verified: "${modalTitle?.trim()}"`);

    // Click Submit button without filling fields - check required message
    console.log('\n[STEP 5] Clicking Submit button without filling fields...');
    await productPage.submitAddProductForm();
    await page.waitForTimeout(1000);
    console.log('✓ Clicked Submit button');

    // Verify required field error is visible
    console.log('\n[STEP 6] Verifying required field error message...');
    const isRequiredErrorVisible = await productPage.isRequiredFieldErrorVisible();
    expect(isRequiredErrorVisible).toBeTruthy();
    console.log('✓ Required field error message is visible');

    // Verify modal is still open (should not close with validation errors)
    const isModalStillOpen = await productPage.isAddProductModalOpen();
    expect(isModalStillOpen).toBeTruthy();
    console.log('✓ Modal is still open (validation prevented submission)');

    // Enter values in fields
    console.log('\n[STEP 7] Entering values in form fields...');
    await productPage.fillFullName(testProductName);
    console.log(`✓ Filled Full Name: "${testProductName}"`);
    
    await productPage.fillDescription(testDescription);
    console.log(`✓ Filled Description: "${testDescription}"`);

    // Click Submit button
    console.log('\n[STEP 8] Submitting Add New Product form...');
    await productPage.submitAddProductForm();
    console.log('✓ Form submitted');

    // Wait for navigation to Product Details page
    console.log('\n[STEP 9] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    
    // Verify modal is closed
    const isModalClosed = await productPage.isAddProductModalOpen();
    expect(isModalClosed).toBeFalsy();
    console.log('✓ Modal is closed');

    // Verify Product Details page is loaded
    console.log('\n[STEP 10] Verifying Product Details page is loaded...');
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Verify Full Name field is filled with the entered value
    console.log('\n[STEP 11] Verifying Full Name field is filled...');
    const detailsFullName = await productPage.getProductDetailsFullName();
    expect(detailsFullName).toBeTruthy();
    expect(detailsFullName).toBe(testProductName);
    console.log(`✓ Full Name field is filled: "${detailsFullName}"`);
    console.log(`  Expected: "${testProductName}"`);

    // Verify Description field is filled with the entered value
    console.log('\n[STEP 12] Verifying Description field is filled...');
    const detailsDescription = await productPage.getProductDetailsDescription();
    expect(detailsDescription).toBeTruthy();
    expect(detailsDescription).toBe(testDescription);
    console.log(`✓ Description field is filled: "${detailsDescription}"`);
    console.log(`  Expected: "${testDescription}"`);

    // Note: After adding product, the page navigates to Product Details page
    // The product fields are verified above in steps 11-12
    // If we need to verify in table, we would need to navigate back to the product list page

    await page.screenshot({ path: 'artifacts/product-add-new-product.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== EDIT AND DELETE PRODUCT TEST ====================

  test('should verify edit product and delete product flow', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Edit Product and Delete Product Flow ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;
    const editedProductName = `EditedProduct${timestamp}`;
    const editedDescription = `Edited Description for Product ${timestamp}`;

    // Step 1: Add a new product
    console.log('[STEP 1] Adding a new product...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    await productPage.clickAddProductButton();
    console.log('✓ Clicked Add Product button');
    await page.waitForTimeout(2000);

    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    await productPage.fillFullName(testProductName);
    console.log(`✓ Filled Full Name: "${testProductName}"`);
    
    await productPage.fillDescription(testDescription);
    console.log(`✓ Filled Description: "${testDescription}"`);

    await productPage.submitAddProductForm();
    console.log('✓ Form submitted');

    // Step 2: Navigate to product details page (happens automatically)
    console.log('\n[STEP 2] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Verify initial values
    const initialFullName = await productPage.getProductDetailsFullName();
    const initialDescription = await productPage.getProductDetailsDescription();
    expect(initialFullName).toBe(testProductName);
    expect(initialDescription).toBe(testDescription);
    console.log(`✓ Initial Full Name verified: "${initialFullName}"`);
    console.log(`✓ Initial Description verified: "${initialDescription}"`);

    // Step 3: Edit full name and description value
    console.log('\n[STEP 3] Editing Full Name and Description...');
    await productPage.editProductDetailsFullName(editedProductName);
    console.log(`✓ Edited Full Name: "${editedProductName}"`);
    
    await productPage.editProductDetailsDescription(editedDescription);
    console.log(`✓ Edited Description: "${editedDescription}"`);

    // Step 4: Click update button
    console.log('\n[STEP 4] Clicking Update button...');
    await productPage.clickProductDetailsUpdateButton();
    console.log('✓ Clicked Update button');

    // Step 5: Now navigated to product page
    console.log('\n[STEP 5] Verifying navigation to Product page...');
    await page.waitForTimeout(3000);
    
    const isProductPageLoaded = await productPage.isPageLoaded();
    expect(isProductPageLoaded).toBeTruthy();
    console.log('✓ Navigated back to Product page');

    // Step 6: Refresh the page first
    console.log('\n[STEP 6] Refreshing the page...');
    await page.reload();
    await page.waitForTimeout(2000);
    console.log('✓ Page refreshed');

    // Step 7: Check go to action column in table
    console.log('\n[STEP 7] Verifying table and action column...');
    const tableInfo = await productPage.verifyTableDataOrEmpty();
    expect(tableInfo.hasData).toBeTruthy();
    console.log(`✓ Table has ${tableInfo.rowCount} row(s)`);

    // Verify the edited product appears in the table
    const productFound = await productPage.verifyProductInTable(editedProductName);
      expect(productFound).toBeTruthy();
    console.log(`✓ Edited product "${editedProductName}" found in table`);

    // Step 8: Click delete icon to delete product
    console.log('\n[STEP 8] Clicking delete icon for the product...');
    await productPage.clickDeleteIconForProduct(editedProductName);
    console.log('✓ Clicked delete icon');

    // Step 9: Delete product modal will open
    console.log('\n[STEP 9] Verifying Delete Product modal is open...');
    await page.waitForTimeout(1000);
    const isDeleteModalOpen = await productPage.isDeleteProductModalOpen();
    expect(isDeleteModalOpen).toBeTruthy();
    console.log('✓ Delete Product modal is open');

    // Step 10: Click yes to delete
    console.log('\n[STEP 10] Clicking Yes to confirm deletion...');
    await productPage.confirmDeleteProduct();
    console.log('✓ Clicked Yes to delete');

    // Step 11: Check in table - product not visible - refresh if required
    console.log('\n[STEP 11] Verifying product is deleted from table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(2000);
    console.log('✓ Page refreshed to check table');

    // Verify product is not in table
    const productStillExists = await productPage.verifyProductInTable(editedProductName);
    expect(productStillExists).toBeFalsy();
    console.log(`✓ Product "${editedProductName}" is not visible in table (deleted successfully)`);

    // Also verify original product name is not in table
    const originalProductExists = await productPage.verifyProductInTable(testProductName);
    expect(originalProductExists).toBeFalsy();
    console.log(`✓ Original product "${testProductName}" is also not visible in table`);

    await page.screenshot({ path: 'artifacts/product-edit-delete.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== ADD PLAN TEST ====================

  test('should verify add plan to product - click plan button, modal opens, check required fields, enter values, submit, verify in plan table', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Add Plan to Product ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;
    const testPlanName = `TestPlan${timestamp}`;
    const testPlanCode = `PLAN${timestamp}`;
    const testPrice = '100';
    const testPlanDescription = `Test Plan Description ${timestamp}`;
    const testBillEvery = '1';

    // Step 1: First add product
    console.log('[STEP 1] Adding a new product...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    await productPage.clickAddProductButton();
    console.log('✓ Clicked Add Product button');
    await page.waitForTimeout(2000);

    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    await productPage.fillFullName(testProductName);
    console.log(`✓ Filled Full Name: "${testProductName}"`);
    
    await productPage.fillDescription(testDescription);
    console.log(`✓ Filled Description: "${testDescription}"`);

    await productPage.submitAddProductForm();
    console.log('✓ Form submitted');

    // Step 2: Navigate to product details page (happens automatically)
    console.log('\n[STEP 2] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Step 3: Click plan button - modal opens
    console.log('\n[STEP 3] Clicking Add Plan button...');
    await productPage.clickAddPlanButton();
    console.log('✓ Clicked Add Plan button');

    await page.waitForTimeout(2000);
    const isAddPlanModalOpen = await productPage.isAddPlanModalOpen();
    expect(isAddPlanModalOpen).toBeTruthy();
    console.log('✓ Add Plan modal is open');

    // Verify modal title
    const planModalTitle = await productPage.addPlanModalTitle.textContent();
    expect(planModalTitle).toBeTruthy();
    expect(planModalTitle?.trim().toLowerCase()).toContain('add plan');
    console.log(`✓ Modal title verified: "${planModalTitle?.trim()}"`);

    // Step 4: Click submit - check required fields
    console.log('\n[STEP 4] Clicking Submit button without filling fields to check required validation...');
    await productPage.clickAddPlanSubmitButton();
    await page.waitForTimeout(2000); // Wait for validation errors to appear
    console.log('✓ Clicked Submit button');

    // Verify required field error is visible
    const isRequiredErrorVisible = await productPage.isRequiredFieldErrorVisible();
    expect(isRequiredErrorVisible).toBeTruthy();
    console.log('✓ Required field error message is visible');

    // Verify modal is still open (should not close with validation errors)
    const isModalStillOpen = await productPage.isAddPlanModalOpen();
    expect(isModalStillOpen).toBeTruthy();
    console.log('✓ Modal is still open (validation prevented submission)');

    // Step 5: Enter plan name, plan code
    console.log('\n[STEP 5] Entering plan name and plan code...');
    await productPage.fillPlanName(testPlanName);
    console.log(`✓ Filled Plan Name: "${testPlanName}"`);
    
    await productPage.fillPlanCode(testPlanCode);
    console.log(`✓ Filled Plan Code: "${testPlanCode}"`);

    // Step 6: Enter price, description
    console.log('\n[STEP 6] Entering price and description...');
    await productPage.fillPlanPrice(testPrice);
    console.log(`✓ Filled Price: "${testPrice}"`);
    
    await productPage.fillPlanDescription(testPlanDescription);
    console.log(`✓ Filled Plan Description: "${testPlanDescription}"`);

    // Step 7: Select value from unit dropdown
    console.log('\n[STEP 7] Selecting value from Unit dropdown...');
    await productPage.selectPlanUnit('GB');
    console.log('✓ Selected Unit: "GB"');

    // Step 8: Select value from billing cycle dropdown
    console.log('\n[STEP 8] Selecting value from Billing Cycle dropdown...');
    await productPage.selectPlanBillingCycle('Month(s)');
    console.log('✓ Selected Billing Cycle: "Month(s)"');

    // Step 9: Enter bill every input value
    console.log('\n[STEP 9] Entering Bill Every value...');
    await productPage.fillPlanBillEvery(testBillEvery);
    console.log(`✓ Filled Bill Every: "${testBillEvery}"`);

    // Verify no validation errors before submitting
    console.log('\n[STEP 9b] Verifying no validation errors before submitting...');
    await page.waitForTimeout(500);
    
    // Verify Plan Name field has value
    const planNameValue = await productPage.addPlanNameField.inputValue().catch(() => '');
    console.log(`  Plan Name field value: "${planNameValue}"`);
    if (!planNameValue || planNameValue.trim() === '') {
      console.log('  ⚠ Plan Name field is empty! Re-filling...');
      await productPage.fillPlanName(testPlanName);
      await page.waitForTimeout(500);
      const planNameValueAfterRefill = await productPage.addPlanNameField.inputValue().catch(() => '');
      console.log(`  Plan Name field value after refill: "${planNameValueAfterRefill}"`);
    }
    
    const hasErrorsBeforeSubmit = await productPage.isRequiredFieldErrorVisible();
    if (hasErrorsBeforeSubmit) {
      console.log('⚠ Validation errors present before submit - this may prevent submission');
      const allErrors = await productPage.getAllValidationErrors();
      if (allErrors.length > 0) {
        console.log(`  Validation errors: ${allErrors.join(', ')}`);
      }
    } else {
      console.log('✓ No validation errors before submit');
    }

    // Step 10: Click submit
    console.log('\n[STEP 10] Submitting Add Plan form...');
    await productPage.submitAddPlanForm();
    console.log('✓ Form submitted');

    // Step 11: Navigated to product details page (should still be on details page)
    console.log('\n[STEP 11] Verifying still on Product Details page...');
    await page.waitForTimeout(2000);
    
    const isStillOnDetailsPage = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Verify modal is closed - wait for it to close
    console.log('\n[STEP 11b] Verifying Add Plan modal is closed...');
    let isPlanModalClosed = false;
    for (let i = 0; i < 15; i++) {
      await page.waitForTimeout(500);
      isPlanModalClosed = !(await productPage.isAddPlanModalOpen());
      if (isPlanModalClosed) {
        break;
      }
    }
    
    if (!isPlanModalClosed) {
      // If modal is still open, it might be due to validation or other issues
      // Try to check if there are validation errors
      const hasValidationError = await productPage.isRequiredFieldErrorVisible();
      if (hasValidationError) {
        console.log('⚠ Modal still open with validation errors - this may indicate a form issue');
      } else {
        console.log('⚠ Modal still open - waiting a bit more...');
        await page.waitForTimeout(3000);
        isPlanModalClosed = !(await productPage.isAddPlanModalOpen());
      }
    }
    
    // If modal is still open, try to close it and refresh
    if (!isPlanModalClosed) {
      console.log('⚠ Add Plan modal appears to still be open, attempting to close it...');
      try {
        // Try pressing Escape key to close modal
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);
        isPlanModalClosed = !(await productPage.isAddPlanModalOpen());
        if (isPlanModalClosed) {
          console.log('✓ Modal closed using Escape key');
        } else {
          // Try clicking Cancel button
          try {
            await productPage.addPlanModalCancel.click({ timeout: 2000 });
            await page.waitForTimeout(1000);
            isPlanModalClosed = !(await productPage.isAddPlanModalOpen());
            if (isPlanModalClosed) {
              console.log('✓ Modal closed using Cancel button');
            }
          } catch (cancelError) {
            console.log('⚠ Could not close modal with Cancel button');
          }
        }
      } catch (error) {
        console.log('⚠ Could not close modal, will refresh page and check table...');
      }
      
      // Refresh page to ensure we're on the correct state
      console.log('  Refreshing page to check plan table...');
      await page.reload();
      await page.waitForTimeout(2000);
    } else {
      console.log('✓ Add Plan modal is closed');
    }

    // Step 12: Check in plan table - plan is added
    console.log('\n[STEP 12] Verifying plan is added in plan table...');
    await page.waitForTimeout(2000);
    
    // Verify we're still on Product Details page
    const isOnDetailsPage = await productPage.isProductDetailsPageLoaded();
    if (!isOnDetailsPage) {
      console.log('⚠ Not on Product Details page, navigating back...');
      // Navigate back to product details if needed
      await productPage.gotoProduct(baseUrl);
      await page.waitForTimeout(2000);
      // Find and click on the product to go to details page
      // For now, just check if we can find the plan in the main product table
    }
    
    // Verify plan appears in the plan table
    const planFound = await productPage.verifyPlanInTable(testPlanName);
    
    if (!planFound) {
      // If plan not found, wait a bit more and check again
      console.log('  Plan not found immediately, waiting and checking again...');
      await page.waitForTimeout(2000);
      const planFoundRetry = await productPage.verifyPlanInTable(testPlanName);
      
      if (planFoundRetry) {
        expect(planFoundRetry).toBeTruthy();
        console.log(`✓ Plan "${testPlanName}" found in plan table (after retry)`);
      } else {
        // If still not found, check if table has any rows
        const planTableRows = await productPage.planTableRows.count();
        console.log(`⚠ Plan "${testPlanName}" not found in plan table`);
        console.log(`  Plan table has ${planTableRows} row(s)`);
        
        if (planTableRows > 0) {
          // Get the first plan name to see what's there
          const firstPlanName = await productPage.getPlanNameFromTable();
          console.log(`  First plan in table: "${firstPlanName}"`);
          console.log(`  Expected: "${testPlanName}"`);
          
          // Check if the plan name matches (case-insensitive or partial match)
          if (firstPlanName && firstPlanName.toLowerCase().includes(testPlanName.toLowerCase())) {
            console.log('✓ Plan found with partial match');
            expect(true).toBeTruthy(); // Test passes
          } else {
            // If modal was still open, the form likely didn't submit
            if (!isPlanModalClosed) {
              throw new Error(`Plan was not added - modal was still open after submission, indicating form submission failed`);
            } else {
              throw new Error(`Plan "${testPlanName}" not found in plan table. Found: "${firstPlanName}"`);
            }
          }
        } else {
          // No plans in table - form definitely didn't submit
          if (!isPlanModalClosed) {
            throw new Error(`Plan was not added - modal was still open after submission and no plans in table`);
          } else {
            throw new Error(`Plan table is empty - plan was not added`);
          }
        }
      }
    } else {
      expect(planFound).toBeTruthy();
      console.log(`✓ Plan "${testPlanName}" found in plan table`);
    }

    // Get the plan name from table to verify
    const planNameFromTable = await productPage.getPlanNameFromTable();
    expect(planNameFromTable).toBeTruthy();
    expect(planNameFromTable.toLowerCase()).toContain(testPlanName.toLowerCase());
    console.log(`✓ Plan name from table: "${planNameFromTable}"`);
    console.log(`  Expected: "${testPlanName}"`);

    await page.screenshot({ path: 'artifacts/product-add-plan.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== EDIT AND DELETE PLAN TEST ====================

  test('should verify edit plan and delete plan flow', async ({ page }, testInfo) => {
    test.setTimeout(240000);
    console.log('\n=== Test: Verify Edit Plan and Delete Plan Flow ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;
    const testPlanName = `TestPlan${timestamp}`;
    const testPlanCode = `PLAN${timestamp}`;
    const testPrice = '100';
    const testPlanDescription = `Test Plan Description ${timestamp}`;
    const testBillEvery = '1';
    
    const editedPlanName = `EditedPlan${timestamp}`;
    const editedPlanCode = `EDITED${timestamp}`;
    const editedPrice = '200';
    const editedPlanDescription = `Edited Plan Description ${timestamp}`;

    // Step 1: First add product
    console.log('[STEP 1] Adding a new product...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    await productPage.clickAddProductButton();
    await page.waitForTimeout(2000);
    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    await productPage.fillFullName(testProductName);
    await productPage.fillDescription(testDescription);
    await productPage.submitAddProductForm();
    console.log('✓ Product added');

    // Step 2: Navigate to product details page (happens automatically)
    console.log('\n[STEP 2] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Step 3: Now add plan
    console.log('\n[STEP 3] Adding a plan...');
    await productPage.clickAddPlanButton();
    await page.waitForTimeout(2000);
    const isAddPlanModalOpen = await productPage.isAddPlanModalOpen();
    expect(isAddPlanModalOpen).toBeTruthy();
    console.log('✓ Add Plan modal is open');

    await productPage.fillPlanName(testPlanName);
    await productPage.fillPlanCode(testPlanCode);
    await productPage.fillPlanPrice(testPrice);
    await productPage.fillPlanDescription(testPlanDescription);
    await productPage.selectPlanUnit('GB');
    await productPage.selectPlanBillingCycle('Month(s)');
    await productPage.fillPlanBillEvery(testBillEvery);
    console.log('✓ Filled all plan fields');

    await productPage.submitAddPlanForm();
    console.log('✓ Plan submitted');

    // Step 4: Navigate to product details page (should still be there)
    console.log('\n[STEP 4] Verifying still on Product Details page...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Verify plan is in table
    const planFound = await productPage.verifyPlanInTable(testPlanName);
    expect(planFound).toBeTruthy();
    console.log(`✓ Plan "${testPlanName}" found in plan table`);

    // Step 5: Go to action column and click edit icon - modal opens
    console.log('\n[STEP 5] Clicking edit icon in plan table action column...');
    await productPage.clickPlanEditIcon();
    console.log('✓ Clicked edit icon');

    // Step 6: Verify Update Plan modal opens
    console.log('\n[STEP 6] Verifying Update Plan modal is open...');
    await page.waitForTimeout(2000);
    const isUpdatePlanModalOpen = await productPage.isUpdatePlanModalOpen();
    expect(isUpdatePlanModalOpen).toBeTruthy();
    console.log('✓ Update Plan modal is open');

    // Step 7: Edit fields
    console.log('\n[STEP 7] Editing plan fields...');
    await productPage.editPlanName(editedPlanName);
    console.log(`✓ Edited Plan Name: "${editedPlanName}"`);
    
    await productPage.editPlanCode(editedPlanCode);
    console.log(`✓ Edited Plan Code: "${editedPlanCode}"`);
    
    await productPage.editPlanPrice(editedPrice);
    console.log(`✓ Edited Price: "${editedPrice}"`);
    
    await productPage.editPlanDescription(editedPlanDescription);
    console.log(`✓ Edited Plan Description: "${editedPlanDescription}"`);

    // Step 8: Submit
    console.log('\n[STEP 8] Submitting Update Plan form...');
    await productPage.submitUpdatePlanForm();
    console.log('✓ Form submitted');

    // Step 9: Navigate to product details page (should still be there)
    console.log('\n[STEP 9] Verifying still on Product Details page...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage2 = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage2).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Step 10: Check in table
    console.log('\n[STEP 10] Verifying edited plan in table...');
    await page.waitForTimeout(2000);
    const editedPlanFound = await productPage.verifyPlanInTable(editedPlanName);
    expect(editedPlanFound).toBeTruthy();
    console.log(`✓ Edited plan "${editedPlanName}" found in plan table`);

    // Verify original plan name is not in table
    const originalPlanFound = await productPage.verifyPlanInTable(testPlanName);
    expect(originalPlanFound).toBeFalsy();
    console.log(`✓ Original plan "${testPlanName}" is not in table (correctly replaced)`);

    // Step 11: Go to action column and click delete icon
    console.log('\n[STEP 11] Clicking delete icon in plan table action column...');
    await productPage.clickPlanDeleteIcon();
    console.log('✓ Clicked delete icon');

    // Step 12: Delete plan modal opens
    console.log('\n[STEP 12] Verifying Delete Plan modal is open...');
    await page.waitForTimeout(1000);
    const isDeletePlanModalOpen = await productPage.isDeletePlanModalOpen();
    expect(isDeletePlanModalOpen).toBeTruthy();
    console.log('✓ Delete Plan modal is open');

    // Step 13: Click yes
    console.log('\n[STEP 13] Clicking Yes to confirm deletion...');
    await productPage.confirmDeletePlan();
    console.log('✓ Clicked Yes to delete');

    // Step 14: Navigate to product details page (should still be there)
    console.log('\n[STEP 14] Verifying still on Product Details page...');
    await page.waitForTimeout(2000);
    const isStillOnDetailsPage3 = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage3).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Step 15: Check plan deleted - not visible in table
    console.log('\n[STEP 15] Verifying plan is deleted from table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(2000);
    console.log('✓ Page refreshed');

    const deletedPlanFound = await productPage.verifyPlanInTable(editedPlanName);
    expect(deletedPlanFound).toBeFalsy();
    console.log(`✓ Plan "${editedPlanName}" is not visible in table (deleted successfully)`);

    // Verify plan table is empty or has no matching plans
    const planTableRows = await productPage.planTableRows.count();
    console.log(`✓ Plan table has ${planTableRows} row(s) after deletion`);

    // Step 16: Click update (on product details page)
    console.log('\n[STEP 16] Clicking Update button on Product Details page...');
    await productPage.clickProductDetailsUpdateButton();
    console.log('✓ Clicked Update button');

    // Step 17: Navigated to product page
    console.log('\n[STEP 17] Verifying navigation to Product page...');
    await page.waitForTimeout(3000);
    const isProductPageLoaded = await productPage.isPageLoaded();
    expect(isProductPageLoaded).toBeTruthy();
    console.log('✓ Navigated to Product page');

    await page.screenshot({ path: 'artifacts/product-edit-delete-plan.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== ADD ADD-ON TEST ====================

  test('to verify add-on not created without plan', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    console.log('\n=== Test: Verify Add-on NOT Created Without Plan ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;
    const testAddonName = `TestAddon${timestamp}`;
    const testAddonCode = `ADDON${timestamp}`;
    const testAddonDescription = `Test Addon Description ${timestamp}`;
    const testPrice = '50';
    const testPriceInterval = '1';

    // Step 1: First add product
    console.log('[STEP 1] Adding a new product...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    await productPage.clickAddProductButton();
    await page.waitForTimeout(2000);
    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    await productPage.fillFullName(testProductName);
    await productPage.fillDescription(testDescription);
    await productPage.submitAddProductForm();
    console.log('✓ Product added');

    // Step 2: Navigate to product details page (happens automatically)
    console.log('\n[STEP 2] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Step 3: Now click add add-on - modal opens
    console.log('\n[STEP 3] Clicking Add Add-on button...');
    await productPage.clickAddAddonButton();
    await page.waitForTimeout(2000);
    const isAddAddonModalOpen = await productPage.isAddAddonModalOpen();
    expect(isAddAddonModalOpen).toBeTruthy();
    console.log('✓ Add Addon modal is open');

    // Step 4: Click submit - check required fields
    console.log('\n[STEP 4] Clicking Submit to check required fields validation...');
    await productPage.clickAddAddonSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await productPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s)):`);
      errors.forEach(error => console.log(`  - ${error}`));
    } else {
      console.log('⚠ No validation errors found (this may indicate an issue)');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 5: Enter add-on name, add-on code, description, price, price interval
    console.log('\n[STEP 5] Filling add-on form fields...');
    await productPage.fillAddonName(testAddonName);
    console.log(`✓ Filled Add-on Name: "${testAddonName}"`);
    
    await productPage.fillAddonCode(testAddonCode);
    console.log(`✓ Filled Add-on Code: "${testAddonCode}"`);
    
    await productPage.fillAddonDescription(testAddonDescription);
    console.log(`✓ Filled Description: "${testAddonDescription}"`);
    
    await productPage.fillAddonPrice(testPrice);
    console.log(`✓ Filled Price: "${testPrice}"`);
    
    await productPage.fillAddonPriceInterval(testPriceInterval);
    console.log(`✓ Filled Price Interval: "${testPriceInterval}"`);

    // Step 6: Select option from unit dropdown, select pricing every from dropdown
    console.log('\n[STEP 6] Selecting dropdown values...');
    await productPage.selectAddonUnit('GB');
    console.log('✓ Selected Unit: GB');
    
    await productPage.selectAddonPricingEvery('Month(s)');
    console.log('✓ Selected Pricing Every: Month(s)');

    // Step 7: Select one add-on type radio button
    console.log('\n[STEP 7] Selecting Add-on Type...');
    await productPage.selectAddonType('oneTime');
    console.log('✓ Selected Add-on Type: One Time');

    // Step 8: Click submit
    console.log('\n[STEP 8] Submitting Add Addon form...');
    
    // Check for validation errors before submitting
    await page.waitForTimeout(500);
    const errorsBeforeSubmit = await productPage.getAllValidationErrors();
    if (errorsBeforeSubmit.length > 0) {
      console.log(`  ⚠ Validation errors present before submit (${errorsBeforeSubmit.length} error(s)):`);
      errorsBeforeSubmit.forEach(error => console.log(`    - ${error}`));
    }
    
    await productPage.submitAddAddonForm();
    console.log('✓ Form submitted');
    
    // Check for validation errors after submitting
    await page.waitForTimeout(1000);
    const errorsAfterSubmit = await productPage.getAllValidationErrors();
    if (errorsAfterSubmit.length > 0) {
      console.log(`  ⚠ Validation errors present after submit (${errorsAfterSubmit.length} error(s)):`);
      errorsAfterSubmit.forEach(error => console.log(`    - ${error}`));
    }
    
    // Check if modal is still open (indicates form didn't submit successfully)
    const isModalStillOpen = await productPage.isAddAddonModalOpen();
    if (isModalStillOpen) {
      console.log('  ⚠ Add Addon modal is still open - form may not have submitted successfully');
      console.log('  This is expected if add-ons cannot be created without a plan first');
      } else {
      console.log('  ✓ Add Addon modal closed - form submitted');
    }

    // Step 9: Navigated to product details page (should still be there)
    console.log('\n[STEP 9] Verifying still on Product Details page...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Step 10: Go to add-on card or table and check add-on in table
    console.log('\n[STEP 10] Verifying add-on in table...');
    await page.waitForTimeout(2000);
    
    // Debug: Check how many tables exist on the page
    const allTables = await page.locator('table.mat-mdc-table').count();
    console.log(`  Debug: Found ${allTables} table(s) on the page`);
    
    // Debug: Check add-on table specifically
    const addonTableExists = await productPage.addonTable.isVisible().catch(() => false);
    console.log(`  Debug: Add-on table visible: ${addonTableExists}`);
    
    const addonTableRowCount = await productPage.addonTableRows.count();
    console.log(`  Debug: Add-on table has ${addonTableRowCount} row(s)`);
    
    // If there are rows, log the first few add-on names
    if (addonTableRowCount > 0) {
      for (let i = 0; i < Math.min(addonTableRowCount, 3); i++) {
        const row = productPage.addonTableRows.nth(i);
        const nameCell = row.locator('td.mat-column-Name').first();
        const nameText = await nameCell.textContent().catch(() => 'N/A');
        console.log(`  Debug: Row ${i + 1} add-on name: "${nameText?.trim()}"`);
      }
    }
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    // Re-check after refresh
    const addonTableRowCountAfterRefresh = await productPage.addonTableRows.count();
    console.log(`  Debug: Add-on table has ${addonTableRowCountAfterRefresh} row(s) after refresh`);
    
    const addonFound = await productPage.verifyAddonInTable(testAddonName);
    
    // Based on test name "to verify add-on not created without plan", 
    // we expect the add-on NOT to be created (since no plan was added first)
    expect(addonFound).toBeFalsy();
    console.log(`✓ Add-on "${testAddonName}" is NOT in add-on table (expected - add-on should not be created without a plan)`);

    // Step 11: Click update button
    console.log('\n[STEP 11] Clicking Update button on Product Details page...');
    await productPage.clickProductDetailsUpdateButton();
    console.log('✓ Clicked Update button');

    // Step 12: Navigated to product page
    console.log('\n[STEP 12] Verifying navigation to Product page...');
    await page.waitForTimeout(3000);
    const isProductPageLoaded = await productPage.isPageLoaded();
    expect(isProductPageLoaded).toBeTruthy();
    console.log('✓ Navigated to Product page');

    await page.screenshot({ path: 'artifacts/product-add-addon.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  
  // ==================== ADD ADD-ON WITH PLAN TEST ====================

  test('should verify add add-on flow with plan', async ({ page }, testInfo) => {
    test.setTimeout(240000);
    console.log('\n=== Test: Verify Add Add-on Flow With Plan ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;
    const testPlanName = `TestPlan${timestamp}`;
    const testPlanCode = `PLAN${timestamp}`;
    const testPlanPrice = '100';
    const testPlanDescription = `Test Plan Description ${timestamp}`;
    const testPlanBillEvery = '1';
    const testAddonName = `TestAddon${timestamp}`;
    const testAddonCode = `ADDON${timestamp}`;
    const testAddonDescription = `Test Addon Description ${timestamp}`;
    const testAddonPrice = '50';
    const testAddonPriceInterval = '1';

    // Step 1: First add product
    console.log('[STEP 1] Adding a new product...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    await productPage.clickAddProductButton();
    await page.waitForTimeout(2000);
    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    await productPage.fillFullName(testProductName);
    await productPage.fillDescription(testDescription);
    await productPage.submitAddProductForm();
    console.log('✓ Product added');

    // Step 2: Navigate to product details page (happens automatically)
    console.log('\n[STEP 2] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Step 3: Now create plan
    console.log('\n[STEP 3] Adding a plan...');
    await productPage.clickAddPlanButton();
    await page.waitForTimeout(2000);
    const isAddPlanModalOpen = await productPage.isAddPlanModalOpen();
    expect(isAddPlanModalOpen).toBeTruthy();
    console.log('✓ Add Plan modal is open');

    await productPage.fillPlanName(testPlanName);
    await productPage.fillPlanCode(testPlanCode);
    await productPage.fillPlanPrice(testPlanPrice);
    await productPage.fillPlanDescription(testPlanDescription);
    await productPage.selectPlanUnit('GB');
    await productPage.selectPlanBillingCycle('Month(s)');
    await productPage.fillPlanBillEvery(testPlanBillEvery);
    console.log('✓ Filled all plan fields');

    await productPage.submitAddPlanForm();
    console.log('✓ Plan submitted');

    // Step 4: Check plan created
    console.log('\n[STEP 4] Verifying plan is created...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Verify plan is in table
    const planFound = await productPage.verifyPlanInTable(testPlanName);
    expect(planFound).toBeTruthy();
    console.log(`✓ Plan "${testPlanName}" found in plan table`);

    // Step 5: Now click add add-on - modal opens
    console.log('\n[STEP 5] Clicking Add Add-on button...');
    await productPage.clickAddAddonButton();
    await page.waitForTimeout(2000);
    const isAddAddonModalOpen = await productPage.isAddAddonModalOpen();
    expect(isAddAddonModalOpen).toBeTruthy();
    console.log('✓ Add Addon modal is open');

    // Step 6: Click submit - check required fields
    console.log('\n[STEP 6] Clicking Submit to check required fields validation...');
    await productPage.clickAddAddonSubmitButton();
    await page.waitForTimeout(2000);
    
    const errors = await productPage.getAllValidationErrors();
    if (errors.length > 0) {
      console.log(`✓ Validation errors displayed (${errors.length} error(s)):`);
      errors.forEach(error => console.log(`  - ${error}`));
    } else {
      console.log('⚠ No validation errors found (this may indicate an issue)');
    }
    expect(errors.length).toBeGreaterThan(0);
    console.log('✓ Required fields validation is working');

    // Step 7: Enter add-on name, add-on code, description, price, price interval
    console.log('\n[STEP 7] Filling add-on form fields...');
    await productPage.fillAddonName(testAddonName);
    console.log(`✓ Filled Add-on Name: "${testAddonName}"`);
    
    await productPage.fillAddonCode(testAddonCode);
    console.log(`✓ Filled Add-on Code: "${testAddonCode}"`);
    
    await productPage.fillAddonDescription(testAddonDescription);
    console.log(`✓ Filled Description: "${testAddonDescription}"`);
    
    await productPage.fillAddonPrice(testAddonPrice);
    console.log(`✓ Filled Price: "${testAddonPrice}"`);
    
    await productPage.fillAddonPriceInterval(testAddonPriceInterval);
    console.log(`✓ Filled Price Interval: "${testAddonPriceInterval}"`);

    // Step 8: Select option from unit dropdown, select pricing every from dropdown
    console.log('\n[STEP 8] Selecting dropdown values...');
    await productPage.selectAddonUnit('GB');
    console.log('✓ Selected Unit: GB');
    
    await productPage.selectAddonPricingEvery('Month(s)');
    console.log('✓ Selected Pricing Every: Month(s)');

    // Step 9: Select one add-on type radio button
    console.log('\n[STEP 9] Selecting Add-on Type...');
    await productPage.selectAddonType('oneTime');
    console.log('✓ Selected Add-on Type: One Time');

    // Step 10: Click submit
    console.log('\n[STEP 10] Submitting Add Addon form...');
    await productPage.submitAddAddonForm();
    console.log('✓ Form submitted');

    // Step 11: Navigated to product details page (should still be there)
    console.log('\n[STEP 11] Verifying still on Product Details page...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage2 = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage2).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Step 12: Go to add-on card or table and check add-on in table
    console.log('\n[STEP 12] Verifying add-on in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const addonFound = await productPage.verifyAddonInTable(testAddonName);
    expect(addonFound).toBeTruthy();
    console.log(`✓ Add-on "${testAddonName}" found in add-on table`);

    // Step 13: Click update button
    console.log('\n[STEP 13] Clicking Update button on Product Details page...');
    await productPage.clickProductDetailsUpdateButton();
    console.log('✓ Clicked Update button');

    // Step 14: Navigated to product page
    console.log('\n[STEP 14] Verifying navigation to Product page...');
    await page.waitForTimeout(3000);
    const isProductPageLoaded = await productPage.isPageLoaded();
    expect(isProductPageLoaded).toBeTruthy();
    console.log('✓ Navigated to Product page');

    await page.screenshot({ path: 'artifacts/product-add-addon-with-plan.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });

  // ==================== EDIT AND DELETE ADDON TEST ====================

  test('should verify edit addon and delete addon flow', async ({ page }, testInfo) => {
    test.setTimeout(300000);
    console.log('\n=== Test: Verify Edit Addon and Delete Addon Flow ===');
    
    const productPage = new ProductPage(page);
    
    // Generate unique test data with timestamp
    const timestamp = Date.now();
    const testProductName = `TestProduct${timestamp}`;
    const testDescription = `Test Description for Product ${timestamp}`;
    const testPlanName = `TestPlan${timestamp}`;
    const testPlanCode = `PLAN${timestamp}`;
    const testPlanPrice = '100';
    const testPlanDescription = `Test Plan Description ${timestamp}`;
    const testPlanBillEvery = '1';
    const testAddonName = `TestAddon${timestamp}`;
    const testAddonCode = `ADDON${timestamp}`;
    const testAddonDescription = `Test Addon Description ${timestamp}`;
    const testAddonPrice = '50';
    const testAddonPriceInterval = '1';
    
    const editedAddonName = `EditedAddon${timestamp}`;
    const editedAddonCode = `EDITED${timestamp}`;
    const editedAddonDescription = `Edited Addon Description ${timestamp}`;
    const editedAddonPrice = '75';
    const editedAddonPriceInterval = '2';

    // Step 1: First add product
    console.log('[STEP 1] Adding a new product...');
    await productPage.gotoProduct(baseUrl);
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Product page');

    await productPage.clickAddProductButton();
    await page.waitForTimeout(2000);
    const isModalOpen = await productPage.isAddProductModalOpen();
    expect(isModalOpen).toBeTruthy();
    console.log('✓ Add New Product modal is open');

    await productPage.fillFullName(testProductName);
    await productPage.fillDescription(testDescription);
    await productPage.submitAddProductForm();
    console.log('✓ Product added');

    // Step 2: Navigate to product details page (happens automatically)
    console.log('\n[STEP 2] Waiting for navigation to Product Details page...');
    await page.waitForTimeout(3000);
    const isDetailsPageLoaded = await productPage.isProductDetailsPageLoaded();
    expect(isDetailsPageLoaded).toBeTruthy();
    console.log('✓ Product Details page is loaded');

    // Step 3: First add plan
    console.log('\n[STEP 3] Adding a plan...');
    await productPage.clickAddPlanButton();
    await page.waitForTimeout(2000);
    const isAddPlanModalOpen = await productPage.isAddPlanModalOpen();
    expect(isAddPlanModalOpen).toBeTruthy();
    console.log('✓ Add Plan modal is open');

    await productPage.fillPlanName(testPlanName);
    await productPage.fillPlanCode(testPlanCode);
    await productPage.fillPlanPrice(testPlanPrice);
    await productPage.fillPlanDescription(testPlanDescription);
    await productPage.selectPlanUnit('GB');
    await productPage.selectPlanBillingCycle('Month(s)');
    await productPage.fillPlanBillEvery(testPlanBillEvery);
    console.log('✓ Filled all plan fields');

    await productPage.submitAddPlanForm();
    console.log('✓ Plan submitted');

    // Verify plan is created
    await page.waitForTimeout(3000);
    const planFound = await productPage.verifyPlanInTable(testPlanName);
    expect(planFound).toBeTruthy();
    console.log(`✓ Plan "${testPlanName}" found in plan table`);

    // Step 4: Now add add-on
    console.log('\n[STEP 4] Adding an add-on...');
    await productPage.clickAddAddonButton();
    await page.waitForTimeout(2000);
    const isAddAddonModalOpen = await productPage.isAddAddonModalOpen();
    expect(isAddAddonModalOpen).toBeTruthy();
    console.log('✓ Add Addon modal is open');

    await productPage.fillAddonName(testAddonName);
    await productPage.fillAddonCode(testAddonCode);
    await productPage.fillAddonDescription(testAddonDescription);
    await productPage.fillAddonPrice(testAddonPrice);
    await productPage.fillAddonPriceInterval(testAddonPriceInterval);
    await productPage.selectAddonUnit('GB');
    await productPage.selectAddonPricingEvery('Month(s)');
    await productPage.selectAddonType('oneTime');
    console.log('✓ Filled all add-on fields');

    await productPage.submitAddAddonForm();
    console.log('✓ Add-on submitted');

    // Step 5: Navigate to product details page (should still be there)
    console.log('\n[STEP 5] Verifying still on Product Details page...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Verify add-on is in table
    const addonFound = await productPage.verifyAddonInTable(testAddonName);
    expect(addonFound).toBeTruthy();
    console.log(`✓ Add-on "${testAddonName}" found in add-on table`);

    // Step 6: Go to action column and click edit icon - modal opens
    console.log('\n[STEP 6] Clicking edit icon in add-on table action column...');
    await productPage.clickAddonEditIcon();
    console.log('✓ Clicked edit icon');

    // Step 7: Verify Update Addon modal opens
    console.log('\n[STEP 7] Verifying Update Addon modal is open...');
    await page.waitForTimeout(2000);
    const isUpdateAddonModalOpen = await productPage.isUpdateAddonModalOpen();
    expect(isUpdateAddonModalOpen).toBeTruthy();
    console.log('✓ Update Addon modal is open');

    // Step 8: Edit fields
    console.log('\n[STEP 8] Editing add-on fields...');
    await productPage.editAddonName(editedAddonName);
    console.log(`✓ Edited Add-on Name: "${editedAddonName}"`);
    
    await productPage.editAddonCode(editedAddonCode);
    console.log(`✓ Edited Add-on Code: "${editedAddonCode}"`);
    
    await productPage.editAddonDescription(editedAddonDescription);
    console.log(`✓ Edited Description: "${editedAddonDescription}"`);
    
    await productPage.editAddonPrice(editedAddonPrice);
    console.log(`✓ Edited Price: "${editedAddonPrice}"`);
    
    await productPage.editAddonPriceInterval(editedAddonPriceInterval);
    console.log(`✓ Edited Price Interval: "${editedAddonPriceInterval}"`);

    // Step 9: Submit
    console.log('\n[STEP 9] Submitting Update Addon form...');
    await productPage.submitUpdateAddonForm();
    console.log('✓ Form submitted');

    // Step 10: Navigate to product details page (should still be there)
    console.log('\n[STEP 10] Verifying still on Product Details page...');
    await page.waitForTimeout(3000);
    const isStillOnDetailsPage2 = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage2).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Step 11: Check in table
    console.log('\n[STEP 11] Verifying edited add-on in table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');
    
    const editedAddonFound = await productPage.verifyAddonInTable(editedAddonName);
    expect(editedAddonFound).toBeTruthy();
    console.log(`✓ Edited add-on "${editedAddonName}" found in add-on table`);

    // Verify original add-on name is not in table
    const originalAddonFound = await productPage.verifyAddonInTable(testAddonName);
    expect(originalAddonFound).toBeFalsy();
    console.log(`✓ Original add-on "${testAddonName}" is not in table (correctly replaced)`);

    // Step 12: Go to action column and click delete icon
    console.log('\n[STEP 12] Clicking delete icon in add-on table action column...');
    await productPage.clickAddonDeleteIcon();
    console.log('✓ Clicked delete icon');

    // Step 13: Delete addon modal opens
    console.log('\n[STEP 13] Verifying Delete Addon modal is open...');
    await page.waitForTimeout(1000);
    const isDeleteAddonModalOpen = await productPage.isDeleteAddonModalOpen();
    expect(isDeleteAddonModalOpen).toBeTruthy();
    console.log('✓ Delete Addon modal is open');

    // Step 14: Click yes
    console.log('\n[STEP 14] Clicking Yes to confirm deletion...');
    await productPage.confirmDeleteAddon();
    console.log('✓ Clicked Yes to delete');

    // Step 15: Navigate to product details page (should still be there)
    console.log('\n[STEP 15] Verifying still on Product Details page...');
    await page.waitForTimeout(2000);
    const isStillOnDetailsPage3 = await productPage.isProductDetailsPageLoaded();
    expect(isStillOnDetailsPage3).toBeTruthy();
    console.log('✓ Still on Product Details page');

    // Step 16: Check add-on deleted - not visible in table
    console.log('\n[STEP 16] Verifying add-on is deleted from table...');
    await page.waitForTimeout(2000);
    
    // Refresh page to ensure table is updated
    await page.reload();
    await page.waitForTimeout(3000);
    console.log('✓ Page refreshed');

    const deletedAddonFound = await productPage.verifyAddonInTable(editedAddonName);
    expect(deletedAddonFound).toBeFalsy();
    console.log(`✓ Add-on "${editedAddonName}" is not visible in table (deleted successfully)`);

    // Verify add-on table is empty or has no matching add-ons
    const addonTableRows = await productPage.addonTableRows.count();
    console.log(`✓ Add-on table has ${addonTableRows} row(s) after deletion`);

    // Step 17: Click update (on product details page)
    console.log('\n[STEP 17] Clicking Update button on Product Details page...');
    await productPage.clickProductDetailsUpdateButton();
    console.log('✓ Clicked Update button');

    // Step 18: Navigated to product page
    console.log('\n[STEP 18] Verifying navigation to Product page...');
    await page.waitForTimeout(3000);
    const isProductPageLoaded = await productPage.isPageLoaded();
    expect(isProductPageLoaded).toBeTruthy();
    console.log('✓ Navigated to Product page');

    await page.screenshot({ path: 'artifacts/product-edit-delete-addon.png', fullPage: true });
    console.log('\n✓ Test completed successfully');
  });
});

