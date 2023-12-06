const XLSX = require('xlsx');

// Read XLSX files
const commitsDataWorkbook = XLSX.readFile('commits_data.xlsx');
const commitsChangesWorkbook = XLSX.readFile('commits_changes.xlsx');
const prDatasetWorkbook = XLSX.readFile('PR_dataset.xlsx');

// Get the sheet names
const commitsDataSheetName = commitsDataWorkbook.SheetNames[0];
const commitsChangesSheetName = commitsChangesWorkbook.SheetNames[0];
const prDatasetSheetName = prDatasetWorkbook.SheetNames[0];

// Get the sheet data
const commitsData = XLSX.utils.sheet_to_json(commitsDataWorkbook.Sheets[commitsDataSheetName]);
const commitsChanges = XLSX.utils.sheet_to_json(commitsChangesWorkbook.Sheets[commitsChangesSheetName]);
const prDataset = XLSX.utils.sheet_to_json(prDatasetWorkbook.Sheets[prDatasetSheetName]);

// Calculate Large PRs for each user
const largePRs = {};

// Merge PR data with commits data
const mergedData = prDataset.map(pr => ({
  ...pr,
  additions: commitsChanges
    .filter(change => commitsData.some(commit => commit.sha === change.sha))
    .reduce((totalAdditions, change) => totalAdditions + change.additions, 0),
}));

// Calculate Large PRs
mergedData.forEach(pr => {
  if (pr.additions > 500) {
    if (!largePRs[pr.user_id]) {
      largePRs[pr.user_id] = 1;
    } else {
      largePRs[pr.user_id]++;
    }
  }
});

// Print results
Object.keys(largePRs).forEach(userId => {
  console.log(`${userId} - Large PRs: ${largePRs[userId]}`);
});
