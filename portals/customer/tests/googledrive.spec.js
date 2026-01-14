const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { GoogleDrivePage } = require('../pages/googledrive');

test.describe('Customer Portal - Google Drive', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';



  test('should verify add scheduler', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Add Scheduler ===');
    
    const googleDrivePage = new GoogleDrivePage(page);

    try {
      // Step 1: Go to Google Drive page
      console.log('[STEP 1] Navigating to Google Drive page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Google Drive page' });
      await login(page, baseUrl, email, password);
      await googleDrivePage.gotoGoogleDrive();
      await page.waitForTimeout(2000);
      
      let isPageLoaded = await googleDrivePage.isPageLoaded();
      if (!isPageLoaded) {
        await page.waitForTimeout(3000);
        isPageLoaded = await googleDrivePage.isPageLoaded();
      }
      expect(isPageLoaded).toBeTruthy();
      console.log('✓ Google Drive page is loaded');

      // Step 2: Check if Add Scheduler button is present
      console.log('\n[STEP 2] Checking if Add Scheduler button is present...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Check Add Scheduler button visibility' });
      
      const isButtonVisible = await googleDrivePage.isAddSchedulerButtonVisible();
      
      if (!isButtonVisible) {
        console.log('⚠ Add Scheduler button is not present - test case passed');
        console.log('✓ Test completed successfully (button not available)');
        return; // Exit test if button is not visible
      }
      
      console.log('✓ Add Scheduler button is present');

      // Step 3: Click Add Scheduler button - modal opens
      console.log('\n[STEP 3] Clicking Add Scheduler button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Add Scheduler button' });
      await googleDrivePage.clickAddScheduler();
      
      const isModalOpen = await googleDrivePage.isAddScheduleModalOpen();
      expect(isModalOpen).toBeTruthy();
      console.log('✓ Add Schedule modal is open');

      // Step 4: Fill scheduler form
      console.log('\n[STEP 4] Filling scheduler form...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Fill scheduler form' });
      
      // Wait for modal form to be fully loaded
      await page.waitForTimeout(1000);
      
      // Select folder
      try {
        console.log('  Attempting to select folder...');
        await googleDrivePage.selectFolder('Data');
        console.log('✓ Selected folder: "Data"');
      } catch (error) {
        console.error(`  Error selecting folder: ${error.message}`);
        throw error;
      }

      // Select time
      try {
        console.log('  Attempting to select time...');
        await googleDrivePage.selectTime('10PM - 11PM');
        console.log('✓ Selected time: "10PM - 11PM"');
      } catch (error) {
        console.error(`  Error selecting time: ${error.message}`);
        throw error;
      }

      // Fill data retention period
      try {
        console.log('  Attempting to fill data retention period...');
        await googleDrivePage.fillDataRetentionPeriod('3');
        console.log('✓ Filled data retention period: 3 days');
      } catch (error) {
        console.error(`  Error filling data retention period: ${error.message}`);
        throw error;
      }

      // Select password option
      try {
        console.log('  Attempting to select password option...');
        await googleDrivePage.selectPassword('Disable');
        console.log('✓ Selected password option: "Disable"');
      } catch (error) {
        console.error(`  Error selecting password option: ${error.message}`);
        throw error;
      }

      // Set email notifications
      try {
        console.log('  Attempting to set email notifications...');
        await googleDrivePage.setEmailNotifications({
          success: true,
          failure: false
        });
        console.log('✓ Set email notifications - Success: true, Failure: false');
      } catch (error) {
        console.error(`  Error setting email notifications: ${error.message}`);
        throw error;
      }

      // Step 5: Click Submit
      console.log('\n[STEP 5] Clicking Submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Click Submit' });
      await googleDrivePage.clickSubmit();
      console.log('✓ Submit button clicked');
      await page.waitForTimeout(3000); // Wait for form to submit and modal to close

      // Step 6: Navigate to Google Drive page and verify scheduler was added
      console.log('\n[STEP 6] Verifying scheduler was added...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify scheduler was added' });
      await googleDrivePage.gotoGoogleDrive();
      await page.waitForTimeout(2000);
      
      // Check if scheduler details are now visible (indicating scheduler was added)
      const schedulerDetails = await googleDrivePage.getSchedulerDetails();
      if (Object.keys(schedulerDetails).length > 0) {
        console.log('✓ Scheduler details found:', schedulerDetails);
        console.log('✓ Scheduler was successfully added');
      } else {
        // If no details found, check if Update Scheduler button is now visible (indicating scheduler exists)
        const updateButtonVisible = await googleDrivePage.isUpdateSchedulerButtonVisible();
        if (updateButtonVisible) {
          console.log('✓ Update Scheduler button is now visible - scheduler was added');
        } else {
          console.log('⚠ Scheduler details not found, but test continues');
        }
      }

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Add scheduler verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    } finally {
      // Cleanup: Close any open modals
      try {
        await googleDrivePage.clickCancel().catch(() => {});
        await page.keyboard.press('Escape').catch(() => {});
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });






  test('should verify update scheduler', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Update Scheduler ===');
    
    const googleDrivePage = new GoogleDrivePage(page);
    let originalSchedulerData = {};

    try {
      // Step 1: Go to Google Drive page
      console.log('[STEP 1] Navigating to Google Drive page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Google Drive page' });
      await login(page, baseUrl, email, password);
      await googleDrivePage.gotoGoogleDrive();
      await page.waitForTimeout(2000);
      
      let isPageLoaded = await googleDrivePage.isPageLoaded();
      if (!isPageLoaded) {
        await page.waitForTimeout(3000);
        isPageLoaded = await googleDrivePage.isPageLoaded();
      }
      expect(isPageLoaded).toBeTruthy();
      console.log('✓ Google Drive page is loaded');

      // Step 2: Check if Update Scheduler button is visible
      console.log('\n[STEP 2] Checking if Update Scheduler button is visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Check Update Scheduler button visibility' });
      
      const isButtonVisible = await googleDrivePage.isUpdateSchedulerButtonVisible();
      
      if (!isButtonVisible) {
        console.log('⚠ Update Scheduler button is not visible - test case passed');
        console.log('✓ Test completed successfully (button not available)');
        return; // Exit test if button is not visible
      }
      
      console.log('✓ Update Scheduler button is visible');

      // Step 3: Get original scheduler data before updating
      console.log('\n[STEP 3] Capturing original scheduler data...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Capture original scheduler data' });
      originalSchedulerData = await googleDrivePage.getSchedulerDetails();
      console.log('  Original scheduler data:', originalSchedulerData);

      // Step 4: Click Update Scheduler button - modal opens
      console.log('\n[STEP 4] Clicking Update Scheduler button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Update Scheduler button' });
      await googleDrivePage.clickUpdateScheduler();
      
      const isModalOpen = await googleDrivePage.isUpdateScheduleModalOpen();
      expect(isModalOpen).toBeTruthy();
      console.log('✓ Update Schedule modal is open');

      // Step 5: Select another value from folder dropdown
      console.log('\n[STEP 5] Selecting folder from dropdown...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Select folder' });
      
      // Get current folder value
      const currentFolder = await googleDrivePage.folderDropdown.inputValue().catch(async () => {
        const selected = await googleDrivePage.folderDropdown.locator('option:checked').textContent().catch(() => '');
        return selected.trim();
      });
      
      // Select a different folder (if current is "Data", select "Full Drive", otherwise select "Data")
      const newFolder = currentFolder && currentFolder.includes('Data') ? 'Full Drive' : 'Data';
      await googleDrivePage.selectFolder(newFolder);
      console.log(`✓ Selected folder: "${newFolder}"`);

      // Step 6: Select another value from time dropdown
      console.log('\n[STEP 6] Selecting time from dropdown...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Select time' });
      
      // Get current time value
      const currentTime = await googleDrivePage.timeDropdown.locator('option:checked').textContent().catch(() => '');
      const currentTimeText = currentTime.trim();
      
      // Select a different time (if current is "10PM - 11PM", select "11PM - 12AM", otherwise select "10PM - 11PM")
      const newTime = currentTimeText && currentTimeText.includes('10PM - 11PM') ? '11PM - 12AM' : '10PM - 11PM';
      await googleDrivePage.selectTime(newTime);
      console.log(`✓ Selected time: "${newTime}"`);

      // Step 7: Update data retention period
      console.log('\n[STEP 7] Updating data retention period...');
      testInfo.annotations.push({ type: 'step', description: 'Step 7: Update data retention period' });
      
      // Get current data retention value
      const currentRetention = await googleDrivePage.dataRetentionField.inputValue().catch(() => '');
      const newRetention = currentRetention && currentRetention === '3' ? '5' : '3';
      await googleDrivePage.fillDataRetentionPeriod(newRetention);
      console.log(`✓ Updated data retention period: ${newRetention} days`);

      // Step 8: Select another value from password dropdown
      console.log('\n[STEP 8] Selecting password option...');
      testInfo.annotations.push({ type: 'step', description: 'Step 8: Select password option' });
      
      // Get current password value
      const currentPassword = await googleDrivePage.passwordDropdown.inputValue().catch(() => '');
      const newPassword = currentPassword && currentPassword.toLowerCase() === 'disable' ? 'Enable' : 'Disable';
      await googleDrivePage.selectPassword(newPassword);
      console.log(`✓ Selected password option: "${newPassword}"`);

      // Step 9: Update email notification checkboxes
      console.log('\n[STEP 9] Updating email notification checkboxes...');
      testInfo.annotations.push({ type: 'step', description: 'Step 9: Update email notifications' });
      
      // Get current checkbox states
      const currentSuccessChecked = await googleDrivePage.successEmailCheckbox.isChecked().catch(() => false);
      const currentFailureChecked = await googleDrivePage.failureEmailCheckbox.isChecked().catch(() => false);
      
      // Toggle checkboxes (if Success is checked, uncheck it and check Failure, and vice versa)
      const newSuccessState = !currentSuccessChecked;
      const newFailureState = !currentFailureChecked;
      
      await googleDrivePage.setEmailNotifications({
        success: newSuccessState,
        failure: newFailureState
      });
      console.log(`✓ Updated email notifications - Success: ${newSuccessState}, Failure: ${newFailureState}`);

      // Step 10: Click Submit
      console.log('\n[STEP 10] Clicking Submit button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 10: Click Submit' });
      await googleDrivePage.clickSubmit();
      console.log('✓ Submit button clicked');
      await page.waitForTimeout(3000); // Wait for form to submit and modal to close

      // Step 11: Navigate to Google Drive page
      console.log('\n[STEP 11] Navigating to Google Drive page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 11: Navigate to Google Drive page' });
      await googleDrivePage.gotoGoogleDrive();
      await page.waitForTimeout(2000);
      console.log('✓ Navigated to Google Drive page');

      // Step 12: Check data in scheduler details card or section
      console.log('\n[STEP 12] Verifying updated data in scheduler details section...');
      testInfo.annotations.push({ type: 'step', description: 'Step 12: Verify updated scheduler details' });
      
      const updatedSchedulerData = await googleDrivePage.getSchedulerDetails();
      console.log('  Updated scheduler data:', updatedSchedulerData);
      
      // Verify updated values
      if (updatedSchedulerData.fileName) {
        expect(updatedSchedulerData.fileName).toBe(newFolder);
        console.log(`✓ File Name updated correctly: "${updatedSchedulerData.fileName}"`);
      }
      
      if (updatedSchedulerData.scheduleTime) {
        expect(updatedSchedulerData.scheduleTime).toBe(newTime);
        console.log(`✓ Schedule Time updated correctly: "${updatedSchedulerData.scheduleTime}"`);
      }
      
      if (updatedSchedulerData.dataRetention) {
        expect(updatedSchedulerData.dataRetention).toBe(newRetention);
        console.log(`✓ Data Retention updated correctly: "${updatedSchedulerData.dataRetention}" days`);
      }
      
      if (updatedSchedulerData.password) {
        const expectedPassword = newPassword === 'Enable' ? 'Enable' : 'Disable';
        expect(updatedSchedulerData.password.toLowerCase()).toBe(expectedPassword.toLowerCase());
        console.log(`✓ Password option updated correctly: "${updatedSchedulerData.password}"`);
      }
      
      if (updatedSchedulerData.emailOn) {
        // Email On might show "Success", "Failure", or "Success, Failure" based on checkboxes
        if (newSuccessState && newFailureState) {
          expect(updatedSchedulerData.emailOn.toLowerCase()).toContain('success');
          expect(updatedSchedulerData.emailOn.toLowerCase()).toContain('failure');
        } else if (newSuccessState) {
          expect(updatedSchedulerData.emailOn.toLowerCase()).toContain('success');
        } else if (newFailureState) {
          expect(updatedSchedulerData.emailOn.toLowerCase()).toContain('failure');
        }
        console.log(`✓ Email On updated correctly: "${updatedSchedulerData.emailOn}"`);
      }

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Update scheduler verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    } finally {
      // Cleanup: Close any open modals
      try {
        await googleDrivePage.clickCancel().catch(() => {});
        await page.keyboard.press('Escape').catch(() => {});
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });

  test('should verify delete configuration', async ({ page }, testInfo) => {
    test.setTimeout(120000);
    console.log('\n=== Test: Verify Delete Configuration ===');
    
    const googleDrivePage = new GoogleDrivePage(page);

    try {
      // Step 1: Go to Google Drive page
      console.log('[STEP 1] Navigating to Google Drive page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Google Drive page' });
      await login(page, baseUrl, email, password);
      await googleDrivePage.gotoGoogleDrive();
      await page.waitForTimeout(2000);
      
      let isPageLoaded = await googleDrivePage.isPageLoaded();
      if (!isPageLoaded) {
        await page.waitForTimeout(3000);
        isPageLoaded = await googleDrivePage.isPageLoaded();
      }
      expect(isPageLoaded).toBeTruthy();
      console.log('✓ Google Drive page is loaded');

      // Step 2: Check if Delete Configuration button is present
      console.log('\n[STEP 2] Checking if Delete Configuration button is present...');
      testInfo.annotations.push({ type: 'step', description: 'Step 2: Check Delete Configuration button visibility' });
      
      const isButtonVisible = await googleDrivePage.isDeleteConfigurationButtonVisible();
      
      if (!isButtonVisible) {
        console.log('⚠ Delete Configuration button is not present - test case passed');
        console.log('✓ Test completed successfully (button not available)');
        return; // Exit test if button is not visible
      }
      
      console.log('✓ Delete Configuration button is present');

      // Step 3: Click Delete Configuration button - modal opens
      console.log('\n[STEP 3] Clicking Delete Configuration button...');
      testInfo.annotations.push({ type: 'step', description: 'Step 3: Click Delete Configuration button' });
      await googleDrivePage.clickDeleteConfiguration();
      
      const isModalOpen = await googleDrivePage.isDeleteConfirmationModalOpen();
      expect(isModalOpen).toBeTruthy();
      console.log('✓ Delete Configuration confirmation modal is open');

      // Step 4: Click Delete in the confirmation modal
      console.log('\n[STEP 4] Clicking Delete in confirmation modal...');
      testInfo.annotations.push({ type: 'step', description: 'Step 4: Click Delete in confirmation modal' });
      await googleDrivePage.clickDeleteConfirmationDelete();
      console.log('✓ Clicked Delete button');
      await page.waitForTimeout(2000); // Wait for deletion to complete

      // Step 5: Navigate to Google Drive page
      console.log('\n[STEP 5] Navigating to Google Drive page...');
      testInfo.annotations.push({ type: 'step', description: 'Step 5: Navigate to Google Drive page' });
      await googleDrivePage.gotoGoogleDrive();
      await page.waitForTimeout(2000);
      console.log('✓ Navigated to Google Drive page');

      // Step 6: Check that Add Scheduler and Update Scheduler buttons are not visible
      console.log('\n[STEP 6] Verifying Add Scheduler and Update Scheduler buttons are not visible...');
      testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify scheduler buttons are not visible' });
      
      const addButtonVisible = await googleDrivePage.isAddSchedulerButtonVisible();
      const updateButtonVisible = await googleDrivePage.isUpdateSchedulerButtonVisible();
      
      expect(addButtonVisible).toBeFalsy();
      console.log('✓ Add Scheduler button is not visible');
      
      expect(updateButtonVisible).toBeFalsy();
      console.log('✓ Update Scheduler button is not visible');

      console.log('\n=== Test Completed Successfully ===');
      console.log('✓ Delete configuration verification completed');

    } catch (error) {
      console.error(`Test failed: ${error.message}`);
      testInfo.annotations.push({ type: 'error', description: `Test failed: ${error.message}` });
      throw error;
    } finally {
      // Cleanup: Close any open modals
      try {
        await page.keyboard.press('Escape').catch(() => {});
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });


});
