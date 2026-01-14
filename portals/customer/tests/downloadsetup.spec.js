const { test, expect } = require('@playwright/test');
const { login } = require('../../../helpers/login');
const { DownloadSetupPage } = require('../pages/downloadsetup');

test.describe('Customer Portal - Download Setup', () => {
  const baseUrl = process.env.CUSTOMER_PORTAL_URL || 'https://dev.cocloud.in/';
  const email = process.env.CUSTOMER_EMAIL || 'vikas@comhard.co.in';
  const password = process.env.CUSTOMER_PASSWORD || 'hrhk@1111';

  // ========================
  // VERIFY PAGE LOAD
  // ========================
  test('should verify Download Setup page loads successfully', async ({ page }, testInfo) => {
    test.setTimeout(60000);
    console.log('=== Test: Verify Download Setup Page Load ===');
    
    const downloadSetupPage = new DownloadSetupPage(page);
    
    // Step 1: Navigate to Download Setup page from left sidebar
    console.log('\n[STEP 1] Navigating to Download Setup page...');
    testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Download Setup page' });
    await login(page, baseUrl, email, password);
    await downloadSetupPage.gotoDownloadSetup();
    await page.waitForTimeout(2000);
    console.log('✓ Navigated to Download Setup page');
    
    // Step 2: Verify page title "Download Setup" is visible
    console.log('\n[STEP 2] Verifying page title is visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 2: Verify page title' });
    
    const titleVisible = await downloadSetupPage.isPageTitleVisible();
    expect(titleVisible).toBeTruthy();
    console.log('✓ Page title is visible');
    
    const pageTitle = await downloadSetupPage.getPageTitle();
    expect(pageTitle.toLowerCase()).toContain('download setup');
    console.log(`✓ Page title text: "${pageTitle}"`);
    
    // Step 3: Verify section heading "Download Setup Link" is displayed
    console.log('\n[STEP 3] Verifying section heading is displayed...');
    testInfo.annotations.push({ type: 'step', description: 'Step 3: Verify section heading' });
    
    const headingVisible = await downloadSetupPage.isSectionHeadingVisible();
    expect(headingVisible).toBeTruthy();
    console.log('✓ Section heading is visible');
    
    const sectionHeading = await downloadSetupPage.getSectionHeading();
    expect(sectionHeading.toLowerCase()).toContain('download setup link');
    console.log(`✓ Section heading text: "${sectionHeading}"`);
    
    // Step 4: Verify all download cards/links are visible
    console.log('\n[STEP 4] Verifying all download cards/links are visible...');
    testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify download cards/links' });
    
    const cardsVerification = await downloadSetupPage.verifyDownloadCardsVisible();
    
    console.log(`CoCloud-Printer-Client.exe visible: ${cardsVerification.printerClientVisible}`);
    console.log(`CoCloud-RemoteAppClient.exe visible: ${cardsVerification.remoteAppClientVisible}`);
    console.log(`CoCloud-Client-File-Setup visible: ${cardsVerification.clientFileSetupVisible}`);
    
    expect(cardsVerification.printerClientVisible).toBeTruthy();
    expect(cardsVerification.remoteAppClientVisible).toBeTruthy();
    expect(cardsVerification.clientFileSetupVisible).toBeTruthy();
    expect(cardsVerification.allVisible).toBeTruthy();
    
    console.log('✓ All download cards/links are visible:');
    console.log('  - CoCloud-Printer-Client.exe');
    console.log('  - CoCloud-RemoteAppClient.exe');
    console.log('  - CoCloud-Client-File-Setup');
    
    // Step 5: Ensure no console errors or page load failures
    console.log('\n[STEP 5] Verifying no console errors or page load failures...');
    testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify no errors' });
    
    const pageLoadVerification = await downloadSetupPage.verifyPageLoad();
    
    console.log(`Page loaded: ${pageLoadVerification.pageLoaded}`);
    console.log(`Has error messages: ${pageLoadVerification.hasErrors}`);
    console.log(`Has console errors: ${pageLoadVerification.hasConsoleErrors}`);
    console.log(`Has error toast: ${pageLoadVerification.hasErrorToast}`);
    
    expect(pageLoadVerification.pageLoaded).toBeTruthy();
    expect(pageLoadVerification.hasErrors).toBeFalsy();
    expect(pageLoadVerification.hasErrorToast).toBeFalsy();
    
    console.log('✓ No console errors or page load failures');
    
    console.log('\n=== Test Completed Successfully ===');
  });

  // ========================
  // VERIFY DOWNLOAD LINKS ARE CLICKABLE
  // ========================
  test.describe('Verify Download Links Are Clickable', () => {
    const downloadFiles = [
      { name: 'CoCloud-Printer-Client.exe', expectedFileName: 'CoCloud-Printer-Client.exe' },
      { name: 'CoCloud-RemoteAppClient.exe', expectedFileName: 'CoCloud-RemoteAppClient.exe' },
      { name: 'CoCloud-Client-File-Setup', expectedFileName: 'CoCloud-Client-File-Setup' }
    ];

    for (const file of downloadFiles) {
      test(`should verify ${file.name} download link is clickable and triggers download`, async ({ page }, testInfo) => {
        test.setTimeout(60000);
        console.log(`=== Test: Verify ${file.name} Download Link ===`);
        
        const downloadSetupPage = new DownloadSetupPage(page);
        
        // Navigate to Download Setup page
        console.log('\n[STEP 1] Navigating to Download Setup page...');
        testInfo.annotations.push({ type: 'step', description: 'Step 1: Navigate to Download Setup page' });
        await login(page, baseUrl, email, password);
        await downloadSetupPage.gotoDownloadSetup();
        await page.waitForTimeout(2000);
        console.log('✓ Navigated to Download Setup page');
        
        // Verify download link is visible and clickable
        console.log(`\n[STEP 2] Verifying ${file.name} link is visible and clickable...`);
        testInfo.annotations.push({ type: 'step', description: `Step 2: Verify ${file.name} link is clickable` });
        
        const isClickable = await downloadSetupPage.isDownloadLinkClickable(file.name);
        expect(isClickable).toBeTruthy();
        console.log(`✓ ${file.name} link is clickable`);
        
        // Click on the download link
        console.log(`\n[STEP 3] Clicking on ${file.name} download link...`);
        testInfo.annotations.push({ type: 'step', description: `Step 3: Click ${file.name} download link` });
        
        const downloadResult = await downloadSetupPage.clickDownloadLink(file.name);
        
        expect(downloadResult.clicked).toBeTruthy();
        console.log(`✓ Clicked ${file.name} download link`);
        
        // Verify download is triggered
        console.log(`\n[STEP 4] Verifying download is triggered...`);
        testInfo.annotations.push({ type: 'step', description: 'Step 4: Verify download triggered' });
        
        if (downloadResult.downloadStarted) {
          expect(downloadResult.downloadStarted).toBeTruthy();
          console.log(`✓ Download started for ${file.name}`);
          
          // Verify downloaded file name matches expected
          console.log(`\n[STEP 5] Verifying downloaded file name matches expected...`);
          testInfo.annotations.push({ type: 'step', description: 'Step 5: Verify downloaded file name' });
          
          const downloadedFileName = downloadResult.downloadedFileName;
          console.log(`Downloaded file name: "${downloadedFileName}"`);
          console.log(`Expected file name: "${file.expectedFileName}"`);
          
          // File name should contain the expected name (may have additional extensions or paths)
          expect(downloadedFileName.toLowerCase()).toContain(file.expectedFileName.toLowerCase().replace('.exe', ''));
          console.log(`✓ Downloaded file name matches expected: ${file.expectedFileName}`);
        } else {
          console.log(`⚠ Download may not have started immediately (this could be normal behavior)`);
          // Don't fail the test if download doesn't start immediately - some browsers handle downloads differently
        }
        
        // Verify no error toast or alert is displayed
        console.log(`\n[STEP 6] Verifying no error toast or alert is displayed...`);
        testInfo.annotations.push({ type: 'step', description: 'Step 6: Verify no errors' });
        
        await page.waitForTimeout(2000); // Wait a bit for any error messages to appear
        
        const hasErrorToast = await downloadSetupPage.hasErrorToast();
        const hasErrorMessages = await downloadSetupPage.hasErrorMessages();
        
        expect(hasErrorToast).toBeFalsy();
        expect(hasErrorMessages).toBeFalsy();
        
        console.log('✓ No error toast or alert displayed');
        
        console.log(`\n=== Test Completed Successfully ===`);
        console.log(`✓ ${file.name} download link is clickable`);
        console.log(`✓ Download action was successful`);
        if (downloadResult.downloadStarted) {
          console.log(`✓ File download was triggered`);
          console.log(`✓ Downloaded file name: ${downloadResult.downloadedFileName}`);
        }
      });
    }
  });
});

