const fs = require('fs');
const { execSync } = require('child_process');

// Get test list from Playwright
const output = execSync('npx playwright test portals/admin/tests --list', { encoding: 'utf-8' });

// Parse the output
const lines = output.split('\n').filter(l => l.includes('›'));
const tests = [];

lines.forEach(line => {
  const match = line.match(/\[Chromium\] › (.+?) › (.+)/);
  if (match) {
    const filePath = match[1].split(':')[0];
    const fileName = filePath.replace('admin\\tests\\', '').replace('admin/tests/', '').replace('.spec.js', '');
    const testName = match[2].trim();
    tests.push({ file: fileName, testName: testName });
  }
});

// Create CSV content
const csvHeader = 'Test File,Test Case Name,Module\n';
const csvRows = tests.map(t => {
  // Extract module name from test name (e.g., "Admin Portal - Billing Module" -> "Billing Module")
  const moduleMatch = t.testName.match(/Admin Portal - (.+?) Module/);
  const module = moduleMatch ? moduleMatch[1] : t.testName.split(' › ')[0] || '';
  return `"${t.file}","${t.testName}","${module}"`;
});

const csvContent = csvHeader + csvRows.join('\n');

// Write CSV file
fs.writeFileSync('admin-portal-test-cases.csv', csvContent, 'utf-8');

console.log(`✓ CSV file created: admin-portal-test-cases.csv`);
console.log(`✓ Total test cases: ${tests.length}`);
console.log(`✓ Test files: ${new Set(tests.map(t => t.file)).size}`);

// Also create a summary
const summary = {};
tests.forEach(t => {
  if (!summary[t.file]) {
    summary[t.file] = [];
  }
  summary[t.file].push(t.testName);
});

console.log('\nTest cases by file:');
Object.keys(summary).sort().forEach(file => {
  console.log(`  ${file}: ${summary[file].length} test(s)`);
});

